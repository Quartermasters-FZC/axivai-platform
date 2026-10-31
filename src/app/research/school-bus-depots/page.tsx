import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LegalFooter } from "@/components/LegalFooter";
import {
  DataTag,
  Evidence,
  Metric,
  Notice,
  TierChart,
  type EvidenceLevel,
  type Provenance,
  type Tier,
} from "@/components/report/primitives";
import "../report.css";

// Content source: research case brief v0.1 (reviewed in chat, 31 October 2026).
// Evidence levels per docs/planning/AXIVAI_Improved_Concept_Paper_October_2026.md §11.

export const metadata: Metadata = {
  title: "Electric school-bus depots: research case | AXIVAI",
  description:
    "AXIVAI's initial research case: when an electric school-bus depot can't get the power it needs in time, which option charges the fleet at the lowest total cost?",
  // Draft for review: keep out of search until approved.
  robots: { index: false, follow: false },
};

const TOC = [
  ["question", "The research question"],
  ["evidence", "What the evidence says"],
  ["example", "Worked example"],
  ["alternatives", "The alternatives test"],
  ["park-out", "Park-out buses"],
  ["permitting", "Permitting risk"],
  ["sources", "Source quality"],
  ["open-questions", "Open questions"],
  ["next-steps", "Next steps"],
] as const;

const EVIDENCE_ROWS: { claim: string; level: EvidenceLevel; tag: Provenance; source: string; note?: string }[] = [
  {
    claim: "Depots needing new grid infrastructure face costly upgrades with “long lead times (3–5 years or longer)”; simpler upgrades can take several months.",
    level: "established",
    tag: "verified",
    source: "DOE Electric School Bus Planning Guide",
  },
  {
    claim: "Temporary mobile charging is an option when utility upgrades run late.",
    level: "established",
    tag: "verified",
    source: "DOE Electric School Bus Planning Guide",
    note: "No specifications or costs given.",
  },
  {
    claim: "Where demand charges apply, managed charging is “essential”.",
    level: "established",
    tag: "verified",
    source: "DOE Electric School Bus Planning Guide",
  },
  {
    claim: "Interconnection takes 18 to 36 months.",
    level: "established",
    tag: "estimate",
    source: "Fleet battery storage report, citing a trade-press developer article",
    note: "Weaker than DOE; prefer the DOE range.",
  },
  {
    claim: "A utility delivered 2.7 MW for an all-electric school-bus fleet in Oakland a year early.",
    level: "established",
    tag: "verified",
    source: "PG&E and Zum, via the NYC DCAS brief",
    note: "Counter-evidence: the utility is not always the bottleneck.",
  },
  {
    claim: "Con Edison covers up to 90% of utility-side and 50% of customer-side make-ready costs (capped at $490/kW); school buses are eligible.",
    level: "established",
    tag: "verified",
    source: "Con Edison, via the NYC DCAS brief",
    note: "Strengthens the “wait for the utility” alternative.",
  },
  {
    claim: "Cold weather can cut range by up to 50%.",
    level: "established",
    tag: "verified",
    source: "DOE Electric School Bus Planning Guide",
  },
  {
    claim: "An 80-mile day at 0°F needs about 25 kW of charging per bus.",
    level: "established",
    tag: "verified",
    source: "DOE planning chart",
  },
];

const TIERS: Tier[] = [
  { spareKw: 400, overnightKwh: 4800, dayKwh: 9600, verdict: "Managed charging alone covers the night." },
  { spareKw: 250, overnightKwh: 3000, dayKwh: 6000, verdict: "A battery charged during the day closes the gap." },
  { spareKw: 150, overnightKwh: 1800, dayKwh: 3600, verdict: "Even 24 hours falls short: energy must come from elsewhere." },
];

const ALTERNATIVES: { option: string; wins: string; fails: string; level: EvidenceLevel; note: string }[] = [
  { option: "Managed charging", wins: "Tier 1 sites, which may be most sites", fails: "Can't create energy the site doesn't have", level: "established", note: "Recommended by DOE. NYCSBUS uses it; no results published." },
  { option: "Battery on existing service", wins: "Tier 2 sites; also cuts demand charges", fails: "Needs about 24 hours of spare capacity, plus permits", level: "feasible", note: "VTA: 4 MWh / 1.5 MW, projected 36% cost cut (vendor page). Aggreko rents 1 MW / 1 MWh units." },
  { option: "Wait for the utility upgrade", wins: "Short or subsidised delays", fails: "Delays of 3–5+ years", level: "established", note: "Make-ready programmes cut the cost of the permanent fix." },
  { option: "Generator rental", wins: "Tier 3 sites, long-duration need", fails: "Emissions, noise, fuel logistics", level: "feasible", note: "Rental cost unknown." },
  { option: "Existing mobile charging supplier", wins: "Bridging and rescue charging", fails: "Cost per kWh; serving a whole fleet every night", level: "feasible", note: "SparkCharge trailers: 300 or 500 kWh, 80–125 kW per port (vendor specs). Pricing unknown." },
  { option: "Charging-as-a-service fleets", wins: "Districts wanting one fixed fee", fails: "Still need grid capacity", level: "feasible", note: "Bundle bus, charger and service. Possible partners or competitors." },
  { option: "AXIVAI mobile delivery", wins: "Tier 3 sites, for a limited period", fails: "Logistics cost (stress test)", level: "hypothesis", note: "About 1.4 deliveries a night in the example." },
  { option: "AXIVAI stationed power + occasional delivery", wins: "Tier 2 and 3 sites", fails: "Permits; asset ownership", level: "hypothesis", note: "The strongest candidate to test." },
];

const SOURCES: { title: string; href: string; use: string; caution: string }[] = [
  {
    title: "U.S. Department of Energy, Electric School Bus Planning Guide",
    href: "https://afdc.energy.gov/guides/electric-school-bus",
    use: "Primary source for timelines, charger levels, cold-weather effects and managed charging.",
    caution: "No costs or specifications for temporary mobile charging.",
  },
  {
    title: "EV Fleet Battery Storage Research Report (Aliff Capital)",
    href: "https://docs.google.com/document/d/1dYNdDJaVwmO3an6Wsfq-9QLi3OxQ-QyLFecopp2-r9o/edit",
    use: "Supplier landscape and equipment specifications.",
    caution: "Relies on vendor claims (“upwards of 40%” savings, “99.9%” uptime). Use specs, not claims.",
  },
  {
    title: "Electric School Buses and Charging Report (Aliff Capital)",
    href: "https://docs.google.com/document/d/1HAnTxZ9yYDcs9Qmb2BzxrjezG-gFO_jVIT229ujPUIU/edit",
    use: "Bus battery sizes and charge rates.",
    caution: "Mostly secondary sources and a contact directory.",
  },
  {
    title: "School Bus Park-Out Electrification Challenges",
    href: "https://docs.google.com/document/d/1kMH3PeUbDdyqAKIxGzxs92ksdyBFHUyorAQS4QFOleA/edit",
    use: "Home-charging limits, park-out scale, hub recommendation.",
    caution: "Cost ranges in its comparison table are not individually sourced.",
  },
  {
    title: "NYC EV Battery Protection Gaps, V2G/VPP Utilization & Policy Recommendations (DLP Labs | Aliff Capital)",
    href: "https://docs.google.com/document/d/1qbq-hl_Inc7qwLNS71dEh93n_d4zSwqYHx6AqNLAd4Y/edit",
    use: "Con Edison programme figures and NYC battery permitting rules.",
    caution: "A sales brief. V2G revenue arithmetic may assume year-round payments for seasonal programmes; its transformer-delay claim concerns export connections, not depot service.",
  },
  {
    title: "The U.S. Power Supply Landscape (Researchnomics)",
    href: "https://docs.google.com/document/d/1Pmh3I8tRYRTEN0gN9bbEzM89L7dl5dHki2JKhzmptV8/edit",
    use: "Background on grid structure and tariffs.",
    caution: "No inline citations; some data from 2016–2017. Background only.",
  },
];

function SectionHead({ id, no, title }: { id: string; no: string; title: string }) {
  return (
    <div className="axr-section-head">
      <span className="axr-section-no" aria-hidden="true">{no}</span>
      <h2 id={`${id}-title`} className="axr-h1">{title}</h2>
    </div>
  );
}

export default function SchoolBusDepotsReport() {
  return (
    <div className="axr min-h-screen">
      {/* Cover */}
      <header className="axr-cover">
        <div className="axr-cover-graphic hidden md:block" aria-hidden="true" />
        <div className="container mx-auto px-4 py-14 md:py-20 relative">
          <div className="max-w-3xl space-y-6">
            <Image src="/brand/axivai-wordmark-reverse.svg" alt="AXIVAI" width={1864} height={330} className="hidden print:block h-6 w-auto" priority />
            <div className="axr-eyebrow">Research case · Draft v0.1 for review</div>
            <h1 className="axr-display">Electric school-bus depots</h1>
            <div className="axr-rule" aria-hidden="true" />
            <p className="axr-lead" style={{ color: "var(--warm-gray)" }}>
              When a depot can&apos;t get the power it needs in time, which option charges the fleet
              reliably at the lowest total cost, and when, if ever, does deployable power win?
            </p>
            <dl className="axr-cover-meta">
              <div>
                <dt>Stage</dt>
                <dd>I–II · problem mapping and comparative engineering</dd>
              </div>
              <div>
                <dt>Date</dt>
                <dd>31 October 2026</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>Research draft. No validated AXIVAI results.</dd>
              </div>
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
                {TOC.map(([id, label], i) => (
                  <li key={id}>
                    <a href={`#${id}`}>
                      {String(i + 1).padStart(2, "0")} · {label}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <main id="main-content" tabIndex={-1} className="min-w-0">
            {/* Summary */}
            <section aria-labelledby="summary-title" className="pb-10">
              <h2 id="summary-title" className="axr-eyebrow mb-4">Summary</h2>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <Metric label="Daily need, example depot" value="4,000" unit="kWh" status="estimate" source="40 buses × 60 mi × 1.5 kWh/mi ÷ 90%" />
                <Metric label="Average overnight draw" value="333" unit="kW" status="estimate" source="4,000 kWh over a 12-hour window" />
                <Metric label="Peak if all charge at once" value="768" unit="kW" status="estimate" source="40 × 19.2 kW Level 2 chargers" />
                <Metric label="Large-upgrade lead time" value="3–5+" unit="years" status="verified" source="DOE Electric School Bus Planning Guide" />
              </div>
              <div className="axr-sunken mt-6 axr-prose">
                <p>
                  <strong>Finding so far.</strong> The site&apos;s spare power decides the answer. Managed charging or a
                  battery on the existing service solves most cases. Bringing energy in, by truck or generator, is only
                  needed when even 24 hours of spare capacity can&apos;t cover the daily need. A battery stationed on site
                  plus occasional top-up deliveries is the strongest AXIVAI hypothesis to test.
                </p>
                <p className="axr-small axr-muted">
                  No source yet measures what a delay costs a district, or what a district would pay to avoid one.
                  That is the concept&apos;s core hypothesis, and it is untested.
                </p>
              </div>
            </section>

            {/* 01 Question */}
            <section id="question" aria-labelledby="question-title" className="axr-section">
              <SectionHead id="question" no="01" title="The research question" />
              <div className="axr-prose">
                <p className="axr-lead">
                  When an electric school-bus depot can&apos;t get the power it needs in time, which option charges the
                  fleet reliably at the lowest total cost?
                </p>
                <p className="axr-muted">
                  The options compared: managed charging, a battery on the existing service, waiting for the utility,
                  a generator, an existing mobile-charging supplier, and AXIVAI&apos;s mobile and stationed modes. Under
                  the concept&apos;s alternatives test, AXIVAI should lose whenever a simpler option performs better.
                </p>
              </div>
            </section>

            {/* 02 Evidence */}
            <section id="evidence" aria-labelledby="evidence-title" className="axr-section">
              <SectionHead id="evidence" no="02" title="What the evidence says about the problem" />
              <div className="axr-table-wrap">
                <table className="axr-table">
                  <caption>
                    Evidence levels follow the concept paper: Established (external problem), Feasible (technology
                    class), Hypothesis (AXIVAI), Validated (AXIVAI result; none yet).
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col">Claim</th>
                      <th scope="col">Level</th>
                      <th scope="col">Figure</th>
                      <th scope="col">Source</th>
                    </tr>
                  </thead>
                  <tbody>
                    {EVIDENCE_ROWS.map((r) => (
                      <tr key={r.claim}>
                        <td style={{ minWidth: 260 }}>
                          {r.claim}
                          {r.note && <div className="axr-caption mt-1">{r.note}</div>}
                        </td>
                        <td><Evidence level={r.level} /></td>
                        <td><DataTag status={r.tag} source={r.source} /></td>
                        <td className="axr-muted" style={{ minWidth: 180 }}>{r.source}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-6">
                <Notice tone="risk" title="The biggest gap">
                  None of the sources measures what a delay costs a district or what districts would pay to avoid one.
                </Notice>
              </div>
            </section>

            {/* 03 Worked example */}
            <section id="example" aria-labelledby="example-title" className="axr-section">
              <SectionHead id="example" no="03" title="Worked example: one depot, three grid situations" />
              <div className="space-y-6">
                <Notice tone="assumption" title="Assumptions behind every number in this section">
                  40 Type C buses averaging 60 miles a day; 1.5 kWh per mile (196 kWh battery ÷ 130-mile rated range);
                  90% charging efficiency; a 12-hour overnight window. If winter use reaches 3 kWh per mile, the need
                  doubles to about 8,000 kWh a day.
                </Notice>

                <TierChart tiers={TIERS} needKwh={4000} maxKwh={10000} />

                <div className="axr-table-wrap">
                  <table className="axr-table">
                    <caption>Table view of the chart. All figures are estimates.</caption>
                    <thead>
                      <tr>
                        <th scope="col">Spare power</th>
                        <th scope="col" className="axr-num">Overnight</th>
                        <th scope="col" className="axr-num">24 hours</th>
                        <th scope="col">What solves it</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row" className="axr-num" style={{ textAlign: "left" }}>400 kW</th>
                        <td className="axr-num">4,800 kWh · 120%</td>
                        <td className="axr-num">9,600 kWh · 240%</td>
                        <td><strong>Managed charging.</strong> Spread charging across the night. No battery or truck needed.</td>
                      </tr>
                      <tr>
                        <th scope="row" className="axr-num" style={{ textAlign: "left" }}>250 kW</th>
                        <td className="axr-num">3,000 kWh · 75%</td>
                        <td className="axr-num">6,000 kWh · 150%</td>
                        <td><strong>Battery on the existing service.</strong> About 1,000+ kWh usable, charged during the day, covers the night.</td>
                      </tr>
                      <tr>
                        <th scope="row" className="axr-num" style={{ textAlign: "left" }}>150 kW</th>
                        <td className="axr-num">1,800 kWh · 45%</td>
                        <td className="axr-num">3,600 kWh · 90%</td>
                        <td><strong>Energy must come from outside.</strong> Mobile delivery, a generator or temporary service compete here, or phase in fewer buses (about 36 with a battery, 18 without).</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div>
                  <h3 className="axr-h2 mb-3">The rule this suggests</h3>
                  <ol className="axr-steps">
                    <li className="axr-step">
                      <div className="axr-step-no">Test 1</div>
                      <div className="axr-step-test">Spare kW × charging hours ≥ daily kWh?</div>
                      <div className="axr-step-result">Yes: managed charging wins.</div>
                    </li>
                    <li className="axr-step">
                      <div className="axr-step-no">Test 2</div>
                      <div className="axr-step-test">Spare kW × 24 hours ≥ daily kWh?</div>
                      <div className="axr-step-result">Yes: a stationary battery wins.</div>
                    </li>
                    <li className="axr-step">
                      <div className="axr-step-no">Otherwise</div>
                      <div className="axr-step-test">Energy has to be brought in</div>
                      <div className="axr-step-result">Only here do mobile delivery and generators compete.</div>
                    </li>
                  </ol>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="axr-card">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="axr-h2">Trucking the shortfall</h3>
                      <Evidence level="hypothesis" />
                    </div>
                    <div className="axr-metric-value">$186,000<span className="axr-metric-unit">a year</span></div>
                    <p className="axr-small axr-muted mt-2">
                      150 kW site: 2,200 kWh a night, about 1.4 deliveries at 1,600 kWh each, 180 school days, at the
                      concept paper&apos;s stress-test $0.469/kWh. Before equipment, financing and overhead.
                    </p>
                    <div className="mt-3"><DataTag status="estimate" source="Concept paper §8.1 stress test" /></div>
                  </div>
                  <div className="axr-card">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="axr-h2">Stationed battery + top-ups</h3>
                      <Evidence level="hypothesis" />
                    </div>
                    <div className="axr-metric-value">400<span className="axr-metric-unit">kWh/day to bring in</span></div>
                    <p className="axr-small axr-muted mt-2">
                      With a battery charged around the clock, the same site is short only 400 kWh a day: a few
                      deliveries a week instead of nearly two a night. Worth testing first.
                    </p>
                    <div className="mt-3"><DataTag status="estimate" source="Worked example, 150 kW tier" /></div>
                  </div>
                </div>

                <Notice tone="risk" title="Winter changes the answer">
                  At 3 kWh per mile, the DOE&apos;s 50% cold penalty, the need is about 8,000 kWh a day and even the
                  400 kW site needs a battery. The result is sensitive to climate.
                </Notice>
              </div>
            </section>

            {/* 04 Alternatives */}
            <section id="alternatives" aria-labelledby="alternatives-title" className="axr-section">
              <SectionHead id="alternatives" no="04" title="The alternatives test" />
              <p className="axr-prose axr-muted mb-6">
                Every option gets the same treatment. AXIVAI&apos;s rows carry no highlight; the evidence level does the work.
              </p>
              <div className="axr-table-wrap">
                <table className="axr-table">
                  <thead>
                    <tr>
                      <th scope="col">Option</th>
                      <th scope="col">Wins where</th>
                      <th scope="col">Fails where</th>
                      <th scope="col">Level</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ALTERNATIVES.map((a) => (
                      <tr key={a.option}>
                        <th scope="row" style={{ minWidth: 160 }}>{a.option}</th>
                        <td style={{ minWidth: 160 }}>{a.wins}</td>
                        <td style={{ minWidth: 160 }}>
                          {a.fails}
                          <div className="axr-caption mt-1">{a.note}</div>
                        </td>
                        <td><Evidence level={a.level} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-6">
                <Notice tone="info" title="Market warning signs">
                  Moxion (mobile batteries) filed for Chapter 7 in August 2024; Lightning eMotors went into receivership
                  and its assets went to Gillig; Lion Electric suspended its Joliet plant. These inform research question
                  7 and the under-utilisation failure mode.
                </Notice>
              </div>
            </section>

            {/* 05 Park-out */}
            <section id="park-out" aria-labelledby="park-out-title" className="axr-section">
              <SectionHead id="park-out" no="05" title="Sub-case: park-out buses" />
              <div className="grid gap-4 md:grid-cols-3">
                <div className="axr-card">
                  <div className="axr-metric-label">Scale</div>
                  <p className="mt-2 axr-small">About 1,000 park-out buses in NYC alone; the main operating model for many rural fleets.</p>
                </div>
                <div className="axr-card">
                  <div className="axr-metric-label">Home limits</div>
                  <p className="mt-2 axr-small">A 19.2 kW, 80-amp charger refills 155–220 kWh in 6–11 hours. A 100-amp home panel can&apos;t host one; portable units top out near 9.6 kW.</p>
                </div>
                <div className="axr-card">
                  <div className="axr-metric-label">Recommended fix</div>
                  <p className="mt-2 axr-small">Managed home charging where it fits, otherwise shared hubs at schools or municipal lots, e.g. above-ground modular kits.</p>
                </div>
              </div>
              <div className="axr-sunken mt-6 axr-prose flex flex-wrap items-center gap-3">
                <Evidence level="hypothesis" />
                <span className="axr-small">
                  The evidence doesn&apos;t support driving power to individual driveways. A stationed hub fits it better.
                </span>
              </div>
            </section>

            {/* 06 Permitting */}
            <section id="permitting" aria-labelledby="permitting-title" className="axr-section">
              <SectionHead id="permitting" no="06" title="Permitting can recreate the delay" />
              <div className="axr-prose space-y-4">
                <p>
                  New NYC Department of Buildings rules for battery storage took effect on 26 October 2025. A stationed
                  battery may face its own months of approvals, which is failure mode 5 in the concept paper.
                </p>
                <ul className="axr-small space-y-2 list-disc pl-5">
                  <li>Permit rules start at 1 kWh of lithium-ion capacity.</li>
                  <li>Independent peer review is mandatory for every project.</li>
                  <li>A certified person must oversee the site daily.</li>
                  <li>It is unclear whether a mobile battery discharging on site counts as stationary storage.</li>
                </ul>
                <div className="flex flex-wrap items-center gap-2">
                  <Evidence level="established" />
                  <DataTag status="verified" source="NYC DOB Bulletin 2025-009; FDNY ESS guide, via the DCAS brief" />
                  <span className="axr-caption">NYC only. Other jurisdictions unknown.</span>
                </div>
              </div>
            </section>

            {/* 07 Sources */}
            <section id="sources" aria-labelledby="sources-title" className="axr-section">
              <SectionHead id="sources" no="07" title="Sources and how far to trust them" />
              <ol className="space-y-3">
                {SOURCES.map((s, i) => (
                  <li key={s.title} className="axr-card" style={{ padding: 20 }}>
                    <div className="flex gap-3">
                      <span className="axr-section-no" aria-hidden="true">{i + 1}</span>
                      <div className="min-w-0">
                        <a href={s.href} target="_blank" rel="noopener noreferrer" className="axr-print-url font-semibold">
                          {s.title}
                        </a>
                        <p className="axr-small mt-1">{s.use}</p>
                        <p className="axr-small axr-muted mt-1">
                          <strong style={{ color: "var(--status-risk)" }}>Caution:</strong> {s.caution}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="mt-6">
                <Notice tone="risk" title="Freshness">
                  Most figures date from 2025 to early 2026. Grant and price data older than 30 days counts as Risk and
                  must be rechecked before public use. The old “eight years in PJM” figure refers to grid-export queues,
                  not depot service, and is not used here.
                </Notice>
              </div>
            </section>

            {/* 08 Open questions */}
            <section id="open-questions" aria-labelledby="open-questions-title" className="axr-section">
              <SectionHead id="open-questions" no="08" title="Open questions and data needed" />
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  ["Spare capacity at real depots", "Decides which tier a site is in."],
                  ["Utility timelines, by utility", "Months versus years changes everything."],
                  ["The cost of delay", "Missed grant deadlines, idle buses, diesel kept running."],
                  ["Supplier and rental pricing", "Mobile charging, battery rental and generator quotes."],
                  ["Real winter kWh per mile", "From operating fleets, not rated range."],
                  ["Permitting outside NYC", "How long a stationed battery takes to approve."],
                ].map(([q, why]) => (
                  <div key={q} className="axr-card flex items-start gap-3" style={{ padding: 20 }}>
                    <DataTag status="unknown" />
                    <div>
                      <div className="font-semibold">{q}</div>
                      <div className="axr-small axr-muted">{why}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="axr-cover mt-8 rounded-lg p-6 md:p-8 axr-noprint" style={{ borderRadius: 8 }}>
                <div className="axr-eyebrow">Help fill the gaps</div>
                <p className="axr-h2 mt-2">Run a depot that can&apos;t get the power it needs?</p>
                <p className="axr-small mt-2" style={{ color: "var(--warm-gray)" }}>
                  A five-minute report with rough numbers moves this research from estimates to evidence.
                </p>
                <Link
                  href="/report-a-gap"
                  className="mt-4 inline-flex items-center h-11 px-6 rounded"
                  style={{ background: "var(--accent)", color: "var(--on-accent)", textDecoration: "none", fontFamily: "var(--font-display)", fontSize: 12, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase" }}
                >
                  Report a power-access gap
                </Link>
              </div>
            </section>

            {/* 09 Next steps */}
            <section id="next-steps" aria-labelledby="next-steps-title" className="axr-section">
              <SectionHead id="next-steps" no="09" title="Proposed next steps" />
              <ol className="axr-steps axr-steps-4">
                {[
                  ["Verify", "Check the 6–8 load-bearing numbers against primary sources."],
                  ["Collect", "Gather 3–5 real depot profiles through the gap form or outreach."],
                  ["Price", "Get quotes from mobile-charging, battery-rental and generator suppliers."],
                  ["Rerun", "Repeat the worked example on the real profiles."],
                ].map(([step, text], i) => (
                  <li key={step} className="axr-step">
                    <div className="axr-step-no">Step {i + 1}</div>
                    <div className="axr-step-test">{step}</div>
                    <div className="axr-step-result">{text}</div>
                  </li>
                ))}
              </ol>
            </section>
          </main>
        </div>
      </div>

      <footer className="border-t py-10 px-4" style={{ borderColor: "var(--line)" }}>
        <div className="container mx-auto space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <Image src="/brand/axivai-wordmark.svg" alt="AXIVAI" width={1864} height={330} className="h-5 w-auto" />
              <p className="axr-eyebrow mt-3" style={{ color: "var(--ink-muted)" }}>Power anywhere. Ready when needed.</p>
            </div>
            <p className="axr-caption max-w-md">
              Research draft. Figures are illustrative analysis, not quotations, measured results or forecasts. AXIVAI
              has no operating assets, customers or validated results. © 2025–2026 Aliff Capital, LLC.
            </p>
          </div>
          <div className="axr-noprint"><LegalFooter /></div>
        </div>
      </footer>
    </div>
  );
}
