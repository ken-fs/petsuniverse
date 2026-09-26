import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { SiteNav } from "@/components/site-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { WebsiteJsonLd } from "@/components/json-ld";
import { SITE_URL } from "@/lib/site";
import { AnalyticsConsent } from "@/components/analytics-consent";
import { LAST_CHECKED } from "@/data/game";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Pets Universe codes, pet rarities and trading values",
    template: "%s | Pets Universe Reference",
  },
  description:
    "Every working Pets Universe code with its reward, the pets whose rarity is confirmed by the game itself, and an honest map of what is still unpublished. Fan-made, no invented numbers.",
  openGraph: {
    type: "website",
    siteName: "Pets Universe Reference",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        {/*
          Theme defaults to light rather than following the OS: this is a data
          reference read in daylight, and the light ground is the one the
          palette was contrast-checked against. A stored choice always wins, and
          the script runs before paint so dark never flashes light.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("pu-theme");document.documentElement.classList.toggle("dark",t==="dark")}catch(e){}})()`,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col antialiased">
        <WebsiteJsonLd name="Pets Universe Reference" />
        <SiteNav />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <AnalyticsConsent />
      </body>
    </html>
  );
}

function SiteFooter() {
  return (
    <footer className="mt-24 border-t rule">
      <div className="mx-auto w-full max-w-6xl px-5 py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-md">
            <p className="text-sm font-medium">Pets Universe Reference</p>
            <p className="mt-2 text-sm text-muted-foreground">
              An independent player reference. Not affiliated with Lip Builds or
              Roblox Corporation. Game names and assets belong to their owners.
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Last source pass: {LAST_CHECKED}
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm" aria-label="Footer">
            <Link href="/codes/" className="text-muted-foreground hover:text-foreground">
              Codes
            </Link>
            <Link href="/pets/" className="text-muted-foreground hover:text-foreground">
              Pets
            </Link>
            <Link href="/values/" className="text-muted-foreground hover:text-foreground">
              Values
            </Link>
            <Link href="/tier-list/" className="text-muted-foreground hover:text-foreground">
              Tier list
            </Link>
            <Link href="/guide/" className="text-muted-foreground hover:text-foreground">
              Guide
            </Link>
            <Link href="/about/" className="text-muted-foreground hover:text-foreground">
              About
            </Link>
          </nav>
        </div>
        <div className="mt-8 flex items-center justify-between border-t rule pt-6">
          <p className="text-xs text-muted-foreground">
            Values and odds are community-reported. Confirm in game before trading.
          </p>
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
}
