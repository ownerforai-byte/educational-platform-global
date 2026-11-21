/** Nostril septum zoom — platyrrhine vs catarrhine. Well-detailed. Theme-aware. */
export function NostrilSeptumZoom({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Nostril septum zoom platyrrhine flat wide septum sideways nostrils catarrhine narrow downward New World Old World monkeys faces">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The nose knows — two septums, two lineages</text>
      {/* platyrrhine face */}
      <rect x="30" y="44" width="330" height="200" rx="12" className="fill-current text-amber-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(217 119 6 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">PLATYRRHINE — New World</text>
      <ellipse cx="195" cy="150" rx="90" ry="80" className="fill-current text-amber-600/15" stroke="currentColor" strokeWidth="1.8" style={{ color: "rgb(180 130 40 / 0.9)" }} />
      <ellipse cx="160" cy="140" rx="20" ry="14" className="fill-current text-stone-500/40" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <ellipse cx="230" cy="140" rx="20" ry="14" className="fill-current text-stone-500/40" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <text x="195" y="252" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">flat nose, WIDE septum, nostrils open sideways</text>
      {/* catarrhine face */}
      <rect x="390" y="44" width="300" height="200" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">CATARRHINE — Old World</text>
      <ellipse cx="540" cy="150" rx="80" ry="80" className="fill-current text-sky-500/15" stroke="currentColor" strokeWidth="1.8" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <ellipse cx="522" cy="146" rx="9" ry="12" className="fill-current text-stone-500/40" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <ellipse cx="558" cy="146" rx="9" ry="12" className="fill-current text-stone-500/40" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(120 113 108 / 0.9)" }} />
      <text x="540" y="252" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">narrow septum, nostrils face DOWNWARD (like ours)</text>
      <rect x="30" y="262" width="660" height="30" rx="8" className="fill-current text-sky-500/10" strokeWidth="1.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="276" fontSize="7.4" textAnchor="middle" className="fill-current text-muted-foreground">Catarrhini includes Old World monkeys, apes and humans — the downward nose is our inheritance too.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: platy = flat and wide (side nostrils); catarrh = downward (flowing down — that is what the Greek means).</text>
    </svg>
  );
}
