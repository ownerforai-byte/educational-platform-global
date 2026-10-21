import type { Metadata } from "next";
import { HomePublic } from "@/components/home/home-public";

export const metadata: Metadata = {
  title: "Ravikisan's Platform | NEB Class 11 & 12",
  description:
    "Curriculum-aligned study resources for NEB Class 11 and 12 students in Nepal. Request an account to access the study library.",
};

export default function RootPage() {
  return <HomePublic />;
}
