"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallback } from "@/components/lab/webgl-fallback";
import * as THREE from "three";

/* ============================================================
   Angiosperm Morphology — NEB Biology 11 (Floral Diversity)
   Shows flower parts: sepal, petal, stamen, carpel, ovule.
   ============================================================ */

function mkSprite(text: string, color: string, pos: THREE.Vector3, scale = 1.0): THREE.Sprite {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 96;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "rgba(15, 23, 42, 0.92)";
  ctx.fillRect(4, 4, 504, 88);
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.strokeRect(4, 4, 504, 88);
  ctx.font = "bold 30px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = color;
  ctx.fillText(text, 256, 48);
  const tex = new THREE.CanvasTexture(canvas);
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false }));
  s.position.copy(pos);
  s.scale.set(3.2 * scale, 0.6 * scale, 1);
  return s;
}

function addLabel(meshes: THREE.Object3D[], text: string, color: number, labelPos: THREE.Vector3, targetPos: THREE.Vector3) {
  const dir = targetPos.clone().sub(labelPos).normalize();
  const len = labelPos.distanceTo(targetPos);
  meshes.push(new THREE.ArrowHelper(dir, labelPos, len * 0.85, color, 0.22, 0.14) as any);
  const lp = labelPos.clone().sub(dir.clone().multiplyScalar(0.45));
  meshes.push(mkSprite(text, `#${color.toString(16).padStart(6, "0")}`, lp, 0.85));
}

export function AngiospermVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
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
      camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
      camera.position.set(0, 4, 12);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.autoRotate = false;
      controls.minDistance = 4;
      controls.maxDistance = 20;

      scene.add(new THREE.AmbientLight(0xffffff, 0.7));
      const dl = new THREE.DirectionalLight(0xffffff, 0.9);
      dl.position.set(4, 8, 5);
      scene.add(dl);

      const push = <T extends THREE.Object3D>(o: T): T => { scene.add(o); meshes.push(o); return o; };

      // Sepals (calyx) — outermost whorl
      const sepalPositions = [
        new THREE.Vector3(1.2, 0.3, 0), new THREE.Vector3(-0.6, 0.3, 1.04),
        new THREE.Vector3(-0.6, 0.3, -1.04),
      ];
      const sepals: THREE.Mesh[] = [];
      for (const sp of sepalPositions) {
        const sepal = push(new THREE.Mesh(
          new THREE.PlaneGeometry(0.5, 0.8),
          new THREE.MeshPhongMaterial({ color: 0x22c55e, side: THREE.DoubleSide }),
        ));
        sepal.position.copy(sp);
        sepal.rotation.set(0.3, sp.x > 0 ? -0.5 : 0.5, sp.z > 0 ? -0.3 : 0.3);
        sepals.push(sepal);
      }

      // Petals (corolla) — colorful inner whorl
      const petalColors = [0xef4444, 0xf97316, 0xfbbf24, 0x22c55e, 0x3b82f6, 0xa78bfa];
      const petalPositions = [
        new THREE.Vector3(0.9, 0.8, 0), new THREE.Vector3(-0.45, 0.8, 0.78),
        new THREE.Vector3(-0.45, 0.8, -0.78), new THREE.Vector3(0.2, 0.8, 0.9),
        new THREE.Vector3(0.2, 0.8, -0.9), new THREE.Vector3(-0.9, 0.8, 0),
      ];
      const petals: THREE.Mesh[] = [];
      for (let i = 0; i < 6; i++) {
        const petal = push(new THREE.Mesh(
          new THREE.PlaneGeometry(0.6, 0.9),
          new THREE.MeshPhongMaterial({ color: petalColors[i], side: THREE.DoubleSide, transparent: true, opacity: 0.85 }),
        ));
        petal.position.copy(petalPositions[i]);
        const angle = Math.atan2(petalPositions[i].z, petalPositions[i].x);
        petal.rotation.y = -angle;
        petal.rotation.z = 0.2;
        petals.push(petal);
      }

      // Stamen (male) — anther + filament
      const stamenPositions = [
        { pos: new THREE.Vector3(0.4, 1.5, 0.4), rot: [0.1, 0.3, 0.15] },
        { pos: new THREE.Vector3(-0.4, 1.5, 0.4), rot: [0.1, -0.3, -0.15] },
        { pos: new THREE.Vector3(0, 1.5, -0.5), rot: [0.1, 0, -0.2] },
      ];
      const stamens: THREE.Mesh[] = [];
      for (const sp of stamenPositions) {
        const filament = push(new THREE.Mesh(
          new THREE.CylinderGeometry(0.03, 0.03, 0.5, 6),
          new THREE.MeshPhongMaterial({ color: 0x4ade80 }),
        ));
        filament.position.copy(sp.pos);
        filament.rotation.set(sp.rot[0], sp.rot[1], sp.rot[2]);
        const anther = push(new THREE.Mesh(
          new THREE.SphereGeometry(0.1, 8, 6),
          new THREE.MeshPhongMaterial({ color: 0xfbbf24 }),
        ));
        anther.position.set(
          sp.pos.x + Math.sin(sp.rot[2]) * 0.25,
          sp.pos.y + Math.cos(sp.rot[0]) * 0.25,
          sp.pos.z
        );
        stamens.push(filament);
      }

      // Carpel (female) — stigma, style, ovary
      const ovary = push(new THREE.Mesh(
        new THREE.SphereGeometry(0.3, 12, 10),
        new THREE.MeshPhongMaterial({ color: 0x22c55e }),
      ));
      ovary.position.set(0, 1.0, 0);
      const style = push(new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.04, 0.6, 6),
        new THREE.MeshPhongMaterial({ color: 0x4ade80 }),
      ));
      style.position.set(0, 1.55, 0);
      const stigma = push(new THREE.Mesh(
        new THREE.SphereGeometry(0.1, 8, 6),
        new THREE.MeshPhongMaterial({ color: 0xfbbf24 }),
      ));
      stigma.position.set(0, 1.9, 0);

      // Ovules inside ovary (cross-section view)
      const ovulePositions = [
        new THREE.Vector3(0.1, 0.95, 0.1),
        new THREE.Vector3(-0.1, 0.9, -0.05),
        new THREE.Vector3(0, 0.85, 0.15),
      ];
      for (const op of ovulePositions) {
        const ovule = push(new THREE.Mesh(
          new THREE.SphereGeometry(0.06, 8, 6),
          new THREE.MeshPhongMaterial({ color: 0x92400e }),
        ));
        ovule.position.copy(op);
      }

      // Pedicel (flower stalk)
      const pedicel = push(new THREE.Mesh(
        new THREE.CylinderGeometry(0.08, 0.1, 0.8, 8),
        new THREE.MeshPhongMaterial({ color: 0x22c55e }),
      ));
      pedicel.position.set(0, 0.4, 0);

      // Receptacle
      const receptacle = push(new THREE.Mesh(
        new THREE.CylinderGeometry(0.25, 0.3, 0.1, 10),
        new THREE.MeshPhongMaterial({ color: 0x16a34a }),
      ));
      receptacle.position.set(0, 0.05, 0);

      push(mkSprite("Angiosperm — Flower Anatomy", "#fbbf24", new THREE.Vector3(0, 3.5, 0), 0.85));

      addLabel(meshes, "Sepal", 0x22c55e, new THREE.Vector3(3.5, 0.5, 2), sepalPositions[0]);
      addLabel(meshes, "Petal (Corolla)", 0xef4444, new THREE.Vector3(3.5, 1.2, -2), petalPositions[0]);
      addLabel(meshes, "Anther", 0xfbbf24, new THREE.Vector3(-3.5, 2.2, 2), stamenPositions[0].pos.clone().add(new THREE.Vector3(0, 0.25, 0)));
      addLabel(meshes, "Filament", 0x4ade80, new THREE.Vector3(-3.5, 1.8, -2), stamenPositions[0].pos);
      addLabel(meshes, "Stigma", 0xfbbf24, new THREE.Vector3(0, 3.0, 2.5), stigma.position);
      addLabel(meshes, "Style", 0x4ade80, new THREE.Vector3(2.5, 2.0, 2.5), style.position);
      addLabel(meshes, "Ovary", 0x22c55e, new THREE.Vector3(-2.5, 1.2, -2.5), ovary.position);
      addLabel(meshes, "Ovule", 0x92400e, new THREE.Vector3(2.5, 0.8, 2.5), ovulePositions[0]);
      addLabel(meshes, "Pedicel", 0x22c55e, new THREE.Vector3(3, -0.2, 2), pedicel.position);
      addLabel(meshes, "Receptacle", 0x16a34a, new THREE.Vector3(-3, -0.2, -2), receptacle.position);

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
          else if (m instanceof THREE.Sprite) { const sm = m.material; sm.map?.dispose?.(); sm.dispose(); }
          else if (m instanceof THREE.ArrowHelper) m.dispose();
        });
        renderer.dispose();
        controls.dispose?.();
      };
    };

    const cleanup = init();
    return () => { cleanup.then((d) => d?.()); };
  }, [isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="Angiosperm Morphology" description="3D flower anatomy diagram." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Angiosperm — Flower Anatomy</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate · Complete flower parts</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-pink-500/30 bg-pink-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-pink-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Calyx:</strong> Whorl of sepals — protects the flower bud.</p>
            <p><strong className="text-foreground">Corolla:</strong> Whorl of petals — attracts pollinators with color and scent.</p>
            <p><strong className="text-foreground">Androecium:</strong> Whorl of stamens (male) — each has filament + anther (pollen-bearing).</p>
            <p><strong className="text-foreground">Gynoecium:</strong> Whorl of carpels (female) — stigma, style, ovary containing ovules.</p>
            <p><strong className="text-foreground">Ovule → Seed:</strong> After fertilization, ovule develops into seed; ovary into fruit.</p>
            <p><strong className="text-foreground">Double fertilization:</strong> Unique to angiosperms — one sperm fertilizes egg, another forms endosperm.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
