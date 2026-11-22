// HNO3 use map. Theme-aware.
export function Hno3UseMap({ className }: { className?: string }) {
  const uses: [string, string, string][] = [
    ["fertilisers", "ammonium nitrate, urea route via NH₃", "rgb(16 185 129)"],
    ["explosives", "TNT, nitroglycerine, ammonium nitrate", "rgb(239 68 68)"],
    ["nylon precursors", "adipic acid chain", "rgb(59 130 246)"],
    ["pickling / reagent", "metal surface cleaning, lab oxidant", "rgb(245 158 11)"],
  ];
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Four uses of nitric acid in fertilisers explosives nylon and metal pickling">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Where the +5 state goes to work</text>
      {uses.map(([u, s, c], i) => (
        <g key={i}>
          <rect x="40" y={46 + i * 48} width="580" height="40" rx="9" className="fill-current" style={{ color: c }} opacity="0.14" />
          <text x="58" y={63 + i * 48} fontSize="12.5" fontWeight="800" className="fill-current text-foreground">{u}</text>
          <text x="58" y={81 + i * 48} fontSize="10.5" className="fill-current text-muted-foreground">{s}</text>
        </g>
      ))}
      <text x="330" y="248" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Feeding crops and, unfortunately, feeding wars — the double life of nitrate</text>
    </svg>
  );
}
