import Image from 'next/image';
import Link  from 'next/link';
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
                    <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" aria-hidden="true" />
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

          {/* Map image */}
          <Reveal from="right" delay={200}>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
              <Image
                src="/assets/parkland/location/location-map.webp"
                alt="Parkland By The River — area map, Permas Jaya, Johor Bahru"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
