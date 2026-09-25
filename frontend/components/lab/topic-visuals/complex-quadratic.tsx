"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallback } from "@/components/lab/webgl-fallback";
import { VizToolbar, type VizTarget } from "@/components/viz/viz-toolbar";
import { ScenePresets, PlaybackBar, ReadoutGrid, type ScenePreset } from "@/components/lab/scene-interactivity";
import * as THREE from "three";

/* ============================================================
   Complex Numbers & Quadratic Equations — NEB Algebra (Maths 11)
   Argand diagram showing complex numbers, modulus, conjugate,
   and the quadratic formula with discriminant analysis.
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

function addLabel(scene: THREE.Scene, meshes: THREE.Object3D[], labelSprites: THREE.Sprite[], text: string, color: number, pos: THREE.Vector3, scale = 0.75) {
  const s = mkSprite(text, `#${color.toString(16).padStart(6, "0")}`, pos, scale);
  scene.add(s);
  meshes.push(s);
  labelSprites.push(s);
}

type Mode = "quadratic" | "complex";

const CQ_INFO: Record<Mode, { head: string; theory: string; formula: string; example: string; tip: string }> = {
  quadratic: {
    head: "Quadratic ax² + bx + c = 0",
    theory: "The discriminant Δ = b² − 4ac decides the nature of the roots without solving.",
    formula: "x = (−b ± √(b² − 4ac)) / 2a",
    example: "Δ > 0 → two distinct real roots · Δ = 0 → one repeated root · Δ < 0 → a conjugate pair of complex roots",
    tip: "Sum of roots = −b/a, product = c/a. Real coefficients mean complex roots always come in conjugate pairs.",
  },
  complex: {
    head: "Complex number z = a + bi",
    theory: "Plot z at (a, b) on the Argand plane: the real axis is horizontal, the imaginary axis vertical.",
    formula: "|z| = √(a² + b²),   z̄ = a − bi,   z · z̄ = |z|²",
    example: "z = 2 + i → |z| = √5 ≈ 2.236, arg z = tan⁻¹(1/2) ≈ 26.6°",
    tip: "Conjugating reflects the point across the real axis; the modulus is its distance from the origin.",
  },
};

export function ComplexQuadraticVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const vizTargetRef = useRef<VizTarget>({});
  const [a, setA] = useState(1);
  const [b, setB] = useState(-3);
  const [c, setC] = useState(2);
  const [mode, setMode] = useState<Mode>("quadratic");
  const [re, setRe] = useState(2);
  const [im, setIm] = useState(1);
  const [isWebGL] = useState(() => isWebGLAvailable());
  const [showLabels, setShowLabels] = useState(true);
  const [runId, setRunId] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const speedRef = useRef(1);
  const playingRef = useRef(true);

  useEffect(() => { speedRef.current = speed; playingRef.current = playing; }, [speed, playing]);

  const info = CQ_INFO[mode];

  const presets: ScenePreset[] = [
    { name: "Δ > 0 · real roots", hint: "x² − 3x + 2: two distinct real roots", apply: () => { setMode("quadratic"); setA(1); setB(-3); setC(2); setRunId((r) => r + 1); } },
    { name: "Δ = 0 · repeated", hint: "x² − 4x + 4: one repeated real root", apply: () => { setMode("quadratic"); setA(1); setB(-4); setC(4); setRunId((r) => r + 1); } },
    { name: "Δ < 0 · complex", hint: "x² + 2x + 5: conjugate complex roots", apply: () => { setMode("quadratic"); setA(1); setB(2); setC(5); setRunId((r) => r + 1); } },
    { name: "Argand: z & z̄", hint: "Plot z = 2 + i with its conjugate and modulus", apply: () => { setMode("complex"); setRe(2); setIm(1); setRunId((r) => r + 1); } },
  ];

  const resetAll = () => {
    setMode("quadratic");
    setA(1); setB(-3); setC(2);
    setRe(2); setIm(1);
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
    let animTime = 0;
    const meshes: THREE.Object3D[] = [];
    const labelSprites: THREE.Sprite[] = [];
    let animPoint: THREE.Mesh;

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
      controls.minDistance = 4;
      controls.maxDistance = 20;
      vizTargetRef.current = { controls, el: container, canvasEl: renderer.domElement, setLabels: (on: boolean) => labelSprites.forEach((s) => (s.visible = on)) };

      scene.add(new THREE.AmbientLight(0xffffff, 0.7));

      const push = <T extends THREE.Object3D>(o: T): T => { scene.add(o); meshes.push(o); return o; };

      const G = 8;
      // Real axis
      push(new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-G, 0, 0), new THREE.Vector3(G, 0, 0)]),
        new THREE.LineBasicMaterial({ color: 0xef4444 }),
      ));
      push(mkSprite("Re", "#ef4444", new THREE.Vector3(G - 0.5, 0.3, 0), 0.6));
      // Imag axis
      push(new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, -G, 0), new THREE.Vector3(0, G, 0)]),
        new THREE.LineBasicMaterial({ color: 0x22c55e }),
      ));
      push(mkSprite("Im", "#22c55e", new THREE.Vector3(0.3, G - 0.5, 0), 0.6));

      // Grid
      for (let i = -G; i <= G; i++) {
        if (i === 0) continue;
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(i, -G, 0), new THREE.Vector3(i, G, 0)]), new THREE.LineBasicMaterial({ color: 0x1e293b })));
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-G, i, 0), new THREE.Vector3(G, i, 0)]), new THREE.LineBasicMaterial({ color: 0x1e293b })));
      }

      const update = () => {
        while (meshes.length > 10) {
          const m = meshes.pop()!;
          scene.remove(m);
          if (m instanceof THREE.Mesh) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Line) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Sprite) { (m.material as THREE.SpriteMaterial).map?.dispose?.(); m.material.dispose(); }
        }

        if (mode === "quadratic") {
          const disc = b * b - 4 * a * c;
          const sqrtDisc = Math.sqrt(Math.abs(disc));
          const root1Real = -b / (2 * a);
          const root1Im = sqrtDisc / (2 * a);

          // Roots on complex plane
          const drawRoot = (rx: number, ry: number, color: number, label: string) => {
            const pt = push(new THREE.Mesh(new THREE.SphereGeometry(0.18, 12, 12), new THREE.MeshBasicMaterial({ color }))) as THREE.Mesh;
            pt.position.set(rx, ry, 0.05);
            addLabel(scene, meshes, labelSprites, label, color, pt.position.clone().add(new THREE.Vector3(0.5, 0.5, 0)), 0.7);
            // Line from origin
            push(new THREE.Line(
              new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0.02), new THREE.Vector3(rx, ry, 0.03)]),
              new THREE.LineDashedMaterial({ color, dashSize: 0.15, gapSize: 0.1 }),
            ) as any);
            (meshes[meshes.length - 1] as any).computeLineDistances();
          };

          if (disc > 0) {
            drawRoot(root1Real - root1Im, 0, 0x22d3ee, `x₁=${(root1Real - root1Im).toFixed(2)}`);
            drawRoot(root1Real + root1Im, 0, 0xa78bfa, `x₂=${(root1Real + root1Im).toFixed(2)}`);
            addLabel(scene, meshes, labelSprites, `Δ = ${disc.toFixed(1)} > 0: Two distinct real roots`, 0xfbbf24, new THREE.Vector3(0, 5.5, 0.05), 0.85);
          } else if (disc === 0) {
            drawRoot(root1Real, 0, 0x22d3ee, `x=${root1Real.toFixed(2)}`);
            addLabel(scene, meshes, labelSprites, `Δ = 0: One repeated real root`, 0xfbbf24, new THREE.Vector3(0, 5.5, 0.05), 0.85);
          } else {
            drawRoot(root1Real, root1Im, 0x22d3ee, `${root1Real.toFixed(2)}+${root1Im.toFixed(2)}i`);
            drawRoot(root1Real, -root1Im, 0xa78bfa, `${root1Real.toFixed(2)}-${root1Im.toFixed(2)}i`);
            addLabel(scene, meshes, labelSprites, `Δ = ${disc.toFixed(1)} < 0: Complex conjugate roots`, 0xf97316, new THREE.Vector3(0, 5.5, 0.05), 0.85);
          }

          addLabel(scene, meshes, labelSprites, `ax²+bx+c = ${a}x²+${b>=0?b:""}x+${c>=0?c:""} = 0`, 0x7dd3fc, new THREE.Vector3(0, -5.5, 0.05), 0.8);
        } else {
          // Complex number visualization
          const _z = { re, im };
          const _conj = { re, im: -im };
          const mod = Math.sqrt(re * re + im * im);

          // Point z
          const pZ = push(new THREE.Mesh(new THREE.SphereGeometry(0.18, 12, 12), new THREE.MeshBasicMaterial({ color: 0xef4444 }))) as THREE.Mesh;
          pZ.position.set(re, im, 0.05);
          animPoint = pZ;
          addLabel(scene, meshes, labelSprites, `z = ${re.toFixed(1)}+${im.toFixed(1)}i`, 0xf87171, pZ.position.clone().add(new THREE.Vector3(0.5, 0.5, 0)), 0.75);

          // Point conjugate
          const pC = push(new THREE.Mesh(new THREE.SphereGeometry(0.15, 8, 8), new THREE.MeshBasicMaterial({ color: 0x22c55e }))) as THREE.Mesh;
          pC.position.set(re, -im, 0.05);
          addLabel(scene, meshes, labelSprites, `z̄ = ${re.toFixed(1)}-${Math.abs(im).toFixed(1)}i`, 0x4ade80, pC.position.clone().add(new THREE.Vector3(0.5, -0.5, 0)), 0.75);

          // Modulus line
          push(new THREE.Line(
            new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0.02), new THREE.Vector3(re, im, 0.03)]),
            new THREE.LineBasicMaterial({ color: 0xf97316, linewidth: 2 }),
          ));
          addLabel(scene, meshes, labelSprites, `|z| = ${mod.toFixed(2)}`, 0xfb923c, new THREE.Vector3(re / 2 + 0.5, im / 2 + 0.3, 0.05), 0.75);

          // Conjugate line
          push(new THREE.Line(
            new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0.02), new THREE.Vector3(re, -im, 0.03)]),
            new THREE.LineDashedMaterial({ color: 0x22c55e, dashSize: 0.12, gapSize: 0.08 }),
          ) as any);
          (meshes[meshes.length - 1] as any).computeLineDistances();
        }
      };

      update();
      labelSprites.forEach((s) => (s.visible = showLabels));

      const animate = () => {
        frameId = requestAnimationFrame(animate);
        controls.update();
        if (playingRef.current) {
          animTime += 0.025 * speedRef.current;
          if (animPoint) {
            const r = 3;
            animPoint.position.x = re + r * Math.cos(animTime);
            animPoint.position.y = im + r * Math.sin(animTime);
          }
        }
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
  }, [mode, a, b, c, re, im, isWebGL, runId, showLabels]);

  if (!isWebGL) {
    return <WebGLFallback title="Complex Numbers & Quadratics" description="Argand diagram — requires WebGL." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Complex Numbers &amp; Quadratic Equations</span>
          <span className="text-xs text-muted-foreground font-normal">Argand diagram — drag to rotate</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <ScenePresets presets={presets} />
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={() => setShowLabels((v) => !v)} className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${showLabels ? "border-purple-500/50 bg-purple-500/10 text-purple-300" : "border-border bg-muted/40 text-muted-foreground"}`}>Labels</button>
            <button onClick={resetAll} className="px-2.5 py-1 rounded-md text-xs font-medium border border-border bg-muted/40 text-muted-foreground hover:bg-muted/70 transition-colors" title="Reset to defaults">Reset</button>
          </div>
        </div>

        <CollapsibleControls label="View Mode">
          <div className="flex flex-wrap gap-2 mt-2">
            {(["quadratic", "complex"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  mode === m ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {m === "quadratic" ? "Quadratic Eq." : "Complex Number"}
              </button>
            ))}
          </div>
        </CollapsibleControls>

        {mode === "quadratic" ? (
          <CollapsibleControls label="Quadratic Coefficients (ax² + bx + c = 0)">
            <div className="flex gap-3 mt-2">
              <div className="w-16"><Label className="text-xs text-muted-foreground">a:</Label><Input type="number" step="0.5" value={a} onChange={(e) => setA(Number(e.target.value) || 0.01)} className="mt-1" /></div>
              <div className="w-16"><Label className="text-xs text-muted-foreground">b:</Label><Input type="number" step="0.5" value={b} onChange={(e) => setB(Number(e.target.value))} className="mt-1" /></div>
              <div className="w-16"><Label className="text-xs text-muted-foreground">c:</Label><Input type="number" step="0.5" value={c} onChange={(e) => setC(Number(e.target.value))} className="mt-1" /></div>
            </div>
          </CollapsibleControls>
        ) : (
          <CollapsibleControls label="Complex Number z = re + im·i">
            <div className="flex gap-3 mt-2">
              <div className="w-16"><Label className="text-xs text-muted-foreground">Re:</Label><Input type="number" step="0.5" value={re} onChange={(e) => setRe(Number(e.target.value))} className="mt-1" /></div>
              <div className="w-16"><Label className="text-xs text-muted-foreground">Im:</Label><Input type="number" step="0.5" value={im} onChange={(e) => setIm(Number(e.target.value))} className="mt-1" /></div>
            </div>
          </CollapsibleControls>
        )}

        <div ref={containerRef} className="relative h-[clamp(320px,60vh,640px)] w-full overflow-hidden rounded-lg border border-border bg-slate-900">
          <VizToolbar targetRef={vizTargetRef} />
        </div>

        <PlaybackBar playing={playing} onPlayToggle={() => setPlaying((p) => !p)} speed={speed} onSpeedChange={setSpeed} onReset={resetAll} />

        <ReadoutGrid
          items={(() => {
            if (mode === "quadratic") {
              const disc = b * b - 4 * a * c;
              const nature = disc > 0 ? "Two distinct real roots" : disc === 0 ? "One repeated real root" : "Complex conjugate roots";
              const sum = -b / a;
              const prod = c / a;
              const re1 = -b / (2 * a);
              const im1 = Math.sqrt(Math.abs(disc)) / (2 * a);
              const roots = disc >= 0
                ? `x = ${(re1 - im1).toFixed(3)}, ${(re1 + im1).toFixed(3)}`
                : `x = ${re1.toFixed(3)} ± ${im1.toFixed(3)}i`;
              return [
                { label: "Discriminant Δ = b² − 4ac", value: disc.toFixed(2), highlight: true },
                { label: "Nature of roots", value: nature },
                { label: "Roots", value: roots },
                { label: "Sum of roots (−b/a)", value: sum.toFixed(3) },
                { label: "Product of roots (c/a)", value: prod.toFixed(3) },
              ];
            }
            const mod = Math.sqrt(re * re + im * im);
            const arg = (Math.atan2(im, re) * 180) / Math.PI;
            return [
              { label: "z = a + bi", value: `${re} ${im >= 0 ? "+" : "−"} ${Math.abs(im)}i`, highlight: true },
              { label: "Modulus |z|", value: mod.toFixed(3) },
              { label: "Conjugate z̄", value: `${re} ${im >= 0 ? "−" : "+"} ${Math.abs(im)}i` },
              { label: "z · z̄ = |z|²", value: (mod * mod).toFixed(2) },
              { label: "Argument arg(z)", value: `${arg.toFixed(1)}°` },
            ];
          })()}
        />

        <div className="rounded-lg border border-purple-500/30 bg-purple-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-purple-400">Key Formulas</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p className="text-foreground font-medium">{info.head}: {info.theory}</p>
            {mode === "quadratic" ? (
              <>
                <p><strong className="text-foreground">Quadratic formula:</strong> x = (−b ± √(b²−4ac)) / 2a</p>
                <p><strong className="text-foreground">Discriminant Δ = b²−4ac:</strong></p>
                <p className="pl-4">Δ &gt; 0 → two distinct real roots</p>
                <p className="pl-4">Δ = 0 → one repeated real root</p>
                <p className="pl-4">Δ &lt; 0 → complex conjugate roots</p>
              </>
            ) : (
              <>
                <p><strong className="text-foreground">Conjugate:</strong> z = a + bi → z̄ = a − bi</p>
                <p><strong className="text-foreground">Modulus:</strong> |z| = √(a² + b²)</p>
                <p><strong className="text-foreground">z · z̄ = |z|²</strong></p>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
