"use client";

import Link from "next/link";
import {
  CircleUser,
  LogIn,
  LogOut,
  Menu,
  User,
  GraduationCap,
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

export function Header() {
  const { user, refresh } = useSession();

  const isLoggedIn = !!user;

  const handleLogout = async () => {
    await logoutAction();
    refresh();
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center gap-2 px-3 sm:px-4 md:px-6">
        <div className="flex items-center gap-1.5 min-w-0 shrink sm:max-w-none max-w-[45vw]">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden shrink-0"
            onClick={() => window.dispatchEvent(new CustomEvent("ravikisan:toggle-sidebar"))}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Link
            href="/"
            className="flex min-w-0 items-center gap-2 hover:opacity-80 transition-opacity group"
          >
            <div className="h-8 w-8 shrink-0 rounded-lg bg-primary flex items-center justify-center transition-transform group-hover:scale-110">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="truncate font-bold text-lg tracking-tight">Platform</span>
          </Link>
        </div>

        <div className="flex items-center gap-2 flex-1 min-w-0" />

        <div className="flex items-center gap-1 shrink-0">
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Profile menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[12rem]">
              {isLoggedIn ? (
                <>
                  <DropdownMenuLabel className="truncate">
                    {user?.fullName || user?.email || "My account"}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/login">
                      <LogIn className="h-4 w-4" />
                      Log in
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/signup">
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
