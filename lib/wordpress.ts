/**
 * WordPress Headless CMS API helper.
 * Base: NEXT_PUBLIC_WORDPRESS_API_URL (see .env.local)
 *
 * All fetch functions return null on any failure — callers fall back to
 * existing static data when null is returned.
 */

import { FLOOR_PLANS } from '@/lib/floorPlans';
import type { FloorPlan, FloorPlanType, GalleryImage } from '@/lib/floorPlans';
import type { FacilityHotspot, FacilityCategory }      from '@/lib/facilities';
import { FACILITIES } from '@/lib/facilities';

const BASE =
  process.env.NEXT_PUBLIC_WORDPRESS_API_URL ||
  'https://docker-image-production-a568.up.railway.app/wp-json/wp/v2';

/* ── Reusable safe fetch ─────────────────────────────────────────────────── */

async function safeFetch<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, { next: { revalidate: 300 } });
    if (!res.ok) return null;
    const data = await res.json();
    return data as T;
  } catch {
    return null;
  }
}

/* ── ACF image field — may be a URL string or an object with url property ── */

type ACFImage = string | { url: string } | null | undefined | false;

function resolveImage(field: ACFImage): string {
  if (!field) return '';
  if (typeof field === 'string') return field;
  return (field as { url: string }).url || '';
}

/* ── Strip HTML tags and decode common entities ──────────────────────────── */

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&hellip;/gi, '...')
    .replace(/&#8230;/g, '...')
    .replace(/&rsquo;/gi, '’')
    .replace(/&lsquo;/gi, '‘')
    .replace(/&ldquo;/gi, '“')
    .replace(/&rdquo;/gi, '”')
    .replace(/&ndash;/gi, '–')
    .replace(/&mdash;/gi, '—')
    .replace(/&nbsp;/gi, ' ')
    .trim();
}

/* ═══════════════════════════════════════════════════════════════════════════
   Raw WordPress response types
   ═══════════════════════════════════════════════════════════════════════════ */

interface WPFloorPlanRaw {
  id: number;
  acf: {
    plan_name:     string;
    bedrooms:      number | string;
    bathrooms:     number | string;
    area_size:     string;
    description:   string;
    display_order: number | string;
    main_image:    ACFImage;
    image_2:       ACFImage;
    image_3:       ACFImage;
  };
}

interface WPFacilityRaw {
  id: number;
  acf: {
    facility_name:   string;
    facility_number: number | string;
    description:     string;
    facility_image:  ACFImage;
    map_position_x:  number | string;
    map_position_y:  number | string;
    display_order:   number | string;
  };
}

interface WPSEORaw {
  id: number;
  acf: {
    page_name:        string;
    page_slug:        string;
    seo_title:        string;
    meta_description: string;
    keywords:         string;
    og_image:         ACFImage;
  };
}

export interface WPSiteSettings {
  whatsapp_number: string;
  phone_number:    string;
  email:           string;
  address:         string;
  facebook_url:    string;
  footer_text:     string;
  brochure_pdf:    string;
}

interface WPSiteSettingsRaw {
  id:  number;
  acf: WPSiteSettings;
}

/* ── Unified type used by blog UI components ─────────────────────────────── */

export interface DisplayPost {
  id:       number;
  slug:     string;
  title:    string;
  excerpt:  string;
  category: string;
  readTime: number;
  date:     string;
  image:    string;
  /** HTML string from WordPress content.rendered — absent for static fallback posts */
  content?: string;
}

interface WPPostRaw {
  id:      number;
  slug:    string;
  date:    string;
  title:   { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url: string }>;
    'wp:term'?: Array<Array<{ name: string }>>;
  };
}

/* ═══════════════════════════════════════════════════════════════════════════
   Public fetch functions
   ═══════════════════════════════════════════════════════════════════════════ */

export async function getFloorPlans(): Promise<FloorPlan[] | null> {
  const raw = await safeFetch<WPFloorPlanRaw[]>(
    `${BASE}/floor_plans?acf_format=standard&per_page=100`,
  );
  if (!raw || !Array.isArray(raw) || raw.length === 0) return null;
  return mapFloorPlans(raw);
}

export async function getFacilities(): Promise<FacilityHotspot[] | null> {
  const raw = await safeFetch<WPFacilityRaw[]>(
    `${BASE}/facilities?acf_format=standard&per_page=100`,
  );
  if (!raw || !Array.isArray(raw) || raw.length === 0) return null;
  return mapFacilities(raw);
}

export interface WPSEOPage {
  seo_title:        string;
  meta_description: string;
  keywords:         string;
  og_image_url:     string;
}

export async function getPageSEO(slug: string): Promise<WPSEOPage | null> {
  const raw = await safeFetch<WPSEORaw[]>(
    `${BASE}/seo_pages?acf_format=standard&per_page=100`,
  );
  if (!raw || !Array.isArray(raw) || raw.length === 0) return null;
  const page = raw.find(p => p.acf?.page_slug === slug);
  if (!page?.acf) return null;
  return {
    seo_title:        page.acf.seo_title        || '',
    meta_description: page.acf.meta_description || '',
    keywords:         page.acf.keywords         || '',
    og_image_url:     resolveImage(page.acf.og_image),
  };
}

export async function getSiteSettings(): Promise<WPSiteSettings | null> {
  const raw = await safeFetch<WPSiteSettingsRaw[]>(
    `${BASE}/site_settings?acf_format=standard&per_page=1`,
  );
  if (!raw || !Array.isArray(raw) || raw.length === 0) return null;
  return raw[0]?.acf || null;
}

export async function getBlogPosts(): Promise<DisplayPost[] | null> {
  const raw = await safeFetch<WPPostRaw[]>(
    `${BASE}/posts?_embed&per_page=100`,
  );
  if (raw === null || !Array.isArray(raw)) return null; // API error → callers use static fallback
  return raw.map(mapPost);                              // [] returned as-is when CMS has no posts
}

// Returns:
//   DisplayPost   — found in CMS
//   undefined     — API worked but slug not in CMS → caller should 404
//   null          — API error → caller should use static fallback
export async function getBlogPostBySlug(slug: string): Promise<DisplayPost | undefined | null> {
  const raw = await safeFetch<WPPostRaw[]>(
    `${BASE}/posts?slug=${encodeURIComponent(slug)}&_embed`,
  );
  if (raw === null) return null;                        // network / server error
  if (!Array.isArray(raw) || raw.length === 0) return undefined; // API up, slug not found
  return mapPost(raw[0]);
}

/* ─── WhatsApp href helper ─────────────────────────────────────────────── */

export function buildWhatsAppHref(
  settings: WPSiteSettings | null,
  fallback = 'https://wa.me/60126315811?text=Hi%2C%20I%20am%20interested%20in%20Parkland%20By%20The%20River.',
): string {
  const num = settings?.whatsapp_number;
  if (!num) return fallback;
  if (num.startsWith('http')) return num;
  const digits = num.replace(/[^0-9]/g, '');
  return digits ? `https://wa.me/${digits}` : fallback;
}

/* ═══════════════════════════════════════════════════════════════════════════
   Mapping: raw WP types → existing static lib types
   ═══════════════════════════════════════════════════════════════════════════ */

const ORDER_TO_TYPE: Record<number, FloorPlanType> = { 1: 'A', 2: 'B', 3: 'C' };

function mapFloorPlans(raw: WPFloorPlanRaw[]): FloorPlan[] {
  return raw
    .slice()
    .sort((a, b) => Number(a.acf.display_order) - Number(b.acf.display_order))
    .map((item, i) => {
      const order  = Number(item.acf.display_order) || i + 1;
      const type   = ORDER_TO_TYPE[order] ?? 'A';
      const mainImg = resolveImage(item.acf.main_image);
      const img2    = resolveImage(item.acf.image_2);
      const img3    = resolveImage(item.acf.image_3);
      const planName = item.acf.plan_name || `Type ${type}`;

      const staticPlan = FLOOR_PLANS.find(p => p.type === type);

      const cmsGallery: GalleryImage[] = [];
      if (img2) cmsGallery.push({ src: img2, alt: `${planName} — interior view 2`, needsImageConfirmation: false });
      if (img3) cmsGallery.push({ src: img3, alt: `${planName} — interior view 3`, needsImageConfirmation: false });

      // Fall back to hardcoded gallery when CMS has no image_2 / image_3
      const gallery = cmsGallery.length > 0 ? cmsGallery : (staticPlan?.galleryImages ?? []);

      const sqftMatch = String(item.acf.area_size).match(/[\d,]+/);
      const sqft = sqftMatch ? parseInt(sqftMatch[0].replace(',', ''), 10) : 0;

      return {
        id:           item.id,
        type,
        label:        `Type ${type}`,
        specLabel:    `Type-${type}`,
        name:         planName,
        size:         item.acf.area_size || '',
        sqft,
        bedrooms:     Number(item.acf.bedrooms)  || 0,
        bathrooms:    Number(item.acf.bathrooms) || 0,
        description:  item.acf.description || '',
        features:     staticPlan?.features    ?? [],
        suitableFor:  staticPlan?.suitableFor ?? '',
        floorPlanSrc: mainImg || (staticPlan?.floorPlanSrc ?? ''),
        galleryImages: gallery,
      } satisfies FloorPlan;
    });
}

function mapFacilities(raw: WPFacilityRaw[]): FacilityHotspot[] {
  return raw
    .slice()
    .sort((a, b) => Number(a.acf.display_order) - Number(b.acf.display_order))
    .map(item => {
      const facilityNum = Number(item.acf.facility_number) || Number(item.acf.display_order) || item.id;
      const staticEntry = FACILITIES.find(f => f.id === facilityNum);

      /* Always use static coordinates — CMS positions not trusted yet */
      const x = staticEntry?.x ?? 50;
      const y = staticEntry?.y ?? 50;

      const image = resolveImage(item.acf.facility_image) || (staticEntry?.image ?? '');

      return {
        id:                    facilityNum,
        name:                  item.acf.facility_name || staticEntry?.name || `Facility ${facilityNum}`,
        category:              (staticEntry?.category ?? 'Community') as FacilityCategory,
        x,
        y,
        image,
        needsCoordinateReview: staticEntry?.needsCoordinateReview ?? true,
        needsConfirmation:     false,
        sourceNote:            'CMS',
        uniqueKey:             `wp-${item.id}`,
      } satisfies FacilityHotspot;
    });
}

function mapPost(raw: WPPostRaw): DisplayPost {
  const image    = raw._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
  const excerpt  = stripHtml(raw.excerpt?.rendered || '');
  const title    = stripHtml(raw.title?.rendered   || '');
  const wordCount = excerpt.split(/\s+/).filter(Boolean).length;
  const readTime  = Math.max(1, Math.ceil(wordCount / 200));

  /* Best-effort category mapping from WP taxonomy */
  const terms    = raw._embedded?.['wp:term']?.[0] ?? [];
  const catName  = (terms[0]?.name || '').toLowerCase();
  let category   = 'Lifestyle Benefits';
  if (catName.includes('invest'))   category = 'Investment Guide';
  else if (catName.includes('location')) category = 'Location Guide';
  else if (catName.includes('buyer'))    category = 'Buyer Guide';
  else if (catName.includes('floor'))    category = 'Floor Plan Guide';
  else if (catName.includes('connect'))  category = 'Connectivity';

  const content = raw.content?.rendered || '';
  return { id: raw.id, slug: raw.slug, title, excerpt, category, readTime, date: raw.date, image, content };
}
