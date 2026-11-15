import type { Metadata } from "next";
import { GuestSignInNote } from "@/features/auth/components/guest-signin-note";

export const metadata: Metadata = {
  title: "Welcome — NEB Study Platform",
  description:
    "Create an account, sign in, or check your approval status for NEB Class 11 & 12 study.",
};

/**
 * Guest-facing page for people who land on the sign-in flow without an
 * account (designer 2026-11-13). Public — outside the (app) shell.
 */
export default function GuestJoinPage() {
  return <GuestSignInNote variant="page" />;
}
