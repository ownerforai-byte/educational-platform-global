/** Lichen as pioneer — rock colonisation to soil formation sequence. Theme-aware. */
export function LichenPioneerSuccession({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Lichen pioneer succession on bare rock from crustose lichen to mosses to grasses with soil building steps">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">First life on bare rock — the lichen's job</text>

      {/* rock stages */}
      {[
        { x: 60, t: "① bare rock", s: "no soil, no water", c: "rgb(120 113 108 / 0.9)" },
        { x: 220, t: "② crustose lichen", s: "acids etch rock, dead lichen = humus", c: "rgb(132 204 22 / 0.9)" },
        { x: 380, t: "③ mosses arrive", s: "soil pocket deepens", c: "rgb(22 163 74 / 0.9)" },
        { x: 540, t: "④ grasses & herbs", s: "true soil, roots hold it", c: "rgb(14 165 233 / 0.9)" },
      ].map((n, i) => (
        <g key={n.t}>
          <rect x={n.x - 60} y="70" width="120" height="80" rx="10" style={{ color: n.c }} className="fill-current opacity-12" strokeWidth="2.5" stroke="currentColor" />
          <text x={n.x} y="94" fontSize="8.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{n.t}</text>
          <text x={n.x} y="112" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">{n.s}</text>
          {i < 3 && <line x1={n.x + 62} y1="110" x2={n.x + 96} y2="110" strokeWidth="2.5" className="stroke-current text-foreground" />}
        </g>
      ))}

      {/* mechanism box */}
      <rect x="60" y="170" width="540" height="50" rx="10" className="fill-current text-lime-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(132 204 22 / 0.9)" }} />
      <text x="76" y="192" fontSize="9" className="fill-current text-foreground" fontWeight="700">Mechanism: lichen acids slowly dissolve minerals; dead thalli pile into the first organic soil; windblown dust collects in the cracks — a seedbed is born.</text>
      <text x="76" y="210" fontSize="8.5" className="fill-current text-muted-foreground">This is primary succession — life creating the ground for the next life, starting from nothing but stone.</text>
    </svg>
  );
}
