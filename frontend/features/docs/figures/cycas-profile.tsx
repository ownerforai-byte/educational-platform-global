/** Cycas profile — coralloid roots, sago, crown. Well-detailed. Theme-aware. */
export function CycasProfile({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Cycas profile sago palm unbranched trunk crown of fern-like leaves coralloid roots cyanobacteria nitrogen sago starch old lineage palm-like gymnosperm">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Cycas — the living fossil that looks like a palm</text>

      {/* plant drawing */}
      <rect x="30" y="44" width="380" height="220" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="220" y="64" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">PALM-LIKE, BUT A GYMNOSPERM</text>
      {/* trunk */}
      <rect x="206" y="120" width="28" height="120" rx="8" className="fill-current text-amber-800/40" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(146 64 14 / 0.9)" }} />
      {/* leaf scars */}
      {[132, 148, 164, 180, 196, 212].map((y) => (
        <line key={y} x1="208" y1={y} x2="232" y2={y} className="stroke-current text-amber-900" strokeWidth="1.4" style={{ color: "rgb(120 53 15 / 0.9)" }} />
      ))}
      {/* crown of hard leaves */}
      {[-60, -40, -20, 0, 20, 40, 60].map((dx, i) => (
        <path key={dx} d={`M220 122 q${dx / 2} -34 ${dx} -26`} className="fill-none stroke-current text-emerald-600" strokeWidth="3.4" style={{ color: "rgb(5 122 85 / 0.9)" }} />
      ))}
      <text x="290" y="86" fontSize="7.2" className="fill-current text-emerald-700" fontWeight="700">stiff, fern-like leaflets in a crown</text>
      {/* coralloid roots */}
      {[[206, 240, 180, 252], [234, 240, 260, 252]].map(([x1, y1, x2, y2], i) => (
        <g key={i}>
          <path d={`M${x1} ${y1} q-14 6 -${x1 - x2} ${y2 - y1}`} className="fill-none stroke-current text-amber-800" strokeWidth="2.6" style={{ color: "rgb(146 64 14 / 0.9)" }} />
          <circle cx={x2} cy={y2} r="7" className="fill-current text-rose-400/40" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(251 113 133 / 0.9)" }} />
        </g>
      ))}
      <text x="280" y="256" fontSize="7" className="fill-current text-rose-400">coralloid roots — cyanobacteria fix N₂ inside</text>

      {/* notes card */}
      <rect x="430" y="44" width="260" height="220" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="560" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">CYCAS SIGNATURES</text>
      {[
        "unbranched trunk with leaf scars",
        "crown of hard, glossy leaflets",
        "coralloid roots host cyanobacteria",
        "sago starch stored in the trunk",
        "male cone big and terminal;",
        "megasporophylls loose, leaf-like",
        "seeds red, large, exposed",
      ].map((t, i) => (
        <text key={t} x="446" y={94 + i * 22} fontSize="7.4" className="fill-current text-muted-foreground">• {t}</text>
      ))}
      <text x="446" y="248" fontSize="7.2" className="fill-current text-muted-foreground">Exam hook: 'coralloid roots + sago'</text>
      <text x="446" y="262" fontSize="7.2" className="fill-current text-muted-foreground">identifies Cycas instantly.</text>
    </svg>
  );
}
