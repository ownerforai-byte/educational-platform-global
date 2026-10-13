"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { ARButton, XR, useXR } from "@react-three/xr";
import * as THREE from "three";
import { ViewportRelativeArrow } from "./viewport-relative-arrow";

export type ARShape = "cube" | "sphere" | "cone" | "torus" | "icosahedron";

export interface ARObject {
  id: string;
  position: [number, number, number];
  type: ARShape;
  color: string;
  scale: number;
}

export interface ARViewerProps {
  enabled?: boolean;
  onClose?: () => void;
}

const SHAPE_OPTIONS: ARShape[] = ["cube", "sphere", "cone", "torus", "icosahedron"];

function ARScene({
  objects,
  isPlacing,
  shape,
  onObjectAdded,
}: {
  objects: ARObject[];
  isPlacing: boolean;
  shape: ARShape;
  onObjectAdded?: (obj: ARObject) => void;
}) {
  const [selectedObject, setSelectedObject] = useState<string | null>(null);
  const isPresenting = useXR((s) => s.isPresenting);

  useFrame((state) => {
    if (selectedObject) {
      const obj = objects.find((o) => o.id === selectedObject);
      if (obj) {
        state.camera.position.lerp(
          new THREE.Vector3(obj.position[0], obj.position[1] + 0.5, obj.position[2]),
          0.1
        );
      }
    }
  });

  const handlePlace = useCallback(
    (event: ThreeEvent<MouseEvent>) => {
      if (!isPresenting || !isPlacing) return;
      const point = event.point;
      onObjectAdded?.({
        id: Date.now().toString(),
        position: [point.x, point.y, point.z],
        type: shape,
        color: "#6366f1",
        scale: 0.3,
      });
    },
    [isPresenting, isPlacing, shape, onObjectAdded]
  );

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />

      <ViewportRelativeArrow
        screenTarget={[0.5, 0.5]}
        depth={3}
        length={1.5}
        color="#6366f1"
        pulse={true}
        pulseSpeed={2}
        flowParticles={true}
        particleCount={8}
        followCamera={true}
        dynamic={true}
      />

      {objects.map((obj) => (
        <group key={obj.id} position={obj.position}>
          {obj.type === "cube" && (
            <mesh
              onClick={() => setSelectedObject(obj.id)}
              onPointerOver={() => (document.body.style.cursor = "pointer")}
              onPointerOut={() => (document.body.style.cursor = "auto")}
            >
              <boxGeometry args={[obj.scale, obj.scale, obj.scale]} />
              <meshStandardMaterial color={obj.color} metalness={0.3} roughness={0.2} />
            </mesh>
          )}
          {obj.type === "sphere" && (
            <mesh onClick={() => setSelectedObject(obj.id)}>
              <sphereGeometry args={[obj.scale / 2, 32, 32]} />
              <meshStandardMaterial color={obj.color} metalness={0.3} roughness={0.2} />
            </mesh>
          )}
          {obj.type === "cone" && (
            <mesh onClick={() => setSelectedObject(obj.id)}>
              <coneGeometry args={[obj.scale / 2, obj.scale, 32]} />
              <meshStandardMaterial color={obj.color} metalness={0.3} roughness={0.2} />
            </mesh>
          )}
          {obj.type === "torus" && (
            <mesh onClick={() => setSelectedObject(obj.id)}>
              <torusGeometry args={[obj.scale / 2, obj.scale / 4, 16, 32]} />
              <meshStandardMaterial color={obj.color} metalness={0.3} roughness={0.2} />
            </mesh>
          )}
          {obj.type === "icosahedron" && (
            <mesh onClick={() => setSelectedObject(obj.id)}>
              <icosahedronGeometry args={[obj.scale / 2, 0]} />
              <meshStandardMaterial color={obj.color} metalness={0.3} roughness={0.2} />
            </mesh>
          )}
        </group>
      ))}

      {isPlacing && (
        <mesh position={[0, -1, -3]} onClick={handlePlace}>
          <ringGeometry args={[0.1, 0.15, 32]} />
          <meshBasicMaterial color="#6366f1" transparent opacity={0.5} />
        </mesh>
      )}
    </>
  );
}

function SessionTracker({ onActiveChange }: { onActiveChange: (active: boolean) => void }) {
  const isPresenting = useXR((s) => s.isPresenting);
  useEffect(() => {
    onActiveChange(isPresenting);
  }, [isPresenting, onActiveChange]);
  return null;
}

export function ARViewer({ enabled = false, onClose }: ARViewerProps) {
  const [arSupported, setArSupported] = useState(false);
  const [isARActive, setIsARActive] = useState(false);
  const [objects, setObjects] = useState<ARObject[]>([]);
  const [isPlacing, setIsPlacing] = useState(false);
  const [selectedShape, setSelectedShape] = useState<ARShape>("cube");
  const [showUI, setShowUI] = useState(true);
  const [showInstructions, setShowInstructions] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof navigator !== "undefined" && navigator.xr) {
      navigator.xr
        .isSessionSupported("immersive-ar")
        .then((supported) => {
          setArSupported(supported);
        })
        .catch(() => {
          setArSupported(false);
        });
    }
  }, []);

  const handleObjectAdded = useCallback((obj: ARObject) => {
    setObjects((prev) => [...prev, obj]);
    setIsPlacing(false);
  }, []);

  const handleClearAll = useCallback(() => {
    setObjects([]);
  }, []);

  if (!enabled) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 z-[1000] bg-black">
      <Canvas
        style={{ width: "100%", height: "100%" }}
        camera={{ position: [0, 0, 0], fov: 75 }}
        gl={{ antialias: true }}
      >
        <XR>
          <SessionTracker onActiveChange={setIsARActive} />
          <ARScene
            objects={objects}
            isPlacing={isPlacing}
            shape={selectedShape}
            onObjectAdded={handleObjectAdded}
          />
        </XR>
      </Canvas>

      {arSupported && !isARActive && (
        <div className="absolute bottom-[100px] left-1/2 z-10 -translate-x-1/2">
          <ARButton
            sessionInit={{
              optionalFeatures: ["local-floor", "bounded-floor", "hand-tracking", "hit-test"],
            }}
            style={{
              padding: "16px 32px",
              borderRadius: "12px",
              border: "none",
              background: "rgba(99, 102, 241, 0.9)",
              color: "#f8fafc",
              fontSize: "16px",
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 4px 20px rgba(99, 102, 241, 0.4)",
            }}
          >
            Start AR Experience
          </ARButton>
        </div>
      )}

      {isARActive && showUI && (
        <>
          <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between bg-gradient-to-b from-black/70 to-transparent p-4">
            <h2 className="text-lg font-semibold text-white">📱 AR Mode</h2>
            <button
              type="button"
              onClick={() => setShowUI(false)}
              className="rounded-lg bg-white/20 px-3 py-2 text-sm text-white"
            >
              Hide UI
            </button>
          </div>

          <div className="absolute bottom-[120px] left-1/2 z-10 flex -translate-x-1/2 gap-2 rounded-xl bg-slate-900/90 p-3 backdrop-blur-md">
            {SHAPE_OPTIONS.map((shape) => (
              <button
                key={shape}
                type="button"
                onClick={() => setSelectedShape(shape)}
                className={`rounded-lg border-2 px-4 py-2 text-xs capitalize text-white transition-colors ${
                  selectedShape === shape
                    ? "border-primary bg-primary/30"
                    : "border-primary/30 bg-transparent"
                }`}
              >
                {shape}
              </button>
            ))}
          </div>

          <div className="absolute bottom-[60px] left-1/2 z-10 flex -translate-x-1/2 gap-3">
            <button
              type="button"
              onClick={() => setIsPlacing(!isPlacing)}
              className={`rounded-lg px-6 py-3 text-sm font-semibold text-white shadow-lg ${
                isPlacing ? "bg-red-500/90" : "bg-indigo-500/90"
              }`}
            >
              {isPlacing ? "✓ Place" : "➕ Add Object"}
            </button>
            <button
              type="button"
              onClick={handleClearAll}
              className="rounded-lg border border-red-500/50 px-6 py-3 text-sm text-red-400"
            >
              🗑 Clear All
            </button>
            <button
              type="button"
              onClick={() => onClose?.()}
              className="rounded-lg border border-indigo-500/50 px-6 py-3 text-sm text-white"
            >
              ✕ Exit
            </button>
          </div>

          {objects.length > 0 && (
            <div className="absolute right-4 top-[70px] z-10 rounded-lg bg-slate-900/90 px-4 py-2 text-xs text-white">
              {objects.length} object{objects.length !== 1 ? "s" : ""} placed
            </div>
          )}

          {showInstructions && (
            <div className="absolute left-1/2 top-1/2 z-10 max-w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-slate-900/95 p-6 text-center text-white backdrop-blur-md">
              <h3 className="mb-3 text-base">🎯 How to Use AR</h3>
              <ul className="mb-4 list-disc pl-5 text-left text-sm opacity-90">
                <li>Point camera at a flat surface</li>
                <li>Select a shape from the toolbar</li>
                <li>Tap &quot;Add Object&quot; then tap to place</li>
                <li>Tap objects to select them</li>
                <li>Use gestures to scale/rotate</li>
              </ul>
              <button
                type="button"
                onClick={() => setShowInstructions(false)}
                className="rounded-lg bg-indigo-500/90 px-5 py-2.5 text-sm text-white"
              >
                Got it!
              </button>
            </div>
          )}
        </>
      )}

      {!arSupported && (
        <div className="absolute inset-0 z-[1000] flex items-center justify-center bg-black/90 p-5">
          <div className="w-full max-w-[400px] rounded-2xl bg-card p-6 text-center text-foreground">
            <h2 className="mb-4 text-xl font-semibold">📱 AR Not Supported</h2>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              WebXR AR is not supported on this device or browser. Please use:
            </p>
            <ul className="mb-5 list-disc pl-5 text-left text-muted-foreground">
              <li>Chrome on Android (with ARCore)</li>
              <li>Safari on iOS 12+ (with AR Quick Look)</li>
              <li>Firefox Reality headset</li>
            </ul>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:brightness-110"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
