"use client";

/**
 * Lab Studio — the shared engine.
 *
 * Turns a declarative StudioSpec into the photoreal, view-switchable 3D
 * section that sits BELOW a lab's original component. The viewer shell is the
 * same one the Faunal Real Anatomy Studio uses, so every studio inherits:
 *
 *   · view switcher + skin/clarity presets + process animation
 *   · CSS2D label chips with arrow-free leader lines (perpendicular ticks)
 *   · screen-space label declutter
 *   · auto camera framing on the real geometry
 *   · a per-view knowledge table of structures and why they matter
 */

import { useMemo } from "react";
import * as THREE from "three";
import { TheoryPanel } from "@/components/lab/theory-panel";
import {
  RealAnatomyViewer,
  titleText as kitTitle,
  type RealKit,
  type RealOpts,
  type RealPart,
  type RealView,
} from "./biology-faunal-real-kit";
import {
  physical,
  organicBlob,
  tubeAlong,
  contactGround,
} from "./biology-faunal-3d-realism";
import type {
  StudioPart,
  StudioShape,
  StudioSpec,
  StudioView,
  Vec3,
} from "@/lib/lab-studios/types";

const v3 = (a: Vec3) => new THREE.Vector3(a[0], a[1], a[2]);

/**
 * Where a label's leader line should point.
 *
 * A part may describe its position either with `at` or inside its own
 * geometry (a swept tube carries its own polyline). Every label therefore
 * needs an explicit anchor derived from the shape — a label without one is
 * dropped from the leader layer, which silently excludes it from the
 * declutter pass AND from the reveal counter, leaving it stacked on top of
 * its neighbours and free to drift off-canvas.
 */
function anchorFor(p: StudioPart): THREE.Vector3 {
  if (p.at) return v3(p.at);
  const s = p.shape;
  if (s.kind === "tube" && s.points.length) {
    const mid = s.points[Math.floor(s.points.length / 2)];
    return v3(mid);
  }
  if (s.kind === "plane" && p.rot) {
    // a flat sheet (bench, screen) anchors at its own centre
    return new THREE.Vector3(0, 0, 0);
  }
  return new THREE.Vector3(0, 0, 0);
}

/* ------------------------------------------------------------------ */
/* geometry                                                            */
/* ------------------------------------------------------------------ */

function geometryFor(shape: StudioShape): THREE.BufferGeometry {
  switch (shape.kind) {
    case "sphere":
      return shape.noise
        ? organicBlob(shape.r, shape.seed ?? 7, 2, shape.noise)
        : new THREE.SphereGeometry(shape.r, 40, 28);
    case "box":
      return new THREE.BoxGeometry(shape.size[0], shape.size[1], shape.size[2]);
    case "cylinder":
      return new THREE.CylinderGeometry(
        shape.r1,
        shape.r2 ?? shape.r1,
        shape.h,
        32,
        1,
        shape.open ?? false,
      );
    case "cone":
      return new THREE.ConeGeometry(shape.r, shape.h, 32);
    case "torus":
      return new THREE.TorusGeometry(shape.r, shape.tube, 20, 44, shape.arc ?? Math.PI * 2);
    case "plane":
      return new THREE.PlaneGeometry(shape.w, shape.h);
    case "disc":
      return new THREE.CircleGeometry(shape.r, shape.segments ?? 48);
    case "tube":
      return new THREE.TubeGeometry(
        new THREE.CatmullRomCurve3(shape.points.map(v3)),
        96,
        shape.radius,
        16,
        false,
      );
  }
}

function meshFor(shape: StudioShape, mat: THREE.Material): THREE.Object3D {
  if (shape.kind === "tube" && shape.endRadius !== undefined) {
    // tapered swept tube: radius eased from radius → endRadius
    const pts = shape.points.map(v3);
    return tubeAlong(
      pts,
      (t) => shape.radius + (shape.endRadius! - shape.radius) * t,
      96,
      16,
      mat,
    );
  }
  return new THREE.Mesh(geometryFor(shape), mat);
}

/* ------------------------------------------------------------------ */
/* build                                                               */
/* ------------------------------------------------------------------ */

type Motion = { obj: THREE.Object3D; base: THREE.Vector3; spec: StudioPart["motion"] };

function buildStudio(spec: StudioSpec, kit: RealKit, opts: RealOpts) {
  const view: StudioView | undefined =
    spec.views.find((v) => v.id === opts.view) ?? spec.views[0];
  const viewId = view?.id ?? "external";

  const shell = view?.shell ?? "solid";
  const shellGhost = shell === "ghost";
  const clarity = opts.clarity;
  const skinOpacity = clarity === "opaque" ? 1 : clarity === "semi" ? 0.42 : 0.14;

  const g = kit.ts.group;
  const motions: Motion[] = [];
  const scoped: StudioPart[] = [...spec.parts, ...(view?.extra ?? [])];

  // A part is shown when its `views` list includes this view, or it has no
  // list at all — and never when this view is in its `except` list.
  const visible = (p: StudioPart) => {
    if (p.except?.includes(viewId)) return false;
    if (p.views && !p.views.includes(viewId)) return false;
    return true;
  };

  // Body / casing parts are the ones that get ghosted in system views. A part
  // opts in by naming "external" first in its `views` list — that is the
  // convention the specs use for shells.
  const isShell = (p: StudioPart) =>
    !!p.views && p.views[0] === "external" && p.material !== "emissive";

  scoped.forEach((p) => {
    if (!visible(p)) return;

    const base = physical(p.material as never, p.color, {});
    let mat: THREE.Material = base;
    let opacity = p.opacity;

    if (isShell(p) && shell !== "solid") {
      opacity = shellGhost ? 0.11 : 0;
    } else if (p.views?.includes("transparent") && viewId === "transparent" && isShell(p)) {
      base.transmission = clarity === "xray" ? 0.62 : 0.32;
      base.ior = 1.36;
      base.transparent = true;
      base.opacity = Math.min(skinOpacity, 0.4);
    } else if (opacity === undefined && clarity !== "opaque") {
      // everything inside a see-through shell should also read as inside it
      opacity = Math.min(skinOpacity + 0.25, 0.9);
    }
    if (opacity !== undefined) {
      base.transparent = opacity < 1;
      base.opacity = opacity;
    }
    if (p.shape.kind === "plane" && p.shape.doubleSided !== false) {
      base.side = THREE.DoubleSide;
    }
    if (p.outline) {
      mat = new THREE.MeshBasicMaterial({
        color: p.color as THREE.ColorRepresentation,
        wireframe: true,
        transparent: true,
        opacity: 0.35,
      });
    }

    const reps = p.repeat;
    if (reps && "count" in reps) {
      for (let i = 0; i < reps.count; i++) {
        const m = meshFor(p.shape, mat);
        const t = reps.count === 1 ? 0.5 : i / (reps.count - 1);
        m.position.set(
          (p.at?.[0] ?? 0) + (t - 0.5) * reps.spread[0],
          (p.at?.[1] ?? 0) + (t - 0.5) * reps.spread[1],
          (p.at?.[2] ?? 0) + (t - 0.5) * reps.spread[2],
        );
        if (p.rot) m.rotation.set(p.rot[0], p.rot[1], p.rot[2]);
        g.add(m);
      }
    } else if (reps && "ring" in reps) {
      for (let i = 0; i < reps.ring; i++) {
        const a = (i / reps.ring) * Math.PI * 2;
        const m = meshFor(p.shape, mat);
        m.position.set(
          (p.at?.[0] ?? 0) + Math.cos(a) * reps.radius,
          (p.at?.[1] ?? 0) + Math.sin(a) * reps.radius * (reps.tilt ?? 0),
          (p.at?.[2] ?? 0) + Math.sin(a) * reps.radius,
        );
        if (p.rot) m.rotation.set(p.rot[0], p.rot[1], p.rot[2]);
        g.add(m);
      }
    } else {
      const m = meshFor(p.shape, mat);
      if (p.at) m.position.set(p.at[0], p.at[1], p.at[2]);
      if (p.rot) m.rotation.set(p.rot[0], p.rot[1], p.rot[2]);
      if ("scale" in p.shape && p.shape.scale) {
        m.scale.set(p.shape.scale[0], p.shape.scale[1], p.shape.scale[2]);
      }
      g.add(m);
      if (p.motion) motions.push({ obj: m, base: m.position.clone(), spec: p.motion });
    }

    if (p.label) {
      kit.add(
        p.label.color ?? "#38bdf8",
        p.label.text,
        p.label.sub,
        v3(p.label.at),
        anchorFor(p),
      );
    }
  });

  if (spec.ground !== false) {
    const box = new THREE.Box3().setFromObject(g);
    const y = box.isEmpty() ? -2 : box.min.y - 0.05;
    contactGround(kit.ts.scene, y, 36);
  }
  kitTitle(kit.ts, spec.studio, new THREE.Vector3(0, 6.4, 0));

  /* animation */
  const flows: { mesh: THREE.Object3D; from: THREE.Vector3; to: THREE.Vector3; i: number; n: number; speed: number }[] = [];
  scoped.forEach((p) => {
    if (p.motion?.kind === "flow" && visible(p)) {
      const n = p.motion.count ?? 10;
      const from = v3(p.motion.from);
      const to = v3(p.motion.to);
      for (let i = 0; i < n; i++) {
        const dot = new THREE.Mesh(
          new THREE.SphereGeometry(0.075, 10, 8),
          physical("emissive", p.color as number),
        );
        g.add(dot);
        flows.push({ mesh: dot, from, to, i, n, speed: p.motion.speed ?? 0.4 });
      }
    }
  });

  return (t: number) => {
    const on = opts.process;
    const rate = on ? 1 : 0.35;
    motions.forEach((m) => {
      const mo = m.spec!;
      if (mo.kind === "spin") {
        const s = (mo.speed ?? 1) * t * rate;
        if ((mo.axis ?? "y") === "y") m.obj.rotation.y = s;
        else if (mo.axis === "x") m.obj.rotation.x = s;
        else m.obj.rotation.z = s;
      } else if (mo.kind === "pulse") {
        const k = 1 + (mo.amount ?? 0.1) * Math.sin(t * (mo.speed ?? 2) * rate);
        m.obj.scale.setScalar(k);
      } else if (mo.kind === "swing") {
        m.obj.rotation.z = (mo.amount ?? 0.3) * Math.sin(t * (mo.speed ?? 1.4) * rate);
      } else if (mo.kind === "wave") {
        const pts = m.obj as THREE.Mesh;
        pts.position.y = m.base.y + (mo.amplitude ?? 0.2) * Math.sin(t * (mo.speed ?? 1.6) * rate);
      }
    });
    flows.forEach((f) => {
      const k = ((t * f.speed + f.i / f.n) % 1 + 1) % 1;
      f.mesh.position.lerpVectors(f.from, f.to, on ? k : 0.5);
    });
  };
}

/* ------------------------------------------------------------------ */
/* the component                                                       */
/* ------------------------------------------------------------------ */

function rowsFor(spec: StudioSpec, viewId: string): RealPart[] {
  const view = spec.views.find((v) => v.id === viewId) ?? spec.views[0];
  if (view?.rows?.length) return view.rows;
  // fall back to the labels the model itself carries, so a studio can never
  // show an empty knowledge table
  const scoped = [...spec.parts, ...(view?.extra ?? [])].filter((p) => p.label);
  return scoped.map((p) => ({
    name: p.label!.text,
    fn: p.label!.sub ?? "—",
    why: "",
  }));
}

const THEMES = [
  { accent: "#38bdf8", name: "Live studio" },
] as const;

export function LabStudio({ spec }: { spec: StudioSpec }) {
  const theme = THEMES[0];
  const views: RealView[] = useMemo(
    () => spec.views.map((v) => ({ id: v.id, label: v.label, hint: v.hint })),
    [spec],
  );

  return (
    <section className="mt-5 space-y-3">
      <div
        className="rounded-2xl border p-3 md:p-4"
        style={{ borderColor: `${theme.accent}44`, background: `${theme.accent}0d` }}
      >
        <h2 className="flex flex-wrap items-center gap-2 text-sm font-bold md:text-base">
          <span
            className="inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide"
            style={{ background: `${theme.accent}22`, color: theme.accent }}
          >
            {theme.name}
          </span>
          {spec.studio}
        </h2>
        <p className="mt-1 text-xs text-muted-foreground md:text-sm">{spec.blurb}</p>
      </div>

      <RealAnatomyViewer
        badge="3D studio"
        clarityText={{
          prefix: spec.shellWord ?? "Casing",
          opaque: spec.shellWord ? `Opaque (${spec.shellWord.toLowerCase()})` : "Opaque (solid)",
        }}
        title={spec.studio}
        subtitle="Switch the view, turn the casing see-through, and play the process — every structure is listed with what it does and why it is asked."
        views={views}
        parts={rowsFor(spec, spec.defaultView ?? spec.views[0]?.id ?? "external")}
        partsFor={(v) => rowsFor(spec, v)}
        defaultView={spec.defaultView ?? spec.views[0]?.id ?? "external"}
        build={(kit, opts) => buildStudio(spec, kit, opts)}
        footer={
          spec.theory ? (
            <TheoryPanel
              title={`Theory — ${spec.studio}`}
              look={spec.theory.look}
              principle={spec.theory.principle}
              why={spec.theory.why}
            />
          ) : undefined
        }
      />
    </section>
  );
}

export default LabStudio;
