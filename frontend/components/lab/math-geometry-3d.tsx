"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallback } from "@/components/lab/webgl-fallback";
import * as THREE from "three";

function MeaningPanel({ title, meaning, points }: { title: string; meaning: string; points: string[] }) {
  return (
    <div className="rounded-md border border-primary/20 bg-primary/5 p-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-primary">📘 Concept & Why It Matters</p>
      <h4 className="mt-1 text-sm font-semibold">{title}</h4>
      <p className="mt-1 text-xs text-muted-foreground">{meaning}</p>
      {points.length > 0 && (
        <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
          {points.map((p, i) => (
            <li key={i} className="flex gap-1.5">
              <span className="text-primary" aria-hidden="true">•</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ============================================================
   2D Coordinate Plane (interactive x,y with visible axes)
   ============================================================ */

function CoordinatePlane2D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [point, setPoint] = useState({ x: 3, y: 2 });
  const [showAngle, setShowAngle] = useState(true);
  const [showComponents, setShowComponents] = useState(true);
  const [showCircle, setShowCircle] = useState(false);
  const [gridSize, setGridSize] = useState(5);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, rect.width, rect.height);

    const w = rect.width;
    const h = rect.height;
    const cx = w / 2;
    const cy = h / 2;
    const scale = Math.min(w, h) / (gridSize * 2.4);

    // Grid lines
    ctx.strokeStyle = "#1e293b";
    ctx.lineWidth = 1;
    for (let i = -gridSize; i <= gridSize; i++) {
      const x = cx + i * scale;
      const y = cy - i * scale;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Axes (thick, visible)
    ctx.strokeStyle = "#3b82f6";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, cy);
    ctx.lineTo(w, cy);
    ctx.stroke();
    ctx.strokeStyle = "#ef4444";
    ctx.beginPath();
    ctx.moveTo(cx, 0);
    ctx.lineTo(cx, h);
    ctx.stroke();

    // Axis arrowheads
    ctx.fillStyle = "#3b82f6";
    ctx.beginPath();
    ctx.moveTo(w - 8, cy - 6);
    ctx.lineTo(w - 8, cy + 6);
    ctx.lineTo(w, cy);
    ctx.fill();
    ctx.fillStyle = "#ef4444";
    ctx.beginPath();
    ctx.moveTo(cx - 6, 8);
    ctx.lineTo(cx + 6, 8);
    ctx.lineTo(cx, 0);
    ctx.fill();

    // Axis labels
    ctx.fillStyle = "#94a3b8";
    ctx.font = "13px Inter, system-ui, sans-serif";
    ctx.fillText("x", w - 16, cy - 10);
    ctx.fillText("y", cx + 10, 14);

    // Tick labels
    ctx.font = "10px Inter, system-ui, sans-serif";
    ctx.fillStyle = "#64748b";
    for (let i = -gridSize; i <= gridSize; i++) {
      if (i === 0) continue;
      ctx.fillText(String(i), cx + i * scale + 4, cy + 14);
      ctx.fillText(String(i), cx + 6, cy - i * scale - 4);
    }
    ctx.fillStyle = "#fbbf24";
    ctx.fillText("O", cx + 6, cy + 14);

    // Unit circle
    if (showCircle) {
      ctx.strokeStyle = "#a855f7";
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 3]);
      ctx.beginPath();
      ctx.arc(cx, cy, scale, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Point
    const px = cx + point.x * scale;
    const py = cy - point.y * scale;

    // Components
    if (showComponents) {
      ctx.fillStyle = "#22c55e";
      ctx.globalAlpha = 0.3;
      ctx.fillRect(cx, py, px - cx, cy - py);
      ctx.globalAlpha = 1;
    }

    // Angle arc
    if (showAngle && (point.x !== 0 || point.y !== 0)) {
      const angle = Math.atan2(point.y, point.x);
      ctx.strokeStyle = "#fbbf24";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx, cy, Math.max(12, scale * 0.4), 0, -angle, true);
      ctx.stroke();
    }

    // Lines to components (dashed)
    ctx.strokeStyle = "#64748b";
    ctx.setLineDash([4, 3]);
    ctx.beginPath();
    ctx.moveTo(px, cy);
    ctx.lineTo(px, py);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx, py);
    ctx.lineTo(px, py);
    ctx.stroke();
    ctx.setLineDash([]);

    // Vector arrow
    if (point.x !== 0 || point.y !== 0) {
      const angle = Math.atan2(point.y, point.x);
      const tipLen = 10;
      ctx.strokeStyle = "#22d3ee";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(px, py);
      ctx.stroke();
      // Arrowhead
      const headAng = Math.PI / 6;
      ctx.strokeStyle = "#22d3ee";
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(px - tipLen * Math.cos(angle - headAng), py - tipLen * Math.sin(angle - headAng));
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(px - tipLen * Math.cos(angle + headAng), py - tipLen * Math.sin(angle + headAng));
      ctx.stroke();
    }

    // Point dot
    ctx.fillStyle = "#f43f5e";
    ctx.beginPath();
    ctx.arc(px, py, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Labels
    ctx.fillStyle = "#f43f5e";
    ctx.font = "bold 12px Inter, system-ui, sans-serif";
    ctx.fillText(`P(${point.x}, ${point.y})`, px + 10, py - 10);

    // Info
    ctx.font = "12px Inter, system-ui, sans-serif";
    ctx.fillStyle = "#94a3b8";
    ctx.fillText(`|OP| = ${Math.hypot(point.x, point.y).toFixed(2)}`, 10, 20);
    if (showAngle) {
      const angle = (Math.atan2(point.y, point.x) * 180) / Math.PI;
      ctx.fillText(`θ = ${angle.toFixed(1)}°`, 10, 36);
    }
  }, [point, showAngle, showComponents, showCircle, gridSize]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scale = Math.min(rect.width, rect.height) / (gridSize * 2.4);
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const x = Math.round((e.clientX - rect.left - cx) / scale);
    const y = Math.round(-(e.clientY - rect.top - cy) / scale);
    setPoint({ x: Math.max(-gridSize, Math.min(gridSize, x)), y: Math.max(-gridSize, Math.min(gridSize, y)) });
  };

  const angleDeg = (Math.atan2(point.y, point.x) * 180) / Math.PI;
  const r = Math.hypot(point.x, point.y);
  const quadrant = point.x > 0 ? (point.y > 0 ? "I" : "IV") : point.y > 0 ? "II" : "III";

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>2D Coordinate Plane (x-y)</span>
          <span className="text-xs text-muted-foreground font-normal">Click anywhere to place a point</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Point & Display Options">
          <div className="w-24">
            <Label className="text-xs text-muted-foreground">x:</Label>
            <Input type="number" value={point.x} onChange={(e) => setPoint({ ...point, x: Number(e.target.value) })} className="mt-1" />
          </div>
          <div className="w-24">
            <Label className="text-xs text-muted-foreground">y:</Label>
            <Input type="number" value={point.y} onChange={(e) => setPoint({ ...point, y: Number(e.target.value) })} className="mt-1" />
          </div>
          <div className="w-28">
            <Label className="text-xs text-muted-foreground">Grid (±):</Label>
            <Select value={String(gridSize)} onValueChange={(v) => setGridSize(Number(v))}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[3, 5, 7, 10].map((v) => (
                  <SelectItem key={v} value={String(v)}>{v}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button variant={showAngle ? "default" : "outline"} size="sm" onClick={() => setShowAngle(!showAngle)}>Angle</Button>
          <Button variant={showComponents ? "default" : "outline"} size="sm" onClick={() => setShowComponents(!showComponents)}>Components</Button>
          <Button variant={showCircle ? "default" : "outline"} size="sm" onClick={() => setShowCircle(!showCircle)}>Unit Circle</Button>
        </CollapsibleControls>

        <canvas
          ref={canvasRef}
          className="lab-3d-container cursor-crosshair rounded-md border border-border"
          onClick={handleCanvasClick}
        />

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-md border border-border bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground">Position Vector (r)</p>
            <p className="text-sm font-semibold">r = ({point.x}, {point.y}) &nbsp;|r| = {r.toFixed(2)}</p>
          </div>
          <div className="rounded-md border border-border bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground">Angle θ</p>
            <p className="text-sm font-semibold">{angleDeg.toFixed(1)}° ({ (angleDeg * Math.PI / 180).toFixed(3) } rad)</p>
          </div>
          <div className="rounded-md border border-border bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground">Quadrant</p>
            <p className="text-sm font-semibold">{point.x === 0 || point.y === 0 ? "On Axis" : `Quadrant ${quadrant}`}</p>
          </div>
        </div>

        <MeaningPanel
          title="Coordinate Geometry Basics (Class 11)"
          meaning="The Cartesian plane has two perpendicular axes intersecting at origin O. Every point is (x, y), where x is the horizontal distance and y is the vertical distance from the origin. The plane is divided into 4 quadrants."
          points={[
            "Quadrant I: (+, +) • II: (−, +) • III: (−, −) • IV: (+, −)",
            "Distance from origin: |OP| = √(x² + y²)",
            "Angle from +x axis: θ = tan⁻¹(y/x)",
            "x = r·cosθ, y = r·sinθ (polar ↔ cartesian conversion)",
            "Unit circle: points where x² + y² = 1, showing cosθ = x and sinθ = y",
          ]}
        />
      </CardContent>
    </Card>
  );
}

/* ============================================================
   3D Coordinate Axes & Vectors (interactive)
   ============================================================ */

function CoordinateAxes3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [point, setPoint] = useState({ x: 2, y: 3, z: 1.5 });
  const [showPlanes, setShowPlanes] = useState(true);
  const [showProjections, setShowProjections] = useState(true);
  const [showBox, setShowBox] = useState(true);
  const [isWebGL, setIsWebGL] = useState(true);

  useEffect(() => {
    setIsWebGL(isWebGLAvailable());
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isWebGL) return;

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let controls: any;
    let frameId: number;
    const meshes: THREE.Object3D[] = [];

    const init = async () => {
      const { OrbitControls } = await import("three/addons/controls/OrbitControls.js");

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0f172a);

      camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
      camera.position.set(6, 5, 7);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.5;

      const ambient = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambient);
      const dir = new THREE.DirectionalLight(0xffffff, 1.2);
      dir.position.set(5, 8, 6);
      scene.add(dir);
      const dir2 = new THREE.DirectionalLight(0x6366f1, 0.4);
      dir2.position.set(-4, -2, -3);
      scene.add(dir2);

      // Clear previous meshes
      meshes.forEach((m) => {
        scene.remove(m);
        if (m instanceof THREE.Mesh) {
          m.geometry.dispose();
          (m.material as THREE.Material).dispose();
        }
      });
      meshes.length = 0;

      // Axis helper with labels (x=red, y=green, z=blue)
      const xLen = 5, yLen = 5, zLen = 5;

      const mkAxis = (from: THREE.Vector3, to: THREE.Vector3, color: number) => {
        const geo = new THREE.BufferGeometry().setFromPoints([from, to]);
        const mat = new THREE.LineBasicMaterial({ color, linewidth: 3 });
        const line = new THREE.Line(geo, mat);
        scene.add(line);
        meshes.push(line as unknown as THREE.Mesh);

        // Arrowhead cone
        const dirVec = to.clone().sub(from).normalize();
        const coneGeo = new THREE.ConeGeometry(0.08, 0.3, 8);
        const coneMat = new THREE.MeshBasicMaterial({ color });
        const cone = new THREE.Mesh(coneGeo, coneMat);
        cone.position.copy(to);
        cone.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dirVec);
        scene.add(cone);
        meshes.push(cone);

        // Label (canvas sprite)
        const canvas = document.createElement("canvas");
        canvas.width = 128;
        canvas.height = 64;
        const ctx = canvas.getContext("2d")!;
        ctx.font = "bold 48px Inter, system-ui, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = `#${color.toString(16).padStart(6, "0")}`;
        ctx.fillText(color === 0xef4444 ? "x" : color === 0x22c55e ? "y" : "z", 64, 32);
        const texture = new THREE.CanvasTexture(canvas);
        const spriteMat = new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false });
        const sprite = new THREE.Sprite(spriteMat);
        sprite.position.copy(to.clone().multiplyScalar(1.12));
        sprite.scale.set(0.8, 0.4, 1);
        scene.add(sprite);
        meshes.push(sprite);
      };

      mkAxis(new THREE.Vector3(-xLen, 0, 0), new THREE.Vector3(xLen, 0, 0), 0xef4444);
      mkAxis(new THREE.Vector3(0, -yLen, 0), new THREE.Vector3(0, yLen, 0), 0x22c55e);
      mkAxis(new THREE.Vector3(0, 0, -zLen), new THREE.Vector3(0, 0, zLen), 0x3b82f6);

      // Coordinate planes (semi-transparent)
      if (showPlanes) {
        const planeData: { rot: [number, number, number]; color: number; opacity: number }[] = [
          { rot: [0, 0, 0], color: 0x6366f1, opacity: 0.08 }, // xz plane
          { rot: [-Math.PI / 2, 0, 0], color: 0x6366f1, opacity: 0.08 }, // xy plane
          { rot: [0, Math.PI / 2, 0], color: 0x6366f1, opacity: 0.08 }, // yz plane
        ];
        planeData.forEach((pd) => {
          const geo = new THREE.PlaneGeometry(10, 10);
          const mat = new THREE.MeshBasicMaterial({ color: pd.color, transparent: true, opacity: pd.opacity, side: THREE.DoubleSide, depthWrite: false });
          const plane = new THREE.Mesh(geo, mat);
          plane.rotation.set(...pd.rot);
          scene.add(plane);
          meshes.push(plane);
        });
      }

      // Grid on xy plane
      const grid = new THREE.GridHelper(10, 10, 0x334155, 0x1e293b);
      scene.add(grid);

      // Point P
      const P = new THREE.Vector3(point.x, point.y, point.z);

      // Projection lines (dashed) to planes
      if (showProjections) {
        const mkDash = (from: THREE.Vector3, to: THREE.Vector3, color: number) => {
          const geo = new THREE.BufferGeometry().setFromPoints([from, to]);
          const mat = new THREE.LineDashedMaterial({ color, dashSize: 0.15, gapSize: 0.1 });
          const line = new THREE.Line(geo, mat);
          line.computeLineDistances();
          scene.add(line);
          meshes.push(line as unknown as THREE.Mesh);
        };
        mkDash(P, new THREE.Vector3(0, P.y, P.z), 0x64748b);
        mkDash(P, new THREE.Vector3(P.x, 0, P.z), 0x64748b);
        mkDash(P, new THREE.Vector3(P.x, P.y, 0), 0x64748b);
      }

      // Vector arrow from origin to P (cyan)
      const vecArrow = new THREE.ArrowHelper(
        P.clone().normalize(),
        new THREE.Vector3(0, 0, 0),
        P.length(),
        0x22d3ee,
        0.3,
        0.2
      );
      scene.add(vecArrow);
      meshes.push(vecArrow as unknown as THREE.Mesh);

      // Projection points on planes
      const mkPoint = (pos: THREE.Vector3, color: number, size = 0.1) => {
        const geo = new THREE.SphereGeometry(size, 12, 12);
        const mat = new THREE.MeshBasicMaterial({ color });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.copy(pos);
        scene.add(mesh);
        meshes.push(mesh);
      };

      mkPoint(P, 0xf43f5e, 0.14);
      mkPoint(new THREE.Vector3(0, 0, 0), 0xfbbf24, 0.1);
      mkPoint(new THREE.Vector3(0, P.y, P.z), 0x94a3b8, 0.07);
      mkPoint(new THREE.Vector3(P.x, 0, P.z), 0x94a3b8, 0.07);
      mkPoint(new THREE.Vector3(P.x, P.y, 0), 0x94a3b8, 0.07);

      // Box (parallelepiped)
      if (showBox) {
        const boxGeo = new THREE.BoxGeometry(Math.abs(P.x), Math.abs(P.y), Math.abs(P.z));
        const boxEdges = new THREE.EdgesGeometry(boxGeo);
        const boxLine = new THREE.LineSegments(boxEdges, new THREE.LineBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.6 }));
        boxLine.position.set(P.x / 2, P.y / 2, P.z / 2);
        scene.add(boxLine);
        meshes.push(boxLine as unknown as THREE.Mesh);
      }

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
        if (renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
        renderer.dispose();
        controls.dispose?.();
      };
    };

    const cleanup = init();
    return () => {
      cleanup.then((dispose) => dispose?.());
    };
  }, [point, showPlanes, showProjections, showBox, isWebGL]);

  if (!isWebGL) {
    return (
      <WebGLFallback 
        title="3D Coordinate System"
        description="3D visualization requires WebGL support. Try a modern browser or enable hardware acceleration."
      />
    );
  }

  const r = Math.sqrt(point.x ** 2 + point.y ** 2 + point.z ** 2);
  const thetaXY = (Math.atan2(point.y, point.x) * 180) / Math.PI;
  const thetaXZ = (Math.atan2(point.z, point.x) * 180) / Math.PI;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>3D Coordinate System (x, y, z)</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate • Clear visible axes</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Point & Display Options">
          <div className="w-20">
            <Label className="text-xs text-muted-foreground">x</Label>
            <Input type="number" value={point.x} onChange={(e) => setPoint({ ...point, x: Number(e.target.value) })} className="mt-1" />
          </div>
          <div className="w-20">
            <Label className="text-xs text-muted-foreground">y</Label>
            <Input type="number" value={point.y} onChange={(e) => setPoint({ ...point, y: Number(e.target.value) })} className="mt-1" />
          </div>
          <div className="w-20">
            <Label className="text-xs text-muted-foreground">z</Label>
            <Input type="number" value={point.z} onChange={(e) => setPoint({ ...point, z: Number(e.target.value) })} className="mt-1" />
          </div>
          <Button variant={showPlanes ? "default" : "outline"} size="sm" onClick={() => setShowPlanes(!showPlanes)}>Planes</Button>
          <Button variant={showProjections ? "default" : "outline"} size="sm" onClick={() => setShowProjections(!showProjections)}>Projections</Button>
          <Button variant={showBox ? "default" : "outline"} size="sm" onClick={() => setShowBox(!showBox)}>Box</Button>
        </CollapsibleControls>

        <div ref={containerRef} className="lab-3d-container rounded-md border border-border" />

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-md border border-border bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground">Position Vector</p>
            <p className="text-sm font-semibold">|r| = {r.toFixed(2)}</p>
          </div>
          <div className="rounded-md border border-border bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground">θ in xy-plane</p>
            <p className="text-sm font-semibold">{thetaXY.toFixed(1)}°</p>
          </div>
          <div className="rounded-md border border-border bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground">θ in xz-plane</p>
            <p className="text-sm font-semibold">{thetaXZ.toFixed(1)}°</p>
          </div>
        </div>

        <MeaningPanel
          title="3D Coordinate Geometry (Class 11)"
          meaning="In 3D space, each point is (x, y, z). The three axes are mutually perpendicular. The coordinate planes are xy, yz, and xz planes. The distance formula extends to 3D."
          points={[
            "Distance: AB = √((x₂−x₁)² + (y₂−y₁)² + (z₂−z₁)²)",
            "3D position vector: r = xi + yj + zk, |r| = √(x² + y² + z²)",
            "Direction cosines: cosα = x/r, cosβ = y/r, cosγ = z/r (cos²α + cos²β + cos²γ = 1)",
            "Midpoint: ((x₁+x₂)/2, (y₁+y₂)/2, (z₁+z₂)/2)",
            "Coordinate planes are the xy-plane, yz-plane, and xz-plane",
          ]}
        />
      </CardContent>
    </Card>
  );
}

/* ============================================================
   Interactive Vector & Angle Viewer
   ============================================================ */

function VectorViewer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [v1, setV1] = useState({ x: 3, y: 1.5, z: 0 });
  const [v2, setV2] = useState({ x: 1, y: 3, z: 0.5 });
  const [showSum, setShowSum] = useState(true);
  const [isWebGL, setIsWebGL] = useState(true);

  useEffect(() => {
    setIsWebGL(isWebGLAvailable());
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isWebGL) return;

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let controls: any;
    let frameId: number;
    const meshes: THREE.Object3D[] = [];

    const init = async () => {
      const { OrbitControls } = await import("three/addons/controls/OrbitControls.js");

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0f172a);

      camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
      camera.position.set(5, 4, 6);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.5;

      const ambient = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambient);
      const dir = new THREE.DirectionalLight(0xffffff, 1.2);
      dir.position.set(5, 8, 6);
      scene.add(dir);
      const dir2 = new THREE.DirectionalLight(0x6366f1, 0.4);
      dir2.position.set(-4, -2, -3);
      scene.add(dir2);

      // Axes
      const axesHelper = new THREE.AxesHelper(4);
      scene.add(axesHelper);

      // Grid
      const grid = new THREE.GridHelper(8, 8, 0x334155, 0x1e293b);
      scene.add(grid);

      const clear = () => {
        meshes.forEach((m) => scene.remove(m));
        meshes.length = 0;
      };

      const addVector = (v: { x: number; y: number; z: number }, color: number, origin: THREE.Vector3 = new THREE.Vector3(0, 0, 0)) => {
        const p = new THREE.Vector3(v.x, v.y, v.z);
        const len = p.length();
        if (len < 0.05) return;
        const arrow = new THREE.ArrowHelper(p.clone().normalize(), origin, len, color, 0.3, 0.2);
        scene.add(arrow);
        meshes.push(arrow);

        const tip = origin.clone().add(p);
        const marker = new THREE.Mesh(
          new THREE.SphereGeometry(0.06, 10, 10),
          new THREE.MeshBasicMaterial({ color })
        );
        marker.position.copy(tip);
        scene.add(marker);
        meshes.push(marker);
      };

      clear();

      // Vector 1 (blue), Vector 2 (green), Sum (orange)
      addVector(v1, 0x3b82f6);
      addVector(v2, 0x22c55e);
      if (showSum) {
        const sum = { x: v1.x + v2.x, y: v1.y + v2.y, z: v1.z + v2.z };
        addVector(sum, 0xf59e0b);
      }

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
        if (renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
        renderer.dispose();
        controls.dispose?.();
      };
    };

    const cleanup = init();
    return () => {
      cleanup.then((dispose) => dispose?.());
    };
  }, [v1, v2, showSum, isWebGL]);

  if (!isWebGL) {
    return (
      <WebGLFallback 
        title="Vector Explorer"
        description="3D visualization requires WebGL support. Try a modern browser or enable hardware acceleration."
      />
    );
  }

  const dot = v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
  const mag1 = Math.sqrt(v1.x ** 2 + v1.y ** 2 + v1.z ** 2);
  const mag2 = Math.sqrt(v2.x ** 2 + v2.y ** 2 + v2.z ** 2);
  const angle = Math.acos(Math.max(-1, Math.min(1, dot / (mag1 * mag2 || 1)))) * 180 / Math.PI;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Vector & Angle Explorer</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate • Adjust vector components</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Vector Components">
          <div className="grid gap-4 sm:grid-cols-2">
            {/* V1 inputs */}
            <div className="rounded-md border border-red-500/30 bg-red-500/5 p-3">
              <p className="text-xs font-semibold text-red-400">Vector →A</p>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {(["x", "y", "z"] as const).map((k) => (
                  <div key={k}>
                    <Label className="text-[10px] text-muted-foreground">{k}</Label>
                    <Input type="number" value={v1[k]} onChange={(e) => setV1({ ...v1, [k]: Number(e.target.value) })} className="mt-0.5" />
                  </div>
                ))}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">|A| = {mag1.toFixed(2)}</p>
            </div>
            {/* V2 inputs */}
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-3">
              <p className="text-xs font-semibold text-green-400">Vector →B</p>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {(["x", "y", "z"] as const).map((k) => (
                  <div key={k}>
                    <Label className="text-[10px] text-muted-foreground">{k}</Label>
                    <Input type="number" value={v2[k]} onChange={(e) => setV2({ ...v2, [k]: Number(e.target.value) })} className="mt-0.5" />
                  </div>
                ))}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">|B| = {mag2.toFixed(2)}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button variant={showSum ? "default" : "outline"} size="sm" onClick={() => setShowSum(!showSum)}>
              Show A + B
            </Button>
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="lab-3d-container rounded-md border border-border" />

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-md border border-border bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground">Dot Product</p>
            <p className="text-sm font-semibold">A·B = {dot.toFixed(2)}</p>
          </div>
          <div className="rounded-md border border-border bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground">Angle Between</p>
            <p className="text-sm font-semibold">{angle.toFixed(1)}°</p>
          </div>
          <div className="rounded-md border border-border bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground">Sum Vector</p>
            <p className="text-sm font-semibold">({(v1.x + v2.x).toFixed(1)}, {(v1.y + v2.y).toFixed(1)}, {(v1.z + v2.z).toFixed(1)})</p>
          </div>
        </div>

        <MeaningPanel
          title="Vector Algebra (Class 11)"
          meaning="Vectors have both magnitude and direction. The dot product gives a scalar that measures how parallel two vectors are; the cross product gives a vector perpendicular to both."
          points={[
            "Dot product: A·B = |A||B|cosθ — cosθ = (A·B)/(|A||B|)",
            "Perpendicular vectors: A·B = 0",
            "Angle formula: cos θ = (AₓBₓ + AᵧBᵧ + A_zB_z)/(|A||B|)",
            "Parallelogram law: |A+B|² = |A|² + |B|² + 2|A||B|cosθ",
            "Triangle law: A + B places the tail of B at the head of A",
          ]}
        />
      </CardContent>
    </Card>
  );
}

/* ============================================================
   Comprehensive Parabola Explorer (roots → vertex → all conditions)
   ============================================================ */

function ParabolaExplorer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [a, setA] = useState(1);
  const [b, setB] = useState(0);
  const [c, setC] = useState(-4);
  const [showRoots, setShowRoots] = useState(true);
  const [showVertex, setShowVertex] = useState(true);
  const [showAxis, setShowAxis] = useState(true);
  const [showFocus, setShowFocus] = useState(false);
  const [showDirectrix, setShowDirectrix] = useState(false);
  const [showTable] = useState(true);

  // Derived values
  const discriminant = b * b - 4 * a * c;
  const vertexX = -b / (2 * a);
  const vertexY = a * vertexX * vertexX + b * vertexX + c;
  const axisOfSymmetry = vertexX;
  const focusX = vertexX;
  const focusY = vertexY + 1 / (4 * a);
  const directrixY = vertexY - 1 / (4 * a);
  const roots: number[] = [];
  if (discriminant >= 0) {
    roots.push((-b + Math.sqrt(discriminant)) / (2 * a));
    if (discriminant > 0) roots.push((-b - Math.sqrt(discriminant)) / (2 * a));
  }
  const opensUp = a > 0;
  const yIntercept = c;

  // Build table of points
  const tablePoints: { x: number; y: number }[] = [];
  for (let x = -5; x <= 5; x++) {
    tablePoints.push({ x, y: a * x * x + b * x + c });
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, rect.width, rect.height);

    const w = rect.width;
    const h = rect.height;
    const cx = w / 2;
    const cy = h / 2;
    const scale = Math.min(w, h) / 12;

    // Grid
    ctx.strokeStyle = "#1e293b";
    ctx.lineWidth = 1;
    for (let i = -6; i <= 6; i++) {
      const x = cx + i * scale;
      const y = cy - i * scale;
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = "#3b82f6"; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(w, cy); ctx.stroke();
    ctx.strokeStyle = "#ef4444";
    ctx.beginPath(); ctx.moveTo(cx, 0); ctx.lineTo(cx, h); ctx.stroke();

    // Axis labels
    ctx.fillStyle = "#94a3b8"; ctx.font = "12px Inter, system-ui, sans-serif";
    ctx.fillText("x", w - 14, cy - 8);
    ctx.fillText("y", cx + 8, 14);

    // Axis of symmetry (dashed vertical)
    if (showAxis) {
      ctx.strokeStyle = "#a855f7";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([6, 4]);
      ctx.beginPath();
      ctx.moveTo(cx + axisOfSymmetry * scale, 0);
      ctx.lineTo(cx + axisOfSymmetry * scale, h);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Directrix (horizontal dashed)
    if (showDirectrix) {
      ctx.strokeStyle = "#f59e0b";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([6, 4]);
      ctx.beginPath();
      ctx.moveTo(0, cy - directrixY * scale);
      ctx.lineTo(w, cy - directrixY * scale);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Parabola curve
    ctx.strokeStyle = "#22d3ee";
    ctx.lineWidth = 3;
    ctx.beginPath();
    let started = false;
    for (let px = 0; px <= w; px++) {
      const x = (px - cx) / scale;
      const y = a * x * x + b * x + c;
      const py = cy - y * scale;
      if (!started) { ctx.moveTo(px, py); started = true; }
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // Roots (x-intercepts)
    if (showRoots && discriminant >= 0) {
      roots.forEach((root) => {
        const rx = cx + root * scale;
        ctx.fillStyle = "#22c55e";
        ctx.beginPath(); ctx.arc(rx, cy, 6, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = "#fff"; ctx.lineWidth = 1.5; ctx.stroke();
        ctx.fillStyle = "#22c55e"; ctx.font = "bold 11px Inter, system-ui, sans-serif";
        ctx.fillText(`(${root.toFixed(1)}, 0)`, rx + 8, cy + 16);
      });
    }

    // Vertex
    if (showVertex) {
      const vx = cx + vertexX * scale;
      const vy = cy - vertexY * scale;
      ctx.fillStyle = "#f43f5e";
      ctx.beginPath(); ctx.arc(vx, vy, 7, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = "#fff"; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.fillStyle = "#f43f5e"; ctx.font = "bold 11px Inter, system-ui, sans-serif";
      ctx.fillText(`V(${vertexX.toFixed(1)}, ${vertexY.toFixed(1)})`, vx + 10, vy - 10);
    }

    // Focus
    if (showFocus) {
      const fx = cx + focusX * scale;
      const fy = cy - focusY * scale;
      ctx.fillStyle = "#fbbf24";
      ctx.beginPath(); ctx.arc(fx, fy, 6, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = "#fff"; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.fillStyle = "#fbbf24"; ctx.font = "bold 11px Inter, system-ui, sans-serif";
      ctx.fillText("F", fx + 8, fy - 8);
    }

    // Y-intercept
    ctx.fillStyle = "#8b5cf6";
    const iy = cy - yIntercept * scale;
    ctx.beginPath(); ctx.arc(cx, iy, 5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#8b5cf6"; ctx.font = "bold 11px Inter, system-ui, sans-serif";
    ctx.fillText("(0, " + yIntercept.toFixed(1) + ")", cx + 8, iy - 8);

    // Info text
    ctx.fillStyle = "#94a3b8"; ctx.font = "12px Inter, system-ui, sans-serif";
    ctx.fillText(`y = ${a}x² ${b >= 0 ? "+" : "−"} ${Math.abs(b)}x ${c >= 0 ? "+" : "−"} ${Math.abs(c)}`, 10, 20);
    ctx.fillText(`D = b²−4ac = ${discriminant.toFixed(1)}`, 10, 36);
  }, [a, b, c, showRoots, showVertex, showAxis, showFocus, showDirectrix, discriminant, roots, vertexX, vertexY, focusX, focusY, directrixY, yIntercept]);

  const rootText = discriminant > 0
    ? `Two real roots: x = ${roots[0].toFixed(2)}, ${roots[1].toFixed(2)}`
    : discriminant === 0
      ? `One real root (double): x = ${roots[0].toFixed(2)}`
      : "No real roots (D < 0)";

  const vertexForm = `y = ${a}(x ${vertexX >= 0 ? "−" : "+"} ${Math.abs(vertexX).toFixed(2)})² ${vertexY >= 0 ? "+" : "−"} ${Math.abs(vertexY).toFixed(2)}`;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Parabola Explorer — Roots to Peak</span>
          <span className="text-xs text-muted-foreground font-normal">Adjust a, b, c to see every feature</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Coefficients & Display Options">
          <div className="w-20">
            <Label className="text-xs text-muted-foreground">a</Label>
            <Input type="number" value={a} onChange={(e) => setA(Number(e.target.value))} className="mt-1" />
          </div>
          <div className="w-20">
            <Label className="text-xs text-muted-foreground">b</Label>
            <Input type="number" value={b} onChange={(e) => setB(Number(e.target.value))} className="mt-1" />
          </div>
          <div className="w-20">
            <Label className="text-xs text-muted-foreground">c</Label>
            <Input type="number" value={c} onChange={(e) => setC(Number(e.target.value))} className="mt-1" />
          </div>
          <Button variant={showRoots ? "default" : "outline"} size="sm" onClick={() => setShowRoots(!showRoots)}>Roots</Button>
          <Button variant={showVertex ? "default" : "outline"} size="sm" onClick={() => setShowVertex(!showVertex)}>Vertex</Button>
          <Button variant={showAxis ? "default" : "outline"} size="sm" onClick={() => setShowAxis(!showAxis)}>Axis</Button>
          <Button variant={showFocus ? "default" : "outline"} size="sm" onClick={() => setShowFocus(!showFocus)}>Focus</Button>
          <Button variant={showDirectrix ? "default" : "outline"} size="sm" onClick={() => setShowDirectrix(!showDirectrix)}>Directrix</Button>
        </CollapsibleControls>

        <canvas ref={canvasRef} className="lab-3d-container rounded-md border border-border" />

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-md border border-border bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground">Vertex (peak/trough)</p>
            <p className="text-sm font-semibold">({vertexX.toFixed(2)}, {vertexY.toFixed(2)})</p>
          </div>
          <div className="rounded-md border border-border bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground">Axis of Symmetry</p>
            <p className="text-sm font-semibold">x = {axisOfSymmetry.toFixed(2)}</p>
          </div>
          <div className="rounded-md border border-border bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground">Discriminant D</p>
            <p className="text-sm font-semibold">{discriminant.toFixed(2)}</p>
          </div>
          <div className="rounded-md border border-border bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground">Opens</p>
            <p className="text-sm font-semibold">{opensUp ? "Upward (a > 0)" : "Downward (a < 0)"}</p>
          </div>
        </div>

        <div className="rounded-md border border-border bg-muted/30 p-3 text-sm">
          <p className="font-semibold">Roots: {rootText}</p>
          <p className="mt-1 text-xs text-muted-foreground">Vertex form: {vertexForm}</p>
          <p className="mt-1 text-xs text-muted-foreground">Focus: ({focusX.toFixed(2)}, {focusY.toFixed(2)}) • Directrix: y = {directrixY.toFixed(2)}</p>
        </div>

        {showTable && (
          <div className="overflow-x-auto rounded-md border border-border bg-muted/30 p-3">
            <p className="text-xs font-semibold mb-2">Table of Values (x → y)</p>
            <div className="flex gap-2 overflow-x-auto">
              {tablePoints.map((p) => (
                <div key={p.x} className="flex flex-col items-center rounded border border-border bg-background px-2 py-1 text-xs">
                  <span className="text-muted-foreground">x={p.x}</span>
                  <span className="font-medium">y={p.y.toFixed(1)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <MeaningPanel
          title="Parabola — Complete Guide (Class 11)"
          meaning="A parabola is the graph of y = ax² + bx + c. It's a U-shaped curve with a vertex (peak or trough), an axis of symmetry, and either 0, 1, or 2 roots depending on the discriminant."
          points={[
            "Vertex: x = −b/2a, y = f(−b/2a) — the turning point",
            "Axis of symmetry: x = −b/2a — the parabola is symmetric about this line",
            "Roots (x-intercepts): x = (−b ± √(b²−4ac)) / 2a",
            "Discriminant D = b²−4ac: D>0 → 2 real roots, D=0 → 1 double root, D<0 → no real roots",
            "a > 0 → opens up (minimum at vertex); a < 0 → opens down (maximum at vertex)",
            "c = y-intercept (where the curve crosses the y-axis)",
            "Focus: (h, k+1/4a) • Directrix: y = k−1/4a — every point on parabola is equidistant from both",
            "Vertex form: y = a(x−h)² + k — h = −b/2a, k = vertex y",
            "How to start: identify a, b, c → find vertex → find roots → plot → sketch",
          ]}
        />
      </CardContent>
    </Card>
  );
}

export function MathGeometry3D() {
  return (
    <Tabs defaultValue="plane2d" className="w-full">
      <TabsList className="flex-wrap">
        <TabsTrigger value="plane2d">2D Plane (x-y)</TabsTrigger>
        <TabsTrigger value="axes3d">3D Axes</TabsTrigger>
        <TabsTrigger value="vectors">Vectors & Angles</TabsTrigger>
        <TabsTrigger value="parabola">Parabola</TabsTrigger>
      </TabsList>

      <TabsContent value="plane2d" className="mt-4">
        <CoordinatePlane2D />
      </TabsContent>

      <TabsContent value="axes3d" className="mt-4">
        <CoordinateAxes3D />
      </TabsContent>

      <TabsContent value="vectors" className="mt-4">
        <VectorViewer />
      </TabsContent>

      <TabsContent value="parabola" className="mt-4">
        <ParabolaExplorer />
      </TabsContent>
    </Tabs>
  );
}
