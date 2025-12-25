import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold gradient-text">
            AXIVAI
          </Link>
          <div className="flex items-center gap-6">
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
          <div className="flex items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/tco">Calculate Your TCO</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
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
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="/tco">Start Your TCO Analysis</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer id="about" className="border-t py-12 px-4">
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
        </div>
      </footer>
    </div>
  );
}
