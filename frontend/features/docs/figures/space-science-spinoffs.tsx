/** Space science spinoffs — what spaceflight gave everyday life. Well-detailed. Theme-aware. */
export function SpaceScienceSpinoffs({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 300" className={className} role="img" aria-label="Space science spinoffs satellite communication weather forecasting GPS navigation remote sensing agriculture disaster warning water purification memory foam solar technology transfer Nepal applications list benefits daily life">
      <text x="16" y="24" fontSize="14" className="fill-current text-foreground" fontWeight="800">Space science — the payoff list on Earth</text>
      {/* spinoffs */}
      <rect x="30" y="44" width="660" height="170" rx="12" className="fill-current text-sky-500/10" strokeWidth="2.5" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
      {[
        ["Communication", "satellites carry TV, phone, internet across oceans and hills", 130],
        ["Navigation", "GPS timing signals guide planes, tractors, trekkers", 300],
        ["Weather", "forecasting and cyclone warnings save thousands yearly", 470],
        ["Remote sensing", "crop forecasts, glacier-lake monitoring, flood mapping", 620],
      ].map(([name, detail, x], i) => (
        <g key={name as string}>
          <rect x={(x as number) - 68} y="70" width="136" height="100" rx="10" className="fill-current text-slate-500/10" strokeWidth="1.8" stroke="currentColor" style={{ color: "rgb(2 132 199 / 0.9)" }} />
          <text x={x as number} y="92" fontSize="6.6" textAnchor="middle" className="fill-current text-foreground" fontWeight="800">{name as string}</text>
          <text x={x as number} y="112" fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(0, 30)}</text>
          <text x={x as number} y="126" fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(30, 60)}</text>
          <text x={x as number} y="140" fontSize="5.6" textAnchor="middle" className="fill-current text-muted-foreground">{(detail as string).slice(60, 90)}</text>
          {i < 3 && <path d={`M${(x as number) + 70} 120 h${((x as number) + 128) - (x as number) - 70 - 2} m-6 -5 l6 5 l-6 5`} className="fill-none stroke-current" strokeWidth="1.8" style={{ color: "rgb(2 132 199 / 0.9)" }} />}
        </g>
      ))}
      <text x="360" y="196" fontSize="6.8" textAnchor="middle" className="fill-current text-muted-foreground">the argument for space budgets is mostly down here: satellites are infrastructure, not luxury</text>
      {/* facts */}
      <rect x="30" y="228" width="660" height="64" rx="10" className="fill-current text-emerald-500/10" strokeWidth="2" stroke="currentColor" style={{ color: "rgb(16 185 129 / 0.9)" }} />
      <text x="360" y="248" fontSize="7.4" textAnchor="middle" className="fill-current text-foreground" fontWeight="700">For Nepal: remote sensing tracks glacial lakes (GLOF risk), forecasts floods, and maps landslides — space data as disaster defence.</text>
      <text x="360" y="266" fontSize="7.2" textAnchor="middle" className="fill-current text-muted-foreground">Exam hook: four spinoff classes (communication, navigation, weather, remote sensing) with one use each.</text>
      <text x="360" y="282" fontSize="7" textAnchor="middle" className="fill-current text-muted-foreground">A country without its own satellites still consumes their services — space science is shared infrastructure.</text>
    </svg>
  );
}
