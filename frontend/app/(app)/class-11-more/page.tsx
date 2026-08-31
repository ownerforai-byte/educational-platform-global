import { ClassSubjectsGrid } from "@/components/layout/class-subjects-grid";

const CLASS_SLUG = "class-11-more";
const CLASS_NAME = "Class 11 More";

export default function Page() {
  return <ClassSubjectsGrid classSlug={CLASS_SLUG} className={CLASS_NAME} />;
}
