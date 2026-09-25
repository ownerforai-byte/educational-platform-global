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
   Neuron Structure — NEB Biology 12
   Dendrite, cell body, axon, synapse with long arrow labels.
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

type NeuronFocus = "all" | "receive" | "conduct" | "transmit";

export function NeuronVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const vizTargetRef = useRef<VizTarget>({});
  const [focus, setFocus] = useState<NeuronFocus>("all");
  const [showLabels, setShowLabels] = useState(true);
  const [runId, setRunId] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const speedRef = useRef(1);
  const playingRef = useRef(true);
  const [isWebGL] = useState(() => isWebGLAvailable());

  useEffect(() => { speedRef.current = speed; playingRef.current = playing; }, [speed, playing]);

  const FOCUS_INFO: Record<NeuronFocus, { part: string; role: string; signal: string; fact: string, tip: string }> = {
    all: { part: "Whole neuron (nerve cell)", role: "Structural & functional unit of the nervous system", signal: "Impulse route: dendrite → soma → axon → terminal", fact: "You have ~86 billion neurons, each firing roughly 5–50 times per second", tip: "Signal direction in the body is dendrite → axon; experiments can force it backwards" },
    receive: { part: "Dendrites + soma", role: "Receives and integrates thousands of incoming signals", signal: "Graded potentials sum at the axon hillock", fact: "Dendritic spines multiply the receiving surface — learning literally grows them", tip: "Cross the threshold and the action potential fires all-or-none" },
    conduct: { part: "Myelinated axon + Nodes of Ranvier", role: "Rapid conduction away from the soma", signal: "Saltatory conduction: the impulse leaps node to node", fact: "Myelin boosts speed from ~1 m/s to ~120 m/s", tip: "Schwann cells make myelin in PNS; oligodendrocytes in CNS — MS attacks it" },
    transmit: { part: "Synaptic knob, cleft & postsynaptic membrane", role: "Chemical transmission to the next cell", signal: "Ca²⁺ in → vesicles fuse → neurotransmitter diffuses across", fact: "The synapse adds ~0.5 ms delay — the slow step in a reflex arc", tip: "Acetylcholine at the neuromuscular junction; acetylcholinesterase ends the signal" },
  };
  const info = FOCUS_INFO[focus];

  const presets: ScenePreset[] = [
    { name: "Whole neuron", hint: "Every part lit — the classic labelled diagram.", apply: () => { setFocus("all"); setRunId((r) => r + 1); } },
    { name: "1 · Receiving", hint: "Dendrites and soma only — where signals arrive and sum.", apply: () => { setFocus("receive"); setRunId((r) => r + 1); } },
    { name: "2 · Conducting", hint: "Follow the impulse leap along the myelinated axon.", apply: () => { setFocus("conduct"); setRunId((r) => r + 1); } },
    { name: "3 · Transmitting", hint: "The synapse — vesicles, cleft and postsynaptic membrane.", apply: () => { setFocus("transmit"); setRunId((r) => r + 1); } },
  ];

  const resetAll = () => {
    setFocus("all");
    setShowLabels(true);
    setPlaying(true);
    setSpeed(1);
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

      const dendriteParts: THREE.Object3D[] = [];
      const myelinParts: THREE.Object3D[] = [];
      const ranvierParts: THREE.Object3D[] = [];
      const terminalParts: THREE.Object3D[] = [];
      const vesicleParts: THREE.Object3D[] = [];

      // Cell body (soma)
      const soma = push(new THREE.Mesh(
        new THREE.SphereGeometry(0.6, 16, 12),
        new THREE.MeshPhongMaterial({ color: 0x7c3aed, shininess: 50 }),
      ));
      soma.position.set(-1, 0, 0);

      // Nucleus inside soma
      const nucleus = push(new THREE.Mesh(
        new THREE.SphereGeometry(0.2, 10, 8),
        new THREE.MeshPhongMaterial({ color: 0x4c1d95 }),
      ));
      nucleus.position.set(-1, 0, 0.3);

      // Dendrites (branching structures)
      const dendriteAngles = [
        { angle: 0.5, length: 1.0 },
        { angle: -0.3, length: 0.8 },
        { angle: -0.8, length: 1.2 },
        { angle: 1.0, length: 0.7 },
        { angle: -1.2, length: 0.9 },
      ];
      for (const d of dendriteAngles) {
        const dendrite = push(new THREE.Mesh(
          new THREE.CylinderGeometry(0.04, 0.06, d.length, 6),
          new THREE.MeshPhongMaterial({ color: 0xa78bfa }),
        ));
        dendrite.position.set(-1 + Math.cos(d.angle) * d.length * 0.5, Math.sin(d.angle) * d.length * 0.5, 0);
        dendrite.rotation.z = d.angle;
        dendriteParts.push(dendrite);
        // Branch
        const branch = push(new THREE.Mesh(
          new THREE.CylinderGeometry(0.02, 0.03, 0.4, 4),
          new THREE.MeshPhongMaterial({ color: 0xc4b5fd }),
        ));
        branch.position.set(
          -1 + Math.cos(d.angle) * d.length,
          Math.sin(d.angle) * d.length + Math.cos(d.angle) * 0.2,
          0
        );
        branch.rotation.z = d.angle + 0.5;
        dendriteParts.push(branch);
      }

      // Axon (long fiber)
      const axon = push(new THREE.Mesh(
        new THREE.CylinderGeometry(0.08, 0.08, 3.5, 8),
        new THREE.MeshPhongMaterial({ color: 0x3b82f6 }),
      ));
      axon.position.set(1.5, 0, 0);
      axon.rotation.z = Math.PI / 2;

      // Myelin sheath (segments along axon)
      for (let i = 0; i < 5; i++) {
        const myelin = push(new THREE.Mesh(
          new THREE.CylinderGeometry(0.15, 0.15, 0.5, 8),
          new THREE.MeshPhongMaterial({ color: 0xfbbf24, transparent: true, opacity: 0.6 }),
        ));
        myelin.position.set(0.5 + i * 0.6, 0, 0);
        myelin.rotation.z = Math.PI / 2;
        myelinParts.push(myelin);
      }

      // Nodes of Ranvier (gaps between myelin)
      for (let i = 0; i < 4; i++) {
        const node = push(new THREE.Mesh(
          new THREE.SphereGeometry(0.09, 8, 6),
          new THREE.MeshPhongMaterial({ color: 0xf97316 }),
        ));
        node.position.set(0.85 + i * 0.6, 0, 0);
        ranvierParts.push(node);
      }

      // Axon terminals (button endings)
      for (let i = 0; i < 3; i++) {
        const terminal = push(new THREE.Mesh(
          new THREE.SphereGeometry(0.12, 8, 6),
          new THREE.MeshPhongMaterial({ color: 0x22c55e }),
        ));
        terminal.position.set(3.5 + i * 0.2, (i - 1) * 0.3, 0);
        terminalParts.push(terminal);
      }

      // Synaptic knob
      const synapticKnob = push(new THREE.Mesh(
        new THREE.SphereGeometry(0.15, 10, 8),
        new THREE.MeshPhongMaterial({ color: 0x22d3ee }),
      ));
      synapticKnob.position.set(3.7, 0, 0);

      // Synaptic cleft (gap)
      const cleft = push(new THREE.Mesh(
        new THREE.PlaneGeometry(0.3, 0.6),
        new THREE.MeshPhongMaterial({ color: 0x94a3b8, transparent: true, opacity: 0.3, side: THREE.DoubleSide }),
      ));
      cleft.position.set(4.0, 0, 0);

      // Postsynaptic membrane
      const postSyn = push(new THREE.Mesh(
        new THREE.SphereGeometry(0.4, 12, 10),
        new THREE.MeshPhongMaterial({ color: 0x64748b, transparent: true, opacity: 0.4 }),
      ));
      postSyn.position.set(4.6, 0, 0);

      // Neurotransmitter vesicles
      for (let i = 0; i < 5; i++) {
        const vesicle = push(new THREE.Mesh(
          new THREE.SphereGeometry(0.04, 6, 4),
          new THREE.MeshPhongMaterial({ color: 0xfbbf24 }),
        ));
        vesicle.position.set(3.55 + Math.random() * 0.1, (Math.random() - 0.5) * 0.2, (Math.random() - 0.5) * 0.15);
        vesicleParts.push(vesicle);
      }

      push(mkSprite("Neuron — Structure & Synapse", "#fbbf24", new THREE.Vector3(0, 2.8, 0), 0.85));

      addLabel(scene, meshes, labelSprites, "Dendrite\n(receives signals)", 0xa78bfa, new THREE.Vector3(-3.5, 2.0, 2), new THREE.Vector3(-1.5, 0.8, 0));
      addLabel(scene, meshes, labelSprites, "Cell Body (Soma)\ncontains nucleus", 0x7c3aed, new THREE.Vector3(-3.5, 0, 3), soma.position);
      addLabel(scene, meshes, labelSprites, "Nucleus", 0x4c1d95, new THREE.Vector3(-2.5, 1.0, -2.5), nucleus.position);
      addLabel(scene, meshes, labelSprites, "Axon\n(conducts impulse)", 0x3b82f6, new THREE.Vector3(2, 2.0, -2.5), axon.position);
      addLabel(scene, meshes, labelSprites, "Myelin Sheath\n(insulation)", 0xfbbf24, new THREE.Vector3(-1, -2.0, 2.5), new THREE.Vector3(1.5, 0, 0));
      addLabel(scene, meshes, labelSprites, "Node of Ranvier\n(saltatory conduction)", 0xf97316, new THREE.Vector3(2, -2.5, -2), new THREE.Vector3(2.2, 0, 0));
      addLabel(scene, meshes, labelSprites, "Axon Terminal", 0x22c55e, new THREE.Vector3(4, 1.5, 2.5), new THREE.Vector3(3.5, 0, 0));
      addLabel(scene, meshes, labelSprites, "Synaptic Knob", 0x22d3ee, new THREE.Vector3(4.5, -1.0, 2), synapticKnob.position);
      addLabel(scene, meshes, labelSprites, "Synaptic Cleft", 0x94a3b8, new THREE.Vector3(4.5, 0.5, -2.5), cleft.position);
      addLabel(scene, meshes, labelSprites, "Neurotransmitter Vesicles", 0xfbbf24, new THREE.Vector3(3.5, 1.5, 2.5), new THREE.Vector3(3.58, 0.05, 0));
      addLabel(scene, meshes, labelSprites, "Postsynaptic Membrane", 0x64748b, new THREE.Vector3(5, 0, 2.5), postSyn.position);

      // Traveling action-potential pulse (dendrite → axon terminal → synapse)
      const pulse = push(new THREE.Mesh(
        new THREE.SphereGeometry(0.12, 10, 8),
        new THREE.MeshPhongMaterial({ color: 0xfde047, emissive: 0xfde047, emissiveIntensity: 1.2, transparent: true, opacity: 0.95 }),
      ));
      pulse.position.set(-1.6, 0.4, 0);

      labelSprites.forEach((s) => (s.visible = showLabels));

      // Focus dimming: receive → conduct → transmit
      const allParts: THREE.Object3D[] = [soma, nucleus, ...dendriteParts, axon, ...myelinParts, ...ranvierParts, ...terminalParts, synapticKnob, cleft, postSyn, ...vesicleParts];
      const GROUPS: Record<Exclude<NeuronFocus, "all">, THREE.Object3D[]> = {
        receive: [soma, nucleus, ...dendriteParts],
        conduct: [soma, axon, ...myelinParts, ...ranvierParts],
        transmit: [axon, ...terminalParts, synapticKnob, cleft, postSyn, ...vesicleParts],
      };
      const highlighted = focus === "all" ? allParts : GROUPS[focus];
      allParts.forEach((p) => {
        const mat = (p as THREE.Mesh).material as THREE.MeshPhongMaterial;
        if (!mat) return;
        const keep = (mat as any).__origOpacity ?? ((mat as any).__origOpacity = mat.opacity);
        mat.transparent = true;
        mat.opacity = highlighted.includes(p) ? keep : 0.12;
      });

      let pulseT = 0;
      const animate = () => {
        frameId = requestAnimationFrame(animate);
        if (playingRef.current) {
          pulseT += 0.006 * speedRef.current;
          if (pulseT > 1) pulseT -= 1;
          const x = -1.6 + pulseT * 6.4;
          pulse.position.set(x, x < -1 ? 0.4 : 0, 0);
          const mat = pulse.material as THREE.MeshPhongMaterial;
          mat.opacity = 0.55 + 0.4 * Math.abs(Math.sin(pulseT * Math.PI * 6));
        }
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
    return <WebGLFallback title="Neuron Structure" description="3D neuron with labeled parts." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Neuron — Structure & Synapse</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate · Neural anatomy</span>
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

        <PlaybackBar playing={playing} onPlayToggle={() => setPlaying((p) => !p)} speed={speed} onSpeedChange={setSpeed} onReset={resetAll} />

        <ReadoutGrid items={[
          { label: "In focus", value: info.part, highlight: true },
          { label: "Role", value: info.role },
          { label: "Signal event", value: info.signal },
          { label: "Did you know", value: info.fact },
          { label: "Exam tip", value: info.tip },
        ]} />

        <div className="rounded-lg border border-purple-500/30 bg-purple-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-purple-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Dendrites:</strong> Branch-like extensions that receive signals from other neurons and conduct impulses toward the cell body.</p>
            <p><strong className="text-foreground">Cell body (Soma):</strong> Contains nucleus and organelles; integrates incoming signals.</p>
            <p><strong className="text-foreground">Axon:</strong> Long fiber that conducts action potentials away from the cell body to axon terminals.</p>
            <p><strong className="text-foreground">Myelin sheath:</strong> Fatty insulation around axon (from Schwann cells); enables saltatory conduction at Nodes of Ranvier.</p>
            <p><strong className="text-foreground">Synapse:</strong> Junction between neuron and target cell; neurotransmitters cross the synaptic cleft to transmit signal.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
