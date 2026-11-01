import type { Metadata } from "next";
import Link from "next/link";
import { GapCta, ReportSection, ReportShell, SourceList, type Source } from "@/components/report/layout";
import { DataTag, Metric, Notice, type Provenance } from "@/components/report/primitives";
import "../report.css";

// Content source: industry review (31 October 2026), re-checked against public sources.

export const metadata: Metadata = {
  alternates: { canonical: "/research/battery-second-life" },
  title: "Battery second life and residual value | AXIVAI",
  description:
    "An industry review: could retired bus and EV batteries supply cheap, bankable deployable storage, or do new LFP packs now win? And what do degradation and residual value mean for whoever owns the battery?",
};

const TOC = [
  ["question", "The question"],
  ["findings", "What we found"],
  ["degradation", "How batteries age"],
  ["prices", "New battery prices"],
  ["market", "Second life in practice"],
  ["economics", "Does second life still win?"],
  ["safety", "Safety and standards"],
  ["warranty", "When the OEM fails"],
  ["alternatives", "The alternatives test"],
  ["axivai", "What it means for AXIVAI"],
  ["sources", "Sources"],
  ["open-questions", "What we're investigating next"],
  ["next-steps", "Next steps"],
] as const;

const EVIDENCE_ROWS: { claim: string; tag: Provenance; source: string; note?: string }[] = [
  {
    claim: "Lithium-ion pack prices averaged $108/kWh in 2025; stationary-storage packs fell 45% to $70/kWh, the cheapest segment for the first time. LFP packs averaged $81/kWh across segments.",
   
    tag: "verified",
    source: "BloombergNEF battery price survey, December 2025",
    note: "Global averages. BNEF expects a further fall in 2026; its next survey is due around December 2026.",
  },
  {
    claim: "Turnkey battery storage systems averaged about $117/kWh globally in 2025 and about $219/kWh in the US.",
   
    tag: "verified",
    source: "Texas Tribune, citing BloombergNEF (February 2026)",
    note: "As reported; the BNEF system survey itself is subscriber-only.",
  },
  {
    claim: "Retired EV batteries typically keep about 70–80% of their original capacity.",
   
    tag: "verified",
    source: "World Resources Institute (June 2026)",
  },
  {
    claim: "Across 22,700+ light-duty EVs, battery capacity fell 2.3% a year on average; heavy DC fast charging raised it to up to 3.0%, against about 1.5% for mainly AC charging.",
   
    tag: "verified",
    source: "Geotab press release (January 2026)",
    note: "Cars and vans, not buses. No equivalent public dataset for buses was found.",
  },
  {
    claim: "Federal guidance says electric school-bus batteries are warrantied for 8+ years, are expected to last the life of the bus, and that second-life use is preferred to recycling at end of life.",
   
    tag: "verified",
    source: "EPA Clean School Bus / Joint Office battery webinar (July 2024)",
  },
  {
    claim: "Used LFP packs leaving EVs keep a fair market value above 40% of a new battery's; for nickel-cobalt packs, repurposing is only marginally justified in the US.",
   
    tag: "estimate",
    source: "Stanford GSB working paper 4203 (August 2024)",
    note: "A modelled valuation, not observed transaction prices.",
  },
  {
    claim: "B2U says it builds second-life systems for “well under $200/kWh” and that finished projects cost 30–40% less than new lithium-ion facilities.",
   
    tag: "estimate",
    source: "Texas Tribune (February 2026); Canary Media (July 2025)",
    note: "Company claims, not independently verified.",
  },
  {
    claim: "Repurposed batteries for storage must still be certified to UL 1973, and the whole system to UL 9540, even when the repurposer is certified to UL 1974.",
   
    tag: "verified",
    source: "UL Solutions (October 2022)",
  },
  {
    claim: "Lion Electric's warranties on buses sold outside Quebec were declared “null and void” after its 2025 restructuring.",
   
    tag: "verified",
    source: "Electrek (July and November 2025)",
  },
];

type PriceRow = { label: string; sub: string; value: number; kind: "pack" | "system"; source: string };

// $/kWh. Pack = cells plus pack hardware; system = turnkey installed storage equipment.
const PRICES: PriceRow[] = [
  { label: "Stationary pack", sub: "global avg, 2025", value: 70, kind: "pack", source: "BloombergNEF" },
  { label: "LFP pack", sub: "all segments, 2025", value: 81, kind: "pack", source: "BloombergNEF" },
  { label: "EV pack", sub: "global avg, 2025", value: 99, kind: "pack", source: "BloombergNEF" },
  { label: "All packs", sub: "global avg, 2025", value: 108, kind: "pack", source: "BloombergNEF" },
  { label: "Turnkey system", sub: "global avg, 2025", value: 117, kind: "system", source: "BNEF via Texas Tribune" },
  { label: "Turnkey system", sub: "US avg, 2025", value: 219, kind: "system", source: "BNEF via Texas Tribune" },
];

const PRICE_MAX = 250;

const PLAYERS: { name: string; what: string; status: string; tag: Provenance; source: string }[] = [
  {
    name: "B2U Storage Solutions (US)",
    what: "Grid-connected storage from used EV packs in California and Texas; first Texas site 24 MWh, about 500 batteries. Multi-year supply agreement with Waymo announced June 2026.",
    status: "Operating. Manages more than 3,000 batteries; says its oldest systems have run about five years with few replacements.",
    tag: "verified",
    source: "Texas Tribune; Electrive",
  },
  {
    name: "Connected Energy (UK)",
    what: "E-STOR and M-STOR systems from second-life EV batteries. Letter of intent with Volvo Energy (September 2023) to build storage from Volvo bus, truck and machine batteries.",
    status: "Operating; news in January and May 2026. Whether the Volvo product launched as planned in 2025 is not confirmed.",
    tag: "verified",
    source: "Company site; Electrek",
  },
  {
    name: "Moment Energy (Canada)",
    what: "Luna commercial and industrial system built from repurposed EV batteries.",
    status: "Operating. Luna verified to UL 1973, UL 9540 and UL 9540A (October 2025), described as a first for repurposed batteries.",
    tag: "verified",
    source: "pv magazine USA; company site",
  },
  {
    name: "Smartville (US)",
    what: "Containerised systems and a 500 kWh trailer unit from repurposed EV packs; 2023 DOE awards.",
    status: "Operating, by its own account: 1.98 MWh across seven sites.",
    tag: "estimate",
    source: "Company site (self-reported)",
  },
  {
    name: "RePurpose Energy (US)",
    what: "Second-life systems up to 1.2 MWh per container; lists a 360 kW / 1 MWh system at Nissan North America's Tennessee headquarters, operating since 2024.",
    status: "Operating, by its own account; equity crowdfunding offer in March 2026. Says UL listing was still in progress.",
    tag: "estimate",
    source: "Company site (self-reported)",
  },
  {
    name: "Zenobē (UK)",
    what: "Owns bus batteries through fleet finance, then reuses them: 20 ex-bus batteries of about 150 kWh each repurposed for construction-site power.",
    status: "Operating; reports 50 second-life units in service (2024).",
    tag: "verified",
    source: "ESS News (June 2024)",
  },
  {
    name: "Nissan / 4R Energy (Japan)",
    what: "Nissan–Sumitomo joint venture reusing Leaf batteries.",
    status: "First organisation certified to UL 1974, August 2019. Current volumes not checked.",
    tag: "verified",
    source: "UL press release",
  },
  {
    name: "BMW Leipzig battery farm (Germany)",
    what: "Storage for up to 700 used i3 packs, about 500 at commissioning, for on-site wind and grid balancing.",
    status: "Commissioned October 2017. Current status unknown.",
    tag: "risk",
    source: "CleanTechnica (2017)",
  },
  {
    name: "Renault Advanced Battery Storage (France, Germany)",
    what: "Announced stationary storage programme using Renault EV batteries.",
    status: "Build-out not confirmed from public sources. Earlier capacity targets not used here.",
    tag: "unknown",
    source: "Announcement-era coverage only",
  },
];

const ALTERNATIVES: { option: string; wins: string; fails: string; note: string }[] = [
  { option: "New LFP storage, bought", wins: "Most cases in 2026: lowest price per kWh, full warranty, uniform cells, simple permitting", fails: "Owner carries degradation and residual-value risk", note: "Stationary LFP packs averaged $70/kWh in 2025 (global)." },
  { option: "New LFP storage, rented", wins: "Short or uncertain needs; residual risk stays with the lessor", fails: "Long use, where rental fees pass the purchase price", note: "Aggreko and others rent units; rates not public. See the storage suppliers report." },
  { option: "Second-life system from a specialist", wins: "Low-cycle stationary uses; buyers who value reuse; where US new-system prices stay high", fails: "Shorter remaining life; mixed packs; thinner warranties; supply is illiquid", note: "B2U, Moment, Connected Energy and others operate. Cost advantage is company-claimed." },
  { option: "Fleet-owned bus packs reused on site", wins: "Fleets that already own retired packs and their data", fails: "Packs arrive years after the need; OEM may be gone", note: "Zenobē reuses bus packs it owns. Federal guidance favours second life." },
  { option: "Recycle instead of reuse", wins: "Nickel-cobalt packs with high material value", fails: "Leaves usable capacity unused", note: "Modelled: recycling often beats reuse for NCX packs." },
  { option: "AXIVAI with new LFP modules", wins: "Truck-delivered power and on-site storage for sites waiting on the grid", fails: "Owner bears residual-value risk; heavy cycling shortens life", note: "AXIVAI's base case." },
  { option: "AXIVAI with second-life modules", wins: "Stationed, low-cycle backup roles, if packs are near-free and well documented", fails: "Transport, vibration, mixed packs and certification for mobile use", note: "Weaker than new LFP today." },
];

const SOURCES: Source[] = [
  {
    title: "BloombergNEF, Lithium-ion battery pack prices fall to $108 per kilowatt-hour (December 2025)",
    href: "https://about.bnef.com/insights/clean-transport/lithium-ion-battery-pack-prices-fall-to-108-per-kilowatt-hour-despite-rising-metal-prices-bloombergnef/",
    use: "Average, stationary, LFP, NMC and EV pack prices for 2025, and the 2026 outlook.",
    caution: "Global averages; US prices are higher. Published December 2025, so it counts as Risk until the 2026 survey appears.",
  },
  {
    title: "Texas Tribune, Texas is using old EV batteries to store power for the grid (February 2026)",
    href: "https://www.texastribune.org/2026/02/24/texas-power-grid-auto-batteries-storage/",
    use: "B2U's Texas site, battery counts and cost claim; BNEF turnkey system prices.",
    caution: "Cost and lifetime figures are company statements. BNEF system prices are as reported, not read from the survey.",
  },
  {
    title: "Canary Media, A pioneering second-life battery startup begins major Texas expansion (July 2025)",
    href: "https://www.canarymedia.com/articles/energy-storage/b2u-used-grid-batteries-texas-expansion",
    use: "B2U's claimed cost advantage over new projects and its project pipeline.",
    caution: "Company claims; reported pipeline, not confirmed completions.",
  },
  {
    title: "U.S. DOE Vehicle Technologies Office, Fact of the Week #1354 (August 2024)",
    href: "https://www.energy.gov/cmei/vehicles/articles/fotw-1354-august-5-2024-electric-vehicle-battery-pack-costs-light-duty",
    use: "DOE's modelled light-duty pack cost: $139/kWh in 2023, per usable kWh at scale.",
    caution: "A model estimate for cars, two years old; not a heavy-duty or stationary price.",
  },
  {
    title: "World Resources Institute, Second-life EV batteries and clean energy access (June 2026)",
    href: "https://www.wri.org/insights/second-life-ev-batteries-clean-energy-access",
    use: "Typical capacity at retirement and the main cost drivers of second life.",
    caution: "Advocacy research organisation; gives no second-life $/kWh figure.",
  },
  {
    title: "Geotab, EV battery health and fast-charging study (January 2026)",
    href: "https://www.geotab.com/uk/press-release/ev-battery-health-degradation-fast-charging-study/",
    use: "Average annual capacity loss across 22,700+ vehicles and the effect of fast charging.",
    caution: "Light-duty telematics, published by a fleet-data company; buses not included.",
  },
  {
    title: "EPA Clean School Bus Program with the Joint Office, Battery overview, end-of-life options and warranties (July 2024)",
    href: "https://www.epa.gov/system/files/documents/2024-08/csb-battery-overview-webinar-2024-07-31.pdf",
    use: "Federal guidance on degradation drivers, warranties, useful life and second life.",
    caution: "Webinar slides; qualitative, with no degradation rates.",
  },
  {
    title: "U.S. DOE Alternative Fuels Data Center, Electric School Bus Planning Guide",
    href: "https://afdc.energy.gov/guides/electric-school-bus",
    use: "Battery warranties now reaching up to 10 years; end-of-life planning.",
  },
  {
    title: "Thomas Built Buses, Saf-T-Liner C2 Jouley specification sheet (via California HVIP, July 2023)",
    href: "https://californiahvip.org/wp-content/uploads/2023/07/Jouley-Spec-Sheet2_New-230713.pdf",
    use: "Example bus battery warranty: 8 years / 175,000 miles / 200,000 kWh throughput per pack; extended to 12 years.",
    caution: "Vendor spec sheet from 2023; current terms may differ.",
  },
  {
    title: "Stanford GSB, Fair market valuation of electric vehicle batteries in second-life applications (Working Paper 4203, August 2024)",
    href: "https://www.gsb.stanford.edu/faculty-research/working-papers/fair-market-valuation-electric-vehicle-batteries-second-life",
    use: "Modelled residual value of used LFP and nickel-cobalt packs, US versus China.",
    caution: "Working paper; modelled, not observed market prices; pre-dates the 2025 price fall.",
  },
  {
    title: "CALSTART, Battery-electric truck component residual values (September 2024)",
    href: "https://calstart.org/bet-component-residual-values/",
    use: "Modelled component residual value of a battery-electric truck at year 5.",
    caution: "Modelled for trucks, not buses or stationary storage.",
  },
  {
    title: "UL Solutions, UL certification helps promote repurposing of EV batteries (October 2022)",
    href: "https://ul.com/news/ul-certification-helps-promote-repurposing-electric-vehicle-ev-batteries",
    use: "What UL 1974 covers and the UL 1973 / UL 9540 requirements for repurposed storage.",
    caution: "Certifier's own explainer.",
  },
  {
    title: "UL Solutions, UL issues world's first certification for repurposed EV batteries to 4R Energy (August 2019)",
    href: "https://www.ul.com/news/ul-issues-worlds-first-certification-repurposed-ev-batteries-4r-energy",
    use: "First UL 1974 certification.",
  },
  {
    title: "UL Solutions, Understanding UL 9540A and NFPA 855",
    href: "https://www.ul.com/thecodeauthority/knowledge/understanding-UL-9540A-NFPA-855",
    use: "Roles of UL 9540, UL 9540A (6th edition effective 1 January 2027) and NFPA 855 (2026 edition).",
    caution: "Certifier's commentary; check the adopted code edition locally.",
  },
  {
    title: "pv magazine USA, Moment Energy's repurposed EV batteries win first-ever UL safety approval for second-life storage (October 2025)",
    href: "https://pv-magazine-usa.com/2025/10/20/moment-energys-repurposed-ev-batteries-win-first-ever-ul-safety-approval-for-second-life-storage/",
    use: "UL 1973, 9540 and 9540A verification of a repurposed-battery product.",
    caution: "Trade press based on a company announcement.",
  },
  {
    title: "Electrive, B2U repurposes used Waymo batteries (June 2026)",
    href: "https://www.electrive.com/2026/06/05/b2u-repurposes-used-waymo-batteries-for-second-life-energy-storage-systems/",
    use: "B2U–Waymo supply agreement.",
    caution: "Trade press; no volumes or prices.",
  },
  {
    title: "Electrek, Volvo will turn used EV batteries into new battery storage (September 2023)",
    href: "https://electrek.co/2023/09/12/volvo-used-ev-batteries-new-energy-storage/",
    use: "Volvo Energy and Connected Energy letter of intent covering bus and truck batteries.",
    caution: "A letter of intent; later outcome not confirmed.",
  },
  {
    title: "Connected Energy, company website",
    href: "https://www.connected-energy.co.uk/",
    use: "Products and dated 2026 news, for operating status.",
    caution: "Company site; no deployment totals.",
  },
  {
    title: "Smartville, company website",
    href: "https://smartvilleenergy.com/",
    use: "Self-reported operating capacity and sites.",
    caution: "Self-reported; no independent confirmation found.",
  },
  {
    title: "RePurpose Energy, company website",
    href: "https://www.repurpose.energy/",
    use: "Self-reported deployments, products and 2026 news.",
    caution: "Self-reported; parts of the site appear dated.",
  },
  {
    title: "Moment Energy, company website",
    href: "https://www.momentenergy.com/",
    use: "Product and certification claims.",
    caution: "Company site.",
  },
  {
    title: "ESS News, Zenobē to power UK construction sites with old bus batteries (June 2024)",
    href: "https://www.ess-news.com/2024/06/06/zenobe-to-power-uk-construction-sites-with-old-bus-batteries/",
    use: "Reuse of ex-bus batteries; unit size and count.",
    caution: "Trade press; second-life unit count is company-reported.",
  },
  {
    title: "CleanTechnica, BMW Group officially commissions battery storage farm Leipzig (October 2017)",
    href: "https://www.cleantechnica.com/2017/10/30/bmw-group-officially-commissions-battery-storage-farm-leipzig/",
    use: "Scale of an early OEM second-life project.",
    caution: "Nine years old; current status not confirmed.",
  },
  {
    title: "Electrek, Lion Electric school bus warranties voided, leaving districts stuck (2025)",
    href: "https://electrek.co/2025/07/26/lion-electric-schools-bus-warranties-voided-leaving-districts-stuck/",
    use: "Loss of US warranty cover after Lion's restructuring.",
    caution: "News report; quotes a restructuring letter rather than publishing it.",
  },
  {
    title: "Phoenix Motor Inc., Form 10-K for fiscal 2024 (SEC)",
    href: "https://www.sec.gov/Archives/edgar/data/1879848/000164117225013062/form10-k.htm",
    use: "Assumed Proterra transit obligations; retained warranty liability on leased batteries; going-concern doubt.",
    caution: "Fiscal 2024 filing; later filings not reviewed.",
  },
];

function PriceChart() {
  const pct = (v: number) => `${(v / PRICE_MAX) * 100}%`;
  const ticks = [0, 50, 100, 150, 200, 250];
  return (
    <figure className="axr-chart axr-card" aria-labelledby="price-chart-title">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div id="price-chart-title" className="axr-h2">
            What new lithium-ion storage cost in 2025
          </div>
          <p className="axr-caption mt-1">US dollars per kWh. A second-life battery has to beat these numbers, not 2020&apos;s.</p>
        </div>
        <div className="axr-legend" aria-hidden="true">
          <span className="axr-legend-item">
            <span className="axr-swatch" style={{ background: "var(--accent-ink)" }} />
            Battery pack only
          </span>
          <span className="axr-legend-item">
            <span className="axr-swatch" style={{ background: "var(--gold)" }} />
            Turnkey storage system
          </span>
        </div>
      </div>

      <div className="axr-chart-rows">
        {PRICES.map((p) => (
          <div key={`${p.label}-${p.sub}`} className="axr-chart-row">
            <div className="axr-chart-label">
              {p.label}
              <span>{p.sub}</span>
            </div>
            <div className="axr-plot">
              <div className="axr-bar-track">
                <div
                  className="axr-bar"
                  style={{ width: pct(p.value), background: p.kind === "pack" ? "var(--accent-ink)" : "var(--gold)" }}
                  role="img"
                  aria-label={`${p.label}, ${p.sub}: $${p.value} per kWh (${p.kind === "pack" ? "pack only" : "turnkey system"}). Source: ${p.source}.`}
                >
                  <span className="axr-bar-value" aria-hidden="true">${p.value}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="axr-axis" aria-hidden="true">
        <div />
        <div className="axr-axis-ticks">
          {ticks.map((t) => (
            <span key={t} style={{ left: pct(t) }}>
              ${t}
            </span>
          ))}
        </div>
      </div>
      <figcaption className="axr-caption mt-6">
        BloombergNEF 2025 surveys; system prices as reported by the Texas Tribune. Global averages unless marked US.
        See the table below.
      </figcaption>
    </figure>
  );
}

export default function BatterySecondLifeReport() {
  return (
    <ReportShell
      slug="battery-second-life"
      eyebrow="Industry review"
      title="Battery second life and residual value"
      lead={
        <>
          Could retired bus and EV batteries supply cheap, bankable deployable storage, or are new LFP packs now so
          cheap that second life loses? And what does battery ageing mean for whoever owns the asset?
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
          <Metric label="New stationary pack, 2025" value="$70" unit="/kWh" status="verified" source="BloombergNEF, global average" />
          <Metric label="Turnkey storage system, US, 2025" value="$219" unit="/kWh" status="verified" source="BNEF via Texas Tribune" />
          <Metric label="Capacity left at EV retirement" value="70–80" unit="%" status="verified" source="World Resources Institute" />
          <Metric label="Average capacity loss, light-duty EVs" value="2.3" unit="% a year" status="verified" source="Geotab, 22,700+ vehicles" />
        </div>
        <div className="axr-sunken mt-6 axr-prose">
          <p>
            <strong>Finding.</strong> Second-life storage works and is in commercial operation, but its main
            argument, a lower price, has largely gone. New stationary LFP packs fell 45% in 2025 to about $70/kWh, and
            the pack is only part of what a storage system costs. A used pack has fewer years left, comes in mixed
            designs and carries a thinner warranty. New LFP is AXIVAI&apos;s choice for its modular storage. Second life may still fit low-cycle, stationed roles where packs come almost free and
            with good data.
          </p>
          <p className="axr-small axr-muted">
            Whoever owns the battery carries the larger risk: ageing, residual value and, as Lion Electric and
            Proterra show, the chance that the manufacturer behind the warranty fails.
          </p>
        </div>
      </section>

      <ReportSection id="question" no="01" title="The question">
        <div className="axr-prose">
          <p className="axr-lead">
            Can second-life bus or EV batteries make deployable storage cheaper and more bankable than new packs, and
            how should an owner treat degradation and residual-value risk?
          </p>
          <p className="axr-muted">
            AXIVAI picks whichever battery gives the lowest cost per year of service, whether that means buying new
            LFP, renting, or reusing packs.
          </p>
        </div>
      </ReportSection>

      <ReportSection id="findings" no="02" title="What we found">
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
          <Notice tone="risk" title="The biggest gap">
            No public source gives measured degradation for school or transit buses, or prices for used bus packs.
          </Notice>
        </div>
      </ReportSection>

      <ReportSection id="degradation" no="03" title="How vehicle batteries age">
        <div className="axr-prose space-y-4">
          <p>
            All lithium-ion batteries lose capacity with time and use. Federal guidance for school-bus fleets names
            fast charging, running to full or empty, and hot or cold weather as the main drivers, and advises keeping
            charge between 20% and 80%. It says bus batteries are warrantied for 8 or more years and are expected to
            last the life of the bus.
          </p>
          <p>
            The largest public dataset is for cars and vans. Geotab&apos;s January 2026 study of more than 22,700
            vehicles found an average loss of 2.3% a year, rising to as much as 3.0% for vehicles that rely on DC
            charging above 100 kW and falling to about 1.5% for mainly AC charging. We found no comparable public
            dataset for buses.
          </p>
          <p>
            Vehicle batteries are usually retired with about 70–80% of their capacity left. That is too little for a
            route but can still serve stationary storage, where cycles are gentler and weight matters less.
          </p>
        </div>
        <div className="axr-table-wrap mt-6">
          <table className="axr-table">
            <caption>What a bus battery warranty looks like: one published example.</caption>
            <thead>
              <tr>
                <th scope="col">Item</th>
                <th scope="col">Term</th>
                <th scope="col">Figure</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Battery capacity (Thomas Built Jouley, 2023)</th>
                <td>8 years / 175,000 miles / 200,000 kWh throughput per pack; extended cover up to 12 years</td>
                <td><DataTag status="verified" source="Jouley specification sheet via California HVIP" /></td>
              </tr>
              <tr>
                <th scope="row">Typical high-voltage battery warranty</th>
                <td>Up to 10 years, with extended options</td>
                <td><DataTag status="verified" source="DOE AFDC Electric School Bus Planning Guide" /></td>
              </tr>
              <tr>
                <th scope="row">Capacity floor that triggers a claim</th>
                <td>Varies by manufacturer and is often not published</td>
                <td><DataTag status="unknown" /></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-6">
          <Notice tone="risk" title="Warranties cap throughput as well as years">
            The Jouley capacity warranty is limited by 200,000 kWh of discharge per pack as well as by years and miles. A battery used
            for both driving and grid or depot services reaches that cap sooner. The same logic applies to any
            deployable battery that cycles every day.
          </Notice>
        </div>
      </ReportSection>

      <ReportSection id="prices" no="04" title="New battery prices moved the goalposts">
        <div className="space-y-6">
          <PriceChart />
          <div className="axr-table-wrap">
            <table className="axr-table">
              <caption>Table view of the chart.</caption>
              <thead>
                <tr>
                  <th scope="col">Item</th>
                  <th scope="col">Scope</th>
                  <th scope="col" className="axr-num">$/kWh</th>
                  <th scope="col">Source</th>
                </tr>
              </thead>
              <tbody>
                {PRICES.map((p) => (
                  <tr key={`t-${p.label}-${p.sub}`}>
                    <th scope="row">{p.label}</th>
                    <td>{p.sub}{p.kind === "system" ? ", turnkey system" : ", pack only"}</td>
                    <td className="axr-num">{p.value}</td>
                    <td className="axr-muted">{p.source} <DataTag status="verified" source={p.source} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="axr-prose space-y-4">
            <p>
              BloombergNEF puts the 2025 global average pack price at $108/kWh, down 8%. Stationary-storage packs fell
              45% to $70/kWh, which BNEF attributes to Chinese overcapacity in storage cells. DOE&apos;s own model put a
              light-duty pack at $139/kWh in 2023 <DataTag status="verified" source="DOE VTO Fact of the Week #1354" />.
              BNEF expects prices to fall again in 2026; at the time of writing its next survey has not appeared.
            </p>
            <p>
              The pack is not the system. Turnkey storage averaged about $117/kWh globally but about $219/kWh in the
              US, where tariffs and installation costs add more. Inverters, enclosures, controls, fire protection,
              permits and connection make up the rest, and a second-life system still needs all of them.
            </p>
          </div>
        </div>
      </ReportSection>

      <ReportSection id="market" no="05" title="Second-life storage in practice">
        <p className="axr-prose axr-muted mb-6">
          Second-life storage is a working industry. Status checked against public sources in October 2026;
          self-reported figures are tagged Estimate.
        </p>
        <div className="axr-table-wrap">
          <table className="axr-table">
            <thead>
              <tr>
                <th scope="col">Company or project</th>
                <th scope="col">What it does</th>
                <th scope="col">Status</th>
                <th scope="col">Figure</th>
              </tr>
            </thead>
            <tbody>
              {PLAYERS.map((p) => (
                <tr key={p.name}>
                  <th scope="row" style={{ minWidth: 160 }}>{p.name}</th>
                  <td style={{ minWidth: 220 }}>{p.what}</td>
                  <td style={{ minWidth: 200 }}>{p.status}</td>
                  <td><DataTag status={p.tag} source={p.source} /><div className="axr-caption mt-1">{p.source}</div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="grid gap-4 md:grid-cols-2 mt-6">
          <div className="axr-card">
            <div className="axr-metric-label">Lab and academic studies</div>
            <p className="mt-2 axr-small">
              NREL ran a second-use analysis and demonstration with BMW and UC San Diego (final report, 2018); we could
              not retrieve it in this pass, so no figures from it are used. A 2024 Stanford working paper models used
              LFP packs as worth more than 40% of a new battery and finds nickel-cobalt packs often better recycled.
              We found no recent ANL or LBNL second-life economics study.
            </p>
          </div>
          <div className="axr-card">
            <div className="axr-metric-label">Bus batteries specifically</div>
            <p className="mt-2 axr-small">
              Zenobē reuses ex-bus batteries it owns through fleet finance, and Volvo Energy signed a letter of
              intent with Connected Energy to reuse bus and truck batteries. Ownership of the battery, and its data,
              is what makes these work.
            </p>
          </div>
        </div>
      </ReportSection>

      <ReportSection id="economics" no="06" title="Does second life still win on cost?">
        <div className="space-y-6">
          <Notice tone="assumption" title="Assumptions">
            US turnkey system at $219/kWh (BNEF, as reported). Pack share taken as the $70/kWh global stationary pack
            price; the US share is probably higher. A second-life pack at half the price of a new one, in line with
            B2U&apos;s description of used hardware costing about half of a new enclosure. A new LFP system lasting 15
            years and a second-life system 10, an assumption, not a measured figure. No financing, degradation in
            service or extra testing costs included.
          </Notice>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="axr-card">
              <h3 className="axr-h2 mb-2">Saving at purchase</h3>
              <div className="axr-metric-value">$35<span className="axr-metric-unit">/kWh, about 16%</span></div>
              <p className="axr-small axr-muted mt-2">Half of a $70 pack, against a $219 system. The other costs do not shrink.</p>
              <div className="mt-3"><DataTag status="estimate" source="Derived from BNEF figures and stated assumptions" /></div>
            </div>
            <div className="axr-card">
              <h3 className="axr-h2 mb-2">New LFP per year of life</h3>
              <div className="axr-metric-value">$14.6<span className="axr-metric-unit">/kWh-year</span></div>
              <p className="axr-small axr-muted mt-2">$219 over 15 years.</p>
              <div className="mt-3"><DataTag status="estimate" source="Derived" /></div>
            </div>
            <div className="axr-card">
              <h3 className="axr-h2 mb-2">Second life per year of life</h3>
              <div className="axr-metric-value">$18.4<span className="axr-metric-unit">/kWh-year</span></div>
              <p className="axr-small axr-muted mt-2">$184 over 10 years. It breaks even only at about 12.6 years of service.</p>
              <div className="mt-3"><DataTag status="estimate" source="Derived" /></div>
            </div>
          </div>
          <div className="axr-prose space-y-4">
            <p>
              On these assumptions second life loses unless the used battery lasts nearly as long as a new one. The
              industry&apos;s own expectations are moving: B2U&apos;s chief executive now suggests up to 15 years of
              second-life service, against seven or eight earlier, while a Wood Mackenzie analyst quoted in the same
              article says cycle life is &ldquo;still to be proven&rdquo;. If that holds, the answer changes.
            </p>
            <p>
              B2U reports finished projects 30–40% cheaper than new ones <DataTag status="estimate" source="Company claim, Canary Media" />,
              more than this simple model allows. Possible reasons include cheaper sourcing, its own integration
              design or a higher new-system benchmark. Without independent cost data, the claim cannot be tested.
            </p>
          </div>
          <Notice tone="risk" title="Sensitivity">
            The result turns on the remaining life of the used pack and on the US new-system price. If tariffs keep US
            systems far above global levels while used packs stay cheap, second life gains. If US prices converge
            toward the global $117/kWh, it loses further.
          </Notice>
        </div>
      </ReportSection>

      <ReportSection id="safety" no="07" title="Safety, standards and insurance">
        <div className="grid gap-4 md:grid-cols-2">
          {[
            ["UL 1974", "Covers sorting and grading of used packs, modules and cells for repurposing; certifies the repurposing process. Nissan–Sumitomo's 4R Energy was the first certified, in 2019.", "verified", "UL Solutions"],
            ["UL 1973 and UL 9540", "Repurposed batteries for storage must still be certified to UL 1973, and the full system to UL 9540.", "verified", "UL Solutions"],
            ["UL 9540A", "Test method for thermal-runaway fire propagation. The 6th edition adds an installation-level large-scale fire test and takes effect 1 January 2027.", "verified", "UL Solutions code authority"],
            ["NFPA 855", "Installation standard for stationary storage; the 2026 edition adds large-scale fire-testing guidance. Commentary says it allows repurposed batteries only from a UL 1974-compliant repurposer.", "estimate", "UL Solutions; secondary commentary on the repurposing clause"],
          ].map(([title, body, tag, src]) => (
            <div key={title} className="axr-card">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <h3 className="axr-h2">{title}</h3>
                <DataTag status={tag as Provenance} source={src} />
              </div>
              <p className="axr-small">{body}</p>
            </div>
          ))}
        </div>
        <div className="axr-prose space-y-4 mt-6">
          <p>
            Certification is achievable: Moment Energy&apos;s Luna system was verified to UL 1973, 9540 and 9540A in
            October 2025. But each pack design needs its own work, so a fleet of mixed used packs multiplies the
            testing. B2U spaces its cabinets 20 feet apart after fire tests showed a heat radius of about 13–14 feet
            <DataTag status="estimate" source="Company statement, Texas Tribune" />, which shows how separation rules
            can drive site size.
          </p>
          <p>
            We found no public data on how insurers price second-life storage compared with new.
          </p>
        </div>
        <div className="mt-6">
          <Notice tone="info" title="Deployable storage adds questions">
            These standards are written for stationary systems. A battery that is moved between sites raises
            transport and vibration questions that a stationary listing does not answer. AXIVAI plans its
            certification so safety review doesn&apos;t eat into the speed it offers, which counts double for used
            packs.
          </Notice>
        </div>
      </ReportSection>

      <ReportSection id="warranty" no="08" title="When the manufacturer fails">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="axr-card">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <h3 className="axr-h2">Lion Electric</h3>
              <DataTag status="verified" source="Electrek, 2025" />
            </div>
            <p className="axr-small">
              After creditor protection in December 2024 and a 2025 rescue by Quebec investors, a restructuring letter
              called warranties on Lion vehicles bought outside Quebec &ldquo;null and void&rdquo;. US districts were
              left to find their own service.
            </p>
          </div>
          <div className="axr-card">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <h3 className="axr-h2">Proterra</h3>
              <DataTag status="verified" source="Phoenix Motor 10-K (FY2024); Volvo Group" />
            </div>
            <p className="axr-small">
              After its 2023 Chapter 11 filing, the battery business went to Volvo for $210 million and the transit
              business to Phoenix Motor. Phoenix&apos;s 2024 annual report says it assumed certain Proterra transit
              obligations, retains warranty liability on leased batteries, and faces substantial doubt about its
              ability to continue as a going concern.
            </p>
          </div>
        </div>
        <div className="axr-sunken mt-6 axr-prose">
          <p className="axr-small">
            <strong>The lesson for any battery owner.</strong> A warranty is only as good as the company behind it.
            For a used battery the problem is worse: the original warranty has usually ended or does not transfer, and
            the repurposer&apos;s warranty depends on the repurposer&apos;s balance sheet. See the{" "}
            <Link href="/research/fleet-storage-landscape">storage suppliers report</Link> for other supplier failures.
          </p>
        </div>
      </ReportSection>

      <ReportSection id="alternatives" no="09" title="The alternatives test">
        <p className="axr-prose axr-muted mb-6">
          Each battery option set against the same storage need.
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
          <Notice tone="info" title="Verdict">
            New LFP beats second life for AXIVAI&apos;s modular storage on price per year of service, warranty and
            certification. Second life competes only where packs come almost free and last nearly as long as new.
          </Notice>
        </div>
      </ReportSection>

      <ReportSection id="axivai" no="10" title="What it means for AXIVAI">
        <div className="axr-prose space-y-4 mb-6">
          <p className="axr-lead">New LFP storage, priced per delivered kWh, for sites the grid can&apos;t serve yet.</p>
          <p>
            AXIVAI trucks deliver energy into storage on the site, so a fleet waiting on its utility service can
            charge from day one. That storage is built on new LFP: about $70/kWh at pack level, long-lived and backed
            by a full warranty. Battery wear is costed into every delivered kWh.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["Built on new LFP", "New LFP modules are the base case for AXIVAI storage. Second life has to beat that benchmark to get in."],
            ["Wear is priced in", "Daily delivery cycles a battery hardest, so wear per delivered kWh sits in the cost model next to transport."],
            ["Ownership decided up front", "Owning brings residual-value and counterparty risk; leasing or renting moves it elsewhere at a price. AXIVAI weighs that per deployment."],
          ].map(([t, b]) => (
            <div key={t} className="axr-card">
              <h3 className="axr-h2 mb-2">{t}</h3>
              <p className="axr-small">{b}</p>
            </div>
          ))}
        </div>
        <div className="axr-sunken mt-6 axr-prose">
          <p className="axr-small">
            Where second life fits: stationed backup at a site with few cycles a year, using bus packs a fleet partner
            already owns, with full battery data.
          </p>
        </div>
      </ReportSection>

      <ReportSection id="sources" no="11" title="Sources">
        <SourceList sources={SOURCES} />
        <div className="mt-6">
          <p className="axr-caption mb-4">
            This review also draws on earlier internal research, re-checked against the public sources above. Market
            size projections from commercial research firms were not used. Related:{" "}
            <Link href="/research/fleet-storage-landscape">storage suppliers</Link>,{" "}
            <Link href="/research/white-plains-v2g">vehicle-to-grid at White Plains</Link> and{" "}
            <Link href="/research/school-bus-depots">school-bus depots</Link>.
          </p>
          <p className="axr-caption">
            BNEF figures date from December 2025; company statuses were checked in October 2026.
          </p>
        </div>
      </ReportSection>

      <ReportSection id="open-questions" no="12" title="What we're investigating next">
        <div className="grid gap-4 md:grid-cols-2">
          {[
            ["Bus battery degradation in the field", "Measured capacity loss per year for school and transit buses, by chemistry and climate."],
            ["Second-life remaining life", "How many years and cycles used packs actually deliver in storage."],
            ["Used pack prices", "Transaction prices per kWh for retired bus and EV packs."],
            ["US new-system prices for small units", "Turnkey $/kWh for 0.5–2 MWh containerised or trailer systems."],
            ["Insurance terms", "Premiums and exclusions for second-life versus new storage."],
            ["Certification for mobile use", "Which listings apply when storage moves between sites."],
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
          title="Hold retired bus batteries, or battery data?"
          body="Fleets and repurposers with real degradation or pricing data: tell us what you have. AXIVAI is preparing its first pilot sites."
        />
      </ReportSection>

      <ReportSection id="next-steps" no="13" title="Proposed next steps">
        <ol className="axr-steps axr-steps-4">
          {[
            ["Refresh", "Check BNEF's 2026 battery and system surveys when published."],
            ["Quote", "Get prices for new LFP and second-life units of 0.5–2 MWh from at least three suppliers each."],
            ["Model", "Add battery wear per delivered kWh to AXIVAI's pricing model."],
            ["Decide", "Compare owning, leasing and renting storage on residual-value risk."],
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
