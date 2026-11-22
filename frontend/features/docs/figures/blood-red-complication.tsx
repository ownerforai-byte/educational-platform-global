// BloodRedComplication figure. Theme-aware.
export function BloodRedComplication({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 240" className={className} role="img" aria-label="N and S together giving sodium thiocyanate blood red test">
      <text x="20" y="26" fontSize="15" fontWeight="800" className="fill-current text-foreground">The trap: N and S in the same compound</text>
      <rect x="40" y="52" width="580" height="70" rx="10" fill="rgb(239 68 68)" opacity="0.1" stroke="rgb(239 68 68)" />
      <text x="330" y="78" fontSize="11.5" fontWeight="800" textAnchor="middle" className="fill-current text-foreground">Na + C + N + S → NaSCN (sodium thiocyanate) — no NaCN, no Na₂S</text>
      <text x="330" y="104" fontSize="10.5" textAnchor="middle" className="fill-current text-muted-foreground">both elements locked into one ion: the separate N and S tests fail</text>
      <rect x="150" y="140" width="360" height="58" rx="10" fill="rgb(220 38 38)" opacity="0.2" stroke="rgb(220 38 38)" strokeWidth="2" />
      <text x="330" y="164" fontSize="12" fontWeight="800" textAnchor="middle" fill="rgb(252 165 165)">Fe³⁺ + SCN⁻ → blood-red [Fe(SCN)]²⁺</text>
      <text x="330" y="186" fontSize="10" textAnchor="middle" className="fill-current text-muted-foreground">the blood-red colour is itself the proof that BOTH N and S are present</text>
    </svg>
  );
}
