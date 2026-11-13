"use client";

import { Progress } from "@/components/ui/progress";
import type { StorageInfo } from "@/lib/api/profile";
import { formatBytes } from "@/lib/api/profile";

export function StorageMeter({ storage }: { storage: StorageInfo }) {
  const pct = storage.unlimited
    ? 8
    : storage.limitBytes > 0
      ? Math.min(100, Math.round((storage.usedBytes / storage.limitBytes) * 100))
      : 0;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Profile storage</span>
        <span className="font-medium tabular-nums">
          {formatBytes(storage.usedBytes)}
          {storage.unlimited ? " · unlimited" : ` / ${formatBytes(storage.limitBytes)}`}
        </span>
      </div>
      {!storage.unlimited ? <Progress value={pct} className="h-2" /> : null}
    </div>
  );
}
