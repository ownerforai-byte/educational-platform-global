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

export default function OpticsPrism3d() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [prismAngle, setPrismAngle] = useState(60);
  const [wavelength, setWavelength] = useState(550);
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

    const apexAngle = (prismAngle * Math.PI) / 180;
    const prismGeo = new THREE.BufferGeometry();
    const vertices = new Float32Array([
      -1.5, -1, 0,  1.5, -1, 0,  0, 1.5 * Math.tan(apexAngle / 2), 0,
    ]);
    prismGeo.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
    prismGeo.computeVertexNormals();
    const prismMesh = new THREE.Mesh(prismGeo, new THREE.MeshPhongMaterial({
      color: 0x10b981, transparent: true, opacity: 0.6, side: THREE.DoubleSide,
    }));
    scene.add(prismMesh);

    const prismEdge = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-1.5, -1, 0), new THREE.Vector3(0, 1.5 * Math.tan(apexAngle / 2), 0),
        new THREE.Vector3(1.5, -1, 0), new THREE.Vector3(-1.5, -1, 0),
      ]),
      new THREE.LineBasicMaterial({ color: 0x34d399 })
    );
    scene.add(prismEdge);

    // Add refractive index label
    const nLabel = mkSprite("n=" + (wavelength < 450 ? 1.53 : wavelength < 550 ? 1.52 : 1.51), "#10b981");
    nLabel.position.set(0, -2.2, 0);
    scene.add(nLabel);

    // Deviation angle arc
    const devArcPoints = [];
    for (let a = 0; a <= Math.PI / 3; a += 0.05) {
      devArcPoints.push(new THREE.Vector3(0.5 * Math.cos(a), -0.5 + 0.5 * Math.sin(a), 0));
    }
    const devArc = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(devArcPoints),
      new THREE.LineBasicMaterial({ color: 0x22d3ee })
    );
    scene.add(devArc);
    const devLabel = mkSprite("δ", "#22d3ee");
    scene.add(devLabel);
    devLabel.position.set(0.7, -0.3, 0);

    // Entry and exit angle markers
    const entryNormal = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-0.75, -0.5, 0), new THREE.Vector3(-0.75, 0.5, 0),
      ]),
      new THREE.LineBasicMaterial({ color: 0x6ee7b7, transparent: true, opacity: 0.6 })
    );
    scene.add(entryNormal);
    const exitNormal = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0.75, -0.5, 0), new THREE.Vector3(0.75, 0.5, 0),
      ]),
      new THREE.LineBasicMaterial({ color: 0x6ee7b7, transparent: true, opacity: 0.6 })
    );
    scene.add(exitNormal);

    const updateRays = () => {
      const ray = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(-4, 0.5, 0), new THREE.Vector3(-0.5, -0.2, 0),
        ]),
        new THREE.LineBasicMaterial({ color: 0xf59e0b })
      );
      scene.add(ray);
      const dev = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(-0.5, -0.2, 0), new THREE.Vector3(3, -1.5, 0),
        ]),
        new THREE.LineBasicMaterial({ color: 0x22d3ee })
      );
      scene.add(dev);
      const sp = mkSprite(prismAngle + "°", "#34d399");
      scene.add(sp);
      sp.position.set(0, 2, 0);
      const wl = mkSprite(wavelength + "nm", "#fbbf24");
      scene.add(wl);
      wl.position.set(1.5, -1.2, 0);
      return { ray, dev, devArc, entryNormal, exitNormal };
    };

    let rayHelpers = updateRays();
    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      controls?.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      if (containerRef.current) containerRef.current.removeChild(renderer.domElement);
      prismGeo.dispose();
      prismMesh.material.dispose();
      prismEdge.geometry.dispose();
      prismEdge.material.dispose();
      rayHelpers.ray.geometry.dispose();
      rayHelpers.ray.material.dispose();
      rayHelpers.dev.geometry.dispose();
      rayHelpers.dev.material.dispose();
      if (rayHelpers.devArc) {
        rayHelpers.devArc.geometry.dispose();
        rayHelpers.devArc.material.dispose();
      }
      if (rayHelpers.entryNormal) { rayHelpers.entryNormal.geometry.dispose(); rayHelpers.entryNormal.material.dispose(); }
      if (rayHelpers.exitNormal) { rayHelpers.exitNormal.geometry.dispose(); rayHelpers.exitNormal.material.dispose(); }
      nLabel.material.map?.dispose();
      nLabel.material.dispose();
      devLabel.material.map?.dispose();
      devLabel.material.dispose();
      renderer.dispose();
      controls?.dispose();
    };
  }, [prismAngle, wavelength, isWebGL]);

  if (!isWebGL) return <WebGLFallback title="Prism" />;

  return (
    <Card className="border-emerald-500/30">
      <CardHeader>
        <CardTitle className="text-emerald-300">
          Optics: Prism & Deviation
          <span className="block text-xs font-normal text-emerald-400/70 mt-1">
            Drag to rotate · Scroll to zoom
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={containerRef} className="h-[400px] w-full rounded-md overflow-hidden mb-4" />
        <CollapsibleControls label="Prism Parameters">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-emerald-300">Prism Apex Angle (°)</Label>
              <Input type="number" min={10} max={90} value={prismAngle}
                onChange={(e) => setPrismAngle(Number(e.target.value))}
                className="bg-emerald-900/50 border-emerald-700 text-emerald-100" />
              <p className="text-xs text-emerald-400">{prismAngle}°</p>
            </div>
            <div className="space-y-2">
              <Label className="text-emerald-300">Wavelength (nm)</Label>
              <Input type="number" min={380} max={750} value={wavelength}
                onChange={(e) => setWavelength(Number(e.target.value))}
                className="bg-emerald-900/50 border-emerald-700 text-emerald-100" />
              <p className="text-xs text-emerald-400">{wavelength} nm</p>
            </div>
          </div>
        </CollapsibleControls>
        <div className="mt-4 p-3 rounded-lg border-l-4 border-emerald-500 bg-emerald-950/50 text-emerald-200 text-sm space-y-2">
          <p className="font-semibold text-emerald-300">Prism Deviation</p>
          <p>δ = i + e - A  (A = prism angle)</p>
          <p className="font-semibold text-emerald-300 mt-2">Minimum Deviation</p>
          <p>n = sin((A+δₘ)/2) / sin(A/2)</p>
          <p className="font-semibold text-emerald-300 mt-2">Dispersion Power</p>
          <p>ω = (nᵥ - nᵣ) / (n_y - 1)  (violet to red)</p>
          <p className="font-semibold text-emerald-300 mt-2">Direct Vision Prism</p>
          <p>Multiple prisms arranged to disperse without net deviation</p>
        </div>
      </CardContent>
    </Card>
  );
}


export { OpticsPrism3d };
