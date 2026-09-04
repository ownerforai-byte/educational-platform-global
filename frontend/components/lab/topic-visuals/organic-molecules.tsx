"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallback } from "@/components/lab/webgl-fallback";
import * as THREE from "three";
import { LiveArrow } from "@/components/lab/animated-arrow-helper";

/* ============================================================
   Organic Molecules — Ball-and-Stick with Functional Groups
   NEB Chemistry 11 & 12
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

const MOLECULES = {
  "methane": { formula: "CH₄", shape: "Tetrahedral", bondAngle: "109.5°", hybrid: "sp³", color: 0x3b82f6 },
  "ethene": { formula: "C₂H₄", shape: "Trigonal Planar", bondAngle: "120°", hybrid: "sp²", color: 0x22c55e },
  "ethyne": { formula: "C₂H₂", shape: "Linear", bondAngle: "180°", hybrid: "sp", color: 0xf97316 },
  "ethanol": { formula: "C₂H₅OH", shape: "Tetrahedral(C)", bondAngle: "109.5°", hybrid: "sp³", color: 0xef4444 },
  "ethanal": { formula: "CH₃CHO", shape: "Trigonal Planar(C=O)", bondAngle: "~120°", hybrid: "sp²", color: 0xa855f7 },
  "ethanoic acid": { formula: "CH₃COOH", shape: "Trigonal Planar(C=O)", bondAngle: "~120°", hybrid: "sp²", color: 0x22d3ee },
};

type MolKey = keyof typeof MOLECULES;

export function OrganicMoleculesVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [molecule, setMolecule] = useState<MolKey>("methane");
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
      camera.position.set(0, 2, 8);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.4;
      controls.minDistance = 3;
      controls.maxDistance = 18;

      scene.add(new THREE.AmbientLight(0xffffff, 0.7));
      const dir = new THREE.DirectionalLight(0xffffff, 1.0);
      dir.position.set(6, 10, 6);
      scene.add(dir);

      const push = <T extends THREE.Object3D>(o: T): T => { scene.add(o); meshes.push(o); return o; };

      const C_COLOR = 0x374151;
      const H_COLOR = 0xf5f5f5;
      const O_COLOR = 0xef4444;
      const bondMat = new THREE.CylinderGeometry(0.06, 0.06, 1, 8);

      const drawBond = (from: THREE.Vector3, to: THREE.Vector3, color = 0x94a3b8) => {
        const mid = from.clone().add(to).multiplyScalar(0.5);
        const dir = to.clone().sub(from).normalize();
        const len = from.distanceTo(to);
        const cyl = push(new THREE.Mesh(bondMat, new THREE.MeshPhongMaterial({ color })));
        cyl.position.copy(mid);
        cyl.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
        cyl.scale.set(1, len, 1);
      };

      const drawDoubleBond = (from: THREE.Vector3, to: THREE.Vector3) => {
        const offset = new THREE.Vector3(0.12, 0.06, 0);
        drawBond(from.clone().add(offset), to.clone().add(offset));
        drawBond(from.clone().sub(offset), to.clone().sub(offset));
      };

      const drawAtom = (pos: THREE.Vector3, color: number, label: string, r = 0.22) => {
        const sphere = push(new THREE.Mesh(
          new THREE.SphereGeometry(r, 14, 14),
          new THREE.MeshPhongMaterial({ color, emissive: color, emissiveIntensity: 0.15 }),
        ));
        sphere.position.copy(pos);
        push(mkSprite(label, `#${color.toString(16).padStart(6, "0")}`, pos.clone().add(new THREE.Vector3(0.4, 0.4, 0)), 0.5));
      };

      const updateScene = () => {
        while (meshes.length > 15) {
          const m = meshes.pop()!;
          scene.remove(m);
          if (m instanceof THREE.Mesh) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Sprite) { (m.material as THREE.SpriteMaterial).map?.dispose?.(); m.material.dispose(); }
          else if (m instanceof THREE.Line) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
        }

        const mol = molecule === "methane" ? "methane" :
                     molecule === "ethene" ? "ethene" :
                     molecule === "ethyne" ? "ethyne" :
                     molecule === "ethanol" ? "ethanol" :
                     molecule === "ethanal" ? "ethanal" : "ethanoic acid";

        if (mol === "methane") {
          // Tetrahedral CH₄
          const C = new THREE.Vector3(0, 0, 0);
          const H1 = new THREE.Vector3(0.8, 0.8, 0.8);
          const H2 = new THREE.Vector3(-0.8, -0.8, 0.8);
          const H3 = new THREE.Vector3(-0.8, 0.8, -0.8);
          const H4 = new THREE.Vector3(0.8, -0.8, -0.8);
          drawAtom(C, C_COLOR, "C");
          [H1, H2, H3, H4].forEach((h) => { drawBond(C, h); drawAtom(h, H_COLOR, "H"); });

          // Bond angle arrow
          const angleLabel = new THREE.Vector3(1.5, 1.5, 1.0);
          const angleTarget = C.clone().add(new THREE.Vector3(0.4, 0.4, 0.4));
          const aDir = angleTarget.clone().sub(angleLabel).normalize();
          const aLen = angleLabel.distanceTo(angleTarget);
          push(new LiveArrow(aDir, angleLabel, aLen * 0.7, 0xfbbf24, 0.25, 0.12));
          push(mkSprite("H-C-H = 109.5° (tetrahedral)", "#fbbf24", angleLabel.clone().sub(aDir.multiplyScalar(0.5)), 0.65));
        }
        else if (mol === "ethene") {
          const C1 = new THREE.Vector3(-0.6, 0, 0);
          const C2 = new THREE.Vector3(0.6, 0, 0);
          const H1 = new THREE.Vector3(-1.2, 0.9, 0);
          const H2 = new THREE.Vector3(-1.2, -0.9, 0);
          const H3 = new THREE.Vector3(1.2, 0.9, 0);
          const H4 = new THREE.Vector3(1.2, -0.9, 0);
          drawAtom(C1, C_COLOR, "C");
          drawAtom(C2, C_COLOR, "C");
          drawBond(C1, C2, 0xf97316);
          drawDoubleBond(C1, C2);
          [H1, H2, H3, H4].forEach((h) => { drawBond([C1, C2].at([H1, H2, H3, H4].indexOf(h) % 2 === 0 ? 0 : 1) as THREE.Vector3, h); drawAtom(h, H_COLOR, "H"); });
          drawBond(C1, H1); drawBond(C1, H2); drawBond(C2, H3); drawBond(C2, H4);
          [H1, H2, H3, H4].forEach((h) => drawAtom(h, H_COLOR, "H"));

          // Label for pi bond
          const piLabel = new THREE.Vector3(0, 1.8, 0.8);
          const piTarget = new THREE.Vector3(0, 0, 0.3);
          const pDir = piTarget.clone().sub(piLabel).normalize();
          const pLen = piLabel.distanceTo(piTarget);
          push(new LiveArrow(pDir, piLabel, pLen * 0.75, 0xf97316, 0.25, 0.12));
          push(mkSprite("C=C: sigma + pi bond", "#f97316", piLabel.clone().sub(pDir.multiplyScalar(0.5)), 0.7));
        }
        else if (mol === "ethyne") {
          const C1 = new THREE.Vector3(-0.6, 0, 0);
          const C2 = new THREE.Vector3(0.6, 0, 0);
          const H1 = new THREE.Vector3(-1.5, 0, 0);
          const H2 = new THREE.Vector3(1.5, 0, 0);
          drawAtom(C1, C_COLOR, "C");
          drawAtom(C2, C_COLOR, "C");
          drawBond(C1, C2, 0x22d3ee);
          // Triple bond
          push(new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1, 8), new THREE.MeshPhongMaterial({ color: 0x22d3ee })).applyMatrix4(new THREE.Matrix4().makeTranslation((C1.x+C2.x)/2, 0.15, 0).multiply(new THREE.Matrix4().makeScale(1, C1.distanceTo(C2), 1))) as any);
          push(new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1, 8), new THREE.MeshPhongMaterial({ color: 0x22d3ee })).applyMatrix4(new THREE.Matrix4().makeTranslation((C1.x+C2.x)/2, -0.15, 0).multiply(new THREE.Matrix4().makeScale(1, C1.distanceTo(C2), 1))) as any);
          drawBond(C1, H1); drawBond(C2, H2);
          drawAtom(H1, H_COLOR, "H"); drawAtom(H2, H_COLOR, "H");

          const lLabel = new THREE.Vector3(0, 1.5, 0);
          const lTarget = new THREE.Vector3(0, 0, 0);
          const lDir = lTarget.clone().sub(lLabel).normalize();
          const lLen = lLabel.distanceTo(lTarget);
          push(new LiveArrow(lDir, lLabel, lLen * 0.7, 0x22d3ee, 0.25, 0.12));
          push(mkSprite("C≡C: 2 pi bonds, linear 180°", "#22d3ee", lLabel.clone().sub(lDir.multiplyScalar(0.5)), 0.7));
        }
        else if (mol === "ethanol") {
          const C1 = new THREE.Vector3(-0.8, 0, 0);
          const C2 = new THREE.Vector3(0.5, 0.3, 0);
          const O = new THREE.Vector3(0.5, 1.0, 0);
          const H_O = new THREE.Vector3(1.2, 1.2, 0);
           const Hs = [new THREE.Vector3(-1.3, -0.5, 0.5), new THREE.Vector3(-1.3, -0.5, -0.5), new THREE.Vector3(-1.3, 0.8, 0), new THREE.Vector3(0.0, -0.3, 0.6), new THREE.Vector3(0.0, -0.3, -0.6)];
           drawAtom(C1, C_COLOR, "C");
           drawAtom(C2, C_COLOR, "C");
           drawAtom(O, O_COLOR, "O");
           drawAtom(H_O, H_COLOR, "H");
           Hs.forEach((h) => drawAtom(h, H_COLOR, "H"));
           drawBond(C1, C2); drawBond(C2, O); drawBond(O, H_O);
           drawBond(C1, Hs[0]); drawBond(C1, Hs[1]); drawBond(C1, Hs[2]);
           drawBond(C2, Hs[3]); drawBond(C2, Hs[4]);

          const fgLabel = new THREE.Vector3(1.5, 1.8, 0);
          const fgTarget = O.clone();
          const fgDir = fgTarget.clone().sub(fgLabel).normalize();
          const fgLen = fgLabel.distanceTo(fgTarget);
          push(new LiveArrow(fgDir, fgLabel, fgLen * 0.75, 0xef4444, 0.28, 0.12));
          push(mkSprite("Functional Group: -OH (hydroxyl)", "#ef4444", fgLabel.clone().sub(fgDir.multiplyScalar(0.5)), 0.7));
        }
        else if (mol === "ethanal") {
          const C1 = new THREE.Vector3(-0.8, 0, 0);
          const C2 = new THREE.Vector3(0.6, 0, 0);
          const O = new THREE.Vector3(0.6, 1.0, 0);
          const H_C2 = new THREE.Vector3(1.4, -0.3, 0);
           const Hs = [new THREE.Vector3(-1.3, -0.5, 0.5), new THREE.Vector3(-1.3, -0.5, -0.5), new THREE.Vector3(-1.3, 0.8, 0)];
           drawAtom(C1, C_COLOR, "C");
           drawAtom(C2, C_COLOR, "C");
           drawAtom(O, O_COLOR, "O");
           drawAtom(H_C2, H_COLOR, "H");
           Hs.forEach((h) => drawAtom(h, H_COLOR, "H"));
           drawBond(C1, C2);
           drawDoubleBond(C2, O);
           drawBond(C1, Hs[0]); drawBond(C1, Hs[1]); drawBond(C1, Hs[2]);
           drawBond(C2, H_C2);

          const fgLabel = new THREE.Vector3(1.2, 1.5, 0);
          const fgTarget = new THREE.Vector3(0.6, 0.5, 0);
          const fgDir = fgTarget.clone().sub(fgLabel).normalize();
          const fgLen = fgLabel.distanceTo(fgTarget);
          push(new LiveArrow(fgDir, fgLabel, fgLen * 0.75, 0xef4444, 0.28, 0.12));
          push(mkSprite("Aldehyde group: -CHO (C=O at end)", "#ef4444", fgLabel.clone().sub(fgDir.multiplyScalar(0.5)), 0.7));
        }
        else { // ethanoic acid
          const C1 = new THREE.Vector3(-1.0, 0, 0);
          const C2 = new THREE.Vector3(0.5, 0, 0);
          const O1 = new THREE.Vector3(0.5, 1.0, 0);
          const O2 = new THREE.Vector3(1.5, 0, 0);
          const H_O2 = new THREE.Vector3(2.2, 0.5, 0);
          const Hs = [new THREE.Vector3(-1.5, -0.5, 0.5), new THREE.Vector3(-1.5, -0.5, -0.5), new THREE.Vector3(-1.5, 0.8, 0)];
          drawAtom(C1, C_COLOR, "C");
          drawAtom(C2, C_COLOR, "C");
          drawAtom(O1, O_COLOR, "O");
          drawAtom(O2, O_COLOR, "O");
          drawAtom(H_O2, H_COLOR, "H");
           Hs.forEach((h) => drawAtom(h, H_COLOR, "H"));
           drawBond(C1, C2);
           drawDoubleBond(C2, O1);
           drawBond(C2, O2); drawBond(O2, H_O2);
           drawBond(C1, Hs[0]); drawBond(C1, Hs[1]); drawBond(C1, Hs[2]);

          const fgLabel = new THREE.Vector3(2.5, 1.5, 0);
          const fgTarget = new THREE.Vector3(1.5, 0.3, 0);
          const fgDir = fgTarget.clone().sub(fgLabel).normalize();
          const fgLen = fgLabel.distanceTo(fgTarget);
          push(new LiveArrow(fgDir, fgLabel, fgLen * 0.75, 0xef4444, 0.28, 0.12));
          push(mkSprite("Carboxyl group: -COOH", "#ef4444", fgLabel.clone().sub(fgDir.multiplyScalar(0.5)), 0.7));
        }

        // Molecule info
        const m = MOLECULES[molecule];
        push(mkSprite(`${m.formula}  |  Shape: ${m.shape}  |  Angle: ${m.bondAngle}  |  Hybrid: ${m.hybrid}`, "#7dd3fc", new THREE.Vector3(0, -2.5, 0), 0.65));
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
  }, [molecule, isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="Organic Molecules" description="Ball-and-stick molecular models — requires WebGL." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Organic Molecules — Ball-and-Stick Models</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate · Scroll to zoom</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Select Molecule">
          <div className="flex flex-wrap gap-2 mt-1">
            {Object.entries(MOLECULES).map(([key, m]) => (
              <button
                key={key}
                onClick={() => setMolecule(key as MolKey)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  molecule === key ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {m.formula}
              </button>
            ))}
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-purple-500/30 bg-purple-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-purple-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">sp³ hybridization:</strong> 4σ bonds, tetrahedral geometry (109.5°). Example: CH₄, C₂H₅OH.</p>
            <p><strong className="text-foreground">sp² hybridization:</strong> 3σ + 1π bond, trigonal planar (120°). Example: C₂H₄, CH₃CHO, CH₃COOH.</p>
            <p><strong className="text-foreground">sp hybridization:</strong> 2σ + 2π bonds, linear (180°). Example: C₂H₂.</p>
            <p><strong className="text-foreground">Functional groups:</strong> -OH (alcohol), -CHO (aldehyde), -COOH (carboxylic acid) determine reactivity.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
