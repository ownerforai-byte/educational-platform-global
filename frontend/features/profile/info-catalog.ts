import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  BookOpen,
  Calendar,
  Download,
  Gift,
  NotebookPen,
  Award,
  Search,
  Settings,
  Users,
  Wallet,
  PenLine,
  MessagesSquare,
} from "lucide-react";

export const INFO_NAV = [
  { href: "/profile", label: "Overview", exact: true },
  { href: "/profile/details", label: "Details", exact: false },
  { href: "/profile/study", label: "Study", exact: false },
  { href: "/profile/people", label: "People", exact: false },
  { href: "/profile/account", label: "Account", exact: false },
] as const;

export type InfoLink = {
  href: string;
  title: string;
  detail: string;
  icon: LucideIcon;
};

export const STUDY_LINKS: InfoLink[] = [
  { href: "/subjects", title: "Curriculum", detail: "Subjects, notes and the syllabus", icon: BookOpen },
  { href: "/my-notes", title: "My notes", detail: "What you wrote while studying", icon: NotebookPen },
  { href: "/schedule", title: "Schedule", detail: "The week against unfinished units", icon: Calendar },
  { href: "/revision", title: "Revision", detail: "Short recall before the exam", icon: BookOpen },
  { href: "/downloads", title: "Offline", detail: "Packs saved on this device", icon: Download },
  { href: "/streaks", title: "Streaks and badges", detail: "What you have already earned", icon: Award },
];

export const PEOPLE_LINKS: InfoLink[] = [
  { href: "/ai/community", title: "Community", detail: "Public study posts", icon: MessagesSquare },
  { href: "/community", title: "Study spaces", detail: "Subject rooms for longer threads", icon: Users },
  { href: "/users", title: "Students", detail: "Find people on the platform", icon: Search },
];

export const ACCOUNT_LINKS: InfoLink[] = [
  { href: "/profile/edit", title: "Edit profile", detail: "Name, bio, photos and links", icon: PenLine },
  { href: "/settings", title: "Settings", detail: "Preferences and app options", icon: Settings },
  { href: "/credits", title: "Wallet", detail: "Sparks and credit balance", icon: Wallet },
  { href: "/analytics", title: "Analytics", detail: "How you have been studying", icon: BarChart3 },
  { href: "/referrals", title: "Referrals", detail: "Share the app", icon: Gift },
];
