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

export function BohrModelVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [Z, setZ] = useState(1);
  const [n, setN] = useState(3);
  const [isWebGL] = useState(() => isWebGLAvailable());


  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isWebGL) return;

    let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer;
    let controls: any, frameId: number;
    const meshes: THREE.Object3D[] = [];
    let electronAngle = 0;

    const init = async () => {
      const { OrbitControls } = await import("three/addons/controls/OrbitControls.js");

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0f172a);
      camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
      camera.position.set(0, 0, 12);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.autoRotate = false;
      controls.minDistance = 3;
      controls.maxDistance = 25;

      scene.add(new THREE.AmbientLight(0xffffff, 0.7));
      const dir = new THREE.DirectionalLight(0xffffff, 1.0);
      dir.position.set(5, 10, 5);
      scene.add(dir);

      const push = <T extends THREE.Object3D>(o: T): T => { scene.add(o); meshes.push(o); return o; };

      // Nucleus
      const nucleus = push(new THREE.Mesh(
        new THREE.SphereGeometry(0.3, 24, 24),
        new THREE.MeshBasicMaterial({ color: 0xef4444 }),
      )) as THREE.Mesh;
      push(mkSprite(`Nucleus (Z=${Z})`, "#ef4444", new THREE.Vector3(0, 0.8, 0), 0.7));

      // Energy levels (orbits)
      for (let i = 1; i <= n; i++) {
        const radius = i * i * 0.8;
        const orbit = push(new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(
            Array.from({ length: 64 }, (_, j) => {
              const a = (j / 64) * 2 * Math.PI;
              return new THREE.Vector3(radius * Math.cos(a), radius * Math.sin(a), 0);
            })
          ),
          new THREE.LineBasicMaterial({ color: 0x334155, transparent: true, opacity: 0.6 })
        ));
        orbit.rotation.x = Math.PI * 0.1;
        orbit.rotation.z = Math.PI * 0.05;

        // Energy level label
        const energy = -13.6 * (Z * Z) / (i * i);
        const labelPos = new THREE.Vector3(radius + 0.8, 0, 0);
        const targetPos = new THREE.Vector3(radius, 0, 0);
        const dir = targetPos.clone().sub(labelPos).normalize();
        push(new LiveArrow(dir, labelPos, labelPos.distanceTo(targetPos) * 0.9, 0xa78bfa, 0.15, 0.1));
        push(mkSprite(`n=${i}: E = ${energy.toFixed(1)} eV`, "#a78bfa", labelPos.clone().sub(dir.multiplyScalar(0.5)), 0.7));
      }

      // Electron on selected orbit
      const electronRadius = n * n * 0.8;
      const electron = push(new THREE.Mesh(
        new THREE.SphereGeometry(0.15, 12, 12),
        new THREE.MeshBasicMaterial({ color: 0x22d3ee }),
      )) as THREE.Mesh;

      // Electron velocity arrow
      const velLabelPos = new THREE.Vector3(electronRadius + 1.5, electronRadius + 0.5, 0);
      const velTarget = new THREE.Vector3(electronRadius * Math.cos(electronAngle), electronRadius * Math.sin(electronAngle), 0);
      const velDir = velTarget.clone().sub(velLabelPos).normalize();
      push(new LiveArrow(velDir, velLabelPos, velLabelPos.distanceTo(velTarget) * 0.9, 0x22d3ee, 0.2, 0.1));
      push(mkSprite("v (velocity)", "#22d3ee", velLabelPos.clone().sub(velDir.multiplyScalar(0.5)), 0.75));

      // Angular momentum quantization label
      const amLabelPos = new THREE.Vector3(-electronRadius - 2, electronRadius + 1, 0);
      const amTarget = new THREE.Vector3(0, 0, 0);
      const amDir = amTarget.clone().sub(amLabelPos).normalize();
      push(new LiveArrow(amDir, amLabelPos, amLabelPos.distanceTo(amTarget) * 0.9, 0xfbbf24, 0.15, 0.1));
      push(mkSprite("mvr = nh/2π (quantization)", "#fbbf24", amLabelPos.clone().sub(amDir.multiplyScalar(0.5)), 0.7));

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
        electronAngle += 0.03;
        electron.position.set(
          electronRadius * Math.cos(electronAngle),
          electronRadius * Math.sin(electronAngle),
          0
        );
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
  }, [Z, n, isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="Bohr Model" description="Electron orbits with energy level labels." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Bohr Model — Atomic Structure</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate · Scroll to zoom</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Atomic Parameters">
          <div className="flex flex-wrap gap-4 mt-2">
            <div className="w-24">
              <Label className="text-xs text-muted-foreground">Nuclear charge Z:</Label>
              <Input type="range" min={1} max={3} step={1} value={Z} onChange={(e) => setZ(Number(e.target.value))} className="mt-1 w-full" />
              <p className="text-xs font-mono text-primary mt-1">{Z}</p>
            </div>
            <div className="w-24">
              <Label className="text-xs text-muted-foreground">Max orbit n:</Label>
              <Input type="range" min={1} max={5} step={1} value={n} onChange={(e) => setN(Number(e.target.value))} className="mt-1 w-full" />
              <p className="text-xs font-mono text-primary mt-1">n = {n}</p>
            </div>
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-purple-500/30 bg-purple-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-purple-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Postulate 1:</strong> Electrons revolve in fixed circular orbits without radiating energy.</p>
            <p><strong className="text-foreground">Quantization:</strong> mvr = nh/2π — angular momentum is quantized.</p>
            <p><strong className="text-foreground">Energy levels:</strong> E_n = −13.6 Z²/n² eV — negative means bound state.</p>
            <p><strong className="text-foreground">Photon emission:</strong> When electron jumps from n₂ to n₁, photon energy = E_n₂ − E_n₁.</p>
            <p><strong className="text-foreground">Hydrogen spectrum:</strong> Lyman (UV), Balmer (visible), Paschen (IR) series.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
