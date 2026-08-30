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

// Convex Lens 3D Component
const ConvexLens3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [focalLength, setFocalLength] = useState(10);
  const [objectPosition, setObjectPosition] = useState(-15);
  const [showRays, setShowRays] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const [showFocus, setShowFocus] = useState(true);

  // Calculate image position using lens formula: 1/f = 1/v - 1/u
  const imagePosition = 1 / (1/focalLength + 1/objectPosition);
  const isRealImage = objectPosition < -focalLength;
  const magnification = -imagePosition / objectPosition;

  useEffect(() => {
    if (!mountRef.current || !isWebGLAvailable()) return;

    let ts: any = null;
    let unbind: (() => void) | null = null;
    let cancelled = false;
    let labelRenderer: any = null;
    const labels: any[] = [];

    async function init() {
      try {
        const { createThreeScene, bindResize } = await import("@/components/lab/three-scene");
        
        ts = createThreeScene(mountRef.current!, {
          cameraPosition: new THREE.Vector3(0, 5, 20),
          autoRotate: false,
          background: 0x0f172a
        });
        
        unbind = bindResize(ts);

        // Ground plane
        const groundGeo = new THREE.PlaneGeometry(40, 40);
        const groundMat = standardMaterial(0x1e293b, { roughness: 0.8 });
        const ground = new THREE.Mesh(groundGeo, groundMat);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -0.01;
        ground.receiveShadow = true;
        ts.group.add(ground);

        const grid = new THREE.GridHelper(40, 80, 0x334155, 0x1e293b);
        ts.group.add(grid);

        // Main axis line
        const axisGeo = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(-20, 0, 0),
          new THREE.Vector3(20, 0, 0)
        ]);
        const axisMat = new THREE.LineBasicMaterial({ color: 0x3b82f6, linewidth: 2 });
        const axis = new THREE.Line(axisGeo, axisMat);
        ts.group.add(axis);

        // Create convex lens (biconvex)
        const lensGroup = new THREE.Group();
        const lensColor = 0x06b6d4;
        
        // Create lens as two spheres combined
        const sphere1Geo = new THREE.SphereGeometry(3, 32, 32, 0, Math.PI, 0, Math.PI / 2);
        const sphere2Geo = new THREE.SphereGeometry(3, 32, 32, Math.PI, Math.PI, 0, Math.PI / 2);
        
        const lensMat = standardMaterial(lensColor, { 
          metalness: 0.3, 
          roughness: 0.1, 
          transparent: true, 
          opacity: 0.8,
          emissive: lensColor, 
          emissiveIntensity: 0.1 
        });
        
        const lens1 = new THREE.Mesh(sphere1Geo, lensMat);
        lens1.position.y = 0;
        lens1.rotation.x = Math.PI / 2;
        lensGroup.add(lens1);
        
        const lens2 = new THREE.Mesh(sphere2Geo, lensMat);
        lens2.position.y = 0;
        lens2.rotation.x = Math.PI / 2;
        lensGroup.add(lens2);
        
        // Lens frame
        const frameGeo = new THREE.TorusGeometry(3.2, 0.1, 16, 48);
        const frameMat = standardMaterial(0x475569, { metalness: 0.6 });
        const frame = new THREE.Mesh(frameGeo, frameMat);
        frame.rotation.x = Math.PI / 2;
        lensGroup.add(frame);
        
        ts.group.add(lensGroup);

        // Pole to hold lens
        const poleGeo = new THREE.CylinderGeometry(0.2, 0.2, 1, 16);
        const poleMat = standardMaterial(0x475569);
        const pole = new THREE.Mesh(poleGeo, poleMat);
        pole.position.set(0, -1, 0);
        ts.group.add(pole);

        // Object (arrow)
        const objectGroup = new THREE.Group();
        const objectHeight = 2;
        const objectArrow = new THREE.ArrowHelper(
          new THREE.Vector3(0, 1, 0), 
          new THREE.Vector3(0, -objectHeight/2, 0), 
          objectHeight, 
          0xef4444, 
          0.4, 
          0.3
        );
        objectGroup.add(objectArrow);
        objectGroup.position.x = objectPosition;
        ts.group.add(objectGroup);

        // Focus points
        const focusGroup1 = new THREE.Group();
        const focusGroup2 = new THREE.Group();
        
        if (showFocus) {
          // Left focus
          const focusGeo1 = new THREE.SphereGeometry(0.3, 16, 16);
          const focusMat1 = standardMaterial(0x22c55e, { emissive: 0x22c55e, emissiveIntensity: 0.5 });
          const focus1 = new THREE.Mesh(focusGeo1, focusMat1);
          focus1.position.x = -focalLength;
          focusGroup1.add(focus1);
          
          // Right focus
          const focus2 = new THREE.Mesh(focusGeo1, focusMat1);
          focus2.position.x = focalLength;
          focusGroup2.add(focus2);
        }
        ts.group.add(focusGroup1);
        ts.group.add(focusGroup2);

        // Image point
        const imageGroup = new THREE.Group();
        if (isRealImage) {
          const imageGeo = new THREE.SphereGeometry(0.25, 16, 16);
          const imageMat = standardMaterial(0xfbbf24, { emissive: 0xfbbf24, emissiveIntensity: 0.5 });
          const image = new THREE.Mesh(imageGeo, imageMat);
          image.position.x = imagePosition;
          imageGroup.add(image);
        }
        ts.group.add(imageGroup);

        // Ray lines
        const rayGroup = new THREE.Group();
        
        function updateRays() {
          while (rayGroup.children.length > 0) {
            const child = rayGroup.children[0];
            rayGroup.remove(child);
            if (child instanceof THREE.Line) {
              child.geometry.dispose();
              (child.material as THREE.Material).dispose();
            }
          }
          if (!showRays) return;

          // Ray 1: Parallel to principal axis (passes through right focus)
          const r1Start = new THREE.Vector3(objectPosition, objectHeight/2, 0);
          const r1End = new THREE.Vector3(focalLength, 0, 0);
          const r1Geo = new THREE.BufferGeometry().setFromPoints([r1Start, r1End]);
          const r1 = new THREE.Line(r1Geo, new THREE.LineBasicMaterial({ color: 0x22c55e, linewidth: 2, transparent: true, opacity: 0.9 }));
          rayGroup.add(r1);

          // Ray 2: Through left focus (emerges parallel)
          const r2Start = new THREE.Vector3(objectPosition, objectHeight/2, 0);
          const r2End = new THREE.Vector3(-focalLength, objectHeight/2, 0);
          const r2Geo = new THREE.BufferGeometry().setFromPoints([r2Start, r2End]);
          const r2 = new THREE.Line(r2Geo, new THREE.LineBasicMaterial({ color: 0xfbbf24, linewidth: 2, transparent: true, opacity: 0.9 }));
          rayGroup.add(r2);
          
          // Continue ray 2 after lens (parallel)
          const r2ContStart = new THREE.Vector3(0, objectHeight/2, 0);
          const r2ContEnd = new THREE.Vector3(20, objectHeight/2, 0);
          const r2ContGeo = new THREE.BufferGeometry().setFromPoints([r2ContStart, r2ContEnd]);
          const r2Cont = new THREE.Line(r2ContGeo, new THREE.LineBasicMaterial({ color: 0xfbbf24, linewidth: 2, transparent: true, opacity: 0.9 }));
          rayGroup.add(r2Cont);

          // Ray 3: Through optical center (goes straight)
          const r3Start = new THREE.Vector3(objectPosition, objectHeight/2, 0);
          const r3End = new THREE.Vector3(objectPosition, -objectHeight/2, 0);
          const r3Geo = new THREE.BufferGeometry().setFromPoints([r3Start, r3End]);
          const r3 = new THREE.Line(r3Geo, new THREE.LineBasicMaterial({ color: 0xa855f7, linewidth: 2, transparent: true, opacity: 0.8 }));
          rayGroup.add(r3);
          
          // Continue ray 3 after lens
          const r3ContStart = new THREE.Vector3(0, objectHeight/2, 0);
          const r3ContEnd = new THREE.Vector3(imagePosition, 0, 0);
          const r3ContGeo = new THREE.BufferGeometry().setFromPoints([r3ContStart, r3ContEnd]);
          const r3Cont = new THREE.Line(r3ContGeo, new THREE.LineBasicMaterial({ color: 0xa855f7, linewidth: 2, transparent: true, opacity: 0.8 }));
          rayGroup.add(r3Cont);
        }
        ts.group.add(rayGroup);
        updateRays();

        // LABELS
        try {
          const { CSS2DRenderer, CSS2DObject } = await import("three/addons/renderers/CSS2DRenderer.js");
          labelRenderer = new CSS2DRenderer();
          labelRenderer.setSize(mountRef.current!.clientWidth, mountRef.current!.clientHeight);
          labelRenderer.domElement.style.position = "absolute";
          labelRenderer.domElement.style.top = "0";
          labelRenderer.domElement.style.pointerEvents = "none";
          labelRenderer.domElement.style.zIndex = "10";
          mountRef.current!.appendChild(labelRenderer.domElement);

          const lensLabel = new CSS2DObject(document.createElement("div"));
          lensLabel.element.className = "label";
          lensLabel.element.innerHTML = '<div style="background:rgba(0,0,0,0.8);padding:6px 10px;border-radius:4px;border:1px solid #06b6d4"><span style="color:#06b6d4;font-weight:600">Convex Lens</span><br><span style="color:#67e8f9;font-size:10px">Biconvex, Converging</span></div>';
          lensLabel.position.set(0, 4, 0);
          lensGroup.add(lensLabel);
          labels.push(lensLabel);

          if (showFocus) {
            const focusLabel1 = new CSS2DObject(document.createElement("div"));
            focusLabel1.element.className = "label";
            focusLabel1.element.innerHTML = '<div style="background:rgba(0,0,0,0.8);padding:4px 8px;border-radius:4px;border:1px solid #22c55e"><span style="color:#22c55e;font-weight:600">F₁</span></div>';
            focusLabel1.position.set(-focalLength, 1, 0);
            focusGroup1.add(focusLabel1);
            labels.push(focusLabel1);

            const focusLabel2 = new CSS2DObject(document.createElement("div"));
            focusLabel2.element.className = "label";
            focusLabel2.element.innerHTML = '<div style="background:rgba(0,0,0,0.8);padding:4px 8px;border-radius:4px;border:1px solid #22c55e"><span style="color:#22c55e;font-weight:600">F₂</span></div>';
            focusLabel2.position.set(focalLength, 1, 0);
            focusGroup2.add(focusLabel2);
            labels.push(focusLabel2);
          }

          const objectLabel = new CSS2DObject(document.createElement("div"));
          objectLabel.element.className = "label";
          objectLabel.element.innerHTML = '<div style="background:rgba(0,0,0,0.8);padding:4px 8px;border-radius:4px;border:1px solid #ef4444"><span style="color:#ef4444;font-weight:600">Object (O)</span></div>';
          objectLabel.position.set(objectPosition, 2.5, 0);
          objectGroup.add(objectLabel);
          labels.push(objectLabel);

          if (isRealImage) {
            const imageLabel = new CSS2DObject(document.createElement("div"));
            imageLabel.element.className = "label";
            imageLabel.element.innerHTML = `<div style="background:rgba(0,0,0,0.8);padding:4px 8px;border-radius:4px;border:1px solid #fbbf24"><span style="color:#fbbf24;font-weight:600">Image (I)</span><br><span style="color:#fda4af;font-size:10px">m=${magnification.toFixed(2)}x</span></div>`;
            imageLabel.position.set(imagePosition, 1, 0);
            imageGroup.add(imageLabel);
            labels.push(imageLabel);
          }
        } catch (e) { console.log("CSS2DRenderer not available"); }

        function animate() {
          if (cancelled) return;
          requestAnimationFrame(animate);
          objectGroup.position.x = objectPosition;
          focusGroup1.children.forEach((c: any) => { if (c instanceof THREE.Mesh) c.position.x = -focalLength; });
          focusGroup2.children.forEach((c: any) => { if (c instanceof THREE.Mesh) c.position.x = focalLength; });
          if (labels[1]) labels[1].position.x = -focalLength;
          if (labels[2]) labels[2].position.x = focalLength;
          if (isRealImage) { imageGroup.children.forEach((c: any) => { if (c instanceof THREE.Mesh) c.position.x = imagePosition; }); }
          if (labels[4] && isRealImage) { labels[4].position.x = imagePosition; labels[4].element.innerHTML = `<div style="background:rgba(0,0,0,0.8);padding:4px 8px;border-radius:4px;border:1px solid #fbbf24"><span style="color:#fbbf24;font-weight:600">Image (I)</span><br><span style="color:#fda4af;font-size:10px">m=${magnification.toFixed(2)}x</span></div>`; }
          if (labels[3]) labels[3].position.x = objectPosition;
          updateRays();
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
      if (ts) try { disposeThreeScene(ts); } catch (e) {}
      if (mountRef.current) { const el = mountRef.current!.querySelectorAll(".label"); el.forEach(e => e.remove()); }
    };
  }, [focalLength, objectPosition, showRays, showLabels, showFocus]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>3D Convex Lens with Labels</CardTitle>
        <CardDescription>Interactive convex lens with ray diagrams showing real and virtual image formation</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div ref={mountRef} className="w-full h-96 bg-gray-100 rounded-lg" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <Label>Focal Length (f) in cm</Label>
              <Slider min={5} max={20} step={1} value={[focalLength]} onValueChange={v => setFocalLength(v[0])} />
              <p className="text-sm text-gray-500">Current: {focalLength} cm</p>
            </div>
            <div>
              <Label>Object Position (u) in cm</Label>
              <Slider min={-30} max={-5} step={1} value={[objectPosition]} onValueChange={v => setObjectPosition(v[0])} />
              <p className="text-sm text-gray-500">Current: {objectPosition} cm</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="rounded-md border border-border bg-muted/30 p-4">
              <h4 className="font-semibold mb-3 text-primary">Lens Formula:</h4>
              <p className="text-lg font-bold text-cyan-600">1/f = 1/v - 1/u</p>
              <div className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between"><span>f:</span><span className="font-mono">{focalLength} cm</span></div>
                <div className="flex justify-between"><span>u:</span><span className="font-mono">{objectPosition} cm</span></div>
                <div className="flex justify-between"><span>v:</span><span className="font-mono">{imagePosition.toFixed(2)} cm</span></div>
                <div className="flex justify-between"><span>m:</span><span className="font-mono">{magnification.toFixed(2)}x</span></div>
                <div className="flex justify-between"><span>Image:</span><span className={`font-mono ${isRealImage ? 'text-green-600' : 'text-orange-600'}`}>{isRealImage ? 'Real, Inverted' : 'Virtual, Erect'}</span></div>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button variant={showRays ? "default" : "outline"} size="sm" onClick={() => setShowRays(!showRays)}>{showRays ? 'Hide' : 'Show'} Rays</Button>
              <Button variant={showLabels ? "default" : "outline"} size="sm" onClick={() => setShowLabels(!showLabels)}>{showLabels ? 'Hide' : 'Show'} Labels</Button>
              <Button variant={showFocus ? "default" : "outline"} size="sm" onClick={() => setShowFocus(!showFocus)}>{showFocus ? 'Hide' : 'Show'} Focus</Button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="flex items-center gap-2"><div className="w-4 h-4 bg-cyan-500 rounded"/><div><p className="font-medium text-sm">Convex Lens</p><p className="text-xs text-muted-foreground">Converging</p></div></div>
          <div className="flex items-center gap-2"><div className="w-4 h-4 bg-green-500 rounded-full"/><div><p className="font-medium text-sm">Focus (F)</p><p className="text-xs text-muted-foreground">F₁ & F₂</p></div></div>
          <div className="flex items-center gap-2"><div className="w-4 h-4 bg-red-500"/><div><p className="font-medium text-sm">Object</p><p className="text-xs text-muted-foreground">Light source</p></div></div>
          <div className="flex items-center gap-2"><div className="w-4 h-4 bg-yellow-500 rounded-full"/><div><p className="font-medium text-sm">Image</p><p className="text-xs text-muted-foreground">{isRealImage ? 'Real' : 'Virtual'}</p></div></div>
        </div>
        <div className="rounded-md border border-border bg-muted/30 p-4">
          <h4 className="font-semibold mb-3 text-primary">Ray Rules for Convex Lens:</h4>
          <ol className="space-y-2 text-sm list-decimal pl-5">
            <li><strong>Parallel Ray</strong> → passes through right focus (F₂)</li>
            <li><strong>Focal Ray</strong> → emerges parallel to principal axis</li>
            <li><strong>Central Ray</strong> → goes straight through optical center</li>
          </ol>
        </div>
        <div className="rounded-md border border-border bg-muted/30 p-4">
          <h4 className="font-semibold mb-3 text-primary">Applications:</h4>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-start gap-2"><span className="text-lg">👓</span><div><p className="font-medium">Spectacles</p><p className="text-xs text-muted-foreground">Hyperopia correction</p></div></div>
            <div className="flex items-start gap-2"><span className="text-lg">📷</span><div><p className="font-medium">Cameras</p><p className="text-xs text-muted-foreground">Focus light</p></div></div>
            <div className="flex items-start gap-2"><span className="text-lg">🔭</span><div><p className="font-medium">Microscopes</p><p className="text-xs text-muted-foreground">Magnify small objects</p></div></div>
            <div className="flex items-start gap-2"><span className="text-lg">🔦</span><div><p className="font-medium">Projectors</p><p className="text-xs text-muted-foreground">Enlarge images</p></div></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Concave Lens 3D Component
const ConcaveLens3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [focalLength, setFocalLength] = useState(10);
  const [objectPosition, setObjectPosition] = useState(-15);
  const [showRays, setShowRays] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const [showFocus, setShowFocus] = useState(true);

  // For concave lens, f is negative
  // Calculate image position using lens formula: 1/f = 1/v - 1/u
  const imagePosition = 1 / (1/(-focalLength) + 1/objectPosition);
  const isVirtualImage = true; // Concave lens always forms virtual image
  const magnification = -imagePosition / objectPosition;

  useEffect(() => {
    if (!mountRef.current || !isWebGLAvailable()) return;

    let ts: any = null;
    let unbind: (() => void) | null = null;
    let cancelled = false;
    let labelRenderer: any = null;
    const labels: any[] = [];

    async function init() {
      try {
        const { createThreeScene, bindResize } = await import("@/components/lab/three-scene");
        
        ts = createThreeScene(mountRef.current!, {
          cameraPosition: new THREE.Vector3(0, 5, 20),
          autoRotate: false,
          background: 0x0f172a
        });
        
        unbind = bindResize(ts);

        // Ground plane
        const groundGeo = new THREE.PlaneGeometry(40, 40);
        const groundMat = standardMaterial(0x1e293b, { roughness: 0.8 });
        const ground = new THREE.Mesh(groundGeo, groundMat);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -0.01;
        ground.receiveShadow = true;
        ts.group.add(ground);

        const grid = new THREE.GridHelper(40, 80, 0x334155, 0x1e293b);
        ts.group.add(grid);

        // Main axis line
        const axisGeo = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(-20, 0, 0),
          new THREE.Vector3(20, 0, 0)
        ]);
        const axisMat = new THREE.LineBasicMaterial({ color: 0x3b82f6, linewidth: 2 });
        const axis = new THREE.Line(axisGeo, axisMat);
        ts.group.add(axis);

        // Create concave lens (biconcave)
        const lensGroup = new THREE.Group();
        const lensColor = 0xf59e0b;
        
        // Create concave lens as two spheres with negative curvature
        const sphere1Geo = new THREE.SphereGeometry(3, 32, 32, 0, Math.PI, Math.PI / 2, Math.PI);
        const sphere2Geo = new THREE.SphereGeometry(3, 32, 32, Math.PI, Math.PI, Math.PI / 2, Math.PI);
        
        const lensMat = standardMaterial(lensColor, { 
          metalness: 0.3, 
          roughness: 0.1, 
          transparent: true, 
          opacity: 0.8,
          emissive: lensColor, 
          emissiveIntensity: 0.1 
        });
        
        const lens1 = new THREE.Mesh(sphere1Geo, lensMat);
        lens1.position.y = 0;
        lens1.rotation.x = Math.PI / 2;
        lensGroup.add(lens1);
        
        const lens2 = new THREE.Mesh(sphere2Geo, lensMat);
        lens2.position.y = 0;
        lens2.rotation.x = Math.PI / 2;
        lensGroup.add(lens2);
        
        // Lens frame
        const frameGeo = new THREE.TorusGeometry(3.2, 0.1, 16, 48);
        const frameMat = standardMaterial(0x475569, { metalness: 0.6 });
        const frame = new THREE.Mesh(frameGeo, frameMat);
        frame.rotation.x = Math.PI / 2;
        lensGroup.add(frame);
        
        ts.group.add(lensGroup);

        // Pole to hold lens
        const poleGeo = new THREE.CylinderGeometry(0.2, 0.2, 1, 16);
        const poleMat = standardMaterial(0x475569);
        const pole = new THREE.Mesh(poleGeo, poleMat);
        pole.position.set(0, -1, 0);
        ts.group.add(pole);

        // Object (arrow)
        const objectGroup = new THREE.Group();
        const objectHeight = 2;
        const objectArrow = new THREE.ArrowHelper(
          new THREE.Vector3(0, 1, 0), 
          new THREE.Vector3(0, -objectHeight/2, 0), 
          objectHeight, 
          0xef4444, 
          0.4, 
          0.3
        );
        objectGroup.add(objectArrow);
        objectGroup.position.x = objectPosition;
        ts.group.add(objectGroup);

        // Virtual focus points
        const focusGroup1 = new THREE.Group();
        const focusGroup2 = new THREE.Group();
        
        if (showFocus) {
          // Left virtual focus
          const focusGeo1 = new THREE.SphereGeometry(0.3, 16, 16);
          const focusMat1 = standardMaterial(0x22c55e, { emissive: 0x22c55e, emissiveIntensity: 0.5, transparent: true, opacity: 0.7 });
          const focus1 = new THREE.Mesh(focusGeo1, focusMat1);
          focus1.position.x = -focalLength;
          focusGroup1.add(focus1);
          
          // Right virtual focus
          const focus2 = new THREE.Mesh(focusGeo1, focusMat1);
          focus2.position.x = focalLength;
          focusGroup2.add(focus2);
        }
        ts.group.add(focusGroup1);
        ts.group.add(focusGroup2);

        // Image point (always virtual for concave lens)
        const imageGroup = new THREE.Group();
        const imageGeo = new THREE.SphereGeometry(0.25, 16, 16);
        const imageMat = standardMaterial(0xfbbf24, { emissive: 0xfbbf24, emissiveIntensity: 0.5, transparent: true, opacity: 0.8 });
        const image = new THREE.Mesh(imageGeo, imageMat);
        image.position.x = imagePosition;
        imageGroup.add(image);
        ts.group.add(imageGroup);

        // Ray lines
        const rayGroup = new THREE.Group();
        
        function updateRays() {
          while (rayGroup.children.length > 0) {
            const child = rayGroup.children[0];
            rayGroup.remove(child);
            if (child instanceof THREE.Line) {
              child.geometry.dispose();
              (child.material as THREE.Material).dispose();
            }
          }
          if (!showRays) return;

          // Ray 1: Parallel to principal axis (diverges as if from left focus)
          const r1Start = new THREE.Vector3(objectPosition, objectHeight/2, 0);
          const r1End = new THREE.Vector3(20, 0.5, 0);
          const r1Geo = new THREE.BufferGeometry().setFromPoints([r1Start, r1End]);
          const r1 = new THREE.Line(r1Geo, new THREE.LineBasicMaterial({ color: 0x22c55e, linewidth: 2, transparent: true, opacity: 0.9 }));
          rayGroup.add(r1);

          // Ray 2: Directed toward right focus (emerges parallel)
          const r2Start = new THREE.Vector3(objectPosition, objectHeight/2, 0);
          const r2End = new THREE.Vector3(focalLength, objectHeight/2, 0);
          const r2Geo = new THREE.BufferGeometry().setFromPoints([r2Start, r2End]);
          const r2 = new THREE.Line(r2Geo, new THREE.LineBasicMaterial({ color: 0xfbbf24, linewidth: 2, transparent: true, opacity: 0.9 }));
          rayGroup.add(r2);
          
          // Continue ray 2 after lens (parallel)
          const r2ContStart = new THREE.Vector3(0, objectHeight/2, 0);
          const r2ContEnd = new THREE.Vector3(20, objectHeight/2, 0);
          const r2ContGeo = new THREE.BufferGeometry().setFromPoints([r2ContStart, r2ContEnd]);
          const r2Cont = new THREE.Line(r2ContGeo, new THREE.LineBasicMaterial({ color: 0xfbbf24, linewidth: 2, transparent: true, opacity: 0.9 }));
          rayGroup.add(r2Cont);

          // Ray 3: Through optical center (goes straight)
          const r3Start = new THREE.Vector3(objectPosition, objectHeight/2, 0);
          const r3End = new THREE.Vector3(0, objectHeight/2, 0);
          const r3Geo = new THREE.BufferGeometry().setFromPoints([r3Start, r3End]);
          const r3 = new THREE.Line(r3Geo, new THREE.LineBasicMaterial({ color: 0xa855f7, linewidth: 2, transparent: true, opacity: 0.8 }));
          rayGroup.add(r3);
          
          // Continue ray 3 after lens
          const r3ContStart = new THREE.Vector3(0, objectHeight/2, 0);
          const r3ContEnd = new THREE.Vector3(imagePosition, 0, 0);
          const r3ContGeo = new THREE.BufferGeometry().setFromPoints([r3ContStart, r3ContEnd]);
          const r3Cont = new THREE.Line(r3ContGeo, new THREE.LineBasicMaterial({ color: 0xa855f7, linewidth: 2, transparent: true, opacity: 0.8 }));
          rayGroup.add(r3Cont);
        }
        ts.group.add(rayGroup);
        updateRays();

        // LABELS
        try {
          const { CSS2DRenderer, CSS2DObject } = await import("three/addons/renderers/CSS2DRenderer.js");
          labelRenderer = new CSS2DRenderer();
          labelRenderer.setSize(mountRef.current!.clientWidth, mountRef.current!.clientHeight);
          labelRenderer.domElement.style.position = "absolute";
          labelRenderer.domElement.style.top = "0";
          labelRenderer.domElement.style.pointerEvents = "none";
          labelRenderer.domElement.style.zIndex = "10";
          mountRef.current!.appendChild(labelRenderer.domElement);

          const lensLabel = new CSS2DObject(document.createElement("div"));
          lensLabel.element.className = "label";
          lensLabel.element.innerHTML = '<div style="background:rgba(0,0,0,0.8);padding:6px 10px;border-radius:4px;border:1px solid #f59e0b"><span style="color:#f59e0b;font-weight:600">Concave Lens</span><br><span style="color:#fde68a;font-size:10px">Biconcave, Diverging</span></div>';
          lensLabel.position.set(0, 4, 0);
          lensGroup.add(lensLabel);
          labels.push(lensLabel);

          if (showFocus) {
            const focusLabel1 = new CSS2DObject(document.createElement("div"));
            focusLabel1.element.className = "label";
            focusLabel1.element.innerHTML = '<div style="background:rgba(0,0,0,0.8);padding:4px 8px;border-radius:4px;border:1px solid #22c55e"><span style="color:#22c55e;font-weight:600">F₁</span></div>';
            focusLabel1.position.set(-focalLength, 1, 0);
            focusGroup1.add(focusLabel1);
            labels.push(focusLabel1);

            const focusLabel2 = new CSS2DObject(document.createElement("div"));
            focusLabel2.element.className = "label";
            focusLabel2.element.innerHTML = '<div style="background:rgba(0,0,0,0.8);padding:4px 8px;border-radius:4px;border:1px solid #22c55e"><span style="color:#22c55e;font-weight:600">F₂</span></div>';
            focusLabel2.position.set(focalLength, 1, 0);
            focusGroup2.add(focusLabel2);
            labels.push(focusLabel2);
          }

          const objectLabel = new CSS2DObject(document.createElement("div"));
          objectLabel.element.className = "label";
          objectLabel.element.innerHTML = '<div style="background:rgba(0,0,0,0.8);padding:4px 8px;border-radius:4px;border:1px solid #ef4444"><span style="color:#ef4444;font-weight:600">Object (O)</span></div>';
          objectLabel.position.set(objectPosition, 2.5, 0);
          objectGroup.add(objectLabel);
          labels.push(objectLabel);

          const imageLabel = new CSS2DObject(document.createElement("div"));
          imageLabel.element.className = "label";
          imageLabel.element.innerHTML = `<div style="background:rgba(0,0,0,0.8);padding:4px 8px;border-radius:4px;border:1px solid #fbbf24"><span style="color:#fbbf24;font-weight:600">Image (I)</span><br><span style="color:#fda4af;font-size:10px">Virtual, Erect</span></div>`;
          imageLabel.position.set(imagePosition, 1, 0);
          imageGroup.add(imageLabel);
          labels.push(imageLabel);
        } catch (e) { console.log("CSS2DRenderer not available"); }

        function animate() {
          if (cancelled) return;
          requestAnimationFrame(animate);
          objectGroup.position.x = objectPosition;
          focusGroup1.children.forEach((c: any) => { if (c instanceof THREE.Mesh) c.position.x = -focalLength; });
          focusGroup2.children.forEach((c: any) => { if (c instanceof THREE.Mesh) c.position.x = focalLength; });
          if (labels[1]) labels[1].position.x = -focalLength;
          if (labels[2]) labels[2].position.x = focalLength;
          imageGroup.children.forEach((c: any) => { if (c instanceof THREE.Mesh) c.position.x = imagePosition; });
          if (labels[4]) { labels[4].position.x = imagePosition; }
          if (labels[3]) labels[3].position.x = objectPosition;
          updateRays();
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
      if (ts) try { disposeThreeScene(ts); } catch (e) {}
      if (mountRef.current) { const el = mountRef.current!.querySelectorAll(".label"); el.forEach(e => e.remove()); }
    };
  }, [focalLength, objectPosition, showRays, showLabels, showFocus]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>3D Concave Lens with Labels</CardTitle>
        <CardDescription>Interactive concave lens with ray diagrams showing virtual image formation</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div ref={mountRef} className="w-full h-96 bg-gray-100 rounded-lg" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <Label>Focal Length (|f|) in cm</Label>
              <Slider min={5} max={20} step={1} value={[focalLength]} onValueChange={v => setFocalLength(v[0])} />
              <p className="text-sm text-gray-500">Current: {focalLength} cm (f is negative)</p>
            </div>
            <div>
              <Label>Object Position (u) in cm</Label>
              <Slider min={-30} max={-5} step={1} value={[objectPosition]} onValueChange={v => setObjectPosition(v[0])} />
              <p className="text-sm text-gray-500">Current: {objectPosition} cm</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="rounded-md border border-border bg-muted/30 p-4">
              <h4 className="font-semibold mb-3 text-primary">Lens Formula:</h4>
              <p className="text-lg font-bold text-amber-600">1/f = 1/v - 1/u</p>
              <p className="text-xs text-muted-foreground mt-1">For concave: f &lt; 0, v &lt; 0 always</p>
              <div className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between"><span>f:</span><span className="font-mono">-{focalLength} cm</span></div>
                <div className="flex justify-between"><span>u:</span><span className="font-mono">{objectPosition} cm</span></div>
                <div className="flex justify-between"><span>v:</span><span className="font-mono">{imagePosition.toFixed(2)} cm</span></div>
                <div className="flex justify-between"><span>m:</span><span className="font-mono">{magnification.toFixed(2)}x</span></div>
                <div className="flex justify-between"><span>Image:</span><span className="font-mono text-orange-600">Virtual, Erect, Diminished</span></div>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button variant={showRays ? "default" : "outline"} size="sm" onClick={() => setShowRays(!showRays)}>{showRays ? 'Hide' : 'Show'} Rays</Button>
              <Button variant={showLabels ? "default" : "outline"} size="sm" onClick={() => setShowLabels(!showLabels)}>{showLabels ? 'Hide' : 'Show'} Labels</Button>
              <Button variant={showFocus ? "default" : "outline"} size="sm" onClick={() => setShowFocus(!showFocus)}>{showFocus ? 'Hide' : 'Show'} Focus</Button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="flex items-center gap-2"><div className="w-4 h-4 bg-amber-500 rounded"/><div><p className="font-medium text-sm">Concave Lens</p><p className="text-xs text-muted-foreground">Diverging</p></div></div>
          <div className="flex items-center gap-2"><div className="w-4 h-4 bg-green-500 rounded-full"/><div><p className="font-medium text-sm">Focus (F)</p><p className="text-xs text-muted-foreground">Virtual foci</p></div></div>
          <div className="flex items-center gap-2"><div className="w-4 h-4 bg-red-500"/><div><p className="font-medium text-sm">Object</p><p className="text-xs text-muted-foreground">Light source</p></div></div>
          <div className="flex items-center gap-2"><div className="w-4 h-4 bg-yellow-500 rounded-full"/><div><p className="font-medium text-sm">Image</p><p className="text-xs text-muted-foreground">Virtual & erect</p></div></div>
        </div>
        <div className="rounded-md border border-border bg-muted/30 p-4">
          <h4 className="font-semibold mb-3 text-primary">Ray Rules for Concave Lens:</h4>
          <ol className="space-y-2 text-sm list-decimal pl-5">
            <li><strong>Parallel Ray</strong> → diverges as if from left focus (F₁)</li>
            <li><strong>Focal Ray</strong> → emerges parallel to principal axis</li>
            <li><strong>Central Ray</strong> → goes straight through optical center</li>
          </ol>
        </div>
        <div className="rounded-md border border-border bg-muted/30 p-4">
          <h4 className="font-semibold mb-3 text-primary">Applications:</h4>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-start gap-2"><span className="text-lg">👓</span><div><p className="font-medium">Spectacles</p><p className="text-xs text-muted-foreground">Myopia correction</p></div></div>
            <div className="flex items-start gap-2"><span className="text-lg">🔍</span><div><p className="font-medium">Galilean Telescope</p><p className="text-xs text-muted-foreground">Eyepiece lens</p></div></div>
            <div className="flex items-start gap-2"><span className="text-lg">🪟</span><div><p className="font-medium">Door Peephole</p><p className="text-xs text-muted-foreground">Wide field of view</p></div></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Main Lenses Component with Tabs
export const Physics3DLenses: React.FC = () => {
  return (
    <Tabs defaultValue="convex" className="w-full">
      <TabsList className="flex-wrap">
        <TabsTrigger value="convex">Convex Lens (Converging)</TabsTrigger>
        <TabsTrigger value="concave">Concave Lens (Diverging)</TabsTrigger>
      </TabsList>
      
      <TabsContent value="convex" className="mt-4">
        <ConvexLens3D />
      </TabsContent>
      
      <TabsContent value="concave" className="mt-4">
        <ConcaveLens3D />
      </TabsContent>
    </Tabs>
  );
};

export default Physics3DLenses;
