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

const nuclei = {
  "h1": { protons: 1, neutrons: 0, label: "¹H (Protium)", color: 0xef4444 },
  "he4": { protons: 2, neutrons: 2, label: "⁴He", color: 0x3b82f6 },
  "c12": { protons: 6, neutrons: 6, label: "¹²C", color: 0x22c55e },
  "u238": { protons: 92, neutrons: 146, label: "²³⁸U", color: 0xf97316 },
};

export function NuclearPhysicsVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isotope, setIsotope] = useState<"h1" | "he4" | "c12" | "u238">("u238");
  const [isWebGL] = useState(() => isWebGLAvailable());


  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isWebGL) return;

    let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer;
    let controls: any, frameId: number;
    const meshes: THREE.Object3D[] = [];
    let rotAngle = 0;

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
      controls.autoRotate = true;
      controls.autoRotateSpeed = 1.0;
      controls.minDistance = 3;
      controls.maxDistance = 20;

      scene.add(new THREE.AmbientLight(0xffffff, 0.7));
      const dir = new THREE.DirectionalLight(0xffffff, 1.0);
      dir.position.set(5, 10, 5);
      scene.add(dir);

      const push = <T extends THREE.Object3D>(o: T): T => { scene.add(o); meshes.push(o); return o; };

      const nucleus = nuclei[isotope];
      const totalParticles = nucleus.protons + nucleus.neutrons;
      const nProtons = nucleus.protons;
      const nNeutrons = nucleus.neutrons;

      // Nucleus cluster
      const nucleons: THREE.Mesh[] = [];
      const positions: THREE.Vector3[] = [];
      const rand = (seed: number) => {
        let x = Math.sin(seed) * 10000;
        return x - Math.floor(x);
      };
      for (let i = 0; i < Math.min(totalParticles, 30); i++) {
        const angle = i * 2.399963225 + rand(i * 7) * 0.5;
        const r = 0.5 + rand(i * 13) * 1.5;
        const z = (rand(i * 17) - 0.5) * 2;
        positions.push(new THREE.Vector3(r * Math.cos(angle), r * Math.sin(angle), z));
      }

      positions.forEach((pos, i) => {
        const isProton = i < nProtons;
        const nucleon = push(new THREE.Mesh(
          new THREE.SphereGeometry(0.25, 12, 12),
          new THREE.MeshBasicMaterial({ color: isProton ? 0xef4444 : 0x3b82f6 }),
        )) as THREE.Mesh;
        nucleon.position.copy(pos);
        nucleons.push(nucleon);
      });

      // Proton count label with long arrow
      const pLabelPos = new THREE.Vector3(3, 2.5, 0);
      const pTarget = new THREE.Vector3(0, 0, 0);
      const pDir = pTarget.clone().sub(pLabelPos).normalize();
      push(new LiveArrow(pDir, pLabelPos, pLabelPos.distanceTo(pTarget) * 0.9, 0xef4444, 0.2, 0.12));
      push(mkSprite(`Protons (Z) = ${nProtons}`, "#ef4444", pLabelPos.clone().sub(pDir.multiplyScalar(0.5)), 0.8));

      // Neutron count label with long arrow
      const nLabelPos = new THREE.Vector3(-3, 2.5, 0);
      const nTarget = new THREE.Vector3(0, 0, 0);
      const nDir = nTarget.clone().sub(nLabelPos).normalize();
      push(new LiveArrow(nDir, nLabelPos, nLabelPos.distanceTo(nTarget) * 0.9, 0x3b82f6, 0.2, 0.12));
      push(mkSprite(`Neutrons (N) = ${nNeutrons}`, "#3b82f6", nLabelPos.clone().sub(nDir.multiplyScalar(0.5)), 0.8));

      // Isotope label
      const isoLabelPos = new THREE.Vector3(0, -3, 0);
      const isoTarget = new THREE.Vector3(0, 0, 0);
      const isoDir = isoTarget.clone().sub(isoLabelPos).normalize();
      push(new LiveArrow(isoDir, isoLabelPos, isoLabelPos.distanceTo(isoTarget) * 0.9, 0xfbbf24, 0.15, 0.1));
      push(mkSprite(nucleus.label, "#fbbf24", isoLabelPos.clone().sub(isoDir.multiplyScalar(0.5)), 0.85));

      // Mass number label
      const ALabelPos = new THREE.Vector3(-3, -2.5, 0);
      const ATarget = new THREE.Vector3(0, 0, 0);
      const ADir = ATarget.clone().sub(ALabelPos).normalize();
      push(new LiveArrow(ADir, ALabelPos, ALabelPos.distanceTo(ATarget) * 0.9, 0xa78bfa, 0.15, 0.1));
      push(mkSprite(`Mass # (A) = ${totalParticles}`, "#a78bfa", ALabelPos.clone().sub(ADir.multiplyScalar(0.5)), 0.75));

      // Nuclear force range indicator
      const rfLabelPos = new THREE.Vector3(0, 3.5, 0);
      const rfTarget = new THREE.Vector3(0.8, 0.5, 0);
      const rfDir = rfTarget.clone().sub(rfLabelPos).normalize();
      push(new LiveArrow(rfDir, rfLabelPos, rfLabelPos.distanceTo(rfTarget) * 0.9, 0x34d399, 0.15, 0.1));
      push(mkSprite("Nuclear force (short range)", "#34d399", rfLabelPos.clone().sub(rfDir.multiplyScalar(0.5)), 0.7));

      const update = () => {
        while (meshes.length > 50) {
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
        rotAngle += 0.005;
        nucleons.forEach((n, i) => {
          const base = positions[i];
          n.position.set(
            base.x * Math.cos(rotAngle) - base.z * Math.sin(rotAngle),
            base.y,
            base.x * Math.sin(rotAngle) + base.z * Math.cos(rotAngle)
          );
        });
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
  }, [isotope, isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="Nuclear Physics" description="Nucleus with proton/neutron labels." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Nuclear Physics — Nucleus Structure</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate · Scroll to zoom</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Select Isotope">
          <div className="flex flex-wrap gap-2 mt-2">
            {(["h1", "he4", "c12", "u238"] as const).map((iso) => (
              <button
                key={iso}
                onClick={() => setIsotope(iso)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  isotope === iso ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {nuclei[iso].label}
              </button>
            ))}
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-orange-500/30 bg-orange-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-orange-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Nucleons:</strong> Protons (Z) + Neutrons (N) = Mass number (A).</p>
            <p><strong className="text-foreground">Nuclear force:</strong> Strong attractive force holding nucleons together (short range ~10⁻¹⁵ m).</p>
            <p><strong className="text-foreground">Binding energy:</strong> Energy needed to separate nucleus — E = Δm·c².</p>
            <p><strong className="text-foreground">Fission:</strong> Heavy nucleus splits → releases energy.</p>
            <p><strong className="text-foreground">Fusion:</strong> Light nuclei combine → releases more energy.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
