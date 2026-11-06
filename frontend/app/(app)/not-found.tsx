"use client";

import { usePathname } from "next/navigation";
import { ErrorPage } from "@/components/errors/error-page";

/**
 * In-app 404 boundary.
 *
 * Non-lab routes keep the AppShell with the compact ErrorPage. Lab-owned
 * routes keep the previous root-style full-screen 404: a fixed layer covers
 * the shell so this shared boundary does not change the surface another
 * agent is working on. No lab file or lab-specific error component is edited.
 */
export default function NotFound() {
  const pathname = usePathname();
  const isLabRoute = pathname === "/lab" || pathname?.startsWith("/lab/");

  if (isLabRoute) {
    return (
      <div
        className="fixed inset-0 z-[100] overflow-y-auto bg-background"
        data-lab-404=""
      >
        <ErrorPage variant="404" />
      </div>
    );
  }

  return <ErrorPage variant="404" compact />;
}
