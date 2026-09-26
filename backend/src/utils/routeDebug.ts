import type { Express } from "express";
import { isProductionEnv } from "../config/env";

/**
 * Route-table dump for local debugging.
 *
 * This used to run inline in `createApp()` whenever `NODE_ENV` was not
 * production, which meant every dev boot printed the whole routing table (and
 * advertised which endpoints exist). Debug output must default to OFF, so it
 * now requires an explicit `ROUTE_DEBUG=true` — and never runs in production.
 */
export function routeDebugEnabled(): boolean {
  if (isProductionEnv()) return false;
  return process.env.ROUTE_DEBUG === "true" || process.env.ROUTE_DEBUG === "1";
}

/** Express's internal router stack — untyped by design. */
interface StackLayer {
  route?: { methods?: Record<string, boolean>; path?: string };
  name?: string;
  regexp?: RegExp;
}

function dump(app: Express, label: string): void {
  const stack = (app as unknown as { _router?: { stack?: StackLayer[] } })._router?.stack;
  if (!Array.isArray(stack)) return;

  console.log(`\n=== ${label} ===`);
  for (const layer of stack) {
    if (layer.route) {
      const methods = layer.route.methods ? Object.keys(layer.route.methods).join(", ") : "use";
      console.log(`  ${methods.padEnd(7)} ${layer.route.path ?? ""}`);
    } else if (layer.name === "router") {
      console.log(`  [Router] ${String(layer.regexp)}`);
    } else {
      console.log(`  [Middleware] type=${layer.name || "unknown"}`);
    }
  }
  console.log("=== END ===\n");
}

/** Log the registered route table when ROUTE_DEBUG is explicitly enabled. */
export function logRegisteredRoutes(app: Express, label = "REGISTERED ROUTES"): void {
  if (!routeDebugEnabled()) return;
  dump(app, label);
}
