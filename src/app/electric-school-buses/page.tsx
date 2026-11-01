import type { Metadata } from "next";
import Link from "next/link";
import { ReportFooter } from "@/components/report/layout";
import { listFolders, loadCollection } from "@/lib/content";
import "../research/report.css";

export const metadata: Metadata = {
  title: "Electric school buses by state and district | AXIVAI",
  description:
    "Electric school-bus mandates, funding, fleets and grid readiness by state and school district, with sourced figures from AXIVAI Research.",
  alternates: { canonical: "/electric-school-buses" },
};

export default function ElectricSchoolBusesIndex() {
  const states = loadCollection("states");
  const counts = Object.fromEntries(listFolders("districts").map((s) => [s, loadCollection(`districts/${s}`).length]));
  return (
    <div className="axr">
      <header className="axr-cover">
        <div className="axr-cover-graphic hidden md:block" aria-hidden="true" />
        <div className="container mx-auto px-4 py-14 md:py-20 relative">
          <div className="max-w-3xl space-y-6">
            <div className="axr-eyebrow">AXIVAI Research</div>
            <h1 className="axr-display">Electric school buses by state and district</h1>
            <div className="axr-rule" aria-hidden="true" />
            <p className="axr-lead" style={{ color: "var(--warm-gray)" }}>
              Mandates, funding, fleets and the grid wait, state by state and district by district.
            </p>
          </div>
        </div>
      </header>
      <main id="main-content" tabIndex={-1} className="container mx-auto px-4 py-12">
        <ol className="grid gap-4 md:grid-cols-2">
          {states.map((s) => (
            <li key={s.slug} className="axr-card flex flex-col">
              <h2 className="axr-h2">
                <Link href={`/electric-school-buses/${s.slug}`}>{s.meta.title}</Link>
              </h2>
              <p className="axr-small axr-muted mt-2">{s.meta.summary}</p>
              {counts[s.slug] ? <p className="axr-caption mt-auto pt-4">{counts[s.slug]} district pages</p> : null}
            </li>
          ))}
        </ol>
      </main>
      <ReportFooter />
    </div>
  );
}
