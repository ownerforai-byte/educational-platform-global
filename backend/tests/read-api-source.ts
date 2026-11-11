import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Read API route source for contract pins. After Phase 2 grouping, the flat
 * `src/api/<name>.ts` paths are re-export shims — this follows them to the
 * domain controller implementation.
 */
export function readApiSource(relativePath: string): string {
  const trimmed = relativePath
    .replace(/\\/g, "/")
    .replace(/^(\.\.\/)+src\/api\//, "")
    .replace(/^src\/api\//, "");

  const apiRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../src/api");
  const shimPath = path.join(apiRoot, trimmed);
  let src = readFileSync(shimPath, "utf8");

  const reExport = src.match(/(?:export \* from|export \{ default \} from) ["']\.\/([^"']+)["']/);
  if (reExport) {
    const impl = path.join(apiRoot, reExport[1].replace(/\.js$/, ".ts"));
    if (existsSync(impl)) {
      src = readFileSync(impl, "utf8");
    }
  }

  return src;
}
