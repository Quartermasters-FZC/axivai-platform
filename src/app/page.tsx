import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LegalFooter } from "@/components/LegalFooter";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold gradient-text">
            AXIVAI
          </Link>
          <div className="flex items-center gap-6 flex-wrap justify-end">
            <Link
              href="/tco"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              TCO Calculator
            </Link>
            <Link
              href="#solutions"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Solutions
            </Link>
            <Link
              href="#about"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
            <Button asChild size="sm">
              <Link href="/tco">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

  <main id="main-content" tabIndex={-1} className="flex flex-col gap-16">
        {/* Hero Section */}
        <section className="py-24 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <Badge variant="outline" className="mb-6">
              Resilience Infrastructure Platform
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Electrify Your Fleet.
              <br />
              <span className="gradient-text">Bypass the Grid.</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              AXIVAI delivers decision-grade intelligence for school bus
              electrification. Our mobile charging architecture bypasses utility
              interconnection queues—deploying in weeks, not years.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/tco">Calculate Your TCO</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                <Link href="#solutions">Explore Solutions</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Problem Statement */}
        <section className="py-16 bg-card border-y">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-2xl font-bold mb-4">The Crisis</h2>
              <p className="text-muted-foreground">
                $5 billion invested in electric school buses. Thousands sitting
                idle. The grid can&apos;t keep up.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">8-Year Queues</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    PJM interconnection timelines stretch to 8 years. Buses arrive
                    in months—chargers take years.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">OEM Bankruptcies</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Lion Electric, Proterra, Lightning eMotors—warranties voided,
                    assets stranded.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Park-Out Void</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Rural districts can&apos;t electrify driver homes. $6,000+
                    panel upgrades per residence.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Visual Analogy: Grid Bottleneck vs Logistics-First */}
        <section className="py-24 px-4 bg-muted/30">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                The AXIVAI Difference
              </Badge>
              <h2 className="text-3xl font-bold mb-4">
                Logistics-First, Not Construction-First
              </h2>
              <p className="text-muted-foreground">
                Traditional grid upgrades trap districts in multi-year queues.
                AXIVAI delivers electricity as cargo—deploying in weeks.
              </p>
            </div>
            <div className="max-w-6xl mx-auto">
              <div className="relative w-full rounded-lg overflow-hidden border border-accent/20 bg-card shadow-lg">
                <Image
                  src="/images/grid-bottleneck-vs-logistics-first.svg"
                  alt="Comparison of traditional grid-constrained approach requiring 18-36 months for infrastructure upgrades versus AXIVAI's logistics-first mobile charging model deploying in weeks"
                  width={1200}
                  height={600}
                  className="w-full h-auto"
                  priority
                />
              </div>
              <p className="text-center text-sm text-muted-foreground mt-6 max-w-3xl mx-auto">
                <strong className="text-foreground">Construction-First</strong> requires transformer upgrades, trenching, and 18–36 month interconnection queues.{" "}
                <strong className="text-accent">AXIVAI&apos;s Logistics-First</strong> model treats electricity as physical cargo, bypassing grid constraints entirely.
              </p>
            </div>
          </div>
        </section>

        {/* Solution: Three Lanes */}
        <section id="solutions" className="py-24 px-4">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <Badge variant="secondary" className="mb-4">
                The AXIVAI Solution
              </Badge>
              <h2 className="text-3xl font-bold mb-4">
                Electricity as Physical Cargo
              </h2>
              <p className="text-muted-foreground">
                Instead of bringing buses to chargers, we bring chargers to buses.
                Three lanes of mobile charging infrastructure.
              </p>
            </div>

            {/* Three Lanes Architecture Diagram */}
            <div className="max-w-6xl mx-auto mb-16">
              <div className="relative w-full rounded-lg overflow-hidden border border-accent/20 bg-card shadow-xl">
                <Image
                  src="/images/axivai-three-lanes-architecture.svg"
                  alt="AXIVAI Three-Lane Mobile Charging Architecture showing Direct Injection (Class 6 trucks with 500kWh capacity), Mothership (Class 8 semi-trailers with 2MWh capacity), and Valet (electric vans with 150kWh capacity) powered by landfill gas-to-energy, solar plus storage, and off-peak grid at $0.03-$0.08 per kWh"
                  width={1200}
                  height={800}
                  className="w-full h-auto"
                  priority
                />
              </div>
              <p className="text-center text-sm text-muted-foreground mt-6 max-w-4xl mx-auto">
                Three deployment lanes matched to operational needs: <strong className="text-accent">Direct Injection</strong> for satellite depots,{" "}
                <strong className="text-accent">Mothership</strong> for high-volume clusters, and{" "}
                <strong className="text-accent">Valet</strong> for driver homes. Powered by wholesale energy sources ($0.03–$0.08/kWh) to bypass retail grid rates.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="border-accent/20">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-accent">1</span>
                  </div>
                  <CardTitle>Direct Injection</CardTitle>
                  <CardDescription>~$0.25/kWh</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Class 6 electric trucks (~500 kWh) serve satellite depots and
                    short-run clusters.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-accent/20">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-accent">2</span>
                  </div>
                  <CardTitle>Mothership</CardTitle>
                  <CardDescription>~$0.25/kWh</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Class 8 semi-trailers (~2 MWh) handle high-volume depot
                    clusters with maximum throughput.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-accent/20">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-accent">3</span>
                  </div>
                  <CardTitle>Valet</CardTitle>
                  <CardDescription>~$0.35/kWh</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Electric vans (~150 kWh) reach driver homes and HOA-restricted
                    areas. Solves the park-out problem.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Power Sourcing Strategy */}
            <div className="max-w-4xl mx-auto mt-16">
              <Card className="border-accent/30 bg-accent/5">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                      <span className="text-xl">⚡</span>
                    </div>
                    <CardTitle className="text-xl">Strategic Power Sourcing</CardTitle>
                  </div>
                  <CardDescription>
                    Wholesale and off-grid energy sources bypass retail grid rates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <div className="font-semibold text-sm text-accent">Landfill Gas-to-Energy</div>
                      <div className="text-2xl font-bold">$0.03–$0.04<span className="text-sm text-muted-foreground">/kWh</span></div>
                      <p className="text-xs text-muted-foreground">24/7 baseload power from waste methane capture</p>
                    </div>
                    <div className="space-y-2">
                      <div className="font-semibold text-sm text-accent">Renewables + Storage</div>
                      <div className="text-2xl font-bold">$0.03–$0.06<span className="text-sm text-muted-foreground">/kWh</span></div>
                      <p className="text-xs text-muted-foreground">Solar and wind at wholesale PPA rates</p>
                    </div>
                    <div className="space-y-2">
                      <div className="font-semibold text-sm text-accent">Off-Peak Grid</div>
                      <div className="text-2xl font-bold">$0.06–$0.08<span className="text-sm text-muted-foreground">/kWh</span></div>
                      <p className="text-xs text-muted-foreground">Night-time C&amp;I rates when capacity is high</p>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-accent/20">
                    <p className="text-sm text-muted-foreground">
                      By sourcing power independently and delivering it as cargo, AXIVAI eliminates demand charges and time-of-use penalties that plague traditional depot charging.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Core Modules */}
        <section className="py-24 px-4 bg-card border-y">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Platform Modules</h2>
              <p className="text-muted-foreground">
                Decision-grade tools built for school district CFOs, policymakers,
                and auditors.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Link href="/tco">
                <Card className="h-full hover:border-accent transition-colors cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-lg">TCO Calculator</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Planning-grade total cost of ownership with full
                      transparency. Compare diesel, self-managed EV, EaaS, and
                      AXIVAI scenarios.
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <Card className="h-full opacity-75">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    Research Engine
                    <Badge variant="outline" className="text-xs">
                      Coming Soon
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Weekly automated research with citation, freshness scoring,
                    and confidence labeling.
                  </p>
                </CardContent>
              </Card>

              <Card className="h-full opacity-75">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    Solution Explorer
                    <Badge variant="outline" className="text-xs">
                      Coming Soon
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Interactive problem-to-solution mapping with evidence trails
                    and impact analysis.
                  </p>
                </CardContent>
              </Card>

              <Card className="h-full opacity-75">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    Trust Center
                    <Badge variant="outline" className="text-xs">
                      Coming Soon
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Compliance, accessibility, AI governance, and audit trails for
                    procurement readiness.
                  </p>
                </CardContent>
              </Card>

              <Card className="h-full opacity-75">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    AXIVAI Chat
                    <Badge variant="outline" className="text-xs">
                      Coming Soon
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Grounded Q&A with full citation awareness. Explains TCO
                    outputs, policy, and navigation.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Service Regions & Funding */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-5xl grid gap-10 lg:grid-cols-[2fr,1fr] items-start">
            <div className="space-y-4">
              <Badge variant="secondary">Eligibility & Coverage</Badge>
              <h2 className="text-3xl font-bold">Built for U.S. School Districts</h2>
              <p className="text-muted-foreground">
                We prioritize districts facing grid bottlenecks and tight procurement cycles. Mobile charging
                unlocks immediate deployment while utility upgrades catch up.
              </p>
              <div className="flex flex-wrap gap-2">
                {["CA", "TX", "FL", "NY", "NJ", "PA", "WA", "OR", "VA", "IL"].map((state) => (
                  <Badge key={state} variant="outline" className="bg-muted text-foreground">
                    {state}
                  </Badge>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Custom modeling available for other states. Funding-aligned for EPA Clean School Bus, IRA, and state LCFS where available.
              </p>
            </div>
            <Card className="bg-card border-accent/30">
              <CardHeader>
                <CardTitle>Procurement Ready</CardTitle>
                <CardDescription>Evidence-first, audit-friendly deliverables.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-0.5">Docs</Badge>
                  <span>Planning-grade TCO with exportable JSON/CSV evidence.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-0.5">Compliance</Badge>
                  <span>Privacy, cookies, CCPA/Do Not Sell, accessibility pages linked in footer.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-0.5">Support</Badge>
                  <span>Direct analyst support for state-level grant submissions.</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-4 bg-card border-y" aria-labelledby="faq-heading">
          <div className="container mx-auto max-w-5xl space-y-10">
            <div className="text-center space-y-4">
              <Badge variant="secondary" className="mb-2">
                FAQ
              </Badge>
              <h2 id="faq-heading" className="text-3xl font-bold">
                Procurement & Compliance Questions
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Fast answers for district CFOs, transportation directors, and grant coordinators.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-lg">Can we deploy without a new interconnection?</CardTitle>
                  <CardDescription>Yes. Mobile charging bypasses queue risk.</CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <p>We deliver megawatt-scale charging as rolling assets. You avoid transformer upgrades and can iterate routes while the grid catches up.</p>
                </CardContent>
              </Card>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-lg">How do we handle data privacy?</CardTitle>
                  <CardDescription>Consent-first with opt-out controls.</CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <p>Our cookie banner, privacy, cookies, and CCPA/Do Not Sell pages are linked in every footer. Analytics are disabled until consent.</p>
                </CardContent>
              </Card>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-lg">Do you support rural park-outs?</CardTitle>
                  <CardDescription>Yes, via the Valet lane.</CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <p>Electric vans service driver homes and HOA-restricted areas, eliminating $6k+ panel upgrades per residence.</p>
                </CardContent>
              </Card>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-lg">What documentation is exportable?</CardTitle>
                  <CardDescription>JSON and CSV for audit trails.</CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <p>Every TCO run exports evidence factors, assumptions, and scenario comparisons for your procurement file.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-4">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Electrify Smarter?
            </h2>
            <p className="text-muted-foreground mb-8">
              Calculate your total cost of ownership and see how AXIVAI&apos;s mobile
              charging architecture compares to traditional approaches.
            </p>
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground w-full sm:w-auto">
              <Link href="/tco">Start Your TCO Analysis</Link>
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="about" className="border-t py-12 px-4 space-y-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-bold gradient-text text-lg">AXIVAI</p>
              <p className="text-sm text-muted-foreground">
                Resilience Infrastructure for School Bus Electrification
              </p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-muted-foreground">
                © 2025–2050 Aliff Capital, LLC. All Rights Reserved.
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
