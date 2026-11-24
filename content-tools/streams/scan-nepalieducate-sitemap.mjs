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

const xml = await get("https://www.nepalieducate.com/sitemap.xml");
const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const c11 = locs.filter((u) => /class[\s_-]*11|grade[\s_-]*11/i.test(u));
console.log("class11 urls", c11.length);

function guessSubject(u) {
  const s = u.toLowerCase();
  if (/(mathematics|algebra|trigonometry|calculus|vector|probability|complex|matrix|derivative|integral|mechanic|static)/.test(s))
    return "mathematics";
  if (/(physics|kinematic|dynamic|electric|gravitation|optics|heat)/.test(s)) return "physics";
  if (/(chemistry|stoichiometry|organic|inorganic|metal|acid|equilibrium)/.test(s)) return "chemistry";
  if (/(biology|botany|zoology|cell|ecology)/.test(s)) return "biology";
  if (/english/.test(s)) return "english";
  if (/nepali/.test(s)) return "nepali";
  return null;
}

const bySubj = {};
const exercise = [];
for (const u of c11) {
  const subj = guessSubject(u);
  if (subj) bySubj[subj] = (bySubj[subj] || 0) + 1;
  if (/exercise|solution|complete-solution/i.test(u)) exercise.push(u);
}
console.log("by subject keyword", bySubj);
console.log("exercise/solution urls", exercise.length);
console.log(exercise.join("\n"));