'use client';

import { useState } from 'react';

/**
 * Renders the location master map image.
 * If the file is missing, shows a clean placeholder instead of a broken box.
 * Drop public/images/location-master-map.webp to replace the placeholder.
 */
export default function LocationMasterMap() {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        className="w-full rounded-2xl flex items-center justify-center
          bg-gradient-to-br from-[#f5f0e8] to-[#ede8de]
          border border-[#e5dfd4]"
        style={{ minHeight: '260px' }}
      >
        <div className="text-center px-8 py-10">
          <div
            className="w-12 h-12 rounded-full bg-gold/10 flex items-center
              justify-center mx-auto mb-4"
          >
            <svg
              viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
              className="w-6 h-6 text-gold" aria-hidden="true"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>
          <p className="text-[0.875rem] font-semibold text-ink mb-1">
            Location Master Map
          </p>
          <p className="text-[0.75rem] text-subtle">
            Add{' '}
            <span className="font-mono bg-gold/10 px-1.5 py-0.5 rounded text-gold-deep text-[0.6875rem]">
              public/assets/parkland/location/mastermap.webp
            </span>{' '}
            to display
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full rounded-2xl overflow-hidden
        shadow-[0_20px_64px_rgba(0,0,0,0.10),0_4px_16px_rgba(0,0,0,0.06)]
        ring-1 ring-[rgba(200,169,126,0.14)]"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/parkland/location/mastermap.webp"
        alt="Parkland By The River — location master map, Permas Jaya, Johor Bahru"
        className="w-full h-auto block"
        onError={() => setError(true)}
      />
    </div>
  );
}
