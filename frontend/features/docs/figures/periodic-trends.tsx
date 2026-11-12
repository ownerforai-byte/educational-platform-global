/**
 * Periodic trends across a period and down a group — atomic radius falls
 * left→right and rises top→bottom; ionisation energy and electronegativity do
 * the opposite. Theme-aware via currentColor.
 */
export function PeriodicTrendsDiagram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 380" className={className} role="img" aria-label="Periodic table fragment showing trends in atomic radius, ionisation energy and electronegativity">
      {/* period axis */}
      <text x="18" y="26" fontSize="13" className="fill-current text-muted-foreground" fontWeight="600">Period → (across)</text>
      <text x="18" y="46" fontSize="13" className="fill-current text-muted-foreground" fontWeight="600">Group ↓ (down)</text>

      {/* grid of cells: 4 columns (left→right across a period) x 3 rows (down a group) */}
      {[
        { x: 70, y: 70, label: "Li", z: 3, t: "text-sky-500" },
        { x: 170, y: 70, label: "Be", z: 4, t: "text-sky-400" },
        { x: 270, y: 70, label: "B", z: 5, t: "text-emerald-500" },
        { x: 370, y: 70, label: "C", z: 6, t: "text-emerald-400" },
        { x: 70, y: 160, label: "Na", z: 11, t: "text-amber-500" },
        { x: 170, y: 160, label: "Mg", z: 12, t: "text-amber-400" },
        { x: 270, y: 160, label: "Al", z: 13, t: "text-rose-500" },
        { x: 370, y: 160, label: "Si", z: 14, t: "text-rose-400" },
        { x: 70, y: 250, label: "K", z: 19, t: "text-violet-500" },
        { x: 170, y: 250, label: "Ca", z: 20, t: "text-violet-400" },
        { x: 270, y: 250, label: "Ga", z: 31, t: "text-fuchsia-500" },
        { x: 370, y: 250, label: "Ge", z: 32, t: "text-fuchsia-400" },
      ].map((c) => (
        <g key={c.label}>
          <rect x={c.x} y={c.y} width="80" height="70" rx="10" strokeWidth="2" className={`fill-current ${c.t} fill-opacity-10 stroke-current`} />
          <text x={c.x + 40} y={c.y + 34} fontSize="20" textAnchor="middle" fontWeight="700" className={`fill-current ${c.t}`}>{c.label}</text>
          <text x={c.x + 40} y={c.y + 56} fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Z = {c.z}</text>
        </g>
      ))}

      {/* across-period arrows */}
      <line x1="66" y1="352" x2="452" y2="352" strokeWidth="2.5" className="stroke-current text-primary" />
      <polygon points="446,345 462,352 446,359" className="fill-current text-primary" />
      <text x="66" y="342" fontSize="12.5" className="fill-current text-primary" fontWeight="700">radius ↓ · ionisation energy ↑ · electronegativity ↑</text>
      <text x="66" y="374" fontSize="11.5" className="fill-current text-muted-foreground">nuclear charge grows, same shell → electrons held tighter</text>

      {/* down-group arrow */}
      <line x1="490" y1="66" x2="490" y2="326" strokeWidth="2.5" className="stroke-current text-rose-500" />
      <polygon points="483,320 490,336 497,320" className="fill-current text-rose-500" />
      <text x="504" y="120" fontSize="12.5" className="fill-current text-rose-600 dark:text-rose-400" fontWeight="700">down a group</text>
      <text x="504" y="142" fontSize="11.5" className="fill-current text-muted-foreground">new shell added:</text>
      <text x="504" y="160" fontSize="11.5" className="fill-current text-muted-foreground">radius ↑</text>
      <text x="504" y="178" fontSize="11.5" className="fill-current text-muted-foreground">IE ↓</text>
      <text x="504" y="196" fontSize="11.5" className="fill-current text-muted-foreground">electronegativity ↓</text>
    </svg>
  );
}
