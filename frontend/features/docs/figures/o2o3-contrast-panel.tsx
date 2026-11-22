// O2 vs O3 contrast with structure emphasis. Theme-aware.
export function O2O3ContrastPanel({ className }: { className?: string }) {
  const rows: [string, string, string][] = [
    ["odour", "odourless", "pungent, fishy"],
    ["colour", "colourless", "pale blue"],
    ["magnetism", "paramagnetic", "diamagnetic"],
    ["stability", "stable", "unstable → O₂"],
    ["bond order", "2", "1.5 (resonance)"],
    ["oxidising power", "moderate", "very strong"],
  ];
  return (
    <svg viewBox="0 0 660 310" className={className} role="img" aria-label="Six-row comparison of dioxygen and ozone covering odour, colour, magnetism, stability, bond order and oxidising power">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Siblings, opposite temperaments</text>
      <text x="290" y="50" fontSize="13" fontWeight="800" textAnchor="middle" fill="rgb(59 130 246)">O₂</text>
      <text x="500" y="50" fontSize="13" fontWeight="800" textAnchor="middle" fill="rgb(16 185 129)">O₃</text>
      {rows.map(([p, a, b], i) => (
        <g key={i}>
          <text x="60" y={80 + i * 34} fontSize="11.5" fontWeight="700" className="fill-current text-foreground">{p}</text>
          <text x="290" y={80 + i * 34} fontSize="11.5" textAnchor="middle" className="fill-current text-muted-foreground">{a}</text>
          <text x="500" y={80 + i * 34} fontSize="11.5" textAnchor="middle" fontWeight="700" fill="rgb(16 185 129)">{b}</text>
          <line x1="50" y1={88 + i * 34} x2="620" y2={88 + i * 34} stroke="currentColor" strokeWidth="0.6" className="text-muted-foreground" opacity="0.35" />
        </g>
      ))}
      <text x="330" y="298" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Same element, one extra atom, a different personality</text>
    </svg>
  );
}
