/** Bioaccumulation vs biodegradation — fate of a pollutant. Well-detailed. Theme-aware. */
export function BioaccumulationVsBiodegradation({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Bioaccumulation versus biodegradation contrast fate of pollutant microbes digest oil bacteria enzymes persistent chemicals fat soluble half life comparison two fates">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Two fates of a pollutant — accumulate or degrade</text>
      {/* contrast */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">BIOACCUMULATION</text>
      {[
        "happens when the chemical is",
        "  persistent and fat-soluble",
        "organism takes it in faster",
        "  than it can excrete it",
        "concentration rises with age",
        "  and up the food chain",
        "DDT, mercury, PCBs behave",
        "  this way",
        "top predators inherit everyone",
        "  else's dose",
      ].map((t, i) => (
        <text key={t} x="46" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* biodegradation */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">BIODEGRADATION</text>
      {[
        "microbes digest the pollutant",
        "  as food — oil, sewage, some",
        "  pesticides",
        "the basis of sewage treatment",
        "  and oil-spill cleanup",
        "speed depends on temperature,",
        "  oxygen, and nutrients",
        "engineered and enriched",
        "  microbial communities speed",
        "  it up (bioremediation)",
        "the molecule must be digestible —",
        "  C–Cl bonds resist enzymes",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: whether a pollutant bioaccumulates or biodegrades is decided by its chemistry — solubility and bond strength.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Same environment, two opposite outcomes — the molecular structure decides.</text>
    </svg>
  );
}
