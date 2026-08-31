"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import * as THREE from "three";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Slider from "@/components/ui/slider";
import { isWebGLAvailable } from "@/lib/webgl";
import { disposeThreeScene, standardMaterial } from "@/components/lab/three-scene";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export const Class11LawsOfMotionEnhanced: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [mass1, setMass1] = useState(2);
  const [mass2, setMass2] = useState(3);
  const [force, setForce] = useState(10);
  const [friction, setFriction] = useState(0.2);
  const [showForces, setShowForces] = useState(true);
  const [showTrajectory, setShowTrajectory] = useState(true);
  const [showLabels, setShowLabels] = useState(true);

  // Newton's Second Law: F = ma
  const acceleration1 = useMemo(() => {
    const netForce = force - friction * mass1 * 9.8;
    return netForce / mass1;
  }, [force, friction, mass1]);

  const acceleration2 = useMemo(() => {
    return force / mass2;
  }, [force, mass2]);

  const tension = useMemo(() => {
    return (mass1 * mass2 * 9.8) / (mass1 + mass2);
  }, [mass1, mass2]);

  // Normal forces
  const normalForce1 = useMemo(() => mass1 * 9.8, [mass1]);
  const normalForce2 = useMemo(() => mass2 * 9.8, [mass2]);

  useEffect(() => {
    if (!mountRef.current || !isWebGLAvailable()) return;
    const container = mountRef.current;

    let ts: any = null;
    let unbind: (() => void) | null = null;
    let cancelled = false;

    async function init() {
      try {
        const { createThreeScene, bindResize } = await import("@/components/lab/three-scene");
        
        ts = createThreeScene(container!, {
          cameraPosition: new THREE.Vector3(12, 15, 18),
          autoRotate: true,
          autoRotateSpeed: 0.2,
          background: 0x0f172a
        });
        
        unbind = bindResize(ts);

        // Create ground
        const groundGeo = new THREE.PlaneGeometry(50, 50);
        const groundMat = standardMaterial(0x1e293b, { roughness: 0.8 });
        const ground = new THREE.Mesh(groundGeo, groundMat);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -0.01;
        ground.receiveShadow = true;
        ts.group.add(ground);

        const grid = new THREE.GridHelper(50, 100, 0x334155, 0x1e293b);
        ts.group.add(grid);

        // Block 1 (horizontal motion with friction) - LABELLED
        const block1Group = new THREE.Group();
        const block1Geo = new THREE.BoxGeometry(mass1 * 0.8, mass1 * 0.6, mass1 * 0.4);
        const block1Mat = standardMaterial(0xef4444, { emissive: 0xef4444, emissiveIntensity: 0.2 });
        const block1 = new THREE.Mesh(block1Geo, block1Mat);
        block1.castShadow = true;
        block1Group.add(block1);
        block1Group.position.set(0, 0.5, 0);
        ts.group.add(block1Group);

        // Block 2 (hanging) - LABELLED
        const block2Group = new THREE.Group();
        const block2Geo = new THREE.BoxGeometry(mass2 * 0.6, mass2 * 0.6, mass2 * 0.6);
        const block2Mat = standardMaterial(0x22c55e, { emissive: 0x22c55e, emissiveIntensity: 0.2 });
        const block2 = new THREE.Mesh(block2Geo, block2Mat);
        block2.castShadow = true;
        block2Group.add(block2);
        block2Group.position.set(0, 10, 0);
        ts.group.add(block2Group);

        // Pulley system - LABELLED
        const pulleyGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.3, 16);
        const pulleyMat = standardMaterial(0x6366f1, { metalness: 0.8 });
        const pulley = new THREE.Mesh(pulleyGeo, pulleyMat);
        pulley.position.set(0, 10, 0);
        pulley.rotation.x = Math.PI / 2;
        ts.group.add(pulley);

        // Ceiling support for pulley
        const ceilingGeo = new THREE.BoxGeometry(10, 0.2, 2);
        const ceilingMat = standardMaterial(0x334155);
        const ceiling = new THREE.Mesh(ceilingGeo, ceilingMat);
        ceiling.position.set(0, 11, 0);
        ts.group.add(ceiling);

        // Rope
        let rope: THREE.Line | null = null;
        let forceArrow: THREE.ArrowHelper | null = null;
        let frictionArrow: THREE.ArrowHelper | null = null;
        let tensionArrow: THREE.ArrowHelper | null = null;
        let normalArrow1: THREE.ArrowHelper | null = null;
        let normalArrow2: THREE.ArrowHelper | null = null;
        let weightArrow1: THREE.ArrowHelper | null = null;
        let weightArrow2: THREE.ArrowHelper | null = null;
        const trajectoryLine: THREE.Line | null = null;

        const startTime = performance.now();

        // LABELS for components
        let labelRenderer: any = null;
        const labels: any[] = [];

        try {
          const { CSS2DRenderer, CSS2DObject } = await import("three/addons/renderers/CSS2DRenderer.js");
          
          labelRenderer = new CSS2DRenderer();
          labelRenderer.setSize(container!.clientWidth, container!.clientHeight);
          labelRenderer.domElement.style.position = "absolute";
          labelRenderer.domElement.style.top = "0";
          labelRenderer.domElement.style.pointerEvents = "none";
          labelRenderer.domElement.style.color = "white";
          container!.appendChild(labelRenderer.domElement);

          // Block 1 label
          const block1Label = new CSS2DObject(document.createElement("div"));
          block1Label.element.className = "label";
          block1Label.element.textContent = `Block 1 (m₁=${mass1}kg)`;
          block1Label.element.style.backgroundColor = "rgba(0,0,0,0.7)";
          block1Label.element.style.padding = "4px 8px";
          block1Label.element.style.borderRadius = "4px";
          block1Label.element.style.color = "#ef4444";
          block1Label.position.set(0, 1.5, 0);
          block1Group.add(block1Label);
          labels.push(block1Label);

          // Block 2 label
          const block2Label = new CSS2DObject(document.createElement("div"));
          block2Label.element.className = "label";
          block2Label.element.textContent = `Block 2 (m₂=${mass2}kg)`;
          block2Label.element.style.backgroundColor = "rgba(0,0,0,0.7)";
          block2Label.element.style.padding = "4px 8px";
          block2Label.element.style.borderRadius = "4px";
          block2Label.element.style.color = "#22c55e";
          block2Label.position.set(0, 1.2, 0);
          block2Group.add(block2Label);
          labels.push(block2Label);

          // Pulley label
          const pulleyLabel = new CSS2DObject(document.createElement("div"));
          pulleyLabel.element.className = "label";
          pulleyLabel.element.textContent = "Pulley";
          pulleyLabel.element.style.backgroundColor = "rgba(0,0,0,0.7)";
          pulleyLabel.element.style.padding = "4px 8px";
          pulleyLabel.element.style.borderRadius = "4px";
          pulleyLabel.element.style.color = "#6366f1";
          pulleyLabel.position.set(0, 1.5, 0);
          pulley.add(pulleyLabel);
          labels.push(pulleyLabel);

        } catch {
          console.log("CSS2DRenderer not available");
        }

        function updateScene() {
          if (!ts) return;

          // Clear previous objects
          if (rope) { ts.group.remove(rope); rope.geometry.dispose(); (rope.material as THREE.Material).dispose(); }
          if (forceArrow) ts.group.remove(forceArrow);
          if (frictionArrow) ts.group.remove(frictionArrow);
          if (tensionArrow) ts.group.remove(tensionArrow);
          if (normalArrow1) ts.group.remove(normalArrow1);
          if (normalArrow2) ts.group.remove(normalArrow2);
          if (weightArrow1) ts.group.remove(weightArrow1);
          if (weightArrow2) ts.group.remove(weightArrow2);
          if (trajectoryLine) { ts.group.remove(trajectoryLine); trajectoryLine.geometry.dispose(); }

          const elapsed = (performance.now() - startTime) / 1000;
          const t = elapsed % 5;

          // Animate blocks
          const pos1 = Math.min(12, 0.5 * acceleration1 * t * t);
          block1Group.position.x = pos1;
          block2Group.position.y = 10 - 0.5 * acceleration2 * t * t;

          // Update pulley and rope
          pulley.position.set(pos1, 10, 0);
          
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
            // Applied force arrow on block 1
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

            // Tension arrow on pulley
            tensionArrow = new THREE.ArrowHelper(
              new THREE.Vector3(0, -1, 0),
              new THREE.Vector3(pos1, 10, 0),
              tension * 0.1,
              0x22c55e
            );
            ts.group.add(tensionArrow);

            // Normal force arrow on block 1
            normalArrow1 = new THREE.ArrowHelper(
              new THREE.Vector3(0, 1, 0),
              new THREE.Vector3(pos1, 0.5, 0),
              normalForce1 * 0.1,
              0xfbbf24
            );
            ts.group.add(normalArrow1);

            // Normal force arrow on block 2 (from tension)
            normalArrow2 = new THREE.ArrowHelper(
              new THREE.Vector3(0, 1, 0),
              new THREE.Vector3(pos1, block2Group.position.y, 0),
              normalForce2 * 0.1,
              0xfbbf24
            );
            ts.group.add(normalArrow2);

            // Weight arrow on block 1
            weightArrow1 = new THREE.ArrowHelper(
              new THREE.Vector3(0, -1, 0),
              new THREE.Vector3(pos1, 0.5, 0),
              mass1 * 9.8 * 0.1,
              0xfbbf24
            );
            ts.group.add(weightArrow1);

            // Weight arrow on block 2
            weightArrow2 = new THREE.ArrowHelper(
              new THREE.Vector3(0, -1, 0),
              new THREE.Vector3(pos1, block2Group.position.y, 0),
              mass2 * 9.8 * 0.1,
              0xfbbf24
            );
            ts.group.add(weightArrow2);
          }

          // Rotate pulley
          pulley.rotation.z += 0.05;

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
        } catch {}
      }
      // Cleanup labels
      if (container) {
        const labelElements = container!.querySelectorAll(".label");
        labelElements.forEach(el => el.remove());
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mass1, mass2, force, friction, showForces, showTrajectory, showLabels]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Class 11 Laws of Motion: Newton's Laws (Enhanced with Labels)</CardTitle>
        <CardDescription>
          Interactive 3D visualization of Newton's Three Laws of Motion with force analysis and clearly labelled components.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div ref={mountRef} className="w-full h-96 bg-gray-100 rounded-lg" />

        <Tabs defaultValue="controls" className="w-full">
          <TabsList className="h-auto">
            <TabsTrigger value="controls">Controls</TabsTrigger>
            <TabsTrigger value="calculations">Calculations</TabsTrigger>
            <TabsTrigger value="theory">Newton's Laws</TabsTrigger>
            <TabsTrigger value="analysis">Force Analysis</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
          </TabsList>

          <TabsContent value="controls" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <Label>Mass 1 (kg) - Block on Surface</Label>
                  <Slider min={1} max={10} step={0.5} value={[mass1]} onValueChange={(v) => setMass1(v[0])} />
                  <p className="text-sm text-gray-500">Current: {mass1} kg</p>
                </div>
                <div>
                  <Label>Mass 2 (kg) - Hanging Block</Label>
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
                <div className="flex gap-2 flex-wrap">
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
                      <div className="w-4 h-4 bg-red-500"></div>
                      <div>
                        <p className="font-medium text-sm">Block 1 (m₁)</p>
                        <p className="text-xs text-muted-foreground">Mass on horizontal surface</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-green-500"></div>
                      <div>
                        <p className="font-medium text-sm">Block 2 (m₂)</p>
                        <p className="text-xs text-muted-foreground">Hanging mass</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-blue-500 rounded"></div>
                      <div>
                        <p className="font-medium text-sm">Pulley</p>
                        <p className="text-xs text-muted-foreground">Changes direction of force</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-0.5 bg-yellow-400"></div>
                      <div>
                        <p className="font-medium text-sm">Rope</p>
                        <p className="text-xs text-muted-foreground">Connects blocks via pulley</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-0.5 bg-red-500"></div>
                      <div>
                        <p className="font-medium text-sm">Applied Force (F)</p>
                        <p className="text-xs text-muted-foreground">Pulling Block 1</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-0.5 bg-blue-500"></div>
                      <div>
                        <p className="font-medium text-sm">Friction (f)</p>
                        <p className="text-xs text-muted-foreground">Opposing motion</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-0.5 bg-green-500"></div>
                      <div>
                        <p className="font-medium text-sm">Tension (T)</p>
                        <p className="text-xs text-muted-foreground">Force in the rope</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-0.5 bg-yellow-400"></div>
                      <div>
                        <p className="font-medium text-sm">Normal Force (N)</p>
                        <p className="text-xs text-muted-foreground">Support force from surface</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-0.5 bg-yellow-600"></div>
                      <div>
                        <p className="font-medium text-sm">Weight (W)</p>
                        <p className="text-xs text-muted-foreground">Force due to gravity</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-md border border-border bg-muted/30 p-4">
                  <p className="text-xs text-muted-foreground mb-2">FORCE COLOR CODES:</p>
                  <div className="grid grid-cols-3 gap-3 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500"></div>
                      <span>Applied Force</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500"></div>
                      <span>Friction</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500"></div>
                      <span>Tension</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-400"></div>
                      <span>Normal Force</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-600"></div>
                      <span>Weight</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="calculations" className="space-y-4">
            <div className="rounded-md border border-border bg-muted/30 p-4 text-sm space-y-2">
              <p><span className="font-semibold">Force Calculations (Class 11 - Chapter 2):</span></p>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="text-xs">1</Badge>
                  <p className="text-red-600">Block 1: a₁ = (F - μmg)/m = {acceleration1.toFixed(2)} m/s²</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="text-xs">2</Badge>
                  <p className="text-green-600">Block 2: a₂ = F/m = {acceleration2.toFixed(2)} m/s²</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="text-xs">3</Badge>
                  <p className="text-blue-600">Tension: T = (m₁m₂g)/(m₁+m₂) = {tension.toFixed(2)} N</p>
                </div>
              </div>
            </div>

            <div className="rounded-md border border-border bg-muted/30 p-4">
              <h3 className="font-semibold mb-3">Force Values:</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium">Applied Force (F):</p>
                  <p className="text-2xl font-bold text-red-600">{force}</p>
                  <p className="text-xs text-muted-foreground">Newtons (N)</p>
                </div>
                <div>
                  <p className="font-medium">Friction Force (f):</p>
                  <p className="text-2xl font-bold text-blue-600">{(friction * mass1 * 9.8).toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground">Newtons (N)</p>
                </div>
                <div>
                  <p className="font-medium">Tension (T):</p>
                  <p className="text-2xl font-bold text-green-600">{tension.toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground">Newtons (N)</p>
                </div>
                <div>
                  <p className="font-medium">Normal Force (N₁):</p>
                  <p className="text-2xl font-bold text-yellow-600">{normalForce1.toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground">Newtons (N)</p>
                </div>
                <div>
                  <p className="font-medium">Normal Force (N₂):</p>
                  <p className="text-2xl font-bold text-yellow-600">{normalForce2.toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground">Newtons (N)</p>
                </div>
                <div>
                  <p className="font-medium">Weight (W₁):</p>
                  <p className="text-2xl font-bold text-orange-600">{(mass1 * 9.8).toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground">Newtons (N)</p>
                </div>
              </div>
            </div>

            <div className="rounded-md border border-border bg-muted/30 p-4">
              <h3 className="font-semibold mb-3">Net Forces:</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium">Net Force on Block 1:</p>
                  <p className="text-xl font-bold text-purple-600">{(force - friction * mass1 * 9.8).toFixed(2)} N</p>
                </div>
                <div>
                  <p className="font-medium">Net Force on Block 2:</p>
                  <p className="text-xl font-bold text-purple-600">{force.toFixed(2)} N</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="theory" className="space-y-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Chapter 2: Newton's Laws of Motion - Theory</h3>
              
              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Newton's First Law (Law of Inertia):</h4>
                <p className="text-sm">A body continues in its state of rest or of uniform motion in a straight line unless compelled by an external force to act otherwise.</p>
                <ul className="text-sm mt-2 space-y-2">
                  <li><strong>Inertia:</strong> Property of matter that resists change in motion. In this simulation, both blocks have inertia - they resist acceleration when forces are applied.</li>
                  <li><strong>Mass:</strong> Measure of inertia. Greater mass = greater inertia. Notice how heavier blocks accelerate more slowly.</li>
                  <li><strong>Example in Simulation:</strong> When you apply a force, the blocks don't immediately reach high speed - they resist the change due to inertia.</li>
                </ul>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Newton's Second Law (F = ma):</h4>
                <p className="text-sm">The force acting on a body is directly proportional to the product of its mass and acceleration.</p>
                <div className="bg-primary/10 rounded p-3 mt-2">
                  <p className="text-center text-2xl font-bold">F = ma</p>
                  <p className="text-sm text-center text-muted-foreground mt-1">Where: F = Force (N), m = Mass (kg), a = Acceleration (m/s²)</p>
                </div>
                <ul className="text-sm mt-3 space-y-2">
                  <li><strong>In this Simulation:</strong> The applied force F causes acceleration a = F/m for Block 2. For Block 1, the net force (F - friction) causes acceleration a&sub1; = (F - &mu;mg)/m.</li>
                  <li><strong>Observation:</strong> Notice how Block 2 (hanging) accelerates faster than Block 1 when mass2 &lt; mass1, because it has less mass to accelerate.</li>
                </ul>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Newton's Third Law (Action-Reaction):</h4>
                <p className="text-sm">For every action, there is an equal and opposite reaction.</p>
                <ul className="text-sm mt-2 space-y-2">
                  <li>Action and reaction act on <strong>different bodies</strong>.</li>
                  <li>They are of <strong>same type</strong> (both contact or both field).</li>
                  <li><strong>In this Simulation:</strong></li>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><strong>Tension in Rope:</strong> The rope pulls Block 2 upward (action) and Block 1 to the right (reaction). These are equal and opposite forces.</li>
                    <li><strong>Normal Force:</strong> The surface pushes Block 1 upward (reaction) with the same magnitude as Block 1 pushes down on the surface (action).</li>
                    <li><strong>Friction:</strong> The surface exerts friction on Block 1 (action) while Block 1 exerts an equal and opposite friction force on the surface (reaction).</li>
                  </ul>
                </ul>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Understanding the Pulley System:</h4>
                <ul className="text-sm space-y-2">
                  <li><strong>Pulley Function:</strong> The pulley changes the direction of the force. Instead of pulling Block 2 upward directly, you can pull Block 1 horizontally.</li>
                  <li><strong>Force Transmission:</strong> The tension in the rope is the same throughout (assuming ideal pulley with no friction). This means the force pulling Block 1 is the same as the force lifting Block 2.</li>
                  <li><strong>Mechanical Advantage:</strong> A simple pulley like this has MA = 1, meaning it doesn't multiply force but only changes direction.</li>
                  <li><strong>Real-world Applications:</strong> Pulleys are used in cranes, elevators, flagpoles, and many other systems to lift heavy objects with convenience.</li>
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Force Analysis - Detailed Breakdown</h3>
              
              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Free Body Diagrams:</h4>
                
                <div className="mb-4">
                  <h5 className="font-semibold text-red-600 mb-2">Block 1 (on horizontal surface):</h5>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p><strong>Horizontal Forces:</strong></p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li><strong>Applied Force (F):</strong> {force} N to the right</li>
                        <li><strong>Friction (f):</strong> {friction} × {mass1} kg × 9.8 m/s² = {(friction * mass1 * 9.8).toFixed(2)} N to the left</li>
                        <li><strong>Tension (T):</strong> {tension.toFixed(2)} N to the right (from rope)</li>
                        <li><strong>Net Horizontal Force:</strong> F - f = {(force - friction * mass1 * 9.8).toFixed(2)} N</li>
                      </ul>
                    </div>
                    <div>
                      <p><strong>Vertical Forces:</strong></p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li><strong>Weight (W₁):</strong> m₁g = {mass1} kg × 9.8 m/s² = {(mass1 * 9.8).toFixed(2)} N downward</li>
                        <li><strong>Normal Force (N₁):</strong> {(mass1 * 9.8).toFixed(2)} N upward</li>
                        <li><strong>Net Vertical Force:</strong> 0 (balanced)</li>
                      </ul>
                    </div>
                  </div>
                  <p className="text-sm mt-2">Result: Block 1 accelerates horizontally with a₁ = {acceleration1.toFixed(2)} m/s²</p>
                </div>

                <div className="mt-4">
                  <h5 className="font-semibold text-green-600 mb-2">Block 2 (hanging):</h5>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p><strong>Vertical Forces:</strong></p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li><strong>Weight (W₂):</strong> m₂g = {mass2} kg × 9.8 m/s² = {(mass2 * 9.8).toFixed(2)} N downward</li>
                        <li><strong>Tension (T):</strong> {tension.toFixed(2)} N upward (from rope)</li>
                        <li><strong>Net Vertical Force:</strong> T - W₂ = {(tension - mass2 * 9.8).toFixed(2)} N upward</li>
                      </ul>
                    </div>
                    <div>
                      <p><strong>Horizontal Forces:</strong></p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>None (block is only moving vertically)</li>
                      </ul>
                    </div>
                  </div>
                  <p className="text-sm mt-2">Result: Block 2 accelerates downward with a₂ = {acceleration2.toFixed(2)} m/s²</p>
                </div>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Pulley Analysis:</h4>
                <div className="text-sm space-y-2">
                  <p><strong>Ideal Pulley Assumptions:</strong></p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Mass of pulley is negligible</li>
                    <li>Friction in pulley bearing is negligible</li>
                    <li>Rope is massless and doesn't stretch</li>
                    <li>Tension is uniform throughout the rope</li>
                  </ul>
                  <p className="mt-2"><strong>Tension Calculation:</strong></p>
                  <p>For a pulley system with masses m₁ and m₂:</p>
                  <p className="bg-primary/10 rounded p-2 mt-1 font-bold">T = (m₁m₂g)/(m₁ + m₂)</p>
                  <p className="text-xs text-muted-foreground mt-1">This is the tension when the system is in equilibrium. When accelerated, tension varies.</p>
                </div>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Energy Analysis:</h4>
                <div className="text-sm space-y-2">
                  <p><strong>Potential Energy Changes:</strong></p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Block 2 loses PE as it moves down: ΔPE = -m₂gh</li>
                    <li>Block 1 gains PE if lifted, but in this setup it moves horizontally (no height change)</li>
                  </ul>
                  <p><strong>Kinetic Energy Changes:</strong></p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Both blocks gain KE as they accelerate</li>
                    <li>Total KE = ½m₁v₁² + ½m₂v₂²</li>
                    <li>Since blocks are connected, v₁ = v₂ = v (same speed)</li>
                  </ul>
                  <p><strong>Work Done:</strong></p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Work by applied force: W = F × distance</li>
                    <li>Work against friction: W = f × distance</li>
                    <li>Net work = Change in total mechanical energy</li>
                  </ul>
                </div>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Force Relationships:</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p><strong>Friction Force:</strong></p>
                    <p className="bg-blue-500/10 rounded p-2 mt-1">f = μN = μmg</p>
                    <p className="text-xs text-muted-foreground mt-1">Where μ = coefficient of friction, N = normal force</p>
                  </div>
                  <div>
                    <p><strong>Normal Force:</strong></p>
                    <p className="bg-yellow-500/10 rounded p-2 mt-1">N = mg</p>
                    <p className="text-xs text-muted-foreground mt-1">For horizontal surface, normal force equals weight</p>
                  </div>
                  <div>
                    <p><strong>Weight:</strong></p>
                    <p className="bg-orange-500/10 rounded p-2 mt-1">W = mg</p>
                    <p className="text-xs text-muted-foreground mt-1">Force due to gravity</p>
                  </div>
                  <div>
                    <p><strong>Net Force:</strong></p>
                    <p className="bg-purple-500/10 rounded p-2 mt-1">F_net = ma</p>
                    <p className="text-xs text-muted-foreground mt-1">From Newton's Second Law</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="applications" className="space-y-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Real-world Applications of Newton's Laws</h3>
              
              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Applications of First Law (Inertia):</h4>
                <ul className="text-sm space-y-2">
                  <li><strong>Seat Belts in Cars:</strong> When a car stops suddenly, passengers tend to continue moving forward due to inertia. Seat belts provide the necessary force to stop them.</li>
                  <li><strong>Table Cloth Trick:</strong> A cloth can be pulled quickly from under dishes without disturbing them due to their inertia.</li>
                  <li><strong>Dusting Furniture:</strong> When you beat a carpet or shake a blanket, dust particles fall off due to inertia.</li>
                  <li><strong>Athlete Running:</strong> An athlete continues to run for some distance after finishing the race due to inertia.</li>
                  <li><strong>Spacecraft in Space:</strong> Once in motion in the frictionless environment of space, a spacecraft continues moving at constant velocity without any engine thrust.</li>
                </ul>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Applications of Second Law (F = ma):</h4>
                <ul className="text-sm space-y-2">
                  <li><strong>Rocket Launch:</strong> Rockets burn fuel to produce thrust (force), which accelerates the rocket. The greater the thrust and the less the mass, the greater the acceleration.</li>
                  <li><strong>Car Acceleration:</strong> The engine provides force to accelerate the car. A more powerful engine or a lighter car results in greater acceleration.</li>
                  <li><strong>Crash Testing:</strong> In car crash tests, the force of impact is measured to understand how it affects the acceleration of dummies, which helps in designing safer vehicles.</li>
                  <li><strong>Sports:</strong> In cricket, a bowler applies force to the ball, and the acceleration depends on the force and the mass of the ball.</li>
                  <li><strong>Elevators:</strong> When an elevator accelerates upward, you feel heavier because the normal force (which you feel as your weight) increases according to F = ma.</li>
                </ul>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Applications of Third Law (Action-Reaction):</h4>
                <ul className="text-sm space-y-2">
                  <li><strong>Walking:</strong> When you walk, you push the ground backward (action), and the ground pushes you forward (reaction), allowing you to move.</li>
                  <li><strong>Swimming:</strong> A swimmer pushes water backward with hands and feet (action), and water pushes the swimmer forward (reaction).</li>
                  <li><strong>Gun Recoil:</strong> When a bullet is fired from a gun, the gun exerts a force on the bullet (action), and the bullet exerts an equal and opposite force on the gun (reaction), causing the gun to "kick" backward.</li>
                  <li><strong>Rocket Propulsion:</strong> Rockets work by expelling exhaust gases backward at high speed (action). The gases exert an equal and opposite force on the rocket (reaction), propelling it forward.</li>
                  <li><strong>Bouncing Ball:</strong> When a ball hits the ground, it exerts a force on the ground (action), and the ground exerts an equal and opposite force on the ball (reaction), causing it to bounce.</li>
                  <li><strong>Space Travel:</strong> In space, rockets can maneuver by expelling gas in one direction, causing the rocket to move in the opposite direction.</li>
                </ul>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Pulley Systems in Real World:</h4>
                <ul className="text-sm space-y-2">
                  <li><strong>Elevators:</strong> Use pulley systems with counterweights to move up and down efficiently.</li>
                  <li><strong>Cranes:</strong> Use complex pulley systems (block and tackle) to lift heavy loads with less effort.</li>
                  <li><strong>Flagpoles:</strong> Use pulleys to raise and lower flags easily.</li>
                  <li><strong>Window Blinds:</strong> Use pulleys to open and close blinds.</li>
                  <li><strong>Sailboats:</strong> Use pulleys to control sails and rigging.</li>
                  <li><strong>Exercise Equipment:</strong> Many gym machines use pulley systems for resistance training.</li>
                  <li><strong>Construction:</strong> Pulleys are used to lift building materials to upper floors.</li>
                </ul>
              </div>

              <div className="rounded-md border border-border bg-muted/30 p-4">
                <h4 className="font-medium text-primary mb-3">Friction in Daily Life:</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p><strong>Beneficial Friction:</strong></p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Walking on the ground</li>
                      <li>Braking of vehicles</li>
                      <li>Writing on paper</li>
                      <li>Lighting a matchstick</li>
                      <li>Holding objects in hand</li>
                    </ul>
                  </div>
                  <div>
                    <p><strong>Harmful Friction:</strong></p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Wear and tear of machinery</li>
                      <li>Energy loss in machines</li>
                      <li>Difficulty in moving heavy objects</li>
                      <li>Heat generation in engines</li>
                    </ul>
                  </div>
                </div>
                <p className="text-sm mt-2"><strong>Reducing Friction:</strong> Using lubricants, ball bearings, polishing surfaces, using wheels.</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default Class11LawsOfMotionEnhanced;
