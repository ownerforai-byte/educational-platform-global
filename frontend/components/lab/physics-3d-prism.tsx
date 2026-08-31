"use client";

import { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { isWebGLAvailable } from "@/lib/webgl";
import { disposeThreeScene, standardMaterial } from "@/components/lab/three-scene";

// Prism 3D Component showing refraction and dispersion
const Prism3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [prismAngle, setPrismAngle] = useState(60);
  const [refractiveIndex, setRefractiveIndex] = useState(1.52);
  const [showRays, setShowRays] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const [showDispersion, setShowDispersion] = useState(true);

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
          cameraPosition: new THREE.Vector3(0, 10, 25),
          autoRotate: false,
          background: 0x0f172a
        });
        
        unbind = bindResize(ts);

        // Ground plane
        const groundGeo = new THREE.PlaneGeometry(50, 50);
        const groundMat = standardMaterial(0x1e293b, { roughness: 0.8 });
        const ground = new THREE.Mesh(groundGeo, groundMat);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -0.01;
        ground.receiveShadow = true;
        ts.group.add(ground);

        const grid = new THREE.GridHelper(50, 100, 0x334155, 0x1e293b);
        ts.group.add(grid);

        // Create triangular prism
        const prismGroup = new THREE.Group();
        const prismColor = 0x6366f1;
        const angleRad = (prismAngle * Math.PI) / 180;
        
        // Create prism geometry
        const height = 8;
        const base = 6;
        const halfAngle = angleRad / 2;
        const apexHeight = base * Math.tan(halfAngle);
        
        const vertices = [
          // Bottom face
          new THREE.Vector3(-base/2, 0, -height/2),
          new THREE.Vector3(base/2, 0, -height/2),
          new THREE.Vector3(0, 0, height/2),
          // Top face
          new THREE.Vector3(-base/2, apexHeight, -height/2),
          new THREE.Vector3(base/2, apexHeight, -height/2),
          new THREE.Vector3(0, apexHeight, height/2),
        ];
        
        const positionData: number[] = [];
        [
          [0, 1, 2],
          [3, 4, 5],
          [0, 1, 4],
          [0, 4, 3],
          [1, 2, 5],
          [1, 5, 4],
          [2, 0, 3],
          [2, 3, 5],
        ].forEach(([a, b, c]) => {
          positionData.push(vertices[a].x, vertices[a].y, vertices[a].z);
          positionData.push(vertices[b].x, vertices[b].y, vertices[b].z);
          positionData.push(vertices[c].x, vertices[c].y, vertices[c].z);
        });

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute("position", new THREE.Float32BufferAttribute(positionData, 3));
        geometry.computeVertexNormals();
        
        const prismMat = standardMaterial(prismColor, { 
          transparent: true, 
          opacity: 0.6,
          metalness: 0.3,
          roughness: 0.1,
          emissive: prismColor, 
          emissiveIntensity: 0.1,
          side: THREE.DoubleSide
        });
        const prism = new THREE.Mesh(geometry, prismMat);
        prism.castShadow = true;
        prism.receiveShadow = true;
        prismGroup.add(prism);
        
        // Prism frame/edge
        const edges = new THREE.EdgesGeometry(geometry);
        const edgeMat = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 });
        const edgeLines = new THREE.LineSegments(edges, edgeMat);
        prismGroup.add(edgeLines);
        
        ts.group.add(prismGroup);

        // Light source (white light)
        const lightSourceGroup = new THREE.Group();
        const lightSphereGeo = new THREE.SphereGeometry(0.5, 16, 16);
        const lightSphereMat = standardMaterial(0xffffff, { emissive: 0xffffff, emissiveIntensity: 0.8 });
        const lightSphere = new THREE.Mesh(lightSphereGeo, lightSphereMat);
        lightSphere.position.set(-20, apexHeight/2, 0);
        lightSourceGroup.add(lightSphere);
        
        // Light rays (incident)
        const rayGroup = new THREE.Group();
        const incidentRayGeo = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(-20, apexHeight/2, 0),
          new THREE.Vector3(-base/2, apexHeight/2, -height/2)
        ]);
        const incidentRay = new THREE.Line(incidentRayGeo, new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 }));
        rayGroup.add(incidentRay);
        
        // Refracted rays (simplified - in reality would bend according to Snell's law)
        // For visualization, we'll show dispersion
        if (showRays) {
          // Red ray (least deviation)
          const redRayGeo = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(-base/2, apexHeight/2, -height/2),
            new THREE.Vector3(20, apexHeight/2 - 3, -height/2)
          ]);
          const redRay = new THREE.Line(redRayGeo, new THREE.LineBasicMaterial({ color: 0xef4444, linewidth: 2, transparent: true, opacity: showDispersion ? 1 : 0.3 }));
          rayGroup.add(redRay);
          
          // Green ray (medium deviation)
          const greenRayGeo = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(-base/2, apexHeight/2, -height/2),
            new THREE.Vector3(20, apexHeight/2, -height/2)
          ]);
          const greenRay = new THREE.Line(greenRayGeo, new THREE.LineBasicMaterial({ color: 0x22c55e, linewidth: 2, transparent: true, opacity: showDispersion ? 1 : 0.3 }));
          rayGroup.add(greenRay);
          
          // Blue ray (most deviation)
          const blueRayGeo = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(-base/2, apexHeight/2, -height/2),
            new THREE.Vector3(20, apexHeight/2 + 3, -height/2)
          ]);
          const blueRay = new THREE.Line(blueRayGeo, new THREE.LineBasicMaterial({ color: 0x3b82f6, linewidth: 2, transparent: true, opacity: showDispersion ? 1 : 0.3 }));
          rayGroup.add(blueRay);
        }
        
        lightSourceGroup.add(rayGroup);
        ts.group.add(lightSourceGroup);

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

          const prismLabel = new CSS2DObject(document.createElement("div"));
          prismLabel.element.className = "label";
          prismLabel.element.innerHTML = `<div style="background:rgba(0,0,0,0.8);padding:6px 10px;border-radius:4px;border:1px solid #6366f1"><span style="color:#6366f1;font-weight:600">Prism</span><br><span style="color:#818cf8;font-size:10px">A = ${prismAngle}°</span></div>`;
          prismLabel.position.set(0, apexHeight + 2, 0);
          prismGroup.add(prismLabel);
          labels.push(prismLabel);

          const lightLabel = new CSS2DObject(document.createElement("div"));
          lightLabel.element.className = "label";
          lightLabel.element.innerHTML = '<div style="background:rgba(0,0,0,0.8);padding:4px 8px;border-radius:4px;border:1px solid #ffffff"><span style="color:#ffffff;font-weight:600">White Light</span></div>';
          lightLabel.position.set(-20, apexHeight/2 + 1, 0);
          lightSourceGroup.add(lightLabel);
          labels.push(lightLabel);

          if (showDispersion) {
            const redLabel = new CSS2DObject(document.createElement("div"));
            redLabel.element.className = "label";
            redLabel.element.innerHTML = '<div style="background:rgba(0,0,0,0.8);padding:3px 6px;border-radius:4px;border:1px solid #ef4444"><span style="color:#ef4444;font-size:10px">Red</span></div>';
            redLabel.position.set(15, apexHeight/2 - 3, 0);
            ts.group.add(redLabel);
            labels.push(redLabel);

            const greenLabel = new CSS2DObject(document.createElement("div"));
            greenLabel.element.className = "label";
            greenLabel.element.innerHTML = '<div style="background:rgba(0,0,0,0.8);padding:3px 6px;border-radius:4px;border:1px solid #22c55e"><span style="color:#22c55e;font-size:10px">Green</span></div>';
            greenLabel.position.set(15, apexHeight/2, 0);
            ts.group.add(greenLabel);
            labels.push(greenLabel);

            const blueLabel = new CSS2DObject(document.createElement("div"));
            blueLabel.element.className = "label";
            blueLabel.element.innerHTML = '<div style="background:rgba(0,0,0,0.8);padding:3px 6px;border-radius:4px;border:1px solid #3b82f6"><span style="color:#3b82f6;font-size:10px">Blue</span></div>';
            blueLabel.position.set(15, apexHeight/2 + 3, 0);
            ts.group.add(blueLabel);
            labels.push(blueLabel);
          }

          const angleLabel = new CSS2DObject(document.createElement("div"));
          angleLabel.element.className = "label";
          angleLabel.element.innerHTML = `<div style="background:rgba(0,0,0,0.8);padding:4px 8px;border-radius:4px;border:1px solid #6366f1"><span style="color:#818cf8;font-weight:600">A = ${prismAngle}°</span></div>`;
          angleLabel.position.set(-base/2, apexHeight/2 + 1, -height/2);
          prismGroup.add(angleLabel);
          labels.push(angleLabel);
        } catch { console.log("CSS2DRenderer not available"); }

        function animate() {
          if (cancelled) return;
          requestAnimationFrame(animate);
          if (labels[0]) {
            labels[0].element.innerHTML = `<div style="background:rgba(0,0,0,0.8);padding:6px 10px;border-radius:4px;border:1px solid #6366f1"><span style="color:#6366f1;font-weight:600">Prism</span><br><span style="color:#818cf8;font-size:10px">A = ${prismAngle}°</span></div>`;
          }
          if (labels[4]) {
            labels[4].element.innerHTML = `<div style="background:rgba(0,0,0,0.8);padding:4px 8px;border-radius:4px;border:1px solid #6366f1"><span style="color:#818cf8;font-weight:600">A = ${prismAngle}°</span></div>`;
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
  }, [prismAngle, refractiveIndex, showRays, showLabels, showDispersion]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>3D Prism with Dispersion</CardTitle>
        <CardDescription>Interactive triangular prism showing refraction and color dispersion</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div ref={mountRef} className="w-full h-96 bg-gray-100 rounded-lg" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <Label>Prism Angle (A) in degrees</Label>
              <Slider min={30} max={90} step={5} value={[prismAngle]} onValueChange={v => setPrismAngle(v[0])} />
              <p className="text-sm text-gray-500">Current: {prismAngle}°</p>
            </div>
            <div>
              <Label>Refractive Index (n)</Label>
              <Slider min={1.3} max={2.0} step={0.05} value={[refractiveIndex]} onValueChange={v => setRefractiveIndex(v[0])} />
              <p className="text-sm text-gray-500">Current: n = {refractiveIndex}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="rounded-md border border-border bg-muted/30 p-4">
              <h4 className="font-semibold mb-3 text-primary">Prism Formula:</h4>
              <p className="text-lg font-bold text-indigo-600">n = sin((A + δ_m)/2) / sin(A/2)</p>
              <p className="text-xs text-muted-foreground mt-1">At minimum deviation</p>
              <div className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between"><span>Prism Angle (A):</span><span className="font-mono">{prismAngle}°</span></div>
                <div className="flex justify-between"><span>Refractive Index (n):</span><span className="font-mono">{refractiveIndex}</span></div>
                <div className="flex justify-between"><span>Material:</span><span className="font-mono">Glass</span></div>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button variant={showRays ? "default" : "outline"} size="sm" onClick={() => setShowRays(!showRays)}>{showRays ? 'Hide' : 'Show'} Rays</Button>
              <Button variant={showLabels ? "default" : "outline"} size="sm" onClick={() => setShowLabels(!showLabels)}>{showLabels ? 'Hide' : 'Show'} Labels</Button>
              <Button variant={showDispersion ? "default" : "outline"} size="sm" onClick={() => setShowDispersion(!showDispersion)}>{showDispersion ? 'Hide' : 'Show'} Dispersion</Button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="flex items-center gap-2"><div className="w-4 h-4 bg-indigo-500 rounded"/><div><p className="font-medium text-sm">Prism</p><p className="text-xs text-muted-foreground">Triangular glass</p></div></div>
          <div className="flex items-center gap-2"><div className="w-4 h-4 bg-white rounded-full"/><div><p className="font-medium text-sm">White Light</p><p className="text-xs text-muted-foreground">Polychromatic</p></div></div>
          <div className="flex items-center gap-2"><div className="w-4 h-4 bg-red-500"/><div><p className="font-medium text-sm">Red Ray</p><p className="text-xs text-muted-foreground">Least deviation</p></div></div>
          <div className="flex items-center gap-2"><div className="w-4 h-4 bg-green-500"/><div><p className="font-medium text-sm">Green Ray</p><p className="text-xs text-muted-foreground">Medium deviation</p></div></div>
          <div className="flex items-center gap-2"><div className="w-4 h-4 bg-blue-500"/><div><p className="font-medium text-sm">Blue Ray</p><p className="text-xs text-muted-foreground">Most deviation</p></div></div>
        </div>
        <div className="rounded-md border border-border bg-muted/30 p-4">
          <h4 className="font-semibold mb-3 text-primary">Key Concepts:</h4>
          <ul className="space-y-2 text-sm">
            <li><strong>Prism Angle (A):</strong> Angle between the two refracting surfaces</li>
            <li><strong>Deviation (δ):</strong> Angle between incident and emergent rays</li>
            <li><strong>Minimum Deviation (δ_m):</strong> When light passes symmetrically through prism</li>
            <li><strong>Dispersion:</strong> Splitting of white light into constituent colors</li>
            <li><strong>Snell's Law:</strong> n₁·sin(θ₁) = n₂·sin(θ₂)</li>
          </ul>
        </div>
        <div className="rounded-md border border-border bg-muted/30 p-4">
          <h4 className="font-semibold mb-3 text-primary">Applications:</h4>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-start gap-2"><span className="text-lg">🌈</span><div><p className="font-medium">Rainbow Formation</p><p className="text-xs text-muted-foreground">Natural dispersion</p></div></div>
            <div className="flex items-start gap-2"><span className="text-lg">🔭</span><div><p className="font-medium">Spectrometers</p><p className="text-xs text-muted-foreground">Analyze light spectrum</p></div></div>
            <div className="flex items-start gap-2"><span className="text-lg">💎</span><div><p className="font-medium">Diamonds</p><p className="text-xs text-muted-foreground">Multiple refractions</p></div></div>
            <div className="flex items-start gap-2"><span className="text-lg">📺</span><div><p className="font-medium">TV/Monitor</p><p className="text-xs text-muted-foreground">Color separation</p></div></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Minimum Deviation Calculator Component
const PrismCalculator: React.FC = () => {
  const [prismAngle, setPrismAngle] = useState(60);
  const [refractiveIndex, setRefractiveIndex] = useState(1.52);
  
  // Calculate minimum deviation using prism formula
  const minDeviation = Math.asin(refractiveIndex * Math.sin((prismAngle * Math.PI / 180) / 2)) * 2 - (prismAngle * Math.PI / 180);
  const minDeviationDeg = (minDeviation * 180) / Math.PI;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Prism Minimum Deviation Calculator</CardTitle>
        <CardDescription>Calculate minimum deviation using prism formula</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label>Prism Angle (A) in degrees</Label>
            <Slider min={10} max={90} step={1} value={[prismAngle]} onValueChange={v => setPrismAngle(v[0])} />
            <p className="text-sm text-gray-500">Current: A = {prismAngle}°</p>
          </div>
          <div>
            <Label>Refractive Index (n)</Label>
            <Slider min={1.3} max={2.4} step={0.01} value={[refractiveIndex]} onValueChange={v => setRefractiveIndex(v[0])} />
            <p className="text-sm text-gray-500">Current: n = {refractiveIndex}</p>
          </div>
        </div>
        
        <div className="rounded-md border border-border bg-muted/30 p-6 text-center">
          <h4 className="font-semibold mb-4 text-primary">Results:</h4>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Minimum Deviation (δ_m)</p>
              <p className="text-3xl font-bold text-indigo-600">{minDeviationDeg.toFixed(2)}°</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Using formula: n = sin((A + δ_m)/2) / sin(A/2)</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="rounded-md border border-border bg-muted/30 p-4">
            <h5 className="font-medium mb-2">Common Refractive Indices:</h5>
            <ul className="space-y-1">
              <li><span className="font-mono">Air:</span> n = 1.0003</li>
              <li><span className="font-mono">Water:</span> n = 1.333</li>
              <li><span className="font-mono">Crown Glass:</span> n = 1.52</li>
              <li><span className="font-mono">Flint Glass:</span> n = 1.66</li>
              <li><span className="font-mono">Diamond:</span> n = 2.417</li>
            </ul>
          </div>
          <div className="rounded-md border border-border bg-muted/30 p-4">
            <h5 className="font-medium mb-2">Key Formulas:</h5>
            <ul className="space-y-2">
              <li className="font-mono text-xs">n = sin((A + δ_m)/2) / sin(A/2)</li>
              <li className="font-mono text-xs">δ = i₁ + i₂ - A</li>
              <li className="font-mono text-xs">For thin prism: δ ≈ (n - 1)A</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Main Prism Component with Tabs
export const Physics3DPrism: React.FC = () => {
  return (
    <Tabs defaultValue="dispersion" className="w-full">
      <TabsList className="flex-wrap">
        <TabsTrigger value="dispersion">Prism Dispersion</TabsTrigger>
        <TabsTrigger value="calculator">Prism Calculator</TabsTrigger>
      </TabsList>
      
      <TabsContent value="dispersion" className="mt-4">
        <Prism3D />
      </TabsContent>
      
      <TabsContent value="calculator" className="mt-4">
        <PrismCalculator />
      </TabsContent>
    </Tabs>
  );
};

export default Physics3DPrism;
