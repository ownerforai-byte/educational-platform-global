// Formal charge worked drill on ozone. Theme-aware.
export function FormalChargeDrill({ className }: { className?: string }) {
  const rows: [string, string, string][] = [
    ["Central O", "FC = 1 - 1 - 1 = ... wait, recount", "1 - (1 lone pair) - (3 bonds / 2) = 1 - 2 + 1.5 ... use: V - N - B/2"],
    ["Central O", "V=6, N=2, B=3", "FC = 6 - 2 - 1.5 = +1"],
    ["Double-bond O", "V=6, N=4, B=2", "FC = 6 - 4 - 1 = 0"],
    ["Single-bond O", "V=6, N=6, B=1", "FC = 6 - 6 - 0.5 = -1"],
  ];
  return (
    <svg viewBox="0 0 700 300" className={className} role="img" aria-label="Formal charge calculation table for ozone using the formula formal charge equals valence minus nonbonding minus half bonding electrons">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Formal charge drill: ozone, O3</text>
      <text x="20" y="52" fontSize="12" className="fill-current text-foreground" fontWeight="700">FC = V - N - B/2   (V valence, N nonbonding, B bonding electrons)</text>
      {rows.map(([atom, given, calc], i) => (
        <g key={i}>
          <rect x="24" y={70 + i * 54} width="652" height="46" rx="8" className="fill-current" style={{ color: "rgb(14 165 233)" }} opacity="0.08" />
          <rect x="24" y={70 + i * 54} width="652" height="46" rx="8" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <text x="40" y={90 + i * 54} fontSize="12" className="fill-current text-foreground" fontWeight="800">{atom}</text>
          <text x="180" y={90 + i * 54} fontSize="11" className="fill-current text-muted-foreground">{given}</text>
          <text x="480" y={90 + i * 54} fontSize="11.5" className="fill-current text-foreground" fontWeight="700">{calc}</text>
        </g>
      ))}
      <text x="350" y="290" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Sum of formal charges = 0 for O3 - the structure is charge-consistent</text>
    </svg>
  );
}
