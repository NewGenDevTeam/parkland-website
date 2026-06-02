/**
 * Blog post data for Parkland By The River.
 * Topics mapped to SEO keyword plan (Content Article 2026).
 *
 * Rules:
 *  - Do NOT claim investment returns or capital appreciation.
 *  - Do NOT mention unverified pricing, completion dates, APDL, or legal details.
 *  - Use safe wording: "may appeal to", "can be attractive for", "buyers often consider".
 *  - All images are confirmed real Parkland assets.
 */

export type BlogCategory =
  | 'Location Guide'
  | 'Lifestyle Benefits'
  | 'Buyer Guide'
  | 'Floor Plan Guide'
  | 'Connectivity'
  | 'Investment Guide';

export interface BlogPost {
  id:       number;
  slug:     string;
  title:    string;
  excerpt:  string;
  category: BlogCategory;
  keyword:  string; /* primary target keyword */
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
  'Investment Guide':  'text-rose-700    bg-rose-50    border-rose-200',
};

export const BLOG_POSTS: BlogPost[] = [
  {
    id:       1,
    slug:     'property-investment-johor-bahru',
    title:    'Property Investment in Johor Bahru: What Buyers Should Know',
    excerpt:
      'Johor Bahru has attracted growing interest from both local and cross-border property buyers. Factors such as freehold land availability, proximity to Singapore, ongoing infrastructure development, and the upcoming RTS Link are among the elements buyers often consider when evaluating the market.',
    category: 'Investment Guide',
    keyword:  'property investment Johor Bahru',
    readTime: 5,
    date:     '2026-01-10',
    image:    '/assets/parkland/images/main-photo-frame.webp',
  },
  {
    id:       2,
    slug:     'johor-property-near-singapore',
    title:    'Why Johor Property Near Singapore Is Gaining Attention',
    excerpt:
      'Properties situated along the Johor–Singapore corridor have drawn increased interest from buyers on both sides of the Causeway. The combination of Malaysia\'s property values, improving cross-border infrastructure, and proximity to Singapore\'s economic activities may appeal to those seeking a balance between affordability and connectivity.',
    category: 'Location Guide',
    keyword:  'Johor property near Singapore',
    readTime: 4,
    date:     '2026-01-22',
    image:    '/assets/parkland/images/hero-building.webp',
  },
  {
    id:       3,
    slug:     'condo-near-rts-johor',
    title:    'Condo Near RTS Johor: Benefits of Living Close to Future Connectivity',
    excerpt:
      'The Johor Bahru–Singapore Rapid Transit System (RTS) Link, planned to connect Bukit Chagar with Woodlands, is set to significantly improve cross-border commuting. Residential developments within reach of the RTS station can be attractive for buyers who work or travel regularly across the border.',
    category: 'Connectivity',
    keyword:  'condo near RTS Johor',
    readTime: 4,
    date:     '2026-02-05',
    image:    '/assets/parkland/gallery/gallery-17.webp',
  },
  {
    id:       4,
    slug:     'freehold-apartment-johor-bahru',
    title:    'Freehold Apartment in Johor Bahru: Why It Matters for Homebuyers',
    excerpt:
      'Freehold ownership grants permanent title rights, unlike leasehold properties which revert to state ownership after the lease period. In the Malaysian property market, freehold status is often a key factor in long-term ownership planning, resale considerations, and intergenerational property transfer.',
    category: 'Buyer Guide',
    keyword:  'freehold apartment Johor Bahru',
    readTime: 5,
    date:     '2026-02-19',
    image:    '/assets/parkland/images/main-photo-frame.webp',
  },
  {
    id:       5,
    slug:     'high-rental-yield-johor-property',
    title:    'High Rental Yield Property in Johor: Key Factors to Consider',
    excerpt:
      'Rental yield is a metric used to assess a property\'s income potential relative to its purchase price. In Johor Bahru, factors such as proximity to Singapore, access to transport infrastructure, available facilities, and unit size are among the elements that can influence rental demand, depending on prevailing market conditions.',
    category: 'Investment Guide',
    keyword:  'high rental yield Johor property',
    readTime: 5,
    date:     '2026-03-04',
    image:    '/assets/parkland/gallery/gallery-20.webp',
  },
  {
    id:       6,
    slug:     'riverside-living-johor-bahru',
    title:    'Riverside Living in Johor Bahru: Lifestyle Benefits for Modern Families',
    excerpt:
      'A riverside address offers more than visual appeal — natural surroundings, open skylines, and reduced urban density can contribute to a quieter daily environment. For families seeking a balance between city convenience and residential calm, riverside developments in Johor Bahru may offer a compelling alternative to dense urban-centre properties.',
    category: 'Lifestyle Benefits',
    keyword:  'riverside living',
    readTime: 4,
    date:     '2026-03-18',
    image:    '/assets/parkland/gallery/gallery-15.webp',
  },
  {
    id:       7,
    slug:     'apartment-with-facilities-johor',
    title:    'Apartment with Facilities in Johor: What Modern Buyers Look For',
    excerpt:
      'Modern residential buyers increasingly evaluate a development by the quality and variety of its communal facilities. Swimming pools, gymnasium spaces, garden areas, and recreational zones reduce the need to travel for leisure and wellness — making facility-rich developments particularly practical for families and working professionals.',
    category: 'Lifestyle Benefits',
    keyword:  'apartment with facilities Johor',
    readTime: 3,
    date:     '2026-04-02',
    image:    '/assets/parkland/gallery/gallery-18.webp',
  },
  {
    id:       8,
    slug:     'spacious-apartment-johor-family',
    title:    'Spacious Apartment in Johor for Family Living',
    excerpt:
      'Choosing the right apartment size for a family involves balancing bedroom count, living area, storage capacity, and layout efficiency. In Johor Bahru, spacious apartment configurations with two or three bedrooms are often considered by families prioritising room to grow and day-to-day functional comfort.',
    category: 'Floor Plan Guide',
    keyword:  'spacious apartment Johor',
    readTime: 4,
    date:     '2026-04-16',
    image:    '/assets/parkland/floor-plans/floor-plan-type-b.webp',
  },
];
