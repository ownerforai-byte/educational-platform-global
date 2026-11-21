/** Human vegetation relationships — use, misuse, stewardship. Well-detailed. Theme-aware. */
export function HumanVegetationRelationships({ className }: { className?: string }) {
  const modes: [string, string, string, string][] = [
    ["Use", "timber, fuelwood, fodder, medicine, food", "as old as humanity", "rgb(22 163 74)"],
    ["Misuse", "clear-felling, overgrazing, khoriya without fallow", "withdrawal beyond regrowth", "rgb(244 63 94)"],
    ["Stewardship", "community forestry, plantations, protection", "the modern lesson", "rgb(2 132 199)"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Human vegetation relationships use misuse stewardship sustainable management community forestry plantation protection three modes">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Three relationships with the forest</text>
      {modes.map(([name, detail, tag, rgb], i) => {
        const x = 30 + i * 228;
        return (
          <g key={name}>
            <rect x={x} y="44" width="210" height="200" rx="12" className="fill-current text-slate-500/10" strokeWidth="2.2" stroke="currentColor" style={{ color: `${rgb} / 0.9` }} />
            <text x={x + 105} y="70" fontSize="9.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{name.toUpperCase()}</text>
            {/* icon */}
            {i === 0 && <path d={`M${x + 105} 150 v-34 M${x + 105} 130 q-18 -4 -26 -18 M${x + 105} 130 q18 -4 26 -18`} className="stroke-current" strokeWidth="2.6" style={{ color: rgb }} />}
            {i === 1 && <path d={`M${x + 80} 150 l50 -40 M${x + 130} 150 l-50 -40`} className="stroke-current" strokeWidth="2.6" style={{ color: rgb }} />}
            {i === 2 && (
              <g>
                <path d={`M${x + 105} 150 v-30`} className="stroke-current" strokeWidth="2.6" style={{ color: rgb }} />
                <circle cx={x + 105} cy={112} r="13" className="fill-current" style={{ color: rgb, opacity: 0.4 }} />
                <path d={`M${x + 80} 150 h50`} className="stroke-current" strokeWidth="2" style={{ color: rgb }} />
              </g>
            )}
            <text x={x + 14} y="186" fontSize="7" className="fill-current text-muted-foreground">{detail.slice(0, 32)}</text>
            <text x={x + 14} y="200" fontSize="7" className="fill-current text-muted-foreground">{detail.slice(32, 64)}</text>
            <text x={x + 105} y="228" fontSize="7" textAnchor="middle" className="fill-current" style={{ color: rgb }}>{tag}</text>
          </g>
        );
      })}
      <rect x="30" y="256" width="660" height="36" rx="8" className="fill-current text-emerald-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="270" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">The shift from misuse to stewardship is Nepal's story: 22,000+ community forest user groups turned a losing battle into a recovering forest.</text>
      <text x="360" y="284" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: give one example of each mode — use, misuse, stewardship.</text>
    </svg>
  );
}
