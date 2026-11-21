"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { LayoutGrid, X } from "lucide-react";
import { useSession } from "@/features/auth/hooks/use-session";
import { QUICK_TOOLS, setActiveQuickTool } from "@/features/shell/quick-tools";

/**
 * One button. The first click lists the tools. The next click opens that tool.
 */
export function QuickToolsLauncher() {
  const pathname = usePathname() ?? "/";
  const { user, isLoading } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const tools = QUICK_TOOLS.filter((tool) => !isLoading && tool.visible(pathname, user));

  if (tools.length === 0) return null;

  return (
    <div className="fixed bottom-safe right-3 z-[60] flex flex-col items-end gap-2 sm:right-4">
      {menuOpen ? (
        <ul
          className="flex w-[min(calc(100vw-1.5rem),18rem)] flex-col gap-1 rounded-xl border border-border bg-card p-1.5 shadow-xl"
          aria-label="Quick tools"
        >
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <li key={tool.id}>
                <button
                  type="button"
                  aria-label={tool.openLabel}
                  onClick={() => {
                    setActiveQuickTool(tool.id);
                    setMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left hover:bg-muted"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-background">
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold">{tool.label}</span>
                    <span className="block truncate text-xs text-muted-foreground">{tool.detail}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}

      <button
        type="button"
        aria-expanded={menuOpen}
        aria-label={menuOpen ? "Close quick tools" : "Quick tools"}
        onClick={() => {
          setActiveQuickTool(null);
          setMenuOpen((open) => !open);
        }}
        className="flex h-14 items-center gap-2 rounded-2xl border border-border bg-foreground px-4 text-background shadow-lg"
      >
        {menuOpen ? <X className="h-5 w-5" /> : <LayoutGrid className="h-5 w-5" />}
        <span className="text-xs font-semibold tracking-wide">{menuOpen ? "Close" : "Quick tools"}</span>
      </button>
    </div>
  );
}
