/** Population growth curves J curve S curve — the two shapes. Well-detailed. Theme-aware. */
export function PopulationGrowthCurvesShapes({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Population growth curves J curve exponential S curve logistic carrying capacity K environmental resistance lag phase log phase stationary phase bacteria example doubling time rule of 70 human population 1 billion 1804 8 billion 2022 arithmetic versus geometric growth difference graph axes labels">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Growth curves — the J and the S</text>
      {/* two curves */}
      <rect x="30" y="44" width="660" height="160" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      {/* J curve */}
      <text x="80" y="66" fontSize="6.6" className="fill-current text-rose-600" fontWeight="800">J-CURVE (exponential)</text>
      <path d="M70 190 Q140 188 190 170 Q240 150 280 110 Q310 80 320 66" className="fill-none stroke-current" strokeWidth="2.5" style={{ color: "rgb(244 63 94 / 0.8)" }} />
      <text x="70" y="206" fontSize="5.4" className="fill-current text-muted-foreground">no limits — doubling and doubling (ideal bacteria, early humans)</text>
      {/* S curve */}
      <text x="420" y="66" fontSize="6.6" className="fill-current text-emerald-600" fontWeight="800">S-CURVE (logistic)</text>
      <path d="M410 190 Q450 186 480 170 Q510 150 530 120 Q550 92 570 84 Q590 80 640 80" className="fill-none stroke-current" strokeWidth="2.5" style={{ color: "rgb(22 163 74 / 0.8)" }} />
      <line x1="410" y1="82" x2="660" y2="82" className="stroke-current" strokeWidth="1.2" strokeDasharray="4 3" style={{ color: "rgb(217 119 6 / 0.8)" }} />
      <text x="640" y="76" fontSize="5.4" textAnchor="end" className="fill-current text-amber-600" fontWeight="700">carrying capacity K</text>
      <text x="410" y="206" fontSize="5.4" className="fill-current text-muted-foreground">environmental resistance flattens growth as K approaches</text>
      <text x="360" y="196" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">the rule of 70: doubling time ≈ 70 ÷ growth rate — 2% growth doubles in ~35 years</text>
      {/* facts */}
      <rect x="30" y="212" width="660" height="80" rx="10" className="fill-current text-emerald-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="232" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Human milestones: 1 billion around 1804, 8 billion by 2022 — the last billion took ~11 years, the first took all of history.</text>
      <text x="360" y="250" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: J = exponential (no limits), S = logistic (carrying capacity); draw both, label K, quote the rule of 70.</text>
      <text x="360" y="268" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Human population has followed a J so far — the exam question is whether technology keeps bending K upward.</text>
      <text x="360" y="284" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Every exponential curve meets a wall eventually — the interesting question is whether the wall is felt or foreseen.</text>
    </svg>
  );
}
