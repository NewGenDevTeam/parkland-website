import Link from 'next/link';

const BADGES = [
  '8km to CIQ & RTS',
  'Freehold',
  '36 Floors · 4 Towers',
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex items-end min-h-screen overflow-hidden bg-black"
    >
      {/* ── Cinematic video background ── */}
      <div className="absolute inset-0">

        {/*
         * poster= shows instantly while the video loads (or if video fails entirely).
         * hero-building.webp is the official hero render — same image the original
         * RevSlider used, so the page always looks correct even with JS/video off.
         */}
        <video
          className="absolute inset-0 w-full h-full object-cover object-[center_top] sm:object-[center_10%]"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/assets/parkland/images/hero-building.webp"
          aria-hidden="true"
        >
          <source
            src="/assets/parkland/videos/parkland-hero-building.mp4"
            type="video/mp4"
          />
        </video>

        {/* Bottom fade — enough to keep text readable, no color tint */}
        <div className="absolute inset-0 bg-gradient-to-t
          from-black/50
          via-black/20
          to-transparent"
        />

        {/* Left vignette — anchors the text block, neutral black only */}
        <div className="absolute inset-0 bg-gradient-to-r
          from-black/45
          via-black/15
          to-transparent"
        />
      </div>

      {/* ── Hero content — real HTML text, SEO-readable ── */}
      <div className="relative z-10 container-site w-full pb-24 lg:pb-32 pt-40 lg:pt-44">
        <div className="max-w-[38rem] lg:max-w-[46rem]">

          {/* Section label */}
          <p className="section-label hero-animate delay-100 mb-4">
            Freehold Serviced Apartment &middot; Permas Jaya, Johor Bahru
          </p>

          {/* Gold accent rule */}
          <span className="gold-rule hero-animate delay-200 mb-7" />

          {/* Main headline — Playfair Display */}
          <h1
            className="hero-animate delay-300 mb-7 font-display font-bold leading-[1.03]
              text-[clamp(3rem,7vw,5.25rem)] tracking-[-0.04em] text-white
              [text-shadow:0_2px_24px_rgba(0,0,0,0.55)]"
          >
            Parkland<br />
            <span className="text-gold italic">By The River</span>
          </h1>

          {/* Sub-copy — verbatim from old website */}
          <p className="type-lead-light max-w-[30rem] hero-animate delay-400 mb-10">
            A Luxurious Serviced Apartment with Modern Design and Unparalleled
            Convenience. Experience riverside living at the heart of Permas Jaya.
          </p>

          {/* Project highlight badges — verified from old website */}
          <div className="flex flex-wrap gap-2.5 hero-animate delay-500 mb-10">
            {BADGES.map((badge) => (
              <span key={badge} className="stat-badge-dark">
                {badge}
              </span>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap items-center gap-4 hero-animate delay-600">
            <Link href="/contact" className="btn-base btn-primary">
              Let&apos;s Talk
            </Link>
            <Link href="/floor-plans" className="btn-base btn-ghost-white">
              View Floor Plans
            </Link>
          </div>
        </div>
      </div>

      {/* ── Scroll cue ── */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2
          hero-animate-fade delay-700
          flex flex-col items-center gap-2 text-white/30"
      >
        <span className="text-[0.625rem] tracking-[0.22em] uppercase font-medium">
          Scroll
        </span>
        <div className="w-px h-7 bg-gradient-to-b from-white/30 to-transparent" />
      </div>
    </section>
  );
}
