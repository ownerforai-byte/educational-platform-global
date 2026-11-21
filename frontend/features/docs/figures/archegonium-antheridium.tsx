/** Archegonium vs antheridium — bryophyte sex organs. Theme-aware. */
export function ArchegoniumAntheridium({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Archegonium flask shaped female organ with egg and neck canal versus antheridium male organ releasing swimming biflagellate sperm water dependent fertilisation">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">The sex organs — flask and sac</text>

      {/* archegonium */}
      <g>
        <rect x="60" y="56" width="260" height="170" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
        <text x="190" y="82" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">ARCHEGONIUM (female)</text>
        <path d="M170 130 q-8 -30 10 -34 q20 -4 22 16 q2 14 -10 20 q-14 6 -22 -2 Z" className="fill-current text-rose-500/30" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
        <circle cx="192" cy="132" r="6" className="fill-current text-amber-500/80" />
        <text x="230" y="112" fontSize="8" className="fill-current text-muted-foreground">neck canal</text>
        <text x="230" y="140" fontSize="8" className="fill-current text-foreground" fontWeight="700">one EGG at the base</text>
        <text x="76" y="176" fontSize="8.5" className="fill-current text-muted-foreground">flask-shaped; the venter wraps</text>
        <text x="76" y="192" fontSize="8.5" className="fill-current text-muted-foreground">the zygote — embryo stays on the parent</text>
      </g>

      {/* antheridium */}
      <g>
        <rect x="340" y="56" width="260" height="170" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
        <text x="470" y="82" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">ANTHERIDIUM (male)</text>
        <ellipse cx="470" cy="120" rx="34" ry="22" className="fill-current text-sky-500/30" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
        {[[458, 118], [478, 116], [468, 128]].map(([x, y], i) => (
          <path key={i} d={`M${x} ${y} q3 -5 6 0`} fill="none" strokeWidth="1.5" className="stroke-current text-sky-700" />
        ))}
        <text x="470" y="164" fontSize="8" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">biflagellate sperm — must swim</text>
        <text x="356" y="192" fontSize="8.5" className="fill-current text-muted-foreground">sac on a stalk; splits open in rain or dew</text>
        <text x="356" y="208" fontSize="8.5" className="fill-current text-muted-foreground">fertilisation needs a film of water</text>
      </g>
      <text x="16" y="246" fontSize="10" className="fill-current text-muted-foreground">This water dependence is why bryophytes stay small and damp-loving — the 'amphibian' nickname is literal.</text>
    </svg>
  );
}
