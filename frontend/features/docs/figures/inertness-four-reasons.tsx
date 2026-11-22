// Four reasons for nitrogen inertness. Theme-aware.
export function InertnessFourReasons({ className }: { className?: string }) {
  const reasons: [string, string, string][] = [
    ["bond energy", "941 kJ/mol - rarely payable", "rgb(239 68 68)"],
    ["bond length", "110 pm - atoms hug tightly", "rgb(14 165 233)"],
    ["zero dipole", "no charge separation to attack", "rgb(16 185 129)"],
    ["filled σ + lone pairs", "HOMO–LUMO gap discourages donation", "rgb(245 158 11)"],
  ];
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Four reasons for nitrogen inertness: bond energy, bond length, zero dipole and electronic structure">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Why N₂ ignores almost everything</text>
      {reasons.map(([t, s, c], i) => (
        <g key={i}>
          <rect x="40" y={46 + i * 48} width="580" height="40" rx="9" className="fill-current" style={{ color: c }} opacity="0.14" />
          <text x="58" y={63 + i * 48} fontSize="12.5" fontWeight="800" style={{ fill: c }}>{t}</text>
          <text x="58" y={81 + i * 48} fontSize="10.5" className="fill-current text-muted-foreground">{s}</text>
        </g>
      ))}
      <text x="330" y="248" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Four walls, one lock - and Li has the only key at room temperature</text>
    </svg>
  );
}
