import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { loadData } from "@/lib/data-loader";

const SUBJECT_EMOJI: Record<string, string> = {
  "11/Biology": "🌿",
  "11/Chemistry": "🧪",
  "11/English": "📖",
  "11/Mathematics": "🔢",
  "11/Nepali": "🇳🇵",
  "11/Physics": "⚡",
  "12/Biology": "🌿",
  "12/Chemistry": "🧪",
  "12/English": "📖",
  "12/Mathematics": "🔢",
  "12/Nepali": "🇳🇵",
  "12/Physics": "⚡",
};

type ManifestItem = {
  path: string;
  data: { title?: string };
  dupType?: number;
};

const baseName = (p: string) => p.split(/[\\/]/).pop()?.replace(/\.json$/, "") ?? p;

export default async function RavikishanNotesPage({ searchParams }: { searchParams: Promise<{ class?: string }> }) {
  const params = await searchParams;
  const filterSection = params.class ?? null;
  const manifest = await loadData<ManifestItem[]>("ravikishan/manifest.json");

  const bySubject: Record<string, Array<{ path: string; title: string; dupType: number }>> = {};

  for (const item of manifest) {
    const [section, subject] = item.path.split("/");
    if (filterSection && section !== filterSection) continue;
    const key = `${section}/${subject}`;
    if (!bySubject[key]) bySubject[key] = [];
    bySubject[key].push({
      path: item.path,
      title: item.data.title ?? baseName(item.path),
      dupType: item.dupType ?? 1,
    });
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8 py-10">
      <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/10 via-background to-background p-8 shadow-lg">
        <h1 className="text-4xl font-bold tracking-tight">📚 Ravikishan Notes</h1>
        <p className="mt-2 text-muted-foreground">
          Imported notes organized by class and subject. Click any note to open it.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {Object.entries(bySubject).map(([key, items]) => (
          <Card key={key}>
            <CardHeader>
              <CardTitle className="text-base">{SUBJECT_EMOJI[key] ?? "📘"} {key}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {items.map((item) => {
                  const href = `/ravikishan-notes/${encodeURIComponent(item.path)}`;
                  const dupLabel = item.dupType > 1 ? ` (Type-${item.dupType})` : "";
                  return (
                    <Link
                      key={item.path}
                      href={href}
                      className="block rounded-md border border-border px-3 py-2 text-sm hover:border-primary transition-colors"
                    >
                      <span className="font-medium">{item.title}</span>
                      {dupLabel && <span className="ml-2 text-xs text-muted-foreground">{dupLabel}</span>}
                    </Link>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
