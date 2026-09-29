"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { AIChatInterface } from "@/components/ai/ai-chat-interface";
import { CaptainMark } from "@/components/ai/captain-logo";

/**
 * Floating AI chat launcher (bottom-left corner).
 *
 * The panel integrates the FULL chat interface (AIChatInterface) with all of
 * its features: per-conversation chat history for signed-in users AND guests,
 * colorful typing dots, copy/enhance/regenerate, quota badges and the header's
 * green live dot. Owner rules: the launcher button stays, the green animating
 * dot inside the header stays — never remove either.
 */
export function AIWidget() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  return (
    <>
      {/* Floating toggle button — bottom-left */}
      <button
        onClick={() => setOpen(!open)}
        className={`fixed bottom-6 left-6 z-50 h-14 w-14 rounded-full shadow-lg flex items-center justify-center transition-all ${
          open
            ? "bg-red-500 hover:bg-red-600"
            : "bg-gradient-to-br from-primary to-primary/70 hover:scale-105"
        }`}
        aria-label="Toggle Veer chat"
      >
        {open ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <CaptainMark className="h-7 w-7 text-white" />
        )}
      </button>

      {/* Chat panel — its own panel, full interface inside */}
      {open && (
        <div
          className="fixed bottom-24 left-6 z-50 w-[min(760px,calc(100vw-3rem))] rounded-2xl border border-border bg-card shadow-2xl overflow-hidden"
          style={{ height: "min(640px, calc(100vh - 8rem))" }}
          role="dialog"
          aria-label="Veer"
        >
          <AIChatInterface embedded />
        </div>
      )}
    </>
  );
}
