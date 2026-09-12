"use client";

import { FlaskConical, ArrowRight, Atom, Zap, Thermometer, Waves } from "lucide-react";
import Link from "next/link";

const practicals = [
  {
    label: "Mechanics Practical",
    href: "/practical/physics",
    desc: "Projectile, forces & motion experiments",
    icon: Atom,
  },
  {
    label: "Heat Determinations",
    href: "/practical/physics",
    desc: "Lees disc, Searles bar & Newton cooling",
    icon: Thermometer,
  },
  {
    label: "Electricity Practical",
    href: "/practical/physics",
    desc: "Circuit builds, measurements & Ohm's law",
    icon: Zap,
  },
  {
    label: "Waves & Optics Practical",
    href: "/practical/physics",
    desc: "Interference, diffraction & light rays",
    icon: Waves,
  },
];

export function PhysicsPracticalShowcase() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <FlaskConical className="h-5 w-5 text-blue-500" />
          Physics Practical
        </h2>
        <Link
          href="/practical/physics"
          className="inline-flex items-center gap-1 text-xs font-semibold text-blue-500 hover:text-blue-600 hover:underline"
        >
          View All Physics Practical <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {practicals.map((p) => {
          const Icon = p.icon;
          return (
            <Link
              key={p.href}
              href={p.href}
              className="group flex flex-col items-center gap-2 rounded-xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 p-4 text-center hover:scale-[1.02] hover:border-blue-500/30 transition-all"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500 group-hover:scale-110 transition-transform">
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
