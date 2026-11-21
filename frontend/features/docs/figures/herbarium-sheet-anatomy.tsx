/** Herbarium sheet anatomy — press, dry, mount, label. Well-detailed. Theme-aware. */
export function HerbariumSheetAnatomy({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Herbarium sheet anatomy pressed dried plant mounted on card label with scientific name family place date collector museum reference preserved specimen taxonomy">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Inside a herbarium sheet</text>

      {/* the sheet */}
      <rect x="30" y="44" width="400" height="220" rx="12" className="fill-current text-stone-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <text x="230" y="64" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">CARDSTOCK SHEET (~29 × 41 cm)</text>
      {/* pressed plant */}
      <path d="M90 200 L150 120" className="stroke-current text-emerald-700" strokeWidth="3" style={{ color: "rgb(20 83 45 / 0.9)" }} />
      {[0, 1, 2, 3].map((j) => (
        <g key={j}>
          <ellipse cx={104 + j * 14} cy={184 - j * 18} rx="12" ry="5" className="fill-current text-emerald-600/40" transform={`rotate(-40 ${104 + j * 14} ${184 - j * 18})`} />
          <ellipse cx={132 + j * 12} cy={176 - j * 18} rx="12" ry="5" className="fill-current text-emerald-600/40" transform={`rotate(40 ${132 + j * 12} ${176 - j * 18})`} />
        </g>
      ))}
      {/* flowers at tip */}
      {[[160, 108], [172, 100], [150, 100]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="5" className="fill-current text-rose-400/50" stroke="currentColor" strokeWidth="1" />
      ))}
      {/* tape strips */}
      {[[100, 190], [140, 150], [158, 118]].map(([x, y], i) => (
        <rect key={i} x={x - 4} y={y - 2} width="8" height="18" rx="2" className="fill-current text-stone-300/50" transform={`rotate(${-40 + i * 10} ${x} ${y})`} />
      ))}
      {/* label */}
      <rect x="280" y="180" width="130" height="66" rx="6" className="fill-current text-slate-100/20" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(148 163 184 / 0.9)" }} />
      <text x="290" y="198" fontSize="6.6" className="fill-current text-foreground" fontWeight="700">Scientific name + family</text>
      <text x="290" y="212" fontSize="6.4" className="fill-current text-muted-foreground">Place &amp; altitude collected</text>
      <text x="290" y="226" fontSize="6.4" className="fill-current text-muted-foreground">Date + collector's name</text>
      <text x="290" y="240" fontSize="6.4" className="fill-current text-muted-foreground">Local name, notes</text>
      <text x="290" y="252" fontSize="6.2" className="fill-current text-muted-foreground">accession number</text>

      {/* process card */}
      <rect x="450" y="44" width="240" height="220" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="570" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">HOW ONE IS MADE</text>
      {[
        "1. collect fresh specimen",
        "2. press between blotters",
        "3. dry with gentle heat",
        "4. mount with glue / strips",
        "5. label with full data",
        "6. poison against insects",
        "7. file by family in cabinets",
      ].map((t, i) => (
        <text key={t} x="466" y={94 + i * 23} fontSize="7.4" className="fill-current text-muted-foreground">• {t}</text>
      ))}
      <text x="466" y="256" fontSize="7.2" className="fill-current text-muted-foreground">A label without data is nearly</text>
      <text x="466" y="270" fontSize="7.2" className="fill-current text-muted-foreground">worthless — the record IS the science.</text>
    </svg>
  );
}
