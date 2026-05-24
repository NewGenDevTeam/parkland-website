/**
 * Floor plan data for Parkland By The River.
 *
 * Content source: docs/parkland-old-website-content.md — Section 6 & Section 9
 * Live website verified: https://parklandbytheriver.com.my/#plan
 *
 * Features (3 bullet points per type) are verbatim from the live old website.
 * Gallery image mappings: confirmed images match old-site filenames exactly.
 * needsImageConfirmation: true = image is available locally but its place in
 *   the old website's gallery is not exactly verified — pending client review.
 *
 * Do NOT add prices, APDL, legal details, or completion dates.
 */

export type FloorPlanType = 'A' | 'B' | 'C';

export interface GalleryImage {
  src:                    string;
  alt:                    string;
  /** true = asset exists but old-website gallery position unverified */
  needsImageConfirmation: boolean;
}

export interface FloorPlan {
  id:           number;
  type:         FloorPlanType;
  label:        string;
  /** Matches the "Specifications" label shown on the old website */
  specLabel:    string;
  name:         string;
  size:         string;
  sqft:         number;
  bedrooms:     number;
  bathrooms:    number;
  /** Verbatim from old website */
  description:  string;
  /** 3 bullet points verbatim from old website */
  features:     string[];
  /** Generic lifestyle descriptor — not an investment claim */
  suitableFor:  string;
  floorPlanSrc: string;
  galleryImages: GalleryImage[];
}

export const FLOOR_PLANS: FloorPlan[] = [
  /* ─── Type A ─────────────────────────────────────────────────────────────── */
  {
    id:        1,
    type:      'A',
    label:     'Type A',
    specLabel: 'Type-A',
    name:      'The Essential Suite',
    size:      '562 sqft',
    sqft:      562,
    bedrooms:  1,
    bathrooms: 1,
    description: 'Designed for singles or young couples seeking a calm and comfortable riverside lifestyle.',
    features: [
      'High ceilings',
      'Soundproof sliding doors',
      'Spacious living area',
    ],
    suitableFor: 'Singles & young couples',
    floorPlanSrc: '/assets/parkland/floor-plans/floor-plan-type-a.webp',
    galleryImages: [
      /* ── Confirmed: match old-website gallery filenames exactly ── */
      { src: '/assets/parkland/unit-renders/type-a/type-a-living-room-2.webp', alt: 'Type A — living room 2',       needsImageConfirmation: false },
      { src: '/assets/parkland/unit-renders/type-a/type-a-living-room-1.webp', alt: 'Type A — living room 1',       needsImageConfirmation: false },
      { src: '/assets/parkland/unit-renders/type-a/type-a-kitchen.webp',       alt: 'Type A — kitchen',             needsImageConfirmation: false },
      { src: '/assets/parkland/unit-renders/type-a/type-a-bedroom-1.webp',     alt: 'Type A — bedroom',             needsImageConfirmation: false },
      { src: '/assets/parkland/unit-renders/type-a/type-a-bathroom.webp',      alt: 'Type A — bathroom',            needsImageConfirmation: false },
      /* ── Additional renders available locally — gallery position unverified ── */
      { src: '/assets/parkland/unit-renders/type-a/type-a-bedroom-2.webp',     alt: 'Type A — bedroom view 2',      needsImageConfirmation: true  },
      { src: '/assets/parkland/unit-renders/type-a/type-a-dining.webp',        alt: 'Type A — dining area',         needsImageConfirmation: true  },
      { src: '/assets/parkland/unit-renders/type-a/type-a-dining-kitchen.webp',alt: 'Type A — dining and kitchen',  needsImageConfirmation: true  },
      { src: '/assets/parkland/unit-renders/type-a/type-a-dining-living.webp', alt: 'Type A — dining and living',   needsImageConfirmation: true  },
    ],
  },

  /* ─── Type B ─────────────────────────────────────────────────────────────── */
  {
    id:        2,
    type:      'B',
    label:     'Type B',
    specLabel: 'Type-B',
    name:      'The Comfort Haven',
    size:      '820 sqft',
    sqft:      820,
    bedrooms:  2,
    bathrooms: 2,
    description: 'Suitable for couples planning to start a family or homeowners upgrading from a smaller unit.',
    features: [
      'Fits Super King bed',
      'En-suite bathroom',
      '2 car parks included',
    ],
    suitableFor: 'Couples & growing families',
    floorPlanSrc: '/assets/parkland/floor-plans/floor-plan-type-b.webp',
    galleryImages: [
      /* ── Named renders — positions in old-website gallery unverified ── */
      { src: '/assets/parkland/unit-renders/type-b/type-b-living-room.webp',         alt: 'Type B — living room',        needsImageConfirmation: true },
      { src: '/assets/parkland/unit-renders/type-b/type-b-bedroom.webp',             alt: 'Type B — bedroom',            needsImageConfirmation: true },
      { src: '/assets/parkland/unit-renders/type-b/type-b-kitchen.webp',             alt: 'Type B — kitchen',            needsImageConfirmation: true },
      { src: '/assets/parkland/unit-renders/type-b/type-b-kitchen-1.webp',           alt: 'Type B — kitchen view 2',     needsImageConfirmation: true },
      { src: '/assets/parkland/unit-renders/type-b/type-b-bathroom.webp',            alt: 'Type B — bathroom',           needsImageConfirmation: true },
      { src: '/assets/parkland/unit-renders/type-b/type-b-bathroom-1.webp',          alt: 'Type B — second bathroom',    needsImageConfirmation: true },
      /* ── Dated gallery photos — first one confirmed from old-website HTML ── */
      { src: '/assets/parkland/unit-renders/type-b/type-b-10312024-023207.webp',     alt: 'Type B — interior photo',     needsImageConfirmation: false },
      { src: '/assets/parkland/unit-renders/type-b/type-b-11222024-152744.webp',     alt: 'Type B — interior photo 2',   needsImageConfirmation: true  },
      { src: '/assets/parkland/unit-renders/type-b/type-b-11222024-152850.webp',     alt: 'Type B — interior photo 3',   needsImageConfirmation: true  },
      { src: '/assets/parkland/unit-renders/type-b/type-b-11222024-152914.webp',     alt: 'Type B — interior photo 4',   needsImageConfirmation: true  },
      { src: '/assets/parkland/unit-renders/type-b/type-b-11222024-153006.webp',     alt: 'Type B — interior photo 5',   needsImageConfirmation: true  },
      { src: '/assets/parkland/unit-renders/type-b/type-b-11222024-153055.webp',     alt: 'Type B — interior photo 6',   needsImageConfirmation: true  },
      { src: '/assets/parkland/unit-renders/type-b/type-b-11222024-153342.webp',     alt: 'Type B — interior photo 7',   needsImageConfirmation: true  },
      { src: '/assets/parkland/unit-renders/type-b/type-b-11222024-153450.webp',     alt: 'Type B — interior photo 8',   needsImageConfirmation: true  },
      { src: '/assets/parkland/unit-renders/type-b/type-b-11222024-153640.webp',     alt: 'Type B — interior photo 9',   needsImageConfirmation: true  },
    ],
    /* Note: old website has 16 gallery images — 1 is unaccounted for in local assets */
  },

  /* ─── Type C ─────────────────────────────────────────────────────────────── */
  {
    id:        3,
    type:      'C',
    label:     'Type C',
    specLabel: 'Type-C',
    name:      'The Family Retreat',
    size:      '1,020 sqft',
    sqft:      1020,
    bedrooms:  3,
    bathrooms: 2,
    description: 'Perfect for families looking for a spacious and comfortable home environment.',
    features: [
      'Open-concept kitchen',
      '8-seater dining space',
      'Optimal layout',
    ],
    suitableFor: 'Families & multi-generation living',
    floorPlanSrc: '/assets/parkland/floor-plans/floor-plan-type-c.webp',
    galleryImages: [
      /* ── Named renders — bedroom confirmed from old-website HTML ── */
      { src: '/assets/parkland/unit-renders/type-c/type-c-bedroom.webp',             alt: 'Type C — bedroom',         needsImageConfirmation: false },
      { src: '/assets/parkland/unit-renders/type-c/type-c-bathroom.webp',            alt: 'Type C — bathroom',        needsImageConfirmation: true  },
      /* ── Dated gallery photos — gallery position unverified ── */
      { src: '/assets/parkland/unit-renders/type-c/type-c-11222024-151813.webp',     alt: 'Type C — interior photo',   needsImageConfirmation: true  },
      { src: '/assets/parkland/unit-renders/type-c/type-c-11222024-151949.webp',     alt: 'Type C — interior photo 2', needsImageConfirmation: true  },
      { src: '/assets/parkland/unit-renders/type-c/type-c-11222024-152035.webp',     alt: 'Type C — interior photo 3', needsImageConfirmation: true  },
      { src: '/assets/parkland/unit-renders/type-c/type-c-11222024-152221.webp',     alt: 'Type C — interior photo 4', needsImageConfirmation: true  },
    ],
    /* Note: old website has 9 gallery images — 3 are not in local assets */
  },
];
