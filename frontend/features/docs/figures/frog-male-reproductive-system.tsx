/** Frog male reproductive system — testes, vasa efferentia, Bidder's canal, cloaca. Theme-aware. */
export function FrogMaleReproductiveSystem({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Frog male reproductive system with paired testes on kidneys vasa efferentia Bidder's canal seminal vesicle and cloaca plus fat bodies">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Male system — the kidney doubles as a sperm highway</text>

      {/* kidneys */}
      <ellipse cx="240" cy="120" rx="90" ry="34" className="fill-current text-sky-500/15" strokeWidth="3" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <ellipse cx="240" cy="190" rx="90" ry="34" className="fill-current text-sky-500/15" strokeWidth="3" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="240" y="124" fontSize="8.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">kidney (right)</text>
      <text x="240" y="194" fontSize="8.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">kidney (left)</text>

      {/* testes */}
      <ellipse cx="130" cy="112" rx="26" ry="14" className="fill-current text-amber-500/30" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <ellipse cx="130" cy="182" rx="26" ry="14" className="fill-current text-amber-500/30" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="70" y="116" fontSize="8.5" textAnchor="end" className="fill-current text-amber-700 dark:text-amber-300" fontWeight="700">testes (yellow, oval)</text>

      {/* vasa efferentia */}
      <g className="stroke-current text-emerald-600" strokeWidth="2">
        <line x1="156" y1="110" x2="180" y2="112" /><line x1="156" y1="118" x2="180" y2="120" />
        <line x1="156" y1="180" x2="180" y2="182" /><line x1="156" y1="188" x2="180" y2="190" />
      </g>
      <text x="70" y="148" fontSize="8" textAnchor="end" className="fill-current text-muted-foreground">10–12 vasa efferentia</text>

      {/* bidder's canal + ureter */}
      <line x1="330" y1="112" x2="420" y2="112" strokeWidth="3" className="stroke-current text-violet-500" />
      <line x1="330" y1="182" x2="420" y2="182" strokeWidth="3" className="stroke-current text-violet-500" />
      <text x="430" y="112" fontSize="8.5" className="fill-current text-violet-700 dark:text-violet-300" fontWeight="700">urinogenital duct → cloaca</text>
      <text x="430" y="128" fontSize="8" className="fill-current text-muted-foreground">(sperm + urine share the duct)</text>

      {/* fat bodies */}
      <g className="fill-current text-amber-400/40">
        <circle cx="100" cy="80" r="6" /><circle cx="112" cy="76" r="6" /><circle cx="106" cy="88" r="6" />
      </g>
      <text x="140" y="70" fontSize="8" className="fill-current text-muted-foreground">fat bodies — food reserve for gamete-making</text>

      <text x="16" y="240" fontSize="10" className="fill-current text-muted-foreground">Sperm path: testis → vasa efferentia → Bidder's canal (inside kidney) → urinogenital duct → cloaca → out during amplexus.</text>
    </svg>
  );
}
