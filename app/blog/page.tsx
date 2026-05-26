import type { Metadata } from 'next';
import Link   from 'next/link';
import Header  from '@/components/layout/Header';
import BlogGrid from '@/components/sections/BlogGrid';
import Reveal   from '@/components/motion/Reveal';
import { BLOG_CATEGORY_STYLE } from '@/lib/blogPosts';

export const metadata: Metadata = {
  title:       'Blog | Parkland By The River',
  description: 'Read lifestyle, location, and property guides about Parkland By The River, Permas Jaya, Johor Bahru connectivity, floor plans, and riverside living.',
  keywords:    [
    'Parkland By The River blog',
    'Permas Jaya lifestyle guide',
    'Johor Bahru property buyer guide',
    'riverside living Johor Bahru',
    'JB floor plan guide',
    'CIQ RTS connectivity',
  ],
};

const CATEGORIES = [
  'Location Guide',
  'Lifestyle Benefits',
  'Buyer Guide',
  'Floor Plan Guide',
  'Connectivity',
] as const;

export default function BlogPage() {
  return (
    <>
      <Header />
      <main>

        {/* ══ 1. Page hero ════════════════════════════════════════════════════ */}
        <section className="section-dark pt-28 pb-20 lg:pt-36 lg:pb-24">
          <div className="container-site">
            <div className="max-w-2xl">
              <Reveal from="left" delay={0}>
                <p className="section-label mb-4"
                  style={{ fontSize: 'clamp(1rem, 1vw, 1.15rem)' }}>Blog & Insights</p>
              </Reveal>
              <Reveal from="left" delay={80}>
                <span className="gold-rule mb-7" />
              </Reveal>
              <Reveal from="left" delay={160} blur>
                <h1 className="type-heading text-white mb-6"
                  style={{ fontSize: 'clamp(2.4rem, 3vw, 3.4rem)', lineHeight: '1.15' }}>
                  Lifestyle &amp; Location Insights
                </h1>
              </Reveal>
              <Reveal from="bottom" delay={300}>
                <p className="type-lead-light mb-8 max-w-lg">
                  Explore practical guides on riverside living, Permas Jaya
                  connectivity, floor plan selection, and Johor Bahru property
                  lifestyle.
                </p>
              </Reveal>
              {/* Category pills — visual overview only */}
              <Reveal from="bottom" delay={420}>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map(cat => (
                    <span
                      key={cat}
                      className={`border font-bold tracking-[0.12em]
                        uppercase rounded-full px-3 py-1
                        ${BLOG_CATEGORY_STYLE[cat]}`}
                      style={{ fontSize: 'clamp(1rem, 1.05vw, 1.15rem)' }}
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ══ 2. Article grid ═════════════════════════════════════════════════ */}
        <section className="section-white py-16 lg:py-20">
          <div className="container-site">

            <div className="text-center mb-12">
              <Reveal from="bottom" delay={0}>
                <p className="section-label-on-light mb-4"
                  style={{ fontSize: 'clamp(1rem, 1vw, 1.15rem)' }}>All Articles</p>
              </Reveal>
              <Reveal from="bottom" delay={80}>
                <span className="gold-rule mx-auto mb-7" />
              </Reveal>
              <Reveal from="bottom" delay={160} blur>
                <h2 className="type-heading text-ink mb-5"
                  style={{ fontSize: 'clamp(2.4rem, 3vw, 3.4rem)', lineHeight: '1.15' }}>
                  Property &amp; Lifestyle Guides
                </h2>
              </Reveal>
              <Reveal from="bottom" delay={260}>
                <p className="type-lead max-w-lg mx-auto">
                  Practical articles to help you make informed decisions about
                  location, lifestyle, and property in Johor Bahru.
                </p>
              </Reveal>
            </div>

            <BlogGrid />

          </div>
        </section>

        {/* ══ 3. CTA ══════════════════════════════════════════════════════════ */}
        <section className="section-dark section-pad">
          <div className="container-site text-center">
            <Reveal from="bottom" delay={0}>
              <p className="section-label mb-4"
                style={{ fontSize: 'clamp(1rem, 1vw, 1.15rem)' }}>Explore Further</p>
            </Reveal>
            <Reveal from="bottom" delay={80}>
              <span className="gold-rule mx-auto mb-7" />
            </Reveal>
            <Reveal from="bottom" delay={160} blur>
              <h2 className="type-heading text-white mb-5"
                style={{ fontSize: 'clamp(2.4rem, 3vw, 3.4rem)', lineHeight: '1.15' }}>
                Ready to Explore Parkland By The River?
              </h2>
            </Reveal>
            <Reveal from="bottom" delay={280}>
              <p className="type-lead-light max-w-md mx-auto mb-10">
                Discover our three thoughtfully designed unit types and the
                lifestyle that awaits at Parkland By The River.
              </p>
            </Reveal>
            <Reveal from="bottom" delay={380}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/floor-plans" className="btn-base btn-primary">
                  View Floor Plans
                </Link>
                <Link href="/contact" className="btn-base btn-ghost-white">
                  Let&apos;s Talk
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

      </main>
    </>
  );
}
