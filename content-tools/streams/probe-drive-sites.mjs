import https from "node:https";

function get(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { "user-agent": "RavikisanPlatformCatalogBot/1.0" } }, (res) => {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => resolve({ code: res.statusCode, data }));
      })
      .on("error", reject);
  });
}

function extractLocs(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

function extractDriveIds(html) {
  const ids = new Set();
  for (const m of html.matchAll(/drive\.google\.com\/(?:file\/d\/|open\?id=)([a-zA-Z0-9_-]+)/g)) {
    ids.add(m[1]);
  }
  for (const m of html.matchAll(/docs\.google\.com\/(?:document|spreadsheets)\/d\/([a-zA-Z0-9_-]+)/g)) {
    ids.add(m[1]);
  }
  return [...ids];
}

function extractLinks(html, host) {
  const out = new Set();
  for (const m of html.matchAll(/href=["']([^"'#]+)/gi)) {
    let h = m[1];
    if (h.startsWith("/")) h = `https://${host}${h}`;
    if (h.includes(host)) out.add(h.split("?")[0]);
  }
  return [...out];
}

async function probeSite({ name, sitemapUrl, urlFilter, sampleFetch = 8 }) {
  console.log(`\n=== ${name} ===`);
  try {
    const { code, data } = await get(sitemapUrl);
    const locs = extractLocs(data);
    console.log("sitemap", code, "urls", locs.length);
    const filtered = locs.filter((u) => urlFilter(u));
    console.log("class-11 filtered", filtered.length);
    const bySubject = {};
    for (const u of filtered) {
      const m = u.match(/(biology|chemistry|physics|mathematics|math|english|nepali)/i);
      const subj = m ? m[1].toLowerCase().replace("math", "mathematics") : "other";
      bySubject[subj] = (bySubject[subj] || 0) + 1;
    }
    console.log("by subject", bySubject);
    let withDrive = 0;
    for (const u of filtered.slice(0, sampleFetch)) {
      const { data: html } = await get(u);
      const ids = extractDriveIds(html);
      if (ids.length) {
        withDrive++;
        console.log("  drive", ids.length, u);
      }
    }
    console.log(`sample with drive: ${withDrive}/${Math.min(sampleFetch, filtered.length)}`);
    return { filtered, locs };
  } catch (e) {
    console.log("error", e.message);
    return { filtered: [], locs: [] };
  }
}

async function crawlHub(name, hubUrl, host, depth = 1) {
  console.log(`\n--- crawl ${name}: ${hubUrl} ---`);
  const { data } = await get(hubUrl);
  const links = extractLinks(data, host).filter((u) => /class-11|class_11|grade-11|neb-class-11/i.test(u));
  console.log("child links", links.length, links.slice(0, 5).join(" | "));
  let drivePages = 0;
  for (const u of links.slice(0, 15)) {
    const { data: html } = await get(u);
    const ids = extractDriveIds(html);
    if (ids.length) {
      drivePages++;
      console.log("  ", ids.length, "pdfs", u);
    }
  }
  console.log("pages with drive (sample)", drivePages);
}

const CLASS11 = /class[\s_-]*11|grade[\s_-]*11|neb-class-11|\/11\//i;

await probeSite({
  name: "nepalieducate",
  sitemapUrl: "https://www.nepalieducate.com/sitemap.xml",
  urlFilter: (u) => CLASS11.test(u) && /(biology|chemistry|physics|mathematics|math|english|nepali)/i.test(u),
  sampleFetch: 12,
});

await probeSite({
  name: "webnotee",
  sitemapUrl: "https://webnotee.com/sitemap.xml",
  urlFilter: (u) => /neb-class-11|class-11/i.test(u),
  sampleFetch: 10,
});

await probeSite({
  name: "nepalieducate-post",
  sitemapUrl: "https://www.nepalieducate.com/post-sitemap.xml",
  urlFilter: (u) =>
    CLASS11.test(u) &&
    /(solution|exercise|notes|mathematics|physics|chemistry|biology)/i.test(u),
  sampleFetch: 15,
});

await crawlHub(
  "nepalieducate math hub",
  "https://www.nepalieducate.com/p/class-11-basic-mathematics-solution.html",
  "www.nepalieducate.com",
);

await crawlHub(
  "notesharu math",
  "https://notesharu.com/neb/class-11/mathematics",
  "notesharu.com",
);