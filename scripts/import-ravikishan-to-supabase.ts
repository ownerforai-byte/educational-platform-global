import { createClient } from "@/lib/db/client";
import { getRavikishanManifest } from "@/lib/ravikishan-importer";

const supabase = createClient();

async function ensureClass(slug: string, name: string) {
  const { data: existing } = await supabase.from("education_levels").select("*").eq("slug", slug).single();
  if (existing) return existing;

  const { data, error } = await supabase.from("education_levels").insert({
    slug,
    name,
    description: `Imported from ravikishan: ${name}`,
    order: slug === "class-11" ? 1 : 2,
    is_active: true,
  }).select("*").single();

  if (error) throw error;
  return data;
}

async function ensureSubject(classId: string, slug: string, name: string) {
  const { data: existing } = await supabase.from("classes").select("*").eq("slug", slug).eq("education_level_id", classId).single();
  if (existing) return existing;

  const { data, error } = await supabase.from("classes").insert({
    education_level_id: classId,
    slug,
    name,
    description: `Imported from ravikishan: ${name}`,
    order: 0,
    is_active: true,
  }).select("*").single();

  if (error) throw error;
  return data;
}

async function ensureChapter(classId: string, subjectId: string, slug: string, title: string) {
  const { data: existing } = await supabase.from("subjects").select("*").eq("slug", slug).eq("class_id", classId).single();
  if (existing) return existing;

  const { data, error } = await supabase.from("subjects").insert({
    class_id: classId,
    slug,
    name: title,
    description: `Imported from ravikishan: ${title}`,
    order: 0,
    is_active: true,
  }).select("*").single();

  if (error) throw error;
  return data;
}

async function ensureTopic(chapterId: string, slug: string, title: string) {
  const { data: existing } = await supabase.from("topics").select("*").eq("slug", slug).eq("chapter_id", chapterId).single();
  if (existing) return existing;

  const { data, error } = await supabase.from("topics").insert({
    chapter_id: chapterId,
    slug,
    title,
    description: null,
    sortOrder: 0,
    is_active: true,
  }).select("*").single();

  if (error) throw error;
  return data;
}

async function importNotes() {
  const manifest = await getRavikishanManifest();
  let imported = 0;

  for (const note of manifest) {

    const classRecord = await ensureClass(note.section, note.section.replace("-", " ").toUpperCase());
    const subjectRecord = await ensureSubject(classRecord.id, note.subject, note.subject);
    const chapterRecord = await ensureChapter(classRecord.id, subjectRecord.id, note.chapter, note.chapter.replace(/-/g, " "));
    const topicRecord = await ensureTopic(chapterRecord.id, note.chapter, note.chapter.replace(/-/g, " "));

    const contentMarkdown = note.notes.join("\n\n");
    const { error } = await supabase.from("resources").insert({
      topic_id: topicRecord.id,
      type: note.type,
      content_type: "markdown",
      canonical_resource_id: note.duplicateOf ? await resolveCanonicalResourceId(note.duplicateOf) : null,
      title: note.title,
      content: contentMarkdown,
      media_url: null,
      metadata: {
        source: "ravikishan",
        sourcePath: note.path,
        blockType: note.blockType,
        noteType: note.noteType,
        dupType: note.dupType,
        duplicateOf: note.duplicateOf,
        year: note.year,
        examSource: note.examSource,
        order: note.order,
        graph: note.graph,
      },
      is_published: true,
    });

    if (error) {
      console.error("Failed importing", note.path, error.message);
      continue;
    }
    imported += 1;
  }

  console.log(`Imported ${imported} / ${manifest.length} notes`);
}

async function resolveCanonicalResourceId(duplicateOfPath: string) {
  const { data } = await supabase.from("resources").select("id").eq("metadata->>sourcePath", duplicateOfPath).single();
  return data?.id ?? null;
}

importNotes()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
