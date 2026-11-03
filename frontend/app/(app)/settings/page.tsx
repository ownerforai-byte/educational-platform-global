import type { Metadata } from "next";
import { SettingsView } from "@/components/study/settings-view";

export const metadata: Metadata = {
  title: "Settings",
  description:
    "Language, theme, study goals, notifications and accessibility preferences, saved on this device.",
};

export default function Page() {
  return <SettingsView />;
}
