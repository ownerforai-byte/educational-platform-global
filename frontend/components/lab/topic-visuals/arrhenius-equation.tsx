"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallback } from "@/components/lab/webgl-fallback";
import * as THREE from "three";

/* ============================================================
   Arrhenius Equation — Activation Energy Profile
   NEB Chemistry 12 — Chemical Kinetics
   ============================================================ */

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
  ctx.font = "bold 28px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = color;
  ctx.fillText(text, 256, 48);
  const tex = new THREE.CanvasTexture(canvas);
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false }));
  s.position.copy(pos);
  s.scale.set(3.4 * scale, 0.64 * scale, 1);
  return s;
}

export function ArrheniusEquationVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [Ea, setEa] = useState(50);
  const [isEndothermic, setIsEndothermic] = useState(true);
  const [hasCat, setHasCat] = useState(false);
  const [isWebGL] = useState(() => isWebGLAvailable());


  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isWebGL) return;

    let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer;
    let controls: any, frameId: number;
    const meshes: THREE.Object3D[] = [];

    const init = async () => {
      const { OrbitControls } = await import("three/addons/controls/OrbitControls.js");

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0f172a);
      camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
      camera.position.set(0, 0, 11);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.autoRotate = false;
      controls.minDistance = 4;
      controls.maxDistance = 25;

      scene.add(new THREE.AmbientLight(0xffffff, 0.8));

      const push = <T extends THREE.Object3D>(o: T): T => { scene.add(o); meshes.push(o); return o; };

      const updateScene = () => {
        while (meshes.length > 8) {
          const m = meshes.pop()!;
          scene.remove(m);
          if (m instanceof THREE.Mesh) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Sprite) { (m.material as THREE.SpriteMaterial).map?.dispose?.(); m.material.dispose(); }
          else if (m instanceof THREE.Line) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
        }

        const ox = -6, oy = -3;
        const sx = 1.2, sy = 0.5;

        // Axes
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(ox, oy, 0), new THREE.Vector3(ox + sx * 10, oy, 0)]), new THREE.LineBasicMaterial({ color: 0x475569 })));
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(ox, oy, 0), new THREE.Vector3(ox, oy + sy * 8, 0)]), new THREE.LineBasicMaterial({ color: 0x475569 })));
        push(mkSprite("Reaction Coordinate", "#94a3b8", new THREE.Vector3(ox + sx * 10.5, oy - 0.3, 0), 0.6));
        push(mkSprite("Energy (E)", "#94a3b8", new THREE.Vector3(ox - 0.5, oy + sy * 8.5, 0), 0.6));

        const deltaH = isEndothermic ? 30 : -30;
        const EaCat = hasCat ? Ea * 0.6 : Ea;

        // Reaction pathway: reactants → transition state → products
        const ptsUncat: THREE.Vector3[] = [];
        const ptsCat: THREE.Vector3[] = [];
        for (let i = 0; i <= 100; i++) {
          const x = (i / 100) * sx * 10;
          const t = i / 100;
          // Smooth hump: sin-shaped barrier
          const humpUncat = Math.sin(t * Math.PI) * Ea;
          const humpCat = Math.sin(t * Math.PI) * EaCat;
          const baseline = t * deltaH;
          ptsUncat.push(new THREE.Vector3(ox + x, oy + (baseline + humpUncat) * sy * 0.4, 0));
          ptsCat.push(new THREE.Vector3(ox + x, oy + (baseline + humpCat) * sy * 0.4, 0));
        }

        // Uncatalyzed path (gray)
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(ptsUncat), new THREE.LineBasicMaterial({ color: 0x64748b, linewidth: 2 })));

        // Catalyzed path (if enabled)
        if (hasCat) {
          push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(ptsCat), new THREE.LineBasicMaterial({ color: 0x22c55e, linewidth: 2 })));
        }

        // Reactant energy level
        const reactY = oy;
        push(new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(ox + 0.5, reactY, 0), new THREE.Vector3(ox + 2.5, reactY, 0)]),
          new THREE.LineDashedMaterial({ color: 0x3b82f6, dashSize: 0.15, gapSize: 0.1 }),
        ) as any);
        ((meshes[meshes.length - 1] as any) as THREE.Line).computeLineDistances();
        push(mkSprite("Reactants", "#3b82f6", new THREE.Vector3(ox + 0.3, reactY - 0.4, 0), 0.6));

        // Product energy level
        const prodY = oy + deltaH * sy * 0.4;
        push(new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(ox + 7.5, prodY, 0), new THREE.Vector3(ox + 9.5, prodY, 0)]),
          new THREE.LineDashedMaterial({ color: 0xef4444, dashSize: 0.15, gapSize: 0.1 }),
        ) as any);
        ((meshes[meshes.length - 1] as any) as THREE.Line).computeLineDistances();
        push(mkSprite("Products", "#ef4444", new THREE.Vector3(ox + 9.7, prodY - 0.4, 0), 0.6));

        // Transition state (peak)
        const peakIdx = Math.floor(50);
        const peakUncat = ptsUncat[peakIdx];
        push(new THREE.Mesh(new THREE.SphereGeometry(0.12, 10, 10), new THREE.MeshBasicMaterial({ color: 0xf97316 }))).position.copy(peakUncat);

        // Ea arrow (uncatalyzed)
        const eaLabel = new THREE.Vector3(ox + 3.5, peakUncat.y + 0.5, 0);
        const eaTarget = new THREE.Vector3(ox + 3.5, reactY, 0);
        const eaDir = eaTarget.clone().sub(eaLabel).normalize();
        const eaLen = eaLabel.distanceTo(eaTarget);
        push(new THREE.ArrowHelper(eaDir, eaLabel, eaLen * 0.85, 0xf97316, 0.28, 0.12));
        push(mkSprite(`Ea = ${Ea} kJ/mol`, "#f97316", eaLabel.clone().sub(eaDir.multiplyScalar(0.5)), 0.7));

        // Ea(cat) arrow
        if (hasCat) {
          const peakCat = ptsCat[peakIdx];
          const eacLabel = new THREE.Vector3(ox + 4.5, peakCat.y + 0.5, 0);
          const eacTarget = new THREE.Vector3(ox + 4.5, reactY, 0);
          const eacDir = eacTarget.clone().sub(eacLabel).normalize();
          const eacLen = eacLabel.distanceTo(eacTarget);
          push(new THREE.ArrowHelper(eacDir, eacLabel, eacLen * 0.85, 0x22c55e, 0.28, 0.12));
          push(mkSprite(`Ea(cat) = ${EaCat.toFixed(0)} kJ/mol`, "#22c55e", eacLabel.clone().sub(eacDir.multiplyScalar(0.5)), 0.65));
        }

        // ΔH arrow
        const dhLabel = new THREE.Vector3(ox + 8.5, (reactY + prodY) / 2 + 0.5, 0);
        const dhTarget = new THREE.Vector3(ox + 8.5, reactY, 0);
        const dhDir = dhTarget.clone().sub(dhLabel).normalize();
        const dhLen = dhLabel.distanceTo(dhTarget);
        push(new THREE.ArrowHelper(dhDir, dhLabel, dhLen * 0.8, isEndothermic ? 0xef4444 : 0x22c55e, 0.25, 0.12));
        const dhSign = isEndothermic ? "+" : "";
        push(mkSprite(`ΔH = ${dhSign}${deltaH} kJ/mol`, isEndothermic ? "#ef4444" : "#22c55e", dhLabel.clone().sub(dhDir.multiplyScalar(0.5)), 0.65));

        // Arrhenius equation
        push(mkSprite("Arrhenius:  k = Ae^(−Ea/RT)  — lower Ea → faster reaction", "#a78bfa", new THREE.Vector3(0, -4.0, 0), 0.6));
      };

      updateScene();

      const animate = () => {
        frameId = requestAnimationFrame(animate);
        controls.update();
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
        });
        renderer.dispose();
        controls.dispose?.();
      };
    };

    const cleanup = init();
    return () => { cleanup.then((d) => d?.()); };
  }, [Ea, isEndothermic, hasCat, isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="Arrhenius Equation" description="Activation energy profile — requires WebGL." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Arrhenius Equation — Activation Energy Profile</span>
          <span className="text-xs text-muted-foreground font-normal">Energy diagram with catalyst effect</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Parameters">
          <div className="flex flex-wrap gap-4 mt-2">
            <div>
              <label className="text-xs text-muted-foreground">Ea (kJ/mol):</label>
              <input type="range" min={10} max={150} value={Ea} onChange={(e) => setEa(Number(e.target.value))} className="mt-1 w-24" />
              <span className="text-xs ml-2">{Ea}</span>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Type:</label>
              <div className="flex gap-1 mt-1">
                <button onClick={() => setIsEndothermic(true)} className={`px-2 py-1 rounded text-xs ${isEndothermic ? "bg-red-600 text-white" : "bg-muted text-muted-foreground"}`}>Endo</button>
                <button onClick={() => setIsEndothermic(false)} className={`px-2 py-1 rounded text-xs ${!isEndothermic ? "bg-green-600 text-white" : "bg-muted text-muted-foreground"}`}>Exo</button>
              </div>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Catalyst:</label>
              <button onClick={() => setHasCat(!hasCat)} className={`px-3 py-1 rounded text-xs mt-1 ${hasCat ? "bg-green-600 text-white" : "bg-muted text-muted-foreground"}`}>
                {hasCat ? "ON" : "OFF"}
              </button>
            </div>
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-orange-500/30 bg-orange-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-orange-400">Arrhenius Equation</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">k = Ae^(−Ea/RT)</strong></p>
            <p><strong className="text-foreground">Ea (activation energy):</strong> Minimum energy required for effective collisions.</p>
            <p><strong className="text-foreground">A (frequency factor):</strong> Related to collision frequency and orientation.</p>
            <p><strong className="text-foreground">Catalyst effect:</strong> Lowers Ea by providing alternative pathway → increases k without being consumed.</p>
            <p><strong className="text-foreground">Temperature effect:</strong> Increasing T increases fraction of molecules with E ≥ Ea.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
