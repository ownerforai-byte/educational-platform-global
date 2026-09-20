"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { Leaf, PawPrint, type LucideIcon } from "lucide-react";
import { Shared3DScene } from "./shared-3d-scene";
import { CellCytoplasmMaterial, CellMembraneMaterial } from "./pbr-materials";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ConceptData, SceneTier } from "./types";
import { useTopicConceptData } from "./concept-lookup";
import {
  CELL_HOTSPOTS,
  isOrganelleVisible,
  resolveCellTopicRef,
  type CellMode,
} from "./biology-cell-hotspots";

/**
 * Showcase 1 — Biology Cell Ultrastructure (Task 4).
 *
 * Procedural, GLTF-free PBR cell rendered through the shared rig:
 *   membrane (noise-displaced icosahedron) · cytoplasm · nucleus + nucleolus +
 *   nuclear pores · rough/smooth ER · Golgi · mitochondria (×4, cristae helices)
 *   · free ribosomes · lysosomes + centrioles (animal) · cell wall, central
 *   vacuole + chloroplasts (plant).
 *
 * Knowledge content is never hardcoded: hotspots resolve real concept JSON via
 * `useTopicConceptData` (the 2D `useTopicConcept` pattern) and open
 * `KnowledgeSpotPanelContent` through `Shared3DScene`.
 */

// ─── Hooks / helpers ────────────────────────────────────────────────────────

/** prefers-reduced-motion gate for the plant/animal transition (AC/NFR). */
function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

/** Noise-displaced icosahedron -> organic "blob" silhouette for the membrane. */
function useBlobGeometry(radius: number, detail: number, amplitude: number) {
  const geometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(radius, detail);
    const position = geo.attributes.position as THREE.BufferAttribute;
    const vertex = new THREE.Vector3();

    for (let i = 0; i < position.count; i += 1) {
      vertex.fromBufferAttribute(position, i);
      const noise =
        Math.sin(vertex.x * 2.1) * Math.cos(vertex.y * 1.7) * Math.sin(vertex.z * 1.3);
      const scale = 1 + noise * amplitude;
      position.setXYZ(i, vertex.x * scale, vertex.y * scale, vertex.z * scale);
    }

    geo.computeVertexNormals();
    return geo;
  }, [radius, detail, amplitude]);

  useEffect(() => () => geometry.dispose(), [geometry]);
  return geometry;
}

/** Evenly spread points on a sphere — nuclear pores / free ribosome scatter. */
function useSpherePoints(count: number, radius: number, seed = 1) {
  return useMemo(() => {
    const points: [number, number, number][] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i += 1) {
      const y = 1 - (i / Math.max(count - 1, 1)) * 2;
      const ring = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = golden * i * seed;
      points.push([
        Math.cos(theta) * ring * radius,
        y * radius,
        Math.sin(theta) * ring * radius,
      ]);
    }
    return points;
  }, [count, radius, seed]);
}

/** Outward-facing quaternion for a surface marker (nuclear pore rings). */
function outwardQuaternion(position: [number, number, number]): [number, number, number, number] {
  const normal = new THREE.Vector3(...position).normalize();
  const quaternion = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    normal,
  );
  return [quaternion.x, quaternion.y, quaternion.z, quaternion.w];
}

/** Helix path (mitochondrial cristae). */
function useHelixCurve(radius: number, height: number, turns: number) {
  return useMemo(() => {
    const points: THREE.Vector3[] = [];
    const steps = 48;
    for (let i = 0; i <= steps; i += 1) {
      const t = i / steps;
      const angle = t * Math.PI * 2 * turns;
      points.push(
        new THREE.Vector3(
          Math.cos(angle) * radius,
          (t - 0.5) * height,
          Math.sin(angle) * radius,
        ),
      );
    }
    return new THREE.CatmullRomCurve3(points);
  }, [radius, height, turns]);
}

/** Catmull-Rom tube path through explicit points (smooth ER network). */
function useTubeCurve(points: [number, number, number][]) {
  return useMemo(
    () => new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p))),
    [points],
  );
}

/**
 * T4-TR2: plant/animal transition. Adds the group instantly then scales it in,
 * or scales it out before unmounting. Both directions are well under 500 ms.
 */
function OrganelleGroup({
  show,
  reducedMotion = false,
  children,
}: {
  show: boolean;
  reducedMotion?: boolean;
  children: React.ReactNode;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [mounted, setMounted] = useState(show);

  useEffect(() => {
    if (show && !mounted) {
      setMounted(true);
      return;
    }
    const group = groupRef.current;
    if (!group) return;

    gsap.killTweensOf(group.scale);

    if (reducedMotion) {
      group.scale.setScalar(show ? 1 : 0);
      if (!show) setMounted(false);
      return;
    }

    gsap.to(group.scale, {
      x: show ? 1 : 0,
      y: show ? 1 : 0,
      z: show ? 1 : 0,
      duration: show ? 0.34 : 0.26,
      ease: show ? "back.out(1.7)" : "power2.in",
      onComplete: () => {
        if (!show) setMounted(false);
      },
    });
  }, [show, mounted, reducedMotion]);

  if (!mounted) return null;
  return (
    <group ref={groupRef} scale={0}>
      {children}
    </group>
  );
}

// ─── Organelles ─────────────────────────────────────────────────────────────

function Nucleus() {
  const pores = useSpherePoints(14, 0.62);

  return (
    <group position={[0.95, 0.45, 0.1]}>
      {/* nuclear envelope */}
      <mesh>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial
          color="#8b5cf6"
          roughness={0.32}
          metalness={0.06}
          emissive="#6d28d9"
          emissiveIntensity={0.14}
        />
      </mesh>
      {/* nucleolus */}
      <mesh position={[0.13, -0.11, 0.09]}>
        <sphereGeometry args={[0.21, 24, 24]} />
        <meshStandardMaterial
          color="#6d28d9"
          roughness={0.45}
          metalness={0.05}
          emissive="#4c1d95"
          emissiveIntensity={0.18}
        />
      </mesh>
      {/* nuclear pore rings */}
      {pores.map((point, index) => (
        <mesh key={`pore-${index}`} position={point} quaternion={outwardQuaternion(point)}>
          <torusGeometry args={[0.05, 0.014, 8, 14]} />
          <meshStandardMaterial color="#c4b5fd" roughness={0.35} metalness={0.25} />
        </mesh>
      ))}
    </group>
  );
}

function RoughER() {
  const ribosomes = useMemo(() => {
    const dots: [number, number, number][] = [];
    for (let i = 0; i < 20; i += 1) {
      dots.push([Math.sin(i * 2.3) * 0.3, (i / 20) * 0.5 - 0.14, Math.cos(i * 1.7) * 0.13]);
    }
    return dots;
  }, []);

  return (
    <group position={[0.6, 0.92, 0.5]} rotation={[0.05, -0.52, 0.08]}>
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh
          key={`cisterna-${i}`}
          position={[i * 0.055, i * 0.105, 0]}
          rotation={[0.1 * i, 0.42 * i, 0.07 * i]}
        >
          <boxGeometry args={[0.7, 0.042, 0.25]} />
          <meshStandardMaterial color="#f59e0b" roughness={0.5} metalness={0.06} />
        </mesh>
      ))}
      {ribosomes.map((dot, index) => (
        <mesh key={`ribosome-${index}`} position={dot}>
          <sphereGeometry args={[0.026, 10, 10]} />
          <meshStandardMaterial
            color="#14b8a6"
            roughness={0.45}
            emissive="#0f766e"
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

/** Static paths so the memoised curves stay stable across renders. */
const SMOOTH_ER_TUBES: [number, number, number][][] = [
  [[0.05, -0.2, 0.75], [0.4, 0.06, 1.02], [0.85, -0.08, 0.82], [1.15, 0.14, 0.45]],
  [[-0.02, -0.48, 0.52], [0.36, -0.32, 0.88], [0.78, -0.44, 0.66]],
  [[0.28, 0.28, 0.82], [0.68, 0.42, 0.92], [1.02, 0.3, 0.58]],
];

function Tube({
  points,
  radius = 0.032,
  color = "#fbbf24",
}: {
  points: [number, number, number][];
  radius?: number;
  color?: string;
}) {
  const curve = useTubeCurve(points);
  return (
    <mesh>
      <tubeGeometry args={[curve, 48, radius, 8, false]} />
      <meshStandardMaterial color={color} roughness={0.42} metalness={0.06} />
    </mesh>
  );
}

function SmoothER() {
  return (
    <group>
      {SMOOTH_ER_TUBES.map((points, index) => (
        <Tube key={`ser-${index}`} points={points} />
      ))}
    </group>
  );
}

function GolgiBody() {
  const vesicles: [number, number, number][] = [
    [0.16, 0.52, 0.1],
    [-0.2, 0.58, -0.05],
    [0.05, 0.64, 0.16],
  ];

  return (
    <group position={[-0.45, -0.95, 0.35]} rotation={[0.24, 0.3, -0.12]}>
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh
          key={`golgi-${i}`}
          position={[0, i * 0.085, 0]}
          scale={[1 - i * 0.08, 0.34, 1 - i * 0.08]}
        >
          <torusGeometry args={[0.42, 0.05, 10, 28]} />
          <meshStandardMaterial color="#ec4899" roughness={0.38} metalness={0.08} />
        </mesh>
      ))}
      {vesicles.map((position, index) => (
        <mesh key={`vesicle-${index}`} position={position}>
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshStandardMaterial color="#f9a8d4" roughness={0.4} />
        </mesh>
      ))}
    </group>
  );
}

const MITOCHONDRIA_TRANSFORMS: {
  position: [number, number, number];
  rotation: [number, number, number];
}[] = [
  { position: [-1.35, -0.35, 0.7], rotation: [0.35, 0.4, 0.6] },
  { position: [0.2, -1.15, -0.55], rotation: [-0.3, 0.8, -0.5] },
  { position: [1.42, 0.85, -0.45], rotation: [0.5, -0.3, 1.1] },
  { position: [-1.05, 0.95, 0.35], rotation: [1.2, 0.2, 0.25] },
];

function Mitochondrion({
  position,
  rotation,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
}) {
  const cristae = useHelixCurve(0.075, 0.34, 3);

  return (
    <group position={position} rotation={rotation}>
      <mesh>
        <capsuleGeometry args={[0.15, 0.4, 8, 16]} />
        <meshStandardMaterial
          color="#ef4444"
          roughness={0.42}
          metalness={0.08}
          emissive="#7f1d1d"
          emissiveIntensity={0.14}
        />
      </mesh>
      {/* inner cristae (helix) */}
      <mesh>
        <tubeGeometry args={[cristae, 56, 0.018, 6, false]} />
        <meshStandardMaterial color="#fca5a5" roughness={0.5} />
      </mesh>
    </group>
  );
}

function Mitochondria() {
  return (
    <group>
      {MITOCHONDRIA_TRANSFORMS.map((transform, index) => (
        <Mitochondrion key={`mito-${index}`} {...transform} />
      ))}
    </group>
  );
}

const CHLOROPLAST_TRANSFORMS: {
  position: [number, number, number];
  rotation: [number, number, number];
}[] = [
  { position: [-1.05, 0.8, -0.85], rotation: [0.2, 0.6, 0.35] },
  { position: [-0.2, -0.9, 0.95], rotation: [-0.35, 0.25, -0.5] },
  { position: [1.15, -0.55, 0.85], rotation: [0.45, -0.4, 0.2] },
];

function Chloroplast({
  position,
  rotation,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
}) {
  return (
    <group position={position} rotation={rotation}>
      <mesh scale={[1.35, 0.85, 0.95]}>
        <sphereGeometry args={[0.3, 28, 20]} />
        <meshStandardMaterial
          color="#10b981"
          roughness={0.45}
          metalness={0.05}
          emissive="#065f46"
          emissiveIntensity={0.12}
        />
      </mesh>
      {/* thylakoid grana stacks */}
      {[0, 1, 2, 3].map((i) => (
        <mesh
          key={`thylakoid-${i}`}
          position={[-0.14 + i * 0.095, 0, 0]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <cylinderGeometry args={[0.13, 0.13, 0.028, 16]} />
          <meshStandardMaterial color="#34d399" roughness={0.5} metalness={0.04} />
        </mesh>
      ))}
    </group>
  );
}

function Chloroplasts() {
  return (
    <group>
      {CHLOROPLAST_TRANSFORMS.map((transform, index) => (
        <Chloroplast key={`chloro-${index}`} {...transform} />
      ))}
    </group>
  );
}

const LYSOSOME_POSITIONS: [number, number, number][] = [
  [1.3, -0.72, -0.75],
  [0.45, 0.95, -1.05],
  [-0.75, -0.55, -1.15],
];

function Lysosomes() {
  return (
    <group>
      {LYSOSOME_POSITIONS.map((position, index) => (
        <mesh key={`lyso-${index}`} position={position}>
          <icosahedronGeometry args={[0.13, 1]} />
          <meshStandardMaterial
            color="#f97316"
            roughness={0.4}
            metalness={0.06}
            emissive="#9a3412"
            emissiveIntensity={0.16}
          />
        </mesh>
      ))}
    </group>
  );
}

function Centrioles() {
  return (
    <group position={[0.05, 1.35, -0.95]}>
      {[0, 1].map((index) => (
        <mesh
          key={`centriole-${index}`}
          position={[index * 0.13, 0, index * 0.07]}
          rotation={[index === 0 ? 0.4 : -0.4, 0.5 * index, 0]}
        >
          <cylinderGeometry args={[0.09, 0.09, 0.3, 9, 1, true]} />
          <meshStandardMaterial
            color="#a78bfa"
            roughness={0.35}
            metalness={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

// ─── Shells (translucent, drawn after the opaque organelles) ────────────────

function Membrane() {
  const geometry = useBlobGeometry(2, 4, 0.05);
  return (
    <mesh geometry={geometry}>
      <CellMembraneMaterial color="#fca5a5" opacity={0.26} />
    </mesh>
  );
}

function Cytoplasm() {
  const geometry = useBlobGeometry(1.82, 3, 0.04);
  return (
    <mesh geometry={geometry}>
      <CellCytoplasmMaterial color="#fde68a" opacity={0.32} />
    </mesh>
  );
}

/** Plant-only rigid cellulose wall around the membrane. */
function CellWall() {
  const geometry = useBlobGeometry(2.16, 2, 0.03);
  return (
    <group>
      <mesh geometry={geometry}>
        <meshStandardMaterial
          color="#84cc16"
          roughness={0.85}
          metalness={0}
          transparent
          opacity={0.1}
        />
      </mesh>
      <mesh geometry={geometry} scale={1.012}>
        <meshBasicMaterial color="#a3e635" wireframe transparent opacity={0.1} />
      </mesh>
    </group>
  );
}

/** Plant-only large central vacuole (up to ~90% of the plant cell volume). */
function CentralVacuole() {
  return (
    <mesh position={[-0.35, 0.1, -0.15]} scale={[0.9, 1.2, 0.9]}>
      <sphereGeometry args={[0.95, 32, 24]} />
      <meshPhysicalMaterial
        color="#93c5fd"
        roughness={0.12}
        metalness={0.02}
        transparent
        opacity={0.2}
        ior={1.33}
        thickness={0.5}
        transmission={0.6}
        clearcoat={0.6}
      />
    </mesh>
  );
}

function FreeRibosomes() {
  const points = useSpherePoints(28, 1.6, 1.7);
  return (
    <group>
      {points.map((point, index) => (
        <mesh key={`free-ribosome-${index}`} position={point}>
          <sphereGeometry args={[0.022, 8, 8]} />
          <meshStandardMaterial color="#5eead4" roughness={0.4} />
        </mesh>
      ))}
    </group>
  );
}

/**
 * Flat geometry budget — subdiv-4 icosahedron membrane, 4 mitochondria,
 * 3 chloroplasts, ~48 ribosome spheres. Comfortably inside the desktop
 * ≥ 60 FPS / mobile-low ≥ 45 FPS budget (T4-TR4).
 */
function CellModel({ mode, reducedMotion }: { mode: CellMode; reducedMotion: boolean }) {
  return (
    <group>
      <OrganelleGroup show={isOrganelleVisible("cellWall", mode)} reducedMotion={reducedMotion}>
        <CellWall />
      </OrganelleGroup>
      <OrganelleGroup
        show={isOrganelleVisible("centralVacuole", mode)}
        reducedMotion={reducedMotion}
      >
        <CentralVacuole />
      </OrganelleGroup>
      <OrganelleGroup show={isOrganelleVisible("chloroplast", mode)} reducedMotion={reducedMotion}>
        <Chloroplasts />
      </OrganelleGroup>
      <OrganelleGroup show={isOrganelleVisible("lysosome", mode)} reducedMotion={reducedMotion}>
        <Lysosomes />
      </OrganelleGroup>
      <OrganelleGroup show={isOrganelleVisible("centriole", mode)} reducedMotion={reducedMotion}>
        <Centrioles />
      </OrganelleGroup>

      <Nucleus />
      <RoughER />
      <SmoothER />
      <GolgiBody />
      <Mitochondria />
      <FreeRibosomes />
      <Cytoplasm />
      <Membrane />
    </group>
  );
}

// ── Plant / Animal ISO control bar (T4-TR2) ────────────────────────────────

const CELL_MODE_OPTIONS: { id: CellMode; label: string; icon: LucideIcon }[] = [
  { id: "plant", label: "Plant", icon: Leaf },
  { id: "animal", label: "Animal", icon: PawPrint },
];

export function CellModeToggle({
  mode,
  onChange,
  className,
}: {
  mode: CellMode;
  onChange: (mode: CellMode) => void;
  className?: string;
}) {
  return (
    <div role="group" aria-label="Cell type" className={cn("flex items-center gap-2", className)}>
      {CELL_MODE_OPTIONS.map((option) => {
        const Icon = option.icon;
        const active = mode === option.id;
        return (
          <Button
            key={option.id}
            type="button"
            size="sm"
            variant={active ? "default" : "outline"}
            aria-pressed={active}
            onClick={() => onChange(option.id)}
            className="gap-1.5"
          >
            <Icon className="h-3.5 w-3.5" />
            {option.label}
          </Button>
        );
      })}
    </div>
  );
}

// ── Showcase component ─────────────────────────────────────────────────────

export type BiologyCellSceneProps = {
  /** Concept-JSON coordinates; default to the cell-ultrastructure topic. */
  classSlug?: string | null;
  subjectSlug?: string | null;
  unitId?: string | null;
  topicSlug?: string | null;
  /** Controlled hotspot selection, so a page sidebar can drive the camera. */
  activeHotspotId?: string;
  onOpenHotspot?: (id: string) => void;
  /** Pre-resolved concept data; when omitted the scene resolves it itself. */
  conceptData?: ConceptData | null;
  defaultMode?: CellMode;
  onModeChange?: (mode: CellMode) => void;
  tierOverride?: SceneTier;
  showSpotIndex?: boolean;
  showDebug?: boolean;
  className?: string;
};

/**
 * `<BiologyCellScene />` is self-contained: it resolves its own concept JSON,
 * owns the plant/animal state and renders the rig's SpotIndex overlay. Pass the
 * optional props to drive it from a `LabPageShell` page instead.
 */
export function BiologyCellScene({
  classSlug,
  subjectSlug,
  unitId,
  topicSlug,
  activeHotspotId,
  onOpenHotspot,
  conceptData,
  defaultMode = "plant",
  onModeChange,
  tierOverride,
  showSpotIndex = true,
  showDebug = false,
  className,
}: BiologyCellSceneProps) {
  const reducedMotion = usePrefersReducedMotion();
  const [mode, setMode] = useState<CellMode>(defaultMode);
  const [internalHotspotId, setInternalHotspotId] = useState("");

  const topicRef = useMemo(
    () => resolveCellTopicRef({ classSlug, subjectSlug, unitId, topicSlug }),
    [classSlug, subjectSlug, unitId, topicSlug],
  );
  const resolved = useTopicConceptData(topicRef);
  const concept = conceptData !== undefined ? conceptData : resolved.data;
  const isResolving = conceptData === undefined && resolved.loading;

  const handleModeChange = useCallback(
    (next: CellMode) => {
      setMode(next);
      onModeChange?.(next);
    },
    [onModeChange],
  );

  const handleOpenHotspot = useCallback(
    (id: string) => {
      setInternalHotspotId(id);
      onOpenHotspot?.(id);
    },
    [onOpenHotspot],
  );

  const hotspotId = activeHotspotId !== undefined ? activeHotspotId : internalHotspotId;
  const activeHotspot = CELL_HOTSPOTS.find((hotspot) => hotspot.id === hotspotId) ?? null;

  return (
    <div className={cn("flex flex-col gap-3", className)} data-cell-mode={mode}>
      {/* ISO control bar: mode toggle + live counts (Task 4 scope #2) */}
      <div className="card-viz-iso-title flex flex-wrap items-center gap-2 rounded-xl border border-border/60 bg-muted/30 px-3 py-2">
        <span className="chip" data-variant="subject">
          Cell Ultrastructure
        </span>
        <span className="chip">{CELL_HOTSPOTS.length} knowledge spots</span>
        <span className="chip">{mode === "plant" ? "Plant cell" : "Animal cell"}</span>
        <div className="flex-1" />
        <CellModeToggle mode={mode} onChange={handleModeChange} />
      </div>

      <div className="h-[clamp(420px,62vh,720px)] overflow-hidden rounded-xl border border-border/60 bg-muted/20">
        <Shared3DScene
          subject="biology"
          tierOverride={tierOverride}
          hotspots={CELL_HOTSPOTS}
          conceptData={concept}
          activeHotspotId={hotspotId}
          onOpenHotspot={handleOpenHotspot}
          showSpotIndex={showSpotIndex}
          showDebug={showDebug}
        >
          <CellModel mode={mode} reducedMotion={reducedMotion} />
        </Shared3DScene>
      </div>

      <p className="text-[11px] text-muted-foreground" role="status">
        {isResolving
          ? "Resolving concept JSON…"
          : activeHotspot
            ? `${activeHotspot.label} opened — knowledge panel shows its concept fields.`
            : "Drag to orbit · scroll to zoom · click a glowing marker to read its concept JSON."}
      </p>
    </div>
  );
}

export default BiologyCellScene;