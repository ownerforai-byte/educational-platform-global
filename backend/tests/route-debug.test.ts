import { afterEach, describe, expect, test, vi } from "vitest";
import type { Express } from "express";
import { logRegisteredRoutes, routeDebugEnabled } from "../src/utils/routeDebug";

/**
 * Express 5 dependency bump review (CodeRabbit, PR #19): the route-table dump
 * read Express 4's private `_router`, which Express 5 replaces with `app.router`.
 * Without this fix ROUTE_DEBUG=true silently prints nothing on Express 5.
 * These tests pin the ROUTE_DEBUG path against both router shapes.
 */
afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

function appWithStack(shape: "router" | "_router"): Express {
  const stack = [
    { route: { methods: { get: true }, path: "/api/health" } },
    { name: "router", regexp: /^\/api/ },
    { name: "corsMiddleware" },
  ];
  const holder =
    shape === "router" ? { router: { stack } } : { _router: { stack } };
  return holder as unknown as Express;
}

describe("routeDebug (ROUTE_DEBUG=true)", () => {
  test.each(["router", "_router"] as const)(
    "dumps registered routes for the Express %s shape",
    (shape) => {
      vi.stubEnv("NODE_ENV", "development");
      vi.stubEnv("ROUTE_DEBUG", "true");
      const spy = vi.spyOn(console, "log").mockImplementation(() => {});

      expect(routeDebugEnabled()).toBe(true);
      logRegisteredRoutes(appWithStack(shape), "TEST ROUTES");

      const output = spy.mock.calls.map((call) => call.join(" ")).join("\n");
      expect(output).toContain("TEST ROUTES");
      expect(output).toContain("get     /api/health");
      expect(output).toContain("[Router]");
      expect(output).toContain("[Middleware] type=corsMiddleware");
      expect(output).toContain("=== END ===");
    },
  );

  test("stays silent when ROUTE_DEBUG is not enabled", () => {
    vi.stubEnv("NODE_ENV", "development");
    vi.stubEnv("ROUTE_DEBUG", "false");
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});

    expect(routeDebugEnabled()).toBe(false);
    logRegisteredRoutes(appWithStack("router"));

    expect(spy).not.toHaveBeenCalled();
  });

  test("stays silent in production even when ROUTE_DEBUG=true", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("ROUTE_DEBUG", "true");
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});

    expect(routeDebugEnabled()).toBe(false);
    logRegisteredRoutes(appWithStack("router"));

    expect(spy).not.toHaveBeenCalled();
  });
});
