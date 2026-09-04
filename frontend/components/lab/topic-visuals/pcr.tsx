"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallback } from "@/components/lab/webgl-fallback";
import * as THREE from "three";
import { LiveArrow } from "@/components/lab/animated-arrow-helper";

/* ============================================================
   PCR Process — NEB Biology 12 (Biotechnology)
   Shows denaturation, annealing, extension steps with labels.
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

type PcrStep = "denature" | "anneal" | "extend";

export function PCRVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState<PcrStep>("denature");
  const [isWebGL] = useState(() => isWebGLAvailable());
  const [cycle, setCycle] = useState(1);


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
        while (meshes.length > 80) {
          const m = meshes.pop()!;
          scene.remove(m);
          if (m instanceof THREE.Mesh) { m.geometry?.dispose(); const mat = m.material; if (Array.isArray(mat)) mat.forEach((x) => x.dispose()); else (Array.isArray(mat) ? mat : [mat]).forEach((x) => x.dispose()); }
          else if (m instanceof THREE.Sprite) { const sm = m.material; sm.map?.dispose?.(); sm.dispose(); }
          else if (m instanceof THREE.ArrowHelper) m.dispose();
        }

        const temp = step === "denature" ? "94-96°C" : step === "anneal" ? "50-65°C" : "72°C";
        const stepNames = { denature: "Denaturation", anneal: "Annealing", extend: "Extension" };

        if (step === "denature") {
          // Double-stranded DNA being separated
          const topStrand = push(new THREE.Mesh(
            new THREE.BoxGeometry(3, 0.1, 0.2),
            new THREE.MeshPhongMaterial({ color: 0xef4444 }),
          ));
          topStrand.position.set(0, 0.3, 0);
          const bottomStrand = push(new THREE.Mesh(
            new THREE.BoxGeometry(3, 0.1, 0.2),
            new THREE.MeshPhongMaterial({ color: 0x3b82f6 }),
          ));
          bottomStrand.position.set(0, -0.3, 0);

          // Hydrogen bonds breaking (animated as fading)
          for (let i = 0; i < 6; i++) {
            const bond = push(new THREE.Mesh(
              new THREE.SphereGeometry(0.04, 6, 4),
              new THREE.MeshPhongMaterial({ color: 0xfbbf24, transparent: true, opacity: 0.4 }),
            ));
            bond.position.set(-1.2 + i * 0.5, 0, 0);
          }

          // Heat icon
          const heat = push(new THREE.Mesh(
            new THREE.ConeGeometry(0.15, 0.3, 6),
            new THREE.MeshPhongMaterial({ color: 0xef4444 }),
          ));
          heat.position.set(2, 1.0, 0);
          const heat2 = push(new THREE.Mesh(
            new THREE.ConeGeometry(0.12, 0.25, 6),
            new THREE.MeshPhongMaterial({ color: 0xf97316 }),
          ));
          heat2.position.set(2.3, 0.85, 0);

          push(mkSprite(`Step 1: Denaturation — ${temp}`, "#fbbf24", new THREE.Vector3(0, 2.0, 0), 0.8));
          addLabel(meshes, "Template Strand (coding)", 0xef4444, new THREE.Vector3(-2, 1.2, 2), topStrand.position);
          addLabel(meshes, "Template Strand (template)", 0x3b82f6, new THREE.Vector3(-2, -1.2, 2), bottomStrand.position);
          addLabel(meshes, "H-bonds broken", 0xfbbf24, new THREE.Vector3(2, 0.5, 2.5), new THREE.Vector3(0, 0, 0));
          addLabel(meshes, "Heat (94-96°C)", 0xef4444, new THREE.Vector3(2.5, 1.5, -2), heat.position);
        } else if (step === "anneal") {
          // Single strands with primers bound
          const topStrand = push(new THREE.Mesh(
            new THREE.BoxGeometry(3, 0.08, 0.18),
            new THREE.MeshPhongMaterial({ color: 0xef4444 }),
          ));
          topStrand.position.set(0, 0.2, 0);
          const bottomStrand = push(new THREE.Mesh(
            new THREE.BoxGeometry(3, 0.08, 0.18),
            new THREE.MeshPhongMaterial({ color: 0x3b82f6 }),
          ));
          bottomStrand.position.set(0, -0.2, 0);

          // Forward primer
          const fwdPrimer = push(new THREE.Mesh(
            new THREE.BoxGeometry(0.5, 0.08, 0.15),
            new THREE.MeshPhongMaterial({ color: 0x22c55e }),
          ));
          fwdPrimer.position.set(-1.0, -0.2, 0.15);
          // Reverse primer
          const revPrimer = push(new THREE.Mesh(
            new THREE.BoxGeometry(0.5, 0.08, 0.15),
            new THREE.MeshPhongMaterial({ color: 0xf97316 }),
          ));
          revPrimer.position.set(1.0, 0.2, -0.15);

          push(mkSprite(`Step 2: Annealing — ${temp}`, "#fbbf24", new THREE.Vector3(0, 2.0, 0), 0.8));
          addLabel(meshes, "Forward Primer", 0x22c55e, new THREE.Vector3(-2.5, -1.0, 2.5), fwdPrimer.position);
          addLabel(meshes, "Reverse Primer", 0xf97316, new THREE.Vector3(2.5, 1.0, -2.5), revPrimer.position);
          addLabel(meshes, "Primer binds to\ntemplate strand", 0x22d3ee, new THREE.Vector3(0, -1.5, 2.5), new THREE.Vector3(0, -0.2, 0));
        } else {
          // Extension — new strands being synthesized
          const templateTop = push(new THREE.Mesh(
            new THREE.BoxGeometry(3, 0.08, 0.18),
            new THREE.MeshPhongMaterial({ color: 0x3b82f6 }),
          ));
          templateTop.position.set(0, -0.2, 0);
          const templateBottom = push(new THREE.Mesh(
            new THREE.BoxGeometry(3, 0.08, 0.18),
            new THREE.MeshPhongMaterial({ color: 0xef4444 }),
          ));
          templateBottom.position.set(0, 0.2, 0);

          // New strands growing
          const newTop = push(new THREE.Mesh(
            new THREE.BoxGeometry(2.5, 0.08, 0.15),
            new THREE.MeshPhongMaterial({ color: 0xef4444, transparent: true, opacity: 0.7 }),
          ));
          newTop.position.set(-0.3, 0.2, 0.2);
          const newBottom = push(new THREE.Mesh(
            new THREE.BoxGeometry(2.5, 0.08, 0.15),
            new THREE.MeshPhongMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.7 }),
          ));
          newBottom.position.set(-0.3, -0.2, -0.2);

          // DNA polymerase
          const polymerase = push(new THREE.Mesh(
            new THREE.SphereGeometry(0.2, 10, 8),
            new THREE.MeshPhongMaterial({ color: 0xa78bfa }),
          ));
          polymerase.position.set(1.2, 0.2, 0.2);

          // dNTPs being added
          const dntpColors = [0xef4444, 0x22c55e, 0xfbbf24, 0x3b82f6];
          for (let i = 0; i < 4; i++) {
            const dntp = push(new THREE.Mesh(
              new THREE.SphereGeometry(0.06, 6, 4),
              new THREE.MeshPhongMaterial({ color: dntpColors[i] }),
            ));
            dntp.position.set(0.8 + i * 0.15, 0.2 + Math.random() * 0.1, 0.2 + Math.random() * 0.1);
          }

          push(mkSprite(`Step 3: Extension — ${temp}`, "#fbbf24", new THREE.Vector3(0, 2.0, 0), 0.8));
          addLabel(meshes, "New Strand (5'→3')", 0xef4444, new THREE.Vector3(-2.5, 1.2, 2), newTop.position);
          addLabel(meshes, "DNA Polymerase", 0xa78bfa, new THREE.Vector3(2, 0.8, 2.5), polymerase.position);
          addLabel(meshes, "dNTPs\n(building blocks)", 0x22d3ee, new THREE.Vector3(2, -0.5, -2.5), new THREE.Vector3(1.0, 0.2, 0.2));
          addLabel(meshes, "Complementary base pairing\n(A-T, G-C)", 0xfbbf24, new THREE.Vector3(-2, -1.5, 2), newBottom.position);
        }

        // Cycle counter
        push(mkSprite(`Cycle: ${cycle}/30  →  ${Math.pow(2, cycle)} copies`, "#7dd3fc", new THREE.Vector3(0, -2.5, 0), 0.7));
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
  }, [step, cycle, isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="PCR Process" description="3D polymerase chain reaction visualization." />;
  }

  const steps: PcrStep[] = ["denature", "anneal", "extend"];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>PCR — Polymerase Chain Reaction</span>
          <span className="text-xs text-muted-foreground font-normal">Select step to view</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="PCR Step">
          <div className="flex flex-wrap gap-2 mt-2">
            {steps.map((s) => (
              <button key={s} onClick={() => setStep(s)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  step === s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}>
                {s === "denature" ? "Denaturation (94-96°C)" : s === "anneal" ? "Annealing (50-65°C)" : "Extension (72°C)"}
              </button>
            ))}
          </div>
        </CollapsibleControls>

        <CollapsibleControls label="Cycle Number">
          <div className="flex gap-3 mt-2">
            <button onClick={() => setCycle(Math.max(1, cycle - 1))} className="px-2 py-1 rounded bg-muted text-xs">−</button>
            <span className="text-xs font-mono py-1">{cycle} cycles → {Math.pow(2, cycle)} copies</span>
            <button onClick={() => setCycle(Math.min(40, cycle + 1))} className="px-2 py-1 rounded bg-muted text-xs">+</button>
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-orange-500/30 bg-orange-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-orange-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Denaturation (94-96°C):</strong> Double-stranded DNA separates into single strands by breaking hydrogen bonds.</p>
            <p><strong className="text-foreground">Annealing (50-65°C):</strong> Primers bind (anneal) to complementary sequences on each template strand.</p>
            <p><strong className="text-foreground">Extension (72°C):</strong> Taq DNA polymerase synthesizes new strands by adding dNTPs in 5'→3' direction.</p>
            <p><strong className="text-foreground">Exponential amplification:</strong> Each cycle doubles DNA — 30 cycles yield ~1 billion copies.</p>
            <p><strong className="text-foreground">Taq polymerase:</strong> Thermostable enzyme from Thermus aquaticus — survives repeated heating cycles.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
