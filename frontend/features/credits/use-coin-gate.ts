"use client";

import { useEffect, useState } from "react";
import { getPublicConfig } from "@/lib/api/config";

/**
 * Live coin-gate flag, mirrored from GET /api/config.
 *
 * `true`  — AI chat bills one credit per message (platform default).
 * `false` — the owner turned the gate OFF: chat is free for everyone, so the
 *           chat surfaces must NOT lock the composer on a zero balance.
 * `null`  — still loading; callers keep the existing behaviour (fail closed).
 */
export function useCoinGateEnabled(): boolean | null {
  const [enabled, setEnabled] = useState<boolean | null>(null);

  useEffect(() => {
    let active = true;
    getPublicConfig().then((cfg) => {
      if (active) setEnabled(cfg.coinGateEnabled);
    });
    return () => {
      active = false;
    };
  }, []);

  return enabled;
}
