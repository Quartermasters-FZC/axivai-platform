import type { Metadata } from "next";
import { GapCta, ReportSection, ReportShell, SourceList, type Source } from "@/components/report/layout";
import {
  DataTag,
  Metric,
  Notice,
  type Provenance,
} from "@/components/report/primitives";
import { ReportDiagram } from "@/components/report/ReportDiagram";
import "../report.css";

// Content source: case study, drawn from earlier internal research and re-checked against public sources
// on 31 October 2026.

export const metadata: Metadata = {
  alternates: { canonical: "/research/nyc-district-depots" },
  title: "NYC school buses: who holds the depot power problem | AXIVAI",
  description:
    "AXIVAI case study: two New York City school districts, Lower Manhattan and the South Bronx, show why dense-city depot power is hard and which options fit which constraint.",
};

const TOC = [
  ["question", "The question"],
  ["control", "Who holds the power problem"],
  ["districts", "Two districts compared"],
  ["findings", "What we found"],
  ["alternatives", "The alternatives test"],
  ["axivai", "Where AXIVAI fits"],
  ["sources", "Sources"],
  ["open-questions", "What we're investigating next"],
  ["next-steps", "Next steps"],
] as const;

const ACTORS: { who: string; controls: string; tag: Provenance; source: string }[] = [
  {
    who: "NYC DOE, Office of Pupil Transportation (OPT)",
    controls: "Plans routes and hands them to vendors; writes and enforces the vendor contracts. Does not run most buses or lots.",
    tag: "verified",
    source: "NYC Comptroller audit FM25PAR20002",
  },
  {
    who: "Contracted bus vendors (48 vendors, 99 contracts)",
    controls: "Run the buses and the lots where they park overnight. Chargers, managed charging and new utility service happen on their sites.",
    tag: "verified",
    source: "NYC Comptroller policy report; PowerUp NYC memo",
  },
  {
    who: "NYCSBUS",
    controls: "City-associated nonprofit operator; took over about 1,000 buses and 950 routes in 2021. The most documented electric depot in the city.",
    tag: "verified",
    source: "NYC Comptroller policy report",
  },
  {
    who: "Con Edison",
    controls: "Decides how much power a lot can draw, builds service upgrades and pays make-ready incentives.",
    tag: "verified",
    source: "Con Edison programme page and project releases",
  },
  {
    who: "NYSERDA, DOB and FDNY",
    controls: "Bus and charger vouchers (NYSERDA); permits for any stationary battery (DOB, FDNY).",
    tag: "verified",
    source: "Con Edison GVC release; DOB rules summary",
  },
  {
    who: "Community school districts",
    controls: "Hold the schools and the families, not the depots, buses or power accounts. They can press for priority but can't fix a lot's supply.",
    tag: "estimate",
    source: "AXIVAI reading of the Comptroller audit",
  },
];

const COMPARE: { row: string; d1: string; d7: string; d1Tag?: Provenance; d7Tag?: Provenance }[] = [
  {
    row: "Area",
    d1: "Lower East Side and East Village, Manhattan.",
    d7: "Mott Haven and Melrose, South Bronx.",
  },
  {
    row: "Where its buses park overnight",
    d1: "Not public. Buses serving the district are routed by OPT and may start from lots in other boroughs.",
    d7: "Not public by district. The Bronx has a documented bus-yard corridor around Zerega Avenue in the east Bronx, outside the district's core.",
    d1Tag: "unknown",
    d7Tag: "unknown",
  },
  {
    row: "Published depot power data",
    d1: "None found for any lot serving the district.",
    d7: "Two nearby Bronx depots documented: one charging on an 80 kW limit with software, one with a utility service upgrade.",
    d1Tag: "unknown",
    d7Tag: "verified",
  },
  {
    row: "Likely binding constraint",
    d1: "Land and location: little room for bus yards in Manhattan, so the charging problem sits wherever the buses are kept.",
    d7: "Shared network capacity: many lots concentrated in one corridor, each asking Con Edison for more power.",
    d1Tag: "estimate",
    d7Tag: "estimate",
  },
  {
    row: "Park-out share",
    d1: "Not public.",
    d7: "Not public.",
    d1Tag: "unknown",
    d7Tag: "unknown",
  },
  {
    row: "Options to test first",
    d1: "Find the lots first. Then managed charging there; off-site hubs if lots can't host chargers.",
    d7: "Managed charging and make-ready, both already proven nearby. Stationary storage only where an upgrade is late.",
    d1Tag: "estimate",
    d7Tag: "estimate",
  },
];

const FINDINGS: { claim: string; tag: Provenance; source: string; note?: string }[] = [
  {
    claim: "NYC has about 10,500 school buses on almost 9,000 routes. About 7,500 run routes and return to vendor lots or garages; about 2,000 are spares at vendor lots; about 1,000 are park-outs that go home with the driver.",
    tag: "verified",
    source: "PowerUp NYC school bus memo, September 2023",
    note: "2023 figures, built on OPT fleet data.",
  },
  {
    claim: "OPT creates routes and conveys them to vendors; a single bus may serve several schools, and curb-to-school routes are built from student addresses.",
    tag: "verified",
    source: "NYC Comptroller audit FM25PAR20002, December 2025",
    note: "Districts are not the unit of bus operations.",
  },
  {
    claim: "Vendor contracts were extended for three years to 30 June 2028.",
    tag: "risk",
    source: "NYC Comptroller policy report, December 2025",
    note: "A short contract term gives vendors little reason to pay for permanent depot upgrades.",
  },
  {
    claim: "NYCSBUS's Zerega Avenue depot has an 80 kW charging limit. Load management runs 14 chargers (268 kW nameplate) within it; without it, only 4 buses could charge. The project avoided a utility upgrade.",
    tag: "verified",
    source: "The Mobility House, Con Edison interconnection award release, June 2024",
    note: "Later coverage cites 17 buses; the vendor release says 14.",
  },
  {
    claim: "Con Edison installed equipment for 23 dual-port chargers serving 45 electric buses at GVC's lot off Zerega Avenue, upgraded the site's service and provided a transformer. Its make-ready incentive was $450,000.",
    tag: "verified",
    source: "Con Edison release, 17 June 2026",
    note: "No timeline from application to energisation published.",
  },
  {
    claim: "About 2,000 school buses, roughly 20% of the city's fleet, are dispatched from that depot corridor.",
    tag: "verified",
    source: "Con Edison release, 17 June 2026",
    note: "Utility statement; no breakdown by operator or district.",
  },
  {
    claim: "Con Edison's medium- and heavy-duty make-ready programme covers up to 90% of utility-side costs, and up to 90% (capped at $882/kW) or 50% (capped at $490/kW) of customer-side costs, depending on whether a site is in or near a disadvantaged community.",
    tag: "risk",
    source: "Con Edison PowerReady MHD programme page",
    note: "The page does not state remaining budget or whether applications are open.",
  },
  {
    claim: "In city modelling, managed charging cut the fleet-average evening peak from about 10 kW per bus (unmanaged, around 4 pm) to about 2 kW per bus overnight.",
    tag: "verified",
    source: "PowerUp NYC school bus memo",
    note: "Averages include idle spares; a single lot's peak will be higher.",
  },
  {
    claim: "A Brooklyn depot for 12 electric buses pairs a 2 MW battery with a 500 kW solar array, backed by $9 million from Con Edison.",
    tag: "verified",
    source: "Con Edison release, October 2024",
    note: "Stationary storage at an NYC bus depot exists. Energy capacity (MWh) not stated.",
  },
  {
    claim: "NYC Buildings rules for energy storage took effect 26 October 2025, with lithium-ion thresholds as low as 1 kWh and engineering peer review for most site-specific installations.",
    tag: "verified",
    source: "Law-firm summary of the DOB rules (Hodgson Russ)",
    note: "Secondary source. FDNY approvals apply on top.",
  },
  {
    claim: "State law now requires zero-emission purchases from 1 July 2032 and an all-zero-emission fleet by 1 July 2040; NYC Local Law 120 still sets 1 September 2035, conditional on bus and infrastructure availability.",
    tag: "risk",
    source: "NY Education Law §3638 (revised May 2026); NYC Local Law 120 of 2021",
    note: "The state deadlines moved five years in 2026. How the city deadline will be applied is unclear.",
  },
];

const ALTERNATIVES: { option: string; wins: string; fails: string; note: string }[] = [
  {
    option: "Managed charging at vendor lots",
    wins: "Lots with some spare service and short urban routes",
    fails: "Lots whose service is tiny for the fleet; park-out buses",
    note: "Zerega runs 14 chargers on 80 kW. About 960 kWh a night at full use, roughly 69 kWh per bus (estimate).",
  },
  {
    option: "Con Edison service upgrade with make-ready",
    wins: "Lots where the upgrade arrives before the buses",
    fails: "Long or uncertain timelines; short vendor tenure",
    note: "GVC got a new service and transformer. Timeline not published.",
  },
  {
    option: "Stationary battery on existing service",
    wins: "Lots with enough daily energy but too little peak",
    fails: "DOB and FDNY approvals; space on crowded lots",
    note: "Brooklyn depot: 2 MW battery plus solar. Cost per site unknown.",
  },
  {
    option: "Off-site or shared charging hubs",
    wins: "Park-outs; lots that can't host chargers",
    fails: "The hub needs its own grid service; extra miles; land",
    note: "A hub still waits for its own grid service. No NYC school-bus hub found.",
  },
  {
    option: "Existing mobile charging supplier",
    wins: "Bridging, rescue charging, small pilots",
    fails: "Serving a whole lot every night; street-parked buses",
    note: "No NYC school-bus use found. Pricing unknown.",
  },
  {
    option: "AXIVAI stationed power + occasional delivery",
    wins: "A lot waiting for an upgrade, or a vendor on a short contract",
    fails: "Lots where software or a funded upgrade already works",
    note: "Storage moves with the fleet when the contract or the upgrade changes.",
  },
  {
    option: "AXIVAI mobile delivery to park-outs",
    wins: "Rarely",
    fails: "Street access, permits, cost per bus",
    note: "A shared hub serves park-outs better.",
  },
];

const SOURCES: Source[] = [
  {
    title: "PowerUp NYC, School Bus Electrification research and findings memo (September 2023, archived copy)",
    href: "https://web.archive.org/web/20241112231818/https://climate.cityofnewyork.us/wp-content/uploads/2023/09/PowerUp_ResearchandFindings-Memo_School-Bus-Electrification.pdf",
    use: "Fleet size, where buses park, park-out count and managed-charging load shapes.",
    caution: "The original city URL now redirects; this is the Internet Archive copy. 2023 modelling; per-bus kW figures are fleet averages.",
  },
  {
    title: "NYC Comptroller, Audit of DOE's oversight of its contracted bus services (FM25PAR20002, December 2025)",
    href: "https://comptroller.nyc.gov/wp-content/uploads/2025/12/FM25PAR20002.pdf",
    use: "How OPT and vendors divide responsibility; ridership and cost.",
    caution: "About service quality, not electrification. Says nothing on depots or power.",
  },
  {
    title: "NYC Comptroller, Routing Our Children's Futures (December 2025)",
    href: "https://comptroller.nyc.gov/reports/routing-our-childrens-futures/",
    use: "Vendor and contract counts, contract term, NYCSBUS background.",
    caution: "A policy report with reform recommendations. Used here only for structure facts.",
  },
  {
    title: "The Mobility House, NYCSBUS charging project wins Con Edison interconnection award (June 2024)",
    href: "https://www.mobilityhouse.com/usa_en/our-company/newsroom/article/con-edison-innovative-interconnection-award-mobility-house-nycsbus",
    use: "Zerega depot limit, charger count and load-management result.",
    caution: "Vendor release about its own product. Bus counts differ across releases (14, 17, 25, 30).",
  },
  {
    title: "Con Edison, Energizes largest electric school bus fleet in NYS for GVC (June 2026)",
    href: "https://www.coned.com/en/about-us/media-center/news/2026/06-17/con-edison-energizes-largest-electric-school-bus-fleet-in-nys",
    use: "Service upgrade, transformer, incentive and corridor fleet share.",
    caution: "Utility press release. No timeline, cost or capacity figures.",
  },
  {
    title: "Con Edison, PowerReady Medium- and Heavy-Duty EV Charging Infrastructure Program",
    href: "https://www.coned.com/en/our-energy-future/electric-vehicles/medium-heavy-duty-ev-charging-infrastructure-program",
    use: "Make-ready incentive tiers and caps.",
    caution: "No budget remaining or application status shown. Recheck before relying on it.",
  },
  {
    title: "Con Edison, $9 million for First Student school bus electrification in Brooklyn (October 2024)",
    href: "https://www.coned.com/en/about-us/media-center/news/2024/10-22/con-edison-provides-9-million",
    use: "An NYC depot with stationary storage and solar.",
    caution: "Battery stated in MW only; no energy capacity or cost breakdown.",
  },
  {
    title: "U.S. EPA, Clean School Bus awards for New York City (March 2024)",
    href: "https://www.epa.gov/node/288677",
    use: "Background: NYCSBUS award for 100 buses and 100 chargers.",
    caution: "Award, not delivery. Federal programme status has changed since; treat as Risk.",
  },
  {
    title: "New York Education Law §3638",
    href: "https://www.nysenate.gov/legislation/laws/EDN/3638",
    use: "Current state zero-emission deadlines (2032 purchases, 2040 fleet).",
    caution: "Amended in 2026; further changes have been proposed.",
  },
  {
    title: "NYC Local Law 120 of 2021",
    href: "https://intro.nyc/local-laws/2021-120",
    use: "City deadline of 1 September 2035 and its availability conditions.",
    caution: "Unofficial mirror of the enacted text. Interaction with the amended state law is unclear.",
  },
  {
    title: "Hodgson Russ, New NYC Department of Buildings rules for energy storage systems",
    href: "https://www.hodgsonruss.com/newsroom/publications/new-nyc-department-of-buildings-rules-set-comprehensive-standards-for-energy-storage-systems",
    use: "Effective date, thresholds and peer review under the DOB storage rules.",
    caution: "Law-firm summary, not the rule text. Silent on mobile storage.",
  },
];

export default function NycDistrictDepotsReport() {
  return (
    <ReportShell
      slug="nyc-district-depots"
      eyebrow="Case study"
      title="NYC school buses: who holds the depot power problem"
      lead={
        <>
          Two New York City school districts, Lower Manhattan and the South Bronx, show why dense-city depot power is
          hard, who actually controls it, and which options fit which constraint.
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
          <Metric label="NYC school buses" value="~10,500" status="verified" source="PowerUp NYC memo, 2023" />
          <Metric label="Park-outs, no depot at night" value="~1,000" unit="buses" status="verified" source="PowerUp NYC memo, 2023" />
          <Metric label="Zerega depot charging limit" value="80" unit="kW" status="verified" source="The Mobility House, 2024" />
          <Metric label="State fleet deadline" value="2040" status="risk" source="NY Education Law §3638, amended 2026" />
        </div>
        <div className="axr-sunken mt-6 axr-prose">
          <p>
            <strong>What we found.</strong> In New York City the depot power problem doesn&apos;t sit with school
            districts. It sits with the contracted bus vendors whose lots the buses return to, with Con Edison, and with
            OPT, which writes the contracts. One Bronx depot squeezes 14 chargers onto an 80 kW limit with software;
            another needed a new service and transformer from Con Edison. AXIVAI&apos;s customer is the vendor whose lot
            is waiting for that upgrade, or who won&apos;t pay for permanent work on a contract that ends in 2028.
          </p>
        </div>
      </section>

      {/* 01 Question */}
      <ReportSection id="question" no="01" title="The question">
        <div className="axr-prose">
          <p className="axr-lead">
            In a dense city where school districts don&apos;t own depots, who can solve a depot&apos;s power shortfall,
            and which option fits each kind of constraint?
          </p>
          <p className="axr-muted">
            District 1 (Lower Manhattan) and District 7 (South Bronx) are the two examples. Where managed charging, a
            utility upgrade or a stationary battery does the job, use it; AXIVAI covers the lots those can&apos;t.
          </p>
        </div>
      </ReportSection>

      {/* 02 Control */}
      <ReportSection id="control" no="02" title="Who holds the power problem">
        <p className="axr-prose axr-muted mb-6">
          About 7,500 buses return each night to vendor lots or garages and 2,000 spares sit there. The power question
          is asked at those lots, by the vendor, of Con Edison.
        </p>
        <div className="mb-6">
          <ReportDiagram
            file="nyc-depot-power-actors.svg"
            caption="Who controls what at one NYC bus lot. Solid lines: direct control. Dashed lines: indirect influence."
          />
        </div>
        <div className="axr-table-wrap">
          <table className="axr-table">
            <thead>
              <tr>
                <th scope="col">Actor</th>
                <th scope="col">What it controls</th>
                <th scope="col">Figure</th>
              </tr>
            </thead>
            <tbody>
              {ACTORS.map((a) => (
                <tr key={a.who}>
                  <th scope="row" style={{ minWidth: 180 }}>{a.who}</th>
                  <td style={{ minWidth: 260 }}>
                    {a.controls}
                    <div className="axr-caption mt-1">{a.source}</div>
                  </td>
                  <td><DataTag status={a.tag} source={a.source} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6">
          <Notice tone="info" title="Start from the lots">
            The real unit is the vendor lot, not the district. In NYC, start from the lots and work back to the schools
            they serve.
          </Notice>
        </div>
      </ReportSection>

      {/* 03 Districts */}
      <ReportSection id="districts" no="03" title="Two districts compared">
        <div className="axr-table-wrap">
          <table className="axr-table">
            <caption>Tags show where each figure comes from. Most lot-level data is not published.</caption>
            <thead>
              <tr>
                <th scope="col"> </th>
                <th scope="col">District 1 · Lower Manhattan</th>
                <th scope="col">District 7 · South Bronx</th>
              </tr>
            </thead>
            <tbody>
              {COMPARE.map((c) => (
                <tr key={c.row}>
                  <th scope="row" style={{ minWidth: 150 }}>{c.row}</th>
                  <td style={{ minWidth: 220 }}>
                    {c.d1}
                    {c.d1Tag && <div className="mt-2"><DataTag status={c.d1Tag} /></div>}
                  </td>
                  <td style={{ minWidth: 220 }}>
                    {c.d7}
                    {c.d7Tag && <div className="mt-2"><DataTag status={c.d7Tag} /></div>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid gap-4 md:grid-cols-2 mt-6">
          <div className="axr-card">
            <h3 className="axr-h2 mb-2">Bronx depot A: software on a small supply</h3>
            <div className="axr-metric-value">3.4×<span className="axr-metric-unit">nameplate over limit</span></div>
            <p className="axr-small axr-muted mt-2">
              268 kW of chargers on an 80 kW limit at NYCSBUS&apos;s Zerega depot. Without load management, 4 buses;
              with it, 14. No utility upgrade needed.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <DataTag status="verified" source="The Mobility House, 2024" />
              <DataTag status="estimate" source="Ratio: 268 ÷ 80" />
            </div>
          </div>
          <div className="axr-card">
            <h3 className="axr-h2 mb-2">Bronx depot B: the utility upgrade</h3>
            <div className="axr-metric-value">45<span className="axr-metric-unit">buses, 23 dual-port chargers</span></div>
            <p className="axr-small axr-muted mt-2">
              GVC&apos;s lot off Zerega Avenue. Con Edison upgraded the service, supplied a transformer and paid a
              $450,000 make-ready incentive. How long it took is not public.
            </p>
            <div className="mt-3"><DataTag status="verified" source="Con Edison, June 2026" /></div>
          </div>
        </div>

      </ReportSection>

      {/* 04 Findings */}
      <ReportSection id="findings" no="04" title="What we found">
        <div className="axr-table-wrap">
          <table className="axr-table">
            <caption>Each finding with its source.</caption>
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
          <Notice tone="info" title="What nobody publishes">
            A count of electric buses in service today, lot-by-lot capacity, and how long a Con Edison school-bus depot
            upgrade takes. Those are the numbers we&apos;re collecting next.
          </Notice>
        </div>
      </ReportSection>

      {/* 05 Alternatives */}
      <ReportSection id="alternatives" no="05" title="The alternatives test for NYC lots">
        <p className="axr-prose axr-muted mb-6">
          Each option, where it wins and where it falls short.
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
          <h3 className="axr-h2 mb-3">Which option fits which constraint</h3>
          <ol className="axr-steps axr-steps-4">
            {[
              ["Too little peak", "Managed charging, then a stationary battery."],
              ["Too little energy", "Utility upgrade; bring energy in only while waiting."],
              ["No room on the lot", "Off-site or shared hub."],
              ["No lot at all", "Park-outs: a hub near where drivers live."],
            ].map(([test, result], i) => (
              <li key={test} className="axr-step">
                <div className="axr-step-no">Constraint {i + 1}</div>
                <div className="axr-step-test">{test}</div>
                <div className="axr-step-result">{result}</div>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-6">
          <Notice tone="info" title="Plan for permits">
            Any battery on an NYC lot falls under the DOB storage rules in force since 26 October 2025 and FDNY
            approvals. Whether a mobile battery discharging on site counts as stationary storage is still open, so
            AXIVAI plans permits into every NYC deployment from day one.
          </Notice>
        </div>
      </ReportSection>

      {/* 06 AXIVAI */}
      <ReportSection id="axivai" no="06" title="Where AXIVAI fits">
        <p className="axr-lead axr-prose mb-6">
          Power that moves with the fleet, for lots the grid can&apos;t serve in time.
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="axr-card">
            <div className="axr-metric-label">The buyer</div>
            <p className="mt-2 axr-small">
              A bus vendor or NYCSBUS, with OPT setting the contract terms. Not a school district.
            </p>
          </div>
          <div className="axr-card">
            <div className="axr-metric-label">The opening</div>
            <p className="mt-2 axr-small">
              A lot whose upgrade is late, or a vendor that won&apos;t pay for permanent work on a contract ending in
              2028. AXIVAI storage on the lot, topped up by truck, moves with the fleet when the contract changes.
            </p>
          </div>
          <div className="axr-card">
            <div className="axr-metric-label">Where we step aside</div>
            <p className="mt-2 axr-small">
              Lots where charging software or a make-ready-funded upgrade already does the job, as at Zerega.
            </p>
          </div>
        </div>
      </ReportSection>

      {/* 07 Sources */}
      <ReportSection id="sources" no="07" title="Sources">
        <SourceList sources={SOURCES} />
      </ReportSection>

      {/* 08 Open questions */}
      <ReportSection id="open-questions" no="08" title="What we&apos;re investigating next">
        <div className="grid gap-4 md:grid-cols-2">
          {[
            ["Which lots serve each district", "Ties each lot to the schools it serves."],
            ["Spare capacity at those lots", "Decides whether software alone is enough."],
            ["Con Edison upgrade timelines", "Months versus years changes the answer."],
            ["Electric buses in service today", "No current public count found."],
            ["Park-out share by borough", "Sizes the hub question."],
            ["Does contract tenure block investment?", "The NYC-specific opening for AXIVAI."],
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
          title="Run or manage an NYC school-bus lot?"
          body="Tell us your lot's power limit and upgrade timeline, and we'll show you how AXIVAI can charge your fleet while you wait."
        />
      </ReportSection>

      {/* 09 Next steps */}
      <ReportSection id="next-steps" no="09" title="Proposed next steps">
        <ol className="axr-steps axr-steps-4">
          {[
            ["Map", "Match vendor lots to the routes serving Districts 1 and 7, from public OPT data."],
            ["Ask", "Interview 3–5 vendors and NYCSBUS on lot capacity, upgrade timelines and tenure."],
            ["Check", "Ask Con Edison and DOB how a temporary battery on a lot would be treated."],
            ["Rerun", "Apply the depot tier test from the main research case to real lots."],
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
