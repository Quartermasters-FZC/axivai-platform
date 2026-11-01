/**
 * AXIVAI research report layout: cover, contents rail, sections, sources, gap CTA, footer.
 * Every report under src/app/research uses these so the series reads as one publication.
 * Styles: src/app/research/report.css (scoped under .axr).
 */

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { RESEARCH_REPORTS } from "@/lib/research";
import { SITE } from "@/lib/site";

export type TocEntry = readonly [id: string, label: string];

export function ReportShell({
  slug,
  eyebrow,
  title,
  lead,
  meta,
  toc,
  children,
}: {
  /** Folder name under src/app/research; adds Article and breadcrumb structured data. */
  slug?: string;
  eyebrow: string;
  title: string;
  lead: ReactNode;
  meta: { label: string; value: string }[];
  toc: readonly TocEntry[];
  children: ReactNode;
}) {
  const entry = RESEARCH_REPORTS.find((r) => r.slug === slug);
  const url = `${SITE.url}/research/${slug}`;
  const jsonLd = entry && [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: entry.title,
      description: entry.summary,
      datePublished: entry.isoDate,
      dateModified: entry.isoDate,
      url,
      mainEntityOfPage: url,
      author: { "@type": "Organization", name: "AXIVAI", url: SITE.url },
      publisher: { "@type": "Organization", name: "AXIVAI", url: SITE.url, logo: `${SITE.url}/icon-512.png` },
      isPartOf: { "@type": "CollectionPage", name: "AXIVAI Research", url: `${SITE.url}/research` },
      inLanguage: "en-US",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
        { "@type": "ListItem", position: 2, name: "Research", item: `${SITE.url}/research` },
        { "@type": "ListItem", position: 3, name: entry.title, item: url },
      ],
    },
  ];

  return (
    <div className="axr">
      {jsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      )}
      {/* Cover */}
      <header className="axr-cover">
        <div className="axr-cover-graphic hidden md:block" aria-hidden="true" />
        <div className="container mx-auto px-4 py-14 md:py-20 relative">
          <div className="max-w-3xl space-y-6">
            <Image src="/brand/axivai-wordmark-reverse.svg" alt="AXIVAI" width={1864} height={330} className="hidden print:block h-6 w-auto" priority />
            <div className="axr-eyebrow">{eyebrow}</div>
            <h1 className="axr-display">{title}</h1>
            <div className="axr-rule" aria-hidden="true" />
            <p className="axr-lead" style={{ color: "var(--warm-gray)" }}>{lead}</p>
            <dl className="axr-cover-meta">
              {meta.map((m) => (
                <div key={m.label}>
                  <dt>{m.label}</dt>
                  <dd>{m.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[220px_minmax(0,1fr)] py-10">
          {/* Table of contents */}
          <aside className="axr-noprint hidden lg:block">
            <nav className="axr-toc" aria-label="Report contents">
              <div className="axr-eyebrow mb-3" style={{ color: "var(--ink-muted)" }}>Contents</div>
              <ol>
                {toc.map(([id, label], i) => (
                  <li key={id}>
                    <a href={`#${id}`}>
                      {String(i + 1).padStart(2, "0")} · {label}
                    </a>
                  </li>
                ))}
              </ol>
              <Link href="/research" className="axr-small mt-6 inline-block">
                All research
              </Link>
            </nav>
          </aside>

          <main id="main-content" tabIndex={-1} className="min-w-0">
            {children}
          </main>
        </div>
      </div>

      <ReportFooter />
    </div>
  );
}

/** Numbered section with the standard heading. `no` is the two-digit section number. */
export function ReportSection({ id, no, title, children }: { id: string; no: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="axr-section">
      <div className="axr-section-head">
        <span className="axr-section-no" aria-hidden="true">{no}</span>
        <h2 id={`${id}-title`} className="axr-h1">{title}</h2>
      </div>
      {children}
    </section>
  );
}

export type Source = { title: string; href: string; use: string; caution?: string };

/** Numbered source cards. Only public sources belong here; never link internal drafts. */
export function SourceList({ sources }: { sources: Source[] }) {
  return (
    <ol className="space-y-3">
      {sources.map((s, i) => (
        <li key={s.href} className="axr-card" style={{ padding: 20 }}>
          <div className="flex gap-3">
            <span className="axr-section-no" aria-hidden="true">{i + 1}</span>
            <div className="min-w-0">
              <a href={s.href} target="_blank" rel="noopener noreferrer" className="axr-print-url font-semibold">
                {s.title}
              </a>
              <p className="axr-small mt-1">{s.use}</p>
              {s.caution && (
                <p className="axr-small axr-muted mt-1">
                  <strong style={{ color: "var(--status-risk)" }}>Caution:</strong> {s.caution}
                </p>
              )}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Obsidian call-out that sends readers to the pilot / gap report form. */
export function GapCta({ title, body }: { title: string; body: string }) {
  return (
    <div className="axr-cover mt-8 rounded-lg p-6 md:p-8 axr-noprint" style={{ borderRadius: 8 }}>
      <div className="axr-eyebrow">Waiting on power?</div>
      <p className="axr-h2 mt-2">{title}</p>
      <p className="axr-small mt-2" style={{ color: "var(--warm-gray)" }}>{body}</p>
      <Link
        href="/report-a-gap"
        className="mt-4 inline-flex items-center h-11 px-6 rounded"
        style={{ background: "var(--accent)", color: "var(--on-accent)", textDecoration: "none", fontFamily: "var(--font-display)", fontSize: 12, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase" }}
      >
        Talk to us about a pilot
      </Link>
    </div>
  );
}

export function ReportFooter() {
  return (
    <div className="border-t py-8 px-4" style={{ borderColor: "var(--line)" }}>
      <p className="container mx-auto axr-caption max-w-3xl">
        AXIVAI Research. Sources are listed in each report; figures marked Estimate are AXIVAI planning figures.
      </p>
    </div>
  );
}
