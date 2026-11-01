import type { Metadata } from "next";
import { GapCta, ReportSection, ReportShell, SourceList, type Source } from "@/components/report/layout";
import { DataTag, Metric, Notice, type Provenance } from "@/components/report/primitives";
import { ReportDiagram } from "@/components/report/ReportDiagram";
import "../report.css";

// Content source: earlier internal case research, rewritten and re-checked against public sources (31 October 2026).

export const metadata: Metadata = {
  alternates: { canonical: "/research/white-plains-v2g" },
  title: "Vehicle-to-grid at White Plains | AXIVAI",
  description:
    "What New York's first electric school-bus vehicle-to-grid pilot showed about buses as grid batteries, what it didn't, and why V2G doesn't solve a depot that can't get power in.",
};

const TOC = [
  ["pilot", "The pilot in brief"],
  ["demonstrated", "What it demonstrated"],
  ["missing", "What it did not show"],
  ["alternatives", "V2G in the alternatives test"],
  ["market", "The market lesson"],
  ["axivai", "What it means for AXIVAI"],
  ["sources", "Sources"],
  ["next-steps", "Next steps"],
] as const;

const EVIDENCE_ROWS: { claim: string; tag: Provenance; source: string; note?: string }[] = [
  {
    claim: "Five electric school buses carried elementary students; three were fitted with power converters for bidirectional charging at a depot in North White Plains.",
   
    tag: "verified",
    source: "Con Edison findings release, April 2022",
    note: "The 2018 plan had all five buses providing grid storage.",
  },
  {
    claim: "Plan: from 15 June to 31 August, buses parked as grid storage, discharging daily 1–7 pm at 15 kW each (75 kW combined) for three summers, 2019–2021.",
   
    tag: "verified",
    source: "Con Edison REV demonstration outline, June 2018",
    note: "A plan, not a result. Planned maximum: about 450 kWh a day, roughly 35 MWh a summer.",
  },
  {
    claim: "Reported export power: 10 kW from each bus, on nights and weekends.",
   
    tag: "estimate",
    source: "CleanTechnica, December 2020, quoting the project description",
    note: "Conflicts with the 15 kW plan. With three V2G buses, about 30 kW in total.",
  },
  {
    claim: "About 85% of the energy discharged from the batteries reached the grid, beating the project target.",
   
    tag: "verified",
    source: "Con Edison findings release, April 2022",
    note: "Target of 82% reported in a secondary case study citing Con Edison's Q1 2022 progress report.",
  },
  {
    claim: "On days when export was scheduled, buses were available to export on 55% of them. Technology integration was the most common cause.",
   
    tag: "estimate",
    source: "Ecology Action Centre case study, citing Con Edison's Q1 2022 progress report",
    note: "The 2018 plan targeted 95% V2G uptime. Primary report not retrieved.",
  },
  {
    claim: "For school transport, bus availability was “almost the same” as diesel buses; buses averaged 1.4 kWh per mile, meeting the goal.",
   
    tag: "verified",
    source: "Con Edison findings release, April 2022",
    note: "A transport result, not a grid-export result. No percentage published.",
  },
  {
    claim: "Using the batteries for grid support degrades them as driving does; future V2G may need extended warranties or earlier battery replacement.",
   
    tag: "verified",
    source: "Con Edison findings release, April 2022",
    note: "A secondary summary says the V2G buses used and degraded about twice as much as control buses over one year. Not confirmed at source.",
  },
  {
    claim: "V2G did not continue at the depot: no interconnection agreement was in place when the project was completed.",
   
    tag: "verified",
    source: "School Transportation News, April 2022",
    note: "Reported as the bus operator's decision. No further explanation published.",
  },
];

const PLAN_VS_RESULT: { metric: string; planned: number; result: number; plannedLabel: string; resultLabel: string; tag: Provenance }[] = [
  { metric: "Buses with V2G", planned: 100, result: 60, plannedLabel: "5 of 5", resultLabel: "3 of 5", tag: "verified" },
  { metric: "Available to export", planned: 95, result: 55, plannedLabel: "95%", resultLabel: "55%", tag: "estimate" },
  { metric: "Energy reaching grid", planned: 82, result: 85, plannedLabel: "82%", resultLabel: "85%", tag: "verified" },
];

const UNKNOWNS: [string, string][] = [
  ["Energy exported", "No total kWh or MWh sent to the grid has been published for any summer."],
  ["Events and hours", "How many discharge events were called, how long each ran, and at what power."],
  ["Value per bus", "No compensation rate, revenue or avoided cost per bus has been disclosed. Grid revenue went to the utility under the demonstration design."],
  ["The interconnection gap", "What agreement was missing, what it would have required, and what it would have cost."],
  ["Programme cost", "The V2G hardware and management budget is not in the public copy of the plan."],
  ["Battery wear, measured", "Capacity and range data behind the degradation finding."],
  ["Seasonality in practice", "Whether summer-only export, as planned, or year-round export, as later described, actually ran."],
  ["What happened next", "Whether the buses still run, and whether the bidirectional hardware is used for anything."],
];

const IMPORT_EXPORT: { question: string; importSide: string; exportSide: string }[] = [
  {
    question: "What it is",
    importSide: "Power flowing from the grid into the depot to charge buses.",
    exportSide: "Power flowing from bus batteries back to the grid.",
  },
  {
    question: "What limits it",
    importSide: "Service, transformer and feeder capacity: the depot's spare kW.",
    exportSide: "Interconnection approval for a grid-parallel source, plus a compensation route.",
  },
  {
    question: "Review route in New York",
    importSide: "Utility new-service or upgrade process.",
    exportSide: "Storage of 5 MW or less connected in parallel falls under the state's Standardized Interconnection Requirements. How bidirectional buses are treated is not confirmed here.",
  },
  {
    question: "Does V2G change it?",
    importSide: "No. Exporting adds no import capacity, and energy exported must be bought back before the morning run.",
    exportSide: "Yes. V2G is what creates the need for this review.",
  },
  {
    question: "What White Plains showed",
    importSide: "Nothing: the plan describes the depot's network as unconstrained.",
    exportSide: "Export worked technically; continuing it stalled on an interconnection agreement.",
  },
];

const ALTERNATIVES: { option: string; wins: string; fails: string; note: string }[] = [
  { option: "Managed charging", wins: "Depots with enough spare kW over the night", fails: "Can't create import capacity the site lacks", note: "Same answer as in the depot research case." },
  { option: "Stationary battery on existing service", wins: "Depots short of peak kW but not of daily energy", fails: "Needs spare capacity across the day, plus permits", note: "Can run import-only, avoiding export review." },
  { option: "Wait for the utility upgrade", wins: "Short or subsidised delays", fails: "Multi-year delays", note: "The permanent fix for import capacity." },
  { option: "V2G on the buses", wins: "Depots that already have enough import capacity and a grid programme to sell into", fails: "Depots that can't get power in; reliability; unproven value per bus", note: "White Plains: technically worked, 55% export availability, no published value, stopped at interconnection." },
  { option: "Vehicle-to-building", wins: "Resilience or demand-charge cuts at the depot itself", fails: "Still drains energy the buses need; no added import", note: "Not tested at White Plains." },
  { option: "AXIVAI delivered power, import-only", wins: "Depots waiting on the utility for import capacity", fails: "Sites where the utility can deliver on time", note: "Trucks fill on-site storage; it never exports, and it leaves when the grid arrives." },
];

const SOURCES: Source[] = [
  {
    title: "Con Edison, “Con Edison and partners go to school with findings from e-school bus project” (12 April 2022)",
    href: "https://www.coned.com/en/about-us/media-center/news/2022/04-12/con-edison-and-partners-go-to-school-with-findings-from-e-school-bus-project",
    use: "Primary source for the fleet, the three V2G buses, 85% energy to grid, 1.4 kWh per mile and the battery-wear finding.",
    caution: "A utility press release. Qualitative on availability and satisfaction; no kWh, revenue or cost figures.",
  },
  {
    title: "Con Edison, REV Demonstration Project Outline: Electric School Bus V2G (8 June 2018), NY PSC Case 14-M-0101",
    href: "https://files.modelclimatelaws.org/wp-content/uploads/2020/06/94DA14CE-371B-415B-BFBB-D54B2EFD74A1.pdf",
    use: "The plan: 15 kW per bus, six-hour summer window, success metrics, cost and revenue sharing, and an unconstrained local network.",
    caution: "A plan filed before the pilot, not results. Copy hosted by a third party; the budget section is not in it.",
  },
  {
    title: "School Transportation News, “Findings announced from New York State electric school bus project” (April 2022)",
    href: "https://stnonline.com/news/findings-announced-from-new-york-state-electric-school-bus-project/",
    use: "The only public statement that V2G stopped because no interconnection agreement was in place; early hardware reliability problems.",
    caution: "One sentence, unexplained. Don't infer fault or cost from it.",
  },
  {
    title: "Ecology Action Centre, Electric School Bus V2G Case Studies: White Plains, NY (2026)",
    href: "https://ecologyaction.ca/sites/default/files/2026-05/EAC_ESB%20V2G%20Case%20Studies_White%20Plains.pdf",
    use: "55% availability on scheduled export days, the 82% efficiency target and the degradation comparison.",
    caution: "Secondary; cites Con Edison quarterly progress reports this review could not retrieve. Tagged as estimates.",
  },
  {
    title: "CleanTechnica, “New York V2G project using 5 electric school buses is live” (11 December 2020)",
    href: "https://cleantechnica.com/2020/12/11/new-york-v2g-project-using-5-electric-school-buses-is-live/",
    use: "Reported 10 kW per bus, nights and weekends.",
    caution: "Trade press quoting the project description. Conflicts with the 15 kW plan and the three-bus result.",
  },
  {
    title: "NY Department of Public Service, Standardized Interconnection Requirements",
    href: "https://dps.ny.gov/distributed-generation-information",
    use: "Scope: generation and storage of 5 MW or less connected in parallel with distribution systems.",
    caution: "The page says nothing specific about vehicles or V2G.",
  },
  {
    title: "Nuvve Holding Corp., press release furnished with Form 8-K (18 December 2025)",
    href: "https://www.sec.gov/Archives/edgar/data/1836875/000183687525000199/nuvveshareholderletterprfi.htm",
    use: "The pilot's V2G technology provider expanded its focus to stationary energy storage and microgrids.",
    caution: "A company statement of strategy.",
  },
  {
    title: "Nuvve Holding Corp., Form 10-Q for the quarter ended 31 March 2025",
    href: "https://www.sec.gov/Archives/edgar/data/1836875/000183687525000102/nvve-20250331.htm",
    use: "Going-concern disclosure.",
    caution: "Point-in-time. Later filings may differ; recheck before public use.",
  },
  {
    title: "Con Edison, “Con Edison provides $9 million to jump-start First Student school bus electrification in Brooklyn” (22 October 2024)",
    href: "https://www.coned.com/en/about-us/media-center/news/2024/10-22/con-edison-provides-9-million",
    use: "A later depot project pairing 12 buses with a 500 kW solar array and a depot battery.",
    caution: "Battery stated as 2 megawatts; Canary Media reports 2 megawatt-hours. Unit unresolved.",
  },
  {
    title: "Canary Media, “New York City tests a solar-powered electric-school-bus microgrid” (2024)",
    href: "https://canarymedia.com/articles/ev-charging/new-york-city-tests-a-solar-powered-electric-school-bus-microgrid",
    use: "Local grid congestion led the operator to look at on-site power; bidirectional capability planned.",
    caution: "News report. Export capability described as planned, not demonstrated.",
  },
  {
    title: "PG&E, Biannual Energization Report, CPUC R.24-01-018 (1 April 2026)",
    href: "https://docs.cpuc.ca.gov/PublishedDocs/Efile/G000/M604/K023/604023792.PDF",
    use: "Rule 29 EV infrastructure projects: 560 days on average from application to energization.",
  },
  {
    title: "NY Department of Public Service, Recommendations for Addressing EV Charger Load Interconnection Issues (15 June 2026)",
    href: "https://documents.dps.ny.gov/public/Common/ViewDoc.aspx?DocRefId=%7B5006CD9E-0000-CC14-A8FC-05216F6E7D58%7D",
    use: "Transportation electrification timelines: a few months upstate, a year or longer downstate.",
  },
];

export default function WhitePlainsV2GReport() {
  return (
    <ReportShell
      slug="white-plains-v2g"
      eyebrow="Case study"
      title="Vehicle-to-grid at White Plains"
      lead={
        <>
          New York&apos;s first school-bus vehicle-to-grid pilot proved buses can send power back to the grid. What did
          it show about reliability, value and connection, and does V2G help a depot that can&apos;t get power in?
        </>
      }
      meta={[
        { label: "Date", value: "31 October 2026" },
        { label: "Published by", value: "AXIVAI Research" },
      ]}
      toc={TOC}
    >
      {/* Summary */}
      <section aria-labelledby="summary-title" className="pb-10">
        <h2 id="summary-title" className="axr-eyebrow mb-4">Summary</h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Metric label="Buses fitted for V2G" value="3" unit="of 5" status="verified" source="Con Edison, April 2022" />
          <Metric label="Battery energy reaching grid" value="85" unit="%" status="verified" source="Con Edison, April 2022" />
          <Metric label="Available on scheduled export days" value="55" unit="%" status="estimate" source="EAC case study citing Con Edison Q1 2022 report" />
          <Metric label="Grid value per bus, disclosed" value="None" status="unknown" source="No partner published kWh exported or revenue" />
        </div>
        <div className="axr-sunken mt-6 axr-prose">
          <p>
            <strong>Finding.</strong> The pilot showed that school buses can export power efficiently. It did not show
            that they can do so reliably, how much energy they delivered, or what that was worth. Export stopped when
            the project ended, for want of an interconnection agreement. None of this bears on a depot that
            can&apos;t get enough power in: V2G is an export tool, and export connection is a separate problem from
            depot service.
          </p>
          <p className="axr-small axr-muted">
            The pilot&apos;s V2G technology provider has since expanded its focus to stationary storage, which points
            the same way.
          </p>
        </div>
      </section>

      {/* 01 Pilot */}
      <ReportSection id="pilot" no="01" title="The pilot in brief">
        <div className="axr-prose space-y-4">
          <p className="axr-lead">
            A utility demonstration under New York&apos;s Reforming the Energy Vision proceeding, run from 2018 to 2022
            with five electric school buses serving White Plains elementary schools.
          </p>
          <p className="axr-muted">
            The idea: school buses sit idle in summer, exactly when the grid peaks. Parked and plugged in, they could
            act as grid batteries and earn their operator a second income, improving the cost of owning an electric
            bus.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3 mt-6">
          <div className="axr-card">
            <div className="axr-metric-label">Who did what</div>
            <p className="mt-2 axr-small">
              Con Edison (utility, V2G costs), National Express (bus owner and operator), Lion Electric (buses), First
              Priority Group Electrified (project developer), Nuvve (V2G technology), NYSERDA (vehicle funding).
            </p>
          </div>
          <div className="axr-card">
            <div className="axr-metric-label">The planned operation</div>
            <p className="mt-2 axr-small">
              15 June to 31 August: buses out of service, discharging 1–7 pm at 15 kW each and recharging 11 pm–5 am.
              Three summers, 2019–2021.
            </p>
            <div className="mt-3"><DataTag status="verified" source="Con Edison REV demonstration outline, June 2018" /></div>
          </div>
          <div className="axr-card">
            <div className="axr-metric-label">Who kept the grid value</div>
            <p className="mt-2 axr-small">
              The utility kept summer grid revenue and paid the operator for the right to use the buses. The operator
              kept transport revenue.
            </p>
            <div className="mt-3"><DataTag status="verified" source="Con Edison REV demonstration outline, June 2018" /></div>
          </div>
        </div>
        <div className="mt-6">
          <Notice tone="info" title="An unconstrained site, by design">
            The plan states that the depot&apos;s part of the network &ldquo;does not currently experience
            constraints&rdquo;. Load relief was on a demonstration basis, so the pilot could not show grid value where
            it would matter most.
          </Notice>
        </div>
      </ReportSection>

      {/* 02 Demonstrated */}
      <ReportSection id="demonstrated" no="02" title="What it demonstrated">
        <div className="axr-table-wrap">
          <table className="axr-table">
            <thead>
              <tr>
                <th scope="col">Claim</th>
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
                  <td><DataTag status={r.tag} source={r.source} /></td>
                  <td className="axr-muted" style={{ minWidth: 180 }}>{r.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <figure className="axr-chart axr-card mt-8" aria-labelledby="plan-chart-title">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div id="plan-chart-title" className="axr-h2">Planned versus reported</div>
              <p className="axr-caption mt-1">Percent. Hover or focus a bar for detail.</p>
            </div>
            <div className="axr-legend" aria-hidden="true">
              <span className="axr-legend-item">
                <span className="axr-swatch" style={{ background: "var(--accent-ink)" }} />
                Plan or target
              </span>
              <span className="axr-legend-item">
                <span className="axr-swatch" style={{ background: "var(--gold)" }} />
                Reported
              </span>
            </div>
          </div>
          <div className="axr-chart-rows">
            {PLAN_VS_RESULT.map((r) => (
              <div key={r.metric} className="axr-chart-row">
                <div className="axr-chart-label">
                  {r.metric}
                  <span>{r.tag === "verified" ? "verified" : "estimate"}</span>
                </div>
                <div className="axr-plot">
                  {(
                    [
                      ["overnight", r.planned, r.plannedLabel, "Plan or target"],
                      ["day", r.result, r.resultLabel, "Reported"],
                    ] as const
                  ).map(([cls, v, label, name]) => (
                    <div key={cls} className="axr-bar-track">
                      <div
                        className={`axr-bar axr-bar-${cls}`}
                        style={{ width: `${v * 0.85}%` }}
                        tabIndex={0}
                        role="img"
                        aria-label={`${r.metric}, ${name}: ${label}`}
                      >
                        <span className="axr-bar-value" aria-hidden="true">{label}</span>
                        <span className="axr-tip" aria-hidden="true">
                          <strong>{r.metric} · {name}</strong>
                          <br />
                          {label}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <figcaption className="axr-caption mt-6">
            The 95% target was &ldquo;V2G uptime&rdquo;; the 55% is availability on scheduled export days. The
            definitions may not match exactly. See the table below.
          </figcaption>
        </figure>

        <div className="axr-table-wrap mt-6">
          <table className="axr-table">
            <caption>Table view of the chart.</caption>
            <thead>
              <tr>
                <th scope="col">Measure</th>
                <th scope="col" className="axr-num">Plan or target</th>
                <th scope="col" className="axr-num">Reported</th>
                <th scope="col">Figure</th>
              </tr>
            </thead>
            <tbody>
              {PLAN_VS_RESULT.map((r) => (
                <tr key={r.metric}>
                  <th scope="row">{r.metric}</th>
                  <td className="axr-num">{r.plannedLabel}</td>
                  <td className="axr-num">{r.resultLabel}</td>
                  <td><DataTag status={r.tag} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid gap-4 md:grid-cols-2 mt-6">
          <div className="axr-card">
            <h3 className="axr-h2 mb-2">Shown</h3>
            <p className="axr-small">
              Buses can export power through an off-board inverter with modest losses, and can do it while still
              covering their routes. As a technology class, school-bus V2G is feasible.
            </p>
          </div>
          <div className="axr-card">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <h3 className="axr-h2">Not shown</h3>
              <DataTag status="unknown" />
            </div>
            <p className="axr-small">
              Dependable export (55% is far from the 95% target), energy delivered, value per bus, or a connection
              route that outlasts the demonstration.
            </p>
          </div>
        </div>
      </ReportSection>

      {/* 03 Missing */}
      <ReportSection id="missing" no="03" title="What it did not show">
        <p className="axr-prose axr-muted mb-6">
          A three-year pilot with three V2G buses left most of the numbers a buyer would need unpublished. The gaps
          are a finding in their own right.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {UNKNOWNS.map(([q, why]) => (
            <div key={q} className="axr-card flex items-start gap-3" style={{ padding: 20 }}>
              <DataTag status="unknown" />
              <div>
                <div className="font-semibold">{q}</div>
                <div className="axr-small axr-muted">{why}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <Notice tone="assumption" title="What the plan said value might be">
            The 2018 outline put the value at about $27,000 per bus from a demand-management programme paying $1,350
            per kW, and about $38,000 net present value per bus in a high-value network location, assuming ten-year
            commitments and constrained sites. The pilot reported nothing to test them against. <DataTag status="verified" source="Con Edison REV demonstration outline, June 2018" />
          </Notice>
        </div>
      </ReportSection>

      {/* 04 Alternatives */}
      <ReportSection id="alternatives" no="04" title="V2G in the alternatives test">
        <div className="axr-prose space-y-4 mb-6">
          <p className="axr-lead">
            Two different connections are easy to confuse: power coming into a depot, and power going out of it.
          </p>
          <p className="axr-muted">
            AXIVAI solves the first: a depot that can&apos;t get enough import capacity in time. V2G is about the
            second. An earlier source in our depot research mixed up export-connection delays
            with depot service; this case shows why they need to be kept apart.
          </p>
        </div>
        <div className="mb-6">
          <ReportDiagram
            file="white-plains-v2g-import-export.svg"
            caption="Import and export are separate connections with separate approvals. Figures from the White Plains pilot; see the table above."
          />
        </div>
        <div className="axr-table-wrap">
          <table className="axr-table">
            <thead>
              <tr>
                <th scope="col">Question</th>
                <th scope="col">Import: charging the fleet</th>
                <th scope="col">Export: V2G</th>
              </tr>
            </thead>
            <tbody>
              {IMPORT_EXPORT.map((r) => (
                <tr key={r.question}>
                  <th scope="row" style={{ minWidth: 140 }}>{r.question}</th>
                  <td style={{ minWidth: 200 }}>{r.importSide}</td>
                  <td style={{ minWidth: 200 }}>{r.exportSide}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="axr-h2 mt-10 mb-3">For a depot that can&apos;t get power in</h3>
        <p className="axr-prose axr-muted mb-6">
          Each option set against the same depot problem.
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
        <div className="mt-6">
          <Notice tone="risk" title="V2G is a revenue and resilience tool, not a capacity fix">
            A bus that exports at 5 pm must buy that energy back before its morning run. For a depot already short of
            import capacity, V2G adds a second connection problem without solving the first.
          </Notice>
        </div>
      </ReportSection>

      {/* 05 Market */}
      <ReportSection id="market" no="05" title="The market lesson">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="axr-card">
            <div className="axr-metric-label">The V2G provider</div>
            <p className="mt-2 axr-small">
              In December 2025 Nuvve, the pilot&apos;s V2G technology provider, announced &ldquo;a strategic expansion
              of its business focus to include stationary energy storage systems and microgrids&rdquo;, adding that
              &ldquo;V2G remains an important long-term opportunity&rdquo;.
            </p>
            <div className="mt-3"><DataTag status="verified" source="Nuvve press release, Form 8-K, 18 December 2025" /></div>
          </div>
          <div className="axr-card">
            <div className="axr-metric-label">Its finances</div>
            <p className="mt-2 axr-small">
              Its quarterly report for March 2025 disclosed substantial doubt about its ability to continue as a going
              concern for twelve months.
            </p>
            <div className="mt-3"><DataTag status="risk" source="Nuvve Form 10-Q, quarter ended 31 March 2025; recheck later filings" /></div>
          </div>
          <div className="axr-card">
            <div className="axr-metric-label">The utility&apos;s next depot</div>
            <p className="mt-2 axr-small">
              Con Edison&apos;s 2024 Brooklyn depot project pairs 12 buses with a 500 kW solar array and a depot
              battery. Local grid congestion reportedly led the operator to look at on-site power. Bus export is
              planned, not yet reported.
            </p>
            <div className="mt-3"><DataTag status="verified" source="Con Edison, October 2024; Canary Media, 2024" /></div>
          </div>
        </div>
        <div className="axr-sunken mt-6 axr-prose flex flex-wrap items-center gap-3">
          <DataTag status="estimate" source="AXIVAI reading of the facts above" />
          <span className="axr-small">
            Both later moves lean toward stationary storage, which is available every day and needs no route
            schedule: what school-bus V2G could not yet offer. The Brooklyn battery is reported as both 2 MW and
            2 MWh; the unit is unresolved.
          </span>
        </div>
      </ReportSection>

      {/* 06 AXIVAI */}
      <ReportSection id="axivai" no="06" title="What it means for AXIVAI">
        <div className="axr-prose space-y-4 mb-6">
          <p className="axr-lead">V2G sends power out. AXIVAI brings power in, where the grid can&apos;t yet.</p>
          <p>
            A depot waiting on its utility service can&apos;t charge its buses, and V2G does nothing about that. The
            wait is long and documented: PG&amp;E&apos;s EV infrastructure projects averaged 560 days from application
            to power in its April 2026 filing, and New York&apos;s regulator puts transportation electrification at
            &ldquo;a year or longer downstate&rdquo;. AXIVAI trucks deliver energy into storage on the depot, so the
            buses run while the utility work catches up. When the grid arrives, AXIVAI leaves.
          </p>
        </div>
        <h3 className="axr-h2 mb-3">Four lessons we build in</h3>
        <ol className="axr-steps axr-steps-4">
          {[
            ["Separate the two connections", "The gap form and site profiles should record import shortfall and any export plans separately."],
            ["Design for import-only first", "On-site storage that never exports avoids export review. Grid-parallel versus islanded operation is settled site by site with each utility."],
            ["Keep grid revenue out of the base case", "White Plains published no value per bus. Treat grid-service income as upside until measured."],
            ["Budget for integration", "Pre-market, multi-vendor kit cut export availability to 55%. Reliability claims need measured uptime."],
          ].map(([step, text], i) => (
            <li key={step} className="axr-step">
              <div className="axr-step-no">Lesson {i + 1}</div>
              <div className="axr-step-test">{step}</div>
              <div className="axr-step-result">{text}</div>
            </li>
          ))}
        </ol>
        <GapCta
          title="Buses ready, depot power still months away?"
          body="Tell us about your site. AXIVAI is preparing its first pilot sites."
        />
      </ReportSection>

      {/* 07 Sources */}
      <ReportSection id="sources" no="07" title="Sources">
        <SourceList sources={SOURCES} />
      </ReportSection>

      {/* 08 Next steps */}
      <ReportSection id="next-steps" no="08" title="Proposed next steps">
        <ol className="axr-steps axr-steps-4">
          {[
            ["Retrieve", "Find Con Edison's quarterly and final V2G reports in the PSC case file to confirm the 55% and the energy exported."],
            ["Ask", "Ask the utility and regulator how bidirectional buses are treated under New York's interconnection rules."],
            ["Compare", "Check later school-bus V2G programmes for published kWh, availability and value per bus."],
            ["Apply", "Add an import-versus-export field to depot profiles collected through the gap form."],
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
