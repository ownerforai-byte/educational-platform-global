"use client";

import { useRouter, usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export function BackButton() {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  return (
    <button
      onClick={() => router.back()}
      className={cn(
        "fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full shadow-lg",
        "flex items-center justify-center",
        "bg-primary text-primary-foreground",
        "hover:opacity-90 hover:scale-105 active:scale-95",
        "transition-all duration-200"
      )}
      aria-label="Go back"
      title="Go back"
    >
      <ArrowLeft className="h-5 w-5" />
    </button>
  );
}
