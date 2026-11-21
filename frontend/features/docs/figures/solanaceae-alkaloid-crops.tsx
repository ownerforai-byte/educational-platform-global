/** Solanaceae alkaloid crops — potato, tomato, tobacco. Well-detailed. Theme-aware. */
export function SolanaceaeAlkaloidCrops({ className }: { className?: string }) {
  const crops: [string, string, string][] = [
    ["Potato", "swollen underground stem tuber — the 'eyes' are buds", "rgb(180 130 40)"],
    ["Tomato", "berry fruit, axile placentation, seed-rich chambers", "rgb(239 68 68)"],
    ["Tobacco", "leaves harvest nicotine — an insecticidal alkaloid", "rgb(120 113 108)"],
    ["Chilli", "berry with capsaicin heat, a Nepali kitchen essential", "rgb(220 38 38)"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Solanaceae alkaloid crops potato tuber tomato berry tobacco nicotine chilli capsaicin nightshade family five-lobed rotate corolla epipetalous stamens food and pharmacy">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Solanaceae — food and pharmacy in one family</text>

      {/* flower signature */}
      <rect x="30" y="44" width="280" height="180" rx="12" className="fill-current text-violet-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="170" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">FLOWER SIGNATURE</text>
      {/* rotate corolla: five lobes */}
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse key={a} cx={170 + 26 * Math.cos((a * Math.PI) / 180)} cy={140 + 26 * Math.sin((a * Math.PI) / 180)} rx="18" ry="10" className="fill-current text-violet-400/30" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(139 92 246 / 0.9)" }} transform={`rotate(${a} ${170 + 26 * Math.cos((a * Math.PI) / 180)} ${140 + 26 * Math.sin((a * Math.PI) / 180)})`} />
      ))}
      <circle cx="170" cy="140" r="10" className="fill-current text-amber-500/60" />
      {/* epipetalous stamens */}
      {[0, 72, 144, 216, 288].map((a) => (
        <line key={a} x1={170 + 8 * Math.cos((a * Math.PI) / 180)} y1={140 + 8 * Math.sin((a * Math.PI) / 180)} x2={170 + 20 * Math.cos((a * Math.PI) / 180)} y2={140 + 20 * Math.sin((a * Math.PI) / 180)} className="stroke-current text-amber-700" strokeWidth="2" style={{ color: "rgb(146 64 14 / 0.9)" }} />
      ))}
      <text x="60" y="196" fontSize="7.2" className="fill-current text-muted-foreground">five-lobed rotate corolla;</text>
      <text x="60" y="210" fontSize="7.2" className="fill-current text-muted-foreground">stamens glued to petals (epipetalous)</text>

      {/* crops card */}
      <rect x="330" y="44" width="360" height="180" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="510" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE FAMILY'S HARVEST</text>
      {crops.map(([name, detail, rgb], i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const x = 346 + col * 172;
        const y = 84 + row * 66;
        return (
          <g key={name}>
            <circle cx={x + 10} cy={y + 8} r="8" className="fill-current" style={{ color: rgb, opacity: 0.45 }} />
            <text x={x + 26} y={y + 6} fontSize="7.8" className="fill-current text-foreground" fontWeight="700">{name}</text>
            <text x={x + 26} y={y + 20} fontSize="6.4" className="fill-current text-muted-foreground">{detail.slice(0, 40)}</text>
            {detail.length > 40 && <text x={x + 26} y={y + 31} fontSize="6.4" className="fill-current text-muted-foreground">{detail.slice(40, 80)}</text>}
          </g>
        );
      })}
      <text x="346" y="216" fontSize="7" className="fill-current text-violet-500" fontWeight="700">alkaloids: nicotine, solanine, atropine — medicine or poison, dose decides</text>

      <rect x="30" y="240" width="660" height="48" rx="10" className="fill-current text-rose-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="50" y="260" fontSize="7.8" className="fill-current text-foreground" fontWeight="700">Warning built into the family: green potato skin carries solanine; deadly nightshade carries atropine. The same chemistry that heals can kill.</text>
      <text x="50" y="278" fontSize="7.2" className="fill-current text-muted-foreground">Exam hook: berry fruit + epipetalous stamens + many-seeded berry = Solanaceae; potato is a stem tuber, not a root.</text>
    </svg>
  );
}
