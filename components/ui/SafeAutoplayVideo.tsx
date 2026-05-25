'use client';

import { useEffect, useRef } from 'react';

interface SafeAutoplayVideoProps {
  /** Path to the mp4 source — must be an absolute public path starting with / */
  src: string;
  /** Poster image shown instantly and as the Low Power Mode fallback */
  poster?: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Background/showcase video that works correctly on iOS Safari including
 * Low Power Mode.
 *
 * Behaviour:
 *  - Attempts autoplay on mount (succeeds on desktop and most Android).
 *  - If play() is rejected (iOS Low Power Mode, data-saver, etc.) the poster
 *    image is shown automatically — no blank box, no broken UI.
 *  - Registers one-time listeners for the first touchstart / click / scroll
 *    event and retries play() at that point, covering the common case where
 *    a user wakes up their phone and interacts with the page.
 *  - All listeners are removed on unmount — no memory leaks.
 */
export default function SafeAutoplayVideo({
  src,
  poster,
  className,
  style,
}: SafeAutoplayVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Set muted properties directly on the DOM node.
    // React's `muted` prop is not always serialised to the DOM attribute in
    // all browser/hydration scenarios; setting the property here guarantees it.
    el.muted = true;
    // `defaultMuted` is a DOM property, not a valid React/JSX prop — setting
    // it here avoids the "React does not recognize the prop" console warning.
    (el as HTMLVideoElement & { defaultMuted: boolean }).defaultMuted = true;
    // webkit-playsinline covers very old iOS Safari (pre-10). Must use
    // setAttribute because JSX does not accept hyphenated custom attributes.
    el.setAttribute('webkit-playsinline', 'true');

    // Attempt autoplay. iOS Low Power Mode rejects this promise — the browser
    // will already be showing the poster image, so we just swallow the error.
    el.play().catch(() => {});

    // Retry on first user interaction. `once: true` means the listener removes
    // itself automatically after firing, preventing any accumulation.
    const retry = () => {
      if (el.paused) el.play().catch(() => {});
    };
    const opts: AddEventListenerOptions = { once: true, passive: true };
    document.addEventListener('touchstart', retry, opts);
    document.addEventListener('click',      retry, opts);
    document.addEventListener('scroll',     retry, opts);

    return () => {
      document.removeEventListener('touchstart', retry);
      document.removeEventListener('click',      retry);
      document.removeEventListener('scroll',     retry);
    };
  }, []);

  return (
    // Props that suppress iOS / Safari native play overlay and PiP button are
    // passed via spread where TypeScript types don't include them yet.
    <video
      ref={ref}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      controls={false}
      poster={poster}
      className={className}
      style={style}
      aria-hidden="true"
      disablePictureInPicture
      controlsList="nodownload noplaybackrate nofullscreen"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
