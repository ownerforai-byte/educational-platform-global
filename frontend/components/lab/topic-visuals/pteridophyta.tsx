"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallback } from "@/components/lab/webgl-fallback";
import * as THREE from "three";
import { LiveArrow } from "@/components/lab/animated-arrow-helper";

/* ============================================================
   Pteridophyta (Dryopteris) — NEB Biology 11 (Floral Diversity)
   Shows frond, stipules, rhizome, sori on underside.
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

export function PteridophytaVisual() {
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
      camera.position.set(0, 4, 11);

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

      // Rhizome (underground stem)
      const rhizome = push(new THREE.Mesh(
        new THREE.CylinderGeometry(0.2, 0.25, 3, 8),
        new THREE.MeshPhongMaterial({ color: 0x5d3a1a }),
      ));
      rhizome.rotation.z = Math.PI / 2;
      rhizome.position.set(0, -2.5, 0);

      // Roots from rhizome
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        const root = push(new THREE.Mesh(
          new THREE.CylinderGeometry(0.03, 0.05, 1.0, 6),
          new THREE.MeshPhongMaterial({ color: 0x8b7355 }),
        ));
        root.position.set(Math.cos(angle) * 0.8, -2.8, Math.sin(angle) * 0.8);
        root.rotation.z = Math.cos(angle) * 0.6;
        root.rotation.x = Math.sin(angle) * 0.6;
      }

      // Stipe (leaf stalk)
      const stipe = push(new THREE.Mesh(
        new THREE.CylinderGeometry(0.1, 0.12, 3, 8),
        new THREE.MeshPhongMaterial({ color: 0x4a7c59 }),
      ));
      stipe.position.set(0, 0, 0);

      // Frond (lamina) — divided into leaflets
      const frond = push(new THREE.Mesh(
        new THREE.ConeGeometry(2.2, 1.5, 4),
        new THREE.MeshPhongMaterial({ color: 0x2d7a3a, side: THREE.DoubleSide }),
      ));
      frond.position.set(0, 2.2, 0);

      // Leaflets (pinnae)
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const r = 1.5;
        const pinna = push(new THREE.Mesh(
          new THREE.BoxGeometry(1.2, 0.05, 0.4),
          new THREE.MeshPhongMaterial({ color: 0x3d9a4a, side: THREE.DoubleSide }),
        ));
        pinna.position.set(Math.cos(angle) * r, 1.8 + (i % 3) * 0.3, Math.sin(angle) * r);
        pinna.rotation.y = -angle;
        pinna.rotation.z = 0.2;
      }

      // Sori (spore clusters) on underside
      const sorPositionss = [
        new THREE.Vector3(0.8, 1.5, 0.5),
        new THREE.Vector3(-0.6, 1.8, -0.8),
        new THREE.Vector3(0.3, 1.3, -1.0),
        new THREE.Vector3(-0.9, 1.6, 0.3),
      ];
      for (const sp of sorPositionss) {
        const sor = push(new THREE.Mesh(
          new THREE.CircleGeometry(0.12, 10),
          new THREE.MeshPhongMaterial({ color: 0xd97706, side: THREE.DoubleSide }),
        ));
        sor.position.copy(sp);
        sor.position.y -= 0.03;
      }

      // Indusium (protective covering over sorus)
      const indusium = push(new THREE.Mesh(
        new THREE.CircleGeometry(0.18, 10, 0, Math.PI),
        new THREE.MeshPhongMaterial({ color: 0x92400e, side: THREE.DoubleSide, transparent: true, opacity: 0.7 }),
      ));
      indusium.position.set(0.8, 1.5, 0.48);

      push(mkSprite("Pteridophyta — Dryopteris Morphology", "#fbbf24", new THREE.Vector3(0, 4.0, 0), 0.85));

      addLabel(meshes, "Frond (Leaf)", 0x2d7a3a, new THREE.Vector3(-3.5, 3, 2), frond.position);
      addLabel(meshes, "Stipe (Leaf Stalk)", 0x4a7c59, new THREE.Vector3(3.5, 1, 2), stipe.position);
      addLabel(meshes, "Rhizome (Underground Stem)", 0x5d3a1a, new THREE.Vector3(3.5, -2.5, -2), rhizome.position);
      addLabel(meshes, "Roots", 0x8b7355, new THREE.Vector3(-3.5, -3.5, 1), new THREE.Vector3(0.8, -2.8, 0));
      addLabel(meshes, "Sorus (Spore Cluster)", 0xd97706, new THREE.Vector3(3, 1, -3), sorPositionss[0]);
      addLabel(meshes, "Indusium", 0x92400e, new THREE.Vector3(-3, 1.2, 3), indusium.position);
      addLabel(meshes, "Pinna (Leaflet)", 0x3d9a4a, new THREE.Vector3(-3.5, 2, -2), new THREE.Vector3(1.5, 2.0, 0));

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
    return <WebGLFallback title="Pteridophyta (Dryopteris)" description="3D fern morphology diagram." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Pteridophyta — Dryopteris Morphology</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate · Fern anatomy</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-green-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Rhizome:</strong> Underground stem that grows horizontally; produces roots and leaves.</p>
            <p><strong className="text-foreground">Frond:</strong> Large, divided leaf (lamina) — the photosynthetic organ.</p>
            <p><strong className="text-foreground">Stipe:</strong> Leaf stalk connecting frond to rhizome.</p>
            <p><strong className="text-foreground">Sorus:</strong> Cluster of sporangia on the underside of frond; produces spores.</p>
            <p><strong className="text-foreground">Indusium:</strong> Protective covering over sorus;撕开后释放孢子.</p>
            <p><strong className="text-foreground">Dominant phase:</strong> Sporophyte (diploid) is the conspicuous, independent plant.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
