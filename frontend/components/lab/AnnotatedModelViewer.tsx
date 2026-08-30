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
  quizQuestion?: QuizQuestion;
}

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface ModelPreset {
  name: string;
  type: "icosahedron" | "torus" | "cube" | "sphere" | "molecule" | "cylinder" | "cone" | "custom";
  color?: string;
  annotations?: Annotation[];
}

interface AnnotatedModelViewerProps {
  annotations?: Annotation[];
  className?: string;
  autoRotate?: boolean;
  autoFitOnLoad?: boolean;
  autoAdjustAnnotations?: boolean;
  modelPreset?: ModelPreset;
  onQuizComplete?: (score: number) => void;
  onProgressUpdate?: (topic: string, progress: number) => void;
}

// ─── Model Presets ───────────────────────────────────────────────────────────

const MODEL_PRESETS: ModelPreset[] = [
  {
    name: "Icosahedron",
    type: "icosahedron",
    color: "#6366f1",
    annotations: [
      { id: "1", position: [0, 1.5, 0] as [number, number, number], label: "Vertex A", description: "Top vertex", color: "#f59e0b" },
      { id: "2", position: [-1.5, -0.5, 1.2] as [number, number, number], label: "Edge B", description: "Golden ratio edge", color: "#10b981" },
      { id: "3", position: [0, -1.8, -1] as [number, number, number], label: "Face C", description: "Triangular face", color: "#ef4444" },
    ],
  },
  {
    name: "Torus",
    type: "torus",
    color: "#10b981",
    annotations: [
      { id: "1", position: [2, 0, 0] as [number, number, number], label: "Outer Ring", description: "Major radius", color: "#f59e0b" },
      { id: "2", position: [0, 0, 2] as [number, number, number], label: "Tube Cross-section", description: "Minor radius", color: "#6366f1" },
    ],
  },
  {
    name: "Cube",
    type: "cube",
    color: "#ef4444",
    annotations: [
      { id: "1", position: [1, 1, 1] as [number, number, number], label: "Corner Vertex", description: "8 vertices total", color: "#f59e0b" },
      { id: "2", position: [0, 1, 0] as [number, number, number], label: "Edge", description: "12 edges total", color: "#10b981" },
      { id: "3", position: [0, 0, 1] as [number, number, number], label: "Face", description: "6 faces total", color: "#6366f1" },
    ],
  },
  {
    name: "Sphere",
    type: "sphere",
    color: "#8b5cf6",
    annotations: [
      { id: "1", position: [0, 1.5, 0] as [number, number, number], label: "North Pole", description: "Top of sphere", color: "#f59e0b" },
      { id: "2", position: [1.5, 0, 0] as [number, number, number], label: "Equator", description: "Midline circle", color: "#10b981" },
    ],
  },
  {
    name: "Molecule (H2O)",
    type: "molecule",
    color: "#06b6d4",
    annotations: [
      { id: "1", position: [0, 0, 0] as [number, number, number], label: "Oxygen", description: "Central atom", color: "#ef4444" },
      { id: "2", position: [-1.2, 0.8, 0] as [number, number, number], label: "Hydrogen 1", description: "Bond angle 104.5°", color: "#f59e0b" },
      { id: "3", position: [1.2, 0.8, 0] as [number, number, number], label: "Hydrogen 2", description: "Polar molecule", color: "#3b82f6" },
    ],
  },
  {
    name: "Cylinder",
    type: "cylinder",
    color: "#f59e0b",
    annotations: [
      { id: "1", position: [0, 1.5, 0] as [number, number, number], label: "Top Circle", description: "Base radius r", color: "#6366f1" },
      { id: "2", position: [0, 0, 0] as [number, number, number], label: "Height", description: "Axis height h", color: "#10b981" },
    ],
  },
  {
    name: "Cone",
    type: "cone",
    color: "#ec4899",
    annotations: [
      { id: "1", position: [0, 1.5, 0] as [number, number, number], label: "Apex", description: "Top point", color: "#f59e0b" },
      { id: "2", position: [1, 0, 0] as [number, number, number], label: "Base Radius", description: "r", color: "#6366f1" },
    ],
  },
];

// ─── Camera Ref Setter ───────────────────────────────────────────────────────

function CameraRefSetter({
  onCameraRef,
}: {
  onCameraRef: (camera: THREE.PerspectiveCamera) => void;
}) {
  const { camera } = useThree();
  useEffect(() => {
    onCameraRef(camera as unknown as THREE.PerspectiveCamera);
  }, [camera, onCameraRef]);
  return null;
}

// ─── Auto-adjust annotation positions ────────────────────────────────────────

function getAutoAnnotationPositions(
  meshSize: number,
  count: number
): [number, number, number][] {
  const positions: [number, number, number][] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / Math.max(count - 1, 1)) * 2;
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

// ─── Distance calculation ────────────────────────────────────────────────────

function calculateDistance(
  pos1: [number, number, number],
  pos2: [number, number, number]
): number {
  const dx = pos2[0] - pos1[0];
  const dy = pos2[1] - pos1[1];
  const dz = pos2[2] - pos1[2];
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

// ─── Sample Mesh Component ───────────────────────────────────────────────────

function SampleMesh({
  annotations,
  onAnnotationClick,
  autoAdjust = true,
  explodedView = false,
  explodeFactor = 1.5,
  modelType = "icosahedron",
  modelColor = "#6366f1",
}: {
  annotations: Annotation[];
  onAnnotationClick: (id: string) => void;
  autoAdjust?: boolean;
  explodedView?: boolean;
  explodeFactor?: number;
  modelType?: string;
  modelColor?: string;
}) {
  const meshRef = useRef<THREE.Group>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
    }
  });

  const adjustedAnnotations = autoAdjust
    ? annotations.map((ann, index) => ({
        ...ann,
        position: getAutoAnnotationPositions(1.5, annotations.length)[index] || ann.position,
      }))
    : annotations;

  const getExplodedPosition = (pos: [number, number, number]): [number, number, number] => {
    if (!explodedView) return pos;
    const [x, y, z] = pos;
    const len = Math.sqrt(x * x + y * y + z * z) || 1;
    return [(x / len) * len * explodeFactor, (y / len) * len * explodeFactor, (z / len) * len * explodeFactor] as [number, number, number];
  };

  const renderModel = () => {
    const material = (
      <meshStandardMaterial
        color={modelColor}
        metalness={0.3}
        roughness={0.2}
        emissive={modelColor}
        emissiveIntensity={0.1}
      />
    );

    switch (modelType) {
      case "torus":
        return <mesh><torusGeometry args={[1.2, 0.4, 16, 32]} /><primitive object={material} /></mesh>;
      case "cube":
        return <mesh><boxGeometry args={[2, 2, 2]} /><primitive object={material} /></mesh>;
      case "sphere":
        return <mesh><sphereGeometry args={[1.5, 32, 32]} /><primitive object={material} /></mesh>;
      case "cylinder":
        return <mesh><cylinderGeometry args={[1, 1, 2.5, 32]} /><primitive object={material} /></mesh>;
      case "cone":
        return <mesh><coneGeometry args={[1.2, 2.5, 32]} /><primitive object={material} /></mesh>;
      case "molecule":
        return (
          <group>
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[0.5, 16, 16]} />
              <meshStandardMaterial color="#ef4444" />
            </mesh>
            <mesh position={[-1, 0.7, 0]}>
              <sphereGeometry args={[0.3, 16, 16]} />
              <meshStandardMaterial color="#f59e0b" />
            </mesh>
            <mesh position={[1, 0.7, 0]}>
              <sphereGeometry args={[0.3, 16, 16]} />
              <meshStandardMaterial color="#3b82f6" />
            </mesh>
            <line>
              <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[new Float32Array([0, 0, 0, -1, 0.7, 0]), 3]} />
              </bufferGeometry>
              <lineBasicMaterial color="#94a3b8" />
            </line>
            <line>
              <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[new Float32Array([0, 0, 0, 1, 0.7, 0]), 3]} />
              </bufferGeometry>
              <lineBasicMaterial color="#94a3b8" />
            </line>
          </group>
        );
      default:
        return (
          <>
            <mesh><icosahedronGeometry args={[1.5, 1]} /><primitive object={material} /></mesh>
            <mesh position={[0, 0, 0]}>
              <icosahedronGeometry args={[1.52, 1]} />
              <meshBasicMaterial color="#818cf8" wireframe transparent opacity={0.3} />
            </mesh>
          </>
        );
    }
  };

  return (
    <group ref={meshRef}>
      {renderModel()}
      {adjustedAnnotations.map((annotation) => {
        const isHovered = hoveredId === annotation.id;
        const scale = isHovered ? 1.1 : 1.0;
        const explodedPos = getExplodedPosition(annotation.position);

        return (
          <group key={annotation.id} position={explodedPos}>
            <Line
              points={[
                [0, 0, 0],
                [0, 1.2, 0],
              ]}
              color={annotation.color || "#f59e0b"}
              lineWidth={isHovered ? 3 : 2}
            />
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshStandardMaterial
                color={annotation.color || "#f59e0b"}
                emissive={annotation.color || "#f59e0b"}
                emissiveIntensity={0.5}
              />
            </mesh>
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
                  background: isHovered ? "rgba(99, 102, 241, 0.95)" : "rgba(15, 23, 42, 0.9)",
                  border: `1px solid ${annotation.color || "#f59e0b"}`,
                  borderRadius: "8px",
                  padding: "8px 12px",
                  color: "#f8fafc",
                  fontSize: "13px",
                  fontWeight: 500,
                  maxWidth: "200px",
                  minWidth: "100px",
                  boxShadow: isHovered ? "0 6px 20px rgba(99, 102, 241, 0.4)" : "0 4px 12px rgba(0,0,0,0.3)",
                  transition: "all 0.2s ease",
                }}
              >
                <div style={{ fontWeight: 600 }}>{annotation.label}</div>
                {annotation.description && (
                  <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "4px" }}>
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

// ─── Quiz Modal ──────────────────────────────────────────────────────────────

function QuizModal({
  question,
  onClose,
  onComplete,
  theme,
}: {
  question: QuizQuestion;
  onClose: () => void;
  onComplete: (correct: boolean) => void;
  theme: "dark" | "light";
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const isDark = theme === "dark";

  const handleSelect = (index: number) => {
    if (showResult) return;
    setSelected(index);
    setShowResult(true);
    onComplete(index === question.correctAnswer);
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
        backdropFilter: "blur(4px)",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: isDark ? "#1e293b" : "#f8fafc",
          border: `1px solid ${isDark ? "rgba(99, 102, 241, 0.5)" : "rgba(99, 102, 241, 0.3)"}`,
          borderRadius: "16px",
          padding: "24px",
          maxWidth: "400px",
          width: "90%",
          color: isDark ? "#f8fafc" : "#1e293b",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 600 }}>Quiz Question</h3>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: isDark ? "#94a3b8" : "#64748b",
              cursor: "pointer",
              fontSize: "20px",
              padding: "4px",
            }}
          >
            ✕
          </button>
        </div>
        <p style={{ fontSize: "14px", marginBottom: "16px", lineHeight: 1.5 }}>{question.question}</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSelect(index)}
              style={{
                padding: "12px 16px",
                borderRadius: "8px",
                border: `2px solid ${showResult ? (index === question.correctAnswer ? "#10b981" : selected === index ? "#ef4444" : isDark ? "rgba(99, 102, 241, 0.3)" : "rgba(99, 102, 241, 0.2)") : isDark ? "rgba(99, 102, 241, 0.3)" : "rgba(99, 102, 241, 0.2)"}`,
                background: showResult && index === question.correctAnswer ? "rgba(16, 185, 129, 0.2)" : showResult && selected === index && index !== question.correctAnswer ? "rgba(239, 68, 68, 0.2)" : "transparent",
                color: isDark ? "#e2e8f0" : "#334155",
                cursor: showResult ? "default" : "pointer",
                fontSize: "13px",
                textAlign: "left",
                transition: "all 0.2s",
              }}
            >
              {option}
            </button>
          ))}
        </div>
        {showResult && (
          <div style={{ marginTop: "16px", padding: "12px", borderRadius: "8px", background: isDark ? "rgba(99, 102, 241, 0.2)" : "rgba(99, 102, 241, 0.1)", fontSize: "12px" }}>
            <strong>{selected === question.correctAnswer ? "✓ Correct!" : "✗ Incorrect"}</strong>
            <p style={{ margin: "8px 0 0", opacity: 0.8 }}>{question.explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Walkthrough Component ───────────────────────────────────────────────────

function WalkthroughOverlay({
  annotations,
  currentStep,
  totalSteps,
  onComplete,
  onNext,
  onPrev,
  theme,
}: {
  annotations: Annotation[];
  currentStep: number;
  totalSteps: number;
  onComplete: () => void;
  onNext: () => void;
  onPrev: () => void;
  theme: "dark" | "light";
}) {
  const isDark = theme === "dark";
  const currentAnnotation = annotations[currentStep];

  return (
    <div
      style={{
        position: "absolute",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        background: isDark ? "rgba(15, 23, 42, 0.95)" : "rgba(248, 250, 252, 0.95)",
        border: `1px solid ${isDark ? "rgba(99, 102, 241, 0.5)" : "rgba(99, 102, 241, 0.3)"}`,
        borderRadius: "16px",
        padding: "20px 24px",
        color: isDark ? "#f8fafc" : "#1e293b",
        zIndex: 50,
        minWidth: "300px",
        maxWidth: "500px",
        backdropFilter: "blur(8px)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
        <span style={{ fontSize: "12px", color: isDark ? "#94a3b8" : "#64748b" }}>
          Step {currentStep + 1} of {totalSteps}
        </span>
        <div style={{ display: "flex", gap: "4px" }}>
          {annotations.map((_, i) => (
            <div
              key={i}
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: i === currentStep ? "#6366f1" : isDark ? "rgba(99, 102, 241, 0.3)" : "rgba(99, 102, 241, 0.2)",
              }}
            />
          ))}
        </div>
      </div>
      <h3 style={{ margin: "0 0 8px", fontSize: "16px", fontWeight: 600 }}>{currentAnnotation?.label}</h3>
      <p style={{ margin: "0 0 16px", fontSize: "13px", opacity: 0.8, lineHeight: 1.5 }}>{currentAnnotation?.description}</p>
      <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
        <button
          onClick={onPrev}
          disabled={currentStep === 0}
          style={{
            padding: "8px 16px",
            borderRadius: "8px",
            border: `1px solid ${isDark ? "rgba(99, 102, 241, 0.5)" : "rgba(99, 102, 241, 0.3)"}`,
            background: "transparent",
            color: isDark ? "#e2e8f0" : "#334155",
            cursor: currentStep === 0 ? "not-allowed" : "pointer",
            opacity: currentStep === 0 ? 0.5 : 1,
          }}
        >
          ← Prev
        </button>
        <button
          onClick={onComplete}
          style={{
            padding: "8px 16px",
            borderRadius: "8px",
            border: "none",
            background: "rgba(99, 102, 241, 0.9)",
            color: "#f8fafc",
            cursor: "pointer",
          }}
        >
          Finish
        </button>
        <button
          onClick={onNext}
          disabled={currentStep === totalSteps - 1}
          style={{
            padding: "8px 16px",
            borderRadius: "8px",
            border: `1px solid ${isDark ? "rgba(99, 102, 241, 0.5)" : "rgba(99, 102, 241, 0.3)"}`,
            background: "transparent",
            color: isDark ? "#e2e8f0" : "#334155",
            cursor: currentStep === totalSteps - 1 ? "not-allowed" : "pointer",
            opacity: currentStep === totalSteps - 1 ? 0.5 : 1,
          }}
        >
          Next →
        </button>
      </div>
    </div>
  );
}

// ─── Legend Overlay ──────────────────────────────────────────────────────────

function LegendOverlay({
  annotations,
  onAnnotationClick,
  activeAnnotation,
  theme,
}: {
  annotations: Annotation[];
  onAnnotationClick: (id: string) => void;
  activeAnnotation: string | null;
  theme: "dark" | "light";
}) {
  const isDark = theme === "dark";

  return (
    <div
      style={{
        position: "absolute",
        bottom: "20px",
        left: "20px",
        background: isDark ? "rgba(15, 23, 42, 0.95)" : "rgba(248, 250, 252, 0.95)",
        border: `1px solid ${isDark ? "rgba(99, 102, 241, 0.3)" : "rgba(99, 102, 241, 0.5)"}`,
        borderRadius: "12px",
        padding: "16px",
        color: isDark ? "#f8fafc" : "#1e293b",
        zIndex: 10,
        minWidth: "180px",
        maxWidth: "250px",
        backdropFilter: "blur(8px)",
      }}
    >
      <h3 style={{ margin: "0 0 12px", fontSize: "14px", fontWeight: 600, color: isDark ? "#818cf8" : "#4f46e5" }}>
        Annotations
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxHeight: "200px", overflowY: "auto" }}>
        {annotations.map((annotation) => (
          <button
            key={annotation.id}
            onClick={() => onAnnotationClick(annotation.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: activeAnnotation === annotation.id ? (isDark ? "rgba(99, 102, 241, 0.3)" : "rgba(99, 102, 241, 0.2)") : "transparent",
              border: "none",
              color: isDark ? "#e2e8f0" : "#334155",
              cursor: "pointer",
              padding: "6px 8px",
              borderRadius: "6px",
              fontSize: "12px",
              textAlign: "left",
              width: "100%",
              transition: "all 0.2s",
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: annotation.color || "#f59e0b",
                flexShrink: 0,
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
  annotations = MODEL_PRESETS[0].annotations!,
  className = "",
  autoRotate = true,
  autoFitOnLoad = true,
  autoAdjustAnnotations = true,
  modelPreset,
  onQuizComplete,
  onProgressUpdate,
}: AnnotatedModelViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const [activeAnnotation, setActiveAnnotation] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [isAutoRotating, setIsAutoRotating] = useState(autoRotate);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [explodedView, setExplodedView] = useState(false);
  const [selectedForMeasurement, setSelectedForMeasurement] = useState<string | null>(null);
  const [measurementResult, setMeasurementResult] = useState<string | null>(null);
  const [currentPreset, setCurrentPreset] = useState<ModelPreset>(modelPreset || MODEL_PRESETS[0]);
  const [showQuiz, setShowQuiz] = useState<QuizQuestion | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [walkthroughActive, setWalkthroughActive] = useState(false);
  const [walkthroughStep, setWalkthroughStep] = useState(0);
  const [uploadedModel, setUploadedModel] = useState<THREE.Group | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState<Record<string, number>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-fit dimensions on resize
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateDimensions = () => {
      const rect = container.getBoundingClientRect();
      setDimensions({
        width: rect.width || window.innerWidth,
        height: rect.height || Math.max(400, window.innerHeight * 0.6),
      });
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, []);

  // Lazy loading with IntersectionObserver
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsLoaded(true);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Auto-fit camera on load
  useEffect(() => {
    if (!autoFitOnLoad || !cameraRef.current || !isLoaded) return;

    const camera = cameraRef.current;
    const { width, height } = dimensions;
    
    // Adjust camera based on aspect ratio
    const aspect = width / height;
    const baseDistance = 12;
    const adjustedDistance = baseDistance * Math.max(1, aspect * 0.8);

    gsap.to(camera.position, {
      x: adjustedDistance * 0.67,
      y: adjustedDistance * 0.5,
      z: adjustedDistance,
      duration: 1.2,
      ease: "power2.inOut",
    });
  }, [autoFitOnLoad, isLoaded, dimensions]);

  // Focus camera on annotation
  const handleAnnotationClick = useCallback((id: string) => {
    const annotation = annotations.find((a) => a.id === id);
    
    if (annotation?.quizQuestion) {
      setShowQuiz(annotation.quizQuestion);
      return;
    }

    setActiveAnnotation((prev) => (prev === id ? null : id));

    if (id && cameraRef.current) {
      gsap.to(cameraRef.current.position, {
        x: annotation!.position[0] * 0.8,
        y: annotation!.position[1] * 0.8 + 3,
        z: annotation!.position[2] * 0.8 + 8,
        duration: 0.8,
        ease: "power2.inOut",
      });
    }
  }, [annotations]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const annotationIds = annotations.map((a) => a.id);
      const currentIndex = annotationIds.indexOf(activeAnnotation || "");

      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % annotationIds.length;
        handleAnnotationClick(annotationIds[nextIndex]);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        const prevIndex = (currentIndex - 1 + annotationIds.length) % annotationIds.length;
        handleAnnotationClick(annotationIds[prevIndex]);
      } else if (e.key === "Enter" && activeAnnotation) {
        e.preventDefault();
        if (selectedForMeasurement === null) {
          setSelectedForMeasurement(activeAnnotation);
          setMeasurementResult(null);
        } else if (selectedForMeasurement !== activeAnnotation) {
          const from = annotations.find((a) => a.id === selectedForMeasurement);
          const to = annotations.find((a) => a.id === activeAnnotation);
          if (from && to) {
            const distance = calculateDistance(from.position, to.position);
            setMeasurementResult(`Distance: ${distance.toFixed(2)} units`);
          }
          setSelectedForMeasurement(null);
        } else {
          setSelectedForMeasurement(null);
          setMeasurementResult(null);
        }
      } else if (e.key === "Escape") {
        setSelectedForMeasurement(null);
        setMeasurementResult(null);
        setActiveAnnotation(null);
        setShowQuiz(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeAnnotation, annotations, handleAnnotationClick, selectedForMeasurement]);

  const handleQuizComplete = useCallback((correct: boolean) => {
    if (correct) {
      setQuizScore((s) => s + 1);
    }
    onQuizComplete?.(quizScore + (correct ? 1 : 0));
  }, [quizScore, onQuizComplete]);

  const handleWalkthroughNext = useCallback(() => {
    if (walkthroughStep < annotations.length - 1) {
      setWalkthroughStep((s) => s + 1);
      handleAnnotationClick(annotations[walkthroughStep + 1].id);
    }
  }, [walkthroughStep, annotations, handleAnnotationClick]);

  const handleWalkthroughPrev = useCallback(() => {
    if (walkthroughStep > 0) {
      setWalkthroughStep((s) => s - 1);
      handleAnnotationClick(annotations[walkthroughStep - 1].id);
    }
  }, [walkthroughStep, annotations, handleAnnotationClick]);

  const handleModelUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const arrayBuffer = event.target?.result as ArrayBuffer;
        // In a real app, you'd use GLTFLoader here
        console.log("Model uploaded:", file.name);
      };
      reader.readAsArrayBuffer(file);
    }
  }, []);

  const handleShare = useCallback(() => {
    const shareData = {
      preset: currentPreset.name,
      annotations: annotations.map((a) => ({ id: a.id, label: a.label, position: a.position })),
      theme,
      explodedView,
    };
    const url = `${window.location.origin}${window.location.pathname}?data=${btoa(JSON.stringify(shareData))}`;
    navigator.clipboard.writeText(url);
  }, [currentPreset, annotations, theme, explodedView]);

  const isDark = theme === "dark";

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
        background: isDark ? "#0f172a" : "#f1f5f9",
      }}
    >
      {isLoaded ? (
        <Canvas
          style={{ width: "100%", height: "100%", display: "block" }}
          camera={{
            position: [8, 6, 12],
            fov: 50,
            near: 0.1,
            far: 1000,
          }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
          onCreated={({ gl, camera }) => {
            cameraRef.current = camera as unknown as THREE.PerspectiveCamera;
          }}
        >
          <CameraRefSetter onCameraRef={(cam) => { cameraRef.current = cam; }} />
          
          <ambientLight intensity={isDark ? 0.4 : 0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#6366f1" />
          <pointLight position={[10, -5, 10]} intensity={0.3} color="#f59e0b" />

          <SampleMesh
            annotations={annotations}
            onAnnotationClick={handleAnnotationClick}
            autoAdjust={autoAdjustAnnotations}
            explodedView={explodedView}
            explodeFactor={1.5}
            modelType={currentPreset.type}
            modelColor={currentPreset.color || "#6366f1"}
          />

          <gridHelper
            args={[20, 20, isDark ? "#1e293b" : "#cbd5e1", isDark ? "#0f172a" : "#f1f5f9"]}
            position={[0, -3, 0]}
          />

          <OrbitControls
            enableDamping
            dampingFactor={0.05}
            autoRotate={isAutoRotating}
            autoRotateSpeed={1}
            minDistance={5}
            maxDistance={30}
            enablePan
            panSpeed={0.5}
          />
        </Canvas>
      ) : (
        <div style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: isDark ? "#94a3b8" : "#64748b",
          fontSize: "14px",
        }}>
          Loading 3D scene...
        </div>
      )}

      <LegendOverlay
        annotations={annotations}
        onAnnotationClick={handleAnnotationClick}
        activeAnnotation={activeAnnotation}
        theme={theme}
      />

      {/* Controls overlay */}
      <div style={{
        position: "absolute",
        top: "20px",
        right: "20px",
        display: "flex",
        gap: "8px",
        zIndex: 10,
        flexWrap: "wrap",
        justifyContent: "flex-end",
      }}>
        <select
          value={currentPreset.name}
          onChange={(e) => {
            const preset = MODEL_PRESETS.find((p) => p.name === e.target.value);
            if (preset) setCurrentPreset(preset);
          }}
          style={{
            background: isDark ? "rgba(15, 23, 42, 0.9)" : "rgba(248, 250, 252, 0.9)",
            border: "1px solid rgba(99, 102, 241, 0.5)",
            borderRadius: "8px",
            padding: "8px 12px",
            color: "#f8fafc",
            fontSize: "12px",
            cursor: "pointer",
            backdropFilter: "blur(8px)",
          }}
        >
          {MODEL_PRESETS.map((preset) => (
            <option key={preset.name} value={preset.name}>{preset.name}</option>
          ))}
        </select>
        <button onClick={() => setIsAutoRotating(!isAutoRotating)} style={{
          background: isAutoRotating ? "rgba(99, 102, 241, 0.9)" : isDark ? "rgba(15, 23, 42, 0.9)" : "rgba(248, 250, 252, 0.9)",
          border: "1px solid rgba(99, 102, 241, 0.5)",
          borderRadius: "8px",
          padding: "8px 12px",
          color: "#f8fafc",
          fontSize: "12px",
          cursor: "pointer",
          backdropFilter: "blur(8px)",
        }}>
          {isAutoRotating ? "⏸ Pause" : "▶ Rotate"}
        </button>
        <button onClick={() => {
          if (cameraRef.current) {
            gsap.to(cameraRef.current.position, { x: 8, y: 6, z: 12, duration: 1, ease: "power2.inOut" });
          }
          setActiveAnnotation(null);
          setSelectedForMeasurement(null);
          setMeasurementResult(null);
        }} style={{
          background: isDark ? "rgba(15, 23, 42, 0.9)" : "rgba(248, 250, 252, 0.9)",
          border: "1px solid rgba(99, 102, 241, 0.5)",
          borderRadius: "8px",
          padding: "8px 12px",
          color: "#f8fafc",
          fontSize: "12px",
          cursor: "pointer",
          backdropFilter: "blur(8px)",
        }}>
          ↺ Reset
        </button>
        <button onClick={() => setExplodedView(!explodedView)} style={{
          background: explodedView ? "rgba(99, 102, 241, 0.9)" : isDark ? "rgba(15, 23, 42, 0.9)" : "rgba(248, 250, 252, 0.9)",
          border: "1px solid rgba(99, 102, 241, 0.5)",
          borderRadius: "8px",
          padding: "8px 12px",
          color: "#f8fafc",
          fontSize: "12px",
          cursor: "pointer",
          backdropFilter: "blur(8px)",
        }}>
          {explodedView ? "🔧 Assemble" : "💥 Explode"}
        </button>
        <button onClick={() => setWalkthroughActive(!walkthroughActive)} style={{
          background: walkthroughActive ? "rgba(99, 102, 241, 0.9)" : isDark ? "rgba(15, 23, 42, 0.9)" : "rgba(248, 250, 252, 0.9)",
          border: "1px solid rgba(99, 102, 241, 0.5)",
          borderRadius: "8px",
          padding: "8px 12px",
          color: "#f8fafc",
          fontSize: "12px",
          cursor: "pointer",
          backdropFilter: "blur(8px)",
        }}>
          {walkthroughActive ? "⏹ Stop Tour" : "🎬 Tour"}
        </button>
        <button onClick={() => fileInputRef.current?.click()} style={{
          background: isDark ? "rgba(15, 23, 42, 0.9)" : "rgba(248, 250, 252, 0.9)",
          border: "1px solid rgba(99, 102, 241, 0.5)",
          borderRadius: "8px",
          padding: "8px 12px",
          color: "#f8fafc",
          fontSize: "12px",
          cursor: "pointer",
          backdropFilter: "blur(8px)",
        }}>
          📁 Upload
        </button>
        <button onClick={handleShare} style={{
          background: isDark ? "rgba(15, 23, 42, 0.9)" : "rgba(248, 250, 252, 0.9)",
          border: "1px solid rgba(99, 102, 241, 0.5)",
          borderRadius: "8px",
          padding: "8px 12px",
          color: "#f8fafc",
          fontSize: "12px",
          cursor: "pointer",
          backdropFilter: "blur(8px)",
        }}>
          🔗 Share
        </button>
        <button onClick={() => setTheme(isDark ? "light" : "dark")} style={{
          background: isDark ? "rgba(15, 23, 42, 0.9)" : "rgba(248, 250, 252, 0.9)",
          border: "1px solid rgba(99, 102, 241, 0.5)",
          borderRadius: "8px",
          padding: "8px 12px",
          color: "#f8fafc",
          fontSize: "12px",
          cursor: "pointer",
          backdropFilter: "blur(8px)",
        }}>
          {isDark ? "☀️ Light" : "🌙 Dark"}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".glb,.gltf"
          style={{ display: "none" }}
          onChange={handleModelUpload}
        />
      </div>

      {activeAnnotation && (
        <div style={{
          position: "absolute",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          background: isDark ? "rgba(15, 23, 42, 0.95)" : "rgba(248, 250, 252, 0.95)",
          border: "1px solid rgba(99, 102, 241, 0.5)",
          borderRadius: "12px",
          padding: "12px 20px",
          color: isDark ? "#f8fafc" : "#1e293b",
          zIndex: 10,
          backdropFilter: "blur(8px)",
          minWidth: "200px",
          maxWidth: "300px",
          textAlign: "center",
        }}>
          <div style={{ fontWeight: 600, fontSize: "14px" }}>
            {annotations.find((a) => a.id === activeAnnotation)?.label}
          </div>
          <div style={{ fontSize: "12px", color: isDark ? "#94a3b8" : "#64748b", marginTop: "4px" }}>
            {annotations.find((a) => a.id === activeAnnotation)?.description}
          </div>
          <div style={{ fontSize: "11px", color: isDark ? "#64748b" : "#94a3b8", marginTop: "8px" }}>
            Press <kbd style={{ background: "rgba(99,102,241,0.3)", padding: "2px 4px", borderRadius: "4px" }}>Enter</kbd> to measure
          </div>
        </div>
      )}

      {measurementResult && (
        <div style={{
          position: "absolute",
          bottom: "100px",
          left: "50%",
          transform: "translateX(-50%)",
          background: isDark ? "rgba(15, 23, 42, 0.95)" : "rgba(248, 250, 252, 0.95)",
          border: "1px solid rgba(99, 102, 241, 0.5)",
          borderRadius: "12px",
          padding: "12px 20px",
          color: isDark ? "#f8fafc" : "#1e293b",
          zIndex: 10,
          backdropFilter: "blur(8px)",
          textAlign: "center",
        }}>
          <div style={{ fontWeight: 600, fontSize: "14px" }}>📏 Measurement</div>
          <div style={{ fontSize: "16px", color: "#818cf8", marginTop: "4px", fontWeight: 600 }}>
            {measurementResult}
          </div>
        </div>
      )}

      {selectedForMeasurement && (
        <div style={{
          position: "absolute",
          bottom: "60px",
          left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(99, 102, 241, 0.9)",
          borderRadius: "8px",
          padding: "8px 16px",
          color: "#f8fafc",
          zIndex: 10,
          fontSize: "12px",
        }}>
          Select another annotation to measure distance (press Enter)
        </div>
      )}

      {showQuiz && (
        <QuizModal
          question={showQuiz}
          onClose={() => setShowQuiz(null)}
          onComplete={handleQuizComplete}
          theme={theme}
        />
      )}

      {walkthroughActive && (
        <WalkthroughOverlay
          annotations={annotations}
          currentStep={walkthroughStep}
          totalSteps={annotations.length}
          onComplete={() => setWalkthroughActive(false)}
          onNext={handleWalkthroughNext}
          onPrev={handleWalkthroughPrev}
          theme={theme}
        />
      )}
    </div>
  );
}
