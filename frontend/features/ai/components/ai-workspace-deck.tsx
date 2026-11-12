import { Leaf } from "lucide-react";
import { AI_TOOL_GROUPS, toolsInGroup } from "./ai-tools-registry";
import { AdSlot } from "@/components/ai/ad-slot";
import { VeerChip, VeerSection } from "@/components/ai/veer-chip";
import { VEER_CHAT_SUGGESTIONS, VEER_NATURE_SECTION_ICONS } from "@/features/ai/lib/veer-home";

/**
 * Veer workspace — horizontal tools, vertical suggestions, flexible ad space.
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
    <div className="mx-auto flex min-h-[70dvh] w-full max-w-3xl flex-col gap-2 px-3 py-4 sm:px-4 sm:py-6">
      <header className="flex shrink-0 items-center gap-2 rounded-md border border-dashed border-emerald-700/30 px-2.5 py-2 dark:border-emerald-400/30">
        <Leaf className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
        <h1 className="text-[13px] font-extrabold tracking-[0.08em]">VEER WORKSPACE</h1>
      </header>

      <div className="flex shrink-0 flex-col gap-1">
        <VeerSection title="Start here" icon={VEER_NATURE_SECTION_ICONS.subjects} border="dash" scroll="x">
          {START_HERE.map((item) => (
            <VeerChip key={item.href + item.label} label={item.label} href={item.href} />
          ))}
        </VeerSection>

        {AI_TOOL_GROUPS.map((group) => {
          const tools = toolsInGroup(group);
          if (tools.length === 0) return null;
          return (
            <VeerSection
              key={group}
              title={`${group} · ${GROUP_COPY[group]}`}
              icon={VEER_NATURE_SECTION_ICONS.focus}
              border="dash"
              scroll="x"
            >
              {tools.map((tool) => (
                <VeerChip key={tool.href} label={tool.label} title={tool.blurb} href={tool.href} />
              ))}
            </VeerSection>
          );
        })}
      </div>

      <VeerSection
        title="Study suggestions"
        icon={VEER_NATURE_SECTION_ICONS.suggestions}
        border="line"
        scroll="y"
        className="min-h-0 flex-[1.2]"
      >
        {VEER_CHAT_SUGGESTIONS.map((chip) => (
          <VeerChip
            key={chip.id}
            label={chip.label}
            title={chip.prompt}
            href={`/chat?q=${encodeURIComponent(chip.prompt)}`}
          />
        ))}
      </VeerSection>

      <AdSlot flexible className="min-h-[4rem]" />
    </div>
  );
}
