// Oxoacid strength order NEB 2024. Theme-aware.
export function OxoacidStrengthOrder({ className }: { className?: string }) {
  const acids: [string, string, string][] = [
    ["HClO", "+1", "1 oxygen"],
    ["HClO₂", "+3", "2 oxygens"],
    ["HClO₃", "+5", "3 oxygens"],
    ["HClO₄", "+7", "4 oxygens"],
  ];
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Acid strength order of chlorine oxoacids from hypochlorous to perchloric explained by conjugate base charge delocalisation">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">More oxygen, stronger acid (NEB 2024)</text>
      <line x1="70" y1="120" x2="590" y2="120" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" markerEnd="url(#aos)" />
      {acids.map(([a, os, n], i) => (
        <g key={i}>
          <circle cx={120 + i * 150} cy="120" r="28" className="fill-current" style={{ color: "rgb(59 130 246)" }} opacity={0.1 + i * 0.08} />
          <text x={120 + i * 150} y="116" fontSize="13" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">{a}</text>
          <text x={120 + i * 150} y="136" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">Cl {os}</text>
          <text x={120 + i * 150} y="170" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">{n}</text>
        </g>
      ))}
      <defs><marker id="aos" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="none" stroke="currentColor" className="text-muted-foreground" /></marker></defs>
      <text x="330" y="210" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Each extra O delocalises the conjugate base's charge — ClO₄⁻ spreads it over four atoms</text>
      <text x="330" y="230" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">stable anion ⇢ strong acid</text>
    </svg>
  );
}
