"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallback } from "@/components/lab/webgl-fallback";
import * as THREE from "three";
import { LiveArrow } from "@/components/lab/animated-arrow-helper";

/* ============================================================
   Periodic Table Trends — Atomic Radius, IE, Electronegativity
   NEB Chemistry 11
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

type TrendMode = "radius" | "ionization" | "electronegativity";
type FilterMode = "all" | "s" | "p" | "d" | "f" | "metal" | "non-metal";

type ElementData = {
  sym: string;
  z: number;
  row: number;
  col: number;
  r: number;
  ie: number;
  en: number;
  block: "s" | "p" | "d" | "f";
  series: string;
  config: string;
};

const ELEMENT_DATA: ElementData[] = [
  { sym: "H", z: 1, row: 0, col: 0, r: 37, ie: 1312, en: 2.20, block: "s", series: "non-metal", config: "1s1" },
  { sym: "He", z: 2, row: 0, col: 7, r: 32, ie: 2372, en: 0, block: "s", series: "noble-gas", config: "1s2" },
  { sym: "Li", z: 3, row: 1, col: 0, r: 152, ie: 520, en: 0.98, block: "s", series: "alkali-metal", config: "[He] 2s1" },
  { sym: "Be", z: 4, row: 1, col: 1, r: 112, ie: 899, en: 1.57, block: "s", series: "alkaline-earth-metal", config: "[He] 2s2" },
  { sym: "B", z: 5, row: 1, col: 2, r: 85, ie: 801, en: 2.04, block: "p", series: "metalloid", config: "[He] 2s2 2p1" },
  { sym: "C", z: 6, row: 1, col: 3, r: 77, ie: 1086, en: 2.55, block: "p", series: "non-metal", config: "[He] 2s2 2p2" },
  { sym: "N", z: 7, row: 1, col: 4, r: 75, ie: 1402, en: 3.04, block: "p", series: "non-metal", config: "[He] 2s2 2p3" },
  { sym: "O", z: 8, row: 1, col: 5, r: 73, ie: 1314, en: 3.44, block: "p", series: "non-metal", config: "[He] 2s2 2p4" },
  { sym: "F", z: 9, row: 1, col: 6, r: 72, ie: 1681, en: 3.98, block: "p", series: "non-metal", config: "[He] 2s2 2p5" },
  { sym: "Ne", z: 10, row: 1, col: 7, r: 69, ie: 2081, en: 0, block: "p", series: "noble-gas", config: "[He] 2s2 2p6" },
  { sym: "Na", z: 11, row: 2, col: 0, r: 186, ie: 496, en: 0.93, block: "s", series: "alkali-metal", config: "[Ne] 3s1" },
  { sym: "Mg", z: 12, row: 2, col: 1, r: 160, ie: 738, en: 1.31, block: "s", series: "alkaline-earth-metal", config: "[Ne] 3s2" },
  { sym: "Al", z: 13, row: 2, col: 2, r: 143, ie: 578, en: 1.61, block: "p", series: "metal", config: "[Ne] 3s2 3p1" },
  { sym: "Si", z: 14, row: 2, col: 3, r: 117, ie: 787, en: 1.90, block: "p", series: "metalloid", config: "[Ne] 3s2 3p2" },
  { sym: "P", z: 15, row: 2, col: 4, r: 110, ie: 1012, en: 2.19, block: "p", series: "non-metal", config: "[Ne] 3s2 3p3" },
  { sym: "S", z: 16, row: 2, col: 5, r: 104, ie: 1000, en: 2.58, block: "p", series: "non-metal", config: "[Ne] 3s2 3p4" },
  { sym: "Cl", z: 17, row: 2, col: 6, r: 99, ie: 1251, en: 3.16, block: "p", series: "non-metal", config: "[Ne] 3s2 3p5" },
  { sym: "Ar", z: 18, row: 2, col: 7, r: 97, ie: 1521, en: 0, block: "p", series: "noble-gas", config: "[Ne] 3s2 3p6" },
  { sym: "K", z: 19, row: 3, col: 0, r: 227, ie: 419, en: 0.82, block: "s", series: "alkali-metal", config: "[Ar] 4s1" },
  { sym: "Ca", z: 20, row: 3, col: 1, r: 197, ie: 590, en: 1.00, block: "s", series: "alkaline-earth-metal", config: "[Ar] 4s2" },
];

function normalize(val: number, min: number, max: number): number {
  if (max === min) return 0.5;
  return (val - min) / (max - min);
}

export function PeriodicTableVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<TrendMode>("radius");
  const [filter, setFilter] = useState<FilterMode>("all");
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
      camera.position.set(0, 2, 14);
      camera.lookAt(0, 0, 0);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.autoRotate = false;
      controls.minDistance = 5;
      controls.maxDistance = 25;

      scene.add(new THREE.AmbientLight(0xffffff, 0.8));

      const push = <T extends THREE.Object3D>(o: T): T => { scene.add(o); meshes.push(o); return o; };

      const trends: Record<TrendMode, { key: keyof typeof ELEMENT_DATA[0]; min: number; max: number; color: string }> = {
        radius: { key: "r", min: 32, max: 227, color: "#f97316" },
        ionization: { key: "ie", min: 419, max: 2372, color: "#22c55e" },
        electronegativity: { key: "en", min: 0, max: 3.98, color: "#3b82f6" },
      };

      const trend = trends[mode];

      const getFilteredElements = () => {
        if (filter === "all") return ELEMENT_DATA;
        if (filter === "metal" || filter === "non-metal") {
          return ELEMENT_DATA.filter((el) => el.series === filter);
        }
        return ELEMENT_DATA.filter((el) => el.block === filter);
      };

      const updateScene = () => {
        while (meshes.length > 5) {
          const m = meshes.pop()!;
          scene.remove(m);
          if (m instanceof THREE.Mesh) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Sprite) { (m.material as THREE.SpriteMaterial).map?.dispose?.(); m.material.dispose(); }
          else if (m instanceof THREE.Line) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
        }

        const filteredElements = getFilteredElements();
        const colStep = 1.8;
        const rowStep = 1.6;
        const offsetX = -(filteredElements.length * colStep) / 2;
        const offsetY = 3.5;

        const values = filteredElements.map((e) => e[trend.key] as number);
        const globalMin = Math.min(...values.filter((v) => v > 0));
        const globalMax = Math.max(...values.filter((v) => v > 0));

        filteredElements.forEach((el, idx) => {
          const val = el[trend.key] as number;
          const norm = val > 0 ? normalize(val, globalMin, globalMax) : 0;

          // Size based on normalized value
          const size = 0.25 + norm * 0.45;
          const x = offsetX + el.col * colStep;
          const y = offsetY - el.row * rowStep;

          // Element sphere
           const hue = trend.key === "r" ? 0.05 + norm * 0.08 : trend.key === "ie" ? 0.28 + norm * 0.12 : 0.58 + norm * 0.08;
          const color = new THREE.Color().setHSL(hue, 0.8, 0.5 + norm * 0.15);
          const sphere = push(new THREE.Mesh(
            new THREE.SphereGeometry(size, 16, 16),
            new THREE.MeshPhongMaterial({ color, emissive: color, emissiveIntensity: 0.2 }),
          ));
          sphere.position.set(x, y, 0);

          // Symbol label
          push(mkSprite(el.sym, `#${color.getHexString()}`, new THREE.Vector3(x, y + size + 0.5, 0.01), 0.55));

          // Arrow from sphere to feature annotation
          if (idx % 4 === 0 && val > 0) {
            const annotPos = new THREE.Vector3(x + 1.2, y + 1.0, 0);
            const arrowDir = new THREE.Vector3(x, y, 0).clone().sub(annotPos).normalize();
            const arrowLen = annotPos.distanceTo(new THREE.Vector3(x, y, 0));
            push(new LiveArrow(arrowDir, annotPos, arrowLen * 0.7, color.getHex(), 0.22, 0.1));
            const valStr = trend.key === "r" ? `${val} pm` : trend.key === "ie" ? `${val} kJ/mol` : `${val}`;
            push(mkSprite(`${el.sym}: ${valStr}`, `#${color.getHexString()}`, annotPos.clone().sub(arrowDir.multiplyScalar(0.5)), 0.5));
          }
        });

        // Trend arrows
        const trendLabels = {
          radius: { right: "Atomic Radius → Increases", down: "↓ Increases", desc: "Increases down a group, decreases across a period" },
          ionization: { right: "IE → Decreases", down: "↓ Decreases", desc: "Decreases down a group, increases across a period" },
          electronegativity: { right: "EN → Increases", down: "↓ Decreases", desc: "Increases down? No — increases up & right (F is highest)" },
        };
        const tl = trendLabels[mode];
        push(mkSprite(tl.right, "#fbbf24", new THREE.Vector3(5.5, offsetY - 0.5, 0.01), 0.6));
        push(mkSprite(tl.down, "#fbbf24", new THREE.Vector3(-5.5, offsetY - 2.5, 0.01), 0.6));
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
      // Re-fit the canvas whenever the container itself resizes (screen fit)
      const resizeObserver = new ResizeObserver(() => handleResize());
      resizeObserver.observe(container);

      return () => {
        cancelAnimationFrame(frameId);
        window.removeEventListener("resize", handleResize);
        resizeObserver?.disconnect();
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
  }, [mode, filter, isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="Periodic Trends" description="Periodic table trend visualization — requires WebGL." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Periodic Trends — Atomic Radius, IE & Electronegativity</span>
          <span className="text-xs text-muted-foreground font-normal">Select trend to visualize</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Trend Type">
          <Tabs value={mode} onValueChange={(v) => setMode(v as TrendMode)} className="mt-1">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="radius" className="text-xs">Atomic Radius</TabsTrigger>
              <TabsTrigger value="ionization" className="text-xs">Ionization Energy</TabsTrigger>
              <TabsTrigger value="electronegativity" className="text-xs">Electronegativity</TabsTrigger>
            </TabsList>
          </Tabs>
        </CollapsibleControls>

        <CollapsibleControls label="Element Filter">
          <div className="mt-1 flex flex-wrap gap-1">
            {(["all", "s", "p", "d", "f", "metal", "non-metal"] as FilterMode[]).map((f) => (
              <button
                key={f}
                className={`px-2 py-1 text-xs rounded-md border ${filter === f ? "bg-primary text-primary-foreground" : "bg-background hover:bg-accent"}`}
                onClick={() => setFilter(f)}
              >
                {f === "all" ? "All" : f === "metal" ? "Metals" : f === "non-metal" ? "Non-metals" : `${f}-block`}
              </button>
            ))}
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[clamp(320px,60vh,640px)] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-400">Periodic Trends</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Atomic Radius:</strong> Increases down a group (more shells), decreases across a period (higher Z_eff pulls electrons closer).</p>
            <p><strong className="text-foreground">Ionization Energy:</strong> Increases across a period (smaller radius, higher Z_eff), decreases down a group.</p>
            <p><strong className="text-foreground">Electronegativity:</strong> Fluorine is most electronegative (3.98). Increases up and to the right.</p>
            <p><strong className="text-foreground">Z_eff (effective nuclear charge):</strong> Increases across a period → explains most periodic trends.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}