/**
 * AXIVAI TCO Calculator Types
 * © 2025-2050 Aliff Capital, LLC. All Rights Reserved.
 *
 * These types define the structure for the decision-support TCO calculator.
 * All types are designed to support:
 * - Full transparency (every assumption visible)
 * - Data provenance (source tracking)
 * - Evidence classification (rigorous, not false certainty)
 * - Jurisdiction awareness
 * - Scenario and stress testing
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

// DEPRECATED: Use EvidenceClassification for new code
export type DataConfidence = "KNOWN" | "ESTIMATED" | "UNKNOWN";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// NEW: EVIDENCE CLASSIFICATION SYSTEM (Replaces DataConfidence)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * Evidence Classification - More rigorous than KNOWN/ESTIMATED/UNKNOWN
 * Addresses Black Hat finding: "KNOWN" was used for unverified contractor data
 */
export type EvidenceClassification =
  | "VERIFIED"           // Independently verified from authoritative source (EPA, EIA, DOE)
  | "SOURCE_PROVIDED"    // Provided by vendor/contractor - requires audit verification
  | "USER_PROVIDED"      // Explicitly entered by user - user takes responsibility
  | "ASSUMED"            // Model assumption with rationale - conservative default
  | "CONTINGENT"         // Depends on external factors (grants, programs, approvals)
  | "NOT_APPLICABLE"     // Does not apply in this jurisdiction/scenario
  | "UNVERIFIED";        // Data exists but not yet verified

/**
 * Evidence strength for UI display (replaces numeric confidence)
 * Addresses Black Hat finding: "73% confidence" was false precision
 */
export type EvidenceStrength = "HIGH" | "MEDIUM" | "LOW" | "UNCERTAIN";

/**
 * Jurisdiction scope for parameters
 */
export type JurisdictionScope =
  | "US_ALL"             // Applies to all US states
  | "CA_ONLY"            // California only (e.g., LCFS)
  | "CA_OR_WA"           // California, Oregon, Washington (LCFS states)
  | "STATE_SPECIFIC"     // Varies by state - must be configured
  | "UTILITY_SPECIFIC"   // Varies by utility - must be configured
  | "FEDERAL"            // Federal program (but may be contingent)
  | "GLOBAL";            // Universal (physical constants, etc.)

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// NEW: STRESS TEST / SCENARIO TYPES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * Stress test scenario definitions
 * Addresses Black Hat finding: "No downside scenarios exist"
 */
export type StressTestType =
  | "BASE_CASE"                  // Current assumptions
  | "EPA_FUNDING_FREEZE"         // Federal incentive = $0
  | "ELECTRICITY_RATE_SPIKE"     // +50% electricity rates
  | "OEM_BANKRUPTCY"             // Battery cost variance + downtime
  | "COUNTERPARTY_FAILURE"       // AXIVAI unavailable, district builds infra
  | "COLD_WEATHER_HIGH"          // 35%+ range reduction
  | "DEMAND_CHARGE_SPIKE";       // Demand rates at upper bound

export interface StressTestScenario {
  id: StressTestType;
  name: string;
  description: string;
  modifiers: Partial<StressTestModifiers>;
  probability?: number;  // Estimated probability (0-1) if available
  impactSeverity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
}

export interface StressTestModifiers {
  // Incentive modifiers
  federalIncentiveMultiplier: number;    // 0 = no incentive, 1 = full
  stateIncentiveMultiplier: number;

  // Energy rate modifiers
  electricityRateMultiplier: number;     // 1.5 = 50% increase
  demandChargeMultiplier: number;
  dieselPriceMultiplier: number;

  // Efficiency modifiers
  coldWeatherReductionOverride: number;  // Override weather adjustment

  // Cost modifiers
  batteryReplacementCostMultiplier: number;
  infrastructureCostMultiplier: number;

  // Revenue modifiers
  carbonCreditMultiplier: number;        // 0 = no credits
  v2gRevenueMultiplier: number;

  // AXIVAI-specific
  axivaiAvailable: boolean;              // false = counterparty failure
}

export interface StressTestResult {
  scenario: StressTestScenario;
  baseResult: TCOResult;
  stressedResult: TCOResult;
  impactDelta: number;                   // $ difference from base
  impactPercentage: number;              // % change from base
  warnings: string[];                    // Specific concerns for this scenario
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// NEW: APPLICABILITY WARNINGS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface ApplicabilityWarning {
  id: string;
  category: "REVENUE" | "INCENTIVE" | "COST" | "OPERATIONAL";
  severity: "INFO" | "WARNING" | "CRITICAL";
  title: string;
  message: string;
  affectedParameter: string;
  appliedValue: number;
  reason: string;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// NEW: INFRASTRUCTURE OPTIONS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * Infrastructure ownership model
 * Addresses Black Hat finding: "$0 infrastructure by default"
 */
export type InfrastructureModel =
  | "DISTRICT_OWNED"          // District pays for and owns infrastructure
  | "PARTNER_PROVIDED"        // Third party (AXIVAI, EaaS) provides infrastructure
  | "HYBRID"                  // Split ownership
  | "MOBILE_CHARGING";        // No fixed infrastructure (mobile only)

export interface InfrastructureConfig {
  model: InfrastructureModel;
  districtCost: number;           // What district pays
  partnerCost: number;            // What partner pays (for transparency)
  userConfirmedZeroCost: boolean; // If $0, user must confirm
  contractReference?: string;     // Contract/agreement reference if applicable
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// AXIVAI COST STRUCTURE (Real-World Operations Data)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface AXIVAICostStructure<T = number> {
  powerProcurement: {
    ppaRate: T;           // $0.04/kWh - I-95 Landfill PPA
    solarRate: T;         // $0.03/kWh - Behind-meter solar
    utilityRate: T;       // $0.08/kWh - Utility C&I rate
  };
  transportation: {
    truckEnergyPerKwh: T; // $0.06/kWh - Truck energy (return trip)
    laborPerKwh: T;       // $0.08/kWh - Driver labor
    depreciationPerKwh: T;// $0.03/kWh - Truck depreciation
    maintenancePerKwh: T; // $0.03/kWh - Tires, brakes, servicing
  };
  margins: {
    mothership: T;        // 0.45 (45% gross margin)
    directInjection: T;   // 0.32 (32% gross margin)
    valet: T;             // 0.28 (28% gross margin)
  };
}

export interface RevenueStreams<T = number> {
  carbonCredits: {
    lcfsPerBus: T;        // CA LCFS credits per bus per year
    federalPerBus: T;     // Federal 45Q tax credits per bus per year
  };
  v2g: {
    demandResponsePerBus: T;      // PJM demand response revenue
    frequencyRegulationPerBus: T; // Frequency regulation revenue
    vppRevenuePerBus: T;          // Virtual Power Plant participation
  };
  fleetScaleMultiplier: T; // Revenue bonus for 100+ bus fleets
}

export interface FleetScaleAdjustment {
  costMultiplier: number;     // Discount/premium based on fleet size
  revenueMultiplier: number;  // Revenue scale factor
  breakEvenReached: boolean;  // True if fleet >= 40 buses
  fleetTier: "SMALL" | "MEDIUM" | "LARGE"; // <40, 40-99, 100+
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DIESEL EXTERNAL/SOCIAL COSTS (True Cost of Diesel Operations)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * External costs that are real but often not reflected in fleet budgets.
 * These costs are borne by children, communities, and society.
 */
export interface DieselExternalCosts<T = number> {
  // Health Costs (per bus per year)
  healthCosts: {
    childRespiratoryIllness: T;   // Asthma, bronchitis from bus exhaust exposure
    communityHealthImpact: T;     // PM2.5, NOx effects on surrounding community
    driverOccupationalHealth: T;  // Long-term driver health effects
  };

  // Environmental/Climate Costs (per bus per year)
  climateCosts: {
    co2SocialCost: T;             // Social cost of carbon (EPA/IWG estimates)
    methaneLeakage: T;            // Upstream methane from diesel supply chain
    localAirQuality: T;           // Ground-level ozone, smog contribution
  };

  // Regulatory/Compliance Costs (per bus per year)
  regulatoryCosts: {
    emissionsCompliance: T;       // DEF, DPF maintenance, emissions testing
    futureEmissionsPenalty: T;    // Anticipated tightening regulations
    carbonTaxRisk: T;             // Potential carbon pricing exposure
  };

  // Operational Risks (per bus per year)
  operationalRisks: {
    fuelPriceVolatility: T;       // Hedging cost / price spike risk premium
    supplyChainDisruption: T;     // Fuel availability risk
    reputationalRisk: T;          // Parent/community pressure, brand damage
  };
}

/**
 * Diesel emissions data for calculating external costs
 */
export interface DieselEmissionsProfile {
  co2TonsPerBusPerYear: number;      // ~12-15 tons for school bus
  pm25GramsPerMile: number;          // Particulate matter
  noxGramsPerMile: number;           // Nitrogen oxides
  co2GramsPerGallon: number;         // 10,180 grams CO2 per gallon diesel
}

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

  // AXIVAI-specific (Three-Lane pricing) - Customer-facing rates
  axivaiPricing: {
    directInjectionPerKwh: DataPoint<number>;
    mothershipPerKwh: DataPoint<number>;
    valetPerKwh: DataPoint<number>;
  };

  // AXIVAI Internal Cost Structure (NOT customer pricing)
  axivaiCostStructure: AXIVAICostStructure<DataPoint<number>>;

  // Revenue Streams (carbon credits, V2G, etc.)
  revenueStreams: RevenueStreams<DataPoint<number>>;

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

  // Diesel External/Social Costs (True Cost Analysis)
  dieselExternalCosts: DieselExternalCosts<DataPoint<number>>;

  // Diesel Emissions Profile
  dieselEmissions: DieselEmissionsProfile;
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
  // Revenue streams (reduce net cost)
  carbonCreditRevenue: number;
  v2gRevenue: number;
  totalRevenue: number;
  // External/Social Costs (diesel only)
  externalCosts: {
    healthCost: number;
    climateCost: number;
    regulatoryCost: number;
    operationalRiskCost: number;
    totalExternalCost: number;
  };
  // Costs
  totalCost: number;              // Direct costs only
  totalTrueCost: number;          // Direct + External costs
  netCost: number;                // totalCost - totalRevenue
  trueCost: number;               // totalTrueCost - totalRevenue
  cumulativeCost: number;
  cumulativeNetCost: number;
  cumulativeTrueCost: number;
  npvCost: number;
  npvNetCost: number;
  npvTrueCost: number;
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
  totalNetTCO: number;        // After revenue offsets
  totalTrueCost: number;      // Including external/social costs (RENAMED: "Societal Impact View")
  npv: number;
  npvNet: number;             // NPV after revenue offsets
  npvTrueCost: number;        // NPV including external costs
  averageAnnualCost: number;
  averageAnnualNetCost: number;
  averageAnnualTrueCost: number;
  costPerMile: number;
  netCostPerMile: number;
  trueCostPerMile: number;

  // Revenue totals
  totalCarbonRevenue: number;
  totalV2GRevenue: number;
  totalRevenue: number;

  // External/Social Cost totals (diesel only - now in separate "Societal Impact View")
  externalCosts: {
    totalHealthCost: number;
    totalClimateCost: number;
    totalRegulatoryCost: number;
    totalOperationalRiskCost: number;
    grandTotalExternalCost: number;
  };

  // Fleet scale analysis
  fleetScale: FleetScaleAdjustment;

  // Comparison metrics (vs diesel baseline)
  savingsVsDiesel?: number;
  paybackYears?: number;
  irr?: number;

  // Detailed breakdown
  annualCosts: AnnualCosts[];
  costBreakdown: CostBreakdown[];

  // Assumptions used (for transparency)
  assumptions: TCOAssumptions;

  // NEW: Applicability warnings for this calculation
  applicabilityWarnings: ApplicabilityWarning[];

  // NEW: Evidence strength (replaces numeric confidence)
  evidenceStrength: EvidenceStrength;
  evidenceFactors: {
    factor: string;
    classification: EvidenceClassification;
    impact: "HIGH" | "MEDIUM" | "LOW";
    note?: string;
  }[];

  // DEPRECATED: Use evidenceStrength/evidenceFactors instead
  overallConfidence: number; // 0-1 - kept for backward compatibility
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
