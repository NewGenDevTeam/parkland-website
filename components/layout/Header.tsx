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

export default function Header() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const pathname = usePathname();

  /* Scroll detection — also runs on mount to handle mid-page refresh */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Lock body scroll while overlay is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href + '/');

  /* Hero is only dark on the home page — use transparent + white text there */
  const isHome = pathname === '/';
  /* True when the bar should show dark text / solid glass */
  const solidBar = scrolled || !isHome;

  return (
    <>
      {/* ── Fixed header bar ─────────────────────────────────────────────── */}
      <header
        className="fixed inset-x-0 top-0 z-50 transition-all duration-500"
        style={{
          background: solidBar
            ? 'rgba(255,255,255,0.96)'
            : 'linear-gradient(180deg, rgba(0,0,0,0.32) 0%, transparent 100%)',
          backdropFilter:       solidBar ? 'blur(22px) saturate(140%)' : 'none',
          WebkitBackdropFilter: solidBar ? 'blur(22px) saturate(140%)' : 'none',
          borderBottom: solidBar ? '1px solid rgba(190,150,90,0.18)' : 'none',
          boxShadow:    scrolled ? '0 4px 28px rgba(0,0,0,0.08)'      : 'none',
        }}
      >
        {/*
         * Full-width relative container — no max-width, no mx-auto.
         * On desktop, all three zones are absolutely positioned so they
         * can never crowd each other regardless of viewport width.
         * On mobile (< lg) the container stays flex/justify-between so
         * logo and Menu button sit at opposite ends as before.
         */}
        <div className="relative w-full h-16 lg:h-20 flex items-center justify-between">

          {/* ── Logo — pinned to left edge on desktop ─────────────────────── */}
          <div
            className="flex items-center lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:z-[3]"
            style={{ left: 'clamp(1.5rem, 3vw, 4rem)' }}
          >
            <Link href="/" className="shrink-0">
              <Image
                src="/assets/parkland/logo/parkland-logo.webp"
                alt="Parkland By The River"
                width={160}
                height={48}
                className={`h-9 lg:h-11 w-auto transition-all duration-500 ${
                  !solidBar ? 'brightness-0 invert' : ''
                }`}
                priority
              />
            </Link>
          </div>

          {/* ── Desktop nav — centred in the full header width ────────────── */}
          <nav
            className="hidden lg:flex lg:absolute lg:top-1/2 lg:left-1/2
              lg:-translate-x-1/2 lg:-translate-y-1/2 lg:z-[2]
              items-center gap-6 xl:gap-9"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative font-bold uppercase
                  group transition-colors duration-200 ${
                  isActive(link.href)
                    ? 'text-gold'
                    : solidBar
                      ? 'text-ink/85 hover:text-gold'
                      : 'text-white/85 hover:text-white'
                }`}
                style={{ fontSize: 'clamp(0.9rem, 0.95vw, 1.05rem)', letterSpacing: '0.12em', lineHeight: '1.2' }}
              >
                {link.label}
                {/* Underline reveal on hover / active */}
                <span
                  className={`absolute -bottom-1 left-0 h-[1.5px] bg-gold
                    transition-all duration-300 ease-out ${
                    isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* ── Right cluster — pinned to right edge on desktop ───────────── */}
          <div
            className="flex items-center gap-5 lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:z-[3]"
            style={{ right: 'clamp(1.5rem, 3vw, 4rem)' }}
          >
            <Link
              href="/contact"
              className="hidden lg:inline-flex btn-base btn-primary
                shadow-[0_2px_14px_rgba(200,169,126,0.40)]
                hover:shadow-[0_4px_20px_rgba(200,169,126,0.60)]"
              style={{ fontSize: 'clamp(0.95rem, 1vw, 1.1rem)', fontWeight: 700 }}
            >
              Let&apos;s Talk
            </Link>

            {/* Hamburger icon trigger — mobile only */}
            <button
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
              className={`lg:hidden flex flex-col justify-center items-center gap-1.5
                p-2 -mr-2 transition-colors duration-200 ${
                solidBar ? 'text-ink' : 'text-white'
              }`}
            >
              <span className="block w-5.5 h-0.5 bg-current rounded-sm" />
              <span className="block w-5.5 h-0.5 bg-current rounded-sm" />
              <span className="block w-5.5 h-0.5 bg-current rounded-sm" />
            </button>
          </div>
        </div>
      </header>

      {/* ── Full-screen overlay menu (mobile) ────────────────────────────── */}
      <div
        aria-hidden={!menuOpen}
        className={`fixed inset-0 z-[60] lg:hidden flex flex-col
          transition-all duration-500 ease-in-out ${
          menuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        style={{ background: 'rgba(14,11,8,0.98)' }}
      >
        {/* Overlay top row: logo + Close */}
        <div className="flex items-center justify-between h-16 px-6 shrink-0">
          <Link href="/" onClick={() => setMenuOpen(false)} className="shrink-0">
            <Image
              src="/assets/parkland/logo/parkland-logo.webp"
              alt="Parkland By The River"
              width={160}
              height={48}
              className="h-9 w-auto brightness-0 invert"
            />
          </Link>
          <button
            aria-label="Close navigation menu"
            onClick={() => setMenuOpen(false)}
            className="text-[0.8125rem] font-semibold tracking-[0.18em] uppercase
              text-white/60 hover:text-white transition-colors duration-200"
          >
            Close
          </button>
        </div>

        {/* Thin divider */}
        <div className="h-px bg-white/10 mx-6 shrink-0" />

        {/* Nav links */}
        <nav className="flex flex-col flex-1 justify-center px-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`text-2xl sm:text-3xl font-light tracking-wide
                py-4 border-b border-white/[0.08] last:border-0
                transition-all duration-200 ${
                isActive(link.href)
                  ? 'text-gold'
                  : 'text-white/65 hover:text-white hover:pl-2'
              }`}
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="mt-8 btn-base btn-primary text-center"
          >
            Let&apos;s Talk
          </Link>
        </nav>
      </div>
    </>
  );
}
