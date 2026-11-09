import type { Metadata } from "next";
import { AiWorkspaceDeck } from "@/components/ai/ai-workspace-deck";

export const metadata: Metadata = {
  title: "Veer Workspace — every AI tool, grouped by intent",
  description:
    "Ten Veer tools in one workspace, grouped by what you are trying to do: study, solve, create and review.",
};

export default function AiWorkspacePage() {
  return <AiWorkspaceDeck />;
}
