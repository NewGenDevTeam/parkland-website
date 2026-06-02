import type { MetadataRoute } from 'next';

/* UPDATE: replace with the production domain before going live */
const BASE_URL = 'https://www.parklandbytheriver.com.my';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow:     '/',
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
