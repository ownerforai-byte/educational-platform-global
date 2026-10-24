import type { Metadata } from "next";
import { OwnerHome } from "@/components/home/tier-interfaces";
import { TierHomeGate } from "@/components/home/tier-home-gate";

export const metadata: Metadata = {
  title: "Owner | Ravikisan's Platform",
  description: "The Owner interface — the operator console, tier grants and section access rules.",
};

export default function OwnerHomePage() {
  return (
    <TierHomeGate tier="owner">
      <OwnerHome />
    </TierHomeGate>
  );
}
