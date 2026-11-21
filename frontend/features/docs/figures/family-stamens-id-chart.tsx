/** Stamen ID chart — tell the four families apart by their stamens. Well-detailed. Theme-aware. */
export function FamilyStamensIdChart({ className }: { className?: string }) {
  const rows: [string, string, string, string][] = [
    ["Brassicaceae", "6, tetradynamous (2 short + 4 long)", "cross-shaped 4 petals", "silique"],
    ["Fabaceae", "10, diadelphous (9 fused + 1 free)", "papilionaceous", "legume"],
    ["Solanaceae", "5, epipetalous (stuck to petals)", "rotate, 5-lobed", "berry"],
    ["Liliaceae", "6, in two whorls of 3 (3+3)", "6 tepals, trimerous", "capsule"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Stamen identification chart four families tetradynamous diadelphous epipetalous two whorls of three corolla fruit quick identification table">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Stamens never lie — a 4-family ID chart</text>

      {/* header */}
      <rect x="30" y="44" width="660" height="26" rx="8" className="fill-current text-sky-500/15" stroke="currentColor" strokeWidth="1.5" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="46" y="62" fontSize="8.2" className="fill-current text-foreground" fontWeight="800">Family</text>
      <text x="200" y="62" fontSize="8.2" className="fill-current text-foreground" fontWeight="800">Stamens</text>
      <text x="440" y="62" fontSize="8.2" className="fill-current text-foreground" fontWeight="800">Corolla</text>
      <text x="610" y="62" fontSize="8.2" className="fill-current text-foreground" fontWeight="800">Fruit</text>
      {rows.map(([fam, st, cor, fr], i) => {
        const y = 78 + i * 46;
        const rgb = ["rgb(22 163 74)", "rgb(245 158 11)", "rgb(239 68 68)", "rgb(139 92 246)"][i];
        return (
          <g key={fam}>
            <rect x="30" y={y} width="660" height="40" rx="8" className="fill-current text-slate-500/5" stroke="currentColor" strokeWidth="1.2" style={{ color: `${rgb} / 0.7` }} />
            <text x="46" y={y + 18} fontSize="8" className="fill-current" style={{ color: rgb }} fontWeight="800">{fam}</text>
            <text x="46" y={y + 31} fontSize="6.6" className="fill-current text-muted-foreground">floral formula check</text>
            <text x="200" y={y + 18} fontSize="7.6" className="fill-current text-foreground" fontWeight="700">{st.split("(")[0]}</text>
            <text x="200" y={y + 31} fontSize="6.6" className="fill-current text-muted-foreground">{st.includes("(") ? st.slice(st.indexOf("(")) : ""}</text>
            <text x="440" y={y + 18} fontSize="7.6" className="fill-current text-muted-foreground">{cor}</text>
            <text x="610" y={y + 18} fontSize="7.6" className="fill-current text-muted-foreground">{fr}</text>
          </g>
        );
      })}
      <rect x="30" y="266" width="660" height="26" rx="8" className="fill-current text-emerald-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="283" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: one stamen number + arrangement identifies the family — 2+4, 9+1, epipetalous 5, or 3+3.</text>
    </svg>
  );
}
