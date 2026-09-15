"use client";

import React, { Suspense, useEffect, useRef, useCallback } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Stats, Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { useSceneTier } from "./use-scene-tier";
import { PostEffects } from "./post-effects";
import { KnowledgeHotspot } from "./knowledge-hotspot";
import { KnowledgeSpotPanelContent } from "./knowledge-spot-panel";
import { SceneLoader } from "./scene-loader";
import { SpotIndex } from "./spot-index";
import type {
  SceneTier,
  SubjectAccentTokens,
  KnowledgeHotspotDef,
  ConceptData,
  SubjectName,
} from "./types";
import { cn } from "@/lib/utils";

// ─── Lighting Rig ───────────────────────────────────────────────────────────

function LightingRig({ accent, fogColor = "#0f172a" }: { accent: SubjectAccentTokens; fogColor?: string }) {
  return (
    <>
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize={[1024, 1024]}
        color={accent.key}
      />
      <directionalLight
        position={[-4, 3, -3]}
        intensity={0.6}
        color={accent.fill}
      />
      <directionalLight
        position={[0, 2, -8]}
        intensity={0.8}
        color={accent.rim}
      />
      <ambientLight intensity={0.4} color={accent.ambient} />
      <hemisphereLight
        args={[
          new THREE.Color(accent.hemisphereSky),
          new THREE.Color(accent.hemisphereGround),
          0.8,
        ]}
      />
      <fog attach="fog" args={[fogColor, 10, 50]} />
    </>
  );
}

// ─── Camera Controller ──────────────────────────────────────────────────────

function CameraController({ tier, isMobile }: { tier: SceneTier; isMobile: boolean }) {
  const { camera } = useThree();

  // First-mount gap fix: min/max distance passed as OrbitControls props
  // (available on the very first render), not set via a post-mount ref effect.
  const maxDist = isMobile ? 8 : tier === "low" ? 10 : 15;

  useEffect(() => {
    const cameraAsPerspective = camera as THREE.PerspectiveCamera;
    cameraAsPerspective.fov = isMobile ? 55 : 50;
    if (!isMobile) {
      const dist = tier === "low" ? 4 : 5;
      camera.position.set(dist * 0.6, dist * 0.4, dist);
    }
    camera.updateProjectionMatrix();
  }, [camera, tier, isMobile]);

  return (
    <OrbitControls
      enableDamping
      dampingFactor={0.05}
      enablePan={false}
      minDistance={3}
      maxDistance={maxDist}
      minPolarAngle={Math.PI / 6}
      maxPolarAngle={Math.PI / 1.5}
      autoRotate={tier === "high" && !isMobile}
      autoRotateSpeed={0.5}
    />
  );
}

// ─── Hotspot Manager ────────────────────────────────────────────────────────

function HotspotManager({
  hotspots,
  onOpenHotspot,
  activeHotspotId,
  reducedMotion,
}: {
  hotspots: KnowledgeHotspotDef[];
  onOpenHotspot: (id: string) => void;
  activeHotspotId?: string;
  reducedMotion: boolean;
}) {
  return (
    <>
      {hotspots.map((hotspot) => (
        <KnowledgeHotspot
          key={hotspot.id}
          def={hotspot}
          onOpen={onOpenHotspot}
          isActive={activeHotspotId === hotspot.id}
          reducedMotion={reducedMotion}
        />
      ))}
    </>
  );
}

// ─── Shared 3D Scene ────────────────────────────────────────────────────────

export function Shared3DScene({
  subject = "default",
  tierOverride,
  hotspots = [],
  conceptData = null,
  onOpenHotspot,
  activeHotspotId,
  children,
  showSpotIndex = true,
  showDebug = false,
  fogColor = "#0f172a",
}: {
  subject?: SubjectName;
  tierOverride?: SceneTier;
  hotspots?: KnowledgeHotspotDef[];
  conceptData?: ConceptData | null;
  onOpenHotspot?: (id: string) => void;
  activeHotspotId?: string;
  children: React.ReactNode;
  showSpotIndex?: boolean;
  showDebug?: boolean;
  /** Fog tint; override to match the active theme background (default: dark slate). */
  fogColor?: string;
}) {
  const tierState = useSceneTier(subject, tierOverride);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Bug #2 FIX: SpotIndex camera focus via callback (SpotIndex has no useThree)
  const handleCameraFocus = useCallback((_position: [number, number, number]) => {
    // Camera animation is handled inside Canvas via the CameraFocusRig child below
  }, []);

  // Bug #1 FIX: Knowledge panel OUTSIDE Canvas uses pure KnowledgeSpotPanelContent
  // (no Html, no useThree -> no crash)
  const renderKnowledgePanel = useCallback(() => {
    if (!activeHotspotId || !onOpenHotspot) return null;
    const hotspot = hotspots.find((h) => h.id === activeHotspotId);
    if (!hotspot) return null;
    return (
      <div className="fixed right-4 top-1/2 z-50 w-[280px] -translate-y-1/2">
        <KnowledgeSpotPanelContent
          conceptData={conceptData}
          fieldKeys={hotspot.fieldKeys}
          title={hotspot.label}
          onClose={() => onOpenHotspot("")}
        />
      </div>
    );
  }, [activeHotspotId, onOpenHotspot, hotspots, conceptData]);

  // Escape key closes panel
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeHotspotId && onOpenHotspot) {
        onOpenHotspot("");
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [activeHotspotId, onOpenHotspot]);

  return (
    <div className="relative w-full h-full min-h-[400px]">
      {showDebug && (
        <div className="absolute top-2 left-2 z-10 rounded-md bg-background/80 px-2 py-1 text-[10px] font-mono text-muted-foreground backdrop-blur">
          <div>Tier: {tierState.tier}</div>
          <div>DPR: {tierState.clampedDpr}</div>
          <div>Reduced motion: {tierState.reducedMotion ? "yes" : "no"}</div>
          <div>Mobile: {tierState.isMobile ? "yes" : "no"}</div>
        </div>
      )}

      {/* Bug #4 FIX: NO <color attach="background" args={["transparent"]} /> here.
          THREE parses "transparent" as RGB black; alpha:true on gl handles transparency. */}

      <Canvas
        ref={canvasRef}
        camera={{ position: [4, 2, 4], fov: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, tierState.clampedDpr]}
        shadows
        style={{ touchAction: "none", background: "transparent" }}
      >
        <Suspense fallback={null}>
          <LightingRig accent={tierState.accent} fogColor={fogColor} />

          <PostEffects
            tier={tierState.tier}
            subject={subject}
            reducedMotion={tierState.reducedMotion}
          />

          {/* Offline-safe procedural environment (Lightformers, no CDN HDR download).
              Subject-tinted so reflections match the lighting rig. */}
          <Environment resolution={256}>
            <Lightformer
              intensity={2}
              position={[0, 5, 0]}
              rotation-x={Math.PI / 2}
              scale={[10, 10, 1]}
              color={tierState.accent.hemisphereSky}
            />
            <Lightformer intensity={1.2} position={[-5, 1, -1]} scale={[6, 2, 1]} color={tierState.accent.fill} />
            <Lightformer intensity={1.2} position={[5, 1, 0]} scale={[6, 2, 1]} color={tierState.accent.rim} />
          </Environment>

          <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={2} far={4} />

          <CameraController tier={tierState.tier} isMobile={tierState.isMobile} />

          <HotspotManager
            hotspots={hotspots}
            onOpenHotspot={onOpenHotspot ?? (() => {})}
            activeHotspotId={activeHotspotId}
            reducedMotion={tierState.reducedMotion}
          />

          <CameraFocusRig
            hotspots={hotspots}
            activeHotspotId={activeHotspotId}
          />

          {/* Bug #3 FIX: SpotIndex in plain <div>, NOT nested inside <Html>.
              Avoids 200px content overflowing a 60px Html container. */}
          {showSpotIndex && (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "12px",
                transform: "translateY(-50%)",
                width: "200px",
                maxHeight: "calc(100vh - 100px)",
                overflowY: "auto",
                pointerEvents: "auto",
                zIndex: 50,
              }}
            >
              <SpotIndex
                hotspots={hotspots}
                onFocus={(id) => onOpenHotspot?.(id)}
                onCameraFocus={handleCameraFocus}
                activeId={activeHotspotId}
              />
            </div>
          )}

          <SceneLoader
            hotspots={hotspots}
            onFocusHotspot={onOpenHotspot ?? (() => {})}
            activeHotspotId={activeHotspotId}
          >
            {children}
          </SceneLoader>
        </Suspense>

        {showDebug && <Stats />}
      </Canvas>

      {/* Bug #1 FIX: panel outside Canvas -> pure Content, no Html/useThree */}
      {renderKnowledgePanel()}
    </div>
  );
}

// Camera focus animation rig - runs INSIDE Canvas (safe to use useThree)
function CameraFocusRig({
  hotspots,
  activeHotspotId,
}: {
  hotspots: KnowledgeHotspotDef[];
  activeHotspotId?: string;
}) {
  const { camera } = useThree();

  useEffect(() => {
    if (!activeHotspotId) return;
    const hotspot = hotspots.find((h) => h.id === activeHotspotId);
    if (!hotspot) return;
    gsap.to(camera.position, {
      x: hotspot.position[0] * 1.5,
      y: hotspot.position[1] * 1.5,
      z: hotspot.position[2] * 1.5 + 3,
      duration: 0.8,
      ease: "power2.inOut",
    });
  }, [activeHotspotId, hotspots, camera]);

  return null;
}

export default Shared3DScene;


