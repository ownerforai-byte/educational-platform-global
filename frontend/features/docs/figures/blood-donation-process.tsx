/** Blood donation process — from needle to shelf. Well-detailed. Theme-aware. */
export function BloodDonationProcess({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Blood donation process steps eligibility screening 450 ml unit whole blood components separation red cells plasma platelets shelf life storage temperatures 356 days cross matching voluntary donors replacement policy Nepal blood transfusion service interval 3 months men recovery iron replenishment">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Blood donation — from needle to shelf</text>
      {/* process */}
      <rect x="30" y="44" width="660" height="160" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      {[
        ["1. Screen", "age, weight, haemoglobin, history check", 130],
        ["2. Donate", "~450 ml drawn in 8–10 minutes", 300],
        ["3. Separate", "spun into red cells, plasma, platelets", 470],
        ["4. Store", "each component at its own temperature", 620],
      ].map(([name, detail, x], i) => (
        <g key={name as string}>
          <rect x={(x as number) - 68} y="70" width="136" height="96" rx="10" className="fill-current text-slate-500/10" strokeWidth="1.8" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
          <text x={x as number} y="92" fontSize="6.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{name as string}</text>
          <text x={x as number} y="112" fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(0, 30)}</text>
          <text x={x as number} y="126" fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(30, 60)}</text>
          {i < 3 && <path d={`M${(x as number) + 70} 118 h${((x as number) + 128) - (x as number) - 70 - 2} m-6 -5 l6 5 l-6 5`} className="fill-none stroke-current" strokeWidth="1.8" style={{ color: "rgb(244 63 94 / 0.9)" }} />}
        </g>
      ))}
      <text x="360" y="186" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">one donation can be split into three components — three patients from one arm</text>
      {/* facts */}
      <rect x="30" y="210" width="660" height="82" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="230" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Shelf lives: red cells ~35–42 days (refrigerated), platelets ~5 days (room temp, agitated), plasma ~1 year (frozen).</text>
      <text x="360" y="248" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Donation interval: ~3 months (men) or 4 months (women) — plasma regenerates within days; iron takes longer.</text>
      <text x="360" y="266" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: 450 ml unit, component separation, three shelf lives — the numbers examiners ask for.</text>
      <text x="360" y="282" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Voluntary, unpaid donors give the safest blood — paid donation correlates with higher infection risk.</text>
    </svg>
  );
}
