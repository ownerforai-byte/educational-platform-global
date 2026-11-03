import { Gift } from "lucide-react";
import { ComingSoon } from "@/components/content/coming-soon";

/** /referrals: no referral or reward data source exists yet, so the route is live with an honest placeholder. */
export function ReferralsView() {
  return (
    <div className="container max-w-3xl py-8 space-y-4">
      <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
        <Gift className="h-6 w-6" /> Referrals
      </h1>
      <ComingSoon
        title="Referral and reward tracking"
        kind="Notes"
        message="Invite links, referred students and spark rewards will be tracked here once the referral data source is built. Nothing is recorded yet."
        backHref="/credits"
        backLabel="My Sparks"
      />
    </div>
  );
}
