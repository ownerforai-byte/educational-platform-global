import Link from "next/link";
import { BookOpen } from "lucide-react";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-border bg-card/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-sm font-bold text-foreground">
            Ravikisan&apos;s Platform
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/subjects" className="text-muted-foreground hover:text-foreground">Subjects</Link>
            <Link href="/chat" className="text-muted-foreground hover:text-foreground">AI Tutor</Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
