import { ClassSubjectsGrid } from "@/components/layout/class-subjects-grid";

const CLASS_SLUG = "class-11e";
const CLASS_NAME = "Class 11E";

export default function Page() {
  return <ClassSubjectsGrid classSlug={CLASS_SLUG} className={CLASS_NAME} />;
}
