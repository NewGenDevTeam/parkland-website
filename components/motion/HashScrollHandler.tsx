'use client';

import { useEffect } from 'react';

/**
 * HashScrollHandler — prevents browser scroll-restoration from defeating
 * scroll-entrance animations on hash URLs and page refresh.
 *
 * Problem:
 *   When navigating to /#location (or refreshing at a section), the browser
 *   restores the scroll position BEFORE React hydrates. Reveal elements are
 *   then already inside the viewport when observers start, so the observer
 *   fires immediately. With the old single-effect Reveal this caused no
 *   animation. With the new two-effect Reveal this is fixed — but we still
 *   want clean scroll behaviour with the correct header offset.
 *
 * What this does:
 *   1. Sets history.scrollRestoration = "manual" so the browser never jumps
 *      to a mid-page position automatically.
 *   2. If a hash exists in the URL, waits ~120 ms (enough for Reveal's
 *      two-effect cycle: 2 rAFs + React re-render + Effect 2) then scrolls
 *      to the target element with header clearance.
 *   3. Returns null — renders nothing visible.
 */
export default function HashScrollHandler() {
  useEffect(() => {
    // Disable automatic scroll restoration — we scroll manually so
    // Reveal observers are guaranteed to be active before the section
    // enters the viewport.
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    const raw = window.location.hash;
    if (!raw) return;

    const id = raw.replace(/^#+/, ''); // strip one or more leading '#'
    if (!id) return;

    // 120 ms ≈ 7 frames @ 60 fps — comfortably after Reveal's two-effect
    // cycle completes (2 rAFs → setReady → re-render → Effect 2 → observe).
    const timer = setTimeout(() => {
      const target = document.getElementById(id);
      if (!target) return;

      const HEADER_H = 88; // px — fixed header height (h-16 / lg:h-20)
      const top =
        target.getBoundingClientRect().top + window.scrollY - HEADER_H;

      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    }, 120);

    return () => clearTimeout(timer);
  }, []);

  return null;
}
