/** Three nephridia types — septal, integumentary, pharyngeal compared. Theme-aware. */
export function NephridiaTypesComparison({ className }: { className?: string }) {
  const card = (x: number, c: string, t: string, items: string[], k: string) => (
    <g key={k}>
      <rect x={x} y="56" width="196" height="150" rx="12" style={{ color: c }} className="fill-current opacity-10" strokeWidth="2.5" stroke="currentColor" />
      <text x={x + 98} y="82" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{t}</text>
      {items.map((s, i) => (
        <text key={i} x={x + 14} y={106 + i * 22} fontSize="8.5" className="fill-current text-muted-foreground">• {s}</text>
      ))}
    </g>
  );
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Three types of earthworm nephridia septal integumentary and pharyngeal compared by location opening and discharge route">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Three nephridia, three addresses</text>
      {card(16, "rgb(14 165 233 / 0.9)", "SEPTAL", ["from segment 15 onward", "hang on each septum", "opens into intestine", "(enteronephric)", "largest & most numerous"], "a")}
      {card(232, "rgb(16 185 129 / 0.9)", "INTEGUMENTARY", ["segments 3 to last", "attached to body wall", "opens on skin surface", "(exonephric)", "small, paired"], "b")}
      {card(448, "rgb(245 158 11 / 0.9)", "PHARYNGEAL", ["segments 4–6 only", "on pharyngeal wall", "discharge into pharynx", "(enteronephric)", "help moisten food too"], "c")}
      <text x="16" y="228" fontSize="10" className="fill-current text-muted-foreground">All three share the same plan — nephrostome → neck → loop body → duct — differing only in where they sit and drain.</text>
    </svg>
  );
}
