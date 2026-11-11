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
   Immune System — NEB Biology 12 (Human Health & Diseases)
   Antigen-antibody interaction with labeled arrows.
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

type ImmFocus = "all" | "recognition" | "phagocytosis" | "memory";

export function ImmuneSystemVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const vizTargetRef = useRef<VizTarget>({});
  const [focus, setFocus] = useState<ImmFocus>("all");
  const [showLabels, setShowLabels] = useState(true);
  const [runId, setRunId] = useState(0);
  const [isWebGL] = useState(() => isWebGLAvailable());

  const FOCUS_INFO: Record<ImmFocus, { stage: string; players: string; action: string; fact: string; tip: string }> = {
    all: { stage: "Adaptive (humoral) response — overview", players: "Pathogen · antibody · macrophage · lymphocytes", action: "Antibodies neutralise and coat; phagocytes engulf; memory forms", fact: "One antibody type binds one specific epitope — lock and key", tip: "B cells → antibodies (humoral); T cells → cell-mediated" },
    recognition: { stage: "Step 1 — specific recognition", players: "Epitopes on pathogen + variable region at Y tips", action: "Antigen-binding site fits its complementary epitope", fact: "IgG is Y-shaped: heavy + light chains, variable vs constant regions", tip: "Lock-key specificity is why one antibody guards against one pathogen" },
    phagocytosis: { stage: "Step 2 — opsonisation & engulfment", players: "Fc tails + macrophage receptors, pseudopodia", action: "Coated pathogen is gripped and engulfed", fact: "The Fc stem is the \"eat me\" handle phagocytes grab onto", tip: "Opsonisation is the bridge between adaptive and innate immunity" },
    memory: { stage: "Step 3 — memory for the next encounter", players: "Memory B cells + T helper cells", action: "Same antigen later → faster, stronger secondary response", fact: "Memory cells persist for years — the very basis of vaccination", tip: "Secondary response is quicker because memory clones already exist" },
  };
  const info = FOCUS_INFO[focus];

  const presets: ScenePreset[] = [
    { name: "Full response", hint: "See every player of the humoral response at once.", apply: () => { setFocus("all"); setRunId((r) => r + 1); } },
    { name: "1 · Recognition", hint: "The Y-tips lock onto exactly one epitope.", apply: () => { setFocus("recognition"); setRunId((r) => r + 1); } },
    { name: "2 · Eat me", hint: "Antibody-coated pathogen is engulfed by the macrophage.", apply: () => { setFocus("phagocytosis"); setRunId((r) => r + 1); } },
    { name: "3 · Memory", hint: "The cells that make vaccines work.", apply: () => { setFocus("memory"); setRunId((r) => r + 1); } },
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

      // Pathogen (antigen)
      const pathogen = push(new THREE.Mesh(
        new THREE.SphereGeometry(0.8, 16, 12),
        new THREE.MeshPhongMaterial({ color: 0xef4444 }),
      ));
      pathogen.position.set(-2.5, 0, 0);

      // Antigens (protrusions on pathogen)
      const antigenParts: THREE.Object3D[] = [];
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        const antigen = push(new THREE.Mesh(
          new THREE.ConeGeometry(0.08, 0.25, 6),
          new THREE.MeshPhongMaterial({ color: 0xfbbf24 }),
        ));
        antigen.position.set(
          -2.5 + Math.cos(angle) * 0.85,
          Math.sin(angle) * 0.85,
          0
        );
        antigen.lookAt(new THREE.Vector3(
          -2.5 + Math.cos(angle) * 2,
          Math.sin(angle) * 2,
          0
        ));
        antigenParts.push(antigen);
      }

      // Y-shaped antibody
      const antibodyGroup = new THREE.Group();
      // Stem
      const stem = new THREE.Mesh(
        new THREE.CylinderGeometry(0.06, 0.06, 0.6, 8),
        new THREE.MeshPhongMaterial({ color: 0x3b82f6 }),
      );
      stem.position.y = -0.3;
      antibodyGroup.add(stem);
      // Left arm
      const leftArm = new THREE.Mesh(
        new THREE.CylinderGeometry(0.05, 0.05, 0.5, 8),
        new THREE.MeshPhongMaterial({ color: 0x3b82f6 }),
      );
      leftArm.position.set(-0.18, 0.15, 0);
      leftArm.rotation.z = 0.4;
      antibodyGroup.add(leftArm);
      // Right arm
      const rightArm = new THREE.Mesh(
        new THREE.CylinderGeometry(0.05, 0.05, 0.5, 8),
        new THREE.MeshPhongMaterial({ color: 0x3b82f6 }),
      );
      rightArm.position.set(0.18, 0.15, 0);
      rightArm.rotation.z = -0.4;
      antibodyGroup.add(rightArm);
      // Binding sites (tips)
      const bindingL = push(new THREE.Mesh(
        new THREE.SphereGeometry(0.1, 8, 6),
        new THREE.MeshPhongMaterial({ color: 0xfbbf24 }),
      ));
      bindingL.position.set(-0.38, 0.4, 0);
      const bindingR = push(new THREE.Mesh(
        new THREE.SphereGeometry(0.1, 8, 6),
        new THREE.MeshPhongMaterial({ color: 0xfbbf24 }),
      ));
      bindingR.position.set(0.38, 0.4, 0);
      antibodyGroup.position.set(0, 0, 0);
      push(antibodyGroup);

      // Macrophage (phagocyte)
      const macrophage = push(new THREE.Mesh(
        new THREE.SphereGeometry(1.0, 16, 12),
        new THREE.MeshPhongMaterial({ color: 0xa78bfa, transparent: true, opacity: 0.5 }),
      ));
      macrophage.position.set(2.5, -1.5, 0);

      // Pseudopodia extending toward pathogen-antibody complex
      const pseudopodParts: THREE.Object3D[] = [];
      for (let i = 0; i < 4; i++) {
        const pseudo = push(new THREE.Mesh(
          new THREE.ConeGeometry(0.1, 0.5, 6),
          new THREE.MeshPhongMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.6 }),
        ));
        const angle = -Math.PI * 0.3 + i * 0.2;
        pseudo.position.set(2.5 + Math.cos(angle) * 0.5, -1.5 + Math.sin(angle) * 0.5, 0);
        pseudo.lookAt(new THREE.Vector3(
          2.5 + Math.cos(angle) * 1.5,
          -1.5 + Math.sin(angle) * 1.5,
          0
        ));
        pseudopodParts.push(pseudo);
      }

      // Memory B cells
      const memB = push(new THREE.Mesh(
        new THREE.SphereGeometry(0.25, 10, 8),
        new THREE.MeshPhongMaterial({ color: 0x22d3ee }),
      ));
      memB.position.set(3, 1.5, 0.5);

      // T helper cell
      const tHelper = push(new THREE.Mesh(
        new THREE.SphereGeometry(0.25, 10, 8),
        new THREE.MeshPhongMaterial({ color: 0xf97316 }),
      ));
      tHelper.position.set(-3, 1.5, -0.5);

      // Labels
      push(mkSprite("Immune Response — Antigen-Antibody Interaction", "#fbbf24", new THREE.Vector3(0, 3.5, 0), 0.85));

      addLabel(scene, meshes, labelSprites, "Pathogen (Antigen)", 0xef4444, new THREE.Vector3(-4.5, 1.5, 2), pathogen.position);
      addLabel(scene, meshes, labelSprites, "Antigen (epitope)", 0xfbbf24, new THREE.Vector3(-4, 0.8, 2.5), new THREE.Vector3(-2.5, 0.8, 0));
      addLabel(scene, meshes, labelSprites, "Antibody (Y-shape)", 0x3b82f6, new THREE.Vector3(1.5, 1.8, 2.5), new THREE.Vector3(0, 0.4, 0));
      addLabel(scene, meshes, labelSprites, "Antigen-Binding Site\n(Variable region)", 0xfbbf24, new THREE.Vector3(-1, 1.5, -2.5), bindingL.position);
      addLabel(scene, meshes, labelSprites, "Fc Region\n(Constant region)", 0x3b82f6, new THREE.Vector3(1, -0.8, 2.5), new THREE.Vector3(0, -0.3, 0));
      addLabel(scene, meshes, labelSprites, "Macrophage\n(Phagocyte)", 0xa78bfa, new THREE.Vector3(4, -2.5, 2), macrophage.position);
      addLabel(scene, meshes, labelSprites, "Memory B Cell", 0x22d3ee, new THREE.Vector3(4, 2.5, -2), memB.position);
      addLabel(scene, meshes, labelSprites, "T Helper Cell", 0xf97316, new THREE.Vector3(-4, 2.5, 2), tHelper.position);
      addLabel(scene, meshes, labelSprites, "Opsonization\n(coating for phagocytosis)", 0x7dd3fc, new THREE.Vector3(-1, -1.5, -3), new THREE.Vector3(-0.5, -0.5, 0));

      labelSprites.forEach((s) => (s.visible = showLabels));

      // Focus dimming: walk through recognition → phagocytosis → memory
      const allParts: THREE.Object3D[] = [pathogen, ...antigenParts, bindingL, bindingR, macrophage, ...pseudopodParts, memB, tHelper];
      const GROUPS: Record<Exclude<ImmFocus, "all">, THREE.Object3D[]> = {
        recognition: [pathogen, ...antigenParts, bindingL, bindingR],
        phagocytosis: [pathogen, ...antigenParts, bindingL, bindingR, macrophage, ...pseudopodParts],
        memory: [memB, tHelper],
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
    return <WebGLFallback title="Immune System" description="3D antigen-antibody interaction diagram." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Immune System — Antigen-Antibody Response</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <ScenePresets presets={presets} />
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={() => setShowLabels((v) => !v)} className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${showLabels ? "border-red-500/50 bg-red-500/10 text-red-300" : "border-border bg-muted/40 text-muted-foreground"}`}>Labels</button>
            <button onClick={resetAll} className="px-2.5 py-1 rounded-md text-xs font-medium border border-border bg-muted/40 text-muted-foreground hover:bg-muted/70 transition-colors" title="Reset to defaults">Reset</button>
          </div>
        </div>

        <div ref={containerRef} className="relative h-[clamp(320px,60vh,640px)] w-full overflow-hidden rounded-lg border border-border bg-slate-900">
          <VizToolbar targetRef={vizTargetRef} />
        </div>

        <ReadoutGrid items={[
          { label: "Stage", value: info.stage, highlight: true },
          { label: "Players", value: info.players },
          { label: "What happens", value: info.action },
          { label: "Did you know", value: info.fact },
          { label: "Exam tip", value: info.tip },
        ]} />

        <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-red-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Antigen:</strong> Foreign substance that triggers an immune response; recognized by antibodies.</p>
            <p><strong className="text-foreground">Antibody (Immunoglobulin):</strong> Y-shaped protein produced by plasma cells; specifically binds to antigens.</p>
            <p><strong className="text-foreground">Antigen-binding site:</strong> Variable region at tips of Y — highly specific to a particular antigen (lock and key).</p>
            <p><strong className="text-foreground">Fc region:</strong> Constant region that binds to phagocyte receptors (opsonization).</p>
            <p><strong className="text-foreground">Innate immunity:</strong> Non-specific defenses — skin, phagocytes, inflammation, fever.</p>
            <p><strong className="text-foreground">Adaptive immunity:</strong> Specific — B cells (humoral, antibodies) and T cells (cell-mediated).</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
