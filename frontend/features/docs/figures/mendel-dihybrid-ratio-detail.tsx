/** Mendel dihybrid ratio detail — 9:3:3:1 unpacked. Well-detailed. Theme-aware. */
export function MendelDihybridRatioDetail({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Mendel dihybrid ratio detail 9:3:3:1 Punnett square sixteen combinations round yellow wrinkled green independent assortment gametes four types phenotype classes law explanation peas seed shape colour cross F2 genotypic classes">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The 9:3:3:1 ratio — unpacked square by square</text>
      {/* Punnett */}
      <rect x="30" y="44" width="330" height="220" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="195" y="64" fontSize="7.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">RrYy × RrYy — 16 SQUARES</text>
      {/* gamete labels */}
      {["RY", "Ry", "rY", "ry"].map((g, i) => (
        <text key={g} x={105 + i * 60} y="84" fontSize="6.4" textAnchor="middle" className="fill-current text-emerald-700" fontWeight="700">{g}</text>
      ))}
      {["RY", "Ry", "rY", "ry"].map((g, i) => (
        <text key={g} x="88" y={100 + i * 38} fontSize="6.4" textAnchor="middle" className="fill-current text-emerald-700" fontWeight="700">{g}</text>
      ))}
      {/* grid with phenotype classes */}
      {[
        [0,0,"RY","RY","RY"],[0,1,"RY","Ry","RY"],[0,2,"RY","rY","RY"],[0,3,"RY","ry","RY"],
        [1,0,"Ry","RY","RY"],[1,1,"Ry","Ry","Ry"],[1,2,"Ry","rY","Ry"],[1,3,"Ry","ry","Ry"],
        [2,0,"rY","RY","rY"],[2,1,"rY","Ry","rY"],[2,2,"rY","rY","rY"],[2,3,"rY","ry","rY"],
        [3,0,"ry","RY","ry"],[3,1,"ry","Ry","ry"],[3,2,"ry","rY","ry"],[3,3,"ry","ry","ry"],
      ].map(([r,c,g1,g2,ph]) => (
        <rect key={`${r}${c}`} x={100 + (c as number) * 60} y={90 + (r as number) * 38} width="56" height="34" className="fill-current" stroke="currentColor" strokeWidth="0.8"
          style={{ color: ph === "RY" ? "rgb(16 185 129 / 0.35)" : ph === "Ry" ? "rgb(217 119 6 / 0.3)" : ph === "rY" ? "rgb(2 132 199 / 0.3)" : "rgb(244 63 94 / 0.3)" }} />
      ))}
      <text x="195" y="256" fontSize="6.4" textAnchor="middle" className="fill-current text-muted-foreground">9 round-yellow · 3 round-green · 3 wrinkled-yellow · 1 wrinkled-green</text>
      {/* law */}
      <rect x="390" y="44" width="300" height="220" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">WHAT THE RATIO PROVES</text>
      {[
        "each gene assorts independently:",
        "  the seed-shuffle of one pair",
        "  does not bias the other",
        "4 gamete types (RY, Ry, rY, ry)",
        "  in equal numbers — that",
        "  equality is the whole trick",
        "9:3:3:1 = (3:1) × (3:1): two",
        "  monohybrid ratios multiplied",
        "exceptions prove the law: linked",
        "  genes break it, revealing",
        "  crossing-over",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="390" y="252" width="300" height="12" rx="6" className="fill-current text-sky-500/10" strokeWidth="0" />
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: 9:3:3:1 = independent assortment; 9 = both dominants showing.</text>
    </svg>
  );
}
