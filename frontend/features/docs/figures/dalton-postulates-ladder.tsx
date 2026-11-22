// Dalton's five postulates. Theme-aware.
export function DaltonPostulatesLadder({ className }: { className?: string }) {
  const posts: [string, string][] = [
    ["Matter is made of tiny indivisible particles — atoms", "the founding claim"],
    ["Atoms of the same element are identical in mass & properties", "explains definite proportions"],
    ["Atoms of different elements differ in mass & properties", "explains why elements behave differently"],
    ["Compounds form when atoms combine in simple whole-number ratios", "the ratio idea behind formulae"],
    ["Atoms are only rearranged — never created or destroyed — in reactions", "the seed of conservation of mass"],
  ];
  return (
    <svg viewBox="0 0 720 250" className={className} role="img" aria-label="Dalton atomic theory five postulates ladder indivisibility identical atoms different atoms simple ratios rearrangement">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Dalton's five postulates (1803) — quote them in order</text>
      {posts.map(([t, note], i) => (
        <g key={t}>
          <circle cx="58" cy={50 + i * 38} r="13" className="fill-current text-sky-500/15" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(14 165 233 / 0.9)" }} />
          <text x="58" y={55 + i * 38} fontSize="10" textAnchor="middle" className="fill-current text-sky-600" fontWeight="800">{i + 1}</text>
          <text x="86" y={48 + i * 38} fontSize="8.8" className="fill-current text-foreground" fontWeight="700">{t.slice(0, 78)}</text>
          <text x="86" y={62 + i * 38} fontSize="7.4" className="fill-current text-muted-foreground">{note}</text>
        </g>
      ))}
      <rect x="30" y="232" width="660" height="12" rx="0" />
      <text x="360" y="244" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Each postulate exists to explain a stoichiometry law — that mapping is what 3m answers reward.</text>
    </svg>
  );
}
