"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallback } from "@/components/lab/webgl-fallback";
import * as THREE from "three";

/* ============================================================
   Immune System — NEB Biology 12 (Human Health & Diseases)
   Antigen-antibody interaction with labeled arrows.
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

export function ImmuneSystemVisual() {
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

      // Pathogen (antigen)
      const pathogen = push(new THREE.Mesh(
        new THREE.SphereGeometry(0.8, 16, 12),
        new THREE.MeshPhongMaterial({ color: 0xef4444 }),
      ));
      pathogen.position.set(-2.5, 0, 0);

      // Antigens (protrusions on pathogen)
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        const antigen = push(new THREE.Mesh(
          new THREE.ConeGeometry(0.08, 0.25, 6),
          new THREE.MeshPhongMaterial({ color: 0xfbbf24 }),
        ));
        antigen.position.set(
          -2.5 + Math.cos(angle) * 0.85,
          Math.sin(angle) * 0.85,
          0
        );
        antigen.lookAt(new THREE.Vector3(
          -2.5 + Math.cos(angle) * 2,
          Math.sin(angle) * 2,
          0
        ));
      }

      // Y-shaped antibody
      const antibodyGroup = new THREE.Group();
      // Stem
      const stem = new THREE.Mesh(
        new THREE.CylinderGeometry(0.06, 0.06, 0.6, 8),
        new THREE.MeshPhongMaterial({ color: 0x3b82f6 }),
      );
      stem.position.y = -0.3;
      antibodyGroup.add(stem);
      // Left arm
      const leftArm = new THREE.Mesh(
        new THREE.CylinderGeometry(0.05, 0.05, 0.5, 8),
        new THREE.MeshPhongMaterial({ color: 0x3b82f6 }),
      );
      leftArm.position.set(-0.18, 0.15, 0);
      leftArm.rotation.z = 0.4;
      antibodyGroup.add(leftArm);
      // Right arm
      const rightArm = new THREE.Mesh(
        new THREE.CylinderGeometry(0.05, 0.05, 0.5, 8),
        new THREE.MeshPhongMaterial({ color: 0x3b82f6 }),
      );
      rightArm.position.set(0.18, 0.15, 0);
      rightArm.rotation.z = -0.4;
      antibodyGroup.add(rightArm);
      // Binding sites (tips)
      const bindingL = push(new THREE.Mesh(
        new THREE.SphereGeometry(0.1, 8, 6),
        new THREE.MeshPhongMaterial({ color: 0xfbbf24 }),
      ));
      bindingL.position.set(-0.38, 0.4, 0);
      const bindingR = push(new THREE.Mesh(
        new THREE.SphereGeometry(0.1, 8, 6),
        new THREE.MeshPhongMaterial({ color: 0xfbbf24 }),
      ));
      bindingR.position.set(0.38, 0.4, 0);
      antibodyGroup.position.set(0, 0, 0);
      push(antibodyGroup);

      // Macrophage (phagocyte)
      const macrophage = push(new THREE.Mesh(
        new THREE.SphereGeometry(1.0, 16, 12),
        new THREE.MeshPhongMaterial({ color: 0xa78bfa, transparent: true, opacity: 0.5 }),
      ));
      macrophage.position.set(2.5, -1.5, 0);

      // Pseudopodia extending toward pathogen-antibody complex
      for (let i = 0; i < 4; i++) {
        const pseudo = push(new THREE.Mesh(
          new THREE.ConeGeometry(0.1, 0.5, 6),
          new THREE.MeshPhongMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.6 }),
        ));
        const angle = -Math.PI * 0.3 + i * 0.2;
        pseudo.position.set(2.5 + Math.cos(angle) * 0.5, -1.5 + Math.sin(angle) * 0.5, 0);
        pseudo.lookAt(new THREE.Vector3(
          2.5 + Math.cos(angle) * 1.5,
          -1.5 + Math.sin(angle) * 1.5,
          0
        ));
      }

      // Memory B cells
      const memB = push(new THREE.Mesh(
        new THREE.SphereGeometry(0.25, 10, 8),
        new THREE.MeshPhongMaterial({ color: 0x22d3ee }),
      ));
      memB.position.set(3, 1.5, 0.5);

      // T helper cell
      const tHelper = push(new THREE.Mesh(
        new THREE.SphereGeometry(0.25, 10, 8),
        new THREE.MeshPhongMaterial({ color: 0xf97316 }),
      ));
      tHelper.position.set(-3, 1.5, -0.5);

      // Labels
      push(mkSprite("Immune Response — Antigen-Antibody Interaction", "#fbbf24", new THREE.Vector3(0, 3.5, 0), 0.85));

      addLabel(meshes, "Pathogen (Antigen)", 0xef4444, new THREE.Vector3(-4.5, 1.5, 2), pathogen.position);
      addLabel(meshes, "Antigen (epitope)", 0xfbbf24, new THREE.Vector3(-4, 0.8, 2.5), new THREE.Vector3(-2.5, 0.8, 0));
      addLabel(meshes, "Antibody (Y-shape)", 0x3b82f6, new THREE.Vector3(1.5, 1.8, 2.5), new THREE.Vector3(0, 0.4, 0));
      addLabel(meshes, "Antigen-Binding Site\n(Variable region)", 0xfbbf24, new THREE.Vector3(-1, 1.5, -2.5), bindingL.position);
      addLabel(meshes, "Fc Region\n(Constant region)", 0x3b82f6, new THREE.Vector3(1, -0.8, 2.5), new THREE.Vector3(0, -0.3, 0));
      addLabel(meshes, "Macrophage\n(Phagocyte)", 0xa78bfa, new THREE.Vector3(4, -2.5, 2), macrophage.position);
      addLabel(meshes, "Memory B Cell", 0x22d3ee, new THREE.Vector3(4, 2.5, -2), memB.position);
      addLabel(meshes, "T Helper Cell", 0xf97316, new THREE.Vector3(-4, 2.5, 2), tHelper.position);
      addLabel(meshes, "Opsonization\n(coating for phagocytosis)", 0x7dd3fc, new THREE.Vector3(-1, -1.5, -3), new THREE.Vector3(-0.5, -0.5, 0));

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
    return <WebGLFallback title="Immune System" description="3D antigen-antibody interaction diagram." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Immune System — Antigen-Antibody Response</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-red-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Antigen:</strong> Foreign substance that triggers an immune response; recognized by antibodies.</p>
            <p><strong className="text-foreground">Antibody (Immunoglobulin):</strong> Y-shaped protein produced by plasma cells; specifically binds to antigens.</p>
            <p><strong className="text-foreground">Antigen-binding site:</strong> Variable region at tips of Y — highly specific to a particular antigen (lock and key).</p>
            <p><strong className="text-foreground">Fc region:</strong> Constant region that binds to phagocyte receptors (opsonization).</p>
            <p><strong className="text-foreground">Innate immunity:</strong> Non-specific defenses — skin, phagocytes, inflammation, fever.</p>
            <p><strong className="text-foreground">Adaptive immunity:</strong> Specific — B cells (humoral, antibodies) and T cells (cell-mediated).</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
