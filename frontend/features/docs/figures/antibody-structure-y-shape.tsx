/** Antibody structure Y shape — the immune system's guided missile. Well-detailed. Theme-aware. */
export function AntibodyStructureYShape({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Antibody structure Y shape immunoglobulin heavy light chains variable constant region antigen binding sites disulfide bonds IgG IgM IgA IgE classes functions neutralisation opsonisation five classes specificity lock key">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The antibody — anatomy of a Y</text>
      {/* Y diagram */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE Y-SHAPED MOLECULE</text>
      {/* heavy chains */}
      <path d="M150 210 L180 130 L195 110" className="fill-none stroke-current" strokeWidth="10" strokeLinecap="round" style={{ color: "rgb(2 132 199 / 0.5)" }} />
      <path d="M240 210 L210 130 L195 110" className="fill-none stroke-current" strokeWidth="10" strokeLinecap="round" style={{ color: "rgb(2 132 199 / 0.5)" }} />
      {/* light chains */}
      <path d="M180 130 L165 100" className="fill-none stroke-current" strokeWidth="6" strokeLinecap="round" style={{ color: "rgb(16 185 129 / 0.6)" }} />
      <path d="M210 130 L225 100" className="fill-none stroke-current" strokeWidth="6" strokeLinecap="round" style={{ color: "rgb(16 185 129 / 0.6)" }} />
      {/* binding sites */}
      <circle cx="163" cy="94" r="6" className="fill-current" style={{ color: "rgb(244 63 94 / 0.7)" }} />
      <circle cx="227" cy="94" r="6" className="fill-current" style={{ color: "rgb(244 63 94 / 0.7)" }} />
      <text x="140" y="80" fontSize="5.6" className="fill-current text-rose-600" fontWeight="700">antigen-binding sites (variable)</text>
      <text x="255" y="180" fontSize="5.6" className="fill-current text-muted-foreground">heavy chains (blue)</text>
      <text x="255" y="194" fontSize="5.6" className="fill-current text-muted-foreground">light chains (green)</text>
      <text x="195" y="216" fontSize="6.4" textAnchor="middle" className="fill-current text-muted-foreground">two binding sites per antibody — specificity at the tips, class at the stem</text>
      {/* classes */}
      <rect x="390" y="44" width="300" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE FIVE CLASSES</text>
      {[
        ["IgG", "the workhorse: crosses placenta, long-lasting"],
        ["IgM", "first on scene: the early infection marker"],
        ["IgA", "guards the borders: saliva, tears, milk"],
        ["IgE", "the allergy and parasite specialist"],
        ["IgD", "B-cell receptor, minor role"],
      ].map(([k, v], i) => (
        <g key={k}>
          <text x="406" y={96 + i * 30} fontSize="6.8" className="fill-current text-emerald-600" fontWeight="800">{k}</text>
          <text x="446" y={96 + i * 30} fontSize="6" className="fill-current text-muted-foreground">{v}</text>
        </g>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: antibody = 2 heavy + 2 light chains, Y-shaped, 2 binding sites; IgG crosses the placenta (passive immunity).</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">IgM first, IgG memory — the antibody timeline a blood test reads.</text>
    </svg>
  );
}
