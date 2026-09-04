"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallback } from "@/components/lab/webgl-fallback";
import * as THREE from "three";

/* ============================================================
   Benzene Ring — Resonance Structure with Electron Arrows
   NEB Chemistry 11 — Aromatic Hydrocarbons
   ============================================================ */

function mkSprite(text: string, color: string, pos: THREE.Vector3, scale = 1.0): THREE.Sprite {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 96;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "rgba(15, 23, 42, 0.9)";
  ctx.fillRect(4, 4, 504, 88);
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.strokeRect(4, 4, 504, 88);
  ctx.font = "bold 28px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = color;
  ctx.fillText(text, 256, 48);
  const tex = new THREE.CanvasTexture(canvas);
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false }));
  s.position.copy(pos);
  s.scale.set(3.4 * scale, 0.64 * scale, 1);
  return s;
}

export function BenzeneRingVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [resonance, setResonance] = useState(0);
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
      camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
      camera.position.set(0, 0, 9);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.autoRotate = false;
      controls.minDistance = 3;
      controls.maxDistance = 20;

      scene.add(new THREE.AmbientLight(0xffffff, 0.8));
      const dir = new THREE.DirectionalLight(0xffffff, 1.0);
      dir.position.set(4, 8, 6);
      scene.add(dir);

      const push = <T extends THREE.Object3D>(o: T): T => { scene.add(o); meshes.push(o); return o; };

      const R = 1.4; // ring radius
      const angles = Array.from({ length: 6 }, (_, i) => (i * 60 - 90) * Math.PI / 180);
      const Cpos = angles.map((a) => new THREE.Vector3(Math.cos(a) * R, Math.sin(a) * R, 0));

      const updateScene = () => {
        while (meshes.length > 12) {
          const m = meshes.pop()!;
          scene.remove(m);
          if (m instanceof THREE.Mesh) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Sprite) { (m.material as THREE.SpriteMaterial).map?.dispose?.(); m.material.dispose(); }
          else if (m instanceof THREE.Line) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
        }

        const C_COLOR = 0x374151;
        const H_COLOR = 0xf5f5f5;

        // Carbon atoms
        Cpos.forEach((pos, i) => {
          const sphere = push(new THREE.Mesh(
            new THREE.SphereGeometry(0.2, 14, 14),
            new THREE.MeshPhongMaterial({ color: C_COLOR, emissive: C_COLOR, emissiveIntensity: 0.2 }),
          ));
          sphere.position.copy(pos);
        });

        // Hydrogen atoms
        angles.forEach((a, i) => {
          const hPos = new THREE.Vector3(Math.cos(a) * (R + 0.7), Math.sin(a) * (R + 0.7), 0);
          const sphere = push(new THREE.Mesh(
            new THREE.SphereGeometry(0.14, 10, 10),
            new THREE.MeshPhongMaterial({ color: H_COLOR, emissive: H_COLOR, emissiveIntensity: 0.1 }),
          ));
          sphere.position.copy(hPos);
        });

        // Alternating double bonds based on resonance state
        const bondPhase = Math.floor(resonance * 2) % 2;
        for (let i = 0; i < 6; i++) {
          const isDouble = bondPhase === 0 ? i % 2 === 0 : i % 2 === 1;
          const from = Cpos[i];
          const to = Cpos[(i + 1) % 6];

          if (isDouble) {
            // Double bond
            const offset = new THREE.Vector3(0, 0, 0.08).applyQuaternion(controls?.quaternion ?? new THREE.Quaternion());
            const mid = from.clone().add(to).multiplyScalar(0.5);
            const dir = to.clone().sub(from).normalize();
            const perp = new THREE.Vector3(-dir.y, dir.x, 0).multiplyScalar(0.12);

            [perp, perp.clone().multiplyScalar(-1)].forEach((off) => {
              push(new THREE.Line(
                new THREE.BufferGeometry().setFromPoints([
                  from.clone().add(off), to.clone().add(off)
                ]),
                new THREE.LineBasicMaterial({ color: 0xf97316 }),
              ));
            });
          } else {
            // Single bond
            push(new THREE.Line(
              new THREE.BufferGeometry().setFromPoints([from, to]),
              new THREE.LineBasicMaterial({ color: 0x94a3b8 }),
            ));
          }
        }

        // Delocalized electron ring (circle through center)
        const ringPts: THREE.Vector3[] = [];
        for (let i = 0; i <= 64; i++) {
          const a = (i / 64) * Math.PI * 2;
          ringPts.push(new THREE.Vector3(Math.cos(a) * (R * 0.55), Math.sin(a) * (R * 0.55), 0));
        }
        push(new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(ringPts),
          new THREE.LineBasicMaterial({ color: 0xa855f7, transparent: true, opacity: 0.6 }),
        ));

        // Resonance arrows
        const labelPos1 = new THREE.Vector3(R + 2.0, 0, 0);
        const targetPos1 = new THREE.Vector3(R * 0.55, 0, 0);
        const dir1 = targetPos1.clone().sub(labelPos1).normalize();
        const arrowLen1 = labelPos1.distanceTo(targetPos1);
        push(new THREE.ArrowHelper(dir1, labelPos1, arrowLen1 * 0.8, 0xfbbf24, 0.28, 0.12));
        push(mkSprite("Delocalized π electrons (circle)", "#fbbf24", labelPos1.clone().sub(dir1.multiplyScalar(0.5)), 0.7));

        const labelPos2 = new THREE.Vector3(-R - 1.8, 0, 0);
        const targetPos2 = new THREE.Vector3(-R * 0.55, 0, 0);
        const dir2 = targetPos2.clone().sub(labelPos2).normalize();
        const arrowLen2 = labelPos2.distanceTo(targetPos2);
        push(new THREE.ArrowHelper(dir2, labelPos2, arrowLen2 * 0.8, 0x22d3ee, 0.28, 0.12));
        push(mkSprite("Resonance hybrid structure", "#22d3ee", labelPos2.clone().sub(dir2.multiplyScalar(0.5)), 0.7));

        // Carbon labels with arrows
        Cpos.forEach((pos, i) => {
          const lp = new THREE.Vector3(pos.x * 1.4, pos.y * 1.4, 0);
          const tp = pos.clone();
          const d = tp.clone().sub(lp).normalize();
          const al = lp.distanceTo(tp);
          push(new THREE.ArrowHelper(d, lp, al * 0.6, 0x374151, 0.15, 0.08));
          push(mkSprite(`C${i + 1}`, "#94a3b8", lp.clone().sub(d.multiplyScalar(0.4)), 0.45));
        });

        // Huckel's rule
        push(mkSprite("Hückel's Rule: 4n+2 π electrons → aromatic (n=1, 6e⁻)", "#a78bfa", new THREE.Vector3(0, -2.5, 0), 0.65));
      };

      updateScene();

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
          else if (m instanceof THREE.Line) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Sprite) { const sm = m.material; sm.map?.dispose?.(); sm.dispose(); }
        });
        renderer.dispose();
        controls.dispose?.();
      };
    };

    const cleanup = init();
    return () => { cleanup.then((d) => d?.()); };
  }, [resonance, isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="Benzene Ring" description="Resonance structure visualization — requires WebGL." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Benzene Ring — Resonance & Delocalization</span>
          <span className="text-xs text-muted-foreground font-normal">Toggle resonance structures</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Resonance Structure">
          <div className="flex gap-2 mt-1">
            <button
              onClick={() => setResonance(0)}
              className={`px-4 py-1.5 rounded-md text-xs font-medium transition-colors ${resonance === 0 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
            >
              Kekulé Structure I
            </button>
            <button
              onClick={() => setResonance(1)}
              className={`px-4 py-1.5 rounded-md text-xs font-medium transition-colors ${resonance === 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
            >
              Kekulé Structure II
            </button>
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-purple-500/30 bg-purple-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-purple-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Resonance:</strong> Benzene is a resonance hybrid of two Kekulé structures. The true structure has delocalized π electrons.</p>
            <p><strong className="text-foreground">Hückel's Rule:</strong> Aromatic compounds have (4n+2) π electrons in a planar, cyclic, conjugated system. Benzene: 6 π e⁻ (n=1).</p>
            <p><strong className="text-foreground">Bond lengths:</strong> All C-C bonds in benzene are equal (139 pm), intermediate between single (154 pm) and double (134 pm).</p>
            <p><strong className="text-foreground">Electrophilic substitution:</strong> Benzene undergoes substitution (not addition) to preserve aromaticity. Examples: nitration, halogenation, Friedel-Crafts.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
