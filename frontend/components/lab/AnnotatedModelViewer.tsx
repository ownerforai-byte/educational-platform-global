"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Line, Html, OrbitControls } from "@react-three/drei";
import gsap from "gsap";
import * as THREE from "three";
import { MathDisplay, MathInline } from "@/components/content/MathRenderer";
import { ViewportRelativeArrow } from "./viewport-relative-arrow";

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Annotation {
  id: string;
  position: [number, number, number];
  label: string;
  description?: string;
  color?: string;
  quizQuestion?: QuizQuestion;
  mathContent?: string;
}

export interface ModelPreset {
  name: string;
  type: "icosahedron" | "torus" | "cube" | "sphere" | "molecule" | "cylinder" | "cone" | "custom";
  color?: string;
  annotations?: Annotation[];
}

export interface AnnotatedModelViewerProps {
  annotations?: Annotation[];
  className?: string;
  autoRotate?: boolean;
  autoFitOnLoad?: boolean;
  autoAdjustAnnotations?: boolean;
  modelPreset?: ModelPreset;
  onQuizComplete?: (score: number) => void;
}

const MODEL_PRESETS: ModelPreset[] = [
  {
    name: "Icosahedron",
    type: "icosahedron",
    color: "#6366f1",
    annotations: [
      { id: "1", position: [0, 1.5, 0], label: "Vertex A", description: "Top vertex", color: "#f59e0b", mathContent: "V = \\frac{5(3+\\sqrt{5})}{12}a^3" },
      { id: "2", position: [-1.5, -0.5, 1.2], label: "Edge B", description: "Golden ratio edge", color: "#10b981", mathContent: "\\phi = \\frac{1+\\sqrt{5}}{2}" },
      { id: "3", position: [0, -1.8, -1], label: "Face C", description: "Triangular face", color: "#ef4444", mathContent: "A = \\frac{\\sqrt{3}}{4}a^2" },
    ],
  },
  {
    name: "Torus",
    type: "torus",
    color: "#10b981",
    annotations: [
      { id: "1", position: [2, 0, 0], label: "Outer Ring", description: "Major radius R", color: "#f59e0b", mathContent: "V = 2\\pi^2 Rr^2" },
      { id: "2", position: [0, 0, 2], label: "Tube Cross-section", description: "Minor radius r", color: "#6366f1", mathContent: "A = 4\\pi^2 Rr" },
    ],
  },
  {
    name: "Cube",
    type: "cube",
    color: "#ef4444",
    annotations: [
      { id: "1", position: [1, 1, 1], label: "Corner Vertex", description: "8 vertices total", color: "#f59e0b", mathContent: "V = s^3" },
      { id: "2", position: [0, 1, 0], label: "Edge", description: "12 edges total", color: "#10b981", mathContent: "L = 12s" },
      { id: "3", position: [0, 0, 1], label: "Face", description: "6 faces total", color: "#6366f1", mathContent: "A = 6s^2" },
    ],
  },
  {
    name: "Sphere",
    type: "sphere",
    color: "#8b5cf6",
    annotations: [
      { id: "1", position: [0, 1.5, 0], label: "North Pole", description: "Top of sphere", color: "#f59e0b", mathContent: "V = \\frac{4}{3}\\pi r^3" },
      { id: "2", position: [1.5, 0, 0], label: "Equator", description: "Midline circle", color: "#10b981", mathContent: "C = 2\\pi r" },
    ],
  },
  {
    name: "Molecule (H2O)",
    type: "molecule",
    color: "#06b6d4",
    annotations: [
      { id: "1", position: [0, 0, 0], label: "Oxygen", description: "Central atom", color: "#ef4444", mathContent: "\\angle HOH = 104.5°" },
      { id: "2", position: [-1.2, 0.8, 0], label: "Hydrogen 1", description: "Bond angle 104.5°", color: "#f59e0b", mathContent: "d_{OH} = 0.96\\text{Å}" },
      { id: "3", position: [1.2, 0.8, 0], label: "Hydrogen 2", description: "Polar molecule", color: "#3b82f6", mathContent: "\\mu = 1.85\\text{D}" },
    ],
  },
  {
    name: "Cylinder",
    type: "cylinder",
    color: "#f59e0b",
    annotations: [
      { id: "1", position: [0, 1.5, 0], label: "Top Circle", description: "Base radius r", color: "#6366f1", mathContent: "A_{base} = \\pi r^2" },
      { id: "2", position: [0, 0, 0], label: "Height", description: "Axis height h", color: "#10b981", mathContent: "V = \\pi r^2 h" },
    ],
  },
  {
    name: "Cone",
    type: "cone",
    color: "#ec4899",
    annotations: [
      { id: "1", position: [0, 1.5, 0], label: "Apex", description: "Top point", color: "#f59e0b", mathContent: "V = \\frac{1}{3}\\pi r^2 h" },
      { id: "2", position: [1, 0, 0], label: "Base Radius", description: "r", color: "#6366f1", mathContent: "l = \\sqrt{r^2 + h^2}" },
    ],
  },
];

const DEFAULT_ANNOTATIONS: Annotation[] = MODEL_PRESETS[0].annotations ?? [];

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

function calculateDistance(
  pos1: [number, number, number],
  pos2: [number, number, number]
): number {
  const dx = pos2[0] - pos1[0];
  const dy = pos2[1] - pos1[1];
  const dz = pos2[2] - pos1[2];
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

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

  useFrame((_state, delta) => {
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
              style={{ pointerEvents: "auto", cursor: "pointer" }}
              onClick={() => onAnnotationClick(annotation.id)}
              onPointerOver={() => setHoveredId(annotation.id)}
              onPointerOut={() => setHoveredId(null)}
            >
              <div
                className={`rounded-lg border px-3 py-2 text-white transition-all ${
                  isHovered
                    ? "border-primary bg-primary/95 shadow-lg"
                    : "border-border bg-slate-900/90 shadow-md"
                }`}
                style={{ borderColor: annotation.color || "#f59e0b" }}
              >
                <div className="font-semibold">{annotation.label}</div>
                {annotation.description && (
                  <div className="mt-1 text-[11px] text-slate-300">
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

function QuizModal({
  question,
  onClose,
  onComplete,
}: {
  question: QuizQuestion;
  onClose: () => void;
  onComplete: (correct: boolean) => void;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (index: number) => {
    if (showResult) return;
    setSelected(index);
    setShowResult(true);
    onComplete(index === question.correctAnswer);
  };

  return (
    <div
      className="absolute inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-[90%] max-w-[400px] rounded-2xl border border-primary/30 bg-card p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-semibold">Quiz Question</h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-xl text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Close quiz"
          >
            ✕
          </button>
        </div>
        <p className="mb-4 text-sm leading-relaxed">
          <MathInline expression={question.question} />
        </p>
        <div className="flex flex-col gap-2">
          {question.options.map((option, index) => {
            const isCorrect = index === question.correctAnswer;
            const isSelected = selected === index;
            const stateClasses = showResult
              ? isCorrect
                ? "border-emerald-500 bg-emerald-500/10"
                : isSelected
                ? "border-red-500 bg-red-500/10"
                : "border-border opacity-60"
              : "border-border hover:border-primary/50 hover:bg-muted/50";
            return (
              <button
                key={index}
                type="button"
                onClick={() => handleSelect(index)}
                className={`rounded-lg border-2 px-4 py-3 text-left text-sm transition-colors ${stateClasses}`}
              >
                <MathInline expression={option} />
              </button>
            );
          })}
        </div>
        {showResult && (
          <div className="mt-4 rounded-lg bg-primary/10 p-3 text-xs">
            <strong>{selected === question.correctAnswer ? "✓ Correct!" : "✗ Incorrect"}</strong>
            <p className="mt-2 opacity-80">
              <MathInline expression={question.explanation} />
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function WalkthroughOverlay({
  annotations,
  currentStep,
  totalSteps,
  onComplete,
  onNext,
  onPrev,
}: {
  annotations: Annotation[];
  currentStep: number;
  totalSteps: number;
  onComplete: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  const currentAnnotation = annotations[currentStep];

  return (
    <div className="absolute bottom-5 left-1/2 z-50 min-w-[300px] max-w-[500px] -translate-x-1/2 rounded-2xl border border-primary/30 bg-card/95 p-5 backdrop-blur-md">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          Step {currentStep + 1} of {totalSteps}
        </span>
        <div className="flex gap-1">
          {annotations.map((_, i) => (
            <div
              key={i}
              className={`h-2 w-2 rounded-full ${
                i === currentStep ? "bg-primary" : "bg-primary/20"
              }`}
            />
          ))}
        </div>
      </div>
      <h3 className="mb-2 text-base font-semibold">{currentAnnotation?.label}</h3>
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
        {currentAnnotation?.description}
      </p>
      {currentAnnotation?.mathContent && (
        <div className="mb-4 rounded-lg bg-primary/10 p-3">
          <MathDisplay expression={currentAnnotation.mathContent} />
        </div>
      )}
      <div className="flex justify-center gap-2">
        <button
          type="button"
          onClick={onPrev}
          disabled={currentStep === 0}
          className="rounded-lg border border-border px-4 py-2 text-sm transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
        >
          ← Prev
        </button>
        <button
          type="button"
          onClick={onComplete}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:brightness-110"
        >
          Finish
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={currentStep === totalSteps - 1}
          className="rounded-lg border border-border px-4 py-2 text-sm transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next →
        </button>
      </div>
    </div>
  );
}

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
    <div className="absolute bottom-5 left-5 z-10 min-w-[180px] max-w-[250px] rounded-xl border border-border bg-card/95 p-4 backdrop-blur-md">
      <h3 className="mb-3 text-sm font-semibold text-primary">Annotations</h3>
      <div className="flex max-h-[200px] flex-col gap-2 overflow-y-auto">
        {annotations.map((annotation) => (
          <button
            key={annotation.id}
            type="button"
            onClick={() => onAnnotationClick(annotation.id)}
            className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs transition-colors ${
              activeAnnotation === annotation.id
                ? "bg-primary/20 text-foreground"
                : "text-foreground/80 hover:bg-muted/60"
            }`}
          >
            <span
              className="h-2 w-2 shrink-0 rounded-full"
              style={{ backgroundColor: annotation.color || "#f59e0b" }}
            />
            <span className="flex-1">{annotation.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function AnnotatedModelViewer({
  annotations = DEFAULT_ANNOTATIONS,
  className = "",
  autoRotate = true,
  autoFitOnLoad = true,
  autoAdjustAnnotations = true,
  modelPreset,
  onQuizComplete,
}: AnnotatedModelViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const [activeAnnotation, setActiveAnnotation] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [isAutoRotating, setIsAutoRotating] = useState(autoRotate);
  const [explodedView, setExplodedView] = useState(false);
  const [selectedForMeasurement, setSelectedForMeasurement] = useState<string | null>(null);
  const [measurementResult, setMeasurementResult] = useState<string | null>(null);
  const [currentPreset, setCurrentPreset] = useState<ModelPreset>(modelPreset ?? MODEL_PRESETS[0]);
  const [showQuiz, setShowQuiz] = useState<QuizQuestion | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [walkthroughActive, setWalkthroughActive] = useState(false);
  const [walkthroughStep, setWalkthroughStep] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

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

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsLoaded(true);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!autoFitOnLoad || !cameraRef.current || !isLoaded) return;

    const camera = cameraRef.current;
    const { width, height } = dimensions;

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

  const handleAnnotationClick = useCallback((id: string) => {
    const annotation = annotations.find((a) => a.id === id);

    if (annotation?.quizQuestion) {
      setShowQuiz(annotation.quizQuestion);
      return;
    }

    setActiveAnnotation((prev) => (prev === id ? null : id));

    if (id && annotation && cameraRef.current) {
      gsap.to(cameraRef.current.position, {
        x: annotation.position[0] * 0.8,
        y: annotation.position[1] * 0.8 + 3,
        z: annotation.position[2] * 0.8 + 8,
        duration: 0.8,
        ease: "power2.inOut",
      });
    }
  }, [annotations]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const annotationIds = annotations.map((a) => a.id);
      const currentIndex = annotationIds.indexOf(activeAnnotation || "");

      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % annotationIds.length;
        const nextId = annotationIds[nextIndex];
        if (nextId) handleAnnotationClick(nextId);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        const prevIndex = (currentIndex - 1 + annotationIds.length) % annotationIds.length;
        const prevId = annotationIds[prevIndex];
        if (prevId) handleAnnotationClick(prevId);
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
      const next = annotations[walkthroughStep + 1];
      if (next) handleAnnotationClick(next.id);
    }
  }, [walkthroughStep, annotations, handleAnnotationClick]);

  const handleWalkthroughPrev = useCallback(() => {
    if (walkthroughStep > 0) {
      setWalkthroughStep((s) => s - 1);
      const prev = annotations[walkthroughStep - 1];
      if (prev) handleAnnotationClick(prev.id);
    }
  }, [walkthroughStep, annotations, handleAnnotationClick]);

  const handleShare = useCallback(() => {
    const shareData = {
      preset: currentPreset.name,
      annotations: annotations.map((a) => ({ id: a.id, label: a.label, position: a.position })),
      explodedView,
    };
    const url = `${window.location.origin}${window.location.pathname}?data=${btoa(JSON.stringify(shareData))}`;
    const safeCopy = async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        try {
          const ta = document.createElement("textarea");
          ta.value = text;
          ta.style.position = "fixed";
          ta.style.opacity = "0";
          document.body.appendChild(ta);
          ta.select();
          document.execCommand("copy");
          document.body.removeChild(ta);
        } catch {
          // Clipboard unavailable — sharing is best-effort.
        }
      }
    };
    void safeCopy(url);
  }, [currentPreset, annotations, explodedView]);

  const activeAnnotationData = annotations.find((a) => a.id === activeAnnotation);
  const overlayButtonClass =
    "rounded-lg border border-primary/40 bg-card/90 px-3 py-2 text-xs font-medium text-foreground backdrop-blur-md transition-colors hover:bg-muted";

  return (
    <div
      ref={containerRef}
      className={`relative h-full min-h-[400px] w-full overflow-hidden rounded-xl bg-muted/40 ${className}`}
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
        >
          <CameraRefSetter onCameraRef={(cam) => { cameraRef.current = cam; }} />

          <ambientLight intensity={0.5} />
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
            args={[20, 20, "#334155", "#1e293b"]}
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

          <ViewportRelativeArrow
            screenTarget={[0.5, 0.4]}
            depth={5}
            length={2}
            color="#6366f1"
            pulse={true}
            pulseSpeed={2.5}
            flowParticles={true}
            particleCount={10}
            followCamera={true}
            dynamic={true}
          />

          {annotations.map((ann) => (
            <ViewportRelativeArrow
              key={`guide-${ann.id}`}
              screenTarget={[0.5, 0.5]}
              depth={4}
              length={0.8}
              color={ann.color || "#f59e0b"}
              headLength={0.12}
              headWidth={0.08}
              pulse={true}
              pulseSpeed={3}
              flowParticles={false}
              followCamera={false}
              dynamic={true}
            />
          ))}
        </Canvas>
      ) : (
        <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
          Loading 3D scene…
        </div>
      )}

      <LegendOverlay
        annotations={annotations}
        onAnnotationClick={handleAnnotationClick}
        activeAnnotation={activeAnnotation}
      />

      <div className="absolute right-5 top-5 z-10 flex flex-wrap justify-end gap-2">
        <select
          value={currentPreset.name}
          onChange={(e) => {
            const preset = MODEL_PRESETS.find((p) => p.name === e.target.value);
            if (preset) setCurrentPreset(preset);
          }}
          aria-label="Model preset"
          className="rounded-lg border border-primary/40 bg-card/90 px-3 py-2 text-xs text-foreground backdrop-blur-md"
        >
          {MODEL_PRESETS.map((preset) => (
            <option key={preset.name} value={preset.name}>{preset.name}</option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => setIsAutoRotating(!isAutoRotating)}
          className={`${overlayButtonClass} ${isAutoRotating ? "bg-primary text-primary-foreground" : ""}`}
        >
          {isAutoRotating ? "⏸ Pause" : "▶ Rotate"}
        </button>
        <button
          type="button"
          onClick={() => {
            if (cameraRef.current) {
              gsap.to(cameraRef.current.position, { x: 8, y: 6, z: 12, duration: 1, ease: "power2.inOut" });
            }
            setActiveAnnotation(null);
            setSelectedForMeasurement(null);
            setMeasurementResult(null);
          }}
          className={overlayButtonClass}
        >
          ↺ Reset
        </button>
        <button
          type="button"
          onClick={() => setExplodedView(!explodedView)}
          className={`${overlayButtonClass} ${explodedView ? "bg-primary text-primary-foreground" : ""}`}
        >
          {explodedView ? "🔧 Assemble" : "💥 Explode"}
        </button>
        <button
          type="button"
          onClick={() => setWalkthroughActive(!walkthroughActive)}
          className={`${overlayButtonClass} ${walkthroughActive ? "bg-primary text-primary-foreground" : ""}`}
        >
          {walkthroughActive ? "⏹ Stop Tour" : "🎬 Tour"}
        </button>
        <button type="button" onClick={handleShare} className={overlayButtonClass}>
          🔗 Share
        </button>
      </div>

      {activeAnnotation && activeAnnotationData && (
        <div className="absolute left-1/2 top-5 z-10 min-w-[200px] max-w-[300px] -translate-x-1/2 rounded-xl border border-primary/40 bg-card/95 p-3 text-center backdrop-blur-md">
          <div className="text-sm font-semibold">{activeAnnotationData.label}</div>
          <div className="mt-1 text-xs text-muted-foreground">
            {activeAnnotationData.description}
          </div>
          {activeAnnotationData.mathContent && (
            <div className="mt-2 rounded-md bg-primary/10 p-2">
              <MathInline expression={activeAnnotationData.mathContent} />
            </div>
          )}
          <div className="mt-2 text-[11px] text-muted-foreground">
            Press <kbd className="rounded bg-primary/20 px-1 py-0.5">Enter</kbd> to measure
          </div>
        </div>
      )}

      {measurementResult && (
        <div className="absolute bottom-[100px] left-1/2 z-10 -translate-x-1/2 rounded-xl border border-primary/40 bg-card/95 p-3 text-center backdrop-blur-md">
          <div className="text-sm font-semibold">📏 Measurement</div>
          <div className="mt-1 text-base font-semibold text-primary">{measurementResult}</div>
        </div>
      )}

      {selectedForMeasurement && (
        <div className="absolute bottom-[60px] left-1/2 z-10 -translate-x-1/2 rounded-lg bg-primary px-4 py-2 text-xs text-primary-foreground">
          Select another annotation to measure distance (press Enter)
        </div>
      )}

      {showQuiz && (
        <QuizModal
          question={showQuiz}
          onClose={() => setShowQuiz(null)}
          onComplete={handleQuizComplete}
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
        />
      )}
    </div>
  );
}
