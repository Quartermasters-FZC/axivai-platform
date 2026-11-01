/**
 * /llms-full.txt: the full plain-text brief on AXIVAI for AI assistants.
 * Figures must match the sourced figures in the research reports.
 */

import { FAQS } from "@/lib/faq";
import { RESEARCH_REPORTS } from "@/lib/research";
import { PARTNERS, SITE } from "@/lib/site";

export const dynamic = "force-static";

export async function GET() {
  const body = `# AXIVAI: deployable power for fleets and sites waiting on the grid

Website: ${SITE.url}

## What AXIVAI does

AXIVAI delivers usable electrical capacity where fixed infrastructure is too slow, too limited or too inflexible. Its first service is off-grid fleet charging: when an electric bus depot has its buses and chargers but no grid connection, because the utility transformer is on back order, AXIVAI installs battery storage on the yard and refills it by truck around the clock. Every bus leaves full each morning. When the utility service is energized, the storage stays on as backup or moves to the next site.

AXIVAI does not compete with the grid. Grid power is cheap and reliable once it is there. AXIVAI serves the window when the grid and utilities can't deliver yet: delayed connections, growth beyond a site's service, temporary sites and outages.

## How it works

1. Storage and chargers on the yard. No grid connection is needed to start.
2. AXIVAI Motherships, trucks with battery trailers, fill up at an energy terminal with spare capacity and refill the yard's storage day and night.
3. When the grid arrives, AXIVAI steps back or stays on as backup.

Three deployment modes: mobile energy delivery, stationed power and managed capacity.

Planning figures for a 40-bus yard (AXIVAI estimates): about 100 kWh per bus per night, roughly 4 MWh a night, 2 MWh per trailer, two deliveries a night, about 4 MWh of storage on the yard.

## Why the grid wait is the market

- PG&E's EV charging projects averaged 560 days from request to power (report to the California Public Utilities Commission, April 2026). Projects needing a substation upgrade averaged 1,285 days.
- The California regulator's own target for EV charging energization is 182 days on average and 335 days at most (Decision 24-09-020, September 2024).
- New York's Department of Public Service (June 2026): fleet electrification projects take a few months upstate and a year or longer downstate; EV fleets can be delivered in a few months while grid upgrades often take six months or longer.
- Large power transformers take 2 to 4 years to deliver, against a few months in 2020 (NIAC report, June 2024). Distribution transformer lead times rose 429% from 2020 to 2022 (American Public Power Association survey).

## Who it's for

School-bus operators and districts first, then commercial fleets and depots, construction and temporary industrial sites, ports and logistics yards, utilities, disaster recovery and government users.

## Company

${PARTNERS.map((p) => `- ${p.name} (${p.url}): ${p.role}. ${p.note}`).join("\n")}

Copyright holder: ${SITE.entity}. Contact: ${SITE.email.privacy}. Sites waiting on power can apply at ${SITE.url}/report-a-gap.

## Frequently asked questions

${FAQS.map((f) => `### ${f.question}\n\n${f.short} ${f.answer}`).join("\n\n")}

## Research reports

${RESEARCH_REPORTS.map((r) => `### ${r.title}\n\n${r.kind}, ${r.date}. ${SITE.url}/research/${r.slug}\n\n${r.summary}`).join("\n\n")}
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
