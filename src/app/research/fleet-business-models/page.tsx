import type { Metadata } from "next";
import Link from "next/link";
import { GapCta, ReportSection, ReportShell, SourceList, type Source } from "@/components/report/layout";
import { DataTag, Metric, Notice, type Provenance } from "@/components/report/primitives";
import "../report.css";

// Content source: earlier internal market research, rewritten and re-checked against public sources (31 October 2026).

export const metadata: Metadata = {
  alternates: { canonical: "/research/fleet-business-models" },
  title: "Fleet electrification business models | AXIVAI",
  description:
    "A market scan of how fleets pay for vehicles, charging and power they don't own: who pays, who holds the asset and the risk, what has traction and what has failed.",
};

const TOC = [
  ["question", "The question"],
  ["models", "Seven models mapped"],
  ["findings", "What has traction"],
  ["failures", "What failed or pivoted"],
  ["lessons", "What customers accepted"],
  ["alternatives", "The alternatives test"],
  ["axivai", "What it means for AXIVAI"],
  ["sources", "Sources"],
  ["open-questions", "What we're investigating next"],
  ["next-steps", "Next steps"],
] as const;

const MODELS: { model: string; pays: string; asset: string; risk: string; examples: string }[] = [
  {
    model: "Fleet-as-a-service",
    pays: "Fixed annual or monthly fee per vehicle, or a fixed annual service contract, over 5–15 years. Little or nothing upfront.",
    asset: "Provider owns buses and chargers",
    risk: "Provider: availability, maintenance, energy price (if bundled), OEM failure. Customer: long contract term.",
    examples: "Highland Electric Fleets, Zum, WattEV (trucks)",
  },
  {
    model: "Depot charging-as-a-service",
    pays: "Monthly subscription, or energy metered per kWh. Vehicles bought separately.",
    asset: "Provider owns chargers; sometimes the site and grid connection too",
    risk: "Provider: utilisation of the site, construction cost, grid timing. Customer: still owns vehicle risk.",
    examples: "First Student, TeraWatt, Electrify America (Electrify Commercial), Revel (public hubs)",
  },
  {
    model: "Mobile charging-as-a-service",
    pays: "Per kWh delivered, with service level set by contract. No fixed infrastructure.",
    asset: "Provider owns mobile batteries and trucks",
    risk: "Provider: logistics cost and asset utilisation. Customer: higher price per kWh.",
    examples: "SparkCharge",
  },
  {
    model: "V2G aggregation",
    pays: "Grid operator or utility pays the aggregator for services; revenue shared with the fleet owner. Fleets often also buy the bidirectional chargers.",
    asset: "Fleet owns the vehicles; aggregator owns software, sometimes chargers",
    risk: "Aggregator: market rules, utility programmes, small revenue per vehicle.",
    examples: "Nuvve",
  },
  {
    model: "Storage- and energy-as-a-service",
    pays: "Rental by the month or term, or a long-term service agreement priced against utility cost.",
    asset: "Rental firm or developer owns the battery or microgrid",
    risk: "Owner: utilisation between rentals, or performance over a long contract.",
    examples: "Aggreko rentals, Scale Microgrids, ESCO-style offers (e.g. Ameresco, Enel X)",
  },
  {
    model: "OEM bundles and leases",
    pays: "Vehicle bought; battery leased monthly, or bundled with warranty and service.",
    asset: "OEM or its financier owns the leased battery",
    risk: "Customer: OEM solvency and warranty. Financier: residual value.",
    examples: "Proterra battery leases, Lion Electric, Lightning eMotors",
  },
  {
    model: "Utility make-ready and charging",
    pays: "Ratepayers fund the utility-side work through rates; the fleet pays the rest, often with rebates.",
    asset: "Utility owns infrastructure to the meter (and sometimes beyond)",
    risk: "Ratepayers and regulators: programme cost. Fleet: queue and timing.",
    examples: "Con Edison, PG&E EV Fleet, SCE Charge Ready Transport",
  },
];

const EVIDENCE_ROWS: { claim: string; tag: Provenance; source: string; note?: string }[] = [
  {
    claim: "Highland offers 10–15 year partnerships covering buses, depot work, chargers, software, electricity, maintenance and training, and says it pays for downtime if buses are not route-ready.",
   
    tag: "verified",
    source: "Highland Electric Fleets FAQ",
    note: "Company description of its own offer. It says its return comes partly from tax equity financing districts can't use.",
  },
  {
    claim: "Highland says it has 600+ buses under contract.",
   
    tag: "estimate",
    source: "Highland Electric Fleets FAQ",
    note: "Company claim; not independently counted.",
  },
  {
    claim: "Highland's total preferred-equity commitments reached $150 million, including $75 million from Galvanize, in June 2026.",
   
    tag: "verified",
    source: "IREI, June 2026",
  },
  {
    claim: "Oakland Unified pays Zum $11.2 million a year under an initial five-year contract to run 74 electric buses, each with a bidirectional charger.",
   
    tag: "verified",
    source: "KQED, June 2024 (district figure); PG&E Currents",
    note: "The PG&E article says Zum received over $35 million from the EPA Clean School Bus programme.",
  },
  {
    claim: "PG&E built all infrastructure up to the meter for the Oakland depot, about 2.7 MW, through its EV Fleet programme.",
   
    tag: "verified",
    source: "PG&E Currents",
  },
  {
    claim: "First Student offers charging-as-a-service on a monthly subscription. It reports 360+ electric buses deployed, in a fleet of about 45,000.",
   
    tag: "verified",
    source: "First Student newsroom",
    note: "Under 1% of its fleet is electric.",
  },
  {
    claim: "SparkCharge raised about $30.5 million in May 2025; fleets pay per kWh, typically 35–60 cents depending on the customer and fleet size.",
   
    tag: "estimate",
    source: "TechCrunch, May 2025",
    note: "Funding verified. The price range is a company statement, not a published tariff.",
  },
  {
    claim: "TeraWatt secured a debt facility of up to $300 million ($150 million committed) for depots aimed mainly at autonomous-vehicle operators, plus commercial fleets.",
   
    tag: "verified",
    source: "electrive, June 2026",
  },
  {
    claim: "WattEV sells trucks, charging, maintenance and insurance as one service, and reports nearly 700,000 kWh a month at its San Bernardino depot.",
   
    tag: "estimate",
    source: "WattEV press release, October 2025",
    note: "Company figure.",
  },
  {
    claim: "PG&E's EV Fleet programme is fully subscribed and no longer accepting applications. Goal: 375+ sites and 6,500+ vehicles.",
   
    tag: "verified",
    source: "PG&E EV Fleet programme page",
    note: "Demand for utility-funded make-ready exceeded the programme.",
  },
  {
    claim: "Con Edison's make-ready programme covers up to 90% of utility-side costs, and 90% (capped at $882/kW) or 50% (capped at $490/kW) of customer-side costs, by location.",
   
    tag: "verified",
    source: "Con Edison MHD make-ready programme page",
  },
  {
    claim: "The federal commercial clean vehicle credit (45W) is not available for vehicles acquired after 30 September 2025.",
   
    tag: "verified",
    source: "IRS commercial clean vehicle credit page",
    note: "Removes part of the tax value that third-party owners could capture. The 30C charger credit also ended, for property placed in service after 30 June 2026.",
  },
];

const FAILURES: { name: string; model: string; facts: string; tag: Provenance; source: string }[] = [
  {
    name: "Proterra",
    model: "OEM with battery leases",
    facts: "Filed for Chapter 11 on 7 August 2023. Its battery business went to Volvo for $210 million before adjustment; its transit business ($3.5 million) and battery lease agreements ($6.5 million) went to Phoenix Motor in early 2024. Phoenix later sold the lease receivables to Zenobe and kept the warranty liability on the leased batteries.",
    tag: "verified",
    source: "Phoenix Motor 8-K and FY2024 10-K; Volvo Group",
  },
  {
    name: "Lion Electric",
    model: "OEM, school buses and trucks",
    facts: "Filed for CCAA creditor protection in December 2024. A Quebec investor group's purchase was approved in May 2025, after Quebec renewed its school-bus subsidy; the plants in Joliet, Illinois and Mirabel closed. In July 2025 it said it would no longer honour warranties on buses and trucks sold in the United States.",
    tag: "verified",
    source: "Electric Autonomy; BNN Bloomberg",
  },
  {
    name: "Lightning eMotors",
    model: "OEM, commercial EV conversions",
    facts: "Placed in court-ordered receivership on 15 December 2023. Substantially all assets were sold to a Gillig subsidiary for $12.6 million in February 2024; operations were not resumed and shareholders received nothing.",
    tag: "verified",
    source: "Lightning eMotors 8-K; BizWest",
  },
  {
    name: "Moxion Power",
    model: "Mobile batteries sold to rental fleets",
    facts: "Closed in July 2024 and filed for Chapter 7 in August 2024. Sunbelt Rentals was both an investor and its largest customer by far. Insiders cited scaling production before fixing technical problems and leaning on a few early customers; a planned $200 million raise fell through.",
    tag: "verified",
    source: "Latitude Media, August 2024",
  },
  {
    name: "Nuvve",
    model: "V2G aggregation",
    facts: "2025 revenue was $4.8 million, down from $5.3 million; operating loss $32.2 million. In December 2025 it expanded its focus to stationary storage and microgrids, saying V2G remains a long-term opportunity. Its top five customers made up about 40% of revenue. A March 2025 quarterly report disclosed substantial doubt about continuing as a going concern.",
    tag: "verified",
    source: "Nuvve 10-K FY2025; 8-K December 2025; 10-Q Q1 2025",
  },
  {
    name: "TeraWatt",
    model: "Depot charging-as-a-service",
    facts: "Not a failure. Its 2026 financing targets depots mainly for autonomous-vehicle operators, a shift in emphasis from the heavy-duty truck fleets it launched with.",
    tag: "estimate",
    source: "electrive, June 2026; AXIVAI reading",
  },
];

const ALTERNATIVES: { option: string; wins: string; fails: string; note: string }[] = [
  { option: "Fleet buys and owns, with grants or bonds", wins: "Cheap public capital; in-house skills", fails: "Upfront cost; the fleet holds all technical risk", note: "Third-party tax value has shrunk since 45W and 30C ended, which narrows the service providers' advantage." },
  { option: "Utility make-ready", wins: "Wherever a programme has budget and timing works", fails: "Full programmes; multi-year upgrades", note: "PG&E fully subscribed; Con Edison up to 90% utility-side." },
  { option: "Fleet-as-a-service bundle", wins: "Customers wanting one fixed fee and an uptime guarantee", fails: "Long terms; still needs grid capacity", note: "Highland, Zum. Possible partners or competitors." },
  { option: "Depot charging-as-a-service", wins: "Fleets that own vehicles but not sites", fails: "Site utilisation; grid timing", note: "First Student, TeraWatt." },
  { option: "Mobile charging per kWh", wins: "Bridging, pilots, rescue charging", fails: "Price per kWh at whole-fleet scale", note: "SparkCharge states 35–60 cents/kWh." },
  { option: "Storage rental", wins: "Short, defined bridge periods", fails: "Long or open-ended delays; pricing unknown", note: "Aggreko rents storage units; no public prices." },
  { option: "AXIVAI delivered power", wins: "Sites waiting on the utility, where none of the above can supply power in time", fails: "Sites the grid can already serve", note: "Three payment structures in section 07." },
];

const PAYMENT_OPTIONS: { name: string; structure: string; precedent: string; test: string }[] = [
  {
    name: "Power by subscription",
    structure: "A monthly fee for a reserved amount of kW and kWh at a site, for a set term.",
    precedent: "Closest to First Student's monthly charging subscription and Highland's fixed fee. Customers have accepted fixed recurring fees, but over long terms.",
    test: "Will a fleet commit to a term long enough to cover the asset, when the need is meant to be temporary?",
  },
  {
    name: "Per-kWh delivered",
    structure: "Pay only for energy delivered, metered at the charger.",
    precedent: "SparkCharge's model. Fleets accept it for bridging. The provider carries all utilisation risk.",
    test: "Does the price that covers logistics (AXIVAI's stress case is about $0.47/kWh before ownership costs) stay below the alternatives?",
  },
  {
    name: "Project bridge fee",
    structure: "A fixed fee to deploy, operate and retrieve power for a defined period, until the utility energises the site.",
    precedent: "Closest to equipment rental. No public example found of a fleet paying a fee priced against the cost of delay.",
    test: "Who pays when the utility runs late, and does the fee beat waiting plus managed charging?",
  },
];

const SOURCES: Source[] = [
  {
    title: "PG&E, Biannual Energization Report, CPUC R.24-01-018 (1 April 2026)",
    href: "https://docs.cpuc.ca.gov/PublishedDocs/Efile/G000/M604/K023/604023792.PDF",
    use: "Rule 29 EV infrastructure projects: 560 days on average from application to energization.",
  },
  {
    title: "National Infrastructure Advisory Council, Addressing the Critical Shortage of Power Transformers (June 2024)",
    href: "https://www.cisa.gov/sites/default/files/2024-09/NIAC_Addressing%20the%20Critical%20Shortage%20of%20Power%20Transformers%20to%20Ensure%20Reliability%20of%20the%20U.S.%20Grid_Report_06112024_508c_pdf_0.pdf",
    use: "Transformer orders now wait 2 to 4 years for delivery, against months in 2020.",
  },
  {
    title: "Highland Electric Fleets, Frequently Asked Questions (one-page PDF)",
    href: "https://highlandfleets.com/wp-content/One%20Pagers/Highland%20FAQs.pdf",
    use: "Contract term, what the fee covers, the uptime guarantee and how the company says it earns its return.",
    caution: "Company marketing material; undated. Bus counts are company claims.",
  },
  {
    title: "IREI, Highland Electric Fleets announces an additional $75 million preferred-equity commitment from Galvanize (June 2026)",
    href: "https://irei.com/news/highland-electric-fleets-announces-an-additional-75m-preferred-equity-commitment-from-galvanize/",
    use: "Highland's preferred-equity commitments.",
    caution: "Trade press based on a company announcement.",
  },
  {
    title: "KQED, Oakland schools ditch the diesel with new all-electric school bus fleet (June 2024)",
    href: "https://www.kqed.org/news/11988654/oakland-schools-ditch-the-diesel-with-new-all-electric-school-bus-fleet",
    use: "Zum's contract length and annual payment, as stated by the district.",
    caution: "News report; the contract text was not reviewed. Bus ownership is not stated.",
  },
  {
    title: "PG&E Currents, PG&E helps Zum deploy an all-electric school-bus fleet in Oakland",
    href: "https://www.pge.com/en/newsroom/currents/future-of-energy/articles-4040-pge-helps-zum-deploy-nations-100-electric-school-bus-fleet-oakland-new-school-year.html",
    use: "2.7 MW delivered, utility-side ownership and grant funding.",
    caution: "Utility article about its own project.",
  },
  {
    title: "PG&E, EV Fleet programme",
    href: "https://www.pge.com/en/clean-energy/electric-vehicles/ev-fleet-program.html",
    use: "Ownership split at the meter, programme goals and subscription status.",
    caution: "Goals only; no results published on the page. Earlier materials gave a higher site target.",
  },
  {
    title: "Con Edison, Medium- and Heavy-Duty EV Charging Infrastructure Program",
    href: "https://www.coned.com/en/our-energy-future/electric-vehicles/medium-heavy-duty-ev-charging-infrastructure-program",
    use: "Make-ready incentive tiers and per-kW caps.",
    caution: "Incentives depend on location and can change.",
  },
  {
    title: "First Student, First Student launches first-of-its-kind electric vehicle charging solution",
    href: "https://firststudentinc.com/resources/newsroom/first-student-launches-first-of-its-kind-electric-vehicle-charging-solution/",
    use: "Charging-as-a-service subscription and electric fleet size.",
    caution: "Company page; figures stated as of 30 June 2026; no pricing.",
  },
  {
    title: "TechCrunch, SparkCharge raises $30M to help fleets electrify without commitments (May 2025)",
    href: "https://techcrunch.com/2025/05/20/sparkcharge-raises-30m-to-help-fleets-electrify-without-commitments/",
    use: "Funding and per-kWh price range.",
    caution: "The price range is a company statement, not a tariff.",
  },
  {
    title: "electrive, Terawatt secures up to $300 million for charging depots (June 2026)",
    href: "https://electrive.com/2026/06/29/terawatt-secures-up-to-300-million-for-charging-depots",
    use: "Debt facility, ownership model and customer focus.",
    caution: "Trade press based on a company announcement.",
  },
  {
    title: "WattEV, energy consumption record at San Bernardino depot (GlobeNewswire, October 2025)",
    href: "https://rss.globenewswire.com/news-release/2025/10/07/3162687/0/en/WattEV-Sets-Energy-Consumption-Record-Triggering-Move-to-Double-Charging-Capacity-at-San-Bernardino-Depot-to-Meet-EV-Trucking-Demand-Growth.html",
    use: "Truck-as-a-service model and depot throughput.",
    caution: "Company press release; no pricing.",
  },
  {
    title: "TechCrunch, Revel unveils EV fast-charging superhub with 25 chargers in Brooklyn (June 2021)",
    href: "https://techcrunch.com/2021/06/29/revel-unveils-electric-vehicle-fast-charging-superhub-with-25-chargers-in-brooklyn",
    use: "Public per-kWh hub that also charges the operator's own fleet.",
    caution: "2021 price; likely stale. No dedicated fleet-depot offer from Revel was found.",
  },
  {
    title: "electrive, Electrify America expands charging solution business (October 2020)",
    href: "https://www.electrive.com/2020/10/28/electrify-america-to-expands-charging-solution-business",
    use: "Launch of Electrify Commercial for utilities and fleets.",
    caution: "Launch coverage; current offers and pricing unknown.",
  },
  {
    title: "Nuvve Holding Corp., Form 10-K for 2025",
    href: "https://www.sec.gov/Archives/edgar/data/1836875/000183687526000026/nvve-20251231.htm",
    use: "Revenue, operating loss, customer concentration and stationary-storage plans.",
  },
  {
    title: "Nuvve Holding Corp., press release furnished with Form 8-K (18 December 2025)",
    href: "https://www.sec.gov/Archives/edgar/data/1836875/000183687525000199/nuvveshareholderletterprfi.htm",
    use: "Expansion of focus to stationary storage and microgrids.",
  },
  {
    title: "Nuvve Holding Corp., Form 10-Q for the quarter ended 31 March 2025",
    href: "https://www.sec.gov/Archives/edgar/data/1836875/000183687525000102/nvve-20250331.htm",
    use: "Going-concern disclosure.",
    caution: "Point-in-time disclosure; recheck later filings.",
  },
  {
    title: "Phoenix Motor Inc., Form 8-K (January 2024) and Form 10-K for 2024",
    href: "https://www.sec.gov/Archives/edgar/data/1879848/000164117225013062/form10-k.htm",
    use: "Purchase of Proterra's transit business and battery leases; sale of lease receivables; retained warranty liability.",
  },
  {
    title: "Volvo Group, Volvo completes acquisition of battery business from Proterra (February 2024)",
    href: "https://www.volvogroup.com/en/news-and-media/news/2024/feb/volvo-completes-acquisition-of-battery-business-from-proterra-inc--and-proterra-operating-company.html",
    use: "Proterra battery business sale price.",
  },
  {
    title: "Electric Autonomy, Lion Electric bought by Quebec investors (May 2025)",
    href: "https://electricautonomy.ca/fleets/school-buses/2025-05-22/lion-electric-investors-quebec-school-bus/",
    use: "Sale approval, subsidy link and plant closures.",
  },
  {
    title: "BNN Bloomberg, Lion Electric will not respect warranties on school buses sold in United States (July 2025)",
    href: "https://www.bnnbloomberg.ca/business/company-news/2025/07/31/lion-electric-will-not-respect-warranties-on-school-buses-sold-in-united-states/",
    use: "US warranty decision.",
    caution: "Based on a monitor's letter; the number of US buses affected is not stated.",
  },
  {
    title: "BizWest, Lightning eMotors asset sale set to close (February 2024)",
    href: "https://bizwest.com/2024/02/16/lightning-emotors-asset-sale-set-to-close-work-to-go-on/",
    use: "Receivership and asset sale, also reported in an 8-K filing.",
  },
  {
    title: "Latitude Media, Portable battery startup Moxion is bankrupt: what happened (August 2024)",
    href: "https://www.latitudemedia.com/news/portable-battery-startup-moxion-is-bankrupt-what-happened/",
    use: "Moxion closure, customer concentration and reported causes.",
    caution: "Causes are based on insider accounts.",
  },
  {
    title: "Scale Microgrids, VTA Cerone bus yard project",
    href: "https://www.scalemicrogrids.com/projects/vta",
    use: "Battery and charger ratings for a battery-buffered bus depot.",
    caution: "Vendor page; the cost saving is a vendor projection; financing terms not stated.",
  },
  {
    title: "Aggreko, Energy storage rental",
    href: "https://www.aggreko.com/en-us/products/energy-storage",
    use: "Existence of rental storage units.",
    caution: "Vendor page; no pricing or rental terms.",
  },
  {
    title: "IRS, Commercial clean vehicle credit",
    href: "https://www.irs.gov/credits-deductions/commercial-clean-vehicle-credit",
    use: "End of the 45W credit for vehicles acquired after 30 September 2025.",
  },
];

export default function FleetBusinessModelsReport() {
  return (
    <ReportShell
      slug="fleet-business-models"
      eyebrow="Market scan"
      title="Fleet electrification business models"
      lead={
        <>
          How have fleets paid for vehicles, charging and power they don&apos;t own, who carried the asset and the risk,
          and what do the failures say about the payment structures AXIVAI might test?
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
          <Metric label="Fleet-as-a-service term" value="10–15" unit="years" status="verified" source="Highland Electric Fleets FAQ" />
          <Metric label="Oakland service contract" value="$11.2M" unit="per year" status="verified" source="KQED, district figure, 5-year term" />
          <Metric label="Mobile charging price" value="35–60" unit="¢/kWh" status="estimate" source="SparkCharge statement, TechCrunch 2025" />
          <Metric label="Nuvve revenue, 2025" value="$4.8M" status="verified" source="Nuvve 10-K FY2025" />
        </div>
        <div className="axr-sunken mt-6 axr-prose">
          <p>
            <strong>Finding.</strong> Customers have accepted paying for assets they don&apos;t own when the
            price is fixed and predictable: a long-term fee per bus, a fixed annual service contract, a monthly charging
            subscription, or utility make-ready paid through rates. Per-kWh pricing is accepted for mobile and public
            charging, at prices well above depot energy. The failures were mostly manufacturers, and their warranty
            obligations landed on whoever held the vehicles. Low utilisation, thin capital and one dominant customer
            type recur in every failure.
          </p>
          <p className="axr-small axr-muted">
            No one yet sells fleets power priced against the cost of waiting for the utility. That is the open market
            AXIVAI is built for.
          </p>
        </div>
      </section>

      {/* 01 Question */}
      <ReportSection id="question" no="01" title="The question">
        <div className="axr-prose">
          <p className="axr-lead">
            Which payment structures have fleets actually accepted for power or charging they don&apos;t own, and what
            do the failures say about asset utilisation, balance-sheet risk and reliance on one customer type?
          </p>
          <p className="axr-muted">
            This scan maps seven models tried in the United States and Canada. For each it asks who pays and how, who
            holds the asset and the risk, what traction is public, and what has failed or pivoted. AXIVAI&apos;s own
            payment structures are in section 07.
          </p>
        </div>
      </ReportSection>

      {/* 02 Models */}
      <ReportSection id="models" no="02" title="Seven models mapped">
        <div className="axr-table-wrap">
          <table className="axr-table">
            <caption>Who pays, who owns, who carries the risk. Descriptions summarise the public sources in section 08.</caption>
            <thead>
              <tr>
                <th scope="col">Model</th>
                <th scope="col">Who pays, and how</th>
                <th scope="col">Asset holder</th>
                <th scope="col">Main risks, and who holds them</th>
                <th scope="col">Examples</th>
              </tr>
            </thead>
            <tbody>
              {MODELS.map((m) => (
                <tr key={m.model}>
                  <th scope="row" style={{ textAlign: "left", minWidth: 140 }}>{m.model}</th>
                  <td style={{ minWidth: 220 }}>{m.pays}</td>
                  <td style={{ minWidth: 160 }}>{m.asset}</td>
                  <td style={{ minWidth: 220 }}>{m.risk}</td>
                  <td className="axr-muted" style={{ minWidth: 160 }}>{m.examples}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6">
          <Notice tone="assumption" title="How to read the table">
            Contract terms are rarely published. Where a company describes its own offer, the table reports that
            description; it does not confirm how individual contracts are written. Revel&apos;s hubs are public per-kWh
            charging that also serves its own fleet; no dedicated depot-as-a-service offer was found.
          </Notice>
        </div>
      </ReportSection>

      {/* 03 Traction */}
      <ReportSection id="findings" no="03" title="What has traction">
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
        <div className="mt-6">
          <Notice tone="risk" title="Traction is real but concentrated">
            The clearest cases of customers paying for assets they don&apos;t own are in school buses, backed by
            grants, tax credits and utility programmes. Several of those supports have since ended or filled up. How
            these contracts perform without them is unknown.
          </Notice>
        </div>
      </ReportSection>

      {/* 04 Failures */}
      <ReportSection id="failures" no="04" title="What failed or pivoted">
        <div className="grid gap-4 md:grid-cols-2">
          {FAILURES.map((f) => (
            <div key={f.name} className="axr-card">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div>
                  <div className="font-semibold">{f.name}</div>
                  <div className="axr-caption">{f.model}</div>
                </div>
                <DataTag status={f.tag} source={f.source} />
              </div>
              <p className="axr-small">{f.facts}</p>
              <p className="axr-caption mt-2">{f.source}</p>
            </div>
          ))}
        </div>
        <p className="axr-caption mt-4">
          Supplier statuses match the <Link href="/research/fleet-storage-landscape">storage supplier scan</Link>; the
          Nuvve facts match the <Link href="/research/white-plains-v2g">White Plains V2G case</Link>.
        </p>
      </ReportSection>

      {/* 05 Lessons */}
      <ReportSection id="lessons" no="05" title="What customers accepted, and what the failures say">
        <div className="space-y-6">
          <div>
            <h3 className="axr-h2 mb-3">Payment structures customers have accepted</h3>
            <div className="axr-table-wrap">
              <table className="axr-table">
                <caption>Each row needs at least one public example of a customer paying. Prices are rarely disclosed.</caption>
                <thead>
                  <tr>
                    <th scope="col">Structure</th>
                    <th scope="col">Example</th>
                    <th scope="col">Price disclosed?</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row" style={{ textAlign: "left" }}>Fixed fee per vehicle, 10–15 years</th>
                    <td>Highland</td>
                    <td><DataTag status="unknown" source="No public fee schedule" /></td>
                  </tr>
                  <tr>
                    <th scope="row" style={{ textAlign: "left" }}>Fixed annual service contract, 5 years</th>
                    <td>Zum, Oakland</td>
                    <td><DataTag status="verified" source="KQED" /> $11.2M a year</td>
                  </tr>
                  <tr>
                    <th scope="row" style={{ textAlign: "left" }}>Monthly charging subscription</th>
                    <td>First Student</td>
                    <td><DataTag status="unknown" source="No public pricing" /></td>
                  </tr>
                  <tr>
                    <th scope="row" style={{ textAlign: "left" }}>Per kWh, mobile</th>
                    <td>SparkCharge</td>
                    <td><DataTag status="estimate" source="Company statement" /> 35–60 ¢/kWh</td>
                  </tr>
                  <tr>
                    <th scope="row" style={{ textAlign: "left" }}>Per kWh, public hub</th>
                    <td>Revel, Brooklyn</td>
                    <td><DataTag status="risk" source="TechCrunch 2021; likely stale" /> 39 ¢/kWh in 2021</td>
                  </tr>
                  <tr>
                    <th scope="row" style={{ textAlign: "left" }}>Utility-side work paid through rates</th>
                    <td>PG&amp;E, Con Edison</td>
                    <td><DataTag status="verified" source="Utility programme pages" /> Up to 90% utility-side</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="axr-card">
              <div className="axr-metric-label">Asset utilisation</div>
              <p className="mt-2 axr-small">
                Bundles that win long contracts keep assets busy every school day. Mobile and rental models live or die
                by how often an asset is working. Moxion&apos;s units were sold into rental fleets; the scan found no
                public utilisation figures for any mobile or rental provider.
              </p>
              <div className="mt-3"><DataTag status="unknown" source="No public utilisation data" /></div>
            </div>
            <div className="axr-card">
              <div className="axr-metric-label">Balance-sheet risk</div>
              <p className="mt-2 axr-small">
                Whoever owns the asset needs patient capital: preferred equity for Highland, a bank facility for
                TeraWatt, federal grants for Zum. Manufacturers with thin capital failed, and their warranties moved to
                buyers or lapsed, leaving asset holders exposed. Proterra&apos;s battery leases still found a buyer.
              </p>
              <div className="mt-3"><DataTag status="verified" source="IREI; electrive; Phoenix 10-K; BNN Bloomberg" /></div>
            </div>
            <div className="axr-card">
              <div className="axr-metric-label">One customer type</div>
              <p className="mt-2 axr-small">
                Moxion leaned on one large rental customer. Nuvve&apos;s top five customers were about 40% of revenue.
                Lion&apos;s revival depended on one province&apos;s subsidy. TeraWatt has widened its target customers.
                School buses dominate the public record, and that market runs on public funding cycles.
              </p>
              <div className="mt-3"><DataTag status="verified" source="Latitude Media; Nuvve 10-K; Electric Autonomy; electrive" /></div>
            </div>
          </div>

          <Notice tone="info" title="What customers buy">
            The common thread is that customers bought certainty: a known monthly cost, a guaranteed bus. AXIVAI sells
            the same thing: a fleet that charges on a known date, at a known price, whatever the utility&apos;s
            schedule.
          </Notice>
        </div>
      </ReportSection>

      {/* 06 Alternatives */}
      <ReportSection id="alternatives" no="06" title="The alternatives test">
        <div className="axr-table-wrap">
          <table className="axr-table">
            <caption>For a fleet that needs power or charging it doesn&apos;t yet have: the ways it can pay for it today.</caption>
            <thead>
              <tr>
                <th scope="col">Option</th>
                <th scope="col">Wins when</th>
                <th scope="col">Fails when</th>
                <th scope="col">Note</th>
              </tr>
            </thead>
            <tbody>
              {ALTERNATIVES.map((a) => (
                <tr key={a.option}>
                  <th scope="row" style={{ textAlign: "left", minWidth: 160 }}>{a.option}</th>
                  <td>{a.wins}</td>
                  <td>{a.fails}</td>
                  <td className="axr-muted" style={{ minWidth: 200 }}>{a.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6">
          <Notice tone="info" title="Where AXIVAI fits">
            Where a utility programme, a bundled service or plain ownership gets a fleet charging on time, that is the
            right answer. AXIVAI serves the sites they can&apos;t reach in time: the{" "}
            <Link href="/research/school-bus-depots">school-bus depot case</Link> sets out which sites those are.
          </Notice>
        </div>
      </ReportSection>

      {/* 07 AXIVAI */}
      <ReportSection id="axivai" no="07" title="What it means for AXIVAI">
        <div className="axr-prose space-y-4 mb-6">
          <p className="axr-lead">Power on wheels, sold the way fleets already like to buy: as certainty.</p>
          <p>
            The utility wait is long and documented. PG&amp;E&apos;s EV infrastructure projects averaged 560 days from
            application to power in its April 2026 filing, and large transformers take two to four years to arrive.
            AXIVAI trucks deliver energy into storage on the depot, so the buses run in the meantime. Three ways to pay
            for it, each built on a structure fleets have already accepted:
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {PAYMENT_OPTIONS.map((h) => (
            <div key={h.name} className="axr-card">
              <div className="axr-h2">{h.name}</div>
              <p className="axr-small mt-2">{h.structure}</p>
              <p className="axr-small axr-muted mt-2"><strong>Precedent.</strong> {h.precedent}</p>
              <p className="axr-small mt-2"><strong>Test.</strong> {h.test}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 space-y-4">
          <Notice tone="risk" title="What the failures teach">
            Don&apos;t hold assets for a single customer type, fund them with short-term money, or rely on utilisation
            that hasn&apos;t been measured. AXIVAI builds against all three: storage moves on to the next site when the
            grid arrives, and it serves fleets beyond school buses.
          </Notice>
        </div>
      </ReportSection>

      {/* 08 Sources */}
      <ReportSection id="sources" no="08" title="Sources">
        <SourceList sources={SOURCES} />
        <div className="mt-6">
          <p className="axr-caption mb-4">
            This scan also draws on earlier internal research, re-checked against the public sources above. Figures
            that could not be confirmed publicly, including an earlier cost comparison of service contracts against
            bond financing, are not used. Related: <Link href="/research/fleet-charging-hubs">fleet charging hubs</Link>{" "}
            and <Link href="/research/ny-implementation-gap">the New York implementation gap</Link>.
          </p>
          <p className="axr-caption">Company statuses were checked in October 2026.</p>
        </div>
      </ReportSection>

      {/* 09 Open questions */}
      <ReportSection id="open-questions" no="09" title="What we're investigating next">
        <div className="grid gap-4 md:grid-cols-2">
          {[
            ["Actual fee levels", "What service-contract fees are per bus, per kWh or per kW reserved."],
            ["Utilisation of mobile and rental assets", "Hours working versus idle, for any provider."],
            ["Who paid for warranty gaps", "How fleets with Lion or Proterra assets covered repairs."],
            ["Willingness to pay for delay", "Whether any fleet has paid a premium to avoid waiting for the utility."],
            ["Contract performance without credits", "How bundles reprice after 45W and 30C ended."],
            ["Demand outside school buses", "Trucks, transit, municipal fleets: who would sign, and for how long."],
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
          title="Paying for power or charging you don't own?"
          body="Tell us what you pay and how. AXIVAI is preparing its first pilot sites."
        />
      </ReportSection>

      {/* 10 Next steps */}
      <ReportSection id="next-steps" no="10" title="Proposed next steps">
        <ol className="axr-steps axr-steps-4">
          {[
            ["Collect", "Gather public procurement documents for 3–5 service contracts to get real fee levels."],
            ["Interview", "Ask fleets that use mobile charging what they pay and why."],
            ["Model", "Rerun AXIVAI's stress case under each payment structure."],
            ["Pitch", "Take the three payment structures to fleet buyers and pilot sites."],
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
