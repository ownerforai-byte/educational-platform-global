// Amphoteric double duty of ZnO. Theme-aware.
export function AmphotericDoubleDuty({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Zinc oxide reacting with hydrochloric acid as a base and with sodium hydroxide as an acid">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">ZnO answers both callers</text>
      <rect x="40" y="50" width="580" height="60" rx="10" className="fill-current" style={{ color: "rgb(239 68 68)" }} opacity="0.13" />
      <text x="60" y="76" fontSize="12.5" fontWeight="800" className="fill-current text-foreground">with acid (base-like):</text>
      <text x="60" y="98" fontSize="12.5" fontWeight="700" fill="rgb(239 68 68)">ZnO + 2HCl → ZnCl₂ + H₂O</text>
      <rect x="40" y="126" width="580" height="60" rx="10" className="fill-current" style={{ color: "rgb(14 165 233)" }} opacity="0.13" />
      <text x="60" y="152" fontSize="12.5" fontWeight="800" className="fill-current text-foreground">with alkali (acid-like):</text>
      <text x="60" y="174" fontSize="12.5" fontWeight="700" fill="rgb(14 165 233)">ZnO + 2NaOH → Na₂ZnO₂ (sodium zincate) + H₂O</text>
      <text x="330" y="222" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">Salt and water both ways - the amphoteric signature (Al₂O₃, PbO behave alike)</text>
    </svg>
  );
}
