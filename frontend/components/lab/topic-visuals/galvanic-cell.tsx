"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CollapsibleControls } from "@/components/lab/collapsible-controls";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallback } from "@/components/lab/webgl-fallback";
import * as THREE from "three";

/* ============================================================
   Galvanic Cell — Daniel Cell with Electron Flow
   NEB Chemistry 12 — Electrochemistry
   ============================================================ */

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
  ctx.font = "bold 28px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = color;
  ctx.fillText(text, 256, 48);
  const tex = new THREE.CanvasTexture(canvas);
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false }));
  s.position.copy(pos);
  s.scale.set(3.4 * scale, 0.64 * scale, 1);
  return s;
}

export function GalvanicCellVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [voltage, setVoltage] = useState(1.10);
  const [isWebGL] = useState(() => isWebGLAvailable());


  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isWebGL) return;

    let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer;
    let controls: any, frameId: number;
    const meshes: THREE.Object3D[] = [];
    const electronMeshes: THREE.Group[] = [];

    const init = async () => {
      const { OrbitControls } = await import("three/addons/controls/OrbitControls.js");

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0f172a);
      camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
      camera.position.set(0, 2, 10);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.autoRotate = false;
      controls.minDistance = 4;
      controls.maxDistance = 25;

      scene.add(new THREE.AmbientLight(0xffffff, 0.7));
      const dir = new THREE.DirectionalLight(0xffffff, 1.0);
      dir.position.set(6, 10, 6);
      scene.add(dir);

      const push = <T extends THREE.Object3D>(o: T): T => { scene.add(o); meshes.push(o); return o; };

      const updateScene = (t: number) => {
        while (meshes.length > 10) {
          const m = meshes.pop()!;
          scene.remove(m);
          if (m instanceof THREE.Mesh) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
          else if (m instanceof THREE.Sprite) { (m.material as THREE.SpriteMaterial).map?.dispose?.(); m.material.dispose(); }
          else if (m instanceof THREE.Line) { m.geometry?.dispose(); (m.material as THREE.Material).dispose(); }
        }
        electronMeshes.forEach((g) => {
          scene.remove(g);
          g.traverse((c) => { if ((c as THREE.Mesh).geometry) (c as THREE.Mesh).geometry.dispose(); const mat = (c as THREE.Mesh).material; if (mat && !Array.isArray(mat)) mat.dispose(); });
        });
        electronMeshes.length = 0;

        // Left beaker: Zn electrode in ZnSO₄
        const leftX = -2.5;
        const beakerMat = new THREE.MeshPhysicalMaterial({ color: 0x94a3b8, transparent: true, opacity: 0.15, side: THREE.DoubleSide });
        const leftBeaker = push(new THREE.Mesh(new THREE.PlaneGeometry(2.5, 3.0), beakerMat));
        leftBeaker.position.set(leftX, 0, -0.8);
        const leftBeakerFront = push(new THREE.Mesh(new THREE.PlaneGeometry(2.5, 3.0), beakerMat.clone()));
        leftBeakerFront.position.set(leftX, 0, 0.8);

        // Left liquid
        const leftLiquid = push(new THREE.Mesh(
          new THREE.PlaneGeometry(2.3, 0.6),
          new THREE.MeshPhysicalMaterial({ color: 0x22c55e, transparent: true, opacity: 0.3 }),
        ));
        leftLiquid.rotation.x = -Math.PI / 2;
        leftLiquid.position.set(leftX, -1.0, 0);

        // Zn electrode
        const znElectrode = push(new THREE.Mesh(
          new THREE.CylinderGeometry(0.12, 0.12, 2.5, 12),
          new THREE.MeshPhongMaterial({ color: 0x6b7280, emissive: 0x374151, shininess: 70 }),
        ));
        znElectrode.position.set(leftX, 0, 0);

        // Right beaker: Cu electrode in CuSO₄
        const rightX = 2.5;
        const rightBeaker = push(new THREE.Mesh(new THREE.PlaneGeometry(2.5, 3.0), beakerMat.clone()));
        rightBeaker.position.set(rightX, 0, -0.8);
        const rightBeakerFront = push(new THREE.Mesh(new THREE.PlaneGeometry(2.5, 3.0), beakerMat.clone()));
        rightBeakerFront.position.set(rightX, 0, 0.8);

        const rightLiquid = push(new THREE.Mesh(
          new THREE.PlaneGeometry(2.3, 0.6),
          new THREE.MeshPhysicalMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.35 }),
        ));
        rightLiquid.rotation.x = -Math.PI / 2;
        rightLiquid.position.set(rightX, -1.0, 0);

        const cuElectrode = push(new THREE.Mesh(
          new THREE.CylinderGeometry(0.12, 0.12, 2.5, 12),
          new THREE.MeshPhongMaterial({ color: 0xb45309, emissive: 0x78350f, shininess: 70 }),
        ));
        cuElectrode.position.set(rightX, 0, 0);

        // Salt bridge
        const bridgeMat = new THREE.MeshPhysicalMaterial({ color: 0xfbbf24, transparent: true, opacity: 0.5 });
        const bridge = push(new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 1.5, 10), bridgeMat));
        bridge.rotation.z = Math.PI / 2;
        bridge.position.set(0, 1.3, 0);
        const bridge2 = push(new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.8, 10), bridgeMat.clone()));
        bridge2.position.set(leftX + 0.8, 1.0, 0);
        const bridge3 = push(new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.8, 10), bridgeMat.clone()));
        bridge3.position.set(rightX - 0.8, 1.0, 0);

        // Wire connecting electrodes
        const wireMat = new THREE.LineBasicMaterial({ color: 0x94a3b8 });
        push(new THREE.Line(new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(leftX, 1.3, 0), new THREE.Vector3(leftX, 2.0, 0),
          new THREE.Vector3(rightX, 2.0, 0), new THREE.Vector3(rightX, 1.3, 0),
        ]), wireMat));

        // Voltmeter
        const vm = push(new THREE.Mesh(
          new THREE.CylinderGeometry(0.4, 0.4, 0.15, 16),
          new THREE.MeshPhongMaterial({ color: 0x1e293b, emissive: 0x0f172a }),
        ));
        vm.position.set(0, 2.15, 0.5);
        push(mkSprite(`V = ${voltage.toFixed(2)} V`, "#fbbf24", new THREE.Vector3(0, 2.7, 0.5), 0.65));

        // LONG ARROW LABELS
        // Anode label
        const anodeLabel = new THREE.Vector3(leftX - 2.0, 2.0, 0);
        const anodeTarget = new THREE.Vector3(leftX, 0.8, 0);
        const aDir = anodeTarget.clone().sub(anodeLabel).normalize();
        const aLen = anodeLabel.distanceTo(anodeTarget);
        push(new THREE.ArrowHelper(aDir, anodeLabel, aLen * 0.8, 0xef4444, 0.28, 0.12));
        push(mkSprite("ANODE: Zn → Zn²⁺ + 2e⁻ (oxidation)", "#ef4444", anodeLabel.clone().sub(aDir.multiplyScalar(0.5)), 0.65));

        // Cathode label
        const cathLabel = new THREE.Vector3(rightX + 2.0, 2.0, 0);
        const cathTarget = new THREE.Vector3(rightX, 0.8, 0);
        const cDir = cathTarget.clone().sub(cathLabel).normalize();
        const cLen = cathLabel.distanceTo(cathTarget);
        push(new THREE.ArrowHelper(cDir, cathLabel, cLen * 0.8, 0x22c55e, 0.28, 0.12));
        push(mkSprite("CATHODE: Cu²⁺ + 2e⁻ → Cu (reduction)", "#22c55e", cathLabel.clone().sub(cDir.multiplyScalar(0.5)), 0.65));

        // Electron flow arrow
        const eFlowLabel = new THREE.Vector3(0, 2.8, 0);
        const eFlowTarget = new THREE.Vector3(leftX, 2.0, 0);
        const eDir = eFlowTarget.clone().sub(eFlowLabel).normalize();
        const eLen = eFlowLabel.distanceTo(eFlowTarget);
        push(new THREE.ArrowHelper(eDir, eFlowLabel, eLen * 0.7, 0xf97316, 0.25, 0.12));
        push(mkSprite("e⁻ flow: Zn → Cu (through wire)", "#f97316", eFlowLabel.clone().sub(eDir.multiplyScalar(0.5)), 0.65));

        // Ion flow in salt bridge
        const ionFlowLabel = new THREE.Vector3(0, -2.0, 0);
        const ionFlowTarget = new THREE.Vector3(0, 1.3, 0);
        const iDir = ionFlowTarget.clone().sub(ionFlowLabel).normalize();
        const iLen = ionFlowLabel.distanceTo(ionFlowTarget);
        push(new THREE.ArrowHelper(iDir, ionFlowLabel, iLen * 0.7, 0xa855f7, 0.25, 0.12));
        push(mkSprite("Salt bridge: K⁺ → cathode, NO₃⁻ → anode", "#a855f7", ionFlowLabel.clone().sub(iDir.multiplyScalar(0.5)), 0.6));

        // Animated electrons along wire
        const numElectrons = 8;
        for (let i = 0; i < numElectrons; i++) {
          const eg = new THREE.Group();
          const e = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 8), new THREE.MeshBasicMaterial({ color: 0xf97316 }));
          eg.add(e);
          const phase = (i / numElectrons) * Math.PI * 2;
          eg.position.set(
            leftX + (rightX - leftX) * ((phase + t * 2) % (Math.PI * 2)) / (Math.PI * 2),
            2.0 + Math.sin(phase + t * 2) * 0.1,
            0,
          );
          scene.add(eg);
          electronMeshes.push(eg);
        }
      };

      updateScene(0);

      const animate = () => {
        frameId = requestAnimationFrame(animate);
        controls.update();
        updateScene(Date.now() * 0.001);
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
        });
        electronMeshes.forEach((g) => {
          scene.remove(g);
          g.traverse((c) => { if ((c as THREE.Mesh).geometry) (c as THREE.Mesh).geometry.dispose(); const mat = (c as THREE.Mesh).material; if (mat && !Array.isArray(mat)) mat.dispose(); });
        });
        renderer.dispose();
        controls.dispose?.();
      };
    };

    const cleanup = init();
    return () => { cleanup.then((d) => d?.()); };
  }, [voltage, isWebGL]);

  if (!isWebGL) {
    return <WebGLFallback title="Galvanic Cell" description="Daniel cell visualization — requires WebGL." />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span>Galvanic Cell — Daniel Cell</span>
          <span className="text-xs text-muted-foreground font-normal">Electron flow & ion movement animation</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CollapsibleControls label="Cell Voltage">
          <div className="w-40 mt-1">
            <label className="text-xs text-muted-foreground">E°cell = {voltage.toFixed(2)} V</label>
            <input
              type="range" min={0.5} max={2.0} step={0.05} value={voltage}
              onChange={(e) => setVoltage(Number(e.target.value))}
              className="mt-2 w-full"
            />
          </div>
        </CollapsibleControls>

        <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden rounded-lg border border-border bg-slate-900" />

        <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-green-400">Daniel Cell</p>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Anode (oxidation):</strong> Zn(s) → Zn²⁺(aq) + 2e⁻  E° = +0.76 V</p>
            <p><strong className="text-foreground">Cathode (reduction):</strong> Cu²⁺(aq) + 2e⁻ → Cu(s)  E° = +0.34 V</p>
            <p><strong className="text-foreground">Cell reaction:</strong> Zn(s) + Cu²⁺(aq) → Zn²⁺(aq) + Cu(s)</p>
            <p><strong className="text-foreground">E°cell:</strong> E°cathode − E°anode = 0.34 − (−0.76) = 1.10 V</p>
            <p><strong className="text-foreground">Salt bridge:</strong> Completes circuit by allowing ion flow (K⁺ to cathode, NO₃⁻ to anode).</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
