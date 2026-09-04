"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallback } from "@/components/lab/webgl-fallback";
import * as THREE from "three";
import { LiveArrow } from "@/components/lab/animated-arrow-helper";

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

function addLabel(meshes: THREE.Object3D[], text: string, color: number, labelPos: THREE.Vector3, targetPos: THREE.Vector3) {
  const dir = targetPos.clone().sub(labelPos).normalize();
  const len = labelPos.distanceTo(targetPos);
  meshes.push(new LiveArrow(dir, labelPos, len * 0.85, color, 0.22, 0.14) as any);
  const lp = labelPos.clone().sub(dir.clone().multiplyScalar(0.45));
  meshes.push(mkSprite(text, `#${color.toString(16).padStart(6, "0")}`, lp, 0.85));
}

export function NeuronVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
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

      scene.add(new THREE.AmbientLight(0xffffff, 0.7));
      const dl = new THREE.DirectionalLight(0xffffff, 0.9);
      dl.position.set(4, 6, 4);
      scene.add(dl);

      const push = <T extends THREE.Object3D>(o: T): T => { scene.add(o); meshes.push(o); return o; };

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
      }

      // Nodes of Ranvier (gaps between myelin)
      for (let i = 0; i < 4; i++) {
        const node = push(new THREE.Mesh(
          new THREE.SphereGeometry(0.09, 8, 6),
          new THREE.MeshPhongMaterial({ color: 0xf97316 }),
        ));
        node.position.set(0.85 + i * 0.6, 0, 0);
      }

      // Axon terminals (button endings)
      for (let i = 0; i < 3; i++) {
        const terminal = push(new THREE.Mesh(
          new THREE.SphereGeometry(0.12, 8, 6),
          new THREE.MeshPhongMaterial({ color: 0x22c55e }),
        ));
        terminal.position.set(3.5 + i * 0.2, (i - 1) * 0.3, 0);
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
      }

      push(mkSprite("Neuron — Structure & Synapse", "#fbbf24", new THREE.Vector3(0, 2.8, 0), 0.85));

      addLabel(meshes, "Dendrite\n(receives signals)", 0xa78bfa, new THREE.Vector3(-3.5, 2.0, 2), new THREE.Vector3(-1.5, 0.8, 0));
      addLabel(meshes, "Cell Body (Soma)\ncontains nucleus", 0x7c3aed, new THREE.Vector3(-3.5, 0, 3), soma.position);
      addLabel(meshes, "Nucleus", 0x4c1d95, new THREE.Vector3(-2.5, 1.0, -2.5), nucleus.position);
      addLabel(meshes, "Axon\n(conducts impulse)", 0x3b82f6, new THREE.Vector3(2, 2.0, -2.5), axon.position);
      addLabel(meshes, "Myelin Sheath\n(insulation)", 0xfbbf24, new THREE.Vector3(-1, -2.0, 2.5), new THREE.Vector3(1.5, 0, 0));
      addLabel(meshes, "Node of Ranvier\n(saltatory conduction)", 0xf97316, new THREE.Vector3(2, -2.5, -2), new THREE.Vector3(2.2, 0, 0));
      addLabel(meshes, "Axon Terminal", 0x22c55e, new THREE.Vector3(4, 1.5, 2.5), new THREE.Vector3(3.5, 0, 0));
      addLabel(meshes, "Synaptic Knob", 0x22d3ee, new THREE.Vector3(4.5, -1.0, 2), synapticKnob.position);
      addLabel(meshes, "Synaptic Cleft", 0x94a3b8, new THREE.Vector3(4.5, 0.5, -2.5), cleft.position);
      addLabel(meshes, "Neurotransmitter Vesicles", 0xfbbf24, new THREE.Vector3(3.5, 1.5, 2.5), new THREE.Vector3(3.58, 0.05, 0));
      addLabel(meshes, "Postsynaptic Membrane", 0x64748b, new THREE.Vector3(5, 0, 2.5), postSyn.position);

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
  }, [isWebGL]);

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
        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

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
