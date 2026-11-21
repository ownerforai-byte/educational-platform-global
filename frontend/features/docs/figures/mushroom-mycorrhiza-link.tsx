/** Mycorrhiza link — fungus-root partnership. Well-detailed. Theme-aware. */
export function MushroomMycorrhizaLink({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Mycorrhiza symbiosis fungus hyphae around tree roots exchange phosphorus minerals and water for sugars mushroom benefits both partners soil network">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Mycorrhiza — the underground partnership</text>

      {/* tree */}
      <rect x="30" y="44" width="330" height="220" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="195" y="64" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">PINE TREE</text>
      <circle cx="195" cy="96" r="26" className="fill-current text-emerald-600/30" stroke="currentColor" strokeWidth="2" style={{ color: "rgb(5 122 85 / 0.9)" }} />
      <rect x="191" y="120" width="8" height="52" rx="3" className="fill-current text-amber-800/40" />
      <path d="M195 172 q-40 24 -70 44 M195 172 q40 24 70 44 M195 172 q-14 30 -22 52 M195 172 q14 30 22 52" className="fill-none stroke-current text-amber-800" strokeWidth="2.4" style={{ color: "rgb(146 64 14 / 0.9)" }} />
      <text x="195" y="252" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">roots sheathed by fungal mantle</text>

      {/* hyphal network */}
      <rect x="390" y="44" width="300" height="220" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="540" y="64" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">HYPHAL NETWORK</text>
      {[[420, 110, 520, 150], [520, 150, 640, 110], [520, 150, 460, 210], [520, 150, 620, 220], [460, 210, 640, 180], [420, 110, 460, 210]].map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} className="stroke-current text-amber-600" strokeWidth="2" strokeDasharray="4 3" style={{ color: "rgb(180 130 40 / 0.9)" }} />
      ))}
      {[[420, 110], [520, 150], [640, 110], [460, 210], [620, 220], [640, 180]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="5" className="fill-current text-amber-600/50" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(180 130 40 / 0.9)" }} />
      ))}
      <text x="540" y="252" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">threads reach far beyond the roots</text>

      {/* exchange arrows */}
      <rect x="30" y="272" width="660" height="20" rx="8" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="50" y="286" fontSize="7.6" className="fill-current text-foreground" fontWeight="700">EXCHANGE: fungus gives tree phosphorus + nitrogen + water → tree gives fungus sugars from photosynthesis. Both grow better — mutualism.</text>
    </svg>
  );
}
