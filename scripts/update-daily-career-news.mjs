import { writeFile } from "node:fs/promises";

const feeds = [
  ["Engineering & AI", "https://news.google.com/rss/search?q=engineering+AI+jobs+students&hl=en-IN&gl=IN&ceid=IN:en"],
  ["Technology", "https://news.google.com/rss/search?q=technology+engineering+jobs+India&hl=en-IN&gl=IN&ceid=IN:en"],
  ["Semiconductor", "https://news.google.com/rss/search?q=semiconductor+jobs+India&hl=en-IN&gl=IN&ceid=IN:en"],
];

const escapeTs = (value) => value.replaceAll("\\", "\\\\").replaceAll('"', '\\"').replaceAll("\n", " ");
const items = [];

for (const [category, url] of feeds) {
  try {
    const response = await fetch(url, { headers: { "user-agent": "Luna.ai daily updater" } });
    if (!response.ok) continue;
    const xml = await response.text();
    const matches = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].slice(0, 4);
    for (const match of matches) {
      const block = match[1];
      const title = block.match(/<title>([\s\S]*?)<\/title>/)?.[1]?.replaceAll(/<[^>]+>/g, "").trim();
      const link = block.match(/<link>([\s\S]*?)<\/link>/)?.[1]?.trim();
      const pubDate = block.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1]?.trim();
      if (title && link) items.push({ title: escapeTs(title), link: escapeTs(link), category, period: pubDate ? new Date(pubDate).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10) });
    }
  } catch (error) {
    console.warn(`Feed failed: ${url}`, error.message);
  }
}

const unique = [...new Map(items.map((item) => [item.title, item])).values()].slice(0, 12);
const generated = `// Generated automatically by GitHub Actions. Do not edit manually.\nexport type DailyCareerUpdate = { title: string; category: string; period: string; link: string; detail: string };\n\nexport const dailyCareerUpdates: DailyCareerUpdate[] = ${JSON.stringify(unique, null, 2).replaceAll('"category":', '"category":').replaceAll('"detail": undefined', '"detail": ""')};\n`;
const normalized = generated.replace(/\{\n\s+"title": ([^,]+),\n\s+"link": ([^,]+),\n\s+"category": ([^,]+),\n\s+"period": ([^\n]+)\n\s+\}/g, '{ title: $1, category: $3, period: $4, link: $2, detail: "Fresh industry news discovered automatically." }');
await writeFile("src/data/daily-career-updates.ts", normalized);
console.log(`Generated ${unique.length} daily updates.`);
