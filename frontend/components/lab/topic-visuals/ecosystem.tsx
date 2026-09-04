"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallback } from "@/components/lab/webgl-fallback";
import * as THREE from "three";
import { LiveArrow } from "@/components/lab/animated-arrow-helper";

/* ============================================================
   Ecosystem — Food Chain & Web — NEB Biology 11 (Ecology)
   Shows trophic levels with energy flow arrows.
   ============================================================ */

function mkSprite(text: string, color: string, pos: THREE.Vector3, scale = 1.0): THREE.Sprite {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 96;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "rgba(15, 23, 42, 0.92)";
  ctx.fillRect(4, 4, 504, 88);
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.strokeRect(4, 4, 504, 88);
  ctx.font = "bold 30px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = color;
  ctx.fillText(text, 256, 48);
  const tex = new THREE.CanvasTexture(canvas);
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false }));
  s.position.copy(pos);
  s.scale.set(3.2 * scale, 0.6 * scale, 1);
  return s;
}

function addLabel(meshes: THREE.Object3D[], text: string, color: number, labelPos: THREE.Vector3, targetPos: THREE.Vector3) {
  const dir = targetPos.clone().sub(labelPos).normalize();
  const len = labelPos.distanceTo(targetPos);
  meshes.push(new LiveArrow(dir, labelPos, len * 0.85, color, 0.22, 0.14) as any);
  const lp = labelPos.clone().sub(dir.clone().multiplyScalar(0.45));
  meshes.push(mkSprite(text, `#${color.toString(16).padStart(6, "0")}`, lp, 0.85));
}

export function EcosystemVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"chain" | "web" | "pyramid">("pyramid");
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
      camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
      camera.position.set(0, 0, 12);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.autoRotate = false;
      controls.minDistance = 4;
      controls.maxDistance = 20;

      scene.add(new THREE.AmbientLight(0xffffff, 0.7));
      const dl = new THREE.DirectionalLight(0xffffff, 0.9);
      dl.position.set(4, 6, 4);
      scene.add(dl);

      const push = <T extends THREE.Object3D>(o: T): T => { scene.add(o); meshes.push(o); return o; };

      const update = () => {
        while (meshes.length > 80) {
          const m = meshes.pop()!;
          scene.remove(m);
          if (m instanceof THREE.Mesh) { m.geometry?.dispose(); const mat = m.material; if (Array.isArray(mat)) mat.forEach((x) => x.dispose()); else (Array.isArray(mat) ? mat : [mat]).forEach((x) => x.dispose()); }
          else if (m instanceof THREE.Sprite) { const sm = m.material; sm.map?.dispose?.(); sm.dispose(); }
          else if (m instanceof THREE.ArrowHelper) m.dispose();
        }

        if (mode === "pyramid") {
          // Ecological pyramid (numbers/biomass/energy)
          const levels = [
            { name: "Producers", y: -2.5, width: 5, color: 0x22c55e, energy: "10,000 kJ" },
            { name: "Primary Consumers", y: -1.0, width: 3.5, color: 0xfbbf24, energy: "1,000 kJ" },
            { name: "Secondary Consumers", y: 0.5, width: 2.0, color: 0xf97316, energy: "100 kJ" },
            { name: "Tertiary Consumers", y: 1.8, width: 0.8, color: 0xef4444, energy: "10 kJ" },
          ];

          for (let i = 0; i < levels.length; i++) {
            const lvl = levels[i];
            // Pyramid level
            const level = push(new THREE.Mesh(
              new THREE.BoxGeometry(lvl.width, 0.8, 0.3),
              new THREE.MeshPhongMaterial({ color: lvl.color, transparent: true, opacity: 0.7 }),
            ));
            level.position.set(0, lvl.y, 0);

            // Label
            push(mkSprite(lvl.name, `#${lvl.color.toString(16).padStart(6, "0")}`, new THREE.Vector3(-3.5, lvl.y, 0), 0.8));
            push(mkSprite(lvl.energy, "#7dd3fc", new THREE.Vector3(3.5, lvl.y, 0), 0.7));

            // Energy flow arrow between levels
            if (i < levels.length - 1) {
              const fromY = lvl.y + 0.4;
              const toY = levels[i + 1].y - 0.4;
              const arrowDir = new THREE.Vector3(0, 1, 0);
              const arrowPos = new THREE.Vector3(lvl.width / 2 + 0.8, (fromY + toY) / 2, 0);
              addLabel(meshes, "↓ 90% energy lost", 0x94a3b8,
                new THREE.Vector3(lvl.width / 2 + 1.5, (fromY + toY) / 2 + 0.3, 0),
                arrowPos);
            }
          }

          // 10% law label
          push(mkSprite("10% Law: Only ~10% energy transfers to next trophic level", "#fbbf24", new THREE.Vector3(0, 3.2, 0), 0.75));

          // Decomposers
          const decomposer = push(new THREE.Mesh(
            new THREE.SphereGeometry(0.3, 10, 8),
            new THREE.MeshPhongMaterial({ color: 0x92400e }),
          ));
          decomposer.position.set(0, -3.8, 0);
          addLabel(meshes, "Decomposers", 0x92400e, new THREE.Vector3(-2.5, -4.2, 2), decomposer.position);
        } else if (mode === "chain") {
          // Food chain: Grass → Grasshopper → Frog → Snake → Eagle
          const chain = [
            { name: "Grass\n(Producer)", color: 0x22c55e, pos: new THREE.Vector3(-4, 0, 0) },
            { name: "Grasshopper\n(Primary Consumer)", color: 0xfbbf24, pos: new THREE.Vector3(-2, 1, 0) },
            { name: "Frog\n(Secondary Consumer)", color: 0xf97316, pos: new THREE.Vector3(0, 0, 0) },
            { name: "Snake\n(Tertiary Consumer)", color: 0xef4444, pos: new THREE.Vector3(2, 1, 0) },
            { name: "Eagle\n(Apex Predator)", color: 0xa78bfa, pos: new THREE.Vector3(4, 0, 0) },
          ];

          for (const c of chain) {
            const node = push(new THREE.Mesh(
              new THREE.SphereGeometry(0.4, 12, 10),
              new THREE.MeshPhongMaterial({ color: c.color, shininess: 50 }),
            ));
            node.position.copy(c.pos);
            push(mkSprite(c.name, `#${c.color.toString(16).padStart(6, "0")}`, new THREE.Vector3(c.pos.x, c.pos.y + 1.2, 0), 0.75));

            // Arrow to next
            if (c.pos.x < 4) {
              const next = chain[chain.indexOf(c) + 1];
              const arrowDir = next.pos.clone().sub(c.pos).normalize();
              const mid = c.pos.clone().add(next.pos).multiplyScalar(0.5);
              const arrowLabelPos = new THREE.Vector3(mid.x, mid.y + 0.5, 1.5);
              addLabel(meshes, "eaten by", 0x94a3b8, arrowLabelPos, mid.clone().add(new THREE.Vector3(0, 0, 0.5)));
            }
          }

          // Sun
          const sun = push(new THREE.Mesh(
            new THREE.SphereGeometry(0.5, 16, 12),
            new THREE.MeshPhongMaterial({ color: 0xfbbf24, emissive: 0xfbbf24, emissiveIntensity: 0.5 }),
          ));
          sun.position.set(-5, 2.5, 0);
          addLabel(meshes, "Sun (Energy Source)", 0xfbbf24, new THREE.Vector3(-4.5, 3.5, 2), sun.position);
          const sunArrow = push(new LiveArrow(new THREE.Vector3(1, -0.6, 0), new THREE.Vector3(-4.5, 2.5, 0), 1.5, 0xfbbf24, 0.15, 0.08) as any);

          // Decomposer arrow
          const decomp = push(new THREE.Mesh(
            new THREE.SphereGeometry(0.25, 8, 6),
            new THREE.MeshPhongMaterial({ color: 0x92400e }),
          ));
          decomp.position.set(0, -2, 0);
          addLabel(meshes, "Decomposers\n(break down all levels)", 0x92400e, new THREE.Vector3(0, -3, 2), decomp.position);

          push(mkSprite("Food Chain — Energy Flow", "#fbbf24", new THREE.Vector3(0, 3.2, 0), 0.85));
        } else {
          // Food web
          const nodes = [
            { name: "Grass", color: 0x22c55e, pos: new THREE.Vector3(-3, -1, 0) },
            { name: "Insects", color: 0xfbbf24, pos: new THREE.Vector3(-1.5, 1, 0) },
            { name: "Rabbits", color: 0xf97316, pos: new THREE.Vector3(0, -1.5, 0) },
            { name: "Frogs", color: 0x22d3ee, pos: new THREE.Vector3(1.5, 1, 0) },
            { name: "Snakes", color: 0xef4444, pos: new THREE.Vector3(3, -0.5, 0) },
            { name: "Birds", color: 0x3b82f6, pos: new THREE.Vector3(1.5, -1.5, 0) },
            { name: "Eagles", color: 0xa78bfa, pos: new THREE.Vector3(3.5, 1.5, 0) },
          ];

          // Draw nodes
          for (const n of nodes) {
            const node = push(new THREE.Mesh(
              new THREE.SphereGeometry(0.25, 10, 8),
              new THREE.MeshPhongMaterial({ color: n.color }),
            ));
            node.position.copy(n.pos);
            push(mkSprite(n.name, `#${n.color.toString(16).padStart(6, "0")}`, new THREE.Vector3(n.pos.x, n.pos.y + 0.7, 0), 0.65));
          }

          // Food web connections
          const connections = [
            [0, 1], [0, 2], [1, 3], [2, 4], [2, 5], [3, 4], [4, 6], [5, 6], [1, 5],
          ];
          for (const [a, b] of connections) {
            const line = push(new THREE.Line(
              new THREE.BufferGeometry().setFromPoints([nodes[a].pos, nodes[b].pos]),
              new THREE.LineDashedMaterial({ color: 0x64748b, dashSize: 0.15, gapSize: 0.08 }),
            ) as any);
            (line as any).computeLineDistances();
          }

          // Energy source
          const sun = push(new THREE.Mesh(
            new THREE.SphereGeometry(0.4, 12, 10),
            new THREE.MeshPhongMaterial({ color: 0xfbbf24, emissive: 0xfbbf24, emissiveIntensity: 0.4 }),
          ));
          sun.position.set(0, 3, 0);
          addLabel(meshes, "Sun", 0xfbbf24, new THREE.Vector3(-1, 3.8, 2), sun.position);

          push(mkSprite("Food Web — Interconnected Feeding Relationships", "#fbbf24", new THREE.Vector3(0, -3, 0), 0.8));
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
          else if (m instanceof THREE.ArrowHelper) m.dispose();
        });
        renderer.dispose();
        controls.dispose?.();
      };
    };

    const cleanup = init();
    return () => { cleanup.then((d) => d?.()); };
  }, [mode, isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="Ecosystem (Food Chain & Web)" description="3D trophic level diagrams." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Ecosystem — Food Chain, Web & Pyramid</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="View Mode">
          <div className="flex flex-wrap gap-2 mt-2">
            {(["chain", "web", "pyramid"] as const).map((m) => (
              <button key={m} onClick={() => setMode(m)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  mode === m ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}>
                {m === "chain" ? "Food Chain" : m === "web" ? "Food Web" : "Ecological Pyramid"}
              </button>
            ))}
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-green-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Producer:</strong> Autotrophs (plants) that convert solar energy into chemical energy via photosynthesis.</p>
            <p><strong className="text-foreground">Consumer:</strong> Heterotrophs that feed on other organisms — primary, secondary, tertiary.</p>
            <p><strong className="text-foreground">Decomposer:</strong> Fungi and bacteria that break down dead organic matter, recycling nutrients.</p>
            <p><strong className="text-foreground">10% Law:</strong> Only ~10% of energy is transferred between trophic levels; rest lost as heat.</p>
            <p><strong className="text-foreground">Food web:</strong> Complex network of interconnected food chains in an ecosystem.</p>
            <p><strong className="text-foreground">Ecological pyramid:</strong> Shows decreasing energy/biomass/numbers at higher trophic levels.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
