import Link from "next/link";
import { BookOpen } from "lucide-react";

export function CellArchitectureShowcase() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h2 className="text-lg font-semibold text-foreground">Cell Architecture</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Explore 3D models of plant and animal cells, organelles and cellular processes.
      </p>
      <Link
        href="/lab/biology/bio-3d-cell"
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
      >
        Explore Cell Models <BookOpen className="h-4 w-4" />
      </Link>
    </div>
  );
}
