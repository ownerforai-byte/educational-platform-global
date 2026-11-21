/** Ribosome types 70S vs 80S. Well-detailed. Theme-aware. */
export function RibosomeTypesChart({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 280" className={className} role="img" aria-label="Ribosome types 70S prokaryotic 50S and 30S subunits found in bacteria mitochondria chloroplasts versus 80S eukaryotic 60S and 40S subunits on rough endoplasmic reticulum structure two subunits mRNA tunnel A P E sites">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Ribosomes — 70S vs 80S</text>

      {/* 70S */}
      <rect x="30" y="44" width="320" height="150" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <text x="190" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">70S — PROKARYOTIC</text>
      <ellipse cx="190" cy="100" rx="45" ry="16" className="fill-none stroke-current text-emerald-600" strokeWidth="2.5" />
      <text x="190" y="104" fontSize="7" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">50S subunit</text>
      <ellipse cx="190" cy="128" rx="32" ry="12" className="fill-none stroke-current text-emerald-600" strokeWidth="2.5" />
      <text x="190" y="132" fontSize="7" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">30S subunit</text>
      <text x="60" y="168" fontSize="7.2" className="fill-current text-muted-foreground">found in: bacteria · mitochondria · chloroplasts</text>
      <text x="60" y="184" fontSize="7.2" className="fill-current text-muted-foreground">target of many antibiotics (streptomycin, tetracycline)</text>

      {/* 80S */}
      <rect x="370" y="44" width="320" height="150" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="530" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">80S — EUKARYOTIC</text>
      <ellipse cx="530" cy="100" rx="48" ry="17" className="fill-none stroke-current text-sky-600" strokeWidth="2.5" />
      <text x="530" y="104" fontSize="7" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">60S subunit</text>
      <ellipse cx="530" cy="128" rx="34" ry="13" className="fill-none stroke-current text-sky-600" strokeWidth="2.5" />
      <text x="530" y="132" fontSize="7" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">40S subunit</text>
      <text x="400" y="168" fontSize="7.2" className="fill-current text-muted-foreground">found in: cytosol (free) and rough ER (bound)</text>
      <text x="400" y="184" fontSize="7.2" className="fill-current text-muted-foreground">free ribosomes → cytosol proteins; bound → secretion/membranes</text>

      {/* shared features */}
      <rect x="30" y="212" width="660" height="52" rx="12" className="fill-current text-violet-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="50" y="234" fontSize="8.4" className="fill-current text-foreground" fontWeight="700">Shared structure: rRNA + proteins in two subunits; mRNA threads between them; A, P and E sites hold tRNAs.</text>
      <text x="50" y="252" fontSize="7.8" className="fill-current text-muted-foreground">S = Svedberg sedimentation units — they are NOT additive (50S + 30S = 70S) because rate depends on shape and mass.</text>
    </svg>
  );
}
