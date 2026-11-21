/**
 * Greenhouse effect mechanism — solar in, IR trapped by greenhouse
 * gases; enhanced effect from fossil CO₂. Theme-aware via currentColor.
 */
export function GreenhouseEffect({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 300" className={className} role="img" aria-label="Greenhouse effect diagram showing shortwave solar radiation passing through the atmosphere longwave infrared emitted by Earth being absorbed by greenhouse gases and re-radiated back">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">The greenhouse effect — a blanket we are thickening</text>

      {/* atmosphere band */}
      <rect x="40" y="50" width="580" height="40" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="330" y="75" fontSize="9.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">atmosphere — CO₂ · CH₄ · N₂O · CFCs · water vapour</text>

      {/* earth */}
      <path d="M40 250 Q330 230 620 250 L620 290 L40 290 Z" className="fill-current text-emerald-500/20" stroke="none" />
      <text x="70" y="276" fontSize="10" className="fill-current text-emerald-700 dark:text-emerald-300" fontWeight="800">EARTH</text>

      {/* incoming solar */}
      <g className="stroke-current text-amber-500" strokeWidth="3">
        <line x1="150" y1="20" x2="200" y2="248" /><line x1="230" y1="20" x2="270" y2="248" />
      </g>
      <text x="120" y="40" fontSize="9" className="fill-current text-amber-600 dark:text-amber-400" fontWeight="700">shortwave solar in (passes through)</text>

      {/* outgoing IR */}
      <g className="stroke-current text-rose-500" strokeWidth="3">
        <line x1="420" y1="248" x2="470" y2="92" /><line x1="500" y1="248" x2="540" y2="92" />
      </g>
      <polygon points="466,98 476,86 478,100" className="fill-current text-rose-500" />
      <text x="400" y="200" fontSize="9" className="fill-current text-rose-600 dark:text-rose-400" fontWeight="700">longwave IR out (trapped & re-radiated back ↓)</text>
      <g className="stroke-current text-rose-400" strokeWidth="2" strokeDasharray="4 3">
        <line x1="470" y1="92" x2="450" y2="248" />
      </g>

      {/* enhanced */}
      <rect x="40" y="120" width="200" height="70" rx="10" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="50" y="142" fontSize="9.5" className="fill-current text-foreground" fontWeight="800">ENHANCED effect (us):</text>
      <text x="50" y="158" fontSize="8.5" className="fill-current text-muted-foreground">fossil CO₂ + deforestation</text>
      <text x="50" y="172" fontSize="8.5" className="fill-current text-muted-foreground">thicken the blanket → +1.1 °C so far</text>
      <text x="50" y="186" fontSize="8.5" className="fill-current text-muted-foreground">→ ice melt, sea rise, extreme weather</text>

      <text x="16" y="296" fontSize="0">.</text>
      <text x="290" y="286" fontSize="10" className="fill-current text-muted-foreground">Natural greenhouse effect keeps Earth ~15 °C instead of −18 °C — the problem is the extra layer, not the blanket itself.</text>
    </svg>
  );
}
