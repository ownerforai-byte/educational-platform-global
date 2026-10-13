import { notFound } from "next/navigation";
import { BackButton } from "@/components/navigation/back-button";
import { RenderedImportedNote } from "@/components/content/rendered-imported-note";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Imported Note — Notes",
  description: "Full rendered content of an imported Ravikishan or R Export note.",
};

export default async function ImportedNoteViewPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const path = typeof params.path === "string" ? params.path : "";
  const subject = typeof params.subject === "string" ? params.subject : "";
  const sourceParam = typeof params.source === "string" ? params.source : "";
  if (!path || !subject || (sourceParam !== "ravikishan" && sourceParam !== "r-export")) {
    notFound();
  }

  const note: {
    title: string;
    path: string;
    subject: string;
    unit?: string;
    target: string;
    source: "ravikishan" | "r-export";
  } = {
    title: typeof params.title === "string" && params.title ? params.title : path,
    path,
    subject,
    unit: typeof params.unit === "string" && params.unit ? params.unit : undefined,
    target:
      typeof params.target === "string" && params.target ? params.target : "class-11-notes",
    source: sourceParam === "r-export" ? "r-export" : "ravikishan",
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{note.title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {note.subject}
            {note.unit ? ` · ${note.unit}` : ""} · imported note
          </p>
        </div>
        <BackButton />
      </div>

      <RenderedImportedNote note={note} />
    </div>
  );
}
