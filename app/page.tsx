import type { Metadata } from 'next';
import Link             from 'next/link';
import { OG_IMAGE }    from '@/lib/seoConfig';
import Header            from '@/components/layout/Header';
import Hero              from '@/components/sections/Hero';
import ProjectOverview   from '@/components/sections/ProjectOverview';
import ProjectHighlights from '@/components/sections/ProjectHighlights';
import VideoShowcase     from '@/components/sections/VideoShowcase';
import LocationPreview   from '@/components/sections/LocationPreview';
import Reveal            from '@/components/motion/Reveal';

export const metadata: Metadata = {
  title: 'Parkland By The River | Modern Apartment in Johor Bahru',
  description:
    'Discover Parkland By The River, a modern residential development in Johor Bahru featuring premium facilities, spacious layouts, and a strategic location.',
  keywords: [
    'Parkland By The River',
    'apartment Johor Bahru',
    'condo Johor Bahru',
    'new property launch',
    'freehold property',
    'new apartment Johor Bahru',
    'family-friendly apartment',
    'parkland by the river Johor',
    'new launch condo Johor',
    'residential property Johor',
    'freehold apartment Johor',
    'riverside apartment Johor',
    'waterfront condo Johor',
    'apartment for Singapore workers Johor',
    'Johor property for Singaporeans',
    'family apartment Johor Bahru',
    'affordable condo Johor Bahru',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    title:       'Parkland By The River | Modern Apartment in Johor Bahru',
    description: 'Discover Parkland By The River, a modern residential development in Johor Bahru featuring premium facilities, spacious layouts, and a strategic location.',
    url:         '/',
    images:      OG_IMAGE,
  },
};

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProjectOverview />
        <ProjectHighlights />
        <VideoShowcase />
        <LocationPreview />

        {/* ── Internal links strip — SEO + navigation ──────────────────────── */}
        <section className="section-white border-t border-border">
          <div className="container-site py-14 lg:py-16">
            <Reveal from="bottom" delay={0}>
              <div className="text-center mb-10">
                <p className="section-label-on-light mb-3">Explore Parkland</p>
                <span className="gold-rule mx-auto mb-0" />
              </div>
            </Reveal>
            <Reveal from="bottom" delay={80}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: 'Facilities',  desc: '19 lifestyle amenities', href: '/facilities'  },
                  { label: 'Floor Plans', desc: 'Type A, B & C units',    href: '/floor-plans' },
                  { label: 'Location',   desc: 'Near RTS & Bukit Chagar', href: '/location'   },
                  { label: 'Blog',       desc: 'Property insights',       href: '/blog'       },
                ].map(({ label, desc, href }) => (
                  <Link
                    key={href}
                    href={href}
                    className="group flex flex-col gap-1.5 rounded-2xl border border-border
                      p-6 text-center bg-white
                      hover:border-gold/50 hover:shadow-[0_6px_24px_rgba(200,169,126,0.10)]
                      hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <span className="font-display font-bold text-ink group-hover:text-gold
                      transition-colors duration-200"
                      style={{ fontSize: 'clamp(1.15rem, 1.3vw, 1.4rem)', letterSpacing: '-0.02em' }}>
                      {label}
                    </span>
                    <span className="text-subtle font-medium"
                      style={{ fontSize: 'clamp(1rem, 1.05vw, 1.15rem)' }}>
                      {desc}
                    </span>
                  </Link>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

      </main>
    </>
  );
}
