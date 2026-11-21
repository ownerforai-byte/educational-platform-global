/** Mustard economy — Brassicaceae crops and products. Well-detailed. Theme-aware. */
export function MustardEconomy({ className }: { className?: string }) {
  const uses: [string, string, string][] = [
    ["Oil", "mustard seeds crushed for cooking oil — Nepal's kitchen staple", "rgb(245 158 11)"],
    ["Vegetables", "cabbage, cauliflower, radish, turnip — same family, bred shapes", "rgb(22 163 74)"],
    ["Greens", "rayo saag — young leaves eaten daily in the hills", "rgb(2 132 199)"],
    ["Condiment", "pungent seeds ground for pickles and spice mixes", "rgb(139 92 246)"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Mustard economy Brassicaceae crops mustard oil cooking cabbage cauliflower radish rayo saag greens condiment seeds Nepal agriculture">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Brassicaceae pays the bills — the mustard economy</text>

      {/* plant drawing */}
      <rect x="30" y="44" width="380" height="220" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="220" y="64" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">BRASSICA CAMPESTRIS — MUSTARD PLANT</text>
      {/* stem with raceme */}
      <path d="M220 240 q-6 -60 0 -120 q4 -40 0 -50" className="fill-none stroke-current text-emerald-700" strokeWidth="4" style={{ color: "rgb(20 83 45 / 0.9)" }} />
      {/* leaves */}
      {[[200, 200, -1], [240, 176, 1], [204, 150, -1]].map(([x, y, k], i) => (
        <ellipse key={i} cx={x} cy={y} rx="18" ry="7" className="fill-current text-emerald-600/40" transform={`rotate(${k * 20} ${x} ${y})`} />
      ))}
      {/* flowers at top */}
      {[[216, 70], [226, 62], [236, 72], [222, 84], [232, 88]].map(([x, y], i) => (
        <g key={i}>
          {[0, 90, 180, 270].map((a) => (
            <ellipse key={a} cx={x + 5 * Math.cos((a * Math.PI) / 180)} cy={y + 5 * Math.sin((a * Math.PI) / 180)} rx="4" ry="2.4" className="fill-current text-yellow-400/60" transform={`rotate(${a} ${x + 5 * Math.cos((a * Math.PI) / 180)} ${y + 5 * Math.sin((a * Math.PI) / 180)})`} />
          ))}
        </g>
      ))}
      <text x="270" y="74" fontSize="7.2" className="fill-current text-yellow-600" fontWeight="700">four petals in a cross (+)</text>
      {/* siliques */}
      {[[180, 120], [258, 130]].map(([x, y], i) => (
        <g key={i}>
          <rect x={x} y={y} width="6" height="42" rx="3" className="fill-current text-emerald-700/50" />
          <text x={x - 10} y={y + 58} fontSize="6.6" className="fill-current text-emerald-700">silique</text>
        </g>
      ))}
      <text x="50" y="256" fontSize="7.2" className="fill-current text-muted-foreground">Seeds in two rows inside each silique — the oil crop.</text>

      {/* uses card */}
      <rect x="430" y="44" width="260" height="220" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="560" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">FOUR WAYS IT FEEDS NEPAL</text>
      {uses.map(([name, detail, rgb], i) => (
        <g key={name}>
          <circle cx={456} cy={100 + i * 40} r="7" className="fill-current" style={{ color: rgb, opacity: 0.5 }} />
          <text x="472" y={96 + i * 40} fontSize="7.6" className="fill-current text-foreground" fontWeight="700">{name}</text>
          <text x="472" y={110 + i * 40} fontSize="6.6" className="fill-current text-muted-foreground">{detail}</text>
        </g>
      ))}
      <text x="446" y="256" fontSize="7" className="fill-current text-muted-foreground">One family = oil, vegetables, greens, spice.</text>
    </svg>
  );
}
