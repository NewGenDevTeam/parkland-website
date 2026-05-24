'use client';

import { useState, useEffect } from 'react';
import Image         from 'next/image';
import Link          from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { label: 'Home',        href: '/'            },
  { label: 'Location',    href: '/location'    },
  { label: 'Facilities',  href: '/facilities'  },
  { label: 'Floor Plans', href: '/floor-plans' },
  { label: 'Blog',        href: '/blog'        },
  { label: 'Contact',     href: '/contact'     },
];

/* ─── Glass styles ──────────────────────────────────────────────────────────
 * Two states: resting (any page, including home over hero video) and scrolled.
 * 3-stop gradient: white pearl → warm cream tint — gives the warm luxury feel.
 * saturate(145%) on backdrop makes content behind look vivid through the glass.
 */
const BLUR = 'blur(22px) saturate(145%)';

const glassStyle = (scrolled: boolean): React.CSSProperties => ({
  background: scrolled
    ? 'linear-gradient(180deg, rgba(255,255,255,0.94) 0%, rgba(255,255,255,0.82) 55%, rgba(245,240,230,0.78) 100%)'
    : 'linear-gradient(180deg, rgba(255,255,255,0.88) 0%, rgba(255,255,255,0.72) 55%, rgba(245,240,230,0.66) 100%)',
  backdropFilter:       BLUR,
  WebkitBackdropFilter: BLUR,
  borderBottom: scrolled
    ? '1px solid rgba(190,150,90,0.34)'
    : '1px solid rgba(190,150,90,0.28)',
  boxShadow: scrolled
    ? '0 14px 40px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.98), inset 0 -1px 0 rgba(190,150,90,0.12)'
    : '0 10px 30px rgba(0,0,0,0.09), inset 0 1px 0 rgba(255,255,255,0.95), inset 0 -1px 0 rgba(190,150,90,0.10)',
});

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href + '/');

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-500"
      style={glassStyle(scrolled)}
    >
      {/* ── Shine layer 1: top-edge gloss line */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent 4%, rgba(255,255,255,0.98) 22%, rgba(255,255,255,0.98) 78%, transparent 96%)',
        }}
      />
      {/* ── Shine layer 2: diagonal surface reflection */}
      <div
        aria-hidden="true"
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{
          background: 'linear-gradient(110deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.12) 35%, rgba(255,255,255,0.02) 68%, transparent 100%)',
        }}
      />

      {/* ── Main bar ── */}
      <div className="container-site relative z-10 flex items-center justify-between h-16 lg:h-20">

        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image
            src="/assets/parkland/logo/parkland-logo.webp"
            alt="Parkland By The River"
            width={160}
            height={48}
            className="h-9 lg:h-11 w-auto"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[0.8125rem] font-semibold tracking-wide
                px-3.5 py-1.5 rounded-xl border
                transition-all duration-200 ${
                isActive(link.href)
                  /* Active — champagne gold fill */
                  ? 'bg-[rgba(200,169,126,0.88)] border-[rgba(162,128,62,0.80)] text-[#2a1f10] shadow-[inset_0_1px_0_rgba(255,255,255,0.60),inset_0_-1px_0_rgba(120,88,22,0.20),0_3px_10px_rgba(140,95,25,0.30)]'
                  /* Default — frosted cream frame */
                  : 'bg-[rgba(248,244,236,0.55)] border-[rgba(190,150,90,0.30)] text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.84),inset_0_-1px_0_rgba(160,130,68,0.12),0_2px_6px_rgba(0,0,0,0.08)] hover:bg-[rgba(255,255,255,0.76)] hover:border-[rgba(190,150,90,0.55)] hover:text-gold hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.92),0_6px_16px_rgba(0,0,0,0.12)]'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <Link
          href="/contact"
          className="hidden lg:inline-flex btn-base btn-primary
            shadow-[0_2px_14px_rgba(200,169,126,0.40)]
            hover:shadow-[0_4px_20px_rgba(200,169,126,0.60)]"
        >
          Let&apos;s Talk
        </Link>

        {/* Mobile hamburger */}
        <button
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="lg:hidden p-2 -mr-2 text-ink hover:text-gold transition-colors duration-200"
        >
          {menuOpen ? (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none"
              stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <line x1="4"  y1="4"  x2="18" y2="18" />
              <line x1="18" y1="4"  x2="4"  y2="18" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none"
              stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <line x1="3"  y1="6"  x2="19" y2="6"  />
              <line x1="3"  y1="11" x2="19" y2="11" />
              <line x1="3"  y1="16" x2="19" y2="16" />
            </svg>
          )}
        </button>
      </div>

      {/* ── Mobile slide-down menu ── */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-112' : 'max-h-0'
        }`}
        style={{
          background:           'linear-gradient(180deg, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.94) 60%, rgba(245,240,230,0.92) 100%)',
          backdropFilter:       'blur(28px) saturate(140%)',
          WebkitBackdropFilter: 'blur(28px) saturate(140%)',
          borderTop:            '1px solid rgba(190,150,90,0.24)',
          boxShadow:            '0 16px 40px rgba(0,0,0,0.10)',
        }}
      >
        <nav className="container-site flex flex-col py-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`text-[0.9375rem] font-semibold py-3.5 border-b border-black/[0.07]
                transition-colors duration-200 last:border-0 ${
                isActive(link.href)
                  ? 'text-gold'
                  : 'text-ink hover:text-gold'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="mt-5 btn-base btn-primary text-center
              shadow-[0_2px_14px_rgba(200,169,126,0.40)]"
          >
            Let&apos;s Talk
          </Link>
        </nav>
      </div>
    </header>
  );
}
