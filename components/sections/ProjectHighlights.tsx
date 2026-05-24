/* ─────────────────────────────────────────────────────────────────────────────
   All 8 highlights are verified from docs/parkland-old-website-content.md
   Section 7 (Selling Points) and Section 8 (Facilities).
   No details have been invented.
───────────────────────────────────────────────────────────────────────────── */

import type { ComponentType } from 'react';
import Reveal  from '@/components/motion/Reveal';
import Stagger from '@/components/motion/Stagger';

/* Inline SVG icon components — 24×24, 1.5pt stroke, no fill */
const IconShield = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 2 4 6v5.5C4 16.5 7.4 21 12 22.5 16.6 21 20 16.5 20 11.5V6l-8-4z" />
  </svg>
);

const IconPin = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="10" r="3" />
    <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 14 8 14s8-8.75 8-14a8 8 0 0 0-8-8z" />
  </svg>
);

const IconWaves = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M2 9c1.5-2 3.5-2 5 0s3.5 2 5 0 3.5-2 5 0" />
    <path d="M2 14c1.5-2 3.5-2 5 0s3.5 2 5 0 3.5-2 5 0" />
    <path d="M2 19c1.5-2 3.5-2 5 0s3.5 2 5 0 3.5-2 5 0" />
  </svg>
);

const IconElevator = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="5" y="2" width="14" height="20" rx="2" />
    <path d="M9 9l3-3 3 3" />
    <path d="M9 15l3 3 3-3" />
  </svg>
);

const IconBus = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="7" width="20" height="11" rx="2" />
    <path d="M2 11h20M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <circle cx="7.5" cy="18.5" r="1.5" />
    <circle cx="16.5" cy="18.5" r="1.5" />
  </svg>
);

const IconHome = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V10.5z" />
    <path d="M9 22V12h6v10" />
  </svg>
);

const IconStar = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 2l3.1 6.3L22 9.3l-5 4.9 1.2 6.9L12 17.8l-6.2 3.3L7 14.2 2 9.3l6.9-1L12 2z" />
  </svg>
);

const IconRoad = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 20L12 4l7 16" />
    <path d="M6.5 16h11" />
    <path d="M12 4v4M12 12v2" />
  </svg>
);

type HighlightItem = {
  title:       string;
  description: string;
  Icon:        ComponentType;
};

const HIGHLIGHTS: HighlightItem[] = [
  {
    title:       'Freehold Title',
    description: 'Secure freehold ownership — your home, yours to keep for generations.',
    Icon:        IconShield,
  },
  {
    title:       '8km to CIQ & RTS',
    description: 'Only 8km to the CIQ Complex and RTS Bukit Chagar for effortless Singapore access.',
    Icon:        IconPin,
  },
  {
    title:       'Scenic River Views',
    description: 'Beautiful river views that bring a sense of calm and openness to your everyday life.',
    Icon:        IconWaves,
  },
  {
    title:       'Ample Lift Access',
    description: '5 passenger lifts and 1 emergency lift per tower — smooth access to every floor.',
    Icon:        IconElevator,
  },
  {
    title:       'Shuttle Bus Service',
    description: 'Dedicated shuttle connecting residents to nearby amenities and transport hubs.',
    Icon:        IconBus,
  },
  {
    title:       'Thoughtfully Furnished',
    description: 'Selected fittings and furnishings designed for a comfortable, hassle-free home.',
    Icon:        IconHome,
  },
  {
    title:       '19 Lifestyle Facilities',
    description: 'A full podium floor of recreation and relaxation — pool, gym, gardens, and more.',
    Icon:        IconStar,
  },
  {
    title:       'Seamless Connectivity',
    description: 'Strategic location with access to major highways, business hubs, and Singapore.',
    Icon:        IconRoad,
  },
];

export default function ProjectHighlights() {
  return (
    <section className="section-darker section-pad">
      <div className="container-site">

        {/* ── Section header — staggered bottom reveal ── */}
        <div className="text-center mb-14 lg:mb-16">
          <Reveal from="bottom" delay={0}>
            <p className="section-label mb-4">Project Highlights</p>
          </Reveal>

          <Reveal from="bottom" delay={80}>
            <span className="gold-rule mx-auto mb-7" />
          </Reveal>

          <Reveal from="bottom" delay={160} blur>
            <h2 className="type-heading text-white mb-5">
              Well-Crafted Homes.<br className="hidden sm:inline" />{' '}
              Elevated Lifestyle.
            </h2>
          </Reveal>

          <Reveal from="bottom" delay={280}>
            <p className="type-lead-light max-w-xl mx-auto">
              Every detail at Parkland By The River is designed to support the way
              you live — from freehold security to riverside serenity.
            </p>
          </Reveal>
        </div>

        {/* ── Highlight cards — staggered cascade via Stagger ── */}
        <Stagger
          stagger={110}
          initialDelay={80}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {HIGHLIGHTS.map(({ title, description, Icon }) => (
            <Reveal
              key={title}
              from="bottom"
              scale
              blur={false}
              className="h-full"
            >
              <div className="card-on-dark rounded-xl p-6 flex flex-col gap-4 h-full">
                {/* Icon */}
                <div className="w-10 h-10 text-gold flex-shrink-0">
                  <Icon />
                </div>

                {/* Text */}
                <div>
                  <h3 className="text-white font-semibold text-[1rem] leading-snug mb-2">
                    {title}
                  </h3>
                  <p className="text-white/60 text-[0.875rem] leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </Stagger>

      </div>
    </section>
  );
}
