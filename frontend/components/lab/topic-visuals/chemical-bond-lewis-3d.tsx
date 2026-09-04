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
  ctx.font = "bold 28px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = color;
  ctx.fillText(text, 256, 48);
  const tex = new THREE.CanvasTexture(canvas);
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false }));
  s.position.copy(pos);
  s.scale.set(3.6 * scale, 0.68 * scale, 1);
  return s;
}

type Molecule = "h2" | "h2o" | "co2" | "nh3" | "ch4" | "nacl";

export function LewisDotVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [molecule, setMolecule] = useState<Molecule>("h2o");
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

      const makeDot = (pos: THREE.Vector3, color: number = 0xfbbf24) => {
        const dot = push(new THREE.Mesh(
          new THREE.SphereGeometry(0.12, 12, 12),
          new THREE.MeshPhongMaterial({ color, emissive: color, emissiveIntensity: 0.5 }),
        ));
        dot.position.copy(pos);
        return dot;
      };

      const makeAtom = (text: string, color: string, pos: THREE.Vector3) => {
        return push(mkSprite(text, color, pos, 1.2));
      };

      const buildH2 = () => {
        clearDynamic();
        const h1 = makeAtom("H", "#f8fafc", new THREE.Vector3(-0.8, 0, 0));
        const h2 = makeAtom("H", "#f8fafc", new THREE.Vector3(0.8, 0, 0));
        makeDot(new THREE.Vector3(-0.15, 0.25, 0));
        makeDot(new THREE.Vector3(0.15, 0.25, 0));
        makeDot(new THREE.Vector3(-0.15, -0.25, 0));
        makeDot(new THREE.Vector3(0.15, -0.25, 0));
        const bondPoints = [new THREE.Vector3(-0.5, 0, 0), new THREE.Vector3(0.5, 0, 0)];
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(bondPoints), new THREE.LineBasicMaterial({ color: 0x60a5fa, linewidth: 2 })));
        push(mkSprite("H : H  (single bond, 2 shared e-)", "#60a5fa", new THREE.Vector3(0, -1.5, 0), 0.9));
      };

      const buildH2O = () => {
        clearDynamic();
        const oPos = new THREE.Vector3(0, 0, 0);
        const hLeft = new THREE.Vector3(-1.0, -0.5, 0);
        const hRight = new THREE.Vector3(1.0, -0.5, 0);
        makeAtom("O", "#ef4444", oPos);
        makeAtom("H", "#f8fafc", hLeft);
        makeAtom("H", "#f8fafc", hRight);
        makeDot(new THREE.Vector3(-0.3, 0.6, 0));
        makeDot(new THREE.Vector3(0.3, 0.6, 0));
        makeDot(new THREE.Vector3(-0.3, 0.8, 0));
        makeDot(new THREE.Vector3(0.3, 0.8, 0));
        const midLO = hLeft.clone().lerp(oPos, 0.5);
        const midRO = hRight.clone().lerp(oPos, 0.5);
        makeDot(midLO.clone().add(new THREE.Vector3(0, 0.15, 0)));
        makeDot(midLO.clone().add(new THREE.Vector3(0, -0.15, 0)));
        makeDot(midRO.clone().add(new THREE.Vector3(0, 0.15, 0)));
        makeDot(midRO.clone().add(new THREE.Vector3(0, -0.15, 0)));
        const bondMat = new THREE.LineBasicMaterial({ color: 0x60a5fa });
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([hLeft, oPos]), bondMat));
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([hRight, oPos]), bondMat));
        push(mkSprite("Bent · 2 lone pairs · Polar", "#ef4444", new THREE.Vector3(0, -1.8, 0), 0.9));
      };

      const buildCO2 = () => {
        clearDynamic();
        const cPos = new THREE.Vector3(0, 0, 0);
        const oLeft = new THREE.Vector3(-1.3, 0, 0);
        const oRight = new THREE.Vector3(1.3, 0, 0);
        makeAtom("C", "#374151", cPos);
        makeAtom("O", "#ef4444", oLeft);
        makeAtom("O", "#ef4444", oRight);
        makeDot(oLeft.clone().add(new THREE.Vector3(0.25, 0.2, 0)));
        makeDot(oLeft.clone().add(new THREE.Vector3(0.25, -0.2, 0)));
        makeDot(cPos.clone().add(new THREE.Vector3(-0.25, 0.2, 0)));
        makeDot(cPos.clone().add(new THREE.Vector3(-0.25, -0.2, 0)));
        makeDot(cPos.clone().add(new THREE.Vector3(0.25, 0.2, 0)));
        makeDot(cPos.clone().add(new THREE.Vector3(0.25, -0.2, 0)));
        makeDot(oRight.clone().add(new THREE.Vector3(-0.25, 0.2, 0)));
        makeDot(oRight.clone().add(new THREE.Vector3(-0.25, -0.2, 0)));
        const bondMat = new THREE.LineBasicMaterial({ color: 0x60a5fa });
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([oLeft, cPos]), bondMat));
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([cPos, oRight]), bondMat));
        makeDot(oLeft.clone().add(new THREE.Vector3(-0.4, 0.3, 0)));
        makeDot(oLeft.clone().add(new THREE.Vector3(-0.4, -0.3, 0)));
        makeDot(oRight.clone().add(new THREE.Vector3(0.4, 0.3, 0)));
        makeDot(oRight.clone().add(new THREE.Vector3(0.4, -0.3, 0)));
        push(mkSprite("O=C=O · Linear · 180 · Nonpolar", "#60a5fa", new THREE.Vector3(0, -1.5, 0), 0.9));
      };

      const buildNH3 = () => {
        clearDynamic();
        const nPos = new THREE.Vector3(0, 0.3, 0);
        const hPositions = [
          new THREE.Vector3(-0.9, -0.5, 0.4),
          new THREE.Vector3(0.9, -0.5, 0.4),
          new THREE.Vector3(0, -0.5, -0.8),
        ];
        makeAtom("N", "#60a5fa", nPos);
        hPositions.forEach((pos) => {
          makeAtom("H", "#f8fafc", pos);
          const mid = pos.clone().lerp(nPos, 0.5);
          makeDot(mid.clone().add(new THREE.Vector3(0, 0.15, 0)));
          makeDot(mid.clone().add(new THREE.Vector3(0, -0.15, 0)));
          push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([pos, nPos]), new THREE.LineBasicMaterial({ color: 0x60a5fa })));
        });
        makeDot(new THREE.Vector3(0, 0.9, 0));
        makeDot(new THREE.Vector3(0.2, 1.0, 0));
        makeDot(new THREE.Vector3(-0.2, 1.0, 0));
        push(mkSprite("Trigonal pyramidal · 1 lone pair · 107", "#60a5fa", new THREE.Vector3(0, -1.6, 0), 0.9));
      };

      const buildCH4 = () => {
        clearDynamic();
        const cPos = new THREE.Vector3(0, 0, 0);
        const hPositions = [
          new THREE.Vector3(0.9, 0.9, 0.9),
          new THREE.Vector3(-0.9, -0.9, 0.9),
          new THREE.Vector3(-0.9, 0.9, -0.9),
          new THREE.Vector3(0.9, -0.9, -0.9),
        ];
        makeAtom("C", "#374151", cPos);
        hPositions.forEach((pos) => {
          makeAtom("H", "#f8fafc", pos);
          const mid = pos.clone().multiplyScalar(0.5);
          makeDot(mid.clone().add(new THREE.Vector3(0, 0.15, 0)));
          makeDot(mid.clone().add(new THREE.Vector3(0, -0.15, 0)));
          push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([pos, cPos]), new THREE.LineBasicMaterial({ color: 0x60a5fa })));
        });
        push(mkSprite("Tetrahedral · 109.5 · Nonpolar", "#60a5fa", new THREE.Vector3(0, -2.0, 0), 0.9));
      };

      const buildNaCl = () => {
        clearDynamic();
        const naPos = new THREE.Vector3(-0.7, 0, 0);
        const clPos = new THREE.Vector3(0.7, 0, 0);
        makeAtom("Na+", "#3b82f6", naPos);
        makeAtom("Cl-", "#22c55e", clPos);
        const arrowHelper = new THREE.ArrowHelper(
          new THREE.Vector3(1, 0, 0).normalize(),
          naPos.clone().add(new THREE.Vector3(0.3, 0.3, 0)),
          0.4,
          0xfbbf24,
          0.2,
          0.15,
        );
        push(arrowHelper as any);
        const clDotPositions = [
          new THREE.Vector3(0.9, 0.3, 0), new THREE.Vector3(0.9, -0.3, 0),
          new THREE.Vector3(1.1, 0, 0), new THREE.Vector3(0.5, 0.3, 0),
          new THREE.Vector3(0.5, -0.3, 0), new THREE.Vector3(0.35, 0, 0),
          new THREE.Vector3(0.9, 0.15, 0.2), new THREE.Vector3(0.9, -0.15, 0.2),
        ];
        clDotPositions.forEach((pos) => makeDot(pos, 0x22c55e));
        push(mkSprite("Electron transfer → ionic bond", "#fbbf24", new THREE.Vector3(0, -1.5, 0), 0.9));
      };

      const builders: Record<Molecule, () => void> = { h2: buildH2, h2o: buildH2O, co2: buildCO2, nh3: buildNH3, ch4: buildCH4, nacl: buildNaCl };
      builders[molecule]();

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
          else if (m instanceof THREE.ArrowHelper) { m.dispose(); }
        });
        renderer.dispose();
        controls.dispose?.();
      };
    };

    const cleanup = init();
    return () => { cleanup.then((d) => d?.()); };
  }, [molecule, isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="Lewis Dot Structures" description="Valence electron dot structures — requires WebGL." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Lewis Dot Structures</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate · Scroll to zoom</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Select Molecule">
          <div className="grid grid-cols-3 gap-2 mt-1">
            {([
              { value: "h2", label: "H2" },
              { value: "h2o", label: "H2O" },
              { value: "co2", label: "CO2" },
              { value: "nh3", label: "NH3" },
              { value: "ch4", label: "CH4" },
              { value: "nacl", label: "NaCl" },
            ] as const).map((mol) => (
              <button
                key={mol.value}
                onClick={() => setMolecule(mol.value)}
                className={`px-2 py-2 text-xs rounded-md border transition-colors ${
                  molecule === mol.value ? "bg-amber-500/20 border-amber-500 text-amber-300" : "bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-500"
                }`}
              >
                {mol.label}
              </button>
            ))}
          </div>
        </CollapsibleControls>
        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Lewis dots:</strong> Each dot represents one valence electron around an atom symbol.</p>
            <p><strong className="text-foreground">Octet rule:</strong> Atoms tend to gain, lose, or share electrons to achieve 8 valence electrons.</p>
            <p><strong className="text-foreground">Bonding pairs:</strong> Shared electron pairs shown between atoms (lines or dot pairs).</p>
            <p><strong className="text-foreground">Lone pairs:</strong> Non-bonding electron pairs shown as dots on individual atoms.</p>
            <p><strong className="text-foreground">Ionic vs Covalent:</strong> NaCl shows electron transfer (ionic); H2O shows electron sharing (covalent).</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}