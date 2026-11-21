/** First aid ABC priorities — the order that saves lives. Well-detailed. Theme-aware. */
export function FirstAidABCPriorities({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="First aid ABC priorities airway breathing circulation CPR chest compressions recovery position bleeding control DRABC order sequence emergency response bystander chain survival ambulance call Nepal">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">First aid — the ABC order that decides survival</text>
      {/* ladder */}
      <rect x="30" y="44" width="660" height="150" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      {[
        ["D+R", "check Danger and Response — scene safety first", 130],
        ["A", "Airway: open and clear the passage", 300],
        ["B", "Breathing: look, listen, feel; start rescue breaths", 470],
        ["C", "Circulation: chest compressions if no pulse", 620],
      ].map(([k, v, x], i) => (
        <g key={k as string}>
          <rect x={(x as number) - 68} y="70" width="136" height="96" rx="10" className="fill-current text-slate-500/10" strokeWidth="1.8" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
          <text x={x as number} y="94" fontSize="8" textAnchor="middle" className="fill-current text-rose-600" fontWeight="800">{k as string}</text>
          <text x={x as number} y="116" fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">{(v as string).slice(0, 30)}</text>
          <text x={x as number} y="130" fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">{(v as string).slice(30, 60)}</text>
          {i < 3 && <path d={`M${(x as number) + 70} 118 h${((x as number) + 128) - (x as number) - 70 - 2} m-6 -5 l6 5 l-6 5`} className="fill-none stroke-current" strokeWidth="1.8" style={{ color: "rgb(244 63 94 / 0.9)" }} />}
        </g>
      ))}
      <text x="360" y="186" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">the order is not negotiable: an open airway without breathing is pointless; breathing without circulation is futile</text>
      {/* facts */}
      <rect x="30" y="210" width="660" height="82" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="230" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">CPR rhythm: ~100–120 compressions per minute, 5–6 cm deep, minimal pauses — blood must keep moving to the brain.</text>
      <text x="360" y="248" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Severe bleeding: direct pressure first; tourniquet only for uncontrolled limb bleeding. Recovery position protects the airway of the unconscious who breathe.</text>
      <text x="360" y="266" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: DRABC in order — Danger, Response, Airway, Breathing, Circulation. Write the letters and the meaning.</text>
      <text x="360" y="282" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">The chain of survival: bystander → call → CPR → defibrillation → hospital — every link is a layperson's job.</text>
    </svg>
  );
}
