/** Protostome deuterostome split — two ways to build a gut. Well-detailed. Theme-aware. */
export function ProtostomeDeuterostomeSplit({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Protostome deuterostome split blastopore mouth anus spiral cleavage indeterminate annelida arthropoda mollusca echinodermata chordata development">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Two blueprints for building a gut</text>
      {/* gastrula diagrams */}
      <rect x="30" y="44" width="330" height="180" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">PROTOSTOMES — mouth first</text>
      <circle cx="195" cy="140" r="46" className="fill-current text-sky-500/15" stroke="currentColor" strokeWidth="2" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <circle cx="195" cy="140" r="20" className="fill-current text-sky-500/30" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <path d="M175 186 v14" className="stroke-current" strokeWidth="3" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="216" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">blastopore becomes the MOUTH</text>
      <text x="195" y="232" fontSize="6.4" textAnchor="middle" className="fill-current text-sky-600">annelids, arthropods, molluscs</text>
      <rect x="390" y="44" width="300" height="180" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">DEUTEROSTOMES — anus first</text>
      <circle cx="540" cy="140" r="46" className="fill-current text-emerald-500/15" stroke="currentColor" strokeWidth="2" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <circle cx="540" cy="140" r="20" className="fill-current text-emerald-500/30" stroke="currentColor" strokeWidth="1.6" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <path d="M560 186 v14" className="stroke-current" strokeWidth="3" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="216" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">blastopore becomes the ANUS</text>
      <text x="540" y="232" fontSize="6.4" textAnchor="middle" className="fill-current text-emerald-600">echinoderms, chordates — including us</text>
      <rect x="30" y="240" width="660" height="52" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="360" y="258" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">The same embryo, two fates for one hole — a detail invisible in adults but decisive in classification.</text>
      <text x="360" y="276" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: 'proto = first (mouth)' and 'deutero = second (anus)' — the word roots carry the answer.</text>
      <text x="360" y="288" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Deuterostomes also show radial cleavage and indeterminate cells — each early cell can make a whole embryo.</text>
    </svg>
  );
}
