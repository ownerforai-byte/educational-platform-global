/** Genome types — four ways to store viral heredity. Well-detailed. Theme-aware. */
export function VirusGenomeTypes({ className }: { className?: string }) {
  const types: [string, string, string, string][] = [
    ["dsDNA", "double-stranded DNA", "adenovirus, poxvirus", "rgb(2 132 199)"],
    ["ssDNA", "single-stranded DNA", "parvovirus", "rgb(14 165 233)"],
    ["ssRNA (+)", "positive-sense RNA, acts as mRNA", "TMV, poliovirus", "rgb(22 163 74)"],
    ["ssRNA (−)", "negative-sense RNA, needs own enzyme", "influenza, rabies", "rgb(245 158 11)"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Virus genome types double stranded DNA single stranded RNA positive negative sense Baltimore classification retrovirus reverse transcriptase examples">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Four ways to store a viral genome</text>
      {types.map(([name, detail, ex, rgb], i) => {
        const x = 30 + i * 170;
        const cx = x + 85;
        return (
          <g key={name}>
            <rect x={x} y="44" width="160" height="200" rx="12" className="fill-current text-slate-500/10" strokeWidth="2" stroke="currentColor" style={{ color: `${rgb} / 0.9` }} />
            <text x={cx} y="66" fontSize="8.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{name}</text>
            {/* genome icon */}
            {i === 0 && (
              <g>
                <path d={`M${cx - 30} 110 q14 -16 30 0 q14 16 30 0`} className="fill-none stroke-current" strokeWidth="2.6" style={{ color: rgb }} />
                <path d={`M${cx - 30} 122 q14 16 30 0 q14 -16 30 0`} className="fill-none stroke-current" strokeWidth="2.6" style={{ color: rgb }} />
                {[0, 1, 2].map((j) => <line key={j} x1={cx - 24 + j * 22} y1="112" x2={cx - 24 + j * 22} y2="120" className="stroke-current" strokeWidth="1.6" style={{ color: rgb }} />)}
              </g>
            )}
            {i === 1 && <path d={`M${cx - 30} 116 q14 -18 30 0 q14 18 30 0`} className="fill-none stroke-current" strokeWidth="2.6" style={{ color: rgb }} />}
            {i === 2 && <path d={`M${cx - 30} 116 q14 -18 30 0 q14 18 30 0`} className="fill-none stroke-current" strokeWidth="2.6" style={{ color: rgb }} strokeDasharray="1 0" />}
            {i === 3 && <path d={`M${cx - 30} 116 q14 -18 30 0 q14 18 30 0`} className="fill-none stroke-current" strokeWidth="2.6" style={{ color: rgb }} strokeDasharray="4 3" />}
            <text x={cx} y="150" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">{detail.slice(0, 30)}</text>
            <text x={cx} y="164" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">{detail.slice(30, 60)}</text>
            <text x={cx} y="188" fontSize="7" textAnchor="middle" className="fill-current" style={{ color: rgb }}>{ex}</text>
            <text x={cx} y="214" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">{["most stable", "rare, small", "can translate directly", "must copy first"][i]}</text>
            <text x={cx} y="230" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">{["DNA viruses", "DNA viruses", "RNA viruses", "RNA viruses"][i]}</text>
          </g>
        );
      })}
      <rect x="30" y="258" width="660" height="34" rx="8" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="272" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Never both: a virus carries DNA or RNA, never both — the sharpest line separating it from every cell.</text>
      <text x="360" y="286" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: retroviruses (HIV) add a fifth route — RNA copied backwards into DNA by reverse transcriptase.</text>
    </svg>
  );
}
