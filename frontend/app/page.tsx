import type { Metadata } from "next";
import { TierHomeRouter } from "@/components/home/tier-home-router";

export const metadata: Metadata = {
  title: "Ravikisan's Platform | NEB Class 11 & 12",
  description:
    "Curriculum-aligned study resources for NEB Class 11 and 12 students in Nepal. Request an account to access the study library.",
};

/**
 * The entry feed: everyone is greeted at their own level first — visitors get
 * the universal welcome (Go → login), signed-in viewers their tier welcome
 * (Go → their tier home). Access is resolved before the first paint.
 */
export default function RootPage() {
  return <TierHomeRouter landOn="welcome" />;
}
