/**
 * Abiotic factors — light, temperature, water, soil, air and their
 * effects on organisms. Theme-aware via currentColor.
 */
export function AbioticFactors({ className }: { className?: string }) {
  const f = (x: number, y: number, c: string, t: string, s: string, k: string) => (
    <g key={k}>
      <rect x={x} y={y} width="190" height="74" rx="10" style={{ color: c }} className="fill-current opacity-10" strokeWidth="2.5" stroke="currentColor" />
      <text x={x + 12} y={y + 22} fontSize="10.5" className="fill-current text-foreground" fontWeight="800">{t}</text>
      <text x={x + 12} y={y + 40} fontSize="8.5" className="fill-current text-muted-foreground">{s}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 660 300" className={className} role="img" aria-label="Six abiotic factors light temperature water soil air and fire with their ecological effects on organisms">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Abiotic factors — the non-living stage of life</text>
      {f(16, 50, "rgb(245 158 11 / 0.9)", "☀ Light", "drives photosynthesis; day length triggers flowering, migration", "a")}
      {f(222, 50, "rgb(239 68 68 / 0.9)", "🌡 Temperature", "sets metabolic rate; enzymes work in narrow ranges", "b")}
      {f(428, 50, "rgb(14 165 233 / 0.9)", "💧 Water", "medium of life; rainfall decides biome type", "c")}
      {f(16, 150, "rgb(120 113 108 / 0.9)", "🪨 Soil", "texture, pH and minerals anchor plants and detritus food chains", "d")}
      {f(222, 150, "rgb(148 163 184 / 0.9)", "🌬 Air", "CO₂ for photosynthesis, O₂ for respiration, wind dispersal", "e")}
      {f(428, 150, "rgb(217 119 6 / 0.9)", "🔥 Fire & disturbances", "resets succession; some seeds need fire to open", "f")}
      <text x="16" y="262" fontSize="10" className="fill-current text-muted-foreground">Each factor has a tolerance range: below the minimum or above the maximum the organism fails (law of limiting factors — Liebig).</text>
      <text x="16" y="280" fontSize="10" className="fill-current text-muted-foreground">Ecosystem = community (biotic) + these factors (abiotic) locked in exchange of energy and matter.</text>
    </svg>
  );
}
