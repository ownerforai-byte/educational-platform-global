import fs from "fs";
import path from "path";

const tracks = [
  "class-11e",
  "class-11-more",
  "class-12-notes",
  "class-12e",
  "class-12-more",
];
const subjects = [
  "biology",
  "chemistry",
  "english",
  "mathematics",
  "nepali",
  "physics",
];
const kinds = ["exams", "tests", "pyqs", "extra"];

function write(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, "utf8");
}

function hubPage(track) {
  return `import { SubjectHubView } from "@/features/syllabus/components/subject-hub-view";
import { listSubjects } from "@/features/syllabus/queries";

const CLASS_SLUG = "${track}";

export function generateStaticParams() {
  return listSubjects(CLASS_SLUG).map((s) => ({ subject: s.slug }));
}

export default async function SubjectPage({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject } = await params;
  return <SubjectHubView classSlug={CLASS_SLUG} subjectSlug={subject} />;
}
`;
}

function stubPage(subject) {
  return `import SubjectPage from "../[subject]/page";

export default function Page() {
  return <SubjectPage params={Promise.resolve({ subject: "${subject}" })} />;
}
`;
}

function topicPage(track) {
  return `import { notFound } from "next/navigation";
import { TopicDetailView } from "@/features/syllabus/components/topic-detail-view";
import { getSubjectNav, getUnitTopic, listSubjects } from "@/features/syllabus/queries";

const CLASS_SLUG = "${track}";

export function generateStaticParams() {
  return listSubjects(CLASS_SLUG).flatMap((s) =>
    getSubjectNav(CLASS_SLUG, s.slug).units.flatMap((u) =>
      u.topicEntries.map((t) => ({
        subject: s.slug,
        unit: u.id,
        topicSlug: t.slug,
      })),
    ),
  );
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ subject: string; unit: string; topicSlug: string }>;
}) {
  const { subject, unit, topicSlug } = await params;
  if (!getUnitTopic(CLASS_SLUG, subject, unit, topicSlug)) notFound();

  return (
    <div className="mx-auto max-w-5xl space-y-6 py-10">
      <TopicDetailView
        classSlug={CLASS_SLUG}
        subjectSlug={subject}
        unitId={unit}
        topicSlug={topicSlug}
      />
    </div>
  );
}
`;
}

function kindPage(track, kind) {
  return `import { PracticeSectionView } from "@/features/practice/components/practice-section-view";
import { listSubjects } from "@/features/syllabus/queries";

const CLASS_SLUG = "${track}";

export function generateStaticParams() {
  return listSubjects(CLASS_SLUG).map((s) => ({ subject: s.slug }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject } = await params;
  return (
    <PracticeSectionView classSlug={CLASS_SLUG} subjectSlug={subject} kind="${kind}" />
  );
}
`;
}

for (const track of tracks) {
  write(path.join("app", track, "[subject]", "page.tsx"), hubPage(track));
  for (const subject of subjects) {
    write(path.join("app", track, subject, "page.tsx"), stubPage(subject));
  }
  write(
    path.join(
      "app",
      track,
      "[subject]",
      "chapters",
      "[unit]",
      "topics",
      "[topicSlug]",
      "page.tsx",
    ),
    topicPage(track),
  );
  for (const kind of kinds) {
    write(path.join("app", track, "[subject]", kind, "page.tsx"), kindPage(track, kind));
  }
}

for (const subject of subjects) {
  write(path.join("app", "class-11-notes", subject, "page.tsx"), stubPage(subject));
}

console.log("ok");
