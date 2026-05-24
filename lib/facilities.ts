/**
 * Facility hotspot data for the interactive 3D map.
 *
 * Coordinates manually aligned against official Parkland facilities map reference.
 * Image: /assets/parkland/facilities/facilities-3d-map-clean.png  (1536 × 658 px)
 *
 * x = % from left edge of image (0–100)
 * y = % from top  edge of image (0–100)
 *
 * needsCoordinateReview: false — position anchored to a clearly identifiable
 *                                landmark in the map image.
 * needsCoordinateReview: true  — position estimated; verify by opening
 *                                /facilities in the browser and comparing
 *                                the numbered marker against the map zone.
 */

/*
 * Facilities marker QA:
 *  1 = Multipurpose Hall   — lower-left building block
 *  2 = Pantry              — lower-left building block
 *  3 = Changing Room       — lower-left building block
 *  4 = Sauna               — podium wellness cluster (center-left)
 *  5 = Hot & Cold Bath     — podium wellness cluster (center-left)
 *  6 = Pool Villa          — upper-left edge of pool complex
 *  7 = Swimming Pool       — main pool center
 *  8 = Gymnasium           — upper-right sports / court zone  ← moved Stage 3E-8
 *  9 = Play Pool           — right section of pool complex
 * 10 = Pool Lounge         — below pool center
 * 11 = Water Slide         — upper area, near pool (slide tower / splash zone)
 * 12 = BBQ Pit             — left pool edge / deck area
 * 13 = Pool Deck           — lower pool deck
 * 14 = Serenity Garden     — far-left garden strip
 * 15 = Garden Kitchen      — lower garden / greenhouse area
 * 16 = The Green Canvas    — right-side open green space
 * 17 = Playground          — upper greenery zone
 * 18 = Multipurpose Sports Court — orange court, upper-right (anchor)
 * 19 = Forest Glade        — far-right garden
 */

export type FacilityCategory =
  | 'Water'
  | 'Wellness'
  | 'Fitness'
  | 'Outdoor'
  | 'Community'
  | 'Recreation';

export interface FacilityHotspot {
  id:                    number;
  name:                  string;
  category:              FacilityCategory;
  /** % from left edge of map image */
  x:                     number;
  /** % from top edge of map image */
  y:                     number;
  image:                 string;
  /** false = landmark clearly visible; true = cluster zone, needs overlay check */
  needsCoordinateReview: boolean;
  /** Image/name confirmation status (client sign-off required where true) */
  needsConfirmation:     boolean;
  sourceNote:            string;
}

export const CATEGORY_COLOR: Record<FacilityCategory, string> = {
  Water:      'text-sky-300',
  Wellness:   'text-amber-300',
  Fitness:    'text-orange-300',
  Outdoor:    'text-emerald-300',
  Community:  'text-purple-300',
  Recreation: 'text-blue-300',
};

export const FACILITIES: FacilityHotspot[] = [

  /* ── Zone A — Lower-left building block (below Tower B) ──────────────────
     Three amenity buildings clearly visible at the bottom-left of the map.
     needsCoordinateReview: false — anchor zone.                          ── */
  {
    id: 1,
    name: 'Multipurpose Hall',
    category: 'Community',
    x: 10.3, y: 71.1,
    needsCoordinateReview: false,
    image: '/assets/parkland/facilities/popups/01-multipurpose-hall.jpg',
    needsConfirmation: false,
    sourceNote: 'Dedicated popup image confirmed. Leftmost building, lower-left cluster.',
  },
  {
    id: 2,
    name: 'Pantry',
    category: 'Community',
    x: 9.7, y: 81.8,
    needsCoordinateReview: false,
    image: '/assets/parkland/facilities/popups/02-pantry.jpg',
    needsConfirmation: false,
    sourceNote: 'Dedicated popup image confirmed. Bottom of left building cluster.',
  },
  {
    id: 3,
    name: 'Changing Room',
    category: 'Wellness',
    x: 19.7, y: 83.5,
    needsCoordinateReview: false,
    image: '/assets/parkland/facilities/popups/03-changing-room.jpg',
    needsConfirmation: false,
    sourceNote: 'Dedicated popup image confirmed. Right of #1, same lower-left block.',
  },

  /* ── Zone B — Podium wellness cluster (center-left) ──────────────────────
     Spa / wellness amenities in the podium building area, between the
     lower-left block and the main pool complex.                          ── */
  {
    id: 4,
    name: 'Sauna',
    category: 'Wellness',
    x: 18.6, y: 75.2,
    needsCoordinateReview: true,
    image: '/assets/parkland/facilities/popups/04-sauna.jpg',
    needsConfirmation: false,
    sourceNote: 'Dedicated popup image confirmed. Wellness cluster — needs overlay verification of coordinate.',
  },
  {
    id: 5,
    name: 'Hot & Cold Bath',
    category: 'Wellness',
    x: 27.2, y: 80.2,
    needsCoordinateReview: true,
    image: '/assets/parkland/facilities/popups/05-hot-cold-bath.jpg',
    needsConfirmation: false,
    sourceNote: 'Dedicated popup image confirmed. Wellness cluster, right of #4 — needs overlay verification of coordinate.',
  },

  /* ── Zone C — Pool complex (center of map) ───────────────────────────────
     The main pool spans roughly x 28–54 %, y 34–68 %.
     All pool-zone markers need live overlay verification.               ── */
  {
    id: 6,
    name: 'Pool Villa',
    category: 'Water',
    x: 19.7, y: 59.1,
    needsCoordinateReview: true,
    image: '/assets/parkland/facilities/popups/06-pool-villa.jpg',
    needsConfirmation: false,
    sourceNote: 'Dedicated popup image confirmed. Upper-left edge of pool complex — needs overlay verification of coordinate.',
  },
  {
    id: 7,
    name: 'Swimming Pool',
    category: 'Water',
    x: 27.9, y: 64.8,
    needsCoordinateReview: true,
    image: '/assets/parkland/facilities/popups/07-swimming-pool.jpg',
    needsConfirmation: false,
    sourceNote: 'Dedicated popup image confirmed. Center of main rectangular pool — needs overlay verification of coordinate.',
  },
  {
    id: 9,
    name: 'Play Pool',
    category: 'Water',
    x: 42.2, y: 54.1,
    needsCoordinateReview: true,
    image: '/assets/parkland/facilities/popups/09-play-pool.JPG',
    needsConfirmation: false,
    sourceNote: 'Dedicated popup image confirmed. Right section of pool complex — needs overlay verification of coordinate.',
  },
  {
    id: 10,
    name: 'Pool Lounge',
    category: 'Recreation',
    x: 45.1, y: 71.9,
    needsCoordinateReview: true,
    image: '/assets/parkland/facilities/popups/10-pool-lounge.jpg',
    needsConfirmation: false,
    sourceNote: 'Dedicated popup image confirmed. Below pool center (lounge / pergola area) — needs overlay verification of coordinate.',
  },
  {
    id: 11,
    name: 'Water Slide',
    category: 'Recreation',
    x: 50.2, y: 60.0,
    needsCoordinateReview: true,
    image: '/assets/parkland/facilities/popups/11-water-slide.jpg',
    needsConfirmation: false,
    sourceNote: 'Dedicated popup image confirmed. Upper area near pool — needs overlay verification of coordinate.',
  },
  {
    id: 12,
    name: 'BBQ Pit',
    category: 'Community',
    x: 53.1, y: 75.2,
    needsCoordinateReview: true,
    image: '/assets/parkland/facilities/popups/12-bbq-pit.jpg',
    needsConfirmation: false,
    sourceNote: 'Dedicated popup image confirmed. Left pool edge / deck area — needs overlay verification of coordinate.',
  },
  {
    id: 13,
    name: 'Pool Deck',
    category: 'Recreation',
    x: 29.7, y: 50.3,
    needsCoordinateReview: true,
    image: '/assets/parkland/facilities/popups/13-pool-deck.jpg',
    needsConfirmation: false,
    sourceNote: 'Dedicated popup image confirmed. Lower pool deck area — needs overlay verification of coordinate.',
  },

  /* ── Zone D — Garden strip (far left) ────────────────────────────────────
     needsCoordinateReview: false — anchor zone, clearly visible.        ── */
  {
    id: 14,
    name: 'Serenity Garden',
    category: 'Outdoor',
    x: 19.6, y: 41.6,
    needsCoordinateReview: false,
    image: '/assets/parkland/facilities/popups/14-serenity-garden.jpg',
    needsConfirmation: false,
    sourceNote: 'Dedicated popup image confirmed. Far-left garden strip — anchor point.',
  },

  /* ── Zone E — Lower garden area ──────────────────────────────────────────  */
  {
    id: 15,
    name: 'Garden Kitchen',
    category: 'Community',
    x: 56.9, y: 25.0,
    needsCoordinateReview: true,
    image: '/assets/parkland/facilities/popups/15-garden-kitchen.jpg',
    needsConfirmation: false,
    sourceNote: 'Dedicated popup image confirmed. Lower garden / greenhouse area — needs overlay verification of coordinate.',
  },

  /* ── Zone F — Right-side green space ─────────────────────────────────── */
  {
    id: 16,
    name: 'The Green Canvas',
    category: 'Outdoor',
    x: 44.4, y: 32.2,
    needsCoordinateReview: true,
    image: '/assets/parkland/facilities/popups/16-green-canvas.jpeg',
    needsConfirmation: false,
    sourceNote: 'Dedicated popup image confirmed. Right-side open green area — needs overlay verification of coordinate.',
  },

  /* ── Zone G — Upper sports / playground zone ─────────────────────────────
     Includes the playground, gymnasium (CORRECTED: moved from pool zone
     to upper-right sports zone in Stage 3E-8), and the sports court.   ── */
  {
    id: 17,
    name: 'Playground',
    category: 'Community',
    x: 66.6, y: 24.4,
    needsCoordinateReview: false,
    image: '/assets/parkland/facilities/popups/17-playground.jpg',
    needsConfirmation: false,
    sourceNote: 'Dedicated popup image confirmed. Upper greenery zone between pool complex and sports court.',
  },
  /*
   * Stage 3E-8 CORRECTION: Gymnasium moved from x:34, y:63 (pool zone)
   * to x:72, y:28 (upper-right sports / court zone, per layout audit).
   */
  {
    id: 8,
    name: 'Gymnasium',
    category: 'Fitness',
    x: 37.5, y: 69.1,
    needsCoordinateReview: true,
    image: '/assets/parkland/facilities/popups/08-gymnasium.jpg',
    needsConfirmation: false,
    sourceNote: 'Dedicated popup image confirmed. CORRECTED in Stage 3E-8 — moved from pool zone to upper-right sports/court zone. Needs live overlay verification of exact coordinate.',
  },

  /* ── Zone H — Upper-right: sports court (anchor) ─────────────────────── */
  {
    id: 18,
    name: 'Multipurpose Sports Court',
    category: 'Fitness',
    x: 75.6, y: 23.5,
    needsCoordinateReview: false,
    image: '/assets/parkland/facilities/popups/18-multipurpose-sports-court.jpg',
    needsConfirmation: false,
    sourceNote: 'Dedicated popup image confirmed. Orange/red sports court — most reliably identifiable landmark. Anchor for upper-right zone.',
  },

  /* ── Zone I — Far-right garden ────────────────────────────────────────── */
  {
    id: 19,
    name: 'Forest Glade',
    category: 'Outdoor',
    x: 79.9, y: 64.7,
    needsCoordinateReview: true,
    image: '/assets/parkland/facilities/popups/19-forest-glade.jpg',
    needsConfirmation: false,
    sourceNote: 'Dedicated popup image confirmed. Far-right garden area — needs overlay verification of coordinate.',
  },
];
