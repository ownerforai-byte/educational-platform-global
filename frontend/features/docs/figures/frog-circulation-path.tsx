/** Frog blood circulation path — pulmonary and systemic circuits with skin shunt. Theme-aware. */
export function FrogCirculationPath({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 280" className={className} role="img" aria-label="Frog circulation pathway showing body to sinus venosus right atrium ventricle truncus pulmocutaneous to lungs and skin and systemic back to left atrium">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Trace the drop of blood — the full circuit</text>

      {[
        { x: 70, y: 80, c: "rgb(120 113 108 / 0.9)", t: "BODY VEINS", s: "deoxygenated return" },
        { x: 240, y: 80, c: "rgb(14 165 233 / 0.9)", t: "SINUS VENOSUS", s: "collecting chamber" },
        { x: 400, y: 80, c: "rgb(14 165 233 / 0.9)", t: "RIGHT ATRIUM", s: "" },
        { x: 540, y: 80, c: "rgb(124 58 237 / 0.9)", t: "VENTRICLE", s: "single, mixed" },
      ].map((n) => (
        <g key={n.t}>
          <rect x={n.x - 55} y={n.y - 20} width="110" height="40" rx="9" style={{ color: n.c }} className="fill-current opacity-12" strokeWidth="2.5" stroke="currentColor" />
          <text x={n.x} y={n.y - 2} fontSize="8.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{n.t}</text>
          {n.s && <text x={n.x} y={n.y + 12} fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">{n.s}</text>}
        </g>
      ))}
      {[
        { x: 240, y: 200, c: "rgb(244 63 94 / 0.9)", t: "LUNGS + SKIN", s: "O₂ picked up (pulmocutaneous arch)" },
        { x: 460, y: 200, c: "rgb(244 63 94 / 0.9)", t: "LEFT ATRIUM", s: "oxygenated return" },
        { x: 110, y: 200, c: "rgb(245 158 11 / 0.9)", t: "BODY ORGANS", s: "systemic arch delivers" },
      ].map((n) => (
        <g key={n.t}>
          <rect x={n.x - 60} y={n.y - 20} width="120" height="40" rx="9" style={{ color: n.c }} className="fill-current opacity-12" strokeWidth="2.5" stroke="currentColor" />
          <text x={n.x} y={n.y - 2} fontSize="8.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{n.t}</text>
          {n.s && <text x={n.x} y={n.y + 12} fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">{n.s}</text>}
        </g>
      ))}

      <g className="stroke-current text-muted-foreground" strokeWidth="2.5">
        <line x1="127" y1="80" x2="183" y2="80" /><polygon points="176,74 190,80 176,86" className="fill-current text-muted-foreground" />
        <line x1="297" y1="80" x2="343" y2="80" /><polygon points="336,74 350,80 336,86" className="fill-current text-muted-foreground" />
        <line x1="457" y1="80" x2="483" y2="80" /><polygon points="476,74 490,80 476,86" className="fill-current text-muted-foreground" />
        <path d="M540 104 Q560 150 522 178" fill="none" /><polygon points="518,170 514,186 530,180" className="fill-current text-muted-foreground" />
        <path d="M398 200 Q330 220 274 202" fill="none" /><polygon points="282,196 268,200 280,210" className="fill-current text-muted-foreground" />
        <path d="M172 200 Q110 220 70 104" fill="none" strokeDasharray="6 3" />
        <path d="M400 178 Q440 150 462 104" fill="none" strokeDasharray="6 3" />
      </g>

      <text x="16" y="258" fontSize="10" className="fill-current text-muted-foreground">Note the amphibian trick: the pulmocutaneous arch sends blood to the SKIN as well as the lungs — cutaneous respiration is wired into the circulation.</text>
    </svg>
  );
}
