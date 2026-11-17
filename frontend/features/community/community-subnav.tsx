"use client";

import Link from "next/link";
import {
  Bookmark,
  ChevronDown,
  GraduationCap,
  MessageSquare,
  Radio,
  UserRound,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { chipBtn } from "@/features/community/community-ui";
import { cn } from "@/lib/utils";

export type CommunityNavKey = "feed" | "saved" | "mine" | "spaces" | "chat";

interface NavItem {
  key: CommunityNavKey;
  label: string;
  href: string;
  icon: typeof MessageSquare;
  testId?: string;
}

const ITEMS: NavItem[] = [
  { key: "feed", label: "Public feed", href: "/ai/community", icon: MessageSquare },
  { key: "saved", label: "Saved posts", href: "/ai/community?view=saved", icon: Bookmark },
  { key: "mine", label: "My posts", href: "/ai/community/me", icon: UserRound },
  { key: "spaces", label: "Subject spaces", href: "/community", icon: GraduationCap },
  {
    key: "chat",
    label: "Lobby chat",
    href: "/ai/community/chat",
    icon: Radio,
    testId: "community-chat-link",
  },
];

export function CommunitySubnav({
  active,
  savedCount = 0,
  className,
}: {
  active: CommunityNavKey;
  savedCount?: number;
  className?: string;
}) {
  const current = ITEMS.find((item) => item.key === active) ?? ITEMS[0];
  const CurrentIcon = current.icon;

  return (
    <>
      {/* Mobile destination menu — avoids stacking a long sidebar above discussions */}
      <div className={cn("flex items-center justify-between gap-2 lg:hidden", className)}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className={cn(chipBtn, "min-h-11 px-3.5 text-sm font-semibold text-foreground")}
              aria-label="Community navigation"
            >
              <CurrentIcon className="h-4 w-4 text-primary" aria-hidden />
              <span>{current.label}</span>
              {active === "saved" && savedCount > 0 ? (
                <span className="rounded-full bg-primary/15 px-1.5 py-0.5 text-xs font-semibold tabular-nums text-primary">
                  {savedCount}
                </span>
              ) : null}
              <ChevronDown className="h-4 w-4 text-muted-foreground" aria-hidden />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56 rounded-xl p-1.5 shadow-elev-3">
            {ITEMS.map((item) => {
              const Icon = item.icon;
              const isSelected = item.key === active;
              return (
                <DropdownMenuItem key={item.key} asChild>
                  <Link
                    href={item.href}
                    aria-current={isSelected ? "page" : undefined}
                    className={cn(
                      "flex min-h-11 w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium",
                      isSelected
                        ? "bg-primary/10 font-semibold text-primary"
                        : "text-foreground",
                    )}
                  >
                    <span className="flex items-center gap-2.5">
                      <Icon className="h-4 w-4 shrink-0" aria-hidden />
                      {item.label}
                    </span>
                    {item.key === "saved" && savedCount > 0 ? (
                      <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-semibold tabular-nums text-muted-foreground">
                        {savedCount}
                      </span>
                    ) : null}
                  </Link>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Desktop narrow local navigation rail (200px) */}
      <nav
        aria-label="Community sections"
        className={cn(
          "hidden lg:block lg:w-[200px] lg:shrink-0",
          className,
        )}
      >
        <ul className="sticky top-20 space-y-1 rounded-2xl border border-border/70 bg-card p-3 shadow-elev-0">
          {ITEMS.map((item) => {
            const Icon = item.icon;
            const isSelected = item.key === active;
            return (
              <li key={item.key}>
                <Link
                  href={item.href}
                  data-testid={item.testId}
                  aria-current={isSelected ? "page" : undefined}
                  className={cn(
                    "flex min-h-11 items-center justify-between gap-2 rounded-xl px-3 py-2 text-[13px] font-medium transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isSelected
                      ? "bg-primary/12 font-semibold text-primary"
                      : "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
                  )}
                >
                  <span className="flex min-w-0 items-center gap-2.5 truncate">
                    <Icon
                      className={cn("h-4 w-4 shrink-0", isSelected ? "text-primary" : "text-muted-foreground")}
                      aria-hidden
                    />
                    <span className="truncate">{item.label}</span>
                  </span>
                  {item.key === "saved" && savedCount > 0 ? (
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-xs font-semibold tabular-nums",
                        isSelected ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground",
                      )}
                    >
                      {savedCount}
                    </span>
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
