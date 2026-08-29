"use client";

import { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { isWebGLAvailable } from "@/lib/webgl";
import { createThreeScene, disposeThreeScene, bindResize, standardMaterial } from "@/components/lab/three-scene";

export const ConvexMirror3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [focalLength, setFocalLength] = useState(5);
  const [objectPosition, setObjectPosition] = useState(-8);
  const [showRays, setShowRays] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const [showFocus, setShowFocus] = useState(true);

  // Calculate image position: for convex mirror, f is negative
  const imagePosition = (Math.abs(focalLength) * objectPosition) / (Math.abs(objectPosition) + Math.abs(focalLength));
  const magnification = -imagePosition / objectPosition;

  useEffect(() => {
    if (!mountRef.current || !isWebGLAvailable()) return;

    let ts: any = null;
    let unbind: (() => void) | null = null;
    let cancelled = false;

    async function init() {
      try {
        const { createThreeScene, bindResize } = await import("@/components/lab/three-scene");
        
        ts = createThreeScene(mountRef.current!, {
          cameraPosition: new THREE.Vector3(0, 5, 15),
          autoRotate: false,
          background: 0x0f172a
        });
        
        unbind = bindResize(ts);

        // Ground plane
        const groundGeo = new THREE.PlaneGeometry(30, 30);
        const groundMat = standardMaterial(0x1e293b, { roughness: 0.8 });
        const ground = new THREE.Mesh(groundGeo, groundMat);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -0.01;
        ground.receiveShadow = true;
        ts.group.add(ground);

        const grid = new THREE.GridHelper(30, 60, 0x334155, 0x1e293b);
        ts.group.add(grid);

        // Main axis line
        const axisGeo = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(-15, 0, 0),
          new THREE.Vector3(15, 0, 0)
        ]);
        const axisMat = new THREE.LineBasicMaterial({ color: 0x3b82f6, linewidth: 2 });
        const axis = new THREE.Line(axisGeo, axisMat);
        ts.group.add(axis);

        // Create convex mirror (bulging outward)
        const mirrorGroup = new THREE.Group();
        const mirrorColor = 0xa855f7;
        const mirrorRadius = 8;
        
        // Create convex mirror as a curved surface (bulging outward)
        const curve = new THREE.EllipseCurve(0, 0, mirrorRadius, -1.5, 0, Math.PI, false, 0);
        const points = curve.getPoints(32);
        const mirrorShape = new THREE.Shape();
        mirrorShape.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) mirrorShape.lineTo(points[i].x, points[i].y);
        mirrorShape.lineTo(points[points.length - 1].x, 1.5);
        for (let i = points.length - 1; i >= 0; i--) mirrorShape.lineTo(points[i].x, 1.5);
        mirrorShape.lineTo(points[0].x, points[0].y);
        
        const mirrorExtrudeSettings = { depth: 0.3, bevelEnabled: false };
        const mirrorGeo = new THREE.ExtrudeGeometry(mirrorShape, mirrorExtrudeSettings);
        const mirrorMat = standardMaterial(mirrorColor, { metalness: 0.8, roughness: 0.2, emissive: mirrorColor, emissiveIntensity: 0.1 });
        const mirror = new THREE.Mesh(mirrorGeo, mirrorMat);
        mirror.position.set(0, 0, 0);
        mirror.castShadow = true;
        mirror.receiveShadow = true;
        mirrorGroup.add(mirror);
        
        // Mirror rim
        const rimGeo = new THREE.TorusGeometry(mirrorRadius, 0.15, 16, 32);
        const rimMat = standardMaterial(0x475569, { metalness: 0.6 });
        const rim = new THREE.Mesh(rimGeo, rimMat);
        rim.rotation.x = Math.PI / 2;
        rim.position.set(0, 0, 0);
        mirrorGroup.add(rim);
        
        ts.group.add(mirrorGroup);

        // Pole to hold mirror
        const poleGeo = new THREE.CylinderGeometry(0.2, 0.2, 2, 16);
        const poleMat = standardMaterial(0x475569);
        const pole = new THREE.Mesh(poleGeo, poleMat);
        pole.position.set(0, -1, 0);
        ts.group.add(pole);

        // Object (arrow)
        const objectGroup = new THREE.Group();
        const objectHeight = 2;
        const objectArrow = new THREE.ArrowHelper(
          new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, -objectHeight/2, 0), objectHeight, 0xef4444, 0.4, 0.3
        );
        objectGroup.add(objectArrow);
        objectGroup.position.x = objectPosition;
        ts.group.add(objectGroup);

        // Focus point (behind mirror for convex)
        const focusGroup = new THREE.Group();
        if (showFocus) {
          const focusGeo = new THREE.SphereGeometry(0.3, 16, 16);
          const focusMat = standardMaterial(0x22c55e, { emissive: 0x22c55e, emissiveIntensity: 0.5 });
          const focus = new THREE.Mesh(focusGeo, focusMat);
          focus.position.x = -Math.abs(focalLength);
          focusGroup.add(focus);
        }
        ts.group.add(focusGroup);

        // Image point (always virtual for convex mirror)
        const imageGroup = new THREE.Group();
        const imageGeo = new THREE.SphereGeometry(0.25, 16, 16);
        const imageMat = standardMaterial(0xfbbf24, { emissive: 0xfbbf24, emissiveIntensity: 0.5 });
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

          // Ray 1: Parallel to principal axis (diverges as if from focus)
          const r1Start = new THREE.Vector3(objectPosition, objectHeight/2, 0);
          const r1End = new THREE.Vector3(-15, 1, 0);
          const r1Geo = new THREE.BufferGeometry().setFromPoints([r1Start, r1End]);
          const r1 = new THREE.Line(r1Geo, new THREE.LineBasicMaterial({ color: 0x22c55e, linewidth: 2 }));
          rayGroup.add(r1);

          // Ray 2: Directed toward focus (reflects parallel)
          const r2Start = new THREE.Vector3(objectPosition, objectHeight/2, 0);
          const r2End = new THREE.Vector3(15, 0.5, 0);
          const r2Geo = new THREE.BufferGeometry().setFromPoints([r2Start, r2End]);
          const r2 = new THREE.Line(r2Geo, new THREE.LineBasicMaterial({ color: 0xfbbf24, linewidth: 2, transparent: true, opacity: 0.8 }));
          rayGroup.add(r2);

          // Ray 3: Directed toward center of curvature (reflects back)
          const r3Start = new THREE.Vector3(objectPosition, objectHeight/2, 0);
          const r3End = new THREE.Vector3(objectPosition, -1, 0);
          const r3Geo = new THREE.BufferGeometry().setFromPoints([r3Start, r3End]);
          const r3 = new THREE.Line(r3Geo, new THREE.LineBasicMaterial({ color: 0xa855f7, linewidth: 2, transparent: true, opacity: 0.8 }));
          rayGroup.add(r3);
        }
        ts.group.add(rayGroup);
        updateRays();

        // LABELS
        let labelRenderer: any = null;
        let labels: any[] = [];

        try {
          const { CSS2DRenderer, CSS2DObject } = await import("three/addons/renderers/CSS2DRenderer.js");
          labelRenderer = new CSS2DRenderer();
          labelRenderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
          labelRenderer.domElement.style.position = "absolute";
          labelRenderer.domElement.style.top = "0";
          labelRenderer.domElement.style.pointerEvents = "none";
          labelRenderer.domElement.style.zIndex = "10";
          mountRef.current.appendChild(labelRenderer.domElement);

          const mirrorLabel = new CSS2DObject(document.createElement("div"));
          mirrorLabel.element.className = "label";
          mirrorLabel.element.innerHTML = '<div style="background:rgba(0,0,0,0.8);padding:6px 10px;border-radius:4px;border:1px solid #a855f7"><span style="color:#a855f7;font-weight:600">Convex Mirror</span><br><span style="color:#c4b5fd;font-size:10px">Bulging outward</span></div>';
          mirrorLabel.position.set(0, 3, 0);
          mirrorGroup.add(mirrorLabel);
          labels.push(mirrorLabel);

          if (showFocus) {
            const focusLabel = new CSS2DObject(document.createElement("div"));
            focusLabel.element.className = "label";
            focusLabel.element.innerHTML = '<div style="background:rgba(0,0,0,0.8);padding:4px 8px;border-radius:4px;border:1px solid #22c55e"><span style="color:#22c55e;font-weight:600">Focus (F)</span></div>';
            focusLabel.position.set(-Math.abs(focalLength), 1, 0);
            focusGroup.add(focusLabel);
            labels.push(focusLabel);
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
          focusGroup.children.forEach((c: any) => { if (c instanceof THREE.Mesh) c.position.x = -Math.abs(focalLength); });
          if (labels[1]) labels[1].position.x = -Math.abs(focalLength);
          imageGroup.children.forEach((c: any) => { if (c instanceof THREE.Mesh) c.position.x = imagePosition; });
          if (labels[3]) { labels[3].position.x = imagePosition; }
          if (labels[2]) labels[2].position.x = objectPosition;
          updateRays();
          ts.controls.update(); ts.renderer.render(ts.scene, ts.camera);
          if (labelRenderer) labelRenderer.render(ts.scene, ts.camera);
        }
        animate();
      } catch (error) { console.error("Error:", error); }
    }
    init();

    return () => {
      cancelled = true; if (unbind) unbind();
      if (ts) try { disposeThreeScene(ts); } catch (e) {}
      if (mountRef.current) { const el = mountRef.current.querySelectorAll(".label"); el.forEach(e => e.remove()); }
    };
  }, [focalLength, objectPosition, showRays, showLabels, showFocus]);

  return (
    <Card className="w-full">
      <CardHeader><CardTitle>3D Convex Mirror with Labels</CardTitle>
        <CardDescription>Interactive convex mirror with ray diagrams showing virtual image formation</CardDescription></CardHeader>
      <CardContent className="space-y-6">
        <div ref={mountRef} className="w-full h-96 bg-gray-100 rounded-lg" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div><Label>Focal Length (|f|) in cm</Label><Slider min={1} max={10} step={0.5} value={[focalLength]} onValueChange={v => setFocalLength(v[0])} /><p className="text-sm text-gray-500">Current: {focalLength} cm (f is negative)</p></div>
            <div><Label>Object Position (u) in cm</Label><Slider min={-20} max={-2} step={0.5} value={[objectPosition]} onValueChange={v => setObjectPosition(v[0])} /><p className="text-sm text-gray-500">Current: {objectPosition} cm</p></div>
          </div>
          <div className="space-y-4">
            <div className="rounded-md border border-border bg-muted/30 p-4">
              <h4 className="font-semibold mb-3 text-primary">Mirror Formula:</h4>
              <p className="text-lg font-bold text-purple-600">1/f = 1/v + 1/u</p>
              <p className="text-xs text-muted-foreground mt-1">For convex: f &lt; 0, v &lt; 0 always</p>
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
          <div className="flex items-center gap-2"><div className="w-4 h-4 bg-purple-500 rounded"/><div><p className="font-medium text-sm">Convex Mirror</p><p className="text-xs text-muted-foreground">Bulging outward</p></div></div>
          <div className="flex items-center gap-2"><div className="w-4 h-4 bg-green-500 rounded-full"/><div><p className="font-medium text-sm">Focus (F)</p><p className="text-xs text-muted-foreground">Behind mirror</p></div></div>
          <div className="flex items-center gap-2"><div className="w-4 h-4 bg-red-500"/><div><p className="font-medium text-sm">Object</p><p className="text-xs text-muted-foreground">Light source</p></div></div>
          <div className="flex items-center gap-2"><div className="w-4 h-4 bg-yellow-500 rounded-full"/><div><p className="font-medium text-sm">Image</p><p className="text-xs text-muted-foreground">Virtual & erect</p></div></div>
        </div>
        <div className="rounded-md border border-border bg-muted/30 p-4">
          <h4 className="font-semibold mb-3 text-primary">Key Concepts:</h4>
          <ul className="space-y-2 text-sm">
            <li><strong>Bulging Outward:</strong> Mirror curves away from light source</li>
            <li><strong>Virtual Focus:</strong> Focus is behind the mirror (negative f)</li>
            <li><strong>Always Virtual Image:</strong> Image is always virtual, erect, and diminished</li>
            <li><strong>Wide Field of View:</strong> Larger field of view than plane mirror</li>
            <li><strong>Positive Magnification:</strong> m is always positive (erect) and &lt; 1 (diminished)</li>
          </ul>
        </div>
        <div className="rounded-md border border-border bg-muted/30 p-4">
          <h4 className="font-semibold mb-3 text-primary">Ray Rules for Convex Mirror:</h4>
          <ol className="space-y-2 text-sm list-decimal pl-5">
            <li><strong>Parallel Ray</strong> → diverges as if coming from focus</li>
            <li><strong>Focal Ray</strong> → reflects parallel to principal axis</li>
            <li><strong>Central Ray</strong> → reflects back along its own path</li>
          </ol>
        </div>
        <div className="rounded-md border border-border bg-muted/30 p-4">
          <h4 className="font-semibold mb-3 text-primary">Applications:</h4>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-start gap-2"><span className="text-lg">🚗</span><div><p className="font-medium">Rear-view Mirrors</p><p className="text-xs text-muted-foreground">Wide field of view</p></div></div>
            <div className="flex items-start gap-2"><span className="text-lg">🏪</span><div><p className="font-medium">Security Mirrors</p><p className="text-xs text-muted-foreground">Surveillance in stores</p></div></div>
            <div className="flex items-start gap-2"><span className="text-lg">🌆</span><div><p className="font-medium">Street Corner Mirrors</p><p className="text-xs text-muted-foreground">Blind corner visibility</p></div></div>
            <div className="flex items-start gap-2"><span className="text-lg">🔦</span><div><p className="font-medium">Reflectors</p><p className="text-xs text-muted-foreground">Diverge light widely</p></div></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConvexMirror3D;
