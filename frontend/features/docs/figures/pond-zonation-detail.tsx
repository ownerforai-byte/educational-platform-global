/** Pond zonation detail — littoral to benthic. Well-detailed. Theme-aware. */
export function PondZonationDetail({ className }: { className?: string }) {
  const zones: [string, string, string][] = [
    ["Littoral", "shallow edge — light reaches the bottom", "rooted plants, frogs, snails"],
    ["Limnetic", "open water, well-lit surface layer", "phytoplankton, fish"],
    ["Profundal", "deep water below light penetration", "few animals, low oxygen"],
    ["Benthic", "the bottom itself — mud and ooze", "bacteria, worms, decomposers"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Pond zonation littoral limnetic profundal benthic zones light penetration depth organisms distribution cross section">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Pond zones — light decides who lives where</text>

      {/* pond profile */}
      <rect x="30" y="44" width="660" height="220" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      {/* depth bands */}
      <rect x="50" y="70" width="560" height="50" rx="6" className="fill-current text-sky-300/20" />
      <rect x="50" y="120" width="560" height="60" rx="6" className="fill-current text-sky-500/20" />
      <rect x="50" y="180" width="560" height="60" rx="6" className="fill-current text-sky-700/25" />
      <rect x="50" y="240" width="560" height="12" rx="4" className="fill-current text-stone-600/40" />
      {/* light rays */}
      {[100, 180, 260, 340, 420, 500].map((x, i) => (
        <line key={i} x1={x} y1="70" x2={x - 6} y2={90 + i * 22} className="stroke-current text-amber-400/50" strokeWidth="1.6" />
      ))}
      <text x="620" y="90" fontSize="6.6" className="fill-current text-amber-600">light fades</text>
      <text x="620" y="104" fontSize="6.6" className="fill-current text-amber-600">with depth</text>

      {/* zone labels */}
      {zones.map(([name, detail, ex], i) => (
        <g key={name}>
          <text x="66" y={92 + i * 44} fontSize="8" className="fill-current text-foreground" fontWeight="800">{name}</text>
          <text x="140" y={92 + i * 44} fontSize="7" className="fill-current text-muted-foreground">{detail}</text>
          <text x="470" y={92 + i * 44} fontSize="6.8" className="fill-current text-sky-600">{ex}</text>
        </g>
      ))}
      <text x="66" y="258" fontSize="6.8" className="fill-current text-muted-foreground">Shallow edge = richest life; the dark deep and the mud below run on falling scraps.</text>
    </svg>
  );
}
