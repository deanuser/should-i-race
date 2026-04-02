/**
 * ─────────────────────────────────────────────────────────────
 *  PARTNER DATA — Should I Race?
 * ─────────────────────────────────────────────────────────────
 *  HOW TO ADD A PARTNER
 *  1. Copy one of the example objects below.
 *  2. Fill in the fields (see type definition for guidance).
 *  3. Drop the partner's logo into /public/images/partners/
 *  4. Set `pages` to control which pages show this partner's card.
 *     Use "all" to show everywhere, or list specific page slugs:
 *     e.g. ["home", "about", "contact"]
 *     Valid slugs: "home" | "about" | "contact" | "partner" | "tracks"
 *  5. Save — the card will appear automatically on the chosen pages.
 * ─────────────────────────────────────────────────────────────
 */

export type PartnerPage =
  | "home"
  | "about"
  | "contact"
  | "partner"
  | "tracks"
  | "all";

export interface Partner {
  /** Unique identifier — used as a key, keep it slug-like e.g. "acme-corp" */
  id: string;
  /** Company / brand name shown on the card */
  name: string;
  /** Short tagline or description (1–2 sentences max) */
  description: string;
  /** Path relative to /public — e.g. "/images/partners/acme-logo.png" */
  logo: string;
  /** Full URL the "Visit Website" button links to */
  website: string;
  /** Tier label shown as a badge on the card */
  tier: "Site-Wide Partner" | "Premium Partner";
  /**
   * Pages this partner should appear on.
   * Use "all" to show on every page, or list specific page slugs.
   */
  pages: PartnerPage[];
}

// ─── ACTIVE PARTNERS ─────────────────────────────────────────
// Add your partners below. Remove an entry to remove the card.

export const partners: Partner[] = [
  {
    id: "aflyt",
    name: "Aflyt",
    description:
      "Clothing brand, for athletes, by athletes. We design for the people who show up when no one is watching.",
    logo: "/images/partner/aflyt-logo-white.webp",
    website: "https://aflyt.co.uk/",
    tier: "Site-Wide Partner",
    pages: ["all"],
  },
];

// ─── HELPERS ─────────────────────────────────────────────────

/**
 * Returns only the partners that should be shown on a given page.
 * @param page  The current page slug (e.g. "home")
 */
export function getPartnersForPage(page: PartnerPage): Partner[] {
  return partners.filter(
    (p) => p.pages.includes("all") || p.pages.includes(page)
  );
}
