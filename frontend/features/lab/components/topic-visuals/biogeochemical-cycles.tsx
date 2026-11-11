"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallback } from "@/components/lab/webgl-fallback";
import { VizToolbar, type VizTarget } from "@/components/viz/viz-toolbar";
import { ScenePresets, PlaybackBar, ReadoutGrid, type ScenePreset } from "@/components/lab/scene-interactivity";
import * as THREE from "three";
import { LiveLeaderLine } from "@/components/lab/leader-lines-3d";

/* ============================================================
   Biogeochemical Cycles — NEB Biology 11 (Ecology)
   Shows carbon and nitrogen cycles with process arrows.
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

type CycleView = "carbon" | "nitrogen";

export function BiogeochemicalCyclesVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const vizTargetRef = useRef<VizTarget>({});
  const [cycle, setCycle] = useState<CycleView>("carbon");
  const [showLabels, setShowLabels] = useState(true);
  const [runId, setRunId] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const speedRef = useRef(1);
  const playingRef = useRef(true);
  const [isWebGL] = useState(() => isWebGLAvailable());

  useEffect(() => {
    speedRef.current = speed;
    playingRef.current = playing;
  }, [speed, playing]);

  const CYCLE_INFO: Record<CycleView, { moving: string; reservoir: string; fixLine: string; release: string; human: string }> = {
    carbon: { moving: "C circulates as CO₂", reservoir: "Ocean + fossil fuels hold the most carbon", fixLine: "Photosynthesis: CO₂ → glucose in producers", release: "Respiration, decay and combustion return CO₂", human: "~9 Gt of fossil CO₂ added to air each year" },
    nitrogen: { moving: "N moves as N₂, NH₃, NO₂⁻, NO₃⁻", reservoir: "Air is 78% N₂ — unusable by plants directly", fixLine: "Rhizobium / Azotobacter fix N₂ → NH₃", release: "Pseudomonas denitrify NO₃⁻ back to N₂", human: "Haber–Bosch fixes more N than all natural processes" },
  };
  const info = CYCLE_INFO[cycle];

  const presets: ScenePreset[] = [
    { name: "Carbon cycle", hint: "Watch the atom travel: air → plant → animal → decomposer → air.", apply: () => { setCycle("carbon"); setPlaying(true); setRunId((r) => r + 1); } },
    { name: "Nitrogen cycle", hint: "Fixation, nitrification, assimilation, denitrification in one loop.", apply: () => { setCycle("nitrogen"); setPlaying(true); setRunId((r) => r + 1); } },
  ];

  const resetAll = () => {
    setCycle("carbon");
    setShowLabels(true);
    setPlaying(true);
    setSpeed(1);
    setRunId((r) => r + 1);
  };


  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isWebGL) return;

    let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer;
    let controls: any;
    let frameId: number;
    let animTime = 0;
    const meshes: THREE.Object3D[] = [];
    const labelSprites: THREE.Sprite[] = [];
    let cycleParticle: THREE.Mesh;

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
      vizTargetRef.current = { controls, el: container, canvasEl: renderer.domElement, setLabels: (on: boolean) => labelSprites.forEach((s) => (s.visible = on)) };

      scene.add(new THREE.AmbientLight(0xffffff, 0.7));
      const dl = new THREE.DirectionalLight(0xffffff, 0.9);
      dl.position.set(4, 6, 4);
      scene.add(dl);

      const push = <T extends THREE.Object3D>(o: T): T => { scene.add(o); meshes.push(o); return o; };
      const addSprite = (s: THREE.Sprite): THREE.Sprite => { push(s); labelSprites.push(s); return s; };

      const update = () => {
        while (meshes.length > 100) {
          const m = meshes.pop()!;
          scene.remove(m);
          if (m instanceof THREE.Mesh) { m.geometry?.dispose(); const mat = m.material; if (Array.isArray(mat)) mat.forEach((x) => x.dispose()); else (Array.isArray(mat) ? mat : [mat]).forEach((x) => x.dispose()); }
          else if (m instanceof THREE.Sprite) { const sm = m.material; sm.map?.dispose?.(); sm.dispose(); }
          else if (m instanceof THREE.ArrowHelper) m.dispose();
        }

        if (cycle === "carbon") {
          // Carbon cycle — circular layout
          const nodes = [
            { name: "CO₂ in Atmosphere", color: 0x94a3b8, pos: new THREE.Vector3(0, 3, 0) },
            { name: "Producers\n(Photosynthesis)", color: 0x22c55e, pos: new THREE.Vector3(-3, 0, 0) },
            { name: "Consumers", color: 0xf97316, pos: new THREE.Vector3(3, 0, 0) },
            { name: "Decomposers", color: 0x92400e, pos: new THREE.Vector3(0, -3, 0) },
            { name: "Fossil Fuels", color: 0x475569, pos: new THREE.Vector3(-3, -2, 0) },
          ];

          for (const n of nodes) {
            const node = push(new THREE.Mesh(
              new THREE.SphereGeometry(0.35, 12, 10),
              new THREE.MeshPhongMaterial({ color: n.color }),
            ));
            node.position.copy(n.pos);
            addSprite(mkSprite(n.name, `#${n.color.toString(16).padStart(6, "0")}`, new THREE.Vector3(n.pos.x, n.pos.y + 0.8, 0), 0.7));
          }

          // Arrows between nodes (processes)
          const arrows = [
            { from: nodes[0].pos, to: nodes[1].pos, label: "Photosynthesis", color: 0x22c55e },
            { from: nodes[1].pos, to: nodes[2].pos, label: "Consumption", color: 0xf97316 },
            { from: nodes[2].pos, to: nodes[0].pos, label: "Respiration", color: 0xef4444 },
            { from: nodes[1].pos, to: nodes[3].pos, label: "Death/Decay", color: 0x92400e },
            { from: nodes[2].pos, to: nodes[3].pos, label: "Death/Excretion", color: 0xb45309 },
            { from: nodes[3].pos, to: nodes[0].pos, label: "Decomposition → CO₂", color: 0xd97706 },
            { from: nodes[4].pos, to: nodes[0].pos, label: "Combustion", color: 0xef4444 },
            { from: nodes[1].pos, to: nodes[4].pos, label: "Burial → Fossil Fuel", color: 0x475569 },
          ];

          for (const a of arrows) {
            const mid = a.from.clone().add(a.to).multiplyScalar(0.5);
            const labelOffset = new THREE.Vector3(0, 0, 0.8).applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.atan2(a.to.x - a.from.x, a.to.z - a.from.z));
            const labelPos = mid.clone().add(labelOffset);
            addLabel(scene, meshes, labelSprites, a.label, a.color, labelPos, mid);
          }

          addSprite(mkSprite("Carbon Cycle", "#fbbf24", new THREE.Vector3(0, 4.5, 0), 0.85));
          cycleParticle = push(new THREE.Mesh(
            new THREE.SphereGeometry(0.18, 12, 12),
            new THREE.MeshBasicMaterial({ color: 0x22d3ee }),
          )) as THREE.Mesh;
          cycleParticle.position.set(0, 3, 0);
        } else {
          // Nitrogen cycle
          const nodes = [
            { name: "Atmospheric N₂\n(78%)", color: 0x64748b, pos: new THREE.Vector3(0, 3.2, 0) },
            { name: "Nitrogen-fixing\nBacteria", color: 0x22c55e, pos: new THREE.Vector3(-3, 1, 0) },
            { name: "Soil Nitrates\n(NO₃⁻)", color: 0x3b82f6, pos: new THREE.Vector3(0, -0.5, 0) },
            { name: "Plants", color: 0x16a34a, pos: new THREE.Vector3(-2.5, -2.5, 0) },
            { name: "Animals", color: 0xf97316, pos: new THREE.Vector3(2.5, -2.5, 0) },
            { name: "Denitrifying\nBacteria", color: 0x92400e, pos: new THREE.Vector3(3, 1, 0) },
          ];

          for (const n of nodes) {
            const node = push(new THREE.Mesh(
              new THREE.SphereGeometry(0.32, 12, 10),
              new THREE.MeshPhongMaterial({ color: n.color }),
            ));
            node.position.copy(n.pos);
            addSprite(mkSprite(n.name, `#${n.color.toString(16).padStart(6, "0")}`, new THREE.Vector3(n.pos.x, n.pos.y + 0.8, 0), 0.65));
          }

          const arrows = [
            { from: nodes[0].pos, to: nodes[1].pos, label: "Nitrogen Fixation\n(N₂ → NH₃)", color: 0x22c55e },
            { from: nodes[1].pos, to: nodes[2].pos, label: "Nitrification\n(NH₃ → NO₂⁻ → NO₃⁻)", color: 0x3b82f6 },
            { from: nodes[2].pos, to: nodes[3].pos, label: "Assimilation\n(by plants)", color: 0x16a34a },
            { from: nodes[3].pos, to: nodes[4].pos, label: "Consumption", color: 0xf97316 },
            { from: nodes[4].pos, to: nodes[5].pos, label: "Death/Decay → NH₃", color: 0x92400e },
            { from: nodes[5].pos, to: nodes[0].pos, label: "Denitrification\n(NO₃⁻ → N₂)", color: 0x64748b },
          ];

          for (const a of arrows) {
            const mid = a.from.clone().add(a.to).multiplyScalar(0.5);
            const labelPos = mid.clone().add(new THREE.Vector3(0, 0, 0.8));
            addLabel(scene, meshes, labelSprites, a.label, a.color, labelPos, mid);
          }

          // Lightning fixation
          const lightning = push(new THREE.Mesh(
            new THREE.ConeGeometry(0.05, 0.5, 4),
            new THREE.MeshPhongMaterial({ color: 0xfbbf24 }),
          ));
          lightning.position.set(1.5, 2.5, 0);
          addLabel(scene, meshes, labelSprites, "Lightning Fixation", 0xfbbf24, new THREE.Vector3(2.5, 3.5, -2), lightning.position);

          // Industrial fixation
          const industrial = push(new THREE.Mesh(
            new THREE.BoxGeometry(0.3, 0.3, 0.3),
            new THREE.MeshPhongMaterial({ color: 0xef4444 }),
          ));
          industrial.position.set(-1.5, 2.5, 0);
          addLabel(scene, meshes, labelSprites, "Industrial\nFixation (Haber Process)", 0xef4444, new THREE.Vector3(-3, 3.5, 2), industrial.position);

          addSprite(mkSprite("Nitrogen Cycle", "#fbbf24", new THREE.Vector3(0, 4.5, 0), 0.85));
        }
      };

      labelSprites.length = 0;
      update();
      labelSprites.forEach((s) => (s.visible = showLabels));

      const animate = () => {
        frameId = requestAnimationFrame(animate);
        controls.update();
        if (playingRef.current) {
          animTime += 0.02 * speedRef.current;
          if (cycleParticle) {
          const nodes = cycle === "carbon"
            ? [{ x: 0, y: 3 }, { x: -3, y: 1 }, { x: 0, y: -0.5 }, { x: -2.5, y: -2.5 }, { x: 2.5, y: -2.5 }, { x: 3, y: 1 }]
            : [{ x: 0, y: 3.2 }, { x: -3, y: 1 }, { x: 0, y: -0.5 }, { x: -2.5, y: -2.5 }, { x: 2.5, y: -2.5 }, { x: 3, y: 1 }];
          const idx = Math.floor(animTime * 2) % nodes.length;
          const nextIdx = (idx + 1) % nodes.length;
          const t = (animTime * 2) % 1;
          cycleParticle.position.x = nodes[idx].x + (nodes[nextIdx].x - nodes[idx].x) * t;
          cycleParticle.position.y = nodes[idx].y + (nodes[nextIdx].y - nodes[idx].y) * t;
          }
        }
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
  }, [cycle, isWebGL, runId, showLabels]);

  if (!isWebGL) {
    return <WebGLFallback title="Biogeochemical Cycles" description="3D carbon and nitrogen cycle diagrams." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Biogeochemical Cycles</span>
          <span className="text-xs text-muted-foreground font-normal">Select cycle to view</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <ScenePresets presets={presets} />
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={() => setShowLabels((v) => !v)} className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${showLabels ? "border-cyan-500/50 bg-cyan-500/10 text-cyan-300" : "border-border bg-muted/40 text-muted-foreground"}`}>Labels</button>
            <button onClick={resetAll} className="px-2.5 py-1 rounded-md text-xs font-medium border border-border bg-muted/40 text-muted-foreground hover:bg-muted/70 transition-colors" title="Reset to defaults">Reset</button>
          </div>
        </div>
        <CollapsibleControls label="Cycle Type">
          <div className="flex flex-wrap gap-2 mt-2">
            {(["carbon", "nitrogen"] as const).map((c) => (
              <button key={c} onClick={() => setCycle(c)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  cycle === c ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}>
                {c === "carbon" ? "Carbon Cycle" : "Nitrogen Cycle"}
              </button>
            ))}
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[clamp(320px,60vh,640px)] w-full overflow-hidden rounded-lg border border-border bg-slate-900">
          <VizToolbar targetRef={vizTargetRef} />
        </div>

        <PlaybackBar
          playing={playing}
          onPlayToggle={() => setPlaying((p) => !p)}
          speed={speed}
          onSpeedChange={setSpeed}
          onReset={resetAll}
        />

        <ReadoutGrid items={[
          { label: "Cycle shown", value: cycle === "carbon" ? "Carbon" : "Nitrogen", highlight: true },
          { label: "Travels as", value: info.moving },
          { label: "Big reservoir", value: info.reservoir },
          { label: "Locked in", value: info.fixLine },
          { label: "Released by", value: info.release },
          { label: "Human impact", value: info.human },
        ]} />

        <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-cyan-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Carbon cycle:</strong> CO₂ fixed by photosynthesis → passed through food chain → released by respiration, decomposition, combustion.</p>
            <p><strong className="text-foreground">Nitrogen cycle:</strong> N₂ fixed by bacteria/lightning → nitrification → assimilation by plants → denitrification back to N₂.</p>
            <p><strong className="text-foreground">Nitrogen fixation:</strong> Conversion of atmospheric N₂ to ammonia (NH₃) by Rhizobium, Azotobacter, or lightning.</p>
            <p><strong className="text-foreground">Nitrification:</strong> NH₃ → NO₂⁻ → NO₃⁻ by Nitrosomonas and Nitrobacter bacteria.</p>
            <p><strong className="text-foreground">Denitrification:</strong> NO₃⁻ → N₂ by Pseudomonas under anaerobic conditions.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
