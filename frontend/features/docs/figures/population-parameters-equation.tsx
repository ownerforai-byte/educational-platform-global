/** Population parameters equation — natality, mortality, immigration, emigration. Theme-aware. */
export function PopulationParametersEquation({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Population change equation natality plus immigration minus mortality and emigration equals population change with definitions">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Population change — one equation, four dials</text>

      <rect x="40" y="56" width="580" height="54" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="330" y="92" fontSize="13" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">change = (natality + immigration) − (mortality + emigration)</text>

      {[
        { x: 100, t: "NATALITY", s: "birth rate — births per", s2: "unit time; raises size", c: "rgb(22 163 74 / 0.9)" },
        { x: 250, t: "IMMIGRATION", s: "individuals arriving;", s2: "raises size", c: "rgb(22 163 74 / 0.9)" },
        { x: 410, t: "MORTALITY", s: "death rate — deaths", s2: "per unit time; lowers size", c: "rgb(244 63 94 / 0.9)" },
        { x: 560, t: "EMIGRATION", s: "individuals leaving;", s2: "lowers size", c: "rgb(244 63 94 / 0.9)" },
      ].map((n) => (
        <g key={n.t}>
          <rect x={n.x - 66} y="130" width="132" height="76" rx="10" style={{ color: n.c }} className="fill-current opacity-10" strokeWidth="2.5" stroke="currentColor" />
          <text x={n.x} y="154" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{n.t}</text>
          <text x={n.x} y="174" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">{n.s}</text>
          <text x={n.x} y="190" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">{n.s2}</text>
        </g>
      ))}

      <text x="16" y="228" fontSize="10" className="fill-current text-muted-foreground">Density is the state variable — individuals per unit area or volume — and these four flows are the only things that move it.</text>
    </svg>
  );
}
