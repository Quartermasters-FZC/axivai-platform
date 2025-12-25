/**
 * AXIVAI TCO Calculator Types
 * © 2025-2050 Aliff Capital, LLC. All Rights Reserved.
 *
 * These types define the structure for the planning-grade TCO calculator.
 * All types are designed to support:
 * - Full transparency (every assumption visible)
 * - Data provenance (source tracking)
 * - Confidence labeling (known/estimated/unknown)
 */

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ENUMS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export type FuelType = "DIESEL" | "PROPANE" | "CNG" | "ELECTRIC";

export type BusType = "TYPE_A" | "TYPE_C" | "TYPE_D";

export type ScenarioType =
  | "DIESEL_BASELINE"
  | "SELF_MANAGED_EV"
  | "EAAS"
  | "AXIVAI";

export type ChargingLane = "DIRECT_INJECTION" | "MOTHERSHIP" | "VALET";

export type DataConfidence = "KNOWN" | "ESTIMATED" | "UNKNOWN";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// INPUT TYPES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface FleetProfile {
  // Fleet composition
  typeACount: number;
  typeCCount: number;
  typeDCount: number;

  // Operational profile
  avgDailyMiles: number;
  operatingDaysPerYear: number;
  parkOutPercentage: number; // 0-100

  // Current costs (optional - defaults available)
  dieselPricePerGallon?: number;
  avgMpg?: number;
  annualMaintenanceCostPerBus?: number;
}

export interface LocationProfile {
  state: string;
  zipCode?: string;
  utilityName?: string;

  // Energy rates (optional - defaults by location)
  electricityRateKwh?: number;
  demandChargeKw?: number;
  peakRateKwh?: number;
  offPeakRateKwh?: number;
}

export interface AnalysisParameters {
  planningHorizonYears: number; // Default: 12
  discountRate: number; // Default: 0.05 (5%)
  inflationRate: number; // Default: 0.025 (2.5%)
  electricityEscalationRate: number; // Default: 0.02 (2%)
  dieselEscalationRate: number; // Default: 0.03 (3%)
}

export interface TCOInput {
  fleet: FleetProfile;
  location: LocationProfile;
  parameters: AnalysisParameters;
  scenarioType: ScenarioType;

  // User overrides (always take priority)
  overrides?: Partial<TCOAssumptions>;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ASSUMPTIONS (WITH PROVENANCE)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface DataPoint<T> {
  value: T;
  confidence: DataConfidence;
  source: string;
  sourceUrl?: string;
  asOfDate?: string;
}

export interface TCOAssumptions {
  // Vehicle Pricing
  busPrices: {
    typeA: { diesel: DataPoint<number>; electric: DataPoint<number> };
    typeC: { diesel: DataPoint<number>; electric: DataPoint<number> };
    typeD: { diesel: DataPoint<number>; electric: DataPoint<number> };
  };

  // Energy
  dieselPricePerGallon: DataPoint<number>;
  electricityRateKwh: DataPoint<number>;
  demandChargeKw: DataPoint<number>;

  // Efficiency
  dieselMpg: {
    typeA: DataPoint<number>;
    typeC: DataPoint<number>;
    typeD: DataPoint<number>;
  };
  evKwhPerMile: {
    typeA: DataPoint<number>;
    typeC: DataPoint<number>;
    typeD: DataPoint<number>;
  };

  // Maintenance (per mile)
  maintenanceCostPerMile: {
    diesel: DataPoint<number>;
    electric: DataPoint<number>;
  };

  // Infrastructure
  chargerCostLevel2: DataPoint<number>;
  chargerCostDcfc: DataPoint<number>;
  installationCostPerCharger: DataPoint<number>;

  // AXIVAI-specific (Three-Lane pricing)
  axivaiPricing: {
    directInjectionPerKwh: DataPoint<number>;
    mothershipPerKwh: DataPoint<number>;
    valetPerKwh: DataPoint<number>;
  };

  // Incentives
  federalIncentivePerBus: DataPoint<number>;
  stateIncentivePerBus: DataPoint<number>;

  // Lifecycle
  busLifespanYears: DataPoint<number>;
  residualValuePercent: DataPoint<number>;
  batteryReplacementYear: DataPoint<number>;
  batteryReplacementCost: DataPoint<number>;

  // Weather adjustment
  coldWeatherRangeReduction: DataPoint<number>; // 0-1 multiplier
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// OUTPUT TYPES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface AnnualCosts {
  year: number;
  capitalCost: number;
  energyCost: number;
  maintenanceCost: number;
  infrastructureCost: number;
  insuranceCost: number;
  incentivesApplied: number;
  totalCost: number;
  cumulativeCost: number;
  npvCost: number;
}

export interface CostBreakdown {
  category: string;
  amount: number;
  percentage: number;
  confidence: DataConfidence;
  details?: string;
}

export interface TCOResult {
  // Summary metrics
  totalTCO: number;
  npv: number;
  averageAnnualCost: number;
  costPerMile: number;

  // Comparison metrics (vs diesel baseline)
  savingsVsDiesel?: number;
  paybackYears?: number;
  irr?: number;

  // Detailed breakdown
  annualCosts: AnnualCosts[];
  costBreakdown: CostBreakdown[];

  // Assumptions used (for transparency)
  assumptions: TCOAssumptions;

  // Confidence scoring
  overallConfidence: number; // 0-1
  confidenceFactors: {
    factor: string;
    confidence: DataConfidence;
    impact: "HIGH" | "MEDIUM" | "LOW";
  }[];

  // Metadata
  calculatedAt: string;
  scenarioType: ScenarioType;
}

export interface ScenarioComparison {
  scenarios: {
    type: ScenarioType;
    label: string;
    result: TCOResult;
  }[];

  // Comparison metrics
  lowestTCO: ScenarioType;
  highestSavings: ScenarioType;
  fastestPayback: ScenarioType;

  // Sensitivity insights
  breakEvenElectricityRate?: number;
  breakEvenDieselPrice?: number;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SENSITIVITY ANALYSIS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface SensitivityVariable {
  name: string;
  baseValue: number;
  minValue: number;
  maxValue: number;
  step: number;
  unit: string;
}

export interface SensitivityResult {
  variable: string;
  values: number[];
  tcoResults: number[];
  npvResults: number[];
  elasticity: number; // % change in TCO per % change in variable
}

export interface SensitivityAnalysis {
  baseCase: TCOResult;
  variables: SensitivityVariable[];
  results: SensitivityResult[];
  tornadoChart: {
    variable: string;
    lowImpact: number;
    highImpact: number;
  }[];
}
