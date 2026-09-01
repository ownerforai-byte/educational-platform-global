"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallback } from "@/components/lab/webgl-fallback";
import * as THREE from "three";

/* ============================================================
   Perpendicular Distance 3D â€” "Distance of perpendicular from
   a point to a line / plane" + the theorems that sit above it
   in the NEB Straight Line / Coordinates in Space chapter.
   Well-labelled axes, points, foot of perpendicular, normal
   arrow, right-angle marker and live distance readout.
   ============================================================ */

/** Small labelled sprite (canvas texture) â€” same technique as axis labels */
function mkSpriteLabel(text: string, colorHex: string, position: THREE.Vector3, scale = 1.0): THREE.Sprite {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 96;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
  ctx.fillRect(4, 8, 248, 80);
  ctx.strokeStyle = colorHex;
  ctx.lineWidth = 3;
  ctx.strokeRect(4, 8, 248, 80);
  ctx.font = "bold 40px Inter, system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = colorHex;
  ctx.fillText(text, 128, 50);
  const texture = new THREE.CanvasTexture(canvas);
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false }));
  sprite.position.copy(position);
  sprite.scale.set(1.4 * scale, 0.525 * scale, 1);
  return sprite;
}

type Mode = "plane" | "line";

interface PlaneState {
  a: number;
  b: number;
  c: number;
  d: number;
}

interface LineState {
  ux: number;
  uy: number;
  uz: number;
}

export function MathPerpendicular3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>("plane");
  const [plane, setPlane] = useState<PlaneState>({ a: 1, b: 2, c: 1, d: 6 });
  const [line, setLine] = useState<LineState>({ ux: 2, uy: 1, uz: 1 });
  const [point, setPoint] = useState({ x: 3, y: 4, z: 3 });
  const [showNormal, setShowNormal] = useState(true);
  const [showRightAngle, setShowRightAngle] = useState(true);
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
      camera.position.set(8, 6.5, 9);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.4;

      const ambient = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambient);
      const dir = new THREE.DirectionalLight(0xffffff, 1.2);
      dir.position.set(5, 12, 8);
      scene.add(dir);

      const push = <T extends THREE.Object3D>(o: T): T => {
        scene.add(o);
        meshes.push(o);
        return o;
      };

      // ===== Labelled axes (x=red, y=green, z=blue) — math coords: y is elevation =====
      const mkAxis = (from: THREE.Vector3, to: THREE.Vector3, color: number, label: string) => {
        const geo = new THREE.BufferGeometry().setFromPoints([from, to]);
        push(new THREE.Line(geo, new THREE.LineBasicMaterial({ color, linewidth: 3 })));
        const dirVec = to.clone().sub(from).normalize();
        const cone = push(new THREE.Mesh(new THREE.ConeGeometry(0.09, 0.32, 8), new THREE.MeshBasicMaterial({ color })));
        cone.position.copy(to);
        cone.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dirVec);
        push(mkSpriteLabel(label, `#${color.toString(16).padStart(6, "0")}`, to.clone().multiplyScalar(1.12), 0.8));
      };
      const G = 6;
      mkAxis(new THREE.Vector3(-G - 1, 0, 0), new THREE.Vector3(G + 1, 0, 0), 0xef4444, "x");
      mkAxis(new THREE.Vector3(0, 0, -G - 1), new THREE.Vector3(0, 0, G + 1), 0x22c55e, "y");
      mkAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, G + 1, 0), 0x3b82f6, "z");

      // Ground grid
      push(new THREE.GridHelper(G * 2, G * 2, 0x334155, 0x1e293b));

      // Math point P -> world (x, z, y): math y is world z, math z is world y (elevation)
      const P = new THREE.Vector3(point.x, point.z, point.y);


      // Foot of perpendicular F and shortest distance d
      let F: THREE.Vector3;
      let distance: number;
      let normalWorld: THREE.Vector3;

      if (mode === "plane") {
        // Plane ax + by + cz = d in math coords -> normal in world coords is (a, c, b)
        normalWorld = new THREE.Vector3(plane.a, plane.c, plane.b);
        const n2 = normalWorld.lengthSq() || 1e-9;
        const dWorld = plane.d;
        const offset = (normalWorld.dot(P) - dWorld) / Math.sqrt(n2);
        distance = Math.abs(offset);
        F = P.clone().sub(normalWorld.clone().normalize().multiplyScalar(offset));

        const planeMesh = push(
          new THREE.Mesh(
            new THREE.PlaneGeometry(7, 7),
            new THREE.MeshBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.22, side: THREE.DoubleSide, depthWrite: false })
          )
        );
        planeMesh.position.copy(F);
        planeMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normalWorld.clone().normalize());

        push(
          mkSpriteLabel(
            `${plane.a}x + ${plane.b}y + ${plane.c}z = ${plane.d}`,
            "#a78bfa",
            F.clone().add(normalWorld.clone().normalize().multiplyScalar(1.6)),
            1.15
          )
        );
      } else {
        // 3D line through the origin with direction u
        const u = new THREE.Vector3(line.ux, line.uz, line.uy).normalize();
        F = u.clone().multiplyScalar(P.dot(u));
        distance = P.clone().sub(F).length();
        normalWorld = P.clone().sub(F).normalize();

        const linePts = [u.clone().multiplyScalar(-G * 1.4), u.clone().multiplyScalar(G * 1.4)];
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(linePts), new THREE.LineBasicMaterial({ color: 0xf97316, linewidth: 3 })));
        push(mkSpriteLabel("line l", "#fb923c", u.clone().multiplyScalar(G * 1.55), 0.85));
        push(mkSpriteLabel(`u = (${line.ux}, ${line.uy}, ${line.uz})`, "#fb923c", u.clone().multiplyScalar(2.6), 1.0));
      }

      // ===== Point P (red) =====
      const pMesh = push(new THREE.Mesh(new THREE.SphereGeometry(0.14, 16, 16), new THREE.MeshBasicMaterial({ color: 0xef4444 })));
      pMesh.position.copy(P);
      push(mkSpriteLabel(`P (${point.x}, ${point.y}, ${point.z})`, "#f87171", P.clone().add(new THREE.Vector3(0.4, 0.5, 0))));

      // ===== Foot F (amber) =====
      const fMesh = push(new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 16), new THREE.MeshBasicMaterial({ color: 0xfbbf24 })));
      fMesh.position.copy(F);
      push(mkSpriteLabel(`F (${F.x.toFixed(2)}, ${F.y.toFixed(2)}, ${F.z.toFixed(2)})`, "#fbbf24", F.clone().add(new THREE.Vector3(0.4, -0.55, 0))));

      // ===== Perpendicular segment PF (dashed cyan) + distance label =====
      const pf = push(new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([P, F]),
        new THREE.LineDashedMaterial({ color: 0x22d3ee, dashSize: 0.18, gapSize: 0.12, linewidth: 2 })
      ));
      pf.computeLineDistances();
      push(mkSpriteLabel(`d = ${distance.toFixed(3)}`, "#22d3ee", P.clone().add(F).multiplyScalar(0.5).add(new THREE.Vector3(0.9, 0, 0)), 1.15));

      // Dashed drop line P -> ground shadow -> origin (context)
      const mkDash = (from: THREE.Vector3, to: THREE.Vector3, color: number) => {
        const l = push(new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([from, to]),
          new THREE.LineDashedMaterial({ color, dashSize: 0.14, gapSize: 0.1 })
        ));
        l.computeLineDistances();
      };
      mkDash(P, new THREE.Vector3(P.x, 0, P.z), 0x64748b);
      mkDash(new THREE.Vector3(P.x, 0, P.z), new THREE.Vector3(0, 0, 0), 0x475569);


      // ===== Normal vector arrow at F (plane mode) =====
      if (mode === "plane" && showNormal) {
        const nrm = normalWorld.clone().normalize();
        push(new THREE.ArrowHelper(nrm, F, 1.6, 0xa78bfa, 0.22, 0.14));
        push(mkSpriteLabel("n-hat", "#a78bfa", F.clone().add(nrm.clone().multiplyScalar(1.85)), 0.85));
      }

      // ===== Right-angle marker at F =====
      if (showRightAngle) {
        const vPF = P.clone().sub(F).normalize();
        let vBase: THREE.Vector3;
        if (mode === "plane") {
          const xAxis = new THREE.Vector3(1, 0, 0);
          const nUnit = normalWorld.clone().normalize();
          vBase = xAxis.clone().sub(nUnit.clone().multiplyScalar(nUnit.dot(xAxis)));
          if (vBase.lengthSq() < 1e-6) {
            vBase = new THREE.Vector3(0, 0, 1).sub(nUnit.clone().multiplyScalar(nUnit.z));
          }
          vBase.normalize();
        } else {
          vBase = new THREE.Vector3(line.ux, line.uz, line.uy).normalize();
        }
        const s = 0.35;
        const q1 = F.clone().add(vBase.clone().multiplyScalar(s));
        const q2 = F.clone().add(vBase.clone().multiplyScalar(s)).add(vPF.clone().multiplyScalar(s));
        const q3 = F.clone().add(vPF.clone().multiplyScalar(s));
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([q1, q2, q3]), new THREE.LineBasicMaterial({ color: 0xfbbf24 })));
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
        if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
        meshes.forEach((m) => {
          scene.remove(m);
          if (m instanceof THREE.Mesh) {
            m.geometry?.dispose();
            const mat = m.material;
            if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
            else mat.dispose();
          } else if (m instanceof THREE.Line) {
            m.geometry?.dispose();
            (m.material as THREE.Material).dispose();
          } else if (m instanceof THREE.Sprite) {
            const sm = m.material;
            sm.map?.dispose?.();
            sm.dispose();
          } else if (m instanceof THREE.ArrowHelper) {
            m.dispose();
          }
        });
        renderer.dispose();
        controls.dispose?.();
      };
    };

    const cleanup = init();
    return () => {
      cleanup.then((dispose) => dispose?.());
    };
  }, [mode, plane, line, point, showNormal, showRightAngle, isWebGL]);

  // ===== Live math (math coordinates, world mapping hidden from user) =====
  const nMag = Math.sqrt(plane.a ** 2 + plane.b ** 2 + plane.c ** 2) || 1e-9;
  const planeDistance = Math.abs(plane.a * point.x + plane.b * point.y + plane.c * point.z - plane.d) / nMag;
  const uWorld = new THREE.Vector3(line.ux, line.uz, line.uy);
  const uMag = uWorld.length() || 1e-9;
  const dot = (line.ux * point.x + line.uy * point.y + line.uz * point.z) / uMag;
  const lineDistance = Math.sqrt(Math.max(0, point.x ** 2 + point.y ** 2 + point.z ** 2 - dot * dot));
  const activeDistance = mode === "plane" ? planeDistance : lineDistance;
  void activeDistance;


  if (!isWebGL) {
    return (
      <WebGLFallback
        title="Perpendicular Distance 3D"
        description="3D visualization requires WebGL support. Try a modern browser or enable hardware acceleration."
      />
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Perpendicular Distance — Point to Line / Plane (3D)</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate • All labels follow the geometry</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Geometry Controls">
          <div className="w-44">
            <Label className="text-xs text-muted-foreground">Mode</Label>
            <Tabs value={mode} onValueChange={(v) => setMode(v as Mode)} className="mt-1">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="plane" className="text-xs">Point to Plane</TabsTrigger>
                <TabsTrigger value="line" className="text-xs">Point to Line</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {mode === "plane" ? (
            <>
              <div className="w-16">
                <Label className="text-xs text-muted-foreground">a:</Label>
                <Input type="number" step="0.5" value={plane.a} onChange={(e) => setPlane({ ...plane, a: Number(e.target.value) || 0 })} className="mt-1" />
              </div>
              <div className="w-16">
                <Label className="text-xs text-muted-foreground">b:</Label>
                <Input type="number" step="0.5" value={plane.b} onChange={(e) => setPlane({ ...plane, b: Number(e.target.value) || 0 })} className="mt-1" />
              </div>
              <div className="w-16">
                <Label className="text-xs text-muted-foreground">c:</Label>
                <Input type="number" step="0.5" value={plane.c} onChange={(e) => setPlane({ ...plane, c: Number(e.target.value) || 0 })} className="mt-1" />
              </div>
              <div className="w-16">
                <Label className="text-xs text-muted-foreground">d:</Label>
                <Input type="number" step="0.5" value={plane.d} onChange={(e) => setPlane({ ...plane, d: Number(e.target.value) || 0 })} className="mt-1" />
              </div>
            </>
          ) : (
            <>
              <div className="w-16">
                <Label className="text-xs text-muted-foreground">ux:</Label>
                <Input type="number" step="0.5" value={line.ux} onChange={(e) => setLine({ ...line, ux: Number(e.target.value) || 0 })} className="mt-1" />
              </div>
              <div className="w-16">
                <Label className="text-xs text-muted-foreground">uy:</Label>
                <Input type="number" step="0.5" value={line.uy} onChange={(e) => setLine({ ...line, uy: Number(e.target.value) || 0 })} className="mt-1" />
              </div>
              <div className="w-16">
                <Label className="text-xs text-muted-foreground">uz:</Label>
                <Input type="number" step="0.5" value={line.uz} onChange={(e) => setLine({ ...line, uz: Number(e.target.value) || 0 })} className="mt-1" />
              </div>
            </>
          )}

          <div className="w-16">
            <Label className="text-xs text-muted-foreground">Px:</Label>
            <Input type="number" step="0.5" value={point.x} onChange={(e) => setPoint({ ...point, x: Number(e.target.value) || 0 })} className="mt-1" />
          </div>
          <div className="w-16">
            <Label className="text-xs text-muted-foreground">Py:</Label>
            <Input type="number" step="0.5" value={point.y} onChange={(e) => setPoint({ ...point, y: Number(e.target.value) || 0 })} className="mt-1" />
          </div>
          <div className="w-16">
            <Label className="text-xs text-muted-foreground">Pz:</Label>
            <Input type="number" step="0.5" value={point.z} onChange={(e) => setPoint({ ...point, z: Number(e.target.value) || 0 })} className="mt-1" />
          </div>
          {mode === "plane" && (
            <div className="flex items-center gap-3 text-xs">
              <label className="flex items-center gap-1.5">
                <input type="checkbox" checked={showNormal} onChange={(e) => setShowNormal(e.target.checked)} />
                Show normal n
              </label>
              <label className="flex items-center gap-1.5">
                <input type="checkbox" checked={showRightAngle} onChange={(e) => setShowRightAngle(e.target.checked)} />
                Right-angle marker
              </label>
            </div>
          )}
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />


        {/* Live readout */}
        <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-cyan-500">Live shortest (perpendicular) distance</p>
          {mode === "plane" ? (
            <>
              <p className="mt-1 font-mono text-sm">
                d = |{plane.a}({point.x}) + {plane.b}({point.y}) + {plane.c}({point.z}) - ({plane.d})| / sqrt({plane.a}^2 + {plane.b}^2 + {plane.c}^2)
              </p>
              <p className="mt-1 text-2xl font-bold text-cyan-500 font-mono">d = {planeDistance.toFixed(4)} units</p>
            </>
          ) : (
            <>
              <p className="mt-1 font-mono text-sm">
                d = |P - (P.u-hat)u-hat| where u-hat = ({line.ux}, {line.uy}, {line.uz}) / {uMag.toFixed(3)}
              </p>
              <p className="mt-1 text-2xl font-bold text-cyan-500 font-mono">d = {lineDistance.toFixed(4)} units</p>
            </>
          )}
          <p className="mt-1 text-xs text-muted-foreground">
            PF is the <strong>perpendicular</strong> from P — it meets the {mode === "plane" ? "plane" : "line"} at F at exactly 90 degrees
            (see the amber right-angle marker). This is the <strong>shortest</strong> possible distance from P.
          </p>
        </div>

        {/* The theorems that sit above the perpendicular-distance theorem in the syllabus */}
        <div className="pt-2">
          <h3 className="mb-1 text-sm font-semibold">The theorems above it — full ladder of results</h3>
          <MathPerpendicularTheorems />
        </div>      </CardContent>
    </Card>
  );
}

/* ============================================================
   Theorem Panel — the theorems that sit ABOVE the perpendicular
   distance theorem in the syllabus, with proofs & examples
   ============================================================ */

interface Theorem {
  title: string;
  statement: string;
  formula: string;
  proof: string;
  example: string;
}

const THEOREMS: Theorem[] = [
  {
    title: "Theorem 1 — Angle between two lines",
    statement:
      "If two non-parallel lines have slopes m1 and m2, the acute angle between them satisfies tan(theta) = |(m2 - m1)/(1 + m1*m2)|.",
    formula: "tan(theta) = |(m2 - m1) / (1 + m1*m2)|",
    proof:
      "If alpha and beta are the inclinations of the lines (alpha > beta), then theta = alpha - beta. Using tan(alpha - beta) = (tan(alpha) - tan(beta)) / (1 + tan(alpha)tan(beta)) and substituting tan(alpha) = m1, tan(beta) = m2 gives the result. The absolute value keeps theta acute. If 1 + m1*m2 = 0, the lines are perpendicular.",
    example: "Lines y = 2x + 3 and y = 5x - 1: tan(theta) = |(5 - 2)/(1 + 10)| = 3/11, so theta is about 15.26 degrees.",
  },
  {
    title: "Theorem 2 — Parallel & perpendicular conditions",
    statement:
      "Two lines with slopes m1 and m2 are parallel iff m1 = m2, and perpendicular iff m1 * m2 = -1.",
    formula: "m1 = m2 (parallel)   |   m1*m2 = -1 (perpendicular)",
    proof:
      "Parallel lines have equal inclination angles, hence equal slopes. For perpendicularity, theta = 90 degrees makes tan(theta) undefined, so from Theorem 1 the denominator must vanish: 1 + m1*m2 = 0, giving m1*m2 = -1.",
    example: "y = 3x + 1 is perpendicular to y = -(1/3)x + 4 because 3 * (-1/3) = -1.",
  },
  {
    title: "Theorem 3 — Perpendicular distance from a point to a line (main theorem)",
    statement:
      "The length of the perpendicular from P(x0, y0) to the line ax + by + c = 0 is d = |a*x0 + b*y0 + c| / sqrt(a^2 + b^2).",
    formula: "d = |a*x0 + b*y0 + c| / sqrt(a^2 + b^2)",
    proof:
      "Let F(h, k) be the foot of the perpendicular on the line. PF is parallel to the normal (a, b), so (x0 - h, y0 - k) = t(a, b). Substituting F into the line equation: a*h + b*k + c = 0 gives a*(x0 - t*a) + b*(y0 - t*b) + c = 0, so t = (a*x0 + b*y0 + c) / (a^2 + b^2). Then d = |PF| = |t| * sqrt(a^2 + b^2) = |a*x0 + b*y0 + c| / sqrt(a^2 + b^2).",
    example: "Distance from (2, 3) to 3x + 4y - 5 = 0: d = |6 + 12 - 5| / 5 = 13/5 = 2.6.",
  },
  {
    title: "Theorem 4 — Distance between two parallel lines",
    statement:
      "For parallel lines ax + by + c1 = 0 and ax + by + c2 = 0 (same a, b), the distance between them is |c1 - c2| / sqrt(a^2 + b^2).",
    formula: "d = |c1 - c2| / sqrt(a^2 + b^2)",
    proof:
      "Any perpendicular from a point on the first line reaches the second with the same length everywhere. Take the point (-c1/a, 0) on line 1 and apply Theorem 3 to line 2: d = |a*(-c1/a) + b*0 + c2| / sqrt(a^2 + b^2) = |c2 - c1| / sqrt(a^2 + b^2).",
    example: "Between 3x + 4y - 7 = 0 and 3x + 4y + 8 = 0: d = |-7 - 8| / 5 = 3.",
  },
  {
    title: "Theorem 5 — Bisectors of the angles between two lines",
    statement:
      "The bisectors of the angles between a1*x + b1*y + c1 = 0 and a2*x + b2*y + c2 = 0 are found by equating perpendicular distances to the two lines:",
    formula: "(a1*x + b1*y + c1)/sqrt(a1^2 + b1^2) = +or-(a2*x + b2*y + c2)/sqrt(a2^2 + b2^2)",
    proof:
      "A point on an angle bisector is equidistant from both lines (any point on the bisector of two lines subtends equal perpendiculars). Setting distance-to-line-1 = distance-to-line-2 via Theorem 3 and clearing the radicals gives the two equations — '+' for one bisector, '-' for the other. The two bisectors are themselves perpendicular.",
    example: "For x + y - 4 = 0 and x - y = 0: (x + y - 4)/sqrt(2) = +or-(x - y)/sqrt(2) gives y = 2 and x = 2 (the two bisectors).",
  },
  {
    title: "Theorem 6 — Perpendicular distance from a point to a plane (3D)",
    statement:
      "The length of the perpendicular from P(x0, y0, z0) to the plane ax + by + cz + d = 0 is |a*x0 + b*y0 + c*z0 + d| / sqrt(a^2 + b^2 + c^2).",
    formula: "d = |a*x0 + b*y0 + c*z0 + d| / sqrt(a^2 + b^2 + c^2)",
    proof:
      "Identical in spirit to Theorem 3 but with the 3D normal vector n = (a, b, c). The vector F - P is parallel to n, and substituting the foot back into the plane equation yields the same signed-offset division by |n| = sqrt(a^2 + b^2 + c^2). This is exactly what the 3D graph above renders: P (red), F (amber), and the dashed cyan segment PF whose length updates live.",
    example: "Distance from (1, 2, 3) to x + 2y + z - 6 = 0: d = |1 + 4 + 3 - 6| / sqrt(6) = 2/sqrt(6), about 0.8165.",
  },
];

export function MathPerpendicularTheorems() {
  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">
        The theorems below build up to the perpendicular-distance result shown in the 3D graph — each one is
        used in the proof of the next. Every card states the theorem, the formula, why it is true (proof
        sketch), and a fully worked example.
      </p>
      {THEOREMS.map((t) => (
        <div key={t.title} className="rounded-lg border border-border bg-card p-4">
          <h4 className="text-sm font-semibold">{t.title}</h4>
          <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{t.statement}</p>
          <div className="mt-2 rounded-md border border-primary/20 bg-primary/5 px-3 py-2">
            <code className="text-sm font-semibold text-primary">{t.formula}</code>
          </div>
          <div className="mt-2 space-y-1.5">
            <p className="text-xs leading-relaxed">
              <span className="font-semibold text-amber-600 dark:text-amber-400">Why it works: </span>
              {t.proof}
            </p>
            <p className="text-xs leading-relaxed">
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">Worked example: </span>
              {t.example}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

