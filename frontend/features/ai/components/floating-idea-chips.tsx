"use client";

import { Leaf, Sprout, Flower2, Mountain, Sun, Droplets, Wind, TreePine } from "lucide-react";
import { VeerChip, VeerSection } from "@/components/ai/veer-chip";

/**
 * FLOATING IDEA CHIPS — natural chip row above the composer while typing.
 */

type IdeaChip = { label: string; idea: string; icon?: typeof Leaf };

export const COMPOSER_IDEAS: IdeaChip[] = [
  { label: "Nature analogy", idea: "explain with a nature analogy", icon: Leaf },
  { label: "Derivation roots", idea: "show the step-by-step derivation", icon: Mountain },
  { label: "Exam light", idea: "answer it like an exam question", icon: Sun },
  { label: "Common traps", idea: "list the common mistakes", icon: Wind },
  { label: "Worked seed", idea: "add a worked numerical example", icon: Sprout },
  { label: "5-point recap", idea: "summarise in 5 points", icon: Droplets },
  { label: "Quiz me", idea: "quiz me on this next", icon: Flower2 },
  { label: "Nepali", idea: "explain in Nepali", icon: TreePine },
];

function normalizeIdeas(ideas: Array<string | IdeaChip>): IdeaChip[] {
  return ideas.map((item) =>
    typeof item === "string" ? { label: item, idea: item } : item,
  );
}

export function FloatingIdeaChips({
  visible,
  ideas = COMPOSER_IDEAS,
  onPick,
  className = "",
}: {
  visible: boolean;
  ideas?: Array<string | IdeaChip>;
  onPick: (idea: string) => void;
  className?: string;
}) {
  const chips = normalizeIdeas(ideas);
  return (
    <div
      aria-hidden={!visible}
      className={[
        "overflow-hidden transition-all duration-300",
        visible
          ? "pointer-events-auto mb-2 max-h-28 translate-y-0 opacity-100"
          : "pointer-events-none mb-0 max-h-0 translate-y-2 opacity-0",
        className,
      ].join(" ")}
    >
      <VeerSection title="Ideas" icon={Leaf} border="dash">
        {chips.map((item) => (
          <VeerChip
            key={item.idea}
            label={item.label}
            title={item.idea}
            icon={item.icon}
            tabIndex={visible ? 0 : -1}
            onClick={() => onPick(item.idea)}
          />
        ))}
      </VeerSection>
    </div>
  );
}
