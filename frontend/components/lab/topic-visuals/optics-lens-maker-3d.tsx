"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import CollapsibleControls from "@/components/lab/collapsible-controls";
import { isWebGLAvailable } from "@/lib/webgl";
import WebGLFallback from "@/components/lab/webgl-fallback";
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

export default function OpticsLensMaker3d() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [R1, setR1] = useState(5);
  const [R2, setR2] = useState(-5);
  const [n, setN] = useState(1.5);
  const [isWebGL] = useState(isWebGLAvailable());

  useEffect(() => {
    if (!isWebGL || !containerRef.current) return;
    const w = containerRef.current.clientWidth;
    const h = containerRef.current.clientHeight || 400;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x2e1065);
    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
    camera.position.set(0, 2, 6);
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

    const f = 1 / ((n - 1) * (1 / R1 - 1 / R2));
    const lensProfile = new THREE.Shape();
    const h2 = 1.5;
    const thickness = Math.min(Math.abs(f) * 0.3, 0.8);
    lensProfile.moveTo(-thickness / 2, -h2);
    lensProfile.lineTo(thickness / 2, -h2);
    lensProfile.lineTo(thickness / 2, h2);
    lensProfile.lineTo(-thickness / 2, h2);
    lensProfile.closePath();

    const extrudeSettings = { depth: 0.3, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.05 };
    const lensGeo = new THREE.ExtrudeGeometry(lensProfile, extrudeSettings);
    const lensMat = new THREE.MeshPhongMaterial({
      color: 0x8b5cf6, transparent: true, opacity: 0.7, side: THREE.DoubleSide,
    });
    const lens = new THREE.Mesh(lensGeo, lensMat);
    scene.add(lens);

    const r1Line = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-4, 0, 0.3), new THREE.Vector3(-1, 0, 0.3),
      ]),
      new THREE.LineBasicMaterial({ color: 0xf472b6 })
    );
    scene.add(r1Line);
    const r2Line = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(1, 0, 0.3), new THREE.Vector3(4, 0, 0.3),
      ]),
      new THREE.LineBasicMaterial({ color: 0x22d3ee })
    );
    scene.add(r2Line);

    const sp1 = mkSprite("R₁=" + R1, "#f472b6");
    scene.add(sp1);
    sp1.position.set(-3, 0.5, 0.3);
    const sp2 = mkSprite("R₂=" + R2, "#22d3ee");
    scene.add(sp2);
    sp2.position.set(3, 0.5, 0.3);
    const spF = mkSprite("f=" + f.toFixed(2), "#a78bfa");
    scene.add(spF);
    spF.position.set(0, -2, 0.3);

    const axisLine = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-5, 0, 0.3), new THREE.Vector3(5, 0, 0.3),
      ]),
      new THREE.LineBasicMaterial({ color: 0x94a3b8 })
    );
    scene.add(axisLine);

    // Secondary axis (vertical)
    const vertLine = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, -2.5, 0.3), new THREE.Vector3(0, 2.5, 0.3),
      ]),
      new THREE.LineBasicMaterial({ color: 0x6b7280, transparent: true, opacity: 0.5 })
    );
    scene.add(vertLine);

    // Scale markers along axis
    const scaleLine = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-4, -2.5, 0.3), new THREE.Vector3(4, -2.5, 0.3),
      ]),
      new THREE.LineBasicMaterial({ color: 0x6b7280 })
    );
    scene.add(scaleLine);
    for (let i = -4; i <= 4; i++) {
      const sTick = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(i, -2.6, 0.3), new THREE.Vector3(i, -2.4, 0.3),
        ]),
        new THREE.LineBasicMaterial({ color: 0x6b7280 })
      );
      scene.add(sTick);
    }

    const animate = () => {
      requestAnimationFrame(animate);
      controls?.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animate);
      if (containerRef.current) containerRef.current.removeChild(renderer.domElement);
      lensGeo.dispose();
      lensMat.dispose();
      r1Line.geometry.dispose();
      r1Line.material.dispose();
      r2Line.geometry.dispose();
      r2Line.material.dispose();
      axisLine.geometry.dispose();
      axisLine.material.dispose();
      vertLine.geometry.dispose();
      vertLine.material.dispose();
      scaleLine.geometry.dispose();
      scaleLine.material.dispose();
      renderer.dispose();
      controls?.dispose();
    };
  }, [R1, R2, n, isWebGL]);

  if (!isWebGL) return <WebGLFallback topic="Lens Maker" />;

  return (
    <Card className="border-violet-500/30">
      <CardHeader>
        <CardTitle className="text-violet-300">
          Optics: Lens Maker&apos;s Equation
          <span className="block text-xs font-normal text-violet-400/70 mt-1">
            Drag to rotate · Scroll to zoom
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={containerRef} className="h-[400px] w-full rounded-md overflow-hidden mb-4" />
        <CollapsibleControls label="Lens Geometry">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-violet-300">R₁ (Front Radius, cm)</Label>
              <Input type="number" step={0.5} min={0.5} max={20} value={R1}
                onChange={(e) => setR1(Number(e.target.value))}
                className="bg-violet-900/50 border-violet-700 text-violet-100" />
            </div>
            <div className="space-y-2">
              <Label className="text-violet-300">R₂ (Back Radius, cm)</Label>
              <Input type="number" step={0.5} min={-20} max={20} value={R2}
                onChange={(e) => setR2(Number(e.target.value))}
                className="bg-violet-900/50 border-violet-700 text-violet-100" />
            </div>
            <div className="space-y-2">
              <Label className="text-violet-300">Refractive Index (n)</Label>
              <Input type="number" step={0.01} min={1.01} max={2.5} value={n}
                onChange={(e) => setN(Number(e.target.value))}
                className="bg-violet-900/50 border-violet-700 text-violet-100" />
              <p className="text-xs text-violet-400">{n}</p>
            </div>
          </div>
        </CollapsibleControls>
        <div className="mt-4 p-3 rounded-lg border-l-4 border-violet-500 bg-violet-950/50 text-violet-200 text-sm space-y-2">
          <p className="font-semibold text-violet-300">Lens Maker&apos;s Equation</p>
          <p>1/f = (n-1)(1/R₁ - 1/R₂)</p>
          <p className="font-semibold text-violet-300 mt-2">Sign Convention</p>
          <p>Positive R: convex surface  |  Negative R: concave surface</p>
          <p className="font-semibold text-violet-300 mt-2">Lens Types</p>
          <p>Biconvex: R₁{'>'}0, R₂{'<'}0  |  Plano-convex: R₂=∞</p>
          <p className="font-semibold text-violet-300 mt-2">Thin Lens Approximation</p>
          <p>Thickness {'<<'} radii of curvature assumed</p>
          <p className="font-semibold text-violet-300 mt-2">Material Dependence</p>
          <p>Higher n → shorter focal length for same geometry</p>
        </div>
      </CardContent>
    </Card>
  );
}
