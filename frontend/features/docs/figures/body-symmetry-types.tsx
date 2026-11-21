/** Body symmetry — asymmetry, radial, bilateral with examples. Theme-aware. */
export function BodySymmetryTypes({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Animal body symmetry types asymmetrical amoeba radially symmetrical hydra and bilaterally symmetrical frog with symmetry planes drawn">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Symmetry — the body's first plan</text>

      {/* asymmetric */}
      <g>
        <path d="M80 80 q30 -20 50 6 q20 24 -8 40 q-34 18 -52 -8 q-14 -22 10 -38 Z" className="fill-current text-slate-500/20" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(120 113 108 / 0.9)" }} />
        <text x="105" y="160" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">ASYMMETRICAL</text>
        <text x="105" y="176" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">no plane divides it equally</text>
        <text x="105" y="190" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">Amoeba, most sponges</text>
      </g>

      {/* radial */}
      <g>
        <g className="stroke-current text-rose-500" strokeWidth="1.5" strokeDasharray="4 3">
          <line x1="290" y1="50" x2="290" y2="150" /><line x1="240" y1="100" x2="340" y2="100" />
          <line x1="255" y1="65" x2="325" y2="135" /><line x1="325" y1="65" x2="255" y2="135" />
        </g>
        <circle cx="290" cy="100" r="48" className="fill-current text-teal-500/15" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(20 184 166 / 0.9)" }} />
        <text x="290" y="180" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">RADIAL</text>
        <text x="290" y="196" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">any plane through the centre works</text>
        <text x="290" y="210" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">Hydra, jellyfish, starfish — sessile/drifting life</text>
      </g>

      {/* bilateral */}
      <g>
        <ellipse cx="510" cy="100" rx="56" ry="30" className="fill-current text-emerald-500/15" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
        <line x1="510" y1="66" x2="510" y2="134" strokeWidth="2" strokeDasharray="4 3" className="stroke-current text-rose-500" />
        <circle cx="556" cy="92" r="3" className="fill-current text-foreground" />
        <text x="510" y="180" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">BILATERAL</text>
        <text x="510" y="196" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">only one plane — left = right mirror</text>
        <text x="510" y="210" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">worms → frog → human; directional movers</text>
      </g>

      <text x="16" y="240" fontSize="10" className="fill-current text-muted-foreground">Symmetry tracks lifestyle: radial suits attached or drifting feeders meeting the world from all sides; bilateral suits movers with a head end.</text>
    </svg>
  );
}
