/** Nepal flora composition — plant groups by count. Well-detailed. Theme-aware. */
export function NepalFloraComposition({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Nepal flora composition flowering plants about 7000 species bryophytes pteridophytes gymnosperms algae fungi lichens horizontal bar chart percentages of world flora">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Nepal's flora — which groups, how many</text>

      {[
        { l: "Flowering plants (angiosperms)", v: "~7,000", w: 480, c: "rgb(22 163 74 / 0.9)" },
        { l: "Fungi", v: "~2,500", w: 170, c: "rgb(245 158 11 / 0.9)" },
        { l: "Bryophytes (mosses, liverworts)", v: "~1,150", w: 80, c: "rgb(14 165 233 / 0.9)" },
        { l: "Lichens", v: "~1,000", w: 70, c: "rgb(139 92 246 / 0.9)" },
        { l: "Pteridophytes (ferns)", v: "~650", w: 45, c: "rgb(20 184 166 / 0.9)" },
        { l: "Gymnosperms", v: "~30", w: 14, c: "rgb(244 63 94 / 0.9)" },
      ].map((b, i) => (
        <g key={b.l}>
          <text x="20" y={64 + i * 34} fontSize="7.4" className="fill-current text-foreground" fontWeight="700">{b.l}</text>
          <rect x="20" y={72 + i * 34} width={b.w} height="14" rx="4" style={{ color: b.c }} className="fill-current opacity-70" />
          <text x={24 + b.w} y={84 + i * 34} fontSize="7.4" className="fill-current text-muted-foreground" fontWeight="700">{b.v}</text>
        </g>
      ))}

      <rect x="560" y="52" width="140" height="120" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <text x="630" y="76" fontSize="7.8" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHY SO RICH?</text>
      {["altitude span 60–8848 m", "monsoon + aspect variety", "Ice Age refuge valleys"].map((t, i) => (
        <text key={t} x="574" y={98 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">• {t}</text>
      ))}

      <text x="16" y="290" fontSize="8.4" className="fill-current text-muted-foreground">Angiosperms dominate every count — but the small groups matter too: Nepal's gymnosperms include the only Himalayan conifer endemics.</text>
    </svg>
  );
}
