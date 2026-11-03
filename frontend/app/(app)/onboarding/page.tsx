import type { Metadata } from "next";
import { OnboardingView } from "@/components/study/onboarding-view";

export const metadata: Metadata = {
  title: "Set your study goals",
  description:
    "Choose your subjects, exam date, target and daily study time.",
};

export default function Page() {
  return <OnboardingView />;
}
