"use client";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { isWebGLAvailable } from "@/lib/webgl";
import { Label } from "@/components/ui/label";

export function PhysicsThreeBody() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [speed, setSpeed] = useState(1);
  const [isRunning, setIsRunning] = useState(true);
  const frameRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isWebGLAvailable()) return;
    let cancelled = false;
    let scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f172a);
    let camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 8, 12);
    let renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    let controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const dir = new THREE.DirectionalLight(0xffffff, 1);
    dir.position.set(5, 10, 5); scene.add(dir);
    scene.add(new THREE.GridHelper(20, 20, 0x334155, 0x1e293b));
    const colors = [0xef4444, 0x22c55e, 0x3b82f6];
    const balls: THREE.Mesh[] = [];
    for (let i = 0; i < 3; i++) {
      const ball = new THREE.Mesh(new THREE.SphereGeometry(0.4, 24, 24), new THREE.MeshStandardMaterial({ color: colors[i], roughness: 0.3 }));
      ball.position.set(i === 0 ? -2 : i === 1 ? 2 : 0, i === 2 ? 2 : 0, 0);
      scene.add(ball); balls.push(ball);
    }
    const animate = () => {
      if (cancelled) return;
      frameRef.current = requestAnimationFrame(animate);
      if (isRunning) {
        const t = Date.now() * 0.001 * speed;
        balls[0].position.set(Math.sin(t) * 2, Math.sin(t * 0.7) * 1.5, Math.cos(t) * 2);
        balls[1].position.set(Math.sin(t * 1.2 + 1) * 2, Math.sin(t * 1.3) * 1.5, Math.cos(t * 1.2 + 1) * 2);
        balls[2].position.set(Math.sin(t * 0.8 + 2) * 2, Math.sin(t * 0.9) * 1.5, Math.cos(t * 0.8 + 2) * 2);
      }
      controls.update(); renderer.render(scene, camera);
    };
    animate();
    return () => { cancelled = true; cancelAnimationFrame(frameRef.current); renderer.dispose(); controls.dispose(); };
  }, [speed, isRunning]);

  return (
    <div className="space-y-4">
      <div ref={containerRef} className="w-full rounded-md border border-border" style={{ height: "clamp(300px, 50vh, 500px)" }} />
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-md border border-border bg-muted/30 p-3"><Label>Speed</Label><input type="range" min={0.2} max={3} step={0.1} value={speed} onChange={(e) => setSpeed(parseFloat(e.target.value))} className="w-full" /><p className="text-xs">{speed.toFixed(1)}x</p></div>
        <div className="rounded-md border border-border bg-muted/30 p-3"><Label>Sim</Label><button onClick={() => setIsRunning(!isRunning)} className={`px-3 py-1.5 text-xs rounded-lg ${isRunning ? "bg-red-500/20 text-red-400" : "bg-emerald-500/20 text-emerald-400"}`}>{isRunning ? "Pause" : "Play"}</button></div>
      </div>
      <div className="rounded-md border border-primary/20 bg-primary/5 p-3"><p className="text-xs font-semibold uppercase text-primary">Three-Body Problem — Chaotic Orbits</p><p className="text-xs text-muted-foreground mt-1">Three bodies under mutual gravity create unpredictable, chaotic trajectories. Even with deterministic rules, long-term prediction is impossible.</p></div>
    </div>
  );
}
