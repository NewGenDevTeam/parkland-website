/* ─────────────────────────────────────────────────────────────────────────────
   FacilitiesGrid — Stage 3E-13
   Image source: lib/facilities.ts popup image paths
   All 19 facility names & numbering verified from docs/parkland-old-website-content.md
───────────────────────────────────────────────────────────────────────────── */

import Image  from 'next/image';
import Reveal  from '@/components/motion/Reveal';
import Stagger from '@/components/motion/Stagger';
import { FACILITIES } from '@/lib/facilities';
import type { FacilityHotspot } from '@/lib/facilities';

export default function FacilitiesGrid({ facilities }: { facilities?: FacilityHotspot[] } = {}) {
  const SORTED = [...(facilities ?? FACILITIES)].sort((a, b) => a.id - b.id);
  return (
    <section className="section-white section-pad">
      <div className="container-site">

        {/* ── Section header ── */}
        <div className="text-center mb-14">
          <Reveal from="bottom" delay={0}>
            <p className="section-label-on-light mb-4"
              style={{ fontSize: 'clamp(1rem, 1vw, 1.15rem)', lineHeight: '1.4' }}>All 19 Facilities</p>
          </Reveal>
          <Reveal from="bottom" delay={80}>
            <span className="gold-rule mx-auto mb-7" />
          </Reveal>
          <Reveal from="bottom" delay={160} blur>
            <h2 className="type-heading text-ink mb-5"
              style={{ fontSize: 'clamp(2.4rem, 3vw, 3.4rem)', lineHeight: '1.15' }}>
              Every Detail, Designed for You
            </h2>
          </Reveal>
          <Reveal from="bottom" delay={260}>
            <p className="type-lead max-w-xl mx-auto">
              A complete podium floor dedicated entirely to lifestyle — from active
              recreation to peaceful nature retreats.
            </p>
          </Reveal>
        </div>

        {/* ── Facility cards ── */}
        <Stagger
          stagger={45}
          initialDelay={60}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {SORTED.map((facility) => (
            <Reveal key={facility.uniqueKey ?? String(facility.id)} from="bottom" scale>
              <div
                className="group relative overflow-hidden rounded-2xl aspect-4/3
                  shadow-[0_2px_12px_rgba(0,0,0,0.12)]
                  hover:shadow-[0_10px_40px_rgba(0,0,0,0.24)]
                  hover:-translate-y-1
                  transition-[box-shadow,transform] duration-300 cursor-default"
              >
                {/* Background image — zoom on hover, respects reduced-motion */}
                <Image
                  src={facility.image}
                  alt={facility.name}
                  fill
                  className="object-cover
                    motion-safe:transition-transform motion-safe:duration-500
                    motion-safe:group-hover:scale-105"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />

                {/*
                 * Overlay — always present so mobile text is readable.
                 * Deepens on hover for desktop.
                 */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-black/35
                    group-hover:bg-black/60
                    transition-colors duration-300"
                />

                {/* Centered facility name — always visible, white */}
                <div className="absolute inset-0 flex items-center justify-center px-5">
                  <p
                    className="text-white font-display font-bold text-center leading-snug
                      drop-shadow-[0_1px_6px_rgba(0,0,0,0.95)]"
                    style={{ fontSize: 'clamp(1.15rem, 1.25vw, 1.35rem)', letterSpacing: '-0.01em', lineHeight: '1.55' }}
                  >
                    {facility.name}
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
