"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bookmark,
  Coins,
  Crown,
  GraduationCap,
  LogOut,
  Mail,
  ShieldCheck,
  User,
  UserCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProgressPanel } from "@/components/progress/progress-panel";
import { useSession } from "@/features/auth/hooks/use-session";
import { isOwnerUser } from "@/lib/owner";

const roleBadgeConfig: Record<
  string,
  { label: string; className: string; icon: typeof Crown }
> = {
  OWNER: { label: "Owner", className: "bg-amber-500/15 border-amber-500/30 text-amber-500", icon: Crown },
  ADMIN: { label: "Admin", className: "bg-rose-500/15 border-rose-500/30 text-rose-500", icon: ShieldCheck },
  TEACHER: { label: "Teacher", className: "bg-blue-500/15 border-blue-500/30 text-blue-500", icon: GraduationCap },
  STUDENT: { label: "Student", className: "bg-emerald-500/15 border-emerald-500/30 text-emerald-500", icon: User },
};

/**
 * /profile — the account home opened from every "My Profile" entry point
 * (mobile nav footer, header user menu, sidebars).
 *
 * Opens straight into the Progress tab so the profile doubles as the
 * learning-progress view; account details live one tab over.
 */
export default function ProfilePage() {
  const router = useRouter();
  const { user, isLoading, logoutUser } = useSession();

  // Guests: send to login and come back here afterwards.
  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login?next=/profile");
    }
  }, [isLoading, user, router]);

  if (isLoading || !user) {
    return (
      <div className="container max-w-4xl py-8 space-y-6">
        <Skeleton className="h-36 w-full" />
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  const email = user.email || "";
  const displayName = user.fullName || email.split("@")[0] || "User";
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const role = (user.role || "STUDENT").toUpperCase();
  const badge = roleBadgeConfig[role] || roleBadgeConfig.STUDENT;
  const RoleIcon = badge.icon;
  const owner = isOwnerUser(user);

  const handleLogout = async () => {
    await logoutUser();
    router.push("/home");
  };

  return (
    <div className="container max-w-4xl py-8 space-y-6">
      {/* ── Identity header ─────────────────────────────────────────────── */}
      <Card className="overflow-hidden">
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4 min-w-0">
              <div className="h-16 w-16 shrink-0 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center text-xl font-extrabold text-primary">
                {initials}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl font-bold tracking-tight truncate">{displayName}</h1>
                  <span
                    className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md border ${badge.className}`}
                  >
                    <RoleIcon className="h-3 w-3" />
                    {badge.label}
                  </span>
                  {user.premiumStatus && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md border bg-violet-500/15 border-violet-500/30 text-violet-500">
                      <Crown className="h-3 w-3" />
                      Premium
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground truncate flex items-center gap-1.5 mt-0.5">
                  <Mail className="h-3.5 w-3.5 shrink-0" />
                  {email}
                </p>
                <div className="mt-1.5 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Coins className="h-3.5 w-3.5 text-amber-500" />
                    {user.credits ?? 0}
                    {user.creditsLimit !== undefined && ` / ${user.creditsLimit}`} credits
                  </span>
                </div>
              </div>
            </div>

            {/* Quick actions */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <Button asChild size="sm" variant="outline" className="rounded-xl">
                <Link href="/credits">
                  <Coins className="h-3.5 w-3.5" />
                  Wallet
                </Link>
              </Button>
              <Button asChild size="sm" variant="outline" className="rounded-xl">
                <Link href="/bookmarks">
                  <Bookmark className="h-3.5 w-3.5" />
                  Bookmarks
                </Link>
              </Button>
              {owner && (
                <Button asChild size="sm" className="rounded-xl">
                  <Link href="/owner">
                    <Crown className="h-3.5 w-3.5" />
                    Owner Console
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── Profile tabs — Progress opens first ─────────────────────────── */}
      <Tabs defaultValue="progress">
        <TabsList>
          <TabsTrigger value="progress" className="gap-1.5">
            <UserCheck className="h-4 w-4" />
            Progress
          </TabsTrigger>
          <TabsTrigger value="account" className="gap-1.5">
            <User className="h-4 w-4" />
            Account
          </TabsTrigger>
        </TabsList>

        {/* Default view: learning progress (the request — profile opens progress). */}
        <TabsContent value="progress">
          <div className="space-y-1 mb-4">
            <h2 className="text-lg font-semibold tracking-tight">My Progress</h2>
            <p className="text-sm text-muted-foreground">
              Track your learning journey across all subjects.
            </p>
          </div>
          <ProgressPanel />
        </TabsContent>

        <TabsContent value="account">
          <div className="space-y-4">
            <Card>
              <CardContent className="pt-6 space-y-3 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted-foreground">Full name</span>
                  <span className="font-medium text-right truncate">{displayName}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted-foreground">Email</span>
                  <span className="font-medium text-right truncate">{email}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted-foreground">Role</span>
                  <span className="font-medium">{badge.label}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted-foreground">Credits</span>
                  <span className="font-medium">
                    {user.credits ?? 0}
                    {user.creditsLimit !== undefined && ` / ${user.creditsLimit}`}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted-foreground">Premium</span>
                  <span className="font-medium">
                    {user.premiumStatus ? "Active" : "Not active"}
                  </span>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-wrap gap-2">
              <Button asChild size="sm" variant="outline" className="rounded-xl">
                <Link href="/progress">
                  <GraduationCap className="h-3.5 w-3.5" />
                  Full Progress Page
                </Link>
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="rounded-xl text-rose-500 border-rose-500/40 hover:bg-rose-500/10"
                onClick={handleLogout}
              >
                <LogOut className="h-3.5 w-3.5" />
                Log out
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
