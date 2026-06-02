'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image  from 'next/image';
import Link   from 'next/link';
import Reveal  from '@/components/motion/Reveal';
import Stagger from '@/components/motion/Stagger';
import { FLOOR_PLANS } from '@/lib/floorPlans';
import type { FloorPlanType } from '@/lib/floorPlans';

/* ── SVG icons ──────────────────────────────────────────────────────────────── */
function IcBed() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-gold" aria-hidden="true">
      <path d="M2 14V7a2 2 0 014 0v7" /><path d="M2 11h16" />
      <path d="M18 11V14" /><rect x="2" y="14" width="16" height="3" rx="1" />
    </svg>
  );
}
function IcBath() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-gold" aria-hidden="true">
      <path d="M4 10h12M4 10V7a2 2 0 014 0v3" />
      <path d="M4 10v4a3 3 0 003 3h6a3 3 0 003-3v-4" />
    </svg>
  );
}
function IcArea() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-gold" aria-hidden="true">
      <rect x="2" y="2" width="16" height="16" rx="1" />
      <path d="M2 7h4M2 13h4M7 2v4M13 2v4" />
    </svg>
  );
}
function IcCheck() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" aria-hidden="true">
      <path d="M13 4L6 11l-3-3" />
    </svg>
  );
}

/* ── Lightbox ────────────────────────────────────────────────────────────────
   Rendered via createPortal so it escapes Reveal's CSS transform stacking
   context and anchors correctly to the viewport.                            ── */
function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Enlarged view"
      className="fixed inset-0 flex items-center justify-center p-6 sm:p-12"
      style={{ zIndex: 9999, background: 'rgba(0,0,0,0.93)' }}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 w-10 h-10 rounded-full
          flex items-center justify-center text-white text-xl leading-none
          bg-white/12 hover:bg-white/24 transition-colors"
      >
        ×
      </button>
      <div
        className="relative w-full max-w-4xl"
        style={{ height: '82vh' }}
        onClick={e => e.stopPropagation()}
      >
        <Image src={src} alt={alt} fill className="object-contain"
          sizes="(min-width: 768px) 896px, 100vw" priority />
      </div>
      <p className="absolute bottom-4 inset-x-0 text-center text-white/35 text-[0.875rem]">
        Press ESC or click outside to close
      </p>
    </div>,
    document.body,
  );
}

/* ── Main selector ──────────────────────────────────────────────────────────── */
export default function FloorPlanSelector() {
  const [selectedType, setSelectedType] = useState<FloorPlanType>('A');
  const [visible,      setVisible]      = useState(true);
  const [lightbox,     setLightbox]     = useState<{ src: string; alt: string } | null>(null);
  const [mounted,      setMounted]      = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => { setMounted(true); }, []);

  const plan = FLOOR_PLANS.find(p => p.type === selectedType)!;

  const selectType = useCallback((type: FloorPlanType) => {
    if (type === selectedType) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    setVisible(false);
    timerRef.current = setTimeout(() => { setSelectedType(type); setVisible(true); }, 180);
  }, [selectedType]);

  const openLightbox  = useCallback((src: string, alt: string) => setLightbox({ src, alt }), []);
  const closeLightbox = useCallback(() => setLightbox(null), []);

  return (
    <>
      {mounted && lightbox && (
        <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={closeLightbox} />
      )}

      {/* ── Type selector buttons ── */}
      <div
        role="tablist"
        aria-label="Unit type"
        className="flex justify-center gap-2 sm:gap-3 flex-wrap mb-7"
      >
        {FLOOR_PLANS.map(p => {
          const active = p.type === selectedType;
          return (
            <button
              key={p.type}
              role="tab"
              aria-selected={active}
              onClick={() => selectType(p.type)}
              className={[
                'flex flex-col items-center gap-1 min-w-[130px] sm:min-w-37.5 px-5 sm:px-7 py-3.5 rounded-xl',
                'border cursor-pointer select-none transition-all duration-200',
                active
                  ? 'bg-gold border-gold shadow-[0_4px_20px_rgba(200,169,126,0.4)] scale-[1.03]'
                  : 'bg-white border-border hover:border-gold/50 hover:shadow-sm',
              ].join(' ')}
            >
              <span className="font-alegreya font-bold uppercase text-ink"
                style={{ fontSize: 'clamp(0.95rem, 0.95vw, 1.1rem)', lineHeight: '1.2', letterSpacing: '0.12em' }}>
                {p.label}
              </span>
              <span className={`font-semibold tabular-nums ${active ? 'text-ink' : 'text-gold'}`}
                style={{ fontSize: 'clamp(0.95rem, 1vw, 1.1rem)', lineHeight: '1.3' }}>
                {p.size} · {p.bedrooms} Bed {p.bathrooms} Bath
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Content: fades on type switch ── */}
      <div style={{ opacity: visible ? 1 : 0, transition: 'opacity 180ms ease' }}>

        {/* ── Two-column: floor plan image + spec panel ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-5 lg:gap-8 mb-7">

          {/* Floor plan image — large, fixed height */}
          <div
            role="button"
            tabIndex={0}
            aria-label={`View ${plan.label} floor plan enlarged`}
            className="group relative w-full rounded-2xl overflow-hidden
              border border-border bg-[#F8F7F4] cursor-zoom-in
              shadow-[0_2px_20px_rgba(0,0,0,0.07)]
              hover:shadow-[0_8px_36px_rgba(0,0,0,0.12)]
              transition-shadow duration-300"
            style={{ height: 'clamp(460px, 58vh, 700px)' }}
            onClick={() => openLightbox(plan.floorPlanSrc, `${plan.label} — ${plan.name} floor plan`)}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') openLightbox(plan.floorPlanSrc, `${plan.label} — ${plan.name} floor plan`); }}
          >
            <Image
              src={plan.floorPlanSrc}
              alt={`${plan.label} — ${plan.name} floor plan`}
              fill
              className="object-contain p-3 sm:p-5"
              sizes="(min-width: 1024px) 56vw, 100vw"
              priority
            />
            {/* Hover overlay */}
            <div
              aria-hidden="true"
              className="absolute inset-0 flex items-center justify-center
                opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/6"
            >
              <span className="bg-black/65 text-white text-[0.9375rem] font-medium
                rounded-full px-4 py-1.5 backdrop-blur-sm">
                Click to enlarge
              </span>
            </div>
          </div>

          {/* Spec panel */}
          <div className="flex flex-col gap-4 justify-center">

            {/* Spec badge */}
            <span
              className="self-start border border-gold/50 text-gold-deep bg-gold/6
                rounded-full px-4 py-1 font-bold tracking-[0.14em] uppercase"
              style={{ fontSize: 'clamp(1rem, 1vw, 1.15rem)' }}
            >
              {plan.specLabel}
            </span>

            {/* Unit name */}
            <h2
              className="font-display font-bold text-ink leading-tight"
              style={{ fontSize: 'clamp(1.6rem, 1.8vw, 2.1rem)', letterSpacing: '-0.03em', lineHeight: '1.25' }}
            >
              {plan.name}
            </h2>

            {/* Stat cards: Bedroom / Bathroom / Area */}
            <div className="grid grid-cols-3 gap-2 w-[110%]">
              {[
                { icon: <IcBed  />, label: 'Bedroom(s)',  value: String(plan.bedrooms)  },
                { icon: <IcBath />, label: 'Bathroom(s)', value: String(plan.bathrooms) },
                { icon: <IcArea />, label: 'Area Size',   value: plan.size              },
              ].map(({ icon, label, value }) => (
                <div
                  key={label}
                  className="flex flex-col items-center text-center gap-1.5 py-3 px-3 rounded-xl border border-[#D8C7A7]"
                >
                  {icon}
                  <span className="font-semibold text-muted tracking-widest uppercase leading-none"
                    style={{ fontSize: 'clamp(1.05rem, 1.1vw, 1.25rem)' }}>
                    {label}
                  </span>
                  <span className="font-display font-bold text-ink leading-none"
                    style={{ fontSize: 'clamp(1.25rem, 1.35vw, 1.5rem)' }}>
                    {value}
                  </span>
                </div>
              ))}
            </div>

            <div className="h-px bg-border" />

            {/* Description */}
            <p className="leading-relaxed text-body"
              style={{ fontSize: 'clamp(1.15rem, 1.25vw, 1.35rem)', lineHeight: '1.65' }}>
              {plan.description}
            </p>

            {/* Features */}
            <ul className="flex flex-col gap-2" aria-label="Key features">
              {plan.features.map(f => (
                <li key={f} className="flex items-start gap-2 text-body"
                  style={{ fontSize: 'clamp(1.05rem, 1.1vw, 1.25rem)', lineHeight: '1.5' }}>
                  <IcCheck />
                  {f}
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-1">
              <Link href="/contact" className="btn-base btn-primary">
                Let&apos;s Talk
              </Link>
              <Link href="/contact" className="btn-base btn-ghost-dark">
                Contact Us
              </Link>
            </div>

          </div>
        </div>

        {/* ── Gallery grid ── */}
        <div>
          <Reveal from="bottom" delay={0}>
            <h3 className="font-display font-bold text-ink mb-4"
              style={{ fontSize: 'clamp(1.4rem, 1.6vw, 1.75rem)', letterSpacing: '-0.02em', lineHeight: '1.25' }}>
              Gallery
            </h3>
          </Reveal>

          <Stagger stagger={90} initialDelay={60} className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {plan.galleryImages.map((img, i) => (
              <Reveal key={i} from="bottom" scale>
                <button
                  aria-label={`View ${img.alt} enlarged`}
                  className="group relative overflow-hidden rounded-xl cursor-zoom-in w-full
                    shadow-[0_2px_10px_rgba(0,0,0,0.08)]
                    hover:shadow-[0_12px_36px_rgba(0,0,0,0.20)]
                    hover:-translate-y-1
                    focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none
                    transition-[box-shadow,transform] duration-300"
                  style={{ aspectRatio: '4/3' }}
                  onClick={() => openLightbox(img.src, img.alt)}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-105"
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 33vw, 50vw"
                  />
                </button>
              </Reveal>
            ))}
          </Stagger>

          <Reveal from="bottom" delay={0}>
            <p className="mt-3 text-muted"
              style={{ fontSize: 'clamp(1rem, 1.05vw, 1.15rem)', lineHeight: '1.6' }}>
              {plan.galleryImages.length} photos — click any to enlarge
            </p>
          </Reveal>
        </div>

      </div>
    </>
  );
}
