"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallback } from "@/components/lab/webgl-fallback";
import { VizToolbar, type VizTarget } from "@/components/viz/viz-toolbar";
import {
  ScenePresets,
  PlaybackBar,
  ReadoutGrid,
  type ScenePreset,
} from "@/components/lab/scene-interactivity";
import * as THREE from "three";
import { LiveLeaderLine } from "@/components/lab/leader-lines-3d";

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

export function ProjectileMotionVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const vizTargetRef = useRef<VizTarget>({});
  const [angle, setAngle] = useState(45);
  const [velocity, setVelocity] = useState(20);
  const [isWebGL] = useState(() => isWebGLAvailable());
  const [animating, setAnimating] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [showPath, setShowPath] = useState(true);
  const [showTrail, setShowTrail] = useState(true);
  const [runId, setRunId] = useState(0);
  // Speed lives in a ref so changing it never tears down the WebGL scene.
  const speedRef = useRef(1);
  speedRef.current = speed;

  const g = 9.8;
  const rad = (angle * Math.PI) / 180;
  const flightTime = (2 * velocity * Math.sin(rad)) / g;
  const maxHeight = (velocity * Math.sin(rad)) ** 2 / (2 * g);
  const range = (velocity ** 2 * Math.sin(2 * rad)) / g;

  const DEFAULTS = { angle: 45, velocity: 20 };
  const presets: ScenePreset[] = [
    {
      name: "Max range (45°)",
      hint: "Equal split of speed — the farthest throw with no air resistance.",
      apply: () => { setAngle(45); setVelocity(20); setRunId((r) => r + 1); },
    },
    {
      name: "Shallow (30°)",
      hint: "Fast, flat drive — shorter hang time, less height.",
      apply: () => { setAngle(30); setVelocity(25); setRunId((r) => r + 1); },
    },
    {
      name: "Steep (60°)",
      hint: "High lob — same range as 30° at equal speed (complementary angles).",
      apply: () => { setAngle(60); setVelocity(25); setRunId((r) => r + 1); },
    },
    {
      name: "Moon-like (low v₀)",
      hint: "Slow launch — a gentle, easily-traced arc.",
      apply: () => { setAngle(50); setVelocity(8); setRunId((r) => r + 1); },
    },
  ];

  const resetAll = () => {
    setAngle(DEFAULTS.angle);
    setVelocity(DEFAULTS.velocity);
    setSpeed(1);
    setShowPath(true);
    setShowTrail(true);
    setAnimating(true);
    setRunId((r) => r + 1);
  };


  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isWebGL) return;

    let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer;
    let controls: any, frameId: number;
    const meshes: THREE.Object3D[] = [];
    const labelSprites: THREE.Sprite[] = [];
    let launchTime = 0;
    const g = 9.8;
    const tMax = (2 * velocity * Math.sin(angle * Math.PI / 180)) / g;

    const init = async () => {
      const { OrbitControls } = await import("three/addons/controls/OrbitControls.js");

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0f172a);
      camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
      camera.position.set(-5, 6, 12);
      camera.lookAt(5, 2, 0);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.autoRotate = false;
      controls.minDistance = 5;
      controls.maxDistance = 30;
      vizTargetRef.current = {
        controls,
        el: container,
        canvasEl: renderer.domElement,
        setLabels: (on: boolean) => labelSprites.forEach((s) => (s.visible = on)),
      };

      scene.add(new THREE.AmbientLight(0xffffff, 0.7));
      const dir = new THREE.DirectionalLight(0xffffff, 1.0);
      dir.position.set(5, 10, 5);
      scene.add(dir);

      const push = <T extends THREE.Object3D>(o: T): T => { scene.add(o); meshes.push(o); return o; };
      const addLabel = (s: THREE.Sprite): THREE.Sprite => { push(s); labelSprites.push(s); return s; };

      // Ground
      push(new THREE.GridHelper(30, 30, 0x334155, 0x1e293b));
      const ground = push(new THREE.Mesh(
        new THREE.PlaneGeometry(30, 6),
        new THREE.MeshBasicMaterial({ color: 0x1e293b }),
      ));
      ground.rotation.x = -Math.PI / 2;
      ground.position.set(5, -0.01, 0);

      // Trajectory path (static)
      const pts: THREE.Vector3[] = [];
      for (let t = 0; t <= tMax; t += 0.02) {
        const x = velocity * Math.cos(angle * Math.PI / 180) * t;
        const y = velocity * Math.sin(angle * Math.PI / 180) * t - 0.5 * g * t * t;
        pts.push(new THREE.Vector3(x * 0.5, y * 0.15, 0));
      }
      const pathLine = push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: 0x64748b, transparent: true, opacity: 0.4 }))) as THREE.Line;
      pathLine.visible = showPath;

      // Angle arc at origin
      const arcPts: THREE.Vector3[] = [];
      for (let a = 0; a <= angle * Math.PI / 180; a += 0.05) {
        arcPts.push(new THREE.Vector3(1.5 * Math.cos(a), 1.5 * Math.sin(a), 0));
      }
      push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(arcPts), new THREE.LineBasicMaterial({ color: 0xfbbf24 })));
      addLabel(mkSprite(`θ = ${angle}°`, "#fbbf24", new THREE.Vector3(2.2, 0.8, 0), 0.7));

      // Initial velocity arrow
      const vDir = new THREE.Vector3(Math.cos(angle * Math.PI / 180), Math.sin(angle * Math.PI / 180), 0).normalize();
      push(new LiveLeaderLine(vDir, new THREE.Vector3(0, 0, 0), 3, 0x22d3ee, 0.2, 0.1));
      addLabel(mkSprite("v₀", "#22d3ee", new THREE.Vector3(1.8, 2.2, 0), 0.8));

      // g arrow (pointing down)
      push(new LiveLeaderLine(new THREE.Vector3(0, -1, 0), new THREE.Vector3(0, 0, 0), 2.5, 0xef4444, 0.2, 0.1));
      addLabel(mkSprite("g (acceleration)", "#ef4444", new THREE.Vector3(-2.5, -1.0, 0), 0.7));

      // Max height label with long arrow
      const hMax = (velocity * Math.sin(angle * Math.PI / 180)) ** 2 / (2 * g);
      const hPt = new THREE.Vector3(
        velocity * Math.cos(angle * Math.PI / 180) * (tMax / 2) * 0.5,
        hMax * 0.15,
        0
      );
      const hLabelPos = new THREE.Vector3(hPt.x + 3, hPt.y + 2, 0);
      const hDir = hPt.clone().sub(hLabelPos).normalize();
      push(new LiveLeaderLine(hDir, hLabelPos, hLabelPos.distanceTo(hPt) * 0.9, 0xa78bfa, 0.15, 0.1));
      addLabel(mkSprite(`H_max = ${hMax.toFixed(1)} m`, "#a78bfa", hLabelPos.clone().sub(hDir.multiplyScalar(0.5)), 0.75));

      // Range label with long arrow
      const R = (velocity ** 2 * Math.sin(2 * angle * Math.PI / 180)) / g;
      const rPt = new THREE.Vector3(R * 0.5, 0, 0);
      const rLabelPos = new THREE.Vector3(rPt.x, -1.5, 0);
      const rDir = rPt.clone().sub(rLabelPos).normalize();
      push(new LiveLeaderLine(rDir, rLabelPos, rLabelPos.distanceTo(rPt) * 0.9, 0x34d399, 0.15, 0.1));
      addLabel(mkSprite(`Range = ${R.toFixed(1)} m`, "#34d399", rLabelPos.clone().sub(rDir.multiplyScalar(0.5)), 0.75));

      // Ball mesh
      const ball = push(new THREE.Mesh(
        new THREE.SphereGeometry(0.2, 16, 16),
        new THREE.MeshBasicMaterial({ color: 0xf97316 }),
      )) as THREE.Mesh;

      // Trail points
      const trailPts: THREE.Vector3[] = [];
      const trailLine = push(new THREE.Line(
        new THREE.BufferGeometry(),
        new THREE.LineBasicMaterial({ color: 0xf97316 }),
      )) as THREE.Line;
      trailLine.visible = showTrail;

      const prevPos = new THREE.Vector3(0, 0, 0);
      update();

      function update() {
        while (meshes.length > 60) {
          const m = meshes.pop()!;
          scene.remove(m);
          if (m instanceof THREE.Mesh) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Line) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Sprite) { (m.material as THREE.SpriteMaterial).map?.dispose?.(); m.material.dispose(); }
          else if (m instanceof THREE.ArrowHelper) m.dispose();
        }
      }

      const animate = () => {
        frameId = requestAnimationFrame(animate);
        controls.update();
        if (animating) {
          launchTime += 0.016 * speedRef.current;
          const t = Math.min(launchTime, tMax);
          const x = velocity * Math.cos(angle * Math.PI / 180) * t;
          const y = velocity * Math.sin(angle * Math.PI / 180) * t - 0.5 * g * t * t;
          ball.position.set(x * 0.5, Math.max(y * 0.15, 0), 0);

          if (showTrail) {
            trailPts.push(new THREE.Vector3(x * 0.5, Math.max(y * 0.15, 0), 0));
            if (trailPts.length > 200) trailPts.shift();
            (trailLine.geometry as THREE.BufferGeometry).setFromPoints(trailPts);
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
          else if (m instanceof THREE.ArrowHelper) m.dispose();
        });
        renderer.dispose();
        controls.dispose?.();
      };
    };

    const cleanup = init();
    return () => { cleanup.then((d) => d?.()); };
  }, [angle, velocity, animating, isWebGL, runId, showPath, showTrail]);

  if (!isWebGL) {
    return <WebGLFallback title="Projectile Motion" description="Animated trajectory with velocity/acceleration arrows." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Projectile Motion — Trajectory & Arrows</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate · Scroll to zoom</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Launch Parameters">
          <div className="flex flex-wrap gap-4 mt-2">
            <div className="w-24">
              <Label className="text-xs text-muted-foreground">Angle θ (°):</Label>
              <Input type="range" min={10} max={80} step={1} value={angle} onChange={(e) => setAngle(Number(e.target.value))} className="mt-1 w-full" />
              <p className="text-xs font-mono text-primary mt-1">{angle}°</p>
            </div>
            <div className="w-24">
              <Label className="text-xs text-muted-foreground">Velocity v₀ (m/s):</Label>
              <Input type="range" min={5} max={50} step={1} value={velocity} onChange={(e) => setVelocity(Number(e.target.value))} className="mt-1 w-full" />
              <p className="text-xs font-mono text-primary mt-1">{velocity} m/s</p>
            </div>
          </div>
        </CollapsibleControls>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <PlaybackBar
            playing={animating}
            onPlayToggle={() => setAnimating(!animating)}
            speed={speed}
            onSpeedChange={setSpeed}
            onReset={resetAll}
          />
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowPath((v) => !v)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${showPath ? "border-primary/50 bg-primary/10 text-primary" : "border-border bg-muted/40 text-muted-foreground"}`}
            >
              Path
            </button>
            <button
              onClick={() => setShowTrail((v) => !v)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${showTrail ? "border-orange-500/50 bg-orange-500/10 text-orange-400" : "border-border bg-muted/40 text-muted-foreground"}`}
            >
              Trail
            </button>
          </div>
        </div>

        <ScenePresets presets={presets} />

        <div ref={containerRef} className="relative h-[clamp(320px,60vh,640px)] w-full overflow-hidden rounded-lg border border-border bg-slate-900">
          <VizToolbar targetRef={vizTargetRef} />
        </div>

        <ReadoutGrid
          items={[
            { label: "Max height H", value: maxHeight.toFixed(1), unit: "m" },
            { label: "Range R", value: range.toFixed(1), unit: "m", highlight: Math.abs(angle - 45) < 1 },
            { label: "Time of flight", value: flightTime.toFixed(2), unit: "s" },
            { label: "Launch angle θ", value: angle, unit: "°" },
          ]}
        />

        <div className="rounded-lg border border-orange-500/30 bg-orange-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-orange-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Horizontal motion:</strong> Constant velocity — no air resistance assumed.</p>
            <p><strong className="text-foreground">Vertical motion:</strong> Uniform acceleration downward due to gravity (g = 9.8 m/s²).</p>
            <p><strong className="text-foreground">Max height:</strong> H = v₀²sin²θ / (2g)</p>
            <p><strong className="text-foreground">Range:</strong> R = v₀²sin(2θ) / g — maximum at θ = 45°</p>
            <p><strong className="text-foreground">Trajectory:</strong> Parabolic path — y = x tanθ − gx²/(2v₀²cos²θ)</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
