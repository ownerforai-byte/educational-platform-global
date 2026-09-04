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

export function CircularMotionVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [radius, setRadius] = useState(3);
  const [speed, setSpeed] = useState(2);
  const [isWebGL] = useState(() => isWebGLAvailable());


  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isWebGL) return;

    let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer;
    let controls: any, frameId: number;
    const meshes: THREE.Object3D[] = [];
    let angle = 0;

    const init = async () => {
      const { OrbitControls } = await import("three/addons/controls/OrbitControls.js");

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0f172a);
      camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
      camera.position.set(0, 8, 10);
      camera.lookAt(0, 0, 0);

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
      const dir = new THREE.DirectionalLight(0xffffff, 1.0);
      dir.position.set(5, 10, 5);
      scene.add(dir);

      const push = <T extends THREE.Object3D>(o: T): T => { scene.add(o); meshes.push(o); return o; };

      // Circle path
      const circlePts: THREE.Vector3[] = [];
      for (let i = 0; i <= 100; i++) {
        const a = (i / 100) * 2 * Math.PI;
        circlePts.push(new THREE.Vector3(radius * Math.cos(a), 0, radius * Math.sin(a)));
      }
      push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(circlePts), new THREE.LineBasicMaterial({ color: 0x334155, transparent: true, opacity: 0.5 })));

      // Center point
      const center = push(new THREE.Mesh(
        new THREE.SphereGeometry(0.15, 12, 12),
        new THREE.MeshBasicMaterial({ color: 0x475569 }),
      ));
      push(mkSprite("Center (O)", "#475569", new THREE.Vector3(0, 0.8, 0), 0.6));

      // Radius line with label
      const radiusLabelPos = new THREE.Vector3(radius + 2, 1, 0);
      const radiusTarget = new THREE.Vector3(radius, 0, 0);
      const radiusDir = radiusTarget.clone().sub(radiusLabelPos).normalize();
      push(new THREE.ArrowHelper(radiusDir, radiusLabelPos, radiusLabelPos.distanceTo(radiusTarget) * 0.9, 0x94a3b8, 0.15, 0.1));
      push(mkSprite(`r = ${radius} m`, "#94a3b8", radiusLabelPos.clone().sub(radiusDir.multiplyScalar(0.5)), 0.75));

      // Tangential velocity arrow (always tangent to circle)
      const velLabelPos = new THREE.Vector3(radius, 0, radius + 3);
      const velTarget = new THREE.Vector3(radius, 0, radius);
      const velDir = velTarget.clone().sub(velLabelPos).normalize();
      push(new THREE.ArrowHelper(velDir, velLabelPos, velLabelPos.distanceTo(velTarget) * 0.9, 0x22d3ee, 0.2, 0.1));
      push(mkSprite("v (tangential velocity)", "#22d3ee", velLabelPos.clone().sub(velDir.multiplyScalar(0.5)), 0.7));

      // Centripetal force arrow (toward center)
      const cfLabelPos = new THREE.Vector3(radius + 3, 1.5, 0);
      const cfTarget = new THREE.Vector3(radius * 0.5, 0, 0);
      const cfDir = cfTarget.clone().sub(cfLabelPos).normalize();
      push(new THREE.ArrowHelper(cfDir, cfLabelPos, cfLabelPos.distanceTo(cfTarget) * 0.9, 0xef4444, 0.2, 0.1));
      push(mkSprite("F_c = mv²/r (centripetal force)", "#ef4444", cfLabelPos.clone().sub(cfDir.multiplyScalar(0.5)), 0.7));

      // Angular velocity label
      const angLabelPos = new THREE.Vector3(-radius - 2, 1.5, 0);
      const angTarget = new THREE.Vector3(0, 0, 0);
      const angDir = angTarget.clone().sub(angLabelPos).normalize();
      push(new THREE.ArrowHelper(angDir, angLabelPos, angLabelPos.distanceTo(angTarget) * 0.9, 0xa78bfa, 0.15, 0.1));
      push(mkSprite("ω (angular velocity)", "#a78bfa", angLabelPos.clone().sub(angDir.multiplyScalar(0.5)), 0.75));

      // Orbiting ball
      const ball = push(new THREE.Mesh(
        new THREE.SphereGeometry(0.3, 16, 16),
        new THREE.MeshBasicMaterial({ color: 0xf97316 }),
      )) as THREE.Mesh;

      // Angle arc indicator
      const arcPts: THREE.Vector3[] = [];
      for (let a = 0; a <= Math.PI / 4; a += 0.05) {
        arcPts.push(new THREE.Vector3(1.2 * Math.cos(a), 0, 1.2 * Math.sin(a)));
      }
      const arcLine = push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(arcPts), new THREE.LineBasicMaterial({ color: 0xfbbf24 })));
      push(mkSprite("θ", "#fbbf24", new THREE.Vector3(1.8, 0.3, 0.5), 0.7));

      const update = () => {
        while (meshes.length > 30) {
          const m = meshes.pop()!;
          scene.remove(m);
          if (m instanceof THREE.Mesh) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Line) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Sprite) { (m.material as THREE.SpriteMaterial).map?.dispose?.(); m.material.dispose(); }
          else if (m instanceof THREE.ArrowHelper) m.dispose();
        }
      };
      update();

      const animate = () => {
        frameId = requestAnimationFrame(animate);
        controls.update();
        angle += speed * 0.02;
        ball.position.set(radius * Math.cos(angle), 0, radius * Math.sin(angle));
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
          else if (m instanceof THREE.ArrowHelper) m.dispose();
        });
        renderer.dispose();
        controls.dispose?.();
      };
    };

    const cleanup = init();
    return () => { cleanup.then((d) => d?.()); };
  }, [radius, speed, isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="Circular Motion" description="Centripetal force and velocity arrows in 3D." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Circular Motion — Centripetal Force & Velocity</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate · Scroll to zoom</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Circular Motion Parameters">
          <div className="flex flex-wrap gap-4 mt-2">
            <div className="w-28">
              <Label className="text-xs text-muted-foreground">Radius r (m):</Label>
              <Input type="range" min={1} max={5} step={0.1} value={radius} onChange={(e) => setRadius(Number(e.target.value))} className="mt-1 w-full" />
              <p className="text-xs font-mono text-primary mt-1">{radius.toFixed(1)} m</p>
            </div>
            <div className="w-28">
              <Label className="text-xs text-muted-foreground">Speed v (m/s):</Label>
              <Input type="range" min={0.5} max={5} step={0.1} value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="mt-1 w-full" />
              <p className="text-xs font-mono text-primary mt-1">{speed.toFixed(1)} m/s</p>
            </div>
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-red-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Centripetal acceleration:</strong> a_c = v²/r = ω²r — always directed toward the center.</p>
            <p><strong className="text-foreground">Centripetal force:</strong> F_c = mv²/r — required to keep object in circular path.</p>
            <p><strong className="text-foreground">Tangential velocity:</strong> v = ωr — always perpendicular to radius.</p>
            <p><strong className="text-foreground">Period:</strong> T = 2πr/v = 2π/ω</p>
            <p><strong className="text-foreground">Note:</strong> Centripetal force is not a new force — it's the net force toward center (tension, gravity, friction, etc.).</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
