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
  GraduationCap,
  UserCheck,
  Bookmark,
  Users,
  ShieldCheck,
  Coins,
  Crown,
  ChevronsDown,
  ChevronsUp,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { logoutAction } from "@/features/auth/actions";
import { useSession } from "@/features/auth/hooks/use-session";

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
};

const aiItems: NavItem[] = [
  { href: "/chat", label: "AI Assistant", icon: Sparkles, badge: "New" },
];

const browseItems: NavItem[] = [
  { href: "/", label: "Home", icon: Home },
  { href: "/subjects", label: "Subjects", icon: Layers },
  { href: "/lab", label: "Science Lab", icon: FlaskConical },
  { href: "/levels", label: "Curriculum", icon: BookOpen },
  { href: "/loksewa", label: "Loksewa", icon: Users },
  { href: "/world-knowledge", label: "World Knowledge", icon: GraduationCap },
];

const accountItems: NavItem[] = [
  { href: "/credits", label: "My Credits", icon: Coins },
  { href: "/progress", label: "My Progress", icon: UserCheck },
  { href: "/bookmarks", label: "Bookmarks", icon: Bookmark },
];

const adminItems: NavItem[] = [
  { href: "/admin", label: "Admin Panel", icon: ShieldCheck },
  { href: "/controller", label: "Controller", icon: Crown },
];

function NavSection({
  label,
  icon: LabelIcon,
  items,
  pathname,
  collapsed,
  onToggle,
}: {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  items: NavItem[];
  pathname: string;
  collapsed: boolean;
  onToggle: () => void;
}) {
  const Icon = LabelIcon;
  const activeCount = items.filter(
    (item) => pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
  ).length;

  return (
    <div className="mb-1">
      <button
        onClick={onToggle}
        className={cn(
          "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground/70 hover:text-foreground hover:bg-muted/50 transition-all",
          collapsed && "justify-center"
        )}
      >
        <Icon className="h-3.5 w-3.5 shrink-0" />
        {!collapsed && (
          <>
            <span className="flex-1 text-left">{label}</span>
            {activeCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary/15 px-1.5 text-[10px] font-bold text-primary">
                {activeCount}
              </span>
            )}
            <ChevronsDown className="h-3 w-3 opacity-50" />
          </>
        )}
        {collapsed && <ChevronsDown className="h-3 w-3 opacity-50" />}
      </button>
      {!collapsed && (
        <div className="mt-0.5 space-y-0.5 pl-1">
          {items.map((item) => {
            const ItemIcon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all relative overflow-hidden",
                  isActive
                    ? "bg-primary/10 text-primary shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                )}
              >
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary rounded-full" />
                )}
                <ItemIcon
                  className={cn(
                    "h-5 w-5 shrink-0 transition-transform group-hover:scale-110",
                    isActive && "text-primary"
                  )}
                />
                <span className="flex-1 whitespace-nowrap">{item.label}</span>
                {item.badge && (
                  <span className="shrink-0 text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-primary/15 text-primary">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function SidebarNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const { user, refresh } = useSession();
  const isLoggedIn = !!user;

  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({
    ai: false,
    browse: false,
    account: false,
    admin: false,
  });

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

  const toggleSection = (key: string) =>
    setCollapsedSections((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleLogout = async () => {
    await logoutAction();
    refresh();
    setIsOpen(false);
  };

  return (
    <>
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen border-r border-border/40 bg-background/95 backdrop-blur-2xl transition-all duration-300 flex flex-col",
          "lg:relative lg:top-auto lg:h-auto lg:z-auto",
          isOpen ? "w-64" : "-translate-x-full lg:w-16 lg:translate-x-0"
        )}
        onMouseEnter={() => !isMobile && setIsOpen(true)}
        onMouseLeave={() => !isMobile && setIsOpen(false)}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-border/40 shrink-0">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70 shadow-md shadow-primary/20">
              <span className="text-sm font-extrabold text-white">R</span>
            </div>
            {isOpen && (
              <span className="font-bold text-sm tracking-tight text-foreground whitespace-nowrap">
                Ravikisan's Platform
              </span>
            )}
          </Link>
          {isOpen && (
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 hidden lg:flex rounded-lg"
              onClick={() => setIsOpen(!isOpen)}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Nav sections */}
        <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
          <NavSection
            label="AI Tools"
            icon={Sparkles}
            items={aiItems}
            pathname={pathname}
            collapsed={collapsedSections.ai}
            onToggle={() => toggleSection("ai")}
          />
          <NavSection
            label="Browse"
            icon={Home}
            items={browseItems}
            pathname={pathname}
            collapsed={collapsedSections.browse}
            onToggle={() => toggleSection("browse")}
          />
          {isLoggedIn && (
            <NavSection
              label="Account"
              icon={UserCheck}
              items={accountItems}
              pathname={pathname}
              collapsed={collapsedSections.account}
              onToggle={() => toggleSection("account")}
            />
          )}
          {(user?.role === "ADMIN" || user?.role === "OWNER") && (
            <NavSection
              label="Admin"
              icon={ShieldCheck}
              items={adminItems}
              pathname={pathname}
              collapsed={collapsedSections.admin}
              onToggle={() => toggleSection("admin")}
            />
          )}
        </nav>

        {/* Bottom action */}
        <div className="border-t border-border/40 p-3 shrink-0">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all",
                !isOpen && "lg:justify-center"
              )}
            >
              <LogOut className="h-5 w-5 shrink-0" />
              {isOpen && <span className="whitespace-nowrap">Log out</span>}
            </button>
          ) : (
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted/60 hover:text-foreground transition-all",
                !isOpen && "lg:justify-center"
              )}
            >
              <LogIn className="h-5 w-5 shrink-0" />
              {isOpen && <span className="whitespace-nowrap">Login</span>}
            </Link>
          )}
        </div>
      </aside>
    </>
  );
}
