const fs = require("fs");
const p = "C:/Users/ASUS/Desktop/rn/frontend/lib/theorems.ts";
let t = fs.readFileSync(p, "utf8");
const eol = t.includes("\r\n") ? "\r\n" : "\n";
const anchor = "function slugifyFileName(name: string): string {";
if (!t.includes(anchor)) {
  console.log("ANCHOR NOT FOUND");
  process.exit(1);
}
const insert = [
  "/**",
  " * Read + parse a theorem JSON file with a statically-scoped path.",
  " *",
  " * The path is always inside the top-level content/ folder, so Turbopack does",
  " * not flag this as whole-project filesystem tracing (unlike a dynamic",
  " * readFile(join(process.cwd(), entry.filePath)) call inside a page).",
  " * Results are cached so static generation does not re-read the same file.",
  " */",
  "const theoremJsonCache = new Map<string, any>();",
  "",
  "export async function readTheoremContent(filePath: string): Promise<any> {",
  "  const cached = theoremJsonCache.get(filePath);",
  "  if (cached !== undefined) return cached;",
  "",
  "  const abs = join(process.cwd(), \"content\", filePath);",
  "  let parsed: any = null;",
  "  try {",
  "    const raw = await readFile(abs, \"utf-8\");",
  "    parsed = JSON.parse(raw);",
  "  } catch {",
  "    // Missing or invalid file - caller falls back to entry metadata",
  "  }",
  "  theoremJsonCache.set(filePath, parsed);",
  "  return parsed;",
  "}",
  "",
].join(eol);
t = t.replace(anchor, insert + anchor);
fs.writeFileSync(p, t);
console.log("inserted readTheoremContent into theorems.ts");
