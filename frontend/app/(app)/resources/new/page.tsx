import { ResourceForm } from "@/components/content/resource-form";

export default function NewResourcePage() {
  return (
    <div className="mx-auto max-w-5xl space-y-6 py-10">
      <h1 className="text-3xl font-bold tracking-tight">New Resource</h1>
      <ResourceForm topicId="" />
    </div>
  );
}
