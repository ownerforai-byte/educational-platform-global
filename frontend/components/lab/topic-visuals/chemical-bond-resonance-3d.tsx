"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  ctx.font = "bold 24px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = color;
  ctx.fillText(text, 256, 48);
  const tex = new THREE.CanvasTexture(canvas);
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false }));
  s.position.copy(pos);
  s.scale.set(4.0 * scale, 0.75 * scale, 1);
  return s;
}

type ResonanceView = "ozone" | "carbonate" | "benzene" | "hybrid";

export function ResonanceVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<ResonanceView>("ozone");
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
      camera.position.set(0, 3, 10);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.3;
      controls.minDistance = 3;
      controls.maxDistance = 15;

      scene.add(new THREE.AmbientLight(0xffffff, 0.8));
      const dir = new THREE.DirectionalLight(0xffffff, 1.0);
      dir.position.set(6, 10, 6);
      scene.add(dir);

      const push = <T extends THREE.Object3D>(o: T): T => { scene.add(o); meshes.push(o); return o; };
      const clearDynamic = () => {
        while (meshes.length > 2) {
          const m = meshes.pop()!;
          scene.remove(m);
          if (m instanceof THREE.Mesh) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Sprite) { const sm = m.material as THREE.SpriteMaterial; sm.map?.dispose?.(); sm.dispose(); }
        }
      };

      const buildOzone = (opacity: number = 1.0) => {
        clearDynamic();
        const oColor = 0xef4444;
        const bondColor = 0xf59e0b;

        const oPositions = [
          new THREE.Vector3(-1.0, 0.3, 0),
          new THREE.Vector3(0, -0.5, 0),
          new THREE.Vector3(1.0, 0.3, 0),
        ];

        oPositions.forEach((pos, i) => {
          const sphere = push(new THREE.Mesh(
            new THREE.SphereGeometry(0.4, 20, 20),
            new THREE.MeshPhongMaterial({ color: oColor, emissive: oColor, emissiveIntensity: 0.3, transparent: true, opacity }),
          ));
          sphere.position.copy(pos);
          sphere.add(mkSprite("O", "#ef4444", new THREE.Vector3(0, 0.6, 0), 0.8));
        });

        if (view !== "carbonate" && view !== "benzene" && view !== "hybrid") {
          const bond1 = push(new THREE.Mesh(
            new THREE.CylinderGeometry(0.06, 0.06, 1.0, 8),
            new THREE.MeshPhongMaterial({ color: bondColor, transparent: true, opacity }),
          ));
          bond1.position.set(-0.5, 0.15, 0);
          bond1.lookAt(oPositions[1]);
          bond1.rotateX(Math.PI / 2);

          const bond1b = push(new THREE.Mesh(
            new THREE.CylinderGeometry(0.06, 0.06, 1.0, 8),
            new THREE.MeshPhongMaterial({ color: bondColor, transparent: true, opacity }),
          ));
          bond1b.position.set(-0.5, 0.45, 0);
          bond1b.lookAt(oPositions[1]);
          bond1b.rotateX(Math.PI / 2);

          const bond2 = push(new THREE.Mesh(
            new THREE.CylinderGeometry(0.06, 0.06, 1.0, 8),
            new THREE.MeshPhongMaterial({ color: 0x60a5fa, transparent: true, opacity }),
          ));
          bond2.position.set(0.5, 0.15, 0);
          bond2.lookAt(oPositions[2]);
          bond2.rotateX(Math.PI / 2);
        }

        push(mkSprite("O3 Resonance: O=O-O <-> O-O=O", "#f59e0b", new THREE.Vector3(0, -1.5, 0), 0.85));
      };

      const buildCarbonate = (opacity: number = 1.0) => {
        clearDynamic();
        const cColor = 0x374151;
        const oColor = 0xef4444;

        const cPos = new THREE.Vector3(0, 0, 0);
        const cSphere = push(new THREE.Mesh(
          new THREE.SphereGeometry(0.4, 20, 20),
          new THREE.MeshPhongMaterial({ color: cColor, emissive: cColor, emissiveIntensity: 0.2 }),
        ));
        cSphere.position.copy(cPos);
        cSphere.add(mkSprite("C", "#374151", new THREE.Vector3(0, 0.6, 0), 0.8));

        const angles = [0, 120, 240].map((deg) => deg * (Math.PI / 180));
        const oPositions = angles.map((a) => new THREE.Vector3(Math.cos(a) * 1.2, Math.sin(a) * 1.2, 0));

        oPositions.forEach((pos, i) => {
          const sphere = push(new THREE.Mesh(
            new THREE.SphereGeometry(0.35, 20, 20),
            new THREE.MeshPhongMaterial({ color: oColor, emissive: oColor, emissiveIntensity: 0.2, transparent: true, opacity }),
          ));
          sphere.position.copy(pos);
          sphere.add(mkSprite("O", "#ef4444", pos.clone().normalize().multiplyScalar(0.7), 0.7));

          const bond = push(new THREE.Mesh(
            new THREE.CylinderGeometry(0.05, 0.05, 1.2, 8),
            new THREE.MeshPhongMaterial({ color: 0xf59e0b, transparent: true, opacity }),
          ));
          bond.position.copy(pos.clone().multiplyScalar(0.5));
          bond.lookAt(pos);
          bond.rotateX(Math.PI / 2);
        });

        push(mkSprite("CO3(2-) Resonance: 3 equivalent structures", "#f59e0b", new THREE.Vector3(0, -2.0, 0), 0.85));
      };

      const buildBenzene = (opacity: number = 1.0) => {
        clearDynamic();
        const cColor = 0x374151;
        const hColor = 0xf8fafc;

        const angles = Array.from({ length: 6 }, (_, i) => (i * 60) * (Math.PI / 180));
        const radius = 1.2;
        const cPositions = angles.map((a) => new THREE.Vector3(Math.cos(a) * radius, Math.sin(a) * radius, 0));

        cPositions.forEach((pos, i) => {
          const sphere = push(new THREE.Mesh(
            new THREE.SphereGeometry(0.3, 16, 16),
            new THREE.MeshPhongMaterial({ color: cColor, emissive: cColor, emissiveIntensity: 0.2, transparent: true, opacity }),
          ));
          sphere.position.copy(pos);
          sphere.add(mkSprite("C", "#374151", pos.clone().normalize().multiplyScalar(0.65), 0.6));

          const hPos = pos.clone().normalize().multiplyScalar(radius + 0.7);
          const hSphere = push(new THREE.Mesh(
            new THREE.SphereGeometry(0.2, 12, 12),
            new THREE.MeshPhongMaterial({ color: hColor, emissive: hColor, emissiveIntensity: 0.3, transparent: true, opacity }),
          ));
          hSphere.position.copy(hPos);
          hSphere.add(mkSprite("H", "#f8fafc", hPos.clone().normalize().multiplyScalar(0.5), 0.5));
        });

        const bondColor = 0xf59e0b;
        for (let i = 0; i < 6; i += 2) {
          const start = cPositions[i];
          const end = cPositions[(i + 1) % 6];
          const mid = start.clone().lerp(end, 0.5);
          const perp = new THREE.Vector3(-(end.y - start.y), end.x - start.x, 0).normalize().multiplyScalar(0.12);

          const bond = push(new THREE.Mesh(
            new THREE.CylinderGeometry(0.05, 0.05, start.distanceTo(end), 8),
            new THREE.MeshPhongMaterial({ color: bondColor, transparent: true, opacity }),
          ));
          bond.position.copy(mid.clone().add(perp));
          bond.lookAt(end.clone().add(perp));
          bond.rotateX(Math.PI / 2);
        }

        push(mkSprite("C6H6 Benzene: Delocalized pi electrons", "#f59e0b", new THREE.Vector3(0, -2.2, 0), 0.85));
      };

      const buildHybrid = () => {
        clearDynamic();
        const oColor = 0xef4444;
        const oPositions = [
          new THREE.Vector3(-1.0, 0.3, 0),
          new THREE.Vector3(0, -0.5, 0),
          new THREE.Vector3(1.0, 0.3, 0),
        ];

        oPositions.forEach((pos) => {
          const sphere = push(new THREE.Mesh(
            new THREE.SphereGeometry(0.4, 20, 20),
            new THREE.MeshPhongMaterial({ color: oColor, emissive: oColor, emissiveIntensity: 0.3 }),
          ));
          sphere.position.copy(pos);
          sphere.add(mkSprite("O", "#ef4444", new THREE.Vector3(0, 0.6, 0), 0.8));
        });

        const cloudGeo = new THREE.TorusGeometry(1.0, 0.25, 16, 32);
        const cloud = push(new THREE.Mesh(
          cloudGeo,
          new THREE.MeshPhongMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.3, side: THREE.DoubleSide }),
        ));
        cloud.rotation.x = Math.PI / 2;

        const bondMat = new THREE.MeshPhongMaterial({ color: 0x60a5fa, transparent: true, opacity: 0.7 });
        oPositions.forEach((pos, i) => {
          const next = oPositions[(i + 1) % 3];
          const bond = push(new THREE.Mesh(
            new THREE.CylinderGeometry(0.06, 0.06, pos.distanceTo(next), 8),
            bondMat,
          ));
          bond.position.copy(pos.clone().lerp(next, 0.5));
          bond.lookAt(next);
          bond.rotateX(Math.PI / 2);
        });

        push(mkSprite("O3 Hybrid: Bond order 1.5, delocalized electrons", "#f59e0b", new THREE.Vector3(0, -1.8, 0), 0.85));
      };

      const builders: Record<ResonanceView, () => void> = {
        ozone: buildOzone,
        carbonate: buildCarbonate,
        benzene: buildBenzene,
        hybrid: buildHybrid,
      };

      builders[view]();

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
          else if (m instanceof THREE.Sprite) { const sm = m.material as THREE.SpriteMaterial; sm.map?.dispose?.(); sm.dispose(); }
        });
        renderer.dispose();
        controls.dispose?.();
      };
    };

    const cleanup = init();
    return () => { cleanup.then((d) => d?.()); };
  }, [view, isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="Resonance" description="Resonance structures visualization — requires WebGL." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Resonance — Delocalized Electrons</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate · Scroll to zoom</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Resonance Structure">
          <div className="grid grid-cols-4 gap-2 mt-1">
            {([
              { value: "ozone", label: "O3" },
              { value: "carbonate", label: "CO3(2-)" },
              { value: "benzene", label: "C6H6" },
              { value: "hybrid", label: "Hybrid" },
            ] as const).map((m) => (
              <button
                key={m.value}
                onClick={() => setView(m.value as ResonanceView)}
                className={`px-2 py-2 text-xs rounded-md border transition-colors ${
                  view === m.value ? "bg-amber-500/20 border-amber-500 text-amber-300" : "bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-500"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </CollapsibleControls>
        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Resonance:</strong> When a single Lewis structure cannot adequately describe a molecule, multiple resonance structures are used.</p>
            <p><strong className="text-foreground">Delocalized electrons:</strong> Electrons that are spread over three or more atoms, not confined to a single bond.</p>
            <p><strong className="text-foreground">Resonance hybrid:</strong> The actual structure is a weighted average of all resonance forms.</p>
            <p><strong className="text-foreground">O3 (ozone):</strong> Two resonance structures with bond order 1.5.</p>
            <p><strong className="text-foreground">C6H6 (benzene):</strong> Six resonance structures with delocalized pi electrons in a ring.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}