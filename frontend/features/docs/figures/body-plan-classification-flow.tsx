/** Body plan classification flow — how features sort phyla. Well-detailed. Theme-aware. */
export function BodyPlanClassificationFlow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Body plan classification flow symmetry germ layers coelom segmentation sorting phyla dichotomous features Porifera Cnidaria Platyhelminthes Annelida Chordata">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Sorting animals — four questions in order</text>
      {[
        ["1. Symmetry?", "asymmetric → Porifera; radial → Cnidaria; bilateral → continue", "rgb(2 132 199)"],
        ["2. Germ layers?", "diploblastic → Cnidaria; triploblastic → continue", "rgb(16 185 129)"],
        ["3. Coelom?", "none → Platyhelminthes; false → Nematoda; true → continue", "rgb(139 92 246)"],
        ["4. Segmentation + appendages?", "segmented worm → Annelida; jointed legs → Arthropoda; backbone → Chordata", "rgb(245 158 11)"],
      ].map(([q, a, rgb], i) => {
        const y = 44 + i * 56;
        return (
          <g key={q}>
            <rect x="30" y={y} width="220" height="48" rx="10" className="fill-current" style={{ color: `${rgb} / 0.15` }} stroke="currentColor" strokeWidth="2" />
            <text x="44" y={y + 29} fontSize="8" className="fill-current text-foreground" fontWeight="800">{q}</text>
            <text x="264" y={y + 20} fontSize="6.8" className="fill-current text-muted-foreground">{a.slice(0, 60)}</text>
            <text x="264" y={y + 34} fontSize="6.8" className="fill-current text-muted-foreground">{a.slice(60, 120)}</text>
          </g>
        );
      })}
      <rect x="30" y="272" width="660" height="20" rx="6" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="286" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: classify an unknown animal by asking the four questions in this exact order — each answer prunes the tree.</text>
    </svg>
  );
}
