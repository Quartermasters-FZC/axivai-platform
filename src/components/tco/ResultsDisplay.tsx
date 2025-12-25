"use client";

/**
 * AXIVAI TCO Results Display - REMEDIATED VERSION
 * © 2025-2050 Aliff Capital, LLC. All Rights Reserved.
 *
 * Black Hat Remediation:
 * - C1: Neutral "lowest cost" language (no "winner" framing)
 * - C2: Removed "Hidden Costs Revealed" advocacy
 * - C3: Categorical evidence strength, not false numeric precision
 * - C4: Added applicability warnings panel
 * - C5: Added JSON/CSV export capability
 * - R2: "Societal Impact View" instead of "True Cost"
 * - Removed breakEvenFleetSize claim
 */

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type {
  TCOResult,
  ScenarioType,
  DataConfidence,
  EvidenceStrength,
  ApplicabilityWarning,
} from "@/types/tco";

interface ResultsDisplayProps {
  results: {
    diesel: TCOResult;
    selfManaged: TCOResult;
    eaas: TCOResult;
    axivai: TCOResult;
    comparison: {
      lowestTCO: ScenarioType;
      lowestNetTCO: ScenarioType;
      axivaiSavingsVsDiesel: number;
      axivaiNetSavingsVsDiesel: number;
      axivaiSavingsVsSelfManaged: number;
      paybackYearsVsDiesel: number | null;
      // REMOVED: breakEvenFleetSize - was unsubstantiated claim
    };
    warnings: ApplicabilityWarning[];
  };
}

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const formatPercent = (value: number): string => {
  return `${value.toFixed(1)}%`;
};

const SCENARIO_LABELS: Record<ScenarioType, string> = {
  DIESEL_BASELINE: "Diesel (Baseline)",
  SELF_MANAGED_EV: "Self-Managed EV",
  EAAS: "Electrification-as-a-Service",
  AXIVAI: "AXIVAI Mobile Charging",
};

// FIX C3: Categorical evidence strength instead of numeric confidence
const EVIDENCE_STRENGTH_STYLES: Record<EvidenceStrength, { label: string; className: string; description: string }> = {
  HIGH: {
    label: "High Confidence",
    className: "bg-green-100 text-green-800 border-green-300",
    description: "Most inputs verified from authoritative sources"
  },
  MEDIUM: {
    label: "Moderate Confidence",
    className: "bg-yellow-100 text-yellow-800 border-yellow-300",
    description: "Mix of verified and estimated inputs"
  },
  LOW: {
    label: "Low Confidence",
    className: "bg-orange-100 text-orange-800 border-orange-300",
    description: "Significant assumptions or contingent factors"
  },
  UNCERTAIN: {
    label: "Highly Uncertain",
    className: "bg-red-100 text-red-800 border-red-300",
    description: "Many unverified or contingent assumptions"
  },
};

// DEPRECATED: Kept for backward compatibility
function ConfidenceBadge({ confidence }: { confidence: DataConfidence }) {
  const variants: Record<DataConfidence, { label: string; className: string }> = {
    KNOWN: { label: "Verified", className: "bg-green-100 text-green-800" },
    ESTIMATED: { label: "Estimated", className: "bg-yellow-100 text-yellow-800" },
    UNKNOWN: { label: "Contingent", className: "bg-orange-100 text-orange-800" }, // FIXED: "Unknown" -> "Contingent"
  };

  const { label, className } = variants[confidence];

  return (
    <Badge variant="outline" className={className}>
      {label}
    </Badge>
  );
}

function EvidenceStrengthBadge({ strength }: { strength: EvidenceStrength }) {
  const style = EVIDENCE_STRENGTH_STYLES[strength];
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Badge variant="outline" className={style.className}>
            {style.label}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p className="max-w-xs">{style.description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

// FIX C4: Applicability Warnings Panel
function ApplicabilityWarningsPanel({ warnings }: { warnings: ApplicabilityWarning[] }) {
  if (warnings.length === 0) return null;

  const criticalWarnings = warnings.filter(w => w.severity === "CRITICAL");
  const warningLevel = warnings.filter(w => w.severity === "WARNING");
  const infoLevel = warnings.filter(w => w.severity === "INFO");

  return (
    <Card className="border-amber-200 bg-amber-50/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-amber-800 flex items-center gap-2">
          Applicability Notes
          <Badge variant="outline" className="bg-amber-100 text-amber-800">
            {warnings.length} items
          </Badge>
        </CardTitle>
        <CardDescription className="text-amber-700">
          Important context about assumptions in this analysis
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {criticalWarnings.map(warning => (
          <Alert key={warning.id} variant="destructive">
            <AlertTitle className="font-medium">{warning.title}</AlertTitle>
            <AlertDescription className="text-sm">
              {warning.message}
              <span className="block text-xs mt-1 opacity-75">
                Reason: {warning.reason}
              </span>
            </AlertDescription>
          </Alert>
        ))}
        {warningLevel.map(warning => (
          <Alert key={warning.id} className="border-orange-300 bg-orange-50">
            <AlertTitle className="font-medium text-orange-800">{warning.title}</AlertTitle>
            <AlertDescription className="text-sm text-orange-700">
              {warning.message}
            </AlertDescription>
          </Alert>
        ))}
        {infoLevel.map(warning => (
          <Alert key={warning.id} className="border-blue-200 bg-blue-50">
            <AlertTitle className="font-medium text-blue-800">{warning.title}</AlertTitle>
            <AlertDescription className="text-sm text-blue-700">
              {warning.message}
            </AlertDescription>
          </Alert>
        ))}
      </CardContent>
    </Card>
  );
}

// FIX C5: Export functionality
function ExportPanel({
  results,
}: {
  results: ResultsDisplayProps["results"];
}) {
  const exportJSON = () => {
    const exportData = {
      exportedAt: new Date().toISOString(),
      calculator: "AXIVAI TCO Calculator v2.0 (Remediated)",
      disclaimer: "Planning-grade estimates only. Not for procurement decisions without professional review.",
      scenarios: {
        diesel: {
          totalNetTCO: results.diesel.totalNetTCO,
          npv: results.diesel.npvNet,
          costPerMile: results.diesel.netCostPerMile,
          evidenceStrength: results.diesel.evidenceStrength,
        },
        selfManagedEV: {
          totalNetTCO: results.selfManaged.totalNetTCO,
          npv: results.selfManaged.npvNet,
          costPerMile: results.selfManaged.netCostPerMile,
          evidenceStrength: results.selfManaged.evidenceStrength,
        },
        eaas: {
          totalNetTCO: results.eaas.totalNetTCO,
          npv: results.eaas.npvNet,
          costPerMile: results.eaas.netCostPerMile,
          evidenceStrength: results.eaas.evidenceStrength,
        },
        axivai: {
          totalNetTCO: results.axivai.totalNetTCO,
          npv: results.axivai.npvNet,
          costPerMile: results.axivai.netCostPerMile,
          evidenceStrength: results.axivai.evidenceStrength,
          totalRevenue: results.axivai.totalRevenue,
        },
      },
      comparison: results.comparison,
      warnings: results.warnings,
      assumptions: results.axivai.assumptions,
      evidenceFactors: results.axivai.evidenceFactors,
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `tco-analysis-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportCSV = () => {
    const scenarios = [
      { name: "Diesel", ...results.diesel },
      { name: "Self-Managed EV", ...results.selfManaged },
      { name: "EaaS", ...results.eaas },
      { name: "AXIVAI", ...results.axivai },
    ];

    const headers = [
      "Scenario",
      "Net TCO",
      "Gross TCO",
      "NPV (Net)",
      "Cost Per Mile",
      "Total Revenue",
      "Evidence Strength",
    ];

    const rows = scenarios.map((s) => [
      s.name,
      s.totalNetTCO,
      s.totalTCO,
      s.npvNet,
      s.netCostPerMile,
      s.totalRevenue,
      s.evidenceStrength,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `tco-summary-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex gap-2">
      <Button variant="outline" size="sm" onClick={exportJSON}>
        Export JSON (Full)
      </Button>
      <Button variant="outline" size="sm" onClick={exportCSV}>
        Export CSV (Summary)
      </Button>
    </div>
  );
}

export function ResultsDisplay({ results }: ResultsDisplayProps) {
  const { diesel, selfManaged, eaas, axivai, comparison, warnings } = results;
  const [activeView, setActiveView] = useState<"financial" | "societal">("financial");

  const scenarios = [
    { type: "DIESEL_BASELINE" as const, result: diesel },
    { type: "SELF_MANAGED_EV" as const, result: selfManaged },
    { type: "EAAS" as const, result: eaas },
    { type: "AXIVAI" as const, result: axivai },
  ];

  return (
    <div className="space-y-6">
      {/* FIX C4: Applicability Warnings Panel - FIRST */}
      <ApplicabilityWarningsPanel warnings={warnings} />

      {/* Evidence Strength Indicator - FIX C3 */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CardTitle className="text-base">Analysis Confidence</CardTitle>
              <EvidenceStrengthBadge strength={axivai.evidenceStrength} />
            </div>
            <ExportPanel results={results} />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            This analysis is based on {axivai.evidenceFactors.filter(f => f.classification === "VERIFIED").length} verified inputs,
            {" "}{axivai.evidenceFactors.filter(f => f.classification === "CONTINGENT").length} contingent factors, and
            {" "}{axivai.evidenceFactors.filter(f => f.classification === "ASSUMED").length} assumed values.
            Review the Evidence Factors section for details.
          </p>
        </CardContent>
      </Card>

      {/* Fleet Scale Indicator - Simplified (removed breakEvenFleetSize claim) */}
      {axivai.fleetScale && !axivai.fleetScale.breakEvenReached && (
        <Alert className="border-yellow-300 bg-yellow-50">
          <AlertTitle className="text-yellow-800">Small Fleet</AlertTitle>
          <AlertDescription className="text-yellow-700">
            Smaller fleets may have different economics. Consider regional
            aggregation or consult with AXIVAI for fleet-specific analysis.
          </AlertDescription>
        </Alert>
      )}

      {/* View Toggle - Financial vs Societal Impact */}
      <Tabs value={activeView} onValueChange={(v) => setActiveView(v as "financial" | "societal")}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="financial">Financial View</TabsTrigger>
          <TabsTrigger value="societal">Societal Impact View</TabsTrigger>
        </TabsList>

        <TabsContent value="financial" className="mt-4">
          {/* Summary Cards - FIX C1: Neutral language */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {scenarios.map(({ type, result }) => (
              <Card
                key={type}
                className={
                  comparison.lowestNetTCO === type
                    ? "border-2 border-primary ring-2 ring-primary/20"
                    : ""
                }
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-sm font-medium">
                      {SCENARIO_LABELS[type]}
                    </CardTitle>
                    {/* FIX C1: Neutral "lowest cost" language */}
                    {comparison.lowestNetTCO === type && (
                      <Badge variant="outline" className="text-xs">
                        Lowest Modeled Cost
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatCurrency(result.totalNetTCO)}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatCurrency(result.netCostPerMile)}/mile (net)
                  </p>
                  {result.totalRevenue > 0 && (
                    <p className="text-xs text-green-600 mt-1">
                      +{formatCurrency(result.totalRevenue)} revenue (contingent)
                    </p>
                  )}
                  {type !== "DIESEL_BASELINE" && (
                    <p
                      className={`text-sm mt-2 ${
                        result.totalNetTCO < diesel.totalNetTCO
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {result.totalNetTCO < diesel.totalNetTCO ? "Saves " : "Costs "}
                      {formatCurrency(
                        Math.abs(diesel.totalNetTCO - result.totalNetTCO)
                      )}
                      {" vs diesel (under these assumptions)"}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* FIX R2: "Societal Impact View" instead of "True Cost" */}
        <TabsContent value="societal" className="mt-4">
          <Card className="border-purple-200 bg-purple-50/30">
            <CardHeader>
              <CardTitle className="text-purple-800">
                Societal Impact Analysis
              </CardTitle>
              <CardDescription>
                Estimated external costs borne by communities, not fleet budgets.
                These are modeling estimates, not billable costs.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* FIX C2: Removed "Hidden Costs Revealed" advocacy language */}
              <Alert className="mb-4 border-purple-300">
                <AlertDescription className="text-sm">
                  This view shows estimated social/environmental costs that are
                  typically externalized. These estimates are based on EPA and
                  academic sources. Actual impacts vary by location and fleet.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="p-3 bg-white rounded-lg border">
                  <p className="text-xs text-muted-foreground">Health Costs</p>
                  <p className="text-lg font-bold">
                    {formatCurrency(diesel.externalCosts.totalHealthCost)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Diesel fleet only
                  </p>
                </div>
                <div className="p-3 bg-white rounded-lg border">
                  <p className="text-xs text-muted-foreground">Climate Costs</p>
                  <p className="text-lg font-bold">
                    {formatCurrency(diesel.externalCosts.totalClimateCost)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    CO2 social cost
                  </p>
                </div>
                <div className="p-3 bg-white rounded-lg border">
                  <p className="text-xs text-muted-foreground">
                    Regulatory Costs
                  </p>
                  <p className="text-lg font-bold">
                    {formatCurrency(diesel.externalCosts.totalRegulatoryCost)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Compliance, future penalties
                  </p>
                </div>
                <div className="p-3 bg-white rounded-lg border">
                  <p className="text-xs text-muted-foreground">
                    Operational Risks
                  </p>
                  <p className="text-lg font-bold">
                    {formatCurrency(diesel.externalCosts.totalOperationalRiskCost)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Price volatility, etc.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-purple-100 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-purple-800">
                      Total Estimated External Costs (Diesel)
                    </p>
                    <p className="text-xs text-purple-600">
                      Over planning horizon - estimates only
                    </p>
                  </div>
                  <p className="text-2xl font-bold text-purple-800">
                    {formatCurrency(diesel.externalCosts.grandTotalExternalCost)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* AXIVAI Analysis - Neutral language */}
      <Card>
        <CardHeader>
          <CardTitle>AXIVAI Scenario Analysis</CardTitle>
          <CardDescription>
            Modeled costs and potential revenue under current assumptions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-muted-foreground">
                Net TCO vs Diesel
              </p>
              <p
                className={`text-2xl font-bold ${
                  comparison.axivaiNetSavingsVsDiesel > 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {comparison.axivaiNetSavingsVsDiesel > 0 ? "+" : ""}
                {formatCurrency(comparison.axivaiNetSavingsVsDiesel)}
              </p>
              <p className="text-xs text-muted-foreground">
                Under selected assumptions
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                vs Self-Managed EV
              </p>
              <p
                className={`text-2xl font-bold ${
                  comparison.axivaiSavingsVsSelfManaged > 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {comparison.axivaiSavingsVsSelfManaged > 0 ? "+" : ""}
                {formatCurrency(comparison.axivaiSavingsVsSelfManaged)}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Payback Period</p>
              <p className="text-2xl font-bold">
                {comparison.paybackYearsVsDiesel
                  ? `${comparison.paybackYearsVsDiesel.toFixed(1)} years`
                  : "N/A"}
              </p>
              <p className="text-xs text-muted-foreground">vs diesel baseline</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                Total Revenue (Contingent)
              </p>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(axivai.totalRevenue)}
              </p>
              <p className="text-xs text-muted-foreground">
                Requires program enrollment
              </p>
            </div>
          </div>

          {/* Revenue Breakdown with Contingent Label */}
          {axivai.totalRevenue > 0 && (
            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center gap-2 mb-2">
                <p className="text-sm font-medium">Revenue Streams</p>
                <Badge variant="outline" className="text-xs bg-orange-100 text-orange-800">
                  Contingent
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-xs text-green-700">Carbon Credits</p>
                  <p className="text-lg font-bold text-green-800">
                    {formatCurrency(axivai.totalCarbonRevenue)}
                  </p>
                  <p className="text-xs text-green-600">
                    LCFS (CA/OR/WA only) + Federal 45Q (if eligible)
                  </p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-xs text-blue-700">V2G / VPP</p>
                  <p className="text-lg font-bold text-blue-800">
                    {formatCurrency(axivai.totalV2GRevenue)}
                  </p>
                  <p className="text-xs text-blue-600">
                    Requires V2G equipment + utility program
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Detailed Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle>Scenario Comparison</CardTitle>
          <CardDescription>
            Side-by-side comparison under selected assumptions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <Table className="min-w-[720px]">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Metric</TableHead>
                  {scenarios.map(({ type }) => (
                    <TableHead key={type} className="text-right">
                      {SCENARIO_LABELS[type]}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="bg-accent/5">
                  <TableCell className="font-medium">
                    Net TCO (after revenue)
                  </TableCell>
                  {scenarios.map(({ type, result }) => (
                    <TableCell
                      key={type}
                      className="text-right font-mono font-bold"
                    >
                      {formatCurrency(result.totalNetTCO)}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-muted-foreground">
                    └ Gross TCO
                  </TableCell>
                  {scenarios.map(({ type, result }) => (
                    <TableCell
                      key={type}
                      className="text-right font-mono text-muted-foreground"
                    >
                      {formatCurrency(result.totalTCO)}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-green-600">
                    └ Total Revenue (Contingent)
                  </TableCell>
                  {scenarios.map(({ type, result }) => (
                    <TableCell
                      key={type}
                      className="text-right font-mono text-green-600"
                    >
                      {result.totalRevenue > 0
                        ? `(${formatCurrency(result.totalRevenue)})`
                        : "—"}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">NPV (Net)</TableCell>
                  {scenarios.map(({ type, result }) => (
                    <TableCell key={type} className="text-right font-mono">
                      {formatCurrency(result.npvNet)}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Net Cost per Mile</TableCell>
                  {scenarios.map(({ type, result }) => (
                    <TableCell key={type} className="text-right font-mono">
                      {formatCurrency(result.netCostPerMile)}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Avg Annual Net Cost</TableCell>
                  {scenarios.map(({ type, result }) => (
                    <TableCell key={type} className="text-right font-mono">
                      {formatCurrency(result.averageAnnualNetCost)}
                    </TableCell>
                  ))}
                </TableRow>
                {/* FIX C3: Show evidence strength instead of numeric confidence */}
                <TableRow>
                  <TableCell className="font-medium">Evidence Strength</TableCell>
                  {scenarios.map(({ type, result }) => (
                    <TableCell key={type} className="text-right">
                      <EvidenceStrengthBadge strength={result.evidenceStrength} />
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Cost Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>AXIVAI Cost Breakdown</CardTitle>
          <CardDescription>
            Detailed breakdown of costs over the planning horizon
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <Table className="min-w-[720px]">
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">% of Total</TableHead>
                  <TableHead className="text-right">Confidence</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {axivai.costBreakdown.map((item) => (
                  <TableRow key={item.category}>
                    <TableCell className="font-medium">
                      {item.category}
                      {item.details && (
                        <span className="text-xs text-muted-foreground block">
                          {item.details}
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      {formatCurrency(item.amount)}
                    </TableCell>
                    <TableCell className="text-right font-mono text-muted-foreground">
                      {formatPercent(item.percentage)}
                    </TableCell>
                    <TableCell className="text-right">
                      <ConfidenceBadge confidence={item.confidence} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <Separator className="my-4" />

          <p className="text-xs text-muted-foreground">
            Analysis calculated at:{" "}
            {new Date(axivai.calculatedAt).toLocaleString()}
          </p>
        </CardContent>
      </Card>

      {/* Disclaimer Footer */}
      <Card className="border-dashed">
        <CardContent className="pt-4">
          <p className="text-xs text-muted-foreground text-center">
            This tool provides <strong>planning-grade estimates</strong> based on
            the assumptions shown above. Actual costs may vary. Consult with
            AXIVAI and financial professionals before making procurement
            decisions. Revenue streams are contingent on program enrollment and
            availability.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
