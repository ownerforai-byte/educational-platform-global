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

export function SHMVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [amplitude, setAmplitude] = useState(3);
  const [frequency, setFrequency] = useState(1);
  const [isWebGL] = useState(() => isWebGLAvailable());


  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isWebGL) return;

    let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer;
    let controls: any, frameId: number;
    const meshes: THREE.Object3D[] = [];
    let time = 0;

    const init = async () => {
      const { OrbitControls } = await import("three/addons/controls/OrbitControls.js");

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0f172a);
      camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
      camera.position.set(0, 2, 12);

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

      // Equilibrium line
      push(new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-8, 0, 0), new THREE.Vector3(8, 0, 0)]),
        new THREE.LineDashedMaterial({ color: 0x475569, dashSize: 0.3, gapSize: 0.2 }),
      ) as any);
      (meshes[meshes.length - 1] as any).computeLineDistances();
      push(mkSprite("Equilibrium (x = 0)", "#475569", new THREE.Vector3(6, 0.4, 0), 0.6));

      // Spring (zigzag)
      const springGroup = new THREE.Group();
      springGroup.position.set(-3, 0, 0);
      scene.add(springGroup);
      meshes.push(springGroup);

      // Wall
      const wall = push(new THREE.Mesh(
        new THREE.BoxGeometry(0.3, 4, 1),
        new THREE.MeshBasicMaterial({ color: 0x475569 }),
      ));
      wall.position.set(-7, 1.5, 0);
      push(mkSprite("Wall", "#475569", new THREE.Vector3(-7, 4.2, 0), 0.6));

      // Mass block
      const mass = push(new THREE.Mesh(
        new THREE.BoxGeometry(1.2, 1.2, 1),
        new THREE.MeshBasicMaterial({ color: 0x22d3ee }),
      )) as THREE.Mesh;
      mass.position.set(-3, 0.6, 0);

      // Labels with long arrows
      const ampLabelPos = new THREE.Vector3(-3, 4, 0);
      const ampTarget = new THREE.Vector3(-3 + amplitude, 0.6, 0);
      const ampDir = ampTarget.clone().sub(ampLabelPos).normalize();
      push(new LiveArrow(ampDir, ampLabelPos, ampLabelPos.distanceTo(ampTarget) * 0.9, 0xfbbf24, 0.15, 0.1));
      push(mkSprite(`Amp = ${amplitude} m`, "#fbbf24", ampLabelPos.clone().sub(ampDir.multiplyScalar(0.5)), 0.75));

      // Rest position label
      const restLabelPos = new THREE.Vector3(-3, -2, 0);
      const restTarget = new THREE.Vector3(-3, 0.6, 0);
      const restDir = restTarget.clone().sub(restLabelPos).normalize();
      push(new LiveArrow(restDir, restLabelPos, restLabelPos.distanceTo(restTarget) * 0.9, 0x64748b, 0.15, 0.1));
      push(mkSprite("Rest position", "#64748b", restLabelPos.clone().sub(restDir.multiplyScalar(0.5)), 0.7));

      // Force label
      const forceLabelPos = new THREE.Vector3(5, 3, 0);
      const forceTarget = new THREE.Vector3(0, 0.6, 0);
      const forceDir = forceTarget.clone().sub(forceLabelPos).normalize();
      push(new LiveArrow(forceDir, forceLabelPos, forceLabelPos.distanceTo(forceTarget) * 0.9, 0xef4444, 0.15, 0.1));
      push(mkSprite("F = −kx (restoring force)", "#ef4444", forceLabelPos.clone().sub(forceDir.multiplyScalar(0.5)), 0.7));

      // Graph area (right side)
      const graphX = 5;
      for (let i = -8; i <= 8; i++) {
        if (i === 0) continue;
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(i, -4, -1), new THREE.Vector3(i, 4, -1)]), new THREE.LineBasicMaterial({ color: 0x1e293b })));
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(graphX - 4, i, -1), new THREE.Vector3(graphX + 4, i, -1)]), new THREE.LineBasicMaterial({ color: 0x1e293b })));
      }
      push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(graphX - 4, 0, -1), new THREE.Vector3(graphX + 4, 0, -1)]), new THREE.LineBasicMaterial({ color: 0x475569 })));
      push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(graphX, -4, -1), new THREE.Vector3(graphX, 4, -1)]), new THREE.LineBasicMaterial({ color: 0x475569 })));
      push(mkSprite("x(t) = A cos(ωt)", "#22d3ee", new THREE.Vector3(graphX + 2, 3.5, -1), 0.7));
      push(mkSprite("t", "#475569", new THREE.Vector3(graphX + 4, -0.5, -1), 0.6));
      push(mkSprite("x", "#475569", new THREE.Vector3(graphX - 0.5, 4, -1), 0.6));

      // Trail dots for wave
      const trailPts: THREE.Vector3[] = [];
      const waveLine = push(new THREE.Line(
        new THREE.BufferGeometry(),
        new THREE.LineBasicMaterial({ color: 0x22d3ee }),
      )) as THREE.Line;

      const update = () => {
        while (meshes.length > 80) {
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
        time += 0.03 * frequency;
        const displacement = amplitude * Math.cos(2 * Math.PI * frequency * time);

        mass.position.x = -3 + displacement;

        // Update spring
        while (springGroup.children.length > 0) {
          const c = springGroup.children[0];
          springGroup.remove(c);
          if (c instanceof THREE.Mesh) { c.geometry?.dispose(); (c.material as THREE.Material).dispose(); }
        }
        meshes.splice(meshes.indexOf(springGroup) + 1, 0, ...springGroup.children);
        const wallRight = -6.85;
        const massLeft = -3 + displacement - 0.6;
        const segments = 20;
        const springPts: THREE.Vector3[] = [];
        for (let i = 0; i <= segments; i++) {
          const t = i / segments;
          const x = wallRight + t * (massLeft - wallRight);
          const y = Math.sin(t * Math.PI * 8) * 0.3;
          springPts.push(new THREE.Vector3(x, y, 0));
        }
        const springGeo = new THREE.BufferGeometry().setFromPoints(springPts);
        const springLine = new THREE.Line(springGeo, new THREE.LineBasicMaterial({ color: 0x94a3b8 }));
        springGroup.add(springLine);
        meshes.push(springLine);

        // Wave trail
        trailPts.unshift(new THREE.Vector3(graphX + (displacement / amplitude) * 4, 0, -0.98));
        if (trailPts.length > 300) trailPts.pop();
        (waveLine.geometry as THREE.BufferGeometry).setFromPoints(trailPts);

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
  }, [amplitude, frequency, isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="SHM Visual" description="Spring-mass system with Hooke's law visualization." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Simple Harmonic Motion — Spring & Mass</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate · Scroll to zoom</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="SHM Parameters">
          <div className="flex flex-wrap gap-4 mt-2">
            <div className="w-28">
              <Label className="text-xs text-muted-foreground">Amplitude A (m):</Label>
              <Input type="range" min={0.5} max={5} step={0.1} value={amplitude} onChange={(e) => setAmplitude(Number(e.target.value))} className="mt-1 w-full" />
              <p className="text-xs font-mono text-primary mt-1">{amplitude.toFixed(1)} m</p>
            </div>
            <div className="w-28">
              <Label className="text-xs text-muted-foreground">Frequency f (Hz):</Label>
              <Input type="range" min={0.2} max={3} step={0.1} value={frequency} onChange={(e) => setFrequency(Number(e.target.value))} className="mt-1 w-full" />
              <p className="text-xs font-mono text-primary mt-1">{frequency.toFixed(1)} Hz</p>
            </div>
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-cyan-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Hooke's Law:</strong> F = −kx — restoring force proportional to displacement.</p>
            <p><strong className="text-foreground">Equation of motion:</strong> x(t) = A cos(ωt + φ)</p>
            <p><strong className="text-foreground">Angular frequency:</strong> ω = √(k/m) = 2πf</p>
            <p><strong className="text-foreground">Period:</strong> T = 2π√(m/k)</p>
            <p><strong className="text-foreground">Energy:</strong> E = ½kA² — conserved, oscillates between KE and PE.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
