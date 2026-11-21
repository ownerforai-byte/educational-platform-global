/** Pond vs forest contrast — two model ecosystems side by side. Well-detailed. Theme-aware. */
export function PondForestContrast({ className }: { className?: string }) {
  const rows: [string, string, string][] = [
    ["Main producers", "algae + floating plants", "trees + shrubs"],
    ["Structure", "zones by depth", "layers by height"],
    ["Herbivores", "zooplankton, snails", "deer, insects, birds"],
    ["Carnivores", "fish, dragonfly nymphs", "tigers, hawks, snakes"],
    ["Limiting factor", "light with depth", "water and light with height"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Pond versus forest ecosystem comparison producers structure herbivores carnivores limiting factors table contrast">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Pond vs forest — same functions, different players</text>
      {/* header */}
      <rect x="30" y="44" width="180" height="30" rx="6" className="fill-current text-sky-500/20" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="120" y="64" fontSize="8" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">Feature</text>
      <rect x="215" y="44" width="235" height="30" rx="6" className="fill-current text-sky-500/20" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="332" y="64" fontSize="8" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">Pond ecosystem</text>
      <rect x="455" y="44" width="235" height="30" rx="6" className="fill-current text-emerald-500/20" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="572" y="64" fontSize="8" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">Forest ecosystem</text>
      {rows.map(([f, p, fo], i) => {
        const y = 82 + i * 36;
        return (
          <g key={f}>
            <rect x="30" y={y} width="660" height="30" rx="6" className="fill-current text-slate-500/5" stroke="currentColor" strokeWidth="1" style={{ color: "rgb(120 113 108 / 0.4)" }} />
            <text x="46" y={y + 20} fontSize="7.4" className="fill-current text-foreground" fontWeight="700">{f}</text>
            <text x="230" y={y + 20} fontSize="7.2" className="fill-current text-muted-foreground">{p}</text>
            <text x="470" y={y + 20} fontSize="7.2" className="fill-current text-muted-foreground">{fo}</text>
          </g>
        );
      })}
      <rect x="30" y="268" width="660" height="24" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="284" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Same three functional groups, same energy flow, same cycling — only the cast and the geometry change.</text>
    </svg>
  );
}
