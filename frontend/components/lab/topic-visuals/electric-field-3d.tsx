"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallback } from "@/components/lab/webgl-fallback";
import * as THREE from "three";

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

export function ElectricFieldVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [chargeType, setChargeType] = useState<"positive" | "negative">("positive");
  const [chargeMag, setChargeMag] = useState(5);
  const [isWebGL] = useState(() => isWebGLAvailable());


  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isWebGL) return;

    let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer;
    let controls: any;
    let frameId: number;
    let animTime = 0;
    const meshes: THREE.Object3D[] = [];
    let fieldParticle: THREE.Mesh;

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
      controls.autoRotate = false;
      controls.minDistance = 3;
      controls.maxDistance = 20;

      scene.add(new THREE.AmbientLight(0xffffff, 0.7));
      const dir = new THREE.DirectionalLight(0xffffff, 1.0);
      dir.position.set(5, 10, 5);
      scene.add(dir);

      const push = <T extends THREE.Object3D>(o: T): T => { scene.add(o); meshes.push(o); return o; };

      const isPos = chargeType === "positive";
      const chargeColor = isPos ? 0xef4444 : 0x3b82f6;

      // Central charge
      const chargeMesh = push(new THREE.Mesh(
        new THREE.SphereGeometry(0.4, 24, 24),
        new THREE.MeshBasicMaterial({ color: chargeColor }),
      )) as THREE.Mesh;
      push(mkSprite(isPos ? "+q" : "−q", isPos ? "#ef4444" : "#3b82f6", new THREE.Vector3(0, 1.2, 0), 0.8));
      fieldParticle = push(new THREE.Mesh(
        new THREE.SphereGeometry(0.12, 12, 12),
        new THREE.MeshBasicMaterial({ color: 0x22d3ee }),
      )) as THREE.Mesh;
      fieldParticle.position.set(1, 1, 0);

      // Electric field lines (radial)
      const fieldLines: THREE.Line[] = [];
      const numLines = 12;
      for (let i = 0; i < numLines; i++) {
        const theta = (i / numLines) * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        const pts: THREE.Vector3[] = [];
        for (let r = 0.6; r <= 4; r += 0.1) {
          const x = r * Math.sin(phi) * Math.cos(theta);
          const y = r * Math.cos(phi);
          const z = r * Math.sin(phi) * Math.sin(theta);
          pts.push(new THREE.Vector3(x, y, z));
        }
        const line = push(new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(pts),
          new THREE.LineBasicMaterial({ color: 0xfbbf24, transparent: true, opacity: 0.6 }),
        )) as THREE.Line;
        fieldLines.push(line);
        meshes.push(line);
      }

      // Arrow heads on field lines (pointing outward for +q, inward for -q)
      fieldLines.forEach((line) => {
        const positions = (line.geometry as THREE.BufferGeometry).getAttribute("position");
        const midIdx = Math.floor(positions.count / 2);
        const midPt = new THREE.Vector3(positions.getX(midIdx), positions.getY(midIdx), positions.getZ(midIdx));
        const nextPt = new THREE.Vector3(positions.getX(midIdx + 1), positions.getY(midIdx + 1), positions.getZ(midIdx + 1));
        const dir = nextPt.clone().sub(midPt).normalize();
        if (!isPos) dir.negate();
        const arrowHead = push(new THREE.Mesh(
          new THREE.ConeGeometry(0.1, 0.3, 8),
          new THREE.MeshBasicMaterial({ color: 0xfbbf24 }),
        )) as THREE.Mesh;
        arrowHead.position.copy(midPt);
        arrowHead.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
        fieldLines.push(arrowHead as any);
        meshes.push(arrowHead);
      });

      // Long arrow labels
      const ELabelPos = new THREE.Vector3(4.5, 0, 0);
      const ETarget = new THREE.Vector3(2, 0, 0);
      const EDir = ETarget.clone().sub(ELabelPos).normalize();
      push(new THREE.ArrowHelper(EDir, ELabelPos, ELabelPos.distanceTo(ETarget) * 0.9, 0x22d3ee, 0.15, 0.1));
      push(mkSprite("E (field direction)", "#22d3ee", ELabelPos.clone().sub(EDir.multiplyScalar(0.5)), 0.8));

      const RLabelPos = new THREE.Vector3(-4.5, 0, 0);
      const RTarget = new THREE.Vector3(-2, 0, 0);
      const RDir = RTarget.clone().sub(RLabelPos).normalize();
      push(new THREE.ArrowHelper(RDir, RLabelPos, RLabelPos.distanceTo(RTarget) * 0.9, 0xa78bfa, 0.15, 0.1));
      push(mkSprite("r (distance from charge)", "#a78bfa", RLabelPos.clone().sub(RDir.multiplyScalar(0.5)), 0.75));

      const QLabelPos = new THREE.Vector3(0, -3.5, 0);
      const QTarget = new THREE.Vector3(0, 0, 0);
      const QDir = QTarget.clone().sub(QLabelPos).normalize();
      push(new THREE.ArrowHelper(QDir, QLabelPos, QLabelPos.distanceTo(QTarget) * 0.9, 0x34d399, 0.15, 0.1));
      push(mkSprite(`q = ${chargeMag} μC`, "#34d399", QLabelPos.clone().sub(QDir.multiplyScalar(0.5)), 0.8));

      // Equipotential sphere (dashed)
      const equipotPts: THREE.Vector3[] = [];
      for (let i = 0; i < 64; i++) {
        const a = (i / 64) * 2 * Math.PI;
        equipotPts.push(new THREE.Vector3(2.5 * Math.cos(a), 2.5 * Math.sin(a), 0));
      }
      push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(equipotPts), new THREE.LineDashedMaterial({ color: 0x64748b, dashSize: 0.2, gapSize: 0.15 })));
      (meshes[meshes.length - 1] as any).computeLineDistances();
      push(mkSprite("Equipotential surface", "#64748b", new THREE.Vector3(3.2, 0.5, 0), 0.65));

      const update = () => {
        while (meshes.length > 80) {
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
        animTime += 0.02;
        if (fieldParticle) {
          const angle = animTime * 2;
          const r = 1.5 + Math.sin(animTime) * 0.5;
          fieldParticle.position.set(r * Math.cos(angle), r * Math.sin(angle), 0);
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
  }, [chargeType, chargeMag, isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="Electric Field" description="Point charge with radial electric field arrows." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Electric Field — Point Charge</span>
          <span className="text-xs text-muted-foreground font-normal">Drag to rotate · Scroll to zoom</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Charge Properties">
          <div className="flex flex-wrap gap-4 mt-2">
            <div className="flex gap-2">
              <button
                onClick={() => setChargeType("positive")}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  chargeType === "positive" ? "bg-red-500 text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                Positive (+q)
              </button>
              <button
                onClick={() => setChargeType("negative")}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  chargeType === "negative" ? "bg-blue-500 text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                Negative (−q)
              </button>
            </div>
            <div className="w-24">
              <Label className="text-xs text-muted-foreground">Charge q (μC):</Label>
              <Input type="range" min={1} max={10} step={0.5} value={chargeMag} onChange={(e) => setChargeMag(Number(e.target.value))} className="mt-1 w-full" />
              <p className="text-xs font-mono text-primary mt-1">{chargeMag} μC</p>
            </div>
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-yellow-400">Key Concepts</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Coulomb's Law:</strong> E = kq/r² — field intensity decreases with distance squared.</p>
            <p><strong className="text-foreground">Field direction:</strong> Away from positive charges, toward negative charges.</p>
            <p><strong className="text-foreground">Field lines:</strong> Never cross; density represents field strength.</p>
            <p><strong className="text-foreground">Equipotential:</strong> Surface where potential is constant — perpendicular to field lines.</p>
            <p><strong className="text-foreground">Superposition:</strong> Net field = vector sum of individual fields.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
