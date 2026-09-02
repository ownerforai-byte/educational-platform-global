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

export default function OpticsPower3d() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [focalLength, setFocalLength] = useState(2);
  const [lensType, setLensType] = useState<"convex" | "concave">("convex");
  const [isWebGL] = useState(isWebGLAvailable());

  useEffect(() => {
    if (!isWebGL || !containerRef.current) return;
    const w = containerRef.current.clientWidth;
    const h = containerRef.current.clientHeight || 400;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x064e3b);
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

    const f = lensType === "convex" ? focalLength : -focalLength;
    const power = 1 / (f / 100);

    const lensGeo = new THREE.CylinderGeometry(2, 2, 0.3, 32);
    const lensMat = new THREE.MeshPhongMaterial({
      color: lensType === "convex" ? 0x10b981 : 0x059669,
      transparent: true, opacity: 0.6, side: THREE.DoubleSide,
    });
    const lens = new THREE.Mesh(lensGeo, lensMat);
    lens.rotation.z = Math.PI / 2;
    scene.add(lens);

    const axisLine = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-5, 0, 0), new THREE.Vector3(5, 0, 0),
      ]),
      new THREE.LineBasicMaterial({ color: 0x6ee7b7 })
    );
    scene.add(axisLine);

    const rays = [0.8, 0.4, -0.4, -0.8];
    const rayLines: THREE.Line[] = [];
    rays.forEach((y) => {
      const target = new THREE.Vector3(0, 0, 0);
      const end = new THREE.Vector3(4, y * (f > 0 ? -1 : 1), 0);
      const ray = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(-4, y, 0), target, end,
        ]),
        new THREE.LineBasicMaterial({ color: 0xfbbf24 })
      );
      scene.add(ray);
      rayLines.push(ray);
    });

    const spF = mkSprite("F", "#34d399");
    scene.add(spF);
    spF.position.set(f / 2, -0.5, 0);
    const spP = mkSprite("P=" + power.toFixed(1) + "D", "#10b981");
    scene.add(spP);
    spP.position.set(0, 2.5, 0);

    const diopterScale = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-3, -2.5, 0), new THREE.Vector3(3, -2.5, 0),
      ]),
      new THREE.LineBasicMaterial({ color: 0x6ee7b7 })
    );
    scene.add(diopterScale);

    const tickLabels: THREE.Sprite[] = [];
    for (let i = -5; i <= 5; i++) {
      const tick = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(i * 0.6, -2.6, 0), new THREE.Vector3(i * 0.6, -2.4, 0),
        ]),
        new THREE.LineBasicMaterial({ color: 0x6ee7b7 })
      );
      scene.add(tick);
      if (i !== 0) {
        const tickLabel = mkSprite(i.toString(), "#a7f3d0", 0.15);
        scene.add(tickLabel);
        tickLabel.position.set(i * 0.6, -2.8, 0);
        tickLabels.push(tickLabel);
      }
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
      axisLine.geometry.dispose();
      axisLine.material.dispose();
      rayLines.forEach((r) => { r.geometry.dispose(); r.material.dispose(); });
      lens.material.map?.dispose();
      lens.material.dispose();
      spF.material.map?.dispose();
      spF.material.dispose();
      spP.material.map?.dispose();
      spP.material.dispose();
      powerBar.geometry.dispose();
      powerBar.material.dispose();
      barLabel.material.map?.dispose();
      barLabel.material.dispose();
      diopterScale.geometry.dispose();
      diopterScale.material.dispose();
      tickLabels.forEach((t) => { t.material.map?.dispose(); t.material.dispose(); });
      renderer.dispose();
      controls?.dispose();
    };
  }, [focalLength, lensType, isWebGL]);

  if (!isWebGL) return <WebGLFallback topic="Lens Power" />;

  return (
    <Card className="border-emerald-500/30">
      <CardHeader>
        <CardTitle className="text-emerald-300">
          Optics: Power of a Lens
          <span className="block text-xs font-normal text-emerald-400/70 mt-1">
            Drag to rotate · Scroll to zoom
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={containerRef} className="h-[400px] w-full rounded-md overflow-hidden mb-4" />
        <CollapsibleControls label="Lens Parameters">
          <div className="space-y-4">
            <div className="flex gap-2">
              {(["convex", "concave"] as const).map((t) => (
                <button key={t} onClick={() => setLensType(t)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    lensType === t ? "bg-emerald-600 text-white" : "bg-emerald-900/50 text-emerald-300 hover:bg-emerald-800/50"
                  }`}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
            <div className="space-y-2">
              <Label className="text-emerald-300">Focal Length (cm)</Label>
              <Input type="number" step={0.5} min={0.5} max={10} value={focalLength}
                onChange={(e) => setFocalLength(Number(e.target.value))}
                className="bg-emerald-900/50 border-emerald-700 text-emerald-100" />
              <p className="text-xs text-emerald-400">{focalLength} cm</p>
            </div>
          </div>
        </CollapsibleControls>
        <div className="mt-4 p-3 rounded-lg border-l-4 border-emerald-500 bg-emerald-950/50 text-emerald-200 text-sm space-y-2">
          <p className="font-semibold text-emerald-300">Power of a Lens</p>
          <p>P = 1 / f  (f in meters)</p>
          <p className="font-semibold text-emerald-300 mt-2">Unit: Diopter (D)</p>
          <p>Convex: positive power  |  Concave: negative power</p>
          <p className="font-semibold text-emerald-300 mt-2">Combining Lenses</p>
          <p>P_total = P₁ + P₂  (thin lenses in contact)</p>
          <p className="font-semibold text-emerald-300 mt-2">Focal Length Relation</p>
          <p>Shorter f → stronger lens → higher power</p>
          <p className="font-semibold text-emerald-300 mt-2">Lens Combinations</p>
          <p>Sequential: 1/f_total = 1/f₁ + 1/f₂ - d/(f₁f₂)</p>
          <p className="font-semibold text-emerald-300 mt-2">Clinical Use</p>
          <p>Prescription strengths range from -20D to +20D</p>
          <p className="font-semibold text-emerald-300 mt-2">Achroamt Lens</p>
          <p>Doublet corrects chromatic aberration by combining materials</p>
          <p className="font-semibold text-emerald-300 mt-2">Visual Acuity</p>
          <p>Normal vision: 20/20 ≈ 0 diopters refractive error</p>
          <p className="font-semibold text-emerald-300 mt-2">Contact Lenses</p>
          <p>Contact lens power differs from glasses due to vertex distance</p>
        </div>
      </CardContent>
    </Card>
  );
}
