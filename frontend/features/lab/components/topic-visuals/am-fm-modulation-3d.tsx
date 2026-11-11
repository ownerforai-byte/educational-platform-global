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

/**
 * AM & FM modulation — carrier, message and modulated waveforms scrolling
 * side by side. NEB Class 12 Communication: "Modulation — amplitude
 * modulation and frequency modulation".
 */
export function AMFMModulationVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const vizTargetRef = useRef<VizTarget>({});
  const [kind, setKind] = useState<"AM" | "FM">("AM");
  const [msgFreq, setMsgFreq] = useState(1);
  const [carrierFreq, setCarrierFreq] = useState(5);
  const [modIndex, setModIndex] = useState(0.6);
  const [isWebGL] = useState(() => isWebGLAvailable());
  const [animating, setAnimating] = useState(true);
  const [speed, setSpeed] = useState(1);
  const speedRef = useRef(1);
  speedRef.current = speed;
  const [showLabels, setShowLabels] = useState(true);
  const [runId, setRunId] = useState(0);

  const devFreq = modIndex * msgFreq;
  const bandwidth = kind === "AM" ? 2 * msgFreq : 2 * (devFreq + msgFreq);
  const DEFAULTS = { kind: "AM" as const, msgFreq: 1, carrierFreq: 5, modIndex: 0.6 };
  const presets: ScenePreset[] = [
    { name: "AM — clean envelope", hint: "Modulation index < 1 — the envelope follows the message.", apply: () => { setKind("AM"); setMsgFreq(1); setCarrierFreq(5); setModIndex(0.6); setRunId((r) => r + 1); } },
    { name: "AM — over-modulation", hint: "m > 1 — the envelope distorts (information is lost).", apply: () => { setKind("AM"); setMsgFreq(1); setCarrierFreq(5); setModIndex(1.2); setRunId((r) => r + 1); } },
    { name: "FM — wide deviation", hint: "Big β — the carrier frequency swings widely.", apply: () => { setKind("FM"); setMsgFreq(1); setCarrierFreq(5); setModIndex(3); setRunId((r) => r + 1); } },
    { name: "FM — narrow deviation", hint: "Small β — subtle frequency wiggle.", apply: () => { setKind("FM"); setMsgFreq(1); setCarrierFreq(5); setModIndex(0.5); setRunId((r) => r + 1); } },
  ];

  const resetAll = () => {
    setKind(DEFAULTS.kind);
    setMsgFreq(DEFAULTS.msgFreq);
    setCarrierFreq(DEFAULTS.carrierFreq);
    setModIndex(DEFAULTS.modIndex);
    setSpeed(1);
    setShowLabels(true);
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
    let t = 0;

    const mkSprite = (text: string, color: string, pos: THREE.Vector3, scale = 1.0): THREE.Sprite => {
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
    };

    const init = async () => {
      const { OrbitControls } = await import("three/addons/controls/OrbitControls.js");

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0f172a);
      camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
      camera.position.set(0, 0.5, 10);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.minDistance = 4;
      controls.maxDistance = 20;
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
      const addLabel = (s: THREE.Sprite): THREE.Sprite => { s.visible = showLabels; push(s); labelSprites.push(s); return s; };

      // Three scrolling waveform lines.
      const mkWave = (y: number, color: number, label: string): THREE.Line => {
        const geom = new THREE.BufferGeometry();
        geom.setAttribute("position", new THREE.BufferAttribute(new Float32Array(240 * 3), 3));
        const line = new THREE.Line(geom, new THREE.LineBasicMaterial({ color }));
        line.position.set(0, y, 0);
        push(line);
        addLabel(mkSprite(label, "#" + color.toString(16).padStart(6, "0"), new THREE.Vector3(-4.8, y + 1.1, 0), 0.45));
        return line;
      };
      const carrierLine = mkWave(2.2, 0x22d3ee, "Carrier");
      const msgLine = mkWave(0, 0x4ade80, "Message");
      const modLine = mkWave(-2.2, 0xfacc15, kind === "AM" ? "AM wave" : "FM wave");

      // Scrolling waveforms: x = -4..4, phase advances with time.
      let last = performance.now();
      const loop = () => {
        frameId = requestAnimationFrame(loop);
        const now = performance.now();
        const dt = Math.min((now - last) / 1000, 0.05) * speedRef.current;
        last = now;
        if (animating) t += dt;
        controls.update();

        const n = 239;
        const setWave = (line: THREE.Line, fn: (tt: number) => number) => {
          const arr = line.geometry.attributes.position as THREE.BufferAttribute;
          for (let k = 0; k <= n; k++) {
            const x = -4 + (k / n) * 8;
            arr.setXYZ(k, x, fn(t + (k / n) * 2.5), 0);
          }
          arr.needsUpdate = true;
        };
        setWave(carrierLine, (tt) => Math.sin(2 * Math.PI * carrierFreq * tt) * 1.1);
        setWave(msgLine, (tt) => Math.sin(2 * Math.PI * msgFreq * tt) * 1.1);
        if (kind === "AM") {
          setWave(modLine, (tt) => {
            const msg = Math.sin(2 * Math.PI * msgFreq * tt);
            return (1 + modIndex * msg) * Math.sin(2 * Math.PI * carrierFreq * tt) * 1.1;
          });
        } else {
          setWave(modLine, (tt) => {
            const msg = Math.sin(2 * Math.PI * msgFreq * tt);
            return Math.sin(2 * Math.PI * carrierFreq * tt + modIndex * msg) * 1.1;
          });
        }

        renderer.render(scene, camera);
      };
      loop();
    };
    init();
    return () => {
      cancelAnimationFrame(frameId);
      meshes.forEach((m) => {
        m.traverse((o: any) => {
          if (o.geometry) o.geometry.dispose();
          if (o.material) {
            if (Array.isArray(o.material)) o.material.forEach((mm: any) => mm.dispose());
            else o.material.dispose();
          }
        });
      });
      renderer?.dispose();
      if (renderer?.domElement?.parentElement === container) container.removeChild(renderer.domElement);
      controls?.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runId, isWebGL, kind, msgFreq, carrierFreq, modIndex, animating, showLabels]);

  if (!isWebGL) {
    return (
      <WebGLFallback
        title="AM & FM Modulation"
        description="Carrier, message and modulated waveforms — see the envelope (AM) and frequency swing (FM)."
      />
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>AM & FM Modulation — Waveform Lab</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate · Scroll to zoom</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Modulation Parameters">
          <div className="flex flex-wrap gap-4 mt-2">
            <div className="w-28">
              <Label className="text-xs text-muted-foreground">Message f_m:</Label>
              <Input type="range" min={0.2} max={2} step={0.1} value={msgFreq} onChange={(e) => setMsgFreq(Number(e.target.value))} className="mt-1 w-full" />
              <p className="text-xs font-mono text-primary mt-1">{msgFreq.toFixed(1)} Hz</p>
            </div>
            <div className="w-28">
              <Label className="text-xs text-muted-foreground">Carrier f_c:</Label>
              <Input type="range" min={2} max={8} step={0.5} value={carrierFreq} onChange={(e) => setCarrierFreq(Number(e.target.value))} className="mt-1 w-full" />
              <p className="text-xs font-mono text-primary mt-1">{carrierFreq.toFixed(1)} Hz</p>
            </div>
            <div className="w-28">
              <Label className="text-xs text-muted-foreground">Index m / β:</Label>
              <Input type="range" min={0} max={3} step={0.1} value={modIndex} onChange={(e) => setModIndex(Number(e.target.value))} className="mt-1 w-full" />
              <p className="text-xs font-mono text-primary mt-1">{modIndex.toFixed(1)}</p>
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
              onClick={() => setKind((k) => (k === "AM" ? "FM" : "AM"))}
              className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${kind === "AM" ? "border-yellow-500/50 bg-yellow-500/10 text-yellow-400" : "border-cyan-500/50 bg-cyan-500/10 text-cyan-400"}`}
            >
              {kind === "AM" ? "AM (amplitude)" : "FM (frequency)"}
            </button>
            <button
              onClick={() => setShowLabels((v) => !v)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${showLabels ? "border-primary/50 bg-primary/10 text-primary" : "border-border bg-muted/40 text-muted-foreground"}`}
            >
              Labels
            </button>
          </div>
        </div>

        <ScenePresets presets={presets} />

        <div ref={containerRef} className="relative h-[clamp(320px,60vh,640px)] w-full overflow-hidden rounded-lg border border-border bg-slate-900">
          <VizToolbar targetRef={vizTargetRef} />
        </div>

        <ReadoutGrid
          items={[
            { label: "Modulation index", value: modIndex.toFixed(1), unit: kind === "AM" ? "m" : "β", highlight: true },
            { label: "Frequency deviation Δf", value: devFreq.toFixed(1), unit: "Hz" },
            { label: "Bandwidth", value: bandwidth.toFixed(1), unit: "Hz" },
            { label: "Scheme", value: kind },
          ]}
        />

        <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-yellow-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Why modulate:</strong> audio signals (~kHz) cannot travel far — they are impressed on a high-frequency carrier.</p>
            <p><strong className="text-foreground">AM:</strong> s(t) = (1 + m·sin ω_m t)·sin ω_c t — the envelope carries the message; bandwidth = 2f_m.</p>
            <p><strong className="text-foreground">FM:</strong> s(t) = sin(ω_c t + β·sin ω_m t) — the frequency swings by Δf = β·f_m; bandwidth ≈ 2(Δf + f_m) (Carson's rule).</p>
            <p><strong className="text-foreground">AM vs FM:</strong> FM is more noise-immune and uses more bandwidth.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
