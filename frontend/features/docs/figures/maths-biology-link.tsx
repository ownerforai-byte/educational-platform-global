/** Maths and biology link — models, graphs, statistics. Well-detailed. Theme-aware. */
export function MathsBiologyLink({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Mathematics biology link biostatistics population growth models graphs Hardy Weinberg probability exponential curves data analysis">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Mathematics ↔ biology — counting life</text>

      {/* growth curve */}
      <rect x="30" y="44" width="330" height="220" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">MODELS YOU ALREADY USE</text>
      {/* axes */}
      <line x1="70" y1="230" x2="70" y2="90" className="stroke-current text-stone-500" strokeWidth="1.6" />
      <line x1="70" y1="230" x2="330" y2="230" className="stroke-current text-stone-500" strokeWidth="1.6" />
      {/* exponential + logistic */}
      <path d="M70 226 q80 -6 120 -60 q40 -70 80 -110" className="fill-none stroke-current text-sky-500" strokeWidth="2.4" style={{ color: "rgb(2 132 199 / 0.9)" }} strokeDasharray="5 3" />
      <path d="M70 226 q90 -4 140 -40 q50 -40 110 -66" className="fill-none stroke-current text-emerald-600" strokeWidth="2.6" style={{ color: "rgb(5 122 85 / 0.9)" }} />
      <text x="240" y="120" fontSize="6.6" className="fill-current text-sky-600">exponential</text>
      <text x="230" y="180" fontSize="6.6" className="fill-current text-emerald-600">logistic (S-curve)</text>
      {[
        "population growth = equations",
        "Hardy-Weinberg = algebra of alleles",
        "growth curves = graph reading",
      ].map((t, i) => (
        <text key={t} x="50" y={248 + i * 0} fontSize="7" className="fill-current text-muted-foreground">{["• population growth = equations", "• Hardy-Weinberg = allele algebra", "• growth curves = graph reading"][i]}</text>
      ))}

      {/* biostatistics */}
      <rect x="390" y="44" width="300" height="220" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">BIOSTATISTICS IN PRACTICE</text>
      {/* bar chart */}
      {[40, 70, 55, 90].map((h, i) => (
        <rect key={i} x={430 + i * 55} y={210 - h} width="34" height={h} rx="4" className="fill-current text-emerald-600/40" stroke="currentColor" strokeWidth="1.2" style={{ color: "rgb(5 122 85 / 0.9)" }} />
      ))}
      <line x1="420" y1="210" x2="660" y2="210" className="stroke-current text-stone-500" strokeWidth="1.6" />
      {[
        "mean, mode, median summarise data",
        "probability underpins genetics ratios",
        "chi-square tests Mendel's counts",
        "graphs turn numbers into evidence",
      ].map((t, i) => (
        <text key={t} x="410" y={234 + i * 0} fontSize="7" className="fill-current text-muted-foreground">{["• mean, mode, median summarise data", "• probability underpins genetic ratios", "• chi-square tests Mendel's counts", "• graphs turn numbers into evidence"][i]}</text>
      ))}
      <rect x="30" y="272" width="660" height="20" rx="6" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="286" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: biology without maths stops at description — with it, biology predicts.</text>
    </svg>
  );
}
