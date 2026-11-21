/** Lichen partners — what each gives and gets. Well-detailed. Theme-aware. */
export function LichenPartnersBenefit({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Lichen symbiosis two partners alga gives food photosynthesis fungus gives shelter water minerals lichen mutualism benefits both">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Two partners, one body</text>

      {/* alga side */}
      <rect x="30" y="44" width="290" height="180" rx="12" className="fill-current text-lime-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(132 204 22 / 0.9)" }} />
      <text x="175" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">ALGA (phycobiont)</text>
      <circle cx="175" cy="112" r="24" className="fill-current text-lime-500/40" stroke="currentColor" strokeWidth="2" style={{ color: "rgb(101 163 13 / 0.9)" }} />
      {[[160, 104], [188, 106], [172, 122]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="5" className="fill-current text-emerald-600/60" />
      ))}
      <text x="175" y="152" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">tiny green cells (or cyanobacteria)</text>
      <text x="50" y="176" fontSize="7.4" className="fill-current text-foreground">GIVES: sugar food by photosynthesis</text>
      <text x="50" y="196" fontSize="7.4" className="fill-current text-foreground">GETS: home, minerals, water, shelter</text>
      <text x="50" y="214" fontSize="7" className="fill-current text-muted-foreground">alone it cannot survive dry exposed rock</text>

      {/* fungus side */}
      <rect x="400" y="44" width="290" height="180" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(245 158 11 / 0.9)" }} />
      <text x="545" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">FUNGUS (mycobiont)</text>
      {[[515, 100, 545, 118], [545, 118, 575, 100], [520, 126, 545, 112], [570, 126, 548, 112], [545, 118, 545, 138]].map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} className="stroke-current text-amber-600" strokeWidth="2.4" style={{ color: "rgb(180 130 40 / 0.9)" }} />
      ))}
      <text x="545" y="152" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">hyphae woven around every alga</text>
      <text x="420" y="176" fontSize="7.4" className="fill-current text-foreground">GIVES: shelter, water, minerals, anchor</text>
      <text x="420" y="196" fontSize="7.4" className="fill-current text-foreground">GETS: sugars — its only food</text>
      <text x="420" y="214" fontSize="7" className="fill-current text-muted-foreground">without the alga it starves on bare rock</text>

      {/* handshake */}
      <circle cx="360" cy="134" r="22" className="fill-current text-sky-500/15" stroke="currentColor" strokeWidth="2.5" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="130" fontSize="8" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">Symbiosis</text>
      <text x="360" y="142" fontSize="6.6" textAnchor="middle" className="fill-current text-muted-foreground">mutualism</text>

      {/* outcome bar */}
      <rect x="30" y="240" width="660" height="44" rx="10" className="fill-current text-emerald-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="50" y="260" fontSize="7.8" className="fill-current text-foreground" fontWeight="700">RESULT: the pair survives where neither could alone — bare rocks, deserts, arctic tundra. The fungus shapes the body; the alga feeds it.</text>
      <text x="50" y="276" fontSize="7.2" className="fill-current text-muted-foreground">Exam hook: name the partners (mycobiont = fungus, phycobiont = alga) and one gift each.</text>
    </svg>
  );
}
