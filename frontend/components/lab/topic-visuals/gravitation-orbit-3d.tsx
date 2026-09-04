"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallback } from "@/components/lab/webgl-fallback";
import * as THREE from "three";
import { LiveArrow } from "@/components/lab/animated-arrow-helper";

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

export function GravitationVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mass, setMass] = useState(100);
  const [orbitalRadius, setOrbitalRadius] = useState(5);
  const [isWebGL] = useState(() => isWebGLAvailable());


  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isWebGL) return;

    let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer;
    let controls: any, frameId: number;
    const meshes: THREE.Object3D[] = [];
    let satAngle = 0;

    const init = async () => {
      const { OrbitControls } = await import("three/addons/controls/OrbitControls.js");

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0f172a);
      camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
      camera.position.set(0, 10, 12);
      camera.lookAt(0, 0, 0);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.autoRotate = false;
      controls.minDistance = 5;
      controls.maxDistance = 30;

      scene.add(new THREE.AmbientLight(0xffffff, 0.6));
      const dir = new THREE.DirectionalLight(0xffffff, 1.0);
      dir.position.set(5, 10, 5);
      scene.add(dir);

      const push = <T extends THREE.Object3D>(o: T): T => { scene.add(o); meshes.push(o); return o; };

      // Stars background
      const starGeo = new THREE.BufferGeometry();
      const starPositions = [];
      for (let i = 0; i < 500; i++) {
        starPositions.push((Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100);
      }
      starGeo.setAttribute("position", new THREE.Float32BufferAttribute(starPositions, 3));
      push(new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 })));

      // Central planet
      const planet = push(new THREE.Mesh(
        new THREE.SphereGeometry(1.5, 32, 32),
        new THREE.MeshBasicMaterial({ color: 0x3b82f6 }),
      )) as THREE.Mesh;
      push(mkSprite("Planet (M)", "#3b82f6", new THREE.Vector3(0, 2.2, 0), 0.7));

      // Orbital path
      const orbitPts: THREE.Vector3[] = [];
      for (let i = 0; i <= 100; i++) {
        const a = (i / 100) * 2 * Math.PI;
        orbitPts.push(new THREE.Vector3(orbitalRadius * Math.cos(a), 0, orbitalRadius * Math.sin(a)));
      }
      push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(orbitPts), new THREE.LineBasicMaterial({ color: 0x334155, transparent: true, opacity: 0.6 })));

      // Gravitational force arrow (toward center)
      const satX = orbitalRadius;
      const gfLabelPos = new THREE.Vector3(satX + 3, 2, 0);
      const gfTarget = new THREE.Vector3(satX, 0, 0);
      const gfDir = gfTarget.clone().sub(gfLabelPos).normalize();
      push(new LiveArrow(gfDir, gfLabelPos, gfLabelPos.distanceTo(gfTarget) * 0.9, 0xef4444, 0.2, 0.12));
      push(mkSprite(`F_g = GMm/r²`, "#ef4444", gfLabelPos.clone().sub(gfDir.multiplyScalar(0.5)), 0.75));

      // Orbital velocity arrow (tangential)
      const ovLabelPos = new THREE.Vector3(satX, 0, orbitalRadius + 3);
      const ovTarget = new THREE.Vector3(satX, 0, orbitalRadius);
      const ovDir = ovTarget.clone().sub(ovLabelPos).normalize();
      push(new LiveArrow(ovDir, ovLabelPos, ovLabelPos.distanceTo(ovTarget) * 0.9, 0x22d3ee, 0.2, 0.1));
      push(mkSprite("v_orb (tangential)", "#22d3ee", ovLabelPos.clone().sub(ovDir.multiplyScalar(0.5)), 0.75));

      // Radius label
      const rLabelPos = new THREE.Vector3(orbitalRadius / 2, 1.5, 0);
      const rTarget = new THREE.Vector3(orbitalRadius, 0, 0);
      const rDir = rTarget.clone().sub(rLabelPos).normalize();
      push(new LiveArrow(rDir, rLabelPos, rLabelPos.distanceTo(rTarget) * 0.9, 0xfbbf24, 0.15, 0.1));
      push(mkSprite(`r = ${orbitalRadius} units`, "#fbbf24", rLabelPos.clone().sub(rDir.multiplyScalar(0.5)), 0.7));

      // Satellite
      const satellite = push(new THREE.Mesh(
        new THREE.BoxGeometry(0.4, 0.4, 0.4),
        new THREE.MeshBasicMaterial({ color: 0xf97316 }),
      )) as THREE.Mesh;

      // Escape velocity label
      const evLabelPos = new THREE.Vector3(-orbitalRadius - 3, 2, 0);
      const evTarget = new THREE.Vector3(0, 0, 0);
      const evDir = evTarget.clone().sub(evLabelPos).normalize();
      push(new LiveArrow(evDir, evLabelPos, evLabelPos.distanceTo(evTarget) * 0.9, 0xa78bfa, 0.15, 0.1));
      push(mkSprite(`v_escape = √(2GM/r)`, "#a78bfa", evLabelPos.clone().sub(evDir.multiplyScalar(0.5)), 0.7));

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
        satAngle += 0.015;
        satellite.position.set(orbitalRadius * Math.cos(satAngle), 0, orbitalRadius * Math.sin(satAngle));
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
  }, [orbitalRadius, isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="Gravitation" description="Orbiting satellite with gravitational force arrows." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Gravitation — Orbital Motion</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate · Scroll to zoom</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Orbital Parameters">
          <div className="flex flex-wrap gap-4 mt-2">
            <div className="w-28">
              <Label className="text-xs text-muted-foreground">Orbital radius r:</Label>
              <Input type="range" min={3} max={8} step={0.5} value={orbitalRadius} onChange={(e) => setOrbitalRadius(Number(e.target.value))} className="mt-1 w-full" />
              <p className="text-xs font-mono text-primary mt-1">{orbitalRadius.toFixed(1)}</p>
            </div>
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Newton's Law of Gravitation:</strong> F = GMm/r² — attractive force between two masses.</p>
            <p><strong className="text-foreground">Orbital velocity:</strong> v = √(GM/r) — speed for circular orbit.</p>
            <p><strong className="text-foreground">Escape velocity:</strong> v_e = √(2GM/r) — minimum speed to escape gravitational pull.</p>
            <p><strong className="text-foreground">Kepler's 3rd Law:</strong> T² ∝ r³ — period squared proportional to radius cubed.</p>
            <p><strong className="text-foreground">Gravitational field:</strong> g = GM/r² — field strength decreases with distance squared.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
