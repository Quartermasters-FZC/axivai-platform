/**
 * Markdown content collections under /content (reports, states, districts, glossary).
 * Each file: a front-matter block of `key: value` lines between `---` fences, then Markdown.
 * Body sections start at `## ` headings and become numbered report sections.
 * Server-only (reads the filesystem at build time).
 */

import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { Marked } from "marked";
import { RESEARCH_REPORTS, type ResearchReport } from "@/lib/research";

export type Meta = Record<string, string>;
export type Section = { id: string; title: string; html: string };
export type Entry = { slug: string; meta: Meta; intro: string; sections: Section[] };

const ROOT = path.join(process.cwd(), "content");

const marked = new Marked({
  gfm: true,
  renderer: {
    table(token) {
      // Wrap tables in the report table style; let marked render the cells.
      const head = token.header.map((c) => `<th scope="col">${this.parser.parseInline(c.tokens)}</th>`).join("");
      const rows = token.rows
        .map((r) => `<tr>${r.map((c) => `<td>${this.parser.parseInline(c.tokens)}</td>`).join("")}</tr>`)
        .join("");
      return `<div class="axr-table-wrap"><table class="axr-table"><thead><tr>${head}</tr></thead><tbody>${rows}</tbody></table></div>`;
    },
    link({ href, title, tokens }) {
      const text = this.parser.parseInline(tokens);
      const external = /^https?:\/\//.test(href);
      const t = title ? ` title="${title}"` : "";
      return external
        ? `<a href="${href}"${t} target="_blank" rel="noopener noreferrer">${text}</a>`
        : `<a href="${href}"${t}>${text}</a>`;
    },
  },
});

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&[a-z]+;/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

function parse(file: string): Entry {
  const raw = readFileSync(file, "utf8");
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) throw new Error(`No front matter in ${file}`);
  const meta: Meta = {};
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^([A-Za-z][\w-]*):\s*(.*)$/);
    if (kv) meta[kv[1]] = kv[2].replace(/^"(.*)"$/, "$1");
  }
  const slug = meta.slug || path.basename(file, ".md");
  const [introMd, ...parts] = m[2].split(/^## /m);
  const sections = parts.map((p) => {
    const nl = p.indexOf("\n");
    const title = (nl === -1 ? p : p.slice(0, nl)).trim();
    const body = nl === -1 ? "" : p.slice(nl + 1);
    return { id: slugify(title), title, html: marked.parse(body) as string };
  });
  return { slug, meta, intro: marked.parse(introMd.trim()) as string, sections };
}

/** All entries in a collection folder, e.g. "reports" or "districts/new-york". Sorted by `order`, then title. */
export function loadCollection(dir: string): Entry[] {
  const full = path.join(ROOT, dir);
  if (!existsSync(full)) return [];
  return readdirSync(full)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
    .map((f) => parse(path.join(full, f)))
    .sort((a, b) => Number(a.meta.order ?? 999) - Number(b.meta.order ?? 999) || (a.meta.title ?? "").localeCompare(b.meta.title ?? ""));
}

export function loadEntry(dir: string, slug: string): Entry | undefined {
  return loadCollection(dir).find((e) => e.slug === slug);
}

/** Subfolders of a collection, e.g. the states under "districts". */
export function listFolders(dir: string): string[] {
  const full = path.join(ROOT, dir);
  if (!existsSync(full)) return [];
  return readdirSync(full, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();
}

/** Hand-built reports plus Markdown reports in content/reports, for the index, sitemap and llms.txt. */
export function allReports(): ResearchReport[] {
  const md = loadCollection("reports").map((e) => ({
    slug: e.slug,
    kind: (e.meta.kind ?? "Industry review") as ResearchReport["kind"],
    title: e.meta.title,
    summary: e.meta.summary,
    date: e.meta.date,
    isoDate: e.meta.isoDate,
  }));
  return [...RESEARCH_REPORTS, ...md];
}
