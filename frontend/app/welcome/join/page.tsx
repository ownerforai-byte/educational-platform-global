import type { Metadata } from "next";
import { GuestSignInNote } from "@/features/auth/components/guest-signin-note";

export const metadata: Metadata = {
  title: "A note before you begin — Ravikisan's Platform",
  description:
    "An inspiring note for guests: create an account, sign in, or check your approval status.",
};

/**
 * Guest-facing page for people who land on the sign-in flow without an
 * account (designer 2026-11-13). Public — outside the (app) shell.
 */
export default function GuestJoinPage() {
  return <GuestSignInNote variant="page" />;
}
