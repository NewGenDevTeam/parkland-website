/* ─────────────────────────────────────────────────────────────────────────────
   Location data verified from docs/parkland-old-website-content.md §10.
   No details invented.
───────────────────────────────────────────────────────────────────────────── */

import type { ComponentType } from 'react';
import Image             from 'next/image';
import Reveal            from '@/components/motion/Reveal';
import Stagger           from '@/components/motion/Stagger';
import LocationMasterMap from '@/components/sections/LocationMasterMap';

/* ── Inline SVG icons — 24×24, 1.5pt stroke ─────────────────────────────── */

const IconBook = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

const IconPlus = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M8 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
    <path d="M14 2v6h6" />
    <line x1="12" y1="10" x2="12" y2="16" />
    <line x1="9"  y1="13" x2="15" y2="13" />
  </svg>
);

const IconBag = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

const IconFork = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
    <path d="M7 2v20" />
    <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" />
  </svg>
);

const IconActivity = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

const IconRoute = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="6"  cy="19" r="2" />
    <circle cx="18" cy="5"  r="2" />
    <path d="M6 17V9a6 6 0 0 1 6-6h2" />
    <path d="M18 7v8a6 6 0 0 1-6 6H10" />
  </svg>
);

const IconBank = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="3"  y1="22" x2="21" y2="22" />
    <line x1="6"  y1="18" x2="6"  y2="11" />
    <line x1="10" y1="18" x2="10" y2="11" />
    <line x1="14" y1="18" x2="14" y2="11" />
    <line x1="18" y1="18" x2="18" y2="11" />
    <polygon points="12 2 20 7 4 7" />
  </svg>
);

const IconShield = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

/* ── Data types ──────────────────────────────────────────────────────────── */

type DistancePill  = { label: string; value: string };
type AccessEntry   = { place: string; distance: string };
type AccessCard    = { title: string; Icon: ComponentType; items: AccessEntry[] };

/* ── Key distance pills (top of left column) ─────────────────────────────── */

const KEY_DISTANCES: DistancePill[] = [
  { label: 'CIQ Complex',      value: '8km' },
  { label: 'RTS Bukit Chagar', value: '8km' },
  { label: 'Major Highways',   value: '2km' },
];

/* ── Quick & Easy Access — 8 categories, verified from official website ─── */

const QUICK_ACCESS: AccessCard[] = [
  {
    title: 'Education',
    Icon:  IconBook,
    items: [
      { place: 'SJKC Pei Hwa 2',                      distance: '~3 km' },
      { place: 'SK & SMK Permas Jaya',                 distance: '~4 km' },
      { place: 'International School (Johor Bahru)',   distance: '~5 km' },
    ],
  },
  {
    title: 'Healthcare',
    Icon:  IconPlus,
    items: [
      { place: 'Columbia Asia Hospital',        distance: '~3 km'  },
      { place: 'Regency Specialist Hospital',   distance: '~10 km' },
      { place: 'KPJ Pasir Gudang Specialist',   distance: '~10 km' },
    ],
  },
  {
    title: 'Retail',
    Icon:  IconBag,
    items: [
      { place: 'AEON Mall Permas Jaya',      distance: '~3 km' },
      { place: "Lotus's Plentong",           distance: '~5 km' },
      { place: 'Giant Hypermarket Plentong', distance: '~6 km' },
      { place: 'Midvalley Southkey',         distance: '~6 km' },
    ],
  },
  {
    title: 'Dining',
    Icon:  IconFork,
    items: [
      { place: 'Local & International Restaurants', distance: '~2.4 km' },
      { place: 'Café & Fast Food Outlets',          distance: '~2.4 km' },
      { place: 'Entertainment Centre',              distance: '~3–5 km' },
    ],
  },
  {
    title: 'Recreation',
    Icon:  IconActivity,
    items: [
      { place: 'Permas Jaya Golf Club',       distance: '~2 km'   },
      { place: 'Permas Jaya Sports Complex',  distance: '~2.5 km' },
      { place: 'Permas Jaya Marina Club',     distance: '~3 km'   },
    ],
  },
  {
    title: 'Accessibility',
    Icon:  IconRoute,
    items: [
      { place: 'Major Highways',   distance: '~2 km' },
      { place: 'RTS Bukit Chagar', distance: '~8 km' },
      { place: 'CIQ Complex',      distance: '~8 km' },
    ],
  },
  {
    title: 'Banking',
    Icon:  IconBank,
    items: [
      { place: 'Maybank',      distance: '~2.5 km' },
      { place: 'CIMB Bank',   distance: '~2.5 km' },
      { place: 'Public Bank', distance: '~2.5 km' },
    ],
  },
  {
    title: 'Public Services',
    Icon:  IconShield,
    items: [
      { place: 'Permas Jaya Police Station',  distance: '~3 km' },
      { place: 'Permas Jaya Fire Station',    distance: '~3 km' },
      { place: 'Post Office & Courier',       distance: '~3 km' },
    ],
  },
];

/* ── Component ───────────────────────────────────────────────────────────── */

export default function LocationSection() {
  return (
    <section id="location" className="section-white section-pad relative overflow-hidden">

      {/* ── Decorative background ── */}
      <div
        aria-hidden="true"
        className="loc-glow absolute -top-40 -right-40 w-xl h-144
          rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(200,169,126,0.13) 0%, rgba(200,169,126,0.04) 55%, transparent 75%)',
        }}
      />
      <div
        aria-hidden="true"
        className="loc-float absolute bottom-12 -left-24 w-72 h-72
          rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(200,169,126,0.08) 0%, transparent 68%)',
          border: '1px solid rgba(200,169,126,0.09)',
        }}
      />

      <div className="container-site relative z-10">

        {/* ══ Part 1: Two-column intro ═══════════════════════════════════════ */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-20 lg:mb-24">

          {/* Left — label, heading, paragraph, pills, CTA */}
          <div>
            <Reveal from="left" delay={0}>
              <p className="section-label-on-light mb-4">Location</p>
            </Reveal>
            <Reveal from="left" delay={70}>
              <span className="gold-rule mb-7" />
            </Reveal>
            <Reveal from="left" delay={150} blur>
              <h2 className="type-heading text-ink mb-5">
                Strategic Location,<br />All Under 10km
              </h2>
            </Reveal>
            <Reveal from="bottom" delay={270}>
              <p className="type-lead mb-8">
                Parkland By The River sits in the heart of Permas Jaya — minutes
                from the Singapore Causeway, premier retail, healthcare, and
                major highways.
              </p>
            </Reveal>

            {/* Distance pills — staggered */}
            <Stagger stagger={90} initialDelay={360} className="flex flex-wrap gap-3 mb-10">
              {KEY_DISTANCES.map(({ label, value }) => (
                <Reveal key={label} from="bottom" scale>
                  <span
                    className="location-badge-text inline-flex items-center gap-2
                      border border-gold/50 text-gold bg-gold/5
                      rounded-full px-4 py-1.5 text-[0.9375rem] font-semibold tracking-wide"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" aria-hidden="true" />
                    {label} · {value}
                  </span>
                </Reveal>
              ))}
            </Stagger>

            <Reveal from="bottom" delay={640}>
              <a href="/floor-plans" className="btn-base btn-primary">
                Explore Floor Plans
              </a>
            </Reveal>
          </div>

          {/* Right — location overview map */}
          <Reveal from="right" delay={180} scale>
            <div className="lg:sticky lg:top-24">
              <div className="relative">
                <div
                  className="relative aspect-4/3 rounded-2xl overflow-hidden
                    shadow-[0_20px_60px_rgba(0,0,0,0.13),0_4px_16px_rgba(0,0,0,0.07)]
                    ring-1 ring-[rgba(200,169,126,0.18)]
                    transition-shadow duration-500 ease-out
                    hover:shadow-[0_28px_80px_rgba(0,0,0,0.18),0_8px_24px_rgba(0,0,0,0.09)]"
                >
                  <Image
                    src="/assets/parkland/location/location-map.webp"
                    alt="Parkland By The River location map — Permas Jaya, Johor Bahru"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'linear-gradient(135deg, rgba(200,169,126,0.07) 0%, transparent 55%)' }}
                  />
                </div>

                {/* Location label */}
                <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2
                  rounded-xl bg-white/90 backdrop-blur-sm px-3 py-2
                  shadow-md ring-1 ring-[rgba(200,169,126,0.28)]">
                  <span className="w-2 h-2 rounded-full bg-gold shrink-0" aria-hidden="true" />
                  <span className="text-[0.8125rem] font-semibold text-[#1a1209] tracking-wide">
                    Permas Jaya, Johor Bahru
                  </span>
                </div>
              </div>

              <Reveal from="bottom" delay={420}>
                <p className="mt-4 text-center text-[0.9375rem] text-subtle">
                  Permas Jaya, Johor Bahru — strategic access to Singapore &amp; major amenities
                </p>
              </Reveal>
            </div>
          </Reveal>

        </div>

        {/* ══ Part 2: Large location master map ════════════════════════════ */}
        <Reveal from="bottom" delay={0} scale>
          <LocationMasterMap />
        </Reveal>

        {/* ══ Part 3: Quick & Easy Access ══════════════════════════════════ */}
        <div className="mt-20 lg:mt-24">

          {/* Section label + heading */}
          <div className="text-center mb-12">
            <Reveal from="bottom" delay={0}>
              <p className="section-label-on-light mb-4">All Under 10km</p>
            </Reveal>
            <Reveal from="bottom" delay={80}>
              <span className="gold-rule mx-auto mb-7" />
            </Reveal>
            <Reveal from="bottom" delay={160} blur>
              <h2
                className="font-display font-bold text-ink leading-tight"
                style={{ fontSize: 'clamp(1.875rem, 3.5vw, 3rem)', letterSpacing: '-0.03em' }}
              >
                Quick &amp; Easy{' '}
                <span className="text-blue-600">Access</span>
              </h2>
            </Reveal>
          </div>

          {/* 8-card grid: 1 col mobile → 2 col tablet → 4 col desktop */}
          <Stagger
            stagger={60}
            initialDelay={80}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {QUICK_ACCESS.map(({ title, Icon, items }) => (
              <Reveal key={title} from="bottom" scale>
                <div
                  className="bg-white border border-border rounded-2xl p-6 h-full
                    transition-[border-color,box-shadow,transform,background-color]
                    duration-300 ease-out
                    hover:border-blue-300/60
                    hover:bg-blue-50/30
                    hover:shadow-[0_10px_36px_rgba(59,130,246,0.09),0_2px_8px_rgba(0,0,0,0.07)]
                    hover:-translate-y-1.5"
                >
                  {/* Icon */}
                  <div className="w-9 h-9 text-blue-500 mb-4">
                    <Icon />
                  </div>

                  {/* Title */}
                  <h3 className="font-semibold text-ink text-[1rem] leading-snug mb-4">
                    {title}
                  </h3>

                  {/* Distance list */}
                  <ul className="space-y-2.5">
                    {items.map(({ place, distance }) => (
                      <li
                        key={place}
                        className="flex items-start justify-between gap-2 text-[0.9375rem]"
                      >
                        <span className="location-access-detail text-subtle leading-snug">{place}</span>
                        <span className="location-access-detail font-semibold text-ink shrink-0 tabular-nums">
                          {distance}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </Stagger>

        </div>
      </div>
    </section>
  );
}
