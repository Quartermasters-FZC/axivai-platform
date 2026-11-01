# New York: does the grid strand electric school buses?

**Question.** The hub animation shows the grid as the power source. Does New York have grid problems for its electric school bus (ESB) programme? Specifically: does a district acquire buses and then wait about a year for a grid connection, with buses sitting idle and taking up expensive space?

| | |
| --- | --- |
| Date | 1 November 2026 (second, deeper pass) |
| Stage | I · problem mapping |
| Status | Research draft. No validated AXIVAI results. |
| Sources | [`sources/ny-grid-access-esb-sources.md`](sources/ny-grid-access-esb-sources.md) (numbers in brackets, e.g. [S7], refer to that list) |
| Related | `src/app/research/ny-implementation-gap`, `src/app/research/fleet-charging-hubs`, `public/images/research/depot-power-waiting-gap.svg` |

Evidence levels follow `docs/planning/AXIVAI_Business_Plan_October_2026.md` §11: **Established** (external problem, sourced), **Feasible**, **Hypothesis** (AXIVAI), **Validated** (none yet). *Estimate* marks AXIVAI arithmetic.

---

## Bottom line

1. **The grid problem is real, and in parts of New York it sits at the substation.** Utilities' own regulatory filings name school-bus charging as a reason for substation upgrades. Those upgrades have in-service dates of 2026–2031. At one RG&E substation, school-bus requests make up 63% of the load asked for. *Established.*
2. **The regulator's record already describes your scenario.** Stakeholders told NY Department of Public Service (DPS) staff in 2026 that "EV fleets may be delivered in a few months" while upgrades and approvals take "a few months upstate, a year or longer downstate." *Established (stakeholder statements in a DPS staff report).*
3. **The state voucher rules allow buses to arrive before power.**
   - NYSERDA pays the bus voucher once the district takes delivery, and nothing requires chargers or power to be in place first.
   - The five-year, 5,000-miles-a-year operating obligation starts at delivery.
   - The charger voucher pays only once the charger is installed and working, within 15 months of approval. *Established.*
4. **But no public New York case shows buses actually parked for a year waiting for power.** The documented pattern is that **districts don't buy**:
   - Greece needs about 5 MW, and its substation has 1.5 MW to spare.
   - Marcus Whitman says the grid "cannot accommodate" even one bus.
   - Naples has power for one more bus, and Gouverneur for two more.

   With the mandate moved to 2032/2040, the cost appears as purchases deferred and diesel kept running. *Established for the cases named; a statewide count does not exist.*
5. **Space is expensive, but the idle-bus space cost is unmeasured.**
   - The documented cost is charger footprint: a NYC operator says it needs a yard about 25% larger.
   - New York City industrial rents average $28.64 per sq ft (CBRE, Q2 2026).
   - An upper-bound illustration is ~$17k–29k per parked bus per year. *Estimate; open-lot rents not found.*
6. **New York is already using "bridge" power, through the utilities themselves.**
   - National Grid is deploying mobile battery storage as a "bridge-to-wires" while it builds permanent capacity.
   - DPS staff recommend flexible and phased connections.

   This validates the idea and also defines the competition. *Established.*

---

## 1. Where the grid binds

### 1.1 Utility filings tie substation upgrades to school buses — *Established*

**NYSEG / RG&E urgent upgrade petition, 26 Nov 2024** [S1]. Every NYSEG project lists "Possible School Bus Charging" among its drivers.

| Utility | Project | Area | Cost | Est. in-service | School-bus link |
| --- | --- | --- | --- | --- | --- |
| NYSEG | Ferndale Substation | Liberty Division | $30.2M | 2028 | Possible school-bus charging |
| NYSEG | Kents Falls Substation | Near I-87 | $37.1M | 2029 | Possible school-bus charging |
| NYSEG | Clarence Substation | Near I-90 | $80.4M | 2029 | Possible school-bus charging; an I-90 EV request "cannot be supported due to thermal constraints" |
| NYSEG | Vincent Corners | Johnson City area | $25.2M | 2029 | Possible school-bus charging |
| NYSEG | Whitney Point | Whitney Point area | $37.8M | 2029 | Possible school-bus charging |
| NYSEG | Wright Avenue rebuild | Auburn area | $105.4M | 2029 | Possible school-bus charging |
| NYSEG | Centerport Area | Weedsport / Port Byron | $151.7M | 2031 | Possible school-bus charging |
| RG&E | Station 124 Expansion | Not stated | $33.2M | 2028 | "EV request for school bus charging … accounts for (63%) of total load requested" |
| RG&E | Station 255; Station 89 | Henrietta; not stated | $19.7M; $33.4M | 2028; 2029 | Not stated |

- Queued load waiting on these projects: **52.4 MW (NYSEG)** and **27.3 MW (RG&E)** "with active interconnection requests."
- **What the PSC approved** (12 Jun 2025) [S2]: 29 urgent projects, $636.2M, 642 MW. That includes one NYSEG project ($37.1M, 30 MW, North Country) and one RG&E project ($33.2M, 47 MW). By cost and size these match **Kents Falls** and **Station 124**; the release does not name them (*inference*). The other NYSEG substations were not on the urgent list.

**National Grid urgent upgrade petition, 13 Nov 2024** [S3]:
- A line item for "School Bus Electrification and Customer-Driven EV Projects", in service **2026–2029**: "These distribution projects create system capacity for school bus depot electrification." Some school-bus projects sit in its pending rate case.
- First Student and Student Transportation of America submitted written input.

**Con Edison** [S2, S4]:
- The PSC approved a "significant expansion at Zerega Avenue to enable fleet electrification" in the Bronx, plus a Hunts Point redesign.
- In June 2026 Con Edison energized GVC's 45-bus, 23-charger depot off Zerega Avenue and said it is "prioritizing future electrification upgrades on Zerega Avenue and in Hunts Point." No dates are given.

### 1.2 Districts say the grid caps them — *Established*

| District (utility) | What is reported | Date | Source |
| --- | --- | --- | --- |
| Greece CSD (RG&E) | Needs about **5 MW** for 190 electric buses; its Latta Road substation has **1.5 MW** surplus. Waited almost **3 months** just for RG&E transformer and cost information. Board president: transformer work "could be millions and millions of dollars." | Jan 2025 | [S5] |
| Victor (RG&E) | Would need **700–1,100 kW** more for a small electric fleet. | Oct 2025 | [S6] |
| Marcus Whitman (RG&E) | "We absolutely cannot, the grid cannot accommodate our power needs," whether one bus or 40. Wants a 10-year extension so RG&E can upgrade. | Oct 2025 | [S6] |
| Ontario County | Housing, retail and commercial projects stalled in Brighton, Henrietta and most of the county for lack of grid capacity. | Oct 2025 | [S6] |
| Naples CSD (NYSEG) | Power for **one more** bus; then NYSEG must upgrade the transmission line, no date given. Will eventually need 23 buses. "Nobody else in the village would have power when we're charging." | Sept 2026 | [S7, S8] |
| Gouverneur CSD | Supports **two more** buses; beyond that a transformer, backup generator and wiring, **~$5M**, about 10% of its annual budget. | Sept 2026 | [S8] |
| Central Hudson | If all 68 districts charged at once, peak demand would rise ~13%; only two have asked, so upgrades are delayed: "What we don't want to do is overbuild our system early." | Sept 2026 | [S8] |
| Statewide | 224 of 599 districts rate utility upgrades "most challenging" (second to funding, 243); 142 (23%) need a service upgrade; 67% haven't determined needs. | Oct 2025 | [S9] |
| Statewide | Some districts face "tens of millions of dollars" for substation work, new lines or relocating depots; upgrades are planned "years in advance." | Jan 2025 | [S10] |

**Pattern.** Utilities wait for firm requests before building, and districts need firm utility costs and dates before they can win a vote. NYAPT: districts need "certainty from utilities regarding costs and timelines to secure voter approval and funding" [S7]. RG&E: there is "not a typical timeline" [S5].

### 1.3 How long the wait is — *Established, mostly not NY-specific*

| Step | Duration | Scope | Source |
| --- | --- | --- | --- |
| Upgrades and approvals | "a few months upstate, a year or longer downstate"; "often take six months or longer" | NY, stakeholder statements to DPS staff | [S11] |
| Load study | "up to 20 weeks" | NY, stakeholder statement | [S11] |
| Fleet delivery | "EV fleets may be delivered in a few months" | NY, stakeholder statement | [S11] |
| Switchgear lead time | 16–20 months | NYSERDA guidance | [S12] |
| Construction | 12–18 months | NYSERDA guidance | [S12] |
| Substation upgrades | in service 2028–2031 for petitions filed Nov 2024 | NYSEG / RG&E | [S1] |
| Distribution capacity upgrades | "one to ten years, depending on the asset" | National (ATE) | [S13] |
| Large projects | "3–5 years or longer" | National (DOE) | [S14] |
| Application to energization | median > 950 days (2024) | California, not NY | [S15] |

- New York's utilities publish **no step durations**. The standard queue manual (Dec 2025) promises only "an estimated timeframe" [S16].
- DPS staff recommend end-to-end timeline tracking and a public dashboard [S11]. Until that exists, **there is no public New York request-to-energization data.**
- O&R reportedly cut its energization time by 40% [S15].

---

## 2. Can buses arrive before power? The programme rules — *Established*

From the NYSBIP Implementation Manual, v5, Dec 2024 [S17] and the charger voucher sheet [S18]:

| Rule | Effect |
| --- | --- |
| Bus voucher paid to the dealer after the purchaser **takes delivery** and registers the bus (§4.1) | Delivery does not depend on power. |
| No requirement for chargers or power before delivery; charging vouchers may be applied for "after they initiate an ESB purchase" (§3.2) | Buses **can** arrive before the depot is energized. |
| Bus voucher redeemed within 18 months of approval, extendable to 24 (§4.1, §9.2.2); the Definitions section says 15 months (internal conflict) | The delivery clock runs independently of utility work. |
| Bus must operate **5 years from delivery** and **5,000 miles a year** (§4.1 Step 7, §2.2) | **An idle bus burns its compliance window from day one.** |
| Charger voucher redeemed only once the charger is **installed and operational** and fully paid, within **15 months** of approval (§4.2, §11) | A utility delay holds up the district's money too. Extension rules for chargers (§11.2.2) were not reviewed. |
| Utility-side upgrades are not NYSBIP-eligible; the customer "may be required to pay for grid upgrades" beyond the utility's design [S18] | Upgrade cost uncertainty remains with the district. |

**Implication (Hypothesis).** The rules don't stop the idle-bus scenario. They make it **costly**: lost operating years, mileage obligations and delayed charger reimbursement. That is likely why districts defer purchases instead.

---

## 3. Are buses actually sitting idle for want of power?

- **New York: no public case found.** The documented idle New York buses were sidelined by equipment:

  | District | Cause | Duration | Source |
  | --- | --- | --- | --- |
  | Gouverneur CSD | High-voltage chargers failed after one day; heating failed | Weeks; one bus four months | [S8] |
  | Bethlehem CSD | Mechanical issues and recalls (10 buses) | Average 66 days per bus in a school year; then ordered nine diesel buses | [S8] |
  | Naples CSD | Not enough heat in sub-zero weather | Runs moved to diesel | [S7] |

- **Elsewhere: stated, but not measured.** A Michigan district (40 buses, $15.65M EPA) used off-grid charging because its fleet "would have remained idle" during upgrades; no duration is given [S19]. In a national study, stakeholders cited "stranded trucks due to delayed energization" as "a major business risk," unquantified [S15].
- **The closest NY data point:** 225 NYSBIP-vouchered buses sit in projects open more than a year; completed projects took a median of ~18 months. Reasons are not recorded [via `ny-implementation-gap`].

---

## 4. Space

- NYC has ~10,500 school buses: ~7,500 return to vendor lots or garages overnight, ~2,000 are spares at vendor lots, and ~1,000 are park-outs. The PowerUp NYC study gives **no yard count, ownership or cost** [S20].
- NYCSBUS would need a yard **about 25% larger** for bollards and in-ground chargers: "in New York City that's expensive" [S7].
- First Student's overhead "First Charge" system cut infrastructure costs **20%** in a Con Edison / NYSERDA demonstration (40 buses, Brooklyn and Queens) [S21].
- NYC industrial asking rent: **$28.64/sq ft** (Bronx $29.40, Queens $36.08, Brooklyn $27.17); vacancy 7.8% (CBRE, Q2 2026) [S22].
- *Estimate (upper bound):* a parked 40-ft bus with its share of aisle needs roughly 600–1,000 sq ft. Priced at industrial building rents, that is **~$17k–29k per bus per year**. Open lots are usually cheaper; no NYC bus-lot rents were found.

---

## 5. Bridges already in use in New York — *Established*

| Who | What | Status | Source |
| --- | --- | --- | --- |
| National Grid | Mobile battery storage at constrained I-90 Thruway sites, "a bridge-to-wires" until permanent capacity arrives; +4 MW (2 MW batteries + 2 MW reconductoring); $21.6M | In service 2026; long-term I-90 upgrade 2030–31 | [S3, S13] |
| PSC / DPS staff | Phased and flexible service connections (static, scheduled and dynamic load limits) proposed as a statewide framework | Recommended June 2026; pilots in Case 26-E-0052 | [S11, S13] |
| NYCSBUS / Con Edison | Load management let 17 buses (268 kW of chargers) run under an 80 kW site limit | Operating | [S16] |
| National Grid | Funds up to 60% of on-site storage (load-management programme) | Available | via `ny-implementation-gap` |

---

## Corrections to internal material

| Claim | Where | Issue | Action |
| --- | --- | --- | --- |
| "Thousands of newly purchased buses remain idle"; upgrades "routinely take 3 to 5 years" | *The Unseen Barriers to U.S. School Bus Electrification* | No source; DOE's 3–5 years applies to *large* projects. | Mark unverified; replace with the NY cases above. |
| "PJM 8-year average interconnection wait" | Same; *AXIVAI platform addresses systemic grid and utility bottlenecks* | PJM's queue is for *generation*, not depot *load*; NY is in NYISO. | Drop for NY depot claims. |
| "National Grid's Delameter rebuild … about 2 years from late 2026" | `src/app/research/ny-implementation-gap/page.tsx` | Could not verify: the ICCT PDF would not load, and "Delameter" returns no utility results. Possibly a misspelling (National Grid has substation projects in Delmar / Bethlehem). | Re-check against the ICCT document before publishing. |
| Mandate 2027 / 2035 | Electrek (Sept 2026), NYSERDA voucher sheet, older docs | Superseded: purchases from 1 July 2032, full operation 1 July 2040 (Education Law §3638, amended 29 May 2026). | Use 2032 / 2040. |

---

## Implications for AXIVAI — *Hypothesis*

- **The New York pitch** should be "your grid caps you at bus one or two; the substation fix is a 2028–2031 project; keep buying meanwhile," not "your buses will sit idle." The capped-fleet story is documented; the idle-bus story is not.
- **Where to look first:** RG&E and NYSEG territory around Rochester and the Finger Lakes (Greece, Victor, Marcus Whitman, Naples; Station 124; the NYSEG substations not approved as urgent), and Con Edison's Zerega Avenue / Hunts Point corridor.
- **Competition and validation:** the utility itself is deploying mobile batteries as a bridge, and the regulator favours flexible connections. AXIVAI must either beat those on speed and cost or partner with them, for example as a provider of utility-procured bridge capacity.
- **Animation:** the hub animation correctly shows an energized operator depot (like GVC or First Student). The constrained case belongs in `depot-power-waiting-gap.svg`: "capped at two buses; substation in service 2029."

---

## Open questions

| Question | Why it matters |
| --- | --- |
| Why are 225 NYSBIP-vouchered buses in projects open over a year: delivery, chargers, vote, or utility? | The one number that settles "buses waiting on power." |
| Request-to-energization times by NY utility and upgrade type | Sizes the bridge window; DPS staff are recommending this be published. |
| Which districts sit behind Station 124 and the unapproved NYSEG substations | Names the first prospects. |
| Charger voucher extension rules (§11.2.2) when the utility is late | Whether a utility delay can cancel the charger funding. |
| Open-lot rents for NYC bus yards | Prices the space argument properly. |
| Delameter / Delmar substation details | Verifies a claim on the live research page. |

## Next steps

1. **Ask NYSERDA** for the reasons behind open NYSBIP projects (or survey 10–15 of those districts).
2. **Call** Greece, Victor, Marcus Whitman and Naples transportation directors; ask RG&E and NYSEG for the Station 124 and Latta Road timelines.
3. **Pull** DPS Case 26-E-0052 (flexible interconnection pilots) and National Grid's mobile-battery cost data as a price benchmark.
4. **Fix** the Delameter citation and update `ny-implementation-gap` with sections 1.1, 1.2 and 2.
