/* ─────────────────────────────────────────────────────────────────────────────
   Content sourced exclusively from docs/parkland-old-website-content.md
   Section 8 (Facilities) and docs/parkland-new-sitemap-suggestion.md
   Section 3 (Facilities). Tagline is verbatim from old website.
   No facility descriptions have been invented.
───────────────────────────────────────────────────────────────────────────── */

import type { Metadata } from 'next';
import Link                  from 'next/link';
import Header                from '@/components/layout/Header';
import FacilitiesGrid        from '@/components/sections/FacilitiesGrid';
import FacilityExperienceMap from '@/components/sections/FacilityExperienceMap';
import SafeAutoplayVideo     from '@/components/ui/SafeAutoplayVideo';
import Reveal                from '@/components/motion/Reveal';
import Stagger               from '@/components/motion/Stagger';

export const metadata: Metadata = {
  title:       'Facilities | Parkland By The River — 19 Lifestyle Amenities',
  description: 'Discover 19 lifestyle facilities at Parkland By The River — swimming pool, gymnasium, water slide, BBQ pit, sauna, serenity garden, and more on the dedicated podium floor in Permas Jaya.',
  keywords:    [
    'Parkland By The River facilities',
    'Permas Jaya swimming pool',
    'serviced apartment amenities Johor Bahru',
    'podium floor facilities JB',
  ],
};

/* ── Thematic highlights (all facility names are verified from old website) ── */
const HIGHLIGHTS = [
  {
    label:      'Pool & Water',
    heading:    'An Aquatic World',
    body:       'Six water amenities — Swimming Pool, Play Pool, Water Slide, Pool Lounge, Pool Villa, and Pool Deck — occupy the heart of the podium floor.',
    facilities: ['Swimming Pool', 'Play Pool', 'Water Slide', 'Pool Lounge', 'Pool Villa', 'Pool Deck'],
    svgPaths:   (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8" aria-hidden="true">
        <path d="M2 12c1.5-2 3.5-2 5 0s3.5 2 5 0 3.5-2 5 0" />
        <path d="M2 17c1.5-2 3.5-2 5 0s3.5 2 5 0 3.5-2 5 0" />
        <line x1="7" y1="5" x2="7" y2="12" />
        <line x1="12" y1="5" x2="12" y2="12" />
        <line x1="17" y1="5" x2="17" y2="12" />
      </svg>
    ),
  },
  {
    label:      'Wellness',
    heading:    'Renew & Restore',
    body:       'Dedicated wellness spaces — Sauna, Hot & Cold Bath, Gymnasium, and Changing Room — support daily renewal without leaving the building.',
    facilities: ['Sauna', 'Hot & Cold Bath', 'Gymnasium', 'Changing Room'],
    svgPaths:   (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8" aria-hidden="true">
        <circle cx="12" cy="16" r="4" />
        <line x1="12" y1="3" x2="12" y2="8" />
        <path d="M8.5 5.5c0 2.5 2 4.5 3.5 4.5s3.5-2 3.5-4.5" />
      </svg>
    ),
  },
  {
    label:      'Outdoor & Nature',
    heading:    'Nature Woven In',
    body:       'Serenity Garden, Forest Glade, The Green Canvas, and Garden Kitchen bring the outdoors in — spaces to unwind, breathe, and gather under open skies.',
    facilities: ['Serenity Garden', 'Forest Glade', 'The Green Canvas', 'BBQ Pit', 'Garden Kitchen'],
    svgPaths:   (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8" aria-hidden="true">
        <path d="M12 22v-5" />
        <path d="M12 17c-4 0-7-4-7-9 0 0 3.5 1 7 1s7-1 7-1c0 5-3 9-7 9z" />
      </svg>
    ),
  },
  {
    label:      'Community',
    heading:    'Spaces to Gather',
    body:       'Multipurpose Hall, Pantry, Playground, and Multipurpose Sports Court keep the community active, entertained, and connected.',
    facilities: ['Multipurpose Hall', 'Pantry', 'Playground', 'Multipurpose Sports Court'],
    svgPaths:   (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8" aria-hidden="true">
        <path d="M3 10.5 12 3l9 7.5V21H3z" />
        <path d="M9 21v-9h6v9" />
      </svg>
    ),
  },
];

export default function FacilitiesPage() {
  return (
    <>
      <Header />
      <main>

        {/* ══ 1. Page banner ══════════════════════════════════════════════════ */}
        <section className="section-dark pt-28 pb-20 lg:pt-36 lg:pb-24">
          <div className="container-site">
            <div className="max-w-2xl">
              <Reveal from="left" delay={0}>
                <p className="section-label mb-4">Lifestyle Facilities</p>
              </Reveal>
              <Reveal from="left" delay={80}>
                <span className="gold-rule mb-7" />
              </Reveal>
              <Reveal from="left" delay={160} blur>
                <h1 className="type-heading text-white mb-6">
                  A Sanctuary of Recreation<br className="hidden sm:inline" /> and Relaxation
                </h1>
              </Reveal>
              <Reveal from="bottom" delay={300}>
                <p className="type-lead-light mb-8">
                  The entire podium floor at Parkland By The River is dedicated to
                  lifestyle — 19 facilities designed to complement the way you live,
                  every single day.
                </p>
              </Reveal>
              <Reveal from="bottom" delay={420}>
                <div className="flex flex-wrap gap-4">
                  <Link href="/contact" className="btn-base btn-primary">
                    Register Interest
                  </Link>
                  <Link href="/floor-plans" className="btn-base btn-ghost-white">
                    View Floor Plans
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ══ 2. Interactive facilities map ══════════════════════════════════ */}
        <FacilityExperienceMap />

        {/* ══ 3. Full facilities grid ═════════════════════════════════════════ */}
        <FacilitiesGrid />

        {/* ══ 3b. Showcase video — above Lifestyle Themes ═════════════════════ */}
        <section className="section-dark section-pad">
          <div className="container-site">
            <Reveal from="bottom" delay={0} scale>
              <div
                className="w-full max-w-5xl mx-auto rounded-2xl overflow-hidden
                  bg-black
                  shadow-[0_24px_80px_rgba(0,0,0,0.50)]
                  ring-1 ring-gold/20"
              >
                <SafeAutoplayVideo
                  src="/assets/parkland/videos/parkland-showcase.mp4"
                  poster="/assets/parkland/images/hero-render.jpg"
                  className="w-full aspect-video block object-contain"
                  style={{ pointerEvents: 'none' }}
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* ══ 4. Thematic highlights ══════════════════════════════════════════ */}
        <section className="section-darker section-pad">
          <div className="container-site">

            <div className="text-center mb-14">
              <Reveal from="bottom" delay={0}>
                <p className="section-label mb-4">Lifestyle Themes</p>
              </Reveal>
              <Reveal from="bottom" delay={80}>
                <span className="gold-rule mx-auto mb-7" />
              </Reveal>
              <Reveal from="bottom" delay={160} blur>
                <h2 className="type-heading text-white mb-5">
                  Something for Every Moment
                </h2>
              </Reveal>
            </div>

            <Stagger
              stagger={120}
              initialDelay={80}
              className="grid grid-cols-1 sm:grid-cols-2 gap-5"
            >
              {HIGHLIGHTS.map(({ label, heading, body, facilities, svgPaths }) => (
                <Reveal key={label} from="bottom" scale>
                  <div className="card-on-dark rounded-2xl p-8 h-full flex flex-col gap-5">

                    {/* Icon + label */}
                    <div className="flex items-center gap-3">
                      <div className="text-gold flex-shrink-0">
                        {svgPaths}
                      </div>
                      <span className="section-label">{label}</span>
                    </div>

                    {/* Heading */}
                    <h3 className="text-white font-display font-bold text-[1.25rem]
                      leading-snug tracking-[-0.02em]">
                      {heading}
                    </h3>

                    {/* Body */}
                    <p className="text-white/60 text-[0.9rem] leading-relaxed flex-grow">
                      {body}
                    </p>

                    {/* Facility chips */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {facilities.map((f) => (
                        <span
                          key={f}
                          className="border border-white/15 text-white/50
                            rounded-full px-3 py-1
                            text-[0.6875rem] font-medium tracking-wide"
                        >
                          {f}
                        </span>
                      ))}
                    </div>

                  </div>
                </Reveal>
              ))}
            </Stagger>

          </div>
        </section>

        {/* ══ 5. CTA section ══════════════════════════════════════════════════ */}
        <section className="section-dark section-pad">
          <div className="container-site text-center">
            <Reveal from="bottom" delay={0}>
              <p className="section-label mb-4">Take the Next Step</p>
            </Reveal>
            <Reveal from="bottom" delay={80}>
              <span className="gold-rule mx-auto mb-7" />
            </Reveal>
            <Reveal from="bottom" delay={160} blur>
              <h2 className="type-heading text-white mb-5">
                Secure Your Unit Today
              </h2>
            </Reveal>
            <Reveal from="bottom" delay={280}>
              <p className="type-lead-light max-w-md mx-auto mb-10">
                Register now to receive the full e-brochure and an exclusive
                invitation to our private gallery viewing.
              </p>
            </Reveal>
            <Reveal from="bottom" delay={380}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/floor-plans" className="btn-base btn-primary">
                  Explore Floor Plans
                </Link>
                <Link href="/contact" className="btn-base btn-ghost-white">
                  Register Interest
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

      </main>
    </>
  );
}
