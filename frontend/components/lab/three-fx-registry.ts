"use client";

/**
 * Tiny element-keyed registry so imperative three.js scenes can publish
 * effects (wireframe, intro replay) to VizToolbar WITHOUT every one of the
 * ~160 scene files wiring the props through by hand. three-scene.ts registers
 * both its container and its canvas; the toolbar looks up by walking the DOM
 * from whatever element the scene already exposed. Deliberately free of any
 * `three` import so 2D consumers of viz-toolbar never pull WebGL into the bundle.
 */
export interface SceneFx {
  setWireframe: (on: boolean) => void;
  replayIntro: () => void;
}

const registry = new WeakMap<Element, SceneFx>();

export function registerSceneFx(el: Element, fx: SceneFx) {
  registry.set(el, fx);
}

/** Walk up from `el` (inclusive) to find the nearest registered scene. */
export function lookupSceneFx(el: Element | null | undefined): SceneFx | null {
  for (let cur = el ?? null; cur; cur = cur.parentElement) {
    const hit = registry.get(cur);
    if (hit) return hit;
  }
  return null;
}
