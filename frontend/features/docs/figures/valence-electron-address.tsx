// Valence shell and valence electrons for sodium and chlorine. Theme-aware.
export function ValenceElectronAddress({ className }: { className?: string }) {
  const rows: [string, string, string, string][] = [
    ["Na", "2, 8, 1", "outer shell = 3s1", "1 valence electron - gives it away"],
    ["Cl", "2, 8, 7", "outer shell = 3s2 3p5", "7 valence electrons - takes one more"],
  ];
  return (
    <svg viewBox="0 0 680 220" className={className} role="img" aria-label="Valence electron addresses of sodium and chlorine with shell configuration and outer shell subshell labels">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Reading the valence shell</text>
      {rows.map(([sym, shells, sub, note], i) => (
        <g key={sym}>
          <rect x="24" y={46 + i * 76} width="632" height="64" rx="10" className="fill-current" style={{ color: "rgb(14 165 233)" }} opacity="0.08" />
          <rect x="24" y={46 + i * 76} width="632" height="64" rx="10" fill="none" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="62" cy={78 + i * 76} r="20" className="fill-current" style={{ color: "rgb(245 158 11)" }} opacity="0.25" />
          <text x="62" y={84 + i * 76} fontSize="15" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{sym}</text>
          <text x="100" y={72 + i * 76} fontSize="13" className="fill-current text-foreground" fontWeight="700">{shells}</text>
          <text x="100" y={96 + i * 76} fontSize="11" className="fill-current text-muted-foreground">{sub}</text>
          <text x="330" y={84 + i * 76} fontSize="12" className="fill-current text-foreground">{note}</text>
        </g>
      ))}
      <text x="340" y="210" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Only the outermost shell takes part in bonding - core electrons stay home</text>
    </svg>
  );
}
