"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallback } from "@/components/lab/webgl-fallback";
import * as THREE from "three";
import { LiveArrow } from "@/components/lab/animated-arrow-helper";

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

function addLabel(meshes: THREE.Object3D[], text: string, color: number, labelPos: THREE.Vector3, targetPos: THREE.Vector3) {
  const dir = targetPos.clone().sub(labelPos).normalize();
  const len = labelPos.distanceTo(targetPos);
  meshes.push(new LiveArrow(dir, labelPos, len * 0.85, color, 0.22, 0.14) as any);
  const lp = labelPos.clone().sub(dir.clone().multiplyScalar(0.45));
  meshes.push(mkSprite(text, `#${color.toString(16).padStart(6, "0")}`, lp, 0.85));
}

type Species = "australopithecus" | "homo habilis" | "homo erectus" | "neanderthal" | "sapiens";

export function HumanEvolutionVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [species, setSpecies] = useState<Species>("sapiens");
  const [isWebGL] = useState(() => isWebGLAvailable());


  const speciesData: Record<Species, { name: string; brainVol: string; browRidge: string; chin: string; posture: string }> = {
    australopithecus: { name: "Australopithecus", brainVol: "~450 cc", browRidge: "Prominent", chin: "Absent", posture: "Bipedal" },
    "homo habilis": { name: "Homo habilis", brainVol: "~650 cc", browRidge: "Moderate", chin: "Absent", posture: "Bipedal" },
    "homo erectus": { name: "Homo erectus", brainVol: "~900 cc", browRidge: "Heavy", chin: "Absent", posture: "Fully bipedal" },
    neanderthal: { name: "Neanderthal", brainVol: "~1500 cc", browRidge: "Very heavy", chin: "Present (weak)", posture: "Fully bipedal" },
    sapiens: { name: "Homo sapiens", brainVol: "~1350 cc", browRidge: "Reduced", chin: "Prominent", posture: "Fully bipedal" },
  };

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

      addLabel(meshes, "Cranial Capacity", 0xa78bfa, new THREE.Vector3(-3, 1.5, 2), new THREE.Vector3(0, 0.3, 0));
      addLabel(meshes, "Brow Ridge", 0xb8a88a, new THREE.Vector3(3, 1.0, 2), new THREE.Vector3(0, 0.5, 0.6));
      addLabel(meshes, "Face/Jaw", 0xc4b5a0, new THREE.Vector3(3, -0.5, -2), new THREE.Vector3(0, -0.3, 0.35));
      addLabel(meshes, "Chin", 0xd4c4a8, new THREE.Vector3(-3, -1.0, 2), new THREE.Vector3(0, -0.55, 0.55));
      addLabel(meshes, "Foramen Magnum\n(Bipedal indicator)", 0x7c3aed, new THREE.Vector3(-3.5, 0.3, -2.5), fm.position);

      // Comparative features panel
      push(mkSprite(`Brain: ${sd.brainVol}  |  Posture: ${sd.posture}`, "#7dd3fc", new THREE.Vector3(0, -2.2, 0), 0.7));

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
  }, [species, isWebGL]);

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

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

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
