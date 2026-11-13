import type { Metadata } from "next";
import { ProfileEditForm } from "@/features/profile/profile-edit-form";

export const metadata: Metadata = {
  title: "Edit profile",
};

export default function ProfileEditPage() {
  return <ProfileEditForm />;
}
