'use client';

/**
 * Reveal — scroll-triggered entrance animation via IntersectionObserver.
 *
 * WHY TWO EFFECTS (not one):
 *   The old single-effect design called setMounted(true) and observer.observe()
 *   in the same useEffect. When an element is already in the viewport on page
 *   load, refresh, or hash navigation, the IntersectionObserver fires its
 *   callback before React has painted the hidden state. React batches both
 *   state updates (hidden + visible) into one render, so the element jumps
 *   directly to the visible state — no transition plays.
 *
 *   The two-effect split fixes this reliably:
 *     Effect 1 — waits two rAFs, then sets ready=true.
 *                setReady(true) triggers a React re-render AND a new Effect run.
 *     Effect 2 — depends on [ready]. By the time React commits this effect,
 *                the hidden state (opacity:0) is guaranteed to be painted.
 *                The observer then starts, and any intersection fires a real
 *                opacity:0→1 CSS transition.
 *
 * Elements start at opacity:0 in the very first render (SSR-included).
 * This is intentional: content is still in the DOM for crawlers; the trade-off
 * is accepted in exchange for reliable animation on refresh/hash navigation.
 */

import {
  useRef,
  useEffect,
  useState,
  type ReactNode,
  type CSSProperties,
} from 'react';

export type RevealFrom = 'bottom' | 'left' | 'right';

export interface RevealProps {
  children:   ReactNode;
  className?: string;
  /** Delay in ms before the animation starts (used for stagger). */
  delay?:     number;
  /** Direction the element translates in from (default: 'bottom'). */
  from?:      RevealFrom;
  /** Scale from 0.96 → 1 while entering. */
  scale?:     boolean;
  /** Blur from 6px → 0 while entering (use on headings only). */
  blur?:      boolean;
  /** Animation duration in ms (default: 800). */
  duration?:  number;
}

export default function Reveal({
  children,
  className = '',
  delay     = 0,
  from      = 'bottom',
  scale     = false,
  blur      = false,
  duration  = 800,
}: RevealProps) {
  const ref                   = useRef<HTMLDivElement>(null);
  const [ready,   setReady]   = useState(false);
  const [visible, setVisible] = useState(false);
  const [skip,    setSkip]    = useState(false);

  // ── Phase 1: detect reduced-motion; then wait two paint frames ───────────
  // Two rAFs ensure the browser has actually painted the hidden state
  // (opacity:0) before we start observing. If we observe immediately, the
  // IntersectionObserver fires in the same frame as setReady, and React may
  // batch both updates into one render, skipping the hidden→visible transition.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setSkip(true);
      return;
    }
    let r1 = 0;
    let r2 = 0;
    r1 = requestAnimationFrame(() => {
      r2 = requestAnimationFrame(() => setReady(true));
    });
    return () => {
      cancelAnimationFrame(r1);
      cancelAnimationFrame(r2);
    };
  }, []);

  // ── Phase 2: start observer after ready — hidden state is now painted ────
  // React guarantees that useEffect([ready]) runs AFTER the render triggered
  // by setReady(true) is committed to the DOM and painted. So by the time
  // this effect runs, opacity:0 is on screen and the CSS transition will play.
  useEffect(() => {
    if (!ready) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect(); // animate once
        }
      },
      {
        threshold:  0.1,
        rootMargin: '0px 0px -8% 0px',
      },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ready]);

  // ── Reduced-motion: render without animation (content always visible) ────
  if (skip) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  // ── Build animation values ────────────────────────────────────────────────
  const hiddenTranslate: Record<RevealFrom, string> = {
    bottom: 'translateY(28px)',
    left:   'translateX(-28px)',
    right:  'translateX(28px)',
  };

  const hiddenTransform = [
    hiddenTranslate[from],
    scale ? 'scale(0.96)' : '',
  ].filter(Boolean).join(' ');

  const visibleTransform = [
    'translateY(0) translateX(0)',
    scale ? 'scale(1)' : '',
  ].filter(Boolean).join(' ');

  const transitions = [
    `opacity  ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
    `transform ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
    blur ? `filter ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay}ms` : '',
  ].filter(Boolean).join(', ');

  const style: CSSProperties = {
    opacity:    visible ? 1 : 0,
    transform:  visible ? visibleTransform : hiddenTransform,
    filter:     blur ? (visible ? 'blur(0px)' : 'blur(6px)') : undefined,
    transition: transitions,
    willChange: visible ? 'auto' : 'opacity, transform',
  };

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
