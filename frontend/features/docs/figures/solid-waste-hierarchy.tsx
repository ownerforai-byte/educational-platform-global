/** Solid waste management hierarchy — reduce first, landfill last. Well-detailed. Theme-aware. */
export function SolidWasteHierarchy({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Solid waste management hierarchy reduce reuse recycle compost incinerate landfill pyramid most preferred least preferred waste stream Nepal plastic bag ban composting organic fraction">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The waste hierarchy — best option on top</text>
      {/* inverted pyramid */}
      <rect x="30" y="44" width="360" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      {[
        ["Reduce", "buy less — the only zero-impact option", 220, "rgb(22 163 74)"],
        ["Reuse", "repair, refill, re-home", 250, "rgb(16 185 129)"],
        ["Recycle", "reprocess materials — saves energy vs virgin", 280, "rgb(2 132 199)"],
        ["Compost", "organic fraction becomes soil, not methane", 310, "rgb(132 204 22)"],
        ["Incinerate", "energy recovery, but air cost", 340, "rgb(217 119 6)"],
        ["Landfill", "last resort — leaks methane and leachate", 360, "rgb(244 63 94)"],
      ].map(([name, detail, w, rgb], i) => {
        const y = 66 + i * 30;
        const width = w as number;
        return (
          <g key={name as string}>
            <rect x={240 - width / 2} y={y} width={width} height="22" rx="6" className="fill-current" style={{ color: `${rgb as string} / 0.35` }} stroke="currentColor" strokeWidth="1.3" />
            <text x="240" y={y + 15} fontSize="6.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">{name as string}</text>
            <text x="404" y={y + 15} fontSize="5.8" className="fill-current text-muted-foreground">{detail as string}</text>
          </g>
        );
      })}
      {/* facts */}
      <rect x="420" y="44" width="270" height="216" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="555" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE NEPAL ANGLE</text>
      {[
        "over half of urban waste is",
        "  organic — composting is the",
        "  biggest single win",
        "plastic bag bans exist but",
        "  enforcement wavers",
        "landfills like Banchare Danda",
        "  buy time, not solutions",
        "scavengers already run an",
        "  informal recycling economy",
        "the hierarchy inverts only when",
        "  policy and habit both shift",
      ].map((t, i) => (
        <text key={t} x="436" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-emerald-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">
        Exam hook: reduce {'>'} reuse {'>'} recycle {'>'} compost {'>'} incinerate {'>'} landfill — the order IS the answer.
      </text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Recycling saves the material; reducing never spends it.</text>
    </svg>
  );
}
