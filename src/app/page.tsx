import Link from "next/link";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LegalFooter } from "@/components/LegalFooter";
import { HeroSection } from "@/components/hero/HeroSection";
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
} from "lucide-react";

// Copy source: docs/planning/AXIVAI_Improved_Concept_Paper_October_2026.md

const PROBLEMS = [
  {
    icon: Clock,
    title: "Connection delay",
    manifestation: "A fleet or facility is ready, but a transformer, feeder or service upgrade is not.",
    question: "Can temporary power bridge the interval safely and affordably?",
  },
  {
    icon: Gauge,
    title: "Peak-capacity mismatch",
    manifestation: "A site has enough daily energy but not enough instantaneous kW.",
    question: "Can managed charging or a stationary battery reshape demand?",
  },
  {
    icon: CalendarRange,
    title: "Temporary or relocatable demand",
    manifestation: "A construction project, event or industrial operation needs power for a limited period.",
    question: "Can a deployable asset avoid permanent infrastructure investment?",
  },
  {
    icon: ShieldAlert,
    title: "Resilience gap",
    manifestation: "A critical load needs continuity during outages or disruptions.",
    question: "What power, duration, recharge plan and reliability level are required?",
  },
  {
    icon: MapPin,
    title: "Remote or dispersed load",
    manifestation: "Electricity is needed at several sites without adequate connections.",
    question: "When does transporting stored energy outperform local supply?",
  },
];

const MODES = [
  {
    icon: Truck,
    title: "Mobile energy delivery",
    description: "Charge storage elsewhere, transport it, discharge at the customer site.",
    fit: "No adequate local connection; limited-duration or geographically dispersed needs.",
    limitation: "Transport, labour, equipment cycling and low utilisation can overwhelm the economics.",
  },
  {
    icon: BatteryCharging,
    title: "Stationed power",
    description: "Deliver a battery system once and leave it on site for a defined period.",
    fit: "Peak support, temporary construction power, bridge-to-grid, resilience.",
    limitation: "Needs on-site recharge or periodic replenishment, plus site and safety approvals.",
  },
  {
    icon: SlidersHorizontal,
    title: "Managed capacity",
    description: "Coordinate available electrical service, charging and optional storage.",
    fit: "Sites with constrained peak kW but adequate energy over longer windows.",
    limitation: "Cannot create sufficient power where the underlying supply is genuinely absent.",
  },
];

const PROCESS = [
  "Verify the need: kW, kWh, duration, location, service level",
  "Assess alternatives, including ones that do not involve AXIVAI",
  "Select the deployment mode",
  "Engineer, permit and commission",
  "Measure service results",
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
  { name: "Electric school-bus depots", need: "Bridge delayed service or charging infrastructure", test: "Can required bus charging be achieved below the cost of alternatives?" },
  { name: "Commercial fleets and depots", need: "Charging peak capacity and site readiness", test: "kW profile, daily kWh, route density, service economics" },
  { name: "Construction and temporary industrial sites", need: "Defined-duration power without permanent buildout", test: "Rental economics versus generators and grid connections" },
  { name: "Ports and logistics yards", need: "Electrification of high-load equipment", test: "Power density, operating shifts, site electrical constraints" },
  { name: "Utilities and critical infrastructure", need: "Temporary support and limited-duration resilience", test: "Reliability requirement, export permission, response time" },
  { name: "Disaster recovery", need: "Power after outages or infrastructure damage", test: "Access, duration, replenishment, paid readiness" },
  { name: "Government and defense", need: "Operational resilience and deployable mission power", test: "Mission specification, qualification, cyber and logistics" },
];

const STAGES = [
  { stage: "I", title: "Problem mapping", question: "Where are the physical and commercial power-access gaps?" },
  { stage: "II", title: "Comparative engineering", question: "Which mode solves each problem best?" },
  { stage: "III", title: "Techno-economic feasibility", question: "When is deployable power attractive after total costs?" },
  { stage: "IV", title: "Concept validation", question: "Which use cases deserve a pilot?" },
  { stage: "V", title: "Pilot definition", question: "What small test would most reduce uncertainty?" },
  { stage: "VI", title: "Commercialization", question: "Is there a repeatable, financially viable service?" },
];

const EVIDENCE_LEVELS = [
  { title: "Established external problem", description: "Supported by technical studies, utility documents or documented deployments." },
  { title: "Feasible technology class", description: "Demonstrated somewhere, but not necessarily as an AXIVAI system." },
  { title: "AXIVAI hypothesis", description: "An architecture, customer benefit or economic model that still requires testing." },
  { title: "Validated AXIVAI result", description: "Reserved for measured performance from a completed, attributable AXIVAI test or deployment." },
];

const FAQS = [
  {
    question: "Is AXIVAI operating today?",
    short: "No. AXIVAI is in concept development.",
    answer:
      "There are no AXIVAI operating assets, deployed hubs, commercial customers, proprietary software, engineering certifications, contracted power supplies or demonstrated financial returns. Imagery on this site is illustrative.",
  },
  {
    question: "Can deployable power avoid a utility interconnection?",
    short: "Sometimes, not always.",
    answer:
      "It depends on the site, the configuration and local approvals. Grid-parallel storage, safety reviews and permitting can recreate the same delay. That is one of the questions the research is designed to answer.",
  },
  {
    question: "Why start with electric school buses?",
    short: "The infrastructure problem is comparatively well documented.",
    answer:
      "The U.S. Department of Energy's Electric School Bus Planning Guide discusses service upgrades, demand charges, managed charging and temporary mobile charging. School buses are a starting case, not the boundary of the concept.",
  },
  {
    question: "How do you handle data privacy?",
    short: "Consent-first, with opt-out controls.",
    answer:
      "The cookie banner and the privacy, cookies and CCPA/Do Not Sell pages are linked in every footer. Analytics stay off until you consent.",
  },
];

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
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <BrandLogo className="h-7" priority />
          </Link>
          <div className="flex items-center gap-6 flex-wrap justify-end">
            <Link
              href="#approach"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Approach
            </Link>
            <Link
              href="#applications"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Applications
            </Link>
            <Link
              href="#evidence"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Evidence
            </Link>
            <Button asChild size="sm">
              <Link href="/report-a-gap">Report a power gap</Link>
            </Button>
          </div>
        </div>
      </nav>

      <main id="main-content" tabIndex={-1} className="flex flex-col">
        <HeroSection />

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
                local distribution, customer connection, usable power. A
                generation-rich region can still contain a depot that cannot get the
                peak power it needs. The limiting factor has to be diagnosed for each
                location.
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
                The central design rule is solution neutrality. A battery truck is not
                always the answer. AXIVAI evaluates whether managed charging,
                temporary stationary storage, transported energy or another power
                solution best meets each requirement.
              </p>
            </div>

            {/* Process */}
            <ol className="grid gap-3 md:grid-cols-5 mb-14">
              {PROCESS.map((step, i) => (
                <li
                  key={step}
                  className="relative rounded-lg border bg-background p-4 text-sm"
                >
                  <span className="block font-display text-xs font-semibold text-accent-ink mb-1">
                    Step {i + 1}
                  </span>
                  {step}
                  {i < PROCESS.length - 1 && (
                    <ArrowRight
                      className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground bg-card"
                      aria-hidden="true"
                    />
                  )}
                </li>
              ))}
            </ol>

            {/* Three deployment modes */}
            <h3 className="text-2xl font-bold text-center mb-8">Three deployment modes</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {MODES.map(({ icon: Icon, title, description, fit, limitation }) => (
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
                      <div className="font-semibold mb-1">Where it may fit</div>
                      <p className="text-muted-foreground">{fit}</p>
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Main limitation</div>
                      <p className="text-muted-foreground">{limitation}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="text-center text-sm text-muted-foreground mt-8 max-w-3xl mx-auto">
              Not every deployment needs every layer. Existing, adequately powered
              connections come first; an Energy Hub is an optional operating node,
              not a prerequisite.
            </p>
          </div>
        </section>

        {/* Alternatives test */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                The alternatives test
              </Badge>
              <h2 className="text-3xl font-bold mb-4">Designed to lose gracefully</h2>
              <p className="text-muted-foreground">
                AXIVAI has to compete with what customers can already buy. When a
                simpler option performs better, the recommendation should say so.
              </p>
            </div>
            <div className="overflow-x-auto rounded-lg border">
              <table className="w-full text-sm">
                <caption className="sr-only">
                  Alternatives to deployable power and when each is often preferable
                </caption>
                <thead className="bg-muted/50 text-left">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-semibold">Alternative</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Often preferable when</th>
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
              The concept is strongest when power-access delay, site flexibility or
              avoided downtime has substantial value and technical alternatives are
              limited.
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
                These are research priorities, not AXIVAI customers or announced
                offerings. Each application has to pass its own test before it earns
                a pilot.
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
                          Initial research case
                          <ArrowRight className="w-3 h-3" aria-hidden="true" />
                        </Link>
                      )}
                    </CardTitle>
                    <CardDescription>{need}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <span className="font-semibold">Key test: </span>
                    <span className="text-muted-foreground">{test}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="text-center text-sm text-muted-foreground mt-8 max-w-3xl mx-auto">
              Storage duration is not firm generation. For large, continuous loads
              such as data centers, deployable storage offers at most limited-duration
              bridging or backup support.
            </p>
          </div>
        </section>

        {/* Economics */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-5xl grid gap-10 lg:grid-cols-2 items-start">
            <div className="space-y-4">
              <Badge variant="secondary">Economics</Badge>
              <h2 className="text-3xl font-bold">The value is availability, not the kilowatt-hour</h2>
              <p className="text-muted-foreground">
                The core hypothesis: power available at the right place and time can be
                worth more than the electricity itself. That is a hypothesis to test,
                and it has to beat the least-cost feasible alternative, not a
                do-nothing scenario.
              </p>
              <p className="text-muted-foreground">
                No credible profitability claim can be made without site-specific
                inputs: load shape, tariffs, asset costs, logistics, availability
                commitments and contract terms.
              </p>
            </div>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Illustrative stress test</CardTitle>
                <CardDescription>
                  A deliberately unfavourable case, not a cost forecast or quotation.
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
                  Excludes battery ownership, depreciation, financing, maintenance,
                  insurance and fixed overhead. It shows how readily transport can
                  erase a low source-electricity price. Shorter routes, higher
                  utilisation and fewer transport cycles could change the result.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Staged validation */}
        <section className="py-20 px-4 bg-card border-y">
          <div className="container mx-auto max-w-6xl">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                Staged validation
              </Badge>
              <h2 className="text-3xl font-bold mb-4">Learning gates, not a rollout plan</h2>
              <p className="text-muted-foreground">
                AXIVAI is in concept development. Each stage needs evidence before the
                next one begins; pilots and commercialization are conditional.
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

        {/* Evidence standard */}
        <section id="evidence" className="py-20 px-4 scroll-mt-20">
          <div className="container mx-auto max-w-5xl">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                Evidence standard
              </Badge>
              <h2 className="text-3xl font-bold mb-4">Every claim says how much we know</h2>
              <p className="text-muted-foreground">
                AXIVAI material separates four levels of evidence, so a hypothesis is
                never presented as a result.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {EVIDENCE_LEVELS.map(({ title, description }) => (
                <Card key={title}>
                  <CardHeader>
                    <CardTitle className="text-base">{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
            <div className="rounded-lg border border-accent/40 bg-accent/5 p-5 text-sm">
              <p>
                <span className="font-semibold">Where AXIVAI stands today: </span>
                there are no operating assets, deployed hubs, commercial customers,
                proprietary software, engineering certifications, contracted power
                supplies or demonstrated financial returns. Brand imagery is
                illustrative, not photographic evidence of deployed facilities.
              </p>
            </div>
          </div>
        </section>

        {/* Report a gap */}
        <section id="report" className="py-20 px-4 bg-card border-y scroll-mt-20">
          <div className="container mx-auto max-w-4xl grid gap-8 md:grid-cols-[auto_1fr] items-start">
            <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center">
              <ClipboardList className="w-7 h-7 text-accent-ink" aria-hidden="true" />
            </div>
            <div className="space-y-4">
              <Badge variant="secondary">Help map the problem</Badge>
              <h2 className="text-3xl font-bold">Know a site that can&apos;t get the power it needs?</h2>
              <p className="text-muted-foreground">
                Stage I of the research is problem mapping: real sites, real loads,
                real utility delays and what the alternatives cost. If you run a
                fleet, a depot, a construction project, a facility or a utility
                program and power access is holding you back, tell us about it.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
                <li>About 5 minutes. Rough numbers or &ldquo;not sure&rdquo; are fine.</li>
                <li>Contact details are optional and kept only if you ask for follow-up.</li>
                <li>AXIVAI isn&apos;t selling anything; a report creates no commitment.</li>
              </ul>
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
                <Link href="/report-a-gap">Report a power-access gap</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ */}
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
              {FAQS.map(({ question, short, answer }) => (
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
          </div>
        </section>

        {/* Closing */}
        <section className="py-20 px-4 bg-card border-t">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold mb-4">
              The right power capability, where conventional infrastructure falls short
            </h2>
            <p className="text-muted-foreground mb-8">
              Mobile, stationed or intelligently managed. The next stage is
              comparative technical and economic research to find which applications
              reward deployable capacity enough to justify its cost.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground w-full sm:w-auto">
                <Link href="#approach">Review the approach</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                <Link href="/report-a-gap">Report a power-access gap</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="about" className="border-t py-12 px-4 space-y-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <BrandLogo className="h-6 mb-1" />
              <p className="text-sm text-muted-foreground">
                Deployable power infrastructure · concept in research and development
              </p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-muted-foreground">
                © 2025–2026 Aliff Capital, LLC. All Rights Reserved.
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                <Link
                  href="https://aliffcapital.com"
                  className="hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  aliffcapital.com
                </Link>
              </p>
            </div>
          </div>
          <div className="mt-6">
            <LegalFooter />
          </div>
        </div>
      </footer>
    </div>
  );
}
