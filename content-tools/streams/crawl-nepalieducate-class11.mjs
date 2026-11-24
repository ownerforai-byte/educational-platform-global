import https from "node:https";

function get(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { "user-agent": "RavikisanPlatformCatalogBot/1.0" } }, (res) => {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => resolve(data));
      })
      .on("error", reject);
  });
}

function driveIds(html) {
  return [
    ...new Set(
      [...html.matchAll(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/g)].map((m) => m[1]),
    ),
  ];
}

const hub = await get("https://www.nepalieducate.com/p/class-11-basic-mathematics-solution.html");
const hrefs = [
  ...new Set([...hub.matchAll(/href="([^"]+)"/g)].map((m) => m[1])),
];
const posts = hrefs.filter((h) => /nepalieducate\.com\/20\d{2}\//.test(h));
console.log("math hub post links", posts.length);

let withPdf = 0;
for (const u of posts) {
  const html = await get(u);
  const ids = driveIds(html);
  if (ids.length) {
    withPdf++;
    console.log("OK", ids.length, u);
  }
}
console.log("withPdf", withPdf, "/", posts.length);

const xml = await get("https://www.nepalieducate.com/sitemap.xml");
const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const sci = locs.filter(
  (u) =>
    /class[\s_-]*11|grade[\s_-]*11/i.test(u) &&
    /(mathematics|physics|chemistry|biology|exercise|solution)/i.test(u),
);
console.log("\nsitemap class11 sci/exercise", sci.length);
for (const u of sci) {
  const html = await get(u);
  const ids = driveIds(html);
  if (ids.length) console.log("sitemap", ids.length, u);
}