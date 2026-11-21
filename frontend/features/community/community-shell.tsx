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
    <div
      className={cn(
        "mx-auto w-full max-w-[1280px] px-4 py-4 sm:px-6 sm:py-6",
        className,
      )}
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-5 xl:gap-6">
        {active ? (
          <CommunitySubnav active={active} savedCount={savedCount} className="lg:w-[200px]" />
        ) : null}
        <div className="min-w-0 flex-1 space-y-4">{children}</div>
        <CommunityDiscoveryRail className="hidden w-[260px] shrink-0 xl:block" />
      </div>
    </div>
  );
}