/** TMV structure — the helical rod that proved viruses exist. Well-detailed. Theme-aware. */
export function TMVStructure({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="TMV tobacco mosaic virus structure helical rod capsomeres RNA single stranded genome 300 nm long 18 nm wide plant virus symptoms mosaic mottling">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">TMV — the helical rod</text>

      {/* whole rod */}
      <rect x="30" y="44" width="400" height="220" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="230" y="64" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">300 nm long, 18 nm wide</text>
      <rect x="70" y="100" width="320" height="40" rx="20" className="fill-current text-emerald-500/20" stroke="currentColor" strokeWidth="2.2" style={{ color: "rgb(5 122 85 / 0.9)" }} />
      {/* capsomere helix hint */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((j) => (
        <line key={j} x1={80 + j * 40} y1="100" x2={100 + j * 40} y2="140" className="stroke-current text-emerald-600" strokeWidth="1.8" style={{ color: "rgb(5 122 85 / 0.9)" }} />
      ))}
      {/* RNA spiral */}
      <path d="M85 120 q20 -14 40 0 q20 14 40 0 q20 -14 40 0 q20 14 40 0 q20 -14 40 0 q20 14 40 0 q20 -14 40 0" className="fill-none stroke-current text-rose-500" strokeWidth="2.4" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="230" y="164" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">capsomeres in a helix around a single-stranded RNA core</text>
      {[
        "capsid = protein coat, 2,130 identical subunits",
        "genome = one RNA strand (no DNA)",
        "no envelope — naked plant virus",
      ].map((t, i) => (
        <text key={t} x="50" y={190 + i * 18} fontSize="7.2" className="fill-current text-muted-foreground">• {t}</text>
      ))}
      <text x="50" y="252" fontSize="7.2" className="fill-current text-emerald-600">First virus ever crystallised (Stanley, 1935) —</text>
      <text x="50" y="266" fontSize="7.2" className="fill-current text-emerald-600">the crystal still infected plants: life in a jar.</text>

      {/* disease card */}
      <rect x="450" y="44" width="240" height="220" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="570" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE DISEASE</text>
      {/* leaf with mosaic */}
      <path d="M570 96 q-44 18 -44 58 q0 40 44 58 q44 -18 44 -58 q0 -40 -44 -58" className="fill-current text-lime-600/25" stroke="currentColor" strokeWidth="2" style={{ color: "rgb(101 163 13 / 0.9)" }} />
      <path d="M570 100 v108" className="stroke-current text-lime-700" strokeWidth="1.6" style={{ color: "rgb(77 124 15 / 0.9)" }} />
      {[[556, 130], [586, 148], [554, 166], [584, 186], [560, 204]].map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx="8" ry="6" className="fill-current text-amber-500/45" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      ))}
      <text x="570" y="232" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">mosaic mottling: light + dark green patches</text>
      {[
        "stunts tobacco plants",
        "spreads by contact, tools",
        "no cure — control by clean",
        "seed and resistant varieties",
      ].map((t, i) => (
        <text key={t} x="466" y={248 + i * 13} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : t}</text>
      ))}
    </svg>
  );
}
