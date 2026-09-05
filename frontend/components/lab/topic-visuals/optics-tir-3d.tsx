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

export default function OpticsTIR3d() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [n1, setN1] = useState(1.5);
  const [n2, setN2] = useState(1.0);
  const [incAngle, setIncAngle] = useState(42);
  const [isWebGL] = useState(() => isWebGLAvailable());

  useEffect(() => {
    if (!isWebGL || !containerRef.current) return;
    const container = containerRef.current;
    const w = container.clientWidth;
    const h = container.clientHeight || 400;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x7c2d12);
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

    const halfPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(8, 4),
      new THREE.MeshPhongMaterial({ color: 0xea580c, transparent: true, opacity: 0.25, side: THREE.DoubleSide })
    );
    halfPlane.position.y = -0.5;
    scene.add(halfPlane);

    const interfaceLine = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-4, 0, 0), new THREE.Vector3(4, 0, 0),
      ]),
      new THREE.LineBasicMaterial({ color: 0xf97316 })
    );
    scene.add(interfaceLine);

    const textureLines: THREE.Line[] = [];

    let normalLine: THREE.Line;
    let normalLabel: THREE.Sprite;

    const updateRays = () => {
      const theta1 = (incAngle * Math.PI) / 180;
      const sinTheta2 = (n1 / n2) * Math.sin(theta1);
      const isTIR = sinTheta2 > 1;
      const criticalAngle = Math.asin(n2 / n1) * (180 / Math.PI);

      const origin = new THREE.Vector3(0, 0, 0);
      const incDir = new THREE.Vector3(0, -Math.sin(theta1), -Math.cos(theta1));
      const incRay = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          origin.clone().add(incDir.clone().multiplyScalar(-3.5)), origin,
        ]),
        new THREE.LineBasicMaterial({ color: 0xf59e0b })
      );
      scene.add(incRay);

      if (!isTIR) {
        const theta2 = Math.asin(Math.min(sinTheta2, 1));
        const refrDir = new THREE.Vector3(0, Math.sin(theta2), -Math.cos(theta2));
        const refrRay = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([origin, origin.clone().add(refrDir.multiplyScalar(3.5))]),
          new THREE.LineBasicMaterial({ color: 0x22d3ee })
        );
        scene.add(refrRay);
        const reflDir2 = new THREE.Vector3(0, Math.sin(theta1), Math.cos(theta1));
        const reflRay2 = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([origin, origin.clone().add(reflDir2.multiplyScalar(2))]),
          new THREE.LineBasicMaterial({ color: 0xfbbf24, transparent: true, opacity: 0.5 })
        );
        scene.add(reflRay2);
      } else {
        const reflDir = new THREE.Vector3(0, Math.sin(theta1), Math.cos(theta1));
        const reflRay = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([origin, origin.clone().add(reflDir.multiplyScalar(3.5))]),
          new THREE.LineBasicMaterial({ color: 0x22d3ee })
        );
        scene.add(reflRay);
      }

      normalLine = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(0, -2.5, 0), new THREE.Vector3(0, 2.5, 0),
        ]),
        new THREE.LineBasicMaterial({ color: 0xa5b4fc, linewidth: 2 })
      );
      scene.add(normalLine);

      normalLabel = mkSprite("Normal", "#a5b4fc");
      scene.add(normalLabel);
      normalLabel.position.set(0.3, 2, 0);

      // Surface texture lines
      for (let i = -3; i <= 3; i++) {
        const texLine = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(i * 1.2, -0.3, 0), new THREE.Vector3(i * 1.2, -2, 0),
          ]),
          new THREE.LineBasicMaterial({ color: 0xea580c, transparent: true, opacity: 0.3 })
        );
        scene.add(texLine);
        textureLines.push(texLine);
      }

      const sp1 = mkSprite(isTIR ? "TIR!" : "Refracted", isTIR ? "#22d3ee" : "#fbbf24");
      scene.add(sp1);
      sp1.position.set(2, 0.8, 0);
      const spCrit = mkSprite("θc=" + criticalAngle.toFixed(1) + "°", "#fb923c");
      scene.add(spCrit);
      spCrit.position.set(-2, -1.5, 0);
      return { incRay, normalLine };
    };

    const rayHelpers = updateRays();
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
      halfPlane.geometry.dispose();
      halfPlane.material.dispose();
      interfaceLine.geometry.dispose();
      interfaceLine.material.dispose();
      normalLine.geometry.dispose();
      if (!(normalLine.material instanceof Array)) normalLine.material.dispose();
      normalLabel.material.map?.dispose();
      normalLabel.material.dispose();
      // Cleanup texture lines
      textureLines.forEach((l) => {
        l.geometry.dispose();
        if (!(l.material instanceof Array)) (l.material as THREE.Material).dispose();
      });
      renderer.dispose();
      controls?.dispose();
    };
  }, [n1, n2, incAngle, isWebGL]);

  if (!isWebGL) return <WebGLFallback title="Total Internal Reflection" />;

  return (
    <Card className="border-orange-500/30">
      <CardHeader>
        <CardTitle className="text-orange-300">
          Optics: Total Internal Reflection
          <span className="block text-xs font-normal text-orange-400/70 mt-1">
            Drag to rotate · Scroll to zoom
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={containerRef} className="h-[400px] w-full rounded-md overflow-hidden mb-4" />
        <CollapsibleControls label="TIR Parameters">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-orange-300">n₁ (Denser Medium)</Label>
              <Input type="number" step={0.01} min={1.01} max={3} value={n1}
                onChange={(e) => setN1(Number(e.target.value))}
                className="bg-orange-900/50 border-orange-700 text-orange-100" />
            </div>
            <div className="space-y-2">
              <Label className="text-orange-300">n₂ (Rarer Medium)</Label>
              <Input type="number" step={0.01} min={1} max={n1} value={n2}
                onChange={(e) => setN2(Number(e.target.value))}
                className="bg-orange-900/50 border-orange-700 text-orange-100" />
            </div>
            <div className="space-y-2">
              <Label className="text-orange-300">Angle of Incidence (°)</Label>
              <Input type="number" min={0} max={89} value={incAngle}
                onChange={(e) => setIncAngle(Number(e.target.value))}
                className="bg-orange-900/50 border-orange-700 text-orange-100" />
              <p className="text-xs text-orange-400">{incAngle}°</p>
            </div>
          </div>
        </CollapsibleControls>
        <div className="mt-4 p-3 rounded-lg border-l-4 border-orange-500 bg-orange-950/50 text-orange-200 text-sm space-y-2">
          <p className="font-semibold text-orange-300">Critical Angle</p>
          <p>sin(θc) = n₂ / n₁</p>
          <p className="font-semibold text-orange-300 mt-2">Condition for TIR</p>
          <p>θ {'>'} θc and light travels denser → rarer</p>
          <p className="font-semibold text-orange-300 mt-2">Applications</p>
          <p>Optical fibers: light trapped by repeated TIR inside core</p>
          <p className="text-orange-400">Mirages: TIR in hot air layers near ground</p>
          <p className="font-semibold text-orange-300 mt-2">Fiber Optics</p>
          <p>Acceptance angle: sin(θₐ) = √(n₁² - n₂²)</p>
        </div>
      </CardContent>
    </Card>
  );
}


export { OpticsTIR3d };
