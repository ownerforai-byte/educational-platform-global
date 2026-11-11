"use client";

/**
 * Faunal Diversity 3D — Earthworm (Pheretima posthuma), REALISM BUILD.
 *
 * External features · digestive system · excretory + nervous systems ·
 * reproductive system & cocoon formation.
 *
 * Realism layer (biology-faunal-3d-realism.ts):
 *  - continuous CatmullRom tube body with taper (no stacked cylinders)
 *  - procedural skin texture: metamere banding, dorsal vessel, mottling,
 *    setae bumps in a matched bump map, wet clearcoat sheen
 *  - MeshPhysicalMaterial presets for organs (mucosa, muscle, organ…)
 *  - soft contact-shadow ground
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
  earthwormSkinTexture,
  physical,
  tubeAlong,
  organicBlob,
  contactGround,
} from "./biology-faunal-3d-realism";

/* ------------------------------------------------------------------ */
/* shared realistic body                                               */
/* ------------------------------------------------------------------ */

function useWormMaterials() {
  return useMemo(() => {
    const { map, bump } = earthwormSkinTexture();
    const skin = physical("wetSkin", 0xffffff, { map, bumpMap: bump, bumpScale: 0.9 });
    const clitellum = physical("organ", 0xc06a3a);
    const muscle = physical("muscle", 0x9a3b2e);
    const mucosa = physical("mucosa", 0xe8a06a);
    return { skin, clitellum, muscle, mucosa };
  }, []);
}

/** smooth continuous worm form: taper both ends, clitellum bulge at seg 14–16 */
function wormBodyMesh(
  mats: { skin: THREE.Material; clitellum: THREE.Material },
  length = 15,
): THREE.Group {
  const g = new THREE.Group();
  const pts: THREE.Vector3[] = [];
  const N = 9;
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    pts.push(new THREE.Vector3(-length / 2 + t * length, Math.sin(t * 6.3) * 0.16, 0));
  }
  // radius profile: taper ends, gentle clitellum bulge at t≈0.41–0.53
  const radiusAt = (t: number) => {
    const taper = Math.min(1, Math.min(t, 1 - t) * 5.2 + 0.16);
    const cl = t > 0.4 && t < 0.54 ? 1.18 + 0.1 * Math.sin(((t - 0.4) / 0.14) * Math.PI) : 1;
    return 1.02 * taper * cl;
  };
  const body = tubeAlong(pts, radiusAt, 140, 26, mats.skin);
  g.add(body);

  // clitellum saddle overlay — slightly larger smooth band
  const cl = new THREE.Mesh(new THREE.CylinderGeometry(1.24, 1.24, 1.95, 32), mats.clitellum);
  cl.rotation.z = Math.PI / 2;
  cl.position.x = -length / 2 + 0.47 * length;
  cl.scale.y = 0.94;
  cl.scale.z = 0.94;
  g.add(cl);

  return g;
}

/* ------------------------------------------------------------------ */
/* External features                                                   */
/* ------------------------------------------------------------------ */

export function EarthwormExternalScene() {
  const mats = useWormMaterials();
  const { mountRef, webGL, vizTargetRef } = useFaunalScene((kit) => {
    const g = kit.ts.group;
    const body = wormBodyMesh(mats, 15);
    g.add(body);

    // prostomium — small smooth lobe over the mouth
    const prost = new THREE.Mesh(organicBlob(0.42, 3, 2, 0.1), physical("organ", 0x8a4a2c));
    prost.scale.set(1.15, 0.62, 0.8);
    prost.position.set(-7.55, 0.12, 0);
    g.add(prost);
    // mouth — dark moist opening
    const mouth = sph(0.3, 0x140a06);
    mouth.scale.set(0.55, 0.5, 0.85);
    mouth.position.set(-7.62, -0.28, 0);
    (mouth.material as THREE.MeshPhysicalMaterial).clearcoat = 1;
    g.add(mouth);

    // peristomium seam — first band highlight ring
    const seam = tor(0.72, 0.035, 0x5b2413, 0.8);
    seam.rotation.y = Math.PI / 2;
    seam.position.x = -6.9;
    g.add(seam);

    // genital papillae — two pairs (17–19), small raised pins
    for (const x of [-0.55, 0.5]) {
      for (const z of [-0.72, 0.72]) {
        const p = cyl(0.075, 0.12, 0.4, 0xffffff);
        p.material = physical("organ", 0xd9a06a);
        p.position.set(x, 0, z);
        g.add(p);
      }
    }

    // female pore (14, mid-ventral) — pink glisten
    const fpore = sph(0.12, 0xec4899);
    (fpore.material as THREE.MeshPhysicalMaterial).clearcoat = 1;
    fpore.position.set(-3.55, -1.0, 0);
    g.add(fpore);
    // male pores (18, ventro-lateral) — raised pale lips
    for (const z of [-0.82, 0.82]) {
      const lip = tor(0.13, 0.05, 0xf3d0b0);
      lip.position.set(0.95, -0.6, z);
      lip.rotation.x = 0.35;
      g.add(lip);
      const mp = sph(0.09, 0x60a5fa);
      mp.position.set(0.95, -0.6, z);
      g.add(mp);
    }

    // anus — terminal dark dimple
    const anus = sph(0.26, 0x140a06);
    anus.scale.set(0.5, 0.42, 0.8);
    anus.position.set(7.58, 0.02, 0);
    (anus.material as THREE.MeshPhysicalMaterial).clearcoat = 1;
    g.add(anus);

    // dorsal pores — glisten dots along the back
    for (let i = -5; i <= 5; i += 2) {
      const d = sph(0.05, 0x8fb3d9, 0.85);
      d.position.set(i, 1.02, 0);
      g.add(d);
    }

    // soft ground
    contactGround(kit.ts.scene, -2.3, 30);

    kit.addLbl("#fbbf24", "Prostomium + mouth", "sensory lobe over the mouth (peristomium behind)", new THREE.Vector3(-6.2, 2.6, 0.8), new THREE.Vector3(-7.5, 0.2, 0));
    kit.addLbl("#d97706", "Clitellum (seg. 14–16)", "glandular saddle — secretes the cocoon", new THREE.Vector3(-3.4, 3.0, -0.6), new THREE.Vector3(-1.5, 1.15, 0));
    kit.addLbl("#ec4899", "Female pore (seg. 14)", "single mid-ventral oviduct opening", new THREE.Vector3(-6.6, -2.7, 0.3), new THREE.Vector3(-3.55, -1.0, 0));
    kit.addLbl("#60a5fa", "Male pores (seg. 18)", "paired ventro-lateral sperm exits, raised lips", new THREE.Vector3(2.9, 2.8, 0.6), new THREE.Vector3(0.95, -0.6, 0.82));
    kit.addLbl("#fde68a", "Genital papillae (17–19)", "grip the partner during copulation", new THREE.Vector3(3.4, -2.8, -0.4), new THREE.Vector3(0.5, 0, -0.75));
    kit.addLbl("#e2b08a", "Metameres + setae (S-shaped)", "banding texture; 4 setae pairs per segment", new THREE.Vector3(5.4, 2.7, 0.6), new THREE.Vector3(4.6, 0.6, 0.9));
    kit.addLbl("#1c1917", "Anus (last segment)", "undigested castings exit here", new THREE.Vector3(7.2, -2.6, 0), new THREE.Vector3(7.55, 0, 0));
    titleText(kit.ts, "Earthworm — external features", new THREE.Vector3(0, 4.0, 0));

    return (t: number) => {
      // slow locomotor wave along the body
      body.children[0].position.y = Math.sin(t * 0.8) * 0.05;
    };
  }, [mats]);

  return (
    <div className="space-y-4">
      <CanvasMount mountRef={mountRef} webGL={webGL} targetRef={vizTargetRef} />
      <TheoryPanel
        title="Theory — Earthworm external features"
        look="A long terracotta tube of ~100 metameres with visible banding and a wet sheen, a swollen darker clitellum near the front, pink and blue genital pores on the underside, a lipped prostomium over the mouth, and a soft shadow pooling beneath."
        principle="Pheretima posthuma is a true coelomate with metameric segmentation: circular + longitudinal muscles work against coelomic fluid (hydrostatic skeleton) while four S-shaped setae per segment anchor. The clitellum (14–16) secretes mucus for copulation and the cocoon. Openings: terminal mouth under the prostomium, paired male pores on 18 with raised lips, single female pore on 14, dorsal excretory pores, terminal anus. The mucus-coated skin is the respiratory surface — it must stay moist."
        why="Segmentation, hydrostatic locomotion and clitellum function are the examinable core; the external pore map is asked directly in NEB structure questions."
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Digestive system                                                    */
/* ------------------------------------------------------------------ */

export function EarthwormDigestiveScene() {
  const mats = useWormMaterials();
  const { mountRef, webGL, vizTargetRef } = useFaunalScene((kit) => {
    const g = kit.ts.group;
    // translucent body shell
    const shellPts: THREE.Vector3[] = [];
    for (let i = 0; i <= 8; i++) {
      const t = i / 8;
      shellPts.push(new THREE.Vector3(-7.2 + t * 14.4, 0, 0));
    }
    const shell = tubeAlong(shellPts, (t) => Math.min(1, Math.min(t, 1 - t) * 5 + 0.2) * 1.15, 120, 22, physical("membrane", 0x7a3b22, { opacity: 0.16 }));
    g.add(shell);

    // alimentary canal — smooth continuous tube with organ bulges
    const canalPts: THREE.Vector3[] = [
      new THREE.Vector3(-7.4, -0.2, 0),
      new THREE.Vector3(-6.4, -0.05, 0),  // buccal
      new THREE.Vector3(-5.4, 0.0, 0),    // buccal end
      new THREE.Vector3(-4.6, 0.05, 0),   // pharynx
      new THREE.Vector3(-3.6, 0.05, 0),   // oesophagus
      new THREE.Vector3(-2.6, 0.0, 0),
      new THREE.Vector3(-1.4, 0.0, 0),    // pre-gizzard
      new THREE.Vector3(-0.7, 0.0, 0),    // gizzard
      new THREE.Vector3(0.3, 0.0, 0),     // stomach
      new THREE.Vector3(1.6, 0.05, 0),
      new THREE.Vector3(4.2, 0.0, 0),     // intestine
      new THREE.Vector3(7.6, -0.05, 0),   // to anus
    ];
    const canalRadius = (t: number) => {
      // buccal 0–0.2, pharynx 0.2–0.33 big, oes slim, gizzard 0.55 bulge,
      // intestine 0.62+ medium to end
      if (t < 0.2) return 0.34;
      if (t < 0.33) return 0.62;
      if (t < 0.52) return 0.2;
      if (t < 0.6) return 0.5;
      if (t < 0.66) return 0.26;
      return 0.36;
    };
    const canal = tubeAlong(canalPts, canalRadius, 150, 24, physical("mucosa", 0xffffff));
    g.add(canal);

    // gizzard muscle banding overlay
    const gz = sph(0.52, 0xffffff);
    gz.material = physical("muscle", 0xb0452f);
    gz.scale.set(1.1, 0.82, 0.82);
    gz.position.set(-0.7, 0, 0);
    g.add(gz);

    // calciferous glands — paired white lobes (12–13)
    for (const y of [0.5, -0.5]) {
      const c = new THREE.Mesh(organicBlob(0.3, 5, 2, 0.14), physical("organ", 0xe7e0d4));
      c.position.set(-2.9, y, 0);
      g.add(c);
    }

    // hepatic caecae — gland clusters
    for (const x of [-0.2, 1.1]) {
      for (const y of [0.45, -0.45]) {
        const h = new THREE.Mesh(organicBlob(0.17, x * 10 + y, 2, 0.2), physical("organ", 0xa3b23a));
        h.position.set(x, y, 0.3 * Math.sign(y));
        g.add(h);
      }
    }

    // typhlosole — internal fold ridge visible through the intestine wall
    const typh = new THREE.Mesh(new THREE.ConeGeometry(0.22, 6.4, 12), physical("organ", 0x8f7a2e));
    typh.rotation.z = -Math.PI / 2;
    typh.position.set(4.6, 0, 0);
    typh.scale.set(1, 1, 0.42);
    g.add(typh);

    // anus
    const anus = cyl(0.26, 0.3, 0.4, 0x140a06);
    anus.rotation.z = Math.PI / 2;
    anus.position.x = 8.0;
    g.add(anus);

    contactGround(kit.ts.scene, -2.4, 30);

    kit.addLbl("#f59e0b", "Buccal cavity (1–3)", "ingestion; muscular sucking", new THREE.Vector3(-5.6, 3.0, 0.4), new THREE.Vector3(-6.2, 0.1, 0));
    kit.addLbl("#fb923c", "Pharynx (4–6)", "pumping chamber; pharyngeal glands lubricate", new THREE.Vector3(-7.3, -2.6, 0.5), new THREE.Vector3(-4.8, -0.3, 0));
    kit.addLbl("#e7e5e4", "Calciferous glands (12–13)", "neutralise humic acid; regulate Ca²⁺", new THREE.Vector3(-3.6, 2.8, -0.3), new THREE.Vector3(-2.9, 0.5, 0));
    kit.addLbl("#ef4444", "Gizzard (17–19)", "grinds food with sand — the 'grinding mill'", new THREE.Vector3(1.9, 2.9, 0), new THREE.Vector3(-0.7, 0.3, 0));
    kit.addLbl("#a3b23a", "Hepatic/intestinal caecae", "gland cells secrete digestive enzymes", new THREE.Vector3(0.4, -2.9, 0.6), new THREE.Vector3(1.1, -0.45, 0.3));
    kit.addLbl("#22c55e", "Intestine (20–last)", "digestion + absorption ends", new THREE.Vector3(6.6, 3.0, 0), new THREE.Vector3(5.4, 0.3, 0));
    kit.addLbl("#8f7a2e", "Typhlosole (internal fold)", "doubles absorptive surface (26–35 onward)", new THREE.Vector3(3.2, -2.9, -0.4), new THREE.Vector3(4.6, -0.1, 0));
    kit.addLbl("#1c1917", "Anus", "casts expelled", new THREE.Vector3(8.4, 2.6, 0), new THREE.Vector3(8.0, 0.1, 0));
    titleText(kit.ts, "Earthworm — digestive system", new THREE.Vector3(0, 4.0, 0));

    return (t: number) => {
      // peristaltic bulge travelling along the canal
      const bulge = ((t * 0.35) % 1);
      canal.position.y = Math.sin(bulge * Math.PI * 2) * 0.02;
      gz.scale.y = 0.82 + 0.06 * Math.abs(Math.sin(t * 2.2));
    };
  }, [mats]);

  return (
    <div className="space-y-4">
      <CanvasMount mountRef={mountRef} webGL={webGL} targetRef={vizTargetRef} />
      <TheoryPanel
        title="Theory — Earthworm digestive system"
        look="Inside a translucent body, one continuous moist canal runs nose to tail: a slim buccal tube swells into the orange pharynx, narrows along the oesophagus past white calciferous lobes, hits the muscular red gizzard, then widens into a long intestine with a golden internal ridge (typhlosole) ending at the anus."
        principle="Food is sucked through the mouth into the buccal cavity; the muscular pharynx pumps it back where pharyngeal glands add mucus and proteases. Calciferous glands neutralise humic acids. The gizzard grinds mechanically; the intestine, lined with glandular epithelium and the typhlosole fold (doubling absorptive area), completes digestion and absorption — a one-way specialisation gradient."
        why="Gizzard vs pharynx roles, calciferous gland function and typhlosole surface-area logic are precise NEB labeling and explanation favourites."
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Excretory + nervous systems                                         */
/* ------------------------------------------------------------------ */

export function EarthwormExcretoryNervousScene() {
  const mats = useWormMaterials();
  const { mountRef, webGL, vizTargetRef } = useFaunalScene((kit) => {
    const g = kit.ts.group;
    const shellPts: THREE.Vector3[] = [];
    for (let i = 0; i <= 8; i++) shellPts.push(new THREE.Vector3(-7.2 + (i / 8) * 14.4, 0, 0));
    const shell = tubeAlong(shellPts, (t) => Math.min(1, Math.min(t, 1 - t) * 5 + 0.2) * 1.15, 120, 22, physical("membrane", 0x7a3b22, { opacity: 0.13 }));
    g.add(shell);

    // — NERVOUS SYSTEM —
    const brain = new THREE.Mesh(organicBlob(0.32, 9, 2, 0.12), physical("organ", 0x9d5ce8));
    brain.scale.set(1.5, 0.72, 0.9);
    brain.position.set(-4.6, 0.55, 0);
    g.add(brain);
    // circumpharyngeal connectives
    for (const y of [0.42, -0.42]) {
      g.add(seg(new THREE.Vector3(-4.95, y, 0), new THREE.Vector3(-4.25, y, 0), 0xc084fc, 0.05));
    }
    // ventral nerve cord: beaded ganglia
    let prevX: number | null = null;
    for (let i = 0; i < 12; i++) {
      const x = -2.6 + i * 0.95;
      const gang = new THREE.Mesh(organicBlob(0.15, i * 3 + 1, 1, 0.1), physical("organ", 0x8b5cf6));
      gang.position.set(x, -0.85, 0);
      g.add(gang);
      for (const s of [-1, 1]) {
        g.add(seg(new THREE.Vector3(x, -0.85, 0), new THREE.Vector3(x + 0.25, -0.5, s * 0.55), 0xa78bfa, 0.018));
      }
      if (prevX !== null) g.add(seg(new THREE.Vector3(prevX, -0.85, 0), new THREE.Vector3(x, -0.85, 0), 0x8b5cf6, 0.05));
      prevX = x;
    }
    g.add(seg(new THREE.Vector3(-4.6, 0.55, 0), new THREE.Vector3(-4.6, -0.85, 0), 0xc084fc, 0.045));

    // — EXCRETORY SYSTEM —
    const neph: THREE.Group[] = [];
    for (let i = 0; i < 10; i++) {
      const x = -1.7 + i * 1.35;
      for (const side of [-1, 1]) {
        const n = new THREE.Group();
        const funnel = tor(0.15, 0.045, 0x7dd3fc);
        funnel.rotation.y = Math.PI / 2;
        funnel.position.set(0.17 * side, 0.6, 0);
        const bodyLoop = tor(0.28, 0.04, 0x38bdf8);
        bodyLoop.position.set(0.14 * side, 0.12, 0);
        const duct = cyl(0.028, 0.028, 0.85, 0x7dd3fc);
        duct.position.set(0.3 * side, -0.4, 0);
        n.add(funnel, bodyLoop, duct);
        n.position.set(x, -0.1, 0.45 * side);
        g.add(n);
        neph.push(n);
      }
    }
    // nephridiopores
    for (let i = 0; i < 6; i++) {
      const x = -1.2 + i * 1.7;
      for (const z of [0.98, -0.98]) {
        const p = sph(0.05, 0x7dd3fc);
        p.position.set(x, -0.25, z);
        g.add(p);
      }
    }

    contactGround(kit.ts.scene, -2.5, 30);

    kit.addLbl("#a855f7", "Cerebral ganglia (brain)", "dorsal, on pharynx; nerve ring below", new THREE.Vector3(-6.6, 3.0, 0.3), new THREE.Vector3(-4.6, 0.8, 0));
    kit.addLbl("#8b5cf6", "Ventral nerve cord + ganglia", "one ganglion per segment — segmental reflexes", new THREE.Vector3(0.4, -3.1, 0), new THREE.Vector3(0.3, -0.95, 0));
    kit.addLbl("#a78bfa", "Segmental nerves", "mixed fibres to body wall & gut", new THREE.Vector3(6.8, 2.9, 0.4), new THREE.Vector3(5.6, -0.5, 0.55));
    kit.addLbl("#7dd3fc", "Septal nephridia (pair/segment)", "ciliated nephrostome → looped body → duct", new THREE.Vector3(-2.2, 3.1, -0.4), new THREE.Vector3(-1.55, 0.55, 0.45));
    kit.addLbl("#38bdf8", "Nephridiopores", "urine exits to the exterior", new THREE.Vector3(4.6, -3.1, -0.2), new THREE.Vector3(3.9, -0.3, -0.98));
    titleText(kit.ts, "Earthworm — excretory & nervous systems", new THREE.Vector3(0, 4.1, 0));

    return (t: number) => {
      neph.forEach((n, i) => {
        const s = 1 + 0.1 * Math.sin(t * 2.4 + i * 0.5);
        n.scale.setScalar(s);
      });
      brain.rotation.y = Math.sin(t * 0.7) * 0.22;
    };
  }, [mats]);

  return (
    <div className="space-y-4">
      <CanvasMount mountRef={mountRef} webGL={webGL} targetRef={vizTargetRef} />
      <TheoryPanel
        title="Theory — Excretory & nervous systems"
        look="Inside the translucent worm a violet chain runs along the belly — brain knot looping down to a beaded ventral cord, one ganglion per segment firing paired nerves. Sky-blue nephridia hang in every segment: ciliated funnel, coiled loop and duct reaching the skin."
        principle="Nephridia are the excretory units: the ciliated nephrostome draws coelomic fluid, the looped tubule reabsorbs useful salts, and urine exits at nephridiopores. Three types — septal (septum-hanging), pharyngeal (enteronephric, open into the pharynx) and integumentary (exonephric, open at the skin). The nervous system is the annelid ladder: dorsal cerebral ganglia, circumpharyngeal connectives, double ventral cord with segmental ganglia and giant fibres for rapid escape reflexes."
        why="Nephridium typing (entero/exonephric) and the ladder plan with its escape-reflex giant fibres are standard NEB diagram questions."
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Reproductive system + cocoon                                        */
/* ------------------------------------------------------------------ */

export function EarthwormReproductiveScene() {
  const mats = useWormMaterials();
  const { mountRef, webGL, vizTargetRef } = useFaunalScene((kit) => {
    const g = kit.ts.group;
    const shellPts: THREE.Vector3[] = [];
    for (let i = 0; i <= 8; i++) shellPts.push(new THREE.Vector3(-6.2 + (i / 8) * 12.4, 0, 0));
    const shell = tubeAlong(shellPts, (t) => Math.min(1, Math.min(t, 1 - t) * 5 + 0.2) * 1.1, 110, 22, physical("membrane", 0x7a3b22, { opacity: 0.13 }));
    g.add(shell);

    // male: seminal vesicles (11–12) — glistening amber reservoirs
    const vesicles: THREE.Mesh[] = [];
    for (const [x, s] of [
      [-3.4, 1], [-2.2, 1.12],
    ] as const) {
      const v = new THREE.Mesh(organicBlob(0.58, x * 7, 2, 0.12), physical("membrane", 0x8fbef2, { opacity: 0.78 }));
      v.scale.set(1.2, 0.9, 0.9);
      v.position.set(x, 0.15, 0);
      g.add(v);
      vesicles.push(v);
    }
    // vasa deferentia → male pores (18)
    for (const z of [-0.4, 0.4]) {
      g.add(seg(new THREE.Vector3(-2.4, 0.1, z), new THREE.Vector3(1.5, -0.5, z * 1.9), 0x93c5fd, 0.045));
    }

    // female: ovary (13)
    const ovary = new THREE.Mesh(organicBlob(0.27, 4, 2, 0.16), physical("organ", 0xe75490));
    ovary.scale.set(0.8, 1.25, 0.8);
    ovary.position.set(-0.7, 0.3, 0);
    g.add(ovary);
    g.add(seg(new THREE.Vector3(-0.7, 0.2, 0), new THREE.Vector3(-1.5, -0.85, 0), 0xf9a8d4, 0.045));

    // spermathecae (7–9): two pairs of glossy beads
    for (const x of [-5.2, -4.3]) {
      for (const z of [-0.35, 0.35]) {
        const sp = new THREE.Mesh(organicBlob(0.23, x * 5 + z * 9, 2, 0.1), physical("membrane", 0xf0a8c8, { opacity: 0.85 }));
        sp.position.set(x, 0.35, z);
        g.add(sp);
      }
    }

    // cocoon — smooth amber lemon shape with eggs and emerging young
    const cocoon = new THREE.Mesh(organicBlob(0.72, 8, 2, 0.06), physical("wax", 0xd9a441));
    cocoon.scale.set(1.25, 0.85, 0.85);
    cocoon.position.set(5.6, -0.4, 0);
    (cocoon.material as THREE.MeshPhysicalMaterial).clearcoat = 0.8;
    g.add(cocoon);
    for (const [dx, dz] of [
      [-0.26, 0], [0.1, 0.16], [0.28, -0.14],
    ] as const) {
      const e = sph(0.13, 0x86efac);
      (e.material as THREE.MeshPhysicalMaterial).clearcoat = 1;
      e.position.set(5.6 + dx, -0.4, dz);
      g.add(e);
    }
    const young = cyl(0.08, 0.11, 1.35, 0xa3b23a);
    young.rotation.z = Math.PI / 2 - 0.5;
    young.position.set(7.25, 0.7, 0);
    g.add(young);

    contactGround(kit.ts.scene, -2.4, 30);

    kit.addLbl("#8fbef2", "Seminal vesicles (11–12)", "store & mature own sperm", new THREE.Vector3(-6.4, 3.0, 0), new THREE.Vector3(-3.4, 0.6, 0));
    kit.addLbl("#f0a8c8", "Spermathecae (2 pairs, 7–9)", "receive partner's sperm at copulation", new THREE.Vector3(-7.0, -2.9, 0.4), new THREE.Vector3(-4.75, 0.5, 0.35));
    kit.addLbl("#e75490", "Ovary (13) → female pore (14)", "single mid-ventral oviducal opening", new THREE.Vector3(-0.2, 3.1, 0), new THREE.Vector3(-0.7, 0.5, 0));
    kit.addLbl("#93c5fd", "Vasa deferentia → male pores (18)", "paired sperm ducts", new THREE.Vector3(2.6, -3.0, 0), new THREE.Vector3(1.5, -0.55, 0.76));
    kit.addLbl("#d9a441", "Cocoon (clitellum secretion)", "fertilisation + development inside; yields 1–4 young", new THREE.Vector3(5.0, 2.9, 0), new THREE.Vector3(5.6, 0.3, 0));
    kit.addLbl("#a3b23a", "Young worm", "direct development — no larva", new THREE.Vector3(7.9, -2.4, 0.4), new THREE.Vector3(7.25, 0.75, 0));
    titleText(kit.ts, "Earthworm — reproductive system", new THREE.Vector3(0, 4.1, 0));

    return (t: number) => {
      cocoon.scale.set(1.25 + 0.05 * Math.sin(t * 1.6), 0.85 + 0.04 * Math.cos(t * 1.6), 0.85);
      young.rotation.z = Math.PI / 2 - 0.5 + Math.sin(t * 1.1) * 0.12;
      vesicles.forEach((v, i) => (v.scale.y = 0.9 + 0.05 * Math.sin(t * 1.8 + i)));
    };
  }, [mats]);

  return (
    <div className="space-y-4">
      <CanvasMount mountRef={mountRef} webGL={webGL} targetRef={vizTargetRef} />
      <TheoryPanel
        title="Theory — Earthworm reproduction"
        look="Glossy amber seminal vesicles bulge near the front with pearl spermathecae further forward; a magenta ovary drains ventrally while blue ducts run back to lipped male pores. On the right a waxy lemon-shaped cocoon holds green eggs with a tiny worm emerging."
        principle="Earthworms are protandrous cross-fertilising hermaphrodites. Copulation: two worms join ventrally head-to-tail; the spermathecae (7–9) store the partner's sperm. The clitellum then secretes a mucus band that hardens into a cocoon; as it slides forward it collects ova (14) and stored sperm — fertilisation occurs inside, development is direct (no larva). Economic importance: vermicomposting, soil aeration and fertility."
        why="Protandry preventing self-fertilisation, exact segment numbers of every organ, and cocoon mechanics are precise NEB targets; economic importance links to applied biology."
      />
    </div>
  );
}
