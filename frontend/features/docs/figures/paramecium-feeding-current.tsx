/** Paramecium feeding current — oral groove mechanics. Well-detailed. Theme-aware. */
export function ParameciumFeedingCurrent({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Paramecium feeding current oral groove cilia sweep food vacuole gullet cytopharynx digestion route bacteria yeast cells">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">How Paramecium eats — a conveyor of cilia</text>
      {/* cell */}
      <ellipse cx="240" cy="150" rx="150" ry="80" className="fill-current text-sky-500/10" stroke="currentColor" strokeWidth="2.4" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      {/* oral groove */}
      <path d="M330 100 q-50 20 -70 56 q-10 22 6 34" className="fill-none stroke-current" strokeWidth="3" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="352" y="96" fontSize="6.8" className="fill-current text-sky-600" fontWeight="700">oral groove → gullet</text>
      {/* food current arrows */}
      {[[120, 92, 180, 78], [150, 200, 210, 216], [340, 190, 300, 208]].map(([x1, y1, x2, y2], i) => (
        <path key={i} d={`M${x1} ${y1} Q ${(x1 + x2) / 2} ${(y1 + y2) / 2 - 16} ${x2} ${y2}`} className="fill-none stroke-current text-amber-600" strokeWidth="1.6" strokeDasharray="4 3" style={{ color: "rgb(217 119 6 / 0.9)" }} markerEnd="url(#arrpf)" />
      ))}
      <defs>
        <marker id="arrpf" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
          <path d="M0 0 L7 3.5 L0 7 Z" className="fill-current text-amber-600" style={{ color: "rgb(217 119 6 / 0.9)" }} />
        </marker>
      </defs>
      {/* food vacuoles */}
      {[[210, 168], [188, 182], [166, 194]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="8" className="fill-current text-emerald-600/30" stroke="currentColor" strokeWidth="1.2" style={{ color: "rgb(5 122 85 / 0.9)" }} />
      ))}
      <text x="188" y="224" fontSize="6.4" textAnchor="middle" className="fill-current text-muted-foreground">food vacuoles drift backwards, digesting as they go</text>
      {/* facts */}
      <rect x="450" y="44" width="240" height="216" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="570" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE FEEDING LINE</text>
      {[
        "cilia beat water toward the groove",
        "bacteria and yeasts ride the current",
        "food vacuole pinches off at the",
        "  bottom of the gullet",
        "vacuole circulates through the cell",
        "enzymes digest; wastes egest at a",
        "  fixed anal spot (cytoproct)",
      ].map((t, i) => (
        <text key={t} x="466" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: trace the route — cilia → oral groove → gullet → food vacuole → cytoproct. Five stops, five marks.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Holozoic feeding with a conveyor belt — the ciliate's signature trick.</text>
    </svg>
  );
}
