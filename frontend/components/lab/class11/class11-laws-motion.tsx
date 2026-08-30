"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import * as THREE from "three";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Slider from "@/components/ui/slider";
import { isWebGLAvailable } from "@/lib/webgl";
import { createThreeScene, disposeThreeScene, bindResize, standardMaterial } from "@/components/lab/three-scene";

export const Class11LawsOfMotion: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [mass1, setMass1] = useState(2);
  const [mass2, setMass2] = useState(3);
  const [force, setForce] = useState(10);
  const [friction, setFriction] = useState(0.2);
  const [showForces, setShowForces] = useState(true);
  const [showTrajectory, setShowTrajectory] = useState(true);

  // Newton's Second Law: F = ma
  const acceleration1 = useMemo(() => {
    const netForce = force - friction * mass1 * 9.8;
    return netForce / mass1;
  }, [force, friction, mass1]);

  const acceleration2 = useMemo(() => {
    return force / mass2;
  }, [force, mass2]);

  const tension = useMemo(() => {
    // For pulley system approximation
    return (mass1 * mass2 * 9.8) / (mass1 + mass2);
  }, [mass1, mass2]);

  useEffect(() => {
    if (!mountRef.current || !isWebGLAvailable()) return;

    let ts: any = null;
    let unbind: (() => void) | null = null;
    let cancelled = false;

    async function init() {
      try {
        const { createThreeScene, bindResize } = await import("@/components/lab/three-scene");
        
        ts = createThreeScene(mountRef.current!, {
          cameraPosition: new THREE.Vector3(10, 12, 15),
          autoRotate: true,
          autoRotateSpeed: 0.2,
          background: 0x0f172a
        });
        
        unbind = bindResize(ts);

        // Create ground
        const groundGeo = new THREE.PlaneGeometry(40, 40);
        const groundMat = standardMaterial(0x1e293b, { roughness: 0.8 });
        const ground = new THREE.Mesh(groundGeo, groundMat);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -0.01;
        ground.receiveShadow = true;
        ts.group.add(ground);

        const grid = new THREE.GridHelper(40, 80, 0x334155, 0x1e293b);
        ts.group.add(grid);

        // Block 1 (horizontal motion with friction)
        const block1Group = new THREE.Group();
        const block1Geo = new THREE.BoxGeometry(mass1 * 0.8, 1, mass1 * 0.4);
        const block1Mat = standardMaterial(0xef4444, { emissive: 0xef4444, emissiveIntensity: 0.2 });
        const block1 = new THREE.Mesh(block1Geo, block1Mat);
        block1.castShadow = true;
        block1Group.add(block1);
        block1Group.position.set(0, 0.5, 0);
        ts.group.add(block1Group);

        // Block 2 (hanging)
        const block2Group = new THREE.Group();
        const block2Geo = new THREE.BoxGeometry(mass2 * 0.6, mass2 * 0.6, mass2 * 0.6);
        const block2Mat = standardMaterial(0x22c55e, { emissive: 0x22c55e, emissiveIntensity: 0.2 });
        const block2 = new THREE.Mesh(block2Geo, block2Mat);
        block2.castShadow = true;
        block2Group.add(block2);
        block2Group.position.set(0, 10, 0);
        ts.group.add(block2Group);

        // Pulley system
        const pulleyGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.3, 16);
        const pulleyMat = standardMaterial(0x6366f1, { metalness: 0.8 });
        const pulley = new THREE.Mesh(pulleyGeo, pulleyMat);
        pulley.position.set(0, 10, 0);
        pulley.rotation.x = Math.PI / 2;
        ts.group.add(pulley);

        // Rope
        let rope: THREE.Line | null = null;
        let forceArrow: THREE.ArrowHelper | null = null;
        let frictionArrow: THREE.ArrowHelper | null = null;
        let tensionArrow: THREE.ArrowHelper | null = null;
        let trajectoryLine: THREE.Line | null = null;

        // Normal force arrows
        const normalArrows: THREE.ArrowHelper[] = [];

        const startTime = performance.now();

        function updateScene() {
          if (!ts) return;

          // Clear previous objects
          if (rope) { ts.group.remove(rope); rope.geometry.dispose(); (rope.material as THREE.Material).dispose(); }
          if (forceArrow) ts.group.remove(forceArrow);
          if (frictionArrow) ts.group.remove(frictionArrow);
          if (tensionArrow) ts.group.remove(tensionArrow);
          if (trajectoryLine) {
            ts.group.remove(trajectoryLine);
            trajectoryLine.geometry.dispose();
            (trajectoryLine.material as THREE.Material).dispose();
            trajectoryLine = null;
          }
          normalArrows.forEach(arrow => ts.group.remove(arrow));
          normalArrows.length = 0;

          const elapsed = (performance.now() - startTime) / 1000;
          const t = elapsed % 5;

          // Animate blocks
          const pos1 = Math.min(8, 0.5 * acceleration1 * t * t);
          block1Group.position.x = pos1;
          block2Group.position.y = 10 - 0.5 * acceleration2 * t * t;

          // Update pulley and rope
          pulley.position.set(pos1, 10, 0);

          // Trajectory tracing for block 1: the path it sweeps over one full cycle
          if (showTrajectory) {
            const maxT = t === 0 ? 5 : t;
            const points: THREE.Vector3[] = [];
            const steps = 40;
            for (let s = 0; s <= steps; s++) {
              const tt = (s / steps) * maxT;
              const x = Math.min(8, 0.5 * acceleration1 * tt * tt);
              points.push(new THREE.Vector3(x, 0.5, 0));
            }
            const trajGeo = new THREE.BufferGeometry().setFromPoints(points);
            const trajMat = new THREE.LineDashedMaterial({
              color: 0x60a5fa,
              dashSize: 0.4,
              gapSize: 0.2,
              transparent: true,
              opacity: 0.7
            });
            trajectoryLine = new THREE.Line(trajGeo, trajMat);
            trajectoryLine.computeLineDistances();
            trajectoryLine.name = "trajectory";
            ts.group.add(trajectoryLine);
          }

          if (showTrajectory) {
            const ropePoints = [
              new THREE.Vector3(pos1, 10, 0),
              new THREE.Vector3(pos1, block2Group.position.y + mass2 * 0.3, 0)
            ];
            const ropeGeo = new THREE.BufferGeometry().setFromPoints(ropePoints);
            const ropeMat = new THREE.LineBasicMaterial({ color: 0xfbbf24, linewidth: 3 });
            rope = new THREE.Line(ropeGeo, ropeMat);
            ts.group.add(rope);
          }

          // Show forces
          if (showForces) {
            // Force arrow on block 1
            forceArrow = new THREE.ArrowHelper(
              new THREE.Vector3(1, 0, 0),
              new THREE.Vector3(pos1 - 0.5, 1, 0),
              force * 0.1,
              0xef4444
            );
            ts.group.add(forceArrow);

            // Friction arrow on block 1
            frictionArrow = new THREE.ArrowHelper(
              new THREE.Vector3(-1, 0, 0),
              new THREE.Vector3(pos1 - 0.5, 1, 0),
              friction * mass1 * 9.8 * 0.1,
              0x6366f1
            );
            ts.group.add(frictionArrow);

            // Tension arrow
            tensionArrow = new THREE.ArrowHelper(
              new THREE.Vector3(0, -1, 0),
              new THREE.Vector3(pos1, 10, 0),
              tension * 0.1,
              0x22c55e
            );
            ts.group.add(tensionArrow);

            // Normal force arrows
            const normalArrow1 = new THREE.ArrowHelper(
              new THREE.Vector3(0, 1, 0),
              new THREE.Vector3(pos1, 0.5, 0),
              mass1 * 9.8 * 0.1,
              0xfbbf24
            );
            ts.group.add(normalArrow1);
            normalArrows.push(normalArrow1);

            const normalArrow2 = new THREE.ArrowHelper(
              new THREE.Vector3(0, 1, 0),
              new THREE.Vector3(pos1, block2Group.position.y, 0),
              mass2 * 9.8 * 0.1,
              0xfbbf24
            );
            ts.group.add(normalArrow2);
            normalArrows.push(normalArrow2);
          }

          // Rotate pulley
          pulley.rotation.z += 0.05;

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
  }, [mass1, mass2, force, friction, showForces, showTrajectory]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Class 11 Laws of Motion: Newton's Laws</CardTitle>
        <CardDescription>
          Interactive 3D visualization of Newton's Three Laws of Motion with force analysis.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div ref={mountRef} className="w-full h-96 bg-gray-100 rounded-lg" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <Label>Mass 1 (kg)</Label>
              <Slider min={1} max={10} step={0.5} value={[mass1]} onValueChange={(v) => setMass1(v[0])} />
              <p className="text-sm text-gray-500">Current: {mass1} kg</p>
            </div>
            <div>
              <Label>Mass 2 (kg)</Label>
              <Slider min={1} max={10} step={0.5} value={[mass2]} onValueChange={(v) => setMass2(v[0])} />
              <p className="text-sm text-gray-500">Current: {mass2} kg</p>
            </div>
            <div>
              <Label>Applied Force (N)</Label>
              <Slider min={1} max={50} step={1} value={[force]} onValueChange={(v) => setForce(v[0])} />
              <p className="text-sm text-gray-500">Current: {force} N</p>
            </div>
            <div>
              <Label>Friction Coefficient μ</Label>
              <Slider min={0} max={0.5} step={0.05} value={[friction]} onValueChange={(v) => setFriction(v[0])} />
              <p className="text-sm text-gray-500">Current: {friction}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowForces(!showForces)}
                className={`px-3 py-2 rounded-md text-xs font-medium ${showForces ? 'bg-primary/20 text-primary' : 'bg-muted/50 text-muted-foreground'}`}
              >
                Forces: {showForces ? 'ON' : 'OFF'}
              </button>
              <button
                onClick={() => setShowTrajectory(!showTrajectory)}
                className={`px-3 py-2 rounded-md text-xs font-medium ${showTrajectory ? 'bg-primary/20 text-primary' : 'bg-muted/50 text-muted-foreground'}`}
              >
                Rope: {showTrajectory ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-md border border-border bg-muted/30 p-3 text-sm space-y-2">
              <p><span className="font-semibold">Calculations (Class 11):</span></p>
              <p className="text-red-600">Block 1: a₁ = (F - μmg)/m = {acceleration1.toFixed(2)} m/s²</p>
              <p className="text-green-600">Block 2: a₂ = F/m = {acceleration2.toFixed(2)} m/s²</p>
              <p className="text-blue-600">Tension: T = (m₁m₂g)/(m₁+m₂) = {tension.toFixed(2)} N</p>
            </div>

            <div>
              <h3 className="font-semibold">Newton's Three Laws</h3>
              <div className="text-sm mt-2 space-y-4">
                <div>
                  <p className="font-medium text-primary">First Law (Law of Inertia):</p>
                  <p className="pl-4">A body continues in its state of rest or uniform motion unless acted upon by an external force.</p>
                  <p className="pl-4 text-xs text-muted-foreground">Inertia: Resistance to change in motion. Mass is a measure of inertia.</p>
                </div>
                <div>
                  <p className="font-medium text-primary">Second Law (F = ma):</p>
                  <p className="pl-4">Force is directly proportional to acceleration and mass: <strong>F = ma</strong></p>
                  <p className="pl-4 text-xs text-muted-foreground">1 N = 1 kg·m/s²</p>
                </div>
                <div>
                  <p className="font-medium text-primary">Third Law (Action-Reaction):</p>
                  <p className="pl-4">For every action, there is an equal and opposite reaction.</p>
                  <p className="pl-4 text-xs text-muted-foreground">Example: Normal force = Weight (when at rest)</p>
                </div>
              </div>
            </div>

            <div className="rounded-md border border-border bg-muted/30 p-3">
              <p className="text-xs text-muted-foreground">Legend:</p>
              <div className="flex items-center gap-4 mt-2 text-xs flex-wrap">
                <div className="flex items-center gap-1"><div className="w-3 h-3 bg-red-500"></div><span>Block 1</span></div>
                <div className="flex items-center gap-1"><div className="w-3 h-3 bg-green-500"></div><span>Block 2</span></div>
                <div className="flex items-center gap-1"><div className="w-3 h-3 bg-blue-500"></div><span>Pulley</span></div>
                <div className="flex items-center gap-1"><div className="w-3 h-0.5 bg-yellow-400"></div><span>Rope</span></div>
                <div className="flex items-center gap-1"><div className="w-3 h-0.5 bg-red-500"></div><span>Applied Force</span></div>
                <div className="flex items-center gap-1"><div className="w-3 h-0.5 bg-blue-500"></div><span>Friction</span></div>
                <div className="flex items-center gap-1"><div className="w-3 h-0.5 bg-orange-500"></div><span>Tension</span></div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Class11LawsOfMotion;
