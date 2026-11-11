"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallback } from "@/components/lab/webgl-fallback";
import { VizToolbar, type VizTarget } from "@/components/viz/viz-toolbar";
import {
  ScenePresets,
  ReadoutGrid,
  type ScenePreset,
} from "@/components/lab/scene-interactivity";
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
  ctx.font = "bold 26px monospace";
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

type Molecule = "water" | "oxygen" | "carbon-dioxide" | "methane";

export function CovalentBondVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const vizTargetRef = useRef<VizTarget>({});
  const [molecule, setMolecule] = useState<Molecule>("water");
  const [showLabels, setShowLabels] = useState(true);
  const [runId, setRunId] = useState(0);
  const [isWebGL] = useState(() => isWebGLAvailable());

  const MOL_INFO: Record<Molecule, { shape: string; angle: string; bonds: number; polarity: string }> = {
    water: { shape: "Bent", angle: "104.5°", bonds: 2, polarity: "Polar" },
    oxygen: { shape: "Linear", angle: "—", bonds: 2, polarity: "Nonpolar" },
    "carbon-dioxide": { shape: "Linear", angle: "180°", bonds: 4, polarity: "Nonpolar" },
    methane: { shape: "Tetrahedral", angle: "109.5°", bonds: 4, polarity: "Nonpolar" },
  };
  const info = MOL_INFO[molecule];

  const DEFAULTS = { molecule: "water" as Molecule };
  const presets: ScenePreset[] = [
    {
      name: "H₂O (bent)",
      hint: "Two lone pairs squeeze the bond angle to 104.5° — a polar molecule.",
      apply: () => { setMolecule("water"); setRunId((r) => r + 1); },
    },
    {
      name: "O₂ (double bond)",
      hint: "A double bond — two shared electron pairs, linear and nonpolar.",
      apply: () => { setMolecule("oxygen"); setRunId((r) => r + 1); },
    },
    {
      name: "CO₂ (linear)",
      hint: "Two double bonds on opposite sides — bond dipoles cancel, so nonpolar.",
      apply: () => { setMolecule("carbon-dioxide"); setRunId((r) => r + 1); },
    },
    {
      name: "CH₄ (tetrahedral)",
      hint: "Four equivalent bonds at 109.5° — the classic VSEPR tetrahedron.",
      apply: () => { setMolecule("methane"); setRunId((r) => r + 1); },
    },
  ];

  const resetAll = () => {
    setMolecule(DEFAULTS.molecule);
    setShowLabels(true);
    setRunId((r) => r + 1);
  };


  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isWebGL) return;

    let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer;
    let controls: any, frameId: number;
    const meshes: THREE.Object3D[] = [];
    const bondMeshes: THREE.Group[] = [];
    const labelSprites: THREE.Sprite[] = [];

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
      controls.autoRotateSpeed = 0.5;
      controls.minDistance = 3;
      controls.maxDistance = 15;
      vizTargetRef.current = { controls, el: container, canvasEl: renderer.domElement, setLabels: (on: boolean) => labelSprites.forEach((s) => (s.visible = on)) };

      scene.add(new THREE.AmbientLight(0xffffff, 0.7));
      const dir = new THREE.DirectionalLight(0xffffff, 1.0);
      dir.position.set(6, 10, 6);
      scene.add(dir);

      const push = <T extends THREE.Object3D>(o: T): T => { scene.add(o); meshes.push(o); return o; };
      const syncLabels = () => {
        labelSprites.length = 0;
        scene.traverse((o) => {
          if ((o as THREE.Sprite).isSprite) { labelSprites.push(o as THREE.Sprite); (o as THREE.Sprite).visible = showLabels; }
        });
      };
      const pushBond = <T extends THREE.Object3D>(o: T): T => { const g = new THREE.Group(); g.add(o); scene.add(g); bondMeshes.push(g); meshes.push(g); return o; };

      const clearDynamic = () => {
        while (meshes.length > 2) {
          const m = meshes.pop()!;
          scene.remove(m);
          if (m instanceof THREE.Mesh) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Sprite) { const sm = m.material as THREE.SpriteMaterial; sm.map?.dispose?.(); sm.dispose(); }
        }
        while (bondMeshes.length > 0) {
          const g = bondMeshes.pop()!;
          scene.remove(g);
          g.traverse((c) => {
            if ((c as THREE.Mesh).geometry) (c as THREE.Mesh).geometry.dispose();
            const mat = (c as THREE.Mesh).material;
            if (mat && !(mat instanceof Array)) mat.dispose();
          });
        }
      };

      const buildWater = () => {
        clearDynamic();
        const oSphere = push(new THREE.Mesh(
          new THREE.SphereGeometry(0.7, 24, 24),
          new THREE.MeshPhongMaterial({ color: 0xef4444, emissive: 0x991b1b, shininess: 80 }),
        ));
        oSphere.position.set(0, 0, 0);
        oSphere.add(mkSprite("O", "#ef4444", new THREE.Vector3(0, 1.0, 0)));

        const bondLength = 1.2;
        const angle = 52.25 * (Math.PI / 180);
        const hPositions = [
          new THREE.Vector3(bondLength * Math.sin(angle), bondLength * Math.cos(angle), 0),
          new THREE.Vector3(-bondLength * Math.sin(angle), bondLength * Math.cos(angle), 0),
        ];

        hPositions.forEach((pos) => {
          const hSphere = push(new THREE.Mesh(
            new THREE.SphereGeometry(0.35, 20, 20),
            new THREE.MeshPhongMaterial({ color: 0xf8fafc, emissive: 0xe2e8f0, shininess: 60 }),
          ));
          hSphere.position.copy(pos);
          hSphere.add(mkSprite("H", "#f8fafc", new THREE.Vector3(0, 0.5, 0)));

          const bondGeo = new THREE.CylinderGeometry(0.08, 0.08, bondLength, 8);
          const bond = new THREE.Mesh(bondGeo, new THREE.MeshPhongMaterial({ color: 0x60a5fa, transparent: true, opacity: 0.7 }));
          const midPoint = pos.clone().multiplyScalar(0.5);
          bond.position.copy(midPoint);
          bond.lookAt(pos);
          bond.rotateX(Math.PI / 2);
          push(bond);
        });

        const lpPositions = [new THREE.Vector3(0.5, -0.4, 0.3), new THREE.Vector3(-0.5, -0.4, 0.3)];
        lpPositions.forEach((pos) => {
          const lp = push(new THREE.Mesh(
            new THREE.SphereGeometry(0.2, 12, 12),
            new THREE.MeshPhongMaterial({ color: 0xfbbf24, emissive: 0x92400e, transparent: true, opacity: 0.6 }),
          ));
          lp.position.copy(pos);
        });
        push(mkSprite("Bent shape · 104.5° · Polar covalent", "#60a5fa", new THREE.Vector3(0, -2.8, 0), 0.85));
      };

      const buildOxygen = () => {
        clearDynamic();
        const spacing = 1.4;
        const o1 = push(new THREE.Mesh(
          new THREE.SphereGeometry(0.6, 24, 24),
          new THREE.MeshPhongMaterial({ color: 0xef4444, emissive: 0x991b1b, shininess: 80 }),
        ));
        o1.position.set(-spacing / 2, 0, 0);
        o1.add(mkSprite("O", "#ef4444", new THREE.Vector3(-0.3, 0.9, 0)));

        const o2 = push(new THREE.Mesh(
          new THREE.SphereGeometry(0.6, 24, 24),
          new THREE.MeshPhongMaterial({ color: 0xef4444, emissive: 0x991b1b, shininess: 80 }),
        ));
        o2.position.set(spacing / 2, 0, 0);
        o2.add(mkSprite("O", "#ef4444", new THREE.Vector3(0.3, 0.9, 0)));

        const bondGeo = new THREE.TorusGeometry(0.25, 0.06, 8, 16, Math.PI);
        const bond1 = push(new THREE.Mesh(bondGeo, new THREE.MeshPhongMaterial({ color: 0x60a5fa })));
        bond1.position.set(0, 0.3, 0);
        bond1.rotateY(Math.PI / 2);
        const bond2 = push(new THREE.Mesh(bondGeo.clone(), new THREE.MeshPhongMaterial({ color: 0x60a5fa })));
        bond2.position.set(0, -0.3, 0);
        bond2.rotateY(Math.PI / 2);
        push(mkSprite("O=O Double bond · Linear · Nonpolar covalent", "#ef4444", new THREE.Vector3(0, -2.5, 0), 0.85));
      };

      const buildCO2 = () => {
        clearDynamic();
        const spacing = 1.3;
        const cSphere = push(new THREE.Mesh(
          new THREE.SphereGeometry(0.55, 24, 24),
          new THREE.MeshPhongMaterial({ color: 0x374151, emissive: 0x1f2937, shininess: 60 }),
        ));
        cSphere.position.set(0, 0, 0);
        cSphere.add(mkSprite("C", "#374151", new THREE.Vector3(0, 0.8, 0)));

        const oPositions = [new THREE.Vector3(-spacing, 0, 0), new THREE.Vector3(spacing, 0, 0)];
        oPositions.forEach((pos) => {
          const oSphere = push(new THREE.Mesh(
            new THREE.SphereGeometry(0.6, 24, 24),
            new THREE.MeshPhongMaterial({ color: 0xef4444, emissive: 0x991b1b, shininess: 80 }),
          ));
          oSphere.position.copy(pos);
          oSphere.add(mkSprite("O", "#ef4444", new THREE.Vector3(pos.x > 0 ? 0.3 : -0.3, 0.9, 0)));

          const bondGeo = new THREE.TorusGeometry(0.2, 0.05, 8, 16, Math.PI);
          const bond = push(new THREE.Mesh(bondGeo, new THREE.MeshPhongMaterial({ color: 0x60a5fa })));
          bond.position.lerp(pos, 0.5);
          bond.rotateY(Math.PI / 2);
        });
        push(mkSprite("O=C=O Linear · 180° · Nonpolar covalent", "#60a5fa", new THREE.Vector3(0, -2.5, 0), 0.85));
      };

      const buildCH4 = () => {
        clearDynamic();
        const cSphere = push(new THREE.Mesh(
          new THREE.SphereGeometry(0.6, 24, 24),
          new THREE.MeshPhongMaterial({ color: 0x374151, emissive: 0x1f2937, shininess: 60 }),
        ));
        cSphere.position.set(0, 0, 0);
        cSphere.add(mkSprite("C", "#374151", new THREE.Vector3(0, 0.9, 0)));

        const tetraDist = 1.3;
        const hPositions = [
          new THREE.Vector3(tetraDist, tetraDist, tetraDist).normalize().multiplyScalar(1.2),
          new THREE.Vector3(-tetraDist, -tetraDist, tetraDist).normalize().multiplyScalar(1.2),
          new THREE.Vector3(-tetraDist, tetraDist, -tetraDist).normalize().multiplyScalar(1.2),
          new THREE.Vector3(tetraDist, -tetraDist, -tetraDist).normalize().multiplyScalar(1.2),
        ];

        hPositions.forEach((pos) => {
          const hSphere = push(new THREE.Mesh(
            new THREE.SphereGeometry(0.35, 20, 20),
            new THREE.MeshPhongMaterial({ color: 0xf8fafc, emissive: 0xe2e8f0, shininess: 60 }),
          ));
          hSphere.position.copy(pos);
          hSphere.add(mkSprite("H", "#f8fafc", new THREE.Vector3(0, 0.5, 0)));

          const bondDir = pos.clone().normalize();
          const bondGeo = new THREE.CylinderGeometry(0.06, 0.06, 1.2, 8);
          const bond = new THREE.Mesh(bondGeo, new THREE.MeshPhongMaterial({ color: 0x60a5fa, transparent: true, opacity: 0.7 }));
          bond.position.copy(pos.clone().multiplyScalar(0.5));
          bond.lookAt(pos);
          bond.rotateX(Math.PI / 2);
          push(bond);
        });
        push(mkSprite("CH₄ Tetrahedral · 109.5° · Nonpolar covalent", "#60a5fa", new THREE.Vector3(0, -3.0, 0), 0.85));
      };

      const builders: Record<Molecule, () => void> = { water: buildWater, oxygen: buildOxygen, "carbon-dioxide": buildCO2, methane: buildCH4 };
      builders[molecule]();
      syncLabels();

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
      // Re-fit the canvas whenever the container itself resizes (screen fit)
      const resizeObserver = new ResizeObserver(() => handleResize());
      resizeObserver.observe(container);

      return () => {
        cancelAnimationFrame(frameId);
        window.removeEventListener("resize", handleResize);
        resizeObserver?.disconnect();
        if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
        meshes.forEach((m) => {
          scene.remove(m);
          if (m instanceof THREE.Mesh) { m.geometry?.dispose(); const mat = m.material; if (Array.isArray(mat)) mat.forEach((x) => x.dispose()); else (Array.isArray(mat) ? mat : [mat]).forEach((x) => x.dispose()); }
          else if (m instanceof THREE.Sprite) { const sm = m.material as THREE.SpriteMaterial; sm.map?.dispose?.(); sm.dispose(); }
        });
        bondMeshes.forEach((g) => {
          scene.remove(g);
          g.traverse((c) => {
            if ((c as THREE.Mesh).geometry) (c as THREE.Mesh).geometry.dispose();
            const mat = (c as THREE.Mesh).material;
            if (mat && !(mat instanceof Array)) mat.dispose();
          });
        });
        renderer.dispose();
        controls.dispose?.();
      };
    };

    const cleanup = init();
    return () => { cleanup.then((d) => d?.()); };
  }, [molecule, isWebGL, runId, showLabels]);

  if (!isWebGL) {
    return <WebGLFallback title="Covalent Bond" description="H₂O, O₂ molecular visualization — requires WebGL." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Covalent Bond — Molecular Structures</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate · Scroll to zoom</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <ScenePresets presets={presets} />
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowLabels((v) => !v)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${showLabels ? "border-blue-500/50 bg-blue-500/10 text-blue-300" : "border-border bg-muted/40 text-muted-foreground"}`}
            >
              Labels
            </button>
            <button
              onClick={resetAll}
              className="px-2.5 py-1 rounded-md text-xs font-medium border border-border bg-muted/40 text-muted-foreground hover:bg-muted/70 transition-colors"
              title="Reset to defaults"
            >
              Reset
            </button>
          </div>
        </div>

        <CollapsibleControls label="Select Molecule">
          <div className="grid grid-cols-4 gap-2 mt-1">
            {([
              { value: "water", label: "H₂O" },
              { value: "oxygen", label: "O₂" },
              { value: "carbon-dioxide", label: "CO₂" },
              { value: "methane", label: "CH₄" },
            ] as const).map((mol) => (
              <button
                key={mol.value}
                onClick={() => setMolecule(mol.value)}
                className={`px-2 py-2 text-xs rounded-md border transition-colors ${
                  molecule === mol.value ? "bg-blue-500/20 border-blue-500 text-blue-300" : "bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-500"
                }`}
              >
                {mol.label}
              </button>
            ))}
          </div>
        </CollapsibleControls>
        <div ref={containerRef} className="relative h-[clamp(320px,60vh,640px)] w-full overflow-hidden rounded-lg border border-border bg-slate-900">
          <VizToolbar targetRef={vizTargetRef} />
        </div>

        <ReadoutGrid
          items={[
            { label: "Molecular shape", value: info.shape },
            { label: "Bond angle", value: info.angle },
            { label: "Bond pairs", value: info.bonds },
            { label: "Polarity", value: info.polarity, highlight: info.polarity === "Polar" },
          ]}
        />

        <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Covalent bond:</strong> Sharing of electron pairs between atoms to achieve stable electron configuration.</p>
            <p><strong className="text-foreground">Single bond (O₂):</strong> One shared pair. <strong className="text-foreground">Double bond:</strong> Two shared pairs.</p>
            <p><strong className="text-foreground">Polar vs Nonpolar:</strong> H₂O is polar (unequal sharing); O₂, CO₂, CH₄ are nonpolar.</p>
            <p><strong className="text-foreground">Molecular geometry:</strong> Determined by VSEPR theory — electron pairs repel to maximize separation.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}