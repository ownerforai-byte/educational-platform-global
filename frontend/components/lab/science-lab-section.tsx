"use client";

import {
  FlaskConical,
  Atom,
  Dna,
} from "lucide-react";
import Link from "next/link";

const labs = [
  { key: "physics", label: "Physics", icon: FlaskConical, desc: "Optics, gravitation, mechanics & waves", href: "/lab/physics" },
  { key: "chemistry", label: "Chemistry", icon: Atom, desc: "Molecules, reactions & stoichiometry", href: "/lab/chemistry" },
  { key: "biology", label: "Biology", icon: Dna, desc: "Cells, genetics, ecology & evolution", href: "/lab/biology" },
];

export function ScienceLabSection() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <FlaskConical className="h-5 w-5 text-primary" />
          Science Lab
        </h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {labs.map((lab) => {
          const Icon = lab.icon;
          return (
            <Link
              key={lab.key}
              href={lab.href}
              className="group flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4 text-center hover:scale-[1.02] hover:border-primary/30 hover:bg-primary/5 transition-all"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                <Icon className="h-5 w-5" />
              </div>
              <span className="text-sm font-semibold text-foreground">{lab.label}</span>
              <span className="text-xs text-muted-foreground text-center leading-tight">{lab.desc}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
