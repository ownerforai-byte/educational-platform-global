"use client";

import React, { useRef, type KeyboardEvent } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, RoundedBox } from "@react-three/drei";
import type { Mesh } from "three";
import { cn } from "@/lib/utils";
import { HOTSPOT_EMISSIVE_MATERIALS } from "./pbr-materials";
import type { KnowledgeHotspotProps, SceneTier } from "./types";

/** Phase 1 — opt-in marker states (purely additive). */
export type HotspotVisualState = "locked" | "active" | "complete";
export type HotspotStyle = "classic" | "enhanced";

/**
 * `KnowledgeHotspotProps` widened with the additive Phase 1 props. Every new
 * prop is optional and defaulted, so existing call sites are unaffected.
 */
export type KnowledgeHotspotEnhancedProps = KnowledgeHotspotProps & {
  /** "classic" (default) = today's exact sphere marker. "enhanced" = rounded box + emissive state material. */
  style?: HotspotStyle;
  /** Explicit state; defaults to `isActive ? "active" : "locked"`. */
  state?: HotspotVisualState;
  /** "low" trims bevel/smoothness so mobile GPUs stay cheap. */
  tier?: SceneTier;
};

export function KnowledgeHotspot({
  def,
  onOpen,
  isActive,
  reducedMotion = false,
  style = "classic",
  state,
  tier,
}: KnowledgeHotspotEnhancedProps) {
  const meshRef = useRef<Mesh>(null);
  const iconColor = def.iconColor ?? "#3b82f6";

  // Phase 1: computed but never *used* while `style === "classic"`, so the
  // default output stays identical to the pre-Phase-1 marker.
  const enhanced = style === "enhanced";
  const visualState: HotspotVisualState = state ?? (isActive ? "active" : "locked");
  const StateMaterial = HOTSPOT_EMISSIVE_MATERIALS[visualState];
  const roundedSmoothness = tier === "low" ? 1 : 4;
  const roundedBevelSegments = tier === "low" ? 1 : 3;
  const stateEmissiveOverride = reducedMotion
    ? { emissiveIntensity: visualState === "active" ? 0.6 : 0.3 }
    : {};

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
      {enhanced ? (
        <RoundedBox
          ref={meshRef}
          args={[0.15, 0.15, 0.15]}
          radius={0.035}
          smoothness={roundedSmoothness}
          bevelSegments={roundedBevelSegments}
        >
          <StateMaterial
            color={iconColor}
            emissive={iconColor}
            transparent
            opacity={0.92}
            {...stateEmissiveOverride}
          />
        </RoundedBox>
      ) : (
        /* ── classic path: identical to the pre-Phase-1 output ── */
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
      )}

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

/**
 * Phase 1 — rounded-marker variant exported *alongside* `<KnowledgeHotspot>`.
 * Purely additive sugar: it is exactly `style="enhanced"`.
 */
export function RoundedHotspot(props: Omit<KnowledgeHotspotEnhancedProps, "style">) {
  return <KnowledgeHotspot {...props} style="enhanced" />;
}

export default KnowledgeHotspot;
