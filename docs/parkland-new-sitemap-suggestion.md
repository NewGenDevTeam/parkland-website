# Parkland By The River — New Website Sitemap Suggestion

**Document Date:** 2026-05-21 (Updated 2026-05-21)
**Based On:** Old website content extraction (Stage 1) + client-directed structure update

---

## CHANGE LOG

| Version | Date | Change |
|---------|------|--------|
| v1.0 | 2026-05-21 | Initial sitemap from Stage 1 extraction |
| v1.1 | 2026-05-21 | Restructured to match client's final section order; added Blog / Lifestyle Benefits as new SEO section; added Let's Talk as dedicated CTA element |

---

## STRUCTURE TYPE

**Single-page scrollable website** with sticky anchor navigation.
Each section is a full-width scroll-snap zone.
Blog / Lifestyle Benefits section links out to standalone blog post pages (`/blog/[slug]`).

---

## FINAL SITEMAP

```
/ (Homepage — Single Page with Anchor Sections)
├── #home            → Hero Section
├── #location        → Strategic Location + Map
├── #facilities      → 19 Lifestyle Facilities
├── #floor-plans     → Floor Plans (Type A / B / C)
├── #blog            → Blog / Lifestyle Benefits (preview strip)
└── #contact         → Contact Form + WhatsApp + Phone

/blog                → Blog listing page (all articles)
/blog/[slug]         → Individual blog article pages

(Floating)           → "Let's Talk" persistent CTA button
```

---

## NAVIGATION ORDER (HEADER)

| # | Label | Anchor |
|---|-------|--------|
| 1 | Home | #home |
| 2 | Location | #location |
| 3 | Facilities | #facilities |
| 4 | Floor Plans | #floor-plans |
| 5 | Blog | #blog |
| 6 | Contact | #contact |
| — | **Let's Talk** | CTA button (right side, always visible) |

---

## SECTION DETAILS

---

### Section 1: HOME / HERO (`#home`)

**Source:** Extracted from old website

**Content:**
- Project name: **PARKLAND BY THE RIVER**
- Tagline: *"Experience Riverside Living Like Never Before"*
- Sub-tagline: *"A Luxurious Serviced Apartment with Modern Design and Unparalleled Convenience."*
- Location badge: Permas Jaya, Johor Bahru
- Key stat callout: 8km to CIQ & RTS
- Background visual: Hero building render + sky image (assets downloaded)
- Quick stat strip below hero: Freehold | 1,078 Units | 36 Floors | 19 Facilities | Est. 2028
- CTA button: **"Let's Talk"** → triggers contact popup or scrolls to #contact

**Blog preview placement on Home:**
A slim 3-card teaser strip sits at the bottom of the Home section or just above the footer.
- Shows 3 latest blog articles (thumbnail + title + category tag only)
- Headline: *"Living the Permas Jaya Lifestyle"* or similar
- CTA link: *"Read More Articles →"* → scrolls to #blog or goes to /blog
- Keeps the Home section clean — no article body text is shown here
- Cards are compact (horizontal layout on desktop, stacked on mobile)

---

### Section 2: LOCATION (`#location`)

**Source:** Extracted from old website

**Section Headline:** OUR STRATEGIC LOCATION
**Sub-headline:** ALL UNDER 10KM

**Content:**
- Location map image (downloaded: `location/location-map.webp`)
- Master site map overview (downloaded: `location/mastermap.webp`)
- Key connectivity callouts:
  - CIQ ~ 8 km
  - RTS Bukit Chagar ~ 8 km
  - Upcoming RTS Link & Singapore Access note
- Distance cards grouped by category:

  **Premium Shopping:**
  - AEON Mall Permas Jaya ~ 3 km
  - Giant Hypermarket Plentong ~ 6 km
  - Lotus's Plentong ~ 5 km
  - Midvalley Southkey ~ 6 km

  **Education:**
  - SJKC Pei Hwa 2 ~ 3 km
  - SK & SMK Permas Jaya ~ 4 km
  - International Schools JB ~ 5 km

  **Healthcare:**
  - Columbia Asia Hospital ~ 3 km
  - KPJ Pasir Gudang Specialist Hospital ~ 10 km
  - Regency Specialist Hospital ~ 10 km

  **Banks:**
  - CIMB Bank ~ 2.5 km | Maybank ~ 2.5 km | Public Bank ~ 2.5 km

  **Recreation:**
  - Permas Jaya Golf Club ~ 2 km
  - Permas Jaya Marina Club ~ 3 km
  - Permas Jaya Sports Complex ~ 2.5 km

  **Major Highways:**
  - EDL Expressway, Tebrau Highway, Coastal Highway, Skudai Highway, Pasir Gudang Highway

- Shuttle Bus Service callout: Free dedicated shuttle to CIQ for residents

---

### Section 3: FACILITIES (`#facilities`)

**Source:** Extracted from old website

**Section Headline:** OUR FACILITIES
**Sub-headline:** *"Our podium floor is a sanctuary of recreation and relaxation"*

**Content:**
- 3D facilities map (downloaded: `facilities/facilities-3d-map.webp`)
- Full numbered list of all 19 facilities:

| # | Facility |
|---|---------|
| 1 | Multipurpose Hall |
| 2 | Pantry |
| 3 | Changing Room |
| 4 | Sauna |
| 5 | Hot & Cold Bath |
| 6 | Pool Villa |
| 7 | Swimming Pool |
| 8 | Gymnasium |
| 9 | Play Pool |
| 10 | Pool Lounge |
| 11 | Water Slide |
| 12 | BBQ Pit |
| 13 | Pool Deck |
| 14 | Serenity Garden |
| 15 | Garden Kitchen |
| 16 | The Green Canvas |
| 17 | Playground |
| 18 | Multipurpose Sports Court |
| 19 | Forest Glade |

---

### Section 4: FLOOR PLANS (`#floor-plans`)

**Source:** Extracted from old website

**Section Headline:** OUR FLOOR PLAN

**Content:**
- Tab switcher: **Type A** | **Type B** | **Type C**
- Per tab:
  - Unit name and size
  - Floor plan image (zoom-able lightbox)
  - Spec summary: sqft | bedrooms | bathrooms
  - Interior render images (carousel)
  - Description paragraph

**Unit reference:**

| Type | Name | Size | Layout |
|------|------|------|--------|
| Type A | The Essential Suite | 562 sqft | 1 Bed + 1 Bath |
| Type B | The Comfort Haven | 820 sqft | 2 Bed + 2 Bath |
| Type C | The Family Retreat | 1,020 sqft | 3 Bed + 2 Bath |

*Pricing display: pending client confirmation — see docs/parkland-missing-info.md item #2*

---

### Section 5: BLOG / LIFESTYLE BENEFITS (`#blog`)

**Source:** NEW SECTION — Not extracted from the old website.
This section does not exist on the current site.
It is proposed as a new SEO content layer to drive organic search traffic for relevant Johor Bahru / Permas Jaya / CIQ property keywords.

**Purpose:**
- Rank for long-tail property search keywords in Johor Bahru
- Build topical authority around riverside living, CIQ commuting, serviced apartments
- Provide value to homebuyers researching Permas Jaya as a location
- Support lead generation indirectly through informational content

---

#### Blog Categories (Suggested)

| Category | SEO Focus |
|----------|-----------|
| **Living in Permas Jaya** | Neighbourhood lifestyle, amenities, what it's like to live there |
| **Singapore Commuter Guide** | CIQ, RTS Link, daily commute tips — targets Singapore-based buyers |
| **Homebuyer's Guide JB** | First-time buyer tips, financing, HDA, freehold vs leasehold |
| **Riverside Living** | Wellness, nature-adjacent urban living, mental health benefits |
| **Johor Property Market** | JB market updates, investment outlook — targets investors |

---

#### Suggested Blog Article Titles (5–8 for Launch)

> These are SEO-oriented titles only. No articles are written yet.
> No pricing, APDL, legal details, or completion dates are used.

1. **"Why Permas Jaya Is Becoming Johor Bahru's Most Sought-After Neighbourhood"**
   - Category: Living in Permas Jaya
   - Target keyword: *permas jaya property johor bahru*

2. **"CIQ and RTS Link Explained: What Johor Bahru Residents Need to Know"**
   - Category: Singapore Commuter Guide
   - Target keyword: *CIQ RTS link JB singapore commute*

3. **"Freehold vs Leasehold in Malaysia: What Every First-Time Buyer Should Know"**
   - Category: Homebuyer's Guide JB
   - Target keyword: *freehold leasehold malaysia property difference*

4. **"What to Expect from Riverside Living in Johor Bahru"**
   - Category: Riverside Living
   - Target keyword: *riverside apartment johor bahru living*

5. **"5 Reasons Serviced Apartments in JB Are a Smart Long-Term Investment"**
   - Category: Johor Property Market
   - Target keyword: *serviced apartment johor bahru investment*

6. **"A Day in the Life: Living Near AEON, Midvalley Southkey, and Permas Jaya"**
   - Category: Living in Permas Jaya
   - Target keyword: *aeon permas jaya midvalley southkey lifestyle*

7. **"How the RTS Link Will Change Daily Life for JB–Singapore Commuters"**
   - Category: Singapore Commuter Guide
   - Target keyword: *RTS link johor bahru singapore impact*

8. **"Choosing the Right Unit Size: 1-Bedroom vs 2-Bedroom vs 3-Bedroom Apartments in JB"**
   - Category: Homebuyer's Guide JB
   - Target keyword: *johor bahru apartment size guide 1 2 3 bedroom*

---

#### Blog Section on Homepage (Preview Strip)

The `#blog` section on the homepage shows a **3-card preview only**:
- Each card: featured image + category tag + article title
- No body text, no author, no date on cards
- One line CTA: *"Explore More Articles →"* linking to `/blog`
- Section headline: *"Life at Parkland — Lifestyle & Local Insights"*
- This keeps the homepage light while signalling content depth to search engines

Standalone blog pages (`/blog/[slug]`) are separate full-length article pages with proper SEO metadata, structured headings, and internal links back to the main property page.

---

### Section 6: CONTACT (`#contact`)

**Source:** Extracted from old website

**Section Headline:** *"Contact Us Today to Secure Your Unit!"*

**Content:**
- Phone: 013-665 5111
- WhatsApp CTA button (primary action)
- Contact form: Name | Phone | Unit Type Interest | Message
- Urgency line: *"Units are moving fast. Register today to receive the full e-brochure and an exclusive invitation to our private gallery viewing."*
- APDL notice placeholder *(pending — see missing-info.md item #1)*
- Showroom address *(pending — see missing-info.md item #10)*

---

### PERSISTENT CTA: LET'S TALK

**Type:** Floating action button (visible on all scroll positions)

**Behaviour:**
- Fixed position on screen, does not disappear on scroll
- On desktop: bottom-right corner
- On mobile: full-width sticky bar at bottom
- Label: **"Let's Talk"**
- Action: Opens WhatsApp chat or triggers the contact popup form
- Secondary option: dial 013-665 5111

This matches the original website's popup CTA pattern and ensures lead capture is always one tap away.

---

### HEADER / NAVIGATION (GLOBAL)

- Logo: top left
- Menu: Home | Location | Facilities | Floor Plans | Blog | Contact
- CTA Button: **"Let's Talk"** — top right, always visible, accent colour
- Sticky on scroll (transparent at top, solid on scroll)
- Mobile: hamburger menu

---

### FOOTER (GLOBAL)

- Logo
- Navigation links (same as header)
- Phone: 013-665 5111
- Social media icons: Facebook | Instagram | YouTube | TikTok *(handles pending)*
- APDL / Developer Licence number *(pending — see missing-info.md item #1)*
- Copyright: © 2026 Parkland By The River | Parkland Group
- Legal disclaimer line *(pending)*

---

## STANDALONE PAGES

| URL | Purpose | Content Source | Priority |
|-----|---------|----------------|----------|
| `/blog` | Blog listing — all articles | New SEO content | High |
| `/blog/[slug]` | Individual blog articles | New SEO content | High |
| `/brochure` | Gated e-brochure download | Client to provide PDF | Medium |
| `/virtual-tour` | Embedded YouTube unit tour | YouTube links saved | Medium |

---

## TECHNICAL NOTES

- **Framework:** TBD — client rebuilding from scratch (not cloning WordPress)
- **SEO Title (Homepage):** Parkland By The River | Permas Jaya Johor | Freehold Serviced Apartment
- **Blog SEO structure:** Each post needs: `<title>`, `<meta description>`, Open Graph tags, canonical URL, structured heading hierarchy (H1 → H2 → H3)
- **Primary CTA:** WhatsApp + persistent floating button (matches original intent)
- **Languages:** Confirm if Chinese version required *(see missing-info.md item #18)*
- **Analytics:** Multi-agent WhatsApp tracking may need to be maintained *(see missing-info.md item #19)*
- **Forms:** Confirm CRM/email destination *(see missing-info.md item #20)*
- **Video:** Embed https://www.youtube.com/watch?v=_UkRgwpy0qk in hero or about section
- **Images:** All downloaded assets are .webp — high performance ✓
- **Blog images:** Not yet sourced. Each blog article will need a featured image. Confirm if stock photography is acceptable or if original photos are required.
