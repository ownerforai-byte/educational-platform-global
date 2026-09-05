"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallback } from "@/components/lab/webgl-fallback";
import * as THREE from "three";

/* ============================================================
   Sequences & Series — NEB Algebra (Maths 11)
   Visualizes arithmetic, geometric, and harmonic sequences
   as bar charts, showing convergence of infinite series.
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

type SeqType = "arithmetic" | "geometric" | "harmonic";

export function SequenceSeriesVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [seqType, setSeqType] = useState<SeqType>("geometric");
  const [a, setA] = useState(1);
  const [dOrR, setDOrR] = useState(2);
  const [terms, setTerms] = useState(10);
  const [isWebGL] = useState(() => isWebGLAvailable());

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isWebGL) return;

    const getTerms = () => {
      const arr: number[] = [];
      if (seqType === "arithmetic") {
        for (let n = 0; n < terms; n++) arr.push(a + n * dOrR);
      } else if (seqType === "geometric") {
        for (let n = 0; n < terms; n++) arr.push(a * Math.pow(dOrR, n));
      } else {
        for (let n = 1; n <= terms; n++) arr.push(1 / n);
      }
      return arr;
    };

    const getSum = (n: number) => {
      const ts = getTerms().slice(0, Math.min(n, terms));
      return ts.reduce((s, v) => s + v, 0);
    };

    let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer;
    let controls: any, frameId: number;
    const meshes: THREE.Object3D[] = [];

    const init = async () => {
      const { OrbitControls } = await import("three/addons/controls/OrbitControls.js");

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0f172a);
      camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
      camera.position.set(0, 6, 12);
      camera.lookAt(0, 1, 0);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.autoRotate = false;
      controls.maxPolarAngle = Math.PI / 2.2;

      scene.add(new THREE.AmbientLight(0xffffff, 0.8));

      const push = <T extends THREE.Object3D>(o: T): T => { scene.add(o); meshes.push(o); return o; };

      // Ground grid
      push(new THREE.GridHelper(20, 20, 0x334155, 0x1e293b));

      const update = () => {
        while (meshes.length > 40) {
          const m = meshes.pop()!;
          scene.remove(m);
          if (m instanceof THREE.Mesh) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Sprite) { (m.material as THREE.SpriteMaterial).map?.dispose?.(); m.material.dispose(); }
        }

        const ts = getTerms();
        const maxVal = Math.max(...ts.map(Math.abs), 1);

        ts.forEach((t, i) => {
          const barH = (t / maxVal) * 3;
          const bar = push(new THREE.Mesh(
            new THREE.BoxGeometry(0.6, Math.abs(barH), 0.6),
            new THREE.MeshBasicMaterial({ color: 0x60a5fa }),
          ));
          bar.position.set((i - ts.length / 2) * 1.0, barH / 2, 0);
        });

        // Sum indicator
        const sum = ts.reduce((s, v) => s + v, 0);
        push(mkSprite(`S${terms} = ${sum.toFixed(2)}`, "#fbbf24", new THREE.Vector3(0, maxVal + 1.5, 0), 0.9));

        // AM-GM-HM relation display
        if (seqType === "arithmetic" || seqType === "geometric") {
          const first3 = ts.slice(0, 3);
          const am = first3.reduce((s, v) => s + v, 0) / 3;
          const hm = 3 / first3.reduce((s, v) => s + 1 / v, 0);
          let gm = 1;
          first3.forEach(v => { gm *= v; });
          gm = Math.pow(gm, 1 / 3);
          push(mkSprite(`AM=${am.toFixed(2)} ≥ GM=${gm.toFixed(2)} ≥ HM=${hm.toFixed(2)}`, "#a78bfa", new THREE.Vector3(0, -0.8, 0), 0.8));
        }
      };

      update();

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
          else if (m instanceof THREE.Sprite) { const sm = m.material; sm.map?.dispose?.(); sm.dispose(); }
        });
        renderer.dispose();
        controls.dispose?.();
      };
    };

    const cleanup = init();
    return () => { cleanup.then((d) => d?.()); };
  }, [seqType, a, dOrR, terms, isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="Sequences & Series" description="3D sequence visualization — requires WebGL." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Sequences &amp; Series</span>
          <span className="text-xs text-muted-foreground font-normal">Arithmetic · Geometric · Harmonic</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Sequence Type">
          <Tabs value={seqType} onValueChange={(v) => setSeqType(v as SeqType)} className="mt-1">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="arithmetic" className="text-xs">Arithmetic</TabsTrigger>
              <TabsTrigger value="geometric" className="text-xs">Geometric</TabsTrigger>
              <TabsTrigger value="harmonic" className="text-xs">Harmonic</TabsTrigger>
            </TabsList>
          </Tabs>
        </CollapsibleControls>

        <CollapsibleControls label="Parameters">
          <div className="flex flex-wrap gap-3 mt-2">
            <div className="w-16"><Label className="text-xs text-muted-foreground">a₁:</Label><Input type="number" step="0.5" value={a} onChange={(e) => setA(Number(e.target.value))} className="mt-1" /></div>
            {seqType === "harmonic" ? (
              <div className="w-16"><Label className="text-xs text-muted-foreground">—</Label><p className="text-xs text-muted-foreground mt-1">aₙ = 1/n</p></div>
            ) : (
              <div className="w-16"><Label className="text-xs text-muted-foreground">{seqType === "arithmetic" ? "d:" : "r:"}</Label><Input type="number" step="0.5" value={dOrR} onChange={(e) => setDOrR(Number(e.target.value))} className="mt-1" /></div>
            )}
            <div className="w-16"><Label className="text-xs text-muted-foreground">n:</Label><Input type="number" step="1" min={3} max={20} value={terms} onChange={(e) => setTerms(Number(e.target.value))} className="mt-1" /></div>
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-400">Formulas</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            {seqType === "arithmetic" ? (
              <>
                <p><strong className="text-foreground">n-th term:</strong> aₙ = a + (n−1)d</p>
                <p><strong className="text-foreground">Sum:</strong> Sₙ = n/2 · [2a + (n−1)d]</p>
              </>
            ) : seqType === "geometric" ? (
              <>
                <p><strong className="text-foreground">n-th term:</strong> aₙ = a · rⁿ⁻¹</p>
                <p><strong className="text-foreground">Sum:</strong> Sₙ = a(rⁿ−1)/(r−1)</p>
                <p><strong className="text-foreground">Infinite sum (|r|&lt;1):</strong> S∞ = a/(1−r)</p>
              </>
            ) : (
              <>
                <p><strong className="text-foreground">n-th term:</strong> aₙ = 1/n</p>
                <p><strong className="text-foreground">Harmonic series diverges</strong> (Sₙ → ∞ as n → ∞)</p>
              </>
            )}
            <p><strong className="text-foreground">AM-GM-HM:</strong> For positive reals: AM ≥ GM ≥ HM</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
