import { describe, expect, it } from "vitest";
import {
  ERROR_PAGE_REGISTRY,
  ERROR_PAGE_VARIANTS,
  resolveErrorPageVariant,
} from "@/lib/errors/error-page";

describe("error page registry", () => {
  it("gives every variant distinct copy, icon, code, and treatment", () => {
    const definitions = ERROR_PAGE_VARIANTS.map((variant) => ERROR_PAGE_REGISTRY[variant]);

    for (const key of ["title", "description", "detail", "icon", "displayCode", "treatment"] as const) {
      expect(new Set(definitions.map((definition) => definition[key])).size).toBe(
        ERROR_PAGE_VARIANTS.length,
      );
    }
  });
});

describe("resolveErrorPageVariant", () => {
  it("prioritizes definite offline state over every error shape", () => {
    const error = Object.assign(new TypeError("failed to fetch"), { status: 503 });
    expect(resolveErrorPageVariant(error, { isOnline: false, fallback: "400" })).toBe("offline");
  });

  it.each([400, 401, 403, 404, 408, 429, 500, 502, 503, 504])(
    "uses exact HTTP status %i before transport or timeout classification",
    (status) => {
      const error = Object.assign(new TypeError("failed to fetch"), {
        status,
        name: "TimeoutError",
      });
      expect(resolveErrorPageVariant(error, { isOnline: true })).toBe(String(status));
    },
  );

  it("maps a timeout without a supported status to 408", () => {
    const error = new Error("request timed out");
    error.name = "TimeoutError";
    expect(resolveErrorPageVariant(error, { isOnline: true })).toBe("408");
  });

  it("maps an online transport failure to network", () => {
    expect(resolveErrorPageVariant(new TypeError("Failed to fetch"), { isOnline: true })).toBe(
      "network",
    );
  });

  it("uses the safe 500 variant for unknown failures and unsupported statuses", () => {
    expect(resolveErrorPageVariant(new Error("sensitive render detail"), { isOnline: true })).toBe(
      "500",
    );
    expect(
      resolveErrorPageVariant(Object.assign(new Error("teapot"), { status: 418 }), {
        isOnline: true,
      }),
    ).toBe("500");
  });

  it("uses the requested static variant only when there is no thrown error", () => {
    for (const variant of ERROR_PAGE_VARIANTS) {
      expect(resolveErrorPageVariant(undefined, { isOnline: true, fallback: variant })).toBe(
        variant,
      );
    }
  });
});
