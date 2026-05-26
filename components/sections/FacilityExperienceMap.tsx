'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Reveal from '@/components/motion/Reveal';
import { FACILITIES } from '@/lib/facilities';
import type { FacilityHotspot } from '@/lib/facilities';

/* ── Inline keyframes ───────────────────────────────────────────────────────── */
const ANIM_CSS = `
  @keyframes mrkPulse {
    0%   { transform: scale(1);   opacity: 0.35; }
    75%  { transform: scale(1.75); opacity: 0;   }
    100% { transform: scale(1.75); opacity: 0;   }
  }
  @keyframes popIn {
    0%   { opacity: 0; transform: scale(0.88) translateY(5px); }
    100% { opacity: 1; transform: scale(1)    translateY(0);   }
  }
`;

/* ── Numbered marker pin ────────────────────────────────────────────────────── */
function MarkerPin({
  id,
  isActive,
  reducedMotion,
}: {
  id:            number;
  isActive:      boolean;
  reducedMotion: boolean;
}) {
  const size = isActive ? 34 : 28;

  return (
    <span
      className="relative flex items-center justify-center"
      style={{
        width:      size,
        height:     size,
        transform:  isActive ? 'scale(1.18)' : 'scale(1)',
        /* spring-like overshoot on activate */
        transition: 'transform 240ms cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}
    >
      {/* Pulse ring */}
      {!reducedMotion && (
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full"
          style={{
            backgroundColor:         isActive
              ? 'rgba(96,165,250,0.48)'
              : 'rgba(96,165,250,0.28)',
            animationName:           'mrkPulse',
            animationDuration:       isActive ? '1.4s' : '3.2s',
            animationTimingFunction: 'ease-out',
            animationIterationCount: 'infinite',
          }}
        />
      )}

      {/* Core circle with number */}
      <span
        aria-hidden="true"
        className="relative z-10 rounded-full flex items-center justify-center
          font-mono font-bold select-none leading-none"
        style={{
          width:           '100%',
          height:          '100%',
          fontSize:        id >= 10 ? '0.625rem' : '0.75rem',
          color:           '#ffffff',
          backgroundColor: isActive ? 'rgb(59 130 246)' : 'rgba(96,165,250,0.90)',
          boxShadow:       isActive
            ? '0 0 0 2px rgba(255,255,255,0.88), 0 0 14px rgba(59,130,246,0.75), 0 0 32px rgba(59,130,246,0.35)'
            : '0 0 0 1.5px rgba(255,255,255,0.45), 0 2px 6px rgba(0,0,0,0.35)',
          transition:      'background-color 200ms ease, box-shadow 200ms ease',
        }}
      >
        {id}
      </span>
    </span>
  );
}

/* ── Popup card — image-background style ────────────────────────────────────── */
/*
 * Popup positions itself relative to the marker div using left/right 100% +
 * a fixed-pixel margin so it always attaches cleanly to the marker edge.
 *
 * Edge-collision:
 *   x > 62  → popup opens LEFT  of the marker
 *   y < 22  → popup anchors to marker TOP  (prevents top overflow)
 *   y > 75  → popup anchors to marker BOTTOM (prevents bottom overflow)
 *   default → RIGHT / vertically centred on marker
 */
function PopupCard({
  facility,
  reducedMotion,
}: {
  facility:      FacilityHotspot;
  reducedMotion: boolean;
}) {
  const openLeft = facility.x > 62;

  /* Horizontal: attach to left or right edge of the marker div */
  const hStyle: React.CSSProperties = openLeft
    ? { right: '100%', marginRight: '13px' }
    : { left:  '100%', marginLeft:  '13px' };

  /* Vertical: centre on marker, corrected at map edges */
  const vStyle: React.CSSProperties =
    facility.y < 22
      ? { top: 0 }
      : facility.y > 75
      ? { bottom: 0 }
      : { top: '50%', transform: 'translateY(-50%)' };

  return (
    <div
      role="tooltip"
      className="absolute pointer-events-none"
      style={{ zIndex: 80, ...hStyle, ...vStyle }}
    >
      {/*
       * Card: image fills 100% as <Image fill>, gradient overlay for text.
       * w-60 mobile → sm:w-72 → lg:w-80  (240 → 288 → 320 px)
       */}
      <div
        className="relative overflow-hidden rounded-xl
          w-60 sm:w-72 lg:w-80 aspect-3/2
          shadow-[0_16px_48px_rgba(0,0,0,0.72)]"
        style={{
          animation: reducedMotion ? 'none' : 'popIn 180ms ease both',
        }}
      >
        {/* Full-bleed background image */}
        <Image
          src={facility.image}
          alt={facility.name}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 320px, (min-width: 640px) 288px, 240px"
        />

        {/* Gradient — heavy at bottom for name, light scrim at top for pill */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t
            from-black/88 via-black/32 to-black/16"
        />

        {/* Bottom: facility name */}
        <div className="absolute bottom-0 inset-x-0 px-3 pb-3">
          <p
            className="text-white font-display font-bold leading-snug
              drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]"
            style={{ fontSize: 'clamp(1.05rem, 1.1vw, 1.2rem)', letterSpacing: '-0.01em' }}
          >
            {facility.name}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Main component ─────────────────────────────────────────────────────────── */
export default function FacilityExperienceMap() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [lockedId,  setLockedId]  = useState<number | null>(null);

  const reducedMotRef = useRef(false);
  const mapRef        = useRef<HTMLDivElement>(null);

  const activeId = lockedId ?? hoveredId;

  useEffect(() => {
    reducedMotRef.current =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  /* Dismiss locked popup on outside click */
  const handleOutsideClick = useCallback((e: MouseEvent) => {
    if (mapRef.current && !mapRef.current.contains(e.target as Node)) {
      setLockedId(null);
    }
  }, []);
  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [handleOutsideClick]);

  const handleClick = (id: number) =>
    setLockedId(prev => (prev === id ? null : id));

  return (
    <section className="section-light section-pad">
      <style dangerouslySetInnerHTML={{ __html: ANIM_CSS }} />

      {/* ── Section header — centred in normal container ── */}
      <div className="container-site">
        <div className="text-center mb-12">
          <Reveal from="bottom" delay={0}>
            <p className="section-label-on-light mb-4"
              style={{ fontSize: 'clamp(1rem, 1vw, 1.15rem)', lineHeight: '1.4' }}>Crafting Lifestyle For Your Well-Being</p>
          </Reveal>
          <Reveal from="bottom" delay={80}>
            <span className="gold-rule mx-auto mb-7" />
          </Reveal>
          <Reveal from="bottom" delay={160} blur>
            <h2 className="type-heading text-ink mb-5"
              style={{ fontSize: 'clamp(2.4rem, 3vw, 3.4rem)', lineHeight: '1.15' }}>
              <span className="text-blue-600">19</span> Lifestyle Facilities
            </h2>
          </Reveal>
          <Reveal from="bottom" delay={260}>
            <p className="type-lead max-w-xl mx-auto">
              A community that resonates with value and natural energy
            </p>
          </Reveal>
        </div>
      </div>

      {/* ── Map — wider container, breaks out of container-site padding ── */}
      <div className="w-full max-w-380 mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Full-width interactive map ── */}
        <Reveal from="bottom" delay={120}>
          <div
            ref={mapRef}
            className="relative rounded-2xl overflow-hidden
              shadow-[0_20px_64px_rgba(0,0,0,0.18)]"
          >
            {/* Clean map — 1536 × 658 px */}
            <Image
              src="/assets/parkland/facilities/facilities-3d-map-clean.png"
              alt="Parkland By The River — podium floor facilities layout"
              width={1536}
              height={658}
              className="w-full h-auto block"
              priority
            />

            {/* Dim overlay while a marker is active */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-black/18 pointer-events-none
                transition-opacity duration-300"
              style={{ opacity: activeId !== null ? 1 : 0 }}
            />

            {/* Markers + popups */}
            <div className="absolute inset-0 pointer-events-none">
              {FACILITIES.map((f) => {
                const isActive = activeId === f.id;
                return (
                  <div
                    key={f.id}
                    className="absolute"
                    style={{
                      left:      `${f.x}%`,
                      top:       `${f.y}%`,
                      transform: 'translate(-50%, -50%)',
                      /*
                       * z-index 50 for active marker keeps its popup above
                       * all non-active markers (z-10).
                       * Opacity fades inactive markers when any popup is open.
                       */
                      zIndex:    isActive ? 50 : 10,
                      opacity:   activeId !== null && !isActive ? 0.55 : 1,
                      transition: 'opacity 200ms ease',
                    }}
                  >
                    <button
                      aria-label={`Facility ${f.id}: ${f.name}`}
                      aria-pressed={lockedId === f.id}
                      className="pointer-events-auto cursor-pointer
                        flex items-center justify-center
                        focus-visible:outline-none
                        focus-visible:ring-2 focus-visible:ring-gold
                        focus-visible:ring-offset-1 rounded-full"
                      onMouseEnter={() => setHoveredId(f.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      onClick={() => handleClick(f.id)}
                      onFocus={() => setHoveredId(f.id)}
                      onBlur={() => setHoveredId(null)}
                    >
                      <MarkerPin
                        id={f.id}
                        isActive={isActive}
                        reducedMotion={reducedMotRef.current}
                      />
                    </button>

                    {isActive && (
                      <PopupCard
                        facility={f}
                        reducedMotion={reducedMotRef.current}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* Interaction hint */}
        <p className="mt-3 text-center text-subtle"
          style={{ fontSize: 'clamp(1rem, 1.05vw, 1.15rem)', lineHeight: '1.6' }}>
          <span className="lg:hidden">
            Tap a numbered marker to preview the facility
          </span>
        </p>

      </div>
    </section>
  );
}
