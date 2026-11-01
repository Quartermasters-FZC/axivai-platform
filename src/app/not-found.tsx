import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found | AXIVAI",
  robots: { index: false, follow: true },
};

const LINKS = [
  { href: "/", label: "Home", note: "AXIVAI and how it works" },
  { href: "/research", label: "Research", note: "Industry reviews, case studies and market scans" },
  { href: "/report-a-gap", label: "Report a power gap", note: "Tell us where a site can’t get the power it needs" },
];

export default function NotFound() {
  return (
    <div className="bg-background">
      <main id="main-content" tabIndex={-1} className="py-20 px-4">
        <div className="container mx-auto max-w-2xl">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.24em] text-accent-ink">Error 404</p>
          <h1 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">This page doesn&apos;t exist</h1>
          <p className="mt-4 text-muted-foreground text-lg">
            The link may be out of date, or the page may have moved. These are good places to continue:
          </p>
          <ul className="mt-8 divide-y rounded-lg border">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="flex flex-col gap-0.5 px-5 py-4 hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b6914]">
                  <span className="font-semibold">{l.label}</span>
                  <span className="text-sm text-muted-foreground">{l.note}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
