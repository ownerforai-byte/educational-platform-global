/** Vegetation types summary table — six zones at a glance. Well-detailed. Theme-aware. */
export function VegetationTypesSummary({ className }: { className?: string }) {
  const zones: [string, string, string][] = [
    ["Tropical", "<1000 m", "sal, sissoo, tall grass"],
    ["Subtropical", "1000–2000 m", "chir pine, Schima"],
    ["Temperate", "2000–3000 m", "oak, fir, rhododendron"],
    ["Subalpine", "3000–4000 m", "birch, juniper, rhododendron scrub"],
    ["Alpine", "4000–5000 m", "meadows, cushion plants"],
    ["Nival", ">5000 m", "lichens, mosses only"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Vegetation types summary table six zones altitude dominant species Nepal tropical subtropical temperate subalpine alpine nival">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Six zones, one table — the revision card</text>
      <rect x="30" y="44" width="200" height="28" rx="6" className="fill-current text-sky-500/20" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="130" y="63" fontSize="7.8" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">Zone</text>
      <rect x="235" y="44" width="180" height="28" rx="6" className="fill-current text-sky-500/20" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="325" y="63" fontSize="7.8" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">Altitude</text>
      <rect x="420" y="44" width="270" height="28" rx="6" className="fill-current text-sky-500/20" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="555" y="63" fontSize="7.8" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">Dominant vegetation</text>
      {zones.map(([z, alt, dom], i) => {
        const y = 80 + i * 32;
        return (
          <g key={z}>
            <rect x="30" y={y} width="660" height="26" rx="5" className="fill-current text-slate-500/5" stroke="currentColor" strokeWidth="0.8" style={{ color: "rgb(120 113 108 / 0.35)" }} />
            <text x="46" y={y + 18} fontSize="7.6" className="fill-current text-foreground" fontWeight="700">{z}</text>
            <text x="250" y={y + 18} fontSize="7.4" className="fill-current text-sky-600">{alt}</text>
            <text x="436" y={y + 18} fontSize="7.4" className="fill-current text-muted-foreground">{dom}</text>
          </g>
        );
      })}
      <rect x="30" y="276" width="660" height="16" rx="6" className="fill-current text-emerald-500/10" strokeWidth="1.2" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="288" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Memorise zone + altitude + one species — that triple answers any vegetation-zone question.</text>
    </svg>
  );
}
