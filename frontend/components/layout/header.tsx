"use client";

import Link from "next/link";
import {
  Menu,
  GraduationCap,
  CircleUser,
  LogOut,
  User,
  Search,
  Sparkles,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { logoutAction } from "@/features/auth/actions";
import { useSession } from "@/features/auth/hooks/use-session";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { CreditBadge } from "./credit-badge";
import { GlobalSearch } from "./global-search";

export function Header() {
  const { user, refresh } = useSession();
  const isLoggedIn = !!user;

  const handleLogout = async () => {
    await logoutAction();
    refresh();
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border/40 bg-background/70 backdrop-blur-2xl supports-[backdrop-filter]:bg-background/50">
      <div className="mx-auto flex h-12 md:h-14 max-w-[1440px] items-center gap-2 px-4 md:px-6">
        {/* Logo area */}
        <div className="flex items-center gap-2 min-w-0">
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 h-8 w-8 rounded-xl md:hidden"
            onClick={() => window.dispatchEvent(new CustomEvent("ravikisan:toggle-sidebar"))}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2 rounded-xl px-1.5 py-1 transition-all hover:bg-muted/60 group"
          >
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/70 shadow-md shadow-primary/20 transition-transform group-hover:scale-105">
              <GraduationCap className="h-4 w-4 text-white" />
            </div>
            <span className="hidden sm:block text-sm font-bold tracking-tight text-foreground whitespace-nowrap">
              Ravikisan&apos;s Platform
            </span>
          </Link>
        </div>

        {/* Center spacer with search */}
        <div className="flex-1 flex justify-center min-w-0 px-2">
          <GlobalSearch />
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-1.5 shrink-0">
          {isLoggedIn && <CreditBadge />}

          <ThemeToggle />

          <Link
            href="/chat"
            className="inline-flex items-center gap-1.5 px-2.5 h-8 rounded-xl bg-gradient-to-r from-primary to-primary/70 text-xs font-semibold text-primary-foreground shadow-sm hover:opacity-90 transition-opacity whitespace-nowrap"
            title="Ask the AI study assistant"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span className="hidden xs:inline">AI Tutor</span>
            <span className="xs:hidden">AI</span>
          </Link>

          <div className="ml-1 h-4 w-px bg-border/60" />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-xl shrink-0"
              >
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Profile menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[14rem] rounded-2xl border border-border/60 bg-background/95 backdrop-blur-xl p-2 shadow-xl">
              {isLoggedIn ? (
                <>
                  <DropdownMenuLabel className="flex items-center gap-2.5 px-2 py-2.5 font-semibold">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <span className="text-xs font-bold text-primary">
                        {(user?.fullName || user?.email || "U").charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="truncate text-sm">
                        {user?.fullName || user?.email || "Student"}
                      </span>
                      <span className="text-xs text-muted-foreground capitalize">
                        {user?.role?.toLowerCase() || "student"}
                      </span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="my-1" />
                  <DropdownMenuItem asChild className="rounded-lg cursor-pointer">
                    <Link href="/progress" className="flex items-center gap-2.5 w-full">
                      <User className="h-4 w-4" />
                      My Progress
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="rounded-lg cursor-pointer">
                    <Link href="/bookmarks" className="flex items-center gap-2.5 w-full">
                      <User className="h-4 w-4" />
                      Bookmarks
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="rounded-lg cursor-pointer">
                    <Link href="/credits" className="flex items-center gap-2.5 w-full">
                      <CreditBadge />
                      My Credits
                    </Link>
                  </DropdownMenuItem>
                  {(user?.role === "ADMIN" || user?.role === "OWNER") && (
                    <>
                      <DropdownMenuSeparator className="my-1" />
                      <DropdownMenuItem asChild className="rounded-lg cursor-pointer">
                        <Link href="/admin" className="flex items-center gap-2.5 w-full">
                          <User className="h-4 w-4" />
                          Admin Panel
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild className="rounded-lg cursor-pointer">
                        <Link href="/controller" className="flex items-center gap-2.5 w-full">
                          <User className="h-4 w-4" />
                          Controller
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator className="my-1" />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="rounded-lg cursor-pointer text-red-500 focus:text-red-500"
                  >
                    <LogOut className="h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild className="rounded-lg cursor-pointer">
                    <Link href="/login" className="flex items-center gap-2.5 w-full">
                      <User className="h-4 w-4" />
                      Log in
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="rounded-lg cursor-pointer">
                    <Link href="/signup" className="flex items-center gap-2.5 w-full">
                      <User className="h-4 w-4" />
                      Sign up
                    </Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
