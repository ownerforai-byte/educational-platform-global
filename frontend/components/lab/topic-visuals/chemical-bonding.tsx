"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallback } from "@/components/lab/webgl-fallback";
import * as THREE from "three";

/* ============================================================
   Chemical Bonding — Ionic Lattice, Covalent Bonds & VSEPR
   NEB Chemistry 11
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

type BondMode = "ionic" | "covalent" | "vsepr";

export function ChemicalBondingVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<BondMode>("covalent");
  const [isWebGL, setIsWebGL] = useState(true);

  useEffect(() => { setIsWebGL(isWebGLAvailable()); }, []);

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
      camera.position.set(0, 4, 10);

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

      const clearDynamic = () => {
        while (meshes.length > 3) {
          const m = meshes.pop()!;
          scene.remove(m);
          if (m instanceof THREE.Mesh) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Sprite) { (m.material as THREE.SpriteMaterial).map?.dispose?.(); m.material.dispose(); }
          else if (m instanceof THREE.Line) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
        }
      };

      const updateScene = () => {
        clearDynamic();

        if (mode === "ionic") {
          // NaCl lattice — simple cubic arrangement
          const spacing = 1.5;
          const NaColor = 0x6366f1; // purple
          const ClColor = 0x22c55e; // green
          const positions: [number, number, number, number][] = [];

          for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
              for (let k = -1; k <= 1; k++) {
                const isNa = (i + j + k) % 2 === 0;
                positions.push([i * spacing, j * spacing, k * spacing, isNa ? NaColor : ClColor]);
              }
            }
          }

          positions.forEach(([x, y, z, color]) => {
            const r = color === NaColor ? 0.35 : 0.45;
            const sphere = push(new THREE.Mesh(
              new THREE.SphereGeometry(r, 16, 16),
              new THREE.MeshPhongMaterial({ color, emissive: color, emissiveIntensity: 0.15 }),
            ));
            sphere.position.set(x, y, z);
          });

          // Bond lines between neighbors
          for (let i = 0; i < positions.length; i++) {
            for (let j = i + 1; j < positions.length; j++) {
              const [x1, y1, z1] = positions[i];
              const [x2, y2, z2] = positions[j];
              const dist = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2);
              if (Math.abs(dist - spacing) < 0.1) {
                push(new THREE.Line(
                  new THREE.BufferGeometry().setFromPoints([
                    new THREE.Vector3(x1, y1, z1), new THREE.Vector3(x2, y2, z2),
                  ]),
                  new THREE.LineBasicMaterial({ color: 0x475569, transparent: true, opacity: 0.5 }),
                ));
              }
            }
          }

          // Labels with long arrows
          const labelPos1 = new THREE.Vector3(3, 2.5, 0);
          const target1 = new THREE.Vector3(spacing, spacing, 0);
          const dir1 = target1.clone().sub(labelPos1).normalize();
          const arrowLen1 = labelPos1.distanceTo(target1);
          push(new THREE.ArrowHelper(dir1, labelPos1, arrowLen1 * 0.8, 0x6366f1, 0.25, 0.12));
          push(mkSprite("Na⁺ (cation)", "#6366f1", labelPos1.clone().sub(dir1.multiplyScalar(0.5)), 0.7));

          const labelPos2 = new THREE.Vector3(-3, -1, 0);
          const target2 = new THREE.Vector3(-spacing, -spacing, 0);
          const dir2 = target2.clone().sub(labelPos2).normalize();
          const arrowLen2 = labelPos2.distanceTo(target2);
          push(new THREE.ArrowHelper(dir2, labelPos2, arrowLen2 * 0.8, 0x22c55e, 0.25, 0.12));
          push(mkSprite("Cl⁻ (anion)", "#22c55e", labelPos2.clone().sub(dir2.multiplyScalar(0.5)), 0.7));

          push(mkSprite("Ionic Lattice — electrostatic attraction between oppositely charged ions", "#fbbf24", new THREE.Vector3(0, 3.5, 0), 0.65));
        }
        else if (mode === "covalent") {
          // H₂O molecule — bent shape
          const O = new THREE.Vector3(0, 0, 0);
          const H1 = new THREE.Vector3(-1.2, 0.8, 0);
          const H2 = new THREE.Vector3(1.2, 0.8, 0);

          // Oxygen atom
          const oSphere = push(new THREE.Mesh(
            new THREE.SphereGeometry(0.4, 16, 16),
            new THREE.MeshPhongMaterial({ color: 0xef4444, emissive: 0x991b1b, emissiveIntensity: 0.2 }),
          ));
          oSphere.position.copy(O);

          // Hydrogen atoms
          const hMat = new THREE.MeshPhongMaterial({ color: 0xf5f5f5, emissive: 0xe5e5e5, emissiveIntensity: 0.1 });
          const h1 = push(new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 12), hMat));
          h1.position.copy(H1);
          const h2 = push(new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 12), hMat.clone()));
          h2.position.copy(H2);

          // Bonds
          const bondMat = new THREE.CylinderGeometry(0.06, 0.06, 1, 8);
          const drawBond = (from: THREE.Vector3, to: THREE.Vector3) => {
            const mid = from.clone().add(to).multiplyScalar(0.5);
            const dir = to.clone().sub(from).normalize();
            const len = from.distanceTo(to);
            const cyl = push(new THREE.Mesh(bondMat, new THREE.MeshPhongMaterial({ color: 0x94a3b8 })));
            cyl.position.copy(mid);
            cyl.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
            cyl.scale.set(1, len, 1);
          };
          drawBond(O, H1);
          drawBond(O, H2);

          // Lone pairs on oxygen
          const lpMat = new THREE.MeshBasicMaterial({ color: 0xfbbf24, transparent: true, opacity: 0.6 });
          const lp1 = push(new THREE.Mesh(new THREE.SphereGeometry(0.15, 8, 8), lpMat));
          lp1.position.set(-0.3, -0.5, 0.3);
          const lp2 = push(new THREE.Mesh(new THREE.SphereGeometry(0.15, 8, 8), lpMat.clone()));
          lp2.position.set(0.3, -0.5, -0.3);

          // Long arrows labeling features
          const labelO = new THREE.Vector3(0, 2.0, 0);
          const targetO = O.clone();
          const dirO = targetO.clone().sub(labelO).normalize();
          const arrowLenO = labelO.distanceTo(targetO);
          push(new THREE.ArrowHelper(dirO, labelO, arrowLenO * 0.85, 0xef4444, 0.25, 0.12));
          push(mkSprite("Oxygen — central atom (sp³ hybridized)", "#ef4444", labelO.clone().sub(dirO.multiplyScalar(0.5)), 0.7));

          const labelH1 = new THREE.Vector3(-2.5, 1.8, 0);
          const targetH1 = H1.clone();
          const dirH1 = targetH1.clone().sub(labelH1).normalize();
          const arrowLenH1 = labelH1.distanceTo(targetH1);
          push(new THREE.ArrowHelper(dirH1, labelH1, arrowLenH1 * 0.85, 0xf5f5f5, 0.22, 0.1));
          push(mkSprite("H — covalent bond (shared e⁻ pair)", "#f5f5f5", labelH1.clone().sub(dirH1.multiplyScalar(0.5)), 0.65));

          const labelAngle = new THREE.Vector3(2.5, -0.5, 0);
          const targetAngle = new THREE.Vector3(0, 0.4, 0);
          const dirAngle = targetAngle.clone().sub(labelAngle).normalize();
          const arrowLenAngle = labelAngle.distanceTo(targetAngle);
          push(new THREE.ArrowHelper(dirAngle, labelAngle, arrowLenAngle * 0.8, 0x22d3ee, 0.25, 0.12));
          push(mkSprite("H-O-H angle ≈ 104.5° (bent shape)", "#22d3ee", labelAngle.clone().sub(dirAngle.multiplyScalar(0.5)), 0.7));

          const labelLP = new THREE.Vector3(0, -1.8, 0.8);
          const targetLP = new THREE.Vector3(-0.3, -0.5, 0.3);
          const dirLP = targetLP.clone().sub(labelLP).normalize();
          const arrowLenLP = labelLP.distanceTo(targetLP);
          push(new THREE.ArrowHelper(dirLP, labelLP, arrowLenLP * 0.8, 0xfbbf24, 0.22, 0.1));
          push(mkSprite("Lone pairs (2) — cause bent geometry", "#fbbf24", labelLP.clone().sub(dirLP.multiplyScalar(0.5)), 0.65));
        }
        else if (mode === "vsepr") {
          // VSEPR shapes: linear, trigonal planar, tetrahedral, bent, trigonal pyramidal
          const shapes = [
            { name: "CO₂ — Linear (180°)", center: new THREE.Vector3(-4, 0, 0), atoms: [
              { pos: new THREE.Vector3(-5.5, 0, 0), color: 0xef4444, sym: "O" },
              { pos: new THREE.Vector3(-4, 0, 0), color: 0x3b82f6, sym: "C" },
              { pos: new THREE.Vector3(-2.5, 0, 0), color: 0xef4444, sym: "O" },
            ] },
            { name: "BF₃ — Trigonal Planar (120°)", center: new THREE.Vector3(0, 0.5, 0), atoms: [
              { pos: new THREE.Vector3(0, 0, 0), color: 0x3b82f6, sym: "B" },
              { pos: new THREE.Vector3(-1.5, -0.5, 0), color: 0x22c55e, sym: "F" },
              { pos: new THREE.Vector3(1.5, -0.5, 0), color: 0x22c55e, sym: "F" },
              { pos: new THREE.Vector3(0, 1.0, 0), color: 0x22c55e, sym: "F" },
            ] },
            { name: "CH₄ — Tetrahedral (109.5°)", center: new THREE.Vector3(4, 0, 0), atoms: [
              { pos: new THREE.Vector3(4, 0, 0), color: 0x3b82f6, sym: "C" },
              { pos: new THREE.Vector3(5, 1.2, 0), color: 0xf5f5f5, sym: "H" },
              { pos: new THREE.Vector3(3, 1.2, 0), color: 0xf5f5f5, sym: "H" },
              { pos: new THREE.Vector3(4.5, -0.8, 0.8), color: 0xf5f5f5, sym: "H" },
              { pos: new THREE.Vector3(3.5, -0.8, 0.8), color: 0xf5f5f5, sym: "H" },
            ] },
          ];

          shapes.forEach((shape) => {
            const atomMeshes: THREE.Mesh[] = [];
            shape.atoms.forEach((a) => {
              const m = push(new THREE.Mesh(
                new THREE.SphereGeometry(0.3, 12, 12),
                new THREE.MeshPhongMaterial({ color: a.color, emissive: a.color, emissiveIntensity: 0.15 }),
              ));
              m.position.copy(a.pos);
              atomMeshes.push(m);
            });

            // Bonds
            const bondMat = new THREE.CylinderGeometry(0.05, 0.05, 1, 8);
            for (let i = 1; i < shape.atoms.length; i++) {
              const from = shape.atoms[0].pos;
              const to = shape.atoms[i].pos;
              const mid = from.clone().add(to).multiplyScalar(0.5);
              const dir = to.clone().sub(from).normalize();
              const len = from.distanceTo(to);
              const cyl = push(new THREE.Mesh(bondMat, new THREE.MeshPhongMaterial({ color: 0x94a3b8 })));
              cyl.position.copy(mid);
              cyl.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
              cyl.scale.set(1, len, 1);
            }

            // Long arrow label
            const lp = new THREE.Vector3(shape.center.x, 2.2, 0);
            const tp = shape.center.clone().add(new THREE.Vector3(0, 0.5, 0));
            const d = tp.clone().sub(lp).normalize();
            const al = lp.distanceTo(tp);
            push(new THREE.ArrowHelper(d, lp, al * 0.8, 0xfbbf24, 0.25, 0.12));
            push(mkSprite(shape.name, "#fbbf24", lp.clone().sub(d.multiplyScalar(0.5)), 0.7));
          });
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
  }, [mode, isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="Chemical Bonding" description="Ionic, covalent bonding & VSEPR — requires WebGL." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Chemical Bonding & Molecular Shapes</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate · Scroll to zoom</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Bond Type">
          <Tabs value={mode} onValueChange={(v) => setMode(v as BondMode)} className="mt-1">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="ionic" className="text-xs">Ionic Lattice</TabsTrigger>
              <TabsTrigger value="covalent" className="text-xs">Covalent (H₂O)</TabsTrigger>
              <TabsTrigger value="vsepr" className="text-xs">VSEPR Shapes</TabsTrigger>
            </TabsList>
          </Tabs>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Ionic bond:</strong> Electrostatic attraction between oppositely charged ions (e.g., Na⁺Cl⁻). Forms crystal lattice.</p>
            <p><strong className="text-foreground">Covalent bond:</strong> Sharing of electron pairs between atoms. Polar (H₂O) vs nonpolar (H₂).</p>
            <p><strong className="text-foreground">VSEPR theory:</strong> Electron pairs repel → molecules adopt shapes that minimize repulsion.</p>
            <p><strong className="text-foreground">Hybridization:</strong> sp³ (tetrahedral, 109.5°), sp² (trigonal planar, 120°), sp (linear, 180°).</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
