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

export function SemiconductorsVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [material, setMaterial] = useState<"insulator" | "semiconductor" | "conductor">("semiconductor");
  const [temp, setTemp] = useState(300);
  const [isWebGL, setIsWebGL] = useState(true);

  useEffect(() => { setIsWebGL(isWebGLAvailable()); }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isWebGL) return;

    let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer;
    let controls: any;
    let frameId: number;
    let animTime = 0;
    const meshes: THREE.Object3D[] = [];
    let electronDot: THREE.Mesh;
    let holeDot: THREE.Mesh;

    const bandGap = material === "insulator" ? 6 : material === "semiconductor" ? 1.1 : 0;
    const gapColor = material === "insulator" ? 0xef4444 : material === "semiconductor" ? 0xfbbf24 : 0x22c55e;

    const init = async () => {
      const { OrbitControls } = await import("three/addons/controls/OrbitControls.js");

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0f172a);
      camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
      camera.position.set(0, 0, 10);

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

      // Energy axis
      push(new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-4, -4, 0), new THREE.Vector3(-4, 4, 0)]),
        new THREE.LineBasicMaterial({ color: 0x475569 }),
      ));
      push(mkSprite("E (Energy)", "#475569", new THREE.Vector3(-4, 4.5, 0), 0.7));

      // Valence band
      const vbY = -1.5;
      const vb = push(new THREE.Mesh(
        new THREE.BoxGeometry(5, 0.3, 0.5),
        new THREE.MeshBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.7 }),
      )) as THREE.Mesh;
      vb.position.set(0, vbY, 0);
      push(mkSprite("Valence Band (VB)", "#3b82f6", new THREE.Vector3(3.2, vbY, 0), 0.75));

      // Conduction band
      const cbY = bandGap > 0 ? -1.5 + bandGap + 0.5 : vbY + 0.3;
      if (bandGap > 0) {
        const cb = push(new THREE.Mesh(
          new THREE.BoxGeometry(5, 0.3, 0.5),
          new THREE.MeshBasicMaterial({ color: 0xef4444, transparent: true, opacity: 0.7 }),
        )) as THREE.Mesh;
        cb.position.set(0, cbY, 0);
        push(mkSprite("Conduction Band (CB)", "#ef4444", new THREE.Vector3(3.2, cbY, 0), 0.75));

        // Band gap
        const gapLine = push(new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-1.5, vbY + 0.15, 0), new THREE.Vector3(-1.5, cbY - 0.15, 0)]),
          new THREE.LineDashedMaterial({ color: gapColor, dashSize: 0.2, gapSize: 0.1 }),
        ) as any);
        (meshes[meshes.length - 1] as any).computeLineDistances();

        // Long arrow for band gap
        const gapLabelPos = new THREE.Vector3(-2.5, (vbY + cbY) / 2, 0);
        const gapTarget = new THREE.Vector3(-1.5, (vbY + cbY) / 2, 0);
        const gapDir = gapTarget.clone().sub(gapLabelPos).normalize();
        push(new THREE.ArrowHelper(gapDir, gapLabelPos, gapLabelPos.distanceTo(gapTarget) * 0.9, gapColor, 0.2, 0.12));
        push(mkSprite(`E_g = ${bandGap} eV (band gap)`, "#fbbf24", gapLabelPos.clone().sub(gapDir.multiplyScalar(0.5)), 0.8));
      } else {
        push(mkSprite("Bands overlap (no gap)", "#22c55e", new THREE.Vector3(0, vbY + 1, 0), 0.7));
      }

      // Fermi level
      const efY = bandGap > 0 ? vbY + 0.15 + bandGap / 2 : vbY + 0.15;
      push(new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-2, efY, 0), new THREE.Vector3(2, efY, 0)]),
        new THREE.LineDashedMaterial({ color: 0x22d3ee, dashSize: 0.3, gapSize: 0.15 }),
      ) as any);
      (meshes[meshes.length - 1] as any).computeLineDistances();
      push(mkSprite("E_F (Fermi level)", "#22d3ee", new THREE.Vector3(2.5, efY, 0), 0.7));

      // Electron in conduction band (animated)
      if (bandGap > 0) {
        const electron = push(new THREE.Mesh(
          new THREE.SphereGeometry(0.12, 12, 12),
          new THREE.MeshBasicMaterial({ color: 0x22d3ee }),
        )) as THREE.Mesh;
        electron.position.set(0, cbY, 0);
        electronDot = electron;

        const hole = push(new THREE.Mesh(
          new THREE.SphereGeometry(0.12, 12, 12),
          new THREE.MeshBasicMaterial({ color: 0xfbbf24 }),
        )) as THREE.Mesh;
        hole.position.set(0, vbY, 0);
        holeDot = hole;

        // Electron label
        const eLabelPos = new THREE.Vector3(0, cbY + 0.8, 0);
        const eTarget = new THREE.Vector3(0, cbY, 0);
        const eDir = eTarget.clone().sub(eLabelPos).normalize();
        push(new THREE.ArrowHelper(eDir, eLabelPos, eLabelPos.distanceTo(eTarget) * 0.9, 0x22d3ee, 0.15, 0.1));
        push(mkSprite("e⁻ (electron)", "#22d3ee", eLabelPos.clone().sub(eDir.multiplyScalar(0.5)), 0.75));

        // Hole label
        const hLabelPos = new THREE.Vector3(0, vbY - 0.8, 0);
        const hTarget = new THREE.Vector3(0, vbY, 0);
        const hDir = hTarget.clone().sub(hLabelPos).normalize();
        push(new THREE.ArrowHelper(hDir, hLabelPos, hLabelPos.distanceTo(hTarget) * 0.9, 0xfbbf24, 0.15, 0.1));
        push(mkSprite("h⁺ (hole)", "#fbbf24", hLabelPos.clone().sub(hDir.multiplyScalar(0.5)), 0.75));
      }

      // Temperature label
      const tempLabelPos = new THREE.Vector3(-3, -4.5, 0);
      const tempTarget = new THREE.Vector3(0, 0, 0);
      const tempDir = tempTarget.clone().sub(tempLabelPos).normalize();
      push(new THREE.ArrowHelper(tempDir, tempLabelPos, tempLabelPos.distanceTo(tempTarget) * 0.9, 0x34d399, 0.15, 0.1));
      push(mkSprite(`T = ${temp} K`, "#34d399", tempLabelPos.clone().sub(tempDir.multiplyScalar(0.5)), 0.75));

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
        animTime += 0.018;
        if (electronDot && holeDot) {
          electronDot.position.x = Math.sin(animTime * 2) * 1.8;
          holeDot.position.x = -Math.sin(animTime * 2) * 1.8;
          electronDot.material.opacity = 0.6 + 0.4 * Math.sin(animTime * 3);
          holeDot.material.opacity = 0.6 + 0.4 * Math.sin(animTime * 3 + Math.PI);
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
  }, [material, temp, isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="Semiconductors" description="Energy band diagram showing conductors, semiconductors, and insulators." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Semiconductors — Energy Band Diagram</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate · Scroll to zoom</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Material Type">
          <div className="flex flex-wrap gap-2 mt-1">
            {([
              ["insulator", "Insulator"],
              ["semiconductor", "Semiconductor"],
              ["conductor", "Conductor"],
            ] as const).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setMaterial(key as typeof material)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  material === key ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-green-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Band theory:</strong> Electrons occupy energy bands separated by band gaps.</p>
            <p><strong className="text-foreground">Valence band:</strong> Filled with electrons at absolute zero — bonding electrons.</p>
            <p><strong className="text-foreground">Conduction band:</strong> Empty at 0K — electrons here conduct current.</p>
            <p><strong className="text-foreground">Band gap (E_g):</strong> Insulators: {'>'}5 eV; Semiconductors: ~1 eV; Conductors: overlap (0 eV).</p>
            <p><strong className="text-foreground">Doping:</strong> Adding impurities creates n-type (extra electrons) or p-type (holes).</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
