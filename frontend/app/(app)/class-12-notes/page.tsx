import { ClassSubjectsGrid } from "@/components/layout/class-subjects-grid";

const CLASS_SLUG = "class-12-notes";
const CLASS_NAME = "Class 12 Notes";

export default function Page() {
  return <ClassSubjectsGrid classSlug={CLASS_SLUG} className={CLASS_NAME} />;
}
