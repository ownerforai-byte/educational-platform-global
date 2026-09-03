"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallback } from "@/components/lab/webgl-fallback";
import * as THREE from "three";

function mkSprite(text: string, color: string, pos: THREE.Vector3, scale = 1.0): THREE.Sprite {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 96;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "rgba(15, 23, 42, 0.9)";
  ctx.fillRect(4, 4, 504, 88);
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.strokeRect(4, 4, 504, 88);
  ctx.font = "bold 28px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = color;
  ctx.fillText(text, 256, 48);
  const tex = new THREE.CanvasTexture(canvas);
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false }));
  s.position.copy(pos);
  s.scale.set(3.5 * scale, 0.65 * scale, 1);
  return s;
}

export function DerivativeHigher3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [funcChoice, setFuncChoice] = useState<"cubic" | "quartic">("cubic");
  const [isWebGL, setIsWebGL] = useState(true);

  useEffect(() => { setIsWebGL(isWebGLAvailable()); }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isWebGL) return;

    let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer;
    let controls: any;
    let frameId: number;
    let animTime = 0;
    const meshes: THREE.Object3D[] = [];

    const init = async () => {
      const { OrbitControls } = await import("three/addons/controls/OrbitControls.js");

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0f172a);
      camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
      camera.position.set(0, 0, 14);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.minDistance = 5;
      controls.maxDistance = 25;

      scene.add(new THREE.AmbientLight(0xffffff, 0.7));

      const push = <T extends THREE.Object3D>(o: T): T => { scene.add(o); meshes.push(o); return o; };

      const grid = new THREE.GridHelper(20, 20, 0x334155, 0x1e293b);
      grid.rotation.x = Math.PI / 2;
      push(grid);

      const f = (x: number) => funcChoice === "cubic" ? 0.05 * x * x * x - 0.2 * x : 0.02 * x * x * x * x - 0.1 * x * x;
      const f1 = (x: number) => funcChoice === "cubic" ? 0.15 * x * x - 0.2 : 0.08 * x * x * x - 0.2 * x;
      const f2 = (x: number) => funcChoice === "cubic" ? 0.3 * x : 0.24 * x * x - 0.2;
      const f3 = (x: number) => funcChoice === "cubic" ? 0.3 : 0.48 * x;

      const colors = [0x60a5fa, 0x34d399, 0xf59e0b, 0xec4899];
      const labels = ["f(x)", "f(x)", "f(x)", "f(x)"];
      const yOffsets = [0, -2.5, -5, -7.5];

      for (let i = 0; i < 4; i++) {
        const pts: THREE.Vector3[] = [];
        for (let x = -6; x <= 6; x += 0.1) {
          const deriv = i === 0 ? f(x) : i === 1 ? f1(x) : i === 2 ? f2(x) : f3(x);
          pts.push(new THREE.Vector3(x, deriv + yOffsets[i], 0));
        }
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: colors[i] })));
        push(mkSprite(labels[i], '#' + colors[i].toString(16).padStart(6, '0'), new THREE.Vector3(5, yOffsets[i] + 1.2, 0), 0.7));
      }

      const connLines: THREE.Line[] = [];
      for (let i = 0; i < 3; i++) {
        const line = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, yOffsets[i] + 0.5, 0), new THREE.Vector3(0, yOffsets[i + 1] - 0.5, 0)]),
          new THREE.LineDashedMaterial({ color: 0x94a3b8, dashSize: 0.2, gapSize: 0.1 })
        );
        line.computeLineDistances();
        push(line);
        connLines.push(line);
      }

      const dots = [
        new THREE.Mesh(new THREE.SphereGeometry(0.15, 16, 16), new THREE.MeshStandardMaterial({ color: colors[0], emissive: colors[0], emissiveIntensity: 0.5 })),
        new THREE.Mesh(new THREE.SphereGeometry(0.15, 16, 16), new THREE.MeshStandardMaterial({ color: colors[1], emissive: colors[1], emissiveIntensity: 0.5 })),
        new THREE.Mesh(new THREE.SphereGeometry(0.15, 16, 16), new THREE.MeshStandardMaterial({ color: colors[2], emissive: colors[2], emissiveIntensity: 0.5 })),
        new THREE.Mesh(new THREE.SphereGeometry(0.15, 16, 16), new THREE.MeshStandardMaterial({ color: colors[3], emissive: colors[3], emissiveIntensity: 0.5 })),
      ];
      dots.forEach(d => push(d));

      const animate = () => {
        frameId = requestAnimationFrame(animate);
        animTime += 0.015;
        const tx = Math.sin(animTime) * 4;
        dots[0].position.set(tx, f(tx) + yOffsets[0], 0);
        dots[1].position.set(tx, f1(tx) + yOffsets[1], 0);
        dots[2].position.set(tx, f2(tx) + yOffsets[2], 0);
        dots[3].position.set(tx, f3(tx) + yOffsets[3], 0);
        for (let i = 0; i < 3; i++) {
          connLines[i].geometry.setFromPoints([
            new THREE.Vector3(tx, yOffsets[i] + 0.5, 0),
            new THREE.Vector3(tx, yOffsets[i + 1] - 0.5, 0),
          ]);
        }
        connLines.forEach(l => l.geometry.attributes.position.needsUpdate = true);
        controls.update();
        renderer.render(scene, camera);
      };
      animate();
    };

    const cleanup = async () => {
      await init();
      return () => {
        cancelAnimationFrame(frameId);
        const parent = renderer.domElement.parentNode;
        if (parent) parent.removeChild(renderer.domElement);
        meshes.forEach((m) => {
          scene.remove(m);
          if (m instanceof THREE.Mesh) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Line) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Sprite) { (m.material as THREE.SpriteMaterial).map?.dispose?.(); m.material.dispose(); }
        });
        renderer.dispose();
        controls.dispose?.();
      };
    };

    const cleanupPromise = cleanup();
    return () => { cleanupPromise.then((d) => d?.()); };
  }, [funcChoice, isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="Higher Order Derivatives" description="f, f, f, f visualization — requires WebGL." />;
  }

  const funcOptions: [string, string][] = [
    ["cubic", "f(x) = 0.05x^3 - 0.2x"],
    ["quartic", "f(x) = 0.02x^4 - 0.1x^2"],
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Higher Order Derivatives — 3D</span>
          <span className="text-xs text-muted-foreground font-normal">f, f, f, f stacked</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Base Function">
          <div className="flex flex-wrap gap-2 mt-2">
            {funcOptions.map(([key, label]) => (
              <button key={key} onClick={() => setFuncChoice(key as typeof funcChoice)} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${funcChoice === key ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>{label}</button>
            ))}
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-pink-500/30 bg-pink-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-pink-400">Higher Order Derivatives</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">f(x):</strong> First derivative — slope of the curve</p>
            <p><strong className="text-foreground">f(x):</strong> Second derivative — concavity</p>
            <p><strong className="text-foreground">f(x):</strong> Third derivative — rate of change of concavity</p>
            <p>Each derivative is stacked vertically for easy comparison</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}