/** Monera characters — the prokaryotic kingdom at a glance. Well-detailed. Theme-aware. */
export function MoneraCharacters({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Kingdom Monera characters unicellular prokaryotic peptidoglycan cell wall no membrane bound organelles circular DNA nutrition autotrophic heterotrophic groups archaea eubacteria cyanobacteria examples">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Kingdom Monera — the prokaryotic kingdom</text>

      {/* central cell */}
      <ellipse cx="180" cy="160" rx="120" ry="70" className="fill-current text-sky-500/10" strokeWidth="3" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <path d="M110 150 q30 -25 60 0 q30 25 60 0" className="fill-none stroke-current text-violet-600" strokeWidth="2.5" />
      {[[130, 180], [165, 190], [200, 175]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4" className="fill-current text-stone-500" />
      ))}
      <text x="180" y="252" fontSize="7.6" textAnchor="middle" className="fill-current text-muted-foreground">naked circular DNA · 70S ribosomes · no organelles</text>

      {/* character list */}
      <rect x="340" y="44" width="350" height="150" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <text x="360" y="66" fontSize="8.6" className="fill-current text-foreground" fontWeight="800">DEFINING CHARACTERS</text>
      {[
        "unicellular; prokaryotic (no true nucleus)",
        "cell wall of peptidoglycan (most groups)",
        "nutrition: autotrophic or heterotrophic",
        "reproduction mostly binary fission",
        "found everywhere — soil, water, extreme habitats",
      ].map((t, i) => (
        <text key={t} x="360" y={90 + i * 20} fontSize="7.4" className="fill-current text-muted-foreground">• {t}</text>
      ))}

      {/* groups */}
      <rect x="340" y="210" width="350" height="76" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="360" y="232" fontSize="8.4" className="fill-current text-foreground" fontWeight="700">MAJOR GROUPS:</text>
      <text x="360" y="252" fontSize="7.6" className="fill-current text-muted-foreground">Archaebacteria (extremophiles) · Eubacteria ·</text>
      <text x="360" y="270" fontSize="7.6" className="fill-current text-muted-foreground">Cyanobacteria (photosynthetic, N₂-fixing) · Mycoplasma (no wall)</text>

      <text x="16" y="290" fontSize="8.4" className="fill-current text-muted-foreground">Monera is the only kingdom without a nuclear membrane — every other kingdom is built on eukaryotic cells.</text>
    </svg>
  );
}
