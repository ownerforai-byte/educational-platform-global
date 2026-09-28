import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { collectRoutes, isResolvable } from "../helpers/route-tree";

/**
 * Source-wide link guard.
 *
 * Every hardcoded internal link (href="…", router.push("…"), redirect("…")) in
 * the app must resolve to a real page, an asset in public/ or a backend /api
 * endpoint. A link to a route that does not exist falls through to the shared
 * not-found page — so several dead links look to the user like "everything
 * opens the same page".
 *
 * Template links (href={`/lab/${id}`}) are skipped on purpose: their targets
 * come from registries that have their own tests.
 */

const SOURCE_DIRS = ["app", "components", "features", "lib", "providers"];

const PATTERNS: RegExp[] = [
  /href=\{?\s*["'](\/[^"'{}\s]*)["']/g,
  /(?:router\.(?:push|replace)|redirect)\(\s*["'](\/[^"'{}]*)["']/g,
];

function collectSourceFiles(dir: string, acc: string[] = []): string[] {
  let entries: string[];
  try {
    entries = readdirSync(dir);
  } catch {
    return acc;
  }
  for (const name of entries) {
    if (name.startsWith(".") || name === "node_modules") continue;
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) {
      collectSourceFiles(full, acc);
    } else if (/\.(ts|tsx|js|jsx)$/.test(name) && !/\.test\./.test(name)) {
      acc.push(full);
    }
  }
  return acc;
}

function scanLinks(): { file: string; line: number; href: string }[] {
  const found: { file: string; line: number; href: string }[] = [];
  for (const dir of SOURCE_DIRS) {
    for (const file of collectSourceFiles(path.resolve(dir))) {
      const lines = readFileSync(file, "utf8").split(/\r?\n/);
      lines.forEach((text, index) => {
        for (const pattern of PATTERNS) {
          pattern.lastIndex = 0;
          let match: RegExpExecArray | null;
          while ((match = pattern.exec(text)) !== null) {
            found.push({ file: path.relative(process.cwd(), file), line: index + 1, href: match[1] });
          }
        }
      });
    }
  }
  return found;
}

const links = scanLinks();
const routes = collectRoutes();

describe("internal links", () => {
  it("scans a meaningful number of links (the scanner must not match nothing)", () => {
    expect(links.length).toBeGreaterThan(50);
    expect(routes.length).toBeGreaterThan(50);
  });

  it("every hardcoded internal link resolves to a real page", () => {
    const broken = links
      .filter((link) => !isResolvable(link.href, routes))
      .map((link) => `${link.file}:${link.line} → ${link.href}`);

    expect(broken, `links to non-existent routes:\n${broken.join("\n")}`).toEqual([]);
  });

  it("keeps link targets to app routes and API endpoints only", () => {
    // Anything that looks like a protocol-relative or absolute URL inside an
    // href would bypass the resolver above.
    const suspicious = links.filter((link) => link.href.startsWith("//"));
    expect(suspicious).toEqual([]);
  });
});
