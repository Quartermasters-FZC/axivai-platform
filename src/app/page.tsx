import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HeroSection } from "@/components/hero/HeroSection";
import { ApproachDiagram } from "@/components/site/ApproachDiagram";
import { FAQS, faqJsonLd } from "@/lib/faq";
import {
  Clock,
  Gauge,
  CalendarRange,
  ShieldAlert,
  MapPin,
  Truck,
  BatteryCharging,
  SlidersHorizontal,
  ClipboardList,
  ArrowRight,
  CircleDot,
  Download,
  Maximize2,
} from "lucide-react";

// Copy source: docs/planning/AXIVAI_Business_Plan_October_2026.md

export const metadata: Metadata = { alternates: { canonical: "/" } };

const OVERVIEW_IMAGE = "/images/overview/axivai-overview.png";
const OVERVIEW_ALT =
  "AXIVAI overview. 01 The market gap: grid constraints, upgrade delays, temporary power needs and resilience gaps. " +
  "02 The AXIVAI network: power from the grid, renewables or third parties charges modular battery systems at an energy hub, " +
  "which are stored and transported to the customer site; deployment modes are mobile delivery, stationed power and managed capacity. " +
  "03 Value proposition: availability, flexibility, resilience and speed. 04 Target applications: commercial fleets, industrial and " +
  "construction, critical infrastructure, and government and defense. 05 Business model: capacity contracts, deployment fees, " +
  "energy delivery and managed services. 06 Growth roadmap: pilot projects, regional energy hubs, a scaled service network, then " +
  "selective generation integration.";

const PROBLEMS = [
  {
    icon: Clock,
    title: "Connection delay",
    manifestation: "A fleet or facility is ready, but a transformer, feeder or service upgrade is not.",
    question: "AXIVAI delivers the power until the utility service arrives.",
  },
  {
    icon: Gauge,
    title: "Peak-capacity mismatch",
    manifestation: "A site has enough daily energy but not enough instantaneous kW.",
    question: "AXIVAI storage and managed charging cover the peak the connection can't.",
  },
  {
    icon: CalendarRange,
    title: "Temporary or relocatable demand",
    manifestation: "A construction project, event or industrial operation needs power for a limited period.",
    question: "AXIVAI power arrives with the project and leaves when it ends.",
  },
  {
    icon: ShieldAlert,
    title: "Resilience gap",
    manifestation: "A critical load needs continuity during outages or disruptions.",
    question: "AXIVAI keeps critical loads running through the outage.",
  },
  {
    icon: MapPin,
    title: "Remote or dispersed load",
    manifestation: "Electricity is needed at several sites without adequate connections.",
    question: "AXIVAI brings stored energy to every site that needs it.",
  },
];

const MODES = [
  {
    icon: Truck,
    title: "Mobile energy delivery",
    description: "Charge storage elsewhere, transport it, discharge at the customer site.",
    fit: "No adequate local connection; limited-duration or geographically dispersed needs.",
    
  },
  {
    icon: BatteryCharging,
    title: "Stationed power",
    description: "Deliver a battery system once and leave it on site for a defined period.",
    fit: "Peak support, temporary construction power, bridge-to-grid, resilience.",
    
  },
  {
    icon: SlidersHorizontal,
    title: "Managed capacity",
    description: "Coordinate available electrical service, charging and optional storage.",
    fit: "Sites with constrained peak kW but adequate energy over longer windows.",
    
  },
];

const PROCESS = [
  "Verify the need: kW, kWh, duration, location, service level",
  "Compare the options and choose the fastest, lowest-cost fix",
  "Select the deployment mode",
  "Engineer, permit and commission",
  "Deliver power and report results",
];

const ALTERNATIVES = [
  {
    alternative: "Managed or lower-power charging",
    preferable: "Existing service plus a longer charging window meets total energy needs.",
  },
  {
    alternative: "Permanent utility upgrade",
    preferable: "Load is stable, infrastructure arrives soon and lifetime cost is lower.",
  },
  {
    alternative: "Stationary battery on existing service",
    preferable: "Energy can replenish slowly between short, high-power peaks.",
  },
  {
    alternative: "Generator rental or hybrid plant",
    preferable: "Long-duration continuous power is required and fuel logistics are manageable.",
  },
  {
    alternative: "Existing mobile charging supplier",
    preferable: "A supplier already meets response, price and compatibility needs.",
  },
  {
    alternative: "On-site generation",
    preferable: "Continuous high-energy demand, with permitting and economics that support it.",
  },
];

const APPLICATIONS = [
  { name: "Electric school-bus depots", need: "Run the fleet while the utility service is delayed", test: "Nightly kWh per bus, days until grid power, cost of idle buses" },
  { name: "Commercial fleets and depots", need: "Charging peak capacity and site readiness", test: "kW profile, daily kWh, route density, service economics" },
  { name: "Construction and temporary industrial sites", need: "Defined-duration power without permanent buildout", test: "Rental economics versus generators and grid connections" },
  { name: "Ports and logistics yards", need: "Electrification of high-load equipment", test: "Power density, operating shifts, site electrical constraints" },
  { name: "Utilities and critical infrastructure", need: "Temporary support and limited-duration resilience", test: "Reliability requirement, export permission, response time" },
  { name: "Disaster recovery", need: "Power after outages or infrastructure damage", test: "Access, duration, replenishment, paid readiness" },
  { name: "Government and defense", need: "Operational resilience and deployable mission power", test: "Mission specification, qualification, cyber and logistics" },
];

const STAGES = [
  { stage: "I", title: "Market mapping", question: "Find the sites where power access is holding fleets back." },
  { stage: "II", title: "Engineering", question: "Match each site to mobile, stationed or managed power." },
  { stage: "III", title: "Economics", question: "Price every deployment against the site's real alternatives." },
  { stage: "IV", title: "Pilot selection", question: "Choose the first sites with the strongest case." },
  { stage: "V", title: "First deployments", question: "Power the first AXIVAI sites and measure the results." },
  { stage: "VI", title: "Regional network", question: "Scale to energy hubs and a regional service network." },
];

const HOME_FAQS = FAQS.slice(0, 4);

function EstimateTag() {
  return (
    <span className="inline-flex items-center gap-1 rounded border border-accent-ink/40 px-1.5 py-0.5 text-[11px] font-medium text-accent-ink align-middle">
      <CircleDot className="w-3 h-3" aria-hidden="true" />
      Estimate
    </span>
  );
}

export default function HomePage() {
  return (
    <div className="bg-background">
      <main id="main-content" tabIndex={-1} className="flex flex-col">
        <HeroSection />

        {/* At a glance */}
        <section aria-labelledby="overview-heading" className="py-20 px-4 bg-card border-b">
          <div className="container mx-auto max-w-6xl">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <Badge variant="secondary" className="mb-4">
                AXIVAI at a glance
              </Badge>
              <h2 id="overview-heading" className="text-3xl font-bold mb-4">
                One network, three ways to deliver power
              </h2>
              <p className="text-muted-foreground">
                The gap AXIVAI closes, how its modular storage network delivers power, and where it
                applies.
              </p>
            </div>
            <figure>
              <a
                href={OVERVIEW_IMAGE}
                target="_blank"
                rel="noopener noreferrer"
                className="block overflow-hidden rounded-lg border bg-white shadow-sm transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b6914] focus-visible:ring-offset-2"
              >
                <Image
                  src={OVERVIEW_IMAGE}
                  alt={OVERVIEW_ALT}
                  width={1491}
                  height={1055}
                  sizes="(min-width: 1152px) 1152px, 100vw"
                  className="h-auto w-full"
                />
                <span className="sr-only"> (opens full size in a new tab)</span>
              </a>
              <figcaption className="mt-4 flex flex-col items-center gap-3 text-sm text-muted-foreground sm:flex-row sm:justify-center">
                <a
                  href={OVERVIEW_IMAGE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 rounded px-3 font-medium text-foreground underline decoration-[#d4a017] decoration-2 underline-offset-4 hover:text-[#8b6914]"
                >
                  <Maximize2 className="h-4 w-4" aria-hidden="true" />
                  View full size
                </a>
                <a
                  href={OVERVIEW_IMAGE}
                  download="AXIVAI-overview.png"
                  className="inline-flex min-h-11 items-center gap-2 rounded px-3 font-medium text-foreground underline decoration-[#d4a017] decoration-2 underline-offset-4 hover:text-[#8b6914]"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Download the overview (PNG)
                </a>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Problem */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                The problem
              </Badge>
              <h2 className="text-3xl font-bold mb-4">
                Power is not always where, when or how operations need it
              </h2>
              <p className="text-muted-foreground">
                Electricity reaches a site through a chain: generation, transmission,
                local distribution, customer connection, usable power. Any link can
                hold a site back. In California, EV charging projects on PG&amp;E&apos;s
                network now wait 560 days on average from request to power.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PROBLEMS.map(({ icon: Icon, title, manifestation, question }) => (
                <Card key={title} className="h-full">
                  <CardHeader>
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-foreground" aria-hidden="true" />
                    </div>
                    <CardTitle className="text-lg">{title}</CardTitle>
                    <CardDescription>{manifestation}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-foreground">{question}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Approach */}
        <section id="approach" className="py-20 px-4 bg-card border-y scroll-mt-20">
          <div className="container mx-auto max-w-6xl">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                The approach
              </Badge>
              <h2 className="text-3xl font-bold mb-4">Start with the need, not the truck</h2>
              <p className="text-muted-foreground">
                Every AXIVAI deployment is sized to the site: delivered energy,
                stationed storage or managed charging, whichever gets the fleet
                running fastest at the lowest cost.
              </p>
            </div>

            {/* Process: animated diagram; the list is its text alternative */}
            <div className="mb-14">
              <ol className="sr-only">
                {PROCESS.map((step, i) => (
                  <li key={step}>
                    Step {i + 1}: {step}
                  </li>
                ))}
              </ol>
              <ApproachDiagram />
              <p className="mt-3 text-xs text-muted-foreground text-center">
                Two example sites run through the same process. One stops at step 2 because a simpler option wins.
              </p>
            </div>

            {/* Three deployment modes */}
            <h3 className="text-2xl font-bold text-center mb-8">Three deployment modes</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {MODES.map(({ icon: Icon, title, description, fit }) => (
                <Card key={title} className="h-full">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-accent-ink" aria-hidden="true" />
                    </div>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm">
                    <div>
                      <div className="font-semibold mb-1">Best for</div>
                      <p className="text-muted-foreground">{fit}</p>
                    </div>
                    
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="text-center text-sm text-muted-foreground mt-8 max-w-3xl mx-auto">
              Each deployment uses only the layers the site needs. Where an
              adequate connection exists, AXIVAI builds on it.
            </p>
          </div>
        </section>

        {/* Alternatives test */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                Where AXIVAI wins
              </Badge>
              <h2 className="text-3xl font-bold mb-4">Built for the gap the alternatives leave</h2>
              <p className="text-muted-foreground">
                Where the grid is ready, use the grid. AXIVAI serves the sites it
                can&apos;t reach yet, and we tell customers straight when another
                option fits better.
              </p>
            </div>
            <div className="overflow-x-auto rounded-lg border">
              <table className="w-full text-sm">
                <caption className="sr-only">
                  Alternatives to AXIVAI and when each is the better fit
                </caption>
                <thead className="bg-muted/50 text-left">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-semibold">Alternative</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Better fit when</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {ALTERNATIVES.map(({ alternative, preferable }) => (
                    <tr key={alternative}>
                      <th scope="row" className="px-4 py-3 font-medium text-left align-top">
                        {alternative}
                      </th>
                      <td className="px-4 py-3 text-muted-foreground">{preferable}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-center text-sm text-muted-foreground mt-6 max-w-3xl mx-auto">
              AXIVAI wins where waiting for power costs more than delivering it:
              delayed utility service, sites that move and downtime that can&apos;t happen.
            </p>
          </div>
        </section>

        {/* Applications */}
        <section id="applications" className="py-20 px-4 bg-card border-y scroll-mt-20">
          <div className="container mx-auto max-w-6xl">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                Applications
              </Badge>
              <h2 className="text-3xl font-bold mb-4">
                School buses first, not school buses only
              </h2>
              <p className="text-muted-foreground">
                School-bus depots are AXIVAI&apos;s first market. The same
                delivered-power model serves every site below.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {APPLICATIONS.map(({ name, need, test }, i) => (
                <Card key={name} className="h-full">
                  <CardHeader>
                    <CardTitle className="text-base flex flex-wrap items-center gap-2">
                      {name}
                      {i === 0 && (
                        <Link
                          href="/research/school-bus-depots"
                          className="inline-flex items-center gap-1 rounded-md border border-accent-ink/40 bg-accent/5 px-2 py-0.5 text-xs font-medium text-accent-ink hover:border-accent-ink"
                        >
                          Read the research
                          <ArrowRight className="w-3 h-3" aria-hidden="true" />
                        </Link>
                      )}
                    </CardTitle>
                    <CardDescription>{need}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <span className="font-semibold">What decides it: </span>
                    <span className="text-muted-foreground">{test}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
            
          </div>
        </section>

        {/* Economics */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-5xl grid gap-10 lg:grid-cols-2 items-start">
            <div className="space-y-4">
              <Badge variant="secondary">Economics</Badge>
              <h2 className="text-3xl font-bold">The value is availability, not the kilowatt-hour</h2>
              <p className="text-muted-foreground">
                Power at the right place and time is worth more than the electricity
                itself. A depot with new buses and no power pays for diesel, idle
                assets and missed deadlines every month it waits.
              </p>
              <p className="text-muted-foreground">
                Every AXIVAI proposal is priced against the site&apos;s real
                alternatives, using its load shape, tariffs, logistics and contract
                length.
              </p>
            </div>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Delivered-energy stress test</CardTitle>
                <CardDescription>
                  A conservative long-haul case.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center justify-between gap-4 border-b pb-3">
                  <span className="text-muted-foreground">
                    Logistics: $600 per cycle ÷ 1,600 kWh
                  </span>
                  <span className="font-display font-semibold whitespace-nowrap">
                    $0.375/kWh <EstimateTag />
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4 border-b pb-3">
                  <span className="text-muted-foreground">
                    Electricity: $0.08/kWh at 85% efficiency
                  </span>
                  <span className="font-display font-semibold whitespace-nowrap">
                    ≈ $0.094/kWh <EstimateTag />
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="font-semibold">Combined, before equipment and overhead</span>
                  <span className="font-display font-bold whitespace-nowrap">
                    ≈ $0.469/kWh <EstimateTag />
                  </span>
                </div>
                <p className="text-xs text-muted-foreground pt-2">
                  Before battery ownership, financing, maintenance and overhead.
                  Shorter routes and higher utilisation bring it down.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Roadmap */}
        <section className="py-20 px-4 bg-card border-y">
          <div className="container mx-auto max-w-6xl">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                Roadmap
              </Badge>
              <h2 className="text-3xl font-bold mb-4">From first pilots to a regional network</h2>
              <p className="text-muted-foreground">
                AXIVAI is preparing its first pilot sites.
              </p>
            </div>
            <ol className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {STAGES.map(({ stage, title, question }) => (
                <li key={stage} className="rounded-lg border bg-background p-5">
                  <div className="font-display text-sm font-semibold text-accent-ink mb-1">
                    Stage {stage}
                  </div>
                  <div className="font-semibold mb-1">{title}</div>
                  <p className="text-sm text-muted-foreground">{question}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Report a gap */}
        <section id="report" className="py-20 px-4 bg-card border-y scroll-mt-20">
          <div className="container mx-auto max-w-4xl grid gap-8 md:grid-cols-[auto_1fr] items-start">
            <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center">
              <ClipboardList className="w-7 h-7 text-accent-ink" aria-hidden="true" />
            </div>
            <div className="space-y-4">
              <Badge variant="secondary">Waiting on power?</Badge>
              <h2 className="text-3xl font-bold">Know a site that can&apos;t get the power it needs?</h2>
              <p className="text-muted-foreground">
                If you run a fleet, a depot, a construction project or a facility
                and power access is holding you back, tell us about the site.
                We&apos;re choosing AXIVAI&apos;s first pilot sites now.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
                <li>About 5 minutes. Rough numbers or &ldquo;not sure&rdquo; are fine.</li>
                <li>Contact details are optional and kept only if you ask for follow-up.</li>
                <li>Sites that fit become candidates for an AXIVAI pilot.</li>
              </ul>
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
                <Link href="/report-a-gap">Tell us about your site</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd(HOME_FAQS) }} />
        <section className="py-20 px-4" aria-labelledby="faq-heading">
          <div className="container mx-auto max-w-5xl space-y-10">
            <div className="text-center space-y-4">
              <Badge variant="secondary" className="mb-2">
                FAQ
              </Badge>
              <h2 id="faq-heading" className="text-3xl font-bold">
                Common questions
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {HOME_FAQS.map(({ question, short, answer }) => (
                <Card key={question} className="h-full">
                  <CardHeader>
                    <CardTitle className="text-lg">{question}</CardTitle>
                    <CardDescription>{short}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    <p>{answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="text-center">
              <Link href="/faq" className="text-sm font-medium underline decoration-[#d4a017] decoration-2 underline-offset-4 hover:text-accent-ink">
                All questions about AXIVAI
              </Link>
            </p>
          </div>
        </section>

        {/* Closing */}
        <section className="py-20 px-4 bg-card border-t">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold mb-4">
              The right power capability, where conventional infrastructure falls short
            </h2>
            <p className="text-muted-foreground mb-8">
              Mobile, stationed or managed. AXIVAI brings power to the sites the
              grid can&apos;t serve yet.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground w-full sm:w-auto">
                <Link href="#approach">See how it works</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                <Link href="/report-a-gap">Tell us about your site</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Backing */}
        <section aria-labelledby="backing-title" className="border-t py-10 px-4">
          <div className="container mx-auto max-w-5xl">
            <h2 id="backing-title" className="sr-only">Who&apos;s behind AXIVAI</h2>
            <div className="grid gap-6 text-center sm:grid-cols-2 sm:text-left lg:grid-cols-4">
            <dl className="contents">
              <div>
                <dt className="font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-ink">Founder and seed investor</dt>
                <dd className="mt-1 text-lg font-semibold">
                  <a href="https://aliffcapital.com" target="_blank" rel="noopener" className="underline decoration-[#d4a017] decoration-2 underline-offset-4 hover:text-accent-ink">Aliff Capital<span className="sr-only"> (opens in a new tab)</span></a>
                </dd>
              </div>
              <div>
                <dt className="font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-ink">Consultants</dt>
                <dd className="mt-1 text-lg font-semibold">
                  <a href="https://aliffsolutions.com" target="_blank" rel="noopener" className="underline decoration-[#d4a017] decoration-2 underline-offset-4 hover:text-accent-ink">Aliff Solutions<span className="sr-only"> (opens in a new tab)</span></a>
                  {" · "}
                  <a href="https://quartermasters.me" target="_blank" rel="noopener" className="underline decoration-[#d4a017] decoration-2 underline-offset-4 hover:text-accent-ink">Quartermasters<span className="sr-only"> (opens in a new tab)</span></a>
                </dd>
              </div>
              <div>
                <dt className="font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-ink">Website developer</dt>
                <dd className="mt-1 text-lg font-semibold">
                  <a href="https://aliffsolutions.com" target="_blank" rel="noopener" className="underline decoration-[#d4a017] decoration-2 underline-offset-4 hover:text-accent-ink">Aliff Solutions<span className="sr-only"> (opens in a new tab)</span></a>
                </dd>
              </div>
            </dl>
              <div className="sm:text-right sm:self-center">
                <Link href="/about#people" className="text-sm font-medium underline decoration-[#d4a017] decoration-2 underline-offset-4 hover:text-accent-ink">
                  About AXIVAI
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
