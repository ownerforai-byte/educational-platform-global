/** Lichen vs moss — two rock colonisers compared. Well-detailed. Theme-aware. */
export function LichenVsMoss({ className }: { className?: string }) {
  const rows: [string, string, string][] = [
    ["Body", "two partners (fungus + alga)", "a true green plant"],
    ["Food", "alga photosynthesises inside", "own chlorophyll, leaves"],
    ["Roots", "rhizines — grip only", "rhizoids — grip only"],
    ["Water", "soaks it, tolerates drying out", "needs damp shade"],
    ["Growth", "extremely slow (mm per year)", "faster, forms cushions"],
    ["First on", "bare rock, deserts, arctic", "after lichen, thin soil forms"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Lichen versus moss comparison symbiosis versus true plant bare rock coloniser damp shade rhizines rhizoids succession order">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Lichen vs moss — who arrives first?</text>

      {/* lichen on rock */}
      <rect x="30" y="44" width="150" height="150" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="105" y="64" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">LICHEN</text>
      <ellipse cx="105" cy="120" rx="46" ry="30" className="fill-current text-slate-400/30" stroke="currentColor" strokeWidth="2" strokeDasharray="5 3" style={{ color: "rgb(148 163 184 / 0.9)" }} />
      <ellipse cx="105" cy="120" rx="24" ry="14" className="fill-current text-lime-500/30" />
      <text x="105" y="184" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">flat crust on bare rock</text>

      {/* moss tuft */}
      <rect x="540" y="44" width="150" height="150" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="615" y="64" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">MOSS</text>
      {[[595, 170], [605, 164], [615, 160], [625, 164], [635, 170]].map(([x, y], i) => (
        <path key={i} d={`M${x} ${y} q${i - 2} -34 ${(i - 2) * 2} -44`} className="fill-none stroke-current text-emerald-600" strokeWidth="2.4" style={{ color: "rgb(5 122 85 / 0.9)" }} />
      ))}
      <text x="615" y="184" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">green cushion on thin soil</text>

      {/* VS */}
      <circle cx="360" cy="120" r="18" className="fill-current text-foreground/10" stroke="currentColor" strokeWidth="2" />
      <text x="360" y="125" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">VS</text>

      {/* table */}
      <rect x="30" y="208" width="660" height="80" rx="10" className="fill-current text-violet-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="46" y="226" fontSize="8.2" className="fill-current text-foreground" fontWeight="700">Feature</text>
      <text x="220" y="226" fontSize="8.2" className="fill-current text-sky-600" fontWeight="700">Lichen</text>
      <text x="470" y="226" fontSize="8.2" className="fill-current text-emerald-600" fontWeight="700">Moss</text>
      {rows.map(([f, a, b], i) => (
        <g key={f}>
          <text x="46" y={244 + i * 7.6} fontSize="6.4" className="fill-current text-muted-foreground">{f}</text>
          <text x="220" y={244 + i * 7.6} fontSize="6.4" className="fill-current text-muted-foreground">{a}</text>
          <text x="470" y={244 + i * 7.6} fontSize="6.4" className="fill-current text-muted-foreground">{b}</text>
        </g>
      ))}
    </svg>
  );
}
