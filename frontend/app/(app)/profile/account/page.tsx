"use client";

import { InfoAccountBoard } from "@/features/profile/info-boards";
import { InfoWorkspace } from "@/features/profile/info-workspace";

export default function InfoAccountPage() {
  return (
    <InfoWorkspace>
      <InfoAccountBoard />
    </InfoWorkspace>
  );
}
