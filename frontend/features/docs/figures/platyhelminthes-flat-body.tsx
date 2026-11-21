/** Platyhelminthes flat body advantage — why flat works. Well-detailed. Theme-aware. */
export function PlatyhelminthesFlatBody({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Platyhelminthes flat body advantage diffusion no circulatory system flame cells excretion hermaphrodite tapeworm flatworm liver fluke classes turbellaria trematoda cestoda">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Flat on purpose — the flatworm's design logic</text>
      {/* flat cross-section */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE FLAT CROSS-SECTION</text>
      <ellipse cx="195" cy="140" rx="110" ry="16" className="fill-current text-sky-500/20" stroke="currentColor" strokeWidth="2" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="180" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">every cell lies within diffusion distance of the surface</text>
      <text x="195" y="198" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">no lungs, no blood vessels needed — oxygen soaks in</text>
      <text x="195" y="216" fontSize="6.4" textAnchor="middle" className="fill-current text-sky-600">flame cells handle excretion instead of kidneys</text>
      {/* classes */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THREE CLASSES, THREE LIVES</text>
      {[
        ["Turbellaria", "free-living planaria, freshwater"],
        ["Trematoda", "flukes — liver fluke, leaf-shaped parasite"],
        ["Cestoda", "tapeworms — ribbon-like, head with hooks"],
      ].map(([k, v], i) => (
        <g key={k}>
          <text x="406" y={96 + i * 40} fontSize="7.2" className="fill-current text-foreground" fontWeight="700">{k}</text>
          <text x="406" y={112 + i * 40} fontSize="6.6" className="fill-current text-muted-foreground">{v}</text>
        </g>
      ))}
      <text x="406" y="230" fontSize="6.6" className="fill-current text-emerald-600">all three: hermaphrodite, acoelomate, bilateral</text>
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: flatness = no circulatory system needed — the single most examinable sentence about Platyhelminthes.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Parasitic classes traded eyespots for hooks and suckers — the free-living one kept the eyes.</text>
    </svg>
  );
}
