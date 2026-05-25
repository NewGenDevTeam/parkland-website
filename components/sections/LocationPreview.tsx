import Image  from 'next/image';
import Link   from 'next/link';
import Reveal from '@/components/motion/Reveal';

const KEY_DISTANCES = [
  { label: 'CIQ Complex',      km: '8' },
  { label: 'RTS Bukit Chagar', km: '8' },
  { label: 'Major Highways',   km: '2' },
];

export default function LocationPreview() {
  return (
    <section className="section-light section-pad">
      <div className="container-site">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Text column */}
          <div>
            <Reveal from="left" delay={0}>
              <p className="section-label-on-light mb-4">Location</p>
            </Reveal>

            <Reveal from="left" delay={80}>
              <span className="gold-rule mb-7" />
            </Reveal>

            <Reveal from="left" delay={160} blur>
              <h2 className="type-heading text-ink mb-5">
                Strategic Location,<br />All Under 10km
              </h2>
            </Reveal>

            <Reveal from="bottom" delay={280}>
              <p className="type-lead mb-8">
                Permas Jaya puts Singapore access, premier retail, and healthcare
                within minutes. Parkland By The River places you at the centre of it all.
              </p>
            </Reveal>

            {/* Key distance pills */}
            <Reveal from="bottom" delay={360}>
              <div className="flex flex-wrap gap-3 mb-10">
                {KEY_DISTANCES.map(({ label, km }) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-2
                      border border-gold/50 text-gold bg-gold/5
                      rounded-full px-4 py-1.5
                      text-sm font-semibold tracking-wide"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" aria-hidden="true" />
                    {label} · {km}km
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal from="bottom" delay={440}>
              <Link href="/location" className="btn-base btn-primary">
                View Full Location Map
              </Link>
            </Reveal>
          </div>

          {/* Map image column */}
          <Reveal from="right" delay={200}>
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
                  alt="Parkland By The River — area map, Permas Jaya, Johor Bahru"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(135deg, rgba(200,169,126,0.08) 0%, transparent 55%)' }}
                />
              </div>

              {/* Location label */}
              <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2
                rounded-xl bg-white/90 backdrop-blur-sm px-3 py-2
                shadow-md ring-1 ring-[rgba(200,169,126,0.28)]">
                <span className="w-2 h-2 rounded-full bg-gold shrink-0" aria-hidden="true" />
                <span className="text-[0.75rem] font-semibold text-[#1a1209] tracking-wide">
                  Permas Jaya, Johor Bahru
                </span>
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
