# Parkland By The River — Design Reference

**Document Date:** 2026-05-23
**Source:** UI8 Relatora template (Framer/Figma) — used as VISUAL REFERENCE ONLY
**Template author:** Flowgen Studio (framerdot@gmail.com)
**Extraction method:** Raw CSS tokens extracted from live demo at realtora.framer.website

> IMPORTANT: These design tokens are extracted from the Relatora template for inspiration only.
> No Relatora sample content, sample images, fake property names, or fake agent data
> should appear in the Parkland website. All website content comes from
> docs/parkland-old-website-content.md only.
>
> The tokens below are starting-point values. The client should review and approve
> the color palette before coding begins — especially the accent color, which may
> need adjusting to match Parkland Group's official brand.

---

## Token 1 — Color Palette

Extracted directly from Framer CSS custom properties (`--token-*` variables).

### Base Colors

| Role | Hex | Description | Usage |
|------|-----|-------------|-------|
| Primary dark | `#1d1e19` | Near-black with a warm undertone | Dark section backgrounds, footer |
| Deep navy | `#132530` | Deep teal-navy | Hero section background, dark alternating sections |
| Cream white | `#f5f7ec` | Warm off-white, slightly green-tinted | Light section backgrounds |
| Pure white | `#ffffff` | White | Cards, nav background on scroll |
| Pure black | `#000000` | Black | Headline text on light backgrounds |

### Text Colors

| Role | Hex | Description | Usage |
|------|-----|-------------|-------|
| Heading dark | `#474343` | Warm dark charcoal | Section headings on light backgrounds |
| Body text | `#535353` | Medium gray | Paragraph body text |
| Muted text | `#bfbfbf` | Light gray | Captions, dividers, placeholder text |

### Accent Colors

| Role | Hex | Description | Usage |
|------|-----|-------------|-------|
| Primary accent | `#e4f99c` | Bright lime / acid yellow-green | CTA buttons, highlight badges, hover states |
| Secondary accent | `#719106` | Olive green | Icon accents, secondary buttons |
| Overlay | `#666666e6` | Semi-transparent gray (`e6` = ~90% opacity) | Modal overlays, image overlays |

### Parkland Adaptation Note

The Relatora lime accent (`#e4f99c`) is the template's most distinctive color.
For Parkland By The River, consider two options:

- **Option A — Keep the lime:** It creates strong visual contrast against the dark navy hero and reads as premium-modern. Works well for a riverside/nature-connected brand.
- **Option B — Replace with gold:** A warm gold (`#C9A84C` or similar) is more traditional Malaysian luxury property. Confirm with client which direction fits Parkland Group's brand identity.

Do not mix both. Choose one accent color and apply it consistently to: CTA buttons, section dividers, stat highlights, and hover states.

---

## Token 2 — Font Style Direction

### Font Family

**Primary font: Inter** (Google Fonts, free)

Confirmed via decoded Framer font selector: `GF;Inter-600` (Google Font, Inter, weight 600)
Fallback chain: `Inter, Inter Placeholder, sans-serif`

No secondary decorative or serif font is used in Relatora — it is a **single-font system** using weight variation for hierarchy.

### Font Weights Used

| Weight | Value | Usage |
|--------|-------|-------|
| Regular | 400 | Body text, captions, nav links |
| Semibold | 600 | Section labels, card titles, button text |
| Bold | 700 | Large display headings, hero headline |

### Type Scale (from Framer `--framer-font-size` values)

| Level | Size | Line Height | Letter Spacing | Usage |
|-------|------|-------------|----------------|-------|
| Display / Hero H1 | 64px | 1.0em (100%) | -0.03em to -0.05em | Hero main headline |
| H1 | 54px | 1.1em (110%) | -0.03em | Page section titles |
| H2 | 48px | 1.1em | -0.02em | Section headings |
| H3 | 36px–40px | 1.2em (120%) | -0.02em | Sub-section headings |
| H4 | 28px–32px | 1.2em | -0.02em | Card titles, unit names |
| Large body | 20px–24px | 1.5em (150%) | 0 | Lead paragraphs |
| Body | 16px–18px | 1.6em (160%) | 0 | Standard body text |
| Small / Label | 14px–15px | 1.5em | 0 | Captions, tags, badges |

### Typography Direction for Parkland

- Use **tight negative letter spacing** (-0.02em to -0.05em) on all headings 28px and above — this creates the premium, editorial feel visible in the Relatora template.
- Use **generous line-height** (1.5em–1.6em) for body text to aid readability on property description paragraphs.
- Inter is the correct choice for a modern Malaysian property website — it is neutral, clean, and highly legible on screens.

---

## Token 3 — Spacing & Layout Rhythm

### Section Padding (vertical whitespace per section)

| Context | Value | Notes |
|---------|-------|-------|
| Full sections (desktop) | `120px 0` (top/bottom) | Large breathing room between sections |
| Section with side padding | `120px 40px` to `120px 64px` | Horizontal container inset |
| Compact sections | `100px 40px` | Slightly tighter sections |
| Section bottom only | `0 0 12px` or `0 0 20px` | Close-following elements |

### Internal Component Gaps

| Component | Gap | Notes |
|-----------|-----|-------|
| Card grids | `20px` to `24px` | Property / facility card spacing |
| Section text stack (heading → paragraph) | `8px` to `16px` | Tight but readable |
| Feature row (icon + label) | `7px` to `12px` | Close proximity |
| Section columns | `40px` to `64px` | Desktop multi-column gap |
| Large feature blocks | `60px` to `120px` | Hero and highlight sections |

### Layout Rhythm Rule for Parkland

Apply a **base-8 spacing system** using Tailwind's default scale:

| Tailwind | px | Use |
|----------|----|-----|
| `py-24` | 96px | Section top/bottom padding (closest to 120px intent) |
| `gap-6` | 24px | Card grids |
| `gap-10` | 40px | Section columns |
| `gap-16` | 64px | Large feature separators |
| `mb-4` | 16px | Text stack spacing |

This gives consistent rhythm without needing exact Framer pixel values.

---

## Token 4 — Button Style

### Primary CTA Button

Extracted from Framer padding and border-radius values.

| Property | Value | Notes |
|----------|-------|-------|
| Border radius | `50px` | Fully pill-shaped |
| Padding | `12px 36px` | Comfortable horizontal padding |
| Background | `#e4f99c` (lime) or `#000` (black) | Two variants |
| Text color | `#000` on lime; `#fff` on black | Contrast text |
| Font weight | 600 (semibold) | |
| Font size | 15px–16px | |
| Letter spacing | 0 | Buttons do not use tight tracking |

### Outline / Ghost Button

| Property | Value |
|----------|-------|
| Border | `1px solid #000` (via `box-shadow: inset 0 0 0 1px rgb(0,0,0)`) |
| Background | Transparent |
| Border radius | `50px` (same pill shape) |
| Padding | `12px 36px` |

### Hover Behaviour (pattern observed)

- Primary: background shifts slightly (lighter lime or opacity change)
- Outline: fills with solid black, text turns white
- All buttons: `cursor: pointer`, no harsh transitions

### Button Implementation in Tailwind

```
Primary:   rounded-full px-9 py-3 bg-[#e4f99c] text-black font-semibold text-sm
Outline:   rounded-full px-9 py-3 border border-black text-black font-semibold text-sm hover:bg-black hover:text-white transition-colors
```

---

## Token 5 — Card & Section Style

### Property / Unit Card

| Property | Value | Notes |
|----------|-------|-------|
| Border radius | `0px` | Sharp-cornered cards — no rounding |
| Border | None visible | Cards are separated by space, not borders |
| Box shadow (hover) | `0px 0.6px 0.42px -1px rgba(0,0,0,0.12), 0px 2.29px 1.6px -2px rgba(0,0,0,0.11), 0px 10px 7px -3px rgba(0,0,0,0.08)` | Subtle, layered soft shadow |
| Background | `#ffffff` or `#f5f7ec` | White or cream |
| Image | Full-bleed at top, no border | |
| Text padding (internal) | ~16px–24px | |

### Section Alternation Pattern

Relatora alternates dark and light sections to create visual rhythm:

| Section | Background | Text |
|---------|------------|------|
| Hero | `#132530` (deep navy) | `#ffffff` white |
| Features | `#f5f7ec` (cream) | `#000000` black |
| Gallery / CTA | `#1d1e19` (near-black) | `#ffffff` white |
| Floor Plans | `#ffffff` white | `#000000` black |
| Contact | `#132530` or `#1d1e19` | `#ffffff` white |

### Section Dividers

- No visible horizontal rules between sections
- Visual separation is achieved purely through **background color change**
- Some sections use a full-bleed image band or a large isolated image that bleeds into the next section

### Card Shadow Tailwind Equivalent

```
shadow: shadow-[0px_0.6px_0.4px_-1px_rgba(0,0,0,0.12),_0px_2.3px_1.6px_-2px_rgba(0,0,0,0.11),_0px_10px_7px_-3px_rgba(0,0,0,0.08)]
```

Or use Tailwind's built-in `shadow-md` as an approximation.

---

## Summary — Tailwind Config Starting Point

When `tailwind.config.ts` is created after `create-next-app`, the `theme.extend` section should include:

```typescript
// tailwind.config.ts — theme.extend values (starting point, pending client approval)
colors: {
  brand: {
    dark:    '#1d1e19',   // primary dark background
    navy:    '#132530',   // hero / dark sections
    cream:   '#f5f7ec',   // light section background
    accent:  '#e4f99c',   // CTA buttons (confirm with client — may change to gold)
    olive:   '#719106',   // secondary accent
    charcoal:'#474343',   // heading text on light
    body:    '#535353',   // body paragraph text
    muted:   '#bfbfbf',   // borders, captions
  }
},
fontFamily: {
  sans: ['Inter', 'sans-serif'],
},
letterSpacing: {
  tight:   '-0.02em',
  tighter: '-0.03em',
  display: '-0.05em',
},
borderRadius: {
  pill: '50px',
},
```

---

## Design Application Map — Parkland Sections

| Section | Background | Heading | Body text | CTA button |
|---------|------------|---------|-----------|------------|
| Hero (#home) | `navy` `#132530` | White, 64px, weight 700 | White, 18px | Lime `#e4f99c` pill |
| Location (#location) | `cream` `#f5f7ec` | Charcoal `#474343`, 48px | `#535353` | Black pill outline |
| Facilities (#facilities) | `dark` `#1d1e19` | White, 48px | White/muted | Lime pill |
| Floor Plans (#floor-plans) | White `#ffffff` | Black, 48px | `#535353` | Black pill |
| Blog Preview (#blog) | `cream` `#f5f7ec` | Charcoal, 36px | `#535353` | Black outline pill |
| Contact (#contact) | `navy` `#132530` | White, 48px | White | Lime pill |
| Footer | `dark` `#1d1e19` | — | Muted `#bfbfbf` | — |
