import Image from 'next/image';
import Link  from 'next/link';

const NAV_LINKS = [
  { label: 'Home',        href: '/'            },
  { label: 'Location',    href: '/location'    },
  { label: 'Facilities',  href: '/facilities'  },
  { label: 'Floor Plans', href: '/floor-plans' },
  { label: 'Blog',        href: '/blog'        },
  { label: 'Contact',     href: '/contact'     },
];

const LEGAL_LINKS = [
  { label: 'Terms & Conditions', href: 'https://parklandgroup.my/terms-conditions/' },
  { label: 'Privacy Policy',     href: 'https://parklandgroup.my/PRIVACY'           },
];

const CONTACT_EMAIL = 'general@parklandgroup.com.my';

const COLUMN_LABEL = `
  text-gold font-semibold uppercase mb-5
  tracking-[0.13em]
`.trim();

const LINK_CLASS = `
  inline-block text-white/65 hover:text-gold transition-colors duration-200
  focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-3 rounded-xs
`.trim();

/* Animated underline for legal links — pseudo-element scaleX reveal,
   absolute-positioned so it never shifts the surrounding layout */
const LEGAL_UNDERLINE = `
  relative after:absolute after:left-0 after:-bottom-1 after:h-[1.5px] after:w-full
  after:bg-gold after:origin-left after:scale-x-0 after:transition-transform after:duration-300
  hover:after:scale-x-100 focus-visible:after:scale-x-100
`.trim();

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-river border-t border-gold/20">
      <div
        className="mx-auto w-full max-w-[80rem] pt-14 lg:pt-20 pb-10"
        style={{ paddingLeft: 'clamp(1.5rem, 3vw, 4rem)', paddingRight: 'clamp(1.5rem, 3vw, 4rem)' }}
      >

        {/* ── Top: brand + link columns ─────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-[1.5fr_1fr_1.2fr] gap-10 lg:gap-14">

          {/* Brand */}
          <div>
            <Link
              href="/"
              className="inline-block focus-visible:outline-2 focus-visible:outline-gold
                focus-visible:outline-offset-3 rounded-xs"
            >
              <Image
                src="/assets/parkland/logo/parkland-logo.webp"
                alt="Parkland By The River"
                width={160}
                height={48}
                className="h-10 lg:h-12 w-auto brightness-0 invert"
              />
            </Link>
            <p
              className="text-white/55 leading-relaxed mt-5 max-w-xs"
              style={{ fontSize: 'clamp(1rem, 1.05vw, 1.125rem)', lineHeight: '1.75' }}
            >
              Freehold riverside apartment in Permas Jaya, Johor Bahru —
              modern facilities with easy access to CIQ, RTS, and the city centre.
            </p>
          </div>

          {/* Navigation — 2-column × 3-row grid */}
          <nav aria-label="Footer navigation">
            <p className={COLUMN_LABEL} style={{ fontSize: 'clamp(0.9rem, 0.95vw, 1rem)' }}>
              Explore
            </p>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-3">
              {NAV_LINKS.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`${LINK_CLASS} whitespace-nowrap`}
                    style={{ fontSize: 'clamp(1.05rem, 1.1vw, 1.175rem)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <p className={COLUMN_LABEL} style={{ fontSize: 'clamp(0.9rem, 0.95vw, 1rem)' }}>
              Contact
            </p>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className={`${LINK_CLASS} break-all`}
                  style={{ fontSize: 'clamp(1.05rem, 1.1vw, 1.175rem)', overflowWrap: 'anywhere' }}
                >
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li
                className="text-white/55 leading-relaxed"
                style={{ fontSize: 'clamp(1.05rem, 1.1vw, 1.175rem)' }}
              >
                Permas Jaya, Johor Bahru, Malaysia
              </li>
            </ul>
          </div>

        </div>

        {/* ── Bottom bar ────────────────────────────────────────────────── */}
        {/* Extra bottom padding on mobile keeps the floating WhatsApp button
            clear of the legal links and copyright line */}
        <div className="border-t border-white/10 mt-12 lg:mt-16 pt-7 pb-20 md:pb-0">
          <ul className="flex flex-wrap justify-center gap-x-10 gap-y-3">
            {LEGAL_LINKS.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${LINK_CLASS} ${LEGAL_UNDERLINE}`}
                  style={{ fontSize: 'clamp(1.05rem, 1.1vw, 1.175rem)' }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <p
            className="text-white/45 text-center leading-relaxed mt-5"
            style={{ fontSize: 'clamp(0.9rem, 0.95vw, 1rem)' }}
          >
            &copy; {year} Parkland By The River. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
