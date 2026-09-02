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
  s.scale.set(3.5 * scale, 0.65 * scale, 1);
  return s;
}

type ContinuityType = "continuous" | "removable" | "jump" | "infinite";

export function Continuity3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ctype, setCtype] = useState<ContinuityType>("continuous");
  const [isWebGL, setIsWebGL] = useState(true);

  useEffect(() => { setIsWebGL(isWebGLAvailable()); }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isWebGL) return;

    let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer;
    let controls: any;
    let frameId: number;
    let animTime = 0;
    const meshes: THREE.Object3D[] = [];

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
      controls.minDistance = 5;
      controls.maxDistance = 25;

      scene.add(new THREE.AmbientLight(0xffffff, 0.7));

      const push = <T extends THREE.Object3D>(o: T): T => { scene.add(o); meshes.push(o); return o; };

      const grid = new THREE.GridHelper(20, 20, 0x334155, 0x1e293b);
      grid.rotation.x = Math.PI / 2;
      push(grid);

      const a = 2;

      if (ctype === "continuous") {
        push(mkSprite("Continuous: lim = f(a)", "#34d399", new THREE.Vector3(0, 4.5, 0)));
        const pts: THREE.Vector3[] = [];
        for (let x = -6; x <= 6; x += 0.05) {
          pts.push(new THREE.Vector3(x, Math.sin(x) * 1.5, 0));
        }
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: 0x60a5fa })));
        const dot = new THREE.Mesh(
          new THREE.SphereGeometry(0.2, 32, 32),
          new THREE.MeshStandardMaterial({ color: 0x34d399, emissive: 0x34d399, emissiveIntensity: 0.5 })
        );
        dot.position.set(a, Math.sin(a) * 1.5, 0);
        push(dot);
        push(mkSprite("lim = f(a)", "#34d399", new THREE.Vector3(a + 1, Math.sin(a) * 1.5 + 1, 0)));
      } else if (ctype === "removable") {
        push(mkSprite("Removable: lim != f(a)", "#f59e0b", new THREE.Vector3(0, 4.5, 0)));
        const pts: THREE.Vector3[] = [];
        for (let x = -6; x <= 6; x += 0.05) {
          if (Math.abs(x - a) < 0.15) continue;
          pts.push(new THREE.Vector3(x, Math.sin(x) * 1.5, 0));
        }
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: 0x60a5fa })));
        const hole = new THREE.Mesh(new THREE.RingGeometry(0.15, 0.25, 32), new THREE.MeshBasicMaterial({ color: 0xf59e0b, side: THREE.DoubleSide }));
        hole.position.set(a, Math.sin(a) * 1.5, 0);
        push(hole);
        const dot = new THREE.Mesh(
          new THREE.SphereGeometry(0.2, 32, 32),
          new THREE.MeshStandardMaterial({ color: 0x34d399, emissive: 0x34d399, emissiveIntensity: 0.5 })
        );
        dot.position.set(a, Math.sin(a) * 1.5 + 1.5, 0);
        push(dot);
        push(mkSprite("hole != defined point", "#f59e0b", new THREE.Vector3(a + 1, Math.sin(a) * 1.5 + 0.5, 0)));
      } else if (ctype === "jump") {
        push(mkSprite("Jump: LHL != RHS", "#ec4899", new THREE.Vector3(0, 4.5, 0)));
        const leftPts: THREE.Vector3[] = [];
        const rightPts: THREE.Vector3[] = [];
        for (let x = -6; x < a - 0.05; x += 0.05) leftPts.push(new THREE.Vector3(x, Math.sin(x) * 0.5 + 1, 0));
        for (let x = a + 0.05; x <= 6; x += 0.05) rightPts.push(new THREE.Vector3(x, Math.sin(x) * 0.5 - 1, 0));
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(leftPts), new THREE.LineBasicMaterial({ color: 0x60a5fa })));
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(rightPts), new THREE.LineBasicMaterial({ color: 0x60a5fa })));
        const leftHole = new THREE.Mesh(new THREE.RingGeometry(0.12, 0.2, 32), new THREE.MeshBasicMaterial({ color: 0xec4899, side: THREE.DoubleSide }));
        leftHole.position.set(a - 0.05, Math.sin(a - 0.05) * 0.5 + 1, 0);
        push(leftHole);
        const rightHole = new THREE.Mesh(new THREE.RingGeometry(0.12, 0.2, 32), new THREE.MeshBasicMaterial({ color: 0xec4899, side: THREE.DoubleSide }));
        rightHole.position.set(a + 0.05, Math.sin(a + 0.05) * 0.5 - 1, 0);
        push(rightHole);
        push(mkSprite("LHL != RHS", "#ec4899", new THREE.Vector3(a, -2, 0)));
      } else {
        push(mkSprite("Infinite: Vertical Asymptote", "#f43f5e", new THREE.Vector3(0, 4.5, 0)));
        const leftPts: THREE.Vector3[] = [];
        const rightPts: THREE.Vector3[] = [];
        for (let x = -6; x < a - 0.1; x += 0.05) leftPts.push(new THREE.Vector3(x, 2 / (x - a) + 0.5, 0));
        for (let x = a + 0.1; x <= 6; x += 0.05) rightPts.push(new THREE.Vector3(x, 2 / (x - a) + 0.5, 0));
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(leftPts), new THREE.LineBasicMaterial({ color: 0x60a5fa })));
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(rightPts), new THREE.LineBasicMaterial({ color: 0x60a5fa })));
        const asymp = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(a, -8, 0), new THREE.Vector3(a, 8, 0)]),
          new THREE.LineDashedMaterial({ color: 0xf43f5e, dashSize: 0.3, gapSize: 0.2 })
        );
        asymp.computeLineDistances();
        push(asymp);
        push(mkSprite("lim -> inf", "#f43f5e", new THREE.Vector3(a + 1, 3, 0)));
      }

      const animate = () => {
        frameId = requestAnimationFrame(animate);
        animTime += 0.01;
        controls.update();
        renderer.render(scene, camera);
      };
      animate();
    };

    const cleanup = async () => {
      await init();
      return () => {
        cancelAnimationFrame(frameId);
        const parent = renderer.domElement.parentNode;
        if (parent) parent.removeChild(renderer.domElement);
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

    const cleanupPromise = cleanup();
    return () => { cleanupPromise.then((d) => d?.()); };
  }, [ctype, isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="Continuity" description="Continuous vs discontinuous functions — requires WebGL." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Continuity — 3D Visualization</span>
          <span className="text-xs text-muted-foreground font-normal">Four types of continuity behavior</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Continuity Type">
          <div className="flex flex-wrap gap-2 mt-2">
            {(["continuous", "removable", "jump", "infinite"] as ContinuityType[]).map((t) => (
              <button key={t} onClick={() => setCtype(t)} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${ctype === t ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
                {t === "continuous" ? "Continuous" : t === "removable" ? "Removable" : t === "jump" ? "Jump" : "Infinite"}
              </button>
            ))}
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-400">Continuity Criteria</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Continuous:</strong> lim(x{'->'}a) f(x) = f(a)</p>
            <p><strong className="text-foreground">Removable:</strong> limit exists but f(a) is undefined or different</p>
            <p><strong className="text-foreground">Jump:</strong> left-hand limit {'!='} right-hand limit</p>
            <p><strong className="text-foreground">Infinite:</strong> function approaches inf near a</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}