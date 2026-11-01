/**
 * Landing page for the core search intent: charging an electric fleet before the grid connection arrives.
 * Figures match the sourced figures in docs/research/transformer-lead-times-ny-ca.md.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ReportDiagram } from "@/components/report/ReportDiagram";
import { SITE } from "@/lib/site";
import "../research/report.css";

export const metadata: Metadata = {
  title: "Off-grid charging for electric bus fleets | AXIVAI",
  description:
    "Electric bus depots wait 18 months or more for grid power while transformers are back-ordered. AXIVAI trucks battery power to the yard so the fleet runs from day one.",
  alternates: { canonical: "/off-grid-fleet-charging" },
};

const STATS = [
  { value: "560 days", label: "Average wait from request to power for EV charging sites", source: "PG&E report to the CPUC, April 2026" },
  { value: "3.5 years", label: "Average when the substation must be upgraded", source: "PG&E report to the CPUC, April 2026" },
  { value: "2–4 years", label: "Delivery time for a large power transformer, up from months in 2020", source: "NIAC report on transformer shortages, June 2024" },
  { value: "A year +", label: "Fleet electrification projects downstate New York", source: "NY Department of Public Service, June 2026" },
];

const STEPS = [
  { title: "Storage and chargers on your yard", text: "AXIVAI installs battery storage next to your chargers. No grid connection is needed to start." },
  { title: "Power delivered around the clock", text: "AXIVAI Motherships, trucks with battery trailers, fill up at an energy terminal with spare capacity and refill your storage day and night." },
  { title: "The grid arrives, AXIVAI steps back", text: "When the utility energizes your service, the storage stays on as backup or moves to the next site that's waiting." },
];

const USES = [
  "Electric school-bus depots and bus operators",
  "Commercial fleet and delivery depots",
  "Construction and temporary industrial sites",
  "Ports and logistics yards",
  "Sites growing beyond their grid service",
  "Backup power through outages",
];

const READ_MORE = [
  { href: "/research/fleet-charging-hubs", label: "Shared fleet charging hubs" },
  { href: "/research/school-bus-depots", label: "Electric school-bus depots" },
  { href: "/research/ny-implementation-gap", label: "New York's electric school-bus gap" },
  { href: "/research/fleet-storage-landscape", label: "Deployable and buffered power for fleet charging" },
];

export default function OffGridFleetChargingPage() {
  const url = `${SITE.url}/off-grid-fleet-charging`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "AXIVAI off-grid fleet charging",
      serviceType: "Deployable battery power for electric fleet charging",
      description:
        "Battery energy delivered by truck into storage installed on a fleet depot, so electric vehicles charge before the grid connection is energized.",
      provider: { "@type": "Organization", name: "AXIVAI", url: SITE.url },
      areaServed: [
        { "@type": "State", name: "New York" },
        { "@type": "State", name: "California" },
      ],
      url,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
        { "@type": "ListItem", position: 2, name: "Off-grid fleet charging", item: url },
      ],
    },
  ];

  return (
    <div className="bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <main id="main-content" tabIndex={-1} className="py-14 md:py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="max-w-3xl">
            <Badge variant="outline" className="border-accent/40 text-accent-ink bg-accent/5">
              Off-grid fleet charging
            </Badge>
            <h1 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight leading-[1.15]">
              Charge your electric fleet before the grid arrives
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Your buses arrive in months. Grid power can take 18 months or more while the transformer is on back
              order. AXIVAI trucks the power in, so your fleet runs from day one.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/report-a-gap" className="inline-flex h-11 items-center rounded bg-accent px-5 font-semibold text-accent-foreground hover:bg-accent/90">
                Tell us about your site
              </Link>
              <Link href="/faq" className="inline-flex h-11 items-center rounded border px-5 font-medium hover:bg-muted">
                Read the FAQ
              </Link>
            </div>
          </div>

          <div className="axr mt-12">
            <ReportDiagram
              file="fleet-charging-hub-day.svg"
              headline="A day at a new yard with no grid connection"
              caption="The transformer is on back order, so AXIVAI trucks deliver energy into storage on the yard and every bus still leaves full."
              note="Energy figures are AXIVAI estimates for a 40-bus yard."
            />
          </div>

          <section aria-labelledby="wait-title" className="mt-16">
            <h2 id="wait-title" className="text-2xl md:text-3xl font-bold">The grid wait, in numbers</h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {STATS.map((s) => (
                <li key={s.label} className="rounded-lg border bg-card p-5">
                  <p className="font-display text-3xl font-bold">{s.value}</p>
                  <p className="mt-2 text-sm">{s.label}</p>
                  <p className="mt-3 text-xs text-muted-foreground">{s.source}</p>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="how-title" className="mt-16">
            <h2 id="how-title" className="text-2xl md:text-3xl font-bold">How it works</h2>
            <ol className="mt-6 grid gap-4 md:grid-cols-3">
              {STEPS.map((s, i) => (
                <li key={s.title} className="relative overflow-hidden rounded-lg border bg-card p-5">
                  <span className="absolute inset-x-0 top-0 h-1 bg-[#d4a017]" aria-hidden="true" />
                  <p className="font-display text-sm font-semibold text-accent-ink">Step {i + 1}</p>
                  <h3 className="mt-1 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="yard-title" className="mt-16 grid gap-8 md:grid-cols-2">
            <div>
              <h2 id="yard-title" className="text-2xl md:text-3xl font-bold">A 40-bus yard, one night</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                At about 100 kWh per bus, a 40-bus yard needs roughly 4 MWh a night. With 2 MWh per trailer, two
                deliveries cover it, and about 4 MWh of storage on the yard keeps every bus charging through the night.
              </p>
              <p className="mt-3 text-xs text-muted-foreground">AXIVAI planning figures. Each site is sized from its own routes.</p>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Built for</h2>
              <ul className="mt-4 space-y-2">
                {USES.map((u) => (
                  <li key={u} className="flex gap-2">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#d4a017]" aria-hidden="true" />
                    <span>{u}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section aria-labelledby="grid-title" className="mt-16 max-w-3xl">
            <h2 id="grid-title" className="text-2xl md:text-3xl font-bold">We don&apos;t replace the grid. We cover the wait.</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Grid power is cheap and reliable once it&apos;s there. AXIVAI serves the window when the utility can&apos;t
              deliver yet: delayed connections, transformer and switchgear shortages, growth beyond a site&apos;s
              service, temporary sites and outages.
            </p>
          </section>

          <section aria-labelledby="read-title" className="mt-16">
            <h2 id="read-title" className="text-2xl font-bold">Read the research</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {READ_MORE.map((r) => (
                <li key={r.href}>
                  <Link href={r.href} className="block rounded-lg border bg-card p-4 font-medium hover:border-accent-ink">
                    {r.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}
