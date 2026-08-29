export const runtime = "edge";

export default function EditResourcePage() {
  return (
    <div className="mx-auto max-w-5xl space-y-6 py-10">
      <h1 className="text-3xl font-bold tracking-tight">Edit Resource</h1>
      <p className="text-muted-foreground">
        Resource editing form. In a full implementation, this would fetch the
        existing resource by ID and pre-fill the form.
      </p>
    </div>
  );
}
