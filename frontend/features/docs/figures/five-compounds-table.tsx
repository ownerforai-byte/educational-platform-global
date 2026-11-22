// FiveCompoundsTable figure. Theme-aware.
export function FiveCompoundsTable({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Formula and use table for quick lime bleaching powder plaster of Paris magnesia and Epsom salt">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Five compounds, five formulae, five jobs</text>
      <line x1="40" y1="50" x2="620" y2="50" stroke="currentColor" strokeWidth="1" className="text-muted-foreground" />
      {[["COMPOUND", "FORMULA", "USE"],
        ["Quick lime", "CaO", "cement, flux, carbide"],
        ["Bleaching powder", "Ca(OCl)Cl", "bleach cotton/linen, disinfect"],
        ["Plaster of Paris", "CaSO₄·½H₂O", "casts, moulds, dentistry"],
        ["Magnesia", "MgO", "refractory lining, antacid"],
        ["Epsom salt", "MgSO₄·7H₂O", "purgative, Mg–S fertiliser"]].map((row, i) => (
        <g key={i}>
          {[0, 1, 2].map((c) => (
            <text key={c} x={45 + [0, 200, 390][c]} y={72 + i * 28} fontSize={i ? "11" : "10.5"} fontWeight={i ? (c ? "400" : "700") : "800"} className={i ? "fill-current text-foreground" : "fill-current text-muted-foreground"}>{row[c]}</text>
          ))}
          <line x1="40" y1={80 + i * 28} x2="620" y2={80 + i * 28} stroke="currentColor" strokeWidth="0.5" className="text-muted-foreground" opacity="0.4" />
        </g>
      ))}
      <text x="330" y="226" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">Write the formula exactly — CaSO₄·½H₂O is a hemihydrate, not a hydrate</text>
    </svg>
  );
}
