"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import * as THREE from "three";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Slider from "@/components/ui/slider";
import { isWebGLAvailable } from "@/lib/webgl";
import {
  disposeThreeScene,
  clearGroup,
  standardMaterial,
  type ThreeScene,
  createThreeScene,
  bindResize,
} from "@/components/lab/three-scene";

type ProcessType = "isothermal" | "adiabatic" | "isobaric" | "isochoric";

export const MotionGraphicsThermodynamics: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [processType, setProcessType] = useState<ProcessType>("isothermal");
  const [pistonPosition, setPistonPosition] = useState(5);
  const [temperature, setTemperature] = useState(300);
  const [volume, setVolume] = useState(5);
  const [pressure, setPressure] = useState(1);
  const [showPiston, setShowPiston] = useState(true);
  const [showGas, setShowGas] = useState(true);
  const [showPVDiagram, setShowPVDiagram] = useState(true);

  // Scene lifecycle - mount/unmount only
  useEffect(() => {
    if (!mountRef.current || !isWebGLAvailable()) return;
    const ts = createThreeScene(mountRef.current, {
          cameraPosition: new THREE.Vector3(0, 5, 20),
          autoRotate: true,
          autoRotateSpeed: 0.3,
          background: 0x0f0f23
        });
    tsRef.current = ts;
    const unbind = bindResize(ts);
    let rafId = 0;
    function animate() {
      rafId = requestAnimationFrame(animate);
      const time = performance.now() / 1000;
      updateRef.current?.(time);
      ts.controls.update();
      ts.renderer.render(ts.scene, ts.camera);
    }
    animate();
    return () => { cancelAnimationFrame(rafId); unbind(); disposeThreeScene(ts); tsRef.current = null; };
  }, []);

  // Rebuild 3D content on state change
  useEffect(() => {
    const ts = tsRef.current;
    if (!ts) return;
    clearGroup(ts.group);

let labels: any[] = [];
let labelRenderer: any = null;
let time = 0;
let animationId: number;

        // Add lights
        const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
        ts.scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(10, 20, 10);
        ts.scene.add(directionalLight);

        // Create CSS2D Label Renderer
        try {
          const { CSS2DRenderer } = await import("three/addons/renderers/CSS2DRenderer.js");
          labelRenderer = new CSS2DRenderer();
          labelRenderer.setSize(mountRef.current!.clientWidth, mountRef.current!.clientHeight);
          labelRenderer.domElement.style.position = "absolute";
          labelRenderer.domElement.style.top = "0";
          labelRenderer.domElement.style.pointerEvents = "none";
          labelRenderer.domElement.style.zIndex = "10";
          mountRef.current!.appendChild(labelRenderer.domElement);
        } catch {
          console.log("CSS2DRenderer not available");
        }

        // Animation loop

    updateRef.current = (time) => {
    
    animationId = requestAnimationFrame(animate);
    
    time += 0.016;
    
    // Clear and rebuild
    clearGroup(ts.group);
    
    // Clear previous labels
    labels.forEach(label => {
      if (label?.element?.parentNode) {
        label.element.parentNode.removeChild(label.element);
      }
    });
    labels = [];
    
    // Add main title label
    if (labelRenderer) {
      const CSS2DObject = (THREE as any).CSS2DObject;
      const titleLabel = new CSS2DObject(document.createElement("div"));
      titleLabel.element.innerHTML = `
        <div style="background:rgba(255,255,255,0.95);padding:10px 16px;border-radius:8px;color:black;font-weight:700;font-size:14px;border:2px solid #ef4444">
          <div>🔥 Thermodynamics</div>
          <div style="font-size:11px;color:#666">Process: ${processType.replace('-',' ').charAt(0).toUpperCase() + processType.replace('-',' ').slice(1)}</div>
        </div>
      `;
      titleLabel.element.style.pointerEvents = "none";
      titleLabel.position.set(0, 15, 0);
      ts.group.add(titleLabel);
      labels.push(titleLabel);
    }
    
    // Create cylinder (piston container)
    createCylinder(ts.group);
    
    // Create piston with labels
    if (showPiston) {
      createPiston(ts.group, time);
    }
    
    // Create gas particles with labels
    if (showGas) {
      createGasParticles(ts.group, time, temperature);
    }
    
    // Create PV diagram in corner with labels
    if (showPVDiagram) {
      createPVDiagram(ts.group);
    }
    
    // Add process info label
    if (labelRenderer) {
      const CSS2DObject = (THREE as any).CSS2DObject;
      const processInfo = {
        isothermal: "ΔT = 0 (Temperature constant)",
        adiabatic: "Q = 0 (No heat transfer)",
        isobaric: "ΔP = 0 (Pressure constant)",
        isochoric: "ΔV = 0 (Volume constant)"
      };
      const infoLabel = new CSS2DObject(document.createElement("div"));
      infoLabel.element.innerHTML = `
        <div style="background:rgba(139,92,246,0.85);padding:8px 14px;border-radius:6px;color:white;font-size:10px;font-weight:600">
          <div>ℹ️ ${processType.charAt(0).toUpperCase() + processType.slice(1)} Process</div>
          <div style="font-size:9px;opacity:0.9">${processInfo[processType]}</div>
        </div>
      `;
      infoLabel.element.style.pointerEvents = "none";
      infoLabel.position.set(0, -10, -12);
      ts.group.add(infoLabel);
      labels.push(infoLabel);
    }
    
    if (labelRenderer) labelRenderer.render(ts.scene, ts.camera);
    };
  }, [pistonPosition, temperature, showPiston, showGas, showPVDiagram]);


  // Calculate work done (W = PΔV)
  const workDone = useMemo(() => {
    return (pressure * volume).toFixed(2);
  }, [pressure, volume]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <svg className="h-6 w-6 text-red-500" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M2 17l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Advanced Thermodynamics
        </CardTitle>
        <CardDescription>
          3D simulation of thermodynamic processes: Isothermal, Adiabatic, Isobaric, and Isochoric with interactive P-V-T surfaces and labelled components.
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-6">
          {/* 3D Visualization */}
          <div 
            ref={mountRef}
            className="w-full h-96 sm:h-[500px] md:h-[600px] lg:h-[700px] rounded-lg border border-border bg-black/10 relative"
          />
          
          {/* Labels & Meanings Guide */}
          <Card className="bg-gradient-to-r from-red-500/10 to-blue-500/10 border-red-500/20">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4 text-center text-red-400">📚 Meaning of Labels & Colors</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                <div className="text-center p-3 bg-gray-500/10 rounded-lg">
                  <div className="w-8 h-2 bg-gray-500 mx-auto mb-2 rounded"></div>
                  <div className="text-sm font-medium">Cylinder</div>
                  <div className="text-xs text-muted-foreground">Container - Grey</div>
                </div>
                <div className="text-center p-3 bg-gray-500/10 rounded-lg">
                  <div className="w-8 h-2 bg-gray-600 mx-auto mb-2 rounded"></div>
                  <div className="text-sm font-medium">Piston</div>
                  <div className="text-xs text-muted-foreground">Movable - Dark Grey</div>
                </div>
                <div className="text-center p-3 bg-blue-500/10 rounded-lg">
                  <div className="text-blue-500 text-xl mb-2">🔵</div>
                  <div className="text-sm font-medium">Gas Particles</div>
                  <div className="text-xs text-muted-foreground">Ideal gas - Blue</div>
                </div>
                <div className="text-center p-3 bg-red-500/10 rounded-lg">
                  <div className="text-red-500 text-xl mb-2">⚪</div>
                  <div className="text-sm font-medium">Weight</div>
                  <div className="text-xs text-muted-foreground">Pressure - Red</div>
                </div>
                <div className="text-center p-3 bg-green-500/10 rounded-lg">
                  <div className="text-green-500 text-xl mb-2">📊</div>
                  <div className="text-sm font-medium">P-V Diagram</div>
                  <div className="text-xs text-muted-foreground">State visualization</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Process Selection */}
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <Button
                variant={processType === "isothermal" ? "default" : "outline"}
                onClick={() => setProcessType("isothermal")}
                className="flex-1"
              >
                Isothermal
              </Button>
              <Button
                variant={processType === "adiabatic" ? "default" : "outline"}
                onClick={() => setProcessType("adiabatic")}
                className="flex-1"
              >
                Adiabatic
              </Button>
              <Button
                variant={processType === "isobaric" ? "default" : "outline"}
                onClick={() => setProcessType("isobaric")}
                className="flex-1"
              >
                Isobaric
              </Button>
              <Button
                variant={processType === "isochoric" ? "default" : "outline"}
                onClick={() => setProcessType("isochoric")}
                className="flex-1"
              >
                Isochoric
              </Button>
            </div>
            
            {/* Parameter Controls */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="piston" className="text-sm font-medium">
                  Piston: {pistonPosition.toFixed(1)}
                </Label>
                <Slider
                  id="piston"
                  min={1}
                  max={10}
                  step={0.5}
                  value={[pistonPosition]}
                  onValueChange={(v) => setPistonPosition(v[0])}
                />
                <div className="text-xs text-muted-foreground">Controls volume</div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="temperature" className="text-sm font-medium">
                  Temperature: {temperature}K
                </Label>
                <Slider
                  id="temperature"
                  min={100}
                  max={1000}
                  step={10}
                  value={[temperature]}
                  onValueChange={(v) => setTemperature(v[0])}
                />
                <div className="text-xs text-muted-foreground">Particle speed</div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="volume" className="text-sm font-medium">
                  Volume: {volume}L
                </Label>
                <Slider
                  id="volume"
                  min={1}
                  max={10}
                  step={0.5}
                  value={[volume]}
                  onValueChange={(v) => setVolume(v[0])}
                />
                <div className="text-xs text-muted-foreground">Cylinder size</div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="pressure" className="text-sm font-medium">
                  Pressure: {pressure}atm
                </Label>
                <Slider
                  id="pressure"
                  min={0.5}
                  max={5}
                  step={0.1}
                  value={[pressure]}
                  onValueChange={(v) => setPressure(v[0])}
                />
                <div className="text-xs text-muted-foreground">Force on piston</div>
              </div>
            </div>
            
            {/* Process Info Display */}
            <div className="bg-muted/50 rounded-lg p-4">
              <h4 className="font-medium mb-3">Thermodynamic Process Information</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="text-center text-sm">
                  <div className="font-bold text-primary">
                    {processType === "isothermal" ? "ΔT = 0" : 
                     processType === "adiabatic" ? "Q = 0" :
                     processType === "isobaric" ? "ΔP = 0" : "ΔV = 0"}
                  </div>
                  <div className="text-muted-foreground">Condition</div>
                </div>
                <div className="text-center text-sm">
                  <div className="font-bold text-blue-500">{workDone}</div>
                  <div className="text-muted-foreground">Work (W = PΔV)</div>
                </div>
                <div className="text-center text-sm">
                  <div className="font-bold text-red-500">{temperature}K</div>
                  <div className="text-muted-foreground">Temperature</div>
                </div>
                <div className="text-center text-sm">
                  <div className="font-bold text-green-500">{volume}L</div>
                  <div className="text-muted-foreground">Volume</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Toggle Controls */}
          <div className="flex flex-wrap gap-3 pt-4 border-t">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showPiston}
                onChange={(e) => setShowPiston(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm">Show Piston</span>
            </label>
            
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showGas}
                onChange={(e) => setShowGas(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm">Show Gas Particles</span>
            </label>
            
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showPVDiagram}
                onChange={(e) => setShowPVDiagram(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm">Show PV Diagram</span>
            </label>
          </div>
          
          {/* Theory Information with Meanings */}
          <Card className="mt-6 bg-muted/50 border-dashed">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4 text-primary">🎓 Thermodynamics Laws with Meanings</h3>
              <div className="space-y-4 text-sm">
                
                <div className="bg-blue-500/10 rounded-lg p-3">
                  <h4 className="font-medium text-blue-400 mb-2">📌 What is Thermodynamics?</h4>
                  <p>
                    Thermodynamics is the study of <strong>heat, work, temperature, and energy</strong>. It explains how energy moves and changes form. The laws of thermodynamics govern all energy transformations in the universe, from engines to chemical reactions to biological systems.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-purple-500/10 rounded-lg p-3">
                    <h4 className="font-medium text-purple-400 mb-2">📐 Zeroth Law:</h4>
                    <p className="font-mono text-purple-300">If A = B and B = C, then A = C</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      <strong>Meaning:</strong> If two systems are in thermal equilibrium with a third, they are in equilibrium with each other. This law defines temperature as a property that determines thermal equilibrium.
                    </p>
                  </div>
                  
                  <div className="bg-green-500/10 rounded-lg p-3">
                    <h4 className="font-medium text-green-400 mb-2">⚡ First Law:</h4>
                    <p className="font-mono text-green-300">ΔU = Q - W</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      <strong>Meaning:</strong> Energy is conserved. The change in internal energy (ΔU) equals heat added to system (Q) minus work done by system (W). Energy cannot be created or destroyed, only transformed.
                    </p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-yellow-500/10 rounded-lg p-3">
                    <h4 className="font-medium text-yellow-400 mb-2">🔥 Second Law:</h4>
                    <p className="font-mono text-yellow-300">ΔS ≥ 0</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      <strong>Meaning:</strong> In any energy transfer, the total entropy (disorder) of a closed system always increases. Heat flows spontaneously from hot to cold, not the reverse. Natural processes are irreversible.
                    </p>
                  </div>
                  
                  <div className="bg-cyan-500/10 rounded-lg p-3">
                    <h4 className="font-medium text-cyan-400 mb-2">❄️ Third Law:</h4>
                    <p className="font-mono text-cyan-300">S → 0 as T → 0K</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      <strong>Meaning:</strong> As temperature approaches absolute zero, the entropy of a perfect crystal approaches zero. This is the lowest possible temperature, but it can never be exactly reached.
                    </p>
                  </div>
                </div>
                
                <div className="bg-orange-500/10 rounded-lg p-3">
                  <h4 className="font-medium text-orange-400 mb-2">💡 Ideal Gas Law:</h4>
                  <p className="font-mono text-orange-300 text-center text-lg">PV = nRT</p>
                  <p className="text-sm mt-2">
                    <strong>Meaning:</strong> For an ideal gas, Pressure × Volume = number of moles × gas constant × Temperature. This relates the four key properties of a gas.
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    <strong>P</strong> = Pressure, <strong>V</strong> = Volume, <strong>n</strong> = moles, <strong>R</strong> = 8.314 J/mol·K, <strong>T</strong> = Temperature (K)
                  </p>
                </div>
                
                <div className="bg-pink-500/10 rounded-lg p-3">
                  <h4 className="font-medium text-pink-400 mb-2">📊 Thermodynamic Processes:</h4>
                  <ul className="text-xs space-y-1">
                    <li><strong>Isothermal:</strong> Temperature constant. ΔT = 0</li>
                    <li><strong>Adiabatic:</strong> No heat transfer. Q = 0</li>
                    <li><strong>Isobaric:</strong> Pressure constant. ΔP = 0</li>
                    <li><strong>Isochoric:</strong> Volume constant. ΔV = 0</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};
