/** Grazing vs detritus chains — two energy highways. Well-detailed. Theme-aware. */
export function FoodChainTypes({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Grazing food chain versus detritus food chain grass deer tiger dead leaves earthworm fungi energy highways trophic comparison">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Two food chains, two energy highways</text>

      {/* grazing chain */}
      <rect x="30" y="44" width="660" height="108" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="46" y="66" fontSize="9" className="fill-current text-foreground" fontWeight="800">GRAZING CHAIN — starts with a living plant</text>
      {["grass", "deer", "tiger"].map((t, i) => (
        <g key={t}>
          <rect x={60 + i * 210} y="80" width="130" height="44" rx="8" className="fill-current text-emerald-600/20" stroke="currentColor" strokeWidth="1.8" style={{ color: "rgb(5 122 85 / 0.9)" }} />
          <text x={125 + i * 210} y="106" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">{t}</text>
          {i < 2 && <line x1={190 + i * 210} y1="102" x2={250 + i * 210} y2="102" className="stroke-current text-emerald-700" strokeWidth="2.2" style={{ color: "rgb(5 122 85 / 0.9)" }} markerEnd="url(#arrhl)" />}
        </g>
      ))}
      <text x="360" y="142" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">producer → herbivore → carnivore; energy from living tissue</text>

      {/* detritus chain */}
      <rect x="30" y="164" width="660" height="108" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="46" y="186" fontSize="9" className="fill-current text-foreground" fontWeight="800">DETRITUS CHAIN — starts with dead matter</text>
      {["leaf litter", "earthworm", "fungi"].map((t, i) => (
        <g key={t}>
          <rect x={60 + i * 210} y="200" width="130" height="44" rx="8" className="fill-current text-amber-600/20" stroke="currentColor" strokeWidth="1.8" style={{ color: "rgb(180 130 40 / 0.9)" }} />
          <text x={125 + i * 210} y="226" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">{t}</text>
          {i < 2 && <line x1={190 + i * 210} y1="222" x2={250 + i * 210} y2="222" className="stroke-current text-amber-700" strokeWidth="2.2" style={{ color: "rgb(180 130 40 / 0.9)" }} markerEnd="url(#arrhl)" />}
        </g>
      ))}
      <text x="360" y="262" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">detritus → decomposer → predator; energy from dead tissue — and it recycles nutrients the grazing chain forgot</text>
    </svg>
  );
}
