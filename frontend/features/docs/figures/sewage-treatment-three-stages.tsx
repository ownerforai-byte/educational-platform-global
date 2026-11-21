/** Sewage treatment primary secondary tertiary — the three-stage plant. Well-detailed. Theme-aware. */
export function SewageTreatmentThreeStages({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Sewage treatment primary secondary tertiary stages screening grit settling tank aeration activated sludge trickling filter bacteria decomposition sedimentation chlorination sludge digestion biogas BOD reduction percentages diagram stages what removed each stage effluent standards discharge rivers Nepal few treatment plants raw sewage problem">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Sewage treatment — the three-stage plant, stage by stage</text>
      {/* stages */}
      <rect x="30" y="44" width="660" height="160" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      {[
        ["Primary (physical)", "screen, grit, settle — solids sink, ~30% BOD gone", 130],
        ["Secondary (biological)", "aeration or trickling filter — microbes eat the waste, ~85–90% BOD gone", 300],
        ["Tertiary (chemical/advanced)", "chlorination, nutrient removal — polish before discharge", 470],
        ["Sludge line", "digested anaerobically → biogas + stabilised solids", 620],
      ].map(([name, detail, x], i) => (
        <g key={name as string}>
          <rect x={(x as number) - 78} y="70" width="156" height="96" rx="10" className="fill-current text-slate-500/10" strokeWidth="1.8" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
          <text x={x as number} y="90" fontSize="6.2" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{name as string}</text>
          <text x={x as number} y="110" fontSize="5.4" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(0, 32)}</text>
          <text x={x as number} y="124" fontSize="5.4" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(32, 64)}</text>
          <text x={x as number} y="152" fontSize="5.6" textAnchor="middle" className="fill-current text-sky-600" fontWeight="700">{["screens+settlers", "microbes at work", "chlorine+nutrients", "biogas bonus"][i]}</text>
        </g>
      ))}
      <text x="360" y="186" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">BOD (biochemical oxygen demand) is the scorecard — each stage cuts it further before the water returns to the river</text>
      {/* facts */}
      <rect x="30" y="210" width="660" height="82" rx="10" className="fill-current text-emerald-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="230" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Nepal's gap: most sewage flows untreated — Kathmandu has a handful of plants, many underused; the Bagmati carries the consequence.</text>
      <text x="360" y="248" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: name the three stages with the mechanism (physical / biological / chemical) and the BOD cut at each — the standard answer.</text>
      <text x="360" y="266" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Activated sludge = aerated tank; trickling filter = sprayed over stones — both are secondary, know both names.</text>
      <text x="360" y="282" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">A treatment plant is a managed ecosystem — the real workers are bacteria, not machines.</text>
    </svg>
  );
}
