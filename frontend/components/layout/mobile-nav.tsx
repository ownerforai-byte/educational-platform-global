"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Home,
  BookOpen,
  FlaskConical,
  Layers,
  Globe,
  Landmark,
  User,
  LogIn,
  X,
  Menu,
} from "lucide-react";
import { usePathname } from "next/navigation";

const mobileItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/subjects", label: "Subjects", icon: Layers },
  { href: "/levels", label: "Curriculum", icon: BookOpen },
  { href: "/loksewa", label: "Loksewa", icon: Landmark },
  { href: "/world-knowledge", label: "World Knowledge", icon: Globe },
  { href: "/lab", label: "Lab", icon: FlaskConical },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Hamburger button — visible only on mobile (< lg) */}
      <div className="lg:hidden">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-xl"
          onClick={() => setOpen(true)}
          aria-label="Open navigation"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      {/* Slide-in sidebar overlay */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          {/* Panel */}
          <div className="absolute left-0 top-0 h-full w-72 border-r border-border/40 bg-background/95 backdrop-blur-2xl p-5 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70">
                  <span className="text-sm font-extrabold text-white">R</span>
                </div>
                <span className="font-bold text-sm tracking-tight">NEB Study Vault</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-xl"
                aria-label="Close navigation"
                onClick={() => setOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <nav className="flex-1 space-y-1">
              {mobileItems.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all ${
                      active
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                    }`}
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto pt-4 border-t border-border/40 space-y-2">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-muted-foreground hover:bg-muted/60 hover:text-foreground transition-all"
              >
                <LogIn className="h-5 w-5 shrink-0" />
                Login
              </Link>
              <Link
                href="/signup"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl bg-primary px-3 py-3 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
              >
                <User className="h-4 w-4" />
                Sign up free
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
