/* eslint-disable react/prop-types */
"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { isWebGLAvailable } from "@/lib/webgl";
import { disposeThreeScene } from "@/components/lab/three-scene";

// Helper to create a three scene
const createThreeScene = (container: HTMLElement, config: any) => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;

  // Lighting
  const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
  scene.add(ambientLight);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(10, 10, 10);
  scene.add(directionalLight);

  // Group for all objects
  const group = new THREE.Group();
  scene.add(group);

  // Camera position
  camera.position.copy(config.cameraPosition || new THREE.Vector3(0, 15, 25));
  camera.lookAt(0, 0, 0);

  return { scene, camera, renderer, controls, group };
};

const bindResize = (ts: any, container: HTMLElement) => {
  const handleResize = () => {
    ts.camera.aspect = container.clientWidth / container.clientHeight;
    ts.camera.updateProjectionMatrix();
    ts.renderer.setSize(container.clientWidth, container.clientHeight);
  };
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
};

// Enhanced 3D Vector Visualization with all cases
const VectorComprehensive3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  
  // Vector 1 state
  const [vec1X, setVec1X] = useState(3);
  const [vec1Y, setVec1Y] = useState(0);
  const [vec1Z, setVec1Z] = useState(0);
  
  // Vector 2 state
  const [vec2X, setVec2X] = useState(0);
  const [vec2Y, setVec2Y] = useState(4);
  const [vec2Z, setVec2Z] = useState(0);
  
  // Display options
  const [showComponents, setShowComponents] = useState(true);
  const [showResultant, setShowResultant] = useState(true);
  const [showNegativeSigns, setShowNegativeSigns] = useState(true);
  const [showAxesLabels, setShowAxesLabels] = useState(true);
  const [showAngle, setShowAngle] = useState(true);
  
  // Preset cases
  const [selectedCase, setSelectedCase] = useState<string>("perpendicular");
  
  // Calculate resultant
  const resultantX = vec1X + vec2X;
  const resultantY = vec1Y + vec2Y;
  const resultantZ = vec1Z + vec2Z;
  const resultantMag = Math.sqrt(resultantX ** 2 + resultantY ** 2 + resultantZ ** 2);
  
  // Calculate magnitudes
  const vec1Mag = Math.sqrt(vec1X ** 2 + vec1Y ** 2 + vec1Z ** 2);
  const vec2Mag = Math.sqrt(vec2X ** 2 + vec2Y ** 2 + vec2Z ** 2);
  
  // Calculate angle between vectors
  const dotProduct = vec1X * vec2X + vec1Y * vec2Y + vec1Z * vec2Z;
  const cosTheta = dotProduct / (vec1Mag * vec2Mag);
  const angleDeg = Math.abs(Math.acos(Math.max(-1, Math.min(1, cosTheta))) * 180 / Math.PI);
  
  // Determine relationship
  const relationship = useMemo(() => {
    if (vec1Mag === 0 || vec2Mag === 0) return "Zero vector";
    if (Math.abs(angleDeg) < 1) return "Parallel (same direction)";
    if (Math.abs(angleDeg - 180) < 1) return "Parallel (opposite direction)";
    if (Math.abs(angleDeg - 90) < 1) return "Perpendicular";
    if (angleDeg < 90) return "Acute angle";
    if (angleDeg > 90) return "Obtuse angle";
    return "General";
  }, [vec1Mag, vec2Mag, angleDeg]);
  
  // Preset configurations
  const presets = {
    perpendicular: { vec1: [3, 0, 0], vec2: [0, 4, 0] },
    parallel: { vec1: [3, 0, 0], vec2: [2, 0, 0] },
    antiparallel: { vec1: [3, 0, 0], vec2: [-2, 0, 0] },
    zero: { vec1: [0, 0, 0], vec2: [4, 0, 0] },
    "3d-perpendicular": { vec1: [3, 0, 0], vec2: [0, 4, 5] },
    "equal-magnitude": { vec1: [5, 0, 0], vec2: [-5, 0, 0] },
    "negative-y": { vec1: [3, 0, 0], vec2: [0, -4, 0] },
    "negative-z": { vec1: [3, 4, 0], vec2: [0, 0, -5] },
    "all-components": { vec1: [2, -3, 4], vec2: [-1, 5, -2] },
  };
  
  const applyPreset = (presetKey: string) => {
    const preset = presets[presetKey as keyof typeof presets];
    if (preset) {
      setVec1X(preset.vec1[0]);
      setVec1Y(preset.vec1[1]);
      setVec1Z(preset.vec1[2]);
      setVec2X(preset.vec2[0]);
      setVec2Y(preset.vec2[1]);
      setVec2Z(preset.vec2[2]);
      setSelectedCase(presetKey);
    }
  };
  
  useEffect(() => {
    if (!mountRef.current || !isWebGLAvailable()) return;

    let ts: any = null;
    let unbind: (() => void) | null = null;
    let cancelled = false;

    async function init() {
      try {
        ts = createThreeScene(mountRef.current!, {
          cameraPosition: new THREE.Vector3(15, 15, 25),
          autoRotate: false,
          background: 0x0a0a1a
        });
        
        unbind = bindResize(ts, mountRef.current!);

        // Grid helper
        const gridHelper = new THREE.GridHelper(20, 20, 0x333333, 0x222222);
        ts.group.add(gridHelper);

        // Main axes (X, Y, Z) - thicker
        const mainAxes = new THREE.AxesHelper(10);
        ts.group.add(mainAxes);

        // Create custom axis helpers with labels
        const createLabeledAxis = (direction: THREE.Vector3, color: number, label: string, length: number = 8) => {
          const arrow = new THREE.ArrowHelper(
            direction.clone().normalize(),
            new THREE.Vector3(0, 0, 0),
            length,
            color,
            0.3,
            0.15
          );
          return arrow;
        };

        // X and X' axes (positive and negative)
        const xPosArrow = createLabeledAxis(new THREE.Vector3(1, 0, 0), 0xff3333, "X", 8);
        xPosArrow.name = "x-axis";
        ts.group.add(xPosArrow);

        const xNegArrow = createLabeledAxis(new THREE.Vector3(-1, 0, 0), 0xff3333, "X'", 8);
        xNegArrow.name = "x'-axis";
        ts.group.add(xNegArrow);

        // Y and Y' axes
        const yPosArrow = createLabeledAxis(new THREE.Vector3(0, 1, 0), 0x33ff33, "Y", 8);
        yPosArrow.name = "y-axis";
        ts.group.add(yPosArrow);

        const yNegArrow = createLabeledAxis(new THREE.Vector3(0, -1, 0), 0x33ff33, "Y'", 8);
        yNegArrow.name = "y'-axis";
        ts.group.add(yNegArrow);

        // Z and Z' axes
        const zPosArrow = createLabeledAxis(new THREE.Vector3(0, 0, 1), 0x3333ff, "Z", 8);
        zPosArrow.name = "z-axis";
        ts.group.add(zPosArrow);

        const zNegArrow = createLabeledAxis(new THREE.Vector3(0, 0, -1), 0x3333ff, "Z'", 8);
        zNegArrow.name = "z'-axis";
        ts.group.add(zNegArrow);

        // Vector arrows
        let vec1Arrow: THREE.ArrowHelper | null = null;
        let vec2Arrow: THREE.ArrowHelper | null = null;
        let resultantArrow: THREE.ArrowHelper | null = null;
        let componentArrows: THREE.ArrowHelper[] = [];
        let angleHelper: any = null;

        function updateScene() {
          // Clear previous vectors
          ts.group.children = ts.group.children.filter((child: any) => 
            !child.name?.startsWith('vec-') && 
            !child.name?.startsWith('comp-') &&
            !child.name?.startsWith('resultant-') &&
            !child.name?.startsWith('angle-')
          );

          // Vector 1 (Red) - with proper negative sign handling
          const vec1Dir = new THREE.Vector3(vec1X, vec1Y, vec1Z);
          const vec1Color = showNegativeSigns && vec1X < 0 && vec1Y === 0 && vec1Z === 0 ? 0xff0000 : 
                           showNegativeSigns && vec1Y < 0 && vec1X === 0 && vec1Z === 0 ? 0xff0000 :
                           showNegativeSigns && vec1Z < 0 && vec1X === 0 && vec1Y === 0 ? 0xff0000 : 0xff4444;
          
          vec1Arrow = new THREE.ArrowHelper(
            vec1Dir.clone().normalize(),
            new THREE.Vector3(0, 0, 0),
            vec1Mag,
            vec1Color,
            0.5,
            0.25
          );
          vec1Arrow.name = "vec-1";
          ts.group.add(vec1Arrow);

          // Vector 2 (Blue) - with proper negative sign handling
          const vec2Dir = new THREE.Vector3(vec2X, vec2Y, vec2Z);
          const vec2Color = showNegativeSigns && vec2X < 0 && vec2Y === 0 && vec2Z === 0 ? 0x0000ff :
                           showNegativeSigns && vec2Y < 0 && vec2X === 0 && vec2Z === 0 ? 0x0000ff :
                           showNegativeSigns && vec2Z < 0 && vec2X === 0 && vec2Y === 0 ? 0x0000ff : 0x4444ff;
          
          vec2Arrow = new THREE.ArrowHelper(
            vec2Dir.clone().normalize(),
            new THREE.Vector3(0, 0, 0),
            vec2Mag,
            vec2Color,
            0.5,
            0.25
          );
          vec2Arrow.name = "vec-2";
          ts.group.add(vec2Arrow);

          // Resultant (Green)
          if (showResultant) {
            const resultantDir = new THREE.Vector3(resultantX, resultantY, resultantZ);
            resultantArrow = new THREE.ArrowHelper(
              resultantDir.clone().normalize(),
              new THREE.Vector3(0, 0, 0),
              resultantMag,
              0x44ff44,
              0.6,
              0.3
            );
            resultantArrow.name = "resultant-main";
            ts.group.add(resultantArrow);
          }

          // Component arrows (from head of first vector)
          if (showComponents && vec2Mag > 0) {
            // Component of vec2 along vec1 direction
            const projMag = dotProduct / vec1Mag;
            const projDir = new THREE.Vector3(vec1X, vec1Y, vec1Z).normalize();
            const projVec = projDir.clone().multiplyScalar(projMag);
            
            const compArrow = new THREE.ArrowHelper(
              projDir.clone(),
              new THREE.Vector3(vec1X, vec1Y, vec1Z),
              projMag,
              0xffff00,
              0.3,
              0.15
            );
            compArrow.name = "comp-projection";
            ts.group.add(compArrow);
            componentArrows.push(compArrow);

            // Perpendicular component
            const perpVec = new THREE.Vector3(vec2X, vec2Y, vec2Z).sub(projVec);
            if (perpVec.length() > 0.01) {
              const perpArrow = new THREE.ArrowHelper(
                perpVec.clone().normalize(),
                new THREE.Vector3(vec1X, vec1Y, vec1Z),
                perpVec.length(),
                0xff88ff,
                0.3,
                0.15
              );
              perpArrow.name = "comp-perpendicular";
              ts.group.add(perpArrow);
              componentArrows.push(perpArrow);
            }
          }

          // Angle visualization
          if (showAngle && vec1Mag > 0 && vec2Mag > 0) {
            // Create arc to show angle
            const radius = 3;
            const startAngle = Math.atan2(vec1Y, vec1X);
            const endAngle = Math.atan2(vec2Y, vec2X);
            const arcPoints: THREE.Vector3[] = [];
            const numSegments = 30;
            
            for (let i = 0; i <= numSegments; i++) {
              const t = i / numSegments;
              const currentAngle = startAngle + (endAngle - startAngle) * t;
              arcPoints.push(new THREE.Vector3(
                radius * Math.cos(currentAngle),
                radius * Math.sin(currentAngle),
                0
              ));
            }
            
            const arcGeometry = new THREE.BufferGeometry().setFromPoints(arcPoints);
            const arcMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.7 });
            const arc = new THREE.Line(arcGeometry, arcMaterial);
            arc.name = "angle-arc";
            ts.group.add(arc);
          }

          // Add text labels for axes (simplified - using sprite text would be better but more complex)
          if (showAxesLabels) {
            // For now, we'll use the axis colors to indicate positive/negative
            // In a more advanced version, we'd add proper text labels
          }
        }

        updateScene();

        function animate() {
          if (cancelled) return;
          ts.controls.update();
          ts.renderer.render(ts.scene, ts.camera);
          requestAnimationFrame(animate);
        }

        animate();

      } catch (error) {
        console.error("Error loading three.js:", error);
      }
    }

    init();

    return () => {
      cancelled = true;
      if (unbind) unbind();
      if (ts) disposeThreeScene(ts);
    };
  }, [vec1X, vec1Y, vec1Z, vec2X, vec2Y, vec2Z, showComponents, showResultant, showNegativeSigns, showAxesLabels, showAngle]);

  // Format vector for display
  const formatVector = (x: number, y: number, z: number) => {
    const formatVal = (v: number) => v.toFixed(2).replace(/\.?0+$/, '');
    return `(${formatVal(x)}, ${formatVal(y)}, ${formatVal(z)})`;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Comprehensive 3D Vector Visualization</CardTitle>
        <CardDescription>
          Interactive 3D visualization showing two vectors, their resultant, and all components. 
          <Badge variant={relationship === "Parallel (same direction)" || relationship === "Parallel (opposite direction)" ? "default" : "secondary"} className="ml-2">
            {relationship}
          </Badge>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="aspect-[16/10] bg-black rounded-lg overflow-hidden" ref={mountRef} />
        
        {/* Quick Presets */}
        <div className="mt-4">
          <Label className="mb-2 block">Quick Presets:</Label>
          <div className="flex flex-wrap gap-2">
            <Button variant={selectedCase === "perpendicular" ? "default" : "outline"} size="sm" onClick={() => applyPreset("perpendicular")}>
              Perpendicular (XY)
            </Button>
            <Button variant={selectedCase === "parallel" ? "default" : "outline"} size="sm" onClick={() => applyPreset("parallel")}>
              Parallel
            </Button>
            <Button variant={selectedCase === "antiparallel" ? "default" : "outline"} size="sm" onClick={() => applyPreset("antiparallel")}>
              Antiparallel
            </Button>
            <Button variant={selectedCase === "negative-y" ? "default" : "outline"} size="sm" onClick={() => applyPreset("negative-y")}>
              Negative Y
            </Button>
            <Button variant={selectedCase === "3d-perpendicular" ? "default" : "outline"} size="sm" onClick={() => applyPreset("3d-perpendicular")}>
              3D Perpendicular
            </Button>
            <Button variant={selectedCase === "all-components" ? "default" : "outline"} size="sm" onClick={() => applyPreset("all-components")}>
              All Components
            </Button>
          </div>
        </div>

        {/* Vector Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Vector 1 */}
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Vector A</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1">
                  <Label className="text-xs">X Component</Label>
                  <Input type="number" value={vec1X} onChange={(e) => setVec1X(parseFloat(e.target.value) || 0)} className="text-sm" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Y Component</Label>
                  <Input type="number" value={vec1Y} onChange={(e) => setVec1Y(parseFloat(e.target.value) || 0)} className="text-sm" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Z Component</Label>
                  <Input type="number" value={vec1Z} onChange={(e) => setVec1Z(parseFloat(e.target.value) || 0)} className="text-sm" />
                </div>
              </div>
              <div className="mt-2 text-sm">
                <strong>A = </strong>{formatVector(vec1X, vec1Y, vec1Z)}<br />
                <strong>|A| = </strong>{vec1Mag.toFixed(2)}
              </div>
            </CardContent>
          </Card>

          {/* Vector 2 */}
          <Card className="bg-amber-500/5 border-amber-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Vector B</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1">
                  <Label className="text-xs">X Component</Label>
                  <Input type="number" value={vec2X} onChange={(e) => setVec2X(parseFloat(e.target.value) || 0)} className="text-sm" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Y Component</Label>
                  <Input type="number" value={vec2Y} onChange={(e) => setVec2Y(parseFloat(e.target.value) || 0)} className="text-sm" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Z Component</Label>
                  <Input type="number" value={vec2Z} onChange={(e) => setVec2Z(parseFloat(e.target.value) || 0)} className="text-sm" />
                </div>
              </div>
              <div className="mt-2 text-sm">
                <strong>B = </strong>{formatVector(vec2X, vec2Y, vec2Z)}<br />
                <strong>|B| = </strong>{vec2Mag.toFixed(2)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Resultant and Calculations */}
        <Card className="mt-4 bg-emerald-500/5 border-emerald-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Resultant & Calculations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Resultant Vector R = A + B</Label>
                <div className="text-xl font-bold text-emerald-600">
                  {formatVector(resultantX, resultantY, resultantZ)}
                </div>
                <div className="text-sm mt-1">
                  <strong>|R| = </strong>{resultantMag.toFixed(2)}
                </div>
              </div>
              <div>
                <Label>Dot Product (A·B)</Label>
                <div className="text-xl font-bold">
                  {dotProduct.toFixed(2)}
                </div>
                <div className="text-sm mt-1">
                  = {vec1Mag.toFixed(2)} × {vec2Mag.toFixed(2)} × cos({angleDeg.toFixed(2)}°)
                </div>
              </div>
              <div>
                <Label>Angle Between Vectors</Label>
                <div className="text-xl font-bold">
                  {angleDeg.toFixed(2)}°
                </div>
                <div className="text-sm mt-1">
                  cosθ = {cosTheta.toFixed(4)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Display Options */}
        <div className="mt-4 p-4 bg-gray-500/5 rounded-lg border border-gray-500/20">
          <Label className="mb-2 block font-semibold">Display Options:</Label>
          <div className="flex flex-wrap gap-4">
            <Button variant={showResultant ? "default" : "outline"} size="sm" onClick={() => setShowResultant(!showResultant)}>
              {showResultant ? "Hide" : "Show"} Resultant
            </Button>
            <Button variant={showComponents ? "default" : "outline"} size="sm" onClick={() => setShowComponents(!showComponents)}>
              {showComponents ? "Hide" : "Show"} Components
            </Button>
            <Button variant={showNegativeSigns ? "default" : "outline"} size="sm" onClick={() => setShowNegativeSigns(!showNegativeSigns)}>
              {showNegativeSigns ? "Hide" : "Show"} Negative Signs
            </Button>
            <Button variant={showAxesLabels ? "default" : "outline"} size="sm" onClick={() => setShowAxesLabels(!showAxesLabels)}>
              {showAxesLabels ? "Hide" : "Show"} Axis Labels
            </Button>
            <Button variant={showAngle ? "default" : "outline"} size="sm" onClick={() => setShowAngle(!showAngle)}>
              {showAngle ? "Hide" : "Show"} Angle
            </Button>
          </div>
        </div>

        {/* Formulas Reference */}
        <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
          <h4 className="font-semibold mb-2">Vector Addition Formulas:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <ul className="space-y-1">
                <li><strong>Vector Addition:</strong> R = A + B = (Aₓ+Bₓ, A_y+B_y, A_z+B_z)</li>
                <li><strong>Magnitude:</strong> |R| = √(Rₓ² + R_y² + R_z²)</li>
                <li><strong>Dot Product:</strong> A·B = |A||B|cosθ = AₓBₓ + A_yB_y + A_zB_z</li>
                <li><strong>Angle:</strong> θ = cos⁻¹[(A·B)/(|A||B|)]</li>
              </ul>
            </div>
            <div>
              <ul className="space-y-1">
                <li><strong>Cross Product:</strong> |A×B| = |A||B|sinθ</li>
                <li><strong>Projection:</strong> A·B̂ = |A|cosθ (scalar)</li>
                <li><strong>Unit Vector:</strong> Â = A/|A|</li>
                <li><strong>Negative:</strong> -A = (-Aₓ, -A_y, -A_z)</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Conceptual Problems and Solutions
const VectorProblems: React.FC = () => {
  const [currentProblem, setCurrentProblem] = useState(0);
  
  const problems = [
    {
      id: 1,
      title: "Perpendicular Vectors",
      question: "Two vectors A = 3î + 0ĵ and B = 0î + 4ĵ are perpendicular. Find their resultant and prove they are perpendicular.",
      solution: {
        steps: [
          "Given: A = (3, 0), B = (0, 4)",
          "Resultant R = A + B = (3+0, 0+4) = (3, 4)",
          "Magnitude |R| = √(3² + 4²) = √(9 + 16) = √25 = 5",
          "Dot Product: A·B = (3)(0) + (0)(4) = 0",
          "Since A·B = 0, vectors are perpendicular (θ = 90°)"
        ],
        result: "R = 3î + 4ĵ, |R| = 5, A·B = 0 (Perpendicular)",
        formula: "For perpendicular: |R| = √(A² + B²), A·B = 0"
      },
      category: "perpendicular"
    },
    {
      id: 2,
      title: "Parallel Vectors",
      question: "Vectors A = 5î + 0ĵ and B = 3î + 0ĵ are parallel. Find their resultant.",
      solution: {
        steps: [
          "Given: A = (5, 0), B = (3, 0)",
          "Resultant R = A + B = (5+3, 0+0) = (8, 0)",
          "Magnitude |R| = √(8² + 0²) = 8",
          "Direction: Same as A and B (along X-axis)",
          "Dot Product: A·B = (5)(3) + (0)(0) = 15 = |A||B|cos0° = 5×3×1 = 15"
        ],
        result: "R = 8î, |R| = 8, θ = 0°",
        formula: "For parallel: |R| = |A| + |B|, θ = 0°"
      },
      category: "parallel"
    },
    {
      id: 3,
      title: "Antiparallel Vectors",
      question: "Vectors A = 4î + 0ĵ and B = -3î + 0ĵ are antiparallel. Find their resultant.",
      solution: {
        steps: [
          "Given: A = (4, 0), B = (-3, 0)",
          "Resultant R = A + B = (4-3, 0+0) = (1, 0)",
          "Magnitude |R| = √(1² + 0²) = 1",
          "Direction: Same as A (positive X)",
          "Dot Product: A·B = (4)(-3) + (0)(0) = -12 = |A||B|cos180° = 4×3×(-1) = -12"
        ],
        result: "R = 1î, |R| = 1, θ = 180°",
        formula: "For antiparallel: |R| = |A| - |B| (if A > B), θ = 180°"
      },
      category: "antiparallel"
    },
    {
      id: 4,
      title: "3D Vector Addition",
      question: "Find the resultant of vectors A = 2î + 3ĵ - k̂ and B = -î + 4ĵ + 2k̂.",
      solution: {
        steps: [
          "Given: A = (2, 3, -1), B = (-1, 4, 2)",
          "Resultant R = A + B = (2-1, 3+4, -1+2) = (1, 7, 1)",
          "Magnitude |R| = √(1² + 7² + 1²) = √(1 + 49 + 1) = √51 ≈ 7.14",
          "Direction cosines: cosα = 1/√51, cosβ = 7/√51, cosγ = 1/√51"
        ],
        result: "R = î + 7ĵ + k̂, |R| = √51 ≈ 7.14",
        formula: "R = (Aₓ+Bₓ, A_y+B_y, A_z+B_z)"
      },
      category: "3d"
    },
    {
      id: 5,
      title: "Negative Vector",
      question: "If vector A = 5î + 12ĵ, find -A and verify |A| = |-A|.",
      solution: {
        steps: [
          "Given: A = (5, 12)",
          "-A = (-5, -12)",
          "|A| = √(5² + 12²) = √(25 + 144) = √169 = 13",
          "|-A| = √((-5)² + (-12)²) = √(25 + 144) = √169 = 13",
          "Conclusion: |A| = |-A|, but directions are opposite"
        ],
        result: "-A = -5î - 12ĵ, |A| = |-A| = 13",
        formula: "-A = (-Aₓ, -A_y, -A_z), |-A| = |A|"
      },
      category: "negative"
    },
    {
      id: 6,
      title: "Unit Vector",
      question: "Find the unit vector in the direction of A = 3î - 4ĵ + 12k̂.",
      solution: {
        steps: [
          "Given: A = (3, -4, 12)",
          "|A| = √(3² + (-4)² + 12²) = √(9 + 16 + 144) = √169 = 13",
          "Â = A/|A| = (3/13, -4/13, 12/13)",
          "Â = (0.23, -0.31, 0.92) approximately"
        ],
        result: "Â = (3/13)î - (4/13)ĵ + (12/13)k̂",
        formula: "Â = A/|A|, |Â| = 1"
      },
      category: "unit"
    },
    {
      id: 7,
      title: "Vector Subtraction",
      question: "Given A = 7î + 2ĵ and B = 3î - 4ĵ, find A - B.",
      solution: {
        steps: [
          "Given: A = (7, 2), B = (3, -4)",
          "A - B = A + (-B) = (7-3, 2-(-4)) = (4, 6)",
          "|A - B| = √(4² + 6²) = √(16 + 36) = √52 = 2√13 ≈ 7.21"
        ],
        result: "A - B = 4î + 6ĵ, |A - B| = 2√13",
        formula: "A - B = (Aₓ-Bₓ, A_y-B_y)"
      },
      category: "subtraction"
    },
    {
      id: 8,
      title: "Angle Between Vectors",
      question: "Vectors A = 2î + 2ĵ and B = -2î + 2ĵ. Find the angle between them.",
      solution: {
        steps: [
          "Given: A = (2, 2), B = (-2, 2)",
          "|A| = √(2² + 2²) = √8 = 2√2",
          "|B| = √((-2)² + 2²) = √8 = 2√2",
          "A·B = (2)(-2) + (2)(2) = -4 + 4 = 0",
          "cosθ = (A·B)/(|A||B|) = 0/(2√2 × 2√2) = 0",
          "θ = cos⁻¹(0) = 90°"
        ],
        result: "θ = 90°, Vectors are perpendicular",
        formula: "cosθ = (A·B)/(|A||B|)"
      },
      category: "angle"
    }
  ];

  const problem = problems[currentProblem];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Vector Conceptual Problems & Solutions</CardTitle>
        <CardDescription>
          Comprehensive collection of vector problems covering all cases: perpendicular, parallel, antiparallel, 3D, negative vectors, and more.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Problem Navigation */}
        <div className="flex flex-wrap gap-2 mb-6">
          {problems.map((p, index) => (
            <Button
              key={p.id}
              variant={currentProblem === index ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentProblem(index)}
            >
              Problem {p.id}: {p.title}
            </Button>
          ))}
        </div>

        {/* Problem Display */}
        <div className="space-y-6">
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                Problem {problem.id}: {problem.title}
                <Badge variant="secondary">{problem.category}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label className="font-semibold block mb-2">Question:</Label>
                  <p className="text-lg italic">{problem.question}</p>
                </div>
                
                <div>
                  <Label className="font-semibold block mb-2">Solution:</Label>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    {problem.solution.steps.map((step, idx) => (
                      <li key={idx}>{step}</li>
                    ))}
                  </ol>
                </div>

                <div className="p-4 bg-emerald-500/5 rounded-lg border border-emerald-500/20">
                  <Label className="font-semibold block mb-2">Result:</Label>
                  <p className="text-xl font-bold text-emerald-600">{problem.solution.result}</p>
                  <p className="text-sm mt-2"><strong>Formula:</strong> {problem.solution.formula}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentProblem((prev) => (prev > 0 ? prev - 1 : problems.length - 1))}
              disabled={problems.length <= 1}
            >
              Previous Problem
            </Button>
            <Button
              variant="outline"
              onClick={() => setCurrentProblem((prev) => (prev < problems.length - 1 ? prev + 1 : 0))}
              disabled={problems.length <= 1}
            >
              Next Problem
            </Button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mt-8 p-4 bg-gray-500/5 rounded-lg border border-gray-500/20">
          <Label className="font-semibold block mb-2">Filter by Category:</Label>
          <div className="flex flex-wrap gap-2">
            {Array.from(new Set(problems.map(p => p.category))).map((cat) => (
              <Button
                key={cat}
                variant="outline"
                size="sm"
                onClick={() => {
                  const firstIndex = problems.findIndex(p => p.category === cat);
                  if (firstIndex !== -1) setCurrentProblem(firstIndex);
                }}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Key Concepts Reference
const VectorConcepts: React.FC = () => {
  const concepts = [
    {
      title: "Vector Basics",
      items: [
        "Vector has magnitude and direction",
        "Scalar has only magnitude (e.g., mass, temperature)",
        "Vector representation: A = Aₓî + A_yĵ + A_zk̂",
        "Magnitude: |A| = √(Aₓ² + A_y² + A_z²)"
      ]
    },
    {
      title: "Vector Types",
      items: [
        "Position vector: from origin to point",
        "Displacement vector: change in position",
        "Unit vector: magnitude = 1, shows direction",
        "Null vector: magnitude = 0, undefined direction",
        "Equal vectors: same magnitude and direction",
        "Negative vector: -A (same magnitude, opposite direction)",
        "Parallel vectors: same or opposite direction",
        "Perpendicular vectors: θ = 90°, A·B = 0"
      ]
    },
    {
      title: "Vector Operations",
      items: [
        "Addition: A + B = (Aₓ+Bₓ, A_y+B_y, A_z+B_z)",
        "Subtraction: A - B = A + (-B)",
        "Dot Product: A·B = |A||B|cosθ = AₓBₓ + A_yB_y + A_zB_z",
        "Cross Product: A×B = |A||B|sinθ n̂ (perpendicular to both)"
      ]
    },
    {
      title: "Special Cases",
      items: [
        "Parallel (θ=0°): |A+B| = |A| + |B|, A·B = |A||B|",
        "Antiparallel (θ=180°): |A+B| = ||A| - |B||, A·B = -|A||B|",
        "Perpendicular (θ=90°): |A+B| = √(A² + B²), A·B = 0",
        "A·B = 0 ⇒ Perpendicular",
        "A×B = 0 ⇒ Parallel"
      ]
    },
    {
      title: "Coordinate Systems",
      items: [
        "Cartesian: (x, y, z) with unit vectors î, ĵ, k̂",
        "Polar: (r, θ) in 2D",
        "Spherical: (r, θ, φ) in 3D",
        "Cylindrical: (r, θ, z) in 3D",
        "Direction cosines: cosα, cosβ, cosγ"
      ]
    },
    {
      title: "Applications",
      items: [
        "Physics: Force, velocity, acceleration, momentum",
        "Engineering: Stress, strain, fluid flow",
        "Computer Graphics: Transformations, lighting",
        "Navigation: Direction, displacement",
        "Astronomy: Orbital mechanics, celestial coordinates"
      ]
    }
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Vector Key Concepts Reference</CardTitle>
        <CardDescription>
          Complete reference of vector concepts, operations, and special cases.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {concepts.map((concept, idx) => (
            <Card key={idx} className="bg-primary/5 border-primary/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{concept.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  {concept.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Main Component
interface VectorsComprehensiveProps {
  defaultTab?: string;
}

export const Physics3DVectorsComprehensive: React.FC<VectorsComprehensiveProps> = ({ defaultTab = "visualization" }) => {
  return (
    <Tabs defaultValue={defaultTab} className="w-full">
      <TabsList className="flex-wrap">
        <TabsTrigger value="visualization">3D Visualization</TabsTrigger>
        <TabsTrigger value="problems">Conceptual Problems</TabsTrigger>
        <TabsTrigger value="concepts">Key Concepts</TabsTrigger>
      </TabsList>
      
      <TabsContent value="visualization" className="mt-4">
        <VectorComprehensive3D />
      </TabsContent>
      
      <TabsContent value="problems" className="mt-4">
        <VectorProblems />
      </TabsContent>
      
      <TabsContent value="concepts" className="mt-4">
        <VectorConcepts />
      </TabsContent>
    </Tabs>
  );
};

export default Physics3DVectorsComprehensive;
