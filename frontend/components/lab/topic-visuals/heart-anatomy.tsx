"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallback } from "@/components/lab/webgl-fallback";
import * as THREE from "three";

/* ============================================================
   Heart Anatomy — NEB Biology 12 (Human Health)
   Chambers, valves, and major vessels with long arrow labels.
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
  meshes.push(new THREE.ArrowHelper(dir, labelPos, len * 0.85, color, 0.22, 0.14) as any);
  const lp = labelPos.clone().sub(dir.clone().multiplyScalar(0.45));
  meshes.push(mkSprite(text, `#${color.toString(16).padStart(6, "0")}`, lp, 0.85));
}

export function HeartAnatomyVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isWebGL, setIsWebGL] = useState(true);

  useEffect(() => { setIsWebGL(isWebGLAvailable()); }, []);

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

      // Heart shape (simplified)
      const heartBody = push(new THREE.Mesh(
        new THREE.SphereGeometry(1.8, 20, 16),
        new THREE.MeshPhongMaterial({ color: 0xdc2626, shininess: 40 }),
      ));
      heartBody.position.set(0, 0, 0);
      heartBody.scale.set(1, 1.1, 0.8);

      // Atria (top chambers)
      const ra = push(new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 12, 10),
        new THREE.MeshPhongMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.6 }),
      ));
      ra.position.set(0.8, 1.2, 0.3);
      const la = push(new THREE.Mesh(
        new THREE.SphereGeometry(0.45, 12, 10),
        new THREE.MeshPhongMaterial({ color: 0xef4444, transparent: true, opacity: 0.6 }),
      ));
      la.position.set(-0.8, 1.2, 0.3);

      // Ventricles (bottom chambers)
      const rv = push(new THREE.Mesh(
        new THREE.SphereGeometry(0.65, 12, 10),
        new THREE.MeshPhongMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.6 }),
      ));
      rv.position.set(0.6, -0.8, 0.3);
      const lv = push(new THREE.Mesh(
        new THREE.SphereGeometry(0.7, 12, 10),
        new THREE.MeshPhongMaterial({ color: 0xef4444, transparent: true, opacity: 0.6 }),
      ));
      lv.position.set(-0.6, -0.8, 0.3);

      // Septum (wall between ventricles)
      const septum = push(new THREE.Mesh(
        new THREE.PlaneGeometry(0.05, 1.4),
        new THREE.MeshPhongMaterial({ color: 0x94a3b8, side: THREE.DoubleSide }),
      ));
      septum.position.set(0, -0.2, 0.3);

      // Valves
      const AVValve = push(new THREE.Mesh(
        new THREE.CylinderGeometry(0.55, 0.55, 0.05, 16),
        new THREE.MeshPhongMaterial({ color: 0xfbbf24 }),
      ));
      AVValve.position.set(0, 0.2, 0.35);
      const PVValve = push(new THREE.Mesh(
        new THREE.CylinderGeometry(0.3, 0.3, 0.05, 12),
        new THREE.MeshPhongMaterial({ color: 0xf59e0b }),
      ));
      PVValve.position.set(-0.3, 0.9, 0.35);

      // Major vessels
      const vessels = [
        { name: "Superior Vena Cava", color: 0x3b82f6, pos: new THREE.Vector3(1.0, 2.2, 0.3), scale: [0.2, 0.8, 0.2] },
        { name: "Inferior Vena Cava", color: 0x3b82f6, pos: new THREE.Vector3(1.0, -2.0, 0.3), scale: [0.2, 0.8, 0.2] },
        { name: "Aorta", color: 0xef4444, pos: new THREE.Vector3(-0.3, 2.0, 0.3), scale: [0.25, 1.0, 0.25] },
        { name: "Pulmonary Artery", color: 0x3b82f6, pos: new THREE.Vector3(-0.8, 1.5, 0.5), scale: [0.18, 0.7, 0.18] },
        { name: "Pulmonary Vein", color: 0xef4444, pos: new THREE.Vector3(-1.5, 0.5, 0.3), scale: [0.15, 0.6, 0.15] },
      ];
      for (const v of vessels) {
        const vessel = push(new THREE.Mesh(
          new THREE.CylinderGeometry(v.scale[0], v.scale[0], v.scale[1], 8),
          new THREE.MeshPhongMaterial({ color: v.color }),
        ));
        vessel.position.copy(v.pos);
      }

      // Labels
      push(mkSprite("Heart Anatomy — Four-Chambered Heart", "#fbbf24", new THREE.Vector3(0, 3.5, 0), 0.85));

      addLabel(meshes, "Right Atrium", 0x3b82f6, new THREE.Vector3(3, 2.2, 2), ra.position);
      addLabel(meshes, "Left Atrium", 0xef4444, new THREE.Vector3(-3, 2.2, -2), la.position);
      addLabel(meshes, "Right Ventricle", 0x3b82f6, new THREE.Vector3(3, -1.5, 2), rv.position);
      addLabel(meshes, "Left Ventricle\n(Thickest wall)", 0xef4444, new THREE.Vector3(-3, -1.5, -2), lv.position);
      addLabel(meshes, "Atrioventricular Valve", 0xfbbf24, new THREE.Vector3(2, 0.8, 3), AVValve.position);
      addLabel(meshes, "Semilunar Valve", 0xf59e0b, new THREE.Vector3(-2, 1.5, 3), PVValve.position);
      addLabel(meshes, "Aorta (to body)", 0xef4444, new THREE.Vector3(-3, 3.2, 2), vessels[2].pos);
      addLabel(meshes, "Superior Vena Cava", 0x3b82f6, new THREE.Vector3(3, 3.2, -2), vessels[0].pos);
      addLabel(meshes, "Inferior Vena Cava", 0x3b82f6, new THREE.Vector3(3, -3.2, 2), vessels[1].pos);
      addLabel(meshes, "Pulmonary Artery\n(to lungs)", 0x3b82f6, new THREE.Vector3(-3, 2.8, -2), vessels[3].pos);
      addLabel(meshes, "Pulmonary Vein\n(from lungs)", 0xef4444, new THREE.Vector3(3, 0.5, -3), vessels[4].pos);
      addLabel(meshes, "Septum\n(wall)", 0x94a3b8, new THREE.Vector3(0, -0.5, 3.5), septum.position);

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
  }, [isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="Heart Anatomy" description="3D heart with labeled chambers, valves, and vessels." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Heart Anatomy</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate · 4 chambers labeled</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-red-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Four chambers:</strong> Right atrium (receives deoxygenated blood), Right ventricle (pumps to lungs), Left atrium (receives oxygenated blood), Left ventricle (pumps to body — thickest wall).</p>
            <p><strong className="text-foreground">Valves:</strong> AV valves (tricuspid/bicuspid) prevent backflow from ventricles to atria; semilunar valves prevent backflow from arteries.</p>
            <p><strong className="text-foreground">Double circulation:</strong> Pulmonary circuit (heart→lungs→heart) + Systemic circuit (heart→body→heart).</p>
            <p><strong className="text-foreground">Septum:</strong> Muscular wall separating left and right sides — prevents mixing of oxygenated and deoxygenated blood.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
