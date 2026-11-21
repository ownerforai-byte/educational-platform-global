/** Malaria disease burden — global impact, deaths, vulnerable groups. Theme-aware. */
export function MalariaDiseaseBurden({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 660 260" className={className} role="img" aria-label="Malaria disease burden showing millions of cases annually hundreds of thousands of deaths mostly children under five in tropical regions">
      <text x="16" y="26" fontSize="14" className="fill-current text-foreground" fontWeight="800">Why P. falciparum matters — the disease burden</text>

      {/* stat cards */}
      {[
        { x: 40, n: "~250 million", s: "clinical cases per year (worldwide)", c: "rgb(245 158 11 / 0.9)" },
        { x: 240, n: "~600,000", s: "deaths per year — most in Africa", c: "rgb(239 68 68 / 0.9)" },
        { x: 440, n: "<5 years", s: "children under five = most victims", c: "rgb(124 58 237 / 0.9)" },
      ].map((c) => (
        <g key={c.n}>
          <rect x={c.x} y="60" width="180" height="76" rx="12" style={{ color: c.c }} className="fill-current opacity-12" strokeWidth="2.5" stroke="currentColor" />
          <text x={c.x + 90} y="92" fontSize="13" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{c.n}</text>
          <text x={c.x + 90} y="114" fontSize="8" textAnchor="middle" className="fill-current text-muted-foreground">{c.s}</text>
        </g>
      ))}

      {/* why falciparum is worst */}
      <rect x="40" y="156" width="580" height="70" rx="12" className="fill-current text-rose-500/8" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(239 68 68 / 0.9)" }} />
      <text x="56" y="180" fontSize="9.5" className="fill-current text-foreground" fontWeight="800">P. falciparum = malignant (pernicious) malaria:</text>
      <text x="56" y="200" fontSize="8.5" className="fill-current text-muted-foreground">high, irregular fever · attacks all RBC ages · rapid parasite multiplication · cerebral malaria, blackwater fever, death within days if untreated.</text>
      <text x="56" y="216" fontSize="8.5" className="fill-current text-muted-foreground">P. vivax by contrast gives benign tertian fever and rarely kills — the economic weight of malaria is carried by falciparum.</text>

      <text x="16" y="248" fontSize="10" className="fill-current text-muted-foreground">Economic cost: lost workdays, treatment expense, and lowered productivity keep endemic countries poorer — malaria is a poverty disease.</text>
    </svg>
  );
}
