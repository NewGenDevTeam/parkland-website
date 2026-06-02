import type { Metadata } from 'next';
import Link        from 'next/link';
import { notFound } from 'next/navigation';
import Header  from '@/components/layout/Header';
import Reveal  from '@/components/motion/Reveal';
import { BLOG_POSTS, BLOG_CATEGORY_STYLE } from '@/lib/blogPosts';
import { OG_IMAGE } from '@/lib/seoConfig';

/* ── SSG — pre-render all 8 slugs at build time ─────────────────────────── */
export function generateStaticParams() {
  return BLOG_POSTS.map(post => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find(p => p.slug === slug);
  if (!post) return {};
  return {
    title:       `${post.title} | Parkland By The River`,
    description: post.excerpt,
    keywords:    [post.keyword, 'Parkland By The River', 'Johor Bahru property'],
    alternates:  { canonical: `/blog/${post.slug}` },
    openGraph: {
      title:       `${post.title} | Parkland By The River`,
      description: post.excerpt,
      url:         `/blog/${post.slug}`,
      images:      OG_IMAGE,
    },
  };
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
}

/* ── Back arrow ─────────────────────────────────────────────────────────── */
function IcBack() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5" aria-hidden="true">
      <path d="M13 8H3M7 4L3 8l4 4" />
    </svg>
  );
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = BLOG_POSTS.find(p => p.slug === slug);
  if (!post) notFound();

  return (
    <>
      <Header />
      <main>

        {/* ══ Article hero ════════════════════════════════════════════════════ */}
        <section className="section-dark pt-28 pb-16 lg:pt-36 lg:pb-20">
          <div className="container-site">
            <div className="max-w-2xl">

              {/* Back link */}
              <Reveal from="left" delay={0}>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-white/50 hover:text-white
                    text-[1rem] font-medium transition-colors duration-200 mb-7"
                >
                  <IcBack />
                  Back to Blog
                </Link>
              </Reveal>

              {/* Category */}
              <Reveal from="left" delay={60}>
                <span
                  className={`inline-block border font-bold
                    tracking-[0.12em] uppercase rounded-full px-3 py-1 mb-5
                    ${BLOG_CATEGORY_STYLE[post.category]}`}
                  style={{ fontSize: 'clamp(1rem, 1.05vw, 1.15rem)' }}
                >
                  {post.category}
                </span>
              </Reveal>

              {/* Title */}
              <Reveal from="left" delay={160} blur>
                <h1
                  className="type-heading text-white mb-5"
                  style={{ fontSize: 'clamp(2.4rem, 3vw, 3.4rem)', lineHeight: '1.15', maxWidth: '36ch' }}
                >
                  {post.title}
                </h1>
              </Reveal>

              {/* Meta */}
              <Reveal from="bottom" delay={280}>
                <p className="text-white/45 font-medium"
                  style={{ fontSize: 'clamp(1rem, 1.05vw, 1.15rem)', lineHeight: '1.45' }}>
                  {post.readTime} min read · {formatDate(post.date)}
                </p>
              </Reveal>

            </div>
          </div>
        </section>

        {/* ══ Article body — placeholder ══════════════════════════════════════ */}
        <section className="section-white py-16 lg:py-20">
          <div className="container-site">
            <div className="max-w-2xl mx-auto">

              {/* Lead excerpt */}
              <Reveal from="bottom" delay={0}>
                <p className="leading-relaxed text-body mb-8"
                  style={{ fontSize: 'clamp(1.15rem, 1.25vw, 1.35rem)', lineHeight: '1.65' }}>
                  {post.excerpt}
                </p>
              </Reveal>

              {/* Coming soon notice */}
              <Reveal from="bottom" delay={80}>
                <div className="border border-border rounded-2xl p-7 sm:p-9 bg-[#FAFAF8] text-center">
                  <p className="font-display font-bold text-ink mb-1.5"
                    style={{ fontSize: 'clamp(1.2rem, 1.3vw, 1.4rem)', letterSpacing: '-0.02em' }}>
                    Full article coming soon
                  </p>
                  <p className="text-subtle leading-relaxed max-w-sm mx-auto"
                    style={{ fontSize: 'clamp(1.05rem, 1.1vw, 1.2rem)', lineHeight: '1.65' }}>
                    We are expanding our editorial content. Register your interest
                    to be notified when this article is published.
                  </p>
                </div>
              </Reveal>

              {/* Footer actions */}
              <Reveal from="bottom" delay={160}>
                <div className="mt-10 pt-8 border-t border-border flex flex-col sm:flex-row gap-3">
                  <Link href="/blog" className="btn-base btn-ghost-dark">
                    ← Back to Blog
                  </Link>
                  <Link href="/contact" className="btn-base btn-primary">
                    Let&apos;s Talk
                  </Link>
                </div>
              </Reveal>

            </div>
          </div>
        </section>

      </main>
    </>
  );
}
