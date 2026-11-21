/** Bacteria vs Archaea — molecular contrast. Well-detailed. Theme-aware. */
export function BacteriaVsArchaea({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Bacteria versus archaea molecular contrast peptidoglycan wall versus pseudopeptidoglycan ester versus ether linked membrane lipids RNA polymerase sensitivity to antibiotics habitats halophiles thermophiles methanogens">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Bacteria vs Archaea — look alike, chemically worlds apart</text>

      {/* bacteria */}
      <rect x="30" y="44" width="320" height="160" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="190" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">BACTERIA</text>
      <ellipse cx="190" cy="120" rx="80" ry="40" className="fill-none stroke-current text-sky-600" strokeWidth="3" />
      <text x="190" y="124" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">peptidoglycan wall</text>
      {[
        "ester-linked membrane lipids",
        "killed by many antibiotics",
        "live everywhere — soil, gut, sea",
      ].map((t, i) => (
        <text key={t} x="60" y={180 + i * 18} fontSize="7.4" className="fill-current text-muted-foreground">• {t}</text>
      ))}

      {/* archaea */}
      <rect x="370" y="44" width="320" height="160" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="530" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">ARCHAEA</text>
      <ellipse cx="530" cy="120" rx="80" ry="40" className="fill-none stroke-current text-amber-600" strokeWidth="3" />
      <text x="530" y="124" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">pseudopeptidoglycan / protein wall</text>
      {[
        "ether-linked branched lipids (unique)",
        "antibiotics mostly do not work",
        "extremophiles: salt, heat, acid, marsh gas",
      ].map((t, i) => (
        <text key={t} x="400" y={180 + i * 18} fontSize="7.4" className="fill-current text-muted-foreground">• {t}</text>
      ))}

      {/* groups */}
      <rect x="30" y="220" width="660" height="64" rx="12" className="fill-current text-violet-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="50" y="242" fontSize="8.4" className="fill-current text-foreground" fontWeight="700">THREE ARCHAEA GROUPS: halophiles (salt lakes) · thermophiles (hot springs, above 80 °C) · methanogens (produce methane in rumen and marshes).</text>
      <text x="50" y="264" fontSize="7.8" className="fill-current text-muted-foreground">Exam hook: both are prokaryotes, but rRNA and membrane chemistry split them — the basis of the three-domain system.</text>
    </svg>
  );
}
