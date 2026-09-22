/**
 * Lab Studio — declarative spec.
 *
 * The Real Anatomy Studio that was built for Faunal Diversity is a viewer
 * shell (view switcher · skin clarity · process animation · knowledge table ·
 * arrow-free leader lines) plus a scene. This file makes the *scene* data:
 * a lab declares its model as shapes + materials + labels, and one shared
 * engine turns that into the photoreal, switchable 3D section that sits
 * below the lab's original component.
 *
 * Why a spec and not a component per lab: 68 3D labs share the same viewer
 * behaviour and differ only in what is pictured. Data keeps the viewer in one
 * place — so a fix (leader-line ticks, label declutter, teardown) lands on
 * every lab at once — and makes "according to their place" a matter of
 * authoring parts, not re-implementing a scene.
 */

/* ------------------------------------------------------------------ */
/* geometry                                                            */
/* ------------------------------------------------------------------ */

export type Vec3 = [number, number, number];

export type StudioShape =
  /** Ellipsoid / organic blob. `noise` wobbles the surface (organs, moons). */
  | { kind: "sphere"; r: number; scale?: Vec3; noise?: number; seed?: number }
  | { kind: "box"; size: Vec3 }
  | { kind: "cylinder"; r1: number; r2?: number; h: number; open?: boolean }
  /** A rod/tube swept along a polyline — the workhorse for rays, wires, bones. */
  | { kind: "tube"; points: Vec3[]; radius: number; endRadius?: number }
  | { kind: "cone"; r: number; h: number }
  | { kind: "torus"; r: number; tube: number; arc?: number }
  /** Flat quad — screens, mirrors, plates, planes of a field. */
  | { kind: "plane"; w: number; h: number; doubleSided?: boolean }
  /** Circular disc — lenses, Petri dishes, dials. */
  | { kind: "disc"; r: number; segments?: number };

export type StudioMaterial =
  | "metal"
  | "glass"
  | "wood"
  | "stone"
  | "emissive"
  | "organ"
  | "muscle"
  | "mucosa"
  | "membrane"
  | "wetSkin"
  | "chitin"
  | "wax";

/** Ambient motion so a scene reads as a working apparatus, not a still. */
export type StudioMotion =
  | { kind: "spin"; axis?: "x" | "y" | "z"; speed?: number }
  | { kind: "pulse"; amount?: number; speed?: number }
  | { kind: "swing"; amount?: number; speed?: number }
  | { kind: "flow"; from: Vec3; to: Vec3; speed?: number; count?: number }
  | { kind: "wave"; amplitude?: number; speed?: number };

export type StudioLabel = {
  text: string;
  /** Second line — the takeaway, kept short. */
  sub?: string;
  color?: string;
  /** Where the chip floats; the leader line runs from here to the part. */
  at: Vec3;
};

export type StudioPart = {
  shape: StudioShape;
  at?: Vec3;
  rot?: Vec3;
  material: StudioMaterial;
  color: number | string;
  /** Only draw this part in these views (default: every view). */
  views?: string[];
  /** Hide in these views. */
  except?: string[];
  opacity?: number;
  outline?: boolean;
  label?: StudioLabel;
  motion?: StudioMotion;
  /** Render as instanced copies — setae, field lines, particles. */
  repeat?: { count: number; spread: Vec3 } | { ring: number; radius: number; tilt?: number };
};

/** One row of the knowledge table under the canvas. */
export type StudioRow = {
  name: string;
  fn: string;
  why: string;
};

export type StudioView = {
  id: string;
  /** Switcher label. */
  label: string;
  /** One line explaining what this view shows. */
  hint: string;
  /**
   * Body wall / container behaviour:
   *  - "solid"  full skin or casing (default)
   *  - "ghost"  faint silhouette only (system views)
   *  - "none"   hidden entirely
   */
  shell?: "solid" | "ghost" | "none";
  /** Parts belonging to this view (in addition to un-scoped parts). */
  extra?: StudioPart[];
  /** Knowledge rows for this view. */
  rows?: StudioRow[];
};

export type StudioSpec = {
  /** Studio heading, e.g. "Real optics bench". */
  studio: string;
  /** One line under the heading. */
  blurb: string;
  /** Parts drawn in every view (the model itself). */
  parts: StudioPart[];
  views: StudioView[];
  defaultView?: string;
  /**
   * What this model's outer layer is called — drives the see-through control's
   * wording ("Skin:" for an animal, "Casing:" for an apparatus). Defaults to
   * the neutral "Casing".
   */
  shellWord?: string;
  /** Ground plane / shadow. */
  ground?: boolean;
  camera?: { pad?: number; angle?: Vec3 };
  /** Theory panel under the canvas, in the house Look → Principle → Why form. */
  theory?: { look: string; principle: string; why: string };
};
