// IsomerismFamilyTree figure. Theme-aware.
export function IsomerismFamilyTree({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Classification tree of isomerism into structural and stereoisomerism">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">The isomerism family tree</text>
      <rect x="230" y="46" width="200" height="40" rx="10" fill="rgb(59 130 246)" opacity="0.12" stroke="rgb(59 130 246)" />
      <text x="330" y="71" fontSize="12" fontWeight="800" textAnchor="middle" fill="rgb(59 130 246)">ISOMERISM</text>
      <path d="M 330 86 L 170 122" stroke="rgb(148 163 184)" strokeWidth="1.5" />
      <path d="M 330 86 L 490 122" stroke="rgb(148 163 184)" strokeWidth="1.5" />
      <rect x="60" y="122" width="220" height="46" rx="10" fill="rgb(239 68 68)" opacity="0.1" stroke="rgb(239 68 68)" />
      <text x="170" y="142" fontSize="11.5" fontWeight="800" textAnchor="middle" fill="rgb(239 68 68)">STRUCTURAL</text>
      <text x="170" y="160" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">different connectivity</text>
      <rect x="380" y="122" width="220" height="46" rx="10" fill="rgb(16 185 129)" opacity="0.1" stroke="rgb(16 185 129)" />
      <text x="490" y="142" fontSize="11.5" fontWeight="800" textAnchor="middle" fill="rgb(16 185 129)">STEREOISOMERISM</text>
      <text x="490" y="160" fontSize="9" textAnchor="middle" className="fill-current text-muted-foreground">same connectivity, different spatial arrangement</text>
      <text x="170" y="200" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">chain · position · functional · metamerism · tautomerism</text>
      <text x="490" y="200" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">geometrical (cis–trans) · optical (d/l)</text>
    </svg>
  );
}
