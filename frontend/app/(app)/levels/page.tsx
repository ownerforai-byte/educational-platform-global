import Link from "next/link";

export default function LevelsPage() {
  return (
    <div className="mx-auto max-w-6xl py-8 px-4">
      <h1 className="text-2xl font-bold text-foreground">Curriculum</h1>
      <p className="mt-2 text-sm text-muted-foreground">Levels page coming soon.</p>
      <Link href="/" className="mt-4 inline-block text-sm text-primary hover:underline">
        ← Back to home
      </Link>
    </div>
  );
}
