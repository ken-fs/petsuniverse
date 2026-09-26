import type { Metadata } from "next";
import Link from "next/link";
import { game, pets, verifiedPets, LAST_CHECKED } from "@/data/game";
import { FaqJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Pets Universe trading values — how pricing works here",
  description:
    "How Pets Universe trading values get set, why no public value list exists yet, and a method you can use to price a trade yourself instead of trusting a number.",
  alternates: { canonical: "/values/" },
};

const FAQ = [
  {
    q: "Is there a Pets Universe value list?",
    a: "Not one we can verify. The game has trading switched on and a Discord where trades are negotiated, but no site publishes a corroborated value list the way Pet Simulator's community does. Any list you find today is either a single trader's opinion or copied from a different pet game.",
  },
  {
    q: "How are pet values decided in Pets Universe?",
    a: "The same way they are decided in every trading game: hatch odds set the floor, and demand sets the price. A pet that is rare but ugly trades below a pet that is common but wanted. With odds unpublished for most pets, the community price is the only signal that exists.",
  },
  {
    q: "Why doesn't this site publish values yet?",
    a: "Because a value needs more than one trade behind it. A single trade is an anecdote; two independent traders agreeing on a bracket is a price. We publish the bracket when we have it, and we show the gap until then.",
  },
  {
    q: "What is the rarest pet in Pets Universe?",
    a: `The only rarity the game itself has published is ${verifiedPets[0]?.name ?? "Pop Cat"} at ${verifiedPets[0]?.oddsText ?? "1 in 1,000,000"} (${verifiedPets[0]?.rarity ?? "Exclusive"}). The game's artwork also shows 1 in 10m and 1/999m labels without making clear which pet owns them, so we do not rank those.`,
  },
];

export default function ValuesPage() {
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
        <span className="text-foreground">Values</span>
      </nav>

      <header className="pt-6 pb-10">
        <h1 className="max-w-[24ch] text-3xl font-semibold tracking-tight sm:text-4xl">
          Pets Universe trading values
        </h1>
        <p className="mt-4 max-w-[62ch] text-muted-foreground">
          {game.name} ships with trading on — the game&apos;s own title carries the{" "}
          <code className="font-mono text-sm">[TRADES]</code> tag — and a Discord where
          trades get negotiated. What it does not have is a value list. This page
          explains why, and gives you a method you can use today instead of trusting a
          number someone made up.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-[var(--radius-container)] border rule bg-card p-5">
          <h2 className="text-sm font-medium">What exists right now</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>· Trading is enabled in game.</li>
            <li>· The Lip Builds Discord is where trades are arranged.</li>
            <li>· Hatch odds are published for exactly {verifiedPets.length} pet.</li>
            <li>· No site publishes a corroborated value list.</li>
          </ul>
        </div>
        <div className="rounded-[var(--radius-container)] border rule bg-card p-5">
          <h2 className="text-sm font-medium">What that means for you</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Without published odds, price is set by whoever is in the trade. That
            favours the player who knows the pet. Use the method below before you
            accept anything, and treat every quoted value as one trader&apos;s opinion
            until a second trader agrees.
          </p>
        </div>
      </section>

      <section className="border-t rule mt-14 py-12">
        <h2 className="text-sm font-medium">Price a trade yourself, in four steps</h2>
        <ol className="mt-5 grid gap-4 lg:grid-cols-2">
          <Step
            n="01"
            title="Find the rarity, not the price"
            body="Rarity is the only hard number in the trade. If the pet's rarity is published (start on the roster page), it anchors everything. If it is not published, that is your first red flag — and it is worth asking the other trader why they are confident about the price of a pet whose odds nobody has printed."
          />
          <Step
            n="02"
            title="Check what the pet is worth to you"
            body="Value in this genre is demand, not just scarcity. A common pet that finishes a collection trades above a rarer one nobody wants. Decide what you would pay before the trade window opens, because that is the number you cannot renegotiate once you are in it."
          />
          <Step
            n="03"
            title="Get a second opinion, in public"
            body="Post the offer in the Discord and ask what it is worth. Two independent answers that agree is a bracket you can trust; one confident answer is not. This is the step that replaces the value list this game does not have."
          />
          <Step
            n="04"
            title="Write down what you actually got"
            body="Your own trade log becomes the most reliable value list available to you — it is the one nobody can fake. It is also how the community list eventually gets built."
          />
        </ol>
      </section>

      <section className="border-t rule py-12">
        <h2 className="text-sm font-medium">The one rarity the game has published</h2>
        <div className="mt-5 overflow-hidden rounded-[var(--radius-container)] border rule">
          <ul>
            {verifiedPets.map((p) => (
              <li
                key={p.slug}
                className="flex flex-wrap items-center justify-between gap-3 border-b rule bg-card px-5 py-4 last:border-b-0"
              >
                <div>
                  <Link
                    href={`/pets/${p.slug}/`}
                    className="font-medium text-primary underline-offset-4 hover:underline"
                  >
                    {p.name}
                  </Link>
                  <p className="text-xs text-muted-foreground">
                    {p.rarity} · printed on the game&apos;s own artwork
                  </p>
                </div>
                <span className="font-mono text-sm tabular">{p.oddsText}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-4 max-w-[62ch] text-sm text-muted-foreground">
          The game&apos;s artwork also shows <code className="font-mono text-xs">1 in 10m</code> and{" "}
          <code className="font-mono text-xs">1/999m</code> labels without saying which
          pet they belong to. We do not guess. When those labels get attached to names,
          the ladder below them fills in.
        </p>
      </section>

      <section className="border-t rule py-12">
        <h2 className="text-sm font-medium">What gets published here, and when</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <Rule title="Two sources, or a gap" body="A value appears only when two independent traders or listings agree on the same bracket. Until then the field says not published." />
          <Rule title="Official numbers beat community ones" body="Anything the developers print — odds, rarity tiers, egg contents — is used as-is and labelled as the developer's number." />
          <Rule title="Dated, always" body="Every value carries the date it was last checked. A value without a date is a rumour with a font." />
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          Last source pass: {LAST_CHECKED} · {pets.length} pets tracked.{" "}
          <Link href="/about/" className="text-primary underline-offset-4 hover:underline">
            How this site sources data
          </Link>
        </p>
      </section>
    </article>
  );
}

function Step({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <li className="rounded-[var(--radius-container)] border rule bg-card p-5">
      <span className="font-mono text-xs font-semibold text-primary tabular">{n}</span>
      <p className="mt-2 font-medium">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground">{body}</p>
    </li>
  );
}

function Rule({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-[var(--radius-container)] border rule bg-card p-5">
      <p className="font-medium">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground">{body}</p>
    </div>
  );
}
