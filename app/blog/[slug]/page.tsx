import type { Metadata } from 'next';
import Image       from 'next/image';
import Link        from 'next/link';
import { notFound } from 'next/navigation';
import Header  from '@/components/layout/Header';
import Reveal  from '@/components/motion/Reveal';
import { BLOG_POSTS, BLOG_CATEGORY_STYLE } from '@/lib/blogPosts';
import type { BlogCategory } from '@/lib/blogPosts';
import { OG_IMAGE } from '@/lib/seoConfig';
import { getBlogPosts, getBlogPostBySlug } from '@/lib/wordpress';
import type { DisplayPost } from '@/lib/wordpress';

export const revalidate = 300;

/* ── SSG: pre-render static slugs + any CMS slugs available at build time ── */
export async function generateStaticParams() {
  const slugs = new Set<string>(BLOG_POSTS.map(p => p.slug));
  const cmsPosts = await getBlogPosts();
  if (cmsPosts) cmsPosts.forEach(p => slugs.add(p.slug));
  return Array.from(slugs).map(slug => ({ slug }));
}

/* ── Resolve post ────────────────────────────────────────────────────────────
   getBlogPostBySlug returns:
     DisplayPost  — found in CMS
     undefined    — API up, slug not found → 404 (no static fallback)
     null         — API error             → try static fallback
── */
async function resolvePost(slug: string): Promise<DisplayPost | null> {
  const cmsResult = await getBlogPostBySlug(slug);

  if (cmsResult === undefined) return null; // CMS is up, slug just doesn't exist → 404

  if (cmsResult !== null) return cmsResult; // found in CMS

  // cmsResult === null: API failed → try static fallback
  const staticPost = BLOG_POSTS.find(p => p.slug === slug);
  if (!staticPost) return null;
  return {
    id:       staticPost.id,
    slug:     staticPost.slug,
    title:    staticPost.title,
    excerpt:  staticPost.excerpt,
    category: staticPost.category,
    readTime: staticPost.readTime,
    date:     staticPost.date,
    image:    staticPost.image,
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await resolvePost(slug);
  if (!post) return {};
  return {
    title:       `${post.title} | Parkland By The River`,
    description: post.excerpt,
    keywords:    [post.category, 'Parkland By The River', 'Johor Bahru property'],
    alternates:  { canonical: `/blog/${post.slug}` },
    openGraph: {
      title:       `${post.title} | Parkland By The River`,
      description: post.excerpt,
      url:         `/blog/${post.slug}`,
      images:      post.image ? [{ url: post.image }] : OG_IMAGE,
    },
  };
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
}

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
  const post = await resolvePost(slug);
  if (!post) notFound();

  const categoryStyle =
    BLOG_CATEGORY_STYLE[post.category as BlogCategory] ?? 'text-slate-700 bg-slate-50 border-slate-200';

  return (
    <>
      <Header />
      <main>

        {/* ══ Article hero ════════════════════════════════════════════════════ */}
        <section className="section-dark pt-28 pb-16 lg:pt-36 lg:pb-20">
          <div className="container-site">
            <div className="max-w-2xl">

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

              <Reveal from="left" delay={60}>
                <span
                  className={`inline-block border font-bold
                    tracking-[0.12em] uppercase rounded-full px-3 py-1 mb-5
                    ${categoryStyle}`}
                  style={{ fontSize: 'clamp(1rem, 1.05vw, 1.15rem)' }}
                >
                  {post.category}
                </span>
              </Reveal>

              <Reveal from="left" delay={160} blur>
                <h1
                  className="type-heading text-white mb-5"
                  style={{ fontSize: 'clamp(2.4rem, 3vw, 3.4rem)', lineHeight: '1.15', maxWidth: '36ch' }}
                >
                  {post.title}
                </h1>
              </Reveal>

              <Reveal from="bottom" delay={280}>
                <p className="text-white/45 font-medium"
                  style={{ fontSize: 'clamp(1rem, 1.05vw, 1.15rem)', lineHeight: '1.45' }}>
                  {post.readTime} min read · {formatDate(post.date)}
                </p>
              </Reveal>

            </div>
          </div>
        </section>

        {/* ══ Article body ════════════════════════════════════════════════════ */}
        <section className="section-white py-16 lg:py-20">
          <div className="container-site">

            {/* Featured image — shown only when WordPress has one */}
            {post.image && (
              <Reveal from="bottom" delay={0}>
                <div className="max-w-3xl mx-auto mb-12 rounded-2xl overflow-hidden
                  shadow-[0_4px_24px_rgba(0,0,0,0.10)]">
                  <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1280px) 768px, (min-width: 1024px) 75vw, 100vw"
                      priority
                    />
                  </div>
                </div>
              </Reveal>
            )}

            <div className="max-w-2xl mx-auto">

              {post.content ? (
                /* CMS post with content — render WordPress HTML */
                <Reveal from="bottom" delay={0}>
                  <div
                    className="text-body blog-content
                      [&_p]:mb-5 [&_p]:leading-relaxed
                      [&_h2]:font-display [&_h2]:font-bold [&_h2]:text-ink [&_h2]:mt-8 [&_h2]:mb-3
                      [&_h3]:font-semibold [&_h3]:text-ink [&_h3]:mt-6 [&_h3]:mb-2
                      [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-5
                      [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-5
                      [&_li]:mb-1
                      [&_a]:text-gold [&_a]:underline [&_a]:underline-offset-2
                      [&_strong]:font-semibold [&_strong]:text-ink"
                    style={{ fontSize: 'clamp(1.15rem, 1.25vw, 1.35rem)', lineHeight: '1.65' }}
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                </Reveal>
              ) : (
                /* Static fallback or CMS post with no body yet */
                <>
                  <Reveal from="bottom" delay={0}>
                    <p className="leading-relaxed text-body mb-8"
                      style={{ fontSize: 'clamp(1.15rem, 1.25vw, 1.35rem)', lineHeight: '1.65' }}>
                      {post.excerpt}
                    </p>
                  </Reveal>
                  <Reveal from="bottom" delay={80}>
                    <p className="text-subtle"
                      style={{ fontSize: 'clamp(1.05rem, 1.1vw, 1.2rem)', lineHeight: '1.65' }}>
                      Article content coming soon.
                    </p>
                  </Reveal>
                </>
              )}

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
