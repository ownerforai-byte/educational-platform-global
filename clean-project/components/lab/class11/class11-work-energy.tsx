"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import * as THREE from "three";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Slider from "@/components/ui/slider";
import { isWebGLAvailable } from "@/lib/webgl";
import { createThreeScene, disposeThreeScene, bindResize, standardMaterial } from "@/components/lab/three-scene";

export const Class11WorkEnergy: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [mass, setMass] = useState(2);
  const [height, setHeight] = useState(5);
  const [velocity, setVelocity] = useState(4);
  const [springConstant, setSpringConstant] = useState(100);
  const [compression, setCompression] = useState(0.5);
  const [showWork, setShowWork] = useState(true);

  // Calculated quantities
  const gravitationalPE = useMemo(() => mass * 9.8 * height, [mass, height]);
  const kineticEnergy = useMemo(() => 0.5 * mass * velocity * velocity, [mass, velocity]);
  const springPE = useMemo(() => 0.5 * springConstant * compression * compression, [springConstant, compression]);
  const totalEnergy = useMemo(() => gravitationalPE + kineticEnergy + springPE, [gravitationalPE, kineticEnergy, springPE]);

  useEffect(() => {
    if (!mountRef.current || !isWebGLAvailable()) return;

    let ts: any = null;
    let unbind: (() => void) | null = null;
    let cancelled = false;

    async function init() {
      try {
        const { createThreeScene, bindResize } = await import("@/components/lab/three-scene");
        
        ts = createThreeScene(mountRef.current!, {
          cameraPosition: new THREE.Vector3(12, 12, 15),
          autoRotate: true,
          autoRotateSpeed: 0.25,
          background: 0x0f172a
        });
        
        unbind = bindResize(ts);

        // Ground
        const groundGeo = new THREE.PlaneGeometry(30, 30);
        const groundMat = standardMaterial(0x1e293b, { roughness: 0.8 });
        const ground = new THREE.Mesh(groundGeo, groundMat);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -0.01;
        ground.receiveShadow = true;
        ts.group.add(ground);

        const grid = new THREE.GridHelper(30, 60, 0x334155, 0x1e293b);
        ts.group.add(grid);

        // Platform at height
        const platformGeo = new THREE.BoxGeometry(8, 0.3, 8);
        const platformMat = standardMaterial(0x6366f1, { metalness: 0.3 });
        const platform = new THREE.Mesh(platformGeo, platformMat);
        platform.position.y = height;
        platform.receiveShadow = true;
        ts.group.add(platform);

        // Mass (ball)
        const ballGroup = new THREE.Group();
        const ballGeo = new THREE.SphereGeometry(0.5, 32, 32);
        const ballMat = standardMaterial(0xef4444, { emissive: 0xef4444, emissiveIntensity: 0.3 });
        const ball = new THREE.Mesh(ballGeo, ballMat);
        ball.castShadow = true;
        ballGroup.add(ball);
        ballGroup.position.set(0, height + 0.5, 0);
        ts.group.add(ballGroup);

        // Spring
        const springGroup = new THREE.Group();
        const springGeo = new THREE.CylinderGeometry(0.2, 0.2, compression, 32);
        const springMat = standardMaterial(0x22c55e, { metalness: 0.5 });
        const spring = new THREE.Mesh(springGeo, springMat);
        spring.castShadow = true;
        springGroup.add(spring);
        springGroup.position.set(5, 0.5, 0);
        ts.group.add(springGroup);

        // Base for spring
        const baseGeo = new THREE.BoxGeometry(3, 0.2, 3);
        const baseMat = standardMaterial(0xfbbf24, { metalness: 0.4 });
        const base = new THREE.Mesh(baseGeo, baseMat);
        base.position.set(5, 0.1, 0);
        ts.group.add(base);

        // Energy visualization bars
        const barWidth = 0.5;
        const barHeightPE = gravitationalPE * 0.1;
        const barHeightKE = kineticEnergy * 0.1;
        const barHeightSpring = springPE * 0.1;

        // PE bar
        const peBarGeo = new THREE.BoxGeometry(barWidth, barHeightPE, barWidth);
        const peBarMat = standardMaterial(0x3b82f6, { transparent: true, opacity: 0.8 });
        const peBar = new THREE.Mesh(peBarGeo, peBarMat);
        peBar.position.set(-6, barHeightPE / 2, 0);
        ts.group.add(peBar);

        // KE bar
        const keBarGeo = new THREE.BoxGeometry(barWidth, barHeightKE, barWidth);
        const keBarMat = standardMaterial(0x22c55e, { transparent: true, opacity: 0.8 });
        const keBar = new THREE.Mesh(keBarGeo, keBarMat);
        keBar.position.set(-3, barHeightKE / 2, 0);
        ts.group.add(keBar);

        // Spring PE bar
        const springBarGeo = new THREE.BoxGeometry(barWidth, barHeightSpring, barWidth);
        const springBarMat = standardMaterial(0xfbbf24, { transparent: true, opacity: 0.8 });
        const springBar = new THREE.Mesh(springBarGeo, springBarMat);
        springBar.position.set(0, barHeightSpring / 2, 0);
        ts.group.add(springBar);

        // Energy labels as sprites
        let peLabel: THREE.Sprite | null = null;
        let keLabel: THREE.Sprite | null = null;
        let springLabel: THREE.Sprite | null = null;

        let startTime = performance.now();
        let falling = false;
        let fallStartTime = 0;
        let ballOriginalY = height + 0.5;

        function updateScene() {
          if (!ts) return;

          const elapsed = (performance.now() - startTime) / 1000;
          
          // Animate ball falling and bouncing
          if (elapsed > 2 && !falling) {
            falling = true;
            fallStartTime = elapsed;
          }

          if (falling) {
            const fallTime = elapsed - fallStartTime;
            const fallHeight = 0.5 * 9.8 * fallTime * fallTime;
            if (ballGroup.position.y > 0.5) {
              ballGroup.position.y = ballOriginalY - fallHeight;
            } else {
              // Bounce
              ballGroup.position.y = 0.5 + Math.abs(Math.sin(elapsed * 10)) * 2;
            }
          }

          // Animate spring compression
          spring.scale.y = compression;
          spring.position.y = 0.1 + compression / 2;

          // Rotate ball
          ballGroup.rotation.y += 0.02;

          // Update energy bars
          peBar.scale.y = gravitationalPE * 0.1;
          peBar.position.y = peBar.scale.y / 2;
          
          keBar.scale.y = kineticEnergy * 0.1;
          keBar.position.y = keBar.scale.y / 2;
          
          springBar.scale.y = springPE * 0.1;
          springBar.position.y = springBar.scale.y / 2;

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
  }, [mass, height, velocity, springConstant, compression, showWork]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Class 11 Work, Energy and Power</CardTitle>
        <CardDescription>
          Interactive 3D visualization of work-energy theorem and conservation of energy.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div ref={mountRef} className="w-full h-96 bg-gray-100 rounded-lg" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <Label>Mass m (kg)</Label>
              <Slider min={1} max={10} step={0.5} value={[mass]} onValueChange={(v) => setMass(v[0])} />
              <p className="text-sm text-gray-500">Current: {mass} kg</p>
            </div>
            <div>
              <Label>Height h (m)</Label>
              <Slider min={1} max={15} step={0.5} value={[height]} onValueChange={(v) => setHeight(v[0])} />
              <p className="text-sm text-gray-500">Current: {height} m</p>
            </div>
            <div>
              <Label>Velocity v (m/s)</Label>
              <Slider min={0} max={10} step={0.5} value={[velocity]} onValueChange={(v) => setVelocity(v[0])} />
              <p className="text-sm text-gray-500">Current: {velocity} m/s</p>
            </div>
            <div>
              <Label>Spring Constant k (N/m)</Label>
              <Slider min={10} max={500} step={10} value={[springConstant]} onValueChange={(v) => setSpringConstant(v[0])} />
              <p className="text-sm text-gray-500">Current: {springConstant} N/m</p>
            </div>
            <div>
              <Label>Compression x (m)</Label>
              <Slider min={0} max={1} step={0.05} value={[compression]} onValueChange={(v) => setCompression(v[0])} />
              <p className="text-sm text-gray-500">Current: {compression} m</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowWork(!showWork)}
                className={`px-3 py-2 rounded-md text-xs font-medium ${showWork ? 'bg-primary/20 text-primary' : 'bg-muted/50 text-muted-foreground'}`}
              >
                Energy Bars: {showWork ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-md border border-border bg-muted/30 p-3 text-sm space-y-2">
              <p><span className="font-semibold">Energy Calculations:</span></p>
              <p className="text-blue-600">Potential Energy: PE = mgh = {gravitationalPE.toFixed(2)} J</p>
              <p className="text-green-600">Kinetic Energy: KE = ½mv² = {kineticEnergy.toFixed(2)} J</p>
              <p className="text-yellow-600">Spring Energy: SE = ½kx² = {springPE.toFixed(2)} J</p>
              <p className="text-purple-600 font-semibold">Total Energy: {totalEnergy.toFixed(2)} J</p>
            </div>

            <div>
              <h3 className="font-semibold">Work-Energy Theorem</h3>
              <p className="text-sm mt-2">
                The work done by all forces (conservative and non-conservative) on a body equals the change in its kinetic energy.
              </p>
              <div className="text-sm mt-3 space-y-2">
                <p><strong>Work Done:</strong> W = F·s·cosθ</p>
                <p><strong>Potential Energy:</strong> PE = mgh (gravitational)</p>
                <p><strong>Kinetic Energy:</strong> KE = ½mv²</p>
                <p><strong>Spring Energy:</strong> SE = ½kx²</p>
                <p><strong>Conservation:</strong> Total mechanical energy is conserved when only conservative forces act.</p>
                <p><strong>Power:</strong> P = W/t = F·v</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold">Key Concepts</h3>
              <ul className="text-sm mt-2 list-disc pl-5 space-y-1">
                <li><strong>Work:</strong> Transfer of energy when force acts through a displacement</li>
                <li><strong>Positive Work:</strong> Force and displacement in same direction</li>
                <li><strong>Negative Work:</strong> Force and displacement in opposite directions</li>
                <li><strong>Conservative Forces:</strong> Work done is independent of path (gravity, spring)</li>
                <li><strong>Non-conservative Forces:</strong> Work done depends on path (friction)</li>
                <li><strong>Energy Conservation:</strong> Energy cannot be created or destroyed, only transformed</li>
              </ul>
            </div>

            <div className="rounded-md border border-border bg-muted/30 p-3">
              <p className="text-xs text-muted-foreground">Legend:</p>
              <div className="flex items-center gap-4 mt-2 text-xs flex-wrap">
                <div className="flex items-center gap-1"><div className="w-3 h-3 bg-red-500 rounded-full"></div><span>Mass (Ball)</span></div>
                <div className="flex items-center gap-1"><div className="w-3 h-3 bg-blue-500"></div><span>Platform</span></div>
                <div className="flex items-center gap-1"><div className="w-3 h-3 bg-green-500"></div><span>Spring</span></div>
                <div className="flex items-center gap-1"><div className="w-3 h-3 bg-yellow-400"></div><span>Base</span></div>
                <div className="flex items-center gap-1"><div className="w-2 h-6 bg-blue-500"></div><span>PE Bar</span></div>
                <div className="flex items-center gap-1"><div className="w-2 h-6 bg-green-500"></div><span>KE Bar</span></div>
                <div className="flex items-center gap-1"><div className="w-2 h-6 bg-yellow-500"></div><span>Spring PE Bar</span></div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Class11WorkEnergy;
