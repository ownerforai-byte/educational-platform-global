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
  ctx.font = "bold 22px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = color;
  ctx.fillText(text, 256, 48);
  const tex = new THREE.CanvasTexture(canvas);
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false }));
  s.position.copy(pos);
  s.scale.set(4.5 * scale, 0.85 * scale, 1);
  return s;
}

type MetalType = "simple" | "alloy" | "ions";

export function MetallicBondVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<MetalType>("simple");
  const [isWebGL, setIsWebGL] = useState(true);

  useEffect(() => { setIsWebGL(isWebGLAvailable()); }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isWebGL) return;

    let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer;
    let controls: any, frameId: number;
    const meshes: THREE.Object3D[] = [];
    const electronMeshes: THREE.Group[] = [];

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
      const pushElectron = <T extends THREE.Object3D>(o: T): T => { const g = new THREE.Group(); g.add(o); scene.add(g); electronMeshes.push(g); meshes.push(g); return o; };

      const clearDynamic = () => {
        while (meshes.length > 2) {
          const m = meshes.pop()!;
          scene.remove(m);
          if (m instanceof THREE.Mesh) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Sprite) { const sm = m.material as THREE.SpriteMaterial; sm.map?.dispose?.(); sm.dispose(); }
        }
        while (electronMeshes.length > 0) {
          const g = electronMeshes.pop()!;
          scene.remove(g);
          g.traverse((c) => {
            if ((c as THREE.Mesh).geometry) (c as THREE.Mesh).geometry.dispose();
            const mat = (c as THREE.Mesh).material;
            if (mat) mat.dispose();
          });
        }
      };

      const buildSimple = () => {
        clearDynamic();
        const spacing = 1.5;
        const metalColor = 0xf59e0b; // Gold

        // Metal cations in lattice
        for (let x = -2; x <= 2; x++) {
          for (let y = -2; y <= 2; y++) {
            const isNa = (x + y) % 2 === 0;
            const radius = isNa ? 0.5 : 0.45;

            const cation = push(new THREE.Mesh(
              new THREE.SphereGeometry(radius, 20, 20),
              new THREE.MeshPhongMaterial({
                color: metalColor,
                emissive: metalColor,
                emissiveIntensity: 0.3,
                shininess: 80,
                transparent: true,
                opacity: 0.85,
              }),
            ));
            cation.position.set(x * spacing, y * spacing, 0);
            cation.add(mkSprite("M+", "#f59e0b", new THREE.Vector3(0, radius + 0.3, 0), 0.7));
          }
        }

        // Sea of electrons (glowing plane)
        const electronSea = push(new THREE.Mesh(
          new THREE.PlaneGeometry(8, 8, 20, 20),
          new THREE.MeshPhongMaterial({
            color: 0x3b82f6,
            transparent: true,
            opacity: 0.15,
            side: THREE.DoubleSide,
            emissive: 0x3b82f6,
            emissiveIntensity: 0.5,
          }),
        ));
        electronSea.rotation.x = -Math.PI / 2;
        electronSea.position.y = -0.3;

        // Free electrons as small moving particles
        const electronMat = new THREE.MeshPhongMaterial({
          color: 0x60a5fa,
          emissive: 0x3b82f6,
          emissiveIntensity: 0.8,
        });

        for (let i = 0; i < 20; i++) {
          const electron = pushElectron(new THREE.Mesh(
            new THREE.SphereGeometry(0.08, 8, 8),
            electronMat.clone(),
          ));
          electron.position.set(
            (Math.random() - 0.5) * 6,
            -0.3 + Math.random() * 0.6,
            (Math.random() - 0.5) * 6,
          );
        }

        push(mkSprite("Metallic Bond: Cations in sea of electrons", "#f59e0b", new THREE.Vector3(0, -3.5, 0), 0.9));
      };

      const buildAlloy = () => {
        clearDynamic();
        const spacing = 1.5;

        // Copper atoms
        const cuColor = 0xb45309;
        // Zinc atoms
        const znColor = 0x6b7280;

        for (let x = -2; x <= 2; x++) {
          for (let y = -2; y <= 2; y++) {
            const isCu = Math.random() > 0.5;
            const color = isCu ? cuColor : znColor;
            const radius = isCu ? 0.5 : 0.48;

            const cation = push(new THREE.Mesh(
              new THREE.SphereGeometry(radius, 20, 20),
              new THREE.MeshPhongMaterial({
                color,
                emissive: color,
                emissiveIntensity: 0.3,
                shininess: 80,
                transparent: true,
                opacity: 0.85,
              }),
            ));
            cation.position.set(x * spacing, y * spacing, 0);
            cation.add(mkSprite(isCu ? "Cu" : "Zn", isCu ? "#b45309" : "#6b7280", new THREE.Vector3(0, radius + 0.3, 0), 0.7));
          }
        }

        // Electron sea
        const electronSea = push(new THREE.Mesh(
          new THREE.PlaneGeometry(8, 8, 20, 20),
          new THREE.MeshPhongMaterial({
            color: 0x3b82f6,
            transparent: true,
            opacity: 0.15,
            side: THREE.DoubleSide,
            emissive: 0x3b82f6,
            emissiveIntensity: 0.5,
          }),
        ));
        electronSea.rotation.x = -Math.PI / 2;
        electronSea.position.y = -0.3;

        push(mkSprite("Brass (Cu-Zn Alloy): Mixed metal lattice", "#b45309", new THREE.Vector3(0, -3.5, 0), 0.9));
      };

      const buildIons = () => {
        clearDynamic();
        const spacing = 1.8;
        const metalColor = 0xf59e0b;

        // 2D cross-section of metal lattice
        for (let x = -1; x <= 1; x++) {
          for (let y = -1; y <= 1; y++) {
            const cation = push(new THREE.Mesh(
              new THREE.SphereGeometry(0.6, 20, 20),
              new THREE.MeshPhongMaterial({
                color: metalColor,
                emissive: metalColor,
                emissiveIntensity: 0.4,
                shininess: 80,
              }),
            ));
            cation.position.set(x * spacing, y * spacing, 0);
            cation.add(mkSprite("M+", "#f59e0b", new THREE.Vector3(0, 0.9, 0), 0.9));
          }
        }

        // Delocalized electron cloud
        const cloudGeo = new THREE.SphereGeometry(2.5, 32, 32);
        const cloudMat = new THREE.MeshPhongMaterial({
          color: 0x60a5fa,
          transparent: true,
          opacity: 0.1,
          side: THREE.DoubleSide,
          emissive: 0x3b82f6,
          emissiveIntensity: 0.3,
        });
        const cloud = push(new THREE.Mesh(cloudGeo, cloudMat));
        cloud.position.set(0, 0, 0);

        // Free electrons orbiting
        const electronMat = new THREE.MeshPhongMaterial({
          color: 0x60a5fa,
          emissive: 0x3b82f6,
          emissiveIntensity: 0.8,
        });
        for (let i = 0; i < 12; i++) {
          const angle = (i / 12) * Math.PI * 2;
          const radius = 1.2;
          const electron = push(new THREE.Mesh(
            new THREE.SphereGeometry(0.1, 8, 8),
            electronMat.clone(),
          ));
          electron.position.set(
            Math.cos(angle) * radius,
            Math.sin(angle) * radius,
            0,
          );
        }

        push(mkSprite("Metallic Bond: Positive ions in electron sea", "#f59e0b", new THREE.Vector3(0, -3.0, 0), 0.9));
      };

      const builders: Record<MetalType, () => void> = { simple: buildSimple, alloy: buildAlloy, ions: buildIons };
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
        electronMeshes.forEach((g) => {
          scene.remove(g);
          g.traverse((c) => {
            if ((c as THREE.Mesh).geometry) (c as THREE.Mesh).geometry.dispose();
            const mat = (c as THREE.Mesh).material;
            if (mat) mat.dispose();
          });
        });
        renderer.dispose();
        controls.dispose?.();
      };
    };

    const cleanup = init();
    return () => { cleanup.then((d) => d?.()); };
  }, [view, isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="Metallic Bonding" description="Sea of electrons visualization — requires WebGL." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Metallic Bonding — Sea of Electrons</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate · Scroll to zoom</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Metallic Structure">
          <div className="flex gap-2 mt-1">
            {([
              { value: "simple", label: "Simple Metal" },
              { value: "alloy", label: "Alloy" },
              { value: "ions", label: "Ion View" },
            ] as const).map((opt) => (
              <button
                key={opt.value}
                onClick={() => setView(opt.value as MetalType)}
                className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${
                  view === opt.value ? "bg-amber-500/20 border-amber-500 text-amber-300" : "bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-500"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </CollapsibleControls>
        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Metallic bond:</strong> Electrostatic attraction between positive metal ions and delocalized electrons.</p>
            <p><strong className="text-foreground">Sea of electrons:</strong> Valence electrons are delocalized and free to move throughout the metal lattice.</p>
            <p><strong className="text-foreground">Properties explained:</strong> Electrical conductivity (free electrons), malleability (ions slide), luster (electron interaction with light).</p>
            <p><strong className="text-foreground">Alloys:</strong> Mixtures of metals with different sized atoms disrupt regular structure, making harder materials.</p>
            <p><strong className="text-foreground">Brass:</strong> Copper-zinc alloy shown here — harder than pure copper due to disrupted lattice.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}