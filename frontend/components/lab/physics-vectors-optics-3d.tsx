"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

/* ============================================================
   Vector 3D Lab — Interactive 3D vector visualization
   ============================================================ */

function ArrowHelper3D(
  group: THREE.Group,
  origin: THREE.Vector3,
  end: THREE.Vector3,
  color: number,
  label: string,
  labelText: string,
) {
  const dir = new THREE.Vector3().subVectors(end, origin);
  const length = dir.length();
  if (length < 0.001) return;

  const arrow = new THREE.ArrowHelper(dir.normalize(), origin, length, color, 0.3, 0.15);
  group.add(arrow);

  // End sphere
  const sphereGeo = new THREE.SphereGeometry(0.12, 16, 16);
  const sphereMat = new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.3 });
  const sphere = new THREE.Mesh(sphereGeo, sphereMat);
  sphere.position.copy(end);
  group.add(sphere);

  // Label sprite
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 64;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "rgba(0,0,0,0)";
  ctx.fillRect(0, 0, 256, 64);
  ctx.font = "bold 36px sans-serif";
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.fillText(labelText, 128, 44);
  const tex = new THREE.CanvasTexture(canvas);
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true }));
  sprite.position.copy(end).add(new THREE.Vector3(0, 0.4, 0));
  sprite.scale.set(1.5, 0.4, 1);
  group.add(sprite);
}

function ComponentProjection(
  group: THREE.Group,
  origin: THREE.Vector3,
  tip: THREE.Vector3,
  color: number,
  projColor: number,
  label: string,
  ax: "x" | "y" | "z",
) {
  const tipCopy = tip.clone();
  if (ax === "x") tipCopy.x = origin.x;
  else if (ax === "y") tipCopy.y = origin.y;
  else tipCopy.z = origin.z;

  const lineGeo = new THREE.BufferGeometry().setFromPoints([origin, tipCopy]);
  const lineMat = new THREE.LineBasicMaterial({ color: projColor, transparent: true, opacity: 0.7 });
  const line = new THREE.Line(lineGeo, lineMat);
  group.add(line);

  // Dashed projection lines
  const perpEnd = new THREE.Vector3();
  if (ax === "x") { perpEnd.set(tip.x, origin.y, origin.z); }
  else if (ax === "y") { perpEnd.set(origin.x, tip.y, origin.z); }
  else { perpEnd.set(origin.x, origin.y, tip.z); }

  const perpGeo = new THREE.BufferGeometry().setFromPoints([tip, perpEnd]);
  const perpLine = new THREE.Line(perpGeo, new THREE.LineDashedMaterial({ color: projColor, transparent: true, opacity: 0.4, dashSize: 0.1, gapSize: 0.08 }));
  perpLine.computeLineDistances();
  group.add(perpLine);

  // Label
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 48;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "rgba(0,0,0,0)";
  ctx.fillRect(0, 0, 128, 48);
  ctx.font = "bold 28px sans-serif";
  ctx.fillStyle = "#" + projColor.toString(16).padStart(6, "0");
  ctx.textAlign = "center";
  ctx.fillText(label, 64, 34);
  const tex = new THREE.CanvasTexture(canvas);
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true }));
  const mid = new THREE.Vector3().addVectors(origin, tipCopy).multiplyScalar(0.5);
  sprite.position.copy(mid).add(new THREE.Vector3(0, -0.3, 0));
  sprite.scale.set(1, 0.4, 1);
  group.add(sprite);
}

export function Vectors3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [v1, setV1] = useState({ x: 3, y: 2, z: 1 });
  const [v2, setV2] = useState({ x: 1, y: 3, z: 2 });
  const [showComponents, setShowComponents] = useState(true);
  const [showResultant, setShowResultant] = useState(true);
  const [showAngles, setShowAngles] = useState(false);

  const v1v = new THREE.Vector3(v1.x, v1.y, v1.z);
  const v2v = new THREE.Vector3(v2.x, v2.y, v2.z);
  const result = new THREE.Vector3().addVectors(v1v, v2v);
  const mag1 = v1v.length();
  const mag2 = v2v.length();
  const magR = result.length();
  const angleBetween = Math.acos(Math.max(-1, Math.min(1, v1v.dot(v2v) / (mag1 * mag2)))) * (180 / Math.PI);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f172a);

    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(8, 6, 8);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;

    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const dir = new THREE.DirectionalLight(0xffffff, 1);
    dir.position.set(5, 10, 7);
    scene.add(dir);
    const dir2 = new THREE.DirectionalLight(0x6366f1, 0.4);
    dir2.position.set(-5, -3, -5);
    scene.add(dir2);

    // Grid
    const grid = new THREE.GridHelper(20, 20, 0x1e293b, 0x0f172a);
    scene.add(grid);

    // Axes
    const axesLen = 5;
    const axisColors = [0xef4444, 0x22c55e, 0x3b82f6];
    const axisLabels = ["X", "Y", "Z"];
    axisColors.forEach((c, i) => {
      const axisGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(i === 0 ? axesLen : 0, i === 1 ? axesLen : 0, i === 2 ? axesLen : 0)]);
      scene.add(new THREE.Line(axisGeo, new THREE.LineBasicMaterial({ color: c })));
      const canvas = document.createElement("canvas");
      canvas.width = 64; canvas.height = 64;
      const ctx = canvas.getContext("2d")!;
      ctx.font = "bold 48px sans-serif";
      ctx.fillStyle = "#" + c.toString(16).padStart(6, "0");
      ctx.textAlign = "center";
      ctx.fillText(axisLabels[i], 32, 48);
      const tex = new THREE.CanvasTexture(canvas);
      const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true }));
      sprite.position.set(i === 0 ? axesLen + 0.5 : 0, i === 1 ? axesLen + 0.5 : 0, i === 2 ? axesLen + 0.5 : 0);
      sprite.scale.set(0.8, 0.8, 1);
      scene.add(sprite);
    });

    const group = new THREE.Group();
    scene.add(group);

    function rebuild() {
      while (group.children.length) group.remove(group.children[0]);

      // v1 — cyan
      ArrowHelper3D(group, new THREE.Vector3(0, 0, 0), v1v, 0x22d3ee, "v1", `v₁(${v1.x}, ${v1.y}, ${v1.z})`);

      // v2 — orange (from tip of v1 for parallelogram)
      if (showResultant) {
        ArrowHelper3D(group, v1v.clone(), result, 0xf97316, "v2", `v₂(${v2.x}, ${v2.y}, ${v2.z})`);
      } else {
        ArrowHelper3D(group, new THREE.Vector3(0, 0, 0), v2v, 0xf97316, "v2", `v₂(${v2.x}, ${v2.y}, ${v2.z})`);
      }

      // Resultant — yellow
      if (showResultant) {
        ArrowHelper3D(group, new THREE.Vector3(0, 0, 0), result, 0xfbbf24, "R", `R(${result.x.toFixed(1)}, ${result.y.toFixed(1)}, ${result.z.toFixed(1)})`);
      }

      // Parallelogram edges
      if (showResultant) {
        const paraPts = [new THREE.Vector3(0, 0, 0), v1v.clone(), result.clone(), v2v.clone(), new THREE.Vector3(0, 0, 0)];
        const paraGeo = new THREE.BufferGeometry().setFromPoints(paraPts);
        group.add(new THREE.Line(paraGeo, new THREE.LineBasicMaterial({ color: 0x64748b, transparent: true, opacity: 0.4 })));
      }

      // Components
      if (showComponents) {
        const compColor = 0xa855f7;
        ComponentProjection(group, new THREE.Vector3(0, 0, 0), v1v, compColor, compColor, `v₁ₓ=${v1.x}`, "x");
        ComponentProjection(group, new THREE.Vector3(0, 0, 0), v1v, compColor, 0xec4899, `v₁ᵧ=${v1.y}`, "y");
        ComponentProjection(group, new THREE.Vector3(0, 0, 0), v1v, compColor, 0x22c55e, `v₁ᵧ=${v1.z}`, "z");
      }

      // Angle arcs
      if (showAngles && mag1 > 0 && mag2 > 0) {
        const angleGeo = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(0, 0, 0),
          v1v.clone().normalize().multiplyScalar(1.2),
        ]);
        group.add(new THREE.Line(angleGeo, new THREE.LineBasicMaterial({ color: 0xfbbf24 })));
      }
    }

    rebuild();

    let frameId: number;
    function animate() {
      frameId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }
    animate();

    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      controls.dispose();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [v1, v2, showComponents, showResultant, showAngles]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <p className="text-xs font-semibold text-cyan-400">Vector v₁</p>
          <div className="grid grid-cols-3 gap-2">
            {(["x", "y", "z"] as const).map((ax) => (
              <div key={ax}>
                <Label className="text-[10px] text-muted-foreground">{ax.toUpperCase()}</Label>
                <Input type="number" step="0.5" value={v1[ax]} onChange={(e) => setV1({ ...v1, [ax]: parseFloat(e.target.value) || 0 })} className="h-8 text-sm" />
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">|v₁| = {mag1.toFixed(2)}</p>
        </div>
        <div className="space-y-2">
          <p className="text-xs font-semibold text-orange-400">Vector v₂</p>
          <div className="grid grid-cols-3 gap-2">
            {(["x", "y", "z"] as const).map((ax) => (
              <div key={ax}>
                <Label className="text-[10px] text-muted-foreground">{ax.toUpperCase()}</Label>
                <Input type="number" step="0.5" value={v2[ax]} onChange={(e) => setV2({ ...v2, [ax]: parseFloat(e.target.value) || 0 })} className="h-8 text-sm" />
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">|v₂| = {mag2.toFixed(2)}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button variant={showResultant ? "default" : "outline"} size="sm" onClick={() => setShowResultant(!showResultant)}>Parallelogram</Button>
        <Button variant={showComponents ? "default" : "outline"} size="sm" onClick={() => setShowComponents(!showComponents)}>Show Components</Button>
        <Button variant={showAngles ? "default" : "outline"} size="sm" onClick={() => setShowAngles(!showAngles)}>Show Angles</Button>
        <Button variant="outline" size="sm" onClick={() => { setV1({ x: 3, y: 2, z: 1 }); setV2({ x: 1, y: 3, z: 2 }); }}>Reset</Button>
      </div>

      <div className="rounded-lg border border-border bg-muted/30 p-3 text-xs space-y-1">
        <p><span className="font-semibold text-cyan-400">v₁</span> = ({v1.x}, {v1.y}, {v1.z}) &nbsp;|&nbsp; <span className="font-semibold text-orange-400">v₂</span> = ({v2.x}, {v2.y}, {v2.z})</p>
        {showResultant && (
          <p><span className="font-semibold text-yellow-400">R = v₁ + v₂</span> = ({result.x.toFixed(1)}, {result.y.toFixed(1)}, {result.z.toFixed(1)}) &nbsp;|R| = {magR.toFixed(2)}</p>
        )}
        <p>Angle between v₁ and v₂: <span className="font-semibold text-amber-400">{angleBetween.toFixed(1)}°</span></p>
        <p className="text-muted-foreground">Dot product: v₁·v₂ = {(v1.x * v2.x + v1.y * v2.y + v1.z * v2.z).toFixed(2)}</p>
        <p className="text-muted-foreground">Cross product: v₁×v₂ = ({(v1.y * v2.z - v1.z * v2.y).toFixed(1)}, {(v1.z * v2.x - v1.x * v2.z).toFixed(1)}, {(v1.x * v2.y - v1.y * v2.x).toFixed(1)})</p>
      </div>

      <div ref={containerRef} className="lab-3d-container rounded-lg border border-border bg-slate-950" />

      <div className="rounded-lg border border-dashed border-border bg-muted/30 p-3 text-xs text-muted-foreground">
        <p className="font-semibold text-foreground mb-1">How to use:</p>
        <ul className="list-disc pl-4 space-y-0.5">
          <li>Adjust v₁ and v₂ components using the inputs above</li>
          <li><strong>Cyan arrow</strong> = v₁, <strong>Orange arrow</strong> = v₂ (placed at tip of v₁ for parallelogram rule)</li>
          <li><strong>Yellow arrow</strong> = Resultant R = v₁ + v₂ (from origin to opposite corner)</li>
          <li>Toggle <strong>Components</strong> to see x/y/z projections with dashed lines</li>
          <li>Toggle <strong>Parallelogram</strong> to show the parallelogram rule for vector addition</li>
          <li>Drag to rotate, scroll to zoom, right-drag to pan</li>
        </ul>
      </div>
    </div>
  );
}

/* ============================================================
   Optics 3D Lab — Rays, lenses, mirrors, refraction
   ============================================================ */

export function Optics3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"convex-lens" | "concave-lens" | "concave-mirror" | "convex-mirror" | "refraction">("convex-lens");
  const [objectDist, setObjectDist] = useState(6);
  const [focalLen, setFocalLen] = useState(3);
  const [objectHeight, setObjectHeight] = useState(2);

  // Lens/mirror equation: 1/v - 1/u = 1/f  (sign convention: u negative for real object)
  const u = -objectDist;
  const f = mode === "concave-lens" || mode === "convex-mirror" ? -focalLen : focalLen;
  const v = 1 / (1 / f - 1 / u);
  const magnification = v / u;
  const imageHeight = objectHeight * magnification;
  const imageReal = v > 0;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f172a);

    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 4, 16);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.8));
    const dir = new THREE.DirectionalLight(0xffffff, 0.8);
    dir.position.set(5, 10, 5);
    scene.add(dir);

    const group = new THREE.Group();
    scene.add(group);

    function rebuild() {
      while (group.children.length) group.remove(group.children[0]);

      const scale = 1.2;
      const lensX = 0;

      // Optical axis
      const axisGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-12 * scale, 0, 0),
        new THREE.Vector3(12 * scale, 0, 0),
      ]);
      group.add(new THREE.Line(axisGeo, new THREE.LineBasicMaterial({ color: 0x475569 })));

      // Lens / mirror shape
      if (mode === "convex-lens" || mode === "concave-lens") {
        // Actually for a proper lens shape use lathe
        const points: THREE.Vector2[] = [];
        if (mode === "convex-lens") {
          for (let i = 0; i <= 20; i++) {
            const t = i / 20;
            const y = (t - 0.5) * 3;
            const x = 0.15 + 0.35 * Math.cos(t * Math.PI);
            points.push(new THREE.Vector2(x, y));
          }
          for (let i = 20; i >= 0; i--) {
            const t = i / 20;
            const y = (t - 0.5) * 3;
            const x = 0.15 + 0.35 * Math.cos(t * Math.PI);
            points.push(new THREE.Vector2(-x, y));
          }
        } else {
          for (let i = 0; i <= 20; i++) {
            const t = i / 20;
            const y = (t - 0.5) * 3;
            const x = 0.1 + 0.5 * Math.abs(Math.sin(t * Math.PI));
            points.push(new THREE.Vector2(x, y));
          }
          for (let i = 20; i >= 0; i--) {
            const t = i / 20;
            const y = (t - 0.5) * 3;
            const x = 0.1 + 0.5 * Math.abs(Math.sin(t * Math.PI));
            points.push(new THREE.Vector2(-x, y));
          }
        }
        const lensGeo2 = new THREE.LatheGeometry(points, 32);
        const lensMat = new THREE.MeshPhysicalMaterial({
          color: 0x7dd3fc, transparent: true, opacity: 0.35,
          roughness: 0.05, metalness: 0.1, transmission: 0.8, thickness: 0.5,
        });
        const lensMesh = new THREE.Mesh(lensGeo2, lensMat);
        lensMesh.position.set(lensX, 0, 0);
        group.add(lensMesh);

        // Lens border
        const borderGeo = new THREE.TorusGeometry(1.6, 0.05, 8, 32);
        const borderMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8 });
        const border = new THREE.Mesh(borderGeo, borderMat);
        border.position.set(lensX, 0, 0);
        group.add(border);
      } else {
        // Mirror — curved surface
        const curve = new THREE.EllipseCurve(0, 0, 2.5, 3, 0, Math.PI, false, 0);
        const mirrorPts = curve.getPoints(40).map(p => new THREE.Vector3(p.x + lensX, p.y, 0));
        const mirrorGeo = new THREE.BufferGeometry().setFromPoints(mirrorPts);
        group.add(new THREE.Line(mirrorGeo, new THREE.LineBasicMaterial({ color: 0x94a3b8, linewidth: 2 })));

        // Mirror backing
        const backGeo = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(lensX, -3, 0),
          new THREE.Vector3(lensX, 3, 0),
        ]);
        group.add(new THREE.Line(backGeo, new THREE.LineBasicMaterial({ color: 0x475569 })));

        // Mirror surface
        if (mode === "concave-mirror") {
          const surfGeo = new THREE.SphereGeometry(6 * scale, 32, 16, 0, Math.PI, 0, Math.PI / 2);
          const surfMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.8, roughness: 0.2, side: THREE.DoubleSide });
          const surf = new THREE.Mesh(surfGeo, surfMat);
          surf.position.set(lensX - 3 * scale, 0, 0);
          surf.rotation.z = Math.PI / 2;
          group.add(surf);
        }
      }

      // Focal points
      const fDist = Math.abs(f) * scale;
      const fColor = mode === "concave-lens" || mode === "convex-mirror" ? 0xef4444 : 0x22c55e;
      [[-fDist, "F"] as [number, string], [fDist, "F"] as [number, string]].forEach(([x, label]) => {
        const dotGeo = new THREE.SphereGeometry(0.15, 12, 12);
        const dotMat = new THREE.MeshStandardMaterial({ color: fColor, emissive: fColor, emissiveIntensity: 0.5 });
        const dot = new THREE.Mesh(dotGeo, dotMat);
        dot.position.set(x, 0, 0);
        group.add(dot);
        const canvas = document.createElement("canvas");
        canvas.width = 64; canvas.height = 48;
        const ctx = canvas.getContext("2d")!;
        ctx.font = "bold 32px sans-serif";
        ctx.fillStyle = "#" + fColor.toString(16).padStart(6, "0");
        ctx.textAlign = "center";
        ctx.fillText(label, 32, 38);
        const tex = new THREE.CanvasTexture(canvas);
        const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true }));
        sprite.position.set(x, -0.6, 0);
        sprite.scale.set(0.8, 0.6, 1);
        group.add(sprite);
      });

      // Object arrow
      const objX = lensX - objectDist * scale;
      const objH = objectHeight * scale;
      const objGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(objX, 0, 0),
        new THREE.Vector3(objX, objH, 0),
      ]);
      group.add(new THREE.Line(objGeo, new THREE.LineBasicMaterial({ color: 0xf97316, linewidth: 2 })));
      // Arrowhead
      const headGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(objX, objH, 0),
        new THREE.Vector3(objX - 0.2, objH - 0.3, 0),
      ]);
      group.add(new THREE.Line(headGeo, new THREE.LineBasicMaterial({ color: 0xf97316 })));
      const headGeo2 = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(objX, objH, 0),
        new THREE.Vector3(objX + 0.2, objH - 0.3, 0),
      ]);
      group.add(new THREE.Line(headGeo2, new THREE.LineBasicMaterial({ color: 0xf97316 })));

      // Image arrow
      const imgX = lensX + v * scale;
      const imgH = imageHeight * scale;
      const imgColor = imageReal ? 0x22d3ee : 0xa855f7;
      const imgGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(imgX, 0, 0),
        new THREE.Vector3(imgX, imgH, 0),
      ]);
      group.add(new THREE.Line(imgGeo, new THREE.LineBasicMaterial({ color: imgColor, linewidth: 2, transparent: true, opacity: 0.8 })));
      if (Math.abs(imgH) > 0.1) {
        const iHead = imgH > 0 ? -0.3 : 0.3;
        const headG = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(imgX, imgH, 0),
          new THREE.Vector3(imgX - 0.15, imgH + iHead, 0),
        ]);
        group.add(new THREE.Line(headG, new THREE.LineBasicMaterial({ color: imgColor })));
        const headG2 = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(imgX, imgH, 0),
          new THREE.Vector3(imgX + 0.15, imgH + iHead, 0),
        ]);
        group.add(new THREE.Line(headG2, new THREE.LineBasicMaterial({ color: imgColor })));
      }

      // Ray diagram — 3 principal rays
      const rayColor = 0xfbbf24;
      const rays: [THREE.Vector3, THREE.Vector3][] = [];

      if (mode === "convex-lens" || mode === "concave-lens") {
        // Ray 1: parallel to axis → through far focal point
        const r1end = new THREE.Vector3(14 * scale, 0, 0);
        rays.push([new THREE.Vector3(objX, objH, 0), new THREE.Vector3(lensX, objH, 0)]);
        rays.push([new THREE.Vector3(lensX, objH, 0), r1end]);

        // Ray 2: through center → straight
        const r2dir = new THREE.Vector3(lensX - objX, -objH, 0).normalize();
        const r2end = new THREE.Vector3(lensX + r2dir.x * 14 * scale, objH + r2dir.y * 14 * scale, 0);
        rays.push([new THREE.Vector3(objX, objH, 0), r2end]);

        // Ray 3: through near focal point → parallel
        const _nearF = mode === "convex-lens" ? lensX - f * scale : lensX + Math.abs(f) * scale;
        const r3dir = new THREE.Vector3(lensX - objX, f * scale, 0);
        if (r3dir.length() > 0.01) {
          rays.push([new THREE.Vector3(objX, objH, 0), new THREE.Vector3(lensX, r3dir.y * (lensX - objX) / r3dir.x, 0)]);
          rays.push([new THREE.Vector3(lensX, r3dir.y * (lensX - objX) / r3dir.x, 0), new THREE.Vector3(14 * scale, r3dir.y * (lensX - objX) / r3dir.x, 0)]);
        }
      } else {
        // Mirror rays
        const nearF = mode === "concave-mirror" ? lensX - f * scale : lensX + Math.abs(f) * scale;
        // Ray 1: parallel → through focal point
        rays.push([new THREE.Vector3(objX, objH, 0), new THREE.Vector3(lensX, objH, 0)]);
        if (mode === "concave-mirror") {
          rays.push([new THREE.Vector3(lensX, objH, 0), new THREE.Vector3(nearF, 0, 0)]);
        } else {
          rays.push([new THREE.Vector3(lensX, objH, 0), new THREE.Vector3(lensX + 8 * scale, objH * 2, 0)]);
        }
        // Ray 2: through center → back on itself
        rays.push([new THREE.Vector3(objX, objH, 0), new THREE.Vector3(lensX - (mode === "concave-mirror" ? 1 : -1) * 6 * scale, 0, 0)]);
      }

      rays.forEach(([start, end]) => {
        const geo = new THREE.BufferGeometry().setFromPoints([start, end]);
        group.add(new THREE.Line(geo, new THREE.LineBasicMaterial({ color: rayColor, transparent: true, opacity: 0.7 })));
      });

      // V = 2F point
      const twoF = 2 * f * scale;
      const twoFGeo = new THREE.SphereGeometry(0.1, 8, 8);
      const twoFMat = new THREE.MeshStandardMaterial({ color: 0x64748b });
      [[-twoF, "2F"] as [number, string], [twoF, "2F"] as [number, string]].forEach(([x, lbl]) => {
        const dot = new THREE.Mesh(twoFGeo, twoFMat);
        dot.position.set(x, -0.3, 0);
        group.add(dot);
        const canvas = document.createElement("canvas");
        canvas.width = 64; canvas.height = 32;
        const ctx = canvas.getContext("2d")!;
        ctx.font = "bold 22px sans-serif";
        ctx.fillStyle = "#94a3b8";
        ctx.textAlign = "center";
        ctx.fillText(lbl, 32, 24);
        const tex = new THREE.CanvasTexture(canvas);
        const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true }));
        sprite.position.set(x, -0.7, 0);
        sprite.scale.set(0.6, 0.3, 1);
        group.add(sprite);
      });
    }

    rebuild();

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.autoRotate = false;

    let frameId: number;
    function animate() {
      frameId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }
    animate();

    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      controls.dispose();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, objectDist, focalLen, objectHeight]);

  return (
    <div className="space-y-4">
      <Tabs value={mode} onValueChange={(v) => setMode(v as any)}>
        <TabsList className="flex-wrap">
          <TabsTrigger value="convex-lens">Convex Lens</TabsTrigger>
          <TabsTrigger value="concave-lens">Concave Lens</TabsTrigger>
          <TabsTrigger value="concave-mirror">Concave Mirror</TabsTrigger>
          <TabsTrigger value="convex-mirror">Convex Mirror</TabsTrigger>
          <TabsTrigger value="refraction">Refraction</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <Label>Object Distance (u)</Label>
          <Input type="number" step="0.5" min="0.5" max="12" value={objectDist} onChange={(e) => setObjectDist(parseFloat(e.target.value) || 0)} />
        </div>
        <div>
          <Label>Focal Length (f)</Label>
          <Input type="number" step="0.5" min="0.5" max="8" value={focalLen} onChange={(e) => setFocalLen(parseFloat(e.target.value) || 0)} />
        </div>
        <div>
          <Label>Object Height</Label>
          <Input type="number" step="0.5" min="0.5" max="5" value={objectHeight} onChange={(e) => setObjectHeight(parseFloat(e.target.value) || 0)} />
        </div>
      </div>

      <div className="rounded-lg border border-border bg-muted/30 p-3 text-xs space-y-1">
        <p><span className="font-semibold">Lens/Mirror Eq:</span> 1/v − 1/u = 1/f &nbsp;|&nbsp; <span className="font-semibold">Magnification:</span> m = v/u</p>
        <p><span className="font-semibold text-orange-400">Object:</span> u = −{objectDist} &nbsp; <span className="font-semibold text-green-400">f = {focalLen}</span> &nbsp; <span className="font-semibold text-cyan-400">Image:</span> v = {v.toFixed(2)}</p>
        <p><span className="font-semibold">m = {magnification.toFixed(2)}</span> &nbsp;|&nbsp; Image height = {imageHeight.toFixed(2)} &nbsp;|&nbsp;
          {imageReal
            ? <span className="text-green-400"> Real, Inverted</span>
            : <span className="text-purple-400"> Virtual, Upright</span>}
        </p>
      </div>

      <div ref={containerRef} className="lab-3d-container rounded-lg border border-border bg-slate-950" />

      <div className="rounded-lg border border-dashed border-border bg-muted/30 p-3 text-xs text-muted-foreground">
        <p className="font-semibold text-foreground mb-1">Ray Diagram Rules:</p>
        <ul className="list-disc pl-4 space-y-0.5">
          <li><span className="text-yellow-400">Yellow rays</span> = principal rays used to locate the image</li>
          <li><span className="text-orange-400">Orange arrow</span> = object (upright)</li>
          <li><span className="text-cyan-400">Cyan arrow</span> = real image (inverted) &nbsp;|&nbsp; <span className="text-purple-400">Purple</span> = virtual image (upright)</li>
          <li>Green <strong>F</strong> = focal point &nbsp;|&nbsp; Gray <strong>2F</strong> = twice the focal distance</li>
          <li>Drag to rotate the 3D view &nbsp;|&nbsp; Scroll to zoom</li>
        </ul>
      </div>
    </div>
  );
}

/* ============================================================
   Refraction 3D Lab
   ============================================================ */

export function Refraction3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [n1, setN1] = useState(1.0);
  const [n2, setN2] = useState(1.5);
  const [incAngle, setIncAngle] = useState(45);

  const incRad = (incAngle * Math.PI) / 180;
  const sinRef = (n1 * Math.sin(incRad)) / n2;
  const refAngle = Math.asin(Math.min(1, sinRef)) * (180 / Math.PI);
  const criticalAngle = n1 > n2 ? Math.asin(n2 / n1) * (180 / Math.PI) : Infinity;
  const tir = n1 > n2 && incAngle > criticalAngle;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f172a);

    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 12);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const dir = new THREE.DirectionalLight(0xffffff, 1);
    dir.position.set(0, 5, 5);
    scene.add(dir);

    const group = new THREE.Group();
    scene.add(group);

    function rebuild() {
      if (!container) return;
      while (group.children.length) group.remove(group.children[0]);

      const W = container.clientWidth;
      const H = container.clientHeight;
      const scale = Math.min(W, H) / 16;

      // Medium 1 (top) — lighter
      const med1Geo = new THREE.PlaneGeometry(W / scale, H / (2 * scale));
      const med1Mat = new THREE.MeshStandardMaterial({
        color: n1 === 1 ? 0x0f172a : 0x1e3a5f,
        transparent: true, opacity: n1 === 1 ? 0.3 : 0.5,
      });
      const med1 = new THREE.Mesh(med1Geo, med1Mat);
      med1.position.y = H / (4 * scale);
      group.add(med1);

      // Medium 2 (bottom) — denser
      const med2Geo = new THREE.PlaneGeometry(W / scale, H / (2 * scale));
      const med2Mat = new THREE.MeshStandardMaterial({
        color: 0x1e3a5f,
        transparent: true, opacity: 0.4 + n2 * 0.1,
      });
      const med2 = new THREE.Mesh(med2Geo, med2Mat);
      med2.position.y = -H / (4 * scale);
      group.add(med2);

      // Interface line
      const ifaceGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-W / (2 * scale), 0, 0),
        new THREE.Vector3(W / (2 * scale), 0, 0),
      ]);
      group.add(new THREE.Line(ifaceGeo, new THREE.LineBasicMaterial({ color: 0x7dd3fc })));

      // Normal (dashed)
      const normalPts = [new THREE.Vector3(0, -H / (3 * scale), 0), new THREE.Vector3(0, H / (3 * scale), 0)];
      const normalGeo = new THREE.BufferGeometry().setFromPoints(normalPts);
      const normalLine = new THREE.Line(normalGeo, new THREE.LineDashedMaterial({ color: 0x94a3b8, dashSize: 0.3, gapSize: 0.2 }));
      normalLine.computeLineDistances();
      group.add(normalLine);

      // Ray calculations
      const rayLen = 5;
      const incDir = new THREE.Vector3(Math.sin(incRad), -Math.cos(incRad), 0);
      const incStart = new THREE.Vector3(-incDir.x * rayLen, incDir.y * rayLen, 0);
      const incEnd = new THREE.Vector3(0, 0, 0);

      // Incident ray
      const incGeo = new THREE.BufferGeometry().setFromPoints([incStart, incEnd]);
      group.add(new THREE.Line(incGeo, new THREE.LineBasicMaterial({ color: 0xfbbf24 })));
      // Arrowhead
      const incHeadDir = incDir.clone().normalize();
      const headPos = incEnd.clone().sub(incHeadDir.clone().multiplyScalar(0.3));
      const perp1 = new THREE.Vector3(-incHeadDir.y, incHeadDir.x, 0).multiplyScalar(0.15);
      const hGeo1 = new THREE.BufferGeometry().setFromPoints([headPos.clone().add(perp1), headPos.clone().sub(perp1)]);
      group.add(new THREE.Line(hGeo1, new THREE.LineBasicMaterial({ color: 0xfbbf24 })));

      if (tir) {
        // Total internal reflection
        const reflDir = new THREE.Vector3(incDir.x, -incDir.y, 0);
        const reflEnd = new THREE.Vector3(reflDir.x * rayLen, reflDir.y * rayLen, 0);
        const reflGeo = new THREE.BufferGeometry().setFromPoints([incEnd, reflEnd]);
        group.add(new THREE.Line(reflGeo, new THREE.LineBasicMaterial({ color: 0xf43f5e })));
        const rhDir = reflDir.clone().normalize();
        const rhPos = reflEnd.clone().sub(rhDir.clone().multiplyScalar(0.3));
        const rPerp1 = new THREE.Vector3(-rhDir.y, rhDir.x, 0).multiplyScalar(0.15);
        const rhGeo1 = new THREE.BufferGeometry().setFromPoints([rhPos.clone().add(rPerp1), rhPos.clone().sub(rPerp1)]);
        group.add(new THREE.Line(rhGeo1, new THREE.LineBasicMaterial({ color: 0xf43f5e })));
      } else {
        // Refracted ray
        const refDir = new THREE.Vector3(Math.sin(sinRef), Math.cos(sinRef), 0);
        const refEnd = new THREE.Vector3(refDir.x * rayLen, -refDir.y * rayLen, 0);
        const refGeo = new THREE.BufferGeometry().setFromPoints([incEnd, refEnd]);
        group.add(new THREE.Line(refGeo, new THREE.LineBasicMaterial({ color: 0x22d3ee })));
        const rfDir = refDir.clone().normalize();
        const rfPos = refEnd.clone().sub(rfDir.clone().multiplyScalar(0.3));
        const rfPerp = new THREE.Vector3(-rfDir.y, rfDir.x, 0).multiplyScalar(0.15);
        const rfGeo1 = new THREE.BufferGeometry().setFromPoints([rfPos.clone().add(rfPerp), rfPos.clone().sub(rfPerp)]);
        group.add(new THREE.Line(rfGeo1, new THREE.LineBasicMaterial({ color: 0x22d3ee })));
      }

      // Labels
      const makeLabel = (text: string, pos: THREE.Vector3, color: string) => {
        const canvas = document.createElement("canvas");
        canvas.width = 256; canvas.height = 64;
        const ctx = canvas.getContext("2d")!;
        ctx.font = "bold 36px sans-serif";
        ctx.fillStyle = color;
        ctx.textAlign = "center";
        ctx.fillText(text, 128, 44);
        const tex = new THREE.CanvasTexture(canvas);
        const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true }));
        sprite.position.copy(pos);
        sprite.scale.set(2, 0.5, 1);
        group.add(sprite);
      };

      makeLabel(`n₁ = ${n1}`, new THREE.Vector3(-3, 2.5, 0), "#94a3b8");
      makeLabel(`n₂ = ${n2}`, new THREE.Vector3(-3, -2.5, 0), "#7dd3fc");
      makeLabel(`θᵢ = ${incAngle.toFixed(0)}°`, new THREE.Vector3(2, 1.5, 0), "#fbbf24");
      if (!tir) {
        makeLabel(`θʳ = ${refAngle.toFixed(1)}°`, new THREE.Vector3(2, -1.5, 0), "#22d3ee");
      } else {
        makeLabel("TIR!", new THREE.Vector3(2, -1.5, 0), "#f43f5e");
      }
      if (n1 > n2) {
        makeLabel(`θc = ${criticalAngle.toFixed(1)}°`, new THREE.Vector3(-2, -3.5, 0), "#f43f5e");
      }
    }

    rebuild();

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.autoRotate = false;
    controls.enableZoom = false;

    let frameId: number;
    function animate() {
      frameId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }
    animate();

    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
      rebuild();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      controls.dispose();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [n1, n2, incAngle, sinRef, refAngle, tir, criticalAngle]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <div>
          <Label>n₁ (incident medium)</Label>
          <Input type="number" step="0.01" min="1" max="3" value={n1} onChange={(e) => setN1(parseFloat(e.target.value) || 1)} />
        </div>
        <div>
          <Label>n₂ (refracting medium)</Label>
          <Input type="number" step="0.01" min="1" max="3" value={n2} onChange={(e) => setN2(parseFloat(e.target.value) || 1.5)} />
        </div>
        <div>
          <Label>Incident Angle (°)</Label>
          <Input type="number" step="1" min="0" max="89" value={incAngle} onChange={(e) => setIncAngle(parseFloat(e.target.value) || 0)} />
        </div>
      </div>

      <div className="rounded-lg border border-border bg-muted/30 p-3 text-xs space-y-1">
        <p><span className="font-semibold">Snell's Law:</span> n₁ sin θᵢ = n₂ sin θʳ</p>
        <p>θᵢ = {incAngle}° &nbsp;|&nbsp; sin θʳ = {(n1 * Math.sin(incAngle * Math.PI / 180) / n2).toFixed(4)} &nbsp;|&nbsp; θʳ = {tir ? "— (TIR)" : refAngle.toFixed(1)}°</p>
        {n1 > n2 && <p>Critical angle θc = {criticalAngle.toFixed(1)}° &nbsp;→&nbsp; TIR when θᵢ &gt; θc</p>}
      </div>

      <div ref={containerRef} className="lab-3d-container rounded-lg border border-border bg-slate-950" />

      <div className="rounded-lg border border-dashed border-border bg-muted/30 p-3 text-xs text-muted-foreground">
        <p className="font-semibold text-foreground mb-1">How it works:</p>
        <ul className="list-disc pl-4 space-y-0.5">
          <li><span className="text-yellow-400">Yellow ray</span> = incident ray &nbsp;|&nbsp; <span className="text-cyan-400">Cyan ray</span> = refracted ray &nbsp;|&nbsp; <span className="text-rose-400">Red ray</span> = reflected ray (TIR)</li>
          <li>Increase n₂ to see the ray bend <strong>toward</strong> the normal</li>
          <li>Decrease n₂ below n₁ and increase angle → <strong>total internal reflection</strong></li>
          <li>Used in fiber optics, prisms, and lenses</li>
        </ul>
      </div>
    </div>
  );
}
