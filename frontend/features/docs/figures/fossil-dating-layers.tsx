/** Fossil dating layers — how strata and isotopes date life. Well-detailed. Theme-aware. */
export function FossilDatingLayers({ className }: { className?: string }) {
  const layers: [string, string, string][] = [
    ["youngest", "Cenozoic — mammals, grasses, humans", "rgb(22 163 74)"],
    ["", "Cretaceous — dinosaurs end, flowering plants", "rgb(245 158 11)"],
    ["", "Jurassic — Archaeopteryx, giant sauropods", "rgb(217 119 6)"],
    ["", "Paleozoic — fish, amphibians, coal forests", "rgb(2 132 199)"],
    ["oldest", "Precambrian — stromatolites, first cells", "rgb(139 92 246)"],
  ];
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Fossil dating layers strata oldest to youngest isotope dating carbon fourteen uranium lead potassium argon geological time">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Reading time from rock — strata and isotopes</text>
      {layers.map(([tag, label, rgb], i) => {
        const y = 48 + i * 40;
        return (
          <g key={label}>
            <rect x="30" y={y} width="430" height="34" rx="5" className="fill-current" style={{ color: rgb, opacity: 0.14 }} stroke="currentColor" strokeWidth="1.6" />
            <text x="46" y={y + 22} fontSize="7.4" className="fill-current text-foreground" fontWeight="700">{label}</text>
            {tag && <text x="470" y={y + 22} fontSize="7.2" className="fill-current" style={{ color: rgb }} fontWeight="800">{tag}</text>}
          </g>
        );
      })}
      <rect x="500" y="48" width="190" height="196" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="516" y="70" fontSize="8" className="fill-current text-foreground" fontWeight="800">Dating methods</text>
      {["C-14 → recent remains", "  (half-life 5,730 yrs)", "U-Pb → ancient rocks", "K-Ar → volcanic layers", "", "deeper strata = older;", "  fossils in order = history"].map((t, i) => (
        <text key={t} x="516" y={90 + i * 16} fontSize="6.8" className="fill-current text-muted-foreground">{t}</text>
      ))}
      <rect x="30" y="252" width="660" height="40" rx="8" className="fill-current text-violet-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(139 92 246 / 0.9)" }} />
      <text x="360" y="268" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">The paleontological argument: complexity increases upward and no layer contradicts the order — life has a direction in time.</text>
      <text x="360" y="284" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: name one isotope and its use — C-14 for fossils, K-Ar for volcanic rock.</text>
    </svg>
  );
}
