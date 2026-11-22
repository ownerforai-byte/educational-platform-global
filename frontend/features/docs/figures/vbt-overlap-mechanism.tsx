// VBT overlap mechanism: approach, overlap, bond. Theme-aware.
export function VbtOverlapMechanism({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 680 280" className={className} role="img" aria-label="Valence bond theory mechanism in three stages two half filled orbitals approach overlap with paired spins and energy minimum bond forms">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">VBT in three frames: approach, overlap, bond</text>
      <g>
        <text x="110" y="70" fontSize="12" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">1. Far apart</text>
        <ellipse cx="80" cy="120" rx="16" ry="24" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <ellipse cx="150" cy="120" rx="16" ry="24" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <text x="80" y="125" fontSize="9" textAnchor="middle" className="fill-current text-foreground">1s</text>
        <text x="150" y="125" fontSize="9" textAnchor="middle" className="fill-current text-foreground">1s</text>
      </g>
      <g>
        <text x="340" y="70" fontSize="12" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">2. Overlap</text>
        <ellipse cx="310" cy="120" rx="20" ry="26" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <ellipse cx="370" cy="120" rx="20" ry="26" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <ellipse cx="340" cy="120" rx="14" ry="18" className="fill-current" style={{ color: "rgb(16 185 129)" }} opacity="0.25" />
        <text x="340" y="164" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">shared cloud, opposite spins</text>
      </g>
      <g>
        <text x="560" y="70" fontSize="12" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">3. Bond</text>
        <circle cx="530" cy="120" r="7" className="fill-current" opacity="0.4" />
        <circle cx="590" cy="120" r="7" className="fill-current" opacity="0.4" />
        <line x1="537" y1="120" x2="583" y2="120" stroke="currentColor" strokeWidth="3" />
        <text x="560" y="164" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">H-H, 74 pm, 436 kJ/mol</text>
      </g>
      <text x="340" y="230" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Energy falls as the cloud grows between the nuclei, bottoms out at the bond length</text>
    </svg>
  );
}
