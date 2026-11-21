/** Encystment survival — the resting cyst. Well-detailed. Theme-aware. */
export function EncystmentSurvival({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Encystment survival cyst wall dormant stage drought desiccation dispersal wind water active trophozoite excystment protozoa">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Encystment — a lifeboat with a wall</text>
      {/* active vs cyst */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">ACTIVE TROPHOZOITE</text>
      <ellipse cx="150" cy="130" rx="46" ry="34" className="fill-current text-emerald-500/20" stroke="currentColor" strokeWidth="1.8" style={{ color: "rgb(5 122 85 / 0.9)" }} />
      <path d="M196 120 q26 -14 40 -2" className="fill-none stroke-current" strokeWidth="2.4" style={{ color: "rgb(5 122 85 / 0.9)" }} />
      <text x="195" y="192" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">feeding, moving, dividing — but defenceless against drying</text>
      {/* cyst */}
      <rect x="390" y="44" width="300" height="180" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">CYST</text>
      <circle cx="540" cy="130" r="44" className="fill-current text-amber-600/20" stroke="currentColor" strokeWidth="3" style={{ color: "rgb(217 119 6 / 0.9)" }} strokeDasharray="6 3" />
      <circle cx="540" cy="130" r="24" className="fill-current text-emerald-500/20" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(5 122 85 / 0.9)" }} />
      <text x="540" y="192" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">thick secreted wall — metabolism almost stopped</text>
      <rect x="30" y="240" width="660" height="52" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="258" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Three jobs of the cyst: survive drying and heat, disperse (wind, water, hosts), and wait out bad conditions until excystment.</text>
      <text x="360" y="276" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: cysts survive, trophozoites thrive — name both stages and the trigger for each.</text>
      <text x="360" y="288" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Encystment is also how many parasites survive stomach acid on the way in.</text>
    </svg>
  );
}
