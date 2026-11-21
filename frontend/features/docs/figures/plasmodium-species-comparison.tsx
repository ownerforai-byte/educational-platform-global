/** Plasmodium species comparison — vivax, falciparum, malariae, ovale. Theme-aware. */
export function PlasmodiumSpeciesComparison({ className }: { className?: string }) {
  const row = (y: number, feat: string, v: string, f: string, k: string) => (
    <g key={k}>
      <text x="16" y={y} fontSize="9.5" className="fill-current text-foreground" fontWeight="700">{feat}</text>
      <text x="270" y={y} fontSize="9" textAnchor="middle" className="fill-current text-sky-700 dark:text-sky-300">{v}</text>
      <text x="500" y={y} fontSize="9" textAnchor="middle" className="fill-current text-rose-700 dark:text-rose-300">{f}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 660 280" className={className} role="img" aria-label="Comparison of Plasmodium vivax and Plasmodium falciparum across fever periodicity red blood cell preference relapse and severity">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">The four human malarias — vivax vs falciparum head-to-head</text>

      <rect x="170" y="40" width="200" height="24" rx="7" className="fill-current text-sky-500/15" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="270" y="56" fontSize="10" textAnchor="middle" className="fill-current text-sky-700 dark:text-sky-300" fontWeight="800">P. vivax (benign tertian)</text>
      <rect x="400" y="40" width="200" height="24" rx="7" className="fill-current text-rose-500/15" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(239 68 68 / 0.9)" }} />
      <text x="500" y="56" fontSize="10" textAnchor="middle" className="fill-current text-rose-700 dark:text-rose-300" fontWeight="800">P. falciparum (malignant)</text>

      {row(96, "Fever cycle", "48 h, regular", "36–48 h, irregular", "r1")}
      {row(122, "RBC preference", "young RBCs (reticulocytes)", "any RBC — up to 30% infected", "r2")}
      {row(148, "Parasite load", "low (~2% max)", "very high — block brain capillaries", "r3")}
      {row(174, "Relapse", "yes — dormant hypnozoites in liver", "no relapse (no hypnozoites)", "r4")}
      {row(200, "Danger", "debilitating but rarely fatal", "cerebral malaria — can kill in days", "r5")}
      {row(226, "Nepal status", "terai plains, seasonal", "less common, more lethal", "r6")}

      <text x="16" y="258" fontSize="10" className="fill-current text-muted-foreground">Also: P. malariae (72 h quartan) and P. ovale (48 h, mild). Falciparum's ability to infect any RBC is what makes it the killer.</text>
      <text x="16" y="276" fontSize="10" className="fill-current text-muted-foreground">Exam hook: tertian = fever every 3rd day (48 h apart); quartan = every 4th day (72 h).</text>
    </svg>
  );
}
