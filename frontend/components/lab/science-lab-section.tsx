import Link from "next/link";
import { BookOpen } from "lucide-react";

export function ScienceLabSection() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h2 className="text-lg font-semibold text-foreground">Science Lab</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Explore interactive experiments and virtual labs for physics, chemistry, and biology.
      </p>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { href: "/lab/physics", label: "Physics Lab" },
          { href: "/lab/chemistry", label: "Chemistry Lab" },
          { href: "/lab/biology", label: "Biology Lab" },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-2 rounded-xl border border-border bg-muted/50 p-4 text-sm font-medium hover:bg-muted transition-colors"
          >
            <BookOpen className="h-4 w-4" />
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
