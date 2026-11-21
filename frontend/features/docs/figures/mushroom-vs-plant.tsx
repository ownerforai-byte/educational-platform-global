/** Mushroom vs plant — why fungi are not plants. Well-detailed. Theme-aware. */
export function MushroomVsPlant({ className }: { className?: string }) {
  const rows: [string, string, string][] = [
    ["Food", "makes its own (photosynthesis)", "absorbs from outside (saprophytic)"],
    ["Cell wall", "cellulose", "chitin"],
    ["Stored food", "starch", "glycogen + oil"],
    ["Chlorophyll", "present", "absent"],
    ["Body", "root–stem–leaf organs", "mycelium of hyphae"],
    ["Reproduction", "seeds, flowers", "spores"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Mushroom versus plant comparison fungi are not plants chitin wall no chlorophyll glycogen storage saprophytic absorption mycelium hyphae spores cellulose starch photosynthesis">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Why a mushroom is NOT a plant</text>

      {/* mushroom side */}
      <rect x="30" y="44" width="150" height="150" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="105" y="64" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">FUNGUS</text>
      <path d="M65 100 q40 -30 80 0 q-16 8 -40 8 q-24 0 -40 -8" className="fill-current text-amber-600/30" stroke="currentColor" strokeWidth="2.5" style={{ color: "rgb(180 130 40 / 0.9)" }} />
      <rect x="101" y="106" width="8" height="44" rx="4" className="fill-current text-stone-300/50" />
      <path d="M75 160 q30 14 60 0" className="fill-none stroke-current text-amber-600" strokeWidth="2" strokeDasharray="3 3" />
      <text x="105" y="184" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">mycelium threads below</text>

      {/* plant side */}
      <rect x="540" y="44" width="150" height="150" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="615" y="64" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">PLANT</text>
      <rect x="611" y="120" width="8" height="46" rx="3" className="fill-current text-emerald-600/40" />
      <ellipse cx="596" cy="116" rx="14" ry="8" className="fill-current text-emerald-600/40" />
      <ellipse cx="634" cy="112" rx="14" ry="8" className="fill-current text-emerald-600/40" />
      <path d="M615 166 q-16 18 -24 20 M615 166 q16 18 24 20 M615 166 v22" className="fill-none stroke-current text-emerald-700" strokeWidth="2" />
      <text x="615" y="184" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">roots, stem, leaves</text>

      {/* VS */}
      <circle cx="360" cy="120" r="18" className="fill-current text-foreground/10" stroke="currentColor" strokeWidth="2" />
      <text x="360" y="125" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">VS</text>

      {/* table */}
      <rect x="30" y="208" width="660" height="80" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="46" y="228" fontSize="8.4" className="fill-current text-foreground" fontWeight="700">Feature</text>
      <text x="230" y="228" fontSize="8.4" className="fill-current text-amber-600" fontWeight="700">Fungus</text>
      <text x="480" y="228" fontSize="8.4" className="fill-current text-emerald-600" fontWeight="700">Plant</text>
      {rows.map(([f, a, b], i) => (
        <g key={f}>
          <text x="46" y={248 + i * 8} fontSize="6.6" className="fill-current text-muted-foreground">{f}</text>
          <text x="230" y={248 + i * 8} fontSize="6.6" className="fill-current text-muted-foreground">{a}</text>
          <text x="480" y={248 + i * 8} fontSize="6.6" className="fill-current text-muted-foreground">{b}</text>
        </g>
      ))}
    </svg>
  );
}
