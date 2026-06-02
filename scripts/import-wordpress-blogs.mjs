#!/usr/bin/env node
/**
 * scripts/import-wordpress-blogs.mjs
 *
 * One-time migration: imports all hardcoded Parkland blog posts into WordPress CMS.
 * Credentials are read exclusively from .env.local — never hardcoded here.
 *
 * Usage:  node scripts/import-wordpress-blogs.mjs
 *    or:  npm run import:wp-blogs
 *
 * Safe to re-run: posts that already exist (matched by slug) are skipped.
 */

import fs   from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT      = path.join(__dirname, '..');

/* ═══════════════════════════════════════════════════════════════════════════
   1. Load .env.local
   ═══════════════════════════════════════════════════════════════════════════ */

function loadEnv() {
  const envPath = path.join(ROOT, '.env.local');
  if (!fs.existsSync(envPath)) {
    throw new Error('.env.local not found at project root.');
  }
  const env = {};
  for (const line of fs.readFileSync(envPath, 'utf-8').split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const eq = t.indexOf('=');
    if (eq === -1) continue;
    const key = t.slice(0, eq).trim();
    const val = t.slice(eq + 1); // do NOT trim — WP App Password may have trailing space
    env[key] = val.trim();       // trim is safe here; internal spaces in the value are kept
  }
  return env;
}

/* ═══════════════════════════════════════════════════════════════════════════
   2. Blog post data — mirrored exactly from lib/blogPosts.ts
   ═══════════════════════════════════════════════════════════════════════════ */

const BLOG_POSTS = [
  {
    id:       1,
    slug:     'property-investment-johor-bahru',
    title:    'Property Investment in Johor Bahru: What Buyers Should Know',
    excerpt:  'Johor Bahru has attracted growing interest from both local and cross-border property buyers. Factors such as freehold land availability, proximity to Singapore, ongoing infrastructure development, and the upcoming RTS Link are among the elements buyers often consider when evaluating the market.',
    category: 'Investment Guide',
    readTime: 5,
    date:     '2026-01-10',
    image:    '/assets/parkland/images/main-photo-frame.webp',
  },
  {
    id:       2,
    slug:     'johor-property-near-singapore',
    title:    'Why Johor Property Near Singapore Is Gaining Attention',
    excerpt:  "Properties situated along the Johor–Singapore corridor have drawn increased interest from buyers on both sides of the Causeway. The combination of Malaysia’s property values, improving cross-border infrastructure, and proximity to Singapore’s economic activities may appeal to those seeking a balance between affordability and connectivity.",
    category: 'Location Guide',
    readTime: 4,
    date:     '2026-01-22',
    image:    '/assets/parkland/images/hero-building.webp',
  },
  {
    id:       3,
    slug:     'condo-near-rts-johor',
    title:    'Condo Near RTS Johor: Benefits of Living Close to Future Connectivity',
    excerpt:  'The Johor Bahru–Singapore Rapid Transit System (RTS) Link, planned to connect Bukit Chagar with Woodlands, is set to significantly improve cross-border commuting. Residential developments within reach of the RTS station can be attractive for buyers who work or travel regularly across the border.',
    category: 'Connectivity',
    readTime: 4,
    date:     '2026-02-05',
    image:    '/assets/parkland/gallery/gallery-17.webp',
  },
  {
    id:       4,
    slug:     'freehold-apartment-johor-bahru',
    title:    'Freehold Apartment in Johor Bahru: Why It Matters for Homebuyers',
    excerpt:  'Freehold ownership grants permanent title rights, unlike leasehold properties which revert to state ownership after the lease period. In the Malaysian property market, freehold status is often a key factor in long-term ownership planning, resale considerations, and intergenerational property transfer.',
    category: 'Buyer Guide',
    readTime: 5,
    date:     '2026-02-19',
    image:    '/assets/parkland/images/main-photo-frame.webp', // reuses Post 1 image
  },
  {
    id:       5,
    slug:     'high-rental-yield-johor-property',
    title:    'High Rental Yield Property in Johor: Key Factors to Consider',
    excerpt:  "Rental yield is a metric used to assess a property’s income potential relative to its purchase price. In Johor Bahru, factors such as proximity to Singapore, access to transport infrastructure, available facilities, and unit size are among the elements that can influence rental demand, depending on prevailing market conditions.",
    category: 'Investment Guide',
    readTime: 5,
    date:     '2026-03-04',
    image:    '/assets/parkland/gallery/gallery-20.webp',
  },
  {
    id:       6,
    slug:     'riverside-living-johor-bahru',
    title:    'Riverside Living in Johor Bahru: Lifestyle Benefits for Modern Families',
    excerpt:  'A riverside address offers more than visual appeal — natural surroundings, open skylines, and reduced urban density can contribute to a quieter daily environment. For families seeking a balance between city convenience and residential calm, riverside developments in Johor Bahru may offer a compelling alternative to dense urban-centre properties.',
    category: 'Lifestyle Benefits',
    readTime: 4,
    date:     '2026-03-18',
    image:    '/assets/parkland/gallery/gallery-15.webp',
  },
  {
    id:       7,
    slug:     'apartment-with-facilities-johor',
    title:    'Apartment with Facilities in Johor: What Modern Buyers Look For',
    excerpt:  'Modern residential buyers increasingly evaluate a development by the quality and variety of its communal facilities. Swimming pools, gymnasium spaces, garden areas, and recreational zones reduce the need to travel for leisure and wellness — making facility-rich developments particularly practical for families and working professionals.',
    category: 'Lifestyle Benefits',
    readTime: 3,
    date:     '2026-04-02',
    image:    '/assets/parkland/gallery/gallery-18.webp',
  },
  {
    id:       8,
    slug:     'spacious-apartment-johor-family',
    title:    'Spacious Apartment in Johor for Family Living',
    excerpt:  'Choosing the right apartment size for a family involves balancing bedroom count, living area, storage capacity, and layout efficiency. In Johor Bahru, spacious apartment configurations with two or three bedrooms are often considered by families prioritising room to grow and day-to-day functional comfort.',
    category: 'Floor Plan Guide',
    readTime: 4,
    date:     '2026-04-16',
    image:    '/assets/parkland/floor-plans/floor-plan-type-b.webp',
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   3. WordPress API helpers
   ═══════════════════════════════════════════════════════════════════════════ */

function makeAuthHeader(username, password) {
  return 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64');
}

function mimeFromPath(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === '.webp') return 'image/webp';
  if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg';
  if (ext === '.png')  return 'image/png';
  return 'application/octet-stream';
}

async function wpGet(endpoint, auth, base) {
  const res = await fetch(`${base}/wp-json/wp/v2${endpoint}`, {
    headers: { Authorization: auth },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`GET ${endpoint} → HTTP ${res.status}: ${body.slice(0, 120)}`);
  }
  return res.json();
}

async function wpPost(endpoint, payload, auth, base) {
  const res = await fetch(`${base}/wp-json/wp/v2${endpoint}`, {
    method:  'POST',
    headers: { Authorization: auth, 'Content-Type': 'application/json' },
    body:    JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.message || `POST ${endpoint} → HTTP ${res.status}`);
  }
  return data;
}

/* ── Find or create a WP category ────────────────────────────────────────── */
async function ensureCategory(name, auth, base) {
  const list = await wpGet(
    `/categories?search=${encodeURIComponent(name)}&per_page=20`,
    auth, base,
  );
  const match = list.find(c => c.name.toLowerCase() === name.toLowerCase());
  if (match) return match.id;
  const created = await wpPost('/categories', { name }, auth, base);
  return created.id;
}

/* ── Upload a local image to WP Media Library ────────────────────────────── */
async function uploadMedia(localUrlPath, altText, auth, base) {
  const absPath = path.join(ROOT, 'public', localUrlPath);
  if (!fs.existsSync(absPath)) {
    throw new Error(`Image not found on disk: ${absPath}`);
  }
  const filename = path.basename(absPath);
  const mime     = mimeFromPath(absPath);
  const buffer   = fs.readFileSync(absPath);

  const uploadRes = await fetch(`${base}/wp-json/wp/v2/media`, {
    method:  'POST',
    headers: {
      Authorization:       auth,
      'Content-Type':      mime,
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
    body: buffer,
  });
  const media = await uploadRes.json();
  if (!uploadRes.ok) {
    throw new Error(media?.message || `Media upload failed: HTTP ${uploadRes.status}`);
  }

  // Update alt text on the uploaded media item
  if (altText) {
    await fetch(`${base}/wp-json/wp/v2/media/${media.id}`, {
      method:  'POST',
      headers: { Authorization: auth, 'Content-Type': 'application/json' },
      body:    JSON.stringify({ alt_text: altText }),
    });
  }

  return media.id;
}

/* ── Check whether a post with the given slug already exists ─────────────── */
async function findExistingPost(slug, auth, base) {
  const list = await wpGet(
    `/posts?slug=${encodeURIComponent(slug)}&status=any&per_page=1`,
    auth, base,
  );
  return list.length > 0 ? list[0] : null;
}

/* ── Build WP post body from hardcoded post ──────────────────────────────── */
function buildPostBody(post, categoryId, mediaId) {
  return {
    title:          post.title,
    slug:           post.slug,
    status:         'publish',
    date:           `${post.date}T00:00:00`,
    excerpt:        post.excerpt,
    // Body: use excerpt as lead paragraph; site shows "Full article coming soon" anyway
    content:        `<!-- wp:paragraph -->\n<p>${post.excerpt}</p>\n<!-- /wp:paragraph -->`,
    categories:     [categoryId],
    featured_media: mediaId || 0,
    meta: {
      // Store read time as custom meta if ACF/custom fields are available
      read_time: String(post.readTime),
    },
  };
}

/* ═══════════════════════════════════════════════════════════════════════════
   4. Main
   ═══════════════════════════════════════════════════════════════════════════ */

async function main() {
  console.log('\n' + '═'.repeat(50));
  console.log(' Parkland WordPress Blog Import');
  console.log('═'.repeat(50));

  // Load credentials
  const env = loadEnv();
  const base     = env.WP_BASE_URL;
  const username = env.WP_USERNAME;
  const password = env.WP_APP_PASSWORD;

  if (!base || !username || !password) {
    throw new Error(
      'Missing one or more required keys in .env.local:\n' +
      '  WP_BASE_URL, WP_USERNAME, WP_APP_PASSWORD',
    );
  }
  const auth = makeAuthHeader(username, password);

  // Verify connectivity before doing any work
  console.log(`\nConnecting to: ${base}`);
  try {
    await wpGet('/posts?per_page=1', auth, base);
    console.log('✓ WordPress API reachable\n');
  } catch (err) {
    throw new Error(`Cannot reach WordPress API — ${err.message}`);
  }

  const results = {
    created: [],
    skipped: [],
    failed:  [],
  };

  // Cache media IDs — avoid uploading the same image file twice
  // (Posts 1 and 4 share main-photo-frame.webp)
  const mediaCache = new Map(); // localPath → WP media ID

  for (const post of BLOG_POSTS) {
    const label = `[${post.id}/8] "${post.title.slice(0, 50)}…"`;
    process.stdout.write(`${label}\n       → `);

    try {
      /* ── Step 1: skip if post already exists ── */
      const existing = await findExistingPost(post.slug, auth, base);
      if (existing) {
        console.log(`SKIPPED — already in WP (ID: ${existing.id})`);
        results.skipped.push({ slug: post.slug, wpId: existing.id });
        continue;
      }

      /* ── Step 2: ensure category exists ── */
      process.stdout.write('category… ');
      const categoryId = await ensureCategory(post.category, auth, base);

      /* ── Step 3: upload featured image (cached) ── */
      let mediaId = 0;
      if (post.image) {
        if (mediaCache.has(post.image)) {
          mediaId = mediaCache.get(post.image);
          process.stdout.write('image (cached)… ');
        } else {
          process.stdout.write('image upload… ');
          mediaId = await uploadMedia(post.image, post.title, auth, base);
          mediaCache.set(post.image, mediaId);
        }
      }

      /* ── Step 4: create post ── */
      process.stdout.write('post… ');
      const created = await wpPost(
        '/posts',
        buildPostBody(post, categoryId, mediaId),
        auth, base,
      );
      console.log(`CREATED — WP ID: ${created.id}`);
      results.created.push({ slug: post.slug, wpId: created.id, title: post.title });

    } catch (err) {
      console.log(`FAILED — ${err.message}`);
      results.failed.push({ slug: post.slug, error: err.message });
    }
  }

  /* ── Summary ── */
  console.log('\n' + '═'.repeat(50));
  console.log(`✅  Created : ${results.created.length}`);
  console.log(`⏭   Skipped : ${results.skipped.length}`);
  console.log(`❌  Failed  : ${results.failed.length}`);

  if (results.created.length) {
    console.log('\nCreated:');
    results.created.forEach(p =>
      console.log(`  • WP ID ${p.wpId}  /blog/${p.slug}`),
    );
  }
  if (results.skipped.length) {
    console.log('\nSkipped (already exist in WordPress):');
    results.skipped.forEach(p =>
      console.log(`  • WP ID ${p.wpId}  ${p.slug}`),
    );
  }
  if (results.failed.length) {
    console.log('\nFailed:');
    results.failed.forEach(p =>
      console.log(`  • ${p.slug}\n    ${p.error}`),
    );
    console.log('\n⚠  Some posts failed. Fix the errors above and re-run.');
    console.log('   Already-created posts will be skipped automatically.\n');
    process.exit(1);
  }

  console.log('\n✓ Import complete. Visit WordPress Admin → Posts to verify.\n');
}

main().catch(err => {
  console.error('\n💥 Fatal:', err.message);
  process.exit(1);
});
