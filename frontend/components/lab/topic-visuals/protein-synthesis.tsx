"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallback } from "@/components/lab/webgl-fallback";
import * as THREE from "three";

/* ============================================================
   Protein Synthesis (Transcription & Translation) — NEB Biology 12
   Shows DNA → mRNA → polypeptide with labeled arrows.
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

export function ProteinSynthesisVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [isWebGL, setIsWebGL] = useState(true);
  const steps = ["Transcription (Nucleus)", "mRNA Processing", "Translation (Ribosome)", "Polypeptide Chain"];

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

        const NucY = 2.0;
        const CytoY = -1.5;

        // Nuclear envelope (partial circle)
        const envelope = push(new THREE.Mesh(
          new THREE.TorusGeometry(3, 0.08, 8, 32, Math.PI * 1.5),
          new THREE.MeshPhongMaterial({ color: 0x64748b }),
        ));
        envelope.position.set(0, NucY, 0);

        // DNA double helix in nucleus
        for (let i = 0; i < 20; i++) {
          const t = i / 20;
          const angle = t * Math.PI * 3;
          const x1 = Math.cos(angle) * 0.8;
          const z1 = Math.sin(angle) * 0.8;
          const x2 = Math.cos(angle + Math.PI) * 0.8;
          const z2 = Math.sin(angle + Math.PI) * 0.8;
          const y = NucY + (t - 0.5) * 2;

          const b1 = push(new THREE.Mesh(
            new THREE.SphereGeometry(0.06, 6, 4),
            new THREE.MeshPhongMaterial({ color: 0x22d3ee }),
          ));
          b1.position.set(x1, y, z1);
          const b2 = push(new THREE.Mesh(
            new THREE.SphereGeometry(0.06, 6, 4),
            new THREE.MeshPhongMaterial({ color: 0xf97316 }),
          ));
          b2.position.set(x2, y, z2);

          // Base pair rungs
          if (i % 3 === 0) {
            const rung = push(new THREE.Line(
              new THREE.BufferGeometry().setFromPoints([
                new THREE.Vector3(x1, y, z1),
                new THREE.Vector3(x2, y, z2),
              ]),
              new THREE.LineDashedMaterial({ color: 0xfbbf24, dashSize: 0.06, gapSize: 0.04 }),
            ) as any);
            (rung as any).computeLineDistances();
          }
        }

        addLabel(meshes, "DNA (Template Strand)", 0x22d3ee, new THREE.Vector3(-3.5, NucY + 1, 2), new THREE.Vector3(0, NucY + 0.5, 0));
        addLabel(meshes, "Nucleus", 0x64748b, new THREE.Vector3(3, NucY + 0.5, -2.5), new THREE.Vector3(0, NucY, 0));

        // mRNA strand (emerging from nucleus)
        const mrnaPts: THREE.Vector3[] = [];
        for (let i = 0; i <= 12; i++) {
          const t = i / 12;
          mrnaPts.push(new THREE.Vector3(-2 + t * 3, NucY - t * 3.5, 0));
        }
        const mrna = push(new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(mrnaPts),
          new THREE.LineBasicMaterial({ color: 0x34d399, linewidth: 3 }),
        ));

        // mRNA codons (colored blocks)
        const codons = ["AUG", "UUU", "GCA", "UAC"];
        const codonColors = [0xfbbf24, 0xef4444, 0x3b82f6, 0x22c55e];
        for (let i = 0; i < codons.length; i++) {
          const codon = push(new THREE.Mesh(
            new THREE.BoxGeometry(0.4, 0.15, 0.15),
            new THREE.MeshPhongMaterial({ color: codonColors[i] }),
          ));
          codon.position.set(-1.5 + i * 0.7, CytoY + 0.5 + (i % 2) * 0.3, 0);
        }

        // Ribosome (large complex)
        const ribosomeLarge = push(new THREE.Mesh(
          new THREE.SphereGeometry(0.6, 12, 10),
          new THREE.MeshPhongMaterial({ color: 0xf97316, transparent: true, opacity: 0.6 }),
        ));
        ribosomeLarge.position.set(2.5, CytoY - 0.5, 0);
        ribosomeLarge.scale.set(1, 0.6, 0.8);
        const ribosomeSmall = push(new THREE.Mesh(
          new THREE.SphereGeometry(0.35, 10, 8),
          new THREE.MeshPhongMaterial({ color: 0xfbbf24, transparent: true, opacity: 0.6 }),
        ));
        ribosomeSmall.position.set(2.3, CytoY - 1.0, 0);
        ribosomeSmall.scale.set(1, 0.6, 0.8);

        // tRNA molecules bringing amino acids
        const aaPositions = [
          { pos: new THREE.Vector3(1.5, CytoY + 0.5, 0.5), aa: "Met", color: 0xfbbf24 },
          { pos: new THREE.Vector3(2.0, CytoY + 0.5, -0.5), aa: "Phe", color: 0xef4444 },
          { pos: new THREE.Vector3(3.0, CytoY + 0.5, 0.3), aa: "Ala", color: 0x3b82f6 },
        ];
        for (const ap of aaPositions) {
          const trna = push(new THREE.Mesh(
            new THREE.TorusGeometry(0.15, 0.04, 6, 10, Math.PI * 1.5),
            new THREE.MeshPhongMaterial({ color: 0x22d3ee }),
          ));
          trna.position.copy(ap.pos);
          const aa = push(new THREE.Mesh(
            new THREE.SphereGeometry(0.1, 8, 6),
            new THREE.MeshPhongMaterial({ color: ap.color }),
          ));
          aa.position.set(ap.pos.x, ap.pos.y + 0.25, ap.pos.z);
        }

        // Growing polypeptide chain
        const peptidePts: THREE.Vector3[] = [];
        for (let i = 0; i < 5; i++) {
          peptidePts.push(new THREE.Vector3(1.5 + i * 0.35, CytoY - 1.5 - i * 0.15, 0));
        }
        const peptide = push(new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(peptidePts),
          new THREE.LineBasicMaterial({ color: 0xa78bfa, linewidth: 3 }),
        ));
        // Amino acid spheres on peptide
        for (let i = 0; i < 5; i++) {
          const aa = push(new THREE.Mesh(
            new THREE.SphereGeometry(0.08, 6, 4),
            new THREE.MeshPhongMaterial({ color: 0xa78bfa }),
          ));
          aa.position.copy(peptidePts[i]);
        }

        // Labels
        addLabel(meshes, "mRNA (Coding strand)", 0x34d399, new THREE.Vector3(3.5, 0, 2.5), new THREE.Vector3(0, CytoY + 0.5, 0));
        addLabel(meshes, "Ribosome\n(Large + Small subunit)", 0xf97316, new THREE.Vector3(3.5, CytoY - 0.5, -2.5), ribosomeLarge.position);
        addLabel(meshes, "tRNA (carries amino acid)", 0x22d3ee, new THREE.Vector3(-3.5, CytoY + 1, 2.5), aaPositions[0].pos);
        addLabel(meshes, "Polypeptide Chain", 0xa78bfa, new THREE.Vector3(-3.5, CytoY - 2, -2), peptidePts[2]);
        addLabel(meshes, "Codon → Anticodon\nmatching", 0x7dd3fc, new THREE.Vector3(3.5, CytoY + 1.5, -2), aaPositions[1].pos);

        push(mkSprite("Protein Synthesis — Transcription & Translation", "#fbbf24", new THREE.Vector3(0, 4.0, 0), 0.85));
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
  }, [isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="Protein Synthesis" description="3D transcription and translation diagram." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Protein Synthesis — Transcription & Translation</span>
          <span className="text-xs text-muted-foreground font-normal">Central dogma of molecular biology</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Transcription:</strong> DNA → mRNA in the nucleus; RNA polymerase reads template strand (3'→5') and synthesizes mRNA (5'→3').</p>
            <p><strong className="text-foreground">mRNA processing:</strong> 5' cap, poly-A tail, and splicing remove introns; mature mRNA exits nucleus via nuclear pores.</p>
            <p><strong className="text-foreground">Translation:</strong> mRNA → polypeptide at ribosome in cytoplasm; tRNA brings amino acids matching codons.</p>
            <p><strong className="text-foreground">Genetic code:</strong> Universal, degenerate (multiple codons per amino acid); start codon = AUG (methionine).</p>
            <p><strong className="text-foreground">Central Dogma:</strong> DNA → RNA → Protein — information flow in cells.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
