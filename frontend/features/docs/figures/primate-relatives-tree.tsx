/** Primate relatives — prosimians, monkeys, apes, humans. Theme-aware. */
export function PrimateRelativesTree({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 220" className={className} role="img" aria-label="Primate relatives prosimians lemurs lorises old world monkeys macaque langur new world monkeys spider monkey apes gibbon orangutan gorilla chimpanzee and humans">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">The primate family — our relatives</text>

      <text x="330" y="56" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">PRIMATES</text>
      {[
        { x: 110, t: "Prosimians", s: "lemurs, lorises" },
        { x: 260, t: "Old World monkeys", s: "macaque, langur" },
        { x: 410, t: "New World monkeys", s: "spider monkey" },
        { x: 550, t: "Apes", s: "gibbon, orangutan, gorilla, chimpanzee" },
      ].map((n) => (
        <g key={n.t}>
          <line x1="330" y1="62" x2={n.x} y2="110" strokeWidth="2" className="stroke-current text-emerald-600" />
          <rect x={n.x - 70} y="110" width="140" height="56" rx="10" className="fill-current text-emerald-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
          <text x={n.x} y="132" fontSize="7.2" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{n.t}</text>
          <text x={n.x} y="150" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">{n.s}</text>
        </g>
      ))}
      <text x="330" y="196" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">+ HUMANS (Hominidae — upright posture, large brain, speech, cumulative culture)</text>
    </svg>
  );
}
