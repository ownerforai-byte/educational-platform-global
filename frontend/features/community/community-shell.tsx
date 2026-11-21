"use client";

import type { ReactNode } from "react";
import { CommunitySubnav, type CommunityNavKey } from "@/features/community/community-subnav";
import { CommunityDiscoveryRail } from "@/features/community/community-discovery-rail";
import { cn } from "@/lib/utils";

export type CommunityShellVariant = "timeline" | "focus";

interface CommunityShellProps {
  variant?: CommunityShellVariant;
  active?: CommunityNavKey;
  savedCount?: number;
  children: ReactNode;
  className?: string;
}

/** Three-column community chrome: nav · feed · discovery (xl+). Focus variant drops side rails. */
export function CommunityShell({
  variant = "timeline",
  active,
  savedCount = 0,
  children,
  className,
}: CommunityShellProps) {
  const isFocus = variant === "focus";

  if (isFocus) {
    return (
      <div className={cn("mx-auto w-full max-w-[800px] space-y-5 px-4 py-6 sm:px-6", className)}>
        {children}
      </div>
    );
  }

  return (
    <div className={cn("mx-auto w-full max-w-[1100px] px-3 py-3 sm:px-4", className)}>
      <div className="grid items-start gap-3 lg:grid-cols-[188px_minmax(0,1fr)] xl:grid-cols-[188px_minmax(0,1fr)_220px]">
        {active ? (
          <CommunitySubnav active={active} savedCount={savedCount} className="lg:sticky lg:top-3" />
        ) : null}
        <div className="min-w-0 space-y-2">{children}</div>
        <CommunityDiscoveryRail className="hidden xl:block" />
      </div>
    </div>
  );
}