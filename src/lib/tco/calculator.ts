/**
 * AXIVAI TCO Calculator Engine
 * © 2025-2050 Aliff Capital, LLC. All Rights Reserved.
 *
 * Planning-grade TCO calculator with full transparency.
 * Implements formulas from AXIVAI Whitepaper Section 5.3
 */

import type {
  TCOInput,
  TCOResult,
  TCOAssumptions,
  AnnualCosts,
  CostBreakdown,
  DataConfidence,
  ScenarioType,
  BusType,
} from "@/types/tco";
import {
  DEFAULT_ASSUMPTIONS,
  DEFAULT_PARAMETERS,
  getLocationDefaults,
} from "./defaults";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MAIN CALCULATOR
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function calculateTCO(input: TCOInput): TCOResult {
  // Merge defaults with location-specific values and user overrides
  const assumptions = mergeAssumptions(input);
  const params = { ...DEFAULT_PARAMETERS, ...input.parameters };

  // Calculate fleet metrics
  const totalBuses = input.fleet.typeACount + input.fleet.typeCCount + input.fleet.typeDCount;
  const annualMilesPerBus = input.fleet.avgDailyMiles * input.fleet.operatingDaysPerYear;
  const totalAnnualMiles = annualMilesPerBus * totalBuses;

  // Calculate costs based on scenario
  const annualCosts: AnnualCosts[] = [];
  let cumulativeCost = 0;
  let cumulativeNpv = 0;

  for (let year = 0; year <= params.planningHorizonYears; year++) {
    const yearCosts = calculateYearCosts(
      year,
      input,
      assumptions,
      params,
      totalBuses,
      annualMilesPerBus
    );

    cumulativeCost += yearCosts.totalCost;
    const npvFactor = Math.pow(1 + params.discountRate, -year);
    const npvCost = yearCosts.totalCost * npvFactor;
    cumulativeNpv += npvCost;

    annualCosts.push({
      ...yearCosts,
      cumulativeCost,
      npvCost,
    });
  }

  // Calculate summary metrics
  const totalTCO = cumulativeCost;
  const npv = cumulativeNpv;
  const averageAnnualCost = totalTCO / params.planningHorizonYears;
  const costPerMile = totalTCO / (totalAnnualMiles * params.planningHorizonYears);

  // Build cost breakdown
  const costBreakdown = buildCostBreakdown(annualCosts, assumptions);

  // Calculate confidence score
  const { overallConfidence, confidenceFactors } = calculateConfidence(assumptions);

  return {
    totalTCO,
    npv,
    averageAnnualCost,
    costPerMile,
    annualCosts,
    costBreakdown,
    assumptions,
    overallConfidence,
    confidenceFactors,
    calculatedAt: new Date().toISOString(),
    scenarioType: input.scenarioType,
  };
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// YEAR-BY-YEAR CALCULATIONS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function calculateYearCosts(
  year: number,
  input: TCOInput,
  assumptions: TCOAssumptions,
  params: typeof DEFAULT_PARAMETERS,
  totalBuses: number,
  annualMilesPerBus: number
): Omit<AnnualCosts, "cumulativeCost" | "npvCost"> {
  const isElectric = input.scenarioType !== "DIESEL_BASELINE";
  const isAXIVAI = input.scenarioType === "AXIVAI";

  // Year 0 = Capital costs, subsequent years = operating costs
  let capitalCost = 0;
  let energyCost = 0;
  let maintenanceCost = 0;
  let infrastructureCost = 0;
  let insuranceCost = 0;
  let incentivesApplied = 0;

  if (year === 0) {
    // Capital costs (Year 0)
    capitalCost = calculateCapitalCosts(input, assumptions, isElectric);
    infrastructureCost = isElectric && !isAXIVAI
      ? calculateInfrastructureCosts(totalBuses, assumptions)
      : 0;
    incentivesApplied = isElectric
      ? calculateIncentives(totalBuses, assumptions)
      : 0;
  } else {
    // Operating costs (Years 1+)
    const inflationMultiplier = Math.pow(1 + params.inflationRate, year);

    // Energy costs
    if (isElectric) {
      energyCost = calculateElectricEnergyCost(
        input,
        assumptions,
        params,
        year,
        totalBuses,
        annualMilesPerBus,
        isAXIVAI
      );
    } else {
      energyCost = calculateDieselEnergyCost(
        input,
        assumptions,
        params,
        year,
        totalBuses,
        annualMilesPerBus
      );
    }

    // Maintenance costs
    const maintenanceRate = isElectric
      ? assumptions.maintenanceCostPerMile.electric.value
      : assumptions.maintenanceCostPerMile.diesel.value;
    maintenanceCost = maintenanceRate * annualMilesPerBus * totalBuses * inflationMultiplier;

    // Insurance (estimated at 2% of vehicle value)
    const avgBusPrice = isElectric
      ? weightedAverageBusPrice(input, assumptions, true)
      : weightedAverageBusPrice(input, assumptions, false);
    insuranceCost = avgBusPrice * totalBuses * 0.02 * inflationMultiplier;

    // Battery replacement (for EVs in specified year)
    if (isElectric && year === assumptions.batteryReplacementYear.value) {
      capitalCost = assumptions.batteryReplacementCost.value * totalBuses;
    }
  }

  const totalCost = capitalCost + energyCost + maintenanceCost +
    infrastructureCost + insuranceCost - incentivesApplied;

  return {
    year,
    capitalCost,
    energyCost,
    maintenanceCost,
    infrastructureCost,
    insuranceCost,
    incentivesApplied,
    totalCost,
  };
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// COST COMPONENT CALCULATIONS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function calculateCapitalCosts(
  input: TCOInput,
  assumptions: TCOAssumptions,
  isElectric: boolean
): number {
  const { fleet } = input;
  const prices = assumptions.busPrices;

  if (isElectric) {
    return (
      fleet.typeACount * prices.typeA.electric.value +
      fleet.typeCCount * prices.typeC.electric.value +
      fleet.typeDCount * prices.typeD.electric.value
    );
  } else {
    return (
      fleet.typeACount * prices.typeA.diesel.value +
      fleet.typeCCount * prices.typeC.diesel.value +
      fleet.typeDCount * prices.typeD.diesel.value
    );
  }
}

function calculateInfrastructureCosts(
  totalBuses: number,
  assumptions: TCOAssumptions
): number {
  // Assume 1 charger per 2 buses (shared charging)
  const numChargers = Math.ceil(totalBuses / 2);

  // Mix of L2 and DCFC (80% L2, 20% DCFC)
  const l2Chargers = Math.floor(numChargers * 0.8);
  const dcfcChargers = numChargers - l2Chargers;

  const chargerCost =
    l2Chargers * assumptions.chargerCostLevel2.value +
    dcfcChargers * assumptions.chargerCostDcfc.value;

  const installationCost = numChargers * assumptions.installationCostPerCharger.value;

  return chargerCost + installationCost;
}

function calculateIncentives(
  totalBuses: number,
  assumptions: TCOAssumptions
): number {
  const federalIncentive = assumptions.federalIncentivePerBus.value * totalBuses;
  const stateIncentive = assumptions.stateIncentivePerBus.value * totalBuses;
  return federalIncentive + stateIncentive;
}

function calculateElectricEnergyCost(
  input: TCOInput,
  assumptions: TCOAssumptions,
  params: typeof DEFAULT_PARAMETERS,
  year: number,
  totalBuses: number,
  annualMilesPerBus: number,
  isAXIVAI: boolean
): number {
  const escalationMultiplier = Math.pow(1 + params.electricityEscalationRate, year);

  // Calculate energy consumption
  const avgKwhPerMile = weightedAverageEfficiency(input, assumptions);
  const weatherAdjustment = 1 + assumptions.coldWeatherRangeReduction.value;
  const totalKwh = annualMilesPerBus * totalBuses * avgKwhPerMile * weatherAdjustment;

  if (isAXIVAI) {
    // AXIVAI Three-Lane pricing
    const parkOutPercent = input.fleet.parkOutPercentage / 100;
    const depotPercent = 1 - parkOutPercent;

    // Assume 70% Mothership (depot), 30% split between Direct Injection and Valet
    const mothershipKwh = totalKwh * depotPercent * 0.7;
    const directInjectionKwh = totalKwh * depotPercent * 0.3;
    const valetKwh = totalKwh * parkOutPercent;

    const pricing = assumptions.axivaiPricing;
    return (
      mothershipKwh * pricing.mothershipPerKwh.value +
      directInjectionKwh * pricing.directInjectionPerKwh.value +
      valetKwh * pricing.valetPerKwh.value
    ) * escalationMultiplier;
  } else {
    // Self-managed or EaaS - grid electricity + demand charges
    const energyCost = totalKwh * assumptions.electricityRateKwh.value;

    // Demand charge: assume peak demand = 30% of buses charging simultaneously at 19.2kW
    const peakDemandKw = totalBuses * 0.3 * 19.2;
    const demandCost = peakDemandKw * assumptions.demandChargeKw.value * 12; // 12 months

    return (energyCost + demandCost) * escalationMultiplier;
  }
}

function calculateDieselEnergyCost(
  input: TCOInput,
  assumptions: TCOAssumptions,
  params: typeof DEFAULT_PARAMETERS,
  year: number,
  totalBuses: number,
  annualMilesPerBus: number
): number {
  const escalationMultiplier = Math.pow(1 + params.dieselEscalationRate, year);
  const avgMpg = weightedAverageMpg(input, assumptions);
  const gallonsNeeded = (annualMilesPerBus * totalBuses) / avgMpg;
  return gallonsNeeded * assumptions.dieselPricePerGallon.value * escalationMultiplier;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// HELPER FUNCTIONS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function mergeAssumptions(input: TCOInput): TCOAssumptions {
  const locationDefaults = getLocationDefaults(input.location.state);
  return {
    ...DEFAULT_ASSUMPTIONS,
    ...locationDefaults,
    ...input.overrides,
  } as TCOAssumptions;
}

function weightedAverageBusPrice(
  input: TCOInput,
  assumptions: TCOAssumptions,
  isElectric: boolean
): number {
  const { fleet } = input;
  const total = fleet.typeACount + fleet.typeCCount + fleet.typeDCount;
  if (total === 0) return 0;

  const prices = assumptions.busPrices;
  const priceKey = isElectric ? "electric" : "diesel";

  return (
    (fleet.typeACount * prices.typeA[priceKey].value +
      fleet.typeCCount * prices.typeC[priceKey].value +
      fleet.typeDCount * prices.typeD[priceKey].value) /
    total
  );
}

function weightedAverageEfficiency(
  input: TCOInput,
  assumptions: TCOAssumptions
): number {
  const { fleet } = input;
  const total = fleet.typeACount + fleet.typeCCount + fleet.typeDCount;
  if (total === 0) return assumptions.evKwhPerMile.typeC.value;

  const eff = assumptions.evKwhPerMile;
  return (
    (fleet.typeACount * eff.typeA.value +
      fleet.typeCCount * eff.typeC.value +
      fleet.typeDCount * eff.typeD.value) /
    total
  );
}

function weightedAverageMpg(
  input: TCOInput,
  assumptions: TCOAssumptions
): number {
  const { fleet } = input;
  const total = fleet.typeACount + fleet.typeCCount + fleet.typeDCount;
  if (total === 0) return assumptions.dieselMpg.typeC.value;

  const mpg = assumptions.dieselMpg;
  return (
    (fleet.typeACount * mpg.typeA.value +
      fleet.typeCCount * mpg.typeC.value +
      fleet.typeDCount * mpg.typeD.value) /
    total
  );
}

function buildCostBreakdown(
  annualCosts: AnnualCosts[],
  assumptions: TCOAssumptions
): CostBreakdown[] {
  const totals = annualCosts.reduce(
    (acc, year) => ({
      capital: acc.capital + year.capitalCost,
      energy: acc.energy + year.energyCost,
      maintenance: acc.maintenance + year.maintenanceCost,
      infrastructure: acc.infrastructure + year.infrastructureCost,
      insurance: acc.insurance + year.insuranceCost,
      incentives: acc.incentives + year.incentivesApplied,
    }),
    { capital: 0, energy: 0, maintenance: 0, infrastructure: 0, insurance: 0, incentives: 0 }
  );

  const grandTotal =
    totals.capital +
    totals.energy +
    totals.maintenance +
    totals.infrastructure +
    totals.insurance -
    totals.incentives;

  return [
    {
      category: "Capital (Vehicles)",
      amount: totals.capital,
      percentage: (totals.capital / grandTotal) * 100,
      confidence: "ESTIMATED",
    },
    {
      category: "Energy",
      amount: totals.energy,
      percentage: (totals.energy / grandTotal) * 100,
      confidence: assumptions.electricityRateKwh.confidence,
    },
    {
      category: "Maintenance",
      amount: totals.maintenance,
      percentage: (totals.maintenance / grandTotal) * 100,
      confidence: assumptions.maintenanceCostPerMile.electric.confidence,
    },
    {
      category: "Infrastructure",
      amount: totals.infrastructure,
      percentage: (totals.infrastructure / grandTotal) * 100,
      confidence: "ESTIMATED",
    },
    {
      category: "Insurance",
      amount: totals.insurance,
      percentage: (totals.insurance / grandTotal) * 100,
      confidence: "ESTIMATED",
    },
    {
      category: "Incentives (Credit)",
      amount: -totals.incentives,
      percentage: (-totals.incentives / grandTotal) * 100,
      confidence: assumptions.federalIncentivePerBus.confidence,
    },
  ];
}

function calculateConfidence(
  assumptions: TCOAssumptions
): {
  overallConfidence: number;
  confidenceFactors: { factor: string; confidence: DataConfidence; impact: "HIGH" | "MEDIUM" | "LOW" }[];
} {
  const factors = [
    { factor: "Vehicle Pricing", confidence: assumptions.busPrices.typeC.electric.confidence, impact: "HIGH" as const },
    { factor: "Electricity Rate", confidence: assumptions.electricityRateKwh.confidence, impact: "HIGH" as const },
    { factor: "Diesel Price", confidence: assumptions.dieselPricePerGallon.confidence, impact: "MEDIUM" as const },
    { factor: "Maintenance Costs", confidence: assumptions.maintenanceCostPerMile.electric.confidence, impact: "MEDIUM" as const },
    { factor: "Federal Incentives", confidence: assumptions.federalIncentivePerBus.confidence, impact: "HIGH" as const },
    { factor: "State Incentives", confidence: assumptions.stateIncentivePerBus.confidence, impact: "MEDIUM" as const },
  ];

  // Calculate overall confidence (weighted by impact)
  const weights = { HIGH: 3, MEDIUM: 2, LOW: 1 };
  const confidenceValues = { KNOWN: 1, ESTIMATED: 0.7, UNKNOWN: 0.3 };

  let weightedSum = 0;
  let totalWeight = 0;

  for (const factor of factors) {
    const weight = weights[factor.impact];
    const value = confidenceValues[factor.confidence];
    weightedSum += weight * value;
    totalWeight += weight;
  }

  return {
    overallConfidence: weightedSum / totalWeight,
    confidenceFactors: factors,
  };
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SCENARIO COMPARISON
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function compareScenarios(input: Omit<TCOInput, "scenarioType">): {
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
} {
  const diesel = calculateTCO({ ...input, scenarioType: "DIESEL_BASELINE" });
  const selfManaged = calculateTCO({ ...input, scenarioType: "SELF_MANAGED_EV" });
  const eaas = calculateTCO({ ...input, scenarioType: "EAAS" });
  const axivai = calculateTCO({ ...input, scenarioType: "AXIVAI" });

  // Find lowest TCO
  const scenarios = [
    { type: "DIESEL_BASELINE" as const, tco: diesel.totalTCO },
    { type: "SELF_MANAGED_EV" as const, tco: selfManaged.totalTCO },
    { type: "EAAS" as const, tco: eaas.totalTCO },
    { type: "AXIVAI" as const, tco: axivai.totalTCO },
  ];
  const lowestTCO = scenarios.reduce((a, b) => (a.tco < b.tco ? a : b)).type;

  // Calculate savings
  const axivaiSavingsVsDiesel = diesel.totalTCO - axivai.totalTCO;
  const axivaiSavingsVsSelfManaged = selfManaged.totalTCO - axivai.totalTCO;

  // Calculate payback period
  let paybackYearsVsDiesel: number | null = null;
  const initialInvestmentDiff =
    axivai.annualCosts[0].capitalCost - diesel.annualCosts[0].capitalCost;
  if (initialInvestmentDiff > 0) {
    let cumulativeSavings = 0;
    for (let year = 1; year < axivai.annualCosts.length; year++) {
      const annualSavings =
        diesel.annualCosts[year].totalCost - axivai.annualCosts[year].totalCost;
      cumulativeSavings += annualSavings;
      if (cumulativeSavings >= initialInvestmentDiff) {
        // Linear interpolation for more accurate payback
        const prevCumulative = cumulativeSavings - annualSavings;
        const fraction =
          (initialInvestmentDiff - prevCumulative) / annualSavings;
        paybackYearsVsDiesel = year - 1 + fraction;
        break;
      }
    }
  }

  return {
    diesel,
    selfManaged,
    eaas,
    axivai,
    comparison: {
      lowestTCO,
      axivaiSavingsVsDiesel,
      axivaiSavingsVsSelfManaged,
      paybackYearsVsDiesel,
    },
  };
}
