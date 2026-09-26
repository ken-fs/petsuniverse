import type { Metadata } from "next";
import Link from "next/link";
import { game, systems, codes, LAST_CHECKED } from "@/data/game";

export const metadata: Metadata = {
  title: "Pets Universe beginner guide — the loop, the systems, the first hour",
  description:
    "How Pets Universe actually plays: farm Coins, buy eggs, hatch pets, trade them. Every system explained — potions, fruit, breakables, charms, mastery badges and worlds.",
  alternates: { canonical: "/guide/" },
};

export default function GuidePage() {
  return (
    <article className="mx-auto w-full max-w-6xl px-5">
      <nav className="pt-8 text-sm text-muted-foreground" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <span className="px-2 text-border" aria-hidden="true">
          /
        </span>
        <span className="text-foreground">Guide</span>
      </nav>

      <header className="pt-6 pb-10">
        <h1 className="max-w-[24ch] text-3xl font-semibold tracking-tight sm:text-4xl">
          How Pets Universe actually plays
        </h1>
        <p className="mt-4 max-w-[62ch] text-muted-foreground">
          {game.name} is a collecting loop with a trading layer on top: you farm Coins,
          buy eggs, hatch pets, and trade the ones you do not want. Everything below is
          the game&apos;s own description of its systems, in the order you meet them.
        </p>
        <p className="mt-3 text-sm text-muted-foreground">Last source pass: {LAST_CHECKED}</p>
      </header>

      <section className="grid gap-4 sm:grid-cols-3">
        <Loop n="01" title="Farm Coins" body="Breakables around the map drop Coins. This is the engine — every egg you buy comes out of this." />
        <Loop n="02" title="Buy and hatch eggs" body="Coins go into eggs. The Fantasy World line carries exclusive eggs on top of the standard set." />
        <Loop n="03" title="Trade what you do not keep" body="Trading is on by default, which is why the pet's rarity matters more here than its looks." />
      </section>

      <section className="border-t rule mt-14 py-12">
        <h2 className="text-sm font-medium">Start here: {codes.length} free codes</h2>
        <p className="mt-3 max-w-[62ch] text-sm text-muted-foreground">
          Before you grind anything, redeem the codes. They pay in Luck and Hatch
          potions — the two items that change your egg odds — plus fruit to burn during
          hatching runs. It is free progress, and it takes two minutes.
        </p>
        <Link
          href="/codes/"
          className="mt-4 inline-flex h-10 items-center rounded-[var(--radius-control)] bg-primary px-5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          All {codes.length} working codes
        </Link>
      </section>

      <section className="border-t rule py-12">
        <h2 className="text-sm font-medium">Every system, in plain terms</h2>
        <dl className="mt-5 grid gap-px overflow-hidden rounded-[var(--radius-container)] border rule bg-border sm:grid-cols-2">
          {systems.map((s) => (
            <div key={s.name} className="bg-card p-5">
              <dt className="font-medium">{s.name}</dt>
              <dd className="mt-1 text-sm text-muted-foreground">{s.detail}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="border-t rule py-12">
        <h2 className="text-sm font-medium">The mastery badges, and why they matter</h2>
        <p className="mt-3 max-w-[62ch] text-sm text-muted-foreground">
          The game exposes five badges — Fruits, Eggs, Playtime, Breakables and Potions.
          They are worth knowing about for a boring reason that turns out to be useful:
          they are the <em>only</em> statistics the game publishes publicly. Every other
          number — pet odds, egg contents, trade values — has to come from players. If
          you are trying to work out how far into the game a friend is, those badges are
          the answer.
        </p>
        <div className="mt-5 overflow-hidden rounded-[var(--radius-container)] border rule">
          <ul>
            {[
              ["Welcome", "Join the game", "251,000+ players have it"],
              ["Fruits Mastery", "Tracked by fruit consumed", "A hatching-run counter"],
              ["Eggs Mastery", "Tracked by eggs opened", "The main progression stat"],
              ["Breakables Mastery", "Tracked by objects broken", "Your Coin-farming volume"],
              ["Potions Mastery", "Tracked by potions used", "How hard you tilt the odds"],
              ["Playtime Mastery", "Tracked by hours played", "Long-run commitment"],
            ].map(([name, what, note]) => (
              <li
                key={name}
                className="grid gap-1 border-b rule bg-card px-5 py-4 last:border-b-0 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)_minmax(0,1.2fr)] sm:items-center sm:gap-4"
              >
                <span className="font-medium">{name}</span>
                <span className="text-sm text-muted-foreground">{what}</span>
                <span className="text-xs text-muted-foreground">{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t rule py-12">
        <h2 className="text-sm font-medium">Premium, groups and the small multipliers</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-[var(--radius-container)] border rule bg-card p-5">
            <p className="font-medium">Premium</p>
            <p className="mt-1 text-sm text-muted-foreground">
              +10% Coins and Rubies while subscribed. It is a farming multiplier, not a
              content unlock — nothing is gated behind it.
            </p>
          </div>
          <div className="rounded-[var(--radius-container)] border rule bg-card p-5">
            <p className="font-medium">The Lip Builds group</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Joining the developer&apos;s group unlocks bonus rewards. It costs nothing
              and it is the first thing to do after redeeming codes.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t rule py-12">
        <h2 className="text-sm font-medium">Where to go next</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <NavCard href="/pets/" title="Pet roster" body="Every pet whose name or rarity we can trace to a source." />
          <NavCard href="/values/" title="Values" body="How to price a trade when no value list exists." />
          <NavCard href="/tier-list/" title="Tier list" body="The ranking method, and what is ranked so far." />
          <NavCard href="/about/" title="Sourcing" body="Where every number comes from — and what is missing." />
        </div>
      </section>
    </article>
  );
}

function Loop({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="rounded-[var(--radius-container)] border rule bg-card p-5">
      <span className="font-mono text-xs font-semibold text-primary tabular">{n}</span>
      <p className="mt-2 font-medium">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground">{body}</p>
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
