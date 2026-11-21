/** Mesophyte middle path — the ordinary plant's balance. Well-detailed. Theme-aware. */
export function MesophyteMiddlePath({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Mesophyte middle path ordinary plants moderate adaptation between hydrophyte xerophyte mango wheat features stomata cuticle balanced">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Mesophytes — the balanced majority</text>

      {/* spectrum */}
      <rect x="30" y="44" width="660" height="90" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <line x1="80" y1="110" x2="640" y2="110" className="stroke-current text-stone-500" strokeWidth="2.4" markerEnd="url(#arrhl)" />
      <circle cx="110" cy="110" r="10" className="fill-current text-sky-500/60" />
      <circle cx="360" cy="110" r="12" className="fill-current text-emerald-600/60" />
      <circle cx="610" cy="110" r="10" className="fill-current text-amber-600/60" />
      <text x="110" y="84" fontSize="7.4" textAnchor="middle" className="fill-current text-sky-600" fontWeight="700">hydrophyte</text>
      <text x="360" y="84" fontSize="7.4" textAnchor="middle" className="fill-current text-emerald-600" fontWeight="800">MESOPHYTE</text>
      <text x="610" y="84" fontSize="7.4" textAnchor="middle" className="fill-current text-amber-600" fontWeight="700">xerophyte</text>
      <text x="110" y="130" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">too much water</text>
      <text x="360" y="130" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">just enough water</text>
      <text x="610" y="130" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">too little water</text>

      {/* features */}
      <rect x="30" y="150" width="330" height="114" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="195" y="172" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE STANDARD KIT</text>
      {[
        "moderate cuticle + normal stomata",
        "broad thin leaves for photosynthesis",
        "well-developed root + vascular system",
        "crops, mango, most forest trees",
      ].map((t, i) => (
        <text key={t} x="50" y={194 + i * 16} fontSize="7.2" className="fill-current text-muted-foreground">• {t}</text>
      ))}

      <rect x="390" y="150" width="300" height="114" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="540" y="172" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHY IT MATTERS</text>
      {[
        "nearly all our food is mesophytic",
        "they wilt in drought — no backup",
        "agriculture = mesophyte management:",
        "  irrigation, drainage, mulching",
      ].map((t, i) => (
        <text key={t} x="410" y={194 + i * 16} fontSize="7.2" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="30" y="272" width="660" height="20" rx="6" className="fill-current text-emerald-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="286" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: mesophytes sit between the extremes — name one feature they share with each neighbour.</text>
    </svg>
  );
}
