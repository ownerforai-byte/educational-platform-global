// Sigma bond overlap types: s-s, s-p, p-p head-on. Theme-aware.
export function SigmaOverlapTypes({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 680 260" className={className} role="img" aria-label="Sigma bond overlap types s with s in hydrogen s with p in hydrogen chloride and p with p head-on in chlorine">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Three ways to build a sigma bond</text>
      <g>
        <text x="120" y="70" fontSize="12" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">s - s (H2)</text>
        <circle cx="90" cy="120" r="22" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="150" cy="120" r="22" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <ellipse cx="120" cy="120" rx="14" ry="14" className="fill-current" style={{ color: "rgb(16 185 129)" }} opacity="0.3" />
        <text x="120" y="170" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">spheres meet head-on</text>
      </g>
      <g>
        <text x="340" y="70" fontSize="12" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">s - p (HCl)</text>
        <circle cx="310" cy="120" r="18" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <ellipse cx="380" cy="120" rx="14" ry="30" fill="none" stroke="currentColor" strokeWidth="1.6" transform="rotate(0 380 120)" />
        <ellipse cx="345" cy="120" rx="16" ry="14" className="fill-current" style={{ color: "rgb(16 185 129)" }} opacity="0.3" />
        <text x="340" y="170" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">1s into the p lobe axis</text>
      </g>
      <g>
        <text x="560" y="70" fontSize="12" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">p - p (Cl2)</text>
        <ellipse cx="530" cy="120" rx="12" ry="28" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <ellipse cx="590" cy="120" rx="12" ry="28" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <ellipse cx="560" cy="120" rx="16" ry="14" className="fill-current" style={{ color: "rgb(16 185 129)" }} opacity="0.3" />
        <text x="560" y="170" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">lobes meet along the axis</text>
      </g>
      <text x="340" y="230" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Head-on overlap puts density on the internuclear axis - the strongest link</text>
    </svg>
  );
}
