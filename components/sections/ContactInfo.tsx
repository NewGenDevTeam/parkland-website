import Image from 'next/image';
import Link  from 'next/link';
import Reveal from '@/components/motion/Reveal';
import { getSiteSettings, buildWhatsAppHref } from '@/lib/wordpress';

const FALLBACK = {
  projectName: 'Parkland By The River @ Permas Jaya',
  location:    'Permas Jaya, Johor Bahru, Malaysia',
  phone:       '+60 12-631 5811',
  whatsapp:    'https://wa.me/60126315811?text=Hi%2C%20I%20am%20interested%20in%20Parkland%20By%20The%20River.',
};

function IcPhone() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 17.92z" />
    </svg>
  );
}

function IcWhatsApp() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.121 1.531 5.847L0 24l6.306-1.508A11.933 11.933 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.956 0-3.784-.528-5.354-1.447l-.387-.228-3.943.942.974-3.832-.252-.399A9.935 9.935 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
    </svg>
  );
}

function IcPin() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function SalesGalleryMap() {
  return (
    <div>
      <p className="font-semibold uppercase tracking-widest text-subtle mb-3"
        style={{ fontSize: 'clamp(1rem, 1vw, 1.15rem)' }}>
        Sales Gallery
      </p>
      <div className="overflow-hidden rounded-2xl border border-border
        shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
        <iframe
          src="https://www.google.com/maps?q=2.2188461,102.6645809&z=17&output=embed"
          width="100%"
          title="Parkland Sales Gallery location"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-40 md:h-50 block"
          style={{ border: 0 }}
        />
        <div className="px-5 py-4 border-t border-border bg-[#FAFAF8]
          flex items-center justify-between gap-4">
          <p className="text-ink font-semibold leading-snug"
            style={{ fontSize: 'clamp(1rem, 1.05vw, 1.125rem)' }}>
            Parkland Group @ Grisek Sales Gallery
          </p>
          <a
            href="https://maps.app.goo.gl/PCQ5rWpTZHPcNKam9"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-gold font-semibold
              hover:text-gold-deep transition-colors duration-200"
            style={{ fontSize: 'clamp(0.9rem, 0.95vw, 1rem)' }}
          >
            Get Directions →
          </a>
        </div>
      </div>
    </div>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon:   React.ReactNode;
  label:  string;
  value:  string;
  href?:  string;
}) {
  const inner = (
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-gold/10 text-gold flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <p style={{ fontSize: 'clamp(1rem, 1vw, 1.15rem)' }}
          className="font-semibold uppercase tracking-widest text-subtle mb-0.5">
          {label}
        </p>
        <p className="text-ink font-semibold leading-snug"
          style={{ fontSize: 'clamp(1.15rem, 1.2vw, 1.3rem)', lineHeight: '1.55' }}>
          {value}
        </p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        className="block border border-border rounded-xl px-5 py-5
          hover:border-gold/40 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)]
          transition-[border-color,box-shadow] duration-300"
      >
        {inner}
      </a>
    );
  }

  return (
    <div className="border border-border rounded-xl px-5 py-5">
      {inner}
    </div>
  );
}

export default async function ContactInfo() {
  const settings = await getSiteSettings();

  const phone    = settings?.phone_number    || FALLBACK.phone;
  const location = settings?.address         || FALLBACK.location;
  const waHref   = buildWhatsAppHref(settings, FALLBACK.whatsapp);
  const email    = settings?.email           || null;

  return (
    <div className="flex flex-col gap-6">

      {/* Heading */}
      <div>
        <Reveal from="left" delay={0}>
          <p className="section-label-on-light mb-3">Get in Touch</p>
        </Reveal>
        <Reveal from="left" delay={100} blur>
          <h2
            className="font-display font-bold text-ink leading-tight"
            style={{ fontSize: 'clamp(2.3rem, 2.6vw, 3rem)', letterSpacing: '-0.03em', lineHeight: '1.15' }}
          >
            {FALLBACK.projectName}
          </h2>
        </Reveal>
      </div>

      {/* Contact cards + maps — all in one tightly-spaced group */}
      <div className="flex flex-col gap-3">
        <Reveal from="bottom" delay={200}>
          <ContactRow
            icon={<IcPhone />}
            label="Call Us"
            value={phone}
            href={`tel:+60${phone.replace(/^\+?60\s?/, '').replace(/^0/, '').replace(/[^0-9]/g, '')}`}
          />
        </Reveal>
        <Reveal from="bottom" delay={280}>
          <ContactRow
            icon={<IcWhatsApp />}
            label="WhatsApp"
            value={phone}
            href={waHref}
          />
        </Reveal>
        {email && (
          <Reveal from="bottom" delay={320}>
            <ContactRow
              icon={<IcPhone />}
              label="Email"
              value={email}
              href={`mailto:${email}`}
            />
          </Reveal>
        )}
        <Reveal from="bottom" delay={360}>
          <ContactRow
            icon={<IcPin />}
            label="Location"
            value={location}
          />
        </Reveal>

        {/* Our Location map — same gap-3 as cards above */}
        <Reveal from="bottom" scale delay={440}>
          <div>
            <p className="font-semibold uppercase tracking-widest text-subtle mb-2"
              style={{ fontSize: 'clamp(1rem, 1vw, 1.15rem)' }}>
              Our Location
            </p>
            <Link href="/location" aria-label="View full location details">
              <div className="relative w-full h-44 overflow-hidden rounded-2xl
                border border-border
                shadow-[0_2px_12px_rgba(0,0,0,0.08)]
                hover:shadow-[0_6px_24px_rgba(0,0,0,0.12)]
                transition-shadow duration-300"
              >
                <Image
                  src="/assets/parkland/location/location-map.webp"
                  alt="Parkland By The River — location map, Permas Jaya, Johor Bahru"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 38vw, 100vw"
                />
                <div
                  aria-hidden="true"
                  className="absolute bottom-0 inset-x-0 px-4 py-3
                    bg-linear-to-t from-black/60 to-transparent"
                >
                  <p className="text-white text-[0.9375rem] font-medium">
                    Permas Jaya, Johor Bahru → <span className="text-gold">View Location</span>
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </Reveal>

        {/* Sales Gallery map — same gap-3 as everything above */}
        <Reveal from="bottom" scale delay={520}>
          <SalesGalleryMap />
        </Reveal>
      </div>

    </div>
  );
}
