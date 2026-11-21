/** Endosymbiotic theory — steps from host cell to eukaryote. Well-detailed. Theme-aware. */
export function EndosymbioticTheory({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Endosymbiotic theory steps ancestral anaerobic host cell engulfs aerobic bacterium which becomes mitochondrion and cyanobacterium which becomes chloroplast evidence double membrane circular DNA 70S ribosomes binary fission">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Endosymbiotic theory — how cells gained organelles</text>

      {/* step 1 */}
      <rect x="30" y="44" width="200" height="130" rx="12" className="fill-current text-stone-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <text x="130" y="64" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">1. ANAEROBIC HOST</text>
      <circle cx="130" cy="120" r="38" className="fill-none stroke-current text-stone-500" strokeWidth="2.5" />
      <text x="130" y="124" fontSize="6.5" textAnchor="middle" className="fill-current text-muted-foreground">no organelles</text>
      <text x="130" y="160" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">fermenting archaeon-like cell</text>

      {/* step 2 */}
      <rect x="255" y="44" width="200" height="130" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="355" y="64" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">2. ENGULFS AEROBE</text>
      <circle cx="355" cy="120" r="38" className="fill-none stroke-current text-stone-500" strokeWidth="2.5" />
      <ellipse cx="355" cy="120" rx="16" ry="10" className="fill-current text-rose-500/30" stroke="currentColor" strokeWidth="2" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="355" y="176" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">aerobic bacterium taken in — kept, not digested</text>

      {/* step 3 */}
      <rect x="480" y="44" width="210" height="130" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <text x="585" y="64" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">3. EUKARYOTE BORN</text>
      <circle cx="585" cy="120" r="38" className="fill-none stroke-current text-stone-500" strokeWidth="2.5" />
      <ellipse cx="570" cy="112" rx="14" ry="9" className="fill-current text-rose-500/30" stroke="currentColor" strokeWidth="2" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <ellipse cx="602" cy="130" rx="12" ry="8" className="fill-current text-emerald-500/30" stroke="currentColor" strokeWidth="2" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <text x="585" y="176" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">mitochondrion + (in plants) chloroplast from cyanobacterium</text>

      {/* evidence */}
      <rect x="30" y="196" width="660" height="88" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="50" y="220" fontSize="8.6" className="fill-current text-foreground" fontWeight="700">FOUR LINES OF EVIDENCE:</text>
      <text x="50" y="240" fontSize="8" className="fill-current text-muted-foreground">1. double membranes (own + host-derived)  2. circular DNA like bacteria  3. 70S ribosomes like bacteria</text>
      <text x="50" y="258" fontSize="8" className="fill-current text-muted-foreground">4. divide by binary fission, independent of the nucleus — mitochondria and chloroplasts replicate themselves</text>
      <text x="50" y="276" fontSize="7.6" className="fill-current text-muted-foreground">Explains why mitochondria are maternally inherited (egg cytoplasm) and why antibiotic action hits organelle ribosomes.</text>
    </svg>
  );
}
