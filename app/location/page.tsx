import type { Metadata } from 'next';
import { OG_IMAGE } from '@/lib/seoConfig';
import Header          from '@/components/layout/Header';
import LocationSection from '@/components/sections/LocationSection';

export const metadata: Metadata = {
  title:       'Strategic Location Near RTS & Bukit Chagar | Parkland',
  description: "Explore Parkland By The River's strategic location near RTS Link, Bukit Chagar, and convenient access between Johor Bahru and Singapore.",
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
    title:       'Strategic Location Near RTS & Bukit Chagar | Parkland',
    description: "Explore Parkland By The River's strategic location near RTS Link, Bukit Chagar, and convenient access between Johor Bahru and Singapore.",
    url:         '/location',
    images:      OG_IMAGE,
  },
};

export default function LocationPage() {
  return (
    <>
      <Header />
      <main className="pt-16 lg:pt-20">
        <LocationSection />
      </main>
    </>
  );
}
