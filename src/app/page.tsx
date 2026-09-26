import type { Metadata } from "next";
import Link from "next/link";
import { codes, game, verifiedPets, gaps, LAST_CHECKED, visitsPerFavourite } from "@/data/game";
import { CopyCode } from "@/components/copy-code";
import { AdsterraBanner } from "@/components/adsterra-banner";
import { LEADERBOARD, RECTANGLE } from "@/lib/ads";

export const metadata: Metadata = {
  title: "Pets Universe codes, pet rarities and trading values",
  description:
    "Every working Pets Universe code with its reward, the pets whose rarity is confirmed by the game itself, and an honest map of what is still unpublished. Fan-made, with the source for every number.",
  alternates: { canonical: "/" },
};

const nf = new Intl.NumberFormat("en-US");

export default function HomePage() {
  const topCode = codes[0];

  return (
    <div className="mx-auto w-full max-w-6xl px-5">
      <section className="pt-14 pb-12">
        <p className="text-xs font-medium tracking-wide text-primary uppercase">
          Roblox reference · updated {LAST_CHECKED}
        </p>
        <h1 className="mt-3 max-w-[24ch] text-4xl font-semibold tracking-tight sm:text-5xl">
          Pets Universe, documented honestly
        </h1>
        <p className="mt-5 max-w-[62ch] text-lg text-muted-foreground">
          {game.name} is a pet collector from {game.developer} — hundreds of pets,
          eggs bought with Coins, and trading on by default. This site publishes the
          numbers that exist and shows you a gap where they do not.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href="/codes/"
            className="inline-flex h-10 items-center rounded-[var(--radius-control)] bg-primary px-5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            All {codes.length} working codes
          </Link>
          <Link
            href="/pets/"
            className="inline-flex h-10 items-center rounded-[var(--radius-control)] border rule px-5 text-sm font-medium transition-colors hover:bg-muted"
          >
            The pet roster
          </Link>
          <Link
            href="/values/"
            className="inline-flex h-10 items-center rounded-[var(--radius-control)] border rule px-5 text-sm font-medium transition-colors hover:bg-muted"
          >
            Trading values
          </Link>
        </div>

        {topCode && (
          <div className="mt-8 flex flex-wrap items-center gap-3 rounded-[var(--radius-container)] border rule bg-card p-4">
            <span className="text-sm text-muted-foreground">Newest code:</span>
            <CopyCode code={topCode.code} />
            <span className="text-sm text-muted-foreground">{topCode.reward}</span>
          </div>
        )}
      </section>

      <section className="grid gap-px overflow-hidden rounded-[var(--radius-container)] border rule bg-border sm:grid-cols-2 lg:grid-cols-4">
        <Fact label="Developer" value={game.developer} sub="Roblox group: Lip Builds" />
        <Fact
          label="Visits"
          value={nf.format(game.visits)}
          sub={`${nf.format(game.favorites)} favourites`}
        />
        <Fact
          label="Playing right now"
          value={nf.format(game.ccu)}
          sub={`${visitsPerFavourite} visits per favourite`}
        />
        <Fact label="Last updated" value={game.updated} sub="game patch, not this page" />
      </section>

      {/* Desktop-only leaderboard: 728px overflows phones. */}
      <AdsterraBanner slot={LEADERBOARD} className="mt-10 hidden md:flex" />

      <section className="grid gap-10 py-16 lg:grid-cols-2">
        <div>
          <h2 className="text-sm font-medium">What we have confirmed</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="rounded-[var(--radius-container)] border rule bg-card p-4">
              <p className="font-medium">{codes.length} working codes</p>
              <p className="mt-1 text-muted-foreground">
                Each with its exact reward — Coins, Luck, Hatch, Critical and Rubies
                potions plus fruit.{" "}
                <Link href="/codes/" className="text-primary underline-offset-4 hover:underline">
                  See the list
                </Link>
              </p>
            </li>
            <li className="rounded-[var(--radius-container)] border rule bg-card p-4">
              <p className="font-medium">
                {verifiedPets.length} pet{verifiedPets.length === 1 ? "" : "s"} with a
                confirmed rarity
              </p>
              <p className="mt-1 text-muted-foreground">
                Read off the game&apos;s own promotional artwork — including{" "}
                {verifiedPets.map((p) => p.name).join(", ")}.{" "}
                <Link href="/pets/" className="text-primary underline-offset-4 hover:underline">
                  See the roster
                </Link>
              </p>
            </li>
            <li className="rounded-[var(--radius-container)] border rule bg-card p-4">
              <p className="font-medium">Every system, named</p>
              <p className="mt-1 text-muted-foreground">
                Eggs, Coins, Rubies, potions, fruit, breakables, charms, worlds and
                trading — what each one does and how they connect.{" "}
                <Link href="/guide/" className="text-primary underline-offset-4 hover:underline">
                  Read the guide
                </Link>
              </p>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-medium">What nobody has published yet</h2>
          <p className="mt-4 max-w-[62ch] text-sm text-muted-foreground">
            This game is {game.created.slice(0, 4)}-new and its numbers live in the
            Discord, not on a wiki. We would rather list the gaps than fill them with
            numbers copied from a different pet game:
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {gaps.slice(0, 4).map((g) => (
              <li key={g} className="flex gap-3">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span className="text-muted-foreground">{g}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted-foreground">
            <Link href="/about/" className="text-primary underline-offset-4 hover:underline">
              How we source data, and the full gap list
            </Link>
          </p>
        </div>
      </section>

      <AdsterraBanner slot={RECTANGLE} className="mt-14" />

      <section className="border-t rule py-12">
        <h2 className="text-sm font-medium">Where to go next</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <NavCard
            href="/codes/"
            title="Codes"
            body={`${codes.length} live codes with rewards, plus how to redeem them.`}
          />
          <NavCard
            href="/pets/"
            title="Pets"
            body="The roster so far, and how the rest of the list gets documented."
          />
          <NavCard
            href="/values/"
            title="Values"
            body="How trading values work here, and why no public value list exists yet."
          />
          <NavCard
            href="/tier-list/"
            title="Tier list"
            body="How we rank pets — and the ranking method you can apply yourself today."
          />
        </div>
      </section>
    </div>
  );
}

function Fact({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="bg-card p-5">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 font-mono text-lg font-semibold tabular">{value}</p>
      <p className="mt-0.5 text-xs text-muted-foreground">{sub}</p>
    </div>
  );
}

function NavCard({ href, title, body }: { href: string; title: string; body: string }) {
  return (
    <Link
      href={href}
      className="rounded-[var(--radius-container)] border rule bg-card p-5 transition-colors hover:bg-muted"
    >
      <p className="font-medium">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground">{body}</p>
    </Link>
  );
}
