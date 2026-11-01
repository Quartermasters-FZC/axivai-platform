# Transformer and grid-equipment lead times: New York and California

Research note, 1 November 2026. Purpose: size the window in which a depot has buses and chargers but no
energized grid service, which is the window AXIVAI's power-on-wheels model serves (no grid connection;
on-site storage and chargers; batteries delivered by truck around the clock).

Evidence levels: **Primary** = regulator or utility filing; **Survey** = industry-association or analyst
survey; **Secondary** = trade press or vendor blog (use for direction only).

## Headline

| Equipment / step | Lead time | Level | Source |
|---|---|---|---|
| Large power transformer (substation) | 2–4 years, vs months in 2020 | Primary (federal advisory) | NIAC, June 2024 |
| Large power transformer, average | ~50 wk (2021) → 120 wk (2024) → 128 wk (Q2 2025); range 80–210 wk | Survey (Wood Mackenzie, via NIAC and trade press) | NIAC 2024; Industrial Sage |
| High-capacity units, 2026 | up to 4 years | Secondary (PwC via Reuters Events) | pv magazine USA, 11 May 2026 |
| Distribution transformer, 2020→2022 | +429% average lead time; some utilities >3 years; 1 in 5 projects deferred or cancelled | Survey (APPA, 95 utilities) | ATE Issue Brief 2, 2023 |
| 1,000 kVA distribution transformer | "up to two years and even longer" | Survey/industry | ATE Issue Brief 2, 2023 |
| Distribution transformer, 2026 | ~30 wk blended average (down from >100 wk peak in 2023); pad-mount 30–60 wk | Survey (Wood Mackenzie, via vendors) | Giga Energy; DistroForge |
| Switchgear | 3 → 12 months (2023); ~44 wk average; 15 kV MV 52–80 wk (June 2026) | Survey/Secondary | ATE 2023; Terrapin, June 2026 |

## New York

- **NY Department of Public Service, "Recommendations for Addressing Electric Vehicle Charger Load
  Interconnection Issues", 15 June 2026** (Cases 24-E-0364, 18-E-0138 et al.):
  - Transportation electrification projects take "a few months upstate, a year or longer downstate".
  - "while EV fleets may be delivered in a few months, necessary infrastructure upgrades and
    interconnection approvals often take six months or longer".
  - Some projects sit "completed construction for many months before energization".
  - Load studies take up to 20 weeks; urban projects above 3 MW may need a utility "blockhouse".
  - Transformer availability and specifications differ by utility.
- EPA OIG 24-P-0012 (already in the archive): utility service typically 9–24 months.
- **Greece CSD (RG&E):** the district needs about 5 MW for 190 electric buses, and its Latta Road
  substation has 1.5 MW to spare (WHEC, 16 Jan 2025; see `ny-grid-access-esb.md`). The district has
  bought diesel buses meanwhile and says it can't buy electric buses until the power work is done.
  - Caution: the NYSEG/RG&E substation petitions with 2028–2031 in-service dates (e.g. Station 124,
    $33.2M, 2028, 63% of requested load from school-bus charging) are **not** shown to be Greece's
    substation. Don't present them as Greece's fix.
- **GVC, Zerega Avenue, Bronx (Con Edison):** 45 buses and 23 dual-port chargers, energized 17 June 2026.
  Con Edison upgraded the service and provided a transformer. No start date, kW figure or duration is
  published. The PSC-approved Zerega Avenue and Hunts Point upgrades are still to come, with no dates.
- Not found: Con Edison, National Grid or NYSEG published transformer lead times. Next step: their filings
  in the EV Infrastructure Interconnection Working Group (Case 18-E-0138).

## California

- **CPUC Decision 24-09-020 (Sept 2024)** sets EV-infrastructure energization targets: average 182 days,
  maximum 335 days. Upstream capacity timelines (maximum): new or upgraded circuit 684 days, substation
  upgrade 1,021 days, **new substation 3,242 days (8.9 years)** (CPUC fact sheet, 12 Sept 2024).
- **PG&E Rule 29 (EV infrastructure) end-to-end averages are rising across successive filings:**

  | PG&E filing | Applications submitted | Projects | PG&E days | End-to-end days |
  |---|---|---|---|---|
  | June 2025 report | 31 Jan 2023 – 31 Dec 2024 | 56 | ~120 | **467** |
  | 30 Sept 2025 | 31 Jan 2023 – 30 Jun 2025 | 86 | 113 | **508** |
  | 1 Apr 2026 | 31 Jan 2023 – 31 Dec 2025 | 161 | 111 | **560** |

  - PG&E's own share stays near 110–120 days. The rest of the end-to-end time is customer-side and
    other steps, so the utility can meet its targets while the site still waits 15–18 months.
  - Upstream capacity work, 1 Apr 2026 filing: **circuit 950 days; substation upgrade 1,285 days**
    (Sept 2025 filing: 871 and 1,225). No new substations were completed in either period.
  - Caveat: each filing covers only the 48% of applications already energized, so true averages are
    likely longer.
- Stanford SIEPR brief: bringing power to the site is the largest source of delay for charging projects,
  with transformer shortages among the causes.
- Not yet checked: SCE and SDG&E energization reports (same CPUC docket).

## Claims checked from the pasted summary

| Claim | Verdict |
|---|---|
| Distribution transformer lead times +429% (2020–2022) | Confirmed: APPA survey, cited by ATE |
| 1,000 kVA transformer can take two years or longer | Confirmed: ATE brief (2023) |
| Power transformers up to 60 months from tier-1 makers in 2026 | Partly: 3–5 years for the largest units reported secondhand; "up to four years" (PwC) is the best-sourced |
| Order windows closed for 2027–2028 | Not confirmed: backlogs reported at ~5 years (Mitsubishi, secondhand) and Chinese makers booked through 2027; no manufacturer statement found |
| Domestic makers 2–3 years | Secondary only (MarketScale headline) |
| Switchgear 40–70 weeks | Consistent with ~44 wk average and 52–80 wk for MV gear |

## Implication for AXIVAI

- The yard's own utility service (distribution transformer plus switchgear) is roughly 6–24 months.
  If the circuit or substation must be upgraded, PG&E's own record is 2.4–3.4 years.
- A grid-free yard avoids the utility transformer, but AXIVAI's site still needs switchgear, inverters
  or DC-coupled chargers, and battery enclosures. Those have their own lead times (switchgear ~44–80 wk)
  and must be sourced before the model can claim to be faster.
- The trucks still fill somewhere that already has capacity; the fill site is not subject to the wait.

## Sources

- NIAC, Addressing the Critical Shortage of Power Transformers, June 2024: https://www.cisa.gov/sites/default/files/2024-09/NIAC_Addressing%20the%20Critical%20Shortage%20of%20Power%20Transformers%20to%20Ensure%20Reliability%20of%20the%20U.S.%20Grid_Report_06112024_508c_pdf_0.pdf
- NY DPS, Recommendations for EV Charger Load Interconnection Issues, 15 June 2026: https://documents.dps.ny.gov/public/Common/ViewDoc.aspx?DocRefId=%7B5006CD9E-0000-CC14-A8FC-05216F6E7D58%7D
- PG&E Biannual Energization Report, 1 Apr 2026: https://docs.cpuc.ca.gov/PublishedDocs/Efile/G000/M604/K023/604023792.PDF
- CPUC energization fact sheet, 12 Sept 2024: https://www.cpuc.ca.gov/-/media/cpuc-website/divisions/energy-division/documents/transportation-electrification/energization/fact-sheet-energization-091224.pdf
- Con Edison, GVC fleet energized, 17 June 2026: https://www.coned.com/en/about-us/media-center/news/2026/06-17/con-edison-energizes-largest-electric-school-bus-fleet-in-nys
- PG&E Biannual Energization Report, 30 Sept 2025: https://www.cpuc.ca.gov/-/media/cpuc-website/divisions/energy-division/documents/infrastructure/energization/pge-biannual-energization-report-public_20250930.pdf
- Utility Dive on CPUC energization targets: https://www.utilitydive.com/news/california-puc-energization-timelines-ev-pge-sdge-socal-ed/727053/
- ATE Issue Brief 2, Supply Chain Delays (2023): https://ate-ev.org/wp-content/uploads/2025/07/2023_ATE_Interconnection-Energization_Part-2-Supply-Chain.pdf
- pv magazine USA, 11 May 2026: https://pv-magazine-usa.com/2026/05/11/u-s-transformer-market-faces-severe-supply-constraints-as-lead-times-extend-to-four-years/
- Stanford SIEPR policy brief: https://siepr.stanford.edu/publications/policy-brief/overcoming-roadblocks-californias-public-ev-charging-infrastructure
- Industrial Sage (Wood Mackenzie 128 wk): https://www.industrialsage.com/power-transformer-lead-times-us-grid-shortage/
- Giga Energy (distribution ~30 wk): https://www.gigaenergy.com/blog/lead-time-delays-for-data-centers
- Terrapin CG (switchgear, June 2026): https://terrapincg.com/news/switchgear-transformer-generator-lead-times-2026
