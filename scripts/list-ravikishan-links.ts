import fs from "fs";
import path from "path";

const manifestPath = path.join(process.cwd(), "content", "ravikishan", "manifest.json");
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));

const links: Record<string, Array<{ title: string; path: string; dupType: number }>> = {};

for (const item of manifest) {
  const [section, subject, _chapter, _blockType, file] = item.path.split("/");
  const key = `${section}/${subject}`;
  if (!links[key]) links[key] = [];

  const title = item.data.title ?? file.replace(".json", "");
  links[key].push({
    title,
    path: item.path,
    dupType: item.dupType ?? 1,
  });
}

for (const [key, items] of Object.entries(links)) {
  items.sort((a, b) => a.path.localeCompare(b.path));
  console.log(`\n## ${key}`);
  for (const item of items) {
    const href = `/ravikishan-notes/${encodeURIComponent(item.path)}`;
    const dup = item.dupType > 1 ? ` (Type-${item.dupType})` : "";
    console.log(`- [${item.title}](${href})${dup}`);
  }
}
