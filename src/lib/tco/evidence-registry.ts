/**
 * AXIVAI TCO Calculator - Evidence & Assumptions Registry
 * © 2025-2050 Aliff Capital, LLC. All Rights Reserved.
 *
 * This registry provides transparent, auditable tracking of all assumptions
 * used in TCO calculations. Each parameter has:
 * - Classification (not "KNOWN" which implies false certainty)
 * - Source with URL and date
 * - Jurisdiction scope
 * - Validation rules
 * - Update policy
 */

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// EVIDENCE CLASSIFICATION SYSTEM (Replaces KNOWN/ESTIMATED/UNKNOWN)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * Evidence Classification - More rigorous than KNOWN/ESTIMATED/UNKNOWN
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

/**
 * Update policy for stale data management
 */
export type UpdatePolicy =
  | "REAL_TIME"          // Should be fetched from API (not yet implemented)
  | "MONTHLY"            // Update monthly from source
  | "QUARTERLY"          // Update quarterly
  | "ANNUAL"             // Update annually
  | "MANUAL"             // User must manually update
  | "STATIC";            // Rarely changes (physical constants)

/**
 * Evidence strength for UI display (replaces numeric confidence)
 */
export type EvidenceStrength = "HIGH" | "MEDIUM" | "LOW" | "UNCERTAIN";

/**
 * Registry entry for each assumption/parameter
 */
export interface RegistryEntry<T = number> {
  id: string;
  name: string;
  description: string;

  // Value and units
  value: T;
  units: string;
  allowedRange?: { min: T; max: T };

  // Classification
  classification: EvidenceClassification;
  evidenceStrength: EvidenceStrength;

  // Jurisdiction
  jurisdictionScope: JurisdictionScope;
  applicableStates?: string[];      // If STATE_SPECIFIC
  applicableUtilities?: string[];   // If UTILITY_SPECIFIC

  // Source tracking
  source: {
    name: string;
    url?: string;
    publisher?: string;
    asOfDate: string;               // ISO date when data was current
    retrievedDate: string;          // ISO date when we retrieved it
  };

  // Update policy
  updatePolicy: UpdatePolicy;
  nextUpdateDue?: string;           // ISO date

  // Why this matters
  impactNote: string;               // Plain English explanation
  auditNote?: string;               // Notes for auditors

  // Validation
  validationRules?: string[];       // Human-readable validation rules

  // Contingency info (if classification is CONTINGENT)
  contingencyInfo?: {
    condition: string;              // What must be true for this to apply
    probability?: number;           // Estimated probability (0-1) if available
    fallbackValue?: T;              // Value if contingency doesn't occur
  };
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// VEHICLE PRICING REGISTRY
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const VEHICLE_PRICING_REGISTRY: Record<string, RegistryEntry> = {
  type_a_diesel_price: {
    id: "type_a_diesel_price",
    name: "Type A Diesel Bus Price",
    description: "Purchase price for Type A (small) diesel school bus",
    value: 90000,
    units: "USD",
    allowedRange: { min: 70000, max: 120000 },
    classification: "ASSUMED",
    evidenceStrength: "MEDIUM",
    jurisdictionScope: "US_ALL",
    source: {
      name: "School Bus Fleet Industry Data",
      url: "https://www.schoolbusfleet.com",
      publisher: "School Bus Fleet Magazine",
      asOfDate: "2024-01-01",
      retrievedDate: "2025-01-01",
    },
    updatePolicy: "ANNUAL",
    impactNote: "Base cost for diesel fleet TCO. Higher in some regions.",
    validationRules: ["Must be positive", "Typical range $70K-$120K"],
  },

  type_c_diesel_price: {
    id: "type_c_diesel_price",
    name: "Type C Diesel Bus Price",
    description: "Purchase price for Type C (conventional) diesel school bus",
    value: 110000,
    units: "USD",
    allowedRange: { min: 90000, max: 140000 },
    classification: "ASSUMED",
    evidenceStrength: "MEDIUM",
    jurisdictionScope: "US_ALL",
    source: {
      name: "School Bus Fleet Industry Data",
      url: "https://www.schoolbusfleet.com",
      publisher: "School Bus Fleet Magazine",
      asOfDate: "2024-01-01",
      retrievedDate: "2025-01-01",
    },
    updatePolicy: "ANNUAL",
    impactNote: "Most common bus type. Critical for fleet TCO.",
    validationRules: ["Must be positive", "Typical range $90K-$140K"],
  },

  type_c_electric_price: {
    id: "type_c_electric_price",
    name: "Type C Electric Bus Price",
    description: "Purchase price for Type C electric school bus",
    value: 395000,
    units: "USD",
    allowedRange: { min: 350000, max: 450000 },
    classification: "ASSUMED",
    evidenceStrength: "MEDIUM",
    jurisdictionScope: "US_ALL",
    source: {
      name: "AXIVAI Whitepaper - Section 5.3",
      publisher: "AXIVAI/Aliff Capital",
      asOfDate: "2024-06-01",
      retrievedDate: "2025-01-01",
    },
    updatePolicy: "QUARTERLY",
    impactNote: "EV prices declining ~10% annually. Verify current pricing.",
    auditNote: "Range $375K-$420K per whitepaper. Used midpoint.",
    validationRules: ["Must be positive", "Typical range $350K-$450K"],
  },
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ENERGY PRICING REGISTRY
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const ENERGY_PRICING_REGISTRY: Record<string, RegistryEntry> = {
  diesel_price_per_gallon: {
    id: "diesel_price_per_gallon",
    name: "Diesel Price per Gallon",
    description: "Retail diesel fuel price",
    value: 3.50,
    units: "USD/gallon",
    allowedRange: { min: 2.00, max: 8.00 },
    classification: "VERIFIED",
    evidenceStrength: "HIGH",
    jurisdictionScope: "STATE_SPECIFIC",
    source: {
      name: "EIA Weekly Retail Diesel",
      url: "https://www.eia.gov/petroleum/gasdiesel/",
      publisher: "U.S. Energy Information Administration",
      asOfDate: "2024-12-01",
      retrievedDate: "2025-01-01",
    },
    updatePolicy: "MONTHLY",
    impactNote: "Highly volatile. Can vary $1-2/gallon by region and year.",
    validationRules: ["Must be positive", "Typical range $2.50-$6.00"],
  },

  electricity_rate_kwh: {
    id: "electricity_rate_kwh",
    name: "Electricity Rate",
    description: "Commercial electricity rate per kWh",
    value: 0.12,
    units: "USD/kWh",
    allowedRange: { min: 0.05, max: 0.40 },
    classification: "VERIFIED",
    evidenceStrength: "MEDIUM",
    jurisdictionScope: "STATE_SPECIFIC",
    source: {
      name: "EIA Average Commercial Rate",
      url: "https://www.eia.gov/electricity/monthly/",
      publisher: "U.S. Energy Information Administration",
      asOfDate: "2024-12-01",
      retrievedDate: "2025-01-01",
    },
    updatePolicy: "MONTHLY",
    impactNote: "Rates vary 2x-4x by state. CA=$0.20, WA=$0.09. Use state-specific.",
    auditNote: "Does not include demand charges which can double effective rate.",
    validationRules: ["Must be positive", "Range $0.05-$0.40/kWh"],
  },

  demand_charge_kw: {
    id: "demand_charge_kw",
    name: "Demand Charge Rate",
    description: "Monthly demand charge per kW of peak demand",
    value: 15.0,
    units: "USD/kW/month",
    allowedRange: { min: 5.0, max: 50.0 },
    classification: "ASSUMED",
    evidenceStrength: "LOW",
    jurisdictionScope: "UTILITY_SPECIFIC",
    source: {
      name: "Utility Rate Database",
      url: "https://openei.org/wiki/Utility_Rate_Database",
      publisher: "OpenEI / NREL",
      asOfDate: "2024-06-01",
      retrievedDate: "2025-01-01",
    },
    updatePolicy: "QUARTERLY",
    impactNote: "CRITICAL: Ranges $5-$50/kW. Can dominate EV charging costs.",
    auditNote: "Primitive model uses 30% simultaneity. Real charges may be 2-3x higher.",
    validationRules: ["Must be positive", "Check local utility tariff"],
  },
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// AXIVAI COST STRUCTURE REGISTRY
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const AXIVAI_COST_REGISTRY: Record<string, RegistryEntry> = {
  axivai_ppa_rate: {
    id: "axivai_ppa_rate",
    name: "AXIVAI Power Procurement Rate (PPA)",
    description: "AXIVAI's internal power cost from I-95 Landfill PPA",
    value: 0.04,
    units: "USD/kWh",
    allowedRange: { min: 0.02, max: 0.10 },
    classification: "SOURCE_PROVIDED",  // NOT "KNOWN" - contractor data
    evidenceStrength: "MEDIUM",
    jurisdictionScope: "STATE_SPECIFIC",
    applicableStates: ["VA", "MD", "DC"],  // I-95 Landfill location
    source: {
      name: "I-95 Landfill PPA Agreement",
      publisher: "AXIVAI/Aliff Capital",
      asOfDate: "2024-01-01",
      retrievedDate: "2025-01-01",
    },
    updatePolicy: "ANNUAL",
    impactNote: "This rate is specific to AXIVAI's existing PPA. Not available to other operators.",
    auditNote: "CONTRACTOR-PROVIDED DATA. Requires contract verification for procurement decisions.",
    validationRules: ["Must be positive", "Verify PPA contract terms"],
  },

  axivai_transport_cost: {
    id: "axivai_transport_cost",
    name: "AXIVAI Transportation Cost",
    description: "Total cost to transport energy via mobile charging trucks",
    value: 0.20,
    units: "USD/kWh",
    allowedRange: { min: 0.15, max: 0.30 },
    classification: "SOURCE_PROVIDED",
    evidenceStrength: "MEDIUM",
    jurisdictionScope: "US_ALL",
    source: {
      name: "AXIVAI Operations Data",
      publisher: "AXIVAI/Aliff Capital",
      asOfDate: "2024-01-01",
      retrievedDate: "2025-01-01",
    },
    updatePolicy: "QUARTERLY",
    impactNote: "Includes truck energy ($0.06), labor ($0.08), depreciation ($0.03), maintenance ($0.03).",
    auditNote: "CONTRACTOR-PROVIDED DATA. Breakdown: $0.06+$0.08+$0.03+$0.03 = $0.20/kWh",
    validationRules: ["Must be positive", "Should include all transport components"],
  },

  axivai_infrastructure_cost: {
    id: "axivai_infrastructure_cost",
    name: "AXIVAI Infrastructure Cost to District",
    description: "Infrastructure cost to district under AXIVAI mobile charging model",
    value: 0,  // DEFAULT TO REQUIRE USER INPUT
    units: "USD",
    allowedRange: { min: 0, max: 5000000 },
    classification: "USER_PROVIDED",  // Must be explicitly set
    evidenceStrength: "UNCERTAIN",
    jurisdictionScope: "US_ALL",
    source: {
      name: "User Input Required",
      asOfDate: "N/A",
      retrievedDate: "N/A",
    },
    updatePolicy: "MANUAL",
    impactNote: "CRITICAL: $0 infrastructure assumes AXIVAI provides all charging. Verify contractually.",
    auditNote: "If set to $0, user must confirm this is per contract terms. May require depot electrical work.",
    validationRules: ["Must be non-negative", "If $0, require explicit confirmation"],
  },
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// INCENTIVES REGISTRY
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const INCENTIVES_REGISTRY: Record<string, RegistryEntry> = {
  epa_csbp_incentive: {
    id: "epa_csbp_incentive",
    name: "EPA Clean School Bus Program Incentive",
    description: "Federal incentive for electric school bus purchase",
    value: 250000,
    units: "USD/bus",
    allowedRange: { min: 0, max: 375000 },
    classification: "CONTINGENT",  // NOT "KNOWN" - must be awarded
    evidenceStrength: "LOW",  // Many don't receive
    jurisdictionScope: "FEDERAL",
    source: {
      name: "EPA Clean School Bus Program",
      url: "https://www.epa.gov/cleanschoolbus",
      publisher: "U.S. Environmental Protection Agency",
      asOfDate: "2024-01-01",
      retrievedDate: "2025-01-01",
    },
    updatePolicy: "ANNUAL",
    impactNote: "$250K is MAXIMUM for Priority Districts. Most receive less or nothing.",
    auditNote: "CONTINGENT ON AWARD. Competitive program. Subject to Congressional appropriation.",
    validationRules: ["Must be non-negative", "Maximum $375K for priority + state"],
    contingencyInfo: {
      condition: "District must apply and be selected in competitive process",
      probability: 0.30,  // Rough estimate - many applicants don't receive
      fallbackValue: 0,
    },
  },

  state_incentive: {
    id: "state_incentive",
    name: "State Electric Bus Incentive",
    description: "State-level incentive for electric school bus purchase",
    value: 0,  // Default to $0 - user must specify
    units: "USD/bus",
    allowedRange: { min: 0, max: 150000 },
    classification: "USER_PROVIDED",
    evidenceStrength: "UNCERTAIN",
    jurisdictionScope: "STATE_SPECIFIC",
    source: {
      name: "Varies by State",
      asOfDate: "N/A",
      retrievedDate: "N/A",
    },
    updatePolicy: "MANUAL",
    impactNote: "Highly variable by state. CA, NY, CO have significant programs. Many states have none.",
    auditNote: "User should verify current state program availability and requirements.",
    validationRules: ["Must be non-negative", "Verify state program exists"],
  },
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// REVENUE STREAMS REGISTRY
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const REVENUE_REGISTRY: Record<string, RegistryEntry> = {
  lcfs_credits: {
    id: "lcfs_credits",
    name: "LCFS Carbon Credits",
    description: "Low Carbon Fuel Standard credits per bus per year",
    value: 600,
    units: "USD/bus/year",
    allowedRange: { min: 0, max: 1500 },
    classification: "CONTINGENT",
    evidenceStrength: "LOW",
    jurisdictionScope: "CA_OR_WA",  // Only CA, OR, WA have LCFS
    applicableStates: ["CA", "OR", "WA"],
    source: {
      name: "California Air Resources Board LCFS",
      url: "https://ww2.arb.ca.gov/our-work/programs/low-carbon-fuel-standard",
      publisher: "California Air Resources Board",
      asOfDate: "2024-06-01",
      retrievedDate: "2025-01-01",
    },
    updatePolicy: "QUARTERLY",
    impactNote: "ONLY APPLIES IN CA/OR/WA. Other states receive $0. Credit prices fluctuate.",
    auditNote: "Based on ~$150/ton × 4 tons avoided emissions/bus/year. Prices volatile.",
    validationRules: ["$0 for non-LCFS states", "Verify current credit prices"],
    contingencyInfo: {
      condition: "District must be in LCFS state AND register for program",
      fallbackValue: 0,
    },
  },

  federal_45q_credits: {
    id: "federal_45q_credits",
    name: "Federal 45Q Tax Credits",
    description: "Federal carbon sequestration tax credits (prorated per bus)",
    value: 400,
    units: "USD/bus/year",
    allowedRange: { min: 0, max: 800 },
    classification: "CONTINGENT",
    evidenceStrength: "LOW",
    jurisdictionScope: "FEDERAL",
    source: {
      name: "IRS Section 45Q",
      url: "https://www.irs.gov/credits-deductions/businesses/carbon-oxide-sequestration-credit",
      publisher: "Internal Revenue Service",
      asOfDate: "2024-01-01",
      retrievedDate: "2025-01-01",
    },
    updatePolicy: "ANNUAL",
    impactNote: "Requires IRS Section 45Q compliance. Not all operations qualify.",
    auditNote: "CONTINGENT: Requires specific carbon capture/sequestration activities.",
    validationRules: ["Must verify 45Q eligibility", "Tax advisor verification recommended"],
    contingencyInfo: {
      condition: "Operator must meet IRS 45Q requirements for carbon sequestration",
      probability: 0.50,  // Many fleets won't qualify
      fallbackValue: 0,
    },
  },

  v2g_demand_response: {
    id: "v2g_demand_response",
    name: "V2G Demand Response Revenue",
    description: "Revenue from grid demand response programs",
    value: 300,
    units: "USD/bus/year",
    allowedRange: { min: 0, max: 1000 },
    classification: "CONTINGENT",
    evidenceStrength: "LOW",
    jurisdictionScope: "UTILITY_SPECIFIC",
    source: {
      name: "PJM Demand Response Programs",
      url: "https://www.pjm.com/markets-and-operations/demand-response",
      publisher: "PJM Interconnection",
      asOfDate: "2024-06-01",
      retrievedDate: "2025-01-01",
    },
    updatePolicy: "QUARTERLY",
    impactNote: "Requires: V2G-capable buses, utility program availability, grid interconnection.",
    auditNote: "NOT UNIVERSAL. Only available in certain utility territories with active programs.",
    validationRules: ["Verify utility offers program", "Verify bus V2G capability"],
    contingencyInfo: {
      condition: "V2G-capable equipment + utility program + interconnection agreement",
      probability: 0.25,  // Many districts won't have all requirements
      fallbackValue: 0,
    },
  },

  v2g_frequency_regulation: {
    id: "v2g_frequency_regulation",
    name: "V2G Frequency Regulation Revenue",
    description: "Revenue from grid frequency regulation services",
    value: 400,
    units: "USD/bus/year",
    allowedRange: { min: 0, max: 1200 },
    classification: "CONTINGENT",
    evidenceStrength: "LOW",
    jurisdictionScope: "UTILITY_SPECIFIC",
    source: {
      name: "PJM Frequency Regulation Market",
      publisher: "PJM Interconnection",
      asOfDate: "2024-06-01",
      retrievedDate: "2025-01-01",
    },
    updatePolicy: "QUARTERLY",
    impactNote: "Most valuable V2G revenue but requires certified equipment and utility participation.",
    auditNote: "Emerging market. Actual revenues may differ significantly from estimates.",
    validationRules: ["Verify PJM/CAISO territory", "Verify certified equipment"],
    contingencyInfo: {
      condition: "Certified V2G equipment + ISO market participation",
      probability: 0.20,
      fallbackValue: 0,
    },
  },

  vpp_revenue: {
    id: "vpp_revenue",
    name: "Virtual Power Plant Revenue",
    description: "Revenue from virtual power plant participation",
    value: 225,
    units: "USD/bus/year",
    allowedRange: { min: 0, max: 600 },
    classification: "CONTINGENT",
    evidenceStrength: "LOW",
    jurisdictionScope: "UTILITY_SPECIFIC",
    source: {
      name: "Various VPP Programs",
      asOfDate: "2024-06-01",
      retrievedDate: "2025-01-01",
    },
    updatePolicy: "QUARTERLY",
    impactNote: "Emerging market with limited track record. Availability varies greatly.",
    auditNote: "Most speculative revenue stream. Conservative estimates recommended.",
    validationRules: ["Verify VPP program availability", "Review contract terms"],
    contingencyInfo: {
      condition: "VPP aggregator contract + compatible equipment",
      probability: 0.15,
      fallbackValue: 0,
    },
  },
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// WEATHER & EFFICIENCY REGISTRY
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const WEATHER_REGISTRY: Record<string, RegistryEntry> = {
  cold_weather_range_reduction: {
    id: "cold_weather_range_reduction",
    name: "Cold Weather Range Reduction",
    description: "EV range/efficiency reduction in cold weather conditions",
    value: 0.30,  // 30% - conservative estimate per whitepaper
    units: "fraction (0-1)",
    allowedRange: { min: 0.10, max: 0.50 },
    classification: "ASSUMED",
    evidenceStrength: "MEDIUM",
    jurisdictionScope: "STATE_SPECIFIC",
    source: {
      name: "AXIVAI Whitepaper Section 7.2",
      publisher: "AXIVAI/Aliff Capital",
      asOfDate: "2024-06-01",
      retrievedDate: "2025-01-01",
    },
    updatePolicy: "STATIC",
    impactNote: "Range 30-50% per whitepaper. Use 30% as conservative default for cold states.",
    auditNote: "Previously hardcoded at 10% which underestimated cold weather impact.",
    validationRules: ["0.10 for mild climates", "0.30-0.50 for cold climates"],
  },

  mild_weather_adjustment: {
    id: "mild_weather_adjustment",
    name: "Mild Weather Efficiency Adjustment",
    description: "Base efficiency adjustment for non-cold-weather states",
    value: 0.10,  // 10% buffer for real-world conditions
    units: "fraction (0-1)",
    allowedRange: { min: 0.05, max: 0.20 },
    classification: "ASSUMED",
    evidenceStrength: "MEDIUM",
    jurisdictionScope: "US_ALL",
    source: {
      name: "Industry Standard Buffer",
      asOfDate: "2024-01-01",
      retrievedDate: "2025-01-01",
    },
    updatePolicy: "STATIC",
    impactNote: "Accounts for AC usage, terrain, driving style in non-cold conditions.",
    validationRules: ["Minimum 5%", "Maximum 20%"],
  },
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// EXTERNAL COSTS REGISTRY (Diesel Social Costs)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const EXTERNAL_COSTS_REGISTRY: Record<string, RegistryEntry> = {
  social_cost_carbon: {
    id: "social_cost_carbon",
    name: "Social Cost of Carbon",
    description: "EPA IWG social cost of carbon dioxide emissions",
    value: 65,
    units: "USD/ton CO2",
    allowedRange: { min: 20, max: 200 },
    classification: "VERIFIED",
    evidenceStrength: "HIGH",
    jurisdictionScope: "GLOBAL",
    source: {
      name: "EPA Interagency Working Group on Social Cost of Greenhouse Gases",
      url: "https://www.epa.gov/environmental-economics/scghg",
      publisher: "U.S. Environmental Protection Agency",
      asOfDate: "2024-01-01",
      retrievedDate: "2025-01-01",
    },
    updatePolicy: "ANNUAL",
    impactNote: "Central estimate at 3% discount rate. Range $20-$200 depending on methodology.",
    auditNote: "These are societal costs, not direct budget costs. Use for policy analysis only.",
    validationRules: ["Use EPA IWG official values", "Specify discount rate used"],
  },

  diesel_co2_per_bus_year: {
    id: "diesel_co2_per_bus_year",
    name: "Diesel Bus CO2 Emissions",
    description: "Annual CO2 emissions per diesel school bus",
    value: 12,
    units: "tons CO2/bus/year",
    allowedRange: { min: 8, max: 18 },
    classification: "VERIFIED",
    evidenceStrength: "HIGH",
    jurisdictionScope: "US_ALL",
    source: {
      name: "EPA Emissions Factors",
      url: "https://www.epa.gov/climateleadership/ghg-emission-factors-hub",
      publisher: "U.S. Environmental Protection Agency",
      asOfDate: "2024-01-01",
      retrievedDate: "2025-01-01",
    },
    updatePolicy: "ANNUAL",
    impactNote: "Based on 10,800 miles/year at 8 MPG. Actual varies by route and bus type.",
    validationRules: ["Calculate from actual miles and MPG if known"],
  },
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// HELPER FUNCTIONS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * Get all registry entries as a flat array
 */
export function getAllRegistryEntries(): RegistryEntry[] {
  return [
    ...Object.values(VEHICLE_PRICING_REGISTRY),
    ...Object.values(ENERGY_PRICING_REGISTRY),
    ...Object.values(AXIVAI_COST_REGISTRY),
    ...Object.values(INCENTIVES_REGISTRY),
    ...Object.values(REVENUE_REGISTRY),
    ...Object.values(WEATHER_REGISTRY),
    ...Object.values(EXTERNAL_COSTS_REGISTRY),
  ];
}

/**
 * Check if a revenue stream is applicable for a given state
 */
export function isRevenueApplicable(
  entryId: string,
  state: string
): { applicable: boolean; reason: string } {
  const entry = REVENUE_REGISTRY[entryId];
  if (!entry) {
    return { applicable: false, reason: "Unknown revenue entry" };
  }

  // Check jurisdiction scope
  if (entry.jurisdictionScope === "US_ALL" || entry.jurisdictionScope === "FEDERAL") {
    return { applicable: true, reason: "Available nationwide" };
  }

  if (entry.applicableStates && entry.applicableStates.length > 0) {
    if (entry.applicableStates.includes(state)) {
      return { applicable: true, reason: `Available in ${state}` };
    } else {
      return {
        applicable: false,
        reason: `Only available in: ${entry.applicableStates.join(", ")}`,
      };
    }
  }

  if (entry.jurisdictionScope === "UTILITY_SPECIFIC") {
    return {
      applicable: false,
      reason: "Requires verification of local utility program availability",
    };
  }

  return { applicable: false, reason: "Jurisdiction not determined" };
}

/**
 * Get entries that require user confirmation
 */
export function getEntriesRequiringConfirmation(): RegistryEntry[] {
  return getAllRegistryEntries().filter(
    (entry) =>
      entry.classification === "USER_PROVIDED" ||
      entry.classification === "CONTINGENT" ||
      entry.classification === "SOURCE_PROVIDED"
  );
}

/**
 * Validate a user-provided value against registry constraints
 */
export function validateRegistryValue(
  entryId: string,
  value: number
): { valid: boolean; errors: string[] } {
  const allRegistries = {
    ...VEHICLE_PRICING_REGISTRY,
    ...ENERGY_PRICING_REGISTRY,
    ...AXIVAI_COST_REGISTRY,
    ...INCENTIVES_REGISTRY,
    ...REVENUE_REGISTRY,
    ...WEATHER_REGISTRY,
    ...EXTERNAL_COSTS_REGISTRY,
  };

  const entry = allRegistries[entryId];
  if (!entry) {
    return { valid: false, errors: [`Unknown entry: ${entryId}`] };
  }

  const errors: string[] = [];

  if (entry.allowedRange) {
    if (value < entry.allowedRange.min) {
      errors.push(`Value ${value} is below minimum ${entry.allowedRange.min}`);
    }
    if (value > entry.allowedRange.max) {
      errors.push(`Value ${value} exceeds maximum ${entry.allowedRange.max}`);
    }
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Map old DataConfidence to new EvidenceClassification
 */
export function mapLegacyConfidence(
  confidence: "KNOWN" | "ESTIMATED" | "UNKNOWN"
): EvidenceClassification {
  switch (confidence) {
    case "KNOWN":
      return "VERIFIED";  // Note: Many "KNOWN" values should actually be SOURCE_PROVIDED or CONTINGENT
    case "ESTIMATED":
      return "ASSUMED";
    case "UNKNOWN":
      return "UNVERIFIED";
  }
}

/**
 * Get evidence strength from classification
 */
export function getEvidenceStrength(
  classification: EvidenceClassification
): EvidenceStrength {
  switch (classification) {
    case "VERIFIED":
      return "HIGH";
    case "SOURCE_PROVIDED":
    case "USER_PROVIDED":
      return "MEDIUM";
    case "ASSUMED":
      return "MEDIUM";
    case "CONTINGENT":
      return "LOW";
    case "NOT_APPLICABLE":
      return "HIGH";  // N/A is certain
    case "UNVERIFIED":
      return "UNCERTAIN";
  }
}

/**
 * Export registry as JSON for audit purposes
 */
export function exportRegistryForAudit(): string {
  const exportData = {
    exportDate: new Date().toISOString(),
    version: "1.0",
    vehiclePricing: VEHICLE_PRICING_REGISTRY,
    energyPricing: ENERGY_PRICING_REGISTRY,
    axivaiCosts: AXIVAI_COST_REGISTRY,
    incentives: INCENTIVES_REGISTRY,
    revenue: REVENUE_REGISTRY,
    weather: WEATHER_REGISTRY,
    externalCosts: EXTERNAL_COSTS_REGISTRY,
  };

  return JSON.stringify(exportData, null, 2);
}
