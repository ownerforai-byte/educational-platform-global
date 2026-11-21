/** Primary terrestrial adaptations — against drying. Theme-aware. */
export function PrimaryTerrestrialAdaptations({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Primary terrestrial adaptations against drying waterproof skin exoskeleton scales cuticle internal fertilisation amniote shelled egg lungs replacing gills kidneys conserving water">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">The drying problem — four fixes</text>

      {[
        { x: 40, t: "WATERPROOF COVER", s: "reptile scales, insect", s2: "cuticle — water stays in", c: "rgb(245 158 11 / 0.9)" },
        { x: 210, t: "AMNIOTE EGG", s: "internal fertilisation;", s2: "shelled egg needs no pond", c: "rgb(22 163 74 / 0.9)" },
        { x: 380, t: "LUNGS", s: "replace gills —", s2: "air is 20% O₂, water ~1%", c: "rgb(14 165 233 / 0.9)" },
        { x: 550, t: "WATER-SAVING KIDNEYS", s: "conserve water,", s2: "excrete salts and urea", c: "rgb(124 58 237 / 0.9)" },
      ].map((n) => (
        <g key={n.t}>
          <rect x={n.x - 26} y="56" width="160" height="110" rx="12" style={{ color: n.c }} className="fill-current opacity-10" strokeWidth="2.5" stroke="currentColor" />
          <text x={n.x + 54} y="82" fontSize="8.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{n.t}</text>
          <text x={n.x + 54} y="104" fontSize="7.6" textAnchor="middle" className="fill-current text-muted-foreground">{n.s}</text>
          <text x={n.x + 54} y="120" fontSize="7.6" textAnchor="middle" className="fill-current text-muted-foreground">{n.s2}</text>
        </g>
      ))}

      <rect x="40" y="184" width="580" height="36" rx="10" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="56" y="207" fontSize="9" className="fill-current text-foreground" fontWeight="700">The stakes: life began in water. Colonising land meant surviving desiccation — every fix above is a checkpoint in animal evolution.</text>
    </svg>
  );
}
