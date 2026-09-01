import Link from "next/link";
import { BookOpen } from "lucide-react";
import TheoryPage from "../../[subject]/theory/page";

export default function Page() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <Link
          href="/lab/math/math-th-theorems"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-primary/30 bg-primary/5 text-primary hover:bg-primary/10 transition-colors text-sm font-medium"
        >
          <BookOpen className="h-4 w-4" />
          Theorem Proofs
        </Link>
      </div>
      <TheoryPage params={Promise.resolve({ subject: "mathematics" })} />
    </div>
  );
}
