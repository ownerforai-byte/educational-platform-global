/**
 * Unicellular → multicellular organisation — single cell → colony →
 * tissue → organ → organism, with division of labour. Theme-aware.
 */
export function UnicellularToMulticellular({ className }: { className?: string }) {
  const cells = (cx: number, cy: number, n: number, r: number) =>
    Array.from({ length: n }, (_, i) => {
      const a = (i / n) * Math.PI * 2;
      return <circle key={`${cx}${cy}${i}`} cx={cx + r * Math.cos(a)} cy={cy + r * Math.sin(a)} r="8" className="fill-current text-emerald-500/20" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />;
    });
  return (
    <svg viewBox="0 0 660 250" className={className} role="img" aria-label="Levels of organisation from one unicellular amoeba through a colony of Volvox to tissues organs and a complete multicellular organism with division of labour">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">From one cell to many — levels of organisation</text>

      {/* unicellular */}
      <circle cx="90" cy="110" r="26" className="fill-current text-emerald-500/20" strokeWidth="3" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <circle cx="90" cy="110" r="9" className="fill-current text-violet-500/40" />
      <text x="90" y="160" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">unicellular</text>
      <text x="90" y="175" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">Amoeba — one cell does everything</text>

      {/* colony */}
      {cells(210, 110, 10, 24)}
      <text x="210" y="160" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">colony</text>
      <text x="210" y="175" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">Volvox — loose ball of similar cells</text>

      {/* tissue */}
      {cells(340, 100, 8, 22)}
      <text x="340" y="160" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">tissue</text>
      <text x="340" y="175" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">similar cells, one job (muscle)</text>

      {/* organ */}
      <g>
        <ellipse cx="470" cy="105" rx="44" ry="30" className="fill-current text-rose-500/20" strokeWidth="3" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
        <path d="M436 105 q34 -22 68 0" fill="none" strokeWidth="2.5" className="stroke-current text-rose-600" />
        <text x="470" y="160" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">organ</text>
        <text x="470" y="175" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">tissues combined (stomach, heart)</text>
      </g>

      {/* organism */}
      <g>
        <circle cx="590" cy="86" r="10" className="fill-current text-sky-500/30" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
        <rect x="580" y="98" width="20" height="34" rx="8" className="fill-current text-sky-500/20" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
        <line x1="582" y1="132" x2="578" y2="150" strokeWidth="2.5" className="stroke-current text-sky-500" />
        <line x1="598" y1="132" x2="602" y2="150" strokeWidth="2.5" className="stroke-current text-sky-500" />
        <text x="590" y="170" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">organism</text>
        <text x="590" y="185" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">organ systems working together</text>
      </g>

      <text x="16" y="222" fontSize="10" className="fill-current text-muted-foreground">Key idea — division of labour: as cells specialise, efficiency rises but each cell loses independence. Unicells: free-living, all functions in one cell;</text>
      <text x="16" y="238" fontSize="10" className="fill-current text-muted-foreground">multicellular cells depend on the whole (a human nerve cell cannot survive alone — an Amoeba can).</text>
    </svg>
  );
}
