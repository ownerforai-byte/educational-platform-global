/** Species reintroduction programs — bringing them back. Well-detailed. Theme-aware. */
export function SpeciesReintroductionPrograms({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Species reintroduction programs captive breeding release panda tiger rhino India Nepal translocation success criteria habitat prepared source population genetic diversity monitoring post release survival soft release hard release examples one horned rhino Chitwan Shuklaphantatiger relocation">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Reintroduction — the hard road back</text>
      {/* steps */}
      <rect x="30" y="44" width="660" height="160" rx="12" className="fill-current text-emerald-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      {[
        ["1. Diagnose", "why did it vanish? fix that first or the release fails", 130],
        ["2. Source stock", "genetically diverse, disease-screened donors", 300],
        ["3. Prepare", "habitat ready, threats removed, communities on board", 470],
        ["4. Release + monitor", "soft or hard release; radio-collar; adapt", 620],
      ].map(([name, detail, x], i) => (
        <g key={name as string}>
          <rect x={(x as number) - 68} y="70" width="136" height="96" rx="10" className="fill-current text-slate-500/10" strokeWidth="1.8" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
          <text x={x as number} y="92" fontSize="6.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{name as string}</text>
          <text x={x as number} y="112" fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(0, 30)}</text>
          <text x={x as number} y="126" fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(30, 60)}</text>
          {i < 3 && <path d={`M${(x as number) + 70} 118 h${((x as number) + 128) - (x as number) - 70 - 2} m-6 -5 l6 5 l-6 5`} className="fill-none stroke-current" strokeWidth="1.8" style={{ color: "rgb(16 185 129 / 0.9)" }} />}
        </g>
      ))}
      <text x="360" y="186" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">skipping step 1 is the classic failure — released animals return to the same traps that emptied the habitat</text>
      {/* cases */}
      <rect x="30" y="210" width="660" height="82" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="230" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Nepal's proof: rhinos translocated from Chitwan founded the Shuklaphanta and Bardia populations; tigers were moved to Parsa.</text>
      <text x="360" y="248" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Soft release (gradual, with support feeding) outperforms hard release (dump and hope) for most mammals.</text>
      <text x="360" y="266" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: reintroduction ≠ release — name the four steps and one Nepali success story for full marks.</text>
      <text x="360" y="282" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Success is measured in breeding generations, not in the number of animals let go.</text>
    </svg>
  );
}
