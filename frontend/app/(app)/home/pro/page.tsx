import type { Metadata } from "next";
import { ProHome } from "@/components/home/tier-interfaces";
import { HomeSubjectRails } from "@/components/home/home-subject-rails";
import { TierHomeGate } from "@/components/home/tier-home-gate";

export const metadata: Metadata = {
  title: "Pro | Ravikisan's Platform",
  description: "The Pro interface — every index, derivations, PDF library and knowledge hubs.",
};

export default function ProHomePage() {
  return (
    <TierHomeGate tier="pro">
      <ProHome rails={<HomeSubjectRails />} />
    </TierHomeGate>
  );
}
