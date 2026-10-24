import type { Metadata } from "next";
import { TierHomeRouter } from "@/components/home/tier-home-router";

export const metadata: Metadata = {
  title: "Study | Ravikisan's Platform",
  description:
    "Curriculum-aligned study tools for NEB Class 11 and 12: notes, past papers, formula sheets and interactive science resources.",
};

/**
 * /home is the tier feed (owner direction 2026-10-23: "identify the access of
 * plan of user and feed him the page of his plan"): the router resolves the
 * session's rung and replaces the view with the viewer's exact tier interface.
 * No generic home — a signed-in user is only ever fed their own tier page.
 */
export default function HomePage() {
  return <TierHomeRouter />;
}
