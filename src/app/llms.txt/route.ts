/**
 * /llms.txt: a short, plain-text map of the site for AI assistants (llmstxt.org format).
 */

import { RESEARCH_REPORTS } from "@/lib/research";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";

export async function GET() {
  const body = `# AXIVAI

> AXIVAI delivers deployable battery power to fleet depots and sites the grid can't serve yet. When an electric bus yard is waiting on a back-ordered transformer, AXIVAI installs storage on the yard and refills it by truck around the clock, so the fleet runs from day one. AXIVAI doesn't replace the grid; it covers the wait.

AXIVAI is founded and seed-funded by Aliff Capital. First market: electric school-bus depots in New York and California. Full text for AI tools: ${SITE.url}/llms-full.txt

## Key pages

- [Home](${SITE.url}/): what AXIVAI does and how it works
- [Off-grid fleet charging](${SITE.url}/off-grid-fleet-charging): charging an electric fleet before the grid connection arrives
- [FAQ](${SITE.url}/faq): grid delays, transformer shortages and how AXIVAI delivers power
- [About](${SITE.url}/about): who is behind AXIVAI
- [Tell us about your site](${SITE.url}/report-a-gap): sites waiting on power can apply to be an AXIVAI pilot

## Research

${RESEARCH_REPORTS.map((r) => `- [${r.title}](${SITE.url}/research/${r.slug}): ${r.summary}`).join("\n")}

## Optional

- [Privacy Policy](${SITE.url}/privacy)
- [Terms of Service](${SITE.url}/terms)
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
