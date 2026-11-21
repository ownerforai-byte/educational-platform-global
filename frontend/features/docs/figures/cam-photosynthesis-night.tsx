/** CAM photosynthesis — the xerophyte's night shift. Well-detailed. Theme-aware. */
export function CamPhotosynthesisNight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="CAM photosynthesis crassulacean acid metabolism night CO2 stomata day malic acid cactus water saving xerophyte adaptation">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">CAM — opening stomata when the sun is off duty</text>

      {/* night panel */}
      <rect x="30" y="44" width="330" height="220" rx="12" className="fill-current text-indigo-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(99 102 241 / 0.9)" }} />
      <text x="195" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">NIGHT — stomata OPEN</text>
      <circle cx="80" cy="110" r="14" className="fill-current text-indigo-300/40" />
      {[[70, 100], [88, 118]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="2" className="fill-current text-indigo-300" />)}
      {/* stoma open */}
      <ellipse cx="195" cy="130" rx="16" ry="9" className="fill-none stroke-current text-emerald-500" strokeWidth="2.4" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="195" y="106" fontSize="7" textAnchor="middle" className="fill-current text-emerald-500">CO₂ enters</text>
      <text x="195" y="164" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">cool air = little water lost</text>
      {["CO₂ fixed into malic acid,", "stored overnight in the vacuole", "cool night → minimal transpiration"].map((t, i) => (
        <text key={t} x="50" y={196 + i * 16} fontSize="7.2" className="fill-current text-muted-foreground">{i === 0 ? "• " + t : "  " + t}</text>
      ))}
      <text x="50" y="254" fontSize="7" className="fill-current text-indigo-500" fontWeight="700">water saved: stomata shut all day</text>

      {/* day panel */}
      <rect x="390" y="44" width="300" height="220" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="540" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">DAY — stomata CLOSED</text>
      <circle cx="450" cy="110" r="14" className="fill-current text-amber-400/60" />
      {/* stoma shut */}
      <line x1="520" y1="122" x2="556" y2="138" className="stroke-current text-rose-500" strokeWidth="2.6" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      <text x="540" y="106" fontSize="7" textAnchor="middle" className="fill-current text-rose-500">no water escapes</text>
      {["malic acid releases CO₂ inside,", "light reactions run on it,", "sugar is made behind shut doors"].map((t, i) => (
        <text key={t} x="410" y={196 + i * 16} fontSize="7.2" className="fill-current text-muted-foreground">{i === 0 ? "• " + t : "  " + t}</text>
      ))}
      <text x="410" y="254" fontSize="7" className="fill-current text-amber-600" fontWeight="700">photosynthesis with zero daytime sweat</text>
      <rect x="30" y="272" width="660" height="20" rx="6" className="fill-current text-emerald-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="286" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: CAM = Crassulacean Acid Metabolism — cacti, pineapple, aloe; night intake, day manufacture.</text>
    </svg>
  );
}
