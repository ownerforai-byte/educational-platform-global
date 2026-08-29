"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import * as THREE from "three";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Slider from "@/components/ui/slider";
import { isWebGLAvailable } from "@/lib/webgl";
import { createThreeScene, disposeThreeScene, bindResize, standardMaterial } from "@/components/lab/three-scene";

export const Class11Thermodynamics: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [initialTemp, setInitialTemp] = useState(300);
  const [finalTemp, setFinalTemp] = useState(400);
  const [mass, setMass] = useState(1);
  const [specificHeat, setSpecificHeat] = useState(4.18);
  const [processType, setProcessType] = useState<"isobaric" | "isochoric" | "isothermal" | "adiabatic">("isobaric");
  const [showEnergy, setShowEnergy] = useState(true);

  // Calculated quantities
  const deltaT = useMemo(() => finalTemp - initialTemp, [initialTemp, finalTemp]);
  const heatAdded = useMemo(() => mass * specificHeat * deltaT, [mass, specificHeat, deltaT]);
  const workDone = useMemo(() => {
    if (processType === "isobaric") return 0.1 * mass * 8.314 * deltaT / 0.018; // Approximate
    if (processType === "isochoric") return 0;
    if (processType === "isothermal") return mass * 8.314 * initialTemp * Math.log(finalTemp / initialTemp) / 0.018;
    if (processType === "adiabatic") return -mass * specificHeat * deltaT / 4.186; // Approximate
    return 0;
  }, [processType, mass, deltaT, initialTemp, finalTemp]);
  const deltaU = useMemo(() => heatAdded - workDone, [heatAdded, workDone]);

  // Gas constant R = 8.314 J/(mol·K)
  // For water: specific heat ≈ 4.186 J/(g·°C)

  useEffect(() => {
    if (!mountRef.current || !isWebGLAvailable()) return;

    let ts: any = null;
    let unbind: (() => void) | null = null;
    let cancelled = false;

    async function init() {
      try {
        const { createThreeScene, bindResize } = await import("@/components/lab/three-scene");
        
        ts = createThreeScene(mountRef.current!, {
          cameraPosition: new THREE.Vector3(10, 8, 15),
          autoRotate: true,
          autoRotateSpeed: 0.2,
          background: 0x0f172a
        });
        
        unbind = bindResize(ts);

        // Ground
        const groundGeo = new THREE.PlaneGeometry(40, 40);
        const groundMat = standardMaterial(0x1e293b, { roughness: 0.8 });
        const ground = new THREE.Mesh(groundGeo, groundMat);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -0.01;
        ground.receiveShadow = true;
        ts.group.add(ground);

        const grid = new THREE.GridHelper(40, 80, 0x334155, 0x1e293b);
        ts.group.add(grid);

        // Piston-cylinder system
        const cylinderGeo = new THREE.CylinderGeometry(2, 2, 5, 32);
        const cylinderMat = standardMaterial(0x6366f1, { metalness: 0.5 });
        const cylinder = new THREE.Mesh(cylinderGeo, cylinderMat);
        cylinder.position.y = 2.5;
        cylinder.castShadow = true;
        cylinder.receiveShadow = true;
        ts.group.add(cylinder);

        // Piston
        const pistonGroup = new THREE.Group();
        const pistonGeo = new THREE.CylinderGeometry(1.9, 1.9, 0.5, 32);
        const pistonMat = standardMaterial(0xfbbf24, { metalness: 0.8, emissive: 0xfbbf24, emissiveIntensity: 0.2 });
        const piston = new THREE.Mesh(pistonGeo, pistonMat);
        piston.position.y = 5;
        piston.castShadow = true;
        pistonGroup.add(piston);

        // Piston rod
        const rodGeo = new THREE.CylinderGeometry(0.2, 0.2, 3, 16);
        const rodMat = standardMaterial(0xef4444, { metalness: 0.6 });
        const rod = new THREE.Mesh(rodGeo, rodMat);
        rod.position.y = 6.5;
        rod.castShadow = true;
        pistonGroup.add(rod);

        ts.group.add(pistonGroup);

        // Gas particles
        const particleGeo = new THREE.SphereGeometry(0.15, 16, 16);
        const particleMat = standardMaterial(0xffffff, { emissive: 0xffffff, emissiveIntensity: 0.8 });
        const particles: THREE.Mesh[] = [];
        const numParticles = 30;

        for (let i = 0; i < numParticles; i++) {
          const particle = new THREE.Mesh(particleGeo, particleMat);
          particle.position.set(
            (Math.random() - 0.5) * 3,
            Math.random() * 4 + 1,
            (Math.random() - 0.5) * 3
          );
          particle.castShadow = true;
          ts.group.add(particle);
          particles.push(particle);
        }

        // Temperature indicator
        const tempIndicator = new THREE.Group();
        const indicatorGeo = new THREE.CylinderGeometry(0.3, 0.3, 4, 16);
        const indicatorMat = standardMaterial(0x22c55e, { emissive: 0x22c55e, emissiveIntensity: 0.5 });
        const indicator = new THREE.Mesh(indicatorGeo, indicatorMat);
        indicator.position.set(-8, 2, 0);
        tempIndicator.add(indicator);
        ts.group.add(tempIndicator);

        // Energy bars
        const heatBarGeo = new THREE.BoxGeometry(0.5, heatAdded * 0.01, 0.5);
        const heatBarMat = standardMaterial(0xef4444, { transparent: true, opacity: 0.8 });
        const heatBar = new THREE.Mesh(heatBarGeo, heatBarMat);
        heatBar.position.set(-5, heatBarGeo.parameters.height / 2, 0);
        ts.group.add(heatBar);

        const workBarGeo = new THREE.BoxGeometry(0.5, Math.abs(workDone) * 0.01, 0.5);
        const workBarMat = standardMaterial(0x3b82f6, { transparent: true, opacity: 0.8 });
        const workBar = new THREE.Mesh(workBarGeo, workBarMat);
        workBar.position.set(-3, workBarGeo.parameters.height / 2, 0);
        ts.group.add(workBar);

        const deltaUBarGeo = new THREE.BoxGeometry(0.5, Math.abs(deltaU) * 0.01, 0.5);
        const deltaUBarMat = standardMaterial(0x22c55e, { transparent: true, opacity: 0.8 });
        const deltaUBar = new THREE.Mesh(deltaUBarGeo, deltaUBarMat);
        deltaUBar.position.set(-1, deltaUBarGeo.parameters.height / 2, 0);
        ts.group.add(deltaUBar);

        let startTime = performance.now();
        let pistonHeight = 5;

        function updateScene() {
          if (!ts) return;

          const elapsed = (performance.now() - startTime) / 1000;
          const time = elapsed;

          // Animate particles (random motion based on temperature)
          const tempFactor = finalTemp / initialTemp;
          particles.forEach(particle => {
            particle.position.x += (Math.random() - 0.5) * 0.02 * tempFactor;
            particle.position.y += (Math.random() - 0.5) * 0.02 * tempFactor;
            particle.position.z += (Math.random() - 0.5) * 0.02 * tempFactor;

            // Keep particles inside cylinder
            const r = Math.sqrt(particle.position.x * particle.position.x + particle.position.z * particle.position.z);
            if (r > 1.8) {
              particle.position.x *= 0.9;
              particle.position.z *= 0.9;
            }
            if (particle.position.y < 0.5) particle.position.y = 0.5;
            if (particle.position.y > pistonHeight - 0.2) particle.position.y = pistonHeight - 0.2;
          });

          // Animate piston based on process type
          if (processType === "isobaric") {
            // Volume changes, pressure constant
            pistonHeight = 5 + Math.sin(time * 0.5) * 1;
          } else if (processType === "isochoric") {
            // Volume constant
            pistonHeight = 5;
          } else if (processType === "isothermal") {
            // Temperature constant
            pistonHeight = 5 + Math.sin(time * 0.3) * 0.5;
          } else {
            // Adiabatic
            pistonHeight = 5 + Math.sin(time * 0.8) * 1.5;
          }

          pistonGroup.position.y = pistonHeight;
          rod.position.y = pistonHeight + 1.5;

          // Update temperature indicator height
          indicator.scale.y = finalTemp / 300;
          indicator.position.y = 2 + indicator.scale.y * 2;

          // Update energy bars
          heatBar.scale.y = Math.max(0.01, heatAdded * 0.01);
          heatBar.position.y = heatBar.scale.y / 2;
          
          workBar.scale.y = Math.max(0.01, Math.abs(workDone) * 0.01);
          workBar.position.y = workBar.scale.y / 2;
          
          deltaUBar.scale.y = Math.max(0.01, Math.abs(deltaU) * 0.01);
          deltaUBar.position.y = deltaUBar.scale.y / 2;

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
  }, [initialTemp, finalTemp, mass, specificHeat, processType, showEnergy, deltaT, heatAdded, workDone, deltaU]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Class 11 Thermodynamics</CardTitle>
        <CardDescription>
          Interactive 3D visualization of thermodynamic processes and the First Law of Thermodynamics.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div ref={mountRef} className="w-full h-96 bg-gray-100 rounded-lg" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <Label>Initial Temperature (K)</Label>
              <Slider min={200} max={500} step={10} value={[initialTemp]} onValueChange={(v) => setInitialTemp(v[0])} />
              <p className="text-sm text-gray-500">Current: {initialTemp} K</p>
            </div>
            <div>
              <Label>Final Temperature (K)</Label>
              <Slider min={200} max={500} step={10} value={[finalTemp]} onValueChange={(v) => setFinalTemp(v[0])} />
              <p className="text-sm text-gray-500">Current: {finalTemp} K</p>
            </div>
            <div>
              <Label>Mass (g)</Label>
              <Slider min={0.1} max={5} step={0.1} value={[mass]} onValueChange={(v) => setMass(v[0])} />
              <p className="text-sm text-gray-500">Current: {mass} g</p>
            </div>
            <div>
              <Label>Specific Heat (J/g·K)</Label>
              <Slider min={1} max={10} step={0.1} value={[specificHeat]} onValueChange={(v) => setSpecificHeat(v[0])} />
              <p className="text-sm text-gray-500">Current: {specificHeat} J/g·K</p>
            </div>
            <div>
              <Label>Process Type</Label>
              <div className="flex gap-2 mt-1">
                <button
                  onClick={() => setProcessType("isobaric")}
                  className={`px-3 py-2 rounded-md text-xs font-medium ${processType === 'isobaric' ? 'bg-primary/20 text-primary' : 'bg-muted/50 text-muted-foreground'}`}
                >
                  Isobaric
                </button>
                <button
                  onClick={() => setProcessType("isochoric")}
                  className={`px-3 py-2 rounded-md text-xs font-medium ${processType === 'isochoric' ? 'bg-primary/20 text-primary' : 'bg-muted/50 text-muted-foreground'}`}
                >
                  Isochoric
                </button>
                <button
                  onClick={() => setProcessType("isothermal")}
                  className={`px-3 py-2 rounded-md text-xs font-medium ${processType === 'isothermal' ? 'bg-primary/20 text-primary' : 'bg-muted/50 text-muted-foreground'}`}
                >
                  Isothermal
                </button>
                <button
                  onClick={() => setProcessType("adiabatic")}
                  className={`px-3 py-2 rounded-md text-xs font-medium ${processType === 'adiabatic' ? 'bg-primary/20 text-primary' : 'bg-muted/50 text-muted-foreground'}`}
                >
                  Adiabatic
                </button>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowEnergy(!showEnergy)}
                className={`px-3 py-2 rounded-md text-xs font-medium ${showEnergy ? 'bg-primary/20 text-primary' : 'bg-muted/50 text-muted-foreground'}`}
              >
                Energy Bars: {showEnergy ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-md border border-border bg-muted/30 p-3 text-sm space-y-2">
              <p><span className="font-semibold">Thermodynamic Process: {processType}</span></p>
              <p><strong>ΔT =</strong> {deltaT.toFixed(1)} K</p>
              <p className="text-red-600"><strong>Q =</strong> {heatAdded.toFixed(2)} J (Heat Added)</p>
              <p className="text-blue-600"><strong>W =</strong> {workDone.toFixed(2)} J (Work Done)</p>
              <p className="text-green-600"><strong>ΔU =</strong> {deltaU.toFixed(2)} J (Change in Internal Energy)</p>
            </div>

            <div>
              <h3 className="font-semibold">First Law of Thermodynamics (Class 11)</h3>
              <p className="text-sm mt-2 font-semibold">
                ΔU = Q - W
              </p>
              <p className="text-sm mt-2">
                The change in internal energy of a system equals the heat added to the system minus the work done by the system.
              </p>
              <div className="text-sm mt-3 space-y-2">
                <p><strong>ΔU (Delta U):</strong> Change in internal energy</p>
                <p><strong>Q:</strong> Heat energy transferred to/from the system</p>
                <p><strong>W:</strong> Work done by/on the system</p>
                <p><strong>Convention:</strong> Work done BY the system is positive; work done ON the system is negative</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold">Thermodynamic Processes</h3>
              <ul className="text-sm mt-2 list-disc pl-5 space-y-2">
                <li>
                  <strong>Isobaric Process:</strong> Pressure remains constant (ΔP = 0)
                  <p className="text-xs pl-4 text-muted-foreground">W = PΔV, Q = nC_pΔT, ΔU = nC_vΔT</p>
                </li>
                <li>
                  <strong>Isochoric Process:</strong> Volume remains constant (ΔV = 0)
                  <p className="text-xs pl-4 text-muted-foreground">W = 0, Q = ΔU = nC_vΔT</p>
                </li>
                <li>
                  <strong>Isothermal Process:</strong> Temperature remains constant (ΔT = 0)
                  <p className="text-xs pl-4 text-muted-foreground">ΔU = 0, Q = -W = nRT ln(V_f/V_i)</p>
                </li>
                <li>
                  <strong>Adiabatic Process:</strong> No heat exchange (Q = 0)
                  <p className="text-xs pl-4 text-muted-foreground">Q = 0, ΔU = -W, PV^γ = constant</p>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold">Key Thermodynamic Concepts</h3>
              <ul className="text-sm mt-2 list-disc pl-5 space-y-1">
                <li><strong>System:</strong> Portion of universe under study (open, closed, isolated)</li>
                <li><strong>Surroundings:</strong> Everything outside the system</li>
                <li><strong>State Variables:</strong> Pressure (P), Volume (V), Temperature (T), Number of moles (n)</li>
                <li><strong>Equation of State:</strong> PV = nRT (Ideal Gas Law)</li>
                <li><strong>Heat Capacity:</strong> C = ΔQ/ΔT, specific heat c = C/m</li>
                <li><strong>Molar Heat Capacity:</strong> C_v (at constant volume), C_p (at constant pressure)</li>
                <li><strong>Internal Energy:</strong> Total energy of all particles in a system</li>
                <li><strong>Heat:</strong> Energy transfer due to temperature difference</li>
                <li><strong>Work:</strong> Energy transfer by force through distance (W = ∫PdV)</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold">Specific Heat Capacities</h3>
              <div className="text-sm mt-2 space-y-1">
                <p><strong>Water:</strong> 4.186 J/g·K (liquid)</p>
                <p><strong>Ice:</strong> 2.093 J/g·K</p>
                <p><strong>Steam:</strong> 2.010 J/g·K</p>
                <p><strong>Air:</strong> 1.005 J/g·K (at constant pressure)</p>
                <p><strong>Copper:</strong> 0.385 J/g·K</p>
                <p><strong>Aluminum:</strong> 0.897 J/g·K</p>
              </div>
            </div>

            <div className="rounded-md border border-border bg-muted/30 p-3">
              <p className="text-xs text-muted-foreground">Legend:</p>
              <div className="flex items-center gap-4 mt-2 text-xs flex-wrap">
                <div className="flex items-center gap-1"><div className="w-3 h-3 bg-blue-500"></div><span>Cylinder</span></div>
                <div className="flex items-center gap-1"><div className="w-3 h-3 bg-yellow-400"></div><span>Piston</span></div>
                <div className="flex items-center gap-1"><div className="w-3 h-3 bg-red-500"></div><span>Piston Rod</span></div>
                <div className="flex items-center gap-1"><div className="w-2 h-2 bg-white rounded-full"></div><span>Gas Particles</span></div>
                <div className="flex items-center gap-1"><div className="w-3 h-3 bg-green-500"></div><span>Temp Indicator</span></div>
                <div className="flex items-center gap-1"><div className="w-2 h-4 bg-red-500"></div><span>Heat (Q)</span></div>
                <div className="flex items-center gap-1"><div className="w-2 h-4 bg-blue-500"></div><span>Work (W)</span></div>
                <div className="flex items-center gap-1"><div className="w-2 h-4 bg-green-500"></div><span>ΔU</span></div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Class11Thermodynamics;
