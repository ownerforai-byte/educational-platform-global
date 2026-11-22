// Pi bond cloud from sideways p orbital overlap. Theme-aware.
export function PiCloudPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 280" className={className} role="img" aria-label="Pi bond formed by sideways overlap of two parallel p orbitals with electron density above and below the internuclear axis">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">The pi bond: sideways overlap, cloud off-axis</text>
      <line x1="140" y1="150" x2="520" y2="150" stroke="currentColor" strokeWidth="1.2" strokeDasharray="5 4" />
      <text x="530" y="154" fontSize="10" className="fill-current text-muted-foreground">axis</text>
      <ellipse cx="250" cy="105" rx="60" ry="22" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <ellipse cx="410" cy="105" rx="60" ry="22" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <ellipse cx="250" cy="195" rx="60" ry="22" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <ellipse cx="410" cy="195" rx="60" ry="22" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <ellipse cx="330" cy="105" rx="50" ry="16" className="fill-current" style={{ color: "rgb(16 185 129)" }} opacity="0.25" />
      <ellipse cx="330" cy="195" rx="50" ry="16" className="fill-current" style={{ color: "rgb(16 185 129)" }} opacity="0.25" />
      <circle cx="330" cy="150" r="5" className="fill-current" opacity="0.5" />
      <text x="330" y="250" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Two parallel p orbitals overlap above and below the axis - density there, not on it</text>
      <text x="330" y="270" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Weaker than sigma, blocks rotation, never exists alone</text>
    </svg>
  );
}
