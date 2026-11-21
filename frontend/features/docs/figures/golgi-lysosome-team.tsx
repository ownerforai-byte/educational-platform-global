/** Golgi-lysosome team — packaging to digestion pathway. Well-detailed. Theme-aware. */
export function GolgiLysosomeTeam({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Golgi and lysosome team Golgi cisternae cis and trans faces receiving vesicles from ER shipping secretory vesicles to membrane and lysosomes budding with hydrolytic enzymes digesting worn out organelles autophagy recycling">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Golgi → lysosome — the packaging and recycling line</text>

      {/* Golgi stack */}
      <rect x="40" y="44" width="300" height="150" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="190" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">GOLGI APPARATUS</text>
      {[0, 1, 2, 3].map((i) => (
        <path key={i} d={`M80 ${92 + i * 20} q55 -12 110 0 q55 12 110 0`} className="fill-none stroke-current text-amber-600" strokeWidth="3" />
      ))}
      <text x="80" y="86" fontSize="7.2" className="fill-current text-emerald-600" fontWeight="700">cis face (receives from ER)</text>
      <text x="255" y="180" fontSize="7.2" textAnchor="end" className="fill-current text-rose-500" fontWeight="700">trans face (ships out)</text>
      <text x="80" y="182" fontSize="7" className="fill-current text-muted-foreground">modifies, sorts, tags proteins</text>

      {/* vesicle flow */}
      <circle cx="380" cy="90" r="10" className="fill-current text-emerald-500/30" stroke="currentColor" strokeWidth="2" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <text x="380" y="70" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">from ER</text>
      <circle cx="380" cy="150" r="10" className="fill-current text-sky-500/30" stroke="currentColor" strokeWidth="2" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="410" y="154" fontSize="6.8" className="fill-current text-muted-foreground">secretory vesicle → membrane</text>

      {/* lysosome */}
      <rect x="470" y="44" width="220" height="150" rx="12" className="fill-current text-orange-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(249 115 22 / 0.9)" }} />
      <text x="580" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">LYSOSOME</text>
      <circle cx="580" cy="120" r="30" className="fill-current text-orange-500/25" stroke="currentColor" strokeWidth="2.5" style={{ color: "rgb(249 115 22 / 0.9)" }} />
      {[[565, 110], [595, 115], [575, 132], [592, 100]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4" className="fill-current text-orange-700" />
      ))}
      <text x="580" y="172" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">acidic sac of ~50 hydrolytic enzymes (pH ~5)</text>

      {/* actions */}
      <rect x="30" y="212" width="660" height="72" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="50" y="234" fontSize="8.4" className="fill-current text-foreground" fontWeight="700">Heterophagy: digests material taken in from outside · Autophagy: digests the cell's own worn-out organelles.</text>
      <text x="50" y="254" fontSize="8" className="fill-current text-muted-foreground">Suicide bags: rupture releases enzymes that digest the cell itself (programmed destruction, metamorphosis).</text>
      <text x="50" y="272" fontSize="8" className="fill-current text-muted-foreground">Recycling: monomers return to the cytoplasm for reuse — the cell's stomach and scrapyard in one.</text>
    </svg>
  );
}
