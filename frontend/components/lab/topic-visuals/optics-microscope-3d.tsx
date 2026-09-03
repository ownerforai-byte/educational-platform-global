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

export default function OpticsMicroscope3d() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [fObjective, setFObjective] = useState(1);
  const [fEyepiece, setFEyepiece] = useState(2.5);
  const [isWebGL] = useState(() => isWebGLAvailable());

  useEffect(() => {
    if (!isWebGL || !containerRef.current) return;
    const w = containerRef.current.clientWidth;
    const h = containerRef.current.clientHeight || 400;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x831843);
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
      new THREE.CylinderGeometry(1.2, 1.2, 0.2, 24),
      new THREE.MeshPhongMaterial({ color: 0xe879f9, transparent: true, opacity: 0.6 })
    );
    objLens.rotation.z = Math.PI / 2;
    objLens.position.set(-1, -1, 0);
    scene.add(objLens);

    const eyeLens = new THREE.Mesh(
      new THREE.CylinderGeometry(1, 1, 0.2, 24),
      new THREE.MeshPhongMaterial({ color: 0xf472b6, transparent: true, opacity: 0.6 })
    );
    eyeLens.rotation.z = Math.PI / 2;
    eyeLens.position.set(2, 1, 0);
    scene.add(eyeLens);

    const tube = new THREE.Mesh(
      new THREE.BoxGeometry(4, 0.15, 0.15),
      new THREE.MeshPhongMaterial({ color: 0xf9a8d4 })
    );
    tube.position.set(0.5, 0, 0);
    scene.add(tube);

    // Stage for specimen
    const stage = new THREE.Mesh(
      new THREE.BoxGeometry(0.8, 0.05, 0.5),
      new THREE.MeshPhongMaterial({ color: 0xf472b6 })
    );
    stage.position.set(-2, -2.5, 0);
    scene.add(stage);

    // Light source
    const light = new THREE.Mesh(
      new THREE.CylinderGeometry(0.3, 0.3, 0.1, 16),
      new THREE.MeshPhongMaterial({ color: 0xfbbf24, emissive: 0xfbbf24, emissiveIntensity: 0.5 })
    );
    light.rotation.z = Math.PI / 2;
    light.position.set(-3, -2.8, 0);
    scene.add(light);

    const updateRays = () => {
      const points = [
        new THREE.Vector3(-3.5, -2, 0),
        new THREE.Vector3(-1, -1, 0),
        new THREE.Vector3(0.5, 0.5, 0),
        new THREE.Vector3(2, 1, 0),
        new THREE.Vector3(3.5, 2.5, 0),
      ];
      const ray = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(points),
        new THREE.LineBasicMaterial({ color: 0xf472b6 })
      );
      scene.add(ray);

      const sp1 = mkSprite("Objective", "#e879f9");
      scene.add(sp1);
      sp1.position.set(-1, -2.2, 0);
      const sp2 = mkSprite("Eyepiece", "#f472b6");
      scene.add(sp2);
      sp2.position.set(2, 2.2, 0);

      // Image labels
      const spImg = mkSprite("Real Image", "#22d3ee");
      scene.add(spImg);
      spImg.position.set(-0.5, 0.3, 0);
      const spFinal = mkSprite("Virtual Image", "#fbbf24");
      scene.add(spFinal);
      spFinal.position.set(2.5, 1.8, 0);

      // Object label
      const spObj = mkSprite("Object", "#f472b6");
      scene.add(spObj);
      spObj.position.set(-2.5, -2.8, 0);

      return { ray, spImg, spFinal, spObj };
    };

    let rayHelper = updateRays();
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
      objLens.geometry.dispose();
      objLens.material.dispose();
      eyeLens.geometry.dispose();
      eyeLens.material.dispose();
      tube.geometry.dispose();
      tube.material.dispose();
      stage.geometry.dispose();
      stage.material.dispose();
      light.geometry.dispose();
      light.material.dispose();
      rayHelper.ray.geometry.dispose();
      rayHelper.ray.material.dispose();
      if (rayHelper.spImg) {
        rayHelper.spImg.material.map?.dispose();
        rayHelper.spImg.material.dispose();
      }
      if (rayHelper.spFinal) {
        rayHelper.spFinal.material.map?.dispose();
        rayHelper.spFinal.material.dispose();
      }
      if (rayHelper.spObj) {
        rayHelper.spObj.material.map?.dispose();
        rayHelper.spObj.material.dispose();
      }
      renderer.dispose();
      controls?.dispose();
    };
  }, [isWebGL]);

  if (!isWebGL) return <WebGLFallback title="Microscope" />;

  return (
    <Card className="border-rose-500/30">
      <CardHeader>
        <CardTitle className="text-rose-300">
          Optics: Compound Microscope
          <span className="block text-xs font-normal text-rose-400/70 mt-1">
            Drag to rotate · Scroll to zoom
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={containerRef} className="h-[400px] w-full rounded-md overflow-hidden mb-4" />
        <CollapsibleControls label="Lens Parameters">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-rose-300">Objective Focal Length (cm)</Label>
              <Input type="number" step={0.1} min={0.2} max={5} value={fObjective}
                onChange={(e) => setFObjective(Number(e.target.value))}
                className="bg-rose-900/50 border-rose-700 text-rose-100" />
              <p className="text-xs text-rose-400">{fObjective} cm</p>
            </div>
            <div className="space-y-2">
              <Label className="text-rose-300">Eyepiece Focal Length (cm)</Label>
              <Input type="number" step={0.1} min={1} max={10} value={fEyepiece}
                onChange={(e) => setFEyepiece(Number(e.target.value))}
                className="bg-rose-900/50 border-rose-700 text-rose-100" />
              <p className="text-xs text-rose-400">{fEyepiece} cm</p>
            </div>
          </div>
        </CollapsibleControls>
        <div className="mt-4 p-3 rounded-lg border-l-4 border-rose-500 bg-rose-950/50 text-rose-200 text-sm space-y-2">
          <p className="font-semibold text-rose-300">Magnification</p>
          <p>M = (L / fₒ) × (D / fₑ)</p>
          <p className="font-semibold text-rose-300 mt-2">Where</p>
          <p>L = tube length, D = near point (25 cm)</p>
          <p className="font-semibold text-rose-300 mt-2">Resolution Limit</p>
          <p>d = 0.61λ / NA (Abbe's criterion)</p>
          <p className="font-semibold text-rose-300 mt-2">Total Magnification</p>
          <p>M_total = M_objective × M_eyepiece</p>
        </div>
      </CardContent>
    </Card>
  );
}


export { OpticsMicroscope3d };
