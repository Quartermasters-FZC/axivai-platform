# AXIVAI TCO Calculator - System Map

**Document Version:** 1.0
**Created:** 2025-12-25
**Purpose:** Comprehensive mapping of all TCO calculator components for audit and remediation

---

## 1. File Structure Overview

```
axivai-platform/
├── src/
│   ├── lib/tco/                    # Core calculation engine
│   │   ├── calculator.ts           # Main TCO computation logic (877 lines)
│   │   ├── defaults.ts             # All default assumptions with provenance (482 lines)
│   │   └── index.ts                # Public API exports (14 lines)
│   │
│   ├── types/
│   │   └── tco.ts                  # TypeScript type definitions (402 lines)
│   │
│   ├── components/tco/             # UI components
│   │   ├── ResultsDisplay.tsx      # Results visualization (547 lines)
│   │   └── FleetInputForm.tsx      # User input form (323 lines)
│   │
│   └── app/tco/
│       └── page.tsx                # Main calculator page (173 lines)
│
├── docs/
│   ├── planning/
│   │   ├── 20_TCO_Blueprint.md     # Architecture planning doc
│   │   └── 21_TCO_Scenarios_Sensitivity.md  # Sensitivity planning doc
│   │
│   └── tco/                        # NEW: Audit documentation
│       ├── SYSTEM_MAP.md           # This file
│       ├── BLACKHAT_FIX_LEDGER.md  # Fix tracking
│       ├── ASSUMPTIONS_EVIDENCE.md # Evidence registry
│       ├── SCENARIOS.md            # Scenario documentation
│       ├── DATA_SOURCES_FRESHNESS.md # Data source tracking
│       └── AUDIT_DEFENSIBILITY.md  # Audit compliance
```

---

## 2. Component Responsibilities

### 2.1 Core Calculation Engine (`src/lib/tco/`)

| File | Responsibility | Key Functions | Risk Areas |
|------|----------------|---------------|------------|
| `calculator.ts` | All TCO computations | `calculateTCO()`, `compareScenarios()`, `calculateYearCosts()` | Bias in AXIVAI vs competitor calculations |
| `defaults.ts` | Default values with provenance | `DEFAULT_ASSUMPTIONS`, `getLocationDefaults()`, `getFleetScaleAdjustment()` | Hardcoded advantages, stale data |
| `index.ts` | Public exports | Re-exports from above | N/A |

### 2.2 Type Definitions (`src/types/tco.ts`)

| Type Category | Purpose | Audit Concern |
|---------------|---------|---------------|
| `DataConfidence` | KNOWN/ESTIMATED/UNKNOWN labels | "KNOWN" used for unverified contractor data |
| `ScenarioType` | Four scenario types | AXIVAI scenario has structural advantages |
| `TCOAssumptions` | All parameter definitions | Missing validation constraints |
| `DieselExternalCosts` | External cost structure | Only applied to diesel, not EVs |
| `RevenueStreams` | Carbon credits, V2G | No jurisdiction gating |

### 2.3 UI Components (`src/components/tco/`)

| Component | Responsibility | Bias/Risk Areas |
|-----------|----------------|-----------------|
| `ResultsDisplay.tsx` | Render all results | "Lowest Net TCO" badge, "Hidden Costs Revealed" language |
| `FleetInputForm.tsx` | Collect user inputs | No validation on override values |

### 2.4 Page Component (`src/app/tco/page.tsx`)

| Responsibility | Implementation | Notes |
|----------------|----------------|-------|
| Route handling | Next.js App Router | `/tco` route |
| State management | React useState/useMemo | Client-side only |
| Calculation trigger | `compareScenarios()` on input change | No server-side validation |

---

## 3. Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER INPUTS                              │
│  FleetInputForm.tsx                                             │
│  - State selection                                              │
│  - Bus counts (Type A/C/D)                                      │
│  - Operating parameters                                         │
│  - Optional cost overrides                                      │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      TCOInput OBJECT                             │
│  - fleet: FleetProfile                                          │
│  - location: LocationProfile                                    │
│  - parameters: AnalysisParameters                               │
│  - overrides?: Partial<TCOAssumptions>                          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                   compareScenarios()                             │
│  calculator.ts                                                  │
│                                                                 │
│  Runs calculateTCO() for 4 scenarios:                          │
│  1. DIESEL_BASELINE                                             │
│  2. SELF_MANAGED_EV                                             │
│  3. EAAS                                                        │
│  4. AXIVAI ← STRUCTURAL ADVANTAGES HERE                        │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     calculateTCO()                               │
│                                                                 │
│  1. mergeAssumptions() - Combine defaults + location + overrides│
│  2. getFleetScaleAdjustment() - Magic 40-bus threshold         │
│  3. Loop years 0-12:                                            │
│     - calculateCapitalCosts()                                   │
│     - calculateInfrastructureCosts() ← $0 for AXIVAI           │
│     - calculateIncentives() ← EPA CSBP marked "KNOWN"          │
│     - calculateAXIVAIEnergyCost() ← Uses internal costs        │
│     - calculateRevenueStreams() ← 100% capture for AXIVAI     │
│     - calculateDieselExternalCosts() ← Only for diesel         │
│  4. NPV calculations                                            │
│  5. buildCostBreakdown()                                        │
│  6. calculateConfidence() ← Arbitrary weighting                │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                       TCOResult × 4                              │
│  - totalTCO, totalNetTCO, totalTrueCost                        │
│  - npv, npvNet, npvTrueCost                                    │
│  - costPerMile, netCostPerMile, trueCostPerMile                │
│  - annualCosts[], costBreakdown[]                              │
│  - externalCosts (diesel only)                                 │
│  - fleetScale, confidenceFactors                               │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    ResultsDisplay.tsx                            │
│                                                                 │
│  PROBLEMATIC UI ELEMENTS:                                       │
│  - "Lowest Net TCO" badge (biased framing)                     │
│  - "Hidden Costs Revealed" (advocacy language)                 │
│  - "73% Confidence" (false precision)                          │
│  - "True Cost" terminology (implies diesel is "false")         │
│  - External costs only shown for diesel                        │
└─────────────────────────────────────────────────────────────────┘
```

---

## 4. Identified Bias Points (Cross-Reference to Black Hat Review)

### 4.1 Calculator Logic Biases

| Location | Line(s) | Issue | Black Hat Finding |
|----------|---------|-------|-------------------|
| `calculator.ts` | 195-197 | Infrastructure = $0 for AXIVAI | "$0 infrastructure by default" |
| `calculator.ts` | 374 | Weather adjustment = 10% | "10% buffer vs 30-35% documented" |
| `calculator.ts` | 402 | AXIVAI gets 100% revenue capture | "Rigged revenue capture rates" |
| `calculator.ts` | 234 | Self-managed gets 50% revenue | "Arbitrary penalty" |
| `calculator.ts` | 250-254 | External costs only for diesel | "Selective external costs" |
| `defaults.ts` | 241-245 | EPA CSBP = "KNOWN" at $250K | "Contingent marked as certain" |
| `defaults.ts` | 199-210 | LCFS credits applied globally | "California-centric revenue" |

### 4.2 UI/Communication Biases

| Location | Line(s) | Issue | Black Hat Finding |
|----------|---------|-------|-------------------|
| `ResultsDisplay.tsx` | 129-133 | "Lowest Net TCO" badge | "Misleading winner designation" |
| `ResultsDisplay.tsx` | 264-266 | "Hidden Costs Revealed" badge | "Advocacy language" |
| `ResultsDisplay.tsx` | 449 | "73% Confidence" display | "False precision" |
| `ResultsDisplay.tsx` | 327-329 | "True Cost" labeling | "Implies diesel is 'false'" |

### 4.3 Missing Functionality

| Feature | Required | Current State |
|---------|----------|---------------|
| Scenario stress testing | 6 scenarios minimum | Not implemented |
| Jurisdiction gating for credits | Required for LCFS/V2G | Not implemented |
| Input validation | Required for safety | Minimal validation |
| Residual value in NPV | Required for accuracy | Not implemented |
| EV external costs | Required for neutrality | Not implemented |
| Downside scenarios | Required for risk | Not implemented |

---

## 5. External Data Dependencies

| Data Type | Source | Freshness | Update Mechanism |
|-----------|--------|-----------|------------------|
| State electricity rates | EIA | Static in code | Manual update required |
| State diesel prices | EIA | Static in code | Manual update required |
| EPA CSBP incentives | EPA.gov | Hardcoded | Manual update required |
| Social cost of carbon | EPA IWG | $65/ton (2024) | Manual update required |
| LCFS credit prices | CARB | ~$150/ton estimate | Manual update required |

---

## 6. Test Coverage Status

| Test Type | Status | Files |
|-----------|--------|-------|
| Unit tests | NOT IMPLEMENTED | None |
| Integration tests | NOT IMPLEMENTED | None |
| UI smoke tests | NOT IMPLEMENTED | None |
| Scenario validation | NOT IMPLEMENTED | None |

---

## 7. Documentation Status

| Document | Status | Location |
|----------|--------|----------|
| System Map | CREATED | `docs/tco/SYSTEM_MAP.md` |
| Black Hat Fix Ledger | PENDING | `docs/tco/BLACKHAT_FIX_LEDGER.md` |
| Assumptions Evidence | PENDING | `docs/tco/ASSUMPTIONS_EVIDENCE.md` |
| Scenarios | PENDING | `docs/tco/SCENARIOS.md` |
| Data Sources Freshness | PENDING | `docs/tco/DATA_SOURCES_FRESHNESS.md` |
| Audit Defensibility | PENDING | `docs/tco/AUDIT_DEFENSIBILITY.md` |

---

## 8. Remediation Priority Matrix

| Priority | Area | Impact | Effort | Files Affected |
|----------|------|--------|--------|----------------|
| P0 | Remove "KNOWN" for contingent data | HIGH | LOW | `defaults.ts` |
| P0 | Add jurisdiction gating for revenue | HIGH | MEDIUM | `calculator.ts`, `defaults.ts` |
| P0 | Remove $0 infrastructure default | HIGH | LOW | `calculator.ts` |
| P0 | Fix weather adjustment | HIGH | LOW | `calculator.ts` |
| P1 | Neutral UI language | MEDIUM | LOW | `ResultsDisplay.tsx` |
| P1 | Input validation | MEDIUM | MEDIUM | `FleetInputForm.tsx`, `calculator.ts` |
| P1 | Residual value in NPV | MEDIUM | LOW | `calculator.ts` |
| P2 | Scenario engine | MEDIUM | HIGH | New files required |
| P2 | Evidence registry | MEDIUM | HIGH | New files required |
| P2 | Test suite | LOW | MEDIUM | New files required |

---

**Document Maintained By:** AXIVAI Engineering
**Last Updated:** 2025-12-25
**Review Cycle:** After each major calculator change
