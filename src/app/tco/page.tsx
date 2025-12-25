"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FleetInputForm } from "@/components/tco/FleetInputForm";
import { ResultsDisplay } from "@/components/tco/ResultsDisplay";
import { compareScenarios } from "@/lib/tco";
import { DEFAULT_PARAMETERS } from "@/lib/tco/defaults";
import type { FleetProfile, LocationProfile, AnalysisParameters } from "@/types/tco";

export default function TCOCalculatorPage() {
  // Fleet profile state
  const [fleet, setFleet] = useState<FleetProfile>({
    typeACount: 0,
    typeCCount: 25,
    typeDCount: 0,
    avgDailyMiles: 60,
    operatingDaysPerYear: 180,
    parkOutPercentage: 20,
  });

  // Location state
  const [location, setLocation] = useState<LocationProfile>({
    state: "TX",
  });

  // Parameters state
  const [parameters] = useState<AnalysisParameters>(DEFAULT_PARAMETERS);

  // Active tab
  const [activeTab, setActiveTab] = useState("inputs");

  // Calculate results
  const results = useMemo(() => {
    const totalBuses = fleet.typeACount + fleet.typeCCount + fleet.typeDCount;
    if (totalBuses === 0) return null;

    return compareScenarios({
      fleet,
      location,
      parameters,
    });
  }, [fleet, location, parameters]);

  const totalBuses = fleet.typeACount + fleet.typeCCount + fleet.typeDCount;
  const canCalculate = totalBuses > 0 && location.state;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                TCO Calculator
              </h1>
              <p className="text-muted-foreground mt-1">
                Planning-grade Total Cost of Ownership analysis for school bus
                electrification
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Powered by</span>
              <span className="font-bold gradient-text">AXIVAI</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex items-center justify-between mb-6">
            <TabsList>
              <TabsTrigger value="inputs">Fleet Inputs</TabsTrigger>
              <TabsTrigger value="results" disabled={!results}>
                Results
              </TabsTrigger>
            </TabsList>

            {activeTab === "inputs" && (
              <Button
                onClick={() => setActiveTab("results")}
                disabled={!canCalculate}
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                Calculate TCO
              </Button>
            )}
          </div>

          <TabsContent value="inputs" className="mt-0">
            <FleetInputForm
              fleet={fleet}
              location={location}
              onFleetChange={setFleet}
              onLocationChange={setLocation}
            />

            {/* Quick Stats */}
            {totalBuses > 0 && (
              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h3 className="font-medium mb-2">Fleet Summary</h3>
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Total Buses</p>
                    <p className="text-xl font-bold">{totalBuses}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Annual Miles</p>
                    <p className="text-xl font-bold">
                      {(
                        fleet.avgDailyMiles *
                        fleet.operatingDaysPerYear *
                        totalBuses
                      ).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Park-Out Buses</p>
                    <p className="text-xl font-bold">
                      {Math.round((totalBuses * fleet.parkOutPercentage) / 100)}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Location</p>
                    <p className="text-xl font-bold">{location.state || "—"}</p>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="results" className="mt-0">
            {results ? (
              <ResultsDisplay results={results} />
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  Enter fleet details to see TCO analysis
                </p>
              </div>
            )}

            <div className="mt-6 flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("inputs")}>
                ← Edit Inputs
              </Button>
              <div className="flex gap-2">
                <Button variant="outline">Export PDF</Button>
                <Button variant="outline">Save Analysis</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t mt-auto">
        <div className="container mx-auto px-4 py-4">
          <p className="text-xs text-muted-foreground text-center">
            © 2025–2050 Aliff Capital, LLC. All Rights Reserved.
            This tool provides planning-grade estimates. Consult with professionals
            for procurement decisions.
          </p>
        </div>
      </footer>
    </div>
  );
}
