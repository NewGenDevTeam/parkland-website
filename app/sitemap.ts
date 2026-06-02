import type { MetadataRoute } from 'next';
import { BLOG_POSTS } from '@/lib/blogPosts';

/* UPDATE: replace with the production domain before going live */
const BASE_URL = 'https://www.parklandbytheriver.com.my';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url:             BASE_URL,
      lastModified:    new Date(),
      changeFrequency: 'weekly',
      priority:        1.0,
    },
    {
      url:             `${BASE_URL}/about`,
      lastModified:    new Date(),
      changeFrequency: 'monthly',
      priority:        0.8,
    },
    {
      url:             `${BASE_URL}/location`,
      lastModified:    new Date(),
      changeFrequency: 'monthly',
      priority:        0.8,
    },
    {
      url:             `${BASE_URL}/facilities`,
      lastModified:    new Date(),
      changeFrequency: 'monthly',
      priority:        0.8,
    },
    {
      url:             `${BASE_URL}/floor-plans`,
      lastModified:    new Date(),
      changeFrequency: 'monthly',
      priority:        0.8,
    },
    {
      url:             `${BASE_URL}/blog`,
      lastModified:    new Date(),
      changeFrequency: 'weekly',
      priority:        0.7,
    },
    {
      url:             `${BASE_URL}/contact`,
      lastModified:    new Date(),
      changeFrequency: 'monthly',
      priority:        0.7,
    },
  ];

  const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map(post => ({
    url:             `${BASE_URL}/blog/${post.slug}`,
    lastModified:    new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority:        0.6,
  }));

  return [...staticRoutes, ...blogRoutes];
}
