/**
 * Bacterial shapes and arrangements — cocci, bacilli, vibrio, spirillum;
 * diplo-/strepto-/staphylo- clustering. Theme-aware via currentColor.
 */
export function BacterialShapes({ className }: { className?: string }) {
  const coccus = (x: number, y: number, k: string) => <circle key={k} cx={x} cy={y} r="9" className="fill-current text-teal-500/25" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(20 184 166 / 0.95)" }} />;
  const bacillus = (x: number, y: number, k: string) => <rect key={k} x={x} y={y - 6} width="30" height="12" rx="6" className="fill-current text-sky-500/25" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.95)" }} />;
  return (
    <svg viewBox="0 0 660 300" className={className} role="img" aria-label="Bacterial shapes and arrangements: cocci in pairs chains and clusters, rod-shaped bacilli, comma-shaped vibrio and spiral spirillum">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Bacterial shapes — the first ID step</text>

      <text x="16" y="58" fontSize="11.5" className="fill-current text-teal-700 dark:text-teal-300" fontWeight="800">Coccus (sphere) — named by arrangement:</text>
      {coccus(70, 90, "c1")}<text x="70" y="118" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">single</text>
      {coccus(130, 90, "c2")}{coccus(150, 90, "c3")}<text x="140" y="118" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">diplo-</text>
      {coccus(210, 84, "c4")}{coccus(210, 104, "c5")}{coccus(210, 64, "c6")}{coccus(230, 84, "c7")}{coccus(230, 104, "c8")}<text x="220" y="126" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">staphylo- (grapes)</text>
      {coccus(300, 90, "c9")}{coccus(300, 110, "c10")}{coccus(300, 70, "c11")}<text x="300" y="132" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">strepto- (chain)</text>

      <text x="16" y="164" fontSize="11.5" className="fill-current text-sky-700 dark:text-sky-300" fontWeight="800">Bacillus (rod):</text>
      {bacillus(70, 186, "b1")}{bacillus(120, 186, "b2")}
      <text x="70" y="210" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">E. coli, Lactobacillus</text>

      <text x="280" y="164" fontSize="11.5" className="fill-current text-amber-700 dark:text-amber-300" fontWeight="800">Vibrio (comma):</text>
      <path d="M330 176 q16 -12 8 -18" fill="none" strokeWidth="10" strokeLinecap="round" className="stroke-current text-amber-500/40" />
      <path d="M330 176 q16 -12 8 -18" fill="none" strokeWidth="2.5" className="stroke-current text-amber-600" />
      <text x="330" y="210" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">V. cholerae</text>

      <text x="450" y="164" fontSize="11.5" className="fill-current text-rose-700 dark:text-rose-300" fontWeight="800">Spirillum (spiral):</text>
      <path d="M500 190 q14 -24 28 0 q14 24 28 0 q14 -24 28 0" fill="none" strokeWidth="8" strokeLinecap="round" className="stroke-current text-rose-500/40" />
      <path d="M500 190 q14 -24 28 0 q14 24 28 0 q14 -24 28 0" fill="none" strokeWidth="2.5" className="stroke-current text-rose-600" />
      <text x="540" y="224" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">spirochaetes</text>

      <text x="16" y="258" fontSize="10" className="fill-current text-muted-foreground">Shape + Gram reaction + arrangement = the standard first identification in the lab (e.g. Staphylococcus = sphere + Gram+ + cluster).</text>
      <text x="16" y="276" fontSize="10" className="fill-current text-muted-foreground">Size range 0.5–5 µm — visible only under the oil-immersion light microscope or EM.</text>
    </svg>
  );
}
