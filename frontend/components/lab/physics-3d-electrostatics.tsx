/* eslint-disable react/prop-types */
"use client";

import { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import { LiveArrow } from "@/components/lab/animated-arrow-helper";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { isWebGLAvailable } from "@/lib/webgl";
import { disposeThreeScene, standardMaterial } from "@/components/lab/three-scene";
import { CSS2DRenderer, CSS2DObject } from "three/addons/renderers/CSS2DRenderer.js";

// Electric Field Lines Component
const ElectricField3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [chargeValue, _setChargeValue] = useState(5);
  const [showFieldLines, setShowFieldLines] = useState(true);
  const [showEquipotential, setShowEquipotential] = useState(false);
  const [showLabels, setShowLabels] = useState(true);
  const [numFieldLines, setNumFieldLines] = useState(20);

  useEffect(() => {
    if (!mountRef.current || !isWebGLAvailable()) return;

    let ts: any = null;
    let unbind: (() => void) | null = null;
    let cancelled = false;
    let labelRenderer: CSS2DRenderer | null = null;
    let labels: CSS2DObject[] = [];
    let fieldLines: THREE.Line[] = [];

    async function init() {
      try {
        const { createThreeScene, bindResize } = await import("@/components/lab/three-scene");
        
        ts = createThreeScene(mountRef.current!, {
          cameraPosition: new THREE.Vector3(0, 10, 25),
          autoRotate: false,
          background: 0x000000
        });

        unbind = bindResize(ts);

        // CSS2D label layer (kept entirely separate from the WebGL canvas)
        const mount = mountRef.current!;
        labelRenderer = new CSS2DRenderer();
        labelRenderer.setSize(mount.clientWidth, mount.clientHeight);
        labelRenderer.domElement.style.position = "absolute";
        labelRenderer.domElement.style.top = "0";
        labelRenderer.domElement.style.left = "0";
        labelRenderer.domElement.style.pointerEvents = "none";
        labelRenderer.domElement.style.zIndex = "10";
        mount.appendChild(labelRenderer.domElement);

        const makeLabel = (text: string, color: string, position: THREE.Vector3): CSS2DObject => {
          const label = new CSS2DObject(document.createElement("div"));
          label.element.className = "label";
          label.element.innerHTML =
            `<div style="background:rgba(0,0,0,0.75);padding:3px 8px;border-radius:4px;` +
            `color:${color};font-weight:700;font-size:18px;pointer-events:none">${text}</div>`;
          label.position.copy(position);
          ts.group.add(label);
          return label;
        };

        if (showLabels) {
          const chargeLabelsCfg = [
            { position: new THREE.Vector3(0, 3, 0), text: "+Q", color: "#ff4444" },
            { position: new THREE.Vector3(12, 3, 0), text: "-Q", color: "#4444ff" }
          ];
          labels = chargeLabelsCfg.map((c) => makeLabel(c.text, c.color, c.position));
        }

        // Create positive charge (red sphere)
        const chargeGeo = new THREE.SphereGeometry(2, 32, 32);
        const chargeMat = standardMaterial(0xff4444, { emissive: 0xff4444, emissiveIntensity: 0.5 });
        const positiveCharge = new THREE.Mesh(chargeGeo, chargeMat);
        positiveCharge.position.set(0, 0, 0);
        ts.group.add(positiveCharge);

        // Create negative charge (blue sphere)
        const negativeChargeGeo = new THREE.SphereGeometry(2, 32, 32);
        const negativeChargeMat = standardMaterial(0x4444ff, { emissive: 0x4444ff, emissiveIntensity: 0.5 });
        const negativeCharge = new THREE.Mesh(negativeChargeGeo, negativeChargeMat);
        negativeCharge.position.set(12, 0, 0);
        ts.group.add(negativeCharge);

        // Ground plane
        const groundGeo = new THREE.PlaneGeometry(50, 50);
        const groundMat = standardMaterial(0x111122, { roughness: 0.8 });
        const ground = new THREE.Mesh(groundGeo, groundMat);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -10;
        ground.receiveShadow = true;
        ts.group.add(ground);

        // Animation loop
        function animate() {
          if (cancelled) return;
          
          // Update field lines based on charge value
          updateFieldLines();

          // Toggle the CSS2D label layer with the rest of the scene
          if (labelRenderer && labels.length) {
            labels.forEach((l) => { l.visible = showLabels; });
          }

          ts.controls.update();
          ts.renderer.render(ts.scene, ts.camera);
          if (labelRenderer) labelRenderer.render(ts.scene, ts.camera);
          requestAnimationFrame(animate);
        }

        function updateFieldLines() {
          // Dispose and remove existing field lines
          fieldLines.forEach(line => {
            ts.group.remove(line);
            line.geometry.dispose();
            (line.material as THREE.Material).dispose();
          });
          fieldLines = [];

          if (!showFieldLines) return;

          // Create field lines from positive to negative charge
          const numLines = numFieldLines;
          for (let i = 0; i < numLines; i++) {
            const lineGeo = new THREE.BufferGeometry();
            const points: THREE.Vector3[] = [];
            
            // Start from positive charge surface
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;
            const startX = Math.sin(phi) * Math.cos(theta) * 2;
            const startY = Math.sin(phi) * Math.sin(theta) * 2;
            const startZ = Math.cos(phi) * 2;
            
            points.push(new THREE.Vector3(startX, startY, startZ));
            
            // Curve towards negative charge
            for (let t = 0.1; t <= 1; t += 0.1) {
              const curveT = Math.pow(t, 0.7);
              const x = startX + (12 - startX) * curveT;
              const y = startY + (0 - startY) * curveT + Math.sin(t * Math.PI * 3) * 2 * (1 - t);
              const z = startZ + (0 - startZ) * curveT;
              points.push(new THREE.Vector3(x, y, z));
            }
            
            lineGeo.setFromPoints(points);
            const lineMat = new THREE.LineBasicMaterial({ 
              color: 0xffaa00, 
              transparent: true, 
              opacity: 0.6 
            });
            const line = new THREE.Line(lineGeo, lineMat);
            ts.group.add(line);
            fieldLines.push(line);
          }
        }

        // Start with field lines
        updateFieldLines();
        
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
      if (labelRenderer) {
        labels.forEach((l) => {
          l.element.remove?.();
        });
        labelRenderer.domElement?.remove();
        labelRenderer = null;
      }
    };
  }, [chargeValue, showFieldLines, showEquipotential, numFieldLines, showLabels]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Electric Field Lines - Point Charges</CardTitle>
        <CardDescription>
          Visualization of electric field lines between positive and negative point charges. 
          Field lines originate from positive charge (+Q) and terminate at negative charge (-Q).
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="aspect-[16/10] bg-black rounded-lg overflow-hidden" ref={mountRef} />
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="space-y-2">
            <Label>Field Lines: {numFieldLines}</Label>
            <Slider 
              value={[numFieldLines]} 
              onValueChange={(v) => setNumFieldLines(v[0])} 
              min={5} 
              max={50} 
              step={5}
            />
          </div>
          <div className="space-y-2">
            <Label>Show Field Lines</Label>
            <Button variant={showFieldLines ? "default" : "outline"} onClick={() => setShowFieldLines(!showFieldLines)} className="w-full">
              {showFieldLines ? "Hide" : "Show"}
            </Button>
          </div>
          <div className="space-y-2">
            <Label>Equipotential Surfaces</Label>
            <Button variant={showEquipotential ? "default" : "outline"} onClick={() => setShowEquipotential(!showEquipotential)} className="w-full">
              {showEquipotential ? "Hide" : "Show"}
            </Button>
          </div>
          <div className="space-y-2">
            <Label>Labels</Label>
            <Button variant={showLabels ? "default" : "outline"} onClick={() => setShowLabels(!showLabels)} className="w-full">
              {showLabels ? "Hide" : "Show"}
            </Button>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
          <h4 className="font-semibold mb-2">Key Concepts:</h4>
          <ul className="text-sm space-y-1">
            <li><strong className="text-primary">Electric Field Lines:</strong> Imaginary lines representing electric field direction. Density indicates field strength.</li>
            <li><strong className="text-primary">+Q (Positive Charge):</strong> Source of field lines. Red sphere.</li>
            <li><strong className="text-primary">-Q (Negative Charge):</strong> Sink of field lines. Blue sphere.</li>
            <li><strong className="text-primary">Equipotential Surfaces:</strong> Green spheres where potential is constant.</li>
            <li><strong className="text-primary">Field Formula:</strong> E = kQ/r², where k = 9×10⁹ Nm²/C²</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

// Coulomb's Law Visualization
const CoulombsLaw3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [charge1, setCharge1] = useState(5);
  const [charge2, setCharge2] = useState(-5);
  const [distance, setDistance] = useState(10);
  const [showForce, setShowForce] = useState(true);
  const [showVectors, setShowVectors] = useState(true);

  // Calculate Coulomb's force
  const k = 9e9;
  const forceMagnitude = Math.abs(k * charge1 * charge2 / (distance * distance));
  const forceDirection = charge1 * charge2 < 0 ? "Attractive" : "Repulsive";

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

        // Charge 1 (variable color based on sign)
        const charge1Geo = new THREE.SphereGeometry(1.5, 32, 32);
        const charge1Mat = standardMaterial(charge1 > 0 ? 0xff4444 : 0x4444ff, { emissive: charge1 > 0 ? 0xff4444 : 0x4444ff, emissiveIntensity: 0.5 });
        const charge1Mesh = new THREE.Mesh(charge1Geo, charge1Mat);
        charge1Mesh.position.set(-distance/2, 0, 0);
        ts.group.add(charge1Mesh);

        // Charge 2
        const charge2Geo = new THREE.SphereGeometry(1.5, 32, 32);
        const charge2Mat = standardMaterial(charge2 > 0 ? 0xff4444 : 0x4444ff, { emissive: charge2 > 0 ? 0xff4444 : 0x4444ff, emissiveIntensity: 0.5 });
        const charge2Mesh = new THREE.Mesh(charge2Geo, charge2Mat);
        charge2Mesh.position.set(distance/2, 0, 0);
        ts.group.add(charge2Mesh);

        // Force arrow
        let forceArrow: THREE.ArrowHelper | null = null;
        
        function updateForceArrow() {
          if (forceArrow) ts.group.remove(forceArrow);
          
          if (!showForce) return;
          
          const dir = new THREE.Vector3();
          if (charge1 * charge2 < 0) {
            // Attractive
            dir.subVectors(charge2Mesh.position, charge1Mesh.position).normalize();
          } else {
            // Repulsive
            dir.subVectors(charge1Mesh.position, charge2Mesh.position).normalize();
          }
          
          forceArrow = new LiveArrow(
            dir,
            charge1Mesh.position,
            forceMagnitude * 0.002,
            0xffff00,
            0.5,
            0.2
          );
          ts.group.add(forceArrow);
        }

        // Vector lines
        let vectorLines: THREE.Line[] = [];
        function updateVectors() {
          vectorLines.forEach(line => ts.group.remove(line));
          vectorLines = [];
          
          if (!showVectors) return;
          
          // Vector from charge1 to charge2
          const vecGeo = new THREE.BufferGeometry();
          const points = [
            new THREE.Vector3(-distance/2, 0, 0),
            new THREE.Vector3(distance/2, 0, 0)
          ];
          vecGeo.setFromPoints(points);
          const vecMat = new THREE.LineDashedMaterial({ color: 0xffffff, dashSize: 0.5, gapSize: 0.2 });
          const vecLine = new THREE.Line(vecGeo, vecMat);
          ts.group.add(vecLine);
          vectorLines.push(vecLine);
        }

        // Ground
        const groundGeo = new THREE.PlaneGeometry(50, 50);
        const groundMat = standardMaterial(0x081428, { roughness: 0.8 });
        const ground = new THREE.Mesh(groundGeo, groundMat);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -5;
        ground.receiveShadow = true;
        ts.group.add(ground);

        updateForceArrow();
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [charge1, charge2, distance, showForce, showVectors]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Coulomb's Law - Force Between Charges</CardTitle>
        <CardDescription>
          Interactive visualization of Coulomb's Law: F = k|q₁q₂|/r². 
          Adjust charges and distance to see force magnitude and direction.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="aspect-[16/10] bg-black rounded-lg overflow-hidden" ref={mountRef} />
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="space-y-2">
            <Label>Charge 1: {charge1} μC</Label>
            <Slider 
              value={[charge1]} 
              onValueChange={(v) => setCharge1(v[0])} 
              min={-10} 
              max={10} 
              step={1}
            />
          </div>
          <div className="space-y-2">
            <Label>Charge 2: {charge2} μC</Label>
            <Slider 
              value={[charge2]} 
              onValueChange={(v) => setCharge2(v[0])} 
              min={-10} 
              max={10} 
              step={1}
            />
          </div>
          <div className="space-y-2">
            <Label>Distance: {distance} m</Label>
            <Slider 
              value={[distance]} 
              onValueChange={(v) => setDistance(v[0])} 
              min={5} 
              max={20} 
              step={1}
            />
          </div>
          <div className="space-y-2">
            <Label>Force: {forceMagnitude.toExponential(2)} N</Label>
            <Label>{forceDirection}</Label>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          <Button variant={showForce ? "default" : "outline"} onClick={() => setShowForce(!showForce)} className="w-full">
            {showForce ? "Hide Force Arrow" : "Show Force Arrow"}
          </Button>
          <Button variant={showVectors ? "default" : "outline"} onClick={() => setShowVectors(!showVectors)} className="w-full">
            {showVectors ? "Hide Vector" : "Show Vector"}
          </Button>
        </div>
        
        <div className="mt-4 p-4 bg-amber-500/5 rounded-lg border border-amber-500/20">
          <h4 className="font-semibold mb-2">Coulomb's Law:</h4>
          <p className="text-sm">
            <strong>F = k |q₁ q₂| / r²</strong>
          </p>
          <ul className="text-sm mt-2 space-y-1">
            <li><strong>k:</strong> Coulomb's constant = 9 × 10⁹ Nm²/C²</li>
            <li><strong>q₁, q₂:</strong> Magnitudes of the two charges</li>
            <li><strong>r:</strong> Distance between charges</li>
            <li><strong>Attractive:</strong> When charges have opposite signs (-)</li>
            <li><strong>Repulsive:</strong> When charges have same signs (+)</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

// Electric Dipole Component
const ElectricDipole3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [dipoleLength, setDipoleLength] = useState(6);
  const [showField, setShowField] = useState(true);

  useEffect(() => {
    if (!mountRef.current || !isWebGLAvailable()) return;

    let ts: any = null;
    let unbind: (() => void) | null = null;
    let cancelled = false;

    async function init() {
      try {
        const { createThreeScene, bindResize } = await import("@/components/lab/three-scene");
        
        ts = createThreeScene(mountRef.current!, {
          cameraPosition: new THREE.Vector3(0, 10, 30),
          autoRotate: true,
          autoRotateSpeed: 0.3,
          background: 0x000000
        });
        
        unbind = bindResize(ts);

        // +q charge
        const posGeo = new THREE.SphereGeometry(1, 32, 32);
        const posMat = standardMaterial(0xff4444, { emissive: 0xff4444, emissiveIntensity: 0.5 });
        const posCharge = new THREE.Mesh(posGeo, posMat);
        posCharge.position.set(dipoleLength/2, 0, 0);
        ts.group.add(posCharge);

        // -q charge
        const negGeo = new THREE.SphereGeometry(1, 32, 32);
        const negMat = standardMaterial(0x4444ff, { emissive: 0x4444ff, emissiveIntensity: 0.5 });
        const negCharge = new THREE.Mesh(negGeo, negMat);
        negCharge.position.set(-dipoleLength/2, 0, 0);
        ts.group.add(negCharge);

        // Dipole axis (rod)
        const rodGeo = new THREE.CylinderGeometry(0.2, 0.2, dipoleLength, 32);
        const rodMat = standardMaterial(0x666666, { metalness: 0.8, roughness: 0.3 });
        const rod = new THREE.Mesh(rodGeo, rodMat);
        rod.rotation.x = Math.PI / 2;
        ts.group.add(rod);

        // Field lines
        const dipoleFieldLines: THREE.Line[] = [];
        function createFieldLines() {
          if (!showField) return;

          // Dispose and remove previous lines
          dipoleFieldLines.forEach(line => {
            ts.group.remove(line);
            line.geometry.dispose();
            (line.material as THREE.Material).dispose();
          });
          dipoleFieldLines.length = 0;

          const numLines = 30;
          for (let i = 0; i < numLines; i++) {
            const lineGeo = new THREE.BufferGeometry();
            const points: THREE.Vector3[] = [];
            
            // Start from positive charge
            const startX = dipoleLength/2 + Math.random() * 0.5 - 0.25;
            const startY = (Math.random() - 0.5) * 2;
            const startZ = (Math.random() - 0.5) * 2;
            points.push(new THREE.Vector3(startX, startY, startZ));
            
            // Curve to negative charge
            for (let t = 0.1; t <= 1; t += 0.1) {
              const curveT = Math.pow(t, 0.5);
              const x = startX + (-dipoleLength - startX) * curveT;
              const y = startY + Math.sin(t * Math.PI * 2) * 3 * (1 - t);
              const z = startZ + Math.cos(t * Math.PI) * 2 * (1 - t);
              points.push(new THREE.Vector3(x, y, z));
            }
            
            lineGeo.setFromPoints(points);
            const lineMat = new THREE.LineBasicMaterial({ color: 0x888888, transparent: true, opacity: 0.4 });
            const line = new THREE.Line(lineGeo, lineMat);
            dipoleFieldLines.push(line);
            ts.group.add(line);
          }
        }

        createFieldLines();

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
  }, [dipoleLength, showField]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Electric Dipole</CardTitle>
        <CardDescription>
          Two equal and opposite charges separated by a distance. 
          Field lines emerge from +q and terminate at -q.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="aspect-[16/10] bg-black rounded-lg overflow-hidden" ref={mountRef} />
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="space-y-2">
            <Label>Dipole Length: {dipoleLength} units</Label>
            <Slider 
              value={[dipoleLength]} 
              onValueChange={(v) => setDipoleLength(v[0])} 
              min={2} 
              max={10} 
              step={1}
            />
          </div>
          <div className="space-y-2">
            <Label>Show Field Lines</Label>
            <Button variant={showField ? "default" : "outline"} onClick={() => setShowField(!showField)} className="w-full">
              {showField ? "Hide" : "Show"}
            </Button>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
          <h4 className="font-semibold mb-2">Electric Dipole Properties:</h4>
          <ul className="text-sm space-y-1">
            <li><strong>Dipole Moment (p):</strong> p = q × d (C·m), where d is separation</li>
            <li><strong>Electric Field on Axis:</strong> E = 2kp / r³</li>
            <li><strong>Electric Field on Equator:</strong> E = kp / r³</li>
            <li><strong>Potential:</strong> V = kp cosθ / r²</li>
            <li><strong>Torque in Electric Field:</strong> τ = p × E</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

// Main Electrostatics Component
interface Electrostatics3DProps {
  defaultTab?: string;
}

export const Physics3DElectrostatics: React.FC<Electrostatics3DProps> = ({ defaultTab = "field" }) => {
  return (
    <Tabs defaultValue={defaultTab} className="w-full">
      <TabsList className="flex-wrap">
        <TabsTrigger value="field">Electric Field Lines</TabsTrigger>
        <TabsTrigger value="coulomb">Coulomb's Law</TabsTrigger>
        <TabsTrigger value="dipole">Electric Dipole</TabsTrigger>
      </TabsList>
      
      <TabsContent value="field" className="mt-4">
        <ElectricField3D />
      </TabsContent>
      
      <TabsContent value="coulomb" className="mt-4">
        <CoulombsLaw3D />
      </TabsContent>
      
      <TabsContent value="dipole" className="mt-4">
        <ElectricDipole3D />
      </TabsContent>
    </Tabs>
  );
};

export default Physics3DElectrostatics;
