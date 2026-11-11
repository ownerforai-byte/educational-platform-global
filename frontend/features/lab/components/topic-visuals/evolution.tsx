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
   Evolution — Phylogenetic Tree — NEB Biology 11
   Shows evolutionary relationships with adaptation labels.
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
  const lp = labelPos.clone().sub(dir.clone().multiplyScalar(0.45));
  const s = mkSprite(text, `#${color.toString(16).padStart(6, "0")}`, lp, 0.85);
  scene.add(s);
  meshes.push(s);
  labelSprites.push(s);
}

type EvoFocus = "all" | "land" | "mammals";

export function EvolutionVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const vizTargetRef = useRef<VizTarget>({});
  const [focus, setFocus] = useState<EvoFocus>("all");
  const [showLabels, setShowLabels] = useState(true);
  const [runId, setRunId] = useState(0);
  const [isWebGL] = useState(() => isWebGLAvailable());

  const FOCUS_INFO: Record<EvoFocus, { lineage: string; transition: string; derived: string; evidence: string; tip: string }> = {
    all: { lineage: "Whole tree of vertebrates", transition: "Water → land → air, ~500 Myr of divergence", derived: "Shared (homologous) structures at every node", evidence: "Fossils, comparative anatomy, embryology, DNA", tip: "Nodes = common ancestors; tips = living lineages" },
    land: { lineage: "Fish → Amphibians → Reptiles", transition: "Tetrapod limbs and lungs opened the land (~370 Myr)", derived: "Limbs, ribs, stronger skull — from lobe-finned fish", evidence: "Tiktaalik fossil bridges fish and amphibians", tip: "Amniotic egg freed reptiles from water for reproduction" },
    mammals: { lineage: "Mammal radiation (Rodents, Primates, Carnivora)", transition: "Endothermy and live birth after the dinosaur extinction", derived: "Hair, mammary glands, three middle-ear bones", evidence: "Molecular clocks group all mammals ~220 Myr back", tip: "Humans share the Primate node — we descend FROM apes, not apes from us" },
  };
  const info = FOCUS_INFO[focus];

  const presets: ScenePreset[] = [
    { name: "Whole tree", hint: "Every lineage at once — read nodes, branches and tips.", apply: () => { setFocus("all"); setRunId((r) => r + 1); } },
    { name: "Conquest of land", hint: "Highlight the fish → amphibian → reptile transition.", apply: () => { setFocus("land"); setRunId((r) => r + 1); } },
    { name: "Rise of mammals", hint: "Follow the mammal branch — hair, milk, warm blood.", apply: () => { setFocus("mammals"); setRunId((r) => r + 1); } },
  ];

  const resetAll = () => {
    setFocus("all");
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
      camera.position.set(0, 0, 14);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.autoRotate = false;
      controls.minDistance = 5;
      controls.maxDistance = 22;
      vizTargetRef.current = { controls, el: container, canvasEl: renderer.domElement, setLabels: (on: boolean) => labelSprites.forEach((s) => (s.visible = on)) };

      scene.add(new THREE.AmbientLight(0xffffff, 0.7));
      const dl = new THREE.DirectionalLight(0xffffff, 0.9);
      dl.position.set(4, 6, 4);
      scene.add(dl);

      const push = <T extends THREE.Object3D>(o: T): T => { scene.add(o); meshes.push(o); return o; };
      const addSprite = (s: THREE.Sprite): THREE.Sprite => { push(s); labelSprites.push(s); return s; };

      // Root (common ancestor)
      const root = push(new THREE.Mesh(
        new THREE.SphereGeometry(0.3, 12, 10),
        new THREE.MeshPhongMaterial({ color: 0x92400e }),
      ));
      root.position.set(-5, 0, 0);

      // Main branch trunk
      const trunk = push(new THREE.Mesh(
        new THREE.CylinderGeometry(0.05, 0.05, 3, 6),
        new THREE.MeshPhongMaterial({ color: 0x78350f }),
      ));
      trunk.position.set(-3.5, 0, 0);

      // Branch 1: Simple organisms → up
      const branch1 = push(new THREE.Mesh(
        new THREE.CylinderGeometry(0.03, 0.03, 1.5, 6),
        new THREE.MeshPhongMaterial({ color: 0x64748b }),
      ));
      branch1.position.set(-2, 1.2, 0);
      const branch1Tip = push(new THREE.Mesh(
        new THREE.SphereGeometry(0.18, 8, 6),
        new THREE.MeshPhongMaterial({ color: 0x64748b }),
      ));
      branch1Tip.position.set(-2, 2.0, 0);

      // Branch 2: splits into multiple
      const branch2 = push(new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.04, 1.0, 6),
        new THREE.MeshPhongMaterial({ color: 0x22c55e }),
      ));
      branch2.position.set(-1.5, 0.5, 0);

      // Sub-branches from branch 2
      const subBranches = [
        { angle: -0.4, label: "Fish", color: 0x3b82f6, yOff: 0 },
        { angle: 0, label: "Amphibians", color: 0x22c55e, yOff: 0.3 },
        { angle: 0.4, label: "Reptiles", color: 0xf97316, yOff: 0.6 },
      ];
      const subTips: { pos: THREE.Vector3; label: string }[] = [];
      const landParts: THREE.Object3D[] = [];
      for (const sb of subBranches) {
        const sub = push(new THREE.Mesh(
          new THREE.CylinderGeometry(0.025, 0.025, 1.0, 6),
          new THREE.MeshPhongMaterial({ color: sb.color }),
        ));
        sub.position.set(-0.8 + Math.sin(sb.angle) * 0.5, 1.0 + sb.yOff, 0);
        sub.rotation.z = sb.angle;
        const tip = push(new THREE.Mesh(
          new THREE.SphereGeometry(0.15, 8, 6),
          new THREE.MeshPhongMaterial({ color: sb.color }),
        ));
        tip.position.set(-0.8 + Math.sin(sb.angle) * 1.0, 1.0 + sb.yOff + 0.5, 0);
        subTips.push({ pos: tip.position.clone(), label: sb.label });
        addSprite(mkSprite(sb.label, `#${sb.color.toString(16).padStart(6, "0")}`, tip.position.clone().add(new THREE.Vector3(0.9, 0.35, 0)), 0.6));
        landParts.push(sub, tip);
      }

      // Main trunk continues to mammals
      const trunk2 = push(new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.04, 1.5, 6),
        new THREE.MeshPhongMaterial({ color: 0xa78bfa }),
      ));
      trunk2.position.set(-0.5, -0.5, 0);

      // Mammal sub-branches
      const mammalBranches = [
        { angle: -0.3, label: "Rodents", color: 0xfbbf24 },
        { angle: 0, label: "Primates", color: 0xef4444 },
        { angle: 0.3, label: "Carnivora", color: 0x22d3ee },
      ];
      const mammalTips: { pos: THREE.Vector3; label: string }[] = [];
      const mammalParts: THREE.Object3D[] = [];
      for (const mb of mammalBranches) {
        const sub = push(new THREE.Mesh(
          new THREE.CylinderGeometry(0.025, 0.025, 0.8, 6),
          new THREE.MeshPhongMaterial({ color: mb.color }),
        ));
        sub.position.set(0 + Math.sin(mb.angle) * 0.4, -1.2, 0);
        sub.rotation.z = mb.angle;
        const tip = push(new THREE.Mesh(
          new THREE.SphereGeometry(0.13, 8, 6),
          new THREE.MeshPhongMaterial({ color: mb.color }),
        ));
        tip.position.set(0 + Math.sin(mb.angle) * 0.7, -1.2 - 0.4, 0);
        mammalTips.push({ pos: tip.position.clone(), label: mb.label });
        addSprite(mkSprite(mb.label, `#${mb.color.toString(16).padStart(6, "0")}`, tip.position.clone().add(new THREE.Vector3(0.9, -0.3, 0)), 0.6));
        mammalParts.push(sub, tip);
      }

      // Adaptation labels with arrows
      const adaptations = [
        { pos: new THREE.Vector3(-2, 2.8, 0), target: branch1Tip.position, text: "Simple body plan", color: 0x64748b },
        { pos: new THREE.Vector3(-3.5, 2.0, 2), target: new THREE.Vector3(-2, 2.0, 0), text: "Aquatic adaptation", color: 0x3b82f6 },
        { pos: new THREE.Vector3(1.5, 2.0, -2), target: new THREE.Vector3(-0.8, 1.6, 0), text: "Terrestrial adaptation", color: 0x22c55e },
        { pos: new THREE.Vector3(2.5, 0.5, 2), target: mammalTips[1].pos, text: "Endothermy, live birth", color: 0xef4444 },
        { pos: new THREE.Vector3(2, -1.5, -2), target: mammalTips[0].pos, text: "Hair, mammary glands", color: 0xfbbf24 },
      ];
      for (const ad of adaptations) {
        addLabel(scene, meshes, labelSprites, ad.text, ad.color, ad.pos, ad.target);
      }

      // Key evolutionary milestones
      const milestones = [
        { text: "Origin of Life", y: -2.5, color: 0x92400e },
        { text: "Multicellularity", y: -1.8, color: 0x78350f },
        { text: "Vertebrates", y: -1.0, color: 0x3b82f6 },
        { text: "Amniotic Egg", y: -0.2, color: 0xf97316 },
        { text: "Mammals", y: 0.6, color: 0xa78bfa },
      ];
      for (const ms of milestones) {
        const dot = push(new THREE.Mesh(
          new THREE.SphereGeometry(0.06, 6, 4),
          new THREE.MeshPhongMaterial({ color: ms.color }),
        ));
        dot.position.set(-5.5, ms.y, 0);
        addSprite(mkSprite(ms.text, `#${ms.color.toString(16).padStart(6, "0")}`, new THREE.Vector3(-6.5, ms.y, 0), 0.6));
      }

      push(mkSprite("Evolutionary Tree — Major Adaptations", "#fbbf24", new THREE.Vector3(0, 3.5, 0), 0.85));
      labelSprites.forEach((s) => (s.visible = showLabels));

      // Focus dimming: highlight the selected lineage, fade the rest
      const allParts: THREE.Object3D[] = [root, trunk, branch1, branch1Tip, branch2, ...landParts, trunk2, ...mammalParts];
      const GROUPS: Record<Exclude<EvoFocus, "all">, THREE.Object3D[]> = {
        land: [root, trunk, branch2, ...landParts],
        mammals: [root, trunk, trunk2, ...mammalParts],
      };
      const highlighted = focus === "all" ? allParts : GROUPS[focus];
      allParts.forEach((p) => {
        const mat = (p as THREE.Mesh).material as THREE.MeshPhongMaterial;
        if (!mat) return;
        const keep = (mat as any).__origOpacity ?? ((mat as any).__origOpacity = mat.opacity);
        mat.transparent = true;
        mat.opacity = highlighted.includes(p) ? keep : 0.12;
      });

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
          else if (m instanceof THREE.Sprite) { const sm = m.material; sm.map?.dispose?.(); sm.dispose(); }
          else if (m instanceof THREE.ArrowHelper) m.dispose();
        });
        renderer.dispose();
        controls.dispose?.();
      };
    };

    const cleanup = init();
    return () => { cleanup.then((d) => d?.()); };
  }, [focus, isWebGL, runId, showLabels]);

  if (!isWebGL) {
    return <WebGLFallback title="Evolutionary Biology" description="3D phylogenetic tree with adaptation labels." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Evolution — Phylogenetic Tree</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate · Key adaptations labeled</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <ScenePresets presets={presets} />
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={() => setShowLabels((v) => !v)} className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${showLabels ? "border-purple-500/50 bg-purple-500/10 text-purple-300" : "border-border bg-muted/40 text-muted-foreground"}`}>Labels</button>
            <button onClick={resetAll} className="px-2.5 py-1 rounded-md text-xs font-medium border border-border bg-muted/40 text-muted-foreground hover:bg-muted/70 transition-colors" title="Reset to defaults">Reset</button>
          </div>
        </div>

        <div ref={containerRef} className="relative h-[clamp(320px,60vh,640px)] w-full overflow-hidden rounded-lg border border-border bg-slate-900">
          <VizToolbar targetRef={vizTargetRef} />
        </div>

        <ReadoutGrid items={[
          { label: "Lineage in focus", value: info.lineage, highlight: true },
          { label: "Key transition", value: info.transition },
          { label: "Shared derived traits", value: info.derived },
          { label: "Evidence", value: info.evidence },
          { label: "Exam tip", value: info.tip },
        ]} />

        <div className="rounded-lg border border-purple-500/30 bg-purple-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-purple-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Common ancestry:</strong> All life shares a common ancestor; evolutionary tree shows divergence over time.</p>
            <p><strong className="text-foreground">Adaptation:</strong> Traits that increase survival and reproduction in a given environment — drive natural selection.</p>
            <p><strong className="text-foreground">Key transitions:</strong> Simple → multicellular → aquatic → terrestrial → amniotic egg → endothermy.</p>
            <p><strong className="text-foreground">Evidence:</strong> Fossil record, comparative anatomy, embryology, biochemistry, and biogeography.</p>
            <p><strong className="text-foreground">Natural selection:</strong> Darwin's mechanism — individuals with favorable variations survive and reproduce more.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
