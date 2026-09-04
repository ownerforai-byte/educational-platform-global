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

export function BiotSavartVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(5);
  const [isWebGL] = useState(() => isWebGLAvailable());


  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isWebGL) return;

    let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer;
    let controls: any, frameId: number;
    const meshes: THREE.Object3D[] = [];

    const init = async () => {
      const { OrbitControls } = await import("three/addons/controls/OrbitControls.js");

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0f172a);
      camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
      camera.position.set(0, 5, 8);
      camera.lookAt(0, 0, 0);

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

      // Straight wire (along z-axis)
      const wire = push(new THREE.Mesh(
        new THREE.CylinderGeometry(0.1, 0.1, 8, 12),
        new THREE.MeshBasicMaterial({ color: 0x94a3b8 }),
      )) as THREE.Mesh;
      wire.position.set(0, 0, 0);
      push(mkSprite("Wire (current I)", "#94a3b8", new THREE.Vector3(0, 4.5, 0), 0.7));

      // Current direction arrow
      push(new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, -3, 0), 2, 0xf97316, 0.15, 0.08));
      push(mkSprite(`I = ${current} A`, "#f97316", new THREE.Vector3(1, -3, 0), 0.75));

      // Magnetic field circles around wire
      const fieldRadius = 2;
      for (let r = 1; r <= 3; r++) {
        const circlePts: THREE.Vector3[] = [];
        for (let i = 0; i <= 64; i++) {
          const a = (i / 64) * 2 * Math.PI;
          circlePts.push(new THREE.Vector3(r * Math.cos(a), 0, r * Math.sin(a)));
        }
        const opacity = 0.3 + (4 - r) * 0.15;
        push(new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(circlePts),
          new THREE.LineBasicMaterial({ color: 0x22d3ee, transparent: true, opacity })
        ));
      }

      // Field direction arrows (circular around wire)
      const arrowPos = new THREE.Vector3(fieldRadius, 0, 0);
      const arrowDir = new THREE.Vector3(0, 0, 1).normalize();
      push(new THREE.ArrowHelper(arrowDir, arrowPos, 0.8, 0x22d3ee, 0.15, 0.08));
      push(mkSprite("B field (circular)", "#22d3ee", new THREE.Vector3(fieldRadius + 1, 0.5, 0), 0.7));

      // Long arrow labels
      const rLabelPos = new THREE.Vector3(fieldRadius + 2, 0, 0);
      const rTarget = new THREE.Vector3(fieldRadius, 0, 0);
      const rDir = rTarget.clone().sub(rLabelPos).normalize();
      push(new THREE.ArrowHelper(rDir, rLabelPos, rLabelPos.distanceTo(rTarget) * 0.9, 0xfbbf24, 0.15, 0.1));
      push(mkSprite("r (distance from wire)", "#fbbf24", rLabelPos.clone().sub(rDir.multiplyScalar(0.5)), 0.75));

      // Biot-Savart formula label
      const formulaLabelPos = new THREE.Vector3(-4, 2.5, 0);
      const formulaTarget = new THREE.Vector3(0, 0, 0);
      const formulaDir = formulaTarget.clone().sub(formulaLabelPos).normalize();
      push(new THREE.ArrowHelper(formulaDir, formulaLabelPos, formulaLabelPos.distanceTo(formulaTarget) * 0.9, 0xa78bfa, 0.15, 0.1));
      push(mkSprite("dB = μ₀Idl×r̂/(4πr²)", "#a78bfa", formulaLabelPos.clone().sub(formulaDir.multiplyScalar(0.5)), 0.75));

      // Ampere's law label
      const ampLabelPos = new THREE.Vector3(-3, -3, 0);
      const ampTarget = new THREE.Vector3(0, 0, 0);
      const ampDir = ampTarget.clone().sub(ampLabelPos).normalize();
      push(new THREE.ArrowHelper(ampDir, ampLabelPos, ampLabelPos.distanceTo(ampTarget) * 0.9, 0x34d399, 0.15, 0.1));
      push(mkSprite("∮B·dl = μ₀I (Ampere's Law)", "#34d399", ampLabelPos.clone().sub(ampDir.multiplyScalar(0.5)), 0.7));

      // Right-hand grip rule indicator
      const gripLabelPos = new THREE.Vector3(3, 2, 0);
      const gripTarget = new THREE.Vector3(0, 0, 0);
      const gripDir = gripTarget.clone().sub(gripLabelPos).normalize();
      push(new THREE.ArrowHelper(gripDir, gripLabelPos, gripLabelPos.distanceTo(gripTarget) * 0.9, 0xef4444, 0.15, 0.1));
      push(mkSprite("RHR: thumb→I, fingers→B", "#ef4444", gripLabelPos.clone().sub(gripDir.multiplyScalar(0.5)), 0.7));

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
  }, [current, isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="Biot-Savart" description="Magnetic field around current-carrying wire." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Biot-Savart Law — Magnetic Field Around Wire</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate · Scroll to zoom</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Current Parameters">
          <div className="flex flex-wrap gap-4 mt-2">
            <div className="w-24">
              <Label className="text-xs text-muted-foreground">Current I (A):</Label>
              <Input type="range" min={1} max={10} step={1} value={current} onChange={(e) => setCurrent(Number(e.target.value))} className="mt-1 w-full" />
              <p className="text-xs font-mono text-primary mt-1">{current} A</p>
            </div>
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-cyan-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Biot-Savart Law:</strong> dB = (μ₀/4π)·(I·dl×r̂)/r² — field from a current element.</p>
            <p><strong className="text-foreground">Straight wire:</strong> B = μ₀I/(2πr) — field circles the wire.</p>
            <p><strong className="text-foreground">Right-hand grip rule:</strong> Thumb in current direction, fingers curl in B direction.</p>
            <p><strong className="text-foreground">Ampere's Law:</strong> ∮B·dl = μ₀I — relates field to enclosed current.</p>
            <p><strong className="text-foreground">Circular loop:</strong> B at center = μ₀I/(2R).</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
