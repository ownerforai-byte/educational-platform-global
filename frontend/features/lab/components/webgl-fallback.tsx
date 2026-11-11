import { useState, useEffect } from "react";
import { isWebGLAvailable } from "@/lib/webgl";

export function useWebGLCanvas(containerRef: React.RefObject<HTMLDivElement | null>) {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (!isWebGLAvailable()) {
      setError("WebGL is not available in your browser. Please try a different browser or device.");
      return;
    }
    setError(null);
  }, [containerRef]);

  return { error };
}

export function WebGLFallback({
  title,
  description,
  message,
}: {
  title?: string;
  description?: string;
  message?: string;
}) {
  return (
    <div className="flex h-full items-center justify-center rounded-lg border border-border bg-muted/20 p-8 text-center">
      <div>
        <p className="text-lg font-semibold">{title ?? "WebGL Not Available"}</p>
        <p className="mt-2 text-sm text-muted-foreground">
          {description ?? message ?? "Your browser or device does not support WebGL, which is required for this simulation."}
        </p>
      </div>
    </div>
  );
}
