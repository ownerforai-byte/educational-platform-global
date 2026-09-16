"use client";

import React, { forwardRef, type ReactNode } from "react";
import type { MeshStandardMaterial } from "three";

type MaterialProps = {
  children?: ReactNode;
  color?: string;
  transparent?: boolean;
  opacity?: number;
};

type StandardMaterialRef = MeshStandardMaterial;

const baseMaterialProps = {
  attach: "material" as const,
};

export const CellCytoplasmMaterial = forwardRef<StandardMaterialRef, MaterialProps>(
  function CellCytoplasmMaterial({ color = "#fde68a", children, ...rest }, ref) {
    return (
      <meshStandardMaterial
        {...baseMaterialProps}
        ref={ref}
        color={color}
        roughness={0.55}
        transparent
        opacity={0.85}
        emissive={color}
        emissiveIntensity={0.08}
        {...rest}
      >
        {children}
      </meshStandardMaterial>
    );
  },
);

export const CellMembraneMaterial = forwardRef<StandardMaterialRef, MaterialProps>(
  function CellMembraneMaterial({ color = "#fca5a5", children, ...rest }, ref) {
    return (
      <meshPhysicalMaterial
        {...baseMaterialProps}
        ref={ref as React.Ref<MeshStandardMaterial>}
        color={color}
        roughness={0.3}
        transparent
        opacity={0.55}
        ior={1.33}
        thickness={0.2}
        transmission={0.6}
        {...rest}
      >
        {children}
      </meshPhysicalMaterial>
    );
  },
);

export const GlassWaterMaterial = forwardRef<StandardMaterialRef, MaterialProps>(
  function GlassWaterMaterial({ color = "#e0f2fe", children, ...rest }, ref) {
    return (
      <meshPhysicalMaterial
        {...baseMaterialProps}
        ref={ref as React.Ref<MeshStandardMaterial>}
        color={color}
        roughness={0.05}
        transparent
        opacity={0.35}
        ior={1.33}
        thickness={0.5}
        transmission={0.9}
        clearcoat={1}
        clearcoatRoughness={0.05}
        {...rest}
      >
        {children}
      </meshPhysicalMaterial>
    );
  },
);

export const MetalLabMaterial = forwardRef<StandardMaterialRef, MaterialProps>(
  function MetalLabMaterial({ color = "#94a3b8", children, ...rest }, ref) {
    return (
      <meshStandardMaterial
        {...baseMaterialProps}
        ref={ref}
        color={color}
        metalness={0.9}
        roughness={0.2}
        envMapIntensity={0.8}
        {...rest}
      >
        {children}
      </meshStandardMaterial>
    );
  },
);

export const ChalkboardMaterial = forwardRef<StandardMaterialRef, MaterialProps>(
  function ChalkboardMaterial({ color = "#1f2937", children, ...rest }, ref) {
    return (
      <meshStandardMaterial
        {...baseMaterialProps}
        ref={ref}
        color={color}
        roughness={0.9}
        metalness={0.02}
        {...rest}
      >
        {children}
      </meshStandardMaterial>
    );
  },
);

export const PaperNotesMaterial = forwardRef<StandardMaterialRef, MaterialProps>(
  function PaperNotesMaterial({ color = "#fef3c7", children, ...rest }, ref) {
    return (
      <meshStandardMaterial
        {...baseMaterialProps}
        ref={ref}
        color={color}
        roughness={0.85}
        metalness={0}
        {...rest}
      >
        {children}
      </meshStandardMaterial>
    );
  },
);

export const BenzeneRingMaterial = forwardRef<StandardMaterialRef, MaterialProps>(
  function BenzeneRingMaterial({ color = "#475569", children, ...rest }, ref) {
    return (
      <meshStandardMaterial
        {...baseMaterialProps}
        ref={ref}
        color={color}
        metalness={0.4}
        roughness={0.35}
        envMapIntensity={0.6}
        {...rest}
      >
        {children}
      </meshStandardMaterial>
    );
  },
);

export const PhysicsRubberBallMaterial = forwardRef<StandardMaterialRef, MaterialProps>(
  function PhysicsRubberBallMaterial({ color = "#ef4444", children, ...rest }, ref) {
    return (
      <meshStandardMaterial
        {...baseMaterialProps}
        ref={ref}
        color={color}
        roughness={0.65}
        metalness={0.05}
        {...rest}
      >
        {children}
      </meshStandardMaterial>
    );
  },
);

export const MathGridPlasticMaterial = forwardRef<StandardMaterialRef, MaterialProps>(
  function MathGridPlasticMaterial({ color = "#f1f5f9", children, ...rest }, ref) {
    return (
      <meshPhysicalMaterial
        {...baseMaterialProps}
        ref={ref as React.Ref<MeshStandardMaterial>}
        color={color}
        roughness={0.4}
        metalness={0.08}
        clearcoat={0.5}
        clearcoatRoughness={0.4}
        {...rest}
      >
        {children}
      </meshPhysicalMaterial>
    );
  },
);
/* ── Phase 1 additions — emissive hotspot-state presets ──────────────────────
   Consumed only by the opt-in `<KnowledgeHotspot style="enhanced" />` /
   `<RoundedHotspot />` path. Additive: the nine presets above are untouched, and
   none of these are ever mounted unless `style="enhanced"` is passed.
   ─────────────────────────────────────────────────────────────────────────── */

export type EmissiveHotspotMaterialProps = MaterialProps & {
  emissive?: string;
  emissiveIntensity?: number;
  roughness?: number;
  metalness?: number;
};

export const EmissiveLockedMaterial = forwardRef<StandardMaterialRef, EmissiveHotspotMaterialProps>(
  function EmissiveLockedMaterial(
    { color = "#64748b", emissive, emissiveIntensity = 0.35, children, ...rest },
    ref,
  ) {
    return (
      <meshStandardMaterial
        {...baseMaterialProps}
        ref={ref}
        color={color}
        emissive={emissive ?? color}
        emissiveIntensity={emissiveIntensity}
        roughness={0.5}
        metalness={0.15}
        {...rest}
      >
        {children}
      </meshStandardMaterial>
    );
  },
);

export const EmissiveActiveMaterial = forwardRef<StandardMaterialRef, EmissiveHotspotMaterialProps>(
  function EmissiveActiveMaterial(
    { color = "#3b82f6", emissive, emissiveIntensity = 0.85, children, ...rest },
    ref,
  ) {
    return (
      <meshStandardMaterial
        {...baseMaterialProps}
        ref={ref}
        color={color}
        emissive={emissive ?? color}
        emissiveIntensity={emissiveIntensity}
        roughness={0.28}
        metalness={0.25}
        {...rest}
      >
        {children}
      </meshStandardMaterial>
    );
  },
);

export const EmissiveCompleteMaterial = forwardRef<StandardMaterialRef, EmissiveHotspotMaterialProps>(
  function EmissiveCompleteMaterial(
    { color = "#22c55e", emissive, emissiveIntensity = 0.6, children, ...rest },
    ref,
  ) {
    return (
      <meshStandardMaterial
        {...baseMaterialProps}
        ref={ref}
        color={color}
        emissive={emissive ?? color}
        emissiveIntensity={emissiveIntensity}
        roughness={0.35}
        metalness={0.2}
        {...rest}
      >
        {children}
      </meshStandardMaterial>
    );
  },
);

/**
 * State → material lookup for the enhanced hotspot marker. Annotated with a
 * single callable component type (rather than the inferred 3-way union) so
 * `<StateMaterial />` is valid JSX at the render site.
 */
export const HOTSPOT_EMISSIVE_MATERIALS: Record<
  "locked" | "active" | "complete",
  React.ForwardRefExoticComponent<
    EmissiveHotspotMaterialProps & React.RefAttributes<MeshStandardMaterial>
  >
> = {
  locked: EmissiveLockedMaterial,
  active: EmissiveActiveMaterial,
  complete: EmissiveCompleteMaterial,
};

