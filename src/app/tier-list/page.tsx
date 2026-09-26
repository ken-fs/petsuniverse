import type { Metadata } from "next";
import Link from "next/link";
import { pets, verifiedPets, LAST_CHECKED } from "@/data/game";

export const metadata: Metadata = {
  title: "Pets Universe tier list — the ranking method, and what is ranked so far",
  description:
    "Why a Pets Universe tier list cannot be honest yet, the ranking method we will use, and the one pet whose rarity the game has actually published.",
  alternates: { canonical: "/tier-list/" },
};

export default function TierListPage() {
  const named = pets.filter((p) => !p.verified);

  return (
    <article className="mx-auto w-full max-w-6xl px-5">
      <nav className="pt-8 text-sm text-muted-foreground" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <span className="px-2 text-border" aria-hidden="true">
          /
        </span>
        <span className="text-foreground">Tier list</span>
      </nav>

      <header className="pt-6 pb-10">
        <h1 className="max-w-[26ch] text-3xl font-semibold tracking-tight sm:text-4xl">
          Pets Universe tier list
        </h1>
        <p className="mt-4 max-w-[62ch] text-muted-foreground">
          A tier list is a claim about relative value, and relative value needs two
          numbers: how rare a pet is, and what people will trade for it. For{" "}
          {pets.length - verifiedPets.length} of the {pets.length} pets we track, neither
          number is published. So this page ranks what can be ranked, states the method
          it will use for the rest, and does not pretend a guess is a ranking.
        </p>
        <p className="mt-3 text-sm text-muted-foreground">Last source pass: {LAST_CHECKED}</p>
      </header>

      <section>
        <h2 className="text-sm font-medium">Ranked today</h2>
        <p className="mt-3 max-w-[62ch] text-sm text-muted-foreground">
          One entry — the only pet with a rarity the developers have printed.
        </p>
        <div className="mt-5 overflow-hidden rounded-[var(--radius-container)] border rule">
          <ul>
            {verifiedPets.map((p) => (
              <li
                key={p.slug}
                className="flex flex-wrap items-center justify-between gap-4 border-b rule bg-card px-5 py-5 last:border-b-0"
              >
                <div className="flex items-center gap-4">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-control)] bg-primary font-mono text-sm font-semibold text-primary-foreground">
                    S
                  </span>
                  <div>
                    <Link
                      href={`/pets/${p.slug}/`}
                      className="font-medium text-primary underline-offset-4 hover:underline"
                    >
                      {p.name}
                    </Link>
                    <p className="text-xs text-muted-foreground">
                      {p.rarity} · developer-published odds
                    </p>
                  </div>
                </div>
                <span className="font-mono text-sm tabular">{p.oddsText}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-4 max-w-[62ch] text-sm text-muted-foreground">
          &ldquo;S&rdquo; here means <em>top of the published ladder</em>, nothing more.
          With one confirmed rarity there is no distribution to rank against — a single
          point is not a curve.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-sm font-medium">Unranked — known by name only</h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {named.map((p) => (
            <li
              key={p.slug}
              className="rounded-[var(--radius-container)] border rule bg-card p-5"
            >
              <Link
                href={`/pets/${p.slug}/`}
                className="font-medium hover:text-primary"
              >
                {p.name}
              </Link>
              <p className="mt-1 text-xs text-muted-foreground">
                Rarity, odds and value unpublished
              </p>
            </li>
          ))}
          <li className="rounded-[var(--radius-container)] border rule border-dashed p-5">
            <p className="font-medium text-muted-foreground">+ hundreds more</p>
            <p className="mt-1 text-xs text-muted-foreground">
              The game advertises hundreds of pets and publishes no index of them.
            </p>
          </li>
        </ul>
      </section>

      <section className="border-t rule mt-14 py-12">
        <h2 className="text-sm font-medium">The method that will rank them</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Rule
            n="01"
            title="Hatch odds set the floor"
            body="A pet at 1 in 1,000,000 cannot be common. Published odds are the only objective input a tier list gets, and they come first."
          />
          <Rule
            n="02"
            title="Demand moves it"
            body="Rarity is necessary, not sufficient. A rare pet nobody wants trades below a common pet everyone does — so trades, not odds, decide the top of the list."
          />
          <Rule
            n="03"
            title="Utility breaks ties"
            body="Where two pets share a rarity and similar demand, the one that does something useful in play wins the tie."
          />
          <Rule
            n="04"
            title="No data, no rank"
            body="Pets without a published rarity stay unranked. A tier list padded with guesses is worse than a short honest one."
          />
        </div>
      </section>

      <section className="border-t rule py-12">
        <h2 className="text-sm font-medium">What unlocks a real tier list</h2>
        <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
          <li className="flex gap-3">
            <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            <span>
              The in-game pet index, read out — it lists names and rarities, which turns
              the unranked block above into real rows.
            </span>
          </li>
          <li className="flex gap-3">
            <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            <span>
              Two independent traders agreeing on brackets — that is the threshold this
              site publishes values at.
            </span>
          </li>
          <li className="flex gap-3">
            <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            <span>
              Any developer post that prints odds for a pet that is not already here.
            </span>
          </li>
        </ul>
        <p className="mt-6 text-sm text-muted-foreground">
          In the meantime, the four-step method on{" "}
          <Link href="/values/" className="text-primary underline-offset-4 hover:underline">
            the values page
          </Link>{" "}
          lets you price a specific trade without waiting for this list.
        </p>
      </section>
    </article>
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
