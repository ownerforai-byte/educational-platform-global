/** Phycomycetes profile — lower fungi. Well-detailed. Theme-aware. */
export function PhycomycetesProfile({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Phycomycetes profile lower fungi coenocytic hyphae sporangium asexual zoospores conjugation zygospore examples Mucor Rhizopus Albugo water moulds algal fungi comparison">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Phycomycetes — the 'algal fungi'</text>

      {/* characters */}
      <rect x="30" y="44" width="330" height="170" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="195" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">DEFINING CHARACTERS</text>
      {[
        "coenocytic (non-septate) hyphae",
        "called 'algal fungi' — look like algae",
        "asexual: sporangiospores or zoospores",
        "sexual: gametes or conjugation",
        "habitat: moist, aquatic, or on food",
      ].map((t, i) => (
        <text key={t} x="50" y={92 + i * 22} fontSize="7.4" className="fill-current text-muted-foreground">• {t}</text>
      ))}

      {/* examples */}
      <rect x="380" y="44" width="310" height="170" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <text x="535" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">EXAMPLES</text>
      <ellipse cx="470" cy="120" rx="26" ry="26" className="fill-none stroke-current text-emerald-600" strokeWidth="2.5" />
      <text x="470" y="124" fontSize="6" textAnchor="middle" className="fill-current text-muted-foreground">sporangium</text>
      <text x="520" y="112" fontSize="7.4" className="fill-current text-muted-foreground">Mucor, Rhizopus —</text>
      <text x="520" y="128" fontSize="7.4" className="fill-current text-muted-foreground">bread moulds</text>
      <text x="400" y="170" fontSize="7.4" className="fill-current text-muted-foreground">Albugo (white rust on mustard)</text>
      <text x="400" y="190" fontSize="7.4" className="fill-current text-muted-foreground">water moulds — downy mildews</text>

      {/* verdict */}
      <rect x="30" y="230" width="660" height="56" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="50" y="252" fontSize="8.2" className="fill-current text-foreground" fontWeight="700">Where they sit: the 'lower fungi' — simple, mostly coenocytic, spores in sporangia rather than asci or basidia.</text>
      <text x="50" y="272" fontSize="7.6" className="fill-current text-muted-foreground">Memory hook: Phyco = alga (same root as 'phycology') — named for their alga-like thallus, not for being algae.</text>
    </svg>
  );
}
