// Contact process condition choices. Theme-aware.
export function ContactProcessPanel({ className }: { className?: string }) {
  const rows: [string, string, string][] = [
    ["excess air (O2)", "adding a reactant pushes forward - cheap SO3 gain", "rgb(16 185 129)"],
    ["pressure ~1 atm", "3 -> 2 moles favours forward, but gain is small at 1 atm", "rgb(148 163 184)"],
    ["T ~ 450 C", "exothermic compromise: yield vs rate, V2O5 catalyst", "rgb(245 158 11)"],
    ["SO3 absorbed in H2SO4", "product removal drags the equilibrium forward", "rgb(14 165 233)"],
  ];
  return (
    <svg viewBox="0 0 660 280" className={className} role="img" aria-label="Contact process conditions explained by Le Chatelier: excess air, atmospheric pressure, moderate temperature and sulfur trioxide removal">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Contact process: 2SO2 + O2 ⇌ 2SO3</text>
      {rows.map(([t, s, c], i) => (
        <g key={i}>
          <rect x="40" y={46 + i * 52} width="580" height="42" rx="9" className="fill-current" style={{ color: c }} opacity="0.14" />
          <text x="58" y={64 + i * 52} fontSize="12.5" fontWeight="800" className="fill-current text-foreground">{t}</text>
          <text x="58" y={82 + i * 52} fontSize="10.5" className="fill-current text-muted-foreground">{s}</text>
        </g>
      ))}
      <text x="330" y="270" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Same principle as Haber - tuned by economics, not just chemistry</text>
    </svg>
  );
}
