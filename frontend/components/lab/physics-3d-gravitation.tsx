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

// Gravitation 3D Component showing orbital motion
const Gravitation3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [orbitalRadius, setOrbitalRadius] = useState(10);
  const [planetSize, setPlanetSize] = useState(0.8);
  const [showOrbit, setShowOrbit] = useState(true);
  const [showVectors, setShowVectors] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const container = mountRef.current!;
    if (!container || !isWebGLAvailable()) return;

    let ts: any = null;
    let unbind: (() => void) | null = null;
    let cancelled = false;
    let labelRenderer: any = null;
    const labels: any[] = [];

    async function init() {
      try {
        const { createThreeScene, bindResize } = await import("@/components/lab/three-scene");
        
        ts = createThreeScene(container, {
          cameraPosition: new THREE.Vector3(0, 15, 25),
          autoRotate: false,
          background: 0x000000
        });
        
        unbind = bindResize(ts);

        // Add stars background
        const starsGeometry = new THREE.BufferGeometry();
        const starsVertices = [];
        for (let i = 0; i < 1000; i++) {
          const x = (Math.random() - 0.5) * 100;
          const y = (Math.random() - 0.5) * 100;
          const z = (Math.random() - 0.5) * 100;
          starsVertices.push(x, y, z);
        }
        starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
        const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 });
        const stars = new THREE.Points(starsGeometry, starsMaterial);
        ts.group.add(stars);

        // Create sun (central mass)
        const sunGroup = new THREE.Group();
        const sunGeo = new THREE.SphereGeometry(2, 32, 32);
        const sunMat = standardMaterial(0xfbbf24, { 
          emissive: 0xfbbf24, 
          emissiveIntensity: 0.8,
          metalness: 0.1,
          roughness: 0.9
        });
        const sun = new THREE.Mesh(sunGeo, sunMat);
        sun.castShadow = true;
        sunGroup.add(sun);
        
        // Sun glow effect
        const glowGeo = new THREE.SphereGeometry(3, 32, 32);
        const glowMat = new THREE.MeshBasicMaterial({ 
          color: 0xfbbf24, 
          transparent: true, 
          opacity: 0.2,
          side: THREE.BackSide
        });
        const glow = new THREE.Mesh(glowGeo, glowMat);
        sunGroup.add(glow);
        
        // Light source
        const sunLight = new THREE.PointLight(0xfbbf24, 2, 50);
        sunLight.position.set(0, 0, 0);
        ts.group.add(sunLight);
        
        ts.group.add(sunGroup);

        // Create planet (orbiting body)
        const planetGroup = new THREE.Group();
        const planetGeo = new THREE.SphereGeometry(planetSize, 32, 32);
        const planetMat = standardMaterial(0x3b82f6, { 
          emissive: 0x1d4ed8, 
          emissiveIntensity: 0.2,
          metalness: 0.3,
          roughness: 0.7
        });
        const planet = new THREE.Mesh(planetGeo, planetMat);
        planet.castShadow = true;
        planetGroup.add(planet);
        planetGroup.position.x = orbitalRadius;
        
        // Planet's moon (satellite)
        const moonGeo = new THREE.SphereGeometry(planetSize/3, 16, 16);
        const moonMat = standardMaterial(0xa5b4fc, { 
          emissive: 0x60a5fa, 
          emissiveIntensity: 0.1
        });
        const moon = new THREE.Mesh(moonGeo, moonMat);
        moon.position.x = planetSize * 2;
        planetGroup.add(moon);
        
        ts.group.add(planetGroup);

        // Orbit path
        const orbitGroup = new THREE.Group();
        if (showOrbit) {
          const orbitGeo = new THREE.RingGeometry(orbitalRadius - 0.01, orbitalRadius + 0.01, 64);
          const orbitMat = new THREE.MeshBasicMaterial({ 
            color: 0x3b82f6, 
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.5
          });
          const orbit = new THREE.Mesh(orbitGeo, orbitMat);
          orbit.rotation.x = Math.PI / 2;
          orbitGroup.add(orbit);
        }
        ts.group.add(orbitGroup);

        // Vectors (force, velocity)
        const vectorGroup = new THREE.Group();
        
        function updateVectors() {
          while (vectorGroup.children.length > 0) {
            const child = vectorGroup.children[0];
            vectorGroup.remove(child);
            if (child instanceof THREE.ArrowHelper) {
              (child as any).line?.geometry?.dispose();
              (child as any).cone?.geometry?.dispose();
            }
          }
          
          if (!showVectors) return;

          // Position vector (from sun to planet)
          const posDir = new THREE.Vector3(planetGroup.position.x, planetGroup.position.y, planetGroup.position.z).normalize();
          const positionVector = new LiveArrow(
            posDir, new THREE.Vector3(0, 0, 0), orbitalRadius, 0x06b6d4, 0.3, 0.2
          );
          vectorGroup.add(positionVector);

          // Gravitational force vector (toward sun)
          const forceDir = new THREE.Vector3(-planetGroup.position.x, -planetGroup.position.y, -planetGroup.position.z).normalize();
          const forceVector = new LiveArrow(
            forceDir, planetGroup.position, orbitalRadius * 0.4, 0xef4444, 0.4, 0.2
          );
          vectorGroup.add(forceVector);

          // Velocity vector (tangent to orbit)
          const velDir = new THREE.Vector3(-planetGroup.position.z, 0, planetGroup.position.x).normalize();
          const velocityVector = new LiveArrow(
            velDir, planetGroup.position, orbitalRadius * 0.3, 0x22c55e, 0.4, 0.2
          );
          vectorGroup.add(velocityVector);
        }
        
        ts.group.add(vectorGroup);
        updateVectors();

        // LABELS
        try {
          const { CSS2DRenderer, CSS2DObject } = await import("three/addons/renderers/CSS2DRenderer.js");
          labelRenderer = new CSS2DRenderer();
          labelRenderer.setSize(container.clientWidth, container.clientHeight);
          labelRenderer.domElement.style.position = "absolute";
          labelRenderer.domElement.style.top = "0";
          labelRenderer.domElement.style.pointerEvents = "none";
          labelRenderer.domElement.style.zIndex = "10";
          container.appendChild(labelRenderer.domElement);

          const sunLabel = new CSS2DObject(document.createElement("div"));
          sunLabel.element.className = "label";
          sunLabel.element.innerHTML = '<div style="background:rgba(0,0,0,0.8);padding:6px 10px;border-radius:4px;border:1px solid #fbbf24"><span style="color:#fbbf24;font-weight:600">Sun (M)</span><br><span style="color:#fde68a;font-size:10px">Central Mass</span></div>';
          sunLabel.position.set(0, 2, 0);
          sunGroup.add(sunLabel);
          labels.push(sunLabel);

          const planetLabel = new CSS2DObject(document.createElement("div"));
          planetLabel.element.className = "label";
          planetLabel.element.innerHTML = '<div style="background:rgba(0,0,0,0.8);padding:4px 8px;border-radius:4px;border:1px solid #3b82f6"><span style="color:#3b82f6;font-weight:600">Planet (m)</span><br><span style="color:#93c5fd;font-size:10px">Orbiting Body</span></div>';
          planetLabel.position.set(0, planetSize + 1, 0);
          planetGroup.add(planetLabel);
          labels.push(planetLabel);

          const moonLabel = new CSS2DObject(document.createElement("div"));
          moonLabel.element.className = "label";
          moonLabel.element.innerHTML = '<div style="background:rgba(0,0,0,0.8);padding:3px 6px;border-radius:4px;border:1px solid #a5b4fc"><span style="color:#a5b4fc;font-weight:600">Moon</span><br><span style="color:#c7d2fe;font-size:10px">Satellite</span></div>';
          moonLabel.position.set(planetSize * 2, 0.5, 0);
          planetGroup.add(moonLabel);
          labels.push(moonLabel);

          const orbitLabel = new CSS2DObject(document.createElement("div"));
          orbitLabel.element.className = "label";
          orbitLabel.element.innerHTML = `<div style="background:rgba(0,0,0,0.8);padding:4px 8px;border-radius:4px;border:1px solid #3b82f6"><span style="color:#3b82f6;font-weight:600">Orbit</span><br><span style="color:#93c5fd;font-size:10px">r = ${orbitalRadius} AU</span></div>`;
          orbitLabel.position.set(orbitalRadius, 0, 3);
          orbitGroup.add(orbitLabel);
          labels.push(orbitLabel);
        } catch { console.log("CSS2DRenderer not available"); }

        let time = 0;
        function animate() {
          if (cancelled) return;
          requestAnimationFrame(animate);
          
          if (isAnimating) {
            time += 0.01;
            // Circular orbit
            planetGroup.position.x = orbitalRadius * Math.cos(time);
            planetGroup.position.z = orbitalRadius * Math.sin(time);
            planetGroup.position.y = 0;
            
            // Moon orbits planet
            moon.position.x = planetSize * 2 * Math.cos(time * 2);
            moon.position.z = planetSize * 2 * Math.sin(time * 2);
            moon.position.y = 0;
          }
          
          updateVectors();
          if (labels[3]) {
            labels[3].position.x = planetGroup.position.x;
            labels[3].position.z = planetGroup.position.z;
          }
          if (labels[2]) {
            labels[2].position.x = planetGroup.position.x + moon.position.x;
            labels[2].position.z = planetGroup.position.z + moon.position.z;
          }
          if (labels[4]) {
            labels[4].position.x = orbitalRadius * Math.cos(time);
            labels[4].position.z = orbitalRadius * Math.sin(time) + 3;
            labels[4].element.innerHTML = `<div style="background:rgba(0,0,0,0.8);padding:4px 8px;border-radius:4px;border:1px solid #3b82f6"><span style="color:#3b82f6;font-weight:600">Orbit</span><br><span style="color:#93c5fd;font-size:10px">r = ${orbitalRadius} AU</span></div>`;
          }
          
          ts.controls.update(); 
          ts.renderer.render(ts.scene, ts.camera);
          if (labelRenderer) labelRenderer.render(ts.scene, ts.camera);
        }
        animate();
      } catch (error) { console.error("Error:", error); }
    }
    init();

    return () => {
      cancelled = true; 
      if (unbind) unbind();
      if (ts) try { disposeThreeScene(ts); } catch {}
      if (container) { const el = container.querySelectorAll(".label"); el.forEach(e => e.remove()); }
    };
  }, [orbitalRadius, planetSize, showOrbit, showVectors, showLabels, isAnimating]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>3D Gravitation & Orbital Motion</CardTitle>
        <CardDescription>Interactive solar system model showing planetary orbits and gravitational forces</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div ref={mountRef} className="w-full h-96 bg-black rounded-lg" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <Label>Orbital Radius (r) in AU</Label>
              <Slider min={5} max={20} step={1} value={[orbitalRadius]} onValueChange={v => setOrbitalRadius(v[0])} />
              <p className="text-sm text-gray-500">Current: r = {orbitalRadius} AU</p>
            </div>
            <div>
              <Label>Planet Size</Label>
              <Slider min={0.5} max={1.5} step={0.1} value={[planetSize]} onValueChange={v => setPlanetSize(v[0])} />
              <p className="text-sm text-gray-500">Current: Size = {planetSize}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="rounded-md border border-border bg-muted/30 p-4">
              <h4 className="font-semibold mb-3 text-primary">Newton's Law of Gravitation:</h4>
              <p className="text-lg font-bold text-amber-600">F = G·M·m / r²</p>
              <p className="text-xs text-muted-foreground mt-1">Gravitational force between two masses</p>
              <div className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between"><span>G (Gravitational Constant):</span><span className="font-mono">6.674×10⁻¹¹ N·m²/kg²</span></div>
                <div className="flex justify-between"><span>M (Sun Mass):</span><span className="font-mono">1.989×10³⁰ kg</span></div>
                <div className="flex justify-between"><span>Orbital Period (T):</span><span className="font-mono">~ {Math.sqrt(orbitalRadius * orbitalRadius * orbitalRadius).toFixed(2)} years</span></div>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button variant={isAnimating ? "default" : "outline"} size="sm" onClick={() => setIsAnimating(!isAnimating)}>{isAnimating ? 'Pause' : 'Play'} Animation</Button>
              <Button variant={showOrbit ? "default" : "outline"} size="sm" onClick={() => setShowOrbit(!showOrbit)}>{showOrbit ? 'Hide' : 'Show'} Orbit</Button>
              <Button variant={showVectors ? "default" : "outline"} size="sm" onClick={() => setShowVectors(!showVectors)}>{showVectors ? 'Hide' : 'Show'} Vectors</Button>
              <Button variant={showLabels ? "default" : "outline"} size="sm" onClick={() => setShowLabels(!showLabels)}>{showLabels ? 'Hide' : 'Show'} Labels</Button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <div className="flex items-center gap-2"><div className="w-4 h-4 bg-amber-500 rounded-full"/><div><p className="font-medium text-sm">Sun</p><p className="text-xs text-muted-foreground">Central Mass</p></div></div>
          <div className="flex items-center gap-2"><div className="w-4 h-4 bg-blue-500 rounded-full"/><div><p className="font-medium text-sm">Planet</p><p className="text-xs text-muted-foreground">Orbiting Body</p></div></div>
          <div className="flex items-center gap-2"><div className="w-4 h-4 bg-cyan-500 rounded-full"/><div><p className="font-medium text-sm">Moon</p><p className="text-xs text-muted-foreground">Satellite</p></div></div>
          <div className="flex items-center gap-2"><div className="w-4 h-4 bg-cyan-500"/><div><p className="font-medium text-sm">Position</p><p className="text-xs text-muted-foreground">Vector (r)</p></div></div>
          <div className="flex items-center gap-2"><div className="w-4 h-4 bg-red-500"/><div><p className="font-medium text-sm">Force</p><p className="text-xs text-muted-foreground">F = GMm/r²</p></div></div>
          <div className="flex items-center gap-2"><div className="w-4 h-4 bg-green-500"/><div><p className="font-medium text-sm">Velocity</p><p className="text-xs text-muted-foreground">Tangential</p></div></div>
        </div>
        <div className="rounded-md border border-border bg-muted/30 p-4">
          <h4 className="font-semibold mb-3 text-primary">Kepler's Laws:</h4>
          <ol className="space-y-2 text-sm list-decimal pl-5">
            <li><strong>First Law (Law of Ellipses):</strong> All planets move in elliptical orbits with the Sun at one focus</li>
            <li><strong>Second Law (Law of Areas):</strong> A line joining a planet to the Sun sweeps out equal areas in equal times</li>
            <li><strong>Third Law (Harmonic Law):</strong> T² ∝ r³, where T is orbital period and r is semi-major axis</li>
          </ol>
        </div>
        <div className="rounded-md border border-border bg-muted/30 p-4">
          <h4 className="font-semibold mb-3 text-primary">Applications:</h4>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-start gap-2"><span className="text-lg">🚀</span><div><p className="font-medium">Satellites</p><p className="text-xs text-muted-foreground">Artificial orbits</p></div></div>
            <div className="flex items-start gap-2"><span className="text-lg">🌙</span><div><p className="font-medium">Moon Orbit</p><p className="text-xs text-muted-foreground">Natural satellite</p></div></div>
            <div className="flex items-start gap-2"><span className="text-lg">🪐</span><div><p className="font-medium">Solar System</p><p className="text-xs text-muted-foreground">Planetary motion</p></div></div>
            <div className="flex items-start gap-2"><span className="text-lg">🔭</span><div><p className="font-medium">Space Missions</p><p className="text-xs text-muted-foreground">Trajectory planning</p></div></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Gravitational Field Visualizer
const GravitationalField: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [fieldLines, setFieldLines] = useState(20);
  const [showField, setShowField] = useState(true);
  const [showLabels, setShowLabels] = useState(true);

  useEffect(() => {
    const container = mountRef.current!;
    if (!container || !isWebGLAvailable()) return;

    let ts: any = null;
    let unbind: (() => void) | null = null;
    let cancelled = false;
    let labelRenderer: any = null;
    const labels: any[] = [];

    async function init() {
      try {
        const { createThreeScene, bindResize } = await import("@/components/lab/three-scene");
        
        ts = createThreeScene(container, {
          cameraPosition: new THREE.Vector3(0, 10, 20),
          autoRotate: true,
          autoRotateSpeed: 0.3,
          background: 0x000000
        });
        
        unbind = bindResize(ts);

        // Stars background
        const starsGeometry = new THREE.BufferGeometry();
        const starsVertices = [];
        for (let i = 0; i < 500; i++) {
          const x = (Math.random() - 0.5) * 50;
          const y = (Math.random() - 0.5) * 50;
          const z = (Math.random() - 0.5) * 50;
          starsVertices.push(x, y, z);
        }
        starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
        const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 });
        const stars = new THREE.Points(starsGeometry, starsMaterial);
        ts.group.add(stars);

        // Central mass (creating gravitational field)
        const centerGroup = new THREE.Group();
        const centerGeo = new THREE.SphereGeometry(1.5, 32, 32);
        const centerMat = standardMaterial(0xfbbf24, { 
          emissive: 0xfbbf24, 
          emissiveIntensity: 0.5
        });
        const center = new THREE.Mesh(centerGeo, centerMat);
        centerGroup.add(center);
        ts.group.add(centerGroup);

        // Gravitational field lines (radial inward)
        const fieldGroup = new THREE.Group();
        
        function createFieldLines() {
          while (fieldGroup.children.length > 0) {
            const child = fieldGroup.children[0];
            fieldGroup.remove(child);
            if (child instanceof THREE.Line) {
              child.geometry.dispose();
              (child.material as THREE.Material).dispose();
            }
          }
          
          if (!showField) return;

          for (let i = 0; i < fieldLines; i++) {
            const theta = (i / fieldLines) * Math.PI * 2;
            const phi = Math.acos(2 * (i / fieldLines) - 1);
            
            const x1 = 15 * Math.sin(phi) * Math.cos(theta);
            const y1 = 15 * Math.sin(phi) * Math.sin(theta);
            const z1 = 15 * Math.cos(phi);
            
            const points = [
              new THREE.Vector3(x1, y1, z1),
              new THREE.Vector3(x1 * 0.3, y1 * 0.3, z1 * 0.3),
              new THREE.Vector3(0, 0, 0)
            ];
            
            const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
            const line = new THREE.Line(lineGeo, new THREE.LineBasicMaterial({ 
              color: 0x3b82f6, 
              linewidth: 1,
              transparent: true,
              opacity: 0.5
            }));
            fieldGroup.add(line);
          }
        }
        
        createFieldLines();
        ts.group.add(fieldGroup);

        // Test mass in field
        const testMassGroup = new THREE.Group();
        const testMassGeo = new THREE.SphereGeometry(0.5, 16, 16);
        const testMassMat = standardMaterial(0x22c55e, { emissive: 0x22c55e, emissiveIntensity: 0.3 });
        const testMass = new THREE.Mesh(testMassGeo, testMassMat);
        testMass.position.set(10, 0, 0);
        testMassGroup.add(testMass);
        ts.group.add(testMassGroup);

        // LABELS
        try {
          const { CSS2DRenderer, CSS2DObject } = await import("three/addons/renderers/CSS2DRenderer.js");
          labelRenderer = new CSS2DRenderer();
          labelRenderer.setSize(container.clientWidth, container.clientHeight);
          labelRenderer.domElement.style.position = "absolute";
          labelRenderer.domElement.style.top = "0";
          labelRenderer.domElement.style.pointerEvents = "none";
          labelRenderer.domElement.style.zIndex = "10";
          container.appendChild(labelRenderer.domElement);

          const centerLabel = new CSS2DObject(document.createElement("div"));
          centerLabel.element.className = "label";
          centerLabel.element.innerHTML = '<div style="background:rgba(0,0,0,0.8);padding:6px 10px;border-radius:4px;border:1px solid #fbbf24"><span style="color:#fbbf24;font-weight:600">Mass M</span><br><span style="color:#fde68a;font-size:10px">Field Source</span></div>';
          centerLabel.position.set(0, 2, 0);
          centerGroup.add(centerLabel);
          labels.push(centerLabel);

          const testMassLabel = new CSS2DObject(document.createElement("div"));
          testMassLabel.element.className = "label";
          testMassLabel.element.innerHTML = '<div style="background:rgba(0,0,0,0.8);padding:4px 8px;border-radius:4px;border:1px solid #22c55e"><span style="color:#22c55e;font-weight:600">Test Mass m</span><br><span style="color:#6ee7b7;font-size:10px">Experiences Force</span></div>';
          testMassLabel.position.set(0, 1, 0);
          testMassGroup.add(testMassLabel);
          labels.push(testMassLabel);

          const fieldLabel = new CSS2DObject(document.createElement("div"));
          fieldLabel.element.className = "label";
          fieldLabel.element.innerHTML = `<div style="background:rgba(0,0,0,0.8);padding:4px 8px;border-radius:4px;border:1px solid #3b82f6"><span style="color:#3b82f6;font-weight:600">Field Lines</span><br><span style="color:#818cf8;font-size:10px">${fieldLines} lines</span></div>`;
          fieldLabel.position.set(0, -2, 15);
          fieldGroup.add(fieldLabel);
          labels.push(fieldLabel);
        } catch { console.log("CSS2DRenderer not available"); }

        function animate() {
          if (cancelled) return;
          requestAnimationFrame(animate);
          ts.controls.update(); 
          ts.renderer.render(ts.scene, ts.camera);
          if (labelRenderer) labelRenderer.render(ts.scene, ts.camera);
        }
        animate();
      } catch (error) { console.error("Error:", error); }
    }
    init();

    return () => {
      cancelled = true; 
      if (unbind) unbind();
      if (ts) try { disposeThreeScene(ts); } catch {}
      if (container) { const el = container.querySelectorAll(".label"); el.forEach(e => e.remove()); }
    };
  }, [fieldLines, showField, showLabels]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>3D Gravitational Field</CardTitle>
        <CardDescription>Visualization of gravitational field lines around a massive object</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div ref={mountRef} className="w-full h-96 bg-black rounded-lg" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <Label>Field Lines Density</Label>
              <Slider min={5} max={40} step={1} value={[fieldLines]} onValueChange={v => setFieldLines(v[0])} />
              <p className="text-sm text-gray-500">Current: {fieldLines} lines</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="rounded-md border border-border bg-muted/30 p-4">
              <h4 className="font-semibold mb-3 text-primary">Gravitational Field Intensity:</h4>
              <p className="text-lg font-bold text-indigo-600">g = GM / r²</p>
              <p className="text-xs text-muted-foreground mt-1">Intensity decreases with square of distance</p>
              <div className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between"><span>G:</span><span className="font-mono">6.674×10⁻¹¹</span></div>
                <div className="flex justify-between"><span>M:</span><span className="font-mono">Mass of object</span></div>
                <div className="flex justify-between"><span>r:</span><span className="font-mono">Distance from center</span></div>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button variant={showField ? "default" : "outline"} size="sm" onClick={() => setShowField(!showField)}>{showField ? 'Hide' : 'Show'} Field</Button>
              <Button variant={showLabels ? "default" : "outline"} size="sm" onClick={() => setShowLabels(!showLabels)}>{showLabels ? 'Hide' : 'Show'} Labels</Button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="flex items-center gap-2"><div className="w-4 h-4 bg-amber-500 rounded-full"/><div><p className="font-medium text-sm">Mass M</p><p className="text-xs text-muted-foreground">Field Source</p></div></div>
          <div className="flex items-center gap-2"><div className="w-4 h-4 bg-green-500 rounded-full"/><div><p className="font-medium text-sm">Test Mass</p><p className="text-xs text-muted-foreground">Experiences Force</p></div></div>
          <div className="flex items-center gap-2"><div className="w-4 h-4 bg-blue-500"/><div><p className="font-medium text-sm">Field Lines</p><p className="text-xs text-muted-foreground">Radial Inward</p></div></div>
        </div>
        <div className="rounded-md border border-border bg-muted/30 p-4">
          <h4 className="font-semibold mb-3 text-primary">Key Concepts:</h4>
          <ul className="space-y-2 text-sm">
            <li><strong>Gravitational Field:</strong> Region around a mass where its gravitational force can be felt</li>
            <li><strong>Field Intensity (g):</strong> Force per unit mass experienced by a test mass placed in the field</li>
            <li><strong>Field Lines:</strong> Imaginary lines showing the direction of gravitational force</li>
            <li><strong>Radial Field:</strong> Gravitational field lines are always radial and directed inward</li>
            <li><strong>Inverse Square Law:</strong> Field intensity decreases with square of distance from source</li>
          </ul>
        </div>
        <div className="rounded-md border border-border bg-muted/30 p-4">
          <h4 className="font-semibold mb-3 text-primary">Applications:</h4>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-start gap-2"><span className="text-lg">🌍</span><div><p className="font-medium">Earth's Gravity</p><p className="text-xs text-muted-foreground">g = 9.8 m/s²</p></div></div>
            <div className="flex items-start gap-2"><span className="text-lg">🚀</span><div><p className="font-medium">Space Stations</p><p className="text-xs text-muted-foreground">Microgravity</p></div></div>
            <div className="flex items-start gap-2"><span className="text-lg">🌕</span><div><p className="font-medium">Lunar Gravity</p><p className="text-xs text-muted-foreground">g = 1.62 m/s²</p></div></div>
            <div className="flex items-start gap-2"><span className="text-lg">⚖️</span><div><p className="font-medium">Weight Measurement</p><p className="text-xs text-muted-foreground">Spring balance</p></div></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Main Gravitation Component with Tabs
export const Physics3DGravitation: React.FC = () => {
  return (
    <Tabs defaultValue="orbital" className="w-full">
      <TabsList className="flex-wrap">
        <TabsTrigger value="orbital">Orbital Motion</TabsTrigger>
        <TabsTrigger value="field">Gravitational Field</TabsTrigger>
      </TabsList>
      
      <TabsContent value="orbital" className="mt-4">
        <Gravitation3D />
      </TabsContent>
      
      <TabsContent value="field" className="mt-4">
        <GravitationalField />
      </TabsContent>
    </Tabs>
  );
};

export default Physics3DGravitation;
