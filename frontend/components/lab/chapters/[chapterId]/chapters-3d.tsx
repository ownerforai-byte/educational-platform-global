"use client";

import Shared3DScene from "@/components/lab/shared-3d-scene";

export default function Chapter3DComponent() {
  return (
    <Shared3DScene
      particleColor="#f97316"
      coreColor="#f97316"
      emissiveColor="#ea580c"
      wireframeColor="#fb923c"
      orbitColors={["#fbbf24", "#34d399", "#f97316"]}
      bgGradient="bg-gradient-to-br from-slate-950 via-slate-900 to-orange-950/40"
      particleCount={60}
    />
  );
}

