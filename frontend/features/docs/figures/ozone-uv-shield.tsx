// Stratospheric ozone UV shield. Theme-aware.
export function OzoneUvShield({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Stratospheric ozone layer at 15 to 35 kilometres absorbing UV-B and UV-C before it reaches the ground">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">The planetary sunscreen</text>
      <rect x="60" y="50" width="540" height="40" rx="8" className="fill-current" style={{ color: "rgb(245 158 11)" }} opacity="0.25" />
      <text x="330" y="76" fontSize="11.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">UV-B / UV-C incoming</text>
      <rect x="60" y="100" width="540" height="36" rx="8" className="fill-current" style={{ color: "rgb(16 185 129)" }} opacity="0.3" />
      <text x="330" y="124" fontSize="12" fontWeight="800" textAnchor="middle" fill="rgb(16 185 129)">ozone layer, 15–35 km: absorbs most UV</text>
      <path d="M 200 100 L 200 90" stroke="rgb(239 68 68)" strokeWidth="2" />
      <path d="M 400 100 L 400 90" stroke="rgb(239 68 68)" strokeWidth="2" />
      <rect x="60" y="150" width="540" height="30" rx="8" className="fill-current" style={{ color: "rgb(59 130 246)" }} opacity="0.12" />
      <text x="330" y="170" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">only a small UV-B fraction reaches the surface</text>
      <text x="330" y="216" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Every 1% of thinning measurably raises skin-cancer incidence</text>
      <text x="330" y="240" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Ground-level O₃ is the opposite story: a respiratory pollutant</text>
    </svg>
  );
}
