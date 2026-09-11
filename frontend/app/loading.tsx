import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="flex h-14 items-center justify-between px-4 md:px-6">
          <Skeleton className="h-6 w-40" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-16" />
            <Skeleton className="h-9 w-9 rounded-md" />
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 shrink-0 border-r border-border p-4 lg:block">
          <Skeleton className="h-4 w-24" />
        </aside>
        <main className="flex-1 p-4 md:p-6">
          <Skeleton className="mb-4 h-6 w-48" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-lg border border-border p-6">
                <Skeleton className="mb-2 h-5 w-32" />
                <Skeleton className="mb-4 h-4 w-48" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        </main>
      </div>
      <footer className="border-t border-border bg-background">
        <div className="mx-auto flex h-14 items-center justify-between px-4 md:px-6">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-4 w-12" />
        </div>
      </footer>
    </div>
  );
}
