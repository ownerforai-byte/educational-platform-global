"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallback } from "@/components/lab/webgl-fallback";
import * as THREE from "three";

/* ============================================================
   Fungi Morphology — NEB Biology 11 (Floral Diversity)
   Shows fungal body plan: hyphae, mycelium, sporangiophore, spores.
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

export function FungiVisual() {
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
      camera.position.set(0, 3, 12);

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

      // Substrate (ground)
      const substrate = push(new THREE.Mesh(
        new THREE.CylinderGeometry(4, 4, 0.3, 24),
        new THREE.MeshPhongMaterial({ color: 0x3d200a }),
      ));
      substrate.position.y = -3;

      // Mycelium network (horizontal hyphae underground)
      const hyphaeMat = new THREE.MeshPhongMaterial({ color: 0xe8dcc8 });
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2;
        const r = 1 + Math.random() * 2;
        const hypha = push(new THREE.Mesh(
          new THREE.CylinderGeometry(0.04, 0.04, r * 1.5, 6),
          hyphaeMat,
        ));
        hypha.position.set(Math.cos(angle) * r * 0.5, -2.8, Math.sin(angle) * r * 0.5);
        hypha.rotation.z = Math.PI / 2 + (Math.random() - 0.5) * 0.5;
        hypha.rotation.y = angle;
      }

      // Sporangiophore (vertical stalk)
      const sporangiophore = push(new THREE.Mesh(
        new THREE.CylinderGeometry(0.08, 0.1, 3.5, 8),
        new THREE.MeshPhongMaterial({ color: 0xd4c4a8 }),
      ));
      sporangiophore.position.set(0, -1.2, 0);

      // Rhizoids (root-like hyphae)
      for (let i = 0; i < 5; i++) {
        const angle = (i / 5) * Math.PI * 2;
        const rhizoid = push(new THREE.Mesh(
          new THREE.CylinderGeometry(0.04, 0.06, 0.8, 6),
          new THREE.MeshPhongMaterial({ color: 0xb8a88a }),
        ));
        rhizoid.position.set(Math.cos(angle) * 0.5, -3.1, Math.sin(angle) * 0.5);
        rhizoid.rotation.z = Math.cos(angle) * 0.5;
        rhizoid.rotation.x = Math.sin(angle) * 0.5;
      }

      // Sporangium (spore sac at top)
      const sporangium = push(new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 16, 12),
        new THREE.MeshPhongMaterial({ color: 0x7c3aed, shininess: 40 }),
      ));
      sporangium.position.set(0, 0.7, 0);

      // Spores (small spheres inside/near sporangium)
      const sporeColor = 0xa78bfa;
      for (let i = 0; i < 12; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        const r = 0.12;
        const sp = push(new THREE.Mesh(
          new THREE.SphereGeometry(r, 8, 6),
          new THREE.MeshPhongMaterial({ color: sporeColor }),
        ));
        sp.position.set(
          0.55 * Math.sin(phi) * Math.cos(theta),
          0.7 + 0.55 * Math.cos(phi),
          0.55 * Math.sin(phi) * Math.sin(theta)
        );
      }

      // Columella (sterile dome inside sporangium)
      const columella = push(new THREE.Mesh(
        new THREE.SphereGeometry(0.25, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2),
        new THREE.MeshPhongMaterial({ color: 0xc4b5fd, transparent: true, opacity: 0.7 }),
      ));
      columella.position.set(0, 0.5, 0);

      // Labels
      push(mkSprite("Fungi — Mucor Morphology", "#fbbf24", new THREE.Vector3(0, 3.2, 0), 0.85));

      addLabel(meshes, "Sporangium (Spore Sac)", 0x7c3aed, new THREE.Vector3(2.5, 2.5, 1.5), sporangium.position);
      addLabel(meshes, "Sporangiospores", 0xa78bfa, new THREE.Vector3(2.8, 1.5, -1.5), new THREE.Vector3(0.3, 0.9, 0.3));
      addLabel(meshes, "Columella", 0xc4b5fd, new THREE.Vector3(-2.5, 1.8, 1.5), columella.position);
      addLabel(meshes, "Sporangiophore (Stalk)", 0xd4c4a8, new THREE.Vector3(-3, 0, 2), sporangiophore.position);
      addLabel(meshes, "Rhizoids", 0xb8a88a, new THREE.Vector3(-3, -3.5, 1), new THREE.Vector3(0.5, -3.1, 0));
      addLabel(meshes, "Mycelium (Hyphae Network)", 0xe8dcc8, new THREE.Vector3(3, -2.5, 2), new THREE.Vector3(1.5, -2.8, 0));
      addLabel(meshes, "Substrate", 0x3d200a, new THREE.Vector3(3.5, -3.5, -2), substrate.position);

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
    return <WebGLFallback title="Fungi Morphology" description="3D fungal body structure diagram." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Fungi — Morphology & Structure</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate · Showcasing Mucor body plan</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Fungal Groups">
          <div className="flex flex-wrap gap-2 mt-2">
            {["Pycomycetes", "Ascomycetes", "Basidiomycetes", "Deuteromycetes"].map((g) => (
              <span key={g} className="px-3 py-1.5 rounded-md text-xs font-medium bg-muted text-muted-foreground">
                {g}
              </span>
            ))}
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-purple-500/30 bg-purple-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-purple-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Hyphae:</strong> Thread-like filaments that make up the body (mycelium) of fungi.</p>
            <p><strong className="text-foreground">Mycelium:</strong> Network of hyphae; absorbs nutrients from substrate.</p>
            <p><strong className="text-foreground">Sporangiophore:</strong> Vertical hypha bearing a sporangium at its tip.</p>
            <p><strong className="text-foreground">Sporangium:</strong> Spherical sac containing sporangiospores (asexual spores).</p>
            <p><strong className="text-foreground">Rhizoids:</strong> Root-like hyphae that anchor the fungus and absorb food.</p>
            <p><strong className="text-foreground">Cell wall:</strong> Made of chitin (not cellulose like plants).</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
