"use client";

/**
 * Real Anatomy — Earthworm (Pheretima posthuma), 120 real segments.
 *
 * Everything the NEB / CEE paper asks, as a switchable anatomy model:
 *
 *   120 metameres · clitellum 14–16 · male pores 18 · female pore 14 ·
 *   genital papillae 17–19 · spermathecae 6/7–9/10 · setae 4 pairs per
 *   segment (960 setae) · buccal 1–3 · pharynx 4–6 · calciferous 10–14 ·
 *   gizzard 17–19 · stomach · intestine 20–end · typhlosole · septal,
 *   integumental & pharyngeal nephridia · brain + circumpharyngeal ring +
 *   ventral cord with one pair of ganglia per segment · dorsal & ventral
 *   vessels + 4 pairs of hearts · testes 10,11 · seminal vesicles 9,12 ·
 *   ovaries 13 · blood glands 4–6.
 *
 * Views: External (real skin) · Transparent · Cutaway (clipping plane) ·
 * Digestive · Excretory · Nervous · Circulatory · Reproductive · Process.
 */

import * as THREE from "three";
import { useMemo } from "react";
import { TheoryPanel } from "@/components/lab/theory-panel";
import {
  RealAnatomyViewer,
  skinOpacity,
  wallVisible,
  type RealKit,
  type RealOpts,
  type RealPart,
  type RealView,
  titleText,
} from "./biology-faunal-real-kit";
import {
  earthwormSkinTexture,
  physical,
  organicBlob,
  tubeAlong,
  contactGround,
} from "./biology-faunal-3d-realism";

/* ------------------------------------------------------------------ */
/* anatomy constants (all NEB-asked numbers, in one place)             */
/* ------------------------------------------------------------------ */

export const WORM = {
  segments: 120,
  prostomium: 1,
  clitellumFrom: 14,
  clitellumTo: 16,
  femalePore: 14,
  malePore: 18,
  papillaeFrom: 17,
  papillaeTo: 19,
  spermathecae: [6, 7, 8, 9],
  testes: [10, 11],
  seminalVesicles: [9, 12],
  ovary: 13,
  calciferous: [10, 14],
  gizzard: [17, 19],
  pharynx: [4, 6],
  buccal: [1, 3],
  bloodGlands: [4, 6],
  hearts: [7, 11],
  bodyLength: 26,
};

/** segment number (1-based) → x along the body axis */
export const xAt = (seg: number) =>
  -WORM.bodyLength / 2 + ((seg - 1) / (WORM.segments - 1)) * WORM.bodyLength;

/** realistic radius profile: tapered head, thick mid-body, tapering tail */
export function radiusAt(seg: number): number {
  const head = Math.min(1, 0.34 + seg / 9);
  const tail = Math.min(1, 0.22 + (WORM.segments - seg) / 16);
  const base = 0.9 * Math.min(head, tail);
  const clit =
    seg >= WORM.clitellumFrom && seg <= WORM.clitellumTo
      ? 1.16 + 0.06 * Math.sin(((seg - WORM.clitellumFrom) / 3) * Math.PI)
      : 1;
  return base * clit;
}

/* ------------------------------------------------------------------ */
/* knowledge tables — one per view                                     */
/* ------------------------------------------------------------------ */

const PARTS_EXTERNAL: RealPart[] = [
  { name: "Prostomium (seg 1)", fn: "Small sensory lobe over the mouth; first segment.", why: "Asked as 'the first segment bearing the mouth' — must not be confused with the peristomium." },
  { name: "120 metameres", fn: "Body divided into ~100–120 true segments with external annuli.", why: "The count and the term 'metamerism' are direct one-mark questions." },
  { name: "Clitellum (14–16)", fn: "Glandular saddle secreting the cocoon during reproduction.", why: "Exact segment numbers 14th–16th are frequently asked." },
  { name: "Male genital pores (18)", fn: "Paired ventral-lateral openings with raised lips; sperm exits.", why: "Segment 18 is a standard fill-in-the-blank." },
  { name: "Female pore (14)", fn: "Single mid-ventral opening for eggs.", why: "It is single, not paired — the common trick." },
  { name: "Genital papillae (17–19)", fn: "Gripping pads holding the partner during copulation.", why: "Functional question on why mating pairs stay locked." },
  { name: "Spermathecae pores (6/7–9/10)", fn: "Four pairs of openings receiving the partner's sperm.", why: "Number of pairs and the segment range are both asked." },
  { name: "Setae (4 pairs per segment)", fn: "Tiny S-shaped chitinous bristles for locomotion and anchorage.", why: "Count per segment (8 setae / 4 pairs) is a frequent numerical." },
  { name: "Anus (last segment)", fn: "Terminal opening of the alimentary canal.", why: "Position question: it is in the last segment." },
];

const PARTS_TRANSPARENT: RealPart[] = [
  { name: "Body wall layers", fn: "Cuticle → epidermis → circular muscle → longitudinal muscle → coelomic epithelium.", why: "Layer order questions and peristalsis explanation." },
  { name: "Coelom", fn: "True schizocoelic body cavity with coelomic fluid.", why: "Contrast with acoelomate and pseudocoelomate animals." },
  { name: "Septal nephridia", fn: "One pair per segment from the 15th onward; the main excretory organs.", why: "Three nephridial types are a guaranteed exam table." },
  { name: "Typhlosole", fn: "Longitudinal fold of the intestinal wall increasing absorptive surface.", why: "'Why is the intestine folded internally?' is standard." },
  { name: "Chloragogen cells", fn: "Yellow cells storing glycogen and deaminating proteins.", why: "Their excretory role is often asked as a 'which organ besides nephridia' question." },
];

const PARTS_DIGESTIVE: RealPart[] = [
  { name: "Buccal cavity (1–3)", fn: "Ingestion; muscular sucking action through the mouth.", why: "Segment range asked as a label-matching question." },
  { name: "Pharynx (4–6)", fn: "Pumping chamber; pharyngeal glands lubricate the food.", why: "Why the food does not stick — the gland's role." },
  { name: "Oesophagus (7–13)", fn: "Passage tube leading to the gizzard.", why: "Position identification." },
  { name: "Calciferous glands (10–14)", fn: "Neutralise the humic acid of ingested soil.", why: "Function is a classic two-mark answer." },
  { name: "Gizzard (17–19)", fn: "Muscular mill with ingested sand that grinds food mechanically.", why: "'The grinding mill of the earthworm' — direct question." },
  { name: "Stomach (14–16 region)", fn: "Short muscular region where digestion continues.", why: "Distinguish from the gizzard and note its position." },
  { name: "Intestine (20 to last)", fn: "Digestion and absorption; ends at the anus.", why: "Segment range and function both asked." },
  { name: "Hepatic/intestinal caecae", fn: "Gland cells secreting digestive enzymes into the gut.", why: "'Which part secretes enzymes?' — not the stomach." },
  { name: "Typhlosole (26–35 onward)", fn: "Internal fold nearly doubling the absorption surface.", why: "Diagram + function combination question." },
];

const PARTS_EXCRETORY: RealPart[] = [
  { name: "Septal nephridia (15 onward)", fn: "One pair per segment attached to the septum; nephrostome → loop → nephridiopore.", why: "Their number and position are both asked." },
  { name: "Integumental nephridia (1–14)", fn: "Open into the body wall; discharge on the skin.", why: "Contrast with septal and pharyngeal types." },
  { name: "Pharyngeal nephridia (4, 5, 6)", fn: "Three pairs of compact tufts draining into the pharynx.", why: "Their segments 4th, 5th and 6th are exam-standard." },
  { name: "Nephrostome", fn: "Ciliated funnel collecting coelomic fluid into the nephridium.", why: "Labelled-diagram structure." },
  { name: "Chloragogen cells", fn: "Store glycogen, deaminate proteins and help remove waste from coelom.", why: "'Excretory organ other than nephridia' answer." },
  { name: "Nephridiopores", fn: "External openings through which urine leaves.", why: "Where waste actually exits — frequently confused with the coelomic pores." },
];

const PARTS_NERVOUS: RealPart[] = [
  { name: "Cerebral ganglia / brain (3)", fn: "Pair of fused ganglia above the pharynx; the main association centre.", why: "'Where is the brain?' — 3rd segment, not 1st." },
  { name: "Circumpharyngeal ring", fn: "Connectives looping around the pharynx to the sub-pharyngeal mass.", why: "Must be drawn encircling the pharynx." },
  { name: "Ventral nerve cord", fn: "Double nerve cord running along the mid-ventral body wall.", why: "'Why ventral and not dorsal?' — because the gut occupies the dorsal side." },
  { name: "Segmental ganglia", fn: "One pair of ganglia per segment controlling local peristalsis.", why: "Explains reflex movement after the head is removed." },
  { name: "Brainless reflex", fn: "Excised anterior end still shows movement from segmental ganglia.", why: "The classic experiment-based reasoning question." },
];

const PARTS_CIRCULATORY: RealPart[] = [
  { name: "Dorsal vessel (13 onward)", fn: "Collects blood from the gut wall; beats anteriorly.", why: "Its valve-less forward flow is asked." },
  { name: "Ventral vessel", fn: "Distributes blood backwards via a pair of valves per segment.", why: "Contrast the direction with the dorsal vessel." },
  { name: "4 pairs of hearts (7–11)", fn: "Lateral oesophageal hearts pumping blood from the dorsal to the ventral vessel.", why: "'Number of hearts' — four pairs, in segments 7–11." },
  { name: "Blood glands (4–6)", fn: "Produce blood cells and haemoglobin-containing corpuscles.", why: "Their segment range and function are a standard pair." },
  { name: "Closed circulation", fn: "Blood stays within vessels; haemoglobin is dissolved in plasma, not in red cells.", why: "'Why does the earthworm have no red blood cells?' — the answer." },
];

const PARTS_REPRO: RealPart[] = [
  { name: "Testes (10, 11)", fn: "Two pairs of small white bodies producing sperm.", why: "Their segments are asked directly." },
  { name: "Seminal vesicles (9, 12)", fn: "Two pairs of sacs maturing and storing sperm.", why: "Distinguish from the testes by segment." },
  { name: "Spermathecae (6/7–9/10)", fn: "Four pairs receiving and storing the partner's sperm.", why: "Number of pairs (four) is the trap." },
  { name: "Ovaries (13)", fn: "One pair producing eggs.", why: "Note: one pair, unlike the testes' two." },
  { name: "Oviducts + female pore (14)", fn: "Carry eggs to the single mid-ventral female pore.", why: "One pore only — frequently mis-drawn as paired." },
  { name: "Prostate glands", fn: "Secrete fluid added to sperm at the male pores.", why: "Function question." },
  { name: "Clitellum 14–16 + cocoon", fn: "Secretes the cocoon which slides forward, collecting eggs and sperm.", why: "Cocoon formation sequence is a full-mark question." },
  { name: "Cross fertilisation", fn: "Mutual exchange of sperm; both worms become parents.", why: "'Why is it hermaphrodite yet cross-fertile?' — the head pair." },
];

const PARTS_PROCESS: RealPart[] = [
  { name: "Peristalsis", fn: "Circular and longitudinal muscles contract in waves, moving the worm forward.", why: "Mechanism of locomotion — asked as a two-mark description." },
  { name: "Gut peristalsis", fn: "A muscular wave pushes soil from the gizzard through the intestine.", why: "Explains why digestion continues without the brain." },
  { name: "Cyclosis / circulation", fn: "Dorsal vessel carries blood forward, hearts pump to the ventral vessel, which returns it backwards.", why: "Direction of flow is a standard question." },
  { name: "Nephridial filtration", fn: "Nephrostome collects coelomic fluid; the loop absorbs useful solutes; urine leaves via nephridiopore.", why: "The reabsorption step earns the second mark." },
  { name: "Setae anchorage", fn: "Setae are protracted to grip the soil during contraction.", why: "Explains why an earthworm cannot be pulled from its burrow." },
  { name: "Cocoon ejection", fn: "The cocoon slips off the head within a day; young worms emerge after 2–3 weeks.", why: "Life-cycle timing question." },
];

/* ------------------------------------------------------------------ */
/* views                                                               */
/* ------------------------------------------------------------------ */

const WORM_VIEWS: RealView[] = [
  { id: "external", label: "External (real skin)", hint: "120 true metameres with setae, clitellum 14–16, male pores 18 and the single female pore 14." },
  { id: "transparent", label: "Transparent", hint: "Skin turned glassy — body-wall layers, coelom and the internal organs stay in place." },
  { id: "cutaway", label: "Cutaway", hint: "A clipping plane slices the near half of the body wall open, exposing the gut in situ." },
  { id: "digestive", label: "Digestive", hint: "Mouth to anus: buccal 1–3, pharynx 4–6, calciferous 10–14, gizzard 17–19, intestine 20+, typhlosole." },
  { id: "excretory", label: "Excretory", hint: "All three nephridial types — pharyngeal 4–6, integumental 1–14, septal 15 to end." },
  { id: "nervous", label: "Nervous", hint: "Brain in segment 3, circumpharyngeal ring, ventral cord with one pair of ganglia per segment." },
  { id: "circulatory", label: "Circulatory", hint: "Dorsal vessel, ventral vessel, four pairs of hearts in 7–11 and blood glands in 4–6." },
  { id: "reproductive", label: "Reproductive", hint: "Testes 10,11 · seminal vesicles 9,12 · spermathecae 6/7–9/10 · ovaries 13 · female pore 14 · cocoon." },
  { id: "process", label: "Process", hint: "Everything at once, animating: peristalsis, gut churn, circulation, nephridial filtration, cocoon." },
];

function partsFor(view: RealOpts["view"]): RealPart[] {
  switch (view) {
    case "digestive": return PARTS_DIGESTIVE;
    case "excretory": return PARTS_EXCRETORY;
    case "nervous": return PARTS_NERVOUS;
    case "circulatory": return PARTS_CIRCULATORY;
    case "reproductive": return PARTS_REPRO;
    case "process": return PARTS_PROCESS;
    case "transparent": return PARTS_TRANSPARENT;
    default: return PARTS_EXTERNAL;
  }
}

/* ------------------------------------------------------------------ */
/* builders                                                            */
/* ------------------------------------------------------------------ */

/** skin material for the current view + clarity (clipping plane for cutaway) */
function skinMaterial(opts: RealOpts, map: THREE.Texture, bump: THREE.Texture) {
  const m = physical("wetSkin", 0xffffff, { map, bumpMap: bump, bumpScale: 0.85 });
  const op = skinOpacity(opts.clarity);
  m.transparent = op < 1;
  m.opacity = op;
  m.side = THREE.DoubleSide;
  if (opts.view === "cutaway") {
    // real clipping: remove the +Z half so the interior is exposed
    m.clippingPlanes = [new THREE.Plane(new THREE.Vector3(0, 0, -1), 0.15)];
    m.clipShadows = true;
  }
  return m;
}

/** 120 real segment rings + setae, returned with the body group */
function segmentedBody(
  skin: THREE.Material,
  skinGhost: THREE.Material,
  opts: RealOpts,
  showSetae: boolean,
  /**
   * Single-system view: draw only the segment cage, never the skin tube.
   * A translucent TUBE still stacks its front and back faces, so it renders
   * as a pale solid rod that hides the very organs the view exists to show.
   * The annuli alone give the segment context without occluding anything.
   */
  cageOnly = false,
) {
  const g = new THREE.Group();

  // smooth continuous skin tube underneath the rings
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i <= 60; i++) {
    const seg = 1 + (i / 60) * (WORM.segments - 1);
    pts.push(new THREE.Vector3(xAt(seg), Math.sin((seg / WORM.segments) * 9) * 0.1, 0));
  }
  if (!cageOnly) {
    const body = tubeAlong(pts, (t) => radiusAt(1 + t * (WORM.segments - 1)), 220, 30, skin);
    g.add(body);
  }

  // 120 annuli — one per real metamere
  const ringMat = new THREE.MeshPhysicalMaterial({
    color: 0xa9683f,
    roughness: 0.5,
    clearcoat: 0.35,
    clearcoatRoughness: 0.45,
    transparent: true,
    // In a system view the cage stays faint; with the skin on it tracks the
    // skin's own opacity, floored so the segment count never vanishes.
    opacity: cageOnly
      ? 0.17
      : Math.max(0.24, (skin as THREE.MeshPhysicalMaterial).opacity ?? 1),
  });
  if (opts.view === "cutaway") {
    ringMat.clippingPlanes = [new THREE.Plane(new THREE.Vector3(0, 0, -1), 0.15)];
  }
  for (let seg = 2; seg < WORM.segments; seg += 1) {
    const r = radiusAt(seg);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(r * 1.005, 0.028, 8, 26), ringMat);
    ring.rotation.y = Math.PI / 2;
    ring.position.x = xAt(seg);
    g.add(ring);
  }

  // 4 pairs of setae per segment (except the first and last) — instanced
  if (showSetae) {
    const count = (WORM.segments - 2) * 8;
    const geoS = new THREE.CylinderGeometry(0.012, 0.018, 0.17, 5);
    const matS = physical("chitin", 0x3f2a17);
    const inst = new THREE.InstancedMesh(geoS, matS, count);
    const angles = [-155, -125, -55, -25, 25, 55, 125, 155].map((a) => (a * Math.PI) / 180);
    const m4 = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const up = new THREE.Vector3(0, 1, 0);
    let k = 0;
    for (let seg = 2; seg < WORM.segments; seg += 1) {
      const r = radiusAt(seg);
      for (const a of angles) {
        const dir = new THREE.Vector3(0, Math.cos(a), Math.sin(a)).normalize();
        const pos = new THREE.Vector3(xAt(seg) + 0.02, dir.y * r * 0.98, dir.z * r * 0.98);
        q.setFromUnitVectors(up, dir);
        m4.compose(pos, q, new THREE.Vector3(1, 1, 1));
        inst.setMatrixAt(k++, m4);
      }
    }
    inst.instanceMatrix.needsUpdate = true;
    g.add(inst);
  }

  void skinGhost;
  return g;
}

/** the gut, in real segment order */
function gutGroup(opts: RealOpts, ghost = false) {
  const g = new THREE.Group();
  const op = ghost ? 0.3 : 1;
  const part = (
    segFrom: number,
    segTo: number,
    radius: number,
    color: number,
    preset: "mucosa" | "muscle" | "organ",
  ) => {
    const a = xAt(segFrom);
    const b = xAt(segTo);
    const p: THREE.Vector3[] = [new THREE.Vector3(a, 0.12, 0), new THREE.Vector3((a + b) / 2, 0.06, 0), new THREE.Vector3(b, 0.02, 0)];
    const m = tubeAlong(p, () => radius, 60, 16, physical(preset, color, { opacity: op }));
    if (op < 1) {
      (m.material as THREE.MeshPhysicalMaterial).transparent = true;
    }
    return m;
  };
  g.add(part(WORM.buccal[0], WORM.buccal[1], 0.3, 0xf0b27a, "mucosa"));
  g.add(part(WORM.pharynx[0], WORM.pharynx[1], 0.32, 0xe8a06a, "mucosa"));
  g.add(part(7, 13, 0.24, 0xd9a06a, "mucosa"));
  g.add(part(WORM.calciferous[0], WORM.calciferous[1], 0.28, 0xf5d6a8, "organ"));
  g.add(part(WORM.gizzard[0], WORM.gizzard[1], 0.4, 0xb3522c, "muscle"));
  g.add(part(WORM.clitellumFrom, WORM.clitellumTo, 0.3, 0xc2632f, "muscle"));
  g.add(part(20, 118, 0.33, 0x9f7a4a, "mucosa"));
  void opts;
  return g;
}

/* ------------------------------------------------------------------ */
/* the scene                                                           */
/* ------------------------------------------------------------------ */

export function RealEarthwormScene() {
  const tex = useMemo(() => earthwormSkinTexture(), []);

  return (
    <RealAnatomyViewer
      title="Earthworm — 120-segment real anatomy"
      subtitle="Pheretima posthuma · every segment, pore and system switchable · real skin texture, transparency, cutaway and process animation"
      views={WORM_VIEWS}
      parts={PARTS_EXTERNAL}
      partsFor={partsFor}
      build={(kit: RealKit, opts) => {
        const g = kit.ts.group;
        const showSkin = wallVisible(opts.view, opts.clarity);
        const skin = skinMaterial(opts, tex.map, tex.bump);
        if (opts.view === "transparent" || opts.clarity !== "opaque") {
          skin.transmission = opts.clarity === "xray" ? 0.6 : 0.3;
          skin.ior = 1.35;
          skin.roughness = 0.3;
        }
        // tiling along the tube so the banding reads at real segment scale
        tex.map.repeat.set(6, 1);
        tex.bump.repeat.set(6, 1);

        const bodyGhost = physical("membrane", 0xffd9b3, { opacity: 0.11 });
        // In a single-system view the body wall is not the subject — but
        // hiding it outright leaves the organs floating with no anatomy to
        // place them in. Render it as a faint silhouette instead: the system
        // reads in context and you can still see exactly which segment a part
        // sits in.
        const body = segmentedBody(
          showSkin ? skin : bodyGhost,
          bodyGhost,
          opts,
          showSkin && opts.view !== "transparent",
          !showSkin,
        );
        g.add(body);

        // prostomium + mouth + anus
        if (showSkin) {
          const prost = new THREE.Mesh(organicBlob(0.3, 3, 2, 0.1), physical("organ", 0x8a4a2c));
          prost.scale.set(1.2, 0.6, 0.8);
          prost.position.set(xAt(1) - 0.18, 0.1, 0);
          g.add(prost);
          const mouth = new THREE.Mesh(organicBlob(0.2, 4, 1, 0.1), physical("mucosa", 0x1a0d07));
          mouth.scale.set(0.6, 0.55, 0.85);
          mouth.position.set(xAt(1) - 0.28, -0.5, 0);
          g.add(mouth);
          const anus = new THREE.Mesh(organicBlob(0.14, 5, 1, 0.1), physical("mucosa", 0x2b160c));
          anus.position.set(xAt(120) + 0.2, 0, 0);
          g.add(anus);

          // clitellum saddle
          const cl = new THREE.Mesh(new THREE.CylinderGeometry(radiusAt(15) * 1.06, radiusAt(15) * 1.06, (xAt(17) - xAt(14)), 32), physical("organ", 0xc06a3a));
          cl.rotation.z = Math.PI / 2;
          cl.position.x = xAt(15.5);
          cl.scale.z = 0.96;
          g.add(cl);
        }

        // ── system galleries ──
        const wantDig = opts.view === "digestive" || opts.view === "process" || opts.view === "transparent";
        const wantExcr = opts.view === "excretory" || opts.view === "process";
        const wantNerv = opts.view === "nervous" || opts.view === "process";
        const wantCirc = opts.view === "circulatory" || opts.view === "process";
        const wantRepro = opts.view === "reproductive" || opts.view === "process";

        const gut = gutGroup(opts, opts.view !== "digestive");
        if (wantDig) g.add(gut);

        // typhlosole — intestinal internal fold
        const typh: THREE.Mesh[] = [];
        if (wantDig) {
          for (let seg = 30; seg <= 112; seg += 2) {
            const t = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.12, 0.34), physical("muscle", 0x7a5a34));
            t.position.set(xAt(seg), 0.12, 0);
            g.add(t);
            typh.push(t);
          }
        }

        // excretory — three nephridial types
        const nephridia: THREE.Mesh[] = [];
        if (wantExcr) {
          for (let seg = 15; seg <= 116; seg += 1) {
            const r = radiusAt(seg);
            const loop = new THREE.Mesh(new THREE.TorusGeometry(0.075, 0.017, 6, 14), physical("organ", 0x7cc7a0));
            loop.rotation.y = Math.PI / 2;
            loop.position.set(xAt(seg), -0.12, 0.16);
            loop.scale.set(1, 1 + (r - 0.6) * 0.6, 1);
            g.add(loop);
            nephridia.push(loop);
          }
          // pharyngeal nephridia (4,5,6)
          for (const seg of [4, 5, 6]) {
            const tuft = new THREE.Mesh(new THREE.TorusKnotGeometry(0.07, 0.02, 32, 6), physical("organ", 0x4ade80));
            tuft.position.set(xAt(seg), -0.16, -0.1);
            g.add(tuft);
            nephridia.push(tuft);
          }
          // integumental nephridia (1–14) — tiny pores on the wall
          for (let seg = 1; seg <= 14; seg += 1) {
            const pore = new THREE.Mesh(new THREE.SphereGeometry(0.03, 8, 6), physical("organ", 0xa7f3d0));
            pore.position.set(xAt(seg), -0.06, radiusAt(seg) * 0.95);
            g.add(pore);
          }
        }

        // nervous system
        const ganglia: THREE.Mesh[] = [];
        let brain: THREE.Mesh | null = null;
        if (wantNerv) {
          brain = new THREE.Mesh(organicBlob(0.14, 8, 1, 0.12), physical("organ", 0xf2b8d0));
          brain.position.set(xAt(3), 0.24, 0);
          g.add(brain);
          const ringA = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.03, 6, 20), physical("organ", 0xeab0c8));
          ringA.rotation.y = Math.PI / 2;
          ringA.position.set(xAt(4.5), 0.05, 0);
          g.add(ringA);
          // ventral nerve cord
          const cordPts: THREE.Vector3[] = [];
          for (let i = 0; i <= 40; i++) {
            const seg = 4 + (i / 40) * 114;
            cordPts.push(new THREE.Vector3(xAt(seg), -0.3, -0.05));
          }
          g.add(tubeAlong(cordPts, () => 0.035, 160, 8, physical("organ", 0xfae1ee)));
          for (let seg = 5; seg <= 118; seg += 1) {
            const gan = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 6), physical("organ", 0xf6c6dd));
            gan.position.set(xAt(seg), -0.3, -0.05);
            g.add(gan);
            ganglia.push(gan);
          }
        }

        // circulatory system
        const hearts: THREE.Mesh[] = [];
        const flow: THREE.Mesh[] = [];
        if (wantCirc) {
          const dorsalPts: THREE.Vector3[] = [];
          for (let i = 0; i <= 30; i++) {
            const seg = 13 + (i / 30) * 105;
            dorsalPts.push(new THREE.Vector3(xAt(seg), radiusAt(seg) * 0.6, 0));
          }
          g.add(tubeAlong(dorsalPts, () => 0.055, 120, 8, physical("muscle", 0xb91c1c)));
          const ventralPts: THREE.Vector3[] = [];
          for (let i = 0; i <= 30; i++) {
            const seg = 1 + (i / 30) * 117;
            ventralPts.push(new THREE.Vector3(xAt(seg), -radiusAt(seg) * 0.55, 0.12));
          }
          g.add(tubeAlong(ventralPts, () => 0.06, 120, 8, physical("muscle", 0x7f1d1d)));
          // four pairs of lateral oesophageal hearts, segments 7–11
          for (const seg of [7, 8, 9, 10]) {
            const h = new THREE.Mesh(organicBlob(0.13, seg, 1, 0.1), physical("muscle", 0xc2262a));
            h.position.set(xAt(seg), 0.02, 0);
            g.add(h);
            hearts.push(h);
          }
          // blood glands 4–6
          for (const seg of [4, 5, 6]) {
            const bg = new THREE.Mesh(new THREE.SphereGeometry(0.08, 10, 8), physical("organ", 0xf59e0b));
            bg.position.set(xAt(seg), 0.22, 0.1);
            g.add(bg);
          }
          // flow particles along the vessels (animated)
          const flowMat = physical("organ", 0xfecaca);
          for (let i = 0; i < 26; i++) {
            const dot = new THREE.Mesh(new THREE.SphereGeometry(0.035, 6, 5), flowMat);
            g.add(dot);
            flow.push(dot);
          }
        }

        // reproductive system
        if (wantRepro) {
          for (const seg of WORM.testes) {
            const t = new THREE.Mesh(new THREE.SphereGeometry(0.12, 12, 10), physical("organ", 0xf3d34a));
            t.position.set(xAt(seg), -0.05, 0.14);
            g.add(t);
          }
          for (const seg of WORM.seminalVesicles) {
            const v = new THREE.Mesh(organicBlob(0.17, seg, 1, 0.1), physical("organ", 0xfde68a));
            v.position.set(xAt(seg), 0.06, -0.16);
            g.add(v);
          }
          for (const seg of WORM.spermathecae) {
            const s = new THREE.Mesh(organicBlob(0.14, seg + 1, 1, 0.1), physical("organ", 0xfbcfe8));
            s.position.set(xAt(seg) + 0.15, 0.1, 0.16);
            g.add(s);
          }
          const ov = new THREE.Mesh(organicBlob(0.13, 13, 1, 0.1), physical("organ", 0xf9a8d4));
          ov.position.set(xAt(WORM.ovary), -0.06, 0.14);
          g.add(ov);
          // cocoon beside the clitellum
          const cocoon = new THREE.Mesh(new THREE.SphereGeometry(0.42, 20, 14), physical("membrane", 0xf5e6c8, { opacity: 0.55 }));
          cocoon.scale.set(1.5, 0.8, 0.8);
          cocoon.position.set(xAt(34), -1.5, 0);
          g.add(cocoon);
        }

        // pores & papillae markers (always useful for orientation)
        if (showSkin) {
          const male = new THREE.Mesh(organicBlob(0.09, 18, 1, 0.1), physical("organ", 0xffe4b5));
          male.position.set(xAt(WORM.malePore), -0.12, radiusAt(18) * 0.9);
          g.add(male);
          const male2 = male.clone();
          male2.position.z = -radiusAt(18) * 0.9;
          g.add(male2);
          const female = new THREE.Mesh(organicBlob(0.09, 14, 1, 0.1), physical("organ", 0xffd6e7));
          female.position.set(xAt(WORM.femalePore), -radiusAt(14) * 0.92, 0);
          g.add(female);
        }

        /* ---- labels ---- */
        /*
         * Label placement rule: the head happens to carry most of the
         * exam-asked structures (1, 6, 7, 10, 12, 14, 15, 18), so their
         * chips are spread across distinct vertical lanes — alternating
         * above and below the body with at least ~3 units between chips at
         * similar x. Otherwise they stack into an unreadable pile.
         */
        const segLabel = (
          seg: number,
          color: string,
          t: string,
          sub: string,
          dy = 3.0,
          dz = 0,
          dx = 0,
        ) =>
          kit.add(
            color,
            t,
            sub,
            new THREE.Vector3(xAt(seg) + dx, dy, dz),
            new THREE.Vector3(xAt(seg), 0.2, 0),
          );

        // Lanes: ±2.8, ±6.2, ±9.6 give ≥3.4-unit gaps — more than one chip
        // height apart on screen, so nothing ever overlaps at the head.
        if (opts.view === "external" || opts.view === "process") {
          segLabel(1, "#fbbf24", "Prostomium (seg 1)", "sensory lobe over the mouth", 2.8, 0, -1.8);
          segLabel(6, "#fbcfe8", "Spermathecae (6/7–9/10)", "four pairs receiving partner sperm", -2.8, 0, -0.6);
          segLabel(14, "#ec4899", "Female pore (seg 14)", "single mid-ventral egg opening", 6.2, 0, 0.8);
          segLabel(15, "#c2410c", "Clitellum (14–16)", "glandular saddle → secretes the cocoon", 9.6, 0, 2.0);
          segLabel(18, "#f59e0b", "Male pores (seg 18)", "paired sperm exits with raised lips", -6.2, 0, 3.0);
          segLabel(60, "#fcd34d", "120 metameres", "one annulus per real segment; 8 setae each", 2.8);
          segLabel(120, "#a16207", "Anus (seg 120)", "waste soil, 'castings', exits here", -2.8);
        }
        if (opts.view === "transparent") {
          segLabel(3, "#38bdf8", "Body wall layers", "cuticle → epidermis → circular → longitudinal muscle", 3.0);
          segLabel(45, "#7cc7a0", "Coelom + septal nephridia", "true coelom; 1 pair of nephridia per segment", -3.0);
          segLabel(70, "#a3e635", "Typhlosole", "intestinal fold doubling absorptive surface", 3.0);
        }
        if (wantDig) {
          segLabel(2, "#f0b27a", "Buccal cavity (1–3)", "ingestion; muscular sucking", 2.8, 0, -1.8);
          segLabel(5, "#e8a06a", "Pharynx (4–6)", "pumping chamber; glands lubricate food", -2.8, 0, -0.4);
          segLabel(12, "#f5d6a8", "Calciferous glands (10–14)", "neutralise humic acid of soil", 6.2, 0, 0.8);
          segLabel(18, "#b3522c", "Gizzard (17–19)", "muscular mill grinding with sand", -6.2, 0, 2.8);
          segLabel(36, "#eab308", "Hepatic caecae", "gland cells secreting digestive enzymes", 2.8, 0, 0.4);
          segLabel(60, "#9f7a4a", "Intestine (20 → 120)", "digestion + absorption to the anus", 5.4);
          segLabel(90, "#a3e635", "Typhlosole (26–112)", "internal fold: more surface, more absorption", -2.8);
        }
        if (wantExcr) {
          segLabel(5, "#4ade80", "Pharyngeal nephridia (4–6)", "three pairs draining into the pharynx", 2.8, 0, -1.6);
          segLabel(8, "#a7f3d0", "Integumental nephridia (1–14)", "open on the skin surface", -2.8, 0, 0.8);
          segLabel(40, "#7cc7a0", "Septal nephridia (15 → end)", "1 pair per segment — the main excretory organs", 3.0);
          segLabel(40, "#d1fae5", "Nephrostome → loop → pore", "funnel collects coelomic fluid, loop reabsorbs", -6.4);
        }
        if (wantNerv) {
          segLabel(3, "#f2b8d0", "Brain / cerebral ganglia (seg 3)", "association centre above the pharynx", 2.8, 0, -1.6);
          segLabel(5, "#eab0c8", "Circumpharyngeal ring", "connectives looping around the pharynx", -2.8, 0, 1.0);
          segLabel(70, "#fae1ee", "Ventral nerve cord", "double cord along the mid-ventral wall", 3.0);
          segLabel(95, "#f6c6dd", "Segmental ganglia (one pair/segment)", "local reflex control — movement without the brain", -3.0);
        }
        if (wantCirc) {
          segLabel(60, "#b91c1c", "Dorsal vessel (13 →)", "carries blood forward; no valves", 3.0);
          segLabel(60, "#7f1d1d", "Ventral vessel", "distributes blood backwards; valves per segment", -3.0);
          segLabel(8, "#c2262a", "Hearts — 4 pairs (7–11)", "lateral oesophageal hearts pump dorsal → ventral", 2.8, 0, 1.6);
          segLabel(5, "#f59e0b", "Blood glands (4–6)", "produce blood cells; Hb dissolved in plasma", -6.4, 0, -1.6);
        }
        if (wantRepro) {
          segLabel(10, "#f3d34a", "Testes (10, 11)", "two pairs producing sperm", 2.8, 0, -0.8);
          segLabel(12, "#fde68a", "Seminal vesicles (9, 12)", "two pairs maturing and storing sperm", -2.8, 0, 0.6);
          segLabel(7, "#fbcfe8", "Spermathecae (6/7–9/10)", "four pairs store the partner's sperm", 6.2, 0, -2.0);
          segLabel(13, "#f9a8d4", "Ovary (seg 13)", "one pair producing eggs → female pore 14", -6.2, 0, 2.0);
          segLabel(34, "#f5e6c8", "Cocoon", "slides forward collecting eggs + sperm; cross fertilisation", -2.8);
        }

        titleText(
          kit.ts,
          opts.view === "process"
            ? "Earthworm — processes running live"
            : `Earthworm — ${WORM_VIEWS.find((v) => v.id === opts.view)?.label ?? ""}`,
          new THREE.Vector3(0, 3.6, 0),
        );
        contactGround(kit.ts.scene, -2.3, 30);

        /* ---- animation ---- */
        return (t: number) => {
          const on = opts.process || opts.view === "process";
          // peristalsis: a slow muscular wave travelling tail-ward
          if (body.visible) {
            const wave = Math.sin(t * 1.6);
            body.scale.y = 1 + 0.018 * wave;
            body.scale.z = 1 + 0.018 * wave;
          }
          if (on) {
            typh.forEach((m, i) => {
              m.scale.y = 0.9 + 0.5 * Math.abs(Math.sin(t * 2.2 - i * 0.25));
            });
            nephridia.forEach((n, i) => {
              const s = 1 + 0.22 * Math.sin(t * 3.2 - i * 0.3);
              n.scale.setScalar(s);
            });
            ganglia.forEach((gn, i) => {
              (gn.material as THREE.MeshPhysicalMaterial).emissive = new THREE.Color(0xf472b6);
              (gn.material as THREE.MeshPhysicalMaterial).emissiveIntensity = 0.25 + 0.55 * Math.abs(Math.sin(t * 3 - i * 0.35));
            });
            if (brain) {
              (brain.material as THREE.MeshPhysicalMaterial).emissive = new THREE.Color(0xf9a8d4);
              (brain.material as THREE.MeshPhysicalMaterial).emissiveIntensity = 0.3 + 0.4 * Math.abs(Math.sin(t * 2.4));
            }
            hearts.forEach((h, i) => {
              const b = 1 + 0.18 * Math.abs(Math.sin(t * 4.4 - i * 0.4));
              h.scale.setScalar(b);
            });
            // blood flow: dorsal forward, ventral backward
            flow.forEach((dot, i) => {
              const k = ((t * 0.12 + i / flow.length) % 1);
              const seg = opts.view === "circulatory" && i % 2 ? 1 + k * 117 : 13 + (1 - k) * 102;
              const top = i % 2 === 0;
              dot.position.set(
                xAt(seg),
                top ? radiusAt(seg) * 0.6 : -radiusAt(seg) * 0.5,
                top ? 0 : 0.12,
              );
            });
          }
          // gentle life-motion always
          if (body.visible) body.rotation.z = Math.sin(t * 0.8) * 0.012;
        };
      }}
      footer={
        <TheoryPanel
          title="Theory — Earthworm (Pheretima posthuma) real anatomy"
          look="A long segmented body of about 120 annuli in wet reddish-brown skin, each ring carrying four pairs of tiny S-shaped setae. Segments 14–16 form the paler glandular clitellum. Under the glassy skin the gut runs mouth → buccal cavity → pharynx with calciferous glands → gizzard → long intestine folded internally by the typhlosole; a pale nerve cord with a pair of ganglia per segment runs mid-ventrally to the brain in segment 3; red vessels and four pairs of hearts loop around the oesophagus; gonads and spermathecae sit in the anterior third with a cocoon beside the clitellum."
          principle="The earthworm is a metamerically segmented coelomate: each segment repeats muscles, setae, nephridia, ganglia and vessels, which is why peristalsis, excretion and reflex movement work segment-by-segment. Digestion is mechanical (gizzard with sand) and enzymatic (hepatic caecae); the typhlosole enlarges the absorptive surface. Excretion uses three nephridial types; circulation is closed with haemoglobin dissolved in plasma. It is hermaphrodite but practises cross fertilisation, exchanging sperm through spermathecae and shedding a cocoon from the clitellum."
          why="Every one of these numbers and systems — 120 segments, clitellum 14–16, male pores 18, single female pore 14, 4 pairs of spermathecae, 4 pairs of hearts in 7–11, 8 setae per segment, three nephridial types — is asked directly in NEB and CEE. Switching between external, transparent, cutaway and per-system views lets you revise exactly the view the question describes."
        />
      }
    />
  );
}

export default RealEarthwormScene;
