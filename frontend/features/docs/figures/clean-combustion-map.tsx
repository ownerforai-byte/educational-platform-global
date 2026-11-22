// Clean combustion product comparison. Theme-aware.
export function CleanCombustionMap({ className }: { className?: string }) {
  const fuels: [string, string[], string][] = [
    ["hydrogen", ["H₂O only"], "rgb(16 185 129)"],
    ["petrol", ["CO₂", "CO", "SO₂", "particulates"], "rgb(239 68 68)"],
    ["coal", ["CO₂", "SO₂", "ash"], "rgb(148 163 184)"],
  ];
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Exhaust products of hydrogen, petrol and coal showing hydrogen yields only water">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">What each fuel leaves behind</text>
      {fuels.map(([f, prods, c], i) => (
        <g key={i}>
          <text x="60" y={70 + i * 52} fontSize="12.5" fontWeight="800" textAnchor="end" className="fill-current text-foreground">{f}</text>
          {prods.map((p, j) => (
            <rect key={j} x={80 + j * 90} y={52 + i * 52} width={80} height="28" rx="14" className="fill-current" style={{ color: c }} opacity="0.25" />
          ))}
          {prods.map((p, j) => (
            <text key={j} x={120 + j * 90} y={70 + i * 52} fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">{p}</text>
          ))}
        </g>
      ))}
      <text x="330" y="222" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">One column of steam versus a cocktail of pollutants - the clean-fuel case in one picture</text>
    </svg>
  );
}
