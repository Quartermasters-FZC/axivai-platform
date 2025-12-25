/**
 * AXIVAI TCO Scenario & Sensitivity Engine
 * © 2025-2050 Aliff Capital, LLC. All Rights Reserved.
 *
 * Implements stress tests and sensitivity analysis
 * Addresses Black Hat findings: "No downside scenarios exist"
 *
 * Scenarios implemented:
 * S1: EPA_FUNDING_FREEZE - Federal incentive = $0
 * S2: ELECTRICITY_RATE_SPIKE - +50% electricity rates
 * S3: OEM_BANKRUPTCY - Battery cost variance + downtime
 * S4: COUNTERPARTY_FAILURE - AXIVAI unavailable, district builds infra
 * S5: COLD_WEATHER_HIGH - 35% range reduction
 * S6: DEMAND_CHARGE_SPIKE - Demand rates at upper bound
 */

import type {
  TCOInput,
  TCOAssumptions,
  StressTestType,
  StressTestScenario,
  StressTestModifiers,
  StressTestResult,
  SensitivityVariable,
  SensitivityResult,
  SensitivityAnalysis,
} from "@/types/tco";
import { calculateTCO } from "./calculator";
import { DEFAULT_ASSUMPTIONS } from "./defaults";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// STRESS TEST SCENARIO DEFINITIONS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * Pre-defined stress test scenarios
 * Each scenario modifies specific assumptions to test resilience
 */
export const STRESS_TEST_SCENARIOS: Record<StressTestType, StressTestScenario> = {
  BASE_CASE: {
    id: "BASE_CASE",
    name: "Base Case",
    description: "Current assumptions without modifications",
    modifiers: {},
    impactSeverity: "LOW",
  },

  EPA_FUNDING_FREEZE: {
    id: "EPA_FUNDING_FREEZE",
    name: "EPA Funding Freeze",
    description: "What if federal EPA Clean School Bus incentives are frozen or eliminated? Congressional appropriation is never guaranteed.",
    modifiers: {
      federalIncentiveMultiplier: 0,
      stateIncentiveMultiplier: 0.5, // States may also reduce in sympathy
    },
    probability: 0.15, // 15% chance over 12-year horizon
    impactSeverity: "CRITICAL",
  },

  ELECTRICITY_RATE_SPIKE: {
    id: "ELECTRICITY_RATE_SPIKE",
    name: "Electricity Rate Spike",
    description: "What if electricity rates increase 50%? Grid stress, renewable mandates, or infrastructure costs could drive this.",
    modifiers: {
      electricityRateMultiplier: 1.5,
      demandChargeMultiplier: 1.5,
    },
    probability: 0.20, // 20% chance of significant rate increases
    impactSeverity: "HIGH",
  },

  OEM_BANKRUPTCY: {
    id: "OEM_BANKRUPTCY",
    name: "OEM/Supplier Failure",
    description: "What if the electric bus OEM goes bankrupt? Battery replacements become harder, parts scarce, service unavailable.",
    modifiers: {
      batteryReplacementCostMultiplier: 2.0, // Double replacement cost
      // Also implied: longer downtime, harder to get parts
    },
    probability: 0.10, // 10% chance of major OEM issues
    impactSeverity: "HIGH",
  },

  COUNTERPARTY_FAILURE: {
    id: "COUNTERPARTY_FAILURE",
    name: "AXIVAI Counterparty Failure",
    description: "What if AXIVAI becomes unavailable mid-contract? District must build own infrastructure and find alternative charging.",
    modifiers: {
      axivaiAvailable: false,
      infrastructureCostMultiplier: 1.0, // Full infrastructure cost
    },
    probability: 0.08, // 8% counterparty risk
    impactSeverity: "HIGH",
  },

  COLD_WEATHER_HIGH: {
    id: "COLD_WEATHER_HIGH",
    name: "Extreme Cold Weather",
    description: "What if battery range reduction is at the high end (35%+)? Polar vortex events, aging batteries, aggressive routes.",
    modifiers: {
      coldWeatherReductionOverride: 0.38, // 38% range reduction (high band)
    },
    probability: 0.25, // Common in northern states
    impactSeverity: "MEDIUM",
  },

  DEMAND_CHARGE_SPIKE: {
    id: "DEMAND_CHARGE_SPIKE",
    name: "Demand Charge Spike",
    description: "What if utility demand charges increase to $25-30/kW? Grid stress pricing, time-of-use peaks.",
    modifiers: {
      demandChargeMultiplier: 2.0, // Double demand charges
    },
    probability: 0.15, // Possible in constrained grids
    impactSeverity: "MEDIUM",
  },
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// STRESS TEST ENGINE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * Apply stress test modifiers to assumptions
 */
function applyStressModifiers(
  baseAssumptions: TCOAssumptions,
  modifiers: Partial<StressTestModifiers>
): Partial<TCOAssumptions> {
  const overrides: Partial<TCOAssumptions> = {};

  if (modifiers.federalIncentiveMultiplier !== undefined) {
    overrides.federalIncentivePerBus = {
      ...baseAssumptions.federalIncentivePerBus,
      value: baseAssumptions.federalIncentivePerBus.value * modifiers.federalIncentiveMultiplier,
      confidence: "UNKNOWN" as const, // Stress scenario = uncertain
    };
  }

  if (modifiers.stateIncentiveMultiplier !== undefined) {
    overrides.stateIncentivePerBus = {
      ...baseAssumptions.stateIncentivePerBus,
      value: baseAssumptions.stateIncentivePerBus.value * modifiers.stateIncentiveMultiplier,
      confidence: "UNKNOWN" as const,
    };
  }

  if (modifiers.electricityRateMultiplier !== undefined) {
    overrides.electricityRateKwh = {
      ...baseAssumptions.electricityRateKwh,
      value: baseAssumptions.electricityRateKwh.value * modifiers.electricityRateMultiplier,
      confidence: "UNKNOWN" as const,
    };
  }

  if (modifiers.demandChargeMultiplier !== undefined) {
    overrides.demandChargeKw = {
      ...baseAssumptions.demandChargeKw,
      value: baseAssumptions.demandChargeKw.value * modifiers.demandChargeMultiplier,
      confidence: "UNKNOWN" as const,
    };
  }

  if (modifiers.batteryReplacementCostMultiplier !== undefined) {
    overrides.batteryReplacementCost = {
      ...baseAssumptions.batteryReplacementCost,
      value: baseAssumptions.batteryReplacementCost.value * modifiers.batteryReplacementCostMultiplier,
      confidence: "UNKNOWN" as const,
    };
  }

  if (modifiers.coldWeatherReductionOverride !== undefined) {
    overrides.coldWeatherRangeReduction = {
      ...baseAssumptions.coldWeatherRangeReduction,
      value: modifiers.coldWeatherReductionOverride,
      confidence: "UNKNOWN" as const,
    };
  }

  return overrides;
}

/**
 * Run a single stress test scenario
 */
export function runStressTest(
  input: Omit<TCOInput, "overrides">,
  scenarioType: StressTestType
): StressTestResult {
  const scenario = STRESS_TEST_SCENARIOS[scenarioType];
  if (!scenario) {
    throw new Error(`Unknown stress test scenario: ${scenarioType}`);
  }

  // Calculate base case
  const baseResult = calculateTCO({ ...input, overrides: undefined });

  // If BASE_CASE, just return the base result
  if (scenarioType === "BASE_CASE") {
    return {
      scenario,
      baseResult,
      stressedResult: baseResult,
      impactDelta: 0,
      impactPercentage: 0,
      warnings: [],
    };
  }

  // Apply stress modifiers
  const stressOverrides = applyStressModifiers(
    baseResult.assumptions,
    scenario.modifiers
  );

  // Handle COUNTERPARTY_FAILURE special case
  let stressedInput = { ...input, overrides: stressOverrides };
  if (scenarioType === "COUNTERPARTY_FAILURE" && input.scenarioType === "AXIVAI") {
    // Switch to SELF_MANAGED_EV if AXIVAI fails
    stressedInput = {
      ...stressedInput,
      scenarioType: "SELF_MANAGED_EV",
    };
  }

  // Calculate stressed result
  const stressedResult = calculateTCO(stressedInput);

  // Calculate impact
  const impactDelta = stressedResult.totalNetTCO - baseResult.totalNetTCO;
  const impactPercentage = (impactDelta / baseResult.totalNetTCO) * 100;

  // Generate warnings
  const warnings: string[] = [];
  if (impactPercentage > 20) {
    warnings.push(`This scenario increases TCO by ${impactPercentage.toFixed(1)}% - significant budget risk.`);
  }
  if (stressedResult.totalNetTCO > stressedResult.assumptions.busPrices.typeC.diesel.value *
      (input.fleet.typeACount + input.fleet.typeCCount + input.fleet.typeDCount) * 1.5) {
    warnings.push("EV may not be economical under this stress scenario.");
  }

  return {
    scenario,
    baseResult,
    stressedResult,
    impactDelta,
    impactPercentage,
    warnings,
  };
}

/**
 * Run all stress tests and return comprehensive results
 */
export function runAllStressTests(
  input: Omit<TCOInput, "overrides">
): {
  results: StressTestResult[];
  worstCase: StressTestResult;
  expectedValue: number; // Probability-weighted TCO
  riskAssessment: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
} {
  const results: StressTestResult[] = [];

  // Run each stress test
  for (const scenarioType of Object.keys(STRESS_TEST_SCENARIOS) as StressTestType[]) {
    if (scenarioType === "BASE_CASE") continue; // Skip base case in iteration
    results.push(runStressTest(input, scenarioType));
  }

  // Find worst case
  const worstCase = results.reduce((worst, current) =>
    current.impactDelta > worst.impactDelta ? current : worst
  );

  // Calculate probability-weighted expected value
  const baseResult = calculateTCO({ ...input, overrides: undefined });
  let expectedValue = baseResult.totalNetTCO * 0.5; // Base case probability
  for (const result of results) {
    const probability = result.scenario.probability ?? 0.1;
    expectedValue += result.stressedResult.totalNetTCO * probability;
  }

  // Assess overall risk
  const maxImpactPct = worstCase.impactPercentage;
  let riskAssessment: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  if (maxImpactPct < 10) {
    riskAssessment = "LOW";
  } else if (maxImpactPct < 25) {
    riskAssessment = "MEDIUM";
  } else if (maxImpactPct < 50) {
    riskAssessment = "HIGH";
  } else {
    riskAssessment = "CRITICAL";
  }

  return {
    results,
    worstCase,
    expectedValue,
    riskAssessment,
  };
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SENSITIVITY ANALYSIS ENGINE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * Default sensitivity variables to analyze
 */
export const DEFAULT_SENSITIVITY_VARIABLES: SensitivityVariable[] = [
  {
    name: "electricityRateKwh",
    baseValue: 0.12,
    minValue: 0.08,
    maxValue: 0.25,
    step: 0.02,
    unit: "$/kWh",
  },
  {
    name: "dieselPricePerGallon",
    baseValue: 3.50,
    minValue: 2.50,
    maxValue: 6.00,
    step: 0.50,
    unit: "$/gal",
  },
  {
    name: "federalIncentivePerBus",
    baseValue: 250000,
    minValue: 0,
    maxValue: 375000,
    step: 50000,
    unit: "$",
  },
  {
    name: "demandChargeKw",
    baseValue: 15,
    minValue: 5,
    maxValue: 30,
    step: 5,
    unit: "$/kW",
  },
  {
    name: "batteryReplacementCost",
    baseValue: 50000,
    minValue: 25000,
    maxValue: 100000,
    step: 12500,
    unit: "$",
  },
];

/**
 * Run sensitivity analysis on a single variable
 */
function runVariableSensitivity(
  input: TCOInput,
  variable: SensitivityVariable
): SensitivityResult {
  const values: number[] = [];
  const tcoResults: number[] = [];
  const npvResults: number[] = [];

  // Generate values to test
  for (let v = variable.minValue; v <= variable.maxValue; v += variable.step) {
    values.push(v);
  }

  // Calculate TCO for each value
  for (const value of values) {
    const overrides = createOverrideForVariable(
      variable.name,
      value,
      DEFAULT_ASSUMPTIONS
    );
    const result = calculateTCO({ ...input, overrides });
    tcoResults.push(result.totalNetTCO);
    npvResults.push(result.npvNet);
  }

  // Calculate elasticity (% change in TCO per % change in variable)
  const baseIndex = values.findIndex(v =>
    Math.abs(v - variable.baseValue) < variable.step / 2
  );
  const baseValue = variable.baseValue;
  const baseTCO = tcoResults[baseIndex] || tcoResults[Math.floor(values.length / 2)];

  // Use endpoints to calculate elasticity
  const lowTCO = tcoResults[0];
  const highTCO = tcoResults[tcoResults.length - 1];
  const lowVar = values[0];
  const highVar = values[values.length - 1];

  const pctChangeVar = (highVar - lowVar) / baseValue;
  const pctChangeTCO = (highTCO - lowTCO) / baseTCO;
  const elasticity = pctChangeTCO / pctChangeVar;

  return {
    variable: variable.name,
    values,
    tcoResults,
    npvResults,
    elasticity,
  };
}

/**
 * Create assumption override for a specific variable
 */
function createOverrideForVariable(
  variableName: string,
  value: number,
  baseAssumptions: TCOAssumptions
): Partial<TCOAssumptions> {
  const override: Partial<TCOAssumptions> = {};

  switch (variableName) {
    case "electricityRateKwh":
      override.electricityRateKwh = {
        ...baseAssumptions.electricityRateKwh,
        value,
      };
      break;
    case "dieselPricePerGallon":
      override.dieselPricePerGallon = {
        ...baseAssumptions.dieselPricePerGallon,
        value,
      };
      break;
    case "federalIncentivePerBus":
      override.federalIncentivePerBus = {
        ...baseAssumptions.federalIncentivePerBus,
        value,
      };
      break;
    case "demandChargeKw":
      override.demandChargeKw = {
        ...baseAssumptions.demandChargeKw,
        value,
      };
      break;
    case "batteryReplacementCost":
      override.batteryReplacementCost = {
        ...baseAssumptions.batteryReplacementCost,
        value,
      };
      break;
    default:
      console.warn(`Unknown sensitivity variable: ${variableName}`);
  }

  return override;
}

/**
 * Run full sensitivity analysis
 */
export function runSensitivityAnalysis(
  input: TCOInput,
  variables: SensitivityVariable[] = DEFAULT_SENSITIVITY_VARIABLES
): SensitivityAnalysis {
  // Calculate base case
  const baseCase = calculateTCO(input);

  // Run sensitivity for each variable
  const results: SensitivityResult[] = variables.map(v =>
    runVariableSensitivity(input, v)
  );

  // Build tornado chart data
  const tornadoChart = results.map(result => {
    const lowImpact = result.tcoResults[0] - baseCase.totalNetTCO;
    const highImpact = result.tcoResults[result.tcoResults.length - 1] - baseCase.totalNetTCO;
    return {
      variable: result.variable,
      lowImpact,
      highImpact,
    };
  }).sort((a, b) =>
    // Sort by range (most impactful first)
    Math.abs(b.highImpact - b.lowImpact) - Math.abs(a.highImpact - a.lowImpact)
  );

  return {
    baseCase,
    variables,
    results,
    tornadoChart,
  };
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// BREAK-EVEN ANALYSIS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * Find break-even point for a variable
 * Returns the value at which EV TCO equals diesel TCO
 */
export function findBreakEvenPoint(
  input: Omit<TCOInput, "scenarioType">,
  variableName: string,
  searchRange: { min: number; max: number; step: number }
): {
  found: boolean;
  breakEvenValue: number | null;
  sensitivity: "LOW" | "MEDIUM" | "HIGH";
  details: string;
} {
  // Get diesel baseline
  const dieselResult = calculateTCO({
    ...input,
    scenarioType: "DIESEL_BASELINE",
    overrides: undefined
  });
  const dieselTCO = dieselResult.totalNetTCO;

  let lastDiff = Infinity;
  let breakEvenValue: number | null = null;

  for (let value = searchRange.min; value <= searchRange.max; value += searchRange.step) {
    const overrides = createOverrideForVariable(
      variableName,
      value,
      DEFAULT_ASSUMPTIONS
    );

    // Test against AXIVAI scenario
    const evResult = calculateTCO({
      ...input,
      scenarioType: "AXIVAI",
      overrides,
    });

    const diff = evResult.totalNetTCO - dieselTCO;

    // Check if we crossed break-even
    if (Math.sign(diff) !== Math.sign(lastDiff) && lastDiff !== Infinity) {
      breakEvenValue = value - searchRange.step / 2;
      break;
    }

    lastDiff = diff;
  }

  // Determine sensitivity
  const found = breakEvenValue !== null;
  let sensitivity: "LOW" | "MEDIUM" | "HIGH" = "MEDIUM";

  if (found) {
    const rangePosition = (breakEvenValue! - searchRange.min) / (searchRange.max - searchRange.min);
    if (rangePosition < 0.3) {
      sensitivity = "HIGH"; // Breaks even early in range = highly sensitive
    } else if (rangePosition > 0.7) {
      sensitivity = "LOW"; // Breaks even late in range = less sensitive
    }
  }

  return {
    found,
    breakEvenValue,
    sensitivity,
    details: found
      ? `EV and diesel break even when ${variableName} = ${breakEvenValue?.toFixed(2)}`
      : `No break-even found in range [${searchRange.min}, ${searchRange.max}]`,
  };
}

/**
 * Find multiple break-even points for common variables
 */
export function findAllBreakEvenPoints(
  input: Omit<TCOInput, "scenarioType">
): {
  electricityRate: ReturnType<typeof findBreakEvenPoint>;
  dieselPrice: ReturnType<typeof findBreakEvenPoint>;
  federalIncentive: ReturnType<typeof findBreakEvenPoint>;
} {
  return {
    electricityRate: findBreakEvenPoint(input, "electricityRateKwh", {
      min: 0.05,
      max: 0.40,
      step: 0.01,
    }),
    dieselPrice: findBreakEvenPoint(input, "dieselPricePerGallon", {
      min: 2.00,
      max: 8.00,
      step: 0.10,
    }),
    federalIncentive: findBreakEvenPoint(input, "federalIncentivePerBus", {
      min: 0,
      max: 400000,
      step: 10000,
    }),
  };
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MONTE CARLO SIMULATION (ADVANCED)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * Distribution types for Monte Carlo simulation
 */
export type DistributionType = "normal" | "uniform" | "triangular";

export interface MonteCarloVariable {
  name: string;
  distribution: DistributionType;
  params: {
    mean?: number;
    stdDev?: number;
    min?: number;
    max?: number;
    mode?: number;
  };
}

/**
 * Simple random number generators
 */
function normalRandom(mean: number, stdDev: number): number {
  // Box-Muller transform
  const u1 = Math.random();
  const u2 = Math.random();
  const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  return mean + z * stdDev;
}

function uniformRandom(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

function triangularRandom(min: number, max: number, mode: number): number {
  const u = Math.random();
  const f = (mode - min) / (max - min);
  if (u < f) {
    return min + Math.sqrt(u * (max - min) * (mode - min));
  }
  return max - Math.sqrt((1 - u) * (max - min) * (max - mode));
}

/**
 * Run Monte Carlo simulation
 */
export function runMonteCarloSimulation(
  input: TCOInput,
  variables: MonteCarloVariable[],
  iterations: number = 1000
): {
  results: number[];
  mean: number;
  stdDev: number;
  percentiles: { p5: number; p25: number; p50: number; p75: number; p95: number };
  confidenceInterval: { lower: number; upper: number };
} {
  const results: number[] = [];

  for (let i = 0; i < iterations; i++) {
    // Sample each variable
    const overrides: Partial<TCOAssumptions> = {};

    for (const variable of variables) {
      let sampledValue: number;

      switch (variable.distribution) {
        case "normal":
          sampledValue = normalRandom(
            variable.params.mean!,
            variable.params.stdDev!
          );
          break;
        case "uniform":
          sampledValue = uniformRandom(
            variable.params.min!,
            variable.params.max!
          );
          break;
        case "triangular":
          sampledValue = triangularRandom(
            variable.params.min!,
            variable.params.max!,
            variable.params.mode!
          );
          break;
      }

      Object.assign(
        overrides,
        createOverrideForVariable(variable.name, sampledValue, DEFAULT_ASSUMPTIONS)
      );
    }

    // Calculate TCO with sampled values
    const result = calculateTCO({ ...input, overrides });
    results.push(result.totalNetTCO);
  }

  // Sort for percentile calculations
  results.sort((a, b) => a - b);

  // Calculate statistics
  const mean = results.reduce((a, b) => a + b, 0) / results.length;
  const variance = results.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / results.length;
  const stdDev = Math.sqrt(variance);

  const getPercentile = (p: number) => results[Math.floor(results.length * p)];

  return {
    results,
    mean,
    stdDev,
    percentiles: {
      p5: getPercentile(0.05),
      p25: getPercentile(0.25),
      p50: getPercentile(0.50),
      p75: getPercentile(0.75),
      p95: getPercentile(0.95),
    },
    confidenceInterval: {
      lower: getPercentile(0.025),
      upper: getPercentile(0.975),
    },
  };
}
