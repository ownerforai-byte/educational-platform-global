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
import { LiveLeaderLine } from "@/components/lab/leader-lines-3d";

/* ============================================================
   Dynamics — NEB Mechanics (Maths 11)
   Motion of a particle in a straight line: uniform acceleration,
   gravity, and inclined plane visualization.
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
  ctx.font = "bold 30px monospace";
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

type DynMode = "straight" | "gravity" | "inclined";

const DYN_INFO: Record<DynMode, { title: string; formulas: string; note: string }> = {
  straight: {
    title: "Uniformly accelerated motion in a straight line",
    formulas: "v = u + at · s = ut + ½at² · v² = u² + 2as",
    note: "Valid only for constant acceleration. The s–t graph is a parabola, the v–t graph a straight line, and the area under the v–t graph gives the displacement.",
  },
  gravity: {
    title: "Free fall under gravity (a = g = 9.8 m/s²)",
    formulas: "v = gt · h = ½gt² · v² = 2gh",
    note: "Neglecting air resistance, all bodies fall with the same acceleration regardless of mass; time to drop from height H is √(2H/g).",
  },
  inclined: {
    title: "Motion down a smooth inclined plane",
    formulas: "a = g sinθ · normal reaction N = mg cosθ",
    note: "Only the component of weight along the plane accelerates the body; with friction the acceleration is a = g(sinθ − μcosθ).",
  },
};

export function DynamicsVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const vizTargetRef = useRef<VizTarget>({});
  const [mode, setMode] = useState<DynMode>("straight");
  const [u, setU] = useState(0);
  const [a, setA] = useState(2);
  const [t, setT] = useState(5);
  const [angle, setAngle] = useState(30);
  const [isWebGL] = useState(() => isWebGLAvailable());
  const [showLabels, setShowLabels] = useState(true);
  const [runId, setRunId] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  // Playback state lives in refs so changing it never tears down the WebGL scene.
  const speedRef = useRef(1);
  const playingRef = useRef(true);
  useEffect(() => {
    speedRef.current = speed;
    playingRef.current = playing;
  }, [speed, playing]);

  const info = DYN_INFO[mode];
  const g0 = 9.8;

  const presets: ScenePreset[] = [
    { name: "Start from rest (u = 0, a = 2)", hint: "s = ½at² — 25 m in the first 5 s.", apply: () => { setMode("straight"); setU(0); setA(2); setT(5); setRunId((r) => r + 1); } },
    { name: "Braking to rest (u = 20, a = −4)", hint: "v = u + at → v = 0 exactly at t = 5 s; stopping distance 50 m.", apply: () => { setMode("straight"); setU(20); setA(-4); setT(5); setRunId((r) => r + 1); } },
    { name: "Free fall from 10 m", hint: "g = 9.8 m/s² — hits the ground after √(2h/g) ≈ 1.43 s at 14 m/s.", apply: () => { setMode("gravity"); setRunId((r) => r + 1); } },
    { name: "Smooth 30° incline", hint: "a = g sin 30° = 4.9 m/s² — half the acceleration of free fall.", apply: () => { setMode("inclined"); setAngle(30); setRunId((r) => r + 1); } },
  ];

  const resetAll = () => {
    setMode("straight");
    setU(0); setA(2); setT(5); setAngle(30);
    setShowLabels(true);
    setPlaying(true);
    setSpeed(1);
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

      const push = <T extends THREE.Object3D>(o: T): T => { scene.add(o); meshes.push(o); return o; };
      const addLabel = (s: THREE.Sprite): THREE.Sprite => { push(s); labelSprites.push(s); return s; };

      // Sprite whose canvas text is redrawn each animation frame
      const mkLiveSprite = (pos: THREE.Vector3, scale: number, color: string, text: string) => {
        const canvas = document.createElement("canvas");
        canvas.width = 512;
        canvas.height = 96;
        const ctx = canvas.getContext("2d")!;
        const tex = new THREE.CanvasTexture(canvas);
        const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false }));
        s.position.copy(pos);
        s.scale.set(3.0 * scale, 0.56 * scale, 1);
        const draw = (next: string) => {
          ctx.clearRect(0, 0, 512, 96);
          ctx.fillStyle = "rgba(15, 23, 42, 0.9)";
          ctx.fillRect(4, 4, 504, 88);
          ctx.strokeStyle = color;
          ctx.lineWidth = 2;
          ctx.strokeRect(4, 4, 504, 88);
          ctx.font = "bold 30px monospace";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = color;
          ctx.fillText(next, 256, 48);
          tex.needsUpdate = true;
        };
        draw(text);
        push(s);
        labelSprites.push(s);
        return { sprite: s, draw };
      };

      const animatedArrows: LiveLeaderLine[] = [];
      // Set by update() per mode; called every frame with scaled dt while playing.
      let applyMotion: ((dt: number) => void) | null = null;

      const update = () => {
        animatedArrows.forEach((a) => { scene.remove(a.group); a.dispose(); });
        animatedArrows.length = 0;
        applyMotion = null;
        while (meshes.length > 25) {
          const m = meshes.pop()!;
          scene.remove(m);
          if (m instanceof THREE.Mesh) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Line) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Sprite) { (m.material as THREE.SpriteMaterial).map?.dispose?.(); m.material.dispose(); }
        }
        labelSprites.length = 0;

        if (mode === "straight") {
          // x-t graph of x = ut + ½at² with a particle sliding along it
          const graphW = 6, graphH = 4;
          const ox = -7, oy = -5;
          const sx = graphW / 10, sy = graphH / 10;

          // Axes
          push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(ox, oy, 0), new THREE.Vector3(ox + graphW, oy, 0)]), new THREE.LineBasicMaterial({ color: 0x94a3b8 })));
          push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(ox, oy, 0), new THREE.Vector3(ox, oy + graphH, 0)]), new THREE.LineBasicMaterial({ color: 0x94a3b8 })));
          addLabel(mkSprite("t", "#94a3b8", new THREE.Vector3(ox + graphW + 0.3, oy, 0), 0.5));
          addLabel(mkSprite("x", "#94a3b8", new THREE.Vector3(ox, oy + graphH + 0.3, 0), 0.5));

          // x = ut + 0.5at²
          const pts: THREE.Vector3[] = [];
          for (let i = 0; i <= 100; i++) {
            const ti = (i / 100) * 10;
            const xi = u * ti + 0.5 * a * ti * ti;
            pts.push(new THREE.Vector3(ox + ti * sx, oy + xi * sy * 0.5, 0.02));
          }
          push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: 0x22d3ee, linewidth: 2 })));

          // Moving particle (loops over the first t seconds)
          const dot = push(new THREE.Mesh(new THREE.SphereGeometry(0.2, 12, 12), new THREE.MeshBasicMaterial({ color: 0xef4444 }))) as THREE.Mesh;
          const readout = mkLiveSprite(new THREE.Vector3(0, 6, 0), 0.8, "#fbbf24", "—");
          const period = Math.max(1, t);
          let te = 0;
          applyMotion = (dt: number) => {
            te = (te + dt) % period;
            const xi = u * te + 0.5 * a * te * te;
            const vi = u + a * te;
            dot.position.set(ox + te * sx, oy + xi * sy * 0.5, 0.05);
            readout.draw(`x = ${xi.toFixed(1)} m   v = ${vi.toFixed(1)} m/s   at t = ${te.toFixed(1)} s`);
          };
          applyMotion(0);

          // Equations
          addLabel(mkSprite("x = ut + ½at²    v = u + at    v² = u² + 2as", "#a78bfa", new THREE.Vector3(0, -6.5, 0), 0.7));
        } else if (mode === "gravity") {
          // Free fall from h0 = 10 m (g = 9.8 m/s²)
          const h0 = 10;
          const g = 9.8;
          const tFall = Math.sqrt((2 * h0) / g);
          const groundY = -4;

          const pts: THREE.Vector3[] = [];
          for (let i = 0; i <= 100; i++) {
            const ti = (i / 100) * tFall;
            const yi = h0 - 0.5 * g * ti * ti;
            pts.push(new THREE.Vector3(0, yi * 0.6 + groundY, 0.02));
          }
          push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: 0xef4444, linewidth: 3 })));
          // Ground
          push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-3, groundY, 0), new THREE.Vector3(3, groundY, 0)]), new THREE.LineBasicMaterial({ color: 0x22c55e, linewidth: 2 })));

          // Ball (loops: drop, land, restart)
          const ball = push(new THREE.Mesh(new THREE.SphereGeometry(0.2, 12, 12), new THREE.MeshBasicMaterial({ color: 0xf97316 }))) as THREE.Mesh;
          const readout = mkLiveSprite(new THREE.Vector3(2, 5, 0), 0.7, "#fbbf24", "—");
          let te = 0;
          applyMotion = (dt: number) => {
            te = (te + dt) % tFall;
            const h = h0 - 0.5 * g * te * te;
            ball.position.set(0, h * 0.6 + groundY, 0.05);
            readout.draw(`h = ${h.toFixed(1)} m   v = gt = ${(g * te).toFixed(1)} m/s`);
          };
          applyMotion(0);

          addLabel(mkSprite(`Free fall: v = gt, h = ½gt² — lands at v = √(2gh) ≈ ${Math.sqrt(2 * g * h0).toFixed(1)} m/s`, "#a78bfa", new THREE.Vector3(0, 6.5, 0), 0.8));
        } else if (mode === "inclined") {
          // Inclined plane with weight and normal-force leader lines
          const rad = angle * Math.PI / 180;
          const planeLen = 7;
          const planeTop = new THREE.Vector3(-planeLen * Math.cos(rad), planeLen * Math.sin(rad) - 3, 0);
          const planeBot = new THREE.Vector3(0, -3, 0);
          // Plane surface
          push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([planeBot, planeTop]), new THREE.LineBasicMaterial({ color: 0x22c55e, linewidth: 3 })));
          // Horizontal base
          push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-planeLen, -3, 0), planeBot]), new THREE.LineBasicMaterial({ color: 0x475569 })));
          // Vertical height
          push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([planeTop, new THREE.Vector3(planeTop.x, -3, 0)]), new THREE.LineDashedMaterial({ color: 0x64748b, dashSize: 0.15, gapSize: 0.1 })));
          (meshes[meshes.length - 1] as any).computeLineDistances();
          // Angle arc
          const arcPts: THREE.Vector3[] = [];
          for (let i = 0; i <= 20; i++) {
            const ta = (i / 20) * rad;
            arcPts.push(new THREE.Vector3(planeBot.x - 1 * Math.cos(ta), planeBot.y + 1 * Math.sin(ta), 0.03));
          }
          push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(arcPts), new THREE.LineBasicMaterial({ color: 0xfbbf24 })));
          // Block on plane
          const blockPos = new THREE.Vector3(planeBot.x - 3 * Math.cos(rad), planeBot.y + 3 * Math.sin(rad), 0);
          const block = push(new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.5), new THREE.MeshBasicMaterial({ color: 0xef4444 })));
          block.position.copy(blockPos);
          block.rotation.z = rad;
          // Force arrows (dynamic)
          const weightArrow = new LiveLeaderLine(new THREE.Vector3(0, -1, 0), blockPos.clone(), 1.2, 0xef4444, 0.15, 0.1);
          scene.add(weightArrow.group);
          animatedArrows.push(weightArrow);
          addLabel(mkSprite("mg ↓", "#f87171", blockPos.clone().add(new THREE.Vector3(0, -1.8, 0)), 0.65));
          const normalDir = new THREE.Vector3(-Math.sin(rad), Math.cos(rad), 0);
          const normalArrow = new LiveLeaderLine(normalDir, blockPos.clone(), 1.2, 0x60a5fa, 0.15, 0.1);
          scene.add(normalArrow.group);
          animatedArrows.push(normalArrow);
          addLabel(mkSprite("N ⊥ plane", "#60a5fa", blockPos.clone().add(normalDir.clone().multiplyScalar(1.3)), 0.65));
          // Readout
          addLabel(mkSprite(`θ = ${angle}°   g sin θ = ${(9.8 * Math.sin(rad)).toFixed(1)} m/s²   g cos θ = ${(9.8 * Math.cos(rad)).toFixed(1)}`, "#fbbf24", new THREE.Vector3(-3, 6, 0), 0.75));
        }
      };

      update();
      labelSprites.forEach((s) => (s.visible = showLabels));

      let last = performance.now();
      const animate = () => {
        frameId = requestAnimationFrame(animate);
        const now = performance.now();
        const dt = Math.min(0.05, (now - last) / 1000);
        last = now;
        const time = now / 1000;
        animatedArrows.forEach((arrow) => arrow.update(time));
        if (playingRef.current && applyMotion) applyMotion(dt * speedRef.current);
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
        animatedArrows.forEach((a) => { scene.remove(a.group); a.dispose(); });
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
  }, [mode, u, a, t, angle, isWebGL, runId, showLabels]);

  if (!isWebGL) {
    return <WebGLFallback title="Dynamics" description="Motion visualization — requires WebGL." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Dynamics — Motion of a Particle</span>
          <span className="text-xs text-muted-foreground font-normal">Straight line · Gravity · Inclined plane</span>
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

        <CollapsibleControls label="Motion Type">
          <div className="flex flex-wrap gap-2 mt-2">
            {(["straight", "gravity", "inclined"] as DynMode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  mode === m ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {m === "straight" ? "Straight Line" : m === "gravity" ? "Free Fall" : "Inclined Plane"}
              </button>
            ))}
          </div>
        </CollapsibleControls>

        {mode === "straight" && (
          <CollapsibleControls label="Initial Conditions">
            <div className="flex gap-3 mt-2">
              <div className="w-16"><Label className="text-xs text-muted-foreground">u (m/s):</Label><Input type="number" step="0.5" value={u} onChange={(e) => setU(Number(e.target.value))} className="mt-1" /></div>
              <div className="w-16"><Label className="text-xs text-muted-foreground">a (m/s²):</Label><Input type="number" step="0.5" value={a} onChange={(e) => setA(Number(e.target.value))} className="mt-1" /></div>
            </div>
          </CollapsibleControls>
        )}

        {mode === "inclined" && (
          <CollapsibleControls label="Incline Angle">
            <input type="range" min={5} max={60} value={angle} onChange={(e) => setAngle(Number(e.target.value))} className="w-full mt-1" />
            <p className="text-xs font-mono text-primary mt-1">{angle}°</p>
          </CollapsibleControls>
        )}

        <div ref={containerRef} className="relative h-[clamp(320px,60vh,640px)] w-full overflow-hidden rounded-lg border border-border bg-slate-900">
          <VizToolbar targetRef={vizTargetRef} />
        </div>

        <PlaybackBar
          playing={playing}
          onPlayToggle={() => setPlaying((p) => !p)}
          speed={speed}
          onSpeedChange={setSpeed}
          onReset={resetAll}
        />

        <ReadoutGrid
          items={
            mode === "straight"
              ? [
                  { label: "Mode", value: DYN_INFO.straight.title, highlight: true },
                  { label: "v after t = 5 s (v = u + at)", value: (u + a * t).toFixed(1), unit: "m/s" },
                  { label: "s in first t s (s = ut + ½at²)", value: (u * t + 0.5 * a * t * t).toFixed(1), unit: "m" },
                  { label: "v² − u² = 2as check", value: (2 * a * (u * t + 0.5 * a * t * t)).toFixed(1), unit: "m²/s²" },
                  { label: "Average velocity (u + v)/2", value: (u + 0.5 * a * t).toFixed(1), unit: "m/s" },
                ]
              : mode === "gravity"
                ? [
                    { label: "Mode", value: DYN_INFO.gravity.title, highlight: true },
                    { label: "Drop height", value: 10, unit: "m" },
                    { label: "Time to land √(2h/g)", value: Math.sqrt(20 / g0).toFixed(2), unit: "s" },
                    { label: "Impact speed √(2gh)", value: Math.sqrt(2 * g0 * 10).toFixed(1), unit: "m/s" },
                    { label: "Distance fallen in 1st second", value: (0.5 * g0 * 1 * 1).toFixed(1), unit: "m" },
                  ]
                : [
                    { label: "Mode", value: DYN_INFO.inclined.title, highlight: true },
                    { label: "Down-plane accel g sinθ", value: (g0 * Math.sin((angle * Math.PI) / 180)).toFixed(2), unit: "m/s²" },
                    { label: "Normal component g cosθ", value: (g0 * Math.cos((angle * Math.PI) / 180)).toFixed(2), unit: "m/s²" },
                    { label: "Speed after sliding 3 m (v² = 2as)", value: Math.sqrt(2 * g0 * Math.sin((angle * Math.PI) / 180) * 3).toFixed(1), unit: "m/s" },
                    { label: "Time to slide 3 m from rest", value: Math.sqrt(6 / (g0 * Math.sin((angle * Math.PI) / 180))).toFixed(2), unit: "s" },
                  ]
          }
        />

        <div className="rounded-lg border border-orange-500/30 bg-orange-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-orange-400">Equations of Motion</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">{info.title}:</strong> {info.formulas}</p>
            <p>{info.note}</p>
            <p><strong className="text-foreground">v = u + at</strong></p>
            <p><strong className="text-foreground">s = ut + ½at²</strong></p>
            <p><strong className="text-foreground">v² = u² + 2as</strong></p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
