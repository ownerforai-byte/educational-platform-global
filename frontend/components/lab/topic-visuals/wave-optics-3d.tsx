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

export function WaveOpticsVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"double-slit" | "single-slit">("double-slit");
  const [wavelength, setWavelength] = useState(0.5);
  const [slitSep, setSlitSep] = useState(2);
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
      camera.position.set(0, 0, 12);

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
      dir.position.set(0, 10, 5);
      scene.add(dir);

      const push = <T extends THREE.Object3D>(o: T): T => { scene.add(o); meshes.push(o); return o; };

      // Slits barrier
      const barrier = push(new THREE.Mesh(
        new THREE.BoxGeometry(0.2, 6, 0.5),
        new THREE.MeshBasicMaterial({ color: 0x475569 }),
      )) as THREE.Mesh;
      barrier.position.set(-3, 0, 0);

      // Slit openings
      if (mode === "double-slit") {
        const slit1 = push(new THREE.Mesh(
          new THREE.BoxGeometry(0.25, 0.3, 0.55),
          new THREE.MeshBasicMaterial({ color: 0xfbbf24 }),
        ));
        slit1.position.set(-3, slitSep / 2, 0);
        const slit2 = push(new THREE.Mesh(
          new THREE.BoxGeometry(0.25, 0.3, 0.55),
          new THREE.MeshBasicMaterial({ color: 0xfbbf24 }),
        ));
        slit2.position.set(-3, -slitSep / 2, 0);
      } else {
        const slit = push(new THREE.Mesh(
          new THREE.BoxGeometry(0.25, 0.5, 0.55),
          new THREE.MeshBasicMaterial({ color: 0xfbbf24 }),
        ));
        slit.position.set(-3, 0, 0);
      }

      // Screen
      const screen = push(new THREE.Mesh(
        new THREE.PlaneGeometry(0.1, 6),
        new THREE.MeshBasicMaterial({ color: 0x1e293b }),
      ));
      screen.position.set(4, 0, 0);
      screen.rotation.y = Math.PI / 2;
      push(mkSprite("Screen", "#475569", new THREE.Vector3(4, 3.5, 0), 0.6));

      // Wavefronts from slits
      const wavefronts: THREE.Mesh[] = [];
      const numWavefronts = 8;
      for (let i = 0; i < numWavefronts; i++) {
        const wf = push(new THREE.Mesh(
          new THREE.RingGeometry(i * wavelength * 0.8, i * wavelength * 0.8 + 0.05, 32),
          new THREE.MeshBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.5 - i * 0.05, side: THREE.DoubleSide }),
        )) as THREE.Mesh;
        wf.position.set(-2.8, mode === "double-slit" ? slitSep / 2 : 0, 0);
        wf.rotation.y = Math.PI / 2;
        wavefronts.push(wf);
      }
      if (mode === "double-slit") {
        for (let i = 0; i < numWavefronts; i++) {
          const wf = push(new THREE.Mesh(
            new THREE.RingGeometry(i * wavelength * 0.8, i * wavelength * 0.8 + 0.05, 32),
            new THREE.MeshBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.5 - i * 0.05, side: THREE.DoubleSide }),
          )) as THREE.Mesh;
          wf.position.set(-2.8, -slitSep / 2, 0);
          wf.rotation.y = Math.PI / 2;
          wavefronts.push(wf);
        }
      }

      // Interference pattern on screen (bright/dark fringes)
      const fringeColor = (y: number) => {
        if (mode === "double-slit") {
          const pathDiff = (slitSep * y) / 7;
          const phase = (2 * Math.PI * pathDiff) / wavelength;
          const intensity = (Math.cos(phase / 2)) ** 2;
          return new THREE.Color(0.1 + 0.9 * intensity, 0.1 + 0.9 * intensity * 0.8, 0.1 + 0.9 * intensity * 0.3);
        } else {
          const beta = (Math.PI * 0.5 * y) / wavelength;
          const intensity = beta === 0 ? 1 : (Math.sin(beta) / beta) ** 2;
          return new THREE.Color(0.1 + 0.9 * intensity, 0.1 + 0.9 * intensity * 0.7, 0.1 + 0.9 * intensity * 0.2);
        }
      };

      for (let i = 0; i < 60; i++) {
        const y = -3 + (i / 60) * 6;
        const color = fringeColor(y);
        const stripe = push(new THREE.Mesh(
          new THREE.PlaneGeometry(0.05, 0.1),
          new THREE.MeshBasicMaterial({ color }),
        ));
        stripe.position.set(4.05, y, 0);
        stripe.rotation.y = Math.PI / 2;
      }

      // Long arrow labels
      const lambdaLabelPos = new THREE.Vector3(0, -4, 0);
      const lambdaTarget = new THREE.Vector3(0.5, 0, 0);
      const lambdaDir = lambdaTarget.clone().sub(lambdaLabelPos).normalize();
      push(new LiveArrow(lambdaDir, lambdaLabelPos, lambdaLabelPos.distanceTo(lambdaTarget) * 0.9, 0xa78bfa, 0.15, 0.1));
      push(mkSprite(`λ = ${wavelength} μm (wavelength)`, "#a78bfa", lambdaLabelPos.clone().sub(lambdaDir.multiplyScalar(0.5)), 0.75));

      const dLabelPos = new THREE.Vector3(-3, mode === "double-slit" ? slitSep / 2 + 1 : 1, 0);
      const dTarget = new THREE.Vector3(-3, mode === "double-slit" ? -slitSep / 2 : 0, 0);
      const dDir = dTarget.clone().sub(dLabelPos).normalize();
      push(new LiveArrow(dDir, dLabelPos, dLabelPos.distanceTo(dTarget) * 0.9, 0x34d399, 0.15, 0.1));
      push(mkSprite(`d = ${slitSep} (slit separation)`, "#34d399", dLabelPos.clone().sub(dDir.multiplyScalar(0.5)), 0.75));

      // Fringe pattern formula label
      const formulaLabelPos = new THREE.Vector3(2, 3.5, 0);
      const formulaTarget = new THREE.Vector3(0, 0, 0);
      const formulaDir = formulaTarget.clone().sub(formulaLabelPos).normalize();
      push(new LiveArrow(formulaDir, formulaLabelPos, formulaLabelPos.distanceTo(formulaTarget) * 0.9, 0xef4444, 0.15, 0.1));
      push(mkSprite(
        mode === "double-slit" ? "β = λD/d (fringe width)" : "I = I₀(sinβ/β)² (diffraction)",
        "#ef4444", formulaLabelPos.clone().sub(formulaDir.multiplyScalar(0.5)), 0.7
      ));

      const update = () => {
        while (meshes.length > 100) {
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
        time += 0.05;
        wavefronts.forEach((wf, i) => {
          const r = ((time * 0.3 + i * wavelength * 0.8) % (numWavefronts * wavelength * 0.8)) / (numWavefronts * wavelength * 0.8);
          wf.scale.setScalar(r + 0.1);
          const m = wf.material; if (m && !Array.isArray(m)) m.opacity = 0.5 * (1 - r);
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
  }, [mode, wavelength, slitSep, isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="Wave Optics" description="Double-slit interference and single-slit diffraction patterns." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Wave Optics — Interference & Diffraction</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate · Scroll to zoom</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Experiment Type">
          <div className="flex flex-wrap gap-2 mt-1">
            <button
              onClick={() => setMode("double-slit")}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                mode === "double-slit" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              Young's Double Slit
            </button>
            <button
              onClick={() => setMode("single-slit")}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                mode === "single-slit" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              Single Slit Diffraction
            </button>
          </div>
        </CollapsibleControls>

        <CollapsibleControls label="Parameters">
          <div className="flex flex-wrap gap-4 mt-2">
            <div className="w-28">
              <Label className="text-xs text-muted-foreground">Wavelength λ:</Label>
              <Input type="range" min={0.2} max={1.0} step={0.05} value={wavelength} onChange={(e) => setWavelength(Number(e.target.value))} className="mt-1 w-full" />
              <p className="text-xs font-mono text-primary mt-1">{wavelength} μm</p>
            </div>
            {mode === "double-slit" && (
              <div className="w-28">
                <Label className="text-xs text-muted-foreground">Slit separation d:</Label>
                <Input type="range" min={0.5} max={4} step={0.1} value={slitSep} onChange={(e) => setSlitSep(Number(e.target.value))} className="mt-1 w-full" />
                <p className="text-xs font-mono text-primary mt-1">{slitSep.toFixed(1)}</p>
              </div>
            )}
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-cyan-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Young's double slit:</strong> Path difference Δ = d·sinθ. Bright fringes: Δ = nλ. Dark fringes: Δ = (n+½)λ.</p>
            <p><strong className="text-foreground">Fringe width:</strong> β = λD/d — spacing between consecutive bright/dark fringes.</p>
            <p><strong className="text-foreground">Single slit diffraction:</strong> First minimum at sinθ = λ/a where a is slit width.</p>
            <p><strong className="text-foreground">Intensity pattern:</strong> I = I₀(sinz/z)² where z = πa·sinθ/λ</p>
            <p><strong className="text-foreground">Coherence:</strong> Sources must be coherent (constant phase relationship) for sustained interference.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
