/**
 * Nucleic acids — nucleotide anatomy (sugar + phosphate + base) →
 * polynucleotide chain → DNA double helix with A-T / G-C pairing.
 * Theme-aware via currentColor.
 */
export function NucleotideDnaHelix({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 320" className={className} role="img" aria-label="Nucleotide anatomy with phosphate sugar and nitrogen base, a polynucleotide chain with phosphodiester backbone, and the DNA double helix showing complementary base pairing A with T and G with C">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Nucleic acids — from nucleotide to double helix</text>

      {/* nucleotide anatomy */}
      <text x="16" y="56" fontSize="11.5" className="fill-current text-violet-600 dark:text-violet-400" fontWeight="800">1 · One nucleotide = phosphate + sugar + nitrogen base</text>
      <circle cx="90" cy="90" r="16" className="fill-current text-sky-500/25" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="90" y="94" fontSize="8.5" textAnchor="middle" className="fill-current text-sky-700 dark:text-sky-300" fontWeight="800">P</text>
      <line x1="106" y1="90" x2="140" y2="90" strokeWidth="2.5" className="stroke-current text-foreground" />
      <polygon points="140,74 168,74 168,106 140,106" className="fill-current text-emerald-500/20" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="154" y="94" fontSize="8.5" textAnchor="middle" className="fill-current text-emerald-700 dark:text-emerald-300" fontWeight="800">sugar</text>
      <line x1="168" y1="90" x2="200" y2="90" strokeWidth="2.5" className="stroke-current text-foreground" />
      <polygon points="200,64 236,90 200,116" className="fill-current text-rose-500/20" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="212" y="94" fontSize="8.5" className="fill-current text-rose-700 dark:text-rose-300" fontWeight="800">base</text>
      <text x="250" y="80" fontSize="9.5" className="fill-current text-muted-foreground">DNA: A T G C · RNA: A U G C</text>
      <text x="250" y="96" fontSize="9.5" className="fill-current text-muted-foreground">sugar: deoxyribose (DNA) · ribose (RNA)</text>

      {/* polynucleotide chain */}
      <text x="16" y="150" fontSize="11.5" className="fill-current text-violet-600 dark:text-violet-400" fontWeight="800">2 · Chain — phosphodiester bonds link sugar→phosphate (backbone)</text>
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <polygon points={`${70 + i * 90},172 ${98 + i * 90},172 ${98 + i * 90},198 ${70 + i * 90},198`} className="fill-current text-emerald-500/20" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
          <text x={`${84 + i * 90}`} y="190" fontSize="8" textAnchor="middle" className="fill-current text-emerald-700 dark:text-emerald-300" fontWeight="700">S</text>
          <circle cx={116 + i * 90} cy="185" r="11" className="fill-current text-sky-500/25" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
          <text x={116 + i * 90} y="189" fontSize="8" textAnchor="middle" className="fill-current text-sky-700 dark:text-sky-300" fontWeight="700">P</text>
          <line x1={98 + i * 90} y1="185" x2={105 + i * 90} y2="185" strokeWidth="2" className="stroke-current text-foreground" />
          <line x1={127 + i * 90} y1="185" x2={142 + i * 90} y2="185" strokeWidth="2" className="stroke-current text-foreground" />
        </g>
      ))}

      {/* double helix */}
      <text x="16" y="240" fontSize="11.5" className="fill-current text-violet-600 dark:text-violet-400" fontWeight="800">3 · DNA — two antiparallel strands twist into a double helix</text>
      <path d="M70 258 q30 -14 60 0 q30 14 60 0 q30 -14 60 0 q30 14 60 0 q30 -14 60 0" fill="none" strokeWidth="4" className="stroke-current text-violet-500" />
      <path d="M70 296 q30 14 60 0 q30 -14 60 0 q30 14 60 0 q30 -14 60 0 q30 14 60 0" fill="none" strokeWidth="4" className="stroke-current text-violet-400" style={{ color: "rgb(167 139 250 / 0.9)" }} />
      <g className="stroke-current text-rose-500" strokeWidth="2.5" style={{ color: "rgb(244 63 94 / 0.85)" }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <line key={i} x1={80 + i * 46} y1="260" x2={92 + i * 46} y2="294" />
        ))}
      </g>
      <text x="400" y="266" fontSize="9.5" className="fill-current text-rose-600 dark:text-rose-400" fontWeight="800">A = T (2 H-bonds) · G ≡ C (3 H-bonds)</text>
      <text x="400" y="282" fontSize="9.5" className="fill-current text-muted-foreground">complementary pairing → exact replication possible</text>
      <text x="400" y="298" fontSize="9.5" className="fill-current text-muted-foreground">RNA: single-stranded, ribose, U instead of T</text>
      <text x="16" y="314" fontSize="10" className="fill-current text-muted-foreground">Function: DNA stores heredity; mRNA carries the message, tRNA delivers amino acids, rRNA builds the ribosome.</text>
    </svg>
  );
}
