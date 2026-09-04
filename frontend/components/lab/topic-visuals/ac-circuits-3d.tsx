"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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

export function ACcircuitsVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [frequency, setFrequency] = useState(1);
  const [voltage, setVoltage] = useState(10);
  const [component, setComponent] = useState<"resistor" | "inductor" | "capacitor">("resistor");
  const [isWebGL] = useState(() => isWebGLAvailable());


  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isWebGL) return;

    let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer;
    let controls: any, frameId: number;
    const meshes: THREE.Object3D[] = [];
    let time = 0;

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

      scene.add(new THREE.AmbientLight(0xffffff, 0.7));

      const push = <T extends THREE.Object3D>(o: T): T => { scene.add(o); meshes.push(o); return o; };

      // Axes
      push(new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-10, 0, 0), new THREE.Vector3(10, 0, 0)]),
        new THREE.LineBasicMaterial({ color: 0xef4444 }),
      ));
      push(new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, -10, 0), new THREE.Vector3(0, 10, 0)]),
        new THREE.LineBasicMaterial({ color: 0x22c55e }),
      ));
      push(mkSprite("t (time)", "#ef4444", new THREE.Vector3(9.5, 0, 0), 0.6));
      push(mkSprite("V", "#22c55e", new THREE.Vector3(0, 9.5, 0), 0.6));

      // Grid lines
      for (let i = -9; i <= 9; i++) {
        if (i === 0) continue;
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(i, -10, 0), new THREE.Vector3(i, 10, 0)]), new THREE.LineBasicMaterial({ color: 0x1e293b })));
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-10, i, 0), new THREE.Vector3(10, i, 0)]), new THREE.LineBasicMaterial({ color: 0x1e293b })));
      }

      const omega = 2 * Math.PI * frequency;
      const phaseShift = component === "inductor" ? Math.PI / 2 : component === "capacitor" ? -Math.PI / 2 : 0;
      const color = component === "resistor" ? 0x22d3ee : component === "inductor" ? 0xf97316 : 0xa78bfa;

      // Sinusoidal waveform
      const wavePts: THREE.Vector3[] = [];
      for (let i = 0; i <= 400; i++) {
        const t = -10 + (i / 400) * 20;
        const v = voltage * Math.sin(omega * t + phaseShift);
        wavePts.push(new THREE.Vector3(t, v, 0.02));
      }
      push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(wavePts), new THREE.LineBasicMaterial({ color, linewidth: 2 })));

      // Moving point on wave
      const dot = push(new THREE.Mesh(
        new THREE.SphereGeometry(0.15, 12, 12),
        new THREE.MeshBasicMaterial({ color }),
      )) as THREE.Mesh;

      // Phase relationship labels
      const vLabelPos = new THREE.Vector3(5, voltage + 1.5, 0);
      const vTarget = new THREE.Vector3(5, voltage * Math.sin(omega * 5), 0);
      const vDir = vTarget.clone().sub(vLabelPos).normalize();
      push(new THREE.ArrowHelper(vDir, vLabelPos, vLabelPos.distanceTo(vTarget) * 0.9, 0x22d3ee, 0.15, 0.1));
      push(mkSprite("V = V₀ sin(ωt)", "#22d3ee", vLabelPos.clone().sub(vDir.multiplyScalar(0.5)), 0.8));

      const fLabelPos = new THREE.Vector3(-7, 0, 0);
      const fTarget = new THREE.Vector3(-7, voltage, 0);
      const fDir = fTarget.clone().sub(fLabelPos).normalize();
      push(new THREE.ArrowHelper(fDir, fLabelPos, vLabelPos.distanceTo(fTarget) * 0.9, 0xfbbf24, 0.15, 0.1));
      push(mkSprite(`f = ${frequency} Hz`, "#fbbf24", fLabelPos.clone().sub(fDir.multiplyScalar(0.5)), 0.75));

      const V0LabelPos = new THREE.Vector3(0, voltage + 1, 0);
      const V0Target = new THREE.Vector3(0, voltage, 0);
      const V0Dir = V0Target.clone().sub(V0LabelPos).normalize();
      push(new THREE.ArrowHelper(V0Dir, V0LabelPos, V0LabelPos.distanceTo(V0Target) * 0.9, 0x34d399, 0.15, 0.1));
      push(mkSprite(`V₀ = ${voltage} V (peak)`, "#34d399", V0LabelPos.clone().sub(V0Dir.multiplyScalar(0.5)), 0.75));

      // Phase label
      const phaseText = component === "resistor" ? "V & I in phase" : component === "inductor" ? "V leads I by 90°" : "I leads V by 90°";
      const phaseLabelPos = new THREE.Vector3(-5, -8, 0);
      const phaseTarget = new THREE.Vector3(0, 0, 0);
      const phaseDir = phaseTarget.clone().sub(phaseLabelPos).normalize();
      push(new THREE.ArrowHelper(phaseDir, phaseLabelPos, phaseLabelPos.distanceTo(phaseTarget) * 0.9, 0xef4444, 0.15, 0.1));
      push(mkSprite(phaseText, "#ef4444", phaseLabelPos.clone().sub(phaseDir.multiplyScalar(0.5)), 0.7));

      const update = () => {
        while (meshes.length > 30) {
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
        time += 0.03;
        const t = ((time * frequency) % 4) - 2;
        const v = voltage * Math.sin(omega * t + phaseShift);
        dot.position.set(t, v, 0.05);
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
          else if (m instanceof THREE.ArrowHelper) m.dispose();
        });
        renderer.dispose();
        controls.dispose?.();
      };
    };

    const cleanup = init();
    return () => { cleanup.then((d) => d?.()); };
  }, [frequency, voltage, component, isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="AC Circuits" description="Sinusoidal voltage/current waveforms with phase relationships." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>AC Circuits — Sinusoidal Voltage & Phase</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate · Scroll to zoom</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="AC Component">
          <div className="flex flex-wrap gap-2 mt-1">
            {([
              ["resistor", "Resistor (R)"],
              ["inductor", "Inductor (L)"],
              ["capacitor", "Capacitor (C)"],
            ] as const).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setComponent(key as typeof component)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  component === key ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </CollapsibleControls>

        <CollapsibleControls label="AC Parameters">
          <div className="flex flex-wrap gap-4 mt-2">
            <div className="w-24">
              <Label className="text-xs text-muted-foreground">Frequency f (Hz):</Label>
              <Input type="range" min={0.5} max={5} step={0.5} value={frequency} onChange={(e) => setFrequency(Number(e.target.value))} className="mt-1 w-full" />
              <p className="text-xs font-mono text-primary mt-1">{frequency} Hz</p>
            </div>
            <div className="w-24">
              <Label className="text-xs text-muted-foreground">Peak voltage V₀:</Label>
              <Input type="range" min={2} max={20} step={1} value={voltage} onChange={(e) => setVoltage(Number(e.target.value))} className="mt-1 w-full" />
              <p className="text-xs font-mono text-primary mt-1">{voltage} V</p>
            </div>
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-orange-500/30 bg-orange-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-orange-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">AC voltage:</strong> V = V₀ sin(ωt) where ω = 2πf.</p>
            <p><strong className="text-foreground">RMS values:</strong> V_rms = V₀/√2, I_rms = I₀/√2 — equivalent DC heating effect.</p>
            <p><strong className="text-foreground">Resistor:</strong> V and I are in phase — Z = R.</p>
            <p><strong className="text-foreground">Inductor:</strong> V leads I by 90° — X_L = ωL (inductive reactance).</p>
            <p><strong className="text-foreground">Capacitor:</strong> I leads V by 90° — X_C = 1/(ωC) (capacitive reactance).</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
