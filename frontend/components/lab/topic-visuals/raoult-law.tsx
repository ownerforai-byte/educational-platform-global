"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallback } from "@/components/lab/webgl-fallback";
import * as THREE from "three";
import { LiveArrow } from "@/components/lab/animated-arrow-helper";

/* ============================================================
   Raoult's Law — Vapor Pressure Lowering
   NEB Chemistry 12 — Solutions
   ============================================================ */

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
  ctx.font = "bold 28px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = color;
  ctx.fillText(text, 256, 48);
  const tex = new THREE.CanvasTexture(canvas);
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false }));
  s.position.copy(pos);
  s.scale.set(3.4 * scale, 0.64 * scale, 1);
  return s;
}

export function RaoultLawVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [moleFraction, setMoleFraction] = useState(0.3);
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
      camera.position.set(0, 1, 10);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.autoRotate = false;
      controls.minDistance = 3;
      controls.maxDistance = 20;

      scene.add(new THREE.AmbientLight(0xffffff, 0.8));

      const push = <T extends THREE.Object3D>(o: T): T => { scene.add(o); meshes.push(o); return o; };

      const P0 = 100; // pure solvent vapor pressure (arbitrary units)

      const updateScene = () => {
        while (meshes.length > 8) {
          const m = meshes.pop()!;
          scene.remove(m);
          if (m instanceof THREE.Mesh) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Sprite) { (m.material as THREE.SpriteMaterial).map?.dispose?.(); m.material.dispose(); }
          else if (m instanceof THREE.Line) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
        }

        const Xs = moleFraction; // mole fraction of solute
        const Xt = 1 - Xs; // mole fraction of solvent
        const Ps = P0 * Xt; // vapor pressure of solution
        const deltaP = P0 - Ps; // lowering of vapor pressure

        const ox = -6, oy = -3;
        const sx = 1.2, sy = 0.5;

        // Axes
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(ox, oy, 0), new THREE.Vector3(ox + sx * 1.2, oy, 0)]), new THREE.LineBasicMaterial({ color: 0x475569 })));
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(ox, oy, 0), new THREE.Vector3(ox, oy + sy * 12, 0)]), new THREE.LineBasicMaterial({ color: 0x475569 })));
        push(mkSprite("X_solute", "#94a3b8", new THREE.Vector3(ox + sx * 1.25, oy - 0.3, 0), 0.6));
        push(mkSprite("Vapor Pressure", "#94a3b8", new THREE.Vector3(ox - 0.5, oy + sy * 12.5, 0), 0.6));

        // Raoult's law line: P_solution = X_solvent × P°_solvent
        const linePts: THREE.Vector3[] = [];
        for (let x = 0; x <= 1; x += 0.02) {
          const P = P0 * (1 - x);
          linePts.push(new THREE.Vector3(ox + x * sx, oy + P * sy * 0.5, 0));
        }
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(linePts), new THREE.LineBasicMaterial({ color: 0x3b82f6, linewidth: 2 })));

        // Current point
        const currX = ox + Xs * sx;
        const currY = oy + Ps * sy * 0.5;
        push(new THREE.Mesh(new THREE.SphereGeometry(0.15, 12, 12), new THREE.MeshBasicMaterial({ color: 0xef4444 }))).position.set(currX, currY, 0);

        // Vapor pressure labels with long arrows
        const p0Label = new THREE.Vector3(ox + sx * 1.1, oy + P0 * sy * 0.5 + 0.4, 0);
        const p0Target = new THREE.Vector3(ox + sx * 1.1, oy + P0 * sy * 0.5, 0);
        const p0Dir = p0Target.clone().sub(p0Label).normalize();
        const p0Len = p0Label.distanceTo(p0Target);
        push(new LiveArrow(p0Dir, p0Label, p0Len * 0.8, 0xfbbf24, 0.25, 0.12));
        push(mkSprite(`P°_solvent = ${P0} units`, "#fbbf24", p0Label.clone().sub(p0Dir.multiplyScalar(0.5)), 0.65));

        const psLabel = new THREE.Vector3(currX + 0.8, currY + 0.4, 0);
        const psTarget = new THREE.Vector3(currX, currY, 0);
        const psDir = psTarget.clone().sub(psLabel).normalize();
        const psLen = psLabel.distanceTo(psTarget);
        push(new LiveArrow(psDir, psLabel, psLen * 0.8, 0x22c55e, 0.25, 0.12));
        push(mkSprite(`P_solution = ${Ps.toFixed(1)} units`, "#22c55e", psLabel.clone().sub(psDir.multiplyScalar(0.5)), 0.65));

        // Delta P (vapor pressure lowering)
        const dpLabel = new THREE.Vector3(ox - 1.5, (oy + P0 * sy * 0.5 + currY) / 2, 0);
        const dpTarget1 = new THREE.Vector3(ox, oy + P0 * sy * 0.5, 0);
        const dpTarget2 = new THREE.Vector3(ox, currY, 0);
        const dpMid = dpTarget1.clone().add(dpTarget2).multiplyScalar(0.5);
        const dpDir = dpMid.clone().sub(dpLabel).normalize();
        const dpLen = dpLabel.distanceTo(dpMid);
        push(new LiveArrow(dpDir, dpLabel, dpLen * 0.7, 0xf97316, 0.25, 0.12));
        push(mkSprite(`ΔP = ${deltaP.toFixed(1)} (VP lowering)`, "#f97316", dpLabel.clone().sub(dpDir.multiplyScalar(0.5)), 0.65));

        // Formula
        push(mkSprite(`ΔP/P° = X_solute = ${Xs.toFixed(2)}   |   P = P° × X_solvent = ${Ps.toFixed(1)}`, "#7dd3fc", new THREE.Vector3(0, -3.5, 0), 0.6));
      };

      updateScene();

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
        });
        renderer.dispose();
        controls.dispose?.();
      };
    };

    const cleanup = init();
    return () => { cleanup.then((d) => d?.()); };
  }, [moleFraction, isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="Raoult's Law" description="Vapor pressure lowering diagram — requires WebGL." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Raoult's Law — Vapor Pressure Lowering</span>
          <span className="text-xs text-muted-foreground font-normal">Adjust solute concentration</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Solute Mole Fraction (X_solute)">
          <div className="w-48 mt-1">
            <label className="text-xs text-muted-foreground">X_solute = {moleFraction.toFixed(2)}</label>
            <input
              type="range" min={0} max={1} step={0.01} value={moleFraction}
              onChange={(e) => setMoleFraction(Number(e.target.value))}
              className="mt-2 w-full"
            />
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-400">Raoult's Law</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Raoult's Law:</strong> P_solution = X_solvent × P°_solvent</p>
            <p><strong className="text-foreground">Relative lowering:</strong> (P° - P)/P° = X_solute = moles solute / total moles</p>
            <p><strong className="text-foreground">Colligative property:</strong> Vapor pressure lowering depends only on number of solute particles, not identity.</p>
            <p><strong className="text-foreground">Application:</strong> Used to determine molar mass of non-volatile solutes from VP lowering measurements.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
