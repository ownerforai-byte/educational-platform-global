// Bond composition audit: sigma and pi counts per bond order. Theme-aware.
export function BondCompositionAudit({ className }: { className?: string }) {
  const rows: [string, string, string, string][] = [
    ["Single  C-C", "1", "0", "1 pair total"],
    ["Double  C=C", "1", "1", "2 pairs total"],
    ["Triple  C=C", "1", "2", "3 pairs total"],
    ["N2", "1", "2", "3 pairs total"],
  ];
  return (
    <svg viewBox="0 0 640 300" className={className} role="img" aria-label="Bond composition audit table counting sigma and pi bonds in single double triple and nitrogen triple bond">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Audit every bond: sigma first, pi on top</text>
      <text x="230" y="54" fontSize="11" className="fill-current text-foreground" fontWeight="800">sigma</text>
      <text x="330" y="54" fontSize="11" className="fill-current text-foreground" fontWeight="800">pi</text>
      <text x="440" y="54" fontSize="11" className="fill-current text-foreground" fontWeight="800">total</text>
      {rows.map(([bond, s, p, tot], i) => (
        <g key={i}>
          <rect x="24" y={66 + i * 54} width="592" height="44" rx="8" className="fill-current" opacity="0.05" />
          <text x="40" y={94 + i * 54} fontSize="12.5" className="fill-current text-foreground" fontWeight="700">{bond}</text>
          <text x="230" y={94 + i * 54} fontSize="12" className="fill-current text-foreground" fontWeight="800">{s}</text>
          <text x="330" y={94 + i * 54} fontSize="12" className="fill-current text-foreground" fontWeight="800">{p}</text>
          <text x="440" y={94 + i * 54} fontSize="11" className="fill-current text-muted-foreground">{tot}</text>
        </g>
      ))}
      <text x="320" y="288" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">The first bond between any two atoms is always sigma - pi only rides on top</text>
    </svg>
  );
}
