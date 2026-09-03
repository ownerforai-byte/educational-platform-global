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

export default function OpticsRefraction3d() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [n1, setN1] = useState(1.0);
  const [n2, setN2] = useState(1.5);
  const [incAngle, setIncAngle] = useState(45);
  const [isWebGL] = useState(isWebGLAvailable());

  useEffect(() => {
    if (!isWebGL || !containerRef.current) return;
    const w = containerRef.current.clientWidth;
    const h = containerRef.current.clientHeight || 400;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0c4a6e);
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

    const interfacePlane = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 6),
      new THREE.MeshPhongMaterial({ color: 0x0891b2, transparent: true, opacity: 0.3, side: THREE.DoubleSide })
    );
    interfacePlane.rotation.x = -Math.PI / 2;
    scene.add(interfacePlane);

    const interfaceLine = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-5, 0, 0),
        new THREE.Vector3(5, 0, 0),
      ]),
      new THREE.LineBasicMaterial({ color: 0x22d3ee })
    );
    scene.add(interfaceLine);

    const updateRays = () => {
      const theta1 = (incAngle * Math.PI) / 180;
      const sinTheta2 = (n1 / n2) * Math.sin(theta1);
      const theta2 = Math.asin(Math.min(sinTheta2, 1));

      const origin = new THREE.Vector3(0, 0, 0);
      const rayDir = new THREE.Vector3(0, -Math.sin(theta1), -Math.cos(theta1));
      const refractDir = new THREE.Vector3(0, Math.sin(theta2), -Math.cos(theta2));

      const incRay = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          origin.clone().add(rayDir.clone().multiplyScalar(-4)),
          origin,
        ]),
        new THREE.LineBasicMaterial({ color: 0xf59e0b })
      );
      scene.add(incRay);

      const refrRay = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([origin, origin.clone().add(refractDir.multiplyScalar(4))]),
        new THREE.LineBasicMaterial({ color: 0x22d3ee })
      );
      scene.add(refrRay);

      const normalLine = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(0, -3, 0),
          new THREE.Vector3(0, 3, 0),
        ]),
        new THREE.LineBasicMaterial({ color: 0xa5b4fc, linewidth: 2 })
      );
      scene.add(normalLine);

      const normalLabel = mkSprite("Normal", "#a5b4fc");
      scene.add(normalLabel);
      normalLabel.position.set(0.3, 2, 0);

      const interfaceLabel = mkSprite("Interface", "#22d3ee");
      scene.add(interfaceLabel);
      interfaceLabel.position.set(3.5, 0.3, 0);

      // Medium boundary lines
      const boundLine1 = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(-5, 0.5, 0), new THREE.Vector3(5, 0.5, 0),
        ]),
        new THREE.LineBasicMaterial({ color: 0x0ea5e9, transparent: true, opacity: 0.4 })
      );
      scene.add(boundLine1);
      const boundLabel1 = mkSprite("n₁ medium", "#0ea5e9");
      scene.add(boundLabel1);
      boundLabel1.position.set(-3.5, 0.6, 0);
      const boundLabel2 = mkSprite("n₂ medium", "#06b6d4");
      scene.add(boundLabel2);
      boundLabel2.position.set(-3.5, -0.6, 0);

      scene.add(mkSprite("n₁=" + n1, "#f59e0b"));
      (scene.children[scene.children.length - 1] as THREE.Sprite).position.set(-2, 1.5, 0);
      const sp2 = mkSprite("n₂=" + n2, "#22d3ee");
      scene.add(sp2);
      sp2.position.set(2, 1.5, 0);
      const spAngle = mkSprite(incAngle + "°", "#fbbf24");
      scene.add(spAngle);
      spAngle.position.set(-0.5, -0.5, 0);

      return { incRay, refrRay, normalLine, boundLine1 };
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
      interfacePlane.geometry.dispose();
      interfacePlane.material.dispose();
      interfaceLine.geometry.dispose();
      interfaceLine.material.dispose();
      rayHelpers.incRay.geometry.dispose();
      rayHelpers.incRay.material.dispose();
      rayHelpers.refrRay.geometry.dispose();
      rayHelpers.refrRay.material.dispose();
      normalLine.geometry.dispose();
      normalLine.material.dispose();
      normalLabel.material.map?.dispose();
      normalLabel.material.dispose();
      interfaceLabel.material.map?.dispose();
      interfaceLabel.material.dispose();
      boundLine1.geometry.dispose();
      boundLine1.material.dispose();
      boundLabel1.material.map?.dispose();
      boundLabel1.material.dispose();
      boundLabel2.material.map?.dispose();
      boundLabel2.material.dispose();
      renderer.dispose();
      controls?.dispose();
    };
  }, [n1, n2, incAngle, isWebGL]);

  if (!isWebGL) return <WebGLFallback topic="Refraction" />;

  return (
    <Card className="border-cyan-500/30">
      <CardHeader>
        <CardTitle className="text-cyan-300">
          Optics: Refraction & Snell&apos;s Law
          <span className="block text-xs font-normal text-cyan-400/70 mt-1">
            Drag to rotate · Scroll to zoom
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={containerRef} className="h-[400px] w-full rounded-md overflow-hidden mb-4" />
        <CollapsibleControls label="Refractive Indices & Angle">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-cyan-300">n₁ (Incident Medium)</Label>
              <Input type="number" step={0.01} min={1} max={3} value={n1}
                onChange={(e) => setN1(Number(e.target.value))}
                className="bg-cyan-900/50 border-cyan-700 text-cyan-100" />
            </div>
            <div className="space-y-2">
              <Label className="text-cyan-300">n₂ (Refracting Medium)</Label>
              <Input type="number" step={0.01} min={1} max={3} value={n2}
                onChange={(e) => setN2(Number(e.target.value))}
                className="bg-cyan-900/50 border-cyan-700 text-cyan-100" />
            </div>
            <div className="space-y-2">
              <Label className="text-cyan-300">Angle of Incidence (°)</Label>
              <Input type="number" min={0} max={89} value={incAngle}
                onChange={(e) => setIncAngle(Number(e.target.value))}
                className="bg-cyan-900/50 border-cyan-700 text-cyan-100" />
              <p className="text-xs text-cyan-400">{incAngle}°</p>
            </div>
          </div>
        </CollapsibleControls>
        <div className="mt-4 p-3 rounded-lg border-l-4 border-cyan-500 bg-cyan-950/50 text-cyan-200 text-sm space-y-2">
          <p className="font-semibold text-cyan-300">Snell&apos;s Law</p>
          <p>n₁ sin(θ₁) = n₂ sin(θ₂)</p>
          <p className="font-semibold text-cyan-300 mt-2">Refractive Index</p>
          <p>n = c / v  (speed of light ratio)</p>
          <p className="font-semibold text-cyan-300 mt-2">Brewster's Angle</p>
          <p>tan(θB) = n₂/n₁  (polarized reflection)</p>
          <p className="font-semibold text-cyan-300 mt-2">Lateral Shift</p>
          <p>Light shifts sideways when passing through parallel slab</p>
        </div>
      </CardContent>
    </Card>
  );
}


export { OpticsRefraction3d };
