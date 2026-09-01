"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallback } from "@/components/lab/webgl-fallback";
import * as THREE from "three";

/* ============================================================
   Limits & Continuity — NEB Calculus (Maths 11 & 12)
   Animated visualization of lim(x→a) f(x), discontinuities,
   left-hand and right-hand limits.
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
  ctx.font = "bold 32px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = color;
  ctx.fillText(text, 256, 48);
  const tex = new THREE.CanvasTexture(canvas);
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false }));
  s.position.copy(pos);
  s.scale.set(3.0 * scale, 0.56 * scale, 1);
  return s;
}

type DiscontinuityType = "removable" | "jump" | "infinite" | "continuous";

export function LimitsContinuityVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [disType, setDisType] = useState<DiscontinuityType>("continuous");
  const [a, setA] = useState(2);
  const [isWebGL, setIsWebGL] = useState(true);

  useEffect(() => { setIsWebGL(isWebGLAvailable()); }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isWebGL) return;

    let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer;
    let controls: any, frameId: number, animId: number;
    const meshes: THREE.Object3D[] = [];
    let dotPos = 0;

    const init = async () => {
      const { OrbitControls } = await import("three/addons/controls/OrbitControls.js");

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0f172a);
      camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
      camera.position.set(0, 0, 14);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.autoRotate = false;
      controls.minDistance = 5;
      controls.maxDistance = 25;

      scene.add(new THREE.AmbientLight(0xffffff, 0.7));

      const push = <T extends THREE.Object3D>(o: T): T => { scene.add(o); meshes.push(o); return o; };

      // Axes
      const mkAxis = (from: THREE.Vector2, to: THREE.Vector2, color: number, label: string) => {
        push(new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(from.x, from.y, 0), new THREE.Vector3(to.x, to.y, 0)]),
          new THREE.LineBasicMaterial({ color }),
        ));
        push(mkSprite(label, `#${color.toString(16).padStart(6, "0")}`, new THREE.Vector3(to.x, to.y, 0.05), 0.6));
      };
      mkAxis(new THREE.Vector2(-10, 0), new THREE.Vector2(10, 0), 0xef4444, "x");
      mkAxis(new THREE.Vector2(0, -10), new THREE.Vector2(0, 10), 0x22c55e, "y");

      for (let i = -10; i <= 10; i++) {
        if (i === 0) continue;
        push(new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(i, -10, 0), new THREE.Vector3(i, 10, 0)]),
          new THREE.LineBasicMaterial({ color: 0x1e293b }),
        ));
        push(new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-10, i, 0), new THREE.Vector3(10, i, 0)]),
          new THREE.LineBasicMaterial({ color: 0x1e293b }),
        ));
      }

      // Vertical line at x = a
      push(new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(a, -10, 0), new THREE.Vector3(a, 10, 0)]),
        new THREE.LineDashedMaterial({ color: 0xfbbf24, dashSize: 0.2, gapSize: 0.15 }),
      ) as any);
      (meshes[meshes.length - 1] as any).computeLineDistances();

      const fValues: { left: number; right: number; actual?: number; open?: boolean }[] = [];
      const steps = 200;
      for (let i = 0; i <= steps; i++) {
        const x = -10 + (i / steps) * 20;
        let y: number;
        switch (disType) {
          case "continuous": y = Math.sin(x - a) * 2 + 1; break;
          case "removable":
            if (Math.abs(x - a) < 0.01) y = 99;
            else y = Math.sin(x - a) * 2 + 1;
            break;
          case "jump":
            y = x < a ? Math.sin(x) * 1.5 + 1 : Math.sin(x) * 1.5 - 1;
            break;
          case "infinite":
            y = 2 / (x - a);
            break;
          default: y = 0;
        }
        fValues.push({
          left: x < a ? y : NaN,
          right: x >= a ? y : NaN,
          actual: Math.abs(x - a) < 0.01 ? (disType === "removable" ? 2.5 : undefined) : y,
          open: disType === "removable" && Math.abs(x - a) < 0.01,
        });
      }

      // Curve line
      const curvePoints: THREE.Vector3[] = [];
      fValues.forEach((v, i) => {
        const x = -10 + (i / steps) * 20;
        if (disType === "infinite" && Math.abs(v.actual!) > 10) return;
        curvePoints.push(new THREE.Vector3(x, v.actual ?? 0, 0.02));
      });
      push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(curvePoints), new THREE.LineBasicMaterial({ color: 0x22d3ee, linewidth: 2 })));

      // Limit point marker at x = a
      let limitY = 0;
      if (disType === "continuous") limitY = Math.sin(0) * 2 + 1;
      else if (disType === "removable") limitY = 2.5;
      else if (disType === "jump") {
        limitY = (Math.sin(a - 0.01) * 1.5 + 1 + Math.sin(a + 0.01) * 1.5 - 1) / 2;
      } else if (disType === "infinite") limitY = 0;

      // Approaching dot
      const dot = push(new THREE.Mesh(new THREE.SphereGeometry(0.15, 12, 12), new THREE.MeshBasicMaterial({ color: 0xf97316 }))) as THREE.Mesh;
      dot.position.set(-10, 0, 0.05);

      let dir = 1;
      const speed = 0.04;

      const animate = () => {
        frameId = requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      };
      animate();

      // Animation loop for approaching dot
      const animLoop = () => {
        animId = requestAnimationFrame(animLoop);
        dotPos += speed * dir;
        if (dotPos >= a) { dir = -1; dotPos = a; }
        if (dotPos <= -10) { dir = 1; dotPos = -10; }

        let yVal = 0;
        switch (disType) {
          case "continuous": yVal = Math.sin(dotPos - a) * 2 + 1; break;
          case "removable": yVal = Math.sin(dotPos - a) * 2 + 1; break;
          case "jump": yVal = dotPos < a ? Math.sin(dotPos) * 1.5 + 1 : Math.sin(dotPos) * 1.5 - 1; break;
          case "infinite": yVal = dotPos !== a ? 2 / (dotPos - a) : 0; break;
        }

        dot.position.x = dotPos;
        dot.position.y = Math.max(-9, Math.min(9, yVal));
      };
      animLoop();

      // L-hat and R-hat markers
      push(mkSprite(`lim(x→${a}⁻) = ${limitY.toFixed(2)}`, "#22d3ee", new THREE.Vector3(a - 3, 7, 0), 0.9));
      push(mkSprite(`lim(x→${a}⁺) = ${limitY.toFixed(2)}`, "#a78bfa", new THREE.Vector3(a + 3, 7, 0), 0.9));

      // f(a) marker (open circle for removable)
      if (disType === "removable") {
        const openCircle = push(new THREE.Mesh(
          new THREE.RingGeometry(0.15, 0.22, 16),
          new THREE.MeshBasicMaterial({ color: 0xef4444, side: THREE.DoubleSide }),
        ) as THREE.Mesh);
        openCircle.position.set(a, limitY, 0.05);
        const fillCircle = push(new THREE.Mesh(
          new THREE.CircleGeometry(0.15, 16),
          new THREE.MeshBasicMaterial({ color: 0xef4444 }),
        ) as THREE.Mesh);
        fillCircle.position.set(a, 2.5, 0.05);
      } else if (disType === "jump") {
        const yLeft = Math.sin(a - 0.01) * 1.5 + 1;
        const yRight = Math.sin(a + 0.01) * 1.5 - 1;
        const lc = push(new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 8), new THREE.MeshBasicMaterial({ color: 0x22d3ee }))) as THREE.Mesh;
        lc.position.set(a, yLeft, 0.05);
        const rc = push(new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 8), new THREE.MeshBasicMaterial({ color: 0xa78bfa }))) as THREE.Mesh;
        rc.position.set(a, yRight, 0.05);
      }

      return () => {
        cancelAnimationFrame(frameId);
        cancelAnimationFrame(animId);
        if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
        meshes.forEach((m) => {
          scene.remove(m);
          if (m instanceof THREE.Mesh) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Line) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Sprite) { (m.material as THREE.SpriteMaterial).map?.dispose?.(); m.material.dispose(); }
        });
        renderer.dispose();
        controls.dispose?.();
      };
    };

    const cleanup = init();
    return () => { cleanup.then((d) => d?.()); };
  }, [disType, a, isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="Limits & Continuity" description="Animated limit visualization — requires WebGL." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Limits & Continuity</span>
          <span className="text-xs text-muted-foreground font-normal">Watch the orange dot approach x = {a}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Discontinuity Type">
          <div className="flex flex-wrap gap-2 mt-2">
            {(["continuous", "removable", "jump", "infinite"] as DiscontinuityType[]).map((t) => (
              <button
                key={t}
                onClick={() => setDisType(t)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  disType === t
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {t === "continuous" ? "Continuous" : t === "removable" ? "Removable" : t === "jump" ? "Jump" : "Infinite"}
              </button>
            ))}
          </div>
        </CollapsibleControls>

        <CollapsibleControls label="Approach Point (a)">
          <div className="w-20 mt-1">
            <Label className="text-xs text-muted-foreground">a:</Label>
            <Input type="number" step="0.5" value={a} onChange={(e) => setA(Number(e.target.value))} className="mt-1" />
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-orange-500/30 bg-orange-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-orange-400">Key Ideas</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">lim(x→a) f(x) = L</strong> means f(x) gets arbitrarily close to L as x approaches a from both sides.</p>
            <p><strong className="text-foreground">Left-hand limit:</strong> lim(x→a⁻) f(x) — approaching from values less than a.</p>
            <p><strong className="text-foreground">Right-hand limit:</strong> lim(x→a⁺) f(x) — approaching from values greater than a.</p>
            <p><strong className="text-foreground">Continuous at a:</strong> lim(x→a) f(x) = f(a) — all three exist and are equal.</p>
            <p><strong className="text-foreground">Removable discontinuity:</strong> limit exists but f(a) is undefined or different.</p>
            <p><strong className="text-foreground">Jump discontinuity:</strong> LHL ≠ RHS — limit does not exist.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
