// MacroVsMicroTable figure. Theme-aware.
export function MacroVsMicroTable({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Comparison of macro nutrients and micro nutrients by requirement and role">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Macro vs micro — quantity, not importance</text>
      <line x1="40" y1="50" x2="620" y2="50" stroke="currentColor" strokeWidth="1" className="text-muted-foreground" />
      {[["BASIS", "MACRO-NUTRIENTS", "MICRO-NUTRIENTS"],
        ["daily need", "> 100 mg/day", "< 100 mg/day"],
        ["members", "Ca, P, K, S, Na, Cl, Mg", "Fe, Zn, Cu, I, Co, Mn, Mo, Cr, Se, F"],
        ["typical role", "structure, bulk electrolytes", "catalysis, hormones"],
        ["deficiency e.g.", "hypocalcaemia, chlorosis", "anaemia, goitre, B₁₂ anaemia"]].map((row, i) => (
        <g key={i}>
          {[0, 1, 2].map((c) => (
            <text key={c} x={45 + [0, 165, 395][c]} y={72 + i * 30} fontSize={i ? "10" : "10"} fontWeight={i ? (c ? "400" : "700") : "800"} className={i ? "fill-current text-foreground" : "fill-current text-muted-foreground"}>{row[c]}</text>
          ))}
          <line x1="40" y1={80 + i * 30} x2="620" y2={80 + i * 30} stroke="currentColor" strokeWidth="0.5" className="text-muted-foreground" opacity="0.4" />
        </g>
      ))}
      <text x="330" y="216" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">A million-fold dose gap between the tiers — and both are compulsory</text>
    </svg>
  );
}
