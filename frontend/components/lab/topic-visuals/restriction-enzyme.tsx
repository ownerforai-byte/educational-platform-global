"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallback } from "@/components/lab/webgl-fallback";
import * as THREE from "three";
import { LiveArrow } from "@/components/lab/animated-arrow-helper";

/* ============================================================
   Restriction Enzyme Cutting — NEB Biology 12 (Biotechnology)
   Shows DNA ladder, restriction sites, and cut products.
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

export function RestrictionEnzymeVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cut, setCut] = useState(false);
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
        while (meshes.length > 100) {
          const m = meshes.pop()!;
          scene.remove(m);
          if (m instanceof THREE.Mesh) { m.geometry?.dispose(); const mat = m.material; if (Array.isArray(mat)) mat.forEach((x) => x.dispose()); else (Array.isArray(mat) ? mat : [mat]).forEach((x) => x.dispose()); }
          else if (m instanceof THREE.Sprite) { const sm = m.material; sm.map?.dispose?.(); sm.dispose(); }
          else if (m instanceof THREE.ArrowHelper) m.dispose();
        }

        if (!cut) {
          // Intact DNA
          const top = push(new THREE.Mesh(
            new THREE.BoxGeometry(5, 0.1, 0.2),
            new THREE.MeshPhongMaterial({ color: 0xef4444 }),
          ));
          top.position.set(0, 0.3, 0);
          const bottom = push(new THREE.Mesh(
            new THREE.BoxGeometry(5, 0.1, 0.2),
            new THREE.MeshPhongMaterial({ color: 0x3b82f6 }),
          ));
          bottom.position.set(0, -0.3, 0);

          // Base pair rungs
          for (let i = 0; i < 10; i++) {
            const rung = push(new THREE.Mesh(
              new THREE.CylinderGeometry(0.02, 0.02, 0.55, 4),
              new THREE.MeshPhongMaterial({ color: 0xfbbf24, transparent: true, opacity: 0.5 }),
            ));
            rung.position.set(-2.2 + i * 0.5, 0, 0);
            rung.rotation.z = Math.PI / 2;
          }

          // Restriction site marker
          const site = push(new THREE.Mesh(
            new THREE.BoxGeometry(0.6, 0.25, 0.3),
            new THREE.MeshPhongMaterial({ color: 0xa78bfa, transparent: true, opacity: 0.4 }),
          ));
          site.position.set(0.5, 0, 0);

          push(mkSprite("EcoRI Recognition Site: 5'-GAATTC-3'", "#a78bfa", new THREE.Vector3(0, 1.5, 0), 0.7));
          addLabel(meshes, "Restriction Site", 0xa78bfa, new THREE.Vector3(2.5, 0.8, 2.5), site.position);
          addLabel(meshes, "DNA Strand 5'→3'", 0xef4444, new THREE.Vector3(-3, 1.0, 2), top.position);
          addLabel(meshes, "DNA Strand 3'→5'", 0x3b82f6, new THREE.Vector3(-3, -1.0, 2), bottom.position);
        } else {
          // Cut DNA — two fragments
          // Fragment 1 (left)
          const f1top = push(new THREE.Mesh(
            new THREE.BoxGeometry(2.5, 0.1, 0.2),
            new THREE.MeshPhongMaterial({ color: 0xef4444 }),
          ));
          f1top.position.set(-1.5, 0.3, 0);
          const f1bottom = push(new THREE.Mesh(
            new THREE.BoxGeometry(2.5, 0.1, 0.2),
            new THREE.MeshPhongMaterial({ color: 0x3b82f6 }),
          ));
          f1bottom.position.set(-1.5, -0.3, 0);

          // Sticky ends on fragment 1
          const overhang1 = push(new THREE.Mesh(
            new THREE.BoxGeometry(0.4, 0.08, 0.15),
            new THREE.MeshPhongMaterial({ color: 0xfbbf24 }),
          ));
          overhang1.position.set(-0.25, 0.3, 0);

          // Fragment 2 (right)
          const f2top = push(new THREE.Mesh(
            new THREE.BoxGeometry(2.5, 0.1, 0.2),
            new THREE.MeshPhongMaterial({ color: 0xef4444 }),
          ));
          f2top.position.set(1.5, 0.3, 0);
          const f2bottom = push(new THREE.Mesh(
            new THREE.BoxGeometry(2.5, 0.1, 0.2),
            new THREE.MeshPhongMaterial({ color: 0x3b82f6 }),
          ));
          f2bottom.position.set(1.5, -0.3, 0);

          // Sticky ends on fragment 2
          const overhang2 = push(new THREE.Mesh(
            new THREE.BoxGeometry(0.4, 0.08, 0.15),
            new THREE.MeshPhongMaterial({ color: 0x22c55e }),
          ));
          overhang2.position.set(0.25, -0.3, 0);

          // Scissors icon (restriction enzyme)
          const enzyme = push(new THREE.Mesh(
            new THREE.ConeGeometry(0.15, 0.3, 6),
            new THREE.MeshPhongMaterial({ color: 0xf97316 }),
          ));
          enzyme.position.set(0.5, 0.8, 0);
          enzyme.rotation.z = Math.PI / 2;

          push(mkSprite("Cut by EcoRI — Sticky Ends Generated", "#fbbf24", new THREE.Vector3(0, 1.8, 0), 0.75));
          addLabel(meshes, "Fragment 1", 0x22d3ee, new THREE.Vector3(-3, 1.2, 2), f1top.position);
          addLabel(meshes, "Fragment 2", 0x22d3ee, new THREE.Vector3(3, 1.2, 2), f2top.position);
          addLabel(meshes, "Sticky End (5' overhang)", 0xfbbf24, new THREE.Vector3(1, 0.8, 2.5), overhang1.position);
          addLabel(meshes, "Sticky End (complement)", 0x22c55e, new THREE.Vector3(-1, -0.8, -2.5), overhang2.position);
          addLabel(meshes, "Restriction Enzyme\n(EcoRI)", 0xf97316, new THREE.Vector3(0.5, 1.5, -2.5), enzyme.position);

          // Gel electrophoresis representation
          const gelX = 3.5;
          for (let i = 0; i < 3; i++) {
            const bandWidth = 0.8 - i * 0.2;
            const band = push(new THREE.Mesh(
              new THREE.BoxGeometry(bandWidth, 0.08, 0.05),
              new THREE.MeshPhongMaterial({ color: 0xfbbf24, emissive: 0xfbbf24, emissiveIntensity: 0.3 }),
            ));
            band.position.set(gelX, 0.5 - i * 0.4, 0);
          }
          const gelBox = push(new THREE.Mesh(
            new THREE.BoxGeometry(0.05, 1.5, 0.3),
            new THREE.MeshPhongMaterial({ color: 0x475569 }),
          ));
          gelBox.position.set(gelX - 0.3, -0.2, 0);
          addLabel(meshes, "Gel Electrophoresis\n(Size separation)", 0x7dd3fc, new THREE.Vector3(4.5, 1.0, 2), new THREE.Vector3(gelX, 0, 0));
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
  }, [cut, isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="Restriction Enzyme Cutting" description="3D DNA cutting and gel electrophoresis." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Restriction Enzyme — Molecular Scissors</span>
          <span className="text-xs text-muted-foreground font-normal">Click "Cut DNA" to see restriction digest</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Action">
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => setCut(!cut)}
              className="px-3 py-1.5 rounded-md text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {cut ? "Uncut DNA" : "Cut with EcoRI"}
            </button>
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-purple-500/30 bg-purple-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-purple-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Restriction enzymes:</strong> Molecular scissors that cut DNA at specific recognition sequences (palindromes).</p>
            <p><strong className="text-foreground">EcoRI:</strong> Recognizes 5'-GAATTC-3' and cuts between G and A on both strands, producing sticky ends.</p>
            <p><strong className="text-foreground">Sticky ends:</strong> Single-stranded overhangs that can base-pair with complementary sticky ends from another cut.</p>
            <p><strong className="text-foreground">Blunt ends:</strong> Some enzymes cut straight across both strands (no overhang).</p>
            <p><strong className="text-foreground">Gel electrophoresis:</strong> Separates DNA fragments by size; smaller fragments migrate faster through the gel.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
