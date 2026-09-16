import { describe, expect, it } from "vitest";
import * as THREE from "three";
import {
  createAnimatedArrow,
  LiveArrow,
} from "@/components/lab/animated-arrow-helper";

/**
 * Regression guard for the reported crash:
 *
 *   TypeError: Cannot read properties of undefined (reading 'copy')
 *
 * `THREE.ArrowHelper`'s constructor calls `this.setDirection(dir)` *before* the
 * subclass's own class fields are installed (ES2022 class-field semantics, see
 * `tsconfig.target`). During that boot call `this.baseDir` is still `undefined`,
 * so `LiveArrow.setDirection` must guard the baseline write. Without the guard,
 * every topic visual that builds a `LiveArrow` crashes on mount and the page
 * falls through to `app/error.tsx` ("Something went wrong!").
 *
 * These tests fail if the guard is removed.
 */

type LiveArrowInternals = {
  baseDir: THREE.Vector3;
  baseLength: number;
  baseHeadLength: number;
  baseHeadWidth: number;
  particles: THREE.Mesh[];
};

const internals = (arrow: LiveArrow) => arrow as unknown as LiveArrowInternals;

const DIR = new THREE.Vector3(1, 0, 0);
const ORIGIN = new THREE.Vector3(0, 0, 0);

function makeArrow(length = 2) {
  return new LiveArrow(DIR.clone(), ORIGIN.clone(), length, 0xff0000);
}

describe("LiveArrow", () => {
  it("constructs without throwing (regression: boot-time setDirection)", () => {
    expect(() => makeArrow()).not.toThrow();
  });

  it("seeds the direction baseline after the boot call", () => {
    const { baseDir } = internals(makeArrow());
    expect(baseDir.x).toBeCloseTo(1);
    expect(baseDir.y).toBeCloseTo(0);
    expect(baseDir.z).toBeCloseTo(0);
  });

  it("positions the arrow at the requested origin", () => {
    const arrow = new LiveArrow(DIR.clone(), new THREE.Vector3(1, 2, 3), 2, 0xff0000);
    expect(arrow.position.toArray()).toEqual([1, 2, 3]);
  });

  it("keeps the baseline in sync when setDirection runs after boot", () => {
    const arrow = makeArrow();
    expect(() => arrow.setDirection(new THREE.Vector3(0, 1, 0))).not.toThrow();
    expect(internals(arrow).baseDir.y).toBeCloseTo(1);
  });

  it("animates in onBeforeRender without throwing", () => {
    const arrow = makeArrow();
    const render = arrow.onBeforeRender as unknown as () => void;
    expect(() => render()).not.toThrow();
  });

  it("tracks new geometry when setLength is called", () => {
    const arrow = makeArrow();
    arrow.setLength(4, 0.5, 0.25);
    const state = internals(arrow);
    expect(state.baseLength).toBe(4);
    expect(state.baseHeadLength).toBe(0.5);
    expect(state.baseHeadWidth).toBe(0.25);
  });

  it("disposes without throwing and releases its particles", () => {
    const arrow = makeArrow();
    expect(() => arrow.dispose()).not.toThrow();
    expect(internals(arrow).particles).toHaveLength(0);
  });
});

describe("createAnimatedArrow", () => {
  it("returns a populated group positioned at the origin", () => {
    const arrow = createAnimatedArrow(ORIGIN.clone(), DIR.clone(), 2, 0x3b82f6);
    expect(arrow.group).toBeInstanceOf(THREE.Group);
    expect(arrow.group.position.toArray()).toEqual([0, 0, 0]);
    expect(arrow.group.children.length).toBeGreaterThan(0);
  });

  it("updates and disposes without throwing", () => {
    const arrow = createAnimatedArrow(ORIGIN.clone(), DIR.clone(), 2, 0x3b82f6);
    expect(() => arrow.update(1)).not.toThrow();
    expect(() => arrow.dispose()).not.toThrow();
  });
});
