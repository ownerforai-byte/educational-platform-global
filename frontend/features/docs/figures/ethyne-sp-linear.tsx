// Ethyne sp hybrid: two hybrids linear, two leftover p orbitals. Theme-aware.
export function EthyneSpLinear({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Ethyne sp hybridisation with two sp hybrids at 180 degrees and two perpendicular leftover p orbitals building two pi bonds">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">sp carbon: 2 hybrids in a line, 2 p orbitals spare</text>
      <circle cx="330" cy="120" r="13" className="fill-current" opacity="0.3" />
      <text x="330" y="125" fontSize="10" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">C</text>
      <line x1="330" y1="120" x2="220" y2="120" stroke="currentColor" strokeWidth="2" />
      <line x1="330" y1="120" x2="440" y2="120" stroke="currentColor" strokeWidth="2" />
      <ellipse cx="275" cy="120" rx="30" ry="9" className="fill-current" style={{ color: "rgb(14 165 233)" }} opacity="0.2" />
      <ellipse cx="385" cy="120" rx="30" ry="9" className="fill-current" style={{ color: "rgb(14 165 233)" }} opacity="0.2" />
      <ellipse cx="330" cy="85" rx="34" ry="9" fill="none" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(139 92 246)" }} />
      <ellipse cx="330" cy="155" rx="34" ry="9" fill="none" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(139 92 246)" }} />
      <text x="330" y="200" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">two spare p orbitals (purple) overlap sideways twice - two pi bonds</text>
      <text x="330" y="224" fontSize="11" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">linear H-C-C-H at 180 degrees</text>
    </svg>
  );
}
