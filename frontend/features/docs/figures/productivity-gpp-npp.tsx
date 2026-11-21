/**
 * Productivity — GPP → respiration → NPP, and NPP flowing to
 * consumers and decomposers. Theme-aware via currentColor.
 */
export function ProductivityGppNpp({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 280" className={className} role="img" aria-label="Productivity diagram showing gross primary production split into respiration loss and net primary production which then feeds consumers and decomposers with units of kilojoules per square metre per year">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Productivity — the ecosystem's income statement</text>

      {/* sun + GPP */}
      <circle cx="110" cy="110" r="26" className="fill-current text-amber-400/40" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(251 191 36)" }} />
      <line x1="136" y1="110" x2="210" y2="110" strokeWidth="3" className="stroke-current text-amber-500" />
      <polygon points="202,104 218,110 202,116" className="fill-current text-amber-500" />

      <rect x="220" y="80" width="170" height="60" rx="10" className="fill-current text-green-500/15" strokeWidth="3" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <text x="305" y="104" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">GPP — gross primary</text>
      <text x="305" y="120" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">total energy fixed by plants</text>

      {/* respiration */}
      <rect x="220" y="180" width="170" height="50" rx="10" className="fill-current text-rose-500/15" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="305" y="202" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">R — respiration</text>
      <text x="305" y="218" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">plants' own living costs (heat)</text>
      <line x1="305" y1="140" x2="305" y2="176" strokeWidth="2.5" className="stroke-current text-foreground" />
      <polygon points="299,170 305,184 311,170" className="fill-current text-foreground" />

      {/* NPP */}
      <rect x="450" y="80" width="180" height="60" rx="10" className="fill-current text-emerald-500/15" strokeWidth="3" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="104" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">NPP = GPP − R</text>
      <text x="540" y="120" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">stored growth — food for all</text>
      <line x1="390" y1="110" x2="446" y2="110" strokeWidth="3" className="stroke-current text-foreground" />
      <polygon points="438,104 454,110 438,116" className="fill-current text-foreground" />

      {/* NPP splits */}
      <line x1="540" y1="140" x2="500" y2="196" strokeWidth="2.5" className="stroke-current text-foreground" />
      <line x1="540" y1="140" x2="580" y2="196" strokeWidth="2.5" className="stroke-current text-foreground" />
      <text x="430" y="216" fontSize="9" className="fill-current text-sky-700 dark:text-sky-300" fontWeight="700">→ herbivores (consumers)</text>
      <text x="540" y="216" fontSize="9" className="fill-current text-violet-700 dark:text-violet-300" fontWeight="700">→ litter → decomposers</text>

      <text x="16" y="252" fontSize="10" className="fill-current text-muted-foreground">Units: kJ m⁻² yr⁻¹. Tropical forests &amp; coral reefs are the most productive; deserts and open ocean the least.</text>
      <text x="16" y="272" fontSize="10" className="fill-current text-muted-foreground">Exam: define GPP, NPP and write the relation NPP = GPP − R — one mark each.</text>
    </svg>
  );
}
