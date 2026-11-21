/** Vaccine types chart — live killed toxoid subunit mRNA. Well-detailed. Theme-aware. */
export function VaccineTypesChart({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Vaccine types chart live attenuated killed inactivated toxoid subunit conjugate mRNA examples MMR BCG polio tetanus hepatitis influenza durability immunity comparison advantages risks immunocompromised">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Vaccine types — four routes to immunity</text>
      {/* table */}
      <rect x="30" y="40" width="140" height="26" rx="6" className="fill-current text-slate-500/15" strokeWidth="1.4" stroke="currentColor" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <text x="100" y="58" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">TYPE</text>
      <rect x="170" y="40" width="250" height="26" rx="6" className="fill-current text-sky-500/15" strokeWidth="1.4" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="295" y="58" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">HOW IT WORKS</text>
      <rect x="420" y="40" width="270" height="26" rx="6" className="fill-current text-emerald-500/15" strokeWidth="1.4" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="555" y="58" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">EXAMPLES + CAUTIONS</text>
      {[
        ["Live attenuated", "weakened real microbe; strong, lasting immunity", "MMR, BCG, oral polio; avoid in pregnancy/immunocompromised"],
        ["Killed", "inactivated microbe; safe but needs boosters", "rabies, injected polio, hepatitis A"],
        ["Toxoid", "inactivated toxin, not the microbe", "tetanus, diphtheria"],
        ["Subunit/mRNA", "only a piece or the instruction for it", "hepatitis B; COVID-19 mRNA vaccines"],
      ].map(([t, how, ex], i) => {
        const y = 74 + i * 34;
        return (
          <g key={t}>
            <text x="46" y={y + 14} fontSize="6.4" className="fill-current text-foreground" fontWeight="700">{t}</text>
            <text x="184" y={y + 8} fontSize="6" className="fill-current text-muted-foreground">{how.slice(0, 42)}</text>
            <text x="184" y={y + 20} fontSize="6" className="fill-current text-muted-foreground">{how.slice(42, 84)}</text>
            <text x="434" y={y + 8} fontSize="6" className="fill-current text-muted-foreground">{ex.slice(0, 44)}</text>
            <text x="434" y={y + 20} fontSize="6" className="fill-current text-muted-foreground">{ex.slice(44, 88)}</text>
          </g>
        );
      })}
      <rect x="30" y="218" width="660" height="74" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="238" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">The trade-off: live vaccines give the strongest memory but carry the most cautions; killed and subunit are safest but need boosters.</text>
      <text x="360" y="256" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Herd immunity threshold varies by disease — measles needs ~95% coverage because it spreads so efficiently.</text>
      <text x="360" y="274" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: match type → example → one caution. Toxoid ≠ killed microbe: tetanus vaccine trains against the toxin.</text>
      <text x="360" y="288" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">mRNA vaccines skip the microbe entirely — they deliver the recipe, and the body makes the antigen itself.</text>
    </svg>
  );
}
