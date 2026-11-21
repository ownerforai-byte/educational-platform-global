/**
 * Light vs electron microscope — how we see cells; resolution limits
 * and what each can reveal. Theme-aware via currentColor.
 */
export function MicroscopeComparison({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 300" className={className} role="img" aria-label="Comparison of light microscope and electron microscope showing optical paths, resolution limits and what each can reveal about cells">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Seeing cells — light vs electron microscope</text>

      {/* light microscope */}
      <g>
        <rect x="70" y="70" width="14" height="120" rx="6" className="fill-current text-sky-500/25" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
        <ellipse cx="77" cy="210" rx="34" ry="12" className="fill-current text-sky-500/20" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
        <ellipse cx="77" cy="60" rx="20" ry="8" className="fill-current text-sky-500/30" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
        <text x="130" y="86" fontSize="11" className="fill-current text-sky-700 dark:text-sky-300" fontWeight="800">Light microscope</text>
        <text x="130" y="104" fontSize="9.5" className="fill-current text-muted-foreground">visible light through the specimen</text>
        <text x="130" y="120" fontSize="9.5" className="fill-current text-muted-foreground">resolution limit ≈ 0.2 µm · magnification ≈ ×2000</text>
        <text x="130" y="136" fontSize="9.5" className="fill-current text-emerald-700 dark:text-emerald-300" fontWeight="700">sees: nucleus, chloroplasts, cell wall — living cells OK</text>
      </g>

      {/* electron microscope */}
      <g>
        <rect x="70" y="170" width="14" height="80" rx="6" className="fill-current text-violet-500/25" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(124 58 237 / 0.9)" }} />
        <ellipse cx="77" cy="262" rx="34" ry="12" className="fill-current text-violet-500/20" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(124 58 237 / 0.9)" }} />
        <text x="130" y="186" fontSize="11" className="fill-current text-violet-700 dark:text-violet-300" fontWeight="800">Electron microscope</text>
        <text x="130" y="204" fontSize="9.5" className="fill-current text-muted-foreground">beam of electrons in a vacuum column</text>
        <text x="130" y="220" fontSize="9.5" className="fill-current text-muted-foreground">resolution ≈ 0.2 nm (×1000 better) · up to ×500,000</text>
        <text x="130" y="236" fontSize="9.5" className="fill-current text-emerald-700 dark:text-emerald-300" fontWeight="700">sees: ribosomes, membranes, viruses — only dead, coated cells</text>
      </g>

      {/* what resolution means */}
      <g>
        <circle cx="470" cy="110" r="34" className="fill-current text-emerald-500/20" strokeWidth="3" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
        <text x="470" y="164" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">resolvable object</text>
        <circle cx="580" cy="110" r="8" className="fill-current text-rose-500/25" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
        <text x="580" y="140" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">too small for</text>
        <text x="580" y="154" fontSize="9.5" textAnchor="middle" className="fill-current text-muted-foreground">light (a virus)</text>
      </g>
      <text x="400" y="60" fontSize="11" className="fill-current text-foreground" fontWeight="800">Resolution = smallest distance two points</text>
      <text x="400" y="76" fontSize="11" className="fill-current text-foreground" fontWeight="800">can be apart and still be seen as two.</text>

      <text x="16" y="290" fontSize="10" className="fill-current text-muted-foreground">Cell biology's history tracks the microscope: Hooke's cork cells (LM) → organelles (LM) → ribosomes, ER, membranes (EM).</text>
    </svg>
  );
}
