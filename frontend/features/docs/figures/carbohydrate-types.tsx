/**
 * Carbohydrate classes — monosaccharide → disaccharide (glycosidic bond)
 * → polysaccharide chain, with examples. Theme-aware via currentColor.
 */
export function CarbohydrateTypes({ className }: { className?: string }) {
  const hexose = (x: number, y: number, label: string) => (
    <g key={`${x}${y}`}>
      <polygon points={`${x},${y - 22} ${x + 20},${y - 11} ${x + 20},${y + 11} ${x},${y + 22} ${x - 20},${y + 11} ${x - 20},${y - 11}`} className="fill-current text-orange-500/15" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(249 115 22 / 0.9)" }} />
      <text x={x} y={y + 4} fontSize="10" textAnchor="middle" className="fill-current text-orange-700 dark:text-orange-300" fontWeight="800">{label}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 660 300" className={className} role="img" aria-label="Carbohydrate classification from monosaccharides glucose and fructose through the glycosidic bond of sucrose to starch cellulose and glycogen polysaccharide chains">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Carbohydrates — built from single sugars up</text>

      <text x="16" y="56" fontSize="12" className="fill-current text-orange-600 dark:text-orange-400" fontWeight="800">1 · Monosaccharides (C₆H₁₂O₆) — cannot be hydrolysed further</text>
      {hexose(120, 100, "glucose")}
      {hexose(260, 100, "fructose")}
      {hexose(400, 100, "galactose")}
      <text x="470" y="104" fontSize="10" className="fill-current text-muted-foreground">soluble, sweet,</text>
      <text x="470" y="118" fontSize="10" className="fill-current text-muted-foreground">the unit of all carbs</text>

      <text x="16" y="164" fontSize="12" className="fill-current text-orange-600 dark:text-orange-400" fontWeight="800">2 · Disaccharides — two units joined by a glycosidic bond (condensation, −H₂O)</text>
      {hexose(120, 210, "glucose")}
      <line x1="142" y1="210" x2="218" y2="210" strokeWidth="3" className="stroke-current text-rose-500" />
      <text x="180" y="202" fontSize="9.5" textAnchor="middle" className="fill-current text-rose-600 dark:text-rose-400" fontWeight="800">glycosidic</text>
      {hexose(240, 210, "fructose")}
      <text x="300" y="214" fontSize="11" className="fill-current text-foreground" fontWeight="800">= sucrose (cane sugar)</text>
      <text x="300" y="230" fontSize="10" className="fill-current text-muted-foreground">glucose+galactose = lactose · glucose+glucose = maltose</text>

      <text x="16" y="262" fontSize="12" className="fill-current text-orange-600 dark:text-orange-400" fontWeight="800">3 · Polysaccharides — hundreds of units in chains</text>
      <g style={{ color: "rgb(249 115 22 / 0.85)" }}>
        {Array.from({ length: 12 }, (_, i) => (
          <polygon key={i} points={`${440 + i * 16},282 ${448 + i * 16},277 ${456 + i * 16},282 ${456 + i * 16},290 ${448 + i * 16},295 ${440 + i * 16},290`} className="fill-current text-orange-500/20" strokeWidth="1.5" stroke="currentColor" />
        ))}
      </g>
      <text x="16" y="292" fontSize="10" className="fill-current text-muted-foreground">starch (plant storage) · glycogen (animal storage, liver) · cellulose (plant wall, structural)</text>
    </svg>
  );
}
