/** Ecosystem structure vs function — the two halves of the definition. Well-detailed. Theme-aware. */
export function EcosystemStructureFunction({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Ecosystem structure versus function biotic components abiotic components energy flow nutrient cycling productivity decomposition definition aspects">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Structure vs function — two halves of 'ecosystem'</text>

      {/* structure */}
      <rect x="30" y="44" width="330" height="220" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">STRUCTURE — what is there</text>
      {[
        "biotic components: producers,",
        "  consumers, decomposers",
        "abiotic components: light, water,",
        "  soil, temperature, minerals",
        "arrangement: stratification in a",
        "  forest, zonation in a pond",
      ].map((t, i) => (
        <text key={t} x="50" y={94 + i * 17} fontSize="7.2" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* species icons */}
      <circle cx="90" cy="230" r="10" className="fill-current text-emerald-600/40" />
      <rect x="130" y="222" width="22" height="16" rx="8" className="fill-current text-sky-600/40" />
      <circle cx="180" cy="230" r="8" className="fill-current text-amber-600/40" />
      <text x="195" y="248" fontSize="6.6" className="fill-current text-muted-foreground">the cast of characters</text>

      {/* function */}
      <rect x="390" y="44" width="300" height="220" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">FUNCTION — what it does</text>
      {[
        "energy flow: one-way, sun → heat",
        "nutrient cycling: round and round",
        "productivity: GPP, NPP, standing crop",
        "decomposition: waste back to soil",
        "homeostasis: the system resists change",
      ].map((t, i) => (
        <text key={t} x="410" y={94 + i * 17} fontSize="7.2" className="fill-current text-muted-foreground">• {t}</text>
      ))}
      {/* flow icon */}
      <line x1="410" y1="216" x2="670" y2="216" className="stroke-current text-emerald-700" strokeWidth="2" style={{ color: "rgb(5 122 85 / 0.9)" }} markerEnd="url(#arrhl)" />
      <text x="540" y="236" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">the processes at work</text>
      <rect x="30" y="272" width="660" height="20" rx="6" className="fill-current text-emerald-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="286" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: name the components (structure) AND the processes (function) — an ecosystem answer needs both halves.</text>
    </svg>
  );
}
