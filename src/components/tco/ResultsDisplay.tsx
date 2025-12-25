"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
import type { TCOResult, ScenarioType, DataConfidence } from "@/types/tco";

interface ResultsDisplayProps {
  results: {
    diesel: TCOResult;
    selfManaged: TCOResult;
    eaas: TCOResult;
    axivai: TCOResult;
    comparison: {
      lowestTCO: ScenarioType;
      axivaiSavingsVsDiesel: number;
      axivaiSavingsVsSelfManaged: number;
      paybackYearsVsDiesel: number | null;
    };
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

const SCENARIO_DESCRIPTIONS: Record<ScenarioType, string> = {
  DIESEL_BASELINE: "Continue operating diesel buses",
  SELF_MANAGED_EV: "Purchase EVs and install on-site charging infrastructure",
  EAAS: "Third-party owns and operates charging (e.g., Highland model)",
  AXIVAI: "AXIVAI Three-Lane mobile charging architecture",
};

function ConfidenceBadge({ confidence }: { confidence: DataConfidence }) {
  const variants: Record<DataConfidence, { label: string; className: string }> = {
    KNOWN: { label: "Verified", className: "bg-green-100 text-green-800" },
    ESTIMATED: { label: "Estimated", className: "bg-yellow-100 text-yellow-800" },
    UNKNOWN: { label: "Unknown", className: "bg-red-100 text-red-800" },
  };

  const { label, className } = variants[confidence];

  return (
    <Badge variant="outline" className={className}>
      {label}
    </Badge>
  );
}

export function ResultsDisplay({ results }: ResultsDisplayProps) {
  const { diesel, selfManaged, eaas, axivai, comparison } = results;

  const scenarios = [
    { type: "DIESEL_BASELINE" as const, result: diesel },
    { type: "SELF_MANAGED_EV" as const, result: selfManaged },
    { type: "EAAS" as const, result: eaas },
    { type: "AXIVAI" as const, result: axivai },
  ];

  const sortedByTCO = [...scenarios].sort((a, b) => a.result.totalTCO - b.result.totalTCO);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {scenarios.map(({ type, result }) => (
          <Card
            key={type}
            className={
              comparison.lowestTCO === type
                ? "border-2 border-accent ring-2 ring-accent/20"
                : ""
            }
          >
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <CardTitle className="text-sm font-medium">
                  {SCENARIO_LABELS[type]}
                </CardTitle>
                {comparison.lowestTCO === type && (
                  <Badge className="bg-accent text-accent-foreground">
                    Lowest TCO
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(result.totalTCO)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {formatCurrency(result.costPerMile)}/mile
              </p>
              {type !== "DIESEL_BASELINE" && (
                <p
                  className={`text-sm mt-2 ${
                    result.totalTCO < diesel.totalTCO
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {result.totalTCO < diesel.totalTCO ? "Saves " : "Costs "}
                  {formatCurrency(Math.abs(diesel.totalTCO - result.totalTCO))}
                  {" vs diesel"}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AXIVAI Highlight */}
      <Card className="bg-gradient-to-r from-card to-accent/5 border-accent/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-accent">AXIVAI</span> Analysis Summary
          </CardTitle>
          <CardDescription>
            {comparison.axivaiSavingsVsDiesel > 0
              ? "AXIVAI mobile charging provides significant savings"
              : "Review scenario comparison for detailed analysis"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-muted-foreground">
                Savings vs Diesel
              </p>
              <p
                className={`text-2xl font-bold ${
                  comparison.axivaiSavingsVsDiesel > 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {formatCurrency(comparison.axivaiSavingsVsDiesel)}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                Savings vs Self-Managed EV
              </p>
              <p
                className={`text-2xl font-bold ${
                  comparison.axivaiSavingsVsSelfManaged > 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {formatCurrency(comparison.axivaiSavingsVsSelfManaged)}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                Payback Period
              </p>
              <p className="text-2xl font-bold">
                {comparison.paybackYearsVsDiesel
                  ? `${comparison.paybackYearsVsDiesel.toFixed(1)} years`
                  : "N/A"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle>Scenario Comparison</CardTitle>
          <CardDescription>
            Side-by-side comparison of all electrification pathways
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
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
              <TableRow>
                <TableCell className="font-medium">Total TCO</TableCell>
                {scenarios.map(({ type, result }) => (
                  <TableCell key={type} className="text-right font-mono">
                    {formatCurrency(result.totalTCO)}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">NPV</TableCell>
                {scenarios.map(({ type, result }) => (
                  <TableCell key={type} className="text-right font-mono">
                    {formatCurrency(result.npv)}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Cost per Mile</TableCell>
                {scenarios.map(({ type, result }) => (
                  <TableCell key={type} className="text-right font-mono">
                    {formatCurrency(result.costPerMile)}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Avg Annual Cost</TableCell>
                {scenarios.map(({ type, result }) => (
                  <TableCell key={type} className="text-right font-mono">
                    {formatCurrency(result.averageAnnualCost)}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Confidence Score</TableCell>
                {scenarios.map(({ type, result }) => (
                  <TableCell key={type} className="text-right">
                    {formatPercent(result.overallConfidence * 100)}
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
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
          <Table>
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
                  <TableCell className="font-medium">{item.category}</TableCell>
                  <TableCell className="text-right font-mono">
                    {formatCurrency(item.amount)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatPercent(item.percentage)}
                  </TableCell>
                  <TableCell className="text-right">
                    <ConfidenceBadge confidence={item.confidence} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Assumptions Transparency */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Assumptions & Data Sources
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Badge variant="outline">Transparency</Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">
                    AXIVAI shows all assumptions used in calculations.
                    User inputs always override defaults.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardTitle>
          <CardDescription>
            All data sources and confidence levels for this analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {axivai.confidenceFactors.map((factor) => (
              <div
                key={factor.factor}
                className="flex items-center justify-between p-3 bg-muted rounded-lg"
              >
                <div>
                  <p className="font-medium">{factor.factor}</p>
                  <p className="text-xs text-muted-foreground">
                    Impact: {factor.impact}
                  </p>
                </div>
                <ConfidenceBadge confidence={factor.confidence} />
              </div>
            ))}
          </div>

          <Separator className="my-4" />

          <p className="text-xs text-muted-foreground">
            Analysis calculated at: {new Date(axivai.calculatedAt).toLocaleString()}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
