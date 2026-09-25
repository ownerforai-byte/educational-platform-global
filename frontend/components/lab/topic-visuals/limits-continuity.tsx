"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallback } from "@/components/lab/webgl-fallback";
import { VizToolbar, type VizTarget } from "@/components/viz/viz-toolbar";
import { ScenePresets, ReadoutGrid, PlaybackBar, type ScenePreset } from "@/components/lab/scene-interactivity";
import * as THREE from "three";

/* ============================================================
   Limits & Continuity — NEB Calculus (Maths 11 & 12)
   Animated visualization of lim(x→a) f(x), discontinuities,
   left-hand and right-hand limits.
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
  ctx.font = "bold 32px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = color;
  ctx.fillText(text, 256, 48);
  const tex = new THREE.CanvasTexture(canvas);
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false }));
  s.position.copy(pos);
  s.scale.set(3.0 * scale, 0.56 * scale, 1);
  return s;
}

type DiscontinuityType = "removable" | "jump" | "infinite" | "continuous";

/** Analytic one-sided limits of the plotted curves at x = a. */
function limitSides(type: DiscontinuityType, a: number): { lhl: number; rhl: number } {
  switch (type) {
    case "continuous":
    case "removable":
      return { lhl: 1, rhl: 1 }; // 2·sin(x−a)+1 → 1 as x→a
    case "jump":
      return { lhl: 1.5 * Math.sin(a) + 1, rhl: 1.5 * Math.sin(a) - 1 };
    case "infinite":
      return { lhl: -Infinity, rhl: Infinity }; // 2/(x−a)
  }
}

function fmtV(v: number): string {
  if (v === Infinity) return "+∞";
  if (v === -Infinity) return "−∞";
  return v.toFixed(2);
}

const DISC_INFO: Record<DiscontinuityType, { concept: string; formula: string; condition: string; resolution: string; fact: string; tip: string }> = {
  continuous: {
    concept: "Continuous at x = a",
    formula: "f(x) = 2·sin(x−a) + 1",
    condition: "LHL = RHL = f(a)",
    resolution: "The dot slides onto the curve with no break — the limit equals the value.",
    fact: "Every polynomial, sin x, cos x and eˣ is continuous at all real numbers.",
    tip: "Draw it without lifting your pen — that is continuity at Grade-12 level.",
  },
  removable: {
    concept: "Removable discontinuity (hole)",
    formula: "f(x) = 2·sin(x−a) + 1, x ≠ a; f(a) = 2.5",
    condition: "LHL = RHL exists, but f(a) ≠ limit",
    resolution: "Hole at (a, 1), point parked at 2.5 — redefine f(a) = 1 to repair it.",
    fact: "sin x / x at x = 0 is the classic removable discontinuity: limit 1, value undefined.",
    tip: "The limit ignores f(a) entirely — it only watches the approach.",
  },
  jump: {
    concept: "Jump discontinuity",
    formula: "f(x) = 1.5·sin x + 1 (x < a); 1.5·sin x − 1 (x > a)",
    condition: "LHL ≠ RHL",
    resolution: "Two branch heights differ by 2 — the two-sided limit does not exist.",
    fact: "The greatest-integer function ⌊x⌋ jumps by 1 at every integer.",
    tip: "Both one-sided limits exist at a jump; DNE refers only to the two-sided limit.",
  },
  infinite: {
    concept: "Infinite discontinuity (asymptote)",
    formula: "f(x) = 2 / (x−a)",
    condition: "f → −∞ from the left, +∞ from the right",
    resolution: "Vertical asymptote at x = a — no finite limit exists.",
    fact: "1/x at x = 0: the left branch dives to −∞ while the right climbs to +∞.",
    tip: "Writing lim = ∞ records HOW it diverges; strictly, the limit still does not exist.",
  },
};

export function LimitsContinuityVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const vizTargetRef = useRef<VizTarget>({});
  const [disType, setDisType] = useState<DiscontinuityType>("continuous");
  const [a, setA] = useState(2);
  const [isWebGL] = useState(() => isWebGLAvailable());
  const [showLabels, setShowLabels] = useState(true);
  const [runId, setRunId] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const playingRef = useRef(true);
  const speedRef = useRef(1);
  useEffect(() => { speedRef.current = speed; playingRef.current = playing; }, [speed, playing]);

  const info = DISC_INFO[disType];
  const sides = limitSides(disType, a);
  const limitExists = disType === "continuous" || disType === "removable";

  const presets: ScenePreset[] = [
    { name: "Continuous", hint: "LHL = RHL = f(a)", apply: () => { setDisType("continuous"); setRunId((r) => r + 1); } },
    { name: "Removable hole", hint: "Limit exists, f(a) ≠ limit", apply: () => { setDisType("removable"); setRunId((r) => r + 1); } },
    { name: "Jump", hint: "LHL ≠ RHL → DNE", apply: () => { setDisType("jump"); setRunId((r) => r + 1); } },
    { name: "Infinite", hint: "Vertical asymptote at x = a", apply: () => { setDisType("infinite"); setRunId((r) => r + 1); } },
  ];

  const resetAll = () => {
    setDisType("continuous");
    setA(2);
    setShowLabels(true);
    setPlaying(true);
    setSpeed(1);
    setRunId((r) => r + 1);
  };


  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isWebGL) return;

    let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer;
    let controls: any;
    let frameId: number;
    let animId: number;
    let animTime = 0;
    const meshes: THREE.Object3D[] = [];
    const labelSprites: THREE.Sprite[] = [];
    let dotPos = 0;

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
      controls.autoRotate = false;
      controls.minDistance = 5;
      controls.maxDistance = 25;
      vizTargetRef.current = { controls, el: container, canvasEl: renderer.domElement, setLabels: (on: boolean) => labelSprites.forEach((s) => (s.visible = on)) };

      scene.add(new THREE.AmbientLight(0xffffff, 0.7));

      const push = <T extends THREE.Object3D>(o: T): T => { scene.add(o); meshes.push(o); return o; };

      // Axes
      const mkAxis = (from: THREE.Vector2, to: THREE.Vector2, color: number, label: string) => {
        push(new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(from.x, from.y, 0), new THREE.Vector3(to.x, to.y, 0)]),
          new THREE.LineBasicMaterial({ color }),
        ));
        push(mkSprite(label, `#${color.toString(16).padStart(6, "0")}`, new THREE.Vector3(to.x, to.y, 0.05), 0.6));
      };
      mkAxis(new THREE.Vector2(-10, 0), new THREE.Vector2(10, 0), 0xef4444, "x");
      mkAxis(new THREE.Vector2(0, -10), new THREE.Vector2(0, 10), 0x22c55e, "y");

      for (let i = -10; i <= 10; i++) {
        if (i === 0) continue;
        push(new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(i, -10, 0), new THREE.Vector3(i, 10, 0)]),
          new THREE.LineBasicMaterial({ color: 0x1e293b }),
        ));
        push(new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-10, i, 0), new THREE.Vector3(10, i, 0)]),
          new THREE.LineBasicMaterial({ color: 0x1e293b }),
        ));
      }

      // Vertical line at x = a
      push(new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(a, -10, 0), new THREE.Vector3(a, 10, 0)]),
        new THREE.LineDashedMaterial({ color: 0xfbbf24, dashSize: 0.2, gapSize: 0.15 }),
      ) as any);
      (meshes[meshes.length - 1] as any).computeLineDistances();

      const fValues: { left: number; right: number; actual?: number; open?: boolean }[] = [];
      const steps = 200;
      for (let i = 0; i <= steps; i++) {
        const x = -10 + (i / steps) * 20;
        let y: number;
        switch (disType) {
          case "continuous": y = Math.sin(x - a) * 2 + 1; break;
          case "removable":
            y = Math.sin(x - a) * 2 + 1; // curve passes through (a, 1) as a hole — marker drawn separately
            break;
          case "jump":
            y = x < a ? Math.sin(x) * 1.5 + 1 : Math.sin(x) * 1.5 - 1;
            break;
          case "infinite":
            y = 2 / (x - a);
            break;
          default: y = 0;
        }
        fValues.push({
          left: x < a ? y : NaN,
          right: x >= a ? y : NaN,
          actual: y,
          open: disType === "removable" && Math.abs(x - a) < 0.01,
        });
      }

      // Curve line
      const curvePoints: THREE.Vector3[] = [];
      fValues.forEach((v, i) => {
        const x = -10 + (i / steps) * 20;
        if (disType === "infinite" && Math.abs(v.actual!) > 10) return;
        curvePoints.push(new THREE.Vector3(x, v.actual ?? 0, 0.02));
      });
      push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(curvePoints), new THREE.LineBasicMaterial({ color: 0x22d3ee, linewidth: 2 })));

      // Limit-point height at x = a (hole position for the removable case).
      // For removable: f = 2·sin(x−a) + 1 with x ≠ a, so the limit is 1 — not 2.5.
      const limitY = Number.isFinite(sides.lhl) ? sides.lhl : 0;

      // Approaching dot
      const dot = push(new THREE.Mesh(new THREE.SphereGeometry(0.15, 12, 12), new THREE.MeshBasicMaterial({ color: 0xf97316 }))) as THREE.Mesh;
      dot.position.set(-10, 0, 0.05);

      let dir = 1;
      const speed = 0.04;

      const animate = () => {
        frameId = requestAnimationFrame(animate);
        controls.update();
        animTime += 0.016;
        renderer.render(scene, camera);
      };
      animate();

      // Animation loop for approaching dot
      const animLoop = () => {
        animId = requestAnimationFrame(animLoop);
        if (playingRef.current) {
          dotPos += speed * dir * speedRef.current;
          if (dotPos >= a) { dir = -1; dotPos = a; }
          if (dotPos <= -10) { dir = 1; dotPos = -10; }
        }

        let yVal = 0;
        switch (disType) {
          case "continuous": yVal = Math.sin(dotPos - a) * 2 + 1; break;
          case "removable": yVal = Math.sin(dotPos - a) * 2 + 1; break;
          case "jump": yVal = dotPos < a ? Math.sin(dotPos) * 1.5 + 1 : Math.sin(dotPos) * 1.5 - 1; break;
          case "infinite": yVal = dotPos !== a ? 2 / (dotPos - a) : 0; break;
        }

        dot.position.x = dotPos;
        dot.position.y = Math.max(-9, Math.min(9, yVal));
      };
      animLoop();

      // L-hat and R-hat markers — one-sided limits computed analytically
      push(mkSprite(`lim(x→${a}⁻) = ${fmtV(sides.lhl)}`, "#22d3ee", new THREE.Vector3(a - 3, 7, 0), 0.9));
      push(mkSprite(`lim(x→${a}⁺) = ${fmtV(sides.rhl)}`, "#a78bfa", new THREE.Vector3(a + 3, 7, 0), 0.9));

      // f(a) marker (open circle for removable)
      if (disType === "removable") {
        const openCircle = push(new THREE.Mesh(
          new THREE.RingGeometry(0.15, 0.22, 16),
          new THREE.MeshBasicMaterial({ color: 0xef4444, side: THREE.DoubleSide }),
        ) as THREE.Mesh);
        openCircle.position.set(a, limitY, 0.05);
        const fillCircle = push(new THREE.Mesh(
          new THREE.CircleGeometry(0.15, 16),
          new THREE.MeshBasicMaterial({ color: 0xef4444 }),
        ) as THREE.Mesh);
        fillCircle.position.set(a, 2.5, 0.05);
      } else if (disType === "jump") {
        const yLeft = sides.lhl;
        const yRight = sides.rhl;
        const lc = push(new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 8), new THREE.MeshBasicMaterial({ color: 0x22d3ee }))) as THREE.Mesh;
        lc.position.set(a, yLeft, 0.05);
        const rc = push(new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 8), new THREE.MeshBasicMaterial({ color: 0xa78bfa }))) as THREE.Mesh;
        rc.position.set(a, yRight, 0.05);
      }

      meshes.forEach((m) => { if (m instanceof THREE.Sprite) labelSprites.push(m); });
      labelSprites.forEach((s) => (s.visible = showLabels));

      return () => {
        cancelAnimationFrame(frameId);
        cancelAnimationFrame(animId);
        if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
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

    const cleanup = init();
    return () => { cleanup.then((d) => d?.()); };
  }, [disType, a, isWebGL, runId, showLabels]);

  if (!isWebGL) {
    return <WebGLFallback title="Limits & Continuity" description="Animated limit visualization — requires WebGL." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Limits & Continuity</span>
          <span className="text-xs text-muted-foreground font-normal">Watch the orange dot approach x = {a}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <ScenePresets presets={presets} />
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={() => setShowLabels((v) => !v)} className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${showLabels ? "border-orange-500/50 bg-orange-500/10 text-orange-300" : "border-border bg-muted/40 text-muted-foreground"}`}>Labels</button>
            <button onClick={resetAll} className="px-2.5 py-1 rounded-md text-xs font-medium border border-border bg-muted/40 text-muted-foreground hover:bg-muted/70 transition-colors" title="Reset to defaults">Reset</button>
          </div>
        </div>

        <CollapsibleControls label="Discontinuity Type">
          <div className="flex flex-wrap gap-2 mt-2">
            {(["continuous", "removable", "jump", "infinite"] as DiscontinuityType[]).map((t) => (
              <button
                key={t}
                onClick={() => setDisType(t)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  disType === t
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {t === "continuous" ? "Continuous" : t === "removable" ? "Removable" : t === "jump" ? "Jump" : "Infinite"}
              </button>
            ))}
          </div>
        </CollapsibleControls>

        <CollapsibleControls label="Approach Point (a)">
          <div className="w-20 mt-1">
            <Label className="text-xs text-muted-foreground">a:</Label>
            <Input type="number" step="0.5" value={a} onChange={(e) => setA(Number(e.target.value))} className="mt-1" />
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[clamp(320px,60vh,640px)] w-full overflow-hidden rounded-lg border border-border bg-slate-900">
          <VizToolbar targetRef={vizTargetRef} />
        </div>

        <PlaybackBar playing={playing} onPlayToggle={() => setPlaying((p) => !p)} speed={speed} onSpeedChange={setSpeed} onReset={resetAll} />

        <ReadoutGrid
          items={[
            { label: "Behavior", value: info.concept, highlight: true },
            { label: "f(x)", value: info.formula },
            { label: `LHL at x = ${a}`, value: fmtV(sides.lhl) },
            { label: `RHL at x = ${a}`, value: fmtV(sides.rhl) },
            { label: `lim(x→${a}) f(x)`, value: limitExists ? fmtV(sides.lhl) : "Does not exist" },
            { label: `f(${a})`, value: disType === "continuous" ? fmtV(sides.lhl) : disType === "removable" ? "2.50 ≠ limit" : disType === "jump" ? `${fmtV(sides.rhl)} (right branch)` : "undefined (asymptote)" },
          ]}
        />

        <div className="rounded-lg border border-orange-500/30 bg-orange-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-orange-400">Key Ideas</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">lim(x→a) f(x) = L</strong> means f(x) gets arbitrarily close to L as x approaches a from both sides.</p>
            <p><strong className="text-foreground">Left-hand limit:</strong> lim(x→a⁻) f(x) — approaching from values less than a.</p>
            <p><strong className="text-foreground">Right-hand limit:</strong> lim(x→a⁺) f(x) — approaching from values greater than a.</p>
            <p><strong className="text-foreground">Continuous at a:</strong> lim(x→a) f(x) = f(a) — all three exist and are equal.</p>
            <p><strong className="text-foreground">Removable discontinuity:</strong> limit exists but f(a) is undefined or different.</p>
            <p><strong className="text-foreground">Jump discontinuity:</strong> LHL ≠ RHL — limit does not exist.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
