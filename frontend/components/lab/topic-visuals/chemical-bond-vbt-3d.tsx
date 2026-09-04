"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallback } from "@/components/lab/webgl-fallback";
import * as THREE from "three";

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
  ctx.font = "bold 22px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = color;
  ctx.fillText(text, 256, 48);
  const tex = new THREE.CanvasTexture(canvas);
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false }));
  s.position.copy(pos);
  s.scale.set(4.5 * scale, 0.85 * scale, 1);
  return s;
}

type OverlapType = "sigma" | "pi";

export function VBTVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [overlap, setOverlap] = useState<OverlapType>("sigma");
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
      camera.position.set(0, 3, 10);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.3;
      controls.minDistance = 3;
      controls.maxDistance = 15;

      scene.add(new THREE.AmbientLight(0xffffff, 0.8));
      const dir = new THREE.DirectionalLight(0xffffff, 1.0);
      dir.position.set(6, 10, 6);
      scene.add(dir);

      const push = <T extends THREE.Object3D>(o: T): T => { scene.add(o); meshes.push(o); return o; };
      const clearDynamic = () => {
        while (meshes.length > 2) {
          const m = meshes.pop()!;
          scene.remove(m);
          if (m instanceof THREE.Mesh) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Sprite) { const sm = m.material as THREE.SpriteMaterial; sm.map?.dispose?.(); sm.dispose(); }
        }
      };

      const buildSigma = () => {
        clearDynamic();
        // Two s orbitals overlapping head-on
        const sMat = new THREE.MeshPhongMaterial({
          color: 0x60a5fa, transparent: true, opacity: 0.6,
          emissive: 0x3b82f6, emissiveIntensity: 0.3,
        });

        const leftOrbital = push(new THREE.Mesh(new THREE.SphereGeometry(0.6, 24, 24), sMat.clone()));
        leftOrbital.position.set(-0.8, 0, 0);

        const rightOrbital = push(new THREE.Mesh(new THREE.SphereGeometry(0.6, 24, 24), sMat.clone()));
        rightOrbital.position.set(0.8, 0, 0);

        // Overlap region
        const overlapGeo = new THREE.SphereGeometry(0.3, 16, 16);
        const overlapMat = new THREE.MeshPhongMaterial({
          color: 0x22c55e, transparent: true, opacity: 0.5,
          emissive: 0x16a34a, emissiveIntensity: 0.4,
        });
        const overlapSphere = push(new THREE.Mesh(overlapGeo, overlapMat));
        overlapSphere.position.set(0, 0, 0);

        // Nuclei
        const nucleusMat = new THREE.MeshPhongMaterial({ color: 0xef4444, emissive: 0x991b1b, emissiveIntensity: 0.5 });
        const n1 = push(new THREE.Mesh(new THREE.SphereGeometry(0.15, 12, 12), nucleusMat));
        n1.position.set(-1.5, 0, 0);
        const n2 = push(new THREE.Mesh(new THREE.SphereGeometry(0.15, 12, 12), nucleusMat));
        n2.position.set(1.5, 0, 0);

        // Bond axis
        const axisPoints = [new THREE.Vector3(-2.5, 0, 0), new THREE.Vector3(2.5, 0, 0)];
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(axisPoints), new THREE.LineBasicMaterial({ color: 0x94a3b8, transparent: true, opacity: 0.5 })));

        // Label
        push(mkSprite("s-s Sigma (sigma) Bond: Head-on overlap", "#22c55e", new THREE.Vector3(0, -2.0, 0), 0.9));
      };

      const buildPi = () => {
        clearDynamic();
        // Two p orbitals overlapping side-by-side
        const pMat = new THREE.MeshPhongMaterial({
          color: 0xa78bfa, transparent: true, opacity: 0.5,
          emissive: 0x7c3aed, emissiveIntensity: 0.3,
        });

        // Left p orbital (two lobes)
        const leftLobe1 = push(new THREE.Mesh(new THREE.SphereGeometry(0.5, 20, 20), pMat.clone()));
        leftLobe1.position.set(-0.8, 0.4, 0);
        const leftLobe2 = push(new THREE.Mesh(new THREE.SphereGeometry(0.5, 20, 20), pMat.clone()));
        leftLobe2.position.set(-0.8, -0.4, 0);

        // Right p orbital (two lobes)
        const rightLobe1 = push(new THREE.Mesh(new THREE.SphereGeometry(0.5, 20, 20), pMat.clone()));
        rightLobe1.position.set(0.8, 0.4, 0);
        const rightLobe2 = push(new THREE.Mesh(new THREE.SphereGeometry(0.5, 20, 20), pMat.clone()));
        rightLobe2.position.set(0.8, -0.4, 0);

        // Overlap regions (above and below plane)
        const overlapMat = new THREE.MeshPhongMaterial({
          color: 0xf472b6, transparent: true, opacity: 0.4,
          emissive: 0xdb2777, emissiveIntensity: 0.4,
        });
        const overlapTop = push(new THREE.Mesh(new THREE.SphereGeometry(0.25, 12, 12), overlapMat));
        overlapTop.position.set(0, 0.4, 0);
        const overlapBottom = push(new THREE.Mesh(new THREE.SphereGeometry(0.25, 12, 12), overlapMat));
        overlapBottom.position.set(0, -0.4, 0);

        // Node plane
        const nodeGeo = new THREE.PlaneGeometry(1.0, 2.0);
        const nodeMat = new THREE.MeshPhongMaterial({
          color: 0xffffff, transparent: true, opacity: 0.1, side: THREE.DoubleSide,
        });
        const node = push(new THREE.Mesh(nodeGeo, nodeMat));
        node.position.set(0, 0, 0);

        // Nuclei
        const nucleusMat = new THREE.MeshPhongMaterial({ color: 0xef4444, emissive: 0x991b1b, emissiveIntensity: 0.5 });
        const n1 = push(new THREE.Mesh(new THREE.SphereGeometry(0.15, 12, 12), nucleusMat));
        n1.position.set(-1.5, 0, 0);
        const n2 = push(new THREE.Mesh(new THREE.SphereGeometry(0.15, 12, 12), nucleusMat));
        n2.position.set(1.5, 0, 0);

        // Bond axis
        const axisPoints = [new THREE.Vector3(-2.5, 0, 0), new THREE.Vector3(2.5, 0, 0)];
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(axisPoints), new THREE.LineBasicMaterial({ color: 0x94a3b8, transparent: true, opacity: 0.5 })));

        push(mkSprite("p-p Pi (pi) Bond: Side-by-side overlap", "#f472b6", new THREE.Vector3(0, -2.0, 0), 0.9));
      };

      const builders: Record<OverlapType, () => void> = { sigma: buildSigma, pi: buildPi };
      builders[overlap]();

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
          else if (m instanceof THREE.Sprite) { const sm = m.material as THREE.SpriteMaterial; sm.map?.dispose?.(); sm.dispose(); }
        });
        renderer.dispose();
        controls.dispose?.();
      };
    };

    const cleanup = init();
    return () => { cleanup.then((d) => d?.()); };
  }, [overlap, isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="Valence Bond Theory" description="Orbital overlap visualization — requires WebGL." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Valence Bond Theory — Orbital Overlap</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate · Scroll to zoom</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Bond Type">
          <div className="flex gap-2 mt-1">
            {([
              { value: "sigma", label: "Sigma (sigma)" },
              { value: "pi", label: "Pi (pi)" },
            ] as const).map((opt) => (
              <button
                key={opt.value}
                onClick={() => setOverlap(opt.value as OverlapType)}
                className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${
                  overlap === opt.value ? "bg-pink-500/20 border-pink-500 text-pink-300" : "bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-500"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </CollapsibleControls>
        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />
        <div className="rounded-lg border border-pink-500/30 bg-pink-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-pink-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Sigma bond (sigma):</strong> Head-on overlap of orbitals along the internuclear axis. Strongest bond type. Found in all single bonds.</p>
            <p><strong className="text-foreground">Pi bond (pi):</strong> Side-by-side overlap of p orbitals above and below the nodal plane. Weaker than sigma bonds. Found in double/triple bonds.</p>
            <p><strong className="text-foreground">Double bond:</strong> One sigma + one pi bond (e.g., C=C in ethene).</p>
            <p><strong className="text-foreground">Triple bond:</strong> One sigma + two pi bonds (e.g., C≡C in ethyne).</p>
            <p><strong className="text-foreground">Orbital overlap:</strong> Bond strength depends on the extent of orbital overlap.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}