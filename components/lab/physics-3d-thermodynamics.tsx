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

// Piston-Cylinder System (First Law of Thermodynamics)
const PistonCylinder3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [pistonHeight, setPistonHeight] = useState(5);
  const [gasTemperature, setGasTemperature] = useState(300);
  const [showProcess, setShowProcess] = useState<"isothermal" | "adiabatic" | "isobaric" | "isochoric">("isothermal");
  const [showWork, setShowWork] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  // Thermodynamic properties
  const cylinderRadius = 3;
  const pressure = 100; // kPa
  const volume = Math.PI * cylinderRadius * cylinderRadius * pistonHeight;
  const workDone = pressure * (volume / 1000); // kJ

  useEffect(() => {
    if (!mountRef.current || !isWebGLAvailable()) return;

    let ts: any = null;
    let unbind: (() => void) | null = null;
    let cancelled = false;

    async function init() {
      try {
        const { createThreeScene, bindResize } = await import("@/components/lab/three-scene");
        
        ts = createThreeScene(mountRef.current!, {
          cameraPosition: new THREE.Vector3(0, 10, 20),
          autoRotate: false,
          background: 0x081428
        });
        
        unbind = bindResize(ts);

        // Cylinder
        const cylinderGeo = new THREE.CylinderGeometry(cylinderRadius, cylinderRadius, 10, 32);
        const cylinderMat = standardMaterial(0x666666, { metalness: 0.7, roughness: 0.3 });
        const cylinder = new THREE.Mesh(cylinderGeo, cylinderMat);
        cylinder.position.y = -5; // Center at origin
        ts.group.add(cylinder);

        // Piston
        const pistonGeo = new THREE.CylinderGeometry(cylinderRadius - 0.1, cylinderRadius - 0.1, 0.5, 32);
        const pistonMat = standardMaterial(0x333333, { metalness: 0.8, roughness: 0.2 });
        const piston = new THREE.Mesh(pistonGeo, pistonMat);
        piston.position.y = pistonHeight - 2.25; // Adjust for height
        ts.group.add(piston);

        // Piston rod
        const rodGeo = new THREE.CylinderGeometry(0.3, 0.3, pistonHeight + 2, 16);
        const rodMat = standardMaterial(0x444444, { metalness: 0.8, roughness: 0.3 });
        const rod = new THREE.Mesh(rodGeo, rodMat);
        rod.position.y = pistonHeight + 1;
        ts.group.add(rod);

        // Gas particles (small spheres)
        const particles: THREE.Mesh[] = [];
        for (let i = 0; i < 50; i++) {
          const particleGeo = new THREE.SphereGeometry(0.1, 8, 8);
          const particleMat = standardMaterial(0xff4444, { emissive: 0xff4444, emissiveIntensity: 0.3 });
          const particle = new THREE.Mesh(particleGeo, particleMat);
          
          // Random position inside cylinder
          const r = Math.random() * (cylinderRadius - 0.5);
          const theta = Math.random() * Math.PI * 2;
          const x = r * Math.cos(theta);
          const z = r * Math.sin(theta);
          const y = -5 + Math.random() * pistonHeight;
          
          particle.position.set(x, y, z);
          ts.group.add(particle);
          particles.push(particle);
        }

        // Base
        const baseGeo = new THREE.CylinderGeometry(cylinderRadius + 0.5, cylinderRadius + 0.5, 0.5, 32);
        const baseMat = standardMaterial(0x222222, { metalness: 0.5, roughness: 0.5 });
        const base = new THREE.Mesh(baseGeo, baseMat);
        base.position.y = -10;
        ts.group.add(base);

        // Ambient light for better visibility
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        ts.scene.add(ambientLight);

        // Directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(10, 20, 10);
        directionalLight.castShadow = true;
        ts.scene.add(directionalLight);

        function animate() {
          if (cancelled) return;
          
          if (isAnimating) {
            // Animate piston movement
            const time = Date.now() * 0.001;
            const newHeight = 5 + Math.sin(time * 2) * 2;
            setPistonHeight(newHeight);
          }
          
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
  }, [pistonHeight, isAnimating]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Piston-Cylinder System (First Law)</CardTitle>
        <CardDescription>
          Thermodynamic system showing work done by gas expansion. 
          Adjust piston height to change volume and observe work done.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="aspect-[16/10] bg-black rounded-lg overflow-hidden" ref={mountRef} />
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="space-y-2">
            <Label>Piston Height: {pistonHeight.toFixed(1)} m</Label>
            <Slider 
              value={[pistonHeight]} 
              onValueChange={(v) => setPistonHeight(v[0])} 
              min={2} 
              max={10} 
              step={0.5}
            />
          </div>
          <div className="space-y-2">
            <Label>Temperature: {gasTemperature} K</Label>
            <Slider 
              value={[gasTemperature]} 
              onValueChange={(v) => setGasTemperature(v[0])} 
              min={200} 
              max={500} 
              step={10}
            />
          </div>
          <div className="space-y-2">
            <Label>Pressure: {pressure} kPa</Label>
            <Label>Volume: {volume.toFixed(1)} m³</Label>
          </div>
          <div className="space-y-2">
            <Label>Work: {workDone.toFixed(1)} kJ</Label>
            <Button variant={isAnimating ? "default" : "outline"} onClick={() => setIsAnimating(!isAnimating)} className="w-full">
              {isAnimating ? "Stop" : "Animate"}
            </Button>
          </div>
        </div>

        <div className="mt-4">
          <Label>Thermodynamic Process:</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
            <Button 
              variant={showProcess === "isothermal" ? "default" : "outline"} 
              onClick={() => setShowProcess("isothermal")}
              className="w-full"
            >
              Isothermal
            </Button>
            <Button 
              variant={showProcess === "adiabatic" ? "default" : "outline"} 
              onClick={() => setShowProcess("adiabatic")}
              className="w-full"
            >
              Adiabatic
            </Button>
            <Button 
              variant={showProcess === "isobaric" ? "default" : "outline"} 
              onClick={() => setShowProcess("isobaric")}
              className="w-full"
            >
              Isobaric
            </Button>
            <Button 
              variant={showProcess === "isochoric" ? "default" : "outline"} 
              onClick={() => setShowProcess("isochoric")}
              className="w-full"
            >
              Isochoric
            </Button>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
          <h4 className="font-semibold mb-2">First Law of Thermodynamics:</h4>
          <ul className="text-sm space-y-1">
            <li><strong>ΔU = Q - W</strong> (Change in internal energy = Heat added - Work done)</li>
            <li><strong>Isothermal:</strong> ΔU = 0, Q = W (Temperature constant)</li>
            <li><strong>Adiabatic:</strong> Q = 0, ΔU = -W (No heat transfer)</li>
            <li><strong>Isobaric:</strong> P = constant, W = PΔV</li>
            <li><strong>Isochoric:</strong> ΔV = 0, W = 0</li>
          </ul>
          <p className="text-sm mt-2">
            <strong>Work Done:</strong> W = P × ΔV (for constant pressure)
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

// Heat Engine (Carnot Cycle)
const HeatEngine3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [engineSpeed, setEngineSpeed] = useState(1);
  const [showPiston, setShowPiston] = useState(true);
  const [showFlywheel, setShowFlywheel] = useState(true);
  const [isAnimating, setIsAnimating] = useState(true);

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
          background: 0x111111
        });
        
        unbind = bindResize(ts);

        // Base
        const baseGeo = new THREE.BoxGeometry(20, 1, 10);
        const baseMat = standardMaterial(0x444444, { metalness: 0.6, roughness: 0.4 });
        const base = new THREE.Mesh(baseGeo, baseMat);
        base.position.y = -1;
        ts.group.add(base);

        // Cylinder
        const cylinderGeo = new THREE.CylinderGeometry(2, 2, 6, 32);
        const cylinderMat = standardMaterial(0x666666, { metalness: 0.7, roughness: 0.3 });
        const cylinder = new THREE.Mesh(cylinderGeo, cylinderMat);
        cylinder.position.set(0, 3, 0);
        ts.group.add(cylinder);

        // Piston
        const pistonGeo = new THREE.CylinderGeometry(1.8, 1.8, 0.5, 32);
        const pistonMat = standardMaterial(0x333333, { metalness: 0.8, roughness: 0.2 });
        const piston = new THREE.Mesh(pistonGeo, pistonMat);
        piston.position.y = 3 + 3; // Start at top
        ts.group.add(piston);

        // Connecting rod
        const rodGeo = new THREE.CylinderGeometry(0.2, 0.2, 4, 16);
        const rodMat = standardMaterial(0x555555, { metalness: 0.8, roughness: 0.3 });
        const rod = new THREE.Mesh(rodGeo, rodMat);
        rod.rotation.x = Math.PI / 4;
        rod.position.set(0, 5, 0);
        ts.group.add(rod);

        // Flywheel
        const flywheelGeo = new THREE.TorusGeometry(3, 0.5, 16, 48);
        const flywheelMat = standardMaterial(0x777777, { metalness: 0.8, roughness: 0.2 });
        const flywheel = new THREE.Mesh(flywheelGeo, flywheelMat);
        flywheel.rotation.x = Math.PI / 2;
        flywheel.position.set(0, 0, 5);
        ts.group.add(flywheel);

        // Crankshaft
        const crankGeo = new THREE.CylinderGeometry(0.3, 0.3, 6, 16);
        const crankMat = standardMaterial(0x666666, { metalness: 0.8, roughness: 0.3 });
        const crankshaft = new THREE.Mesh(crankGeo, crankMat);
        crankshaft.position.set(0, 0, 2);
        ts.group.add(crankshaft);

        // Animation
        let timeOffset = 0;
        function animate() {
          if (cancelled) return;
          
          if (isAnimating) {
            timeOffset += 0.01 * engineSpeed;
            
            // Animate piston (sinusoidal motion)
            const pistonY = 3 + 2.5 + Math.sin(timeOffset * 2) * 2.5;
            piston.position.y = pistonY;
            
            // Animate connecting rod
            rod.rotation.x = Math.PI / 4 + Math.sin(timeOffset * 2) * 0.4;
            rod.position.y = pistonY - 1;
            
            // Rotate flywheel
            flywheel.rotation.z = timeOffset * 2;
          }
          
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
  }, [engineSpeed, isAnimating, showPiston, showFlywheel]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Heat Engine (Carnot Cycle)</CardTitle>
        <CardDescription>
          3D visualization of a heat engine with piston, connecting rod, and flywheel. 
          Demonstrates conversion of thermal energy to mechanical work.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="aspect-[16/10] bg-black rounded-lg overflow-hidden" ref={mountRef} />
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          <div className="space-y-2">
            <Label>Engine Speed: {engineSpeed}</Label>
            <Slider 
              value={[engineSpeed]} 
              onValueChange={(v) => setEngineSpeed(v[0])} 
              min={0.1} 
              max={3} 
              step={0.1}
            />
          </div>
          <div className="space-y-2">
            <Label>Show Piston</Label>
            <Button variant={showPiston ? "default" : "outline"} onClick={() => setShowPiston(!showPiston)} className="w-full">
              {showPiston ? "Hide" : "Show"}
            </Button>
          </div>
          <div className="space-y-2">
            <Label>Show Flywheel</Label>
            <Button variant={showFlywheel ? "default" : "outline"} onClick={() => setShowFlywheel(!showFlywheel)} className="w-full">
              {showFlywheel ? "Hide" : "Show"}
            </Button>
          </div>
          <div className="space-y-2">
            <Label>Animation</Label>
            <Button variant={isAnimating ? "default" : "outline"} onClick={() => setIsAnimating(!isAnimating)} className="w-full">
              {isAnimating ? "Pause" : "Play"}
            </Button>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-amber-500/5 rounded-lg border border-amber-500/20">
          <h4 className="font-semibold mb-2">Carnot Engine Efficiency:</h4>
          <ul className="text-sm space-y-1">
            <li><strong>Efficiency:</strong> η = 1 - T₀/T₁ = (T₁ - T₀)/T₁</li>
            <li><strong>T₁:</strong> Temperature of hot reservoir</li>
            <li><strong>T₀:</strong> Temperature of cold reservoir</li>
            <li><strong>Work Done:</strong> W = Q₁ - Q₂</li>
            <li><strong>Q₁:</strong> Heat absorbed from hot reservoir</li>
            <li><strong>Q₂:</strong> Heat rejected to cold reservoir</li>
          </ul>
          <p className="text-sm mt-2">
            <strong>Carnot Theorem:</strong> No engine can be more efficient than a Carnot engine operating between the same two temperatures.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

// Thermodynamic Processes Comparison
const Processes3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [processType, setProcessType] = useState<"isothermal" | "adiabatic" | "isobaric" | "isochoric">("isothermal");

  useEffect(() => {
    if (!mountRef.current || !isWebGLAvailable()) return;

    let ts: any = null;
    let unbind: (() => void) | null = null;
    let cancelled = false;

    async function init() {
      try {
        const { createThreeScene, bindResize } = await import("@/components/lab/three-scene");
        
        ts = createThreeScene(mountRef.current!, {
          cameraPosition: new THREE.Vector3(0, 0, 30),
          autoRotate: false,
          background: 0x000000
        });
        
        unbind = bindResize(ts);

        // Create P-V diagram axes
        const axesHelper = new THREE.AxesHelper(10);
        ts.group.add(axesHelper);

        // Grid
        const gridHelper = new THREE.GridHelper(20, 20, 0x333333, 0x222222);
        ts.group.add(gridHelper);

        // Plot different processes
        function plotProcess() {
          // Clear existing plots
          ts.group.children = ts.group.children.filter((child: any) => 
            !(child instanceof THREE.Line) && !(child.name === "process")
          );

          const lineGeo = new THREE.BufferGeometry();
          const points: THREE.Vector3[] = [];

          if (processType === "isothermal") {
            // Isothermal: Hyperbola (PV = constant)
            for (let v = 1; v <= 10; v += 0.5) {
              const p = 10 / v;
              points.push(new THREE.Vector3(p - 5, v - 5, 0));
            }
          } else if (processType === "adiabatic") {
            // Adiabatic: PV^γ = constant (γ = 1.4)
            for (let v = 1; v <= 8; v += 0.5) {
              const p = 20 / Math.pow(v, 1.4);
              points.push(new THREE.Vector3(p - 5, v - 5, 0));
            }
          } else if (processType === "isobaric") {
            // Isobaric: Horizontal line (P = constant)
            for (let v = 1; v <= 10; v += 0.5) {
              points.push(new THREE.Vector3(5, v - 5, 0));
            }
          } else if (processType === "isochoric") {
            // Isochoric: Vertical line (V = constant)
            for (let p = 1; p <= 10; p += 0.5) {
              points.push(new THREE.Vector3(p - 5, 0, 0));
            }
          }

          lineGeo.setFromPoints(points);
          const lineMat = new THREE.LineBasicMaterial({ 
            color: processType === "isothermal" ? 0xff4444 : 
                   processType === "adiabatic" ? 0x4444ff :
                   processType === "isobaric" ? 0x44ff44 : 0xffff44,
            linewidth: 3
          });
          const line = new THREE.Line(lineGeo, lineMat);
          line.name = "process";
          ts.group.add(line);
        }

        plotProcess();

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
  }, [processType]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>P-V Diagram - Thermodynamic Processes</CardTitle>
        <CardDescription>
          Interactive P-V diagram showing different thermodynamic processes: 
          Isothermal (Red), Adiabatic (Blue), Isobaric (Green), Isochoric (Yellow).
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="aspect-[16/10] bg-black rounded-lg overflow-hidden" ref={mountRef} />
        
        <div className="mt-4">
          <Label>Select Process:</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
            <Button 
              variant={processType === "isothermal" ? "default" : "outline"} 
              onClick={() => setProcessType("isothermal")}
              className="w-full"
            >
              Isothermal
            </Button>
            <Button 
              variant={processType === "adiabatic" ? "default" : "outline"} 
              onClick={() => setProcessType("adiabatic")}
              className="w-full"
            >
              Adiabatic
            </Button>
            <Button 
              variant={processType === "isobaric" ? "default" : "outline"} 
              onClick={() => setProcessType("isobaric")}
              className="w-full"
            >
              Isobaric
            </Button>
            <Button 
              variant={processType === "isochoric" ? "default" : "outline"} 
              onClick={() => setProcessType("isochoric")}
              className="w-full"
            >
              Isochoric
            </Button>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
          <h4 className="font-semibold mb-2">Thermodynamic Processes:</h4>
          <ul className="text-sm space-y-2">
            <li>
              <strong className="text-red-500">Isothermal:</strong> PV = constant, ΔU = 0, Q = W
              <span className="text-xs text-muted-foreground">(Temperature constant)</span>
            </li>
            <li>
              <strong className="text-blue-500">Adiabatic:</strong> PV^γ = constant, Q = 0, ΔU = -W
              <span className="text-xs text-muted-foreground">(No heat transfer, γ = Cp/Cv)</span>
            </li>
            <li>
              <strong className="text-green-500">Isobaric:</strong> P = constant, W = PΔV
              <span className="text-xs text-muted-foreground">(Pressure constant)</span>
            </li>
            <li>
              <strong className="text-yellow-500">Isochoric:</strong> V = constant, W = 0, ΔU = Q
              <span className="text-xs text-muted-foreground">(Volume constant)</span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

// Main Thermodynamics Component
interface Thermodynamics3DProps {
  defaultTab?: string;
}

export const Physics3DThermodynamics: React.FC<Thermodynamics3DProps> = ({ defaultTab = "piston" }) => {
  return (
    <Tabs defaultValue={defaultTab} className="w-full">
      <TabsList className="flex-wrap">
        <TabsTrigger value="piston">Piston-Cylinder</TabsTrigger>
        <TabsTrigger value="engine">Heat Engine</TabsTrigger>
        <TabsTrigger value="processes">P-V Diagrams</TabsTrigger>
      </TabsList>
      
      <TabsContent value="piston" className="mt-4">
        <PistonCylinder3D />
      </TabsContent>
      
      <TabsContent value="engine" className="mt-4">
        <HeatEngine3D />
      </TabsContent>
      
      <TabsContent value="processes" className="mt-4">
        <Processes3D />
      </TabsContent>
    </Tabs>
  );
};

export default Physics3DThermodynamics;
