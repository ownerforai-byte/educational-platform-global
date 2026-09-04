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
  ctx.font = "bold 26px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = color;
  ctx.fillText(text, 256, 48);
  const tex = new THREE.CanvasTexture(canvas);
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false }));
  s.position.copy(pos);
  s.scale.set(3.8 * scale, 0.7 * scale, 1);
  return s;
}

export function DerivativeLogarithmic3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [isWebGL] = useState(() => isWebGLAvailable());
  const totalSteps = 4;


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

      push(mkSprite("Logarithmic Differentiation", "#a78bfa", new THREE.Vector3(0, 4.5, 0)));
      push(mkSprite("Example: y = x^x", "#60a5fa", new THREE.Vector3(-3.5, 3.8, 0)));
      const step1Label = mkSprite("Step 1: ln(y) = x.ln(x)", "#f59e0b", new THREE.Vector3(-3.5, 2.8, 0));
      step1Label.visible = step >= 0;
      push(step1Label);
      const step2Label = mkSprite("Step 2: (1/y).y = ln(x)+1", "#34d399", new THREE.Vector3(-3.5, 1.8, 0));
      step2Label.visible = step >= 1;
      push(step2Label);
      const step3Label = mkSprite("Step 3: y = x^x(ln(x)+1)", "#ec4899", new THREE.Vector3(-3.5, 0.8, 0));
      step3Label.visible = step >= 2;
      push(step3Label);
      const step4Label = mkSprite("Step 4: Verify numerically", "#60a5fa", new THREE.Vector3(-3.5, -0.2, 0));
      step4Label.visible = step >= 3;
      push(step4Label);

      const yPts: THREE.Vector3[] = [];
      const dyPts: THREE.Vector3[] = [];
      for (let x = 0.1; x <= 5; x += 0.05) {
        const y = Math.pow(x, x);
        const dy = Math.pow(x, x) * (Math.log(x) + 1);
        yPts.push(new THREE.Vector3(x - 1, y * 0.15 - 2, 0));
        dyPts.push(new THREE.Vector3(x - 1, dy * 0.03 - 2, 0));
      }
      const yCurve = new THREE.Line(new THREE.BufferGeometry().setFromPoints(yPts), new THREE.LineBasicMaterial({ color: 0x60a5fa }));
      const dyCurve = new THREE.Line(new THREE.BufferGeometry().setFromPoints(dyPts), new THREE.LineBasicMaterial({ color: 0x34d399 }));
      yCurve.visible = step >= 3;
      dyCurve.visible = step >= 3;
      push(yCurve);
      push(dyCurve);

      const legend1 = mkSprite("y = x^x", "#60a5fa", new THREE.Vector3(3, -1, 0), 0.7);
      legend1.visible = step >= 3;
      push(legend1);
      const legend2 = mkSprite("y = x^x(ln x + 1)", "#34d399", new THREE.Vector3(3, -1.8, 0), 0.7);
      legend2.visible = step >= 3;
      push(legend2);

      push(mkSprite("Key: ln(a^b) = b.ln(a)", "#a78bfa", new THREE.Vector3(0, -3.2, 0)));

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
  }, [step, isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="Logarithmic Differentiation" description="ln both sides visualization — requires WebGL." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Logarithmic Differentiation — 3D</span>
          <span className="text-xs text-muted-foreground font-normal">ln both sides, then differentiate</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Solution Steps">
          <div className="flex flex-wrap gap-2 mt-2">
            {Array.from({ length: totalSteps }, (_, i) => (
              <button key={i} onClick={() => setStep(i)} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${step === i ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
                Step {i + 1}
              </button>
            ))}
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-indigo-500/30 bg-indigo-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-indigo-400">Logarithmic Differentiation</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">When to use:</strong> Functions like y = x^x where both base and exponent vary.</p>
            <p><strong className="text-foreground">Step 1:</strong> Take ln of both sides: ln(y) = g(x).ln(f(x))</p>
            <p><strong className="text-foreground">Step 2:</strong> Differentiate implicitly: y/y = derivative</p>
            <p><strong className="text-foreground">Step 3:</strong> Solve: y = y . [derivative]</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}