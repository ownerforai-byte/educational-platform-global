"use client";

import dynamic from "next/dynamic";
import {
  CommunityBoardProvider,
  useCommunityBoard,
} from "@/features/community/community-board-context";
import { CommunityShell } from "@/features/community/community-shell";
import { CommunityTimelineView } from "@/features/community/community-timeline-view";
import { CommunityNotificationsView } from "@/features/community/community-notifications-view";
import { SignInOverlay } from "@/features/community/sign-in-overlay";
import {
  type BoardView,
  CommunityLoading,
  CommunityUnavailable,
} from "@/features/community/community-helpers";

const CommunityPostDetailView = dynamic(
  () =>
    import("@/features/community/community-post-detail-view").then(
      (m) => m.CommunityPostDetailView,
    ),
  { loading: () => <CommunityLoading /> },
);

export { CommunityUnavailable };

export function CommunityBoard({ view, id }: { view: BoardView; id?: string }) {
  if (view === "unavailable") return <CommunityUnavailable />;

  return (
    <CommunityBoardProvider view={view} id={id}>
      <CommunityBoardChrome />
    </CommunityBoardProvider>
  );
}

function CommunityBoardChrome() {
  const { view, savedView, savedCount, signInPrompt, closeSignInPrompt } = useCommunityBoard();
  const focus = view === "new" || view === "edit" || view === "post";
  const active = view === "mine" ? "mine" : savedView ? "saved" : "feed";

  let content: React.ReactNode;
  if (focus) {
    content = (
      <CommunityShell variant="focus">
        <CommunityPostDetailView />
      </CommunityShell>
    );
  } else if (view === "notifications") {
    content = (
      <CommunityShell variant="timeline" active="feed" savedCount={savedCount}>
        <CommunityNotificationsView />
      </CommunityShell>
    );
  } else {
    content = (
      <CommunityShell variant="timeline" active={active} savedCount={savedCount}>
        <CommunityTimelineView />
      </CommunityShell>
    );
  }

  return (
    <>
      {content}
      {/* One overlay for the whole board — like / comment / save / share / create */}
      <SignInOverlay
        open={signInPrompt !== null}
        action={signInPrompt ?? "like"}
        onOpenChange={(next) => {
          if (!next) closeSignInPrompt();
        }}
      />
    </>
  );
}