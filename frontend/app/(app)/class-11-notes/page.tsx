import { ClassSubjectsGrid } from "@/components/layout/class-subjects-grid";

// ISR (PHASE 4.1): static-by-nature corpus page — renders purely from the
// local syllabus/content modules, no per-request cookies, headers or API
// data — so the shell is cached 24 h and revalidated in the background.
export const revalidate = 86_400;

const CLASS_SLUG = "class-11-notes";
const CLASS_NAME = "Class 11 Notes";

export default function Page() {
  return <ClassSubjectsGrid classSlug={CLASS_SLUG} className={CLASS_NAME} />;
}
