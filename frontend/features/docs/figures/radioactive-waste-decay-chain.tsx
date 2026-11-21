/** Radioactive waste decay chain — the long tail. Well-detailed. Theme-aware. */
export function RadioactiveWasteDecayChain({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Radioactive waste decay chain half life uranium plutonium caesium strontium storage deep geological repository ionising radiation cancer mutation containment thousands of years tailings">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Radioactive waste — the long tail of half-lives</text>
      {/* decay chain */}
      <rect x="30" y="44" width="660" height="150" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="360" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">HALF-LIVES ON A HUMAN-TO-GEOLOGIC SCALE</text>
      {[
        ["I-131", "8 days", "thyroid seeker — short emergency concern"],
        ["Cs-137", "30 years", "fission product — the Chernobyl marker"],
        ["Sr-90", "29 years", "bone seeker, mimics calcium"],
        ["Pu-239", "24,000 years", "spent fuel — must be contained for ~100,000 years"],
      ].map(([iso, half, note], i) => {
        const y = 90 + i * 24;
        return (
          <g key={iso}>
            <text x="60" y={y} fontSize="6.8" className="fill-current text-amber-600" fontWeight="800">{iso}</text>
            <text x="120" y={y} fontSize="6.4" className="fill-current text-foreground" fontWeight="700">{half}</text>
            <text x="220" y={y} fontSize="6.2" className="fill-current text-muted-foreground">{note}</text>
          </g>
        );
      })}
      <text x="360" y="188" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">after ten half-lives, ~0.1% remains — the waste problem is arithmetic, not opinion</text>
      {/* storage */}
      <rect x="30" y="210" width="660" height="82" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="230" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Storage strategy: cool in pools (years) → dry casks (decades) → deep geological repository (millennia).</text>
      <text x="360" y="248" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Ionising radiation breaks DNA — hence cancer and mutation risk, hence the extreme containment standards.</text>
      <text x="360" y="266" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: half-life = time for half the atoms to decay; name one short-lived (I-131) and one long-lived (Pu-239) isotope.</text>
      <text x="360" y="282" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Nepal has no nuclear plants — but its neighbours' fallout ignores borders, as Chernobyl proved.</text>
    </svg>
  );
}
