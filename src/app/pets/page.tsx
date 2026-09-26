import type { Metadata } from "next";
import Link from "next/link";
import { pets, game, LAST_CHECKED } from "@/data/game";
import { PetListJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Pets Universe pets — confirmed roster and rarities",
  description:
    "The Pets Universe pets with a rarity confirmed by the game itself, the ones known by name only, and how the full list gets documented. No invented odds.",
  alternates: { canonical: "/pets/" },
};

export default function PetsPage() {
  const confirmed = pets.filter((p) => p.verified);
  const named = pets.filter((p) => !p.verified);

  return (
    <article className="mx-auto w-full max-w-6xl px-5">
      <PetListJsonLd pets={pets} />

      <nav className="pt-8 text-sm text-muted-foreground" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <span className="px-2 text-border" aria-hidden="true">
          /
        </span>
        <span className="text-foreground">Pets</span>
      </nav>

      <header className="pt-6 pb-10">
        <h1 className="max-w-[22ch] text-3xl font-semibold tracking-tight sm:text-4xl">
          The Pets Universe roster
        </h1>
        <p className="mt-4 max-w-[62ch] text-muted-foreground">
          {game.name} advertises <strong className="font-medium text-foreground">hundreds of unique pets</strong>{" "}
          and publishes no index of them — no Fandom, no in-game list you can read
          outside the game. So this page does two things: it records every pet whose
          name or rarity can be traced to a real source, and it tells you plainly
          which numbers are still missing.
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          Last source pass: {LAST_CHECKED} · {confirmed.length} pet
          {confirmed.length === 1 ? "" : "s"} with a confirmed rarity · {named.length}{" "}
          known by name only
        </p>
      </header>

      <section>
        <h2 className="text-sm font-medium">Confirmed by the game&apos;s own artwork</h2>
        <div className="mt-5 overflow-hidden rounded-[var(--radius-container)] border rule">
          <div className="hidden grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] gap-4 border-b rule bg-muted/60 px-5 py-3 text-xs font-medium text-muted-foreground sm:grid">
            <span>Pet</span>
            <span>Rarity</span>
            <span>Hatch odds</span>
            <span>Trade value</span>
          </div>
          <ul>
            {confirmed.map((p) => (
              <li
                key={p.slug}
                className="grid gap-2 border-b rule bg-card px-5 py-4 last:border-b-0 sm:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] sm:gap-4 sm:items-center"
              >
                <Link
                  href={`/pets/${p.slug}/`}
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  {p.name}
                </Link>
                <span className="text-sm">{p.rarity}</span>
                <span className="font-mono text-sm tabular">{p.oddsText}</span>
                <span className="text-sm text-muted-foreground">not published</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-sm font-medium">Known by name, nothing else</h2>
        <p className="mt-3 max-w-[62ch] text-sm text-muted-foreground">
          These pets appear in the game&apos;s promotional artwork. Their names are
          real; their rarity, odds and value are not published anywhere we can check,
          so we leave the fields empty rather than copy numbers from another pet game.
        </p>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {named.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/pets/${p.slug}/`}
                className="block rounded-[var(--radius-container)] border rule bg-card p-5 transition-colors hover:bg-muted"
              >
                <p className="font-medium">{p.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Rarity, odds and value: not published
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t rule mt-14 py-12">
        <h2 className="text-sm font-medium">How this list grows</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <Step
            n="01"
            title="Game artwork"
            body="Promotional images are the only place the developers print rarity and odds. Every name here traces back to one."
          />
          <Step
            n="02"
            title="In-game index"
            body="The pet index inside the game lists names and rarities as you unlock them. That is the fastest complete source, and it needs a player to read it out."
          />
          <Step
            n="03"
            title="Community"
            body="Trades and value checks happen in the Lip Builds Discord. Values get published here only once they are corroborated, never from a single trade."
          />
        </div>
        <p className="mt-6 max-w-[62ch] text-sm text-muted-foreground">
          The moment a pet&apos;s rarity and odds are confirmed, its row fills in and it
          gets a full page — the same one-page-per-pet structure this site is built
          around.{" "}
          <Link href="/values/" className="text-primary underline-offset-4 hover:underline">
            How trading values work here
          </Link>
          .
        </p>
      </section>
    </article>
  );
}

function Step({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="rounded-[var(--radius-container)] border rule bg-card p-5">
      <span className="font-mono text-xs font-semibold text-primary tabular">{n}</span>
      <p className="mt-2 font-medium">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground">{body}</p>
    </div>
  );
}
