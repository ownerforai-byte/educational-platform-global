"use client";

import { useRouter, usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface BackButtonProps {
  className?: string;
  variant?: "floating" | "inline";
  label?: string;
}

export function BackButton({
  className,
  variant = "floating",
  label = "Back",
}: BackButtonProps) {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Use native history back to preserve exact scroll position without top-to-bottom jumping
    if (typeof window !== "undefined" && window.history.length > 1) {
      window.history.back();
    } else {
      // Fallback: navigate to logical parent directory without forced scroll reset
      const segments = pathname.split("/").filter(Boolean);
      if (segments.length > 1) {
        segments.pop();
        router.push("/" + segments.join("/"), { scroll: false });
      } else {
        router.push("/", { scroll: false });
      }
    }
  };

  if (variant === "inline") {
    return (
      <button
        type="button"
        onClick={handleBack}
        className={cn(
          "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border/70 bg-card/80 hover:bg-muted text-xs font-semibold text-foreground transition-colors shadow-sm",
          className
        )}
        aria-label="Go back"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>{label}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleBack}
      className={cn(
        "fixed bottom-6 right-6 z-50 h-11 w-11 rounded-full shadow-lg",
        "flex items-center justify-center",
        "bg-primary text-primary-foreground",
        "hover:opacity-90 hover:scale-105 active:scale-95",
        "transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/40",
        className
      )}
      aria-label="Go back"
      title="Go back (preserves scroll position)"
    >
      <ArrowLeft className="h-5 w-5" />
    </button>
  );
}
