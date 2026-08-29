"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export function useCanvasSize(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const updateSize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    setSize({
      width: rect.width * dpr,
      height: rect.height * dpr,
    });
  }, [canvasRef]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    updateSize();

    const observer = new ResizeObserver(() => updateSize());
    observer.observe(canvas);

    return () => observer.disconnect();
  }, [canvasRef, updateSize]);

  return size;
}
