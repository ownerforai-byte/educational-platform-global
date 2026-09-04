"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallback } from "@/components/lab/webgl-fallback";
import * as THREE from "three";
import { LiveArrow } from "@/components/lab/animated-arrow-helper";

/* ============================================================
   Protein Structure — Primary to Quaternary with Peptide Bonds
   NEB Chemistry 12 — Biomolecules
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

type ProteinLevel = "primary" | "secondary" | "tertiary" | "quaternary";

export function ProteinStructureVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [level, setLevel] = useState<ProteinLevel>("primary");
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
      camera.position.set(0, 2, 10);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.3;
      controls.minDistance = 3;
      controls.maxDistance = 20;

      scene.add(new THREE.AmbientLight(0xffffff, 0.7));
      const dir = new THREE.DirectionalLight(0xffffff, 1.0);
      dir.position.set(6, 10, 6);
      scene.add(dir);

      const push = <T extends THREE.Object3D>(o: T): T => { scene.add(o); meshes.push(o); return o; };

      const updateScene = () => {
        while (meshes.length > 10) {
          const m = meshes.pop()!;
          scene.remove(m);
          if (m instanceof THREE.Mesh) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Sprite) { (m.material as THREE.SpriteMaterial).map?.dispose?.(); m.material.dispose(); }
          else if (m instanceof THREE.Line) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
        }

        const aa = ["Gly", "Ala", "Val", "Leu", "Ser", "Thr"];
        const colors = [0x3b82f6, 0x22c55e, 0xf97316, 0xef4444, 0xa855f7, 0x22d3ee];

        if (level === "primary") {
          // Linear chain of amino acids
          const spacing = 1.2;
          aa.forEach((aaName, i) => {
            const x = (i - (aa.length - 1) / 2) * spacing;
            const sphere = push(new THREE.Mesh(
              new THREE.SphereGeometry(0.25, 12, 12),
              new THREE.MeshPhongMaterial({ color: colors[i], emissive: colors[i], emissiveIntensity: 0.2 }),
            ));
            sphere.position.set(x, 0, 0);

            // Amino acid label
            push(mkSprite(aaName, `#${colors[i].toString(16).padStart(6, "0")}`, new THREE.Vector3(x, 0.6, 0), 0.55));

            // Peptide bond indicator
            if (i < aa.length - 1) {
              const nextX = (i + 1 - (aa.length - 1) / 2) * spacing;
              push(new THREE.Line(
                new THREE.BufferGeometry().setFromPoints([
                  new THREE.Vector3(x + 0.25, 0, 0),
                  new THREE.Vector3(nextX - 0.25, 0, 0),
                ]),
                new THREE.LineBasicMaterial({ color: 0xfbbf24 }),
              ));
              // Peptide bond label
              const midX = (x + nextX) / 2;
              const pbLabel = new THREE.Vector3(midX, 0.9, 0);
              const pbTarget = new THREE.Vector3(midX, 0, 0);
              const pbDir = pbTarget.clone().sub(pbLabel).normalize();
              const pbLen = pbLabel.distanceTo(pbTarget);
              push(new LiveArrow(pbDir, pbLabel, pbLen * 0.7, 0xfbbf24, 0.25, 0.12));
              push(mkSprite("Peptide bond (—CO—NH—)", "#fbbf24", pbLabel.clone().sub(pbDir.multiplyScalar(0.5)), 0.6));
            }
          });

          // N-terminal and C-terminal labels
          push(mkSprite("N-terminus (NH₂)", "#7dd3fc", new THREE.Vector3(-4, -0.8, 0), 0.55));
          push(mkSprite("C-terminus (COOH)", "#fb923c", new THREE.Vector3(4, -0.8, 0), 0.55));
        }
        else if (level === "secondary") {
          // Alpha helix (simplified)
          const turns = 3;
          const residues = 12;
          for (let i = 0; i < residues; i++) {
            const angle = (i / residues) * turns * Math.PI * 2;
            const y = (i / residues) * 4 - 2;
            const r = 0.8;
            const x = Math.cos(angle) * r;
            const z = Math.sin(angle) * r;
            const sphere = push(new THREE.Mesh(
              new THREE.SphereGeometry(0.18, 12, 12),
              new THREE.MeshPhongMaterial({ color: colors[i % colors.length], emissive: colors[i % colors.length], emissiveIntensity: 0.2 }),
            ));
            sphere.position.set(x, y, z);
          }

          // Backbone helix line
          const helixPts: THREE.Vector3[] = [];
          for (let i = 0; i <= 60; i++) {
            const angle = (i / 60) * turns * Math.PI * 2;
            const y = (i / 60) * 4 - 2;
            helixPts.push(new THREE.Vector3(Math.cos(angle) * 0.8, y, Math.sin(angle) * 0.8));
          }
          push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(helixPts), new THREE.LineBasicMaterial({ color: 0x94a3b8 })));

          // Hydrogen bonds (dashed)
          for (let i = 0; i < residues - 4; i++) {
            const angle1 = (i / residues) * turns * Math.PI * 2;
            const y1 = (i / residues) * 4 - 2;
            const angle2 = ((i + 4) / residues) * turns * Math.PI * 2;
            const y2 = (i + 4 / residues) * 4 - 2;
            push(new THREE.Line(
              new THREE.BufferGeometry().setFromPoints([
                new THREE.Vector3(Math.cos(angle1) * 0.8, y1, Math.sin(angle1) * 0.8),
                new THREE.Vector3(Math.cos(angle2) * 0.8, y2, Math.sin(angle2) * 0.8),
              ]),
              new THREE.LineDashedMaterial({ color: 0x22c55e, dashSize: 0.1, gapSize: 0.08 }),
            ) as any);
            ((meshes[meshes.length - 1] as any) as THREE.Line).computeLineDistances();
          }

          // Labels
          const hBondLabel = new THREE.Vector3(2.0, 0.5, 0);
          const hBondTarget = new THREE.Vector3(0.5, 0.5, 0);
          const hbDir = hBondTarget.clone().sub(hBondLabel).normalize();
          const hbLen = hBondLabel.distanceTo(hBondTarget);
          push(new LiveArrow(hbDir, hBondLabel, hbLen * 0.7, 0x22c55e, 0.25, 0.12));
          push(mkSprite("H-bond: C=O···H-N (4 residues apart)", "#22c55e", hBondLabel.clone().sub(hbDir.multiplyScalar(0.5)), 0.65));

          push(mkSprite("α-helix: right-handed, 3.6 residues/turn", "#fbbf24", new THREE.Vector3(0, -2.8, 0), 0.65));
        }
        else if (level === "tertiary") {
          // 3D folded globular structure
          const foldPath = [
            new THREE.Vector3(-2, 1.5, 0.5),
            new THREE.Vector3(-1, 0.5, -0.5),
            new THREE.Vector3(0, 1.0, 0.8),
            new THREE.Vector3(1, -0.5, -0.3),
            new THREE.Vector3(0.5, -1.5, 0.5),
            new THREE.Vector3(-0.5, -1.0, -0.8),
            new THREE.Vector3(-1.5, 0.0, 0.3),
          ];

          foldPath.forEach((pos, i) => {
            const sphere = push(new THREE.Mesh(
              new THREE.SphereGeometry(0.2, 12, 12),
              new THREE.MeshPhongMaterial({ color: colors[i % colors.length], emissive: colors[i % colors.length], emissiveIntensity: 0.2 }),
            ));
            sphere.position.copy(pos);
          });

          // Backbone
          for (let i = 0; i < foldPath.length - 1; i++) {
            push(new THREE.Line(
              new THREE.BufferGeometry().setFromPoints([foldPath[i], foldPath[i + 1]]),
              new THREE.LineBasicMaterial({ color: 0x94a3b8 }),
            ));
          }

          // Side chain interactions (dashed)
          push(new THREE.Line(
            new THREE.BufferGeometry().setFromPoints([foldPath[0], foldPath[4]]),
            new THREE.LineDashedMaterial({ color: 0xfbbf24, dashSize: 0.12, gapSize: 0.08 }),
          ) as any);
          ((meshes[meshes.length - 1] as any) as THREE.Line).computeLineDistances();

          const disulfideLabel = new THREE.Vector3(2.0, 0.5, 0);
          const disulfideTarget = new THREE.Vector3(-0.75, 0.0, 0.15);
          const dsDir = disulfideTarget.clone().sub(disulfideLabel).normalize();
          const dsLen = disulfideLabel.distanceTo(disulfideTarget);
          push(new LiveArrow(dsDir, disulfideLabel, dsLen * 0.6, 0xfbbf24, 0.25, 0.12));
          push(mkSprite("Disulfide bridge (S-S) stabilizes tertiary structure", "#fbbf24", disulfideLabel.clone().sub(dsDir.multiplyScalar(0.5)), 0.6));

          push(mkSprite("Tertiary: 3D folding via H-bonds, ionic, hydrophobic, disulfide", "#7dd3fc", new THREE.Vector3(0, -2.8, 0), 0.6));
        }
        else if (level === "quaternary") {
          // Multiple subunits
          const subunits = [
            { center: new THREE.Vector3(-1.2, 0, 0), color: 0x3b82f6, name: "α" },
            { center: new THREE.Vector3(1.2, 0, 0), color: 0xef4444, name: "β" },
            { center: new THREE.Vector3(0, 1.2, 0), color: 0x22c55e, name: "γ" },
            { center: new THREE.Vector3(0, -1.2, 0), color: 0xf97316, name: "δ" },
          ];

          subunits.forEach((sub) => {
            const sphere = push(new THREE.Mesh(
              new THREE.SphereGeometry(0.6, 16, 16),
              new THREE.MeshPhongMaterial({ color: sub.color, emissive: sub.color, emissiveIntensity: 0.15, transparent: true, opacity: 0.7 }),
            ));
            sphere.position.copy(sub.center);
            push(mkSprite(sub.name + " subunit", `#${sub.color.toString(16).padStart(6, "0")}`, sub.center.clone().add(new THREE.Vector3(0, 0.9, 0)), 0.6));
          });

          // Interaction lines between subunits
          for (let i = 0; i < subunits.length; i++) {
            for (let j = i + 1; j < subunits.length; j++) {
              const dist = subunits[i].center.distanceTo(subunits[j].center);
              if (dist < 3.0) {
                push(new THREE.Line(
                  new THREE.BufferGeometry().setFromPoints([subunits[i].center, subunits[j].center]),
                  new THREE.LineDashedMaterial({ color: 0xfbbf24, dashSize: 0.1, gapSize: 0.06 }),
                ) as any);
                ((meshes[meshes.length - 1] as any) as THREE.Line).computeLineDistances();
              }
            }
          }

          // Label for quaternary interactions
          const qLabel = new THREE.Vector3(2.5, 2.0, 0);
          const qTarget = new THREE.Vector3(0, 0, 0);
          const qDir = qTarget.clone().sub(qLabel).normalize();
          const qLen = qLabel.distanceTo(qTarget);
          push(new LiveArrow(qDir, qLabel, qLen * 0.7, 0xa855f7, 0.25, 0.12));
          push(mkSprite("Subunit interactions: H-bonds, ionic, hydrophobic", "#a855f7", qLabel.clone().sub(qDir.multiplyScalar(0.5)), 0.65));
        }
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
  }, [level, isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="Protein Structure" description="Protein folding levels — requires WebGL." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Protein Structure — Primary to Quaternary</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate · Scroll to zoom</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Structural Level">
          <div className="flex flex-wrap gap-2 mt-1">
            {([
              { v: "primary" as const, l: "Primary" },
              { v: "secondary" as const, l: "Secondary" },
              { v: "tertiary" as const, l: "Tertiary" },
              { v: "quaternary" as const, l: "Quaternary" },
            ]).map((lv) => (
              <button
                key={lv.v}
                onClick={() => setLevel(lv.v)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  level === lv.v ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {lv.l}
              </button>
            ))}
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-pink-500/30 bg-pink-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-pink-400">Protein Structure Levels</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Primary:</strong> Linear sequence of amino acids linked by peptide bonds (—CO—NH—).</p>
            <p><strong className="text-foreground">Secondary:</strong> Local folding into α-helix or β-pleated sheet via hydrogen bonds between backbone atoms.</p>
            <p><strong className="text-foreground">Tertiary:</strong> 3D globular shape stabilized by H-bonds, ionic bonds, hydrophobic interactions, disulfide bridges (S-S).</p>
            <p><strong className="text-foreground">Quaternary:</strong> Assembly of multiple polypeptide subunits (e.g., hemoglobin: 2α + 2β).</p>
            <p><strong className="text-foreground">Denaturation:</strong> Loss of 3D structure (and function) due to heat, pH change, or chemicals — primary structure remains intact.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
