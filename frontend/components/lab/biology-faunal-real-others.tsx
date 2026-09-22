"use client";

/**
 * Real Anatomy — the rest of the faunal unit, same treatment as the earthworm:
 * real skin materials, transparency / cutaway views, one view per organ
 * system, and process animation (cyclosis, conjugation, heartbeat, flow).
 */

import * as THREE from "three";
import { useMemo } from "react";
import { TheoryPanel } from "@/components/lab/theory-panel";
import {
  RealAnatomyViewer,
  skinOpacity,
  titleText,
  type RealKit,
  type RealOpts,
  type RealPart,
  type RealView,
} from "./biology-faunal-real-kit";
import {
  frogSkinTexture,
  protozoaCytoplasmTexture,
  bloodTissueTexture,
  physical,
  organicBlob,
  tubeAlong,
  contactGround,
} from "./biology-faunal-3d-realism";

/* ══════════════════════ PARAMECIUM ══════════════════════ */

const PARA_VIEWS: RealView[] = [
  { id: "external", label: "External (real)", hint: "Glassy pellicle with ciliary rows in metachronal waves and the sunken oral groove." },
  { id: "transparent", label: "Transparent", hint: "All organelles visible in position: nuclei, food vacuoles, contractile vacuoles with canals, trichocysts." },
  { id: "digestive", label: "Food & digestion", hint: "Oral groove → cytostome → cytopharynx → food vacuole route with cyclosis." },
  { id: "excretory", label: "Osmoregulation", hint: "Two contractile vacuoles with radiating canals, filling and discharging alternately." },
  { id: "process", label: "Process", hint: "Cyclosis, the vacuolar cycle and ciliary beating running together." },
  { id: "reproductive", label: "Reproduction", hint: "Transverse binary fission beside conjugation with migrating pronuclei." },
];

const PARA_PARTS: Record<string, RealPart[]> = {
  external: [
    { name: "Pellicle", fn: "Tough elastic membrane with alveoli fixing the slipper shape.", why: "Explains how a naked cell keeps a constant shape." },
    { name: "Cilia (thousands)", fn: "Fine hairs beating in metachronal waves for locomotion and feeding currents.", why: "Ciliate identity — and the phrase 'metachronal wave' earns a mark." },
    { name: "Oral groove", fn: "Ciliated depression sweeping food toward the cytostome.", why: "Distinguishes the ventral feeding side." },
    { name: "Trichocysts", fn: "Thread-like defensive organelles discharged on irritation.", why: "'Which organelle is used for defence?' — direct question." },
  ],
  transparent: [
    { name: "Macronucleus", fn: "Large kidney-shaped nucleus controlling metabolism and growth.", why: "Distinguish from the micronucleus's genetic role." },
    { name: "Micronucleus", fn: "Small nucleus responsible for inheritance and conjugation.", why: "'Which nucleus takes part in conjugation?' — the micronucleus." },
    { name: "Food vacuoles", fn: "Digest food in a circulating route (cyclosis).", why: "Cyclosis is a standard term." },
    { name: "Contractile vacuoles (2)", fn: "Osmoregulation — expel excess water with radiating canals.", why: "Why freshwater protists need them is the reasoning mark." },
    { name: "Cytopyge / anal pore", fn: "Site where undigested matter is egested.", why: "Completes the feeding cycle question." },
  ],
  digestive: [
    { name: "Oral groove → cytostome", fn: "Food particles enter through the cell mouth.", why: "Sequence question: groove before mouth." },
    { name: "Cytopharynx", fn: "Short gullet forming the food vacuole at its tip.", why: "Vacuole formation site." },
    { name: "Food vacuole circulation", fn: "Digestion by enzymes, absorption, then egestion.", why: "Full five-step food cycle answer." },
  ],
  excretory: [
    { name: "Contractile vacuole", fn: "Fills by collecting fluid, then contracts to expel it.", why: "Alternating action of the two vacuoles is asked." },
    { name: "Radiating canals", fn: "Collect water from the cytoplasm into the vacuole.", why: "Identify them in the diagram." },
    { name: "Osmoregulation reason", fn: "Freshwater is hypotonic, so water enters continuously.", why: "The 'why' behind the whole system." },
  ],
  process: [
    { name: "Cyclosis", fn: "Cycloplasmic streaming moving vacuoles through a fixed route.", why: "Named process question." },
    { name: "Ciliary beat", fn: "Metachronal coordination produces smooth swimming.", why: "Mechanism of locomotion." },
    { name: "Vacuolar cycle", fn: "Each vacuole fills and empties about every 10–15 seconds.", why: "Timing question." },
  ],
  reproductive: [
    { name: "Transverse binary fission", fn: "Asexual: divides across the body into two daughters.", why: "Plane of division (transverse, not longitudinal) is asked." },
    { name: "Conjugation", fn: "Two individuals join, exchange haploid pronuclei.", why: "Sexual process and its purpose (variation) both asked." },
    { name: "Micronucleus division", fn: "Micronucleus → meiosis → 8 nuclei → 1 survives → exchanged.", why: "Step sequence earns full marks." },
  ],
};

function paraPartsFor(view: RealOpts["view"]): RealPart[] {
  return PARA_PARTS[view] ?? PARA_PARTS.external;
}

export function RealParameciumScene() {
  const tex = useMemo(() => protozoaCytoplasmTexture(), []);
  return (
    <RealAnatomyViewer
      title="Paramecium caudatum — real ultrastructure"
      subtitle="Transparent body with every organelle in place · cyclosis, osmoregulation and conjugation as switchable views"
      views={PARA_VIEWS}
      parts={PARA_PARTS.external}
      partsFor={paraPartsFor}
      build={(kit: RealKit, opts) => {
        const g = kit.ts.group;
        const bodyVisible = opts.view !== "digestive" && opts.view !== "excretory" && opts.view !== "process";
        const op = opts.clarity === "opaque" ? 0.92 : opts.clarity === "semi" ? 0.4 : 0.16;

        // cytoplasm body
        const cyto = new THREE.Mesh(
          new THREE.SphereGeometry(2.2, 56, 36),
          physical("membrane", 0xffffff, { map: tex, opacity: bodyVisible ? op : 0.09 }),
        );
        cyto.material.transmission = opts.clarity === "opaque" ? 0.25 : 0.55;
        cyto.scale.set(1.62, 0.78, 0.95);
        g.add(cyto);

        // pellicle
        const pell = new THREE.Mesh(
          new THREE.SphereGeometry(2.27, 56, 36),
          physical("membrane", 0x67e8f9, { opacity: bodyVisible ? Math.min(op, 0.34) : 0.07 }),
        );
        pell.material.transmission = 0.7;
        pell.material.ior = 1.42;
        pell.scale.set(1.62, 0.78, 0.95);
        g.add(pell);

        // cilia — 96 shafts in metachronal rows
        const cilia: THREE.Mesh[] = [];
        const ciliaMat = physical("chitin", 0xf97316);
        for (let i = 0; i < 96; i++) {
          const a = (i / 96) * Math.PI * 2;
          const s = cylMesh(0.018, 0.045, 0.5, ciliaMat);
          s.position.set(Math.cos(a) * 3.5, 0, Math.sin(a) * 2.05);
          s.rotation.z = -Math.PI / 2 * Math.sign(Math.cos(a) || 1);
          s.rotation.x = Math.sin(a) > 0 ? 0.32 : -0.32;
          g.add(s);
          cilia.push(s);
        }

        // oral groove
        for (let i = 0; i < 12; i++) {
          const t = i / 11;
          const b = new THREE.Mesh(
            new THREE.BoxGeometry(0.13, 0.04, 0.7 - 0.32 * Math.abs(t - 0.5)),
            physical("mucosa", 0xfbbf24, { opacity: 0.85 }),
          );
          b.position.set(2.7 - 2.3 * t, 0.34 - 0.5 * t, 0.85 * Math.sin(t * Math.PI) * 0.6);
          g.add(b);
        }

        // nuclei + vacuoles + trichocysts
        const macro = new THREE.Mesh(organicBlob(0.6, 13, 2, 0.16), physical("organ", 0xc2410c));
        macro.scale.set(1.3, 0.82, 0.9);
        macro.position.set(-0.35, 0.22, 0);
        g.add(macro);
        const micro = new THREE.Mesh(organicBlob(0.19, 17, 1, 0.1), physical("organ", 0x7c3aed));
        micro.position.set(0.6, 0.05, 0.22);
        g.add(micro);

        const foods: THREE.Mesh[] = [];
        for (let i = 0; i < 8; i++) {
          const f = new THREE.Mesh(
            organicBlob(0.12 + 0.04 * (i % 3), i * 11 + 2, 1, 0.12),
            physical("organ", i % 2 ? 0x34d399 : 0xa3e635, { opacity: 0.95 }),
          );
          g.add(f);
          foods.push(f);
        }

        const cvs: { node: THREE.Group; base: THREE.Vector3; v: THREE.Mesh }[] = [];
        for (const cx of [-2.05, 2.0]) {
          const grp = new THREE.Group();
          const v = new THREE.Mesh(organicBlob(0.34, cx * 3, 1, 0.08), physical("membrane", 0x38bdf8, { opacity: 0.6 }));
          grp.add(v);
          for (let i = 0; i < 6; i++) {
            const a = (i / 6) * Math.PI * 2;
            grp.add(segMesh(new THREE.Vector3(0, 0, 0), new THREE.Vector3(Math.cos(a) * 0.6, Math.sin(a) * 0.6, 0), 0x7dd3fc, 0.02));
          }
          grp.position.set(cx, cx > 0 ? -0.42 : 0.42, 0);
          g.add(grp);
          cvs.push({ node: grp, base: grp.position.clone(), v });
        }

        for (let i = 0; i < 20; i++) {
          const a = (i / 20) * Math.PI * 2;
          const tr = segMesh(
            new THREE.Vector3(Math.cos(a) * 3.3, 0.25, Math.sin(a) * 1.95),
            new THREE.Vector3(Math.cos(a) * 3.7, 0.3, Math.sin(a) * 2.15),
            0xfda4af,
            0.016,
          );
          g.add(tr);
        }

        /* labels */
        kit.add("#67e8f9", "Pellicle", "elastic alveoli-fixed membrane", new THREE.Vector3(-4.2, 3.4, 0), new THREE.Vector3(-2.6, 0.5, 0.6));
        kit.add("#f97316", "Cilia — metachronal waves", "locomotion + feeding current", new THREE.Vector3(0.4, 2.7, 1.2), new THREE.Vector3(1.6, 0.2, 1.9));
        if (opts.view !== "reproductive") {
          kit.add("#c2410c", "Macronucleus", "metabolism & growth", new THREE.Vector3(-3.4, -2.5, 0), new THREE.Vector3(-0.5, 0.25, 0));
          kit.add("#7c3aed", "Micronucleus", "inheritance; conjugates", new THREE.Vector3(0.4, -2.8, 0.5), new THREE.Vector3(0.6, 0.05, 0.25));
          kit.add("#fbbf24", "Oral groove → cytostome", "feeding current enters", new THREE.Vector3(4.2, 2.4, 0.6), new THREE.Vector3(2.0, -0.3, 0.4));
          kit.add("#34d399", "Food vacuoles", "digestion along the cyclosis route", new THREE.Vector3(3.0, -2.6, -0.6), new THREE.Vector3(0.4, -0.4, -0.3));
          kit.add("#38bdf8", "Contractile vacuoles (2)", "fill → contract → expel water", new THREE.Vector3(-3.4, -4.4, 0.4), new THREE.Vector3(-2.15, 0.4, 0));
        }
        if (opts.view === "excretory" || opts.view === "process") {
          kit.add("#7dd3fc", "Radiating canals (6 each)", "collect fluid into the vacuole", new THREE.Vector3(4.0, 2.3, -0.5), new THREE.Vector3(2.3, -0.4, 0));
          kit.add("#a5f3fc", "Osmoregulation", "freshwater is hypotonic — water keeps entering", new THREE.Vector3(0.2, -3.1, 0), new THREE.Vector3(-1.0, -0.5, 0));
        }
        if (opts.view === "digestive") {
          kit.add("#fbbf24", "Cytopharynx", "forms the food vacuole at its tip", new THREE.Vector3(3.8, 2.3, 0.4), new THREE.Vector3(1.4, -0.5, 0.3));
          kit.add("#22c55e", "Cytopyge (anal pore)", "undigested matter is egested", new THREE.Vector3(-3.8, -2.5, 0.4), new THREE.Vector3(-2.4, -0.35, 0));
        }
        if (opts.view === "reproductive") {
          kit.add("#f472b6", "Binary fission daughter nuclei", "macronucleus + micronucleus divide", new THREE.Vector3(0, 3.0, 0), new THREE.Vector3(-0.4, 0.5, 0));
        }
        titleText(kit.ts, "Paramecium — real ultrastructure", new THREE.Vector3(0, 3.7, 0));
        contactGround(kit.ts.scene, -2.4, 22);

        /* animation */
        return (t: number) => {
          const on = opts.process || opts.view === "process";
          cilia.forEach((c, i) => {
            c.rotation.z += Math.sin(t * 6 - i * 0.22) * 0.03;
          });
          // cyclosis
          foods.forEach((f, i) => {
            const a = t * (on ? 0.75 : 0.28) + i * 0.8;
            f.position.set(Math.cos(a) * 1.5, Math.sin(a * 1.3) * 0.42, Math.sin(a) * 0.85);
          });
          // contractile vacuole cycle — alternate phases
          cvs.forEach((cv, i) => {
            const phase = Math.sin(t * (on ? 1.4 : 0.5) + i * Math.PI);
            const s = 0.55 + 0.45 * (phase * 0.5 + 0.5);
            cv.v.scale.setScalar(s);
            cv.node.position.y = cv.base.y;
          });
          cyto.rotation.y = Math.sin(t * 0.3) * 0.05;
        };
      }}
      footer={
        <TheoryPanel
          title="Theory — Paramecium (real ultrastructure)"
          look="A slipper-shaped cell in glassy translucent skin, ringed by fine cilia combing the water. A golden oral groove sinks to the cytostome; glossy green food vacuoles ride the streaming cytoplasm; a rust-red kidney-shaped macronucleus and violet micronucleus float mid-cell; blue contractile vacuoles with ray-thin radiating canals sit at each end; pink trichocysts bristle from the pellicle."
          principle="Paramecium is a ciliate: the alveolate pellicle fixes the shape while metachronal ciliary waves provide locomotion and a feeding current. Food vacuoles follow a circulatory route (cyclosis) for digestion and egestion. Two contractile vacuoles with radiating canals perform osmoregulation — essential in hypotonic freshwater. The binucleate condition separates metabolic control (macronucleus) from inheritance (micronucleus), and reproduction is by transverse binary fission or conjugation."
          why="Structure labels, the feeding sequence from groove to cytopyge, the reason for osmoregulation, the plane of fission, and the role of the micronucleus in conjugation are all recurring NEB questions — and each has its own view here."
        />
      }
    />
  );
}

/* ══════════════════════ FROG ══════════════════════ */

const FROG_VIEWS: RealView[] = [
  { id: "external", label: "External (real skin)", hint: "Moist mottled skin, bulging eyes with nictitating membrane, tympanum, webbed hindlimbs." },
  { id: "transparent", label: "Transparent", hint: "Skin turned glassy: liver, gut, heart and lungs visible in place." },
  { id: "digestive", label: "Digestive", hint: "Buccal cavity → oesophagus → J-shaped stomach → coiled intestine → cloaca, with liver and gallbladder." },
  { id: "circulatory", label: "Circulatory", hint: "Three-chambered heart beating: 2 atria + 1 ventricle + truncus arteriosus with flow." },
  { id: "reproductive", label: "Reproductive", hint: "Male testes with fat bodies and Bidder's canal versus female ovary, oviduct and cloaca." },
  { id: "process", label: "Process", hint: "Heartbeat, blood flow, gut peristalsis and cutaneous respiration together." },
];

const FROG_PARTS: Record<string, RealPart[]> = {
  external: [
    { name: "Moist scaleless skin", fn: "Cutaneous respiration supplementing the lungs.", why: "'How does a frog breathe on land under water?' — skin is half the answer." },
    { name: "Bulging eyes + nictitating membrane", fn: "Vision in air and water; the membrane cleans and covers the eye.", why: "Named as an amphibian adaptation." },
    { name: "Tympanum", fn: "External eardrum behind each eye; no pinna.", why: "Position and function both asked." },
    { name: "Webbed hindlimbs (5 digits)", fn: "Jumping and swimming.", why: "Webbing as a swimming adaptation is standard." },
  ],
  transparent: [
    { name: "Liver (3 lobes) + gallbladder", fn: "Bile emulsifies fats; storage of glycogen.", why: "Lobe count and the gallbladder's role." },
    { name: "Lungs (paired sacs)", fn: "Pulmonary respiration; thin-walled and highly vascular.", why: "Why pulmonary respiration is insufficient alone." },
    { name: "Cloaca", fn: "Common chamber for digestive, urinary and reproductive products.", why: "'Name the common chamber' — always asked." },
  ],
  digestive: [
    { name: "Wide mouth → buccal cavity", fn: "Prey captured by the flicking tongue; no teeth for chewing.", why: "Carnivore adaptation list." },
    { name: "Oesophagus", fn: "Short tube with ciliated lining pushing food down.", why: "Short length matches a carnivorous diet." },
    { name: "J-shaped stomach", fn: "Chemical digestion with proteases; pyloric valve behind.", why: "Shape and secretion both asked." },
    { name: "Coiled intestine", fn: "Absorption; ends at the cloaca.", why: "Named as short because the diet is carnivorous." },
  ],
  circulatory: [
    { name: "Right atrium (deoxygenated)", fn: "Receives blood from the body via the sinus venosus.", why: "Side naming is a classic trap." },
    { name: "Left atrium (oxygenated)", fn: "Receives oxygenated blood from the lungs and skin.", why: "Pulmocutaneous circulation." },
    { name: "Single ventricle", fn: "Pumps blood to the body; oxygenated and deoxygenated blood mix partially.", why: "'Why is the circulation incomplete?' — the mixing answer." },
    { name: "Truncus arteriosus", fn: "Single vessel leaving the ventricle; divides into aortic arches.", why: "Its position opposite the atria is asked." },
  ],
  reproductive: [
    { name: "Testes + fat bodies (male)", fn: "Produce sperm; fat bodies nourish them.", why: "Which structure is absent in females." },
    { name: "Bidder's canal / renal route", fn: "Sperm travels through the kidney then the ureter.", why: "Male ureters double as sperm ducts — a favourite." },
    { name: "Ovary with ova (female)", fn: "Produces thousands of eggs seasonally.", why: "Count and seasonal timing." },
    { name: "Coiled oviduct", fn: "Adds a jelly coat on the way to the cloaca.", why: "Function of the jelly coat." },
    { name: "External fertilisation in water", fn: "Eggs and sperm meet outside the body.", why: "Requires water — the reason for seasonal breeding." },
  ],
  process: [
    { name: "Heartbeat (3 chambers)", fn: "Partial mixing enforces incomplete double circulation.", why: "Compare with the 4-chambered mammal heart." },
    { name: "Cutaneous gas exchange", fn: "Skin always moist for constant diffusion.", why: "'Why must a frog's skin stay wet?' — direct link." },
    { name: "Buccopharyngeal pumping", fn: "Throat movements ventilate the mouth and lungs.", why: "Mechanism question." },
  ],
};

function frogPartsFor(view: RealOpts["view"]): RealPart[] {
  return FROG_PARTS[view] ?? FROG_PARTS.external;
}

export function RealFrogScene() {
  const tex = useMemo(() => frogSkinTexture(), []);
  const tissue = useMemo(() => bloodTissueTexture(), []);
  return (
    <RealAnatomyViewer
      title="Frog (Rana tigrina) — real anatomy"
      subtitle="Real mottled skin, transparent viscera, and the digestive, circulatory and reproductive systems as switchable views"
      views={FROG_VIEWS}
      parts={FROG_PARTS.external}
      partsFor={frogPartsFor}
      build={(kit: RealKit, opts) => {
        const g = kit.ts.group;
        const op = skinOpacity(opts.clarity);
        const showSkin = opts.view === "external" || opts.view === "transparent" || opts.view === "process" || opts.clarity !== "xray";

        const skin = physical("wetSkin", 0xffffff, { map: tex.map, bumpMap: tex.bump, bumpScale: 0.7 });
        skin.transparent = op < 1;
        skin.opacity = op;
        if (opts.view === "transparent") {
          skin.transmission = 0.45;
          skin.ior = 1.36;
        }
        const skinDark = physical("wetSkin", 0x2f6b31);

        // body
        const body = new THREE.Mesh(organicBlob(1.7, 61, 2, 0.05), skin);
        body.scale.set(1.35, 0.78, 1.0);
        body.position.set(0, 0.9, 0);
        const head = new THREE.Mesh(organicBlob(1.05, 62, 2, 0.06), skin);
        head.scale.set(1.0, 0.66, 0.9);
        head.position.set(-2.0, 1.05, 0);
        if (showSkin) g.add(body, head);

        // limbs
        if (showSkin) {
          const limb = physical("wetSkin", 0x2f7a33);
          for (const s of [-1, 1]) {
            const upper = cylMesh(0.13, 0.16, 0.9, limb);
            upper.position.set(-0.95, 0.25, s * 0.9);
            upper.rotation.x = s * 0.5;
            upper.rotation.z = 0.5;
            const hand = new THREE.Mesh(organicBlob(0.23, 63, 1, 0.1), skinDark);
            hand.scale.set(1.3, 0.4, 0.9);
            hand.position.set(-1.4, -0.35, s * 1.15);
            const thigh = cylMesh(0.2, 0.22, 1.5, limb);
            thigh.position.set(1.35, 0.45, s * 1.0);
            thigh.rotation.x = s * 0.35;
            thigh.rotation.z = -0.9;
            const shank = cylMesh(0.16, 0.19, 1.6, limb);
            shank.position.set(2.4, 0.15, s * 1.15);
            shank.rotation.x = s * 0.3;
            shank.rotation.z = 0.8;
            const foot = new THREE.Mesh(organicBlob(0.33, 64, 1, 0.08), skinDark);
            foot.scale.set(1.5, 0.3, 1.0);
            foot.position.set(3.15, -0.45, s * 1.2);
            g.add(upper, hand, thigh, shank, foot);
            for (let d = -1; d <= 1; d += 1) {
              const web = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.5, 6), physical("membrane", 0x86efac, { opacity: 0.7 }));
              web.position.set(3.4 + d * 0.12, -0.42, s * (1.2 + d * 0.18));
              web.rotation.z = Math.PI / 2;
              g.add(web);
            }
          }
          for (const z of [-0.55, 0.55]) {
            const eye = new THREE.Mesh(new THREE.SphereGeometry(0.29, 20, 16), physical("wetSkin", 0xfde047));
            eye.position.set(-2.3, 1.58, z);
            const pupil = new THREE.Mesh(new THREE.SphereGeometry(0.13, 14, 12), physical("organ", 0x0f172a));
            pupil.position.set(-2.48, 1.63, z);
            const ty = cylMesh(0.23, 0.23, 0.06, physical("wetSkin", 0x14532d));
            ty.rotation.y = Math.PI / 2;
            ty.position.set(-1.8, 1.15, z * 1.25);
            g.add(eye, pupil, ty);
          }
        }

        // ── viscera ──
        const wantDig = opts.view === "digestive" || opts.view === "transparent" || opts.view === "process";
        const wantCirc = opts.view === "circulatory" || opts.view === "process";
        const wantRepro = opts.view === "reproductive" || opts.view === "process";
        const ghost = opts.view !== "digestive" && opts.view !== "process";

        const liverA = new THREE.Mesh(organicBlob(0.64, 74, 2, 0.09), physical("organ", 0x6b3410, { opacity: ghost ? 0.55 : 1 }));
        liverA.scale.set(1.15, 0.66, 1.2);
        liverA.position.set(-0.3, 0.9, 0);
        const liverB = new THREE.Mesh(organicBlob(0.5, 75, 2, 0.09), physical("organ", 0x7c3f14, { opacity: ghost ? 0.55 : 1 }));
        liverB.scale.set(0.9, 0.6, 1.0);
        liverB.position.set(0.4, 0.85, 0.34);
        const gall = new THREE.Mesh(organicBlob(0.16, 76, 1, 0.1), physical("membrane", 0x22c55e, { opacity: 0.85 }));
        gall.position.set(0.1, 0.6, 0.6);

        const stoPts = [new THREE.Vector3(0.15, 0.42, 0), new THREE.Vector3(0.95, 0.3, 0.05), new THREE.Vector3(1.6, -0.05, 0), new THREE.Vector3(1.85, -0.4, 0)];
        const stomach = tubeAlong(stoPts, (t) => 0.44 * (0.72 + 0.5 * Math.sin(t * Math.PI)), 70, 20, physical("muscle", 0xc2262a, { opacity: ghost ? 0.6 : 1 }));

        const intPts: THREE.Vector3[] = [];
        for (let i = 0; i <= 16; i++) {
          const t = i / 16;
          intPts.push(new THREE.Vector3(1.8 + t * 2.1 - 0.55 * Math.sin(t * Math.PI * 2), -0.45 - t * 0.4 + 0.4 * Math.sin(t * Math.PI), 0.55 * Math.sin(t * Math.PI * 3)));
        }
        const intestine = tubeAlong(intPts, () => 0.21, 110, 16, physical("mucosa", 0x22c55e, { opacity: ghost ? 0.6 : 1 }));
        const cloaca = new THREE.Mesh(organicBlob(0.35, 73, 1, 0.1), physical("mucosa", 0x15803d));
        cloaca.position.set(3.9, -0.85, 0);
        const lungs = new THREE.Group();
        for (const s of [-1, 1]) {
          const lu = new THREE.Mesh(organicBlob(0.42, 70 + s, 1, 0.12), physical("organ", 0xf9a8d4, { opacity: 0.6 }));
          lu.position.set(-0.7, 0.75, s * 0.5);
          lungs.add(lu);
        }
        if (wantDig) g.add(liverA, liverB, gall, stomach, intestine, cloaca);
        if (opts.view === "transparent" || opts.view === "process") g.add(lungs);

        // heart
        const heart = new THREE.Group();
        const atriumL = new THREE.Mesh(organicBlob(0.34, 65, 1, 0.1), physical("organ", 0xc2262a));
        atriumL.position.set(0, 0.3, -0.4);
        const atriumR = new THREE.Mesh(organicBlob(0.34, 66, 1, 0.1), physical("organ", 0xd45454));
        atriumR.position.set(0, 0.3, 0.4);
        const ventricle = new THREE.Mesh(organicBlob(0.5, 67, 2, 0.12), physical("muscle", 0x9a1f1f));
        ventricle.scale.set(0.85, 1.15, 0.85);
        ventricle.position.y = -0.3;
        const truncus = cylMesh(0.11, 0.15, 0.85, physical("muscle", 0x93c5fd));
        truncus.rotation.z = 0.7;
        truncus.position.set(-0.5, 0.68, 0);
        heart.add(atriumL, atriumR, ventricle, truncus);
        const heartPos = new THREE.Vector3(-1.05, 1.35, 0);
        heart.position.copy(heartPos);
        heart.scale.setScalar(0.72);
        if (wantCirc || opts.view === "transparent") g.add(heart);

        // blood flow dots
        const flow: THREE.Mesh[] = [];
        if (wantCirc) {
          for (let i = 0; i < 24; i++) {
            const d = new THREE.Mesh(new THREE.SphereGeometry(0.045, 8, 6), physical("organ", 0xfecaca, { map: tissue }));
            g.add(d);
            flow.push(d);
          }
        }

        // reproductive
        if (wantRepro) {
          const testis = new THREE.Mesh(organicBlob(0.28, 77, 2, 0.08), physical("organ", 0xf3d34a));
          testis.scale.set(0.85, 1.35, 0.85);
          testis.position.set(1.0, 1.0, -0.55);
          const kidney = new THREE.Mesh(organicBlob(0.3, 78, 2, 0.08), physical("organ", 0x8f1d2c));
          kidney.scale.set(0.7, 1.9, 0.7);
          kidney.position.set(1.15, 0.55, -0.8);
          g.add(testis, kidney);
          for (let i = 0; i < 6; i++) {
            const fPts = [
              new THREE.Vector3(0.65 + i * 0.14, 1.4, -0.72),
              new THREE.Vector3(0.72 + i * 0.16, 1.66 - i * 0.03, -0.76),
              new THREE.Vector3(0.78 + i * 0.18, 1.86 - i * 0.09, -0.8),
            ];
            g.add(tubeAlong(fPts, (t) => 0.055 * (1 - t * 0.6), 22, 8, physical("organ", 0xfb923c)));
          }
          const ovary = new THREE.Mesh(organicBlob(0.58, 79, 2, 0.14), physical("membrane", 0xc026d3, { opacity: 0.6 }));
          ovary.scale.set(1.2, 0.9, 0.9);
          ovary.position.set(1.2, 1.0, 0.65);
          g.add(ovary);
          for (let i = 0; i < 10; i++) {
            const e = new THREE.Mesh(organicBlob(0.09, 80 + i, 1, 0.08), physical("organ", 0x2e1065));
            const a = i * 0.63;
            e.position.set(1.2 + Math.cos(a) * 0.4, 1.0 + Math.sin(a) * 0.32, 0.65 + Math.sin(a * 2 + 1) * 0.28);
            g.add(e);
          }
          const oviPts: THREE.Vector3[] = [];
          for (let i = 0; i <= 20; i++) {
            const t = i / 20;
            oviPts.push(new THREE.Vector3(1.8 + t * 1.4, 0.9 - t * 1.4 + 0.18 * Math.sin(t * Math.PI * 4), 0.4 + 0.34 * Math.sin(t * Math.PI * 5)));
          }
          g.add(tubeAlong(oviPts, (t) => 0.085 * (0.8 + 0.5 * Math.sin(t * Math.PI)), 100, 12, physical("mucosa", 0xf0abfc)));
        }

        /* labels */
        if (opts.view === "external" || opts.view === "process") {
          kit.add("#fde047", "Bulging eyes + nictitating membrane", "vision in air & water", new THREE.Vector3(-5.2, 4.2, 0), new THREE.Vector3(-2.3, 1.7, 0.55));
          kit.add("#166534", "Tympanum", "external eardrum, no pinna", new THREE.Vector3(-0.4, -3.6, 1.4), new THREE.Vector3(-1.8, 1.2, 0.7));
          kit.add("#34d399", "Moist scaleless skin", "cutaneous respiration", new THREE.Vector3(2.6, 3.2, -0.6), new THREE.Vector3(0.6, 1.4, -0.7));
          kit.add("#16a34a", "Webbed hindlimbs — 5 digits", "jumping & swimming", new THREE.Vector3(5.0, -2.4, 0.4), new THREE.Vector3(3.15, -0.5, 1.2));
        }
        if (opts.view === "transparent") {
          kit.add("#f9a8d4", "Lungs (paired sacs)", "pulmonary respiration; thin-walled", new THREE.Vector3(-2.4, 3.0, 0.4), new THREE.Vector3(-0.7, 0.9, 0.5));
          kit.add("#6b3410", "Liver (3 lobes) + gallbladder", "bile emulsifies fat", new THREE.Vector3(-1.2, -2.9, 0.4), new THREE.Vector3(-0.3, 0.95, 0.3));
          kit.add("#15803d", "Cloaca", "common exit: digestive, urinary, reproductive", new THREE.Vector3(5.4, 2.2, 0), new THREE.Vector3(3.9, -0.85, 0));
        }
        if (wantDig && opts.view !== "transparent") {
          kit.add("#ef4444", "J-shaped stomach", "protease digestion; pyloric valve behind", new THREE.Vector3(1.8, 3.1, 0.3), new THREE.Vector3(1.3, 0.25, 0));
          kit.add("#22c55e", "Coiled intestine → cloaca", "absorption; short because the diet is carnivorous", new THREE.Vector3(6.0, 1.6, 0), new THREE.Vector3(3.6, -0.8, 0));
          kit.add("#a16207", "Liver + gallbladder", "bile emulsifies fat", new THREE.Vector3(-2.2, -3.0, 0.4), new THREE.Vector3(-0.3, 0.95, 0.3));
        }
        if (wantCirc) {
          kit.add("#c2262a", "Right atrium (deoxygenated)", "receives body blood via sinus venosus", new THREE.Vector3(-5.6, 3.4, -0.5), new THREE.Vector3(-1.05, 1.6, -0.3));
          kit.add("#d45454", "Left atrium (oxygenated)", "receives blood from lungs and skin", new THREE.Vector3(-5.6, 2.4, 1.6), new THREE.Vector3(-1.05, 1.6, 0.3));
          kit.add("#9a1f1f", "Single ventricle", "mixing ⇒ incomplete double circulation", new THREE.Vector3(-3.0, -2.8, 0.6), new THREE.Vector3(-1.3, 1.1, 0));
          kit.add("#93c5fd", "Truncus arteriosus", "single vessel leaving the ventricle", new THREE.Vector3(-1.0, -3.0, -0.8), new THREE.Vector3(-1.5, 1.9, 0));
        }
        if (wantRepro) {
          kit.add("#f3d34a", "Testes + fat bodies (male)", "sperm via kidneys — Bidder's canal", new THREE.Vector3(0.2, -3.2, -0.6), new THREE.Vector3(1.0, 1.05, -0.6));
          kit.add("#c026d3", "Ovary with ova (female)", "thousands of eggs, seasonal", new THREE.Vector3(3.4, 3.2, 0.6), new THREE.Vector3(1.2, 1.05, 0.7));
          kit.add("#f0abfc", "Coiled oviduct", "adds the jelly coat en route to the cloaca", new THREE.Vector3(5.6, -2.6, 0.4), new THREE.Vector3(3.0, -0.45, 0.4));
        }
        titleText(kit.ts, "Frog (Rana tigrina) — real anatomy", new THREE.Vector3(0, 4.1, 0));
        contactGround(kit.ts.scene, -1.9, 26);

        return (t: number) => {
          const on = opts.process || opts.view === "process";
          const beat = Math.abs(Math.sin(t * (on ? 4.6 : 1.6)));
          ventricle.scale.y = 1.15 + 0.13 * beat;
          ventricle.scale.x = 0.85 - 0.06 * beat;
          heart.position.y = heartPos.y + Math.sin(t * 4.6) * 0.05 * (on ? 1 : 0.3);
          if (on) {
            flow.forEach((d, i) => {
              const k = (t * 0.35 + i / flow.length) % 1;
              const a = k * Math.PI * 2;
              d.position.set(heartPos.x + Math.cos(a) * 1.6, heartPos.y + Math.sin(a * 2) * 0.5, Math.sin(a) * 1.2);
            });
            stomach.scale.x = 1 + 0.02 * Math.sin(t * 2.4);
            intestine.rotation.z = Math.sin(t * 1.1) * 0.02;
          }
        };
      }}
      footer={
        <TheoryPanel
          title="Theory — Frog real anatomy & systems"
          look="A green frog in moist mottled skin with golden protruding eyes, round tympanum discs, short hands and long folded webbed legs. Under the glassy skin the dark-red liver lobes with a green gallbladder sheathe a crimson J-shaped stomach that empties into a coiled intestine ending at the cloaca; pink lungs sit above and a three-chambered heart beats with a blue truncus arteriosus. Pale-yellow testes with fingered fat bodies mark the male side beside an elongated dark-red kidney; a magenta ovary studded with ova and a coiled pink oviduct mark the female."
          principle="The frog is an amphibian with dual respiration: moist scaleless skin performs cutaneous exchange while paired lungs handle pulmonary breathing. Its heart has two atria but a single ventricle, so oxygenated and deoxygenated blood mix — double circulation is therefore incomplete. Digestion is carnivore-adapted with a short canal and protease-rich stomach. Excretion and reproduction share one cloaca: in males sperm passes through the kidneys (Bidder's canal) and out via the ureters, while females shed jelly-coated eggs into water for external fertilisation."
          why="The three- versus four-chambered heart comparison, incomplete double circulation, cutaneous respiration, the common cloaca, male ureters doubling as sperm ducts, and external fertilisation in water are the exact NEB physiology points this switchable model walks through."
        />
      }
    />
  );
}

/* ══════════════════════ PLASMODIUM ══════════════════════ */

const PLAS_VIEWS: RealView[] = [
  { id: "external", label: "Mosquito vector", hint: "Female Anopheles feeding — sporozoites in her salivary glands." },
  { id: "transparent", label: "Inside the RBC", hint: "Signet-ring trophozoite, rosette schizont and gametocyte inside a real red blood cell." },
  { id: "process", label: "Life cycle (live)", hint: "Sporozoites streaming to the liver, merozoites bursting out and gametocytes picked up again." },
];

const PLAS_PARTS: RealPart[] = [
  { name: "Female Anopheles mosquito", fn: "Definitive host — sexual reproduction occurs in its gut.", why: "'Definitive host' labelling is a standard one-marker." },
  { name: "Sporozoites", fn: "Infective stage injected with saliva; travel to liver cells.", why: "Infective stage has to be named exactly." },
  { name: "Trophozoite (signet ring)", fn: "Feeding stage inside the RBC.", why: "Diagnostic shape on a blood smear." },
  { name: "Schizont (rosette)", fn: "Divides into merozoites that burst the RBC.", why: "The burst explains the periodic fever spike." },
  { name: "Gametocytes", fn: "Taken up by the next mosquito; fuse to form a zygote.", why: "Link back to the vector completes the cycle." },
  { name: "Human = intermediate host", fn: "Asexual multiplication in liver then RBCs.", why: "Host-type question, often reversed by mistake." },
];

export function RealPlasmodiumScene() {
  const tex = useMemo(() => bloodTissueTexture(), []);
  return (
    <RealAnatomyViewer
      title="Plasmodium vivax — life cycle in real blood"
      subtitle="Real RBC surface, ring trophozoite, rosette schizont and gametocyte, with the Anopheles vector and live stage flow"
      views={PLAS_VIEWS}
      parts={PLAS_PARTS}
      defaultView="transparent"
      build={(kit: RealKit, opts) => {
        const g = kit.ts.group;
        const op = opts.clarity === "opaque" ? 1 : opts.clarity === "semi" ? 0.5 : 0.2;

        // real RBC — biconcave disc with tissue texture
        const rbc = new THREE.Mesh(new THREE.SphereGeometry(2.0, 60, 40), physical("wetSkin", 0xd6455a, { map: tex, opacity: op }));
        rbc.scale.set(1, 0.42, 1);
        const dent = new THREE.Mesh(new THREE.SphereGeometry(0.7, 30, 20), physical("organ", 0x9d2438));
        dent.scale.set(1, 0.5, 1);
        dent.position.y = 0.62;
        g.add(rbc);
        if (opts.view === "transparent") g.add(dent);

        // trophozoite — signet ring
        const ring = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.16, 14, 30), physical("mucosa", 0x7dd3fc));
        ring.rotation.x = Math.PI / 2;
        ring.position.set(-0.5, 0.28, 0);
        g.add(ring);
        const nucleus = new THREE.Mesh(new THREE.SphereGeometry(0.14, 12, 10), physical("organ", 0x6d28d9));
        nucleus.position.set(-1.0, 0.42, 0.05);
        g.add(nucleus);

        // schizont rosette
        const merozoites: THREE.Mesh[] = [];
        for (let i = 0; i < 12; i++) {
          const a = (i / 12) * Math.PI * 2;
          const m = new THREE.Mesh(organicBlob(0.11, i + 5, 1, 0.1), physical("organ", 0xa3e635));
          m.position.set(1.25 + Math.cos(a) * 0.5, 0.3, Math.sin(a) * 0.5);
          g.add(m);
          merozoites.push(m);
        }
        const gam = new THREE.Mesh(organicBlob(0.36, 91, 2, 0.12), physical("mucosa", 0xf59e0b));
        gam.position.set(0.35, 0.55, -0.85);
        g.add(gam);

        // mosquito
        const mos = new THREE.Group();
        const abd = new THREE.Mesh(organicBlob(0.42, 51, 2, 0.1), physical("chitin", 0x6b7280));
        abd.scale.set(1.7, 0.8, 0.8);
        abd.position.x = 0.6;
        const thorax = new THREE.Mesh(organicBlob(0.3, 52, 2, 0.08), physical("chitin", 0x4b5563));
        const headM = new THREE.Mesh(organicBlob(0.2, 53, 1, 0.1), physical("chitin", 0x374151));
        headM.position.x = -0.75;
        mos.add(abd, thorax, headM);
        for (const s of [-1, 1]) {
          const wing = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 0.5), physical("membrane", 0xdbeafe, { opacity: 0.5 }));
          wing.position.set(0.35, 0.28, s * 0.35);
          wing.rotation.x = -Math.PI / 2;
          wing.rotation.z = s * 0.25;
          mos.add(wing);
        }
        const proboscis = cylMesh(0.02, 0.03, 0.75, physical("chitin", 0x1f2937));
        proboscis.rotation.z = Math.PI / 2;
        proboscis.position.set(-1.2, -0.05, 0);
        mos.add(proboscis);
        for (let i = 0; i < 6; i++) {
          const a = (i / 6) * Math.PI * 2;
          const leg = cylMesh(0.015, 0.02, 0.7, physical("chitin", 0x374151));
          leg.position.set(0.25 + Math.cos(a) * 0.2, -0.35, Math.sin(a) * 0.4);
          leg.rotation.z = 0.5;
          leg.rotation.x = Math.sin(a) * 0.6;
          mos.add(leg);
        }
        const showMos = opts.view === "external" || opts.view === "process";
        if (showMos) {
          mos.position.set(-4.6, 1.5, 0);
          mos.scale.setScalar(0.85);
          g.add(mos);
        }

        // sporozoite stream
        const sporos: THREE.Mesh[] = [];
        for (let i = 0; i < 16; i++) {
          const s = cylMesh(0.025, 0.045, 0.26, physical("organ", 0x22d3ee));
          s.rotation.z = Math.PI / 2 + 0.3;
          g.add(s);
          sporos.push(s);
        }

        kit.add("#d6455a", "Red blood cell", "host cell; haemoglobin released when it bursts", new THREE.Vector3(-4.4, 1.0, 0), new THREE.Vector3(-1.3, 0.4, 0.6));
        kit.add("#7dd3fc", "Trophozoite (signet ring)", "feeding stage — the diagnostic shape", new THREE.Vector3(-0.2, 3.6, 0), new THREE.Vector3(-0.5, 0.4, 0));
        kit.add("#a3e635", "Schizont (rosette)", "merozoites burst out ⇒ periodic fever", new THREE.Vector3(3.4, 2.6, 0.4), new THREE.Vector3(1.45, 0.35, 0));
        kit.add("#f59e0b", "Gametocyte", "picked up by the next mosquito", new THREE.Vector3(2.0, -2.6, -0.6), new THREE.Vector3(0.35, 0.6, -0.85));
        if (showMos) {
          kit.add("#94a3b8", "Female Anopheles (definitive host)", "sexual reproduction in her gut", new THREE.Vector3(-5.4, 3.0, 0), new THREE.Vector3(-4.6, 1.6, 0));
          kit.add("#22d3ee", "Sporozoites (infective stage)", "injected with saliva → liver", new THREE.Vector3(-3.4, -2.7, 0.4), new THREE.Vector3(-2.4, 0.6, 0));
        }
        titleText(kit.ts, "Plasmodium vivax — life cycle in situated blood", new THREE.Vector3(0, 3.8, 0));
        contactGround(kit.ts.scene, -2.0, 24);

        return (t: number) => {
          const on = opts.process || opts.view === "process";
          merozoites.forEach((m, i) => {
            const a = (i / 12) * Math.PI * 2 + t * (on ? 0.8 : 0.15);
            const r = 0.5 + (on ? 0.12 * Math.sin(t * 2 + i) : 0);
            m.position.set(1.25 + Math.cos(a) * r, 0.3, Math.sin(a) * r);
          });
          gam.scale.setScalar(1 + 0.05 * Math.sin(t * 2));
          sporos.forEach((s, i) => {
            const k = (t * (on ? 0.35 : 0.08) + i / sporos.length) % 1;
            s.position.set(-3.4 + k * 2.2, 0.5 + Math.sin(k * 6 + i) * 0.25, -0.2 + Math.cos(k * 5) * 0.3);
          });
          if (showMos) {
            mos.rotation.z = Math.sin(t * 1.5) * 0.05;
            mos.position.y = 1.5 + Math.sin(t * 2.2) * 0.08;
          }
          rbc.rotation.y = Math.sin(t * 0.25) * 0.06;
        };
      }}
      footer={
        <TheoryPanel
          title="Theory — Plasmodium vivax life cycle"
          look="A glossy biconcave red blood cell holding three stages in real positions: a pale-blue signet-ring trophozoite with a violet nucleus, a grass-green rosette of merozoites around a schizont, and an amber gametocyte; cyan sporozoites stream in from the long-legged grey Anopheles mosquito on the left."
          principle="Plasmodium is a protozoan with two hosts. The female Anopheles mosquito is the definitive host (sexual reproduction in her gut); humans are the intermediate host (asexual multiplication first in liver cells, then in red blood cells). The infective stage injected with saliva is the sporozoite; the ring trophozoite grows into a schizont whose merozoites burst the RBC — the event that produces the periodic malarial fever. Some merozoites become gametocytes, completing the cycle when another mosquito feeds."
          why="Naming the infective stage, ordering liver before RBC, explaining the fever spike through RBC rupture, assigning definitive versus intermediate host, and linking the vector to control measures are all directly examinable."
        />
      }
    />
  );
}

/* ══════════════════════ NINE PHYLA ══════════════════════ */

const PHYLA_VIEWS: RealView[] = [
  { id: "external", label: "External forms", hint: "All nine phyla in real materials: textured sponge, glassy hydra, scaled fish, nacre shell, chitin exoskeleton." },
  { id: "transparent", label: "Body plans", hint: "Body cavity and symmetry characters exposed — acoelomate, pseudocoelomate, true coelom." },
  { id: "cutaway", label: "Cutaway", hint: "Near half clipped away so the internal cavity of each body plan is visible." },
  { id: "process", label: "Process", hint: "Water flow through the sponge, hydra tentacle sway, annelid crawl, fish swim." },
];

const PHYLA_PARTS: RealPart[] = [
  { name: "Porifera (asymmetric)", fn: "Cellular level, pores with spicules, water exits the osculum.", why: "'Which phylum has no symmetry or tissues?' — direct." },
  { name: "Cnidaria (radial)", fn: "Diploblastic with cnidocytes and a gastrovascular coelenteron.", why: "Radial symmetry and stinging cells both asked." },
  { name: "Platyhelminthes (acoelomate)", fn: "Flat body with no body cavity; flame cells excrete.", why: "Body-cavity comparison table." },
  { name: "Aschelminthes (pseudocoelomate)", fn: "Round unsegmented worm with a false coelom.", why: "Pseudocoelom definition is a standard one-marker." },
  { name: "Annelida (true coelom + metamerism)", fn: "Segmented with closed circulation and nephridia per segment.", why: "First true coelom — table answer." },
  { name: "Arthropoda (largest phylum)", fn: "Jointed appendages with chitin exoskeleton; open circulation.", why: "'Largest phylum' and 'open circulation' both asked." },
  { name: "Mollusca", fn: "Soft body with mantle, shell and muscular foot; some closed circulation.", why: "Mantle function question." },
  { name: "Echinodermata (pentaradial)", fn: "Water vascular system, tube feet, spiny endoskeleton; exclusively marine.", why: "Water vascular system is the identity feature." },
  { name: "Chordata", fn: "Notochord, dorsal hollow nerve cord, pharyngeal slits, post-anal tail.", why: "The four fundamental characters must be listed exactly." },
];

export function RealPhylaScene() {
  return (
    <RealAnatomyViewer
      title="Animalia — nine phyla, real body plans"
      subtitle="Textured, glassy and chitinous forms in real materials, with cutaway and transparency to expose each body cavity"
      views={PHYLA_VIEWS}
      parts={PHYLA_PARTS}
      build={(kit: RealKit, opts) => {
        const g = kit.ts.group;
        const op = skinOpacity(opts.clarity);
        const glassy = (color: number) => {
          const m = physical("membrane", color, { opacity: opts.view === "transparent" ? 0.35 : Math.max(op, 0.28) });
          m.side = THREE.DoubleSide;
          return m;
        };
        const clip = (m: THREE.MeshPhysicalMaterial) => {
          if (opts.view === "cutaway") {
            m.clippingPlanes = [new THREE.Plane(new THREE.Vector3(0, 0, -1), 0.1)];
          }
          return m;
        };

        // Porifera
        const vase = new THREE.Mesh(organicBlob(0.85, 41, 2, 0.16), clip(physical("organ", 0xb98a4f)));
        vase.scale.set(1.0, 1.15, 0.9);
        vase.position.set(-11, 0.8, 0);
        const cavity = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.5, 0.9, 20, 1, true), glassy(0x3a2412));
        cavity.position.set(-11, 1.25, 0);
        g.add(vase, cavity);
        for (let i = 0; i < 12; i++) {
          const a = (i / 12) * Math.PI * 2;
          const p = cylMesh(0.055, 0.075, 0.16, physical("mucosa", 0x6b4423));
          p.position.set(-11 + Math.cos(a) * 0.78, 0.25 + (i % 3) * 0.5, Math.sin(a) * 0.7);
          p.rotation.z = Math.PI / 2;
          p.rotation.y = -a;
          g.add(p);
        }

        // Cnidaria
        const col = new THREE.Mesh(organicBlob(0.36, 42, 2, 0.12), glassy(0x86efac));
        col.scale.set(1.0, 2.2, 1.0);
        col.position.set(-8, 0.9, 0);
        g.add(col);
        const tentacles: THREE.Mesh[] = [];
        for (let i = 0; i < 6; i++) {
          const a = (i / 6) * Math.PI * 2;
          const pts: THREE.Vector3[] = [];
          for (let s = 0; s <= 6; s++) {
            const tt = s / 6;
            const r = 0.22 + tt * 0.75;
            pts.push(new THREE.Vector3(-8 + Math.cos(a) * r, 2.0 - tt * 1.15 + Math.sin(tt * 5 + i) * 0.12, Math.sin(a) * r));
          }
          const tn = tubeAlong(pts, (tt) => 0.055 * (1 - tt * 0.7), 40, 10, physical("membrane", 0x86efac, { opacity: 0.75 }));
          g.add(tn);
          tentacles.push(tn);
        }

        // Platyhelminthes
        const flatPts: THREE.Vector3[] = [];
        for (let i = 0; i <= 8; i++) {
          const t = i / 8;
          flatPts.push(new THREE.Vector3(-5.4 + t * 2.6, 1.1 + Math.sin(t * 4) * 0.1, Math.sin(t * 3) * 0.12));
        }
        const flat = tubeAlong(flatPts, (t) => 0.5 * Math.min(1, Math.min(t, 1 - t) * 4 + 0.25), 60, 18, clip(physical("wetSkin", 0xd8a79a)));
        flat.scale.z = 0.16;
        g.add(flat);

        // Aschelminthes
        const rndPts: THREE.Vector3[] = [];
        for (let i = 0; i <= 8; i++) {
          const t = i / 8;
          rndPts.push(new THREE.Vector3(-5.6 + t * 2.8, -0.75 + Math.sin(t * 5) * 0.08, Math.sin(t * 2.5) * 0.1));
        }
        g.add(tubeAlong(rndPts, (t) => 0.24 * Math.min(1, Math.min(t, 1 - t) * 6 + 0.18) * (1 - 0.35 * t), 70, 18, physical("wetSkin", 0xf0c9a0)));

        // Annelida
        const annPts: THREE.Vector3[] = [];
        for (let i = 0; i <= 9; i++) {
          const t = i / 9;
          annPts.push(new THREE.Vector3(-1.6 + t * 2.8, 1.35 + Math.sin(t * 6) * 0.1, 0));
        }
        g.add(tubeAlong(annPts, (t) => (0.3 + 0.045 * Math.sin(t * 9 * Math.PI)) * Math.min(1, Math.min(t, 1 - t) * 5 + 0.2), 120, 22, clip(physical("wetSkin", 0xffffff))));

        // Arthropoda
        const arth = new THREE.Group();
        const thorax = new THREE.Mesh(organicBlob(0.42, 52, 2, 0.07), physical("chitin", 0x14b8a6));
        const abdomen = new THREE.Mesh(organicBlob(0.5, 53, 2, 0.1), physical("chitin", 0x0d9488));
        abdomen.scale.set(1.5, 0.8, 0.85);
        abdomen.position.x = 0.75;
        arth.add(thorax, abdomen);
        for (let i = -1; i <= 1; i++) {
          for (const s of [-1, 1]) {
            const femur = cylMesh(0.035, 0.045, 0.62, physical("chitin", 0x2dd4bf));
            femur.position.set(i * 0.32, -0.32, s * 0.4);
            femur.rotation.x = s * 0.8;
            femur.rotation.z = 0.35 * i;
            const tibia = cylMesh(0.025, 0.035, 0.58, physical("chitin", 0x5eead4));
            tibia.position.set(i * 0.32 + 0.16 * i, -0.72, s * 0.72);
            tibia.rotation.x = s * 1.15;
            arth.add(femur, tibia);
          }
        }
        arth.position.set(-1.4, -1.35, 0);
        g.add(arth);

        // Mollusca
        const moll = new THREE.Group();
        for (let i = 0; i < 6; i++) {
          const t = i / 5;
          const w = new THREE.Mesh(new THREE.TorusGeometry(0.5 - t * 0.26, 0.16 - t * 0.06, 14, 30), clip(physical("wetSkin", 0xffffff)));
          const a = t * Math.PI * 1.5;
          w.position.set(Math.cos(a) * (0.42 - t * 0.3), i * 0.16, Math.sin(a) * (0.42 - t * 0.3));
          w.rotation.x = Math.PI / 2;
          moll.add(w);
        }
        const foot = new THREE.Mesh(organicBlob(0.5, 54, 2, 0.1), physical("wetSkin", 0xc084fc));
        foot.scale.set(1.7, 0.32, 0.9);
        foot.position.y = -0.3;
        moll.add(foot);
        moll.position.set(2.4, 1.15, 0);
        g.add(moll);

        // Echinodermata
        const ech = new THREE.Group();
        for (let i = 0; i < 5; i++) {
          const a = (i / 5) * Math.PI * 2;
          const armPts = [
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(Math.cos(a) * 0.6, 0.06, Math.sin(a) * 0.6),
            new THREE.Vector3(Math.cos(a) * 1.15, 0.02, Math.sin(a) * 1.15),
          ];
          ech.add(tubeAlong(armPts, (t) => 0.26 * (1 - t * 0.62), 30, 14, physical("organ", 0xea7a4a)));
        }
        ech.add(new THREE.Mesh(organicBlob(0.4, 55, 2, 0.1), physical("organ", 0xf97316)));
        ech.position.set(3.1, -1.3, 0);
        g.add(ech);

        // Chordata
        const chord = new THREE.Group();
        const fishPts: THREE.Vector3[] = [];
        for (let i = 0; i <= 8; i++) {
          const t = i / 8;
          fishPts.push(new THREE.Vector3(-0.9 + t * 1.8, 0, 0));
        }
        const fishBody = tubeAlong(fishPts, (t) => 0.16 + 0.5 * Math.sin(t * Math.PI), 80, 22, clip(physical("wetSkin", 0xffffff)));
        fishBody.scale.z = 0.55;
        chord.add(fishBody);
        const noto = cylMesh(0.05, 0.05, 1.5, physical("organ", 0xfacc15));
        noto.rotation.z = Math.PI / 2;
        noto.position.y = 0.38;
        const cord = cylMesh(0.04, 0.04, 1.7, physical("muscle", 0x8b5cf6));
        cord.rotation.z = Math.PI / 2;
        cord.position.y = 0.52;
        chord.add(noto, cord);
        chord.position.set(6.6, 1.0, 0);
        g.add(chord);

        // Nine long chips on a narrow canvas: four vertical lanes, assigned so
        // no two neighbours in x ever share a lane. Lane 3.2 takes three
        // labels because they are the furthest apart horizontally.
        kit.add("#fbbf24", "Porifera — asymmetric", "pores + osculum; cellular level, spicules", new THREE.Vector3(-12.6, 3.2, 0), new THREE.Vector3(-11, 1.7, 0));
        kit.add("#4ade80", "Cnidaria — radial", "diploblastic; cnidocytes; coelenteron", new THREE.Vector3(-8, 6.8, 0), new THREE.Vector3(-8, 1.9, 0));
        kit.add("#ef4444", "Platyhelminthes — acoelomate", "no body cavity; flame cells", new THREE.Vector3(-5.6, -3.2, 0.2), new THREE.Vector3(-4.2, 1.05, 0));
        kit.add("#f97316", "Aschelminthes — pseudocoelom", "unsegmented; false coelom", new THREE.Vector3(-5.8, -6.8, -0.4), new THREE.Vector3(-4.4, -0.75, 0));
        kit.add("#b45309", "Annelida — true coelom", "metamerism; nephridia per segment", new THREE.Vector3(-1.6, 3.2, 0), new THREE.Vector3(-1.4, 1.5, 0));
        kit.add("#7dd3fc", "Arthropoda — exoskeleton", "largest phylum; open circulation", new THREE.Vector3(-1.4, 6.8, 0), new THREE.Vector3(-1.4, -1.7, 0));
        kit.add("#a855f7", "Mollusca — soft, shell, foot", "mantle cavity; some closed circulation", new THREE.Vector3(2.4, -3.2, 0), new THREE.Vector3(2.6, 1.5, 0));
        kit.add("#fb923c", "Echinodermata — pentaradial", "water vascular system; marine only", new THREE.Vector3(3.1, -6.8, 0), new THREE.Vector3(3.1, -1.6, 0));
        kit.add("#22d3ee", "Chordata — four hallmarks", "notochord, dorsal nerve cord, pharyngeal slits, post-anal tail", new THREE.Vector3(6.6, 3.2, 0), new THREE.Vector3(6.8, 1.5, 0));
        titleText(kit.ts, "Animalia — nine phyla, real body plans", new THREE.Vector3(0, 4.2, 0));
        contactGround(kit.ts.scene, -2.6, 36);

        return (t: number) => {
          const on = opts.process || opts.view === "process";
          tentacles.forEach((tn, i) => (tn.rotation.z = Math.sin(t * (on ? 2.2 : 0.5) + i) * 0.16));
          ech.rotation.y = t * (on ? 0.7 : 0.2);
          chord.rotation.z = Math.sin(t * (on ? 1.6 : 0.4)) * 0.12;
          arth.rotation.y = Math.sin(t * 0.7) * 0.3;
          moll.rotation.y = t * 0.3;
          vase.rotation.z = Math.sin(t * 0.8) * 0.02;
        };
      }}
      footer={
        <TheoryPanel
          title="Theory — nine animal phyla, real body plans"
          look="Nine realistic forms in a row: a leathery amber sponge pocked with pores and glassy spicules, a translucent green hydra with six swaying tentacles, a pink flat ribbon above a tapered pale roundworm, a banded brown worm with a saddle above a glossy teal chitinous arthropod, an iridescent nacre shell on a purple muscular foot, an orange five-armed star with tube feet, and a blue fish with a yellow notochord and purple dorsal cord."
          principle="Animal classification follows four innovations: symmetry (none → radial → bilateral), germ layers (diploblastic vs triploblastic), body cavity (acoelomate → pseudocoelomate → true coelomate), and segmentation (metamerism in Annelida, Arthropoda and Chordata). Chordata adds the notochord, dorsal hollow nerve cord, pharyngeal gill slits and post-anal tail. Arthropoda is the largest phylum, Echinodermata is exclusively marine with a water vascular system, and Mollusca is built around a mantle."
          why="Naming the symmetry, cavity type, segmentation state and circulatory mode of each phylum is exactly how classification questions are marked — the transparent and cutaway views expose those characters directly."
        />
      }
    />
  );
}

/* ------------------------------------------------------------------ */
/* tiny mesh helpers (local, so this file stays self-contained)        */
/* ------------------------------------------------------------------ */

function cylMesh(r1: number, r2: number, h: number, mat: THREE.Material) {
  return new THREE.Mesh(new THREE.CylinderGeometry(r1, r2, h, 20), mat);
}

function segMesh(a: THREE.Vector3, b: THREE.Vector3, color: number, r = 0.02) {
  const dir = new THREE.Vector3().subVectors(b, a);
  const len = dir.length();
  const m = cylMesh(r, r, len, physical("organ", color));
  m.position.copy(a).addScaledVector(dir, 0.5);
  m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
  return m;
}
