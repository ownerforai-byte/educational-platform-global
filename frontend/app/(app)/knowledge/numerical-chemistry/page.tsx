"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Beaker, ChevronDown, ChevronUp } from "lucide-react";

const TOPICS = [
  {
    title: "Mole Concept & Stoichiometry",
    problems: [
      {
        q: "Calculate the mass of 2.5 moles of H₂SO₄.",
        steps: ["Molar mass of H₂SO₄ = 2(1) + 32 + 4(16) = 98 g/mol"],
        answer: "Mass = 2.5 × 98 = 245 g",
      },
      {
        q: "How many molecules are present in 36 g of water?",
        steps: ["Molar mass of H₂O = 18 g/mol", "Moles = 36/18 = 2 mol", "Molecules = 2 × 6.022 × 10²³"],
        answer: "1.204 × 10²⁴ molecules",
      },
      {
        q: "Find the volume of 4.4 g of CO₂ at STP.",
        steps: ["Molar mass of CO₂ = 44 g/mol", "Moles = 4.4/44 = 0.1 mol", "Volume at STP = 0.1 × 22.4 L"],
        answer: "2.24 L",
      },
    ],
  },
  {
    title: "Gas Laws",
    problems: [
      {
        q: "A gas occupies 2 L at 2 atm. Find volume at 0.5 atm (constant temp).",
        steps: ["Boyle's Law: P₁V₁ = P₂V₂", "2 × 2 = 0.5 × V₂"],
        answer: "V₂ = 8 L",
      },
      {
        q: "A gas at 27°C is heated to 127°C at constant pressure. If initial volume is 4 L, find final volume.",
        steps: ["Charles's Law: V₁/T₁ = V₂/T₂", "T₁ = 300K, T₂ = 400K", "4/300 = V₂/400"],
        answer: "V₂ = 5.33 L",
      },
      {
        q: "Calculate pressure of 0.5 mol gas in 10 L at 300K.",
        steps: ["PV = nRT", "P = nRT/V = (0.5 × 0.0821 × 300)/10"],
        answer: "P ≈ 1.23 atm",
      },
    ],
  },
  {
    title: "pH & Acid-Base",
    problems: [
      {
        q: "Calculate pH of 0.01 M HCl solution.",
        steps: ["HCl is strong acid: [H⁺] = 0.01 M", "pH = -log[H⁺]"],
        answer: "pH = -log(0.01) = 2",
      },
      {
        q: "Find pH of 0.001 M NaOH solution.",
        steps: ["NaOH is strong base: [OH⁻] = 0.001 M", "pOH = -log(0.001) = 3", "pH = 14 - 3"],
        answer: "pH = 11",
      },
    ],
  },
  {
    title: "Thermochemistry",
    problems: [
      {
        q: "Calculate heat released when 5 g of methane burns. ΔH = -890 kJ/mol.",
        steps: ["Molar mass CH₄ = 16 g/mol", "Moles = 5/16 = 0.3125 mol", "Heat = 0.3125 × 890"],
        answer: "278.1 kJ released",
      },
    ],
  },
  {
    title: "Electrochemistry",
    problems: [
      {
        q: "Calculate charge required to deposit 1 mole of Ag from AgNO₃ solution.",
        steps: ["Ag⁺ + e⁻ → Ag", "1 mole electrons = 1 Faraday = 96500 C"],
        answer: "96,500 C",
      },
      {
        q: "Find current needed to deposit 2.7 g Al in 2 hours.",
        steps: ["Al³⁺ + 3e⁻ → Al", "Moles Al = 2.7/27 = 0.1 mol", "Charge = 0.1 × 3 × 96500 = 28950 C", "I = Q/t = 28950/(2×3600)"],
        answer: "I ≈ 4.02 A",
      },
    ],
  },
];

export default function NumericalChemistryPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="mx-auto max-w-4xl space-y-6 py-6 md:py-10 px-4">
      <Link href="/knowledge" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" />
        Back to Knowledge
      </Link>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center">
          <Beaker className="h-5 w-5 text-violet-600" />
        </div>
        <div>
          <h1 className="text-xl md:text-2xl font-bold">Numerical Chemistry</h1>
          <p className="text-xs text-muted-foreground">Practice calculations for NEB exams</p>
        </div>
      </div>

      <div className="space-y-3">
        {TOPICS.map((topic, i) => (
          <div key={topic.title} className="rounded-xl border border-border bg-card overflow-hidden">
            <button
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-muted/50 transition-colors"
            >
              <span className="font-semibold text-sm">{topic.title}</span>
              {openIdx === i ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
            </button>
            {openIdx === i && (
              <div className="border-t border-border px-5 py-4 space-y-4">
                {topic.problems.map((p, pi) => (
                  <div key={pi} className="space-y-2">
                    <p className="text-sm font-medium text-foreground">Q{pi + 1}: {p.q}</p>
                    <div className="pl-3 space-y-1">
                      {p.steps.map((s, si) => (
                        <p key={si} className="text-xs text-muted-foreground font-mono">→ {s}</p>
                      ))}
                      <p className="text-xs font-semibold text-green-600 dark:text-green-400 mt-1">✓ {p.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
