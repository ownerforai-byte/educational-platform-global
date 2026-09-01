"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallback } from "@/components/lab/webgl-fallback";
import * as THREE from "three";

/* ============================================================
   Kidney Nephron — NEB Biology 12
   Shows filtration pathway: glomerulus → Bowman's capsule → PCT → Loop of Henle → DCT → Collecting duct.
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

export function NephronVisual() {
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
      camera.position.set(0, 0, 14);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.autoRotate = false;
      controls.minDistance = 5;
      controls.maxDistance = 22;

      scene.add(new THREE.AmbientLight(0xffffff, 0.7));
      const dl = new THREE.DirectionalLight(0xffffff, 0.9);
      dl.position.set(4, 6, 4);
      scene.add(dl);

      const push = <T extends THREE.Object3D>(o: T): T => { scene.add(o); meshes.push(o); return o; };

      // Renal artery/vein (vertical on left)
      const artery = push(new THREE.Mesh(
        new THREE.CylinderGeometry(0.1, 0.1, 5, 8),
        new THREE.MeshPhongMaterial({ color: 0xef4444 }),
      ));
      artery.position.set(-3, 0, 0);
      const vein = push(new THREE.Mesh(
        new THREE.CylinderGeometry(0.08, 0.08, 5, 8),
        new THREE.MeshPhongMaterial({ color: 0x3b82f6 }),
      ));
      vein.position.set(-2.7, 0, 0);

      // Glomerulus (capillary tuft)
      const glomerulus = push(new THREE.Mesh(
        new THREE.SphereGeometry(0.35, 12, 10),
        new THREE.MeshPhongMaterial({ color: 0xef4444 }),
      ));
      glomerulus.position.set(-2.0, 2.0, 0);

      // Bowman's capsule (cup-shaped)
      const bowmans = push(new THREE.Mesh(
        new THREE.SphereGeometry(0.55, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.6),
        new THREE.MeshPhongMaterial({ color: 0x22d3ee, side: THREE.DoubleSide, transparent: true, opacity: 0.4 }),
      ));
      bowmans.position.set(-2.0, 2.0, 0);
      bowmans.rotation.x = Math.PI;

      // Proximal Convoluted Tubule (PCT)
      const pctPts: THREE.Vector3[] = [];
      for (let i = 0; i <= 20; i++) {
        const t = i / 20;
        const angle = t * Math.PI * 4;
        pctPts.push(new THREE.Vector3(
          -2.0 + Math.sin(angle) * 0.3,
          1.5 - t * 1.0,
          Math.cos(angle) * 0.3
        ));
      }
      const pct = push(new THREE.Mesh(
        new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pctPts), 20, 0.08, 8, false),
        new THREE.MeshPhongMaterial({ color: 0x22c55e }),
      ));

      // Loop of Henle (descending + ascending)
      const loopDesc = push(new THREE.Mesh(
        new THREE.CylinderGeometry(0.07, 0.07, 1.2, 8),
        new THREE.MeshPhongMaterial({ color: 0x3b82f6 }),
      ));
      loopDesc.position.set(-2.0, 0.3, 0);
      const loopAsc = push(new THREE.Mesh(
        new THREE.CylinderGeometry(0.07, 0.07, 1.0, 8),
        new THREE.MeshPhongMaterial({ color: 0xf97316 }),
      ));
      loopAsc.position.set(-1.3, 0.5, 0);

      // Distal Convoluted Tubule (DCT)
      const dctPts: THREE.Vector3[] = [];
      for (let i = 0; i <= 15; i++) {
        const t = i / 15;
        const angle = t * Math.PI * 3;
        dctPts.push(new THREE.Vector3(
          -1.3 + t * 0.5 + Math.sin(angle) * 0.15,
          1.2 - t * 0.5,
          Math.cos(angle) * 0.15
        ));
      }
      const dct = push(new THREE.Mesh(
        new THREE.TubeGeometry(new THREE.CatmullRomCurve3(dctPts), 15, 0.07, 8, false),
        new THREE.MeshPhongMaterial({ color: 0xfbbf24 }),
      ));

      // Collecting duct
      const duct = push(new THREE.Mesh(
        new THREE.CylinderGeometry(0.1, 0.1, 1.5, 8),
        new THREE.MeshPhongMaterial({ color: 0xa78bfa }),
      ));
      duct.position.set(-0.8, -0.5, 0);

      // Vasa recta (peritubular capillaries)
      const vasa = push(new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(-2.0, 2.0, 0),
          new THREE.Vector3(-2.0, 0.3, 0.3),
          new THREE.Vector3(-1.3, 0.5, 0.3),
          new THREE.Vector3(-0.8, -0.5, 0.3),
        ]),
        new THREE.LineDashedMaterial({ color: 0xf472b6, dashSize: 0.1, gapSize: 0.06 }),
      ) as any);
      (vasa as any).computeLineDistances();

      // Filtration arrow (glomerulus → Bowman's capsule)
      const filtArrow = push(new THREE.ArrowHelper(
        new THREE.Vector3(0, -1, 0),
        new THREE.Vector3(-2.0, 2.5, 0),
        0.5,
        0xfbbf24,
        0.12,
        0.08,
      ) as any);

      push(mkSprite("Kidney Nephron — Filtration Pathway", "#fbbf24", new THREE.Vector3(0, 3.2, 0), 0.85));

      addLabel(meshes, "Renal Artery", 0xef4444, new THREE.Vector3(-4, 2.5, 2), artery.position);
      addLabel(meshes, "Renal Vein", 0x3b82f6, new THREE.Vector3(-4, -2.5, -2), vein.position);
      addLabel(meshes, "Glomerulus\n(capillary network)", 0xef4444, new THREE.Vector3(-3.5, 2.8, 2.5), glomerulus.position);
      addLabel(meshes, "Bowman's Capsule\n(filtration)", 0x22d3ee, new THREE.Vector3(-3.5, 2.8, -2.5), bowmans.position);
      addLabel(meshes, "PCT\n(reabsorption)", 0x22c55e, new THREE.Vector3(-3.5, 0.8, 2.5), pct.position);
      addLabel(meshes, "Loop of Henle\n(hairpin loop)", 0x3b82f6, new THREE.Vector3(1, -0.3, 3), loopDesc.position);
      addLabel(meshes, "Ascending Limb", 0xf97316, new THREE.Vector3(1, 0.3, -3), loopAsc.position);
      addLabel(meshes, "DCT\n(selective reabsorption)", 0xfbbf24, new THREE.Vector3(1.5, 1.2, 2.5), dct.position);
      addLabel(meshes, "Collecting Duct", 0xa78bfa, new THREE.Vector3(1, -2.0, -2.5), duct.position);
      addLabel(meshes, "Filtration\n(Blood → filtrate)", 0xfbbf24, new THREE.Vector3(-1, 3.0, 0), new THREE.Vector3(-2.0, 2.3, 0));

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
    return <WebGLFallback title="Kidney Nephron" description="3D nephron filtration pathway diagram." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Kidney — Nephron Structure</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate · Filtration pathway</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Glomerulus:</strong> Network of capillaries where blood filtration occurs under pressure; filtrate enters Bowman's capsule.</p>
            <p><strong className="text-foreground">Bowman's Capsule:</strong> Cup-shaped structure surrounding glomerulus; collects glomerular filtrate.</p>
            <p><strong className="text-foreground">PCT (Proximal Convoluted Tubule):</strong> Major site of reabsorption — glucose, amino acids, ions, water reabsorbed.</p>
            <p><strong className="text-foreground">Loop of Henle:</strong> Creates concentration gradient in medulla; descending limb is permeable to water, ascending to salts.</p>
            <p><strong className="text-foreground">DCT (Distal Convoluted Tubule):</strong> Selective reabsorption and secretion; regulated by hormones (ADH, aldosterone).</p>
            <p><strong className="text-foreground">Collecting Duct:</strong> Final adjustment of urine concentration; water reabsorbed under ADH influence.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
