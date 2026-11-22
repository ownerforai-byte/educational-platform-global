// ChlorAlkaliCell figure. Theme-aware.
export function ChlorAlkaliCell({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Chlor alkali brine electrolysis cell producing sodium hydroxide chlorine and hydrogen">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Chlor-alkali — three products, one current</text>
      <rect x="150" y="55" width="360" height="120" rx="10" fill="rgb(59 130 246)" opacity="0.08" stroke="rgb(59 130 246)" strokeWidth="2" />
      <text x="330" y="76" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">concentrated brine · diaphragm/membrane divides the cell</text>
      <line x1="330" y1="62" x2="330" y2="168" stroke="rgb(148 163 184)" strokeWidth="2" strokeDasharray="5 4" />
      <text x="240" y="100" fontSize="10.5" fontWeight="800" fill="rgb(59 130 246)" textAnchor="middle">CATHODE (steel)</text>
      <text x="240" y="122" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">2H₂O + 2e⁻ → H₂↑ + 2OH⁻</text>
      <text x="240" y="144" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">NaOH accumulates here</text>
      <text x="422" y="100" fontSize="10.5" fontWeight="800" fill="rgb(16 185 129)" textAnchor="middle">ANODE (graphite/Ti)</text>
      <text x="422" y="122" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">2Cl⁻ → Cl₂↑ + 2e⁻</text>
      <text x="422" y="144" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">kept off the OH⁻ side</text>
      <text x="330" y="200" fontSize="10.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">2NaCl + 2H₂O → 2NaOH + H₂↑ + Cl₂↑</text>
      <text x="330" y="220" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">A paper boom raises chlorine prices — the two are chained by this cell</text>
    </svg>
  );
}
