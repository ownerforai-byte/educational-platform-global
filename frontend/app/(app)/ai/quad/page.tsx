import type { Metadata } from "next";
import { Grid2x2, Layers, ShieldCheck, Sparkles } from "lucide-react";
import { AiToolShell } from "@/components/ai/ai-tool-shell";
import { QuadArena } from "@/features/ai/components/quad-arena";

/**
 * /ai/quad — the OWNER's Model Quad (owner 2026-11-18: "4 square interfaces
 * showing reply (from 4 models — to get the answer properly) from one prompt
 * switchable to all 6 subjects with chat history — history also changes with
 * the subject, model remains same … answer deepness veer level of owner").
 *
 * Owner-only for now: the arena renders the owner gate, and the API behind it
 * (`POST /api/ai/quad`) is `requireAuth` + `requireOwnerEmail`.
 */

export const metadata: Metadata = {
  title: "Model Quad — four models, one prompt | Ravikisan's Platform",
  description:
    "Owner desk: one prompt answered side by side by four AI models in four square panels, at Veer owner depth, with one private history per subject.",
};

export default function ModelQuadPage() {
  return (
    <AiToolShell
      icon={Grid2x2}
      title="Model Quad"
      description="One prompt, four square panels — four AI models answer the same question side by side at Veer owner depth, so the right answer is easy to spot. Switch between the six subjects; every subject keeps its own private history while the four model lanes stay the same."
      accent="border-amber-500/25 bg-amber-500/10 text-amber-600 dark:text-amber-400"
      current="/ai/quad"
      features={[
        {
          icon: Grid2x2,
          title: "Four squares, one prompt",
          text: "Your question goes to four distinct models in parallel; each square shows one model's full answer with its name and model id.",
        },
        {
          icon: ShieldCheck,
          title: "Owner depth, always",
          text: "Every square answers at Veer's owner level — the deepest rung: full derivations, units, exam traps and follow-ups.",
        },
        {
          icon: Layers,
          title: "Six subjects, six histories",
          text: "Physics, Chemistry, Biology, Mathematics, Nepali and English each keep a private conversation history — the models never change.",
        },
        {
          icon: Sparkles,
          title: "Shared grounding",
          text: "One research pass feeds all four models, so the squares differ in the model, not in luck — and every answer ends with a real research-paper link.",
        },
      ]}
    >
      <QuadArena />
    </AiToolShell>
  );
}
