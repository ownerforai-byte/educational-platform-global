"use client";

import { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { isWebGLAvailable } from "@/lib/webgl";

// Electromagnetic Induction 3D Visualization for Class 11
// Concept: Faraday's Law, Lenz's Law, Magnetic Flux through a Coil

export const Class11ElectromagneticInduction: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [showMagneticField, setShowMagneticField] = useState(true);
  const [showCurrent, setShowCurrent] = useState(false);
  const [magnetSpeed, setMagnetSpeed] = useState(1);
  const [fieldStrength, setFieldStrength] = useState(0.5);
  const [showLabels, setShowLabels] = useState(true);

  // Animation state
  const animationRef = useRef<number>();
  const magnetRef = useRef<THREE.Group | null>(null);
  const coilRef = useRef<THREE.Group | null>(null);
  const fieldLinesRef = useRef<THREE.LineSegments[]>([]);
  const currentArrowsRef = useRef<THREE.ArrowHelper[]>([]);

  useEffect(() => {
    if (!mountRef.current || !isWebGLAvailable()) return;

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let controls: any;
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

    // Orbit controls simulation
    controls = {
      autoRotate: autoRotate,
      autoRotateSpeed: 0.3,
      update: () => {},
      target: new THREE.Vector3(0, 0, 0)
    };

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7);
    scene.add(directionalLight);

    // Create base
    const baseGeometry = new THREE.BoxGeometry(12, 0.5, 8);
    const baseMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x1e293b,
      roughness: 0.8,
      metalness: 0.2
    });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = -1;
    scene.add(base);

    // Create magnet (U-shaped)
    const magnetGroup = new THREE.Group();
    
    // Magnet arms
    const armGeometry = new THREE.BoxGeometry(1, 1, 4);
    const magnetMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xef4444,
      roughness: 0.4,
      metalness: 0.6
    });
    
    const leftArm = new THREE.Mesh(armGeometry, magnetMaterial);
    leftArm.position.set(-1.5, 3, 0);
    magnetGroup.add(leftArm);
    
    const rightArm = new THREE.Mesh(armGeometry, magnetMaterial);
    rightArm.position.set(1.5, 3, 0);
    magnetGroup.add(rightArm);
    
    // Magnet connector
    const connectorGeometry = new THREE.BoxGeometry(3.5, 1, 1);
    const connector = new THREE.Mesh(connectorGeometry, magnetMaterial);
    connector.position.set(0, 3, 4);
    magnetGroup.add(connector);
    
    magnetGroup.position.set(0, 0, 0);
    magnetRef.current = magnetGroup;
    scene.add(magnetGroup);

    // Create coil (solenoid)
    const coilGroup = new THREE.Group();
    
    // Coil wire (helix)
    const coilRadius = 2;
    const coilHeight = 2;
    const coilTurns = 20;
    const coilPoints: THREE.Vector3[] = [];
    
    for (let i = 0; i <= coilTurns * 2; i++) {
      const t = i / (coilTurns * 2);
      const angle = t * Math.PI * 2 * coilTurns;
      const y = (t * 2 - 1) * coilHeight / 2;
      const x = Math.cos(angle) * coilRadius;
      const z = Math.sin(angle) * coilRadius;
      coilPoints.push(new THREE.Vector3(x, y, z));
    }
    
    const coilGeometry = new THREE.BufferGeometry().setFromPoints(coilPoints);
    const coilMaterial = new THREE.LineBasicMaterial({ 
      color: 0xfbbf24,
      linewidth: 3
    });
    const coilWire = new THREE.Line(coilGeometry, coilMaterial);
    coilGroup.add(coilWire);
    
    // Coil frame
    const frameGeometry = new THREE.TorusGeometry(coilRadius, 0.1, 8, 60);
    const frameMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x374151,
      roughness: 0.7
    });
    const coilFrame = new THREE.Mesh(frameGeometry, frameMaterial);
    coilFrame.rotation.x = Math.PI / 2;
    coilGroup.add(coilFrame);
    
    coilGroup.position.set(0, 0, 0);
    coilRef.current = coilGroup;
    scene.add(coilGroup);

    // Create galvanometer (simple representation)
    const galvanometerGroup = new THREE.Group();
    
    const meterBase = new THREE.Mesh(
      new THREE.BoxGeometry(3, 0.5, 1),
      new THREE.MeshStandardMaterial({ color: 0x64748b })
    );
    galvanometerGroup.add(meterBase);
    
    const meterNeedle = new THREE.Mesh(
      new THREE.BoxGeometry(1.5, 0.1, 0.1),
      new THREE.MeshStandardMaterial({ color: 0xef4444 })
    );
    meterNeedle.position.set(0, 0.4, 0);
    galvanometerGroup.add(meterNeedle);
    
    const meterGlass = new THREE.Mesh(
      new THREE.BoxGeometry(2.8, 1, 0.8),
      new THREE.MeshStandardMaterial({ 
        color: 0x94a3b8,
        transparent: true,
        opacity: 0.3
      })
    );
    meterGlass.position.set(0, 0.4, 0);
    galvanometerGroup.add(meterGlass);
    
    galvanometerGroup.position.set(0, 0, -5);
    scene.add(galvanometerGroup);

    // Connecting wires
    const wireGeometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, -2),
      new THREE.Vector3(0, 0, -4.5)
    ]);
    const wireMaterial = new THREE.LineBasicMaterial({ color: 0xfbbf24, linewidth: 2 });
    const wire = new THREE.Line(wireGeometry, wireMaterial);
    scene.add(wire);

    // CSS2D Renderer for labels
    try {
      const CSS2DRenderer = (await import("three/addons/renderers/CSS2DRenderer.js")).CSS2DRenderer;
      const CSS2DObject = (await import("three/addons/renderers/CSS2DRenderer.js")).CSS2DObject;
      
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

    // Create labels
    const createLabel = (text: string, position: THREE.Vector3, color = "#ffffff") => {
      if (!labelRenderer) return null;
      
      const labelDiv = document.createElement("div");
      labelDiv.className = "label";
      labelDiv.innerHTML = `<div style="background:rgba(0,0,0,0.8);padding:6px 10px;border-radius:6px;color:${color};font-weight:600;font-size:12px;border:1px solid ${color}20">${text}</div>`;
      
      const label = new (labelRenderer as any).CSS2DObject(labelDiv);
      label.position.set(position.x, position.y, position.z);
      scene.add(label);
      labelObjects.push(label);
      return label;
    };

    // Add labels for components
    if (showLabels) {
      createLabel("Bar Magnet (N-S)", new THREE.Vector3(0, 4, 0), "#ef4444");
      createLabel("Solenoid Coil", new THREE.Vector3(0, -0.5, 0), "#fbbf24");
      createLabel("Galvanometer", new THREE.Vector3(0, 1, -5), "#3b82f6");
      createLabel("Induced Current", new THREE.Vector3(0, 0.5, -3), "#22c55e");
    }

    // Magnetic field lines visualization
    const createMagneticField = () => {
      fieldLinesRef.current.forEach(line => scene.remove(line));
      fieldLinesRef.current = [];
      
      if (!showMagneticField) return;
      
      // Simplified magnetic field lines from magnet
      const fieldLineGeometry = new THREE.BufferGeometry();
      const points: THREE.Vector3[] = [];
      
      // North pole field lines
      for (let i = 0; i < 3; i++) {
        points.push(
          new THREE.Vector3(-1.5 + i * 1.5, 4, 0),
          new THREE.Vector3(-1.5 + i * 1.5, 1, 0),
          new THREE.Vector3(-1.5 + i * 1.5, -1, 0)
        );
      }
      
      fieldLineGeometry.setFromPoints(points);
      const fieldLineMaterial = new THREE.LineBasicMaterial({ 
        color: 0x3b82f6,
        linewidth: 2,
        transparent: true,
        opacity: 0.7
      });
      const fieldLines = new THREE.LineSegments(fieldLineGeometry, fieldLineMaterial);
      scene.add(fieldLines);
      fieldLinesRef.current.push(fieldLines);
    };

    createMagneticField();

    // Animation variables
    let magnetY = 3;
    let direction = -0.02 * magnetSpeed;
    let time = 0;

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      
      time += 0.01;
      
      // Move magnet up and down
      if (magnetRef.current) {
        magnetY += direction;
        if (magnetY > 4 || magnetY < 1) direction *= -1;
        magnetRef.current.position.y = magnetY;
      }
      
      // Update galvanometer needle based on magnet position
      if (galvanometerGroup && galvanometerGroup.children) {
        const needle = galvanometerGroup.children[1] as THREE.Mesh;
        if (needle) {
          // More deviation when magnet is moving through coil
          const deviation = Math.sin(time * 2) * 0.3;
          needle.rotation.z = deviation * (showCurrent ? 1 : 0);
        }
      }
      
      // Update magnetic field opacity based on strength
      fieldLinesRef.current.forEach(line => {
        (line.material as THREE.LineBasicMaterial).opacity = fieldStrength * 0.7;
      });
      
      controls.autoRotate = autoRotate;
      if (autoRotate) {
        camera.position.x = Math.cos(time * 0.3) * 8;
        camera.position.z = Math.sin(time * 0.3) * 8;
        camera.lookAt(0, 0, 0);
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
  }, [autoRotate, showMagneticField, showCurrent, magnetSpeed, fieldStrength, showLabels]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>🧲 Electromagnetic Induction - Class 11 Physics</CardTitle>
        <CardDescription>
          Faraday&apos;s Law and Lenz&apos;s Law: Moving a magnet through a coil induces an electric current.
          Visualize magnetic flux, induced EMF, and current direction in real-time.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div ref={mountRef} className="w-full h-96 bg-gray-100 rounded-lg" />

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="rounded-md border border-border bg-muted/30 p-4">
              <h4 className="font-semibold mb-3 text-primary">⚙️ Controls</h4>
              
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
                  <Label htmlFor="magnetic-field">Magnetic Field</Label>
                  <Switch 
                    id="magnetic-field" 
                    checked={showMagneticField}
                    onCheckedChange={(checked) => {
                      setShowMagneticField(checked);
                      setShowCurrent(checked);
                    }}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-current">Show Induced Current</Label>
                  <Switch 
                    id="show-current" 
                    checked={showCurrent}
                    onCheckedChange={setShowCurrent}
                    disabled={!showMagneticField}
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
              <h4 className="font-semibold mb-3 text-primary">⚡ Parameters</h4>
              
              <div className="space-y-4">
                <div>
                  <Label className="block mb-2">Magnet Speed: {magnetSpeed.toFixed(1)}</Label>
                  <Slider
                    value={[magnetSpeed]}
                    onValueChange={(v) => setMagnetSpeed(v[0])}
                    min={0.5}
                    max={3}
                    step={0.1}
                  />
                </div>
                
                <div>
                  <Label className="block mb-2">Field Strength: {fieldStrength.toFixed(1)}</Label>
                  <Slider
                    value={[fieldStrength]}
                    onValueChange={(v) => setFieldStrength(v[0])}
                    min={0.1}
                    max={1}
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
            <h4 className="font-semibold mb-3 text-primary">📚 Faraday&apos;s Law</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The induced EMF (ε) is proportional to the rate of change of magnetic flux (Φ):
            </p>
            <p className="text-lg font-mono text-foreground my-2">
              ε = -dΦ/dt
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Where Φ = B·A = BA cosθ (magnetic field × area × angle between field and normal to surface)
            </p>
          </div>
          
          <div className="rounded-md border border-border bg-muted/30 p-4">
            <h4 className="font-semibold mb-3 text-primary">📚 Lenz&apos;s Law</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The direction of induced current is always such as to oppose the change that produced it.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mt-2">
              <strong>Meaning:</strong> When you move the magnet DOWN through the coil, current flows in one direction. When you move it UP, current reverses direction.
            </p>
          </div>
        </div>

        {/* Labelled Parts */}
        <div className="rounded-md border border-border bg-muted/30 p-4">
          <h4 className="font-semibold mb-3 text-primary">🏷️ Labelled Components</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500" />
              <span className="text-sm">Bar Magnet (North & South Poles)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500" />
              <span className="text-sm">Solenoid Coil (Copper Wire)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500" />
              <span className="text-sm">Galvanometer (Current Detector)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500" />
              <span className="text-sm">Induced Current (Flow Direction)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-1 bg-blue-500" />
              <span className="text-sm">Magnetic Field Lines</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full" />
              <span className="text-sm">Electrons (Moving Charges)</span>
            </div>
          </div>
        </div>

        {/* Interactive Instructions */}
        <div className="rounded-md border border-border bg-muted/30 p-4">
          <h4 className="font-semibold mb-3 text-primary">🎮 Interactive Controls</h4>
          <ul className="space-y-2 text-sm">
            <li><strong>Left-click + drag:</strong> Rotate camera view</li>
            <li><strong>Right-click + drag:</strong> Pan the scene</li>
            <li><strong>Scroll:</strong> Zoom in/out</li>
            <li><strong>Auto-rotate:</strong> Toggle continuous camera rotation</li>
            <li><strong>Magnetic Field:</strong> Toggle visibility of field lines</li>
            <li><strong>Induced Current:</strong> Show current flow animation</li>
            <li><strong>Magnet Speed:</strong> Control magnet movement speed</li>
            <li><strong>Field Strength:</strong> Adjust magnetic field intensity</li>
          </ul>
        </div>

        {/* Educational Significance */}
        <div className="rounded-md border-2 border-green-500 bg-green-500/10 p-4">
          <h4 className="font-semibold mb-3 text-green-600">🎓 NEB/CDC Educational Significance</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            This 3D visualization aligns with <strong>Class 11 Physics - Electromagnetism</strong> as per National Examination Board (NEB) and Curriculum Development Centre (CDC) Nepal standards.
          </p>
          <ul className="text-sm text-muted-foreground mt-3 space-y-1 list-disc list-inside">
            <li>Demonstrates Faraday&apos;s Law of Electromagnetic Induction</li>
            <li>Illustrates Lenz&apos;s Law for current direction</li>
            <li>Shows practical application of magnetic flux concept</li>
            <li>Helps visualize abstract electromagnetic concepts</li>
            <li>Prepares students for practical examination experiments</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default Class11ElectromagneticInduction;
