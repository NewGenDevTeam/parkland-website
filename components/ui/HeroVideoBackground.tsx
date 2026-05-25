'use client';

import Image    from 'next/image';
import { useEffect, useRef, useState } from 'react';

/**
 * Two-layer hero background:
 *
 *  Layer 1 ————————— hero-building.webp as a Next.js Image (priority).
 *                     Covers the full section (inset-0). Fallback for iOS
 *                     Low Power Mode — always visible until video plays.
 *                     Fades out in sync with the video to prevent duplicate
 *                     media being visible at the same time.
 *
 *  Layer 2 (top) ———— The hero video starts fully transparent (opacity-0)
 *                     and cross-fades to opacity-100 only once the browser
 *                     fires the `playing` event. If autoplay is blocked the
 *                     video stays invisible and Layer 1 shows through.
 *
 * Both layers use absolute inset-0 so they cover the full hero section with
 * no sky gap at the bottom. The section's bg-black is the safe fallback.
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
      {/* ── Layer 1: Building fallback image ────────────────────────────────
          Covers the FULL hero section (inset-0) so no background colour or
          sky layer bleeds in from any edge.
          Fades OUT in sync with the video fading IN — never both visible.  */}
      <div
        aria-hidden="true"
        className={[
          'absolute inset-0',
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

      {/* ── Layer 2: Video ──────────────────────────────────────────────────
          Covers the FULL hero section (inset-0), identical focal point to
          Layer 1 for a seamless cross-fade with no frame jump.
          Starts opacity-0; fades to opacity-100 once `playing` fires.     */}
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
          'absolute inset-0 w-full h-full',
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
