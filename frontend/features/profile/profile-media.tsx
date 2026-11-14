"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

function initialsFrom(name: string | null | undefined): string {
  const source = (name ?? "").trim() || "?";
  return source
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function ProfileCover({
  url,
  className,
  sizes = "(max-width: 768px) 100vw, 768px",
}: {
  url: string | null | undefined;
  className?: string;
  sizes?: string;
}) {
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    setFailed(false);
  }, [url]);
  const showImage = Boolean(url) && !failed;

  return (
    <div className={cn("relative overflow-hidden bg-muted", className)}>
      {showImage ? (
        // Media URLs are R2 / /api/profile/media — not the Next image optimizer.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={url!}
          alt=""
          sizes={sizes}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
          onError={() => setFailed(true)}
        />
      ) : null}
    </div>
  );
}

export function ProfileAvatar({
  url,
  name,
  className,
  textClassName,
  sizes = "96px",
}: {
  url: string | null | undefined;
  name: string;
  className?: string;
  textClassName?: string;
  sizes?: string;
}) {
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    setFailed(false);
  }, [url]);
  const showImage = Boolean(url) && !failed;

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-muted text-primary",
        className,
      )}
    >
      {showImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={url!}
          alt={name}
          sizes={sizes}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <span className={cn("font-extrabold", textClassName)}>{initialsFrom(name)}</span>
      )}
    </div>
  );
}
