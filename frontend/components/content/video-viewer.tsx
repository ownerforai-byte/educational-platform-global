"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UnderDevelopment } from "@/components/content/under-development";

export function VideoViewer({
  title,
  mediaUrl,
}: {
  title: string;
  mediaUrl: string | null;
}) {
  if (!mediaUrl) {
    return <UnderDevelopment />;
  }

  const isYouTube =
    mediaUrl.includes("youtube.com") || mediaUrl.includes("youtu.be");
  const isVimeo = mediaUrl.includes("vimeo.com");

  let embedSrc = mediaUrl;
  if (isYouTube) {
    const videoId = mediaUrl.split("v=")[1]?.split("&")[0] ?? mediaUrl;
    embedSrc = `https://www.youtube.com/embed/${videoId}`;
  } else if (isVimeo) {
    const videoId = mediaUrl.split("/").pop();
    embedSrc = `https://player.vimeo.com/video/${videoId}`;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-video w-full">
          {isYouTube || isVimeo ? (
            <iframe
              src={embedSrc}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full rounded-md border border-border"
            />
          ) : (
            <video
              controls
              className="h-full w-full rounded-md border border-border"
              preload="metadata"
            >
              <source src={mediaUrl} />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
