"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallback } from "@/components/lab/webgl-fallback";
import * as THREE from "three";

/* ============================================================
   Gymnosperm (Pinus) — NEB Biology 11 (Floral Diversity)
   Shows cone, needle leaves, branching structure.
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

export function GymnospermVisual() {
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
      camera.position.set(0, 2, 13);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.autoRotate = false;
      controls.minDistance = 4;
      controls.maxDistance = 22;

      scene.add(new THREE.AmbientLight(0xffffff, 0.7));
      const dl = new THREE.DirectionalLight(0xffffff, 0.9);
      dl.position.set(4, 8, 5);
      scene.add(dl);

      const push = <T extends THREE.Object3D>(o: T): T => { scene.add(o); meshes.push(o); return o; };

      // Trunk
      const trunk = push(new THREE.Mesh(
        new THREE.CylinderGeometry(0.3, 0.5, 4, 8),
        new THREE.MeshPhongMaterial({ color: 0x5d3a1a }),
      ));
      trunk.position.set(0, -1, 0);

      // Crown (foliage layers)
      for (let i = 0; i < 4; i++) {
        const layerY = 1.5 + i * 1.0;
        const layerR = 2.0 - i * 0.35;
        const crown = push(new THREE.Mesh(
          new THREE.ConeGeometry(layerR, 1.2, 8),
          new THREE.MeshPhongMaterial({ color: 0x1a5c2a }),
        ));
        crown.position.set(0, layerY, 0);
      }

      // Needle leaves (clusters of 2)
      const needlePositions = [
        { pos: new THREE.Vector3(1.5, 2.5, 0.8), rot: [0.2, 0.5, 0.8] },
        { pos: new THREE.Vector3(-1.2, 3.0, -0.5), rot: [0.3, -0.4, -0.6] },
        { pos: new THREE.Vector3(0.8, 3.5, 1.2), rot: [-0.1, 0.8, 0.4] },
        { pos: new THREE.Vector3(-1.8, 2.0, 0.3), rot: [0.4, -0.6, -0.3] },
      ];
      for (const np of needlePositions) {
        const needleGroup = new THREE.Group();
        for (let j = 0; j < 2; j++) {
          const needle = new THREE.Mesh(
            new THREE.CylinderGeometry(0.02, 0.03, 1.0, 4),
            new THREE.MeshPhongMaterial({ color: 0x2d8a4e }),
          );
          needle.position.set(j * 0.05, 0.5, 0);
          needle.rotation.z = (j - 0.5) * 0.15;
          needleGroup.add(needle);
        }
        needleGroup.position.copy(np.pos);
        needleGroup.rotation.set(np.rot[0], np.rot[1], np.rot[2]);
        push(needleGroup);
      }

      // Male cone (staminate) — small, at branch tip
      const maleCone = push(new THREE.Mesh(
        new THREE.CylinderGeometry(0.1, 0.15, 0.5, 8),
        new THREE.MeshPhongMaterial({ color: 0xd97706 }),
      ));
      maleCone.position.set(1.8, 3.5, 0.5);
      maleCone.rotation.z = 0.3;

      // Female cone (pistillate) — large, woody
      const femaleCone = push(new THREE.Mesh(
        new THREE.ConeGeometry(0.6, 1.2, 8),
        new THREE.MeshPhongMaterial({ color: 0x92400e }),
      ));
      femaleCone.position.set(-0.5, 2.8, -0.8);

      // Cone scales
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        const scale = push(new THREE.Mesh(
          new THREE.BoxGeometry(0.25, 0.05, 0.15),
          new THREE.MeshPhongMaterial({ color: 0xb45309 }),
        ));
        scale.position.set(
          -0.5 + Math.cos(angle) * 0.4,
          2.5 + (i - 2.5) * 0.15,
          -0.8 + Math.sin(angle) * 0.4
        );
        scale.rotation.y = angle;
      }

      // Seeds (with wing)
      const seedPos = new THREE.Vector3(-0.3, 2.0, -0.6);
      const seed = push(new THREE.Mesh(
        new THREE.SphereGeometry(0.08, 8, 6),
        new THREE.MeshPhongMaterial({ color: 0x451a03 }),
      ));
      seed.position.copy(seedPos);
      const seedWing = push(new THREE.Mesh(
        new THREE.PlaneGeometry(0.3, 0.1),
        new THREE.MeshPhongMaterial({ color: 0x78350f, side: THREE.DoubleSide }),
      ));
      seedWing.position.set(-0.15, 2.0, -0.6);

      push(mkSprite("Gymnosperm — Pinus (Pine) Morphology", "#fbbf24", new THREE.Vector3(0, 4.8, 0), 0.85));

      addLabel(meshes, "Needle Leaves (in pairs)", 0x2d8a4e, new THREE.Vector3(3.5, 4, 2), needlePositions[0].pos);
      addLabel(meshes, "Female Cone (Ovuliferous)", 0x92400e, new THREE.Vector3(-3.5, 3, 2), femaleCone.position);
      addLabel(meshes, "Male Cone (Staminate)", 0xd97706, new THREE.Vector3(3, 4.5, -2), maleCone.position);
      addLabel(meshes, "Seed with Wing", 0x451a03, new THREE.Vector3(-3.5, 1.5, 2.5), seedPos);
      addLabel(meshes, "Trunk", 0x5d3a1a, new THREE.Vector3(3.5, -1, -2), trunk.position);
      addLabel(meshes, "Crown (Foliage)", 0x1a5c2a, new THREE.Vector3(3.5, 2, 0), new THREE.Vector3(0, 2.5, 0));

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
    return <WebGLFallback title="Gymnosperm (Pinus)" description="3D pine morphology diagram." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Gymnosperm — Pinus Morphology</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate · Pine anatomy</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-green-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Naked seeds:</strong> Seeds not enclosed in an ovary — borne on cone scales.</p>
            <p><strong className="text-foreground">Cones:</strong> Male cones (microsporangiate) produce pollen; female cones (megaspangiate) bear ovules.</p>
            <p><strong className="text-foreground">Needle leaves:</strong> Reduced leaf surface minimizes water loss; often in bundles (fascicles).</p>
            <p><strong className="text-foreground">Dominant phase:</strong> Sporophyte is the dominant, independent generation.</p>
            <p><strong className="text-foreground">Polyembryony:</strong> Multiple embryos may develop from one egg.</p>
            <p><strong className="text-foreground">Economic importance:</strong> Timber, paper, resin, turpentine, edible seeds (pine nuts).</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
