"use client";

import { Header } from "./header";
import { Footer } from "./footer";
import { Breadcrumbs } from "./breadcrumbs";
import { MobileNav } from "./mobile-nav";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarNavigation } from "./sidebar-navigation";
export function AppShell({ children, breadcrumbs }: { children: React.ReactNode; breadcrumbs?: { label: string; href?: string }[] }) {
  const pathname = usePathname();
  const showBack = pathname !== "/";
  const isHome = pathname === "/";

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <MobileNav />
      <div className="flex flex-1">
        <SidebarNavigation />
        <main className="flex-1 pt-6 pb-12 px-4 md:px-8 lg:pl-8 lg:px-8">
          {breadcrumbs && breadcrumbs.length > 0 && <Breadcrumbs items={breadcrumbs} />}
          {showBack && (
            <div className="mb-6">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.history.back()}
                className="flex items-center gap-1.5 btn rounded-xl border-border/60 hover:border-primary/30 hover:bg-primary/5"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            </div>
          )}
          <div className="animate-fade-in max-w-6xl">
            {children}
          </div>
        </main>
      </div>
      {isHome && <Footer />}
    </div>
  );
}
