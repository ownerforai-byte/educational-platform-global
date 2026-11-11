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

type OpticMode = "concave-mirror" | "convex-mirror" | "convex-lens" | "concave-lens";

export function OpticsVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const vizTargetRef = useRef<VizTarget>({});
  const [mode, setMode] = useState<OpticMode>("concave-mirror");
  const [focalLen, setFocalLen] = useState(3);
  const [objDist, setObjDist] = useState(6);
  const [isWebGL] = useState(() => isWebGLAvailable());
  const [animating, setAnimating] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [showLabels, setShowLabels] = useState(true);
  const [showImage, setShowImage] = useState(true);
  const [runId, setRunId] = useState(0);
  // Speed/animation live in refs so toggling never tears down the WebGL scene.
  const speedRef = useRef(1);
  speedRef.current = speed;
  const animatingRef = useRef(true);
  animatingRef.current = animating;

  // Mirror/lens equation readouts (same sign convention as the 3D scene)
  const isMirror = mode.includes("mirror");
  const isConvex = mode.includes("convex");
  const fSign = (isMirror && !isConvex) || (!isMirror && isConvex) ? -1 : 1;
  const effectiveF = fSign * focalLen;
  const vImg = isMirror
    ? (objDist * effectiveF) / (objDist - effectiveF)
    : (objDist * effectiveF) / (objDist + effectiveF);
  const magVal = Number.isFinite(vImg) ? Math.abs(vImg / objDist) : Infinity;
  const imageNature = !Number.isFinite(vImg)
    ? "At infinity"
    : vImg < 0
      ? "Virtual, erect"
      : "Real, inverted";

  const presets: ScenePreset[] = [
    {
      name: "Object at C",
      hint: "Concave mirror, u = 2f — image forms at C, same size, real.",
      apply: () => { setMode("concave-mirror"); setFocalLen(3); setObjDist(6); setRunId((r) => r + 1); },
    },
    {
      name: "Beyond C",
      hint: "Concave mirror, u > 2f — diminished real image between F and C.",
      apply: () => { setMode("concave-mirror"); setFocalLen(3); setObjDist(9); setRunId((r) => r + 1); },
    },
    {
      name: "Inside F (virtual)",
      hint: "Concave mirror, u < f — enlarged virtual image behind the mirror.",
      apply: () => { setMode("concave-mirror"); setFocalLen(3); setObjDist(2); setRunId((r) => r + 1); },
    },
    {
      name: "Convex lens at 2f",
      hint: "Converging lens, u = 2f — real, inverted, same-size image at 2f.",
      apply: () => { setMode("convex-lens"); setFocalLen(3); setObjDist(6); setRunId((r) => r + 1); },
    },
    {
      name: "Convex mirror",
      hint: "Diverging mirror — always virtual, erect and diminished.",
      apply: () => { setMode("convex-mirror"); setFocalLen(3); setObjDist(6); setRunId((r) => r + 1); },
    },
  ];

  const resetAll = () => {
    setMode("concave-mirror");
    setFocalLen(3);
    setObjDist(6);
    setSpeed(1);
    setShowLabels(true);
    setShowImage(true);
    setAnimating(true);
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
    let pulseDot: THREE.Mesh;
    let imgArrow: THREE.Object3D | null = null;
    let imgSprite: THREE.Sprite | null = null;

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
      vizTargetRef.current = {
        controls,
        el: container,
        canvasEl: renderer.domElement,
        setLabels: (on: boolean) => labelSprites.forEach((s) => (s.visible = on)),
      };

      scene.add(new THREE.AmbientLight(0xffffff, 0.7));
      const dir = new THREE.DirectionalLight(0xffffff, 1.0);
      dir.position.set(0, 10, 5);
      scene.add(dir);

      const push = <T extends THREE.Object3D>(o: T): T => { scene.add(o); meshes.push(o); return o; };
      const addLabel = (s: THREE.Sprite): THREE.Sprite => {
        push(s);
        labelSprites.push(s);
        s.visible = showLabels;
        return s;
      };

      const f = focalLen;
      const u = objDist;
      const isMirror = mode.includes("mirror");
      const isConvex = mode.includes("convex");
      const sign = (isMirror && !isConvex) || (!isMirror && isConvex) ? -1 : 1;
      const effectiveF = sign * f;

      // Principal axis
      push(new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-10, 0, 0), new THREE.Vector3(10, 0, 0)]),
        new THREE.LineBasicMaterial({ color: 0x475569 }),
      ));

      // Mirror/Lens surface
      if (isMirror) {
        const mirrorShape = isConvex
          ? new THREE.SphereGeometry(f * 2, 32, 16, 0, Math.PI * 0.3, 0, Math.PI * 0.5)
          : new THREE.SphereGeometry(f * 2, 32, 16, Math.PI * 0.7, Math.PI * 0.3, 0, Math.PI * 0.5);
        const mirror = push(new THREE.Mesh(mirrorShape, new THREE.MeshBasicMaterial({
          color: 0x94a3b8,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.6,
        }))) as THREE.Mesh;
        mirror.position.set(0, 0, 0);
        if (!isConvex) mirror.rotation.y = Math.PI;
      } else {
        // Lens shape
        const lensShape = new THREE.CylinderGeometry(f * 1.5, f * 1.5, 0.3, 32);
        const lens = push(new THREE.Mesh(lensShape, new THREE.MeshBasicMaterial({
          color: 0x22d3ee,
          transparent: true,
          opacity: 0.3,
        }))) as THREE.Mesh;
        lens.rotation.z = Math.PI / 2;
        lens.position.set(0, 0, 0);
      }

      // Focal point markers
      const F1 = push(new THREE.Mesh(new THREE.SphereGeometry(0.15, 8, 8), new THREE.MeshBasicMaterial({ color: 0xef4444 })));
      F1.position.set(effectiveF, 0, 0);
      const F2 = push(new THREE.Mesh(new THREE.SphereGeometry(0.15, 8, 8), new THREE.MeshBasicMaterial({ color: 0x3b82f6 })));
      F2.position.set(-effectiveF, 0, 0);
      addLabel(mkSprite("F", "#ef4444", new THREE.Vector3(effectiveF, 0.8, 0), 0.7));
      addLabel(mkSprite("F'", "#3b82f6", new THREE.Vector3(-effectiveF, 0.8, 0), 0.7));

      // Center of curvature
      const C = push(new THREE.Mesh(new THREE.SphereGeometry(0.15, 8, 8), new THREE.MeshBasicMaterial({ color: 0xfbbf24 })));
      C.position.set(2 * effectiveF, 0, 0);
      addLabel(mkSprite("C", "#fbbf24", new THREE.Vector3(2 * effectiveF, 0.8, 0), 0.7));

      // Pole
      const P = push(new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 8), new THREE.MeshBasicMaterial({ color: 0xffffff })));
      P.position.set(0, 0, 0);
      addLabel(mkSprite("P", "#ffffff", new THREE.Vector3(0, -0.8, 0), 0.6));

      // Object arrow
      const objH = 1.5;
      const objX = -u;
      push(new LiveLeaderLine(
        new THREE.Vector3(0, 1, 0),
        new THREE.Vector3(objX, 0, 0),
        objH,
        0x22d3ee,
        0.15,
        0.08,
      ));
      pulseDot = push(new THREE.Mesh(
        new THREE.SphereGeometry(0.15, 12, 12),
        new THREE.MeshBasicMaterial({ color: 0xfbbf24 }),
      )) as THREE.Mesh;
      pulseDot.position.set(objX, objH / 2, 0);
      addLabel(mkSprite("Object", "#22d3ee", new THREE.Vector3(objX, objH + 0.5, 0), 0.7));

      // Image calculation: 1/v - 1/u = 1/f (mirror sign convention)
      let v: number;
      if (isMirror) {
        v = (u * effectiveF) / (u - effectiveF);
      } else {
        v = (u * effectiveF) / (u + effectiveF);
      }
      const mag = Math.abs(v / u);
      const imgH = objH * mag;

      // Image arrow
      const imgX = isMirror ? v : -v;
      const imgColor = v < 0 ? 0x34d399 : 0xf97316;
      imgArrow = push(new LiveLeaderLine(
        new THREE.Vector3(0, 1, 0),
        new THREE.Vector3(imgX, 0, 0),
        imgH,
        imgColor,
        0.15,
        0.08,
      ));
      imgArrow.visible = showImage;
      imgSprite = push(mkSprite("Image", "#22c55e", new THREE.Vector3(imgX, imgH + 0.5, 0), 0.7)) as THREE.Sprite;
      imgSprite.visible = showImage;

      // Long arrow labels
      const uLabelPos = new THREE.Vector3(objX / 2, -2, 0);
      const uTarget = new THREE.Vector3(objX, 0, 0);
      const uDir = uTarget.clone().sub(uLabelPos).normalize();
      push(new LiveLeaderLine(uDir, uLabelPos, uLabelPos.distanceTo(uTarget) * 0.9, 0xfbbf24, 0.15, 0.1));
      addLabel(mkSprite(`u = ${u} (object distance)`, "#fbbf24", uLabelPos.clone().sub(uDir.multiplyScalar(0.5)), 0.7));

      const vLabelPos = new THREE.Vector3(imgX / 2, -2, 0);
      const vTarget = new THREE.Vector3(imgX, 0, 0);
      const vDir = vTarget.clone().sub(vLabelPos).normalize();
      push(new LiveLeaderLine(vDir, vLabelPos, vLabelPos.distanceTo(vTarget) * 0.9, 0xa78bfa, 0.15, 0.1));
      addLabel(mkSprite(`v = ${v.toFixed(1)} (image distance)`, "#a78bfa", vLabelPos.clone().sub(vDir.multiplyScalar(0.5)), 0.7));

      // Focal length label
      const fLabelPos = new THREE.Vector3(effectiveF / 2, 2.5, 0);
      const fTarget = new THREE.Vector3(effectiveF, 0, 0);
      const fDir = fTarget.clone().sub(fLabelPos).normalize();
      push(new LiveLeaderLine(fDir, fLabelPos, fLabelPos.distanceTo(fTarget) * 0.9, 0xef4444, 0.15, 0.1));
      addLabel(mkSprite(`f = ${effectiveF} (focal length)`, "#ef4444", fLabelPos.clone().sub(fDir.multiplyScalar(0.5)), 0.7));

      // Magnification label
      const magLabelPos = new THREE.Vector3(-6, 3, 0);
      const magTarget = new THREE.Vector3(0, 0, 0);
      const magDir = magTarget.clone().sub(magLabelPos).normalize();
      push(new LiveLeaderLine(magDir, magLabelPos, magLabelPos.distanceTo(magTarget) * 0.9, 0x34d399, 0.15, 0.1));
      addLabel(mkSprite(`m = ${mag.toFixed(2)}${v < 0 ? " (virtual)" : " (real)"}`, "#34d399", magLabelPos.clone().sub(magDir.multiplyScalar(0.5)), 0.7));

      const update = () => {
        while (meshes.length > 40) {
          const m = meshes.pop()!;
          scene.remove(m);
          if (m instanceof THREE.Mesh) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Line) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Sprite) { (m.material as THREE.SpriteMaterial).map?.dispose?.(); m.material.dispose(); }
          else if (m instanceof THREE.ArrowHelper) m.dispose();
        }
      };
      update();

      const animate = () => {
        frameId = requestAnimationFrame(animate);
        controls.update();
        if (animatingRef.current) {
          animTime += 0.03 * speedRef.current;
        }
        if (pulseDot) {
          const t = (animTime * 0.4) % 1;
          pulseDot.position.x = -10 + t * 20;
          pulseDot.position.y = Math.sin(t * Math.PI * 4) * 2;
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
  }, [mode, focalLen, objDist, isWebGL, runId, showLabels, showImage]);

  if (!isWebGL) {
    return <WebGLFallback title="Optics" description="Ray diagrams for mirrors and lenses with angle labels." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Ray Optics — Mirrors & Lenses</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate · Scroll to zoom</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Optical Element">
          <div className="flex flex-wrap gap-2 mt-1">
            {([
              ["concave-mirror", "Concave Mirror"],
              ["convex-mirror", "Convex Mirror"],
              ["convex-lens", "Convex Lens"],
              ["concave-lens", "Concave Lens"],
            ] as const).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setMode(key)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  mode === key ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </CollapsibleControls>

        <CollapsibleControls label="Parameters">
          <div className="flex flex-wrap gap-4 mt-2">
            <div className="w-28">
              <Label className="text-xs text-muted-foreground">Focal length f:</Label>
              <Input type="range" min={1} max={5} step={0.5} value={focalLen} onChange={(e) => setFocalLen(Number(e.target.value))} className="mt-1 w-full" />
              <p className="text-xs font-mono text-primary mt-1">{focalLen}</p>
            </div>
            <div className="w-28">
              <Label className="text-xs text-muted-foreground">Object distance u:</Label>
              <Input type="range" min={2} max={10} step={0.5} value={objDist} onChange={(e) => setObjDist(Number(e.target.value))} className="mt-1 w-full" />
              <p className="text-xs font-mono text-primary mt-1">{objDist}</p>
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
              onClick={() => setShowLabels((v) => !v)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${showLabels ? "border-primary/50 bg-primary/10 text-primary" : "border-border bg-muted/40 text-muted-foreground"}`}
            >
              Labels
            </button>
            <button
              onClick={() => setShowImage((v) => !v)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${showImage ? "border-green-500/50 bg-green-500/10 text-green-400" : "border-border bg-muted/40 text-muted-foreground"}`}
            >
              Image
            </button>
          </div>
        </div>

        <ScenePresets presets={presets} />

        <div ref={containerRef} className="relative h-[clamp(320px,60vh,640px)] w-full overflow-hidden rounded-lg border border-border bg-slate-900">
          <VizToolbar targetRef={vizTargetRef} />
        </div>

        <ReadoutGrid
          items={[
            { label: "Focal length f", value: effectiveF },
            { label: "Image distance v", value: Number.isFinite(vImg) ? vImg.toFixed(1) : "∞" },
            { label: "Magnification m", value: Number.isFinite(magVal) ? magVal.toFixed(2) : "∞", highlight: Number.isFinite(magVal) && magVal > 1 },
            { label: "Image nature", value: imageNature },
          ]}
        />

        <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-cyan-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Mirror/Lens Formula:</strong> 1/v − 1/u = 1/f (sign convention applies)</p>
            <p><strong className="text-foreground">Magnification:</strong> m = v/u = hᵢ/hₒ — negative means inverted image.</p>
            <p><strong className="text-foreground">Real image:</strong> Formed when rays actually converge — can be projected.</p>
            <p><strong className="text-foreground">Virtual image:</strong> Formed when rays appear to diverge — seen in mirror.</p>
            <p><strong className="text-foreground">Snell's Law:</strong> n₁sinθ₁ = n₂sinθ₂ — governs refraction at surfaces.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
