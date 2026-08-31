import { ClassSubjectsGrid } from "@/components/layout/class-subjects-grid";

const CLASS_SLUG = "class-12e";
const CLASS_NAME = "Class 12E";

export default function Page() {
  return <ClassSubjectsGrid classSlug={CLASS_SLUG} className={CLASS_NAME} />;
}
