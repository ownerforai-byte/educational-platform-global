"use client";

/**
 * Physics 3D Measurement suite — labelled 3D instruments for the NEB
 * Physics XI (Phy. 101) unit "Physical Quantities":
 *   • Vernier calliper     → L.C. = 1 MSD − 1 VSD = 0.1 mm = 0.01 cm
 *   • Micrometer screw gauge → L.C. = pitch / no. of circular divisions
 *                             = 0.5 mm / 50 = 0.01 mm
 */

import { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import { CSS2DRenderer, CSS2DObject } from "three/addons/renderers/CSS2DRenderer.js";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { isWebGLAvailable } from "@/lib/webgl";
import { TheoryPanel } from "@/components/lab/theory-panel";
import {
  createThreeScene,
  disposeThreeScene,
  bindResize,
  standardMaterial,
  titleText,
  type ThreeScene,
  type ThreeSceneOptions,
} from "@/components/lab/three-scene";

type Kit = {
  ts: ThreeScene;
  labelRenderer: CSS2DRenderer;
  addLabel: (
    color: string,
    title: string,
    sub: string | undefined,
    pos: THREE.Vector3,
    parent?: THREE.Object3D
  ) => CSS2DObject;
};

function chipEl(color: string, title: string, sub?: string): HTMLDivElement {
  const el = document.createElement("div");
  el.style.cssText =
    "pointer-events:auto;padding:3px 8px;border-radius:8px;background:rgba(2,6,23,0.82);" +
    `border:1.5px solid ${color};color:#e2e8f0;font:600 11px/1.35 ui-sans-serif,system-ui;white-space:nowrap;`;
  el.innerHTML = `<span style="color:${color};font-weight:800">${title}</span>` +
    (sub ? `<br/><span style="opacity:.8;font-weight:500">${sub}</span>` : "");
  return el;
}

function setupKit(mount: HTMLElement, opts: ThreeSceneOptions = {}): Kit {
  const ts = createThreeScene(mount, { background: 0x0b1220, ...opts });
  const labelRenderer = new CSS2DRenderer();
  labelRenderer.setSize(mount.clientWidth || 1, mount.clientHeight || 1);
  labelRenderer.domElement.style.position = "absolute";
  labelRenderer.domElement.style.top = "0";
  labelRenderer.domElement.style.left = "0";
  labelRenderer.domElement.style.pointerEvents = "none";
  labelRenderer.domElement.style.zIndex = "10";
  mount.appendChild(labelRenderer.domElement);
  return {
    ts,
    labelRenderer,
    addLabel(color, title, sub, pos, parent = ts.group) {
      const o = new CSS2DObject(chipEl(color, title, sub));
      o.position.copy(pos);
      parent.add(o);
      return o;
    },
  };
}

function runLoop(kit: Kit, onUpdate?: (t: number) => void): () => void {
  const clock = new THREE.Clock();
  let raf = 0;
  const animate = () => {
    raf = requestAnimationFrame(animate);
    onUpdate?.(clock.getElapsedTime());
    kit.ts.controls.update();
    kit.ts.renderer.render(kit.ts.scene, kit.ts.camera);
    kit.labelRenderer.render(kit.ts.scene, kit.ts.camera);
  };
  animate();
  return () => cancelAnimationFrame(raf);
}

function useLabScene(
  build: (kit: Kit) => void | ((t: number) => void),
  deps: unknown[]
): { mountRef: React.RefObject<HTMLDivElement | null>; webGL: boolean } {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webGL] = useState(() => typeof window !== "undefined" && isWebGLAvailable());
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || !webGL) return;
    const kit = setupKit(mount);
    const tick = build(kit);
    const stop = runLoop(kit, tick ?? undefined);
    const offResize = bindResize(kit.ts);
    const onResize = () => kit.labelRenderer.setSize(mount.clientWidth || 1, mount.clientHeight || 1);
    window.addEventListener("resize", onResize);
    return () => {
      stop();
      window.removeEventListener("resize", onResize);
      offResize();
      kit.labelRenderer.domElement.remove();
      disposeThreeScene(kit.ts);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webGL, ...deps]);
  return { mountRef, webGL };
}

function CanvasMount({ mountRef, webGL }: { mountRef: React.RefObject<HTMLDivElement | null>; webGL: boolean }) {
  return webGL ? (
    <div ref={mountRef} aria-label="3D scene" className="relative h-[320px] w-full overflow-hidden rounded-md sm:h-[440px]" />
  ) : (
    <div className="flex h-[320px] items-center justify-center rounded-md border border-border bg-muted/30 text-sm text-muted-foreground sm:h-[440px]">
      WebGL is not available in this browser.
    </div>
  );
}

/** Row of graduation ticks along +x. */
function ticks(from: number, to: number, step: number, len: number, color: number): THREE.Group {
  const grp = new THREE.Group();
  for (let x = from; x <= to + 1e-6; x += step) {
    const t = new THREE.Mesh(new THREE.BoxGeometry(0.03, len, 0.02), standardMaterial(color));
    t.position.set(x, 0, 0);
    grp.add(t);
  }
  return grp;
}

/* ------------------------------------------------------------------ */
/* TAB 1 — Vernier calliper                                            */
/* ------------------------------------------------------------------ */

const VERNIER_ZERO_ERRORS = { none: 0, positive: 0.01, negative: -0.01 } as const;

const VernierTab: React.FC = () => {
  const [w, setW] = useState(2.34); // object width in cm
  const [zero, setZero] = useState<keyof typeof VERNIER_ZERO_ERRORS>("none");
  const { mountRef, webGL } = useLabScene((kit) => {
    const g = kit.ts.group;
    const RAIL_Y = 0.7;
    const JAW_X = -4.1; // inner face of fixed jaw
    // Main scale rail
    const rail = new THREE.Mesh(new THREE.BoxGeometry(9.6, 0.16, 0.24), standardMaterial(0x94a3b8, { metalness: 0.5 }));
    rail.position.set(0.4, RAIL_Y, 0);
    g.add(rail);
    const mainTicks = ticks(-4.0, 4.4, 0.1, 0.09, 0xe2e8f0);
    mainTicks.position.y = RAIL_Y + 0.11;
    g.add(mainTicks);
    // Fixed jaw (down from rail)
    const fj = new THREE.Mesh(new THREE.BoxGeometry(0.14, 1.3, 0.42), standardMaterial(0x64748b, { metalness: 0.4 }));
    fj.position.set(JAW_X - 0.07, RAIL_Y - 0.65, 0);
    g.add(fj);
    // Movable jaw + vernier slider (at JAW_X + w)
    const xm = JAW_X + w;
    const mj = new THREE.Mesh(new THREE.BoxGeometry(0.14, 1.3, 0.42), standardMaterial(0x64748b, { metalness: 0.4 }));
    mj.position.set(xm + 0.07, RAIL_Y - 0.65, 0);
    g.add(mj);
    const slider = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.2, 0.3), standardMaterial(0xf97316, { metalness: 0.3 }));
    slider.position.set(xm + 0.72, RAIL_Y, 0);
    g.add(slider);
    // Vernier scale: 10 divisions in 0.9 cm (VSD = 0.09 cm)
    for (let i = 0; i < 10; i++) {
      const t = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.07, 0.02), standardMaterial(0xfbbf24));
      t.position.set(xm + 0.07 + i * 0.09, RAIL_Y - 0.11, 0);
      g.add(t);
    }
    // Object being measured
    const obj = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, w, 28), standardMaterial(0x22c55e, { transparent: true, opacity: 0.75 }));
    obj.rotation.z = Math.PI / 2;
    obj.position.set(JAW_X + w / 2, RAIL_Y - 0.65, 0);
    g.add(obj);
    // Readings
    const ze = VERNIER_ZERO_ERRORS[zero];
    const MSR = Math.floor(w / 0.1) * 0.1;
    const VSR = Math.min(9, Math.round((w - MSR) / 0.01));
    const reading = MSR + VSR * 0.01;
    const corrected = reading - ze;
    kit.addLabel("#94a3b8", "Main scale (MSD = 1 mm)", undefined, new THREE.Vector3(0.4, RAIL_Y + 1.1, 0));
    kit.addLabel("#fbbf24", "Vernier scale", "10 VSD = 9 mm", new THREE.Vector3(xm + 0.5, RAIL_Y + 0.9, 0));
    kit.addLabel("#64748b", "Fixed outside jaw", undefined, new THREE.Vector3(JAW_X - 0.15, -1.35, 0));
    kit.addLabel("#64748b", "Movable outside jaw", "slides with vernier", new THREE.Vector3(xm + 0.2, -1.35, 0));
    kit.addLabel("#22c55e", "Object", `width = ${w.toFixed(2)} cm`, new THREE.Vector3(JAW_X + w / 2, -1.75, 0));
    kit.addLabel("#f97316", `MSR = ${MSR.toFixed(2)} cm`, `VSR = ${VSR} → ${VSR} × 0.01 cm`, new THREE.Vector3(3.2, -0.6, 0));
    kit.addLabel("#facc15", `Reading = ${reading.toFixed(2)} cm`, `corrected = ${(corrected).toFixed(2)} cm (${zero} zero error)`, new THREE.Vector3(3.2, -1.6, 0));
    titleText(kit.ts, "Vernier Calliper — L.C. = 0.01 cm = 0.1 mm", new THREE.Vector3(0, 2.6, 0));
    return (t: number) => {
      obj.position.y = RAIL_Y - 0.65 + Math.sin(t * 1.5) * 0.02;
    };
  }, [w, zero]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Label className="w-20 shrink-0 text-xs">Object width</Label>
          <Slider value={[w]} min={1} max={6} step={0.01} onValueChange={(v) => setW(v[0])} className="w-44" />
          <span className="text-xs text-muted-foreground">{w.toFixed(2)} cm</span>
        </div>
        <div className="flex items-center gap-2">
          <Label className="w-16 shrink-0 text-xs">Zero error</Label>
          {(["none", "positive", "negative"] as const).map((k) => (
            <Button key={k} size="sm" variant={zero === k ? "default" : "outline"} onClick={() => setZero(k)}>
              {k === "none" ? "None" : k === "positive" ? "+0.01" : "−0.01"}
            </Button>
          ))}
        </div>
      </div>
      <CanvasMount mountRef={mountRef} webGL={webGL} />
      <TheoryPanel
        vocabulary="MSD = main-scale division (1 mm); VSD = vernier-scale division (0.9 mm); L.C. = least count = 1 MSD − 1 VSD = 0.1 mm."
        look="The green object is gripped between the two outside jaws. Its width sets where the orange vernier slider stops: the main-scale reading is the last division passed, and one vernier division coincides with a main division."
        principle="Reading = MSR + (coinciding VSR × L.C.) ± zero error. Positive zero error (vernier zero right of main zero) is subtracted; negative is added."
        why="A vernier calliper measures lengths to 0.1 mm — internal/external diameters and depths — far more precisely than a metre scale."
      />
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* TAB 2 — Micrometer screw gauge                                      */
/* ------------------------------------------------------------------ */

const ScrewGaugeTab: React.FC = () => {
  const [d, setD] = useState(3.46); // object diameter in mm
  const { mountRef, webGL } = useLabScene((kit) => {
    const g = kit.ts.group;
    const U = 0.22; // scene units per mm
    const du = d * U; // gap in units
    // C-frame
    const frame = new THREE.Mesh(new THREE.TorusGeometry(1.5, 0.16, 12, 40, Math.PI), standardMaterial(0x64748b, { metalness: 0.45 }));
    frame.rotation.z = Math.PI;
    frame.position.set(-0.15, 0, 0);
    g.add(frame);
    const back = new THREE.Mesh(new THREE.BoxGeometry(0.3, 1.5, 0.3), standardMaterial(0x64748b, { metalness: 0.45 }));
    back.position.set(-1.5, 0, 0);
    g.add(back);
    // Anvil (fixed) — face at x = 0
    const anvil = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.9, 16), standardMaterial(0x94a3b8, { metalness: 0.6 }));
    anvil.rotation.z = Math.PI / 2;
    anvil.position.set(-0.45, 0, 0);
    g.add(anvil);
    // Spindle (movable) — face at x = du
    const spindleLen = 2.6 - du;
    const spindle = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, spindleLen, 16), standardMaterial(0x94a3b8, { metalness: 0.6 }));
    spindle.rotation.z = Math.PI / 2;
    spindle.position.set(du + spindleLen / 2, 0, 0);
    g.add(spindle);
    // Sleeve (main scale, pitch 0.5 mm) from x = 0.9 to 2.1
    const sleeve = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.26, 1.2, 24), standardMaterial(0x1e293b, { metalness: 0.3 }));
    sleeve.rotation.z = Math.PI / 2;
    sleeve.position.set(1.5, 0, 0);
    g.add(sleeve);
    for (let mm = 0; mm <= 5; mm++) {
      const t = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.02, 0.3), standardMaterial(0xe2e8f0));
      t.position.set(0.9 + mm * 0.5 * U, 0, 0.27);
      g.add(t);
      if (mm < 5) {
        const h = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.02, 0.18), standardMaterial(0x94a3b8));
        h.position.set(0.9 + (mm + 0.5) * 0.5 * U, 0, 0.27);
        g.add(h);
      }
    }
    // Thimble (circular scale) — starts at x = 2.1
    const thimble = new THREE.Group();
    const th = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.85, 28), standardMaterial(0xf97316, { metalness: 0.35 }));
    th.rotation.z = Math.PI / 2;
    thimble.add(th);
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * Math.PI * 2;
      const tick = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.02, 0.1), standardMaterial(0xfef08a));
      tick.position.set(0, Math.cos(a) * 0.34, Math.sin(a) * 0.34);
      tick.rotation.x = -a;
      thimble.add(tick);
    }
    thimble.position.set(2.1 + 0.425, 0, 0);
    g.add(thimble);
    // Ratchet
    const ratchet = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.3, 20), standardMaterial(0x22c55e, { metalness: 0.4 }));
    ratchet.rotation.z = Math.PI / 2;
    ratchet.position.set(2.95, 0, 0);
    g.add(ratchet);
    // Object between anvil and spindle
    const obj = new THREE.Mesh(new THREE.SphereGeometry(du / 2, 26, 18), standardMaterial(0x22c55e, { transparent: true, opacity: 0.75 }));
    obj.position.set(du / 2, 0, 0);
    g.add(obj);
    // Readings
    const sleeveMm = Math.floor(d / 0.5) * 0.5;
    const thimbleDiv = Math.min(49, Math.round((d - sleeveMm) / 0.01));
    const reading = sleeveMm + thimbleDiv * 0.01;
    kit.addLabel("#94a3b8", "Anvil (fixed)", undefined, new THREE.Vector3(-0.6, 1.15, 0));
    kit.addLabel("#94a3b8", "Spindle (movable)", undefined, new THREE.Vector3(du + 0.6, 1.15, 0));
    kit.addLabel("#38bdf8", "Sleeve — main scale", "pitch = 0.5 mm", new THREE.Vector3(1.5, 1.5, 0));
    kit.addLabel("#f97316", "Thimble — circular scale", "50 divisions", new THREE.Vector3(2.5, -1.5, 0));
    kit.addLabel("#22c55e", "Object", `⌀ = ${d.toFixed(2)} mm`, new THREE.Vector3(du / 2, -1.3, 0));
    kit.addLabel("#facc15", `Sleeve = ${sleeveMm.toFixed(2)} mm`, `thimble = ${thimbleDiv} × 0.01 mm`, new THREE.Vector3(2.5, 1.5, 0));
    kit.addLabel("#fbbf24", `Reading = ${reading.toFixed(2)} mm`, "L.C. = 0.5/50 = 0.01 mm", new THREE.Vector3(-1.2, -1.9, 0));
    titleText(kit.ts, "Micrometer Screw Gauge — L.C. = 0.01 mm", new THREE.Vector3(0, 2.7, 0));
    return (t: number) => {
      thimble.rotation.x = t * 0.8 + du * 6;
    };
  }, [d]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Label className="w-24 shrink-0 text-xs">Diameter (mm)</Label>
          <Slider value={[d]} min={0.5} max={10} step={0.01} onValueChange={(v) => setD(v[0])} className="w-44" />
          <span className="text-xs text-muted-foreground">{d.toFixed(2)} mm</span>
        </div>
      </div>
      <CanvasMount mountRef={mountRef} webGL={webGL} />
      <TheoryPanel
        vocabulary="Pitch = distance the spindle advances per complete turn (0.5 mm). Least count = pitch ÷ number of circular-scale divisions = 0.5/50 = 0.01 mm."
        look="The green sphere sits between the fixed anvil and the moving spindle. The slider rotates the orange thimble along the sleeve, closing the gap exactly like the real ratchet action."
        principle="Reading = sleeve (main scale) + coinciding circular division × L.C. The ratchet stops over-tightening so the object is not squeezed."
        why="The screw gauge resolves 0.01 mm — wire diameter, foil thickness and ball bearings; essential in the Searle's Young's modulus determination."
      />
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Suite export                                                        */
/* ------------------------------------------------------------------ */

export const Physics3DMeasurement: React.FC = () => {
  return (
    <Tabs defaultValue="vernier" className="w-full">
      <TabsList className="flex-wrap">
        <TabsTrigger value="vernier">Vernier Calliper</TabsTrigger>
        <TabsTrigger value="screw">Screw Gauge</TabsTrigger>
      </TabsList>
      <TabsContent value="vernier" className="mt-4"><VernierTab /></TabsContent>
      <TabsContent value="screw" className="mt-4"><ScrewGaugeTab /></TabsContent>
    </Tabs>
  );
};

export default Physics3DMeasurement;




