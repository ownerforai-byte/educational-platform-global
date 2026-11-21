/** Bryophyte groups — liverwort, hornwort, moss compared. Theme-aware. */
export function BryophyteGroups({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Three bryophyte groups liverworts with flat thallus hornworts with elongated capsule and mosses with leafy shoot and twisted seta">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Three bryophyte lines</text>

      {/* liverwort */}
      <g>
        <rect x="16" y="56" width="196" height="170" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
        <text x="114" y="80" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">LIVERWORTS</text>
        <path d="M50 130 q40 -24 80 -8 q20 10 -10 18 q-40 8 -70 -10 Z" className="fill-current text-emerald-500/40" />
        {[[80, 118], [110, 122]].map(([x, y], i) => (
          <line key={i} x1={x} y1={y} x2={x} y2={y - 16} strokeWidth="2" className="stroke-current text-amber-500" />
        ))}
        <text x="114" y="168" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">flat dichotomous thallus</text>
        <text x="114" y="184" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">upright sporophytes</text>
        <text x="114" y="200" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">Marchantia; gemma cups</text>
      </g>

      {/* hornwort */}
      <g>
        <rect x="232" y="56" width="196" height="170" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
        <text x="330" y="80" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">HORNWORTS</text>
        <path d="M290 160 q40 -14 80 0 q-40 10 -80 0 Z" className="fill-current text-emerald-500/40" />
        <rect x="322" y="96" width="10" height="62" rx="5" className="fill-current text-slate-600/60" />
        <text x="330" y="168" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">long horn-like capsule</text>
        <text x="330" y="184" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">grows from its base</text>
        <text x="330" y="200" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">Anthoceros; 1 chloroplast/cell</text>
      </g>

      {/* moss */}
      <g>
        <rect x="448" y="56" width="196" height="170" rx="12" className="fill-current text-teal-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(20 184 166 / 0.9)" }} />
        <text x="546" y="80" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">MOSSES</text>
        <g className="stroke-current text-emerald-600" strokeWidth="3">
          <line x1="546" y1="170" x2="546" y2="110" />
        </g>
        {[[538, 158], [554, 150], [540, 138], [552, 128]].map(([x, y], i) => (
          <ellipse key={i} cx={x} cy={y} rx="6" ry="3" className="fill-current text-emerald-500/60" />
        ))}
        <ellipse cx="546" cy="102" rx="6" ry="12" className="fill-current text-stone-600/60" />
        <text x="546" y="188" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">leafy shoot + capsule on seta</text>
        <text x="546" y="204" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">Funaria; protonema stage</text>
      </g>
      <text x="16" y="244" fontSize="10" className="fill-current text-muted-foreground">Shared identity: no vascular tissue, rhizoids instead of roots, dominant gametophyte — the 'amphibians of the plant kingdom'.</text>
    </svg>
  );
}
