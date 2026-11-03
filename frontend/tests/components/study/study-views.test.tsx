import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import type { ComponentType } from "react";

/**
 * Smoke tests for the 16 components/study/*-view.tsx. Every data source is
 * mocked EMPTY, so each view must render, and the views that depend on a
 * source that does not exist yet must show the shared ComingSoon component
 * ("Under Progress"). Tier gating lives in lib/sections.ts (route tier) and
 * features/credits/constants.ts (spark layer), so those are pinned per view.
 */

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => "/",
}));
vi.mock("@/lib/api/progress", () => ({ getProgress: vi.fn().mockResolvedValue([]) }));
vi.mock("@/lib/api/credits", () => ({
  getUserCredits: vi.fn().mockResolvedValue({
    id: "u1",
    email: "a@example.com",
    fullName: null,
    role: "student",
    credits: 0,
    creditsLimit: 0,
    premiumStatus: false,
    premiumApprovedAt: null,
    pendingRequests: [],
  }),
  getUserTransactions: vi.fn().mockResolvedValue([]),
}));
vi.mock("@/lib/api/ai-quiz-history", () => ({ getQuizHistory: vi.fn().mockResolvedValue({ rows: [] }) }));
vi.mock("@/lib/api/ai", () => ({ chat: vi.fn().mockResolvedValue({ reply: "" }) }));
vi.mock("@/lib/pyq-bank", () => ({ getSubjectPyqBank: vi.fn().mockRejectedValue(new Error("empty")) }));

import { categoryForPath } from "@/features/credits/constants";
import { sectionById } from "@/lib/sections";
import { listCommunitySpaces } from "@/lib/community";
import { AnalyticsView } from "@/components/study/analytics-view";
import { AskView } from "@/components/study/ask-view";
import { BillingView } from "@/components/study/billing-view";
import { CommunitySpaceView } from "@/components/study/community-space-view";
import { CommunityView } from "@/components/study/community-view";
import { DashboardView } from "@/components/study/dashboard-view";
import { DownloadsView } from "@/components/study/downloads-view";
import { MockExamsView } from "@/components/study/mock-exams-view";
import { MyNotesView } from "@/components/study/my-notes-view";
import { OnboardingView } from "@/components/study/onboarding-view";
import { PlannerView } from "@/components/study/planner-view";
import { ReferralsView } from "@/components/study/referrals-view";
import { ReportCardView } from "@/components/study/report-card-view";
import { SettingsView } from "@/components/study/settings-view";
import { SrsView } from "@/components/study/srs-view";
import { StreaksView } from "@/components/study/streaks-view";

const space = listCommunitySpaces()[0];

interface Case {
  name: string;
  View: ComponentType;
  section: string | null;
  /** Expected registry minimum rung for the section. */
  minTier: string | null;
  path: string;
  /** Spark layer: true when the route must NOT bypass the spark. */
  sparkGated: boolean;
  comingSoon: boolean;
}

const CASES: Case[] = [
  { name: "analytics", View: AnalyticsView, section: "analytics", minTier: "pro", path: "/analytics", sparkGated: false, comingSoon: true },
  { name: "ask", View: AskView, section: "ask", minTier: "member", path: "/ask", sparkGated: false, comingSoon: true },
  { name: "billing", View: BillingView, section: "billing", minTier: "member", path: "/billing", sparkGated: false, comingSoon: true },
  { name: "community-space", View: () => <CommunitySpaceView space={space} />, section: "community", minTier: "plus", path: "/community/x", sparkGated: false, comingSoon: true },
  { name: "community", View: CommunityView, section: "community", minTier: "plus", path: "/community", sparkGated: false, comingSoon: false },
  { name: "dashboard", View: DashboardView, section: "dashboard", minTier: "member", path: "/dashboard", sparkGated: false, comingSoon: true },
  { name: "downloads", View: DownloadsView, section: "downloads", minTier: "pro", path: "/downloads", sparkGated: true, comingSoon: false },
  { name: "mock-exams", View: MockExamsView, section: "mock-exams", minTier: "pro", path: "/mock-exams", sparkGated: true, comingSoon: false },
  { name: "my-notes", View: MyNotesView, section: "my-notes", minTier: "member", path: "/my-notes", sparkGated: false, comingSoon: false },
  { name: "onboarding", View: OnboardingView, section: "onboarding", minTier: "visitor", path: "/onboarding", sparkGated: false, comingSoon: false },
  { name: "planner", View: PlannerView, section: "planner", minTier: "plus", path: "/planner", sparkGated: false, comingSoon: false },
  { name: "referrals", View: ReferralsView, section: "referrals", minTier: "plus", path: "/referrals", sparkGated: false, comingSoon: true },
  { name: "report-card", View: ReportCardView, section: "report-card", minTier: "plus", path: "/report-card", sparkGated: false, comingSoon: true },
  { name: "settings", View: SettingsView, section: "settings", minTier: "member", path: "/settings", sparkGated: false, comingSoon: false },
  { name: "srs", View: SrsView, section: "srs", minTier: "plus", path: "/srs", sparkGated: true, comingSoon: false },
  { name: "streaks", View: StreaksView, section: "streaks", minTier: "member", path: "/streaks", sparkGated: false, comingSoon: false },
];

beforeEach(() => {
  window.localStorage.clear();
});

describe("study views smoke", () => {
  it("covers all 16 views", () => {
    expect(CASES).toHaveLength(16);
  });

  describe.each(CASES)("$name", ({ View, section, minTier, path, sparkGated, comingSoon }) => {
    it("renders with empty data sources", async () => {
      const { container } = render(<View />);
      await waitFor(() => expect(container.firstChild).not.toBeNull());
      expect(container.textContent?.length ?? 0).toBeGreaterThan(0);
    });

    it("respects its tier and spark gate", () => {
      if (section) expect(sectionById(section)?.minTier).toBe(minTier);
      if (sparkGated) expect(categoryForPath(path)).not.toBeNull();
      else expect(categoryForPath(path)).toBeNull();
    });

    if (comingSoon) {
      it("shows ComingSoon where its data source is empty", async () => {
        render(<View />);
        expect((await screen.findAllByText(/under progress/i)).length).toBeGreaterThan(0);
      });
    }
  });
});
