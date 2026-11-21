/** Analogous organs — wings of butterfly vs bird, eyes of octopus vs mammal. Theme-aware. */
export function AnalogousOrgans({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 210" className={className} role="img" aria-label="Analogous organs wings of butterfly chitin membrane versus bird feathered bone limb and eyes of octopus versus mammal showing convergent evolution">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Analogous organs — different structure, same function</text>

      {[
        { x: 175, t: "BUTTERFLY WING", s: "chitin membrane" },
        { x: 485, t: "BIRD WING", s: "feathered bone-limb" },
      ].map((n) => (
        <g key={n.t}>
          <rect x={n.x - 120} y="50" width="240" height="60" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
          <text x={n.x} y="74" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{n.t}</text>
          <text x={n.x} y="94" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">{n.s}</text>
        </g>
      ))}
      <text x="330" y="130" fontSize="7.6" textAnchor="middle" className="fill-current text-muted-foreground">Eyes of octopus vs mammal — same function, totally different structure</text>

      <rect x="40" y="146" width="580" height="44" rx="10" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="56" y="164" fontSize="8.8" className="fill-current text-foreground" fontWeight="700">→ CONVERGENT evolution: similar environments produce similar solutions,</text>
      <text x="56" y="182" fontSize="8.8" className="fill-current text-muted-foreground">but do NOT prove common ancestry — that is why homologous organs are stronger evidence.</text>
    </svg>
  );
}
