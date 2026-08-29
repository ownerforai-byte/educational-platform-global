"use client";

import { useEffect, useState } from "react";
import { Bookmark, Trash2, FolderOpen, BookOpen, FileText, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { createBookmark, deleteBookmark, getBookmarks } from "@/lib/api/bookmarks";
import Link from "next/link";

type BookmarkItem = {
  id: string;
  resource_id: string;
  folder?: string | null;
  notes?: string | null;
  created_at: string;
  resources?: {
    title: string;
    type: string;
    topic_id: string;
  } | null;
};

const typeIcons: Record<string, React.ElementType> = {
  note: BookOpen,
  video: Video,
  quiz: FileText,
  flashcard: FolderOpen,
};

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBookmarks = async () => {
      try {
        const data = await getBookmarks();
        setBookmarks(data as unknown as BookmarkItem[]);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load bookmarks");
      } finally {
        setIsLoading(false);
      }
    };

    loadBookmarks();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteBookmark(id);
      setBookmarks((prev) => prev.filter((b) => b.id !== id));
    } catch {
      setError("Failed to delete bookmark");
    }
  };

  if (isLoading) {
    return (
      <div className="container max-w-4xl py-8 space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl py-8 space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Bookmark className="h-6 w-6 text-primary" />
          Bookmarks
        </h1>
        <p className="text-sm text-muted-foreground">
          Your saved resources and study materials.
        </p>
      </div>

      {error && (
        <div className="rounded-md border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-20 w-full" />
          ))}
        </div>
      ) : bookmarks.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Bookmark className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <h2 className="text-lg font-semibold">No bookmarks yet</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Start exploring and bookmark your favorite resources.
            </p>
            <Link href="/subjects">
              <Button className="mt-4">Browse Subjects</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {bookmarks.map((bookmark) => {
            const Icon = bookmark.resources?.type === "video" ? Video : BookOpen;
            return (
              <Card key={bookmark.id}>
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium truncate">
                        {bookmark.resources?.title || "Untitled Resource"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {bookmark.resources?.type || "resource"}
                        {bookmark.folder && ` · ${bookmark.folder}`}
                      </p>
                      {bookmark.notes && (
                        <p className="text-sm text-muted-foreground/70 truncate">
                          {bookmark.notes}
                        </p>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(bookmark.id)}
                    className="shrink-0 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
