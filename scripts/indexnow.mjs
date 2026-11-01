#!/usr/bin/env node
/**
 * Submit every URL in the live sitemap to IndexNow (Bing, Yandex, Seznam, Naver and others).
 * The key file is public/<key>.txt, served at https://axivai.com/<key>.txt.
 *
 *   node scripts/indexnow.mjs            # submit all sitemap URLs
 *   node scripts/indexnow.mjs URL ...    # submit only these URLs
 */

const HOST = "axivai.com";
const KEY = "51a80a49725d4dbc88ef2d2cc346aa2a";

async function sitemapUrls() {
  const res = await fetch(`https://${HOST}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap.xml returned ${res.status}`);
  return [...(await res.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

const urls = process.argv.length > 2 ? process.argv.slice(2) : await sitemapUrls();

// IndexNow accepts up to 10,000 URLs per request.
for (let i = 0; i < urls.length; i += 10000) {
  const batch = urls.slice(i, i + 10000);
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: batch }),
  });
  console.log(`IndexNow: ${batch.length} URLs → HTTP ${res.status} ${res.statusText}`);
  if (res.status >= 400) console.log(await res.text());
}
