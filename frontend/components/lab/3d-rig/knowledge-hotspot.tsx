"use client";

import React, { useRef, type KeyboardEvent } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import type { Mesh } from "three";
import { cn } from "@/lib/utils";
import type { KnowledgeHotspotProps } from "./types";

export function KnowledgeHotspot({ def, onOpen, isActive, reducedMotion = false }: KnowledgeHotspotProps) {
  const meshRef = useRef<Mesh>(null);
  const iconColor = def.iconColor ?? "#3b82f6";

  useFrame(({ clock }) => {
    if (reducedMotion) return; // prefers-reduced-motion: no auto-animation
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    if (isActive) {
      const pulse = 1 + Math.sin(t * 4) * 0.12;
      meshRef.current.scale.setScalar(pulse);
    } else {
      const breathe = 1 + Math.sin(t * 1.5) * 0.04;
      meshRef.current.scale.setScalar(breathe);
    }
  });

  const handleKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpen(def.id);
    }
  };

  return (
    <group position={def.position}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.08, 24, 24]} />
        <meshStandardMaterial
          color={iconColor}
          emissive={iconColor}
          emissiveIntensity={isActive ? 0.55 : 0.3}
          transparent
          opacity={0.85}
          roughness={0.35}
          metalness={0.15}
        />
      </mesh>

      <Html
        occlude
        distanceFactor={9}
        zIndexRange={[100, 0]}
        position={[0, 0.18, 0]}
        center
        style={{ pointerEvents: "auto" }}
      >
        <button
          type="button"
          tabIndex={0}
          aria-label={def.label}
          onClick={() => onOpen(def.id)}
          onKeyDown={handleKey}
          className={cn(
            "inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-bold",
            "shadow-[0_4px_8px_-2px_rgba(15,23,42,0.10),0_2px_4px_-2px_rgba(15,23,42,0.06)]",
            "backdrop-blur border transition-transform duration-150",
            "bg-white/80 dark:bg-slate-900/80",
            isActive ? "scale-105" : "hover:scale-[1.02] active:scale-105",
          )}
          style={{
            borderColor: iconColor,
            color: iconColor,
          }}
        >
          <span
            className="inline-block h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: iconColor, boxShadow: `0 0 6px ${iconColor}` }}
          />
          <span className="whitespace-nowrap">{def.label}</span>
        </button>
      </Html>
    </group>
  );
}

export default KnowledgeHotspot;
