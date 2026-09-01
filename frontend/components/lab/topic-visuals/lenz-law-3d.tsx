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

export function LenzLawVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [direction, setDirection] = useState<"approaching" | "receding">("approaching");
  const [isWebGL, setIsWebGL] = useState(true);

  useEffect(() => { setIsWebGL(isWebGLAvailable()); }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isWebGL) return;

    let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer;
    let controls: any, frameId: number;
    const meshes: THREE.Object3D[] = [];
    let magnetX = direction === "approaching" ? 6 : -6;
    let movingDir = direction === "approaching" ? -1 : 1;

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

      // Coil
      const coilRadius = 1.8;
      const coilLength = 3;
      const turns = 15;
      for (let i = 0; i < turns; i++) {
        const t = i / (turns - 1);
        const x = -coilLength / 2 + t * coilLength;
        const ring = push(new THREE.Mesh(
          new THREE.TorusGeometry(coilRadius, 0.06, 8, 32),
          new THREE.MeshBasicMaterial({ color: 0xfbbf24 }),
        )) as THREE.Mesh;
        ring.position.set(x, 0, 0);
        ring.rotation.y = Math.PI / 2;
      }
      push(mkSprite("Coil", "#fbbf24", new THREE.Vector3(0, 3, 0), 0.7));

      // Magnetic field lines from magnet
      const fieldLinePts: THREE.Vector3[] = [];
      for (let x = -4; x <= 4; x += 0.3) {
        fieldLinePts.push(new THREE.Vector3(x, 0, 0));
      }
      const bField = push(new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(fieldLinePts),
        new THREE.LineDashedMaterial({ color: 0x64748b, dashSize: 0.2, gapSize: 0.15 }),
      ) as any);
      (meshes[meshes.length - 1] as any).computeLineDistances();

      // Bar magnet
      const magnetGroup = new THREE.Group();
      const north = push(new THREE.Mesh(
        new THREE.BoxGeometry(0.8, 0.6, 0.6),
        new THREE.MeshBasicMaterial({ color: 0xef4444 }),
      ));
      north.position.set(direction === "approaching" ? 0.4 : -0.4, 0, 0);
      magnetGroup.add(north);
      const south = push(new THREE.Mesh(
        new THREE.BoxGeometry(0.8, 0.6, 0.6),
        new THREE.MeshBasicMaterial({ color: 0x3b82f6 }),
      ));
      south.position.set(direction === "approaching" ? -0.4 : 0.4, 0, 0);
      magnetGroup.add(south);
      magnetGroup.position.set(magnetX, 0, 0);
      meshes.push(magnetGroup);

      // Pole labels
      const nLabelPos = new THREE.Vector3(magnetX + (direction === "approaching" ? 1.2 : -1.2), 1.2, 0);
      push(mkSprite("N", "#ef4444", nLabelPos, 0.8));
      const sLabelPos = new THREE.Vector3(magnetX + (direction === "approaching" ? -1.2 : 1.2), -1.2, 0);
      push(mkSprite("S", "#3b82f6", sLabelPos, 0.8));

      // Flux change label with long arrow
      const fluxLabelPos = new THREE.Vector3(0, -3, 0);
      const fluxTarget = new THREE.Vector3(0, 0, 0);
      const fluxDir = fluxTarget.clone().sub(fluxLabelPos).normalize();
      push(new THREE.ArrowHelper(fluxDir, fluxLabelPos, fluxLabelPos.distanceTo(fluxTarget) * 0.9, 0xa78bfa, 0.15, 0.1));
      push(mkSprite(
        direction === "approaching" ? "Φ increasing → induced B opposes" : "Φ decreasing → induced B supports",
        "#a78bfa", fluxLabelPos.clone().sub(fluxDir.multiplyScalar(0.5)), 0.75
      ));

      // Induced current direction
      const indLabelPos = new THREE.Vector3(3.5, 1.5, 0);
      const indTarget = new THREE.Vector3(0, 0, 0);
      const indDir = indTarget.clone().sub(indLabelPos).normalize();
      push(new THREE.ArrowHelper(indDir, indLabelPos, indLabelPos.distanceTo(indTarget) * 0.9, 0x22d3ee, 0.15, 0.1));
      push(mkSprite(
        direction === "approaching" ? "Induced: N pole faces magnet (repel)" : "Induced: S pole faces magnet (attract)",
        "#22d3ee", indLabelPos.clone().sub(indDir.multiplyScalar(0.5)), 0.7
      ));

      // Lenz's law formula
      const lenzLabelPos = new THREE.Vector3(-3.5, 2.5, 0);
      const lenzTarget = new THREE.Vector3(0, 0, 0);
      const lenzDir = lenzTarget.clone().sub(lenzLabelPos).normalize();
      push(new THREE.ArrowHelper(lenzDir, lenzLabelPos, lenzLabelPos.distanceTo(lenzTarget) * 0.9, 0xef4444, 0.15, 0.1));
      push(mkSprite("ε = −N(dΦ/dt) (Lenz's Law)", "#ef4444", lenzLabelPos.clone().sub(lenzDir.multiplyScalar(0.5)), 0.8));

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
        magnetX += movingDir * 0.02;
        if (magnetX > 6 || magnetX < -6) movingDir *= -1;
        magnetGroup.position.set(magnetX, 0, 0);
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
  }, [direction, isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="Lenz's Law" description="Induced current direction opposing flux change." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Lenz's Law — Induced Current Direction</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate · Scroll to zoom</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Magnet Motion">
          <div className="flex flex-wrap gap-2 mt-1">
            <button
              onClick={() => setDirection("approaching")}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                direction === "approaching" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              Magnet Approaching
            </button>
            <button
              onClick={() => setDirection("receding")}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                direction === "receding" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              Magnet Receding
            </button>
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-purple-500/30 bg-purple-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-purple-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Lenz's Law:</strong> The direction of induced EMF is such that it opposes the change in magnetic flux that produced it.</p>
            <p><strong className="text-foreground">Approaching magnet:</strong> Flux increases → induced current creates opposing field (repulsion).</p>
            <p><strong className="text-foreground">Receding magnet:</strong> Flux decreases → induced current reinforces field (attraction).</p>
            <p><strong className="text-foreground">Energy conservation:</strong> Lenz's law is a consequence of conservation of energy.</p>
            <p><strong className="text-foreground">Faraday's Law:</strong> ε = −N(dΦ/dt) — magnitude of induced EMF.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
