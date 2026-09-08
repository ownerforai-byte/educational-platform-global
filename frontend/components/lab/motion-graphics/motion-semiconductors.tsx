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

type DopingType = "intrinsic" | "n-type" | "p-type";

export const MotionGraphicsSemiconductors: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [dopingType, setDopingType] = useState<DopingType>("intrinsic");
  const [temperature, setTemperature] = useState(300); // Kelvin
  const [voltage, setVoltage] = useState(0); // Volts
  const [showElectrons, setShowElectrons] = useState(true);
  const [showHoles, setShowHoles] = useState(true);
  const [showLattice, setShowLattice] = useState(true);
  const [showDopants, setShowDopants] = useState(true);

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
    
    // Create semiconductor lattice
    if (showLattice) {
      createLattice(ts.group);
    }
    
    // Create dopants with labels
    if (showDopants && dopingType !== "intrinsic") {
      createDopants(ts.group, dopingType);
    }
    
    // Create charge carriers with labels
    if (showElectrons || showHoles) {
      createChargeCarriers(ts.group, dopingType, voltage, temperature, time);
    }
    
    // Create p-n junction if needed
    if (voltage !== 0) {
      createPNJunction(ts.group, voltage);
    }
    
    // Add main title label
    if (labelRenderer) {
      const CSS2DObject = (THREE as any).CSS2DObject;
      const titleLabel = new CSS2DObject(document.createElement("div"));
      titleLabel.element.innerHTML = `
        <div style="background:rgba(255,255,255,0.95);padding:10px 16px;border-radius:8px;color:black;font-weight:700;font-size:14px;border:2px solid #3b82f6">
          <div>🔬 Semiconductor Physics</div>
          <div style="font-size:11px;color:#666">${dopingType === 'intrinsic' ? 'Intrinsic' : dopingType === 'n-type' ? 'n-Type (Donor)' : 'p-Type (Acceptor)'} Silicon</div>
        </div>
      `;
      titleLabel.element.style.pointerEvents = "none";
      titleLabel.position.set(0, 12, 0);
      ts.group.add(titleLabel);
      labels.push(titleLabel);
    }
    
    if (labelRenderer) labelRenderer.render(ts.scene, ts.camera);
    };
  }, [dopingType, temperature, voltage, showElectrons, showHoles, showLattice, showDopants]);


  const carrierConcentration = useMemo(() => {
    switch (dopingType) {
      case "n-type": return { electrons: "High", holes: "Low" };
      case "p-type": return { electrons: "Low", holes: "High" };
      default: return { electrons: "Moderate", holes: "Moderate" };
    }
  }, [dopingType]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <svg className="h-6 w-6 text-yellow-500" viewBox="0 0 24 24" fill="none">
            <rect x="4" y="6" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="2"/>
            <circle cx="9" cy="12" r="1" fill="currentColor"/>
            <circle cx="15" cy="12" r="1" fill="currentColor"/>
            <path d="M9 12h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Semiconductor Physics
        </CardTitle>
        <CardDescription>
          Interactive 3D visualization of semiconductor band structure, doping, and p-n junction operation with labelled components.
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
          <Card className="bg-gradient-to-r from-yellow-500/10 to-blue-500/10 border-yellow-500/20">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4 text-center text-yellow-400">📚 Meaning of Labels & Colors</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                <div className="text-center p-3 bg-gray-500/10 rounded-lg">
                  <div className="w-8 h-2 bg-gray-500 mx-auto mb-2 rounded"></div>
                  <div className="text-sm font-medium">Silicon (Si)</div>
                  <div className="text-xs text-muted-foreground">Lattice atoms - Grey</div>
                </div>
                <div className="text-center p-3 bg-red-500/10 rounded-lg">
                  <div className="w-8 h-2 bg-red-500 mx-auto mb-2 rounded"></div>
                  <div className="text-sm font-medium">Donor (P⁺)</div>
                  <div className="text-xs text-muted-foreground">n-Type doping - Red</div>
                </div>
                <div className="text-center p-3 bg-blue-500/10 rounded-lg">
                  <div className="w-8 h-2 bg-blue-500 mx-auto mb-2 rounded"></div>
                  <div className="text-sm font-medium">Acceptor (B⁻)</div>
                  <div className="text-xs text-muted-foreground">p-Type doping - Blue</div>
                </div>
                <div className="text-center p-3 bg-blue-500/10 rounded-lg">
                  <div className="text-blue-500 text-xl mb-2">⚡</div>
                  <div className="text-sm font-medium">Electron (e⁻)</div>
                  <div className="text-xs text-muted-foreground">Negative charge - Blue</div>
                </div>
                <div className="text-center p-3 bg-yellow-500/10 rounded-lg">
                  <div className="text-yellow-600 text-xl mb-2">⚪</div>
                  <div className="text-sm font-medium">Hole (h⁺)</div>
                  <div className="text-xs text-muted-foreground">Positive charge - Orange</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Doping Controls */}
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <Button
                variant={dopingType === "intrinsic" ? "default" : "outline"}
                onClick={() => setDopingType("intrinsic")}
                className="flex-1"
              >
                Intrinsic
              </Button>
              <Button
                variant={dopingType === "n-type" ? "default" : "outline"}
                onClick={() => setDopingType("n-type")}
                className="flex-1"
              >
                n-Type
              </Button>
              <Button
                variant={dopingType === "p-type" ? "default" : "outline"}
                onClick={() => setDopingType("p-type")}
                className="flex-1"
              >
                p-Type
              </Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="temperature" className="text-sm font-medium">
                  Temperature: {temperature}K
                </Label>
                <Slider
                  id="temperature"
                  min={100}
                  max={600}
                  step={10}
                  value={[temperature]}
                  onValueChange={(v) => setTemperature(v[0])}
                />
                <div className="text-xs text-muted-foreground">Higher temp = more carriers</div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="voltage" className="text-sm font-medium">
                  Voltage: {voltage}V
                </Label>
                <Slider
                  id="voltage"
                  min={-5}
                  max={5}
                  step={0.1}
                  value={[voltage]}
                  onValueChange={(v) => setVoltage(v[0])}
                />
                <div className="text-xs text-muted-foreground">{voltage > 0 ? 'Forward bias' : voltage < 0 ? 'Reverse bias' : 'No bias'}</div>
              </div>
            </div>
            
            {/* Carrier Concentration Display */}
            <div className="bg-muted/50 rounded-lg p-4">
              <h4 className="font-medium mb-3">Charge Carrier Concentration</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-500">{carrierConcentration.electrons}</div>
                  <div className="text-sm text-muted-foreground">Electrons (e⁻)</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-500">{carrierConcentration.holes}</div>
                  <div className="text-sm text-muted-foreground">Holes (h⁺)</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Toggle Controls */}
          <div className="flex flex-wrap gap-3 pt-4 border-t">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showElectrons}
                onChange={(e) => setShowElectrons(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm">Show Electrons</span>
            </label>
            
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showHoles}
                onChange={(e) => setShowHoles(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm">Show Holes</span>
            </label>
            
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showLattice}
                onChange={(e) => setShowLattice(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm">Show Lattice</span>
            </label>
            
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showDopants}
                onChange={(e) => setShowDopants(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm">Show Dopants</span>
            </label>
          </div>
          
          {/* Theory Information with Meanings */}
          <Card className="mt-6 bg-muted/50 border-dashed">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4 text-primary">🎓 Semiconductor Theory with Meanings</h3>
              <div className="space-y-4 text-sm">
                
                <div className="bg-blue-500/10 rounded-lg p-3">
                  <h4 className="font-medium text-blue-400 mb-2">📌 What is a Semiconductor?</h4>
                  <p>
                    A semiconductor is a material with electrical conductivity <strong>between that of a conductor and an insulator</strong>. At absolute zero, pure (intrinsic) semiconductors behave like insulators. As temperature increases, electrons gain energy and can jump to the conduction band, making the material conductive. This temperature-dependent behavior is the key characteristic of semiconductors.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-purple-500/10 rounded-lg p-3">
                    <h4 className="font-medium text-purple-400 mb-2">🧪 n-Type Semiconductor:</h4>
                    <p className="text-xs">
                      <strong>Meaning:</strong> "n" stands for negative, referring to the negative charge of electrons.<br/>
                      <strong>Doping:</strong> Adding pentavalent atoms (P, As, Sb) which have 5 valence electrons.<br/>
                      <strong>Effect:</strong> Extra electron becomes free, creating <strong>majority carriers (electrons)</strong> and fixed positive ions.<br/>
                      <strong>Conductivity:</strong> Increases dramatically because more free electrons are available for conduction.
                    </p>
                  </div>
                  
                  <div className="bg-orange-500/10 rounded-lg p-3">
                    <h4 className="font-medium text-orange-400 mb-2">🧪 p-Type Semiconductor:</h4>
                    <p className="text-xs">
                      <strong>Meaning:</strong> "p" stands for positive, referring to the positive charge of holes.<br/>
                      <strong>Doping:</strong> Adding trivalent atoms (B, Al, Ga) which have 3 valence electrons.<br/>
                      <strong>Effect:</strong> Creates electron deficiencies (holes) which act like positive charges, creating <strong>majority carriers (holes)</strong> and fixed negative ions.<br/>
                      <strong>Conductivity:</strong> Increases dramatically because more free holes are available for conduction.
                    </p>
                  </div>
                </div>
                
                <div className="bg-green-500/10 rounded-lg p-3">
                  <h4 className="font-medium text-green-400 mb-2">⚡ p-n Junction:</h4>
                  <p className="text-xs">
                    <strong>Meaning:</strong> When p-type and n-type semiconductors are joined, they form a p-n junction.<br/>
                    <strong>Depletion Region:</strong> At the junction, free electrons from n-side diffuse to p-side and recombine with holes, creating a region <strong>depleted of free charge carriers</strong>.<br/>
                    <strong>Forward Bias:</strong> Positive voltage on p-side, negative on n-side. Reduces depletion width, <strong>allows current to flow</strong>.<br/>
                    <strong>Reverse Bias:</strong> Negative voltage on p-side, positive on n-side. Increases depletion width, <strong>blocks current flow</strong>.
                  </p>
                </div>
                
                <div className="bg-yellow-500/10 rounded-lg p-3">
                  <h4 className="font-medium text-yellow-400 mb-2">💡 Applications:</h4>
                  <p className="text-xs">
                    Diodes, Transistors, Solar cells, LEDs, Integrated circuits - all rely on doped semiconductors and p-n junctions. The ability to control conductivity through doping is what makes modern electronics possible.
                  </p>
                </div>
                
                <div className="bg-cyan-500/10 rounded-lg p-3">
                  <h4 className="font-medium text-cyan-400 mb-2">📊 Key Formula:</h4>
                  <p className="font-mono text-cyan-300 text-center">nᵢ² = n₀ × p₀</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Law of mass action: In intrinsic semiconductor, the product of electron and hole concentrations is constant at a given temperature.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};
