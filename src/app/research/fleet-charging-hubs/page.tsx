import type { Metadata } from "next";
import { GapCta, ReportSection, ReportShell, SourceList, type Source } from "@/components/report/layout";
import { DataTag, Metric, Notice, type Provenance } from "@/components/report/primitives";
import { ReportDiagram } from "@/components/report/ReportDiagram";
import "../report.css";

// Content source: earlier internal research on operator-owned school-bus electrification hubs,
// with every retained figure re-checked against public sources on 31 October 2026.

export const metadata: Metadata = {
  alternates: { canonical: "/research/fleet-charging-hubs" },
  title: "Shared fleet charging hubs | AXIVAI",
  description:
    "Electric bus fleets arrive in months, but grid power takes 18 months or more. How fleet charging hubs work, how long utility power really takes, and how AXIVAI delivers power by truck so the fleet runs from day one.",
};

const TOC = [
  ["what-hub", "What a hub is and solves"],
  ["findings", "What we found"],
  ["timelines", "How long power takes"],
  ["lessons", "What hubs solve, and don't"],
  ["alternatives", "The alternatives test"],
  ["axivai", "Where AXIVAI fits"],
  ["sources", "Sources"],
  ["open-questions", "What we're investigating next"],
  ["next-steps", "Next steps"],
] as const;

const FINDINGS: { claim: string; tag: Provenance; source: string; note?: string }[] = [
  {
    claim: "Con Edison put $9 million into a 12-bus electric school-bus project at an operator depot on Malta Street, Brooklyn.",
    tag: "verified",
    source: "Con Edison news release, 22 October 2024",
    note: "The release does not itemise what the $9 million pays for.",
  },
  {
    claim: "The 2024 utility release described a 500 kW solar array and a 2 MW battery at the depot. September 2026 reporting describes both as still under consideration.",
    tag: "risk",
    source: "Con Edison (2024); Canary Media and company release (September 2026)",
    note: "Status contested. Treat the battery and solar as planned, not built. No MWh figure has been published.",
  },
  {
    claim: "Phase one is complete: the above-ground charging system cost about $945,000 to install over four weeks.",
    tag: "verified",
    source: "Canary Media, 23 September 2026, citing Con Edison",
    note: "Charger installation only. It says nothing about how long utility capacity took.",
  },
  {
    claim: "The modular, above-ground design reduced construction costs.",
    tag: "estimate",
    source: "Company releases; Canary Media",
    note: "Company-stated and inconsistent: 13% (2026 release), “nearly 20%” (team estimate to press), “up to 30%” and “up to 50%” (marketing). No independent audit.",
  },
  {
    claim: "Buses at the Brooklyn depot charge off-peak under load-management software.",
    tag: "estimate",
    source: "Company release, 15 September 2026",
    note: "Company-stated. No load or bill data published.",
  },
  {
    claim: "Each power management module supports up to 25 buses; modules can be added as the fleet grows.",
    tag: "estimate",
    source: "First Charge launch release (company)",
    note: "Company-stated. Customer-side equipment; it does not add utility capacity.",
  },
  {
    claim: "One utility told federal auditors that construction could take nine months to two years; sites for 25+ buses often need a different transformer and switchgear, which take about a year.",
    tag: "verified",
    source: "EPA OIG Report 24-P-0012, December 2023",
    note: "Also reports a transformer order backlog.",
  },
  {
    claim: "EPA Clean School Bus funds cannot pay for work on the utility side of the meter.",
    tag: "verified",
    source: "EPA OIG Report 24-P-0012",
  },
  {
    claim: "Securing power for an operator-run charging project for Pittsburgh Public Schools took “a little over a year”.",
    tag: "verified",
    source: "CBS News Pittsburgh, 19 March 2025, quoting Duquesne Light",
  },
  {
    claim: "PG&E paid for infrastructure up to the meter for a 74-bus depot in Oakland, giving 2.7 MW, and delivered a year ahead of schedule.",
    tag: "verified",
    source: "PG&E Currents, 27 August 2024",
    note: "With a make-ready programme, the utility is not always the bottleneck. Different operator.",
  },
  {
    claim: "23% of New York districts say they will need electric service upgrades; 67% are still determining their needs.",
    tag: "verified",
    source: "NYSED Zero-Emission Bus Implementation Progress Report, October 2025",
    note: "Corrects a higher figure in earlier internal research.",
  },
  {
    claim: "Many New York utility make-ready programmes are refunds: the district pays upfront and is reimbursed.",
    tag: "verified",
    source: "NYSED progress report, October 2025",
  },
  {
    claim: "The operator aims for up to 10 MW of vehicle-to-grid and facility-to-grid capability “over the next couple years”.",
    tag: "estimate",
    source: "Canary Media, September 2026, quoting the operator",
    note: "An aspiration, not an installed figure.",
  },
];

// Months to get power, or for a stage of it. Low and high ends of each published range.
const TIMELINE: { label: string; sub: string; low: number; high: number; lowText: string; highText: string; source: string }[] = [
  { label: "Chargers", sub: "Brooklyn, above-ground", low: 1, high: 1, lowText: "≈1", highText: "≈1", source: "Canary Media, citing Con Edison: four weeks" },
  { label: "Transformer", sub: "25+ bus sites", low: 12, high: 12, lowText: "12", highText: "12", source: "EPA OIG 24-P-0012: about a year" },
  { label: "Power secured", sub: "Pittsburgh", low: 12, high: 13, lowText: "12", highText: "12+", source: "CBS Pittsburgh: “a little over a year”" },
  { label: "Request to power", sub: "PG&E EV projects, 2026", low: 18, high: 18, lowText: "18", highText: "18", source: "PG&E energization report to the CPUC, April 2026: 560 days on average" },
  { label: "Full process", sub: "WRI guide", low: 12, high: 24, lowText: "12", highText: "24", source: "WRI, cited in EPA OIG 24-P-0012" },
  { label: "Construction", sub: "one utility", low: 9, high: 24, lowText: "9", highText: "24", source: "EPA OIG 24-P-0012: nine months to two years" },
];

const ALTERNATIVES: { option: string; wins: string; fails: string; note: string }[] = [
  { option: "Wait for the utility upgrade", wins: "Utilities with make-ready programmes and spare equipment", fails: "Transformer backlogs; 9–24 month builds", note: "Oakland: 2.7 MW delivered a year early. Make-ready often paid as a refund." },
  { option: "Phased rollout", wins: "Start with what the current service supports", fails: "Fleet mandates or contracts that need every bus at once", note: "DOE suggests a pilot of 10 or fewer buses." },
  { option: "Managed charging", wins: "Large hubs where overnight hours exceed need", fails: "Can't create energy the service doesn't have", note: "The Brooklyn hub reports off-peak charging (company-stated)." },
  { option: "Modular above-ground chargers", wins: "Shortens the customer-side build (weeks)", fails: "Doesn't speed the utility side", note: "Four-week install in Brooklyn." },
  { option: "Stationary battery at the hub", wins: "Peak shaving, backup, slow refill on existing service", fails: "Permits; cost; still needs daily energy", note: "A 2 MW unit planned in Brooklyn; not confirmed built." },
  { option: "Temporary mobile charging", wins: "Bridging a late utility upgrade", fails: "Cost and logistics for a whole fleet every night", note: "DOE lists it; no public hub-scale costs found." },
  { option: "Generator rental", wins: "Long outages; long-duration need", fails: "Emissions, noise, fuel logistics", note: "Rental cost unknown." },
  { option: "AXIVAI delivered power", wins: "Yards waiting for grid capacity; overflow buses; backup", fails: "Sites where the grid is already available", note: "Trucks deliver energy into storage on the yard until the utility service is energised." },
];

const SOURCES: Source[] = [
  {
    title: "PowerUp NYC, School Bus Electrification research and findings memo (September 2023, archived copy)",
    href: "https://web.archive.org/web/20241112231818/https://climate.cityofnewyork.us/wp-content/uploads/2023/09/PowerUp_ResearchandFindings-Memo_School-Bus-Electrification.pdf",
    use: "Managed charging lowering the modelled fleet peak from about 10 kW to about 2 kW per bus; buses returning to vendor yards overnight.",
    caution: "Archived copy; the city’s original link now redirects. A modelling study, not measured depot results.",
  },
  {
    title: "Con Edison, “Con Edison Provides $9 Million to Jump-start First Student School Bus Electrification” (22 October 2024)",
    href: "https://www.coned.com/en/about-us/media-center/news/2024/10-22/con-edison-provides-9-million",
    use: "Utility investment, fleet size and the planned solar and battery at the Brooklyn depot.",
    caution: "Does not itemise costs or give battery energy (MWh). Later reporting says the battery and solar are still under consideration.",
  },
  {
    title: "Canary Media, “A new fleet of electric school buses hits New York City streets” (23 September 2026)",
    href: "https://www.canarymedia.com/articles/electric-vehicles/electric-school-buses-new-york-city",
    use: "Phase-one status, installation cost and time, the operator's 10 MW aim, Con Edison demand forecast, and New York's extended mandate dates.",
    caution: "News reporting; cost and time figures are attributed to Con Edison and the project team.",
  },
  {
    title: "First Student and Con Edison, phase-one press release (15 September 2026, via PR Newswire syndication)",
    href: "https://www.placera.se/pressmeddelanden/consolidated-edison-first-student-and-con-edison-advance-electric-school-bus-infrastructure-in-new-york-city-20260915",
    use: "Phase-one completion, off-peak charging, 13% cost reduction, fleet counts.",
    caution: "Company-stated. Its 13% figure differs from the ~20% reported to press.",
  },
  {
    title: "First Student, First Charge launch release and Edison Award release (April 2025)",
    href: "https://firststudentinc.com/resources/newsroom/first-student-launches-first-of-its-kind-electric-vehicle-charging-solution/",
    use: "Module size (up to 25 buses) and the charging-as-a-service offer.",
    caution: "Marketing claims (“up to 30%”, “up to 50%” savings). Neither page says units are relocatable, a claim in earlier research that is not used here.",
  },
  {
    title: "EPA Office of Inspector General, Report 24-P-0012, “The EPA Clean School Bus Program Could Be Impacted by Utility Delays” (27 December 2023)",
    href: "https://www.oversight.gov/sites/default/files/oig-reports/EPA/24-P-0012.pdf",
    use: "Utility construction times, the 25-bus transformer threshold, transformer backlogs, and the meter boundary for EPA funds.",
    caution: "Based on interviews with a small number of utilities; timelines are statements, not measured averages.",
  },
  {
    title: "CBS News Pittsburgh, Pittsburgh Public Schools debuts first electric school buses (19 March 2025)",
    href: "https://www.cbsnews.com/amp/pittsburgh/news/pittsburgh-public-schools-electric-school-buses",
    use: "A utility's statement of how long securing power took for an operator-run project.",
    caution: "One project; no MW figure given.",
  },
  {
    title: "PG&E Currents, “PG&E helps Zum deploy nation's first 100% electric school bus fleet in Oakland” (27 August 2024)",
    href: "https://www.pge.com/en/newsroom/currents/future-of-energy/articles-4040-pge-helps-zum-deploy-nations-100-electric-school-bus-fleet-oakland-new-school-year.html",
    use: "Hub-scale load (2.7 MW for 74 buses) and who paid for utility-side work.",
    caution: "Utility communication; the “year ahead of schedule” claim is not independently checked.",
  },
  {
    title: "New York State Education Department, Zero-Emission Bus Implementation Progress Report (October 2025)",
    href: "https://www.nysed.gov/sites/default/files/programs/pupil-transportation/2025-zeb-implementation-progress-report-final.pdf",
    use: "Share of districts needing service upgrades; refund-based make-ready.",
    caution: "District self-reporting; most districts had not finished their assessments.",
  },
  {
    title: "Pacific Gas and Electric Company, Biannual Energization Report to the CPUC (1 April 2026)",
    href: "https://docs.cpuc.ca.gov/PublishedDocs/Efile/G000/M604/K023/604023792.PDF",
    use: "EV charging projects (Rule 29): 560 days on average from request to power; circuit upgrades 950 days and substation upgrades 1,285 days.",
    caution: "Averages cover only projects already energised, so real waits are likely longer.",
  },
  {
    title: "New York Department of Public Service, Recommendations for Addressing Electric Vehicle Charger Load Interconnection Issues (15 June 2026)",
    href: "https://documents.dps.ny.gov/public/Common/ViewDoc.aspx?DocRefId=%7B5006CD9E-0000-CC14-A8FC-05216F6E7D58%7D",
    use: "Fleet projects take a few months upstate and a year or longer downstate; fleets arrive in months while upgrades take six months or longer.",
  },
  {
    title: "National Infrastructure Advisory Council, Addressing the Critical Shortage of Power Transformers (June 2024)",
    href: "https://www.cisa.gov/sites/default/files/2024-09/NIAC_Addressing%20the%20Critical%20Shortage%20of%20Power%20Transformers%20to%20Ensure%20Reliability%20of%20the%20U.S.%20Grid_Report_06112024_508c_pdf_0.pdf",
    use: "Transformer deliveries of two to four years, against months in 2020.",
  },
  {
    title: "U.S. Department of Energy, Electric School Bus Planning Guide",
    href: "https://afdc.energy.gov/guides/electric-school-bus",
    use: "Upgrade lead times, temporary mobile charging, managed charging, pilot sizing.",
    caution: "No costs for temporary mobile charging.",
  },
];

export default function FleetChargingHubsReport() {
  const max = 24;
  const pct = (v: number) => `${(v / max) * 100}%`;

  return (
    <ReportShell
      slug="fleet-charging-hubs"
      eyebrow="Case study"
      title="Shared fleet charging hubs"
      lead={
        <>
          The buses arrive in months. The power takes 18 months or more. AXIVAI brings the power by truck, so the
          fleet runs from day one.
        </>
      }
      meta={[
        { label: "Date", value: "31 October 2026" },
        { label: "Published by", value: "AXIVAI Research" },
      ]}
      toc={TOC}
    >
      {/* Lead figure: image first, then its headline */}
      <div className="pb-10">
        <ReportDiagram
          file="fleet-charging-hub-day.svg"
          headline="A day at a new yard with no grid connection"
          caption="The transformer is on back order, so AXIVAI trucks deliver energy into storage on the yard and every bus still leaves full."
          note="Energy figures are AXIVAI estimates for a 40-bus yard."
        />
      </div>

      {/* Summary */}
      <section aria-labelledby="summary-title" className="pb-10">
        <h2 id="summary-title" className="axr-eyebrow mb-4">Summary</h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Metric label="EV charging projects, request to power" value="560" unit="days" status="verified" source="PG&E energization report, April 2026" />
          <Metric label="Large transformer delivery" value="2–4" unit="years" status="verified" source="NIAC transformer report, June 2024" />
          <Metric label="Utility investment, Brooklyn hub" value="$9" unit="million" status="verified" source="Con Edison, October 2024" />
          <Metric label="NY districts expecting upgrades" value="23" unit="%" status="verified" source="NYSED progress report, Oct 2025 (67% undetermined)" />
        </div>
        <div className="axr-sunken mt-6 axr-prose">
          <p>
            <strong>The finding.</strong> Fleets can get buses and chargers in months, but grid power takes far longer.
            PG&amp;E&apos;s EV charging projects took 560 days on average from request to power in its April 2026
            filing, and the average has risen with every report. Large transformers take two to four years to deliver.
            New York&apos;s regulator says fleet projects take &ldquo;a year or longer downstate&rdquo;. Hubs help
            operators share one upgrade, but they wait for it like everyone else.
          </p>
          <p>
            <strong>AXIVAI&apos;s answer.</strong> Trucks deliver energy into storage on the yard, so the buses run
            from the day they arrive until the grid connection is ready.
          </p>
        </div>
      </section>

      {/* 01 What a hub is */}
      <ReportSection id="what-hub" no="01" title="What a hub is, and what it solves">
        <div className="mb-8">
          <ReportDiagram
            file="fleet-charging-hub-solves.svg"
            caption="What a hub solves: the same three districts without a hub and with one, benefit by benefit. Figures from the table in section 02."
          />
        </div>
        <div className="axr-prose space-y-4">
          <p className="axr-lead">
            A charging hub is a bus company&apos;s yard, electrified at fleet scale.
          </p>
          <p>
            The yard is owned or leased by the bus operator, and its buses serve several districts under contract.
            Buses park there overnight and charge while parked; drivers report there each morning, as they do today,
            and leave with a full battery. No one makes an extra trip to charge. The bus company applies to the
            utility and pays for the chargers. The district buys the transport service and never deals with the
            utility.
          </p>
          <p>
            The largest North American school-bus contractor, First Student, has built hubs of this kind. Its most
            documented example is a depot on Malta Street in Brooklyn, co-funded by Con Edison. The company says its
            charging system sits above ground in factory-built modules of up to 25 buses each, so it avoids trenching
            and can grow by adding modules. It also offers districts charging as a monthly service.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 mt-6">
          <div className="axr-card">
            <h3 className="axr-h2 mb-3">The costly problem a hub solves</h3>
            <ul className="axr-small space-y-2 list-disc pl-5">
              <li><strong>One grid upgrade instead of many.</strong> Every depot that electrifies needs its own utility work, often a new transformer and switchgear taking 9 to 24 months. A hub goes through it once for many fleets.</li>
              <li><strong>Scale gets the utility to pay.</strong> Con Edison put $9 million into the Brooklyn hub; PG&amp;E paid the utility side of a 2.7 MW depot in Oakland.</li>
              <li><strong>More buses per kilowatt.</strong> Spread across a large fleet, managed charging cut the modelled peak from about 10 kW to about 2 kW per bus in NYC&apos;s study.</li>
              <li><strong>Cheaper, faster chargers.</strong> Above-ground modules went in within about four weeks in Brooklyn and grow with the contracts.</li>
              <li><strong>No upfront cost for districts.</strong> The operator owns the chargers and can recover them through its contract or a monthly charging fee.</li>
            </ul>
          </div>
          <div className="axr-card">
            <h3 className="axr-h2 mb-3">What isn&apos;t published yet</h3>
            <ul className="axr-small space-y-2 list-disc pl-5">
              <li>No public source compares the cost per bus of a hub with electrifying each depot separately.</li>
              <li>The operator&apos;s own savings figures range from 13% to &ldquo;up to 50%&rdquo; and are company-stated.</li>
              <li>A hub does not shorten the utility wait, and a hub far from a district&apos;s routes adds empty miles at both ends of the day.</li>
            </ul>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3 mt-6">
          <div className="axr-card">
            <div className="axr-metric-label">Grid side</div>
            <p className="mt-2 axr-small">A utility service sized for the whole fleet: transformer, switchgear and often feeder work. Paid largely by the utility through make-ready or co-investment.</p>
          </div>
          <div className="axr-card">
            <div className="axr-metric-label">Customer side</div>
            <p className="mt-2 axr-small">Chargers, cabling and power modules. Installed in four weeks in Brooklyn above ground, according to Con Edison.</p>
          </div>
          <div className="axr-card">
            <div className="axr-metric-label">Optional layers</div>
            <p className="mt-2 axr-small">Load-management software, a stationary battery, on-site solar and two-way charging. In Brooklyn the battery and solar are still planned.</p>
          </div>
        </div>
      </ReportSection>

      {/* 02 Findings */}
      <ReportSection id="findings" no="02" title="What we found">
        <div className="axr-table-wrap">
          <table className="axr-table">
            <caption>Each finding with its figure and source.</caption>
            <thead>
              <tr>
                <th scope="col">Finding</th>
                <th scope="col">Figure</th>
                <th scope="col">Source</th>
              </tr>
            </thead>
            <tbody>
              {FINDINGS.map((r) => (
                <tr key={r.claim}>
                  <td style={{ minWidth: 260 }}>
                    {r.claim}
                    {r.note && <div className="axr-caption mt-1">{r.note}</div>}
                  </td>
                  <td><DataTag status={r.tag} source={r.source} /></td>
                  <td className="axr-muted" style={{ minWidth: 180 }}>{r.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6">
          <Notice tone="info" title="Not yet published">
            No public source gives the Brooklyn hub&apos;s service size in MW, when its utility capacity was requested,
            or how long it took to energise.
          </Notice>
        </div>
      </ReportSection>

      {/* 03 Timelines */}
      <ReportSection id="timelines" no="03" title="How long the power takes">
        <div className="space-y-6">
          <figure className="axr-chart axr-card" aria-labelledby="timeline-chart-title">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div id="timeline-chart-title" className="axr-h2">Chargers go in within weeks; utility power takes a year or more</div>
                <p className="axr-caption mt-1">Months. Each row shows the low and high end of the published range.</p>
              </div>
              <div className="axr-legend" aria-hidden="true">
                <span className="axr-legend-item">
                  <span className="axr-swatch" style={{ background: "var(--accent-ink)" }} />
                  Low end
                </span>
                <span className="axr-legend-item">
                  <span className="axr-swatch" style={{ background: "var(--gold)" }} />
                  High end
                </span>
              </div>
            </div>
            <div className="axr-chart-rows">
              {TIMELINE.map((t) => (
                <div key={t.label} className="axr-chart-row">
                  <div className="axr-chart-label">
                    {t.label}
                    <span>{t.sub}</span>
                  </div>
                  <div className="axr-plot">
                    {(
                      [
                        ["overnight", t.low, t.lowText, "low end"],
                        ["day", t.high, t.highText, "high end"],
                      ] as const
                    ).map(([key, v, text, name]) => (
                      <div key={key} className="axr-bar-track">
                        <div
                          className={`axr-bar axr-bar-${key}`}
                          style={{ width: pct(v) }}
                          role="img"
                          aria-label={`${t.label}, ${t.sub}, ${name}: ${text} months. ${t.source}`}
                        >
                          <span className="axr-bar-value" aria-hidden="true">{text} mo</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="axr-axis" aria-hidden="true">
              <div />
              <div className="axr-axis-ticks">
                {[0, 6, 12, 18, 24].map((m) => (
                  <span key={m} style={{ left: pct(m) }}>{m}</span>
                ))}
              </div>
            </div>
            <figcaption className="axr-caption mt-6">
              DOE&apos;s planning guide adds that larger grid upgrades &ldquo;can take years&rdquo;. See the table below
              for sources.
            </figcaption>
          </figure>

          <div className="axr-table-wrap">
            <table className="axr-table">
              <caption>Table view of the chart.</caption>
              <thead>
                <tr>
                  <th scope="col">Stage</th>
                  <th scope="col" className="axr-num">Months</th>
                  <th scope="col">Source</th>
                </tr>
              </thead>
              <tbody>
                {TIMELINE.map((t) => (
                  <tr key={t.label}>
                    <th scope="row">{t.label} <span className="axr-muted">· {t.sub}</span></th>
                    <td className="axr-num">{t.lowText === t.highText ? t.lowText : `${t.lowText}–${t.highText}`}</td>
                    <td className="axr-muted">{t.source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Notice tone="assumption" title="How big the loads get">
            PG&amp;E built 2.7 MW for a 74-bus depot. For scale: 100 buses on 19.2 kW Level 2 chargers
            would draw about 1.9 MW if all charged at once. Managed charging lowers that peak, but the federal auditors
            found that sites above about 25 buses often need new transformers and switchgear regardless.
            <span className="ml-2"><DataTag status="estimate" source="100 × 19.2 kW" /></span>
          </Notice>
        </div>
      </ReportSection>

      {/* 04 Lessons */}
      <ReportSection id="lessons" no="04" title="What hubs solve, and what they don't">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="axr-card">
            <h3 className="axr-h2 mb-3">Where a hub solves the problem itself</h3>
            <ul className="axr-small space-y-2 list-disc pl-5">
              <li><strong>Scale earns utility attention.</strong> A multi-megawatt load with a creditworthy operator attracted $9 million of utility investment in Brooklyn and fully paid utility-side work in Oakland.</li>
              <li><strong>Customer-side work gets fast.</strong> Factory-built, above-ground chargers went in within four weeks.</li>
              <li><strong>Managed charging stretches the service.</strong> Long overnight windows let one connection serve more buses.</li>
              <li><strong>Growth by module.</strong> Up to 25 buses per module, added as contracts arrive (company-stated).</li>
            </ul>
            <p className="axr-small axr-muted mt-3">Where the grid delivers on time, it is the cheapest answer, and AXIVAI stays out of the way.</p>
          </div>
          <div className="axr-card">
            <h3 className="axr-h2 mb-3">Where the grid can&apos;t deliver yet</h3>
            <ul className="axr-small space-y-2 list-disc pl-5">
              <li><strong>The wait itself.</strong> Utility construction of 9 to 24 months, and about a year for a new transformer, still applies to the hub.</li>
              <li><strong>Smaller operators and districts.</strong> Refund-based make-ready means paying upfront; NYSED expects many districts to borrow, which needs voter approval.</li>
              <li><strong>Overflow.</strong> When contracts grow faster than the service, extra buses have nowhere to charge until the next upgrade.</li>
              <li><strong>Resilience.</strong> One service feeds the whole fleet. Brooklyn&apos;s planned 2 MW battery is not yet confirmed built.</li>
            </ul>
            <p className="axr-small axr-muted mt-3">Each is a window AXIVAI is designed to fill.</p>
          </div>
        </div>
        <div className="mt-6">
          <ReportDiagram
            file="fleet-charging-hub-gaps.svg"
            caption="The four things a well-run hub does not solve, and where AXIVAI comes in. Section 06 covers the wait in detail."
          />
        </div>
        <div className="mt-6">
          <Notice tone="info" title="Who pays">
            Utilities often pay for the grid side through make-ready programmes or direct investment. EPA Clean School
            Bus funds stop at the meter. Operators pay for chargers and can recover them through charging-as-a-service
            fees. Districts that own their fleets may have to front the cost and wait for refunds.
          </Notice>
        </div>
      </ReportSection>

      {/* 05 Alternatives */}
      <ReportSection id="alternatives" no="05" title="The alternatives test at hub scale">
        <p className="axr-prose axr-muted mb-6">
          Every option is tested the same way. AXIVAI wins where the options above it can&apos;t deliver in time.
        </p>
        <div className="axr-table-wrap">
          <table className="axr-table">
            <thead>
              <tr>
                <th scope="col">Option</th>
                <th scope="col">Wins where</th>
                <th scope="col">Fails where</th>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ReportSection>

      {/* 06 AXIVAI */}
      <ReportSection id="axivai" no="06" title="Where AXIVAI fits">
        <div className="mb-6">
          <ReportDiagram
            file="depot-power-waiting-gap.svg"
            caption="The gap between ready buses and grid power. Timings are published ranges."
          />
        </div>
        <div className="axr-prose space-y-4">
          <p className="axr-lead">The wait is the market.</p>
          <p>
            Buses and chargers arrive in months. Grid power does not: PG&amp;E&apos;s EV charging projects took 560 days
            on average from request to power in its April 2026 filing, substation upgrades took 1,285 days, and large
            transformers take two to four years to deliver. New York&apos;s regulator reports fleet projects taking a
            year or longer downstate. Every one of those days is a bus that can&apos;t run on electricity.
          </p>
          <p>
            AXIVAI fills that window. Trucks fill up where power is already available and deliver it into storage
            installed on the yard; the yard&apos;s chargers draw from that storage every night. When the utility
            service is energised, the deliveries stop and the storage can stay on as backup. Where the grid is already
            there, it is the cheaper answer, and AXIVAI doesn&apos;t compete with it.
          </p>
        </div>
        <h3 className="axr-h2 mt-8 mb-4">A 40-bus yard, one night</h3>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Metric label="Fleet need" value="≈4" unit="MWh" status="estimate" source="About 100 kWh per bus per night" />
          <Metric label="Storage on the yard" value="≈4" unit="MWh" status="estimate" source="AXIVAI planning figure" />
          <Metric label="Energy per trailer" value="2" unit="MWh" status="estimate" source="AXIVAI planning figure" />
          <Metric label="Deliveries per night" value="2" status="estimate" source="4 MWh ÷ 2 MWh per trailer" />
        </div>
        <div className="axr-card mt-6">
          <h3 className="axr-h2 mb-3">What a pilot will prove</h3>
          <ul className="axr-small space-y-2 list-disc pl-5">
            <li><strong>Every bus out on time.</strong> Nightly deliveries keep a full fleet charged through the wait.</li>
            <li><strong>Cost against the alternative.</strong> Delivered power per kWh against running diesel buses until the grid arrives.</li>
            <li><strong>Speed to site.</strong> How quickly storage and chargers go in compared with the utility service.</li>
            <li><strong>Length of the window.</strong> How long real sites wait, and so how long each deployment runs.</li>
          </ul>
        </div>
        <p className="axr-small axr-muted mt-4">AXIVAI is preparing its first pilot sites.</p>
      </ReportSection>

      {/* 07 Sources */}
      <ReportSection id="sources" no="07" title="Sources">
        <p className="axr-small axr-muted mb-4">
          Every figure in this report was checked against the public sources below.
        </p>
        <SourceList sources={SOURCES} />
        <div className="mt-6">
          <Notice tone="info" title="Recent policy changes">
            New York has pushed its all-electric deadline to 2040, according to Canary Media. The federal 30C charging
            credit expired on 30 June 2026.
          </Notice>
        </div>
      </ReportSection>

      {/* 08 Open questions */}
      <ReportSection id="open-questions" no="08" title="What we&apos;re investigating next">
        <div className="grid gap-4 md:grid-cols-2">
          {[
            ["Hub service size in MW", "No operator hub has published its service capacity."],
            ["Time from request to energisation", "When capacity was asked for, and when it arrived."],
            ["What happened during the wait", "Diesel kept running, phased buses, temporary power?"],
            ["Who paid, and how much", "The split between utility, operator, grant and district."],
            ["Smaller operators’ access", "How many lack the capital or credit to front upgrades."],
            ["Battery and backup in practice", "Whether planned hub batteries are built and used in outages."],
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
        <GapCta
          title="Waiting on power for a depot or hub?"
          body="Tell us how long you're waiting, how many buses you need to charge and what you're doing meanwhile. Five minutes; rough numbers are fine."
        />
      </ReportSection>

      {/* 09 Next steps */}
      <ReportSection id="next-steps" no="09" title="Next steps">
        <ol className="axr-steps axr-steps-4">
          {[
            ["Search filings", "Look for utility rate-case and make-ready filings that give hub MW and dates."],
            ["Collect", "Gather 3–5 hub or depot timelines through the gap form or outreach."],
            ["Compare", "Set each wait against managed charging, phasing and temporary power."],
            ["Pilot", "Start delivered power at the first site where the wait is longest."],
          ].map(([step, text], i) => (
            <li key={step} className="axr-step">
              <div className="axr-step-no">Step {i + 1}</div>
              <div className="axr-step-test">{step}</div>
              <div className="axr-step-result">{text}</div>
            </li>
          ))}
        </ol>
      </ReportSection>
    </ReportShell>
  );
}
