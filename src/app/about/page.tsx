import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { PARTNERS, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About | AXIVAI",
  description:
    "AXIVAI is a deployable power infrastructure company, founded and seed-funded by Aliff Capital, with Aliff Solutions and Quartermasters as consultants. Website developed by Aliff Solutions.",
  alternates: { canonical: "/about" },
};


const PRINCIPLES = [
  { title: "Start with the need, not the truck", text: "Every case begins with the site’s power need: kW, kWh, duration, location and service level." },
  { title: "The right fix for each site", text: "Delivered energy, stationed storage or managed charging: we recommend whatever gets the site running fastest." },
  { title: "Numbers you can check", text: "Every figure in our research carries its source, so buyers can check our work." },
];

export default function AboutPage() {
  return (
    <div className="bg-background">
      <main id="main-content" tabIndex={-1} className="py-14 md:py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <Badge variant="outline" className="border-accent/40 text-accent-ink bg-accent/5">
            About
          </Badge>
          <h1 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight">About AXIVAI</h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground max-w-3xl">
            AXIVAI is a deployable power infrastructure company. It makes usable electrical capacity available where
            fixed infrastructure is too slow, too limited or too inflexible, through modular storage, mission-specific
            deployment and managed operations. When a fleet depot is waiting on a transformer, AXIVAI trucks the power in.
          </p>

          <section aria-labelledby="principles-title" className="mt-12">
            <h2 id="principles-title" className="text-2xl font-bold">How we work</h2>
            <ul className="mt-5 grid gap-4 md:grid-cols-3">
              {PRINCIPLES.map((p) => (
                <li key={p.title} className="rounded-lg border bg-card p-5">
                  <h3 className="font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
                </li>
              ))}
            </ul>
          </section>

          <section id="people" aria-labelledby="people-title" className="mt-14 scroll-mt-24">
            <h2 id="people-title" className="text-2xl font-bold">Who&apos;s behind AXIVAI</h2>
            <ul className="mt-5 grid gap-4 md:grid-cols-3">
              {PARTNERS.map((p) => (
                <li key={p.name} className="relative overflow-hidden rounded-lg border bg-card p-5">
                  <span className="absolute inset-x-0 top-0 h-1 bg-[#d4a017]" aria-hidden="true" />
                  <p className="font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-ink">{p.role}</p>
                  <h3 className="mt-2 text-xl font-bold">
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener"
                      className="rounded-sm underline decoration-[#d4a017] decoration-2 underline-offset-4 hover:text-accent-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b6914] focus-visible:ring-offset-2"
                    >
                      {p.name}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">{p.url.replace("https://", "")}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{p.note}</p>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted-foreground">
              All rights in AXIVAI and its research are held by {SITE.entity}.
            </p>
          </section>

          <section aria-labelledby="next-title" className="mt-14 rounded-lg bg-[#1c1917] p-6 md:p-8 text-[#e8e4dc]">
            <h2 id="next-title" className="text-xl font-bold text-[#fefdfb]">Follow the research</h2>
            <p className="mt-2 text-sm text-[#bdb6aa] max-w-2xl">
              Read our industry reviews and case studies, or tell us about a site that can&apos;t get the power it needs.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/research" className="inline-flex h-11 items-center rounded border border-[#d4a017] px-5 font-display text-xs font-semibold uppercase tracking-[0.14em] text-[#fefdfb] hover:bg-[#d4a017]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a017] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1c1917]">
                Read the research
              </Link>
              <Link href="/report-a-gap" className="inline-flex h-11 items-center rounded bg-[#d4a017] px-5 font-display text-xs font-semibold uppercase tracking-[0.14em] text-[#1c1917] hover:bg-[#e2ae25] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fefdfb] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1c1917]">
                Report a power gap
              </Link>
            </div>
            <p className="mt-6 text-xs text-[#a8a094]">
              Questions about this site or your data: <a href={`mailto:${SITE.email.privacy}`} className="underline decoration-[#d4a017] underline-offset-4 hover:text-[#d4a017]">{SITE.email.privacy}</a>
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
