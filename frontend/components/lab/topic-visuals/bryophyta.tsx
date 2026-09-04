"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallback } from "@/components/lab/webgl-fallback";
import * as THREE from "three";
import { LiveArrow } from "@/components/lab/animated-arrow-helper";

/* ============================================================
   Bryophyta (Marchantia) — NEB Biology 11 (Floral Diversity)
   Shows thallus body, rhizoids, gemma cups, archegoniophore, antheridiophore.
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
  meshes.push(new LiveArrow(dir, labelPos, len * 0.85, color, 0.22, 0.14) as any);
  const lp = labelPos.clone().sub(dir.clone().multiplyScalar(0.45));
  meshes.push(mkSprite(text, `#${color.toString(16).padStart(6, "0")}`, lp, 0.85));
}

export function BryophytaVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
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
      camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
      camera.position.set(0, 6, 10);
      camera.lookAt(0, 0, 0);

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
      dl.position.set(3, 8, 5);
      scene.add(dl);

      const push = <T extends THREE.Object3D>(o: T): T => { scene.add(o); meshes.push(o); return o; };

      // Ground (moist soil)
      const ground = push(new THREE.Mesh(
        new THREE.CircleGeometry(5, 24),
        new THREE.MeshPhongMaterial({ color: 0x1a3a1a }),
      ));
      ground.rotation.x = -Math.PI / 2;
      ground.position.y = -0.1;

      // Thallus (flat, dorsiventral body)
      const thallus = push(new THREE.Mesh(
        new THREE.CylinderGeometry(2.5, 2.5, 0.15, 24),
        new THREE.MeshPhongMaterial({ color: 0x2d5a27, side: THREE.DoubleSide }),
      ));
      thallus.position.y = 0.05;

      // Thallus veins (ridges on surface)
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        const vein = push(new THREE.Mesh(
          new THREE.BoxGeometry(2, 0.04, 0.08),
          new THREE.MeshPhongMaterial({ color: 0x3d7a35 }),
        ));
        vein.position.set(Math.cos(angle) * 1.2, 0.14, Math.sin(angle) * 1.2);
        vein.rotation.y = -angle;
        vein.rotation.z = Math.PI / 2;
      }

      // Rhizoids (below thallus)
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const r = 0.5 + Math.random() * 1.5;
        const rhizoid = push(new THREE.Mesh(
          new THREE.CylinderGeometry(0.02, 0.03, 0.4, 4),
          new THREE.MeshPhongMaterial({ color: 0x8b7355 }),
        ));
        rhizoid.position.set(Math.cos(angle) * r, -0.25, Math.sin(angle) * r);
        rhizoid.rotation.z = (Math.random() - 0.5) * 0.3;
      }

      // Gemma cups (small cups on thallus surface)
      const gemmaPositions = [
        new THREE.Vector3(1, 0.16, 0.5),
        new THREE.Vector3(-0.8, 0.16, 1.2),
        new THREE.Vector3(0.5, 0.16, -1.0),
      ];
      for (const gp of gemmaPositions) {
        const cup = push(new THREE.Mesh(
          new THREE.CylinderGeometry(0.2, 0.15, 0.06, 12, 1, true),
          new THREE.MeshPhongMaterial({ color: 0x4ade80, side: THREE.DoubleSide }),
        ));
        cup.position.copy(gp);
        // Gemmae (small green balls inside)
        for (let j = 0; j < 3; j++) {
          const gemma = push(new THREE.Mesh(
            new THREE.SphereGeometry(0.04, 8, 6),
            new THREE.MeshPhongMaterial({ color: 0x22c55e }),
          ));
          gemma.position.set(gp.x + (j - 1) * 0.08, gp.y + 0.05, gp.z);
        }
      }

      // Archegoniophore (female structure — umbrella-shaped)
      const archStem = push(new THREE.Mesh(
        new THREE.CylinderGeometry(0.06, 0.08, 1.2, 8),
        new THREE.MeshPhongMaterial({ color: 0x22c55e }),
      ));
      archStem.position.set(1.8, 0.75, 0);
      const archHead = push(new THREE.Mesh(
        new THREE.CylinderGeometry(0.6, 0.3, 0.1, 12),
        new THREE.MeshPhongMaterial({ color: 0x16a34a }),
      ));
      archHead.position.set(1.8, 1.4, 0);
      // Prothallial cells (lobes)
      for (let i = 0; i < 5; i++) {
        const a = (i / 5) * Math.PI * 2;
        const lobe = push(new THREE.Mesh(
          new THREE.SphereGeometry(0.08, 8, 6),
          new THREE.MeshPhongMaterial({ color: 0x4ade80 }),
        ));
        lobe.position.set(1.8 + Math.cos(a) * 0.4, 1.35, Math.sin(a) * 0.4);
      }

      // Antheridiophore (male structure)
      const anthStem = push(new THREE.Mesh(
        new THREE.CylinderGeometry(0.05, 0.07, 0.9, 8),
        new THREE.MeshPhongMaterial({ color: 0x22c55e }),
      ));
      anthStem.position.set(-1.5, 0.55, 0.8);
      const anthHead = push(new THREE.Mesh(
        new THREE.CylinderGeometry(0.35, 0.15, 0.08, 10),
        new THREE.MeshPhongMaterial({ color: 0x16a34a }),
      ));
      anthHead.position.set(-1.5, 1.04, 0.8);

      push(mkSprite("Bryophyta — Marchantia Morphology", "#fbbf24", new THREE.Vector3(0, 3.5, 0), 0.85));

      addLabel(meshes, "Thallus (Body)", 0x2d5a27, new THREE.Vector3(-3.5, 0.5, 2), new THREE.Vector3(0, 0.1, 0));
      addLabel(meshes, "Rhizoids", 0x8b7355, new THREE.Vector3(-3.5, -0.8, -2), new THREE.Vector3(1, -0.25, 0));
      addLabel(meshes, "Gemma Cup", 0x4ade80, new THREE.Vector3(3.5, 0.8, 2), gemmaPositions[0]);
      addLabel(meshes, "Archegoniophore (Female)", 0x22c55e, new THREE.Vector3(3.5, 2.5, 1), archHead.position);
      addLabel(meshes, "Antheridiophore (Male)", 0x22c55e, new THREE.Vector3(-3.5, 2, -1.5), anthHead.position);
      addLabel(meshes, "Thallus Veins", 0x3d7a35, new THREE.Vector3(-3, 0.3, 3), new THREE.Vector3(0, 0.14, 0));

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
    return <WebGLFallback title="Bryophyta (Marchantia)" description="3D liverwort morphology diagram." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Bryophyta — Marchantia Morphology</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate · Liverwort anatomy</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-green-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Thallus:</strong> Flat, dorsiventral body — no true roots, stems, or leaves. Attached by rhizoids.</p>
            <p><strong className="text-foreground">Rhizoids:</strong> Single-celled or multicellular hair-like structures for anchorage and absorption.</p>
            <p><strong className="text-foreground">Gemma cups:</strong> Small cup-shaped structures on thallus surface containing gemmae for asexual reproduction.</p>
            <p><strong className="text-foreground">Archegoniophore:</strong> Umbrella-like female reproductive structure bearing archegonia on underside.</p>
            <p><strong className="text-foreground">Antheridiophore:</strong> Male reproductive structure bearing antheridia on upper surface.</p>
            <p><strong className="text-foreground">Dominant phase:</strong> Gametophyte (haploid) is the conspicuous, photosynthetic stage.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
