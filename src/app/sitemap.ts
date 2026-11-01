import { MetadataRoute } from "next";
import { RESEARCH_REPORTS } from "@/lib/research";
import { SITE } from "@/lib/site";

const pages: { path: string; priority: number }[] = [
  { path: "", priority: 1 },
  { path: "off-grid-fleet-charging", priority: 0.9 },
  { path: "research", priority: 0.9 },
  { path: "faq", priority: 0.8 },
  { path: "about", priority: 0.7 },
  { path: "report-a-gap", priority: 0.8 },
  { path: "privacy", priority: 0.3 },
  { path: "cookies", priority: 0.3 },
  { path: "terms", priority: 0.3 },
  { path: "accessibility", priority: 0.3 },
  { path: "ccpa", priority: 0.3 },
  { path: "privacy-request", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    ...pages.map(({ path, priority }) => ({
      url: path ? `${SITE.url}/${path}` : `${SITE.url}/`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority,
    })),
    ...RESEARCH_REPORTS.map((r) => ({
      url: `${SITE.url}/research/${r.slug}`,
      lastModified: new Date(r.isoDate),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
