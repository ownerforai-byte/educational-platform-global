"use client";

import { InfoStudyBoard } from "@/features/profile/info-boards";
import { InfoWorkspace } from "@/features/profile/info-workspace";

export default function InfoStudyPage() {
  return (
    <InfoWorkspace>
      <InfoStudyBoard />
    </InfoWorkspace>
  );
}
