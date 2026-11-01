/**
 * robots.txt. Search engines and AI assistants are welcome to read and cite the site;
 * only the API is closed. /llms.txt and /llms-full.txt give AI tools a plain-text summary.
 */

const AI_AGENTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
];

export async function GET() {
  const body = [
    "User-agent: *",
    "Allow: /",
    "Disallow: /api/",
    "",
    ...AI_AGENTS.flatMap((ua) => [`User-agent: ${ua}`, "Allow: /", "Disallow: /api/", ""]),
    "Sitemap: https://axivai.com/sitemap.xml",
    "",
  ].join("\n");

  return new Response(body, {
    status: 200,
    headers: { "Content-Type": "text/plain" },
  });
}
