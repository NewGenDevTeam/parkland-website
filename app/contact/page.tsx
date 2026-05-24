import type { Metadata } from 'next';
import Link        from 'next/link';
import Header      from '@/components/layout/Header';
import Reveal      from '@/components/motion/Reveal';
import ContactForm from '@/components/sections/ContactForm';
import ContactInfo from '@/components/sections/ContactInfo';

export const metadata: Metadata = {
  title:       'Contact | Parkland By The River',
  description:
    'Contact Parkland By The River to register your interest or speak with our team. ' +
    'Located in Permas Jaya, Johor Bahru. Call or WhatsApp us today.',
  keywords: [
    'Parkland By The River contact',
    'Permas Jaya property enquiry',
    'Johor Bahru serviced apartment contact',
    'Parkland register interest',
  ],
};

function IcWhatsApp() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.121 1.531 5.847L0 24l6.306-1.508A11.933 11.933 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.956 0-3.784-.528-5.354-1.447l-.387-.228-3.943.942.974-3.832-.252-.399A9.935 9.935 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
    </svg>
  );
}

function IcFloorPlan() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 9v12M15 3v6" />
    </svg>
  );
}

function IcPin() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>

        {/* ══ 1. Hero ═════════════════════════════════════════════════════════ */}
        <section className="section-dark pt-28 pb-20 lg:pt-36 lg:pb-24">
          <div className="container-site">
            <div className="max-w-2xl">
              <Reveal from="left" delay={0}>
                <p className="section-label mb-4">Get in Touch</p>
              </Reveal>
              <Reveal from="left" delay={80}>
                <span className="gold-rule mb-7" />
              </Reveal>
              <Reveal from="left" delay={160} blur>
                <h1 className="type-heading text-white mb-6">
                  Let&apos;s Talk
                </h1>
              </Reveal>
              <Reveal from="bottom" delay={300}>
                <p className="type-lead-light max-w-lg">
                  Register your interest or speak with the Parkland By The River
                  team for more information about our units and availability.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ══ 2. Form + Info ══════════════════════════════════════════════════ */}
        <section className="section-white py-16 lg:py-20">
          <div className="container-site">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_20rem] xl:grid-cols-[1fr_22rem]
              gap-10 xl:gap-14 items-start max-w-5xl mx-auto">

              {/* Left — contact form — staggered */}
              <div>
                <Reveal from="left" delay={0}>
                  <p className="section-label-on-light mb-3">Register Interest</p>
                </Reveal>
                <Reveal from="left" delay={120} blur>
                  <h2
                    className="font-display font-bold text-ink mb-7"
                    style={{ fontSize: 'clamp(1.25rem, 2vw, 1.625rem)', letterSpacing: '-0.03em' }}
                  >
                    Send Us a Message
                  </h2>
                </Reveal>
                <Reveal from="bottom" delay={260}>
                  <ContactForm />
                </Reveal>
              </div>

              {/* Right — contact info (self-animates internally) */}
              <ContactInfo />

            </div>
          </div>
        </section>

        {/* ══ 3. Quick CTA strip ══════════════════════════════════════════════ */}
        <section className="section-light py-14 lg:py-16">
          <div className="container-site">
            <Reveal from="bottom" delay={0}>
              <p className="text-center text-[0.6875rem] font-semibold uppercase
                tracking-widest text-subtle mb-6">
                Quick Actions
              </p>
            </Reveal>
            <Reveal from="bottom" delay={80}>
              <div className="flex flex-col sm:flex-row gap-3 justify-center flex-wrap">

                <a
                  href="https://wa.me/60136655111"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5
                    btn-base btn-primary"
                >
                  <IcWhatsApp />
                  WhatsApp Us
                </a>

                <Link
                  href="/floor-plans"
                  className="inline-flex items-center justify-center gap-2.5
                    btn-base btn-ghost-dark"
                >
                  <IcFloorPlan />
                  View Floor Plans
                </Link>

                <Link
                  href="/location"
                  className="inline-flex items-center justify-center gap-2.5
                    btn-base btn-ghost-dark"
                >
                  <IcPin />
                  Explore Location
                </Link>

              </div>
            </Reveal>
          </div>
        </section>

      </main>
    </>
  );
}
