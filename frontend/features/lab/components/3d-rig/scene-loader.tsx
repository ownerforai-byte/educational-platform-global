"use client";

import React, { useEffect, useState } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import type { KnowledgeHotspotDef } from "./types";
import { WebGLFallback } from "@/components/lab/webgl-fallback";

type SceneLoaderProps = {
  hotspots: KnowledgeHotspotDef[];
  onFocusHotspot: (id: string) => void;
  activeHotspotId?: string;
  children: React.ReactNode;
};

/**
 * Spec (Task 3, item 8): if the WebGL context is lost OR Suspense takes
 * longer than 3 s, hand off to <WebGLFallback>.
 *
 * NOTE: must be rendered inside <Canvas> (uses useThree/useFrame).
 */
export function SceneLoader({
  hotspots,
  children,
}: SceneLoaderProps) {
  const { gl } = useThree();
  // First rendered frame ⇒ scene is up; before that show the spinner.
  const [loaded, setLoaded] = useState(false);
  // Suspense timeout (> 3 s) ⇒ hand off to the static fallback.
  const [timedOut, setTimedOut] = useState(false);
  // webglcontextlost ⇒ hand off to the static fallback.
  const [contextLost, setContextLost] = useState(false);

  // Track the first rendered frame.
  useFrame(() => {
    if (!loaded && gl.info.render.frame > 0) setLoaded(true);
  });

  // 3-second Suspense timeout (spec: "Suspense timeout (> 3 s)").
  useEffect(() => {
    if (loaded) return;
    const timer = setTimeout(() => setTimedOut(true), 3000);
    return () => clearTimeout(timer);
  }, [loaded]);

  // WebGL context-lost / restored listeners on the live canvas.
  useEffect(() => {
    const canvas = gl.domElement;
    const onLost = (e: Event) => {
      e.preventDefault();
      setContextLost(true);
    };
    canvas.addEventListener("webglcontextlost", onLost);
    return () => canvas.removeEventListener("webglcontextlost", onLost);
  }, [gl]);

  if (contextLost || timedOut) {
    return (
      <WebGLFallback
        title={contextLost ? "3D Session Interrupted" : "3D Scene Unavailable"}
        description={
          contextLost
            ? "The WebGL context was lost. Reload the page or try a different browser."
            : "The scene took too long to load. You can still access the knowledge content alongside."
        }
      />
    );
  }

  if (!loaded) {
    return (
      <Html position={[0, 0, 0]} style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", pointerEvents: "auto", zIndex: 50 }}>
        <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-background/95 p-6 backdrop-blur shadow-lg">
          <div className="relative h-8 w-8">
            <div className="absolute inset-0 animate-ping rounded-full border-2 border-primary/30" />
            <div className="absolute inset-0 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
          <p className="text-sm font-semibold">Loading 3D Scene</p>
          <p className="text-xs text-muted-foreground">Preparing your experience...</p>
          {hotspots.length > 0 && (
            <p className="text-[10px] text-muted-foreground/60">
              {hotspots.length} knowledge spot{hotspots.length !== 1 ? "s" : ""} ready
            </p>
          )}
        </div>
      </Html>
    );
  }

  return <>{children}</>;
}

export default SceneLoader;
