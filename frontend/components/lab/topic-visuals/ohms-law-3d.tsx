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

export function OhmsLawVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [resistance, setResistance] = useState(10);
  const [maxVoltage, setMaxVoltage] = useState(12);
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
    let currentDot: THREE.Mesh;

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
        new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(10, 0, 0)]),
        new THREE.LineBasicMaterial({ color: 0xef4444 }),
      ));
      push(new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 10, 0)]),
        new THREE.LineBasicMaterial({ color: 0x22c55e }),
      ));
      push(mkSprite("V (Voltage)", "#ef4444", new THREE.Vector3(9.5, 0, 0), 0.6));
      push(mkSprite("I (Current)", "#22c55e", new THREE.Vector3(0, 9.5, 0), 0.6));

      // Grid
      for (let i = 1; i <= 9; i++) {
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(i, 0, 0), new THREE.Vector3(i, 9, 0)]), new THREE.LineBasicMaterial({ color: 0x1e293b })));
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, i, 0), new THREE.Vector3(10, i, 0)]), new THREE.LineBasicMaterial({ color: 0x1e293b })));
      }

      // Ohm's law line: I = V/R
      const R = resistance;
      const pts: THREE.Vector3[] = [];
      for (let v = 0; v <= maxVoltage; v += 0.1) {
        const i = v / R;
        if (i <= 10) pts.push(new THREE.Vector3(v, i, 0.02));
      }
      push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: 0x22d3ee, linewidth: 2 })));

      // Moving current dot
      currentDot = push(new THREE.Mesh(
        new THREE.SphereGeometry(0.12, 12, 12),
        new THREE.MeshBasicMaterial({ color: 0xf97316 }),
      )) as THREE.Mesh;
      currentDot.position.set(0, 0, 0.05);

      // Data points
      for (let v = 0; v <= maxVoltage; v += 2) {
        const i = v / R;
        const pt = push(new THREE.Mesh(
          new THREE.SphereGeometry(0.1, 8, 8),
          new THREE.MeshBasicMaterial({ color: 0xf97316 }),
        ));
        pt.position.set(v, i, 0.05);
      }

      // Long arrow labels
      const RLabelPos = new THREE.Vector3(6, 7, 0);
      const RTarget = new THREE.Vector3(maxVoltage * 0.6, maxVoltage * 0.6 / R, 0);
      const RDir = RTarget.clone().sub(RLabelPos).normalize();
      push(new THREE.ArrowHelper(RDir, RLabelPos, RLabelPos.distanceTo(RTarget) * 0.9, 0xa78bfa, 0.15, 0.1));
      push(mkSprite(`R = ${R} Ω (slope = 1/R)`, "#a78bfa", RLabelPos.clone().sub(RDir.multiplyScalar(0.5)), 0.8));

      const VLabelPos = new THREE.Vector3(maxVoltage + 1, 0, 0);
      const VTarget = new THREE.Vector3(maxVoltage, 0, 0);
      const VDir = VTarget.clone().sub(VLabelPos).normalize();
      push(new THREE.ArrowHelper(VDir, VLabelPos, VLabelPos.distanceTo(VTarget) * 0.9, 0x34d399, 0.15, 0.1));
      push(mkSprite(`V_max = ${maxVoltage} V`, "#34d399", VLabelPos.clone().sub(VDir.multiplyScalar(0.5)), 0.75));

      const ILabelPos = new THREE.Vector3(0, maxVoltage / R + 1, 0);
      const ITarget = new THREE.Vector3(0, maxVoltage / R, 0);
      const IDir = ITarget.clone().sub(ILabelPos).normalize();
      push(new THREE.ArrowHelper(IDir, ILabelPos, ILabelPos.distanceTo(ITarget) * 0.9, 0xfbbf24, 0.15, 0.1));
      push(mkSprite(`I_max = ${(maxVoltage / R).toFixed(1)} A`, "#fbbf24", ILabelPos.clone().sub(IDir.multiplyScalar(0.5)), 0.75));

      // Linear relationship note
      const noteLabelPos = new THREE.Vector3(-1, -2, 0);
      push(mkSprite("I ∝ V (Ohmic conductor)", "#22d3ee", new THREE.Vector3(5, -1.5, 0), 0.75));

      const update = () => {
        while (meshes.length > 50) {
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
        animTime += 0.025;
        if (currentDot) {
          const t = (animTime * 0.5) % 1;
          currentDot.position.x = t * maxVoltage;
          currentDot.position.y = (t * maxVoltage) / R;
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
  }, [resistance, maxVoltage, isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="Ohm's Law" description="V-I graph showing linear relationship." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Ohm's Law — V-I Characteristic</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate · Scroll to zoom</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Circuit Parameters">
          <div className="flex flex-wrap gap-4 mt-2">
            <div className="w-24">
              <Label className="text-xs text-muted-foreground">Resistance R (Ω):</Label>
              <Input type="range" min={1} max={20} step={1} value={resistance} onChange={(e) => setResistance(Number(e.target.value))} className="mt-1 w-full" />
              <p className="text-xs font-mono text-primary mt-1">{resistance} Ω</p>
            </div>
            <div className="w-24">
              <Label className="text-xs text-muted-foreground">Max V (V):</Label>
              <Input type="range" min={5} max={24} step={1} value={maxVoltage} onChange={(e) => setMaxVoltage(Number(e.target.value))} className="mt-1 w-full" />
              <p className="text-xs font-mono text-primary mt-1">{maxVoltage} V</p>
            </div>
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Ohm's Law:</strong> V = IR — voltage proportional to current for ohmic conductors.</p>
            <p><strong className="text-foreground">Graph:</strong> V-I graph is a straight line through origin; slope = R.</p>
            <p><strong className="text-foreground">Ohmic vs non-ohmic:</strong> Ohmic: constant R (metal wires). Non-ohmic: R changes (diode, filament).</p>
            <p><strong className="text-foreground">Resistivity:</strong> R = ρL/A — depends on material, length, and cross-section.</p>
            <p><strong className="text-foreground">Temperature effect:</strong> For metals, R increases with temperature.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
