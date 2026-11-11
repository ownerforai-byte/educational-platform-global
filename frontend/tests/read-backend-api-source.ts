import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
const backendApiRoot = path.resolve(process.cwd(), "../backend/src/api");

/** Follow Phase-2 API re-export shims to the domain controller source. */
export function readBackendApiSource(file: string): string {
  const shimPath = path.join(backendApiRoot, file);
  let src = readFileSync(shimPath, "utf8");
  const reExport = src.match(/(?:export \* from|export \{ default \} from) ["']\.\/([^"']+)["']/);
  if (reExport) {
    const impl = path.join(backendApiRoot, reExport[1].replace(/\.js$/, ".ts"));
    if (existsSync(impl)) {
      src = readFileSync(impl, "utf8");
    }
  }
  return src;
}
