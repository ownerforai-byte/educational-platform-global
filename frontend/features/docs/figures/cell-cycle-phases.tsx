/**
 * Cell cycle — G1, S, G2 (interphase) + M phase ring with what happens
 * in each phase. Theme-aware via currentColor.
 */
export function CellCyclePhases({ className }: { className?: string }) {
  const arc = (start: number, sweep: number, color: string, label: string, lx: number, ly: number, sub: string) => {
    const large = sweep > 180 ? 1 : 0;
    const a0 = (start * Math.PI) / 180, a1 = ((start + sweep) * Math.PI) / 180;
    const x0 = 300 + 100 * Math.cos(a0), y0 = 150 + 100 * Math.sin(a0);
    const x1 = 300 + 100 * Math.cos(a1), y1 = 150 + 100 * Math.sin(a1);
    return (
      <g key={label}>
        <path d={`M${x0},${y0} A100,100 0 ${large} 1 ${x1},${y1}`} fill="none" strokeWidth="26" strokeLinecap="butt" style={{ color }} />
        <text x={lx} y={ly} fontSize="12" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{label}</text>
        <text x={lx} y={ly + 15} fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">{sub}</text>
      </g>
    );
  };
  return (
    <svg viewBox="0 0 660 310" className={className} role="img" aria-label="Cell cycle ring showing G1 growth, S DNA synthesis, G2 preparation and M mitosis phases with interphase taking most of the cycle duration">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">The cell cycle — one ring, four phases</text>

      {arc(210, 105, "rgb(14 165 233 / 0.75)", "G₁", 250, 92, "growth, organelles made")}
      {arc(315, 90, "rgb(124 58 237 / 0.75)", "S", 300, 296, "DNA replicates")}
      {arc(405, 75, "rgb(16 185 129 / 0.75)", "G₂", 420, 108, "proteins for division")}
      {arc(480, 90, "rgb(244 63 94 / 0.8)", "M", 470, 200, "mitosis + cytokinesis")}

      <text x="300" y="146" fontSize="12" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">INTERPHASE</text>
      <text x="300" y="162" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">~90% of the cycle —</text>
      <text x="300" y="176" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">the cell "rests" only in appearance;</text>
      <text x="300" y="190" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">it grows and copies its DNA</text>

      <text x="80" y="60" fontSize="10.5" className="fill-current text-sky-700 dark:text-sky-300" fontWeight="800">G₁ — first gap:</text>
      <text x="80" y="76" fontSize="9.5" className="fill-current text-muted-foreground">cell doubles in size, makes RNA &amp; proteins</text>
      <text x="80" y="120" fontSize="10.5" className="fill-current text-violet-700 dark:text-violet-300" fontWeight="800">S — synthesis:</text>
      <text x="80" y="136" fontSize="9.5" className="fill-current text-muted-foreground">every chromosome is copied into 2 sister chromatids</text>
      <text x="80" y="180" fontSize="10.5" className="fill-current text-emerald-700 dark:text-emerald-300" fontWeight="800">G₂ — second gap:</text>
      <text x="80" y="196" fontSize="9.5" className="fill-current text-muted-foreground">spindle proteins made; cell checks for errors</text>
      <text x="80" y="240" fontSize="10.5" className="fill-current text-rose-600 dark:text-rose-400" fontWeight="800">M — mitotic phase:</text>
      <text x="80" y="256" fontSize="9.5" className="fill-current text-muted-foreground">prophase → metaphase → anaphase → telophase</text>
      <text x="80" y="272" fontSize="9.5" className="fill-current text-muted-foreground">then cytokinesis splits the cytoplasm</text>

      <text x="16" y="300" fontSize="10" className="fill-current text-muted-foreground">Checkpoints at G₁/S and G₂/M stop damaged cells dividing — losing them is a step toward cancer.</text>
    </svg>
  );
}
