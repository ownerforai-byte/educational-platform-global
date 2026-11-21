/**
 * Four classes of biomolecules — carbohydrates, proteins, lipids and nucleic
 * acids with monomer → polymer icons and functions. Theme-aware via currentColor.
 */
export function BiomoleculeClasses({ className }: { className?: string }) {
  const panels = [
    {
      x: 16, name: "Carbohydrates", color: "rgb(16 185 129)", tw: "text-emerald-700 dark:text-emerald-300",
      monomer: "monosaccharide (glucose)", fn: "quick energy · structure (cellulose)",
      formula: "(CH₂O)n",
    },
    {
      x: 172, name: "Proteins", color: "rgb(14 165 233)", tw: "text-sky-700 dark:text-sky-300",
      monomer: "amino acid (20 types)", fn: "enzymes · growth · transport",
      formula: "C · H · O · N (+S)",
    },
    {
      x: 328, name: "Lipids", color: "rgb(245 158 11)", tw: "text-amber-700 dark:text-amber-300",
      monomer: "glycerol + fatty acids", fn: "stored energy · membranes",
      formula: "C · H · O (less O)",
    },
    {
      x: 484, name: "Nucleic acids", color: "rgb(139 92 246)", tw: "text-violet-700 dark:text-violet-300",
      monomer: "nucleotide (base+ sugar+ phosphate)", fn: "heredity · protein synthesis",
      formula: "DNA · RNA",
    },
  ];
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Four classes of biomolecules — carbohydrates, proteins, lipids and nucleic acids — with their monomers, elements and functions">
      {panels.map((p) => (
        <g key={p.name}>
          <rect x={p.x} y="24" width="146" height="186" rx="14" className="fill-current opacity-[0.06]" strokeWidth="2.5" stroke="currentColor" style={{ color: p.color }} />
          <text x={p.x + 73} y="50" textAnchor="middle" fontSize="13" className={`fill-current ${p.tw}`} fontWeight="800">{p.name}</text>
          <text x={p.x + 73} y="68" textAnchor="middle" fontSize="9" className="fill-current text-muted-foreground" fontWeight="700">{p.formula}</text>
          {/* monomer icon */}
          <g style={{ color: p.color }}>
            {p.name === "Carbohydrates" && (
              <g className="stroke-current" strokeWidth="2.5" fill="none">
                <polygon points={`${p.x + 58},86 ${p.x + 66},81 ${p.x + 74},86 ${p.x + 74},96 ${p.x + 66},101 ${p.x + 58},96`} />
                <polygon points={`${p.x + 76},96 ${p.x + 84},91 ${p.x + 92},96 ${p.x + 92},106 ${p.x + 84},111 ${p.x + 76},106`} />
                <line x1={`${p.x + 74}`} y1="96" x2={`${p.x + 76}`} y2="96" />
              </g>
            )}
            {p.name === "Proteins" && (
              <g className="fill-current">
                <circle cx={p.x + 62} cy="94" r="6" /><circle cx={p.x + 76} cy="94" r="6" /><circle cx={p.x + 90} cy="94" r="6" />
                <line x1={p.x + 68} y1="94" x2={p.x + 70} y2="94" strokeWidth="2.5" /><line x1={p.x + 82} y1="94" x2={p.x + 84} y2="94" strokeWidth="2.5" />
              </g>
            )}
            {p.name === "Lipids" && (
              <g className="stroke-current" strokeWidth="2.5" fill="none">
                <circle cx={p.x + 60} cy="94" r="7" />
                <line x1={p.x + 67} y1="94" x2={p.x + 96} y2="88" /><line x1={p.x + 67} y1="94" x2={p.x + 96} y2="100" />
              </g>
            )}
            {p.name === "Nucleic acids" && (
              <g className="stroke-current" strokeWidth="2" fill="none">
                <line x1={p.x + 58} y1="80" x2={p.x + 58} y2="108" />
                <line x1={p.x + 74} y1="80" x2={p.x + 74} y2="108" />
                <line x1={p.x + 58} y1="84" x2={p.x + 74} y2="90" /><line x1={p.x + 58} y1="94" x2={p.x + 74} y2="94" /><line x1={p.x + 58} y1="104" x2={p.x + 74} y2="98" />
              </g>
            )}
          </g>
          <text x={p.x + 73} y="132" textAnchor="middle" fontSize="9.5" className="fill-current text-foreground" fontWeight="700">monomer:</text>
          <text x={p.x + 73} y="146" textAnchor="middle" fontSize="9" className="fill-current text-muted-foreground">{p.monomer}</text>
          <line x1={p.x + 20} y1="156" x2={p.x + 126} y2="156" strokeWidth="1" className="stroke-current text-border" />
          <text x={p.x + 73} y="172" textAnchor="middle" fontSize="9.5" className="fill-current text-foreground" fontWeight="700">functions:</text>
          <text x={p.x + 73} y="187" textAnchor="middle" fontSize="9" className="fill-current text-muted-foreground">{p.fn}</text>
        </g>
      ))}
      <text x="330" y="232" textAnchor="middle" fontSize="10" className="fill-current text-muted-foreground">Water and minerals complete the biomolecule list — the medium and the ionic cofactors of every reaction.</text>
    </svg>
  );
}
