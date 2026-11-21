/**
 * Cell theory timeline — Hooke → Leeuwenhoek → Schleiden/Schwann →
 * Virchow, with the three tenets. Theme-aware via currentColor.
 */
export function CellTheoryTimeline({ className }: { className?: string }) {
  const stops = [
    { x: 90, yr: "1665", who: "Robert Hooke", what: "saw 'cells' in cork under his microscope" },
    { x: 250, yr: "1674", who: "Leeuwenhoek", what: "first living cells (microbes) — 'animalcules'" },
    { x: 420, yr: "1838–39", who: "Schleiden & Schwann", what: "all plants / all animals are made of cells" },
    { x: 580, yr: "1855", who: "Virchow", what: "cells arise only from pre-existing cells" },
  ];
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Timeline of cell theory from Hooke observing cork cells in 1665 through Leeuwenhoek, Schleiden and Schwann, to Virchow's omnis cellula e cellula in 1855">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Cell theory — how it was built</text>
      <line x1="60" y1="90" x2="620" y2="90" strokeWidth="4" className="stroke-current text-sky-500" />
      {stops.map((s) => (
        <g key={s.who}>
          <circle cx={s.x} cy="90" r="9" className="fill-current text-sky-500/30" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.95)" }} />
          <text x={s.x} y="66" fontSize="10.5" textAnchor="middle" className="fill-current text-sky-700 dark:text-sky-300" fontWeight="800">{s.yr}</text>
          <text x={s.x} y="120" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">{s.who}</text>
          <text x={s.x} y="136" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">{s.what.split("—")[0].slice(0, 30)}</text>
        </g>
      ))}
      <text x="330" y="180" fontSize="12" textAnchor="middle" className="fill-current text-emerald-600 dark:text-emerald-400" fontWeight="800">The three tenets today:</text>
      <text x="330" y="202" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">① all living things are made of one or more cells</text>
      <text x="330" y="220" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">② the cell is the basic structural &amp; functional unit of life</text>
      <text x="330" y="238" fontSize="10.5" textAnchor="middle" className="fill-current text-foreground">③ new cells arise only from pre-existing cells (Omnis cellula e cellula)</text>
    </svg>
  );
}
