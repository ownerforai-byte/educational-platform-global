"use client";

/**
 * Faunal Diversity 3D — Animalia body plans & Frog scenes.
 *
 * Phyla: the nine NEB phyla shown as comparative 3D body plans
 * (symmetry / body cavity / segmentation) beside representative forms.
 * Frog: external form + heart (3-chambered) + reproductive system.
 */

import * as THREE from "three";
import { useMemo } from "react";
import { TheoryPanel } from "@/components/lab/theory-panel";
import {
  useFaunalScene,
  CanvasMount,
  std,
  sph,
  cyl,
  box,
  tor,
  seg,
  titleText,
} from "./biology-faunal-3d-kit";
import {
  frogSkinTexture,
  shellNacreTexture,
  fishScaleTexture,
  earthwormSkinTexture,
  physical,
  organicBlob,
  tubeAlong,
  contactGround,
} from "./biology-faunal-3d-realism";

/* ------------------------------------------------------------------ */
/* Nine phyla — comparative body plans                                 */
/* ------------------------------------------------------------------ */

export function PhylaBodyPlansScene() {
  const mats = useMemo(() => {
    const nacre = shellNacreTexture();
    const scales = fishScaleTexture();
    const worm = earthwormSkinTexture();
    return {
      nacreShell: physical("wetSkin", 0xffffff, { map: nacre.map, bumpMap: nacre.bump, bumpScale: 0.5 }),
      fish: physical("wetSkin", 0xffffff, { map: scales.map, bumpMap: scales.bump, bumpScale: 0.45 }),
      annelid: physical("wetSkin", 0xffffff, { map: worm.map, bumpMap: worm.bump, bumpScale: 0.8 }),
      glass: physical("membrane", 0x86efac, { opacity: 0.6 }),
    };
  }, []);
  const { mountRef, webGL, vizTargetRef } = useFaunalScene((kit) => {
    const g = kit.ts.group;
    const place = (x: number, z: number) => new THREE.Vector3(x, 0, z);

    // — PORIFERA: asymmetric leathery vase with pores, water flowing out —
    const porifera = new THREE.Group();
    const vase = new THREE.Mesh(organicBlob(0.85, 41, 2, 0.16), physical("organ", 0xb98a4f));
    vase.scale.set(1.0, 1.15, 0.9);
    porifera.add(vase);
    // hollow top: inner dark cavity
    const cavity = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.5, 0.9, 20, 1, true), physical("mucosa", 0x3a2412, { opacity: 0.95 }));
    cavity.position.y = 0.45;
    porifera.add(cavity);
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      const row = i % 3;
      const p = cyl(0.055, 0.075, 0.16, 0xffffff);
      p.material = physical("mucosa", 0x6b4423);
      p.position.set(Math.cos(a) * 0.78, -0.55 + row * 0.5, Math.sin(a) * 0.7);
      p.rotation.z = Math.PI / 2;
      p.rotation.y = -a;
      porifera.add(p);
    }
    const osculum = tor(0.42, 0.07, 0xffffff);
    osculum.material = physical("mucosa", 0x8a5a30);
    osculum.rotation.x = Math.PI / 2;
    osculum.position.y = 1.0;
    porifera.add(osculum);
    // spicules — tiny glassy needles protruding
    for (let i = 0; i < 14; i++) {
      const a = (i / 14) * Math.PI * 2 + 0.3;
      const sp = cyl(0.012, 0.03, 0.3, 0xffffff);
      sp.material = physical("membrane", 0xe0f2fe, { opacity: 0.85 });
      const rr = 0.86;
      sp.position.set(Math.cos(a) * rr, (i % 4) * 0.45 - 0.6, Math.sin(a) * rr * 0.85);
      sp.rotation.z = Math.PI / 2 - 0.4;
      sp.rotation.y = -a;
      porifera.add(sp);
    }
    porifera.position.set(-7.5, 0.8, 0);
    g.add(porifera);

    // — CNIDARIA: translucent radial hydra with lanky tentacles —
    const cnid = new THREE.Group();
    const col = new THREE.Mesh(organicBlob(0.36, 42, 2, 0.12), mats.glass);
    col.scale.set(1.0, 2.3, 1.0);
    col.position.y = 0.9;
    cnid.add(col);
    // basal disc
    const base = new THREE.Mesh(organicBlob(0.4, 43, 1, 0.1), physical("mucosa", 0x65a30d));
    base.scale.set(1.2, 0.3, 1.2);
    base.position.y = -0.05;
    cnid.add(base);
    // hypostome mound + tentacle crown (6 long wavy tentacles)
    const hypostome = new THREE.Mesh(organicBlob(0.2, 44, 1, 0.12), physical("mucosa", 0xa3e635));
    hypostome.position.y = 2.05;
    cnid.add(hypostome);
    const tentacles: THREE.Mesh[] = [];
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      const pts: THREE.Vector3[] = [];
      for (let s = 0; s <= 6; s++) {
        const tt = s / 6;
        const r = 0.22 + tt * 0.75;
        pts.push(new THREE.Vector3(Math.cos(a) * r, 2.05 - tt * 1.15 + Math.sin(tt * 5 + i) * 0.12, Math.sin(a) * r));
      }
      const tn = tubeAlong(pts, (tt) => 0.055 * (1 - tt * 0.75), 40, 10, physical("membrane", 0x86efac, { opacity: 0.75 }));
      cnid.add(tn);
      tentacles.push(tn);
    }
    // cnidocyte studding — tiny glowing battery cells on column
    for (let i = 0; i < 20; i++) {
      const a = (i / 20) * Math.PI * 2;
      const cc = sph(0.025, 0xfde047);
      cc.material = physical("organ", 0xfde047);
      cc.position.set(Math.cos(a) * 0.34, 0.3 + (i % 5) * 0.35, Math.sin(a) * 0.34);
      cnid.add(cc);
    }
    cnid.position.set(-4.4, 0.2, 0);
    g.add(cnid);

    // — PLATYHELMINTHES: flat smooth ribbon, acoelomate (real skin sheen) —
    const flatPts: THREE.Vector3[] = [];
    for (let i = 0; i <= 8; i++) {
      const t = i / 8;
      flatPts.push(new THREE.Vector3(-2.4 + t * 2.6, 1.1 + Math.sin(t * 4) * 0.1, Math.sin(t * 3) * 0.12));
    }
    const flat = tubeAlong(flatPts, (t) => {
      const taper = Math.min(1, Math.min(t, 1 - t) * 4 + 0.25);
      return 0.5 * taper;
    }, 60, 18, physical("wetSkin", 0xd8a79a));
    flat.scale.z = 0.16;
    flat.position.set(1.1, 0, 0);
    g.add(flat);
    // eye spots
    for (const ex of [1.55, 1.7]) {
      const eye = sph(0.045, 0x1c1917);
      eye.position.set(ex, 1.32, 0.09);
      g.add(eye);
    }
    // — ASCHELMINTHES: round tapered worm, pseudocoelom (Ascaris form) —
    const rndPts: THREE.Vector3[] = [];
    for (let i = 0; i <= 8; i++) {
      const t = i / 8;
      rndPts.push(new THREE.Vector3(-2.6 + t * 2.8, -0.75 + Math.sin(t * 5) * 0.08, Math.sin(t * 2.5) * 0.1));
    }
    const round = tubeAlong(rndPts, (t) => 0.24 * Math.min(1, Math.min(t, 1 - t) * 6 + 0.18) * (1 - 0.35 * t), 70, 18, physical("wetSkin", 0xf0c9a0));
    round.position.set(1.3, 0, 0);
    g.add(round);

    // — ANNELIDA: genuinely segmented, textured worm (true coelom) —
    const ann = new THREE.Group();
    const annPts: THREE.Vector3[] = [];
    for (let i = 0; i <= 9; i++) {
      const t = i / 9;
      annPts.push(new THREE.Vector3(-1.4 + t * 2.8, Math.sin(t * 6) * 0.1, 0));
    }
    const annBody = tubeAlong(annPts, (t) => {
      const taper = Math.min(1, Math.min(t, 1 - t) * 5 + 0.2);
      // metamere ripple: radius wobbles per segment
      return (0.3 + 0.045 * Math.sin(t * 9 * Math.PI)) * taper;
    }, 120, 22, mats.annelid);
    ann.add(annBody);
    // clitellum hint
    const annCl = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, 0.5, 24), physical("organ", 0xc06a3a));
    annCl.rotation.z = Math.PI / 2;
    annCl.position.x = 0.1;
    ann.scale.setScalar(1);
    ann.add(annCl);
    ann.position.set(2.9, 1.35, 0);
    g.add(ann);

    // — ARTHROPODA: chitinous exoskeleton, jointed legs —
    const arth = new THREE.Group();
    // head-thorax-abdomen in glossy chitin
    const headA = new THREE.Mesh(organicBlob(0.3, 51, 2, 0.08), physical("chitin", 0x2dd4bf));
    headA.position.x = -0.62;
    const thorax = new THREE.Mesh(organicBlob(0.42, 52, 2, 0.07), physical("chitin", 0x14b8a6));
    thorax.scale.set(1.1, 0.85, 0.9);
    const abdomen = new THREE.Mesh(organicBlob(0.5, 53, 2, 0.1), physical("chitin", 0x0d9488));
    abdomen.scale.set(1.5, 0.8, 0.85);
    abdomen.position.x = 0.75;
    arth.add(headA, thorax, abdomen);
    // antennae
    for (const s of [-1, 1]) {
      const antPts = [new THREE.Vector3(-0.75, 0.1, s * 0.12), new THREE.Vector3(-1.05, 0.38, s * 0.28), new THREE.Vector3(-1.3, 0.5, s * 0.4)];
      arth.add(tubeAlong(antPts, () => 0.018, 24, 8, physical("chitin", 0x5eead4)));
    }
    // 3 pairs of jointed legs (femur+tibia), chitin
    for (let i = -1; i <= 1; i++) {
      for (const s of [-1, 1]) {
        const femur = cyl(0.035, 0.045, 0.62, 0xffffff);
        femur.material = physical("chitin", 0x2dd4bf);
        femur.position.set(i * 0.32, -0.32, s * 0.4);
        femur.rotation.x = s * 0.8;
        femur.rotation.z = 0.35 * i;
        const tibia = cyl(0.025, 0.035, 0.58, 0xffffff);
        tibia.material = physical("chitin", 0x5eead4);
        tibia.position.set(i * 0.32 + 0.16 * i, -0.72, s * 0.72);
        tibia.rotation.x = s * 1.15;
        arth.add(femur, tibia);
      }
    }
    arth.position.set(2.9, -0.85, 0);
    g.add(arth);

    // — MOLLUSCA: iridescent nacre spiral shell + muscular foot —
    const moll = new THREE.Group();
    // whorled shell: stacked shrinking toroids along a spiral — real nacre map
    const whorls = new THREE.Group();
    for (let i = 0; i < 6; i++) {
      const t = i / 5;
      const w = new THREE.Mesh(new THREE.TorusGeometry(0.5 - t * 0.26, 0.16 - t * 0.06, 14, 30), mats.nacreShell);
      const a = t * Math.PI * 1.5;
      w.position.set(Math.cos(a) * (0.42 - t * 0.3), i * 0.16, Math.sin(a) * (0.42 - t * 0.3));
      w.rotation.x = Math.PI / 2;
      whorls.add(w);
    }
    whorls.position.y = 0.35;
    moll.add(whorls);
    // muscular foot — broad wet sole
    const foot = new THREE.Mesh(organicBlob(0.5, 54, 2, 0.1), physical("wetSkin", 0xc084fc));
    foot.scale.set(1.7, 0.32, 0.9);
    foot.position.y = -0.25;
    moll.add(foot);
    // head tentacles
    for (const s of [-1, 1]) {
      const tnt = cyl(0.02, 0.03, 0.4, 0xffffff);
      tnt.material = physical("wetSkin", 0xd8b4fe);
      tnt.position.set(-0.78, 0.15, s * 0.14);
      tnt.rotation.z = 0.6;
      tnt.rotation.x = s * 0.2;
      moll.add(tnt);
    }
    moll.position.set(6.4, 1.15, 0);
    g.add(moll);

    // — ECHINODERMATA: pentaradial star with textured bumpy arms —
    const ech = new THREE.Group();
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2;
      const armPts: THREE.Vector3[] = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(Math.cos(a) * 0.6, 0.06, Math.sin(a) * 0.6), new THREE.Vector3(Math.cos(a) * 1.15, 0.02, Math.sin(a) * 1.15)];
      const arm = tubeAlong(armPts, (t) => 0.26 * (1 - t * 0.62), 30, 14, physical("organ", 0xea7a4a));
      ech.add(arm);
      // tube feet rows under each arm
      for (let s = 1; s <= 3; s++) {
        const tf = cyl(0.015, 0.025, 0.2, 0xffffff);
        tf.material = physical("membrane", 0xfdba74, { opacity: 0.8 });
        tf.position.set(Math.cos(a) * s * 0.3, -0.2, Math.sin(a) * s * 0.3 + 0.12);
        tf.rotation.x = Math.PI / 2;
        ech.add(tf);
      }
    }
    const core = new THREE.Mesh(organicBlob(0.4, 55, 2, 0.1), physical("organ", 0xf97316));
    ech.add(core);
    // central anus plate + madreporite
    const madre = sph(0.08, 0xfff7ed);
    madre.material = physical("organ", 0xfff7ed);
    madre.position.set(0.16, 0.34, 0.1);
    ech.add(madre);
    ech.position.set(6.2, -1.15, 0);
    g.add(ech);

    // — CHORDATA: textured scaly fish with notochord/dorsal cord stripe —
    const chord = new THREE.Group();
    const fishPts: THREE.Vector3[] = [];
    for (let i = 0; i <= 8; i++) {
      const t = i / 8;
      fishPts.push(new THREE.Vector3(-0.9 + t * 1.8, 0, 0));
    }
    const fishBody = tubeAlong(fishPts, (t) => {
      const taper = Math.sin(t * Math.PI);
      return 0.16 + 0.5 * taper;
    }, 80, 22, mats.fish);
    fishBody.scale.z = 0.55;
    chord.add(fishBody);
    // tail fin — translucent membranes
    const tail = new THREE.Mesh(new THREE.ConeGeometry(0.4, 0.7, 2), physical("membrane", 0x67e8f9, { opacity: 0.7 }));
    tail.rotation.z = Math.PI / 2;
    tail.position.x = -1.3;
    tail.scale.z = 0.12;
    chord.add(tail);
    // dorsal fin
    const dorsal = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.5, 2), physical("membrane", 0x67e8f9, { opacity: 0.75 }));
    dorsal.position.set(0.05, 0.55, 0);
    dorsal.scale.z = 0.1;
    chord.add(dorsal);
    // eye
    const fEye = sph(0.07, 0xfffbeb);
    fEye.position.set(0.62, 0.14, 0.22);
    const fPupil = sph(0.035, 0x0f172a);
    fPupil.position.set(0.66, 0.14, 0.26);
    chord.add(fEye, fPupil);
    // purple dorsal nerve-cord stripe above body
    const cord = cyl(0.04, 0.04, 1.7, 0xffffff);
    cord.material = physical("muscle", 0x8b5cf6);
    cord.rotation.z = Math.PI / 2;
    cord.position.y = 0.52;
    chord.add(cord);
    // notochord — rod below nerve cord
    const noto = cyl(0.05, 0.05, 1.5, 0xffffff);
    noto.material = physical("organ", 0xfacc15);
    noto.rotation.z = Math.PI / 2;
    noto.position.y = 0.38;
    chord.add(noto);
    chord.position.set(9.6, 1.0, 0);
    g.add(chord);

    kit.addLbl("#fbbf24", "Porifera — asymmetric", "pores + osculum; cellular level, spicules", new THREE.Vector3(-9.0, 3.0, 0), new THREE.Vector3(-7.5, 1.7, 0));
    kit.addLbl("#4ade80", "Cnidaria — radial", "diploblastic, cnidocytes, coelenteron", new THREE.Vector3(-4.4, 3.2, 0), new THREE.Vector3(-4.4, 1.9, 0));
    kit.addLbl("#ef4444", "Platyhelminthes — flat, acoelomate", "flattened; no body cavity", new THREE.Vector3(-3.4, -2.9, 0.2), new THREE.Vector3(-1.8, 1.05, 0));
    kit.addLbl("#f97316", "Aschelminthes — round, pseudocoelom", "unsegmented; false coelom", new THREE.Vector3(-3.6, -3.6, -0.4), new THREE.Vector3(-1.2, -0.6, 0));
    kit.addLbl("#b45309", "Annelida — segmented, true coelom", "metamerism; closed circulation", new THREE.Vector3(2.9, 3.1, 0), new THREE.Vector3(2.9, 1.8, 0));
    kit.addLbl("#7dd3fc", "Arthropoda — jointed, exoskeleton", "open circulation; chitin cuticle", new THREE.Vector3(2.9, -3.2, 0), new THREE.Vector3(2.9, -1.6, 0));
    kit.addLbl("#a855f7", "Mollusca — soft, shell, foot", "open/closed; mantle cavity", new THREE.Vector3(6.4, 3.2, 0), new THREE.Vector3(6.6, 1.5, 0));
    kit.addLbl("#fb923c", "Echinodermata — pentaradial", "water vascular system; marine", new THREE.Vector3(6.2, -3.3, 0), new THREE.Vector3(6.2, -1.6, 0));
    kit.addLbl("#22d3ee", "Chordata — notochord, dorsal cord", "pharyngeal slits; post-anal tail", new THREE.Vector3(9.6, 3.1, 0), new THREE.Vector3(9.8, 1.5, 0));
    titleText(kit.ts, "Animalia — nine phyla at a glance", new THREE.Vector3(0, 4.2, 0));

    return (t: number) => {
      cnid.rotation.y = t * 0.4;
      ech.rotation.y = t * 0.6;
      chord.rotation.z = Math.sin(t * 1.4) * 0.12;
      arth.rotation.y = Math.sin(t * 0.7) * 0.3;
      moll.rotation.y = t * 0.3;
      // hydra tentacle sway
      tentacles.forEach((tn, i) => (tn.rotation.z = Math.sin(t * 1.8 + i) * 0.14));
      // starfish tube-feet pulse
      // (positions static; keep arm group gently rocking)
      porifera.rotation.z = Math.sin(t * 0.8) * 0.02;
    };
  }, []);

  return (
    <div className="space-y-4">
      <CanvasMount mountRef={mountRef} webGL={webGL} targetRef={vizTargetRef} />
      <TheoryPanel
        title="Theory — Animal phyla body plans"
        look="Nine miniature 3D forms in a row: a leathery amber sponge pocked with pores and glassy spicules, a translucent green hydra swaying six lanky tentacles, a pink flat ribbon above a tapered pale roundworm, a banded brown worm with a saddle above a glossy teal chitinous arthropod with jointed legs, an iridescent nacre-whorled shell on a purple muscular foot, an orange five-armed star with tube feet, and a blue scaly fish bearing a yellow notochord and purple dorsal nerve cord."
        principle="Animal classification tracks four innovations: (1) symmetry — none (Porifera), radial (Cnidaria, adult Echinodermata), bilateral (rest); (2) germ layers — diploblastic vs triploblastic; (3) body cavity — acoelomate (flatworms), pseudocoelomate (roundworms), true coelomate (annulus onward); (4) segmentation — metameric in Annelida/Arthropoda/Chordata. Chordata adds the notochord, dorsal hollow nerve cord, pharyngeal slits and post-anal tail."
        why="Reading any unknown animal into its phylum uses exactly these characters — the backbone of every NEB classification question."
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Frog — external + heart + urogenital                                */
/* ------------------------------------------------------------------ */

export function FrogScene() {
  const tex = useMemo(() => frogSkinTexture(), []);
  const { mountRef, webGL, vizTargetRef } = useFaunalScene((kit) => {
    const g = kit.ts.group;
    const skin = physical("wetSkin", 0xffffff, { map: tex.map, bumpMap: tex.bump, bumpScale: 0.7 });
    const skinDark = physical("wetSkin", 0x2f6b31);

    // Body — organic blob with skin texture
    const body = new THREE.Mesh(organicBlob(1.6, 61, 2, 0.05), skin);
    body.scale.set(1.35, 0.75, 1.0);
    body.position.set(0, 0.9, 0);
    g.add(body);
    // Head (short, truncated)
    const head = new THREE.Mesh(organicBlob(1.0, 62, 2, 0.06), skin);
    head.scale.set(1.0, 0.65, 0.9);
    head.position.set(-1.9, 1.05, 0);
    g.add(head);
    // Eyes with nictitating membrane hint
    for (const z of [-0.55, 0.55]) {
      const eye = sph(0.28, 0xfde047);
      eye.position.set(-2.2, 1.55, z);
      const pupil = sph(0.12, 0x111827);
      pupil.position.set(-2.38, 1.6, z);
      g.add(eye, pupil);
    // Tympanum (eardrum) disc behind eye
      const ty = cyl(0.22, 0.22, 0.06, 0x166534);
      ty.rotation.y = Math.PI / 2;
      ty.position.set(-1.7, 1.15, z * 1.25);
      g.add(ty);
    }
    // Forelimbs (short, 4 digits)
    const limb = physical("wetSkin", 0x2f7a33);
    for (const s of [-1, 1]) {
      const upper = cyl(0.13, 0.16, 0.9, 0xffffff);
      upper.material = limb;
      upper.position.set(-0.9, 0.25, s * 0.9);
      upper.rotation.x = s * 0.5;
      upper.rotation.z = 0.5;
      const hand = new THREE.Mesh(organicBlob(0.22, 63, 1, 0.1), skinDark);
      hand.scale.set(1.3, 0.4, 0.9);
      hand.position.set(-1.35, -0.35, s * 1.15);
      g.add(upper, hand);
    }
    // Hindlimbs (long, folded — thigh+shank+foot, 5 webbed digits)
    for (const s of [-1, 1]) {
      const thigh = cyl(0.2, 0.22, 1.5, 0xffffff);
      thigh.material = limb;
      thigh.position.set(1.3, 0.45, s * 1.0);
      thigh.rotation.x = s * 0.35;
      thigh.rotation.z = -0.9;
      const shank = cyl(0.16, 0.19, 1.6, 0xffffff);
      shank.material = limb;
      shank.position.set(2.35, 0.15, s * 1.15);
      shank.rotation.x = s * 0.3;
      shank.rotation.z = 0.8;
      const foot = new THREE.Mesh(organicBlob(0.32, 64, 1, 0.08), skinDark);
      foot.scale.set(1.5, 0.3, 1.0);
      foot.position.set(3.1, -0.45, s * 1.2);
      g.add(thigh, shank, foot);
      // webbing
      for (let d = -1; d <= 1; d += 1) {
        const web = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.45, 5), physical("membrane", 0x86efac, { opacity: 0.7 }));
        web.position.set(3.35 + d * 0.12, -0.42, s * (1.2 + d * 0.18));
        web.rotation.z = Math.PI / 2;
        g.add(web);
      }
    }
    // Webbed hint on the mouth: wide mouth line
    const mouth = box(0.02, 0.03, 1.3, 0x14532d);
    mouth.position.set(-2.65, 0.85, 0);
    g.add(mouth);

    // — HEART inset (3-chambered) floating beside the body —
    const heart = new THREE.Group();
    const atriumL = new THREE.Mesh(organicBlob(0.4, 65, 1, 0.1), physical("organ", 0xc2262a)); atriumL.position.set(0, 0.35, -0.45);
    const atriumR = new THREE.Mesh(organicBlob(0.4, 66, 1, 0.1), physical("organ", 0xd45454)); atriumR.position.set(0, 0.35, 0.45);
    const ventricle = new THREE.Mesh(organicBlob(0.55, 67, 2, 0.12), physical("muscle", 0x9a1f1f)); ventricle.scale.set(0.85, 1.15, 0.85); ventricle.position.y = -0.35;
    const truncus = cyl(0.12, 0.16, 0.9, 0x60a5fa);
    truncus.rotation.z = 0.7;
    truncus.position.set(-0.55, 0.75, 0);
    heart.add(atriumL, atriumR, ventricle, truncus);
    heart.position.set(-5.4, 2.4, 0);
    heart.scale.setScalar(0.9);
    g.add(heart);

    kit.addLbl("#fde047", "Bulging eyes + nictitating membrane", "vision in air & water", new THREE.Vector3(-4.6, 3.3, 0), new THREE.Vector3(-2.2, 1.65, 0.55));
    kit.addLbl("#166534", "Tympanum", "external eardrum behind each eye", new THREE.Vector3(-0.7, 3.3, 1.3), new THREE.Vector3(-1.7, 1.2, 0.7));
    kit.addLbl("#34d399", "Moist scaleless skin", "cutaneous respiration (helper to lungs)", new THREE.Vector3(2.4, 3.2, -0.6), new THREE.Vector3(0.6, 1.35, -0.7));
    kit.addLbl("#16a34a", "Hindlimbs — long, webbed", "5 digits: jumping & swimming", new THREE.Vector3(4.8, -2.6, 0.4), new THREE.Vector3(3.1, -0.55, 1.2));
    kit.addLbl("#b91c1c", "Heart — 3 chambers", "2 atria + 1 ventricle; mixed double circulation", new THREE.Vector3(-7.2, 3.4, 0), new THREE.Vector3(-5.5, 2.9, 0));
    titleText(kit.ts, "Frog (Rana tigrina) — external + heart", new THREE.Vector3(0, 4.2, 0));
    contactGround(kit.ts.scene, -1.5, 24);

    return (t: number) => {
      ventricle.scale.y = 1.15 + 0.12 * Math.abs(Math.sin(t * 4.2));
      ventricle.scale.x = 0.85 - 0.06 * Math.abs(Math.sin(t * 4.2));
      heart.position.y = 2.4 + Math.sin(t * 4.2) * 0.05;
    };
  }, []);

  return (
    <div className="space-y-4">
      <CanvasMount mountRef={mountRef} webGL={webGL} targetRef={vizTargetRef} />
      <TheoryPanel
        title="Theory — Frog external & heart"
        look="A green frog with a short flat head, golden protruding eyes with dark pupils, round tympanum discs, a squat body, short hands and long folded webbed legs. Beside it floats a red three-chambered heart — two atria on top of one beating ventricle with a blue truncus arteriosus."
        principle="The frog is an amphibian: moist scaleless skin performs cutaneous respiration (supplementing buccopharyngeal and pulmonary breathing). The hindlimbs are much longer than forelimbs (saltatorial locomotion) with webbed digits for swimming. Its heart has two atria but a single ventricle — deoxygenated and oxygenated blood mix partially; double circulation (pulmocutaneous + systemic) is therefore 'incomplete'."
        why="The 3-chambered heart vs 4-chambered comparison, cutaneous respiration, and external identification features are recurring NEB/CEE physiology and structure questions."
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Frog — urogenital (male & female) + digestion overview               */
/* ------------------------------------------------------------------ */

export function FrogUrogenitalScene() {
  const { mountRef, webGL, vizTargetRef } = useFaunalScene((kit) => {
    const g = kit.ts.group;
    // ghost body silhouette — translucent membrane shell
    const silhouette = new THREE.Mesh(organicBlob(1.9, 71, 2, 0.05), physical("membrane", 0x78350f, { opacity: 0.12 }));
    silhouette.scale.set(1.6, 0.8, 1.0);
    g.add(silhouette);

    // — DIGESTIVE overview (real organ materials) —
    const mouth = box(0.5, 0.06, 1.1, 0x1c1917);
    mouth.position.set(-2.6, 0.35, 0);
    const buccal = new THREE.Mesh(organicBlob(0.55, 72, 2, 0.1), physical("mucosa", 0xf59e0b));
    buccal.scale.set(1.5, 0.9, 1.1);
    buccal.position.set(-1.9, 0.2, 0);
    // oesophagus — smooth muscle tube curving down
    const oesPts = [new THREE.Vector3(-1.15, 0.55, 0), new THREE.Vector3(-0.5, 0.62, 0), new THREE.Vector3(0.1, 0.42, 0)];
    const oes = tubeAlong(oesPts, (t) => 0.2 + 0.06 * Math.sin(t * Math.PI), 30, 14, physical("muscle", 0xfbbf24));
    // stomach — J-shaped muscular sac with glossy lining
    const stoPts = [new THREE.Vector3(0.15, 0.4, 0), new THREE.Vector3(0.9, 0.3, 0.05), new THREE.Vector3(1.5, 0.0, 0), new THREE.Vector3(1.7, -0.3, 0)];
    const stomach = tubeAlong(stoPts, (t) => 0.42 * (0.75 + 0.45 * Math.sin(t * Math.PI)), 60, 18, physical("muscle", 0xc2262a));
    // intestine — coiled tube (duodenum loop → ileum → rectum)
    const intPts: THREE.Vector3[] = [];
    for (let i = 0; i <= 12; i++) {
      const t = i / 12;
      intPts.push(new THREE.Vector3(1.75 + t * 1.5 - 0.5 * Math.sin(t * Math.PI * 2), -0.35 - t * 0.35 + 0.35 * Math.sin(t * Math.PI), 0.5 * Math.sin(t * Math.PI * 3)));
    }
    const intestine = tubeAlong(intPts, () => 0.2, 90, 14, physical("mucosa", 0x22c55e));
    const cloaca = new THREE.Mesh(organicBlob(0.34, 73, 1, 0.1), physical("mucosa", 0x15803d));
    cloaca.position.set(3.55, -0.65, 0);
    // liver — 3-lobed glossy organ + gallbladder
    const liverL = new THREE.Mesh(organicBlob(0.62, 74, 2, 0.09), physical("organ", 0x6b3410));
    liverL.scale.set(1.15, 0.65, 1.2);
    liverL.position.set(-0.25, 0.85, 0);
    const liverR = new THREE.Mesh(organicBlob(0.5, 75, 2, 0.09), physical("organ", 0x7c3f14));
    liverR.scale.set(0.9, 0.6, 1.0);
    liverR.position.set(0.45, 0.8, 0.35);
    const gall = new THREE.Mesh(organicBlob(0.16, 76, 1, 0.1), physical("membrane", 0x22c55e, { opacity: 0.85 }));
    gall.position.set(0.15, 0.55, 0.62);
    g.add(mouth, buccal, oes, stomach, intestine, cloaca, liverL, liverR, gall);

    // — MALE (left) vs FEMALE (right) gonads —
    // testes (pale yellow ovoids) atop kidneys + Bidder's canal
    const testis = new THREE.Mesh(organicBlob(0.3, 77, 2, 0.08), physical("organ", 0xf3d34a));
    testis.scale.set(0.85, 1.35, 0.85);
    testis.position.set(1.6, 0.95, -0.6);
    // kidney — dark red elongated organ under testis
    const kidney = new THREE.Mesh(organicBlob(0.34, 78, 2, 0.08), physical("organ", 0x8f1d2c));
    kidney.scale.set(0.7, 1.9, 0.7);
    kidney.position.set(1.7, 0.55, -0.85);
    g.add(kidney);
    // fat bodies (fingered golden-orange lobes)
    const fat = new THREE.Group();
    for (let i = 0; i < 6; i++) {
      const fPts = [
        new THREE.Vector3(1.25 + i * 0.14, 1.35, -0.78),
        new THREE.Vector3(1.32 + i * 0.16, 1.62 - i * 0.03, -0.82),
        new THREE.Vector3(1.38 + i * 0.18, 1.82 - i * 0.09, -0.86),
      ];
      fat.add(tubeAlong(fPts, (t) => 0.055 * (1 - t * 0.6), 20, 8, physical("organ", 0xfb923c)));
    }
    g.add(testis, fat);

    // ovary with dark eggs (right) — lobed sac studded with ova
    const ovary = new THREE.Mesh(organicBlob(0.58, 79, 2, 0.14), physical("membrane", 0xc026d3, { opacity: 0.6 }));
    ovary.scale.set(1.2, 0.9, 0.9);
    ovary.position.set(1.9, 1.0, 0.7);
    g.add(ovary);
    for (let i = 0; i < 10; i++) {
      const e = new THREE.Mesh(organicBlob(0.09, 80 + i, 1, 0.08), physical("organ", 0x2e1065));
      const a = i * 0.63;
      e.position.set(1.9 + Math.cos(a) * 0.4, 1.0 + Math.sin(a) * 0.32, 0.7 + Math.sin(a * 2 + 1) * 0.28);
      g.add(e);
    }
    // oviduct — genuinely coiled tube (not stacked rings) → cloaca
    const oviPts: THREE.Vector3[] = [];
    for (let i = 0; i <= 20; i++) {
      const t = i / 20;
      oviPts.push(new THREE.Vector3(
        2.45 + t * 1.1,
        0.85 - t * 1.3 + 0.18 * Math.sin(t * Math.PI * 4),
        0.42 + 0.34 * Math.sin(t * Math.PI * 5),
      ));
    }
    const oviduct = tubeAlong(oviPts, (t) => 0.085 * (0.8 + 0.5 * Math.sin(t * Math.PI)), 90, 12, physical("mucosa", 0xf0abfc));
    g.add(oviduct);
    // ovisac funnel at the ovary end
    const funnel = new THREE.Mesh(organicBlob(0.12, 95, 1, 0.12), physical("mucosa", 0xf5d0fe));
    funnel.position.set(2.4, 0.95, 0.45);
    g.add(funnel);

    kit.addLbl("#1c1917", "Wide mouth → buccal cavity", "voracious predator; tongue flips out", new THREE.Vector3(-4.8, 2.9, 0), new THREE.Vector3(-2.6, 0.4, 0));
    kit.addLbl("#ef4444", "Stomach (J-shaped sac)", "chemical digestion; pyloric valve behind", new THREE.Vector3(1.5, 3.1, 0.3), new THREE.Vector3(1.1, 0.35, 0));
    kit.addLbl("#a16207", "Liver (3 lobes) + gallbladder", "bile emulsifies fat", new THREE.Vector3(-2.0, -3.0, 0.4), new THREE.Vector3(-0.25, 0.85, 0.3));
    kit.addLbl("#22c55e", "Coiled intestine → cloaca", "absorption; common exit for waste & gametes", new THREE.Vector3(5.9, 1.9, 0), new THREE.Vector3(3.55, -0.65, 0));
    kit.addLbl("#facc15", "Testes + fat bodies (male)", "sperm via kidneys; Bidder's canal", new THREE.Vector3(-0.2, -3.2, -0.6), new THREE.Vector3(1.6, 1.0, -0.6));
    kit.addLbl("#8f1d2c", "Kidney (elongated, dark red)", "excretion; also passes sperm in males", new THREE.Vector3(0.6, -3.4, -0.9), new THREE.Vector3(1.7, 0.55, -0.85));
    kit.addLbl("#c026d3", "Ovary with ova (female)", "thousands of eggs; seasonal", new THREE.Vector3(3.6, 3.2, 0.6), new THREE.Vector3(1.9, 1.05, 0.7));
    kit.addLbl("#f0abfc", "Coiled oviduct", "adds jelly coat on the way to cloaca", new THREE.Vector3(5.2, -2.9, 0.4), new THREE.Vector3(3.3, -0.4, 0.45));
    titleText(kit.ts, "Frog — urogenital & digestive overview", new THREE.Vector3(0, 4.3, 0));

    return (t: number) => {
      ovary.scale.y = 0.9 + 0.06 * Math.sin(t * 1.5);
      liverL.scale.y = 0.65 + 0.015 * Math.sin(t * 2.1);
      liverR.scale.y = 0.6 + 0.015 * Math.sin(t * 2.1 + 0.4);
    };
  }, []);

  return (
    <div className="space-y-4">
      <CanvasMount mountRef={mountRef} webGL={webGL} targetRef={vizTargetRef} />
      <TheoryPanel
        title="Theory — Frog urogenital system"
        look="Inside a ghostly translucent body: a dark mouth funnels into an amber buccal cavity, a glossy J-shaped crimson stomach empties through a green coiled intestine into the cloaca; dark-red liver lobes with an emerald gallbladder sheathe the top. Pale-yellow ovoid testes and fingered orange fat bodies mark the male side above an elongated dark-red kidney; a translucent magenta ovary studded with deep-purple ova and a genuinely coiled pink oviduct mark the female."
        principle="Frogs excrete and reproduce through one cloaca. Males: testes → vasa efferentia travel through the kidneys (Bidder's canal) → ureters act as urinogenital ducts. Females: ovaries shed eggs into the coelom, drawn by oviducal funnels; glands in the coiled oviduct add jelly coats, and eggs exit via the cloaca for external fertilisation in water. Digestion is carnivore-adapted: short alimentary canal, protease-rich stomach."
        why="Male ureters doubling as sperm ducts, the jelly-coated external fertilisation, and the cloaca as a common chamber are the exact NEB physiology points — plus digestive-organ identification."
      />
    </div>
  );
}
