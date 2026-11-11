/**
 * Lab Studios — Physics: Optics (lenses, mirrors, prism, refraction,
 * wave optics, the general optics bench).
 */

import type { StudioSpec } from "./types";

/** Ray colours shared by every optical bench, so the coding stays familiar. */
const RAY_IN = 0xfacc15;
const RAY_OUT = 0xef4444;
const RAY_AXIS = 0x38bdf8;
const RAY_VIRTUAL = 0xa855f7;

export const PHYSICS_OPTICS: Record<string, StudioSpec> = {
  /* ── The general optics bench ── */
  "ph-3d-optics": {
    studio: "Optics bench — object, lens, image",
    blurb:
      "An optical bench with the object, the lens and the screen at their real stations. Switch to the ray construction, the sign convention or the magnification, and the same rays explain each.",
    defaultView: "external",
    parts: [
      {
        shape: { kind: "box", size: [18, 0.3, 2] },
        at: [0, -2.6, 0],
        material: "wood",
        color: 0x6b4423,
        views: ["external", "rays", "signs", "magnification"],
        label: { text: "Optical bench", sub: "stations measured from the lens", at: [0, -3.9, 0], color: "#c084fc" },
      },
      {
        shape: { kind: "tube", points: [[0, -2.4, 0], [0, 2.6, 0]], radius: 0.03 },
        material: "metal",
        color: 0x94a3b8,
        views: ["external", "rays", "signs", "magnification"],
        label: { text: "Principal axis", sub: "pole at the optical centre", at: [-3.4, 3.4, 0], color: "#7dd3fc" },
      },
      {
        shape: { kind: "disc", r: 1.5, segments: 44 },
        at: [0, 0, 0],
        rot: [0, Math.PI / 2, 0],
        material: "glass",
        color: 0xdbeafe,
        views: ["external", "rays", "signs", "magnification"],
        label: { text: "Convex lens", sub: "optical centre O; f = 15 cm", at: [1.4, 4.2, 0], color: "#38bdf8" },
      },
      {
        shape: { kind: "tube", points: [[-6, 0, 0], [-6, 2.2, 0]], radius: 0.09 },
        material: "emissive",
        color: 0x22c55e,
        views: ["external", "rays", "magnification"],
        label: { text: "Object (u = −30 cm)", sub: "arrow stands for the object height", at: [-9.4, 2.6, 0], color: "#4ade80" },
      },
      {
        shape: { kind: "tube", points: [[-6, 0, 0], [0, 0, 0]], radius: 0.035 },
        material: "emissive",
        color: RAY_IN,
        views: ["rays"],
      },
      {
        shape: { kind: "tube", points: [[0, 0, 0], [6, -1.1, 0]], radius: 0.035 },
        material: "emissive",
        color: RAY_OUT,
        views: ["rays"],
        label: { text: "Refracted ray", sub: "through the principal focus F", at: [3.2, -3.0, 0], color: "#f87171" },
      },
      {
        shape: { kind: "tube", points: [[-6, 2.2, 0], [0, 2.2, 0], [6, -1.1, 0]], radius: 0.028 },
        material: "emissive",
        color: 0x22d3ee,
        views: ["rays"],
        label: { text: "Ray through O", sub: "undeviated — passes straight through", at: [7.0, 2.4, 0], color: "#67e8f9" },
      },
      {
        shape: { kind: "tube", points: [[6, -1.1, 0], [6, 0, 0]], radius: 0.09 },
        material: "emissive",
        color: 0xec4899,
        views: ["rays", "magnification"],
        label: { text: "Inverted image (v = +30 cm)", sub: "real, inverted, same size (u = 2f)", at: [8.6, 1.2, 0], color: "#f472b6" },
      },
      {
        shape: { kind: "sphere", r: 0.13 },
        at: [-3, 0, 0],
        material: "emissive",
        color: 0x60a5fa,
        views: ["rays", "signs"],
        label: { text: "Focus F (f = 15 cm)", sub: "rays parallel to the axis converge here", at: [-4.6, 4.4, 0], color: "#60a5fa" },
      },
      {
        shape: { kind: "sphere", r: 0.16 },
        at: [-6, 0, 0],
        material: "emissive",
        color: 0x60a5fa,
        views: ["signs"],
        label: { text: "2F on the object side", sub: "object at 2F ⇒ image at 2F, same size", at: [-8.6, -2.4, 0], color: "#93c5fd" },
      },
    ],
    views: [
      {
        id: "external",
        label: "Bench (real)",
        hint: "Object, lens and screen on their real stations.",
        rows: [
          { name: "Convex lens", fn: "Converges a parallel beam to the principal focus.", why: "Converging versus diverging is the first thing an optics question fixes." },
          { name: "Principal axis", fn: "The line through the optical centre perpendicular to the lens.", why: "All distances u, v and f are measured along it." },
          { name: "Object", fn: "The upright arrow whose image is to be found.", why: "Object height enters the magnification, not the lens formula." },
        ],
      },
      {
        id: "rays",
        label: "Ray construction",
        hint: "The two standard rays that locate the image.",
        rows: [
          { name: "Ray through O", fn: "Passes undeviated through the optical centre.", why: "The only ray that needs no construction — it defines the image height directly." },
          { name: "Ray parallel to the axis", fn: "Refracts through the principal focus.", why: "This is what makes the focal length measurable." },
          { name: "Refracted ray", fn: "Where the two refracted rays cross, the image forms.", why: "Real images come from actual crossing; virtual images from backward extensions." },
          { name: "Image", fn: "Real and inverted when the object is beyond F.", why: "Real/inverted versus virtual/erect is a guaranteed one-marker." },
        ],
      },
      {
        id: "signs",
        label: "Sign convention",
        hint: "How the distances are signed in the Cartesian convention.",
        shell: "ghost",
        rows: [
          { name: "Distances against the incident light", fn: "u is negative for a real object.", why: "Most wrong answers come from the sign of u, not the algebra." },
          { name: "Focal length of a convex lens", fn: "Positive.", why: "Sign of f decides which way the formula output points." },
          { name: "Lens formula", fn: "1/v − 1/u = 1/f.", why: "The Cartesian form with the minus sign — the form NEB expects." },
          { name: "At 2F", fn: "u = v = 2f gives a real, inverted image of the same size.", why: "The special case that is asked as a numerical." },
        ],
      },
      {
        id: "magnification",
        label: "Magnification",
        hint: "The two equivalent expressions for m.",
        rows: [
          { name: "m = v/u", fn: "From the distances alone.", why: "Negative m means an inverted image." },
          { name: "m = h′/h", fn: "From the heights — the measurement form.", why: "Links the bench measurement to the calculation." },
          { name: "Newton's form", fn: "m = f/(f + u) for a thin lens.", why: "Quickest route when u is given as a multiple of f." },
        ],
      },
    ],
    theory: {
      look: "A timber bench carrying an upright green object arrow, a large glass lens at its centre and an inverted pink image arrow beyond it, with the principal axis ruled along the bench and the two construction rays drawn in yellow, cyan and red.",
      principle: "A thin lens obeys 1/v − 1/u = 1/f in the Cartesian convention, where distances against the incident light are negative. The image is located by two rays: the ray through the optical centre, which is undeviated, and the ray parallel to the axis, which refracts through the principal focus. Where they meet, the image stands; its size follows m = v/u = h′/h.",
      why: "The sign of u, the Cartesian form of the lens formula, the ray pair used for the construction, and the real-inverted versus virtual-erect decision are exactly what the marking scheme looks for.",
    },
  },

  /* ── Refraction at a plane surface ── */
  "ph-3d-refraction": {
    studio: "Refraction — real interface, real rays",
    blurb: "Two media meeting at a real plane interface, with the incident, reflected and refracted rays drawn at their true angles — then the critical angle and the total internal reflection case.",
    defaultView: "external",
    parts: [
      {
        shape: { kind: "box", size: [12, 3, 8] },
        at: [0, -1.5, 0],
        material: "glass",
        color: 0x0ea5e9,
        views: ["external", "rays", "critical", "tir"],
        label: { text: "Denser medium (μ = 1.5)", sub: "light slows here", at: [-6.4, -3.4, 0], color: "#7dd3fc" },
      },
      {
        shape: { kind: "plane", w: 12, h: 8 },
        at: [0, 0.02, 0],
        rot: [-Math.PI / 2, 0, 0],
        material: "membrane",
        color: 0xe2e8f0,
        views: ["external", "rays", "critical", "tir"],
        label: { text: "Plane interface", sub: "normal drawn perpendicular to it", at: [5.4, 1.0, 0], color: "#e2e8f0" },
      },
      {
        shape: { kind: "tube", points: [[0, 0, 0], [0, 4.4, 0]], radius: 0.025 },
        material: "emissive",
        color: 0x94a3b8,
        views: ["rays", "critical", "tir"],
        label: { text: "Normal", sub: "all angles measured from it", at: [1.6, 4.6, 0], color: "#cbd5e1" },
      },
      {
        shape: { kind: "tube", points: [[-3.4, 3.4, 0], [0, 0, 0]], radius: 0.04 },
        material: "emissive",
        color: RAY_IN,
        views: ["rays", "critical"],
        label: { text: "Incident ray (i = 45°)", sub: "the angle of incidence is i, not the angle to the surface", at: [-6.2, 3.6, 0], color: "#fbbf24" },
      },
      {
        shape: { kind: "tube", points: [[0, 0, 0], [1.9, -2.7, 0]], radius: 0.04 },
        material: "emissive",
        color: RAY_OUT,
        views: ["rays"],
        label: { text: "Refracted ray (r = 28°)", sub: "sin i / sin r = μ — bends toward the normal", at: [4.4, -2.8, 0], color: "#f87171" },
      },
      {
        shape: { kind: "tube", points: [[0, 0, 0], [3.4, 3.4, 0]], radius: 0.03 },
        material: "emissive",
        color: 0x22d3ee,
        views: ["rays"],
        label: { text: "Weak reflected ray", sub: "some light always reflects at the surface", at: [5.0, 3.6, 0], color: "#67e8f9" },
      },
      {
        shape: { kind: "tube", points: [[-5.2, -5.2, 0], [0, 0, 0], [5.2, -5.2, 0]], radius: 0.035 },
        material: "emissive",
        color: RAY_VIRTUAL,
        views: ["critical", "tir"],
        label: { text: "Critical angle i_c = 41.8°", sub: "sin i_c = 1/μ — beyond it, no refraction at all", at: [5.6, -6.2, 0], color: "#c084fc" },
      },
      {
        shape: { kind: "tube", points: [[-3.8, -3.4, 0], [0, 0, 0], [3.8, -3.4, 0]], radius: 0.05 },
        material: "emissive",
        color: 0x22c55e,
        views: ["tir"],
        label: { text: "Total internal reflection", sub: "for i > i_c all the light returns — the fibre-optic case", at: [5.0, -1.0, 0], color: "#4ade80" },
      },
    ],
    views: [
      {
        id: "external",
        label: "The interface (real)",
        hint: "Two media meeting at a plane boundary.",
        rows: [
          { name: "Rarer medium", fn: "Light travels faster; rays bend away from the normal on leaving.", why: "The direction of bending is the standard check question." },
          { name: "Denser medium", fn: "Light slows; rays bend toward the normal on entering.", why: "Refractive index is a ratio of speeds." },
          { name: "Plane interface", fn: "The surface separating them; the normal is drawn at the point of incidence.", why: "Angles are measured from the normal, never from the surface." },
        ],
      },
      {
        id: "rays",
        label: "Snell's law",
        hint: "Incident, reflected and refracted rays together.",
        rows: [
          { name: "Angle of incidence i", fn: "Between the incident ray and the normal.", why: "The most common error is quoting the angle to the surface instead." },
          { name: "Snell's law", fn: "sin i / sin r = μ (constant for the pair of media).", why: "The statement and the ratio both carry marks." },
          { name: "Refractive index", fn: "μ = c/v — speed in vacuum over speed in the medium.", why: "Links the optical law to the wave speed." },
          { name: "Wavelength change", fn: "λ changes with the medium; frequency does not.", why: "A classic conceptual trap." },
        ],
      },
      {
        id: "critical",
        label: "Critical angle",
        hint: "The limiting incidence for which r = 90°.",
        shell: "ghost",
        rows: [
          { name: "Critical angle", fn: "sin i_c = 1/μ, so i_c ≈ 41.8° for μ = 1.5.", why: "The formula and the number are both asked." },
          { name: "Condition", fn: "Only occurs going from denser to rarer — never the reverse.", why: "The direction condition is a favourite trick." },
        ],
      },
      {
        id: "tir",
        label: "Total internal reflection",
        hint: "Beyond the critical angle all light returns.",
        shell: "ghost",
        rows: [
          { name: "Total internal reflection", fn: "For i > i_c there is no refracted ray; reflectance becomes total.", why: "Definition and the two conditions must both be stated." },
          { name: "Applications", fn: "Optical fibres, prisms in periscopes, mirage, sparkle of diamond.", why: "Application questions expect at least two concrete examples." },
          { name: "Diamond", fn: "Very small i_c (≈24°) makes its facets glitter.", why: "Uses the same formula with a different μ." },
        ],
      },
    ],
    theory: {
      look: "A slab of water-blue medium under a plane interface, with the normal standing above it, the yellow incident ray meeting it at 45°, the red refracted ray bending toward the normal and a faint cyan reflected ray leaving at the same angle as the incident one.",
      principle: "When light crosses a plane boundary it changes speed and therefore direction. The angle is always measured from the normal, and the pair obeys Snell's law, sin i / sin r = μ = c/v. Going from denser to rarer the refracted ray bends away from the normal until, at the critical angle sin i_c = 1/μ, it runs along the surface; beyond that angle it does not leave at all.",
      why: "Measuring from the normal, quoting Snell's law, the direction condition for the critical angle, and naming real applications of total internal reflection are the four marks this model separates.",
    },
  },

  /* ── Lenses ── */
  "ph-3d-lenses": {
    studio: "Lenses — thick, thin, and the image they build",
    blurb: "A real biconvex lens cut in section with its two focal points, the three standard rays, and the diverging case drawn on the same axis for contrast.",
    defaultView: "external",
    parts: [
      {
        shape: { kind: "sphere", r: 1.1, scale: [0.55, 1, 1] },
        at: [0, 0, 0],
        material: "glass",
        color: 0xdbeafe,
        views: ["external", "rays", "diverging"],
        label: { text: "Biconvex lens", sub: "two refracting surfaces, one optical centre", at: [0, 4.0, 0], color: "#38bdf8" },
      },
      {
        shape: { kind: "box", size: [16, 0.25, 1.4] },
        at: [0, -2.2, 0],
        material: "wood",
        color: 0x6b4423,
        views: ["external", "rays", "diverging"],
      },
      {
        shape: { kind: "sphere", r: 0.15 },
        at: [-3.4, 0, 0],
        material: "emissive",
        color: 0x60a5fa,
        views: ["rays", "diverging"],
        label: { text: "F₁", sub: "first principal focus — object side", at: [-5.2, 1.8, 0], color: "#60a5fa" },
      },
      {
        shape: { kind: "sphere", r: 0.15 },
        at: [3.4, 0, 0],
        material: "emissive",
        color: 0x60a5fa,
        views: ["rays"],
        label: { text: "F₂", sub: "second principal focus — image side", at: [5.2, 1.8, 0], color: "#93c5fd" },
      },
      {
        shape: { kind: "tube", points: [[-6.4, 2.0, 0], [0, 2.0, 0], [3.4, 0, 0], [7.4, -1.1, 0]], radius: 0.032 },
        material: "emissive",
        color: RAY_IN,
        views: ["rays"],
        label: { text: "Ray 1 — parallel, then through F₂", sub: "defines the focal length", at: [-4.4, 3.2, 0], color: "#fbbf24" },
      },
      {
        shape: { kind: "tube", points: [[-6.4, 2.0, 0], [0, 0, 0], [7.4, -2.4, 0]], radius: 0.03 },
        material: "emissive",
        color: 0x22d3ee,
        views: ["rays"],
        label: { text: "Ray 2 — through the optical centre", sub: "undeviated, sets the image height", at: [1.0, -3.6, 0], color: "#67e8f9" },
      },
      {
        shape: { kind: "tube", points: [[7.4, -2.4, 0], [7.4, 0, 0]], radius: 0.08 },
        material: "emissive",
        color: 0xec4899,
        views: ["rays"],
        label: { text: "Real inverted image", sub: "rays actually cross here", at: [9.6, -0.6, 0], color: "#f472b6" },
      },
      {
        shape: { kind: "sphere", r: 1.0, scale: [0.4, 1, 1] },
        at: [-3.4, -1.0, 0],
        material: "glass",
        color: 0xfecdd3,
        views: ["diverging"],
        label: { text: "Concave lens (contrast)", sub: "diverges — f negative, image always virtual and diminished", at: [-5.6, -3.2, 0], color: "#fda4af" },
      },
      {
        shape: { kind: "tube", points: [[-6.0, 2.4, 0], [-3.4, 1.0, 0], [-1.4, -0.4, 0]], radius: 0.03 },
        material: "emissive",
        color: RAY_VIRTUAL,
        views: ["diverging"],
        label: { text: "Virtual focus", sub: "the backward extension meets the axis", at: [-1.2, -2.4, 0], color: "#c084fc" },
      },
    ],
    views: [
      {
        id: "external",
        label: "The lens (real)",
        hint: "Glass with its two focal points marked on the axis.",
        rows: [
          { name: "Optical centre", fn: "The point through which a ray passes undeviated.", why: "Every construction uses this ray." },
          { name: "Principal foci", fn: "F₁ on the object side, F₂ on the image side, both f from the centre.", why: "Parallel rays converge at F₂; that is how f is defined for a convex lens." },
          { name: "Pole", fn: "Where the principal axis meets the lens surface.", why: "The reference point for all distances." },
        ],
      },
      {
        id: "rays",
        label: "Ray diagram",
        hint: "The two construction rays and the image they fix.",
        rows: [
          { name: "Ray parallel to the axis", fn: "Emerges through F₂.", why: "Sets the location of the image on the axis." },
          { name: "Ray through the centre", fn: "Continues straight; its crossing gives the image height.", why: "The only ray you can draw without knowing f." },
          { name: "Real image", fn: "Formed where the emerging rays actually meet; inverted.", why: "Real images can be caught on a screen — a common practical question." },
        ],
      },
      {
        id: "diverging",
        label: "Concave lens (contrast)",
        hint: "A negative focal length and a virtual image.",
        shell: "ghost",
        rows: [
          { name: "Diverging lens", fn: "Spreads a parallel beam as if from a virtual focus.", why: "f is taken negative in the same lens formula." },
          { name: "Image", fn: "Always virtual, erect and diminished for a real object.", why: "The three properties together are the standard answer." },
          { name: "Power", fn: "P = 1/f in dioptres, negative for a diverging lens.", why: "Power questions usually come with a focal length in cm." },
        ],
      },
    ],
    theory: {
      look: "A biconvex lens of blue glass standing on its axis, with F₁ and F₂ marked, a yellow ray running parallel to the axis and bending through F₂, a cyan ray straight through the optical centre, and the pink inverted image arrow where the two cross. The contrast view sets a concave lens beside it.",
      principle: "A lens bends rays by refraction at two surfaces. A ray parallel to the principal axis emerges through the second principal focus; a ray through the optical centre is undeviated. Where they intersect, the image forms — real and inverted when the object lies beyond the first focus. The same lens formula 1/v − 1/u = 1/f covers the diverging case with f negative, giving an image that is virtual, erect and diminished.",
      why: "Which ray is undeviated, why F₂ is defined by a parallel ray, the sign of f for a concave lens, and the three properties of its image are the standard marks.",
    },
  },

  /* ── Mirrors ── */
  "ph-3d-mirrors": {
    studio: "Spherical mirrors — pole, focus, centre of curvature",
    blurb: "A concave mirror in section with its real centre of curvature and focus, the standard rays, and the convex case beside it with the same vocabulary.",
    defaultView: "external",
    parts: [
      {
        shape: { kind: "sphere", r: 2.2, scale: [0.34, 1, 1] },
        at: [0, 0, 0],
        material: "metal",
        color: 0xcbd5e1,
        views: ["external", "rays", "convex"],
        label: { text: "Concave mirror", sub: "polished inner surface reflects", at: [0, 3.8, 0], color: "#38bdf8" },
      },
      {
        shape: { kind: "tube", points: [[-8, 0, 0], [8, 0, 0]], radius: 0.022 },
        material: "emissive",
        color: 0x475569,
        views: ["rays", "convex"],
        label: { text: "Principal axis", sub: "pole P at the mirror's centre", at: [-6.0, 1.6, 0], color: "#cbd5e1" },
      },
      {
        shape: { kind: "sphere", r: 0.15 },
        at: [-1.1, 0, 0],
        material: "emissive",
        color: 0x60a5fa,
        views: ["rays"],
        label: { text: "Focus F", sub: "f = R/2 — rays parallel to the axis converge here", at: [-3.2, 2.6, 0], color: "#60a5fa" },
      },
      {
        shape: { kind: "sphere", r: 0.17 },
        at: [-2.2, 0, 0],
        material: "emissive",
        color: 0x22c55e,
        views: ["rays"],
        label: { text: "Centre of curvature C", sub: "radius R = 2f from the pole", at: [-5.0, -2.4, 0], color: "#4ade80" },
      },
      {
        shape: { kind: "tube", points: [[-5.4, 2.2, 0], [-0.2, 2.2, 0], [-1.1, 0, 0], [-1.1, -1.3, 0]], radius: 0.03 },
        material: "emissive",
        color: RAY_IN,
        views: ["rays"],
        label: { text: "Parallel ray → through F", sub: "defines the focal length", at: [-4.6, 3.4, 0], color: "#fbbf24" },
      },
      {
        shape: { kind: "tube", points: [[-5.4, 2.2, 0], [-2.2, 0, 0], [-0.4, -2.3, 0]], radius: 0.028 },
        material: "emissive",
        color: 0x22d3ee,
        views: ["rays"],
        label: { text: "Ray through C", sub: "strikes normally, reflects back along itself", at: [-0.2, -3.4, 0], color: "#67e8f9" },
      },
      {
        shape: { kind: "sphere", r: 1.9, scale: [0.3, 1, 1] },
        at: [-6.4, -1.6, 0],
        material: "metal",
        color: 0xfca5a5,
        views: ["convex"],
        label: { text: "Convex mirror (contrast)", sub: "R and f both measured behind the mirror, f negative", at: [-9.2, -3.4, 0], color: "#fca5a5" },
      },
      {
        shape: { kind: "plane", w: 4, h: 3 },
        at: [2.2, 1.6, 0],
        material: "wax",
        color: 0xfef3c7,
        views: ["rays"],
        label: { text: "Screen / eye position", sub: "a real image can be caught here", at: [3.4, 3.6, 0], color: "#fde68a" },
      },
    ],
    views: [
      {
        id: "external",
        label: "Concave mirror (real)",
        hint: "A polished spherical surface, shown in section.",
        rows: [
          { name: "Pole P", fn: "The geometric centre of the reflecting surface.", why: "All u and v are measured from P." },
          { name: "Centre of curvature C", fn: "Centre of the sphere the mirror is cut from; R = 2f.", why: "The relation f = R/2 must be quoted." },
          { name: "Aperture", fn: "The effective width of the reflecting surface.", why: "The mirror formula is only accurate for a small aperture — an examiner favourite." },
        ],
      },
      {
        id: "rays",
        label: "Ray construction",
        hint: "The two rays used to locate an image in a mirror.",
        rows: [
          { name: "Ray parallel to the axis", fn: "Reflects through the focus F.", why: "Defines f for a concave mirror." },
          { name: "Ray through C", fn: "Hits the mirror normally and retraces its path.", why: "This is the ray that makes the geometry exact." },
          { name: "Mirror formula", fn: "1/v + 1/u = 1/f — note the plus sign.", why: "The plus is the difference from the lens formula, and the usual error." },
          { name: "Image at C", fn: "Object at C ⇒ real, inverted, same size.", why: "A standard special case both for mirrors and lenses." },
        ],
      },
      {
        id: "convex",
        label: "Convex mirror (contrast)",
        hint: "The diverging mirror and its always-virtual image.",
        shell: "ghost",
        rows: [
          { name: "Convex mirror", fn: "Reflects from the outer surface; f and R are negative.", why: "Sign convention is the whole question here." },
          { name: "Image", fn: "Always virtual, erect and diminished.", why: "Three properties — all three are required." },
          { name: "Use", fn: "Vehicle rear-view and blind-corner mirrors give a wide field of view.", why: "The reason is asked alongside the property list." },
        ],
      },
    ],
    theory: {
      look: "A silvered concave shell with the principal axis ruled through its pole, F marked at half the radius and C at the full radius. A yellow ray enters parallel and leaves through F; a cyan ray aimed at C reflects straight back on itself, and a screen waits where a real image would land.",
      principle: "Mirrors obey the law of reflection, angle of incidence equal to angle of reflection, measured from the normal at the point of incidence. For a spherical mirror of small aperture the geometry gives 1/v + 1/u = 1/f with f = R/2. Rays parallel to the principal axis reflect through the focus, and rays through the centre of curvature retrace their path, so an image can be located by construction.",
      why: "The f = R/2 relation, the plus sign in the mirror formula, the small-aperture assumption, and the difference between real and virtual images are the exact points the paper tests.",
    },
  },

  /* ── Prism ── */
  "ph-3d-prism": {
    studio: "Glass prism — refraction at two surfaces",
    blurb: "A real triangular prism with a ray traced through it, the angle of deviation marked, and the minimum-deviation condition drawn on the same glass.",
    defaultView: "external",
    parts: [
      {
        shape: { kind: "cylinder", r1: 2.4, h: 3.2 },
        at: [0, 0, 0],
        rot: [Math.PI / 2, 0, 0],
        material: "glass",
        color: 0xdbeafe,
        views: ["external", "rays", "deviation", "minimum"],
        label: { text: "Glass prism (A = 60°)", sub: "two refracting surfaces and a base", at: [0, 4.2, 0], color: "#38bdf8" },
      },
      {
        shape: { kind: "tube", points: [[-6.4, -1.2, 0], [-1.4, -1.2, 0]], radius: 0.04 },
        material: "emissive",
        color: RAY_IN,
        views: ["rays", "deviation", "minimum"],
        label: { text: "Incident ray", sub: "angle i at the first surface", at: [-6.6, 0.4, 0], color: "#fbbf24" },
      },
      {
        shape: { kind: "tube", points: [[-1.4, -1.2, 0], [1.0, 1.4, 0], [4.2, 1.4, 0]], radius: 0.04 },
        material: "emissive",
        color: RAY_OUT,
        views: ["rays", "deviation", "minimum"],
        label: { text: "Emergent ray", sub: "bends twice — once per surface", at: [4.6, 2.8, 0], color: "#f87171" },
      },
      {
        shape: { kind: "tube", points: [[-6.4, -1.2, 0], [4.2, 1.4, 0]], radius: 0.02 },
        material: "emissive",
        color: 0x94a3b8,
        views: ["deviation"],
        label: { text: "Angle of deviation δ", sub: "the total turn of the ray", at: [0.4, -3.2, 0], color: "#cbd5e1" },
      },
      {
        shape: { kind: "tube", points: [[-6.4, -1.2, 0], [-0.4, 1.6, 0], [4.4, 1.4, 0]], radius: 0.035 },
        material: "emissive",
        color: 0x22c55e,
        views: ["minimum"],
        label: { text: "Minimum deviation (i = e)", sub: "inside the glass the ray runs parallel to the base", at: [4.8, 3.4, 0], color: "#4ade80" },
      },
      {
        shape: { kind: "disc", r: 1.2 },
        at: [0.4, -0.2, 1.7],
        rot: [0, 0, 0.6],
        material: "emissive",
        color: 0xec4899,
        views: ["minimum"],
        label: { text: "Dispersion", sub: "μ varies with λ, so colours leave at different angles", at: [-3.6, 3.2, 0], color: "#f472b6" },
      },
      {
        shape: { kind: "plane", w: 6, h: 4 },
        at: [3.4, 0, 1.8],
        material: "wax",
        color: 0xfffbeb,
        views: ["external", "rays"],
        label: { text: "Screen", sub: "the emergent beam is read here", at: [4.4, -2.6, 0], color: "#fde68a" },
      },
    ],
    views: [
      {
        id: "external",
        label: "Prism (real)",
        hint: "The glass body with its refracting angle A.",
        rows: [
          { name: "Refracting angle A", fn: "The angle between the two surfaces the light crosses — usually 60°.", why: "A appears in both the prism relation and the minimum-deviation formula." },
          { name: "Refracting surfaces", fn: "The ray bends once at each surface, always toward the normal on entry.", why: "Two bendings — not one — is the point students miss." },
          { name: "Base", fn: "The face the ray bends away from.", why: "Explains why the deviation is always toward the base." },
        ],
      },
      {
        id: "rays",
        label: "Ray through the prism",
        hint: "Refraction at both faces with the emergent ray drawn.",
        rows: [
          { name: "Angle of incidence i", fn: "At the first surface, measured from the normal.", why: "The first of the two refractions." },
          { name: "Prism relation", fn: "A = r₁ + r₂ and δ = i + e − A.", why: "Both relations are needed for a full numerical." },
          { name: "Emergent angle e", fn: "The angle at which the ray leaves the second face.", why: "Symmetry with i is the key to minimum deviation." },
        ],
      },
      {
        id: "deviation",
        label: "Deviation",
        hint: "How far the ray has turned from its original direction.",
        shell: "ghost",
        rows: [
          { name: "Angle of deviation δ", fn: "δ = i + e − A for any path.", why: "The general formula, valid at every incidence." },
          { name: "Variation with i", fn: "δ falls to a minimum and then rises again.", why: "The δ–i graph is a standard question with a defined minimum." },
        ],
      },
      {
        id: "minimum",
        label: "Minimum deviation",
        hint: "The symmetric passage and the refractive index it yields.",
        shell: "ghost",
        rows: [
          { name: "Symmetric condition", fn: "i = e and r₁ = r₂ = A/2.", why: "This is why the ray inside runs parallel to the base." },
          { name: "Refractive index", fn: "μ = sin((A + δ_m)/2) / sin(A/2).", why: "The single most quoted prism formula." },
          { name: "Dispersion", fn: "Because μ depends on wavelength, white light separates.", why: "Links the prism to the spectrum and the rainbow." },
        ],
      },
    ],
    theory: {
      look: "A triangular glass prism with a yellow ray entering one face, running through the glass and leaving the other face in red, and a dashed grey line showing the original direction so the angle of deviation reads directly. In the minimum-deviation view the ray inside runs parallel to the base.",
      principle: "Light crossing the first surface of a prism bends toward the normal and crossing the second bends away, so the ray is turned through a total deviation δ = i + e − A, with A = r₁ + r₂. As the angle of incidence varies, δ passes through a minimum; at that setting the path is symmetric, i = e and r₁ = r₂ = A/2, which gives the working formula μ = sin((A + δ_m)/2)/sin(A/2). Because μ depends on wavelength, different colours deviate differently.",
      why: "The two prism relations, the symmetric condition at minimum deviation, the refractive-index formula, and the reason a prism disperses white light are the four standard marks.",
    },
  },

  /* ── Wave optics ── */
  "ph-3d-wave-suite": {
    studio: "Wave optics — interference and diffraction",
    blurb: "Two coherent sources with real wavefronts, Young's double-slit geometry with the fringe condition, and the single-slit diffraction envelope that explains the missing orders.",
    defaultView: "external",
    parts: [
      {
        shape: { kind: "box", size: [0.6, 5, 8] },
        at: [-4, 0, 0],
        material: "metal",
        color: 0x64748b,
        views: ["external", "interference", "young", "diffraction"],
        label: { text: "Barrier", sub: "opaque screen with one or two fine slits", at: [-4, 4.0, 0], color: "#cbd5e1" },
      },
      {
        shape: { kind: "sphere", r: 0.22 },
        at: [-4, 1.4, 0],
        material: "emissive",
        color: 0xfacc15,
        views: ["external", "interference", "young"],
        label: { text: "Slit S₁", sub: "coherent source — same phase as S₂", at: [-4, 5.4, 0], color: "#fde047" },
      },
      {
        shape: { kind: "sphere", r: 0.22 },
        at: [-4, -1.4, 0],
        material: "emissive",
        color: 0x22d3ee,
        views: ["external", "interference", "young"],
        label: { text: "Slit S₂", sub: "coherent source", at: [-4, -3.6, 0], color: "#67e8f9" },
      },
      {
        shape: { kind: "sphere", r: 1.1 },
        at: [-7, 0, 0],
        material: "emissive",
        color: 0xfbbf24,
        views: ["interference", "young"],
        label: { text: "Monochromatic source", sub: "single wavelength λ — needed for sharp fringes", at: [-9.6, 1.8, 0], color: "#fbbf24" },
      },
      {
        shape: { kind: "plane", w: 7, h: 9 },
        at: [4, 0, 0],
        rot: [0, -Math.PI / 2, 0],
        material: "wax",
        color: 0x0f172a,
        views: ["external", "young", "diffraction"],
        label: { text: "Screen", sub: "fringes are counted here", at: [4, 5.0, 0], color: "#e2e8f0" },
      },
      {
        shape: { kind: "tube", points: [[-4, 0, 0], [4, 0, 0]], radius: 0.02 },
        material: "emissive",
        color: 0x475569,
        views: ["young"],
        label: { text: "Central axis (n = 0)", sub: "path difference zero ⇒ always a bright fringe", at: [1.0, 1.6, 0], color: "#94a3b8" },
      },
      {
        shape: { kind: "sphere", r: 0.14 },
        at: [-2.4, 0.9, 0],
        material: "emissive",
        color: 0x22c55e,
        views: ["young"],
        repeat: { count: 9, spread: [0, 5.0, 0] },
        label: { text: "Bright fringes", sub: "path difference = nλ", at: [1.6, -3.4, 0], color: "#4ade80" },
      },
      {
        shape: { kind: "sphere", r: 0.1 },
        at: [0.4, 0.9, 0],
        material: "emissive",
        color: 0xec4899,
        views: ["diffraction"],
        repeat: { count: 8, spread: [0, 5.0, 0] },
        label: { text: "Single-slit minima", sub: "a sin θ = nλ — not the same condition as interference", at: [2.0, -3.6, 0], color: "#f472b6" },
      },
    ],
    views: [
      {
        id: "external",
        label: "Set-up (real)",
        hint: "Source, barrier and screen in their real geometry.",
        rows: [
          { name: "Monochromatic source", fn: "One wavelength, so fringes have one spacing.", why: "White light would overlap the orders — a standard comparison question." },
          { name: "Coherent slits", fn: "Same frequency and a constant phase difference.", why: "Coherence is the condition for a stationary pattern." },
          { name: "Screen", fn: "Where the intensity pattern is observed.", why: "Fringe width is defined on this plane." },
        ],
      },
      {
        id: "interference",
        label: "Interference",
        hint: "Constructive and destructive superposition.",
        rows: [
          { name: "Constructive", fn: "Path difference = nλ gives a bright fringe.", why: "The condition with the integer n must be stated exactly." },
          { name: "Destructive", fn: "Path difference = (2n − 1)λ/2 gives a dark fringe.", why: "The odd multiple is the half-mark that is usually lost." },
          { name: "Intensity", fn: "I ∝ cos²(φ/2) for equal sources.", why: "Explains why fringes fade rather than switch off." },
        ],
      },
      {
        id: "young",
        label: "Young's double slit",
        hint: "The fringe width relation and its scaling.",
        rows: [
          { name: "Fringe width", fn: "β = λD/d.", why: "The single formula the numerical almost always needs." },
          { name: "Dependence", fn: "β grows with λ and D, and shrinks with slit separation d.", why: "Direction questions follow from the same formula." },
          { name: "Central fringe", fn: "Always bright and white for white light.", why: "A neat distinguishing observation." },
        ],
      },
      {
        id: "diffraction",
        label: "Single-slit diffraction",
        hint: "The envelope that modulates the interference fringes.",
        shell: "ghost",
        rows: [
          { name: "Minima condition", fn: "a sin θ = nλ for a slit of width a.", why: "Confusing this with the interference condition loses the question." },
          { name: "Central maximum", fn: "Twice as wide as the other maxima and the brightest.", why: "A much-asked qualitative point." },
          { name: "Missing orders", fn: "Where the envelope minimum falls on an interference maximum, that order is absent.", why: "The capstone of the double-slit-plus-diffraction question." },
        ],
      },
    ],
    theory: {
      look: "A slit barrier with two bright sources behind a single lamp, a screen ahead, and the central axis ruled between them. The interference view lays bright and dark fringes on the screen; the diffraction view replaces them with the wide central maximum and its narrowing side maxima.",
      principle: "Two coherent sources superpose: where the path difference is a whole number of wavelengths the waves arrive in phase and reinforce, and where it is an odd half-multiple they cancel. On a screen a distance D away, slits d apart produce equally spaced fringes of width β = λD/d. A single slit of width a instead spreads light by diffraction with minima at a sin θ = nλ, and that envelope is what removes particular interference orders.",
      why: "The integer and odd-multiple conditions, the fringe-width formula and its scaling, the difference between the interference and diffraction conditions, and the missing-order argument are the marks this model separates.",
    },
  },
};
