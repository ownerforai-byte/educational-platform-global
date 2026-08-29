"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import * as THREE from "three";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Slider from "@/components/ui/slider";
import { isWebGLAvailable } from "@/lib/webgl";
import { createThreeScene, disposeThreeScene, bindResize, standardMaterial } from "@/components/lab/three-scene";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Class11KinematicsMotionEnhanced: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [initialVelocity, setInitialVelocity] = useState(10);
  const [acceleration, setAcceleration] = useState(2);
  const [time, setTime] = useState(5);
  const [showPath, setShowPath] = useState(true);
  const [showVectors, setShowVectors] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const [showTheory, setShowTheory] = useState(false);

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
          cameraPosition: new THREE.Vector3(25, 15, 25),
          autoRotate: true,
          autoRotateSpeed: 0.3,
          background: 0x0f172a
        });
        
        unbind = bindResize(ts);

        // Create ground plane
        const groundGeo = new THREE.PlaneGeometry(50, 50);
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
        const grid = new THREE.GridHelper(50, 100, 0x334155, 0x1e293b);
        ts.group.add(grid);

        // Create axes helper
        const axes = new THREE.AxesHelper(15);
        ts.group.add(axes);

        // LABELLED COMPONENTS
        // Create origin point (labeled)
        const originGeo = new THREE.SphereGeometry(0.4, 16, 16);
        const originMat = standardMaterial(0xfbbf24, { emissive: 0xfbbf24, emissiveIntensity: 0.5 });
        const origin = new THREE.Mesh(originGeo, originMat);
        origin.position.set(0, 0, 0);
        ts.group.add(origin);

        // Create moving object (car with labelled parts)
        const carGroup = new THREE.Group();
        
        // Car body
        const carBodyGeo = new THREE.BoxGeometry(2.5, 1, 1.2);
        const carBodyMat = standardMaterial(0xef4444, { emissive: 0xef4444, emissiveIntensity: 0.2 });
        const carBody = new THREE.Mesh(carBodyGeo, carBodyMat);
        carBody.castShadow = true;
        carGroup.add(carBody);

        // Car wheels (labelled)
        const wheelGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.5, 16);
        const wheelMat = standardMaterial(0x22c55e);
        
        const wheel1 = new THREE.Mesh(wheelGeo, wheelMat);
        wheel1.position.set(-0.8, -0.3, 0.6);
        wheel1.rotation.z = Math.PI / 2;
        carGroup.add(wheel1);

        const wheel2 = new THREE.Mesh(wheelGeo, wheelMat);
        wheel2.position.set(0.8, -0.3, 0.6);
        wheel2.rotation.z = Math.PI / 2;
        carGroup.add(wheel2);

        const wheel3 = new THREE.Mesh(wheelGeo, wheelMat);
        wheel3.position.set(-0.8, -0.3, -0.6);
        wheel3.rotation.z = Math.PI / 2;
        carGroup.add(wheel3);

        const wheel4 = new THREE.Mesh(wheelGeo, wheelMat);
        wheel4.position.set(0.8, -0.3, -0.6);
        wheel4.rotation.z = Math.PI / 2;
        carGroup.add(wheel4);

        // Car front (labelled)
        const frontGeo = new THREE.BoxGeometry(0.4, 0.6, 0.8);
        const frontMat = standardMaterial(0x3b82f6, { emissive: 0x3b82f6, emissiveIntensity: 0.3 });
        const front = new THREE.Mesh(frontGeo, frontMat);
        front.position.set(1.4, 0, 0);
        carGroup.add(front);

        ts.group.add(carGroup);

        // End point (labeled)
        const endGeo = new THREE.SphereGeometry(0.4, 16, 16);
        const endMat = standardMaterial(0x22c55e, { emissive: 0x22c55e, emissiveIntensity: 0.5 });
        const endPoint = new THREE.Mesh(endGeo, endMat);
        endPoint.position.set(0, 0, 0);
        ts.group.add(endPoint);

        // Path line
        let pathLine: THREE.Line | null = null;
        let velocityArrow: THREE.ArrowHelper | null = null;
        let accelerationArrow: THREE.ArrowHelper | null = null;

        // Distance marker (labelled)
        const distanceGeo = new THREE.CylinderGeometry(0.12, 0.12, 1, 8);
        const distanceMat = standardMaterial(0x3b82f6, { emissive: 0x3b82f6, emissiveIntensity: 0.3 });
        const distanceMarker = new THREE.Mesh(distanceGeo, distanceMat);
        distanceMarker.position.y = 0.5;
        distanceMarker.visible = false;
        ts.group.add(distanceMarker);

        // LABEL OBJECTS (Using CSS2DRenderer for text labels)
        let labelRenderer: any = null;
        let labels: any[] = [];

        try {
          const { CSS2DRenderer, CSS2DObject } = await import("three/addons/renderers/CSS2DRenderer.js");
          
          labelRenderer = new CSS2DRenderer();
          labelRenderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
          labelRenderer.domElement.style.position = "absolute";
          labelRenderer.domElement.style.top = "0";
          labelRenderer.domElement.style.pointerEvents = "none";
          labelRenderer.domElement.style.color = "white";
          mountRef.current.appendChild(labelRenderer.domElement);

          // Create labels for components
          const originLabel = new CSS2DObject(document.createElement("div"));
          originLabel.element.className = "label";
          originLabel.element.textContent = "Origin (O)";
          originLabel.element.style.backgroundColor = "rgba(0,0,0,0.7)";
          originLabel.element.style.padding = "4px 8px";
          originLabel.element.style.borderRadius = "4px";
          originLabel.element.style.color = "#fbbf24";
          originLabel.position.set(0, 0.8, 0);
          ts.group.add(originLabel);
          labels.push(originLabel);

          const carLabel = new CSS2DObject(document.createElement("div"));
          carLabel.element.className = "label";
          carLabel.element.textContent = "Moving Body";
          carLabel.element.style.backgroundColor = "rgba(0,0,0,0.7)";
          carLabel.element.style.padding = "4px 8px";
          carLabel.element.style.borderRadius = "4px";
          carLabel.element.style.color = "#ef4444";
          carLabel.position.set(0, 2, 0);
          carGroup.add(carLabel);
          labels.push(carLabel);

          const endLabel = new CSS2DObject(document.createElement("div"));
          endLabel.element.className = "label";
          endLabel.element.textContent = "Final Position (S)";
          endLabel.element.style.backgroundColor = "rgba(0,0,0,0.7)";
          endLabel.element.style.padding = "4px 8px";
          endLabel.element.style.borderRadius = "4px";
          endLabel.element.style.color = "#22c55e";
          endLabel.position.set(0, 0.8, 0);
          endPoint.add(endLabel);
          labels.push(endLabel);

          const pathLabel = new CSS2DObject(document.createElement("div"));
          pathLabel.element.className = "label";
          pathLabel.element.textContent = "Path of Motion";
          pathLabel.element.style.backgroundColor = "rgba(0,0,0,0.7)";
          pathLabel.element.style.padding = "4px 8px";
          pathLabel.element.style.borderRadius = "4px";
          pathLabel.element.style.color = "#3b82f6";
          pathLabel.position.set(10, 0.5, 0);
          ts.group.add(pathLabel);
          labels.push(pathLabel);

          const velocityLabel = new CSS2DObject(document.createElement("div"));
          velocityLabel.element.className = "label";
          velocityLabel.element.textContent = "Velocity Vector (v)";
          velocityLabel.element.style.backgroundColor = "rgba(0,0,0,0.7)";
          velocityLabel.element.style.padding = "4px 8px";
          velocityLabel.element.style.borderRadius = "4px";
          velocityLabel.element.style.color = "#22c55e";
          velocityLabel.position.set(0, 1, 0);
          velocityLabel.visible = false;
          ts.group.add(velocityLabel);
          labels.push(velocityLabel);

          const accelerationLabel = new CSS2DObject(document.createElement("div"));
          accelerationLabel.element.className = "label";
          accelerationLabel.element.textContent = "Acceleration Vector (a)";
          accelerationLabel.element.style.backgroundColor = "rgba(0,0,0,0.7)";
          accelerationLabel.element.style.padding = "4px 8px";
          accelerationLabel.element.style.borderRadius = "4px";
          accelerationLabel.element.style.color = "#ef4444";
          accelerationLabel.position.set(0, 1, 0);
          accelerationLabel.visible = false;
          ts.group.add(accelerationLabel);
          labels.push(accelerationLabel);

        } catch (e) {
          console.log("CSS2DRenderer not available, using fallback labels");
        }

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
          const steps = 100;
          const maxDisplacement = initialVelocity * time + 0.5 * acceleration * time * time;
          
          for (let i = 0; i <= steps; i++) {
            const t = (i / steps) * time;
            const x = initialVelocity * t + 0.5 * acceleration * t * t;
            positions.push(new THREE.Vector3(x, 0, 0));
          }

          // Create path line
          if (showPath) {
            const geometry = new THREE.BufferGeometry().setFromPoints(positions);
            const material = new THREE.LineBasicMaterial({ color: 0x3b82f6, linewidth: 3 });
            pathLine = new THREE.Line(geometry, material);
            ts.group.add(pathLine);
          }

          // Update end point position
          if (endPoint) {
            endPoint.position.x = maxDisplacement;
            if (labels[2]) {
              labels[2].position.x = maxDisplacement;
            }
          }

          // Update distance marker
          if (distanceMarker) {
            distanceMarker.position.x = maxDisplacement / 2;
            distanceMarker.scale.y = maxDisplacement * 0.08;
            distanceMarker.visible = true;
          }

          // Update car position (animated)
          const elapsed = (performance.now() - startTime) / 1000;
          const animTime = elapsed % time;
          const animX = initialVelocity * animTime + 0.5 * acceleration * animTime * animTime;
          carGroup.position.x = animX;

          // Rotate wheels based on motion
          if (wheel1 && animTime > 0) {
            wheel1.rotation.x += 0.15;
            wheel2.rotation.x += 0.15;
            wheel3.rotation.x += 0.15;
            wheel4.rotation.x += 0.15;
          }

          // Add velocity and acceleration arrows at car position
          if (showVectors && carGroup) {
            const velValue = initialVelocity + acceleration * animTime;
            const accelValue = acceleration;
            
            const arrowScale = 0.4;
            velocityArrow = new THREE.ArrowHelper(
              new THREE.Vector3(1, 0, 0),
              new THREE.Vector3(animX - 0.5, 1.5, 0),
              velValue * arrowScale,
              0x22c55e
            );
            ts.group.add(velocityArrow);

            accelerationArrow = new THREE.ArrowHelper(
              new THREE.Vector3(1, 0, 0),
              new THREE.Vector3(animX - 0.5, 1.5, 0),
              accelValue * arrowScale,
              0xef4444
            );
            ts.group.add(accelerationArrow);

            // Update label positions
            if (labels[4]) {
              labels[4].position.set(animX - 0.5, 2.5, 0);
              labels[4].visible = true;
            }
            if (labels[5]) {
              labels[5].position.set(animX - 0.5, 2.2, 0);
              labels[5].visible = true;
            }
          } else {
            if (labels[4]) labels[4].visible = false;
            if (labels[5]) labels[5].visible = false;
          }

          if (labels[3]) {
            labels[3].position.x = maxDisplacement / 2;
          }

          ts.controls.update();
          ts.renderer.render(ts.scene, ts.camera);
          if (labelRenderer) labelRenderer.render(ts.scene, ts.camera);
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
      // Cleanup labels
      if (mountRef.current) {
        const labelElements = mountRef.current.querySelectorAll(".label");
        labelElements.forEach(el => el.remove());
      }
    };
  }, [initialVelocity, acceleration, time, showPath, showVectors, showLabels]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Class 11 Kinematics: Motion in a Straight Line (Enhanced with Labels)</CardTitle>
        <CardDescription>
          Interactive 3D motion graphics showing kinematic equations in action with clearly labelled components.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div ref={mountRef} className="w-full h-96 bg-gray-100 rounded-lg" />

        <Tabs defaultValue="controls" className="w-full">
          <TabsList className="h-auto">
            <TabsTrigger value="controls">Controls</TabsTrigger>
            <TabsTrigger value="calculations">Calculations</TabsTrigger>
            <TabsTrigger value="theory">Theory</TabsTrigger>
            <TabsTrigger value="equations">Equations</TabsTrigger>
          </TabsList>

          <TabsContent value="controls" className="space-y-4">
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
                <div className="flex gap-2 flex-wrap">
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
                  <button
                    onClick={() => setShowLabels(!showLabels)}
                    className={`px-3 py-2 rounded-md text-xs font-medium ${showLabels ? 'bg-primary/20 text-primary' : 'bg-muted/50 text-muted-foreground'}`}
                  >
                    Labels: {showLabels ? 'ON' : 'OFF'}
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-md border border-border bg-muted/30 p-4">
                  <p className="text-xs text-muted-foreground mb-2">LABELLED COMPONENTS:</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                      <div>
                        <p className="font-medium text-sm">Origin (O)</p>
                        <p className="text-xs text-muted-foreground">Starting point of motion</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-red-500 rounded"></div>
                      <div>
                        <p className="font-medium text-sm">Moving Body</p>
                        <p className="text-xs text-muted-foreground">The car representing the object in motion</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                      <div>
                        <p className="font-medium text-sm">Final Position (S)</p>
                        <p className="text-xs text-muted-foreground">End point after time t</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-0.5 bg-blue-500"></div>
                      <div>
                        <p className="font-medium text-sm">Path of Motion</p>
                        <p className="text-xs text-muted-foreground">Trajectory followed by the body</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-0.5 bg-green-500"></div>
                      <div>
                        <p className="font-medium text-sm">Velocity Vector (v)</p>
                        <p className="text-xs text-muted-foreground">Instantaneous velocity direction</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-0.5 bg-red-500"></div>
                      <div>
                        <p className="font-medium text-sm">Acceleration Vector (a)</p>
                        <p className="text-xs text-muted-foreground">Constant acceleration direction</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-md border border-border bg-muted/30 p-4">
                  <p className="text-xs text-muted-foreground mb-2">CAR COMPONENTS:</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500"></div>
                      <span className="text-xs">Body</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-xs">Wheels</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500"></div>
                      <span className="text-xs">Front</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="calculations" className="space-y-4">
            <div className="rounded-md border border-border bg-muted/30 p-4 text-sm space-y-2">
              <p><span className="font-semibold">Kinematic Equations (Class 11 - Chapter 1):</span></p>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center text-xs font-bold text-green-600">1</div>
                  <p className="text-green-600">v = u + at = {finalVelocity.toFixed(2)} m/s</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center text-xs font-bold text-blue-600">2</div>
                  <p className="text-blue-600">s = ut + ½at² = {displacement.toFixed(2)} m</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center text-xs font-bold text-purple-600">3</div>
                  <p className="text-purple-600">v_avg = s/t = {averageVelocity.toFixed(2)} m/s</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-yellow-500/20 rounded-full flex items-center justify-center text-xs font-bold text-yellow-600">4</div>
                  <p className="text-yellow-600">v² = u² + 2as</p>
                </div>
              </div>
            </div>

            <div className="rounded-md border border-border bg-muted/30 p-4">
              <h3 className="font-semibold mb-3">Derived Quantities:</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium">Displacement (s):</p>
                  <p className="text-2xl font-bold text-blue-600">{displacement.toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground">meters</p>
                </div>
                <div>
                  <p className="font-medium">Final Velocity (v):</p>
                  <p className="text-2xl font-bold text-green-600">{finalVelocity.toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground">m/s</p>
                </div>
                <div>
                  <p className="font-medium">Average Velocity (v_avg):</p>
                  <p className="text-2xl font-bold text-purple-600">{averageVelocity.toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground">m/s</p>
                </div>
                <div>
                  <p className="font-medium">Time (t):</p>
                  <p className="text-2xl font-bold text-yellow-600">{time}</p>
                  <p className="text-xs text-muted-foreground">seconds</p>
                </div>
              </div>
            </div>

            <div className="rounded-md border border-border bg-muted/30 p-4">
              <h3 className="font-semibold mb-3">Graphical Interpretation:</h3>
              <div className="grid grid-cols-3 gap-4 text-xs">
                <div>
                  <p className="font-medium">Position-Time Graph:</p>
                  <p>Slope = Velocity</p>
                  <p>Straight line = constant velocity</p>
                  <p>Curve = acceleration</p>
                </div>
                <div>
                  <p className="font-medium">Velocity-Time Graph:</p>
                  <p>Slope = Acceleration</p>
                  <p>Area under curve = Displacement</p>
                </div>
                <div>
                  <p className="font-medium">Acceleration-Time Graph:</p>
                  <p>Area under curve = Change in velocity</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="theory" className="space-y-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Chapter 1: Motion in a Straight Line - Theory</h3>
              
              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Key Concepts:</h4>
                <ul className="space-y-2 text-sm">
                  <li><strong>Position:</strong> Location of an object relative to a reference point (origin). Measured in meters (m).</li>
                  <li><strong>Displacement:</strong> Change in position = Final position - Initial position. Vector quantity with magnitude and direction.</li>
                  <li><strong>Distance:</strong> Total path length traveled. Scalar quantity, always positive.</li>
                  <li><strong>Velocity:</strong> Rate of change of displacement. v = Δx/Δt. Vector quantity.</li>
                  <li><strong>Speed:</strong> Rate of change of distance. s = Δd/Δt. Scalar quantity.</li>
                  <li><strong>Acceleration:</strong> Rate of change of velocity. a = Δv/Δt. Vector quantity.</li>
                </ul>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Understanding the Visualization:</h4>
                <ul className="space-y-2 text-sm">
                  <li><strong>Yellow Sphere (Origin):</strong> This is the starting point (O) from which motion begins. In our coordinate system, this is at position x = 0.</li>
                  <li><strong>Red Car (Moving Body):</strong> Represents the object in motion. Its position changes over time according to the kinematic equation s = ut + ½at².</li>
                  <li><strong>Green Sphere (Final Position):</strong> This is where the object reaches after time t. The displacement is the distance between origin and final position.</li>
                  <li><strong>Blue Line (Path):</strong> Shows the straight-line trajectory of the object. In straight-line motion, the path is always a straight line.</li>
                  <li><strong>Green Arrow (Velocity Vector):</strong> Points in the direction of motion and its length represents the magnitude of velocity. Velocity changes over time if acceleration is non-zero.</li>
                  <li><strong>Red Arrow (Acceleration Vector):</strong> Points in the direction of acceleration. For uniformly accelerated motion, this remains constant.</li>
                </ul>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Real-world Applications:</h4>
                <ul className="space-y-2 text-sm">
                  <li><strong>Free Fall:</strong> Objects falling under gravity (a = g = 9.8 m/s² downward)</li>
                  <li><strong>Vehicle Acceleration:</strong> Car accelerating on a straight road</li>
                  <li><strong>Projectile Motion (Vertical):</strong> Ball thrown straight up or down</li>
                  <li><strong>Braking:</strong> Car decelerating to stop (negative acceleration)</li>
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="equations" className="space-y-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Kinematic Equations - Detailed Breakdown</h3>
              
              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Equation 1: Velocity-Time Relation</h4>
                <p className="text-2xl font-bold text-green-600 mb-2">v = u + at</p>
                <p className="text-sm"><strong>Where:</strong></p>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  <li><strong>v:</strong> Final velocity (m/s)</li>
                  <li><strong>u:</strong> Initial velocity (m/s)</li>
                  <li><strong>a:</strong> Acceleration (m/s²)</li>
                  <li><strong>t:</strong> Time (s)</li>
                </ul>
                <p className="text-sm mt-2"><strong>Derivation:</strong> Since acceleration is the rate of change of velocity, a = (v - u)/t ⇒ v = u + at</p>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Equation 2: Position-Time Relation</h4>
                <p className="text-2xl font-bold text-blue-600 mb-2">s = ut + ½at²</p>
                <p className="text-sm"><strong>Where:</strong></p>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  <li><strong>s:</strong> Displacement (m)</li>
                  <li><strong>u:</strong> Initial velocity (m/s)</li>
                  <li><strong>a:</strong> Acceleration (m/s²)</li>
                  <li><strong>t:</strong> Time (s)</li>
                </ul>
                <p className="text-sm mt-2"><strong>Derivation:</strong> From v = u + at and s = average velocity × time = [(u + v)/2] × t = [u + (u + at)]t/2 = ut + ½at²</p>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Equation 3: Velocity-Position Relation</h4>
                <p className="text-2xl font-bold text-yellow-600 mb-2">v² = u² + 2as</p>
                <p className="text-sm"><strong>Where:</strong></p>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  <li><strong>v:</strong> Final velocity (m/s)</li>
                  <li><strong>u:</strong> Initial velocity (m/s)</li>
                  <li><strong>a:</strong> Acceleration (m/s²)</li>
                  <li><strong>s:</strong> Displacement (m)</li>
                </ul>
                <p className="text-sm mt-2"><strong>Derivation:</strong> From v = u + at, we get t = (v - u)/a. Substituting in s = ut + ½at² gives the equation.</p>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">When to Use Which Equation:</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium">Use v = u + at when:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Time (t) is known</li>
                      <li>Need to find final velocity (v)</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium">Use s = ut + ½at² when:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Time (t) is known</li>
                      <li>Need to find displacement (s)</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium">Use v² = u² + 2as when:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Time (t) is NOT known</li>
                      <li>Need to find velocity or displacement</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Special Cases:</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium">Uniform Motion (a = 0):</p>
                    <p>v = u (constant)</p>
                    <p>s = ut</p>
                  </div>
                  <div>
                    <p className="font-medium">Free Fall (a = g):</p>
                    <p>v = u + gt</p>
                    <p>h = ut + ½gt²</p>
                  </div>
                  <div>
                    <p className="font-medium">Object at Rest (u = 0):</p>
                    <p>v = at</p>
                    <p>s = ½at²</p>
                  </div>
                  <div>
                    <p className="font-medium">Uniform Circular Motion:</p>
                    <p>Not applicable (not straight-line)</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default Class11KinematicsMotionEnhanced;
