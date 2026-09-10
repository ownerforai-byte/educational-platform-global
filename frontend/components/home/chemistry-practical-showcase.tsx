"use client";

import { FlaskConical, ArrowRight, Beaker, Atom, TestTubes, FlaskRound } from "lucide-react";
import Link from "next/link";

const practicals = [
  {
    label: "Titration Practical",
    href: "/lab/chemistry/ch-calc-titration",
    desc: "Acid-base endpoints, molarity & back-titration",
    icon: TestTubes,
  },
  {
    label: "pH & Acids-Base Practical",
    href: "/lab/chemistry/ch-calc-ph",
    desc: "Buffer calculations, indicators & pH curves",
    icon: Beaker,
  },
  {
    label: "Redox Practical",
    href: "/lab/chemistry/ch-th-redox",
    desc: "Oxidation states, cells & half reactions",
    icon: FlaskRound,
  },
  {
    label: "Stoichiometry Practical",
    href: "/lab/chemistry/ch-calc-stoich",
    desc: "Yield, limiting reagents & molar mass",
    icon: Atom,
  },
];

export function ChemistryPracticalShowcase() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <FlaskConical className="h-5 w-5 text-amber-500" />
          Chemistry Practical
        </h2>
        <Link
          href="/lab/chemistry"
          className="inline-flex items-center gap-1 text-xs font-semibold text-amber-500 hover:text-amber-600 hover:underline"
        >
          View All Chemistry Labs <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {practicals.map((p) => {
          const Icon = p.icon;
          return (
            <Link
              key={p.href}
              href={p.href}
              className="group flex flex-col items-center gap-2 rounded-xl border border-amber-500/20 bg-gradient-to-br from-amber-500/10 to-orange-500/10 p-4 text-center hover:scale-[1.02] hover:border-amber-500/30 transition-all"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500 group-hover:scale-110 transition-transform">
                <Icon className="h-5 w-5" />
              </div>
              <span className="text-sm font-semibold text-foreground">{p.label}</span>
              <span className="text-xs text-muted-foreground leading-tight">{p.desc}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
