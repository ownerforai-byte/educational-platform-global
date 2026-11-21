"use client";

import { InfoDetailsBoard } from "@/features/profile/info-boards";
import { InfoWorkspace } from "@/features/profile/info-workspace";

export default function InfoDetailsPage() {
  return (
    <InfoWorkspace>
      <InfoDetailsBoard />
    </InfoWorkspace>
  );
}
