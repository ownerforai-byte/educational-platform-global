"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallback } from "@/components/lab/webgl-fallback";
import * as THREE from "three";

/* ============================================================
   Coordinates in Space — NEB Analytic Geometry (Maths 11)
   Points in 3D, distance formula, direction cosines & ratios.
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
  ctx.font = "bold 34px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = color;
  ctx.fillText(text, 256, 48);
  const tex = new THREE.CanvasTexture(canvas);
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false }));
  s.position.copy(pos);
  s.scale.set(2.2 * scale, 0.41 * scale, 1);
  return s;
}

export function CoordinatesSpaceVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [p1, setP1] = useState({ x: 1, y: 2, z: 3 });
  const [p2, setP2] = useState({ x: 4, y: 1, z: 2 });
  const [isWebGL] = useState(() => isWebGLAvailable());


  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isWebGL) return;

    let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer;
    let controls: any;
    let frameId: number;
    let animTime = 0;
    const meshes: THREE.Object3D[] = [];
    let animDot: THREE.Mesh;

    const init = async () => {
      const { OrbitControls } = await import("three/addons/controls/OrbitControls.js");

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0f172a);
      camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
      camera.position.set(8, 7, 9);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.4;
      controls.minDistance = 4;
      controls.maxDistance = 25;

      scene.add(new THREE.AmbientLight(0xffffff, 0.6));
      const dir = new THREE.DirectionalLight(0xffffff, 1.0);
      dir.position.set(8, 12, 8);
      scene.add(dir);

      const push = <T extends THREE.Object3D>(o: T): T => { scene.add(o); meshes.push(o); return o; };

      const G = 6;
      const mkAxis = (from: THREE.Vector3, to: THREE.Vector3, color: number, label: string) => {
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([from, to]), new THREE.LineBasicMaterial({ color })));
        const c2 = push(new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.28, 8), new THREE.MeshBasicMaterial({ color })));
        c2.position.copy(to);
        c2.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), to.clone().sub(from).normalize());
        push(mkSprite(label, `#${color.toString(16).padStart(6, "0")}`, to.clone().multiplyScalar(1.1), 0.7));
      };
      mkAxis(new THREE.Vector3(-G - 1, 0, 0), new THREE.Vector3(G + 1, 0, 0), 0xef4444, "x");
      mkAxis(new THREE.Vector3(0, 0, -G - 1), new THREE.Vector3(0, 0, G + 1), 0x22c55e, "z");
      mkAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, G + 1, 0), 0x3b82f6, "y");

      push(new THREE.GridHelper(G * 2, G * 2, 0x334155, 0x1e293b));

      // World coords: math (x,y,z) -> world (x, z, y) so y is elevation
      const toWorld = (p: { x: number; y: number; z: number }) => new THREE.Vector3(p.x, p.z, p.y);

      const update = () => {
        // Clear dynamic meshes (last 20 are the dynamic ones)
        while (meshes.length > 18) {
          const m = meshes.pop()!;
          scene.remove(m);
          if (m instanceof THREE.Mesh) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Line) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Sprite) { (m.material as THREE.SpriteMaterial).map?.dispose?.(); m.material.dispose(); }
        }

        const A = toWorld(p1);
        const B = toWorld(p2);

        // Points
        const mkPt = (pos: THREE.Vector3, color: number, label: string) => {
          const s = push(new THREE.Mesh(new THREE.SphereGeometry(0.13, 12, 12), new THREE.MeshBasicMaterial({ color })));
          s.position.copy(pos);
          push(mkSprite(label, `#${color.toString(16).padStart(6, "0")}`, pos.clone().add(new THREE.Vector3(0.5, 0.5, 0)), 0.8));
        };
        mkPt(A, 0xef4444, `A(${p1.x}, ${p1.y}, ${p1.z})`);
        mkPt(B, 0x22c55e, `B(${p2.x}, ${p2.y}, ${p2.z})`);
        animDot = push(new THREE.Mesh(new THREE.SphereGeometry(0.2, 12, 12), new THREE.MeshBasicMaterial({ color: 0xf97316 }))) as THREE.Mesh;
        animDot.position.set(p1.x, p1.z, p1.y);

        // Line AB
        push(new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([A, B]),
          new THREE.LineBasicMaterial({ color: 0xf97316, linewidth: 3 }),
        ));

        // Projection lines (dashed)
        const mkDash = (from: THREE.Vector3, to: THREE.Vector3, color: number) => {
          const l = push(new THREE.Line(
            new THREE.BufferGeometry().setFromPoints([from, to]),
            new THREE.LineDashedMaterial({ color, dashSize: 0.15, gapSize: 0.1 }),
          ));
          l.computeLineDistances();
        };
        mkDash(A, new THREE.Vector3(A.x, 0, A.z), 0x64748b);
        mkDash(B, new THREE.Vector3(B.x, 0, B.z), 0x64748b);
        mkDash(new THREE.Vector3(A.x, 0, A.z), new THREE.Vector3(0, 0, 0), 0x475569);
        mkDash(new THREE.Vector3(B.x, 0, B.z), new THREE.Vector3(0, 0, 0), 0x475569);

        // Distance
        const dist = Math.sqrt(
          (p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2 + (p2.z - p1.z) ** 2,
        );
        push(mkSprite(
          `d = ${dist.toFixed(3)}`,
          "#22d3ee",
          A.clone().add(B).multiplyScalar(0.5).add(new THREE.Vector3(0.8, 0.8, 0)),
          1.0,
        ));

        // Direction cosines
        const dx = p2.x - p1.x, dy = p2.y - p1.y, dz = p2.z - p1.z;
        const lVal = Math.sqrt(dx * dx + dy * dy + dz * dz);
        const cosA = (dx / lVal).toFixed(3);
        const cosB = (dy / lVal).toFixed(3);
        const cosC = (dz / lVal).toFixed(3);
        push(mkSprite(
          `l:m:n = ${dx}:${dy}:${dz}   cos α=${cosA}  cos β=${cosB}  cos γ=${cosC}`,
          "#a78bfa",
          new THREE.Vector3(-5.5, 5.5, 0),
          0.9,
        ));
      };

      update();

      const animate = () => {
        frameId = requestAnimationFrame(animate);
        controls.update();
        animTime += 0.015;
        if (animDot) {
          const t = (Math.sin(animTime) + 1) / 2;
          animDot.position.x = p1.x + (p2.x - p1.x) * t;
          animDot.position.y = p1.y + (p2.y - p1.y) * t;
          animDot.position.z = p1.z + (p2.z - p1.z) * t;
        }
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
  }, [p1, p2, isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="Coordinates in Space" description="3D coordinate geometry — requires WebGL." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Coordinates in Space — Distance & Direction Cosines</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate · Scroll to zoom</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Point Coordinates">
          <div className="flex flex-wrap gap-4 mt-2">
            <div>
              <p className="text-xs font-semibold text-red-400 mb-1">Point A (red)</p>
              <div className="flex gap-2">
                <div className="w-16"><Label className="text-xs text-muted-foreground">x:</Label><Input type="number" step="0.5" value={p1.x} onChange={(e) => setP1({ ...p1, x: Number(e.target.value) })} className="mt-1" /></div>
                <div className="w-16"><Label className="text-xs text-muted-foreground">y:</Label><Input type="number" step="0.5" value={p1.y} onChange={(e) => setP1({ ...p1, y: Number(e.target.value) })} className="mt-1" /></div>
                <div className="w-16"><Label className="text-xs text-muted-foreground">z:</Label><Input type="number" step="0.5" value={p1.z} onChange={(e) => setP1({ ...p1, z: Number(e.target.value) })} className="mt-1" /></div>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-green-400 mb-1">Point B (green)</p>
              <div className="flex gap-2">
                <div className="w-16"><Label className="text-xs text-muted-foreground">x:</Label><Input type="number" step="0.5" value={p2.x} onChange={(e) => setP2({ ...p2, x: Number(e.target.value) })} className="mt-1" /></div>
                <div className="w-16"><Label className="text-xs text-muted-foreground">y:</Label><Input type="number" step="0.5" value={p2.y} onChange={(e) => setP2({ ...p2, y: Number(e.target.value) })} className="mt-1" /></div>
                <div className="w-16"><Label className="text-xs text-muted-foreground">z:</Label><Input type="number" step="0.5" value={p2.z} onChange={(e) => setP2({ ...p2, z: Number(e.target.value) })} className="mt-1" /></div>
              </div>
            </div>
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-violet-500/30 bg-violet-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-violet-400">Formulas</p>
          <div className="mt-2 space-y-2 text-xs">
            <p><strong className="text-foreground">Distance:</strong> d = √[(x₂−x₁)² + (y₂−y₁)² + (z₂−z₁)²]</p>
            <p><strong className="text-foreground">Direction Ratios:</strong> l : m : n = (x₂−x₁) : (y₂−y₁) : (z₂−z₁)</p>
            <p><strong className="text-foreground">Direction Cosines:</strong> cos α = l/d, cos β = m/d, cos γ = n/d</p>
            <p><strong className="text-foreground">Property:</strong> cos²α + cos²β + cos²γ = 1</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
