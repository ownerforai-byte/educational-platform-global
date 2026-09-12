"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useSession } from "@/features/auth/hooks/use-session";
import {
  User,
  Crown,
  ShieldCheck,
  GraduationCap,
  BookOpen,
  LogOut,
  Coins,
  Bookmark,
  ChevronDown,
} from "lucide-react";

export function UserNav() {
  const { user, isLoading, logoutUser } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (isLoading) {
    return <div className="h-8 w-16 animate-pulse rounded-xl bg-muted/60" />;
  }

  if (!user) {
    return (
      <div className="flex items-center gap-1.5 shrink-0">
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 px-2.5 h-8 rounded-xl text-xs font-semibold hover:bg-muted transition-colors whitespace-nowrap"
        >
          Log in
        </Link>
        <Link
          href="/signup"
          className="inline-flex items-center gap-1.5 px-3 h-8 rounded-xl bg-primary text-xs font-semibold text-primary-foreground hover:opacity-90 shadow-sm transition-opacity whitespace-nowrap"
        >
          Sign up
        </Link>
      </div>
    );
  }

  // Derive display details
  const email = user.email || "";
  const displayName = user.fullName || email.split("@")[0] || "User";
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const role = user.role?.toUpperCase() || "STUDENT";

  const roleBadgeConfig: Record<string, { label: string; bg: string; text: string; icon: typeof Crown }> = {
    OWNER: {
      label: "Owner",
      bg: "bg-amber-500/15 border-amber-500/30",
      text: "text-amber-500",
      icon: Crown,
    },
    ADMIN: {
      label: "Admin",
      bg: "bg-rose-500/15 border-rose-500/30",
      text: "text-rose-500",
      icon: ShieldCheck,
    },
    TEACHER: {
      label: "Teacher",
      bg: "bg-blue-500/15 border-blue-500/30",
      text: "text-blue-500",
      icon: GraduationCap,
    },
    STUDENT: {
      label: "Student",
      bg: "bg-emerald-500/15 border-emerald-500/30",
      text: "text-emerald-500",
      icon: BookOpen,
    },
  };

  const badge = roleBadgeConfig[role] || roleBadgeConfig.STUDENT;
  const RoleIcon = badge.icon;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-2 p-1 pl-1.5 pr-2.5 rounded-2xl border border-border/80 bg-card hover:bg-muted/60 transition-all shadow-sm group"
        aria-label="User profile menu"
      >
        <div className="h-6 w-6 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-[10px] font-bold text-primary">
          {initials}
        </div>

        <span className="hidden sm:inline-block max-w-[110px] truncate text-xs font-semibold text-foreground text-left">
          {displayName}
        </span>

        <span
          className={`hidden xs:inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.2 rounded-md border ${badge.bg} ${badge.text}`}
        >
          <RoleIcon className="h-2.5 w-2.5" />
          <span>{badge.label}</span>
        </span>

        <ChevronDown className="h-3 w-3 text-muted-foreground group-hover:text-foreground transition-transform" />
      </button>

      {/* Dropdown Menu */}
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-border/80 bg-card/95 backdrop-blur-xl p-2 shadow-xl z-50 animate-fade-in text-xs space-y-1">
          <div className="px-3 py-2 border-b border-border/50">
            <p className="font-bold text-foreground truncate">{displayName}</p>
            <p className="text-[11px] text-muted-foreground truncate">{email}</p>
            <div className="mt-1.5 flex items-center justify-between">
              <span className={`inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded border ${badge.bg} ${badge.text}`}>
                <RoleIcon className="h-2.5 w-2.5" />
                <span>{badge.label} Tier</span>
              </span>
              {user.credits !== undefined && (
                <span className="text-[10px] font-mono text-muted-foreground flex items-center gap-1">
                  <Coins className="h-3 w-3 text-amber-500" />
                  <span>{user.credits} credits</span>
                </span>
              )}
            </div>
          </div>

          <div className="py-1">
            <Link
              href="/credits"
              onClick={() => setDropdownOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-foreground hover:bg-muted transition-colors font-medium"
            >
              <Coins className="h-3.5 w-3.5 text-primary" />
              <span>Credit Wallet</span>
            </Link>

            <Link
              href="/progress"
              onClick={() => setDropdownOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-foreground hover:bg-muted transition-colors font-medium"
            >
              <GraduationCap className="h-3.5 w-3.5 text-emerald-500" />
              <span>Learning Progress</span>
            </Link>

            <Link
              href="/bookmarks"
              onClick={() => setDropdownOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-foreground hover:bg-muted transition-colors font-medium"
            >
              <Bookmark className="h-3.5 w-3.5 text-blue-500" />
              <span>Saved Bookmarks</span>
            </Link>
          </div>

          <div className="pt-1 border-t border-border/50">
            <button
              onClick={async () => {
                setDropdownOpen(false);
                await logoutUser();
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-rose-500 hover:bg-rose-500/10 transition-colors font-semibold"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Log out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
