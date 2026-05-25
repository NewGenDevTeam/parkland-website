'use client';

import Image    from 'next/image';
import { useEffect, useRef, useState } from 'react';

/**
 * Three-layer hero background:
 *
 *  Layer 1 (bottom) — hero-sky-bg.webp as a CSS background.
 *                     Always visible. Provides the atmospheric depth when
 *                     the building image is semi-transparent or the video
 *                     has not yet started.
 *
 *  Layer 2 ————————— hero-building.webp as a Next.js Image (priority).
 *                     Always visible. This IS the fallback for iOS Low Power
 *                     Mode. It is never hidden, so there is zero blank state.
 *
 *  Layer 3 (top) ———— The hero video starts fully transparent (opacity-0)
 *                     and cross-fades to opacity-100 only once the browser
 *                     fires the `playing` event. If autoplay is blocked the
 *                     video stays invisible and the composed image shows
 *                     through perfectly.
 *
 * On the first touchstart / click / scroll the video retries play().
 * All event listeners are removed on unmount — no memory leaks.
 */
export default function HeroVideoBackground() {
  const videoRef     = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    // Show video as soon as its first frame is decoded — eliminates the
    // "frozen wrong image" gap between fallback and video content.
    const showVideo = () => setPlaying(true);
    // When data is buffered, push play() in case autoplay was deferred.
    const onCanPlay = () => { el.play().catch(() => {}); };
    // Safety net: restart manually if loop attribute glitches on mobile.
    const onEnded   = () => { el.currentTime = 0; el.play().catch(() => {}); };

    el.addEventListener('loadeddata', showVideo);
    el.addEventListener('playing',    showVideo);
    el.addEventListener('canplay',    onCanPlay);
    el.addEventListener('ended',      onEnded);

    el.muted = true;
    (el as HTMLVideoElement & { defaultMuted: boolean }).defaultMuted = true;
    el.setAttribute('webkit-playsinline', 'true');

    el.load();
    el.play().catch(() => {
      // Blocked (Low Power Mode, data-saver, etc.).
      // Layer 2 (building image) is already visible — nothing to do.
    });

    // Retry on first user interaction.  once:true auto-cleans each listener.
    const retry = () => {
      if (el.paused) el.play().catch(() => {});
    };
    const opts: AddEventListenerOptions = { once: true, passive: true };
    document.addEventListener('touchstart', retry, opts);
    document.addEventListener('click',      retry, opts);
    document.addEventListener('scroll',     retry, opts);

    return () => {
      el.removeEventListener('loadeddata', showVideo);
      el.removeEventListener('playing',    showVideo);
      el.removeEventListener('canplay',    onCanPlay);
      el.removeEventListener('ended',      onEnded);
      document.removeEventListener('touchstart', retry);
      document.removeEventListener('click',      retry);
      document.removeEventListener('scroll',     retry);
    };
  }, []);

  return (
    <>
      {/* ── Layer 1: Sky atmosphere ─────────────────────────────────────────
          Fills the FULL section including the area behind the fixed navbar.
          The semi-transparent navbar shows sky above the building on mobile,
          which looks natural. CSS background has zero layout cost.         */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:    'url(/assets/parkland/images/hero-sky-bg.webp)',
          backgroundSize:     'cover',
          backgroundPosition: 'center center',
        }}
      />

      {/* ── Layer 2: Building fallback image ────────────────────────────────
          Mobile:  starts at top-16 (64 px = navbar height) so the building
                   roof is never hidden behind the navbar.
          Desktop: top-0, full cover — landscape frame handles composition.

          Fades OUT in sync with the video fading IN so that only one media
          layer is ever visible at a time — fixes mobile duplicate hero.    */}
      <div
        aria-hidden="true"
        className={[
          'absolute inset-x-0 top-16 sm:top-0 bottom-0',
          'transition-opacity duration-1200 ease-in',
          playing ? 'opacity-0' : 'opacity-100',
        ].join(' ')}
      >
        <Image
          src="/assets/parkland/images/hero-building.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[42%_center] sm:object-[center_10%]"
        />
      </div>

      {/* ── Layer 3: Video ──────────────────────────────────────────────────
          Identical positioning and focal point to Layer 2 so the cross-fade
          is seamless — the frame doesn't jump when video takes over.
          Starts opacity-0; fades to opacity-100 once `playing` event fires. */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        controls={false}
        aria-hidden="true"
        disablePictureInPicture
        controlsList="nodownload noplaybackrate nofullscreen"
        className={[
          'absolute inset-x-0 top-16 sm:top-0 bottom-0 w-full',
          'object-cover object-[42%_center] sm:object-[center_10%]',
          'transition-opacity duration-1200 ease-in',
          playing ? 'opacity-100' : 'opacity-0',
        ].join(' ')}
      >
        <source src="/assets/parkland/videos/parkland-hero-building.mp4" type="video/mp4" />
      </video>
    </>
  );
}
