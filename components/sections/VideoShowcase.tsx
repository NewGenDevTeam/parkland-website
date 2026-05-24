import Reveal from '@/components/motion/Reveal';

export default function VideoShowcase() {
  return (
    <section className="section-dark section-pad">
      <div className="container-site">

        {/* Heading */}
        <div className="text-center mb-10">
          <Reveal from="bottom" delay={0}>
            <p className="section-label mb-4">Project Showcase</p>
          </Reveal>
          <Reveal from="bottom" delay={80}>
            <span className="gold-rule mx-auto mb-7" />
          </Reveal>
          <Reveal from="bottom" delay={160} blur>
            <h2
              className="font-display font-bold text-white leading-tight"
              style={{ fontSize: 'clamp(1.875rem, 3.5vw, 3rem)', letterSpacing: '-0.03em' }}
            >
              Experience Parkland<br />
              <span className="text-gold italic">By The River</span>
            </h2>
          </Reveal>
        </div>

        {/* Video — natural dimensions, no cropping */}
        <Reveal from="bottom" delay={280} scale>
          <div
            className="w-full max-w-7xl mx-auto rounded-2xl overflow-hidden
              shadow-[0_24px_80px_rgba(0,0,0,0.55)]
              ring-1 ring-gold/20"
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="w-full h-auto block"
              style={{ pointerEvents: 'none' }}
            >
              <source src="/assets/parkland/videos/parkland-showcase.mp4" type="video/mp4" />
            </video>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
