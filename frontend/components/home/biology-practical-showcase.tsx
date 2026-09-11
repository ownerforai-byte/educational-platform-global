"use client";

import { FlaskConical, ArrowRight, Microscope, Dna, Leaf, Heart } from "lucide-react";
import Link from "next/link";

const practicals = [
  {
    label: "Cell Biology Practical",
    href: "/lab/biology/bio-th-cell",
    desc: "Microscopy, organelles & tissue identification",
    icon: Microscope,
  },
  {
    label: "Genetics Practical",
    href: "/lab/biology/bio-th-genetics",
    desc: "Punnett squares, traits & inheritance patterns",
    icon: Dna,
  },
  {
    label: "Ecology Practical",
    href: "/lab/biology/bio-th-ecology",
    desc: "Ecosystem studies, food webs & field data",
    icon: Leaf,
  },
  {
    label: "Human Physiology Practical",
    href: "/lab/biology/bio-th-human",
    desc: "Dissection, organ models & system mapping",
    icon: Heart,
  },
];

export function BiologyPracticalShowcase() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <FlaskConical className="h-5 w-5 text-emerald-500" />
          Biology Practical
        </h2>
        <Link
          href="/practical/biology"
          className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-500 hover:text-emerald-600 hover:underline"
        >
          View All Biology Practical <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {practicals.map((p) => {
          const Icon = p.icon;
          return (
            <Link
              key={p.href}
              href={p.href}
              className="group flex flex-col items-center gap-2 rounded-xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 p-4 text-center hover:scale-[1.02] hover:border-emerald-500/30 transition-all"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500 group-hover:scale-110 transition-transform">
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
