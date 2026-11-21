/** Whittaker's five kingdoms — chart with cell type, body organisation, nutrition. Theme-aware. */
export function FiveKingdomsChart({ className }: { className?: string }) {
  const kingdoms = [
    { t: "Monera", c: "rgb(14 165 233 / 0.9)", cells: "prokaryotic", body: "unicellular", nut: "auto/hetero" },
    { t: "Protista", c: "rgb(20 184 166 / 0.9)", cells: "eukaryotic", body: "unicellular", nut: "auto/hetero" },
    { t: "Fungi", c: "rgb(245 158 11 / 0.9)", cells: "eukaryotic", body: "multicellular/loose", nut: "absorption" },
    { t: "Plantae", c: "rgb(22 163 74 / 0.9)", cells: "eukaryotic", body: "multicellular/tissue", nut: "photosynthesis" },
    { t: "Animalia", c: "rgb(244 63 94 / 0.9)", cells: "eukaryotic", body: "multicellular/tissue", nut: "ingestion" },
  ];
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Whittaker five kingdom chart with monera protista fungi plantae animalia compared by cell type body organisation and nutrition">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Whittaker's five kingdoms (1969)</text>
      {kingdoms.map((k, i) => {
        const x = 20 + i * 128;
        return (
          <g key={k.t}>
            <rect x={x} y="50" width="116" height="150" rx="12" style={{ color: k.c }} className="fill-current opacity-10" strokeWidth="2.5" stroke="currentColor" />
            <text x={x + 58} y="74" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{k.t}</text>
            <text x={x + 58} y="100" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">{k.cells}</text>
            <text x={x + 58} y="120" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">{k.body}</text>
            <text x={x + 58} y="140" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">{k.nut}</text>
          </g>
        );
      })}
      <text x="16" y="224" fontSize="9" className="fill-current text-muted-foreground">Criteria Whittaker used: cell structure, body organisation, mode of nutrition — the three-kingdom sorting machine.</text>
    </svg>
  );
}
