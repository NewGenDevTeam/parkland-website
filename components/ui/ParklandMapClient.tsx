'use client';

import dynamic from 'next/dynamic';

const ParklandMap = dynamic(
  () => import('@/components/ui/interactive-map').then(m => m.ParklandMap),
  {
    ssr: false,
    loading: () => (
      <div
        className="w-full h-full rounded-2xl bg-stone-100 animate-pulse"
        aria-label="Loading map…"
      />
    ),
  }
);

export default function ParklandMapClient({ height = 420 }: { height?: number }) {
  return <ParklandMap height={height} />;
}
