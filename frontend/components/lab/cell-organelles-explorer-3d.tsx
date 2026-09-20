"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import * as THREE from "three";
import { CSS2DRenderer, CSS2DObject } from "three/addons/renderers/CSS2DRenderer.js";
import {
  CELL_ORGANELLES,
  PLANT_VS_ANIMAL_COMPARISON,
  type CellOrganelleData,
} from "@/lib/cell-organelles-data";
import {
  createThreeScene,
  disposeThreeScene,
  bindResize,
  standardMaterial,
  type ThreeScene,
} from "@/components/lab/three-scene";
import { isWebGLAvailable } from "@/lib/webgl";
import { Button } from "@/components/ui/button";
import {
  Search,
  BookOpen,
  History,
  Activity,
  Layers,
  Sparkles,
  CheckCircle2,
  Award,
  ChevronDown,
  Atom,
  Dna,
  Zap,
  FlaskConical,
  Scale,
  GraduationCap,
  RotateCw,
  Eye,
  EyeOff,
  Maximize2,
  Info,
  ExternalLink,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* 3D Model Builders for Each Organelle                               */
/* ------------------------------------------------------------------ */

interface OrganelleModelPin {
  label: string;
  sub?: string;
  pos: [number, number, number];
  color: string;
}

function buildMitochondrionModel(group: THREE.Group): OrganelleModelPin[] {
  // Outer membrane capsule (translucent with cutaway window)
  const outerMat = standardMaterial(0xef4444, {
    transparent: true,
    opacity: 0.45,
    roughness: 0.3,
  });
  const outer = new THREE.Mesh(new THREE.CapsuleGeometry(1.2, 2.2, 16, 24), outerMat);
  group.add(outer);

  // Inner membrane matrix core
  const innerMat = standardMaterial(0x7f1d1d, { roughness: 0.6 });
  const innerCore = new THREE.Mesh(new THREE.CapsuleGeometry(1.0, 2.0, 16, 24), innerMat);
  group.add(innerCore);

  // Shelf-like folded Cristae (multiple transverse wavy discs/tubes)
  const cristaMat = standardMaterial(0xfca5a5, {
    emissive: 0xef4444,
    emissiveIntensity: 0.25,
    roughness: 0.4,
  });

  for (let i = -5; i <= 5; i++) {
    const y = i * 0.24;
    const r = Math.sqrt(Math.max(0, 1.0 - (y * y) / 4.0)) * 0.9;
    if (r > 0.3) {
      const crista = new THREE.Mesh(
        new THREE.CylinderGeometry(r, r, 0.08, 20),
        cristaMat
      );
      crista.position.set(i % 2 === 0 ? 0.15 : -0.15, y, 0);
      crista.rotation.x = 0.15;
      crista.rotation.z = i % 2 === 0 ? 0.2 : -0.2;
      group.add(crista);
    }
  }

  // Circular mitochondrial DNA loop (mtDNA)
  const dnaCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.4, 0.2, 0.5),
    new THREE.Vector3(-0.1, 0.6, 0.6),
    new THREE.Vector3(0.4, 0.3, 0.5),
    new THREE.Vector3(0.2, -0.3, 0.6),
    new THREE.Vector3(-0.3, -0.2, 0.5),
  ], true);
  const dnaMesh = new THREE.Mesh(
    new THREE.TubeGeometry(dnaCurve, 32, 0.024, 6, true),
    standardMaterial(0xfef08a, { emissive: 0xfacc15, emissiveIntensity: 0.4 })
  );
  group.add(dnaMesh);

  // 70S ribosomes inside matrix
  const riboMat = standardMaterial(0x38bdf8, { roughness: 0.3 });
  for (let i = 0; i < 24; i++) {
    const rm = new THREE.Mesh(new THREE.SphereGeometry(0.045, 8, 8), riboMat);
    rm.position.set(
      (Math.random() - 0.5) * 1.2,
      (Math.random() - 0.5) * 1.8,
      (Math.random() - 0.5) * 1.2
    );
    group.add(rm);
  }

  return [
    { label: "Outer Membrane", sub: "smooth with porin channels", pos: [1.3, 1.2, 0], color: "#ef4444" },
    { label: "Cristae Folds", sub: "inner membrane folds housing ETC", pos: [-1.2, 0.1, 0], color: "#fca5a5" },
    { label: "Mitochondrial Matrix", sub: "Krebs cycle enzymes & 70S ribosomes", pos: [0.3, -0.8, 0.6], color: "#38bdf8" },
    { label: "Circular mtDNA", sub: "naked prokaryotic-like DNA loop", pos: [0.1, 0.5, 0.7], color: "#facc15" },
  ];
}

function buildNucleusModel(group: THREE.Group): OrganelleModelPin[] {
  // Outer nuclear envelope (with cutaway hemisphere)
  const envelopeMat = standardMaterial(0x8b5cf6, {
    transparent: true,
    opacity: 0.5,
    roughness: 0.3,
  });
  const envelope = new THREE.Mesh(new THREE.SphereGeometry(1.8, 36, 30), envelopeMat);
  group.add(envelope);

  // Inner dense Nucleoplasm
  const nucleoplasm = new THREE.Mesh(
    new THREE.SphereGeometry(1.5, 32, 24),
    standardMaterial(0x6d28d9, { roughness: 0.6, transparent: true, opacity: 0.4 })
  );
  group.add(nucleoplasm);

  // Nucleolus (dense ribosomal RNA factory)
  const nucleolus = new THREE.Mesh(
    new THREE.SphereGeometry(0.55, 24, 20),
    standardMaterial(0x4c1d95, { emissive: 0x7c3aed, emissiveIntensity: 0.3 })
  );
  nucleolus.position.set(0.3, 0.2, 0.2);
  group.add(nucleolus);

  // Chromatin coils (unwound DNA-protein fibers)
  const chromPts: THREE.Vector3[] = [];
  for (let i = 0; i < 45; i++) {
    const t = (i / 45) * Math.PI * 4;
    chromPts.push(
      new THREE.Vector3(
        Math.sin(t * 1.5) * (0.6 + 0.5 * Math.cos(i * 0.7)),
        Math.cos(t * 1.2) * 0.8,
        Math.sin(t * 2.1) * (0.6 + 0.4 * Math.sin(i * 0.5))
      )
    );
  }
  const chromCurve = new THREE.CatmullRomCurve3(chromPts);
  const chromMesh = new THREE.Mesh(
    new THREE.TubeGeometry(chromCurve, 64, 0.038, 6),
    standardMaterial(0xc4b5fd, { emissive: 0xa78bfa, emissiveIntensity: 0.2 })
  );
  group.add(chromMesh);

  // Nuclear pores (rings distributed on surface)
  const poreMat = standardMaterial(0xfde047, { metalness: 0.3, roughness: 0.2 });
  const poreGeo = new THREE.TorusGeometry(0.12, 0.035, 8, 16);
  [
    [0, 1.8, 0], [1.4, 0.9, 0.5], [-1.2, 1.1, -0.6], [0.8, -1.3, 0.8],
    [-1.5, -0.8, 0.4], [0, 0.5, 1.7], [-0.7, -0.6, 1.5], [1.2, 0, -1.3]
  ].forEach(([x, y, z]) => {
    const pore = new THREE.Mesh(poreGeo, poreMat);
    pore.position.set(x, y, z);
    pore.lookAt(x * 2, y * 2, z * 2);
    group.add(pore);
  });

  return [
    { label: "Nuclear Envelope", sub: "double membrane continuous with RER", pos: [1.8, 1.4, 0], color: "#8b5cf6" },
    { label: "Nuclear Pores", sub: "octagonal transport gate complexes", pos: [0.1, 2.0, 0], color: "#fde047" },
    { label: "Nucleolus", sub: "rRNA synthesis & ribosome assembly", pos: [0.4, 0.3, 0.3], color: "#7c3aed" },
    { label: "Chromatin Network", sub: "genomic DNA + histone octamers", pos: [-1.0, -0.6, 0.5], color: "#c4b5fd" },
  ];
}

function buildGolgiModel(group: THREE.Group): OrganelleModelPin[] {
  // Curved Cisternae stacks (Cis face to Trans face)
  const colors = [0xf472b6, 0xec4899, 0xdb2777, 0xbe185d, 0x9d174d];
  for (let i = 0; i < 5; i++) {
    const r = 1.6 - i * 0.12;
    const curve = new THREE.CylinderGeometry(r, r, 0.12, 32, 1, false, 0, Math.PI * 1.3);
    const mat = standardMaterial(colors[i], { roughness: 0.35, side: THREE.DoubleSide });
    const c = new THREE.Mesh(curve, mat);
    c.position.set(0, -0.8 + i * 0.38, 0);
    c.rotation.z = 0.15;
    group.add(c);
  }

  // Budding transport vesicles at Cis face (bottom)
  [[-0.6, -1.2, 0.3], [0.5, -1.3, -0.2], [-0.1, -1.4, 0.5]].forEach(([x, y, z]) => {
    const v = new THREE.Mesh(new THREE.SphereGeometry(0.16, 14, 12), standardMaterial(0xfbcfe8));
    v.position.set(x, y, z);
    group.add(v);
  });

  // Large Secretory vesicles budding at Trans face (top)
  [[-0.8, 1.2, 0.4], [0.7, 1.3, 0.2], [0.1, 1.5, -0.3], [-0.4, 1.6, -0.1]].forEach(([x, y, z]) => {
    const sv = new THREE.Mesh(
      new THREE.SphereGeometry(0.24, 16, 14),
      standardMaterial(0xf43f5e, { emissive: 0xe11d48, emissiveIntensity: 0.2 })
    );
    sv.position.set(x, y, z);
    group.add(sv);
  });

  return [
    { label: "Cis Face (Forming Face)", sub: "receives transport vesicles from ER", pos: [0.8, -1.3, 0], color: "#fbcfe8" },
    { label: "Cisternae Stacks", sub: "parallel curved sacs for protein glycosylation", pos: [1.8, 0.2, 0], color: "#ec4899" },
    { label: "Trans Face (Maturing Face)", sub: "buds secretory vesicles & primary lysosomes", pos: [0.8, 1.5, 0], color: "#f43f5e" },
    { label: "Secretory Vesicles", sub: "cargo packaging for exocytosis", pos: [-1.1, 1.4, 0.4], color: "#e11d48" },
  ];
}

function buildChloroplastModel(group: THREE.Group): OrganelleModelPin[] {
  // Biconvex outer envelope
  const outerMat = standardMaterial(0x10b981, {
    transparent: true,
    opacity: 0.45,
    roughness: 0.3,
  });
  const outer = new THREE.Mesh(new THREE.SphereGeometry(1.8, 36, 24), outerMat);
  outer.scale.set(1.4, 0.8, 1.0);
  group.add(outer);

  // Thylakoid Grana Stacks (piles of green discs)
  const granaPositions: [number, number, number][] = [
    [-0.9, -0.1, 0.2],
    [-0.3, 0.1, -0.4],
    [0.4, -0.15, 0.3],
    [0.9, 0.1, -0.2],
    [0.1, 0.2, 0.5],
  ];

  const discMat = standardMaterial(0x22c55e, {
    emissive: 0x16a34a,
    emissiveIntensity: 0.3,
    roughness: 0.35,
  });

  granaPositions.forEach(([gx, gy, gz], gi) => {
    const numDiscs = 4 + (gi % 3);
    for (let d = 0; d < numDiscs; d++) {
      const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.065, 18), discMat);
      disc.position.set(gx, gy - 0.2 + d * 0.09, gz);
      group.add(disc);
    }
  });

  // Stroma Lamellae (frets / tubular bridges connecting grana)
  const fretMat = standardMaterial(0x4ade80, { roughness: 0.4 });
  const fret1 = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.1, 8), fretMat);
  fret1.position.set(-0.6, 0, 0);
  fret1.rotation.z = Math.PI / 2.3;
  const fret2 = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.2, 8), fretMat);
  fret2.position.set(0.65, 0, 0);
  fret2.rotation.z = -Math.PI / 2.5;
  group.add(fret1, fret2);

  // Starch plastoglobules & circular DNA
  const starchMat = standardMaterial(0xfde68a, { roughness: 0.5 });
  for (let i = 0; i < 6; i++) {
    const s = new THREE.Mesh(new THREE.SphereGeometry(0.08, 10, 8), starchMat);
    s.position.set((Math.random() - 0.5) * 1.6, (Math.random() - 0.5) * 0.6, (Math.random() - 0.5) * 1.0);
    group.add(s);
  }

  return [
    { label: "Outer & Inner Envelope", sub: "double-membrane boundary", pos: [1.9, 0.8, 0], color: "#10b981" },
    { label: "Thylakoid Grana", sub: "site of light reaction & ATP photophosphorylation", pos: [-1.2, 0.3, 0.3], color: "#22c55e" },
    { label: "Stroma Matrix", sub: "contains RuBisCO for dark reaction (Calvin cycle)", pos: [0, -0.6, 0.6], color: "#34d399" },
    { label: "Stroma Lamellae", sub: "tubes connecting adjacent grana", pos: [0.7, 0.2, 0], color: "#4ade80" },
  ];
}

function buildErModel(group: THREE.Group): OrganelleModelPin[] {
  // Rough ER (ribosome-studded flat cisternae)
  const rerMat = standardMaterial(0x0284c7, { roughness: 0.4 });
  for (let i = 0; i < 4; i++) {
    const c = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.12, 1.1), rerMat);
    c.position.set(-0.6, -0.6 + i * 0.4, 0);
    c.rotation.x = 0.2;
    group.add(c);

    // Ribosomes studded on outer surfaces
    for (let r = 0; r < 18; r++) {
      const ribo = new THREE.Mesh(
        new THREE.SphereGeometry(0.038, 8, 8),
        standardMaterial(0x38bdf8, { emissive: 0x0284c7, emissiveIntensity: 0.3 })
      );
      ribo.position.set(
        -1.7 + Math.random() * 2.2,
        c.position.y + 0.08,
        -0.4 + Math.random() * 0.8
      );
      group.add(ribo);
    }
  }

  // Smooth ER (branching tubular network without ribosomes)
  const serMat = standardMaterial(0x38bdf8, { roughness: 0.35 });
  const tubeCurves = [
    [new THREE.Vector3(0.6, -0.5, 0), new THREE.Vector3(1.1, -0.3, 0.4), new THREE.Vector3(1.5, -0.6, 0.1), new THREE.Vector3(1.8, -0.2, -0.3)],
    [new THREE.Vector3(0.6, 0.2, 0.2), new THREE.Vector3(1.2, 0.5, -0.1), new THREE.Vector3(1.6, 0.2, 0.3), new THREE.Vector3(1.9, 0.6, 0)],
    [new THREE.Vector3(0.7, 0.8, -0.1), new THREE.Vector3(1.3, 0.9, 0.3), new THREE.Vector3(1.7, 0.7, -0.2)],
  ];

  tubeCurves.forEach((pts) => {
    const curve = new THREE.CatmullRomCurve3(pts);
    const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 32, 0.08, 8, false), serMat);
    group.add(tube);
  });

  return [
    { label: "Rough ER (RER)", sub: "ribosome-studded cisternae for protein synthesis", pos: [-1.4, 0.5, 0], color: "#0284c7" },
    { label: "Attached Ribosomes", sub: "bound via ribophorin proteins", pos: [-0.8, 0.9, 0.4], color: "#38bdf8" },
    { label: "Smooth ER (SER)", sub: "tubular network for lipid synthesis & detox", pos: [1.7, 0.4, 0], color: "#38bdf8" },
  ];
}

function buildCentrosomeModel(group: THREE.Group): OrganelleModelPin[] {
  // Pair of perpendicular Centrioles (90 degrees, 9+0 triplet microtubule pattern)
  const c1Group = new THREE.Group();
  const cMat = standardMaterial(0xe2e8f0, { roughness: 0.3, metalness: 0.2 });

  // Build 9 triplet microtubules in a cylinder ring
  for (let i = 0; i < 9; i++) {
    const angle = (i / 9) * Math.PI * 2;
    const x = Math.cos(angle) * 0.45;
    const z = Math.sin(angle) * 0.45;
    const subTube = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 1.4, 8), cMat);
    subTube.position.set(x, 0, z);
    c1Group.add(subTube);
  }
  c1Group.position.set(-0.4, 0, 0);

  // Second centriole strictly perpendicular
  const c2Group = c1Group.clone();
  c2Group.rotation.z = Math.PI / 2;
  c2Group.position.set(0.4, 0.3, 0);

  // Radiating Aster Microtubule Fibers
  const asterMat = new THREE.LineBasicMaterial({ color: 0x94a3b8, transparent: true, opacity: 0.5 });
  for (let i = 0; i < 24; i++) {
    const angle = (i / 24) * Math.PI * 2;
    const length = 1.2 + Math.random() * 0.8;
    const lineGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(Math.cos(angle) * length, (Math.random() - 0.5) * 1.5, Math.sin(angle) * length),
    ]);
    group.add(new THREE.Line(lineGeo, asterMat));
  }

  group.add(c1Group, c2Group);

  return [
    { label: "Centriole 1", sub: "9+0 triplet microtubule cylinder", pos: [-0.9, 0.7, 0], color: "#e2e8f0" },
    { label: "Centriole 2", sub: "oriented at exact 90° right angle", pos: [0.9, 0.8, 0], color: "#e2e8f0" },
    { label: "Pericentriolar Material (PCM)", sub: "nucleates mitotic spindle fibers", pos: [0, -1.0, 0], color: "#94a3b8" },
  ];
}

function buildLysosomeModel(group: THREE.Group): OrganelleModelPin[] {
  // Cutaway outer lipid bilayer membrane (3/4 sphere so interior is exposed)
  const shellMat = standardMaterial(0xef4444, {
    transparent: true,
    opacity: 0.45,
    roughness: 0.3,
    side: THREE.DoubleSide,
  });
  const shell = new THREE.Mesh(
    new THREE.SphereGeometry(1.4, 36, 24, 0, Math.PI * 1.5, 0, Math.PI),
    shellMat
  );
  group.add(shell);

  // Protective Glycoprotein Coat (LAMP-1/2 shield on internal leaflet)
  const lampMat = standardMaterial(0xfca5a5, { transparent: true, opacity: 0.4, side: THREE.DoubleSide });
  const lampCoat = new THREE.Mesh(
    new THREE.SphereGeometry(1.34, 24, 18, 0, Math.PI * 1.5, 0, Math.PI),
    lampMat
  );
  group.add(lampCoat);

  // Dense Acidic Lumen Matrix (pH 4.8 - 5.0)
  const matrix = new THREE.Mesh(
    new THREE.SphereGeometry(1.15, 24, 18),
    standardMaterial(0xb91c1c, {
      roughness: 0.6,
      emissive: 0xef4444,
      emissiveIntensity: 0.25,
      transparent: true,
      opacity: 0.7,
    })
  );
  group.add(matrix);

  // V-ATPase Proton Pumps (transmembrane complex pumping H+)
  const pumpMat = standardMaterial(0xf97316, { metalness: 0.2, roughness: 0.3 });
  [
    [0, 1.4, 0], [-1.0, 0.9, 0.4], [0.8, -1.0, 0.5], [-0.5, -1.2, -0.4]
  ].forEach(([x, y, z]) => {
    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.16, 8), pumpMat);
    base.position.set(x, y, z);
    base.lookAt(x * 2, y * 2, z * 2);
    group.add(base);
  });

  // Acid Hydrolases enzyme granules (Proteases, Nucleases, Lipases, Glycosidases)
  const enzymeColors = [0xfde047, 0x38bdf8, 0x4ade80, 0xf472b6];
  for (let i = 0; i < 35; i++) {
    const eg = new THREE.Mesh(
      new THREE.SphereGeometry(0.065, 8, 8),
      standardMaterial(enzymeColors[i % enzymeColors.length], {
        emissive: enzymeColors[i % enzymeColors.length],
        emissiveIntensity: 0.25,
      })
    );
    eg.position.set(
      (Math.random() - 0.5) * 1.6,
      (Math.random() - 0.5) * 1.6,
      (Math.random() - 0.5) * 1.6
    );
    group.add(eg);
  }

  return [
    { label: "Limiting Membrane", sub: "single bilayer protected by LAMP glycoproteins", pos: [1.5, 1.0, 0], color: "#ef4444" },
    { label: "V-ATPase Proton Pump", sub: "pumps H⁺ to maintain acidic pH 4.8–5.0", pos: [0.1, 1.6, 0], color: "#f97316" },
    { label: "Acid Hydrolases", sub: "50+ digestive enzymes (proteases, nucleases, lipases)", pos: [0.7, 0.4, 0.7], color: "#fde047" },
    { label: "Acidic Matrix Lumen", sub: "site of autophagy & cellular waste digestion", pos: [-0.7, -0.6, 0.8], color: "#b91c1c" },
  ];
}

function buildRibosomeModel(group: THREE.Group): OrganelleModelPin[] {
  // Large Subunit (60S)
  const largeSubunit = new THREE.Mesh(
    new THREE.SphereGeometry(1.15, 32, 24),
    standardMaterial(0xec4899, { roughness: 0.4, emissive: 0xdb2777, emissiveIntensity: 0.15 })
  );
  largeSubunit.scale.set(1.25, 0.95, 0.95);
  largeSubunit.position.set(0, 0.55, 0);

  // Small Subunit (40S)
  const smallSubunit = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.55, 1.25, 12, 18),
    standardMaterial(0xf472b6, { roughness: 0.45 })
  );
  smallSubunit.rotation.z = Math.PI / 2;
  smallSubunit.position.set(0, -0.65, 0.25);

  // mRNA strand threaded between subunits
  const mrnaCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-1.9, -0.15, 0.15),
    new THREE.Vector3(-0.8, -0.08, 0.2),
    new THREE.Vector3(0.5, -0.14, 0.15),
    new THREE.Vector3(1.9, -0.1, 0.1),
  ]);
  const mrnaMesh = new THREE.Mesh(
    new THREE.TubeGeometry(mrnaCurve, 32, 0.05, 6),
    standardMaterial(0xfacc15, { emissive: 0xeab308, emissiveIntensity: 0.4 })
  );

  // Cloverleaf / L-shaped tRNA at P-site (clamped in cleft)
  const trnaCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.15, -0.05, 0.2),
    new THREE.Vector3(0.2, 0.35, 0.15),
    new THREE.Vector3(0.05, 0.65, 0.1),
  ]);
  const trnaMesh = new THREE.Mesh(
    new THREE.TubeGeometry(trnaCurve, 16, 0.045, 6),
    standardMaterial(0x38bdf8, { emissive: 0x0284c7, emissiveIntensity: 0.3 })
  );

  // Emerging Nascent Polypeptide Chain from exit tunnel at back of 60S
  const polyPts = [
    new THREE.Vector3(-0.2, 0.8, -0.1),
    new THREE.Vector3(-0.35, 1.2, -0.3),
    new THREE.Vector3(-0.15, 1.55, -0.2),
    new THREE.Vector3(-0.4, 1.85, -0.35),
  ];
  const polyMesh = new THREE.Mesh(
    new THREE.TubeGeometry(new THREE.CatmullRomCurve3(polyPts), 24, 0.04, 6),
    standardMaterial(0xa855f7, { emissive: 0x9333ea, emissiveIntensity: 0.3 })
  );

  group.add(largeSubunit, smallSubunit, mrnaMesh, trnaMesh, polyMesh);

  return [
    { label: "Large Subunit (60S)", sub: "peptidyl transferase ribozyme site (28S rRNA)", pos: [1.3, 1.2, 0], color: "#ec4899" },
    { label: "Small Subunit (40S)", sub: "mRNA codon reading & decoding", pos: [-1.3, -1.0, 0], color: "#f472b6" },
    { label: "mRNA Strand", sub: "threaded 5' to 3' between the two subunits", pos: [1.6, -0.15, 0.15], color: "#facc15" },
    { label: "tRNA Molecule", sub: "delivers cognate amino acid into ribosomal cleft", pos: [0.3, 0.4, 0.5], color: "#38bdf8" },
    { label: "Nascent Polypeptide Chain", sub: "elongating protein chain exiting through tunnel", pos: [-0.6, 1.7, -0.3], color: "#a855f7" },
  ];
}

function buildVacuoleModel(group: THREE.Group): OrganelleModelPin[] {
  // Cutaway Tonoplast membrane
  const tonoplast = new THREE.Mesh(
    new THREE.SphereGeometry(1.6, 36, 24, 0, Math.PI * 1.5, 0, Math.PI),
    standardMaterial(0x38bdf8, { transparent: true, opacity: 0.45, roughness: 0.2, side: THREE.DoubleSide })
  );
  // Internal Cell Sap aqueous core
  const sapCore = new THREE.Mesh(
    new THREE.SphereGeometry(1.35, 28, 20),
    standardMaterial(0x0284c7, { transparent: true, opacity: 0.35, roughness: 0.15 })
  );
  group.add(tonoplast, sapCore);

  // Calcium oxalate needle crystals (Raphides cluster)
  const raphideMat = standardMaterial(0xf1f5f9, { roughness: 0.2, metalness: 0.2 });
  const raphideGroup = new THREE.Group();
  raphideGroup.position.set(0.4, 0.3, 0.3);
  for (let i = 0; i < 14; i++) {
    const needle = new THREE.Mesh(new THREE.ConeGeometry(0.02, 0.7, 4), raphideMat);
    needle.position.set((Math.random() - 0.5) * 0.3, (Math.random() - 0.5) * 0.3, (Math.random() - 0.5) * 0.3);
    needle.rotation.set(0.4 + Math.random() * 0.2, 0.3, 0.2);
    raphideGroup.add(needle);
  }
  group.add(raphideGroup);

  // Anthocyanin pigment solutes (dissolved in sap)
  for (let i = 0; i < 24; i++) {
    const sp = new THREE.Mesh(
      new THREE.SphereGeometry(0.065, 8, 8),
      standardMaterial(0xa855f7, { emissive: 0x9333ea, emissiveIntensity: 0.35 })
    );
    sp.position.set((Math.random() - 0.5) * 1.8, (Math.random() - 0.5) * 1.8, (Math.random() - 0.5) * 1.8);
    group.add(sp);
  }

  // Tonoplast V-ATPase proton pump complexes
  const pumpMat = standardMaterial(0x10b981, { roughness: 0.3 });
  [[0, 1.6, 0], [-1.2, 0.9, 0.5], [1.1, -1.0, 0.6]].forEach(([x, y, z]) => {
    const pump = new THREE.Mesh(new THREE.TorusGeometry(0.09, 0.03, 6, 12), pumpMat);
    pump.position.set(x, y, z);
    pump.lookAt(x * 2, y * 2, z * 2);
    group.add(pump);
  });

  return [
    { label: "Tonoplast Membrane", sub: "selectively permeable unit membrane with V-ATPase", pos: [1.8, 1.1, 0], color: "#38bdf8" },
    { label: "Cell Sap Solution", sub: "maintains cell turgor pressure & osmotic balance", pos: [-0.7, -0.5, 0.8], color: "#0284c7" },
    { label: "Calcium Oxalate Raphides", sub: "needle-like defense crystal clusters", pos: [0.6, 0.5, 0.4], color: "#f1f5f9" },
    { label: "Anthocyanin Pigments", sub: "water-soluble floral and fruit colorants", pos: [0.8, -0.9, 0.6], color: "#a855f7" },
  ];
}

function buildPeroxisomeModel(group: THREE.Group): OrganelleModelPin[] {
  // Outer single lipid bilayer membrane (translucent purple/violet)
  const outerMat = standardMaterial(0xa855f7, {
    transparent: true,
    opacity: 0.45,
    roughness: 0.3,
  });
  const outer = new THREE.Mesh(new THREE.SphereGeometry(1.4, 32, 24), outerMat);
  group.add(outer);

  // Peroxisome Matrix (granulated inner enzyme gel)
  const matrix = new THREE.Mesh(
    new THREE.SphereGeometry(1.15, 24, 18),
    standardMaterial(0x7e22ce, { transparent: true, opacity: 0.35, roughness: 0.6 })
  );
  group.add(matrix);

  // Dense Crystalline Urate Oxidase Core (Paracrystalline rhomboid lattice)
  const crystalMat = standardMaterial(0xc084fc, {
    roughness: 0.2,
    metalness: 0.1,
    emissive: 0x9333ea,
    emissiveIntensity: 0.4,
  });
  const crystalCore = new THREE.Mesh(new THREE.OctahedronGeometry(0.55, 0), crystalMat);
  crystalCore.scale.set(1.2, 0.8, 0.9);
  crystalCore.rotation.set(0.3, 0.4, 0.2);
  group.add(crystalCore);

  // Catalase enzyme clusters & reaction markers (breaking down H2O2 -> H2O + O2)
  const catMat = standardMaterial(0xfde047, { emissive: 0xeab308, emissiveIntensity: 0.3 });
  for (let i = 0; i < 28; i++) {
    const cat = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 8), catMat);
    cat.position.set(
      (Math.random() - 0.5) * 1.5,
      (Math.random() - 0.5) * 1.5,
      (Math.random() - 0.5) * 1.5
    );
    group.add(cat);
  }

  // PEX membrane protein import pores (embedded on the surface)
  const pexMat = standardMaterial(0x38bdf8, { metalness: 0.3, roughness: 0.2 });
  [
    [0, 1.4, 0], [1.1, 0.7, 0.4], [-1.0, -0.8, 0.5], [0.5, -1.2, -0.4], [-0.8, 0.9, -0.7]
  ].forEach(([x, y, z]) => {
    const pex = new THREE.Mesh(new THREE.TorusGeometry(0.09, 0.03, 6, 12), pexMat);
    pex.position.set(x, y, z);
    pex.lookAt(x * 2, y * 2, z * 2);
    group.add(pex);
  });

  return [
    { label: "Peroxisomal Membrane", sub: "single bilayer with PEX import pores", pos: [1.5, 1.1, 0], color: "#a855f7" },
    { label: "Crystalline Core", sub: "dense lattice of urate oxidase enzyme", pos: [0.1, 0.4, 0.7], color: "#c084fc" },
    { label: "Catalase Enzyme Matrix", sub: "decomposes toxic H₂O₂ into H₂O and O₂", pos: [-0.9, -0.7, 0.5], color: "#7e22ce" },
    { label: "Beta-Oxidation Site", sub: "breaks down very-long-chain fatty acids", pos: [0.9, -0.8, 0.3], color: "#fde047" },
  ];
}

function buildCellMembraneModel(group: THREE.Group): OrganelleModelPin[] {
  // Fluid mosaic model cross-section slab:
  // Upper Monolayer: Hydrophilic heads at y = 0.65, fatty acid tails pointing down
  // Lower Monolayer: Hydrophilic heads at y = -0.65, fatty acid tails pointing up
  const headMat = standardMaterial(0x38bdf8, { roughness: 0.3, metalness: 0.1 });
  const tailMat = standardMaterial(0x0284c7, { roughness: 0.6 });
  const headGeo = new THREE.SphereGeometry(0.12, 10, 8);

  const cols = 9;
  const rows = 5;
  const spacingX = 0.38;
  const spacingZ = 0.38;
  const offsetX = -((cols - 1) * spacingX) / 2;
  const offsetZ = -((rows - 1) * spacingZ) / 2;

  // Bilayer lipids
  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      const x = offsetX + c * spacingX;
      const z = offsetZ + r * spacingZ;

      // Skip a cavity in the center for the transmembrane channel protein
      if (Math.abs(x) < 0.55 && Math.abs(z) < 0.55) continue;

      // Top monolayer head & dual tails
      const topHead = new THREE.Mesh(headGeo, headMat);
      topHead.position.set(x, 0.7, z);
      group.add(topHead);

      const topTail1 = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.55, 5), tailMat);
      topTail1.position.set(x - 0.04, 0.35, z);
      topTail1.rotation.z = 0.08;
      const topTail2 = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.55, 5), tailMat);
      topTail2.position.set(x + 0.04, 0.35, z);
      topTail2.rotation.z = -0.08;
      group.add(topTail1, topTail2);

      // Bottom monolayer head & dual tails
      const botHead = new THREE.Mesh(headGeo, headMat);
      botHead.position.set(x, -0.7, z);
      group.add(botHead);

      const botTail1 = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.55, 5), tailMat);
      botTail1.position.set(x - 0.04, -0.35, z);
      botTail1.rotation.z = -0.08;
      const botTail2 = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.55, 5), tailMat);
      botTail2.position.set(x + 0.04, -0.35, z);
      botTail2.rotation.z = 0.08;
      group.add(botTail1, botTail2);
    }
  }

  // Transmembrane Integral Channel Protein (centered)
  const channelMat = standardMaterial(0x10b981, { roughness: 0.35, emissive: 0x059669, emissiveIntensity: 0.2 });
  const channelOuter = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.48, 1.65, 20), channelMat);
  channelOuter.position.set(0, 0, 0);
  const poreInner = new THREE.Mesh(
    new THREE.CylinderGeometry(0.2, 0.2, 1.7, 16),
    standardMaterial(0x064e3b, { roughness: 0.8 })
  );
  group.add(channelOuter, poreInner);

  // Peripheral protein on cytoplasmic (bottom) face
  const periphMat = standardMaterial(0xa855f7, { roughness: 0.4 });
  const periph = new THREE.Mesh(new THREE.SphereGeometry(0.35, 16, 12), periphMat);
  periph.scale.set(1.4, 0.7, 1.0);
  periph.position.set(-1.0, -1.05, 0.2);
  group.add(periph);

  // Cholesterol steroid rings intercalated between tails
  const cholMat = standardMaterial(0xf59e0b, { roughness: 0.3 });
  [[-0.9, 0.2, -0.4], [1.1, -0.2, 0.3], [0.8, 0.2, -0.3]].forEach(([cx, cy, cz]) => {
    const chol = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.4, 0.16), cholMat);
    chol.position.set(cx, cy, cz);
    chol.rotation.y = 0.4;
    group.add(chol);
  });

  // Carbohydrate Antenna (Glycoprotein oligosaccharide chain on extracellular surface)
  const glycoMat = standardMaterial(0xfacc15, { emissive: 0xeab308, emissiveIntensity: 0.3 });
  const chainPts: THREE.Vector3[] = [
    new THREE.Vector3(0.15, 0.85, 0),
    new THREE.Vector3(0.35, 1.2, 0.1),
    new THREE.Vector3(0.2, 1.5, 0),
    new THREE.Vector3(0.45, 1.8, -0.1),
  ];
  chainPts.forEach((pt) => {
    const hex = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.04, 6), glycoMat);
    hex.position.copy(pt);
    hex.rotation.x = Math.PI / 2;
    group.add(hex);
  });

  return [
    { label: "Phospholipid Polar Heads", sub: "hydrophilic phosphate heads facing water", pos: [-1.7, 1.1, 0], color: "#38bdf8" },
    { label: "Hydrophobic Fatty Acid Core", sub: "nonpolar lipid tails preventing ion leak", pos: [-1.7, 0, 0], color: "#0284c7" },
    { label: "Transmembrane Channel Protein", sub: "permease / ion channel spanning bilayer", pos: [0.1, 1.2, 0], color: "#10b981" },
    { label: "Glycoprotein Carbohydrate Antenna", sub: "cell-cell recognition & receptor binding", pos: [0.9, 1.9, 0], color: "#facc15" },
    { label: "Cholesterol Molecules", sub: "buffers membrane fluidity across temperatures", pos: [1.4, -0.2, 0.3], color: "#f59e0b" },
    { label: "Peripheral Membrane Protein", sub: "anchored to inner cytoplasmic face", pos: [-1.4, -1.3, 0.2], color: "#a855f7" },
  ];
}

function buildCellWallModel(group: THREE.Group): OrganelleModelPin[] {
  // Multi-layered plant cell wall architecture:
  // 1. Middle Lamella (cement between cells, top layer, lime green)
  const lamellaMat = standardMaterial(0xa3e635, {
    roughness: 0.5,
    emissive: 0x84cc16,
    emissiveIntensity: 0.2,
  });
  const lamella = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.2, 2.2), lamellaMat);
  lamella.position.set(0, 1.1, 0);
  group.add(lamella);

  // 2. Primary Cell Wall (criss-crossing cellulose microfibrils in pectin matrix)
  const priWallMat = standardMaterial(0x4ade80, { transparent: true, opacity: 0.45, roughness: 0.6 });
  const priWall = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.55, 2.2), priWallMat);
  priWall.position.set(0, 0.65, 0);
  group.add(priWall);

  // Cellulose microfibril bundles inside primary wall (criss-cross tubes)
  const fibrilMat = standardMaterial(0x22c55e, { roughness: 0.3 });
  for (let i = -3; i <= 3; i++) {
    const f1 = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 2.4, 6), fibrilMat);
    f1.position.set(i * 0.45, 0.65, 0);
    f1.rotation.x = Math.PI / 2 + 0.3;
    const f2 = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 3.4, 6), fibrilMat);
    f2.position.set(0, 0.65, i * 0.3);
    f2.rotation.z = Math.PI / 2 - 0.25;
    group.add(f1, f2);
  }

  // 3. Secondary Cell Wall (thick rigid layers S1, S2, S3 with lignin)
  const secWallMat = standardMaterial(0x15803d, { roughness: 0.4 });
  const secWall = new THREE.Mesh(new THREE.BoxGeometry(3.6, 1.1, 2.2), secWallMat);
  secWall.position.set(0, -0.25, 0);
  group.add(secWall);

  // Lignin bands on secondary wall
  for (let k = -2; k <= 2; k++) {
    const band = new THREE.Mesh(
      new THREE.BoxGeometry(3.62, 0.06, 0.12),
      standardMaterial(0xb45309, { roughness: 0.3 })
    );
    band.position.set(0, -0.25 + k * 0.2, 1.11);
    group.add(band);
  }

  // 4. Plasma Membrane lining underneath
  const memMat = standardMaterial(0x38bdf8, { transparent: true, opacity: 0.6 });
  const mem = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.14, 2.2), memMat);
  mem.position.set(0, -0.92, 0);
  group.add(mem);

  // 5. Plasmodesma Intercellular Canal (transverse tube piercing the entire wall)
  const canalMat = standardMaterial(0xfde047, { emissive: 0xeab308, emissiveIntensity: 0.35 });
  const canal = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 2.3, 16), canalMat);
  canal.position.set(0.8, 0.1, 0);
  // Internal Desmotubule (ER extension)
  const desmo = new THREE.Mesh(
    new THREE.CylinderGeometry(0.06, 0.06, 2.4, 8),
    standardMaterial(0x0284c7, { emissive: 0x0369a1, emissiveIntensity: 0.4 })
  );
  desmo.position.set(0.8, 0.1, 0);
  group.add(canal, desmo);

  return [
    { label: "Middle Lamella", sub: "cement rich in calcium & magnesium pectates", pos: [-1.6, 1.3, 0], color: "#a3e635" },
    { label: "Primary Cell Wall", sub: "extensible cellulose microfibril mesh", pos: [-1.6, 0.7, 0.4], color: "#4ade80" },
    { label: "Secondary Cell Wall (S1–S3)", sub: "rigid lignified wall providing tensile strength", pos: [-1.6, -0.2, 0.4], color: "#15803d" },
    { label: "Lignin Reinforcements", sub: "aromatic polymer conferring waterproofing & rigidity", pos: [1.4, -0.5, 1.1], color: "#b45309" },
    { label: "Plasmodesma Canal", sub: "symplastic cytoplasmic bridge through wall", pos: [1.3, 0.8, 0], color: "#fde047" },
    { label: "Desmotubule Core", sub: "cylindrical tubule of smooth ER traversing canal", pos: [1.3, -0.6, 0], color: "#0284c7" },
  ];
}

function buildCytoskeletonModel(group: THREE.Group): OrganelleModelPin[] {
  // Tripartite Cytoskeleton Showcase:
  // Left: Microtubule (25 nm, 13 protofilaments hollow cylinder of α/β tubulin dimers)
  // Center: Intermediate Filament (10 nm, braided rope cable)
  // Right: Microfilament / F-Actin (7 nm, double helical strand of G-actin)

  // 1. Microtubule (Left: x = -1.25)
  const mtGroup = new THREE.Group();
  mtGroup.position.set(-1.25, 0, 0);
  const alphaMat = standardMaterial(0x38bdf8, { roughness: 0.3 }); // α-tubulin
  const betaMat = standardMaterial(0x0284c7, { roughness: 0.3 });  // β-tubulin
  const numProto = 13;
  const mtRadius = 0.42;

  for (let p = 0; p < numProto; p++) {
    const angle = (p / numProto) * Math.PI * 2;
    const x = Math.cos(angle) * mtRadius;
    const z = Math.sin(angle) * mtRadius;
    for (let h = -7; h <= 7; h++) {
      const y = h * 0.16 + (p / numProto) * 0.08;
      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.075, 8, 6),
        (h + p) % 2 === 0 ? alphaMat : betaMat
      );
      sphere.position.set(x, y, z);
      mtGroup.add(sphere);
    }
  }

  // Motor protein (Kinesin) walking along microtubule
  const motorMat = standardMaterial(0xfacc15, { emissive: 0xeab308, emissiveIntensity: 0.4 });
  const motorHead1 = new THREE.Mesh(new THREE.SphereGeometry(0.1, 10, 8), motorMat);
  motorHead1.position.set(0.46, 0.4, 0);
  const motorHead2 = new THREE.Mesh(new THREE.SphereGeometry(0.1, 10, 8), motorMat);
  motorHead2.position.set(0.46, 0.1, 0.15);
  const motorStalk = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.5, 6), motorMat);
  motorStalk.position.set(0.6, 0.3, 0.08);
  motorStalk.rotation.z = 0.5;
  mtGroup.add(motorHead1, motorHead2, motorStalk);

  // 2. Intermediate Filament (Center: x = 0)
  const ifGroup = new THREE.Group();
  ifGroup.position.set(0, 0, 0);
  const ifMat = standardMaterial(0xc084fc, { roughness: 0.35, emissive: 0x9333ea, emissiveIntensity: 0.2 });
  for (let s = 0; s < 4; s++) {
    const pts: THREE.Vector3[] = [];
    const phase = (s / 4) * Math.PI * 2;
    for (let t = -1.2; t <= 1.2; t += 0.08) {
      const theta = t * 6 + phase;
      pts.push(new THREE.Vector3(Math.sin(theta) * 0.18, t, Math.cos(theta) * 0.18));
    }
    const ifCurve = new THREE.CatmullRomCurve3(pts);
    const ifTube = new THREE.Mesh(new THREE.TubeGeometry(ifCurve, 40, 0.055, 6, false), ifMat);
    ifGroup.add(ifTube);
  }

  // 3. Microfilament / Actin (Right: x = +1.25)
  const actGroup = new THREE.Group();
  actGroup.position.set(1.25, 0, 0);
  const actMat1 = standardMaterial(0xf97316, { roughness: 0.35, emissive: 0xea580c, emissiveIntensity: 0.2 });
  const actMat2 = standardMaterial(0xfb923c, { roughness: 0.35 });
  for (let i = -14; i <= 14; i++) {
    const y = i * 0.085;
    const angle = i * 0.45;
    const gActin1 = new THREE.Mesh(new THREE.SphereGeometry(0.085, 8, 8), actMat1);
    gActin1.position.set(Math.cos(angle) * 0.14, y, Math.sin(angle) * 0.14);
    const gActin2 = new THREE.Mesh(new THREE.SphereGeometry(0.085, 8, 8), actMat2);
    gActin2.position.set(Math.cos(angle + Math.PI) * 0.14, y, Math.sin(angle + Math.PI) * 0.14);
    actGroup.add(gActin1, gActin2);
  }

  group.add(mtGroup, ifGroup, actGroup);

  return [
    { label: "Microtubule (25 nm)", sub: "hollow cylinder of 13 protofilaments (α/β tubulin)", pos: [-1.4, 1.4, 0], color: "#38bdf8" },
    { label: "Kinesin Motor Protein", sub: "ATP-driven molecular transporter walking on tubulin", pos: [-0.6, 0.4, 0.3], color: "#facc15" },
    { label: "Intermediate Filament (10 nm)", sub: "rope-like braided fibrous cables for tensile strength", pos: [0, 1.4, 0], color: "#c084fc" },
    { label: "Microfilament (Actin, 7 nm)", sub: "two intertwined helical chains of globular G-actin", pos: [1.4, 1.4, 0], color: "#f97316" },
  ];
}

function buildDefaultModel(organelleId: string, group: THREE.Group): OrganelleModelPin[] {
  switch (organelleId) {
    case "mitochondria":
      return buildMitochondrionModel(group);
    case "nucleus":
      return buildNucleusModel(group);
    case "golgi":
      return buildGolgiModel(group);
    case "chloroplast":
      return buildChloroplastModel(group);
    case "er":
      return buildErModel(group);
    case "centrosome":
      return buildCentrosomeModel(group);
    case "lysosome":
      return buildLysosomeModel(group);
    case "ribosome":
      return buildRibosomeModel(group);
    case "vacuole":
      return buildVacuoleModel(group);
    case "peroxisome":
      return buildPeroxisomeModel(group);
    case "cell-membrane":
      return buildCellMembraneModel(group);
    case "cell-wall":
      return buildCellWallModel(group);
    case "cytoskeleton":
      return buildCytoskeletonModel(group);
    default:
      return buildMitochondrionModel(group);
  }
}

/* ------------------------------------------------------------------ */
/* Interactive 3D Organelle Canvas Component                          */
/* ------------------------------------------------------------------ */

function Organelle3DViewer({
  organelle,
}: {
  organelle: CellOrganelleData;
}) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [showLines, setShowLines] = useState(true);
  const [webGL] = useState(() => typeof window !== "undefined" && isWebGLAvailable());

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || !webGL) return;

    const ts = createThreeScene(mount, {
      background: 0x060b14,
      autoRotate: autoRotate,
      autoRotateSpeed: 1.2,
      cameraPosition: new THREE.Vector3(0, 1.5, 4.2),
    });

    const labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(mount.clientWidth || 1, mount.clientHeight || 1);
    labelRenderer.domElement.style.position = "absolute";
    labelRenderer.domElement.style.top = "0";
    labelRenderer.domElement.style.left = "0";
    labelRenderer.domElement.style.pointerEvents = "none";
    labelRenderer.domElement.style.zIndex = "10";
    mount.appendChild(labelRenderer.domElement);

    // Build the 3D model
    const organelleGroup = new THREE.Group();
    ts.group.add(organelleGroup);
    const pins = buildDefaultModel(organelle.id, organelleGroup);

    // Add leader lines and labels
    pins.forEach((pin) => {
      const targetVec = new THREE.Vector3(...pin.pos);
      const labelVec = targetVec.clone().multiplyScalar(1.45);

      if (showLines) {
        // Glowing leader line
        const lineGeo = new THREE.BufferGeometry().setFromPoints([targetVec, labelVec]);
        const lineMat = new THREE.LineBasicMaterial({
          color: new THREE.Color(pin.color),
          transparent: true,
          opacity: 0.65,
        });
        const line = new THREE.Line(lineGeo, lineMat);

        // Glowing anchor dot on organelle surface
        const dot = new THREE.Mesh(
          new THREE.SphereGeometry(0.06, 12, 10),
          new THREE.MeshBasicMaterial({ color: new THREE.Color(pin.color) })
        );
        dot.position.copy(targetVec);

        ts.group.add(line, dot);
      }

      // CSS2D label chip
      const el = document.createElement("div");
      el.style.cssText =
        "pointer-events:auto;padding:3px 8px;border-radius:8px;background:rgba(2,6,23,0.85);" +
        `border:1.5px solid ${pin.color};color:#e2e8f0;font:600 11px/1.3 ui-sans-serif,system-ui;white-space:nowrap;backdrop-filter:blur(4px);box-shadow:0 4px 12px rgba(0,0,0,0.5);`;
      el.innerHTML = `<span style="color:${pin.color};font-weight:800">${pin.label}</span>` +
        (pin.sub ? `<br/><span style="opacity:.8;font-size:9.5px">${pin.sub}</span>` : "");

      const cssObj = new CSS2DObject(el);
      cssObj.position.copy(labelVec);
      ts.group.add(cssObj);
    });

    let raf = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      raf = requestAnimationFrame(animate);
      if (autoRotate) {
        organelleGroup.rotation.y = clock.getElapsedTime() * 0.25;
      }
      ts.controls.update();
      ts.renderer.render(ts.scene, ts.camera);
      labelRenderer.render(ts.scene, ts.camera);
    };
    animate();

    const offResize = bindResize(ts);
    const onResize = () => {
      labelRenderer.setSize(mount.clientWidth || 1, mount.clientHeight || 1);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      offResize();
      labelRenderer.domElement.remove();
      disposeThreeScene(ts);
    };
  }, [organelle, autoRotate, showLines, webGL]);

  if (!webGL) {
    return (
      <div className="flex h-72 sm:h-96 items-center justify-center rounded-2xl border border-border bg-muted/20 text-xs text-muted-foreground">
        WebGL not supported in this environment.
      </div>
    );
  }

  return (
    <div className="relative rounded-2xl border border-border/70 overflow-hidden bg-slate-950 shadow-inner">
      <div
        ref={mountRef}
        className="w-full h-80 sm:h-[420px] cursor-grab active:cursor-grabbing"
      />

      {/* Floating HUD controls */}
      <div className="absolute top-3 right-3 flex items-center gap-1.5 z-20">
        <Button
          size="sm"
          variant="outline"
          onClick={() => setAutoRotate(!autoRotate)}
          className={`h-7 px-2.5 text-[11px] rounded-lg border bg-slate-900/80 backdrop-blur ${
            autoRotate ? "text-primary border-primary/40" : "text-muted-foreground"
          }`}
          title="Toggle 3D auto rotation"
        >
          <RotateCw className="h-3 w-3 mr-1" />
          <span>{autoRotate ? "Rotate: ON" : "Rotate: OFF"}</span>
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setShowLines(!showLines)}
          className={`h-7 px-2.5 text-[11px] rounded-lg border bg-slate-900/80 backdrop-blur ${
            showLines ? "text-primary border-primary/40" : "text-muted-foreground"
          }`}
          title="Toggle 3D pointer leader lines"
        >
          {showLines ? <Eye className="h-3 w-3 mr-1" /> : <EyeOff className="h-3 w-3 mr-1" />}
          <span>{showLines ? "Lines: ON" : "Lines: OFF"}</span>
        </Button>
      </div>

      {/* 3D Navigation Hint */}
      <div className="absolute bottom-2.5 left-3 text-[10px] text-muted-foreground/80 z-20 pointer-events-none bg-slate-950/60 backdrop-blur px-2 py-0.5 rounded">
        Drag to rotate · scroll to zoom · 3D interactive model
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main Master Component: CellOrganellesExplorer3D                    */
/* ------------------------------------------------------------------ */

export interface CellOrganellesExplorer3DProps {
  initialOrganelleId?: string;
}

export function CellOrganellesExplorer3D({ initialOrganelleId }: CellOrganellesExplorer3DProps = {}) {
  const [selectedId, setSelectedId] = useState<string>(initialOrganelleId || "mitochondria");
  const [searchQuery, setSearchQuery] = useState("");
  const [membraneFilter, setMembraneFilter] = useState<
    "all" | "Double Membrane" | "Single Membrane" | "Non-membranous" | "plant-only" | "animal-only"
  >("all");
  const [activeView, setActiveView] = useState<"explorer" | "matrix">("explorer");

  useEffect(() => {
    if (initialOrganelleId) {
      setSelectedId(initialOrganelleId);
    }
  }, [initialOrganelleId]);

  const selectedOrganelle = useMemo(() => {
    return CELL_ORGANELLES.find((o) => o.id === selectedId) || CELL_ORGANELLES[0];
  }, [selectedId]);

  const filteredOrganelles = useMemo(() => {
    return CELL_ORGANELLES.filter((org) => {
      // Category filter
      if (membraneFilter === "Double Membrane" && org.membraneType !== "Double Membrane") return false;
      if (membraneFilter === "Single Membrane" && org.membraneType !== "Single Membrane") return false;
      if (membraneFilter === "Non-membranous" && org.membraneType !== "Non-membranous") return false;
      if (membraneFilter === "plant-only" && org.foundIn !== "plant-only") return false;
      if (membraneFilter === "animal-only" && org.foundIn !== "animal-only") return false;

      // Search query
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        org.name.toLowerCase().includes(q) ||
        (org.nepaliName && org.nepaliName.toLowerCase().includes(q)) ||
        org.nicknames.some((n) => n.toLowerCase().includes(q)) ||
        org.history.discoverer.toLowerCase().includes(q) ||
        org.functions.primary.some((f) => f.toLowerCase().includes(q)) ||
        org.ultrastructure.description.toLowerCase().includes(q)
      );
    });
  }, [membraneFilter, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Top Header & View Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-3xl border border-border/70 bg-card shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <GraduationCap className="h-3.5 w-3.5" />
            <span>NEB Class 11 Biology (Bio. 201) · Unit 1 Deep Dive</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground mt-2">
            Cell Organelles: 3D Models, History &amp; Functions
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-3xl leading-relaxed">
            Interactive individual 3D organelle explorer with full historical chronicles (discoverers, years, Nobel prizes),
            biochemical pathways, ultrastructure, and NEB board exam essentials.
          </p>
        </div>

        <div className="flex items-center p-1 rounded-2xl bg-muted/60 border border-border/70 shrink-0 self-start sm:self-auto">
          <button
            onClick={() => setActiveView("explorer")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeView === "explorer"
                ? "bg-card text-foreground shadow-sm border border-border/60"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span>3D Organelle Dossier</span>
          </button>
          <button
            onClick={() => setActiveView("matrix")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeView === "matrix"
                ? "bg-card text-foreground shadow-sm border border-border/60"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Scale className="h-3.5 w-3.5" />
            <span>Plant vs Animal Matrix</span>
          </button>
        </div>
      </div>

      {activeView === "explorer" ? (
        <>
          {/* Controls: Search + Filter Pills */}
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: "all", label: `All (${CELL_ORGANELLES.length})` },
                { id: "Double Membrane", label: "Double Membrane (3)" },
                { id: "Single Membrane", label: "Single Membrane (6)" },
                { id: "Non-membranous", label: "Non-Membranous (5)" },
                { id: "plant-only", label: "Plant Only (3)" },
                { id: "animal-only", label: "Animal Only (2)" },
              ].map((pill) => (
                <button
                  key={pill.id}
                  onClick={() => setMembraneFilter(pill.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                    membraneFilter === pill.id
                      ? "bg-primary text-primary-foreground border-primary shadow-sm"
                      : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, discoverer, or function..."
                className="w-full rounded-xl border border-border bg-card/90 py-2 pl-9 pr-3 text-xs text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground hover:text-foreground px-1.5 py-0.5 rounded bg-muted"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Horizontal Organelle Selector Ribbon */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {filteredOrganelles.map((org) => {
              const isSelected = selectedId === org.id;
              return (
                <button
                  key={org.id}
                  onClick={() => setSelectedId(org.id)}
                  className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl border transition-all shrink-0 select-none text-left ${
                    isSelected
                      ? "bg-card border-primary ring-2 ring-primary/20 shadow-sm"
                      : "bg-card/70 border-border hover:border-primary/40 hover:bg-card"
                  }`}
                >
                  <div
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl font-black text-xs border shadow-xs"
                    style={{
                      backgroundColor: `${org.accentColor}18`,
                      borderColor: `${org.accentColor}40`,
                      color: org.accentColor,
                    }}
                  >
                    {org.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-foreground leading-tight">
                      {org.name.split("/")[0].split("&")[0].trim()}
                    </div>
                    <div className="text-[10px] text-muted-foreground">
                      {org.membraneType.split(" ")[0]}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Main 3D Model + Detailed Dossier Grid */}
          <div className="grid gap-6 lg:grid-cols-12">
            {/* Left Column (5 cols): Interactive 3D Model Canvas */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-4 rounded-3xl border border-border/70 bg-card space-y-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold text-foreground uppercase tracking-wider">
                      Interactive 3D Ultrastructure
                    </span>
                  </div>
                  <span
                    className="text-[10.5px] font-bold px-2 py-0.5 rounded-lg border"
                    style={{
                      backgroundColor: `${selectedOrganelle.accentColor}15`,
                      borderColor: `${selectedOrganelle.accentColor}35`,
                      color: selectedOrganelle.accentColor,
                    }}
                  >
                    {selectedOrganelle.membraneType}
                  </span>
                </div>

                <Organelle3DViewer organelle={selectedOrganelle} />

                {/* Quick Dimensions and Occurrence bar */}
                <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                  <div className="p-2.5 rounded-xl bg-muted/30 border border-border/60">
                    <div className="text-[10px] font-bold text-muted-foreground uppercase">Average Size</div>
                    <div className="font-semibold text-foreground text-xs mt-0.5">
                      {selectedOrganelle.ultrastructure.size.split("(")[0]}
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-muted/30 border border-border/60">
                    <div className="text-[10px] font-bold text-muted-foreground uppercase">Distribution</div>
                    <div className="font-semibold text-foreground text-xs mt-0.5">
                      {selectedOrganelle.foundIn === "plant-only"
                        ? "Plant Cells Only"
                        : selectedOrganelle.foundIn === "animal-only"
                        ? "Animal Cells Only"
                        : "Both Plant & Animal"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (7 cols): Full Scientific Dossier */}
            <div className="lg:col-span-7 space-y-4">
              <div className="p-5 sm:p-6 rounded-3xl border border-border/70 bg-card shadow-sm space-y-5">
                {/* Organelle Title & Nicknames */}
                <div className="border-b border-border/60 pb-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-2xl font-black text-foreground tracking-tight">
                      {selectedOrganelle.name}
                    </h3>
                    {selectedOrganelle.nepaliName && (
                      <span className="text-xs text-muted-foreground">
                        ({selectedOrganelle.nepaliName})
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5 mt-2">
                    {selectedOrganelle.nicknames.map((nick, idx) => (
                      <span
                        key={idx}
                        className="text-[10.5px] font-bold px-2 py-0.5 rounded-md bg-muted text-foreground/80 border border-border/50"
                      >
                        ★ {nick}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Section 1: Discovery & Historical Chronicle */}
                <div className="rounded-2xl border border-amber-500/25 bg-amber-500/[0.03] p-4 space-y-3">
                  <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                    <History className="h-4 w-4" />
                    Overall History &amp; Discovery Chronicle
                  </h4>
                  <div className="grid gap-2 sm:grid-cols-2 text-xs text-muted-foreground">
                    <p>
                      <strong className="text-foreground">Pioneering Discoverer:</strong>{" "}
                      {selectedOrganelle.history.discoverer}
                    </p>
                    <p>
                      <strong className="text-foreground">Discovery Year:</strong>{" "}
                      {selectedOrganelle.history.year}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Origin of Name:</strong>{" "}
                    {selectedOrganelle.history.naming}
                  </p>

                  <div className="pt-2 border-t border-amber-500/20 space-y-1.5">
                    <p className="text-[11px] font-bold text-foreground">Milestones in Scientific History:</p>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      {selectedOrganelle.history.milestones.map((m, idx) => (
                        <li key={idx} className="flex gap-2 leading-relaxed">
                          <span className="text-amber-500 font-bold shrink-0">▸</span>
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {selectedOrganelle.history.nobelPrize && (
                    <div className="mt-2 rounded-xl bg-amber-500/10 border border-amber-500/20 p-2.5 flex items-start gap-2 text-xs text-amber-700 dark:text-amber-300">
                      <Award className="h-4 w-4 shrink-0 text-amber-500 mt-0.5" />
                      <span>{selectedOrganelle.history.nobelPrize}</span>
                    </div>
                  )}
                </div>

                {/* Section 2: Physiological & Biochemical Functions */}
                <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/[0.03] p-4 space-y-3">
                  <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    <Activity className="h-4 w-4" />
                    Physiological Roles &amp; Biochemical Pathway
                  </h4>
                  <div>
                    <p className="text-[11px] font-bold text-foreground mb-1.5">Primary Metabolic Functions:</p>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      {selectedOrganelle.functions.primary.map((fn, idx) => (
                        <li key={idx} className="flex gap-2 leading-relaxed">
                          <span className="text-emerald-500 font-bold shrink-0">●</span>
                          <span>{fn}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {selectedOrganelle.functions.secondary.length > 0 && (
                    <div className="pt-2 border-t border-emerald-500/20">
                      <p className="text-[11px] font-bold text-foreground mb-1.5">Secondary &amp; Regulatory Functions:</p>
                      <ul className="space-y-1 text-xs text-muted-foreground">
                        {selectedOrganelle.functions.secondary.map((fn, idx) => (
                          <li key={idx} className="flex gap-2 leading-relaxed">
                            <span className="text-emerald-500 font-bold shrink-0">○</span>
                            <span>{fn}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="rounded-xl bg-background/90 border border-border/70 p-3 text-xs text-muted-foreground font-mono">
                    <span className="font-bold text-primary mr-1">Biochemical Pathway:</span>
                    {selectedOrganelle.functions.biochemicalPathway}
                  </div>
                </div>

                {/* Section 3: Ultrastructure & Composition */}
                <div className="rounded-2xl border border-sky-500/25 bg-sky-500/[0.03] p-4 space-y-3">
                  <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                    <Layers className="h-4 w-4" />
                    Ultrastructure &amp; Chemical Composition
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {selectedOrganelle.ultrastructure.description}
                  </p>
                  <div className="space-y-1">
                    <p className="text-[11px] font-bold text-foreground">Anatomical Components:</p>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      {selectedOrganelle.ultrastructure.components.map((comp, idx) => (
                        <li key={idx} className="flex gap-2 leading-relaxed">
                          <span className="text-sky-500 font-bold shrink-0">✓</span>
                          <span>{comp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="text-xs text-muted-foreground pt-2 border-t border-sky-500/20">
                    <strong className="text-foreground">Chemical Composition:</strong>{" "}
                    {selectedOrganelle.ultrastructure.chemicalComposition}
                  </p>
                </div>

                {/* Section 4: NEB Board Exam Essentials */}
                <div className="rounded-2xl border border-purple-500/25 bg-purple-500/[0.03] p-4 space-y-3">
                  <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                    <Sparkles className="h-4 w-4" />
                    NEB Class 11 Board Exam Essentials
                  </h4>
                  <div className="grid gap-3 sm:grid-cols-2 text-xs">
                    <div>
                      <p className="font-bold text-foreground mb-1">High-Yield Exam Facts:</p>
                      <ul className="space-y-1 text-muted-foreground">
                        {selectedOrganelle.examTips.highYieldFacts.map((fact, idx) => (
                          <li key={idx} className="flex gap-1.5">
                            <span className="text-purple-500 font-bold">★</span>
                            <span>{fact}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="font-bold text-foreground mb-1">Common Student Confusions:</p>
                      <ul className="space-y-1 text-muted-foreground">
                        {selectedOrganelle.examTips.commonMistakes.map((err, idx) => (
                          <li key={idx} className="flex gap-1.5">
                            <span className="text-red-500 font-bold">✗</span>
                            <span>{err}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-purple-500/20 text-xs">
                    <span className="font-bold text-foreground mr-1">Frequent Board Question:</span>
                    <span className="text-muted-foreground italic">
                      {selectedOrganelle.examTips.sampleQuestions[0]}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* Plant vs Animal Cell Master Matrix */
        <div className="space-y-6">
          <div className="rounded-3xl border border-border/70 bg-card overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-border/70 bg-muted/40">
                    <th className="py-3.5 px-4 font-extrabold text-foreground uppercase tracking-wider w-1/5">
                      Diagnostic Feature
                    </th>
                    <th className="py-3.5 px-4 font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider w-2/5">
                      Plant Cell (Plant Eukaryote)
                    </th>
                    <th className="py-3.5 px-4 font-extrabold text-sky-600 dark:text-sky-400 uppercase tracking-wider w-2/5">
                      Animal Cell (Metazoan Eukaryote)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {PLANT_VS_ANIMAL_COMPARISON.map((row, idx) => (
                    <tr key={idx} className="hover:bg-muted/20 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-foreground align-top">
                        {row.feature}
                        <div className="text-[10px] font-normal text-muted-foreground mt-1">
                          {row.significance}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-muted-foreground align-top leading-relaxed">
                        <div className="flex items-start gap-1.5">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{row.plantCell}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-muted-foreground align-top leading-relaxed">
                        <div className="flex items-start gap-1.5">
                          <CheckCircle2 className="h-4 w-4 text-sky-500 shrink-0 mt-0.5" />
                          <span>{row.animalCell}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CellOrganellesExplorer3D;
