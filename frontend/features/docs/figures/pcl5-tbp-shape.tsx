// PCl5 trigonal bipyramidal shape with axial and equatorial positions. Theme-aware.
export function Pcl5TbpShape({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 300" className={className} role="img" aria-label="Phosphorus pentachloride trigonal bipyramidal shape with three equatorial bonds at 120 degrees and two axial bonds at 90 degrees with bond lengths 204 and 219 picometres">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">PCl5: trigonal bipyramidal, two kinds of position</text>
      <circle cx="320" cy="150" r="16" className="fill-current" style={{ color: "rgb(245 158 11)" }} opacity="0.35" />
      <text x="320" y="155" fontSize="11" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">P</text>
      <line x1="320" y1="150" x2="320" y2="60" stroke="currentColor" strokeWidth="2" />
      <line x1="320" y1="150" x2="320" y2="240" stroke="currentColor" strokeWidth="2" />
      <line x1="320" y1="150" x2="210" y2="120" stroke="currentColor" strokeWidth="2" />
      <line x1="320" y1="150" x2="430" y2="120" stroke="currentColor" strokeWidth="2" />
      <line x1="320" y1="150" x2="320" y2="215" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
      <circle cx="320" cy="60" r="12" className="fill-current" opacity="0.2" />
      <text x="320" y="64" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Cl ax</text>
      <circle cx="320" cy="240" r="12" className="fill-current" opacity="0.2" />
      <text x="320" y="244" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Cl ax</text>
      <circle cx="210" cy="120" r="12" className="fill-current" opacity="0.2" />
      <text x="210" y="124" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Cl eq</text>
      <circle cx="430" cy="120" r="12" className="fill-current" opacity="0.2" />
      <text x="430" y="124" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Cl eq</text>
      <text x="500" y="110" fontSize="11" className="fill-current text-foreground" fontWeight="700">Axial: 219 pm</text>
      <text x="500" y="132" fontSize="11" className="fill-current text-foreground" fontWeight="700">Equatorial: 204 pm</text>
      <text x="320" y="278" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Axial bonds suffer more 90-degree repulsion, so they stretch longer</text>
    </svg>
  );
}
