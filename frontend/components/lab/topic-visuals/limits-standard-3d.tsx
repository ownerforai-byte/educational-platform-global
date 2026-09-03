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

type StandardLimit = "sinx_over_x" | "e_def" | "power_rule" | "log_limit";

export function LimitsStandard3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [limitType, setLimitType] = useState<StandardLimit>("sinx_over_x");
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
      scene.add(new THREE.DirectionalLight(0xffffff, 0.5));

      const push = <T extends THREE.Object3D>(o: T): T => { scene.add(o); meshes.push(o); return o; };

      const grid = new THREE.GridHelper(20, 20, 0x334155, 0x1e293b);
      grid.rotation.x = Math.PI / 2;
      push(grid);

      const titles: Record<StandardLimit, string> = {
        sinx_over_x: "lim(x->0) sin(x)/x = 1",
        e_def: "lim(n->inf) (1 + 1/n)^n = e",
        power_rule: "lim(h->0) [(x+h)^n - x^n]/h",
        log_limit: "lim(x->0) ln(1+x)/x = 1",
      };
      push(mkSprite(titles[limitType], "#a78bfa", new THREE.Vector3(0, 4.2, 0)));

      if (limitType === "sinx_over_x") {
        const pts: THREE.Vector3[] = [];
        for (let x = -8; x <= 8; x += 0.05) {
          if (Math.abs(x) < 0.05) continue;
          pts.push(new THREE.Vector3(x, Math.sin(x) / x * 3, 0));
        }
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: 0x60a5fa })));
        const hole = new THREE.Mesh(new THREE.RingGeometry(0.15, 0.25, 32), new THREE.MeshBasicMaterial({ color: 0xf59e0b, side: THREE.DoubleSide }));
        hole.position.set(0, 3, 0);
        push(hole);
        push(mkSprite("hole at (0,1)", "#f59e0b", new THREE.Vector3(0.5, 3.8, 0)));
        push(mkSprite("limit = 1", "#34d399", new THREE.Vector3(0, -1, 0)));
      } else if (limitType === "e_def") {
        const eValue = Math.E;
        const nValues = [1, 2, 5, 10, 50, 100, 500, 1000];
        nValues.forEach((n, i) => {
          const val = Math.pow(1 + 1 / n, n);
          const x = -4 + i * 1.2;
          const y = (val - 2) * 1.5;
          const dot = new THREE.Mesh(
            new THREE.SphereGeometry(0.15, 16, 16),
            new THREE.MeshStandardMaterial({ color: 0x60a5fa, emissive: 0x60a5fa, emissiveIntensity: 0.3 })
          );
          dot.position.set(x, y, 0);
          push(dot);
          push(mkSprite(`n=${n}`, "#94a3b8", new THREE.Vector3(x, y - 0.6, 0), 0.7));
        });
        const eLine = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-5, (eValue - 2) * 1.5, 0), new THREE.Vector3(5, (eValue - 2) * 1.5, 0)]),
          new THREE.LineBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.7 })
        );
        push(eLine);
        push(mkSprite(`e = ${eValue.toFixed(4)}`, "#f59e0b", new THREE.Vector3(3.5, (eValue - 2) * 1.5 + 0.5, 0)));
      } else if (limitType === "power_rule") {
        const x0 = 2, n = 3;
        const pts: THREE.Vector3[] = [];
        for (let h = -3; h <= 3; h += 0.1) {
          if (Math.abs(h) < 0.01) continue;
          const dq = (Math.pow(x0 + h, n) - Math.pow(x0, n)) / h;
          pts.push(new THREE.Vector3(h * 0.5, dq * 0.3, 0));
        }
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: 0x60a5fa })));
        const limitVal = n * Math.pow(x0, n - 1);
        const limitLine = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-2, limitVal * 0.3, 0), new THREE.Vector3(2, limitVal * 0.3, 0)]),
          new THREE.LineBasicMaterial({ color: 0x34d399, transparent: true, opacity: 0.7 })
        );
        push(limitLine);
        push(mkSprite(`limit = ${limitVal.toFixed(2)}`, "#34d399", new THREE.Vector3(0, limitVal * 0.3 + 0.8, 0)));
      } else {
        const pts: THREE.Vector3[] = [];
        for (let x = -0.9; x <= 3; x += 0.02) {
          if (Math.abs(x) < 0.02) continue;
          pts.push(new THREE.Vector3(x, Math.log(1 + x) / x * 2, 0));
        }
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: 0x60a5fa })));
        push(mkSprite("hole at (0,1)", "#f59e0b", new THREE.Vector3(0.3, 1.3, 0)));
        push(mkSprite("limit = 1", "#34d399", new THREE.Vector3(0, -1.5, 0)));
      }

      const animate = () => {
        frameId = requestAnimationFrame(animate);
        animTime += 0.01;
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
  }, [limitType, isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="Standard Limits" description="Visual proofs of fundamental limit formulas — requires WebGL." />;
  }

  const limitOptions: [string, string][] = [
    ["sinx_over_x", "sin(x)/x -> 1"],
    ["e_def", "(1+1/n)^n -> e"],
    ["power_rule", "Power Rule Def."],
    ["log_limit", "ln(1+x)/x -> 1"],
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Standard Limits — 3D</span>
          <span className="text-xs text-muted-foreground font-normal">Select a limit to visualize its proof</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Standard Limit">
          <div className="flex flex-wrap gap-2 mt-2">
            {limitOptions.map(([key, label]) => (
              <button key={key} onClick={() => setLimitType(key as StandardLimit)} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${limitType === key ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>{label}</button>
            ))}
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-purple-500/30 bg-purple-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-purple-400">Key Standard Limits</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">sin(x)/x {'->'} 1</strong> as x {'->'} 0</p>
            <p><strong className="text-foreground">(1+1/n)^n {'->'} e</strong> as n {'->'} inf</p>
            <p><strong className="text-foreground">ln(1+x)/x {'->'} 1</strong> as x {'->'} 0</p>
            <p><strong className="text-foreground">Power rule:</strong> nx^(n-1) from limit definition</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}