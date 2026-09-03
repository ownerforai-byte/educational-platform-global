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
  ctx.font = "bold 26px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = color;
  ctx.fillText(text, 256, 48);
  const tex = new THREE.CanvasTexture(canvas);
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false }));
  s.position.copy(pos);
  s.scale.set(3.8 * scale, 0.7 * scale, 1);
  return s;
}

type RuleType = "power" | "product" | "quotient" | "chain";

export function DerivativeRules3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ruleType, setRuleType] = useState<RuleType>("power");
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

      if (ruleType === "power") {
        push(mkSprite("Power Rule: d/dx[x^n] = nx^(n-1)", "#60a5fa", new THREE.Vector3(0, 4.5, 0)));
        const fPts: THREE.Vector3[] = [];
        const dfPts: THREE.Vector3[] = [];
        for (let x = -5; x <= 5; x += 0.1) {
          fPts.push(new THREE.Vector3(x, 0.15 * x * x, 0));
          dfPts.push(new THREE.Vector3(x, 0.3 * x, 0));
        }
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(fPts), new THREE.LineBasicMaterial({ color: 0x60a5fa })));
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(dfPts), new THREE.LineBasicMaterial({ color: 0x34d399 })));
        push(mkSprite("f(x) = x^2", "#60a5fa", new THREE.Vector3(3, 1.5, 0)));
        push(mkSprite("f(x) = 2x", "#34d399", new THREE.Vector3(3, -2, 0)));
      } else if (ruleType === "product") {
        push(mkSprite("Product Rule: (fg) = f.g + f.g", "#a78bfa", new THREE.Vector3(0, 4.5, 0)));
        const fPts: THREE.Vector3[] = [];
        const gPts: THREE.Vector3[] = [];
        const fgPts: THREE.Vector3[] = [];
        for (let x = -4; x <= 4; x += 0.1) {
          const f = Math.sin(x) + 1;
          const g = Math.cos(x) + 1;
          fPts.push(new THREE.Vector3(x, f * 0.8, 0));
          gPts.push(new THREE.Vector3(x + 0.3, g * 0.8, 0));
          fgPts.push(new THREE.Vector3(x, f * g * 0.3, 0));
        }
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(fPts), new THREE.LineBasicMaterial({ color: 0x60a5fa })));
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(gPts), new THREE.LineBasicMaterial({ color: 0x34d399 })));
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(fgPts), new THREE.LineBasicMaterial({ color: 0xa78bfa })));
        push(mkSprite("f = sin+1", "#60a5fa", new THREE.Vector3(-3, 1.2, 0)));
        push(mkSprite("g = cos+1", "#34d399", new THREE.Vector3(-2.5, -0.5, 0)));
        push(mkSprite("fg = f.g + f.g", "#a78bfa", new THREE.Vector3(0, -2.5, 0)));
      } else if (ruleType === "quotient") {
        push(mkSprite("Quotient Rule", "#f59e0b", new THREE.Vector3(0, 4.5, 0)));
        const fPts: THREE.Vector3[] = [];
        const gPts: THREE.Vector3[] = [];
        const qPts: THREE.Vector3[] = [];
        for (let x = -6; x <= 6; x += 0.1) {
          fPts.push(new THREE.Vector3(x, x * 0.4, 0));
          gPts.push(new THREE.Vector3(x + 0.3, (x * x + 1) * 0.15, 0));
          qPts.push(new THREE.Vector3(x, (x / (x * x + 1)) * 3, 0));
        }
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(fPts), new THREE.LineBasicMaterial({ color: 0x60a5fa })));
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(gPts), new THREE.LineBasicMaterial({ color: 0x34d399 })));
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(qPts), new THREE.LineBasicMaterial({ color: 0xf59e0b })));
        push(mkSprite("f(x) = x", "#60a5fa", new THREE.Vector3(-4, 1.5, 0)));
        push(mkSprite("g(x) = x^2+1", "#34d399", new THREE.Vector3(-3.5, -1, 0)));
        push(mkSprite("quotient deriv", "#f59e0b", new THREE.Vector3(0, -3.5, 0)));
      } else {
        push(mkSprite("Chain Rule", "#ec4899", new THREE.Vector3(0, 4.5, 0)));
        const uPts: THREE.Vector3[] = [];
        const outerPts: THREE.Vector3[] = [];
        const compositePts: THREE.Vector3[] = [];
        for (let x = -4; x <= 4; x += 0.1) {
          const u = x * x;
          uPts.push(new THREE.Vector3(x, u * 0.2, 0));
          outerPts.push(new THREE.Vector3(x + 0.3, Math.sin(u) * 1.5, 0));
          compositePts.push(new THREE.Vector3(x, Math.sin(x * x) * 1.5, 0));
        }
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(uPts), new THREE.LineBasicMaterial({ color: 0x60a5fa })));
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(outerPts), new THREE.LineBasicMaterial({ color: 0x34d399 })));
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(compositePts), new THREE.LineBasicMaterial({ color: 0xec4899 })));
        push(mkSprite("u = x^2", "#60a5fa", new THREE.Vector3(-3, 1.5, 0)));
        push(mkSprite("sin(u)", "#34d399", new THREE.Vector3(-2.5, -0.8, 0)));
        push(mkSprite("sin(x^2)", "#ec4899", new THREE.Vector3(0, -3, 0)));
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
  }, [ruleType, isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="Differentiation Rules" description="Power, product, quotient, chain rules — requires WebGL." />;
  }

  const ruleOptions: [string, string][] = [
    ["power", "Power Rule"],
    ["product", "Product Rule"],
    ["quotient", "Quotient Rule"],
    ["chain", "Chain Rule"],
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Differentiation Rules — 3D</span>
          <span className="text-xs text-muted-foreground font-normal">Four fundamental rules</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Differentiation Rule">
          <div className="flex flex-wrap gap-2 mt-2">
            {ruleOptions.map(([key, label]) => (
              <button key={key} onClick={() => setRuleType(key as RuleType)} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${ruleType === key ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>{label}</button>
            ))}
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-400">Differentiation Rules</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Power Rule:</strong> d/dx[x^n] = nx^(n-1)</p>
            <p><strong className="text-foreground">Product Rule:</strong> (fg) = f.g + f.g</p>
            <p><strong className="text-foreground">Quotient Rule:</strong> (f/g) = (f.g - f.g)/g^2</p>
            <p><strong className="text-foreground">Chain Rule:</strong> d/dx[f(g(x))] = f(g(x))g(x)</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}