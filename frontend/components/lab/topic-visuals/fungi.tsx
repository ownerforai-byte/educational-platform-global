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

type FungiFocus = "all" | "spores" | "feeding";

export function FungiVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const vizTargetRef = useRef<VizTarget>({});
  const [focus, setFocus] = useState<FungiFocus>("all");
  const [showLabels, setShowLabels] = useState(true);
  const [runId, setRunId] = useState(0);
  const [isWebGL] = useState(() => isWebGLAvailable());

  const FOCUS_INFO: Record<FungiFocus, { parts: string; process: string; fact: string; group: string; tip: string }> = {
    all: { parts: "Mycelium below + sporangiophore above", process: "Coenocytic (aseptate) hyphae in Mucor — one continuous cytoplasm", fact: "Cell wall of chitin, not cellulose; the fungal body is haploid", group: "Phycomycetes — 'algae-like fungi'", tip: "Fungi got their own kingdom because they absorb food instead of ingesting or making it" },
    spores: { parts: "Sporangium → columella → sporangiospores", process: "Asexual reproduction: one sporangium releases hundreds of wind-borne spores", fact: "The 'black dust' from bread mould is a cloud of sporangiospores", group: "Asexual spores = sporangiospores (non-motile)", tip: "Contrast: conidia of Aspergillus are also asexual but borne externally, not in a sac" },
    feeding: { parts: "Rhizoids + mycelium network in substrate", process: "External digestion — secrete enzymes, then absorb the broken-down molecules", fact: "Fungi are the great decomposers of nutrient cycles", group: "Saprophytic nutrition — absorptive heterotrophy", tip: "Mycorrhiza: fungal hyphae help pine roots absorb minerals — a classic symbiosis example" },
  };
  const info = FOCUS_INFO[focus];

  const presets: ScenePreset[] = [
    { name: "Whole Mucor", hint: "See the complete bread-mould body plan at once.", apply: () => { setFocus("all"); setRunId((r) => r + 1); } },
    { name: "Spore factory", hint: "Highlight the aerial reproduction apparatus.", apply: () => { setFocus("spores"); setRunId((r) => r + 1); } },
    { name: "Feeding network", hint: "Highlight the hidden mycelium that digests food externally.", apply: () => { setFocus("feeding"); setRunId((r) => r + 1); } },
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
      vizTargetRef.current = { controls, el: container, canvasEl: renderer.domElement, setLabels: (on: boolean) => labelSprites.forEach((s) => (s.visible = on)) };

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
      const hyphaeParts: THREE.Object3D[] = [];
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
        hyphaeParts.push(hypha);
      }

      // Sporangiophore (vertical stalk)
      const sporangiophore = push(new THREE.Mesh(
        new THREE.CylinderGeometry(0.08, 0.1, 3.5, 8),
        new THREE.MeshPhongMaterial({ color: 0xd4c4a8 }),
      ));
      sporangiophore.position.set(0, -1.2, 0);

      // Rhizoids (root-like hyphae)
      const rhizoidParts: THREE.Object3D[] = [];
      for (let i = 0; i < 5; i++) {
        const angle = (i / 5) * Math.PI * 2;
        const rhizoid = push(new THREE.Mesh(
          new THREE.CylinderGeometry(0.04, 0.06, 0.8, 6),
          new THREE.MeshPhongMaterial({ color: 0xb8a88a }),
        ));
        rhizoid.position.set(Math.cos(angle) * 0.5, -3.1, Math.sin(angle) * 0.5);
        rhizoid.rotation.z = Math.cos(angle) * 0.5;
        rhizoid.rotation.x = Math.sin(angle) * 0.5;
        rhizoidParts.push(rhizoid);
      }

      // Sporangium (spore sac at top)
      const sporangium = push(new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 16, 12),
        new THREE.MeshPhongMaterial({ color: 0x7c3aed, shininess: 40 }),
      ));
      sporangium.position.set(0, 0.7, 0);

      // Spores (small spheres inside/near sporangium)
      const sporeColor = 0xa78bfa;
      const sporeParts: THREE.Object3D[] = [];
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
        sporeParts.push(sp);
      }

      // Columella (sterile dome inside sporangium)
      const columella = push(new THREE.Mesh(
        new THREE.SphereGeometry(0.25, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2),
        new THREE.MeshPhongMaterial({ color: 0xc4b5fd, transparent: true, opacity: 0.7 }),
      ));
      columella.position.set(0, 0.5, 0);

      // Labels
      push(mkSprite("Fungi — Mucor Morphology", "#fbbf24", new THREE.Vector3(0, 3.2, 0), 0.85));

      addLabel(scene, meshes, labelSprites, "Sporangium (Spore Sac)", 0x7c3aed, new THREE.Vector3(2.5, 2.5, 1.5), sporangium.position);
      addLabel(scene, meshes, labelSprites, "Sporangiospores", 0xa78bfa, new THREE.Vector3(2.8, 1.5, -1.5), new THREE.Vector3(0.3, 0.9, 0.3));
      addLabel(scene, meshes, labelSprites, "Columella", 0xc4b5fd, new THREE.Vector3(-2.5, 1.8, 1.5), columella.position);
      addLabel(scene, meshes, labelSprites, "Sporangiophore (Stalk)", 0xd4c4a8, new THREE.Vector3(-3, 0, 2), sporangiophore.position);
      addLabel(scene, meshes, labelSprites, "Rhizoids", 0xb8a88a, new THREE.Vector3(-3, -3.5, 1), new THREE.Vector3(0.5, -3.1, 0));
      addLabel(scene, meshes, labelSprites, "Mycelium (Hyphae Network)", 0xe8dcc8, new THREE.Vector3(3, -2.5, 2), new THREE.Vector3(1.5, -2.8, 0));
      addLabel(scene, meshes, labelSprites, "Substrate", 0x3d200a, new THREE.Vector3(3.5, -3.5, -2), substrate.position);

      labelSprites.forEach((s) => (s.visible = showLabels));

      // Focus dimming: highlight the reproductive or feeding apparatus
      const allParts: THREE.Object3D[] = [substrate, ...hyphaeParts, sporangiophore, ...rhizoidParts, sporangium, ...sporeParts, columella];
      const GROUPS: Record<Exclude<FungiFocus, "all">, THREE.Object3D[]> = {
        spores: [sporangiophore, sporangium, columella, ...sporeParts],
        feeding: [substrate, ...hyphaeParts, ...rhizoidParts],
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
        <div className="flex flex-wrap items-center justify-between gap-3">
          <ScenePresets presets={presets} />
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={() => setShowLabels((v) => !v)} className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${showLabels ? "border-purple-500/50 bg-purple-500/10 text-purple-300" : "border-border bg-muted/40 text-muted-foreground"}`}>Labels</button>
            <button onClick={resetAll} className="px-2.5 py-1 rounded-md text-xs font-medium border border-border bg-muted/40 text-muted-foreground hover:bg-muted/70 transition-colors" title="Reset to defaults">Reset</button>
          </div>
        </div>

        <CollapsibleControls label="Fungal Groups">
          <div className="flex flex-wrap gap-2 mt-2">
            {["Pycomycetes", "Ascomycetes", "Basidiomycetes", "Deuteromycetes"].map((g) => (
              <span key={g} className="px-3 py-1.5 rounded-md text-xs font-medium bg-muted text-muted-foreground">
                {g}
              </span>
            ))}
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[clamp(320px,60vh,640px)] w-full overflow-hidden rounded-lg border border-border bg-slate-900">
          <VizToolbar targetRef={vizTargetRef} />
        </div>

        <ReadoutGrid items={[
          { label: "In focus", value: info.parts, highlight: true },
          { label: "Process", value: info.process },
          { label: "Did you know", value: info.fact },
          { label: "Classification", value: info.group },
          { label: "Exam tip", value: info.tip },
        ]} />

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
