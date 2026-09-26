import type { Metadata } from "next";
import Link from "next/link";
import { codes, game, redeemSteps, LAST_CHECKED } from "@/data/game";
import { CopyCode } from "@/components/copy-code";
import { FaqJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: `Pets Universe codes (September 2026) — ${codes.length} working codes`,
  description: `All ${codes.length} working Pets Universe codes with the exact reward for each — Coins, Luck, Hatch, Critical and Rubies potions plus fruit — and the steps to redeem them.`,
  alternates: { canonical: "/codes/" },
};

const FAQ = [
  {
    q: "How many working Pets Universe codes are there?",
    a: `There are ${codes.length} codes on this list, all sharing potions and fruit rewards, and every one is confirmed by two independent listings.  Codes come from the developers and from content creators, so names like Russo, Ostrichh and DroverQ are creator codes rather than milestone codes.`,
  },
  {
    q: "Why is my Pets Universe code not working?",
    a: "Codes are case-sensitive — copy them with the button rather than retyping, since a lowercase letter where an uppercase one belongs is the most common failure. A code that still fails has usually been retired; the list here is re-checked against live sources and expired codes are removed rather than left to waste your time.",
  },
  {
    q: "What do Pets Universe codes give you?",
    a: "Potions and fruit: Coins, Luck, Hatch, Critical and Rubies potions, plus Apples, Bananas, Blueberries, Kiwis and Mangos. Luck and Hatch potions are the ones that matter for hatching — the fruit is consumed during hatching runs.",
  },
  {
    q: "Where do you redeem Pets Universe codes?",
    a: "In game: open the codes menu next to the shop, paste the code and press Redeem. The reward lands in your inventory immediately.",
  },
  {
    q: "Does this game have an 800M-visits milestone code?",
    a: `No milestone codes are published yet — the game is young (created ${game.created}) and every code we can verify is either a creator code or an update code. If a milestone code drops it gets added here on the same day.`,
  },
];

export default function CodesPage() {
  return (
    <article className="mx-auto w-full max-w-6xl px-5">
      <FaqJsonLd items={FAQ} />

      <nav className="pt-8 text-sm text-muted-foreground" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <span className="px-2 text-border" aria-hidden="true">
          /
        </span>
        <span className="text-foreground">Codes</span>
      </nav>

      <header className="pt-6 pb-10">
        <h1 className="max-w-[22ch] text-3xl font-semibold tracking-tight sm:text-4xl">
          Pets Universe codes
        </h1>
        <p className="mt-4 max-w-[62ch] text-muted-foreground">
          {codes.length} codes, each with the reward it actually pays out. Every code
          here comes from a live listing we checked on {LAST_CHECKED} — none are
          carried over from a stale list, and none are invented.
        </p>
      </header>

      <section>
        <div className="overflow-hidden rounded-[var(--radius-container)] border rule">
          <div className="grid grid-cols-[1fr_auto] gap-4 border-b rule bg-muted/60 px-5 py-3 text-xs font-medium text-muted-foreground sm:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)_auto]">
            <span>Code</span>
            <span className="hidden sm:block">Reward</span>
            <span className="sr-only sm:not-sr-only">Copy</span>
          </div>
          <ul>
            {codes.map((c) => (
              <li
                key={c.code}
                className="grid grid-cols-[1fr_auto] items-center gap-4 border-b rule bg-card px-5 py-4 last:border-b-0 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)_auto]"
              >
                <code className="font-mono text-sm font-semibold break-all">{c.code}</code>
                <span className="col-span-2 text-sm text-muted-foreground sm:col-span-1">
                  {c.reward}
                </span>
                <CopyCode code={c.code} />
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-4 max-w-[62ch] text-sm text-muted-foreground">
          Sourcing note: every code on this page is confirmed by{" "}
          <strong className="font-medium text-foreground">
            two independent listings
          </strong>{" "}
          with matching rewards, which is the threshold this site publishes at. Codes
          retire without warning in this genre, so the list is re-checked rather than
          trusted — anything that stops matching gets pulled.
        </p>
      </section>

      <section className="border-t rule mt-14 py-12">
        <h2 className="text-sm font-medium">How to redeem a code</h2>
        <ol className="mt-5 grid gap-4 sm:grid-cols-2">
          {redeemSteps.map((step, i) => (
            <li
              key={step}
              className="flex gap-4 rounded-[var(--radius-container)] border rule bg-card p-5"
            >
              <span className="font-mono text-sm font-semibold text-primary tabular">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-sm text-muted-foreground">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-t rule py-12">
        <h2 className="text-sm font-medium">Questions</h2>
        <dl className="mt-5 divide-y rule">
          {FAQ.map((f) => (
            <div key={f.q} className="py-5">
              <dt className="font-medium">{f.q}</dt>
              <dd className="mt-2 max-w-[70ch] text-sm text-muted-foreground">{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="border-t rule py-10">
        <p className="text-sm text-muted-foreground">
          Codes pay in potions — Luck and Hatch potions tilt egg odds, which is the
          first thing you want before chasing a rare pet.{" "}
          <Link href="/pets/" className="text-primary underline-offset-4 hover:underline">
            See the confirmed pet roster
          </Link>{" "}
          or{" "}
          <Link href="/values/" className="text-primary underline-offset-4 hover:underline">
            how trading values work here
          </Link>
          .
        </p>
      </section>
    </article>
  );
}
