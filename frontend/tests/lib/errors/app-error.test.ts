import { afterEach, describe, expect, it, vi } from "vitest";
import {
  AppError,
  asAppError,
  classifyStatus,
  createTimeoutSignal,
  getErrorCode,
  getErrorId,
  getErrorMessage,
  getErrorStatus,
  getStatusToken,
  hasErrorCode,
  isAbortError,
  isAppError,
  isNetworkError,
  isRetryableError,
  isRetryableStatus,
  reportClientError,
  retryWithBackoff,
  runSafely,
  runSafelyAsync,
  safeJsonParse,
} from "@/lib/errors/app-error";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("classifyStatus", () => {
  it("maps the status families the API layer already emits", () => {
    expect(classifyStatus(401)).toBe("unauthorized");
    expect(classifyStatus(403)).toBe("forbidden");
    expect(classifyStatus(404)).toBe("not-found");
    expect(classifyStatus(429)).toBe("rate-limit");
    expect(classifyStatus(503)).toBe("server");
    expect(classifyStatus(422)).toBe("client");
    expect(classifyStatus(undefined)).toBe("unknown");
  });
});

describe("isRetryableStatus", () => {
  it("only treats transient statuses as retryable", () => {
    expect(isRetryableStatus(502)).toBe(true);
    expect(isRetryableStatus(429)).toBe(true);
    expect(isRetryableStatus(400)).toBe(false);
    expect(isRetryableStatus(404)).toBe(false);
  });
});

describe("asAppError", () => {
  it("returns the same instance when given an AppError", () => {
    const original = new AppError("boom");
    expect(asAppError(original)).toBe(original);
    expect(isAppError(original)).toBe(true);
  });

  it("preserves status/code/errorId/statusToken attached by api-client", () => {
    const thrown = Object.assign(new Error("Pending approval"), {
      status: 403,
      code: "PENDING_APPROVAL",
      errorId: "err_123",
      statusToken: "tok_abc",
    });

    const normalized = asAppError(thrown);

    expect(normalized.kind).toBe("forbidden");
    expect(normalized.status).toBe(403);
    expect(normalized.code).toBe("PENDING_APPROVAL");
    expect(normalized.errorId).toBe("err_123");
    expect(normalized.statusToken).toBe("tok_abc");
    expect(normalized.original).toBe(thrown);
    expect(getErrorStatus(normalized)).toBe(403);
    expect(getErrorCode(normalized)).toBe("PENDING_APPROVAL");
    expect(getErrorId(normalized)).toBe("err_123");
    expect(getStatusToken(normalized)).toBe("tok_abc");
    expect(hasErrorCode(normalized, "PENDING_APPROVAL")).toBe(true);
  });

  it("classifies transport failures and aborts without throwing", () => {
    expect(asAppError(new TypeError("Failed to fetch")).kind).toBe("network");
    expect(asAppError({ name: "AbortError" }).kind).toBe("abort");
    expect(asAppError(undefined).kind).toBe("unknown");
    expect(getErrorMessage(undefined)).toBe("Something went wrong");
    expect(getErrorMessage("plain string error")).toBe("plain string error");
  });
});

describe("error predicates", () => {
  it("recognises abort and network shapes through the guards", () => {
    expect(isAbortError({ name: "AbortError" })).toBe(true);
    expect(isAbortError(new Error("nope"))).toBe(false);
    expect(isNetworkError(new TypeError("fetch failed"))).toBe(true);
    expect(isNetworkError(new Error("Failed to fetch"))).toBe(true);
    expect(isNetworkError(new AppError("x", { status: 500 }))).toBe(false);
  });

  it("retries only transient failures", () => {
    expect(isRetryableError(new AppError("down", { status: 503 }))).toBe(true);
    expect(isRetryableError(new AppError("bad", { status: 400 }))).toBe(false);
    expect(isRetryableError(new AppError("stop", { kind: "abort" }))).toBe(false);
  });
});

describe("safeJsonParse", () => {
  it("returns a result tuple instead of throwing", () => {
    const ok = safeJsonParse<{ a: number }>('{"a":1}');
    expect(ok.ok).toBe(true);
    if (ok.ok) expect(ok.value.a).toBe(1);

    const bad = safeJsonParse("{not json");
    expect(bad.ok).toBe(false);
    if (!bad.ok) expect(bad.error.kind).toBe("parse");

    expect(safeJsonParse(42).ok).toBe(false);
  });
});

describe("runSafely / runSafelyAsync", () => {
  it("captures sync and async failures as AppErrors", async () => {
    expect(runSafely(() => 2).ok).toBe(true);

    const failed = runSafely(() => {
      throw new Error("sync boom");
    });
    expect(failed.ok).toBe(false);
    if (!failed.ok) expect(failed.error.message).toBe("sync boom");

    const asyncFailed = await runSafelyAsync(async () => {
      throw Object.assign(new Error("async boom"), { status: 500 });
    });
    expect(asyncFailed.ok).toBe(false);
    if (!asyncFailed.ok) expect(asyncFailed.error.status).toBe(500);
  });
});

describe("retryWithBackoff", () => {
  it("retries transient failures and resolves on the retry", async () => {
    let calls = 0;
    const value = await retryWithBackoff(
      async () => {
        calls += 1;
        if (calls === 1) throw Object.assign(new Error("cold start"), { status: 503 });
        return "ok";
      },
      { attempts: 3, baseDelayMs: 1, maxDelayMs: 2 },
    );

    expect(value).toBe("ok");
    expect(calls).toBe(2);
  });

  it("does not retry permanent failures", async () => {
    let calls = 0;
    await expect(
      retryWithBackoff(
        async () => {
          calls += 1;
          throw Object.assign(new Error("not found"), { status: 404 });
        },
        { attempts: 3, baseDelayMs: 1 },
      ),
    ).rejects.toThrow("not found");
    expect(calls).toBe(1);
  });

  it("honours an already-aborted signal", async () => {
    const controller = new AbortController();
    controller.abort();
    await expect(
      retryWithBackoff(
        async () => {
          throw new AppError("network", { kind: "network" });
        },
        { attempts: 3, baseDelayMs: 1, signal: controller.signal },
      ),
    ).rejects.toBeInstanceOf(AppError);
  });
});

describe("createTimeoutSignal", () => {
  it("aborts with a timeout AppError and reports timedOut", () => {
    vi.useFakeTimers();
    try {
      const timeout = createTimeoutSignal(50);
      expect(timeout.timedOut()).toBe(false);
      vi.advanceTimersByTime(60);
      expect(timeout.timedOut()).toBe(true);
      expect(timeout.signal.aborted).toBe(true);
      timeout.clear();
    } finally {
      vi.useRealTimers();
    }
  });

  it("propagates a parent abort without flagging a timeout", () => {
    const parent = new AbortController();
    const timeout = createTimeoutSignal(10_000, parent.signal);
    parent.abort();
    expect(timeout.signal.aborted).toBe(true);
    expect(timeout.timedOut()).toBe(false);
    timeout.clear();
  });
});

describe("reportClientError", () => {
  it("normalizes and returns the error without throwing", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    const result = reportClientError("unit-test", Object.assign(new Error("x"), { status: 429 }));
    expect(result).toBeInstanceOf(AppError);
    expect(result.kind).toBe("rate-limit");
    expect(spy).toHaveBeenCalled();
  });

  it("never throws even for exotic input", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => reportClientError("unit-test", undefined)).not.toThrow();
  });
});
