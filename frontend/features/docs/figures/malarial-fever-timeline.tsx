/** Malarial fever timeline — RBC cycles and paroxysm periodicity by species. Theme-aware. */
export function MalarialFeverTimeline({ className }: { className?: string }) {
  const bars = [
    { y: 110, label: "P. vivax — benign tertian (48 h)", period: 48, c: "rgb(14 165 233 / 0.9)" },
    { y: 150, label: "P. falciparum — malignant tertian (irregular 36–48 h)", period: 44, c: "rgb(239 68 68 / 0.9)" },
    { y: 190, label: "P. malariae — quartan (72 h)", period: 72, c: "rgb(16 185 129 / 0.9)" },
  ];
  const x = (h: number) => 250 + (h / 80) * 380;
  return (
    <svg viewBox="0 0 660 250" className={className} role="img" aria-label="Fever periodicity chart comparing tertian benign malignant and quartan malaria cycles with chills fever and sweating stages">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">The fever rhythm — synced to RBC rupture</text>
      <line x1="250" y1="60" x2="630" y2="60" strokeWidth="2" className="stroke-current text-muted-foreground" />
      {[0, 24, 48, 72].map((h) => (
        <text key={h} x={x(h)} y="50" fontSize="8.5" textAnchor="middle" className="fill-current text-muted-foreground">{h} h</text>
      ))}
      {bars.map((b) => (
        <g key={b.label}>
          <text x="16" y={b.y + 4} fontSize="8.5" className="fill-current text-foreground" fontWeight="700">{b.label}</text>
          {[0, b.period, b.period * 2].filter((h) => h < 80).map((h) => (
            <g key={h}>
              <rect x={x(h)} y={b.y - 12} width={x(h) + 26 > 630 ? 630 - x(h) : 26} height="24" rx="4" style={{ color: b.c }} className="fill-current opacity-40" />
              <text x={x(h) + 13} y={b.y + 3} fontSize="6.5" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">fever</text>
            </g>
          ))}
        </g>
      ))}
      <text x="16" y="228" fontSize="10" className="fill-current text-muted-foreground">Each paroxysm: shaking chill (1 h) → high fever (104 °F, 4 h) → sweating (2–3 h). Synchronised RBC rupture releases merozoites + toxins.</text>
    </svg>
  );
}
