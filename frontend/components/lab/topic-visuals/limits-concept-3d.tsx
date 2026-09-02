"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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

export function LimitsConcept3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [targetX, setTargetX] = useState(3);
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
    let trailLine: THREE.Line;

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

      const curvePoints: THREE.Vector3[] = [];
      for (let x = -8; x <= 8; x += 0.1) {
        curvePoints.push(new THREE.Vector3(x, Math.sin(x) * 2, 0));
      }
      push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(curvePoints), new THREE.LineBasicMaterial({ color: 0x60a5fa })));

      const targetLineGeom = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(targetX, -5, 0),
        new THREE.Vector3(targetX, 5, 0),
      ]);
      const targetLineMat = new THREE.LineDashedMaterial({ color: 0xf59e0b, dashSize: 0.3, gapSize: 0.2 });
      const targetLine = new THREE.Line(targetLineGeom, targetLineMat);
      targetLine.computeLineDistances();
      push(targetLine);

      push(mkSprite("lim f(x) = L", "#60a5fa", new THREE.Vector3(0, 4.5, 0)));
      push(mkSprite(`L = ${Math.sin(targetX).toFixed(2)}`, "#34d399", new THREE.Vector3(targetX + 1.5, Math.sin(targetX) * 2, 0)));

      const dotGeom = new THREE.SphereGeometry(0.2, 32, 32);
      const dotMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, emissive: 0xf59e0b, emissiveIntensity: 0.5 });
      const approachDot = push(new THREE.Mesh(dotGeom, dotMat));

      const trailPoints: THREE.Vector3[] = [];
      const trailGeom = new THREE.BufferGeometry().setFromPoints(trailPoints);
      const trailMat = new THREE.LineBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.6 });
      trailLine = push(new THREE.Line(trailGeom, trailMat));

      const animate = () => {
        frameId = requestAnimationFrame(animate);
        animTime += 0.02;
        const xProgress = 1 - Math.exp(-animTime * 0.3);
        approachDot.position.x = -6 + 12 * xProgress;
        approachDot.position.y = Math.sin(approachDot.position.x) * 2;
        if (trailPoints.length === 0 || approachDot.position.distanceTo(trailPoints[trailPoints.length - 1]) > 0.1) {
          trailPoints.push(approachDot.position.clone());
          if (trailPoints.length > 100) trailPoints.shift();
          trailGeom.setFromPoints(trailPoints);
        }
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
  }, [targetX, isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="Concept of Limit" description="Animated point approaching a curve — requires WebGL." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Concept of Limit — 3D</span>
          <span className="text-xs text-muted-foreground font-normal">Watch the orange dot approach the curve</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Target x-value">
          <div className="w-20 mt-1">
            <Label className="text-xs text-muted-foreground">a:</Label>
            <Input type="number" step="0.5" value={targetX} onChange={(e) => setTargetX(Number(e.target.value))} className="mt-1" />
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-400">The Limit Concept</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">lim(x→a) f(x) = L</strong> means f(x) gets arbitrarily close to L as x approaches a.</p>
            <p><strong className="text-foreground">The dot</strong> traces the curve, showing how the function behaves near a.</p>
            <p><strong className="text-foreground">Trail</strong> shows the path taken — observe how it smooths out near the target.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}