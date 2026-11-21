/** Pond functional groups — producers, consumers, decomposers. Well-detailed. Theme-aware. */
export function PondFunctionalGroups({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Pond ecosystem functional groups producers phytoplankton rooted plants consumers zooplankton fish decomposers bacteria fungi bottom mud energy flow">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">One pond, three working groups</text>

      {/* pond cross-section */}
      <rect x="30" y="44" width="660" height="220" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      {/* water body */}
      <rect x="50" y="70" width="620" height="160" rx="8" className="fill-current text-sky-400/15" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <rect x="50" y="230" width="620" height="0" />
      <rect x="50" y="222" width="620" height="8" rx="3" className="fill-current text-stone-600/40" />
      <text x="640" y="220" fontSize="6.4" className="fill-current text-muted-foreground">bottom mud</text>

      {/* producers */}
      <text x="66" y="90" fontSize="7.6" className="fill-current text-emerald-600" fontWeight="800">PRODUCERS</text>
      {[80, 110, 140, 620, 648].map((x, i) => (
        <path key={i} d={`M${x} 224 q${i % 2 ? 8 : -8} -30 0 -60`} className="fill-none stroke-current text-emerald-600" strokeWidth="2.4" style={{ color: "rgb(5 122 85 / 0.9)" }} />
      ))}
      {[240, 280, 320].map((x, i) => (
        <circle key={i} cx={x} cy={92 + i * 8} r="4" className="fill-current text-emerald-500/60" />
      ))}
      <text x="280" y="78" fontSize="6.4" className="fill-current text-emerald-600">phytoplankton</text>

      {/* consumers */}
      <text x="66" y="132" fontSize="7.6" className="fill-current text-sky-700" fontWeight="800">CONSUMERS</text>
      {/* zooplankton */}
      {[380, 410].map((x, i) => (
        <circle key={i} cx={x} cy={100 + i * 10} r="5" className="fill-none stroke-current text-sky-600" strokeWidth="1.6" />
      ))}
      <text x="395" y="128" fontSize="6.4" className="fill-current text-sky-600">zooplankton</text>
      {/* fish */}
      <path d="M480 150 q16 -8 30 0 q-14 8 -30 0 M510 150 l10 -6 v12" className="fill-current text-sky-600/40" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="495" y="172" fontSize="6.4" className="fill-current text-sky-600">fish</text>

      {/* decomposers */}
      <text x="66" y="252" fontSize="7.6" className="fill-current text-amber-700" fontWeight="800">DECOMPOSERS — bacteria and fungi in the mud, recycling every fallen bit</text>
      {[200, 260, 320, 380, 440, 500, 560].map((x, i) => (
        <circle key={i} cx={x} cy={248} r="2.6" className="fill-current text-amber-700/70" />
      ))}
      <text x="66" y="104" fontSize="6.4" className="fill-current text-muted-foreground">rooted and floating plants fix the sunlight; animals eat; decomposers close the loop</text>
    </svg>
  );
}
