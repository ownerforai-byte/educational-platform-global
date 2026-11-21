/** Plasmid and mesosome — the bacterial extras. Well-detailed. Theme-aware. */
export function BacterialPlasmidMesosome({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Bacterial plasmid extra circular DNA antibiotic resistance gene transfer mesosome infolding respiration cell division nucleoid chromosome prokaryote extras">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Two bacterial extras worth marks</text>

      {/* plasmid panel */}
      <rect x="30" y="44" width="330" height="220" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="195" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">PLASMID — the spare chromosome</text>
      {/* nucleoid DNA */}
      <path d="M80 130 q30 -30 60 0 q30 30 60 0 q20 -20 40 -4" className="fill-none stroke-current text-stone-500" strokeWidth="3" style={{ color: "rgb(120 113 108 / 0.8)" }} />
      <text x="120" y="170" fontSize="7" className="fill-current text-muted-foreground">main chromosome (nucleoid)</text>
      {/* plasmid rings */}
      {[[230, 120], [280, 150]].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={18 - i * 5} className="fill-none stroke-current text-sky-500" strokeWidth="3" style={{ color: "rgb(14 165 233 / 0.9)" }} />
          <rect x={x - 6} y={y - 4} width="12" height="8" rx="2" className="fill-current text-rose-400/60" />
        </g>
      ))}
      <text x="230" y="186" fontSize="7.2" className="fill-current text-sky-600" fontWeight="700">small circular DNA + resistance genes</text>
      {[
        "self-replicating, independent",
        "carries antibiotic resistance",
        "transferable between cells",
        "biotech's favourite vector",
      ].map((t, i) => (
        <text key={t} x="50" y={210 + i * 14} fontSize="7" className="fill-current text-muted-foreground">• {t}</text>
      ))}

      {/* mesosome panel */}
      <rect x="390" y="44" width="300" height="220" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="540" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">MESOSOME — the folded infolding</text>
      {/* cell with folded membrane */}
      <rect x="430" y="90" width="220" height="110" rx="20" className="fill-current text-amber-500/15" stroke="currentColor" strokeWidth="2.4" style={{ color: "rgb(180 130 40 / 0.9)" }} />
      <path d="M450 110 q30 10 40 30 q10 20 30 14 q26 -8 40 12" className="fill-none stroke-current text-amber-600" strokeWidth="3.4" style={{ color: "rgb(180 130 40 / 0.9)" }} />
      <text x="540" y="216" fontSize="7.2" textAnchor="middle" className="fill-current text-amber-600" fontWeight="700">infolded plasma membrane — mesosome</text>
      {[
        "boosts respiration surface (prokaryote)",
        "helps wall build during cell division",
        " DNA separation at division",
      ].map((t, i) => (
        <text key={t} x="410" y={240 + i * 14} fontSize="7" className="fill-current text-muted-foreground">• {t}</text>
      ))}
    </svg>
  );
}
