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

export function GaussLawVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [chargeType, setChargeType] = useState<"point" | "sphere" | "line">("point");
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
      camera.position.set(0, 0, 10);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.5;
      controls.minDistance = 3;
      controls.maxDistance = 20;

      scene.add(new THREE.AmbientLight(0xffffff, 0.7));
      const dir = new THREE.DirectionalLight(0xffffff, 1.0);
      dir.position.set(5, 10, 5);
      scene.add(dir);

      const push = <T extends THREE.Object3D>(o: T): T => { scene.add(o); meshes.push(o); return o; };

      // Central charge
      const charge = push(new THREE.Mesh(
        new THREE.SphereGeometry(0.3, 24, 24),
        new THREE.MeshBasicMaterial({ color: 0xef4444 }),
      )) as THREE.Mesh;
      push(mkSprite("+q", "#ef4444", new THREE.Vector3(0, 1, 0), 0.8));

      // Gaussian surface (sphere)
      const gaussianSphere = push(new THREE.Mesh(
        new THREE.SphereGeometry(3, 32, 32),
        new THREE.MeshBasicMaterial({
          color: 0x22d3ee,
          transparent: true,
          opacity: 0.1,
          wireframe: true,
        }),
      ));

      // Field lines through Gaussian surface
      const numLines = 16;
      for (let i = 0; i < numLines; i++) {
        const theta = (i / numLines) * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const pts: THREE.Vector3[] = [];
        for (let r = 0.5; r <= 4; r += 0.15) {
          pts.push(new THREE.Vector3(
            r * Math.sin(phi) * Math.cos(theta),
            r * Math.sin(phi) * Math.sin(theta),
            r * Math.cos(phi)
          ));
        }
        push(new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(pts),
          new THREE.LineBasicMaterial({ color: 0xfbbf24, transparent: true, opacity: 0.5 }),
        ));
      }

      // Flux arrow labels
      const fluxLabelPos = new THREE.Vector3(4.5, 0, 0);
      const fluxTarget = new THREE.Vector3(3, 0, 0);
      const fluxDir = fluxTarget.clone().sub(fluxLabelPos).normalize();
      push(new THREE.ArrowHelper(fluxDir, fluxLabelPos, fluxLabelPos.distanceTo(fluxTarget) * 0.9, 0xa78bfa, 0.15, 0.1));
      push(mkSprite("Φ_E = ∮E·dA = q/ε₀", "#a78bfa", fluxLabelPos.clone().sub(fluxDir.multiplyScalar(0.5)), 0.8));

      const ELabelPos = new THREE.Vector3(0, 4.5, 0);
      const ETarget = new THREE.Vector3(0, 3, 0);
      const EDir = ETarget.clone().sub(ELabelPos).normalize();
      push(new THREE.ArrowHelper(EDir, ELabelPos, ELabelPos.distanceTo(ETarget) * 0.9, 0x34d399, 0.15, 0.1));
      push(mkSprite("E = q/(4πε₀r²)", "#34d399", ELabelPos.clone().sub(EDir.multiplyScalar(0.5)), 0.8));

      const ALabelPos = new THREE.Vector3(-4.5, 0, 0);
      const ATarget = new THREE.Vector3(-3, 0, 0);
      const ADir = ATarget.clone().sub(ALabelPos).normalize();
      push(new THREE.ArrowHelper(ADir, ALabelPos, ALabelPos.distanceTo(ATarget) * 0.9, 0x22d3ee, 0.15, 0.1));
      push(mkSprite("dA (area element)", "#22d3ee", ALabelPos.clone().sub(ADir.multiplyScalar(0.5)), 0.75));

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
  }, [chargeType, isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="Gauss's Law" description="Electric flux through Gaussian surface." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Gauss's Law — Electric Flux</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate · Scroll to zoom</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Charge Distribution">
          <div className="flex flex-wrap gap-2 mt-1">
            <button onClick={() => setChargeType("point")} className={`px-3 py-1.5 rounded-md text-xs font-medium ${chargeType === "point" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>Point Charge</button>
            <button onClick={() => setChargeType("sphere")} className={`px-3 py-1.5 rounded-md text-xs font-medium ${chargeType === "sphere" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>Charged Sphere</button>
            <button onClick={() => setChargeType("line")} className={`px-3 py-1.5 rounded-md text-xs font-medium ${chargeType === "line" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>Line Charge</button>
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Gauss's Law:</strong> Φ_E = ∮E·dA = q_enc/ε₀ — flux through closed surface equals enclosed charge over ε₀.</p>
            <p><strong className="text-foreground">Gaussian surface:</strong> Imaginary closed surface chosen for symmetry.</p>
            <p><strong className="text-foreground">Point charge:</strong> E = q/(4πε₀r²), flux = q/ε₀ through any enclosing sphere.</p>
            <p><strong className="text-foreground">Application:</strong> Finding E for spheres, cylinders, planes using symmetry.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
