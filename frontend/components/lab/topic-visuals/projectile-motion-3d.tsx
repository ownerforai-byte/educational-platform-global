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

export function ProjectileMotionVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [angle, setAngle] = useState(45);
  const [velocity, setVelocity] = useState(20);
  const [isWebGL] = useState(() => isWebGLAvailable());
  const [animating, setAnimating] = useState(true);


  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isWebGL) return;

    let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer;
    let controls: any, frameId: number;
    const meshes: THREE.Object3D[] = [];
    let launchTime = 0;
    const g = 9.8;
    const tMax = (2 * velocity * Math.sin(angle * Math.PI / 180)) / g;

    const init = async () => {
      const { OrbitControls } = await import("three/addons/controls/OrbitControls.js");

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0f172a);
      camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
      camera.position.set(-5, 6, 12);
      camera.lookAt(5, 2, 0);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.autoRotate = false;
      controls.minDistance = 5;
      controls.maxDistance = 30;

      scene.add(new THREE.AmbientLight(0xffffff, 0.7));
      const dir = new THREE.DirectionalLight(0xffffff, 1.0);
      dir.position.set(5, 10, 5);
      scene.add(dir);

      const push = <T extends THREE.Object3D>(o: T): T => { scene.add(o); meshes.push(o); return o; };

      // Ground
      push(new THREE.GridHelper(30, 30, 0x334155, 0x1e293b));
      const ground = push(new THREE.Mesh(
        new THREE.PlaneGeometry(30, 6),
        new THREE.MeshBasicMaterial({ color: 0x1e293b }),
      ));
      ground.rotation.x = -Math.PI / 2;
      ground.position.set(5, -0.01, 0);

      // Trajectory path (static)
      const pts: THREE.Vector3[] = [];
      for (let t = 0; t <= tMax; t += 0.02) {
        const x = velocity * Math.cos(angle * Math.PI / 180) * t;
        const y = velocity * Math.sin(angle * Math.PI / 180) * t - 0.5 * g * t * t;
        pts.push(new THREE.Vector3(x * 0.5, y * 0.15, 0));
      }
      push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: 0x64748b, transparent: true, opacity: 0.4 })));

      // Angle arc at origin
      const arcPts: THREE.Vector3[] = [];
      for (let a = 0; a <= angle * Math.PI / 180; a += 0.05) {
        arcPts.push(new THREE.Vector3(1.5 * Math.cos(a), 1.5 * Math.sin(a), 0));
      }
      push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(arcPts), new THREE.LineBasicMaterial({ color: 0xfbbf24 })));
      push(mkSprite(`θ = ${angle}°`, "#fbbf24", new THREE.Vector3(2.2, 0.8, 0), 0.7));

      // Initial velocity arrow
      const vDir = new THREE.Vector3(Math.cos(angle * Math.PI / 180), Math.sin(angle * Math.PI / 180), 0).normalize();
      push(new THREE.ArrowHelper(vDir, new THREE.Vector3(0, 0, 0), 3, 0x22d3ee, 0.2, 0.1));
      push(mkSprite("v₀", "#22d3ee", new THREE.Vector3(1.8, 2.2, 0), 0.8));

      // g arrow (pointing down)
      push(new THREE.ArrowHelper(new THREE.Vector3(0, -1, 0), new THREE.Vector3(0, 0, 0), 2.5, 0xef4444, 0.2, 0.1));
      push(mkSprite("g (acceleration)", "#ef4444", new THREE.Vector3(-2.5, -1.0, 0), 0.7));

      // Max height label with long arrow
      const hMax = (velocity * Math.sin(angle * Math.PI / 180)) ** 2 / (2 * g);
      const hPt = new THREE.Vector3(
        velocity * Math.cos(angle * Math.PI / 180) * (tMax / 2) * 0.5,
        hMax * 0.15,
        0
      );
      const hLabelPos = new THREE.Vector3(hPt.x + 3, hPt.y + 2, 0);
      const hDir = hPt.clone().sub(hLabelPos).normalize();
      push(new THREE.ArrowHelper(hDir, hLabelPos, hLabelPos.distanceTo(hPt) * 0.9, 0xa78bfa, 0.15, 0.1));
      push(mkSprite(`H_max = ${hMax.toFixed(1)} m`, "#a78bfa", hLabelPos.clone().sub(hDir.multiplyScalar(0.5)), 0.75));

      // Range label with long arrow
      const R = (velocity ** 2 * Math.sin(2 * angle * Math.PI / 180)) / g;
      const rPt = new THREE.Vector3(R * 0.5, 0, 0);
      const rLabelPos = new THREE.Vector3(rPt.x, -1.5, 0);
      const rDir = rPt.clone().sub(rLabelPos).normalize();
      push(new THREE.ArrowHelper(rDir, rLabelPos, rLabelPos.distanceTo(rPt) * 0.9, 0x34d399, 0.15, 0.1));
      push(mkSprite(`Range = ${R.toFixed(1)} m`, "#34d399", rLabelPos.clone().sub(rDir.multiplyScalar(0.5)), 0.75));

      // Ball mesh
      const ball = push(new THREE.Mesh(
        new THREE.SphereGeometry(0.2, 16, 16),
        new THREE.MeshBasicMaterial({ color: 0xf97316 }),
      )) as THREE.Mesh;

      // Trail points
      const trailPts: THREE.Vector3[] = [];
      const trailLine = push(new THREE.Line(
        new THREE.BufferGeometry(),
        new THREE.LineBasicMaterial({ color: 0xf97316 }),
      )) as THREE.Line;

      let prevPos = new THREE.Vector3(0, 0, 0);
      update();

      function update() {
        while (meshes.length > 60) {
          const m = meshes.pop()!;
          scene.remove(m);
          if (m instanceof THREE.Mesh) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Line) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Sprite) { (m.material as THREE.SpriteMaterial).map?.dispose?.(); m.material.dispose(); }
          else if (m instanceof THREE.ArrowHelper) m.dispose();
        }
      }

      const animate = () => {
        frameId = requestAnimationFrame(animate);
        controls.update();
        if (animating) {
          launchTime += 0.016;
          const t = Math.min(launchTime, tMax);
          const x = velocity * Math.cos(angle * Math.PI / 180) * t;
          const y = velocity * Math.sin(angle * Math.PI / 180) * t - 0.5 * g * t * t;
          ball.position.set(x * 0.5, Math.max(y * 0.15, 0), 0);

          trailPts.push(new THREE.Vector3(x * 0.5, Math.max(y * 0.15, 0), 0));
          if (trailPts.length > 200) trailPts.shift();
          (trailLine.geometry as THREE.BufferGeometry).setFromPoints(trailPts);
        }
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
  }, [angle, velocity, animating, isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="Projectile Motion" description="Animated trajectory with velocity/acceleration arrows." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Projectile Motion — Trajectory & Arrows</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate · Scroll to zoom</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Launch Parameters">
          <div className="flex flex-wrap gap-4 mt-2">
            <div className="w-24">
              <Label className="text-xs text-muted-foreground">Angle θ (°):</Label>
              <Input type="range" min={10} max={80} step={1} value={angle} onChange={(e) => setAngle(Number(e.target.value))} className="mt-1 w-full" />
              <p className="text-xs font-mono text-primary mt-1">{angle}°</p>
            </div>
            <div className="w-24">
              <Label className="text-xs text-muted-foreground">Velocity v₀ (m/s):</Label>
              <Input type="range" min={5} max={50} step={1} value={velocity} onChange={(e) => setVelocity(Number(e.target.value))} className="mt-1 w-full" />
              <p className="text-xs font-mono text-primary mt-1">{velocity} m/s</p>
            </div>
          </div>
        </CollapsibleControls>

        <div className="flex gap-2">
          <button
            onClick={() => setAnimating(!animating)}
            className="px-3 py-1.5 rounded-md text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {animating ? "Pause" : "Play"}
          </button>
          <button
            onClick={() => window.location.reload()}
            className="px-3 py-1.5 rounded-md text-xs font-medium bg-muted text-muted-foreground hover:bg-muted/80"
          >
            Reset
          </button>
        </div>

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-orange-500/30 bg-orange-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-orange-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Horizontal motion:</strong> Constant velocity — no air resistance assumed.</p>
            <p><strong className="text-foreground">Vertical motion:</strong> Uniform acceleration downward due to gravity (g = 9.8 m/s²).</p>
            <p><strong className="text-foreground">Max height:</strong> H = v₀²sin²θ / (2g)</p>
            <p><strong className="text-foreground">Range:</strong> R = v₀²sin(2θ) / g — maximum at θ = 45°</p>
            <p><strong className="text-foreground">Trajectory:</strong> Parabolic path — y = x tanθ − gx²/(2v₀²cos²θ)</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
