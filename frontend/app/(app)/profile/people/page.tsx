"use client";

import { InfoPeopleBoard } from "@/features/profile/info-boards";
import { InfoWorkspace } from "@/features/profile/info-workspace";

export default function InfoPeoplePage() {
  return (
    <InfoWorkspace>
      <InfoPeopleBoard />
    </InfoWorkspace>
  );
}
