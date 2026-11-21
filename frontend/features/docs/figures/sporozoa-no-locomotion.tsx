/** Sporozoa no locomotion — obligate parasites. Well-detailed. Theme-aware. */
export function SporozoaNoLocomotion({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Sporozoa no locomotion obligate parasites Plasmodium host to host spore like stages no contractile vacuole absorption feeding">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Sporozoa — parasites that never swim</text>
      {/* no-locomotion motif */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">NO LOCOMOTOR ORGANELLES</text>
      {[[90, 120], [160, 120], [230, 120]].map(([x, y], i) => (
        <g key={i}>
          <path d={`M${x - 16} ${y} q16 -20 32 0`} className="fill-none stroke-current" strokeWidth="2.4" style={{ color: "rgb(244 63 94 / 0.9)" }} />
          <line x1={x - 22} y1={y + 8} x2={x + 22} y2={y + 8} className="stroke-current" strokeWidth="2.6" style={{ color: "rgb(244 63 94 / 0.9)" }} />
        </g>
      ))}
      <text x="195" y="160" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">no pseudopodia, no flagella, no cilia —</text>
      <text x="195" y="176" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">the host's body does all the travelling</text>
      <text x="195" y="204" fontSize="6.8" textAnchor="middle" className="fill-current text-rose-600" fontWeight="700">no contractile vacuole either — the host's fluids</text>
      <text x="195" y="218" fontSize="6.8" textAnchor="middle" className="fill-current text-rose-600" fontWeight="700">keep osmotic balance for them</text>
      {/* host-to-host */}
      <rect x="390" y="44" width="300" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">HOST TO HOST BY VECTOR</text>
      <circle cx="460" cy="130" r="24" className="fill-current text-rose-500/20" stroke="currentColor" strokeWidth="1.8" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="460" y="134" fontSize="6" textAnchor="middle" className="fill-current text-foreground">human</text>
      <path d="M492 118 q48 -26 96 0" className="fill-none stroke-current text-sky-500" strokeWidth="2" strokeDasharray="4 3" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <circle cx="620" cy="130" r="20" className="fill-current text-amber-500/25" stroke="currentColor" strokeWidth="1.8" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="620" y="134" fontSize="5.6" textAnchor="middle" className="fill-current text-foreground">vector</text>
      <text x="540" y="180" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">spore-like infective stages (sporozoites)</text>
      <text x="540" y="196" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">shuttle between hosts; feeding is by absorption</text>
      <rect x="30" y="240" width="660" height="52" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="258" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">The trade-off: losing locomotion is cheap when someone else's bloodstream is your taxi and your food supply.</text>
      <text x="360" y="276" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: Sporozoa = no locomotor organelles + no contractile vacuole + Plasmodium as the type example.</text>
      <text x="360" y="288" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">All three absences are examinable — parasites lose what the host provides.</text>
    </svg>
  );
}
