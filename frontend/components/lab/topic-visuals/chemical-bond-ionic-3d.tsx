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
  ctx.font = "bold 26px monospace";
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

type LatticeView = "unit-cell" | "extended" | "ion-sizes";

export function IonicBondVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<LatticeView>("unit-cell");
  const [isWebGL, setIsWebGL] = useState(true);

  useEffect(() => { setIsWebGL(isWebGLAvailable()); }, []);

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
      camera.position.set(0, 6, 10);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.4;
      controls.minDistance = 3;
      controls.maxDistance = 20;

      scene.add(new THREE.AmbientLight(0xffffff, 0.7));
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

      const buildLattice = () => {
        clearDynamic();
        const spacing = 1.8;
        const naColor = 0x3b82f6;
        const clColor = 0x22c55e;
        const sizeNa = view === "ion-sizes" ? 0.45 : 0.6;
        const sizeCl = view === "ion-sizes" ? 0.7 : 0.8;

        for (let x = -1; x <= 1; x++) {
          for (let y = -1; y <= 1; y++) {
            for (let z = -1; z <= 1; z++) {
              const isNa = (x + y + z) % 2 === 0;
              const radius = isNa ? sizeNa : sizeCl;
              const color = isNa ? naColor : clColor;
              const charge = isNa ? "⁺" : "⁻";

              const sphere = push(new THREE.Mesh(
                new THREE.SphereGeometry(radius, 24, 24),
                new THREE.MeshPhongMaterial({ color, emissive: color, emissiveIntensity: 0.2, shininess: 60, transparent: true, opacity: 0.9 }),
              ));
              sphere.position.set(x * spacing, y * spacing, z * spacing);
              if (!isNa) sphere.add(mkSprite("Cl" + charge, "#22c55e", new THREE.Vector3(0, radius + 0.4, 0)));
              else sphere.add(mkSprite("Na" + charge, "#3b82f6", new THREE.Vector3(0, radius + 0.4, 0)));
            }
          }
        }

        const bondMat = new THREE.LineBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.5 });
        for (let x = -1; x <= 1; x++) {
          for (let y = -1; y <= 1; y++) {
            for (let z = -1; z <= 1; z++) {
              if (x < 1) {
                const pts = [new THREE.Vector3(x * spacing, y * spacing, z * spacing), new THREE.Vector3((x + 1) * spacing, y * spacing, z * spacing)];
                push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), bondMat));
              }
              if (y < 1) {
                const pts = [new THREE.Vector3(x * spacing, y * spacing, z * spacing), new THREE.Vector3(x * spacing, (y + 1) * spacing, z * spacing)];
                push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), bondMat));
              }
              if (z < 1) {
                const pts = [new THREE.Vector3(x * spacing, y * spacing, z * spacing), new THREE.Vector3(x * spacing, y * spacing, (z + 1) * spacing)];
                push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), bondMat));
              }
            }
          }
        }
        push(mkSprite("Na⁺ (blue)  Cl⁻ (green)  Electrostatic lattice", "#94a3b8", new THREE.Vector3(0, -3.5, 0), 0.9));
      };

      const buildExtended = () => {
        clearDynamic();
        const spacing = 1.8;
        const naColor = 0x3b82f6;
        const clColor = 0x22c55e;

        for (let x = -2; x <= 2; x++) {
          for (let y = -2; y <= 2; y++) {
            for (let z = -2; z <= 2; z++) {
              if (Math.abs(x) === 2 || Math.abs(y) === 2 || Math.abs(z) === 2) {
                const isNa = (x + y + z) % 2 === 0;
                const radius = isNa ? 0.45 : 0.65;
                const color = isNa ? naColor : clColor;

                const sphere = push(new THREE.Mesh(
                  new THREE.SphereGeometry(radius, 20, 20),
                  new THREE.MeshPhongMaterial({ color, emissive: color, emissiveIntensity: 0.15, shininess: 60, transparent: true, opacity: 0.85 }),
                ));
                sphere.position.set(x * spacing, y * spacing, z * spacing);
                if (isNa) sphere.add(mkSprite("Na⁺", "#3b82f6", new THREE.Vector3(0, radius + 0.35, 0)));
                else sphere.add(mkSprite("Cl⁻", "#22c55e", new THREE.Vector3(0, radius + 0.35, 0)));
              }
            }
          }
        }
        push(mkSprite("Extended NaCl Crystal Lattice — Surface View", "#94a3b8", new THREE.Vector3(0, -3.5, 0), 0.9));
      };

      if (view === "extended") buildExtended();
      else buildLattice();

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
    return <WebGLFallback title="Ionic Bond" description="NaCl lattice visualization — requires WebGL." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Ionic Bond — NaCl Crystal Lattice</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate · Scroll to zoom</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Lattice View">
          <div className="flex gap-2 mt-1">
            {([
              { value: "unit-cell", label: "Unit Cell" },
              { value: "extended", label: "Extended" },
              { value: "ion-sizes", label: "Ion Sizes" },
            ] as const).map((opt) => (
              <button
                key={opt.value}
                onClick={() => setView(opt.value as LatticeView)}
                className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${
                  view === opt.value ? "bg-blue-500/20 border-blue-500 text-blue-300" : "bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-500"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </CollapsibleControls>
        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />
        <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-green-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Ionic bond:</strong> Electrostatic attraction between oppositely charged ions formed by electron transfer.</p>
            <p><strong className="text-foreground">Crystal lattice:</strong> Regular 3D arrangement of ions in a repeating pattern (NaCl = face-centered cubic).</p>
            <p><strong className="text-foreground">Na⁺ (blue, small):</strong> Lost electron, smaller ionic radius.</p>
            <p><strong className="text-foreground">Cl⁻ (green, large):</strong> Gained electron, larger ionic radius due to increased electron-electron repulsion.</p>
            <p><strong className="text-foreground">Properties:</strong> High melting point, brittle, conducts when molten or dissolved.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}