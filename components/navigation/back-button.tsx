"use client";

import { useRouter, usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BackButton() {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      aria-label="Go back"
      onClick={() => router.back()}
    >
      <ArrowLeft className="mr-1 h-4 w-4" aria-hidden="true" />
      Back
    </Button>
  );
}
