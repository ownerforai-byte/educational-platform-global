// Cation and anion formation. Theme-aware.
export function IonFormationPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 210" className={className} role="img" aria-label="Ion formation sodium loses one electron becoming cation plus one chlorine gains one electron becoming anion minus one octet drive">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Ions — atoms that gained or lost electrons</text>
      <rect x="30" y="44" width="320" height="100" rx="10" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="190" y="66" fontSize="9.5" textAnchor="middle" className="fill-current text-sky-600" fontWeight="800">Cation — electron lost</text>
      <text x="190" y="90" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">Na (2,8,1) → Na⁺ (2,8) + e⁻</text>
      <text x="190" y="112" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">metals lose; positive; smaller than the atom</text>
      <text x="190" y="130" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">octet reached by emptying the outer shell</text>
      <rect x="370" y="44" width="320" height="100" rx="10" className="fill-current text-rose-500/10" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="530" y="66" fontSize="9.5" textAnchor="middle" className="fill-current text-rose-500" fontWeight="800">Anion — electron gained</text>
      <text x="530" y="90" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">Cl (2,8,7) + e⁻ → Cl⁻ (2,8,8)</text>
      <text x="530" y="112" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">non-metals gain; negative; larger than the atom</text>
      <text x="530" y="130" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">octet reached by filling the outer shell</text>
      <rect x="30" y="158" width="660" height="42" rx="8" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="176" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">Both products are isoelectronic with neon (2,8) — same electron count, different proton count, different size.</text>
      <text x="360" y="192" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Radicals like SO₄²⁻ are charged groups that already travel as ions in solution.</text>
    </svg>
  );
}
