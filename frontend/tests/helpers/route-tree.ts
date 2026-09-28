import { readdirSync, statSync, existsSync } from "node:fs";
import path from "node:path";

/**
 * Shared helper for the route guard tests.
 *
 * Reads the real Next route tree out of app/ so tests can assert that the
 * navigation menu and every hardcoded link in the source point at a page that
 * actually exists — a link to a missing route silently falls through to the
 * shared not-found page, which is exactly how several nav entries ended up
 * "opening the same page".
 */

const APP_DIR = path.resolve("app");
const PUBLIC_DIR = path.resolve("public");

/** Every route in app/, as URL segments (route-group folders are skipped). */
export function collectRoutes(): string[][] {
  const routes: string[][] = [];

  const walk = (dir: string, parts: string[]) => {
    let entries: string[];
    try {
      entries = readdirSync(dir);
    } catch {
      return;
    }
    for (const name of entries) {
      const full = path.join(dir, name);
      if (statSync(full).isDirectory()) {
        const isRouteGroup = name.startsWith("(") && name.endsWith(")");
        walk(full, isRouteGroup ? parts : [...parts, name]);
      } else if (name === "page.tsx") {
        routes.push(parts);
      }
    }
  };

  walk(APP_DIR, []);
  return routes;
}

/** Does `href` resolve to a route in the tree? Supports [param] segments. */
export function routeExists(href: string, routes: string[][] = collectRoutes()): boolean {
  const parts = href
    .split("?")[0]
    .split("#")[0]
    .split("/")
    .filter(Boolean);
  return routes.some((route) => matches(route, parts));
}

function matches(route: string[], parts: string[]): boolean {
  let used = 0;
  for (const seg of route) {
    if (seg.startsWith("[[...") || seg.startsWith("[...")) {
      const optional = seg.startsWith("[[...");
      return optional || parts.length > used;
    }
    if (used >= parts.length) return false;
    if (seg.startsWith("[")) {
      used += 1;
      continue;
    }
    if (seg !== parts[used]) return false;
    used += 1;
  }
  return used === parts.length;
}

/** Static assets under public/ (e.g. /manifest.json) — not routes. */
export function isPublicFile(href: string): boolean {
  const clean = href.split("?")[0].split("#")[0];
  if (!path.extname(clean)) return false;
  return existsSync(path.join(PUBLIC_DIR, clean.slice(1)));
}

/**
 * A link is valid when it resolves to a route, an actual public asset, or an
 * API endpoint (handled by the backend, not this route tree).
 */
export function isResolvable(href: string, routes?: string[][]): boolean {
  if (href === "/" || href.startsWith("/api/")) return true;
  if (isPublicFile(href)) return true;
  return routeExists(href, routes);
}
