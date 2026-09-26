import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pets, codes, game, type Pet } from "@/data/game";
import { CopyCode } from "@/components/copy-code";

export function generateStaticParams() {
  return pets.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/pets/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const pet = pets.find((x) => x.slug === slug);
  if (!pet) return {};
  const title = pet.verified
    ? `${pet.name} in Pets Universe: ${pet.rarity}, ${pet.oddsText}`
    : `${pet.name} in Pets Universe: rarity not published`;
  return {
    title,
    description: pet.verified
      ? `${pet.name} is an ${pet.rarity} pet in Pets Universe, printed at ${pet.oddsText} on the game's own artwork. What that means for hatching and trading.`
      : `${pet.name} appears in Pets Universe, but no source we could verify publishes its rarity, hatch odds or trade value. Here is what that means and how to check in game.`,
    alternates: { canonical: `/pets/${pet.slug}/` },
  };
}

export default async function PetPage({ params }: PageProps<"/pets/[slug]">) {
  const { slug } = await params;
  const pet = pets.find((p) => p.slug === slug);
  if (!pet) notFound();

  const others = pets.filter((p) => p.slug !== pet.slug);
  const newestCode = codes[0];

  return (
    <article className="mx-auto w-full max-w-6xl px-5">
      <nav className="pt-8 text-sm text-muted-foreground" aria-label="Breadcrumb">
        <Link href="/pets/" className="hover:text-foreground">
          Pets
        </Link>
        <span className="px-2 text-border" aria-hidden="true">
          /
        </span>
        <span className="text-foreground">{pet.name}</span>
      </nav>

      <header className="pt-6 pb-10">
        <div className="flex flex-wrap items-center gap-3">
          <StatusChip pet={pet} />
        </div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          {pet.name}
        </h1>
        <p className="mt-4 max-w-[62ch] text-muted-foreground">
          {pet.verified ? (
            <>
              {pet.name} is confirmed as an <strong className="font-medium text-foreground">{pet.rarity}</strong> pet
              in {game.name}, at <strong className="font-medium text-foreground">{pet.oddsText}</strong> hatch
              odds. The number is printed on the game&apos;s own promotional artwork, which
              makes it the strongest kind of source this site accepts — the developer
              published it.
            </>
          ) : (
            <>
              {pet.name} is a real {game.name} pet, but no source we could verify
              publishes its rarity, hatch odds or trade value. That is a gap in the
              public record, not an oversight on this page.
            </>
          )}
        </p>
      </header>

      <div className="grid gap-10 pb-16 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <h2 className="text-sm font-medium">What is confirmed</h2>
          <dl className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-container)] border rule bg-border sm:grid-cols-3">
            <Stat label="Rarity" value={pet.rarity ?? "not published"} />
            <Stat label="Hatch odds" value={pet.oddsText ?? "not published"} />
            <Stat label="Trade value" value={pet.valueText ?? "not published"} />
          </dl>

          <h2 className="mt-12 text-sm font-medium">Where the name comes from</h2>
          <p className="mt-3 max-w-[62ch] text-sm text-muted-foreground">
            {pet.source.charAt(0).toUpperCase() + pet.source.slice(1)}. If you can
            confirm anything further — a rarity, an egg, a trade value — the Discord
            below is where the game&apos;s own community keeps those numbers, and it is
            the first place we check.
          </p>

          {pet.verified && (
            <>
              <h2 className="mt-12 text-sm font-medium">What that odds number means</h2>
              <p className="mt-3 max-w-[62ch] text-sm text-muted-foreground">
                At {pet.oddsText}, {pet.name} is a long-tail hatch rather than a
                grind target: you do not accumulate your way to it, you tilt the odds
                and run eggs. Luck and Hatch potions are the two levers — both come out
                of codes, which is why the codes page matters more here than in a game
                where codes only pay cash.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-3 rounded-[var(--radius-container)] border rule bg-card p-4">
                <span className="text-sm text-muted-foreground">
                  Luck potion source — newest code:
                </span>
                {newestCode && <CopyCode code={newestCode.code} />}
                <Link
                  href="/codes/"
                  className="text-sm text-primary underline-offset-4 hover:underline"
                >
                  All {codes.length} codes
                </Link>
              </div>
            </>
          )}
        </div>

        <aside className="space-y-8">
          <div className="rounded-[var(--radius-container)] border rule bg-card p-5">
            <h2 className="text-sm font-medium">Trading it</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {pet.verified
                ? `${pet.name} is exclusive-tier, which is the bracket where trades are negotiated rather than listed. No public value list exists for this game yet, so treat any number you see quoted as a single trade, not a price.`
                : `With no published rarity there is no way to price ${pet.name} from public data. Ask in the game's Discord before you trade — and be sceptical of any value list for this game, because none has been corroborated yet.`}
            </p>
            <Link
              href="/values/"
              className="mt-3 inline-block text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              How values work here
            </Link>
          </div>

          <div>
            <h2 className="text-sm font-medium">Other pets we track</h2>
            <ul className="mt-3 space-y-1.5">
              {others.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/pets/${p.slug}/`}
                    className="flex items-baseline justify-between gap-3 text-sm hover:text-primary"
                  >
                    <span>{p.name}</span>
                    <span className="shrink-0 text-xs text-muted-foreground tabular">
                      {p.rarity ?? "unconfirmed"}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[var(--radius-container)] border rule bg-muted/50 p-4">
            <p className="text-xs text-muted-foreground">
              The full roster is hundreds of pets long and nobody has published it.{" "}
              <Link
                href="/pets/"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                See how the list grows
              </Link>
              .
            </p>
          </div>
        </aside>
      </div>
    </article>
  );
}

function StatusChip({ pet }: { pet: Pet }) {
  return (
    <span
      className={
        "inline-flex items-center rounded-[var(--radius-control)] px-3 py-1 text-xs font-medium " +
        (pet.verified
          ? "bg-primary text-primary-foreground"
          : "border rule text-muted-foreground")
      }
    >
      {pet.verified ? `${pet.rarity} · confirmed` : "Name confirmed · numbers unpublished"}
    </span>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-card p-4">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="mt-1 font-mono text-sm font-semibold tabular">{value}</dd>
    </div>
  );
}
