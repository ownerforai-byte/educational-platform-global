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

export default function OpticsLens3d() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lensType, setLensType] = useState<"convex" | "concave">("convex");
  const [focalLength, setFocalLength] = useState(2);
  const [objDistance, setObjDistance] = useState(4);
  const [isWebGL] = useState(isWebGLAvailable());

  useEffect(() => {
    if (!isWebGL || !containerRef.current) return;
    const w = containerRef.current.clientWidth;
    const h = containerRef.current.clientHeight || 400;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0c4a6e);
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

    const lensGeo = lensType === "convex"
      ? new THREE.CylinderGeometry(2.5, 2.5, 0.4, 32)
      : new THREE.TorusGeometry(2.5, 0.4, 16, 32);
    const lensMat = new THREE.MeshPhongMaterial({
      color: 0x3b82f6, transparent: true, opacity: 0.5, side: THREE.DoubleSide,
    });
    const lens = new THREE.Mesh(lensGeo, lensMat);
    lens.rotation.z = Math.PI / 2;
    scene.add(lens);

    const axisLine = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-6, 0, 0), new THREE.Vector3(6, 0, 0),
      ]),
      new THREE.LineBasicMaterial({ color: 0x94a3b8 })
    );
    scene.add(axisLine);

    // Focal point markers
    const fMarker = new THREE.Mesh(
      new THREE.SphereGeometry(0.12, 16, 16),
      new THREE.MeshPhongMaterial({ color: 0xf59e0b })
    );
    fMarker.position.set(focalLength, 0, 0);
    scene.add(fMarker);
    const fMarker2 = fMarker.clone();
    fMarker2.position.set(-focalLength, 0, 0);
    scene.add(fMarker2);

    // Principal plane
    const principalPlane = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, -2.5, 0), new THREE.Vector3(0, 2.5, 0),
      ]),
      new THREE.LineBasicMaterial({ color: 0x60a5fa, transparent: true, opacity: 0.5 })
    );
    scene.add(principalPlane);

    const updateRays = () => {
      const f = focalLength;
      const u = -objDistance;
      const v = lensType === "convex"
        ? 1 / (1 / f - 1 / Math.abs(u))
        : -1 / (1 / f + 1 / Math.abs(u));

      const ray1 = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(-4, 1.5, 0), new THREE.Vector3(0, 1.5, 0),
          new THREE.Vector3(4, 0, 0),
        ]),
        new THREE.LineBasicMaterial({ color: 0xf59e0b })
      );
      scene.add(ray1);

      const ray2 = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(-4, 1.5, 0), new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(4, -v / Math.abs(u) * 1.5, 0),
        ]),
        new THREE.LineBasicMaterial({ color: 0x22d3ee })
      );
      scene.add(ray2);

      const sp1 = mkSprite("F", "#f59e0b");
      scene.add(sp1);
      sp1.position.set(f, -0.5, 0);
      const spF2 = mkSprite("F'", "#22d3ee");
      scene.add(spF2);
      spF2.position.set(-f, -0.5, 0);
      const spO = mkSprite("O", "#f472b6");
      scene.add(spO);
      spO.position.set(-objDistance, 1.8, 0);
      const spI = mkSprite("I", "#34d399");
      scene.add(spI);
      spI.position.set(v, -0.5, 0);

      return { ray1, ray2 };
    };

    let rayHelpers = updateRays();
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
      rayHelpers.ray1.geometry.dispose();
      rayHelpers.ray1.material.dispose();
      rayHelpers.ray2.geometry.dispose();
      rayHelpers.ray2.material.dispose();
      fMarker.geometry.dispose();
      fMarker.material.dispose();
      fMarker2.geometry.dispose();
      principalPlane.geometry.dispose();
      principalPlane.material.dispose();
      renderer.dispose();
      controls?.dispose();
    };
  }, [lensType, focalLength, objDistance, isWebGL]);

  if (!isWebGL) return <WebGLFallback topic="Lenses" />;

  return (
    <Card className="border-blue-500/30">
      <CardHeader>
        <CardTitle className="text-blue-300">
          Optics: Convex & Concave Lenses
          <span className="block text-xs font-normal text-blue-400/70 mt-1">
            Drag to rotate · Scroll to zoom
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={containerRef} className="h-[400px] w-full rounded-md overflow-hidden mb-4" />
        <CollapsibleControls label="Lens Configuration">
          <div className="space-y-4">
            <div className="flex gap-2">
              {(["convex", "concave"] as const).map((t) => (
                <button key={t} onClick={() => setLensType(t)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    lensType === t ? "bg-blue-600 text-white" : "bg-blue-900/50 text-blue-300 hover:bg-blue-800/50"
                  }`}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
            <div className="space-y-2">
              <Label className="text-blue-300">Focal Length (units)</Label>
              <Input type="number" step={0.1} min={0.5} max={5} value={focalLength}
                onChange={(e) => setFocalLength(Number(e.target.value))}
                className="bg-blue-900/50 border-blue-700 text-blue-100" />
              <p className="text-xs text-blue-400">{focalLength} units</p>
            </div>
            <div className="space-y-2">
              <Label className="text-blue-300">Object Distance (units)</Label>
              <Input type="number" step={0.1} min={0.5} max={8} value={objDistance}
                onChange={(e) => setObjDistance(Number(e.target.value))}
                className="bg-blue-900/50 border-blue-700 text-blue-100" />
              <p className="text-xs text-blue-400">{objDistance} units</p>
            </div>
          </div>
        </CollapsibleControls>
        <div className="mt-4 p-3 rounded-lg border-l-4 border-blue-500 bg-blue-950/50 text-blue-200 text-sm space-y-2">
          <p className="font-semibold text-blue-300">Thin Lens Equation</p>
          <p>1/f = 1/v - 1/u</p>
          <p className="font-semibold text-blue-300 mt-2">Lens Maker&apos;s Formula</p>
          <p>1/f = (n-1)(1/R₁ - 1/R₂)</p>
          <p className="font-semibold text-blue-300 mt-2">Magnification</p>
          <p>m = v/u (positive = upright, negative = inverted)</p>
          <p className="font-semibold text-blue-300 mt-2">Power of Lens</p>
          <p>P = 1/f (in diopters when f in meters)</p>
        </div>
      </CardContent>
    </Card>
  );
}
