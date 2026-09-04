"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallback } from "@/components/lab/webgl-fallback";
import * as THREE from "three";

/* ============================================================
   Algae Morphology — NEB Biology 11 (Floral Diversity)
   Shows Spirogyra with spiral chloroplast, cell wall, nucleus.
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

export function AlgaeVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [algaeType, setAlgaeType] = useState<"green" | "brown" | "red">("green");
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
      camera.position.set(0, 0, 12);

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
      dl.position.set(4, 6, 4);
      scene.add(dl);

      const push = <T extends THREE.Object3D>(o: T): T => { scene.add(o); meshes.push(o); return o; };

      const COLORS = { green: 0x22c55e, brown: 0x92400e, red: 0xdc2626 };
      const LIGHT = { green: 0x4ade80, brown: 0xd97706, red: 0xf87171 };

      if (algaeType === "green") {
        // Spirogyra — filamentous green alga with spiral chloroplasts
        const filamentY = 0;
        for (let i = 0; i < 6; i++) {
          const x = (i - 2.5) * 1.4;
          // Cell wall (tube)
          const cell = push(new THREE.Mesh(
            new THREE.CylinderGeometry(0.4, 0.4, 1.2, 16),
            new THREE.MeshPhongMaterial({ color: 0x86efac, transparent: true, opacity: 0.3, side: THREE.DoubleSide }),
          ));
          cell.position.set(x, filamentY, 0);
          // Cytoplasm
          const cyto = push(new THREE.Mesh(
            new THREE.CylinderGeometry(0.35, 0.35, 1.1, 16),
            new THREE.MeshPhongMaterial({ color: 0x22c55e, transparent: true, opacity: 0.4 }),
          ));
          cyto.position.set(x, filamentY, 0);
          // Spiral chloroplast (spirogyra characteristic)
          const spiralPts: THREE.Vector3[] = [];
          for (let t = 0; t < Math.PI * 6; t += 0.15) {
            const sx = x + (t / (Math.PI * 6) - 0.5) * 1.0;
            const sy = filamentY + 0.2 * Math.sin(t * 3);
            const sz = 0.25 * Math.cos(t);
            spiralPts.push(new THREE.Vector3(sx, sy, sz));
          }
          const spiral = push(new THREE.Line(
            new THREE.BufferGeometry().setFromPoints(spiralPts),
            new THREE.LineBasicMaterial({ color: 0x16a34a, linewidth: 3 }),
          ));
          // Nucleus
          const nucleus = push(new THREE.Mesh(
            new THREE.SphereGeometry(0.1, 10, 8),
            new THREE.MeshPhongMaterial({ color: 0x7c3aed }),
          ));
          nucleus.position.set(x, filamentY, 0.2);
          // Cell wall line
          const wallLine = push(new THREE.Line(
            new THREE.BufferGeometry().setFromPoints([
              new THREE.Vector3(x, filamentY - 0.6, 0.35),
              new THREE.Vector3(x, filamentY + 0.6, 0.35),
            ]),
            new THREE.LineBasicMaterial({ color: 0x4ade80 }),
          ));
        }
        // Connection between cells
        for (let i = 0; i < 5; i++) {
          const x = (i - 2) * 1.4;
          const conn = push(new THREE.Mesh(
            new THREE.CylinderGeometry(0.05, 0.05, 0.3, 6),
            new THREE.MeshPhongMaterial({ color: 0x4ade80 }),
          ));
          conn.position.set(x + 0.7, filamentY, 0);
        }

        push(mkSprite("Spirogyra — Filamentous Green Alga", "#fbbf24", new THREE.Vector3(0, 3.5, 0), 0.85));
        addLabel(meshes, "Spiral Chloroplast", 0x16a34a, new THREE.Vector3(3.5, 1, 2), new THREE.Vector3(0, 0, 0.1));
        addLabel(meshes, "Cell Wall", 0x86efac, new THREE.Vector3(-3.5, 1.5, 1.5), new THREE.Vector3(-1.4, 0, 0.35));
        addLabel(meshes, "Nucleus", 0x7c3aed, new THREE.Vector3(-3.5, -0.5, 2), new THREE.Vector3(0, 0, 0.2));
        addLabel(meshes, "Cytoplasm", 0x22c55e, new THREE.Vector3(3.5, -1, -2), new THREE.Vector3(1.4, 0, 0));
        addLabel(meshes, "Cell Junction", 0x4ade80, new THREE.Vector3(-3.5, -2, 1), new THREE.Vector3(0, 0, 0));
      } else if (algaeType === "brown") {
        // Brown algae — kelp-like with holdfast, stipe, blade
        const holdfast = push(new THREE.Mesh(
          new THREE.SphereGeometry(0.5, 12, 10),
          new THREE.MeshPhongMaterial({ color: 0x78350f }),
        ));
        holdfast.position.set(0, -3.5, 0);
        const stipe = push(new THREE.Mesh(
          new THREE.CylinderGeometry(0.15, 0.2, 3, 8),
          new THREE.MeshPhongMaterial({ color: 0x92400e }),
        ));
        stipe.position.set(0, -1.5, 0);
        const blade = push(new THREE.Mesh(
          new THREE.PlaneGeometry(2.5, 2),
          new THREE.MeshPhongMaterial({ color: 0xd97706, side: THREE.DoubleSide, transparent: true, opacity: 0.7 }),
        ));
        blade.position.set(0, 1.2, 0);
        blade.rotation.z = 0.1;
        // Air bladder
        const bladder = push(new THREE.Mesh(
          new THREE.SphereGeometry(0.25, 10, 8),
          new THREE.MeshPhongMaterial({ color: 0xfbbf24, transparent: true, opacity: 0.5 }),
        ));
        bladder.position.set(0.5, 1.8, 0);
        push(mkSprite("Brown Algae — Kelp Morphology", "#fbbf24", new THREE.Vector3(0, 3.5, 0), 0.85));
        addLabel(meshes, "Holdfast (Anchor)", 0x78350f, new THREE.Vector3(-3, -3.5, 2), holdfast.position);
        addLabel(meshes, "Stipe (Stem-like)", 0x92400e, new THREE.Vector3(3, -1.5, 2), stipe.position);
        addLabel(meshes, "Blade (Leaf-like)", 0xd97706, new THREE.Vector3(3, 2, 2), blade.position);
        addLabel(meshes, "Air Bladder", 0xfbbf24, new THREE.Vector3(-3, 2.5, -2), bladder.position);
      } else {
        // Red algae — branching filament
        const branchPoints = [
          new THREE.Vector3(0, -3, 0), new THREE.Vector3(0, -1, 0),
          new THREE.Vector3(-1, 0.5, 0), new THREE.Vector3(1, 0.5, 0),
          new THREE.Vector3(-1.5, 2, 0), new THREE.Vector3(-0.5, 2.2, 0),
          new THREE.Vector3(0.5, 2, 0), new THREE.Vector3(1.5, 2.2, 0),
        ];
        for (let i = 0; i < branchPoints.length - 1; i++) {
          const seg = push(new THREE.Mesh(
            new THREE.CylinderGeometry(0.06, 0.06, branchPoints[i].distanceTo(branchPoints[i + 1]), 6),
            new THREE.MeshPhongMaterial({ color: 0xdc2626 }),
          ));
          seg.position.copy(branchPoints[i].clone().add(branchPoints[i + 1]).multiplyScalar(0.5));
          seg.lookAt(branchPoints[i + 1]);
          seg.rotation.x += Math.PI / 2;
        }
        push(mkSprite("Red Algae — Branching Structure", "#fbbf24", new THREE.Vector3(0, 3.5, 0), 0.85));
        addLabel(meshes, "Filament", 0xdc2626, new THREE.Vector3(3, 0, 2), new THREE.Vector3(0, -1, 0));
        addLabel(meshes, "Branch", 0xf87171, new THREE.Vector3(-3, 2, -2), new THREE.Vector3(-1.5, 2, 0));
      }

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
  }, [algaeType, isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="Algae Morphology" description="3D algal body structure diagram." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Algae — Morphology & Structure</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Algae Type">
          <div className="flex flex-wrap gap-2 mt-2">
            {(["green", "brown", "red"] as const).map((t) => (
              <button key={t} onClick={() => setAlgaeType(t)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  algaeType === t ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}>
                {t.charAt(0).toUpperCase() + t.slice(1) + " Algae"}
              </button>
            ))}
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-green-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Green Algae (Chlorophyta):</strong> Chlorophyll a & b; stored food = starch; e.g., Spirogyra (spiral chloroplast), Chlamydomonas.</p>
            <p><strong className="text-foreground">Brown Algae (Phaeophyta):</strong> Chlorophyll a & c + fucoxanthin; stored food = laminarin; e.g., kelp, Saccharina.</p>
            <p><strong className="text-foreground">Red Algae (Rhodophyta):</strong> Chlorophyll a & d + phycoerythrin; stored food = floridean starch; e.g., Polysiphonia.</p>
            <p><strong className="text-foreground">Body plan:</strong> Simple thallus — no true roots, stems, or leaves. May have holdfast, stipe, and blade.</p>
            <p><strong className="text-foreground">Economic importance:</strong> Food (nori, kombu), agar, algin, medicinal compounds.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
