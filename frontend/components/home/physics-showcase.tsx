import Link from "next/link";
import { BookOpen } from "lucide-react";

export function PhysicsShowcase() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h2 className="text-lg font-semibold text-foreground">Physics</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Visualise mechanics, waves, optics and modern physics with interactive 3D simulations.
      </p>
      <Link
        href="/lab/physics"
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
      >
        Explore Physics <BookOpen className="h-4 w-4" />
      </Link>
    </div>
  );
}
