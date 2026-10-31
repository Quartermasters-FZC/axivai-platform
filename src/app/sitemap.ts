import { MetadataRoute } from "next";

const baseUrl = "https://axivai.com";

const staticPaths = [
  "",
  "tco",
  "privacy",
  "cookies",
  "terms",
  "accessibility",
  "ccpa",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return staticPaths.map((path) => ({
    url: `${baseUrl}/${path}`.replace(/\/$/, "/"),
    lastModified: now,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.8,
  }));
}
