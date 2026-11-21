/** Monocot vs dicot — full-body comparison. Well-detailed. Theme-aware. */
export function MonocotVsDicotFull({ className }: { className?: string }) {
  const rows: [string, string, string][] = [
    ["Seed", "one cotyledon", "two cotyledons"],
    ["Root", "fibrous cluster", "tap root + laterals"],
    ["Leaf veins", "parallel", "reticulate net"],
    ["Flower parts", "in threes (trimerous)", "in fours or fives"],
    ["Stem bundles", "scattered", "in a ring"],
    ["Examples", "maize, wheat, onion", "gram, pea, mango"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Monocot versus dicot full comparison cotyledons fibrous tap root parallel reticulate venation trimerous vascular bundles scattered ring examples">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Monocot vs dicot — every organ agrees</text>

      {/* monocot plant */}
      <rect x="30" y="44" width="150" height="150" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="105" y="64" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">MONOCOT</text>
      {[-2, -1, 0, 1, 2].map((k) => (
        <path key={k} d={`M105 150 q${k * 10} -30 ${k * 16} -44`} className="fill-none stroke-current text-sky-600" strokeWidth="2.6" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      ))}
      <path d="M105 150 q-18 10 -26 18 M105 150 q18 10 26 18 M105 150 v22" className="fill-none stroke-current text-sky-700" strokeWidth="2" />
      <text x="105" y="184" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">parallel leaves, fibrous roots</text>

      {/* dicot plant */}
      <rect x="540" y="44" width="150" height="150" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="615" y="64" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">DICOT</text>
      <rect x="611" y="112" width="8" height="40" rx="3" className="fill-current text-emerald-700/40" />
      <ellipse cx="596" cy="108" rx="14" ry="8" className="fill-current text-emerald-600/40" />
      <ellipse cx="634" cy="104" rx="14" ry="8" className="fill-current text-emerald-600/40" />
      <path d="M615 152 q-16 16 -26 20 M615 152 q16 16 26 20 M615 152 v22" className="fill-none stroke-current text-emerald-800" strokeWidth="2.4" style={{ color: "rgb(6 46 27 / 0.9)" }} />
      <text x="615" y="184" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">net leaves, tap root</text>

      {/* VS */}
      <circle cx="360" cy="120" r="18" className="fill-current text-foreground/10" stroke="currentColor" strokeWidth="2" />
      <text x="360" y="125" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">VS</text>

      {/* table */}
      <rect x="30" y="208" width="660" height="80" rx="10" className="fill-current text-violet-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="46" y="226" fontSize="8.2" className="fill-current text-foreground" fontWeight="700">Feature</text>
      <text x="220" y="226" fontSize="8.2" className="fill-current text-sky-600" fontWeight="700">Monocot</text>
      <text x="470" y="226" fontSize="8.2" className="fill-current text-emerald-600" fontWeight="700">Dicot</text>
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
