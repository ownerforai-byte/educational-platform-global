/** Haemophilia inheritance — the royal disease's genetics. Well-detailed. Theme-aware. */
export function HaemophiliaInheritance({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Haemophilia inheritance X linked recessive carrier mother affected son pedigree royal disease Queen Victoria descendants clotting factor VIII deficiency bleeding criss cross inheritance pattern genetics example">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Haemophilia — X-linked recessive, royal and rare</text>
      {/* inheritance pattern */}
      <rect x="30" y="44" width="330" height="220" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="195" y="64" fontSize="7.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">CARRIER MOTHER (XᴴXʰ) × NORMAL FATHER (XᴴY)</text>
      {[
        [0, 0, "XᴴXᴴ", "normal girl"], [0, 1, "XᴴXʰ", "carrier girl"],
        [1, 0, "XᴴY", "normal boy"], [1, 1, "XʰY", "HAEMOPHILIC boy"],
      ].map(([r, c, geno, label]) => (
        <g key={`${r}${c}`}>
          <rect x={100 + (c as number) * 110} y={85 + (r as number) * 62} width="100" height="50" rx="8" className="fill-current" stroke="currentColor" strokeWidth="1"
            style={{ color: geno === "XʰY" ? "rgb(244 63 94 / 0.3)" : "rgb(2 132 199 / 0.2)" }} />
          <text x={150 + (c as number) * 110} y={112 + (r as number) * 62} fontSize="7" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{geno as string}</text>
          <text x={150 + (c as number) * 62 * 0 + (c as number) * 110 + 50} y={126 + (r as number) * 62} fontSize="5.4" textAnchor="middle" className="fill-current text-muted-foreground">{label as string}</text>
        </g>
      ))}
      <text x="195" y="248" fontSize="6.4" textAnchor="middle" className="fill-current text-muted-foreground">1 in 4 children affected — and it's always the sons who bleed</text>
      {/* facts */}
      <rect x="390" y="44" width="300" height="220" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THE PATTERN'S FINGERPRINT</text>
      {[
        "mostly males affected — they have",
        "  only one X, no backup copy",
        "carrier mothers pass it to sons:",
        "  'criss-cross' inheritance",
        "affected fathers pass the allele",
        "  to ALL daughters (carriers),",
        "  never to sons",
        "Queen Victoria was a carrier —",
        "  the 'royal disease' spread",
        "  through European thrones",
        "today: clotting factor infusions",
        "  make it a manageable disease",
      ].map((t, i) => (
        <text key={t} x="406" y={92 + i * 20} fontSize="6.8" className="fill-current text-muted-foreground">{i % 2 === 0 ? "• " + t : "  " + t}</text>
      ))}
      <rect x="390" y="240" width="300" height="24" rx="8" className="fill-current text-emerald-500/15" strokeWidth="1" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="540" y="256" fontSize="6.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: carrier mother × normal father → 50% of sons affected.</text>
      <text x="360" y="288" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">No backup X is why males express X-linked recessives — genetics' most-tested asymmetry.</text>
    </svg>
  );
}
