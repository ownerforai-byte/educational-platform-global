"use client";

import { Header } from "./header";
import { Footer } from "./footer";
import { Breadcrumbs } from "./breadcrumbs";
import { MobileNav } from "./mobile-nav";
import { usePathname } from "next/navigation";
import { SidebarNavigation } from "./sidebar-navigation";
import { BackButton } from "@/components/navigation/back-button";

export function AppShell({ children, breadcrumbs }: { children: React.ReactNode; breadcrumbs?: { label: string; href?: string }[] }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <MobileNav />
      <div className="flex flex-1">
        <SidebarNavigation />
        <main className="flex-1 pt-6 pb-12 px-4 md:px-8 lg:pl-8 lg:px-8">
          {breadcrumbs && breadcrumbs.length > 0 && <Breadcrumbs items={breadcrumbs} />}
          <div className="animate-fade-in max-w-6xl">
            {children}
          </div>
        </main>
      </div>
      {isHome && <Footer />}
      <BackButton />
    </div>
  );
}
