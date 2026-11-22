// CalcinationVsRoasting figure. Theme-aware.
export function CalcinationVsRoasting({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Side by side comparison of calcination without air and roasting in excess air">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">Calcination vs roasting — the air is the difference</text>
      <rect x="30" y="50" width="290" height="140" rx="10" fill="rgb(148 163 184)" opacity="0.12" stroke="rgb(148 163 184)" />
      <text x="175" y="76" fontSize="13" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">CALCINATION</text>
      <text x="175" y="96" fontSize="10.5" textAnchor="middle" fill="rgb(239 68 68)">NO air (or limited)</text>
      <text x="175" y="120" fontSize="11" textAnchor="middle" className="fill-current text-foreground">carbonates, hydrates</text>
      <text x="175" y="142" fontSize="11" textAnchor="middle" className="fill-current text-foreground">ZnCO₃ → ZnO + CO₂↑</text>
      <text x="175" y="162" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">Al₂O₃·2H₂O → Al₂O₃ + 2H₂O</text>
      <rect x="340" y="50" width="290" height="140" rx="10" fill="rgb(239 68 68)" opacity="0.1" stroke="rgb(239 68 68)" />
      <text x="485" y="76" fontSize="13" fontWeight="800" fill="rgb(239 68 68)" textAnchor="middle">ROASTING</text>
      <text x="485" y="96" fontSize="10.5" textAnchor="middle" fill="rgb(16 185 129)">EXCESS air, below mp</text>
      <text x="485" y="120" fontSize="11" textAnchor="middle" className="fill-current text-foreground">sulphides</text>
      <text x="485" y="142" fontSize="11" textAnchor="middle" className="fill-current text-foreground">2ZnS + 3O₂ → 2ZnO + 2SO₂↑</text>
      <text x="485" y="162" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">oxidation; As, Sb volatilise off</text>
      <text x="330" y="220" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Both deliver the same product: a porous oxide ready for reduction</text>
    </svg>
  );
}
