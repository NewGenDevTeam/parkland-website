import type { Metadata } from 'next';
import Link             from 'next/link';
import { OG_IMAGE }    from '@/lib/seoConfig';
import Header            from '@/components/layout/Header';
import Footer            from '@/components/layout/Footer';
import Hero              from '@/components/sections/Hero';
import ProjectOverview   from '@/components/sections/ProjectOverview';
import ProjectHighlights from '@/components/sections/ProjectHighlights';
import VideoShowcase     from '@/components/sections/VideoShowcase';
import LocationPreview   from '@/components/sections/LocationPreview';
import Reveal            from '@/components/motion/Reveal';
export const revalidate = 300;

export const metadata: Metadata = {
  title:       'Parkland By The River | Freehold Apartment in Permas Jaya',
  description: 'Discover a freehold apartment in Permas Jaya with riverside living, modern facilities, and easy access to CIQ, RTS, and Johor Bahru city centre.',
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
    title:       'Parkland By The River | Freehold Apartment in Permas Jaya',
    description: 'Discover a freehold apartment in Permas Jaya with riverside living, modern facilities, and easy access to CIQ, RTS, and Johor Bahru city centre.',
    url:         '/',
    images:      OG_IMAGE,
  },
};

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://www.parklandbytheriver.com.my/#organization',
        name: 'Parkland Group',
        url: 'https://www.parklandbytheriver.com.my/',
        logo: 'https://www.parklandbytheriver.com.my/_next/image?url=%2Fassets%2Fparkland%2Flogo%2Fparkland-logo.webp&w=384&q=75',
        telephone: '+60-16-967-9111',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Lot 156682, Lebuhraya Johor Bahru-Pasir Gudang',
          addressLocality: 'Johor Bahru',
          addressRegion: 'Johor',
          postalCode: '81750',
          addressCountry: 'MY',
        },
        sameAs: [
          'https://www.facebook.com/parklandgroup',
          'https://www.instagram.com/parkland_group',
          'https://www.tiktok.com/@parkland_group',
          'https://www.youtube.com/@ParklandGroupMY',
          'https://www.linkedin.com/company/parkland-group-my/',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://www.parklandbytheriver.com.my/#website',
        url: 'https://www.parklandbytheriver.com.my/',
        name: 'Parkland By The River',
        publisher: { '@id': 'https://www.parklandbytheriver.com.my/#organization' },
      },
      {
        '@type': 'ApartmentComplex',
        '@id': 'https://www.parklandbytheriver.com.my/#apartment',
        name: 'Parkland By The River',
        url: 'https://www.parklandbytheriver.com.my/',
        description: 'A freehold apartment development in Permas Jaya, Johor Bahru featuring riverside living, modern facilities, and convenient access to CIQ and RTS.',
      },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
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
      <Footer />
    </>
  );
}
