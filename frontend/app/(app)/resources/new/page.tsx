"use client";

import { useState } from "react";
import { ResourceForm } from "@/components/content/resource-form";
import { ResourceLinkForm } from "@/components/content/resource-link-form";

export default function NewResourcePage() {
  const [createdId, setCreatedId] = useState<string | null>(null);

  return (
    <div className="mx-auto max-w-5xl space-y-6 py-10">
      <h1 className="text-3xl font-bold tracking-tight">New Resource</h1>
      <ResourceForm topicId="" onSuccess={(id) => setCreatedId(id ?? null)} />
      {createdId && <ResourceLinkForm resourceId={createdId} />}
    </div>
  );
}
