import type { Metadata } from "next";
import Link from "next/link";
import { game, gaps, pets, codes, LAST_CHECKED, visitsPerFavourite } from "@/data/game";

export const metadata: Metadata = {
  title: "About this Pets Universe reference — sourcing and gaps",
  description:
    "Where every number on this Pets Universe site comes from, the rules a value has to pass before it is published, and the full list of what is still missing.",
  alternates: { canonical: "/about/" },
};

export default function AboutPage() {
  return (
    <article className="mx-auto w-full max-w-6xl px-5">
      <nav className="pt-8 text-sm text-muted-foreground" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <span className="px-2 text-border" aria-hidden="true">
          /
        </span>
        <span className="text-foreground">About</span>
      </nav>

      <header className="pt-6 pb-10">
        <h1 className="max-w-[26ch] text-3xl font-semibold tracking-tight sm:text-4xl">
          About this site, and what it refuses to do
        </h1>
        <p className="mt-4 max-w-[62ch] text-muted-foreground">
          {game.name} is young — created {game.created} — and most of its numbers live
          in the game and in its Discord rather than on a wiki. This site exists to
          publish the ones that can be traced, and to show the shape of the ones that
          cannot. It is fan-made and not affiliated with {game.developer} or Roblox
          Corporation.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-3">
        <Stat label="Pets tracked" value={String(pets.length)} sub="names traced to a source" />
        <Stat label="Codes listed" value={String(codes.length)} sub="each with its reward" />
        <Stat
          label="Visits per favourite"
          value={String(visitsPerFavourite)}
          sub={`${game.favorites.toLocaleString("en-US")} favourites`}
        />
      </section>

      <section className="border-t rule mt-14 py-12">
        <h2 className="text-sm font-medium">The three rules</h2>
        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          <Rule
            n="01"
            title="A number needs a source, or it does not ship"
            body="Every figure on this site traces to one of: the developer's own artwork and game data, the Roblox API, or a live listing that we checked. Where none of those exist, the field says 'not published'. It never says a plausible number."
          />
          <Rule
            n="02"
            title="Community numbers need two sources"
            body="Values and odds from players are published only when two independent sources agree. That is why the codes are listed with a sourcing count, and why the value columns are empty today — one trade is an anecdote."
          />
          <Rule
            n="03"
            title="Gaps are content"
            body="The list of what nobody has published is on the home page and repeated below. A reference site that hides its gaps is telling you to trust it without evidence."
          />
        </div>
      </section>

      <section className="border-t rule py-12">
        <h2 className="text-sm font-medium">Where the numbers come from</h2>
        <dl className="mt-5 grid gap-px overflow-hidden rounded-[var(--radius-container)] border rule bg-border sm:grid-cols-2">
          <Source
            name="Roblox API"
            what="Visits, favourites, live player counts, creation and update dates, and the game's badge list."
            note="Refreshed on every pass. The badge list is why the mastery table on the guide page can be trusted."
          />
          <Source
            name="The game's own artwork and description"
            what="Pet names, the 'hundreds of pets' claim, the rarity and odds printed on promotional images."
            note="Developer-published, so it outranks anything a third party writes."
          />
          <Source
            name="Live code listings"
            what="Each code and its reward."
            note="Listed with a source count so you can see how well corroborated a code is."
          />
          <Source
            name="The game's Discord"
            what="Trades and community values — the numbers this genre usually keeps off the web."
            note="Used for verification, never quoted as a price on its own."
          />
        </dl>
      </section>

      <section className="border-t rule py-12">
        <h2 className="text-sm font-medium">Everything still missing</h2>
        <p className="mt-3 max-w-[62ch] text-sm text-muted-foreground">
          As of {LAST_CHECKED}, these are the gaps. Each one becomes a page the moment it
          closes.
        </p>
        <ul className="mt-5 space-y-3 text-sm">
          {gaps.map((g) => (
            <li key={g} className="flex gap-3">
              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span className="max-w-[70ch] text-muted-foreground">{g}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t rule py-12">
        <h2 className="text-sm font-medium">Corrections</h2>
        <p className="mt-3 max-w-[62ch] text-sm text-muted-foreground">
          If a number here is wrong, the fix is a source, not a debate: send the link and
          the page changes the same day. The same rule that keeps guesses off this site
          keeps bad corrections off it too.
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          Game:{" "}
          <a
            href={game.robloxUrl}
            target="_blank"
            rel="noopener"
            className="text-primary underline-offset-4 hover:underline"
          >
            {game.name} on Roblox
          </a>{" "}
          ·{" "}
          <a
            href={game.discord}
            target="_blank"
            rel="noopener"
            className="text-primary underline-offset-4 hover:underline"
          >
            Lip Builds Discord
          </a>
        </p>
      </section>
    </article>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-[var(--radius-container)] border rule bg-card p-5">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 font-mono text-2xl font-semibold tabular">{value}</p>
      <p className="mt-0.5 text-xs text-muted-foreground">{sub}</p>
    </div>
  );
}

function Rule({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="rounded-[var(--radius-container)] border rule bg-card p-5">
      <span className="font-mono text-xs font-semibold text-primary tabular">{n}</span>
      <p className="mt-2 font-medium">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground">{body}</p>
    </div>
  );
}

function Source({
  name,
  what,
  note,
}: {
  name: string;
  what: string;
  note: string;
}) {
  return (
    <div className="bg-card p-5">
      <dt className="font-medium">{name}</dt>
      <dd className="mt-1 text-sm text-muted-foreground">{what}</dd>
      <dd className="mt-2 text-xs text-muted-foreground">{note}</dd>
    </div>
  );
}
