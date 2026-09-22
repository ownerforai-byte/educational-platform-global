/**
 * Lab Studios — registry.
 *
 * One spec per 3D lab, keyed by the lab's registry id. A lab with an entry
 * gets the shared studio section rendered below its original component; a lab
 * without one is simply left alone (no placeholder, no empty shell).
 *
 * Adding a studio is therefore two lines of plumbing plus the spec:
 * author it in the matching specs-* file and it appears on its lab page.
 */

import type { StudioSpec } from "./types";
import { PHYSICS_MECHANICS } from "./specs-physics-mechanics";
import { PHYSICS_OPTICS } from "./specs-physics-optics";
import { PHYSICS_EM } from "./specs-physics-em";
import { BIOLOGY_A } from "./specs-biology-a";
import { PHYSICS_B } from "./specs-physics-b";
import { PHYSICS_C } from "./specs-physics-c";
import { CHEMISTRY } from "./specs-chemistry";
import { BIOLOGY_B } from "./specs-biology-b";
import { MATHEMATICS } from "./specs-math";
import { SUITES } from "./specs-suites";
import { SUITES_B } from "./specs-suites-b";
import { SUITES_C } from "./specs-suites-c";

export const LAB_STUDIOS: Record<string, StudioSpec> = {
  ...PHYSICS_MECHANICS,
  ...PHYSICS_OPTICS,
  ...PHYSICS_EM,
  ...BIOLOGY_A,
  ...PHYSICS_B,
  ...PHYSICS_C,
  ...CHEMISTRY,
  ...BIOLOGY_B,
  ...MATHEMATICS,
  ...SUITES,
  ...SUITES_B,
  ...SUITES_C,
};

export function getLabStudio(labId: string | undefined): StudioSpec | undefined {
  if (!labId) return undefined;
  return LAB_STUDIOS[labId];
}

export function hasLabStudio(labId: string | undefined): boolean {
  return !!getLabStudio(labId);
}

export function studioCount(): number {
  return Object.keys(LAB_STUDIOS).length;
}

export type { StudioSpec } from "./types";
