import type { Metadata } from "next";
import { StreaksView } from "@/components/study/streaks-view";

export const metadata: Metadata = {
  title: "Streaks and Badges",
  description: "Your study streak, badges and the next milestone to reach.",
};

export default function Page() {
  return <StreaksView />;
}
