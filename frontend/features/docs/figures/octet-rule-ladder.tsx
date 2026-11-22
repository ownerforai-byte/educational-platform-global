// Octet rule ladder: noble-gas electron targets. Theme-aware.
export function OctetRuleLadder({ className }: { className?: string }) {
  const rungs: [string, string, string][] = [
    ["He", "1s2", "2 electrons - duet complete"],
    ["Ne", "2, 8", "10 electrons - octet complete"],
    ["Ar", "2, 8, 8", "18 electrons - octet in outer shell"],
  ];
  return (
    <svg viewBox="0 0 640 300" className={className} role="img" aria-label="Octet rule ladder showing helium neon and argon noble gas electron configurations as stability targets for bonding atoms">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">The octet rule: atoms bond to copy a noble gas</text>
      {rungs.map(([sym, cfg, note], i) => (
        <g key={sym}>
          <rect x="40" y={52 + i * 78} width="560" height="64" rx="10" className="fill-current" style={{ color: "rgb(14 165 233)" }} opacity="0.10" />
          <rect x="40" y={52 + i * 78} width="560" height="64" rx="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="86" cy={84 + i * 78} r="20" className="fill-current" style={{ color: "rgb(16 185 129)" }} opacity="0.25" />
          <text x="86" y={90 + i * 78} fontSize="16" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{sym}</text>
          <text x="124" y={78 + i * 78} fontSize="14" className="fill-current text-foreground" fontWeight="700">{cfg}</text>
          <text x="124" y={100 + i * 78} fontSize="11" className="fill-current text-muted-foreground">{note}</text>
        </g>
      ))}
      <text x="320" y="290" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Kossel and Lewis, 1916: bonding drives atoms toward these stable outer shells</text>
    </svg>
  );
}
