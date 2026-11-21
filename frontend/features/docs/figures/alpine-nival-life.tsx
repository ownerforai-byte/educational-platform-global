/** Alpine meadow nival life — the top of the plant world. Well-detailed. Theme-aware. */
export function AlpineNivalLife({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Alpine meadow bugyal nival zone snowline cushion plants lichens mosses yarsagumba grazing altitude vegetation limit">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Above the trees — alpine meadow and nival zone</text>

      {/* mountains */}
      <rect x="30" y="44" width="400" height="220" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <path d="M50 250 L170 110 L290 250" className="fill-none stroke-current text-stone-500" strokeWidth="2.4" />
      <path d="M250 250 L400 130 L530 250" className="fill-none stroke-current text-stone-500" strokeWidth="2.4" />
      {/* snowcaps */}
      <path d="M155 130 L170 110 L185 130 q-15 8 -30 0" className="fill-current text-slate-200/70" />
      <path d="M385 150 L400 130 L415 150 q-15 8 -30 0" className="fill-current text-slate-200/70" />
      {/* meadow dots */}
      {[300, 330, 360, 390, 420, 450].map((x, i) => (
        <circle key={i} cx={x} cy={228 + (i % 2) * 8} r="4" className="fill-current text-lime-500/50" />
      ))}
      <text x="330" y="266" fontSize="6.8" className="fill-current text-muted-foreground">alpine meadow (bugyal): grasses, cushion plants, medicinal herbs</text>
      <text x="60" y="100" fontSize="7" className="fill-current text-muted-foreground">nival zone: above the snowline only lichens and mosses persist</text>

      {/* facts */}
      <rect x="450" y="44" width="240" height="220" rx="12" className="fill-current text-lime-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(132 204 22 / 0.9)" }} />
      <text x="570" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">LIFE AT THE TOP</text>
      {[
        "tree line ends ~4000 m —",
        "  cold and wind stop trunks",
        "cushion and mat plants hug",
        "  the warm ground",
        "yarsagumba harvested in",
        "  alpine meadows each spring",
        "nival = snowline: lichens,",
        "  mosses, nothing woody",
      ].map((t, i) => (
        <text key={t} x="466" y={94 + i * 17} fontSize="7.2" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <text x="466" y="238" fontSize="7" className="fill-current text-lime-600" fontWeight="700">Pasture in summer, snowfield in winter —</text>
      <text x="466" y="252" fontSize="7" className="fill-current text-lime-600" fontWeight="700">the shortest growing season in Nepal.</text>
      <text x="466" y="272" fontSize="7" className="fill-current text-muted-foreground">Exam hook: what grows in the nival zone?</text>
    </svg>
  );
}
