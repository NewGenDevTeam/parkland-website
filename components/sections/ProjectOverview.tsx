import Image   from 'next/image';
import Reveal   from '@/components/motion/Reveal';
import CountUp, { type CountUpFormat } from '@/components/motion/CountUp';

const STATS: { value: number; format: CountUpFormat; label: string }[] = [
  { value: 4,    format: 'plain', label: 'Towers'               },
  { value: 36,   format: 'plain', label: 'Floors'               },
  { value: 1078, format: 'comma', label: 'Phase 2 Units'        },
  { value: 19,   format: 'plain', label: 'Lifestyle Facilities'  },
];

export default function ProjectOverview() {
  return (
    <section className="section-light section-pad">
      <div className="container-site">

        {/* ── Two-column: text left, image right ── */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Text column — each block reveals from the left */}
          <div>
            <Reveal from="left" delay={0}>
              <p className="section-label-on-light mb-4">About the Project</p>
            </Reveal>

            <Reveal from="left" delay={80}>
              <span className="gold-rule mb-7" />
            </Reveal>

            <Reveal from="left" delay={160} blur>
              <h2 className="type-heading text-ink mb-7">
                A community that resonates with value and natural energy
              </h2>
            </Reveal>

            <Reveal from="bottom" delay={300}>
              <div className="space-y-5">
                <p className="type-lead">
                  Experience a harmonious blend of modern luxury and nature&apos;s
                  tranquility at Parkland By The River, the latest prestigious serviced
                  apartment located in the heart of Permas Jaya, Johor Bahru.
                </p>
                <p className="type-lead">
                  Developed by Parkland Group, this freehold development offers scenic
                  river views alongside seamless connectivity — only 8km from the CIQ
                  Complex and RTS Bukit Chagar, with access to major highways, shopping
                  centres, and the best of Johor Bahru.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Image column — slides in from the right */}
          <Reveal from="right" delay={200}>
            <div className="relative aspect-3/4 lg:aspect-4/5 rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
              <Image
                src="/assets/parkland/images/main-photo-frame.webp"
                alt="Parkland By The River — building overview, Permas Jaya, Johor Bahru"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </Reveal>
        </div>

        {/* ── Stat strip — Reveal and CountUp share the same delay per stat ── */}
        <div className="mt-16 lg:mt-20 pt-10 border-t border-border
          grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat, i) => {
            const delay = 100 + i * 130; // 100 · 230 · 360 · 490 ms
            return (
              <Reveal key={stat.label} from="bottom" delay={delay}>
                {/*
                 * tabular-nums: every digit gets the same advance width,
                 * so the cell does not shift horizontally as numbers change.
                 */}
                <p className="font-display font-bold text-ink tracking-[-0.04em]
                  text-[clamp(2.25rem,4vw,3rem)] leading-none mb-2 tabular-nums">
                  <CountUp
                    value={stat.value}
                    format={stat.format}
                    delay={delay}
                    duration={1500}
                  />
                </p>
                <p className="home-stat-label-text text-[0.9375rem] font-semibold uppercase tracking-[0.1em] text-subtle">
                  {stat.label}
                </p>
              </Reveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
