/** Algal habitats — fresh, marine, and extreme. Well-detailed. Theme-aware. */
export function AlgaeHabitatZones({ className }: { className?: string }) {
  const zones: [string, string, string, string][] = [
    ["FRESHWATER", "ponds, lakes, streams, wet walls", "Spirogyra, Chlamydomonas, Volvox", "rgb(22 163 74)"],
    ["MARINE", "seas — from rock pools to kelp forests", "Sargassum, Laminaria, Polysiphonia", "rgb(2 132 199)"],
    ["SPECIAL PLACES", "moist soil, tree trunks, hot springs, snow", "some algae even live inside other organisms", "rgb(139 92 246)"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Algae habitat zones freshwater ponds marine seas kelp moist soil tree trunks hot springs snow thallus simple body no true roots">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Where algae live — mostly water, everywhere water touches</text>
      {zones.map(([name, where, who, rgb], i) => {
        const y = 44 + i * 78;
        return (
          <g key={name}>
            <rect x="30" y={y} width="660" height="66" rx="10" className="fill-current text-slate-500/10" strokeWidth="2" stroke="currentColor" style={{ color: `${rgb} / 0.9` }} />
            <circle cx="66" cy={y + 33} r="16" className="fill-current" style={{ color: rgb, opacity: 0.35 }} />
            <text x="100" y={y + 24} fontSize="9.4" className="fill-current text-foreground" fontWeight="800">{name}</text>
            <text x="100" y={y + 42} fontSize="7.6" className="fill-current text-muted-foreground">{where}</text>
            <text x="100" y={y + 58} fontSize="7.6" className="fill-current" style={{ color: rgb }}>{who}</text>
          </g>
        );
      })}
      <rect x="30" y="274" width="660" height="18" rx="8" className="fill-current text-emerald-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="287" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Key idea: the thallus has no true roots, stems or leaves — every cell can absorb water, light and gases directly.</text>
    </svg>
  );
}
