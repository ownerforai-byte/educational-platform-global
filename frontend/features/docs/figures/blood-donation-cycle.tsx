/** Blood donation cycle — from vein to vein. Well-detailed. Theme-aware. */
export function BloodDonationCycle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Blood donation cycle vein collection bag testing separation centrifuge components red cells plasma platelets storage transfusion recipient 120 days shelf life voluntary donor blood bank Nepal Red Cross 350 ml">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Blood donation — the journey from vein to vein</text>
      {/* journey */}
      <rect x="30" y="44" width="660" height="160" rx="12" className="fill-current text-rose-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
      {[
        ["1. Donate", "~350–450 ml from a screened volunteer", 130],
        ["2. Test", "group + infection screening before use", 300],
        ["3. Separate", "centrifuge splits blood into components", 470],
        ["4. Transfuse", "each component goes where needed", 620],
      ].map(([name, detail, x], i) => (
        <g key={name as string}>
          <rect x={(x as number) - 68} y="70" width="136" height="96" rx="10" className="fill-current text-slate-500/10" strokeWidth="1.8" stroke="currentColor" style={{ color: "rgb(244 63 94 / 0.9)" }} />
          <text x={x as number} y="92" fontSize="6.8" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{name as string}</text>
          <text x={x as number} y="112" fontSize="5.8" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(0, 30)}</text>
          <text x={x as number} y="126" fontSize="5.8" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(30, 60)}</text>
          {i < 3 && <path d={`M${(x as number) + 70} 118 h${((x as number) + 128) - (x as number) - 70 - 2} m-6 -5 l6 5 l-6 5`} className="fill-none stroke-current" strokeWidth="1.8" style={{ color: "rgb(244 63 94 / 0.9)" }} />}
        </g>
      ))}
      <text x="360" y="186" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">one donation can be split: red cells for anaemia, platelets for cancer patients, plasma for burns — three patients per pint</text>
      {/* facts */}
      <rect x="30" y="210" width="660" height="82" rx="10" className="fill-current text-sky-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      <text x="360" y="230" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">Shelf lives differ: red cells ~35–42 days, platelets only ~5 days, plasma frozen up to a year — platelets are the scarce stock.</text>
      <text x="360" y="248" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Donors replenish plasma within days and red cells within weeks — the 3-month gap between whole-blood donations is a safety margin.</text>
      <text x="360" y="266" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: voluntary non-remunerated donors are the safest source — paid blood attracts risk and hidden infections.</text>
      <text x="360" y="282" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">Nepal's blood supply runs largely on voluntary donors via the Red Cross — a quiet public-health success.</text>
    </svg>
  );
}
