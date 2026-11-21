/** Protected area categories — five kinds of in-situ. Well-detailed. Theme-aware. */
export function ProtectedAreaCategories({ className }: { className?: string }) {
  const cats: [string, string, string][] = [
    ["National park", "full ecosystem protection; no hunting", "Chitwan, Sagarmatha"],
    ["Wildlife reserve", "protects a specific species' habitat", "Koshi Tappu (arna)"],
    ["Conservation area", "communities co-manage the landscape", "Annapurna ACAP"],
    ["Hunting reserve", "regulated hunting of surplus game", "Dhorpatan (blue sheep)"],
    ["Ramsar site", "wetland of international importance", "Koshi Tappu, Rara"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Protected area categories national park wildlife reserve conservation area hunting reserve Ramsar wetland Nepal definitions examples in-situ">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Five kinds of in-situ protected area</text>
      {cats.map(([name, rule, ex], i) => {
        const y = 44 + i * 44;
        return (
          <g key={name}>
            <rect x="30" y={y} width="660" height="36" rx="8" className="fill-current text-emerald-500/10" strokeWidth="1.8" stroke="currentColor" style={{ color: `rgb(16 185 129 / ${0.9 - i * 0.08})` }} />
            <text x="46" y={y + 23} fontSize="8" className="fill-current text-foreground" fontWeight="800">{i + 1}. {name}</text>
            <text x="230" y={y + 23} fontSize="7.2" className="fill-current text-muted-foreground">{rule}</text>
            <text x="500" y={y + 23} fontSize="7.2" className="fill-current text-emerald-600">{ex}</text>
          </g>
        );
      })}
      <rect x="30" y="266" width="660" height="26" rx="8" className="fill-current text-emerald-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="283" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">All five keep species inside their habitat — the definition of in-situ; the differences are in rules, managers and targets.</text>
    </svg>
  );
}
