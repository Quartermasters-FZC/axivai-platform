/**
 * AXIVAI TCO Calculator Module
 * © 2025-2050 Aliff Capital, LLC. All Rights Reserved.
 *
 * REMEDIATED VERSION - Black Hat Review Fixes Applied
 * - New Evidence Classification System
 * - Jurisdiction-aware revenue gating
 * - Applicability warnings
 * - Input validation
 */

export { calculateTCO, compareScenarios } from "./calculator";
export {
  DEFAULT_ASSUMPTIONS,
  DEFAULT_PARAMETERS,
  getLocationDefaults,
  getFleetScaleAdjustment,
  STATE_ELECTRICITY_RATES,
  STATE_DIESEL_PRICES,
  COLD_WEATHER_STATES,
} from "./defaults";
export {
  // Evidence Registry
  VEHICLE_PRICING_REGISTRY,
  ENERGY_PRICING_REGISTRY,
  AXIVAI_COST_REGISTRY,
  INCENTIVES_REGISTRY,
  REVENUE_REGISTRY,
  WEATHER_REGISTRY,
  EXTERNAL_COSTS_REGISTRY,
  // Helper functions
  isRevenueApplicable,
  validateRegistryValue,
  exportRegistryForAudit,
} from "./evidence-registry";
export {
  // Stress Test Engine
  STRESS_TEST_SCENARIOS,
  runStressTest,
  runAllStressTests,
  // Sensitivity Analysis
  DEFAULT_SENSITIVITY_VARIABLES,
  runSensitivityAnalysis,
  // Break-even Analysis
  findBreakEvenPoint,
  findAllBreakEvenPoints,
  // Monte Carlo
  runMonteCarloSimulation,
} from "./scenario-engine";
