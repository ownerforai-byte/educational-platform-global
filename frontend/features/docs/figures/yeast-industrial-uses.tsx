/** Yeast industrial uses — bread to biofuel. Well-detailed. Theme-aware. */
export function YeastIndustrialUses({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Yeast industrial uses bread rising carbon dioxide alcohol brewing wine distillation biofuel ethanol single cell protein probiotics nutritional yeast industries chart">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">One fungus, six industries</text>

      {[
        { x: 105, t: "BAKING", s: "CO₂ bubbles raise\ndough; ethanol bakes off", c: "rgb(245 158 11 / 0.9)" },
        { x: 285, t: "BREWING", s: "beer: maltose →\nethanol + CO₂", c: "rgb(245 158 11 / 0.9)" },
        { x: 465, t: "WINE", s: "grape sugars fermented\non the skins", c: "rgb(139 92 246 / 0.9)" },
        { x: 645, t: "BIOFUEL", s: "industrial ethanol\nfrom crop residues", c: "rgb(22 163 74 / 0.9)" },
      ].map((p) => (
        <g key={p.t}>
          <rect x={p.x - 80} y="44" width="160" height="100" rx="12" style={{ color: p.c }} className="fill-current opacity-10" strokeWidth="2.5" stroke="currentColor" />
          <text x={p.x} y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{p.t}</text>
          {p.s.split("\n").map((line, li) => (
            <text key={line} x={p.x} y={88 + li * 16} fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">{line}</text>
          ))}
        </g>
      ))}

      {/* more uses */}
      <rect x="30" y="164" width="320" height="120" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="50" y="188" fontSize="8.4" className="fill-current text-foreground" fontWeight="700">MORE USES</text>
      {[
        "single-cell protein (SCP) for feed",
        "probiotics and nutritional yeast (B vitamins)",
        "laboratory workhorse of genetics",
      ].map((t, i) => (
        <text key={t} x="50" y={210 + i * 20} fontSize="7.4" className="fill-current text-muted-foreground">• {t}</text>
      ))}

      <rect x="370" y="164" width="320" height="120" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <text x="390" y="188" fontSize="8.4" className="fill-current text-foreground" fontWeight="700">WHY YEAST IS PERFECT FOR THE JOB</text>
      {[
        "grows fast on cheap sugar",
        "tolerates its own ethanol waste",
        "facultative anaerobe — works with or",
        "without oxygen (Pasteur effect)",
      ].map((t, i) => (
        <text key={t} x="390" y={210 + i * 20} fontSize="7.4" className="fill-current text-muted-foreground">• {t}</text>
      ))}
    </svg>
  );
}
