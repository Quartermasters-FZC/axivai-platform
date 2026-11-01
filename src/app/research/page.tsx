import type { Metadata } from "next";
import Link from "next/link";
import { ReportFooter } from "@/components/report/layout";
import { allReports } from "@/lib/content";
import "./report.css";

export const metadata: Metadata = {
  alternates: { canonical: "/research" },
  title: "Research | AXIVAI",
  description:
    "AXIVAI research on fleet charging and grid delays: why electric school-bus and fleet depots wait months or years for power, and how delivered battery power closes the gap.",
};

export default function ResearchIndex() {
  return (
    <div className="axr">
      <header className="axr-cover">
        <div className="axr-cover-graphic hidden md:block" aria-hidden="true" />
        <div className="container mx-auto px-4 py-14 md:py-20 relative">
          <div className="max-w-3xl space-y-6">
            <div className="axr-eyebrow">AXIVAI Research</div>
            <h1 className="axr-display">Research</h1>
            <div className="axr-rule" aria-hidden="true" />
            <p className="axr-lead" style={{ color: "var(--warm-gray)" }}>
              Where power access holds fleets back, how long the grid takes, and where AXIVAI&apos;s delivered
              power closes the gap. Every figure carries its source.
            </p>
          </div>
        </div>
      </header>

      <main id="main-content" tabIndex={-1} className="container mx-auto px-4 py-12">
        <ol className="grid gap-4 md:grid-cols-2">
          {allReports().map((r) => (
            <li key={r.slug} className="axr-card flex flex-col">
              <div className="axr-eyebrow">{r.kind}</div>
              <h2 className="axr-h2 mt-2">
                <Link href={`/research/${r.slug}`}>{r.title}</Link>
              </h2>
              {r.summary && <p className="axr-small axr-muted mt-2">{r.summary}</p>}
              <p className="axr-caption mt-auto pt-4">{r.date}</p>
            </li>
          ))}
        </ol>
        <p className="axr-caption mt-8 max-w-2xl">
          Reports draw on research commissioned by Aliff Group and are sourced against public primary documents.
        </p>
      </main>

      <ReportFooter />
    </div>
  );
}
