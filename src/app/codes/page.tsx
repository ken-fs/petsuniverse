import type { Metadata } from "next";
import Link from "next/link";
import { codes, game, redeemSteps, LAST_CHECKED } from "@/data/game";
import { CopyCode } from "@/components/copy-code";
import { FaqJsonLd } from "@/components/json-ld";
import { AdsterraBanner } from "@/components/adsterra-banner";
import { LEADERBOARD, RECTANGLE } from "@/lib/ads";

export const metadata: Metadata = {
  title: `Pets Universe codes (October 2026) — ${codes.length} working codes`,
  description: `All ${codes.length} working Pets Universe codes for Roblox, with the exact reward for each: Coins, Luck, Hatch, Critical and Rubies potions plus fruit. Checked ${LAST_CHECKED}.`,
  alternates: { canonical: "/codes/" },
};

// Codes listed by two or more independent sources vs. only one. The page says
// which is which instead of claiming every code is double-sourced.
const twoSource = codes.filter((c) => c.sources >= 2);
const oneSource = codes.filter((c) => c.sources < 2);
const oneSourceText = oneSource.map((c) => c.code).join(", ");

const FAQ = [
  {
    q: "How many working Pets Universe codes are there?",
    a: `There are ${codes.length} working codes right now. All of them pay out potions and fruit. ${twoSource.length} are listed by two or more independent sources${oneSource.length ? `, and ${oneSourceText} is listed by one (the official wiki)` : ""}. Some come with game updates, and some are creator codes named after YouTubers, like Russo, Ostrichh and DroverQ.`,
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
    q: "Are Pet Universe codes the same as Pets Universe codes?",
    a: "Yes, if you mean the Roblox pet game by Lip Builds. Its Roblox name is \"Pets Universe!\" (right now with a pumpkin emoji in front for Halloween). People search it as Pet Universe, Pets Universe and Pets Universe!, but it's one game and one code list. If your game is by a different creator, these codes won't work in it.",
  },
  {
    q: "Where do you redeem Pets Universe codes?",
    a: "In game: open the codes menu next to the shop, paste the code and press Redeem. The reward lands in your inventory immediately.",
  },
  {
    q: "Does this game have milestone codes?",
    a: `Yes — 1mvisits is a milestone code that went live when the game passed one million visits, and the update codes (Update4, Update2, Update1) ship with the game's patches. Milestone and update codes sit alongside creator codes like Russo, Ostrichh and DroverQ.`,
  },
];

// Source: official wiki code template (petsuniverse.miraheze.org/wiki/Template:Codes),
// cross-checked Oct 12, 2026. The wiki's per-wave dates + statuses are the
// authority here; aggregators lag it by days on expiries.
const UPDATE_WAVES = [
  { wave: "Update 4", arrived: "Oct 9", codes: ["Update4"], status: "working" },
  { wave: "Update 3", arrived: "Oct 2", codes: ["Update3"], status: "expired" },
  { wave: "Update 2", arrived: "Sep 25", codes: ["Update2"], status: "expired" },
  { wave: "Update 1", arrived: "Sep 18", codes: ["Update1"], status: "expired" },
  { wave: "Mini update", arrived: "Sep 15", codes: ["MiniUpdate"], status: "expired" },
  { wave: "Release", arrived: "Sep 12", codes: ["Release"], status: "expired" },
] as const;

export default function CodesPage() {
  const latestWave = UPDATE_WAVES.find((w) => w.status === "working") ?? UPDATE_WAVES[0];

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
          Pets Universe has {codes.length} working codes right now. The newest is{" "}
          <code className="font-mono text-sm font-semibold">{latestWave.codes[0]}</code>,
          which came with {latestWave.wave} on {latestWave.arrived}. Copy one below,
          then redeem it in the shop&apos;s codes section.
        </p>
        <p className="mt-3 max-w-[62ch] text-muted-foreground">
          Searching for &quot;Pet Universe codes&quot; or &quot;Pets Universe! codes&quot;?
          It&apos;s the same Roblox game by {game.developer}, so it&apos;s the same list.
          We checked every code against live sources on {LAST_CHECKED}. Nothing here
          is carried over from an old list or made up.
        </p>
      </header>

      {/* Highest-intent page on the site: codes are why people land here. */}
      <AdsterraBanner slot={LEADERBOARD} className="mb-10 hidden md:flex" />

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
          Sourcing note: {twoSource.length} of these codes are listed by{" "}
          <strong className="font-medium text-foreground">
            two or more independent sources
          </strong>{" "}
          with matching rewards.
          {oneSource.length > 0 && (
            <>
              {" "}
              {oneSourceText} is listed only by the official wiki, so treat it as
              less certain.
            </>
          )}{" "}
          Codes can retire without warning, so we re-check the list instead of
          trusting it.
        </p>
      </section>

      <AdsterraBanner slot={RECTANGLE} className="mt-14" />

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
        <h2 className="text-sm font-medium">Codes by update — the full history</h2>
        <p className="mt-3 max-w-[62ch] text-sm text-muted-foreground">
          Pets Universe retires the previous update code every time a patch ships,
          so the wave a code arrived in tells you how long it is likely to live.
          Statuses below follow the official wiki&apos;s code template; aggregator
          lists lag this by days.
        </p>
        <div className="mt-5 overflow-hidden rounded-[var(--radius-container)] border rule">
          <div className="grid grid-cols-[7rem_1fr_auto] gap-4 border-b rule bg-muted/60 px-5 py-3 text-xs font-medium text-muted-foreground sm:grid-cols-[8rem_7rem_1fr_auto]">
            <span>Wave</span>
            <span className="hidden sm:block">Arrived</span>
            <span>Codes</span>
            <span>Status</span>
          </div>
          <ul>
            {UPDATE_WAVES.map((w) => (
              <li
                key={w.wave}
                className="grid grid-cols-[7rem_1fr_auto] items-center gap-4 border-b rule bg-card px-5 py-3.5 text-sm last:border-b-0 sm:grid-cols-[8rem_7rem_1fr_auto]"
              >
                <span className="font-medium">{w.wave}</span>
                <span className="hidden text-muted-foreground sm:block">{w.arrived}</span>
                <span>
                  {w.codes.map((c, i) => (
                    <span key={c}>
                      {i > 0 && ", "}
                      <code
                        className={`font-mono text-xs ${
                          w.status === "working"
                            ? "font-semibold"
                            : "line-through opacity-60"
                        }`}
                      >
                        {c}
                      </code>
                    </span>
                  ))}
                </span>
                <span
                  className={`text-xs ${
                    w.status === "working"
                      ? "font-medium text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {w.status === "working" ? "Working" : "Expired"}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-4 max-w-[62ch] text-sm text-muted-foreground">
          <strong className="font-medium text-foreground">Why Update1 and Update2 left the working list:</strong>{" "}
          two aggregators still carry them, but the official wiki marked both
          expired — Update1 when Update2 shipped, Update2 when Update3 shipped.
          That retirement pattern has held for every wave so far (MiniUpdate and
          Release died the same way), so this page follows the official record.
          Trying a dead code costs nothing but a paste; the game just rejects it.
        </p>
        <p className="mt-3 max-w-[62ch] text-sm text-muted-foreground">
          Beside the update waves sit <strong className="font-medium text-foreground">creator codes</strong>{" "}
          — Russo, Ostrichh, DroverQ, Smidl155, E11opoppet, Olopomidoro, Cupcake,
          AG64 and DarkRose, named after the YouTubers they were issued to — and
          the <code className="font-mono text-xs">1mvisits</code> milestone code
          from when the game passed one million visits. Creator codes do not
          follow the update retirement pattern.
        </p>
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
