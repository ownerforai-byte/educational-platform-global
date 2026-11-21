/** Thalassemia inheritance — the globin gene's arithmetic. Well-detailed. Theme-aware. */
export function ThalassemiaInheritance({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Thalassemia inheritance haemoglobin globin chain defect minor trait major disease carrier parents 25 percent risk anaemia transfusion life expectancy carrier screening Nepal prevalence Mediterranean origin genetics recessive autosomal">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Thalassaemia — minor, major, and the 1-in-4 arithmetic</text>
      {/* inheritance */}
      <rect x="30" y="44" width="330" height="220" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="195" y="64" fontSize="7.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">TWO CARRIERS (Aa × Aa)</text>
      {[
        [0, 0, "AA", "normal"], [0, 1, "Aa", "minor (carrier)"],
        [1, 0, "Aa", "minor (carrier)"], [1, 1, "aa", "MAJOR (disease)"],
      ].map(([r, c, geno, label]) => (
        <g key={`${r}${c}`}>
          <rect x={100 + (c as number) * 110} y={85 + (r as number) * 62} width="100" height="50" rx="8" className="fill-current" stroke="currentColor" strokeWidth="1"
            style={{ color: geno === "aa" ? "rgb(244 63 94 / 0.3)" : "rgb(217 119 6 / 0.2)" }} />
          <text x={150 + (c as number) * 110} y={112 + (r as number) * 62} fontSize="7" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{geno as string}</text>
          <text x={200 + (c as number) * 110} y={126 + (r as number) * 62} fontSize="5.4" textAnchor="middle" className="fill-current text-muted-foreground">{label as string}</text>
        </g>
      ))}
      <text x="195" y="248" fontSize="6.4" textAnchor="middle" className="fill-current text-muted-foreground">two carriers face a 25% chance of a child with major thalassaemia — every pregnancy</text>
      {/* facts */}
      <rect x="390" y="44" width="300" height="220" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">MINOR vs MAJOR</text>
      {[
        "minor (carrier): healthy, maybe",
        "  mild anaemia — often unaware",
        "major: faulty haemoglobin,",
        "  lifelong transfusions, iron",
        "  overload, chelation therapy",
        "autosomal recessive — both",
        "  parents must carry the allele",
        "prevention works: carrier",
        "  screening before marriage or",
        "  pregnancy changes the maths",
        "common where malaria once",
        "  raged — carriers had a",
        "  survival edge",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="390" y="240" width="300" height="24" rx="8" className="fill-current text-sky-500/15" strokeWidth="1" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="540" y="256" fontSize="6.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: carrier × carrier → 25% major, 50% minor, 25% normal.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Thalassaemia shows why carrier screening is genetics' cheapest intervention.</text>
    </svg>
  );
}
