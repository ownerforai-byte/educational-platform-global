// HNO3 lab preparation panel. Theme-aware.
export function Hno3LabPrepPanel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 220" className={className} role="img" aria-label="Laboratory preparation of nitric acid distilling potassium nitrate with concentrated sulphuric acid below 200 degrees in a glass retort">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Lab HNO₃: distil, don't exceed 200 °C</text>
      <rect x="60" y="60" width="220" height="70" rx="10" className="fill-current" style={{ color: "rgb(59 130 246)" }} opacity="0.14" />
      <text x="170" y="90" fontSize="12.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">KNO₃ + conc. H₂SO₄</text>
      <text x="170" y="112" fontSize="11" textAnchor="middle" fill="rgb(59 130 246)">glass retort, heat gently</text>
      <path d="M 280 95 Q 360 60 440 95" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" fill="none" markerEnd="url(#ahp)" />
      <rect x="440" y="70" width="160" height="50" rx="10" className="fill-current" style={{ color: "rgb(16 185 129)" }} opacity="0.16" />
      <text x="520" y="92" fontSize="12" fontWeight="800" textAnchor="middle" fill="rgb(16 185 129)">HNO₃ vapour</text>
      <text x="520" y="110" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">colourless, fuming</text>
      <defs><marker id="ahp" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="none" stroke="currentColor" className="text-muted-foreground" /></marker></defs>
      <text x="330" y="160" fontSize="12" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">KNO₃ + H₂SO₄(conc) → KHSO₄ + HNO₃</text>
      <text x="330" y="196" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Above 200 °C the acid decomposes (4HNO₃ → 2H₂O + 4NO₂ + O₂) — hence the limit</text>
    </svg>
  );
}
