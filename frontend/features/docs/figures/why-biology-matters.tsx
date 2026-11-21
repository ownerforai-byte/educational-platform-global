/** Why biology matters today — application areas. Theme-aware. */
export function WhyBiologyMatters({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 230" className={className} role="img" aria-label="Why biology matters today medicine and public health agriculture and food security environment and conservation biotechnology and industry and understanding ourselves">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Why biology matters today</text>
      {[
        { y: 54, t: "MEDICINE & PUBLIC HEALTH", s: "vaccines, antibiotics, gene therapy" },
        { y: 84, t: "AGRICULTURE & FOOD SECURITY", s: "Green Revolution, GMOs, biofertilisers" },
        { y: 114, t: "ENVIRONMENT & CONSERVATION", s: "climate, biodiversity" },
        { y: 144, t: "BIOTECHNOLOGY & INDUSTRY", s: "insulin, enzymes, biofuels" },
        { y: 174, t: "UNDERSTANDING OURSELVES", s: "behaviour, heredity, origin" },
      ].map((r) => (
        <g key={r.t}>
          <rect x="24" y={r.y - 13} width="612" height="26" rx="7" className="fill-current text-violet-500/8" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(124 58 237 / 0.9)" }} />
          <text x="36" y={r.y + 4} fontSize="7.8" className="fill-current text-foreground" fontWeight="800">{r.t}</text>
          <text x="270" y={r.y + 4} fontSize="7.4" className="fill-current text-muted-foreground">{r.s}</text>
        </g>
      ))}
      <text x="16" y="210" fontSize="9" className="fill-current text-muted-foreground">Each area answers a different human need, and each rests on the same underlying science of life.</text>
    </svg>
  );
}
