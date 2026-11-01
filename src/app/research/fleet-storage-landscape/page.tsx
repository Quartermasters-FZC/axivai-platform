import type { Metadata } from "next";
import { GapCta, ReportSection, ReportShell, SourceList, type Source } from "@/components/report/layout";
import { DataTag, Metric, Notice, type Provenance } from "@/components/report/primitives";
import "../report.css";

// Market scan. Draws on earlier internal research, with every kept figure re-checked against public
// sources on 31 October 2026.

export const metadata: Metadata = {
  alternates: { canonical: "/research/fleet-storage-landscape" },
  title: "Deployable and buffered power for fleet charging | AXIVAI",
  description:
    "Who supplies mobile, battery-buffered, stationary and rental power for fleet charging, what each class is good and bad at, and where AXIVAI's delivered energy fills the gap they leave.",
};

const TOC = [
  ["scope", "What this scan covers"],
  ["need", "Why fleets hit power limits"],
  ["classes", "Six classes of solution"],
  ["duration", "Power versus energy"],
  ["suppliers", "Who supplies what"],
  ["warning-signs", "Market warning signs"],
  ["axivai", "Where AXIVAI fits"],
  ["sources", "Sources"],
  ["open-questions", "What we're investigating next"],
  ["next-steps", "Next steps"],
] as const;

const CLASSES: { option: string; wins: string; fails: string; note: string }[] = [
  {
    option: "Mobile charging trucks and trailers",
    wins: "Bridging a delay, rescue charging, pilots, sites with no usable service",
    fails: "Energy per trip is limited; serving a whole fleet every night means repeated trips",
    note: "Suppliers publish kW far more often than kWh, so duration is hard to judge. No public pricing found.",
  },
  {
    option: "Battery-buffered chargers",
    wins: "High-power sessions from a small grid connection; peak-demand control",
    fails: "Buffer covers a few sessions, not a fleet's overnight energy; adds no daily kWh",
    note: "Example: ADS-TEC ChargeBox, up to 320 kW output (vendor spec). One leading supplier, FreeWire, closed in 2024.",
  },
  {
    option: "Stationary battery on existing service",
    wins: "Demand charges, sites with spare capacity over 24 hours, a few hours of backup",
    fails: "Cannot exceed what the service delivers in a day; permits; capital or long contracts",
    note: "Example: Scale Microgrids at VTA, 4 MWh / 1 MW battery (vendor page; described as planned).",
  },
  {
    option: "Rental battery storage",
    wins: "Short leases and bridging months without buying equipment",
    fails: "Same energy limit as owned storage; still needs a recharge source",
    note: "Aggreko lists units from 30 kVA / 65 kWh to 1 MW / 1.3 MWh. Rental rates unknown.",
  },
  {
    option: "Generators, including hydrogen hybrids",
    wins: "Long-duration energy where no grid supply exists",
    fails: "Emissions, noise, fuel logistics, local permits; hydrogen supply is scarce",
    note: "Example: Renewable Innovations MPG pairs a battery with an 85 kW fuel cell (vendor spec). Rental cost unknown.",
  },
  {
    option: "Charging- or electrification-as-a-service",
    wins: "Fleets wanting one fixed fee and no capital outlay",
    fails: "Still depends on grid capacity or one of the classes above",
    note: "SparkCharge sells mobile charging as a service; Highland Electric Fleets bundles school buses, chargers and service.",
  },
  {
    option: "AXIVAI delivered energy into on-site storage",
    wins: "Sites short on daily energy for months, including yards with no grid connection yet",
    fails: "Sites where the grid or the classes above already cover the need",
    note: "Trucks refill storage on the yard from sites with spare capacity. See section 07.",
  },
];

type Duration = { unit: string; kw: number; kwh: number; source: string };

// Hours at rated output = kWh ÷ kW, before losses and state-of-charge limits.
const DURATIONS: Duration[] = [
  { unit: "Aggreko rental, 500 kW / 250 kWh", kw: 500, kwh: 250, source: "Aggreko catalog" },
  { unit: "Aggreko rental, 1 MW / 1.2 MWh", kw: 1000, kwh: 1200, source: "Aggreko catalog" },
  { unit: "Aggreko rental, 250 kW / 575 kWh", kw: 250, kwh: 575, source: "Aggreko catalog" },
  { unit: "VTA depot battery, 1 MW / 4 MWh", kw: 1000, kwh: 4000, source: "Scale Microgrids project page" },
  { unit: "Moxion mobile unit, 75 kW / 600 kWh", kw: 75, kwh: 600, source: "Latitude Media" },
];

const SUPPLIERS: {
  name: string;
  kind: string;
  specs: string;
  status: string;
  tag: Provenance;
  tagSource: string;
}[] = [
  {
    name: "SparkCharge",
    kind: "Mobile battery trailers; off-grid hubs; charging-as-a-service",
    specs: "A 320 kW battery-trailer fast-charging pilot with Zipcar and MassCEC in East Boston. Hub “up to 5 MW”. Trailer kWh not published.",
    status: "Operating. Raised $30.5 million in May 2025.",
    tag: "verified",
    tagSource: "ChargedEVs (Dec 2025); SparkCharge funding release",
  },
  {
    name: "Bee Charged EV",
    kind: "Truck-mounted rescue and fleet charging",
    specs: "Site names units such as the Power Tank 200 but publishes no kW, kWh or voltage ratings.",
    status: "Operating, per its own site. Coverage and response-time claims not independently confirmed.",
    tag: "unknown",
    tagSource: "Vendor website only",
  },
  {
    name: "Renewable Innovations",
    kind: "Hydrogen-hybrid towable generator (MPG)",
    specs: "Battery 66 kWh, scalable to 200 kWh; 85 kW fuel cell (second optional); 150 kW DC charger; 40.3 kg hydrogen at 700 bar.",
    status: "Website active; current corporate status not independently confirmed.",
    tag: "verified",
    tagSource: "Renewable Innovations MPG page (vendor spec)",
  },
  {
    name: "Moxion Power",
    kind: "Mobile battery units replacing diesel generators",
    specs: "75 kW output, over 600 kWh per unit.",
    status: "Closed July 2024; filed Chapter 7 in August 2024. Viridi Parente took over its Richmond, California plant in 2025.",
    tag: "verified",
    tagSource: "Latitude Media; Richmond Standard",
  },
  {
    name: "Viridi Parente",
    kind: "Mobile and stationary battery systems",
    specs: "States modular systems from 50 kWh to 1.2 MWh. No per-model sheet confirmed.",
    status: "Operating.",
    tag: "estimate",
    tagSource: "Viridi FAQ, via search; not fetched directly",
  },
  {
    name: "Lightning eMotors",
    kind: "Electric vans and mobile DC charging trailers",
    specs: "Product specifications no longer published.",
    status: "Receivership; substantially all assets sold to a Gillig subsidiary for $12.6 million, February 2024.",
    tag: "verified",
    tagSource: "BizWest; Lightning eMotors 8-K",
  },
  {
    name: "FreeWire Technologies",
    kind: "Battery-integrated fast chargers",
    specs: "Product specifications no longer published.",
    status: "Ceased operations in 2024. OptiGrid bought core IP but took no responsibility for repairs or warranties on units already sold.",
    tag: "verified",
    tagSource: "freewiretech.com notice",
  },
  {
    name: "ADS-TEC Energy",
    kind: "Battery-buffered fast chargers; storage",
    specs: "ChargeBox up to 320 kW. Claims “up to 65%” lower demand charges (vendor claim).",
    status: "Nasdaq-listed. Preliminary 2025 revenue €31.6 million, down from €110.0 million, citing a key customer's insolvency.",
    tag: "verified",
    tagSource: "EV Engineering & Infrastructure (Mar 2025); company results release (Apr 2026)",
  },
  {
    name: "Power Edison",
    kind: "Utility-grade mobile storage trailers",
    specs: "Battery trailers of 2 MWh or more (2023 launch); a 3 MW / 12 MWh mobile system contracted by an unnamed utility (2021). Sold, rented or leased.",
    status: "Current status not confirmed.",
    tag: "estimate",
    tagSource: "Trade press, 2021 and 2023",
  },
  {
    name: "Aggreko",
    kind: "Rental battery storage and generators",
    specs: "Battery units including 500 kW / 250 kWh, 250 kW / 575 kWh and 1 MW / 1.2 MWh (also trailer-mounted). Rental rates not published.",
    status: "Operating.",
    tag: "verified",
    tagSource: "Aggreko US energy-storage catalog",
  },
  {
    name: "Scale Microgrids",
    kind: "Financed depot microgrids (solar, storage, backup generation)",
    specs: "VTA Cerone yard: 4 MWh usable / 1 MW battery, two 1.5 MW chargers, 500 kW solar, 34 buses. Claims “48% lower costs” (vendor claim).",
    status: "Operating. VTA project described in the future tense.",
    tag: "verified",
    tagSource: "Scale Microgrids VTA project page (vendor)",
  },
  {
    name: "Highland Electric Fleets",
    kind: "School-bus electrification-as-a-service",
    specs: "Says it has over 600 electric vehicles under contract in 30 states.",
    status: "Operating. Total preferred-equity commitments from Galvanize reached $150 million in June 2026.",
    tag: "estimate",
    tagSource: "Company statements via trade press",
  },
];

const SOURCES: Source[] = [
  {
    title: "U.S. Department of Energy, Electric School Bus Planning Guide",
    href: "https://afdc.energy.gov/guides/electric-school-bus",
    use: "Upgrade lead times (3–5 years or longer), demand charges, managed charging, temporary mobile charging.",
    caution: "School-bus focus; no supplier specifications or costs.",
  },
  {
    title: "ChargedEVs: SparkCharge battery trailer delivers 320 kW for Zipcar (December 2025)",
    href: "https://chargedevs.com/newswire/sparkcharges-mobile-battery-powered-trailer-delivers-320-kw-dc-charging-for-zipcars-evs/",
    use: "SparkCharge trailer power and the MassCEC pilot.",
    caution: "Based on a company announcement. No battery capacity given.",
  },
  {
    title: "SparkCharge: website and May 2025 funding release",
    href: "https://www.sparkcharge.io/post/sparkcharge-raises-30-5-million-in-capital-to-accelerate-mobile-ev-charging-expansion",
    use: "Service model and funding.",
    caution: "Vendor source. “99% uptime” and “$0 upfront” are claims, not measured results.",
  },
  {
    title: "Renewable Innovations: MPG product page",
    href: "https://www.renewable-innovations.com/mpg",
    use: "Hydrogen-hybrid generator specifications.",
    caution: "Vendor source. Figures differ from earlier versions of the page.",
  },
  {
    title: "Bee Charged EV: website",
    href: "https://www.beechargedev.com",
    use: "Service description only.",
    caution: "Vendor source with broad coverage claims and no published ratings. Nothing from it is used as fact.",
  },
  {
    title: "Latitude Media: Portable battery startup Moxion is bankrupt (August 2024)",
    href: "https://latitudemedia.com/news/portable-battery-startup-moxion-is-bankrupt-what-happened",
    use: "Moxion closure, Chapter 7 filing, unit specifications and reported causes.",
  },
  {
    title: "Richmond Standard: Viridi acquires former Moxion facility (April 2025)",
    href: "https://richmondstandard.com/richmond/2025/04/24/battery-storage-provider-viridi-acquires-former-moxion-facility-in-richmond/",
    use: "What happened to Moxion's plant.",
    caution: "Local news; deal terms vary across reports and are not used.",
  },
  {
    title: "BizWest: Lightning eMotors asset sale set to close (February 2024)",
    href: "https://bizwest.com/2024/02/16/lightning-emotors-asset-sale-set-to-close-work-to-go-on/",
    use: "Receivership and the $12.6 million sale to a Gillig subsidiary, also reported in an 8-K filing.",
  },
  {
    title: "FreeWire Technologies: closure notice",
    href: "https://freewiretech.com/",
    use: "Closure in 2024 and the OptiGrid IP purchase without warranty obligations.",
  },
  {
    title: "EV Engineering & Infrastructure: battery-buffered charging at the EV Charging Summit (March 2025)",
    href: "https://www.evengineeringonline.com/new-battery-buffered-charging-tech-at-the-ev-charging-summit-expo/",
    use: "ADS-TEC ChargeBox output.",
    caution: "Repeats vendor claims, including “up to 65%” demand-charge savings.",
  },
  {
    title: "ADS-TEC Energy: preliminary and unaudited 2025 results (April 2026, EQS release)",
    href: "https://www.boersennews.de/nachrichten/meldungen/eqs/eqs-news-ads-tec-energy-reports-preliminary-and-unaudited-financial-results/5106023/",
    use: "Revenue decline and stated cause.",
    caution: "Preliminary, unaudited figures.",
  },
  {
    title: "Trailer-Body Builders: Power Edison unveils utility-grade mobile energy storage (2023)",
    href: "https://www.trailer-bodybuilders.com/trailers/article/21274011/power-edison-unveils-utility-grade-mobile-energy-storage-system",
    use: "TerraCharge trailer capacity and purchase, rent or lease options.",
    caution: "Based on a 2023 press release; not rechecked against a current spec sheet.",
  },
  {
    title: "Aggreko US: energy storage products",
    href: "https://www.aggreko.com/en-us/products/energy-storage",
    use: "Rental battery ratings.",
    caution: "Vendor catalog; no prices. Ratings differ from older regional pages (for example 1 MW / 1 MWh).",
  },
  {
    title: "Scale Microgrids: Valley Transportation Authority project",
    href: "https://www.scalemicrogrids.com/projects/vta",
    use: "Depot battery, charger and solar ratings.",
    caution: "Vendor page in the future tense. Its “48% lower costs” is a projection; an earlier version of the page cited 36%.",
  },
  {
    title: "IREI: Highland Electric Fleets announces additional $75 million commitment from Galvanize (2026)",
    href: "https://irei.com/news/highland-electric-fleets-announces-an-additional-75m-preferred-equity-commitment-from-galvanize/",
    use: "Highland's financing and fleet size.",
    caution: "Repeats company statements.",
  },
  {
    title: "Volvo Group: Volvo completes acquisition of battery business from Proterra (February 2024)",
    href: "https://www.volvogroup.com/en/news-and-media/news/2024/feb/volvo-completes-acquisition-of-battery-business-from-proterra-inc--and-proterra-operating-company.html",
    use: "Proterra battery business sold for $210 million before adjustment.",
  },
  {
    title: "BNN Bloomberg: Lion Electric applies for creditor protection (December 2024)",
    href: "https://www.bnnbloomberg.ca/business/company-news/2024/12/18/lion-electric-applies-to-quebec-court-for-protection-from-creditors-under-ccaa/",
    use: "Lion Electric's CCAA filing.",
  },
];

function DurationChart() {
  const max = 9;
  const pct = (v: number) => `${(v / max) * 100}%`;
  return (
    <figure className="axr-chart axr-card" aria-labelledby="duration-chart-title">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div id="duration-chart-title" className="axr-h2">
            Hours a unit can run at full rated output
          </div>
          <p className="axr-caption mt-1">kWh ÷ kW from published ratings, before losses and state-of-charge limits.</p>
        </div>
        <div className="axr-legend" aria-hidden="true">
          <span className="axr-legend-item">
            <span className="axr-swatch" style={{ background: "var(--accent-ink)" }} />
            Hours at rated power
          </span>
        </div>
      </div>
      <div className="axr-chart-rows">
        {DURATIONS.map((d) => {
          const h = d.kwh / d.kw;
          return (
            <div key={d.unit} className="axr-chart-row">
              <div className="axr-chart-label">
                {d.unit}
                <span>{d.source}</span>
              </div>
              <div className="axr-plot">
                <div className="axr-bar-track">
                  <div
                    className="axr-bar axr-bar-overnight"
                    style={{ width: pct(h) }}
                    role="img"
                    aria-label={`${d.unit}: about ${h.toFixed(1)} hours at rated output`}
                  >
                    <span className="axr-bar-value" aria-hidden="true">
                      {h.toFixed(1)} h
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="axr-axis" aria-hidden="true">
        <div />
        <div className="axr-axis-ticks">
          {[0, 2, 4, 6, 8].map((t) => (
            <span key={t} style={{ left: pct(t) }}>
              {t} h
            </span>
          ))}
        </div>
      </div>
      <figcaption className="axr-caption mt-6">
        All values are estimates derived from published ratings. See the table below.
      </figcaption>
    </figure>
  );
}

export default function FleetStorageLandscapeReport() {
  return (
    <ReportShell
      slug="fleet-storage-landscape"
      eyebrow="Market scan"
      title="Deployable and buffered power for fleet charging"
      lead={
        <>
          Who already supplies mobile, battery-buffered, stationary and rental power for fleets, what each class of
          solution is good and bad at, and what the failures of the last three years say about the market.
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
          <Metric label="Large-upgrade lead time" value="3–5+" unit="years" status="verified" source="DOE Electric School Bus Planning Guide" />
          <Metric label="Suppliers profiled that closed or sold assets" value="3 of 12" status="estimate" source="Moxion, Lightning eMotors, FreeWire; count from this scan" />
          <Metric label="Rental buffer unit, hours at full output" value="0.5" unit="h" status="estimate" source="Aggreko 500 kW / 250 kWh rating" />
          <Metric label="Suppliers publishing prices" value="0" status="unknown" source="None found in this scan" />
        </div>
        <div className="axr-sunken mt-6 axr-prose">
          <p>
            <strong>The finding.</strong> Deployable and buffered power for fleets is a real, crowded market, but
            most products are sized for <em>power</em> (high kW for an hour or two) rather than <em>energy</em> (many
            hours of supply for a whole fleet). Rental batteries, buffered chargers and stationary storage all
            depend on the site&apos;s own service to refill. Mobile charging services exist but publish neither
            capacity in kWh nor prices. That leaves sites short on daily energy for months with no product built for
            them. AXIVAI is built for exactly that: energy delivered by truck into storage on the yard.
          </p>
          <p className="axr-small axr-muted">
            Three of the twelve suppliers profiled have closed or sold their assets since early 2024. Savings and
            uptime figures below are as stated by each vendor.
          </p>
        </div>
      </section>

      {/* 01 Scope */}
      <ReportSection id="scope" no="01" title="What this scan covers">
        <div className="axr-prose">
          <p className="axr-lead">
            A map of what fleets can already buy, and where AXIVAI beats it or partners with it.
          </p>
          <p className="axr-muted">
            This scan covers U.S. suppliers of mobile charging trucks and trailers, battery-buffered chargers,
            stationary storage on an existing service, rental storage, generators and charging-as-a-service. It
            uses published specifications and public records on company status, and tests AXIVAI against every
            other option the same way.
          </p>
        </div>
      </ReportSection>

      {/* 02 Need */}
      <ReportSection id="need" no="02" title="Why fleets hit power limits">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="axr-card">
            <div className="axr-metric-label">Slow upgrades</div>
            <p className="mt-2 axr-small">
              The DOE says new grid infrastructure can need &ldquo;long lead times (3–5 years or longer)&rdquo;.
            </p>
            <div className="mt-3 flex flex-wrap gap-2"><DataTag status="verified" source="DOE Electric School Bus Planning Guide" /></div>
          </div>
          <div className="axr-card">
            <div className="axr-metric-label">Demand charges</div>
            <p className="mt-2 axr-small">
              Fleets &ldquo;can be subject to demand charges that may drastically increase electricity costs&rdquo;,
              which is why peak control has value even where energy is adequate.
            </p>
            <div className="mt-3 flex flex-wrap gap-2"><DataTag status="verified" source="DOE Electric School Bus Planning Guide" /></div>
          </div>
          <div className="axr-card">
            <div className="axr-metric-label">Temporary options</div>
            <p className="mt-2 axr-small">
              Where upgrades run late, the DOE suggests fleets &ldquo;could consider temporary mobile charging
              solutions&rdquo;. It gives no specifications or costs.
            </p>
            <div className="mt-3 flex flex-wrap gap-2"><DataTag status="verified" source="DOE Electric School Bus Planning Guide" /></div>
          </div>
        </div>
        <div className="mt-6">
          <Notice tone="info" title="Recent utility data">
            PG&amp;E&apos;s April 2026 filing to the CPUC puts its EV charging projects at 560 days on average from
            request to power. Large upgrades follow the DOE range above; simpler ones can take months.
          </Notice>
        </div>
      </ReportSection>

      {/* 03 Classes */}
      <ReportSection id="classes" no="03" title="Six classes of solution">
        <p className="axr-prose axr-muted mb-6">
          Every class below is in use somewhere. Which one wins depends on the site.
        </p>
        <div className="axr-table-wrap">
          <table className="axr-table">
            <thead>
              <tr>
                <th scope="col">Class</th>
                <th scope="col">Good at</th>
                <th scope="col">Bad at</th>
              </tr>
            </thead>
            <tbody>
              {CLASSES.map((c) => (
                <tr key={c.option}>
                  <th scope="row" style={{ minWidth: 160 }}>{c.option}</th>
                  <td style={{ minWidth: 160 }}>{c.wins}</td>
                  <td style={{ minWidth: 180 }}>
                    {c.fails}
                    <div className="axr-caption mt-1">{c.note}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ReportSection>

      {/* 04 Duration */}
      <ReportSection id="duration" no="04" title="Power versus energy">
        <div className="space-y-6">
          <p className="axr-prose">
            A battery&apos;s kW decides how fast it charges a vehicle; its kWh decides for how long. Dividing one by
            the other shows how many hours a unit can run flat out. Most products in this market are built for
            short, high-power bursts.
          </p>
          <DurationChart />
          <div className="axr-table-wrap">
            <table className="axr-table">
              <caption>Table view of the chart. Hours are estimates; ratings are as published.</caption>
              <thead>
                <tr>
                  <th scope="col">Unit</th>
                  <th scope="col" className="axr-num">kW</th>
                  <th scope="col" className="axr-num">kWh</th>
                  <th scope="col" className="axr-num">Hours</th>
                  <th scope="col">Rating source</th>
                </tr>
              </thead>
              <tbody>
                {DURATIONS.map((d) => (
                  <tr key={d.unit}>
                    <th scope="row">{d.unit}</th>
                    <td className="axr-num">{d.kw.toLocaleString("en-US")}</td>
                    <td className="axr-num">{d.kwh.toLocaleString("en-US")}</td>
                    <td className="axr-num">{(d.kwh / d.kw).toFixed(1)}</td>
                    <td className="axr-muted">{d.source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="axr-card">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <h3 className="axr-h2">Against a real fleet need</h3>
                <DataTag status="estimate" source="School-bus research case worked example" />
              </div>
              <p className="axr-small">
                The school-bus research case&apos;s example depot needs about 4,000 kWh a day. A 1 MW / 1.2 MWh rental
                unit holds under a third of that, and only if the site can refill it.
              </p>
            </div>
            <div className="axr-card">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <h3 className="axr-h2">Missing numbers</h3>
                <DataTag status="unknown" />
              </div>
              <p className="axr-small">
                Mobile charging services usually publish kW but not kWh per truck or trailer, so their duration and
                cost per kWh delivered cannot be compared from public data.
              </p>
            </div>
          </div>
        </div>
      </ReportSection>

      {/* 05 Suppliers */}
      <ReportSection id="suppliers" no="05" title="Who supplies what">
        <p className="axr-prose axr-muted mb-6">
          Specifications are as published by each supplier or reported in trade press. Status is as of 31 October
          2026.
        </p>
        <div className="axr-table-wrap">
          <table className="axr-table">
            <thead>
              <tr>
                <th scope="col">Supplier</th>
                <th scope="col">Public specifications</th>
                <th scope="col">Status</th>
                <th scope="col">Figure</th>
              </tr>
            </thead>
            <tbody>
              {SUPPLIERS.map((s) => (
                <tr key={s.name}>
                  <th scope="row" style={{ minWidth: 150 }}>
                    {s.name}
                    <div className="axr-caption mt-1" style={{ fontWeight: 400 }}>{s.kind}</div>
                  </th>
                  <td style={{ minWidth: 220 }}>{s.specs}</td>
                  <td style={{ minWidth: 200 }}>{s.status}</td>
                  <td><DataTag status={s.tag} source={s.tagSource} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6">
          <Notice tone="info" title="Specifications change">
            Several published figures changed during 2026. SparkCharge no longer lists its 300 or 500 kWh trailers
            and 80–125 kW ports; Aggreko now lists 1 MW / 1.2 MWh rather than 1 MW / 1 MWh; Scale&apos;s VTA page now
            claims 48% savings rather than 36%.
          </Notice>
        </div>
      </ReportSection>

      {/* 06 Warning signs */}
      <ReportSection id="warning-signs" no="06" title="Market warning signs">
        <div className="space-y-6">
          <div className="axr-table-wrap">
            <table className="axr-table">
              <thead>
                <tr>
                  <th scope="col">Company</th>
                  <th scope="col">What happened</th>
                  <th scope="col">Figure</th>
                </tr>
              </thead>
              <tbody>
                {(
                  [
                    ["Moxion Power", "Mobile batteries for construction, film and events closed in July 2024 and filed for Chapter 7 liquidation in August 2024. Reported causes include scaling production before fixing technical problems and reliance on a few large customers.", "verified", "Latitude Media"],
                    ["Lightning eMotors", "Went into court-ordered receivership; substantially all assets sold to a Gillig subsidiary for $12.6 million in February 2024. Shareholders received nothing.", "verified", "BizWest; 8-K"],
                    ["FreeWire Technologies", "Battery-integrated chargers. Ceased operations in 2024. The buyer of its IP took on no repair or warranty obligations for installed units.", "verified", "freewiretech.com"],
                    ["Proterra", "After its 2023 Chapter 11 filing, its battery business was sold to Volvo for $210 million before adjustment (February 2024).", "verified", "Volvo Group"],
                    ["Lion Electric", "Electric school-bus maker filed for CCAA creditor protection in December 2024; its Joliet, Illinois plant had already closed.", "verified", "BNN Bloomberg; trade press"],
                    ["ADS-TEC Energy", "Still trading, but preliminary 2025 revenue fell to €31.6 million from €110.0 million, which the company linked to a key customer's insolvency.", "verified", "Company results release"],
                  ] as const
                ).map(([co, what, tag, src]) => (
                  <tr key={co}>
                    <th scope="row" style={{ minWidth: 140 }}>{co}</th>
                    <td style={{ minWidth: 280 }}>{what}</td>
                    <td><DataTag status={tag} source={src} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Notice tone="info" title="What the failures suggest">
            Hardware makers scaled ahead of proven demand; utilisation and customer concentration mattered more than
            technology; and customers can be left without warranty support when a supplier fails. AXIVAI plans around
            these lessons: keep assets busy, spread customers, and use rented or multi-vendor equipment where it
            pays.
          </Notice>
        </div>
      </ReportSection>

      {/* 07 AXIVAI */}
      <ReportSection id="axivai" no="07" title="Where AXIVAI fits">
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="axr-card">
              <div className="axr-metric-label">Where existing products win</div>
              <ul className="mt-2 axr-small space-y-2 list-disc pl-5">
                <li>Peak-limited sites: buffered chargers or a stationary battery.</li>
                <li>Sites with spare capacity over 24 hours: owned or rented storage.</li>
                <li>Rescue and short pilots: existing mobile charging services.</li>
                <li>Districts wanting one fee: electrification-as-a-service.</li>
              </ul>
            </div>
            <div className="axr-card">
              <div className="axr-metric-label">Where AXIVAI wins</div>
              <ul className="mt-2 axr-small space-y-2 list-disc pl-5">
                <li>Sites short on daily energy, not just peak power, for months at a time, including yards with no grid connection yet.</li>
                <li>A neutral choice between modes, rather than one supplier&apos;s product.</li>
                <li>Contracts that survive a hardware supplier failing, by using rented or multi-vendor equipment.</li>
              </ul>
            </div>
          </div>
          <div className="axr-sunken axr-prose">
            <p className="axr-small">
              Every product in this scan refills from the site&apos;s own grid service. AXIVAI brings the energy in by
              truck, so it works where that service is missing or too small. Partnering for storage, rather than
              owning every asset, keeps it clear of the over-building that sank several entrants.
            </p>
          </div>
        </div>
      </ReportSection>

      {/* 08 Sources */}
      <ReportSection id="sources" no="08" title="Sources">
        <p className="axr-prose axr-muted mb-6">
          This scan draws on earlier internal research, with every figure kept here re-checked against the public
          sources below on 31 October 2026.
        </p>
        <SourceList sources={SOURCES} />
        <div className="mt-6">
          <Notice tone="info" title="Freshness">
            Vendor specifications and company status are as of 31 October 2026.
          </Notice>
        </div>
      </ReportSection>

      {/* 09 Open questions */}
      <ReportSection id="open-questions" no="09" title="What we&apos;re investigating next">
        <div className="grid gap-4 md:grid-cols-2">
          {[
            ["Mobile charging prices", "Cost per kWh delivered or per night, from any supplier."],
            ["Rental storage and generator rates", "Monthly rates and delivery fees for comparable units."],
            ["kWh per mobile unit", "Usable energy per truck or trailer, not just peak kW."],
            ["Real utilisation", "How many hours a year deployable units actually earn."],
            ["Permitting for temporary storage", "How long a rented battery takes to approve on a depot."],
            ["Status of smaller suppliers", "Several could not be confirmed as operating."],
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
          title="Already using mobile or rented power for a fleet?"
          body="Tell us what you use, what it costs and where it falls short. Five minutes; rough numbers are fine."
        />
      </ReportSection>

      {/* 10 Next steps */}
      <ReportSection id="next-steps" no="10" title="Next steps">
        <ol className="axr-steps axr-steps-4">
          {[
            ["Price", "Request quotes from mobile-charging, battery-rental and generator suppliers."],
            ["Confirm", "Check status and current spec sheets for suppliers marked Estimate or Unknown."],
            ["Model", "Add cost per kWh for each class to the school-bus worked example."],
            ["Interview", "Ask fleets that used these services what worked and what failed."],
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
