/* ─────────────────────────────────────────────────────────────────────────────
   Floor Plans page — Parkland By The River
   Content source: docs/parkland-old-website-content.md  (Section 6 & 9)
   Live reference: https://parklandbytheriver.com.my/#plan
   Section heading "Well-Crafted Modern Homes" is verbatim from the old website.
   No prices, APDL, legal details, or completion dates are shown.
───────────────────────────────────────────────────────────────────────────── */

import type { Metadata } from 'next';
import Link              from 'next/link';
import Header            from '@/components/layout/Header';
import FloorPlanSelector from '@/components/sections/FloorPlanSelector';
import Reveal            from '@/components/motion/Reveal';
import Stagger           from '@/components/motion/Stagger';
import { FLOOR_PLANS }  from '@/lib/floorPlans';

export const metadata: Metadata = {
  title:       'Floor Plans | Parkland By The River — Type A, B & C Units',
  description: 'Explore three thoughtfully designed unit types at Parkland By The River — Type A (562 sqft, 1 Bed), Type B (820 sqft, 2 Bed), and Type C (1,020 sqft, 3 Bed) freehold serviced apartments in Permas Jaya, Johor Bahru.',
  keywords:    [
    'Parkland By The River floor plan',
    'Permas Jaya serviced apartment floor plan',
    'Type A Type B Type C unit JB',
    'freehold apartment Johor Bahru 1 2 3 bedroom',
  ],
};

/* ─────────────────────────────────────────────────────────────────────────── */
export default function FloorPlansPage() {
  return (
    <>
      <Header />
      <main>

        {/* ══ 1. Page banner ══════════════════════════════════════════════════ */}
        <section className="section-dark pt-28 pb-20 lg:pt-36 lg:pb-24">
          <div className="container-site">
            <div className="max-w-2xl">
              <Reveal from="left" delay={0}>
                <p className="section-label mb-4"
                  style={{ fontSize: 'clamp(1rem, 1vw, 1.15rem)', lineHeight: '1.4' }}>Our Floor Plan</p>
              </Reveal>
              <Reveal from="left" delay={80}>
                <span className="gold-rule mb-7" />
              </Reveal>
              <Reveal from="left" delay={160} blur>
                {/* "Well-Crafted Modern Homes" — verbatim from old website */}
                <h1 className="type-heading text-white mb-6"
                  style={{ fontSize: 'clamp(2.4rem, 3vw, 3.4rem)', lineHeight: '1.15' }}>
                  Well-Crafted Modern Homes
                </h1>
              </Reveal>
              <Reveal from="bottom" delay={300}>
                {/* Old website description for the floor plan section */}
                <p className="type-lead-light mb-8 max-w-lg">
                  Three distinct layouts designed to suit your lifestyle needs,
                  all featuring a modern aesthetic and functional design.
                </p>
              </Reveal>
              {/* Quick type summary strip — matches old website tab labels */}
              <Reveal from="bottom" delay={420}>
                <div className="flex flex-wrap gap-6">
                  {FLOOR_PLANS.map(p => (
                    <div key={p.type} className="flex flex-col gap-0.5">
                      <span className="text-gold font-display font-bold leading-none"
                        style={{ fontSize: 'clamp(1.25rem, 1.35vw, 1.5rem)' }}>
                        {p.size}
                      </span>
                      <span className="text-white/50 font-medium tracking-wide"
                        style={{ fontSize: 'clamp(1.05rem, 1.1vw, 1.25rem)' }}>
                        {p.label} · {p.bedrooms} Bed{p.bedrooms > 1 ? 's' : ''}
                      </span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ══ 2. Interactive floor plan selector ════════════════════════════ */}
        <section className="section-white py-14 lg:py-20">
          <div className="container-site">

            <div className="text-center mb-8">
              <Reveal from="bottom" delay={0}>
                <p className="section-label-on-light mb-4"
                  style={{ fontSize: 'clamp(1rem, 1vw, 1.15rem)', lineHeight: '1.4' }}>Browse Unit Types</p>
              </Reveal>
              <Reveal from="bottom" delay={80}>
                <span className="gold-rule mx-auto mb-7" />
              </Reveal>
              <Reveal from="bottom" delay={160} blur>
                <h2 className="type-heading text-ink mb-5"
                  style={{ fontSize: 'clamp(2.4rem, 3vw, 3.4rem)', lineHeight: '1.15' }}>
                  Choose Your Layout
                </h2>
              </Reveal>
              <Reveal from="bottom" delay={260}>
                <p className="type-lead max-w-lg mx-auto">
                  Select a unit type to view its floor plan, specifications,
                  key features, and interior gallery.
                </p>
              </Reveal>
            </div>

            <Reveal from="bottom" delay={120}>
              <FloorPlanSelector />
            </Reveal>

          </div>
        </section>

        {/* ══ 3. Comparison section ══════════════════════════════════════════ */}
        <section className="section-light section-pad">
          <div className="container-site">

            <div className="text-center mb-14">
              <Reveal from="bottom" delay={0}>
                <p className="section-label-on-light mb-4"
                  style={{ fontSize: 'clamp(1rem, 1vw, 1.15rem)', lineHeight: '1.4' }}>Unit Comparison</p>
              </Reveal>
              <Reveal from="bottom" delay={80}>
                <span className="gold-rule mx-auto mb-7" />
              </Reveal>
              <Reveal from="bottom" delay={160} blur>
                <h2 className="type-heading text-ink mb-5"
                  style={{ fontSize: 'clamp(2.4rem, 3vw, 3.4rem)', lineHeight: '1.15' }}>
                  Side by Side
                </h2>
              </Reveal>
              <Reveal from="bottom" delay={260}>
                <p className="type-lead max-w-lg mx-auto">
                  All three unit types at a glance — size, layout,
                  key feature, and ideal resident profile.
                </p>
              </Reveal>
            </div>

            {/* Comparison cards */}
            <Stagger stagger={100} initialDelay={60} className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {FLOOR_PLANS.map(p => (
                <Reveal key={p.type} from="bottom" scale>
                  <div
                    className="relative bg-white rounded-2xl p-8 flex flex-col gap-5
                      border border-border
                      shadow-[0_2px_16px_rgba(0,0,0,0.05)]
                      transition-[border-color,box-shadow,transform] duration-300
                      hover:border-gold/50 hover:shadow-[0_8px_32px_rgba(0,0,0,0.09)]
                      hover:-translate-y-1"
                  >
                    {/* Badge */}
                    <span
                      className="floor-plan-detail-text self-start border border-gold/50 text-gold bg-gold/6
                        rounded-full px-3 py-1 font-bold tracking-widest uppercase"
                      style={{ fontSize: 'clamp(1rem, 1vw, 1.15rem)' }}
                    >
                      {p.specLabel}
                    </span>

                    {/* Name + size */}
                    <div>
                      <h3 className="font-display font-bold text-ink leading-snug mb-1.5"
                        style={{ fontSize: 'clamp(1.6rem, 1.8vw, 2.1rem)', lineHeight: '1.25' }}>
                        {p.name}
                      </h3>
                      <p className="text-gold font-display font-bold leading-none"
                        style={{ fontSize: 'clamp(1.5rem, 1.8vw, 2rem)', letterSpacing: '-0.02em' }}>
                        {p.size}
                      </p>
                    </div>

                    {/* Spec row */}
                    <div className="flex gap-5">
                      <span className="floor-plan-detail-text font-semibold text-body"
                        style={{ fontSize: 'clamp(1.05rem, 1.1vw, 1.25rem)', lineHeight: '1.5' }}>
                        {p.bedrooms} Bed{p.bedrooms > 1 ? 's' : ''}
                      </span>
                      <span aria-hidden="true" className="text-muted">·</span>
                      <span className="floor-plan-detail-text font-semibold text-body"
                        style={{ fontSize: 'clamp(1.05rem, 1.1vw, 1.25rem)', lineHeight: '1.5' }}>
                        {p.bathrooms} Bath{p.bathrooms > 1 ? 's' : ''}
                      </span>
                    </div>

                    <div className="h-px bg-border" />

                    {/* Key feature (first feature point) */}
                    <div>
                      <p className="floor-plan-detail-text font-semibold text-muted tracking-widest uppercase mb-2"
                        style={{ fontSize: 'clamp(1rem, 1vw, 1.15rem)', lineHeight: '1.4' }}>
                        Key Feature
                      </p>
                      <p className="floor-plan-detail-text font-medium text-body"
                        style={{ fontSize: 'clamp(1.15rem, 1.25vw, 1.35rem)', lineHeight: '1.65' }}>
                        {p.features[0]}
                      </p>
                    </div>

                    {/* Ideal for */}
                    <div>
                      <p className="floor-plan-detail-text font-semibold text-muted tracking-widest uppercase mb-2"
                        style={{ fontSize: 'clamp(1rem, 1vw, 1.15rem)', lineHeight: '1.4' }}>
                        Ideal For
                      </p>
                      <p className="floor-plan-detail-text font-medium text-body"
                        style={{ fontSize: 'clamp(1.15rem, 1.25vw, 1.35rem)', lineHeight: '1.65' }}>
                        {p.suitableFor}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="floor-plan-detail-text leading-relaxed text-subtle grow"
                      style={{ fontSize: 'clamp(1.15rem, 1.25vw, 1.35rem)', lineHeight: '1.65' }}>
                      {p.description}
                    </p>

                    {/* CTA */}
                    <Link
                      href="/contact"
                      className="btn-base btn-primary py-3 text-center"
                      style={{ fontSize: 'clamp(1.05rem, 1.1vw, 1.2rem)' }}
                    >
                      Let&apos;s Talk
                    </Link>
                  </div>
                </Reveal>
              ))}
            </Stagger>

          </div>
        </section>

        {/* ══ 4. Key project facts strip ════════════════════════════════════ */}
        <section className="section-white border-t border-border">
          <div className="container-site py-12">
            <Reveal from="bottom" delay={0}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
                {[
                  { value: '3',        label: 'Unit Types'           },
                  { value: 'Freehold', label: 'Land Tenure'          },
                  { value: '36',       label: 'Floors'               },
                  { value: '19',       label: 'Lifestyle Facilities'  },
                ].map(({ value, label }) => (
                  <div key={label} className="flex flex-col gap-1">
                    <span className="font-display font-bold text-gold leading-none"
                      style={{ fontSize: 'clamp(1.5rem, 2.5vw, 1.875rem)' }}>
                      {value}
                    </span>
                    <span className="floor-plan-detail-text font-medium text-subtle tracking-wide uppercase"
                      style={{ fontSize: 'clamp(1rem, 1.05vw, 1.15rem)', lineHeight: '1.6' }}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ══ 5. CTA section ══════════════════════════════════════════════════ */}
        <section className="section-dark section-pad">
          <div className="container-site text-center">
            <Reveal from="bottom" delay={0}>
              <p className="section-label mb-4"
                style={{ fontSize: 'clamp(1rem, 1vw, 1.15rem)', lineHeight: '1.4' }}>Take the Next Step</p>
            </Reveal>
            <Reveal from="bottom" delay={80}>
              <span className="gold-rule mx-auto mb-7" />
            </Reveal>
            <Reveal from="bottom" delay={160} blur>
              <h2 className="type-heading text-white mb-5"
                style={{ fontSize: 'clamp(2.4rem, 3vw, 3.4rem)', lineHeight: '1.15' }}>
                Secure Your Unit Today
              </h2>
            </Reveal>
            <Reveal from="bottom" delay={280}>
              <p className="type-lead-light max-w-md mx-auto mb-10">
                Units are moving fast. Register now to receive the full
                e-brochure and an exclusive invitation to our private gallery
                viewing.
              </p>
            </Reveal>
            <Reveal from="bottom" delay={380}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="btn-base btn-primary">
                  Let&apos;s Talk
                </Link>
                <Link href="/contact" className="btn-base btn-ghost-white">
                  Contact Us
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

      </main>
    </>
  );
}
