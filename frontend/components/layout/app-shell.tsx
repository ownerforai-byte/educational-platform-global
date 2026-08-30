"use client";

import { useState } from "react";
import { Header } from "./header";
import { Footer } from "./footer";
import { Breadcrumbs } from "./breadcrumbs";
import { MobileNav } from "./mobile-nav";
import { usePathname } from "next/navigation";
import { SidebarNavigation } from "./sidebar-navigation";
import { BackButton } from "@/components/navigation/back-button";
import { Menu, PanelLeftClose, PanelLeftOpen } from "lucide-react";

export function AppShell({ children, breadcrumbs }: { children: React.ReactNode; breadcrumbs?: { label: string; href?: string }[] }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden p-2 rounded-md hover:bg-accent"
          aria-label="Toggle sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="hidden lg:flex p-2 rounded-md hover:bg-accent"
          aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {sidebarCollapsed ? <PanelLeftOpen className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
        </button>
      </Header>
      <MobileNav />
      <div className="flex flex-1 relative">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        {/* Sidebar */}
        <aside
          className={`
            fixed lg:static inset-y-16 left-0 z-50
            w-64 flex-shrink-0
            ${sidebarCollapsed ? "lg:w-16" : "lg:w-64"}
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
            lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)]
            bg-card border-r transition-transform duration-200 ease-in-out
          `}
        >
          <SidebarNavigation collapsed={sidebarCollapsed} />
        </aside>
        {/* Main content */}
        <main className="flex-1 min-w-0 px-4 py-6 md:px-8 lg:px-8">
          {breadcrumbs && breadcrumbs.length > 0 && <Breadcrumbs items={breadcrumbs} />}
          <div className="animate-fade-in">
            {children}
          </div>
        </main>
      </div>
      {isHome && <Footer />}
      <BackButton />
    </div>
  );
}
