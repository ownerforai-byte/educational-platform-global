"use client";

import { useEffect, useState } from "react";
import { getPublicConfig } from "@/lib/api/config";
import { COIN_GATE_EVENT } from "@/lib/coin-gate";

/**
 * Live coin-gate flag, mirrored from GET /api/config.
 *
 * `true`  — AI chat bills one credit per message (platform default).
 * `false` — the owner turned the gate OFF: chat is free for owner emails
 *           (students still pay), so owner surfaces must NOT lock the
 *           composer on a zero balance.
 * `null`  — still loading; callers keep the existing behaviour (fail closed).
 *
 * The flag controls OWNER emails only (single profile toggle). Students are
 * always billed. This hook refreshes on toggle broadcasts + polls every 15s
 * so a change lands without a page reload.
 */
export function useCoinGateEnabled(): boolean | null {
  const [enabled, setEnabled] = useState<boolean | null>(null);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const cfg = await getPublicConfig();
        if (active) setEnabled(cfg.coinGateEnabled);
      } catch {
        if (active) setEnabled((prev) => (prev !== null ? prev : true));
      }
    };
    const onChange = (e: Event) => {
      const detail = (e as CustomEvent<{ enabled?: unknown }>).detail;
      if (detail && typeof detail.enabled === "boolean") {
        setEnabled(detail.enabled);
      } else {
        void load();
      }
    };
    void load();
    window.addEventListener(COIN_GATE_EVENT, onChange);
    const id = window.setInterval(load, 15_000);
    return () => {
      active = false;
      window.removeEventListener(COIN_GATE_EVENT, onChange);
      window.clearInterval(id);
    };
  }, []);

  return enabled;
}
