# Pets Universe Reference

A data reference for the Roblox game **Pets Universe** (Lip Builds): working codes
with their rewards, the pets whose rarity can be traced to a real source, and an
explicit map of what nobody has published yet.

Built on the fleet's second path — Next.js 16 App Router + Tailwind v4 + shadcn/ui,
static export served from Cloudflare Workers assets. Same architecture as
`animedice` (the first path-B site), different content model and a different look.

- Production: https://petsuniverse.site
- Repo: https://github.com/ken-fs/petsuniverse

## The idea

Every pet-game site in this niche publishes the same shape: a codes page, a values
table, and a tier list — often with numbers that were never sourced. This game has
almost no public data (no Fandom, no value list, no odds), so a site that fakes
completeness would be caught in a week.

Instead the site is built around a **provenance rule enforced by the data model**:

- `verified: false` on a pet means its name is real but no source publishes its
  rarity, odds or value. Pages must render that as a gap, never a plausible number.
- Codes carry a `sources` count, and the page tells you when a code has only one.
- The full gap list is rendered on the home page and on `/about/`, not hidden.

That is the moat: when the data does land (in-game index readouts, corroborated
trades), the pages that already exist start filling in instead of being rewritten.

## Structure

```
src/app/
  page.tsx            Home — confirmed vs unpublished, the honest split
  codes/              Codes with rewards + redeem steps + FAQ schema
  pets/               Roster: confirmed rarities, and name-only entries
  pets/[slug]/        One page per pet (generateStaticParams)
  values/             Trading values: why none exist, and how to price a trade
  tier-list/          Ranking method + what is rankable today
  guide/              Systems, the loop, mastery badges
  about/              Sourcing rules and the full gap list
src/data/game.json    Every number, with its own source status
src/data/game.ts      Typed accessors + the provenance contract
src/lib/site.ts       SITE_URL (env-driven, real-domain fallback)
```

## Updating the data

1. Edit `src/data/game.json`.
2. Never set `verified: true` without a source you can name in `source`.
3. `npm run build` — the pages and sitemap regenerate from the JSON, so a new pet
   row automatically produces `/pets/<slug>/` and a sitemap entry.

## Local development

```bash
npm install
npm run dev          # dev server
npm run build        # static export to ./out
npm run lint
```

Deployment, the domain and the manual Cloudflare steps: see [`DEPLOY.md`](./DEPLOY.md).
