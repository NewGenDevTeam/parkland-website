'use client';

/**
 * CountUp — animated number counter triggered by IntersectionObserver.
 *
 * Animation phases:
 *   1. Scramble (40 % of duration): rapidly cycles random numbers within the
 *      same digit-count range as the target — prevents layout shift.
 *   2. Count (60 % of duration): ease-out cubic curve from the digit-floor
 *      to the exact target value.
 *
 * SSR / no-JS safety:
 *   Initial state is always the correct final value, so the server-rendered
 *   HTML is readable and crawlable without JavaScript.
 *
 * Accessibility:
 *   Respects prefers-reduced-motion — shows the final value immediately.
 */

import { useRef, useEffect, useState } from 'react';

export type CountUpFormat = 'plain' | 'comma';

function fmt(n: number, format: CountUpFormat): string {
  const rounded = Math.round(n);
  return format === 'comma' ? rounded.toLocaleString('en-US') : String(rounded);
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export interface CountUpProps {
  /** Final numeric target */
  value:      number;
  /** 'plain' = no formatting | 'comma' = thousands separator (e.g. 1,078) */
  format?:    CountUpFormat;
  /** Delay in ms before animation starts — use to stagger across sibling counters */
  delay?:     number;
  /** Total animation duration in ms */
  duration?:  number;
  /** className applied to the inner <span> */
  className?: string;
}

export default function CountUp({
  value,
  format   = 'plain',
  delay    = 0,
  duration = 1500,
  className = '',
}: CountUpProps) {
  // Server renders the exact final value — correct number, no flash
  const [display, setDisplay] = useState<string>(fmt(value, format));

  const spanRef    = useRef<HTMLSpanElement>(null);
  const hasRunRef  = useRef(false);

  useEffect(() => {
    // Skip entirely for reduced-motion users — final value already shown
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const el = spanRef.current;
    if (!el) return;

    // ── Animation constants ────────────────────────────────────────────────
    const rawDigits   = String(value).length;
    // countFrom: lowest value with the same digit count as target.
    // Keeping digit count fixed throughout prevents layout shift.
    const countFrom   = rawDigits === 1 ? 1 : Math.pow(10, rawDigits - 1);
    const scrambleDur = duration * 0.40;   // 40 % — fast random shuffle
    const countDur    = duration * 0.60;   // 60 % — smooth ease to target
    const scrambleMs  = 65;                // interval between scramble ticks (~15 fps)

    // Scramble ceiling: stay close to the target so the transition feels natural
    const scrambleMax = Math.min(
      Math.pow(10, rawDigits) - 1,
      countFrom + (value - countFrom + 1) * 2,
    );

    // ── Cleanup handles ────────────────────────────────────────────────────
    let isCancelled      = false;
    let delayTimer:       ReturnType<typeof setTimeout> | null = null;
    let scrambleInterval: ReturnType<typeof setInterval> | null = null;
    let scrambleEndTimer: ReturnType<typeof setTimeout> | null = null;
    let rafId:            number | null = null;

    // ── Observer ───────────────────────────────────────────────────────────
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasRunRef.current) return;
        hasRunRef.current = true;
        observer.disconnect();

        delayTimer = setTimeout(() => {
          if (isCancelled) return;

          // Phase 1 — scramble
          scrambleInterval = setInterval(() => {
            if (isCancelled) { clearInterval(scrambleInterval!); return; }
            const rand = Math.floor(countFrom + Math.random() * (scrambleMax - countFrom));
            setDisplay(fmt(rand, format));
          }, scrambleMs);

          scrambleEndTimer = setTimeout(() => {
            if (scrambleInterval) clearInterval(scrambleInterval);
            if (isCancelled) return;

            // Phase 2 — ease toward final value
            const countStart = performance.now();

            function tick(now: number): void {
              if (isCancelled) return;
              const elapsed  = now - countStart;
              const progress = Math.min(elapsed / countDur, 1);
              const eased    = easeOutCubic(progress);
              const current  = countFrom + eased * (value - countFrom);

              setDisplay(fmt(current, format));

              if (progress < 1) {
                rafId = requestAnimationFrame(tick);
              } else {
                // Guarantee the exact correct final value on the last frame
                setDisplay(fmt(value, format));
              }
            }

            rafId = requestAnimationFrame(tick);
          }, scrambleDur);
        }, delay);
      },
      { threshold: 0.5 },
    );

    observer.observe(el);

    // ── Cleanup — cancels all pending work on unmount ──────────────────────
    return () => {
      isCancelled = true;
      observer.disconnect();
      if (delayTimer)       clearTimeout(delayTimer);
      if (scrambleInterval) clearInterval(scrambleInterval);
      if (scrambleEndTimer) clearTimeout(scrambleEndTimer);
      if (rafId !== null)   cancelAnimationFrame(rafId);
    };
  }, [value, format, delay, duration]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <span ref={spanRef} className={className}>
      {display}
    </span>
  );
}
