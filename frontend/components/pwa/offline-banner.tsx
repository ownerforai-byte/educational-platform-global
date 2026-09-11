"use client";

import { useEffect, useState } from "react";
import { WifiOff } from "lucide-react";

/**
 * OfflineBanner — fixed banner shown while the user has no network.
 * Announced politely to screen readers via aria-live and disappears
 * automatically when connectivity returns.
 */
export function OfflineBanner() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const update = () => setIsOffline(!navigator.onLine);
    update();
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-center gap-2 bg-amber-500 px-4 py-2 text-sm font-medium text-amber-950"
    >
      <WifiOff className="h-4 w-4 shrink-0" aria-hidden="true" />
      You&apos;re offline — showing cached pages. Content will refresh when you
      reconnect.
    </div>
  );
}