"use client";

import React from "react";
import type { SceneTier, SubjectName } from "./types";

type PostEffectsProps = {
  tier: SceneTier;
  subject?: SubjectName;
  reducedMotion: boolean;
};

/**
 * Tier-based post-processing stack.
 *
 * ⚠️ CURRENT STATE — intentionally a no-op:
 * drei 10.7.8 no longer wraps @react-three/postprocessing (no EffectComposer /
 * Bloom / Vignette / FXAA / SSAO exports), and @react-three/postprocessing is
 * not installed in this project. The spec forbids adding new 3D/post-processing
 * dependencies ("unless a sub-dependency of drei"), so this component degrades
 * gracefully to `null` — identical to the previous runtime behaviour, where the
 * dynamic `require()` failed silently and effects never rendered.
 *
 * When @react-three/postprocessing becomes available, restore the tier stack:
 *
 *   import { EffectComposer, Bloom, Vignette, FXAA, SSAO } from "@react-three/postprocessing";
 *
 *   if (tier === "low") return null;
 *   const baseBloom = tier === "high" ? 0.6 : 0.3;
 *   return (
 *     <EffectComposer multisampling={0} enableNormalPass={false}>
 *       <FXAA />
 *       <Bloom intensity={reducedMotion ? baseBloom / 2 : baseBloom}
 *              luminanceThreshold={tier === "high" ? 0.85 : 0.9}
 *              luminanceSmoothing={0.9} mipmapBlur />
 *       {tier === "high" && <SSAO intensity={0.4} luminanceInfluence={0.6}
 *              radius={0.05} scale={0.5} bias={0.0005} />}
 *       <Vignette eskil={false} offset={tier === "high" ? 0.35 : 0.3}
 *                 darkness={tier === "high" ? 0.45 : 0.35} />
 *     </EffectComposer>
 *   );
 */
export function PostEffects(_props: PostEffectsProps): null {
  return null;
}

export default PostEffects;


