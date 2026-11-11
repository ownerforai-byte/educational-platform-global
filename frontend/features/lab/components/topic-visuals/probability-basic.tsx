"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallback } from "@/components/lab/webgl-fallback";
import { VizToolbar, type VizTarget } from "@/components/viz/viz-toolbar";
import { ScenePresets, ReadoutGrid, type ScenePreset } from "@/components/lab/scene-interactivity";
import * as THREE from "three";

/* ============================================================
   Probability — NEB Statistics (Maths 11)
   Interactive probability space: sample space, events,
   independent events, and basic laws of probability.
   ============================================================ */

type ProbMode = "sample-space" | "independent" | "two-events";

const PROB_INFO: Record<ProbMode, { head: string; law: string; method: string; example: string; pitfall: string }> = {
  "sample-space": {
    head: "Sample space & events · Addition rule",
    law: "P(A ∪ B) = P(A) + P(B) − P(A ∩ B)",
    method: "The overlap A∩B was counted in both P(A) and P(B), so subtract it once",
    example: "Fair die: A = even {2,4,6}, B = greater than 4 {5,6}. P(A∪B) = 3/6 + 2/6 − 1/6 = 4/6 ≈ 0.667",
    pitfall: "If A and B are mutually exclusive (A∩B = ∅), the rule reduces to P(A∪B) = P(A) + P(B)",
  },
  independent: {
    head: "Independent events · Multiplication rule",
    law: "P(A ∩ B) = P(A) × P(B)",
    method: "Independence means P(A|B) = P(A) — knowing B does not change A's probability",
    example: "Toss a coin and roll a die: P(head and a six) = 1/2 × 1/6 = 1/12 ≈ 0.083",
    pitfall: "Independent ≠ mutually exclusive. Disjoint events with P > 0 always influence each other",
  },
  "two-events": {
    head: "Conditional probability · Reduced sample space",
    law: "P(A|B) = P(A ∩ B) / P(B),  P(B) > 0",
    method: "Once B is known, work only inside B — the sample space shrinks to B",
    example: "Fair die: A = even, B = {5,6}. Only 6 is even inside B, so P(A|B) = (1/6)/(2/6) = 1/2",
    pitfall: "P(A|B) is not P(B|A) — swapping the condition changes the denominator",
  },
};

export function ProbabilityBasicVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const vizTargetRef = useRef<VizTarget>({});
  const [mode, setMode] = useState<ProbMode>("sample-space");
  const [isWebGL] = useState(() => isWebGLAvailable());
  const [showLabels, setShowLabels] = useState(true);
  const [runId, setRunId] = useState(0);

  const info = PROB_INFO[mode];

  const presets: ScenePreset[] = [
    { name: "Addition rule", hint: "Two events and their overlap in the sample space", apply: () => { setMode("sample-space"); setRunId((r) => r + 1); } },
    { name: "Independent events", hint: "P(A∩B) = P(A)·P(B)", apply: () => { setMode("independent"); setRunId((r) => r + 1); } },
    { name: "Conditional P(A|B)", hint: "Reduced sample space inside B", apply: () => { setMode("two-events"); setRunId((r) => r + 1); } },
  ];

  const resetAll = () => {
    setMode("sample-space");
    setShowLabels(true);
    setRunId((r) => r + 1);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isWebGL) return;

    let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer;
    let controls: any, frameId: number;
    const meshes: THREE.Object3D[] = [];
    const labelSprites: THREE.Sprite[] = [];

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
      vizTargetRef.current = { controls, el: container, canvasEl: renderer.domElement, setLabels: (on: boolean) => labelSprites.forEach((s) => (s.visible = on)) };
      controls.autoRotate = false;

      scene.add(new THREE.AmbientLight(0xffffff, 0.8));

      const push = <T extends THREE.Object3D>(o: T): T => { scene.add(o); meshes.push(o); if (o instanceof THREE.Sprite) labelSprites.push(o); return o; };

      const drawEllipse = (cx: number, cy: number, rx: number, ry: number, color: number, opacity = 0.3) => {
        const pts: THREE.Vector3[] = [];
        for (let i = 0; i <= 64; i++) {
          const t = (i / 64) * Math.PI * 2;
          pts.push(new THREE.Vector3(cx + rx * Math.cos(t), cy + ry * Math.sin(t), 0.01));
        }
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color, linewidth: 2 })));
        const fill = push(new THREE.Mesh(
          new THREE.CircleGeometry(1, 64),
          new THREE.MeshBasicMaterial({ color, transparent: true, opacity, side: THREE.DoubleSide }),
        ));
        fill.scale.set(rx, ry, 1);
        fill.position.set(cx, cy, 0);
      };

      const update = () => {
        while (meshes.length > 15) {
          const m = meshes.pop()!;
          scene.remove(m);
          if (m instanceof THREE.Mesh) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Line) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Sprite) { (m.material as THREE.SpriteMaterial).map?.dispose?.(); m.material.dispose(); }
        }

        if (mode === "sample-space") {
          // Universal set rectangle
          push(new THREE.Line(
            new THREE.BufferGeometry().setFromPoints([
              new THREE.Vector3(-6, -4, 0), new THREE.Vector3(6, -4, 0), new THREE.Vector3(6, 4, 0),
              new THREE.Vector3(-6, 4, 0), new THREE.Vector3(-6, -4, 0),
            ]),
            new THREE.LineBasicMaterial({ color: 0x475569, linewidth: 2 }),
          ));
          push(new THREE.Sprite(new THREE.SpriteMaterial({ map: (() => { const c = document.createElement("canvas"); c.width = 64; c.height = 32; const x = c.getContext("2d")!; x.fillStyle = "#94a3b8"; x.font = "bold 24px monospace"; x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("S", 32, 16); return new THREE.CanvasTexture(c); })(), transparent: true })));
          // Sprites
          const mkSp = (text: string, color: string, pos: THREE.Vector3) => {
            const canvas = document.createElement("canvas");
            canvas.width = 128; canvas.height = 64;
            const ctx = canvas.getContext("2d")!;
            ctx.fillStyle = color;
            ctx.font = "bold 28px monospace";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(text, 64, 32);
            const tex = new THREE.CanvasTexture(canvas);
            const sp = push(new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true })));
            sp.position.copy(pos);
            sp.scale.set(1.5, 0.75, 1);
          };

          mkSp("A", "#f87171", new THREE.Vector3(-2.5, 0, 0.02));
          mkSp("B", "#60a5fa", new THREE.Vector3(2.5, 0, 0.02));
          drawEllipse(-2.5, 0, 2, 2.5, 0xef4444, 0.25);
          drawEllipse(2.5, 0, 2, 2.5, 0x3b82f6, 0.25);

          // Overlap region
          drawEllipse(0, 0, 1, 1.5, 0xfbbf24, 0.3);
          mkSp("A∩B", "#fbbf24", new THREE.Vector3(0, 0, 0.03));

          push(new THREE.Sprite(new THREE.SpriteMaterial({ map: (() => { const c = document.createElement("canvas"); c.width = 512; c.height = 96; const x = c.getContext("2d")!; x.fillStyle = "rgba(15,23,42,0.9)"; x.fillRect(4,4,504,88); x.strokeStyle = "#fbbf24"; x.lineWidth = 2; x.strokeRect(4,4,504,88); x.fillStyle = "#fbbf24"; x.font = "bold 30px monospace"; x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("P(A∪B) = P(A) + P(B) − P(A∩B)", 256, 48); const t = new THREE.CanvasTexture(c); return t; })(), transparent: true })));
          (meshes[meshes.length - 1] as any).position.set(0, -3.2, 0);
          (meshes[meshes.length - 1] as any).scale.set(6, 1.1, 1);
        } else if (mode === "independent") {
          // Two independent events as separate circles
          drawEllipse(-2.5, 0, 2.5, 3, 0xef4444, 0.25);
          drawEllipse(2.5, 0, 2.5, 3, 0x3b82f6, 0.25);
          const mkSp = (text: string, color: string, pos: THREE.Vector3) => {
            const canvas = document.createElement("canvas");
            canvas.width = 512; canvas.height = 96;
            const ctx = canvas.getContext("2d")!;
            ctx.fillStyle = "rgba(15,23,42,0.9)"; ctx.fillRect(4,4,504,88);
            ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.strokeRect(4,4,504,88);
            ctx.fillStyle = color; ctx.font = "bold 30px monospace"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
            ctx.fillText(text, 256, 48);
            const tex = new THREE.CanvasTexture(canvas);
            const sp = push(new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true })));
            sp.position.copy(pos); sp.scale.set(3.0, 0.56, 1);
          };
          mkSp("Event A: P(A)", "#f87171", new THREE.Vector3(-2.5, 2.5, 0));
          mkSp("Event B: P(B)", "#60a5fa", new THREE.Vector3(2.5, 2.5, 0));
          // P(A∩B) = P(A)P(B)
          const ab = push(new THREE.Mesh(
            new THREE.CircleGeometry(1, 64),
            new THREE.MeshBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.3, side: THREE.DoubleSide }),
          ));
          ab.scale.set(0.8, 1.2, 1);
          ab.position.set(2.5, 0, 0.02);
          push(new THREE.Sprite(new THREE.SpriteMaterial({ map: (() => { const c = document.createElement("canvas"); c.width = 512; c.height = 96; const x = c.getContext("2d")!; x.fillStyle = "rgba(15,23,42,0.9)"; x.fillRect(4,4,504,88); x.strokeStyle = "#22d3ee"; x.lineWidth = 2; x.strokeRect(4,4,504,88); x.fillStyle = "#22d3ee"; x.font = "bold 30px monospace"; x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("Independent: P(A∩B) = P(A) × P(B)", 256, 48); const t = new THREE.CanvasTexture(c); return t; })(), transparent: true })));
          (meshes[meshes.length - 1] as any).position.set(0, -3.2, 0);
          (meshes[meshes.length - 1] as any).scale.set(6, 1.1, 1);
        } else if (mode === "two-events") {
          // Conditional probability: P(A|B) = P(A∩B)/P(B)
          drawEllipse(0, 0, 4, 3.5, 0x3b82f6, 0.2);
          drawEllipse(-1.5, 0, 2.5, 2, 0xef4444, 0.3);
          const mkSp = (text: string, color: string, pos: THREE.Vector3) => {
            const canvas = document.createElement("canvas");
            canvas.width = 512; canvas.height = 96;
            const ctx = canvas.getContext("2d")!;
            ctx.fillStyle = "rgba(15,23,42,0.9)"; ctx.fillRect(4,4,504,88);
            ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.strokeRect(4,4,504,88);
            ctx.fillStyle = color; ctx.font = "bold 30px monospace"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
            ctx.fillText(text, 256, 48);
            const tex = new THREE.CanvasTexture(canvas);
            const sp = push(new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true })));
            sp.position.copy(pos); sp.scale.set(3.0, 0.56, 1);
          };
          mkSp("B", "#60a5fa", new THREE.Vector3(2, 2.8, 0));
          mkSp("A", "#f87171", new THREE.Vector3(-2, 1.5, 0));
          const abRegion = push(new THREE.Mesh(
            new THREE.CircleGeometry(1, 64),
            new THREE.MeshBasicMaterial({ color: 0xfbbf24, transparent: true, opacity: 0.4, side: THREE.DoubleSide }),
          ));
          abRegion.scale.set(1.2, 1, 1);
          abRegion.position.set(-1.5, 0, 0.03);
          push(new THREE.Sprite(new THREE.SpriteMaterial({ map: (() => { const c = document.createElement("canvas"); c.width = 512; c.height = 96; const x = c.getContext("2d")!; x.fillStyle = "rgba(15,23,42,0.9)"; x.fillRect(4,4,504,88); x.strokeStyle = "#fbbf24"; x.lineWidth = 2; x.strokeRect(4,4,504,88); x.fillStyle = "#fbbf24"; x.font = "bold 30px monospace"; x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("P(A|B) = P(A∩B) / P(B)", 256, 48); const t = new THREE.CanvasTexture(c); return t; })(), transparent: true })));
          (meshes[meshes.length - 1] as any).position.set(0, -3.2, 0);
          (meshes[meshes.length - 1] as any).scale.set(6, 1.1, 1);
        }
      };

      update();
      labelSprites.forEach((s) => (s.visible = showLabels));

      const animate = () => {
        frameId = requestAnimationFrame(animate);
        controls.update();
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
      // Re-fit the canvas whenever the container itself resizes (screen fit)
      const resizeObserver = new ResizeObserver(() => handleResize());
      resizeObserver.observe(container);

      return () => {
        cancelAnimationFrame(frameId);
        window.removeEventListener("resize", handleResize);
        resizeObserver?.disconnect();
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
  }, [mode, isWebGL, runId, showLabels]);

  if (!isWebGL) {
    return <WebGLFallback title="Probability" description="Probability space visualization — requires WebGL." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Probability — Basic Laws</span>
          <span className="text-xs text-muted-foreground font-normal">Sample space · Independent events · Conditional probability</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <ScenePresets presets={presets} />
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={() => setShowLabels((v) => !v)} className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${showLabels ? "border-blue-500/50 bg-blue-500/10 text-blue-300" : "border-border bg-muted/40 text-muted-foreground"}`}>Labels</button>
            <button onClick={resetAll} className="px-2.5 py-1 rounded-md text-xs font-medium border border-border bg-muted/40 text-muted-foreground hover:bg-muted/70 transition-colors" title="Reset to defaults">Reset</button>
          </div>
        </div>

        <CollapsibleControls label="Probability Mode">
          <div className="flex flex-wrap gap-2 mt-2">
            {(["sample-space", "independent", "two-events"] as ProbMode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  mode === m ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {m === "sample-space" ? "Sample Space" : m === "independent" ? "Independent Events" : "Conditional P"}
              </button>
            ))}
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[clamp(320px,60vh,640px)] w-full overflow-hidden rounded-lg border border-border bg-slate-900">
          <VizToolbar targetRef={vizTargetRef} />
        </div>

        <ReadoutGrid
          items={[
            { label: "View", value: info.head, highlight: true },
            { label: "Key law", value: info.law },
            { label: "Why it works", value: info.method },
            { label: "Worked example", value: info.example },
            { label: "Common pitfall", value: info.pitfall },
          ]}
        />

        <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-400">Two Basic Laws of Probability</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Addition Law:</strong> P(A ∪ B) = P(A) + P(B) − P(A ∩ B)</p>
            <p><strong className="text-foreground">Multiplication Law:</strong> P(A ∩ B) = P(A) · P(B|A) = P(B) · P(A|B)</p>
            <p><strong className="text-foreground">Independent events:</strong> P(A ∩ B) = P(A) · P(B)</p>
            <p><strong className="text-foreground">Conditional probability:</strong> P(A|B) = P(A ∩ B) / P(B), where P(B) &gt; 0</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
