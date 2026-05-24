'use client';

import { useEffect, useRef, useState } from 'react';

export default function PageLoader() {
  const [visible, setVisible] = useState(true);  // show on every page load/refresh
  const [pct, setPct]         = useState(0);
  const [exiting, setExiting] = useState(false);
  const rafRef                = useRef<number>(0);

  useEffect(() => {
    // Respect prefers-reduced-motion — skip loader entirely
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(false);
      return;
    }

    document.body.style.overflow = 'hidden';

    const DURATION = 1900; // ms — 0 → 100%
    const start    = performance.now();

    const tick = (now: number) => {
      const t     = Math.min((now - start) / DURATION, 1);
      const eased = 1 - (1 - t) ** 3; // ease-out cubic
      setPct(Math.floor(eased * 100));

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setPct(100);
        // Hold at 100% briefly, then slide the overlay upward
        setTimeout(() => {
          setExiting(true);
          setTimeout(() => {
            setVisible(false);
            document.body.style.overflow = '';
          }, 760);
        }, 380);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.body.style.overflow = '';
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`loader-overlay${exiting ? ' loader-exit' : ''}`}
      role="status"
      aria-label="Loading Parkland By The River"
    >
      <div className="loader-content">

        {/* Johor Bahru label — fades in first */}
        <p className="loader-eyebrow">Johor Bahru</p>

        {/* Main brand name — rises up after label */}
        <div className="loader-title" aria-hidden="true">
          Parkland
          <br />
          <em>By The River</em>
        </div>

        {/* Progress track + river wave */}
        <div className="loader-progress-wrap" aria-hidden="true">
          <div className="loader-track">
            <div className="loader-fill" style={{ width: `${pct}%` }} />
          </div>

          {/* Flowing river-line wave beneath the track */}
          <svg
            className="loader-wave-svg"
            viewBox="0 0 300 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path
              className="loader-wave-path"
              d="M0,6 C8,2 22,10 30,6 S52,2 60,6 S82,10 90,6 S112,2 120,6 S142,10 150,6 S172,2 180,6 S202,10 210,6 S232,2 240,6 S262,10 270,6 S292,2 300,6"
            />
          </svg>
        </div>

        {/* Percentage counter */}
        <p
          className="loader-pct"
          aria-live="polite"
          aria-atomic="true"
        >
          {String(pct).padStart(2, '0')}%
        </p>
      </div>
    </div>
  );
}
