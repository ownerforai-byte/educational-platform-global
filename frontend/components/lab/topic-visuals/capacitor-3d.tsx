"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallback } from "@/components/lab/webgl-fallback";
import * as THREE from "three";
import { LiveArrow } from "@/components/lab/animated-arrow-helper";

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

export function CapacitorVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [charge, setCharge] = useState(5);
  const [isWebGL] = useState(() => isWebGLAvailable());


  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isWebGL) return;

    let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer;
    let controls: any, frameId: number;
    const meshes: THREE.Object3D[] = [];
    let animPhase = 0;

    const init = async () => {
      const { OrbitControls } = await import("three/addons/controls/OrbitControls.js");

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0f172a);
      camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
      camera.position.set(0, 0, 10);

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

      // Positive plate (right)
      const posPlate = push(new THREE.Mesh(
        new THREE.BoxGeometry(0.2, 3, 2),
        new THREE.MeshBasicMaterial({ color: 0xef4444 }),
      )) as THREE.Mesh;
      posPlate.position.set(1.5, 0, 0);
      push(mkSprite("+Q", "#ef4444", new THREE.Vector3(2.2, 0, 0), 0.8));

      // Negative plate (left)
      const negPlate = push(new THREE.Mesh(
        new THREE.BoxGeometry(0.2, 3, 2),
        new THREE.MeshBasicMaterial({ color: 0x3b82f6 }),
      )) as THREE.Mesh;
      negPlate.position.set(-1.5, 0, 0);
      push(mkSprite("−Q", "#3b82f6", new THREE.Vector3(-2.2, 0, 0), 0.8));

      // Electric field lines (from + to −)
      const fieldLines: THREE.Line[] = [];
      for (let y = -1.2; y <= 1.2; y += 0.4) {
        const pts: THREE.Vector3[] = [new THREE.Vector3(1.3, y, 0), new THREE.Vector3(-1.3, y, 0)];
        const line = push(new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(pts),
          new THREE.LineBasicMaterial({ color: 0xfbbf24, transparent: true, opacity: 0.7 }),
        )) as THREE.Line;
        fieldLines.push(line);
        meshes.push(line);
      }
      // Arrow heads on field lines
      for (let y = -1.2; y <= 1.2; y += 0.8) {
        const arrowHead = push(new THREE.Mesh(
          new THREE.ConeGeometry(0.08, 0.2, 8),
          new THREE.MeshBasicMaterial({ color: 0xfbbf24 }),
        )) as THREE.Mesh;
        arrowHead.position.set(0, y, 0);
        arrowHead.rotation.z = -Math.PI / 2;
        fieldLines.push(arrowHead as any);
        meshes.push(arrowHead);
      }
      push(mkSprite("E field (E = V/d)", "#fbbf24", new THREE.Vector3(0, 2.2, 0), 0.75));

      // Long arrow label for charge
      const chargeLabelPos = new THREE.Vector3(0, -2.5, 0);
      const chargeTarget = new THREE.Vector3(0, 0, 0);
      const chargeDir = chargeTarget.clone().sub(chargeLabelPos).normalize();
      push(new LiveArrow(chargeDir, chargeLabelPos, chargeLabelPos.distanceTo(chargeTarget) * 0.9, 0x22d3ee, 0.15, 0.1));
      push(mkSprite(`Q = ${charge} μC`, "#22d3ee", chargeLabelPos.clone().sub(chargeDir.multiplyScalar(0.5)), 0.8));

      // Voltage label
      const vLabelPos = new THREE.Vector3(3.5, 0, 0);
      const vTarget = new THREE.Vector3(1.5, 0, 0);
      const vDir = vTarget.clone().sub(vLabelPos).normalize();
      push(new LiveArrow(vDir, vLabelPos, vLabelPos.distanceTo(vTarget) * 0.9, 0xa78bfa, 0.15, 0.1));
      push(mkSprite("V (potential difference)", "#a78bfa", vLabelPos.clone().sub(vDir.multiplyScalar(0.5)), 0.7));

      // Capacitance formula label
      const CLabelPos = new THREE.Vector3(-3.5, 0, 0);
      const CTarget = new THREE.Vector3(-1.5, 0, 0);
      const CDir = CTarget.clone().sub(CLabelPos).normalize();
      push(new LiveArrow(CDir, CLabelPos, CLabelPos.distanceTo(CTarget) * 0.9, 0x34d399, 0.15, 0.1));
      push(mkSprite("C = Q/V", "#34d399", CLabelPos.clone().sub(CDir.multiplyScalar(0.5)), 0.75));

      // Electron flow animation
      const electrons: THREE.Mesh[] = [];
      for (let i = 0; i < 8; i++) {
        const e = push(new THREE.Mesh(
          new THREE.SphereGeometry(0.08, 8, 8),
          new THREE.MeshBasicMaterial({ color: 0x3b82f6 }),
        )) as THREE.Mesh;
        e.userData.phase = (i / 8) * Math.PI * 2;
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
        animPhase += 0.03;
        electrons.forEach((e) => {
          const phase = e.userData.phase + animPhase;
          e.position.set(Math.cos(phase) * 2.5, Math.sin(phase) * 1.5, 0);
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
  }, [charge, isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="Capacitor" description="Parallel plate capacitor with electric field lines." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Capacitor — Parallel Plates & Field Lines</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate · Scroll to zoom</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Capacitor Parameters">
          <div className="flex flex-wrap gap-4 mt-2">
            <div className="w-28">
              <Label className="text-xs text-muted-foreground">Charge Q (μC):</Label>
              <Input type="range" min={1} max={10} step={0.5} value={charge} onChange={(e) => setCharge(Number(e.target.value))} className="mt-1 w-full" />
              <p className="text-xs font-mono text-primary mt-1">{charge} μC</p>
            </div>
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-yellow-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Capacitance:</strong> C = Q/V — ability to store charge per unit voltage.</p>
            <p><strong className="text-foreground">Parallel plate:</strong> C = ε₀A/d — depends on area and separation.</p>
            <p><strong className="text-foreground">Electric field:</strong> E = V/d = σ/ε₀ — uniform between plates.</p>
            <p><strong className="text-foreground">Energy stored:</strong> U = ½CV² = ½QV = Q²/(2C)</p>
            <p><strong className="text-foreground">Dielectric:</strong> Inserting dielectric increases capacitance by factor κ.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
