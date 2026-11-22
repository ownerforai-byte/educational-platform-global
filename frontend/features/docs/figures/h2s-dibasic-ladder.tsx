// H2S dibasic ladder. Theme-aware.
export function H2sDibasicLadder({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 200" className={className} role="img" aria-label="Hydrogen sulphide as weak dibasic acid losing two protons in steps">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Weak, dibasic, two steps</text>
      <rect x="80" y="56" width="500" height="50" rx="10" className="fill-current" style={{ color: "rgb(59 130 246)" }} opacity="0.13" />
      <text x="330" y="78" fontSize="12.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">H₂S ⇌ H⁺ + HS⁻</text>
      <text x="330" y="98" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">step 1 (K₁)</text>
      <rect x="80" y="118" width="500" height="50" rx="10" className="fill-current" style={{ color: "rgb(124 58 237)" }} opacity="0.13" />
      <text x="330" y="140" fontSize="12.5" fontWeight="800" textAnchor="middle" fill="rgb(124 58 237)">HS⁻ ⇌ H⁺ + S²⁻</text>
      <text x="330" y="160" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">step 2 (K₂, far smaller)</text>
      <text x="330" y="188" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Turns blue litmus red — but only just; a weak acid by any measure</text>
    </svg>
  );
}
