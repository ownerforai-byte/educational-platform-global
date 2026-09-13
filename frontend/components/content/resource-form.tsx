"use client";

import { useState, useEffect } from "react";
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
import { apiFetch } from "@/lib/api-client";
import {
  getClassesByLevel,
  getSubjectsByClass,
  getChaptersBySubject,
  getTopicsByChapter,
} from "@/lib/curriculum";
import type {
  Class,
  Subject,
  Chapter,
  Topic,
  EducationLevel,
} from "@/lib/curriculum";

const RESOURCE_TYPES = [
  "SYLLABUS",
  "MINDMAP",
  "NOTES",
  "NUMERICAL",
  "FLASHCARD",
  "QUIZ",
  "VIDEO",
] as const;

// Radix-style Select value sentinel: this shadcn Select cannot use "" as a
// value, so "nothing selected" is represented by this token and mapped back.
const SELECT_PLACEHOLDER = "__placeholder__";

type OptionItem = { id: string; label: string };

/**
 * A cascade step in the topic picker. When its parent isn't chosen yet it
 * renders a clearly-disabled, non-interactive field (the shadcn Select wrapper
 * here does not accept a `disabled` prop, only SelectItem does).
 */
function GuardedSelect({
  enabled,
  placeholder,
  value,
  onValueChange,
  items,
}: {
  enabled: boolean;
  placeholder: string;
  value: string;
  onValueChange: (v: string) => void;
  items: OptionItem[];
}) {
  if (!enabled) {
    return (
      <div className="w-full flex items-center h-9 px-3 rounded-md border border-border bg-muted/40 text-sm text-muted-foreground select-none">
        {placeholder}
      </div>
    );
  }
  return (
    <Select
      value={value || SELECT_PLACEHOLDER}
      onValueChange={onValueChange}
    >
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {items.length === 0 ? (
          <SelectItem value={SELECT_PLACEHOLDER}>No options</SelectItem>
        ) : (
          items.map((it) => (
            <SelectItem key={it.id} value={it.id}>
              {it.label}
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  );
}

type TopicPickerProps = {
  value: string;
  onChange: (topicId: string) => void;
};

/**
 * Syllabus-backed cascading topic picker
 * (level -> class -> subject -> chapter -> topic). Emits the selected topic's
 * database id, which is the value the resource create flow submits as
 * `topic_id`. Bootstraps from the real curriculum levels so it always lists
 * the topics that actually exist in the database.
 */
function TopicPicker({ value, onChange }: TopicPickerProps) {
  const [levels, setLevels] = useState<EducationLevel[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);

  const [levelSlug, setLevelSlug] = useState("");
  const [classSlug, setClassSlug] = useState("");
  const [subjectSlug, setSubjectSlug] = useState("");
  const [chapterSlug, setChapterSlug] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiFetch<EducationLevel[]>("/api/levels")
      .then(setLevels)
      .catch(() =>
        setError("Could not load curriculum topics. Check your connection and retry.")
      );
  }, []);

  useEffect(() => {
    if (!levelSlug) {
      setClasses([]);
      setSubjects([]);
      setChapters([]);
      setTopics([]);
      return;
    }
    getClassesByLevel(levelSlug)
      .then(setClasses)
      .catch(() => setClasses([]));
  }, [levelSlug]);

  useEffect(() => {
    if (!levelSlug || !classSlug) {
      setSubjects([]);
      setChapters([]);
      setTopics([]);
      return;
    }
    getSubjectsByClass(levelSlug, classSlug)
      .then(setSubjects)
      .catch(() => setSubjects([]));
  }, [levelSlug, classSlug]);

  useEffect(() => {
    if (!levelSlug || !classSlug || !subjectSlug) {
      setChapters([]);
      setTopics([]);
      return;
    }
    getChaptersBySubject(levelSlug, classSlug, subjectSlug)
      .then(setChapters)
      .catch(() => setChapters([]));
  }, [levelSlug, classSlug, subjectSlug]);

  useEffect(() => {
    if (!levelSlug || !classSlug || !subjectSlug || !chapterSlug) {
      setTopics([]);
      return;
    }
    setLoading(true);
    getTopicsByChapter(levelSlug, classSlug, subjectSlug, chapterSlug)
      .then((ts) => {
        setTopics(ts);
        setLoading(false);
      })
      .catch(() => {
        setTopics([]);
        setLoading(false);
      });
  }, [levelSlug, classSlug, subjectSlug, chapterSlug]);

  const pickLevel = (v: string) => {
    setLevelSlug(v === SELECT_PLACEHOLDER ? "" : v);
    setClassSlug("");
    setSubjectSlug("");
    setChapterSlug("");
  };
  const pickClass = (v: string) => {
    setClassSlug(v === SELECT_PLACEHOLDER ? "" : v);
    setSubjectSlug("");
    setChapterSlug("");
  };
  const pickSubject = (v: string) => {
    setSubjectSlug(v === SELECT_PLACEHOLDER ? "" : v);
    setChapterSlug("");
  };

  return (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Class level</Label>
          <GuardedSelect
            enabled
            placeholder="Select level"
            value={levelSlug}
            onValueChange={pickLevel}
            items={levels.map((l) => ({ id: l.slug, label: l.name }))}
          />
        </div>

        <div className="space-y-2">
          <Label>Class</Label>
          <GuardedSelect
            enabled={Boolean(levelSlug)}
            placeholder={levelSlug ? "Select class" : "Pick a level first"}
            value={classSlug}
            onValueChange={pickClass}
            items={classes.map((c) => ({ id: c.slug, label: c.name }))}
          />
        </div>

        <div className="space-y-2">
          <Label>Subject</Label>
          <GuardedSelect
            enabled={Boolean(classSlug)}
            placeholder={classSlug ? "Select subject" : "Pick a class first"}
            value={subjectSlug}
            onValueChange={pickSubject}
            items={subjects.map((s) => ({ id: s.slug, label: s.name }))}
          />
        </div>

        <div className="space-y-2">
          <Label>Chapter / Unit</Label>
          <GuardedSelect
            enabled={Boolean(subjectSlug)}
            placeholder={subjectSlug ? "Select chapter" : "Pick a subject first"}
            value={chapterSlug}
            onValueChange={(v) => setChapterSlug(v === SELECT_PLACEHOLDER ? "" : v)}
            items={chapters.map((ch) => ({ id: ch.slug, label: ch.title }))}
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label>Topic</Label>
          <GuardedSelect
            enabled={Boolean(chapterSlug) && !loading}
            placeholder={
              loading ? "Loading topics…" : chapterSlug ? "Select topic" : "Pick a chapter first"
            }
            value={value}
            onValueChange={(v) => onChange(v === SELECT_PLACEHOLDER ? "" : v)}
            items={topics.map((t) => ({ id: t.id, label: t.title }))}
          />
        </div>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
      {!value && !error && (
        <p className="text-xs text-muted-foreground">
          Choose a level, class, subject, chapter, and topic. A valid syllabus
          topic is required to save the new resource.
        </p>
      )}
      {value && (
        <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
          Topic linked — the new resource will attach to this syllabus topic.
        </p>
      )}
    </div>
  );
}

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
  // The topic id submitted on create. Prefilled when a caller already has one;
  // otherwise driven by the topic picker below.
  const [selectedTopicId, setSelectedTopicId] = useState(topicId);

  const isEdit = Boolean(resource);
  // Creating a resource must attach a valid syllabus topic; editing keeps the
  // resource's existing topic_id, so only create enforces the requirement.
  const topicRequired = !isEdit;
  const canSubmit = !loading && (!topicRequired || selectedTopicId !== "");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const parsedContent = JSON.parse(content);
      const parsedMetadata = JSON.parse(metadata);

      // Mirror the backend PATCH contract: content/metadata must be JSON
      // objects (or legacy string content) or the request is rejected.
      if (
        typeof parsedContent !== "string" &&
        (typeof parsedContent !== "object" ||
          parsedContent === null ||
          Array.isArray(parsedContent))
      ) {
        throw new Error('Content must be a JSON object (e.g. {"text": "..."})');
      }
      if (
        typeof parsedMetadata !== "object" ||
        parsedMetadata === null ||
        Array.isArray(parsedMetadata)
      ) {
        throw new Error("Metadata must be a JSON object");
      }

      // Create requires a real topic id (never empty), otherwise the backend's
      // required-field check rejects the request.
      if (topicRequired && !selectedTopicId) {
        throw new Error("Please select a syllabus topic before creating.");
      }

      const url = isEdit
        ? `/api/resources/${resource!.id}`
        : "/api/resources";
      const method = isEdit ? "PATCH" : "POST";

      // Use apiFetch so the stored bearer token is attached automatically
      // (the previous raw fetch sent no Authorization header, which made the
      // teacher-only PATCH/POST reject every save with a 401).
      await apiFetch<Record<string, unknown>>(url, {
        method,
        body: JSON.stringify({
          ...(isEdit ? {} : { topic_id: selectedTopicId }),
          title,
          type,
          content: parsedContent,
          media_url: mediaUrl || null,
          metadata: parsedMetadata,
        }),
      });

      onSuccess?.();
      // Refresh on both create and edit so the server-rendered route
      // reflects the new resource or updated fields.
      router.refresh();
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

          {/* Topic link: required for new resources, fixed when editing. */}
          {topicRequired && (
            <div className="space-y-2">
              <Label>Syllabus Topic (required)</Label>
              <TopicPicker value={selectedTopicId} onChange={setSelectedTopicId} />
            </div>
          )}

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

          <div className="flex items-center gap-3">
            <Button type="submit" disabled={!canSubmit}>
              {loading ? "Saving..." : isEdit ? "Update" : "Create"}
            </Button>
            {topicRequired && !selectedTopicId && (
              <span className="text-xs text-muted-foreground">
                Select a topic to enable creating.
              </span>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
