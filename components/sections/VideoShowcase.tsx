import Reveal              from '@/components/motion/Reveal';
import SafeAutoplayVideo   from '@/components/ui/SafeAutoplayVideo';

export default function VideoShowcase() {
  return (
    <section className="section-dark section-pad">

      {/* Heading — stays in container for aligned text */}
      <div className="container-site">
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
      </div>

      {/* Video — full-bleed, no frame, no side margins */}
      <Reveal from="bottom" delay={280}>
        <div
          className="w-full overflow-hidden"
          style={{ height: 'clamp(260px, 38vw, 620px)' }}
        >
          <SafeAutoplayVideo
            src="/assets/parkland/videos/parkland-showcase.mp4"
            poster="/assets/parkland/images/hero-render.jpg"
            className="w-full h-full block object-cover object-center"
            style={{ pointerEvents: 'none' }}
          />
        </div>
      </Reveal>

    </section>
  );
}
