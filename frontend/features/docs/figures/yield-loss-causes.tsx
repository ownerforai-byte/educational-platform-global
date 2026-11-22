// Causes of yield loss. Theme-aware.
export function YieldLossCauses({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 210" className={className} role="img" aria-label="Causes of yield loss side reactions reversible reactions mechanical transfer losses purification losses recrystallisation">
      <text x="16" y="22" fontSize="14" className="fill-current text-foreground" fontWeight="800">Where the missing product goes</text>
      {[
        ["Side reactions", "some reactant makes a by-product instead"],
        ["Reversibility", "equilibrium stops short of completion"],
        ["Mechanical loss", "transfer between vessels, spills, filter paper"],
        ["Purification loss", "recrystallisation keeps product in the mother liquor"],
      ].map(([t, d], i) => (
        <g key={t}>
          <rect x={30 + (i % 2) * 340} y={40 + Math.floor(i / 2) * 62} width="320" height="54" rx="10" className="fill-current text-rose-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(244 63 94 / 0.85)" }} />
          <text x={46 + (i % 2) * 340} y={62 + Math.floor(i / 2) * 62} fontSize="9.5" className="fill-current text-rose-500" fontWeight="800">{t}</text>
          <text x={46 + (i % 2) * 340} y={82 + Math.floor(i / 2) * 62} fontSize="7.8" className="fill-current text-muted-foreground">{d}</text>
        </g>
      ))}
      <rect x="30" y="172" width="660" height="28" rx="8" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="190" fontSize="7.8" textAnchor="middle" className="fill-current text-muted-foreground">Naming two causes + one remedy (e.g. wash with cold solvent, use a fume-free closed transfer) is a complete 3m answer.</text>
    </svg>
  );
}
