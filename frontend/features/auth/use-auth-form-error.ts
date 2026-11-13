"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AUTH_TEMPORARY_ERROR_MS,
  isTemporaryAuthError,
} from "./public-messages";

type UseAuthFormErrorOptions = {
  /** Called after a temporary error auto-clears (e.g. redirect off a dead-end screen). */
  onTemporaryCleared?: () => void;
};

/**
 * Auth form error state. "Temporarily unavailable" clears itself after 3s;
 * invalid credentials and validation copy stay until the next submit.
 */
export function useAuthFormError(
  initial = "",
  options?: UseAuthFormErrorOptions,
) {
  const [error, setErrorRaw] = useState(initial);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onClearedRef = useRef(options?.onTemporaryCleared);
  onClearedRef.current = options?.onTemporaryCleared;

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const clearError = useCallback(() => {
    clearTimer();
    setErrorRaw("");
  }, [clearTimer]);

  const setError = useCallback(
    (message: string) => {
      clearTimer();
      setErrorRaw(message);
      if (message && isTemporaryAuthError(message)) {
        timerRef.current = setTimeout(() => {
          timerRef.current = null;
          setErrorRaw("");
          onClearedRef.current?.();
        }, AUTH_TEMPORARY_ERROR_MS);
      }
    },
    [clearTimer],
  );

  useEffect(() => clearTimer, [clearTimer]);

  return { error, setError, clearError };
}
