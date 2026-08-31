"use client";

/**
 * 3D Linear Expansion Apparatus — Determination of the coefficient of
 * linear expansion (α) with fully labelled components and theory panels.
 *
 * Physics:  ΔL = α · L₀ · ΔT      →     α = ΔL / (L₀ · ΔT)
 */

import { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { isWebGLAvailable } from "@/lib/webgl";
import { TheoryPanel } from "@/components/lab/theory-panel";
import { createLeaderLayer } from "./leader-lines";
import { disposeThreeScene, type ThreeScene } from "@/components/lab/three-scene";

/* ---------------- Data ---------------- */

const METALS = [
  { name: "Aluminium", alpha: 23, color: "#c084fc", scene: 0xbfdbfe, note: "α = 23 × 10⁻⁶ K⁻¹ — expands most among common lab metals." },
  { name: "Brass", alpha: 19, color: "#a3e635", scene: 0xbfd35b, note: "α = 19 × 10⁻⁶ K⁻¹ — classic rail-pair material for gaps." },
  { name: "Copper", alpha: 17, color: "#fbbf24", scene: 0xd97706, note: "α = 17 × 10⁻⁶ K⁻¹ — used in thermostats & compensating pendulums." },
  { name: "Iron (steel)", alpha: 12, color: "#f97316", scene: 0x9ca3af, note: "α = 12 × 10⁻⁶ K⁻¹ — railway rails and bridges are designed with this." },
  { name: "Glass", alpha: 9, color: "#38bdf8", scene: 0x93c5fd, note: "α = 9 × 10⁻⁶ K⁻¹ — cracks under thermal shock due to uneven expansion." },
  { name: "Pyrex", alpha: 3.2, color: "#67e8f9", scene: 0x22d3ee, note: "α = 3.2 × 10⁻⁶ K⁻¹ — oven-safe because it barely expands." },
] as const;

const MICROMETER_BASE = 12.4; // mm baseline reading at T₁

export const LinearExpansionExperiment: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const storeRef = useRef<any>(null);
  const [webGL] = useState(() => typeof window !== "undefined" && isWebGLAvailable());
  const [matIdx, setMatIdx] = useState(2);
  const [rodLengthCm, setRodLengthCm] = useState(80); // cm between clamp A and screw B
  const [T1, setT1] = useState(20); // °C initial
  const [T2, setT2] = useState(96); // °C steam
  const [unitCm, setUnitCm] = useState(true);

  const mat = METALS[matIdx];
  const dT = T2 - T1;
  const rodLengthM = rodLengthCm / 100;
  const deltaLm = (mat.alpha * 1e-6) * rodLengthM * dT; // m
  const deltaLmm = deltaLm * 1000;
  const microBefore = MICROMETER_BASE;
  const microAfter = MICROMETER_BASE + deltaLmm;
        const errIfMisread = (1e-5 / (rodLengthM * dT)) * 1e6; // Δα (in 10⁻⁶ K⁻¹) caused by a ±0.01 mm gauge miss-read

  useEffect(() => {
    const container = mountRef.current!;
    if (!container || !webGL) return;

    let ts: ThreeScene | null = null;
    let unbind: (() => void) | null = null;
    let labelRenderer: any = null;
    let leaderLayer: any = null;
    let cancelled = false;

    async function init() {
      try {
        const mod = await import("@/components/lab/three-scene");
        const { createThreeScene, bindResize, standardMaterial, titleText } = mod;
        if (!container || cancelled) return;

        ts = createThreeScene(container, {
          cameraPosition: new THREE.Vector3(0.5, 4.4, 13.8),
          autoRotate: false,
          background: 0x0b1220,
        });
        if (!ts) return;
        unbind = bindResize(ts);
        titleText(ts, "Linear Expansion Apparatus", new THREE.Vector3(0, 3.4, 0));

        /* ---- bench & fixed clamp A ---- */
        const bench = new THREE.Mesh(new THREE.BoxGeometry(12.4, 0.18, 3.0), standardMaterial(0x7c4a21, { roughness: 0.85 }));
        bench.position.y = -0.1;
        ts.group.add(bench);
        const pillar = new THREE.Mesh(new THREE.BoxGeometry(0.7, 1.9, 1.0), standardMaterial(0x57534e, { metalness: 0.4 }));
        pillar.position.set(-4.9, 0.95, 0);
        ts.group.add(pillar);

        /* ---- rod geometry ---- */
        const rodLenU = 2.6 + ((rodLengthCm - 40) / 80) * 3.4; // 40→120 cm maps to 2.6→6.0 units
        const rodEnd0 = -4.5;
        const rodCenterX = rodEnd0 + rodLenU / 2;
        const rodY = 1.05;
        const rodMat = standardMaterial(mat.scene as number, { metalness: 0.7, roughness: 0.35, emissive: 0xff6b00, emissiveIntensity: 0 });
        const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, rodLenU, 18), rodMat);
        rod.rotation.z = Math.PI / 2;
        rod.position.set(rodCenterX, rodY, 0);
        ts.group.add(rod);
        const freeEndX = rodEnd0 + rodLenU;

        /* ---- steam jacket around middle of rod ---- */
        const jLen = Math.min(rodLenU - 1.6, 5.2);
        const jX = rodCenterX;
        const jacketMat = standardMaterial(0x67e8f9, { transparent: true, opacity: 0.18 });
        jacketMat.side = THREE.DoubleSide;
        const jacket = new THREE.Mesh(new THREE.CylinderGeometry(0.52, 0.52, jLen, 30, 1, true), jacketMat);
        jacket.rotation.z = Math.PI / 2;
        jacket.position.set(jX, rodY, 0);
        ts.group.add(jacket);
        const wrap = new THREE.Mesh(new THREE.CylinderGeometry(0.58, 0.58, jLen * 0.96, 18, 4, true), standardMaterial(0x334155, { wireframe: true, transparent: true, opacity: 0.4 }));
        wrap.rotation.z = Math.PI / 2;
        wrap.position.copy(jacket.position);
        ts.group.add(wrap);
        const inletPos = new THREE.Vector3(jX - jLen / 2 - 0.4, rodY - 0.25, 0);
        const inletP = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.85, 10), standardMaterial(0x38bdf8));
        inletP.rotation.z = Math.PI / 2;
        inletP.position.copy(inletPos);
        ts.group.add(inletP);
        const outP = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.7, 10), standardMaterial(0xcbd5e1));
        outP.rotation.x = Math.PI / 2.6;
        outP.position.set(jX + jLen / 2 - 0.2, rodY + 0.38, 0.38);
        ts.group.add(outP);

        /* ---- kettle steam generator + flame ---- */
        const kettleG = new THREE.Group();
        const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.7, 1.0, 24), standardMaterial(0xd6d3d1, { metalness: 0.6 }));
        pot.position.y = 0.5;
        kettleG.add(pot);
        const dome = new THREE.Mesh(new THREE.SphereGeometry(0.62, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2), standardMaterial(0xd6d3d1, { metalness: 0.6 }));
        dome.position.y = 1.0;
        kettleG.add(dome);
        const nozzle = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 0.55, 10), standardMaterial(0xa8a29e, { metalness: 0.7 }));
        nozzle.position.set(0.58, 1.05, 0);
        nozzle.rotation.z = -Math.PI / 3.6;
        kettleG.add(nozzle);
        kettleG.position.set(-6.3, 0.28, 0.4);
        ts.group.add(kettleG);
        const flameMat = standardMaterial(0xf97316, { emissive: 0xf59e0b, emissiveIntensity: 1.4, transparent: true, opacity: 0.85 });
        const flame = new THREE.Mesh(new THREE.ConeGeometry(0.34, 0.85, 14), flameMat);
        flame.position.set(kettleG.position.x, -0.32, kettleG.position.z);
        flame.rotation.x = Math.PI;
        ts.group.add(flame);

        /* ---- micrometer screw gauge station B ---- */
        const gaugeX0 = freeEndX + 0.08;
        const gaugeGrp = new THREE.Group();
        const anvil = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.26, 0.14, 20), standardMaterial(0x94a3b8, { metalness: 0.85 }));
        anvil.rotation.z = Math.PI / 2;
        anvil.position.x = 0.07;
        gaugeGrp.add(anvil);
        const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.19, 1.05, 20), standardMaterial(0x475569, { metalness: 0.7 }));
        barrel.rotation.z = Math.PI / 2;
        barrel.position.x = 0.66;
        gaugeGrp.add(barrel);
        const thimble = new THREE.Mesh(new THREE.CylinderGeometry(0.23, 0.23, 0.55, 20), standardMaterial(0x157f43, { metalness: 0.6 }));
        thimble.rotation.z = Math.PI / 2;
        thimble.position.x = 1.42;
        gaugeGrp.add(thimble);
        const dialFace = new THREE.Mesh(new THREE.CircleGeometry(0.5, 28), standardMaterial(0xf8fafc, { emissive: 0xf8fafc, emissiveIntensity: 0.12 }));
        dialFace.position.set(0.66, 0.68, 0);
        dialFace.rotation.y = -Math.PI / 2;
        gaugeGrp.add(dialFace);
        const needle = new THREE.Group();
        const nShaft = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.035, 0.03), standardMaterial(0xef4444, { emissive: 0xef4444, emissiveIntensity: 0.85 }));
        nShaft.position.x = 0.24;
        needle.add(nShaft);
        needle.position.set(0.63, 0.69, 0.02);
        gaugeGrp.add(needle);
        const gaugeStand = new THREE.Mesh(new THREE.BoxGeometry(0.5, 1.9, 0.5), standardMaterial(0x3f3f46));
        gaugeStand.position.set(1.05, -0.72, 0);
        gaugeGrp.add(gaugeStand);
        gaugeGrp.position.set(gaugeX0, rodY, 0);
        ts.group.add(gaugeGrp);

        /* ---- L₀ dimension bracket between clamp face and free end ---- */
        const dimY = rodY + 1.0;
        const lMat = new THREE.LineBasicMaterial({ color: 0xc084fc });
        const mkTickLine = (base: THREE.Vector3, h: number) => new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([
            base.clone().add(new THREE.Vector3(0, -h, 0)),
            base.clone().add(new THREE.Vector3(0, h, 0)),
          ]), lMat);
        ts.group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(rodEnd0, dimY, 0),
          new THREE.Vector3(freeEndX, dimY, 0),
        ]), lMat));
        [rodEnd0, freeEndX].forEach((px) => ts!.group.add(mkTickLine(new THREE.Vector3(px, dimY, 0), 0.17)));

        /* ---- thermometer T inside jacket top ---- */
        const tStem = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.075, 1.9, 10), standardMaterial(0xf8fafc));
        tStem.position.set(jX + 0.6, rodY + 1.15, 0);
        ts.group.add(tStem);
        const tMerc = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 1.45, 8), standardMaterial(0xef4444, { emissive: 0xef4444, emissiveIntensity: 0.9 }));
        tMerc.position.set(jX + 0.6, rodY + 0.65, 0);
        ts.group.add(tMerc);

        /* ---- steam puffs at jacket outlet ---- */
        const puffHome = new THREE.Vector3(outP.position.x + 0.26, outP.position.y + 0.34, outP.position.z + 0.24);
        const puffs: Array<{ mesh: THREE.Mesh; seed: number }> = [];
        for (let i = 0; i < 6; i++) {
          const pm = new THREE.Mesh(new THREE.SphereGeometry(0.12, 10, 10), standardMaterial(0xe2e8f0, { transparent: true, opacity: 0.5 }));
          puffs.push({ mesh: pm, seed: Math.random() });
          ts.group.add(pm);
        }

        storeRef.current = { rodCenterX, rodLenU, freeEndX, rodMat, needle, thimble, tMerc, flame, flameMat, puffs, puffHome, deltaLmm };

        /* ---------- LABELS ---------- */
        try {
          const { CSS2DRenderer, CSS2DObject } = await import("three/addons/renderers/CSS2DRenderer.js");
          labelRenderer = new CSS2DRenderer();
          labelRenderer.setSize(container.clientWidth, container.clientHeight);
          labelRenderer.domElement.style.position = "absolute";
          labelRenderer.domElement.style.top = "0";
          labelRenderer.domElement.style.pointerEvents = "none";
          labelRenderer.domElement.style.zIndex = "10";
          container.appendChild(labelRenderer.domElement);

          const mkLabel = (color: string, title: string, sub?: string) => {
            const el = document.createElement("div");
            el.className = "label";
            el.innerHTML =
              `<div style="background:rgba(0,0,0,0.82);padding:4px 8px;border-radius:4px;border:1px solid ${color};white-space:nowrap">` +
              `<span style="color:${color};font-weight:600;font-size:11px">${title}</span>` +
              (sub ? `<br><span style="color:#cbd5e1;font-size:10px">${sub}</span>` : "") +
              `</div>`;
            return el;
          };
          const connections: Array<{ label: THREE.Object3D; target: THREE.Vector3; color: string }> = [];
          try { leaderLayer = createLeaderLayer(container); } catch { leaderLayer = null; }
          const addLbl = (color: string, title: string, pos: [number, number, number], sub?: string, target?: [number, number, number]) => {
            const o = new CSS2DObject(mkLabel(color, title, sub));
            o.position.set(pos[0], pos[1], pos[2]);
            ts!.group.add(o);
            if (target) {
              connections.push({
                label: o,
                target: new THREE.Vector3(target[0], target[1], target[2]),
                color,
              });
            }
          };

          addLbl("#f87171", "Fixed Clamp A", [-4.9, 3.1, 0], "rod anchored here — no movement", [-4.9, 1.6, 0]);
          addLbl("#38bdf8", "Steam Jacket", [jX, 3.5, 0], "steam condenses on rod ≈ 100 °C", [jX, rodY, 0]);
          addLbl(mat.color, `Test Rod — ${mat.name}`, [jX + jLen / 2 + 1.05, rodY - 1.6, 0], `α known = ${mat.alpha} ×10⁻⁶ K⁻¹`, [(rodEnd0 + freeEndX) / 2, rodY, 0]);
          addLbl("#fb923c", "Steam Generator", [kettleG.position.x, 2.9, 0.9], "kettle boils water for steam", [kettleG.position.x, 1.0, 0.4]);
          addLbl("#ef4444", "Thermometer T", [jX + 0.62, rodY + 3.2, 0], `T₁ ${T1} °C → T₂ ${T2} °C`, [jX + 0.62, rodY + 1.2, 0]);
          addLbl("#22c55e", "Micrometer Screw B", [gaugeX0 + 2.0, rodY + 1.45, 0], "measures expansion ΔL", [gaugeX0, rodY, 0]);
          const lblL0 = titleText(ts!, `L₀ = ${rodLengthCm} cm`, new THREE.Vector3((rodEnd0 + freeEndX) / 2, dimY + 0.45, 0));
          if (lblL0) lblL0.scale.set(3.4, 0.74, 1);

          /* ---------- ANIMATION LOOP ---------- */
          const s = storeRef.current;
          const smooth = (x: number) => x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x);
          function animate() {
            if (cancelled || !ts) return;
            requestAnimationFrame(animate);
            const t = performance.now() / 1000;
            const P = 9;
            const p = (t % P) / P;
            const q = p < 0.45 ? smooth(p / 0.45) : p < 0.82 ? 1 : 1 - smooth((p - 0.82) / 0.18);

            const exg = Math.max(0.03, Math.min(2.4, deltaLmm * 0.55)) * q;
            const newLen = rodLenU + exg;
            rod.scale.y = newLen / rodLenU;
            rod.position.x = rodEnd0 + newLen / 2;
            gaugeGrp.position.x = (rodEnd0 + newLen) + 0.08;

            s.needle.rotation.z = -q * Math.min(4.2, 0.5 + deltaLmm);
            s.thimble.rotation.y += q * 0.06;

            s.tMerc.scale.y = 0.22 + q * 0.78;
            s.rodMat.emissiveIntensity = q * 0.85;

            s.flame.scale.setScalar(0.88 + 0.16 * Math.sin(t * 17));
            s.flameMat.emissiveIntensity = 1.15 + 0.3 * Math.abs(Math.sin(t * 21));

            s.puffs.forEach((pf: any) => {
              const u = (t * 0.5 + pf.seed) % 1;
              pf.mesh.position.set(
                s.puffHome.x + Math.sin((u + pf.seed) * 5.5) * 0.22,
                s.puffHome.y + u * 1.6,
                s.puffHome.z + Math.cos((u + pf.seed) * 5.5) * 0.16
              );
              pf.mesh.scale.setScalar(Math.max(0.05, 1 - u * 0.85));
              (pf.mesh.material as THREE.MeshStandardMaterial).opacity = Math.max(0, 0.5 * (1 - u));
              pf.mesh.visible = q > 0.12;
            });

            ts.controls.update();
            ts.renderer.render(ts.scene, ts.camera);
            if (labelRenderer) labelRenderer.render(ts.scene, ts.camera);
            if (leaderLayer) leaderLayer.draw(ts.camera, connections);
          }
          animate();
        } catch { console.log("CSS2DRenderer not available"); }
      } catch (err) {
        console.error("LinearExpansion init:", err);
      }
    }
    init();

    return () => {
      cancelled = true;
      unbind?.();
      if (ts) try { disposeThreeScene(ts); } catch {}
      const m = container;
      if (labelRenderer?.domElement && m && labelRenderer.domElement.parentNode === m) {
        m.removeChild(labelRenderer.domElement);
      }
      try { leaderLayer?.dispose?.(); } catch {}
      if (m) m.querySelectorAll(".label").forEach((e) => e.remove());
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webGL, matIdx, rodLengthCm, T1, T2, unitCm]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>📏 Linear Expansion Apparatus — Determination of Coefficient α</CardTitle>
        <CardDescription>
          One end of a long rod is fixed at clamp A; the other presses a micrometer screw gauge B. Passing steam through the jacket raises the rod from T₁ to T₂ and its growth ΔL is read directly — yielding α = ΔL / (L₀·ΔT).
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">

        {/* ---------- labeled 3D scene area ---------- */}
        <div className="relative w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px] rounded-lg border border-primary/30 overflow-hidden bg-slate-950" aria-label="3D linear expansion apparatus with labelled components">
          <div ref={mountRef} className="absolute inset-0" />
          {!webGL && (
            <div className="absolute inset-0 flex items-center justify-center p-6 text-center text-sm text-muted-foreground">
              WebGL is unavailable in this browser — the labelled 3D apparatus cannot be rendered.
            </div>
          )}
          <span className="absolute bottom-2 left-2 text-[10px] text-slate-400 bg-black/40 rounded px-2 py-1 pointer-events-none">watch the needle of screw gauge B while steam heats the rod (expansion exaggerated)</span>
        </div>

        {/* ---------- controls ---------- */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <Label>Rod material</Label>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {METALS.map((mm, i) => (
                <Button key={mm.name} size="sm" variant={i === matIdx ? "default" : "outline"} onClick={() => setMatIdx(i)}>{mm.name}</Button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-1.5">{mat.note}</p>
          </div>
          <div><Label>Nominal length L₀ between A and B ({rodLengthCm} cm)</Label><Slider min={40} max={120} step={5} value={[rodLengthCm]} onValueChange={(v) => setRodLengthCm(v[0])} /></div>
          <div><Label>Initial temperature T₁ ({T1} °C)</Label><Slider min={10} max={30} step={1} value={[T1]} onValueChange={(v) => setT1(v[0])} /></div>
          <div><Label>Steam temperature T₂ ({T2} °C)</Label><Slider min={55} max={99} step={1} value={[T2]} onValueChange={(v) => setT2(Math.max(v[0], T1 + 25))} /></div>
          <div><Label>ΔT = T₂ − T₁ ({dT} K)</Label><div className="h-9 rounded-md bg-muted/40 border border-border flex items-center justify-center font-mono text-sm">{unitCm ? `${deltaLmm.toFixed(3)} mm expansion` : `${(deltaLmm / 10).toFixed(4)} cm`}</div></div>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button size="sm" variant={unitCm ? "default" : "outline"} onClick={() => setUnitCm(true)}>show ΔL in mm</Button>
          <Button size="sm" variant={!unitCm ? "default" : "outline"} onClick={() => setUnitCm(false)}>show ΔL in cm</Button>
          <Button variant="outline" size="sm" onClick={() => { setMatIdx(2); setRodLengthCm(80); setT1(20); setT2(96); setUnitCm(true); }}>Reset to default</Button>
        </div>

        {/* ---------- live measurement ---------- */}
        <div className="rounded-md border border-border bg-muted/30 p-4">
          <h4 className="font-semibold mb-2 text-primary">Micrometer readings &amp; result</h4>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-1.5 text-sm">
            <div className="flex justify-between"><span>Gauge B before steam (at T₁):</span><span className="font-mono">{microBefore.toFixed(3)} mm</span></div>
            <div className="flex justify-between"><span>Gauge B after steady steam (T₂):</span><span className="font-mono">{microAfter.toFixed(3)} mm</span></div>
            <div className="flex justify-between"><span>Temperature rise ΔT:</span><span className="font-mono">{dT} K</span></div>
            <div className="flex justify-between"><span>Expansion measured ΔL:</span><span className="font-mono text-base font-bold">{deltaLmm.toFixed(3)} mm</span></div>
            <div className="flex justify-between col-span-full pt-1 border-t border-border/60">
              <span className="font-semibold">α = ΔL / (L₀·ΔT):</span>
              <span className="font-mono text-base font-bold text-green-600">{((deltaLmm / 1000) / (rodLengthM * dT) * 1e6).toFixed(2)} × 10⁻⁶ K⁻¹</span>
            </div>
            <div className="flex justify-between"><span>Literature α ({mat.name}):</span><span className="font-mono">{mat.alpha} × 10⁻⁶ K⁻¹</span></div>
            <div className="flex justify-between" title="A ±0.01 mm reading error would change α by this many parts in 10⁻⁶ K⁻¹">
              <span>Sensitivity — ±0.01 mm misread shifts α by:</span><span className="font-mono">±{errIfMisread.toFixed(2)} × 10⁻⁶ K⁻¹</span>
            </div>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">Notice how a LONGER rod makes α easier to measure: ΔL scales with L₀ — this is why the rods used here are around a metre long.</p>
        </div>

        {/* ---------- labelled parts guide ---------- */}
        <div className="rounded-md border border-border bg-muted/30 p-4">
          <h4 className="font-semibold mb-3 text-primary">Parts guide — border colour · position · physical role</h4>
          <div className="grid gap-2 md:grid-cols-2">
            {[
              { c: "#f87171", n: "Fixed clamp A", p: "left pillar face", s: "rigid reference — all growth shows at the B end only" },
              { c: "#38bdf8", n: "Steam jacket", p: "cylinder around rod middle", s: "delivers uniform 100 °C bath along the heated length" },
              { c: mat.color, n: `Test rod (${mat.name})`, p: "horizontal core specimen", s: "expands ΔL = α·L₀·ΔT along its axis when steamed" },
              { c: "#fb923c", n: "Steam generator", p: "kettle lower-left + hose", s: "boils water; hose feeds jacket, flame animates supply" },
              { c: "#ef4444", n: "Thermometer T", p: "vertical, jacket top", s: "tracks T₁ → T₂ during the heating cycle" },
              { c: "#22c55e", n: "Micrometer screw B", p: "right-hand gauge stand", s: "senses free-end push; needle sweeps the ΔL value" },
              { c: "#c084fc", n: "L₀ bracket", p: "purple dimension line above", s: "marks exactly the length that participates in α·L₀·ΔT" },
              { c: "#94a3b8", n: "Bench", p: "wooden base slab", s: "stable, low-conduction platform for the whole train" },
            ].map((g) => (
              <div key={g.n} className="flex items-start gap-2 rounded-md border-l-4 bg-background/60 p-2" style={{ borderColor: g.c }}>
                <div>
                  <p className="text-xs font-semibold">{g.n}</p>
                  <p className="text-[11px] text-muted-foreground"><span className="font-medium">Position:</span> {g.p}</p>
                  <p className="text-[11px] text-muted-foreground">{g.s}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <TheoryPanel
          title="Linear expansion — complete theory"
          vocabulary="Linear expansivity α: fractional length change per kelvin; Volume expansivity γ ≈ 3α; Superficial β ≈ 2α — area & volume coefficients follow with ratio α : β : γ = 1 : 2 : 3."
          look="While steam condenses, the rod glows gently, the needle of gauge B sweeps forward, and the purple L₀ bracket stays anchored at clamp A — extension appears only at the free end."
          predict={`Predict before switching: same ΔT for brass vs iron — brass moves ~1.6× more (19 vs 12). Lengthen the rod and the SAME ΔT gives proportionally bigger ΔL.`}
          principle={
            <>
              <span className="block font-mono text-[11px] text-foreground">ΔL = α · L₀ · ΔT&nbsp;&nbsp;⇒&nbsp;&nbsp;α = ΔL / (L₀ · ΔT)</span>
              Because α ≈ 10⁻⁵ K⁻¹, a metre of metal grows only ~0.1–0.2 mm for ΔT = 80 K — hence the precision screw gauge instead of a ruler.
            </>
          }
          why="Rail fish-plate gaps, bridge roller bearings, thermostat bimetals, oven-safe Pyrex, and even the 1:2:3 rule used in tank thermal design all descend from this one classroom measurement."
        />

        {/* ---------- complete meaning of every symbol ---------- */}
        <div className="rounded-md border border-amber-500/30 bg-amber-500/5 p-4">
          <h4 className="font-semibold mb-1 text-primary">📖 Complete meaning of every symbol in α = ΔL / (L₀·ΔT)</h4>
          <p className="text-xs text-muted-foreground mb-3">Expansion = (fractional length change) per degree. Each symbol maps to a labelled part of the 3D apparatus above — follow the arrows.</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              { s: "α", n: "Coefficient of linear expansion (K⁻¹)", m: "The fractional length increase per kelvin of rise — a material constant we determine here. Steel α ≈ 12×10⁻⁶ K⁻¹; the larger α, the more the rod grows per degree." },
              { s: "ΔL", n: "Increase in length of the rod (m)", m: "Measured by the micrometer screw-gauge B. This is the click the gauge records, multiplied by its least-count (usually 0.01 mm)." },
              { s: "L₀", n: "Original length of the rod at room temperature (m)", m: "Measured with a metre rule BEFORE heating. All expansion is expressed as a fraction of this original length." },
              { s: "ΔT", n: "Temperature rise (T₂ − T₁) (°C or K)", m: "The rise from room temperature T₁ to the steam temperature T₂ ≈ 100 °C, read on the attached thermometer." },
              { s: "ΔL/L₀", n: "Fractional strain", m: "The lengthening relative to the original length — the physically meaningful ratio that α quantifies per degree." },
            ].map((r) => (
              <div key={r.s} className="flex items-start gap-2 rounded-md border-l-4 bg-background/60 p-2" style={{ borderColor: "#f59e0b" }}>
                <span className="min-w-[72px] shrink-0 pt-0.5 font-serif italic text-[15px] font-bold text-amber-600">{r.s}</span>
                <div>
                  <p className="text-xs font-semibold">{r.n}</p>
                  <p className="text-[11px] text-muted-foreground">{r.m}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ---------- significance & applications ---------- */}
        <div className="grid gap-3 md:grid-cols-3">
          <div className="flex items-start gap-2 rounded-lg border border-orange-500/30 bg-orange-500/5 p-3"><span className="text-lg leading-none">🛤️</span><div><p className="text-sm font-medium">Railways</p><p className="text-xs text-muted-foreground">Fish-plate gaps are cut using α of steel — miss the value and rails buckle on a hot afternoon.</p></div></div>
          <div className="flex items-start gap-2 rounded-lg border border-cyan-500/30 bg-cyan-500/5 p-3"><span className="text-lg leading-none">🌡️</span><div><p className="text-sm font-medium">Bimetal thermostats</p><p className="text-xs text-muted-foreground">Brass-on-iron strips curl because α differs ~1.6× — that curl snaps the kettle off at set-point.</p></div></div>
          <div className="flex items-start gap-2 rounded-lg border border-sky-500/30 bg-sky-500/5 p-3"><span className="text-lg leading-none">🌉</span><div><p className="text-sm font-medium">Bridges & cookware</p><p className="text-xs text-muted-foreground">Roller bearings absorb steel growth; Pyrex's tiny α = 3.2 makes oven-glass survive thermal shock.</p></div></div>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-md border border-border bg-muted/30 p-3">
            <h4 className="font-semibold mb-2 text-primary">Procedure quick-list</h4>
            <ol className="list-decimal pl-5 space-y-1 text-xs">
              <li>Measure L₀ between clamp face and gauge tip with the screw gauge closed on the cold rod.</li>
              <li>Note T₁ from the jacket thermometer.</li>
              <li>Pass steam until readings stay constant ≥ 5 min; record T₂ and new gauge reading.</li>
              <li>ΔL = final − initial; compute α = ΔL/(L₀·ΔT).</li>
              <li>Repeat for a different ΔT; α should match within reading error.</li>
            </ol>
          </div>
          <div className="rounded-md border border-border bg-muted/30 p-3">
            <h4 className="font-semibold mb-2 text-primary">Watch-outs</h4>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>Jacket too short → ends cooler than T₂, ΔL under-reads.</li>
              <li>Gauge backlash — always approach contact from the same side.</li>
              <li>Zero-error of the screw gauge must be signed and applied.</li>
              <li>Radiation from hot ends cools them slightly; insulate exposed rod.</li>
            </ul>
          </div>
        </div>

      </CardContent>
    </Card>
  );

};

export default LinearExpansionExperiment;
