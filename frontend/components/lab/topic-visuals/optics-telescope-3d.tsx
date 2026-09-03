"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallback } from "@/components/lab/webgl-fallback";
import * as THREE from "three";

function mkSprite(text: string, color: string, scale = 0.3) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;
  canvas.width = 256;
  canvas.height = 64;
  ctx.fillStyle = color;
  ctx.font = "bold 28px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, 128, 32);
  const tex = new THREE.CanvasTexture(canvas);
  const mat = new THREE.SpriteMaterial({ map: tex, transparent: true });
  const sprite = new THREE.Sprite(mat);
  sprite.scale.set(scale * 4, scale, 1);
  return sprite;
}

export default function OpticsTelescope3d() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [fObjective, setFObjective] = useState(50);
  const [fEyepiece, setFEyepiece] = useState(5);
  const [isWebGL] = useState(isWebGLAvailable());

  useEffect(() => {
    if (!isWebGL || !containerRef.current) return;
    const w = containerRef.current.clientWidth;
    const h = containerRef.current.clientHeight || 400;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1e293b);
    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
    camera.position.set(0, 2, 8);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(w, h);
    containerRef.current.appendChild(renderer.domElement);

    let controls: any;
    import("three/addons/controls/OrbitControls.js").then((mod) => {
      controls = new mod.OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.08;
    });

    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const dir = new THREE.DirectionalLight(0xffffff, 0.8);
    dir.position.set(3, 5, 3);
    scene.add(dir);

    const objLens = new THREE.Mesh(
      new THREE.CylinderGeometry(1.5, 1.5, 0.2, 24),
      new THREE.MeshPhongMaterial({ color: 0x64748b, transparent: true, opacity: 0.6 })
    );
    objLens.rotation.z = Math.PI / 2;
    objLens.position.set(-2.5, 0, 0);
    scene.add(objLens);

    const eyeLens = new THREE.Mesh(
      new THREE.CylinderGeometry(0.8, 0.8, 0.2, 24),
      new THREE.MeshPhongMaterial({ color: 0x94a3b8, transparent: true, opacity: 0.6 })
    );
    eyeLens.rotation.z = Math.PI / 2;
    eyeLens.position.set(2.5, 0, 0);
    scene.add(eyeLens);

    const tube = new THREE.Mesh(
      new THREE.BoxGeometry(6, 0.1, 0.1),
      new THREE.MeshPhongMaterial({ color: 0x475569 })
    );
    tube.position.set(0, 0, 0);
    scene.add(tube);

    // Objective housing
    const objHousing = new THREE.Mesh(
      new THREE.CylinderGeometry(0.6, 0.8, 0.5, 16),
      new THREE.MeshPhongMaterial({ color: 0x64748b })
    );
    objHousing.rotation.z = Math.PI / 2;
    objHousing.position.set(-2.5, -0.3, 0);
    scene.add(objHousing);

    // Eyepiece housing
    const eyeHousing = new THREE.Mesh(
      new THREE.CylinderGeometry(0.4, 0.5, 0.4, 16),
      new THREE.MeshPhongMaterial({ color: 0x475569 })
    );
    eyeHousing.rotation.z = Math.PI / 2;
    eyeHousing.position.set(2.5, -0.3, 0);
    scene.add(eyeHousing);

    const updateRays = () => {
      const mag = fObjective / fEyepiece;
      const ray1 = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(-5, 0.3, 0), new THREE.Vector3(-2.5, 0.15, 0),
          new THREE.Vector3(0, 0, 0), new THREE.Vector3(2.5, -0.15 * mag, 0),
          new THREE.Vector3(5, -0.3 * mag, 0),
        ]),
        new THREE.LineBasicMaterial({ color: 0xfbbf24 })
      );
      scene.add(ray1);

      const sp1 = mkSprite("Objective", "#94a3b8");
      scene.add(sp1);
      sp1.position.set(-2.5, -1.2, 0);
      const sp2 = mkSprite("Eyepiece", "#cbd5e1");
      scene.add(sp2);
      sp2.position.set(2.5, -1.2, 0);

      // Magnification display
      const spMag = mkSprite("M=" + mag.toFixed(1) + "×", "#fbbf24");
      scene.add(spMag);
      spMag.position.set(0, -1.5, 0);

      // Angle of incidence arc
      const incArcPts = [];
      for (let a = Math.PI; a >= Math.PI - 0.3; a -= 0.02) {
        incArcPts.push(new THREE.Vector3(0.5 * Math.cos(a), 0.5 * Math.sin(a) - 0.5, 0));
      }
      const incArc = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(incArcPts),
        new THREE.LineBasicMaterial({ color: 0xfbbf24 })
      );
      scene.add(incArc);

    // Eyepiece focal point
    const eyeF = new THREE.Mesh(
      new THREE.SphereGeometry(0.08, 12, 12),
      new THREE.MeshPhongMaterial({ color: 0x94a3b8 })
    );
    eyeF.position.set(2.5 + fEyepiece / 10, 0, 0);
    scene.add(eyeF);
    const eyeFLabel = mkSprite("Fₑ", "#cbd5e1");
    scene.add(eyeFLabel);
    eyeFLabel.position.set(2.5 + fEyepiece / 10, -0.4, 0);
    };

    let rayHelper = updateRays();
    const animate = () => {
      requestAnimationFrame(animate);
      controls?.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animate);
      if (containerRef.current) containerRef.current.removeChild(renderer.domElement);
      objLens.geometry.dispose();
      objLens.material.dispose();
      eyeLens.geometry.dispose();
      eyeLens.material.dispose();
      tube.geometry.dispose();
      tube.material.dispose();
      objHousing.geometry.dispose();
      objHousing.material.dispose();
      eyeHousing.geometry.dispose();
      eyeHousing.material.dispose();
      rayHelper.ray1.geometry.dispose();
      rayHelper.ray1.material.dispose();
      if (rayHelper.spMag) {
        rayHelper.spMag.material.map?.dispose();
        rayHelper.spMag.material.dispose();
      }
      if (rayHelper.incArc) { rayHelper.incArc.geometry.dispose(); rayHelper.incArc.material.dispose(); }
      if (rayHelper.eyeF) { rayHelper.eyeF.geometry.dispose(); rayHelper.eyeF.material.dispose(); }
      if (rayHelper.eyeFLabel) { rayHelper.eyeFLabel.material.map?.dispose(); rayHelper.eyeFLabel.material.dispose(); }
      renderer.dispose();
      controls?.dispose();
    };
  }, [fObjective, fEyepiece, isWebGL]);

  if (!isWebGL) return <WebGLFallback topic="Telescope" />;

  return (
    <Card className="border-slate-500/30">
      <CardHeader>
        <CardTitle className="text-slate-300">
          Optics: Refracting Telescope
          <span className="block text-xs font-normal text-slate-400/70 mt-1">
            Drag to rotate · Scroll to zoom
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={containerRef} className="h-[400px] w-full rounded-md overflow-hidden mb-4" />
        <CollapsibleControls label="Lens Parameters">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-slate-300">Objective Focal Length (cm)</Label>
              <Input type="number" step={1} min={10} max={100} value={fObjective}
                onChange={(e) => setFObjective(Number(e.target.value))}
                className="bg-slate-900/50 border-slate-700 text-slate-100" />
              <p className="text-xs text-slate-400">{fObjective} cm</p>
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">Eyepiece Focal Length (cm)</Label>
              <Input type="number" step={0.5} min={1} max={15} value={fEyepiece}
                onChange={(e) => setFEyepiece(Number(e.target.value))}
                className="bg-slate-900/50 border-slate-700 text-slate-100" />
              <p className="text-xs text-slate-400">{fEyepiece} cm</p>
            </div>
          </div>
        </CollapsibleControls>
        <div className="mt-4 p-3 rounded-lg border-l-4 border-slate-500 bg-slate-950/50 text-slate-200 text-sm space-y-2">
          <p className="font-semibold text-slate-300">Angular Magnification</p>
          <p>M = fₒ / fₑ</p>
          <p className="font-semibold text-slate-300 mt-2">Tube Length</p>
          <p>L = fₒ + fₑ (for normal adjustment)</p>
          <p className="font-semibold text-slate-300 mt-2">Aperture</p>
          <p>Larger objective diameter collects more light → brighter image</p>
          <p className="font-semibold text-slate-300 mt-2">Resolution</p>
          <p>θ_min = 1.22λ/D (Rayleigh criterion)</p>
        </div>
      </CardContent>
    </Card>
 