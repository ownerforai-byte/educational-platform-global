// H2SO4 dil vs conc switch. Theme-aware.
export function DilVsConcSwitch({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 220" className={className} role="img" aria-label="Dilute sulphuric acid acting as ordinary acid releasing hydrogen and concentrated sulphuric acid acting as oxidant releasing sulphur dioxide">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Same metal, different gas</text>
      <rect x="40" y="50" width="280" height="110" rx="10" className="fill-current" style={{ color: "rgb(16 185 129)" }} opacity="0.14" />
      <text x="180" y="78" fontSize="12.5" fontWeight="800" textAnchor="middle" fill="rgb(16 185 129)">dilute → H₂</text>
      <text x="180" y="104" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Zn + H₂SO₄(dil) → ZnSO₄ + H₂↑</text>
      <text x="180" y="126" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">ordinary acid behaviour</text>
      <text x="180" y="148" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">H⁺ is the oxidant</text>
      <rect x="340" y="50" width="280" height="110" rx="10" className="fill-current" style={{ color: "rgb(239 68 68)" }} opacity="0.14" />
      <text x="480" y="78" fontSize="12.5" fontWeight="800" textAnchor="middle" fill="rgb(239 68 68)">hot conc. → SO₂</text>
      <text x="480" y="104" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">Zn + 2H₂SO₄(conc) → ZnSO₄ + SO₂ + 2H₂O</text>
      <text x="480" y="126" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">sulphate itself is reduced</text>
      <text x="480" y="148" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">+6 → +4</text>
      <text x="330" y="196" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Dilution disarms the oxidant — quote both equations in exams</text>
    </svg>
  );
}
