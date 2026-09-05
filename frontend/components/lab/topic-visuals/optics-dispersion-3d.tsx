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

const rainbowColors = ["#ff0000", "#ff8800", "#ffff00", "#00ff00", "#0088ff", "#0000ff", "#8800ff"];
const rainbowLabels = ["R", "O", "Y", "G", "B", "I", "V"];

export default function OpticsDispersion3d() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [prismAngle, setPrismAngle] = useState(60);
  const [incAngle, setIncAngle] = useState(50);
  const [isWebGL] = useState(() => isWebGLAvailable());

  useEffect(() => {
    if (!isWebGL || !containerRef.current) return;
    const container = containerRef.current;
    const w = container.clientWidth;
    const h = container.clientHeight || 400;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1e1b4b);
    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
    camera.position.set(0, 2, 6);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(w, h);
    container.appendChild(renderer.domElement);

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
      color: 0x6366f1, transparent: true, opacity: 0.5, side: THREE.DoubleSide,
    }));
    scene.add(prismMesh);

    const prismEdge = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-1.5, -1, 0), new THREE.Vector3(0, 1.5 * Math.tan(apexAngle / 2), 0),
        new THREE.Vector3(1.5, -1, 0), new THREE.Vector3(-1.5, -1, 0),
      ]),
      new THREE.LineBasicMaterial({ color: 0xa5b4fc })
    );
    scene.add(prismEdge);

    const whiteRay = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-4, 0.3, 0), new THREE.Vector3(-0.3, -0.3, 0),
      ]),
      new THREE.LineBasicMaterial({ color: 0xffffff })
    );
    scene.add(whiteRay);

    const spread = 0.6;
    const dispersingRays = rainbowColors.map((color, i) => {
      const offset = (i - 3) * spread / 3;
      const endX = 3 + offset * 0.3;
      const endY = -1.2 + offset;
      const ray = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(-0.3, -0.3, 0),
          new THREE.Vector3(endX, endY, 0),
        ]),
        new THREE.LineBasicMaterial({ color })
      );
      scene.add(ray);
      const sp = mkSprite(rainbowLabels[i], color);
      scene.add(sp);
      sp.position.set(endX + 0.3, endY, 0);
      return ray;
    });

    const spLabel = mkSprite("White Light", "#ffffff");
    scene.add(spLabel);
    spLabel.position.set(-2.5, 0.6, 0);
    const spSpec = mkSprite("Spectrum", "#f0abfc");
    scene.add(spSpec);
    spSpec.position.set(2.5, 1.2, 0);

    // Wavelength legend
    const wlLegend = mkSprite("380-750nm", "#a78bfa");
    scene.add(wlLegend);
    wlLegend.position.set(0, -2, 0);

    // Prism material label
    const matLabel = mkSprite("Glass (n~1.52)", "#34d399");
    scene.add(matLabel);
    matLabel.position.set(0, -1.8, 0);

    let incArc: THREE.Line | null = null;
    let incLabel: THREE.Sprite | null = null;

    const animate = () => {
      const id = requestAnimationFrame(animate);
      controls?.update();
      renderer.render(scene, camera);
      return id;
    };
    let frameId = animate();

    return () => {
      cancelAnimationFrame(frameId);
      container.removeChild(renderer.domElement);
      prismGeo.dispose();
      prismMesh.material.dispose();
      prismEdge.geometry.dispose();
      prismEdge.material.dispose();
      whiteRay.geometry.dispose();
      whiteRay.material.dispose();
      dispersingRays.forEach((r) => { r.geometry.dispose(); r.material.dispose(); });
      wlLegend.material.map?.dispose();
      wlLegend.material.dispose();
      matLabel.material.map?.dispose();
      matLabel.material.dispose();
      spLabel.material.map?.dispose();
      spLabel.material.dispose();
      spSpec.material.map?.dispose();
      spSpec.material.dispose();
      renderer.dispose();
      controls?.dispose();
    };
  }, [prismAngle, isWebGL]);

  if (!isWebGL) return <WebGLFallback title="Dispersion" />;

  return (
    <Card className="border-purple-500/30">
      <CardHeader>
        <CardTitle className="text-purple-300">
          Optics: Dispersion of Light
          <span className="block text-xs font-normal text-purple-400/70 mt-1">
            Drag to rotate · Scroll to zoom
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={containerRef} className="h-[400px] w-full rounded-md overflow-hidden mb-4" />
        <CollapsibleControls label="Prism Parameters">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-purple-300">Prism Apex Angle (°)</Label>
              <Input type="number" min={10} max={90} value={prismAngle}
                onChange={(e) => setPrismAngle(Number(e.target.value))}
                className="bg-purple-900/50 border-purple-700 text-purple-100" />
              <p className="text-xs text-purple-400">{prismAngle}°</p>
            </div>
            <div className="space-y-2">
              <Label className="text-purple-300">Angle of Incidence (°)</Label>
              <Input type="number" min={10} max={80} value={incAngle}
                onChange={(e) => setIncAngle(Number(e.target.value))}
                className="bg-purple-900/50 border-purple-700 text-purple-100" />
              <p className="text-xs text-purple-400">{incAngle}°</p>
            </div>
          </div>
        </CollapsibleControls>
        <div className="mt-4 p-3 rounded-lg border-l-4 border-purple-500 bg-purple-950/50 text-purple-200 text-sm space-y-2">
          <p className="font-semibold text-purple-300">Dispersion</p>
          <p>Different wavelengths refract by different amounts</p>
          <p className="font-semibold text-purple-300 mt-2">Caused by</p>
          <p>n varies with wavelength: n(violet) {'>'} n(red)</p>
          <p className="font-semibold text-purple-300 mt-2">Newton's Discovery</p>
          <p>Isaac Newton showed white light is composed of all colors</p>
          <p className="font-semibold text-purple-300 mt-2">Recombination</p>
          <p>A second inverted prism recombines spectrum back to white light</p>
          <p className="font-semibold text-purple-300 mt-2">Cauchy's Equation</p>
          <p>n(λ) = A + B/λ² + C/λ⁴  (empirical dispersion relation)</p>
          <p className="font-semibold text-purple-300 mt-2">Chromatic Aberration</p>
          <p>Lenses focus different colors at different points</p>
          <p className="font-semibold text-purple-300 mt-2">Rainbow Formation</p>
          <p>Water droplets act as prisms, dispersing sunlight into spectra</p>
          <div className="flex gap-1 mt-2">
            {rainbowColors.map((c, i) => (
              <div key={i} className="w-6 h-3 rounded" style={{ backgroundColor: c }} />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


export { OpticsDispersion3d };
