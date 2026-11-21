/** Biochemical molecular tests — cytochrome c and DNA. Well-detailed. Theme-aware. */
export function BiochemicalMolecularTests({ className }: { className?: string }) {
  const rows: [string, number][] = [["chimpanzee", 0], ["rhesus monkey", 1], ["horse", 12], ["tuna", 21], ["yeast", 44]];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Biochemical molecular tests cytochrome c amino acid differences human versus chimpanzee rhesus horse tuna yeast DNA similarity bar chart">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Biochemical evidence — counting amino acid differences</text>
      {rows.map(([name, v], i) => {
        const x = 150;
        const y = 56 + i * 40;
        return (
          <g key={name}>
            <text x="140" y={y + 14} fontSize="7.4" textAnchor="end" className="fill-current text-foreground" fontWeight="700">{name}</text>
            <rect x={x} y={y} width={Math.max(v * 8, 4)} height="24" rx="4" className="fill-current text-sky-500/35" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(2 132 199 / 0.9)" }} />
            <text x={x + Math.max(v * 8, 4) + 10} y={y + 16} fontSize="7.6" className="fill-current text-foreground" fontWeight="700">{v}</text>
          </g>
        );
      })}
      <text x="150" y="266" fontSize="6.6" className="fill-current text-muted-foreground">amino acid differences in cytochrome c, relative to human</text>
      <rect x="420" y="48" width="270" height="212" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="555" y="70" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHY IT CONVINCES</text>
      {[
        "the same molecule (cytochrome c)",
        "  runs respiration in every eukaryote",
        "closer relatives differ less —",
        "  a molecular family tree",
        "DNA hybridisation and sequences",
        "  confirm the fossil tree independently",
        "biochemistry does not fossilise —",
        "  it is evidence from living bodies",
      ].map((t, i) => (
        <text key={t} x="436" y={94 + i * 17} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="272" width="660" height="20" rx="6" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="286" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: human and chimpanzee cytochrome c are identical — 0 differences — the strongest single number in this topic.</text>
    </svg>
  );
}
