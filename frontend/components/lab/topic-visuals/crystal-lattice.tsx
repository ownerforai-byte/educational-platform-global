"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallback } from "@/components/lab/webgl-fallback";
import * as THREE from "three";

/* ============================================================
   Crystal Lattice — Unit Cells (SC, BCC, FCC)
   NEB Chemistry 11 — Solid State
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

type LatticeType = "sc" | "bcc" | "fcc";

export function CrystalLatticeVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lattice, setLattice] = useState<LatticeType>("fcc");
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
      camera.position.set(5, 5, 7);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.5;
      controls.minDistance = 3;
      controls.maxDistance = 20;

      scene.add(new THREE.AmbientLight(0xffffff, 0.7));
      const dir = new THREE.DirectionalLight(0xffffff, 1.0);
      dir.position.set(6, 10, 6);
      scene.add(dir);

      const push = <T extends THREE.Object3D>(o: T): T => { scene.add(o); meshes.push(o); return o; };

      const updateScene = () => {
        while (meshes.length > 6) {
          const m = meshes.pop()!;
          scene.remove(m);
          if (m instanceof THREE.Mesh) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Sprite) { (m.material as THREE.SpriteMaterial).map?.dispose?.(); m.material.dispose(); }
          else if (m instanceof THREE.Line) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
        }

        const a = 2.0; // unit cell edge length
        const r = 0.2; // atom radius

        // Wireframe cube
        const edges = [
          [[0,0,0],[a,0,0]],[[0,0,0],[0,a,0]],[[0,0,0],[0,0,a]],
          [[a,0,0],[a,a,0]],[[a,0,0],[a,0,a]],
          [[0,a,0],[a,a,0]],[[0,a,0],[0,a,a]],
          [[0,0,a],[a,0,a]],[[0,0,a],[0,a,a]],
          [[a,a,0],[a,a,a]],[[a,0,a],[a,a,a]],[[0,a,a],[a,a,a]],
        ];
        edges.forEach(([from, to]) => {
          push(new THREE.Line(
            new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(...from), new THREE.Vector3(...to)]),
            new THREE.LineBasicMaterial({ color: 0x475569, transparent: true, opacity: 0.7 }),
          ));
        });

        const atomPositions: THREE.Vector3[] = [];
        let atomType = "";
        let packingEff = "";
        let cn = "";

        if (lattice === "sc") {
          // Simple Cubic: atoms at 8 corners
          [[0,0,0],[a,0,0],[0,a,0],[0,0,a],[a,a,0],[a,0,a],[0,a,a],[a,a,a]].forEach((p) => {
            atomPositions.push(new THREE.Vector3(p[0], p[1], p[2]));
          });
          atomType = "Simple Cubic (SC)";
          packingEff = "52%";
          cn = "6";
        } else if (lattice === "bcc") {
          // Body-Centered Cubic
          [[0,0,0],[a,0,0],[0,a,0],[0,0,a],[a,a,0],[a,0,a],[0,a,a],[a,a,a]].forEach((p) => {
            atomPositions.push(new THREE.Vector3(p[0], p[1], p[2]));
          });
          atomPositions.push(new THREE.Vector3(a/2, a/2, a/2));
          atomType = "Body-Centered Cubic (BCC)";
          packingEff = "68%";
          cn = "8";
        } else if (lattice === "fcc") {
          // Face-Centered Cubic
          [[0,0,0],[a,0,0],[0,a,0],[0,0,a],[a,a,0],[a,0,a],[0,a,a],[a,a,a]].forEach((p) => {
            atomPositions.push(new THREE.Vector3(p[0], p[1], p[2]));
          });
          [[a/2,a/2,0],[a/2,0,a/2],[0,a/2,a/2],[a/2,a/2,a],[a/2,a,a/2],[a,a/2,a/2]].forEach((p) => {
            atomPositions.push(new THREE.Vector3(p[0], p[1], p[2]));
          });
          atomType = "Face-Centered Cubic (FCC)";
          packingEff = "74%";
          cn = "12";
        }

        // Draw atoms
        atomPositions.forEach((pos, i) => {
          const isCorner = i < 8;
          const color = isCorner ? 0x3b82f6 : 0x22c55e;
          const sphere = push(new THREE.Mesh(
            new THREE.SphereGeometry(r, 16, 16),
            new THREE.MeshPhongMaterial({ color, emissive: color, emissiveIntensity: 0.2 }),
          ));
          sphere.position.copy(pos);
        });

        // Long arrow labels for key features
        if (lattice === "fcc") {
          // Face-centered atom label
          const fcPos = new THREE.Vector3(a/2, a/2, 0);
          const labelPos = new THREE.Vector3(a/2 + 2, a/2 + 1.5, 0);
          const dir = fcPos.clone().sub(labelPos).normalize();
          const arrowLen = labelPos.distanceTo(fcPos);
          push(new THREE.ArrowHelper(dir, labelPos, arrowLen * 0.85, 0x22c55e, 0.28, 0.12));
          push(mkSprite("Face-centered atom (green)", "#22c55e", labelPos.clone().sub(dir.multiplyScalar(0.5)), 0.7));

          // Corner atom label
          const cornerPos = new THREE.Vector3(0, 0, 0);
          const cLabelPos = new THREE.Vector3(-2.5, -1.5, 0);
          const cDir = cornerPos.clone().sub(cLabelPos).normalize();
          const cArrowLen = cLabelPos.distanceTo(cornerPos);
          push(new THREE.ArrowHelper(cDir, cLabelPos, cArrowLen * 0.85, 0x3b82f6, 0.28, 0.12));
          push(mkSprite("Corner atom (blue)", "#3b82f6", cLabelPos.clone().sub(cDir.multiplyScalar(0.5)), 0.7));
        }

        // Info label
        push(mkSprite(`${atomType}  |  Packing: ${packingEff}  |  CN: ${cn}`, "#fbbf24", new THREE.Vector3(0, -2.0, 0), 0.7));

        // For ionic lattices, add ion labels
        if (lattice === "fcc") {
          const labelPos2 = new THREE.Vector3(3, 3, 0);
          const targetPos2 = new THREE.Vector3(a, a, a);
          const dir2 = targetPos2.clone().sub(labelPos2).normalize();
          const arrowLen2 = labelPos2.distanceTo(targetPos2);
          push(new THREE.ArrowHelper(dir2, labelPos2, arrowLen2 * 0.8, 0xf97316, 0.25, 0.12));
          push(mkSprite("Unit cell edge = a (lattice parameter)", "#f97316", labelPos2.clone().sub(dir2.multiplyScalar(0.5)), 0.65));
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
  }, [lattice, isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="Crystal Lattice" description="Unit cell visualization — requires WebGL." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Crystal Lattice — Unit Cells (SC, BCC, FCC)</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate · Scroll to zoom</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Unit Cell Type">
          <Tabs value={lattice} onValueChange={(v) => setLattice(v as LatticeType)} className="mt-1">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="sc" className="text-xs">Simple Cubic</TabsTrigger>
              <TabsTrigger value="bcc" className="text-xs">Body-Centered</TabsTrigger>
              <TabsTrigger value="fcc" className="text-xs">Face-Centered</TabsTrigger>
            </TabsList>
          </Tabs>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-violet-500/30 bg-violet-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-violet-400">Unit Cell Properties</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Simple Cubic (SC):</strong> Atoms at 8 corners. Atoms/cell = 1. Packing = 52%. CN = 6. Example: Po.</p>
            <p><strong className="text-foreground">Body-Centered Cubic (BCC):</strong> Atoms at corners + body center. Atoms/cell = 2. Packing = 68%. CN = 8. Example: Fe, Na.</p>
            <p><strong className="text-foreground">Face-Centered Cubic (FCC):</strong> Atoms at corners + face centers. Atoms/cell = 4. Packing = 74%. CN = 12. Example: Cu, Al, Au.</p>
            <p><strong className="text-foreground">Coordination Number (CN):</strong> Number of nearest neighbor atoms touching a given atom.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
