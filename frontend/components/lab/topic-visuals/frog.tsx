"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallback } from "@/components/lab/webgl-fallback";
import * as THREE from "three";

/* ============================================================
   Frog (Rana tigrina) — NEB Biology 11 (Faunal Diversity)
   Shows digestive, circulatory, and respiratory systems.
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

type SystemView = "digestive" | "circulatory" | "respiratory";

export function FrogVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<SystemView>("digestive");
  const [isWebGL, setIsWebGL] = useState(true);

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
        while (meshes.length > 80) {
          const m = meshes.pop()!;
          scene.remove(m);
          if (m instanceof THREE.Mesh) { m.geometry?.dispose(); const mat = m.material; if (Array.isArray(mat)) mat.forEach((x) => x.dispose()); else (Array.isArray(mat) ? mat : [mat]).forEach((x) => x.dispose()); }
          else if (m instanceof THREE.Sprite) { const sm = m.material; sm.map?.dispose?.(); sm.dispose(); }
          else if (m instanceof THREE.ArrowHelper) m.dispose();
        }

        if (view === "digestive") {
          const mouth = push(new THREE.Mesh(new THREE.SphereGeometry(0.3, 10, 8), new THREE.MeshPhongMaterial({ color: 0x92400e })));
          mouth.position.set(-2.5, 0.5, 0);
          mouth.scale.set(0.8, 0.5, 1);
          const oesophagus = push(new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.6, 8), new THREE.MeshPhongMaterial({ color: 0xf97316 })));
          oesophagus.position.set(-2.5, -0.1, 0);
          const stomach = push(new THREE.Mesh(new THREE.SphereGeometry(0.35, 12, 10), new THREE.MeshPhongMaterial({ color: 0xfbbf24, transparent: true, opacity: 0.7 })));
          stomach.position.set(-1.8, -0.5, 0);
          const intestines: THREE.Vector3[] = [];
          for (let i = 0; i < 12; i++) {
            const t = i / 11;
            intestines.push(new THREE.Vector3(-1.0 + t * 2.0, -0.5 + Math.sin(t * Math.PI * 3) * 0.2, Math.cos(t * Math.PI * 2) * 0.15));
          }
          const intestine = push(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(intestines), 20, 0.07, 8, false), new THREE.MeshPhongMaterial({ color: 0x22c55e, transparent: true, opacity: 0.7 })));
          const cloaca = push(new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.1, 0.4, 8), new THREE.MeshPhongMaterial({ color: 0x7c3aed })));
          cloaca.position.set(1.2, -0.5, 0);
          const liver = push(new THREE.Mesh(new THREE.SphereGeometry(0.5, 12, 10), new THREE.MeshPhongMaterial({ color: 0xb45309, transparent: true, opacity: 0.5 })));
          liver.position.set(-1.5, 0.2, 0.3);
          const gallbladder = push(new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 6), new THREE.MeshPhongMaterial({ color: 0x16a34a })));
          gallbladder.position.set(-1.8, 0.0, 0.4);

          push(mkSprite("Frog — Digestive System", "#fbbf24", new THREE.Vector3(0, 2.5, 0), 0.85));
          addLabel(meshes, "Mouth", 0x92400e, new THREE.Vector3(-4, 1.5, 2), mouth.position);
          addLabel(meshes, "Oesophagus", 0xf97316, new THREE.Vector3(-4, 0, 2), oesophagus.position);
          addLabel(meshes, "Stomach", 0xfbbf24, new THREE.Vector3(-3.5, -1.5, 2.5), stomach.position);
          addLabel(meshes, "Small Intestine (coiled)", 0x22c55e, new THREE.Vector3(2, -1.5, 2.5), new THREE.Vector3(0, -0.5, 0));
          addLabel(meshes, "Liver (largest gland)", 0xb45309, new THREE.Vector3(3, 1.0, -2.5), liver.position);
          addLabel(meshes, "Gall Bladder", 0x16a34a, new THREE.Vector3(3.5, 0.3, -2), gallbladder.position);
          addLabel(meshes, "Cloaca", 0x7c3aed, new THREE.Vector3(3.5, -0.8, 2), cloaca.position);
        } else if (view === "circulatory") {
          const heartBase = push(new THREE.Mesh(new THREE.SphereGeometry(0.35, 12, 10), new THREE.MeshPhongMaterial({ color: 0xef4444 })));
          heartBase.position.set(0, 0.8, 0);
          const leftAtrium = push(new THREE.Mesh(new THREE.SphereGeometry(0.15, 8, 6), new THREE.MeshPhongMaterial({ color: 0x22d3ee })));
          leftAtrium.position.set(0.2, 1.1, 0.15);
          const rightAtrium = push(new THREE.Mesh(new THREE.SphereGeometry(0.15, 8, 6), new THREE.MeshPhongMaterial({ color: 0xf97316 })));
          rightAtrium.position.set(-0.2, 1.1, -0.15);
          const ventricle = push(new THREE.Mesh(new THREE.SphereGeometry(0.2, 8, 6), new THREE.MeshPhongMaterial({ color: 0xdc2626 })));
          ventricle.position.set(0, 0.6, 0);
          const aorta = push(new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.4, 6), new THREE.MeshPhongMaterial({ color: 0xef4444 })));
          aorta.position.set(0, 1.3, 0);
          const sinus = push(new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.4, 6), new THREE.MeshPhongMaterial({ color: 0x3b82f6 })));
          sinus.position.set(-0.5, 1.0, 0.3);
          const pulmonary = push(new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.4, 6), new THREE.MeshPhongMaterial({ color: 0x22d3ee })));
          pulmonary.position.set(0.5, 1.0, -0.3);

          // Blood vessels
          for (const [from, to, color] of [
            [new THREE.Vector3(0, 0.5, 0), new THREE.Vector3(2, 0, 0), 0x3b82f6],
            [new THREE.Vector3(0, 0.5, 0), new THREE.Vector3(-2, 0, 0), 0xef4444],
            [new THREE.Vector3(0, 0.5, 0), new THREE.Vector3(0, -1.5, 0), 0x3b82f6],
          ] as [THREE.Vector3, THREE.Vector3, number][]) {
            push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([from, to]), new THREE.LineBasicMaterial({ color })));
          }

          push(mkSprite("Frog — Circulatory System (3-chambered Heart)", "#fbbf24", new THREE.Vector3(0, 2.5, 0), 0.85));
          addLabel(meshes, "Left Atrium (Oxygenated)", 0x22d3ee, new THREE.Vector3(-3.5, 2.0, 2), leftAtrium.position);
          addLabel(meshes, "Right Atrium (Deoxygenated)", 0xf97316, new THREE.Vector3(3.5, 2.0, -2), rightAtrium.position);
          addLabel(meshes, "Ventricle (Mixed blood)", 0xdc2626, new THREE.Vector3(0, 2.5, 3), ventricle.position);
          addLabel(meshes, "Aorta", 0xef4444, new THREE.Vector3(3.5, 1.5, 2), aorta.position);
          addLabel(meshes, "Sinus Venosus", 0x3b82f6, new THREE.Vector3(-3.5, 1.0, -2), sinus.position);
          addLabel(meshes, "Pulmocutaneous Artery", 0x22d3ee, new THREE.Vector3(3.5, 0.5, -2.5), pulmonary.position);
        } else {
          const nostrilL = push(new THREE.Mesh(new THREE.SphereGeometry(0.06, 6, 4), new THREE.MeshPhongMaterial({ color: 0x22c55e })));
          nostrilL.position.set(-0.3, 1.5, 0.2);
          const nostrilR = push(new THREE.Mesh(new THREE.SphereGeometry(0.06, 6, 4), new THREE.MeshPhongMaterial({ color: 0x22c55e })));
          nostrilR.position.set(0.3, 1.5, 0.2);
          const buccal = push(new THREE.Mesh(new THREE.SphereGeometry(0.3, 10, 8), new THREE.MeshPhongMaterial({ color: 0xf97316, transparent: true, opacity: 0.6 })));
          buccal.position.set(0, 1.2, 0);
          const glottis = push(new THREE.Mesh(new THREE.CircleGeometry(0.08, 8), new THREE.MeshPhongMaterial({ color: 0xef4444, side: THREE.DoubleSide })));
          glottis.position.set(0, 0.9, 0.25);
          const trachea = push(new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.6, 8), new THREE.MeshPhongMaterial({ color: 0x3b82f6 })));
          trachea.position.set(0, 0.55, 0);
          const lungL = push(new THREE.Mesh(new THREE.SphereGeometry(0.25, 10, 8), new THREE.MeshPhongMaterial({ color: 0xfbbf24, transparent: true, opacity: 0.5 })));
          lungL.position.set(-0.35, 0.1, 0);
          const lungR = push(new THREE.Mesh(new THREE.SphereGeometry(0.25, 10, 8), new THREE.MeshPhongMaterial({ color: 0xfbbf24, transparent: true, opacity: 0.5 })));
          lungR.position.set(0.35, 0.1, 0);
          const skin = push(new THREE.Mesh(new THREE.SphereGeometry(0.6, 12, 10), new THREE.MeshPhongMaterial({ color: 0x22c55e, transparent: true, opacity: 0.15, side: THREE.DoubleSide })));
          skin.position.set(0, 0.5, 0);

          push(mkSprite("Frog — Respiratory System", "#fbbf24", new THREE.Vector3(0, 2.5, 0), 0.85));
          addLabel(meshes, "Nostrils (External nares)", 0x22c55e, new THREE.Vector3(2, 2.2, 2), nostrilL.position);
          addLabel(meshes, "Buccal Cavity", 0xf97316, new THREE.Vector3(-3, 1.8, -2), buccal.position);
          addLabel(meshes, "Glottis (Laryngeal opening)", 0xef4444, new THREE.Vector3(-3, 0.8, 2.5), glottis.position);
          addLabel(meshes, "Trachea", 0x3b82f6, new THREE.Vector3(3, 0.3, 2.5), trachea.position);
          addLabel(meshes, "Left Lung", 0xfbbf24, new THREE.Vector3(-3, -0.5, 2), lungL.position);
          addLabel(meshes, "Right Lung", 0xfbbf24, new THREE.Vector3(3, -0.5, -2), lungR.position);
          addLabel(meshes, "Skin (Cutaneous Respiration)", 0x22c55e, new THREE.Vector3(0, -1.5, 3), skin.position);
        }
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
  }, [view, isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="Frog Anatomy" description="3D frog system diagrams." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Frog — Rana tigrina Anatomy</span>
          <span className="text-xs text-muted-foreground font-normal">Select system to view</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="System View">
          <div className="flex flex-wrap gap-2 mt-2">
            {(["digestive", "circulatory", "respiratory"] as const).map((v) => (
              <button key={v} onClick={() => setView(v)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  view === v ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}>
                {v === "digestive" ? "Digestive" : v === "circulatory" ? "Circulatory" : "Respiratory"}
              </button>
            ))}
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-green-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Digestive tract:</strong> Complete — mouth, oesophagus, stomach, small intestine, large intestine, cloaca. Liver and pancreas are accessory glands.</p>
            <p><strong className="text-foreground">Circulatory system:</strong> Closed; 3-chambered heart (2 atria + 1 ventricle); mixed blood in ventricle.</p>
            <p><strong className="text-foreground">Respiration:</strong> Three modes — buccal pumping, skin (cutaneous), and pulmonary (lung) respiration.</p>
            <p><strong className="text-foreground">Lungs:</strong> Simple sac-like; internal septa increase surface area but limited compared to terrestrial vertebrates.</p>
            <p><strong className="text-foreground">Cloaca:</strong> Common chamber receiving digestive, urinary, and reproductive products.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
