/** Chemistry biology link — the molecule connection. Well-detailed. Theme-aware. */
export function ChemistryBiologyLink({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Chemistry biology link biochemistry molecules DNA protein enzymes metabolism pH organic chemistry connection between sciences">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Chemistry ↔ biology — the molecule connection</text>

      {/* what chemistry gives */}
      <rect x="30" y="44" width="330" height="220" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHAT CHEMISTRY LENDS</text>
      {[
        "organic chemistry → the carbon",
        "  backbone of every biomolecule",
        "biochemistry → enzymes, metabolism,",
        "  the Krebs cycle, ATP",
        "pH and buffers → why blood holds",
        "  steady at 7.4",
      ].map((t, i) => (
        <text key={t} x="50" y={94 + i * 17} fontSize="7.2" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      {/* molecule icon */}
      {[[90, 200], [130, 190], [170, 200], [130, 226]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="9" className="fill-current text-sky-500/40" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      ))}
      <line x1="99" y1="200" x2="121" y2="192" className="stroke-current text-sky-500" strokeWidth="2" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <line x1="139" y1="190" x2="161" y2="200" className="stroke-current text-sky-500" strokeWidth="2" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <line x1="130" y1="199" x2="130" y2="217" className="stroke-current text-sky-500" strokeWidth="2" style={{ color: "rgb(2 132 199 / 0.9)" }} />

      {/* biochemistry examples */}
      <rect x="390" y="44" width="300" height="220" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHERE YOU SEE IT</text>
      {[
        "photosynthesis is redox chemistry",
        "digestion is hydrolysis",
        "respiration is controlled burning",
        "DNA pairing follows bonding rules",
        "hormones are signalling molecules",
        "drugs work by molecular shape",
      ].map((t, i) => (
        <text key={t} x="410" y={94 + i * 17} fontSize="7.2" className="fill-current text-muted-foreground">• {t}</text>
      ))}
      <text x="410" y="204" fontSize="7" className="fill-current text-emerald-600" fontWeight="700">You cannot understand life without</text>
      <text x="410" y="218" fontSize="7" className="fill-current text-emerald-600" fontWeight="700">its chemistry — the syllabus agrees:</text>
      <text x="410" y="232" fontSize="7" className="fill-current text-emerald-600" fontWeight="700">Unit 1 is pure biomolecules.</text>
      <text x="410" y="256" fontSize="7" className="fill-current text-muted-foreground">Exam hook: name one process that is</text>
      <text x="410" y="270" fontSize="7" className="fill-current text-muted-foreground">really a chemical reaction.</text>
    </svg>
  );
}
