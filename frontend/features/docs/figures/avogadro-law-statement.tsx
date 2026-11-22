// Avogadro's law statement and deduction. Theme-aware.
export function AvogadroLawStatement({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 210" className={className} role="img" aria-label="Avogadro law equal volumes equal molecules at same temperature pressure with V proportional to n deduction">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">The law and its first deduction</text>
      <rect x="30" y="42" width="660" height="54" rx="10" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="66" fontSize="10.5" textAnchor="middle" className="fill-current text-sky-600" fontWeight="800">Equal volumes of all gases at the same T and P contain equal numbers of molecules.</text>
      <text x="360" y="86" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">the identity of the gas is irrelevant — volume counts molecules, not mass</text>
      <rect x="30" y="108" width="320" height="46" rx="10" className="fill-current text-emerald-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="190" y="128" fontSize="9.5" textAnchor="middle" className="fill-current text-emerald-600" fontWeight="800">V ∝ n (T, P fixed)</text>
      <text x="190" y="146" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">double the molecules, double the volume</text>
      <rect x="370" y="108" width="320" height="46" rx="10" className="fill-current text-violet-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="530" y="128" fontSize="9.5" textAnchor="middle" className="fill-current text-violet-600" fontWeight="800">Consequence: molar volume</text>
      <text x="530" y="146" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">1 mol of any gas at STP occupies 22.4 L</text>
      <rect x="30" y="166" width="660" height="34" rx="8" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="184" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Contrast to hold: hydrogen (2 g/mol) and oxygen (32 g/mol) fill the same 22.4 L at STP — mass differs 16×, molecule count is identical.</text>
      <text x="360" y="194" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">This single sentence dissolves the density paradox Gay-Lussac's data created.</text>
    </svg>
  );
}
