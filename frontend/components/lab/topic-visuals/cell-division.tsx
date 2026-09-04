"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallback } from "@/components/lab/webgl-fallback";
import * as THREE from "three";
import { LiveArrow } from "@/components/lab/animated-arrow-helper";

/* ============================================================
   Cell Division (Mitosis) — NEB Biology 11
   Shows prophase, metaphase, anaphase, telophase with chromosome arrows.
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

type Stage = "interphase" | "prophase" | "metaphase" | "anaphase" | "telophase";

const STAGES: Stage[] = ["interphase", "prophase", "metaphase", "anaphase", "telophase"];

export function CellDivisionVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState<Stage>("metaphase");
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

        // Cell boundary
        const cell = push(new THREE.Mesh(
          new THREE.CircleGeometry(4.5, 32),
          new THREE.MeshPhongMaterial({ color: 0x7dd3fc, transparent: true, opacity: 0.12, side: THREE.DoubleSide }),
        ));

        // Nuclear envelope
        const nucleus = push(new THREE.Mesh(
          new THREE.CircleGeometry(2.2, 24),
          new THREE.MeshPhongMaterial({ color: 0xa78bfa, transparent: true, opacity: 0.2, side: THREE.DoubleSide }),
        ));
        nucleus.position.z = 0.02;

        if (stage === "interphase") {
          // Diffuse chromatin
          const chromatin = push(new THREE.Mesh(
            new THREE.SphereGeometry(0.8, 12, 10),
            new THREE.MeshPhongMaterial({ color: 0x7c3aed, transparent: true, opacity: 0.6 }),
          ));
          chromatin.position.set(0, 0, 0.05);
          // Nucleolus
          const nucleolus = push(new THREE.Mesh(
            new THREE.SphereGeometry(0.3, 10, 8),
            new THREE.MeshPhongMaterial({ color: 0x4c1d95 }),
          ));
          nucleolus.position.set(0.3, 0.2, 0.1);
          push(mkSprite("Interphase — Chromatin diffuse, nucleus intact", "#fbbf24", new THREE.Vector3(0, -5.2, 0), 0.8));
          addLabel(meshes, "Nucleolus", 0x4c1d95, new THREE.Vector3(2.5, 1.5, 0), nucleolus.position);
          addLabel(meshes, "Chromatin", 0x7c3aed, new THREE.Vector3(-3, 1.8, 0), chromatin.position);
          addLabel(meshes, "Nuclear Envelope", 0xa78bfa, new THREE.Vector3(3, -1.5, 0), nucleus.position);
        } else if (stage === "prophase") {
          // Condensing chromosomes (X-shaped)
          const chromosomeColor = 0xef4444;
          const drawChromosome = (x: number, y: number, z: number) => {
            const left = push(new THREE.Mesh(new THREE.CapsuleGeometry(0.1, 0.5, 6, 8), new THREE.MeshPhongMaterial({ color: chromosomeColor })));
            left.position.set(x - 0.12, y, z);
            left.rotation.z = 0.2;
            const right = push(new THREE.Mesh(new THREE.CapsuleGeometry(0.1, 0.5, 6, 8), new THREE.MeshPhongMaterial({ color: chromosomeColor })));
            right.position.set(x + 0.12, y, z);
            right.rotation.z = -0.2;
            return { left, right };
          };
          drawChromosome(-0.8, 0.5, 0.05);
          drawChromosome(0.8, 0.5, 0.05);
          drawChromosome(-0.6, -0.5, 0.05);
          drawChromosome(0.6, -0.5, 0.05);
          // Spindle fibers beginning
          const spindleMat = new THREE.LineDashedMaterial({ color: 0x34d399, dashSize: 0.15, gapSize: 0.08 });
          const sp1 = push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-3, 0, 0), new THREE.Vector3(-1, 0.3, 0)]), spindleMat) as any);
          (meshes[meshes.length - 1] as any).computeLineDistances();
          const sp2 = push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(3, 0, 0), new THREE.Vector3(1, 0.3, 0)]), spindleMat) as any);
          (meshes[meshes.length - 1] as any).computeLineDistances();
          push(mkSprite("Prophase — Chromosomes condense, spindle forms", "#fbbf24", new THREE.Vector3(0, -5.2, 0), 0.8));
          addLabel(meshes, "Condensing Chromosomes", 0xef4444, new THREE.Vector3(3, 2, 0), new THREE.Vector3(-0.8, 0.5, 0.05));
          addLabel(meshes, "Spindle Fiber", 0x34d399, new THREE.Vector3(-3.5, 1, 0), new THREE.Vector3(-2, 0, 0));
        } else if (stage === "metaphase") {
          // Chromosomes aligned at metaphase plate
          const plateY = 0;
          const positions = [[-1.5, plateY], [-0.5, plateY], [0.5, plateY], [1.5, plateY]];
          const colors = [0xef4444, 0xf97316, 0xfbbf24, 0x22c55e];
          positions.forEach(([x, y], i) => {
            const left = push(new THREE.Mesh(new THREE.CapsuleGeometry(0.1, 0.45, 6, 8), new THREE.MeshPhongMaterial({ color: colors[i] })));
            left.position.set(x - 0.1, y, 0.05);
            left.rotation.z = 0.15;
            const right = push(new THREE.Mesh(new THREE.CapsuleGeometry(0.1, 0.45, 6, 8), new THREE.MeshPhongMaterial({ color: colors[i] })));
            right.position.set(x + 0.1, y, 0.05);
            right.rotation.z = -0.15;
          });
          // Metaphase plate line
          const plateLine = push(new THREE.Line(
            new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-4, plateY, 0), new THREE.Vector3(4, plateY, 0)]),
            new THREE.LineDashedMaterial({ color: 0x64748b, dashSize: 0.2, gapSize: 0.1 }),
          ) as any);
          (plateLine as any).computeLineDistances();
          // Spindle from poles
          for (const [x] of positions) {
            const sp1 = push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-4, 0, 0), new THREE.Vector3(x, plateY, 0)]), new THREE.LineDashedMaterial({ color: 0x34d399, dashSize: 0.12, gapSize: 0.08 })) as any);
            (sp1 as any).computeLineDistances();
            const sp2 = push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(4, 0, 0), new THREE.Vector3(x, plateY, 0)]), new THREE.LineDashedMaterial({ color: 0x34d399, dashSize: 0.12, gapSize: 0.08 })) as any);
            (sp2 as any).computeLineDistances();
          }
          push(mkSprite("Metaphase — Chromosomes aligned at metaphase plate", "#fbbf24", new THREE.Vector3(0, -5.2, 0), 0.8));
          addLabel(meshes, "Metaphase Plate", 0x64748b, new THREE.Vector3(3.5, -0.8, 0), new THREE.Vector3(0, plateY, 0));
          addLabel(meshes, "Chromosome", 0xef4444, new THREE.Vector3(-3.5, 1.5, 0), new THREE.Vector3(-1.5, plateY, 0.05));
          addLabel(meshes, "Spindle Fiber", 0x34d399, new THREE.Vector3(3.5, 2.5, 0), new THREE.Vector3(2, plateY, 0));
          addLabel(meshes, "Centriole (Pole)", 0x94a3b8, new THREE.Vector3(-4, 0, 2), new THREE.Vector3(-4, 0, 0));
        } else if (stage === "anaphase") {
          // Chromatids pulled apart
          const colors = [0xef4444, 0xf97316, 0xfbbf24, 0x22c55e];
          const targets = [[-1.5, 1.8], [-0.5, 1.8], [0.5, 1.8], [1.5, 1.8]];
          const origins = [[-1.5, -0.3], [-0.5, -0.3], [0.5, -0.3], [1.5, -0.3]];
          targets.forEach(([tx, ty], i) => {
            const ch = push(new THREE.Mesh(new THREE.CapsuleGeometry(0.1, 0.4, 6, 8), new THREE.MeshPhongMaterial({ color: colors[i] })));
            ch.position.set(tx, ty, 0.05);
          });
          origins.forEach(([ox, oy], i) => {
            const ch = push(new THREE.Mesh(new THREE.CapsuleGeometry(0.1, 0.4, 6, 8), new THREE.MeshPhongMaterial({ color: colors[i], transparent: true, opacity: 0.4 })));
            ch.position.set(ox, oy, 0.05);
          });
          // Pulling lines
          targets.forEach(([tx, ty], i) => {
            const line = push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(tx, ty, 0), new THREE.Vector3(tx * 0.8, ty + 0.8, 0)]), new THREE.LineDashedMaterial({ color: colors[i], dashSize: 0.1, gapSize: 0.06 })) as any);
            (line as any).computeLineDistances();
          });
          push(mkSprite("Anaphase — Sister chromatids separate to opposite poles", "#fbbf24", new THREE.Vector3(0, -5.2, 0), 0.8));
          addLabel(meshes, "Separating Chromatids", 0xef4444, new THREE.Vector3(-3.5, 3.5, 0), new THREE.Vector3(-1.5, 1.8, 0));
          addLabel(meshes, "Pulled toward pole", 0x34d399, new THREE.Vector3(3.5, 3, 0), new THREE.Vector3(-1.5, 1.8, 0));
          addLabel(meshes, "Original Position", 0x94a3b8, new THREE.Vector3(-3.5, -2, 0), new THREE.Vector3(-1.5, -0.3, 0));
        } else if (stage === "telophase") {
          // Two nuclei forming, cell cleaving
          const n1 = push(new THREE.Mesh(new THREE.CircleGeometry(1.5, 20), new THREE.MeshPhongMaterial({ color: 0xa78bfa, transparent: true, opacity: 0.35, side: THREE.DoubleSide })));
          n1.position.set(-1.5, 0, 0.02);
          const n2 = push(new THREE.Mesh(new THREE.CircleGeometry(1.5, 20), new THREE.MeshPhongMaterial({ color: 0xa78bfa, transparent: true, opacity: 0.35, side: THREE.DoubleSide })));
          n2.position.set(1.5, 0, 0.02);
          // Chromosomes decondensing
          for (const px of [-2, -1.5, -1]) {
            const ch = push(new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 6), new THREE.MeshPhongMaterial({ color: 0xef4444 })));
            ch.position.set(px, 0.3, 0.05);
          }
          for (const px of [1, 1.5, 2]) {
            const ch = push(new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 6), new THREE.MeshPhongMaterial({ color: 0xf97316 })));
            ch.position.set(px, 0.3, 0.05);
          }
          // Cleavage furrow
          const furrow = push(new THREE.Mesh(
            new THREE.PlaneGeometry(0.08, 3),
            new THREE.MeshPhongMaterial({ color: 0xfbbf24, transparent: true, opacity: 0.6, side: THREE.DoubleSide }),
          ));
          furrow.position.set(0, 0, 0.03);
          push(mkSprite("Telophase — Two nuclei form, cytokinesis begins", "#fbbf24", new THREE.Vector3(0, -5.2, 0), 0.8));
          addLabel(meshes, "New Nucleus (1)", 0xa78bfa, new THREE.Vector3(-4, 2, 0), n1.position);
          addLabel(meshes, "New Nucleus (2)", 0xa78bfa, new THREE.Vector3(4, 2, 0), n2.position);
          addLabel(meshes, "Cleavage Furrow", 0xfbbf24, new THREE.Vector3(0, 2.5, 0), furrow.position);
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
  }, [stage, isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="Cell Division (Mitosis)" description="3D mitosis stages with chromosome annotations." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Cell Division — Mitosis Stages</span>
          <span className="text-xs text-muted-foreground font-normal">Select a stage to view</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Mitosis Stage">
          <div className="flex flex-wrap gap-2 mt-2">
            {STAGES.map((s) => (
              <button key={s} onClick={() => setStage(s)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  stage === s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-red-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Interphase:</strong> Cell prepares for division; DNA replicates; chromatin is diffuse.</p>
            <p><strong className="text-foreground">Prophase:</strong> Chromosomes condense and become visible; spindle apparatus begins to form; nuclear envelope breaks down.</p>
            <p><strong className="text-foreground">Metaphase:</strong> Chromosomes align at the metaphase plate; spindle fibers attach to centromeres.</p>
            <p><strong className="text-foreground">Anaphase:</strong> Sister chromatids separate and are pulled toward opposite poles by spindle fibers.</p>
            <p><strong className="text-foreground">Telophase:</strong> Two new nuclei form around separated chromosomes; cytokinesis divides the cytoplasm.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
