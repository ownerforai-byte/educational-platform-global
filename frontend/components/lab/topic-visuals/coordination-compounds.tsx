"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallback } from "@/components/lab/webgl-fallback";
import * as THREE from "three";

/* ============================================================
   Coordination Compounds — Octahedral & Tetrahedral Geometry
   NEB Chemistry 12 — d-block Elements
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

type CoordType = "octahedral" | "tetrahedral" | "square-planar";

export function CoordinationCompoundsVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [geometry, setGeometry] = useState<CoordType>("octahedral");
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
      camera.position.set(0, 2, 9);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.4;
      controls.minDistance = 3;
      controls.maxDistance = 20;

      scene.add(new THREE.AmbientLight(0xffffff, 0.7));
      const dir = new THREE.DirectionalLight(0xffffff, 1.0);
      dir.position.set(6, 10, 6);
      scene.add(dir);

      const push = <T extends THREE.Object3D>(o: T): T => { scene.add(o); meshes.push(o); return o; };

      const updateScene = () => {
        while (meshes.length > 12) {
          const m = meshes.pop()!;
          scene.remove(m);
          if (m instanceof THREE.Mesh) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Sprite) { (m.material as THREE.SpriteMaterial).map?.dispose?.(); m.material.dispose(); }
          else if (m instanceof THREE.Line) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
        }

        const M_COLOR = 0x3b82f6;
        const L_COLOR = 0x22c55e;
        const bondMat = new THREE.CylinderGeometry(0.04, 0.04, 1, 8);

        if (geometry === "octahedral") {
          // 6 ligands at ±x, ±y, ±z
          const ligands = [
            new THREE.Vector3(1.5, 0, 0),   // +x
            new THREE.Vector3(-1.5, 0, 0),  // -x
            new THREE.Vector3(0, 1.5, 0),   // +y
            new THREE.Vector3(0, -1.5, 0),  // -y
            new THREE.Vector3(0, 0, 1.5),   // +z
            new THREE.Vector3(0, 0, -1.5),  // -z
          ];
          const labels = ["+x", "-x", "+y", "-y", "+z", "-z"];
          const ligandNames = ["L₁", "L₂", "L₃", "L₄", "L₅", "L₆"];

          // Central metal
          const metal = push(new THREE.Mesh(
            new THREE.SphereGeometry(0.35, 16, 16),
            new THREE.MeshPhongMaterial({ color: M_COLOR, emissive: M_COLOR, emissiveIntensity: 0.2 }),
          ));
          metal.position.set(0, 0, 0);

          // Ligands and bonds
          ligands.forEach((pos, i) => {
            // Bond
            const mid = pos.clone().multiplyScalar(0.5);
            const dir = pos.clone().normalize();
            const cyl = push(new THREE.Mesh(bondMat, new THREE.MeshPhongMaterial({ color: 0x94a3b8 })));
            cyl.position.copy(mid);
            cyl.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
            cyl.scale.set(1, 1.5, 1);

            // Ligand sphere
            const lig = push(new THREE.Mesh(
              new THREE.SphereGeometry(0.22, 12, 12),
              new THREE.MeshPhongMaterial({ color: L_COLOR, emissive: L_COLOR, emissiveIntensity: 0.15 }),
            ));
            lig.position.copy(pos);

            // Label with LONG ARROW
            const lp = pos.clone().multiplyScalar(1.6);
            const tp = pos.clone();
            const d = tp.clone().sub(lp).normalize();
            const al = lp.distanceTo(tp);
            push(new THREE.ArrowHelper(d, lp, al * 0.7, L_COLOR, 0.25, 0.12));
            push(mkSprite(ligandNames[i], `#${L_COLOR.toString(16).padStart(6, "0")}`, lp.clone().sub(d.multiplyScalar(0.4)), 0.55));
          });

          // Metal label
          const ml = new THREE.Vector3(0, 2.2, 0);
          const mt = new THREE.Vector3(0, 0, 0);
          const md = mt.clone().sub(ml).normalize();
          const mL = ml.distanceTo(mt);
          push(new THREE.ArrowHelper(md, ml, mL * 0.8, M_COLOR, 0.28, 0.12));
          push(mkSprite("Metal center (M²⁺/M³⁺)", `#${M_COLOR.toString(16).padStart(6, "0")}`, ml.clone().sub(md.multiplyScalar(0.5)), 0.7));

          // Bond angle labels
          const angleLabel1 = new THREE.Vector3(2.0, 2.0, 0);
          const angleTarget1 = new THREE.Vector3(0.75, 0.75, 0);
          const a1Dir = angleTarget1.clone().sub(angleLabel1).normalize();
          const a1Len = angleLabel1.distanceTo(angleTarget1);
          push(new THREE.ArrowHelper(a1Dir, angleLabel1, a1Len * 0.6, 0xfbbf24, 0.22, 0.1));
          push(mkSprite("90° bond angles", "#fbbf24", angleLabel1.clone().sub(a1Dir.multiplyScalar(0.5)), 0.6));

          const angleLabel2 = new THREE.Vector3(-2.0, -2.0, 0);
          const angleTarget2 = new THREE.Vector3(-0.75, -0.75, 0);
          const a2Dir = angleTarget2.clone().sub(angleLabel2).normalize();
          const a2Len = angleLabel2.distanceTo(angleTarget2);
          push(new THREE.ArrowHelper(a2Dir, angleLabel2, a2Len * 0.6, 0xf97316, 0.22, 0.1));
          push(mkSprite("180° trans angle", "#f97316", angleLabel2.clone().sub(a2Dir.multiplyScalar(0.5)), 0.6));
        }
        else if (geometry === "tetrahedral") {
          // 4 ligands at alternating corners of cube
          const r = 1.5;
          const ligands = [
            new THREE.Vector3(r, r, r),
            new THREE.Vector3(r, -r, -r),
            new THREE.Vector3(-r, r, -r),
            new THREE.Vector3(-r, -r, r),
          ];
          const ligandNames = ["L₁", "L₂", "L₃", "L₄"];

          const metal = push(new THREE.Mesh(
            new THREE.SphereGeometry(0.35, 16, 16),
            new THREE.MeshPhongMaterial({ color: M_COLOR, emissive: M_COLOR, emissiveIntensity: 0.2 }),
          ));
          metal.position.set(0, 0, 0);

          ligands.forEach((pos, i) => {
            const mid = pos.clone().multiplyScalar(0.5);
            const dir = pos.clone().normalize();
            const cyl = push(new THREE.Mesh(bondMat, new THREE.MeshPhongMaterial({ color: 0x94a3b8 })));
            cyl.position.copy(mid);
            cyl.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
            const len = pos.length();
            cyl.scale.set(1, len, 1);

            const lig = push(new THREE.Mesh(
              new THREE.SphereGeometry(0.22, 12, 12),
              new THREE.MeshPhongMaterial({ color: L_COLOR, emissive: L_COLOR, emissiveIntensity: 0.15 }),
            ));
            lig.position.copy(pos);

            // Label with arrow
            const lp = pos.clone().normalize().multiplyScalar(2.2);
            const tp = pos.clone();
            const d = tp.clone().sub(lp).normalize();
            const al = lp.distanceTo(tp);
            push(new THREE.ArrowHelper(d, lp, al * 0.7, L_COLOR, 0.25, 0.12));
            push(mkSprite(ligandNames[i], `#${L_COLOR.toString(16).padStart(6, "0")}`, lp.clone().sub(d.multiplyScalar(0.4)), 0.55));
          });

          // Tetrahedral angle
          const tLabel = new THREE.Vector3(0, 2.5, 0);
          const tTarget = new THREE.Vector3(0, 0.5, 0);
          const tDir = tTarget.clone().sub(tLabel).normalize();
          const tLen = tLabel.distanceTo(tTarget);
          push(new THREE.ArrowHelper(tDir, tLabel, tLen * 0.7, 0xfbbf24, 0.25, 0.12));
          push(mkSprite("Bond angle: 109.5° (tetrahedral)", "#fbbf24", tLabel.clone().sub(tDir.multiplyScalar(0.5)), 0.7));
        }
        else { // square-planar
          const r = 1.5;
          const ligands = [
            new THREE.Vector3(r, 0, 0),
            new THREE.Vector3(-r, 0, 0),
            new THREE.Vector3(0, 0, r),
            new THREE.Vector3(0, 0, -r),
          ];
          const ligandNames = ["L₁", "L₂", "L₃", "L₄"];

          const metal = push(new THREE.Mesh(
            new THREE.SphereGeometry(0.35, 16, 16),
            new THREE.MeshPhongMaterial({ color: M_COLOR, emissive: M_COLOR, emissiveIntensity: 0.2 }),
          ));
          metal.position.set(0, 0, 0);

          ligands.forEach((pos, i) => {
            const mid = pos.clone().multiplyScalar(0.5);
            const dir = pos.clone().normalize();
            const cyl = push(new THREE.Mesh(bondMat, new THREE.MeshPhongMaterial({ color: 0x94a3b8 })));
            cyl.position.copy(mid);
            cyl.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
            cyl.scale.set(1, r, 1);

            const lig = push(new THREE.Mesh(
              new THREE.SphereGeometry(0.22, 12, 12),
              new THREE.MeshPhongMaterial({ color: L_COLOR, emissive: L_COLOR, emissiveIntensity: 0.15 }),
            ));
            lig.position.copy(pos);

            const lp = pos.clone().normalize().multiplyScalar(2.2);
            const tp = pos.clone();
            const d = tp.clone().sub(lp).normalize();
            const al = lp.distanceTo(tp);
            push(new THREE.ArrowHelper(d, lp, al * 0.7, L_COLOR, 0.25, 0.12));
            push(mkSprite(ligandNames[i], `#${L_COLOR.toString(16).padStart(6, "0")}`, lp.clone().sub(d.multiplyScalar(0.4)), 0.55));
          });

          // Plane indicator
          const plane = push(new THREE.Mesh(
            new THREE.PlaneGeometry(3.5, 3.5),
            new THREE.MeshBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.08, side: THREE.DoubleSide }),
          ));
          plane.rotation.x = -Math.PI / 2;

          const pLabel = new THREE.Vector3(2.5, 0, 2.5);
          const pTarget = new THREE.Vector3(0, 0, 0);
          const pDir = pTarget.clone().sub(pLabel).normalize();
          const pLen = pLabel.distanceTo(pTarget);
          push(new THREE.ArrowHelper(pDir, pLabel, pLen * 0.6, 0x22d3ee, 0.25, 0.12));
          push(mkSprite("Square planar: all in one plane, 90° angles", "#22d3ee", pLabel.clone().sub(pDir.multiplyScalar(0.5)), 0.65));
        }

        // CN label
        const cnLabels: Record<CoordType, string> = {
          octahedral: "Coordination Number = 6",
          tetrahedral: "Coordination Number = 4",
          "square-planar": "Coordination Number = 4",
        };
        push(mkSprite(cnLabels[geometry], "#a78bfa", new THREE.Vector3(0, -2.5, 0), 0.7));
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
  }, [geometry, isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="Coordination Compounds" description="Crystal field geometry visualization — requires WebGL." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Coordination Compounds — Geometry & Crystal Field</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate · Scroll to zoom</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Geometry">
          <Tabs value={geometry} onValueChange={(v) => setGeometry(v as CoordType)} className="mt-1">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="octahedral" className="text-xs">Octahedral</TabsTrigger>
              <TabsTrigger value="tetrahedral" className="text-xs">Tetrahedral</TabsTrigger>
              <TabsTrigger value="square-planar" className="text-xs">Square Planar</TabsTrigger>
            </TabsList>
          </Tabs>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-violet-500/30 bg-violet-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-violet-400">Crystal Field Theory</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Octahedral (CN=6):</strong> d orbitals split into t₂g (lower, 3 orbitals) and eg (upper, 2 orbitals). Δₒ splitting energy.</p>
            <p><strong className="text-foreground">Tetrahedral (CN=4):</strong> Inverted splitting: e (lower) and t₂ (upper). Δₜ ≈ 4/9 Δₒ. Always high-spin.</p>
            <p><strong className="text-foreground">Square Planar (CN=4):</strong> Common for d⁸ metals (Ni²⁺, Pd²⁺, Pt²⁺, Au³⁺). Large splitting, usually low-spin.</p>
            <p><strong className="text-foreground">Spectrochemical series:</strong> I⁻ &lt; Br⁻ &lt; Cl⁻ &lt; F⁻ &lt; H₂O &lt; NH₃ &lt; CN⁻ &lt; CO (weak → strong field)</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
