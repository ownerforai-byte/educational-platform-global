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

export function DCCircuitsVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [voltage, setVoltage] = useState(12);
  const [resistance, setResistance] = useState(6);
  const [isWebGL] = useState(() => isWebGLAvailable());


  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isWebGL) return;

    let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer;
    let controls: any, frameId: number;
    const meshes: THREE.Object3D[] = [];
    let electronTime = 0;

    const init = async () => {
      const { OrbitControls } = await import("three/addons/controls/OrbitControls.js");

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0f172a);
      camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
      camera.position.set(0, 2, 10);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.autoRotate = false;
      controls.minDistance = 3;
      controls.maxDistance = 20;

      scene.add(new THREE.AmbientLight(0xffffff, 0.7));
      const dir = new THREE.DirectionalLight(0xffffff, 1.0);
      dir.position.set(5, 10, 5);
      scene.add(dir);

      const push = <T extends THREE.Object3D>(o: T): T => { scene.add(o); meshes.push(o); return o; };

      const V = voltage;
      const R = resistance;
      const I = V / R;

      // Circuit loop (rectangular)
      const W = 5, H = 3;
      const loopPts = [
        new THREE.Vector3(-W / 2, H / 2, 0),
        new THREE.Vector3(W / 2, H / 2, 0),
        new THREE.Vector3(W / 2, -H / 2, 0),
        new THREE.Vector3(-W / 2, -H / 2, 0),
        new THREE.Vector3(-W / 2, H / 2, 0),
      ];
      push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(loopPts), new THREE.LineBasicMaterial({ color: 0x94a3b8 })));

      // Battery (positive terminal up)
      const battery = push(new THREE.Mesh(
        new THREE.BoxGeometry(0.8, 0.3, 0.3),
        new THREE.MeshBasicMaterial({ color: 0xef4444 }),
      )) as THREE.Mesh;
      battery.position.set(-W / 2, 0, 0);
      push(mkSprite("Battery", "#ef4444", new THREE.Vector3(-W / 2 - 1.2, 0, 0), 0.7));

      // Battery terminals
      const posTerm = push(new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 0.6, 0.3),
        new THREE.MeshBasicMaterial({ color: 0xef4444 }),
      ));
      posTerm.position.set(-W / 2, H / 2 - 0.3, 0);
      push(mkSprite("+", "#ef4444", new THREE.Vector3(-W / 2, H / 2 + 0.5, 0), 0.8));

      const negTerm = push(new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 0.3, 0.3),
        new THREE.MeshBasicMaterial({ color: 0x3b82f6 }),
      ));
      negTerm.position.set(-W / 2, -H / 2 + 0.15, 0);
      push(mkSprite("−", "#3b82f6", new THREE.Vector3(-W / 2, -H / 2 - 0.5, 0), 0.8));

      // Resistor (zigzag)
      const resPts: THREE.Vector3[] = [];
      for (let i = 0; i <= 20; i++) {
        const t = i / 20;
        const x = -W / 2 + t * W;
        const y = H / 2 + Math.sin(t * Math.PI * 6) * 0.15;
        resPts.push(new THREE.Vector3(x, y, 0));
      }
      push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(resPts), new THREE.LineBasicMaterial({ color: 0xfbbf24 })));
      push(mkSprite(`R = ${R} Ω`, "#fbbf24", new THREE.Vector3(0, H / 2 + 0.8, 0), 0.7));

      // Current direction arrows with long labels
      const currentLabelPos = new THREE.Vector3(W / 2 + 2, H / 2, 0);
      const currentTarget = new THREE.Vector3(W / 2, H / 2, 0);
      const curDir = currentTarget.clone().sub(currentLabelPos).normalize();
      push(new THREE.ArrowHelper(curDir, currentLabelPos, currentLabelPos.distanceTo(currentTarget) * 0.9, 0x22d3ee, 0.2, 0.1));
      push(mkSprite(`I = V/R = ${I.toFixed(1)} A`, "#22d3ee", currentLabelPos.clone().sub(curDir.multiplyScalar(0.5)), 0.75));

      // Voltage drop label
      const vLabelPos = new THREE.Vector3(W / 2 + 2, -H / 2, 0);
      const vTarget = new THREE.Vector3(W / 2, -H / 2, 0);
      const vDir = vTarget.clone().sub(vLabelPos).normalize();
      push(new THREE.ArrowHelper(vDir, vLabelPos, vLabelPos.distanceTo(vTarget) * 0.9, 0xa78bfa, 0.15, 0.1));
      push(mkSprite(`V = IR = ${V} V`, "#a78bfa", vLabelPos.clone().sub(vDir.multiplyScalar(0.5)), 0.75));

      // Moving electrons
      const electrons: THREE.Mesh[] = [];
      for (let i = 0; i < 12; i++) {
        const e = push(new THREE.Mesh(
          new THREE.SphereGeometry(0.1, 8, 8),
          new THREE.MeshBasicMaterial({ color: 0x3b82f6 }),
        )) as THREE.Mesh;
        e.userData.t = i / 12;
        electrons.push(e);
      }

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
        electronTime += 0.02 * I;
        electrons.forEach((e) => {
          const t = (e.userData.t + electronTime) % 1;
          // Trace along rectangular path
          const perimeter = 2 * W + 2 * H;
          const dist = t * perimeter;
          let x: number, y: number;
          if (dist < W) { x = -W / 2 + dist; y = H / 2; }
          else if (dist < W + H) { x = W / 2; y = H / 2 - (dist - W); }
          else if (dist < 2 * W + H) { x = W / 2 - (dist - W - H); y = -H / 2; }
          else { x = -W / 2; y = -H / 2 + (dist - 2 * W - H); }
          e.position.set(x, y, 0);
        });
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
  }, [voltage, resistance, isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="DC Circuits" description="Current flow animation in a simple circuit." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>DC Circuits — Current Flow & Ohm's Law</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate · Scroll to zoom</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Circuit Parameters">
          <div className="flex flex-wrap gap-4 mt-2">
            <div className="w-24">
              <Label className="text-xs text-muted-foreground">Voltage V (V):</Label>
              <Input type="range" min={1} max={24} step={1} value={voltage} onChange={(e) => setVoltage(Number(e.target.value))} className="mt-1 w-full" />
              <p className="text-xs font-mono text-primary mt-1">{voltage} V</p>
            </div>
            <div className="w-24">
              <Label className="text-xs text-muted-foreground">Resistance R (Ω):</Label>
              <Input type="range" min={1} max={20} step={1} value={resistance} onChange={(e) => setResistance(Number(e.target.value))} className="mt-1 w-full" />
              <p className="text-xs font-mono text-primary mt-1">{resistance} Ω</p>
            </div>
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-green-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Ohm's Law:</strong> V = IR — current proportional to voltage.</p>
            <p><strong className="text-foreground">Current:</strong> I = V/R = {voltage}/{resistance} = {(voltage/resistance).toFixed(1)} A</p>
            <p><strong className="text-foreground">Power dissipated:</strong> P = VI = I²R = V²/R</p>
            <p><strong className="text-foreground">Series resistors:</strong> R_eq = R₁ + R₂ + ...</p>
            <p><strong className="text-foreground">Parallel resistors:</strong> 1/R_eq = 1/R₁ + 1/R₂ + ...</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
