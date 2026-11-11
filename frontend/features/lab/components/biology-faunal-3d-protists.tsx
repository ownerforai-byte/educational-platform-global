"use client";

/**
 * Faunal Diversity 3D — Protista scenes, REALISM BUILD.
 *
 * Paramecium caudatum (ultrastructure + conjugation) and Plasmodium vivax
 * (life cycle). Realism layer: granular cytoplasm texture, translucent
 * pellicle membrane with transmission, organic-blob nuclei, glossy RBC,
 * chitinous mosquito, soft contact shadow.
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
  tor,
  seg,
  titleText,
} from "./biology-faunal-3d-kit";
import {
  protozoaCytoplasmTexture,
  physical,
  organicBlob,
  contactGround,
} from "./biology-faunal-3d-realism";

/* ------------------------------------------------------------------ */
/* Paramecium caudatum — ultrastructure                                */
/* ------------------------------------------------------------------ */

export function ParameciumScene() {
  const tex = useMemo(() => protozoaCytoplasmTexture(), []);
  const { mountRef, webGL, vizTargetRef } = useFaunalScene((kit) => {
    const g = kit.ts.group;

    // cytoplasm — granular textured interior
    const cyto = new THREE.Mesh(
      new THREE.SphereGeometry(2.2, 48, 32),
      physical("membrane", 0xffffff, { map: tex, opacity: 0.5, roughness: 0.5 }),
    );
    cyto.material.transmission = 0.25;
    cyto.scale.set(1.6, 0.78, 0.95);
    g.add(cyto);

    // pellicle — thin iridescent skin with slight transmission
    const pellicle = new THREE.Mesh(
      new THREE.SphereGeometry(2.27, 48, 32),
      physical("membrane", 0x67e8f9, { opacity: 0.28, roughness: 0.22 }),
    );
    pellicle.material.transmission = 0.7;
    pellicle.material.ior = 1.42;
    pellicle.scale.set(1.6, 0.78, 0.95);
    g.add(pellicle);

    // cilia — fine tapered shafts in metachronal rows
    const cilia: THREE.Mesh[] = [];
    const N = 64;
    const ciliaMat = physical("chitin", 0xf97316);
    for (let i = 0; i < N; i++) {
      const a = (i / N) * Math.PI * 2;
      const row = i % 4;
      const x = Math.cos(a) * 3.5;
      const z = Math.sin(a) * 2.05;
      const shaft = cyl(0.02, 0.05, 0.55, 0xffffff);
      shaft.material = ciliaMat;
      shaft.position.set(x, 0, z);
      shaft.rotation.z = -Math.PI / 2 * Math.sign(Math.cos(a) || 1);
      shaft.rotation.x = Math.sin(a) > 0 ? 0.35 + row * 0.03 : -0.35 - row * 0.03;
      g.add(shaft);
      cilia.push(shaft);
    }

    // oral groove — soft trough
    const groove = new THREE.Group();
    for (let i = 0; i < 10; i++) {
      const t = i / 9;
      const b = new THREE.Mesh(
        new THREE.BoxGeometry(0.14, 0.05, 0.7 - 0.3 * Math.abs(t - 0.5)),
        physical("mucosa", 0xfbbf24, { opacity: 0.85 }),
      );
      b.position.set(2.6 - 2.2 * t, 0.35 - 0.5 * t, 0.9 * Math.sin(t * Math.PI) * 0.6);
      groove.add(b);
    }
    g.add(groove);

    // cytostome + cytopharynx
    const cytostome = new THREE.Mesh(organicBlob(0.22, 6, 2, 0.12), physical("mucosa", 0xd97706));
    cytostome.position.set(1.7, -0.55, 0.35);
    g.add(cytostome);
    g.add(seg(new THREE.Vector3(1.65, -0.6, 0.35), new THREE.Vector3(0.9, -1.15, 0.1), 0xd97706, 0.05));

    // food vacuoles — glossy green spheres
    const foods: THREE.Mesh[] = [];
    for (let i = 0; i < 7; i++) {
      const f = new THREE.Mesh(
        organicBlob(0.12 + 0.045 * (i % 3), i * 11 + 2, 1, 0.12),
        physical("organ", i % 2 ? 0x34d399 : 0xa3e635, { opacity: 0.95 }),
      );
      g.add(f);
      foods.push(f);
    }

    // macronucleus — kidney-shaped organic blob, granular
    const macro = new THREE.Mesh(organicBlob(0.6, 13, 2, 0.16), physical("organ", 0xc2410c));
    macro.scale.set(1.3, 0.82, 0.9);
    macro.position.set(-0.35, 0.25, 0);
    g.add(macro);
    // micronucleus
    const micro = new THREE.Mesh(organicBlob(0.18, 17, 1, 0.1), physical("organ", 0x7c3aed));
    micro.position.set(0.55, 0.05, 0.2);
    g.add(micro);

    // contractile vacuoles with radiating canals
    const cvs: { node: THREE.Group; base: THREE.Vector3 }[] = [];
    for (const [cx] of [
      [-2.1], [2.05],
    ] as const) {
      const grp = new THREE.Group();
      const v = new THREE.Mesh(organicBlob(0.32, cx * 3, 1, 0.08), physical("membrane", 0x38bdf8, { opacity: 0.55 }));
      grp.add(v);
      for (let i = 0; i < 5; i++) {
        const a = (i / 5) * Math.PI * 2;
        grp.add(seg(new THREE.Vector3(0, 0, 0), new THREE.Vector3(Math.cos(a) * 0.55, Math.sin(a) * 0.55, 0), 0x7dd3fc, 0.02));
      }
      grp.position.set(cx, cx > 0 ? -0.45 : 0.45, 0);
      g.add(grp);
      cvs.push({ node: grp, base: grp.position.clone() });
    }

    // trichocysts — dark darts under pellicle
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2 + 0.3;
      const t = new THREE.Mesh(new THREE.ConeGeometry(0.045, 0.3, 6), physical("chitin", 0x475569));
      t.position.set(Math.cos(a) * 3.2, Math.sin(a) * 1.35, Math.sin(a * 2) * 0.6);
      t.rotation.z = Math.PI / 2;
      g.add(t);
    }

    contactGround(kit.ts.scene, -2.7, 26);

    kit.addLbl("#f97316", "Cilia — locomotion & feeding current", "9 rows of ciliature; beat in waves", new THREE.Vector3(-1.5, 2.6, 1.4), new THREE.Vector3(-1.9, 0.35, 1.15));
    kit.addLbl("#67e8f9", "Pellicle", "firm alveolar skin — keeps slipper shape", new THREE.Vector3(0.4, 2.75, -1.2), new THREE.Vector3(0.5, 1.15, -0.8));
    kit.addLbl("#fbbf24", "Oral groove → cytostome", "cilia drive food to the cell mouth", new THREE.Vector3(4.4, 1.9, 0.6), new THREE.Vector3(2.45, 0.2, 0.75));
    kit.addLbl("#34d399", "Food vacuoles", "circulate on cytoplasmic streaming", new THREE.Vector3(0.6, -2.75, 0.9), new THREE.Vector3(0.35, -0.85, 0.45));
    kit.addLbl("#c2410c", "Macronucleus", "metabolic polyploid nucleus", new THREE.Vector3(-4.5, 2.3, 0), new THREE.Vector3(-0.9, 0.35, 0));
    kit.addLbl("#7c3aed", "Micronucleus", "germ-line nucleus for conjugation", new THREE.Vector3(3.1, 2.9, -0.6), new THREE.Vector3(0.75, 0.2, 0.25));
    kit.addLbl("#38bdf8", "Contractile vacuoles + canals", "osmoregulation — one at each end", new THREE.Vector3(-4.7, -2.4, 0.4), new THREE.Vector3(-2.2, 0.1, 0.2));
    kit.addLbl("#64748b", "Trichocysts", "defensive darts under the pellicle", new THREE.Vector3(-3.4, -3.15, -0.6), new THREE.Vector3(-1.35, -1.15, -0.35));
    titleText(kit.ts, "Paramecium caudatum — ultrastructure", new THREE.Vector3(0, 3.6, 0));

    return (t: number) => {
      cilia.forEach((c, i) => {
        c.rotation.y = Math.sin(t * 6 + i * 0.7) * 0.5;
      });
      foods.forEach((f, i) => {
        const ph = t * 0.5 + (i / foods.length) * Math.PI * 2;
        f.position.set(Math.cos(ph) * 1.9, Math.sin(ph * 1.3) * 0.75, Math.sin(ph) * 0.85);
      });
      cvs.forEach((cv, i) => {
        const s = 1 + 0.26 * Math.max(0, Math.sin(t * 2 + i * Math.PI));
        cv.node.scale.setScalar(s);
      });
      macro.rotation.z = Math.sin(t * 0.8) * 0.12;
    };
  }, [tex]);

  return (
    <div className="space-y-4">
      <CanvasMount mountRef={mountRef} webGL={webGL} targetRef={vizTargetRef} />
      <TheoryPanel
        title="Theory — Paramecium caudatum (structure)"
        look="A glassy translucent slipper: granular teal cytoplasm under a faintly iridescent pellicle, ringed by fine orange cilia combing the water. A golden oral groove sinks to the cell mouth; glossy green food vacuoles ride the current; a rust-red kidney-shaped macronucleus and violet micronucleus float mid-cell; blue pulsing vacuoles with ray-thin canals cap each end."
        principle="Paramecium is a freshwater ciliate: the alveolar pellicle fixes the slipper shape while ciliary metachronal waves power swimming and the feeding current. Food vacuoles follow a circulatory route (cyclosis) for digestion; two contractile vacuoles with radiating canals expel excess water; the binucleate condition separates metabolic control (macronucleus) from inheritance (micronucleus)."
        why="Explains ciliate dominance in stagnant water, osmoregulation against continuous influx, and the micronucleus's role in conjugation — a classic NEB structure question."
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Paramecium — reproduction                                           */
/* ------------------------------------------------------------------ */

export function ParameciumReproductionScene() {
  const tex = useMemo(() => protozoaCytoplasmTexture(), []);
  const { mountRef, webGL, vizTargetRef } = useFaunalScene((kit) => {
    const g = kit.ts.group;

    const bodyMat = physical("membrane", 0x22d3ee, { map: tex, opacity: 0.4 });
    bodyMat.transmission = 0.35;

    // LEFT: transverse binary fission
    const fission = new THREE.Group();
    const fh1 = new THREE.Mesh(new THREE.SphereGeometry(1.5, 40, 28), bodyMat);
    fh1.scale.set(1.3, 0.75, 0.9); fh1.position.set(0, 0.78, 0);
    const fh2 = new THREE.Mesh(new THREE.SphereGeometry(1.5, 40, 28), bodyMat);
    fh2.scale.set(1.3, 0.75, 0.9); fh2.position.set(0, -0.78, 0);
    const ring = tor(1.28, 0.08, 0xfbbf24, 0.9);
    ring.rotation.y = Math.PI / 2;
    ring.scale.set(1, 0.75, 0.95);
    const n1 = new THREE.Mesh(organicBlob(0.4, 21, 1, 0.12), physical("organ", 0xc2410c)); n1.position.set(0, 0.55, 0);
    const n2 = new THREE.Mesh(organicBlob(0.4, 22, 1, 0.12), physical("organ", 0xc2410c)); n2.position.set(0, -0.55, 0);
    const m1 = new THREE.Mesh(organicBlob(0.15, 23, 1, 0.1), physical("organ", 0x7c3aed)); m1.position.set(0.5, 0.45, 0.2);
    const m2 = new THREE.Mesh(organicBlob(0.15, 24, 1, 0.1), physical("organ", 0x7c3aed)); m2.position.set(0.5, -0.45, 0.2);
    fission.add(fh1, fh2, ring, n1, n2, m1, m2);
    fission.position.set(-4.2, 0.2, 0);
    fission.scale.setScalar(0.9);
    g.add(fission);

    // RIGHT: conjugation
    const conj = new THREE.Group();
    const c1 = new THREE.Mesh(new THREE.SphereGeometry(1.5, 40, 28), bodyMat);
    c1.scale.set(1.45, 0.75, 0.9); c1.position.set(-1.62, 0, 0);
    const c2 = new THREE.Mesh(new THREE.SphereGeometry(1.5, 40, 28), bodyMat);
    c2.scale.set(1.45, 0.75, 0.9); c2.position.set(1.62, 0, 0);
    conj.add(c1, c2);
    conj.add(seg(new THREE.Vector3(-0.55, 0, 0), new THREE.Vector3(0.55, 0, 0), 0x67e8f9, 0.13));
    const pm1 = new THREE.Mesh(organicBlob(0.16, 31, 1, 0.1), physical("organ", 0xf472b6)); pm1.position.set(-0.25, 0.22, 0);
    const pm2 = new THREE.Mesh(organicBlob(0.16, 32, 1, 0.1), physical("organ", 0xf472b6)); pm2.position.set(0.25, -0.22, 0);
    const st1 = new THREE.Mesh(organicBlob(0.16, 33, 1, 0.1), physical("organ", 0x7c3aed)); st1.position.set(-0.85, -0.2, 0.15);
    const st2 = new THREE.Mesh(organicBlob(0.16, 34, 1, 0.1), physical("organ", 0x7c3aed)); st2.position.set(0.85, 0.2, 0.15);
    conj.add(pm1, pm2, st1, st2);
    conj.position.set(3.4, 0.2, 0);
    conj.scale.setScalar(0.95);
    g.add(conj);

    contactGround(kit.ts.scene, -2.7, 28);

    kit.addLbl("#fbbf24", "Transverse binary fission", "mid-body constriction; micronucleus divides by mitosis first", new THREE.Vector3(-6.6, 2.7, 0), new THREE.Vector3(-4.4, 1.1, 0));
    kit.addLbl("#7c3aed", "Daughter micronuclei", "one to each daughter cell", new THREE.Vector3(-2.4, -2.7, 0.4), new THREE.Vector3(-3.5, -0.55, 0.2));
    kit.addLbl("#67e8f9", "Cytoplasmic bridge", "cells unite oral-region to oral-region", new THREE.Vector3(3.4, 2.75, 0.4), new THREE.Vector3(3.4, 0.55, 0));
    kit.addLbl("#f472b6", "Migratory pronuclei", "swap partners, then fuse (synkaryon)", new THREE.Vector3(6.9, 2.5, 0), new THREE.Vector3(3.7, 0.35, 0));
    kit.addLbl("#94a3b8", "Asexual: fission · Sexual: conjugation", "conjugation renews vitality (clonal aging)", new THREE.Vector3(-0.6, -2.85, 0));
    titleText(kit.ts, "Paramecium — reproduction", new THREE.Vector3(0, 3.9, 0));

    return (t: number) => {
      ring.scale.set(1, 0.75 + 0.25 * Math.abs(Math.sin(t * 1.4)), 0.95);
      fh1.position.y = 0.78 + 0.22 * Math.abs(Math.sin(t * 1.4));
      fh2.position.y = -0.78 - 0.22 * Math.abs(Math.sin(t * 1.4));
      pm1.position.x = -0.25 + 0.45 * (0.5 + 0.5 * Math.sin(t * 1.2));
      pm2.position.x = 0.25 - 0.45 * (0.5 + 0.5 * Math.sin(t * 1.2));
    };
  }, [tex]);

  return (
    <div className="space-y-4">
      <CanvasMount mountRef={mountRef} webGL={webGL} targetRef={vizTargetRef} />
      <TheoryPanel
        title="Theory — Paramecium reproduction"
        look="Left: one glassy slipper pinches at a golden constriction into two daughters with rust-red nuclei already split. Right: two cells join mouth-to-mouth over a cyan bridge while pink pronuclei slide across to fuse with violet partners."
        principle="Asexual reproduction is transverse binary fission — the division plane crosses the oral-groove axis; the micronucleus divides mitotically while the macronucleus elongates and splits amitotically. Sexual reproduction is conjugation: two compatible mating types unite, meiosis reduces the micronuclei, one haploid pronucleus migrates and fuses, restoring diploidy before the pair separates and divides."
        why="Conjugation explains recombination and 'rejuvenation'; fission explains explosive growth — both standard NEB reproduction questions."
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Plasmodium vivax — life cycle                                       */
/* ------------------------------------------------------------------ */

export function PlasmodiumScene() {
  const tex = useMemo(() => protozoaCytoplasmTexture(), []);
  const { mountRef, webGL, vizTargetRef } = useFaunalScene((kit) => {
    const g = kit.ts.group;

    // Human RBC — biconcave disc, glossy haemoglobin
    const rbc = new THREE.Mesh(organicBlob(1.7, 41, 1, 0.04), physical("organ", 0xc2262a, { roughness: 0.28 }));
    rbc.material.clearcoat = 0.7;
    rbc.scale.set(1.35, 0.62, 1.0);
    rbc.position.set(3.6, 0.4, 0);
    g.add(rbc);
    const dimple = tor(0.95, 0.26, 0x8f1618, 0.75);
    dimple.rotation.x = Math.PI / 2;
    dimple.scale.set(1.0, 1.0, 0.5);
    dimple.position.set(3.6, 0.6, 0);
    g.add(dimple);

    // signet-ring trophozoite
    const ringStage = tor(0.42, 0.11, 0xf59e0b, 1);
    ringStage.rotation.x = Math.PI / 2.3;
    ringStage.position.set(3.5, 0.4, 0.25);
    g.add(ringStage);
    const nucleusDot = sph(0.1, 0x581c87);
    nucleusDot.position.set(3.72, 0.5, 0.28);
    g.add(nucleusDot);

    // schizont rosette
    const schiz = new THREE.Group();
    const meroMat = physical("organ", 0xd97706);
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      const m = new THREE.Mesh(new THREE.CapsuleGeometry(0.08, 0.3, 4, 10), meroMat);
      m.position.set(Math.cos(a) * 0.5, Math.sin(a) * 0.5, 0);
      m.rotation.z = a + Math.PI / 2;
      schiz.add(m);
    }
    schiz.position.set(5.7, -1.15, 0.3);
    g.add(schiz);

    // Mosquito — chitinous, hairy, naturalistic
    const mosquito = new THREE.Group();
    const chitin = physical("chitin", 0x2c3a47);
    const thorax = new THREE.Mesh(organicBlob(0.72, 51, 1, 0.1), chitin);
    thorax.position.set(0, 0.9, 0);
    const abdomen = new THREE.Mesh(new THREE.CapsuleGeometry(0.38, 1.6, 8, 16), physical("chitin", 0x1f2937));
    abdomen.rotation.z = -Math.PI / 2.2;
    abdomen.position.set(1.35, 1.25, 0);
    const head = new THREE.Mesh(organicBlob(0.42, 52, 1, 0.1), chitin);
    head.position.set(-0.8, 0.85, 0);
    const prob = cyl(0.035, 0.07, 1.5, 0xb8c4ce);
    prob.rotation.z = Math.PI / 2 - 0.5;
    prob.position.set(-1.5, 0.45, 0);
    // antennae
    for (const s of [-1, 1]) {
      const ant = seg(new THREE.Vector3(-0.95, 1.05, s * 0.2), new THREE.Vector3(-1.5, 1.6, s * 0.55), 0x94a3b8, 0.015);
      mosquito.add(ant);
    }
    // legs (3 pairs, jointed)
    for (let i = 0; i < 3; i++) {
      for (const s of [-1, 1]) {
        const lx = -0.3 + i * 0.6;
        mosquito.add(seg(new THREE.Vector3(lx, 0.75, s * 0.45), new THREE.Vector3(lx + 0.35, 0.1, s * 0.95), 0x475569, 0.025));
        mosquito.add(seg(new THREE.Vector3(lx + 0.35, 0.1, s * 0.95), new THREE.Vector3(lx + 0.75, -0.55, s * 1.15), 0x475569, 0.02));
      }
    }
    // wings
    const wgeo = new THREE.CircleGeometry(0.9, 24);
    for (const s of [-1, 1]) {
      const w = new THREE.Mesh(wgeo, new THREE.MeshPhysicalMaterial({ color: 0xb8c4ce, transparent: true, opacity: 0.22, side: THREE.DoubleSide, roughness: 0.2, transmission: 0.5 }));
      w.rotation.set(-Math.PI / 2 * s * 0.4 + (s < 0 ? Math.PI : 0), 0, 0.6);
      w.position.set(0, 1.5, s * 0.25);
      mosquito.add(w);
    }
    mosquito.add(thorax, abdomen, head, prob);
    mosquito.position.set(-4.9, 1.1, 0);
    mosquito.scale.setScalar(1.05);
    g.add(mosquito);

    // sporozoites
    const spor: THREE.Mesh[] = [];
    const sporMat = physical("organ", 0x0ea5e9);
    for (let i = 0; i < 5; i++) {
      const s = new THREE.Mesh(new THREE.CapsuleGeometry(0.045, 0.5, 4, 10), sporMat);
      s.rotation.z = 0.9;
      g.add(s);
      spor.push(s);
    }

    // gametocyte — banana-shaped crescent
    const gamPts = [
      new THREE.Vector3(-0.9, 0, 0),
      new THREE.Vector3(-0.3, 0.28, 0),
      new THREE.Vector3(0.3, 0.28, 0),
      new THREE.Vector3(0.9, 0, 0),
    ];
    const gam = new THREE.Mesh(
      new THREE.TubeGeometry(new THREE.CatmullRomCurve3(gamPts), 24, 0.16, 12, false),
      physical("organ", 0x9333ea),
    );
    gam.position.set(1.2, -1.7, 0);
    g.add(gam);

    contactGround(kit.ts.scene, -3.0, 30);

    kit.addLbl("#94a3b8", "Female Anopheles — vector", "injects sporozoites with saliva", new THREE.Vector3(-6.9, 2.9, 0), new THREE.Vector3(-5.6, 1.7, 0));
    kit.addLbl("#38bdf8", "Sporozoites → liver", "pre-erythrocytic schizogony (silent week)", new THREE.Vector3(-3.4, -2.5, 0.4), new THREE.Vector3(-1.9, -0.9, 0.2));
    kit.addLbl("#c2262a", "Human RBC — biconcave", "erythrocytic cycle begins", new THREE.Vector3(6.7, 1.9, 0), new THREE.Vector3(4.9, 0.85, 0));
    kit.addLbl("#f59e0b", "Signet-ring trophozoite", "ring stage — the 'tertian' fever trigger", new THREE.Vector3(1.4, 2.6, 0.8), new THREE.Vector3(3.2, 0.55, 0.3));
    kit.addLbl("#d97706", "Schizont → merozoites", "RBC bursts; each merozoite re-invades", new THREE.Vector3(7.3, -2.3, 0.2), new THREE.Vector3(5.9, -1.2, 0.3));
    kit.addLbl("#9333ea", "Gametocyte (banana-shaped)", "picked up by mosquito → cycle continues", new THREE.Vector3(-0.7, -2.9, 0), new THREE.Vector3(1.2, -1.7, 0));
    titleText(kit.ts, "Plasmodium vivax — life cycle", new THREE.Vector3(0, 3.9, 0));

    return (t: number) => {
      mosquito.position.y = 1.1 + Math.sin(t * 1.8) * 0.12;
      spor.forEach((s, i) => {
        const ph = (t * 0.35 + i / spor.length) % 1;
        s.position.set(-4.6 + ph * 7.4, 1.0 - ph * 1.1 + Math.sin(ph * 9) * 0.3, 0.15 * Math.sin(ph * 6));
      });
      ringStage.rotation.z = t * 0.8;
      schiz.rotation.z = t * 0.5;
      gam.rotation.z = Math.sin(t) * 0.2;
    };
  }, [tex]);

  return (
    <div className="space-y-4">
      <CanvasMount mountRef={mountRef} webGL={webGL} targetRef={vizTargetRef} />
      <TheoryPanel
        title="Theory — Plasmodium vivax life cycle"
        look="A glossy dark-chitined mosquito with jointed legs and film-translucent wings hangs left; slim blue sporozoites stream right toward a glossy biconcave RBC holding an amber signet-ring parasite. A golden rosette schizont bursts nearby; a purple banana-shaped gametocyte drifts below."
        principle="P. vivax needs two hosts. In man: sporozoites → liver schizogony (pre-erythrocytic, symptom-free ~10–14 days) → merozoites invade RBCs → erythrocytic cycle of ring → trophozoite → schizont → burst (fever every 48 h — benign tertian) → some become gametocytes. In the mosquito: gametes fertilise in the gut, ookinete → oocyst on the gut wall → sporozoites reach the salivary glands."
        why="Explains fever periodicity, blood-smear diagnosis of the erythrocytic stage, liver-stage relapse via hypnozoites in P. vivax, and why vector control breaks transmission — core NEB + CEE material."
      />
    </div>
  );
}
