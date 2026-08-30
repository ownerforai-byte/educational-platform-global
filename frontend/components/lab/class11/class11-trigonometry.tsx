"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import * as THREE from "three";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Slider from "@/components/ui/slider";
import { isWebGLAvailable } from "@/lib/webgl";
import { createThreeScene, disposeThreeScene, bindResize, standardMaterial } from "@/components/lab/three-scene";

export const Class11Trigonometry: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [angleDegrees, setAngleDegrees] = useState(45);
  const [radius, setRadius] = useState(3);
  const [showUnitCircle, setShowUnitCircle] = useState(true);
  const [showWave, setShowWave] = useState(true);
  const [showIdentities, setShowIdentities] = useState(true);

  // Calculated quantities
  const angleRadians = useMemo(() => (angleDegrees * Math.PI) / 180, [angleDegrees]);
  const sinValue = useMemo(() => Math.sin(angleRadians), [angleRadians]);
  const cosValue = useMemo(() => Math.cos(angleRadians), [angleRadians]);
  const tanValue = useMemo(() => Math.tan(angleRadians), [angleRadians]);
  const cscValue = useMemo(() => 1 / Math.sin(angleRadians), [angleRadians]);
  const secValue = useMemo(() => 1 / Math.cos(angleRadians), [angleRadians]);
  const cotValue = useMemo(() => 1 / Math.tan(angleRadians), [angleRadians]);

  useEffect(() => {
    if (!mountRef.current || !isWebGLAvailable()) return;

    let ts: any = null;
    let unbind: (() => void) | null = null;
    let cancelled = false;

    async function init() {
      try {
        const { createThreeScene, bindResize } = await import("@/components/lab/three-scene");
        
        ts = createThreeScene(mountRef.current!, {
          cameraPosition: new THREE.Vector3(0, 5, 15),
          autoRotate: false,
          background: 0x0f172a
        });
        
        unbind = bindResize(ts);

        // Ground
        const groundGeo = new THREE.PlaneGeometry(50, 50);
        const groundMat = standardMaterial(0x1e293b, { roughness: 0.8 });
        const ground = new THREE.Mesh(groundGeo, groundMat);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -0.01;
        ground.receiveShadow = true;
        ts.group.add(ground);

        const grid = new THREE.GridHelper(50, 100, 0x334155, 0x1e293b);
        ts.group.add(grid);

        // Unit circle
        let unitCircle: THREE.Line | null = null;
        let angleLine: THREE.Line | null = null;
        let sinLine: THREE.Line | null = null;
        let cosLine: THREE.Line | null = null;
        let tanLine: THREE.Line | null = null;
        let pointOnCircle: THREE.Mesh | null = null;

        // Wave graphs
        let sineWave: THREE.Line | null = null;
        let cosineWave: THREE.Line | null = null;
        let tangentWave: THREE.Line | null = null;

        // Axes
        const xAxisGeo = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(-8, 0, 0),
          new THREE.Vector3(8, 0, 0)
        ]);
        const xAxis = new THREE.Line(xAxisGeo, new THREE.LineBasicMaterial({ color: 0xef4444 }));
        ts.group.add(xAxis);

        const yAxisGeo = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(0, -5, 0),
          new THREE.Vector3(0, 5, 0)
        ]);
        const yAxis = new THREE.Line(yAxisGeo, new THREE.LineBasicMaterial({ color: 0x22c55e }));
        ts.group.add(yAxis);

        // Secondary axes for waves
        const xAxis2Geo = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(-8, 0, -10),
          new THREE.Vector3(8, 0, -10)
        ]);
        const xAxis2 = new THREE.Line(xAxis2Geo, new THREE.LineBasicMaterial({ color: 0x6366f1, transparent: true, opacity: 0.5 }));
        ts.group.add(xAxis2);

        const yAxis2Geo = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(0, -3, -10),
          new THREE.Vector3(0, 3, -10)
        ]);
        const yAxis2 = new THREE.Line(yAxis2Geo, new THREE.LineBasicMaterial({ color: 0x6366f1, transparent: true, opacity: 0.5 }));
        ts.group.add(yAxis2);

        // Lighting
        const ambient = new THREE.AmbientLight(0xffffff, 0.5);
        ts.scene.add(ambient);
        const dir = new THREE.DirectionalLight(0xffffff, 0.8);
        dir.position.set(5, 8, 6);
        ts.scene.add(dir);

        const startTime = performance.now();

        function updateScene() {
          if (!ts) return;

          // Clear previous objects
          if (unitCircle) { ts.group.remove(unitCircle); unitCircle.geometry.dispose(); }
          if (angleLine) { ts.group.remove(angleLine); angleLine.geometry.dispose(); }
          if (sinLine) { ts.group.remove(sinLine); sinLine.geometry.dispose(); }
          if (cosLine) { ts.group.remove(cosLine); cosLine.geometry.dispose(); }
          if (tanLine) { ts.group.remove(tanLine); tanLine.geometry.dispose(); }
          if (pointOnCircle) { ts.group.remove(pointOnCircle); pointOnCircle.geometry.dispose(); }
          if (sineWave) { ts.group.remove(sineWave); sineWave.geometry.dispose(); }
          if (cosineWave) { ts.group.remove(cosineWave); cosineWave.geometry.dispose(); }
          if (tangentWave) { ts.group.remove(tangentWave); tangentWave.geometry.dispose(); }

          const elapsed = (performance.now() - startTime) / 1000;
          const time = elapsed;

          // Unit circle
          if (showUnitCircle) {
            const circlePoints: THREE.Vector3[] = [];
            const steps = 100;
            for (let i = 0; i <= steps; i++) {
              const theta = (i / steps) * Math.PI * 2;
              circlePoints.push(new THREE.Vector3(radius * Math.cos(theta), radius * Math.sin(theta), 0));
            }
            const circleGeo = new THREE.BufferGeometry().setFromPoints(circlePoints);
            const circleMat = new THREE.LineBasicMaterial({ color: 0x3b82f6, linewidth: 2 });
            unitCircle = new THREE.Line(circleGeo, circleMat);
            ts.group.add(unitCircle);

            // Angle line from origin
            const anglePoints = [
              new THREE.Vector3(0, 0, 0),
              new THREE.Vector3(radius * Math.cos(angleRadians), radius * Math.sin(angleRadians), 0)
            ];
            const angleGeo = new THREE.BufferGeometry().setFromPoints(anglePoints);
            const angleMat = new THREE.LineBasicMaterial({ color: 0xfbbf24, linewidth: 2 });
            angleLine = new THREE.Line(angleGeo, angleMat);
            ts.group.add(angleLine);

            // Point on circle
            const pointGeo = new THREE.SphereGeometry(0.2, 16, 16);
            const pointMat = standardMaterial(0xffffff, { emissive: 0xffffff, emissiveIntensity: 0.8 });
            pointOnCircle = new THREE.Mesh(pointGeo, pointMat);
            pointOnCircle.position.set(
              radius * Math.cos(angleRadians),
              radius * Math.sin(angleRadians),
              0
            );
            ts.group.add(pointOnCircle);

            // Sin line (vertical from point to x-axis)
            const sinPoints = [
              new THREE.Vector3(radius * Math.cos(angleRadians), 0, 0),
              new THREE.Vector3(radius * Math.cos(angleRadians), radius * Math.sin(angleRadians), 0)
            ];
            const sinGeo = new THREE.BufferGeometry().setFromPoints(sinPoints);
            const sinMat = new THREE.LineBasicMaterial({ color: 0x22c55e, linewidth: 2, transparent: true, opacity: 0.8 });
            sinLine = new THREE.Line(sinGeo, sinMat);
            ts.group.add(sinLine);

            // Cos line (horizontal from origin to point projection)
            const cosPoints = [
              new THREE.Vector3(0, 0, 0),
              new THREE.Vector3(radius * Math.cos(angleRadians), 0, 0)
            ];
            const cosGeo = new THREE.BufferGeometry().setFromPoints(cosPoints);
            const cosMat = new THREE.LineBasicMaterial({ color: 0xef4444, linewidth: 2, transparent: true, opacity: 0.8 });
            cosLine = new THREE.Line(cosGeo, cosMat);
            ts.group.add(cosLine);

            // Tan line (extended)
            const tanLength = Math.min(5, Math.abs(radius * Math.tan(angleRadians)));
            const tanPoints = [
              new THREE.Vector3(0, 0, 0),
              new THREE.Vector3(1, tanLength * Math.sign(Math.tan(angleRadians)), 0)
            ];
            const tanGeo = new THREE.BufferGeometry().setFromPoints(tanPoints);
            const tanMat = new THREE.LineBasicMaterial({ color: 0xfbbf24, linewidth: 2, transparent: true, opacity: 0.8 });
            tanLine = new THREE.Line(tanGeo, tanMat);
            ts.group.add(tanLine);
          }

          // Wave graphs
          if (showWave) {
            // Sine wave
            const sinePoints: THREE.Vector3[] = [];
            const waveSteps = 100;
            for (let i = 0; i <= waveSteps; i++) {
              const x = (i / waveSteps - 0.5) * 12;
              const y = Math.sin(x) * 2;
              sinePoints.push(new THREE.Vector3(x, y, -10));
            }
            const sineGeo = new THREE.BufferGeometry().setFromPoints(sinePoints);
            const sineMat = new THREE.LineBasicMaterial({ color: 0x22c55e, linewidth: 2 });
            sineWave = new THREE.Line(sineGeo, sineMat);
            ts.group.add(sineWave);

            // Cosine wave
            const cosinePoints: THREE.Vector3[] = [];
            for (let i = 0; i <= waveSteps; i++) {
              const x = (i / waveSteps - 0.5) * 12;
              const y = Math.cos(x) * 2;
              cosinePoints.push(new THREE.Vector3(x, y, -10));
            }
            const cosineGeo = new THREE.BufferGeometry().setFromPoints(cosinePoints);
            const cosineMat = new THREE.LineBasicMaterial({ color: 0xef4444, linewidth: 2 });
            cosineWave = new THREE.Line(cosineGeo, cosineMat);
            ts.group.add(cosineWave);

            // Tangent wave (partial)
            const tangentPoints: THREE.Vector3[] = [];
            for (let i = 0; i <= waveSteps; i++) {
              const x = (i / waveSteps - 0.5) * 8;
              if (Math.abs(x) < Math.PI / 2) {
                const y = Math.tan(x) * 1;
                tangentPoints.push(new THREE.Vector3(x * 1.5, y, -10));
              }
            }
            const tangentGeo = new THREE.BufferGeometry().setFromPoints(tangentPoints);
            const tangentMat = new THREE.LineBasicMaterial({ color: 0xfbbf24, linewidth: 2 });
            tangentWave = new THREE.Line(tangentGeo, tangentMat);
            ts.group.add(tangentWave);
          }

          // Animate
          if (pointOnCircle) {
            pointOnCircle.position.y += Math.sin(time * 5) * 0.02;
          }

          ts.controls.update();
          ts.renderer.render(ts.scene, ts.camera);
        }

        function animate() {
          if (cancelled) return;
          requestAnimationFrame(animate);
          updateScene();
        }

        animate();
      } catch (error) {
        console.error("Error initializing 3D scene:", error);
      }
    }

    init();

    return () => {
      cancelled = true;
      if (unbind) unbind();
      if (ts) {
        try {
          disposeThreeScene(ts);
        } catch (e) {}
      }
    };
  }, [angleDegrees, radius, showUnitCircle, showWave, showIdentities, angleRadians, sinValue, cosValue, tanValue]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Class 11 Trigonometry</CardTitle>
        <CardDescription>
          Interactive 3D visualization of trigonometric functions, unit circle, and identities.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div ref={mountRef} className="w-full h-96 bg-gray-100 rounded-lg" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <Label>Angle θ (°)</Label>
              <Slider min={0} max={360} step={1} value={[angleDegrees]} onValueChange={(v) => setAngleDegrees(v[0])} />
              <p className="text-sm text-gray-500">Current: {angleDegrees}° = {angleRadians.toFixed(2)} rad</p>
            </div>
            <div>
              <Label>Radius r</Label>
              <Slider min={1} max={8} step={0.5} value={[radius]} onValueChange={(v) => setRadius(v[0])} />
              <p className="text-sm text-gray-500">Current: {radius}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowUnitCircle(!showUnitCircle)}
                className={`px-3 py-2 rounded-md text-xs font-medium ${showUnitCircle ? 'bg-primary/20 text-primary' : 'bg-muted/50 text-muted-foreground'}`}
              >
                Unit Circle: {showUnitCircle ? 'ON' : 'OFF'}
              </button>
              <button
                onClick={() => setShowWave(!showWave)}
                className={`px-3 py-2 rounded-md text-xs font-medium ${showWave ? 'bg-primary/20 text-primary' : 'bg-muted/50 text-muted-foreground'}`}
              >
                Waves: {showWave ? 'ON' : 'OFF'}
              </button>
              <button
                onClick={() => setShowIdentities(!showIdentities)}
                className={`px-3 py-2 rounded-md text-xs font-medium ${showIdentities ? 'bg-primary/20 text-primary' : 'bg-muted/50 text-muted-foreground'}`}
              >
                Identities: {showIdentities ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-md border border-border bg-muted/30 p-3 text-sm space-y-2">
              <p><span className="font-semibold">Trigonometric Values (θ = {angleDegrees}°):</span></p>
              <p className="text-green-600">sin(θ) = {sinValue.toFixed(4)}</p>
              <p className="text-red-600">cos(θ) = {cosValue.toFixed(4)}</p>
              <p className="text-yellow-600">tan(θ) = {tanValue.toFixed(4)}</p>
              <p className="text-purple-600">csc(θ) = {cscValue.toFixed(4)}</p>
              <p className="text-orange-600">sec(θ) = {secValue.toFixed(4)}</p>
              <p className="text-blue-600">cot(θ) = {cotValue.toFixed(4)}</p>
            </div>

            <div>
              <h3 className="font-semibold">Trigonometric Functions (Class 11)</h3>
              <p className="text-sm mt-2">
                Trigonometric functions relate the angles of a right triangle to the ratios of its sides.
              </p>
              <div className="text-sm mt-3 space-y-2">
                <p><strong>Sine:</strong> sin(θ) = opposite/hypotenuse</p>
                <p><strong>Cosine:</strong> cos(θ) = adjacent/hypotenuse</p>
                <p><strong>Tangent:</strong> tan(θ) = opposite/adjacent = sin(θ)/cos(θ)</p>
                <p><strong>Cosecant:</strong> csc(θ) = hypotenuse/opposite = 1/sin(θ)</p>
                <p><strong>Secant:</strong> sec(θ) = hypotenuse/adjacent = 1/cos(θ)</p>
                <p><strong>Cotangent:</strong> cot(θ) = adjacent/opposite = 1/tan(θ) = cos(θ)/sin(θ)</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold">Unit Circle</h3>
              <p className="text-sm mt-2">
                The unit circle is a circle with radius 1 centered at the origin.
              </p>
              <ul className="text-sm mt-2 list-disc pl-5 space-y-1">
                <li><strong>Quadrant I:</strong> 0°-90° (0-π/2 rad) - All functions positive</li>
                <li><strong>Quadrant II:</strong> 90°-180° (π/2-π rad) - sin positive, cos & tan negative</li>
                <li><strong>Quadrant III:</strong> 180°-270° (π-3π/2 rad) - tan positive, sin & cos negative</li>
                <li><strong>Quadrant IV:</strong> 270°-360° (3π/2-2π rad) - cos positive, sin & tan negative</li>
                <li><strong>ASTC Rule:</strong> All Students Take Calculus (mnemonic for signs)</li>
                <li><strong>Conversion:</strong> 1 radian = 180°/π, 1° = π/180 radians</li>
              </ul>
            </div>

            {showIdentities && (
              <div>
                <h3 className="font-semibold">Trigonometric Identities</h3>
                <div className="text-sm mt-2 space-y-2">
                  <p><strong>Pythagorean Identities:</strong></p>
                  <p className="pl-4">sin²θ + cos²θ = 1</p>
                  <p className="pl-4">1 + tan²θ = sec²θ</p>
                  <p className="pl-4">1 + cot²θ = csc²θ</p>

                  <p className="mt-3"><strong>Reciprocal Identities:</strong></p>
                  <p className="pl-4">sinθ = 1/cscθ, cscθ = 1/sinθ</p>
                  <p className="pl-4">cosθ = 1/secθ, secθ = 1/cosθ</p>
                  <p className="pl-4">tanθ = 1/cotθ, cotθ = 1/tanθ</p>

                  <p className="mt-3"><strong>Quotient Identities:</strong></p>
                  <p className="pl-4">tanθ = sinθ/cosθ, cotθ = cosθ/sinθ</p>

                  <p className="mt-3"><strong>Even-Odd Identities:</strong></p>
                  <p className="pl-4">cos(-θ) = cosθ (even), sin(-θ) = -sinθ (odd)</p>
                  <p className="pl-4">tan(-θ) = -tanθ (odd)</p>

                  <p className="mt-3"><strong>Periodic Identities:</strong></p>
                  <p className="pl-4">sin(θ + 2π) = sinθ, cos(θ + 2π) = cosθ</p>
                  <p className="pl-4">tan(θ + π) = tanθ</p>

                  <p className="mt-3"><strong>Complementary Angles:</strong></p>
                  <p className="pl-4">sin(90°-θ) = cosθ, cos(90°-θ) = sinθ</p>
                  <p className="pl-4">tan(90°-θ) = cotθ, cot(90°-θ) = tanθ</p>

                  <p className="mt-3"><strong>Sum and Difference:</strong></p>
                  <p className="pl-4">sin(A±B) = sinAcosB ± cosAsinB</p>
                  <p className="pl-4">cos(A±B) = cosAcosB ∓ sinAsinB</p>
                  <p className="pl-4">tan(A±B) = (tanA ± tanB)/(1 ∓ tanAtanB)</p>

                  <p className="mt-3"><strong>Double Angle:</strong></p>
                  <p className="pl-4">sin(2θ) = 2sinθcosθ</p>
                  <p className="pl-4">cos(2θ) = cos²θ - sin²θ = 2cos²θ - 1 = 1 - 2sin²θ</p>
                  <p className="pl-4">tan(2θ) = 2tanθ/(1 - tan²θ)</p>
                </div>
              </div>
            )}

            <div className="rounded-md border border-border bg-muted/30 p-3">
              <p className="text-xs text-muted-foreground">Legend:</p>
              <div className="flex items-center gap-4 mt-2 text-xs flex-wrap">
                <div className="flex items-center gap-1"><div className="w-3 h-0.5 bg-blue-500"></div><span>Unit Circle</span></div>
                <div className="flex items-center gap-1"><div className="w-3 h-0.5 bg-yellow-500"></div><span>Angle Line</span></div>
                <div className="flex items-center gap-1"><div className="w-2 h-2 bg-white rounded-full"></div><span>Point on Circle</span></div>
                <div className="flex items-center gap-1"><div className="w-3 h-0.5 bg-green-500"></div><span>sin(θ) Line</span></div>
                <div className="flex items-center gap-1"><div className="w-3 h-0.5 bg-red-500"></div><span>cos(θ) Line</span></div>
                <div className="flex items-center gap-1"><div className="w-3 h-0.5 bg-yellow-400"></div><span>tan(θ) Line</span></div>
                <div className="flex items-center gap-1"><div className="w-3 h-0.5 bg-green-500"></div><span>Sine Wave</span></div>
                <div className="flex items-center gap-1"><div className="w-3 h-0.5 bg-red-500"></div><span>Cosine Wave</span></div>
                <div className="flex items-center gap-1"><div className="w-3 h-0.5 bg-yellow-400"></div><span>Tangent Wave</span></div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Class11Trigonometry;
