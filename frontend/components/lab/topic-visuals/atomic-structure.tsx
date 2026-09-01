"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallback } from "@/components/lab/webgl-fallback";
import * as THREE from "three";

/* ============================================================
   Atomic Structure — Bohr Model with Electron Orbits & Quantum Numbers
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

export function AtomicStructureVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [nElectrons, setNElectrons] = useState(10);
  const [isWebGL, setIsWebGL] = useState(true);
  const animRef = useRef<number>(0);

  useEffect(() => { setIsWebGL(isWebGLAvailable()); }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isWebGL) return;

    let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer;
    let controls: any, frameId: number;
    const meshes: THREE.Object3D[] = [];
    const electronMeshes: THREE.Group[] = [];

    const init = async () => {
      const { OrbitControls } = await import("three/addons/controls/OrbitControls.js");

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0f172a);
      camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
      camera.position.set(0, 6, 12);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.5;
      controls.minDistance = 4;
      controls.maxDistance = 25;

      scene.add(new THREE.AmbientLight(0xffffff, 0.7));
      const dir = new THREE.DirectionalLight(0xffffff, 1.0);
      dir.position.set(6, 10, 6);
      scene.add(dir);

      const push = <T extends THREE.Object3D>(o: T): T => { scene.add(o); meshes.push(o); return o; };

      // Nucleus (central sphere)
      const nucleus = push(new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 24, 24),
        new THREE.MeshPhongMaterial({ color: 0xef4444, emissive: 0x991b1b, shininess: 80 }),
      ));
      nucleus.position.set(0, 0, 0);

      push(mkSprite("NUCLEUS (p+ + n°)", "#ef4444", new THREE.Vector3(0, 1.2, 0), 0.7));

      const shells = [
        { r: 1.8, maxE: 2, label: "n=1 (K)", color: 0xfbbf24 },
        { r: 3.0, maxE: 8, label: "n=2 (L)", color: 0x22c55e },
        { r: 4.2, maxE: 18, label: "n=3 (M)", color: 0x3b82f6 },
        { r: 5.4, maxE: 32, label: "n=4 (N)", color: 0xa855f7 },
      ];

      const updateScene = () => {
        // Remove old dynamic meshes (keep nucleus + labels = first ~10)
        while (meshes.length > 12) {
          const m = meshes.pop()!;
          scene.remove(m);
          if (m instanceof THREE.Mesh) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Line) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Sprite) { (m.material as THREE.SpriteMaterial).map?.dispose?.(); m.material.dispose(); }
          else if (m instanceof THREE.Mesh && m.geometry.type === "RingGeometry") { (m.geometry as THREE.RingGeometry).dispose(); const mat = m.material; if (mat && !Array.isArray(mat)) mat.dispose(); }
        }

        // Clear old electron groups
        electronMeshes.forEach((g) => { scene.remove(g); g.traverse((c) => { if ((c as THREE.Mesh).geometry) (c as THREE.Mesh).geometry.dispose(); const mat = (c as THREE.Mesh).material; if (mat && !Array.isArray(mat)) mat.dispose(); }); });
        electronMeshes.length = 0;

        let remaining = nElectrons;
        shells.forEach((shell) => {
          const count = Math.min(remaining, shell.maxE);
          remaining -= count;

          // Orbit ring
          const ring = push(new THREE.Mesh(
            new THREE.TorusGeometry(shell.r, 0.03, 8, 64),
            new THREE.MeshBasicMaterial({ color: shell.color, transparent: true, opacity: 0.5 }),
          ));
          ring.rotation.x = Math.PI / 2;

          // Label with LONG ARROW pointing to shell
          const labelAngle = Math.random() * Math.PI * 2;
          const labelR = shell.r + 1.5;
          const labelPos = new THREE.Vector3(Math.cos(labelAngle) * labelR, shell.r * 0.3, Math.sin(labelAngle) * labelR);
          const targetPos = new THREE.Vector3(Math.cos(labelAngle) * shell.r, 0, Math.sin(labelAngle) * shell.r);
          const dir = targetPos.clone().sub(labelPos).normalize();
          const arrowLen = labelPos.distanceTo(targetPos);
          push(new THREE.ArrowHelper(dir, labelPos, arrowLen * 0.85, shell.color, 0.25, 0.12));
          push(mkSprite(shell.label, `#${shell.color.toString(16).padStart(6, "0")}`, labelPos.clone().sub(dir.multiplyScalar(0.4)), 0.65));

          // Electrons on shell
          for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2;
            const eg = new THREE.Group();
            const e = new THREE.Mesh(
              new THREE.SphereGeometry(0.12, 12, 12),
              new THREE.MeshPhongMaterial({ color: 0x22d3ee, emissive: 0x0891b2 }),
            );
            eg.position.set(Math.cos(angle) * shell.r, 0, Math.sin(angle) * shell.r);
            eg.add(e);
            scene.add(eg);
            electronMeshes.push(eg);
          }
        });

        // Remaining electrons in partial shell
        if (remaining > 0 && shells.length > 0) {
          const last = shells[shells.length - 1];
          const ring = push(new THREE.Mesh(
            new THREE.TorusGeometry(last.r + 1.2, 0.03, 8, 64),
            new THREE.MeshBasicMaterial({ color: 0xf97316, transparent: true, opacity: 0.4 }),
          ));
          ring.rotation.x = Math.PI / 2;
        }
      };

      updateScene();

      const animate = () => {
        frameId = requestAnimationFrame(animate);
        controls.update();

        // Rotate electrons
        const t = Date.now() * 0.001;
        electronMeshes.forEach((g, i) => {
          const shellR = shells.find((s, si) => {
            const count = shells.slice(0, si + 1).reduce((a, s) => a + Math.min(Math.max(0, nElectrons - shells.slice(0, si).reduce((a, s) => a + s.maxE, 0)), s.maxE), 0);
            return true;
          }) ?? shells[0];
          const speed = 1.5 / (g.position.length() + 0.1);
          g.position.x = Math.cos(t * speed + i * 0.5) * Math.abs(g.position.x || 2);
          g.position.z = Math.sin(t * speed + i * 0.5) * Math.abs(g.position.z || 2);
        });

        // Rotate nucleus slightly
        nucleus.rotation.y = t * 0.3;

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
        electronMeshes.forEach((g) => {
          scene.remove(g);
          g.traverse((c) => { if ((c as THREE.Mesh).geometry) (c as THREE.Mesh).geometry.dispose(); const mat = (c as THREE.Mesh).material; if (mat && !Array.isArray(mat)) mat.dispose(); });
        });
        renderer.dispose();
        controls.dispose?.();
      };
    };

    const cleanup = init();
    return () => { cleanup.then((d) => d?.()); };
  }, [nElectrons, isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="Atomic Structure" description="Bohr model visualization — requires WebGL." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Atomic Structure — Bohr Model & Electron Shells</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate · Scroll to zoom</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Electron Configuration">
          <div className="w-40 mt-1">
            <label className="text-xs text-muted-foreground">Total electrons: {nElectrons}</label>
            <input
              type="range" min={1} max={36} step={1} value={nElectrons}
              onChange={(e) => setNElectrons(Number(e.target.value))}
              className="mt-2 w-full"
            />
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-cyan-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Bohr's Model:</strong> Electrons orbit the nucleus in fixed energy levels (shells n=1,2,3,...).</p>
            <p><strong className="text-foreground">Shell capacity:</strong> Max electrons in shell n = 2n² (K=2, L=8, M=18, N=32).</p>
            <p><strong className="text-foreground">Quantum numbers:</strong> n (principal), l (azimuthal), mₗ (magnetic), mₛ (spin) define each electron's state.</p>
            <p><strong className="text-foreground">Aufbau principle:</strong> Electrons fill lowest energy orbitals first (1s → 2s → 2p → 3s → ...).</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
