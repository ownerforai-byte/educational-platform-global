/**
 * Recombinant DNA technology steps — donor DNA cut, vector cut, ligase
 * joins, transform host, select clones. Theme-aware via currentColor.
 */
export function RecombinantDnaSteps({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 320" className={className} role="img" aria-label="Recombinant DNA technology steps: restriction enzymes cut donor DNA and plasmid, DNA ligase seals the insert into the vector, the recombinant plasmid transforms bacteria and clones are selected">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Recombinant DNA — cutting, pasting, cloning a gene</text>

      {/* donor */}
      <text x="16" y="58" fontSize="11" className="fill-current text-sky-700 dark:text-sky-300" fontWeight="800">① Donor DNA (human insulin gene)</text>
      <rect x="16" y="68" width="180" height="16" rx="4" className="fill-current text-sky-500/30" />
      <rect x="70" y="64" width="70" height="24" rx="4" className="fill-current text-rose-500/40" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.95)" }} />
      <text x="105" y="80" fontSize="8" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">gene</text>
      <text x="230" y="80" fontSize="9" className="fill-current text-muted-foreground">restriction enzyme cuts at palindromic sites → sticky ends</text>

      {/* vector */}
      <text x="16" y="128" fontSize="11" className="fill-current text-emerald-700 dark:text-emerald-300" fontWeight="800">② Vector — bacterial plasmid (circle)</text>
      <circle cx="110" cy="180" r="34" fill="none" strokeWidth="5" className="stroke-current text-emerald-500" />
      <path d="M96 158 l28 44" strokeWidth="3" className="stroke-current text-background" />
      <text x="170" y="176" fontSize="9" className="fill-current text-muted-foreground">cut open with the same enzyme →</text>
      <text x="170" y="190" fontSize="9" className="fill-current text-muted-foreground">matching sticky ends</text>

      {/* ligation */}
      <text x="16" y="242" fontSize="11" className="fill-current text-violet-700 dark:text-violet-300" fontWeight="800">③ DNA ligase seals gene into plasmid</text>
      <circle cx="110" cy="284" r="26" fill="none" strokeWidth="5" className="stroke-current text-emerald-500" />
      <rect x="96" y="272" width="28" height="14" rx="3" className="fill-current text-rose-500/50" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.95)" }} />
      <text x="150" y="288" fontSize="9" className="fill-current text-muted-foreground">= recombinant plasmid (chimera DNA)</text>

      {/* transformation + selection */}
      <g>
        <ellipse cx="430" cy="120" rx="46" ry="28" className="fill-current text-teal-500/15" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(20 184 166 / 0.9)" }} />
        <text x="430" y="124" fontSize="8.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">E. coli</text>
        <text x="400" y="164" fontSize="11" className="fill-current text-teal-700 dark:text-teal-300" fontWeight="800">④ Transform bacteria</text>
        <text x="400" y="182" fontSize="9" className="fill-current text-muted-foreground">plasmids enter; cells multiply — each clone carries the gene</text>
        <ellipse cx="430" cy="240" rx="46" ry="28" className="fill-current text-teal-500/15" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(20 184 166 / 0.9)" }} />
        <rect x="416" y="228" width="28" height="14" rx="3" className="fill-current text-rose-500/50" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.95)" }} />
        <text x="400" y="284" fontSize="11" className="fill-current text-teal-700 dark:text-teal-300" fontWeight="800">⑤ Select + harvest</text>
        <text x="400" y="302" fontSize="9" className="fill-current text-muted-foreground">marker genes find the right clones → protein (insulin) collected</text>
      </g>
    </svg>
  );
}
