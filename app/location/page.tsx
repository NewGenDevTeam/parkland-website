import type { Metadata } from 'next';
import Header          from '@/components/layout/Header';
import LocationSection from '@/components/sections/LocationSection';

export const metadata: Metadata = {
  title:       'Location | Parkland By The River — Permas Jaya, Johor Bahru',
  description: 'Strategically located in Permas Jaya, Johor Bahru. Only 8km to the CIQ Complex and RTS Bukit Chagar. Minutes from AEON Mall, Columbia Asia Hospital, and major highways.',
  keywords:    ['Permas Jaya location', 'CIQ distance', 'RTS Bukit Chagar', 'Johor Bahru property location'],
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
