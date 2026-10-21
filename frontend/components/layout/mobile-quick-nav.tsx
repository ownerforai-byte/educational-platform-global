"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

/**
 * Mobile quick-nav strip with the highest-traffic destinations.
 * The hamburger drawer remains the full menu; this is the compact fast path.
 */
const QUICK_LINKS = [
  { href: "/", label: "Home" },
  { href: "/search", label: "Search" },
  { href: "/class-11-notes", label: "Class 11" },
  { href: "/class-12-notes", label: "Class 12" },
  { href: "/subjects", label: "Subjects" },
  { href: "/lab", label: "Labs" },
  { href: "/quiz", label: "Quiz" },
  { href: "/chat", label: "AI" },
] as const;

export function MobileQuickNav() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/" || pathname === "/home"
      : pathname.startsWith(href);

  return (
    <nav
      aria-label="Quick navigation"
      className="no-scrollbar lg:hidden overflow-x-auto border-t border-border/40 bg-background"
    >
      <div className="flex items-center gap-1.5 px-3 py-2">
        {QUICK_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors",
              isActive(link.href)
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
