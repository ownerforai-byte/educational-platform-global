/** Abiogenesis biogenesis contrast — the two positions. Well-detailed. Theme-aware. */
export function AbiogenesisBiogenesisContrast({ className }: { className?: string }) {
  const rows: [string, string, string][] = [
    ["Claim", "life arises from non-life, repeatedly", "life comes only from existing life"],
    ["Champion", "Aristotle's era; early belief in maggots", "Redi, Spallanzani, Pasteur"],
    ["Test", "meat left in the open grows maggots?", "sealed / swan-neck flask broth stays sterile"],
    ["Verdict", "disproved — microbes enter from air", "confirmed — biogenesis won"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Abiogenesis versus biogenesis contrast spontaneous generation Pasteur swan neck Redi experiment verdict comparison table origin of life debate">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Abiogenesis vs biogenesis — the settled debate</text>
      <rect x="30" y="40" width="200" height="30" rx="8" className="fill-current text-slate-500/15" strokeWidth="1.6" stroke="currentColor" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <text x="130" y="60" fontSize="8" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">ASPECT</text>
      <rect x="230" y="40" width="220" height="30" rx="8" className="fill-current text-rose-500/10" strokeWidth="1.6" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="340" y="60" fontSize="8" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">ABIOGENESIS (spontaneous)</text>
      <rect x="450" y="40" width="240" height="30" rx="8" className="fill-current text-emerald-500/10" strokeWidth="1.6" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="570" y="60" fontSize="8" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">BIOGENESIS</text>
      {rows.map(([a, b, c], i) => {
        const y = 78 + i * 44;
        return (
          <g key={a}>
            <text x="46" y={y + 18} fontSize="7.4" className="fill-current text-foreground" fontWeight="700">{a}</text>
            <text x="244" y={y + 12} fontSize="6.8" className="fill-current text-muted-foreground">{b.slice(0, 40)}</text>
            {b.length > 40 && <text x="244" y={y + 25} fontSize="6.8" className="fill-current text-muted-foreground">{b.slice(40, 80)}</text>}
            <text x="464" y={y + 12} fontSize="6.8" className="fill-current text-muted-foreground">{c.slice(0, 42)}</text>
            {c.length > 42 && <text x="464" y={y + 25} fontSize="6.8" className="fill-current text-muted-foreground">{c.slice(42, 84)}</text>}
          </g>
        );
      })}
      <rect x="30" y="258" width="660" height="34" rx="8" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="272" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">The modern synthesis: biogenesis is true today — but chemical evolution (abiogenesis) happened once, under the early Earth's reducing atmosphere.</text>
      <text x="360" y="286" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: Pasteur's swan-neck flask disproved spontaneous generation — name the bend and what settled in it.</text>
    </svg>
  );
}
