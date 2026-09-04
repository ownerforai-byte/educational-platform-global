"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallback } from "@/components/lab/webgl-fallback";
import * as THREE from "three";
import { LiveArrow } from "@/components/lab/animated-arrow-helper";

/* ============================================================
   Earthworm (Pheretima) — NEB Biology 11 (Faunal Diversity)
   Shows external features and internal systems with arrow labels.
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

type SystemView = "external" | "digestive" | "excretory" | "nervous";

export function EarthwormVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<SystemView>("external");
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

        const bodyY = 0;
        // Body segments
        for (let i = 0; i < 10; i++) {
          const seg = push(new THREE.Mesh(
            new THREE.CylinderGeometry(0.35, 0.33, 0.6, 12),
            new THREE.MeshPhongMaterial({ color: 0xb45309 }),
          ));
          seg.position.set(-2.5 + i * 0.55, bodyY, 0);
        }

        // Clitellum (sexually swollen segment)
        const clitellum = push(new THREE.Mesh(
          new THREE.CylinderGeometry(0.38, 0.38, 0.8, 12),
          new THREE.MeshPhongMaterial({ color: 0xfbbf24, transparent: true, opacity: 0.5 }),
        ));
        clitellum.position.set(0.8, bodyY, 0);

        if (view === "external") {
          // Prostomium (mouth lobe)
          const prostomium = push(new THREE.Mesh(
            new THREE.SphereGeometry(0.25, 10, 8),
            new THREE.MeshPhongMaterial({ color: 0x92400e }),
          ));
          prostomium.position.set(-3.0, bodyY, 0);
          prostomium.scale.set(0.8, 1, 0.8);

          // Setae (bristles on segments)
          for (let i = 0; i < 8; i++) {
            const seg = push(new THREE.Mesh(
              new THREE.CylinderGeometry(0.01, 0.01, 0.15, 4),
              new THREE.MeshPhongMaterial({ color: 0x78350f }),
            ));
            seg.position.set(-2.2 + i * 0.55, bodyY - 0.35, 0);
          }

          // Male pores
          const mp1 = push(new THREE.Mesh(
            new THREE.SphereGeometry(0.04, 6, 4),
            new THREE.MeshPhongMaterial({ color: 0xef4444 }),
          ));
          mp1.position.set(-0.5, bodyY - 0.3, 0.35);
          const mp2 = push(new THREE.Mesh(
            new THREE.SphereGeometry(0.04, 6, 4),
            new THREE.MeshPhongMaterial({ color: 0xef4444 }),
          ));
          mp2.position.set(0.1, bodyY - 0.3, 0.35);

          // Spermathecal pores
          const sp1 = push(new THREE.Mesh(
            new THREE.SphereGeometry(0.04, 6, 4),
            new THREE.MeshPhongMaterial({ color: 0x22d3ee }),
          ));
          sp1.position.set(-1.65, bodyY - 0.3, 0.35);
          const sp2 = push(new THREE.Mesh(
            new THREE.SphereGeometry(0.04, 6, 4),
            new THREE.MeshPhongMaterial({ color: 0x22d3ee }),
          ));
          sp2.position.set(-1.1, bodyY - 0.3, 0.35);
          const sp3 = push(new THREE.Mesh(
            new THREE.SphereGeometry(0.04, 6, 4),
            new THREE.MeshPhongMaterial({ color: 0x22d3ee }),
          ));
          sp3.position.set(-0.55, bodyY - 0.3, 0.35);

          // anus
          const anus = push(new THREE.Mesh(
            new THREE.CircleGeometry(0.08, 8),
            new THREE.MeshPhongMaterial({ color: 0x451a03, side: THREE.DoubleSide }),
          ));
          anus.position.set(3.0, bodyY, 0.33);

          push(mkSprite("Earthworm — External Features", "#fbbf24", new THREE.Vector3(0, 2.8, 0), 0.85));

          addLabel(meshes, "Prostomium", 0x92400e, new THREE.Vector3(-4, 1.5, 2), prostomium.position);
          addLabel(meshes, "Clitellum", 0xfbbf24, new THREE.Vector3(3, 1.2, -2), clitellum.position);
          addLabel(meshes, "Setae (Bristles)", 0x78350f, new THREE.Vector3(-3.5, -1.5, 2), new THREE.Vector3(-1, bodyY - 0.35, 0));
          addLabel(meshes, "Male Pores (3/4 & 4/5)", 0xef4444, new THREE.Vector3(-3.5, -0.5, -2.5), mp1.position);
          addLabel(meshes, "Spermathecal Pores (2/3, 3/4, 4/5)", 0x22d3ee, new THREE.Vector3(3.5, -0.5, 2.5), sp1.position);
          addLabel(meshes, "Anus (last segment)", 0x451a03, new THREE.Vector3(3.5, 0.5, -2.5), anus.position);
        } else if (view === "digestive") {
          // Open body wall to show digestive tract
          // Pharynx
          const pharynx = push(new THREE.Mesh(
            new THREE.CylinderGeometry(0.2, 0.15, 0.6, 8),
            new THREE.MeshPhongMaterial({ color: 0xf97316 }),
          ));
          pharynx.position.set(-2.5, bodyY, 0);
          // Oesophagus
          const oesophagus = push(new THREE.Mesh(
            new THREE.CylinderGeometry(0.1, 0.1, 0.8, 8),
            new THREE.MeshPhongMaterial({ color: 0xfb923c }),
          ));
          oesophagus.position.set(-1.8, bodyY, 0);
          // Crop
          const crop = push(new THREE.Mesh(
            new THREE.CylinderGeometry(0.18, 0.18, 0.5, 8),
            new THREE.MeshPhongMaterial({ color: 0xfbbf24 }),
          ));
          crop.position.set(-1.3, bodyY, 0);
          // Gizzard
          const gizzard = push(new THREE.Mesh(
            new THREE.CylinderGeometry(0.15, 0.15, 0.4, 8),
            new THREE.MeshPhongMaterial({ color: 0x854d0e }),
          ));
          gizzard.position.set(-0.8, bodyY, 0);
          // Intestine
          const intestine = push(new THREE.Mesh(
            new THREE.CylinderGeometry(0.12, 0.1, 3.0, 8),
            new THREE.MeshPhongMaterial({ color: 0x22c55e, transparent: true, opacity: 0.6 }),
          ));
          intestine.position.set(0.8, bodyY, 0);
          // Typhlosole (internal fold)
          const typhlosole = push(new THREE.Mesh(
            new THREE.CylinderGeometry(0.04, 0.04, 2.0, 6),
            new THREE.MeshPhongMaterial({ color: 0x16a34a }),
          ));
          typhlosole.position.set(1.0, bodyY + 0.08, 0);

          push(mkSprite("Earthworm — Digestive System", "#fbbf24", new THREE.Vector3(0, 2.8, 0), 0.85));
          addLabel(meshes, "Pharynx", 0xf97316, new THREE.Vector3(-4, 1.5, 2), pharynx.position);
          addLabel(meshes, "Oesophagus", 0xfb923c, new THREE.Vector3(-4, 0.8, -2), oesophagus.position);
          addLabel(meshes, "Crop (Storage)", 0xfbbf24, new THREE.Vector3(-3.5, -0.5, 2.5), crop.position);
          addLabel(meshes, "Gizzard (Muscular)", 0x854d0e, new THREE.Vector3(3.5, 1.2, -2.5), gizzard.position);
          addLabel(meshes, "Intestine (Digestion/Absorption)", 0x22c55e, new THREE.Vector3(3.5, -0.5, 2), intestine.position);
          addLabel(meshes, "Typhlosole (Increases SA)", 0x16a34a, new THREE.Vector3(-3.5, -1.5, -2), typhlosole.position);
        } else if (view === "excretory") {
          // Nephridia (segment-wise)
          for (let i = 0; i < 6; i++) {
            const nephridium = push(new THREE.Mesh(
              new THREE.TubeGeometry(
                new THREE.CatmullRomCurve3([
                  new THREE.Vector3(-2 + i * 0.8, bodyY + 0.2, 0),
                  new THREE.Vector3(-2 + i * 0.8, bodyY, 0.2),
                  new THREE.Vector3(-2 + i * 0.8, bodyY - 0.2, 0),
                ]), 4, 0.03, 6, false
              ),
              new THREE.MeshPhongMaterial({ color: 0x22d3ee }),
            ));
            // Simplified: just use capsules
            const neph = push(new THREE.Mesh(
              new THREE.CapsuleGeometry(0.04, 0.2, 4, 6),
              new THREE.MeshPhongMaterial({ color: 0x22d3ee }),
            ));
            neph.position.set(-2 + i * 0.8, bodyY + 0.15, 0);
          }
          // Nephridiopores
          for (let i = 0; i < 5; i++) {
            const pore = push(new THREE.Mesh(
              new THREE.SphereGeometry(0.04, 6, 4),
              new THREE.MeshPhongMaterial({ color: 0x38bdf8 }),
            ));
            pore.position.set(-1.6 + i * 0.8, bodyY - 0.35, 0.3);
          }
          // Collecting chamber
          const chamber = push(new THREE.Mesh(
            new THREE.SphereGeometry(0.08, 8, 6),
            new THREE.MeshPhongMaterial({ color: 0xfbbf24 }),
          ));
          chamber.position.set(0, bodyY + 0.2, 0);

          push(mkSprite("Earthworm — Excretory System (Metanephridia)", "#fbbf24", new THREE.Vector3(0, 2.8, 0), 0.85));
          addLabel(meshes, "Nephridia (Segment-wise)", 0x22d3ee, new THREE.Vector3(-3.5, 1.5, 2), new THREE.Vector3(-1, bodyY + 0.15, 0));
          addLabel(meshes, "Nephridiopore", 0x38bdf8, new THREE.Vector3(3.5, -1, 2.5), new THREE.Vector3(1.2, bodyY - 0.35, 0.3));
          addLabel(meshes, "Collecting Chamber", 0xfbbf24, new THREE.Vector3(-3.5, -1.5, -2), chamber.position);
        } else {
          // Nervous system
          // Cerebral ganglia (brain)
          const brain = push(new THREE.Mesh(
            new THREE.SphereGeometry(0.15, 10, 8),
            new THREE.MeshPhongMaterial({ color: 0xa78bfa }),
          ));
          brain.position.set(-2.8, bodyY + 0.2, 0);
          // Periesophageal connectives
          const conn1 = push(new THREE.Mesh(
            new THREE.CylinderGeometry(0.03, 0.03, 0.3, 6),
            new THREE.MeshPhongMaterial({ color: 0x8b5cf6 }),
          ));
          conn1.position.set(-2.8, bodyY, 0);
          conn1.rotation.z = Math.PI / 2;
          // Sub-pharyngeal ganglion
          const subGang = push(new THREE.Mesh(
            new THREE.SphereGeometry(0.1, 8, 6),
            new THREE.MeshPhongMaterial({ color: 0x7c3aed }),
          ));
          subGang.position.set(-2.8, bodyY - 0.25, 0);
          // Ventral nerve cord
          const nerveCord = push(new THREE.Mesh(
            new THREE.CylinderGeometry(0.03, 0.03, 4.5, 6),
            new THREE.MeshPhongMaterial({ color: 0x6d28d9 }),
          ));
          nerveCord.position.set(-0.5, bodyY - 0.25, 0);
          // Segmental ganglia
          for (let i = 0; i < 7; i++) {
            const sg = push(new THREE.Mesh(
              new THREE.SphereGeometry(0.06, 6, 4),
              new THREE.MeshPhongMaterial({ color: 0x8b5cf6 }),
            ));
            sg.position.set(-2 + i * 0.7, bodyY - 0.25, 0);
          }

          push(mkSprite("Earthworm — Nervous System", "#fbbf24", new THREE.Vector3(0, 2.8, 0), 0.85));
          addLabel(meshes, "Cerebral Ganglia (Brain)", 0xa78bfa, new THREE.Vector3(-3.5, 2, 2), brain.position);
          addLabel(meshes, "Periesophageal Connectives", 0x8b5cf6, new THREE.Vector3(-3.5, 1, -2), conn1.position);
          addLabel(meshes, "Sub-pharyngeal Ganglion", 0x7c3aed, new THREE.Vector3(-3.5, -0.5, 2), subGang.position);
          addLabel(meshes, "Ventral Nerve Cord", 0x6d28d9, new THREE.Vector3(3.5, -1, -2), nerveCord.position);
          addLabel(meshes, "Segmental Ganglia", 0x8b5cf6, new THREE.Vector3(3.5, 0.5, 2), new THREE.Vector3(1, bodyY - 0.25, 0));
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
    return <WebGLFallback title="Earthworm Anatomy" description="3D earthworm system diagrams." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Earthworm — Pheretima Posthuma</span>
          <span className="text-xs text-muted-foreground font-normal">Select system to view</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="System View">
          <div className="flex flex-wrap gap-2 mt-2">
            {(["external", "digestive", "excretory", "nervous"] as const).map((v) => (
              <button key={v} onClick={() => setView(v)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  view === v ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}>
                {v === "external" ? "External" : v === "digestive" ? "Digestive" : v === "excretory" ? "Excretory" : "Nervous"}
              </button>
            ))}
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Body plan:</strong> Metamerically segmented; 100+ segments; clitellum present in sexually mature individuals.</p>
            <p><strong className="text-foreground">Digestive tract:</strong> Mouth → pharynx → oesophagus → crop → gizzard → intestine → anus. Typhlosole increases absorptive area.</p>
            <p><strong className="text-foreground">Excretion:</strong> Metanephridia in each segment (except first few); remove waste through nephridiopores.</p>
            <p><strong className="text-foreground">Nervous system:</strong> Pair of cerebral ganglia (brain) + ventral nerve cord with segmental ganglia.</p>
            <p><strong className="text-foreground">Setae:</strong> Chitinous bristles on each segment for locomotion.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
