/**
 * State hub: the state report from content/states/<state>.md plus every district page in that state.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GapCta, ReportSection, ReportShell } from "@/components/report/layout";
import { listFolders, loadCollection, loadEntry } from "@/lib/content";
import "../../research/report.css";

export const dynamicParams = false;

export function generateStaticParams() {
  const states = new Set([...loadCollection("states").map((e) => e.slug), ...listFolders("districts")]);
  return [...states].map((state) => ({ state }));
}

export async function generateMetadata({ params }: { params: Promise<{ state: string }> }): Promise<Metadata> {
  const { state } = await params;
  const e = loadEntry("states", state);
  if (!e) return {};
  return {
    title: `${e.meta.seoTitle ?? e.meta.title} | AXIVAI`,
    description: e.meta.summary,
    alternates: { canonical: `/electric-school-buses/${state}` },
  };
}

export default async function StatePage({ params }: { params: Promise<{ state: string }> }) {
  const { state } = await params;
  const e = loadEntry("states", state);
  if (!e) notFound();
  const districts = loadCollection(`districts/${state}`);

  return (
    <ReportShell
      eyebrow="Electric school buses · State report"
      title={e.meta.title}
      lead={e.meta.lead ?? e.meta.summary}
      meta={[
        { label: "Updated", value: e.meta.date },
        { label: "Districts covered", value: String(districts.length) },
      ]}
      toc={[...e.sections.map((s) => [s.id, s.title] as const), ...(districts.length ? [["districts", "District pages"] as const] : [])]}
    >
      {e.intro && <div className="axr-prose axr-md pb-6" dangerouslySetInnerHTML={{ __html: e.intro }} />}
      {e.sections.map((s, i) => (
        <ReportSection key={s.id} id={s.id} no={String(i + 1).padStart(2, "0")} title={s.title}>
          <div className="axr-prose axr-md" dangerouslySetInnerHTML={{ __html: s.html }} />
        </ReportSection>
      ))}
      {districts.length > 0 && (
        <ReportSection id="districts" no={String(e.sections.length + 1).padStart(2, "0")} title="District pages">
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {districts.map((d) => (
              <li key={d.slug}>
                <Link href={`/electric-school-buses/${state}/${d.slug}`} className="axr-card block h-full">
                  <span className="font-semibold">{d.meta.title}</span>
                  {d.meta.county && <span className="axr-caption block mt-1">{d.meta.county}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </ReportSection>
      )}
      <GapCta title="Waiting on depot power?" body="AXIVAI brings battery power to bus depots the grid can't serve yet. Tell us about your site." />
    </ReportShell>
  );
}
