"use client";

import { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import { CSS2DRenderer } from "three/addons/renderers/CSS2DRenderer.js";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { isWebGLAvailable } from "@/lib/webgl";

// Galvanic Cell 3D Visualization for Class 11 Chemistry
// Concept: Electrochemistry, Redox Reactions, Cell Potential

export const Class11ElectrochemistryGalvanicCell: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [showElectrons, setShowElectrons] = useState(true);
  const [showIons, setShowIons] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const [showCurrentFlow, setShowCurrentFlow] = useState(false);
  const [currentSpeed, setCurrentSpeed] = useState(1);

  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!mountRef.current || !isWebGLAvailable()) return;
    const container = mountRef.current;

    let labelRenderer: any;
    const labelObjects: any[] = [];
    const electronParticles: THREE.Mesh[] = [];
    const ionParticles: THREE.Mesh[] = [];

    // Initialize scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f172a);

    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 5, 10);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7);
    scene.add(directionalLight);

    // CSS2D Renderer for labels
    try {
      
      labelRenderer = new CSS2DRenderer();
      labelRenderer.setSize(container.clientWidth, container.clientHeight);
      labelRenderer.domElement.style.position = "absolute";
      labelRenderer.domElement.style.top = "0";
      labelRenderer.domElement.style.pointerEvents = "none";
      labelRenderer.domElement.style.zIndex = "10";
      container.appendChild(labelRenderer.domElement);
    } catch {
      console.log("CSS2DRenderer not available");
    }

    const createLabel = (text: string, position: THREE.Vector3, color = "#ffffff") => {
      if (!labelRenderer) return null;
      
      const labelDiv = document.createElement("div");
      labelDiv.className = "label";
      labelDiv.innerHTML = `<div style="background:rgba(0,0,0,0.8);padding:6px 10px;border-radius:6px;color:${color};font-weight:600;font-size:11px;border:1px solid ${color}20">${text}</div>`;
      
      const label = new (labelRenderer as any).CSS2DObject(labelDiv);
      label.position.set(position.x, position.y, position.z);
      scene.add(label);
      labelObjects.push(label);
      return label;
    };

    // Create base table
    const tableGeometry = new THREE.BoxGeometry(15, 0.5, 10);
    const tableMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x374151,
      roughness: 0.9
    });
    const table = new THREE.Mesh(tableGeometry, tableMaterial);
    table.position.y = -1;
    scene.add(table);

    // Create two beakers (half-cells)
    // Left beaker - Zinc electrode (Anode)
    const beakerLeft = new THREE.Mesh(
      new THREE.CylinderGeometry(1.5, 1.2, 4, 32),
      new THREE.MeshStandardMaterial({ 
        color: 0x94a3b8,
        transparent: true,
        opacity: 0.6,
        roughness: 0.3
      })
    );
    beakerLeft.position.set(-3, 0.5, 0);
    scene.add(beakerLeft);

    // Zinc electrode (Anode)
    const zincElectrode = new THREE.Mesh(
      new THREE.CylinderGeometry(0.3, 0.3, 3, 32),
      new THREE.MeshStandardMaterial({ 
        color: 0x6b7280,
        metalness: 0.8,
        roughness: 0.2
      })
    );
    zincElectrode.position.set(-3, 2.5, 0);
    scene.add(zincElectrode);

    // Right beaker - Copper electrode (Cathode)
    const beakerRight = new THREE.Mesh(
      new THREE.CylinderGeometry(1.5, 1.2, 4, 32),
      new THREE.MeshStandardMaterial({ 
        color: 0x94a3b8,
        transparent: true,
        opacity: 0.6,
        roughness: 0.3
      })
    );
    beakerRight.position.set(3, 0.5, 0);
    scene.add(beakerRight);

    // Copper electrode (Cathode)
    const copperElectrode = new THREE.Mesh(
      new THREE.CylinderGeometry(0.3, 0.3, 3, 32),
      new THREE.MeshStandardMaterial({ 
        color: 0xb87333,
        metalness: 0.9,
        roughness: 0.1
      })
    );
    copperElectrode.position.set(3, 2.5, 0);
    scene.add(copperElectrode);

    // Salt bridge (U-shaped tube)
    const saltBridgeGroup = new THREE.Group();
    
    const bridgeTube = new THREE.Mesh(
      new THREE.CylinderGeometry(0.2, 0.2, 6, 32),
      new THREE.MeshStandardMaterial({ 
        color: 0x94a3b8,
        transparent: true,
        opacity: 0.8
      })
    );
    bridgeTube.rotation.x = Math.PI / 2;
    bridgeTube.position.set(0, 0.5, 0);
    saltBridgeGroup.add(bridgeTube);
    
    // Salt bridge gel
    const bridgeGel = new THREE.Mesh(
      new THREE.CylinderGeometry(0.15, 0.15, 5.5, 32),
      new THREE.MeshStandardMaterial({ 
        color: 0xfbbf24,
        transparent: true,
        opacity: 0.6
      })
    );
    bridgeGel.rotation.x = Math.PI / 2;
    bridgeGel.position.set(0, 0.5, 0);
    saltBridgeGroup.add(bridgeGel);
    
    saltBridgeGroup.position.set(0, 0, 0);
    scene.add(saltBridgeGroup);

    // Connecting wire
    const wirePath = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-3, 3.5, 0),
      new THREE.Vector3(-1, 4.5, 0),
      new THREE.Vector3(1, 4.5, 0),
      new THREE.Vector3(3, 3.5, 0)
    ]);
    const wirePoints = wirePath.getPoints(50);
    const wireGeometry = new THREE.BufferGeometry().setFromPoints(wirePoints);
    const wireMaterial = new THREE.LineBasicMaterial({ color: 0xef4444, linewidth: 3 });
    const wire = new THREE.Line(wireGeometry, wireMaterial);
    scene.add(wire);

    // Voltmeter
    const voltmeterBase = new THREE.Mesh(
      new THREE.BoxGeometry(2, 0.5, 1),
      new THREE.MeshStandardMaterial({ color: 0x1e293b })
    );
    voltmeterBase.position.set(0, 4.5, -3);
    scene.add(voltmeterBase);

    const voltmeterDisplay = new THREE.Mesh(
      new THREE.BoxGeometry(1.8, 0.8, 0.5),
      new THREE.MeshStandardMaterial({ color: 0xffffff })
    );
    voltmeterDisplay.position.set(0, 5.1, -3);
    scene.add(voltmeterDisplay);

    const voltmeterNeedle = new THREE.Mesh(
      new THREE.BoxGeometry(0.8, 0.05, 0.05),
      new THREE.MeshStandardMaterial({ color: 0xef4444 })
    );
    voltmeterNeedle.position.set(0, 5.1, -2.8);
    scene.add(voltmeterNeedle);

    // Connect voltmeter to wire
    const voltmeterWire1 = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-1, 4.5, 0),
        new THREE.Vector3(-0.5, 4.5, -2.5)
      ]),
      new THREE.LineBasicMaterial({ color: 0xef4444, linewidth: 2 })
    );
    scene.add(voltmeterWire1);

    const voltmeterWire2 = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(1, 4.5, 0),
        new THREE.Vector3(0.5, 4.5, -2.5)
      ]),
      new THREE.LineBasicMaterial({ color: 0x3b82f6, linewidth: 2 })
    );
    scene.add(voltmeterWire2);

    // Create electron particles (moving from anode to cathode through wire)
    const createElectron = (position: THREE.Vector3) => {
      const electron = new THREE.Mesh(
        new THREE.SphereGeometry(0.08, 16, 16),
        new THREE.MeshStandardMaterial({ color: 0xfbbf24 })
      );
      electron.position.copy(position);
      scene.add(electron);
      electronParticles.push(electron);
    };

    // Create ions in solution (Zn2+ moving to cathode, SO42- moving to anode)
    const createIon = (position: THREE.Vector3, color: number, type: string) => {
      const ion = new THREE.Mesh(
        new THREE.SphereGeometry(0.1, 16, 16),
        new THREE.MeshStandardMaterial({ color: color, transparent: true, opacity: 0.8 })
      );
      ion.position.copy(position);
      ion.userData = { type: type };
      scene.add(ion);
      ionParticles.push(ion);
    };

    // Add labels
    if (showLabels) {
      createLabel("Zn Electrode (Anode)", new THREE.Vector3(-3, 4, 0), "#6b7280");
      createLabel("Cu Electrode (Cathode)", new THREE.Vector3(3, 4, 0), "#b87333");
      createLabel("ZnSO4 Solution", new THREE.Vector3(-3, 0.5, 0), "#94a3b8");
      createLabel("CuSO4 Solution", new THREE.Vector3(3, 0.5, 0), "#94a3b8");
      createLabel("Salt Bridge (KNO3)", new THREE.Vector3(0, 1.5, 0), "#fbbf24");
      createLabel("Voltmeter", new THREE.Vector3(0, 5.8, -3), "#ffffff");
      createLabel("Electron Flow", new THREE.Vector3(0, 5, 0), "#fbbf24");
    }

    // Create initial electrons
    for (let i = 0; i < 10; i++) {
      createElectron(new THREE.Vector3(-3 + i * 0.6, 4.5, 0));
    }

    // Create initial ions
    // Zn2+ ions moving towards cathode
    for (let i = 0; i < 5; i++) {
      createIon(new THREE.Vector3(-3 + Math.random() * 2, 0.5 + Math.random() * 2, 0), 0x3b82f6, "cation");
    }
    // SO42- ions moving towards anode
    for (let i = 0; i < 5; i++) {
      createIon(new THREE.Vector3(3 - Math.random() * 2, 0.5 + Math.random() * 2, 0), 0xef4444, "anion");
    }

    // Animation variables
    let time = 0;
    const electronTimeOffsets: number[] = [];
    electronParticles.forEach(() => electronTimeOffsets.push(Math.random() * 10));

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      
      time += 0.01 * currentSpeed;

      // Animate electrons moving from anode to cathode through wire
      electronParticles.forEach((electron, index) => {
        const t = (time * 2 + electronTimeOffsets[index]) % 10;
        if (t < 5 && showCurrentFlow) {
          // Move along wire path from anode to cathode
          const progress = t / 5;
          electron.position.x = -3 + progress * 6;
          electron.position.y = 4.5 - Math.sin(progress * Math.PI) * 0.5;
          electron.position.z = 0;
        }
      });

      // Animate ions in solutions
      ionParticles.forEach((ion) => {
        if (showIons) {
          const ionType = ion.userData.type;
          if (ionType === "cation") {
            // Zn2+ moving towards cathode (right)
            ion.position.x += 0.01 * currentSpeed * (0.5 + Math.random() * 0.5);
            if (ion.position.x > 3) ion.position.x = -3;
          } else if (ionType === "anion") {
            // SO42- moving towards anode (left)
            ion.position.x -= 0.01 * currentSpeed * (0.5 + Math.random() * 0.5);
            if (ion.position.x < -3) ion.position.x = 3;
          }
          // Gentle bobbing
          ion.position.y = 0.5 + Math.sin(time * 2 + ion.position.x) * 0.2;
        }
      });

      // Animate voltmeter needle
      voltmeterNeedle.rotation.z = Math.sin(time * 2) * 0.3 * (showCurrentFlow ? 1 : 0);

      // Auto rotate camera
      if (autoRotate) {
        camera.position.x = Math.cos(time * 0.2) * 10;
        camera.position.z = Math.sin(time * 0.2) * 10;
        camera.lookAt(0, 0, 0);
      }

      renderer.render(scene, camera);
      if (labelRenderer) labelRenderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!container) return;
      
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
      if (labelRenderer) {
        labelRenderer.setSize(container.clientWidth, container.clientHeight);
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (container) {
        container.removeChild(renderer.domElement);
        if (labelRenderer && labelRenderer.domElement) {
          container.removeChild(labelRenderer.domElement);
        }
      }
      // Dispose geometries and materials
      scene.traverse((obj: any) => {
        if (obj.isMesh && obj.geometry) obj.geometry.dispose();
        if (obj.isMesh && obj.material) {
          if (obj.material.map) obj.material.map.dispose();
          obj.material.dispose();
        }
      });
    };
  }, [autoRotate, showElectrons, showIons, showLabels, showCurrentFlow, currentSpeed]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Galvanic Cell - Class 11 Chemistry</CardTitle>
        <CardDescription>
          Electrochemistry: Zn-Cu Galvanic Cell demonstrating redox reactions, electron flow, and electrical energy generation.
          Visualize anode oxidation, cathode reduction, and ion migration through salt bridge.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div ref={mountRef} className="w-full h-96 bg-gray-100 rounded-lg" />

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="rounded-md border border-border bg-muted/30 p-4">
              <h4 className="font-semibold mb-3 text-primary">Controls</h4>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-rotate">Auto Rotate</Label>
                  <Switch 
                    id="auto-rotate" 
                    checked={autoRotate}
                    onCheckedChange={setAutoRotate}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-electrons">Show Electrons</Label>
                  <Switch 
                    id="show-electrons" 
                    checked={showElectrons}
                    onCheckedChange={(checked) => {
                      setShowElectrons(checked);
                      setShowCurrentFlow(checked);
                    }}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-ions">Show Ions</Label>
                  <Switch 
                    id="show-ions" 
                    checked={showIons}
                    onCheckedChange={setShowIons}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-labels">Show Labels</Label>
                  <Switch 
                    id="show-labels" 
                    checked={showLabels}
                    onCheckedChange={setShowLabels}
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="rounded-md border border-border bg-muted/30 p-4">
              <h4 className="font-semibold mb-3 text-primary">Parameters</h4>
              
              <div className="space-y-4">
                <div>
                  <Label className="block mb-2">Current Speed: {currentSpeed.toFixed(1)}</Label>
                  <Slider
                    value={[currentSpeed]}
                    onValueChange={(v) => setCurrentSpeed(v[0])}
                    min={0.5}
                    max={3}
                    step={0.1}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Theory and Meaning */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-md border border-border bg-muted/30 p-4">
            <h4 className="font-semibold mb-3 text-primary">Anode (Oxidation)</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Zinc electrode loses electrons (oxidation):
            </p>
            <p className="text-lg font-mono text-foreground my-2">
              Zn → Zn<sup>2+</sup> + 2e<sup>-</sup>
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Zinc atoms are oxidized to Zn2+ ions, releasing electrons into the external circuit.
            </p>
          </div>
          
          <div className="rounded-md border border-border bg-muted/30 p-4">
            <h4 className="font-semibold mb-3 text-primary">Cathode (Reduction)</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Copper electrode gains electrons (reduction):
            </p>
            <p className="text-lg font-mono text-foreground my-2">
              Cu<sup>2+</sup> + 2e<sup>-</sup> → Cu
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Cu2+ ions from solution gain electrons and deposit as copper metal on the cathode.
            </p>
          </div>
        </div>

        {/* Salt Bridge */}
        <div className="rounded-md border border-border bg-muted/30 p-4">
          <h4 className="font-semibold mb-3 text-primary">Salt Bridge Function</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The salt bridge (containing KNO3 gel) completes the circuit by allowing ion migration:
          </p>
          <ul className="text-sm text-muted-foreground mt-2 space-y-1 list-disc list-inside">
            <li><strong>K+ ions:</strong> Move towards cathode compartment to balance Cu2+ reduction</li>
            <li><strong>NO3- ions:</strong> Move towards anode compartment to balance Zn2+ formation</li>
            <li><strong>Purpose:</strong> Maintains electrical neutrality in both half-cells</li>
          </ul>
        </div>

        {/* Cell Notation */}
        <div className="rounded-md border border-border bg-muted/30 p-4">
          <h4 className="font-semibold mb-3 text-primary">Cell Notation</h4>
          <p className="text-lg font-mono text-foreground my-2 text-center">
            Zn | Zn<sup>2+</sup>(aq) || Cu<sup>2+</sup>(aq) | Cu
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed text-center">
            Single vertical line = phase boundary | Double vertical line = salt bridge
          </p>
        </div>

        {/* Labelled Parts */}
        <div className="rounded-md border border-border bg-muted/30 p-4">
          <h4 className="font-semibold mb-3 text-primary">Labelled Components</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-500" />
              <span className="text-sm">Zn Electrode (Anode -)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-500" />
              <span className="text-sm">Cu Electrode (Cathode +)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-400 rounded-full" />
              <span className="text-sm">Zn2+ Ions (Cations)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-400 rounded-full" />
              <span className="text-sm">SO42- Ions (Anions)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500" />
              <span className="text-sm">Salt Bridge (KNO3)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-400 rounded-full" />
              <span className="text-sm">Electrons (e-)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-white border" />
              <span className="text-sm">Voltmeter</span>
            </div>
            <div className="w-4 h-4 bg-red-500" />
            <span className="text-sm">Copper Wire</span>
          </div>
        </div>

        {/* Interactive Instructions */}
        <div className="rounded-md border border-border bg-muted/30 p-4">
          <h4 className="font-semibold mb-3 text-primary">Interactive Controls</h4>
          <ul className="space-y-2 text-sm">
            <li><strong>Left-click + drag:</strong> Rotate camera view</li>
            <li><strong>Right-click + drag:</strong> Pan the scene</li>
            <li><strong>Scroll:</strong> Zoom in/out</li>
            <li><strong>Auto-rotate:</strong> Toggle continuous camera rotation</li>
            <li><strong>Show Electrons:</strong> Visualize electron flow from anode to cathode</li>
            <li><strong>Show Ions:</strong> Display Zn2+ and SO42- ions in solutions</li>
            <li><strong>Show Labels:</strong> Toggle component labels</li>
            <li><strong>Current Speed:</strong> Control animation speed of particles</li>
          </ul>
        </div>

        {/* Educational Significance */}
        <div className="rounded-md border-2 border-green-500 bg-green-500/10 p-4">
          <h4 className="font-semibold mb-3 text-green-600">NEB/CDC Educational Significance</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            This 3D visualization aligns with <strong>Class 11 Chemistry - Electrochemistry</strong> as per National Examination Board (NEB) and Curriculum Development Centre (CDC) Nepal standards.
          </p>
          <ul className="text-sm text-muted-foreground mt-3 space-y-1 list-disc list-inside">
            <li>Demonstrates Daniel Cell (Zn-Cu galvanic cell) working principle</li>
            <li>Shows oxidation at anode and reduction at cathode</li>
            <li>Illustrates electron flow through external circuit</li>
            <li>Visualizes ion migration through salt bridge</li>
            <li>Explains generation of electrical energy from chemical energy</li>
            <li>Prepares students for practical experiments and board examinations</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default Class11ElectrochemistryGalvanicCell;
