/** Biogas plant cycle — dung in, energy out. Well-detailed. Theme-aware. */
export function BiogasPlantCycle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Biogas plant cycle anaerobic digestion dung toilet waste inlet digester dome gas methane slurry outlet fertiliser cooking lighting Nepal gobar gas model design fixed dome floating drum benefits smoke reduction">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Biogas — the dung-to-energy loop</text>
      {/* plant diagram */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE PLANT IN PROFILE</text>
      {/* inlet */}
      <rect x="70" y="120" width="40" height="70" rx="6" className="fill-current text-stone-500/20" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <text x="90" y="150" fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">inlet</text>
      {/* digester dome */}
      <path d="M120 190 a75 60 0 0 1 150 0 Z" className="fill-current text-emerald-500/25" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="195" y="140" fontSize="6.2" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">digester + gas dome</text>
      <text x="195" y="156" fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">anaerobic microbes → ~60% CH₄</text>
      {/* outlet */}
      <rect x="280" y="120" width="40" height="70" rx="6" className="fill-current text-stone-500/20" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <text x="300" y="150" fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">slurry</text>
      {/* gas pipe */}
      <line x1="195" y1="130" x2="195" y2="100" className="stroke-current" strokeWidth="2.5" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="195" y="94" fontSize="5.8" textAnchor="middle" className="fill-current text-amber-600" fontWeight="700">gas → stove/lamp</text>
      <text x="195" y="216" fontSize="6.4" textAnchor="middle" className="fill-current text-muted-foreground">slurry out = rich organic fertiliser — the second product pays too</text>
      {/* benefits */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHY IT FITS NEPAL</text>
      {[
        "cattle dung is already collected —",
        "  the feedstock is free",
        "one plant cooks a family's meals",
        "  and lights a bulb",
        "indoor smoke falls: biogas burns",
        "  clean compared to fuelwood",
        "sanitation bonus: human waste",
        "  can join the digester",
        "Nepal's gobar-gas programme is",
        "  one of the world's most",
        "  successful — hundreds of",
        "  thousands of plants installed",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-emerald-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: biogas = anaerobic digestion → ~60% methane + spent slurry as fertiliser — name both outputs.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Energy, sanitation and fertiliser in one device — the textbook appropriate-technology case.</text>
    </svg>
  );
}
