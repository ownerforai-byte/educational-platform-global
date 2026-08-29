"use client";

import { useEffect, useRef, useState } from "react";

export function useCanvasSize(canvasRef: React.RefObject<HTMLCanvasElement | null>, deps: any[] = []) {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateSize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      setSize({
        width: rect.width * dpr,
        height: rect.height * dpr,
      });
    };

    updateSize();

    const observer = new ResizeObserver(() => updateSize());
    observer.observe(canvas);

    return () => observer.disconnect();
  }, [canvasRef, ...deps]);

  return size;
}
