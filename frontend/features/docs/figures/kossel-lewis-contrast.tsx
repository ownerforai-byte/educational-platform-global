// Kossel transfer versus Lewis sharing, side by side. Theme-aware.
export function KosselLewisContrast({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 680 300" className={className} role="img" aria-label="Contrast of Kossel electron transfer route and Lewis electron sharing route to complete octets">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Two routes to the same octet</text>
      <rect x="24" y="46" width="300" height="220" rx="12" className="fill-current" style={{ color: "rgb(245 158 11)" }} opacity="0.10" />
      <rect x="24" y="46" width="300" height="220" rx="12" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <text x="174" y="74" fontSize="14" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">Kossel - transfer</text>
      <text x="174" y="106" fontSize="12" textAnchor="middle" className="fill-current text-foreground">Na gives 1 electron to Cl</text>
      <text x="174" y="132" fontSize="12" textAnchor="middle" className="fill-current text-foreground">ions form: Na+ and Cl-</text>
      <text x="174" y="158" fontSize="12" textAnchor="middle" className="fill-current text-foreground">electrostatic lattice</text>
      <text x="174" y="190" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">metal + non-metal,</text>
      <text x="174" y="208" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">large EN difference</text>
      <rect x="356" y="46" width="300" height="220" rx="12" className="fill-current" style={{ color: "rgb(16 185 129)" }} opacity="0.10" />
      <rect x="356" y="46" width="300" height="220" rx="12" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <text x="506" y="74" fontSize="14" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">Lewis - sharing</text>
      <text x="506" y="106" fontSize="12" textAnchor="middle" className="fill-current text-foreground">Each H gives 1 electron</text>
      <text x="506" y="132" fontSize="12" textAnchor="middle" className="fill-current text-foreground">pair shared: H:H or H-H</text>
      <text x="506" y="158" fontSize="12" textAnchor="middle" className="fill-current text-foreground">both atoms count the pair</text>
      <text x="506" y="190" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">non-metals together,</text>
      <text x="506" y="208" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">small EN difference</text>
    </svg>
  );
}
