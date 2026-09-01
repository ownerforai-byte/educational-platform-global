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

export function EMIInductionVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [speed, setSpeed] = useState(2);
  const [isWebGL, setIsWebGL] = useState(true);
  const [animating, setAnimating] = useState(true);

  useEffect(() => { setIsWebGL(isWebGLAvailable()); }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isWebGL) return;

    let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer;
    let controls: any, frameId: number;
    const meshes: THREE.Object3D[] = [];
    let magnetX = 6;
    let direction = -1;

    const init = async () => {
      const { OrbitControls } = await import("three/addons/controls/OrbitControls.js");

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0f172a);
      camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
      camera.position.set(0, 3, 10);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.autoRotate = false;
      controls.minDistance = 3;
      controls.maxDistance = 20;

      scene.add(new THREE.AmbientLight(0xffffff, 0.7));
      const dir = new THREE.DirectionalLight(0xffffff, 1.0);
      dir.position.set(5, 10, 5);
      scene.add(dir);

      const push = <T extends THREE.Object3D>(o: T): T => { scene.add(o); meshes.push(o); return o; };

      // Coil (solenoid)
      const coilRadius = 1.5;
      const coilLength = 4;
      const turns = 20;
      for (let i = 0; i < turns; i++) {
        const t = i / (turns - 1);
        const x = -2 + t * coilLength;
        const coilRing = push(new THREE.Mesh(
          new THREE.TorusGeometry(coilRadius, 0.05, 8, 32),
          new THREE.MeshBasicMaterial({ color: 0xfbbf24 }),
        )) as THREE.Mesh;
        coilRing.position.set(x, 0, 0);
        coilRing.rotation.y = Math.PI / 2;
      }
      push(mkSprite("Coil (solenoid)", "#fbbf24", new THREE.Vector3(0, 2.5, 0), 0.7));

      // Magnetic field lines through coil
      const fieldLinePts: THREE.Vector3[] = [];
      for (let x = -4; x <= 4; x += 0.2) {
        fieldLinePts.push(new THREE.Vector3(x, 0, 0));
      }
      const bField = push(new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(fieldLinePts),
        new THREE.LineDashedMaterial({ color: 0x64748b, dashSize: 0.2, gapSize: 0.15 }),
      ) as any);
      (meshes[meshes.length - 1] as any).computeLineDistances();

      // N and S labels on coil
      push(mkSprite("N", "#ef4444", new THREE.Vector3(2.3, 0, 0), 0.8));
      push(mkSprite("S", "#3b82f6", new THREE.Vector3(-2.3, 0, 0), 0.8));

      // Bar magnet
      const magnetGroup = new THREE.Group();
      const northPole = push(new THREE.Mesh(
        new THREE.BoxGeometry(1, 0.6, 0.6),
        new THREE.MeshBasicMaterial({ color: 0xef4444 }),
      ));
      northPole.position.set(0.5, 0, 0);
      magnetGroup.add(northPole);
      const southPole = push(new THREE.Mesh(
        new THREE.BoxGeometry(1, 0.6, 0.6),
        new THREE.MeshBasicMaterial({ color: 0x3b82f6 }),
      ));
      southPole.position.set(-0.5, 0, 0);
      magnetGroup.add(southPole);
      magnetGroup.position.set(magnetX, 0, 0);
      meshes.push(magnetGroup);

      // Magnet labels with long arrows
      const nLabelPos = new THREE.Vector3(magnetX, 1.5, 0);
      const nTarget = new THREE.Vector3(magnetX + 0.5, 0, 0);
      const nDir = nTarget.clone().sub(nLabelPos).normalize();
      push(new THREE.ArrowHelper(nDir, nLabelPos, nLabelPos.distanceTo(nTarget) * 0.9, 0xef4444, 0.2, 0.12));
      push(mkSprite("N pole (North)", "#ef4444", nLabelPos.clone().sub(nDir.multiplyScalar(0.5)), 0.75));

      const sLabelPos = new THREE.Vector3(magnetX, -1.5, 0);
      const sTarget = new THREE.Vector3(magnetX - 0.5, 0, 0);
      const sDir = sTarget.clone().sub(sLabelPos).normalize();
      push(new THREE.ArrowHelper(sDir, sLabelPos, sLabelPos.distanceTo(sTarget) * 0.9, 0x3b82f6, 0.2, 0.12));
      push(mkSprite("S pole (South)", "#3b82f6", sLabelPos.clone().sub(sDir.multiplyScalar(0.5)), 0.75));

      // Induced current arrow
      const indLabelPos = new THREE.Vector3(0, -3, 0);
      const indTarget = new THREE.Vector3(0, 0, 0);
      const indDir = indTarget.clone().sub(indLabelPos).normalize();
      push(new THREE.ArrowHelper(indDir, indLabelPos, indLabelPos.distanceTo(indTarget) * 0.9, 0x22d3ee, 0.15, 0.1));
      push(mkSprite("Induced EMF & current", "#22d3ee", indLabelPos.clone().sub(indDir.multiplyScalar(0.5)), 0.75));

      // Galvanometer
      const galv = push(new THREE.Mesh(
        new THREE.CylinderGeometry(0.5, 0.5, 0.2, 24),
        new THREE.MeshBasicMaterial({ color: 0x475569 }),
      )) as THREE.Mesh;
      galv.position.set(0, -2.5, 1);
      galv.rotation.x = Math.PI / 2;
      push(mkSprite("G", "#475569", new THREE.Vector3(0, -2.5, 1.5), 0.7));

      const update = () => {
        while (meshes.length > 60) {
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
        if (animating) {
          magnetX += speed * 0.03 * direction;
          if (magnetX < -5 || magnetX > 5) direction *= -1;
          magnetGroup.position.set(magnetX, 0, 0);
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
  }, [speed, animating, isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="EM Induction" description="Coil + magnet animation showing electromagnetic induction." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Electromagnetic Induction — Coil & Magnet</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate · Scroll to zoom</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Induction Parameters">
          <div className="flex flex-wrap gap-4 mt-2">
            <div className="w-24">
              <Label className="text-xs text-muted-foreground">Speed:</Label>
              <Input type="range" min={0.5} max={5} step={0.5} value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="mt-1 w-full" />
              <p className="text-xs font-mono text-primary mt-1">{speed.toFixed(1)}</p>
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
        </div>

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-purple-500/30 bg-purple-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-purple-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Faraday's Law:</strong> ε = −N(dΦ/dt) — induced EMF proportional to rate of change of flux.</p>
            <p><strong className="text-foreground">Lenz's Law:</strong> Induced current opposes the change in flux that produced it (conservation of energy).</p>
            <p><strong className="text-foreground">Magnetic flux:</strong> Φ = B·A·cosθ — flux through a surface.</p>
            <p><strong className="text-foreground">Moving magnet toward coil:</strong> Flux increases → induced current creates opposing field.</p>
            <p><strong className="text-foreground">Moving magnet away:</strong> Flux decreases → induced current tries to maintain flux.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
