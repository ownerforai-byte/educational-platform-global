"use client";

/**
 * Faunal realism kit — procedural textures + physical materials that turn the
 * flat-colour "cartoon" scenes into natural-history-grade models:
 *
 *  - Procedural CanvasTextures: earthworm skin (segment bands, mottling,
 *    speckle, saddle), frog skin (moist mottle, dark spots, gland texture),
 *    protozoan cytoplasm granularity, mosquito chitin striping.
 *  - MeshPhysicalMaterial presets: wet skin (clearcoat sheen), mucosa,
 *    muscle, organ, translucent membrane, chitin — with per-preset roughness,
 *    sheen and subsurface-feel parameters.
 *  - Smooth curved-tube builders (CatmullRom) so bodies are continuous forms,
 *    not stacked cylinders, plus taper helpers and UV control for banding.
 *  - Soft contact-shadow ground disc.
 *
 * Everything is CPU-procedural — no network fetches, no new dependencies.
 */

import * as THREE from "three";

/* ------------------------------------------------------------------ */
/* Procedural texture factory                                          */
/* ------------------------------------------------------------------ */

function makeCanvas(w: number, h: number): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  return [c, c.getContext("2d")!];
}

function toTexture(c: HTMLCanvasElement, repeatX = 1, repeatY = 1): THREE.CanvasTexture {
  const t = new THREE.CanvasTexture(c);
  t.wrapS = THREE.RepeatWrapping;
  t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(repeatX, repeatY);
  t.anisotropy = 4;
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/** deterministic pseudo-random for stable textures */
function mulberry(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ------------------------------------------------------------------ */
/* Earthworm skin                                                      */
/* ------------------------------------------------------------------ */

/**
 * Earthworm skin: base terracotta with a darker dorsal blood vessel line,
 * per-segment banding, iridescent mottling and fine speckle. The `u` axis
 * runs along the body (length), `v` around the circumference — bands repeat
 * along u so they wrap as true metameres.
 */
export function earthwormSkinTexture(): { map: THREE.CanvasTexture; bump: THREE.CanvasTexture } {
  const W = 1024, H = 256;
  const [c, ctx] = makeCanvas(W, H);
  const rnd = mulberry(42);

  // base gradient: pinkish-grey dorsal → paler ventral
  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, "#7a3b22");
  grad.addColorStop(0.45, "#a05a36");
  grad.addColorStop(0.75, "#b5714a");
  grad.addColorStop(1, "#c98d63");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // iridescent mottling — soft blotches
  for (let i = 0; i < 260; i++) {
    const x = rnd() * W, y = rnd() * H;
    const r = 6 + rnd() * 26;
    const hue = 14 + rnd() * 22;
    const g2 = ctx.createRadialGradient(x, y, 0, x, y, r);
    g2.addColorStop(0, `hsla(${hue}, ${45 + rnd() * 25}%, ${38 + rnd() * 22}%, ${0.06 + rnd() * 0.1})`);
    g2.addColorStop(1, "hsla(20, 50%, 45%, 0)");
    ctx.fillStyle = g2;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // segment bands: ~28 metameres, slightly uneven, darker edges + pale centres
  const bands = 28;
  for (let i = 0; i < bands; i++) {
    const x = (i / bands) * W;
    const w = W / bands;
    ctx.fillStyle = "rgba(58, 24, 12, 0.34)";
    ctx.fillRect(x, 0, 2.5, H);
    ctx.fillStyle = "rgba(58, 24, 12, 0.18)";
    ctx.fillRect(x + 2.5, 0, 2, H);
    ctx.fillStyle = "rgba(226, 168, 128, 0.16)";
    ctx.fillRect(x + 8, 0, w - 14, H);
  }

  // dorsal blood vessel: dark line along the top (v ≈ 0)
  ctx.fillStyle = "rgba(64, 18, 10, 0.55)";
  ctx.fillRect(0, 0, W, 7);
  ctx.fillStyle = "rgba(120, 40, 24, 0.3)";
  ctx.fillRect(0, 7, W, 5);

  // fine speckle
  for (let i = 0; i < 2400; i++) {
    const x = rnd() * W, y = rnd() * H;
    ctx.fillStyle = rnd() > 0.5 ? "rgba(255,220,190,0.10)" : "rgba(40,14,6,0.12)";
    ctx.fillRect(x, y, 1.4, 1.4);
  }

  // bump map: bands raised, mottling dented
  const [bc, bctx] = makeCanvas(W, H);
  const brnd = mulberry(99);
  bctx.fillStyle = "#808080";
  bctx.fillRect(0, 0, W, H);
  for (let i = 0; i < bands; i++) {
    const x = (i / bands) * W;
    bctx.fillStyle = "#2c2c2c"; // groove
    bctx.fillRect(x, 0, 4, H);
    bctx.fillStyle = "#a8a8a8"; // slight ridge behind groove
    bctx.fillRect(x + 5, 0, w0(bands, W) - 8, H);
  }
  for (let i = 0; i < 3000; i++) {
    const x = brnd() * W, y = brnd() * H;
    bctx.fillStyle = brnd() > 0.5 ? "rgba(255,255,255,0.16)" : "rgba(0,0,0,0.14)";
    bctx.fillRect(x, y, 1.6, 1.6);
  }
  // setae bumps: 4 pairs per band
  for (let i = 0; i < bands; i += 2) {
    const x = (i / bands) * W + 12;
    for (const y of [H * 0.2, H * 0.4, H * 0.6, H * 0.8]) {
      const g3 = bctx.createRadialGradient(x, y, 0, x, y, 5);
      g3.addColorStop(0, "#e8e8e8");
      g3.addColorStop(1, "#808080");
      bctx.fillStyle = g3;
      bctx.beginPath();
      bctx.arc(x, y, 5, 0, Math.PI * 2);
      bctx.fill();
    }
  }

  return { map: toTexture(c, 3, 1), bump: toTexture(bc, 3, 1) };
}

function w0(bands: number, W: number) {
  return W / bands;
}

/* ------------------------------------------------------------------ */
/* Frog skin                                                           */
/* ------------------------------------------------------------------ */

export function frogSkinTexture(): { map: THREE.CanvasTexture; bump: THREE.CanvasTexture } {
  const W = 1024, H = 512;
  const [c, ctx] = makeCanvas(W, H);
  const rnd = mulberry(7);

  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, "#2f6b31");
  grad.addColorStop(0.5, "#3f8b3e");
  grad.addColorStop(1, "#5da04f");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // moist mottle
  for (let i = 0; i < 320; i++) {
    const x = rnd() * W, y = rnd() * H;
    const r = 8 + rnd() * 34;
    const g2 = ctx.createRadialGradient(x, y, 0, x, y, r);
    g2.addColorStop(0, `hsla(${95 + rnd() * 40}, ${40 + rnd() * 30}%, ${26 + rnd() * 26}%, ${0.08 + rnd() * 0.12})`);
    g2.addColorStop(1, "rgba(40,90,40,0)");
    ctx.fillStyle = g2;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  // dark spots (Rana tigrina — tiger spots)
  for (let i = 0; i < 90; i++) {
    const x = rnd() * W, y = rnd() * H * 0.62;
    const r = 3 + rnd() * 9;
    ctx.fillStyle = `rgba(16, 42, 18, ${0.25 + rnd() * 0.4})`;
    ctx.beginPath();
    ctx.ellipse(x, y, r, r * (0.6 + rnd() * 0.5), rnd() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }
  // dorsolateral fold lines (two pale ridges down the back)
  for (const fy of [H * 0.3, H * 0.62]) {
    ctx.strokeStyle = "rgba(198, 226, 168, 0.4)";
    ctx.lineWidth = 6;
    ctx.beginPath();
    for (let x = 0; x <= W; x += 32) {
      const y = fy + Math.sin(x * 0.02) * 6;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  // speckle
  for (let i = 0; i < 2600; i++) {
    const x = rnd() * W, y = rnd() * H;
    ctx.fillStyle = rnd() > 0.5 ? "rgba(210,240,190,0.10)" : "rgba(10,40,14,0.12)";
    ctx.fillRect(x, y, 1.5, 1.5);
  }

  const [bc, bctx] = makeCanvas(W, H);
  const brnd = mulberry(23);
  bctx.fillStyle = "#7d7d7d";
  bctx.fillRect(0, 0, W, H);
  // gland bumps (warty)
  for (let i = 0; i < 900; i++) {
    const x = brnd() * W, y = brnd() * H;
    const r = 1.5 + brnd() * 4;
    const g3 = bctx.createRadialGradient(x, y, 0, x, y, r);
    g3.addColorStop(0, "#c8c8c8");
    g3.addColorStop(1, "#6a6a6a");
    bctx.fillStyle = g3;
    bctx.beginPath();
    bctx.arc(x, y, r, 0, Math.PI * 2);
    bctx.fill();
  }
  return { map: toTexture(c), bump: toTexture(bc) };
}

/* ------------------------------------------------------------------ */
/* Protozoan cytoplasm                                                 */
/* ------------------------------------------------------------------ */

export function protozoaCytoplasmTexture(): THREE.CanvasTexture {
  const S = 512;
  const [c, ctx] = makeCanvas(S, S);
  const rnd = mulberry(11);
  const grad = ctx.createRadialGradient(S / 2, S / 2, 10, S / 2, S / 2, S / 2);
  grad.addColorStop(0, "#0e7490");
  grad.addColorStop(0.7, "#155e75");
  grad.addColorStop(1, "#164e63");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, S, S);
  // granular organelle speckle
  for (let i = 0; i < 3200; i++) {
    const x = rnd() * S, y = rnd() * S;
    const r = 0.8 + rnd() * 2.6;
    ctx.fillStyle = rnd() > 0.5 ? "rgba(165,243,252,0.14)" : "rgba(8,51,68,0.18)";
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  // alveoli checker hint (pellicle alveoli) — faint hex-ish dots near edge
  for (let i = 0; i < 400; i++) {
    const x = rnd() * S, y = rnd() * S;
    ctx.strokeStyle = "rgba(103,232,249,0.10)";
    ctx.lineWidth = 1;
    ctx.strokeRect(x, y, 9, 9);
  }
  return toTexture(c, 2, 1);
}

/* ------------------------------------------------------------------ */
/* Blood / RBC tissue                                                  */
/* ------------------------------------------------------------------ */

export function bloodTissueTexture(): THREE.CanvasTexture {
  const S = 512;
  const [c, ctx] = makeCanvas(S, S);
  const rnd = mulberry(31);
  ctx.fillStyle = "#7f1d1d";
  ctx.fillRect(0, 0, S, S);
  // packed RBCs
  for (let i = 0; i < 500; i++) {
    const x = rnd() * S, y = rnd() * S;
    const r = 5 + rnd() * 12;
    const g2 = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, r * 0.1, x, y, r);
    g2.addColorStop(0, "rgba(220,60,60,0.55)");
    g2.addColorStop(0.7, "rgba(150,26,26,0.5)");
    g2.addColorStop(1, "rgba(90,10,10,0.45)");
    ctx.fillStyle = g2;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  return toTexture(c, 1, 1);
}

/* ------------------------------------------------------------------ */
/* Physical material presets                                           */
/* ------------------------------------------------------------------ */

/**
 * Material presets. `metal` … `emissive` are the apparatus side of the
 * library, used by the lab studios (physics/chemistry benches) rather than
 * by the faunal anatomy scenes.
 */
type Preset =
  | "wetSkin"
  | "mucosa"
  | "muscle"
  | "organ"
  | "membrane"
  | "chitin"
  | "wax"
  | "metal"
  | "glass"
  | "wood"
  | "stone"
  | "emissive";

export function physical(
  preset: Preset,
  color: number | string,
  opts: {
    map?: THREE.Texture | null;
    bumpMap?: THREE.Texture | null;
    bumpScale?: number;
    opacity?: number;
    roughness?: number;
  } = {},
): THREE.MeshPhysicalMaterial {
  const base: THREE.MeshPhysicalMaterialParameters = { color };
  if (opts.map) base.map = opts.map;
  const m = new THREE.MeshPhysicalMaterial(base);
  if (opts.bumpMap) {
    m.bumpMap = opts.bumpMap;
    m.bumpScale = opts.bumpScale ?? 0.6;
  }
  if (opts.opacity !== undefined && opts.opacity < 1) {
    m.transparent = true;
    m.opacity = opts.opacity;
  }
  switch (preset) {
    case "wetSkin":
      m.roughness = opts.roughness ?? 0.32;
      m.clearcoat = 0.85;
      m.clearcoatRoughness = 0.28;
      m.sheen = 0.5;
      m.sheenColor = new THREE.Color("#ff9d7a");
      m.sheenRoughness = 0.5;
      break;
    case "mucosa":
      m.roughness = opts.roughness ?? 0.42;
      m.clearcoat = 0.6;
      m.clearcoatRoughness = 0.4;
      break;
    case "muscle":
      m.roughness = opts.roughness ?? 0.5;
      m.sheen = 0.35;
      m.sheenColor = new THREE.Color("#b91c1c");
      break;
    case "organ":
      m.roughness = opts.roughness ?? 0.48;
      m.clearcoat = 0.35;
      m.clearcoatRoughness = 0.5;
      break;
    case "membrane":
      m.roughness = opts.roughness ?? 0.25;
      m.transmission = 0.55;
      m.thickness = 0.4;
      m.transparent = true;
      m.opacity = opts.opacity ?? 0.72;
      m.ior = 1.36;
      break;
    case "chitin":
      m.roughness = opts.roughness ?? 0.35;
      m.clearcoat = 0.9;
      m.clearcoatRoughness = 0.2;
      m.metalness = 0.12;
      break;
    case "wax":
      m.roughness = 0.55;
      m.clearcoat = 0.15;
      break;
    /* ── apparatus presets (physics / chemistry benches) ── */
    case "metal":
      m.roughness = opts.roughness ?? 0.28;
      m.metalness = 0.92;
      m.clearcoat = 0.2;
      break;
    case "glass":
      m.roughness = opts.roughness ?? 0.06;
      m.transmission = 0.92;
      m.thickness = 0.6;
      m.transparent = true;
      m.opacity = opts.opacity ?? 0.34;
      m.ior = 1.5;
      m.clearcoat = 1;
      m.clearcoatRoughness = 0.05;
      break;
    case "wood":
      m.roughness = opts.roughness ?? 0.78;
      m.clearcoat = 0.08;
      break;
    case "stone":
      m.roughness = opts.roughness ?? 0.94;
      break;
    case "emissive":
      m.roughness = 0.4;
      m.emissive = new THREE.Color(color);
      m.emissiveIntensity = 1.15;
      break;
  }
  return m;
}

/* ------------------------------------------------------------------ */
/* Plant-cell textures (realistic ultrastructure realism layer)         */
/* ------------------------------------------------------------------ */

/** Lush chloroplast-green cytoplasm with granular stroma speckle. */
export function plantCytoplasmTexture(): THREE.CanvasTexture {
  const [c, ctx] = makeCanvas(256, 256);
  ctx.fillStyle = "#2f7d32";
  ctx.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 2600; i++) {
    const x = Math.random() * 256;
    const y = Math.random() * 256;
    const r = 0.6 + Math.random() * 1.6;
    const tone = Math.random();
    ctx.fillStyle =
      tone < 0.4 ? "rgba(74,222,128,0.34)" : tone < 0.75 ? "rgba(21,128,61,0.30)" : "rgba(187,247,146,0.22)";
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 7);
    ctx.fill();
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}

/** Cellulose wall: pale fibril weave with faint horizontal lamellation. */
export function celluloseWallTexture(): { map: THREE.CanvasTexture; bump: THREE.CanvasTexture } {
  const [c, ctx] = makeCanvas(256, 256);
  const [b, bctx] = makeCanvas(256, 256);
  ctx.fillStyle = "#d8e8c8";
  ctx.fillRect(0, 0, 256, 256);
  bctx.fillStyle = "#808080";
  bctx.fillRect(0, 0, 256, 256);
  // criss-cross fibrils
  for (let i = 0; i < 90; i++) {
    const y0 = Math.random() * 256;
    const ang = (Math.random() - 0.5) * 0.5;
    ctx.strokeStyle = `rgba(120,150,96,${0.10 + Math.random() * 0.16})`;
    ctx.lineWidth = 0.7 + Math.random() * 1.3;
    ctx.beginPath();
    ctx.moveTo(0, y0);
    ctx.bezierCurveTo(85, y0 + Math.sin(ang) * 26, 170, y0 - Math.sin(ang) * 26, 256, y0);
    ctx.stroke();
    bctx.strokeStyle = Math.random() < 0.5 ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)";
    bctx.lineWidth = ctx.lineWidth;
    bctx.beginPath();
    bctx.moveTo(0, y0);
    bctx.bezierCurveTo(85, y0 + Math.sin(ang) * 26, 170, y0 - Math.sin(ang) * 26, 256, y0);
    bctx.stroke();
  }
  const map = new THREE.CanvasTexture(c);
  const bump = new THREE.CanvasTexture(b);
  map.wrapS = map.wrapT = bump.wrapS = bump.wrapT = THREE.RepeatWrapping;
  return { map, bump };
}

/** Mother-of-pearl: concentric iridescent nacre bands for mollusc shells. */
export function shellNacreTexture(): { map: THREE.CanvasTexture; bump: THREE.CanvasTexture } {
  const [c, ctx] = makeCanvas(256, 256);
  const [b, bctx] = makeCanvas(256, 256);
  for (let ring = 24; ring >= 0; ring--) {
    const hue = (ring * 14) % 360;
    const lum = 58 + (ring % 3) * 7;
    ctx.fillStyle = "hsl(" + hue + ", 42%, " + lum + "%)";
    bctx.fillStyle = ring % 2 ? '#a0a0a0' : '#606060';
    const r = (ring / 25) * 180;
    ctx.beginPath(); ctx.arc(128, 128, r, 0, 7); ctx.fill();
    bctx.beginPath(); bctx.arc(128, 128, r, 0, 7); bctx.fill();
  }
  const map = new THREE.CanvasTexture(c);
  const bump = new THREE.CanvasTexture(b);
  return { map, bump };
}

/** Fish skin: overlapping cycloid scales with a silvery-blue sheen. */
export function fishScaleTexture(): { map: THREE.CanvasTexture; bump: THREE.CanvasTexture } {
  const [c, ctx] = makeCanvas(256, 256);
  const [b, bctx] = makeCanvas(256, 256);
  ctx.fillStyle = '#1e7a8c'; ctx.fillRect(0, 0, 256, 256);
  bctx.fillStyle = '#7a7a7a'; bctx.fillRect(0, 0, 256, 256);
  const rows = 10, cols = 14;
  for (let ry = 0; ry < rows; ry++) {
    for (let cx = 0; cx < cols; cx++) {
      const x = (cx + (ry % 2 ? 0.5 : 0)) * (256 / cols);
      const y = ry * (256 / rows);
      const rr = 256 / cols / 1.6;
      const lum = 52 + ((ry + cx) % 3) * 9;
      const hueVal = 192 + ((cx + ry) % 5) * 6;
      ctx.fillStyle = "hsl(" + hueVal + ", 64%, " + lum + "%)";
      bctx.fillStyle = (ry + cx) % 2 ? '#b5b5b5' : '#4d4d4d';
      ctx.beginPath(); ctx.arc(x, y, rr, 0.15 * Math.PI, 0.85 * Math.PI); ctx.fill();
      bctx.beginPath(); bctx.arc(x, y, rr, 0.15 * Math.PI, 0.85 * Math.PI); bctx.fill();
    }
  }
  const map = new THREE.CanvasTexture(c);
  const bump = new THREE.CanvasTexture(b);
  map.wrapS = map.wrapT = bump.wrapS = bump.wrapT = THREE.RepeatWrapping;
  return { map, bump };
}

/** Vacuolar sap: watery translucent tint with faint tonoplast sheen noise. */
export function vacuoleSapTexture(): THREE.CanvasTexture {
  const [c, ctx] = makeCanvas(128, 128);
  ctx.fillStyle = "#bfe3ff";
  ctx.fillRect(0, 0, 128, 128);
  for (let i = 0; i < 480; i++) {
    ctx.fillStyle = `rgba(255,255,255,${0.03 + Math.random() * 0.05})`;
    ctx.beginPath();
    ctx.arc(Math.random() * 128, Math.random() * 128, 1 + Math.random() * 5, 0, 7);
    ctx.fill();
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}

/* ------------------------------------------------------------------ */
/* Smooth curved body builders                                         */
/* ------------------------------------------------------------------ */

/** CatmullRom tube along points with per-segment radius (lobe = smooth worm). */
export function tubeAlong(
  points: THREE.Vector3[],
  radiusAt: (t: number) => number,
  tubularSegments = 96,
  radialSegments = 24,
  material?: THREE.Material,
): THREE.Mesh {
  const curve = new THREE.CatmullRomCurve3(points);
  // sample radii per tubular segment and bake into a custom TubeGeometry-like
  // via scaling a standard tube is non-uniform; instead build with
  // ExtrudeGeometry-free approach: use TubeGeometry with average radius then
  // post-scale vertices by the radius profile along u.
  const geo = new THREE.TubeGeometry(curve, tubularSegments, 1, radialSegments, false);
  const pos = geo.attributes.position as THREE.BufferAttribute;
  const uv = geo.attributes.uv as THREE.BufferAttribute;
  const v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    const u = uv.getX(i);
    const r = radiusAt(u);
    // pull vertex toward the curve center-line at parameter u
    const p = curve.getPointAt(u);
    const target = p.clone().add(v.clone().sub(p).normalize().multiplyScalar(r));
    // NOTE: v is in world space of TubeGeometry (radius 1 around curve);
    // safe because TubeGeometry builds around curve directly.
    pos.setXYZ(i, target.x, target.y, target.z);
  }
  geo.computeVertexNormals();
  return new THREE.Mesh(geo, material ?? new THREE.MeshStandardMaterial());
}

/** Closed smooth blob with noise displacement — organic organ look. */
export function organicBlob(
  r: number,
  seed = 1,
  detail = 2,
  amp = 0.12,
): THREE.SphereGeometry {
  const geo = new THREE.SphereGeometry(r, 24 + detail * 12, 16 + detail * 8);
  const rnd = mulberry(seed);
  const pos = geo.attributes.position as THREE.BufferAttribute;
  const v = new THREE.Vector3();
  // 3-axis low-freq noise via layered sin
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    const n =
      1 +
      amp * (Math.sin(v.x * 2.1 + seed) * Math.cos(v.y * 1.7 + seed * 2) * 0.5 +
             Math.sin(v.y * 3.3 + rnd() * 0.01) * 0.3 +
             Math.cos(v.z * 2.7 + seed) * 0.2);
    v.multiplyScalar(n);
    pos.setXYZ(i, v.x, v.y, v.z);
  }
  geo.computeVertexNormals();
  return geo;
}

/* ------------------------------------------------------------------ */
/* Soft contact shadow ground                                          */
/* ------------------------------------------------------------------ */

export function contactGround(scene: THREE.Scene, y = -2.6, size = 34): void {
  const [c, ctx] = makeCanvas(256, 256);
  const g = ctx.createRadialGradient(128, 128, 10, 128, 128, 126);
  g.addColorStop(0, "rgba(2,6,23,0.55)");
  g.addColorStop(0.7, "rgba(2,6,23,0.28)");
  g.addColorStop(1, "rgba(2,6,23,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);
  const tex = new THREE.CanvasTexture(c);
  const m = new THREE.Mesh(
    new THREE.PlaneGeometry(size, size),
    new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false }),
  );
  m.rotation.x = -Math.PI / 2;
  m.position.y = y;
  m.renderOrder = -1;
  scene.add(m);
}
