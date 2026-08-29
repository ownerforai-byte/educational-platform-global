"use client";

import { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { isWebGLAvailable } from "@/lib/webgl";
import { createThreeScene, disposeThreeScene, bindResize, standardMaterial } from "@/components/lab/three-scene";

// Vector Basics 3D Component
const VectorBasics3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [vec1Mag, setVec1Mag] = useState(5);
  const [vec1AngleX, setVec1AngleX] = useState(0);
  const [vec1AngleY, setVec1AngleY] = useState(0);
  const [vec2Mag, setVec2Mag] = useState(4);
  const [vec2AngleX, setVec2AngleX] = useState(90);
  const [vec2AngleY, setVec2AngleY] = useState(0);
  const [showComponents, setShowComponents] = useState(true);
  const [showResultant, setShowResultant] = useState(true);

  // Calculate resultant
  const vec1X = vec1Mag * Math.cos(vec1AngleY * Math.PI / 180) * Math.cos(vec1AngleX * Math.PI / 180);
  const vec1Y = vec1Mag * Math.sin(vec1AngleY * Math.PI / 180);
  const vec1Z = vec1Mag * Math.cos(vec1AngleY * Math.PI / 180) * Math.sin(vec1AngleX * Math.PI / 180);

  const vec2X = vec2Mag * Math.cos(vec2AngleY * Math.PI / 180) * Math.cos(vec2AngleX * Math.PI / 180);
  const vec2Y = vec2Mag * Math.sin(vec2AngleY * Math.PI / 180);
  const vec2Z = vec2Mag * Math.cos(vec2AngleY * Math.PI / 180) * Math.sin(vec2AngleX * Math.PI / 180);

  const resultantX = vec1X + vec2X;
  const resultantY = vec1Y + vec2Y;
  const resultantZ = vec1Z + vec2Z;
  const resultantMag = Math.sqrt(resultantX * resultantX + resultantY * resultantY + resultantZ * resultantZ);

  useEffect(() => {
    if (!mountRef.current || !isWebGLAvailable()) return;

    let ts: any = null;
    let unbind: (() => void) | null = null;
    let cancelled = false;

    async function init() {
      try {
        const { createThreeScene, bindResize } = await import("@/components/lab/three-scene");
        
        ts = createThreeScene(mountRef.current!, {
          cameraPosition: new THREE.Vector3(0, 15, 25),
          autoRotate: false,
          background: 0x020617
        });
        
        unbind = bindResize(ts);

        // Grid helper
        const gridHelper = new THREE.GridHelper(20, 20, 0x333333, 0x222222);
        ts.group.add(gridHelper);

        // Axes helper
        const axesHelper = new THREE.AxesHelper(8);
        ts.group.add(axesHelper);

        // Vector 1 (Red)
        const vec1Arrow = new THREE.ArrowHelper(
          new THREE.Vector3(vec1X, vec1Y, vec1Z).normalize(),
          new THREE.Vector3(0, 0, 0),
          vec1Mag,
          0xff4444,
          0.4,
          0.2
        );
        vec1Arrow.name = "vec1";
        ts.group.add(vec1Arrow);

        // Vector 2 (Blue)
        const vec2Arrow = new THREE.ArrowHelper(
          new THREE.Vector3(vec2X, vec2Y, vec2Z).normalize(),
          new THREE.Vector3(0, 0, 0),
          vec2Mag,
          0x4444ff,
          0.4,
          0.2
        );
        vec2Arrow.name = "vec2";
        ts.group.add(vec2Arrow);

        // Resultant (Green)
        let resultantArrow: THREE.ArrowHelper | null = null;
        function updateVectors() {
          // Remove old arrows
          ts.group.children = ts.group.children.filter((child: any) => 
            child.name !== "vec1" && child.name !== "vec2" && child.name !== "resultant"
          );

          // Vector 1
          const newVec1Arrow = new THREE.ArrowHelper(
            new THREE.Vector3(vec1X, vec1Y, vec1Z).normalize(),
            new THREE.Vector3(0, 0, 0),
            vec1Mag,
            0xff4444,
            0.4,
            0.2
          );
          newVec1Arrow.name = "vec1";
          ts.group.add(newVec1Arrow);

          // Vector 2
          const newVec2Arrow = new THREE.ArrowHelper(
            new THREE.Vector3(vec2X, vec2Y, vec2Z).normalize(),
            new THREE.Vector3(0, 0, 0),
            vec2Mag,
            0x4444ff,
            0.4,
            0.2
          );
          newVec2Arrow.name = "vec2";
          ts.group.add(newVec2Arrow);

          // Resultant
          if (showResultant) {
            resultantArrow = new THREE.ArrowHelper(
              new THREE.Vector3(resultantX, resultantY, resultantZ).normalize(),
              new THREE.Vector3(0, 0, 0),
              resultantMag,
              0x44ff44,
              0.5,
              0.25
            );
            resultantArrow.name = "resultant";
            ts.group.add(resultantArrow);
          }
        }

        updateVectors();

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
  }, [vec1Mag, vec1AngleX, vec1AngleY, vec2Mag, vec2AngleX, vec2AngleY, showResultant]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Vector Addition in 3D</CardTitle>
        <CardDescription>
          Interactive 3D vector addition with adjustable magnitude and direction. 
          Red = Vector 1, Blue = Vector 2, Green = Resultant.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="aspect-[16/10] bg-black rounded-lg overflow-hidden" ref={mountRef} />
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          <div className="space-y-2">
            <Label>Vector 1 Magnitude: {vec1Mag}</Label>
            <Slider 
              value={[vec1Mag]} 
              onValueChange={(v) => setVec1Mag(v[0])} 
              min={1} 
              max={10} 
              step={0.5}
            />
          </div>
          <div className="space-y-2">
            <Label>Vector 2 Magnitude: {vec2Mag}</Label>
            <Slider 
              value={[vec2Mag]} 
              onValueChange={(v) => setVec2Mag(v[0])} 
              min={1} 
              max={10} 
              step={0.5}
            />
          </div>
          <div className="space-y-2">
            <Label>Resultant: {resultantMag.toFixed(2)}</Label>
            <Button variant={showResultant ? "default" : "outline"} onClick={() => setShowResultant(!showResultant)} className="w-full">
              {showResultant ? "Hide Resultant" : "Show Resultant"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="space-y-2">
            <Label>Vector 1 Angle X: {vec1AngleX}°</Label>
            <Slider 
              value={[vec1AngleX]} 
              onValueChange={(v) => setVec1AngleX(v[0])} 
              min={0} 
              max={360} 
              step={10}
            />
          </div>
          <div className="space-y-2">
            <Label>Vector 1 Angle Y: {vec1AngleY}°</Label>
            <Slider 
              value={[vec1AngleY]} 
              onValueChange={(v) => setVec1AngleY(v[0])} 
              min={0} 
              max={360} 
              step={10}
            />
          </div>
          <div className="space-y-2">
            <Label>Vector 2 Angle X: {vec2AngleX}°</Label>
            <Slider 
              value={[vec2AngleX]} 
              onValueChange={(v) => setVec2AngleX(v[0])} 
              min={0} 
              max={360} 
              step={10}
            />
          </div>
          <div className="space-y-2">
            <Label>Vector 2 Angle Y: {vec2AngleY}°</Label>
            <Slider 
              value={[vec2AngleY]} 
              onValueChange={(v) => setVec2AngleY(v[0])} 
              min={0} 
              max={360} 
              step={10}
            />
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
          <h4 className="font-semibold mb-2">Vector Addition Formulas:</h4>
          <ul className="text-sm space-y-1">
            <li><strong>Magnitude:</strong> |R| = √(Rx² + Ry² + Rz²)</li>
            <li><strong>Direction Cosines:</strong> cosα = Rx/|R|, cosβ = Ry/|R|, cosγ = Rz/|R|</li>
            <li><strong>Dot Product:</strong> A·B = |A||B|cosθ = AxBx + AyBy + AzBz</li>
            <li><strong>Cross Product:</strong> |A×B| = |A||B|sinθ</li>
            <li><strong>Resultant:</strong> R = A + B (Vector Addition)</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

// Dot Product Visualization
const DotProduct3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [angle, setAngle] = useState(45);
  const [magA, setMagA] = useState(5);
  const [magB, setMagB] = useState(5);
  const [showProjection, setShowProjection] = useState(true);

  const dotProduct = magA * magB * Math.cos(angle * Math.PI / 180);

  useEffect(() => {
    if (!mountRef.current || !isWebGLAvailable()) return;

    let ts: any = null;
    let unbind: (() => void) | null = null;
    let cancelled = false;

    async function init() {
      try {
        const { createThreeScene, bindResize } = await import("@/components/lab/three-scene");
        
        ts = createThreeScene(mountRef.current!, {
          cameraPosition: new THREE.Vector3(0, 15, 25),
          autoRotate: false,
          background: 0x020617
        });
        
        unbind = bindResize(ts);

        // Grid and axes
        const gridHelper = new THREE.GridHelper(20, 20, 0x333333, 0x222222);
        ts.group.add(gridHelper);
        const axesHelper = new THREE.AxesHelper(8);
        ts.group.add(axesHelper);

        // Vector A (Red) - fixed along x-axis
        const vecA = new THREE.ArrowHelper(
          new THREE.Vector3(1, 0, 0),
          new THREE.Vector3(0, 0, 0),
          magA,
          0xff4444,
          0.4,
          0.2
        );
        ts.group.add(vecA);

        // Vector B (Blue) - at angle
        const angleRad = angle * Math.PI / 180;
        const vecB = new THREE.ArrowHelper(
          new THREE.Vector3(Math.cos(angleRad), Math.sin(angleRad), 0),
          new THREE.Vector3(0, 0, 0),
          magB,
          0x4444ff,
          0.4,
          0.2
        );
        ts.group.add(vecB);

        // Projection
        let projectionLine: THREE.Line | null = null;
        let projectionArrow: THREE.ArrowHelper | null = null;
        
        function updateProjection() {
          if (projectionLine) ts.group.remove(projectionLine);
          if (projectionArrow) ts.group.remove(projectionArrow);
          
          if (!showProjection) return;

          // Projection line (dashed)
          const projectionGeo = new THREE.BufferGeometry();
          const points = [
            new THREE.Vector3(magB * Math.cos(angleRad), magB * Math.sin(angleRad), 0),
            new THREE.Vector3(magB * Math.cos(angleRad), 0, 0)
          ];
          projectionGeo.setFromPoints(points);
          const projectionMat = new THREE.LineDashedMaterial({ color: 0x888888, dashSize: 0.2, gapSize: 0.1 });
          projectionLine = new THREE.Line(projectionGeo, projectionMat);
          ts.group.add(projectionLine);

          // Projection arrow (from origin to projection point)
          projectionArrow = new THREE.ArrowHelper(
            new THREE.Vector3(1, 0, 0),
            new THREE.Vector3(0, 0, 0),
            magB * Math.cos(angleRad),
            0xffffff,
            0.3,
            0.15
          );
          ts.group.add(projectionArrow);
        }

        updateProjection();

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
  }, [angle, magA, magB, showProjection]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Dot Product Visualization</CardTitle>
        <CardDescription>
          3D visualization of dot product: A·B = |A||B|cosθ. 
          White arrow shows projection of B onto A.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="aspect-[16/10] bg-black rounded-lg overflow-hidden" ref={mountRef} />
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="space-y-2">
            <Label>|A| = {magA}</Label>
            <Slider 
              value={[magA]} 
              onValueChange={(v) => setMagA(v[0])} 
              min={1} 
              max={10} 
              step={0.5}
            />
          </div>
          <div className="space-y-2">
            <Label>|B| = {magB}</Label>
            <Slider 
              value={[magB]} 
              onValueChange={(v) => setMagB(v[0])} 
              min={1} 
              max={10} 
              step={0.5}
            />
          </div>
          <div className="space-y-2">
            <Label>θ = {angle}°</Label>
            <Slider 
              value={[angle]} 
              onValueChange={(v) => setAngle(v[0])} 
              min={0} 
              max={180} 
              step={5}
            />
          </div>
          <div className="space-y-2">
            <Label>A·B = {dotProduct.toFixed(2)}</Label>
            <Button variant={showProjection ? "default" : "outline"} onClick={() => setShowProjection(!showProjection)} className="w-full">
              {showProjection ? "Hide" : "Show"} Projection
            </Button>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-amber-500/5 rounded-lg border border-amber-500/20">
          <h4 className="font-semibold mb-2">Dot Product Properties:</h4>
          <ul className="text-sm space-y-1">
            <li><strong>Formula:</strong> A·B = |A||B|cosθ = AxBx + AyBy + AzBz</li>
            <li><strong>Commutative:</strong> A·B = B·A</li>
            <li><strong>Distributive:</strong> A·(B+C) = A·B + A·C</li>
            <li><strong>When θ = 0°:</strong> A·B = |A||B| (Maximum, parallel)</li>
            <li><strong>When θ = 90°:</strong> A·B = 0 (Perpendicular, orthogonal)</li>
            <li><strong>When θ = 180°:</strong> A·B = -|A||B| (Minimum, antiparallel)</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

// Cross Product Visualization
const CrossProduct3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [angleX, setAngleX] = useState(90);
  const [angleY, setAngleY] = useState(0);
  const [showNormal, setShowNormal] = useState(true);
  const [showPlane, setShowPlane] = useState(false);

  // Calculate cross product
  const magA = 5;
  const magB = 5;
  
  // Vector A: along x-axis
  const ax = magA, ay = 0, az = 0;
  
  // Vector B: in x-y plane at angle
  const angleRad = angleX * Math.PI / 180;
  const bx = magB * Math.cos(angleRad);
  const by = magB * Math.sin(angleRad);
  const bz = 0;

  // Cross product A × B
  const cx = ay * bz - az * by;  // 0 * 0 - 0 * by = 0
  const cy = az * bx - ax * bz;  // 0 * bx - ax * 0 = 0
  const cz = ax * by - ay * bx;  // ax * by - 0 * bx = ax * by
  
  const crossMagnitude = Math.sqrt(cx * cx + cy * cy + cz * cz);

  useEffect(() => {
    if (!mountRef.current || !isWebGLAvailable()) return;

    let ts: any = null;
    let unbind: (() => void) | null = null;
    let cancelled = false;

    async function init() {
      try {
        const { createThreeScene, bindResize } = await import("@/components/lab/three-scene");
        
        ts = createThreeScene(mountRef.current!, {
          cameraPosition: new THREE.Vector3(0, 15, 25),
          autoRotate: false,
          background: 0x020617
        });
        
        unbind = bindResize(ts);

        // Grid and axes
        const gridHelper = new THREE.GridHelper(20, 20, 0x333333, 0x222222);
        ts.group.add(gridHelper);
        const axesHelper = new THREE.AxesHelper(8);
        ts.group.add(axesHelper);

        // Vector A (Red) - along x-axis
        const vecA = new THREE.ArrowHelper(
          new THREE.Vector3(1, 0, 0),
          new THREE.Vector3(0, 0, 0),
          magA,
          0xff4444,
          0.4,
          0.2
        );
        ts.group.add(vecA);

        // Vector B (Blue) - at angle in x-y plane
        const vecB = new THREE.ArrowHelper(
          new THREE.Vector3(bx/magB, by/magB, 0),
          new THREE.Vector3(0, 0, 0),
          magB,
          0x4444ff,
          0.4,
          0.2
        );
        ts.group.add(vecB);

        // Cross product result (Green) - along z-axis
        let crossArrow: THREE.ArrowHelper | null = null;
        function updateCrossProduct() {
          if (crossArrow) ts.group.remove(crossArrow);
          
          if (!showNormal) return;
          
          crossArrow = new THREE.ArrowHelper(
            new THREE.Vector3(0, 0, cz > 0 ? 1 : -1),
            new THREE.Vector3(0, 0, 0),
            Math.abs(cz),
            0x44ff44,
            0.5,
            0.25
          );
          ts.group.add(crossArrow);
        }

        // Plane formed by A and B
        let planeMesh: THREE.Mesh | null = null;
        function updatePlane() {
          if (planeMesh) ts.group.remove(planeMesh);
          
          if (!showPlane) return;
          
          // Create a plane that contains both vectors
          const planeGeo = new THREE.PlaneGeometry(20, 20);
          const planeMat = new THREE.MeshBasicMaterial({ 
            color: 0x448844, 
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.2
          });
          planeMesh = new THREE.Mesh(planeGeo, planeMat);
          planeMesh.position.set(0, 0, 0);
          ts.group.add(planeMesh);
        }

        updateCrossProduct();
        updatePlane();

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
  }, [angleX, angleY, showNormal, showPlane]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Cross Product Visualization</CardTitle>
        <CardDescription>
          3D visualization of cross product: A×B = |A||B|sinθ n̂. 
          Result (Green arrow) is perpendicular to both A and B.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="aspect-[16/10] bg-black rounded-lg overflow-hidden" ref={mountRef} />
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          <div className="space-y-2">
            <Label>Angle X: {angleX}°</Label>
            <Slider 
              value={[angleX]} 
              onValueChange={(v) => setAngleX(v[0])} 
              min={0} 
              max={360} 
              step={10}
            />
          </div>
          <div className="space-y-2">
            <Label>Angle Y: {angleY}°</Label>
            <Slider 
              value={[angleY]} 
              onValueChange={(v) => setAngleY(v[0])} 
              min={0} 
              max={360} 
              step={10}
            />
          </div>
          <div className="space-y-2">
            <Label>|A×B| = {crossMagnitude.toFixed(2)}</Label>
            <Button variant={showNormal ? "default" : "outline"} onClick={() => setShowNormal(!showNormal)} className="w-full">
              {showNormal ? "Hide Normal" : "Show Normal"}
            </Button>
          </div>
          <div className="space-y-2">
            <Label>Plane: A & B</Label>
            <Button variant={showPlane ? "default" : "outline"} onClick={() => setShowPlane(!showPlane)} className="w-full">
              {showPlane ? "Hide Plane" : "Show Plane"}
            </Button>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
          <h4 className="font-semibold mb-2">Cross Product Properties:</h4>
          <ul className="text-sm space-y-1">
            <li><strong>Formula:</strong> A×B = |A||B|sinθ n̂</li>
            <li><strong>Anti-commutative:</strong> A×B = -(B×A)</li>
            <li><strong>Direction:</strong> Right-hand rule - perpendicular to both A and B</li>
            <li><strong>When θ = 0°:</strong> |A×B| = 0 (Parallel vectors)</li>
            <li><strong>When θ = 90°:</strong> |A×B| = |A||B| (Maximum)</li>
            <li><strong>Magnitude:</strong> |A×B| = √(cₓ² + cᵧ² + c_z²)</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

// Main Vectors Component
interface Vectors3DProps {
  defaultTab?: string;
}

export const Physics3DVectors: React.FC<Vectors3DProps> = ({ defaultTab = "basics" }) => {
  return (
    <Tabs defaultValue={defaultTab} className="w-full">
      <TabsList className="flex-wrap">
        <TabsTrigger value="basics">Vector Addition</TabsTrigger>
        <TabsTrigger value="dot">Dot Product</TabsTrigger>
        <TabsTrigger value="cross">Cross Product</TabsTrigger>
      </TabsList>
      
      <TabsContent value="basics" className="mt-4">
        <VectorBasics3D />
      </TabsContent>
      
      <TabsContent value="dot" className="mt-4">
        <DotProduct3D />
      </TabsContent>
      
      <TabsContent value="cross" className="mt-4">
        <CrossProduct3D />
      </TabsContent>
    </Tabs>
  );
};

export default Physics3DVectors;
