/**
 * Questions and answers shown on /faq, the homepage (first four) and /llms-full.txt.
 * Every figure here must match a sourced figure in the research reports.
 */

export type Faq = { question: string; short: string; answer: string };

export const FAQS: Faq[] = [
  {
    question: "When can AXIVAI power my site?",
    short: "We're choosing our first pilot sites now.",
    answer:
      "Tell us about your site through the power-gap form: the load, the timeline and where the utility work stands. If it's a fit for an early deployment, we'll come back to you.",
  },
  {
    question: "Can AXIVAI power a site with no grid connection?",
    short: "Yes. That's what it's built for.",
    answer:
      "AXIVAI trucks bring charged batteries to storage installed on your site, and your chargers draw from that storage around the clock. When the utility service arrives, AXIVAI steps back or stays on as backup.",
  },
  {
    question: "Why start with electric school buses?",
    short: "The infrastructure problem is well documented.",
    answer:
      "The U.S. Department of Energy's Electric School Bus Planning Guide discusses service upgrades, demand charges, managed charging and temporary mobile charging. School buses are the first market, not the only one.",
  },
  {
    question: "How do you handle data privacy?",
    short: "No cookies, no tracking, minimal data.",
    answer:
      "The site sets no cookies and runs no analytics or advertising. Gap reports keep contact details only if you ask for follow-up. The privacy, cookies and CCPA pages are linked in every footer.",
  },
  {
    question: "How long does it take to get grid power for an electric bus depot?",
    short: "Often a year or more.",
    answer:
      "PG&E's EV charging projects averaged 560 days from request to power in its April 2026 report to the California regulator. New York's Department of Public Service says these projects take a few months upstate and a year or longer downstate. Where a substation must be upgraded, PG&E's average was about three and a half years.",
  },
  {
    question: "Why are transformers taking so long?",
    short: "Demand has outrun factory capacity.",
    answer:
      "Electrification, new housing and data centers all need the same equipment. A 2024 report to the U.S. government put large power transformer delivery at 2 to 4 years, against a few months in 2020. Distribution transformer lead times rose 429% between 2020 and 2022, according to a public power utility survey.",
  },
  {
    question: "How does AXIVAI deliver power?",
    short: "Battery trucks fill storage on your site.",
    answer:
      "AXIVAI Motherships, trucks carrying battery trailers, fill up at an energy terminal with spare capacity and drive to your site. They unload into AXIVAI storage installed on the yard, and the storage charges your vehicles through your own chargers, day and night.",
  },
  {
    question: "How much energy does a bus depot need each night?",
    short: "About 4 MWh for a 40-bus yard, in our planning.",
    answer:
      "AXIVAI plans on about 100 kWh per bus per night, so a 40-bus yard needs roughly 4 MWh. With 2 MWh per trailer, that is about two deliveries a night. These are AXIVAI planning figures; each site is sized from its own routes.",
  },
  {
    question: "What happens when the grid connection arrives?",
    short: "AXIVAI steps back or stays on as backup.",
    answer:
      "Once the utility service is energized, the site charges from the grid. The AXIVAI storage can stay on as backup for outages and peaks, or move to the next site that's waiting.",
  },
  {
    question: "Does AXIVAI compete with the utility?",
    short: "No. It fills the gap until the utility delivers.",
    answer:
      "Where grid power is available, it is cheap and reliable, and AXIVAI doesn't try to replace it. AXIVAI serves the window when the grid can't deliver yet: delayed connections, growth beyond a site's service, temporary sites and outages.",
  },
  {
    question: "Who is AXIVAI for?",
    short: "Fleets and sites waiting on power.",
    answer:
      "School-bus operators and districts first, then commercial fleets and depots, construction and temporary industrial sites, ports and logistics yards, utilities, disaster recovery and government users.",
  },
  {
    question: "Who is behind AXIVAI?",
    short: "Founded and seed-funded by Aliff Capital.",
    answer:
      "AXIVAI was founded and is seed-funded by Aliff Capital, with Aliff Solutions and Quartermasters as consultants. Aliff Solutions also developed the website.",
  },
];

/** FAQPage structured data for a set of questions. */
export function faqJsonLd(faqs: Faq[]) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: `${f.short} ${f.answer}` },
    })),
  }).replace(/</g, "\\u003c");
}
