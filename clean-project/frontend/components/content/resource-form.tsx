"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const RESOURCE_TYPES = [
  "SYLLABUS",
  "MINDMAP",
  "NOTES",
  "NUMERICAL",
  "FLASHCARD",
  "QUIZ",
  "VIDEO",
] as const;

export function ResourceForm({
  topicId,
  resource,
  onSuccess,
}: {
  topicId: string;
  resource?: {
    id: string;
    title: string;
    type: string;
    content: Record<string, unknown>;
    media_url: string | null;
    metadata: Record<string, unknown>;
  };
  onSuccess?: () => void;
}) {
  const router = useRouter();
  const [title, setTitle] = useState(resource?.title ?? "");
  const [type, setType] = useState(resource?.type ?? "NOTES");
  const [content, setContent] = useState(
    JSON.stringify(resource?.content ?? {}, null, 2)
  );
  const [mediaUrl, setMediaUrl] = useState(resource?.media_url ?? "");
  const [metadata, setMetadata] = useState(
    JSON.stringify(resource?.metadata ?? {}, null, 2)
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEdit = Boolean(resource);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const parsedContent = JSON.parse(content);
      const parsedMetadata = JSON.parse(metadata);

      const url = isEdit
        ? `/api/resources/${resource!.id}`
        : "/api/resources";
      const method = isEdit ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...(isEdit ? {} : { topic_id: topicId }),
          title,
          type,
          content: parsedContent,
          media_url: mediaUrl || null,
          metadata: parsedMetadata,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Failed to save resource");
      }

      onSuccess?.();
      if (!isEdit) {
        router.refresh();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEdit ? "Edit Resource" : "New Resource"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {RESOURCE_TYPES.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="mediaUrl">Media URL</Label>
            <Input
              id="mediaUrl"
              value={mediaUrl}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMediaUrl(e.target.value)}
              placeholder="https://..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content (JSON)</Label>
            <textarea
              id="content"
              value={content}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
              className="h-32 w-full rounded-md border border-border bg-background p-2 text-sm font-mono"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="metadata">Metadata (JSON)</Label>
            <textarea
              id="metadata"
              value={metadata}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMetadata(e.target.value)}
              className="h-32 w-full rounded-md border border-border bg-background p-2 text-sm font-mono"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : isEdit ? "Update" : "Create"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
