import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import {
  AUTH_INVALID_CREDENTIALS,
  AUTH_TEMPORARILY_UNAVAILABLE,
  AUTH_TEMPORARY_ERROR_MS,
} from "@/features/auth/public-messages";
import { useAuthFormError } from "@/features/auth/use-auth-form-error";

describe("useAuthFormError", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("clears temporarily unavailable after 3 seconds", () => {
    const onTemporaryCleared = vi.fn();
    const { result } = renderHook(() =>
      useAuthFormError("", { onTemporaryCleared }),
    );

    act(() => {
      result.current.setError(AUTH_TEMPORARILY_UNAVAILABLE);
    });
    expect(result.current.error).toBe(AUTH_TEMPORARILY_UNAVAILABLE);

    act(() => {
      vi.advanceTimersByTime(AUTH_TEMPORARY_ERROR_MS);
    });

    expect(result.current.error).toBe("");
    expect(onTemporaryCleared).toHaveBeenCalledOnce();
  });

  it("keeps invalid-credentials copy until clearError", () => {
    const { result } = renderHook(() => useAuthFormError());

    act(() => {
      result.current.setError(AUTH_INVALID_CREDENTIALS);
    });

    act(() => {
      vi.advanceTimersByTime(AUTH_TEMPORARY_ERROR_MS + 1000);
    });

    expect(result.current.error).toBe(AUTH_INVALID_CREDENTIALS);

    act(() => {
      result.current.clearError();
    });
    expect(result.current.error).toBe("");
  });
});
