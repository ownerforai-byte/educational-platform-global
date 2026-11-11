/**
 * Lab Studios — F: the physics syllabus suite.
 */

import type { StudioSpec } from "./types";

export const SUITES_C: Record<string, StudioSpec> = {
  "ph-3d-syllabus-suite": {
    studio: "Physics syllabus suite — the shared core",
    blurb: "Every scene in this suite is the same story at a different scale: a force law, an energy ledger, and a conservation rule tying them together.",
    defaultView: "core",
    parts: [
      {
        shape: { kind: "sphere", r: 0.5, noise: 0.04 },
        at: [-3.4, 0, 0],
        material: "metal",
        color: 0x64748b,
        motion: { kind: "flow", from: [-4.8, 0, 0], to: [3.4, 0, 0], speed: 0.4, count: 2 },
        views: ["core", "forces"],
        label: { text: "Body in motion", sub: "F = ma — the starting point of every unit", at: [-3.4, 2.8, 0], color: "#94a3b8" },
      },
      {
        shape: { kind: "tube", points: [[-3.4, 1.0, 0], [-1.8, 1.0, 0]], radius: 0.06, endRadius: 0.02 },
        material: "emissive",
        color: 0xef4444,
        views: ["forces"],
        label: { text: "Force → acceleration", sub: "same force, smaller mass, larger a", at: [-3.0, 3.4, 0], color: "#f87171" },
      },
      {
        shape: { kind: "sphere", r: 0.22 },
        at: [0, 2.0, 0],
        material: "emissive",
        color: 0x22c55e,
        views: ["core", "energy"],
        label: { text: "Energy ledger", sub: "KE = ½mv² ⇄ PE = mgh — trading forms, never vanishing", at: [0, 4.0, 0], color: "#4ade80" },
      },
      {
        shape: { kind: "plane", w: 5.4, h: 0.3 },
        at: [0, 0.6, 0],
        material: "stone",
        color: 0x1e293b,
        views: ["energy"],
        label: { text: "Surface", sub: "friction converts the difference to heat", at: [0, -1.8, 0], color: "#475569" },
      },
      {
        shape: { kind: "torus", r: 1.9, tube: 0.05 },
        at: [3.0, 0, 0],
        rot: [Math.PI / 2, 0, 0],
        material: "emissive",
        color: 0x38bdf8,
        views: ["core", "conservation"],
        label: { text: "Conservation ring", sub: "momentum, energy, charge — the bookkeeping that never fails", at: [3.0, 3.2, 0], color: "#7dd3fc" },
      },
      {
        shape: { kind: "cylinder", r1: 0.5, h: 1.6 },
        at: [3.0, -2.2, 0],
        material: "metal",
        color: 0xb45309,
        views: ["conservation"],
        label: { text: "Collision partners", sub: "momentum conserved even when energy is not", at: [3.0, -3.8, 0], color: "#f59e0b" },
      },
      {
        shape: { kind: "plane", w: 13, h: 7 },
        at: [0, -3.4, 0],
        rot: [-Math.PI / 2, 0, 0],
        material: "stone",
        color: 0x1e293b,
        views: ["core", "forces", "energy", "conservation"],
      },
    ],
    views: [
      {
        id: "core",
        label: "The shared core",
        hint: "Force, energy, conservation — every unit at once.",
        rows: [
          { name: "Force law", fn: "F = ma turns causes into motion.", why: "Every mechanics unit begins with a free-body diagram." },
          { name: "Energy ledger", fn: "KE ⇄ PE with friction collecting the remainder as heat.", why: "Solves what forces alone make tedious." },
          { name: "Conservation", fn: "The quantities that never change across the event.", why: "The deepest and most reusable rule in the syllabus." },
        ],
      },
      {
        id: "forces",
        label: "Forces",
        hint: "Newton's second law in place.",
        shell: "ghost",
        rows: [
          { name: "Second law", fn: "F = ma, vector sum of all forces.", why: "The equation every numerical is written from." },
          { name: "Third law pairs", fn: "Equal, opposite, on different bodies.", why: "Why momentum is conserved in collisions." },
          { name: "Friction", fn: "f = μN opposing relative motion.", why: "The standard force to resolve on inclines." },
        ],
      },
      {
        id: "energy",
        label: "Energy",
        hint: "The ledger across any event.",
        shell: "ghost",
        rows: [
          { name: "Kinetic & potential", fn: "½mv² and mgh as the two tradeable forms.", why: "Energy problems reduce to comparing endpoints." },
          { name: "Work", fn: "W = Fd cos θ transfers energy between forms.", why: "The cos θ sign decides gain or loss." },
          { name: "Dissipation", fn: "Friction converts ordered energy to heat.", why: "Why real machines never reach ideal efficiency." },
        ],
      },
      {
        id: "conservation",
        label: "Conservation laws",
        hint: "What stays constant through everything.",
        shell: "ghost",
        rows: [
          { name: "Momentum", fn: "Conserved in every collision, elastic or not.", why: "The universal collision equation." },
          { name: "Energy", fn: "Total energy conserved; mechanical energy only without friction.", why: "The distinction the numericals test." },
          { name: "Charge", fn: "Conserved in every electrical process.", why: "Kirchhoff's junction rule is this law in circuit form." },
        ],
      },
    ],
    theory: {
      look: "A grey body sliding along a dark bench, a red force arrow, a green energy marker above a stone surface, and a blue conservation ring circling amber collision partners.",
      principle: "The physics syllabus suite repeats one story at every scale: forces cause acceleration through F = ma, energy trades between kinetic and potential forms with friction collecting the difference as heat, and certain quantities — momentum, total energy, charge — remain conserved through every process. Solve with forces when the path matters, with energy when only the endpoints do, and with conservation when the event itself is what's unknown.",
      why: "The free-body discipline, the energy-ledger strategy, the mechanical-versus-total energy distinction, and conservation as the universal fallback are the exact marks.",
    },
  },
};
