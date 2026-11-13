import type { Metadata } from "next";
import { ProfileEditForm } from "@/features/profile/profile-edit-form";

export const metadata: Metadata = {
  title: "Profile settings",
};

export default function SettingsProfilePage() {
  return <ProfileEditForm />;
}
