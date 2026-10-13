import { AIAssistantWorkspace } from "@/components/home/ai-assistant-workspace";

export const metadata = {
  title: "Veer Workspace",
  description: "Every Veer tool in one workspace — tutor chat, quiz studio and curriculum search.",
};

export default function AiWorkspacePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AIAssistantWorkspace />
    </div>
  );
}
