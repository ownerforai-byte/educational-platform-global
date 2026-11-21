/**
 * Lytic vs lysogenic cycle — side-by-side phage strategies.
 * Theme-aware via currentColor.
 */
export function LyticLysogenicCycle({ className }: { className?: string }) {
  const bacterium = (cx: number, cy: number, k: string) => (
    <g key={k}>
      <ellipse cx={cx} cy={cy} rx="30" ry="18" className="fill-current text-teal-500/15" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(20 184 166 / 0.9)" }} />
      <path d={`M${cx - 18} ${cy} q9 -8 18 0`} fill="none" strokeWidth="1.5" className="stroke-current text-violet-500" />
    </g>
  );
  return (
    <svg viewBox="0 0 660 320" className={className} role="img" aria-label="Lytic versus lysogenic phage cycles: attachment injection replication lysis against integration as prophage with induction back to the lytic pathway">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Two phage strategies — smash and grab vs sleep inside</text>

      {/* LYTIC column */}
      <text x="120" y="56" fontSize="12" className="fill-current text-rose-700 dark:text-rose-300" fontWeight="800">LYTIC (virulent — T4)</text>
      {bacterium(120, 100, "l1")}
      <text x="170" y="96" fontSize="8.5" className="fill-current text-muted-foreground">1 · attach + inject DNA</text>
      {bacterium(120, 160, "l2")}
      <text x="170" y="156" fontSize="8.5" className="fill-current text-muted-foreground">2 · host makes phage parts</text>
      <text x="170" y="170" fontSize="8.5" className="fill-current text-muted-foreground">cell becomes a factory</text>
      <g>
        {bacterium(120, 220, "l3")}
        <g className="stroke-current text-rose-500" strokeWidth="2">
          <line x1="90" y1="208" x2="80" y2="196" /><line x1="150" y1="208" x2="160" y2="196" /><line x1="90" y1="232" x2="80" y2="244" /><line x1="150" y1="232" x2="160" y2="244" />
        </g>
        <text x="170" y="216" fontSize="8.5" className="fill-current text-muted-foreground">3 · cell LYSes (bursts)</text>
        <text x="170" y="230" fontSize="8.5" className="fill-current text-muted-foreground">~200 virions released in ~25 min</text>
      </g>

      {/* LYSOGENIC column */}
      <text x="430" y="56" fontSize="12" className="fill-current text-violet-700 dark:text-violet-300" fontWeight="800">LYSOGENIC (temperate — lambda)</text>
      {bacterium(430, 100, "g1")}
      <text x="480" y="96" fontSize="8.5" className="fill-current text-muted-foreground">1 · inject DNA</text>
      {bacterium(430, 160, "g2")}
      <text x="480" y="156" fontSize="8.5" className="fill-current text-muted-foreground">2 · DNA integrates as PROPHAGE</text>
      <text x="480" y="170" fontSize="8.5" className="fill-current text-muted-foreground">replicates silently with host</text>
      {bacterium(430, 220, "g3")}
      <text x="480" y="216" fontSize="8.5" className="fill-current text-muted-foreground">3 · stress (UV, chemicals) induces it</text>
      <text x="480" y="230" fontSize="8.5" className="fill-current text-muted-foreground">→ exits and switches to lytic</text>
      <path d="M470 244 q60 40 120 20" fill="none" strokeWidth="2" strokeDasharray="6 3" className="stroke-current text-rose-400" />
      <text x="560" y="286" fontSize="8.5" className="fill-current text-rose-600 dark:text-rose-400" fontWeight="700">→ lytic</text>

      <text x="16" y="300" fontSize="10" className="fill-current text-muted-foreground">Prophage genes can change the host's phenotype (lysogenic conversion — e.g. diphtheria toxin is phage-encoded). Transduction during this cycle moves bacterial genes between cells.</text>
    </svg>
  );
}
