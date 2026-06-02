import type { Metadata } from 'next';
import Image  from 'next/image';
import { OG_IMAGE } from '@/lib/seoConfig';
import Link   from 'next/link';
import Header from '@/components/layout/Header';
import Reveal from '@/components/motion/Reveal';
import Stagger from '@/components/motion/Stagger';

export const metadata: Metadata = {
  title:       'About Parkland By The River | Residential Development',
  description: 'Learn more about Parkland By The River and our commitment to delivering quality residential developments designed for modern living in Johor Bahru.',
  keywords:    [
    'residential development',
    'Parkland By The River',
    'Parkland Group',
    'Johor Bahru residential development',
    'freehold serviced apartment Permas Jaya',
  ],
  alternates: { canonical: '/about' },
  openGraph: {
    title:       'About Parkland By The River | Residential Development',
    description: 'Learn more about Parkland By The River and our commitment to delivering quality residential developments designed for modern living in Johor Bahru.',
    url:         '/about',
    images:      OG_IMAGE,
  },
};

const PROJECT_FACTS = [
  { value: 'Freehold',  label: 'Land Tenure'           },
  { value: '1,078',     label: 'Phase 2 Units'          },
  { value: '19',        label: 'Lifestyle Facilities'   },
  { value: '36',        label: 'Floors Per Tower'       },
];

const HIGHLIGHTS = [
  {
    heading: 'A Modern Residential Development',
    body:    'Parkland By The River is a freehold serviced apartment residential development located in Permas Jaya, Johor Bahru. Designed to meet the needs of modern urban residents, the development offers three distinct unit types with thoughtful layouts suited to singles, couples, and families.',
  },
  {
    heading: 'Premium Facilities on a Dedicated Podium Floor',
    body:    'The entire podium floor is reserved for resident lifestyle — 19 facilities spanning aquatic, wellness, outdoor, and community zones. Residents have access to a swimming pool, gymnasium, sauna, serenity garden, BBQ pit, and more, all without leaving the development.',
  },
  {
    heading: 'Strategic Johor Bahru Location',
    body:    'Situated in Permas Jaya, Parkland By The River is approximately 8km from the CIQ Complex and RTS Bukit Chagar, with access to major highways, retail centres, healthcare facilities, and educational institutions — all within a short drive.',
  },
  {
    heading: 'Riverside Setting, Urban Connectivity',
    body:    'The development occupies a riverside address that offers scenic views and a naturally calmer living environment. Despite its tranquil setting, residents remain connected to Johor Bahru\'s key commercial and transport corridors.',
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>

        {/* ══ 1. Page hero ════════════════════════════════════════════════════ */}
        <section className="section-dark pt-28 pb-20 lg:pt-36 lg:pb-24">
          <div className="container-site">
            <div className="max-w-2xl">
              <Reveal from="left" delay={0}>
                <p className="section-label mb-4"
                  style={{ fontSize: 'clamp(1rem, 1vw, 1.15rem)' }}>About Us</p>
              </Reveal>
              <Reveal from="left" delay={80}>
                <span className="gold-rule mb-7" />
              </Reveal>
              <Reveal from="left" delay={160} blur>
                <h1 className="type-heading text-white mb-6"
                  style={{ fontSize: 'clamp(2.4rem, 3vw, 3.4rem)', lineHeight: '1.15' }}>
                  A Residential Development<br className="hidden sm:inline" /> Designed for Modern Living
                </h1>
              </Reveal>
              <Reveal from="bottom" delay={300}>
                <p className="type-lead-light mb-8 max-w-lg">
                  Parkland By The River is a quality freehold residential development
                  in Permas Jaya, Johor Bahru — combining thoughtful design, premium
                  facilities, and a riverside setting.
                </p>
              </Reveal>
              <Reveal from="bottom" delay={420}>
                <div className="flex flex-wrap gap-4">
                  <Link href="/floor-plans" className="btn-base btn-primary">
                    View Floor Plans
                  </Link>
                  <Link href="/contact" className="btn-base btn-ghost-white">
                    Register Interest
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ══ 2. Overview — text + image ══════════════════════════════════════ */}
        <section className="section-light section-pad">
          <div className="container-site">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

              {/* Text column */}
              <div>
                <Reveal from="left" delay={0}>
                  <p className="section-label-on-light mb-4"
                    style={{ fontSize: 'clamp(1rem, 1vw, 1.15rem)' }}>The Development</p>
                </Reveal>
                <Reveal from="left" delay={80}>
                  <span className="gold-rule mb-7" />
                </Reveal>
                <Reveal from="left" delay={160} blur>
                  <h2 className="type-heading text-ink mb-7"
                    style={{ fontSize: 'clamp(2rem, 2.5vw, 3rem)', lineHeight: '1.2' }}>
                    Where Community Meets Nature
                  </h2>
                </Reveal>
                <Reveal from="bottom" delay={280}>
                  <div className="space-y-5">
                    <p className="type-lead">
                      Parkland By The River offers a harmonious blend of modern design
                      and natural surroundings. The development is located along the
                      riverfront in Permas Jaya — one of eastern Johor Bahru&apos;s
                      established residential and commercial townships.
                    </p>
                    <p className="type-lead">
                      As a freehold serviced apartment development, Parkland By The
                      River is designed for residents who value both ownership security
                      and a well-rounded residential lifestyle — with 19 facilities on
                      a dedicated podium floor and three thoughtfully sized unit types.
                    </p>
                  </div>
                </Reveal>
              </div>

              {/* Image column */}
              <Reveal from="right" delay={200}>
                <div className="relative aspect-3/4 lg:aspect-4/5 rounded-2xl overflow-hidden
                  shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
                  <Image
                    src="/assets/parkland/images/main-photo-frame.webp"
                    alt="Parkland By The River — riverside residential development in Permas Jaya, Johor Bahru"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </Reveal>

            </div>
          </div>
        </section>

        {/* ══ 3. Project facts strip ══════════════════════════════════════════ */}
        <section className="section-white border-y border-border">
          <div className="container-site py-12">
            <Reveal from="bottom" delay={0}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
                {PROJECT_FACTS.map(({ value, label }) => (
                  <div key={label} className="flex flex-col gap-1">
                    <span className="font-display font-bold text-gold leading-none"
                      style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)' }}>
                      {value}
                    </span>
                    <span className="font-medium text-subtle tracking-wide uppercase"
                      style={{ fontSize: 'clamp(1rem, 1.05vw, 1.15rem)', lineHeight: '1.6' }}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ══ 4. Highlight cards ══════════════════════════════════════════════ */}
        <section className="section-darker section-pad">
          <div className="container-site">

            <div className="text-center mb-14">
              <Reveal from="bottom" delay={0}>
                <p className="section-label mb-4"
                  style={{ fontSize: 'clamp(1rem, 1vw, 1.15rem)' }}>What We Offer</p>
              </Reveal>
              <Reveal from="bottom" delay={80}>
                <span className="gold-rule mx-auto mb-7" />
              </Reveal>
              <Reveal from="bottom" delay={160} blur>
                <h2 className="type-heading text-white mb-5"
                  style={{ fontSize: 'clamp(2.4rem, 3vw, 3.4rem)', lineHeight: '1.15' }}>
                  Built Around How You Live
                </h2>
              </Reveal>
            </div>

            <Stagger stagger={110} initialDelay={60}
              className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {HIGHLIGHTS.map(({ heading, body }) => (
                <Reveal key={heading} from="bottom" scale>
                  <div className="card-on-dark rounded-2xl p-8 h-full flex flex-col gap-4">
                    <h3 className="text-white font-display font-bold tracking-[-0.02em]"
                      style={{ fontSize: 'clamp(1.35rem, 1.5vw, 1.75rem)', lineHeight: '1.25' }}>
                      {heading}
                    </h3>
                    <p className="text-white/60 leading-relaxed grow"
                      style={{ fontSize: 'clamp(1.15rem, 1.25vw, 1.35rem)', lineHeight: '1.65' }}>
                      {body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </Stagger>

          </div>
        </section>

        {/* ══ 5. CTA ══════════════════════════════════════════════════════════ */}
        <section className="section-dark section-pad">
          <div className="container-site text-center">
            <Reveal from="bottom" delay={0}>
              <p className="section-label mb-4"
                style={{ fontSize: 'clamp(1rem, 1vw, 1.15rem)' }}>Explore the Project</p>
            </Reveal>
            <Reveal from="bottom" delay={80}>
              <span className="gold-rule mx-auto mb-7" />
            </Reveal>
            <Reveal from="bottom" delay={160} blur>
              <h2 className="type-heading text-white mb-5"
                style={{ fontSize: 'clamp(2.4rem, 3vw, 3.4rem)', lineHeight: '1.15' }}>
                Discover Parkland By The River
              </h2>
            </Reveal>
            <Reveal from="bottom" delay={280}>
              <p className="type-lead-light max-w-md mx-auto mb-10">
                Explore our premium facilities, spacious floor plans, and strategic
                location near RTS Bukit Chagar and the Singapore Causeway.
              </p>
            </Reveal>
            <Reveal from="bottom" delay={380}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/facilities" className="btn-base btn-primary">
                  View Facilities
                </Link>
                <Link href="/floor-plans" className="btn-base btn-ghost-white">
                  Explore Floor Plans
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
