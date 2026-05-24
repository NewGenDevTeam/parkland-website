/**
 * Blog post data for Parkland By The River.
 *
 * Content direction: docs/parkland-new-sitemap-suggestion.md,
 *                   docs/parkland-old-website-content.md
 *
 * Rules:
 *  - Do NOT claim investment returns or capital appreciation.
 *  - Do NOT mention unverified pricing, completion dates, APDL, or legal details.
 *  - All images are confirmed real Parkland assets.
 */

export type BlogCategory =
  | 'Location Guide'
  | 'Lifestyle Benefits'
  | 'Buyer Guide'
  | 'Floor Plan Guide'
  | 'Connectivity';

export interface BlogPost {
  id:       number;
  slug:     string;
  title:    string;
  excerpt:  string;
  category: BlogCategory;
  readTime: number; /* minutes */
  date:     string; /* ISO date */
  image:    string; /* confirmed real asset */
}

export const BLOG_CATEGORY_STYLE: Record<BlogCategory, string> = {
  'Location Guide':    'text-amber-700   bg-amber-50   border-amber-200',
  'Lifestyle Benefits':'text-emerald-700 bg-emerald-50 border-emerald-200',
  'Buyer Guide':       'text-sky-700     bg-sky-50     border-sky-200',
  'Floor Plan Guide':  'text-violet-700  bg-violet-50  border-violet-200',
  'Connectivity':      'text-orange-700  bg-orange-50  border-orange-200',
};

export const BLOG_POSTS: BlogPost[] = [
  {
    id:       1,
    slug:     'permas-jaya-location-guide',
    title:    'Why Permas Jaya Is a Strategic Location for Johor Bahru Homebuyers',
    excerpt:
      'Permas Jaya is a well-established township in eastern Johor Bahru, offering convenient access to the Second Link, Pasir Gudang Highway, and Senai International Airport. Its proximity to commercial zones and employment corridors makes it a practical base for working professionals and families.',
    category: 'Location Guide',
    readTime: 4,
    date:     '2025-04-08',
    image:    '/assets/parkland/images/hero-building.webp',
  },
  {
    id:       2,
    slug:     'living-near-ciq-rts',
    title:    'Living Near CIQ and RTS: Why Connectivity Matters',
    excerpt:
      'The Johor Bahru–Woodlands Causeway and Second Link CIQ are among the busiest border crossings in the region. With the Johor Bahru–Singapore RTS Link in development, cross-border accessibility is set to improve significantly for residents in the southern corridor.',
    category: 'Connectivity',
    readTime: 3,
    date:     '2025-05-14',
    image:    '/assets/parkland/gallery/gallery-17.webp',
  },
  {
    id:       3,
    slug:     'riverside-living-johor-bahru',
    title:    'The Benefits of Riverside Living in Johor Bahru',
    excerpt:
      'A riverside address offers natural scenery, cooler ambient conditions, and a calmer pace of living compared to dense city-centre developments. For urban residents, this balance of accessibility and natural calm is increasingly valued.',
    category: 'Lifestyle Benefits',
    readTime: 4,
    date:     '2025-06-02',
    image:    '/assets/parkland/gallery/gallery-15.webp',
  },
  {
    id:       4,
    slug:     'serviced-apartment-vs-condominium',
    title:    'Serviced Apartment vs Condominium: What Buyers Should Know',
    excerpt:
      'Serviced apartments and condominiums differ in management structure, usage flexibility, and facility offerings. Understanding these distinctions helps buyers align their purchase with their intended use — whether for own stay, rental, or long-term ownership.',
    category: 'Buyer Guide',
    readTime: 5,
    date:     '2025-07-18',
    image:    '/assets/parkland/unit-renders/type-b/type-b-living-room.webp',
  },
  {
    id:       5,
    slug:     'choose-right-floor-plan',
    title:    'How to Choose the Right Floor Plan for Your Lifestyle',
    excerpt:
      'The right floor plan depends on household size, daily routine, and space priorities. Comparing bedroom count, layout efficiency, and storage capacity before deciding can prevent costly regrets after moving in.',
    category: 'Floor Plan Guide',
    readTime: 4,
    date:     '2025-08-05',
    image:    '/assets/parkland/floor-plans/floor-plan-type-b.webp',
  },
  {
    id:       6,
    slug:     'facilities-modern-living',
    title:    'Why Facilities Matter in Modern High-Rise Living',
    excerpt:
      'Well-designed communal facilities directly influence daily quality of life in a high-rise development. From fitness spaces to garden retreats, a diverse podium floor reduces the need to travel for leisure and wellness activities.',
    category: 'Lifestyle Benefits',
    readTime: 3,
    date:     '2025-09-22',
    image:    '/assets/parkland/gallery/gallery-18.webp',
  },
  {
    id:       7,
    slug:     'freehold-property-johor-bahru',
    title:    'Freehold Property in Johor Bahru: What Buyers Should Understand',
    excerpt:
      'Freehold properties carry perpetual ownership rights, unlike leasehold properties which revert to state ownership after their lease expires. In the Malaysian context, freehold status is often a key consideration in long-term ownership planning.',
    category: 'Buyer Guide',
    readTime: 5,
    date:     '2025-10-11',
    image:    '/assets/parkland/images/main-photo-frame.webp',
  },
  {
    id:       8,
    slug:     'parkland-modern-urban-living',
    title:    'What Makes Parkland By The River Suitable for Modern Urban Living',
    excerpt:
      'Parkland By The River combines a riverside setting, three distinct floor plan options, and 19 podium-level facilities within a freehold serviced apartment development in Permas Jaya. Its design reflects the practical needs of singles, couples, and families seeking a balanced urban lifestyle.',
    category: 'Lifestyle Benefits',
    readTime: 3,
    date:     '2025-11-30',
    image:    '/assets/parkland/gallery/gallery-20.webp',
  },
];
