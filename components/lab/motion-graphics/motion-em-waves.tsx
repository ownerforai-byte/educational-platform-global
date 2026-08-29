"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import * as THREE from "three";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Slider from "@/components/ui/slider";
import { isWebGLAvailable } from "@/lib/webgl";
import { createThreeScene, disposeThreeScene, bindResize, clearGroup, standardMaterial } from "@/components/lab/three-scene";

export const MotionGraphicsEMWaves: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [frequency, setFrequency] = useState(5);
  const [amplitude, setAmplitude] = useState(1);
  const [wavelength, setWavelength] = useState(2);
  const [showEField, setShowEFField] = useState(true);
  const [showBField, setShowBField] = useState(true);
  const [showPropagation, setShowPropagation] = useState(true);
  const [animationSpeed, setAnimationSpeed] = useState(1);

  // Calculate wave speed (c = lambda * f)
  const waveSpeed = useMemo(() => wavelength * frequency, [wavelength, frequency]);

  useEffect(() => {
    if (!mountRef.current || !isWebGLAvailable()) return;

    let ts: any = null;
    let unbind: (() => void) | null = null;
    let cancelled = false;
    let animationId: number;
    let time = 0;
    let labelRenderer: any = null;
    let labels: any[] = [];

    async function init() {
      try {
        const { createThreeScene, bindResize } = await import("@/components/lab/three-scene");
        
        ts = createThreeScene(mountRef.current!, {
          cameraPosition: new THREE.Vector3(0, 0, 15),
          autoRotate: false,
          background: 0x0a0a0a
        });
        
        unbind = bindResize(ts);

        // Add lights
        const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
        ts.scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(10, 20, 10);
        ts.scene.add(directionalLight);

        // Add axes
        const axes = new THREE.AxesHelper(10);
        ts.group.add(axes);

        // Create CSS2D Label Renderer for labels within 3D scene
        try {
          const { CSS2DRenderer } = await import("three/addons/renderers/CSS2DRenderer.js");
          labelRenderer = new CSS2DRenderer();
          labelRenderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
          labelRenderer.domElement.style.position = "absolute";
          labelRenderer.domElement.style.top = "0";
          labelRenderer.domElement.style.pointerEvents = "none";
          labelRenderer.domElement.style.zIndex = "10";
          mountRef.current.appendChild(labelRenderer.domElement);
        } catch (e) {
          console.log("CSS2DRenderer not available");
        }

        // Animation loop
        function animate() {
          if (cancelled) return;
          
          animationId = requestAnimationFrame(animate);
          
          time += 0.01 * animationSpeed;
          
          // Clear and rebuild scene
          clearGroup(ts.group);
          
          // Re-add axes
          ts.group.add(axes);
          
          // Clear previous labels
          labels.forEach(label => {
            if (label?.element?.parentNode) {
              label.element.parentNode.removeChild(label.element);
            }
          });
          labels = [];

          // Create propagation direction indicator
          const directionGeo = new THREE.ConeGeometry(0.2, 1, 16);
          const directionMat = standardMaterial(0x00ff00, { emissive: 0x00ff00, emissiveIntensity: 0.5 });
          const directionArrow = new THREE.Mesh(directionGeo, directionMat);
          directionArrow.position.set(0, 0, 10);
          directionArrow.rotation.x = Math.PI / 2;
          ts.group.add(directionArrow);

          // Add label to arrow
          if (labelRenderer) {
            const CSS2DObject = (THREE as any).CSS2DObject;
            const arrowLabel = new CSS2DObject(document.createElement("div"));
            arrowLabel.element.innerHTML = `<div style="background:rgba(0,255,0,0.8);padding:4px 8px;border-radius:4px;color:white;font-weight:600;font-size:10px">Propagation → c</div>`;
            arrowLabel.element.style.pointerEvents = "none";
            arrowLabel.position.set(0, 0, 11.5);
            directionArrow.add(arrowLabel);
            labels.push(arrowLabel);
          }
          
          // Field meaning labels
          if (labelRenderer) {
            const CSS2DObject = (THREE as any).CSS2DObject;
            
            // E-Field label
            if (showEField) {
              const eLabel = new CSS2DObject(document.createElement("div"));
              eLabel.element.innerHTML = `
                <div style="background:rgba(255,0,0,0.85);padding:6px 12px;border-radius:6px;color:white;font-size:11px;font-weight:600">
                  <div>🔴 E-Field: Electric Field</div>
                  <div style="font-size:9px;opacity:0.8">Oscillates Vertically (Y-axis)</div>
                </div>
              `;
              eLabel.element.style.pointerEvents = "none";
              eLabel.position.set(0, 7, -3);
              ts.group.add(eLabel);
              labels.push(eLabel);
            }

            // B-Field label
            if (showBField) {
              const bLabel = new CSS2DObject(document.createElement("div"));
              bLabel.element.innerHTML = `
                <div style="background:rgba(0,0,255,0.85);padding:6px 12px;border-radius:6px;color:white;font-size:11px;font-weight:600">
                  <div>🔵 B-Field: Magnetic Field</div>
                  <div style="font-size:9px;opacity:0.8">Oscillates Horizontally (X-axis)</div>
                </div>
              `;
              bLabel.element.style.pointerEvents = "none";
              bLabel.position.set(0, -5, -3);
              ts.group.add(bLabel);
              labels.push(bLabel);
            }
          }
          
          // Create E-field waves (vertical oscillation)
          if (showEField) {
            const ePoints: THREE.Vector3[] = [];
            for (let z = -10; z <= 10; z += 0.1) {
              const y = amplitude * Math.sin(2 * Math.PI * (z / wavelength - time * frequency));
              ePoints.push(new THREE.Vector3(0, y, z));
            }
            const eGeometry = new THREE.BufferGeometry().setFromPoints(ePoints);
            const eMaterial = new THREE.LineBasicMaterial({ 
              color: 0xff0000, 
              linewidth: 3 
            });
            const eLine = new THREE.Line(eGeometry, eMaterial);
            ts.group.add(eLine);

            // Add wave labels at peaks
            if (labelRenderer) {
              const CSS2DObject = (THREE as any).CSS2DObject;
              for (let z = -8; z <= 8; z += wavelength * 2) {
                const y = amplitude * Math.sin(2 * Math.PI * (z / wavelength - time * frequency));
                if (Math.abs(y) > 0.5) {
                  const peakLabel = new CSS2DObject(document.createElement("div"));
                  peakLabel.element.innerHTML = `<div style="background:rgba(255,0,0,0.8);padding:2px 6px;border-radius:3px;color:white;font-size:9px;font-weight:600">${y > 0 ? '📈 Crest' : '📉 Trough'}</div>`;
                  peakLabel.element.style.pointerEvents = "none";
                  peakLabel.position.set(0, y, z);
                  ts.group.add(peakLabel);
                  labels.push(peakLabel);
                }
              }
            }
          }
          
          // Create B-field waves (horizontal oscillation, perpendicular to E-field)
          if (showBField) {
            const bPoints: THREE.Vector3[] = [];
            for (let z = -10; z <= 10; z += 0.1) {
              const x = amplitude * Math.sin(2 * Math.PI * (z / wavelength - time * frequency));
              bPoints.push(new THREE.Vector3(x, 0, z));
            }
            const bGeometry = new THREE.BufferGeometry().setFromPoints(bPoints);
            const bMaterial = new THREE.LineBasicMaterial({ 
              color: 0x0000ff, 
              linewidth: 3 
            });
            const bLine = new THREE.Line(bGeometry, bMaterial);
            ts.group.add(bLine);
          }
          
          // Create propagation wavefront
          if (showPropagation) {
            const waveFrontGeometry = new THREE.SphereGeometry(0.15, 16, 16);
            const waveFrontMaterial = standardMaterial(0xffff00, { 
              emissive: 0xffff00, 
              emissiveIntensity: 0.8
            });
            const waveFront = new THREE.Mesh(waveFrontGeometry, waveFrontMaterial);
            waveFront.position.set(
              0, 
              amplitude * Math.sin(2 * Math.PI * (time * frequency)),
              10 * Math.sin(time * 0.5)
            );
            ts.group.add(waveFront);
            
            if (labelRenderer) {
              const CSS2DObject = (THREE as any).CSS2DObject;
              const frontLabel = new CSS2DObject(document.createElement("div"));
              frontLabel.element.innerHTML = `<div style="background:rgba(255,255,0,0.8);padding:3px 6px;border-radius:3px;color:black;font-size:9px;font-weight:600">🌊 Wavefront</div>`;
              frontLabel.element.style.pointerEvents = "none";
              frontLabel.position.set(
                0, 
                amplitude * Math.sin(2 * Math.PI * (time * frequency)) + 0.4,
                10 * Math.sin(time * 0.5)
              );
              waveFront.add(frontLabel);
              labels.push(frontLabel);
            }
          }
          
          // Add field vectors at sample points with labels
          if (labelRenderer) {
            const CSS2DObject = (THREE as any).CSS2DObject;
            for (let z = -8; z <= 8; z += 4) {
              const eValue = amplitude * Math.sin(2 * Math.PI * (z / wavelength - time * frequency));
              const bValue = amplitude * Math.sin(2 * Math.PI * (z / wavelength - time * frequency));
              
              // E-field vector (red)
              if (showEField) {
                const eVectorGeo = new THREE.ConeGeometry(0.08, Math.abs(eValue) * 0.4, 8);
                const eVectorMat = standardMaterial(0xff0000, { 
                  emissive: 0xff0000, 
                  emissiveIntensity: 0.6
                });
                const eVector = new THREE.Mesh(eVectorGeo, eVectorMat);
                eVector.position.set(0, eValue / 2, z);
                eVector.rotation.x = eValue > 0 ? 0 : Math.PI;
                ts.group.add(eVector);
                
                const vecLabel = new CSS2DObject(document.createElement("div"));
                vecLabel.element.innerHTML = `<div style="background:rgba(255,0,0,0.8);padding:2px 4px;border-radius:2px;color:white;font-size:8px">E</div>`;
                vecLabel.element.style.pointerEvents = "none";
                vecLabel.position.set(0, eValue / 2 + (eValue > 0 ? 0.3 : -0.3), z);
                ts.group.add(vecLabel);
                labels.push(vecLabel);
              }
              
              // B-field vector (blue)
              if (showBField) {
                const bVectorGeo = new THREE.ConeGeometry(0.08, Math.abs(bValue) * 0.4, 8);
                const bVectorMat = standardMaterial(0x0000ff, { 
                  emissive: 0x0000ff, 
                  emissiveIntensity: 0.6
                });
                const bVector = new THREE.Mesh(bVectorGeo, bVectorMat);
                bVector.position.set(bValue / 2, 0, z);
                bVector.rotation.x = Math.PI / 2;
                bVector.rotation.z = bValue > 0 ? 0 : Math.PI;
                ts.group.add(bVector);
                
                const vecLabel = new CSS2DObject(document.createElement("div"));
                vecLabel.element.innerHTML = `<div style="background:rgba(0,0,255,0.8);padding:2px 4px;border-radius:2px;color:white;font-size:8px">B</div>`;
                vecLabel.element.style.pointerEvents = "none";
                vecLabel.position.set(bValue / 2 + (bValue > 0 ? 0.3 : -0.3), 0, z);
                ts.group.add(vecLabel);
                labels.push(vecLabel);
              }
            }
          }
          
          ts.renderer.render(ts.scene, ts.camera);
          if (labelRenderer) labelRenderer.render(ts.scene, ts.camera);
        }
        
        animate();
      } catch (error) {
        console.error("Error initializing EM Waves animation:", error);
      }
    }

    init();

    return () => {
      cancelled = true;
      cancelAnimationFrame(animationId);
      if (unbind) unbind();
      disposeThreeScene(ts);
      // Clean up label renderer
      if (labelRenderer && labelRenderer.domElement?.parentNode) {
        labelRenderer.domElement.parentNode.removeChild(labelRenderer.domElement);
      }
      labels = [];
    };
  }, [frequency, amplitude, wavelength, showEField, showBField, showPropagation, animationSpeed]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <svg className="h-6 w-6 text-purple-500" viewBox="0 0 24 24" fill="none">
            <path d="M2 12h20M4 8h16M4 16h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Electromagnetic Waves
        </CardTitle>
        <CardDescription>
          3D visualization of EM wave propagation. Electric field (red) and magnetic field (blue) oscillate perpendicular to each other and to the direction of propagation. Both fields are mutually perpendicular and in phase.
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
          <Card className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/20">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4 text-center text-purple-400">📚 Meaning of Labels & Colors</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-red-500/10 rounded-lg">
                  <div className="w-8 h-2 bg-red-500 mx-auto mb-2 rounded"></div>
                  <div className="text-sm font-medium">Electric Field (E)</div>
                  <div className="text-xs text-muted-foreground">Vertical oscillation - Red color</div>
                </div>
                <div className="text-center p-3 bg-blue-500/10 rounded-lg">
                  <div className="w-8 h-2 bg-blue-500 mx-auto mb-2 rounded"></div>
                  <div className="text-sm font-medium">Magnetic Field (B)</div>
                  <div className="text-xs text-muted-foreground">Horizontal oscillation - Blue color</div>
                </div>
                <div className="text-center p-3 bg-green-500/10 rounded-lg">
                  <div className="text-green-500 text-xl mb-2">→</div>
                  <div className="text-sm font-medium">Propagation</div>
                  <div className="text-xs text-muted-foreground">Wave direction - z-axis</div>
                </div>
                <div className="text-center p-3 bg-yellow-500/10 rounded-lg">
                  <div className="text-yellow-500 text-xl mb-2">⚡</div>
                  <div className="text-sm font-medium">EM Wave</div>
                  <div className="text-xs text-muted-foreground">Transverse wave</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Controls */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="space-y-2">
              <Label htmlFor="frequency" className="text-sm font-medium">
                Frequency: {frequency.toFixed(1)} Hz
              </Label>
              <Slider
                id="frequency"
                min={1}
                max={10}
                step={0.5}
                value={[frequency]}
                onValueChange={(v) => setFrequency(v[0])}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="wavelength" className="text-sm font-medium">
                Wavelength: {wavelength.toFixed(1)} m
              </Label>
              <Slider
                id="wavelength"
                min={1}
                max={5}
                step={0.5}
                value={[wavelength]}
                onValueChange={(v) => setWavelength(v[0])}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="amplitude" className="text-sm font-medium">
                Amplitude: {amplitude.toFixed(1)}
              </Label>
              <Slider
                id="amplitude"
                min={0.5}
                max={2}
                step={0.1}
                value={[amplitude]}
                onValueChange={(v) => setAmplitude(v[0])}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="speed" className="text-sm font-medium">
                Wave Speed: {waveSpeed.toFixed(1)} m/s
              </Label>
              <div className="text-xs text-muted-foreground">
                c = λ × f
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="anim-speed" className="text-sm font-medium">
                Animation Speed: {animationSpeed.toFixed(1)}×
              </Label>
              <Slider
                id="anim-speed"
                min={0.1}
                max={2}
                step={0.1}
                value={[animationSpeed]}
                onValueChange={(v) => setAnimationSpeed(v[0])}
              />
            </div>
          </div>
          
          {/* Toggle Controls */}
          <div className="flex flex-wrap gap-3 pt-4 border-t">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showEFField}
                onChange={(e) => setShowEFField(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm">Electric Field</span>
            </label>
            
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showBField}
                onChange={(e) => setShowBField(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm">Magnetic Field</span>
            </label>
            
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showPropagation}
                onChange={(e) => setShowPropagation(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm">Propagation Wavefront</span>
            </label>
          </div>
          
          {/* Theory Information with Meanings */}
          <Card className="mt-6 bg-muted/50 border-dashed">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4 text-primary">🎓 Maxwell's Equations & EM Wave Theory</h3>
              <div className="space-y-4 text-sm">
                
                <div className="bg-blue-500/10 rounded-lg p-3">
                  <h4 className="font-medium text-blue-400 mb-2">📌 Meaning of Electromagnetic Waves:</h4>
                  <p>
                    Electromagnetic waves are <strong>transverse waves</strong> that consist of oscillating electric and magnetic fields that are <strong>perpendicular to each other and to the direction of wave propagation</strong>. They don't require a medium to travel and propagate at the speed of light (c ≈ 3×10⁸ m/s) in vacuum. This means they can travel through empty space.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-purple-500/10 rounded-lg p-3">
                    <h4 className="font-medium text-purple-400 mb-2">📐 Wave Equation:</h4>
                    <p className="font-mono text-purple-300">∇²E = μ₀ε₀ ∂²E/∂t²</p>
                    <p className="font-mono text-purple-300">∇²B = μ₀ε₀ ∂²B/∂t²</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      These are second-order partial differential equations describing how EM fields propagate through space and time. They show that EM waves are solutions to these equations.
                    </p>
                  </div>
                  
                  <div className="bg-green-500/10 rounded-lg p-3">
                    <h4 className="font-medium text-green-400 mb-2">⚡ Wave Speed:</h4>
                    <p className="font-mono text-green-300">c = 1/√(μ₀ε₀) ≈ 3 × 10⁸ m/s</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      The speed of EM waves in vacuum is a fundamental constant of nature, determined by the permeability (μ₀) and permittivity (ε₀) of free space. This is the speed of light.
                    </p>
                  </div>
                </div>
                
                <div className="bg-yellow-500/10 rounded-lg p-3">
                  <h4 className="font-medium text-yellow-400 mb-2">📊 Relationship:</h4>
                  <p className="font-mono text-yellow-300 text-center text-lg">c = λ × f</p>
                  <p className="text-sm mt-2">
                    <strong>c</strong> = speed of light (3×10⁸ m/s)<br/>
                    <strong>λ (lambda)</strong> = wavelength (distance between crests)<br/>
                    <strong>f</strong> = frequency (oscillations per second in Hz)<br/>
                    <strong>Meaning</strong>: For any EM wave, these three quantities are related. If you change frequency, wavelength adjusts to keep the product equal to c.
                  </p>
                </div>
                
                <div className="bg-cyan-500/10 rounded-lg p-3">
                  <h4 className="font-medium text-cyan-400 mb-2">🌈 EM Spectrum:</h4>
                  <p className="text-xs">
                    Radio → Microwave → Infrared → <strong className="text-cyan-400">Visible Light</strong> → UV → X-ray → Gamma ray
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    All are electromagnetic waves, differing only in frequency and wavelength. The visible light we see is just a small portion of the EM spectrum.
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
