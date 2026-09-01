"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallback } from "@/components/lab/webgl-fallback";
import * as THREE from "three";

/* ============================================================
   Five Kingdom Classification — NEB Biology 11
   Tree diagram showing Monera, Protista, Fungi, Plantae, Animalia.
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

export function FiveKingdomVisual() {
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
      camera.position.set(0, 1, 14);

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
      dl.position.set(3, 5, 5);
      scene.add(dl);

      const push = <T extends THREE.Object3D>(o: T): T => { scene.add(o); meshes.push(o); return o; };

      // Tree trunk (common ancestor)
      const trunk = push(new THREE.Mesh(
        new THREE.CylinderGeometry(0.15, 0.2, 2, 8),
        new THREE.MeshPhongMaterial({ color: 0x92400e }),
      ));
      trunk.position.set(0, -3.5, 0);
      addLabel(meshes, "Common Ancestor", 0x92400e, new THREE.Vector3(-3.5, -4.5, 0), trunk.position);

      // Branch levels
      const branchY = -1.5;
      // Main horizontal branch
      const mainBranch = push(new THREE.Mesh(
        new THREE.CylinderGeometry(0.08, 0.08, 7, 8),
        new THREE.MeshPhongMaterial({ color: 0x78350f }),
      ));
      mainBranch.rotation.z = Math.PI / 2;
      mainBranch.position.set(0, branchY, 0);

      // Kingdom branches (vertical)
      const kingdoms = [
        { name: "Monera", color: 0xef4444, x: -3, features: "Prokaryotic, unicellular", sub: "Bacteria, Cyanobacteria" },
        { name: "Protista", color: 0xf97316, x: -1.5, features: "Eukaryotic, unicellular", sub: "Amoeba, Paramecium" },
        { name: "Fungi", color: 0xfbbf24, x: 0, features: "Eukaryotic, heterotrophic", sub: "Mushrooms, Yeast, Mold" },
        { name: "Plantae", color: 0x22c55e, x: 1.5, features: "Eukaryotic, autotrophic", sub: "Bryophytes to Angiosperms" },
        { name: "Animalia", color: 0x3b82f6, x: 3, features: "Eukaryotic, motile heterotrophs", sub: "Invertebrates to Chordates" },
      ];

      const kingdomNodes: THREE.Vector3[] = [];

      for (const k of kingdoms) {
        // Vertical branch
        const branch = push(new THREE.Mesh(
          new THREE.CylinderGeometry(0.06, 0.06, 2.5, 8),
          new THREE.MeshPhongMaterial({ color: k.color }),
        ));
        branch.position.set(k.x, branchY + 1.25, 0);
        // Node sphere
        const node = push(new THREE.Mesh(
          new THREE.SphereGeometry(0.25, 12, 10),
          new THREE.MeshPhongMaterial({ color: k.color, shininess: 60 }),
        ));
        node.position.set(k.x, branchY + 2.5, 0);
        kingdomNodes.push(node.position.clone());
        // Sub-branches
        const sub1 = push(new THREE.Mesh(
          new THREE.CylinderGeometry(0.03, 0.03, 0.8, 6),
          new THREE.MeshPhongMaterial({ color: k.color, transparent: true, opacity: 0.7 }),
        ));
        sub1.position.set(k.x - 0.5, branchY + 2.9, 0);
        sub1.rotation.z = 0.4;
        const sub2 = push(new THREE.Mesh(
          new THREE.CylinderGeometry(0.03, 0.03, 0.8, 6),
          new THREE.MeshPhongMaterial({ color: k.color, transparent: true, opacity: 0.7 }),
        ));
        sub2.position.set(k.x + 0.5, branchY + 2.9, 0);
        sub2.rotation.z = -0.4;
      }

      // Labels for each kingdom
      const labelPositions = [
        new THREE.Vector3(-3, 3.5, 0),
        new THREE.Vector3(-1.5, 3.5, 0),
        new THREE.Vector3(0, 3.5, 0),
        new THREE.Vector3(1.5, 3.5, 0),
        new THREE.Vector3(3, 3.5, 0),
      ];
      kingdoms.forEach((k, i) => {
        push(mkSprite(k.name, `#${k.color.toString(16).padStart(6, "0")}`, labelPositions[i], 1.0));
        addLabel(meshes, k.features, k.color, labelPositions[i].clone().add(new THREE.Vector3(0, -1.2, 0)), kingdomNodes[i]);
        addLabel(meshes, k.sub, 0x94a3b8, labelPositions[i].clone().add(new THREE.Vector3(0, -2.0, 0)), kingdomNodes[i]);
      });

      // Connection lines from trunk to main branch
      const conn = push(new THREE.Mesh(
        new THREE.CylinderGeometry(0.06, 0.06, 2, 8),
        new THREE.MeshPhongMaterial({ color: 0x78350f }),
      ));
      conn.position.set(0, branchY - 1, 0);

      push(mkSprite("Five Kingdom Classification System (Whittaker, 1969)", "#fbbf24", new THREE.Vector3(0, 4.5, 0), 0.85));

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
    return <WebGLFallback title="Five Kingdom Classification" description="3D phylogenetic tree diagram." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Five Kingdom Classification</span>
          <span className="text-xs text-muted-foreground font-normal">Tree diagram — drag to rotate</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Monera:</strong> Prokaryotic organisms — bacteria and cyanobacteria (blue-green algae).</p>
            <p><strong className="text-foreground">Protista:</strong> Eukaryotic, mostly unicellular — amoeba, paramecium, algae.</p>
            <p><strong className="text-foreground">Fungi:</strong> Eukaryotic, heterotrophic absorbers — mushrooms, yeasts, molds.</p>
            <p><strong className="text-foreground">Plantae:</strong> Eukaryotic, autotrophic — bryophytes to angiosperms.</p>
            <p><strong className="text-foreground">Animalia:</strong> Eukaryotic, motile heterotrophs — invertebrates to chordates.</p>
            <p><strong className="text-foreground">Criteria:</strong> Cell structure, body organization, mode of nutrition, reproduction, phylogenetic relationships.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
