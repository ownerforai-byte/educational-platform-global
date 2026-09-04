"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallback } from "@/components/lab/webgl-fallback";
import * as THREE from "three";
import { LiveArrow } from "@/components/lab/animated-arrow-helper";

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

export function NuclearFissionVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isWebGL] = useState(() => isWebGLAvailable());
  const [fissioned, setFissioned] = useState(false);


  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isWebGL) return;

    let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer;
    let controls: any, frameId: number;
    const meshes: THREE.Object3D[] = [];
    let neutrinos: THREE.Mesh[] = [];
    let fragments: { mesh: THREE.Mesh; vel: THREE.Vector3 }[] = [];

    const init = async () => {
      const { OrbitControls } = await import("three/addons/controls/OrbitControls.js");

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0f172a);
      camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
      camera.position.set(0, 0, 12);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.autoRotate = false;
      controls.minDistance = 3;
      controls.maxDistance = 25;

      scene.add(new THREE.AmbientLight(0xffffff, 0.7));
      const dir = new THREE.DirectionalLight(0xffffff, 1.0);
      dir.position.set(5, 10, 5);
      scene.add(dir);

      const push = <T extends THREE.Object3D>(o: T): T => { scene.add(o); meshes.push(o); return o; };

      // Uranium nucleus (before fission)
      const uNucleus = push(new THREE.Group()) as THREE.Group;
      for (let i = 0; i < 20; i++) {
        const isProton = i < 92;
        const nucleon = push(new THREE.Mesh(
          new THREE.SphereGeometry(0.15, 8, 8),
          new THREE.MeshBasicMaterial({ color: isProton ? 0xef4444 : 0x3b82f6 }),
        ));
        const angle = Math.random() * Math.PI * 2;
        const r = Math.random() * 0.8;
        const z = (Math.random() - 0.5) * 1.2;
        nucleon.position.set(r * Math.cos(angle), r * Math.sin(angle), z);
        uNucleus.add(nucleon);
      }
      uNucleus.position.set(0, 0, 0);
      meshes.push(uNucleus);

      // Neutron incoming
      const neutron = push(new THREE.Mesh(
        new THREE.SphereGeometry(0.12, 8, 8),
        new THREE.MeshBasicMaterial({ color: 0x94a3b8 }),
      )) as THREE.Mesh;
      neutron.position.set(-5, 0, 0);

      // Labels with long arrows
      const nLabelPos = new THREE.Vector3(-5, 1.5, 0);
      const nTarget = new THREE.Vector3(-5, 0, 0);
      const nDir = nTarget.clone().sub(nLabelPos).normalize();
      push(new LiveArrow(nDir, nLabelPos, nLabelPos.distanceTo(nTarget) * 0.9, 0x94a3b8, 0.15, 0.1));
      push(mkSprite("n (neutron)", "#94a3b8", nLabelPos.clone().sub(nDir.multiplyScalar(0.5)), 0.75));

      const uLabelPos = new THREE.Vector3(0, 2.5, 0);
      const uTarget = new THREE.Vector3(0, 0, 0);
      const uDir = uTarget.clone().sub(uLabelPos).normalize();
      push(new LiveArrow(uDir, uLabelPos, uLabelPos.distanceTo(uTarget) * 0.9, 0xf97316, 0.2, 0.12));
      push(mkSprite("²³⁸U (uranium nucleus)", "#f97316", uLabelPos.clone().sub(uDir.multiplyScalar(0.5)), 0.8));

      // Energy release label
      const energyLabelPos = new THREE.Vector3(3, 3, 0);
      const energyTarget = new THREE.Vector3(0, 0, 0);
      const energyDir = energyTarget.clone().sub(energyLabelPos).normalize();
      push(new LiveArrow(energyDir, energyLabelPos, energyLabelPos.distanceTo(energyTarget) * 0.9, 0xef4444, 0.15, 0.1));
      push(mkSprite("Energy released ≈ 200 MeV", "#ef4444", energyLabelPos.clone().sub(energyDir.multiplyScalar(0.5)), 0.75));

      const update = () => {
        while (meshes.length > 60) {
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
        if (!fissioned) {
          neutron.position.x += 0.05;
          if (neutron.position.x >= -0.5) {
            setFissioned(true);
            // Create fission fragments
            const frag1 = push(new THREE.Group()) as THREE.Group;
            for (let i = 0; i < 10; i++) {
              const p = push(new THREE.Mesh(
                new THREE.SphereGeometry(0.12, 8, 8),
                new THREE.MeshBasicMaterial({ color: 0xef4444 }),
              ));
              p.position.set(Math.random() * 0.4 - 0.2, Math.random() * 0.4 - 0.2, Math.random() * 0.4 - 0.2);
              frag1.add(p);
            }
            const frag2 = push(new THREE.Group()) as THREE.Group;
            for (let i = 0; i < 8; i++) {
              const p = push(new THREE.Mesh(
                new THREE.SphereGeometry(0.12, 8, 8),
                new THREE.MeshBasicMaterial({ color: 0x3b82f6 }),
              ));
              p.position.set(Math.random() * 0.4 - 0.2, Math.random() * 0.4 - 0.2, Math.random() * 0.4 - 0.2);
              frag2.add(p);
            }
            fragments = [
              { mesh: frag1 as any, vel: new THREE.Vector3(0.08, 0.03, 0.02) },
              { mesh: frag2 as any, vel: new THREE.Vector3(-0.06, -0.02, -0.01) },
            ];
            meshes.push(frag1, frag2);
            // Neutrons
            for (let i = 0; i < 3; i++) {
              const nv = push(new THREE.Mesh(
                new THREE.SphereGeometry(0.08, 8, 8),
                new THREE.MeshBasicMaterial({ color: 0x94a3b8 }),
              )) as THREE.Mesh;
              nv.position.copy(neutron.position);
              nv.userData.vel = new THREE.Vector3(
                (Math.random() - 0.5) * 0.1,
                (Math.random() - 0.5) * 0.1,
                (Math.random() - 0.5) * 0.1
              );
              neutrinos.push(nv);
              meshes.push(nv);
            }
          }
        } else {
          fragments.forEach((f) => {
            f.mesh.position.add(f.vel);
          });
          neutrinos.forEach((nv) => {
            nv.position.add(nv.userData.vel);
          });
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
  }, [fissioned, isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="Nuclear Fission" description="Uranium nucleus splitting with chain reaction animation." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Nuclear Fission — Chain Reaction</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate · Scroll to zoom</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <button
            onClick={() => { setFissioned(false); window.location.reload(); }}
            className="px-3 py-1.5 rounded-md text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Reset
          </button>
        </div>

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-orange-500/30 bg-orange-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-orange-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Fission:</strong> Heavy nucleus (U-235) splits into lighter nuclei when struck by neutron.</p>
            <p><strong className="text-foreground">Energy release:</strong> ~200 MeV per fission — from mass defect via E = Δmc².</p>
            <p><strong className="text-foreground">Chain reaction:</strong> Released neutrons trigger more fissions → exponential energy release.</p>
            <p><strong className="text-foreground">Critical mass:</strong> Minimum mass needed to sustain chain reaction.</p>
            <p><strong className="text-foreground">Fusion:</strong> Light nuclei combine → even more energy per unit mass (stars, H-bomb).</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
