import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CLASS_TRACKS, CORE_SUBJECTS } from "@/features/knowledge/data";

export default function SubjectsPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-8 py-10">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Subjects</h1>
        <p className="text-muted-foreground">
          All six NEB subjects. Open a subject in any class track — each page starts with the official syllabus.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CORE_SUBJECTS.map((subject) => (
          <Card key={subject.slug} className="h-full">
            <CardHeader>
              <CardTitle className="text-lg">{subject.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {CLASS_TRACKS.map((track) => (
                <Link
                  key={track.slug}
                  href={`/${track.slug}/${subject.slug}`}
                  className="block rounded-md border border-border px-3 py-2 text-sm hover:border-primary hover:text-primary"
                >
                  {track.name}
                </Link>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
