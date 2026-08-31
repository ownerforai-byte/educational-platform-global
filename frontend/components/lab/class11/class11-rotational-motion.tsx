"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import * as THREE from "three";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Slider from "@/components/ui/slider";
import { isWebGLAvailable } from "@/lib/webgl";
import { disposeThreeScene, standardMaterial } from "@/components/lab/three-scene";

export const Class11RotationalMotion: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [radius, setRadius] = useState(3);
  const [angularVelocity, setAngularVelocity] = useState(2);
  const [mass, setMass] = useState(1);
  const [showVectors, setShowVectors] = useState(true);
  const [showTorque, setShowTorque] = useState(true);

  // Calculated quantities
  const linearVelocity = useMemo(() => radius * angularVelocity, [radius, angularVelocity]);
  const centripetalAcceleration = useMemo(() => radius * angularVelocity * angularVelocity, [radius, angularVelocity]);
  const centripetalForce = useMemo(() => mass * centripetalAcceleration, [mass, centripetalAcceleration]);
  const period = useMemo(() => (2 * Math.PI) / angularVelocity, [angularVelocity]);
  const frequency = useMemo(() => angularVelocity / (2 * Math.PI), [angularVelocity]);
  const momentOfInertia = useMemo(() => mass * radius * radius, [mass, radius]);

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
          autoRotate: true,
          autoRotateSpeed: 0.3,
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

        // Central pivot
        const pivotGeo = new THREE.CylinderGeometry(0.3, 0.3, 1, 16);
        const pivotMat = standardMaterial(0xfbbf24, { metalness: 0.8, emissive: 0xfbbf24, emissiveIntensity: 0.3 });
        const pivot = new THREE.Mesh(pivotGeo, pivotMat);
        pivot.position.y = 0.5;
        pivot.castShadow = true;
        ts.group.add(pivot);

        // Rotating arm
        const armGroup = new THREE.Group();
        const armGeo = new THREE.CylinderGeometry(0.1, 0.1, radius, 16);
        const armMat = standardMaterial(0x6366f1, { metalness: 0.5 });
        const arm = new THREE.Mesh(armGeo, armMat);
        arm.rotation.x = Math.PI / 2;
        arm.castShadow = true;
        armGroup.add(arm);
        armGroup.position.y = 0.5;
        ts.group.add(armGroup);

        // Mass at the end
        const massGroup = new THREE.Group();
        const massGeo = new THREE.SphereGeometry(mass * 0.3, 16, 16);
        const massMat = standardMaterial(0xef4444, { emissive: 0xef4444, emissiveIntensity: 0.3 });
        const massObj = new THREE.Mesh(massGeo, massMat);
        massObj.castShadow = true;
        massGroup.add(massObj);
        massGroup.position.x = radius;
        armGroup.add(massGroup);

        // Circular path
        let pathCircle: THREE.Line | null = null;
        let velocityArrow: THREE.ArrowHelper | null = null;
        let accelerationArrow: THREE.ArrowHelper | null = null;
        let forceArrow: THREE.ArrowHelper | null = null;
        let radiusArrow: THREE.ArrowHelper | null = null;

        const startTime = performance.now();

        function updateScene() {
          if (!ts) return;

          // Clear previous objects
          if (pathCircle) { ts.group.remove(pathCircle); pathCircle.geometry.dispose(); }
          if (velocityArrow) ts.group.remove(velocityArrow);
          if (accelerationArrow) ts.group.remove(accelerationArrow);
          if (forceArrow) ts.group.remove(forceArrow);
          if (radiusArrow) ts.group.remove(radiusArrow);

          const elapsed = (performance.now() - startTime) / 1000;
          const angle = elapsed * angularVelocity;

          // Rotate arm
          armGroup.rotation.z = angle;

          // Create circular path
          const points: THREE.Vector3[] = [];
          const steps = 64;
          for (let i = 0; i <= steps; i++) {
            const theta = (i / steps) * Math.PI * 2;
            points.push(new THREE.Vector3(radius * Math.cos(theta), 0.5, radius * Math.sin(theta)));
          }
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          const material = new THREE.LineBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.5 });
          pathCircle = new THREE.Line(geometry, material);
          ts.group.add(pathCircle);

          // Current position
          const x = radius * Math.cos(angle);
          const z = radius * Math.sin(angle);

          // Velocity vector (tangential)
          if (showVectors) {
            const velX = -Math.sin(angle);
            const velZ = Math.cos(angle);
            velocityArrow = new THREE.ArrowHelper(
              new THREE.Vector3(velX, 0, velZ),
              new THREE.Vector3(x, 0.5, z),
              linearVelocity * 0.3,
              0x22c55e
            );
            ts.group.add(velocityArrow);

            // Acceleration vector (centripetal, towards center)
            const accX = -x / radius;
            const accZ = -z / radius;
            accelerationArrow = new THREE.ArrowHelper(
              new THREE.Vector3(accX, 0, accZ),
              new THREE.Vector3(x, 0.5, z),
              centripetalAcceleration * 0.3,
              0xef4444
            );
            ts.group.add(accelerationArrow);

            // Force vector
            if (showTorque) {
              forceArrow = new THREE.ArrowHelper(
                new THREE.Vector3(accX, 0, accZ),
                new THREE.Vector3(x, 0.5, z),
                centripetalForce * 0.03,
                0xfbbf24
              );
              ts.group.add(forceArrow);

              // Radius vector
              radiusArrow = new THREE.ArrowHelper(
                new THREE.Vector3(-x, 0, -z),
                new THREE.Vector3(0, 0.5, 0),
                radius,
                0xffffff
              );
              ts.group.add(radiusArrow);
            }
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
        } catch {}
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [radius, angularVelocity, mass, showVectors, showTorque]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Class 11 Rotational Motion</CardTitle>
        <CardDescription>
          Interactive 3D visualization of circular motion, centripetal force, and angular kinematics.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div ref={mountRef} className="w-full h-96 bg-gray-100 rounded-lg" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <Label>Radius r (m)</Label>
              <Slider min={1} max={10} step={0.5} value={[radius]} onValueChange={(v) => setRadius(v[0])} />
              <p className="text-sm text-gray-500">Current: {radius} m</p>
            </div>
            <div>
              <Label>Angular Velocity ω (rad/s)</Label>
              <Slider min={0.5} max={5} step={0.1} value={[angularVelocity]} onValueChange={(v) => setAngularVelocity(v[0])} />
              <p className="text-sm text-gray-500">Current: {angularVelocity} rad/s</p>
            </div>
            <div>
              <Label>Mass m (kg)</Label>
              <Slider min={0.5} max={5} step={0.5} value={[mass]} onValueChange={(v) => setMass(v[0])} />
              <p className="text-sm text-gray-500">Current: {mass} kg</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowVectors(!showVectors)}
                className={`px-3 py-2 rounded-md text-xs font-medium ${showVectors ? 'bg-primary/20 text-primary' : 'bg-muted/50 text-muted-foreground'}`}
              >
                Vectors: {showVectors ? 'ON' : 'OFF'}
              </button>
              <button
                onClick={() => setShowTorque(!showTorque)}
                className={`px-3 py-2 rounded-md text-xs font-medium ${showTorque ? 'bg-primary/20 text-primary' : 'bg-muted/50 text-muted-foreground'}`}
              >
                Force: {showTorque ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-md border border-border bg-muted/30 p-3 text-sm space-y-2">
              <p><span className="font-semibold">Calculations (Class 11):</span></p>
              <p className="text-green-600">Linear Velocity: v = rω = {linearVelocity.toFixed(2)} m/s</p>
              <p className="text-red-600">Centripetal Accel: a_c = rω² = {centripetalAcceleration.toFixed(2)} m/s²</p>
              <p className="text-orange-600">Centripetal Force: F_c = ma_c = {centripetalForce.toFixed(2)} N</p>
              <p className="text-blue-600">Period: T = 2π/ω = {period.toFixed(2)} s</p>
              <p className="text-purple-600">Frequency: f = ω/2π = {frequency.toFixed(2)} Hz</p>
              <p className="text-yellow-600">Moment of Inertia: I = mr² = {momentOfInertia.toFixed(2)} kg·m²</p>
            </div>

            <div>
              <h3 className="font-semibold">Rotational Motion Concepts</h3>
              <p className="text-sm mt-2">
                In circular motion, a body moves along the circumference of a circle or circular path.
              </p>
              <div className="text-sm mt-3 space-y-2">
                <p><strong>Angular Displacement:</strong> θ = s/r (in radians)</p>
                <p><strong>Angular Velocity:</strong> ω = Δθ/Δt = v/r</p>
                <p><strong>Angular Acceleration:</strong> α = Δω/Δt</p>
                <p><strong>Relation:</strong> v = rω, a_t = rα</p>
                <p><strong>Centripetal Acceleration:</strong> a_c = v²/r = rω² (always towards center)</p>
                <p><strong>Centripetal Force:</strong> F_c = mv²/r = mω²r</p>
                <p><strong>Period:</strong> T = 2πr/v = 2π/ω</p>
                <p><strong>Frequency:</strong> f = 1/T = ω/2π</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold">Key Points</h3>
              <ul className="text-sm mt-2 list-disc pl-5 space-y-1">
                <li>Centripetal force is <strong>not</strong> a new type of force - it's the resultant of actual forces (tension, friction, gravity, etc.)</li>
                <li>Centripetal force acts <strong>towards</strong> the center of the circular path</li>
                <li>Without centripetal force, the body would move in a straight line (tangent to the circle)</li>
                <li>The velocity vector is always <strong>tangent</strong> to the circular path</li>
                <li>For uniform circular motion: speed is constant, but velocity is not (direction changes)</li>
                <li><strong>Banked Road:</strong> tanθ = v²/(rg) where θ is the banking angle</li>
                <li><strong>Death Well:</strong> Normal reaction provides centripetal force at different points</li>
              </ul>
            </div>

            <div className="rounded-md border border-border bg-muted/30 p-3">
              <p className="text-xs text-muted-foreground">Legend:</p>
              <div className="flex items-center gap-4 mt-2 text-xs flex-wrap">
                <div className="flex items-center gap-1"><div className="w-3 h-3 bg-yellow-400"></div><span>Pivot</span></div>
                <div className="flex items-center gap-1"><div className="w-3 h-1 bg-blue-500"></div><span>Arm</span></div>
                <div className="flex items-center gap-1"><div className="w-3 h-3 bg-red-500 rounded-full"></div><span>Mass</span></div>
                <div className="flex items-center gap-1"><div className="w-3 h-0.5 bg-blue-500"></div><span>Path</span></div>
                <div className="flex items-center gap-1"><div className="w-3 h-0.5 bg-green-500"></div><span>Velocity Vector</span></div>
                <div className="flex items-center gap-1"><div className="w-3 h-0.5 bg-red-500"></div><span>Centripetal Accel</span></div>
                <div className="flex items-center gap-1"><div className="w-3 h-0.5 bg-yellow-500"></div><span>Centripetal Force</span></div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Class11RotationalMotion;
