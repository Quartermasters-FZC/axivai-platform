/**
 * Research series index. One entry per report page under src/app/research/<slug>.
 * Order here is the order on /research.
 */

export type ResearchReport = {
  slug: string;
  kind: "Research case" | "Industry review" | "Market scan" | "Case study";
  title: string;
  summary: string;
  date: string;
  /** ISO date for structured data and the sitemap. */
  isoDate: string;
};

export const RESEARCH_REPORTS: ResearchReport[] = [
  {
    slug: "school-bus-depots",
    kind: "Research case",
    title: "Electric school-bus depots",
    summary:
      "When a depot can't get the power it needs in time, which option charges the fleet at the lowest total cost, and when does deployable power win?",
    date: "31 October 2026",
    isoDate: "2026-10-31",
  },
  {
    slug: "ny-implementation-gap",
    kind: "Industry review",
    title: "New York's electric school-bus gap: how much is power?",
    summary:
      "Under 1% of New York district buses are electric. Utility upgrades rank as a top barrier, but funding ranks higher and most districts don't yet know their power needs.",
    date: "31 October 2026",
    isoDate: "2026-10-31",
  },
  {
    slug: "nyc-district-depots",
    kind: "Case study",
    title: "NYC school buses: who holds the depot power problem",
    summary:
      "In NYC, depot power sits with contracted bus companies, Con Edison and the city's transportation office, not school districts. Two Bronx depots show cheap fixes working.",
    date: "31 October 2026",
    isoDate: "2026-10-31",
  },
  {
    slug: "park-out-charging",
    kind: "Industry review",
    title: "Park-out school buses: charging away from the depot",
    summary:
      "Where can an electric school bus charge when it sleeps at the driver's home? Home charging, managed charging, shared hubs, mid-day charging and driveway delivery compared.",
    date: "31 October 2026",
    isoDate: "2026-10-31",
  },
  {
    slug: "fleet-storage-landscape",
    kind: "Market scan",
    title: "Deployable and buffered power for fleet charging",
    summary:
      "Who already supplies mobile, buffered, stationary and rental power for fleets, what each class is good and bad at, and what recent supplier failures say about the market.",
    date: "31 October 2026",
    isoDate: "2026-10-31",
  },
  {
    slug: "fleet-charging-hubs",
    kind: "Case study",
    title: "Shared fleet charging hubs",
    summary:
      "Bus hubs reach megawatt scale and win utility co-funding, yet EV sites now wait 560 days on average for power. AXIVAI trucks the power in so the fleet runs from day one.",
    date: "31 October 2026",
    isoDate: "2026-10-31",
  },
  {
    slug: "transit-depots",
    kind: "Industry review",
    title: "Transit bus depots",
    summary:
      "Transit depots hit the same power gap at roughly 10–20 times school-bus scale, but mostly fix it with phased permanent projects. Deployable power fits resilience and early bridging only.",
    date: "31 October 2026",
    isoDate: "2026-10-31",
  },
  {
    slug: "fleet-business-models",
    kind: "Market scan",
    title: "Fleet electrification business models",
    summary:
      "How fleets pay for charging and power they don't own: who pays, who holds the asset and the risk, what has traction, and what the Proterra, Lion and Moxion failures teach.",
    date: "31 October 2026",
    isoDate: "2026-10-31",
  },
  {
    slug: "battery-second-life",
    kind: "Industry review",
    title: "Battery second life and residual value",
    summary:
      "Second-life batteries work and are in use, but new LFP packs at about $70/kWh erode their cost edge. New LFP is the default for AXIVAI storage; owning it carries degradation and OEM risk.",
    date: "31 October 2026",
    isoDate: "2026-10-31",
  },
  {
    slug: "white-plains-v2g",
    kind: "Case study",
    title: "Vehicle-to-grid at White Plains",
    summary:
      "New York's first school-bus V2G pilot proved buses can export power, but not reliably, how much or for what value, and V2G doesn't help a depot that can't get power in.",
    date: "31 October 2026",
    isoDate: "2026-10-31",
  },
];
