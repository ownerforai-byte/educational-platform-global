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
  ctx.font = "bold 20px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = color;
  ctx.fillText(text, 256, 48);
  const tex = new THREE.CanvasTexture(canvas);
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false }));
  s.position.copy(pos);
  s.scale.set(5.0 * scale, 0.94 * scale, 1);
  return s;
}

type BondProperty = "length" | "energy" | "order";

export function BondCharacteristicsVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [property, setProperty] = useState<BondProperty>("length");
  const [isWebGL] = useState(() => isWebGLAvailable());


  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isWebGL) return;

    let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer;
    let controls: any, frameId: number;
    const meshes: THREE.Object3D[] = [];
    const animData = { time: 0 };

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
      controls.autoRotate = false;
      controls.minDistance = 3;
      controls.maxDistance = 15;

      scene.add(new THREE.AmbientLight(0xffffff, 0.9));
      const dir = new THREE.DirectionalLight(0xffffff, 0.8);
      dir.position.set(5, 8, 5);
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

      const buildBondLength = () => {
        clearDynamic();
        // Show bond length comparison
        const bonds = [
          { label: "C-C", length: 1.54, color: 0x60a5fa },
          { label: "C=C", length: 1.34, color: 0x22c55e },
          { label: "C≡C", length: 1.20, color: 0xf59e0b },
        ];

        bonds.forEach((bond, i) => {
          const y = (1 - i) * 1.5;
          const length = bond.length * 0.8;

          // Atoms
          const atomMat = new THREE.MeshPhongMaterial({ color: 0x374151, emissive: 0x1f2937, emissiveIntensity: 0.3 });
          const atom1 = push(new THREE.Mesh(new THREE.SphereGeometry(0.25, 16, 16), atomMat));
          atom1.position.set(-length / 2, y, 0);
          const atom2 = push(new THREE.Mesh(new THREE.SphereGeometry(0.25, 16, 16), atomMat));
          atom2.position.set(length / 2, y, 0);

          // Bond
          const bondMat = new THREE.MeshPhongMaterial({ color: bond.color, emissive: bond.color, emissiveIntensity: 0.3 });
          const bondGeo = new THREE.CylinderGeometry(0.05, 0.05, length, 8);
          const bondMesh = push(new THREE.Mesh(bondGeo, bondMat));
          bondMesh.position.set(0, y, 0);
          bondMesh.rotateZ(Math.PI / 2);

          // Double/triple bond representation
          if (bond.label.includes("=")) {
            const offset = 0.12;
            const b2 = push(new THREE.Mesh(bondGeo.clone(), bondMat.clone()));
            b2.position.set(0, y + offset, 0);
            b2.rotateZ(Math.PI / 2);
          }
          if (bond.label.includes("≡")) {
            const offset = 0.12;
            const b2 = push(new THREE.Mesh(bondGeo.clone(), bondMat.clone()));
            b2.position.set(0, y + offset, 0);
            b2.rotateZ(Math.PI / 2);
            const b3 = push(new THREE.Mesh(bondGeo.clone(), bondMat.clone()));
            b3.position.set(0, y - offset, 0);
            b3.rotateZ(Math.PI / 2);
          }

          // Length indicator
          const indicatorPts = [
            new THREE.Vector3(-length / 2, y - 0.4, 0),
            new THREE.Vector3(length / 2, y - 0.4, 0),
          ];
          push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(indicatorPts), new THREE.LineBasicMaterial({ color: 0x94a3b8 })));

          push(mkSprite(`${bond.label}: ${bond.length} Angstroms`, "#f8fafc", new THREE.Vector3(length / 2 + 0.6, y, 0), 0.7));
        });

        push(mkSprite("Bond Length: C-C > C=C > C≡C (shorter = stronger)", "#94a3b8", new THREE.Vector3(0, -2.5, 0), 0.9));
      };

      const buildBondEnergy = () => {
        clearDynamic();
        // Show bond energy comparison
        const bonds = [
          { label: "C-C", energy: 347, color: 0xef4444 },
          { label: "C=C", energy: 614, color: 0xf59e0b },
          { label: "C≡C", energy: 839, color: 0x22c55e },
        ];

        const maxEnergy = 900;
        const barWidth = 0.8;
        const barSpacing = 1.5;

        bonds.forEach((bond, i) => {
          const x = (i - 1) * barSpacing;
          const barHeight = (bond.energy / maxEnergy) * 3.0;

          // Bar
          const barGeo = new THREE.BoxGeometry(barWidth, barHeight, barWidth);
          const barMat = new THREE.MeshPhongMaterial({
            color: bond.color,
            emissive: bond.color,
            emissiveIntensity: 0.2,
            transparent: true,
            opacity: 0.8,
          });
          const bar = push(new THREE.Mesh(barGeo, barMat));
          bar.position.set(x, barHeight / 2 - 1.5, 0);

          // Value label
          push(mkSprite(`${bond.label}: ${bond.energy} kJ/mol`, "#f8fafc", new THREE.Vector3(x, barHeight - 0.8, 0), 0.7));
        });

        // Axis
        const axisPts = [new THREE.Vector3(-3, -1.5, 0), new THREE.Vector3(3, -1.5, 0)];
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(axisPts), new THREE.LineBasicMaterial({ color: 0x94a3b8 })));

        push(mkSprite("Bond Energy: C≡C > C=C > C-C (stronger = more energy)", "#22c55e", new THREE.Vector3(0, -3.0, 0), 0.9));
      };

      const buildBondOrder = () => {
        clearDynamic();
        // Show bond order visualization
        const molecules = [
          { label: "H-H", order: 1, color: 0x60a5fa },
          { label: "O=O", order: 2, color: 0xef4444 },
          { label: "N≡N", order: 3, color: 0x22c55e },
        ];

        molecules.forEach((mol, i) => {
          const y = (1 - i) * 2.0;

          // Draw atoms
          const atomMat = new THREE.MeshPhongMaterial({ color: 0x374151, emissive: 0x1f2937, emissiveIntensity: 0.3 });
          const atom1 = push(new THREE.Mesh(new THREE.SphereGeometry(0.35, 16, 16), atomMat));
          atom1.position.set(-0.8, y, 0);
          const atom2 = push(new THREE.Mesh(new THREE.SphereGeometry(0.35, 16, 16), atomMat));
          atom2.position.set(0.8, y, 0);

          // Draw bonds based on order
          const bondMat = new THREE.MeshPhongMaterial({ color: mol.color, emissive: mol.color, emissiveIntensity: 0.3 });
          const bondGeo = new THREE.CylinderGeometry(0.06, 0.06, 1.4, 8);

          if (mol.order >= 1) {
            const b1 = push(new THREE.Mesh(bondGeo, bondMat));
            b1.position.set(0, y, 0);
            b1.rotateZ(Math.PI / 2);
          }
          if (mol.order >= 2) {
            const b2 = push(new THREE.Mesh(bondGeo.clone(), bondMat.clone()));
            b2.position.set(0, y + 0.2, 0);
            b2.rotateZ(Math.PI / 2);
          }
          if (mol.order >= 3) {
            const b3 = push(new THREE.Mesh(bondGeo.clone(), bondMat.clone()));
            b3.position.set(0, y - 0.2, 0);
            b3.rotateZ(Math.PI / 2);
          }

          push(mkSprite(`${mol.label} · Bond Order = ${mol.order}`, "#f8fafc", new THREE.Vector3(1.5, y, 0), 0.8));
        });

        push(mkSprite("Bond Order: Higher order = shorter, stronger bond", "#60a5fa", new THREE.Vector3(0, -3.0, 0), 0.9));
      };

      const builders: Record<BondProperty, () => void> = { length: buildBondLength, energy: buildBondEnergy, order: buildBondOrder };
      builders[property]();

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
  }, [property, isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="Bond Characteristics" description="Bond length/energy visualization — requires WebGL." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Bond Characteristics — Length, Energy & Order</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate · Scroll to zoom</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Bond Property">
          <div className="flex gap-2 mt-1">
            {([
              { value: "length", label: "Bond Length" },
              { value: "energy", label: "Bond Energy" },
              { value: "order", label: "Bond Order" },
            ] as const).map((opt) => (
              <button
                key={opt.value}
                onClick={() => setProperty(opt.value as BondProperty)}
                className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${
                  property === opt.value ? "bg-cyan-500/20 border-cyan-500 text-cyan-300" : "bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-500"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </CollapsibleControls>
        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />
        <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-cyan-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Bond length:</strong> Distance between nuclei of bonded atoms. Shorter bonds are stronger (C≡C &lt; C=C &lt; C-C).</p>
            <p><strong className="text-foreground">Bond energy:</strong> Energy required to break a bond. Stronger bonds require more energy (C≡C &gt; C=C &gt; C-C).</p>
            <p><strong className="text-foreground">Bond order:</strong> Number of chemical bonds between atoms. Single (1), double (2), triple (3).</p>
            <p><strong className="text-foreground">Relationship:</strong> Higher bond order = shorter bond length = higher bond energy.</p>
            <p><strong className="text-foreground">Factors:</strong> Atomic size, electronegativity, and hybridization affect bond characteristics.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}