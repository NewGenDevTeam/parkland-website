import type { Metadata } from 'next';
import { OG_IMAGE } from '@/lib/seoConfig';
import Header          from '@/components/layout/Header';
import Footer          from '@/components/layout/Footer';
import LocationSection from '@/components/sections/LocationSection';

export const metadata: Metadata = {
  title:       'Strategic Location Near CIQ & RTS | Parkland By The River',
  description: 'Located in Permas Jaya, Parkland By The River offers convenient access to CIQ, RTS Bukit Chagar, major highways, schools, malls, and amenities.',
  keywords:    [
    'bukit chagar property',
    'condo near RTS Johor',
    'condo near Bukit Chagar',
    'Johor property near Singapore',
    'apartment near RTS station',
    'property near RTS Johor Bahru',
    'property near Singapore border',
    'investment property near RTS',
    'Permas Jaya location',
  ],
  alternates: { canonical: '/location' },
  openGraph: {
    title:       'Strategic Location Near CIQ & RTS | Parkland By The River',
    description: 'Located in Permas Jaya, Parkland By The River offers convenient access to CIQ, RTS Bukit Chagar, major highways, schools, malls, and amenities.',
    url:         '/location',
    images:      OG_IMAGE,
  },
};

export default function LocationPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Place',
        '@id': 'https://www.parklandbytheriver.com.my/location/#place',
        name: 'Parkland By The River',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Lot 156682, Lebuhraya Johor Bahru-Pasir Gudang',
          addressLocality: 'Johor Bahru',
          addressRegion: 'Johor',
          postalCode: '81750',
          addressCountry: 'MY',
        },
      },
      {
        '@type': 'WebPage',
        '@id': 'https://www.parklandbytheriver.com.my/location/#webpage',
        url: 'https://www.parklandbytheriver.com.my/location',
        name: 'Strategic Location Near CIQ & RTS | Parkland By The River',
        isPartOf: { '@id': 'https://www.parklandbytheriver.com.my/#website' },
      },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main className="pt-16 lg:pt-20">
        <LocationSection />
      </main>
      <Footer />
    </>
  );
}
