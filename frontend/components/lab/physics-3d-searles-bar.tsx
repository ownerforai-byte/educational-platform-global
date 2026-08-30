"use client";

/**
 * 3D Searle's Bar Experiment — Determination of thermal conductivity (K)
 * of a GOOD conductor with fully labelled components and theory panels.
 *
 * Physics: steady-state conduction through the rod section between the
 * two thermojunctions equals the heat carried away by cooling water:
 *        K = (ṁ·s·Δθ_water)·L / (A·(T₁ − T₂))
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
import {
  createThreeScene,
  disposeThreeScene,
  bindResize,
  standardMaterial,
  type ThreeScene,
} from "@/components/lab/three-scene";

/* ---------------- Data ---------------- */

const RODS = [
  { name: "Copper", k: 385, color: "#fbbf24", scene: 0xd97706, note: "k ≈ 385 W·m⁻¹·K⁻¹ — best affordable conductor, standard demo rod." },
  { name: "Aluminium", k: 205, color: "#c084fc", scene: 0xa78bfa, note: "k ≈ 205 W·m⁻¹·K⁻¹ — light and a strong conductor." },
  { name: "Brass", k: 110, color: "#a3e635", scene: 0x84cc16, note: "k ≈ 110 W·m⁻¹·K⁻¹ — alloy used for fittings and fittings rods." },
  { name: "Iron (steel)", k: 80, color: "#f97316", scene: 0x9ca3af, note: "k ≈ 80 W·m⁻¹·K⁻¹ — structural metal, noticeably worse conductor." },
] as const;

const C_WATER = 4186; // J/(kg·K)

export const SearlesBarExperiment: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const storeRef = useRef<any>(null);
  const [webGL] = useState(() => typeof window !== "undefined" && isWebGLAvailable());
  const [matIdx, setMatIdx] = useState(0);
  const [barLengthCm, setBarLengthCm] = useState(10); // between T1 & T2
  const [rodRadiusMm, setRodRadiusMm] = useState(0.6); // cm → converted below (kept name honest: cm)
  const [flowGramPerMin, setFlowGramPerMin] = useState(60);
  const [deltaThetaW, setDeltaThetaW] = useState(4); // T4 − T3 water rise
  const [T1, setT1] = useState(92); // °C hot junction
  const [T2, setT2] = useState(58); // °C cold junction

  const rod = RODS[matIdx];

  /* ---- Steady-state calculation ---- */
  const Lm = barLengthCm / 100;
  const radiusM = rodRadiusMm / 100;
  const area = Math.PI * radiusM * radiusM;
  const mdot = flowGramPerMin / 1000 / 60; // kg/s
  const Qdot = mdot * C_WATER * deltaThetaW; // W carried by water
  const K = T1 - T2 !== 0 ? (Qdot * Lm) / (area * (T1 - T2)) : NaN;
  const deviation = Number.isFinite(K) ? ((K - rod.k) / rod.k) * 100 : NaN;

  useEffect(() => {
    if (!mountRef.current || !webGL) return;

    let ts: ThreeScene | null = null;
    let unbind: (() => void) | null = null;
    let labelRenderer: any = null;
    let leaderLayer: any = null;
    let cancelled = false;

    async function init() {
      try {
        const mod = await import("@/components/lab/three-scene");
        const { createThreeScene, bindResize, standardMaterial, titleText, disposeThreeScene } = mod;
        if (!mountRef.current || cancelled) return;

        ts = createThreeScene(mountRef.current!, {
          cameraPosition: new THREE.Vector3(2, 4.4, 14.5),
          autoRotate: false,
          background: 0x0b1220,
        });
        if (!ts) return;
        unbind = bindResize(ts);

        /* ---- long metal bar along X ---- */
        const rodY = 1.1;
        const barLen = 11;
        const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, barLen, 22), standardMaterial(rod.scene as number, { metalness: 0.8, roughness: 0.3 }));
        bar.rotation.z = Math.PI / 2;
        bar.position.y = rodY;
        ts.group.add(bar);
        const hotMat = standardMaterial(0xff8c00, { emissive: 0xff6a00, emissiveIntensity: 0.55, transparent: true, opacity: 0.5 });
        const hotSection = new THREE.Mesh(new THREE.CylinderGeometry(0.315, 0.315, 3.4, 22), hotMat);
        hotSection.rotation.z = Math.PI / 2;
        hotSection.position.set(-barLen / 2 + 1.9, rodY, 0);
        ts.group.add(hotSection);

        /* ---- bench slab + bushing stands ---- */
        const bench = new THREE.Mesh(new THREE.BoxGeometry(13.4, 0.2, 3.2), standardMaterial(0x7c4a21, { roughness: 0.85 }));
        bench.position.y = -0.12;
        ts.group.add(bench);
        [-4.3, 4.6].forEach((bx) => {
          const st = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.95, 0.6), standardMaterial(0x3f3f46));
          st.position.set(bx, rodY - 0.62, 0);
          ts!.group.add(st);
          const bushing = new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.06, 10, 22), standardMaterial(0x94a3b8, { metalness: 0.7 }));
          bushing.rotation.y = Math.PI / 2;
          bushing.position.set(bx, rodY, 0);
          ts!.group.add(bushing);
        });

        /* ---- steam chest wrapping the hot end ---- */
        const chestMat = standardMaterial(0x38bdf8, { transparent: true, opacity: 0.2 });
        chestMat.side = THREE.DoubleSide;
        const chest = new THREE.Mesh(new THREE.BoxGeometry(2.1, 2.1, 2.1), chestMat);
        chest.position.set(-barLen / 2 - 0.55, rodY, 0);
        ts.group.add(chest);
        const chestPipe = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 1.4, 10), standardMaterial(0xfb923c, { metalness: 0.5 }));
        chestPipe.position.set(chest.position.x + 0.2, rodY + 1.65, 0);
        chestPipe.rotation.z = 0.5;
        ts.group.add(chestPipe);

        /* ---- thermojunction collars T₁ T₂ + distance dimension ---- */
        const dimLen = 2.2 + ((barLengthCm - 5) / 25) * 4.4;
        const p1 = -dimLen / 2 + 0.4;
        const p2 = dimLen / 2 + 0.4;
        const mkCollar = (px: number, col: number) => {
          const collar = new THREE.Mesh(new THREE.TorusGeometry(0.37, 0.06, 10, 22), standardMaterial(0xe2e8f0, { metalness: 0.6 }));
          collar.rotation.y = Math.PI / 2;
          collar.position.set(px, rodY, 0);
          ts!.group.add(collar);
          const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.0, 8), standardMaterial(0xa8a29e));
          stem.position.set(px, rodY + 0.5, 0);
          ts!.group.add(stem);
          const chip = new THREE.Mesh(new THREE.SphereGeometry(0.15, 14, 14), standardMaterial(col, { emissive: col, emissiveIntensity: 0.8 }));
          chip.position.set(px, rodY + 1.08, 0);
          ts!.group.add(chip);
        };
        mkCollar(p1, 0xef4444);
        mkCollar(p2, 0xf97316);
        const dimY = rodY + 1.6;
        const dimLine = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(p1, dimY, 0), new THREE.Vector3(p2, dimY, 0)]),
          new THREE.LineBasicMaterial({ color: 0xc084fc })
        );
        ts.group.add(dimLine);
        [p1, p2].forEach((px) => {
          const tick = new THREE.Line(
            new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(px, dimY - 0.14, 0), new THREE.Vector3(px, dimY + 0.14, 0)]),
            new THREE.LineBasicMaterial({ color: 0xc084fc })
          );
          ts!.group.add(tick);
        });

        /* ---- water-cooled helical coil jacket (cold end) ---- */
        const coilX = 3.9;
        const coilBoxMat = standardMaterial(0x60a5fa, { transparent: true, opacity: 0.16 });
        coilBoxMat.side = THREE.DoubleSide;
        const coilBox = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.8, 1.8), coilBoxMat);
        coilBox.position.set(coilX, rodY, 0);
        ts.group.add(coilBox);
        const helixPts: THREE.Vector3[] = [];
        const turns = 6;
        for (let i = 0; i <= turns * 24; i++) {
          const u = i / (turns * 24);
          const a = u * turns * Math.PI * 2;
          helixPts.push(new THREE.Vector3(coilX + (u - 0.5) * 1.5, rodY + Math.cos(a) * 0.5, Math.sin(a) * 0.5));
        }
        const coilCurve = new THREE.CatmullRomCurve3(helixPts);
        const coil = new THREE.Mesh(new THREE.TubeGeometry(coilCurve, 220, 0.085, 10, false), standardMaterial(0x2563eb, { metalness: 0.4 }));
        ts.group.add(coil);

        /* IN / OUT pipes + thermometer bulbs T₃ / T₄ */
        const inPipe = new THREE.Mesh(
          new THREE.TubeGeometry(new THREE.CatmullRomCurve3([
            new THREE.Vector3(coilX - 0.9, rodY - 0.95, 1.2),
            new THREE.Vector3(coilX - 0.2, rodY - 0.72, 0.9),
            new THREE.Vector3(coilX - 0.62, rodY - 0.15, 0.36),
          ]), 40, 0.075, 10, false),
          standardMaterial(0x3b82f6)
        );
        ts.group.add(inPipe);
        const outPipe = new THREE.Mesh(
          new THREE.TubeGeometry(new THREE.CatmullRomCurve3([
            new THREE.Vector3(coilX + 0.7, rodY + 0.55, -0.5),
            new THREE.Vector3(coilX + 1.05, rodY + 0.25, -1.0),
            new THREE.Vector3(coilX + 1.15, rodY - 0.42, -1.38),
          ]), 40, 0.075, 10, false),
          standardMaterial(0xef4444)
        );
        ts.group.add(outPipe);
        const bulbIn = new THREE.Mesh(new THREE.SphereGeometry(0.13, 14, 14), standardMaterial(0x3b82f6, { emissive: 0x3b82f6, emissiveIntensity: 0.8 }));
        bulbIn.position.set(coilX - 0.9, rodY - 1.02, 1.26);
        ts.group.add(bulbIn);
        const bulbOut = new THREE.Mesh(new THREE.SphereGeometry(0.13, 14, 14), standardMaterial(0xef4444, { emissive: 0xef4444, emissiveIntensity: 0.8 }));
        bulbOut.position.set(coilX + 1.18, rodY - 0.5, -1.44);
        ts.group.add(bulbOut);

        /* measuring jar collecting drips */
        const jarWater = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.31, 0.6, 20), standardMaterial(0x3b82f6, { transparent: true, opacity: 0.55 }));
        jarWater.position.set(coilX + 1.18, 0.6, -1.44);
        ts.group.add(jarWater);
        const jarGlass = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.34, 1.5, 22, 1, true), standardMaterial(0xbae6fd, { transparent: true, opacity: 0.3 }));
        jarGlass.material.side = THREE.DoubleSide;
        jarGlass.position.set(coilX + 1.18, 0.75, -1.44);
        ts.group.add(jarGlass);
        const dripStart = new THREE.Vector3(coilX + 1.18, rodY - 0.56, -1.44);
        const drips: Array<{ mesh: THREE.Mesh; phase: number }> = [];
        for (let i = 0; i < 5; i++) {
          const d = new THREE.Mesh(new THREE.SphereGeometry(0.055, 8, 8), standardMaterial(0x3b82f6, { emissive: 0x3b82f6, emissiveIntensity: 0.5 }));
          drips.push({ mesh: d, phase: i / 5 });
          ts.group.add(d);
        }

        storeRef.current = { hotMat, drips, dripStart, jarWater };

        /* ---------- LABELS ---------- */
        try {
          const { CSS2DRenderer, CSS2DObject } = await import("three/addons/renderers/CSS2DRenderer.js");
          labelRenderer = new CSS2DRenderer();
          labelRenderer.setSize(mountRef.current!.clientWidth, mountRef.current!.clientHeight);
          labelRenderer.domElement.style.position = "absolute";
          labelRenderer.domElement.style.top = "0";
          labelRenderer.domElement.style.pointerEvents = "none";
          labelRenderer.domElement.style.zIndex = "10";
          mountRef.current!.appendChild(labelRenderer.domElement);

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
          try { leaderLayer = createLeaderLayer(mountRef.current!); } catch { leaderLayer = null; }
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

          addLbl("#fb923c", "Steam Chest — hot end", [chest.position.x, rodY + 2.6, 0], "condensing steam ≈ 100 °C", [chest.position.x, rodY + 1.0, 0]);
          addLbl("#fb923c", "Boiler Pipe", [chest.position.x + 2.5, rodY + 2.9, 0], "carries steam from boiler", [chest.position.x + 1.2, rodY + 2.0, 0]);
          addLbl("#ef4444", "Thermojunction T₁", [p1, rodY + 2.6, 0], `${T1} °C`, [p1 + 0.45, rodY + 0.35, 0]);
          addLbl("#f97316", "Thermojunction T₂", [p2, rodY + 2.6, 0], `${T2} °C`, [p2 + 0.45, rodY + 0.35, 0]);
          addLbl("#c084fc", `Distance L = ${barLengthCm} cm`, [(p1 + p2) / 2, dimY + 0.32, 0], "measured along the bar axis", [p1 + 0.5, rodY + 0.05, 0]);
          addLbl("#60a5fa", "Cooling-Water Coil", [coilX, rodY + 2.0, 0], "removes heat at cold end", [coilX, rodY + 0.2, 0]);
          addLbl("#3b82f6", "Water IN — T₃", [coilX - 2.6, rodY - 0.6, 2.3], "cold water enters", [coilX - 0.5, rodY - 0.7, 1.1]);
          addLbl("#ef4444", "Water OUT — T₄", [coilX + 2.8, rodY + 0.3, -2.3], "warmed water leaves", [coilX + 0.5, rodY - 0.2, -1.1]);
          addLbl("#bae6fd", "Measuring Jar", [coilX + 1.18, 2.4, -1.44], "collects water for ṁ", [coilX + 1.18, 1.35, -1.44]);
          addLbl(rod.color, `Metal Bar — ${rod.name}`, [-1.6, rodY - 1.8, 0], `literature k = ${rod.k} W·m⁻¹·K⁻¹`, [bar.position.x, bar.position.y, 0]);

          /* ---------- ANIMATION LOOP ---------- */
          const s = storeRef.current;
          function animate() {
            if (cancelled || !ts) return;
            requestAnimationFrame(animate);
            const t = performance.now() / 1000;

            s.hotMat.emissiveIntensity = 0.5 + Math.sin(t * 2.4) * 0.22;

            s.drips.forEach((d: any) => {
              const u = (t * 0.55 + d.phase) % 1;
              d.mesh.position.set(
                s.dripStart.x,
                s.dripStart.y - u * 0.42,
                s.dripStart.z
              );
              (d.mesh.material as THREE.MeshStandardMaterial).opacity = Math.max(0, u > 0.82 ? 0 : 1);
              d.mesh.visible = u <= 0.82;
            });
            s.jarWater.scale.y = Math.min(1.35, 1 + ((t * 0.55) % 30) * 0.004);

            ts.controls.update();
            ts.renderer.render(ts.scene, ts.camera);
            if (labelRenderer) labelRenderer.render(ts.scene, ts.camera);
            if (leaderLayer) leaderLayer.draw(ts.camera, connections);
          }
          animate();
        } catch (e) { console.log("CSS2DRenderer not available"); }
      } catch (err) {
        console.error("SearlesBar init:", err);
      }
    }
    init();

    return () => {
      cancelled = true;
      unbind?.();
      if (ts) try { disposeThreeScene(ts); } catch {}
      const m = mountRef.current;
      if (labelRenderer?.domElement && m && labelRenderer.domElement.parentNode === m) {
        m.removeChild(labelRenderer.domElement);
      }
      try { leaderLayer?.dispose?.(); } catch {}
      if (m) m.querySelectorAll(".label").forEach((e) => e.remove());
    };
  }, [webGL, matIdx, barLengthCm, rodRadiusMm, flowGramPerMin, deltaThetaW, T1, T2]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>🌊 Searle's Bar — Determination of Thermal Conductivity (K) of a Good Conductor</CardTitle>
        <CardDescription>
          Steam keeps one end of a thick metal bar near 100 °C while flowing water cools the other. In steady state the heat passing any cross-section equals the heat carried away by the water, so K = (ṁ·s·Δθ_water)·L / [A·(T₁ − T₂)].
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">

        {/* ---------- labeled 3D scene area ---------- */}
        <div className="relative w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px] rounded-lg border border-primary/30 overflow-hidden bg-slate-950" aria-label="3D Searle's thermal conductivity apparatus with labelled components">
          <div ref={mountRef} className="absolute inset-0" />
          {!webGL && (
            <div className="absolute inset-0 flex items-center justify-center p-6 text-center text-sm text-muted-foreground">
              WebGL is unavailable in this browser — the labelled 3D apparatus cannot be rendered.
            </div>
          )}
          <span className="absolute bottom-2 left-2 text-[10px] text-slate-400 bg-black/40 rounded px-2 py-1 pointer-events-none">hot glow pulses at chest · blue drips flow OUT of coil into jar</span>
        </div>

        {/* ---------- controls ---------- */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <Label>Metal bar</Label>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {RODS.map((rd, i) => (
                <Button key={rd.name} size="sm" variant={i === matIdx ? "default" : "outline"} onClick={() => setMatIdx(i)}>{rd.name}</Button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-1.5">{rod.note}</p>
          </div>
          <div><Label>Junction separation L ({barLengthCm} cm)</Label><Slider min={5} max={30} step={1} value={[barLengthCm]} onValueChange={(v) => setBarLengthCm(v[0])} /></div>
          <div><Label>Bar radius r ({rodRadiusMm} cm)</Label><Slider min={0.4} max={1.5} step={0.05} value={[rodRadiusMm]} onValueChange={(v) => setRodRadiusMm(v[0])} /></div>
          <div><Label>Water flow ṁ ({flowGramPerMin} g/min)</Label><Slider min={20} max={150} step={5} value={[flowGramPerMin]} onValueChange={(v) => setFlowGramPerMin(v[0])} /><p className="text-xs text-muted-foreground">collected water weighed over timed minutes</p></div>
          <div><Label>Water temp rise T₄ − T₃ ({deltaThetaW} K)</Label><Slider min={2} max={9} step={0.5} value={[deltaThetaW]} onValueChange={(v) => setDeltaThetaW(v[0])} /></div>
          <div><Label>Hot junction T₁ ({T1} °C)</Label><Slider min={80} max={99} step={1} value={[T1]} onValueChange={(v) => setT1(Math.max(v[0], T2 + 4))} /></div>
          <div><Label>Cold junction T₂ ({T2} °C)</Label><Slider min={40} max={95} step={1} value={[T2]} onValueChange={(v) => setT2(Math.min(v[0], T1 - 4))} /></div>
        </div>

        {/* ---------- live steady-state calculation ---------- */}
        <div className={`rounded-md border p-4 ${T1 - T2 <= 0 ? "border-red-500/50 bg-red-500/10" : "border-border bg-muted/30"}`}>
          <h4 className="font-semibold mb-2 text-primary">Steady-state computation</h4>
          {T1 - T2 <= 0 && <p className="mb-2 text-xs font-semibold text-red-500">⚠ T₂ must lie below T₁ so a measurable axial gradient exists.</p>}
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-1.5 text-sm">
            <div className="flex justify-between"><span>Heat carried by water ṁ·s·Δθ:</span><span className="font-mono">{Qdot.toFixed(2)} W</span></div>
            <div className="flex justify-between"><span>Axial gradient (T₁−T₂)/L:</span><span className="font-mono">{((T1 - T2) / Lm).toFixed(1)} K/m</span></div>
            <div className="flex justify-between"><span>Cross-section A = πr²:</span><span className="font-mono">{(area * 1e4).toFixed(2)} cm²</span></div>
            <div className="flex justify-between"><span>ṁ (kg/s):</span><span className="font-mono">{mdot.toFixed(5)}</span></div>
            <div className="flex justify-between col-span-full pt-1 border-t border-border/60">
              <span className="font-semibold">Measured conductivity K:</span>
              <span className="font-mono text-base font-bold">{Number.isFinite(K) ? K.toFixed(1) : "—"} W·m⁻¹·K⁻¹</span>
            </div>
            <div className="flex justify-between"><span>Literature k ({rod.name}):</span><span className="font-mono">{rod.k} W·m⁻¹·K⁻¹</span></div>
            <div className="flex justify-between">
              <span>Deviation from literature:</span>
              <span className={`font-mono font-semibold ${Number.isFinite(deviation) && Math.abs(deviation) < 20 ? "text-green-600" : "text-amber-600"}`}>
                {Number.isFinite(deviation) ? `${deviation > 0 ? "+" : ""}${deviation.toFixed(1)}%` : "—"}
              </span>
            </div>
          </div>
        </div>

        {/* ---------- labelled parts guide ---------- */}
        <div className="rounded-md border border-border bg-muted/30 p-4">
          <h4 className="font-semibold mb-3 text-primary">Parts guide — border colour · position · physical role</h4>
          <div className="grid gap-2 md:grid-cols-2">
            {[
              { c: "#fb923c", n: "Steam chest", p: "box around hot end (left)", s: "condensing steam fixes T at the feeding face" },
              { c: "#fb923c", n: "Boiler pipe", p: "rising from chest top", s: "continuous steam supply line from boiler" },
              { c: "#ef4444", n: "Thermojunction T₁", p: "red bulb collar on bar", s: "hot-section temperature, ~90–95 °C in practice" },
              { c: "#f97316", n: "Thermojunction T₂", p: "orange bulb collar", s: "cold-section temperature — gradient endpoint" },
              { c: "#c084fc", n: "Distance L", p: "purple dimension line", s: "only the axial stretch between T₁ & T₂ enters the formula" },
              { c: "#60a5fa", n: "Cooling coil", p: "blue helix at right", s: "sweeping water keeps a fixed cold-end condition" },
              { c: "#3b82f6", n: "Water IN · T₃", p: "front-bottom bulb", s: "inlet reference temperature of coolant" },
              { c: "#ef4444", n: "Water OUT · T₄", p: "rear bulb", s: "outlet temperature — rise T₄−T₃ is the calorimetric signal" },
              { c: "#bae6fd", n: "Measuring jar", p: "far right under outlet", s: "collected mass over time gives the heat rate ṁ·s·Δθ" },
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
          title="Searle's bar — complete theory"
          vocabulary="Steady state: every cross-section passes the same heat per second; Lagging: wrap around the bar between junctions stops side losses; Thermel junction pair T₁/T₂ vs water pair T₃/T₄: two independent thermometry chains."
          look="Orange glow pulses near the chest while blue drips leave the OUT bulb — a live visual of 'flux in equals flux out'. The purple bracket locks the exact L used."
          predict={`Cut the water flow ṁ to a trickle: T₄−T₃ climbs but ṁ·Δθ stays ~constant — the product, not the parts, carries the physics. Raise ṁ and the rise shrinks.`}
          principle={
            <>
              Conduction between junctions = heat carried away by water
              <span className="block font-mono text-[11px] mt-1 text-foreground">K·A·(T₁ − T₂)/L = ṁ·s·(T₄ − T₃)</span>
              <span className="block mt-1">So <span className="font-mono">K = ṁ·s·(T₄−T₃)·L / [A·(T₁−T₂)]</span> with s = 4186 J·kg⁻¹·K⁻¹ for water.</span>
            </>
          }
          why="Copper busbars, heat sinks, cookware bases and engine blocks are all chosen from k values first measured with exactly this steady-flow balance — the good-conductor twin of Lee's disc."
        />

        {/* ---------- complete meaning of every symbol ---------- */}
        <div className="rounded-md border border-amber-500/30 bg-amber-500/5 p-4">
          <h4 className="font-semibold mb-1 text-primary">📖 Complete meaning of every symbol in K = ṁ·s·Δθ·L / [A·(T₁ − T₂)]</h4>
          <p className="text-xs text-muted-foreground mb-3">Read the formula left → right; each term maps to a labelled part in the 3D apparatus above — follow the arrows.</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              { s: "K", n: "Thermal conductivity (W·m⁻¹·K⁻¹)", m: "The ease with which heat conducts ALONG the metal bar. High K = good conductor. This steady-flow method suits GOOD conductors, the counterpart of Lee's disc." },
              { s: "ṁ", n: "Rate of water flow (kg·s⁻¹)", m: "Mass of cooling water crossing the coil each second — found by timing how long the measuring jar takes to collect a known mass (1 mL ≈ 1 g)." },
              { s: "s", n: "Specific heat capacity of water (J·kg⁻¹·K⁻¹)", m: "s = 4186 for water. It links the water's temperature rise to the heat it carried away per second." },
              { s: "Δθ", n: "Water temperature rise T₄ − T₃ (°C)", m: "Difference between the warmed-water outlet (T₄) and the cold-water inlet (T₃). Bigger Δθ at fixed flow = more heat extracted." },
              { s: "L", n: "Distance between bar thermojunctions (m)", m: "Separation of T₁ and T₂ measured along the bar axis; it defines the length over which the temperature gradient acts." },
              { s: "A", n: "Cross-sectional area of the bar (m²)", m: "A = πr² using the rod radius. A larger face lets more heat flow for the same gradient." },
              { s: "T₁", n: "Hot-end bar temperature (°C)", m: "Read at thermojunction T₁ near the steam chest (≈ 100 °C end)." },
              { s: "T₂", n: "Cold-end bar temperature (°C)", m: "Read at thermojunction T₂ near the cooling coil; T₁ − T₂ is the temperature drop the gradient lives across." },
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
          <div className="flex items-start gap-2 rounded-lg border border-yellow-500/30 bg-yellow-500/5 p-3"><span className="text-lg leading-none">⚡</span><div><p className="text-sm font-medium">Busbars & cables</p><p className="text-xs text-muted-foreground">Copper vs aluminium conductor sizing trades k (385 vs 205) against weight and cost — measured exactly this way.</p></div></div>
          <div className="flex items-start gap-2 rounded-lg border border-blue-500/30 bg-blue-500/5 p-3"><span className="text-lg leading-none">🖥️</span><div><p className="text-sm font-medium">Heat sinks</p><p className="text-xs text-muted-foreground">Extruded aluminium fins exist because k ≈ 205 W·m⁻¹·K⁻¹ moves chip watts into air fast.</p></div></div>
          <div className="flex items-start gap-2 rounded-lg border border-lime-500/30 bg-lime-500/5 p-3"><span className="text-lg leading-none">🍳</span><div><p className="text-sm font-medium">Cookware bases</p><p className="text-xs text-muted-foreground">Sandwich bases bond copper into steel to spread flame heat evenly — Searle's k decides the layer.</p></div></div>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-md border border-border bg-muted/30 p-3">
            <h4 className="font-semibold mb-2 text-primary">Procedure quick-list</h4>
            <ol className="list-decimal pl-5 space-y-1 text-xs">
              <li>Lag the bar between junctions; start steam and cooling water together.</li>
              <li>Wait for stationarity: T₁, T₂, T₃, T₄ all drift &lt; 0.5 K over 5 min.</li>
              <li>Weigh collected water for a timed interval → ṁ; record T₃, T₄.</li>
              <li>Compute K from the boxed formula using L between T₁ and T₂.</li>
              <li>Repeat with a second flow rate — K must agree.</li>
            </ol>
          </div>
          <div className="rounded-md border border-border bg-muted/30 p-3">
            <h4 className="font-semibold mb-2 text-primary">Main error sources</h4>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>Sidewise loss through un-lagged bar sections near junctions.</li>
              <li>Junctions not exactly L apart, or L mis-measured on a curved bar.</li>
              <li>Thermometer stems not fully immersed in the water streams.</li>
              <li>Non-steady collection period (jar swapped late) corrupts ṁ.</li>
            </ul>
          </div>
        </div>

      </CardContent>
    </Card>
  );

};

export default SearlesBarExperiment;
