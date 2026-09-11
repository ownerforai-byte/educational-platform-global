"use client";

import { Dna, ArrowRight } from "lucide-react";
import Link from "next/link";

const labs = [
  { label: "Cell Structure 3D", href: "/lab/biology/bio-3d-cell", desc: "Organelles, membranes & transport" },
  { label: "DNA & Genetics 3D", href: "/lab/biology/bio-3d-dna", desc: "Genes, replication & inheritance" },
  { label: "Ecology & Ecosystem 3D", href: "/lab/biology/bio-3d-ecology", desc: "Food webs, cycles & biodiversity" },
  { label: "Human Body Systems 3D", href: "/lab/biology/bio-3d-human", desc: "Circulatory, respiratory & nervous" },
];

export function BiologyShowcase() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Dna className="h-5 w-5 text-emerald-500" />
          Biology Showcase
        </h2>
        <Link
          href="/lab/biology"
          className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-500 hover:text-emerald-600 hover:underline"
        >
          View All Biology Labs <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {labs.map((lab) => (
          <Link
            key={lab.href}
            href={lab.href}
            className="group flex flex-col items-center gap-2 rounded-xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 p-4 text-center hover:scale-[1.02] hover:border-emerald-500/30 transition-all"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500 group-hover:scale-110 transition-transform">
              <Dna className="h-5 w-5" />
            </div>
            <span className="text-sm font-semibold text-foreground">{lab.label}</span>
            <span className="text-xs text-muted-foreground leading-tight">{lab.desc}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
