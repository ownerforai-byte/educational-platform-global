"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallback } from "@/components/lab/webgl-fallback";
import * as THREE from "three";

/* ============================================================
   Evolution — Phylogenetic Tree — NEB Biology 11
   Shows evolutionary relationships with adaptation labels.
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
  ctx.strokeRect(4, 4, 504, 504);
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

export function EvolutionVisual() {
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

      // Root (common ancestor)
      const root = push(new THREE.Mesh(
        new THREE.SphereGeometry(0.3, 12, 10),
        new THREE.MeshPhongMaterial({ color: 0x92400e }),
      ));
      root.position.set(-5, 0, 0);

      // Main branch trunk
      const trunk = push(new THREE.Mesh(
        new THREE.CylinderGeometry(0.05, 0.05, 3, 6),
        new THREE.MeshPhongMaterial({ color: 0x78350f }),
      ));
      trunk.position.set(-3.5, 0, 0);

      // Branch 1: Simple organisms → up
      const branch1 = push(new THREE.Mesh(
        new THREE.CylinderGeometry(0.03, 0.03, 1.5, 6),
        new THREE.MeshPhongMaterial({ color: 0x64748b }),
      ));
      branch1.position.set(-2, 1.2, 0);
      const branch1Tip = push(new THREE.Mesh(
        new THREE.SphereGeometry(0.18, 8, 6),
        new THREE.MeshPhongMaterial({ color: 0x64748b }),
      ));
      branch1Tip.position.set(-2, 2.0, 0);

      // Branch 2: splits into multiple
      const branch2 = push(new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.04, 1.0, 6),
        new THREE.MeshPhongMaterial({ color: 0x22c55e }),
      ));
      branch2.position.set(-1.5, 0.5, 0);

      // Sub-branches from branch 2
      const subBranches = [
        { angle: -0.4, label: "Fish", color: 0x3b82f6, yOff: 0 },
        { angle: 0, label: "Amphibians", color: 0x22c55e, yOff: 0.3 },
        { angle: 0.4, label: "Reptiles", color: 0xf97316, yOff: 0.6 },
      ];
      const subTips: { pos: THREE.Vector3; label: string }[] = [];
      for (const sb of subBranches) {
        const sub = push(new THREE.Mesh(
          new THREE.CylinderGeometry(0.025, 0.025, 1.0, 6),
          new THREE.MeshPhongMaterial({ color: sb.color }),
        ));
        sub.position.set(-0.8 + Math.sin(sb.angle) * 0.5, 1.0 + sb.yOff, 0);
        sub.rotation.z = sb.angle;
        const tip = push(new THREE.Mesh(
          new THREE.SphereGeometry(0.15, 8, 6),
          new THREE.MeshPhongMaterial({ color: sb.color }),
        ));
        tip.position.set(-0.8 + Math.sin(sb.angle) * 1.0, 1.0 + sb.yOff + 0.5, 0);
        subTips.push({ pos: tip.position.clone(), label: sb.label });
      }

      // Main trunk continues to mammals
      const trunk2 = push(new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.04, 1.5, 6),
        new THREE.MeshPhongMaterial({ color: 0xa78bfa }),
      ));
      trunk2.position.set(-0.5, -0.5, 0);

      // Mammal sub-branches
      const mammalBranches = [
        { angle: -0.3, label: "Rodents", color: 0xfbbf24 },
        { angle: 0, label: "Primates", color: 0xef4444 },
        { angle: 0.3, label: "Carnivora", color: 0x22d3ee },
      ];
      const mammalTips: { pos: THREE.Vector3; label: string }[] = [];
      for (const mb of mammalBranches) {
        const sub = push(new THREE.Mesh(
          new THREE.CylinderGeometry(0.025, 0.025, 0.8, 6),
          new THREE.MeshPhongMaterial({ color: mb.color }),
        ));
        sub.position.set(0 + Math.sin(mb.angle) * 0.4, -1.2, 0);
        sub.rotation.z = mb.angle;
        const tip = push(new THREE.Mesh(
          new THREE.SphereGeometry(0.13, 8, 6),
          new THREE.MeshPhongMaterial({ color: mb.color }),
        ));
        tip.position.set(0 + Math.sin(mb.angle) * 0.7, -1.2 - 0.4, 0);
        mammalTips.push({ pos: tip.position.clone(), label: mb.label });
      }

      // Adaptation labels with arrows
      const adaptations = [
        { pos: new THREE.Vector3(-2, 2.8, 0), target: branch1Tip.position, text: "Simple body plan", color: 0x64748b },
        { pos: new THREE.Vector3(-3.5, 2.0, 2), target: new THREE.Vector3(-2, 2.0, 0), text: "Aquatic adaptation", color: 0x3b82f6 },
        { pos: new THREE.Vector3(1.5, 2.0, -2), target: new THREE.Vector3(-0.8, 1.6, 0), text: "Terrestrial adaptation", color: 0x22c55e },
        { pos: new THREE.Vector3(2.5, 0.5, 2), target: mammalTips[1].pos, text: "Endothermy, live birth", color: 0xef4444 },
        { pos: new THREE.Vector3(2, -1.5, -2), target: mammalTips[0].pos, text: "Hair, mammary glands", color: 0xfbbf24 },
      ];
      for (const ad of adaptations) {
        addLabel(meshes, ad.text, ad.color, ad.pos, ad.target);
      }

      // Key evolutionary milestones
      const milestones = [
        { text: "Origin of Life", y: -2.5, color: 0x92400e },
        { text: "Multicellularity", y: -1.8, color: 0x78350f },
        { text: "Vertebrates", y: -1.0, color: 0x3b82f6 },
        { text: "Amniotic Egg", y: -0.2, color: 0xf97316 },
        { text: "Mammals", y: 0.6, color: 0xa78bfa },
      ];
      for (const ms of milestones) {
        const dot = push(new THREE.Mesh(
          new THREE.SphereGeometry(0.06, 6, 4),
          new THREE.MeshPhongMaterial({ color: ms.color }),
        ));
        dot.position.set(-5.5, ms.y, 0);
        push(mkSprite(ms.text, `#${ms.color.toString(16).padStart(6, "0")}`, new THREE.Vector3(-6.5, ms.y, 0), 0.6));
      }

      push(mkSprite("Evolutionary Tree — Major Adaptations", "#fbbf24", new THREE.Vector3(0, 3.5, 0), 0.85));

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
    return <WebGLFallback title="Evolutionary Biology" description="3D phylogenetic tree with adaptation labels." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Evolution — Phylogenetic Tree</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate · Key adaptations labeled</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-purple-500/30 bg-purple-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-purple-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Common ancestry:</strong> All life shares a common ancestor; evolutionary tree shows divergence over time.</p>
            <p><strong className="text-foreground">Adaptation:</strong> Traits that increase survival and reproduction in a given environment — drive natural selection.</p>
            <p><strong className="text-foreground">Key transitions:</strong> Simple → multicellular → aquatic → terrestrial → amniotic egg → endothermy.</p>
            <p><strong className="text-foreground">Evidence:</strong> Fossil record, comparative anatomy, embryology, biochemistry, and biogeography.</p>
            <p><strong className="text-foreground">Natural selection:</strong> Darwin's mechanism — individuals with favorable variations survive and reproduce more.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
