"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallback } from "@/components/lab/webgl-fallback";
import * as THREE from "three";

/* ============================================================
   Mendel's Laws — NEB Biology 12 (Heredity & Evolution)
   Monohybrid and dihybrid crosses with allele arrows.
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

type CrossType = "mono" | "di";

export function MendelsLawsVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [crossType, setCrossType] = useState<CrossType>("mono");
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
        while (meshes.length > 100) {
          const m = meshes.pop()!;
          scene.remove(m);
          if (m instanceof THREE.Mesh) { m.geometry?.dispose(); const mat = m.material; if (Array.isArray(mat)) mat.forEach((x) => x.dispose()); else (Array.isArray(mat) ? mat : [mat]).forEach((x) => x.dispose()); }
          else if (m instanceof THREE.Sprite) { const sm = m.material; sm.map?.dispose?.(); sm.dispose(); }
          else if (m instanceof THREE.ArrowHelper) m.dispose();
        }

        if (crossType === "mono") {
          // Monohybrid cross: Tt × Tt → 3 Tall : 1 Dwarf
          // Parent generation
          const p1 = push(new THREE.Mesh(
            new THREE.SphereGeometry(0.3, 10, 8),
            new THREE.MeshPhongMaterial({ color: 0x22c55e }),
          ));
          p1.position.set(-3, 2.5, 0);
          const p2 = push(new THREE.Mesh(
            new THREE.SphereGeometry(0.3, 10, 8),
            new THREE.MeshPhongMaterial({ color: 0x22c55e }),
          ));
          p2.position.set(-1.5, 2.5, 0);

          push(mkSprite("P: TT × tt", "#fbbf24", new THREE.Vector3(-2.25, 3.2, 0), 0.75));

          // F1 generation
          const f1a = push(new THREE.Mesh(
            new THREE.SphereGeometry(0.22, 8, 6),
            new THREE.MeshPhongMaterial({ color: 0x22c55e }),
          ));
          f1a.position.set(-3, 1.2, 0);
          const f1b = push(new THREE.Mesh(
            new THREE.SphereGeometry(0.22, 8, 6),
            new THREE.MeshPhongMaterial({ color: 0x22c55e }),
          ));
          f1b.position.set(-1.5, 1.2, 0);

          addLabel(meshes, "F₁: All Tt (Tall)", 0x22c55e, new THREE.Vector3(-4, 1.2, 2.5), new THREE.Vector3(-2.25, 1.2, 0));

          // F2 Punnett square
          const squareX = 1.0;
          const squareY = 0.5;
          const cellSize = 0.7;
          const genotypes = ["TT", "Tt", "tT", "tt"];
          const phenotypes = ["Tall", "Tall", "Tall", "Dwarf"];
          const colors = [0x22c55e, 0x22c55e, 0x22c55e, 0xef4444];

          // Grid
          for (let r = 0; r <= 2; r++) {
            push(new THREE.Line(
              new THREE.BufferGeometry().setFromPoints([
                new THREE.Vector3(squareX - cellSize, squareY + r * cellSize, 0),
                new THREE.Vector3(squareX + 2 * cellSize, squareY + r * cellSize, 0),
              ]),
              new THREE.LineBasicMaterial({ color: 0x475569 }),
            ));
            push(new THREE.Line(
              new THREE.BufferGeometry().setFromPoints([
                new THREE.Vector3(squareX + r * cellSize, squareY, 0),
                new THREE.Vector3(squareX + r * cellSize, squareY + 2 * cellSize, 0),
              ]),
              new THREE.LineBasicMaterial({ color: 0x475569 }),
            ));
          }

          // Header labels
          push(mkSprite("T", "#22c55e", new THREE.Vector3(squareX + 0.35, squareY + 2 * cellSize + 0.4, 0), 0.7));
          push(mkSprite("t", "#ef4444", new THREE.Vector3(squareX + 1.05, squareY + 2 * cellSize + 0.4, 0), 0.7));
          push(mkSprite("T", "#22c55e", new THREE.Vector3(squareX - 0.5, squareY + 1.4, 0), 0.7));
          push(mkSprite("t", "#ef4444", new THREE.Vector3(squareX - 0.5, squareY + 0.7, 0), 0.7));

          // Cells
          for (let i = 0; i < 4; i++) {
            const col = i % 2;
            const row = Math.floor(i / 2);
            const cx = squareX + col * cellSize + cellSize / 2;
            const cy = squareY + (1 - row) * cellSize + cellSize / 2;
            const cell = push(new THREE.Mesh(
              new THREE.BoxGeometry(cellSize * 0.9, cellSize * 0.9, 0.05),
              new THREE.MeshPhongMaterial({ color: colors[i], transparent: true, opacity: 0.4 }),
            ));
            cell.position.set(cx, cy, 0);
            push(mkSprite(`${genotypes[i]}\n(${phenotypes[i]})`, `#${colors[i].toString(16).padStart(6, "0")}`, new THREE.Vector3(cx, cy + 0.6, 0), 0.6));
          }

          // Ratio label
          push(mkSprite("Phenotypic ratio: 3 Tall : 1 Dwarf", "#fbbf24", new THREE.Vector3(squareX + 0.5, squareY - 0.8, 0), 0.75));
          push(mkSprite("Genotypic ratio: 1 TT : 2 Tt : 1 tt", "#7dd3fc", new THREE.Vector3(squareX + 0.5, squareY - 1.4, 0), 0.65));

          // Law label
          addLabel(meshes, "Law of Segregation:\nAlleles separate during gamete formation", 0xa78bfa,
            new THREE.Vector3(4.0, 3.0, -2),
            new THREE.Vector3(squareX + 0.5, squareY + 0.5, 0));

          push(mkSprite("Monohybrid Cross — Law of Segregation", "#fbbf24", new THREE.Vector3(0, 3.8, 0), 0.85));
        } else {
          // Dihybrid cross: TtYy × TtYy → 9:3:3:1
          const squareX = 0.5;
          const squareY = -1.5;
          const cellSize = 0.55;

          // 4×4 grid
          for (let r = 0; r <= 4; r++) {
            push(new THREE.Line(
              new THREE.BufferGeometry().setFromPoints([
                new THREE.Vector3(squareX - cellSize, squareY + r * cellSize, 0),
                new THREE.Vector3(squareX + 4 * cellSize, squareY + r * cellSize, 0),
              ]),
              new THREE.LineBasicMaterial({ color: 0x475569 }),
            ));
            push(new THREE.Line(
              new THREE.BufferGeometry().setFromPoints([
                new THREE.Vector3(squareX + r * cellSize, squareY, 0),
                new THREE.Vector3(squareX + r * cellSize, squareY + 4 * cellSize, 0),
              ]),
              new THREE.LineBasicMaterial({ color: 0x475569 }),
            ));
          }

          // Gamete labels
          const topGametes = ["TY", "Ty", "tY", "ty"];
          const sideGametes = ["TY", "Ty", "tY", "ty"];
          for (let i = 0; i < 4; i++) {
            push(mkSprite(topGametes[i], "#22d3ee", new THREE.Vector3(squareX + i * cellSize + cellSize / 2, squareY + 4 * cellSize + 0.35, 0), 0.55));
            push(mkSprite(sideGametes[i], "#34d399", new THREE.Vector3(squareX - 0.5, squareY + (3 - i) * cellSize + cellSize / 2, 0), 0.55));
          }

          // Phenotype colors
          const phenColors: Record<string, number> = { "T_Y_": 0x22c55e, "T_yy": 0x3b82f6, "ttY_": 0xf97316, "ttyy": 0xef4444 };
          const phenotypes9331 = [
            "T_Y_", "T_Y_", "T_yy", "T_Y_",
            "T_Y_", "T_Y_", "T_yy", "T_Y_",
            "ttY_", "ttY_", "ttyy", "ttY_",
            "T_Y_", "T_Y_", "T_yy", "T_Y_",
          ];

          for (let i = 0; i < 16; i++) {
            const col = i % 4;
            const row = Math.floor(i / 4);
            const cx = squareX + col * cellSize + cellSize / 2;
            const cy = squareY + (3 - row) * cellSize + cellSize / 2;
            const pheno = phenotypes9331[i];
            const color = phenColors[pheno];
            const cell = push(new THREE.Mesh(
              new THREE.BoxGeometry(cellSize * 0.85, cellSize * 0.85, 0.05),
              new THREE.MeshPhongMaterial({ color, transparent: true, opacity: 0.35 }),
            ));
            cell.position.set(cx, cy, 0);
          }

          // Ratio
          push(mkSprite("9 : 3 : 3 : 1", "#fbbf24", new THREE.Vector3(squareX + 1, squareY - 0.8, 0), 0.85));
          push(mkSprite("Tall Yellow : Tall Green : Dwarf Yellow : Dwarf Green", "#7dd3fc", new THREE.Vector3(squareX + 1, squareY - 1.4, 0), 0.55));

          addLabel(meshes, "Law of Independent Assortment:\nAlleles of different genes segregate independently", 0xa78bfa,
            new THREE.Vector3(4, 2.5, -2),
            new THREE.Vector3(squareX + 1, squareY + 1, 0));

          push(mkSprite("Dihybrid Cross — Law of Independent Assortment", "#fbbf24", new THREE.Vector3(0, 3.8, 0), 0.8));
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
  }, [crossType, isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="Mendel's Laws" description="3D monohybrid and dihybrid cross diagrams." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Mendel's Laws — Crosses & Ratios</span>
          <span className="text-xs text-muted-foreground font-normal">Select cross type</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Cross Type">
          <div className="flex flex-wrap gap-2 mt-2">
            {(["mono", "di"] as const).map((c) => (
              <button key={c} onClick={() => setCrossType(c)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  crossType === c ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}>
                {c === "mono" ? "Monohybrid Cross" : "Dihybrid Cross"}
              </button>
            ))}
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-green-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Law of Segregation (1st Law):</strong> During gamete formation, the two alleles for a trait separate; each gamete carries only one allele.</p>
            <p><strong className="text-foreground">Law of Independent Assortment (2nd Law):</strong> Alleles of different genes assort independently during gamete formation (applies to genes on different chromosomes).</p>
            <p><strong className="text-foreground">Monohybrid cross ratio:</strong> Phenotypic 3:1; Genotypic 1:2:1.</p>
            <p><strong className="text-foreground">Dihybrid cross ratio:</strong> Phenotypic 9:3:3:1 (for two heterozygous traits).</p>
            <p><strong className="text-foreground">Dominance:</strong> The dominant allele masks the expression of the recessive allele in heterozygotes.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
