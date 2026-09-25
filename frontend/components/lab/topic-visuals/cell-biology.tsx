"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallback } from "@/components/lab/webgl-fallback";
import { VizToolbar, type VizTarget } from "@/components/viz/viz-toolbar";
import { ScenePresets, ReadoutGrid, type ScenePreset } from "@/components/lab/scene-interactivity";
import * as THREE from "three";
import { LiveLeaderLine } from "@/components/lab/leader-lines-3d";

/* ============================================================
   Eukaryotic Cell — NEB Biology 11 (Biomolecules & Cell Biology)
   3D cell with long arrow labels pointing to each organelle.
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

function addLabel(scene: THREE.Scene, meshes: THREE.Object3D[], labelSprites: THREE.Sprite[], text: string, color: number, labelPos: THREE.Vector3, targetPos: THREE.Vector3) {
  const dir = targetPos.clone().sub(labelPos).normalize();
  const len = labelPos.distanceTo(targetPos);
  const line = new LiveLeaderLine(dir, labelPos, len * 0.85, color, 0.22, 0.14);
  scene.add(line);
  meshes.push(line);
  const labelP = labelPos.clone().sub(dir.clone().multiplyScalar(0.45));
  const s = mkSprite(text, `#${color.toString(16).padStart(6, "0")}`, labelP, 0.85);
  scene.add(s);
  meshes.push(s);
  labelSprites.push(s);
}

type CellFocus = "all" | "energy" | "protein" | "control" | "boundary";

const FOCUS_INFO: Record<CellFocus, { team: string; one: string; two: string; three: string; four: string }> = {
  all: { team: "All organelles visible", one: "Nucleus stores DNA & runs the cell", two: "Mitochondria = ATP via respiration", three: "Chloroplast = sugars via photosynthesis", four: "ER · Golgi · ribosomes handle protein traffic" },
  energy: { team: "Energy-converting organelles", one: "Mitochondria: aerobic respiration → ATP", two: "Chloroplast: light → glucose (thylakoid grana)", three: "Both have own DNA + double membrane", four: "Other organelles dimmed for focus" },
  protein: { team: "Protein synthesis & packaging", one: "Ribosomes: translate mRNA into protein", two: "Rough ER: folds & transports proteins", three: "Golgi: modifies, sorts, packages", four: "Vesicles shuttle cargo ER → Golgi → membrane" },
  control: { team: "Control & information center", one: "Nucleus: holds chromatin (DNA + histones)", two: "Nucleolus: assembles ribosomal subunits", three: "Nuclear pores: mRNA exits, proteins enter", four: "Other organelles dimmed for focus" },
  boundary: { team: "Boundaries, storage & cleanup", one: "Cell membrane: selective barrier (phospholipid bilayer)", two: "Cell wall: cellulose — plant only", three: "Vacuole: water, turgor pressure & storage", four: "Lysosomes: hydrolytic enzyme digestion" },
};

export function CellBiologyVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const vizTargetRef = useRef<VizTarget>({});
  const [rotationSpeed, setRotationSpeed] = useState(0.3);
  const [focus, setFocus] = useState<CellFocus>("all");
  const [showLabels, setShowLabels] = useState(true);
  const [runId, setRunId] = useState(0);
  const [isWebGL] = useState(() => isWebGLAvailable());

  const info = FOCUS_INFO[focus];

  const presets: ScenePreset[] = [
    { name: "Whole cell", hint: "Animal + plant organelles together, all labeled.", apply: () => { setFocus("all"); setRunId((r) => r + 1); } },
    { name: "Power plants", hint: "Mitochondria and chloroplast — the cell's energy converters.", apply: () => { setFocus("energy"); setRunId((r) => r + 1); } },
    { name: "Protein pipeline", hint: "Ribosome → rough ER → Golgi: make, fold, ship.", apply: () => { setFocus("protein"); setRunId((r) => r + 1); } },
    { name: "Nucleus focus", hint: "Control center: chromatin inside, nucleolus making ribosomes.", apply: () => { setFocus("control"); setRunId((r) => r + 1); } },
  ];

  const resetAll = () => {
    setFocus("all");
    setRotationSpeed(0.3);
    setShowLabels(true);
    setRunId((r) => r + 1);
  };


  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isWebGL) return;

    let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer;
    let controls: any, frameId: number;
    const meshes: THREE.Object3D[] = [];
    const labelSprites: THREE.Sprite[] = [];

    const init = async () => {
      const { OrbitControls } = await import("three/addons/controls/OrbitControls.js");

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0f172a);
      camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
      camera.position.set(0, 2, 14);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.autoRotate = true;
      controls.autoRotateSpeed = rotationSpeed;
      controls.minDistance = 5;
      controls.maxDistance = 22;
      vizTargetRef.current = { controls, el: container, canvasEl: renderer.domElement, setLabels: (on: boolean) => labelSprites.forEach((s) => (s.visible = on)) };

      scene.add(new THREE.AmbientLight(0xffffff, 0.65));
      const dl = new THREE.DirectionalLight(0xffffff, 0.9);
      dl.position.set(5, 8, 5);
      scene.add(dl);

      const push = <T extends THREE.Object3D>(o: T): T => { scene.add(o); meshes.push(o); return o; };

      // Cell membrane (large ellipsoid)
      const cellMembrane = push(new THREE.Mesh(
        new THREE.SphereGeometry(4, 32, 24),
        new THREE.MeshPhongMaterial({ color: 0x7dd3fc, transparent: true, opacity: 0.18, side: THREE.DoubleSide, shininess: 30 }),
      ));

      // Cell wall (slightly larger, for plant cell)
      const cellWall = push(new THREE.Mesh(
        new THREE.SphereGeometry(4.2, 32, 24),
        new THREE.MeshPhongMaterial({ color: 0x4ade80, transparent: true, opacity: 0.1, side: THREE.DoubleSide }),
      ));

      // Nucleus
      const nucleus = push(new THREE.Mesh(
        new THREE.SphereGeometry(1.3, 24, 18),
        new THREE.MeshPhongMaterial({ color: 0xa78bfa, shininess: 40 }),
      ));
      nucleus.position.set(0.5, 0.3, 0);
      // Nucleolus
      const nucleolus = push(new THREE.Mesh(
        new THREE.SphereGeometry(0.35, 16, 12),
        new THREE.MeshPhongMaterial({ color: 0x7c3aed }),
      ));
      nucleolus.position.set(0.5, 0.3, 0.6);

      // Mitochondria
      const mitoPositions = [
        { pos: new THREE.Vector3(-2.5, 1.5, 1), rot: [0.3, 0.5, 0] },
        { pos: new THREE.Vector3(2.2, -1.2, -1.5), rot: [-0.4, 0.2, 0.6] },
        { pos: new THREE.Vector3(-1.8, -1.8, 1.2), rot: [0.6, -0.3, 0.2] },
      ];
      const mitochondria: THREE.Mesh[] = [];
      for (const m of mitoPositions) {
        const mito = push(new THREE.Mesh(
          new THREE.CapsuleGeometry(0.28, 0.7, 8, 12),
          new THREE.MeshPhongMaterial({ color: 0xf97316, shininess: 50 }),
        ));
        mito.position.copy(m.pos);
        mito.rotation.set(m.rot[0], m.rot[1], m.rot[2]);
        mitochondria.push(mito);
      }

      // ER (network of tubes)
      const erGroup = new THREE.Group();
      const erTubes: THREE.Mesh[] = [];
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const r = 1.6 + Math.random() * 0.4;
        const tube = new THREE.Mesh(
          new THREE.TorusGeometry(r, 0.08, 8, 24, Math.PI * 1.2),
          new THREE.MeshPhongMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.7 }),
        );
        tube.position.set(0.5, 0.3, 0);
        tube.rotation.set(Math.random() * 0.5, angle, Math.random() * 0.5);
        erGroup.add(tube);
        erTubes.push(tube);
        meshes.push(tube);
      }
      scene.add(erGroup);

      // Golgi body
      const golgi = push(new THREE.Mesh(
        new THREE.TorusGeometry(0.6, 0.12, 8, 20, Math.PI * 1.4),
        new THREE.MeshPhongMaterial({ color: 0xfbbf24, shininess: 60 }),
      ));
      golgi.position.set(2, 1.5, -0.5);
      golgi.rotation.set(0.5, 0.3, 0.2);
      const golgi2 = push(new THREE.Mesh(
        new THREE.TorusGeometry(0.5, 0.1, 8, 20, Math.PI * 1.3),
        new THREE.MeshPhongMaterial({ color: 0xf59e0b, shininess: 60 }),
      ));
      golgi2.position.set(2.1, 1.3, -0.3);
      golgi2.rotation.set(0.6, 0.4, 0.1);

      // Lysosomes
      const lysoPositions = [
        new THREE.Vector3(-2, 0.5, -2),
        new THREE.Vector3(1.5, -2.2, 0.8),
        new THREE.Vector3(-0.8, 2, -1.8),
      ];
      const lysosomes: THREE.Mesh[] = [];
      for (const p of lysoPositions) {
        const lyso = push(new THREE.Mesh(
          new THREE.SphereGeometry(0.25, 12, 10),
          new THREE.MeshPhongMaterial({ color: 0xef4444 }),
        ));
        lyso.position.copy(p);
        lysosomes.push(lyso);
      }

      // Ribosomes (small dots)
      const ribosomePositions = [
        new THREE.Vector3(-3, 0, 0), new THREE.Vector3(3, 0.5, 0),
        new THREE.Vector3(0, -3, 0.5), new THREE.Vector3(0, 3, -0.5),
        new THREE.Vector3(-2, -2, 1), new THREE.Vector3(2, 2, -1),
        new THREE.Vector3(1, -2.5, -1.5), new THREE.Vector3(-1.5, 2.5, 1),
      ];
      const ribosomes: THREE.Mesh[] = [];
      for (const p of ribosomePositions) {
        const ribo = push(new THREE.Mesh(
          new THREE.SphereGeometry(0.08, 8, 6),
          new THREE.MeshPhongMaterial({ color: 0x34d399 }),
        ));
        ribo.position.copy(p);
        ribosomes.push(ribo);
      }

      // Chloroplast (plant cell)
      const chloroplast = push(new THREE.Mesh(
        new THREE.CapsuleGeometry(0.45, 0.9, 8, 12),
        new THREE.MeshPhongMaterial({ color: 0x22c55e, shininess: 30 }),
      ));
      chloroplast.position.set(-2.8, -0.5, -1.5);
      chloroplast.rotation.set(0.3, 0.8, 0.4);
      // Thylakoid stacks inside
      const thylakoids: THREE.Mesh[] = [];
      for (let i = 0; i < 4; i++) {
        const thylakoid = push(new THREE.Mesh(
          new THREE.CylinderGeometry(0.2, 0.2, 0.04, 12),
          new THREE.MeshPhongMaterial({ color: 0x16a34a }),
        ));
        thylakoid.position.set(-2.8, -0.5 + (i - 1.5) * 0.12, -1.5);
        thylakoid.rotation.set(0.3, 0.8, 0.4);
        thylakoids.push(thylakoid);
      }

      // Central vacuole
      const vacuole = push(new THREE.Mesh(
        new THREE.SphereGeometry(1.2, 20, 16),
        new THREE.MeshPhongMaterial({ color: 0x93c5fd, transparent: true, opacity: 0.3 }),
      ));
      vacuole.position.set(-1, -0.5, 0);

      // Long arrow labels — CRITICAL: each structure has a long arrow from label to target
      const R = 0xffffff;
      addLabel(scene, meshes, labelSprites, "Nucleus", 0xa78bfa, new THREE.Vector3(3.5, 3, 2), nucleus.position);
      addLabel(scene, meshes, labelSprites, "Nucleolus", 0x7c3aed, new THREE.Vector3(2.5, 3.5, -1.5), nucleolus.position);
      addLabel(scene, meshes, labelSprites, "Mitochondria", 0xf97316, new THREE.Vector3(-4, 3.5, 2), mitoPositions[0].pos);
      addLabel(scene, meshes, labelSprites, "Mitochondria", 0xf97316, new THREE.Vector3(4, -3, -2), mitoPositions[1].pos);
      addLabel(scene, meshes, labelSprites, "Endoplasmic Reticulum", 0x22d3ee, new THREE.Vector3(3, 3, -2.5), new THREE.Vector3(0.5, 0.3, 0));
      addLabel(scene, meshes, labelSprites, "Golgi Body", 0xfbbf24, new THREE.Vector3(4, 3.5, 0), golgi.position);
      addLabel(scene, meshes, labelSprites, "Lysosome", 0xef4444, new THREE.Vector3(-4, -3, 2), lysoPositions[0]);
      addLabel(scene, meshes, labelSprites, "Lysosome", 0xef4444, new THREE.Vector3(4, -3.5, 1), lysoPositions[1]);
      addLabel(scene, meshes, labelSprites, "Ribosome", 0x34d399, new THREE.Vector3(-4, 2, 3), ribosomePositions[0]);
      addLabel(scene, meshes, labelSprites, "Chloroplast", 0x22c55e, new THREE.Vector3(-4.5, 1, -3), chloroplast.position);
      addLabel(scene, meshes, labelSprites, "Central Vacuole", 0x93c5fd, new THREE.Vector3(-4, -2, 3), vacuole.position);
      addLabel(scene, meshes, labelSprites, "Cell Membrane", 0x7dd3fc, new THREE.Vector3(4, 0, 3.5), cellMembrane.position);
      addLabel(scene, meshes, labelSprites, "Cell Wall", 0x4ade80, new THREE.Vector3(4.2, 1, -3.5), cellWall.position);

      // Title label
      push(mkSprite("Eukaryotic Cell — Organelle Diagram", "#fbbf24", new THREE.Vector3(0, 5.2, 0), 0.9));

      const GROUPS: Record<Exclude<CellFocus, "all">, THREE.Object3D[]> = {
        energy: [...mitochondria, chloroplast, ...thylakoids],
        protein: [...erTubes, golgi, golgi2, ...ribosomes],
        control: [nucleus, nucleolus],
        boundary: [cellMembrane, cellWall, vacuole, ...lysosomes],
      };
      const allParts = Object.values(GROUPS).flat();
      const highlighted = focus === "all" ? allParts : GROUPS[focus];
      allParts.forEach((p) => {
        const mat = (p as THREE.Mesh).material as THREE.MeshPhongMaterial;
        if (!mat) return;
        const keep = (mat as any).__origOpacity ?? ((mat as any).__origOpacity = mat.opacity);
        mat.transparent = true;
        mat.opacity = highlighted.includes(p) ? keep : 0.1;
      });

      labelSprites.forEach((s) => (s.visible = showLabels));

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
      // Re-fit the canvas whenever the container itself resizes (screen fit)
      const resizeObserver = new ResizeObserver(() => handleResize());
      resizeObserver.observe(container);

      return () => {
        cancelAnimationFrame(frameId);
        window.removeEventListener("resize", handleResize);
        resizeObserver?.disconnect();
        if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
        meshes.forEach((m) => {
          scene.remove(m);
          if (m instanceof THREE.Mesh) { m.geometry?.dispose(); const mat = m.material; if (Array.isArray(mat)) mat.forEach((x) => x.dispose()); else (Array.isArray(mat) ? mat : [mat]).forEach((x) => x.dispose()); }
          else if (m instanceof THREE.Line) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Sprite) { const sm = m.material; sm.map?.dispose?.(); sm.dispose(); }
          else if (m instanceof THREE.ArrowHelper) m.dispose();
        });
        renderer.dispose();
        controls.dispose?.();
      };
    };

    const cleanup = init();
    return () => { cleanup.then((d) => d?.()); };
  }, [rotationSpeed, focus, isWebGL, runId, showLabels]);

  if (!isWebGL) {
    return <WebGLFallback title="Eukaryotic Cell" description="3D cell organelle diagram with labeled arrows." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Eukaryotic Cell — Organelles</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate · Scroll to zoom</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <ScenePresets presets={presets} />
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={() => setShowLabels((v) => !v)} className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${showLabels ? "border-green-500/50 bg-green-500/10 text-green-300" : "border-border bg-muted/40 text-muted-foreground"}`}>Labels</button>
            <button onClick={resetAll} className="px-2.5 py-1 rounded-md text-xs font-medium border border-border bg-muted/40 text-muted-foreground hover:bg-muted/70 transition-colors" title="Reset to defaults">Reset</button>
          </div>
        </div>
        <CollapsibleControls label="Auto-rotation Speed">
          <div className="flex gap-3 mt-2">
            <div className="w-24">
              <input type="range" min={0} max={2} step={0.1} value={rotationSpeed}
                onChange={(e) => setRotationSpeed(Number(e.target.value))} className="w-full mt-1" />
              <p className="text-xs font-mono text-primary mt-1">{rotationSpeed.toFixed(1)}x</p>
            </div>
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[clamp(320px,60vh,640px)] w-full overflow-hidden rounded-lg border border-border bg-slate-900">
          <VizToolbar targetRef={vizTargetRef} />
        </div>

        <ReadoutGrid items={[
          { label: "Highlighting", value: info.team, highlight: true },
          { label: "Fact 1", value: info.one },
          { label: "Fact 2", value: info.two },
          { label: "Fact 3", value: info.three },
          { label: "Fact 4", value: info.four },
        ]} />

        <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-green-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Nucleus:</strong> Control center containing DNA; surrounded by nuclear envelope with nucleolus inside.</p>
            <p><strong className="text-foreground">Mitochondria:</strong> Powerhouse of the cell — site of aerobic respiration and ATP production.</p>
            <p><strong className="text-foreground">Endoplasmic Reticulum:</strong> Rough ER (with ribosomes) synthesizes proteins; smooth ER synthesizes lipids.</p>
            <p><strong className="text-foreground">Golgi Body:</strong> Modifies, sorts, and packages proteins for secretion.</p>
            <p><strong className="text-foreground">Chloroplast:</strong> Site of photosynthesis — contains thylakoid stacks (grana) with chlorophyll.</p>
            <p><strong className="text-foreground">Lysosomes:</strong> Contain hydrolytic enzymes for intracellular digestion.</p>
            <p><strong className="text-foreground">Cell Wall:</strong> Rigid outer layer (plants) providing structural support — differs from cell membrane.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
