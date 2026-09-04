"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallback } from "@/components/lab/webgl-fallback";
import * as THREE from "three";

/* ============================================================
   Chemical Equilibrium — Le Chatelier's Principle
   NEB Chemistry 11
   ============================================================ */

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
  s.scale.set(3.4 * scale, 0.64 * scale, 1);
  return s;
}

export function EquilibriumVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [stress, setStress] = useState<"none" | "add-reactant" | "add-product" | "increase-T" | "increase-P">("none");
  const progressRef = useRef(0.5);
  const [isWebGL] = useState(() => isWebGLAvailable());


  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isWebGL) return;

    let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer;
    let controls: any, frameId: number;
    const meshes: THREE.Object3D[] = [];
    let stressAnim = 0;
    let targetProgress = 0.5;

    const init = async () => {
      const { OrbitControls } = await import("three/addons/controls/OrbitControls.js");

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0f172a);
      camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
      camera.position.set(0, 0, 12);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.autoRotate = false;
      controls.minDistance = 4;
      controls.maxDistance = 20;

      scene.add(new THREE.AmbientLight(0xffffff, 0.8));

      const push = <T extends THREE.Object3D>(o: T): T => { scene.add(o); meshes.push(o); return o; };

      // Reaction: N₂ + 3H₂ ⇌ 2NH₃ (exothermic)
      // Forward: exothermic (ΔH < 0)

      const updateScene = () => {
        while (meshes.length > 8) {
          const m = meshes.pop()!;
          scene.remove(m);
          if (m instanceof THREE.Mesh) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Sprite) { (m.material as THREE.SpriteMaterial).map?.dispose?.(); m.material.dispose(); }
          else if (m instanceof THREE.Line) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
        }

        // Animated progressRef.current toward equilibrium
        const shift = stress === "add-reactant" ? 0.2 : stress === "add-product" ? -0.2 : stress === "increase-T" ? -0.15 : stress === "increase-P" ? 0.25 : 0;
        targetProgress = Math.max(0.05, Math.min(0.95, 0.5 + shift));
        progressRef.current += (targetProgress - progressRef.current) * 0.03;

        const reactantY = 1 - progressRef.current;
        const productY = progressRef.current;

        // Concentration vs Time graph
        const ox = -6, oy = -3;
        const sx = 1.2, sy = 1.0;

        // Axes
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(ox, oy, 0), new THREE.Vector3(ox + sx * 10, oy, 0)]), new THREE.LineBasicMaterial({ color: 0x475569 })));
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(ox, oy, 0), new THREE.Vector3(ox, oy + sy * 6, 0)]), new THREE.LineBasicMaterial({ color: 0x475569 })));
        push(mkSprite("Time", "#94a3b8", new THREE.Vector3(ox + sx * 10.5, oy - 0.3, 0), 0.6));
        push(mkSprite("Concentration", "#94a3b8", new THREE.Vector3(ox - 0.5, oy + sy * 6.5, 0), 0.6));

        // Equilibrium line
        push(new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(ox, oy + progressRef.current * sy * 5, 0),
            new THREE.Vector3(ox + sx * 10, oy + progressRef.current * sy * 5, 0),
          ]),
          new THREE.LineDashedMaterial({ color: 0xfbbf24, dashSize: 0.2, gapSize: 0.15 }),
        ) as any);
        ((meshes[meshes.length - 1] as any) as THREE.Line).computeLineDistances();
        push(mkSprite("Equilibrium", "#fbbf24", new THREE.Vector3(ox + sx * 9, oy + progressRef.current * sy * 5 + 0.3, 0), 0.5));

        // Reactant curve (decreasing)
        const rPts: THREE.Vector3[] = [];
        for (let i = 0; i <= 100; i++) {
          const t = i / 100;
          const x = ox + t * sx * 10;
          const early = 1 - Math.pow(t, 0.5) * (1 - progressRef.current);
          rPts.push(new THREE.Vector3(x, oy + Math.max(0, early) * sy * 5, 0));
        }
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(rPts), new THREE.LineBasicMaterial({ color: 0xef4444, linewidth: 2 })));
        push(mkSprite("Reactants (N₂+H₂)", "#ef4444", new THREE.Vector3(ox + sx * 0.5, oy + sy * 4.5, 0), 0.55));

        // Product curve (increasing)
        const pPts: THREE.Vector3[] = [];
        for (let i = 0; i <= 100; i++) {
          const t = i / 100;
          const x = ox + t * sx * 10;
          const early = Math.pow(t, 0.5) * progressRef.current;
          pPts.push(new THREE.Vector3(x, oy + Math.min(5, early * 5) * sy, 0));
        }
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pPts), new THREE.LineBasicMaterial({ color: 0x22c55e, linewidth: 2 })));
        push(mkSprite("Products (NH₃)", "#22c55e", new THREE.Vector3(ox + sx * 0.5, oy + sy * 1.0, 0), 0.55));

        // Stress indicator
        if (stress !== "none") {
          const stressColors: Record<string, number> = {
            "add-reactant": 0xf97316,
            "add-product": 0x8b5cf6,
            "increase-T": 0xef4444,
            "increase-P": 0x3b82f6,
          };
          const stressLabels: Record<string, string> = {
            "add-reactant": "← Stress: Added Reactant",
            "add-product": "→ Stress: Added Product",
            "increase-T": "↑ Stress: Increased Temperature",
            "increase-P": "→ Stress: Increased Pressure",
          };
          const sp = new THREE.Vector3(0, 3.5, 0);
          const tp = new THREE.Vector3(0, 2.5, 0);
          const d = tp.clone().sub(sp).normalize();
          const al = sp.distanceTo(tp);
          push(new THREE.ArrowHelper(d, sp, al * 0.8, stressColors[stress], 0.25, 0.12));
          push(mkSprite(stressLabels[stress], `#${stressColors[stress].toString(16).padStart(6, "0")}`, sp.clone().sub(d.multiplyScalar(0.5)), 0.7));
        }

        // Kc expression
        push(mkSprite("Kc = [NH₃]² / ([N₂][H₂]³)  — constant at given T", "#7dd3fc", new THREE.Vector3(0, -4.2, 0), 0.6));
      };

      updateScene();

      const animate = () => {
        frameId = requestAnimationFrame(animate);
        controls.update();
        updateScene();
        renderer.render(scene, camera);
      };
      animate();

      const handleResize = () => {
        if (!container) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      };
      window.addEventListener("resize", handleResize);

      return () => {
        cancelAnimationFrame(frameId);
        window.removeEventListener("resize", handleResize);
        if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
        meshes.forEach((m) => {
          scene.remove(m);
          if (m instanceof THREE.Mesh) { m.geometry?.dispose(); const mat = m.material; if (Array.isArray(mat)) mat.forEach((x) => x.dispose()); else (Array.isArray(mat) ? mat : [mat]).forEach((x) => x.dispose()); }
          else if (m instanceof THREE.Line) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Sprite) { const sm = m.material; sm.map?.dispose?.(); sm.dispose(); }
        });
        renderer.dispose();
        controls.dispose?.();
      };
    };

    const cleanup = init();
    return () => { cleanup.then((d) => d?.()); };
  }, [stress, isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="Chemical Equilibrium" description="Le Chatelier's principle animation — requires WebGL." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Chemical Equilibrium — Le Chatelier's Principle</span>
          <span className="text-xs text-muted-foreground font-normal">Apply stress and observe shift</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Apply Stress (N₂ + 3H₂ ⇌ 2NH₃, ΔH < 0)">
          <div className="flex flex-wrap gap-2 mt-1">
            {([
              { v: "none", l: "No Stress" },
              { v: "add-reactant", l: "+Reactant" },
              { v: "add-product", l: "+Product" },
              { v: "increase-T", l: "+Temperature" },
              { v: "increase-P", l: "+Pressure" },
            ] as const).map((s) => (
              <button
                key={s.v}
                onClick={() => setStress(s.v)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  stress === s.v ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {s.l}
              </button>
            ))}
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-green-400">Le Chatelier's Principle</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Principle:</strong> When a stress is applied to a system at equilibrium, the system shifts to relieve the stress.</p>
            <p><strong className="text-foreground">Add reactant:</strong> Shift RIGHT → more products formed.</p>
            <p><strong className="text-foreground">Add product:</strong> Shift LEFT → more reactants formed.</p>
            <p><strong className="text-foreground">Increase T (exothermic):</strong> Shift LEFT (reverse reaction absorbs heat).</p>
            <p><strong className="text-foreground">Increase P:</strong> Shift toward fewer gas moles (RIGHT: 4 mol → 2 mol).</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
