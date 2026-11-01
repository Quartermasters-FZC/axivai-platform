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

// Industry review (31 October 2026). Draws on earlier internal research, re-checked against public sources.

export const metadata: Metadata = {
  alternates: { canonical: "/research/park-out-charging" },
  title: "Park-out school buses: charging away from the depot | AXIVAI",
  description:
    "An AXIVAI industry review: when electric school buses park overnight at drivers' homes, where can they charge? Home Level 2, managed home charging, shared hubs, mid-day charging and mobile delivery compared.",
};

const TOC = [
  ["question", "The question"],
  ["findings", "What we found"],
  ["example", "Worked example"],
  ["alternatives", "The alternatives test"],
  ["money-liability", "Money, metering and liability"],
  ["axivai", "Where AXIVAI fits"],
  ["sources", "Sources"],
  ["open-questions", "What we're investigating next"],
  ["next-steps", "Next steps"],
] as const;

const FINDINGS: { claim: string; tag: Provenance; source: string; note?: string }[] = [
  {
    claim: "Of New York City's roughly 10,500 school buses, about 1,000 are “park outs”: the bus drives its route and returns home with the driver.",
    tag: "verified",
    source: "PowerUp NYC school-bus memo (September 2023)",
    note: "The study simply assumed park-outs could charge where they park. It does not say how.",
  },
  {
    claim: "Outside New York City, 96% of school buses return to depots for at least 12 hours overnight.",
    tag: "verified",
    source: "New York State announcement of the Electric School Bus Roadmap (September 2023)",
    note: "Upstate, park-out is a minority pattern.",
  },
  {
    claim: "New York has about 45,000 school buses and an average route of 80 miles a day.",
    tag: "verified",
    source: "New York State roadmap announcement",
  },
  {
    claim: "State law now requires zero-emission purchases from 1 July 2032 and a zero-emission fleet by 1 July 2040.",
    tag: "risk",
    source: "NY Education Law §3638, as amended May 2026",
    note: "The 2023 roadmap's 2027 and 2035 dates were pushed back in the 2026 budget.",
  },
  {
    claim: "High-power Level 2 chargers for buses run at about 19 kW, 240 V AC; equipment costs $2,000–$5,000 and installation $1,000 to over $10,000.",
    tag: "verified",
    source: "WRI Electric School Bus Initiative facility guide (2022)",
    note: "2022 prices. Distance from the power source can be 40% or more of installation cost.",
  },
  {
    claim: "A current Type C electric bus: 194 kWh battery, up to 140 miles, Level 2 recharge in about 8 hours.",
    tag: "verified",
    source: "Blue Bird MY25 Vision electric spec sheet",
    note: "Manufacturer figures. NYC's study assumed 0.67 miles per kWh for Type C, about 1.5 kWh per mile.",
  },
  {
    claim: "EV charging is a continuous load, so circuit protection is sized at 125%: an 80 A charger needs a 100 A circuit.",
    tag: "verified",
    source: "EC&M explainer on NEC Article 625",
    note: "Code edition adopted locally governs. Load-management allowances not confirmed here.",
  },
  {
    claim: "Cold weather heating needs can cut range by up to 50%.",
    tag: "verified",
    source: "DOE Electric School Bus Planning Guide",
  },
  {
    claim: "A 25 kW charger used for 4 hours theoretically adds 100 kWh.",
    tag: "verified",
    source: "DOE Electric School Bus Planning Guide",
    note: "The basis for mid-day charging at schools.",
  },
  {
    claim: "Utility make-ready incentives are for non-residential sites; shared charging hubs became eligible for customer-side support in the medium- and heavy-duty pilot in January 2026.",
    tag: "verified",
    source: "Joint Utilities of New York make-ready pages",
    note: "The light-duty programme closed to new applications on 21 April 2026.",
  },
  {
    claim: "NYSED Transportation Aid covers bus charging infrastructure, including at sites with no building: “The bus garage is not the only location charging may occur.”",
    tag: "verified",
    source: "NYSED Zero Emission Bus Charging Infrastructure Q&A (February 2024)",
    note: "Silent on chargers installed on drivers' private property.",
  },
];

// Worked example: overnight energy a home service could spare, per the assumptions in the Notice below.
const NEED_KWH = 133;
const MAX_KWH = 250;
const HOMES: { label: string; sub: string; spareKw: number; kwh: number; verdict: string }[] = [
  { label: "100 A", sub: "typical night", spareKw: 16.2, kwh: 194, verdict: "Covers the 133 kWh day, only with load management." },
  { label: "100 A", sub: "electric heat", spareKw: 7.2, kwh: 86, verdict: "Short on any 80-mile day." },
  { label: "200 A", sub: "typical night", spareKw: 19.2, kwh: 230, verdict: "Charger-limited; covers the day." },
  { label: "200 A", sub: "electric heat", spareKw: 19.2, kwh: 230, verdict: "Charger-limited; covers the day." },
];

const ALTERNATIVES: { option: string; wins: string; fails: string; note: string }[] = [
  { option: "Home Level 2 at full rate", wins: "200 A homes the driver owns, near the route", fails: "100 A homes; renters; drivers who leave", note: "About $3,000 to over $15,000 per home before any panel or utility upgrade (WRI ranges)." },
  { option: "Managed home charging", wins: "100 A homes with modest overnight load", fails: "Electric heat in winter; morning pre-heating; no connectivity", note: "Load-management devices exist for cars; bus-scale use at homes is undocumented." },
  { option: "Shared hub at a school or municipal lot", wins: "Clusters of park-out drivers within a short drive", fails: "Adds a drive to the start of the day; the site may need its own upgrade", note: "Make-ready now supports shared hubs; NYSED aid covers charging away from a garage." },
  { option: "Mid-day charging at schools", wins: "Long winter days; buses that wait at school", fails: "Buses that go home between runs", note: "25 kW for 4 hours adds about 100 kWh (DOE)." },
  { option: "Consolidate to a depot", wins: "Districts with land and a willing utility", fails: "Loses the park-out benefits; land and time", note: "What most of the upstate fleet already does." },
  { option: "AXIVAI mobile delivery to driveways", wins: "Rarely", fails: "One battery swap per bus per night across scattered homes", note: "About $11,000 a bus a year at the stress-test rate, before equipment. A hub does it better." },
  { option: "AXIVAI stationed power at a hub", wins: "A hub site whose grid upgrade is late", fails: "Hubs that already have grid service", note: "Storage on the hub, topped up by truck, until the grid arrives. Same model as the depot case." },
];

const SOURCES: Source[] = [
  {
    title: "NYC Mayor's Office of Climate & Environmental Justice, PowerUp NYC: school bus electrification research memo (September 2023)",
    href: "https://www.nyc.gov/assets/climate/downloads/pdfs/PowerUp_ResearchandFindings-Memo_School-Bus-Electrification.pdf",
    use: "Count of NYC park-out buses; Type C efficiency; 20 kW charger assumption.",
    caution: "NYC only. It assumes park-outs can charge where they park and notes they may not be able to share chargers; it proposes no park-out solution.",
  },
  {
    title: "New York State, Governor's announcement of the Electric School Bus Roadmap and Guidebook (15 September 2023)",
    href: "https://www.governor.ny.gov/news/governor-hochul-releases-roadmap-and-guidebook-p-12-schools-transition-bus-fleets-zero",
    use: "96% depot return outside NYC; fleet size; 80-mile average route.",
    caution: "A press summary of the roadmap. It does not say the other 4% are park-outs; that is our inference. Its 2027 and 2035 deadlines are superseded.",
  },
  {
    title: "U.S. Department of Energy, Electric School Bus Planning Guide",
    href: "https://afdc.energy.gov/guides/electric-school-bus",
    use: "Cold-weather range loss, charging arithmetic, managed and mid-day charging.",
    caution: "Does not discuss buses parked at drivers' homes.",
  },
  {
    title: "WRI Electric School Bus Initiative, Electric School Bus Facility Assessment Guide (2022)",
    href: "https://electricschoolbusinitiative.org/sites/default/files/2022-10/ESB-101-Print-10.4.pdf",
    use: "Level 2 charger power, equipment and installation cost ranges, charge times.",
    caution: "2022 prices for depot settings; home installations may differ.",
  },
  {
    title: "Blue Bird MY25 All-Electric Vision spec sheet (via California HVIP)",
    href: "https://californiahvip.org/wp-content/uploads/2020/09/AL-MY25-Blue-Bird-All-Elec-Vision-SB-Spec-Sheet-250219.pdf",
    use: "Battery size, range and Level 2 charge time for a current Type C bus.",
    caution: "Manufacturer marketing; rated range, not winter operation.",
  },
  {
    title: "EC&M, Article 625: Electric Vehicle Charging Systems",
    href: "https://www.ecmweb.com/national-electrical-code/article/20899765/article-625-electric-vehicle-charging-systems",
    use: "The 125% continuous-load rule for EV charging circuits.",
    caution: "A trade explainer, not the code text. Check the NEC edition and local amendments in force.",
  },
  {
    title: "Joint Utilities of New York, Medium- and Heavy-Duty EV Make-Ready Pilot",
    href: "https://jointutilitiesofny.org/ev/make-ready/MHD-pilot-program",
    use: "Incentive tiers; shared hubs eligible since a January 2026 PSC order.",
    caution: "Status as published in April 2026; funding is first-come, first-served.",
  },
  {
    title: "Joint Utilities of New York, EV Make-Ready Program",
    href: "https://jointutilitiesofny.org/ev/make-ready",
    use: "Non-residential scope; closure to new applications on 21 April 2026.",
  },
  {
    title: "NYSED, Zero Emission Bus Charging Infrastructure: State Aid Q&A (February 2024)",
    href: "https://www.nysed.gov/sites/default/files/programs/pupil-transportation/zero-emission-bus-infrastructure-qanda-20240222.pdf",
    use: "What Transportation Aid covers; charging away from the bus garage.",
    caution: "Does not address equipment on private homes. May have been updated since.",
  },
  {
    title: "New York Labor Law §240",
    href: "https://www.nysenate.gov/legislation/laws/LAB/240",
    use: "Who carries gravity-related safety duties during building work.",
    caution: "Statute text only. How it applies to a district paying for work at a driver's home needs legal advice.",
  },
  {
    title: "IRS, Instructions for Form 8911 (Alternative Fuel Vehicle Refueling Property Credit)",
    href: "https://www.irs.gov/instructions/i8911",
    use: "The federal 30C credit does not apply to property placed in service after 30 June 2026.",
  },
  {
    title: "The Post-Journal, Lake Shore unveils 20 new electric buses (July 2025)",
    href: "https://www.post-journal.com/news/local-news/2025/07/leading-the-charge-lake-shore-unveils-20-new-electric-buses-with-7-9m-epa-grant",
    use: "A western New York district electrifying at its central bus lot with utility support.",
    caution: "Local news; bus and charger counts vary within the article. Says nothing about park-outs.",
  },
];

export default function ParkOutChargingReport() {
  const pct = (v: number) => `${(v / MAX_KWH) * 100}%`;
  return (
    <ReportShell
      slug="park-out-charging"
      eyebrow="Industry review"
      title="Park-out school buses"
      lead={
        <>
          When an electric school bus parks overnight at the driver&apos;s home, where can it charge, and is there any
          case for bringing power to the driveway?
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
          <Metric label="Park-out buses, NYC" value="~1,000" unit="of 10,500" status="verified" source="PowerUp NYC memo, 2023" />
          <Metric label="Upstate buses back at depots" value="96" unit="%" status="verified" source="NY roadmap announcement, 2023" />
          <Metric label="Daily need, one bus" value="133" unit="kWh" status="estimate" source="80 mi × 1.5 kWh/mi ÷ 90%" />
          <Metric label="Home charger, installed" value="$3k–15k+" unit="per home" status="estimate" source="Sum of WRI equipment and installation ranges" />
        </div>
        <div className="axr-sunken mt-6 axr-prose">
          <p>
            <strong>What we found.</strong> Park-out is a pure power-access gap: the bus sleeps where the grid
            connection was sized for a house. Energy is not always the binding limit. A 200 A home, or a 100 A home
            with load management on a mild night, can in principle refill an average day. What breaks home charging is
            winter, code and transformer limits, metering, liability and who owns the house. Shared hubs and mid-day
            charging at schools handle the rest. Where a hub&apos;s own grid upgrade runs late, AXIVAI powers the hub
            until it arrives.
          </p>
        </div>
      </section>

      <ReportSection id="question" no="01" title="The question">
        <div className="axr-prose">
          <p className="axr-lead">
            For buses that park at drivers&apos; homes, which charging option keeps them route-ready at the lowest total
            cost and risk?
          </p>
          <p className="axr-muted">
            The options compared: full-rate home Level 2, managed home charging, shared hubs at schools or municipal
            lots, mid-day charging at schools, consolidation to a depot, and AXIVAI&apos;s mobile and stationed modes.
            Where a simpler option does the job, use it.
          </p>
        </div>
      </ReportSection>

      <ReportSection id="findings" no="02" title="What we found">
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
          <Notice tone="info" title="How big is park-out?">
            About 1,000 buses in NYC are documented. Upstate, the 96% depot-return figure implies up to about 4% of
            roughly 34,500 buses, or some 1,400, sleep elsewhere: a statewide total of perhaps 2,400, around 5% of the
            fleet. That is our estimate; the upstate 4% may include buses at schools or contractor yards.
          </Notice>
        </div>
      </ReportSection>

      <ReportSection id="example" no="03" title="Worked example: what a house can spare overnight">
        <div className="space-y-6">
          <Notice tone="assumption" title="Assumptions">
            One Type C bus; 80 miles a day (the state average); 1.5 kWh per mile, the same as the depot case; 90%
            charging efficiency: 133 kWh a day from the wall. 240 V service; household plus bus kept to 80% of the
            service rating, the usual margin for continuous loads (19.2 kW at 100 A, 38.4 kW at 200 A). Household
            overnight draw 3 kW on a typical night, 12 kW with electric resistance heat in winter. Bus capped at a 19.2
            kW charger. A 12-hour window.
          </Notice>

          <figure className="axr-chart axr-card" aria-labelledby="home-chart-title">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div id="home-chart-title" className="axr-h2">Overnight energy a home service could give the bus</div>
                <p className="axr-caption mt-1">kWh in a 12-hour window. Hover or focus a bar for detail.</p>
              </div>
              <div className="axr-legend" aria-hidden="true">
                <span className="axr-legend-item">
                  <span className="axr-swatch" style={{ background: "var(--accent-ink)" }} />
                  Available overnight
                </span>
                <span className="axr-legend-item">
                  <span className="axr-swatch axr-swatch-line" />
                  Daily need
                </span>
              </div>
            </div>
            <div className="axr-chart-rows">
              {HOMES.map((h, i) => (
                <div key={`${h.label}-${h.sub}`} className="axr-chart-row">
                  <div className="axr-chart-label">
                    {h.label}
                    <span>{h.sub}</span>
                  </div>
                  <div className="axr-plot">
                    <div className="axr-need" style={{ left: pct(NEED_KWH) }} aria-hidden="true">
                      {i === 0 && <span className="axr-need-label">Need {NEED_KWH} kWh</span>}
                    </div>
                    <div className="axr-bar-track">
                      <div
                        className="axr-bar axr-bar-overnight"
                        style={{ width: pct(h.kwh) }}
                        tabIndex={0}
                        role="img"
                        aria-label={`${h.label} service, ${h.sub}: ${h.kwh} kWh overnight, ${Math.round((h.kwh / NEED_KWH) * 100)}% of the ${NEED_KWH} kWh need`}
                      >
                        <span className="axr-bar-value" aria-hidden="true">{h.kwh}</span>
                        <span className="axr-tip" aria-hidden="true">
                          <strong>{h.label} · {h.sub}</strong>
                          <br />
                          {h.spareKw} kW for 12 hours = {h.kwh} kWh, {Math.round((h.kwh / NEED_KWH) * 100)}% of the need.
                          <br />
                          {h.verdict}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="axr-axis" aria-hidden="true">
              <div />
              <div className="axr-axis-ticks">
                {[0, 50, 100, 150, 200, 250].map((t) => (
                  <span key={t} style={{ left: pct(t) }}>{t}</span>
                ))}
              </div>
            </div>
            <figcaption className="axr-caption mt-6">
              Available = min(19.2 kW charger, 80% of service − household load) × 12 hours. All figures are estimates;
              see the table below.
            </figcaption>
          </figure>

          <div className="axr-table-wrap">
            <table className="axr-table">
              <caption>Table view of the chart, with two other daily needs. All figures are estimates.</caption>
              <thead>
                <tr>
                  <th scope="col">Service · night</th>
                  <th scope="col" className="axr-num">Spare for bus</th>
                  <th scope="col" className="axr-num">Overnight</th>
                  <th scope="col">60 mi (100 kWh)</th>
                  <th scope="col">80 mi (133 kWh)</th>
                  <th scope="col">80 mi, deep winter (267 kWh)</th>
                </tr>
              </thead>
              <tbody>
                {HOMES.map((h) => (
                  <tr key={`t-${h.label}-${h.sub}`}>
                    <th scope="row" style={{ textAlign: "left" }}>{h.label} · {h.sub}</th>
                    <td className="axr-num">{h.spareKw} kW</td>
                    <td className="axr-num">{h.kwh} kWh</td>
                    <td>{h.kwh >= 100 ? "Covered" : "Short"}</td>
                    <td>{h.kwh >= 133 ? "Covered" : "Short"}</td>
                    <td>Short, and above the 194 kWh battery</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="axr-card">
              <h3 className="axr-h2 mb-2">What the arithmetic hides</h3>
              <p className="axr-small">
                A 100 A home only reaches 194 kWh if a load-management device holds the bus below what the house
                leaves free; a full-rate 80 A charger needs a 100 A circuit on its own. The neighbourhood transformer
                and service drop were sized for houses, and a continuous 16–19 kW overnight load may exceed them. The
                utility decides that, not the panel.
              </p>
              <div className="mt-3"><DataTag status="unknown" source="No public data on transformer headroom at drivers' homes" /></div>
            </div>
            <div className="axr-card">
              <h3 className="axr-h2 mb-2">Winter breaks the single overnight charge</h3>
              <p className="axr-small">
                At the DOE&apos;s worst-case 50% range loss, an 80-mile day needs about 267 kWh: more than the bus
                battery holds, from any charger. The answer is a mid-day top-up, not a bigger home circuit. 25 kW for
                4 hours at a school adds about 100 kWh.
              </p>
              <div className="mt-3"><DataTag status="estimate" source="80 mi × 3.0 kWh/mi ÷ 90%; DOE 25 kW × 4 h example" /></div>
            </div>
          </div>

          <div>
            <h3 className="axr-h2 mb-3">The rule this suggests</h3>
            <ol className="axr-steps">
              <li className="axr-step">
                <div className="axr-step-no">Test 1</div>
                <div className="axr-step-test">Home spare kW × 12 h ≥ daily kWh, and the owner, utility and code allow it?</div>
                <div className="axr-step-result">Yes: home charging, managed if the service is 100 A.</div>
              </li>
              <li className="axr-step">
                <div className="axr-step-no">Test 2</div>
                <div className="axr-step-test">A school or municipal lot within a short drive?</div>
                <div className="axr-step-result">Yes: a shared hub, plus mid-day charging in winter.</div>
              </li>
              <li className="axr-step">
                <div className="axr-step-no">Otherwise</div>
                <div className="axr-step-test">No home, no hub site</div>
                <div className="axr-step-result">Consolidate, or bridge a hub whose grid upgrade is late.</div>
              </li>
            </ol>
          </div>

        </div>
      </ReportSection>

      <ReportSection id="alternatives" no="04" title="The alternatives test">
        <p className="axr-prose axr-muted mb-6">
          Each option, where it wins and where it falls short.
        </p>
        <div className="mb-6">
          <ReportDiagram
            file="park-out-charging-options.svg"
            caption="Five places a park-out bus could charge, tested against its daily need. Figures are estimates from the worked example."
          />
        </div>
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
        <div className="grid gap-4 md:grid-cols-2 mt-6">
          <div className="axr-card">
            <h3 className="axr-h2 mb-2">Driveway delivery</h3>
            <div className="axr-metric-value">~$11,000<span className="axr-metric-unit">a bus a year</span></div>
            <p className="axr-small axr-muted mt-2">
              133 kWh × 180 school days × the AXIVAI business plan&apos;s stress-test $0.469/kWh. A bus charging at 19.2 kW
              needs about 7 hours, so a truck can&apos;t wait at each home: it means leaving a battery per driveway and
              swapping it daily. Several times the one-off cost of a home charger, before equipment.
            </p>
            <div className="mt-3"><DataTag status="estimate" source="AXIVAI business plan, stress test" /></div>
          </div>
          <div className="axr-card">
            <h3 className="axr-h2 mb-2">A 20-bus hub</h3>
            <div className="axr-metric-value">~220<span className="axr-metric-unit">kW average overnight</span></div>
            <p className="axr-small axr-muted mt-2">
              20 buses × 133 kWh = 2,660 kWh over 12 hours. On the depot case&apos;s tiers, a school lot with about
              250 kW spare manages it with charging control alone; a smaller one needs a battery or an upgrade.
            </p>
            <div className="mt-3"><DataTag status="estimate" source="Worked example; depot case tiers" /></div>
          </div>
        </div>
      </ReportSection>

      <ReportSection id="money-liability" no="05" title="Money, metering and liability">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="axr-card">
            <div className="axr-metric-label">Incentives favour sites, not homes</div>
            <p className="mt-2 axr-small">
              Make-ready support is for non-residential sites, and shared hubs now qualify. NYSED aid covers charging
              away from a garage but says nothing about private homes. The federal 30C credit ended for equipment in
              service after 30 June 2026.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <DataTag status="verified" source="Joint Utilities; NYSED Q&A" />
              <DataTag status="risk" source="IRS Form 8911 instructions: 30C ended 30 June 2026" />
            </div>
          </div>
          <div className="axr-card">
            <div className="axr-metric-label">Metering and reimbursement</div>
            <p className="mt-2 axr-small">
              Bus energy flows through the driver&apos;s meter and tariff. Paying it back fairly needs a networked
              charger or sub-meter; whether a separate utility meter for the bus is possible at a home is unclear.
              Equipment stays behind if the driver leaves.
            </p>
            <div className="mt-3"><DataTag status="unknown" source="No New York tariff for fleet charging at homes found" /></div>
          </div>
          <div className="axr-card">
            <div className="axr-metric-label">Liability</div>
            <p className="mt-2 axr-small">
              New York&apos;s Labor Law §240 puts strict safety duties on contractors and owners during building work,
              exempting homeowners who don&apos;t direct it. A district paying for work at a driver&apos;s home may sit
              on the wrong side of that line, so insurance and indemnity need settling first.
            </p>
            <div className="mt-3"><DataTag status="unknown" source="Statute verified; application needs legal advice" /></div>
          </div>
        </div>
        <p className="axr-small axr-muted mt-4">
          Renters, landlords and homeowner associations add further consent steps.
        </p>
      </ReportSection>

      <ReportSection id="axivai" no="06" title="Where AXIVAI fits">
        <div className="axr-prose space-y-4">
          <p className="axr-lead">
            Park-out buses charge best at a shared hub. When the hub&apos;s grid upgrade runs late, AXIVAI powers it.
          </p>
          <ul className="axr-small space-y-2 list-disc pl-5">
            <li>
              <strong>Hubs, not driveways.</strong> Daily battery swaps at scattered homes cost several times a home
              charger. AXIVAI puts storage on the hub and tops it up by truck, the same model as the depot case.
            </li>
            <li>
              <strong>The opening is the late hub.</strong> A district picks a school lot for its park-out hub and the
              utility upgrade runs late. AXIVAI keeps those buses charging until the grid arrives, then moves on.
            </li>
            <li>
              <strong>Software handles the homes.</strong> Fitting buses to 100 A homes is a load-management job, and
              proven commercial tools already do it.
            </li>
            <li>
              <strong>A second market, after depots.</strong> Park-out is about 5% of New York&apos;s fleet, so AXIVAI
              leads with depots and serves park-out hubs alongside them.
            </li>
          </ul>
        </div>
      </ReportSection>

      <ReportSection id="sources" no="07" title="Sources">
        <SourceList sources={SOURCES} />
      </ReportSection>

      <ReportSection id="open-questions" no="08" title="What we&apos;re investigating next">
        <div className="grid gap-4 md:grid-cols-2">
          {[
            ["How many park-out buses statewide", "No census exists; our 5% is an estimate."],
            ["Service size at drivers' homes", "100 A or 200 A decides whether home charging fits."],
            ["Transformer headroom", "Whether the street can take a continuous 16–19 kW load."],
            ["Mid-day dwell at schools", "Do park-out buses wait at school or go home between runs?"],
            ["Metering and tariffs", "Can a utility meter the bus separately at a home?"],
            ["Liability and insurance", "Who carries the risk of work and equipment at a driver's home?"],
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
          title="Run buses that park at drivers' homes?"
          body="Tell us how many buses park out, your drivers' home service sizes and the distance to a school lot, and we'll show you where a hub fits."
        />
      </ReportSection>

      <ReportSection id="next-steps" no="09" title="Proposed next steps">
        <ol className="axr-steps axr-steps-4">
          {[
            ["Count", "Ask NYSERDA, NYSED and contractor associations for park-out numbers by region."],
            ["Survey", "Collect home service sizes and routes from 2–3 park-out operators."],
            ["Ask utilities", "Transformer limits and metering options for bus charging at homes."],
            ["Rerun", "Repeat the worked example and hub sizing on the real profiles."],
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
