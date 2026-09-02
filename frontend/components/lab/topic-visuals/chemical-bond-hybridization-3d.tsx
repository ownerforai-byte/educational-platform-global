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

type OrbitalType = "sp3" | "sp2" | "sp";

export function HybridizationVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [orbital, setOrbital] = useState<OrbitalType>("sp3");
  const [isWebGL, setIsWebGL] = useState(true);

  useEffect(() => { setIsWebGL(isWebGLAvailable()); }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isWebGL) return;

    let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer;
    let controls: any, frameId: number;
    const meshes: THREE.Object3D[] = [];
    const orbitalMeshes: THREE.Group[] = [];

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
      controls.autoRotateSpeed = 0.4;
      controls.minDistance = 3;
      controls.maxDistance = 15;

      scene.add(new THREE.AmbientLight(0xffffff, 0.8));
      const dir = new THREE.DirectionalLight(0xffffff, 1.0);
      dir.position.set(6, 10, 6);
      scene.add(dir);

      const push = <T extends THREE.Object3D>(o: T): T => { scene.add(o); meshes.push(o); return o; };
      const pushOrbital = <T extends THREE.Object3D>(o: T): T => { const g = new THREE.Group(); g.add(o); scene.add(g); orbitalMeshes.push(g); meshes.push(g); return o; };

      const clearDynamic = () => {
        while (meshes.length > 2) {
          const m = meshes.pop()!;
          scene.remove(m);
          if (m instanceof THREE.Mesh) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Sprite) { const sm = m.material as THREE.SpriteMaterial; sm.map?.dispose?.(); sm.dispose(); }
        }
        while (orbitalMeshes.length > 0) {
          const g = orbitalMeshes.pop()!;
          scene.remove(g);
          g.traverse((c) => {
            if ((c as THREE.Mesh).geometry) (c as THREE.Mesh).geometry.dispose();
            const mat = (c as THREE.Mesh).material;
            if (mat) mat.dispose();
          });
        }
      };

      const buildSP3 = () => {
        clearDynamic();
        // Central atom
        const central = push(new THREE.Mesh(
          new THREE.SphereGeometry(0.4, 20, 20),
          new THREE.MeshPhongMaterial({ color: 0x8b5cf6, emissive: 0x6d28d9, emissiveIntensity: 0.5 }),
        ));
        central.position.set(0, 0, 0);
        central.add(mkSprite("C (sp3)", "#8b5cf6", new THREE.Vector3(0, 0.6, 0), 0.8));

        // Four sp3 orbitals in tetrahedral arrangement
        const angles = [
          { theta: Math.acos(-1/3), phi: 0 },
          { theta: Math.acos(-1/3), phi: Math.PI * 2/3 },
          { theta: Math.acos(-1/3), phi: Math.PI * 4/3 },
          { theta: Math.acos(1/3), phi: 0 },
        ];

        const lobeColor = 0xa78bfa;
        const lobeMat = new THREE.MeshPhongMaterial({
          color: lobeColor,
          transparent: true,
          opacity: 0.6,
          side: THREE.DoubleSide,
          emissive: lobeColor,
          emissiveIntensity: 0.2,
        });

        angles.forEach((a, i) => {
          const r = 2.0;
          const x = r * Math.sin(a.theta) * Math.cos(a.phi);
          const y = r * Math.cos(a.theta);
          const z = r * Math.sin(a.theta) * Math.sin(a.phi);
          const pos = new THREE.Vector3(x, y, z);

          // Create dumbbell-shaped orbital using two spheres
          const lobe1 = pushOrbital(new THREE.Mesh(
            new THREE.SphereGeometry(0.35, 16, 16),
            lobeMat.clone(),
          ));
          lobe1.position.copy(pos.clone().multiplyScalar(0.6));

          const lobe2 = pushOrbital(new THREE.Mesh(
            new THREE.SphereGeometry(0.25, 16, 16),
            lobeMat.clone(),
          ));
          lobe2.position.copy(pos.clone().multiplyScalar(-0.3));

          // Node plane
          const nodeGeo = new THREE.PlaneGeometry(0.8, 0.8);
          const nodeMat = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.15,
            side: THREE.DoubleSide,
          });
          const node = pushOrbital(new THREE.Mesh(nodeGeo, nodeMat));
          node.position.copy(pos.clone().multiplyScalar(0.15));
          node.lookAt(pos);
        });

        // Add H atoms at ends
        const hMat = new THREE.MeshPhongMaterial({ color: 0xf8fafc, emissive: 0xe2e8f0, emissiveIntensity: 0.3 });
        angles.forEach((a) => {
          const r = 2.0;
          const x = r * Math.sin(a.theta) * Math.cos(a.phi);
          const y = r * Math.cos(a.theta);
          const z = r * Math.sin(a.theta) * Math.sin(a.phi);
          const pos = new THREE.Vector3(x, y, z);

          const h = push(new THREE.Mesh(new THREE.SphereGeometry(0.25, 12, 12), hMat));
          h.position.copy(pos);
          h.add(mkSprite("H", "#f8fafc", pos.clone().normalize().multiplyScalar(0.5), 0.6));
        });

        push(mkSprite("sp3: Tetrahedral · 109.5 deg · CH4", "#a78bfa", new THREE.Vector3(0, -2.5, 0), 0.9));
      };

      const buildSP2 = () => {
        clearDynamic();
        const central = push(new THREE.Mesh(
          new THREE.SphereGeometry(0.4, 20, 20),
          new THREE.MeshPhongMaterial({ color: 0x8b5cf6, emissive: 0x6d28d9, emissiveIntensity: 0.5 }),
        ));
        central.position.set(0, 0, 0);
        central.add(mkSprite("C (sp2)", "#8b5cf6", new THREE.Vector3(0, 0.6, 0), 0.8));

        // Three sp2 orbitals in trigonal planar
        const angles = [0, 120, 240].map((deg) => deg * (Math.PI / 180));
        const lobeColor = 0xa78bfa;
        const lobeMat = new THREE.MeshPhongMaterial({
          color: lobeColor, transparent: true, opacity: 0.6, side: THREE.DoubleSide,
          emissive: lobeColor, emissiveIntensity: 0.2,
        });

        angles.forEach((a, i) => {
          const r = 2.0;
          const x = r * Math.cos(a);
          const y = r * Math.sin(a);
          const pos = new THREE.Vector3(x, y, 0);

          const lobe1 = pushOrbital(new THREE.Mesh(new THREE.SphereGeometry(0.35, 16, 16), lobeMat.clone()));
          lobe1.position.copy(pos.clone().multiplyScalar(0.6));

          const lobe2 = pushOrbital(new THREE.Mesh(new THREE.SphereGeometry(0.25, 16, 16), lobeMat.clone()));
          lobe2.position.copy(pos.clone().multiplyScalar(-0.3));
        });

        // Unhybridized p orbital (perpendicular)
        const pMat = new THREE.MeshPhongMaterial({
          color: 0xf472b6, transparent: true, opacity: 0.5, side: THREE.DoubleSide,
          emissive: 0xf472b6, emissiveIntensity: 0.2,
        });
        const pLobe1 = pushOrbital(new THREE.Mesh(new THREE.SphereGeometry(0.3, 16, 16), pMat));
        pLobe1.position.set(0, 0, 1.0);
        const pLobe2 = pushOrbital(new THREE.Mesh(new THREE.SphereGeometry(0.3, 16, 16), pMat));
        pLobe2.position.set(0, 0, -1.0);

        // Node plane for p orbital
        const nodeGeo = new THREE.PlaneGeometry(1.5, 1.5);
        const nodeMat = new THREE.MeshPhongMaterial({ color: 0xffffff, transparent: true, opacity: 0.1, side: THREE.DoubleSide });
        const node = pushOrbital(new THREE.Mesh(nodeGeo, nodeMat));
        node.rotation.x = Math.PI / 2;

        // H atoms
        const hMat = new THREE.MeshPhongMaterial({ color: 0xf8fafc, emissive: 0xe2e8f0, emissiveIntensity: 0.3 });
        angles.forEach((a) => {
          const r = 2.0;
          const pos = new THREE.Vector3(r * Math.cos(a), r * Math.sin(a), 0);
          const h = push(new THREE.Mesh(new THREE.SphereGeometry(0.25, 12, 12), hMat));
          h.position.copy(pos);
          h.add(mkSprite("H", "#f8fafc", pos.clone().normalize().multiplyScalar(0.5), 0.6));
        });

        push(mkSprite("sp2: Trigonal Planar · 120 deg · C2H4", "#a78bfa", new THREE.Vector3(0, -2.5, 0), 0.9));
      };

      const buildSP = () => {
        clearDynamic();
        const central = push(new THREE.Mesh(
          new THREE.SphereGeometry(0.4, 20, 20),
          new THREE.MeshPhongMaterial({ color: 0x8b5cf6, emissive: 0x6d28d9, emissiveIntensity: 0.5 }),
        ));
        central.position.set(0, 0, 0);
        central.add(mkSprite("C (sp)", "#8b5cf6", new THREE.Vector3(0, 0.6, 0), 0.8));

        // Two sp orbitals linear
        const lobeColor = 0xa78bfa;
        const lobeMat = new THREE.MeshPhongMaterial({
          color: lobeColor, transparent: true, opacity: 0.6, side: THREE.DoubleSide,
          emissive: lobeColor, emissiveIntensity: 0.2,
        });

        [1, -1].forEach((sign) => {
          const pos = new THREE.Vector3(sign * 2.0, 0, 0);
          const lobe1 = pushOrbital(new THREE.Mesh(new THREE.SphereGeometry(0.35, 16, 16), lobeMat.clone()));
          lobe1.position.copy(pos.clone().multiplyScalar(0.6));
          const lobe2 = pushOrbital(new THREE.Mesh(new THREE.SphereGeometry(0.25, 16, 16), lobeMat.clone()));
          lobe2.position.copy(pos.clone().multiplyScalar(-0.3));
        });

        // Two unhybridized p orbitals (perpendicular)
        const pMat = new THREE.MeshPhongMaterial({
          color: 0xf472b6, transparent: true, opacity: 0.5, side: THREE.DoubleSide,
          emissive: 0xf472b6, emissiveIntensity: 0.2,
        });

        // p_y orbital
        const py1 = pushOrbital(new THREE.Mesh(new THREE.SphereGeometry(0.25, 16, 16), pMat));
        py1.position.set(0, 0.8, 0);
        const py2 = pushOrbital(new THREE.Mesh(new THREE.SphereGeometry(0.25, 16, 16), pMat));
        py2.position.set(0, -0.8, 0);

        // p_z orbital
        const pz1 = pushOrbital(new THREE.Mesh(new THREE.SphereGeometry(0.25, 16, 16), pMat));
        pz1.position.set(0, 0, 0.8);
        const pz2 = pushOrbital(new THREE.Mesh(new THREE.SphereGeometry(0.25, 16, 16), pMat));
        pz2.position.set(0, 0, -0.8);

        // H atoms
        const hMat = new THREE.MeshPhongMaterial({ color: 0xf8fafc, emissive: 0xe2e8f0, emissiveIntensity: 0.3 });
        [-2.0, 2.0].forEach((x) => {
          const h = push(new THREE.Mesh(new THREE.SphereGeometry(0.25, 12, 12), hMat));
          h.position.set(x, 0, 0);
          h.add(mkSprite("H", "#f8fafc", new THREE.Vector3(x > 0 ? 0.5 : -0.5, 0, 0), 0.6));
        });

        push(mkSprite("sp: Linear · 180 deg · C2H2", "#a78bfa", new THREE.Vector3(0, -2.5, 0), 0.9));
      };

      const builders: Record<OrbitalType, () => void> = { sp3: buildSP3, sp2: buildSP2, sp: buildSP };
      builders[orbital]();

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
        orbitalMeshes.forEach((g) => {
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
  }, [orbital, isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="Hybridization" description="sp3/sp2/sp orbital visualization — requires WebGL." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Hybridization — Atomic Orbitals</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate · Scroll to zoom</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Orbital Type">
          <div className="grid grid-cols-3 gap-2 mt-1">
            {([
              { value: "sp3", label: "sp3" },
              { value: "sp2", label: "sp2" },
              { value: "sp", label: "sp" },
            ] as const).map((orb) => (
              <button
                key={orb.value}
                onClick={() => setOrbital(orb.value as OrbitalType)}
                className={`px-2 py-2 text-xs rounded-md border transition-colors ${
                  orbital === orb.value ? "bg-violet-500/20 border-violet-500 text-violet-300" : "bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-500"
                }`}
              >
                {orb.label}
              </button>
            ))}
          </div>
        </CollapsibleControls>
        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />
        <div className="rounded-lg border border-violet-500/30 bg-violet-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-violet-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Hybridization:</strong> Mixing of atomic orbitals to form new hybrid orbitals suitable for bonding.</p>
            <p><strong className="text-foreground">sp3:</strong> One s + three p orbitals → four equivalent orbitals. Tetrahedral geometry (109.5). Example: CH4.</p>
            <p><strong className="text-foreground">sp2:</strong> One s + two p orbitals → three equivalent orbitals. Trigonal planar (120). Example: C2H4.</p>
            <p><strong className="text-foreground">sp:</strong> One s + one p orbital → two equivalent orbitals. Linear (180). Example: C2H2.</p>
            <p><strong className="text-foreground">Unhybridized p:</strong> Remaining p orbitals form pi bonds in double/triple bonds.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}