# SEO Implementation — Parkland By The River

**Last updated:** 2026-06-02
**Domain:** https://www.parklandbytheriver.com.my *(update `SITE_URL` in `app/layout.tsx` and `BASE_URL` in `app/sitemap.ts` / `app/robots.ts` before going live)*

---

## 1. Page Metadata Implemented

| Page | Route | Title | Primary Keywords |
|------|-------|-------|-----------------|
| Homepage | `/` | Parkland By The River \| Modern Apartment in Johor Bahru | parkland by the river, apartment johor bahru, condo johor bahru |
| About Us | `/about` | About Parkland By The River \| Residential Development | residential development, Parkland By The River |
| Location | `/location` | Strategic Location Near RTS & Bukit Chagar \| Parkland | condo near RTS Johor, bukit chagar property, Johor property near Singapore |
| Facilities | `/facilities` | Premium Facilities for Modern Living \| Parkland | luxury apartment, apartment with swimming pool, apartment with facilities Johor |
| Floor Plans | `/floor-plans` | Unit Types & Floor Plans \| Spacious Modern Living | spacious apartment Johor, family apartment Johor Bahru, condo for family Johor Bahru |
| Blog | `/blog` | Property Insights & Investment Guide \| Parkland Blog | property investment, high rental yield property, Johor property investment |
| Contact | `/contact` | Contact Us \| Parkland By The River | Parkland By The River contact |

All pages include:
- Unique `<title>` using Next.js `title.template`
- Unique `<meta name="description">`
- `<link rel="canonical">`
- OpenGraph title, description, URL, and image
- Twitter card (summary_large_image)
- Robots: index, follow
- OG image: `/assets/parkland/images/hero-render.jpg` (1200×630 recommended)

---

## 2. Blog / Insights — Articles Created

| # | Title | Slug | Primary Keyword | Category |
|---|-------|------|----------------|----------|
| 1 | Property Investment in Johor Bahru: What Buyers Should Know | `property-investment-johor-bahru` | property investment Johor Bahru | Investment Guide |
| 2 | Why Johor Property Near Singapore Is Gaining Attention | `johor-property-near-singapore` | Johor property near Singapore | Location Guide |
| 3 | Condo Near RTS Johor: Benefits of Living Close to Future Connectivity | `condo-near-rts-johor` | condo near RTS Johor | Connectivity |
| 4 | Freehold Apartment in Johor Bahru: Why It Matters for Homebuyers | `freehold-apartment-johor-bahru` | freehold apartment Johor Bahru | Buyer Guide |
| 5 | High Rental Yield Property in Johor: Key Factors to Consider | `high-rental-yield-johor-property` | high rental yield Johor property | Investment Guide |
| 6 | Riverside Living in Johor Bahru: Lifestyle Benefits for Modern Families | `riverside-living-johor-bahru` | riverside living | Lifestyle Benefits |
| 7 | Apartment with Facilities in Johor: What Modern Buyers Look For | `apartment-with-facilities-johor` | apartment with facilities Johor | Lifestyle Benefits |
| 8 | Spacious Apartment in Johor for Family Living | `spacious-apartment-johor-family` | spacious apartment Johor | Floor Plan Guide |

**Content rules enforced:**
- No fake market numbers or guaranteed investment returns
- Safe wording used: "may appeal to", "can be attractive for", "buyers often consider", "depending on market conditions"
- No unverified developer awards, certifications, or statistics

---

## 3. Sitemap & Robots

- **Sitemap:** `app/sitemap.ts` → generates `/sitemap.xml` automatically via Next.js
  - Includes: `/`, `/about`, `/location`, `/facilities`, `/floor-plans`, `/blog`, `/contact`, all 8 blog article routes
- **Robots:** `app/robots.ts` → generates `/robots.txt` automatically via Next.js
  - Rules: `Allow: /` for all user agents
  - References the sitemap URL

---

## 4. Internal Linking Structure

| From | To | CTA Text |
|------|----|----------|
| Homepage (Explore strip) | /facilities | Facilities |
| Homepage (Explore strip) | /floor-plans | Floor Plans |
| Homepage (Explore strip) | /location | Location |
| Homepage (Explore strip) | /blog | Blog |
| Homepage (LocationPreview) | /location | View Full Location Map |
| Facilities page | /floor-plans | Explore Floor Plans |
| Facilities page | /contact | Register Interest |
| Floor Plans page | /contact | Let's Talk |
| Floor Plans (comparison cards) | /contact | Let's Talk (per unit) |
| Blog page | /floor-plans | View Floor Plans |
| Blog page | /contact | Let's Talk |
| Blog article | /blog | Back to Blog |
| Blog article | /contact | Let's Talk |
| About page | /facilities | View Facilities |
| About page | /floor-plans | Explore Floor Plans |
| About page | /contact | Contact Us |

---

## 5. Recommended Monthly SEO Tracking (Google Search Console)

Track these metrics monthly in Google Search Console:

### Organic Performance
- **Total organic clicks** — trend month over month
- **Total organic impressions** — trend month over month
- **Average CTR** — target above 3–5% for branded terms
- **Average position** — track for each primary keyword

### Top Pages to Monitor
- `/` — homepage (primary brand keyword)
- `/location` — RTS/Bukit Chagar keyword cluster
- `/blog` — blog index
- `/blog/property-investment-johor-bahru` — investment keyword
- `/blog/condo-near-rts-johor` — RTS keyword
- `/blog/high-rental-yield-johor-property` — yield keyword

### Top Queries to Track
| Target Query | Target Page |
|---|---|
| parkland by the river | `/` |
| apartment johor bahru | `/` |
| condo near rts johor | `/location` or `/blog/condo-near-rts-johor` |
| bukit chagar property | `/location` |
| johor property near singapore | `/blog/johor-property-near-singapore` |
| property investment johor bahru | `/blog/property-investment-johor-bahru` |
| riverside living johor bahru | `/blog/riverside-living-johor-bahru` |
| high rental yield johor | `/blog/high-rental-yield-johor-property` |
| freehold apartment johor bahru | `/blog/freehold-apartment-johor-bahru` |
| spacious apartment johor | `/floor-plans` or `/blog/spacious-apartment-johor-family` |

### Lead Tracking (from Analysis tab)
- **Organic source leads** — form submissions where referrer is Google/organic
- **Direct source leads** — form submissions with no referrer
- **Organic proportion** = Organic leads ÷ Total leads × 100
- **Conversion rate organic** = Organic leads ÷ Organic sessions × 100

### Blog Performance
- Top 5 blog pages by organic clicks
- Top 5 blog pages by lead-to-registration conversion
- Top 5 blog pages by Add Address / Register Interest CTA clicks

### Recap Source Structure (from Recap All Source to Website tab)
| Metric | Reporting Source |
|---|---|
| Click total organic | Google Search Console |
| Impression total organic | Google Search Console |
| Organic source — active users | Google Analytics 4 |
| Organic source — new users | Google Analytics 4 |
| Direct source — active users | Google Analytics 4 |
| Direct source — new users | Google Analytics 4 |
| Top 5 pages | Google Search Console → Pages tab |
| Top 5 blog register result | CRM / form submission data |
| Top 5 blog add address result | CRM / form submission data |

---

## 6. Backlink Tracking (from Backlink tab)

Track backlinks externally. Do not publish on the public website.
Recommended tracking fields:

| Field | Description |
|---|---|
| Link URL | Full URL of the backlink |
| Target Landing Page | Which page on parklandbytheriver.com.my it points to |
| Anchor Text | The clickable text used |
| Publish Date | Date the link went live |
| Month | Reporting month (e.g. Jan 2026) |
| Domain Rating (DR) | Source site's authority score (e.g. from Ahrefs) |
| Cost | Fee paid (if any) |
| Status | Live / Pending / Removed |

Recommended tools: Ahrefs, Semrush, or Google Search Console (Links report).

---

## 7. Media Outreach Tracking (from Media Database tab)

Track media placements externally. Do not publish on the public website.
Recommended tracking fields:

| Field | Description |
|---|---|
| Media Name | Publication or website name |
| Domain Authority (DA) | Site authority score |
| Link URL | URL of the published article or mention |
| Target Keyword | The keyword the placement supports |
| Status | Contacted / Confirmed / Published / Declined |
| Price | Fee paid (if any) |
| Published URL | Direct link to the live article |

---

## 8. Structured Data (JSON-LD)

Implemented inline in `app/layout.tsx` — `ApartmentComplex` schema using only verified project data:

```json
{
  "@context": "https://schema.org",
  "@type": "ApartmentComplex",
  "name": "Parkland By The River",
  "description": "Freehold serviced apartment in Permas Jaya, Johor Bahru",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Permas Jaya",
    "addressRegion": "Johor Bahru",
    "addressCountry": "MY"
  },
  "url": "https://www.parklandbytheriver.com.my"
}
```

*(Add to layout.tsx `<head>` via Next.js Script component once address is confirmed from client.)*

---

## 9. Items Deferred / Pending Client Confirmation

- APDL number — cannot add to structured data without verified value
- Exact property address — needed for full schema + Google Maps pin
- Social media handles — needed for Twitter/OG author metadata
- Developer contact email — needed for Contact page
- Exact price range — not published per instruction; add only when officially released
- OG image dimensions — `/assets/parkland/images/hero-render.jpg` should be cropped/exported at 1200×630px for best social sharing
