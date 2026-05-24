import Image from 'next/image';
import Link  from 'next/link';
import Reveal  from '@/components/motion/Reveal';
import Stagger from '@/components/motion/Stagger';
import { BLOG_POSTS, BLOG_CATEGORY_STYLE } from '@/lib/blogPosts';
import type { BlogPost } from '@/lib/blogPosts';

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric',
  });
}

function ArrowRight() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round"
      className="w-3.5 h-3.5 motion-safe:transition-transform motion-safe:duration-200
        motion-safe:group-hover:translate-x-0.5 shrink-0"
      aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col bg-white rounded-2xl border border-border overflow-hidden
        shadow-[0_2px_12px_rgba(0,0,0,0.06)]
        hover:shadow-[0_10px_36px_rgba(0,0,0,0.11)]
        hover:-translate-y-1
        transition-[box-shadow,transform] duration-300"
    >
      {/* Card image */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16/10' }}>
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover
            motion-safe:transition-transform motion-safe:duration-500
            motion-safe:group-hover:scale-105"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
      </div>

      {/* Card body */}
      <div className="flex flex-col gap-3 p-6 grow">
        <span
          className={`self-start border text-[0.625rem] font-bold tracking-[0.12em] uppercase
            rounded-full px-3 py-1 ${BLOG_CATEGORY_STYLE[post.category]}`}
        >
          {post.category}
        </span>

        <h3
          className="font-display font-bold text-ink leading-snug
            group-hover:text-gold-deep transition-colors duration-200"
          style={{ fontSize: 'clamp(0.9375rem, 1.3vw, 1.0625rem)', letterSpacing: '-0.02em' }}
        >
          {post.title}
        </h3>

        <p className="text-[0.875rem] leading-relaxed text-body grow line-clamp-3">
          {post.excerpt}
        </p>
      </div>

      {/* Card footer */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-border">
        <span className="text-[0.75rem] text-muted font-medium">
          {post.readTime} min read · {formatDate(post.date)}
        </span>
        <span className="text-[0.8125rem] font-semibold text-gold
          group-hover:text-gold-deep transition-colors duration-200
          flex items-center gap-1.5">
          Read More
          <ArrowRight />
        </span>
      </div>
    </Link>
  );
}

export default function BlogGrid() {
  return (
    <Stagger
      stagger={60}
      initialDelay={60}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
    >
      {BLOG_POSTS.map(post => (
        <Reveal key={post.id} from="bottom" scale>
          <BlogCard post={post} />
        </Reveal>
      ))}
    </Stagger>
  );
}
