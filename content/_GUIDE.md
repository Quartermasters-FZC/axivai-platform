# AXIVAI content guide (for every page in /content)

Files starting with `_` are not published. Today is 1 November 2026.

## Why the bar is high

Search engines and AI assistants rank pages that carry unique, checkable facts. Hundreds of near-identical or unsourced pages get a site demoted as scaled low-value content. Every page must hold facts a reader can't get elsewhere in one place, with sources.

## Source material

- DLP Labs / Aliff Group research in `docs/research/sources/dlp-labs/raw/` (indexes: `_index-*.md`). AXIVAI owns it and may republish it. Treat it as **leads**: many figures in it were AI-assisted and some are wrong.
- **Verify every published number, date and claim against a public primary source**, via web search or fetch. Examples:
  - NYSED, NYSERDA (NYSBIP), the district's own budget or board documents, the utility, the PSC/CPUC;
  - CEC, CARB, CDE, EPA Clean School Bus award lists;
  - reputable news.
- If a figure can't be verified, leave it out. Don't write "unverified".
- Existing AXIVAI research to reuse: `docs/research/transformer-lead-times-ny-ca.md` and `docs/research/ny-grid-access-esb.md`. These are internal notes, not pages, so never link them. Link the published pages instead: `/research/ev-charging-grid-connection-wait-times`, `/research/new-york-school-bus-incentive-program`, `/research/california-utility-ev-fleet-programs`, `/research/lion-electric-orphaned-school-buses`, `/research/stranded-electric-buses` and the other `/research/...` reports.

## Facts already settled (verified 1 Nov 2026)

- **New York mandate:** Education Law §3638, amended 29 May 2026. New purchases must be zero-emission from 1 July 2032 and the whole fleet from 1 July 2040, with up to two 24-month extensions. The 2027/2035 dates are superseded. NYC Local Law 120 still sets 1 September 2035 for buses under city contracts.
- **PG&E Rule 29:** EV projects averaged 560 days end to end (filing of 1 April 2026).
- **Large power transformers:** 2–4 years (NIAC, June 2024).
- **NYSBIP (data.ny.gov `7nqt-yksu`, updated 26 Oct 2026):** 461 buses and $83.3M across 79 recipients (77 districts and 2 BOCES, after removing duplicate spellings). 177 buses are in closed projects. Use this dataset for any district's NYSBIP award.
- **PG&E latest:** EV projects averaged 564 days end to end in the filing of 30 Sept 2026 (560 in the filing of 1 April 2026).

## Never publish

- Names, emails or phone numbers of individual staff, except elected officials or public leaders quoted in news, and then only when needed.
- "DLP Labs", "Aliff Capital for DLP Labs", sales pitches, engagement strategies, "readiness scores", SWOT scoring or confidential markings.
- The word "concept"; disclaimers; hedging boilerplate. Write confidently and plainly.
- Copied paragraphs from third-party sources. Quote at most one short sentence per source.

## Tone and form

- Plain English, short sentences, active voice. Lead with the most useful fact.
- Numbers with units and dates ("1,240 students (2024–25, NYSED)").
- Sources go in a final `## Sources` section as a Markdown list of links: `- [Publisher, title, date](url)`.
- AXIVAI appears only in a short `## Where AXIVAI fits` section (2–4 sentences) and only where relevant: depot power, grid wait, transformer lead times, backup. AXIVAI brings battery power by truck into storage on the yard so buses run before the grid connection arrives. It doesn't compete with the grid where the grid is available. Never claim AXIVAI has customers, deployments or results. One allowed status line: "AXIVAI is preparing its first pilot sites."
- Internal links: link the state page (`/electric-school-buses/<state>`), related reports (`/research/<slug>`), `/off-grid-fleet-charging` and `/faq` where they genuinely help.

## Front matter

Use `key: value` lines between `---` fences. Values go on one line; quote them if they contain a colon.

### Report: `content/reports/<slug>.md`

```
---
title: Lion Electric's orphaned school buses
seoTitle: Lion Electric bankruptcy: what happens to orphaned electric school buses
kind: Industry review            # Industry review | Market scan | Case study | Data report | Explainer
summary: One or two sentences, 150–160 characters, with the main keyword and the key fact.
lead: Optional longer lead for the cover (1–3 sentences).
keywords: lion electric bankruptcy, electric school bus warranty, ...
date: 1 November 2026
isoDate: 2026-11-01
---
Optional intro paragraph.

## First section
...
## Sources
- [...](...)
```

Reports: 1,200–3,000 words, 5–9 `##` sections, at least one Markdown table of sourced data where the topic allows, 8+ sources.

### State page: `content/states/<state-slug>.md` (new-york, california, texas, illinois, colorado, new-mexico)

Front matter as above, plus `seoTitle`. Sections:
- the mandate and deadlines;
- the fleet today;
- funding programs (with amounts and dates);
- utilities and grid readiness (energization timelines, make-ready programs);
- the main barriers;
- where AXIVAI fits;
- sources.

1,500–3,000 words.

### District page: `content/districts/<state-slug>/<district-slug>.md`

The slug is the district name in kebab case, e.g. `addison-central-school-district`, `nyc-geographic-district-02`.

```
---
title: Addison Central School District
stateName: New York
county: Steuben County
region: Southern Tier
enrollment: "1,0xx students (2024–25)"
fleet: "~25 buses (district-operated)"
electricBuses: "0 (as of 2026)"
utility: NYSEG
transportation: District-operated
fundingAwarded: "$x NYSBIP vouchers (2025)"
deadline: "New purchases zero-emission from July 2032; full fleet by July 2040"
summary: 150–160 characters: the district, its fleet, the key electrification fact.
date: 1 November 2026
isoDate: 2026-11-01
---
```

Optional key: `fleetPlan: "NYSERDA FEP: Complete (Aug 2025)"`. For contracted fleets, `electricBuses` may say "12 vouchered (NYSBIP)" rather than "in service".

Omit any fact key you can't verify.

**Standard data sources (New York).** Use these on every NY page:
- **NYSED zero-emission progress report (Oct 2025):** district area, NYSERDA fleet-plan status and regional comparisons.
- **NYSBIP dataset:** data.ny.gov `7nqt-yksu`, via `curl "https://data.ny.gov/resource/7nqt-yksu.json?$limit=5000"`. It gives each district's voucher counts, operators and the priority flag. District names appear under several spellings.
- **Enrollment:** data.nysed.gov blocks WebFetch, so use curl.
- **Utility territory:** data.ny.gov dataset `awza-4vgu` (electric utility service territories). Match it against the district's address.
- **Fleet size estimate:** data.ny.gov `h9zr-j4pg` (school bus inspections). Buses are inspected twice a year, so halve the inspection count and say it's approximate.
- **Bus and capital votes:** NYSED's budget vote result spreadsheets (2024–2026) cover the bus and capital propositions of every district.
- **Budgets and bus reserves:** NYSED's 2026–27 property tax report card spreadsheets.
- **Blocked pages:** use an archive.org (Wayback) copy. Don't route pages through third-party proxy or reader services such as r.jina.ai. District IDs come from `lists.php?start=<letter>&type=district`.

**Standard data sources (California).**
- **Enrollment:** CDE DataQuest.
- **Funding:** CARB/CEC ZESBI and HVIP award lists, EPA Clean School Bus award lists.
- **Utility:** the utility's service territory.

**Check search summaries against the page.** Summaries mix up neighbouring districts (Arkport's bus vote showed up under Addison). Open the source before you cite it.

**Keep `## Where AXIVAI fits` to two sentences.** The page adds its own call to action after it. Sections, district-specific only:
- `## District profile`
- `## Fleet and transportation`
- `## Depot power and the grid`
- `## Funding`
- `## Timeline`
- `## Where AXIVAI fits`
- `## Sources`

500–1,200 words. Don't repeat statewide background; link the state page for it. Add genuinely local facts: the bus garage or depot project, capital votes, the utility territory, rural route lengths, winter conditions, board decisions, and grants won.

## Quality check before you finish

- [ ] Every number has a source in `## Sources`; no personal contact data; no DLP Labs mentions.
- [ ] Front matter parses (one `key: value` per line).
- [ ] Unique, specific content, not a template with names swapped.
