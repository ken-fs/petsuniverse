import raw from "./game.json";

/**
 * Single source of truth for every number on this site.
 *
 * Provenance rules, enforced by the shape of this file:
 *  - `verified: false` means the pet's name is real but no source publishes its
 *    rarity, odds or value. Pages must render that as a gap, never a guess.
 *  - `sources` on a code records how many independent sites listed it. We show
 *    the count on the page instead of hiding it behind a confident table.
 *  - The `gaps` list is rendered on /about/ rather than left implicit.
 */

export type Pet = {
  name: string;
  slug: string;
  rarity: string | null;
  oddsText: string | null;
  valueText: string | null;
  verified: boolean;
  /** Where the name (and any confirmed number) came from. */
  source: string;
};

export type Code = { code: string; reward: string; sources: number };
export type System = { name: string; detail: string };

export const game = raw.game;
export const pets = raw.pets as Pet[];
export const codes = raw.codes as Code[];
export const redeemSteps = raw.redeemSteps as string[];
export const systems = raw.systems as System[];
export const gaps = raw.gaps as string[];

/** Pets with at least one confirmed number. The rest are name-only entries. */
export const verifiedPets = pets.filter((p) => p.verified);

/** ISO date of the last pass over every source this site uses. */
export const LAST_CHECKED = "2026-09-26";

/**
 * Visits per favourite — the retention proxy the radar uses to separate games
 * players commit to from games they walk through. Lower is stickier; the fleet
 * benchmark ranges from 19 (best) to 3,700 (worst).
 */
export const visitsPerFavourite = Math.round(game.visits / game.favorites);
