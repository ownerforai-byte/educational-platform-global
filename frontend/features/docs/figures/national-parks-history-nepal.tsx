/** National parks history Nepal — from Rara to network. Well-detailed. Theme-aware. */
export function NationalParksHistoryNepal({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="National parks history Nepal 1973 National Parks Wildlife Conservation Act first protected area Chitwan Rara Sagarmatha network growth timeline 12 parks coverage 23 percent buffer zones community partnership model">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Nepal's parks — a network built in five decades</text>
      {/* timeline */}
      <rect x="30" y="44" width="660" height="160" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <line x1="70" y1="120" x2="650" y2="120" className="stroke-current" strokeWidth="3" style={{ color: "rgb(16 185 129 / 0.5)" }} />
      {[
        ["1973", "National Parks & Wildlife Conservation Act; Chitwan NP first", 130],
        ["1976", "Lake Rara NP — protecting the alpine west", 280],
        ["1976–83", "Sagarmatha, Langtang: mountains join the system", 430],
        ["1990s+", "buffer zones and conservation areas add the community layer", 580],
      ].map(([yr, ev, x], i) => (
        <g key={yr as string}>
          <circle cx={x as number} cy="120" r="7" className="fill-current" style={{ color: "rgb(16 185 129 / 0.8)" }} />
          <text x={x as number} y={i % 2 === 0 ? 100 : 150} fontSize="7" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{yr as string}</text>
          <text x={x as number} y={i % 2 === 0 ? 112 : 162} fontSize="5.4" textAnchor="middle" className="fill-current text-muted-foreground">{(ev as string).slice(0, 30)}</text>
          <text x={x as number} y={i % 2 === 0 ? 122 : 172} fontSize="5.4" textAnchor="middle" className="fill-current text-muted-foreground">{(ev as string).slice(30, 60)}</text>
        </g>
      ))}
      <text x="360" y="196" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">from one park to a full-terrain network: Terai plains, mid-hills, and the highest mountains on Earth</text>
      {/* facts */}
      <rect x="30" y="210" width="660" height="82" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="230" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Today: 12 national parks, 1 wildlife reserve, 1 hunting reserve, 6 conservation areas, 13 buffer zones — about 23.4% of the country.</text>
      <text x="360" y="248" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Nepal's model is distinctive: parks plus people — buffer zones share tourism revenue with local communities.</text>
      <text x="360" y="266" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: 1973 Act + Chitwan first + ~23% coverage — three facts that anchor any protected-area answer.</text>
      <text x="360" y="282" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">The network spans every ecological belt — a vertical conservation gradient from 70 m to 8,848 m.</text>
    </svg>
  );
}
