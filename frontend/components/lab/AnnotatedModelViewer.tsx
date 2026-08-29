"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Html, Line } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { Info } from "lucide-react";

// ─── Annotation type ───────────────────────────────────────────────
interface Annotation {
  id: string;
  label: string;
  description: string;
  origin: [number, number, number];
  target: [number, number, number];
  color?: string;
}

// ─── Camera ref setter ─────────────────────────────────────────────
function CameraRefSetter({
  ref,
}: {
  ref: React.MutableRefObject<THREE.PerspectiveCamera | null>;
}) {
  const { camera } = useThree();
  ref.current = camera;
  return null;
}

// ─── Sample mesh component ─────────────────────────────────────────
function SampleMesh({
  annotations,
  selectedId,
  onSelect,
}: {
  annotations: Annotation[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group>
      {/* Main body */}
      <mesh
        ref={meshRef}
        position={[0, 0, 0]}
        onClick={() => onSelect(null)}
        onPointerOver={() => setHovered("mesh")}
        onPointerOut={() => setHovered(null)}
      >
        <icosahedronGeometry args={[1.8, 1]} />
        <meshStandardMaterial
          color={selectedId ? "#6366f1" : hovered ? "#818cf8" : "#4f46e5"}
          metalness={0.3}
          roughness={0.2}
          emissive={selectedId ? "#312e81" : "transparent"}
          emissiveIntensity={selectedId ? 0.5 : 0}
        />
      </mesh>

      {/* Inner wireframe for visual depth */}
      <mesh scale={[0.95, 0.95, 0.95]}>
        <icosahedronGeometry args={[1.8, 1]} />
        <meshBasicMaterial color="#c7d2fe" wireframe transparent opacity={0.08} />
      </mesh>

      {/* Annotation arrows + labels */}
      {annotations.map((ann) => {
        const isSelected = selectedId === ann.id;
        const isHovered = hovered === ann.id;
        const scale = isSelected ? 1.15 : isHovered ? 1.08 : 1.0;

        return (
          <AnnotationRenderer
            key={ann.id}
            annotation={ann}
            isSelected={isSelected}
            scale={scale}
            onSelect={() => onSelect(isSelected ? null : ann.id)}
            onPointerOver={() => setHovered(ann.id)}
            onPointerOut={() => setHovered(null)}
          />
        );
      })}
    </group>
  );
}

// ─── Individual annotation renderer ────────────────────────────────
function AnnotationRenderer({
  annotation,
  isSelected,
  scale,
  onSelect,
  onPointerOver,
  onPointerOut,
}: {
  annotation: Annotation;
  isSelected: boolean;
  scale: number;
  onSelect: () => void;
  onPointerOver: () => void;
  onPointerOut: () => void;
}) {
  const lineRef = useRef<THREE.Line>(null);

  useFrame((_, delta) => {
    if (lineRef.current) {
      const targetScale = isSelected ? 1.15 : 1.0;
      lineRef.current.scale.setScalar(
        THREE.MathUtils.lerp(lineRef.current.scale.x, targetScale, delta * 6)
      );
    }
  });

  const color = annotation.color ?? (isSelected ? "#f59e0b" : "#94a3b8");

  return (
    <group>
      {/* 3D arrow line from mesh surface to label anchor */}
      <Line
        ref={lineRef}
        points={[annotation.origin, annotation.target] as [THREE.Vector3, THREE.Vector3]}
        color={color}
        lineWidth={isSelected ? 3 : 2}
        transparent
        opacity={isSelected ? 1 : 0.7}
      />

      {/* Arrowhead cone at target */}
      <mesh
        position={new THREE.Vector3(...annotation.target)}
        rotation={computeArrowRotation(annotation.origin, annotation.target)}
      >
        <coneGeometry args={[0.08, 0.2, 8]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} />
      </mesh>

      {/* Screen-space HTML label anchored to arrow tip */}
      <Html
        position={annotation.target}
        center
        distanceFactor={18}
        style={{
          pointerEvents: "auto",
          cursor: "pointer",
          transform: `scale(${scale})`,
          transition: "transform 0.2s ease",
        }}
        onClick={onSelect}
        onPointerOver={onPointerOver}
        onPointerOut={onPointerOut}
      >
        <div
          style={{
            background: isSelected
              ? "rgba(245, 158, 11, 0.15)"
              : "rgba(15, 23, 42, 0.85)",
            border: `1px solid ${isSelected ? "#f59e0b" : "#334155"}`,
            borderRadius: 8,
            padding: "8px 12px",
            color: "#f1f5f9",
            fontSize: 13,
            fontFamily: "inherit",
            backdropFilter: "blur(8px)",
            boxShadow: isSelected
              ? "0 0 16px rgba(245, 158, 11, 0.3)"
              : "0 4px 12px rgba(0,0,0,0.4)",
            minWidth: 120,
            maxWidth: 200,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
            <Info size={14} color={color} />
            <span style={{ fontWeight: 600, fontSize: 13 }}>{annotation.label}</span>
          </div>
          <p style={{ margin: 0, fontSize: 11, opacity: 0.75, lineHeight: 1.4 }}>
            {annotation.description}
          </p>
        </div>
      </Html>
    </group>
  );
}

// ─── Helpers ───────────────────────────────────────────────────────
function computeArrowRotation(
  from: [number, number, number],
  to: [number, number, number]
): [number, number, number] {
  const dir = new THREE.Vector3(...to).sub(new THREE.Vector3(...from)).normalize();
  const euler = new THREE.Euler().setFromVector3(dir);
  return [euler.x, euler.y, euler.z];
}

// ─── Sample annotations ────────────────────────────────────────────
const SAMPLE_ANNOTATIONS: Annotation[] = [
  {
    id: "core",
    label: "Core Module",
    description: "Central processing unit handling all computations.",
    origin: [0.5, 0.3, 1.2],
    target: [2.5, 2.0, 2.5],
    color: "#6366f1",
  },
  {
    id: "input",
    label: "Input Layer",
    description: "Receives and normalizes incoming data streams.",
    origin: [-1.0, 0.8, 0.5],
    target: [-3.0, 2.5, 1.0],
    color: "#22d3ee",
  },
  {
    id: "output",
    label: "Output Layer",
    description: "Produces final predictions and formatted results.",
    origin: [0.8, -0.6, -1.0],
    target: [3.0, -2.0, -2.0],
    color: "#34d399",
  },
  {
    id: "memory",
    label: "Memory Buffer",
    description: "Temporary storage for intermediate state.",
    origin: [-0.3, -1.0, 0.8],
    target: [-2.0, -2.5, 2.5],
    color: "#f472b6",
  },
];

// ─── Main viewer component ─────────────────────────────────────────
export default function AnnotatedModelViewer() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  const handleSelect = useCallback((id: string | null) => {
    setSelectedId((prev) => {
      if (prev === id) return null;
      if (id && cameraRef.current) {
        const ann = SAMPLE_ANNOTATIONS.find((a) => a.id === id);
        if (ann) {
          gsap.to(cameraRef.current.position, {
            x: ann.target[0] * 0.4,
            y: ann.target[1] * 0.4 + 2,
            z: ann.target[2] * 0.4 + 6,
            duration: 0.8,
            ease: "power2.inOut",
          });
        }
      }
      return id;
    });
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        minHeight: 500,
        background: "#0f172a",
        borderRadius: 12,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Canvas camera={{ position: [8, 6, 12], fov: 50 }} gl={{ antialias: true, alpha: false }}>
        <CameraRefSetter ref={cameraRef} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 15, 10]} intensity={1.2} castShadow />
        <pointLight position={[-5, 5, -5]} color="#6366f1" intensity={0.5} />

        <SampleMesh
          annotations={SAMPLE_ANNOTATIONS}
          selectedId={selectedId}
          onSelect={handleSelect}
        />

        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={5}
          maxDistance={30}
          autoRotate={false}
        />

        <fog attach="fog" args={["#0f172a", 30, 80]} />
      </Canvas>

      {/* Legend overlay */}
      <div
        style={{
          position: "absolute",
          bottom: 16,
          left: 16,
          background: "rgba(15, 23, 42, 0.8)",
          border: "1px solid #1e293b",
          borderRadius: 8,
          padding: "10px 14px",
          color: "#94a3b8",
          fontSize: 12,
          backdropFilter: "blur(8px)",
        }}
      >
        <div style={{ fontWeight: 600, color: "#e2e8f0", marginBottom: 6 }}>
          Annotations
        </div>
        {SAMPLE_ANNOTATIONS.map((a) => (
          <div
            key={a.id}
            onClick={() => handleSelect(selectedId === a.id ? null : a.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "3px 0",
              cursor: "pointer",
              color: selectedId === a.id ? a.color : "#94a3b8",
              transition: "color 0.2s",
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: a.color,
                flexShrink: 0,
              }}
            />
            {a.label}
          </div>
        ))}
      </div>
    </div>
  );
}
