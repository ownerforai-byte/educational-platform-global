export function MpLadderSolids({ className }: { className?: string }) {
  const rows = [
    { s: "I2 (molecular)", mp: "114 C", w: 25 },
    { s: "Cu (metallic)", mp: "1083 C", w: 90 },
    { s: "NaCl (ionic)", mp: "801 C", w: 70 },
    { s: "MgO (ionic)", mp: "2852 C", w: 170 },
    { s: "Diamond (network)", mp: "~3550 C", w: 200 },
  ];
  return (
    <svg viewBox="0 0 560 240" role="img" aria-label="Melting point ladder across solid types" className={className}>
      <text x="280" y="22" textAnchor="middle" fontSize="15" fontWeight="700" fill="currentColor">Melting Points Rank the Bonding</text>
      {rows.map((r, i) => (
        <g key={i} transform={`translate(40, ${42 + i * 36})`}>
          <text x="0" y="15" fontSize="11" fontWeight="600" fill="currentColor">{r.s}</text>
          <rect x="170" y="3" width={r.w} height="16" rx="4" className="fill-current opacity-25" />
          <text x="390" y="16" fontSize="10.5" fill="currentColor">{r.mp}</text>
        </g>
      ))}
      <text x="280" y="228" textAnchor="middle" fontSize="10.5" className="fill-current opacity-70">Weakest glue melts first: molecular &lt; metallic/ionic &lt; covalent network</text>
    </svg>
  );
}
