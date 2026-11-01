import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { FAQS, faqJsonLd } from "@/lib/faq";

export const metadata: Metadata = {
  title: "FAQ: off-grid charging for electric bus fleets | AXIVAI",
  description:
    "How long electric bus depots wait for grid power, why transformers are delayed, and how AXIVAI delivers battery power by truck so fleets run before the grid arrives.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <div className="bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd(FAQS) }} />
      <main id="main-content" tabIndex={-1} className="py-14 md:py-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <Badge variant="outline" className="border-accent/40 text-accent-ink bg-accent/5">
            FAQ
          </Badge>
          <h1 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight">Questions about AXIVAI</h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Grid delays, transformer shortages and how AXIVAI keeps electric fleets running while the utility catches up.
          </p>

          <dl className="mt-10 divide-y border-y">
            {FAQS.map(({ question, short, answer }) => (
              <div key={question} className="py-6">
                <dt>
                  <h2 className="text-lg font-semibold">{question}</h2>
                </dt>
                <dd className="mt-2 space-y-2">
                  <p className="font-medium">{short}</p>
                  <p className="text-muted-foreground leading-relaxed">{answer}</p>
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 rounded-lg bg-[#1c1917] p-6 md:p-8 text-[#e8e4dc]">
            <h2 className="text-xl font-bold text-[#fefdfb]">Waiting on power?</h2>
            <p className="mt-2 text-sm text-[#bdb6aa]">
              Tell us about the site. We&apos;re choosing AXIVAI&apos;s first pilot sites now.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/report-a-gap" className="inline-flex h-11 items-center rounded bg-[#d4a017] px-5 font-display text-xs font-semibold uppercase tracking-[0.14em] text-[#1c1917] hover:bg-[#e2ae25] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fefdfb] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1c1917]">
                Tell us about your site
              </Link>
              <Link href="/off-grid-fleet-charging" className="inline-flex h-11 items-center rounded border border-[#d4a017] px-5 font-display text-xs font-semibold uppercase tracking-[0.14em] text-[#fefdfb] hover:bg-[#d4a017]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a017] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1c1917]">
                How off-grid charging works
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
