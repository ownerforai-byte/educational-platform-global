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

export function PhotoelectricEffectVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [wavelength, setWavelength] = useState(400);
  const [workFunc, setWorkFunc] = useState(2.3);
  const [isWebGL, setIsWebGL] = useState(true);

  useEffect(() => { setIsWebGL(isWebGLAvailable()); }, []);

  const h = 6.626e-34;
  const c = 3e8;
  const thresholdWL = (h * c) / (workFunc * 1.602e-19);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isWebGL) return;

    let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer;
    let controls: any, frameId: number;
    const meshes: THREE.Object3D[] = [];
    let photonTime = 0;
    let emittedElectrons: { mesh: THREE.Mesh; vel: number }[] = [];

    const init = async () => {
      const { OrbitControls } = await import("three/addons/controls/OrbitControls.js");

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0f172a);
      camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
      camera.position.set(0, 2, 10);

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

      const photonEnergy = (h * c) / (wavelength * 1e-9);
      const photonEnergyEV = photonEnergy / 1.602e-19;
      const canEmit = photonEnergyEV > workFunc;
      const keMax = canEmit ? photonEnergyEV - workFunc : 0;

      // Metal plate (cathode)
      const plate = push(new THREE.Mesh(
        new THREE.BoxGeometry(4, 0.3, 1.5),
        new THREE.MeshBasicMaterial({ color: 0x94a3b8 }),
      )) as THREE.Mesh;
      plate.position.set(0, -1, 0);
      push(mkSprite("Metal Surface (Cathode)", "#94a3b8", new THREE.Vector3(0, -2, 0), 0.7));

      // Work function label with long arrow
      const wfLabelPos = new THREE.Vector3(3, 1.5, 0);
      const wfTarget = new THREE.Vector3(0, -1, 0);
      const wfDir = wfTarget.clone().sub(wfLabelPos).normalize();
      push(new THREE.ArrowHelper(wfDir, wfLabelPos, wfLabelPos.distanceTo(wfTarget) * 0.9, 0xfbbf24, 0.15, 0.1));
      push(mkSprite(`Φ = ${workFunc} eV (work function)`, "#fbbf24", wfLabelPos.clone().sub(wfDir.multiplyScalar(0.5)), 0.75));

      // Photon incoming
      const photonColor = wavelength < 450 ? 0x3b82f6 : wavelength < 550 ? 0x22c55e : wavelength < 650 ? 0xf97316 : 0xef4444;
      const photon = push(new THREE.Mesh(
        new THREE.SphereGeometry(0.15, 12, 12),
        new THREE.MeshBasicMaterial({ color: photonColor }),
      )) as THREE.Mesh;

      // Photon label with long arrow
      const phLabelPos = new THREE.Vector3(-3, 2.5, 0);
      const phTarget = new THREE.Vector3(-2, 0, 0);
      const phDir = phTarget.clone().sub(phLabelPos).normalize();
      push(new THREE.ArrowHelper(phDir, phLabelPos, phLabelPos.distanceTo(phTarget) * 0.9, photonColor, 0.2, 0.1));
      push(mkSprite(`hν = ${photonEnergyEV.toFixed(2)} eV`, photonColor === 0x3b82f6 ? "#60a5fa" : photonColor === 0x22c55e ? "#4ade80" : photonColor === 0xf97316 ? "#fb923c" : "#f87171", phLabelPos.clone().sub(phDir.multiplyScalar(0.5)), 0.8));

      // Wavelength label
      const wlLabelPos = new THREE.Vector3(-3, 3.5, 0);
      const wlTarget = new THREE.Vector3(-2, 0, 0);
      const wlDir = wlTarget.clone().sub(wlLabelPos).normalize();
      push(new THREE.ArrowHelper(wlDir, wlLabelPos, wlLabelPos.distanceTo(wlTarget) * 0.9, 0xa78bfa, 0.15, 0.1));
      push(mkSprite(`λ = ${wavelength} nm`, "#a78bfa", wlLabelPos.clone().sub(wlDir.multiplyScalar(0.5)), 0.75));

      // Collected electrons
      for (let i = 0; i < 5; i++) {
        const e = push(new THREE.Mesh(
          new THREE.SphereGeometry(0.08, 8, 8),
          new THREE.MeshBasicMaterial({ color: 0x22d3ee }),
        )) as THREE.Mesh;
        e.userData.phase = i * 0.8;
        e.visible = canEmit;
        emittedElectrons.push({ mesh: e, vel: canEmit ? 1 + keMax * 0.3 : 0 });
        meshes.push(e);
      }

      // KE label
      if (canEmit) {
        const keLabelPos = new THREE.Vector3(3, 2, 0);
        const keTarget = new THREE.Vector3(0, 0, 0);
        const keDir = keTarget.clone().sub(keLabelPos).normalize();
        push(new THREE.ArrowHelper(keDir, keLabelPos, keLabelPos.distanceTo(keTarget) * 0.9, 0x34d399, 0.15, 0.1));
        push(mkSprite(`KE_max = ${keMax.toFixed(2)} eV`, "#34d399", keLabelPos.clone().sub(keDir.multiplyScalar(0.5)), 0.8));
      } else {
        const noEmitLabelPos = new THREE.Vector3(0, 2.5, 0);
        push(mkSprite("No emission! (hν < Φ)", "#ef4444", noEmitLabelPos, 0.8));
      }

      // Einstein's equation
      const eqLabelPos = new THREE.Vector3(-4, -0.5, 0);
      const eqTarget = new THREE.Vector3(0, 0, 0);
      const eqDir = eqTarget.clone().sub(eqLabelPos).normalize();
      push(new THREE.ArrowHelper(eqDir, eqLabelPos, eqLabelPos.distanceTo(eqTarget) * 0.9, 0xef4444, 0.15, 0.1));
      push(mkSprite("hν = Φ + KE_max (Einstein)", "#ef4444", eqLabelPos.clone().sub(eqDir.multiplyScalar(0.5)), 0.7));

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
        photonTime += 0.02;

        // Animate photon
        photon.position.set(-4 + photonTime * 2 % 8, 1.5 - Math.sin(photonTime * 3) * 0.3, 0);
        if (photon.position.x > 0) {
          photon.position.x = -4;
        }

        // Animate electrons if emission occurs
        emittedElectrons.forEach((el) => {
          if (canEmit) {
            el.mesh.visible = true;
            const t = (photonTime * el.vel + el.mesh.userData.phase) % 3;
            el.mesh.position.set(-2 + t * 2, -1 + t * 1.5, Math.sin(t * 4) * 0.3);
          } else {
            el.mesh.visible = false;
          }
        });

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
  }, [wavelength, workFunc, isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="Photoelectric Effect" description="Photon striking metal surface ejecting electrons." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Photoelectric Effect — Einstein's Equation</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate · Scroll to zoom</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Experiment Parameters">
          <div className="flex flex-wrap gap-4 mt-2">
            <div className="w-28">
              <Label className="text-xs text-muted-foreground">Wavelength λ (nm):</Label>
              <Input type="range" min={200} max={700} step={10} value={wavelength} onChange={(e) => setWavelength(Number(e.target.value))} className="mt-1 w-full" />
              <p className="text-xs font-mono text-primary mt-1">{wavelength} nm</p>
            </div>
            <div className="w-28">
              <Label className="text-xs text-muted-foreground">Work function Φ (eV):</Label>
              <Input type="range" min={1} max={5} step={0.1} value={workFunc} onChange={(e) => setWorkFunc(Number(e.target.value))} className="mt-1 w-full" />
              <p className="text-xs font-mono text-primary mt-1">{workFunc} eV</p>
            </div>
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-yellow-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Einstein's equation:</strong> hν = Φ + KE_max — photon energy = work function + max kinetic energy.</p>
            <p><strong className="text-foreground">Work function (Φ):</strong> Minimum energy needed to remove an electron from metal surface.</p>
            <p><strong className="text-foreground">Threshold frequency:</strong> ν₀ = Φ/h — below this, no emission regardless of intensity.</p>
            <p><strong className="text-foreground">Intensity effect:</strong> More photons → more electrons, but same KE_max.</p>
            <p><strong className="text-foreground">Frequency effect:</strong> Higher ν → higher KE_max (linear relationship).</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
