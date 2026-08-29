"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Line, Html, OrbitControls } from "@react-three/drei";
import gsap from "gsap";
import * as THREE from "three";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Annotation {
  id: string;
  position: [number, number, number];
  label: string;
  description?: string;
  color?: string;
}

interface AnnotatedModelViewerProps {
  annotations?: Annotation[];
  className?: string;
  autoRotate?: boolean;
  autoFitOnLoad?: boolean;
  autoAdjustAnnotations?: boolean;
}

// ─── Camera Ref Setter (exposes camera ref for external control) ─────────────

function CameraRefSetter({
  onCameraRef,
}: {
  onCameraRef: (camera: THREE.PerspectiveCamera) => void;
}) {
  const { camera } = useThree();
  useEffect(() => {
    onCameraRef(camera);
  }, [camera, onCameraRef]);
  return null;
}

// ─── Auto-adjust annotation positions based on mesh bounds ──────────────────

function getAutoAnnotationPositions(
  meshSize: number,
  count: number
): [number, number, number][] {
  const positions: [number, number, number][] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2; // -1 to 1
    const radius = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;

    positions.push([
      Math.cos(theta) * radius * meshSize * 1.5,
      y * meshSize * 1.5,
      Math.sin(theta) * radius * meshSize * 1.5,
    ]);
  }

  return positions;
}

// ─── Sample Mesh with Annotations ────────────────────────────────────────────

function SampleMesh({
  annotations,
  onAnnotationClick,
  autoAdjust = true,
}: {
  annotations: Annotation[];
  onAnnotationClick: (id: string) => void;
  autoAdjust?: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.1;
      meshRef.current.rotation.y += delta * 0.15;
    }
  });

  // Auto-adjust annotation positions based on mesh size
  const adjustedAnnotations = autoAdjust
    ? annotations.map((ann, index) => ({
        ...ann,
        position: getAutoAnnotationPositions(1.5, annotations.length)[index] ||
          ann.position,
      }))
    : annotations;

  return (
    <group ref={groupRef}>
      {/* Main icosahedron */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshStandardMaterial
          color="#6366f1"
          metalness={0.3}
          roughness={0.2}
          emissive="#4f46e5"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Inner wireframe */}
      <mesh position={[0, 0, 0]}>
        <icosahedronGeometry args={[1.52, 1]} />
        <meshBasicMaterial color="#818cf8" wireframe transparent opacity={0.3} />
      </mesh>

      {/* Annotations */}
      {adjustedAnnotations.map((annotation) => {
        const isHovered = hoveredId === annotation.id;
        const scale = isHovered ? 1.1 : 1.0;

        return (
          <group key={annotation.id} position={annotation.position}>
            {/* Arrow line from mesh surface to label */}
            <Line
              points={[
                [0, 0, 0],
                [0, 1.2, 0],
              ]}
              color={annotation.color || "#f59e0b"}
              lineWidth={isHovered ? 3 : 2}
            />
            {/* Dot at annotation point */}
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshStandardMaterial
                color={annotation.color || "#f59e0b"}
                emissive={annotation.color || "#f59e0b"}
                emissiveIntensity={0.5}
              />
            </mesh>
            {/* HTML label */}
            <Html
              position={[0, 1.4, 0]}
              center
              distanceFactor={15}
              style={{
                pointerEvents: "auto",
                cursor: "pointer",
                transform: `translate(-50%, -50%) scale(${scale})`,
                transition: "transform 0.2s ease",
              }}
              onClick={() => onAnnotationClick(annotation.id)}
              onPointerOver={() => setHoveredId(annotation.id)}
              onPointerOut={() => setHoveredId(null)}
            >
              <div
                style={{
                  background: isHovered
                    ? "rgba(99, 102, 241, 0.95)"
                    : "rgba(15, 23, 42, 0.9)",
                  border: `1px solid ${annotation.color || "#f59e0b"}`,
                  borderRadius: "8px",
                  padding: "8px 12px",
                  color: "#f8fafc",
                  fontSize: "13px",
                  fontWeight: 500,
                  maxWidth: "200px",
                  minWidth: "100px",
                  boxShadow: isHovered
                    ? "0 6px 20px rgba(99, 102, 241, 0.4)"
                    : "0 4px 12px rgba(0,0,0,0.3)",
                  transition: "all 0.2s ease",
                }}
              >
                <div style={{ fontWeight: 600 }}>{annotation.label}</div>
                {annotation.description && (
                  <div
                    style={{
                      fontSize: "11px",
                      color: "#94a3b8",
                      marginTop: "4px",
                    }}
                  >
                    {annotation.description}
                  </div>
                )}
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}

// ─── Legend Overlay ──────────────────────────────────────────────────────────

function LegendOverlay({
  annotations,
  onAnnotationClick,
  activeAnnotation,
}: {
  annotations: Annotation[];
  onAnnotationClick: (id: string) => void;
  activeAnnotation: string | null;
}) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: "20px",
        left: "20px",
        background: "rgba(15, 23, 42, 0.95)",
        border: "1px solid rgba(99, 102, 241, 0.3)",
        borderRadius: "12px",
        padding: "16px",
        color: "#f8fafc",
        zIndex: 10,
        minWidth: "180px",
        maxWidth: "250px",
        backdropFilter: "blur(8px)",
        transition: "all 0.3s ease",
      }}
    >
      <h3
        style={{
          margin: "0 0 12px 0",
          fontSize: "14px",
          fontWeight: 600,
          color: "#818cf8",
        }}
      >
        Annotations
      </h3>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          maxHeight: "200px",
          overflowY: "auto",
        }}
      >
        {annotations.map((annotation) => (
          <button
            key={annotation.id}
            onClick={() => onAnnotationClick(annotation.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background:
                activeAnnotation === annotation.id
                  ? "rgba(99, 102, 241, 0.3)"
                  : "transparent",
              border: "none",
              color: "#e2e8f0",
              cursor: "pointer",
              padding: "6px 8px",
              borderRadius: "6px",
              fontSize: "12px",
              textAlign: "left",
              width: "100%",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "rgba(99, 102, 241, 0.2)";
            }}
            onMouseLeave={(e) => {
              if (activeAnnotation !== annotation.id) {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "transparent";
              }
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: annotation.color || "#f59e0b",
                flexShrink: 0,
                boxShadow:
                  activeAnnotation === annotation.id
                    ? `0 0 8px ${annotation.color || "#f59e0b"}`
                    : "none",
                transition: "all 0.2s",
              }}
            />
            <span style={{ flex: 1 }}>{annotation.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export function AnnotatedModelViewer({
  annotations = [
    {
      id: "1",
      position: [2, 1.5, 0] as [number, number, number],
      label: "Vertex A",
      description: "Top vertex of the icosahedron",
      color: "#f59e0b",
    },
    {
      id: "2",
      position: [-1.5, -0.5, 1.2] as [number, number, number],
      label: "Edge B",
      description: "Connecting edge with golden ratio",
      color: "#10b981",
    },
    {
      id: "3",
      position: [0, -1.8, -1] as [number, number, number],
      label: "Face C",
      description: "Triangular face with normal vector",
      color: "#ef4444",
    },
    {
      id: "4",
      position: [1.2, 0, -1.8] as [number, number, number],
      label: "Center D",
      description: "Geometric center point",
      color: "#8b5cf6",
    },
  ],
  className = "",
  autoRotate = true,
  autoFitOnLoad = true,
  autoAdjustAnnotations = true,
}: AnnotatedModelViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const [activeAnnotation, setActiveAnnotation] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [isAutoRotating, setIsAutoRotating] = useState(autoRotate);

  // Auto-adjust dimensions on resize
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateDimensions = () => {
      const rect = container.getBoundingClientRect();
      setDimensions({
        width: rect.width || 800,
        height: rect.height || 600,
      });
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Auto-fit camera on load
  useEffect(() => {
    if (!autoFitOnLoad || !cameraRef.current) return;

    const camera = cameraRef.current;
    gsap.to(camera.position, {
      x: 8,
      y: 6,
      z: 12,
      duration: 1.2,
      ease: "power2.inOut",
    });
  }, [autoFitOnLoad]);

  // Focus camera on annotation
  const handleAnnotationClick = useCallback((id: string) => {
    setActiveAnnotation((prev) => (prev === id ? null : id));

    if (id && cameraRef.current) {
      const annotation = annotations.find((a) => a.id === id);
      if (annotation) {
        gsap.to(cameraRef.current.position, {
          x: annotation.position[0] * 0.8,
          y: annotation.position[1] * 0.8 + 3,
          z: annotation.position[2] * 0.8 + 8,
          duration: 0.8,
          ease: "power2.inOut",
        });
      }
    }
  }, [annotations]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        width: "100%",
        height: "100%",
        minHeight: "400px",
        position: "relative",
        borderRadius: "12px",
        overflow: "hidden",
        background: "#0f172a",
      }}
    >
      <Canvas
        style={{
          width: "100%",
          height: "100%",
          display: "block",
        }}
        camera={{
          position: [8, 6, 12],
          fov: 50,
          near: 0.1,
          far: 1000,
        }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
        }}
        onCreated={({ gl, camera }) => {
          cameraRef.current = camera as THREE.PerspectiveCamera;
        }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
        />
        <pointLight
          position={[-10, -10, -10]}
          intensity={0.5}
          color="#6366f1"
        />
        <pointLight
          position={[10, -5, 10]}
          intensity={0.3}
          color="#f59e0b"
        />

        {/* Scene */}
        <SampleMesh
          annotations={annotations}
          onAnnotationClick={handleAnnotationClick}
          autoAdjust={autoAdjustAnnotations}
        />

        {/* Grid helper (subtle) */}
        <gridHelper
          args={[20, 20, "#1e293b", "#0f172a"]}
          position={[0, -3, 0]}
        />

        {/* Orbit controls */}
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          autoRotate={isAutoRotating}
          autoRotateSpeed={1}
          minDistance={5}
          maxDistance={30}
          enablePan={true}
          panSpeed={0.5}
        />
      </Canvas>

      {/* Legend overlay */}
      <LegendOverlay
        annotations={annotations}
        onAnnotationClick={handleAnnotationClick}
        activeAnnotation={activeAnnotation}
      />

      {/* Controls overlay */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          display: "flex",
          gap: "8px",
          zIndex: 10,
        }}
      >
        <button
          onClick={() => setIsAutoRotating(!isAutoRotating)}
          style={{
            background: isAutoRotating
              ? "rgba(99, 102, 241, 0.9)"
              : "rgba(15, 23, 42, 0.9)",
            border: "1px solid rgba(99, 102, 241, 0.5)",
            borderRadius: "8px",
            padding: "8px 12px",
            color: "#f8fafc",
            fontSize: "12px",
            cursor: "pointer",
            backdropFilter: "blur(8px)",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.opacity = "0.9";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.opacity = "1";
          }}
        >
          {isAutoRotating ? "⏸ Pause" : "▶ Rotate"}
        </button>
        <button
          onClick={() => {
            if (cameraRef.current) {
              gsap.to(cameraRef.current.position, {
                x: 8,
                y: 6,
                z: 12,
                duration: 1,
                ease: "power2.inOut",
              });
            }
            setActiveAnnotation(null);
          }}
          style={{
            background: "rgba(15, 23, 42, 0.9)",
            border: "1px solid rgba(99, 102, 241, 0.5)",
            borderRadius: "8px",
            padding: "8px 12px",
            color: "#f8fafc",
            fontSize: "12px",
            cursor: "pointer",
            backdropFilter: "blur(8px)",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.opacity = "0.9";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.opacity = "1";
          }}
        >
          ↺ Reset
        </button>
      </div>

      {/* Active annotation info */}
      {activeAnnotation && (
        <div
          style={{
            position: "absolute",
            top: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(15, 23, 42, 0.95)",
            border: "1px solid rgba(99, 102, 241, 0.5)",
            borderRadius: "12px",
            padding: "12px 20px",
            color: "#f8fafc",
            zIndex: 10,
            backdropFilter: "blur(8px)",
            minWidth: "200px",
            maxWidth: "300px",
            textAlign: "center",
            transition: "all 0.3s ease",
          }}
        >
          <div style={{ fontWeight: 600, fontSize: "14px" }}>
            {
              annotations.find((a) => a.id === activeAnnotation)?.label
            }
          </div>
          <div
            style={{
              fontSize: "12px",
              color: "#94a3b8",
              marginTop: "4px",
            }}
          >
            {
              annotations.find((a) => a.id === activeAnnotation)
                ?.description
            }
          </div>
        </div>
      )}
    </div>
  );
}
