/**
 * District electric school-bus pages from content/districts/<state>/<district>.md.
 * Front matter carries the district facts shown in the fact panel; the body carries the analysis.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GapCta, ReportSection, ReportShell } from "@/components/report/layout";
import { listFolders, loadCollection, loadEntry } from "@/lib/content";
import { SITE } from "@/lib/site";
import "../../../research/report.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return listFolders("districts").flatMap((state) =>
    loadCollection(`districts/${state}`).map((e) => ({ state, district: e.slug }))
  );
}

/** Fact panel rows: front-matter key → label. Only keys present in the file are shown. */
const FACTS: [string, string][] = [
  ["county", "County"],
  ["region", "Region"],
  ["enrollment", "Enrollment"],
  ["fleet", "Buses serving the district"],
  ["electricBuses", "Electric buses"],
  ["fleetPlan", "Fleet electrification plan"],
  ["utility", "Electric utility"],
  ["transportation", "Transportation"],
  ["fundingAwarded", "ESB funding awarded"],
  ["deadline", "Zero-emission deadline"],
];

export async function generateMetadata({ params }: { params: Promise<{ state: string; district: string }> }): Promise<Metadata> {
  const { state, district } = await params;
  const e = loadEntry(`districts/${state}`, district);
  if (!e) return {};
  const title = `${e.meta.title}: electric school buses, funding and grid readiness`;
  return {
    title: `${title} | AXIVAI`,
    description: e.meta.summary,
    alternates: { canonical: `/electric-school-buses/${state}/${district}` },
    openGraph: { title, description: e.meta.summary, type: "article" },
  };
}

export default async function DistrictPage({ params }: { params: Promise<{ state: string; district: string }> }) {
  const { state, district } = await params;
  const e = loadEntry(`districts/${state}`, district);
  if (!e) notFound();
  const stateName = e.meta.stateName ?? state;
  const url = `${SITE.url}/electric-school-buses/${state}/${district}`;
  const facts = FACTS.filter(([k]) => e.meta[k]);
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: `${e.meta.title}: electric school buses, funding and grid readiness`,
      description: e.meta.summary,
      datePublished: e.meta.isoDate,
      dateModified: e.meta.isoDate,
      url,
      author: { "@type": "Organization", name: "AXIVAI", url: SITE.url },
      publisher: { "@type": "Organization", name: "AXIVAI", url: SITE.url },
      about: { "@type": "EducationalOrganization", name: e.meta.title, address: { "@type": "PostalAddress", addressRegion: stateName, addressCountry: "US" } },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Electric school buses", item: `${SITE.url}/electric-school-buses` },
        { "@type": "ListItem", position: 2, name: stateName, item: `${SITE.url}/electric-school-buses/${state}` },
        { "@type": "ListItem", position: 3, name: e.meta.title, item: url },
      ],
    },
  ];

  return (
    <ReportShell
      eyebrow={`Electric school buses · ${stateName}`}
      title={e.meta.title}
      lead={e.meta.summary}
      meta={[
        { label: "Updated", value: e.meta.date },
        { label: "Published by", value: "AXIVAI Research" },
      ]}
      toc={[["facts", "At a glance"] as const, ...e.sections.map((s) => [s.id, s.title] as const)]}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <nav aria-label="Breadcrumb" className="axr-small mb-6">
        <Link href="/electric-school-buses">Electric school buses</Link> ›{" "}
        <Link href={`/electric-school-buses/${state}`}>{stateName}</Link> › {e.meta.title}
      </nav>
      <section id="facts" aria-labelledby="facts-title" className="pb-8">
        <h2 id="facts-title" className="axr-eyebrow mb-4">At a glance</h2>
        <dl className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {facts.map(([k, label]) => (
            <div key={k} className="axr-card">
              <dt className="axr-metric-label">{label}</dt>
              <dd className="mt-2 axr-h2">{e.meta[k]}</dd>
            </div>
          ))}
        </dl>
      </section>
      {e.intro && <div className="axr-prose axr-md pb-6" dangerouslySetInnerHTML={{ __html: e.intro }} />}
      {e.sections.map((s, i) => (
        <ReportSection key={s.id} id={s.id} no={String(i + 1).padStart(2, "0")} title={s.title}>
          <div className="axr-prose axr-md" dangerouslySetInnerHTML={{ __html: s.html }} />
        </ReportSection>
      ))}
      <GapCta
        title={`Running buses for ${e.meta.title}?`}
        body="If the depot is waiting on a transformer or a utility upgrade, AXIVAI can bring the power by truck so the buses run from day one."
      />
    </ReportShell>
  );
}
