import { Sparkles } from "lucide-react";
import { AI_TOOL_GROUPS, toolsInGroup } from "./ai-tools-registry";
import { VeerChip, VeerSection } from "@/components/ai/veer-chip";
import { VEER_SUGGESTION_CHIPS } from "@/features/ai/lib/veer-home";

/**
 * Veer workspace — same small key-term chip sections as Veer Chat.
 */

const GROUP_COPY: Record<(typeof AI_TOOL_GROUPS)[number], string> = {
  Study: "Learn a topic, then prove you learned it.",
  Solve: "Stuck on a sum, a derivation or a single doubt? Start here.",
  Create: "Make something you can look at: diagrams and figures.",
  Review: "Go back through what you already discussed.",
};

const START_HERE = [
  { label: "New to a topic", href: "/ai/deep-dive" },
  { label: "Exam in a week", href: "/ai-quiz" },
  { label: "One stubborn doubt", href: "/chat" },
  { label: "All tools", href: "/ai" },
  { label: "Subject classrooms", href: "/ai/subjects" },
];

export function AiWorkspaceDeck() {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-5 px-3 py-4 sm:px-4 sm:py-6">
      <header className="flex items-center gap-2">
        <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
        <h1 className="text-[13px] font-extrabold tracking-[0.08em]">VEER WORKSPACE</h1>
      </header>

      <VeerSection title="Start here">
        {START_HERE.map((item) => (
          <VeerChip key={item.href + item.label} label={item.label} href={item.href} />
        ))}
      </VeerSection>

      <VeerSection title="Study suggestions">
        {VEER_SUGGESTION_CHIPS.map((chip) => (
          <VeerChip
            key={chip.id}
            label={chip.label}
            title={chip.prompt}
            href={`/chat?q=${encodeURIComponent(chip.prompt)}`}
          />
        ))}
      </VeerSection>

      {AI_TOOL_GROUPS.map((group) => {
        const tools = toolsInGroup(group);
        if (tools.length === 0) return null;
        return (
          <VeerSection key={group} title={`${group} · ${GROUP_COPY[group]}`}>
            {tools.map((tool) => (
              <VeerChip key={tool.href} label={tool.label} title={tool.blurb} href={tool.href} />
            ))}
          </VeerSection>
        );
      })}
    </div>
  );
}
