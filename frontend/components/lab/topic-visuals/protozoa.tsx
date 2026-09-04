"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallback } from "@/components/lab/webgl-fallback";
import * as THREE from "three";

/* ============================================================
   Paramecium & Plasmodium — NEB Biology 11 (Faunal Diversity)
   Shows protozoan structure with organelle labels.
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

type Organism = "paramecium" | "plasmodium";

export function ProtozoaVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [organism, setOrganism] = useState<Organism>("paramecium");
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

      const update = () => {
        while (meshes.length > 80) {
          const m = meshes.pop()!;
          scene.remove(m);
          if (m instanceof THREE.Mesh) { m.geometry?.dispose(); const mat = m.material; if (Array.isArray(mat)) mat.forEach((x) => x.dispose()); else (Array.isArray(mat) ? mat : [mat]).forEach((x) => x.dispose()); }
          else if (m instanceof THREE.Sprite) { const sm = m.material; sm.map?.dispose?.(); sm.dispose(); }
          else if (m instanceof THREE.ArrowHelper) m.dispose();
        }

        if (organism === "paramecium") {
          // Slipper-shaped body
          const body = push(new THREE.Mesh(
            new THREE.CapsuleGeometry(0.9, 1.5, 12, 16),
            new THREE.MeshPhongMaterial({ color: 0x7dd3fc, transparent: true, opacity: 0.5, side: THREE.DoubleSide }),
          ));
          body.rotation.z = Math.PI / 2;

          // Cilia (hair-like projections all around)
          for (let i = 0; i < 24; i++) {
            const angle = (i / 24) * Math.PI * 2;
            const r = 0.95;
            const cilium = push(new THREE.Mesh(
              new THREE.CylinderGeometry(0.01, 0.015, 0.3, 4),
              new THREE.MeshPhongMaterial({ color: 0x38bdf8 }),
            ));
            cilium.position.set(
              Math.cos(angle) * r,
              (i % 6 - 2.5) * 0.35,
              Math.sin(angle) * r
            );
            cilium.rotation.z = Math.cos(angle) * 0.3;
            cilium.rotation.x = Math.sin(angle) * 0.3;
          }

          // Macronucleus (large, kidney-shaped)
          const macroNuc = push(new THREE.Mesh(
            new THREE.SphereGeometry(0.3, 12, 10),
            new THREE.MeshPhongMaterial({ color: 0xa78bfa }),
          ));
          macroNuc.position.set(0.2, 0, 0);
          macroNuc.scale.set(1.5, 0.8, 0.8);

          // Micronucleus (small)
          const microNuc = push(new THREE.Mesh(
            new THREE.SphereGeometry(0.1, 8, 6),
            new THREE.MeshPhongMaterial({ color: 0x7c3aed }),
          ));
          microNuc.position.set(0.2, 0.2, 0.15);

          // Oral groove
          const groove = push(new THREE.Mesh(
            new THREE.TorusGeometry(0.5, 0.08, 8, 16, Math.PI),
            new THREE.MeshPhongMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.6 }),
          ));
          groove.position.set(-0.3, -0.3, 0);
          groove.rotation.set(0.5, 0, 0.3);

          // Contractile vacuoles
          const cv1 = push(new THREE.Mesh(
            new THREE.SphereGeometry(0.12, 8, 6),
            new THREE.MeshPhongMaterial({ color: 0xfbbf24, transparent: true, opacity: 0.7 }),
          ));
          cv1.position.set(-0.8, 0.5, 0);
          const cv2 = push(new THREE.Mesh(
            new THREE.SphereGeometry(0.12, 8, 6),
            new THREE.MeshPhongMaterial({ color: 0xfbbf24, transparent: true, opacity: 0.7 }),
          ));
          cv2.position.set(0.8, -0.5, 0);

          // Food vacuole
          const foodVac = push(new THREE.Mesh(
            new THREE.SphereGeometry(0.15, 8, 6),
            new THREE.MeshPhongMaterial({ color: 0x22c55e, transparent: true, opacity: 0.6 }),
          ));
          foodVac.position.set(-0.5, -0.2, 0.3);

          // Anal pore
          const analPore = push(new THREE.Mesh(
            new THREE.CircleGeometry(0.06, 8),
            new THREE.MeshPhongMaterial({ color: 0xef4444, side: THREE.DoubleSide }),
          ));
          analPore.position.set(1.0, 0, 0);
          analPore.rotation.y = Math.PI / 2;

          push(mkSprite("Paramecium caudatum — Ciliated Protozoan", "#fbbf24", new THREE.Vector3(0, 3.5, 0), 0.85));

          addLabel(meshes, "Cilia", 0x38bdf8, new THREE.Vector3(3.5, 1.5, 2), new THREE.Vector3(0, 0.6, 0.95));
          addLabel(meshes, "Macronucleus", 0xa78bfa, new THREE.Vector3(-3.5, 1.5, 2), macroNuc.position);
          addLabel(meshes, "Micronucleus", 0x7c3aed, new THREE.Vector3(-3.5, 2.5, -1.5), microNuc.position);
          addLabel(meshes, "Oral Groove (Cytopharynx)", 0x22d3ee, new THREE.Vector3(3.5, -1.5, 2), groove.position);
          addLabel(meshes, "Contractile Vacuole", 0xfbbf24, new THREE.Vector3(-3.5, 2, -2), cv1.position);
          addLabel(meshes, "Food Vacuole", 0x22c55e, new THREE.Vector3(3, -1, -2.5), foodVac.position);
          addLabel(meshes, "Anal Pore (Cytopeigne)", 0xef4444, new THREE.Vector3(3.5, 0, 2.5), analPore.position);
        } else {
          // Plasmodium vivax — amoeboid shape
          const body = push(new THREE.Mesh(
            new THREE.SphereGeometry(1.0, 16, 12),
            new THREE.MeshPhongMaterial({ color: 0xe879f9, transparent: true, opacity: 0.5 }),
          ));

          // Pseudopodia
          for (let i = 0; i < 5; i++) {
            const angle = (i / 5) * Math.PI * 2;
            const pseudo = push(new THREE.Mesh(
              new THREE.ConeGeometry(0.15, 0.6, 8),
              new THREE.MeshPhongMaterial({ color: 0xd946ef, transparent: true, opacity: 0.6 }),
            ));
            pseudo.position.set(Math.cos(angle) * 0.8, Math.sin(angle) * 0.8, 0);
            pseudo.rotation.z = angle;
          }

          // Nucleus
          const nuc = push(new THREE.Mesh(
            new THREE.SphereGeometry(0.25, 10, 8),
            new THREE.MeshPhongMaterial({ color: 0xa78bfa }),
          ));
          nuc.position.set(0.1, 0.1, 0.2);

          // Food vacuoles
          for (let i = 0; i < 3; i++) {
            const fv = push(new THREE.Mesh(
              new THREE.SphereGeometry(0.1, 8, 6),
              new THREE.MeshPhongMaterial({ color: 0x22c55e, transparent: true, opacity: 0.6 }),
            ));
            fv.position.set(-0.3 + i * 0.3, 0.3, -0.2);
          }

          // Cytoplasm granules
          for (let i = 0; i < 8; i++) {
            const gran = push(new THREE.Mesh(
              new THREE.SphereGeometry(0.04, 6, 4),
              new THREE.MeshPhongMaterial({ color: 0xf472b6 }),
            ));
            gran.position.set((Math.random() - 0.5) * 1.2, (Math.random() - 0.5) * 1.2, (Math.random() - 0.5) * 0.5);
          }

          push(mkSprite("Plasmodium vivax — Sporozoan Protozoan", "#fbbf24", new THREE.Vector3(0, 3.5, 0), 0.85));
          addLabel(meshes, "Pseudopodia", 0xd946ef, new THREE.Vector3(3.5, 1, 2), new THREE.Vector3(0.8, 0.8, 0));
          addLabel(meshes, "Nucleus", 0xa78bfa, new THREE.Vector3(-3.5, 1.5, -2), nuc.position);
          addLabel(meshes, "Food Vacuoles", 0x22c55e, new THREE.Vector3(3.5, -1.5, 2), new THREE.Vector3(0, 0.3, -0.2));
          addLabel(meshes, "Ectoplasm", 0xe879f9, new THREE.Vector3(-3.5, -1, 2), new THREE.Vector3(-0.5, -0.3, 0));
          addLabel(meshes, "Endoplasm", 0xd946ef, new THREE.Vector3(3, -2, -2), new THREE.Vector3(0, 0, 0));
        }
      };

      update();

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
  }, [organism, isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="Protozoa (Paramecium & Plasmodium)" description="3D protozoan structure diagrams." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Protozoa — Paramecium & Plasmodium</span>
          <span className="text-xs text-muted-foreground font-normal">Select organism to view</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Organism">
          <div className="flex flex-wrap gap-2 mt-2">
            {(["paramecium", "plasmodium"] as const).map((o) => (
              <button key={o} onClick={() => setOrganism(o)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  organism === o ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}>
                {o === "paramecium" ? "Paramecium" : "Plasmodium"}
              </button>
            ))}
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-cyan-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Paramecium:</strong> Ciliated protozoan; slipper-shaped; dual nucleus (macro + micro); contractile vacuoles for osmoregulation.</p>
            <p><strong className="text-foreground">Plasmodium:</strong> Sporozoan parasite; causes malaria; amoeboid movement via pseudopodia; no fixed shape.</p>
            <p><strong className="text-foreground">Paramecium reproduction:</strong> Asexual by transverse binary fission; sexual by conjugation.</p>
            <p><strong className="text-foreground">Plasmodium life cycle:</strong> Alternates between human host (asexual) and Anopheles mosquito (sexual).</p>
            <p><strong className="text-foreground">Classification:</strong> Paramecium = Class Cilliata; Plasmodium = Class Sporozoa.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
