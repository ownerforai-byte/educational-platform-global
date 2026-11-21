/**
 * Bacterial growth curve — lag, log (exponential), stationary, decline
 * phases plotted against time. Theme-aware via currentColor.
 */
export function BacterialGrowthCurve({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 300" className={className} role="img" aria-label="Bacterial growth curve with lag log stationary and decline phases, log of cell number plotted against time, with annotations for what happens in each phase">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Bacterial growth curve — four phases in a closed batch</text>

      {/* axes */}
      <line x1="70" y1="250" x2="620" y2="250" strokeWidth="2.5" className="stroke-current text-foreground" />
      <line x1="70" y1="250" x2="70" y2="50" strokeWidth="2.5" className="stroke-current text-foreground" />
      <text x="34" y="46" fontSize="9.5" className="fill-current text-muted-foreground">log of cell number</text>
      <text x="560" y="272" fontSize="9.5" className="fill-current text-muted-foreground">time →</text>

      {/* curve: lag flat, log steep, stationary flat, decline down */}
      <path d="M70 232 Q130 228 170 226 C230 222 250 90 330 80 Q400 74 440 92 Q470 106 500 110 Q560 116 600 200" fill="none" strokeWidth="4" className="stroke-current text-emerald-500" />

      {/* phase bands */}
      <line x1="170" y1="56" x2="170" y2="250" strokeWidth="1.5" strokeDasharray="5 3" className="stroke-current text-muted-foreground" />
      <line x1="300" y1="56" x2="300" y2="250" strokeWidth="1.5" strokeDasharray="5 3" className="stroke-current text-muted-foreground" />
      <line x1="440" y1="56" x2="440" y2="250" strokeWidth="1.5" strokeDasharray="5 3" className="stroke-current text-muted-foreground" />

      <text x="120" y="72" fontSize="10.5" textAnchor="middle" className="fill-current text-sky-700 dark:text-sky-300" fontWeight="800">1 · LAG</text>
      <text x="120" y="88" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">adapting, making</text>
      <text x="120" y="100" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">enzymes — no division</text>

      <text x="235" y="72" fontSize="10.5" textAnchor="middle" className="fill-current text-emerald-700 dark:text-emerald-300" fontWeight="800">2 · LOG (exponential)</text>
      <text x="235" y="88" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">binary fission every</text>
      <text x="235" y="100" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">~20 min — most</text>
      <text x="235" y="112" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">antibiotic-sensitive</text>

      <text x="370" y="72" fontSize="10.5" textAnchor="middle" className="fill-current text-amber-700 dark:text-amber-300" fontWeight="800">3 · STATIONARY</text>
      <text x="370" y="88" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">nutrients run out, waste</text>
      <text x="370" y="100" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">builds — deaths = births</text>

      <text x="530" y="72" fontSize="10.5" textAnchor="middle" className="fill-current text-rose-700 dark:text-rose-300" fontWeight="800">4 · DECLINE</text>
      <text x="530" y="88" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">toxicity wins —</text>
      <text x="530" y="100" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">population crashes</text>

      <text x="16" y="292" fontSize="10" className="fill-current text-muted-foreground">Generation time in the log phase: N = N₀ × 2ⁿ. Standard NEB question: label the curve, name the phase of maximum growth, and explain why it ends.</text>
    </svg>
  );
}
