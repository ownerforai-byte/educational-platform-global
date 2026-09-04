"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallback } from "@/components/lab/webgl-fallback";
import * as THREE from "three";

/* ============================================================
   Electrolysis — Beaker with Electrodes & Ion Movement
   NEB Chemistry 11 — Oxidation & Reduction
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

export function ElectrolysisVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [electrolyte, setElectrolyte] = useState<"molten-nacl" | "aq-cuSO4" | "water">("aq-cuSO4");
  const [isOn, setIsOn] = useState(true);
  const [isWebGL] = useState(() => isWebGLAvailable());


  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isWebGL) return;

    let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer;
    let controls: any, frameId: number;
    const meshes: THREE.Object3D[] = [];
    const ionMeshes: THREE.Group[] = [];

    const init = async () => {
      const { OrbitControls } = await import("three/addons/controls/OrbitControls.js");

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0f172a);
      camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
      camera.position.set(0, 2, 9);

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
      dir.position.set(4, 8, 6);
      scene.add(dir);

      const push = <T extends THREE.Object3D>(o: T): T => { scene.add(o); meshes.push(o); return o; };

      const clearDynamic = () => {
        while (meshes.length > 8) {
          const m = meshes.pop()!;
          scene.remove(m);
          if (m instanceof THREE.Mesh) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Sprite) { (m.material as THREE.SpriteMaterial).map?.dispose?.(); m.material.dispose(); }
          else if (m instanceof THREE.Line) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
        }
        ionMeshes.forEach((g) => {
          scene.remove(g);
          g.traverse((c) => { if ((c as THREE.Mesh).geometry) (c as THREE.Mesh).geometry.dispose(); const mat = (c as THREE.Mesh).material; if (mat && !Array.isArray(mat)) mat.dispose(); });
        });
        ionMeshes.length = 0;
      };

      const updateScene = (t: number) => {
        clearDynamic();

        const W = 5, H = 3.5, D = 2; // beaker dimensions
        const liquidH = 2.5;

        // Beaker walls (transparent)
        const wallMat = new THREE.MeshPhysicalMaterial({
          color: 0x94a3b8, transparent: true, opacity: 0.15,
          roughness: 0.1, metalness: 0.0, side: THREE.DoubleSide,
        });

        // Back wall
        const backWall = push(new THREE.Mesh(new THREE.PlaneGeometry(W, H), wallMat));
        backWall.position.set(0, 0, -D/2);

        // Front wall
        const frontWall = push(new THREE.Mesh(new THREE.PlaneGeometry(W, H), wallMat.clone()));
        frontWall.position.set(0, 0, D/2);

        // Liquid surface
        const liquidMat = new THREE.MeshPhysicalMaterial({
          color: electrolyte === "aq-cuSO4" ? 0x3b82f6 : electrolyte === "molten-nacl" ? 0xfbbf24 : 0x22d3ee,
          transparent: true, opacity: 0.3, roughness: 0.2,
        });
        const liquid = push(new THREE.Mesh(new THREE.PlaneGeometry(W - 0.2, D - 0.2), liquidMat));
        liquid.rotation.x = -Math.PI / 2;
        liquid.position.set(0, liquidH - 0.05, 0);

        // Electrodes
        const electrodeMat = new THREE.MeshPhongMaterial({ color: 0x475569, emissive: 0x1e293b, shininess: 60 });
        const anode = push(new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 3, 12), electrodeMat));
        anode.position.set(-1.8, 0.5, 0);
        const cathode = push(new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 3, 12), electrodeMat.clone()));
        cathode.position.set(1.8, 0.5, 0);

        // Electrode labels with long arrows
        const anodeLabel = new THREE.Vector3(-3.5, 2.5, 0);
        const anodeTarget = anode.position.clone();
        const aDir = anodeTarget.clone().sub(anodeLabel).normalize();
        const aLen = anodeLabel.distanceTo(anodeTarget);
        push(new THREE.ArrowHelper(aDir, anodeLabel, aLen * 0.85, 0xef4444, 0.28, 0.12));
        push(mkSprite("ANODE (+) — Oxidation", "#ef4444", anodeLabel.clone().sub(aDir.multiplyScalar(0.5)), 0.7));

        const cathLabel = new THREE.Vector3(3.5, 2.5, 0);
        const cathTarget = cathode.position.clone();
        const cDir = cathTarget.clone().sub(cathLabel).normalize();
        const cLen = cathLabel.distanceTo(cathTarget);
        push(new THREE.ArrowHelper(cDir, cathLabel, cLen * 0.85, 0x22c55e, 0.28, 0.12));
        push(mkSprite("CATHODE (−) — Reduction", "#22c55e", cathLabel.clone().sub(cDir.multiplyScalar(0.5)), 0.7));

        // Battery
        const battery = push(new THREE.Mesh(
          new THREE.BoxGeometry(1.2, 0.5, 0.3),
          new THREE.MeshPhongMaterial({ color: 0x1e293b, emissive: 0x0f172a }),
        ));
        battery.position.set(0, 2.2, D/2 + 0.3);
        push(mkSprite("DC Power Source", "#fbbf24", new THREE.Vector3(0, 2.7, D/2 + 0.3), 0.55));

        // Wire
        push(new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(-1.8, 2.0, 0), new THREE.Vector3(-1.8, 2.5, 0),
            new THREE.Vector3(0, 2.5, 0), new THREE.Vector3(0, 2.45, D/2 + 0.15),
          ]),
          new THREE.LineBasicMaterial({ color: 0x94a3b8 }),
        ));

        // Ions
        const ionMatPos = new THREE.MeshPhongMaterial({ color: 0xef4444, emissive: 0x991b1b });
        const ionMatNeg = new THREE.MeshPhongMaterial({ color: 0x3b82f6, emissive: 0x1d4ed8 });

        if (electrolyte === "aq-cuSO4") {
          // Cu²⁺ and SO₄²⁻ ions
          const ions = [
            { type: "pos", charge: "Cu²⁺", color: ionMatPos },
            { type: "neg", charge: "SO₄²⁻", color: ionMatNeg },
          ];
          ions.forEach(({ type, charge, color: mat }) => {
            for (let i = 0; i < 6; i++) {
              const g = new THREE.Group();
              const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.12, 10, 10), mat.clone());
              g.add(sphere);
              const phase = (i / 6) * Math.PI * 2;
              g.position.set(
                -1.5 + Math.cos(phase) * 1.2,
                0.3 + Math.sin(phase * 2) * 0.5,
                Math.sin(phase) * 0.6,
              );
              scene.add(g);
              ionMeshes.push(g);

              // Movement arrow
              if (isOn) {
                const target = type === "pos" ? new THREE.Vector3(1.8, 0.5, 0) : new THREE.Vector3(-1.8, 0.5, 0);
                const labelPos = g.position.clone().add(new THREE.Vector3(type === "pos" ? 0.5 : -0.5, 0.3, 0));
                const dir = target.clone().sub(labelPos).normalize();
                const arrowLen = labelPos.distanceTo(target);
                push(new THREE.ArrowHelper(dir, labelPos, Math.min(arrowLen * 0.5, 0.6), mat.color, 0.15, 0.08));
              }
            }
          });

          // Half-reactions
          push(mkSprite("Anode: 2SO₄²⁻ → S₂O₈²⁻ + 2e⁻  |  Cathode: Cu²⁺ + 2e⁻ → Cu(s)", "#7dd3fc", new THREE.Vector3(0, -2.2, 0), 0.55));
        }
        else if (electrolyte === "molten-nacl") {
          // Na⁺ and Cl⁻ in molten state
          for (let i = 0; i < 8; i++) {
            const g = new THREE.Group();
            const isPos = i < 4;
            const sphere = new THREE.Mesh(
              new THREE.SphereGeometry(0.12, 10, 10),
              new THREE.MeshPhongMaterial({ color: isPos ? 0x22c55e : 0xf97316, emissive: isPos ? 0x16a34a : 0xc2410c }),
            );
            g.add(sphere);
            const phase = (i / 8) * Math.PI * 2;
            g.position.set(Math.cos(phase) * 1.5, 0.5 + Math.sin(phase) * 0.3, Math.sin(phase) * 0.5);
            scene.add(g);
            ionMeshes.push(g);
          }
          push(mkSprite("Molten NaCl: Na⁺ → Na at cathode  |  Cl⁻ → Cl₂ at anode", "#fbbf24", new THREE.Vector3(0, -2.2, 0), 0.55));
        }
        else {
          // Water electrolysis: H⁺ and OH⁻
          for (let i = 0; i < 6; i++) {
            const g = new THREE.Group();
            const isPos = i < 3;
            const sphere = new THREE.Mesh(
              new THREE.SphereGeometry(0.1, 10, 10),
              new THREE.MeshPhongMaterial({ color: isPos ? 0x22c55e : 0xef4444, emissive: isPos ? 0x16a34a : 0x991b1b }),
            );
            g.add(sphere);
            const phase = (i / 6) * Math.PI * 2;
            g.position.set(Math.cos(phase) * 1.2, 0.8 + Math.sin(phase) * 0.4, Math.sin(phase) * 0.4);
            scene.add(g);
            ionMeshes.push(g);
          }
          push(mkSprite("2H₂O → 2H₂(g) + O₂(g)  |  Cathode: 2H⁺ + 2e⁻ → H₂  |  Anode: 4OH⁻ → O₂ + 2H₂O + 4e⁻", "#22d3ee", new THREE.Vector3(0, -2.2, 0), 0.5));
        }

        // Faraday's law label
        push(mkSprite("Faraday's Law: m = (Q × M) / (n × F)  where F = 96485 C/mol", "#a78bfa", new THREE.Vector3(0, 3.2, 0), 0.6));
      };

      updateScene(0);

      const animate = () => {
        frameId = requestAnimationFrame(animate);
        controls.update();
        const t = Date.now() * 0.001;
        updateScene(t);
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
        ionMeshes.forEach((g) => {
          scene.remove(g);
          g.traverse((c) => { if ((c as THREE.Mesh).geometry) (c as THREE.Mesh).geometry.dispose(); const mat = (c as THREE.Mesh).material; if (mat && !Array.isArray(mat)) mat.dispose(); });
        });
        renderer.dispose();
        controls.dispose?.();
      };
    };

    const cleanup = init();
    return () => { cleanup.then((d) => d?.()); };
  }, [electrolyte, isOn, isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="Electrolysis" description="Electrolytic cell visualization — requires WebGL." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Electrolysis — Electrolytic Cell</span>
          <span className="text-xs text-muted-foreground font-normal">Observe ion movement to electrodes</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Electrolyte">
          <div className="flex flex-wrap gap-2 mt-1">
            {([
              { v: "aq-cuSO4" as const, l: "CuSO₄(aq)" },
              { v: "molten-nacl" as const, l: "Molten NaCl" },
              { v: "water" as const, l: "Acidified Water" },
            ]).map((e) => (
              <button
                key={e.v}
                onClick={() => setElectrolyte(e.v)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  electrolyte === e.v ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {e.l}
              </button>
            ))}
          </div>
        </CollapsibleControls>

        <CollapsibleControls label="Power">
          <button
            onClick={() => setIsOn(!isOn)}
            className={`px-4 py-1.5 rounded-md text-xs font-medium transition-colors ${
              isOn ? "bg-green-600 text-white hover:bg-green-700" : "bg-red-600 text-white hover:bg-red-700"
            }`}
          >
            {isOn ? "⏸ Power OFF" : "▶ Power ON"}
          </button>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-red-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Anode (+):</strong> Oxidation occurs here. Anions migrate here. In aqueous CuSO₄: 2SO₄²⁻ → S₂O₈²⁻ + 2e⁻.</p>
            <p><strong className="text-foreground">Cathode (−):</strong> Reduction occurs here. Cations migrate here. In aqueous CuSO₄: Cu²⁺ + 2e⁻ → Cu(s).</p>
            <p><strong className="text-foreground">Faraday's Laws:</strong> m = (Q×M)/(n×F), where Q = I×t and F = 96,485 C/mol.</p>
            <p><strong className="text-foreground">Molten vs Aqueous:</strong> In molten NaCl, Na⁺ reduces to Na. In aqueous, H₂O may reduce instead (depends on E°).</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
