import type { Metadata } from "next";
import Link from "next/link";
import { GapCta, ReportShell, SourceList, type Source } from "@/components/report/layout";
import { ReportDiagram } from "@/components/report/ReportDiagram";
import {
  DataTag,
  Metric,
  Notice,
  TierChart,
  type Provenance,
  type Tier,
} from "@/components/report/primitives";
import "../report.css";

// Content source: research case brief (reviewed in chat, 31 October 2026).

export const metadata: Metadata = {
  alternates: { canonical: "/research/school-bus-depots" },
  title: "Electric school-bus depots: research case | AXIVAI",
  description:
    "AXIVAI's initial research case: when an electric school-bus depot can't get the power it needs in time, which option charges the fleet at the lowest total cost?",
};

const TOC = [
  ["question", "The question"],
  ["findings", "What we found"],
  ["example", "Worked example"],
  ["alternatives", "The alternatives test"],
  ["park-out", "Park-out buses"],
  ["permitting", "Permitting risk"],
  ["sources", "Sources"],
  ["open-questions", "What we're investigating next"],
  ["next-steps", "Next steps"],
] as const;

const FINDINGS: { claim: string; tag: Provenance; source: string; note?: string }[] = [
  {
    claim: "Depots needing new grid infrastructure face costly upgrades with “long lead times (3–5 years or longer)”; simpler upgrades can take several months.",
    tag: "verified",
    source: "DOE Electric School Bus Planning Guide",
  },
  {
    claim: "Temporary mobile charging is an option when utility upgrades run late.",
    tag: "verified",
    source: "DOE Electric School Bus Planning Guide",
    note: "No specifications or costs given.",
  },
  {
    claim: "Where demand charges apply, managed charging is “essential”.",
    tag: "verified",
    source: "DOE Electric School Bus Planning Guide",
  },
  {
    claim: "Interconnection takes 18 to 36 months.",
    tag: "estimate",
    source: "Fleet battery storage report, citing a trade-press developer article",
    note: "Weaker than DOE; prefer the DOE range.",
  },
  {
    claim: "A utility delivered 2.7 MW for an all-electric school-bus fleet in Oakland a year early.",
    tag: "verified",
    source: "PG&E Currents",
    note: "Where the utility delivers early, the grid is the answer.",
  },
  {
    claim: "Con Edison's make-ready programme covers up to 90% of utility-side costs, and 90% (capped at $882/kW) or 50% (capped at $490/kW) of customer-side costs depending on location; school buses are eligible.",
    tag: "verified",
    source: "Con Edison medium- and heavy-duty make-ready programme page",
    note: "Strengthens the “wait for the utility” alternative.",
  },
  {
    claim: "Cold weather can cut range by up to 50%.",
    tag: "verified",
    source: "DOE Electric School Bus Planning Guide",
  },
  {
    claim: "An 80-mile day at 0°F needs about 25 kW of charging per bus.",
    tag: "verified",
    source: "DOE planning chart",
  },
];

const TIERS: Tier[] = [
  { spareKw: 400, overnightKwh: 4800, dayKwh: 9600, verdict: "Managed charging alone covers the night." },
  { spareKw: 250, overnightKwh: 3000, dayKwh: 6000, verdict: "A battery charged during the day closes the gap." },
  { spareKw: 150, overnightKwh: 1800, dayKwh: 3600, verdict: "Even 24 hours falls short: energy must come from elsewhere." },
];

const ALTERNATIVES: { option: string; wins: string; fails: string; note: string }[] = [
  { option: "Managed charging", wins: "Tier 1 sites, which may be most sites", fails: "Can't create energy the site doesn't have", note: "Recommended by DOE. NYCSBUS uses it; no results published." },
  { option: "Battery on existing service", wins: "Tier 2 sites; also cuts demand charges", fails: "Needs about 24 hours of spare capacity, plus permits", note: "VTA: 4 MWh / 1 MW battery with two 1.5 MW chargers; the vendor projects 48% lower costs. Aggreko rents units up to 1 MW / 1.2 MWh." },
  { option: "Wait for the utility upgrade", wins: "Short or subsidised delays", fails: "Delays of 3–5+ years", note: "Make-ready programmes cut the cost of the permanent fix." },
  { option: "Generator rental", wins: "Tier 3 sites, long-duration need", fails: "Emissions, noise, fuel logistics", note: "Rental cost unknown." },
  { option: "Existing mobile charging supplier", wins: "Bridging and rescue charging", fails: "Cost per kWh; serving a whole fleet every night", note: "SparkCharge has piloted a 320 kW battery trailer (trade press). Pricing unknown." },
  { option: "Charging-as-a-service fleets", wins: "Districts wanting one fixed fee", fails: "Still need grid capacity", note: "Bundle bus, charger and service. Possible partners or competitors." },
  { option: "AXIVAI mobile delivery", wins: "Tier 3 sites, for a limited period", fails: "Logistics cost (stress test)", note: "About 1.4 deliveries a night in the example." },
  { option: "AXIVAI stationed power + occasional delivery", wins: "Tier 2 and 3 sites", fails: "Permits; asset ownership", note: "Fits the sites the simpler options can't cover." },
];

const SOURCES: Source[] = [
  {
    title: "U.S. Department of Energy, Electric School Bus Planning Guide",
    href: "https://afdc.energy.gov/guides/electric-school-bus",
    use: "Primary source for timelines, charger levels, cold-weather effects and managed charging.",
    caution: "No costs or specifications for temporary mobile charging.",
  },
  {
    title: "Con Edison, Medium- and Heavy-Duty EV Charging Infrastructure Program",
    href: "https://www.coned.com/en/our-energy-future/electric-vehicles/medium-heavy-duty-ev-charging-infrastructure-program",
    use: "Make-ready incentive tiers and per-kW caps.",
    caution: "No budget or application status shown; incentives depend on location and site type and can change.",
  },
  {
    title: "PG&E Currents, PG&E helps Zum deploy an all-electric school-bus fleet in Oakland",
    href: "https://www.pge.com/en/newsroom/currents/future-of-energy/articles-4040-pge-helps-zum-deploy-nations-100-electric-school-bus-fleet-oakland-new-school-year.html",
    use: "2.7 MW delivered for a school-bus depot, a year early.",
    caution: "Utility press article about its own project; one site.",
  },
  {
    title: "Hodgson Russ, New NYC Department of Buildings rules for energy storage systems",
    href: "https://www.hodgsonruss.com/newsroom/publications/new-nyc-department-of-buildings-rules-set-comprehensive-standards-for-energy-storage-systems",
    use: "Effective date, thresholds and peer review under the NYC storage rules.",
    caution: "A law-firm summary, not the rule text.",
  },
  {
    title: "Scale Microgrids, VTA Cerone bus yard project",
    href: "https://www.scalemicrogrids.com/projects/vta",
    use: "Battery and charger ratings for a battery-buffered bus depot.",
    caution: "Vendor page; the cost saving is a vendor projection.",
  },
  {
    title: "Aggreko, Energy storage rental",
    href: "https://www.aggreko.com/en-us/products/energy-storage",
    use: "Rental battery unit ratings.",
    caution: "Vendor page; no pricing.",
  },
  {
    title: "Charged EVs, SparkCharge mobile battery trailer delivers 320 kW DC charging",
    href: "https://chargedevs.com/newswire/sparkcharges-mobile-battery-powered-trailer-delivers-320-kw-dc-charging-for-zipcars-evs/",
    use: "Scale of current mobile charging equipment.",
    caution: "Trade press based on a company announcement; a pilot, not fleet operations.",
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
    <ReportShell
      slug="school-bus-depots"
      eyebrow="Research case"
      title="Electric school-bus depots"
      lead={
        <>
          When a depot can&apos;t get the power it needs in time, which option charges the fleet reliably at the
          lowest total cost, and when, if ever, does deployable power win?
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
                <Metric label="Daily need, example depot" value="4,000" unit="kWh" status="estimate" source="40 buses × 60 mi × 1.5 kWh/mi ÷ 90%" />
                <Metric label="Average overnight draw" value="333" unit="kW" status="estimate" source="4,000 kWh over a 12-hour window" />
                <Metric label="Peak if all charge at once" value="768" unit="kW" status="estimate" source="40 × 19.2 kW Level 2 chargers" />
                <Metric label="Large-upgrade lead time" value="3–5+" unit="years" status="verified" source="DOE Electric School Bus Planning Guide" />
              </div>
              <div className="axr-sunken mt-6 axr-prose">
                <p>
                  <strong>What we found.</strong> The site&apos;s spare power decides the answer. Where there is enough of it,
                  managed charging or a battery on the existing service does the job. Where even 24 hours of spare
                  capacity can&apos;t cover the daily need, and upgrades take 3–5 years or longer, energy has to come in
                  from outside. That is where AXIVAI fits: a battery stationed on the yard, topped up by truck, so the
                  buses run while the utility work catches up.
                </p>
              </div>
            </section>

            {/* 01 Question */}
            <section id="question" aria-labelledby="question-title" className="axr-section">
              <SectionHead id="question" no="01" title="The question" />
              <div className="axr-prose">
                <p className="axr-lead">
                  When an electric school-bus depot can&apos;t get the power it needs in time, which option charges the
                  fleet reliably at the lowest total cost?
                </p>
                <p className="axr-muted">
                  The options compared: managed charging, a battery on the existing service, waiting for the utility,
                  a generator, an existing mobile-charging supplier, and AXIVAI&apos;s mobile and stationed modes. Where a
                  simpler option does the job, use it. AXIVAI is built for the sites where those options run out.
                </p>
              </div>
            </section>

            {/* 02 Findings */}
            <section id="findings" aria-labelledby="findings-title" className="axr-section">
              <SectionHead id="findings" no="02" title="What we found" />
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
                <Notice tone="info" title="The number we're collecting next">
                  What a power delay costs a district: idle buses, missed grant deadlines and diesel kept running.
                </Notice>
              </div>
            </section>

            {/* 03 Worked example */}
            <section id="example" aria-labelledby="example-title" className="axr-section">
              <SectionHead id="example" no="03" title="Worked example: one depot, three grid situations" />
              <div className="space-y-6">
                <Notice tone="assumption" title="Assumptions">
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
                  <ReportDiagram
                    file="school-bus-depots-decision-rule.svg"
                    caption="Decision rule for the example depot. Figures are estimates from the worked example above."
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="axr-card">
                    <h3 className="axr-h2 mb-2">Trucking the shortfall</h3>
                    <div className="axr-metric-value">$186,000<span className="axr-metric-unit">a year</span></div>
                    <p className="axr-small axr-muted mt-2">
                      150 kW site: 2,200 kWh a night, about 1.4 deliveries at 1,600 kWh each, 180 school days, at the
                      AXIVAI business plan&apos;s stress-test $0.469/kWh. Before equipment, financing and overhead.
                    </p>
                    <div className="mt-3"><DataTag status="estimate" source="AXIVAI business plan, stress test" /></div>
                  </div>
                  <div className="axr-card">
                    <h3 className="axr-h2 mb-2">Stationed battery + top-ups</h3>
                    <div className="axr-metric-value">400<span className="axr-metric-unit">kWh/day to bring in</span></div>
                    <p className="axr-small axr-muted mt-2">
                      With a battery charged around the clock, the same site is short only 400 kWh a day: a few
                      deliveries a week instead of nearly two a night. This is the AXIVAI model.
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
                <Notice tone="info" title="Market warning signs">
                  Moxion (mobile batteries) filed for Chapter 7 in August 2024; Lightning eMotors went into receivership
                  and its assets went to a Gillig subsidiary; Lion Electric entered creditor protection in December 2024
                  and closed its Joliet plant. Equipment that sits idle doesn&apos;t pay, so AXIVAI moves its storage from
                  site to site as each grid connection arrives.
                </Notice>
              </div>
            </section>

            {/* 05 Park-out */}
            <section id="park-out" aria-labelledby="park-out-title" className="axr-section">
              <SectionHead id="park-out" no="05" title="Sub-case: park-out buses" />
              <div className="grid gap-4 md:grid-cols-3">
                <div className="axr-card">
                  <div className="axr-metric-label">Scale</div>
                  <p className="mt-2 axr-small">About 1,000 park-out buses in NYC. Outside NYC, 96% of buses return to a depot overnight, so park-out is a minority pattern.</p>
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
              <div className="axr-sunken mt-6 axr-prose">
                <p className="axr-small">
                  Driving power to individual driveways doesn&apos;t pay. A stationed hub serves park-out buses better.
                </p>
              </div>
            </section>

            {/* 06 Permitting */}
            <section id="permitting" aria-labelledby="permitting-title" className="axr-section">
              <SectionHead id="permitting" no="06" title="Permitting can recreate the delay" />
              <div className="axr-prose space-y-4">
                <p>
                  New NYC Department of Buildings rules for battery storage took effect on 26 October 2025. A stationed
                  battery may face its own months of approvals, so AXIVAI plans permits into every deployment from day one.
                </p>
                <ul className="axr-small space-y-2 list-disc pl-5">
                  <li>Permit rules start at 1 kWh of lithium-ion capacity.</li>
                  <li>Engineering peer review is required for most site-specific installations.</li>
                  <li>It is unclear whether a mobile battery discharging on site counts as stationary storage.</li>
                </ul>
                <div className="flex flex-wrap items-center gap-2">
                  <DataTag status="estimate" source="Law-firm summary of the NYC Department of Buildings storage rules (Hodgson Russ)" />
                  <span className="axr-caption">NYC only. Other jurisdictions unknown.</span>
                </div>
              </div>
            </section>

            {/* 07 Sources */}
            <section id="sources" aria-labelledby="sources-title" className="axr-section">
              <SectionHead id="sources" no="07" title="Sources" />
              <SourceList sources={SOURCES} />
              <div className="mt-6">
                <p className="axr-caption">
                  This case also draws on earlier internal research, re-checked against the public sources above. Related:{" "}
                  <Link href="/research/fleet-storage-landscape">storage suppliers</Link>,{" "}
                  <Link href="/research/park-out-charging">park-out buses</Link> and{" "}
                  <Link href="/research/nyc-district-depots">NYC depots</Link>.
                </p>
              </div>
            </section>

            {/* 08 Open questions */}
            <section id="open-questions" aria-labelledby="open-questions-title" className="axr-section">
              <SectionHead id="open-questions" no="08" title="What we&apos;re investigating next" />
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
              <GapCta
                title="Run a depot that can't get the power it needs?"
                body="Tell us your fleet size, your spare power and your utility timeline, and we'll size a pilot for your depot."
              />
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
    </ReportShell>
  );
}
