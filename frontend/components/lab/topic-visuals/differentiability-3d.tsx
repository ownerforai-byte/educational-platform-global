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

type DiffType = "smooth" | "corner" | "cusp" | "vertical_tangent";

export function Differentiability3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [diffType, setDiffType] = useState<DiffType>("smooth");
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

      if (diffType === "smooth") {
        push(mkSprite("Smooth: Differentiable", "#34d399", new THREE.Vector3(0, 4.5, 0)));
        const pts: THREE.Vector3[] = [];
        for (let x = -6; x <= 6; x += 0.05) {
          pts.push(new THREE.Vector3(x, 0.2 * x * x - 1, 0));
        }
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: 0x60a5fa })));
        const tangent = new THREE.Mesh(
          new THREE.SphereGeometry(0.15, 16, 16),
          new THREE.MeshStandardMaterial({ color: 0x34d399, emissive: 0x34d399, emissiveIntensity: 0.5 })
        );
        push(tangent);
        const tangentLine = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-6, -5, 0), new THREE.Vector3(6, -5, 0)]),
          new THREE.LineBasicMaterial({ color: 0x34d399, transparent: true, opacity: 0.7 })
        );
        push(tangentLine);
        push(mkSprite("f exists everywhere", "#34d399", new THREE.Vector3(0, -3.5, 0)));

        const animate = () => {
          frameId = requestAnimationFrame(animate);
          animTime += 0.02;
          const tx = Math.sin(animTime) * 4;
          const ty = 0.2 * tx * tx - 1;
          tangent.position.set(tx, ty, 0);
          const slope = 0.4 * tx;
          tangentLine.geometry.setFromPoints([
            new THREE.Vector3(tx - 3, ty - slope * 3, 0),
            new THREE.Vector3(tx + 3, ty + slope * 3, 0),
          ]);
          tangentLine.geometry.attributes.position.needsUpdate = true;
          controls.update();
          renderer.render(scene, camera);
        };
        animate();
      } else if (diffType === "corner") {
        push(mkSprite("Corner: |x|", "#f59e0b", new THREE.Vector3(0, 4.5, 0)));
        const pts: THREE.Vector3[] = [];
        for (let x = -6; x <= 6; x += 0.05) {
          pts.push(new THREE.Vector3(x, Math.abs(x) - 2, 0));
        }
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: 0x60a5fa })));
        const corner = new THREE.Mesh(
          new THREE.OctahedronGeometry(0.25, 0),
          new THREE.MeshStandardMaterial({ color: 0xf59e0b, emissive: 0xf59e0b, emissiveIntensity: 0.5 })
        );
        corner.position.set(0, -2, 0);
        push(corner);
        const leftTangent = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-3, 1, 0), new THREE.Vector3(-1, -1, 0)]),
          new THREE.LineBasicMaterial({ color: 0x60a5fa, transparent: true, opacity: 0.7 })
        );
        push(leftTangent);
        const rightTangent = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(1, -1, 0), new THREE.Vector3(3, 1, 0)]),
          new THREE.LineBasicMaterial({ color: 0x34d399, transparent: true, opacity: 0.7 })
        );
        push(rightTangent);
        push(mkSprite("left=-1, right=+1", "#f59e0b", new THREE.Vector3(0, -3.5, 0)));
        push(mkSprite("NOT differentiable", "#f43f5e", new THREE.Vector3(0, -4.2, 0)));
      } else if (diffType === "cusp") {
        push(mkSprite("Cusp: x^(2/3)", "#ec4899", new THREE.Vector3(0, 4.5, 0)));
        const pts: THREE.Vector3[] = [];
        for (let x = -6; x <= 6; x += 0.05) {
          pts.push(new THREE.Vector3(x, Math.pow(Math.abs(x), 2 / 3) * 1.2 - 2, 0));
        }
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: 0x60a5fa })));
        const cusp = new THREE.Mesh(
          new THREE.TetrahedronGeometry(0.3, 0),
          new THREE.MeshStandardMaterial({ color: 0xec4899, emissive: 0xec4899, emissiveIntensity: 0.5 })
        );
        cusp.position.set(0, -2, 0);
        push(cusp);
        push(mkSprite("Vertical tangent", "#ec4899", new THREE.Vector3(1, -1, 0)));
        push(mkSprite("NOT differentiable", "#f43f5e", new THREE.Vector3(0, -3.8, 0)));
      } else {
        push(mkSprite("Vertical Tangent: x^(1/3)", "#a78bfa", new THREE.Vector3(0, 4.5, 0)));
        const pts: THREE.Vector3[] = [];
        for (let x = -6; x <= 6; x += 0.05) {
          pts.push(new THREE.Vector3(x, Math.cbrt(x) * 2, 0));
        }
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: 0x60a5fa })));
        const vertLine = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, -5, 0), new THREE.Vector3(0, 5, 0)]),
          new THREE.LineDashedMaterial({ color: 0xa78bfa, dashSize: 0.3, gapSize: 0.2 })
        );
        vertLine.computeLineDistances();
        push(vertLine);
        const tangentPt = new THREE.Mesh(
          new THREE.SphereGeometry(0.2, 16, 16),
          new THREE.MeshStandardMaterial({ color: 0xa78bfa, emissive: 0xa78bfa, emissiveIntensity: 0.5 })
        );
        tangentPt.position.set(0, 0, 0);
        push(tangentPt);
        push(mkSprite("f(0)=inf", "#a78bfa", new THREE.Vector3(1.5, 1.5, 0)));
        push(mkSprite("NOT differentiable", "#f43f5e", new THREE.Vector3(0, -3, 0)));
      }

      if (diffType !== "smooth") {
        const animate = () => {
          frameId = requestAnimationFrame(animate);
          animTime += 0.01;
          controls.update();
          renderer.render(scene, camera);
        };
        animate();
      }
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
  }, [diffType, isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="Differentiability" description="Cusp and corner visualizations — requires WebGL." />;
  }

  const curveOptions: [string, string][] = [
    ["smooth", "Smooth Curve"],
    ["corner", "Corner |x|"],
    ["cusp", "Cusp x^(2/3)"],
    ["vertical_tangent", "Vertical Tangent"],
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Differentiability — 3D Visualization</span>
          <span className="text-xs text-muted-foreground font-normal">Smooth vs. non-smooth points</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Function Type">
          <div className="flex flex-wrap gap-2 mt-2">
            {curveOptions.map(([key, label]) => (
              <button key={key} onClick={() => setDiffType(key as DiffType)} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${diffType === key ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>{label}</button>
            ))}
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-400">Differentiability Rules</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Smooth curve:</strong> Unique tangent line at every point</p>
            <p><strong className="text-foreground">Corner:</strong> Left and right derivatives differ</p>
            <p><strong className="text-foreground">Cusp:</strong> Derivative approaches inf from different directions</p>
            <p><strong className="text-foreground">Vertical tangent:</strong> f = inf — not differentiable</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}