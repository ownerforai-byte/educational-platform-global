/** Three domains — defining characters table. Well-detailed. Theme-aware. */
export function ThreeDomainsFeatures({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Three domains defining characters bacteria archaea eukarya compared by cell type membrane lipids cell wall RNA polymerase introns and examples">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Three domains — what actually separates them</text>

      {/* header */}
      {[
        { x: 250, t: "BACTERIA", c: "rgb(14 165 233 / 0.9)" },
        { x: 440, t: "ARCHAEA", c: "rgb(245 158 11 / 0.9)" },
        { x: 620, t: "EUKARYA", c: "rgb(139 92 246 / 0.9)" },
      ].map((h) => (
        <g key={h.t}>
          <rect x={h.x - 82} y="40" width="164" height="26" rx="8" style={{ color: h.c }} className="fill-current opacity-15" />
          <text x={h.x} y="58" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{h.t}</text>
        </g>
      ))}

      {[
        { l: "Nucleus", a: "absent", b: "absent", c: "present" },
        { l: "Membrane lipids", a: "ester-linked", b: "ether-linked (unique)", c: "ester-linked" },
        { l: "Cell wall", a: "peptidoglycan", b: "pseudopeptidoglycan", c: "varies (none in animals)" },
        { l: "RNA polymerase", a: "one simple", b: "one complex", c: "several complex" },
        { l: "Introns", a: "rare", b: "some genes", c: "common" },
        { l: "Examples", a: "E. coli, cyanobacteria", b: "halophiles, thermophiles", c: "protists, fungi, plants, animals" },
      ].map((r, i) => (
        <g key={r.l}>
          <text x="20" y={92 + i * 30} fontSize="7.4" className="fill-current text-foreground" fontWeight="700">{r.l}</text>
          <text x="250" y={92 + i * 30} fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">{r.a}</text>
          <text x="440" y={92 + i * 30} fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">{r.b}</text>
          <text x="620" y={92 + i * 30} fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">{r.c}</text>
          <line x1="18" y1={100 + i * 30} x2="702" y2={100 + i * 30} strokeWidth="1" className="stroke-current text-muted-foreground opacity-25" />
        </g>
      ))}

      <text x="16" y="290" fontSize="8.4" className="fill-current text-muted-foreground">Woese split the old 'prokaryotes' using ribosomal RNA — Archaea look bacterial but their biochemistry is closer to eukaryotes.</text>
    </svg>
  );
}
