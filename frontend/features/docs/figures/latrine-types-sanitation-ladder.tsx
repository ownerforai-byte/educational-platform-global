/** Latrine types sanitation ladder — from open defecation to sewer. Well-detailed. Theme-aware. */
export function LatrineTypesSanitationLadder({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Latrine types sanitation ladder open defecation simple pit improved ventilated pour flush twin pit septic tank sewerage connection faecal sludge management groundwater distance safety Nepal ODF open defecation free campaign sustainability use not just construction twin pit composting">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The sanitation ladder — rungs from worst to best</text>
      {/* ladder */}
      <rect x="30" y="44" width="660" height="160" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      {[
        ["Open defecation", "contaminates fields and streams — the bottom rung", 130],
        ["Simple pit", "a slab and a hole; better, but odour and flies remain", 300],
        ["Improved pit / pour-flush", "vent pipe, water seal — the common Nepali rural standard", 470],
        ["Sewer / twin-pit composting", "full containment or safe reuse — the top rung", 620],
      ].map(([name, detail, x], i) => (
        <g key={name as string}>
          <rect x={(x as number) - 78} y="70" width="156" height="96" rx="10" className="fill-current text-slate-500/10" strokeWidth="1.8" stroke="currentColor" style={{ color: i < 2 ? "rgb(217 119 6 / 0.9)" : "rgb(16 185 129 / 0.9)" }} />
          <text x={x as number} y="92" fontSize="6.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{name as string}</text>
          <text x={x as number} y="112" fontSize="5.4" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(0, 32)}</text>
          <text x={x as number} y="126" fontSize="5.4" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(32, 64)}</text>
          <text x={x as number} y="152" fontSize="5.6" textAnchor="middle" className="fill-current" fontWeight="700" style={{ color: i < 2 ? "rgb(217 119 6)" : "rgb(22 163 74)" }}>{["unsafe", "basic", "improved", "safely managed"][i]}</text>
        </g>
      ))}
      <text x="360" y="186" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">a pit must sit ≥30 m downhill of wells — groundwater is the silent victim of bad siting</text>
      {/* facts */}
      <rect x="30" y="210" width="660" height="82" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="230" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Nepal declared itself open-defecation-free in 2019 — construction was the easy half; sustained use and sludge management are the hard half.</text>
      <text x="360" y="248" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Twin pits compost while the other rests — turning waste into soil conditioner, the sanitation version of crop rotation.</text>
      <text x="360" y="266" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: four rungs in order, WHO's 'safely managed' definition, and the 30-m well rule — three marks, one diagram.</text>
      <text x="360" y="282" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">A latrine that is built but unused is a statistic, not sanitation — behaviour, not hardware, is the frontier.</text>
    </svg>
  );
}
