import type { Metadata } from "next";
import { ReferralsView } from "@/components/study/referrals-view";

export const metadata: Metadata = {
  title: "Referrals",
  description: "Referral and reward tracking.",
};

export default function Page() {
  return <ReferralsView />;
}
