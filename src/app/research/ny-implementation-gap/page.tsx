import type { Metadata } from "next";
import Link from "next/link";
import { GapCta, ReportSection, ReportShell, SourceList, type Source } from "@/components/report/layout";
import {
  DataTag,
  Metric,
  Notice,
  type Provenance,
} from "@/components/report/primitives";
import "../report.css";

// Content source: earlier internal research on the New York School Bus Incentive Program, with every
// figure kept here re-checked against the public sources listed below (31 October 2026).

export const metadata: Metadata = {
  alternates: { canonical: "/research/ny-implementation-gap" },
  title: "New York's electric school-bus gap: how much is power? | AXIVAI",
  description:
    "An AXIVAI industry review: New York districts are electrifying school buses slowly. How much of the lag comes from depots that can't get power in time, and how much from cost, funding, range and planning?",
};

const TOC = [
  ["question", "The question"],
  ["findings", "What we found"],
  ["barriers", "How districts rank the barriers"],
  ["pipeline", "Funded but not finished"],
  ["utilities", "What utilities already offer"],
  ["alternatives", "The alternatives test"],
  ["axivai", "Where AXIVAI fits"],
  ["sources", "Sources"],
  ["open-questions", "What we're investigating next"],
  ["next-steps", "Next steps"],
] as const;

const NYSED = "NYSED Zero Emission Busing Implementation Progress Report, October 2025";
const NYSBIP = "NYSERDA NYSBIP School Bus Projects dataset, refreshed 26 October 2026";

const FINDINGS: { claim: string; tag: Provenance; source: string; note?: string }[] = [
  {
    claim: "117 of 15,835 district-owned buses (under 1%) were zero-emission in 2024–25, up from 41 a year earlier.",
    tag: "verified",
    source: NYSED,
    note: "Excludes New York City and contractor fleets.",
  },
  {
    claim: "Asked to rate six barriers, more districts rated lack of external funding “most challenging” (243 of 599) than utility support upgrades (224).",
    tag: "verified",
    source: NYSED,
    note: "Read from the report’s chart; each barrier’s counts sum to 599.",
  },
  {
    claim: "142 districts (23%) say they will need an electric service upgrade; 406 (67%) have not yet determined their needs.",
    tag: "verified",
    source: NYSED,
  },
  {
    claim: "344 districts had not received a completed Fleet Electrification Plan as of August 2025.",
    tag: "verified",
    source: "NYSERDA data, reported in the NYSED 2025 report",
  },
  {
    claim: "Utility make-ready programmes are mostly refunds: districts pay upfront, which often means debt that needs voter approval. Only 54 districts have held a vote; 38 passed.",
    tag: "verified",
    source: NYSED,
  },
  {
    claim: "NYSBIP has vouchers for 461 zero-emission buses across 84 districts; 177 of those buses are in completed projects.",
    tag: "verified",
    source: NYSBIP,
    note: "“Closed” means the project is complete. An open project may still have buses running.",
  },
  {
    claim: "Completed NYSBIP projects took a median of about 18 months from approval to completion.",
    tag: "estimate",
    source: "AXIVAI arithmetic on the NYSBIP dataset (169 buses with both dates)",
    note: "Reasons for the time taken are not recorded.",
  },
  {
    claim: "About 90% of National Grid’s New York three-phase feeders have at least 500 kW of available capacity.",
    tag: "verified",
    source: "National Grid, Upstate NY electric school bus overview (3/26)",
    note: "The utility’s own claim. Feeder capacity is not the same as a site’s service capacity.",
  },
  {
    claim: "Some constraints sit at the substation: National Grid’s Delameter rebuild, partly for future school-bus load, takes about 2 years from late 2026.",
    tag: "verified",
    source: "ICCT policy update on New York proactive planning, July 2026",
  },
  {
    claim: "The purchase mandate now starts 1 July 2032 (with up to two 24-month extensions); full zero-emission operation is due 1 July 2040.",
    tag: "verified",
    source: "NY Education Law §3638, revision of 29 May 2026",
    note: "Previously 2027 and 2035. Lawmakers cited cost, bus availability and range, not the grid.",
  },
];

// NYSED 2025 survey, "Common Challenges" chart: districts rating each barrier 5 or 6 on a 1–6 scale (599 responses each).
const BARRIERS: { name: string; six: number; five: number }[] = [
  { name: "Lack of external funding", six: 243, five: 108 },
  { name: "Utility support upgrades", six: 224, five: 113 },
  { name: "Facility or construction", six: 199, five: 125 },
  { name: "Vehicle range or performance", six: 194, five: 116 },
  { name: "Lack of voter support", six: 163, five: 95 },
  { name: "Contractor or vendor compliance", six: 98, five: 36 },
];
const BARRIER_N = 599;
const BARRIER_MAX = 300;

const ALTERNATIVES: { option: string; wins: string; fails: string; note: string }[] = [
  {
    option: "Wait for the utility, with make-ready",
    wins: "Most upstate sites, where the feeder has capacity and only the service needs work",
    fails: "Substation-level constraints that take years",
    note: "Up to 90% of utility-side costs covered. The 2032 start date makes waiting cheaper than it was.",
  },
  {
    option: "Managed charging and the EV Phase-In Rate",
    wins: "Small fleets on existing service",
    fails: "Can’t add energy the site doesn’t have",
    note: "72% of district-owned fleets have 40 buses or fewer (NYSED).",
  },
  {
    option: "Stationary battery on existing service",
    wins: "Sites short of peak kW but not of daily energy",
    fails: "Permits; upfront cost",
    note: "National Grid’s load-management programme funds up to 60% of on-site storage.",
  },
  {
    option: "Phase in fewer buses, or use an extension",
    wins: "Districts without funding or voter approval yet",
    fails: "Leaves the power question for later",
    note: "Two 24-month extensions are available on the 2032 purchase date.",
  },
  {
    option: "Generator or existing mobile-charging supplier",
    wins: "Short bridges at a known site",
    fails: "Emissions, noise, fuel; cost per kWh",
    note: "No New York pricing found.",
  },
  {
    option: "AXIVAI bridge power",
    wins: "Buses funded and delivered, but the depot waits on a substation upgrade",
    fails: "Sites where the options above already work",
    note: "Built for depots waiting on substation work, such as National Grid’s two-year Delameter rebuild.",
  },
];

const SOURCES: Source[] = [
  {
    title: "New York State Education Department, Zero Emission Busing Implementation Progress Report (October 2025)",
    href: "https://www.nysed.gov/sites/default/files/programs/pupil-transportation/2025-zeb-implementation-progress-report-final.pdf",
    use: "Fleet counts, barrier ratings, service-upgrade needs, FEP status, funding and voter data.",
    caution: "Self-reported district survey (609 of 681 responded). Excludes New York City and contractor fleets. The 2026 edition was not found at the time of writing.",
  },
  {
    title: "NYSERDA, NYSBIP School Bus Projects: Beginning 2023 (data.ny.gov)",
    href: "https://data.ny.gov/d/7nqt-yksu",
    use: "Voucher-funded buses, districts, project status and dates.",
    caution: "Covers NYSBIP only, not buses funded in other ways. “Approved” projects can change, and an open project does not mean buses are idle.",
  },
  {
    title: "New York Education Law §3638 (NY Senate)",
    href: "https://www.nysenate.gov/legislation/laws/EDN/3638",
    use: "Current purchase and operation deadlines, extensions and district reporting duties.",
    caution: "Amended in May 2026 and could change again.",
  },
  {
    title: "Joint Utilities of New York, Medium- and Heavy-Duty Make-Ready Pilot",
    href: "https://jointutilitiesofny.org/ev/make-ready/mhd-pilot-program",
    use: "Incentive tiers and customer-side caps for six utilities.",
    caution: "First-come, first-served; funding status changes. Does not say how long energisation takes.",
  },
  {
    title: "National Grid, Upstate New York Electric School Bus (ESB) Overview",
    href: "https://www.nationalgridus.com/media/pdfs/bus-ways-to-save/ev/cm8892-ny-e-bus-one-pager.pdf",
    use: "Feeder capacity claim, storage and load-management incentives, NYSBIP voucher ranges.",
    caution: "Marketing material from the utility. Covers National Grid territory only.",
  },
  {
    title: "NY Department of Public Service, PSC approves critically needed infrastructure projects (12 June 2025)",
    href: "https://dps.ny.gov/news/psc-oks-critically-needed-infrastructure-projects",
    use: "29 urgent upgrades worth $636.2 million and 642 MW across four utilities.",
    caution: "Gives no completion dates and does not mention school buses.",
  },
  {
    title: "NY Department of Public Service, Recommendations for Addressing EV Charger Load Interconnection Issues (15 June 2026)",
    href: "https://documents.dps.ny.gov/public/Common/ViewDoc.aspx?DocRefId=%7B5006CD9E-0000-CC14-A8FC-05216F6E7D58%7D",
    use: "Timelines for transportation electrification projects and the gap between fleet delivery and grid upgrades.",
    caution: "A staff summary of stakeholder input, not project-level data.",
  },
  {
    title: "ICCT, New York’s proactive grid planning proceeding (July 2026)",
    href: "https://theicct.org/wp-content/uploads/2026/08/ID-617-%E2%80%93-NY-grid-planning_policy-update_final.pdf",
    use: "Example of a substation upgrade tied to school-bus load, with its timeline.",
    caution: "Secondary summary of PSC filings.",
  },
  {
    title: "U.S. Department of Energy, Electric School Bus Planning Guide",
    href: "https://afdc.energy.gov/guides/electric-school-bus",
    use: "General lead times: several months for simpler upgrades, 3–5 years or longer for large ones.",
    caution: "National, not New York-specific.",
  },
  {
    title: "Spectrum News, Delay to electric bus mandate expected in budget (13 May 2026)",
    href: "https://spectrumlocalnews.com/nys/central-ny/politics/2026/05/13/delay-electric-bus-mandate-budget",
    use: "Reasons lawmakers gave for the delay.",
    caution: "News report quoting legislators, not an analysis of causes.",
  },
];

export default function NyImplementationGapReport() {
  const pct = (v: number) => `${(v / BARRIER_MAX) * 100}%`;
  const share = (v: number) => Math.round((v / BARRIER_N) * 100);

  return (
    <ReportShell
      slug="ny-implementation-gap"
      eyebrow="Industry review"
      title="New York's electric school-bus gap: how much is power?"
      lead={
        <>
          New York districts are converting their buses slowly. How much of that comes from depots that can&apos;t
          get power in time, and how much from cost, funding, range and planning?
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
          <Metric label="District buses that are zero-emission" value="117" unit="of 15,835" status="verified" source={NYSED} />
          <Metric label="Rate utility upgrades most challenging" value="224" unit="of 599 districts" status="verified" source={NYSED} />
          <Metric label="Still unsure of their power needs" value="67%" unit="of districts" status="verified" source={NYSED} />
          <Metric label="Median voucher approval to completion" value="~18" unit="months" status="estimate" source="AXIVAI arithmetic, NYSBIP dataset" />
        </div>
        <div className="axr-sunken mt-6 axr-prose">
          <p>
            <strong>What we found.</strong> Power access is one of New York&apos;s top two barriers: 224 of 599
            districts rate utility upgrades most challenging, just behind funding. Two-thirds of districts haven&apos;t
            yet worked out what power they need, so the problem is still surfacing. Where power binds hardest, depots
            face substation work measured in years. Those are the sites AXIVAI is built for.
          </p>
          <p className="axr-small axr-muted">
            The purchase mandate now starts in 2032, not 2027. The districts moving first, with funding and buses in
            hand, are the ones meeting the grid wait today.
          </p>
        </div>
      </section>

      <ReportSection id="question" no="01" title="The question">
        <div className="axr-prose">
          <p className="axr-lead">
            How much of New York&apos;s slow start on electric school buses is a power-access problem, and how much
            comes from other causes?
          </p>
          <p className="axr-muted">
            We start with the need, not the truck: find the depots where power is the real hold-up, and leave the
            rest to managed charging, make-ready programmes and the utility.
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
      </ReportSection>

      <ReportSection id="barriers" no="03" title="How districts rank the barriers">
        <div className="space-y-6">
          <figure className="axr-chart axr-card" aria-labelledby="barrier-chart-title">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div id="barrier-chart-title" className="axr-h2">Districts rating each barrier as hard</div>
                <p className="axr-caption mt-1">
                  NYSED 2025 survey, 1–6 scale, 599 responses per barrier. Hover or focus a bar for detail.
                </p>
              </div>
              <div className="axr-legend" aria-hidden="true">
                <span className="axr-legend-item">
                  <span className="axr-swatch" style={{ background: "var(--accent-ink)" }} />
                  Rated 6, most challenging
                </span>
                <span className="axr-legend-item">
                  <span className="axr-swatch" style={{ background: "var(--gold)" }} />
                  Rated 5
                </span>
              </div>
            </div>
            <div className="axr-chart-rows">
              {BARRIERS.map((b) => (
                <div key={b.name} className="axr-chart-row">
                  <div className="axr-chart-label">{b.name}</div>
                  <div className="axr-plot">
                    {(
                      [
                        ["overnight", b.six, "rated 6"],
                        ["day", b.five, "rated 5"],
                      ] as const
                    ).map(([key, v, label]) => (
                      <div key={key} className="axr-bar-track">
                        <div
                          className={`axr-bar axr-bar-${key}`}
                          style={{ width: pct(v) }}
                          tabIndex={0}
                          role="img"
                          aria-label={`${b.name}, ${label}: ${v} districts, ${share(v)}% of ${BARRIER_N}`}
                        >
                          <span className="axr-bar-value" aria-hidden="true">{v}</span>
                          <span className="axr-tip" aria-hidden="true">
                            <strong>{b.name} · {label}</strong>
                            <br />
                            {v} districts, {share(v)}% of {BARRIER_N}.
                          </span>
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
                {[0, 100, 200, 300].map((t) => (
                  <span key={t} style={{ left: pct(t) }}>{t}</span>
                ))}
              </div>
            </div>
            <figcaption className="axr-caption mt-6">
              Counts read from the &ldquo;Common Challenges&rdquo; chart in the NYSED report. Percentages are AXIVAI
              arithmetic. See the table below.
            </figcaption>
          </figure>

          <div className="axr-table-wrap">
            <table className="axr-table">
              <caption>Table view of the chart. Counts verified against the NYSED report; shares are estimates.</caption>
              <thead>
                <tr>
                  <th scope="col">Barrier</th>
                  <th scope="col" className="axr-num">Rated 6</th>
                  <th scope="col" className="axr-num">Rated 5</th>
                  <th scope="col" className="axr-num">5 or 6</th>
                </tr>
              </thead>
              <tbody>
                {BARRIERS.map((b) => (
                  <tr key={b.name}>
                    <th scope="row">{b.name}</th>
                    <td className="axr-num">{b.six}</td>
                    <td className="axr-num">{b.five}</td>
                    <td className="axr-num">{b.six + b.five} · {share(b.six + b.five)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="axr-prose">
            <p>
              Utility upgrades sit second, within a few points of funding, facilities and range. Four barriers are
              rated hard by more than half of districts. No single fix, power included, unlocks the transition on
              its own.
            </p>
          </div>

          <Notice tone="info" title="Most districts haven't checked their power yet">
            67% of districts haven&apos;t yet worked out their service needs, and 344 had no completed fleet plan in
            August 2025. As those plans are finished, more districts will find out what their site can carry.
          </Notice>
        </div>
      </ReportSection>

      <ReportSection id="pipeline" no="04" title="Funded but not finished">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="axr-card">
            <div className="axr-metric-label">Buses with NYSBIP vouchers</div>
            <div className="axr-metric-value mt-2">461<span className="axr-metric-unit">in 84 districts</span></div>
            <div className="mt-3"><DataTag status="verified" source={NYSBIP} /></div>
          </div>
          <div className="axr-card">
            <div className="axr-metric-label">In completed projects</div>
            <div className="axr-metric-value mt-2">177<span className="axr-metric-unit">38%</span></div>
            <div className="mt-3"><DataTag status="verified" source={NYSBIP} /></div>
          </div>
          <div className="axr-card">
            <div className="axr-metric-label">Open for over a year</div>
            <div className="axr-metric-value mt-2">225<span className="axr-metric-unit">buses</span></div>
            <div className="mt-3"><DataTag status="estimate" source="AXIVAI arithmetic, NYSBIP dataset as of 26 October 2026" /></div>
          </div>
        </div>
        <div className="axr-prose mt-6 space-y-4">
          <p>
            This is the closest public measure of &ldquo;funded but not running&rdquo;. Of 255 buses approved in
            2024, 128 are still in open projects. Projects that did finish took a median of about 18 months.
          </p>
          <p className="axr-muted">
            The dataset doesn&apos;t say why. Bus build times, charger installation, voter approval and utility
            work could each explain an open project, and buses may be running before NYSERDA closes it.
          </p>
        </div>
        <div className="axr-sunken mt-6 axr-prose flex flex-wrap items-center gap-3">
          <DataTag status="unknown" />
          <span className="axr-small">
            The next number we&apos;re pinning down: the share of open projects waiting on power.
          </span>
        </div>
      </ReportSection>

      <ReportSection id="utilities" no="05" title="What utilities already offer">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="axr-card">
            <div className="axr-metric-label">Make-ready pilot</div>
            <p className="mt-2 axr-small">
              Six utilities cover up to 90% of utility-side costs. Customer-side support is 90% in disadvantaged
              communities, 50% nearby, and none for a private depot outside them.
            </p>
            <div className="mt-3"><DataTag status="verified" source="Joint Utilities of New York" /></div>
          </div>
          <div className="axr-card">
            <div className="axr-metric-label">Urgent grid upgrades</div>
            <p className="mt-2 axr-small">
              In June 2025 the PSC approved 29 projects worth $636.2 million for 642 MW, ahead of a statewide
              proactive-planning framework adopted later that year.
            </p>
            <div className="mt-3"><DataTag status="verified" source="NY DPS, 12 June 2025; ICCT, July 2026" /></div>
          </div>
          <div className="axr-card">
            <div className="axr-metric-label">Planning and rates</div>
            <p className="mt-2 axr-small">
              Free fleet assessments, an EV Phase-In Rate that softens demand charges, and up to 60% funding for
              on-site storage (National Grid).
            </p>
            <div className="mt-3"><DataTag status="verified" source="National Grid ESB overview (3/26)" /></div>
          </div>
        </div>
        <div className="mt-6">
          <Notice tone="info" title="The upfront-cost trap">
            NYSED notes that most make-ready programmes refund costs after the work. Districts must find the money
            first, usually as voter-approved debt. A funding gap can look like a power gap from outside.
          </Notice>
        </div>
      </ReportSection>

      <ReportSection id="alternatives" no="06" title="The alternatives test">
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
      </ReportSection>

      <ReportSection id="axivai" no="07" title="Where AXIVAI fits">
        <div className="axr-prose space-y-4">
          <p className="axr-lead">
            The buses arrive in months. The grid takes a year or more. AXIVAI covers the gap.
          </p>
          <p>
            New York&apos;s own regulator says transportation electrification projects take &ldquo;a few months
            upstate, a year or longer downstate&rdquo;, and that while fleets can be delivered in a few months, the
            upgrades and approvals often take six months or longer. AXIVAI trucks deliver energy into storage on the
            yard, so the buses run from the day they arrive.
          </p>
          <ul className="axr-small space-y-2 list-disc pl-5">
            <li>
              <strong>Who we serve first.</strong> Districts and operators with funding, approval and buses in hand
              that are still waiting on the grid.
            </li>
            <li>
              <strong>Where the wait is longest.</strong> Substation work such as National Grid&apos;s two-year
              Delameter rebuild. That is long enough to cost a fleet a school year or more, and AXIVAI moves on when the
              permanent service arrives.
            </li>
            <li>
              <strong>Why timing matters.</strong> Voucher-funded buses need to run. Grant deadlines, not only the 2032
              mandate, set the clock.
            </li>
            <li>
              <strong>Storage on the yard, topped up by truck.</strong> Utilities already fund on-site batteries, so
              storage on the yard is a familiar step for districts. See the{" "}
              <Link href="/research/school-bus-depots">school-bus depot case</Link>.
            </li>
          </ul>
        </div>
      </ReportSection>

      <ReportSection id="sources" no="08" title="Sources">
        <SourceList sources={SOURCES} />
      </ReportSection>

      <ReportSection id="open-questions" no="09" title="What we&apos;re investigating next">
        <div className="grid gap-4 md:grid-cols-2">
          {[
            ["Why NYSBIP projects stay open", "Bus delivery, chargers, votes or the utility?"],
            ["Service versus substation upgrades", "How many depots need each, by utility territory."],
            ["Energisation times in New York", "Request-to-power data, by utility and upgrade type."],
            ["The 2026 NYSED report", "Whether barrier rankings shifted after a year of planning."],
            ["Non-disadvantaged private depots", "Whether no customer-side incentive stalls them."],
            ["New York City and contractor depots", "Excluded from the NYSED figures; likely the densest loads."],
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
          title="Run a New York depot that's waiting on power?"
          body="Tell us what's holding up your depot, and we'll show you how AXIVAI can keep your buses running through the wait."
        />
      </ReportSection>

      <ReportSection id="next-steps" no="10" title="Proposed next steps">
        <ol className="axr-steps axr-steps-4">
          {[
            ["Update", "Pull the 2026 NYSED report and a fresh NYSBIP extract when available."],
            ["Map", "Place open NYSBIP projects on utility territories and known constrained substations."],
            ["Ask", "Survey a sample of districts with open projects about what is holding them up."],
            ["Pilot", "Size the substation-wait segment and line up the first pilot sites."],
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
