import Link from "next/link";
import { BookOpen, Cuboid, FlaskConical } from "lucide-react";

export function ScienceLabSection() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h2 className="text-lg font-semibold text-foreground">Science Lab</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Explore interactive experiments and virtual labs for physics, chemistry, and biology.
      </p>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[
          {
            href: "/lab/3d",
            label: "3D Labs",
            desc: "All simulations in syllabus order",
            icon: Cuboid,
          },
          {
            href: "/lab/theory",
            label: "Lab Theory",
            desc: "Every lab's theory in one hub",
            icon: BookOpen,
          },
          {
            href: "/periodic-table",
            label: "Periodic Table",
            desc: "Interactive CEE all-blocks table",
            icon: FlaskConical,
          },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 rounded-xl border border-border bg-muted/50 p-4 text-sm font-medium hover:bg-muted transition-colors"
          >
            <item.icon className="h-4 w-4 text-primary shrink-0" />
            <span>
              {item.label}
              <span className="block text-xs text-muted-foreground font-normal">{item.desc}</span>
            </span>
            </Link>
        ))}
      </div>
    </div>
  );
}
