"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallback } from "@/components/lab/webgl-fallback";
import * as THREE from "three";
import { LiveArrow } from "@/components/lab/animated-arrow-helper";

/* ============================================================
   DNA Structure — NEB Biology 12 (Heredity & Evolution)
   Double helix with base pair labels: A-T, G-C, sugar-phosphate backbone.
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

export function DNAStructureVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotationSpeed, setRotationSpeed] = useState(0.5);
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
      controls.autoRotate = true;
      controls.autoRotateSpeed = rotationSpeed;
      controls.minDistance = 4;
      controls.maxDistance = 20;

      scene.add(new THREE.AmbientLight(0xffffff, 0.7));
      const dl = new THREE.DirectionalLight(0xffffff, 0.9);
      dl.position.set(4, 6, 4);
      scene.add(dl);

      const push = <T extends THREE.Object3D>(o: T): T => { scene.add(o); meshes.push(o); return o; };

      // Base pair colors
      const BASE_COLORS = { A: 0xef4444, T: 0x22d3ee, G: 0x22c55e, C: 0xfbbf24 };
      const BASE_PAIRS = [
        { left: "A", right: "T" }, { left: "G", right: "C" },
        { left: "T", right: "A" }, { left: "C", right: "G" },
        { left: "A", right: "T" }, { left: "G", right: "C" },
        { left: "T", right: "A" }, { left: "C", right: "G" },
        { left: "A", right: "T" }, { left: "G", right: "C" },
        { left: "T", right: "A" }, { left: "C", right: "G" },
        { left: "A", right: "T" }, { left: "G", right: "C" },
        { left: "T", right: "A" }, { left: "C", right: "G" },
        { left: "A", right: "T" }, { left: "G", right: "C" },
        { left: "T", right: "A" }, { left: "C", right: "G" },
        { left: "A", right: "T" }, { left: "G", right: "C" },
      ];

      const pairsPerSide = 10;
      const totalPairs = BASE_PAIRS.length;

      // Create backbone and base pairs
      for (let i = 0; i < totalPairs; i++) {
        const t = i / totalPairs;
        const angle = t * Math.PI * 4;
        const y = (t - 0.5) * 6;

        // Left backbone strand
        const lx = Math.cos(angle) * 1.2;
        const lz = Math.sin(angle) * 1.2;
        const leftPos = new THREE.Vector3(lx, y, lz);

        // Right backbone strand
        const rx = Math.cos(angle + Math.PI) * 1.2;
        const rz = Math.sin(angle + Math.PI) * 1.2;
        const rightPos = new THREE.Vector3(rx, y, rz);

        // Backbone sphere (sugar-phosphate)
        const backbone = push(new THREE.Mesh(
          new THREE.SphereGeometry(0.1, 8, 6),
          new THREE.MeshPhongMaterial({ color: 0x94a3b8 }),
        ));
        backbone.position.copy(leftPos);
        const backbone2 = push(new THREE.Mesh(
          new THREE.SphereGeometry(0.1, 8, 6),
          new THREE.MeshPhongMaterial({ color: 0x94a3b8 }),
        ));
        backbone2.position.copy(rightPos);

        // Connecting backbone tube segment
        const nextT = (i + 1) / totalPairs;
        const nextAngle = nextT * Math.PI * 4;
        const nextY = (nextT - 0.5) * 6;
        const nlx = Math.cos(nextAngle) * 1.2;
        const nlz = Math.sin(nextAngle) * 1.2;
        const nrx = Math.cos(nextAngle + Math.PI) * 1.2;
        const nrz = Math.sin(nextAngle + Math.PI) * 1.2;
        const nextLeft = new THREE.Vector3(nlx, nextY, nlz);
        const nextRight = new THREE.Vector3(nrx, nextY, nrz);

        // Left backbone segment
        const lLine = push(new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([leftPos, nextLeft]),
          new THREE.LineBasicMaterial({ color: 0x64748b, linewidth: 2 }),
        ));
        // Right backbone segment
        const rLine = push(new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([rightPos, nextRight]),
          new THREE.LineBasicMaterial({ color: 0x64748b, linewidth: 2 }),
        ));

        // Base pair rungs
        const bp = BASE_PAIRS[i];
        const baseColorL = BASE_COLORS[bp.left as keyof typeof BASE_COLORS];
        const baseColorR = BASE_COLORS[bp.right as keyof typeof BASE_COLORS];

        // Left base
        const baseL = push(new THREE.Mesh(
          new THREE.BoxGeometry(0.5, 0.12, 0.2),
          new THREE.MeshPhongMaterial({ color: baseColorL }),
        ));
        baseL.position.set(leftPos.x + (rightPos.x - leftPos.x) * 0.25, leftPos.y, leftPos.z + (rightPos.z - leftPos.z) * 0.25);

        // Right base
        const baseR = push(new THREE.Mesh(
          new THREE.BoxGeometry(0.5, 0.12, 0.2),
          new THREE.MeshPhongMaterial({ color: baseColorR }),
        ));
        baseR.position.set(leftPos.x + (rightPos.x - leftPos.x) * 0.75, rightPos.y, rightPos.z + (rightPos.z - leftPos.z) * 0.75);

        // Hydrogen bond (dashed)
        const midPoint = leftPos.clone().add(rightPos).multiplyScalar(0.5);
        const hbond = push(new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([baseL.position, baseR.position]),
          new THREE.LineDashedMaterial({ color: 0xfbbf24, dashSize: 0.08, gapSize: 0.06 }),
        ) as any);
        (hbond as any).computeLineDistances();
      }

      // Add periodic labels
      const labelInterval = Math.floor(totalPairs / 4);
      for (let i = 0; i < totalPairs; i += labelInterval) {
        const t = i / totalPairs;
        const angle = t * Math.PI * 4;
        const y = (t - 0.5) * 6;
        const lx = Math.cos(angle) * 1.2;
        const lz = Math.sin(angle) * 1.2;
        const bp = BASE_PAIRS[i];

        // Label one base pair
        const labelPos = new THREE.Vector3(lx + 1.5, y, lz);
        const targetPos = new THREE.Vector3(lx, y, lz);
        addLabel(meshes, `${bp.left}=${bp.right}`, BASE_COLORS[bp.left as keyof typeof BASE_COLORS], labelPos, targetPos);
      }

      // Backbone label
      addLabel(meshes, "Sugar-Phosphate Backbone", 0x94a3b8,
        new THREE.Vector3(2.5, 2.5, 2),
        new THREE.Vector3(Math.cos(Math.PI * 2) * 1.2, 2, Math.sin(Math.PI * 2) * 1.2));
      addLabel(meshes, "Complementary Base Pairs\n(A=T, G≡C)", 0xfbbf24,
        new THREE.Vector3(-3.5, 0, 2.5),
        new THREE.Vector3(0, 0, 0));
      addLabel(meshes, "Hydrogen Bonds", 0xfbbf24,
        new THREE.Vector3(2.5, -2, -2),
        new THREE.Vector3(0, -2, 0));

      push(mkSprite("DNA — Double Helix Structure", "#fbbf24", new THREE.Vector3(0, 4.0, 0), 0.85));

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
          else if (m instanceof THREE.ArrowHelper) m.dispose();
        });
        renderer.dispose();
        controls.dispose?.();
      };
    };

    const cleanup = init();
    return () => { cleanup.then((d) => d?.()); };
  }, [rotationSpeed, isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="DNA Structure" description="3D double helix with base pair annotations." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>DNA — Double Helix Structure</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate · Auto-rotates</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Rotation Speed">
          <div className="flex gap-3 mt-2">
            <div className="w-24">
              <input type="range" min={0} max={3} step={0.1} value={rotationSpeed}
                onChange={(e) => setRotationSpeed(Number(e.target.value))} className="w-full mt-1" />
              <p className="text-xs font-mono text-primary mt-1">{rotationSpeed.toFixed(1)}x</p>
            </div>
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Double helix:</strong> Two antiparallel strands winding around a common axis — Watson & Crick model (1953).</p>
            <p><strong className="text-foreground">Sugar-phosphate backbone:</strong> Deoxyribose sugar + phosphate groups form the structural framework of each strand.</p>
            <p><strong className="text-foreground">Base pairing:</strong> Adenine (A) pairs with Thymine (T) via 2 hydrogen bonds; Guanine (G) pairs with Cytosine (C) via 3 hydrogen bonds.</p>
            <p><strong className="text-foreground">Antiparallel:</strong> One strand runs 5'→3', the other 3'→5'.</p>
            <p><strong className="text-foreground">Complementarity:</strong> Each strand serves as a template for replication and transcription.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
