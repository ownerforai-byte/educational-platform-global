"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Home,
  BookOpen,
  FlaskConical,
  LogIn,
  LogOut,
  X,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { logoutAction } from "@/features/auth/actions";
import { useSession } from "@/features/auth/hooks/use-session";

type NavItem = {
  href: string;
  label: string;
  icon: React.ElementType;
};

const navItems: NavItem[] = [
  { href: "/", label: "Home", icon: Home },
  { href: "/subjects", label: "Subjects", icon: Layers },
  { href: "/levels", label: "Curriculum", icon: BookOpen },
  { href: "/lab", label: "Lab", icon: FlaskConical },
];

export function SidebarNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const { user, refresh } = useSession();

  const isLoggedIn = !!user;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleToggleSidebar = () => setIsOpen((o) => !o);
    window.addEventListener("ravikisan:toggle-sidebar", handleToggleSidebar);
    return () => window.removeEventListener("ravikisan:toggle-sidebar", handleToggleSidebar);
  }, []);

  const handleLogout = async () => {
    await logoutAction();
    refresh();
    setIsOpen(false);
  };

  return (
    <>
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen border-r border-border/60 bg-background/95 backdrop-blur-xl transition-all duration-300",
          "lg:relative lg:top-auto lg:h-auto lg:z-auto lg:transition-all lg:duration-300",
          isOpen ? "w-64 translate-x-0" : "-translate-x-full lg:w-16 lg:translate-x-0"
        )}
        onMouseEnter={() => !isMobile && setIsOpen(true)}
        onMouseLeave={() => !isMobile && setIsOpen(false)}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-between px-4 border-b border-border/60">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">R</span>
              </div>
              {isOpen && (
                <span className="font-bold text-lg tracking-tight whitespace-nowrap">
                  Platform
                </span>
              )}
            </Link>
            {isOpen && (
              <Button
                variant="ghost"
                size="icon"
                className="hidden lg:flex h-8 w-8"
                onClick={() => setIsOpen(!isOpen)}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          <nav className="flex-1 space-y-1 p-2 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                    "hover:bg-muted/80",
                    isActive ? "bg-primary/10 text-primary" : "text-muted-foreground",
                    !isOpen && "lg:justify-center lg:px-2"
                  )}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  {isOpen && <span className="whitespace-nowrap">{item.label}</span>}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-border/60 p-2">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted/80 transition-all",
                  !isOpen && "lg:justify-center lg:px-2"
                )}
              >
                <LogOut className="h-5 w-5 shrink-0" />
                {isOpen && <span className="whitespace-nowrap">Logout</span>}
              </button>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted/80 transition-all",
                  !isOpen && "lg:justify-center lg:px-2"
                )}
              >
                <LogIn className="h-5 w-5 shrink-0" />
                {isOpen && <span className="whitespace-nowrap">Login</span>}
              </Link>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
