"use client";

import { Zap, ArrowRight } from "lucide-react";
import Link from "next/link";

const labs = [
  { label: "Optics Lab", href: "/lab/physics/optics", desc: "Lenses, mirrors & light waves" },
  { label: "Mechanics Lab", href: "/lab/physics/mechanics", desc: "Forces, motion & energy" },
  { label: "Waves Lab", href: "/lab/physics/waves", desc: "Sound, light & interference" },
  { label: "Electricity Lab", href: "/lab/physics/electricity", desc: "Circuits, fields & currents" },
];

export function PhysicsShowcase() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Zap className="h-5 w-5 text-blue-500" />
          Physics Showcase
        </h2>
        <Link
          href="/lab/physics"
          className="inline-flex items-center gap-1 text-xs font-semibold text-blue-500 hover:text-blue-600 hover:underline"
        >
          View All Physics Labs <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {labs.map((lab) => (
          <Link
            key={lab.href}
            href={lab.href}
            className="group flex flex-col items-center gap-2 rounded-xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 p-4 text-center hover:scale-[1.02] hover:border-blue-500/30 transition-all"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500 group-hover:scale-110 transition-transform">
              <Zap className="h-5 w-5" />
            </div>
            <span className="text-sm font-semibold text-foreground">{lab.label}</span>
            <span className="text-xs text-muted-foreground leading-tight">{lab.desc}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
