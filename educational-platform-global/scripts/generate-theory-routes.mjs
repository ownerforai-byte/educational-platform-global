import fs from "fs";
import path from "path";

const tracks = [
  "class-11e",
  "class-11-more",
  "class-11-notes",
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
const roots = ["app", "frontend/app"];

function write(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, "utf8");
}

function theoryPage(track) {
  return `import { TheorySectionView } from "@/features/syllabus/components/theory-section-view";
import { listSubjects } from "@/features/syllabus/queries";

const CLASS_SLUG = "${track}";

export function generateStaticParams() {
  return listSubjects(CLASS_SLUG).map((s) => ({ subject: s.slug }));
}

export default async function TheoryPage({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject } = await params;
  return <TheorySectionView classSlug={CLASS_SLUG} subjectSlug={subject} />;
}
`;
}

function stubPage(subject) {
  return `import TheoryPage from "../../[subject]/theory/page";

export default function Page() {
  return <TheoryPage params={Promise.resolve({ subject: "${subject}" })} />;
}
`;
}

for (const root of roots) {
  for (const track of tracks) {
    write(
      path.join(root, track, "[subject]", "theory", "page.tsx"),
      theoryPage(track),
    );
    for (const subject of subjects) {
      write(path.join(root, track, subject, "theory", "page.tsx"), stubPage(subject));
    }
  }
}

console.log("ok");