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
   Human Evolution — Skull Comparison — NEB Biology 11
   Shows hominid skull features with comparative arrows.
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

type Species = "australopithecus" | "homo habilis" | "homo erectus" | "neanderthal" | "sapiens";

const speciesData: Record<Species, { name: string; brainVol: string; browRidge: string; chin: string; posture: string }> = {
  australopithecus: { name: "Australopithecus", brainVol: "~450 cc", browRidge: "Prominent", chin: "Absent", posture: "Bipedal" },
  "homo habilis": { name: "Homo habilis", brainVol: "~650 cc", browRidge: "Moderate", chin: "Absent", posture: "Bipedal" },
  "homo erectus": { name: "Homo erectus", brainVol: "~900 cc", browRidge: "Heavy", chin: "Absent", posture: "Fully bipedal" },
  neanderthal: { name: "Neanderthal", brainVol: "~1500 cc", browRidge: "Very heavy", chin: "Present (weak)", posture: "Fully bipedal" },
  sapiens: { name: "Homo sapiens", brainVol: "~1350 cc", browRidge: "Reduced", chin: "Prominent", posture: "Fully bipedal" },
};

const SPECIES_EXTRA: Record<Species, { era: string; milestone: string; tip: string }> = {
  australopithecus: { era: "4–2 Mya · East Africa — 'Lucy' at 3.2 Mya", milestone: "Obligate bipedalism with a small brain — walking came BEFORE big brains", tip: "Foramen magnum tucked under the skull = the bipedal proof" },
  "homo habilis": { era: "2.4–1.4 Mya · Africa", milestone: "First stone tools (Oldowan) with brain ~600–700 cc", tip: "\"Handy man\" — tool use marks the first member of genus Homo" },
  "homo erectus": { era: "1.9 Mya – 110 kya · spread out of Africa", milestone: "First migrant, controlled fire, Acheulean hand-axes", tip: "Long straight legs and human-like body proportions for endurance walking" },
  neanderthal: { era: "400–40 kya · Europe & western Asia", milestone: "Brain larger than ours; buried their dead with grave goods", tip: "Interbred with sapiens — non-Africans carry ~1–4% Neanderthal DNA" },
  sapiens: { era: "~300 kya – present · Africa", milestone: "High forehead, prominent chin, symbolic art and grammar", tip: "Chin + reduced brow ridge + vertical forehead are the giveaway features" },
};

export function HumanEvolutionVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const vizTargetRef = useRef<VizTarget>({});
  const [species, setSpecies] = useState<Species>("sapiens");
  const [showLabels, setShowLabels] = useState(true);
  const [runId, setRunId] = useState(0);
  const [isWebGL] = useState(() => isWebGLAvailable());

  const extra = SPECIES_EXTRA[species];

  const presets: ScenePreset[] = [
    { name: "Lucy (ancestral)", hint: "Small brain but already upright — see the foramen magnum.", apply: () => { setSpecies("australopithecus"); setRunId((r) => r + 1); } },
    { name: "Handy man", hint: "First tool-maker — the brain case starts to expand.", apply: () => { setSpecies("homo habilis"); setRunId((r) => r + 1); } },
    { name: "The traveller", hint: "H. erectus — first to leave Africa and control fire.", apply: () => { setSpecies("homo erectus"); setRunId((r) => r + 1); } },
    { name: "Ice-age cousin", hint: "Neanderthal — a bigger brain than ours, heavy brow.", apply: () => { setSpecies("neanderthal"); setRunId((r) => r + 1); } },
    { name: "Us", hint: "Homo sapiens — high forehead, prominent chin.", apply: () => { setSpecies("sapiens"); setRunId((r) => r + 1); } },
  ];

  const resetAll = () => {
    setSpecies("sapiens");
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

      while (meshes.length > 80) {
        const m = meshes.pop()!;
        scene.remove(m);
        if (m instanceof THREE.Mesh) { m.geometry?.dispose(); const mat = m.material; if (Array.isArray(mat)) mat.forEach((x) => x.dispose()); else (Array.isArray(mat) ? mat : [mat]).forEach((x) => x.dispose()); }
        else if (m instanceof THREE.Sprite) { const sm = m.material; sm.map?.dispose?.(); sm.dispose(); }
        else if (m instanceof THREE.ArrowHelper) m.dispose();
      }

      const sd = speciesData[species];
      const brainSize = species === "australopithecus" ? 0.6 : species === "homo habilis" ? 0.75 : species === "homo erectus" ? 0.85 : species === "neanderthal" ? 1.0 : 0.95;
      const browSize = species === "australopithecus" ? 0.3 : species === "homo habilis" ? 0.2 : species === "homo erectus" ? 0.35 : species === "neanderthal" ? 0.4 : 0.05;
      const chinSize = species === "sapiens" ? 0.2 : species === "neanderthal" ? 0.1 : 0;

      // Cranium (brain case)
      const cranium = push(new THREE.Mesh(
        new THREE.SphereGeometry(brainSize, 16, 12),
        new THREE.MeshPhongMaterial({ color: 0xd4c4a8 }),
      ));
      cranium.position.set(0, 0.3, 0);
      cranium.scale.set(1, 0.9, 0.85);

      // Brow ridge
      if (browSize > 0) {
        const brow = push(new THREE.Mesh(
          new THREE.TorusGeometry(0.5, browSize * 0.15, 8, 16, Math.PI),
          new THREE.MeshPhongMaterial({ color: 0xb8a88a }),
        ));
        brow.position.set(0, 0.3, 0.55);
        brow.rotation.x = 0.1;
      }

      // Face / jaw
      const face = push(new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.4, 0.4),
        new THREE.MeshPhongMaterial({ color: 0xc4b5a0 }),
      ));
      face.position.set(0, -0.3, 0.35);

      // Chin (prominent in sapiens)
      if (chinSize > 0) {
        const chin = push(new THREE.Mesh(
          new THREE.SphereGeometry(chinSize * 0.5, 8, 6),
          new THREE.MeshPhongMaterial({ color: 0xd4c4a8 }),
        ));
        chin.position.set(0, -0.55, 0.55);
      }

      // Foramen magnum position indicator
      const fm = push(new THREE.Mesh(
        new THREE.CircleGeometry(0.08, 8),
        new THREE.MeshPhongMaterial({ color: 0x7c3aed, side: THREE.DoubleSide }),
      ));
      fm.position.set(0, -0.1, -0.4);
      fm.rotation.y = Math.PI;

      // Labels
      push(mkSprite(`${sd.name}`, "#fbbf24", new THREE.Vector3(0, 2.2, 0), 0.9));

      addLabel(scene, meshes, labelSprites, "Cranial Capacity", 0xa78bfa, new THREE.Vector3(-3, 1.5, 2), new THREE.Vector3(0, 0.3, 0));
      addLabel(scene, meshes, labelSprites, "Brow Ridge", 0xb8a88a, new THREE.Vector3(3, 1.0, 2), new THREE.Vector3(0, 0.5, 0.6));
      addLabel(scene, meshes, labelSprites, "Face/Jaw", 0xc4b5a0, new THREE.Vector3(3, -0.5, -2), new THREE.Vector3(0, -0.3, 0.35));
      addLabel(scene, meshes, labelSprites, "Chin", 0xd4c4a8, new THREE.Vector3(-3, -1.0, 2), new THREE.Vector3(0, -0.55, 0.55));
      addLabel(scene, meshes, labelSprites, "Foramen Magnum\n(Bipedal indicator)", 0x7c3aed, new THREE.Vector3(-3.5, 0.3, -2.5), fm.position);

      // Comparative features panel
      push(mkSprite(`Brain: ${sd.brainVol}  |  Posture: ${sd.posture}`, "#7dd3fc", new THREE.Vector3(0, -2.2, 0), 0.7));

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
          else if (m instanceof THREE.Sprite) { const sm = m.material; sm.map?.dispose?.(); sm.dispose(); }
          else if (m instanceof THREE.ArrowHelper) m.dispose();
        });
        renderer.dispose();
        controls.dispose?.();
      };
    };

    const cleanup = init();
    return () => { cleanup.then((d) => d?.()); };
  }, [species, isWebGL, runId, showLabels]);

  if (!isWebGL) {
    return <WebGLFallback title="Human Evolution" description="3D skull comparison across hominid species." />;
  }

  const sd = speciesData[species];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Human Evolution — Skull Comparison</span>
          <span className="text-xs text-muted-foreground font-normal">Select species to compare</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <ScenePresets presets={presets} />
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={() => setShowLabels((v) => !v)} className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${showLabels ? "border-amber-500/50 bg-amber-500/10 text-amber-300" : "border-border bg-muted/40 text-muted-foreground"}`}>Labels</button>
            <button onClick={resetAll} className="px-2.5 py-1 rounded-md text-xs font-medium border border-border bg-muted/40 text-muted-foreground hover:bg-muted/70 transition-colors" title="Reset to defaults">Reset</button>
          </div>
        </div>

        <CollapsibleControls label="Hominid Species">
          <div className="flex flex-wrap gap-2 mt-2">
            {(Object.keys(speciesData) as Species[]).map((s) => (
              <button key={s} onClick={() => setSpecies(s)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  species === s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}>
                {speciesData[s].name}
              </button>
            ))}
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[clamp(320px,60vh,640px)] w-full overflow-hidden rounded-lg border border-border bg-slate-900">
          <VizToolbar targetRef={vizTargetRef} />
        </div>

        <ReadoutGrid items={[
          { label: "Species", value: sd.name, highlight: true },
          { label: "Cranial capacity", value: sd.brainVol },
          { label: "Brow & chin", value: `${sd.browRidge} brow · ${sd.chin.toLowerCase()} chin` },
          { label: "Era", value: extra.era },
          { label: "Why it matters", value: extra.milestone },
          { label: "Exam tip", value: extra.tip },
        ]} />

        <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Australopithecus:</strong> ~450 cc brain; bipedal but small-brained; "Lucy" (A. afarensis).</p>
            <p><strong className="text-foreground">Homo habilis:</strong> "Handy man"; ~650 cc; first tool-maker; transitional form.</p>
            <p><strong className="text-foreground">Homo erectus:</strong> ~900 cc; first to migrate out of Africa; controlled fire; uses Acheulean tools.</p>
            <p><strong className="text-foreground">Neanderthal:</strong> ~1500 cc; robust build; buried dead; lived in Europe/Asia; went extinct ~40kya.</p>
            <p><strong className="text-foreground">Homo sapiens:</strong> ~1350 cc; high forehead; prominent chin; complex language and culture.</p>
            <p><strong className="text-foreground">Key trend:</strong> Increasing brain size, reduced brow ridges, flatter face, prominent chin, fully bipedal posture.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
