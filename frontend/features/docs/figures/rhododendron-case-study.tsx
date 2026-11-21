/** Rhododendron case study — Nepal's national flower. Well-detailed. Theme-aware. */
export function RhododendronCaseStudy({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Rhododendron case study Nepal national flower lali gurans 30 plus species in Nepal altitude 1200 to 3600 metres evergreen forest ecological role pollinators economic value tourism threats">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Case study: Rhododendron — Nepal's national flower</text>

      {/* flower */}
      <rect x="30" y="44" width="280" height="180" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      {[0, 72, 144, 216, 288].map((a) => {
        const rad = (a * Math.PI) / 180;
        return <ellipse key={a} cx={170 + 22 * Math.cos(rad)} cy={130 + 22 * Math.sin(rad)} rx="16" ry="12" className="fill-current text-rose-500/40" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(244 63 94 / 0.9)" }} transform={`rotate(${a} ${170 + 22 * Math.cos(rad)} ${130 + 22 * Math.sin(rad)})`} />;
      })}
      <circle cx="170" cy="130" r="8" className="fill-current text-amber-500/60" />
      <text x="170" y="200" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">Lali Gurans (R. arboreum)</text>
      <text x="170" y="216" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">bell-shaped crimson flowers in clusters</text>

      {/* facts */}
      <rect x="330" y="44" width="360" height="180" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(22 163 74 / 0.9)" }} />
      <text x="350" y="66" fontSize="8.6" className="fill-current text-foreground" fontWeight="800">WHY IT MATTERS</text>
      {[
        "30+ species in Nepal — a centre of diversity",
        "blooms 1,200–3,600 m; mid-hills turn red in spring",
        "keystone for sunbirds and pollinating insects",
        "spring tourism draw — rhododendron treks",
        "bark and flowers used in traditional medicine",
      ].map((t, i) => (
        <text key={t} x="350" y={90 + i * 20} fontSize="7.4" className="fill-current text-muted-foreground">• {t}</text>
      ))}

      <rect x="30" y="240" width="660" height="46" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="50" y="262" fontSize="8.2" className="fill-current text-foreground" fontWeight="700">Lesson: one charismatic genus links ecology, economy and identity — protecting its forest protects everything living under it.</text>
      <text x="50" y="279" fontSize="7.6" className="fill-current text-muted-foreground">Threats: fuelwood cutting and land conversion thin the mid-hill belt where it dominates.</text>
    </svg>
  );
}
