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
  ctx.font = "bold 20px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = color;
  ctx.fillText(text, 256, 48);
  const tex = new THREE.CanvasTexture(canvas);
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false }));
  s.position.copy(pos);
  s.scale.set(5.0 * scale, 0.94 * scale, 1);
  return s;
}

type ForceType = "vdw" | "hbond";

export function VanderWaalsVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [force, setForce] = useState<ForceType>("vdw");
  const [isWebGL, setIsWebGL] = useState(true);

  useEffect(() => { setIsWebGL(isWebGLAvailable()); }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isWebGL) return;

    let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer;
    let controls: any, frameId: number;
    const meshes: THREE.Object3D[] = [];
    const animRef = { time: 0 };

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
      controls.autoRotateSpeed = 0.2;
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

      const buildVdW = () => {
        clearDynamic();
        animRef.time = 0;

        // Two nonpolar molecules (e.g., Ar or N2)
        const mol1 = new THREE.Group();
        const mol2 = new THREE.Group();

        // Atom 1
        const atom1 = new THREE.Mesh(
          new THREE.SphereGeometry(0.4, 20, 20),
          new THREE.MeshPhongMaterial({ color: 0x60a5fa, emissive: 0x3b82f6, emissiveIntensity: 0.3 }),
        );
        mol1.add(atom1);

        // Atom 2
        const atom2 = new THREE.Mesh(
          new THREE.SphereGeometry(0.4, 20, 20),
          new THREE.MeshPhongMaterial({ color: 0x60a5fa, emissive: 0x3b82f6, emissiveIntensity: 0.3 }),
        );
        atom2.position.set(0.8, 0, 0);
        mol1.add(atom2);

        // Atom 3
        const atom3 = new THREE.Mesh(
          new THREE.SphereGeometry(0.4, 20, 20),
          new THREE.MeshPhongMaterial({ color: 0x60a5fa, emissive: 0x3b82f6, emissiveIntensity: 0.3 }),
        );
        mol2.add(atom3);

        // Atom 4
        const atom4 = new THREE.Mesh(
          new THREE.SphereGeometry(0.4, 20, 20),
          new THREE.MeshPhongMaterial({ color: 0x60a5fa, emissive: 0x3b82f6, emissiveIntensity: 0.3 }),
        );
        atom4.position.set(0.8, 0, 0);
        mol2.add(atom4);

        mol1.position.set(-2, 0, 0);
        mol2.position.set(2, 0, 0);

        push(mol1);
        push(mol2);

        // Electron clouds (translucent spheres)
        const cloudMat = new THREE.MeshPhongMaterial({
          color: 0x60a5fa, transparent: true, opacity: 0.15,
        });
        const cloud1 = push(new THREE.Mesh(new THREE.SphereGeometry(0.7, 16, 16), cloudMat));
        cloud1.position.set(-2, 0, 0);
        const cloud2 = push(new THREE.Mesh(new THREE.SphereGeometry(0.7, 16, 16), cloudMat));
        cloud2.position.set(-1.2, 0, 0);
        const cloud3 = push(new THREE.Mesh(new THREE.SphereGeometry(0.7, 16, 16), cloudMat));
        cloud3.position.set(2, 0, 0);
        const cloud4 = push(new THREE.Mesh(new THREE.SphereGeometry(0.7, 16, 16), cloudMat));
        cloud4.position.set(2.8, 0, 0);

        // Van der Waals attraction arrows
        const arrowMat = new THREE.LineBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.6 });
        const arrowPts = [new THREE.Vector3(-0.5, 0, 0), new THREE.Vector3(0.5, 0, 0)];
        const arrowLine = push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(arrowPts), arrowMat));

        // Labels
        push(mkSprite("Ar···Ar", "#60a5fa", new THREE.Vector3(-2, -1.0, 0), 0.8));
        push(mkSprite("Ar···Ar", "#60a5fa", new THREE.Vector3(2, -1.0, 0), 0.8));
        push(mkSprite("Weak attraction: London dispersion forces", "#f59e0b", new THREE.Vector3(0, -2.0, 0), 0.9));
      };

      const buildHbond = () => {
        clearDynamic();
        animRef.time = 0;

        // Water molecules
        const buildWater = (x: number, y: number) => {
          const group = new THREE.Group();

          // Oxygen
          const o = new THREE.Mesh(
            new THREE.SphereGeometry(0.35, 16, 16),
            new THREE.MeshPhongMaterial({ color: 0xef4444, emissive: 0x991b1b, emissiveIntensity: 0.4 }),
          );
          group.add(o);

          // Hydrogens
          const hMat = new THREE.MeshPhongMaterial({ color: 0xf8fafc, emissive: 0xe2e8f0, emissiveIntensity: 0.3 });
          const h1 = new THREE.Mesh(new THREE.SphereGeometry(0.2, 12, 12), hMat);
          h1.position.set(-0.25, -0.25, 0);
          group.add(h1);
          const h2 = new THREE.Mesh(new THREE.SphereGeometry(0.2, 12, 12), hMat);
          h2.position.set(0.25, -0.25, 0);
          group.add(h2);

          group.position.set(x, y, 0);
          return group;
        };

        const mol1 = push(buildWater(-1.5, 0.5));
        const mol2 = push(buildWater(1.5, -0.5));

        // H-bond (dashed line)
        const bondPts = [
          new THREE.Vector3(-1.0, 0.3, 0),
          new THREE.Vector3(1.0, -0.3, 0),
        ];
        const bondLine = push(new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(bondPts),
          new THREE.LineDashedMaterial({ color: 0x22c55e, dashSize: 0.15, gapSize: 0.1, transparent: true, opacity: 0.8 }),
        ));
        bondLine.computeLineDistances();

        // Labels
        push(mkSprite("H-O···H-O", "#22c55e", new THREE.Vector3(0, 1.5, 0), 0.8));
        push(mkSprite("Hydrogen Bond: Dipoles attract", "#22c55e", new THREE.Vector3(0, -2.0, 0), 0.9));
      };

      const builders: Record<ForceType, () => void> = { vdw: buildVdW, hbond: buildHbond };
      builders[force]();

      const animate = () => {
        frameId = requestAnimationFrame(animate);
        animRef.time += 0.01;

        // Gentle floating animation
        meshes.forEach((m, i) => {
          if (m instanceof THREE.Group) {
            m.position.y += Math.sin(animRef.time * 2 + i) * 0.002;
          }
        });

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
          else if (m instanceof THREE.Line) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
        });
        renderer.dispose();
        controls.dispose?.();
      };
    };

    const cleanup = init();
    return () => { cleanup.then((d) => d?.()); };
  }, [force, isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="Vander Waals & H-bond" description="Intermolecular forces visualization — requires WebGL." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Vander Waals & Hydrogen Bonding</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate · Scroll to zoom</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Intermolecular Force">
          <div className="flex gap-2 mt-1">
            {([
              { value: "vdw", label: "London Dispersion" },
              { value: "hbond", label: "Hydrogen Bond" },
            ] as const).map((opt) => (
              <button
                key={opt.value}
                onClick={() => setForce(opt.value as ForceType)}
                className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${
                  force === opt.value ? "bg-teal-500/20 border-teal-500 text-teal-300" : "bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-500"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </CollapsibleControls>
        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />
        <div className="rounded-lg border border-teal-500/30 bg-teal-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-teal-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">London dispersion forces:</strong> Temporary dipoles induced in nonpolar molecules. Weakest intermolecular force.</p>
            <p><strong className="text-foreground">Hydrogen bonding:</strong> Strong dipole-dipole attraction when H is bonded to N, O, or F. Important in water and DNA.</p>
            <p><strong className="text-foreground">Strength order:</strong> H-bond &gt; dipole-dipole &gt; London dispersion.</p>
            <p><strong className="text-foreground">Effects:</strong> Intermolecular forces affect boiling point, melting point, and solubility.</p>
            <p><strong className="text-foreground">Water:</strong> Hydrogen bonding explains water's high boiling point and ice floating.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}