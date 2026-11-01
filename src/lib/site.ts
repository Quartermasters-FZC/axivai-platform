/**
 * Site-wide identity and policy settings. Change these here, not in individual pages.
 *
 * Before launch, confirm:
 * - entity / governingLaw: the legal operator and copyright holder. No postal address is shown on the site.
 * - email: each mailbox must exist on axivai.com (Hostinger mail) before the site goes live.
 */

export const SITE = {
  name: "AXIVAI",
  url: "https://axivai.com",
  entity: "Aliff Capital, LLC",
  governingLaw: "Delaware",
  entityUrl: "https://aliffcapital.com",
  host: "Hostinger",
  email: {
    privacy: "privacy@axivai.com",
    legal: "legal@axivai.com",
    accessibility: "accessibility@axivai.com",
  },
  retention: {
    /** IP hashes on gap reports, kept for rate limiting only. */
    ipHashDays: 30,
    /** Name and email on gap reports where follow-up was requested. */
    contactMonths: 24,
  },
} as const;

/** Founder and advisors, shown on /about, the homepage strip and the footer. */
export const PARTNERS = [
  { name: "Aliff Capital", role: "Founder and seed investor", url: "https://aliffcapital.com", note: "Founded AXIVAI and funds its growth." },
  { name: "Aliff Solutions", role: "Consultant and website developer", url: "https://aliffsolutions.com", note: "Advises on strategy and operations, and developed this website." },
  { name: "Quartermasters", role: "Consultant", url: "https://quartermasters.me", note: "Advises on strategy and operations." },
] as const;
