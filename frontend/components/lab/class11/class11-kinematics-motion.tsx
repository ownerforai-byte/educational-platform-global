"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import * as THREE from "three";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Slider from "@/components/ui/slider";
import { isWebGLAvailable } from "@/lib/webgl";
import { createThreeScene, disposeThreeScene, bindResize, clearGroup, standardMaterial } from "@/components/lab/three-scene";

export const Class11KinematicsMotion: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [initialVelocity, setInitialVelocity] = useState(10);
  const [acceleration, setAcceleration] = useState(2);
  const [time, setTime] = useState(5);
  const [showPath, setShowPath] = useState(true);
  const [showVectors, setShowVectors] = useState(true);

  // Calculate derived quantities
  const displacement = useMemo(() => {
    return initialVelocity * time + 0.5 * acceleration * time * time;
  }, [initialVelocity, acceleration, time]);

  const finalVelocity = useMemo(() => {
    return initialVelocity + acceleration * time;
  }, [initialVelocity, acceleration, time]);

  const averageVelocity = useMemo(() => {
    return displacement / time;
  }, [displacement, time]);

  useEffect(() => {
    if (!mountRef.current || !isWebGLAvailable()) return;

    let ts: any = null;
    let unbind: (() => void) | null = null;
    let cancelled = false;

    async function init() {
      try {
        const { createThreeScene, bindResize } = await import("@/components/lab/three-scene");
        
        ts = createThreeScene(mountRef.current!, {
          cameraPosition: new THREE.Vector3(15, 10, 20),
          autoRotate: true,
          autoRotateSpeed: 0.3,
          background: 0x0f172a
        });
        
        unbind = bindResize(ts);

        // Create ground plane
        const groundGeo = new THREE.PlaneGeometry(30, 30);
        const groundMat = new THREE.MeshStandardMaterial({ 
          color: 0x1e293b, 
          roughness: 0.8, 
          metalness: 0.2 
        });
        const ground = new THREE.Mesh(groundGeo, groundMat);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -0.01;
        ground.receiveShadow = true;
        ts.group.add(ground);

        // Create grid helper
        const grid = new THREE.GridHelper(30, 60, 0x334155, 0x1e293b);
        ts.group.add(grid);

        // Create axes helper
        const axes = new THREE.AxesHelper(10);
        ts.group.add(axes);

        // Create moving object (car-like)
        const carGroup = new THREE.Group();
        const carBodyGeo = new THREE.BoxGeometry(2, 0.8, 1);
        const carBodyMat = standardMaterial(0xef4444, { emissive: 0xef4444, emissiveIntensity: 0.2 });
        const carBody = new THREE.Mesh(carBodyGeo, carBodyMat);
        carBody.castShadow = true;
        carGroup.add(carBody);

        // Car wheels
        const wheelGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.4, 16);
        const wheelMat = standardMaterial(0x22c55e);
        const wheel1 = new THREE.Mesh(wheelGeo, wheelMat);
        wheel1.position.set(-0.6, -0.2, 0.5);
        wheel1.rotation.z = Math.PI / 2;
        carGroup.add(wheel1);

        const wheel2 = new THREE.Mesh(wheelGeo, wheelMat);
        wheel2.position.set(0.6, -0.2, 0.5);
        wheel2.rotation.z = Math.PI / 2;
        carGroup.add(wheel2);

        const wheel3 = new THREE.Mesh(wheelGeo, wheelMat);
        wheel3.position.set(-0.6, -0.2, -0.5);
        wheel3.rotation.z = Math.PI / 2;
        carGroup.add(wheel3);

        const wheel4 = new THREE.Mesh(wheelGeo, wheelMat);
        wheel4.position.set(0.6, -0.2, -0.5);
        wheel4.rotation.z = Math.PI / 2;
        carGroup.add(wheel4);

        ts.group.add(carGroup);

        // Path line
        let pathLine: THREE.Line | null = null;
        let velocityArrow: THREE.ArrowHelper | null = null;
        let accelerationArrow: THREE.ArrowHelper | null = null;
        let startPoint: THREE.Mesh | null = null;
        let endPoint: THREE.Mesh | null = null;

        // Position markers
        const startGeo = new THREE.SphereGeometry(0.3, 16, 16);
        const startMat = standardMaterial(0xfbbf24, { emissive: 0xfbbf24, emissiveIntensity: 0.5 });
        startPoint = new THREE.Mesh(startGeo, startMat);
        startPoint.position.set(0, 0, 0);
        ts.group.add(startPoint);

        const endGeo = new THREE.SphereGeometry(0.3, 16, 16);
        const endMat = standardMaterial(0x22c55e, { emissive: 0x22c55e, emissiveIntensity: 0.5 });
        endPoint = new THREE.Mesh(endGeo, endMat);
        ts.group.add(endPoint);

        // Distance marker
        const distanceGeo = new THREE.CylinderGeometry(0.1, 0.1, 1, 8);
        const distanceMat = standardMaterial(0x3b82f6, { emissive: 0x3b82f6, emissiveIntensity: 0.3 });
        const distanceMarker = new THREE.Mesh(distanceGeo, distanceMat);
        distanceMarker.position.y = 0.5;
        distanceMarker.visible = false;
        ts.group.add(distanceMarker);

        let startTime = performance.now();

        function updateScene() {
          if (!ts) return;

          // Clear existing path and arrows
          if (pathLine) {
            ts.group.remove(pathLine);
            pathLine.geometry.dispose();
            (pathLine.material as THREE.Material).dispose();
          }
          if (velocityArrow) { ts.group.remove(velocityArrow); }
          if (accelerationArrow) { ts.group.remove(accelerationArrow); }

          // Calculate positions based on kinematic equations
          const positions: THREE.Vector3[] = [];
          const steps = 50;
          const maxDisplacement = initialVelocity * time + 0.5 * acceleration * time * time;
          
          for (let i = 0; i <= steps; i++) {
            const t = (i / steps) * time;
            const x = initialVelocity * t + 0.5 * acceleration * t * t;
            positions.push(new THREE.Vector3(x, 0, 0));
          }

          // Create path line
          if (showPath) {
            const geometry = new THREE.BufferGeometry().setFromPoints(positions);
            const material = new THREE.LineBasicMaterial({ color: 0x3b82f6, linewidth: 2 });
            pathLine = new THREE.Line(geometry, material);
            ts.group.add(pathLine);
          }

          // Update end point position
          if (endPoint) {
            endPoint.position.x = maxDisplacement;
          }

          // Update distance marker
          if (distanceMarker) {
            distanceMarker.position.x = maxDisplacement / 2;
            distanceMarker.scale.y = maxDisplacement * 0.1;
            distanceMarker.visible = true;
          }

          // Update car position (animated)
          const elapsed = (performance.now() - startTime) / 1000;
          const animTime = elapsed % time;
          const animX = initialVelocity * animTime + 0.5 * acceleration * animTime * animTime;
          carGroup.position.x = animX;

          // Rotate wheels based on motion
          if (wheel1 && animTime > 0) {
            wheel1.rotation.x += 0.1;
            wheel2.rotation.x += 0.1;
            wheel3.rotation.x += 0.1;
            wheel4.rotation.x += 0.1;
          }

          // Add velocity and acceleration arrows at car position
          if (showVectors && carGroup) {
            const velValue = initialVelocity + acceleration * animTime;
            const accelValue = acceleration;
            
            const arrowScale = 0.5;
            velocityArrow = new THREE.ArrowHelper(
              new THREE.Vector3(1, 0, 0),
              carGroup.position,
              velValue * arrowScale,
              0x22c55e
            );
            ts.group.add(velocityArrow);

            accelerationArrow = new THREE.ArrowHelper(
              new THREE.Vector3(1, 0, 0),
              carGroup.position,
              accelValue * arrowScale,
              0xef4444
            );
            ts.group.add(accelerationArrow);
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
  }, [initialVelocity, acceleration, time, showPath, showVectors]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Class 11 Kinematics: Motion in a Straight Line</CardTitle>
        <CardDescription>
          Interactive 3D motion graphics showing kinematic equations in action.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div ref={mountRef} className="w-full h-96 bg-gray-100 rounded-lg" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <Label>Initial Velocity u (m/s)</Label>
              <Slider
                min={0}
                max={20}
                step={0.5}
                value={[initialVelocity]}
                onValueChange={(v) => setInitialVelocity(v[0])}
              />
              <p className="text-sm text-gray-500">Current: {initialVelocity} m/s</p>
            </div>
            <div>
              <Label>Acceleration a (m/s²)</Label>
              <Slider
                min={-5}
                max={5}
                step={0.1}
                value={[acceleration]}
                onValueChange={(v) => setAcceleration(v[0])}
              />
              <p className="text-sm text-gray-500">Current: {acceleration} m/s²</p>
            </div>
            <div>
              <Label>Time t (s)</Label>
              <Slider
                min={1}
                max={10}
                step={0.5}
                value={[time]}
                onValueChange={(v) => setTime(v[0])}
              />
              <p className="text-sm text-gray-500">Current: {time} s</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowPath(!showPath)}
                className={`px-3 py-2 rounded-md text-xs font-medium ${showPath ? 'bg-primary/20 text-primary' : 'bg-muted/50 text-muted-foreground'}`}
              >
                Path: {showPath ? 'ON' : 'OFF'}
              </button>
              <button
                onClick={() => setShowVectors(!showVectors)}
                className={`px-3 py-2 rounded-md text-xs font-medium ${showVectors ? 'bg-primary/20 text-primary' : 'bg-muted/50 text-muted-foreground'}`}
              >
                Vectors: {showVectors ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-md border border-border bg-muted/30 p-3 text-sm space-y-2">
              <p><span className="font-semibold">Kinematic Equations (Class 11):</span></p>
              <p className="text-green-600">v = u + at = {finalVelocity.toFixed(2)} m/s</p>
              <p className="text-blue-600">s = ut + ½at² = {displacement.toFixed(2)} m</p>
              <p className="text-purple-600">v_avg = s/t = {averageVelocity.toFixed(2)} m/s</p>
              <p className="text-yellow-600">v² = u² + 2as</p>
            </div>

            <div>
              <h3 className="font-semibold">Theory</h3>
              <p className="text-sm mt-2">
                Kinematics deals with motion without considering forces. 
                A body in straight-line motion with constant acceleration follows these equations:
              </p>
              <ul className="text-sm mt-2 list-disc pl-5 space-y-1">
                <li><strong>First equation:</strong> v = u + at (velocity-time relation)</li>
                <li><strong>Second equation:</strong> s = ut + ½at² (position-time relation)</li>
                <li><strong>Third equation:</strong> v² = u² + 2as (velocity-position relation)</li>
                <li><strong>Graph interpretation:</strong> v-t graph slope = acceleration; s-t graph slope = velocity</li>
              </ul>
            </div>

            <div className="rounded-md border border-border bg-muted/30 p-3">
              <p className="text-xs text-muted-foreground">Legend:</p>
              <div className="flex items-center gap-4 mt-2 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span>Moving Car</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <span>Start Point</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>End Point</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-0.5 bg-blue-500"></div>
                  <span>Path</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-0.5 bg-green-500"></div>
                  <span>Velocity Vector</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-0.5 bg-red-500"></div>
                  <span>Acceleration Vector</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Class11KinematicsMotion;
