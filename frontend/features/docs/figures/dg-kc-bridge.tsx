// Bridge between Kc and free energy. Theme-aware.
export function DgKcBridge({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 220" className={className} role="img" aria-label="Thermodynamic bridge relating standard free energy change to the equilibrium constant through dG equals minus RT ln K">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">The yield-energy bridge</text>
      <rect x="60" y="56" width="200" height="60" rx="10" className="fill-current" style={{ color: "rgb(16 185 129)" }} opacity="0.16" />
      <text x="160" y="92" fontSize="15" fontWeight="800" textAnchor="middle" fill="rgb(16 185 129)">Kc (yield)</text>
      <rect x="400" y="56" width="200" height="60" rx="10" className="fill-current" style={{ color: "rgb(245 158 11)" }} opacity="0.16" />
      <text x="500" y="92" fontSize="15" fontWeight="800" textAnchor="middle" fill="rgb(245 158 11)">ΔG° (energy)</text>
      <rect x="270" y="60" width="120" height="52" rx="10" className="fill-current text-foreground" opacity="0.9" />
      <text x="330" y="92" fontSize="13.5" fontWeight="800" textAnchor="middle" className="fill-current text-background">ΔG° = −RT ln K</text>
      <text x="160" y="140" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">K large</text>
      <text x="500" y="140" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">ΔG° negative</text>
      <text x="330" y="180" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">A big constant and a negative free energy are the same fact in two languages</text>
      <text x="330" y="204" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Spontaneous toward products ⇔ K &gt; 1</text>
    </svg>
  );
}
