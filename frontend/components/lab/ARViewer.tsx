"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ARButton, XR, useXR } from "@react-three/xr";
import * as THREE from "three";

interface ARObject {
  id: string;
  position: [number, number, number];
  type: "cube" | "sphere" | "cone" | "torus" | "icosahedron";
  color: string;
  scale: number;
}

interface ARViewerProps {
  enabled?: boolean;
  onClose?: () => void;
  initialModel?: string;
}

function ARScene({ objects, onObjectAdded }: { objects: ARObject[]; onObjectAdded?: (obj: ARObject) => void }) {
  const [selectedObject, setSelectedObject] = useState<string | null>(null);
  const [isPlacing, setIsPlacing] = useState(false);
  const _isPresenting = useXR((s) => s.isPresenting);

  useFrame((state, _delta) => {
    if (selectedObject) {
      const obj = objects.find((o) => o.id === selectedObject);
      if (obj) {
        state.camera.position.lerp(new THREE.Vector3(obj.position[0], obj.position[1] + 0.5, obj.position[2]), 0.1);
      }
    }
  });

  const _handleTap = useCallback((event: any) => {
    if (!isPlacing) return;
    
    const point = event.point;
    if (point) {
      const newObject: ARObject = {
        id: Date.now().toString(),
        position: [point.x, point.y, point.z] as [number, number, number],
        type: "cube",
        color: "#6366f1",
        scale: 0.3,
      };
      onObjectAdded?.(newObject);
      setIsPlacing(false);
    }
  }, [isPlacing, onObjectAdded]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      
      {objects.map((obj) => (
        <group key={obj.id} position={obj.position}>
          {obj.type === "cube" && (
            <mesh
              onClick={() => setSelectedObject(obj.id)}
              onPointerOver={() => document.body.style.cursor = "pointer"}
              onPointerOut={() => document.body.style.cursor = "auto"}
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
        <mesh position={[0, -1, -3]}>
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

export function ARViewer({ enabled = false, onClose, initialModel: _initialModel }: ARViewerProps) {
  const [arSupported, setArSupported] = useState(false);
  const [isARActive, setIsARActive] = useState(false);
  const [objects, setObjects] = useState<ARObject[]>([]);
  const [isPlacing, setIsPlacing] = useState(false);
  const [selectedShape, setSelectedShape] = useState<ARObject["type"]>("cube");
  const [showUI, setShowUI] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDark = true;

  useEffect(() => {
    if (typeof navigator !== "undefined" && navigator.xr) {
      navigator.xr.isSessionSupported("immersive-ar").then((supported) => {
        setArSupported(supported);
      }).catch(() => {
        setArSupported(false);
      });
    }
  }, []);

  const handleObjectAdded = useCallback((obj: ARObject) => {
    setObjects((prev) => [...prev, obj]);
  }, []);

  const _handleRemoveObject = useCallback((id: string) => {
    setObjects((prev) => prev.filter((o) => o.id !== id));
  }, []);

  const handleClearAll = useCallback(() => {
    setObjects([]);
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "#000",
        zIndex: 1000,
      }}
    >
      {/* AR Canvas */}
      <Canvas
        style={{ width: "100%", height: "100%" }}
        camera={{ position: [0, 0, 0], fov: 75 }}
        gl={{ antialias: true }}
      >
        <XR>
          <SessionTracker onActiveChange={setIsARActive} />
          <ARScene objects={objects} onObjectAdded={handleObjectAdded} />
        </XR>
      </Canvas>

      {/* AR Button */}
      {arSupported && !isARActive && (
        <div style={{
          position: "absolute",
          bottom: "100px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
        }}>
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

      {/* Controls UI */}
      {isARActive && showUI && (
        <>
          {/* Top bar */}
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            padding: "16px",
            background: "linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            zIndex: 10,
          }}>
            <h2 style={{ margin: 0, color: "#f8fafc", fontSize: "18px", fontWeight: 600 }}>
              📱 AR Mode
            </h2>
            <button
              onClick={() => setShowUI(false)}
              style={{
                background: "rgba(255,255,255,0.2)",
                border: "none",
                borderRadius: "8px",
                color: "#f8fafc",
                padding: "8px 12px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              Hide UI
            </button>
          </div>

          {/* Shape selector */}
          <div style={{
            position: "absolute",
            bottom: "120px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "8px",
            background: "rgba(15, 23, 42, 0.9)",
            padding: "12px",
            borderRadius: "12px",
            zIndex: 10,
            backdropFilter: "blur(8px)",
          }}>
            {(["cube", "sphere", "cone", "torus", "icosahedron"] as const).map((shape) => (
              <button
                key={shape}
                onClick={() => setSelectedShape(shape)}
                style={{
                  padding: "10px 16px",
                  borderRadius: "8px",
                  border: selectedShape === shape ? "2px solid #6366f1" : "2px solid rgba(99, 102, 241, 0.3)",
                  background: selectedShape === shape ? "rgba(99, 102, 241, 0.3)" : "transparent",
                  color: "#f8fafc",
                  cursor: "pointer",
                  fontSize: "12px",
                  textTransform: "capitalize",
                }}
              >
                {shape}
              </button>
            ))}
          </div>

          {/* Action buttons */}
          <div style={{
            position: "absolute",
            bottom: "60px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "12px",
            zIndex: 10,
          }}>
            <button
              onClick={() => setIsPlacing(!isPlacing)}
              style={{
                padding: "12px 24px",
                borderRadius: "8px",
                border: "none",
                background: isPlacing ? "rgba(239, 68, 68, 0.9)" : "rgba(99, 102, 241, 0.9)",
                color: "#f8fafc",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              }}
            >
              {isPlacing ? "✓ Place" : "➕ Add Object"}
            </button>
            <button
              onClick={handleClearAll}
              style={{
                padding: "12px 24px",
                borderRadius: "8px",
                border: "1px solid rgba(239, 68, 68, 0.5)",
                background: "transparent",
                color: "#ef4444",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              🗑 Clear All
            </button>
            <button
              onClick={() => onClose?.()}
              style={{
                padding: "12px 24px",
                borderRadius: "8px",
                border: "1px solid rgba(99, 102, 241, 0.5)",
                background: "transparent",
                color: "#f8fafc",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              ✕ Exit
            </button>
          </div>

          {/* Object count */}
          {objects.length > 0 && (
            <div style={{
              position: "absolute",
              top: "70px",
              right: "16px",
              background: "rgba(15, 23, 42, 0.9)",
              padding: "8px 16px",
              borderRadius: "8px",
              color: "#f8fafc",
              fontSize: "12px",
              zIndex: 10,
            }}>
              {objects.length} object{objects.length !== 1 ? "s" : ""} placed
            </div>
          )}

          {/* Instructions */}
          <div style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "rgba(15, 23, 42, 0.95)",
            padding: "24px",
            borderRadius: "16px",
            color: "#f8fafc",
            textAlign: "center",
            zIndex: 10,
            maxWidth: "300px",
            backdropFilter: "blur(8px)",
          }}>
            <h3 style={{ margin: "0 0 12px", fontSize: "16px" }}>🎯 How to Use AR</h3>
            <ul style={{ margin: "0 0 16px", paddingLeft: "20px", textAlign: "left", fontSize: "13px", opacity: 0.9 }}>
              <li>Point camera at a flat surface</li>
              <li>Select a shape from the toolbar</li>
              <li>Tap "Add Object" then tap to place</li>
              <li>Tap objects to select them</li>
              <li>Use gestures to scale/rotate</li>
            </ul>
            <button
              onClick={() => document.querySelector<HTMLButtonElement>("[data-ar-button]")?.click()}
              style={{
                padding: "10px 20px",
                borderRadius: "8px",
                border: "none",
                background: "rgba(99, 102, 241, 0.9)",
                color: "#f8fafc",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              Got it!
            </button>
          </div>
        </>
      )}

      {!arSupported && (
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.9)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          padding: "20px",
        }}>
          <div style={{
            background: isDark ? "#1e293b" : "#f8fafc",
            borderRadius: "16px",
            padding: "24px",
            maxWidth: "400px",
            width: "100%",
            color: isDark ? "#f8fafc" : "#1e293b",
            textAlign: "center",
          }}>
            <h2 style={{ margin: "0 0 16px", fontSize: "20px" }}>📱 AR Not Supported</h2>
            <p style={{ opacity: 0.7, marginBottom: "16px", lineHeight: 1.6 }}>
              WebXR AR is not supported on this device or browser. Please use:
            </p>
            <ul style={{ textAlign: "left", opacity: 0.8, marginBottom: "20px", paddingLeft: "20px" }}>
              <li>Chrome on Android (with ARCore)</li>
              <li>Safari on iOS 12+ (with AR Quick Look)</li>
              <li>Firefox Reality headset</li>
            </ul>
            <button
              onClick={onClose}
              style={{
                padding: "12px 24px",
                borderRadius: "8px",
                border: "none",
                background: "rgba(99, 102, 241, 0.9)",
                color: "#f8fafc",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
