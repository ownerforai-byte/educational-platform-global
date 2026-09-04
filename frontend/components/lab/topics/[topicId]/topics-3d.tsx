"use client";

import Shared3DScene from "@/components/lab/shared-3d-scene";

export default function Topic3DComponent() {
  return (
    <Shared3DScene
      particleColor="#3b82f6"
      coreColor="#3b82f6"
      emissiveColor="#2563eb"
      wireframeColor="#60a5fa"
      orbitColors={["#a78bfa", "#f472b6", "#2dd4bf"]}
      bgGradient="bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950/40"
      particleCount={60}
    />
  );
}

