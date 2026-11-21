/** Biodiversity value direct indirect — the ledger of benefits. Well-detailed. Theme-aware. */
export function BiodiversityValueLedger({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Biodiversity value direct indirect consumptive use food medicine timber ecotourism ecosystem services pollination water purification option value existence ethical aesthetic cultural economic categories classification table">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">The value of biodiversity — a four-column ledger</text>
      {/* ledger */}
      <rect x="30" y="40" width="660" height="180" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      {[
        ["Direct", "food, timber, medicine, fuel — harvested visibly", 130],
        ["Indirect", "ecosystem services: pollination, water, climate, soil", 300],
        ["Option", "future uses not yet known — the gene-bank argument", 470],
        ["Existence", "worth knowing it's there — ethical and aesthetic", 620],
      ].map(([name, detail, x], i) => (
        <g key={name as string}>
          <rect x={(x as number) - 78} y="70" width="156" height="110" rx="10" className="fill-current text-slate-500/10" strokeWidth="1.8" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
          <text x={x as number} y="92" fontSize="6.8" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{i + 1}. {name as string}</text>
          <text x={x as number} y="112" fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(0, 32)}</text>
          <text x={x as number} y="126" fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(32, 64)}</text>
          <text x={x as number} y="140" fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(64, 96)}</text>
          <text x={x as number} y="166" fontSize="5.6" textAnchor="middle" className="fill-current text-emerald-600" fontWeight="700">{["rice, timber", "bees, wetlands", "wild rice genes", "tiger, rhino"][i]}</text>
        </g>
      ))}
      <text x="360" y="200" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">indirect value usually dwarfs direct value — a wetland's flood control outearns its fish</text>
      {/* facts */}
      <rect x="30" y="212" width="660" height="80" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="232" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">The accounting trap: GDP counts the timber, not the flood the forest prevented — that's why forests get cut 'profitably'.</text>
      <text x="360" y="250" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: name all four value classes with one example each — direct, indirect, option, existence.</text>
      <text x="360" y="268" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Half of modern medicines trace to biological compounds — option value made real.</text>
      <text x="360" y="284" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Existence value can't be invoiced — which is exactly why it needs ethical language, not just economics.</text>
    </svg>
  );
}
