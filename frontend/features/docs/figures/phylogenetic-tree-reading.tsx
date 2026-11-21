/** Reading a phylogenetic tree — branches as ancestry. Well-detailed. Theme-aware. */
export function PhylogeneticTreeReading({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Reading a phylogenetic tree root branch node sister groups common ancestor closer together more recent shared evolutionary history classification">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">How to read an evolutionary tree</text>

      {/* tree */}
      <rect x="30" y="44" width="400" height="220" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="230" y="64" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">A SIMPLE FOUR-SPECIES TREE</text>
      {/* root */}
      <line x1="70" y1="150" x2="150" y2="150" className="stroke-current text-emerald-800" strokeWidth="3" style={{ color: "rgb(6 46 27 / 0.9)" }} />
      {/* first split */}
      <line x1="150" y1="150" x2="220" y2="100" className="stroke-current text-emerald-700" strokeWidth="2.6" style={{ color: "rgb(20 83 45 / 0.9)" }} />
      <line x1="150" y1="150" x2="220" y2="200" className="stroke-current text-emerald-700" strokeWidth="2.6" style={{ color: "rgb(20 83 45 / 0.9)" }} />
      {/* second splits */}
      <line x1="220" y1="100" x2="310" y2="76" className="stroke-current text-emerald-600" strokeWidth="2.4" style={{ color: "rgb(5 122 85 / 0.9)" }} />
      <line x1="220" y1="100" x2="310" y2="124" className="stroke-current text-emerald-600" strokeWidth="2.4" style={{ color: "rgb(5 122 85 / 0.9)" }} />
      <line x1="220" y1="200" x2="310" y2="176" className="stroke-current text-emerald-600" strokeWidth="2.4" style={{ color: "rgb(5 122 85 / 0.9)" }} />
      <line x1="220" y1="200" x2="310" y2="224" className="stroke-current text-emerald-600" strokeWidth="2.4" style={{ color: "rgb(5 122 85 / 0.9)" }} />
      {/* tips */}
      {[[76, 316], [124, 316], [176, 316], [224, 316]].map(([y, x], i) => (
        <circle key={i} cx={x} cy={y} r="5" className="fill-current text-lime-500/60" stroke="currentColor" strokeWidth="1.4" style={{ color: "rgb(132 204 22 / 0.9)" }} />
      ))}
      {["species A", "species B", "species C", "species D"].map((t, i) => (
        <text key={t} x={328} y={80 + i * 48} fontSize="7.4" className="fill-current text-foreground">{t}</text>
      ))}
      {/* node markers */}
      {[[220, 100], [220, 200], [150, 150]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4" className="fill-current text-amber-500/70" />
      ))}
      <text x="90" y="176" fontSize="7" className="fill-current text-amber-600" fontWeight="700">root = oldest ancestor</text>
      <text x="238" y="92" fontSize="7" className="fill-current text-amber-600">nodes = branching points</text>

      {/* reading card */}
      <rect x="450" y="44" width="240" height="220" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(14 165 233 / 0.9)" }} />
      <text x="570" y="66" fontSize="9" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">THREE READING RULES</text>
      {[
        "closer tips = more recent",
        "common ancestor",
        "A and B are sister groups;",
        "so are C and D",
        "branch order, not branch",
        "length, carries the message",
        "trees show relatedness,",
        "not 'who is most advanced'",
      ].map((t, i) => (
        <text key={t} x="466" y={94 + i * 21} fontSize="7.4" className="fill-current text-muted-foreground">• {t}</text>
      ))}
      <text x="466" y="256" fontSize="7.2" className="fill-current text-muted-foreground">Exam hook: phylogenetic systems</text>
      <text x="466" y="270" fontSize="7.2" className="fill-current text-muted-foreground">group by evolutionary descent.</text>
    </svg>
  );
}
