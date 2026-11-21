/** Miller–Urey experiment apparatus. Theme-aware. */
export function MillerUreyApparatus({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Miller Urey experiment 1953 sealed glass loop with lower ocean flask heated water upper flask of methane ammonia hydrogen and water vapour electrodes giving electric discharge condenser as rain amino acids collected">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Miller–Urey experiment (1953)</text>

      {/* lower flask — ocean */}
      <path d="M120 190 L120 200 Q120 215 140 215 L200 215 Q220 215 220 200 L220 190" className="fill-none stroke-current text-sky-500" strokeWidth="3" />
      <path d="M120 190 Q170 180 220 190 L220 190 L220 200 Q220 215 200 215 L140 215 Q120 215 120 200 Z" className="fill-current text-sky-500/20" />
      <text x="170" y="232" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">ocean flask (water heated)</text>

      {/* tube loop up */}
      <path d="M120 190 L120 100 L150 80" className="fill-none stroke-current text-sky-500" strokeWidth="3" />
      <path d="M220 190 L220 100 L190 80" className="fill-none stroke-current text-sky-500" strokeWidth="3" />
      <text x="170" y="88" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">CH₄ · NH₃ · H₂ · H₂O</text>

      {/* electrodes */}
      <line x1="160" y1="70" x2="160" y2="95" strokeWidth="2" className="stroke-current text-amber-400" />
      <line x1="180" y1="70" x2="180" y2="95" strokeWidth="2" className="stroke-current text-amber-400" />
      <path d="M164 78 L176 90 M176 78 L164 90" strokeWidth="2" className="stroke-current text-amber-400" />
      <text x="170" y="60" fontSize="7.5" textAnchor="middle" className="fill-current text-muted-foreground">electric discharge (lightning)</text>

      {/* condenser */}
      <path d="M220 190 L220 100 L330 100 L330 130" className="fill-none stroke-current text-sky-500" strokeWidth="3" />
      <text x="290" y="92" fontSize="7.5" textAnchor="middle" className="fill-current text-muted-foreground">condenser (rain)</text>

      <rect x="380" y="90" width="240" height="90" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <text x="500" y="112" fontSize="8" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">RESULT (after ~1 week)</text>
      <text x="500" y="132" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">amino acids: glycine, alanine,</text>
      <text x="500" y="148" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">aspartic, glutamic + other organics</text>
      <text x="500" y="166" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground" fontStyle="italic">life's building blocks form abiotically</text>
    </svg>
  );
}
