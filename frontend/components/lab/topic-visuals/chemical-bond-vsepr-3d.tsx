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
  ctx.font = "bold 24px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = color;
  ctx.fillText(text, 256, 48);
  const tex = new THREE.CanvasTexture(canvas);
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false }));
  s.position.copy(pos);
  s.scale.set(4.0 * scale, 0.75 * scale, 1);
  return s;
}

type Shape = "linear" | "trigonal-planar" | "tetrahedral" | "bent" | "trigonal-pyramidal" | "octahedral";

export function VSEPRVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shape, setShape] = useState<Shape>("tetrahedral");
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
      controls.autoRotateSpeed = 0.5;
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

      const buildLinear = () => {
        clearDynamic();
        const atomColor = 0x60a5fa;
        const central = push(new THREE.Mesh(
          new THREE.SphereGeometry(0.5, 20, 20),
          new THREE.MeshPhongMaterial({ color: atomColor, emissive: atomColor, emissiveIntensity: 0.3 }),
        ));
        central.position.set(0, 0, 0);
        central.add(mkSprite("A", "#60a5fa", new THREE.Vector3(0, 0.7, 0), 0.9));

        const bondMat = new THREE.MeshPhongMaterial({ color: 0x94a3b8 });
        [-1.5, 1.5].forEach((x) => {
          const atom = push(new THREE.Mesh(
            new THREE.SphereGeometry(0.35, 16, 16),
            new THREE.MeshPhongMaterial({ color: 0x22c55e, emissive: 0x166534, emissiveIntensity: 0.3 }),
          ));
          atom.position.set(x, 0, 0);
          atom.add(mkSprite("B", "#22c55e", new THREE.Vector3(0, 0.5, 0), 0.7));

          const bond = push(new THREE.Mesh(
            new THREE.CylinderGeometry(0.06, 0.06, 1.5, 8),
            bondMat,
          ));
          bond.position.set(x / 2, 0, 0);
          bond.rotateZ(Math.PI / 2);
        });

        const arcCurve = new THREE.EllipseCurve(0, 0, 0.5, 0.5, Math.PI, 0, false, 0);
        const arcPoints = arcCurve.getPoints(20).map((p) => new THREE.Vector3(p.x, p.y, 0));
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(arcPoints), new THREE.LineBasicMaterial({ color: 0xf59e0b })));
        push(mkSprite("Linear · 180 · AX2", "#60a5fa", new THREE.Vector3(0, -2.2, 0), 0.85));
      };

      const buildTrigonalPlanar = () => {
        clearDynamic();
        const angles = [0, 120, 240].map((deg) => deg * (Math.PI / 180));
        const radius = 1.5;

        const central = push(new THREE.Mesh(
          new THREE.SphereGeometry(0.5, 20, 20),
          new THREE.MeshPhongMaterial({ color: 0x60a5fa, emissive: 0x60a5fa, emissiveIntensity: 0.3 }),
        ));
        central.position.set(0, 0, 0);
        central.add(mkSprite("A", "#60a5fa", new THREE.Vector3(0, 0.7, 0), 0.9));

        const bondMat = new THREE.MeshPhongMaterial({ color: 0x94a3b8 });
        angles.forEach((a, i) => {
          const pos = new THREE.Vector3(Math.cos(a) * radius, Math.sin(a) * radius, 0);
          const atom = push(new THREE.Mesh(
            new THREE.SphereGeometry(0.35, 16, 16),
            new THREE.MeshPhongMaterial({ color: 0x22c55e, emissive: 0x166534, emissiveIntensity: 0.3 }),
          ));
          atom.position.copy(pos);
          atom.add(mkSprite("B", "#22c55e", pos.clone().normalize().multiplyScalar(0.6), 0.7));

          const bond = push(new THREE.Mesh(
            new THREE.CylinderGeometry(0.06, 0.06, radius, 8),
            bondMat,
          ));
          bond.position.copy(pos.clone().multiplyScalar(0.5));
          bond.lookAt(pos);
          bond.rotateX(Math.PI / 2);
        });
        push(mkSprite("Trigonal Planar · 120 · AX3", "#60a5fa", new THREE.Vector3(0, -2.2, 0), 0.85));
      };

      const buildTetrahedral = () => {
        clearDynamic();
        const radius = 1.5;
        const tetraPositions = [
          new THREE.Vector3(radius, radius, radius).normalize().multiplyScalar(radius),
          new THREE.Vector3(-radius, -radius, radius).normalize().multiplyScalar(radius),
          new THREE.Vector3(-radius, radius, -radius).normalize().multiplyScalar(radius),
          new THREE.Vector3(radius, -radius, -radius).normalize().multiplyScalar(radius),
        ];

        const central = push(new THREE.Mesh(
          new THREE.SphereGeometry(0.5, 20, 20),
          new THREE.MeshPhongMaterial({ color: 0x60a5fa, emissive: 0x60a5fa, emissiveIntensity: 0.3 }),
        ));
        central.position.set(0, 0, 0);
        central.add(mkSprite("A", "#60a5fa", new THREE.Vector3(0, 0.7, 0), 0.9));

        const bondMat = new THREE.MeshPhongMaterial({ color: 0x94a3b8 });
        tetraPositions.forEach((pos) => {
          const atom = push(new THREE.Mesh(
            new THREE.SphereGeometry(0.35, 16, 16),
            new THREE.MeshPhongMaterial({ color: 0x22c55e, emissive: 0x166534, emissiveIntensity: 0.3 }),
          ));
          atom.position.copy(pos);
          atom.add(mkSprite("B", "#22c55e", pos.clone().normalize().multiplyScalar(0.6), 0.7));

          const bond = push(new THREE.Mesh(
            new THREE.CylinderGeometry(0.06, 0.06, pos.length(), 8),
            bondMat,
          ));
          bond.position.copy(pos.clone().multiplyScalar(0.5));
          bond.lookAt(pos);
          bond.rotateX(Math.PI / 2);
        });
        push(mkSprite("Tetrahedral · 109.5 · AX4 (CH4)", "#60a5fa", new THREE.Vector3(0, -2.5, 0), 0.85));
      };

      const buildBent = () => {
        clearDynamic();
        const central = push(new THREE.Mesh(
          new THREE.SphereGeometry(0.5, 20, 20),
          new THREE.MeshPhongMaterial({ color: 0x60a5fa, emissive: 0x60a5fa, emissiveIntensity: 0.3 }),
        ));
        central.position.set(0, 0, 0);
        central.add(mkSprite("A", "#60a5fa", new THREE.Vector3(0, 0.7, 0), 0.9));

        const lp1 = push(new THREE.Mesh(
          new THREE.SphereGeometry(0.25, 12, 12),
          new THREE.MeshPhongMaterial({ color: 0xfbbf24, emissive: 0x92400e, emissiveIntensity: 0.5, transparent: true, opacity: 0.7 }),
        ));
        lp1.position.set(-0.4, 0.5, 0);

        const lp2 = push(new THREE.Mesh(
          new THREE.SphereGeometry(0.25, 12, 12),
          new THREE.MeshPhongMaterial({ color: 0xfbbf24, emissive: 0x92400e, emissiveIntensity: 0.5, transparent: true, opacity: 0.7 }),
        ));
        lp2.position.set(0.4, 0.5, 0);

        const bondMat = new THREE.MeshPhongMaterial({ color: 0x94a3b8 });
        const angle = 52.25 * (Math.PI / 180);
        const bondLength = 1.5;

        [-1, 1].forEach((sign) => {
          const pos = new THREE.Vector3(sign * bondLength * Math.sin(angle), bondLength * Math.cos(angle), 0);
          const atom = push(new THREE.Mesh(
            new THREE.SphereGeometry(0.35, 16, 16),
            new THREE.MeshPhongMaterial({ color: 0x22c55e, emissive: 0x166534, emissiveIntensity: 0.3 }),
          ));
          atom.position.copy(pos);
          atom.add(mkSprite("B", "#22c55e", new THREE.Vector3(0, 0.5, 0), 0.7));

          const bond = push(new THREE.Mesh(
            new THREE.CylinderGeometry(0.06, 0.06, bondLength, 8),
            bondMat,
          ));
          bond.position.copy(pos.clone().multiplyScalar(0.5));
          bond.lookAt(pos);
          bond.rotateX(Math.PI / 2);
        });
        push(mkSprite("Bent · ~104.5 · AX2E2 (H2O)", "#60a5fa", new THREE.Vector3(0, -2.2, 0), 0.85));
      };

      const buildTrigonalPyramidal = () => {
        clearDynamic();
        const central = push(new THREE.Mesh(
          new THREE.SphereGeometry(0.5, 20, 20),
          new THREE.MeshPhongMaterial({ color: 0x60a5fa, emissive: 0x60a5fa, emissiveIntensity: 0.3 }),
        ));
        central.position.set(0, 0.3, 0);
        central.add(mkSprite("A", "#60a5fa", new THREE.Vector3(0, 0.7, 0), 0.9));

        const lp = push(new THREE.Mesh(
          new THREE.SphereGeometry(0.25, 12, 12),
          new THREE.MeshPhongMaterial({ color: 0xfbbf24, emissive: 0x92400e, emissiveIntensity: 0.5, transparent: true, opacity: 0.7 }),
        ));
        lp.position.set(0, 0.9, 0);

        const baseY = -0.5;
        const radius = 1.3;
        const angles = [90, 210, 330].map((deg) => deg * (Math.PI / 180));

        const bondMat = new THREE.MeshPhongMaterial({ color: 0x94a3b8 });
        angles.forEach((a) => {
          const pos = new THREE.Vector3(Math.cos(a) * radius, baseY, Math.sin(a) * radius);
          const atom = push(new THREE.Mesh(
            new THREE.SphereGeometry(0.35, 16, 16),
            new THREE.MeshPhongMaterial({ color: 0x22c55e, emissive: 0x166534, emissiveIntensity: 0.3 }),
          ));
          atom.position.copy(pos);
          atom.add(mkSprite("B", "#22c55e", pos.clone().normalize().multiplyScalar(0.6), 0.7));

          const bond = push(new THREE.Mesh(
            new THREE.CylinderGeometry(0.06, 0.06, central.position.distanceTo(pos), 8),
            bondMat,
          ));
          bond.position.copy(central.position.clone().lerp(pos, 0.5));
          bond.lookAt(pos);
          bond.rotateX(Math.PI / 2);
        });
        push(mkSprite("Trigonal Pyramidal · 107 · AX3E (NH3)", "#60a5fa", new THREE.Vector3(0, -2.2, 0), 0.85));
      };

      const buildOctahedral = () => {
        clearDynamic();
        const radius = 1.5;

        const central = push(new THREE.Mesh(
          new THREE.SphereGeometry(0.5, 20, 20),
          new THREE.MeshPhongMaterial({ color: 0x60a5fa, emissive: 0x60a5fa, emissiveIntensity: 0.3 }),
        ));
        central.position.set(0, 0, 0);
        central.add(mkSprite("A", "#60a5fa", new THREE.Vector3(0, 0.7, 0), 0.9));

        const positions = [
          new THREE.Vector3(radius, 0, 0),
          new THREE.Vector3(-radius, 0, 0),
          new THREE.Vector3(0, radius, 0),
          new THREE.Vector3(0, -radius, 0),
          new THREE.Vector3(0, 0, radius),
          new THREE.Vector3(0, 0, -radius),
        ];

        const bondMat = new THREE.MeshPhongMaterial({ color: 0x94a3b8 });
        positions.forEach((pos) => {
          const atom = push(new THREE.Mesh(
            new THREE.SphereGeometry(0.35, 16, 16),
            new THREE.MeshPhongMaterial({ color: 0x22c55e, emissive: 0x166534, emissiveIntensity: 0.3 }),
          ));
          atom.position.copy(pos);
          atom.add(mkSprite("B", "#22c55e", pos.clone().normalize().multiplyScalar(0.6), 0.7));

          const bond = push(new THREE.Mesh(
            new THREE.CylinderGeometry(0.06, 0.06, radius, 8),
            bondMat,
          ));
          bond.position.copy(pos.clone().multiplyScalar(0.5));
          bond.lookAt(pos);
          bond.rotateX(Math.PI / 2);
        });
        push(mkSprite("Octahedral · 90 · AX6 (SF6)", "#60a5fa", new THREE.Vector3(0, -2.5, 0), 0.85));
      };

      const builders: Record<Shape, () => void> = {
        linear: buildLinear,
        "trigonal-planar": buildTrigonalPlanar,
        tetrahedral: buildTetrahedral,
        bent: buildBent,
        "trigonal-pyramidal": buildTrigonalPyramidal,
        octahedral: buildOctahedral,
      };

      builders[shape]();

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
  }, [shape, isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="VSEPR Theory" description="Molecular shapes visualization — requires WebGL." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>VSEPR Theory — Molecular Shapes</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate · Scroll to zoom</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Molecular Geometry">
          <div className="grid grid-cols-3 gap-2 mt-1">
            {([
              { value: "linear", label: "Linear" },
              { value: "trigonal-planar", label: "Trigonal Planar" },
              { value: "tetrahedral", label: "Tetrahedral" },
              { value: "bent", label: "Bent" },
              { value: "trigonal-pyramidal", label: "Trigonal Pyramidal" },
              { value: "octahedral", label: "Octahedral" },
            ] as const).map((s) => (
              <button
                key={s.value}
                onClick={() => setShape(s.value as Shape)}
                className={`px-2 py-2 text-xs rounded-md border transition-colors ${
                  shape === s.value ? "bg-violet-500/20 border-violet-500 text-violet-300" : "bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-500"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </CollapsibleControls>
        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />
        <div className="rounded-lg border border-violet-500/30 bg-violet-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-violet-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">VSEPR theory:</strong> Valence Shell Electron Pair Repulsion — electron pairs arrange to minimize repulsion.</p>
            <p><strong className="text-foreground">Bonding pairs:</strong> Shared electron pairs form bonds (shown as sticks).</p>
            <p><strong className="text-foreground">Lone pairs:</strong> Non-bonding electrons (shown as yellow spheres) repel more strongly than bonding pairs.</p>
            <p><strong className="text-foreground">AXnEm notation:</strong> A = central atom, X = bonded atoms, E = lone pairs.</p>
            <p><strong className="text-foreground">Examples:</strong> CH4 (tetrahedral, 109.5), H2O (bent, 104.5), NH3 (trigonal pyramidal, 107).</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}