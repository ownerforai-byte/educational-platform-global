"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallback } from "@/components/lab/webgl-fallback";
import * as THREE from "three";
import { LiveArrow } from "@/components/lab/animated-arrow-helper";

/* ============================================================
   Matrices & Determinants — NEB Algebra (Maths 11)
   Visualizes matrix operations, transpose, determinant,
   adjoint, inverse, and Cramer's rule in 3D.
   ============================================================ */

function mkSprite(text: string, color: string, pos: THREE.Vector3, scale = 1.0): THREE.Sprite {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "rgba(15, 23, 42, 0.9)";
  ctx.fillRect(4, 4, 504, 120);
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.strokeRect(4, 4, 504, 120);
  ctx.font = "bold 26px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = color;
  ctx.fillText(text, 256, 64);
  const tex = new THREE.CanvasTexture(canvas);
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false }));
  s.position.copy(pos);
  s.scale.set(3.5 * scale, 0.88 * scale, 1);
  return s;
}

export function MatricesDeterminantsVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [matrix, setMatrix] = useState([[2, 1], [1, 3]]);
  const [showInverse, setShowInverse] = useState(false);
  const [isWebGL] = useState(() => isWebGLAvailable());


  const det = matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
  const trace = matrix[0][0] + matrix[1][1];

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
      camera.position.set(5, 5, 5);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.5;

      scene.add(new THREE.AmbientLight(0xffffff, 0.8));
      const dir = new THREE.DirectionalLight(0xffffff, 1.0);
      dir.position.set(5, 10, 5);
      scene.add(dir);

      const push = <T extends THREE.Object3D>(o: T): T => { scene.add(o); meshes.push(o); return o; };

      const G = 6;
      push(new THREE.GridHelper(G * 2, G * 2, 0x334155, 0x1e293b));

      const update = () => {
        while (meshes.length > 20) {
          const m = meshes.pop()!;
          scene.remove(m);
          if (m instanceof THREE.Mesh) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Sprite) { (m.material as THREE.SpriteMaterial).map?.dispose?.(); m.material.dispose(); }
        }

        const [a, b, c, d] = [matrix[0][0], matrix[0][1], matrix[1][0], matrix[1][1]];

        // Transform basis vectors to show matrix action
        const basisVectors: Array<{ from: THREE.Vector3; to: THREE.Vector3; color: number; label: string }> = [
          { from: new THREE.Vector3(0, 0, 0), to: new THREE.Vector3(a, c, 0), color: 0xef4444, label: "i'=(a,c)" },
          { from: new THREE.Vector3(0, 0, 0), to: new THREE.Vector3(b, d, 0), color: 0x3b82f6, label: "j'=(b,d)" },
        ];

        basisVectors.forEach(({ from, to, color, label }) => {
          const dir = to.clone().sub(from).normalize();
          const len = to.clone().sub(from).length();
          push(new LiveArrow(dir, from, len, color, 0.2, 0.12));
          const mid = from.clone().add(to).multiplyScalar(0.5);
          push(mkSprite(label, `#${color.toString(16).padStart(6, "0")}`, mid.clone().add(new THREE.Vector3(0.5, 0.5, 0)), 0.7));
        });

        // Unit square transformed
        const sqPts = [
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(a, c, 0),
          new THREE.Vector3(a + b, c + d, 0),
          new THREE.Vector3(b, d, 0),
          new THREE.Vector3(0, 0, 0),
        ];
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(sqPts), new THREE.LineBasicMaterial({ color: 0x22d3ee, linewidth: 2 })));

        // Original unit square (dashed)
        const origSq = [
          new THREE.Vector3(0, 0, -0.1),
          new THREE.Vector3(1, 0, -0.1),
          new THREE.Vector3(1, 1, -0.1),
          new THREE.Vector3(0, 1, -0.1),
          new THREE.Vector3(0, 0, -0.1),
        ];
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(origSq), new THREE.LineDashedMaterial({ color: 0x475569, dashSize: 0.15, gapSize: 0.1 })));
        (meshes[meshes.length - 1] as any).computeLineDistances();

        // Determinant label (area scaling factor)
        push(mkSprite(`det = ${det.toFixed(2)}   |   Area scale = ${Math.abs(det).toFixed(2)}`, "#fbbf24", new THREE.Vector3(0, 4.5, 0), 0.85));
        push(mkSprite(`trace = ${trace.toFixed(2)}`, "#a78bfa", new THREE.Vector3(0, 3.7, 0), 0.7));

        if (showInverse && Math.abs(det) > 0.001) {
          const invA = d / det, invB = -b / det, invC = -c / det, invD = a / det;
          push(mkSprite(`A⁻¹ = |${invA.toFixed(2)}  ${invB.toFixed(2)}|`, "#4ade80", new THREE.Vector3(-5, 4.5, 0), 0.75));
          push(mkSprite(`        |${invC.toFixed(2)}  ${invD.toFixed(2)}|`, "#4ade80", new THREE.Vector3(-5, 3.7, 0), 0.75));
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
  }, [matrix, showInverse, isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="Matrices & Determinants" description="Linear transformation visualization — requires WebGL." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Matrices &amp; Determinants</span>
          <span className="text-xs text-muted-foreground font-normal">Linear transformation in 2D</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Matrix Elements">
          <div className="flex gap-4 mt-2">
            <div className="w-14"><Label className="text-xs text-muted-foreground">a₁₁:</Label><Input type="number" step="0.5" value={matrix[0][0]} onChange={(e) => setMatrix([[Number(e.target.value), matrix[0][1]], [matrix[1][0], matrix[1][1]]])} className="mt-1" /></div>
            <div className="w-14"><Label className="text-xs text-muted-foreground">a₁₂:</Label><Input type="number" step="0.5" value={matrix[0][1]} onChange={(e) => setMatrix([[matrix[0][0], Number(e.target.value)], [matrix[1][0], matrix[1][1]]])} className="mt-1" /></div>
            <div className="w-14"><Label className="text-xs text-muted-foreground">a₂₁:</Label><Input type="number" step="0.5" value={matrix[1][0]} onChange={(e) => setMatrix([[matrix[0][0], matrix[0][1]], [Number(e.target.value), matrix[1][1]]])} className="mt-1" /></div>
            <div className="w-14"><Label className="text-xs text-muted-foreground">a₂₂:</Label><Input type="number" step="0.5" value={matrix[1][1]} onChange={(e) => setMatrix([[matrix[0][0], matrix[0][1]], [matrix[1][0], Number(e.target.value)]])} className="mt-1" /></div>
          </div>
        </CollapsibleControls>

        <div className="flex items-center gap-3 text-xs">
          <label className="flex items-center gap-1.5">
            <input type="checkbox" checked={showInverse} onChange={(e) => setShowInverse(e.target.checked)} />
            Show inverse matrix A⁻¹
          </label>
        </div>

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Determinant (2×2):</strong> det(A) = ad − bc. Zero determinant → no inverse (singular matrix).</p>
            <p><strong className="text-foreground">Trace:</strong> sum of diagonal elements = a₁₁ + a₂₂.</p>
            <p><strong className="text-foreground">Inverse:</strong> A⁻¹ = (1/det) · adj(A), exists only when det ≠ 0.</p>
            <p><strong className="text-foreground">Geometric meaning:</strong> |det| = area scaling factor of the linear transformation.</p>
            <p><strong className="text-foreground">Transpose:</strong> Aᵀ swaps rows and columns: (aᵢⱼ) → (aⱼᵢ).</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
