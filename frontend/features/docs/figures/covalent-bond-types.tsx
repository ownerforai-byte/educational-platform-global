// Single, double and triple covalent bonds with lengths and energies. Theme-aware.
export function CovalentBondTypes({ className }: { className?: string }) {
  const rows: [string, string, string, number][] = [
    ["Single  C-C", "1 shared pair", "154 pm, 348 kJ/mol", 1],
    ["Double  C=C", "2 shared pairs", "134 pm, 614 kJ/mol", 2],
    ["Triple  C=C", "3 shared pairs", "120 pm, 839 kJ/mol", 3],
  ];
  return (
    <svg viewBox="0 0 660 300" className={className} role="img" aria-label="Single double and triple covalent bonds between carbon atoms with bond lengths and bond energies showing more pairs means shorter stronger bonds">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">More shared pairs: shorter and stronger</text>
      {rows.map(([label, pairs, stats, n], i) => (
        <g key={i}>
          <text x="40" y={86 + i * 70} fontSize="13" className="fill-current text-foreground" fontWeight="800">{label}</text>
          <text x="40" y={106 + i * 70} fontSize="10.5" className="fill-current text-muted-foreground">{pairs}</text>
          <circle cx={330} cy={90 + i * 70} r="14" className="fill-current" opacity="0.15" />
          <circle cx={430} cy={90 + i * 70} r="14" className="fill-current" opacity="0.15" />
          <text x="330" y={94 + i * 70} fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">C</text>
          <text x="430" y={94 + i * 70} fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">C</text>
          {Array.from({ length: n }).map((_, k) => (
            <line key={k} x1="344" y1={90 + i * 70 + (k - (n - 1) / 2) * 7} x2="416" y2={90 + i * 70 + (k - (n - 1) / 2) * 7} stroke="currentColor" strokeWidth="2.5" />
          ))}
          <text x="480" y={94 + i * 70} fontSize="11" className="fill-current text-foreground">{stats}</text>
        </g>
      ))}
    </svg>
  );
}
