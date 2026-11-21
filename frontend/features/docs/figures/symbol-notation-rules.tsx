// Systematic symbol notation rules. Theme-aware.
export function SymbolNotationRules({ className }: { className?: string }) {
  const rows: [string, string, string][] = [
    ["Build the symbol", "first letters of the roots, capitalised", "un + nil + quad → Unq"],
    ["Three letters always", "two-letter symbols are reserved for permanent names", "Uub, Uuo — never two letters"],
    ["Retirement", "once confirmed, the temporary name and symbol die", "Unq → Rf (rutherfordium)"],
  ];
  return (
    <svg viewBox="0 0 720 230" className={className} role="img" aria-label="Systematic symbol notation rules three letter symbols from root initials capitalised temporary until IUPAC confirmation with unnilquadium to rutherfordium example">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">From name to symbol — the notation rules</text>
      {rows.map(([rule, detail, ex], i) => (
        <g key={rule}>
          <rect x="30" y={40 + i * 48} width="660" height="42" rx="9" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(14 165 233 / 0.85)" }} />
          <text x="46" y={60 + i * 48} fontSize="9.5" className="fill-current text-sky-600" fontWeight="800">{rule}</text>
          <text x="46" y={76 + i * 48} fontSize="8.2" className="fill-current text-muted-foreground">{detail}</text>
          <text x="674" y={60 + i * 48} fontSize="9" textAnchor="end" className="fill-current text-foreground" fontWeight="700">{ex}</text>
        </g>
      ))}
      <rect x="30" y="196" width="660" height="24" rx="8" className="fill-current text-amber-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="212" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Worked pair: Z = 107 → un + nil + sept + ium = unnilseptium, symbol Uns → confirmed as bohrium (Bh).</text>
    </svg>
  );
}
