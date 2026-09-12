import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/50">
      <div className="mx-auto max-w-6xl px-4 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Ravikisan&apos;s Platform. Built for NEB students.
      </div>
    </footer>
  );
}
