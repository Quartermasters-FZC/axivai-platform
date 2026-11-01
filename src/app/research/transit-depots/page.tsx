import type { Metadata } from "next";
import Link from "next/link";
import { GapCta, ReportSection, ReportShell, SourceList, type Source } from "@/components/report/layout";
import { DataTag, Metric, Notice, type Provenance } from "@/components/report/primitives";
import "../report.css";

// Industry review (31 October 2026). Every figure re-checked against the public sources listed below.

export const metadata: Metadata = {
  alternates: { canonical: "/research/transit-depots" },
  title: "Transit bus depots | AXIVAI",
  description:
    "Transit bus depots face the same power-access gap as school-bus depots, at 10–20 times the scale. Depot loads, utility timelines, what agencies do while they wait, and where AXIVAI fits: outage cover, early buses and construction phases.",
};

const TOC = [
  ["question", "The question"],
  ["findings", "What we found"],
  ["scale", "How big the load gets"],
  ["responses", "What agencies do"],
  ["alternatives", "The alternatives test"],
  ["axivai", "Where AXIVAI fits"],
  ["sources", "Sources"],
  ["open-questions", "What we're investigating next"],
  ["next-steps", "Next steps"],
] as const;

const FINDINGS: { claim: string; tag: Provenance; source: string; note?: string }[] = [
  {
    claim: "California's Innovative Clean Transit rule phases in zero-emission bus purchases from 2023, reaching 100% of new purchases by 2029, with a statewide goal of all-zero-emission fleets by 2040.",
    tag: "verified",
    source: "CARB news release, December 2018",
    note: "CARB also runs exemption pathways for the rule. Check their current status before relying on the dates.",
  },
  {
    claim: "MTA has committed to a 100% zero-emission bus fleet by 2040, and several depots will need distribution upgrades with Con Edison.",
    tag: "verified",
    source: "New York Governor's press release, May 2024",
  },
  {
    claim: "MTA officials estimated they would need about 370 MW of additional power for the fleet, against existing capacity of 30 MW.",
    tag: "verified",
    source: "THE CITY, April 2022",
    note: "A 2022 estimate reported in the press, not an MTA document. May be out of date.",
  },
  {
    claim: "MTA's $188 million second phase of depot work adds 220 overhead pantograph charging systems.",
    tag: "verified",
    source: "New York Governor's press release, May 2024",
  },
  {
    claim: "King County Metro's new 120-bus base needs 6–10 MW from the grid.",
    tag: "verified",
    source: "Seattle City Light, March 2024",
  },
  {
    claim: "LA Metro's rollout plan provides for 1,010 chargers at 150 kW and 39 at 450 kW across 10 divisions, with $0.9–1.4 billion of the $1.3–1.6 billion capital cost going to infrastructure.",
    tag: "verified",
    source: "NREL, Deploying Charging Infrastructure for Electric Transit Buses (2022), citing LA Metro",
    note: "From LA Metro's 2021 plan. The plan may have changed since.",
  },
  {
    claim: "In Chicago Transit Authority scenarios, charger infrastructure costs $0.7–2.1 billion, including about $0.25 billion for electrical upgrades.",
    tag: "verified",
    source: "NREL (2022), citing CTA's Charging Forward plan",
  },
  {
    claim: "Electrical upgrades and construction take 6–48 months, and full deployment takes 1–4 years.",
    tag: "verified",
    source: "CALSTART transit infrastructure planning guide (HVIP), 2020",
  },
  {
    claim: "Utilities report that some agencies bought buses before learning they couldn't use them on schedule because the upgrades took too long.",
    tag: "verified",
    source: "NREL (2022), agency and utility interviews",
  },
  {
    claim: "Santa Maria Regional Transit's buses arrived before its infrastructure was finished. It installed a 50 kW charger as a temporary measure.",
    tag: "verified",
    source: "METRO Magazine, September 2023",
    note: "The only documented case found of an interim charger at a transit depot. It is small.",
  },
  {
    claim: "NREL says a generator port plus a mobile power source is generally the cheapest and easiest way to build in resilience. It also says solar-and-storage microgrids rarely pay for themselves on their benefits alone.",
    tag: "verified",
    source: "NREL (2022), resilience chapter",
  },
  {
    claim: "Proterra filed for Chapter 11 on 7 August 2023. Its transit business was sold to Phoenix for a final price of $3.5 million in January 2024.",
    tag: "verified",
    source: "Proterra Form 8-K, January 2024 (SEC)",
    note: "The headline bid was reported at $10 million in total consideration.",
  },
  {
    claim: "By May 2024 all nine of Fresno's Proterra buses were out of service, after parts dried up.",
    tag: "verified",
    source: "GV Wire, May 2024",
    note: "Local news. Current status unknown.",
  },
  {
    claim: "TCAT in Ithaca idled all seven of its electric buses in March 2024 after a frame separated from an axle.",
    tag: "verified",
    source: "Cornell Daily Sun, April 2025",
  },
];

/** Power scale, MW. Depot loads in accent-ink; supply-side units in gold. */
const SCALE: { label: string; sub: string; mw: number; display: string; kind: "load" | "supply"; tag: Provenance; source: string }[] = [
  { label: "School-bus depot", sub: "40 buses, all at once", mw: 0.77, display: "0.77 MW", kind: "load", tag: "estimate", source: "AXIVAI school-bus worked example (40 × 19.2 kW)" },
  { label: "Rental battery", sub: "largest listed unit", mw: 1, display: "1 MW · 1.2 MWh", kind: "supply", tag: "verified", source: "Aggreko energy storage rental page" },
  { label: "VTA block", sub: "34 buses, 1 MW battery", mw: 3, display: "3 MW chargers", kind: "load", tag: "verified", source: "Scale Microgrids VTA page" },
  { label: "Brookville", sub: "70 buses", mw: 6.5, display: "6.5 MW microgrid", kind: "supply", tag: "verified", source: "The Mobility House, Brookville depot reference" },
  { label: "King County", sub: "120-bus base", mw: 10, display: "6–10 MW", kind: "load", tag: "verified", source: "Seattle City Light" },
  { label: "LA Metro", sub: "average division, nameplate", mw: 16.9, display: "≈17 MW", kind: "load", tag: "estimate", source: "Derived: (1,010 × 150 kW + 39 × 450 kW) ÷ 10 divisions" },
];
const SCALE_MAX = 25;

const ALTERNATIVES: { option: string; wins: string; fails: string; note: string }[] = [
  { option: "Permanent utility upgrade, phased by bus block", wins: "Most agencies: a long-lived, predictable load planned years ahead", fails: "6–48 months of work; utilities size capacity only to committed vehicles", note: "VTA plans in 34-bus blocks; PG&E's fleet programme sizes capacity to vehicles committed over five years." },
  { option: "Managed charging and a fast/slow charger mix", wins: "Depots with a long overnight window", fails: "Can't add energy the service can't supply", note: "CTA modelled 7 fast and 9 slow chargers doing the work of 83 slow ones, at lower peak draw." },
  { option: "Depot battery or microgrid", wins: "High demand charges, outage-prone sites, grant-funded projects", fails: "Cost; rarely pays off on resilience alone (NREL)", note: "VTA (1 MW / 4 MWh, grant-funded); Brookville (6.5 MW microgrid that can island)." },
  { option: "On-route or end-of-line charging", wins: "Long routes and depots with no spare capacity", fails: "Needs its own utility service at each site", note: "Spreads load across sites, which NREL notes also spreads outage risk." },
  { option: "Generator port + rented mobile power", wins: "Resilience during outages", fails: "Emissions and permits when the source is diesel", note: "NREL calls it generally the cheapest resilience option; diesel, propane or gas generators are the cheapest source today." },
  { option: "Small temporary charger for early buses", wins: "Pilots of a few buses that arrive before the depot is ready", fails: "Can't serve a full block", note: "Santa Maria: one 50 kW unit." },
  { option: "AXIVAI delivery for a whole depot every night", wins: "Not the right fit at this scale", fails: "A 6–10 MW base needs about 30–50 MWh a night", note: "Roughly 25–40 of the largest rental units every night. Phased grid upgrades do this job better." },
  { option: "AXIVAI on-call and bridging power", wins: "Outage cover, construction phases, early small fleets", fails: "Sites where a rented diesel generator is acceptable", note: "Zero-emission power into the depot's generator port, delivered when it's needed." },
];

const SOURCES: Source[] = [
  {
    title: "NREL, Deploying Charging Infrastructure for Electric Transit Buses (June 2022)",
    href: "https://afdc.energy.gov/files/u/publication/Deploying-Charging-Infrastructure-for-Electric-Transit-Buses.pdf",
    use: "Utility timelines, phasing, resilience options, the VTA microgrid, and LA Metro and CTA cost figures.",
    caution: "Based on interviews, 2021–22. The agency plans it cites may have changed.",
  },
  {
    title: "CALSTART / HVIP, Infrastructure Planning Guide: Transit (2020)",
    href: "https://californiahvip.org/wp-content/uploads/2020/09/Infrastructure-Planning_Guide_TRANSIT_FINAL-Digital.pdf",
    use: "6–48 months for upgrades and construction; 1–4 years for full deployment.",
    caution: "A planning guide with ranges, not measured timelines.",
  },
  {
    title: "California Air Resources Board, California transitioning to all-electric public bus fleet by 2040 (December 2018)",
    href: "https://ww2.arb.ca.gov/news/california-transitioning-all-electric-public-bus-fleet-2040",
    use: "Innovative Clean Transit purchase schedule and the 2040 goal.",
    caution: "A 2018 release. Exemptions and later changes should be checked against the current regulation.",
  },
  {
    title: "New York Governor, 60 new electric buses for Queens, Staten Island and Brooklyn (May 2024)",
    href: "https://www.governor.ny.gov/news/governor-hochul-introduces-60-new-electric-buses-operate-queens-staten-island-and-brooklyn",
    use: "MTA's 2040 commitment, Con Edison distribution upgrades and the $188 million second phase.",
    caution: "Government press release.",
  },
  {
    title: "THE CITY, MTA surging ahead with electric bus plans (April 2022)",
    href: "https://www.thecity.nyc/environment/2022/4/27/23045575/mta-surging-ahead-with-electric-bus-plans",
    use: "MTA's estimated 370 MW of additional power against 30 MW of existing capacity.",
    caution: "News report of figures given by officials; 2022.",
  },
  {
    title: "New York Governor, nearly $80 million for zero-emission transit (ZETT), October 2025",
    href: "https://www.governor.ny.gov/news/governor-hochul-announces-nearly-80-million-support-expanded-use-zero-emission-vehicles-across",
    use: "The state programme funds facility and utility infrastructure for seven upstate and suburban agencies.",
    caution: "Award amounts, not completed projects.",
  },
  {
    title: "Seattle City Light, City Light and King County Metro break ground on new electric bus base (March 2024)",
    href: "https://powerlines.seattle.gov/2024/03/14/city-light-and-king-county-metro-break-ground-on-new-electric-bus-base/",
    use: "6–10 MW for a 120-bus base.",
    caution: "Utility blog; no cost or utility timeline given.",
  },
  {
    title: "Scale Microgrids, VTA Cerone bus yard project",
    href: "https://www.scalemicrogrids.com/projects/vta",
    use: "Battery, charger and solar ratings; 4 hours of resilience.",
    caution: "Vendor page in the future tense; the 48% saving is a vendor claim. Solar and backup figures differ from VTA's 2022 rendering cited by NREL.",
  },
  {
    title: "The Mobility House, Brookville Smart Energy Bus Depot",
    href: "https://www.mobilityhouse.com/usa_en/our-company/references/article/brookville-bus-depot",
    use: "6.5 MW microgrid for 70 buses, island-mode charging, and managed charging.",
    caution: "Vendor reference page. Component ratings differ across public sources.",
  },
  {
    title: "METRO Magazine, Santa Maria Regional Transit partners with Heliox (September 2023)",
    href: "https://www.metro-magazine.com/articles/californias-smrt-partners-with-heliox-energy-to-think-outside-the-box",
    use: "A temporary 50 kW charger while depot infrastructure was finished.",
    caution: "Trade press; one small agency.",
  },
  {
    title: "Aggreko, Energy storage rental",
    href: "https://www.aggreko.com/en-us/products/energy-storage",
    use: "Rental battery ratings, up to 1 MW / 1.2–1.3 MWh.",
    caution: "Vendor page; no pricing.",
  },
  {
    title: "Proterra Inc., Form 8-K (January 2024)",
    href: "https://www.sec.gov/Archives/edgar/data/0001820630/000095014224000090/eh240437647_8k.htm",
    use: "Chapter 11 filing date and the $3.5 million final price for the transit business.",
  },
  {
    title: "GV Wire, Why wheels on $10M worth of Fresno buses don't go round and round (May 2024)",
    href: "https://gvwire.com/2024/05/01/why-wheels-on-10m-worth-of-fresno-buses-dont-go-round-and-round/",
    use: "Fresno's nine Proterra buses out of service as parts dried up.",
    caution: "Local news; status as of May 2024.",
  },
  {
    title: "Cornell Daily Sun, TCAT begins using donated buses (April 2025)",
    href: "https://www.cornellsun.com/article/2025/04/tcat-begins-using-donated-buses-as-agency-seeks-to-stabilize-service",
    use: "TCAT's seven electric buses idled from March 2024.",
    caution: "Student newspaper citing an agency press release.",
  },
  {
    title: "Mass Transit, FTA issues safety advisory for certain Proterra battery-electric buses (October 2024)",
    href: "https://www.masstransitmag.com/bus/vehicles/hybrid-hydrogen-electric-vehicles/article/55236198/fta-issues-safety-advisory-for-certain-proterra-battery-electric-buses",
    use: "Safety Advisory 24-1: a software fix for an overheating fan circuit in some Proterra models.",
    caution: "Trade press summary. Model years differ within the article.",
  },
];

export default function TransitDepotsReport() {
  return (
    <ReportShell
      slug="transit-depots"
      eyebrow="Industry review"
      title="Transit bus depots"
      lead={
        <>
          Transit depots hit the same power-access gap as school-bus depots, at 10 to 20 times the scale. Agencies
          plan the permanent fix years ahead. AXIVAI covers what that plan leaves open: outages, early buses and
          construction phases.
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
          <Metric label="Power for one 120-bus base" value="6–10" unit="MW" status="verified" source="Seattle City Light, King County Metro" />
          <Metric label="MTA new power needed (2022 est.)" value="370" unit="MW" status="verified" source="THE CITY; against 30 MW existing" />
          <Metric label="Upgrades and construction" value="6–48" unit="months" status="verified" source="CALSTART / HVIP transit guide" />
          <Metric label="Largest rental battery unit" value="1" unit="MW · 1.2 MWh" status="verified" source="Aggreko" />
        </div>
        <div className="axr-sunken mt-6 axr-prose">
          <p>
            <strong>The finding.</strong> Transit depots face the same gap, at roughly 10 to 20 times the
            scale: a single base needs several megawatts, and a large agency needs hundreds. But agencies mostly solve
            it with permanent depot projects planned years ahead: utility upgrades phased by bus block, managed
            charging, and sometimes a grant-funded battery or microgrid. Bringing a depot&apos;s nightly energy in by
            truck is not the right tool at this scale. AXIVAI&apos;s transit role is on-call power: outage
            resilience, where NREL already points agencies to rented mobile power, and short bridges for early buses
            or construction phases.
          </p>
        </div>
      </section>

      {/* 01 Question */}
      <ReportSection id="question" no="01" title="The question">
        <div className="axr-prose">
          <p className="axr-lead">
            Where does AXIVAI fit in transit, once agencies&apos; own depot plans are counted?
          </p>
          <p className="axr-muted">
            We looked at three things: how large depot loads get, how long the utility side takes, and what agencies
            did while they waited. Every option, AXIVAI included, is tested the same way. For school buses, see the{" "}
            <Link href="/research/school-bus-depots">school-bus research case</Link>.
          </p>
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
            Public sources describe plans and budgets, not delays as they happened. We found no dataset of how many
            transit buses sat idle waiting for depot power, or for how long.
          </Notice>
        </div>
      </ReportSection>

      {/* 03 Scale */}
      <ReportSection id="scale" no="03" title="How big the load gets">
        <div className="space-y-6">
          <figure className="axr-chart axr-card" aria-labelledby="scale-chart-title">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div id="scale-chart-title" className="axr-h2">Depot power demand compared with deployable units</div>
                <p className="axr-caption mt-1">
                  Megawatts. Charger nameplate or grid draw as each source reports it; not measured peaks.
                </p>
              </div>
              <div className="axr-legend" aria-hidden="true">
                <span className="axr-legend-item">
                  <span className="axr-swatch" style={{ background: "var(--accent-ink)" }} />
                  Depot load
                </span>
                <span className="axr-legend-item">
                  <span className="axr-swatch" style={{ background: "var(--gold)" }} />
                  On-site or deployable supply
                </span>
              </div>
            </div>
            <div className="axr-chart-rows">
              {SCALE.map((s) => (
                <div key={s.label} className="axr-chart-row">
                  <div className="axr-chart-label">
                    {s.label}
                    <span>{s.sub}</span>
                  </div>
                  <div className="axr-plot">
                    <div className="axr-bar-track">
                      <div
                        className={`axr-bar ${s.kind === "load" ? "axr-bar-overnight" : "axr-bar-day"}`}
                        style={{ width: `${(s.mw / SCALE_MAX) * 100}%`, minWidth: 3 }}
                        aria-label={`${s.label}: ${s.display}`}
                      >
                        <span className="axr-bar-value">{s.display}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="axr-axis" aria-hidden="true">
              <div />
              <div className="axr-axis-ticks">
                {[0, 5, 10, 15, 20].map((t) => (
                  <span key={t} style={{ left: `${(t / SCALE_MAX) * 100}%` }}>{t}</span>
                ))}
              </div>
            </div>
          </figure>

          <div className="axr-table-wrap">
            <table className="axr-table">
              <caption>Table view of the chart.</caption>
              <thead>
                <tr>
                  <th scope="col">Site or unit</th>
                  <th scope="col" className="axr-num">Power</th>
                  <th scope="col">Figure</th>
                  <th scope="col">Basis</th>
                </tr>
              </thead>
              <tbody>
                {SCALE.map((s) => (
                  <tr key={s.label}>
                    <th scope="row" style={{ textAlign: "left" }}>{s.label} <span className="axr-caption">({s.sub})</span></th>
                    <td className="axr-num">{s.display}</td>
                    <td><DataTag status={s.tag} source={s.source} /></td>
                    <td className="axr-muted axr-small">{s.source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="axr-card">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <h3 className="axr-h2">One base</h3>
              </div>
              <div className="axr-metric-value">8–13×<span className="axr-metric-unit">the school-bus example</span></div>
              <p className="axr-small axr-muted mt-2">
                King County&apos;s 120-bus base at 6–10 MW, against 0.77 MW for the 40-bus school depot if every bus
                charged at once. An average LA Metro division is about 22× on charger nameplate.
              </p>
              <div className="mt-3"><DataTag status="estimate" source="Ratio of the figures above" /></div>
            </div>
            <div className="axr-card">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <h3 className="axr-h2">One agency</h3>
              </div>
              <div className="axr-metric-value">370<span className="axr-metric-unit">MW of new power, MTA</span></div>
              <p className="axr-small axr-muted mt-2">
                More than 12 times MTA&apos;s 30 MW of existing capacity (2022 estimate). At this scale, depot power is
                utility system planning, not a site-by-site fix.
              </p>
              <div className="mt-3"><DataTag status="verified" source="THE CITY, April 2022" /></div>
            </div>
          </div>

          <Notice tone="assumption" title="How to read these numbers">
            Charger nameplate overstates the real coincident peak, because managed charging spreads the load. The
            LA Metro figure is our arithmetic on the charger counts in its 2021 plan, divided evenly across 10
            divisions; real divisions differ in size.
          </Notice>
        </div>
      </ReportSection>

      {/* 04 Responses */}
      <ReportSection id="responses" no="04" title="What agencies do while they wait">
        <div className="grid gap-4 md:grid-cols-2">
          {[
            ["Phase by bus block", "VTA electrifies in 34-bus blocks that match its parking layout, using a replicable 1 MW power cabinet. PG&E's fleet programme sizes upgrades to the vehicles committed over five years, so phasing is built into the utility side too."],
            ["Plan years ahead", "New York City Transit builds depot upgrades into capital planning. Agencies building new depots usually electrify existing ones in parallel. MTA's second phase alone is $188 million."],
            ["Manage the charging", "Brookville schedules charging around route blocks and microgrid output. CTA's analysis found a fast/slow mix cuts chargers, peak draw and space."],
            ["Battery or microgrid on site", "VTA's battery adds 3–4 hours of off-peak charging time and lets it downsize the service connection (NREL). Brookville can charge buses in island mode. Both were grant-funded or third-party projects."],
            ["A temporary charger", "Santa Maria installed one 50 kW unit when buses arrived before the depot was ready. This is the only interim-power case we found, and it is small."],
            ["Resilience as a separate decision", "NREL lists four options: grid hardening, a generator port with mobile power, redundant service, and a microgrid. Many agencies defer major resilience spending until fleets grow."],
          ].map(([title, body]) => (
            <div key={title} className="axr-card">
              <h3 className="axr-h2 mb-2">{title}</h3>
              <p className="axr-small">{body}</p>
            </div>
          ))}
        </div>
        <div className="axr-sunken mt-6 axr-prose">
          <p className="axr-small">
            <strong>Buses as emergency assets.</strong> NREL notes that resilience is getting more attention as fleets
            scale and climate events intensify, and that agencies should define a minimum service level for
            emergencies. California&apos;s wildfire power shutoffs were part of VTA&apos;s reason for a microgrid. The
            two VTA sources disagree on how much backup it gives: the vendor page says 4 hours, while VTA&apos;s 2022
            rendering, cited by NREL, says up to 20 hours of emergency operations.
          </p>
        </div>
        <div className="mt-6">
          <Notice tone="info" title="Why rented resilience wins">
            NREL says a solar-and-storage microgrid rarely pays for itself on resilience and bill savings alone, so
            agencies risk spending heavily on unlikely events. That argues for shared or rented resilience over
            permanent assets, which is exactly how an on-call provider like AXIVAI works.
          </Notice>
        </div>
      </ReportSection>

      {/* 05 Alternatives */}
      <ReportSection id="alternatives" no="05" title="The alternatives test">
        <p className="axr-prose axr-muted mb-6">
          Every option is tested the same way, AXIVAI included.
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
        <p className="axr-caption mt-3">
          The 30–50 MWh figure assumes a 6–10 MW base draws that power for about five hours a night.{" "}
          <DataTag status="estimate" source="6–10 MW × 5 h" />
        </p>
        <div className="mt-6">
          <Notice tone="info" title="Supplier failures stranded buses, not depots">
            Proterra filed for Chapter 11 in August 2023, and its transit business sold for $3.5 million. Fresno&apos;s
            nine Proterra buses and TCAT&apos;s seven electric buses were all off the road in 2024, and FTA issued a
            safety advisory on some Proterra models that October. These failures stranded vehicles and parts supply.
            They did not create a power-access gap. See{" "}
            <Link href="/research/fleet-storage-landscape">storage suppliers</Link> for other supplier statuses.
          </Notice>
        </div>
      </ReportSection>

      {/* 06 AXIVAI */}
      <ReportSection id="axivai" no="06" title="Where AXIVAI fits">
        <div className="axr-prose mb-6">
          <p className="axr-lead">
            Agencies plan the permanent fix. AXIVAI covers the moments that plan leaves open.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="axr-card">
            <h3 className="axr-h2 mb-2">Resilience on call</h3>
            <p className="axr-small">
              Depots built with a generator port can take a zero-emission mobile source during outages. NREL expects
              mobile batteries to play this role and recommends renting rather than owning. AXIVAI delivers it on
              call, priced against a rented diesel generator.
            </p>
          </div>
          <div className="axr-card">
            <h3 className="axr-h2 mb-2">Bridging early buses</h3>
            <p className="axr-small">
              When buses arrive before the depot is ready, they still need to run. Santa Maria made do with one
              50 kW charger. At pilot scale (5–10 buses) this is the same problem as a school-bus yard, and AXIVAI
              brings the energy in until the depot is energised.
            </p>
          </div>
          <div className="axr-card">
            <h3 className="axr-h2 mb-2">Construction phases</h3>
            <p className="axr-small">
              Depot rebuilds and switchgear cut-overs take part of a site&apos;s power out of service for weeks or
              months. AXIVAI keeps the affected buses charging until the new equipment is live.
            </p>
          </div>
        </div>
        <div className="axr-sunken mt-6 axr-prose">
          <p className="axr-small">
            Routine nightly charging for a whole transit depot belongs to the grid: phased upgrades and managed
            charging cover it. AXIVAI&apos;s first market remains school-bus and{" "}
            <Link href="/research/fleet-charging-hubs">commercial fleet yards</Link>, with transit as an on-call
            and bridging customer.
          </p>
        </div>
      </ReportSection>

      {/* 07 Sources */}
      <ReportSection id="sources" no="07" title="Sources">
        <SourceList sources={SOURCES} />
        <div className="mt-6">
          <p className="axr-caption mb-4">
            Related:{" "}
            <Link href="/research/school-bus-depots">school-bus depots</Link>,{" "}
            <Link href="/research/ny-implementation-gap">New York implementation gap</Link> and{" "}
            <Link href="/research/fleet-storage-landscape">storage suppliers</Link>.
          </p>
          <Notice tone="info" title="Dates">
            Several figures date from 2020–2022: the CALSTART guide, NREL interviews, MTA&apos;s 370 MW estimate and
            LA Metro&apos;s 2021 plan.
          </Notice>
        </div>
      </ReportSection>

      {/* 08 Open questions */}
      <ReportSection id="open-questions" no="08" title="What we&apos;re investigating next">
        <div className="grid gap-4 md:grid-cols-2">
          {[
            ["Buses idle for lack of power", "How many, where, and for how long. No dataset found."],
            ["Real depot peaks", "Measured coincident peaks under managed charging, not charger nameplate."],
            ["Utility timelines, by agency", "Actual energisation dates against plans for MTA, LA Metro and King County."],
            ["Outage history at depots", "How often transit depots lose power, and for how long."],
            ["Willingness to pay for resilience", "Against a rented generator and a permanent microgrid."],
            ["Temporary power during construction", "Whether agencies rent power during depot rebuilds, and what it costs."],
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
          title="Run a transit depot that's waiting on power?"
          body="Tell us how many buses are idle, how many months you've waited or how many outage hours you've had. Five minutes; rough numbers are fine."
        />
      </ReportSection>

      {/* 09 Next steps */}
      <ReportSection id="next-steps" no="09" title="Next steps">
        <ol className="axr-steps axr-steps-4">
          {[
            ["Verify", "Recheck the 2020–22 figures against current MTA, LA Metro and CARB documents."],
            ["Ask", "Interview 3–5 agencies about idle buses, construction outages and resilience plans."],
            ["Price", "Get rental quotes for generators and mobile batteries for depot outage cover."],
            ["Offer", "Put an on-call resilience offer in front of the agencies with the most outage hours."],
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
