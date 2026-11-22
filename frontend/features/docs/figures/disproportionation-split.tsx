// Disproportionation temperature split. Theme-aware.
export function DisproportionationSplit({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="Chlorine disproportionation in cold dilute alkali stopping at plus one and in hot concentrated alkali reaching plus five">
      <text x="20" y="26" fontSize="15" className="fill-current text-foreground" fontWeight="800">Same reagents, temperature picks the product</text>
      <rect x="40" y="50" width="580" height="60" rx="10" className="fill-current" style={{ color: "rgb(14 165 233)" }} opacity="0.14" />
      <text x="60" y="76" fontSize="12.5" fontWeight="800" fill="rgb(14 165 233)">cold, dilute NaOH → stop at +1</text>
      <text x="60" y="98" fontSize="12" fontWeight="700" className="fill-current text-foreground">Cl₂ + 2NaOH → NaCl + NaOCl + H₂O (bleach)</text>
      <rect x="40" y="126" width="580" height="60" rx="10" className="fill-current" style={{ color: "rgb(239 68 68)" }} opacity="0.14" />
      <text x="60" y="152" fontSize="12.5" fontWeight="800" fill="rgb(239 68 68)">hot, concentrated NaOH → go to +5</text>
      <text x="60" y="174" fontSize="12" fontWeight="700" className="fill-current text-foreground">3Cl₂ + 6NaOH → 5NaCl + NaClO₃ + 3H₂O (chlorate)</text>
      <text x="330" y="222" fontSize="11" textAnchor="middle" className="fill-current text-muted-foreground">The hypochlorite itself disproportionates further when heated — 0 splits to −1 and +1, then +1 splits to −1 and +5</text>
    </svg>
  );
}
