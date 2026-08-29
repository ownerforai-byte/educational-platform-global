"use client";

import dynamic from "next/dynamic";
import { Header } from "./header";
import { Footer } from "./footer";
import { Breadcrumbs } from "./breadcrumbs";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarNavigation } from "./sidebar-navigation";

export function AppShell({ children, breadcrumbs }: { children: React.ReactNode; breadcrumbs?: { label: string; href?: string }[] }) {
  const pathname = usePathname();
  const showBack = pathname !== "/";

  return (
    <div className="flex min-h-screen flex-col bg-gradient-premium">
      <Header />
      <div className="flex flex-1">
        <SidebarNavigation />
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {breadcrumbs && breadcrumbs.length > 0 && <Breadcrumbs items={breadcrumbs} />}
          {showBack && (
            <div className="mb-6">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.history.back()}
                className="flex items-center gap-1.5 btn"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </div>
          )}
          <div className="animate-fade-in">
            {children}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
