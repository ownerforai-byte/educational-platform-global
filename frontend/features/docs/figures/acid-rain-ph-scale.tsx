/** Acid rain pH scale — from normal rain to vinegar. Well-detailed. Theme-aware. */
export function AcidRainPhScale({ className }: { className?: string }) {
  const points: [string, number, string][] = [
    ["pure water", 7, "neutral reference"],
    ["normal rain", 5.6, "slightly acidic (dissolved CO₂)"],
    ["acid rain", 4.2, "SO₂ + NOx acids dissolved"],
    ["lemon juice", 2.4, "for comparison"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Acid rain pH scale normal rain 5.6 acid rain 4 comparison lemon juice pure water 7 damage threshold effects">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Where acid rain sits on the pH scale</text>
      {/* scale bar */}
      <rect x="60" y="60" width="600" height="40" rx="8" className="fill-current text-rose-500/15" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="70" y="86" fontSize="9" className="fill-current text-rose-600" fontWeight="800">0 — acidic</text>
      <text x="640" y="86" fontSize="9" textAnchor="end" className="fill-current text-sky-600" fontWeight="800">14 — basic</text>
      {points.map(([name, ph, note], i) => {
        const x = 60 + ((7 - ph) / 7) * 580;
        return (
          <g key={name}>
            <line x1={x} y1="60" x2={x} y2="130" className="stroke-current text-stone-500" strokeWidth="1.6" strokeDasharray="4 3" />
            <circle cx={x} cy="60" r="6" className="fill-current text-rose-500" />
            <text x={x} y={152 + (i % 2) * 18} fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">{name} (pH {ph})</text>
            <text x={x} y={166 + (i % 2) * 18} fontSize="6.4" textAnchor="middle" className="fill-current text-muted-foreground">{note}</text>
          </g>
        );
      })}
      {/* effects strip */}
      <rect x="30" y="196" width="660" height="96" rx="10" className="fill-current text-amber-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="46" y="218" fontSize="8" className="fill-current text-foreground" fontWeight="800">What pH 4 does</text>
      {["• lakes drop below pH 5 → fish eggs fail", "• soil loses calcium, aluminium turns toxic to roots", "• marble and limestone statues dissolve (Taj Mahal concern)", "• needles yellow and forests thin at high altitude"].map((t, i) => (
        <text key={t} x={46 + (i % 2) * 330} y={240 + Math.floor(i / 2) * 18} fontSize="7.2" className="fill-current text-muted-foreground">{t}</text>
      ))}
      <text x="46" y="286" fontSize="7" className="fill-current text-amber-600">Exam hook: normal rain is already pH 5.6 (CO₂); acid rain means human SO₂/NOx pushing it lower.</text>
    </svg>
  );
}
