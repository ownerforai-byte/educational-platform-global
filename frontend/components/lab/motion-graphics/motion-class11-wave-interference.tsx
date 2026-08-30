"use client";

import { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import { CSS2DObject, CSS2DRenderer } from "three/addons/renderers/CSS2DRenderer.js";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { isWebGLAvailable } from "@/lib/webgl";

// Wave Interference Motion Graphics for Class 11 Physics
// Concept: Wave Superposition, Constructive/Destructive Interference, Standing Waves

export const MotionClass11WaveInterference: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [showWave1, setShowWave1] = useState(true);
  const [showWave2, setShowWave2] = useState(true);
  const [showResultant, setShowResultant] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const [amplitude, setAmplitude] = useState(1);
  const [frequency, setFrequency] = useState(1);
  const [phaseDiff, setPhaseDiff] = useState(0);
  const [interferenceType, setInterferenceType] = useState("constructive");

  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!mountRef.current || !isWebGLAvailable()) return;

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let labelRenderer: any;
    let labelObjects: any[] = [];

    // Initialize scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f172a);

    camera = new THREE.PerspectiveCamera(75, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
    camera.position.set(0, 3, 8);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7);
    scene.add(directionalLight);

    // CSS2D Renderer for labels
    try {
      
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

    // Create base
    const baseGeometry = new THREE.BoxGeometry(20, 0.5, 15);
    const baseMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x1e293b,
      roughness: 0.8
    });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = -1;
    scene.add(base);

    // Create wave source 1
    const waveSource1 = new THREE.Mesh(
      new THREE.SphereGeometry(0.3, 32, 32),
      new THREE.MeshStandardMaterial({ color: 0x3b82f6 })
    );
    waveSource1.position.set(-4, 0, 0);
    scene.add(waveSource1);

    // Create wave source 2
    const waveSource2 = new THREE.Mesh(
      new THREE.SphereGeometry(0.3, 32, 32),
      new THREE.MeshStandardMaterial({ color: 0xef4444 })
    );
    waveSource2.position.set(4, 0, 0);
    scene.add(waveSource2);

    // Create wave lines for wave 1
    const waveLine1Group = new THREE.Group();
    scene.add(waveLine1Group);

    // Create wave lines for wave 2
    const waveLine2Group = new THREE.Group();
    scene.add(waveLine2Group);

    // Create resultant wave line
    const resultantLineGroup = new THREE.Group();
    scene.add(resultantLineGroup);

    // Add labels
    if (showLabels) {
      createLabel("Wave Source 1", new THREE.Vector3(-4, 1, 0), "#3b82f6");
      createLabel("Wave Source 2", new THREE.Vector3(4, 1, 0), "#ef4444");
      createLabel("Resultant Wave", new THREE.Vector3(0, 2, 0), "#22c55e");
      createLabel("Interference Pattern", new THREE.Vector3(0, 0, 0), "#fbbf24");
    }

    // Animation variables
    let time = 0;

    // Update wave visualizations
    const updateWaves = () => {
      // Clear previous waves
      while (waveLine1Group.children.length > 0) {
        waveLine1Group.remove(waveLine1Group.children[0]);
      }
      while (waveLine2Group.children.length > 0) {
        waveLine2Group.remove(waveLine2Group.children[0]);
      }
      while (resultantLineGroup.children.length > 0) {
        resultantLineGroup.remove(resultantLineGroup.children[0]);
      }

      const points1: THREE.Vector3[] = [];
      const points2: THREE.Vector3[] = [];
      const pointsR: THREE.Vector3[] = [];

      for (let x = -8; x <= 8; x += 0.2) {
        const t = time * frequency * 2 * Math.PI;
        const wave1 = showWave1 ? amplitude * Math.sin(t + x * 0.5 + phaseDiff) : 0;
        const wave2 = showWave2 ? amplitude * Math.sin(t + x * 0.5) : 0;
        const resultant = wave1 + wave2;

        points1.push(new THREE.Vector3(x, wave1 * 2, 0));
        points2.push(new THREE.Vector3(x, wave2 * 2, 0));
        pointsR.push(new THREE.Vector3(x, resultant * 2, 0));
      }

      if (showWave1) {
        const wave1Line = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(points1),
          new THREE.LineBasicMaterial({ color: 0x3b82f6, linewidth: 2, transparent: true, opacity: 0.8 })
        );
        waveLine1Group.add(wave1Line);
      }

      if (showWave2) {
        const wave2Line = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(points2),
          new THREE.LineBasicMaterial({ color: 0xef4444, linewidth: 2, transparent: true, opacity: 0.8 })
        );
        waveLine2Group.add(wave2Line);
      }

      if (showResultant) {
        const resultantLine = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(pointsR),
          new THREE.LineBasicMaterial({ color: 0x22c55e, linewidth: 3 })
        );
        resultantLineGroup.add(resultantLine);
      }
    };

    updateWaves();

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      
      time += 0.01;
      
      // Update waves
      updateWaves();

      // Auto rotate camera
      if (autoRotate) {
        camera.position.x = Math.cos(time * 0.1) * 10;
        camera.position.z = Math.sin(time * 0.1) * 10;
        camera.lookAt(0, 0, 0);
      }

      // Pulsate sources
      waveSource1.scale.set(1, 1, 1);
      waveSource2.scale.set(1, 1, 1);
      
      if (showWave1) {
        waveSource1.scale.set(
          1 + Math.sin(time * 3) * 0.1,
          1 + Math.sin(time * 3) * 0.1,
          1 + Math.sin(time * 3) * 0.1
        );
      }
      if (showWave2) {
        waveSource2.scale.set(
          1 + Math.sin(time * 3 + phaseDiff) * 0.1,
          1 + Math.sin(time * 3 + phaseDiff) * 0.1,
          1 + Math.sin(time * 3 + phaseDiff) * 0.1
        );
      }

      renderer.render(scene, camera);
      if (labelRenderer) labelRenderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return;
      
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
      if (labelRenderer) {
        labelRenderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
        if (labelRenderer && labelRenderer.domElement) {
          mountRef.current.removeChild(labelRenderer.domElement);
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
  }, [autoRotate, showWave1, showWave2, showResultant, showLabels, amplitude, frequency, phaseDiff, interferenceType]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Wave Interference - Class 11 Physics</CardTitle>
        <CardDescription>
          Motion Graphics: Visualize wave superposition and interference patterns in real-time.
          Explore constructive and destructive interference, standing waves, and phase differences.
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
                  <Label htmlFor="show-wave1">Wave Source 1</Label>
                  <Switch 
                    id="show-wave1" 
                    checked={showWave1}
                    onCheckedChange={setShowWave1}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-wave2">Wave Source 2</Label>
                  <Switch 
                    id="show-wave2" 
                    checked={showWave2}
                    onCheckedChange={setShowWave2}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-resultant">Show Resultant</Label>
                  <Switch 
                    id="show-resultant" 
                    checked={showResultant}
                    onCheckedChange={setShowResultant}
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
                  <Label className="block mb-2">Amplitude: {amplitude.toFixed(1)}</Label>
                  <Slider
                    value={[amplitude]}
                    onValueChange={(v) => setAmplitude(v[0])}
                    min={0.1}
                    max={2}
                    step={0.1}
                  />
                </div>
                
                <div>
                  <Label className="block mb-2">Frequency: {frequency.toFixed(1)}</Label>
                  <Slider
                    value={[frequency]}
                    onValueChange={(v) => setFrequency(v[0])}
                    min={0.5}
                    max={3}
                    step={0.1}
                  />
                </div>
                
                <div>
                  <Label className="block mb-2">Phase Difference: {phaseDiff.toFixed(1)}π</Label>
                  <Slider
                    value={[phaseDiff]}
                    onValueChange={(v) => setPhaseDiff(v[0])}
                    min={0}
                    max={2}
                    step={0.1}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interference Type Selection */}
        <div className="rounded-md border border-border bg-muted/30 p-4">
          <h4 className="font-semibold mb-3 text-primary">Interference Types</h4>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={interferenceType === "constructive" ? "default" : "outline"}
              onClick={() => {
                setInterferenceType("constructive");
                setPhaseDiff(0);
              }}
            >
              Constructive (φ = 0)
            </Button>
            <Button
              variant={interferenceType === "destructive" ? "default" : "outline"}
              onClick={() => {
                setInterferenceType("destructive");
                setPhaseDiff(1);
              }}
            >
              Destructive (φ = π)
            </Button>
            <Button
              variant={interferenceType === "partial" ? "default" : "outline"}
              onClick={() => {
                setInterferenceType("partial");
                setPhaseDiff(0.5);
              }}
            >
              Partial (φ = π/2)
            </Button>
          </div>
        </div>

        {/* Theory and Meaning */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-md border border-border bg-muted/30 p-4">
            <h4 className="font-semibold mb-3 text-primary">Constructive Interference</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              When two waves are in phase (phase difference = 0 or 2π):
            </p>
            <p className="text-lg font-mono text-foreground my-2">
              A<sub>resultant</sub> = A<sub>1</sub> + A<sub>2</sub>
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              <strong>Result:</strong> Maximum amplitude at all points (bright fringes in light)
            </p>
          </div>
          
          <div className="rounded-md border border-border bg-muted/30 p-4">
            <h4 className="font-semibold mb-3 text-primary">Destructive Interference</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              When two waves are out of phase (phase difference = π):
            </p>
            <p className="text-lg font-mono text-foreground my-2">
              A<sub>resultant</sub> = |A<sub>1</sub> - A<sub>2</sub>|
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              <strong>Result:</strong> Minimum or zero amplitude (dark fringes in light)
            </p>
          </div>
        </div>

        {/* Standing Waves */}
        <div className="rounded-md border border-border bg-muted/30 p-4">
          <h4 className="font-semibold mb-3 text-primary">Standing Waves</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            When two identical waves travel in opposite directions, they form standing waves:
          </p>
          <ul className="text-sm text-muted-foreground mt-2 space-y-1 list-disc list-inside">
            <li><strong>Nodes:</strong> Points of zero displacement (destructive interference)</li>
            <li><strong>Antinodes:</strong> Points of maximum displacement (constructive interference)</li>
            <li><strong>Formula:</strong> y = 2A cos(kx) sin(ωt)</li>
            <li><strong>Wavelength:</strong> λ = 2L/n (for string fixed at both ends)</li>
          </ul>
        </div>

        {/* Labelled Parts */}
        <div className="rounded-md border border-border bg-muted/30 p-4">
          <h4 className="font-semibold mb-3 text-primary">Labelled Components</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500" />
              <span className="text-sm">Wave Source 1 (Blue)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500" />
              <span className="text-sm">Wave Source 2 (Red)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-1 bg-blue-500" />
              <span className="text-sm">Wave 1 Propagation</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-1 bg-red-500" />
              <span className="text-sm">Wave 2 Propagation</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-1 bg-green-500" />
              <span className="text-sm">Resultant Wave</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-sm">Antinode (Max Displacement)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gray-500 rounded-full" />
              <span className="text-sm">Node (Zero Displacement)</span>
            </div>
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
            <li><strong>Wave Sources:</strong> Toggle individual wave sources</li>
            <li><strong>Resultant:</strong> Show/hide the combined wave pattern</li>
            <li><strong>Amplitude:</strong> Adjust wave height</li>
            <li><strong>Frequency:</strong> Adjust wave speed</li>
            <li><strong>Phase Difference:</strong> Adjust phase shift between waves</li>
            <li><strong>Interference Types:</strong> Quick preset for constructive/destructive/partial</li>
          </ul>
        </div>

        {/* Educational Significance */}
        <div className="rounded-md border-2 border-green-500 bg-green-500/10 p-4">
          <h4 className="font-semibold mb-3 text-green-600">NEB/CDC Educational Significance</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            This motion graphics visualization aligns with <strong>Class 11 Physics - Wave Motion and Sound</strong> as per National Examination Board (NEB) and Curriculum Development Centre (CDC) Nepal standards.
          </p>
          <ul className="text-sm text-muted-foreground mt-3 space-y-1 list-disc list-inside">
            <li>Demonstrates principle of superposition of waves</li>
            <li>Visualizes constructive and destructive interference</li>
            <li>Explains standing wave formation</li>
            <li>Shows relationship between phase difference and interference type</li>
            <li>Connects to Young double-slit experiment</li>
            <li>Prepares students for wave optics and sound wave analysis</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default MotionClass11WaveInterference;
