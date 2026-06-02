import type { Metadata } from 'next';
import { OG_IMAGE } from '@/lib/seoConfig';
import Header      from '@/components/layout/Header';
import Reveal      from '@/components/motion/Reveal';
import ContactForm from '@/components/sections/ContactForm';
import ContactInfo from '@/components/sections/ContactInfo';

export const metadata: Metadata = {
  title:       'Contact Us | Parkland By The River',
  description: 'Get in touch with our team for inquiries, project details, unit availability, or to schedule an appointment at Parkland By The River.',
  keywords:    [
    'Parkland By The River contact',
    'Permas Jaya property enquiry',
    'Johor Bahru serviced apartment contact',
    'Parkland register interest',
  ],
  alternates: { canonical: '/contact' },
  openGraph: {
    title:       'Contact Us | Parkland By The River',
    description: 'Get in touch with our team for inquiries, project details, unit availability, or to schedule an appointment at Parkland By The River.',
    url:         '/contact',
    images:      OG_IMAGE,
  },
};

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
                    style={{ fontSize: 'clamp(2.3rem, 2.6vw, 3rem)', letterSpacing: '-0.03em', lineHeight: '1.15' }}
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

      </main>
    </>
  );
}
