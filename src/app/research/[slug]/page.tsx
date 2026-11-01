/**
 * Markdown research reports from content/reports/<slug>.md.
 * Hand-built reports in sibling folders take precedence over this route.
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GapCta, ReportSection, ReportShell } from "@/components/report/layout";
import { loadCollection, loadEntry } from "@/lib/content";
import "../report.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return loadCollection("reports").map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const e = loadEntry("reports", slug);
  if (!e) return {};
  return {
    title: `${e.meta.seoTitle ?? e.meta.title} | AXIVAI`,
    description: e.meta.description ?? e.meta.summary,
    alternates: { canonical: `/research/${slug}` },
    keywords: e.meta.keywords?.split(",").map((k) => k.trim()),
    openGraph: { title: e.meta.title, description: e.meta.description ?? e.meta.summary, type: "article" },
  };
}

export default async function MarkdownReport({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const e = loadEntry("reports", slug);
  if (!e) notFound();

  return (
    <ReportShell
      slug={slug}
      eyebrow={e.meta.kind ?? "Industry review"}
      title={e.meta.title}
      lead={e.meta.lead ?? e.meta.summary}
      meta={[
        { label: "Date", value: e.meta.date },
        { label: "Published by", value: "AXIVAI Research" },
      ]}
      toc={e.sections.map((s) => [s.id, s.title] as const)}
    >
      {e.intro && <div className="axr-prose axr-md pb-6" dangerouslySetInnerHTML={{ __html: e.intro }} />}
      {e.sections.map((s, i) => (
        <ReportSection key={s.id} id={s.id} no={String(i + 1).padStart(2, "0")} title={s.title}>
          <div className="axr-prose axr-md" dangerouslySetInnerHTML={{ __html: s.html }} />
        </ReportSection>
      ))}
      <GapCta
        title={e.meta.ctaTitle ?? "Buses ready, power months away?"}
        body={e.meta.ctaBody ?? "AXIVAI brings battery power to depots and sites the grid can't serve yet. Tell us about your site."}
      />
    </ReportShell>
  );
}
