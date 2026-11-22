// Routes for generating nascent hydrogen. Theme-aware.
export function NascentGenerationRoutes({ className }: { className?: string }) {
  const routes: [string, string, string][] = [
    ["Zn + dil. H₂SO₄", "Zn + H₂SO₄ → ZnSO₄ + 2[H]", "rgb(59 130 246)"],
    ["Zn + CuSO₄ solution", "Zn displaces Cu; [H] from water", "rgb(14 165 233)"],
    ["Al + NaOH", "2Al + 2NaOH + 6H₂O → 2NaAl(OH)₄ + 3[H₂]", "rgb(16 185 129)"],
  ];
  return (
    <svg viewBox="0 0 660 250" className={className} role="img" aria-label="Three routes for generating nascent hydrogen in situ with equations">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Born at the moment of use</text>
      {routes.map(([t, eq, c], i) => (
        <g key={i}>
          <rect x="40" y={46 + i * 56} width="580" height="44" rx="9" className="fill-current" style={{ color: c }} opacity="0.14" />
          <text x="58" y={64 + i * 56} fontSize="12.5" fontWeight="800" className="fill-current text-foreground">{t}</text>
          <text x="58" y={82 + i * 56} fontSize="11.5" style={{ fill: c }}>{eq}</text>
        </g>
      ))}
      <text x="330" y="238" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Nascent hydrogen exists only inside the reaction mixture - it cannot be bottled</text>
    </svg>
  );
}
