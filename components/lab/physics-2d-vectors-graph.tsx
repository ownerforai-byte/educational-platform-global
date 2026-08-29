"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import * as THREE from "three";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { isWebGLAvailable } from "@/lib/webgl";
import { disposeThreeScene } from "@/components/lab/three-scene";

// Helper to create a 2D scene
const create2DScene = (container: HTMLElement, config: any) => {
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(
    -config.width / 2, config.width / 2,
    config.height / 2, -config.height / 2,
    0.1, 1000
  );
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Orthographic camera for 2D view
  camera.position.set(0, 0, 10);
  camera.lookAt(0, 0, 0);

  // Controls are not needed for 2D orthographic view
  // Lighting
  const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
  scene.add(ambientLight);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(10, 10, 10);
  scene.add(directionalLight);

  // Group for all objects
  const group = new THREE.Group();
  scene.add(group);

  return { scene, camera, renderer, group };
};

const bindResize2D = (ts: any, container: HTMLElement, config: any) => {
  const handleResize = () => {
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    // Update orthographic camera
    ts.camera.left = -width / 2 * config.zoom;
    ts.camera.right = width / 2 * config.zoom;
    ts.camera.top = height / 2 * config.zoom;
    ts.camera.bottom = -height / 2 * config.zoom;
    ts.camera.updateProjectionMatrix();
    ts.renderer.setSize(width, height);
  };
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
};

// 2D Vector Graph with X, X', Y, Y' axes
const Vector2DGraph: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  
  // Vector 1 state
  const [vec1X, setVec1X] = useState(3);
  const [vec1Y, setVec1Y] = useState(0);
  
  // Vector 2 state
  const [vec2X, setVec2X] = useState(0);
  const [vec2Y, setVec2Y] = useState(4);
  
  // Display options
  const [showGrid, setShowGrid] = useState(true);
  const [showResultant, setShowResultant] = useState(true);
  const [showComponents, setShowComponents] = useState(true);
  const [showNegativeSigns, setShowNegativeSigns] = useState(true);
  const [showTriangle, setShowTriangle] = useState(false);
  const [showParallelogram, setShowParallelogram] = useState(false);
  
  // Preset cases
  const [selectedCase, setSelectedCase] = useState<string>("perpendicular");
  
  // Calculate resultant
  const resultantX = vec1X + vec2X;
  const resultantY = vec1Y + vec2Y;
  const resultantMag = Math.sqrt(resultantX ** 2 + resultantY ** 2);
  
  // Calculate magnitudes
  const vec1Mag = Math.sqrt(vec1X ** 2 + vec1Y ** 2);
  const vec2Mag = Math.sqrt(vec2X ** 2 + vec2Y ** 2);
  
  // Calculate angle between vectors
  const dotProduct = vec1X * vec2X + vec1Y * vec2Y;
  const cosTheta = dotProduct / (vec1Mag * vec2Mag);
  const angleDeg = Math.abs(Math.acos(Math.max(-1, Math.min(1, cosTheta))) * 180 / Math.PI);
  
  // Vector angles from X-axis
  const vec1Angle = Math.atan2(vec1Y, vec1X) * 180 / Math.PI;
  const vec2Angle = Math.atan2(vec2Y, vec2X) * 180 / Math.PI;
  const resultantAngle = Math.atan2(resultantY, resultantX) * 180 / Math.PI;
  
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
  
  // Preset configurations for 2D
  const presets = {
    perpendicular: { vec1: [3, 0], vec2: [0, 4] },
    parallel: { vec1: [3, 0], vec2: [2, 0] },
    antiparallel: { vec1: [3, 0], vec2: [-2, 0] },
    "negative-y": { vec1: [3, 0], vec2: [0, -4] },
    "both-negative": { vec1: [-3, 0], vec2: [0, -4] },
    "diagonal-1": { vec1: [2, 2], vec2: [-2, 2] },
    "diagonal-2": { vec1: [3, 1], vec2: [1, 3] },
    "equal-opposite": { vec1: [4, 0], vec2: [-4, 0] },
  };
  
  const applyPreset = (presetKey: string) => {
    const preset = presets[presetKey as keyof typeof presets];
    if (preset) {
      setVec1X(preset.vec1[0]);
      setVec1Y(preset.vec1[1]);
      setVec2X(preset.vec2[0]);
      setVec2Y(preset.vec2[1]);
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
        const config = {
          width: 30,
          height: 30,
          zoom: 0.5
        };
        
        ts = create2DScene(mountRef.current!, config);
        unbind = bindResize2D(ts, mountRef.current!, config);

        // Grid helper for 2D
        if (showGrid) {
          const gridHelper = new THREE.GridHelper(20, 20, 0x333333, 0x222222);
          gridHelper.rotation.x = Math.PI / 2; // Rotate to be in XY plane
          ts.group.add(gridHelper);
        }

        // Main axes (X, Y) - standard
        const mainAxes = new THREE.AxesHelper(10);
        ts.group.add(mainAxes);

        // Create labeled axes with X, X', Y, Y' labels
        // X-axis positive (right)
        const createAxisArrow = (start: THREE.Vector3, end: THREE.Vector3, color: number, name: string) => {
          const direction = end.clone().sub(start).normalize();
          const length = start.distanceTo(end);
          const arrow = new THREE.ArrowHelper(direction, start, length, color, 0.4, 0.2);
          arrow.name = name;
          return arrow;
        };

        // X-axis (positive - right)
        const xPosArrow = createAxisArrow(
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(10, 0, 0),
          0xff0000,
          "x-axis"
        );
        ts.group.add(xPosArrow);

        // X'-axis (negative - left)
        const xNegArrow = createAxisArrow(
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(-10, 0, 0),
          0xff0000,
          "x'-axis"
        );
        ts.group.add(xNegArrow);

        // Y-axis (positive - up)
        const yPosArrow = createAxisArrow(
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(0, 10, 0),
          0x00ff00,
          "y-axis"
        );
        ts.group.add(yPosArrow);

        // Y'-axis (negative - down)
        const yNegArrow = createAxisArrow(
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(0, -10, 0),
          0x00ff00,
          "y'-axis"
        );
        ts.group.add(yNegArrow);

        // Add axis labels using CSS2DRenderer for text
        let labelRenderer: any = null;
        let labels: any[] = [];
        
        try {
          const CSS2DRenderer = require('three/examples/jsm/renderers/CSS2DRenderer').CSS2DRenderer;
          labelRenderer = new CSS2DRenderer();
          labelRenderer.setSize(mountRef.current!.clientWidth, mountRef.current!.clientHeight);
          labelRenderer.domElement.style.position = 'absolute';
          labelRenderer.domElement.style.top = '0';
          labelRenderer.domElement.style.pointerEvents = 'none';
          mountRef.current!.appendChild(labelRenderer.domElement);

          // Create text labels
          const createTextLabel = (text: string, position: THREE.Vector3, color: string = 'white') => {
            const labelDiv = document.createElement('div');
            labelDiv.textContent = text;
            labelDiv.style.color = color;
            labelDiv.style.fontSize = '12px';
            labelDiv.style.fontWeight = 'bold';
            labelDiv.style.backgroundColor = 'rgba(0,0,0,0.5)';
            labelDiv.style.padding = '2px 6px';
            labelDiv.style.borderRadius = '3px';
            
            const label = new (require('three').CSS2DObject)(labelDiv);
            label.position.copy(position);
            ts.group.add(label);
            labels.push(label);
            return label;
          };

          // Add axis labels
          createTextLabel('X', new THREE.Vector3(11, 0, 0), '#ff0000');
          createTextLabel('X\'', new THREE.Vector3(-11, 0, 0), '#ff0000');
          createTextLabel('Y', new THREE.Vector3(0, 11, 0), '#00ff00');
          createTextLabel('Y\'', new THREE.Vector3(0, -11, 0), '#00ff00');
          createTextLabel('O (0,0)', new THREE.Vector3(0, 0, 0), '#ffffff');
        } catch (e) {
          // CSS2DRenderer not available, skip text labels
          console.log('CSS2DRenderer not available, using color coding only');
        }

        // Vector arrows
        let vec1Arrow: THREE.ArrowHelper | null = null;
        let vec2Arrow: THREE.ArrowHelper | null = null;
        let resultantArrow: THREE.ArrowHelper | null = null;
        let componentArrows: THREE.ArrowHelper[] = [];
        let triangleLine: THREE.Line | null = null;
        let parallelogramLines: THREE.Line[] = [];

        function updateScene() {
          // Clear previous vectors and helpers
          ts.group.children = ts.group.children.filter((child: any) => 
            child.name === 'x-axis' || child.name === 'x'-axis' || 
            child.name === 'y-axis' || child.name === 'y'-axis' ||
            child.name?.startsWith('grid') ||
            child.name?.startsWith('CSS2D')
          );

          // Re-add grid if enabled
          if (showGrid) {
            const gridHelper = new THREE.GridHelper(20, 20, 0x333333, 0x222222);
            gridHelper.rotation.x = Math.PI / 2;
            gridHelper.name = 'grid';
            ts.group.add(gridHelper);
          }

          // Vector 1 (Red) - from origin
          const vec1Dir = new THREE.Vector3(vec1X, vec1Y, 0);
          const vec1Color = vec1X < 0 && vec1Y === 0 ? 0xff0000 : 
                           vec1Y < 0 && vec1X === 0 ? 0xff0000 : 0xff4444;
          
          vec1Arrow = new THREE.ArrowHelper(
            vec1Dir.clone().normalize(),
            new THREE.Vector3(0, 0, 0),
            vec1Mag,
            vec1Color,
            0.5,
            0.25
          );
          vec1Arrow.name = "vec1";
          ts.group.add(vec1Arrow);

          // Vector 2 (Blue) - from origin
          const vec2Dir = new THREE.Vector3(vec2X, vec2Y, 0);
          const vec2Color = vec2X < 0 && vec2Y === 0 ? 0x0000ff : 
                           vec2Y < 0 && vec2X === 0 ? 0x0000ff : 0x4444ff;
          
          vec2Arrow = new THREE.ArrowHelper(
            vec2Dir.clone().normalize(),
            new THREE.Vector3(0, 0, 0),
            vec2Mag,
            vec2Color,
            0.5,
            0.25
          );
          vec2Arrow.name = "vec2";
          ts.group.add(vec2Arrow);

          // Resultant (Green) - from origin
          if (showResultant) {
            const resultantDir = new THREE.Vector3(resultantX, resultantY, 0);
            resultantArrow = new THREE.ArrowHelper(
              resultantDir.clone().normalize(),
              new THREE.Vector3(0, 0, 0),
              resultantMag,
              0x44ff44,
              0.6,
              0.3
            );
            resultantArrow.name = "resultant";
            ts.group.add(resultantArrow);
          }

          // Triangle law: place vec2 at head of vec1
          if (showTriangle) {
            // Clear previous triangle
            if (triangleLine) ts.group.remove(triangleLine);
            
            // Line from vec1 head to vec2 head (this is the resultant by triangle law)
            const geometry = new THREE.BufferGeometry();
            const points = [
              new THREE.Vector3(vec1X, vec1Y, 0),
              new THREE.Vector3(vec1X + vec2X, vec1Y + vec2Y, 0)
            ];
            geometry.setFromPoints(points);
            const material = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2, transparent: true, opacity: 0.8 });
            triangleLine = new THREE.Line(geometry, material);
            triangleLine.name = "triangle-line";
            ts.group.add(triangleLine);

            // Vector 2 from vec1 head (for triangle law visualization)
            const vec2FromHead = new THREE.ArrowHelper(
              vec2Dir.clone().normalize(),
              new THREE.Vector3(vec1X, vec1Y, 0),
              vec2Mag,
              0x4444ff,
              0.4,
              0.2
            );
            vec2FromHead.name = "vec2-from-head";
            ts.group.add(vec2FromHead);
          }

          // Parallelogram law
          if (showParallelogram) {
            // Clear previous parallelogram
            parallelogramLines.forEach(line => ts.group.remove(line));
            parallelogramLines = [];

            // Create parallelogram sides
            const createLine = (start: THREE.Vector3, end: THREE.Vector3, color: number) => {
              const geometry = new THREE.BufferGeometry();
              const points = [start.clone(), end.clone()];
              geometry.setFromPoints(points);
              const material = new THREE.LineBasicMaterial({ color, linewidth: 1, transparent: true, opacity: 0.6 });
              const line = new THREE.Line(geometry, material);
              parallelogramLines.push(line);
              ts.group.add(line);
              return line;
            };

            // Side 1: from vec1 head parallel to vec2
            createLine(
              new THREE.Vector3(vec1X, vec1Y, 0),
              new THREE.Vector3(vec1X + vec2X, vec1Y + vec2Y, 0),
              0x4444ff
            );

            // Side 2: from vec2 head parallel to vec1
            createLine(
              new THREE.Vector3(vec2X, vec2Y, 0),
              new THREE.Vector3(vec1X + vec2X, vec1Y + vec2Y, 0),
              0xff4444
            );

            // Diagonal (resultant)
            if (showResultant) {
              createLine(
                new THREE.Vector3(0, 0, 0),
                new THREE.Vector3(vec1X + vec2X, vec1Y + vec2Y, 0),
                0x44ff44
              );
            }
          }

          // Component visualization
          if (showComponents) {
            // Projection of vec2 on vec1
            const projMag = dotProduct / vec1Mag;
            if (!isNaN(projMag) && isFinite(projMag)) {
              const projDir = new THREE.Vector3(vec1X, vec1Y, 0).normalize();
              const projEnd = new THREE.Vector3(0, 0, 0).add(projDir.clone().multiplyScalar(projMag));
              
              const projArrow = new THREE.ArrowHelper(
                projDir.clone(),
                new THREE.Vector3(0, 0, 0),
                projMag,
                0xffff00,
                0.3,
                0.15
              );
              projArrow.name = "comp-proj";
              ts.group.add(projArrow);
              componentArrows.push(projArrow);

              // Perpendicular component
              const perpVec = new THREE.Vector3(vec2X, vec2Y, 0).sub(projEnd);
              if (perpVec.length() > 0.01) {
                const perpArrow = new THREE.ArrowHelper(
                  perpVec.clone().normalize(),
                  projEnd,
                  perpVec.length(),
                  0xff88ff,
                  0.3,
                  0.15
                );
                perpArrow.name = "comp-perp";
                ts.group.add(perpArrow);
                componentArrows.push(perpArrow);
              }
            }
          }

          // Re-add axis arrows on top
          ts.group.add(xPosArrow);
          ts.group.add(xNegArrow);
          ts.group.add(yPosArrow);
          ts.group.add(yNegArrow);
        }

        updateScene();

        function animate() {
          if (cancelled) return;
          if (labelRenderer) labelRenderer.render(ts.scene, ts.camera);
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
  }, [vec1X, vec1Y, vec2X, vec2Y, showGrid, showResultant, showComponents, showTriangle, showParallelogram, showNegativeSigns]);

  // Format vector for display
  const formatVector = (x: number, y: number) => {
    const formatVal = (v: number) => v.toFixed(2).replace(/\.?0+$/, '');
    return `(${formatVal(x)}, ${formatVal(y)})`;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>2D Vector Graph - Input Based X,Y Coordinates</CardTitle>
        <CardDescription>
          Interactive 2D Cartesian graph showing vectors with X, X' (positive/negative X-axis) and Y, Y' (positive/negative Y-axis). 
          <Badge variant={relationship === "Parallel (same direction)" || relationship === "Parallel (opposite direction)" ? "default" : "secondary"} className="ml-2">
            {relationship}
          </Badge>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="aspect-[16/10] bg-black rounded-lg overflow-hidden relative" ref={mountRef}>
          {/* Coordinate labels as fallback */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center text-white/20">
            <div className="grid grid-cols-3 grid-rows-3 w-full h-full">
              <div className="flex items-end justify-start p-2 text-xs">(-X, +Y)</div>
              <div className="flex items-end justify-center p-2 text-xs">(0, +Y)</div>
              <div className="flex items-end justify-end p-2 text-xs">(+X, +Y)</div>
              <div className="flex items-center justify-start p-2 text-xs">(-X, 0)</div>
              <div className="flex items-center justify-center p-2 text-xs">ORIGIN (0,0)</div>
              <div className="flex items-center justify-end p-2 text-xs">(+X, 0)</div>
              <div className="flex items-start justify-start p-2 text-xs">(-X, -Y)</div>
              <div className="flex items-start justify-center p-2 text-xs">(0, -Y)</div>
              <div className="flex items-start justify-end p-2 text-xs">(+X, -Y)</div>
            </div>
          </div>
        </div>
        
        {/* Quick Presets */}
        <div className="mt-4">
          <Label className="mb-2 block">Quick Presets (2D Cases):</Label>
          <div className="flex flex-wrap gap-2">
            <Button variant={selectedCase === "perpendicular" ? "default" : "outline"} size="sm" onClick={() => applyPreset("perpendicular")}>
              Perpendicular
            </Button>
            <Button variant={selectedCase === "parallel" ? "default" : "outline"} size="sm" onClick={() => applyPreset("parallel")}>
              Parallel (+)
            </Button>
            <Button variant={selectedCase === "antiparallel" ? "default" : "outline"} size="sm" onClick={() => applyPreset("antiparallel")}>
              Antiparallel (-)
            </Button>
            <Button variant={selectedCase === "negative-y" ? "default" : "outline"} size="sm" onClick={() => applyPreset("negative-y")}>
              Negative Y
            </Button>
            <Button variant={selectedCase === "both-negative" ? "default" : "outline"} size="sm" onClick={() => applyPreset("both-negative")}>
              Both Negative
            </Button>
            <Button variant={selectedCase === "diagonal-1" ? "default" : "outline"} size="sm" onClick={() => applyPreset("diagonal-1")}>
              Diagonal 1
            </Button>
            <Button variant={selectedCase === "diagonal-2" ? "default" : "outline"} size="sm" onClick={() => applyPreset("diagonal-2")}>
              Diagonal 2
            </Button>
            <Button variant={selectedCase === "equal-opposite" ? "default" : "outline"} size="sm" onClick={() => applyPreset("equal-opposite")}>
              Equal & Opposite
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
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label className="text-xs">X Component</Label>
                  <Input type="number" value={vec1X} onChange={(e) => setVec1X(parseFloat(e.target.value) || 0)} className="text-sm" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Y Component</Label>
                  <Input type="number" value={vec1Y} onChange={(e) => setVec1Y(parseFloat(e.target.value) || 0)} className="text-sm" />
                </div>
              </div>
              <div className="mt-2 text-sm">
                <strong>A = </strong>{formatVector(vec1X, vec1Y)}<br />
                <strong>|A| = </strong>{vec1Mag.toFixed(2)}<br />
                <strong>θ = </strong>{vec1Angle.toFixed(1)}° from +X
              </div>
            </CardContent>
          </Card>

          {/* Vector 2 */}
          <Card className="bg-amber-500/5 border-amber-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Vector B</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label className="text-xs">X Component</Label>
                  <Input type="number" value={vec2X} onChange={(e) => setVec2X(parseFloat(e.target.value) || 0)} className="text-sm" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Y Component</Label>
                  <Input type="number" value={vec2Y} onChange={(e) => setVec2Y(parseFloat(e.target.value) || 0)} className="text-sm" />
                </div>
              </div>
              <div className="mt-2 text-sm">
                <strong>B = </strong>{formatVector(vec2X, vec2Y)}<br />
                <strong>|B| = </strong>{vec2Mag.toFixed(2)}<br />
                <strong>θ = </strong>{vec2Angle.toFixed(1)}° from +X
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
                  {formatVector(resultantX, resultantY)}
                </div>
                <div className="text-sm mt-1">
                  <strong>|R| = </strong>{resultantMag.toFixed(2)}<br />
                  <strong>θ = </strong>{resultantAngle.toFixed(1)}° from +X
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
            <Button variant={showGrid ? "default" : "outline"} size="sm" onClick={() => setShowGrid(!showGrid)}>
              {showGrid ? "Hide" : "Show"} Grid
            </Button>
            <Button variant={showResultant ? "default" : "outline"} size="sm" onClick={() => setShowResultant(!showResultant)}>
              {showResultant ? "Hide" : "Show"} Resultant
            </Button>
            <Button variant={showComponents ? "default" : "outline"} size="sm" onClick={() => setShowComponents(!showComponents)}>
              {showComponents ? "Hide" : "Show"} Components
            </Button>
            <Button variant={showTriangle ? "default" : "outline"} size="sm" onClick={() => setShowTriangle(!showTriangle)}>
              {showTriangle ? "Hide" : "Show"} Triangle Law
            </Button>
            <Button variant={showParallelogram ? "default" : "outline"} size="sm" onClick={() => setShowParallelogram(!showParallelogram)}>
              {showParallelogram ? "Hide" : "Show"} Parallelogram
            </Button>
          </div>
        </div>

        {/* Axis Explanation */}
        <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
          <h4 className="font-semibold mb-2">Understanding the Graph:</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
            <div className="p-2 bg-white/5 rounded">
              <strong className="text-red-500">X-axis (Red)</strong><br />
              Positive direction: Right (+X)
            </div>
            <div className="p-2 bg-white/5 rounded">
              <strong className="text-red-500">X'-axis (Red)</strong><br />
              Negative direction: Left (-X)
            </div>
            <div className="p-2 bg-white/5 rounded">
              <strong className="text-green-500">Y-axis (Green)</strong><br />
              Positive direction: Up (+Y)
            </div>
            <div className="p-2 bg-white/5 rounded">
              <strong className="text-green-500">Y'-axis (Green)</strong><br />
              Negative direction: Down (-Y)
            </div>
          </div>
          <div className="mt-3 text-sm">
            <strong>📍 Origin:</strong> (0, 0) - Center of the graph<br />
            <strong>🎯 Quadrants:</strong>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>Quadrant I: (+X, +Y) - Top Right</li>
              <li>Quadrant II: (-X, +Y) - Top Left</li>
              <li>Quadrant III: (-X, -Y) - Bottom Left</li>
              <li>Quadrant IV: (+X, -Y) - Bottom Right</li>
            </ul>
          </div>
        </div>

        {/* Formulas Reference */}
        <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
          <h4 className="font-semibold mb-2">2D Vector Formulas:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <ul className="space-y-1">
                <li><strong>Vector:</strong> A = (Aₓ, A_y) = Aₓî + A_yĵ</li>
                <li><strong>Magnitude:</strong> |A| = √(Aₓ² + A_y²)</li>
                <li><strong>Direction:</strong> θ = tan⁻¹(A_y/Aₓ)</li>
                <li><strong>Addition:</strong> R = (Aₓ+Bₓ, A_y+B_y)</li>
                <li><strong>Dot Product:</strong> A·B = AₓBₓ + A_yB_y</li>
              </ul>
            </div>
            <div>
              <ul className="space-y-1">
                <li><strong>Angle:</strong> cosθ = (A·B)/(|A||B|)</li>
                <li><strong>Cross Product Mag:</strong> |A×B| = |AₓB_y - A_yBₓ|</li>
                <li><strong>Perpendicular:</strong> A·B = 0 ⇒ θ = 90°</li>
                <li><strong>Parallel:</strong> A×B = 0 ⇒ θ = 0° or 180°</li>
                <li><strong>Negative:</strong> -A = (-Aₓ, -A_y)</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// 2D Vector Problems
const Vector2DProblems: React.FC = () => {
  const [currentProblem, setCurrentProblem] = useState(0);
  
  const problems = [
    {
      id: 1,
      title: "2D Perpendicular Vectors",
      question: "In a 2D coordinate system, vector A = 3î is along X-axis and vector B = 4ĵ is along Y-axis. Plot these on X,X', Y,Y' axes and find the resultant.",
      solution: {
        steps: [
          "Plot A = (3, 0) on +X axis (3 units right)",
          "Plot B = (0, 4) on +Y axis (4 units up)",
          "Resultant R = (3+0, 0+4) = (3, 4)",
          "Magnitude |R| = √(3² + 4²) = 5 (Pythagorean triple 3-4-5)",
          "Direction: θ = tan⁻¹(4/3) ≈ 53.13° from +X axis"
        ],
        result: "R = 3î + 4ĵ, |R| = 5, θ ≈ 53.13°",
        visualization: "A on +X (red), B on +Y (green), R diagonal (purple)"
      },
      category: "2d-perpendicular"
    },
    {
      id: 2,
      title: "Vector in Different Quadrants",
      question: "Vector A = -3î + 2ĵ is in Quadrant II. Vector B = 2î - 4ĵ is in Quadrant IV. Find their resultant.",
      solution: {
        steps: [
          "A = (-3, 2): 3 units left on X' axis, 2 units up on Y axis",
          "B = (2, -4): 2 units right on X axis, 4 units down on Y' axis",
          "R = (-3+2, 2-4) = (-1, -2)",
          "|R| = √((-1)² + (-2)²) = √5 ≈ 2.24",
          "Direction: θ = tan⁻¹((-2)/(-1)) = tan⁻¹(2) ≈ 243.43° (Quadrant III)"
        ],
        result: "R = -î - 2ĵ, |R| = √5 ≈ 2.24, θ ≈ 243.43°",
        visualization: "A in Q-II, B in Q-IV, R in Q-III"
      },
      category: "quadrants"
    },
    {
      id: 3,
      title: "2D Vector Addition with Negative Components",
      question: "Vector A = 5î - 3ĵ and vector B = -2î + 4ĵ. Find R = A + B and plot on X,X', Y,Y' axes.",
      solution: {
        steps: [
          "A = (5, -3): 5 units right on X, 3 units down on Y'",
          "B = (-2, 4): 2 units left on X', 4 units up on Y",
          "R = (5-2, -3+4) = (3, 1)",
          "|R| = √(3² + 1²) = √10 ≈ 3.16",
          "Direction: θ = tan⁻¹(1/3) ≈ 18.43° from +X"
        ],
        result: "R = 3î + ĵ, |R| = √10 ≈ 3.16, θ ≈ 18.43°",
        visualization: "A in Q-IV, B in Q-II, R in Q-I"
      },
      category: "negative-components"
    },
    {
      id: 4,
      title: "2D Vector Subtraction",
      question: "Given A = 7î + 2ĵ and B = 3î - 4ĵ, find A - B and plot both vectors and the result.",
      solution: {
        steps: [
          "A = (7, 2): 7 right on X, 2 up on Y",
          "B = (3, -4): 3 right on X, 4 down on Y'",
          "-B = (-3, 4): 3 left on X', 4 up on Y",
          "A - B = A + (-B) = (7-3, 2+4) = (4, 6)",
          "|A - B| = √(4² + 6²) = √52 = 2√13 ≈ 7.21",
          "Direction: θ = tan⁻¹(6/4) = tan⁻¹(1.5) ≈ 56.31°"
        ],
        result: "A - B = 4î + 6ĵ, |A - B| = 2√13 ≈ 7.21",
        visualization: "Triangle law: A from origin, -B from A's head, result from origin"
      },
      category: "subtraction"
    },
    {
      id: 5,
      title: "Equal Magnitude, Opposite Direction",
      question: "Vector A = 5î + 0ĵ and vector B = -5î + 0ĵ. Plot on X,X' axes and find resultant.",
      solution: {
        steps: [
          "A = (5, 0): 5 units right on +X axis",
          "B = (-5, 0): 5 units left on -X (X') axis",
          "R = (5-5, 0+0) = (0, 0)",
          "|R| = 0 (zero vector)",
          "Direction: Undefined (zero vector has no direction)"
        ],
        result: "R = 0 (zero vector)",
        visualization: "A on +X, B on X', equal length, opposite direction, cancel out"
      },
      category: "zero-resultant"
    }
  ];

  const problem = problems[currentProblem];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>2D Vector Problems - X,Y Graph Based</CardTitle>
        <CardDescription>
          Problems specifically designed for 2D Cartesian coordinate system with X,X', Y,Y' axes.
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
                  <p className="text-sm mt-2"><strong>Visualization:</strong> {problem.solution.visualization}</p>
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
      </CardContent>
    </Card>
  );
};

// Main Component
interface Vectors2DGraphProps {
  defaultTab?: string;
}

export const Physics2DVectorsGraph: React.FC<Vectors2DGraphProps> = ({ defaultTab = "graph" }) => {
  return (
    <Tabs defaultValue={defaultTab} className="w-full">
      <TabsList className="flex-wrap">
        <TabsTrigger value="graph">2D Graph Visualization</TabsTrigger>
        <TabsTrigger value="problems">2D Problems</TabsTrigger>
      </TabsList>
      
      <TabsContent value="graph" className="mt-4">
        <Vector2DGraph />
      </TabsContent>
      
      <TabsContent value="problems" className="mt-4">
        <Vector2DProblems />
      </TabsContent>
    </Tabs>
  );
};

export default Physics2DVectorsGraph;
