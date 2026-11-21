/** Pesticide residue vegetables washing — the kitchen defence. Well-detailed. Theme-aware. */
export function PesticideResidueWashing({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Pesticide residue vegetables washing effectiveness plain water salt water baking soda vinegar peeling trimming outer leaves cooking degradation systemic pesticides inside tissue cannot wash off waiting period pre harvest interval MRL maximum residue limits testing kitchen practical advice organic gap myth washing removes most surface residues time factor">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Pesticide residues — what washing can and can't do</text>
      {/* effectiveness */}
      <rect x="30" y="44" width="660" height="160" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="66" fontSize="8.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">REMOVAL METHODS, RANKED</text>
      {[
        ["1", "peeling and trimming outer leaves", "removes most surface residue on that tissue", 100],
        ["2", "baking-soda soak (10–15 min), then rinse", "best home method for surface residues", 180],
        ["3", "running water + friction, 30+ seconds", "removes a good share of surface residue", 260],
        ["4", "salt water soak", "modest extra effect over plain water", 340],
        ["5", "cooking/boiling", "degrades some pesticides — but concentrates others", 420],
      ].map(([rank, action, note, x], i) => {
        const y = 92 + i * 20;
        return (
          <g key={rank as string}>
            <circle cx="70" cy={y - 3} r="8" className="fill-current text-emerald-500/20" strokeWidth="1.2" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
            <text x="70" y={y} fontSize="6.4" textAnchor="middle" className="fill-current text-emerald-700" fontWeight="800">{rank as string}</text>
            <text x="86" y={y} fontSize="6.2" className="fill-current text-foreground">{action as string}</text>
            <text x="380" y={y} fontSize="5.8" className="fill-current text-muted-foreground">{note as string}</text>
          </g>
        );
      })}
      <text x="360" y="196" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">the limit: systemic pesticides (taken up inside the plant) can't be washed off — only the farmer's waiting period prevents them</text>
      {/* facts */}
      <rect x="30" y="210" width="660" height="82" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="230" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">The pre-harvest interval (PHI): the labelled wait between last spray and harvest — respecting it is what keeps residues legal and low.</text>
      <text x="360" y="248" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">MRLs (maximum residue limits) are the legal ceilings regulators test against — Nepal's DFTQC runs market monitoring.</text>
      <text x="360" y="266" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: washing helps surface residues only; systemic residues need the PHI — the distinction is the whole answer.</text>
      <text x="360" y="282" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">'Organic' doesn't mean pesticide-free — it means no synthetic pesticides; some natural ones are toxic too.</text>
    </svg>
  );
}
